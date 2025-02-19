'use client'

import React from 'react'

interface TailTrackerLoaderProps {
  className?: string
}

export function TailTrackerLoader({ className = '' }: TailTrackerLoaderProps) {
  return (
    <div className={`inline-flex ${className}`}>
      <svg className="w-[9.375em] h-[9.375em]" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <mask id="mask1">
            <rect x="0" y="0" width="160" height="160" fill="url(#grad)" />
          </mask>
          <mask id="mask2">
            <rect x="28" y="28" width="104" height="104" fill="url(#grad)" />
          </mask>
        </defs>
        <g>
          <g className="animate-ring-rotate origin-[80px_80px]">
            <circle 
              className="animate-ring-stroke origin-[80px_80px] rotate-[-45deg]"
              cx="80" 
              cy="80" 
              r="72" 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="16" 
              strokeDasharray="452.39 452.39" 
              strokeDashoffset="452" 
              strokeLinecap="round" 
              transform="rotate(-45,80,80)" 
            />
          </g>
        </g>
        <g mask="url(#mask1)">
          <g className="animate-ring-rotate origin-[80px_80px]">
            <circle 
              className="animate-ring-stroke origin-[80px_80px] rotate-[-45deg]"
              cx="80" 
              cy="80" 
              r="72" 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="16" 
              strokeDasharray="452.39 452.39" 
              strokeDashoffset="452" 
              strokeLinecap="round" 
              transform="rotate(-45,80,80)" 
            />
          </g>
        </g>
        <g>
          <g strokeWidth="4" strokeDasharray="12 12" strokeDashoffset="12" strokeLinecap="round" transform="translate(80,80)">
            {[...Array(8)].map((_, i) => (
              <polyline
                key={i}
                className="animate-tick"
                style={{ animationDelay: `${-0.25 * i}s` }}
                stroke="hsl(var(--primary) / 0.3)"
                points="0,2 0,14"
                transform={`rotate(${-135 + i * 45},0,0) translate(0,40)`}
              />
            ))}
          </g>
        </g>
        <g mask="url(#mask1)">
          <g strokeWidth="4" strokeDasharray="12 12" strokeDashoffset="12" strokeLinecap="round" transform="translate(80,80)">
            {[...Array(8)].map((_, i) => (
              <polyline
                key={i}
                className="animate-tick"
                style={{ animationDelay: `${-0.25 * i}s` }}
                stroke="hsl(var(--primary))"
                points="0,2 0,14"
                transform={`rotate(${-135 + i * 45},0,0) translate(0,40)`}
              />
            ))}
          </g>
        </g>
        <g>
          <g transform="translate(64,28)">
            <g className="animate-arrows origin-[16px_52px] rotate-45" transform="rotate(45,16,52)">
              <path 
                fill="hsl(var(--primary))" 
                d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z" 
              />
              <path 
                fill="hsl(var(--primary) / 0.3)" 
                d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z" 
              />
            </g>
          </g>
        </g>
        <g mask="url(#mask2)">
          <g transform="translate(64,28)">
            <g className="animate-arrows origin-[16px_52px] rotate-45" transform="rotate(45,16,52)">
              <path 
                fill="hsl(var(--primary))" 
                d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z" 
              />
              <path 
                fill="hsl(var(--primary))" 
                d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z" 
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

