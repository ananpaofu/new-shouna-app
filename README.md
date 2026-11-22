# 寻迹 · 收纳保质期记录（单机本地版）

黑白极简的单机收纳 App。所有数据保存在浏览器 `localStorage`，不需要账号、不需要后端、不需要联网，也没有好友、聊天、社交、协作或分享功能。

## 界面

- 底部 5 个入口：首页、搜索、绿色加号、联动、我的
- 页面不绘制假状态栏，时间、电量等使用手机系统状态栏
- 左侧抽屉「寻迹」：状态分类、物品分类入口、单个通知铃图标
- 首页顶部只显示当前分类「全部」和窄搜索框；左侧可打开排序规则，右侧可进入多选删除
- 底部绿色加号直接进入新增物品表单，无二维码与新增方式弹窗
- 联动页包含高德地图打开按钮、设备卡片、联动能力说明和可切换的小动物设备图标
- 「我的」页可修改昵称、联系方式、签名、通知时间，并进入成就 / 装扮、修改密码、新手教程
- 字体大小、字体粗细、界面颜色、语言（跟随系统 / 简中 / 繁中 / 英文）均可调，切换后全站文字同步
- 隐藏注册页保留，访问 `https://ananpaofu.github.io/new-shouna-app/#register` 可打开

## 功能

- 本地新增 / 编辑 / 删除 / 恢复物品
- 记录名称、多张图片、生产日期 / 保质期、分类、数量与单位、存放位置、备注
- 首页状态筛选：全部、最佳、临近过期、已过期、库存总览、回收站
- 本地搜索，保留最近 10 条搜索历史；聚焦后显示语音搜索入口（仅静态展示）
- 首页排序：名称 A-Z、剩余库存、最近生产、最近过期、最近临期、最近添加、最近更新
- 首页多选：全选、按项选择、批量删除
- 新增物品支持一次拍摄 / 选择多张图片，不限制图片尺寸
- 显示偏好可静态切换，设置保存在本机

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
