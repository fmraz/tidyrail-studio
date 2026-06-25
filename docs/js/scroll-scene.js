const canvas = document.querySelector("[data-scroll-scene]");

if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  initScrollScene(canvas);
}

async function initScrollScene(targetCanvas) {
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
    panel.position.set(-2.5 + index * 1.1, -0.15 + Math.sin(index) * 0.24, -1.15 - index * 0.12);
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
      panel.position.y += Math.sin(clock * 0.7 + index) * 0.0009;
      panel.rotation.z = -0.08 + index * 0.03 + progress * 0.18;
      panel.material.opacity = 0.22 + Math.sin(progress * Math.PI + index * 0.4) * 0.08;
    });

    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.requestAnimationFrame(render);
}
