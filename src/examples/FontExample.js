import React from "react";
import * as THREE from "three";
import fontJson from "./font/font";
// import * as fontJson from "./font/helvetiker_regular.typeface.json";

const FontExample = (props) => {
  let scene, camera, renderer, wrapper, text, endText;
  let ADD = 0.02;
  let ANGEL = 0.013;
  let STAR_SPEED = 0.4;
  let END_SPEED = 0.1;
  const stars = [];

  React.useEffect(() => {
    wrapper = document.querySelector(".font-wrapper");
    init();
    createStaticStars();
    createGeometry();
    createEnd();
    animate();
  }, []);

  const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    camera = new THREE.PerspectiveCamera(
      75,
      wrapper.clientWidth / wrapper.clientHeight,
      0.01,
      50
    );
    camera.position.set(0, 1.5, 5);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    wrapper.appendChild(renderer.domElement);
  };

  const createGeometry = () => {
    let loader = new THREE.FontLoader();
    let font = loader.parse(fontJson);
    let geometry = new THREE.TextGeometry(
      "Nothing happens in the some one very boring Galaxy.\nNothing happens in the some one very boring Galaxy.\nNothing happens in the some one very boring Galaxy.\nNothing happens in the some one very boring Galaxy.\nNothing happens in the some one very boring Galaxy.\nNothing happens in the some one very boring Galaxy.\nNothing happens in the some one very boring Galaxy.\nNothing happens in the some one very boring Galaxy.\nNothing happens in the some one very boring Galaxy.\nNothing happens in the some one very boring Galaxy...\n",
      {
        font: font,
        size: 0.2,
        height: 0.02,
      }
    );
    let material = new THREE.MeshBasicMaterial({ color: 0x0291bd });
    text = new THREE.Mesh(geometry, material);
    text.position.x = -3.5;
    text.position.y = -1;
    text.position.z = 6;
    text.rotateX(-1);
    scene.add(text);
  };

  const createEnd = () => {
    let loader = new THREE.FontLoader();
    let font = loader.parse(fontJson);
    let geometry = new THREE.TextGeometry("THE END", {
      font: font,
      size: 1,
      height: 3,
    });
    let material = new THREE.MeshBasicMaterial({ color: 0x0291bd });
    endText = new THREE.Mesh(geometry, material);
    endText.position.x = -2.5;
    endText.position.y = 1;
    endText.position.z = -50;
  };

  const getRAnge = (from, to) => {
    let x = Math.random() * (to - from);
    return x + from;
  };

  const createStar = () => {
    const geometry = new THREE.SphereGeometry(0.025, 3, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    star.position.set(getRAnge(-20, 20), getRAnge(-20, 20), -30);

    scene.add(star);
    stars.push(star);
  };

  const createStaticStars = () => {
    for (let x = 0; x < 500; x++) {
      const geometry = new THREE.SphereGeometry(0.025, 3, 3);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
      star.position.set(getRAnge(-20, 20), getRAnge(-10, 15), -10);
      scene.add(star);
    }
  };

  const animate = () => {
    text.position.z -= ADD;
    text.position.y += ANGEL;
    if (text.position.y > 12) {
      scene.remove(text);
      scene.add(endText);
      endText.position.z += END_SPEED;
    }

    createStar();
    createStar();

    stars.forEach((star) => (star.position.z += STAR_SPEED));

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  return <div className="font-wrapper" />;
};

export default FontExample;
