import { hydrateRoot } from 'react-dom/client';
import { PageShell } from '@/renderer/PageShell';
import type { PageContextClient } from 'vite-plugin-ssr/types';
import { dbItemService as itemService } from '@/services/itemService';
import GlobalLayoutSSR from '@/components/GlobalLayout.ssr'; // ✅ SSR-safe layout import

export function render(pageContext: PageContextClient) {
  const { Page, pageProps, items } = pageContext;

  console.log('[client] pageContext:', pageContext.pageProps);

  if (items) {
    itemService.hydrate?.(items);
  }

  hydrateRoot(
    document.getElementById('root')!,
    <PageShell>
      {/* ✅ GlobalLayoutSSR로 감싸서 페이지 렌더링 */}
      <GlobalLayoutSSR>
        <Page {...pageProps} />
      </GlobalLayoutSSR>
    </PageShell>
  );
}
