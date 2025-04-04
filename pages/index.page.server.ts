export const passToClient = ['pageProps', 'items'];

export async function onBeforeRender() {
  return {
    pageContext: {
      pageProps: {
        greeting: '안녕 from 서버!'
      },
      items: [] // 예시로 함께 전달
    }
  };
}