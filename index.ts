import { BoxGeometry, Clock, Mesh, PerspectiveCamera, Scene, ShaderMaterial, Vector2, WebGLRenderer } from "three";

import vertex from "/shaders/vertex.glsl";
import fragment from "/shaders/fragment.glsl";

const target = document.querySelector("#renderContainer");

if (target === null) {
  throw new Error("Unable to find render target");
}

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(45, width / height, 0.1, 100);

camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const renderer = new WebGLRenderer();
renderer.setSize(width, height);

target.appendChild(renderer.domElement);

const clock = new Clock();

const uniforms = {
  u_time: { type: "f", value: 1.0 },
  u_resolution: { type: "v2", value: new Vector2() },
  u_mouse: { type: "v2", value: new Vector2() },
};

const rectangle = new BoxGeometry(1, 1, 1);

const material = new ShaderMaterial({
  fragmentShader: fragment,
  uniforms,
});

const cube = new Mesh(rectangle, material);

scene.add(cube);

const render = () => {
  renderer.render(scene, camera);
  uniforms.u_time.value += clock.getDelta();
  cube.rotateX(0.01);
  cube.rotateY(0.01);
  cube.rotateZ(0.01);
  window.requestAnimationFrame(render);
};

const onWindowResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
};

window.addEventListener("resize", () => {
  onWindowResize();
});

onWindowResize();
render();
