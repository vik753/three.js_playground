import React from "react";
import * as THREE from "three";

const FlyingBox = () => {
  let camera, scene, renderer, geometry, cube, material, wrapper;
  let ADD = 0.01;
  let angle = 0;

  React.useEffect(() => {
    init();
    animate();
  }, []);

  const init = () => {
    wrapper = document.querySelector(".flyingBox-wrapper");
    camera = new THREE.PerspectiveCamera(
      75,
      wrapper.clientWidth / wrapper.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xffffff);

    geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = -1;
    cube.position.y = 0;
    cube.position.z = 0;
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffc87f, 1);
    light.position.set(-1, 2, 6);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffc87f, 1);
    light2.position.set(-1, -1, 6);
    scene.add(light2);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    renderer.setClearColor(0x000000, 0);
    wrapper.appendChild(renderer.domElement);
  };

  const animate = () => {
    const radius = 0.05;
    cube.position.x += radius * Math.sin(angle);
    cube.position.y += radius * Math.cos(angle);
    cube.position.z += radius * Math.sin(angle);
    angle += (Math.PI / 180) * 2;

    cube.rotation.y += ADD;
    cube.rotation.x += ADD;
    cube.rotation.z += ADD;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  return <div className="flyingBox-wrapper" />;
};

export default FlyingBox;
