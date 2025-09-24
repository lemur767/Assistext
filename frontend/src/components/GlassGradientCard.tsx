/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import styles from './GlassGradientCard.module.css';

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
    brand: styles.glowBrand,
    secondary: styles.glowSecondary,
    accent: styles.glowAccent,
    grey: styles.glowGrey,
    orange: styles.glowOrange,
  };

  const sizeClasses = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
    xl: styles.sizeXl
  };

  const blurClasses = {
    light: styles.blurLight,
    medium: styles.blurMedium,
    heavy: styles.blurHeavy
  };

  const animationOuterGlowClasses = {
    glow: styles.outerGlowAnimatePulse,
    pulse: styles.outerGlowAnimatePulse,
    shimmer: '',
    bounce: styles.outerGlowAnimateBounce,
    scale: '',
    ripple: '',
    wave: ''
  };

  const getTransformClass = () => {
    switch (animation) {
      case 'scale':
        return styles.transformScale;
      case 'bounce':
        return styles.transformBounce;
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
    <div className={`${styles.group} ${className}`}>
      {/* Outer glow effect */}
      <div className={`${styles.outerGlow} ${glowClasses[glow]} ${animationOuterGlowClasses[animation]}`} />

      {/* Middle glow effect */}
      <div className={`${styles.middleGlow} ${glowClasses[glow]}`} />

      {/* Main card */}
      <div
        ref={cardRef}
        className={`
          ${styles.mainCard}
          ${blurClasses[blur]}
          ${!noBorder ? styles.mainCardBorder : styles.mainCardNoBorder}
          ${sizeClasses[size]}
          ${getTransformClass()}
          ${isClickable ? styles.mainCardCursorPointer : ''}
        `}
        onClick={isClickable ? handleClick : undefined}
      >
        {/* Inner glow border */}
        {!noBorder && (
          <div className={styles.innerGlowBorder} />
        )}

        {/* Shimmer effect for shimmer variant */}
        {animation === 'shimmer' && (
          <div className={styles.shimmerEffect} />
        )}

        {/* Ripple effects */}
        {animation === 'ripple' && ripples.map((ripple) => (
          <div
            key={ripple.id}
            className={`${styles.rippleEffect} ${glowClasses[glow]}`}
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
            <div className={`${styles.waveEffect1} ${glowClasses[glow]} ${isWaveActive ? styles.active : ''}`} />
            <div className={`${styles.waveEffect2} ${glowClasses[glow]} ${isWaveActive ? styles.active : ''}`} />
            <div className={`${styles.waveEffect3} ${glowClasses[glow]} ${isWaveActive ? styles.active : ''}`} />
          </>
        )}

        {/* Content */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}