'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, 300);
    mountRef.current.appendChild(renderer.domElement);

    // Create icosahedron geometry
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));

    // Create nodes (spheres) at the vertices
    const vertices = geometry.attributes.position.array;
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nodePositions = [];
    for (let i = 0; i < vertices.length; i += 3) {
      const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(vertices[i], vertices[i+1], vertices[i+2]);
      line.add(node);
      nodePositions.push(new THREE.Vector3(vertices[i], vertices[i+1], vertices[i+2]));
    }

    // Add additional connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (Math.random() > 0.7) { // Only create some connections
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]]);
          const connectingLine = new THREE.Line(lineGeometry, lineMaterial);
          line.add(connectingLine);
        }
      }
    }

    scene.add(line);

    // Position camera
    camera.position.z = 3;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      line.rotation.x += 0.002;
      line.rotation.y += 0.003;
      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / 300;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 300);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[300px]" />;
}