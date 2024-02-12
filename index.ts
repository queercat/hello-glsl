import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

const target = document.querySelector("#renderContainer");

if (target === null) {
  throw new Error("Unable to find render target");
}

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setSize(width, height);

target.appendChild(renderer.domElement);
