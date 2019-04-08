// eslint-disable-next-line
/* eslint-disable */

import bus from '../bus';
require('three/examples/js/controls/OrbitControls.js');
import {GeometryUtils, ParticleUtils} from './three';
const THREE = require('three');

export default {
  methods: {
    getAnimation(){
      const particleCount = 5000,
        particleSize = 0.1,
        defaultAnimationSpeed = 1,
        morphAnimationSpeed = 0,
        color = '#fff',
        canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight,
        fontConfig = {
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
        maxOffset = 8,
        typeface = '/Lato_Bold.json',
        triggers = ['hello'];

      let mouseX = 0, mouseY = 0;

      // three.js options
      const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-canvas'), alpha : true}),
        scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 10000 ),
        light = new THREE.AmbientLight( 0xFFFFFF, 1 ),
        raycaster = new THREE.Raycaster(),
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
            texts = [],
            pMaterial = new THREE.PointsMaterial({
              size: particleSize,
            }),
            loader = new THREE.FontLoader();

      loader.load(typeface, (font) => {
        Array.from(triggers).forEach((trigger, idx) => {
          texts[idx] = {};
          texts[idx].geometry = new THREE.TextGeometry(trigger, {
            font,
            size: fontConfig.size,
            height: fontConfig.height
          });

          texts[idx].geometry.center();
          texts[idx].particles = new THREE.Geometry();
          texts[idx].points = GeometryUtils.randomPointsInGeometry(texts[idx].geometry, particleCount);
          ParticleUtils.createVertices(particleCount, texts[idx].particles, texts[idx].points);
          enableTrigger(trigger, idx);
        });
      });

      ParticleUtils.fillParticles(particles, particleCount);

      // if (!this.isTouchDevice()) {
      document.getElementById('hero-canvas').onmousemove = function (e) {
        // e.preventDefault();

        mouseX = e.clientX - windowHalfX;
        mouseY = e.clientY - windowHalfY;

        mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = - (e.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(scene.children, true);

        // if (intersects.length > 0) {
        //   intersects = intersects.filter(obj => obj.distanceToRay < 0.8);
        //   intersects.forEach((obj, i) => {
        //     const index = intersects[i].index,
        //       point = particles.vertices[index],
        //       startX = point.x,
        //       startY = point.y;
        //
        //     TweenMax.to(point, 1, {
        //       x: ParticleUtils.random(point.x - maxOffset / 2, point.x + maxOffset / 2),
        //       y: ParticleUtils.random(point.y - maxOffset / 2, point.y + maxOffset / 2),
        //       ease: Sine.easeInOut,
        //       onComplete
        //     });
        //
        //     function onComplete() {
        //       TweenMax.to(point, 1.5, {
        //         x: startX,
        //         y: startY,
        //         ease: Power2.easeOut,
        //         speed: animationVars.normalSpeed,
        //         delay: 0.1
        //       });
        //     }
        //   })
        // }
      };

      const particleSystem = new THREE.Points(particles, pMaterial);

      ParticleUtils.animateParticles(particles);

      scene.add(particleSystem);

      animate();

      function animate() {
        camera.position.x = particleSystem.position.x + (mouseX - camera.position.x) * 0.005;
        camera.position.y = ( - mouseY - camera.position.y ) * 0.005;
        camera.position.z = 35;

        camera.lookAt(scene.position);
        particles.verticesNeedUpdate = true;
        particleSystem.material.color = new THREE.Color(color);

        window.requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      function enableTrigger(trigger, idx) {
        bus.$on("animateServicesParticles", index => {
          ParticleUtils.morphToServices(animationVars, particles, texts[index].particles);
        });

        if (idx === 0) {
          ParticleUtils.morphToServices(animationVars, particles, texts[idx].particles);
        }
      }
    }
  }
}