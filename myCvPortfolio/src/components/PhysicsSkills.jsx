import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { cvData } from '../data/cvData';

const PhysicsSkills = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const bodiesRef = useRef(new Map());

  // Combine all skills from new categories
  const allSkills = [
    ...cvData.skills.languages,
    ...cvData.skills.frameworks,
    ...cvData.skills.tools
  ];
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait 500ms for the entrance animation to finish and layout to settle
    const initTimer = setTimeout(() => {

      // Cleanup previous instances (React StrictMode fix)
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world);
        Matter.Engine.clear(engineRef.current);
      }

      const Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Runner = Matter.Runner;

      const engine = Engine.create();
      engineRef.current = engine;

      // Get dimensions safely
      const container = sceneRef.current;
      const width = container ? container.clientWidth : 800;
      const height = 400;

      const render = Render.create({
        element: container,
        engine: engine,
        options: {
          width,
          height,
          background: 'transparent',
          wireframes: false,
        }
      });

      // --- BOUNDARIES ---
      // We make walls thick so items don't tunnel through
      const wallOptions = { isStatic: true, render: { visible: false } };
      const floor = Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions);
      const ceiling = Bodies.rectangle(width / 2, -100, width, 100, wallOptions);
      const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
      const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);

      World.add(engine.world, [floor, ceiling, leftWall, rightWall]);

      // --- SKILLS ---
      allSkills.forEach((skill, index) => {
        const x = Math.random() * (width - 100) + 50;
        const y = Math.random() * (height / 2) + 50;

        const body = Bodies.rectangle(x, y, 120, 40, {
          chamfer: { radius: 20 },
          restitution: 0.8, // Bounciness
          friction: 0.005,
          render: { visible: false }
        });

        body.label = skill;
        World.add(engine.world, body);
      });

      // --- MOUSE CONTROL ---
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });

      // Allow scrolling over the canvas
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      World.add(engine.world, mouseConstraint);

      // --- RUN ---
      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      // Show the React elements now that physics is ready
      setIsReady(true);

      // --- SYNC LOOP ---
      // This matches the div position to the invisible physics body
      const updateLoop = () => {
        if (!engineRef.current) return;

        const bodies = Matter.Composite.allBodies(engineRef.current.world);

        bodies.forEach(body => {
          const domNode = bodiesRef.current.get(body.label);
          if (domNode) {
            const { x, y } = body.position;
            const angle = body.angle;
            domNode.style.transform = `translate(${x - 60}px, ${y - 20}px) rotate(${angle}rad)`;
            domNode.style.opacity = 1; // Ensure visible
          }
        });
        requestAnimationFrame(updateLoop);
      };
      updateLoop();

    }, 100); // 100ms delay to ensure "width" is correct

    return () => clearTimeout(initTimer);
  }, []);

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden', background: '#1e1e1e', borderRadius: '12px', border: '1px solid #333' }}>

      {/* Physics Container */}
      <div ref={sceneRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />

      {/* Visual Badges */}
      {isReady && allSkills.map((skill) => (
        <div
          key={skill}
          ref={(el) => { if (el) bodiesRef.current.set(skill, el); }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '120px',
            height: '40px',
            background: '#646cff',
            color: '#fff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            userSelect: 'none',
            pointerEvents: 'none', // Lets clicks pass to physics engine
            willChange: 'transform',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            opacity: 0 // Start hidden, sync loop will reveal
          }}
        >
          {skill}
        </div>
      ))}

      <div style={{ position: 'absolute', bottom: 10, left: 0, width: '100%', textAlign: 'center', color: '#666', pointerEvents: 'none', fontSize: '0.8rem' }}>
        Grab and throw the skills!
      </div>
    </div>
  );
};

export default PhysicsSkills;