'use strict';
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

import _ from 'lodash';
import TWEEN from 'tween.js';

import { InlayMaterial, NeckMaterial, StringMaterial, FretMaterial } from './materials/index';
import { RENDERER_CONFIG } from './config/renderer';

function createFrets(numFrets) {
  let frets = [numFrets];

  for (let i = - 10; i <= 10; i++) {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(i, 5.1, 0));
    geometry.vertices.push(new THREE.Vector3(i, -0.1, 0));
    frets[i] = new THREE.Line(geometry, FretMaterial);
  }

  return frets;
}

function createStrings(numStrings) {
  let strings = [numStrings];

  _.times(numStrings, function(i) {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-10,i,0));
    geometry.vertices.push(new THREE.Vector3(10,i,0));
    strings[i] = new THREE.Line(geometry, StringMaterial);
  });

  return strings;
}


export default class FretBoard {
  constructor(container) {
    this.container = container;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer(RENDERER_CONFIG);
    this.renderer.setSize(WIDTH, HEIGHT);

    // Create Neck
    let geometry = new THREE.PlaneGeometry(1, 1);
    let neck = new THREE.Mesh(geometry, NeckMaterial);
    neck.scale.x = 22;
    neck.scale.y = 6;
    neck.translateOnAxis(new THREE.Vector3(0, 1, 0), 2.4);
    neck.position.z = -1;
    neck.width = 10;
    this.scene.add(neck);

    // create Inlay
    let inlayGeometry = new THREE.CircleGeometry(0.2, 12);
    let inlay = new THREE.Mesh(inlayGeometry, InlayMaterial);
    inlay.position.y = 2.5;
    this.scene.add(inlay);

    // Create Strings and Frets
    this.strings = createStrings(6);
    this.frets = createFrets(12);

    for (let i in this.strings) {
      this.scene.add(this.strings[i]);
    }

    for (let i in this.frets) {
      this.scene.add(this.frets[i]);
    }

    // Setup Renderer and Camera
    this.renderer.setClearColor(0xf0f0f0);

    this.camera.position.z = 10;
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
