import { SVGProps } from 'react'

export function PawPalLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.4V11h1a3 3 0 0 1 3 3v2" />
      <path d="M8 15v2a3 3 0 0 0 6 0v-2" />
      <path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.4V11H9a3 3 0 0 0-3 3v2" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  )
}

