import { BoxGeometry, Mesh, PerspectiveCamera, Scene, ShaderMaterial, WebGLRenderer } from "three";

import vertex from "/shaders/vertex.glsl";
import fragment from "/shaders/fragment.glsl";

const target = document.querySelector("#renderContainer");

if (target === null) {
  throw new Error("Unable to find render target");
}

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(45, width / height, 0.1, 1);

camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const renderer = new WebGLRenderer();
renderer.setSize(width, height);

target.appendChild(renderer.domElement);

const rectangle = new BoxGeometry(1, 1, 1);
const material = new ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
});
const cube = new Mesh(rectangle, material);

scene.add(cube);
renderer.render(scene, camera);
