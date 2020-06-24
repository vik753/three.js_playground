import React from "react";
import * as THREE from "three";
import { OrbitControls } from "../vendors/orbitsControl";

const Playground = (props) => {
  let scene, light, camera, renderer, wrapper, sphere, orbitsControl;
  let ADD = 0.01;
  let figures = [];

  React.useEffect(() => {
    wrapper = document.querySelector(".sphere-wrapper");
    init();
    createBoxFigure(0x333333);
    createBoxFigure(0xb8b8b8);
    createSphereFigure();
    animate();
  }, []);

  const createBoxFigure = (color) => {
    const geometry = new THREE.BoxGeometry(1, 1, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x027ea7,
      side: THREE.DoubleSide,
      emissive: 0x027ea7,
      emissiveIntensity: 0.8,
      metalness: 0.1,
      roughness: 0.1,
    });
    const box = new THREE.Mesh(geometry, material);
    figures.push(box);
    scene.add(box);
  };

  const createSphereFigure = () => {
    const geometry = new THREE.SphereGeometry(2, 20, 20);
    const material = new THREE.MeshStandardMaterial({
      color: 0x027ea7,
      side: THREE.DoubleSide,
      emissive: 0x027ea7,
      emissiveIntensity: 0.7,
      metalness: 0.7,
      roughness: 0.4,
    });
    sphere = new THREE.Mesh(geometry, material);
    sphere.rotation.z = 0.6;
    scene.add(sphere);
  };

  const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-1, 2, 1);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(
      75,
      wrapper.clientWidth / wrapper.clientHeight,
      0.01,
      100
    );
    camera.position.set(-1, 2, 12);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    wrapper.appendChild(renderer.domElement);

    orbitsControl = new OrbitControls( camera, renderer.domElement );



  };

  const animate = () => {
    figures.forEach((box, index) => {
      box.rotation.z += ADD;
      if (index === 0) {
        box.position.set(
          Math.sin((Date.now() / 10000) * 5) * -8,
          0,
          Math.cos((Date.now() / 10000) * 5) * -8
        );
      } else {
        box.position.set(
          Math.sin(Date.now() / 1000) * -4,
          0,
          Math.cos(Date.now() / 1000) * -6
        );
      }
    });

    sphere.rotation.y += ADD;
    // sphere.rotation.x += ADD;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    orbitsControl.update();
  };

  React.useEffect(() => {
    const keyDownHandle = (e) => {
      console.log(e.keyCode);
    };

    window.addEventListener("keydown", keyDownHandle);

    return () => window.removeEventListener("keydown", keyDownHandle);
  }, []);

  return <div className="sphere-wrapper" />;
};

export default Playground;
