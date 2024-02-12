import {
  BoxGeometry,
  Camera,
  Clock,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
  PlaneGeometry,
} from "three";

import vertex from "/shaders/vertex.glsl";
import fragment from "/shaders/fragment.glsl";

const target = document.querySelector("#renderContainer");

if (target === null) {
  throw new Error("Unable to find render target");
}

const editor = document.querySelector<HTMLPreElement>("#editor");

if (editor === null) {
  throw new Error("Unable to find editor");
}

const width = window.innerWidth / 2;
const height = window.innerHeight;

const scene = new Scene();
const camera = new Camera();

camera.position.z = 1;

const renderer = new WebGLRenderer();

target.appendChild(renderer.domElement);

const clock = new Clock();

const uniforms = {
  u_time: { type: "f", value: 1.0 },
  u_resolution: { type: "v2", value: new Vector2() },
  u_mouse: { type: "v2", value: new Vector2() },
};

const geometry = new PlaneGeometry(2, 2);

const rectangle = new BoxGeometry(1, 1, 1);

const material = new ShaderMaterial({
  fragmentShader: document.querySelector("#editor")?.textContent ?? "",
  uniforms,
});

let cube = new Mesh(geometry, material);

scene.add(cube);

const render = () => {
  renderer.render(scene, camera);
  uniforms.u_time.value += clock.getDelta();

  window.requestAnimationFrame(render);
};

const onWindowResize = () => {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth / 2, window.innerHeight);
  uniforms.u_resolution.value.x = window.innerWidth / 2;
  uniforms.u_resolution.value.y = window.outerHeight;
};

window.onmousemove = (e) => {
  uniforms.u_mouse.value.x = e.pageX;
  uniforms.u_mouse.value.y = e.pageY;
};

window.addEventListener("resize", onWindowResize, false);

editor.addEventListener("input", (e) => {
  material.fragmentShader = (e.target as HTMLPreElement).textContent!;
  cube.material = material;
  cube.material.needsUpdate = true;
});

onWindowResize();
render();
