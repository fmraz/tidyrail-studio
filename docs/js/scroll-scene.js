const canvas = document.querySelector("[data-scroll-scene]");
const fallbackCanvas = document.querySelector("[data-scene-fallback]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (fallbackCanvas) {
  drawFallbackScene(fallbackCanvas);
  window.addEventListener("resize", () => drawFallbackScene(fallbackCanvas), { passive: true });
}

if (canvas && !reducedMotion) {
  const startScene = () => {
    window.removeEventListener("scroll", startScene);
    initScrollScene(canvas, fallbackCanvas);
  };
  window.addEventListener("scroll", startScene, { once: true, passive: true });
}

function drawFallbackScene(targetCanvas) {
  const rect = targetCanvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  targetCanvas.width = Math.floor(width * pixelRatio);
  targetCanvas.height = Math.floor(height * pixelRatio);

  const context = targetCanvas.getContext("2d");
  if (!context) return;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, width, height);

  const rails = [
    { color: "rgba(87, 174, 205, 0.34)", y: 0.55, bend: 0.2, width: 9 },
    { color: "rgba(210, 165, 82, 0.28)", y: 0.68, bend: 0.28, width: 8 },
    { color: "rgba(130, 148, 160, 0.22)", y: 0.42, bend: 0.18, width: 5 },
  ];

  rails.forEach((rail, index) => {
    const gradient = context.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "rgba(255,255,255,0.06)");
    gradient.addColorStop(0.28, rail.color);
    gradient.addColorStop(0.72, rail.color);
    gradient.addColorStop(1, "rgba(255,255,255,0.04)");
    context.beginPath();
    context.moveTo(-width * 0.08, height * (rail.y - 0.12));
    context.bezierCurveTo(
      width * 0.25,
      height * (rail.y - rail.bend),
      width * 0.58,
      height * (rail.y + rail.bend + index * 0.02),
      width * 1.08,
      height * (rail.y - 0.04),
    );
    context.strokeStyle = gradient;
    context.lineWidth = rail.width;
    context.lineCap = "round";
    context.stroke();
  });

  const panelGradient = context.createLinearGradient(0, height * 0.18, 0, height * 0.72);
  panelGradient.addColorStop(0, "rgba(255,255,255,0.32)");
  panelGradient.addColorStop(1, "rgba(185,220,246,0.07)");
  for (let index = 0; index < 4; index += 1) {
    const panelWidth = Math.min(170, width * 0.15);
    const panelHeight = Math.min(90, height * 0.1);
    const x = width * (0.48 + index * 0.12);
    const y = height * (0.2 + (index % 2) * 0.08);
    context.beginPath();
    context.roundRect(x, y, panelWidth, panelHeight, 18);
    context.fillStyle = panelGradient;
    context.fill();
    context.strokeStyle = "rgba(255,255,255,0.48)";
    context.lineWidth = 1;
    context.stroke();
  }

  targetCanvas.dataset.sceneReady = "fallback";
  targetCanvas.dataset.sceneProgress = "0.0000";
}

async function initScrollScene(targetCanvas, fallback) {
  let three;

  try {
    three = await import("../vendor/three.module.js");
  } catch {
    targetCanvas.hidden = true;
    return;
  }

  const {
    AmbientLight,
    CatmullRomCurve3,
    Color,
    DirectionalLight,
    Mesh,
    MeshPhysicalMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    TubeGeometry,
    Vector3,
    WebGLRenderer
  } = three;

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: targetCanvas
  });

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  targetCanvas.hidden = false;

  scene.add(new AmbientLight(0xffffff, 1.8));

  const keyLight = new DirectionalLight(0xffffff, 2.6);
  keyLight.position.set(4, 7, 8);
  scene.add(keyLight);

  const railMaterials = [
    new MeshPhysicalMaterial({
      color: new Color("#7fb5b1"),
      metalness: 0.22,
      roughness: 0.22,
      transmission: 0.35,
      transparent: true,
      opacity: 0.55
    }),
    new MeshPhysicalMaterial({
      color: new Color("#d79b31"),
      metalness: 0.18,
      roughness: 0.28,
      transmission: 0.25,
      transparent: true,
      opacity: 0.46
    }),
    new MeshPhysicalMaterial({
      color: new Color("#9ba7a8"),
      metalness: 0.35,
      roughness: 0.18,
      transparent: true,
      opacity: 0.34
    })
  ];

  const rails = [
    createRail(-0.4, -0.75, 0, railMaterials[0], 0.045),
    createRail(0.7, -1.15, -0.32, railMaterials[1], 0.04),
    createRail(-1.2, -0.2, -0.72, railMaterials[2], 0.026)
  ];

  rails.forEach((rail) => scene.add(rail));

  const panelMaterial = new MeshPhysicalMaterial({
    color: new Color("#ffffff"),
    metalness: 0,
    roughness: 0.18,
    transparent: true,
    opacity: 0.38,
    side: three.DoubleSide
  });

  const panels = Array.from({ length: 5 }, (_, index) => {
    const panel = new Mesh(new PlaneGeometry(1.1, 0.54), panelMaterial.clone());
    const baseY = -0.15 + Math.sin(index) * 0.24;
    panel.position.set(-2.5 + index * 1.1, baseY, -1.15 - index * 0.12);
    panel.userData.baseY = baseY;
    panel.rotation.set(-0.42, 0.34, -0.08 + index * 0.03);
    scene.add(panel);
    return panel;
  });

  function createRail(offsetX, offsetY, offsetZ, material, radius) {
    const curve = new CatmullRomCurve3([
      new Vector3(-5.5 + offsetX, -0.2 + offsetY, -1.9 + offsetZ),
      new Vector3(-3.4 + offsetX, 0.34 + offsetY, -1.35 + offsetZ),
      new Vector3(-1.3 + offsetX, 0.08 + offsetY, -1.02 + offsetZ),
      new Vector3(1.1 + offsetX, -0.42 + offsetY, -1.1 + offsetZ),
      new Vector3(4.4 + offsetX, 0.08 + offsetY, -1.55 + offsetZ),
      new Vector3(6.2 + offsetX, 0.34 + offsetY, -2.1 + offsetZ)
    ]);

    const geometry = new TubeGeometry(curve, 128, radius, 14, false);
    return new Mesh(geometry, material);
  }

  function resize() {
    const rect = targetCanvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function scrollProgress() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    return Math.min(1, Math.max(0, window.scrollY / maxScroll));
  }

  function render(time = 0) {
    const progress = scrollProgress();
    const clock = time * 0.001;

    targetCanvas.dataset.sceneReady = "true";
    targetCanvas.dataset.sceneProgress = progress.toFixed(4);

    camera.position.set(0.3 + progress * 0.85, 0.15 + progress * 0.32, 5.4 - progress * 0.35);
    camera.lookAt(0.35, -0.15, -1.35);

    rails.forEach((rail, index) => {
      rail.rotation.y = -0.2 + progress * (0.72 + index * 0.14);
      rail.rotation.z = Math.sin(clock * 0.28 + index) * 0.025 + progress * 0.08;
      rail.position.y = Math.sin(clock * 0.38 + index) * 0.035;
    });

    panels.forEach((panel, index) => {
      panel.position.y = panel.userData.baseY + Math.sin(clock * 0.7 + index) * 0.04;
      panel.rotation.z = -0.08 + index * 0.03 + progress * 0.18;
      panel.material.opacity = 0.22 + Math.sin(progress * Math.PI + index * 0.4) * 0.08;
    });

    renderer.render(scene, camera);
    if (fallback && !fallback.hidden) fallback.hidden = true;
    window.requestAnimationFrame(render);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.requestAnimationFrame(render);
}
