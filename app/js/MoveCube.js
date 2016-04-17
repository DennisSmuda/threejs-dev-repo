var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;


import { basicGreyMaterial } from './materials/index';
import { rendererConfig } from './config/renderer';


export default class MoveCube {
  constructor(container) {
    this.container = container;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000),

    this.renderer = new THREE.WebGLRenderer(rendererConfig);
    this.renderer.setSize(WIDTH, HEIGHT);


    let geometry = new THREE.BoxGeometry(1, 1, 1);
    this.cube = new THREE.Mesh( geometry, basicGreyMaterial );
    this.scene.add(this.cube);


    this.renderer.setClearColor(0xf0f0f0);

    this.camera.position.z = 3;

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
    this.cube.rotation.y += 0.005;
    this.cube.rotation.z += 0.001;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.loop.bind(this));
  }

}
