import React from 'react';
import '@/index.css'

export function PageShell({ children }: { children: React.ReactNode }) {
  return <React.StrictMode>{children}</React.StrictMode>;
}

