/* =========================================================
   寻迹 · 收纳保质期记录（单机本地版）
   纯前端：localStorage 存储，无任何后端 / 社交 / 云端功能
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- 常量 ---------------- */
  var APP_VERSION = '2.05';
  var DB_KEY = 'organizer_local_v2';
  var PREF_KEY = 'organizer_pref_v2';
  var HISTORY_KEY = 'organizer_search_history_v2';

  var APP_VERSION_CHANGELOG = [
    { version: '2.05', date: '2026-11-22', title: '表单修复与交互完善', items: [
      '新增页紧凑布局，分类数量单位同排，保存移入标题栏',
      '修复保存后首页不刷新，语音搜索可真实转文字',
      '侧栏图标统一、位置选中高亮、头像可拍照上传'
    ] },
    { version: '2.04', date: '2026-11-22', title: '设置页与多语言', items: [
      '字体大小 / 粗细 / 颜色可调节，支持简中 / 繁中 / 英文',
      '我的页各项可编辑，保留隐藏注册页与新手教程',
      '联动设备支持自定义动物图标，应用更名为寻迹'
    ] },
    { version: '2.03', date: '2026-11-22', title: '表单与分类页面重做', items: [
      '日期选择器改为日历弹层，生产日期与保质期同排',
      '新增物品分类页面、数量单位与存放位置预设'
    ] },
    { version: '2.02', date: '2026-11-22', title: '联动与旧版我的页', items: [
      '恢复设备联动页与高德地图打开按钮',
      '加号直接进入新建，支持多张拍照'
    ] },
    { version: '2.01', date: '2026-11-22', title: '寻迹本地版', items: [
      '彻底移除好友 / 聊天 / 云端，纯单机本地记录',
      '黑白极简界面与分类侧栏'
    ] }
  ];

  // 侧边栏分类
  var MAIN_CATEGORIES = [
    { key: 'all', label: '全部', icon: 'box', color: '#8a6a3b' },
    { key: 'best', label: '最佳', icon: 'leaf', color: '#4f9a6a' },
    { key: 'soon', label: '临近过期', icon: 'clock', color: '#4d8cc4' },
    { key: 'expired', label: '已过期', icon: 'warn', color: '#d9534f' },
    { key: 'stock', label: '库存总览', icon: 'layers', color: '#7a6bb5' },
    { key: 'trash', label: '回收站', icon: 'trash', color: '#8a8a8a' }
  ];
  var CATEGORY_SVG = {
    box: '<path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
    leaf: '<path d="M20 4C10 4 5 8 5 14a5 5 0 0 0 5 5c6 0 10-5 10-15z"/><path d="M4 20c3-5 7-8 12-10"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
    warn: '<path d="M12 3 2 20h20z"/><path d="M12 9v5M12 17h.01"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5M3 17l9 5 9-5"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/><path d="M10 11v6M14 11v6"/>',
    hash: '<path d="M5 9h14M5 15h14M10 3 8 21M16 3l-2 18"/>'
  };
  function categoryIconHTML(c) {
    var svg = CATEGORY_SVG[c.icon] || CATEGORY_SVG.box;
    return '<span class="side-emoji" style="color:' + (c.color || 'var(--green)') + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + svg + '</svg></span>';
  }
  var DEFAULT_CATEGORIES = [
    '食品', '药品', '化妆品', '衣物', '文档证件', '电子产品', '文具书籍',
    '钥匙锁具', '清洁用品', '运动用品', '母婴用品', '工具五金', '其他'
  ];
  var CATEGORY_LETTERS = {
    '食品': 'S', '药品': 'Y', '化妆品': 'H', '衣物': 'Y', '文档证件': 'W',
    '电子产品': 'D', '文具书籍': 'W', '钥匙锁具': 'Y', '清洁用品': 'Q',
    '运动用品': 'Y', '母婴用品': 'M', '工具五金': 'G', '其他': 'Q'
  };
  var CATEGORY_COLORS = ['#e07a5f', '#8ab17d', '#d9a441', '#7a9cc6', '#a98cc6', '#6fb1a8'];
  var UNITS = ['件', '卷', '包', '盒', '瓶', '块', '支', '罐', '袋', '个', '双', '片', '颗', '杯', '桶', '节', '粒', '自定义'];
  var LOCATION_PRESETS = ['冰箱', '厨房', '药箱', '抽屉', '柜子', '衣柜'];
  var ANIMAL_ICONS = ['🐱', '🐶', '🐰', '🐻', '🐼', '🦊', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🦆', '🐝', '🦋'];
  var DEFAULT_ITEMS = [
    { id: 'demo-1', name: '纯牛奶 250ml', emoji: '🐄', folder: '食品', unit: '瓶', expiry: '2026-11-25', production: '2026-11-18', reminder: 2, quantity: 6, opened: false, note: '', createdAt: Date.now() - 86400000 },
    { id: 'demo-2', name: '抹茶面膜', emoji: '🐱', folder: '化妆品', unit: '件', expiry: '2026-12-20', production: '2026-10-01', reminder: 7, quantity: 3, opened: false, note: '', createdAt: Date.now() - 172800000 }
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
    avatar: '我',
    nickname: '我的收纳',
    contact: '',
    signature: '',
    notifyTime: '09:00',
    frame: '经典卡面',
    fontSize: 'standard',
    fontWeight: 'standard',
    theme: 'mono',
    language: 'system',
    meSettings: { elder: false, notification: true, sound: true, security: true }
  };

  var LANG_OPTIONS = [
    { value: 'system', label: '跟随系统' },
    { value: 'zh-CN', label: '简体中文' },
    { value: 'zh-TW', label: '繁體中文' },
    { value: 'en', label: 'English' }
  ];
  var THEME_OPTIONS = [
    { value: 'mono', label: '黑白' },
    { value: 'warm', label: '暖白' },
    { value: 'green', label: '浅绿' },
    { value: 'dark', label: '夜间' }
  ];
  var FONT_SIZE_OPTIONS = [
    { value: 'standard', label: '标准' },
    { value: 'large', label: '大字' },
    { value: 'elder', label: '老年模式' }
  ];
  var FONT_WEIGHT_OPTIONS = [
    { value: 'standard', label: '标准' },
    { value: 'medium', label: '半粗' },
    { value: 'bold', label: '加粗' }
  ];
  var ACHIEVEMENT_LEVELS = [
    { level: 1, name: '初出茅庐', need: 0, frame: '经典卡面' },
    { level: 2, name: '小有收获', need: 5, frame: '绿叶卡面' },
    { level: 3, name: '收纳能手', need: 15, frame: '暖黄卡面' },
    { level: 4, name: '整理达人', need: 30, frame: '星蓝卡面' },
    { level: 5, name: '寻迹大师', need: 60, frame: '金边卡面' }
  ];

  var I18N = {
    'zh-TW': {
      '全部': '全部', '最佳': '最佳', '临近过期': '臨近過期', '已过期': '已過期', '已开封': '已開封',
      '活动历史': '活動歷史', '库存总览': '庫存總覽', '回收站': '回收站', '我的': '我的', '首页': '首頁',
      '搜索': '搜尋', '联动': '聯動', '设备联动': '設備聯動', '新增物品': '新增物品', '编辑物品': '編輯物品',
      '物品详情': '物品詳情', '显示偏好': '顯示偏好', '分类管理': '分類管理', '寻迹': '尋跡',
      '物品名称': '物品名稱', '请输入名称': '請輸入名稱', '图片': '圖片', '拍照/选图': '拍照/選圖',
      '分类': '分類', '数量': '數量', '单位': '單位', '生产日期': '生產日期', '保质期至': '保質期至',
      '请选择日期': '請選擇日期', '过期提醒': '過期提醒', '到期当天': '到期當天', '天前': '天前',
      '自定义分类': '自訂分類', '自定义': '自訂', '自定义单位': '自訂單位', '存放位置': '存放位置',
      '例如：冰箱第二层': '例如：冰箱第二層', '冰箱': '冰箱', '厨房': '廚房', '药箱': '藥箱',
      '抽屉': '抽屜', '柜子': '櫃子', '衣柜': '衣櫃', '备注': '備註', '补充说明（选填）': '補充說明（選填）',
      '再加一次': '再加一次', '保存并继续': '儲存並繼續', '保存': '儲存', '添加': '新增',
      '取消开封': '取消開封', '标记开封': '標記開封', '移入回收站': '移入回收站', '彻底删除': '徹底刪除',
      '恢复': '恢復', '编辑': '編輯', '返回': '返回', '全选': '全選', '完成': '完成',
      '退出多选': '退出多選', '删除': '刪除', '已选择': '已選擇', '项': '項', '名称 A-Z': '名稱 A-Z',
      '剩余库存': '剩餘庫存', '最近生产': '最近生產', '最近过期': '最近過期', '最近临期': '最近臨期',
      '最近添加': '最近新增', '最近更新': '最近更新', '排序规则': '排序規則', '快速搜索': '快速搜尋',
      '暂无搜索历史': '暫無搜尋歷史', '输入任何内容或扫一扫开始搜索': '輸入任何內容或掃一掃開始搜尋',
      '按住语音搜索': '按住語音搜尋', '取消': '取消', '没有找到相关物品': '沒有找到相關物品',
      '这里还没有物品': '這裡還沒有物品', '还没有记录': '還沒有記錄', '轻点 + 添加第一条记录吧': '輕點 + 新增第一筆記錄吧',
      '个人信息': '個人資訊', '界面设置': '介面設定', '功能设置': '功能設定', '昵称': '暱稱',
      '我的收纳': '我的收納', '联系方式': '聯絡方式', '未填写': '未填寫', '个性签名': '個性簽名',
      '成就等级': '成就等級', '装扮管理': '裝扮管理', '字体大小': '字體大小', '标准': '標準',
      '字体粗细': '字體粗細', '标准（半粗）': '標準（半粗）', '界面颜色': '介面顏色', '黑白': '黑白',
      '语言': '語言', '跟随系统': '跟隨系統', '简体中文': '簡體中文', '繁体中文': '繁體中文',
      '英文': '英文', '老年模式': '老年模式', '超大字体 · 高对比 · 简化功能': '超大字體 · 高對比 · 簡化功能',
      '消息通知': '訊息通知', '接收提醒与聊天消息': '接收提醒與聊天訊息', '通知时间': '通知時間',
      '提示音': '提示音', '查找标签时播放声音': '查找標籤時播放聲音', '账号安全': '帳號安全',
      '登录验证与密码保护': '登入驗證與密碼保護', '修改密码': '修改密碼', '更新登录密码': '更新登入密碼',
      '使用指南': '使用指南', '操作步骤与颜色说明': '操作步驟與顏色說明', '版本与更新': '版本與更新',
      '查看历史更新内容': '查看歷史更新內容', '注册于': '註冊於', '已收纳': '已收納', '件物品': '件物品',
      '退出登录': '登出', '新手教程': '新手教學', '隐藏注册页': '隱註冊頁', '原密码': '原密碼',
      '新密码': '新密碼', '确认密码': '確認密碼', '下一步': '下一步', '开始使用': '開始使用',
      '我的实时位置': '我的即時位置', '下拉展开地图 ›': '下拉展開地圖 ›', '收起地图 ›': '收起地圖 ›',
      '你在这里': '你在這裡', '用高德地图打开': '用高德地圖開啟', '地图方案': '地圖方案',
      '设备': '設備', '添加设备': '新增設備', '在线': '線上', '电量': '電量', '信号强度': '訊號強度',
      '播放声音': '播放聲音', '自定义标签': '自訂標籤', '绑定物品': '綁定物品', '离位提醒': '離位提醒',
      '开': '開', '联动能力': '聯動能力', '设备 + App': '設備 + App', '一键查找': '一鍵查找',
      '自动记录收纳': '自動記錄收納', '低电量提醒': '低電量提醒', '设备联动说明': '設備聯動說明',
      '查看真实中国地图接入方案': '查看真實中國地圖接入方案', '请选择': '請選擇', '提示': '提示',
      '清除': '清除', '设置': '設定', '今天': '今天', '周一': '週一', '周二': '週二', '周三': '週三',
      '周四': '週四', '周五': '週五', '周六': '週六', '周日': '週日', '一': '一', '二': '二', '三': '三',
      '四': '四', '五': '五', '六': '六', '日': '日', '年': '年', '月': '月', '剩余': '剩餘',
      '件': '件', '瓶': '瓶', '盒': '盒', '包': '包', '袋': '袋', '个': '個', '已保存': '已儲存',
      '请输入物品名称': '請輸入物品名稱', '已添加': '已新增', '已删除': '已刪除', '更新说明': '更新說明',
      '搜索物品记录、分类、位置等': '搜尋物品記錄、分類、位置等', '过期日期': '過期日期',
      '食品': '食品', '药品': '藥品', '化妆品': '化妝品', '衣物': '衣物', '文档证件': '文件證件',
      '电子产品': '電子產品', '文具书籍': '文具書籍', '钥匙锁具': '鑰匙鎖具', '清洁用品': '清潔用品',
      '运动用品': '運動用品', '母婴用品': '母嬰用品', '工具五金': '工具五金', '其他': '其他'
    },
    'en': {
      '全部': 'All', '最佳': 'Best', '临近过期': 'Expiring', '已过期': 'Expired', '已开封': 'Opened',
      '活动历史': 'History', '库存总览': 'Stock', '回收站': 'Trash', '我的': 'Me', '首页': 'Home',
      '搜索': 'Search', '联动': 'Link', '设备联动': 'Device Link', '新增物品': 'New Item', '编辑物品': 'Edit Item',
      '物品详情': 'Item Details', '显示偏好': 'Preferences', '分类管理': 'Categories', '寻迹': 'Xunji',
      '物品名称': 'Item Name', '请输入名称': 'Enter name', '图片': 'Photos', '拍照/选图': 'Take or choose',
      '分类': 'Category', '数量': 'Quantity', '单位': 'Unit', '生产日期': 'Produced', '保质期至': 'Expiry',
      '请选择日期': 'Select date', '过期提醒': 'Reminder', '到期当天': 'On due date', '天前': 'days before',
      '自定义分类': 'Custom category', '自定义': 'Custom', '自定义单位': 'Custom unit', '存放位置': 'Location',
      '例如：冰箱第二层': 'e.g. Fridge shelf 2', '冰箱': 'Fridge', '厨房': 'Kitchen', '药箱': 'Medicine box',
      '抽屉': 'Drawer', '柜子': 'Cabinet', '衣柜': 'Wardrobe', '备注': 'Notes', '补充说明（选填）': 'Optional notes',
      '再加一次': 'Add another', '保存并继续': 'Save and continue', '保存': 'Save', '添加': 'Add',
      '取消开封': 'Mark unopened', '标记开封': 'Mark opened', '移入回收站': 'Move to trash', '彻底删除': 'Delete forever',
      '恢复': 'Restore', '编辑': 'Edit', '返回': 'Back', '全选': 'Select all', '完成': 'Done',
      '退出多选': 'Exit selection', '删除': 'Delete', '已选择': 'Selected', '项': 'items', '名称 A-Z': 'Name A-Z',
      '剩余库存': 'Stock', '最近生产': 'Recently produced', '最近过期': 'Recently expired', '最近临期': 'Soonest',
      '最近添加': 'Recently added', '最近更新': 'Recently updated', '排序规则': 'Sort by', '快速搜索': 'Quick search',
      '暂无搜索历史': 'No search history', '输入任何内容或扫一扫开始搜索': 'Type anything or scan to search',
      '按住语音搜索': 'Hold to voice search', '取消': 'Cancel', '没有找到相关物品': 'No items found',
      '这里还没有物品': 'No items here', '还没有记录': 'No records', '轻点 + 添加第一条记录吧': 'Tap + to add your first record',
      '个人信息': 'Profile', '界面设置': 'Appearance', '功能设置': 'Features', '昵称': 'Nickname',
      '我的收纳': 'My Storage', '联系方式': 'Contact', '未填写': 'Not set', '个性签名': 'Signature',
      '成就等级': 'Level', '装扮管理': 'Skins', '字体大小': 'Font size', '标准': 'Standard',
      '字体粗细': 'Font weight', '标准（半粗）': 'Regular / Medium', '界面颜色': 'Theme', '黑白': 'Mono',
      '语言': 'Language', '跟随系统': 'System', '简体中文': 'Simplified Chinese', '繁体中文': 'Traditional Chinese',
      '英文': 'English', '老年模式': 'Elder mode', '超大字体 · 高对比 · 简化功能': 'Larger text, higher contrast, simpler UI',
      '消息通知': 'Notifications', '接收提醒与聊天消息': 'Receive reminders', '通知时间': 'Notify time',
      '提示音': 'Sound', '查找标签时播放声音': 'Play sound when finding tag', '账号安全': 'Account security',
      '登录验证与密码保护': 'Sign-in and password protection', '修改密码': 'Change password', '更新登录密码': 'Update password',
      '使用指南': 'Guide', '操作步骤与颜色说明': 'Steps and colors', '版本与更新': 'Version and updates',
      '查看历史更新内容': 'View changelog', '注册于': 'Joined', '已收纳': 'Stored', '件物品': 'items',
      '退出登录': 'Sign out', '新手教程': 'Tutorial', '隐藏注册页': 'Hidden signup', '原密码': 'Old password',
      '新密码': 'New password', '确认密码': 'Confirm password', '下一步': 'Next', '开始使用': 'Get started',
      '我的实时位置': 'My location', '下拉展开地图 ›': 'Expand map ›', '收起地图 ›': 'Collapse map ›',
      '你在这里': 'You are here', '用高德地图打开': 'Open in Amap', '地图方案': 'Map options',
      '设备': 'Devices', '添加设备': 'Add device', '在线': 'Online', '电量': 'Battery', '信号强度': 'Signal',
      '播放声音': 'Play sound', '自定义标签': 'Custom tag', '绑定物品': 'Bind item', '离位提醒': 'Away alert',
      '开': 'On', '联动能力': 'Features', '设备 + App': 'Device + App', '一键查找': 'Find tag',
      '自动记录收纳': 'Auto record', '低电量提醒': 'Low battery alert', '设备联动说明': 'Device link notes',
      '查看真实中国地图接入方案': 'View map integration guide', '请选择': 'Select', '提示': 'Tip',
      '清除': 'Clear', '设置': 'Set', '今天': 'Today', '周一': 'Mon', '周二': 'Tue', '周三': 'Wed',
      '周四': 'Thu', '周五': 'Fri', '周六': 'Sat', '周日': 'Sun', '一': 'M', '二': 'T', '三': 'W',
      '四': 'T', '五': 'F', '六': 'S', '日': 'S', '年': '', '月': '/', '剩余': 'Left',
      '件': 'pc', '瓶': 'bottle', '盒': 'box', '包': 'pack', '袋': 'bag', '个': 'pcs', '已保存': 'Saved',
      '请输入物品名称': 'Enter item name', '已添加': 'Added', '已删除': 'Deleted', '更新说明': 'What is new',
      '搜索物品记录、分类、位置等': 'Search records, categories, locations', '过期日期': 'Expiry',
      '食品': 'Food', '药品': 'Medicine', '化妆品': 'Cosmetics', '衣物': 'Clothes', '文档证件': 'Documents',
      '电子产品': 'Electronics', '文具书籍': 'Stationery', '钥匙锁具': 'Keys', '清洁用品': 'Cleaning',
      '运动用品': 'Sports', '母婴用品': 'Baby', '工具五金': 'Tools', '其他': 'Other'
    }
  };

  /* ---------------- 状态 ---------------- */
  var state = {
    view: 'home',            // home / search / link / me / form / prefs / categoryManage / itemDetail
    category: 'all',
    searchQuery: '',
    searchHistory: [],
    searchFocused: false,
    recognizing: false,
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
    link: { mapExpanded: false, icon: '🐱' },
    tutorialStep: 0,
    pref: null,
    folders: []
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
  function weekdayCN(str) {
    if (!str) return '';
    var d = new Date(str + 'T00:00:00');
    return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()] || '';
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
  function currentLang() {
    var lang = (state.pref && state.pref.language) || 'system';
    if (lang !== 'system') return I18N[lang] ? lang : 'zh-CN';
    var nav = (navigator.language || 'zh-CN').toLowerCase();
    if (nav.indexOf('zh-tw') >= 0 || nav.indexOf('zh-hk') >= 0) return 'zh-TW';
    if (nav.indexOf('en') === 0) return 'en';
    return 'zh-CN';
  }
  function tr(text) {
    var lang = currentLang();
    if (lang === 'zh-CN') return text;
    var dict = I18N[lang] || {};
    var value = String(text);
    if (dict[value]) return dict[value];
    Object.keys(dict).forEach(function (k) {
      if (k.length > 1) value = value.split(k).join(dict[k]);
    });
    return value;
  }
  function applyI18n(root) {
    var lang = currentLang();
    if (!root || lang === 'zh-CN' || !document.createTreeWalker || !window.NodeFilter) return;
    var walker = document.createTreeWalker(root, window.NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var original = String(n.nodeValue || '');
      if (!original.trim()) return;
      var converted = tr(original.trim());
      if (converted !== original.trim()) n.nodeValue = original.replace(original.trim(), converted);
    });
    var els = root.querySelectorAll ? root.querySelectorAll('[placeholder], [title], [aria-label]') : [];
    Array.prototype.forEach.call(els, function (el) {
      ['placeholder', 'title', 'aria-label'].forEach(function (attr) {
        var v = el.getAttribute && el.getAttribute(attr);
        if (v) el.setAttribute(attr, tr(v));
      });
    });
  }
  function applyTheme() {
    var root = document.documentElement;
    if (!root || !state.pref) return;
    root.setAttribute('data-theme', state.pref.theme || 'mono');
    root.setAttribute('data-font', state.pref.fontSize || 'standard');
    root.setAttribute('data-weight', state.pref.fontWeight || 'standard');
    root.setAttribute('data-elder', state.pref.meSettings && state.pref.meSettings.elder ? '1' : '0');
  }
  function getLevel() {
    var count = getItems().filter(function (it) { return !it.trashed; }).length;
    var level = ACHIEVEMENT_LEVELS[0];
    ACHIEVEMENT_LEVELS.forEach(function (l) { if (count >= l.need) level = l; });
    return level;
  }

  /* ---------------- 数据层（本地存储） ---------------- */
  function loadDB() {
    try {
      var raw = localStorage.getItem(DB_KEY);
      if (raw) {
        var db = JSON.parse(raw);
        if (db && Array.isArray(db.items)) return db;
      }
    } catch (e) {}
    return { items: JSON.parse(JSON.stringify(DEFAULT_ITEMS)), history: [], folders: DEFAULT_CATEGORIES.slice() };
  }
  function saveDB(db) { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch (e) {} }
  function loadPref() {
    try {
      var raw = localStorage.getItem(PREF_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        var merged = Object.assign({}, DEFAULT_PREF, p);
        merged.meSettings = Object.assign({}, DEFAULT_PREF.meSettings, p.meSettings || {});
        return merged;
      }
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
    var cutoff = Date.now() - 30 * 86400000;
    db.history = db.history.filter(function (h) { return h && h.time > cutoff; });
    db.history.unshift({ time: Date.now(), itemId: item.id, name: item.name, action: idx >= 0 ? 'edit' : 'add' });
    db.history = db.history.slice(0, 200);
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
    // 物品分类
    if (state.folders.indexOf(cat) >= 0) {
      return list.filter(function (it) { return it.folder === cat; });
    }
    return list;
  }
  function categoryLabel() {
    var all = MAIN_CATEGORIES.concat(state.folders.map(function (f) { return { key: f, label: f }; }));
    for (var i = 0; i < all.length; i++) { if (all[i].key === state.category) return all[i].label; }
    return '全部';
  }

  /* ---------------- 顶部栏 ---------------- */
  function renderHeader() {
    var status = '';
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
            '<button class="icon-btn" data-action="enter-multiselect" aria-label="多选"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg></button>' +
          '</div>' +
        '</div>';
      return;
    }

    if (state.view === 'form') {
      header.innerHTML = status +
        '<div class="header-row form-header">' +
          '<button class="icon-btn form-cancel" data-action="cancel-form" aria-label="取消">✕</button>' +
          '<div class="header-title">' + (state.editingId ? '编辑物品' : '新增物品') + '</div>' +
          '<button class="form-save" data-action="save-form">保存</button>' +
        '</div>' +
        '<div class="required-note">* 为必填项，未标注的为选填项</div>';
      return;
    }
    if (state.view === 'link') {
      header.innerHTML = status +
        '<div class="header-row link-header">' +
          '<span class="link-wave">' + navSVG('link') + '</span><div class="header-title">设备联动</div>' +
          '<div class="header-actions" style="margin-left:auto"><button class="icon-btn" data-action="add-device-hint" aria-label="添加设备">＋</button></div>' +
        '</div>';
      return;
    }

    var titles = {
      me: '我的', prefs: '显示偏好', categoryManage: '分类管理',
      form: state.editingId ? '编辑物品' : '新增物品', itemDetail: '物品详情',
      tutorial: '新手教程', password: '修改密码', achievement: '成就等级', register: '注册'
    };
    var title = titles[state.view] || '寻迹';
    var showBack = ['prefs', 'categoryManage', 'itemDetail', 'tutorial', 'password', 'achievement', 'register'].indexOf(state.view) >= 0;
    var headerClass = state.view === 'me' ? 'header-row me-header' : 'header-row';
    header.innerHTML = status +
      '<div class="' + headerClass + '">' +
        (showBack ? '<button class="icon-btn" data-action="go-back" aria-label="返回">‹</button>' : '') +
        '<div class="header-title">' + escapeHTML(title) + '</div>' +
      '</div>';
  }

  /* ---------------- 底部导航 ---------------- */
  function navSVG(key) {
    var m = {
      home: '<rect x="4" y="6" width="16" height="14" rx="2.5"/><path d="M4 10h16M8 6V4.5h8V6"/>',
      search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
      link: '<circle cx="12" cy="12" r="2"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13"/>',
      me: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (m[key] || '') + '</svg>';
  }
  function renderNav() {
    var tabs = [
      { key: 'home', label: '首页' },
      { key: 'search', label: '搜索' },
      { key: 'add', label: '' },
      { key: 'link', label: '联动' },
      { key: 'me', label: '我的' }
    ];
    $('#bottom-nav').innerHTML = tabs.map(function (t) {
      var key = t.key;
      if (key === 'add') {
        return '<button class="nav-item nav-add" data-action="add-new" aria-label="新增"><span class="add-circle"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></button>';
      }
      if (key === 'home' && state.multiSelect) {
        return '<button class="nav-item nav-select-all" data-action="select-all"><span class="select-all-icon">✓</span><span class="nav-label">首页</span></button>';
      }
      var active = state.view === key ? ' active' : '';
      return '<button class="nav-item' + active + '" data-action="nav" data-view="' + key + '">' + navSVG(key) + '<span class="nav-label">' + t.label + '</span></button>';
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
    var tags = '<span class="tag-yellow">' + escapeHTML(it.folder || '未分类') + '</span>' +
      '<span class="tag-gray">剩余 ' + (it.quantity || 1) + ' ' + escapeHTML(it.unit || '件') + '</span>';
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
      trash: items.filter(function (it) { return !!it.trashed; }).length
    };
    function sideItem(c) {
      var cnt = counts[c.key];
      return '<div class="side-item' + (state.category === c.key ? ' active' : '') + '" data-action="set-category" data-cat="' + escapeHTML(c.key) + '">' +
        categoryIconHTML(c) + '<span>' + escapeHTML(c.label) + '</span>' +
        (cnt != null ? '<span class="side-count">' + cnt + '</span>' : '') + '</div>';
    }
    return '<div class="side-mask' + (state.sidebarOpen ? ' show' : '') + '" data-action="close-sidebar"></div>' +
      '<aside class="sidebar' + (state.sidebarOpen ? ' show' : '') + '">' +
        '<div class="sidebar-head">' +
          '<div class="sidebar-title-row"><div><div class="sidebar-title">寻迹</div><span class="sidebar-badge">基础</span></div>' +
            '<span class="sidebar-icons" data-action="notification-hint" title="通知"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M10.5 20a2 2 0 0 0 3 0"/></svg></span>' +
          '</div>' +
        '</div>' +
        '<div class="sidebar-body">' +
          '<div class="side-group">' + MAIN_CATEGORIES.map(sideItem).join('') + '</div>' +
          '<div class="side-group"><div class="side-item" data-action="manage-categories">' + categoryIconHTML({ icon: 'hash', color: '#8a8a8a' }) + '<span>物品分类</span><span class="side-arrow">›</span></div></div>' +
        '</div>' +
      '</aside>';
  }

  /* ---------------- 表单页 ---------------- */
  function formHTML() {
    var d = state.formDraft || {};
    var images = d.images || (d.image ? [d.image] : []);
    var photoHTML = images.map(function (src, i) {
      return '<div class="photo-thumb"><img src="' + escapeHTML(src) + '" alt=""><span class="photo-del" data-action="remove-photo" data-index="' + i + '">✕</span></div>';
    }).join('') + '<div class="photo-upload" data-action="pick-image"><span>＋</span><span>拍照/选图</span></div>';
    function dateCell(field, label) {
      var v = d[field];
      return '<div class="dual-col"><div class="form-label">' + label + '</div>' +
        '<span class="form-value' + (v ? '' : ' placeholder') + '" data-action="pick-date" data-field="' + field + '">' +
        (v ? escapeHTML(formatDate(v)) : '请选择日期') + '</span></div>';
    }
    function inlineOrSelect(id, action, value, placeholder) {
      return '<input class="form-input select-input" id="' + id + '" value="' + escapeHTML(value || '') + '" placeholder="' + escapeHTML(placeholder) + '">' +
        '<span class="select-hint" data-action="' + action + '">›</span>';
    }
    var folderCell = d.categoryCustom
      ? inlineOrSelect('f-folder-inline', 'pick-category', d.folder, '输入分类名称')
      : '<span class="form-value" data-action="pick-category">' + escapeHTML(d.folder || '食品') + ' ›</span>';
    var unitCell = d.unitCustom
      ? inlineOrSelect('f-unit-inline', 'pick-unit', d.unit, '输入单位')
      : '<span class="form-value" data-action="pick-unit">' + escapeHTML(d.unit || '件') + ' ›</span>';
    var reminderCell = d.reminderCustom
      ? inlineOrSelect('f-reminder-inline', 'pick-reminder', d.reminder, '天数')
      : '<span class="form-value" data-action="pick-reminder">' + (d.reminder != null ? d.reminder + ' 天前' : '7 天前') + ' ›</span>';
    return '<div class="page form-page compact-form">' +
      '<div class="form-group">' +
        '<div class="form-row"><div class="form-label">物品名称 *</div><input class="form-input" id="f-name" placeholder="请输入名称" value="' + escapeHTML(d.name || '') + '"></div>' +
        '<div class="form-row"><div class="form-label">图片</div><div class="photo-grid">' + photoHTML + '</div></div>' +
        '<div class="form-row triple-row">' +
          '<div class="triple-col cat-col"><div class="form-label">分类</div>' + folderCell + '</div>' +
          '<div class="triple-col qty-col"><div class="form-label">数量</div><div class="qty-stepper"><button data-action="qty-minus">−</button><span>' + (Number(d.quantity) || 1) + '</span><button data-action="qty-plus">＋</button></div></div>' +
          '<div class="triple-col unit-col"><div class="form-label">单位</div>' + unitCell + '</div>' +
        '</div>' +
        '<div class="form-row dual-row">' + dateCell('production', '生产日期') + dateCell('expiry', '保质期至') + '</div>' +
        '<div class="form-row"><div class="form-label">过期提醒</div>' + reminderCell + '</div>' +
      '</div>' +
      '<div class="more-block">' +
        '<div class="form-row"><div class="form-label">存放位置</div><input class="form-input" id="f-location" placeholder="例如：冰箱第二层" value="' + escapeHTML(d.location || '') + '"></div>' +
        '<div class="location-presets">' + LOCATION_PRESETS.map(function (p) {
          var active = d.location === p ? ' active' : '';
          return '<button class="' + active + '" data-action="set-location" data-value="' + escapeHTML(p) + '">' + escapeHTML(p) + '</button>';
        }).join('') + '</div>' +
        '<div class="form-row"><div class="form-label">备注</div><input class="form-input" id="f-note" placeholder="补充说明（选填）" value="' + escapeHTML(d.note || '') + '"></div>' +
      '</div>' +
      '<input type="file" id="f-image-file" accept="image/*" multiple style="display:none">' +
    '</div>';
  }

  /* ---------------- 通用渲染入口 ---------------- */
  function render() {
    applyTheme();
    renderHeader();
    renderNav();
    var view = $('#app-view');
    if (state.view === 'home') view.innerHTML = homeHTML();
    else if (state.view === 'search') view.innerHTML = searchHTML();
    else if (state.view === 'link') view.innerHTML = linkHTML();
    else if (state.view === 'me') view.innerHTML = meHTML();
    else if (state.view === 'form') view.innerHTML = formHTML();
    else if (state.view === 'prefs') view.innerHTML = prefsHTML();
    else if (state.view === 'categoryManage') view.innerHTML = categoryManageHTML();
    else if (state.view === 'itemDetail') view.innerHTML = itemDetailHTML();
    else if (state.view === 'tutorial') view.innerHTML = tutorialHTML();
    else if (state.view === 'password') view.innerHTML = passwordHTML();
    else if (state.view === 'achievement') view.innerHTML = achievementHTML();
    else if (state.view === 'register') view.innerHTML = registerHTML();
    renderSheet();
    renderSidebar();
    renderOverlay();
    ['#app-header', '#app-view', '#bottom-nav', '#sheet-root', '#overlay-root'].forEach(function (sel) { applyI18n($(sel)); });
    applyI18n(document.querySelector('.sidebar-wrap'));
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
    else root.innerHTML = '';
    applyI18n(root);
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
        var text = [it.name, it.folder, it.unit, it.location, it.note].join(' ').toLowerCase();
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
        (state.searchFocused ? '<button class="voice-btn' + (state.recognizing ? ' recording' : '') + '" data-action="voice-search">🎤 ' + (state.recognizing ? '正在聆听…' : '按住语音搜索') + '</button>' : '') +
        '</div>' + history;
    }
    var placeholder = state.searchFocused ? '搜索物品记录、分类、位置等' : '快速搜索';
    return '<div class="page search-page">' +
      '<div class="search-top">' +
        '<div class="search-bar' + (state.searchFocused ? ' focused' : '') + '" data-action="focus-search">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>' +
          '<input id="search-input" type="search" autocomplete="off" placeholder="' + placeholder + '" value="' + escapeHTML(q) + '">' +
        '</div>' +
        (state.searchFocused ? '<button class="search-cancel" data-action="cancel-search">取消</button>' : '') +
      '</div>' + body + '</div>';
  }

  /* ---------------- 我的（旧版样式） ---------------- */
  function labelOf(list, value) {
    var found = list.filter(function (o) { return o.value === value; })[0];
    return found ? found.label : (list[0] ? list[0].label : '');
  }
  function meHTML() {
    var p = state.pref;
    var s = p.meSettings || { elder: false, notification: true, sound: true, security: true };
    var level = getLevel();
    function editRow(key, icon, title, value) {
      return '<div class="me-row" data-action="edit-profile" data-key="' + key + '" data-title="' + escapeHTML(title) + '" data-value="' + escapeHTML(value || '') + '">' +
        '<span class="me-icon">' + icon + '</span><div class="me-row-main"><div class="me-row-title">' + title + '</div><div class="me-row-sub">' + escapeHTML(value || '未填写') + '</div></div><span class="me-arrow">›</span></div>';
    }
    function optionRow(action, icon, title, sub, extra) {
      return '<div class="me-row" data-action="' + action + '"' + (extra || '') + '>' +
        '<span class="me-icon">' + icon + '</span><div class="me-row-main"><div class="me-row-title">' + title + '</div><div class="me-row-sub">' + escapeHTML(sub) + '</div></div><span class="me-arrow">›</span></div>';
    }
    function toggle(key, icon, title, sub) {
      return '<div class="me-row"><span class="me-icon">' + icon + '</span><div class="me-row-main"><div class="me-row-title">' + title + '</div><div class="me-row-sub">' + sub + '</div></div>' +
        '<span class="switch' + (s[key] ? ' on' : '') + '" data-action="toggle-me-setting" data-key="' + key + '"></span></div>';
    }
    var count = getItems().filter(function (it) { return !it.trashed; }).length;
    return '<div class="page me-page">' +
      '<div class="me-hero"><div class="me-avatar" data-action="pick-avatar">' +
        (String(p.avatar || '').indexOf('data:') === 0 ? '<img src="' + escapeHTML(p.avatar) + '" alt="">' : escapeHTML(p.avatar || '我')) +
        '<span class="me-edit">✎</span></div>' +
        '<div class="me-name">' + escapeHTML(p.nickname || '我的收纳') + '</div><div class="me-id">@local_user · ID 963221</div></div>' +
      '<div class="me-card"><div class="me-card-title">个人信息<span>⌃</span></div>' +
        editRow('nickname', '👤', '昵称', p.nickname || '我的收纳') +
        editRow('contact', '💬', '联系方式', p.contact || '未填写') +
        editRow('signature', '📝', '个性签名', p.signature || '未填写') +
        optionRow('go-achievement', '🏆', '成就等级', '第 ' + level.level + ' 级 · ' + level.name + ' · 装扮管理') +
      '</div>' +
      '<div class="me-card"><div class="me-card-title">界面设置<span>⌃</span></div>' +
        optionRow('pref-list', '▦', '字体大小', labelOf(FONT_SIZE_OPTIONS, p.fontSize), ' data-key="fontSize" data-title="字体大小"') +
        optionRow('pref-list', '✏️', '字体粗细', labelOf(FONT_WEIGHT_OPTIONS, p.fontWeight), ' data-key="fontWeight" data-title="字体粗细"') +
        optionRow('pref-list', '✨', '界面颜色', labelOf(THEME_OPTIONS, p.theme), ' data-key="theme" data-title="界面颜色"') +
        optionRow('pref-list', '🌐', '语言', labelOf(LANG_OPTIONS, p.language), ' data-key="language" data-title="语言"') +
      '</div>' +
      '<div class="me-card"><div class="me-card-title">功能设置<span>⌃</span></div>' +
        toggle('elder', '🧓', '老年模式', '超大字体 · 高对比 · 简化功能') +
        toggle('notification', '🔔', '消息通知', '接收提醒与聊天消息') +
        optionRow('edit-time', '🕘', '通知时间', (p.notifyTime || '09:00') + ' · 到期与临期提醒') +
        toggle('sound', '🔔', '提示音', '查找标签时播放声音') +
        toggle('security', '🛡️', '账号安全', '登录验证与密码保护') +
        optionRow('go-password', '🔒', '修改密码', '更新登录密码') +
        optionRow('go-tutorial', '📖', '使用指南', '操作步骤与颜色说明') +
      '</div>' +
      '<div class="me-card me-version" data-action="show-version"><span class="me-icon">📄</span><div class="me-row-main"><div class="me-row-title">版本与更新</div><div class="me-row-sub">查看历史更新内容</div></div><span class="me-badge">v' + APP_VERSION + '</span><span class="me-arrow">›</span></div>' +
      '<div class="me-foot">注册于 2026-11-19 · 已收纳 ' + count + ' 件物品</div>' +
      '<button class="me-logout" data-action="logout-hint">退出登录</button>' +
      '<input type="file" id="profile-image-file" accept="image/*" style="display:none">' +
    '</div>';
  }

  /* ---------------- 新手教程 ---------------- */
  function tutorialHTML() {
    var steps = [
      { icon: '📦', title: '记录物品', body: '点击底部绿色加号，填写名称、分类、日期和数量，保存后物品会出现在首页。' },
      { icon: '📂', title: '分类整理', body: '打开左侧「寻迹」，可以按状态或物品分类筛选，也能在分类页添加自定义分类。' },
      { icon: '📶', title: '设备联动', body: '在联动页查看位置和设备，可自定义小动物图标，并用高德地图打开位置。' },
      { icon: '🔔', title: '到期提醒', body: '在「我的 → 功能设置」里开启通知并选择提醒时间，到期和临期物品会更醒目。' }
    ];
    var i = Math.min(state.tutorialStep, steps.length - 1);
    var s = steps[i];
    return '<div class="page tutorial-page">' +
      '<div class="tutorial-progress">' + steps.map(function (_, n) {
        return '<span class="' + (n <= i ? 'on' : '') + '"></span>';
      }).join('') + '</div>' +
      '<div class="tutorial-card"><div class="tutorial-icon">' + s.icon + '</div><div class="tutorial-title">' + s.title + '</div><p>' + s.body + '</p></div>' +
      '<button class="btn btn-primary" data-action="tutorial-next">' + (i === steps.length - 1 ? '开始使用' : '下一步') + '</button>' +
    '</div>';
  }

  /* ---------------- 修改密码 ---------------- */
  function passwordHTML() {
    return '<div class="page">' +
      '<div class="form-group">' +
        '<div class="form-row"><div class="form-label">原密码</div><input class="form-input" id="pw-old" type="password" placeholder="请输入原密码"></div>' +
        '<div class="form-row"><div class="form-label">新密码</div><input class="form-input" id="pw-new" type="password" placeholder="请输入新密码"></div>' +
        '<div class="form-row"><div class="form-label">确认密码</div><input class="form-input" id="pw-confirm" type="password" placeholder="请再次输入新密码"></div>' +
      '</div>' +
      '<div class="form-actions"><button class="btn btn-primary" data-action="save-password">保存</button></div>' +
    '</div>';
  }

  /* ---------------- 成就等级 ---------------- */
  function achievementHTML() {
    var level = getLevel();
    var count = getItems().filter(function (it) { return !it.trashed; }).length;
    var next = ACHIEVEMENT_LEVELS.filter(function (l) { return l.need > count; })[0];
    var percent = next ? Math.min(100, Math.round(count / next.need * 100)) : 100;
    var frames = ACHIEVEMENT_LEVELS.map(function (l) {
      var unlocked = count >= l.need;
      return '<button class="frame-card' + (state.pref.frame === l.frame ? ' active' : '') + (unlocked ? '' : ' locked') + '" data-action="set-frame" data-frame="' + escapeHTML(l.frame) + '"' + (unlocked ? '' : ' disabled') + '>' +
        '<span class="frame-preview frame-' + l.level + '">我</span><span>' + l.frame + '</span>' +
        (unlocked ? '' : '<small>Lv.' + l.level + ' 解锁</small>') + '</button>';
    }).join('');
    return '<div class="page achievement-page">' +
      '<div class="achievement-hero"><div class="frame-preview frame-' + level.level + '">我</div>' +
        '<div class="achievement-name">第 ' + level.level + ' 级 · ' + level.name + '</div>' +
        '<div class="muted small">已收纳 ' + count + ' 件物品</div>' +
        '<div class="progress"><i style="width:' + percent + '%"></i></div>' +
        '<div class="muted small">' + (next ? '距离下一级还需 ' + (next.need - count) + ' 件' : '已达最高等级') + '</div></div>' +
      '<div class="section-title">装扮管理<span class="muted small">头像框与卡面</span></div>' +
      '<div class="frame-grid">' + frames + '</div>' +
    '</div>';
  }

  /* ---------------- 隐藏注册页（#register 访问） ---------------- */
  function registerHTML() {
    return '<div class="page">' +
      '<div class="form-group">' +
        '<div class="form-row"><div class="form-label">账号</div><input class="form-input" id="reg-user" placeholder="请输入账号"></div>' +
        '<div class="form-row"><div class="form-label">密码</div><input class="form-input" id="reg-pass" type="password" placeholder="请输入密码"></div>' +
        '<div class="form-row"><div class="form-label">确认密码</div><input class="form-input" id="reg-pass2" type="password" placeholder="请再次输入密码"></div>' +
      '</div>' +
      '<div class="form-actions"><button class="btn btn-primary" data-action="register-submit">注册</button></div>' +
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

  /* ---------------- 联动页 ---------------- */
  function linkHTML() {
    var expanded = state.link.mapExpanded;
    var abilities = [
      { icon: '🔔', title: '一键查找', body: 'App 呼叫标签，标签发声发光，按信号强弱找到物品。' },
      { icon: '🏠', title: '离位提醒', body: '物品离开设定区域时自动提醒，防止遗忘或丢失。' },
      { icon: '📅', title: '自动记录收纳', body: '标签回到收纳区域时，自动更新收纳时间。' },
      { icon: '🔋', title: '低电量提醒', body: '标签电量不足时提示更换，避免关键时刻失联。' }
    ];
    return '<div class="page link-page">' +
      '<div class="link-card">' +
        '<div class="link-card-head"><div><div class="bold">我的实时位置</div><div class="muted small">6栋学生宿舍 · 2层 · 101</div></div>' +
          '<button class="map-toggle" data-action="toggle-map">' + (expanded ? '收起地图 ›' : '下拉展开地图 ›') + '</button></div>' +
        '<div class="map-box' + (expanded ? ' expanded' : '') + '">' +
          '<div class="map-blob blob-a"></div><div class="map-blob blob-b"></div><div class="map-blob blob-c"></div>' +
          '<div class="map-road road-a"></div><div class="map-road road-b"></div>' +
          '<div class="map-pin"></div><div class="map-bubble">你在这里</div>' +
        '</div>' +
        '<div class="map-address">6栋学生宿舍 · 2层 · 101</div>' +
        '<div class="map-actions">' +
          '<button class="map-primary" data-action="open-amap"><span>📍</span> 用高德地图打开</button>' +
          '<button class="map-ghost" data-action="map-plan">地图方案</button>' +
        '</div>' +
      '</div>' +
      '<div class="section-title">设备<button class="add-device" data-action="add-device-hint">＋ 添加设备</button></div>' +
      '<div class="link-card device-card">' +
        '<div class="device-top"><div class="device-icon" data-action="pick-device-icon">' + escapeHTML(state.link.icon || '🐱') + '</div><div class="device-main"><div class="bold">收纳箱 A 标签</div><div class="muted small">尚未绑定物品 · 储物间 · 未连接</div></div><span class="online">在线</span></div>' +
        '<div class="device-stats"><div><span>电量 82%</span><div class="battery"><i></i></div></div>' +
          '<div><span>信号强度</span><div class="signal"><i></i><i></i><i></i></div></div></div>' +
        '<div class="device-actions">' +
          '<button data-action="device-hint" data-name="播放声音">播放声音</button>' +
          '<button data-action="pick-device-icon">自定义标签</button>' +
          '<button data-action="device-hint" data-name="绑定物品">绑定物品</button>' +
          '<button data-action="device-hint" data-name="离位提醒">离位提醒<br>开</button>' +
        '</div>' +
      '</div>' +
      '<div class="section-title">联动能力<span class="muted small">设备 + App</span></div>' +
      '<div class="ability-grid">' + abilities.map(function (a) {
        return '<div class="ability-card"><div class="ability-icon">' + a.icon + '</div><div class="bold">' + a.title + '</div><p>' + a.body + '</p></div>';
      }).join('') + '</div>' +
      '<div class="link-card"><div class="bold">设备联动说明</div>' +
        '<p class="desc">当前为交互演示：标签状态在 App 内模拟。开启蓝牙后可搜索附近标签并模拟连接；接入真实硬件时，标签通过蓝牙广播 ID 与信号强度，App 接收后实现查找、离位判定与自动记录。</p>' +
        '<button class="wide-ghost" data-action="map-plan">查看真实中国地图接入方案</button>' +
      '</div>' +
    '</div>';
  }

  /* ---------------- 分类管理 ---------------- */
  function categoryManageHTML() {
    var items = getItems().filter(function (it) { return !it.trashed; });
    function letterOf(f) { return CATEGORY_LETTERS[f] || f.charAt(0).toUpperCase(); }
    var sorted = state.folders.slice().sort(function (a, b) { return letterOf(a).localeCompare(letterOf(b)); });
    var rows = sorted.map(function (f, i) {
      var cnt = items.filter(function (it) { return it.folder === f; }).length;
      return '<div class="category-row" data-action="set-category" data-cat="' + escapeHTML(f) + '">' +
        '<span class="cat-letter">' + letterOf(f) + '</span>' +
        '<span class="cat-dot" style="background:' + CATEGORY_COLORS[i % CATEGORY_COLORS.length] + '"></span>' +
        '<span class="cat-name">' + escapeHTML(f) + '</span>' +
        '<span class="cat-count">' + cnt + ' 件</span><span class="me-arrow">›</span></div>';
    }).join('');
    var letters = sorted.map(letterOf).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
    return '<div class="page category-page">' +
      '<div class="section-title">物品分类<span class="muted small">按字母排序</span></div>' +
      '<div class="category-list">' + rows + '</div>' +
      '<div class="alpha-index">' + letters.map(function (l) { return '<span>' + l + '</span>'; }).join('') + '</div>' +
      '<div class="category-add"><input id="new-folder-input" placeholder="输入自定义分类名"><button data-action="add-folder">添加</button></div>' +
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
        '<div class="link-row"><span>数量</span><span>' + (it.quantity || 1) + ' ' + escapeHTML(it.unit || '件') + '</span></div>' +
        '<div class="link-row"><span>分类</span><span>' + escapeHTML(it.folder || '—') + '</span></div>' +
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
  function calendarPickerHTML(o) {
    var value = o.value || todayStr();
    var month = (o.month && !isNaN(o.month.getTime())) ? o.month : new Date(value + 'T00:00:00');
    var y = month.getFullYear();
    var mo = month.getMonth();
    var days = new Date(y, mo + 1, 0).getDate();
    var start = (new Date(y, mo, 1).getDay() + 6) % 7;
    var title = value ? (mo + 1) + '月' + Number(value.split('-')[2]) + '日 ' + weekdayCN(value) : '请选择日期';
    var cells = ['一', '二', '三', '四', '五', '六', '日'].map(function (w) {
      return '<div class="date-week">' + w + '</div>';
    }).join('');
    for (var i = 0; i < start; i++) cells += '<div class="date-cell"></div>';
    for (var d = 1; d <= days; d++) {
      var ds = y + '-' + pad(mo + 1) + '-' + pad(d);
      cells += '<div class="date-cell' + (ds === value ? ' selected' : '') + '" data-action="date-select-day" data-date="' + ds + '">' + d + '</div>';
    }
    return '<div class="date-picker">' +
      '<div class="date-picker-head"><div class="date-year">' + y + '年</div><div class="date-title">' + title + '</div></div>' +
      '<div class="date-month"><button data-action="date-prev">‹</button><span>' + y + '年' + (mo + 1) + '月</span><button data-action="date-next">›</button></div>' +
      '<div class="date-grid">' + cells + '</div>' +
      '<div class="date-picker-foot"><button data-action="clear-date">清除</button><button data-action="cancel-date">取消</button><button data-action="confirm-date">设置</button></div>' +
    '</div>';
  }
  function overlayHTML() {
    var o = state.overlay;
    if (!o) return '';
    if (o.type === 'date') {
      return '<div class="sheet-mask show" data-action="cancel-date"></div>' +
        '<div class="sheet show date-sheet">' + calendarPickerHTML(o) + '</div>';
    }
    if (o.type === 'input') {
      return sheetShell(o.title || '编辑',
        '<div class="input-sheet"><input id="me-input" value="' + escapeHTML(o.value || '') + '" placeholder="' + escapeHTML(o.title || '') + '">' +
        '<button class="btn btn-primary" data-action="save-profile-input">保存</button></div>');
    }
    if (o.type === 'time') {
      return sheetShell(o.title || '通知时间',
        '<div class="input-sheet"><input id="me-time" type="time" value="' + escapeHTML(o.value || '09:00') + '">' +
        '<button class="btn btn-primary" data-action="save-notify-time">保存</button></div>');
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
    if (root) { root.innerHTML = overlayHTML(); applyI18n(root); }
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
    var location = $('#f-location'); if (location) d.location = location.value;
    var note = $('#f-note'); if (note) d.note = note.value;
    var cat = $('#f-folder-inline'); if (cat) d.folder = cat.value;
    var unit = $('#f-unit-inline'); if (unit) d.unit = unit.value;
    var reminder = $('#f-reminder-inline'); if (reminder) d.reminder = reminder.value;
  }
  function blankDraft(keep) {
    var old = state.formDraft || {};
    return {
      name: '', expiry: '', production: '', reminder: 7, quantity: 1,
      unit: keep && old.unit ? old.unit : '件',
      folder: keep && old.folder ? old.folder : (state.folders[0] || '食品'),
      location: '', note: '', emoji: randomAnimal(), opened: false, images: []
    };
  }
  function openForm(id) {
    state.editingId = id || null;
    var it = id ? findItem(id) : null;
    state.formDraft = it ? Object.assign({}, it) : blankDraft(false);
    if (state.formDraft && !state.formDraft.images) {
      state.formDraft.images = state.formDraft.image ? [state.formDraft.image] : [];
    }
    if (state.formDraft && !state.formDraft.unit) state.formDraft.unit = '件';
    state.view = 'form';
    state.sheet = null;
    state.overlay = null;
    state.sidebarOpen = false;
    render();
  }
  function saveForm() {
    syncFormDraft();
    var d = state.formDraft || {};
    var name = String(d.name || '').trim();
    if (!name) { toast('请输入物品名称'); return; }
    var category = String(d.folder || '').trim() || state.folders[0] || '食品';
    if (d.categoryCustom && category && state.folders.indexOf(category) < 0) {
      state.folders.push(category);
      saveFolders();
    }
    var item = {
      id: state.editingId || uid(),
      name: name,
      emoji: d.emoji || randomAnimal(),
      images: (d.images || []).slice(),
      image: (d.images && d.images[0]) || d.image || '',
      expiry: d.expiry || '',
      production: d.production || '',
      reminder: Math.max(0, Number(d.reminder) || 0),
      quantity: Math.max(1, Number(d.quantity) || 1),
      unit: String(d.unit || '').trim() || '件',
      folder: category,
      location: d.location || '',
      note: d.note || '',
      opened: !!d.opened,
      createdAt: d.createdAt || Date.now(),
      trashed: !!d.trashed
    };
    upsertItem(item);
    state.editingId = null;
    state.formDraft = null;
    state.view = 'home';
    state.category = 'all';
    state.multiSelect = false;
    state.selectedIds = [];
    render();
    toast('已保存');
  }
  function readImages(files) {
    var arr = Array.prototype.slice.call(files || []).filter(function (f) { return /^image\//.test(f.type); });
    if (!arr.length) return;
    var images = state.formDraft && state.formDraft.images ? state.formDraft.images.slice() : [];
    var total = 0;
    arr.forEach(function (file) {
      var reader = new FileReader();
      reader.onload = function () {
        images.push(String(reader.result));
        total++;
        if (total === arr.length) {
          syncFormDraft();
          state.formDraft.images = images;
          render();
          toast('已添加 ' + total + ' 张图片');
        }
      };
      reader.readAsDataURL(file);
    });
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
    var db = loadDB();
    db.items.forEach(function (it) { if (it.folder === folder) it.folder = '其他'; });
    saveDB(db);
    state.folders = state.folders.filter(function (f) { return f !== folder; });
    saveFolders();
    if (state.category === folder) state.category = 'all';
    render();
    toast('已删除，物品已移入其他');
  }
  function setPref(key, value) {
    if (value === 'true' || value === 'false') state.pref[key] = value === 'true';
    else state.pref[key] = value;
    savePref();
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
  function startVoiceSearch() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast('当前浏览器不支持语音搜索'); return; }
    var recognition = new SR();
    recognition.lang = currentLang() === 'en' ? 'en-US' : (currentLang() === 'zh-TW' ? 'zh-TW' : 'zh-CN');
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    state.recognizing = true;
    render();
    recognition.onresult = function (e) {
      var text = e.results && e.results[0] && e.results[0][0] ? e.results[0][0].transcript : '';
      if (text) { state.searchQuery = text; pushSearchHistory(text); }
      state.recognizing = false;
      render();
    };
    recognition.onerror = function () {
      state.recognizing = false;
      render();
      toast('语音识别失败，请重试');
    };
    recognition.onend = function () {
      state.recognizing = false;
      render();
    };
    try { recognition.start(); } catch (e) { state.recognizing = false; render(); toast('无法启动语音识别'); }
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
      case 'voice-search': startVoiceSearch(); break;
      case 'notification-hint': toast('通知提醒在本机版为演示'); break;
      case 'open-sort-sheet': state.sheet = 'sort'; renderSheet(); break;
      case 'set-sort': state.sortRule = key; state.sheet = null; render(); break;
      case 'enter-multiselect': enterMultiSelect(); break;
      case 'exit-multiselect': exitMultiSelect(); break;
      case 'toggle-select': toggleSelect(id); break;
      case 'select-all': selectAll(); break;
      case 'delete-selected': deleteSelected(); break;
      case 'set-category': setCategory(el.getAttribute('data-cat')); break;
      case 'open-prefs': case 'go-prefs': openView('prefs'); break;
      case 'go-me': openView('me'); break;
      case 'go-link': openView('link'); break;
      case 'go-tutorial': state.tutorialStep = 0; openView('tutorial'); break;
      case 'go-password': openView('password'); break;
      case 'go-achievement': openView('achievement'); break;
      case 'edit-profile':
        state.overlay = { type: 'input', title: el.getAttribute('data-title'), field: el.getAttribute('data-key'), value: el.getAttribute('data-value') || '' };
        renderOverlay(); break;
      case 'pick-avatar': var avatarInput = $('#profile-image-file'); if (avatarInput) avatarInput.click(); break;
      case 'pref-list':
        var pkey = el.getAttribute('data-key');
        var popts = pkey === 'fontSize' ? FONT_SIZE_OPTIONS : pkey === 'fontWeight' ? FONT_WEIGHT_OPTIONS : pkey === 'theme' ? THEME_OPTIONS : LANG_OPTIONS;
        openList(el.getAttribute('data-title') || '请选择', 'pref:' + pkey, popts, state.pref[pkey]);
        break;
      case 'edit-time':
        state.overlay = { type: 'time', title: '通知时间', value: state.pref.notifyTime || '09:00' };
        renderOverlay(); break;
      case 'pick-device-icon':
        openList('选择图标', 'deviceIcon', ANIMAL_ICONS.map(function (a) {
          return { value: a, label: a };
        }), state.link.icon);
        break;
      case 'go-trash': setCategory('trash'); break;
      case 'manage-categories': openView('categoryManage'); break;
      case 'add-new': openForm(null); break;
      case 'cancel-form':
        syncFormDraft();
        state.editingId = null; state.formDraft = null; state.view = 'home'; render(); break;
      case 'close-sheet': state.sheet = null; renderSheet(); break;
      case 'toggle-map': state.link.mapExpanded = !state.link.mapExpanded; render(); break;
      case 'open-amap':
        var amap = 'https://uri.amap.com/marker?position=116.397428,39.90923&name=' +
          encodeURIComponent('6栋学生宿舍 · 2层 · 101') + '&src=organizer&callnative=1';
        if (typeof window !== 'undefined' && window.location) window.location.href = amap;
        break;
      case 'map-plan':
        openInfo('地图方案', '当前使用高德地图 URI 直接唤起本机高德 App；未安装时自动回退到网页版。本机版无需申请 Key。');
        break;
      case 'add-device-hint': toast('添加设备在本机版为演示'); break;
      case 'device-hint': toast((el.getAttribute('data-name') || '该功能') + '在本机版为演示'); break;
      case 'me-info': openInfo(el.getAttribute('data-title') || '提示', el.getAttribute('data-body') || ''); break;
      case 'toggle-me-setting':
        state.pref.meSettings[key] = !state.pref.meSettings[key];
        if (key === 'elder') state.pref.fontSize = state.pref.meSettings.elder ? 'elder' : 'standard';
        savePref(); render(); break;
      case 'logout-hint': toast('本机版无需登录'); break;
      case 'save-profile-input':
        var inp = $('#me-input');
        var field = state.overlay ? state.overlay.field : null;
        if (inp && field) { state.pref[field] = inp.value; savePref(); }
        state.overlay = null; render(); toast('已保存'); break;
      case 'save-notify-time':
        var timeInput = $('#me-time');
        if (timeInput && timeInput.value) { state.pref.notifyTime = timeInput.value; savePref(); }
        state.overlay = null; render(); toast('已保存'); break;
      case 'save-password':
        var oldPw = $('#pw-old'), newPw = $('#pw-new'), confirmPw = $('#pw-confirm');
        if (!oldPw || !newPw || !confirmPw || !newPw.value) { toast('请填写新密码'); break; }
        if (newPw.value !== confirmPw.value) { toast('两次新密码不一致'); break; }
        toast('密码已更新'); state.view = 'me'; render(); break;
      case 'tutorial-next':
        if (state.tutorialStep < 3) { state.tutorialStep++; render(); }
        else { state.view = 'home'; render(); }
        break;
      case 'set-frame':
        state.pref.frame = el.getAttribute('data-frame'); savePref(); render(); toast('卡面已更新'); break;
      case 'register-submit':
        toast('注册信息已保存'); state.view = 'home'; render(); break;
      case 'open-item': openItem(id); break;
      case 'edit-item': editItem(id); break;
      case 'toggle-item-opened': toggleOpened(id); break;
      case 'trash-item': trashItem(id); break;
      case 'delete-item': deleteItem(id); break;
      case 'restore-item': restoreExistingItem(id); break;
      case 'pick-image': var fileInput = $('#f-image-file'); if (fileInput) fileInput.click(); break;
      case 'remove-photo':
        syncFormDraft();
        if (state.formDraft && state.formDraft.images) {
          state.formDraft.images.splice(Number(el.getAttribute('data-index')), 1);
          render();
        }
        break;
      case 'qty-plus':
        syncFormDraft();
        state.formDraft.quantity = Math.max(1, (Number(state.formDraft.quantity) || 1) + 1);
        render(); break;
      case 'qty-minus':
        syncFormDraft();
        state.formDraft.quantity = Math.max(1, (Number(state.formDraft.quantity) || 1) - 1);
        render(); break;
      case 'set-location':
        syncFormDraft();
        state.formDraft.location = el.getAttribute('data-value') || '';
        render(); break;
      case 'pick-date':
        syncFormDraft();
        var field = el.getAttribute('data-field');
        var picked = (state.formDraft || {})[field] || '';
        state.overlay = {
          type: 'date', field: field, value: picked,
          month: picked ? new Date(picked + 'T00:00:00') : new Date()
        };
        renderOverlay();
        break;
      case 'date-prev':
        if (state.overlay && state.overlay.month) {
          state.overlay.month = new Date(state.overlay.month.getFullYear(), state.overlay.month.getMonth() - 1, 1);
          renderOverlay();
        }
        break;
      case 'date-next':
        if (state.overlay && state.overlay.month) {
          state.overlay.month = new Date(state.overlay.month.getFullYear(), state.overlay.month.getMonth() + 1, 1);
          renderOverlay();
        }
        break;
      case 'date-select-day':
        if (state.overlay) { state.overlay.value = el.getAttribute('data-date'); renderOverlay(); }
        break;
      case 'cancel-date': state.overlay = null; renderOverlay(); break;
      case 'clear-date':
        syncFormDraft();
        if (state.formDraft && state.overlay) state.formDraft[state.overlay.field] = '';
        state.overlay = null; render(); break;
      case 'confirm-date':
        syncFormDraft();
        if (state.formDraft && state.overlay) state.formDraft[state.overlay.field] = state.overlay.value || '';
        state.overlay = null; render(); break;
      case 'pick-reminder':
        syncFormDraft();
        var reminderOpts = [0, 1, 2, 3, 7, 15, 30].map(function (n) {
          return { value: n, label: n === 0 ? '到期当天' : n + ' 天前' };
        }).concat([{ value: '自定义', label: '自定义天数' }]);
        openList('过期提醒', 'reminder', reminderOpts, state.formDraft.reminderCustom ? '自定义' : state.formDraft.reminder);
        break;
      case 'pick-category':
        syncFormDraft();
        openList('选择分类', 'folder', state.folders.concat(['自定义分类']).map(function (f) {
          return { value: f, label: f };
        }), state.formDraft.categoryCustom ? '自定义分类' : state.formDraft.folder);
        break;
      case 'pick-unit':
        syncFormDraft();
        openList('选择单位', 'unit', UNITS.map(function (u) {
          return { value: u, label: u };
        }), state.formDraft.unitCustom ? '自定义' : state.formDraft.unit);
        break;
      case 'pick-option':
        if (key && key.indexOf('pref:') === 0) {
          var prefKey = key.slice(5);
          state.pref[prefKey] = value;
          if (prefKey === 'fontSize') state.pref.meSettings.elder = value === 'elder';
          savePref(); applyTheme(); state.overlay = null; render(); break;
        }
        if (key === 'deviceIcon') {
          state.link.icon = value; state.overlay = null; render(); break;
        }
        syncFormDraft();
        if (key === 'folder' && value === '自定义分类') {
          state.formDraft.categoryCustom = true; state.formDraft.folder = '';
        } else if (key === 'folder') {
          state.formDraft.categoryCustom = false; state.formDraft.folder = value;
        } else if (key === 'unit' && value === '自定义') {
          state.formDraft.unitCustom = true; state.formDraft.unit = '';
        } else if (key === 'unit') {
          state.formDraft.unitCustom = false; state.formDraft.unit = value;
        } else if (key === 'reminder' && value === '自定义') {
          state.formDraft.reminderCustom = true; state.formDraft.reminder = '';
        } else if (key === 'reminder') {
          state.formDraft.reminderCustom = false; state.formDraft.reminder = Number(value);
        } else {
          state.formDraft[key] = value;
        }
        state.overlay = null; render(); break;
      case 'save-form': saveForm(); break;
      case 'close-overlay': state.overlay = null; renderOverlay(); break;
      case 'clear-search': state.searchQuery = ''; render(); break;
      case 'clear-search-history': state.searchHistory = []; saveSearchHistory(); render(); toast('已清空搜索历史'); break;
      case 'search-term': state.searchQuery = el.getAttribute('data-term') || el.textContent; state.searchFocused = true; render(); break;
      case 'set-pref': setPref(key, value); render(); break;
      case 'toggle-pref': setPref(key, !state.pref[key]); render(); break;
      case 'add-folder': addFolder(); break;
      case 'delete-folder': deleteFolder(el.getAttribute('data-folder')); break;
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
      if (e.target && e.target.id === 'f-image-file') readImages(e.target.files);
      if (e.target && e.target.id === 'profile-image-file' && e.target.files && e.target.files[0]) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function () {
          state.pref.avatar = String(reader.result);
          savePref(); render(); toast('头像已更新');
        };
        reader.readAsDataURL(file);
      }
    });
    document.addEventListener('focusin', function (e) {
      if (document.body && e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) document.body.classList.add('keyboard-open');
    });
    document.addEventListener('focusout', function () {
      setTimeout(function () {
        if (!document.body || !document.activeElement || !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
          document.body.classList.remove('keyboard-open');
        }
      }, 120);
    });
  }

  /* ---------------- 启动 ---------------- */
  function init() {
    var db = loadDB();
    state.pref = loadPref();
    var extras = Array.isArray(db.folders)
      ? db.folders.filter(function (f) { return DEFAULT_CATEGORIES.indexOf(f) < 0 && f !== '通用'; })
      : [];
    state.folders = DEFAULT_CATEGORIES.concat(extras.filter(function (f, i, a) { return a.indexOf(f) === i; }));
    if (JSON.stringify(db.folders || []) !== JSON.stringify(state.folders)) {
      db.folders = state.folders.slice();
      saveDB(db);
    }
    state.searchHistory = loadSearchHistory();
    if (typeof window !== 'undefined' && window.location && window.location.hash === '#register') state.view = 'register';
    bindEvents();
    applyTheme();
    render();
  }

  init();
})();
