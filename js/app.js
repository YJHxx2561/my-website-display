/* ============================================================
   我的网站展示 — 前端逻辑（无框架、无构建、纯静态）
   数据来源：data/sites.js 中的 window.SITE_DATA
   ============================================================ */
(function () {
  'use strict';

  var boot = document.getElementById('boot');
  var app = document.getElementById('app');

  function fail() {
    boot.innerHTML = '<h2 style="margin:0 0 8px">数据未正确加载</h2>' +
      '<p style="max-width:460px;text-align:center;line-height:1.8">' +
      '请确认 <code>data/sites.js</code> 存在且语法正确（可用浏览器控制台查看报错）。<br>' +
      '如果直接双击打开本文件，请改用本地服务器或线上地址访问。</p>';
  }

  function start(data) {
    if (!data || !Array.isArray(data.sites) || !Array.isArray(data.categories)) { fail(); return; }

    var theme = data.theme || {};
    var meta = data.meta || {};
    var engines = (data.searchEngines && data.searchEngines.length)
      ? data.searchEngines
      : [{ name: '百度', url: 'https://www.baidu.com/s?wd={q}' }];

    function $(id) { return document.getElementById(id); }
    function el(tag, cls, text) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      if (text != null) n.textContent = text;
      return n;
    }
    function hostOf(url) {
      try { return new URL(url, location.href).hostname.replace(/^www\./, ''); }
      catch (e) { return ''; }
    }
    function escapeAttr(s) { return String(s).replace(/"/g, '&quot;'); }
    function escapeHtml(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    /* ---------------- 主题与元数据 ---------------- */
    function applyTheme() {
      var r = document.documentElement;
      if (theme.accent) r.style.setProperty('--accent', theme.accent);
      if (theme.accent2) r.style.setProperty('--accent2', theme.accent2);
      if (theme.blur != null) r.style.setProperty('--blur', theme.blur + 'px');

      if (meta.title) {
        document.title = meta.title;
        $('heroTitle').textContent = theme.heroTitle || meta.title;
      }
      if (meta.description) {
        var d = document.querySelector('meta[name="description"]');
        if (d) d.setAttribute('content', meta.description);
      }
      if (meta.keywords) {
        var k = document.querySelector('meta[name="keywords"]');
        if (k) k.setAttribute('content', meta.keywords);
      }
      if (meta.favicon) {
        var fav = document.querySelector('link[rel="icon"]');
        if (fav && /https?:|\/|\.(png|ico|jpe?g|svg|webp)/i.test(meta.favicon) && !/svg\+xml/.test(meta.favicon)) {
          fav.href = meta.favicon;
        }
      }

      // 头像
      var av = $('avatar');
      if (theme.avatarImage) {
        av.style.backgroundImage = 'url("' + escapeAttr(theme.avatarImage) + '")';
        av.style.backgroundSize = 'cover';
        av.style.backgroundPosition = 'center';
        av.textContent = '';
      } else {
        av.textContent = theme.avatarText || 'YJH';
      }

      // 背景
      var bgImg = $('bgImage');
      var url = theme.background || '';
      if (url && window.innerWidth <= 640 && theme.backgroundMobile) url = theme.backgroundMobile;
      if (url && bgImg) bgImg.style.backgroundImage = 'url("' + escapeAttr(url) + '")';
      if (bgImg && theme.brightness != null) bgImg.style.filter = 'brightness(' + (theme.brightness / 100) + ') saturate(1.05)';
      if (theme.overlay != null) {
        var ov = document.querySelector('.bg-overlay');
        if (ov) ov.style.background = 'rgba(6,10,26,' + theme.overlay + ')';
      }
    }

    /* ---------------- 打字机 ---------------- */
    function startTypewriter() {
      var lines = theme.typewriter || [];
      var target = $('typeTarget');
      if (!lines.length) { target.textContent = theme.heroSubtitle || ''; return; }
      var li = 0, ci = 0, deleting = false;
      function tick() {
        var line = lines[li];
        target.textContent = line.slice(0, ci);
        if (!deleting) {
          ci++;
          if (ci > line.length) { deleting = true; setTimeout(tick, 1800); return; }
        } else {
          ci--;
          if (ci === 0) { deleting = false; li = (li + 1) % lines.length; }
        }
        setTimeout(tick, deleting ? 45 : 95);
      }
      tick();
    }

    /* ---------------- 侧边栏 ---------------- */
    function renderSidebar() {
      $('heroSubtitle').textContent = theme.heroSubtitle || '';
      $('aboutText').textContent = meta.description || '';

      (theme.tags || []).forEach(function (t) {
        var chip = el('span', 'tag-chip', t);
        chip.title = '筛选包含「' + t + '」的项目';
        chip.addEventListener('click', function () {
          $('searchInput').value = t;
          renderCards();
          document.querySelector('.content').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        $('tagCloud').appendChild(chip);
      });

      (data.social || []).forEach(function (s) {
        var a = el('a', 'social-btn', s.icon);
        a.href = s.url || '#';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        $('socialRow').appendChild(a);
      });

      // 收起 / 恢复（★ 修复：收起后始终有可见的「标签 ›」按钮可恢复）
      $('collapseLeft').addEventListener('click', function () {
        $('leftPanel').classList.add('collapsed');
        $('restoreLeft').hidden = false;
      });
      $('restoreLeft').addEventListener('click', function () {
        $('leftPanel').classList.remove('collapsed');
        $('restoreLeft').hidden = true;
      });
    }

    /* ---------------- 时钟 ---------------- */
    function startClock() {
      var wd = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
      function tick() {
        var d = new Date();
        var p = function (n) { return String(n).padStart(2, '0'); };
        $('clock').textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
        $('clockDate').textContent = d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + '  ' + wd[d.getDay()];
      }
      tick();
      setInterval(tick, 1000);
    }

    /* ---------------- 页脚：备案号 + Powered By YJH ---------------- */
    function renderFooter() {
      var author = meta.author || 'YJH';
      var authorUrl = meta.authorUrl || 'https://yjhup.com';
      var icp = meta.icp || '';
      var icpUrl = meta.icpUrl || 'https://beian.miit.gov.cn';
      var copyright = meta.copyright || 'Copyright © 2026';
      var html = '';
      if (icp) {
        html += '<div><a href="' + escapeAttr(icpUrl) +
          '" target="_blank" rel="noopener noreferrer">' + escapeHtml(icp) + '</a></div>';
      }
      html += '<div>' + escapeHtml(copyright) + ' <a class="footer-name" href="' + escapeAttr(authorUrl) +
        '" target="_blank" rel="noopener noreferrer">' + escapeHtml(author) + '</a></div>';
      $('copyright').innerHTML = html;
    }

    /* ---------------- 搜索框：引擎下拉 + 双模式 ---------------- */
    var engineIndex = 0;

    function setEngine(i) {
      engineIndex = i;
      $('engineLabel').textContent = engines[i].name;
      Array.prototype.forEach.call($('engineMenu').children, function (b, j) {
        b.classList.toggle('active', j === i);
      });
      try { localStorage.setItem('yjh_engine', String(i)); } catch (err) {}
      updateHint();
    }

    function buildEngines() {
      var menu = $('engineMenu');
      menu.innerHTML = '';
      engines.forEach(function (e, i) {
        var b = el('button', 'engine-option', e.name);
        b.type = 'button';
        b.setAttribute('role', 'option');
        b.addEventListener('click', function (ev) {
          ev.stopPropagation();
          setEngine(i);
          closeEngineMenu();
        });
        menu.appendChild(b);
      });
      // 默认引擎为数据里的第一个（Google），用户若改过则用上次的选择
      var saved = -1;
      try { saved = parseInt(localStorage.getItem('yjh_engine'), 10); } catch (err) {}
      setEngine(saved >= 0 && saved < engines.length ? saved : 0);

      var trigger = $('engineTrigger');
      trigger.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var open = menu.hidden;
        menu.hidden = !open;
        trigger.setAttribute('aria-expanded', String(open));
      });
    }

    function closeEngineMenu() {
      $('engineMenu').hidden = true;
      $('engineTrigger').setAttribute('aria-expanded', 'false');
    }

    function currentEngine() {
      return engines[engineIndex] || engines[0];
    }

    function updateHint() {
      var eng = currentEngine();
      $('searchHint').innerHTML = '输入即筛选本站 · 回车用「<b>' + escapeHtml(eng.name) + '</b>」搜索全网';
    }

    function doWebSearch() {
      var q = $('searchInput').value.trim();
      if (!q) { $('searchInput').focus(); return; }
      var eng = currentEngine();
      var url = eng.url.replace('{q}', encodeURIComponent(q));
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    /* ---------------- 分类 ---------------- */
    var activeCat = 'all';

    function countOf(id) {
      return id === 'all' ? data.sites.length : data.sites.filter(function (s) { return s.category === id; }).length;
    }

    function renderCategories() {
      var box = $('categories');
      data.categories.forEach(function (c) {
        var b = el('button', 'cat-btn' + (c.id === activeCat ? ' active' : ''));
        b.type = 'button';
        b.appendChild(el('span', '', c.icon || ''));
        b.appendChild(el('span', '', c.name));
        b.appendChild(el('span', 'cat-count', String(countOf(c.id))));
        b.addEventListener('click', function () {
          activeCat = c.id;
          Array.prototype.forEach.call(box.children, function (x) { x.classList.remove('active'); });
          b.classList.add('active');
          renderCards();
        });
        box.appendChild(b);
      });
      $('statSites').textContent = String(data.sites.length);
      $('statCats').textContent = String(Math.max(0, data.categories.length - 1));
    }

    /* ---------------- 卡片 ---------------- */
    function matches(site, kw) {
      if (!kw) return true;
      var hay = [site.name, site.desc, site.category, (site.tags || []).join(' '), hostOf(site.url || '')].join(' ').toLowerCase();
      return hay.indexOf(kw.toLowerCase()) !== -1;
    }

    function buildCard(site, index) {
      var a = el('a', 'card');
      a.href = site.url || '#';
      a.target = '_blank';
      a.rel = 'noopener noreferrer nofollow';
      a.style.animationDelay = Math.min(index * 40, 380) + 'ms';
      a.setAttribute('aria-label', '在新标签页打开：' + (site.name || '网站'));

      var cover = el('div', 'card-cover');
      if (site.image) {
        // 有网站截图：整块封面铺满显示（object-fit:cover 取顶部，通常能看到网站头部）
        var img = document.createElement('img');
        img.src = site.image;
        img.alt = (site.name || '网站') + ' 截图';
        img.className = 'card-screenshot';
        img.loading = 'lazy';
        img.referrerPolicy = 'no-referrer';
        img.onerror = function () {
          // 图片加载失败时回退到 emoji 图标
          var fallback = el('div', 'card-icon', site.icon || '🌐');
          cover.innerHTML = '';
          cover.appendChild(fallback);
        };
        cover.appendChild(img);
      } else {
        // 没有截图：显示 emoji 图标（如 zashboard 站点暂时无法访问）
        var icon = el('div', 'card-icon', site.icon || '🌐');
        cover.appendChild(icon);
      }
      a.appendChild(cover);

      var body = el('div', 'card-body');
      var head = el('div', 'card-head');
      var titles = el('div');
      titles.style.cssText = 'min-width:0;flex:1';
      titles.appendChild(el('h3', 'card-title', site.name || '未命名网站'));
      var cat = (data.categories.find(function (c) { return c.id === site.category; }) || {});
      titles.appendChild(el('div', 'card-cat', (cat.icon ? cat.icon + ' ' : '') + (cat.name || site.category || '未分类')));
      head.appendChild(titles);
      if (site.badge) head.appendChild(el('span', 'badge', site.badge));
      body.appendChild(head);

      body.appendChild(el('p', 'card-desc', site.desc || '暂无说明。'));

      var tags = el('div', 'card-tags');
      (site.tags || []).forEach(function (t) { tags.appendChild(el('span', 'card-tag', '#' + t)); });
      body.appendChild(tags);

      var foot = el('div', 'card-foot');
      foot.appendChild(el('span', 'card-host', hostOf(site.url || '')));
      var visit = el('span', 'visit-btn');
      visit.appendChild(document.createTextNode('前往 '));
      visit.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>');
      foot.appendChild(visit);
      body.appendChild(foot);

      a.appendChild(body);
      return a;
    }

    function renderCards() {
      var kw = $('searchInput').value.trim();
      var list = data.sites.filter(function (s) {
        return (activeCat === 'all' || s.category === activeCat) && matches(s, kw);
      });
      var grid = $('grid');
      grid.innerHTML = '';
      list.forEach(function (s, i) { grid.appendChild(buildCard(s, i)); });

      $('empty').hidden = list.length !== 0;
      $('resultCount').textContent = '共 ' + list.length + ' 个项目' + (kw ? '（关键词：' + kw + '）' : '');
      $('resetBtn').hidden = !(kw || activeCat !== 'all');
    }

    function resetAll() {
      $('searchInput').value = '';
      activeCat = 'all';
      Array.prototype.forEach.call($('categories').children, function (x, i) {
        x.classList.toggle('active', i === 0);
      });
      renderCards();
    }

    /* ---------------- 管理入口与快捷键 ---------------- */
    function renderFab() {
      var link = $('manageLink');
      if (meta.adminUrl) link.href = meta.adminUrl;
      else link.style.display = 'none';

      $('fab').addEventListener('click', function (e) {
        e.stopPropagation();
        var m = $('fabMenu');
        m.hidden = !m.hidden;
      });
      document.addEventListener('click', function (e) {
        var m = $('fabMenu');
        if (!m.hidden && !m.contains(e.target) && e.target !== $('fab')) m.hidden = true;
      });
    }

    function bindKeys() {
      $('searchGo').addEventListener('click', doWebSearch);
      // 点击别处关闭引擎菜单
      document.addEventListener('click', function (e) {
        if (!$('engineMenu').hidden && !$('engineBox').contains(e.target)) closeEngineMenu();
      });
      $('searchInput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); doWebSearch(); }
      });
      $('searchInput').addEventListener('input', renderCards);

      document.addEventListener('keydown', function (e) {
        if (e.key === '/' && document.activeElement !== $('searchInput')) {
          e.preventDefault();
          $('searchInput').focus();
        }
        if (e.key === 'Escape') {
          $('searchInput').value = '';
          $('fabMenu').hidden = true;
          renderCards();
        }
      });
      $('resetBtn').addEventListener('click', resetAll);
      $('emptyReset').addEventListener('click', resetAll);
    }

    /* ---------------- 启动 ---------------- */
    applyTheme();
    renderSidebar();
    buildEngines();
    startTypewriter();
    startClock();
    renderFooter();
    renderCategories();
    renderFab();
    bindKeys();
    renderCards();

    boot.hidden = true;
    app.hidden = false;
  }

  /* ---------------- 数据入口 ----------------
     默认：直接读 data/sites.js（静态，零额度消耗）
     可选：在 sites.js 顶层设置 "mode": "api"，改为从 /api/sites 读取
  ------------------------------------------- */
  var initial = window.SITE_DATA;
  if (initial && initial.mode === 'api') {
    fetch('/api/sites', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { start(d); })
      .catch(function () { boot.innerHTML = '<p>KV 数据读取失败，请检查 /api/sites 与 KV 绑定。</p>'; });
  } else {
    start(initial);
  }
})();
