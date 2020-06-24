import React from "react";
import * as THREE from "three";

const Butterfly = () => {
  let camera, scene, light, renderer, wrapper, shape;
  let ADD = 0.5;

  React.useEffect(() => {
    wrapper = document.querySelector(".butterfly-wrapper");
    init();
    animate();
  }, []);

  const init = () => {
    camera = new THREE.PerspectiveCamera(
      75,
      wrapper.clientWidth / wrapper.clientHeight,
      0.01,
      1000
    );
    camera.position.set(0, 0, 15);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 2, 16);
    scene.add(light);

    createButterfly();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    wrapper.appendChild(renderer.domElement);
  };

  const createButterfly = () => {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(5, 3, -1));
    geometry.vertices.push(new THREE.Vector3(-1, 3, 2));
    geometry.vertices.push(new THREE.Vector3(-1, 3, -2));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 1, 3));
    // geometry.faces.push(new THREE.Face3(0, 2, 3));

    let material = new THREE.MeshBasicMaterial({
      color: 0xfe4332,
      side: THREE.DoubleSide,
      // wireframe: true,
    });
    shape = new THREE.Mesh(geometry, material);
    scene.add(shape);
  };

  const animate = () => {
    shape.position.set(
      Math.sin(Date.now() / 1000) * 5,
      Math.sin(Date.now() / 1000) * 5,
      Math.cos(Date.now() / 1000) * 5
    );

    if (shape.geometry.vertices[2].y < -3 || shape.geometry.vertices[2].y > 3) {
      ADD *= -1;
    }

    shape.geometry.vertices[2].y -= ADD;
    shape.geometry.vertices[3].y -= ADD;
    shape.geometry.verticesNeedUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  return <div className="butterfly-wrapper" />;
};

export default Butterfly;
