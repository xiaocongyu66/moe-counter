import { Router, error, html, json, text } from 'itty-router';
import config from '../config.yml';
import { getNum, setNum } from './db.js';
import { getCountImage } from './utils.js';
import indexHtml from './index.html';
import themes from '../themes';
import robots from './robots.txt';

const router = Router();

// 根路由
router.get('/', () => new Response(indexHtml, {
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
  },
}));

// favicon
router.get('/favicon.ico', () => error(404));

// robots.txt
router.get('/robots.txt', () => new Response(robots, {
  headers: {
    'Content-Type': 'text/plain; charset=utf-8',
  },
}));

// 心跳检查
router.get('/heart-beat', () => {
  return new Response('alive', {
    headers: {
      'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate',
    },
  });
});

// 获取计数记录
router.get('/record/:id', async (req, env) => {
  try {
    const { id } = req.params;

    if (!id || !/^[a-z0-9:.@_-]{1,256}$/i.test(id)) {
      return error(400, 'Invalid Counter ID');
    }

    const num = await getNum(env.DB, id);

    return new Response(JSON.stringify({ id, num }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Error in /record/:id:', err);
    return error(500, 'Internal Server Error');
  }
});

// 计数器主路由
router.get('/:id', async (req, env) => {
  try {
    const { id } = req.params;
    let { theme } = req.query;

    // 验证 ID
    if (!id || !/^[a-z0-9:.@_-]{1,256}$/i.test(id)) {
      return error(400, 'Invalid Counter ID');
    }

    // 验证主题
    if (!theme || !themes[theme]) {
      theme = config.theme || 'moebooru';
    }

    let count = 0;
    let length = config.length || 7;

    if (id === 'demo') {
      count = 123456789;
      length = 10;
    } else {
      // 增加计数
      count = await getNum(env.DB, id);
      count += 1;
      await setNum(env.DB, id, count);
    }

    const image = getCountImage(count, theme, length, true);

    return new Response(image, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': id === 'demo' ? 'public, max-age=31536000' : 'max-age=0, no-cache, no-store, must-revalidate',
      },
    });
  } catch (err) {
    console.error('Error in /:id:', err);
    return error(500, 'Internal Server Error');
  }
});

// 404 路由
router.all('*', () => error(404));

export default {
  fetch: async (request, env) => {
    try {
      return router.handle(request, env)
        .then(response => {
          if (response && typeof response === 'object' && 'status' in response) {
            return response;
          }
          return new Response(JSON.stringify(response), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        })
        .catch(err => {
          console.error('Router error:', err);
          return error(500, 'Internal Server Error');
        });
    } catch (err) {
      console.error('Fetch handler error:', err);
      return error(500, 'Internal Server Error');
    }
  },
};
