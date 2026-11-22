/* =========================================================
   过期啦 · 收纳保质期记录（单机本地版）
   纯前端：localStorage 存储，无任何后端 / 社交 / 云端功能
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- 常量 ---------------- */
  var APP_VERSION = '2.1';
  var DB_KEY = 'organizer_local_v2';
  var PREF_KEY = 'organizer_pref_v2';
  var HISTORY_KEY = 'organizer_search_history_v2';

  var APP_VERSION_CHANGELOG = [
    { version: '2.1', date: '2026-11-22', title: '界面按截图重做', items: [
      '删除联动页，搜索页与首页按截图重做',
      '首页新增排序规则弹层与多选删除',
      '整体字号、红色强调按钮统一'
    ] },
    { version: '2.0', date: '2026-11-22', title: '重制版 · 极简收纳', items: [
      '彻底移除好友 / 聊天 / 云端，纯单机本地记录',
      '全新分类侧栏「寻迹」与显示偏好设置'
    ] }
  ];

  // 侧边栏分类
  var MAIN_CATEGORIES = [
    { key: 'all', label: '全部', emoji: '📦' },
    { key: 'best', label: '最佳', emoji: '🌿' },
    { key: 'soon', label: '临近过期', emoji: '🕐' },
    { key: 'expired', label: '已过期', emoji: '⚠️' },
    { key: 'opened', label: '已开封', emoji: '🥫' },
    { key: 'history', label: '活动历史', emoji: '📊' },
    { key: 'stock', label: '库存总览', emoji: '🗂️' },
    { key: 'trash', label: '回收站', emoji: '🗑️' }
  ];
  var TEMP_TAGS = [
    { key: '常温', label: '常温', emoji: '🌡️' },
    { key: '冷藏', label: '冷藏', emoji: '❄️' },
    { key: '冷冻', label: '冷冻', emoji: '🧊' }
  ];
  var DEFAULT_FOLDERS = [
    { key: '通用', label: '通用', emoji: '📁' },
    { key: '食品', label: '食品', emoji: '🥫' },
    { key: '化妆品', label: '化妆品', emoji: '🧴' }
  ];
  var NEW_OPTIONS = [
    { key: 'batch', label: '查批号', emoji: '🔢' },
    { key: 'manual', label: '手动输入', emoji: '✏️' },
    { key: 'scan', label: '扫一扫', emoji: '📷' },
    { key: 'link', label: '商品链接', emoji: '🔗' },
    { key: 'medicine', label: '查药品', emoji: '💊' },
    { key: 'ai', label: '拍照识物', emoji: '🤖' }
  ];
  var ANIMAL_ICONS = ['🐱', '🐶', '🐰', '🐻', '🐼', '🦊', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🦆', '🐝', '🦋'];
  var DEFAULT_ITEMS = [
    { id: 'demo-1', name: '纯牛奶 250ml', emoji: '🐄', folder: '食品', temp: '冷藏', expiry: '2026-11-25', production: '2026-11-18', reminder: 2, quantity: 6, opened: false, note: '', createdAt: Date.now() - 86400000 },
    { id: 'demo-2', name: '抹茶面膜', emoji: '🐱', folder: '化妆品', temp: '常温', expiry: '2026-12-20', production: '2026-10-01', reminder: 7, quantity: 3, opened: false, note: '', createdAt: Date.now() - 172800000 }
  ];

  var DEFAULT_PREF = {
    layout: 'simple',        // simple / detail / gallery
    recordMode: 'single',    // single / merged
    priority: 'remain',      // remain / stock
    remainStyle: 'days',     // days / percent
    dateFormat: 'ymd',       // ymd / dmy
    statRule: 'quantity',    // quantity / kind
    includeChildren: true,
    showArchived: false,
    includeProduceDay: true,
    avatar: '🐱'
  };

  /* ---------------- 状态 ---------------- */
  var state = {
    view: 'home',            // home / search / me / form / prefs / calendar / categoryManage / itemDetail
    category: 'all',
    searchQuery: '',
    searchHistory: [],
    searchFocused: false,
    sidebarOpen: false,
    sheet: null,
    overlay: null,
    editingId: null,
    currentId: null,
    formDraft: null,
    sortRule: 'name',
    compact: false,
    multiSelect: false,
    selectedIds: [],
    pref: null,
    folders: [],
    calendarMonth: null
  };

  /* ---------------- 工具 ---------------- */
  function $(sel) { return document.querySelector(sel); }
  function escapeHTML(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function formatDate(str, fmt) {
    if (!str) return '—';
    var p = String(str).split('-'); if (p.length < 3) return str;
    if ((fmt || state.pref.dateFormat) === 'dmy') return p[2] + '/' + p[1] + '/' + p[0].slice(2);
    return p[0] + '-' + p[1] + '-' + p[2];
  }
  function formatDotDate(str) {
    if (!str) return '—';
    var p = String(str).split('-');
    return p.length >= 3 ? p[0] + '.' + p[1] + '.' + p[2] : str;
  }
  function timeAgo(ts) {
    if (!ts) return '';
    var diff = Math.max(0, Math.floor((Date.now() - Number(ts)) / 60000));
    if (diff < 1) return '刚刚';
    if (diff < 60) return diff + ' 分钟前';
    var h = Math.floor(diff / 60);
    if (h < 24) return h + ' 小时前';
    var d = Math.floor(h / 24);
    if (d < 30) return d + ' 天前';
    return Math.floor(d / 30) + ' 个月前';
  }
  function uid() { return 'i' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function daysUntil(dateStr, includeProduceDay) {
    if (!dateStr) return null;
    var target = new Date(dateStr + 'T00:00:00');
    var now = new Date(); now.setHours(0, 0, 0, 0);
    var diff = Math.round((target - now) / 86400000);
    if (includeProduceDay && state.pref && state.pref.includeProduceDay) diff += 0;
    return diff;
  }
  function randomAnimal() { return ANIMAL_ICONS[Math.floor(Math.random() * ANIMAL_ICONS.length)]; }
  function toast(msg) {
    var root = $('#toast-root'); if (!root) return;
    var el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
    root.appendChild(el);
    setTimeout(function () { el.remove(); }, 1800);
  }
  function vibrate() { try { navigator.vibrate && navigator.vibrate(12); } catch (e) {} }

  /* ---------------- 数据层（本地存储） ---------------- */
  function loadDB() {
    try {
      var raw = localStorage.getItem(DB_KEY);
      if (raw) {
        var db = JSON.parse(raw);
        if (db && Array.isArray(db.items)) return db;
      }
    } catch (e) {}
    return { items: JSON.parse(JSON.stringify(DEFAULT_ITEMS)), history: [], folders: DEFAULT_FOLDERS.map(function (f) { return f.key; }) };
  }
  function saveDB(db) { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch (e) {} }
  function loadPref() {
    try {
      var raw = localStorage.getItem(PREF_KEY);
      if (raw) { var p = JSON.parse(raw); return Object.assign({}, DEFAULT_PREF, p); }
    } catch (e) {}
    return Object.assign({}, DEFAULT_PREF);
  }
  function savePref() { try { localStorage.setItem(PREF_KEY, JSON.stringify(state.pref)); } catch (e) {} }
  function loadSearchHistory() {
    try {
      var raw = localStorage.getItem(HISTORY_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.slice(0, 10) : [];
    } catch (e) { return []; }
  }
  function saveSearchHistory() { try { localStorage.setItem(HISTORY_KEY, JSON.stringify(state.searchHistory)); } catch (e) {} }
  function pushSearchHistory(q) {
    var word = String(q || '').trim(); if (!word) return;
    state.searchHistory = [word].concat(state.searchHistory.filter(function (h) { return h !== word; })).slice(0, 10);
    saveSearchHistory();
  }
  function getItems() { return loadDB().items || []; }
  function findItem(id) { var list = getItems(); for (var i = 0; i < list.length; i++) { if (list[i].id === id) return list[i]; } return null; }
  function upsertItem(item) {
    item.updatedAt = Date.now();
    if (!item.createdAt) item.createdAt = item.updatedAt;
    var db = loadDB();
    var idx = -1;
    for (var i = 0; i < db.items.length; i++) { if (db.items[i].id === item.id) { idx = i; break; } }
    if (idx >= 0) db.items[idx] = item; else db.items.unshift(item);
    db.history = db.history || [];
    db.history.unshift({ time: Date.now(), itemId: item.id, name: item.name, action: idx >= 0 ? 'edit' : 'add' });
    saveDB(db);
  }
  function removeItem(id, toTrash) {
    var db = loadDB();
    var idx = -1;
    for (var i = 0; i < db.items.length; i++) { if (db.items[i].id === id) { idx = i; break; } }
    if (idx < 0) return;
    if (toTrash) { db.items[idx].trashed = true; }
    else { db.items.splice(idx, 1); }
    saveDB(db);
  }
  function restoreItem(id) {
    var db = loadDB();
    for (var i = 0; i < db.items.length; i++) { if (db.items[i].id === id) { db.items[i].trashed = false; break; } }
    saveDB(db);
  }

  /* ---------------- 分类筛选 ---------------- */
  function filterItems() {
    var list = getItems().filter(function (it) { return !it.trashed; });
    var cat = state.category;
    if (cat === 'trash') {
      return getItems().filter(function (it) { return !!it.trashed; });
    }
    if (cat === 'best') {
      return list.filter(function (it) { var d = daysUntil(it.expiry); return d != null && d > 7; });
    }
    if (cat === 'soon') {
      return list.filter(function (it) { var d = daysUntil(it.expiry); return d != null && d >= 0 && d <= 7; });
    }
    if (cat === 'expired') {
      return list.filter(function (it) { var d = daysUntil(it.expiry); return d != null && d < 0; });
    }
    if (cat === 'opened') { return list.filter(function (it) { return !!it.opened; }); }
    if (cat === 'history') { return list.slice().sort(function (a, b) { return (b.createdAt || 0) - (a.createdAt || 0); }); }
    if (cat === 'stock') { return list; }
    // 标签：常温/冷藏/冷冻
    if (cat === '常温' || cat === '冷藏' || cat === '冷冻') {
      return list.filter(function (it) { return it.temp === cat; });
    }
    // 文件夹分类
    if (state.folders.indexOf(cat) >= 0) {
      return list.filter(function (it) { return it.folder === cat; });
    }
    return list;
  }
  function categoryLabel() {
    var all = MAIN_CATEGORIES.concat(TEMP_TAGS).concat(state.folders.map(function (f) { return { key: f, label: f }; }));
    for (var i = 0; i < all.length; i++) { if (all[i].key === state.category) return all[i].label; }
    return '全部';
  }

  /* ---------------- 顶部栏 ---------------- */
  function renderHeader() {
    var status = '<div class="status-bar"><span>9:42</span><span>▮▮▮ ▮▮▮ 100%</span></div>';
    var header = $('#app-header');
    if (state.view === 'search') { header.innerHTML = status; return; }

    if (state.view === 'home' && state.multiSelect) {
      var n = state.selectedIds.length;
      header.innerHTML = status +
        '<div class="ms-bar">' +
          '<button data-action="select-all">全选</button>' +
          '<div>已选择 ' + n + ' 项</div>' +
          (n ? '<button class="danger" data-action="delete-selected">删除</button>' : '<button class="danger" data-action="exit-multiselect">完成</button>') +
        '</div>' +
        '<div class="ms-sub"><span>已选择 ' + n + ' 项</span><button data-action="exit-multiselect">退出多选</button></div>';
      return;
    }

    if (state.view === 'home') {
      header.innerHTML = status +
        '<div class="header-row home-header">' +
          '<button class="icon-btn" data-action="open-sidebar" aria-label="菜单"><span class="menu-lines"><i></i><i></i><i></i></span></button>' +
          '<div class="home-title">' + escapeHTML(categoryLabel()) + '</div>' +
          '<div class="header-actions">' +
            '<button class="icon-btn" data-action="scan-hint" aria-label="扫描"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M7 12h10"/></svg></button>' +
            '<button class="icon-btn" data-action="enter-multiselect" aria-label="多选"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg></button>' +
          '</div>' +
        '</div>';
      return;
    }

    var titles = { me: '我的', prefs: '显示偏好', calendar: '到期日历', categoryManage: '分类管理', form: state.editingId ? '编辑物品' : '新增物品', itemDetail: '物品详情' };
    var title = titles[state.view] || '过期啦';
    var showMenu = state.view === 'me';
    var showBack = ['prefs', 'calendar', 'categoryManage', 'form', 'itemDetail'].indexOf(state.view) >= 0;
    header.innerHTML = status +
      '<div class="header-row">' +
        (showBack ? '<button class="icon-btn" data-action="go-back" aria-label="返回">‹</button>' : '') +
        (showMenu ? '<button class="icon-btn" data-action="open-sidebar" aria-label="菜单"><span class="menu-lines"><i></i><i></i><i></i></span></button>' : '') +
        '<div class="header-title">' + escapeHTML(title) + '</div>' +
      '</div>';
  }

  /* ---------------- 底部导航 ---------------- */
  function navSVG(key) {
    var m = {
      home: '<rect x="4" y="6" width="16" height="14" rx="2.5"/><path d="M4 10h16M8 6V4.5h8V6"/>',
      search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
      me: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (m[key] || '') + '</svg>';
  }
  function renderNav() {
    var tabs = ['home', 'search', 'add', 'calendar', 'me'];
    $('#bottom-nav').innerHTML = tabs.map(function (key) {
      if (key === 'add') {
        return '<button class="nav-item nav-add" data-action="open-add-sheet" aria-label="新增"><span class="add-circle"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></button>';
      }
      if (key === 'calendar') {
        return '<button class="nav-item' + (state.view === 'calendar' ? ' active' : '') + '" data-action="nav" data-view="calendar" aria-label="日历"><span class="nav-cal">' + new Date().getDate() + '</span></button>';
      }
      if (key === 'home' && state.multiSelect) {
        return '<button class="nav-item nav-select-all" data-action="select-all" aria-label="全选"><span class="select-all-icon">✓</span></button>';
      }
      var active = state.view === key ? ' active' : '';
      return '<button class="nav-item' + active + '" data-action="nav" data-view="' + key + '" aria-label="' + key + '">' + navSVG(key) + '</button>';
    }).join('');
  }

  /* ---------------- 首页 ---------------- */
  var SORT_LABELS = {
    name: '名称 A-Z', stock: '剩余库存', production: '最近生产', expiry: '最近过期',
    soon: '最近临期', created: '最近添加', updated: '最近更新'
  };
  function sortItems(list) {
    var key = state.sortRule;
    return list.slice().sort(function (a, b) {
      if (key === 'stock') return (Number(b.quantity) || 1) - (Number(a.quantity) || 1);
      if (key === 'production') return String(b.production || '').localeCompare(String(a.production || ''));
      if (key === 'expiry') return String(a.expiry || '9999').localeCompare(String(b.expiry || '9999'));
      if (key === 'soon') {
        var da = daysUntil(a.expiry), db = daysUntil(b.expiry);
        return (da == null ? 9999 : da) - (db == null ? 9999 : db);
      }
      if (key === 'created') return (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0);
      if (key === 'updated') return (Number(b.updatedAt) || Number(b.createdAt) || 0) - (Number(a.updatedAt) || Number(a.createdAt) || 0);
      return String(a.name || '').localeCompare(String(b.name || ''), 'zh-CN');
    });
  }
  function itemCardHTML(it) {
    var selected = state.multiSelect && state.selectedIds.indexOf(it.id) >= 0;
    var circle = '<span class="pick-circle' + (selected ? ' on' : '') + '" data-action="toggle-select" data-id="' + it.id + '"></span>';
    var thumb = it.image
      ? '<div class="item-thumb"><img src="' + escapeHTML(it.image) + '" alt=""></div>'
      : '<div class="item-thumb">' + escapeHTML(it.emoji || '🐱') + '</div>';
    var tags = '<span class="tag-yellow">' + escapeHTML(it.folder || '通用') + '</span>' +
      '<span class="tag-gray">剩余 ' + (it.quantity || 1) + ' 件</span>';
    var time = timeAgo(it.updatedAt || it.createdAt);
    return '<div class="item-card' + (selected ? ' selected' : '') + (state.compact ? ' compact' : '') + '" data-action="' + (state.multiSelect ? 'toggle-select' : 'open-item') + '" data-id="' + it.id + '">' +
      circle + thumb +
      '<div class="item-main"><div class="item-name">' + escapeHTML(it.name) + '</div>' +
        '<div class="item-tags">' + tags + '</div>' +
        '<div class="item-expiry">过期日期 ' + escapeHTML(formatDotDate(it.expiry)) + '</div>' +
      '</div>' +
      (time ? '<div class="item-time">' + escapeHTML(time) + '</div>' : '') +
    '</div>';
  }
  function homeHTML() {
    var list = filterItems();
    var body;
    if (state.category === 'stock') {
      var groups = {};
      list.forEach(function (it) { var k = it.folder || '未分类'; groups[k] = (groups[k] || 0) + (Number(it.quantity) || 1); });
      body = Object.keys(groups).map(function (k) {
        return '<div class="link-row"><span class="bold">' + escapeHTML(k) + '</span><span class="muted small">' + groups[k] + ' 件</span></div>';
      }).join('') || '<div class="empty"><div class="empty-emoji">📦</div><div class="empty-text">暂无库存</div></div>';
      body = '<div class="link-card" style="margin-top:4px">' + body + '</div>';
    } else if (state.category === 'history') {
      var hist = loadDB().history || [];
      body = hist.length ? '<div class="link-card" style="margin-top:4px">' + hist.slice(0, 30).map(function (h) {
        return '<div class="link-row"><span>' + escapeHTML(h.name || '物品') + '</span><span class="muted small">' + (h.action === 'edit' ? '编辑' : '添加') + ' · ' + timeAgo(h.time) + '</span></div>';
      }).join('') + '</div>' : '<div class="empty"><div class="empty-emoji">📊</div><div class="empty-text">暂无活动记录</div></div>';
    } else {
      var sorted = sortItems(list);
      body = sorted.length
        ? '<div class="item-list">' + sorted.map(itemCardHTML).join('') + '</div>'
        : '<div class="empty"><div class="empty-emoji">🗂️</div><div class="empty-text">这里还没有物品</div></div>';
    }
    if (state.multiSelect) return '<div class="page home-page multi-page">' + body + '</div>';
    return '<div class="page home-page">' +
      '<button class="home-search" data-action="go-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg><span>搜索</span></button>' +
      '<div class="sort-row">' +
        '<button class="sort-trigger" data-action="open-sort-sheet">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h13M4 12h9M4 17h5"/><path d="m17 14 3 3 3-3"/></svg>' +
          '<span>' + SORT_LABELS[state.sortRule] + '</span>' +
        '</button>' +
        '<div class="sort-actions">' +
          '<button class="icon-btn" data-action="toggle-view" aria-label="视图"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M9 5v14"/></svg></button>' +
          '<button class="icon-btn" data-action="open-sort-sheet" aria-label="排序"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h16M7 12h10M10 17h4"/></svg></button>' +
          '<button class="icon-btn" data-action="enter-multiselect" aria-label="多选"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="m8 12 3 3 5-6"/></svg></button>' +
        '</div>' +
      '</div>' + body + '</div>';
  }

  /* ---------------- 侧边栏 ---------------- */
  function sidebarHTML() {
    var items = getItems();
    function count(fn) { return items.filter(function (it) { return !it.trashed && fn(it); }).length; }
    var counts = {
      all: items.filter(function (it) { return !it.trashed; }).length,
      best: count(function (it) { var d = daysUntil(it.expiry); return d != null && d > 7; }),
      soon: count(function (it) { var d = daysUntil(it.expiry); return d != null && d >= 0 && d <= 7; }),
      expired: count(function (it) { var d = daysUntil(it.expiry); return d != null && d < 0; }),
      opened: count(function (it) { return !!it.opened; }),
      trash: items.filter(function (it) { return !!it.trashed; }).length
    };
    function sideItem(c) {
      var cnt = counts[c.key];
      return '<div class="side-item' + (state.category === c.key ? ' active' : '') + '" data-action="set-category" data-cat="' + escapeHTML(c.key) + '">' +
        '<span class="side-emoji">' + c.emoji + '</span><span>' + escapeHTML(c.label) + '</span>' +
        (cnt != null ? '<span class="side-count">' + cnt + '</span>' : '') + '</div>';
    }
    var mainHTML = MAIN_CATEGORIES.map(sideItem).join('');
    var tempHTML = TEMP_TAGS.map(sideItem).join('');
    var folderHTML = state.folders.map(function (f) {
      var emoji = f === '食品' ? '🥫' : (f === '化妆品' ? '🧴' : '📁');
      return '<div class="side-item' + (state.category === f ? ' active' : '') + '" data-action="set-category" data-cat="' + escapeHTML(f) + '">' +
        '<span class="side-emoji">' + emoji + '</span><span>' + escapeHTML(f) + '</span></div>';
    }).join('');
    return '<div class="side-mask' + (state.sidebarOpen ? ' show' : '') + '" data-action="close-sidebar"></div>' +
      '<aside class="sidebar' + (state.sidebarOpen ? ' show' : '') + '">' +
        '<div class="sidebar-head">' +
          '<div class="sidebar-title-row"><div><div class="sidebar-title">寻迹</div><span class="sidebar-badge">基础</span></div></div>' +
          '<div class="sidebar-icons">' +
            '<span data-action="go-prefs" title="设置"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3.1 14a2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 3.1a2 2 0 1 1 4 0 1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.9 10a2 2 0 1 1 0 4 1.7 1.7 0 0 0-1.5 1z"/></svg></span>' +
            '<span data-action="open-calendar" title="日历"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg></span>' +
          '</div>' +
        '</div>' +
        '<div class="sidebar-body">' +
          '<div class="side-group">' + mainHTML + '</div>' +
          '<div class="side-group"><div class="side-group-label">标签</div>' + tempHTML + '</div>' +
          '<div class="side-group"><div class="side-group-label">文件夹</div>' + folderHTML + '</div>' +
        '</div>' +
        '<div class="sidebar-foot">' +
          '<button class="add-folder" data-action="manage-categories">＋ 添加</button>' +
          '<button class="icon-btn" data-action="go-me"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg></button>' +
        '</div>' +
      '</aside>';
  }

  /* ---------------- 新增方式弹窗 ---------------- */
  function addSheetHTML() {
    var opts = NEW_OPTIONS.map(function (o) {
      return '<button class="option-cell" data-action="pick-new" data-key="' + o.key + '"><span class="opt-icon">' + o.emoji + '</span><span>' + o.label + '</span></button>';
    }).join('');
    return '<div class="sheet-mask show" data-action="close-sheet"></div>' +
      '<div class="sheet show"><div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>新增记录</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="option-grid">' + opts + '</div>' +
        '<button class="sheet-cancel" data-action="close-sheet">取消</button>' +
      '</div>';
  }

  /* ---------------- 表单页 ---------------- */
  function formHTML() {
    var d = state.formDraft || {};
    var photo = d.image
      ? '<div class="photo-upload"><img src="' + escapeHTML(d.image) + '" alt=""></div>'
      : '<div class="photo-upload" data-action="pick-image"><span style="font-size:22px">＋</span><span>上传图片</span></div>';
    return '<div class="page form-page">' +
      '<div class="form-group">' +
        '<div class="form-row"><div class="form-label">物品名称</div><input class="form-input" id="f-name" placeholder="请输入名称" value="' + escapeHTML(d.name || '') + '"></div>' +
        '<div class="form-row"><div class="form-label">图片</div><div style="flex:1">' + photo + '</div></div>' +
        '<div class="form-row"><div class="form-label">保质期至</div><span class="form-value' + (d.expiry ? '' : ' placeholder') + '" data-action="pick-date" data-field="expiry">' + (d.expiry ? escapeHTML(formatDate(d.expiry)) : '请选择日期') + '</span><span class="form-arrow">›</span></div>' +
        '<div class="form-row"><div class="form-label">生产日期</div><span class="form-value' + (d.production ? '' : ' placeholder') + '" data-action="pick-date" data-field="production">' + (d.production ? escapeHTML(formatDate(d.production)) : '请选择日期') + '</span><span class="form-arrow">›</span></div>' +
        '<div class="form-row"><div class="form-label">过期提醒</div><span class="form-value" data-action="pick-reminder">' + (d.reminder != null ? d.reminder + ' 天前' : '7 天前') + '<span class="form-arrow">›</span></span></div>' +
        '<div class="form-row"><div class="form-label">库存数量</div><input class="form-input" id="f-qty" type="number" min="1" value="' + (d.quantity || 1) + '"></div>' +
      '</div>' +
      '<div class="more-block">' +
        '<div class="form-row"><div class="form-label">标签</div><span class="form-value" data-action="pick-temp">' + (d.temp || '常温') + '<span class="form-arrow">›</span></span></div>' +
        '<div class="form-row"><div class="form-label">位置</div><input class="form-input" id="f-location" placeholder="如：冰箱第二层" value="' + escapeHTML(d.location || '') + '"></div>' +
        '<div class="form-row"><div class="form-label">文件夹</div><span class="form-value" data-action="pick-folder">' + (d.folder || '食品') + '<span class="form-arrow">›</span></span></div>' +
        '<div class="form-row"><div class="form-label">备注</div><input class="form-input" id="f-note" placeholder="选填" value="' + escapeHTML(d.note || '') + '"></div>' +
      '</div>' +
      '<div class="form-actions">' +
        '<button class="btn" data-action="save-form" data-again="1">' + (state.editingId ? '保存并继续' : '再加一次') + '</button>' +
        '<button class="btn btn-primary" data-action="save-form">' + (state.editingId ? '保存' : '添加') + '</button>' +
      '</div>' +
      '<input type="file" id="f-image-file" accept="image/*" style="display:none">' +
    '</div>';
  }

  /* ---------------- 通用渲染入口 ---------------- */
  function render() {
    renderHeader();
    renderNav();
    var view = $('#app-view');
    if (state.view === 'home') view.innerHTML = homeHTML();
    else if (state.view === 'search') view.innerHTML = searchHTML();
    else if (state.view === 'me') view.innerHTML = meHTML();
    else if (state.view === 'form') view.innerHTML = formHTML();
    else if (state.view === 'prefs') view.innerHTML = prefsHTML();
    else if (state.view === 'calendar') view.innerHTML = calendarHTML();
    else if (state.view === 'categoryManage') view.innerHTML = categoryManageHTML();
    else if (state.view === 'itemDetail') view.innerHTML = itemDetailHTML();
    renderSheet();
    renderSidebar();
    renderOverlay();
  }
  function sortSheetHTML() {
    var opts = [
      ['name', '名称 A-Z'], ['stock', '剩余库存'], ['production', '最近生产'], ['expiry', '最近过期'],
      ['soon', '最近临期'], ['created', '最近添加'], ['updated', '最近更新']
    ];
    var rows = opts.map(function (o) {
      var active = state.sortRule === o[0];
      return '<div class="sheet-row sort-row-item' + (active ? ' active' : '') + '" data-action="set-sort" data-key="' + o[0] + '">' +
        '<span class="row-main">' + o[1] + '</span>' + (active ? '<span class="row-check">↓</span>' : '') + '</div>';
    }).join('');
    return '<div class="sheet-mask show" data-action="close-sheet"></div>' +
      '<div class="sheet show sort-sheet"><div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>排序规则</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="sheet-list">' + rows + '</div>' +
      '</div>';
  }
  function renderSheet() {
    var root = $('#sheet-root');
    if (!root) return;
    if (state.sheet === 'sort') root.innerHTML = sortSheetHTML();
    else if (state.sheet === 'add') root.innerHTML = addSheetHTML();
    else root.innerHTML = '';
  }
  function renderSidebar() {
    var old = document.querySelector('.sidebar-wrap'); if (old) old.remove();
    if (!state.sidebarOpen) {
      var mask = document.querySelector('.side-mask'); if (mask) mask.remove();
      var sb = document.querySelector('.sidebar'); if (sb) sb.remove();
      return;
    }
    var wrap = document.createElement('div'); wrap.className = 'sidebar-wrap';
    wrap.innerHTML = sidebarHTML();
    document.querySelector('.device-screen').appendChild(wrap);
  }

  /* ---------------- 搜索页 ---------------- */
  function searchHTML() {
    var q = state.searchQuery.trim();
    var kw = q.toLowerCase();
    var list = [];
    if (q) {
      list = getItems().filter(function (it) {
        if (it.trashed) return false;
        var text = [it.name, it.folder, it.temp, it.location, it.note].join(' ').toLowerCase();
        return text.indexOf(kw) >= 0;
      });
    }
    var body;
    if (q) {
      body = list.length
        ? '<div class="item-list search-results">' + sortItems(list).map(itemCardHTML).join('') + '</div>'
        : '<div class="search-empty"><div class="big-search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg></div><div class="empty-title">没有找到相关物品</div></div>';
    } else {
      var history = state.searchHistory.length
        ? '<div class="search-history-block"><div class="section-title">搜索历史<span class="more" data-action="clear-search-history">清空</span></div>' +
          '<div class="search-history">' + state.searchHistory.map(function (h) {
            return '<button class="history-chip" data-action="search-term" data-term="' + escapeHTML(h) + '">' + escapeHTML(h) + '</button>';
          }).join('') + '</div></div>'
        : '';
      body = '<div class="search-empty">' +
        '<div class="big-search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg></div>' +
        '<div class="empty-title">暂无搜索历史</div>' +
        '<div class="empty-sub">输入任何内容或扫一扫开始搜索</div>' +
        (state.searchFocused ? '<button class="voice-btn" data-action="voice-search">🎤 按住语音搜索</button>' : '') +
        '</div>' + history;
    }
    var placeholder = state.searchFocused ? '搜索物品记录、文件夹、标签等' : '快速搜索';
    return '<div class="page search-page">' +
      '<div class="search-top">' +
        '<div class="search-bar' + (state.searchFocused ? ' focused' : '') + '" data-action="focus-search">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>' +
          '<input id="search-input" type="search" autocomplete="off" placeholder="' + placeholder + '" value="' + escapeHTML(q) + '">' +
        '</div>' +
        (state.searchFocused ? '<button class="search-cancel" data-action="cancel-search">取消</button>' : '') +
      '</div>' + body + '</div>';
  }

  /* ---------------- 我的 ---------------- */
  function meHTML() {
    var p = state.pref;
    var trashCount = getItems().filter(function (it) { return !!it.trashed; }).length;
    function row(action, emoji, title, sub, extra) {
      return '<div class="setting-row" data-action="' + action + '">' +
        '<span class="s-emoji">' + emoji + '</span>' +
        '<div class="s-main"><div class="s-title">' + title + '</div><div class="s-sub">' + sub + '</div></div>' +
        (extra || '') + '<span class="s-arrow">›</span></div>';
    }
    return '<div class="page">' +
      '<div class="profile-card" data-action="change-avatar">' +
        '<div class="profile-avatar">' + escapeHTML(p.avatar || '🐱') + '</div>' +
        '<div><div class="profile-name">本地收纳</div><div class="profile-sub">数据仅保存在这台设备 · 点击头像更换</div></div>' +
      '</div>' +
      '<div class="setting-group">' +
        row('open-prefs', '🎨', '显示偏好', '布局、日期、统计规则') +
        row('open-calendar', '📅', '到期日历', '按月份查看到期物品') +
        row('manage-categories', '📁', '分类管理', '添加 / 删除文件夹') +
        row('go-trash', '🗑️', '回收站', trashCount + ' 件待处理') +
      '</div>' +
      '<div class="setting-group">' +
        '<div class="setting-row"><span class="s-emoji">ℹ️</span><div class="s-main"><div class="s-title">版本</div>' +
          '<div class="s-sub">v' + APP_VERSION + ' · 单机本地版</div></div>' +
          '<button class="link-btn ghost" style="width:auto;padding:8px 12px;margin:0" data-action="show-version">更新说明</button></div>' +
      '</div>' +
    '</div>';
  }

  /* ---------------- 显示偏好（静态可切换） ---------------- */
  function prefSegment(key, opts) {
    return '<div class="pref-segment">' + opts.map(function (o) {
      return '<div class="pref-seg' + (state.pref[key] === o.value ? ' active' : '') + '" data-action="set-pref" data-key="' + key + '" data-value="' + o.value + '">' + o.label + '</div>';
    }).join('') + '</div>';
  }
  function prefRadios(key, opts) {
    return opts.map(function (o) {
      return '<div class="pref-radio-row" data-action="set-pref" data-key="' + key + '" data-value="' + o.value + '">' +
        '<span class="radio-dot' + (state.pref[key] === o.value ? ' on' : '') + '"></span><span>' + o.label + '</span></div>';
    }).join('');
  }
  function prefToggle(key, title, sub) {
    return '<div class="pref-radio-row" data-action="toggle-pref" data-key="' + key + '">' +
      '<div class="s-main"><div class="s-title">' + title + '</div><div class="s-sub">' + sub + '</div></div>' +
      '<span class="switch' + (state.pref[key] ? ' on' : '') + '"></span></div>';
  }
  function prefsHTML() {
    var p = state.pref;
    var layoutName = { simple: '简洁列表', detail: '详细列表', gallery: '画廊卡片' }[p.layout] || '简洁列表';
    var preview = p.layout === 'gallery'
      ? '<div class="option-grid" style="grid-template-columns:repeat(2,1fr);padding:0">' +
          '<div class="option-cell"><span class="opt-icon">🐄</span><span>纯牛奶</span></div>' +
          '<div class="option-cell"><span class="opt-icon">🐱</span><span>抹茶面膜</span></div></div>'
      : '<div class="item-list" style="gap:6px"><div class="item-card" style="padding:8px"><div class="item-thumb" style="width:42px;height:42px;font-size:22px">🐄</div>' +
        '<div class="item-main"><div class="item-name">纯牛奶</div><div class="item-meta">' + (p.layout === 'detail' ? '冷藏 · 食品 · 6 件' : '冷藏') + '</div></div>' +
        '<div class="item-right"><div class="item-days soon">剩 3 天</div></div></div></div>';
    return '<div class="page">' +
      '<div class="pref-preview"><div class="pref-preview-label">当前预览 · ' + layoutName + '</div>' + preview + '</div>' +
      '<div class="pref-block"><div class="pref-title">列表布局</div>' +
        prefSegment('layout', [{ value: 'simple', label: '简洁' }, { value: 'detail', label: '详细' }, { value: 'gallery', label: '画廊' }]) + '</div>' +
      '<div class="pref-block"><div class="pref-title">记录方式</div>' +
        prefRadios('recordMode', [{ value: 'single', label: '单条记录' }, { value: 'merged', label: '合并记录' }]) + '</div>' +
      '<div class="pref-block"><div class="pref-title">首页优先排序</div>' +
        prefRadios('priority', [{ value: 'remain', label: '按剩余天数' }, { value: 'stock', label: '按库存数量' }]) + '</div>' +
      '<div class="pref-block"><div class="pref-title">剩余时间显示</div>' +
        prefRadios('remainStyle', [{ value: 'days', label: '显示天数' }, { value: 'percent', label: '显示百分比' }]) + '</div>' +
      '<div class="pref-block"><div class="pref-title">日期格式</div>' +
        prefRadios('dateFormat', [{ value: 'ymd', label: '年-月-日' }, { value: 'dmy', label: '日/月/年' }]) + '</div>' +
      '<div class="pref-block"><div class="pref-title">统计规则</div>' +
        prefRadios('statRule', [{ value: 'quantity', label: '按数量统计' }, { value: 'kind', label: '按种类统计' }]) + '</div>' +
      '<div class="pref-block"><div class="pref-title">其他</div>' +
        prefToggle('includeChildren', '包含子文件夹', '文件夹统计时计入子文件夹') +
        prefToggle('showArchived', '显示已归档', '归档物品也出现在列表中') +
        prefToggle('includeProduceDay', '包含生产日', '计算剩余天数时计入生产当天') + '</div>' +
      '<p class="muted small center" style="margin-top:4px">偏好设置保存在本机，仅影响界面显示</p>' +
    '</div>';
  }

  /* ---------------- 到期日历 ---------------- */
  function calendarHTML() {
    var m = state.calendarMonth || new Date();
    var y = m.getFullYear();
    var mo = m.getMonth();
    var days = new Date(y, mo + 1, 0).getDate();
    var start = (new Date(y, mo, 1).getDay() + 6) % 7;
    var counts = {};
    getItems().filter(function (it) { return !it.trashed && it.expiry; }).forEach(function (it) {
      counts[it.expiry] = (counts[it.expiry] || 0) + 1;
    });
    var cells = ['一', '二', '三', '四', '五', '六', '日'].map(function (w) {
      return '<div class="cal-week">' + w + '</div>';
    }).join('');
    for (var i = 0; i < start; i++) cells += '<div class="cal-cell"></div>';
    for (var d = 1; d <= days; d++) {
      var ds = y + '-' + pad(mo + 1) + '-' + pad(d);
      var count = counts[ds] || 0;
      cells += '<div class="cal-cell' + (ds === todayStr() ? ' today' : '') + '" data-action="cal-day" data-date="' + ds + '">' +
        d + (count ? '<span class="dot"></span>' : '') + '</div>';
    }
    return '<div class="page">' +
      '<div class="link-card">' +
        '<div class="cal-head"><button class="icon-btn" data-action="cal-prev">‹</button>' +
          '<div class="bold">' + y + ' 年 ' + (mo + 1) + ' 月</div>' +
          '<button class="icon-btn" data-action="cal-next">›</button></div>' +
        '<div class="calendar-grid">' + cells + '</div>' +
        '<div class="muted small center" style="margin-top:10px">绿点表示当天有到期物品，点击日期查看</div>' +
      '</div></div>';
  }

  /* ---------------- 分类管理 ---------------- */
  function categoryManageHTML() {
    var folders = state.folders.map(function (f) {
      return '<div class="link-row"><span class="bold">' + escapeHTML(f) + '</span>' +
        (f === '通用' ? '<span class="muted small">默认</span>' : '<button class="link-btn ghost" style="width:auto;padding:6px 12px;margin:0" data-action="delete-folder" data-folder="' + escapeHTML(f) + '">删除</button>') +
        '</div>';
    }).join('');
    var tags = TEMP_TAGS.map(function (t) {
      return '<div class="link-row"><span>' + t.emoji + ' ' + t.label + '</span><span class="muted small">固定标签</span></div>';
    }).join('');
    return '<div class="page">' +
      '<div class="link-card"><div class="form-row" style="padding-left:0">' +
        '<input class="form-input" id="new-folder-input" placeholder="输入新文件夹名称" style="text-align:left">' +
        '<button class="link-btn ghost" style="width:auto;padding:9px 14px;margin:0" data-action="add-folder">添加</button>' +
      '</div></div>' +
      '<div class="section-title">我的文件夹</div><div class="link-card">' + folders + '</div>' +
      '<div class="section-title">固定标签</div><div class="link-card">' + tags + '</div>' +
      '<p class="muted small center">删除文件夹后，其中的物品会移入「通用」</p>' +
    '</div>';
  }

  /* ---------------- 物品详情 ---------------- */
  function itemDetailHTML() {
    var it = findItem(state.currentId);
    if (!it) return '<div class="empty"><div class="empty-emoji">🗂️</div><div class="empty-text">物品不存在或已删除</div></div>';
    var d = daysUntil(it.expiry);
    var status = d == null ? '未设置日期' : (d < 0 ? '已过期 ' + Math.abs(d) + ' 天' : (d === 0 ? '今天到期' : '剩 ' + d + ' 天'));
    var dayClass = d != null && d <= 7 ? (d < 0 ? 'expired' : 'soon') : '';
    var thumb = it.image ? '<div class="item-thumb" style="width:76px;height:76px"><img src="' + escapeHTML(it.image) + '" alt=""></div>'
      : '<div class="item-thumb" style="width:76px;height:76px;font-size:40px">' + escapeHTML(it.emoji || '🐱') + '</div>';
    var actions = it.trashed
      ? '<button class="btn" data-action="delete-item" data-id="' + it.id + '">彻底删除</button>' +
        '<button class="btn btn-primary" data-action="restore-item" data-id="' + it.id + '">恢复</button>'
      : '<button class="btn" data-action="toggle-item-opened" data-id="' + it.id + '">' + (it.opened ? '取消开封' : '标记开封') + '</button>' +
        '<button class="btn" data-action="trash-item" data-id="' + it.id + '">移入回收站</button>' +
        '<button class="btn btn-primary" data-action="edit-item" data-id="' + it.id + '">编辑</button>';
    return '<div class="page">' +
      '<div class="link-card center">' + thumb +
        '<div class="item-name" style="justify-content:center;margin-top:10px">' + escapeHTML(it.name) + '</div>' +
        '<div class="item-days ' + dayClass + '" style="margin-top:4px">' + escapeHTML(status) + '</div>' +
      '</div>' +
      '<div class="link-card">' +
        '<div class="link-row"><span>保质期至</span><span class="bold">' + escapeHTML(formatDate(it.expiry)) + '</span></div>' +
        '<div class="link-row"><span>生产日期</span><span>' + escapeHTML(formatDate(it.production)) + '</span></div>' +
        '<div class="link-row"><span>过期提醒</span><span>' + (it.reminder != null ? it.reminder + ' 天前' : '—') + '</span></div>' +
        '<div class="link-row"><span>数量</span><span>' + (it.quantity || 1) + '</span></div>' +
        '<div class="link-row"><span>标签</span><span>' + escapeHTML(it.temp || '—') + '</span></div>' +
        '<div class="link-row"><span>文件夹</span><span>' + escapeHTML(it.folder || '—') + '</span></div>' +
        '<div class="link-row"><span>位置</span><span>' + escapeHTML(it.location || '—') + '</span></div>' +
        '<div class="link-row"><span>状态</span><span>' + (it.opened ? '已开封' : '未开封') + '</span></div>' +
        '<div class="link-row"><span>备注</span><span style="max-width:62%;text-align:right">' + escapeHTML(it.note || '—') + '</span></div>' +
      '</div>' +
      '<div class="form-actions" style="flex-wrap:wrap">' + actions + '</div>' +
    '</div>';
  }

  /* ---------------- 通用弹层 ---------------- */
  function sheetShell(title, body) {
    return '<div class="sheet-mask show" data-action="close-overlay"></div>' +
      '<div class="sheet show"><div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>' + escapeHTML(title) + '</h2>' +
        '<button class="sheet-close" data-action="close-overlay">✕</button></div>' + body + '</div>';
  }
  function overlayHTML() {
    var o = state.overlay;
    if (!o) return '';
    if (o.type === 'date') {
      return sheetShell('选择日期',
        '<p class="sheet-tip">可直接选择，也可点「今天」快速填入</p>' +
        '<div class="date-pick"><input type="date" id="date-picker-input" value="' + escapeHTML(o.value || todayStr()) + '"></div>' +
        '<div class="date-actions">' +
          '<button class="btn" data-action="clear-date">清除</button>' +
          '<button class="btn" data-action="set-today">今天</button>' +
          '<button class="btn btn-primary" data-action="confirm-date">确定</button>' +
        '</div>');
    }
    if (o.type === 'list') {
      var rows = o.options.map(function (op) {
        var value = op.value;
        var checked = String(value) === String(o.value);
        return '<div class="sheet-row" data-action="pick-option" data-key="' + escapeHTML(o.key) + '" data-value="' + escapeHTML(value) + '">' +
          '<span class="row-emoji">' + (op.emoji || '') + '</span>' +
          '<span class="row-main">' + escapeHTML(op.label) + (op.sub ? '<span class="row-sub">' + escapeHTML(op.sub) + '</span>' : '') + '</span>' +
          (checked ? '<span class="row-check">✓</span>' : '') + '</div>';
      }).join('');
      return sheetShell(o.title || '请选择', '<div class="sheet-list">' + rows + '</div>');
    }
    return sheetShell(o.title || '提示',
      '<p class="sheet-tip" style="line-height:1.8;white-space:pre-line">' + escapeHTML(o.body || '') + '</p>' +
      '<button class="sheet-cancel" data-action="close-overlay">知道了</button>');
  }
  function renderOverlay() {
    var root = $('#overlay-root');
    if (root) root.innerHTML = overlayHTML();
  }
  function openInfo(title, body) { state.overlay = { type: 'info', title: title, body: body }; renderOverlay(); }
  function openList(title, key, options, value) {
    state.overlay = { type: 'list', title: title, key: key, options: options, value: value };
    renderOverlay();
  }

  /* ---------------- 表单辅助 ---------------- */
  function syncFormDraft() {
    if (state.view !== 'form') return;
    var d = state.formDraft || (state.formDraft = {});
    var name = $('#f-name'); if (name) d.name = name.value;
    var qty = $('#f-qty'); if (qty) d.quantity = qty.value;
    var location = $('#f-location'); if (location) d.location = location.value;
    var note = $('#f-note'); if (note) d.note = note.value;
  }
  function blankDraft(keep) {
    var old = state.formDraft || {};
    return {
      name: '', expiry: '', production: '', reminder: 7, quantity: 1,
      temp: keep && old.temp ? old.temp : '常温',
      folder: keep && old.folder ? old.folder : (state.folders[0] || '通用'),
      location: '', note: '', emoji: randomAnimal(), opened: false
    };
  }
  function openForm(id) {
    state.editingId = id || null;
    var it = id ? findItem(id) : null;
    state.formDraft = it ? Object.assign({}, it) : blankDraft(false);
    state.view = 'form';
    state.sheet = null;
    state.overlay = null;
    state.sidebarOpen = false;
    render();
  }
  function saveForm(saveAgain) {
    syncFormDraft();
    var d = state.formDraft || {};
    var name = String(d.name || '').trim();
    if (!name) { toast('请输入物品名称'); return; }
    var item = {
      id: state.editingId || uid(),
      name: name,
      emoji: d.emoji || randomAnimal(),
      image: d.image || '',
      expiry: d.expiry || '',
      production: d.production || '',
      reminder: Number(d.reminder) || 0,
      quantity: Math.max(1, Number(d.quantity) || 1),
      temp: d.temp || '常温',
      folder: d.folder || state.folders[0] || '通用',
      location: d.location || '',
      note: d.note || '',
      opened: !!d.opened,
      createdAt: d.createdAt || Date.now(),
      trashed: !!d.trashed
    };
    upsertItem(item);
    if (saveAgain && !state.editingId) {
      state.formDraft = blankDraft(true);
      render();
      toast('已保存，可继续添加');
    } else {
      state.editingId = null;
      state.formDraft = null;
      state.view = 'home';
      render();
      toast('已保存');
    }
  }
  function readImage(file) {
    if (!file) return;
    if (!/^image\//.test(file.type)) { toast('请选择图片文件'); return; }
    if (file.size > 2 * 1024 * 1024) { toast('图片请小于 2MB'); return; }
    var reader = new FileReader();
    reader.onload = function () {
      syncFormDraft();
      state.formDraft.image = String(reader.result);
      render();
      toast('图片已添加');
    };
    reader.readAsDataURL(file);
  }

  /* ---------------- 操作集合 ---------------- */
  function openView(view) {
    state.view = view;
    state.sheet = null;
    state.overlay = null;
    state.sidebarOpen = false;
    state.multiSelect = false;
    state.selectedIds = [];
    state.searchFocused = false;
    render();
  }
  function goBack() {
    if (state.overlay) { state.overlay = null; renderOverlay(); return; }
    if (state.sheet) { state.sheet = null; renderSheet(); return; }
    if (state.multiSelect) { exitMultiSelect(); return; }
    if (state.view === 'form') syncFormDraft();
    state.view = 'home';
    state.editingId = null;
    state.formDraft = null;
    state.searchFocused = false;
    render();
  }
  function setCategory(cat) {
    state.category = cat;
    state.view = 'home';
    state.sidebarOpen = false;
    state.multiSelect = false;
    state.selectedIds = [];
    render();
  }
  function openItem(id) {
    if (state.multiSelect) { toggleSelect(id); return; }
    state.currentId = id;
    state.view = 'itemDetail';
    render();
  }
  function enterMultiSelect() {
    state.multiSelect = true;
    state.selectedIds = [];
    state.sheet = null;
    render();
  }
  function exitMultiSelect() {
    state.multiSelect = false;
    state.selectedIds = [];
    render();
  }
  function toggleSelect(id) {
    var idx = state.selectedIds.indexOf(id);
    if (idx >= 0) state.selectedIds.splice(idx, 1);
    else state.selectedIds.push(id);
    render();
  }
  function selectAll() {
    if (!state.multiSelect) return;
    var list = filterItems();
    state.selectedIds = state.selectedIds.length === list.length ? [] : list.map(function (it) { return it.id; });
    render();
  }
  function deleteSelected() {
    if (!state.selectedIds.length) return;
    var n = state.selectedIds.length;
    state.selectedIds.slice().forEach(function (id) { removeItem(id, false); });
    state.selectedIds = [];
    state.multiSelect = false;
    render();
    toast('已删除 ' + n + ' 项');
  }
  function editItem(id) { openForm(id); }
  function toggleOpened(id) {
    var it = findItem(id); if (!it) return;
    it.opened = !it.opened;
    upsertItem(it);
    render();
    toast(it.opened ? '已标记开封' : '已取消开封');
  }
  function trashItem(id) {
    removeItem(id, true);
    state.view = 'home';
    state.currentId = null;
    render();
    toast('已移入回收站');
  }
  function deleteItem(id) {
    removeItem(id, false);
    state.view = 'home';
    state.currentId = null;
    render();
    toast('已彻底删除');
  }
  function restoreExistingItem(id) {
    restoreItem(id);
    render();
    toast('已恢复');
  }
  function saveFolders() {
    var db = loadDB();
    db.folders = state.folders.slice();
    saveDB(db);
  }
  function addFolder() {
    var input = $('#new-folder-input');
    var name = input ? String(input.value).trim() : '';
    if (!name) { toast('请输入文件夹名称'); return; }
    if (state.folders.indexOf(name) >= 0) { toast('文件夹已存在'); return; }
    state.folders.push(name);
    saveFolders();
    render();
    toast('文件夹已添加');
  }
  function deleteFolder(folder) {
    if (folder === '通用') { toast('默认文件夹不能删除'); return; }
    var db = loadDB();
    db.items.forEach(function (it) { if (it.folder === folder) it.folder = '通用'; });
    saveDB(db);
    state.folders = state.folders.filter(function (f) { return f !== folder; });
    saveFolders();
    if (state.category === folder) state.category = 'all';
    render();
    toast('已删除，物品已移入通用');
  }
  function setPref(key, value) {
    if (value === 'true' || value === 'false') state.pref[key] = value === 'true';
    else state.pref[key] = value;
    savePref();
  }
  function pickNew(key) {
    if (key === 'manual') { openForm(null); return; }
    var tips = {
      batch: '查批号需要联网查询商品数据库，本机版未启用。\n请用「手动输入」填写保质期。',
      scan: '扫一扫需要调用摄像头识别条码，本机版未启用。\n请用「手动输入」填写信息。',
      link: '商品链接解析需要联网，本机版未启用。\n请用「手动输入」填写信息。',
      medicine: '药品批号查询需要联网，本机版未启用。\n请用「手动输入」填写信息。',
      ai: '拍照识物需要模型服务，本机版未启用。\n请用「手动输入」填写信息。'
    };
    state.sheet = null;
    renderSheet();
    openInfo('本地版说明', tips[key] || '该功能在本机版中未启用。');
  }
  function updateSearchView() {
    var input = $('#search-input');
    if (!input) return;
    var pos = input.selectionStart;
    state.searchQuery = input.value;
    $('#app-view').innerHTML = searchHTML();
    var next = $('#search-input');
    if (next) {
      next.focus();
      try { next.setSelectionRange(pos, pos); } catch (e) {}
    }
  }
  function focusSearch() {
    if (state.searchFocused) return;
    state.searchFocused = true;
    updateSearchView();
  }
  function cancelSearch() {
    state.searchQuery = '';
    state.searchFocused = false;
    var input = $('#search-input');
    if (input) input.blur();
    render();
  }
  function handleAction(action, el) {
    var id = el.getAttribute('data-id');
    var key = el.getAttribute('data-key');
    var value = el.getAttribute('data-value');
    switch (action) {
      case 'open-sidebar': state.sidebarOpen = true; renderSidebar(); break;
      case 'close-sidebar': state.sidebarOpen = false; renderSidebar(); break;
      case 'go-back': goBack(); break;
      case 'nav': openView(el.getAttribute('data-view')); break;
      case 'go-search': openView('search'); break;
      case 'focus-search': focusSearch(); break;
      case 'cancel-search': cancelSearch(); break;
      case 'voice-search': toast('语音搜索在本机版未启用'); break;
      case 'scan-hint': toast('扫一扫在本机版未启用'); break;
      case 'open-sort-sheet': state.sheet = 'sort'; renderSheet(); break;
      case 'set-sort': state.sortRule = key; state.sheet = null; render(); break;
      case 'toggle-view': state.compact = !state.compact; render(); break;
      case 'enter-multiselect': enterMultiSelect(); break;
      case 'exit-multiselect': exitMultiSelect(); break;
      case 'toggle-select': toggleSelect(id); break;
      case 'select-all': selectAll(); break;
      case 'delete-selected': deleteSelected(); break;
      case 'set-category': setCategory(el.getAttribute('data-cat')); break;
      case 'open-calendar': openView('calendar'); break;
      case 'open-prefs': case 'go-prefs': openView('prefs'); break;
      case 'go-me': openView('me'); break;
      case 'go-trash': setCategory('trash'); break;
      case 'manage-categories': openView('categoryManage'); break;
      case 'open-add-sheet': state.sheet = 'add'; renderSheet(); break;
      case 'close-sheet': state.sheet = null; renderSheet(); break;
      case 'pick-new': pickNew(el.getAttribute('data-key')); break;
      case 'open-item': openItem(id); break;
      case 'edit-item': editItem(id); break;
      case 'toggle-item-opened': toggleOpened(id); break;
      case 'trash-item': trashItem(id); break;
      case 'delete-item': deleteItem(id); break;
      case 'restore-item': restoreExistingItem(id); break;
      case 'pick-image': var fileInput = $('#f-image-file'); if (fileInput) fileInput.click(); break;
      case 'pick-date':
        syncFormDraft();
        state.overlay = { type: 'date', field: el.getAttribute('data-field'), value: (state.formDraft || {})[el.getAttribute('data-field')] || '' };
        renderOverlay();
        break;
      case 'set-today': var dateInput = $('#date-picker-input'); if (dateInput) dateInput.value = todayStr(); break;
      case 'clear-date':
        if (state.formDraft && state.overlay) state.formDraft[state.overlay.field] = '';
        state.overlay = null; render(); break;
      case 'confirm-date':
        var picker = $('#date-picker-input');
        var field = state.overlay ? state.overlay.field : null;
        syncFormDraft();
        if (state.formDraft && field) state.formDraft[field] = picker ? picker.value : '';
        state.overlay = null; render(); break;
      case 'pick-reminder':
        syncFormDraft();
        openList('过期提醒', 'reminder', [0, 1, 2, 3, 7, 15, 30].map(function (n) {
          return { value: n, label: n === 0 ? '到期当天' : n + ' 天前' };
        }), state.formDraft.reminder);
        break;
      case 'pick-temp':
        syncFormDraft();
        openList('选择标签', 'temp', TEMP_TAGS.map(function (t) {
          return { value: t.key, label: t.label, emoji: t.emoji };
        }), state.formDraft.temp);
        break;
      case 'pick-folder':
        syncFormDraft();
        openList('选择文件夹', 'folder', state.folders.map(function (f) {
          return { value: f, label: f, emoji: '📁' };
        }), state.formDraft.folder);
        break;
      case 'pick-option':
        syncFormDraft();
        state.formDraft[key] = key === 'reminder' ? Number(value) : value;
        state.overlay = null; render(); break;
      case 'save-form': saveForm(el.getAttribute('data-again') === '1'); break;
      case 'close-overlay': state.overlay = null; renderOverlay(); break;
      case 'clear-search': state.searchQuery = ''; render(); break;
      case 'clear-search-history': state.searchHistory = []; saveSearchHistory(); render(); toast('已清空搜索历史'); break;
      case 'search-term': state.searchQuery = el.getAttribute('data-term') || el.textContent; state.searchFocused = true; render(); break;
      case 'set-pref': setPref(key, value); render(); break;
      case 'toggle-pref': setPref(key, !state.pref[key]); render(); break;
      case 'cal-prev':
        state.calendarMonth = new Date(state.calendarMonth.getFullYear(), state.calendarMonth.getMonth() - 1, 1);
        render(); break;
      case 'cal-next':
        state.calendarMonth = new Date(state.calendarMonth.getFullYear(), state.calendarMonth.getMonth() + 1, 1);
        render(); break;
      case 'cal-day':
        var date = el.getAttribute('data-date');
        var matches = getItems().filter(function (it) { return !it.trashed && it.expiry === date; });
        var body = matches.length ? matches.map(function (it) { return '· ' + it.name + '（' + (it.quantity || 1) + ' 件）'; }).join('\n') : '当天没有到期物品';
        openInfo(formatDate(date), body);
        break;
      case 'add-folder': addFolder(); break;
      case 'delete-folder': deleteFolder(el.getAttribute('data-folder')); break;
      case 'change-avatar': state.pref.avatar = randomAnimal(); savePref(); render(); break;
      case 'show-version':
        var text = APP_VERSION_CHANGELOG.map(function (c) {
          return 'v' + c.version + ' · ' + c.date + '\n' + c.title + '\n- ' + c.items.join('\n- ');
        }).join('\n\n');
        openInfo('更新说明', text);
        break;
      default: break;
    }
  }

  /* ---------------- 事件绑定 ---------------- */
  function bindEvents() {
    document.addEventListener('click', function (e) {
      if (!e.target || !e.target.closest) return;
      var el = e.target.closest('[data-action]');
      if (!el) return;
      vibrate();
      handleAction(el.getAttribute('data-action'), el);
    });
    document.addEventListener('focus', function (e) {
      if (e.target && e.target.id === 'search-input') focusSearch();
    }, true);
    document.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'search-input') updateSearchView();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      if (e.target && e.target.id === 'search-input') {
        pushSearchHistory(e.target.value);
        e.preventDefault();
      } else if (e.target && e.target.id === 'new-folder-input') {
        addFolder();
        e.preventDefault();
      }
    });
    document.addEventListener('change', function (e) {
      if (e.target && e.target.id === 'f-image-file') readImage(e.target.files && e.target.files[0]);
    });
  }

  /* ---------------- 启动 ---------------- */
  function init() {
    var db = loadDB();
    state.pref = loadPref();
    state.folders = Array.isArray(db.folders) && db.folders.length
      ? db.folders.slice()
      : DEFAULT_FOLDERS.map(function (f) { return f.key; });
    state.searchHistory = loadSearchHistory();
    state.calendarMonth = new Date();
    bindEvents();
    render();
  }

  init();
})();
