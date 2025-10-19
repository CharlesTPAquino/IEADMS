import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 4.5c3 3 1.9 9.5-1 12.5C10.5 20 8 22 8 22s-2-2.5-2.5-5C5 14.5 4 10.5 7 7.5c3-3 6.5-2 7.5-3Z" />
      <path d="M9.5 12.5c-3-3-1.9-9.5 1-12.5C13.5-3 16-5 16-5s2 2.5 2.5 5c.5 2.5 1.5 6.5-1.5 9.5-3 3-6.5 2-7.5 3Z" />
    </svg>
  );
}
