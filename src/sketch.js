import * as THREE from 'three';
import { gsap, Power2 } from 'gsap';

export class Slider {
  constructor(opts) {
    this.scene = new THREE.Scene();
    this.vertex = `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}`;
    this.fragment = opts.fragment;
    this.uniforms = opts.uniforms;
    this.renderer = new THREE.WebGLRenderer();
    this.width = window.innerWidth;
    this.height = window.innerWidth;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);
    this.duration = opts.duration || 1;
    this.easing = opts.easing || 'easeInOut';

    this.container = opts.container;
    this.images = Array.from(this.container.querySelectorAll('img')).map(img => img.src);
    this.shade = document.getElementById("shader");

    this.textures = [];
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 1);
    this.time = 0;
    this.current = 0;
    this.paused = true;

    this.initiate(() => {
      this.setupResize();
      this.addObjects();
      this.settings();
      this.resize();
      this.addClickEvent();
      this.play();
    });
  }

  initiate(cb) {
    const promises = [];
    let that = this;
    this.images.forEach((url, i) => {
      let promise = new Promise((resolve) => {
        that.textures[i] = new THREE.TextureLoader().load(url, resolve);
      });
      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      cb();
    });
  }

  settings() {
    let that = this;
    this.settings = {progress:0.5};
    Object.keys(this.uniforms).forEach((item)=> {
      this.settings[item] = this.uniforms[item].value;
    })
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.imageAspect = this.textures[0].image.height / this.textures[0].image.width;
    let a1, a2;
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = (this.height / this.width) / this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;

    const dist = this.camera.position.z;
    const height = 1;
    this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist));
    this.plane.scale.x = this.camera.aspect;
    this.plane.scale.y = 1;

    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        progress: { type: "f", value: 0 },
        border: { type: "f", value: 0 },
        intensity: { type: "f", value: 0 },
        scaleX: { type: "f", value: 40 },
        scaleY: { type: "f", value: 40 },
        transition: { type: "f", value: 40 },
        swipe: { type: "f", value: 0 },
        width: { type: "f", value: 0 },
        radius: { type: "f", value: 0 },
        texture1: { type: "f", value: this.textures[0] },
        texture2: { type: "f", value: this.textures[1] },
        displacement: { type: "f", value: new THREE.TextureLoader().load(this.shade.src) },
        resolution: { type: "v4", value: new THREE.Vector4() },
      },
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
    });


    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1); 
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  addClickEvent() {
    this.container.addEventListener('mouseenter', () => this.next());
    // this.container.addEventListener('mouseleave', () => this.previous());
  }

  previous() {
    if (this.isRunning) return;
    this.isRunning = true;

    let len = this.textures.length;
    let prevTexture = this.textures[(this.current - 1 + len) % len];
    this.material.uniforms.texture2.value = prevTexture;

    gsap.to(this.material.uniforms.progress, {
      value: 1,
      duration: this.duration,
      ease: Power2[this.easing],
      onComplete: () => {
        this.current = (this.current - 1 + len) % len;
        this.material.uniforms.texture1.value = prevTexture;
        this.material.uniforms.progress.value = 0;
        this.isRunning = false;
      },
    });
  }

  next() {
    if (this.isRunning) return;
    this.isRunning = true;
    let len = this.textures.length;
    let nextTexture = this.textures[(this.current + 1) % len];
    this.material.uniforms.texture2.value = nextTexture;
    let tl = gsap.timeline();
    tl.to(this.material.uniforms.progress, {
      value: 1,
      duration: this.duration,
      ease: Power2[this.easing],
      onComplete: () => {
        this.current = (this.current + 1) % len;
        this.material.uniforms.texture1.value = nextTexture;
        this.material.uniforms.progress.value = 0;
        this.isRunning = false;
      },
    });
  }

  stop() {
    this.paused = true;
  }

  play() {
    this.paused = false;
    this.render();
  }

  render() {
    if (this.paused) return;
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;

    Object.keys(this.uniforms).forEach((item)=> {
      this.material.uniforms[item].value = this.settings[item];
    });

    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
