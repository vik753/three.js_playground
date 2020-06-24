import React from "react";
import * as THREE from "three";

const Jupiter = (props) => {
  let camera, scene, renderer, wrapper;
  let jupiterSphere;
  let jupiterOrbits = [];
  let ADD = 0.03;
  let ORBIT_ANGLE = 0.001;
  let ORBIT_ANGLE2 = 0.001;
  let ORBIT_ANGLE3 = 0.001;

  React.useEffect(() => {
    wrapper = document.querySelector(".jupiter-wrapper");
    init();
    animate();
  }, []);

  const init = () => {
    camera = new THREE.PerspectiveCamera(
      75,
      wrapper.clientWidth / wrapper.clientHeight,
      0.1,
      1000
    );
    camera.position.set(-1, 0, 22);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    createJupiter();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    wrapper.appendChild(renderer.domElement);
  };

  const createJupiter = () => {
    const geometry = new THREE.SphereGeometry(3, 30, 30);
    const material = new THREE.MeshBasicMaterial({
      color: 0x925722,
      wireframe: false,
    });
    jupiterSphere = new THREE.Mesh(geometry, material);
    jupiterSphere.rotateX(2);
    jupiterSphere.rotateX(Math.PI / 2 + 0.1);
    jupiterSphere.rotateY(0.3);
    scene.add(jupiterSphere);

    const geometryC1 = new THREE.TorusGeometry(4.1, 0.7, 2, 40);
    const materialC1 = new THREE.MeshBasicMaterial({
      color: 0xffe29e,
      wireframe: false,
    });
    const c1 = new THREE.Mesh(geometryC1, materialC1);
    c1.rotateX(Math.PI / 2 + 0.1);
    c1.rotateY(0.3);
    scene.add(c1);
    jupiterOrbits.push(c1);

    const geometryC2 = new THREE.TorusGeometry(5.6, 0.5, 2, 40);
    const materialC2 = new THREE.MeshBasicMaterial({
      color: 0xffb25f,
      wireframe: false,
    });
    const c2 = new THREE.Mesh(geometryC2, materialC2);
    c2.rotateX(Math.PI / 2 + 0.1);
    c2.rotateY(0.3);
    scene.add(c2);
    jupiterOrbits.push(c2);

    const geometryC3 = new THREE.TorusGeometry(6.9, 0.5, 2, 40);
    const materialC3 = new THREE.MeshBasicMaterial({
      color: 0xffe29e,
      wireframe: false,
    });
    const c3 = new THREE.Mesh(geometryC3, materialC3);
    c3.rotateX(Math.PI / 2 + 0.1);
    c3.rotateY(0.3);
    scene.add(c3);
    jupiterOrbits.push(c3);
  };

  const animate = () => {
    if (camera.position.y <= -10 || camera.position.y >= 10) {
      ADD *= -1;
    }
    camera.position.y += ADD;

    jupiterOrbits.forEach((orb, index) => {
      console.log(orb.rotation.x)
      if (index === 0) {
        // if (orb.rotation.x <= 1.5 || orb.rotation.x >= 1.8) {
        //   ORBIT_ANGLE *= -1;
        // }
        // orb.rotation.x += ORBIT_ANGLE;
      } else if (index === 1) {
        if (orb.rotation.x <= 1.5 || orb.rotation.x >= 1.8) {
          ORBIT_ANGLE2 *= -1;
        }
        orb.rotation.x -= ORBIT_ANGLE2;
      } else {
        if (orb.rotation.x <= 1.5 || orb.rotation.x >= 1.8) {
          ORBIT_ANGLE3 *= -1;
        }
        orb.rotation.x += ORBIT_ANGLE3;
      }
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  return <div className="jupiter-wrapper" />;
};

export default Jupiter;
