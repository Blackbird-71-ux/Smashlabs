'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  opacity: number;
  color: string;
  type: 'glass' | 'wood' | 'metal';
}

interface SmashAnimationProps {
  isActive: boolean;
  type: 'glass' | 'wood' | 'metal';
  onComplete?: () => void;
  enableSound?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

const SmashAnimation: React.FC<SmashAnimationProps> = ({
  isActive,
  type,
  onComplete,
  enableSound = true,
  intensity = 'medium'
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showImpact, setShowImpact] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Configuration based on type and intensity
  const getConfig = useCallback(() => {
    const baseConfig = {
      glass: {
        colors: ['#87CEEB', '#B0E0E6', '#E0F6FF', '#FFFFFF'],
        particleCount: intensity === 'low' ? 15 : intensity === 'medium' ? 25 : 35,
        gravity: 0.3,
        friction: 0.98,
        sound: '/sounds/glass-break.mp3',
        impactColor: '#87CEEB'
      },
      wood: {
        colors: ['#8B4513', '#A0522D', '#CD853F', '#DEB887'],
        particleCount: intensity === 'low' ? 12 : intensity === 'medium' ? 20 : 30,
        gravity: 0.4,
        friction: 0.95,
        sound: '/sounds/wood-break.mp3',
        impactColor: '#8B4513'
      },
      metal: {
        colors: ['#C0C0C0', '#808080', '#A9A9A9', '#D3D3D3'],
        particleCount: intensity === 'low' ? 10 : intensity === 'medium' ? 18 : 25,
        gravity: 0.5,
        friction: 0.92,
        sound: '/sounds/metal-clang.mp3',
        impactColor: '#C0C0C0'
      }
    };

    return baseConfig[type];
  }, [type, intensity]);

  // Create particles on impact
  const createParticles = useCallback(() => {
    const config = getConfig();
    const newParticles: Particle[] = [];
    const centerX = 200;
    const centerY = 200;

    for (let i = 0; i < config.particleCount; i++) {
      const angle = (Math.PI * 2 * i) / config.particleCount + Math.random() * 0.5;
      const velocity = 3 + Math.random() * 5;
      
      newParticles.push({
        id: `particle-${i}-${Date.now()}`,
        x: centerX + (Math.random() - 0.5) * 40,
        y: centerY + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: 4 + Math.random() * 8,
        rotation: Math.random() * 360,
        opacity: 1,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        type,
      });
    }

    setParticles(newParticles);
  }, [getConfig, type]);

  // Physics simulation
  const updateParticles = useCallback(() => {
    const config = getConfig();
    
    setParticles(prevParticles => {
      return prevParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * config.friction,
          vy: (particle.vy + config.gravity) * config.friction,
          rotation: particle.rotation + particle.vx * 2,
          opacity: Math.max(0, particle.opacity - 0.02),
        }))
        .filter(particle => 
          particle.opacity > 0 && 
          particle.x > -50 && 
          particle.x < 450 && 
          particle.y < 450
        );
    });
  }, [getConfig]);

  // Sound effect management
  const playSound = useCallback(async () => {
    if (!enableSound) return;
    
    try {
      const config = getConfig();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } else {
        const audio = new Audio();
        audio.volume = 0.3;
        audio.src = config.sound;
        audioRef.current = audio;
        await audio.play();
      }
    } catch (error) {
      console.warn('Could not play sound effect:', error);
    }
  }, [enableSound, getConfig]);

  // Main animation trigger
  useEffect(() => {
    if (isActive) {
      setShowImpact(true);
      createParticles();
      playSound();

      // Hide impact effect
      setTimeout(() => setShowImpact(false), 200);

      // Start physics animation
      const animate = () => {
        updateParticles();
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();

      // Complete animation
      setTimeout(() => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        setParticles([]);
        onComplete?.();
      }, 3000);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, createParticles, playSound, updateParticles, onComplete]);

  const config = getConfig();

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
      suppressHydrationWarning={true}
    >
      {/* Impact Flash Effect */}
      <AnimatePresence>
        {showImpact && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0, scale: 3 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
            suppressHydrationWarning={true}
          >
            <div
              className="w-32 h-32 rounded-full blur-xl"
              style={{ backgroundColor: config.impactColor }}
              suppressHydrationWarning={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particles */}
      <div className="absolute inset-0" suppressHydrationWarning={true}>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: `rotate(${particle.rotation}deg)`,
              borderRadius: type === 'glass' ? '2px' : type === 'wood' ? '1px' : '0px',
              boxShadow: type === 'glass' ? `0 0 ${particle.size}px ${particle.color}` : 'none',
            }}
            animate={{
              scale: [1, 0.8, 0.6],
              opacity: [particle.opacity, particle.opacity * 0.5, 0],
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Screen shake effect */}
      {showImpact && (
        <motion.div
          className="fixed inset-0 bg-transparent pointer-events-none"
          animate={{
            x: [0, -2, 2, -1, 1, 0],
            y: [0, -1, 1, -2, 2, 0],
          }}
          transition={{
            duration: 0.3,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
        />
      )}

      {/* Ripple effect */}
      <AnimatePresence>
        {showImpact && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            suppressHydrationWarning={true}
          >
            <div
              className="w-20 h-20 rounded-full border-4 border-current"
              style={{ borderColor: config.colors[0] }}
              suppressHydrationWarning={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmashAnimation; 