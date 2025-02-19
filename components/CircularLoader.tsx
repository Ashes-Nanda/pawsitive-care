'use client'

import React from 'react'

interface CircularLoaderProps {
  size?: number
  className?: string
}

export function CircularLoader({ size = 48, className = '' }: CircularLoaderProps) {
  return (
    <div 
      className={`relative inline-flex ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        className="animate-spin"
        viewBox="0 0 50 50"
        style={{ width: size, height: size }}
      >
        {/* Tick marks */}
        {[...Array(12)].map((_, i) => (
          <rect
            key={i}
            x="23.5"
            y="3"
            width="3"
            height="6"
            rx="1.5"
            fill="currentColor"
            className="text-zinc-600"
            style={{
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: '25px 25px',
              opacity: 0.3
            }}
          />
        ))}

        {/* Progress arc */}
        <path
          d="M25 5A20 20 0 1 1 24.999 5"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          strokeLinecap="round"
          className="origin-center"
          strokeDasharray="126"
          strokeDashoffset="126"
          style={{
            animation: 'loader-progress 1s ease-in-out infinite'
          }}
        />

        {/* Center pointer */}
        <g transform="translate(25, 25)">
          <polygon
            points="-4,0 4,0 0,-8"
            fill="hsl(var(--destructive))"
            className="origin-center animate-pointer"
          />
          <polygon
            points="-4,0 4,0 0,2"
            fill="hsl(var(--muted))"
            className="origin-center animate-pointer"
          />
        </g>
      </svg>

      <style jsx>{`
        @keyframes loader-progress {
          0% {
            stroke-dashoffset: 126;
          }
          50% {
            stroke-dashoffset: 63;
          }
          100% {
            stroke-dashoffset: 126;
          }
        }
      `}</style>
    </div>
  )
}

