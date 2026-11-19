# 本地资源目录

本目录的图片随网站一起部署，不依赖外链。

- `avatar.png` —— 头像，由 `https://raw.web.yjhup.com/images/avatar/avatar-1.png` 下载而来，
  由 `data/sites.js` 的 `theme.avatarImage` 引用。
- `screenshots/` —— 各项目的网站截图（真实访问各站点截取），由每个项目的 `image` 字段引用，
  在卡片封面铺满显示。目前有 11 张；`zashboard` 站点返回 404 无法截图，故该卡片仍用 emoji 图标。
- `wallpaper/ocean-girl.png` —— 默认背景，取自 leleo-home-page 原项目的「海洋女孩」壁纸。
  页面 CSS 默认引用它，因此即使离线（无网络图片）也能显示完整背景。

## 更新某个项目的截图
用浏览器打开目标网站截图（可用无头 Chrome）：
    chrome --headless=new --disable-gpu --no-sandbox --window-size=1280,560 \
      --virtual-time-budget=10000 --screenshot=assets/screenshots/xxx.png "https://网站地址"
然后把 `data/sites.js` 中该项目的 `image` 指向 `assets/screenshots/xxx.png` 即可。

## 更换背景
把你的图片放进这个目录（例如 `bg.jpg`），然后编辑 `data/sites.js`：

    "theme": {
      "background": "assets/wallpaper/bg.jpg"
    }

留空 `background` 则使用默认的 ocean-girl.png。
可选 `backgroundMobile` 为手机端单独指定一张竖版壁纸。
