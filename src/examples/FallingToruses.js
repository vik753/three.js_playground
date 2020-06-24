import React from 'react';
import * as THREE from "three";


const FallingToruses = () => {
  let scene, camera, renderer, wrapper;
  const donuts = [];

  React.useEffect(() => {
    wrapper = document.querySelector(".sphere-wrapper");
    init();
    animate();
  }, []);

  const init = () => {
    camera = new THREE.PerspectiveCamera(
      75,
      wrapper.clientWidth / wrapper.clientHeight,
      0.1,
      100
    );
    camera.position.set(-1, 0, 18);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    wrapper.appendChild(renderer.domElement);
  };

  const getRange = (from, to) => {
    let x = Math.random() * (to - from);
    return x + from;
  };

  const createDonut = () => {
    const geometry = new THREE.TorusGeometry(1, 0.7, 2, 20, Math.PI * getRange(1, 2));
    const material = new THREE.MeshBasicMaterial({
      color: Math.random() * 0xffffff,
      wireframe: true
    });
    const donut = new THREE.Mesh(geometry, material);
    donut.position.x = getRange(-15, 15);
    donut.position.z = getRange(-15, 15);
    donut.position.y = 15;
    donut.rotateY(getRange(0, 360));

    scene.add(donut);
    donuts.push(donut);
  };

  const animate = () => {
    let x = Math.random();
    if (x < 0.1) {
      createDonut();
    }

    donuts.forEach((d) => {
      d.position.y -= 0.1;
      d.rotation.y += 0.01;
      d.rotation.x += 0.01;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  return (
    <div className="sphere-wrapper"/>
  );
}

export default FallingToruses