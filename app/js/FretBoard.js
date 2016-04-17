var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;


import { basicGreyMaterial, LineBasicMaterial } from './materials/index';
import { RENDERER_CONFIG } from './config/renderer';
import { BoxGeometry } from './geometry/Box';


function createStrings() {
  let strings = [];

  for (let i = 0; i < 6; i++) {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-10,i,0));
    geometry.vertices.push(new THREE.Vector3(10,i,0));
    strings[i] = new THREE.Line(geometry, LineBasicMaterial);
  }

  return strings;
}


export default class FretBoard {
  constructor(container) {
    this.container = container;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000),

    this.renderer = new THREE.WebGLRenderer(RENDERER_CONFIG);
    this.renderer.setSize(WIDTH, HEIGHT);

    this.strings = createStrings();

    for (let i in this.strings) {
      this.scene.add(this.strings[i]);
    }


    this.renderer.setClearColor(0xf0f0f0);

    this.camera.position.z = 7;
    this.camera.position.y = 3;

    this.container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize (e) {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    this.renderer.setSize(WIDTH, HEIGHT);
    this.camera.aspect = WIDTH / HEIGHT;
    this.camera.updateProjectionMatrix();
  }

  loop () {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.loop.bind(this));
  }

}
