import { renderToString } from 'react-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import { PageShell } from '@/renderer/PageShell';
import type { PageContextServer } from 'vite-plugin-ssr/types';

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps, items = [] } = pageContext;

  // 서버에서 React 요소를 문자열로 렌더링
  const pageHtml = renderToString(
    <PageShell>
      <Page {...pageProps} />
    </PageShell>
  );

  // HTML 전체를 직접 구성
  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <title>My Fridge</title>
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
        <script>
          window.__INITIAL_ITEMS__ = ${dangerouslySkipEscape(JSON.stringify(items ?? []))};
        </script>
      </body>
    </html>`;
}
