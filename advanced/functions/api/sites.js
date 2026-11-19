/**
 * Cloudflare Pages Function —— 可选的 KV 管理接口
 *
 * 仅当你按 advanced/README.md 启用时才需要此文件：
 * 把它放到项目根目录的 functions/api/sites.js
 *
 * GET  /api/sites  -> 读取网站数据（公开）
 * POST /api/sites  -> 保存网站数据（需 Bearer 令牌）
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json; charset=utf-8',
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: CORS });

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

  const kv = env.SITES_KV;
  if (!kv) return json({ ok: false, error: '未绑定 SITES_KV，请到 Pages 项目 设置 → 函数 → KV 命名空间 绑定。' }, 500);

  if (request.method === 'GET') {
    const raw = await kv.get('sites');
    if (!raw) return json({ ok: false, error: 'KV 中还没有数据，请先用 POST 或管理页面写入一次。' }, 404);
    return new Response(raw, { headers: CORS });
  }

  if (request.method === 'POST') {
    const token = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
    if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
      return json({ ok: false, error: '管理员令牌不正确。' }, 401);
    }
    let body;
    try { body = await request.json(); }
    catch (e) { return json({ ok: false, error: '请求体不是合法 JSON。' }, 400); }
    if (!body || !Array.isArray(body.sites) || !Array.isArray(body.categories)) {
      return json({ ok: false, error: '数据必须包含 sites 与 categories 数组。' }, 400);
    }
    await kv.put('sites', JSON.stringify(body));
    return json({ ok: true, message: '已保存到 KV。', sites: body.sites.length });
  }

  return json({ ok: false, error: '不支持的请求方法。' }, 405);
}
