import express from 'express';
import { Request, Response } from 'express';
import cookie from 'cookie';
import { renderPage } from 'vite-plugin-ssr/server';
import { fetchItems } from './src/api/itemApi';
import { useItemStore } from './src/store/useItemStore';
import { createServer as createViteServer, ViteDevServer } from 'vite';


const isProduction = process.env.NODE_ENV === 'production';
const root = `${__dirname}/`;
const app = express();

if (!isProduction) {
  const viteServer: ViteDevServer = await createViteServer({
    root,
    server: { middlewareMode: true },
  });

  app.use(viteServer.middlewares);
} else {
  app.use(express.static('dist/client'));
}

app.get('*', async (req: Request, res: Response): Promise<void> => {
  const parsedCookies = cookie.parse(req.headers.cookie || '');
  const username = parsedCookies.username;

  // ✅ SSR 시점에 서비스 계층을 우회하여 상태 주입
  const items = username ? await fetchItems(username) : [];
  useItemStore.setState({ items });

  const pageContextInit = {
    urlOriginal: req.originalUrl,
    username,
    items: items ?? [],
  };

  const pageContext = await renderPage(pageContextInit);

  if (!pageContext.httpResponse) {
    res.status(404).send('Not found');
    return;
  }

  const { body, statusCode, contentType } = pageContext.httpResponse;
  res.status(statusCode).type(contentType).send(body);
});

app.listen(5173, () => {
  console.log('✅ Server running at http://localhost:5173');
});
