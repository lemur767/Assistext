/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import '../styles/GlassGradientCard.css';

type GlowVariant = 'brand' | 'secondary' | 'accent' | 'grey' | 'orange';
type SizeVariant = 'sm' | 'md' | 'lg' | 'xl';
type BlurVariant = 'light' | 'medium' | 'heavy';
type AnimationVariant = 'glow' | 'pulse' | 'shimmer' | 'bounce' | 'scale' | 'ripple' | 'wave';

interface RippleEffect {
  id: number;
  x: number;
  y: number;
}

interface GlassGradProps {
  children: React.ReactNode;
  className?: string;
  glow?: GlowVariant;
  size?: SizeVariant;
  blur?: BlurVariant;
  animation?: AnimationVariant;
  noBorder?: boolean;
  onClick?: () => void;
}

export function GlassGradCard({
  children,
  className = '',
  glow = 'brand',
  size = 'md',
  blur = 'medium',
  animation = 'glow',
  noBorder = false,
  onClick
}: GlassGradProps) {

  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [isWaveActive, setIsWaveActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const glowClasses = {
    brand: "glowBrand",
    secondary: "glowSecondary",
    accent: "glowAccent",
    grey: "glowGrey",
    orange: "glowOrange",
  };

  const sizeClasses = {
    sm: "sizeSm",
    md: "sizeMd",
    lg: "sizeLg",
    xl: "sizeXl"
  };

  const blurClasses = {
    light: "blurLight",
    medium: "blurMedium",
    heavy: "blurHeavy"
  };

  const animationOuterGlowClasses = {
    glow: "outerGlowAnimatePulse",
    pulse: "outerGlowAnimatePulse",
    shimmer: '',
    bounce: "outerGlowAnimateBounce",
    scale: '',
    ripple: '',
    wave: ''
  };

  const getTransformClass = () => {
    switch (animation) {
      case 'scale':
        return "transformScale";
      case 'bounce':
        return "transformBounce";
      default:
        return '';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick();
    }

    if (animation === 'ripple' && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = {
        id: Date.now(),
        x,
        y
      };

      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 1000);
    }

    if (animation === 'wave') {
      setIsWaveActive(true);
      setTimeout(() => setIsWaveActive(false), 1500);
    }
  };

  const isClickable = animation === 'ripple' || animation === 'wave' || onClick;

  return (
    <div className={`group ${className}`}>
      {/* Outer glow effect */}
      <div className={`outerGlow ${glowClasses[glow]} ${animationOuterGlowClasses[animation]}`} />

      {/* Middle glow effect */}
      <div className={`middleGlow ${glowClasses[glow]}`} />

      {/* Main card */}
      <div
        ref={cardRef}
        className={`
          mainCard
          ${blurClasses[blur]}
          ${!noBorder ? "mainCardBorder" : "mainCardNoBorder"}
          ${sizeClasses[size]}
          ${getTransformClass()}
          ${isClickable ? "mainCardCursorPointer" : ''}
        `}
        onClick={isClickable ? handleClick : undefined}
      >
        {/* Inner glow border */}
        {!noBorder && (
          <div className="innerGlowBorder" />
        )}

        {/* Shimmer effect for shimmer variant */}
        {animation === 'shimmer' && (
          <div className="shimmerEffect" />
        )}

        {/* Ripple effects */}
        {animation === 'ripple' && ripples.map((ripple) => (
          <div
            key={ripple.id}
            className={`rippleEffect ${glowClasses[glow]}`}
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
              width: '20px',
              height: '20px'
            }}
          />
        ))}

        {/* Wave effect */}
        {animation === 'wave' && (
          <>
            <div className={`waveEffect1 ${glowClasses[glow]} ${isWaveActive ? "active" : ''}`} />
            <div className={`waveEffect2 ${glowClasses[glow]} ${isWaveActive ? "active" : ''}`} />
            <div className={`waveEffect3 ${glowClasses[glow]} ${isWaveActive ? "active" : ''}`} />
          </>
        )}

        {/* Content */}
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}