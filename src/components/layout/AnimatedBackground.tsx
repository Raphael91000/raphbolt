import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const beamCount = 45; // Increased beam count for denser network
    
    // Remove any existing beams
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Create new beams
    for (let i = 0; i < beamCount; i++) {
      const beam = document.createElement('div');
      beam.className = 'beam';
      
      // Create a more distributed starting position
      const startLeft = (i / beamCount) * 100 + (Math.random() * 20 - 10);
      beam.style.left = `${startLeft}%`;
      
      // Randomize size with more variation
      const height = 180 + Math.random() * 300;
      beam.style.height = `${height}px`;
      
      // Thinner beams for elegance
      const width = 0.5 + Math.random() * 1;
      beam.style.width = `${width}px`;
      
      // Longer animation duration for smoother movement
      const duration = 20 + Math.random() * 25;
      beam.style.animationDuration = `${duration}s`;
      
      // Randomize animation delay for more natural flow
      const delay = Math.random() * -20;
      beam.style.animationDelay = `${delay}s`;
      
      // Create connection points with varying sizes
      const point1 = document.createElement('div');
      point1.className = 'connection-point';
      const pointSize1 = 2 + Math.random() * 3;
      point1.style.width = `${pointSize1}px`;
      point1.style.height = `${pointSize1}px`;
      beam.appendChild(point1);
      
      const point2 = document.createElement('div');
      point2.className = 'connection-point';
      const pointSize2 = 2 + Math.random() * 3;
      point2.style.width = `${pointSize2}px`;
      point2.style.height = `${pointSize2}px`;
      point2.style.top = '100%';
      beam.appendChild(point2);
      
      container.appendChild(beam);
    }
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;