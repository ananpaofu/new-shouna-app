# 过期啦 · 收纳保质期记录（单机本地版）

黑白极简的单机收纳 App。所有数据保存在浏览器 `localStorage`，不需要账号、不需要后端、不需要联网，也没有好友、聊天、社交、协作或分享功能。

## 界面

- 底部 5 个入口：首页、搜索、绿色加号、联动、我的
- 左侧抽屉「寻迹」：状态分类、温度标签、文件夹，可添加文件夹
- 绿色加号打开新增方式弹窗，选择「手动输入」进入表单
- 「我的」中可进入显示偏好、到期日历、分类管理、回收站和更新说明

## 功能

- 本地新增 / 编辑 / 删除 / 恢复物品
- 记录名称、图片、保质期、生产日期、提醒天数、数量、标签、文件夹、位置、备注
- 首页状态筛选：全部、最佳、临近过期、已过期、已开封、活动历史、库存总览、回收站
- 本地搜索，保留最近 10 条搜索历史
- 到期日历按月份标记有到期物品的日子
- 显示偏好可静态切换，设置保存在本机
- 联动页为静态展示，不连接网络或蓝牙

## 本地运行

直接用浏览器打开 `index.html` 即可。若需要 PWA / Service Worker 的完整行为，可用本地服务器：

```bash
# Python
python -m http.server 8000

# 或 Node.js
npx serve .
```

然后访问 `http://localhost:8000`。

## 上传 GitHub Pages

在项目目录执行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\Xieta\Desktop\Tracking-main\upload-app.ps1"
```

提示填写时：

1. `GitHub username (owner)`：填 `ananpaofu`，或直接回车（脚本已默认）
2. `Repository name`：填 `new-shouna-app`，或直接回车（脚本已默认）
3. `Branch`：直接回车（默认 `main`）
4. GitHub classic token：粘贴带 `repo` 权限的 classic token

上传后打开 `https://ananpaofu.github.io/new-shouna-app/`，等待 1–2 分钟，强制刷新 2–3 次以更新 Service Worker 缓存。

仓库 **Settings → Pages** 中 Source 选择 **Deploy from a branch**，分支 `main`，目录 `/ (root)`。

## 文件说明

| 文件 | 说明 |
|------|------|
| `index.html` | 入口页面，只加载纯前端逻辑 |
| `mobile.css` | 黑白极简样式、底部导航、侧栏、弹窗、表单 |
| `mobile.js` | 全部页面与本地存储逻辑 |
| `sw.js` | Service Worker 离线缓存 |
| `manifest.webmanifest` | PWA 清单 |
| `icon-192.png` / `icon-512.png` | PWA 图标 |
| `upload-app.ps1` | GitHub Pages 上传脚本 |

数据键：`organizer_local_v2`、`organizer_pref_v2`、`organizer_search_history_v2`。
