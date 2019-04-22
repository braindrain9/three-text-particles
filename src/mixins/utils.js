// eslint-disable-next-line
/* eslint-disable */

import bus from '../bus';
import 'three/examples/js/controls/OrbitControls.js';
import {ParticleUtils} from './three-utils';

const THREE = require('three');

export default {
  methods: {
    getAnimation(word, color){
      const particleCount = 10000,
            particleSize = 0.1,
            defaultAnimationSpeed = 1,
            morphAnimationSpeed = 0,
            canvasWidth = window.innerWidth,
            canvasHeight = window.innerHeight,
            fontVars = {
              size: 6,
              height: 2
            },
            animationVars = {
              speed: defaultAnimationSpeed/300,
              normalSpeed: defaultAnimationSpeed/300,
              fullSpeed: morphAnimationSpeed/100
            },
            windowHalfX = window.innerWidth / 2,
            windowHalfY = window.innerHeight / 2,
            typeface = '/Lato_Bold.json',
            canvas = document.getElementById('hero-canvas');

      let mouseX = 0, mouseY = 0,
          text = {};

      // three.js options
      const renderer = new THREE.WebGLRenderer({canvas, alpha : true}),
            scene = new THREE.Scene(),
            camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 10000 ),
            light = new THREE.AmbientLight( 0xFFFFFF, 1 ),
            mouse = new THREE.Vector2();

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvasWidth, canvasHeight);

      camera.position.y = 0;
      camera.position.z = 35;

      scene.add(light);

      // set controls
      const controls = new THREE.OrbitControls(camera, renderer.domElement);

      controls.enablePan = false;
      controls.enableKeys = false;
      controls.enableRotate = false;
      controls.enableZoom = false;
      controls.update();

      // particles
      const particles = new THREE.Geometry(),
            pMaterial = new THREE.PointsMaterial({
              size: particleSize,
            }),
            loader = new THREE.FontLoader();

      loader.load(typeface, (font) => {
        fontVars.font = font;
        text = ParticleUtils.createTextGeometry(word, fontVars, particleCount);

        enableTrigger(word, text);
      });

      ParticleUtils.fillParticles(particles, particleCount);

      const particleSystem = new THREE.Points(particles, pMaterial);

      // set color on init
      particleSystem.material.color = new THREE.Color(color);

      ParticleUtils.animateParticles(particles);

      scene.add(particleSystem);

      animate();

      function animate() {
        camera.position.x = particleSystem.position.x + (mouseX - camera.position.x) * 0.005;
        camera.position.y = ( - mouseY - camera.position.y ) * 0.005;
        camera.position.z = 35;

        camera.lookAt(scene.position);
        particles.verticesNeedUpdate = true;

        window.requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      function enableTrigger(word, text) {
        bus.$on("changeAnimationText", (word) => {
          text = ParticleUtils.createTextGeometry(word, fontVars, particleCount);

          ParticleUtils.morphTo(animationVars, particles, text.particles);
        });

        bus.$on("changeAnimationColor", (color) => {
          particleSystem.material.color = new THREE.Color(color);
        });

        if (text) {
          ParticleUtils.morphTo(animationVars, particles, text.particles);
        }
      }

      // mouse over effects
      canvas.onmousemove = function (e) {
        e.preventDefault();

        mouseX = e.clientX - windowHalfX;
        mouseY = e.clientY - windowHalfY;

        mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = - (e.clientY / renderer.domElement.clientHeight) * 2 + 1;
      };

      // on resize
      function fullScreen () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      window.addEventListener('resize', fullScreen, false)
    }
  }
}