import React from 'react';
import Home from '@/pages/Home'
import GlobalLayoutSSR from '@/components/GlobalLayout.ssr';

export function Page() {
  return (
    <GlobalLayoutSSR>
      <Home />
    </GlobalLayoutSSR>
  )
}

export default {};