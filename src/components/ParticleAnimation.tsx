import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleAnimationProps {
  className?: string;
}

const ParticleAnimation: React.FC<ParticleAnimationProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(600, 600);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    mountRef.current.appendChild(renderer.domElement);

    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0x222244);
    scene.add(ambientLight);

    // Add directional light for highlights
    const directionalLight = new THREE.DirectionalLight(0x0066ff, 0.3);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Camera position
    camera.position.z = 30;

    // Particle system - increased to 25,000
    const particleCount = 25000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const originalPositions = new Float32Array(particleCount * 3);

    // Color palette
    const colorsPalette = [
      {r: 0, g: 0, b: 0.5},     // Dark blue
      {r: 0, g: 0.2, b: 0.8},    // Medium blue
      {r: 0, g: 0.5, b: 1},      // Light blue
      {r: 0.2, g: 0.8, b: 1}     // Highlight blue
    ];

    // Initialize particles with more organized distribution
    for (let i = 0; i < particleCount; i++) {
      // Position particles in a cube for better initial distribution
      const gridSize = 30;
      const gridSteps = Math.cbrt(particleCount);
      const x = (i % gridSteps) / gridSteps * gridSize - gridSize/2;
      const y = (Math.floor(i / gridSteps) % gridSteps) / gridSteps * gridSize - gridSize/2;
      const z = (Math.floor(i / (gridSteps * gridSteps)) / gridSteps) * gridSize - gridSize/2;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      
      // Color variation
      const colorVar = Math.random();
      let color;
      if (colorVar < 0.7) color = colorsPalette[0];
      else if (colorVar < 0.9) color = colorsPalette[1];
      else if (colorVar < 0.98) color = colorsPalette[2];
      else color = colorsPalette[3];
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Size variation (small particles)
      sizes[i] = 0.015 + Math.random() * 0.01;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Target positions for different shapes (now with more detail)
    const targets = {
      globe: new Float32Array(particleCount * 3),
      ring: new Float32Array(particleCount * 3),
      servers: new Float32Array(particleCount * 3),
      tech: new Float32Array(particleCount * 3)
    };

    // Create more detailed target positions
    function createTargetPositions() {
      // Detailed globe with atmosphere effect
      for (let i = 0; i < particleCount; i++) {
        // Core globe
        if (i < particleCount * 0.8) {
          const radius = 10;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          
          targets.globe[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          targets.globe[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          targets.globe[i * 3 + 2] = radius * Math.cos(phi);
          
          // Add some "land masses" by perturbing some particles
          if (i % 7 === 0) {
            const bump = 0.8 + Math.random() * 0.4;
            targets.globe[i * 3] *= bump;
            targets.globe[i * 3 + 1] *= bump;
            targets.globe[i * 3 + 2] *= bump;
          }
        } 
        // Atmosphere effect
        else {
          const radius = 10 + Math.random() * 3;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          
          targets.globe[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          targets.globe[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          targets.globe[i * 3 + 2] = radius * Math.cos(phi);
          
          // Make atmosphere particles slightly brighter
          colors[i * 3 + 2] = Math.min(1, colors[i * 3 + 2] * 1.5);
        }
      }

      // Detailed ring - torus/ring shape with organic variations
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 * 8; // Multiple rings
        const ringRadius = 8 + Math.sin(angle * 3) * 2; // Varying radius for organic look
        const tubeRadius = 1.5 + Math.cos(angle * 5) * 0.5; // Varying tube thickness
        const height = Math.sin(angle * 2) * 2; // Some vertical variation
        
        // Main ring particles
        if (i < particleCount * 0.85) {
          const tubeAngle = Math.random() * Math.PI * 2;
          const x = (ringRadius + tubeRadius * Math.cos(tubeAngle)) * Math.cos(angle);
          const y = height + tubeRadius * Math.sin(tubeAngle);
          const z = (ringRadius + tubeRadius * Math.cos(tubeAngle)) * Math.sin(angle);
          
          targets.ring[i * 3] = x;
          targets.ring[i * 3 + 1] = y;
          targets.ring[i * 3 + 2] = z;
        } else {
          // Outer glow particles
          const glowRadius = ringRadius + 3 + Math.random() * 2;
          targets.ring[i * 3] = glowRadius * Math.cos(angle);
          targets.ring[i * 3 + 1] = height + (Math.random() - 0.5) * 3;
          targets.ring[i * 3 + 2] = glowRadius * Math.sin(angle);
          
          // Make glow particles brighter
          colors[i * 3] = colorsPalette[2].r;
          colors[i * 3 + 1] = colorsPalette[2].g;
          colors[i * 3 + 2] = colorsPalette[2].b;
        }
      }

      // Highly detailed server rack
      for (let i = 0; i < particleCount; i++) {
        const serverCount = 8; // More servers
        const serverIndex = Math.floor(i / (particleCount / serverCount));
        const serverHeight = 2.5;
        const serverWidth = 7;
        const serverDepth = 2.5;
        const spacing = 0.8;
        
        const baseY = -12 + serverIndex * (serverHeight + spacing);
        
        // Main server body
        if (i % 100 < 95) {
          targets.servers[i * 3] = (Math.random() - 0.5) * serverWidth;
          targets.servers[i * 3 + 1] = baseY + Math.random() * serverHeight;
          targets.servers[i * 3 + 2] = (Math.random() - 0.5) * serverDepth;
          
          // Add some structure to servers
          if (i % 20 === 0) {
            // Vertical dividers
            targets.servers[i * 3] = (Math.random() > 0.5 ? 1 : -1) * (serverWidth/2 - 0.3);
            targets.servers[i * 3 + 2] = 0;
          }
        }
        // Server details
        else {
          // Front panel details
          if (i % 2 === 0) {
            // Drive bays
            targets.servers[i * 3] = (Math.random() - 0.5) * (serverWidth - 1);
            targets.servers[i * 3 + 1] = baseY + serverHeight * 0.2 + Math.floor(Math.random() * 3) * 0.6;
            targets.servers[i * 3 + 2] = serverDepth/2 + 0.1;
          } else {
            // Status lights
            targets.servers[i * 3] = serverWidth/2 - 0.5;
            targets.servers[i * 3 + 1] = baseY + serverHeight * (0.3 + Math.random() * 0.4);
            targets.servers[i * 3 + 2] = serverDepth/2 + 0.1;
            
            // Make lights brighter
            colors[i * 3] = colorsPalette[3].r;
            colors[i * 3 + 1] = colorsPalette[3].g;
            colors[i * 3 + 2] = colorsPalette[3].b;
          }
        }
      }

      // Highly detailed circuit board
      for (let i = 0; i < particleCount; i++) {
        // Circuit board base (more detailed grid)
        if (i < particleCount * 0.5) {
          const x = Math.floor((i % 100) / 10) * 1.5 - 7;
          const y = Math.floor((i % 1000) / 100) * 1.5 - 7;
          
          targets.tech[i * 3] = x + (Math.random() - 0.5) * 0.3;
          targets.tech[i * 3 + 1] = y + (Math.random() - 0.5) * 0.3;
          targets.tech[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
          
          // Make some particles traces
          if (i % 50 === 0) {
            const length = 3 + Math.random() * 4;
            for (let j = 0; j < length; j++) {
              if (i + j < particleCount * 0.5) {
                targets.tech[(i + j) * 3] = x + j * 0.15;
                targets.tech[(i + j) * 3 + 1] = y;
                targets.tech[(i + j) * 3 + 2] = 0.1;
              }
            }
          }
        } 
        // CPU chip with pins
        else if (i < particleCount * 0.65) {
          // CPU body
          if (i % 10 < 8) {
            targets.tech[i * 3] = (Math.random() - 0.5) * 2.5;
            targets.tech[i * 3 + 1] = 2 + (Math.random() - 0.5) * 1.5;
            targets.tech[i * 3 + 2] = 0.5 + Math.random() * 0.3;
          } 
          // CPU pins
          else {
            const angle = Math.random() * Math.PI * 2;
            const radius = 1.8 + Math.random() * 0.2;
            targets.tech[i * 3] = Math.cos(angle) * radius;
            targets.tech[i * 3 + 1] = 2 + Math.sin(angle) * radius;
            targets.tech[i * 3 + 2] = 0;
          }
        }
        // RAM chips with details
        else if (i < particleCount * 0.85) {
          const ramIndex = Math.floor((i - particleCount * 0.65) / (particleCount * 0.2 / 4));
          // RAM body
          if (i % 10 < 7) {
            targets.tech[i * 3] = -7 + ramIndex * 4.5 + (Math.random() - 0.5) * 3;
            targets.tech[i * 3 + 1] = -3 + (Math.random() - 0.5) * 1;
            targets.tech[i * 3 + 2] = 0.3 + Math.random() * 0.2;
          } 
          // RAM contacts
          else {
            targets.tech[i * 3] = -7 + ramIndex * 4.5 + (Math.random() - 0.5) * 3;
            targets.tech[i * 3 + 1] = -3.5;
            targets.tech[i * 3 + 2] = 0.1;
          }
        }
        // Other components (capacitors, resistors, etc.)
        else {
          // Capacitors
          if (i % 3 === 0) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 0.3 + Math.random() * 0.2;
            targets.tech[i * 3] = (Math.random() - 0.5) * 12;
            targets.tech[i * 3 + 1] = (Math.random() - 0.5) * 8;
            targets.tech[i * 3 + 2] = 0.2 + Math.sin(angle) * radius;
          } 
          // Resistors
          else if (i % 3 === 1) {
            const length = 0.8 + Math.random() * 0.4;
            const angle = Math.random() * Math.PI * 2;
            targets.tech[i * 3] = (Math.random() - 0.5) * 12 + Math.cos(angle) * length;
            targets.tech[i * 3 + 1] = (Math.random() - 0.5) * 8 + Math.sin(angle) * length;
            targets.tech[i * 3 + 2] = 0.2;
          }
          // LEDs
          else {
            targets.tech[i * 3] = (Math.random() - 0.5) * 12;
            targets.tech[i * 3 + 1] = (Math.random() - 0.5) * 8;
            targets.tech[i * 3 + 2] = 0.3;
            
            // Make LEDs brighter
            colors[i * 3] = colorsPalette[3].r;
            colors[i * 3 + 1] = colorsPalette[3].g;
            colors[i * 3 + 2] = colorsPalette[3].b;
          }
        }
      }
      
      // Update colors attribute
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }

    createTargetPositions();

    // Animation state
    const shapes = ['globe', 'ring', 'servers', 'tech'] as const;
    type ShapeType = typeof shapes[number];
    let currentShapeIndex = 0;
    let transitionProgress = 0;
    let transitionDuration = 300; // Longer transition for smoother effect
    let holdDuration = 250; // frames to hold shape
    let frameCount = 0;
    let isInitializing = true;

    // Easing function for smoother transitions
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Animation loop
    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      // Get current and next shape
      const currentShape: ShapeType = shapes[currentShapeIndex];
      const nextShapeIndex = (currentShapeIndex + 1) % shapes.length;
      const nextShape: ShapeType = shapes[nextShapeIndex];
      
      // Initial animation - particles coming together
      if (isInitializing) {
        const initProgress = Math.min(1, frameCount / 120);
        const easedProgress = easeInOutCubic(initProgress);
        
        const positions = particles.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = originalPositions[i * 3] * (1 - easedProgress) + 
                            targets.globe[i * 3] * easedProgress;
          positions[i * 3 + 1] = originalPositions[i * 3 + 1] * (1 - easedProgress) + 
                                targets.globe[i * 3 + 1] * easedProgress;
          positions[i * 3 + 2] = originalPositions[i * 3 + 2] * (1 - easedProgress) + 
                                targets.globe[i * 3 + 2] * easedProgress;
        }
        particles.attributes.position.needsUpdate = true;
        
        if (initProgress >= 1) {
          isInitializing = false;
          frameCount = 0;
        }
      } 
      // Main animation sequence
      else {
        // Update particle positions during transition
        if (frameCount < holdDuration) {
          // Holding current shape
          transitionProgress = 0;
        } else if (frameCount < holdDuration + transitionDuration) {
          // Transitioning to next shape
          transitionProgress = (frameCount - holdDuration) / transitionDuration;
          const easedProgress = easeInOutCubic(transitionProgress);
          
          const positions = particles.attributes.position.array;
          
          for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = targets[currentShape][i * 3] * (1 - easedProgress) + 
                              targets[nextShape][i * 3] * easedProgress;
            positions[i * 3 + 1] = targets[currentShape][i * 3 + 1] * (1 - easedProgress) + 
                                  targets[nextShape][i * 3 + 1] * easedProgress;
            positions[i * 3 + 2] = targets[currentShape][i * 3 + 2] * (1 - easedProgress) + 
                                  targets[nextShape][i * 3 + 2] * easedProgress;
          }
          
          particles.attributes.position.needsUpdate = true;
        } else {
          // Transition complete, move to next shape
          frameCount = 0;
          currentShapeIndex = nextShapeIndex;
        }
      }
      
      frameCount++;
      
      // Rotate the particle system slowly
      particleSystem.rotation.y += 0.0015;
      
      renderer.render(scene, camera);
    }

    animate();

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particles.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`particle-animation ${className || ''}`}
      style={{ width: '600px', height: '600px' }}
    />
  );
};

export default ParticleAnimation;
