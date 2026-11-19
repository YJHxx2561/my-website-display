/**
 * ============================================================
 *  网站数据文件 —— 管理员只需要修改这个文件
 * ============================================================
 *  这个文件本质上就是一个 JavaScript 对象（JSON 风格）。
 *  修改方法、字段说明、增删网站示例请见项目根目录 README.md。
 *
 *  ⚠️ 修改时注意：
 *   1. 每个字段的值都要用英文双引号 " " 包起来（数字、true/false 除外）
 *   2. 每一项之间要用英文逗号 , 分隔，最后一项后面不要加逗号
 *   3. 改完保存后，GitHub 会自动触发 Cloudflare Pages 重新部署
 *
 *  💡 想在不改动代码的情况下用网页表单管理？见 advanced/README.md
 *
 *  ℹ️ 网站列表已按「重要 / 常用程度」从高到低排列，
 *     想调整顺序，直接把某一项 {...} 整段挪到想要的位置即可。
 * ============================================================
 */
window.SITE_DATA = {
  // ---------- 站点基本信息 ----------
  "meta": {
    "title": "YJH 的项目",
    "description": "我的一些网站与项目。",
    "keywords": "项目,作品,开发,工具,网站,yjhup,yjh",
    "favicon": "assets/avatar.png",           // 浏览器标签页图标，可用 emoji 或图片地址
    "author": "YJH",           // 页脚 Powered By 后面的名字
    "authorUrl": "https://yjhup.com",  // ★ 点击页脚 YJH 跳转的地址
    "icp": "萌ICP备20266614号",  // 备案号，留空则不显示
    "icpUrl": "https://icp.gov.moe/?keyword=20266614",  // ★ 点击备案号跳转的地址
    "copyright": "Copyright © 2026 | Powered By",
    // 管理员点右下角齿轮 →「管理网站」时打开的链接。
    "adminUrl": "https://github.com/YJHxx2561/my-website-display/edit/main/data/sites.js"
  },

  // ---------- 主题与外观 ----------
  "theme": {
    "avatarText": "YJH",               // 头像圆圈里显示的文字（avatarImage 有值时优先显示图片）
    "avatarImage": "assets/avatar.png",   // ★ 头像图片（已下载到本地，随网站一起部署，不依赖外链）
    "heroTitle": "Hi, I'm YJH",        // 大标题
    "heroSubtitle": "这里是我的一些项目",
    "typewriter": [                    // 顶部引号里循环打字的句子
      "从想法到上线，每个站点背后都有一段折腾。",
      "不用翻书签，想找的都摆在这儿了。",
      "点开看看，每个背后都有一段折腾的故事。"
    ],
    "tags": ["前端", "后端", "工具", "面板", "开源", "实用", "效率", "折腾"],
    "accent": "#8be9c8",               // 主强调色
    "accent2": "#7cc7ff",              // 次强调色
    // 背景：留空则使用内置壁纸 assets/wallpaper/ocean-girl.png（取自原项目）。
    "background": "",
    "backgroundMobile": "",
    "brightness": 100,
    "blur": 14,
    "overlay": 0.18
  },

  // ---------- 搜索引擎（搜索框前面的下拉栏）----------
  // name = 下拉显示名；url = 搜索地址，用 {q} 代表关键词
  // 想增删引擎直接改这个数组即可；第一个会作为默认引擎。
  "searchEngines": [
    { "name": "Google", "url": "https://www.google.com/search?q={q}" },
    { "name": "百度",   "url": "https://www.baidu.com/s?wd={q}" },
    { "name": "Bing",  "url": "https://www.bing.com/search?q={q}" },
    { "name": "搜狗",   "url": "https://www.sogou.com/web?query={q}" },
    { "name": "360",   "url": "https://www.so.com/s?q={q}" }
  ],

  // ---------- 社交按钮（可留空数组）----------
  "social": [
    { "icon": "主页", "url": "https://yjhup.com" },
    { "icon": "博客", "url": "https://blog.yjhup.com" }
  ],

  // ---------- 分类 ----------
  // "id" 要和下面每个网站的 "category" 对应；"all" 表示全部，不要删除。
  "categories": [
    { "id": "all",     "name": "全部",   "icon": "✦" },
    { "id": "main",    "name": "我的主页", "icon": "🏠" },
    { "id": "tool",    "name": "实用工具", "icon": "🧰" },
    { "id": "blog",    "name": "博客资讯", "icon": "📝" },
    { "id": "service", "name": "在线服务", "icon": "🌐" },
    { "id": "other",   "name": "其他",   "icon": "📌" }
  ],

  // ---------- 我搭建的项目列表（按重要 / 常用程度从高到低排列）----------
  // 增加一个项目 = 复制一整段 {...} 粘贴进来，改掉里面的内容
  // 删除一个项目 = 把它的那一整段 {...}（连同后面的逗号）删掉
  "sites": [
    {
      "id": "yjhup-home",
      "name": "个人主页",
      "desc": "个人主站，关于我和这些项目的入口。",
      "url": "https://yjhup.com",
      "icon": "🏠",
      "image": "assets/screenshots/home.png",
      "category": "main",
      "tags": ["主页", "关于我"],
      "badge": "主站"
    },
    {
      "id": "yjhup-blog",
      "name": "我的博客",
      "desc": "博客，记录技术、折腾和生活的地方。",
      "url": "https://blog.yjhup.com",
      "icon": "📝",
      "image": "assets/screenshots/blog.png",
      "category": "blog",
      "tags": ["博客", "技术"],
      "badge": ""
    },
    {
      "id": "monitor",
      "name": "服务监控",
      "desc": "监控面板，实时盯着服务器和各个服务的状态。",
      "url": "https://monitor.web.yjhup.com/#/",
      "icon": "📈",
      "image": "assets/screenshots/monitor.png",
      "category": "service",
      "tags": ["监控", "状态"],
      "badge": ""
    },
    {
      "id": "devtools",
      "name": "开发工具箱",
      "desc": "在线工具箱，格式化、编码转换这些常用的都在这里。",
      "url": "https://devtools.web.yjhup.com/",
      "icon": "🛠️",
      "image": "assets/screenshots/devtools.png",
      "category": "tool",
      "tags": ["开发", "工具"],
      "badge": ""
    },
    {
      "id": "oneip",
      "name": "One IP",
      "desc": "小工具，一页看清公网 IP 和网络信息。",
      "url": "https://oneip.web.yjhup.com/",
      "icon": "🌍",
      "image": "assets/screenshots/oneip.png",
      "category": "tool",
      "tags": ["IP", "查询"],
      "badge": ""
    },
    {
      "id": "htmltools",
      "name": "HTML 工具箱",
      "desc": "HTML 小工具集，写前端时顺手就用。",
      "url": "https://htmltools.web.yjhup.com/",
      "icon": "🧩",
      "image": "assets/screenshots/htmltools.png",
      "category": "tool",
      "tags": ["HTML", "前端"],
      "badge": ""
    },
    {
      "id": "myittools",
      "name": "IT 工具箱",
      "desc": "一套 IT 工具，平时运维排障用得上。",
      "url": "http://myittools.web.yjhup.com/",
      "icon": "💻",
      "image": "assets/screenshots/myittools.png",
      "category": "tool",
      "tags": ["IT", "工具"],
      "badge": ""
    },
    {
      "id": "doh-test",
      "name": "DoH 测试",
      "desc": "测速页，测测各家 DNS over HTTPS 的可用性和速度。",
      "url": "https://doh-test.web.yjhup.com/",
      "icon": "🔎",
      "image": "assets/screenshots/doh-test.png",
      "category": "tool",
      "tags": ["DNS", "测试"],
      "badge": ""
    },
    {
      "id": "zashboard",
      "name": "Zashboard",
      "desc": "代理控制面板，节点状态和流量一眼看清。",
      "url": "https://zashboard.web.yjhup.com/",
      "icon": "📊",
      "image": "assets/screenshots/zashboard.png",
      "category": "tool",
      "tags": ["面板", "代理"],
      "badge": ""
    },
    {
      "id": "sub",
      "name": "订阅服务",
      "desc": "订阅服务，转换和管理多平台订阅。",
      "url": "https://sub.yjhup.com/",
      "icon": "🔗",
      "image": "assets/screenshots/sub.png",
      "category": "service",
      "tags": ["订阅"],
      "badge": ""
    },
    {
      "id": "sunpanel",
      "name": "Sun Panel",
      "desc": "在线面板，把数据和维护状态集中展示。",
      "url": "https://sunpanel.web.yjhup.com/",
      "icon": "☀️",
      "image": "assets/screenshots/sunpanel.png",
      "category": "service",
      "tags": ["面板"],
      "badge": ""
    },
    {
      "id": "news",
      "name": "每日资讯",
      "desc": "资讯聚合站，重要新闻一页扫完。",
      "url": "https://news.web.yjhup.com/",
      "icon": "📰",
      "image": "assets/screenshots/news.png",
      "category": "blog",
      "tags": ["新闻", "资讯"],
      "badge": ""
    }
  ]
};
