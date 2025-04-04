import type { PageContextBuiltIn } from 'vite-plugin-ssr';
import { Item } from './item';

declare module 'vite-plugin-ssr/types' {
  interface PageContextServer extends PageContextBuiltIn {
    pageProps?: Record<string, unknown>;
    items?: Item[];
  }

  interface PageContextClient extends PageContextBuiltIn {
    pageProps?: Record<string, unknown>;
    items?: Item[];
  }
}