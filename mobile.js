(function () {
  'use strict';

  const DB_KEY = 'organizer_db_v1';
  const APP_VERSION = '1.17';
  const CHANGELOG = [
    { version: '1.17', date: '2026-11-21', title: '全量英文翻译 / 相机式裁剪 / 好友设备重构', sections: [
      { label: '问题修复', icon: 'bug', items: [
        '英文模式改为渲染时翻译 + 补全词典，界面、状态、分类、物品名与提示语全量英文，不再出现半中半英',
        '裁剪改为相机式：固定取景框，直接拖动照片选区域，支持双指缩放与旋转，可自由上下左右移动',
        '任意好友编号都能添加（本地无云端目录时创建占位好友），不再因查不到 ID 而失败',
        '分类点选后自动滚动到对应物品；定位全国范围用真实经纬度，不再默认湖北美术学院',
        '苹果端页面用 dvh 撑满全屏贴底，去除底部空白；添加物品页顶部镂空修复',
        '老年模式彻底黑白去色、图标不再遮挡文字；字号放大后文字自动换行不被截断'
      ] },
      { label: '全新功能', icon: 'sparkle', items: [
        '好友备注移入聊天页左上角三点菜单；分组与排序移到消息聊天页，添加好友页更简洁',
        '设备联动新增「添加绑定设备」流程：命名物品、选图标、设区域，图标点阵可选'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '示意地图改为高德蓝绿配色，不再灰黄',
        '设备联动字体与功能中心统一、左侧图标对齐、名称加深',
        '非食品 / 药品物品不再显示「建议补货」'
      ] }
    ] },
    { version: '1.16', date: '2026-11-21', title: '自由裁剪 / 好友群聊 / 黑白老年模式', sections: [
      { label: '全新功能', icon: 'sparkle', items: [
        '裁剪照片改为自由拖动边框、四角调整范围，不放大整图，自由度更高',
        '好友页新增分组筛选、A-Z 排序、好友备注与分组管理',
        '群聊支持邀请多位好友进群、群改名、搜群号加群与群成员管理',
        '添加物品分类扩充，并支持自定义分类',
        '语言设置翻译覆盖全部文字、提示语与输入占位符'
      ] },
      { label: '问题修复', icon: 'bug', items: [
        '添加物品固定头改为整块实体，滚动不再透出文字，必填提示行同步固定清晰',
        '成功提示改为屏幕下方横条，显示时间更长',
        '日期月份翻页不再跳动，选择后停留在录入页',
        '物品自动配图改为单色底 + 图案，去掉白框与绿框双层',
        '加好友页去除重复按钮，设备联动布局与字体统一、绑定设备置顶'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '首页顶部统计区压缩，我的物品占据主要屏幕',
        '老年模式改为黑白配色、白底黑字，小字不再加粗',
        '地图统一高德蓝绿配色，设备页右上角新增添加物品'
      ] }
    ] },
    { version: '1.15', date: '2026-11-21', title: '真实裁剪 / 高清拍照 / 全国定位', sections: [
      { label: '全新功能', icon: 'sparkle', items: [
        '裁剪照片改为用户手动拖动、旋转、缩放，不再是固定居中裁剪',
        '拍照输出提升至最高 1800px、JPEG 0.92 质量，照片更清晰',
        '定位改为跟随手机当前位置，不再限制在湖北美术学院范围',
        '语言设置扩展为整句 + 词组翻译，覆盖范围更大'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        'AI 识别改为整图分析名称与分类，不再把照片拆成多个局部图',
        '日期选择器改为独立弹层，选择不跳变、确定后回到录入表单',
        '录入页顶部关闭 / 保存栏固定，滚动时始终可见',
        '到期提醒、消息聊天、社区动态等小标题字重恢复正常',
        '搜索框改细，分类点击增加反馈，设置中成就等级移到个性签名下方',
        '设备联动标题去掉返回箭头'
      ] }
    ] },
    { version: '1.14', date: '2026-11-20', title: '搜索常驻 / 排版优化 / 系统相机 / 语言切换', sections: [
      { label: '全新功能', icon: 'sparkle', items: [
        '我的物品折叠后搜索栏保持显示，可随时搜索',
        '通知时间改为任意时间设置，不再限定固定档位',
        '新增语言设置，支持跟随系统、简体中文、繁體中文和英文',
        '拍照直接进入系统相机，拍完可直接使用、居中裁剪、重拍或退出'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '首页「我的收纳」与「功能中心」标题进一步加粗，添加物品与到期优先统一绿色',
        '录入页数量单位选择器加宽、箭头改为主题绿，选中文字清晰可见',
        '为感冒药、收纳盒等常见物品补充内置矢量产品图，无实拍图时也能直观识别',
        '字体改为常规 / 标准（半粗）/ 加粗三档，超大字号下文字不再溢出方框',
        '联动页改为高德地图风格配色，关闭按钮与聊天页按钮对齐',
        '使用指南与新手教程同步为 7 步，教程改为居中步骤卡片样式'
      ] }
    ] },
    { version: '1.13', date: '2026-11-20', title: '多物品识别 / 高对比界面 / 教程升级', sections: [
      { label: '全新功能', icon: 'sparkle', items: [
        'AI 识别支持从一张照片中检测多个物品区域，并分别裁剪出单品照片供逐项选用',
        '物品列表改为左侧配图 + 分类位置小字 + 右侧状态建议，无实拍图时按物品自动匹配配图',
        '录入页数量支持件、盒、瓶等单位及自定义单位，日期选择器跟随主题色',
        '消息通知新增提醒时间设置，可设置到期与临期提醒的具体时间'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '首页「我的收纳」加粗放大，主题主色与辅助色全面加深，界面对比更明显',
        '物品详情放大存放位置照片，过期与低库存状态更醒目',
        '录入页文字加粗放大，关闭按钮移到左上、保存按钮移到右上',
        '新手教程改为按 App 真实页面结构逐步演示重点操作'
      ] }
    ] },
    { version: '1.12', date: '2026-11-20', title: '可读性 / 拍照 / 首页结构大升级', sections: [
      { label: '问题修复', icon: 'bug', items: [
        '修复从功能中心进入到期提醒 / 使用指南后返回首页的问题，现在正确回到功能中心',
        '修复安卓手机按苹果教程无法安装的问题，按系统自动给出对应安装步骤',
        '修复苹果手机底部留白过多、底栏未贴底的问题',
        '修复字体「半粗」与「加粗」看起来一样的问题'
      ] },
      { label: '全新功能', icon: 'sparkle', items: [
        '新增老年模式：超大字体、高对比配色、隐藏次要功能，一键开启',
        '拍照改为直接进入相机界面，内置相册多选；物品照片 / 存放地点照片 / 保质期照片均支持多张且不强制',
        'AI 识别照片后自动填写名称、分类和位置，内容可直接手动修改',
        '聊天点对方头像可进入好友主页；设备联动页顶部新增醒目的高德地图方框，可下拉展开'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '标准字号与按钮整体调大，字号四档同步放大',
        '收纳地图与成就从首页移入功能中心；搜索框归入「我的物品」板块',
        '新用户自动获得 3 件示例物品；A-Z 索引改为右侧竖排，物品卡片收起时只显示名称',
        '保质期日期控件与整体配色统一，全局文字颜色加深更清晰'
      ] }
    ] },
    { version: '1.11', date: '2026-11-20', title: '字体粗细 / 教程 / 设置与评论优化', sections: [
      { label: '问题修复', icon: 'bug', items: [
        '修复字体粗细「半粗」与「加粗」看起来一样的问题，细体 / 标准 / 半粗 / 加粗四档明显区分',
        '修复社区动态点「评论」跳到群聊的问题，改为进入该动态的评论区并可发表评论'
      ] },
      { label: '全新功能', icon: 'sparkle', items: [
        '新手教程按 App 真实页面重做，共 7 步，每一步都列出具体操作',
        '「我的」页面个人信息 / 界面设置 / 功能设置支持点击标题折叠与展开'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '退出登录增加二次确认弹窗，防止误点退出',
        '动态评论按钮显示评论数量'
      ] }
    ] },
    { version: '1.10', date: '2026-11-20', title: '地图定位与加好友入口优化', sections: [
      { label: '问题修复', icon: 'bug', items: [
        '修复高德地图打开后看不到自己位置的问题：新增醒目的蓝色「你在这里」定位点并自动居中放大'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '加好友按钮加大并加文字：聊天页顶部按钮 + 列表横幅，推荐好友一键添加更醒目'
      ] }
    ] },
    { version: '1.09', date: '2026-11-20', title: '苹果手机屏幕适配', sections: [
      { label: '问题修复', icon: 'bug', items: [
        '修复苹果手机发布动态等全屏页面标题被状态栏时间遮挡的问题',
        '修复底部导航栏下方出现白边、没有贴住屏幕边缘的问题'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '全屏页面自动避开刘海与状态栏安全区，底栏与 home 指示区同色衔接'
      ] }
    ] },
    { version: '1.08', date: '2026-11-20', title: '好友系统与地图联动优化', sections: [
      { label: '问题修复', icon: 'bug', items: [
        '修复宿舍房间号：2 层对应 101–124、3 层对应 201–224，与宿舍楼实际楼层一致',
        '修复 iOS 点「用高德打开」报「网址无效」的问题，改用高德官方链接唤起'
      ] },
      { label: '全新功能', icon: 'sparkle', items: [
        '加好友功能真正可用：内置好友目录可搜索 / 一键添加，支持聊天、看资料、删除好友',
        '发现好友列表展示推荐用户，输入 ID 也可直接添加'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '头像框改为圆角矩形，与头像是同一形状',
        '名片改为 QQ 风格的头像背景卡，好友资料中可见'
      ] }
    ] },
    { version: '1.07', date: '2026-11-19', title: '安装修复与成就装扮', sections: [
      { label: '问题修复', icon: 'bug', items: [
        '修复安卓 Chrome「安装应用 / 添加到桌面」无反应的问题：补齐正规图标并支持应用内一键安装',
        '修复收纳地图「添加物品」按钮过大、部分机型布局错乱的问题',
        '修复自定义地图每次勾选都整页闪动的问题',
        '修复苹果手机顶部下拉刷新露出的问题',
        '修复功能中心「收纳地图」跳转到首页的问题，改为弹出地图弹窗',
        '修复查找地图缩放时物品不跟随移动、定位失败的问题'
      ] },
      { label: '全新功能', icon: 'sparkle', items: [
        '成就等级移入功能中心，升级可解锁头像框、名片、徽章等专属装扮',
        '解锁的装扮可佩戴，好友在好友资料中可见',
        '自定义收纳地图可添加自定义地点',
        '功能中心新增「使用指南」「版本与更新」，移除重复的设备联动入口',
        '使用指南每一步增加分步操作示意图'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '安卓定位授权被拦截时给出图文指引，并提供手动选择 / 校园示意位置兜底',
        '全机型按钮尺寸与间距统一适配，触摸目标不小于 44px'
      ] }
    ] },
    { version: '1.06', date: '2026-11-19', title: '高德地图一键联动', sections: [
      { label: '全新功能', icon: 'sparkle', items: [
        '可直接唤起手机上的高德地图 App，系统弹窗询问是否允许打开，无需任何配置',
        '设备联动页、地图方案页新增「用高德地图打开这里」按钮，位置自动带入',
        '未安装高德时自动回退到网页版地图'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '高德 Key 改为进阶选填项，默认使用手机高德 App，不再每次提示配置',
        '网页地图配置一次即自动保存在本机，换设备才需重新填写'
      ] }
    ] },
    { version: '1.05', date: '2026-11-19', title: '权限兼容与地图稳定性', sections: [
      { label: '问题修复', icon: 'bug', items: [
        '更新说明按「问题修复 / 全新功能 / 体验优化」分区展示',
        '修复安卓手机拍照、定位授权弹窗被拦截导致无法打开的问题',
        '修复查找地图中「我的位置」标记会到处飘动的问题'
      ] },
      { label: '全新功能', icon: 'sparkle', items: [
        '支持 PWA 安装：安卓 Chrome 可将 App 添加到桌面并全屏启动',
        '成就系统可点击查看详情，查看各等级与升级进度'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '相机与定位授权失败时给出清晰指引，不再阻断使用',
        '地图「我的位置」固定显示，定位更稳定可靠'
      ] }
    ] },
    { version: '1.04', date: '2026-11-19', title: '资料展示与提醒优化', sections: [
      { label: '问题修复', icon: 'bug', items: [
        '修复字体大小档位：小/标准/大/超大四档清晰区分',
        '修复主题色：极简灰与草绿明显区分'
      ] },
      { label: '全新功能', icon: 'sparkle', items: [
        '「个人备注」改为「个性签名」，加好友后可查看对方签名与资料',
        '使用指南每个步骤增加配图',
        '「需要关注」改为「到期提醒」，临期物品自动预警'
      ] },
      { label: '体验优化', icon: 'heart', items: [
        '精简「我的」页面，移除好友与群聊、设备联动入口'
      ] }
    ] },
    { version: '1.03', date: '2026-11-19', title: '更新提示与机型适配', sections: [
      { label: '问题修复', icon: 'bug', items: [
        '重构底部导航栏布局与视口高度适配，兼容安卓、苹果、刘海屏与曲面屏'
      ] },
      { label: '全新功能', icon: 'sparkle', items: [
        '进入 App 弹出版本更新提示，展示更新摘要，同一版本只弹一次',
        '社区移入功能中心，设备联动调整到底部导航第 4 格'
      ] }
    ] },
    { version: '1.02', date: '2026-11-19', title: '搜索与地图体验优化', sections: [
      { label: '问题修复', icon: 'bug', items: [
        '修复搜索时「已收纳物品」数量变成 0 的问题',
        '修复底部导航栏位置，固定在屏幕最底部'
      ] },
      { label: '全新功能', icon: 'sparkle', items: [
        '搜索时显示「找到 N 件物品」提示并自动定位到结果',
        '收纳地图格子改为独立页面，可查看该位置物品并直接添加'
      ] }
    ] },
    { version: '1.01', date: '2026-11-19', title: '首个正式版本', sections: [
      { label: '全新功能', icon: 'sparkle', items: [
        '新手教程、AI 拍照识物、收纳地图联动、搜索历史与 A-Z 排序',
        '设备联动、微信风格设置页、好友与群聊、组建群聊'
      ] }
    ] }
  ];

  const UNIT_OPTIONS = ['件', '卷', '包', '盒', '瓶', '块', '支', '罐', '袋', '个', '双', '片', '颗', '杯', '桶', '节', '粒', '自定义'];

  function itemImageData(label, bg, fg, shape) {
    const art = {
      carton: '<path d="M82 42h58l18 16v62H82Z" fill="#fff" stroke="' + fg + '" stroke-width="3"/><path d="M140 42v16h18" fill="none" stroke="' + fg + '" stroke-width="3"/><rect x="92" y="74" width="46" height="18" rx="5" fill="' + fg + '" opacity=".16"/>',
      bottle: '<rect x="103" y="34" width="34" height="16" rx="5" fill="' + fg + '"/><path d="M96 50h48l8 66H88Z" fill="#fff" stroke="' + fg + '" stroke-width="3"/><rect x="98" y="76" width="44" height="16" rx="4" fill="' + fg + '" opacity=".18"/>',
      box: '<path d="M72 62h96v66H72Z" fill="#fff" stroke="' + fg + '" stroke-width="3"/><path d="M72 62l18-18h96l-18 18Z" fill="#f2ede5" stroke="' + fg + '" stroke-width="3"/><path d="M168 62l18-18v66l-18 18Z" fill="#e7dfd4" stroke="' + fg + '" stroke-width="3"/><rect x="102" y="88" width="36" height="14" rx="5" fill="' + fg + '" opacity=".18"/>',
      bag: '<path d="M84 58h72l10 70H74Z" fill="#fff" stroke="' + fg + '" stroke-width="3"/><path d="M100 58V44h40v14" fill="none" stroke="' + fg + '" stroke-width="3"/><circle cx="120" cy="92" r="16" fill="' + fg + '" opacity=".18"/>',
      device: '<rect x="80" y="48" width="80" height="64" rx="14" fill="#fff" stroke="' + fg + '" stroke-width="3"/><circle cx="120" cy="80" r="17" fill="' + fg + '" opacity=".2"/><path d="M104 112h32" stroke="' + fg + '" stroke-width="4" stroke-linecap="round"/>',
      fruit: '<circle cx="104" cy="82" r="26" fill="#fff" stroke="' + fg + '" stroke-width="3"/><circle cx="138" cy="82" r="26" fill="#fff" stroke="' + fg + '" stroke-width="3"/><path d="M120 52c2-10 8-14 16-16" fill="none" stroke="' + fg + '" stroke-width="3" stroke-linecap="round"/>',
      cup: '<path d="M92 52h56l-8 74h-40Z" fill="#fff" stroke="' + fg + '" stroke-width="3"/><path d="M148 68h10a12 12 0 0 1 0 24h-12" fill="none" stroke="' + fg + '" stroke-width="3"/><path d="M100 78h40" stroke="' + fg + '" stroke-width="4" opacity=".25"/>',
      cloth: '<path d="M96 52l24 10 24-10 18 22-16 12v40H94V86L78 74Z" fill="#fff" stroke="' + fg + '" stroke-width="3"/><path d="M110 62v62M130 62v62" stroke="' + fg + '" stroke-width="2" opacity=".25"/>',
      doc: '<path d="M88 42h48l18 18v62H88Z" fill="#fff" stroke="' + fg + '" stroke-width="3"/><path d="M136 42v18h18" fill="none" stroke="' + fg + '" stroke-width="3"/><path d="M100 78h42M100 90h42M100 102h28" stroke="' + fg + '" stroke-width="3" opacity=".35"/>'
    };
    const artHTML = (art[shape || 'box'] || art.box).replace(/fill="#fff"/g, 'fill="' + fg + '" fill-opacity=".18"');
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160">' +
      '<rect width="240" height="160" fill="' + bg + '"/>' +
      artHTML +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  const ITEM_IMAGE_RULES = [
    { keys: ['牛奶', '酸奶', '奶酪', 'milk'], label: '牛奶', bg: '#d9eaf2', fg: '#326a8a', shape: 'carton' },
    { keys: ['鸡蛋', '蛋', 'egg'], label: '鸡蛋', bg: '#f6e7c9', fg: '#8a5c22', shape: 'fruit' },
    { keys: ['水果', '苹果', '香蕉', '橙子'], label: '水果', bg: '#e5f0d8', fg: '#557a36', shape: 'fruit' },
    { keys: ['感冒药', '药', '维生素', '胶囊', '药片'], label: '药品', bg: '#f6dfe0', fg: '#a64b52', shape: 'bottle' },
    { keys: ['防晒', '护肤', '化妆', '口红', '面膜'], label: '护肤品', bg: '#eadff1', fg: '#765189', shape: 'bottle' },
    { keys: ['围巾', '衣服', '外套', '袜子', '衣物'], label: '衣物', bg: '#dce6f2', fg: '#3c628a', shape: 'cloth' },
    { keys: ['文件', '合同', '证书', '笔记', '书'], label: '资料', bg: '#e2e8e4', fg: '#4d6658', shape: 'doc' },
    { keys: ['充电', '电池', '数据线', '耳机', '手机', '电脑'], label: '电子', bg: '#d9ebe3', fg: '#2f6c52', shape: 'device' },
    { keys: ['水杯', '杯', '水壶'], label: '水杯', bg: '#d8edf0', fg: '#2d6f79', shape: 'cup' },
    { keys: ['土豆', '零食', '饼干', '薯片'], label: '零食', bg: '#f4e3cf', fg: '#8c5a2b', shape: 'bag' },
    { keys: ['猫砂', '宠物', '猫', '狗'], label: '宠物', bg: '#e8e1d8', fg: '#745b43', shape: 'bag' },
    { keys: ['收纳盒', '盒子', '箱子'], label: '收纳', bg: '#e3e9e2', fg: '#516b59', shape: 'box' }
  ];

  const CATEGORY_IMAGES = {
    food: { label: '食品', bg: '#f6e7d9', fg: '#9a5f33', shape: 'carton' },
    medicine: { label: '药品', bg: '#f6dfe0', fg: '#a64b52', shape: 'bottle' },
    cosmetic: { label: '化妆', bg: '#eadff1', fg: '#765189', shape: 'bottle' },
    clothing: { label: '衣物', bg: '#dce6f2', fg: '#3c628a', shape: 'cloth' },
    document: { label: '文档', bg: '#e2e8e4', fg: '#4d6658', shape: 'doc' },
    electronic: { label: '电子', bg: '#d9ebe3', fg: '#2f6c52', shape: 'device' },
    stationery: { label: '文具', bg: '#ece3d3', fg: '#7a6647', shape: 'doc' },
    keys: { label: '钥匙', bg: '#e6e2d9', fg: '#6f6859', shape: 'device' },
    cleaning: { label: '清洁', bg: '#dcecee', fg: '#3e757e', shape: 'bottle' },
    sports: { label: '运动', bg: '#e3edd9', fg: '#587642', shape: 'bag' },
    baby: { label: '母婴', bg: '#f0dfe5', fg: '#97536a', shape: 'bag' },
    tools: { label: '工具', bg: '#e3e6e9', fg: '#596169', shape: 'box' },
    other: { label: '物品', bg: '#e6e6e2', fg: '#606860', shape: 'box' }
  };

  function autoItemImage(item) {
    const text = String((item && item.name) || '') + ' ' + String((item && item.category) || '');
    const lower = text.toLowerCase();
    const hit = ITEM_IMAGE_RULES.find(function (r) {
      return r.keys.some(function (k) { return lower.indexOf(k) !== -1; });
    });
    if (hit) return itemImageData(hit.label, hit.bg, hit.fg, hit.shape);
    const cat = CATEGORY_IMAGES[item && item.category] || CATEGORY_IMAGES.other;
    return itemImageData(cat.label, cat.bg, cat.fg, cat.shape);
  }

  const DEFAULT_ITEM_IMAGE = autoItemImage({ name: '物品', category: 'other' });

  const CATEGORIES = [
    { key: 'food', label: '食品', color: '#d8a99b' },
    { key: 'medicine', label: '药品', color: '#c98d86' },
    { key: 'cosmetic', label: '化妆品', color: '#bda0bb' },
    { key: 'clothing', label: '衣物', color: '#9db2c9' },
    { key: 'document', label: '文档证件', color: '#a8b1ab' },
    { key: 'electronic', label: '电子产品', color: '#8fae9c' },
    { key: 'stationery', label: '文具书籍', color: '#b7a68d' },
    { key: 'keys', label: '钥匙锁具', color: '#a9a293' },
    { key: 'cleaning', label: '清洁用品', color: '#9ec0c5' },
    { key: 'sports', label: '运动用品', color: '#a4b98d' },
    { key: 'baby', label: '母婴用品', color: '#d3b0b8' },
    { key: 'tools', label: '工具五金', color: '#a8adb3' },
    { key: 'other', label: '其他', color: '#bdb6ac' }
  ];

  const ICON = {
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="M3 7v10l9 5 9-5V7M12 12v10"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5a3.5 3.5 0 0 1 0 7M17.5 14a6.5 6.5 0 0 1 4 6"/></svg>',
    signal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="2"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v17H7.5A2.5 2.5 0 0 0 5 22V5.5Z"/><path d="M9 8h6M9 12h5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h3l1.5-2h7L18 6h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10" width="14" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18M10.6 5.7A9.8 9.8 0 0 1 12 5.5c6.5 0 10 6.5 10 6.5a16 16 0 0 1-3.1 3.9M6.4 6.6A15.7 15.7 0 0 0 2 12s3.5 6.5 10 6.5a9.7 9.7 0 0 0 4.1-.9"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7M21 3v6h-6"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
    homePin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10H3V10Z"/><path d="M9 20v-6h6v6"/></svg>',
    battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 10v4"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM6 6H4v2a3 3 0 0 0 3 3M18 6h2v2a3 3 0 0 1-3 3M12 13v4M9 21h6M10 17h4"/></svg>',
    frame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 4v4a4 4 0 0 0 8 0V4M8 20v-4a4 4 0 0 1 8 0v4"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><circle cx="8" cy="11" r="2"/><path d="M5.5 16a3 3 0 0 1 5 0M14 10h5M14 13h5M14 16h3"/></svg>',
    medal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m7 3 3 6M17 3l-3 6"/><circle cx="12" cy="15" r="6"/><path d="m12 11 1 2.4 2.6.2-2 1.7.6 2.5L12 16.5 9.8 17.8l.6-2.5-2-1.7 2.6-.2L12 11Z"/></svg>',
    install: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    fridge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M5 10h14M8 6v2M8 14v3"/></svg>',
    drawer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 7h6M9 12.5h6M9 17.5h6"/></svg>',
    shelf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 5h18M3 12h18M3 19h18M6 5v7M18 5v7M6 12v7M18 12v7"/></svg>',
    pill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M8 7V4h8v3M8 12h8"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    a_cat: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21 7 8l11 7a16 16 0 0 1 12 0l11-7-2 13"/><path d="M9 21a15 15 0 0 0 30 0"/><circle cx="18.5" cy="24" r="1.7" fill="currentColor" stroke="none"/><circle cx="29.5" cy="24" r="1.7" fill="currentColor" stroke="none"/><path d="m21 29 3 2 3-2"/></svg>',
    a_rabbit: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 21c-4-6-6-14-3-15s6 6 7 12M30 21c4-6 6-14 3-15s-6 6-7 12"/><path d="M24 18c8 0 13 6 13 14 0 7-6 11-13 11s-13-4-13-11c0-8 5-14 13-14Z"/><circle cx="19" cy="30" r="1.6" fill="currentColor" stroke="none"/><circle cx="29" cy="30" r="1.6" fill="currentColor" stroke="none"/><path d="m22 35 2 1 2-1"/></svg>',
    a_bear: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="14" r="5"/><circle cx="35" cy="14" r="5"/><path d="M24 17c9 0 15 6 15 14 0 7-6 11-15 11s-15-4-15-11c0-8 6-14 15-14Z"/><circle cx="18.5" cy="28" r="1.7" fill="currentColor" stroke="none"/><circle cx="29.5" cy="28" r="1.7" fill="currentColor" stroke="none"/><path d="M21 34c1.5 1.5 4.5 1.5 6 0"/></svg>',
    a_fox: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 9 16 18a17 17 0 0 1 16 0l8-9-3 15a15 15 0 0 1-26 0Z"/><circle cx="19" cy="26" r="1.6" fill="currentColor" stroke="none"/><circle cx="29" cy="26" r="1.6" fill="currentColor" stroke="none"/><path d="m21 32 3 2 3-2"/></svg>',
    a_bird: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 29c5-9 13-14 21-13l9-7-3 10c5 4 6 11 2 16-5 7-15 8-22 3-4-3-7-6-7-9Z"/><circle cx="17" cy="27" r="1.7" fill="currentColor" stroke="none"/><path d="m34 24 5 2-5 2"/></svg>',
    a_fish: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 24c7-10 18-12 26-5l9-7v24l-9-7c-8 7-19 5-26-5Z"/><circle cx="14" cy="22" r="1.7" fill="currentColor" stroke="none"/><path d="M25 17c2 4 2 10 0 14"/></svg>'
  };

  const ANIMAL_BY_CATEGORY = {
    food: 'rabbit', medicine: 'bear', cosmetic: 'cat',
    clothing: 'fox', document: 'bird', electronic: 'fish', other: 'cat'
  };

  const MAP_SPOTS = [
    { x: 24, y: 24 }, { x: 68, y: 20 }, { x: 80, y: 52 },
    { x: 34, y: 70 }, { x: 52, y: 45 }, { x: 16, y: 56 },
    { x: 70, y: 78 }, { x: 44, y: 18 }
  ];

  const HIFA_BUILDINGS = [
    { name: '1栋学生宿舍', lat: 30.3901, lng: 114.4170, approx: true },
    { name: '2栋学生宿舍', lat: 30.3898, lng: 114.4172, approx: true },
    { name: '3栋学生宿舍', lat: 30.3895, lng: 114.4174, approx: true },
    { name: '4栋学生宿舍', lat: 30.3888, lng: 114.4170, approx: true },
    { name: '5栋学生宿舍', lat: 30.3886, lng: 114.4168, approx: true },
    { name: '6栋学生宿舍', lat: 30.388313, lng: 114.416902 },
    { name: '7栋学生宿舍', lat: 30.3892, lng: 114.4180, approx: true },
    { name: '8栋学生宿舍', lat: 30.3891, lng: 114.4182, approx: true },
    { name: '9栋学生宿舍', lat: 30.3890, lng: 114.4184, approx: true },
    { name: '10栋学生宿舍', lat: 30.3889, lng: 114.4186, approx: true },
    { name: '11栋学生宿舍', lat: 30.3903, lng: 114.4190, approx: true },
    { name: '12栋学生宿舍', lat: 30.3904, lng: 114.4192, approx: true },
    { name: '13栋学生宿舍', lat: 30.3905, lng: 114.4194, approx: true },
    { name: '14栋学生宿舍', lat: 30.3906, lng: 114.4196, approx: true },
    { name: '15栋学生宿舍', lat: 30.3908, lng: 114.4180, approx: true },
    { name: '16栋学生宿舍', lat: 30.3909, lng: 114.4182, approx: true },
    { name: '17栋学生宿舍', lat: 30.3910, lng: 114.4184, approx: true },
    { name: '18栋学生宿舍', lat: 30.391342, lng: 114.418323 },
    { name: 'A1教学楼', lat: 30.3908, lng: 114.4198, approx: true },
    { name: 'A2教学楼', lat: 30.391404, lng: 114.420087 },
    { name: 'A3教学楼', lat: 30.3918, lng: 114.4205, approx: true },
    { name: 'A4教学楼', lat: 30.392242, lng: 114.421143 },
    { name: 'A5教学楼', lat: 30.3930, lng: 114.4208, approx: true },
    { name: 'A6教学楼', lat: 30.394306, lng: 114.419938 },
    { name: 'A7教学楼', lat: 30.3938, lng: 114.4196, approx: true },
    { name: 'A8教学楼', lat: 30.3945, lng: 114.4188, approx: true },
    { name: 'A9教学楼', lat: 30.3900, lng: 114.4180, approx: true },
    { name: '图书馆', lat: 30.392376, lng: 114.41738 },
    { name: '体育馆', lat: 30.3902, lng: 114.4172, approx: true },
    { name: '食堂', lat: 30.3898, lng: 114.4192, approx: true },
    { name: '陶艺馆', lat: 30.3942, lng: 114.4186, approx: true }
  ];

  const SCHOOLS = [
    {
      name: '湖北美术学院藏龙岛校区', short: '湖美藏龙岛',
      address: '武汉市江夏区藏龙岛科技园栗庙路5号',
      center: { lat: 30.391869, lng: 114.419028 }, radius: 800,
      buildings: HIFA_BUILDINGS
    }
  ];

  const FLOOR_OPTIONS = ['1层', '2层', '3层', '4层', '5层', '6层'];

  function roomsForFloor(buildingName, floor) {
    const f = parseInt(String(floor).replace(/[^0-9]/g, ''), 10) || 1;
    const isDorm = buildingName.indexOf('宿舍') !== -1;
    const isTeaching = /^A\d+教学楼$/.test(buildingName);
    const list = [];
    if (isDorm) {
      if (f === 1) {
        list.push('宿管室', '自习区', '活动室');
        for (let n = 101; n <= 108; n++) list.push('教室' + n);
      } else {
        for (let n = 1; n <= 24; n++) list.push((f - 1) * 100 + n + '');
      }
    } else if (isTeaching) {
      for (let n = 1; n <= 12; n++) list.push(f * 100 + n + '');
      list.push('自习区');
    } else if (buildingName.indexOf('图书馆') !== -1) {
      list.push('大厅', '自习区', '阅览区', '电子阅览室', '藏书区');
    } else {
      list.push('入口', '服务台', '主要区域');
    }
    return list;
  }

  const MAP_SDK_PLAN = [
    { title: '高德地图 JS API 2.0', steps: [
      '在开放平台申请 Web 端（JS API）Key，绑定域名白名单并配置安全密钥 jscode。',
      '引入 https://webapi.amap.com/loader.js，用 AMapLoader.load({ key, version: "2.0", plugins: ["AMap.Geolocation", "AMap.IndoorMap", "AMap.MarkerClusterer"] })。',
      '用 AMap.Geolocation 获取当前坐标（国内为 GCJ-02），设置 map.setCenter 与 zoom；校园范围可用圆形覆盖物做地理围栏。',
      '动物标签用 new AMap.Marker({ icon: new AMap.Icon({ image: 动物 SVG 的 data URL, size: [52, 52] }), position }) 叠加；点击 Marker 联动查找面板。',
      '室内楼层用 AMap.IndoorMap 按 buildingId 切换；房间级定位仍需蓝牙信标 / Wi-Fi RTT 辅助。'
    ] },
    { title: '百度地图 JavaScript API GL', steps: [
      '在百度地图开放平台创建应用，获取 AK，并设置 Referer 白名单。',
      '引入 https://api.map.baidu.com/api?type=webgl&v=3.0&ak=你的AK，再用 new BMapGL.Map("container") 初始化。',
      'BMapGL.Geolocation 获取 WGS-84 坐标，需通过 BMapGL.Convertor 转为 BD-09 后再打点（与高德 GCJ-02 不同源）。',
      '自定义动物图标用 new BMapGL.MarkerIcon(动物 SVG data URL, new BMapGL.Size(52, 52))，点击 Marker 触发一键查找。',
      '室内图使用 BMapGL 室内地图能力并叠加信标坐标，实现楼层 / 房间高亮。'
    ] },
    { title: '本项目接入方式', steps: [
      '保留现有手绘房间地图作为无网络 / 无 Key 时的降级方案；有 Key 时把 .find-map 容器替换为真实地图 div。',
      '弹窗打开后再初始化地图实例，关闭时调用 map.destroy() 清理，避免重复实例与内存泄漏。',
      '先请求定位权限；拒绝或超时则回退到已绑定学校 / 手动选择的校园中心点。',
      '坐标统一在服务端或工具层转换：GPS WGS-84 → GCJ-02（高德）或 BD-09（百度），不要混用。',
      '遵守个人信息保护要求：定位仅用于当前空间检索，明示用途并允许用户关闭。'
    ] }
  ];

  const SPACES = [
    { key: '冰箱', label: '冰箱', icon: 'fridge' },
    { key: '厨房', label: '厨房', icon: 'fridge' },
    { key: '药箱', label: '药箱', icon: 'pill' },
    { key: '抽屉', label: '抽屉', icon: 'drawer' },
    { key: '柜子', label: '柜子', icon: 'drawer' },
    { key: '衣柜', label: '衣柜', icon: 'shelf' },
    { key: '书房', label: '书房', icon: 'shelf' },
    { key: '储物', label: '储物间', icon: 'box' },
    { key: '玄关', label: '玄关', icon: 'homePin' },
    { key: '书桌', label: '书桌', icon: 'drawer' },
    { key: '阳台', label: '阳台', icon: 'homePin' }
  ];

  const DEFAULT_SPACE_KEYS = ['冰箱', '厨房', '药箱', '抽屉', '柜子', '衣柜'];
  const ANIMAL_CHOICES = [
    { key: 'cat', label: '猫咪' }, { key: 'rabbit', label: '兔子' },
    { key: 'bear', label: '小熊' }, { key: 'fox', label: '狐狸' },
    { key: 'bird', label: '小鸟' }, { key: 'fish', label: '小鱼' }
  ];

  const THEMES = [
    { key: 'sage', label: '鼠尾草绿', vars: { '--sage': '#5f8f72', '--sage-deep': '#2f5c43', '--sage-mist': '#cfe3d5', '--cream': '#f6f3ed', '--paper': '#fffdf9', '--clay': '#c46c46', '--clay-mist': '#f2d7c9' } },
    { key: 'ocean', label: '海洋蓝', vars: { '--sage': '#3f83b3', '--sage-deep': '#1d5277', '--sage-mist': '#cfe6f5', '--cream': '#eff6fa', '--paper': '#fbfeff', '--clay': '#4e86b8', '--clay-mist': '#d9e9f6' } },
    { key: 'sunset', label: '暖阳橘', vars: { '--sage': '#c46c46', '--sage-deep': '#93452d', '--sage-mist': '#f3d9c9', '--cream': '#faf1e9', '--paper': '#fffaf5', '--clay': '#b97821', '--clay-mist': '#f5e3bf' } },
    { key: 'lilac', label: '丁香紫', vars: { '--sage': '#8a6bb0', '--sage-deep': '#5f4286', '--sage-mist': '#e2d7f0', '--cream': '#f4f0f8', '--paper': '#fdfaff', '--clay': '#a85f84', '--clay-mist': '#f0dce8' } },
    { key: 'ink', label: '极简灰', vars: { '--sage': '#66707b', '--sage-deep': '#2f3841', '--sage-mist': '#dde2e8', '--cream': '#f1f3f5', '--paper': '#ffffff', '--clay': '#7d6a60', '--clay-mist': '#e6e0dc' } }
  ];

  const AI_KEYWORDS = [
    { keys: ['牛奶', '酸奶', '奶酪', 'milk', 'yogurt', '奶茶'], name: '牛奶', category: 'food', location: '冰箱' },
    { keys: ['鸡蛋', '蛋', 'egg'], name: '鸡蛋', category: 'food', location: '冰箱' },
    { keys: ['苹果', '香蕉', '水果', '橙子', 'apple', 'banana'], name: '水果', category: 'food', location: '冰箱' },
    { keys: ['药', '维生素', '胶囊', '药片', 'medicine', 'pill'], name: '药品', category: 'medicine', location: '药箱' },
    { keys: ['防晒', '口红', '化妆', '护肤', '面膜', 'cosmetic'], name: '护肤品', category: 'cosmetic', location: '抽屉' },
    { keys: ['围巾', '衣服', '外套', '袜子', 'clothing', 'shirt'], name: '衣物', category: 'clothing', location: '衣柜' },
    { keys: ['文件', '合同', '证书', '笔记本', '书', 'document', 'book'], name: '文件资料', category: 'document', location: '书房' },
    { keys: ['充电', '电池', '数据线', '耳机', '手机', '电脑', 'electronic', 'charger'], name: '电子产品', category: 'electronic', location: '书桌' }
  ];

  const EMOJIS = ['😀', '😂', '🥰', '😍', '🤔', '😭', '😴', '😎', '👍', '👏', '🙌', '💪', '❤️', '✨', '🎉', '🔥', '🌸', '🍀', '☕', '🍎', '🐱', '🐰', '🐻', '🦊'];

  const DEFAULT_STICKERS = ['🐱', '🐰', '🐻', '🦊', '🐼', '🐶', '🌷', '⭐', '🍰', '💤'];

  const PRESET_GROUPS = [
    { id: 'g_community', name: '收纳社区群', desc: '和同好交流收纳灵感', avatar: '社' },
    { id: 'g_school', name: '学校群', desc: '同学互助 / 校园生活', avatar: '校' },
    { id: 'g_family', name: '家庭群', desc: '家人共享收纳清单', avatar: '家' }
  ];

  const PY_REPS = '阿八嚓哒妸发旮哈讥咔垃妈拏噢妑七呥扨它穵夕丫帀';
  const PY_LETTERS = 'ABCDEFGHJKLMNOPQRSTWXYZ';

  const DEMO_POSTS = [
    { id: 'p1', name: '收纳达人阿晴', avatar: '晴', tone: 'pink', time: '2 小时前', tag: '收纳技巧', text: '分享一个小技巧：保质期快到的物品放在冰箱最显眼的位置，就不会忘记啦。', likes: 24, photo: '' },
    { id: 'p2', name: '小鹿', avatar: '鹿', tone: 'blue', time: '昨天', tag: '好物分享', text: '最近给重要物品都贴上了定位标签，手机一点就能找到，联动提醒也很实用！', likes: 18, photo: '' },
    { id: 'p3', name: '整理师 Mia', avatar: 'M', tone: '', time: '3 天前', tag: '生活灵感', text: '换季收纳时，给每件物品拍张照存档，之后找起来真的方便很多。', likes: 41, photo: '' }
  ];

  /* 内置好友目录：演示版里可被搜索 / 添加的真实用户，使加好友流程端到端可用 */
  const FRIEND_DIRECTORY = [
    { id: 'd_aqing', friendId: '100001', name: '收纳达人阿晴', signature: '收纳让生活更轻盈～欢迎交流技巧', contact: '', equipped: { frame: 'leaf', card: 'leaf', badge: '' }, itemCount: 12 },
    { id: 'd_xiaolu', friendId: '100002', name: '小鹿', signature: '爱整理，爱生活，爱分享', contact: '', equipped: { frame: 'star', card: '', badge: 'star' }, itemCount: 8 },
    { id: 'd_mia', friendId: '100003', name: '整理师 Mia', signature: '让每件物品都有它该在的位置', contact: '', equipped: { frame: 'galaxy', card: 'galaxy', badge: 'galaxy' }, itemCount: 26 },
    { id: 'd_xiaorou', friendId: '100004', name: '小柔（邻居）', signature: '隔壁的小柔，很高兴认识大家～', contact: '', equipped: { frame: 'sprout', card: '', badge: '' }, itemCount: 3 },
    { id: 'd_ta', friendId: '100005', name: '塔', signature: '编辑个签，展示我的独特态度。', contact: '', equipped: { frame: 'leaf', card: 'leaf', badge: '' }, itemCount: 6 }
  ];

  const CHATS = [
    { id: 'c1', name: '收纳交流群', avatar: '群', tone: '' },
    { id: 'c2', name: '小柔（邻居）', avatar: '柔', tone: 'pink' },
    { id: 'c3', name: '社区助手', avatar: '助', tone: 'blue' }
  ];

  const DEMO_MESSAGES = {
    c1: [
      { from: 'them', name: '阿晴', text: '大家平时怎么记录收纳日期呀？', time: '10:12' },
      { from: 'them', name: '小鹿', text: '我直接用这个 app，拍照加定位标签一步到位', time: '10:15' }
    ],
    c2: [
      { from: 'them', name: '小柔', text: '你家收纳盒在哪买的？好好看', time: '昨天' }
    ],
    c3: [
      { from: 'them', name: '社区助手', text: '你好！有任何收纳问题都可以问我哦～', time: '周一' }
    ]
  };

  const state = {
    view: 'home', search: '', filter: 'all', authTab: 'login',
    communityTab: 'feed', chatId: null, backTo: 'home',
    itemsOpen: true, hubSearch: '', sortBy: 'expiry', letter: '',
    mapExpanded: false, devicesOpen: false, searchExpanded: false,
    settingsPage: '', stickerPanel: '', guideStep: 0, locationKey: '',
    collapsedGroups: {}, commentPostId: null,
    photoDraft: { item: [], location: [], expiry: [] }, photoCategory: 'item',
    aiDetections: [], datePicker: null, photoPending: null, crop: null,
    deviceMapOpen: false, mapZoom: 1, mapPanX: 0, mapPanY: 0,
    friendGroup: '全部', friendSort: 'default', inviteGroupId: '', inviteSelected: []
  };
  let lastView = null;
  let activeStream = null;

  function starterItems(userId) {
    const base = { userId: userId, quantity: 1, photos: { item: [], location: [], expiry: [] },
      createdAt: new Date().toISOString() };
    return [
      Object.assign({}, base, { id: uid(), name: '牛奶', category: 'food', location: '冰箱',
        storedAt: todayStr(), expiryDate: '', notes: '示例物品：点卡片展开可编辑，长按照片可查看大图' }),
      Object.assign({}, base, { id: uid(), name: '常用药品', category: 'medicine', location: '药箱',
        storedAt: todayStr(), expiryDate: '', notes: '示例物品：试试点「一键查找」定位它' }),
      Object.assign({}, base, { id: uid(), name: '收纳盒', category: 'other', location: '柜子',
        storedAt: todayStr(), expiryDate: '', notes: '示例物品：可在「我的物品」里修改或删除' })
    ];
  }

  function defaultDB() {
    return {
      users: [], items: [], session: null,
      posts: DEMO_POSTS.slice(),
      messages: { c1: (DEMO_MESSAGES.c1 || []).slice(), c2: (DEMO_MESSAGES.c2 || []).slice(), c3: (DEMO_MESSAGES.c3 || []).slice() },
      devices: [], spaceKeys: DEFAULT_SPACE_KEYS.slice(), customSpaces: [], locationEnabled: true,
      bluetoothOn: false, stickers: [], chatBgs: {}, customCategories: [], customUnits: [], lastSeenVersion: '', mapMode: 'auto',
      settings: { fontScale: 1.12, fontWeight: 600, theme: 'sage', language: 'system', notify: true, notifyTime: '09:00', sound: true, secure: true, elderMode: false }
    };
  }

  function loadDB() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      const db = raw ? JSON.parse(raw) : defaultDB();
      if (!Array.isArray(db.users)) db.users = [];
      const usedIds = {};
      db.users.forEach(function (u) {
        if (!u.friendId) u.friendId = String(Math.floor(100000 + Math.random() * 900000));
        while (usedIds[u.friendId]) u.friendId = String(Math.floor(100000 + Math.random() * 900000));
        usedIds[u.friendId] = true;
        if (!u.friends) u.friends = [];
        if (!u.groups) u.groups = PRESET_GROUPS.map(function (g) { return Object.assign({}, g); });
        if (!u.searchHistory) u.searchHistory = [];
        if (typeof u.guideSeen !== 'boolean') u.guideSeen = false;
      });
      if (!Array.isArray(db.items)) db.items = [];
      if (!Array.isArray(db.posts)) db.posts = DEMO_POSTS.slice();
      db.posts.forEach(function (p) { if (!Array.isArray(p.comments)) p.comments = []; });
      if (!db.messages || typeof db.messages !== 'object') {
        db.messages = { c1: (DEMO_MESSAGES.c1 || []).slice(), c2: (DEMO_MESSAGES.c2 || []).slice(), c3: (DEMO_MESSAGES.c3 || []).slice() };
      }
      if (!Array.isArray(db.devices)) db.devices = [];
      if (!Array.isArray(db.spaceKeys)) db.spaceKeys = DEFAULT_SPACE_KEYS.slice();
      if (!Array.isArray(db.customSpaces)) db.customSpaces = [];
      db.users.forEach(function (u) { if (!u.equipped || typeof u.equipped !== 'object') u.equipped = {}; });
      if (typeof db.locationEnabled !== 'boolean') db.locationEnabled = true;
      if (typeof db.bluetoothOn !== 'boolean') db.bluetoothOn = false;
      if (!Array.isArray(db.stickers)) db.stickers = [];
      if (!Array.isArray(db.customCategories)) db.customCategories = [];
      if (!Array.isArray(db.customUnits)) db.customUnits = [];
      if (typeof db.lastSeenVersion !== 'string') db.lastSeenVersion = '';
      if (db.mapMode !== 'auto' && db.mapMode !== 'web' && db.mapMode !== 'demo') db.mapMode = 'auto';
      if (!db.chatBgs || typeof db.chatBgs !== 'object') db.chatBgs = {};
      if (!db.settings || typeof db.settings !== 'object') db.settings = {};
      const s = db.settings;
      if (!s.fontScale || s.fontScale < 1.12 || s.fontScale > 1.7) s.fontScale = 1.12;
      if (s.fontWeight === 300) s.fontWeight = 400;
      if (s.fontWeight !== 400 && s.fontWeight !== 600 && s.fontWeight !== 700) s.fontWeight = 600;
      if (!s.language) s.language = 'system';
      if (typeof s.elderMode !== 'boolean') s.elderMode = false;
      if (!THEMES.some(function (t) { return t.key === s.theme; })) s.theme = 'sage';
      if (typeof s.notify !== 'boolean') s.notify = true;
      if (typeof s.notifyTime !== 'string' || !/^\d{2}:\d{2}$/.test(s.notifyTime)) s.notifyTime = '09:00';
      if (typeof s.sound !== 'boolean') s.sound = true;
      if (typeof s.secure !== 'boolean') s.secure = true;
      return db;
    } catch (e) { return defaultDB(); }
  }

  let db = loadDB();

  function ensureLocalSession() {
    if (db.session && db.users.some(function (u) { return u.id === db.session; })) return;
    let local = db.users.find(function (u) { return u.username === '我的收纳'; });
    if (!local) {
      local = {
        id: uid(), username: '我的收纳', password: 'local',
        friendId: makeFriendId(),
        profile: { name: '我的收纳', contact: '', bio: '', avatar: '' },
        friends: [], groups: PRESET_GROUPS.map(function (g) { return Object.assign({}, g); }),
        searchHistory: [], guideSeen: true,
        createdAt: new Date().toISOString()
      };
      db.users.push(local);
      if (!db.items.some(function (i) { return i.userId === local.id; })) {
        starterItems(local.id).forEach(function (item) { db.items.push(item); });
      }
      if (db.spaceKeys.indexOf('柜子') === -1) db.spaceKeys.push('柜子');
    }
    db.session = local.id;
    saveDB();
  }

  function saveDB() {
    try { localStorage.setItem(DB_KEY, JSON.stringify(db)); }
    catch (e) { toast('保存失败：本地存储空间不足', 'error'); }
  }

  function uid() { return 'id_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

  function currentUser() {
    if (!db.session) return null;
    return db.users.find(function (u) { return u.id === db.session; }) || null;
  }

  function getUserItems() {
    const user = currentUser();
    return user ? db.items.filter(function (i) { return i.userId === user.id; }) : [];
  }

  const $ = function (sel, root) { return (root || document).querySelector(sel); };
  const $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function escapeHTML(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function todayStr() {
    const d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function shiftDate(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function nowTime() {
    const d = new Date();
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function daysUntil(dateStr) {
    if (!dateStr) return null;
    return Math.round((new Date(dateStr + 'T00:00:00') - new Date(todayStr() + 'T00:00:00')) / 86400000);
  }

  function expiryInfo(item) {
    if (!item.expiryDate) return { key: 'none', label: '无保质期', days: null };
    const d = daysUntil(item.expiryDate);
    if (d < 0) return { key: 'expired', label: '已过期 ' + Math.abs(d) + ' 天', days: d };
    if (d === 0) return { key: 'danger', label: '今天到期', days: 0 };
    if (d <= 3) return { key: 'danger', label: '还剩 ' + d + ' 天', days: d };
    if (d <= 7) return { key: 'warn', label: '还剩 ' + d + ' 天', days: d };
    if (d <= 30) return { key: 'soon', label: '还剩 ' + d + ' 天', days: d };
    return { key: 'fresh', label: '还剩 ' + d + ' 天', days: d };
  }

  function allCategories() {
    return CATEGORIES.concat(db.customCategories || []);
  }

  function isCustomCategory(key) {
    return typeof key === 'string' && key.indexOf('custom_') === 0;
  }

  function customCategoryLabel(key) {
    if (!isCustomCategory(key)) return '';
    const found = (db.customCategories || []).find(function (c) { return c.key === key; });
    return found ? found.label : key.slice(7);
  }

  function ensureCustomCategory(label) {
    const text = String(label || '').trim();
    if (!text) return 'other';
    const existing = (db.customCategories || []).find(function (c) { return c.label === text; });
    if (existing) return existing.key;
    if (!Array.isArray(db.customCategories)) db.customCategories = [];
    const key = 'custom_' + uid();
    db.customCategories.push({ key: key, label: text, color: '#b39ac4' });
    return key;
  }

  function catOf(key) {
    return allCategories().find(function (c) { return c.key === key; }) || CATEGORIES[CATEGORIES.length - 1];
  }

  function toast(message, type) {
    const el = document.createElement('div');
    el.className = 'toast ' + (type || '');
    el.textContent = translateText(message);
    $('#toast-root').appendChild(el);
    requestAnimationFrame(function () { el.classList.add('show'); });
    setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { el.remove(); }, 300);
    }, 5200);
  }

  function closeSheet() {
    $('#sheet-root').innerHTML = '';
  }

  function closeOverlay() {
    if (activeStream) { activeStream.getTracks().forEach(function (t) { t.stop(); }); activeStream = null; }
    destroyRealMap();
    $('#overlay-root').innerHTML = '';
  }

  function openConfirm(title, message, onConfirm) {
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet" style="max-height:60%">' +
        '<div class="sheet-handle"></div><div class="sheet-head"><h2>' + escapeHTML(title) + '</h2></div>' +
        '<p class="confirm-text">' + escapeHTML(message) + '</p>' +
        '<div class="sheet-actions">' +
          '<button class="btn ghost" data-action="close-sheet">取消</button>' +
          '<button class="btn danger" id="confirm-ok">确定删除</button>' +
        '</div>' +
      '</div></div>';
    $('#confirm-ok').onclick = function () { closeSheet(); onConfirm(); };
  }

  /* ---------------- Shared helpers ---------------- */

  function applySettings() {
    const screen = $('.device-screen');
    if (!screen) return;
    const s = db.settings;
    const theme = THEMES.find(function (t) { return t.key === s.theme; }) || THEMES[0];
    Object.keys(theme.vars).forEach(function (k) { screen.style.setProperty(k, theme.vars[k]); });
    if (s.elderMode) {
      screen.style.setProperty('--sage', '#ffffff');
      screen.style.setProperty('--sage-deep', '#111111');
      screen.style.setProperty('--sage-mist', '#f1f1f1');
      screen.style.setProperty('--cream', '#ffffff');
      screen.style.setProperty('--paper', '#ffffff');
      screen.style.setProperty('--clay', '#222222');
      screen.style.setProperty('--clay-mist', '#ffffff');
    }
    screen.style.setProperty('--app-font-scale', String(s.elderMode ? 1.35 : s.fontScale));
    screen.style.setProperty('--app-font-weight', String(s.elderMode ? 400 : s.fontWeight));
    screen.classList.toggle('elder-mode', !!s.elderMode);
    screen.classList.remove('font-large', 'font-extra');
    if (s.elderMode || s.fontScale >= 1.6) screen.classList.add('font-extra');
    else if (s.fontScale >= 1.35) screen.classList.add('font-large');
    const weight = s.elderMode ? 400 : s.fontWeight;
    screen.classList.remove('fw-thin', 'fw-normal', 'fw-medium', 'fw-bold');
    if (weight === 300) screen.classList.add('fw-thin');
    else if (weight === 600) screen.classList.add('fw-medium');
    else if (weight >= 700) screen.classList.add('fw-bold');
    else screen.classList.add('fw-normal');
  }

  const I18N = {
    'zh-Hant': {
      '首页': '首頁', '功能': '功能', '联动': '連動', '我的': '我的', '我的收纳': '我的收納', '功能中心': '功能中心',
      '添加物品': '新增物品', '到期提醒': '到期提醒', '收纳地图': '收納地圖', '消息聊天': '訊息聊天', '社区动态': '社群動態',
      '使用指南': '使用指南', '个人设置': '個人設定', '消息通知': '訊息通知', '通知时间': '通知時間', '界面颜色': '介面顏色',
      '字体大小': '字體大小', '字体粗细': '字體粗細', '语言': '語言', '保存': '儲存', '取消': '取消', '关闭': '關閉',
      '下一步': '下一步', '上一步': '上一步', '跳过': '略過', '开始使用': '開始使用', '物品名称': '物品名稱',
      '分类': '分類', '数量': '數量', '存放位置': '存放位置', '收纳日期': '收納日期', '保质期至': '保存期限至',
      '备注': '備註', '搜索我的物品': '搜尋我的物品', '我的物品': '我的物品', '收起': '收起', '展开': '展開',
      '到期优先': '到期優先', '最近收纳': '最近收納', '全部': '全部', '无保质期': '無保存期限'
    },
    en: {
      '首页': 'Home', '功能': 'Features', '联动': 'Devices', '我的': 'Me', '我的收纳': 'My Storage', '功能中心': 'Features',
      '添加物品': 'Add Item', '到期提醒': 'Expiry Alerts', '收纳地图': 'Storage Map', '消息聊天': 'Messages', '社区动态': 'Community',
      '使用指南': 'Guide', '个人设置': 'Preferences', '消息通知': 'Notifications', '通知时间': 'Reminder Time', '界面颜色': 'Theme Color',
      '字体大小': 'Font Size', '字体粗细': 'Font Weight', '语言': 'Language', '保存': 'Save', '取消': 'Cancel', '关闭': 'Close',
      '下一步': 'Next', '上一步': 'Back', '跳过': 'Skip', '开始使用': 'Get Started', '物品名称': 'Item Name',
      '分类': 'Category', '数量': 'Quantity', '存放位置': 'Location', '收纳日期': 'Stored Date', '保质期至': 'Expiry Date',
      '备注': 'Notes', '搜索我的物品': 'Search my items', '我的物品': 'My Items', '收起': 'Collapse', '展开': 'Expand',
      '到期优先': 'Expiry First', '最近收纳': 'Recently Added', '全部': 'All', '无保质期': 'No Expiry'
    }
  };

  const I18N_WORDS = {
    'en': {
      '我的收纳': 'My Storage', '我的物品': 'My Items', '功能中心': 'Features', '首页': 'Home', '功能': 'Features', '联动': 'Devices', '我的': 'Me',
      '添加物品': 'Add Item', '到期提醒': 'Expiry Alerts', '收纳地图': 'Storage Map', '消息聊天': 'Messages', '社区动态': 'Community',
      '使用指南': 'Guide', '个人设置': 'Preferences', '个人信息': 'Personal Info', '界面设置': 'Interface', '功能设置': 'Features',
      '消息通知': 'Notifications', '通知时间': 'Reminder Time', '界面颜色': 'Theme Color', '字体大小': 'Font Size', '字体粗细': 'Font Weight',
      '语言': 'Language', '成就等级': 'Achievements', '装扮管理': 'Decorations', '昵称': 'Nickname', '联系方式': 'Contact', '个性签名': 'Bio',
      '版本与更新': 'Version & Updates', '老年模式': 'Elder Mode', '提示音': 'Sound', '账号安全': 'Security', '修改密码': 'Change Password',
      '物品名称': 'Item Name', '分类': 'Category', '数量': 'Quantity', '存放位置': 'Location', '收纳日期': 'Stored Date', '保质期至': 'Expiry Date',
      '备注': 'Notes', '物品照片': 'Item Photo', '存放地点照片': 'Location Photo', '保质期照片': 'Expiry Photo', '拍照': 'Camera', '相册': 'Album',
      '搜索我的物品': 'Search my items', '搜索': 'Search', '全部': 'All', '临期提醒': 'Expiring Soon', '已过期': 'Expired', '无保质期': 'No Expiry',
      '到期优先': 'Expiry First', '最近收纳': 'Recently Added', '展开': 'Expand', '收起': 'Collapse', '点击查看详情': 'Tap to view details',
      '已收纳物品': 'Items Stored', '物品分类': 'Categories', '设备联动': 'Devices', '联动物品': 'Linked Items', '地图方案': 'Map Plan',
      '播放声音': 'Play Sound', '路线': 'Route', '通知': 'Notification', '离位提醒': 'Away Alert', '自定义标签': 'Custom Tag', '绑定物品': 'Bind Item',
      '当前位置': 'Current Location', '自动检索位置': 'Detect Location', '手动选择': 'Choose Manually', '电量': 'Battery', '信号强度': 'Signal',
      '在线': 'Online', '离线': 'Offline', '添加好友': 'Add Friend', '好友': 'Friends', '群聊': 'Groups', '发消息': 'Message',
      '食物': 'Food', '食品': 'Food', '药品': 'Medicine', '化妆品': 'Cosmetics', '衣物': 'Clothing', '文档': 'Document', '电子产品': 'Electronics',
      '其他': 'Other', '冰箱': 'Fridge', '衣柜': 'Wardrobe', '柜子': 'Cabinet', '抽屉': 'Drawer', '书桌': 'Desk', '桌上': 'Desk',
      '药箱': 'Medicine Box', '厨房': 'Kitchen', '玄关': 'Entryway', '卫生间': 'Bathroom', '宿舍': 'Dorm', '家里': 'Home',
      '保存': 'Save', '取消': 'Cancel', '关闭': 'Close', '确定': 'OK', '完成': 'Done', '重新拍摄': 'Retake', '退出拍照': 'Exit Camera',
      '裁剪照片': 'Crop Photo', '使用照片': 'Use Photo', '左转': 'Rotate Left', '右转': 'Rotate Right', '缩小': 'Zoom Out', '放大': 'Zoom In', '重置': 'Reset',
      '下一步': 'Next', '上一步': 'Back', '跳过': 'Skip', '开始使用': 'Get Started', '跳过教程': 'Skip Tutorial',
      '标准': 'Standard', '常规': 'Regular', '半粗': 'Semi-bold', '加粗': 'Bold', '跟随系统': 'System', '简体中文': 'Simplified Chinese',
      '繁體中文': 'Traditional Chinese', '通知': 'Notification', '时间': 'Time', '颜色': 'Color', '主题': 'Theme', '字体': 'Font', '大小': 'Size', '粗细': 'Weight',
      '晚': 'Evening', '晚上好': 'Good Evening', '早上好': 'Good Morning', '下午好': 'Good Afternoon', '件': 'pcs', '提示': 'Tip', '说明': 'Info',
      '暂无': 'None', '暂无数据': 'No data', '请选择': 'Select', '请输入': 'Enter', '添加': 'Add', '编辑': 'Edit', '删除': 'Delete', '详情': 'Details',
      '物品': 'Item', '收纳': 'Storage', '注册于': 'Joined', '版本': 'Version', '更新内容': 'What’s New', '当前版本': 'Current',
      '收纳成功': 'Stored successfully', '又一件物品找到家了': 'Another item found its home', '已保存修改': 'Changes saved',
      '已收纳': 'Stored', '已保存': 'Saved', '已添加': 'Added', '已删除': 'Deleted', '已移除': 'Removed', '已更新': 'Updated',
      '保存成功': 'Saved successfully', '添加成功': 'Added successfully', '删除成功': 'Deleted successfully', '修改成功': 'Updated successfully',
      '请先登录': 'Please sign in first', '登录成功': 'Signed in', '注册成功': 'Registered', '退出登录': 'Sign out', '确认退出登录': 'Confirm sign out',
      '请输入': 'Please enter', '请输入物品名称': 'Please enter item name', '请输入数量': 'Please enter quantity', '请输入分类名称': 'Please enter category name',
      '请输入好友编号': 'Please enter friend ID', '请输入群聊编号': 'Please enter group ID', '请输入群聊名称': 'Please enter group name',
      '请输入自定义分类名称': 'Please enter a custom category name', '请输入自定义单位': 'Please enter a custom unit',
      '为必填项': 'are required', '未标注的为选填项': 'unmarked fields are optional',
      '照片已添加': 'Photo added', '照片已更换': 'Photo replaced', '照片已上传': 'Photo uploaded', '头像已更新': 'Avatar updated',
      '已复制': 'Copied', '复制失败': 'Copy failed', '操作成功': 'Done', '操作失败': 'Operation failed',
      '拍摄完成': 'Photo captured', '可直接使用、裁剪或重新拍摄': 'Use, crop or retake as you like',
      '裁剪照片': 'Crop Photo', '重置裁剪框': 'Reset crop box', '拖动边框调整范围': 'Drag edges to adjust',
      '完成': 'Done', '取消': 'Cancel', '确定': 'OK', '返回': 'Back', '关闭': 'Close', '提示': 'Tip',
      '好友与群聊': 'Friends & Groups', '你的编号': 'Your ID', '把 ID 告诉朋友即可添加': 'Share your ID to add friends',
      '输入对方编号 ID': 'Enter friend ID', '添加好友': 'Add Friend', '发现好友': 'Discover Friends', '我的好友': 'My Friends',
      'A-Z 排序': 'A-Z Sort', '按 A-Z 排序': 'Sort by A-Z', '好友备注': 'Friend Remark', '分组': 'Group',
      '未分组': 'Ungrouped', '同学': 'Classmate', '邻居': 'Neighbor', '家人': 'Family', '同事': 'Colleague',
      '点「+」添加': 'Tap + to add', '还没有好友': 'No friends yet', '可在上方发现好友添加': 'Discover friends above',
      '我的群聊': 'My Groups', '创建群聊': 'Create Group', '群聊管理': 'Group Settings', '群聊名称': 'Group Name',
      '群成员': 'Members', '邀请好友进群': 'Invite Friends', '可多选好友，选择后点邀请进群': 'Select friends, then tap Invite',
      '确认邀请': 'Confirm Invite', '邀请进群': 'Invite', '移出群聊': 'Remove from group', '群聊已创建': 'Group created',
      '群聊名称已修改': 'Group name updated', '已邀请': 'Invited', '位好友进群': 'friends joined', '所选好友已在群内': 'Already in group',
      '通过群号加入': 'Joined via group ID', '你已在该群聊中': 'Already in this group', '暂无其他成员': 'No other members',
      '输入群聊编号加群': 'Enter group ID to join', '加群': 'Join Group', '群简介': 'Group Description',
      '群名称': 'Group Name', '备注名称': 'Remark Name', '好友分组': 'Friend Group', '备注已保存': 'Remark saved',
      '还没有群聊': 'No groups yet', '点右上角创建': 'Tap top-right to create',
      '设备联动': 'Devices', '设备': 'Device', '添加设备': 'Add Device', '我的实时位置': 'My Live Location',
      '用高德地图打开': 'Open in Amap', '地图方案': 'Map Plan', '下拉展开地图': 'Expand map', '收起地图': 'Collapse map',
      '你在这里': 'You are here', '联动能力': 'Features', '设备联动说明': 'About Device Linking',
      '还没有定位标签': 'No tracking tags yet', '开启蓝牙搜索': 'Enable Bluetooth to search',
      '尚未绑定物品': 'No item bound', '绑定：': 'Bound: ', '已连接': 'Connected', '未连接': 'Disconnected',
      '蓝牙连接已开启': 'Bluetooth on', '蓝牙连接未开启': 'Bluetooth off', '开启': 'Turn on', '关闭蓝牙': 'Turn off',
      '搜索设备': 'Search Devices', '连接设备': 'Connect Device', '播放声音': 'Play Sound', '离位提醒': 'Away Alert',
      '离位提醒 开': 'Away Alert On', '离位提醒 关': 'Away Alert Off', '低电量提醒': 'Low Battery Alert',
      '自动记录收纳': 'Auto Record', '一键查找': 'Quick Find', '自定义标签': 'Custom Tag', '绑定物品': 'Bind Item',
      '当前为交互演示': 'Interactive demo', '标签状态在 App 内模拟': 'Tag status simulated in app',
      '请开启定位权限': 'Please enable location permission', '定位失败': 'Location failed', '正在定位': 'Locating…',
      '通知时间已设置': 'Reminder time set', '语言已切换': 'Language changed', '字体大小已调整': 'Font size adjusted',
      '字体粗细已调整': 'Font weight adjusted', '主题已切换': 'Theme changed', '设置已保存': 'Settings saved',
      '密码已修改': 'Password changed', '当前版本已是最新': 'You are up to date', '版本': 'Version',
      '添加物品': 'Add Item', '编辑物品': 'Edit Item', '物品照片': 'Item Photo', '以上照片均为选填': 'All photos are optional',
      '不拍照也能保存物品': 'You can save without photos', '点击查看详情': 'Tap to view details',
      '件': 'pcs', '盒': 'box', '瓶': 'bottle', '包': 'pack', '袋': 'bag', '个': 'pcs', '卷': 'roll',
      '临期提醒': 'Expiring Soon', '已过期': 'Expired', '无保质期': 'No Expiry', '到期优先': 'Expiry First',
      '最近收纳': 'Recently Added', 'A-Z 字母': 'A-Z Letters', '排列顺序': 'Sort by', '搜索历史': 'Search History',
      '清空': 'Clear', '展开': 'Expand', '收起': 'Collapse', '收起键盘': 'Hide keyboard',
      '没有找到相关物品': 'No items found', '还没有物品': 'No items yet', '添加第一件物品': 'Add your first item',
      '今天': 'Today', '昨天': 'Yesterday',
      '建议补货': 'Low Stock', '即将过期': 'Expiring Soon', '库存充足': 'In Stock', '已过期': 'Expired',
      '文档证件': 'Documents', '文具书籍': 'Stationery & Books', '钥匙锁具': 'Keys & Locks', '清洁用品': 'Cleaning',
      '运动用品': 'Sports', '母婴用品': 'Baby', '工具五金': 'Tools', '文档': 'Documents', '证件': 'Documents',
      '未设置位置': 'No location', '所在分类': 'Category', '所属分类': 'Category', '到期日期': 'Expiry Date',
      '支': 'pcs', '罐': 'can', '桶': 'bucket', '节': 'pcs', '粒': 'pcs', '块': 'pcs', '片': 'pcs', '颗': 'pcs', '杯': 'cup', '双': 'pair',
      '水杯': 'Water Bottle', '感冒药': 'Cold Medicine', '毕业证': 'Diploma', '常用药品': 'Common Medicine',
      '牛奶': 'Milk', '鸡蛋': 'Eggs', '水果': 'Fruit', '收纳盒': 'Storage Box', '钥匙': 'Keys', '文件夹': 'Folder',
      '护照本': 'Passport', '我的第一件物品': 'My First Item', '我的第': 'My Item ',
      '还剩': 'Days left: ', '点击查看详情': 'Tap for details', '点击卡片展开可编辑': 'Tap card to edit'
    },
    'zh-Hant': {
      '我的收纳': '我的收納', '我的物品': '我的物品', '功能中心': '功能中心', '首页': '首頁', '功能': '功能', '联动': '連動', '我的': '我的',
      '添加物品': '新增物品', '到期提醒': '到期提醒', '收纳地图': '收納地圖', '消息聊天': '訊息聊天', '社区动态': '社群動態',
      '使用指南': '使用指南', '个人设置': '個人設定', '个人信息': '個人資訊', '界面设置': '介面設定', '功能设置': '功能設定',
      '消息通知': '訊息通知', '通知时间': '通知時間', '界面颜色': '介面顏色', '字体大小': '字體大小', '字体粗细': '字體粗細',
      '语言': '語言', '成就等级': '成就等級', '装扮管理': '裝扮管理', '昵称': '暱稱', '联系方式': '聯絡方式', '个性签名': '個性簽名',
      '版本与更新': '版本與更新', '老年模式': '長輩模式', '提示音': '提示音', '账号安全': '帳號安全', '修改密码': '修改密碼',
      '物品名称': '物品名稱', '分类': '分類', '数量': '數量', '存放位置': '存放位置', '收纳日期': '收納日期', '保质期至': '保存期限至',
      '备注': '備註', '物品照片': '物品照片', '存放地点照片': '存放地點照片', '保质期照片': '保存期限照片', '拍照': '拍照', '相册': '相簿',
      '搜索我的物品': '搜尋我的物品', '搜索': '搜尋', '全部': '全部', '临期提醒': '即期提醒', '已过期': '已過期', '无保质期': '無保存期限',
      '到期优先': '到期優先', '最近收纳': '最近收納', '展开': '展開', '收起': '收起', '点击查看详情': '點選查看詳情',
      '已收纳物品': '已收納物品', '物品分类': '物品分類', '设备联动': '設備連動', '联动物品': '連動物品', '地图方案': '地圖方案',
      '播放声音': '播放聲音', '路线': '路線', '通知': '通知', '离位提醒': '離位提醒', '自定义标签': '自訂標籤', '绑定物品': '綁定物品',
      '当前位置': '目前位置', '自动检索位置': '自動搜尋位置', '手动选择': '手動選擇', '电量': '電量', '信号强度': '訊號強度',
      '在线': '上線', '离线': '離線', '添加好友': '新增好友', '好友': '好友', '群聊': '群組', '发消息': '傳訊息',
      '食品': '食品', '药品': '藥品', '化妆品': '化妝品', '衣物': '衣物', '文档': '文件', '电子产品': '電子產品', '其他': '其他',
      '冰箱': '冰箱', '衣柜': '衣櫃', '柜子': '櫃子', '抽屉': '抽屜', '书桌': '書桌', '桌上': '桌上', '药箱': '藥箱', '厨房': '廚房',
      '保存': '儲存', '取消': '取消', '关闭': '關閉', '确定': '確定', '完成': '完成', '重新拍摄': '重新拍攝', '退出拍照': '結束拍攝',
      '裁剪照片': '裁剪照片', '使用照片': '使用照片', '左转': '左轉', '右转': '右轉', '缩小': '縮小', '放大': '放大', '重置': '重設',
      '下一步': '下一步', '上一步': '上一步', '跳过': '略過', '开始使用': '開始使用', '标准': '標準', '常规': '一般', '半粗': '半粗', '加粗': '粗體',
      '跟随系统': '跟隨系統', '简体中文': '簡體中文', '通知': '通知', '时间': '時間', '颜色': '顏色', '主题': '主題', '字体': '字體', '大小': '大小', '粗细': '粗細',
      '晚上好': '晚上好', '早上好': '早安', '下午好': '午安', '件': '件', '提示': '提示', '说明': '說明', '暂无': '暫無', '暂无数据': '暫無資料',
      '请选择': '請選擇', '请输入': '請輸入', '添加': '新增', '编辑': '編輯', '删除': '刪除', '详情': '詳情', '物品': '物品', '收纳': '收納',
      '注册于': '註冊於', '版本': '版本', '更新内容': '更新內容', '当前版本': '目前版本',
      '收纳成功': '收納成功', '又一件物品找到家了': '又一件物品找到家了', '已保存修改': '已儲存修改',
      '已收纳': '已收納', '已保存': '已儲存', '已添加': '已新增', '已删除': '已刪除', '已移除': '已移除', '已更新': '已更新',
      '保存成功': '儲存成功', '添加成功': '新增成功', '删除成功': '刪除成功', '修改成功': '修改成功',
      '请先登录': '請先登入', '登录成功': '登入成功', '注册成功': '註冊成功', '退出登录': '登出', '确认退出登录': '確認登出',
      '请输入物品名称': '請輸入物品名稱', '请输入数量': '請輸入數量', '请输入分类名称': '請輸入分類名稱',
      '请输入好友编号': '請輸入好友編號', '请输入群聊编号': '請輸入群組編號', '请输入群聊名称': '請輸入群組名稱',
      '请输入自定义分类名称': '請輸入自訂分類名稱', '请输入自定义单位': '請輸入自訂單位',
      '为必填项': '為必填項', '未标注的为选填项': '未標註的為選填項',
      '照片已添加': '照片已新增', '照片已更换': '照片已更換', '头像已更新': '頭像已更新',
      '已复制': '已複製', '复制失败': '複製失敗', '操作成功': '操作成功', '操作失败': '操作失敗',
      '拍摄完成': '拍攝完成', '可直接使用、裁剪或重新拍摄': '可直接使用、裁剪或重新拍攝',
      '重置裁剪框': '重設裁剪框', '拖动边框调整范围': '拖動邊框調整範圍',
      '好友与群聊': '好友與群組', '你的编号': '你的編號', '把 ID 告诉朋友即可添加': '告知朋友 ID 即可新增',
      '输入对方编号 ID': '輸入對方編號 ID', '添加好友': '新增好友', '发现好友': '發現好友', '我的好友': '我的好友',
      'A-Z 排序': 'A-Z 排序', '按 A-Z 排序': '按 A-Z 排序', '好友备注': '好友備註', '分组': '分組',
      '未分组': '未分組', '同学': '同學', '邻居': '鄰居', '家人': '家人', '同事': '同事',
      '点「+」添加': '點「+」新增', '还没有好友': '還沒有好友', '可在上方发现好友添加': '可在上方發現好友新增',
      '我的群聊': '我的群組', '创建群聊': '建立群組', '群聊管理': '群組管理', '群聊名称': '群組名稱',
      '群成员': '群成員', '邀请好友进群': '邀請好友進群', '可多选好友，选择后点邀请进群': '可多選好友，選擇後點邀請進群',
      '确认邀请': '確認邀請', '邀请进群': '邀請進群', '移出群聊': '移出群組', '群聊已创建': '群組已建立',
      '群聊名称已修改': '群組名稱已修改', '已邀请': '已邀請', '位好友进群': '位好友進群', '所选好友已在群内': '所選好友已在群內',
      '通过群号加入': '透過群號加入', '你已在该群聊中': '你已在該群組中', '暂无其他成员': '暫無其他成員',
      '输入群聊编号加群': '輸入群組編號加群', '加群': '加群', '群简介': '群組簡介',
      '群名称': '群組名稱', '备注名称': '備註名稱', '好友分组': '好友分組', '备注已保存': '備註已儲存',
      '还没有群聊': '還沒有群組', '点右上角创建': '點右上角建立',
      '设备联动': '設備連動', '设备': '設備', '添加设备': '新增設備', '我的实时位置': '我的即時位置',
      '用高德地图打开': '用高德地圖開啟', '地图方案': '地圖方案', '下拉展开地图': '下拉展開地圖', '收起地图': '收起地圖',
      '你在这里': '你在這裡', '联动能力': '連動功能', '设备联动说明': '設備連動說明',
      '还没有定位标签': '還沒有定位標籤', '开启蓝牙搜索': '開啟藍牙搜尋',
      '尚未绑定物品': '尚未綁定物品', '绑定：': '綁定：', '已连接': '已連線', '未连接': '未連線',
      '蓝牙连接已开启': '藍牙已開啟', '蓝牙连接未开启': '藍牙未開啟', '开启': '開啟',
      '搜索设备': '搜尋設備', '连接设备': '連線設備', '播放声音': '播放聲音', '离位提醒': '離位提醒',
      '离位提醒 开': '離位提醒 開', '离位提醒 关': '離位提醒 關', '低电量提醒': '低電量提醒',
      '自动记录收纳': '自動記錄收納', '一键查找': '一鍵尋找', '自定义标签': '自訂標籤', '绑定物品': '綁定物品',
      '请开启定位权限': '請開啟定位權限', '定位失败': '定位失敗', '正在定位': '定位中…',
      '通知时间已设置': '通知時間已設定', '语言已切换': '語言已切換', '字体大小已调整': '字體大小已調整',
      '字体粗细已调整': '字體粗細已調整', '主题已切换': '主題已切換', '设置已保存': '設定已儲存',
      '密码已修改': '密碼已修改', '当前版本已是最新': '目前版本已是最新',
      '编辑物品': '編輯物品', '以上照片均为选填': '以上照片均為選填',
      '不拍照也能保存物品': '不拍照也能儲存物品', '点卡片展开可编辑': '點卡片展開可編輯',
      '盒': '盒', '瓶': '瓶', '包': '包', '袋': '袋', '个': '個', '卷': '捲',
      '排列顺序': '排列順序', '搜索历史': '搜尋歷史', '清空': '清空', '收起键盘': '收起鍵盤',
      '没有找到相关物品': '沒有找到相關物品', '还没有物品': '還沒有物品', '添加第一件物品': '新增第一件物品',
      '今天': '今天', '昨天': '昨天',
      '建议补货': '建議補貨', '即将过期': '即將過期', '库存充足': '庫存充足',
      '文档证件': '文件證件', '文具书籍': '文具書籍', '钥匙锁具': '鑰匙鎖具', '清洁用品': '清潔用品',
      '运动用品': '運動用品', '母婴用品': '母嬰用品', '工具五金': '工具五金',
      '未设置位置': '未設定位置', '所属分类': '所屬分類', '到期日期': '到期日期',
      '支': '支', '罐': '罐', '桶': '桶', '节': '節', '块': '塊', '片': '片', '颗': '顆', '杯': '杯', '双': '雙',
      '水杯': '水杯', '感冒药': '感冒藥', '毕业证': '畢業證', '常用药品': '常用藥品',
      '牛奶': '牛奶', '鸡蛋': '雞蛋', '水果': '水果', '收纳盒': '收納盒', '钥匙': '鑰匙', '文件夹': '資料夾',
      '护照本': '護照', '我的第一件物品': '我的第一件物品', '我的第': '我的第',
      '点击查看详情': '點選查看詳情', '点击卡片展开可编辑': '點卡片展開可編輯'
    }
  };

  function currentLanguage() {
    const choice = (db.settings && db.settings.language) || 'system';
    if (choice !== 'system') return choice;
    const nav = (navigator.language || '').toLowerCase();
    if (nav.indexOf('zh-tw') === 0 || nav.indexOf('zh-hk') === 0 || nav.indexOf('zh-hant') === 0) return 'zh-Hant';
    if (nav.indexOf('zh') === 0) return 'zh-CN';
    return 'en';
  }

  function translateText(text) {
    const lang = currentLanguage();
    if (lang === 'zh-CN') return String(text == null ? '' : text);
    const dict = I18N[lang] || {};
    const words = I18N_WORDS[lang] || {};
    const raw = String(text == null ? '' : text);
    const key = raw.trim();
    if (dict[key]) return raw.replace(key, dict[key]);
    if (words[key]) return words[key];
    let out = raw;
    Object.keys(words).sort(function (a, b) { return b.length - a.length; }).forEach(function (k) {
      if (out.indexOf(k) !== -1) out = out.split(k).join(words[k]);
    });
    return out;
  }

  function translateUI(root) {
    if (!root) return;
    if (currentLanguage() === 'zh-CN') return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) { node.nodeValue = translateText(node.nodeValue); });
    $$('[placeholder], [title], [aria-label]', root).forEach(function (el) {
      ['placeholder', 'title', 'aria-label'].forEach(function (attr) {
        if (el.hasAttribute(attr)) el.setAttribute(attr, translateText(el.getAttribute(attr)));
      });
    });
  }

  function applyLanguage() {
    const lang = currentLanguage();
    document.documentElement.lang = lang === 'zh-Hant' ? 'zh-Hant' : (lang === 'en' ? 'en' : 'zh-CN');
    if (lang === 'zh-CN') return;
    translateUI($('.device-screen'));
    translateUI($('#overlay-root'));
    translateUI($('#sheet-root'));
  }

  function makeFriendId() {
    let id;
    do { id = String(Math.floor(100000 + Math.random() * 900000)); }
    while (db.users.some(function (u) { return u.friendId === id; }));
    return id;
  }

  function findPersonByFriendId(fid) {
    const local = db.users.find(function (u) { return u.friendId === fid; });
    if (local) return local;
    return FRIEND_DIRECTORY.find(function (u) { return u.friendId === fid; }) || null;
  }
  function findPersonById(id) {
    const local = db.users.find(function (u) { return u.id === id; });
    if (local) return local;
    return FRIEND_DIRECTORY.find(function (u) { return u.id === id; }) || null;
  }
  function personName(u) { return (u.profile && u.profile.name) || u.name || u.username || '好友'; }
  function personBio(u) { return (u.profile && u.profile.bio) || u.signature || ''; }
  function personContact(u) { return (u.profile && u.profile.contact) || u.contact || ''; }

  function getUserFriends() {
    const u = currentUser();
    return u && Array.isArray(u.friends) ? u.friends : [];
  }

  function getUserGroups() {
    const u = currentUser();
    return u && Array.isArray(u.groups) ? u.groups : PRESET_GROUPS.slice();
  }

  function allChats() {
    const friends = getUserFriends().map(function (f) {
      return { id: 'u_' + f.userId, name: f.name, avatar: (f.name || '友').charAt(0), tone: '', kind: 'friend', refId: f.userId };
    });
    const groups = getUserGroups().map(function (g) {
      return { id: g.id, name: g.name, avatar: g.avatar || '群', tone: 'blue', kind: 'group', desc: g.desc || '' };
    });
    return CHATS.concat(friends, groups);
  }

  function chatById(id) { return allChats().find(function (c) { return c.id === id; }) || null; }

  function chatFriendUserId(id) {
    const chat = chatById(id || state.chatId);
    if (!chat) return '';
    if (chat.refId) return chat.refId;
    return /^u_/.test(chat.id) ? chat.id.slice(2) : '';
  }

  function pinyinInitial(name) {
    const ch = String(name || '').trim().charAt(0);
    if (!ch) return '#';
    if (/[a-zA-Z]/.test(ch)) return ch.toUpperCase();
    if (/[0-9]/.test(ch)) return '#';
    let idx = -1;
    try {
      const coll = new Intl.Collator('zh-CN');
      for (let i = 0; i < PY_REPS.length; i++) {
        if (coll.compare(ch, PY_REPS.charAt(i)) >= 0) idx = i;
      }
    } catch (e) {
      for (let i = 0; i < PY_REPS.length; i++) {
        if (ch >= PY_REPS.charAt(i)) idx = i;
      }
    }
    return idx >= 0 ? PY_LETTERS.charAt(idx) : '#';
  }

  function searchHistory() {
    const u = currentUser();
    return u && Array.isArray(u.searchHistory) ? u.searchHistory : [];
  }

  function pushSearchHistory(q) {
    const u = currentUser();
    const text = String(q || '').trim();
    if (!u || !text) return;
    if (!Array.isArray(u.searchHistory)) u.searchHistory = [];
    u.searchHistory = [text].concat(u.searchHistory.filter(function (h) { return h !== text; })).slice(0, 20);
    saveDB();
  }

  function showTutorial(force) {
    const u = currentUser();
    if (!u) return;
    if (!force && u.guideSeen) return;
    state.guideStep = 0;
    renderTutorial();
  }

  function tutorialMock(kind) {
    const bodies = {
      home: '<div class="mini-head">晚上好 · 我的收纳</div><div class="mini-stats"><span>13 需要关注</span><span>23 已收纳</span></div><div class="mini-card"><i></i><b>牛奶</b><em>建议补货</em></div>',
      add: '<div class="mini-sheet"><div class="mini-sheet-head">✕ <b>添加物品</b> <span>保存</span></div><div class="mini-line">物品名称　牛奶</div><div class="mini-line">分类　食品</div><div class="mini-line focus">数量　2 盒</div><div class="mini-line">存放位置　冰箱</div></div>',
      map: '<div class="mini-title">收纳地图</div><div class="mini-grid"><span>冰箱</span><span class="focus">柜子</span><span>药箱</span><span>书桌</span><span>衣柜</span><span>抽屉</span></div>',
      alerts: '<div class="mini-title">到期提醒</div><div class="mini-card"><i></i><b>牛奶</b><em class="warn">已过期</em></div><div class="mini-card"><i></i><b>零食</b><em class="warn">建议补货</em></div>',
      device: '<div class="mini-title">设备联动</div><div class="mini-card"><i></i><b>充电宝标签</b><em class="focus">一键查找</em></div><div class="mini-line">信号强 · 电量 86%</div>',
      social: '<div class="mini-tabs"><span class="focus">社区动态</span><span>消息聊天</span></div><div class="mini-card"><i></i><b>小鹿的收纳分享</b><em>评论</em></div>',
      profile: '<div class="mini-title">我的 · 设置</div><div class="mini-line">界面颜色　鼠尾草绿</div><div class="mini-line focus">通知时间　09:00</div><div class="mini-line">使用指南　操作步骤</div>'
    };
    return '<div class="tutorial-preview"><div class="mini-screen">' +
      '<div class="mini-status">9:41 <span>信号 · 电量</span></div>' +
      '<div class="mini-body">' + (bodies[kind] || bodies.home) + '</div>' +
      '<div class="mini-nav"><span>首页</span><span>功能</span><span class="plus">＋</span><span>联动</span><span>我的</span></div>' +
      '</div></div>';
  }

  function renderTutorial() {
    const steps = [
      { icon: 'home', mock: 'home', page: '首页', title: '认识「首页」',
        text: '打开 App 默认进入首页，这里是你的收纳总览，每天看一眼就心里有数。',
        ops: [
          '① 顶部问候语下方是统计卡：已收纳件数、临期提醒数量。',
          '② 中间「我的物品」内可直接搜索、筛选和展开每件物品。',
          '③ 我的物品收起时搜索栏仍可使用，物品卡片点一下展开查看照片与详细信息。'
        ] },
      { icon: 'plus', mock: 'add', page: '底部「＋」', title: '随手记录一件物品',
        text: '底部正中间的圆形「＋」是记录入口，拍照或从相册选图都可以。',
        ops: [
          '① 点底部中间的「＋」打开添加页，左上角是关闭，右上角是保存。',
          '② 拍照后点「AI 识别」，会按整张照片智能填写物品名称和分类，照片不会被拆分。',
          '③ 点每个识别结果的「选用」，名称、分类和照片会自动填入。',
          '④ 数量后面可选件、盒、瓶等，也能自定义单位；日期点开后按主题色选择。',
          '⑤ 点右上角「保存」，物品自动归入收纳地图。'
        ] },
      { icon: 'pin', mock: 'map', page: '首页 / 功能', title: '用地图快速找到它',
        text: '收纳地图已移入功能中心，按存放位置分区，轻点格子即可查看放在这里的全部物品。',
        ops: [
          '① 点底部「功能」→「收纳地图」打开地图。',
          '② 点冰箱 / 柜子等格子，查看该位置的全部物品。',
          '③ 点卡片可展开详情、编辑或删除。',
          '④ 自定义的存放位置保存后会自动加入地图。'
        ] },
      { icon: 'bell', mock: 'alerts', page: '功能 → 到期提醒', title: '临期物品优先处理',
        text: '颜色越深代表越接近过期，红色需要立刻处理。',
        ops: [
          '① 首页顶部统计卡直接显示临期物品数量。',
          '② 点「功能 → 到期提醒」查看所有临期物品列表。',
          '③ 点列表里的物品可直接修改保质期或删除。'
        ] },
      { icon: 'signal', mock: 'device', page: '底部「联动」', title: '定位标签一键查找',
        text: '给重要物品绑定蓝牙标签，找东西不用再翻箱倒柜。',
        ops: [
          '① 点底部「联动」进入设备页。',
          '② 打开手机蓝牙，搜索并连接你的定位标签。',
          '③ 给物品绑定标签，并开启离位提醒。',
          '④ 点「一键查找」，地图标出位置并播放提示音。'
        ] },
      { icon: 'users', mock: 'social', page: '功能 → 社区 / 聊天', title: '和朋友一起整理',
        text: '在社区看大家的收纳灵感，加好友后还能私聊交流。',
        ops: [
          '① 点「功能 → 社区动态」浏览动态，点动态下方的「评论」进入评论区。',
          '② 点「消息聊天 → 加好友」，用编号 ID 搜索或从推荐里一键添加。',
          '③ 点好友进入聊天，可发文字、表情和贴纸，还能更换聊天背景。'
        ] },
      { icon: 'user', mock: 'profile', page: '底部「我的」', title: '个性化你的 App',
        text: '在「我的」里管理个人资料、外观和账号，设置分组可点击折叠。',
        ops: [
          '① 点头像或昵称修改个人信息与个性签名。',
          '② 「界面设置」可调字体大小、粗细和主题色；点分组标题可折叠 / 展开。',
          '③ 「功能设置」里可开关消息通知，并点「通知时间」设置到期提醒的具体时间。',
          '④ 到「功能 → 成就等级」佩戴头像框 / 名片 / 徽章；「版本与更新」可查历史。'
        ] }
    ];
    const i = Math.min(state.guideStep, steps.length - 1);
    const s = steps[i];
    const dots = steps.map(function (_, n) {
      return '<i class="' + (n === i ? 'on' : '') + '"></i>';
    }).join('');
    $('#overlay-root').innerHTML =
      '<div class="full-mask tutorial-mask tutorial-card-mask">' +
        '<div class="tutorial-card">' +
          '<button class="tutorial-skip" data-action="tutorial-skip">跳过</button>' +
          '<div class="tutorial-card-top"><span>' + (i + 1) + ' / ' + steps.length + '</span></div>' +
          '<span class="tutorial-page">' + escapeHTML(s.page) + '</span>' +
          '<h2>' + escapeHTML(s.title) + '</h2>' +
          '<p>' + escapeHTML(s.text) + '</p>' +
          '<ul class="tutorial-ops">' + s.ops.map(function (o) { return '<li>' + escapeHTML(o) + '</li>'; }).join('') + '</ul>' +
          '<div class="tutorial-card-foot">' +
            '<div class="tutorial-dots">' + dots + '</div>' +
            '<div class="tutorial-actions">' +
              (i > 0 ? '<button class="btn ghost" data-action="tutorial-prev">上一步</button>' : '') +
              '<button class="btn primary" data-action="tutorial-next">' + (i === steps.length - 1 ? '开始使用' : '下一步') + '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    applyLanguage();
  }

  function finishTutorial() {
    const u = currentUser();
    if (u) { u.guideSeen = true; saveDB(); }
    closeOverlay();
    renderApp(true);
    setTimeout(showUpdatePopup, 120);
  }

  function installApp() {
    const deferred = window.__organizerInstallPrompt;
    if (deferred && typeof deferred.prompt === 'function') {
      deferred.prompt();
      if (deferred.userChoice && typeof deferred.userChoice.then === 'function') {
        deferred.userChoice.then(function () { window.__organizerInstallPrompt = null; }).catch(function () {});
      }
      return;
    }
    const ua = (navigator.userAgent || '').toLowerCase();
    const isAndroid = /android|harmonyos|linux; u;/.test(ua);
    const isIOS = !isAndroid && /iphone|ipad|ipod/.test(ua);
    const inStandalone = navigator.standalone === true ||
      (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
    if (inStandalone) { toast('已经是以 App 模式运行啦'); return; }
    let steps, note;
    if (isAndroid) {
      steps = [
        '用手机自带浏览器或 Chrome 打开本网址（微信内置浏览器请先点右上角「在浏览器打开」）',
        '点浏览器右上角「⋮」或「菜单」按钮',
        '在菜单里找到「安装应用」「添加到主屏幕」或「添加到桌面」',
        '确认后桌面出现 App 图标；若菜单没有该项，可再用系统浏览器打开后重试'
      ];
      note = '安卓不同品牌菜单名称不同：华为/小米可能在「更多工具」里；若始终没有安装项，请确认网址是 HTTPS 且页面已完全加载。';
    } else if (isIOS) {
      steps = ['用 Safari 打开本网址（微信里请先点右上角「在 Safari 中打开」）',
        '点屏幕底部中间的「分享」按钮（方框带向上箭头）',
        '下滑找到并点「添加到主屏幕」',
        '点右上角「添加」，桌面即出现 App 图标'];
      note = '苹果手机必须用 Safari，Chrome 等浏览器没有「添加到主屏幕」选项。';
    } else {
      steps = ['在手机浏览器打开本网址', '点浏览器菜单（通常是右上角「⋮」）',
        '点「安装应用」或「添加到主屏幕」', '确认后桌面出现 App 图标'];
      note = '若没有安装选项，请换用 Chrome / Safari / 手机自带浏览器打开。';
    }
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>安装到手机桌面</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">像普通 App 一样全屏打开，无需从浏览器进入。请按下面步骤操作：</p>' +
        '<div class="install-steps">' + steps.map(function (s, i) {
          return '<div class="install-step"><span>' + (i + 1) + '</span><p>' + escapeHTML(s) + '</p></div>';
        }).join('') + '</div>' +
        '<p class="sheet-note">' + escapeHTML(note) + '</p>' +
        '<div class="sheet-actions"><button class="btn primary block" data-action="close-sheet">知道了</button></div>' +
      '</div></div>';
  }

  function showUpdatePopup(force) {
    if (!force && db.lastSeenVersion === APP_VERSION) return;
    const log = CHANGELOG.find(function (l) { return l.version === APP_VERSION; });
    if (!log) return;
    const preview = logAllItems(log).slice(0, 3).map(function (t) {
      return '<li>' + escapeHTML(t) + '</li>';
    }).join('');
    $('#overlay-root').innerHTML =
      '<div class="full-mask update-mask">' +
        '<div class="update-card">' +
          '<button class="update-close" data-action="close-update" aria-label="关闭">' + ICON.close + '</button>' +
          '<div class="update-illustration">' + ICON.sparkle + '</div>' +
          '<div class="update-badge">新版本 v' + log.version + '</div>' +
          '<h2>' + escapeHTML(log.title) + '</h2>' +
          '<p class="update-date">更新日期 ' + log.date + '</p>' +
          '<ul class="update-list">' + preview + '</ul>' +
          '<p class="update-more">详细内容请到「我的 → 版本与更新」查看</p>' +
          '<button class="btn primary block" data-action="close-update">知道了</button>' +
        '</div>' +
      '</div>';
  }

  function closeUpdatePopup() {
    db.lastSeenVersion = APP_VERSION;
    saveDB();
    closeOverlay();
  }

  function guessItemFromText(name) {
    const text = String(name || '').toLowerCase();
    return AI_KEYWORDS.find(function (k) {
      return k.keys.some(function (key) { return text.indexOf(key) !== -1; });
    }) || null;
  }

  function analyzePhotoColor(src, callback) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = 48; canvas.height = 48;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 48, 48);
      let r = 0, g = 0, b = 0, n = 0;
      try {
        const data = ctx.getImageData(0, 0, 48, 48).data;
        for (let i = 0; i < data.length; i += 16) { r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
      } catch (e) { n = 0; }
      if (!n) { callback({ tone: 'neutral' }); return; }
      r /= n; g /= n; b /= n;
      let tone = 'neutral';
      if (g > r * 1.08 && g > b * 1.05) tone = 'green';
      else if (r > g * 1.2 && r > b * 1.15) tone = 'red';
      else if (b > r * 1.12 && b > g * 1.05) tone = 'blue';
      else if (r > 190 && g > 190 && b > 190) tone = 'light';
      else if (r < 80 && g < 80 && b < 80) tone = 'dark';
      callback({ tone: tone, r: r, g: g, b: b });
    };
    img.onerror = function () { callback({ tone: 'neutral' }); };
    img.src = src;
  }

  function recognizePhoto(name, src, callback) {
    if (!src) { callback(null); return; }
    analyzePhotoColor(src, function (info) {
      const hit = guessItemFromText(name);
      let item;
      if (hit) {
        item = {
          name: hit.name, category: hit.category, location: hit.location,
          confidence: 0.94, from: '照片名称与视觉特征', photo: src
        };
      } else {
        const map = {
          green: { name: '绿色包装物品', category: 'food', confidence: 0.58 },
          red: { name: '红色包装物品', category: 'food', confidence: 0.55 },
          blue: { name: '蓝色包装物品', category: 'other', confidence: 0.52 },
          light: { name: '纸质文件或白色物品', category: 'document', confidence: 0.56 },
          dark: { name: '电子或深色物品', category: 'electronic', confidence: 0.54 },
          neutral: { name: '待确认物品', category: 'other', confidence: 0.5 }
        };
        const guess = map[info.tone] || map.neutral;
        item = {
          name: guess.name, category: guess.category, location: '',
          confidence: guess.confidence, from: '照片色彩与形状特征', photo: src
        };
      }
      setTimeout(function () { callback(item); }, 420);
    });
  }

  function runAI() {
    const box = $('#ai-result');
    if (!box) { toast('请先添加物品照片', 'warn'); return; }
    const nameField = $('#item-photo-name');
    const query = ($('#f-name') && $('#f-name').value.trim()) || (nameField && nameField.value) || '';
    const photo = (state.photoDraft.item && state.photoDraft.item[0]) ||
      (($('#item-photo') && $('#item-photo').value) || '');
    if (!photo) { toast('请先添加一张照片', 'warn'); return; }
    box.innerHTML = '<div class="ai-loading">' + ICON.sparkle + ' AI 正在识别物品名称与分类…</div>';
    recognizePhoto(query, photo, function (item) {
      if (!box.isConnected) return;
      if (!item) {
        box.innerHTML = '<div class="ai-empty">' + ICON.sparkle + ' 暂未识别到明确物品<br><small>可手动填写名称与分类</small></div>';
        return;
      }
      state.aiDetections = [item];
      if ($('#f-name') && !$('#f-name').value.trim()) $('#f-name').value = item.name;
      if ($('#f-category')) $('#f-category').value = item.category;
      box.innerHTML = '<div class="ai-hit">' + ICON.sparkle +
        '<img src="' + item.photo + '" alt="识别物品">' +
        '<div><b>识别结果：' + escapeHTML(item.name) + '</b>' +
        '<span>' + escapeHTML(catOf(item.category).label) + ' · ' + Math.round(item.confidence * 100) + '% · ' + item.from + '</span>' +
        '<small>已自动填入名称和分类，照片保持原图，可手动修改</small></div>' +
        '<button type="button" class="ai-apply" data-action="use-ai-detection">采用</button></div>' +
        '<button type="button" class="ai-again" data-action="ai-recognize">重新识别</button>';
    });
  }

  function openCategorySheet() {
    const items = getUserItems();
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>物品分类</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">按分类查看物品，字母为分类拼音首字母。</p>' +
        CATEGORIES.map(function (c) {
          const n = items.filter(function (i) { return i.category === c.key; }).length;
          return '<button class="cat-row" data-action="cat-filter" data-key="' + c.key + '">' +
            '<span class="cat-letter">' + pinyinInitial(c.label) + '</span>' +
            '<i class="cat-dot" style="background:' + c.color + '"></i>' +
            '<b>' + c.label + '</b><span class="cat-num">' + n + ' 件 ›</span></button>';
        }).join('') +
      '</div></div>';
    applyLanguage();
  }

  /* ---------------- Auth ---------------- */

  function renderAuth() {
    closeOverlay();
    document.body.classList.add('auth-mode');
    $('#bottom-nav').classList.add('hidden');
    $('#app-view').scrollTop = 0;
    $('#app-view').innerHTML =
      '<div class="page auth-page">' +
        '<div class="auth-art"><div class="auth-orb">' + ICON.box + '</div>' +
          '<h1>收纳小管家</h1><p>让每件物品，都有迹可循</p></div>' +
        '<div class="auth-card">' +
          '<div class="segment">' +
            '<button data-action="auth-tab" data-value="login" class="' + (state.authTab === 'login' ? 'active' : '') + '">登录</button>' +
            '<button data-action="auth-tab" data-value="register" class="' + (state.authTab === 'register' ? 'active' : '') + '">注册</button>' +
          '</div>' +
          '<form id="auth-form">' +
            '<div class="field"><label>用户名</label><input id="auth-username" autocomplete="username" placeholder="请输入用户名"></div>' +
            (state.authTab === 'register'
              ? '<div class="field"><label>昵称（选填）</label><input id="auth-nickname" placeholder="希望我们怎么称呼你"></div>' : '') +
            '<div class="field"><label>密码</label><div class="pwd-wrap">' +
              '<input id="auth-password" type="password" autocomplete="current-password" placeholder="请输入密码">' +
              '<button type="button" class="pwd-eye" data-action="toggle-pwd" data-target="auth-password" aria-label="显示密码">' + ICON.eyeOff + '</button></div></div>' +
            (state.authTab === 'register'
              ? '<div class="field"><label>确认密码</label><div class="pwd-wrap">' +
                '<input id="auth-password2" type="password" autocomplete="new-password" placeholder="请再次输入密码">' +
                '<button type="button" class="pwd-eye" data-action="toggle-pwd" data-target="auth-password2" aria-label="显示密码">' + ICON.eyeOff + '</button></div></div>' : '') +
            '<div class="form-error" id="auth-error"></div>' +
            '<button type="submit" class="btn primary block">' + (state.authTab === 'login' ? '登录' : '注册并进入') + '</button>' +
          '</form>' +
        '</div>' +
        '<div class="auth-foot">数据保存在当前设备中 · 无需联网</div>' +
      '</div>';
  }

  /* ---------------- Navigation ---------------- */

  function navHTML() {
    function item(key, label, icon) {
      return '<button class="nav-item ' + (state.view === key ? 'active' : '') + '" data-nav="' + key + '">' +
        icon + '<span>' + label + '</span></button>';
    }
    return item('home', '首页', ICON.home) + item('hub', '功能', ICON.grid) +
      '<button class="nav-add" data-action="add-item" aria-label="添加物品">' + ICON.plus + '</button>' +
      item('device', '联动', ICON.signal) + item('profile', '我的', ICON.user);
  }

  function renderApp(forceTop) {
    const scroller = $('#app-view');
    const changed = forceTop || lastView !== state.view;
    const prevScroll = (!forceTop && lastView === state.view) ? scroller.scrollTop : 0;
    applySettings();
    document.body.classList.remove('auth-mode');
    $('#bottom-nav').classList.remove('hidden');
    $('#bottom-nav').innerHTML = navHTML();
    scroller.innerHTML = viewHTML();
    applyLanguage();
    scroller.scrollTop = prevScroll;
    lastView = state.view;
    if (changed) animateNumbers();
    if (state.view === 'device' && state.deviceMapOpen) setTimeout(initDeviceMap, 80);
  }

  function viewHTML() {
    if (state.view === 'alerts') return alertsHTML();
    if (state.view === 'guide') return guideHTML();
    if (state.view === 'community') return communityHTML();
    if (state.view === 'chat') return chatHTML();
    if (state.view === 'location') return locationHTML();
    if (state.view === 'hub') return hubHTML();
    if (state.view === 'device') return deviceHTML();
    if (state.view === 'profile') return profileHTML();
    return homeHTML();
  }

  function greeting() {
    const h = new Date().getHours();
    if (h < 6) return '夜深了';
    if (h < 11) return '早上好';
    if (h < 14) return '中午好';
    if (h < 18) return '下午好';
    return '晚上好';
  }

  function attentionItems() {
    return getUserItems().filter(function (i) {
      const k = expiryInfo(i).key;
      return k === 'expired' || k === 'danger' || k === 'warn';
    });
  }

  function expiryWarningHTML() {
    const list = sortedItems(attentionItems());
    if (!list.length) return '';
    const top = list[0];
    const info = expiryInfo(top);
    const expiredCount = list.filter(function (i) { return expiryInfo(i).key === 'expired'; }).length;
    let headline;
    if (expiredCount) headline = '有 ' + expiredCount + ' 件物品已过期，请尽快处理';
    else headline = '「' + top.name + '」' + (info.days === 0 ? '今天到期' : '还有 ' + info.days + ' 天到期');
    const more = list.length > 1 ? ' 等 ' + list.length + ' 件' : '';
    return '<button class="expiry-warning" data-action="show-alerts">' +
      '<span class="ew-ico">' + ICON.alert + '</span>' +
      '<span class="ew-text"><b>到期预警</b><span>' + escapeHTML(headline) + more + '</span></span>' +
      '<span class="ew-arrow">›</span></button>';
  }

  /* ---------------- Home ---------------- */

  function vibrate(pattern) {
    if (navigator.vibrate) { try { navigator.vibrate(pattern); } catch (e) { /* ignore */ } }
  }

  function spaceByKey(key) {
    return SPACES.find(function (x) { return x.key === key; }) ||
      (db.customSpaces || []).find(function (x) { return x.key === key; }) ||
      { key: key, label: key, icon: 'box' };
  }

  function spaceCellsHTML() {
    const items = getUserItems();
    const keys = db.spaceKeys || DEFAULT_SPACE_KEYS;
    const cells = keys.map(function (key) {
      const s = spaceByKey(key);
      return {
        key: s.key, label: s.label, icon: ICON[s.icon] ? s.icon : 'box',
        count: items.filter(function (i) { return String(i.location || '').indexOf(s.key) !== -1; }).length
      };
    });
    const shown = state.mapExpanded ? cells : cells.slice(0, 3);
    const more = Math.max(0, cells.length - 3);

    return '<div class="panel space-map" id="space-map-panel">' +
      '<div class="section-head" style="margin:0 0 4px"><h2>我的收纳地图</h2>' +
        '<button class="text-btn" data-action="edit-spaces">' + ICON.edit + ' 自定义</button></div>' +
      '<p class="map-intro">物品按存放位置自动归类；在物品里选择或自定义位置，都会自动更新到地图中。</p>' +
      '<div class="space-grid">' + shown.map(function (c) {
        return '<button class="space-cell ' + (c.count ? '' : 'empty') + '" data-action="space" data-location="' + escapeHTML(c.key) + '">' +
          '<div class="space-icon">' + ICON[c.icon] + '</div>' +
          '<div class="space-name">' + escapeHTML(c.label) + '</div>' +
          '<div class="space-count">' + c.count + '<small> 件</small></div>' +
        '</button>';
      }).join('') + '</div>' +
      (cells.length > 3
        ? '<button class="map-expand" data-action="toggle-map">' + (state.mapExpanded ? '收起地图 ‹' : '展开全部 ' + more + ' 个位置 ›') + '</button>'
        : '') +
      '</div>';
  }

  function achievementLevels() {
    return [
      { min: 0, name: '初出茅庐', next: 5, perk: '解锁「新芽」头像框' },
      { min: 5, name: '收纳新秀', next: 10, perk: '解锁「青叶」头像框 / 名片' },
      { min: 10, name: '整理达人', next: 20, perk: '解锁「达人」头像框 / 徽章' },
      { min: 20, name: '空间大师', next: null, perk: '解锁全套「星海」头像框 / 名片 / 徽章' }
    ];
  }

  const ACH_REWARDS = [
    { key: 'sprout', type: 'frame', name: '新芽头像框', min: 0, cls: 'rw-sprout' },
    { key: 'leaf', type: 'frame', name: '青叶头像框', min: 5, cls: 'rw-leaf' },
    { key: 'leaf', type: 'card', name: '青叶名片', min: 5, cls: 'rw-leaf' },
    { key: 'star', type: 'frame', name: '达人头像框', min: 10, cls: 'rw-star' },
    { key: 'star', type: 'badge', name: '达人徽章', min: 10, cls: 'rw-star' },
    { key: 'galaxy', type: 'frame', name: '星海头像框', min: 20, cls: 'rw-galaxy' },
    { key: 'galaxy', type: 'card', name: '星海名片', min: 20, cls: 'rw-galaxy' },
    { key: 'galaxy', type: 'badge', name: '星海徽章', min: 20, cls: 'rw-galaxy' }
  ];
  const REWARD_LABEL = { frame: '头像框', card: '名片', badge: '徽章' };
  const REWARD_ICON = { frame: 'frame', card: 'card', badge: 'medal' };

  function achIndex(n) {
    const levels = achievementLevels();
    let idx = 0;
    levels.forEach(function (l, i) { if (n >= l.min) idx = i; });
    return idx;
  }
  function itemCountOf(userId) {
    return db.items.filter(function (i) { return i.userId === userId; }).length;
  }
  function rewardUnlocked(r, n) { return n >= r.min; }
  function equippedOf(user) {
    const e = (user && user.equipped) || {};
    return { frame: e.frame || '', card: e.card || '', badge: e.badge || '' };
  }
  function rewardByKey(type, key) {
    return ACH_REWARDS.find(function (r) { return r.type === type && r.key === key; }) || null;
  }
  function rewardPill(r, n) {
    const on = rewardUnlocked(r, n);
    return '<span class="reward-pill ' + (on ? 'on ' : '') + r.cls + '">' +
      (on ? ICON[REWARD_ICON[r.type]] : ICON.lock) + '<span>' + escapeHTML(r.name) + '</span></span>';
  }

  function achievementHTML() {
    const n = getUserItems().length;
    const levels = achievementLevels();
    const idx = achIndex(n);
    const cur = levels[idx];
    const next = cur.next;
    const pct = next ? Math.round((n - cur.min) / (next - cur.min) * 100) : 100;
    return '<button class="panel achievement" data-action="show-achievements" style="width:100%;text-align:left">' +
      '<div class="ach-badge">' + ICON.trophy + '</div>' +
      '<div class="ach-info">' +
        '<div class="ach-title">' + cur.name + '<small>等级 ' + (idx + 1) + '</small></div>' +
        '<div class="ach-sub">' + (next ? '再收纳 ' + (next - n) + ' 件即可升级解锁新装扮' : '已达最高等级，全部装扮已解锁') + '</div>' +
        '<div class="ach-bar"><div class="ach-fill" style="width:' + pct + '%"></div></div>' +
      '</div><div class="ach-level">' + n + ' 件<span class="ach-more">›</span></div>' +
      '</button>';
  }

  function showAchievements() {
    const user = currentUser();
    const n = getUserItems().length;
    const levels = achievementLevels();
    const curIdx = achIndex(n);
    const eq = equippedOf(user);
    const types = ['frame', 'card', 'badge'];
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>成就等级</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">已收纳 ' + n + ' 件物品 · 升级解锁头像框 / 名片 / 徽章，佩戴后好友可见</p>' +
        levels.map(function (l, i) {
          const unlocked = n >= l.min;
          return '<div class="ach-row' + (unlocked ? ' unlocked' : '') + (i === curIdx ? ' current' : '') + '">' +
            '<span class="ach-row-ico">' + (unlocked ? ICON.trophy : ICON.lock) + '</span>' +
            '<span class="ach-row-info"><b>' + l.name + '</b><small>等级 ' + (i + 1) + ' · ' + l.perk + '</small>' +
              '<em>' + (unlocked ? (i === curIdx ? '当前等级' : '已解锁') : '收纳满 ' + l.min + ' 件解锁') + '</em></span>' +
            (i === curIdx ? '<span class="ach-row-tag">当前</span>' : '') +
          '</div>';
        }).join('') +
        '<h4 class="rw-title">我的装扮 · 点击佩戴</h4>' +
        types.map(function (type) {
          const list = ACH_REWARDS.filter(function (r) { return r.type === type; });
          return '<div class="rw-group"><div class="rw-group-label">' + REWARD_LABEL[type] + '</div>' +
            '<div class="rw-options">' + list.map(function (r) {
              const on = rewardUnlocked(r, n);
              const worn = eq[type] === r.key;
              return '<button class="rw-opt ' + (on ? 'on ' : 'locked ') + r.cls + (worn ? ' worn' : '') + '" ' +
                (on ? 'data-action="equip-reward" data-type="' + type + '" data-key="' + r.key + '"' : 'disabled') + '>' +
                '<span class="rw-ico">' + (on ? ICON[REWARD_ICON[type]] : ICON.lock) + '</span>' +
                '<span class="rw-name">' + escapeHTML(r.name) + '</span>' +
                (worn ? '<i>佩戴中</i>' : (on ? '' : '<i>' + r.min + '件</i>')) +
              '</button>';
            }).join('') + '</div></div>';
        }).join('') +
        '<div class="sheet-actions"><button class="btn primary block" data-action="add-item">去添加物品升级</button></div>' +
      '</div></div>';
  }

  function frameClassOf(user, n) {
    const key = equippedOf(user).frame;
    const r = key ? rewardByKey('frame', key) : null;
    return (r && rewardUnlocked(r, n)) ? ' ' + r.cls : '';
  }
  function badgeOf(user, n) {
    const key = equippedOf(user).badge;
    const r = key ? rewardByKey('badge', key) : null;
    return (r && rewardUnlocked(r, n))
      ? '<span class="ach-badge-decor ' + r.cls + '" title="' + escapeHTML(r.name) + '">' + ICON.medal + '</span>' : '';
  }
  function equippedCardOf(user, n) {
    const key = equippedOf(user).card;
    const r = key ? rewardByKey('card', key) : null;
    return (r && rewardUnlocked(r, n)) ? r : null;
  }
  function wrapCard(inner, user, n) {
    const r = equippedCardOf(user, n);
    if (!r) return inner;
    const tag = '<span class="card-name-tag">' + ICON.card + ' ' + escapeHTML(r.name) + ' · LV' + (achIndex(n) + 1) + '</span>';
    return '<div class="ach-card-decor ' + r.cls + '">' + inner + tag + '</div>';
  }

  function ringHTML(item) {
    const exp = expiryInfo(item);
    const C = 2 * Math.PI * 25;
    const colors = { fresh: '#7ba48d', soon: '#c9b06a', warn: '#d59275', danger: '#d07f72', expired: '#bf6f68', none: '#c9c3b9' };
    let ratio = 1, label = '∞', sub = '无期限', color = colors.none;
    if (item.expiryDate && item.storedAt) {
      const span = (new Date(item.expiryDate + 'T00:00:00') - new Date(item.storedAt + 'T00:00:00')) / 86400000;
      const remain = exp.days;
      ratio = span > 0 ? Math.max(0, Math.min(1, remain / span)) : 0;
      label = remain < 0 ? String(Math.abs(remain)) : String(remain);
      sub = remain < 0 ? '已过期' : '天';
      color = colors[exp.key];
    }
    const offset = C * (1 - ratio);
    return '<div class="ring-wrap ' + (exp.key === 'none' ? 'none' : '') + '" title="' + escapeHTML(exp.label) + '">' +
      '<svg class="ring" viewBox="0 0 60 60">' +
        '<circle class="ring-track" cx="30" cy="30" r="25"></circle>' +
        '<circle class="ring-value" cx="30" cy="30" r="25" stroke="' + color + '" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + offset.toFixed(1) + '"></circle>' +
      '</svg>' +
      '<div class="ring-label" style="color:' + color + '"><span>' + label + '</span><small>' + sub + '</small></div>' +
      '</div>';
  }

  function animateNumbers() {
    $$('.hstat-num[data-count]').forEach(function (el) {
      const target = parseInt(el.dataset.count, 10) || 0;
      if (!target) { el.textContent = '0'; return; }
      const start = performance.now();
      const duration = 720;
      function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function celebrate(message) {
    vibrate([12, 40, 18]);
    toast('✓ ' + (message || '收纳成功') + '，又一件物品找到家了', 'success');
  }

  function homeHTML() {
    const user = currentUser();
    const name = (user.profile && user.profile.name) || user.username;
    const items = getUserItems();
    const cats = new Set(items.map(function (i) { return i.category; })).size;
    const hist = searchHistory();
    const histShown = state.searchExpanded ? hist : hist.slice(0, 5);

    return '' +
      '<div class="page">' +
        '<div class="hero">' +
          '<div class="hero-top"><div><div class="hero-greeting">' + greeting() + '</div>' +
            '<div class="hero-name">' + escapeHTML(name) + '</div></div>' +
            '<div class="hero-avatar">' + escapeHTML(name.charAt(0).toUpperCase()) + '</div></div>' +
          '<div class="hero-stats">' +
            '<button class="hstat" data-action="show-all-items"><div class="hstat-num" data-count="' + items.length + '">' + items.length + '</div><div class="hstat-label">已收纳物品 ›</div></button>' +
            '<button class="hstat alert' + (attentionItems().length ? ' pulse' : '') + '" data-action="show-alerts"><div class="hstat-num" data-count="' + attentionItems().length + '">' + attentionItems().length + '</div><div class="hstat-label">到期提醒 ›</div></button>' +
            '<button class="hstat" data-action="show-categories"><div class="hstat-num" data-count="' + cats + '">' + cats + '</div><div class="hstat-label">物品分类 ›</div></button>' +
          '</div>' +
          '<button class="hero-add" data-action="add-item">' + ICON.plus + ' 添加物品</button>' +
        '</div>' +
        expiryWarningHTML() +
        '<div class="items-section" id="items-section">' +
          '<div class="section-head items-section-head">' +
            '<h2>我的物品 <em class="count-pill">' + items.length + ' 件</em></h2>' +
            '<button class="items-panel-head text-btn" data-action="toggle-items">' + (state.itemsOpen ? '收起 ‹' : '展开 ›') + '</button>' +
          '</div>' +
          '<div class="panel items-panel">' +
            '<div class="search-feature">' +
              '<div class="sf-title">' + ICON.search + '<span>搜索我的物品</span></div>' +
              '<div class="search-bar home-search">' +
                '<input id="search-input" placeholder="名称 / 位置 / 备注 / 分类" value="' + escapeHTML(state.search) + '">' +
                (state.search ? '<button class="search-cancel" data-action="cancel-search">取消</button>' : '') +
              '</div>' +
              (hist.length ? '<div class="search-history">' +
                '<div class="sh-row">' + histShown.map(function (h) {
                  return '<button class="sh-chip" data-action="use-history" data-value="' + escapeHTML(h) + '">' + escapeHTML(h) + '</button>';
                }).join('') + '</div>' +
                '<div class="sh-tools">' +
                  (hist.length > 5 ? '<button data-action="toggle-history">' + (state.searchExpanded ? '收起' : '展开') + '</button>' : '') +
                  '<button data-action="clear-history" title="清空搜索历史">' + ICON.trash + '</button>' +
                '</div>' +
              '</div>' : '') +
            '</div>' +
            (state.itemsOpen ?
              '<div class="chips">' +
                chip('all', '全部') + chip('attention', '临期提醒') + chip('expired', '已过期') + chip('none', '无保质期') +
              '</div>' +
              '<div class="sort-row"><span>排列顺序</span>' +
                sortBtn('expiry', '到期优先') + sortBtn('alpha', 'A-Z 字母') + sortBtn('newest', '最近收纳') +
              '</div>' +
              alphabetBar() +
              searchResultNoticeHTML() +
              '<div id="list-area">' + listHTML() + '</div>' : '') +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function locationHTML() {
    const key = state.locationKey || '';
    const s = spaceByKey(key);
    const list = getUserItems().filter(function (i) {
      return String(i.location || '').indexOf(key) !== -1;
    });
    const sorted = sortedItems(list);
    return '<div class="page location-page">' +
      '<div class="section-head" style="margin-top:12px">' +
        '<button class="icon-btn" data-action="back" title="返回">' + ICON.back + '</button>' +
        '<h2 style="flex:1;margin-left:8px">' + escapeHTML(s.label) + '</h2>' +
        '<span>共 ' + list.length + ' 件</span></div>' +
      '<div class="location-hero">' +
        '<div class="location-hero-ico">' + (ICON[s.icon] || ICON.box) + '</div>' +
        '<div><h1>' + escapeHTML(s.label) + '</h1>' +
          '<p>这里收纳了 ' + list.length + ' 件物品，点卡片可展开详情</p></div></div>' +
      '<div class="location-actions">' +
        '<button class="btn soft" data-action="add-item-at-location" data-location="' + escapeHTML(key) + '">' + ICON.plus + ' 添加物品到这里</button>' +
      '</div>' +
      (sorted.length
        ? '<div class="item-list">' + sorted.map(itemCard).join('') + '</div>'
        : '<div class="empty"><div class="empty-orb">' + ICON[s.icon] + '</div>' +
          '<h3>这里还没有物品</h3><p>点上方按钮添加第一件物品</p>' +
          '<button class="btn soft" data-action="add-item-at-location" data-location="' + escapeHTML(key) + '">添加物品</button></div>') +
      '</div>';
  }

  function searchResultNoticeHTML() {
    const q = state.search.trim();
    if (!q) return '';
    const n = visibleItems().length;
    return '<div class="search-result-notice" id="search-result-notice">' +
      ICON.search + '<span>搜索「' + escapeHTML(q) + '」· 找到 <b>' + n + '</b> 件物品</span></div>';
  }

  function sortBtn(value, label) {
    return '<button class="sort-btn ' + (state.sortBy === value ? 'on' : '') + '" data-action="set-sort" data-value="' + value + '">' + label + '</button>';
  }

  function alphabetBar() {
    if (state.sortBy !== 'alpha') return '';
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z', '#'];
    const used = {};
    getUserItems().forEach(function (i) { used[pinyinInitial(i.name)] = true; });
    return '<div class="alpha-bar">' + letters.map(function (l) {
      return '<button class="' + (used[l] ? 'has' : '') + (state.letter === l ? ' on' : '') + '" data-action="set-letter" data-value="' + l + '">' + l + '</button>';
    }).join('') + '</div>';
  }

  function chip(value, label) {
    return '<button class="chip ' + (state.filter === value ? 'active' : '') + '" data-action="filter" data-value="' + value + '">' + label + '</button>';
  }

  function sortedItems(items) {
    const rank = { expired: 0, danger: 1, warn: 2, soon: 3, fresh: 4, none: 5 };
    const arr = items.slice();
    if (state.sortBy === 'alpha') {
      return arr.sort(function (a, b) {
        const la = pinyinInitial(a.name), lb = pinyinInitial(b.name);
        if (la !== lb) return PY_LETTERS.indexOf(la) - PY_LETTERS.indexOf(lb);
        return String(a.name).localeCompare(String(b.name), 'zh-CN');
      });
    }
    if (state.sortBy === 'newest') {
      return arr.sort(function (a, b) { return String(b.storedAt || '').localeCompare(String(a.storedAt || '')); });
    }
    return arr.sort(function (a, b) {
      const ea = expiryInfo(a), eb = expiryInfo(b);
      if (rank[ea.key] !== rank[eb.key]) return rank[ea.key] - rank[eb.key];
      if (ea.days !== null && eb.days !== null && ea.days !== eb.days) return ea.days - eb.days;
      return String(b.storedAt || '').localeCompare(String(a.storedAt || ''));
    });
  }

  function visibleItems() {
    let list = sortedItems(getUserItems());
    const q = state.search.trim().toLowerCase();
    if (q) {
      list = list.filter(function (i) {
        return [i.name, i.location, i.notes, catOf(i.category).label].join(' ').toLowerCase().indexOf(q) !== -1;
      });
    }
    if (state.letter && state.sortBy === 'alpha') {
      list = list.filter(function (i) { return pinyinInitial(i.name) === state.letter; });
    }
    if (state.filter === 'attention') {
      list = list.filter(function (i) { return ['expired', 'danger', 'warn'].indexOf(expiryInfo(i).key) !== -1; });
    } else if (state.filter === 'expired') {
      list = list.filter(function (i) { return expiryInfo(i).key === 'expired'; });
    } else if (state.filter === 'none') {
      list = list.filter(function (i) { return !i.expiryDate; });
    }
    return list;
  }

  function listHTML() {
    const list = visibleItems();
    const all = getUserItems();
    if (!list.length) {
      const emptyAll = all.length === 0;
      return '<div class="empty"><div class="empty-orb">' + ICON.box + '</div>' +
        '<h3>' + (emptyAll ? '还没有收纳物品' : '没有符合条件的物品') + '</h3>' +
        '<p>' + (emptyAll ? '点击下方 + 按钮，记录第一件物品' : '试试更换搜索词或筛选条件') + '</p>' +
        (emptyAll ? '<button class="btn soft" data-action="sample">载入示例数据</button>' : '') + '</div>';
    }
    if (state.sortBy === 'alpha') {
      let cur = '';
      return '<div class="item-list">' + list.map(function (item) {
        const l = pinyinInitial(item.name);
        let head = '';
        if (l !== cur) { cur = l; head = '<div class="alpha-head">' + l + '</div>'; }
        return head + itemCard(item);
      }).join('') + '</div>';
    }
    return '<div class="item-list">' + list.map(itemCard).join('') + '</div>';
  }

  function photoGalleryHTML(item) {
    const p = item.photos || {};
    const groups = [
      { key: 'item', label: '物品照片', list: p.item || [] },
      { key: 'location', label: '存放地点照片', list: p.location || [] },
      { key: 'expiry', label: '保质期照片', list: p.expiry || [] }
    ];
    const blocks = groups.filter(function (g) { return g.list.length; }).map(function (g) {
      return '<div class="gallery-group"><b>' + g.label + '</b><div class="gallery-row">' +
        g.list.map(function (src) { return '<img src="' + src + '" alt="' + g.label + '">'; }).join('') +
        '</div></div>';
    }).join('');
    return blocks ? '<div class="photo-gallery">' + blocks + '</div>' : '';
  }

  function itemPhotoOf(item) {
    const p = item.photos || {};
    return (p.item && p.item[0]) || item.photo || autoItemImage(item);
  }

  function itemLocationPhotoOf(item) {
    const p = item.photos || {};
    return (p.location && p.location[0]) || '';
  }

  function statusForItem(item) {
    const exp = expiryInfo(item);
    const qty = parseInt(item.quantity, 10) || 1;
    if (exp.key === 'expired') return { text: '已过期', cls: 'expired' };
    if (exp.key === 'danger' || exp.key === 'warn') return { text: '即将过期', cls: 'warning' };
    // 只有食品、药品这类消耗品才提示补货；其他物品低数量属于正常，不提示
    const consumable = item.category === 'food' || item.category === 'medicine';
    if (qty <= 1 && consumable) return { text: '建议补货', cls: 'restock' };
    return { text: '库存充足', cls: 'ok' };
  }

  function itemCard(item) {
    const cat = catOf(item.category);
    const exp = expiryInfo(item);
    const status = statusForItem(item);
    const unit = item.unit || '件';
    const alphaBadge = state.sortBy === 'alpha'
      ? '<span class="card-letter">' + pinyinInitial(item.name) + '</span>' : '';
    const locationPhoto = itemLocationPhotoOf(item);
    return '' +
      '<article class="item-card" data-card="' + item.id + '">' +
        '<div class="item-row">' +
          '<img class="item-photo" src="' + itemPhotoOf(item) + '" alt="' + escapeHTML(item.name) + '">' +
          '<div class="item-text">' +
            '<div class="item-top">' +
              (state.search ? '<button class="card-cancel" data-action="cancel-search">取消</button>' : alphaBadge) +
              '<h3 class="item-title">' + escapeHTML(translateText(item.name)) + '</h3>' +
              '<span class="item-flag ' + status.cls + '">' + escapeHTML(translateText(status.text)) + '</span>' +
            '</div>' +
            '<p class="item-subline"><i class="cat-dot" style="background:' + cat.color + '"></i>' +
              escapeHTML(translateText(cat.label)) + ' · ' + escapeHTML(translateText(item.location || '未设置位置')) + '</p>' +
            '<div class="item-actions">' +
              '<button class="icon-btn" data-action="find-item" data-id="' + item.id + '" title="一键查找">' + ICON.pin + '</button>' +
              '<button class="icon-btn" data-action="edit-item" data-id="' + item.id + '">' + ICON.edit + '</button>' +
              '<button class="icon-btn" data-action="delete-item" data-id="' + item.id + '">' + ICON.trash + '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="item-foot">' +
          '<span class="expiry ' + exp.key + '">' + (exp.key === 'expired' || exp.key === 'danger' ? ICON.alert : ICON.clock) + escapeHTML(exp.label) + '</span>' +
          '<span class="expand-hint">点击查看详情 ›</span>' +
        '</div>' +
        '<div class="card-more">' +
          '<div class="more-grid">' +
            '<div class="more-cell"><dt>数量</dt><dd>' + escapeHTML(item.quantity || 1) + ' ' + escapeHTML(unit) + '</dd></div>' +
            '<div class="more-cell"><dt>收纳日期</dt><dd>' + formatDate(item.storedAt) + '</dd></div>' +
            '<div class="more-cell"><dt>到期日期</dt><dd>' + (item.expiryDate ? formatDate(item.expiryDate) : '无保质期') + '</dd></div>' +
            '<div class="more-cell"><dt>所属分类</dt><dd>' + escapeHTML(cat.label) + '</dd></div>' +
          '</div>' +
          (locationPhoto ? '<div class="detail-location"><b>存放位置照片</b><img src="' + locationPhoto + '" alt="存放位置照片"></div>' : '') +
          ringHTML(item) +
          photoGalleryHTML(item) +
          (item.notes ? '<p class="item-note">' + escapeHTML(item.notes) + '</p>' : '') +
          (state.search ? '<button class="card-cancel-foot" data-action="cancel-search">取消搜索</button>' : '') +
        '</div>' +
      '</article>';
  }

  function spaceOptHTML(s, keys) {
    const on = keys.indexOf(s.key) !== -1;
    return '<button class="space-opt ' + (on ? 'on' : '') + '" data-action="toggle-space" data-key="' + escapeHTML(s.key) + '">' +
      ICON[s.icon] + '<span>' + escapeHTML(s.label) + '</span>' + (on ? '<i>✓</i>' : '') + '</button>';
  }

  function openSpaceEditor() {
    const keys = db.spaceKeys || DEFAULT_SPACE_KEYS;
    const custom = (db.customSpaces || []).map(function (s) {
      return { key: s.key, label: s.label, icon: s.icon || 'box', custom: true };
    });
    const all = SPACES.map(function (s) { return Object.assign({}, s, { custom: false }); }).concat(custom);
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>自定义收纳地图</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">选择想显示在首页的格子（至少 3 个），点一下即时生效不会闪动；也可添加自定义地点。</p>' +
        '<div class="space-editor" id="space-editor">' + all.map(function (s) { return spaceOptHTML(s, keys); }).join('') + '</div>' +
        '<div class="custom-space-add"><input id="custom-space-input" maxlength="10" placeholder="输入自定义地点名称，如「琴房」">' +
          '<button class="btn soft" data-action="add-custom-space">' + ICON.plus + ' 添加</button></div>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="reset-spaces">恢复默认</button>' +
          '<button class="btn primary" data-action="close-sheet">完成</button></div>' +
      '</div></div>';
  }

  function openDeviceEditor(id) {
    const d = db.devices.find(function (x) { return x.id === id; });
    if (!d) return;
    const animal = d.animal || 'cat';
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>自定义定位标签</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="field"><label>标签名称</label><input id="dev-name" value="' + escapeHTML(d.name) + '" maxlength="20" placeholder="给标签起个名字"></div>' +
        '<div class="field"><label>选择动物形象</label>' +
          '<div class="animal-picker">' + ANIMAL_CHOICES.map(function (a) {
            return '<label class="animal-opt"><input type="radio" name="dev-animal" value="' + a.key + '" ' + (animal === a.key ? 'checked' : '') + '>' +
              '<span>' + ICON['a_' + a.key] + '<small>' + a.label + '</small></span></label>';
          }).join('') + '</div>' +
        '</div>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
          '<button class="btn primary" data-action="save-device" data-id="' + d.id + '">保存</button></div>' +
      '</div></div>';
    const hidden = document.createElement('input');
    hidden.type = 'hidden'; hidden.id = 'dev-animal'; hidden.value = animal;
    $('.sheet').appendChild(hidden);
    $$('.animal-opt input').forEach(function (r) {
      r.addEventListener('change', function () { hidden.value = r.value; });
    });
  }

  /* ---------------- Alerts & Guide ---------------- */

  function alertsHTML() {
    const list = sortedItems(attentionItems());
    return '<div class="page">' +
      '<div class="section-head" style="margin-top:12px">' +
        '<button class="icon-btn" data-action="back">' + ICON.back + '</button>' +
        '<h2 style="flex:1;margin-left:6px">到期提醒</h2><span>' + list.length + ' 件</span></div>' +
      (list.length ? '<div class="alert-banner">' + ICON.alert + '<div><b>这些物品需要留意</b><span>临期与过期物品会自动排在最前</span></div></div>' : '') +
      '<div id="list-area">' + (list.length
        ? '<div class="item-list">' + list.map(itemCard).join('') + '</div>'
        : '<div class="empty"><div class="empty-orb">' + ICON.bell + '</div><h3>暂时没有需要提醒的物品</h3><p>有保质期的物品临近到期时会显示在这里</p></div>') +
      '</div></div>';
  }

  function guideImage(kind) {
    const phone = function (inner) {
      return '<svg viewBox="0 0 220 150" class="guide-svg" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="66" y="6" width="88" height="138" rx="14" fill="#fffcf7" stroke="#cdded2" stroke-width="2"/>' +
        '<rect x="76" y="14" width="68" height="8" rx="4" fill="#e4efe7"/>' +
        '<rect x="76" y="126" width="68" height="10" rx="5" fill="#e4efe7"/>' +
        inner + '</svg>';
    };
    const tap = '<g><circle cx="152" cy="96" r="11" fill="#d59275" opacity=".28"/><circle cx="152" cy="96" r="5" fill="#c9805f"/><path d="M152 96l10-12" stroke="#c9805f" stroke-width="2" stroke-linecap="round"/></g>';
    let inner = '';
    if (kind === 'add') {
      inner = '<rect x="76" y="30" width="68" height="20" rx="5" fill="#dbece0"/><rect x="80" y="34" width="26" height="6" rx="3" fill="#9dbdaa"/>' +
        '<rect x="76" y="56" width="68" height="10" rx="4" fill="#f0ece4"/><rect x="76" y="70" width="52" height="10" rx="4" fill="#f0ece4"/>' +
        '<rect x="76" y="92" width="68" height="18" rx="9" fill="#4f7a63"/><text x="110" y="104" font-size="8" fill="#fff" text-anchor="middle">＋ 添加物品</text>' + tap;
    } else if (kind === 'map') {
      inner = '<rect x="76" y="30" width="68" height="9" rx="4" fill="#9dbdaa"/>' +
        '<rect x="76" y="44" width="31" height="27" rx="6" fill="#e4efe7" stroke="#7ba48d"/><rect x="113" y="44" width="31" height="27" rx="6" fill="#e4efe7" stroke="#7ba48d"/>' +
        '<rect x="76" y="76" width="31" height="27" rx="6" fill="#e4efe7" stroke="#7ba48d"/><rect x="113" y="76" width="31" height="27" rx="6" fill="#e4efe7" stroke="#7ba48d"/>' +
        '<text x="91" y="61" font-size="9" fill="#4f7a63" text-anchor="middle">冰箱</text><text x="128" y="61" font-size="9" fill="#4f7a63" text-anchor="middle">柜子</text>' + tap;
    } else if (kind === 'find') {
      inner = '<circle cx="110" cy="72" r="34" fill="#edf5ec" stroke="#cdded2"/><circle cx="110" cy="72" r="20" fill="none" stroke="#9dbdaa" stroke-dasharray="3 3"/>' +
        '<circle cx="110" cy="72" r="7" fill="#4f7a63"/><text x="110" y="76" font-size="6" fill="#fff" text-anchor="middle">我</text>' +
        '<circle cx="92" cy="56" r="8" fill="#d59275"/><circle cx="132" cy="88" r="8" fill="#7ba48d"/>' + tap;
    } else {
      inner = '<rect x="76" y="30" width="68" height="10" rx="5" fill="#dbece0"/>' +
        '<circle cx="86" cy="54" r="8" fill="#f0ece4"/><rect x="98" y="49" width="40" height="5" rx="2" fill="#e0d8cc"/><rect x="98" y="58" width="28" height="4" rx="2" fill="#ece5da"/>' +
        '<circle cx="86" cy="78" r="8" fill="#f0ece4"/><rect x="98" y="73" width="40" height="5" rx="2" fill="#e0d8cc"/><rect x="98" y="82" width="24" height="4" rx="2" fill="#ece5da"/>' +
        '<rect x="76" y="96" width="68" height="18" rx="9" fill="#e4efe7"/>' + tap;
    }
    return phone(inner);
  }

  function guideHTML() {
    return '<div class="page">' +
      '<div class="section-head" style="margin-top:12px">' +
        '<button class="icon-btn" data-action="back">' + ICON.back + '</button>' +
        '<h2 style="flex:1;margin-left:6px">使用指南</h2></div>' +
      '<div class="guide-hero"><h1>轻松上手</h1><p>跟着图解一步步操作，记录收纳更省心</p></div>' +
      step('1', '认识首页', '① 首页顶部看已收纳、到期提醒和分类数量 → ② 「我的物品」里搜索栏始终显示 → ③ 点展开查看物品卡片、状态提醒和位置照片。', 'home') +
      step('2', '添加物品与 AI 识别', '① 底部「＋」打开添加页 → ② 拍照后点 AI 识别，自动填写物品名称和分类 → ③ 设置数量和单位、日期 → ④ 右上角保存。', 'add') +
      step('3', '用地图找东西', '① 底部「功能」→「收纳地图」 → ② 点冰箱 / 柜子等格子查看该位置的全部物品 → ③ 点卡片展开详情、编辑或删除。', 'map') +
      step('4', '到期提醒', '① 首页到期提醒统计卡直接显示待处理数量 → ② 功能中心进入到期提醒 → ③ 红色、橙色、浅黄分别代表不同紧急程度 → ④ 在我的 → 通知时间可自由设置提醒时间。', 'alerts') +
      step('5', '一键查找物品', '① 底部「联动」→ ② 给物品绑定蓝牙标签 → ③ 点「一键查找」，地图会响铃并显示物品位置。', 'find') +
      step('6', '个性化设置与语言', '① 底部「我的」→ ② 界面设置可调整字体大小、字重和主题色 → ③ 语言可选跟随系统、简体中文、繁體中文和英文。', 'settings') +
      step('7', '加好友与装扮', '① 功能中心进入社区 → ② 用编号 ID 搜索添加好友 → ③ 升级成就解锁头像框 / 名片 / 徽章，在成就等级里佩戴，好友可见。', 'social') +
      '<h3 class="card-title">颜色说明</h3>' +
      '<div class="legend">' +
        '<span class="expiry fresh">绿色 · 新鲜</span><span class="expiry soon">浅黄 · 30 天内</span>' +
        '<span class="expiry warn">橙色 · 7 天内</span><span class="expiry danger">红色 · 3 天内</span>' +
        '<span class="expiry expired">深红 · 已过期</span><span class="expiry none">灰色 · 无保质期</span>' +
      '</div></div>';
  }

  function step(num, title, desc, kind) {
    return '<div class="step step-guide">' +
      '<div class="step-illustration">' + guideImage(kind) + '<span class="step-num">' + num + '</span></div>' +
      '<div class="step-text"><h3>' + title + '</h3><p>' + desc + '</p></div></div>';
  }

  /* ---------------- Function Hub ---------------- */

  function HUB_FEATURES() {
    return [
      { key: 'chat', label: '消息聊天', desc: '和好友群友聊天交流', icon: 'comment', nav: 'chat', color: 'clay' },
      { key: 'community', label: '社区动态', desc: '看看大家的收纳灵感', icon: 'users', nav: 'community', color: 'mint' },
      { key: 'map', label: '收纳地图', desc: '按位置分类快速找东西', icon: 'pin', action: 'open-storage-map', color: 'clay' },
      { key: 'achievement', label: '成就等级', desc: '升级解锁头像框名片徽章', icon: 'trophy', action: 'show-achievements', color: 'mint' },
      { key: 'alerts', label: '到期提醒', desc: '临期物品优先处理', icon: 'bell', nav: 'alerts', color: 'clay' },
      { key: 'guide', label: '使用指南', desc: '分步图解快速上手', icon: 'book', nav: 'guide', color: 'mint' },
      { key: 'install', label: '安装到桌面', desc: '像 App 一样全屏使用', icon: 'install', action: 'install-app', color: 'clay' }
    ];
  }

  function hubTileHTML(f) {
    const attrs = f.action
      ? 'data-action="' + f.action + '"'
      : 'data-action="hub-go" data-nav-target="' + f.nav + '" data-tab="' + (f.tab || '') + '"';
    return '<button class="hub-tile ' + f.color + '" ' + attrs + '>' +
      '<span class="hub-ico">' + (ICON[f.icon] || ICON.grid) + '</span>' +
      '<b>' + escapeHTML(f.label) + '</b><small>' + escapeHTML(f.desc) + '</small>' +
    '</button>';
  }

  function hubHTML() {
    const q = (state.hubSearch || '').trim().toLowerCase();
    const all = HUB_FEATURES();
    const list = q ? all.filter(function (f) {
      return (f.label + f.desc + f.key).toLowerCase().indexOf(q) !== -1;
    }) : all;
    return '<div class="page hub-page">' +
      '<div class="hub-hero">' + ICON.grid + '<div><h1>功能中心</h1><p>所有功能都在这里，搜一下就能到</p></div></div>' +
      '<div class="search-bar hub-search">' + ICON.search +
        '<input id="hub-search-input" placeholder="搜索功能，如「查找」「地图」「提醒」" value="' + escapeHTML(state.hubSearch || '') + '">' +
        '<button class="search-find" data-action="clear-hub-search">✕</button></div>' +
      '<div class="hub-grid">' + list.map(hubTileHTML).join('') + '</div>' +
      (list.length ? '' : '<div class="empty"><h3>没有找到相关功能</h3><p>试试「查找」「地图」「提醒」</p></div>') +
    '</div>';
  }

  function showStorageMapSheet() {
    const items = getUserItems();
    const keys = db.spaceKeys || DEFAULT_SPACE_KEYS;
    const cells = keys.map(function (key) {
      const sp = spaceByKey(key);
      return { key: sp.key, label: sp.label, icon: ICON[sp.icon] ? sp.icon : 'box',
        count: items.filter(function (i) { return String(i.location || '').indexOf(sp.key) !== -1; }).length };
    });
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>我的收纳地图</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">点一个位置查看这里收纳的物品，也可自定义地点。</p>' +
        '<div class="space-grid sheet-space-grid">' + cells.map(function (c) {
          return '<button class="space-cell ' + (c.count ? '' : 'empty') + '" data-action="space" data-location="' + escapeHTML(c.key) + '">' +
            '<div class="space-icon">' + ICON[c.icon] + '</div>' +
            '<div class="space-name">' + escapeHTML(c.label) + '</div>' +
            '<div class="space-count">' + c.count + '<small> 件</small></div>' +
          '</button>';
        }).join('') + '</div>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="edit-spaces">自定义地点</button>' +
          '<button class="btn primary" data-action="close-sheet">关闭</button></div>' +
      '</div></div>';
  }

  /* ---------------- Community ---------------- */

  function communityHTML() {
    return '<div class="page">' +
      '<div class="section-head community-head" style="margin-top:12px">' +
        '<button class="icon-btn" data-action="back" title="返回">' + ICON.back + '</button>' +
        '<h2 style="flex:1;margin-left:8px">社区动态</h2>' +
        '<button class="icon-btn" data-action="open-chat-list" title="消息聊天">' + ICON.comment + '</button>' +
      '</div>' +
      '<p class="community-sub">看看大家的收纳灵感与最新动态</p>' +
      '<div id="community-content">' + feedHTML() + '</div>' +
      '<button class="fab-post" data-action="new-post">' + ICON.plus + '</button>' +
      '</div>';
  }

  function chatHTML() {
    return '<div class="page">' +
      '<div class="section-head community-head" style="margin-top:12px">' +
        '<button class="icon-btn" data-action="toggle-friend-sort" title="' + (state.friendSort === 'az' ? translateText('当前 A-Z 排序') : translateText('A-Z 排序')) + '">A↔Z</button>' +
        '<h2 style="flex:1;margin-left:8px">' + translateText('消息聊天') + '</h2>' +
        '<button class="icon-btn" data-action="cycle-friend-group" title="' + escapeHTML(translateText('分组') + '：' + (state.friendGroup || translateText('全部'))) + '">' + ICON.users + '</button>' +
      '</div>' +
      '<div class="chat-filter-tip">' +
        '<span>' + (state.friendSort === 'az' ? 'A → Z' : translateText('默认顺序')) + '</span>' +
        '<span>' + escapeHTML(translateText('分组') + '：' + (state.friendGroup || translateText('全部'))) + '</span>' +
      '</div>' +
      '<button class="chat-add-friend-banner" data-action="open-friends">' + ICON.users +
        '<span><b>' + translateText('添加好友') + '</b><small>' + translateText('用 ID 搜索，或从推荐里一键添加') + '</small></span>' + ICON.back + '</button>' +
      '<div class="chat-list-panel">' + chatListHTML() + '</div>' +
      '</div>';
  }

  function openComments(postId) {
    const post = db.posts.find(function (p) { return p.id === postId; });
    if (!post) return;
    if (!Array.isArray(post.comments)) post.comments = [];
    state.commentPostId = postId;
    closeSheet();
    $('#overlay-root').innerHTML =
      '<div class="full-mask comment-mask">' +
        '<div class="full-head"><button class="back" data-action="close-comments">' + ICON.back + '</button>' +
          '<h2>动态评论</h2><span class="comment-count">' + post.comments.length + ' 条</span></div>' +
        '<div class="comment-body" id="comment-body"></div>' +
        '<form class="chat-input" id="comment-form">' +
          '<input id="comment-text" placeholder="写下你的评论..." autocomplete="off" maxlength="200">' +
          '<button type="submit">' + ICON.send + '</button>' +
        '</form>' +
      '</div>';
    renderComments();
  }

  function renderComments() {
    const body = $('#comment-body');
    if (!body) return;
    const post = db.posts.find(function (p) { return p.id === state.commentPostId; });
    if (!post) return;
    const comments = Array.isArray(post.comments) ? post.comments : [];
    const countEl = $('.comment-count');
    if (countEl) countEl.textContent = comments.length + ' 条';
    const postBlock =
      '<div class="comment-post">' +
        '<div class="post-head"><div class="post-avatar ' + (post.tone || '') + '">' + escapeHTML(post.avatar) + '</div>' +
          '<div><div class="post-name">' + escapeHTML(post.name) + '</div>' +
          '<div class="post-time">' + escapeHTML(post.time) + '</div></div></div>' +
        '<p class="post-text">' + escapeHTML(post.text) + '</p>' +
      '</div>';
    const list = comments.length
      ? '<div class="comment-list">' + comments.map(function (c) {
          return '<div class="comment-item">' +
            '<div class="comment-avatar">' + escapeHTML(c.avatar) + '</div>' +
            '<div class="comment-content"><b>' + escapeHTML(c.name) + '</b>' +
              '<p>' + escapeHTML(c.text) + '</p><time>' + escapeHTML(c.time) + '</time></div>' +
          '</div>';
        }).join('') + '</div>'
      : '<div class="comment-empty">还没有评论，来说第一句吧～</div>';
    body.innerHTML = postBlock + '<div class="comment-divider">全部评论</div>' + list;
  }

  function feedHTML() {
    const posts = db.posts.slice().reverse();
    if (!posts.length) {
      return '<div class="empty"><div class="empty-orb">' + ICON.users + '</div><h3>还没有动态</h3><p>点击右下角按钮发布第一条</p></div>';
    }
    return posts.map(function (p) {
      return '<article class="post-card">' +
        '<div class="post-head"><div class="post-avatar ' + (p.tone || '') + '">' + escapeHTML(p.avatar) + '</div>' +
          '<div><div class="post-name">' + escapeHTML(p.name) + '</div><div class="post-time">' + escapeHTML(p.time) + '</div></div>' +
          (p.tag ? '<span class="post-tag">' + escapeHTML(p.tag) + '</span>' : '') + '</div>' +
        '<p class="post-text">' + escapeHTML(p.text) + '</p>' +
        (p.photo ? '<img class="post-img" src="' + p.photo + '" alt="动态图片">' : '') +
        '<div class="post-actions">' +
          '<button data-action="like" data-id="' + p.id + '" class="' + (p.liked ? 'liked' : '') + '">' + ICON.heart + (p.likes || 0) + '</button>' +
          '<button data-action="comment-post" data-id="' + p.id + '">' + ICON.comment + ' 评论' + ((p.comments && p.comments.length) ? ' ' + p.comments.length : '') + '</button>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function chatListHTML() {
    let chats = allChats();
    const groupFilter = state.friendGroup || '全部';
    if (groupFilter !== '全部') {
      const friendIds = getUserFriends().filter(function (f) {
        return (f.group || '未分组') === groupFilter;
      }).map(function (f) { return 'u_' + f.userId; });
      chats = chats.filter(function (c) { return c.kind !== 'friend' || friendIds.indexOf(c.id) !== -1; });
    }
    if (state.friendSort === 'az') {
      chats.sort(function (a, b) {
        return String(a.name).localeCompare(String(b.name), 'zh-CN');
      });
    }
    return chats.map(function (c) {
      const msgs = db.messages[c.id] || (DEMO_MESSAGES[c.id] || []);
      const lastMsg = msgs.length ? msgs[msgs.length - 1] : null;
      const last = lastMsg ? (lastMsg.type === 'sticker' ? '[贴纸]' : lastMsg.text) : '开始聊天吧';
      return '<div class="chat-row" data-action="open-chat" data-id="' + c.id + '" style="cursor:pointer">' +
        '<div class="chat-avatar ' + (c.tone || '') + '">' + escapeHTML(c.avatar) + '</div>' +
        '<div class="chat-info"><b>' + escapeHTML(c.name) + '</b><p>' + escapeHTML(last) + '</p></div>' +
        '<span class="chat-time">' + (lastMsg ? escapeHTML(lastMsg.time) : '') + '</span>' +
      '</div>';
    }).join('');
  }

  function chatBgStyle() {
    const bg = db.chatBgs[state.chatId];
    if (!bg) return '';
    if (bg.type === 'color') return 'background:' + bg.value + ';';
    return "background-image:url('" + bg.value + "');background-size:cover;background-position:center;";
  }

  function openChat(id) {
    const chat = chatById(id);
    if (!chat) return;
    state.chatId = id;
    state.stickerPanel = '';
    if (!db.messages[id]) db.messages[id] = (DEMO_MESSAGES[id] || []).slice();
    closeSheet();
    const friendUid = chatFriendUserId(id);
    const headAvatar = friendUid
      ? '<button class="chat-head-avatar" data-action="friend-profile" data-id="' + escapeHTML(friendUid) + '" title="查看好友主页">' + escapeHTML(chat.avatar || '友') + '</button>'
      : '<span class="chat-head-avatar">' + escapeHTML(chat.avatar || '群') + '</span>';
    const isGroup = /^g_/.test(id) || (!friendUid && chat.kind !== 'friend');
    const groupTool = isGroup
      ? '<button class="chat-tool" data-action="group-manage" data-id="' + escapeHTML(id) + '" title="群聊管理">⚙</button>'
      : '';
    const friendMenuTool = friendUid
      ? '<button class="chat-tool" data-action="chat-friend-menu" data-id="' + escapeHTML(friendUid) + '" title="更多">⋯</button>'
      : '';
    $('#overlay-root').innerHTML =
      '<div class="full-mask">' +
        '<div class="full-head"><button class="back" data-action="close-chat">' + ICON.back + '</button>' +
          headAvatar +
          '<h2>' + escapeHTML(chat.name) + (friendUid ? '<small class="chat-head-tip">点头像看资料</small>' : '') + '</h2>' +
          groupTool +
          friendMenuTool +
          '<button class="chat-tool" data-action="chat-bg" title="更换背景">' + ICON.sparkle + '</button></div>' +
        '<div class="chat-body" id="chat-body" style="' + chatBgStyle() + '"></div>' +
        '<div class="emoji-panel" id="emoji-panel"></div>' +
        '<form class="chat-input" id="chat-form">' +
          '<button type="button" class="chat-tool" data-action="emoji-panel" title="表情">' + ICON.heart + '</button>' +
          '<button type="button" class="chat-tool" data-action="sticker-panel" title="表情包">' + ICON.tag + '</button>' +
          '<input id="chat-text" placeholder="说点什么..." autocomplete="off">' +
          '<button type="submit">' + ICON.send + '</button>' +
        '</form>' +
      '</div>';
    renderChatBody();
  }

  function renderChatBody() {
    const body = $('#chat-body');
    if (!body) return;
    const msgs = db.messages[state.chatId] || [];
    body.innerHTML = msgs.map(function (m) {
      if (m.type === 'sticker') {
        return '<div class="msg sticker ' + (m.from === 'mine' ? 'mine' : '') + '">' +
          '<img src="' + m.text + '" alt="贴纸"></div>';
      }
      return '<div class="msg ' + (m.from === 'mine' ? 'mine' : '') + '">' +
        (m.name && m.from !== 'mine' ? '<b style="font-size:11px;opacity:.7">' + escapeHTML(m.name) + '　</b>' : '') +
        escapeHTML(m.text) + '</div>';
    }).join('') + '<div class="msg-time">' + (msgs.length ? escapeHTML(msgs[0].time) : '今天') + '</div>';
    body.scrollTop = body.scrollHeight;
  }

  function renderEmojiPanel() {
    const box = $('#emoji-panel');
    if (!box) return;
    box.innerHTML = '<div class="emoji-grid">' + EMOJIS.map(function (e) {
      return '<button data-action="insert-emoji" data-value="' + e + '">' + e + '</button>';
    }).join('') + '</div>';
    box.classList.add('show');
  }

  function renderStickerPanel() {
    const box = $('#emoji-panel');
    if (!box) return;
    const mine = db.stickers || [];
    const all = DEFAULT_STICKERS.concat(mine);
    box.innerHTML = '<div class="sticker-bar"><span>表情包</span>' +
      '<button class="text-btn" data-action="import-sticker">+ 从手机导入</button></div>' +
      '<div class="sticker-grid">' + all.map(function (s, i) {
        return '<button data-action="send-sticker" data-index="' + i + '">' +
          (/^data:/.test(s) ? '<img src="' + s + '" alt="贴纸">' : '<span class="sticker-emoji">' + s + '</span>') + '</button>';
      }).join('') + '</div>';
    box.classList.add('show');
  }

  function sendSticker(index) {
    const all = DEFAULT_STICKERS.concat(db.stickers || []);
    const value = all[index];
    if (!value) return;
    if (!db.messages[state.chatId]) db.messages[state.chatId] = [];
    db.messages[state.chatId].push({
      from: 'mine', type: 'sticker',
      text: /^data:/.test(value) ? value : (function () {
        const c = document.createElement('canvas'); c.width = 96; c.height = 96;
        const ctx = c.getContext('2d'); ctx.font = '64px sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(value, 48, 52);
        return c.toDataURL('image/png');
      })(),
      time: nowTime()
    });
    saveDB(); renderChatBody();
    const panel = $('#emoji-panel'); if (panel) panel.classList.remove('show');
    autoReply(state.chatId);
  }

  function openChatBgSheet() {
    const colors = [
      { label: '默认', value: '' },
      { label: '米白', value: '#f6f1e8' },
      { label: '浅绿', value: '#e4efe7' },
      { label: '淡蓝', value: '#e5f0f7' },
      { label: '暖粉', value: '#f8e8df' },
      { label: '夜色', value: '#3f4a44' }
    ];
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>更换聊天背景</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">选择纯色背景，或从手机相册导入图片</p>' +
        '<div class="bg-grid">' + colors.map(function (c) {
          return '<button class="bg-opt ' + (c.value ? '' : 'on') + '" data-action="set-chat-bg" data-value="' + c.value + '" ' +
            'style="background:' + (c.value || 'var(--cream)') + '">' + c.label + '</button>';
        }).join('') + '</div>' +
        '<button class="btn soft block" data-action="import-chat-bg">从相册导入背景图片</button>' +
      '</div></div>';
  }

  function openFriendsSheet() {
    const user = currentUser();
    let friends = getUserFriends().slice();
    const groupFilter = state.friendGroup || '全部';
    if (groupFilter !== '全部') friends = friends.filter(function (f) { return (f.group || '未分组') === groupFilter; });
    if (state.friendSort === 'az') {
      friends.sort(function (a, b) {
        return (a.remark || a.name || '').localeCompare(b.remark || b.name || '', 'zh-CN');
      });
    }
    const groups = getUserGroups();
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>好友与群聊</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">你的编号 ID：<b>' + (user.friendId || '—') + '</b>，把 ID 告诉朋友即可添加</p>' +
        '<div class="add-friend-row"><input id="friend-id-input" placeholder="输入对方编号 ID" maxlength="6">' +
          '<button class="btn primary" data-action="add-friend">添加好友</button></div>' +
        '<div class="info-card" id="friend-error" style="min-height:0;padding:6px 12px;color:#c98d86;font-size:11px"></div>' +
        (function () {
          const recommended = FRIEND_DIRECTORY.filter(function (p) {
            return !friends.some(function (f) { return f.friendId === p.friendId; });
          });
          if (!recommended.length) return '';
          return '<div class="set-group-title">发现好友 · 点「+」添加</div>' +
            '<div class="recommend-list">' + recommended.map(function (p) {
              return '<div class="recommend-row">' +
                '<span class="chat-avatar">' + escapeHTML(personName(p).charAt(0)) + '</span>' +
                '<span class="set-label"><b>' + escapeHTML(personName(p)) + '</b><small>' + escapeHTML(personBio(p)) + ' · ID ' + escapeHTML(p.friendId) + '</small></span>' +
                '<button class="friend-add-btn" data-action="add-friend-by-id" data-id="' + escapeHTML(p.friendId) + '">' + ICON.plus + ' 添加</button>' +
              '</div>';
            }).join('') + '</div>';
        })() +
        '<div class="set-group-title">我的好友（' + friends.length + '）</div>' +
        (friends.length ? friends.map(function (f) {
          return '<div class="friend-row">' +
            '<button class="set-row friend-main" data-action="open-chat" data-id="u_' + f.userId + '">' +
              '<span class="chat-avatar">' + escapeHTML((f.remark || f.name).charAt(0)) + '</span>' +
              '<span class="set-label"><b>' + escapeHTML(f.remark || f.name) + '</b><small>' + escapeHTML(f.group || '未分组') + ' · ' + (f.signature ? escapeHTML(f.signature) : 'ID ' + escapeHTML(f.friendId || '')) + '</small></span>' +
              '<span class="set-arrow">›</span></button>' +
            '<button class="friend-remove-btn" data-action="remove-friend" data-id="' + f.userId + '" title="删除好友">✕</button>' +
          '</div>';
        }).join('') : '<p class="sheet-tip">还没有好友，可在上方「发现好友」添加，或输入对方 ID</p>') +
        '<div class="add-friend-row"><input id="group-id-input" placeholder="输入群聊编号加群" maxlength="10">' +
          '<button class="btn primary" data-action="join-group-by-id">加群</button></div>' +
        '<div class="section-head" style="margin:14px 2px 6px"><div class="set-group-title" style="padding:0">我的群聊（' + groups.length + '）</div>' +
          '<button class="text-btn" data-action="create-group">+ 创建群聊</button></div>' +
        (groups.length ? groups.map(function (g) {
          return '<div class="friend-row">' +
            '<button class="set-row" data-action="open-chat" data-id="' + escapeHTML(g.id) + '">' +
              '<span class="chat-avatar blue">' + escapeHTML(g.avatar || '群') + '</span>' +
              '<span class="set-label"><b>' + escapeHTML(g.name) + '</b><small>' + escapeHTML(g.desc || '') + '</small></span>' +
              '<span class="set-arrow">›</span></button>' +
            '<button class="friend-profile-btn" data-action="group-manage" data-id="' + escapeHTML(g.id) + '" title="群聊管理">管理</button>' +
          '</div>';
        }).join('') : '<p class="sheet-tip">还没有群聊，点右上角创建</p>') +
        '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">关闭</button></div>' +
      '</div></div>';
  }

  function openRenameFriendSheet(userId) {
    const u = currentUser();
    const friend = (u.friends || []).find(function (f) { return f.userId === userId; });
    if (!friend) return;
    const groups = ['未分组', '同学', '邻居', '家人', '同事'];
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>好友备注</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="field"><label>备注名称</label><input id="friend-remark-input" maxlength="20" placeholder="例如：同桌小李" value="' + escapeHTML(friend.remark || friend.name || '') + '"></div>' +
        '<div class="field"><label>好友分组</label><select id="friend-group-select">' +
          groups.map(function (g) { return '<option value="' + g + '"' + ((friend.group || '未分组') === g ? ' selected' : '') + '>' + g + '</option>'; }).join('') +
        '</select></div>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
          '<button class="btn primary" data-action="save-friend-remark" data-id="' + escapeHTML(userId) + '">保存</button></div>' +
      '</div></div>';
  }

  function openChatFriendMenu(userId) {
    const friend = getUserFriends().find(function (f) { return f.userId === userId; });
    const name = friend ? (friend.remark || friend.name) : '好友';
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>' + escapeHTML(translateText('好友设置')) + '</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">' + escapeHTML(name) + '</p>' +
        '<button class="set-row" data-action="rename-friend-open" data-id="' + escapeHTML(userId) + '">' +
          '<span class="set-label"><b>' + escapeHTML(translateText('修改备注与分组')) + '</b></span><span class="set-arrow">›</span></button>' +
        '<button class="set-row" data-action="friend-profile" data-id="' + escapeHTML(userId) + '">' +
          '<span class="set-label"><b>' + escapeHTML(translateText('查看好友资料')) + '</b></span><span class="set-arrow">›</span></button>' +
        '<button class="set-row danger-row" data-action="remove-friend-from-chat" data-id="' + escapeHTML(userId) + '">' +
          '<span class="set-label"><b>' + escapeHTML(translateText('删除好友')) + '</b></span><span class="set-arrow">›</span></button>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">' + escapeHTML(translateText('关闭')) + '</button></div>' +
      '</div></div>';
  }

  function joinGroupById() {
    const input = $('#group-id-input');
    const id = input && input.value.trim();
    if (!id) { toast('请输入群聊编号', 'warn'); return; }
    const u = currentUser();
    if (!Array.isArray(u.groups)) u.groups = [];
    const gid = 'g_' + id;
    if (!u.groups.some(function (g) { return g.id === gid; })) {
      u.groups.push({ id: gid, name: '群聊 ' + id, desc: '通过群号加入', avatar: '群' });
      db.messages[gid] = [];
      saveDB();
      toast('已加入群聊 ' + id);
    } else toast('你已在该群聊中');
    openFriendsSheet();
  }

  function findGroup(groupId) {
    const u = currentUser();
    return u && Array.isArray(u.groups) ? u.groups.find(function (g) { return g.id === groupId; }) : null;
  }

  function openGroupManageSheet(groupId) {
    const g = findGroup(groupId);
    if (!g) { toast('群聊不存在', 'warn'); return; }
    state.manageGroupId = groupId;
    state.groupInvites = [];
    const members = Array.isArray(g.members) ? g.members : [];
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>群聊管理</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="field"><label>群聊名称</label><input id="group-rename-input" maxlength="20" value="' + escapeHTML(g.name) + '" placeholder="输入新的群名称"></div>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
          '<button class="btn primary" data-action="save-group-rename" data-id="' + escapeHTML(groupId) + '">保存名称</button></div>' +
        '<div class="set-group-title">群成员（' + members.length + '）</div>' +
        (members.length ? members.map(function (m) {
          const p = findPersonById(m.userId);
          return '<div class="recommend-row">' +
            '<span class="chat-avatar">' + escapeHTML((p ? personName(p) : (m.name || '友')).charAt(0)) + '</span>' +
            '<span class="set-label"><b>' + escapeHTML(p ? personName(p) : (m.name || '好友')) + '</b><small>' + escapeHTML(m.role || '成员') + '</small></span>' +
            '<button class="friend-remove-btn" data-action="remove-group-member" data-gid="' + escapeHTML(groupId) + '" data-id="' + escapeHTML(m.userId) + '" title="移出群聊">✕</button>' +
          '</div>';
        }).join('') : '<p class="sheet-tip">暂无其他成员，点下方按钮邀请好友进群</p>') +
        '<div class="sheet-actions"><button class="btn soft block" data-action="invite-friends-open" data-id="' + escapeHTML(groupId) + '">＋ 邀请好友进群</button></div>' +
      '</div></div>';
  }

  function saveGroupRename(groupId) {
    const g = findGroup(groupId);
    const input = $('#group-rename-input');
    const name = input ? input.value.trim() : '';
    if (!g) return;
    if (!name) { toast('请输入群聊名称', 'warn'); return; }
    g.name = name;
    g.avatar = name.charAt(0) || '群';
    saveDB();
    renderApp(true);
    openGroupManageSheet(groupId);
    toast('群聊名称已修改');
  }

  function openInviteFriendsSheet(groupId) {
    const g = findGroup(groupId);
    if (!g) return;
    if (!Array.isArray(g.members)) g.members = [];
    const friends = getUserFriends().filter(function (f) {
      return !g.members.some(function (m) { return m.userId === f.userId; });
    });
    state.groupInvites = [];
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>邀请好友进群</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">可多选好友，选择后点「邀请进群」</p>' +
        (friends.length ? friends.map(function (f) {
          return '<button class="set-row invite-row" data-action="toggle-group-invite" data-id="' + escapeHTML(f.userId) + '">' +
            '<span class="chat-avatar">' + escapeHTML((f.remark || f.name || '友').charAt(0)) + '</span>' +
            '<span class="set-label"><b>' + escapeHTML(f.remark || f.name || '好友') + '</b><small>' + escapeHTML(f.group || '未分组') + '</small></span>' +
            '<span class="invite-check"></span></button>';
        }).join('') : '<p class="sheet-tip">没有可邀请的好友，请先添加好友</p>') +
        '<div class="sheet-actions"><button class="btn ghost" data-action="group-manage" data-id="' + escapeHTML(groupId) + '">返回</button>' +
          '<button class="btn primary" data-action="confirm-group-invite" data-id="' + escapeHTML(groupId) + '">邀请进群</button></div>' +
      '</div></div>';
  }

  function confirmGroupInvite(groupId) {
    const g = findGroup(groupId);
    if (!g) return;
    if (!Array.isArray(g.members)) g.members = [];
    const picked = state.groupInvites || [];
    if (!picked.length) { toast('请先选择要邀请的好友', 'warn'); return; }
    let added = 0;
    picked.forEach(function (uid2) {
      if (!g.members.some(function (m) { return m.userId === uid2; })) {
        g.members.push({ userId: uid2, role: '成员' });
        added++;
      }
    });
    saveDB();
    openGroupManageSheet(groupId);
    toast(added ? ('已邀请 ' + added + ' 位好友进群') : '所选好友已在群内');
  }

  function showFriendProfile(userId) {
    const target = findPersonById(userId);
    const friend = currentUser().friends.find(function (f) { return f.userId === userId; });
    if (!target && !friend) return;
    const name = (target && personName(target)) || (friend && friend.name) || '好友';
    const signature = (target && personBio(target)) || (friend && friend.signature) || '这个人很懒，还没有留下个性签名';
    const contact = (target && personContact(target)) || (friend && friend.contact) || '未填写';
    const avatarText = name.charAt(0).toUpperCase();
    const u = target || friend || { equipped: {} };
    const uCount = target ? (target.itemCount != null ? target.itemCount : itemCountOf(target.id)) : 0;
    const friendHead =
      '<div class="friend-profile-head">' +
        '<div class="friend-profile-avatar' + frameClassOf(u, uCount) + '">' + escapeHTML(avatarText) + badgeOf(u, uCount) + '</div>' +
        '<h2>' + escapeHTML(name) + '</h2>' +
        '<p>ID ' + escapeHTML((friend && friend.friendId) || (target && target.friendId) || '') + '</p>' +
      '</div>';
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>好友资料</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        wrapCard(friendHead, u, uCount) +
        '<div class="info-card">' +
          '<div class="friend-profile-row"><b>个性签名</b><span>' + escapeHTML(signature) + '</span></div>' +
          '<div class="friend-profile-row"><b>联系方式</b><span>' + escapeHTML(contact) + '</span></div>' +
        '</div>' +
        '<div class="sheet-actions">' +
          '<button class="btn ghost" data-action="open-friends">返回</button>' +
          '<button class="btn primary" data-action="open-chat" data-id="u_' + escapeHTML(userId) + '">发消息</button>' +
        '</div>' +
      '</div></div>';
  }

  function openCreateGroupSheet() {
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>创建群聊</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="field"><label>群聊名称 *</label><input id="group-name" maxlength="20" placeholder="例如：毕业季收纳交流群"></div>' +
        '<div class="field"><label>群简介</label><input id="group-desc" maxlength="40" placeholder="简单介绍一下这个群"></div>' +
        '<p class="sheet-tip">可从「社区群 / 学校群 / 家庭群」等模板快速创建，创建后即可在消息聊天中进入发言。</p>' +
        '<div class="group-type-row">' +
          PRESET_GROUPS.map(function (g, i) {
            return '<button class="chip ' + (i === 0 ? 'active' : '') + '" data-action="pick-group-type" data-index="' + i + '">' + escapeHTML(g.name) + '</button>';
          }).join('') +
        '</div>' +
        '<div class="form-error" id="group-error"></div>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
          '<button class="btn primary" data-action="save-group">创建群聊</button></div>' +
      '</div></div>';
    state.groupTypeIndex = 0;
  }

  function createGroup() {
    const user = currentUser();
    const name = $('#group-name') ? $('#group-name').value.trim() : '';
    const desc = $('#group-desc') ? $('#group-desc').value.trim() : '';
    const err = $('#group-error');
    if (!name) { if (err) err.textContent = '请输入群聊名称'; return; }
    if (!Array.isArray(user.groups)) user.groups = [];
    const tpl = PRESET_GROUPS[state.groupTypeIndex || 0] || PRESET_GROUPS[0];
    const group = { id: 'g_' + uid(), name: name, desc: desc || tpl.desc, avatar: name.charAt(0) || '群' };
    user.groups.push(group);
    db.messages[group.id] = [];
    saveDB();
    closeSheet();
    toast('群聊已创建');
    state.view = 'chat';
    renderApp(true);
    setTimeout(function () { openChat(group.id); }, 60);
  }

  function addFriendById(id, err) {
    id = String(id || '').trim();
    if (!id) { if (err) err.textContent = '请输入好友编号 ID'; return false; }
    const user = currentUser();
    if (!user) return false;
    if (id === user.friendId) { if (err) err.textContent = '不能添加自己为好友'; return false; }
    if (!Array.isArray(user.friends)) user.friends = [];
    if (user.friends.some(function (f) { return f.friendId === id; })) { if (err) err.textContent = '该好友已添加'; return false; }
    const target = findPersonByFriendId(id);
    if (target) {
      user.friends.push({
        userId: target.id, friendId: id,
        name: personName(target),
        signature: personBio(target),
        contact: personContact(target),
        avatar: target.profile && target.profile.avatar || ''
      });
    } else {
      // 本地演示版没有云端账号目录：输入的编号即便不在内置目录，也按编号创建占位好友，
      // 保证两个人互输编码都能成功添加（对方上线后资料以本地记录为准，可改备注）。
      const placeholderId = 'remote_' + id;
      user.friends.push({
        userId: placeholderId, friendId: id,
        name: '好友 ' + id, signature: '通过编号添加的好友', contact: '', avatar: ''
      });
    }
    saveDB(); toast(translateText('已添加好友') + ' ' + id); openFriendsSheet(); renderApp();
    return true;
  }

  function addFriend() {
    const input = $('#friend-id-input');
    addFriendById(input ? input.value.trim() : '', $('#friend-error'));
  }

  function removeFriend(userId) {
    const user = currentUser();
    if (!user || !Array.isArray(user.friends)) return;
    const f = user.friends.find(function (x) { return x.userId === userId; });
    user.friends = user.friends.filter(function (x) { return x.userId !== userId; });
    saveDB();
    if (state.chatId === 'u_' + userId) state.chatId = null;
    toast(f ? '已删除好友 ' + f.name : '已删除好友');
    closeSheet(); openFriendsSheet(); renderApp();
  }

  function autoReply(chatId) {
    const replies = [
      '这个我也遇到过，后来分类放就好多了～',
      '好主意，我也要试试！',
      '可以试试定位标签联动，找东西超方便',
      '我一般每周整理一次，效果不错',
      '哈哈说得对，感谢分享！'
    ];
    setTimeout(function () {
      if (!db.messages[chatId]) db.messages[chatId] = [];
      db.messages[chatId].push({
        from: 'them', text: replies[Math.floor(Math.random() * replies.length)], time: nowTime()
      });
      saveDB();
      if (state.chatId === chatId) renderChatBody();
      renderApp();
    }, 900);
  }

  function publishPost(text, photo) {
    const user = currentUser();
    const name = (user.profile && user.profile.name) || user.username;
    db.posts.push({
      id: uid(), name: name, avatar: name.charAt(0).toUpperCase(), tone: '',
      time: '刚刚', tag: '我的分享', text: text, likes: 0, photo: photo || ''
    });
    saveDB();
    closeOverlay();
    toast('动态已发布');
    renderApp(true);
  }

  function openPostEditor() {
    $('#overlay-root').innerHTML =
      '<div class="full-mask">' +
        '<div class="full-head"><button class="back" data-action="close-overlay">' + ICON.back + '</button>' +
          '<h2>发布动态</h2><button class="btn primary sm" data-action="submit-post" style="padding:7px 14px">发布</button></div>' +
        '<div style="padding:18px">' +
          '<form id="post-form">' +
            '<div class="photo-field">' +
              '<div class="photo-preview" id="post-photo-preview">' + ICON.camera + '</div>' +
              '<div class="photo-btns">' +
                '<button type="button" data-action="take-photo" data-target="post">拍照</button>' +
                '<button type="button" data-action="pick-photo" data-target="post">相册选择</button>' +
              '</div>' +
              '<input type="hidden" id="post-photo" value="">' +
            '</div>' +
            '<div class="field"><label>分享内容</label>' +
              '<textarea id="post-text" rows="5" maxlength="300" placeholder="分享你的收纳心得..."></textarea></div>' +
          '</form>' +
        '</div>' +
      '</div>';
  }

  /* ---------------- Device linkage ---------------- */

  function ensureDevices() {
    const user = currentUser();
    if (!db.devices.some(function (d) { return d.userId === user.id; })) {
      db.devices.push(
        { id: uid(), userId: user.id, name: '收纳箱 A 标签', animal: 'cat', itemId: null, battery: 82, signal: 3, zone: '储物间', online: true, autoRecord: true, awayAlert: true },
        { id: uid(), userId: user.id, name: '冰箱标签', animal: 'rabbit', itemId: null, battery: 64, signal: 4, zone: '厨房', online: true, autoRecord: true, awayAlert: false }
      );
      saveDB();
    }
  }

  function userDevices() {
    const user = currentUser();
    return user ? db.devices.filter(function (d) { return d.userId === user.id; }) : [];
  }

  const DEVICE_ICONS = ['cat', 'rabbit', 'bear', 'fox', 'bird', 'fish'];

  function openAddBoundDeviceSheet() {
    state.newDeviceIcon = 'cat';
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>' + translateText('添加绑定设备') + '</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">' + translateText('给定位标签命名并选一个图标，用于绑定你的物品') + '</p>' +
        '<div class="field"><label>' + translateText('物品名称') + '</label><input id="bound-device-name" maxlength="20" placeholder="' + translateText('例如：护照、钥匙、背包') + '"></div>' +
        '<div class="field"><label>' + translateText('选择图标') + '</label>' +
          '<div class="dev-icon-picker">' + DEVICE_ICONS.map(function (k, i) {
            return '<button class="dev-icon-opt' + (i === 0 ? ' on' : '') + '" data-action="pick-device-icon" data-icon="' + k + '">' + ICON['a_' + k] + '</button>';
          }).join('') + '</div></div>' +
        '<div class="field"><label>' + translateText('存放区域') + '</label><input id="bound-device-zone" maxlength="20" placeholder="' + translateText('例如：书房、背包') + '"></div>' +
        '<div class="form-error" id="bound-device-error"></div>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">' + translateText('取消') + '</button>' +
          '<button class="btn primary" data-action="save-bound-device">' + translateText('添加设备') + '</button></div>' +
      '</div></div>';
  }

  function saveBoundDevice() {
    const user = currentUser();
    const nameInput = $('#bound-device-name');
    const zoneInput = $('#bound-device-zone');
    const err = $('#bound-device-error');
    const name = nameInput ? nameInput.value.trim() : '';
    if (!name) { if (err) err.textContent = translateText('请输入物品名称'); return; }
    const device = {
      id: uid(), userId: user.id, name: name + ' 标签', animal: state.newDeviceIcon || 'cat',
      itemId: null, battery: 100, signal: 4, zone: zoneInput && zoneInput.value.trim() ? zoneInput.value.trim() : translateText('未设置位置'),
      online: true, connected: true, autoRecord: true, awayAlert: false
    };
    if (!Array.isArray(db.devices)) db.devices = [];
    db.devices.push(device);
    saveDB();
    closeSheet();
    renderApp(true);
    toast(translateText('设备已添加') + '：' + name);
  }

  function getUserSpace() {
    const user = currentUser();
    if (user && user.currentSpace) return user.currentSpace;
    const b = HIFA_BUILDINGS[5];
    return { building: b.name, floor: '2层', room: '101', beacon: 'HIFA-6', lat: b.lat, lng: b.lng };
  }

  function getUserSchool() {
    const user = currentUser();
    const name = user && user.school && (user.school.name || user.school);
    return SCHOOLS.find(function (s) { return s.name === name; }) || SCHOOLS[0];
  }

  function currentSpaces() {
    return getUserSchool().buildings.map(function (b) {
      return {
        building: b.name, floor: '2层', room: '101',
        beacon: 'HIFA-' + b.name.replace(/[^0-9A-Za-z]/g, ''),
        lat: b.lat, lng: b.lng, approx: b.approx
      };
    });
  }

  function buildingOptions() {
    return getUserSchool().buildings.map(function (b) { return b.name; });
  }

  function spaceLabel(space) {
    return space.building + ' · ' + space.floor + ' · ' + space.room;
  }

  function nearbyItems(space) {
    return getUserItems().filter(function (i) {
      const loc = String(i.location || '');
      return loc.indexOf(space.building) !== -1 || loc.indexOf(space.room) !== -1 || loc.indexOf(space.floor) !== -1;
    });
  }

  function currentSpaceHTML() {
    const space = getUserSpace();
    const school = getUserSchool();
    const nearby = nearbyItems(space);
    return '<div class="space-now">' +
      '<div class="sn-head"><span class="sn-title">' + ICON.pin + ' 当前所在空间</span>' +
        '<button class="loc-toggle ' + (db.locationEnabled ? 'on' : '') + '" data-action="toggle-location" title="开启/关闭定位">' +
          '<i></i>' + (db.locationEnabled ? '定位已开' : '定位已关') + '</button></div>' +
      (db.locationEnabled && school ? '<div class="sn-school">' + ICON.homePin + '<span>已绑定 ' + escapeHTML(school.name) + ' · ' + escapeHTML(school.address) + '</span></div>' : '') +
      (!db.locationEnabled ? '<p class="loc-off-tip">定位已关闭，可手动选择空间；开启后将自动检索当前楼栋。</p>' : '') +
      '<div class="sn-place">' + escapeHTML(spaceLabel(space)) + '</div>' +
      (space.approx ? '<div class="sn-approx">该楼栋为校内示意坐标，精确楼层需蓝牙信标</div>' : '') +
      '<div class="sn-meta"><span>信标 ' + escapeHTML(space.beacon) + '</span><span>附近物品 ' + nearby.length + ' 件</span></div>' +
      '<div class="sn-actions">' +
        '<button class="btn soft" id="space-detect-btn" data-action="detect-space">自动检索位置</button>' +
        '<button class="btn ghost" data-action="open-space-picker">手动选择</button>' +
        '<button class="btn ghost" data-action="bind-school">' + (school ? '切换学校' : '绑定学校') + '</button>' +
      '</div>' +
      '<button class="text-btn loc-help-link" data-action="location-help">' + ICON.alert + ' 定位授权失败？点这里查看解决办法</button>' +
      '<button class="btn primary block sn-amap" data-action="open-amap-current">' + ICON.pin + ' 用高德地图打开这里</button>' +
      (nearby.length ? '<div class="sn-items">' + nearby.slice(0, 3).map(function (i) {
        return '<span>' + escapeHTML(i.name) + '</span>';
      }).join('') + '</div>' : '') +
      '</div>';
  }

  function distanceKm(lat1, lng1, lat2, lng2) {
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad, dLng = (lng2 - lng1) * rad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * 6371 * Math.asin(Math.sqrt(a));
  }

  function wgs84ToGcj02(lat, lng) {
    function outOfChina(la, lo) { return lo < 73.66 || lo > 135.05 || la < 3.86 || la > 53.55; }
    function transformLat(x, y) {
      let ret = -100 + 2*x + 3*y + .2*y*y + .1*x*y + .2*Math.sqrt(Math.abs(x));
      ret += (20*Math.sin(6*x*Math.PI) + 20*Math.sin(2*x*Math.PI)) * 2 / 3;
      ret += (20*Math.sin(y*Math.PI) + 40*Math.sin(y/3*Math.PI)) * 2 / 3;
      ret += (160*Math.sin(y/12*Math.PI) + 320*Math.sin(y*Math.PI/30)) * 2 / 3;
      return ret;
    }
    function transformLng(x, y) {
      let ret = 300 + x + 2*y + .1*x*x + .1*x*y + .1*Math.sqrt(Math.abs(x));
      ret += (20*Math.sin(6*x*Math.PI) + 20*Math.sin(2*x*Math.PI)) * 2 / 3;
      ret += (20*Math.sin(x*Math.PI) + 40*Math.sin(x/3*Math.PI)) * 2 / 3;
      ret += (150*Math.sin(x/12*Math.PI) + 300*Math.sin(x/30*Math.PI)) * 2 / 3;
      return ret;
    }
    if (outOfChina(lat, lng)) return { lat: lat, lng: lng };
    const a = 6378245.0, ee = 0.00669342162296594323;
    const dLat = transformLat(lng - 105.0, lat - 35.0);
    const dLng = transformLng(lng - 105.0, lat - 35.0);
    const radLat = lat / 180.0 * Math.PI;
    let magic = Math.sin(radLat); magic = 1 - ee * magic * magic;
    const sqrtMagic = Math.sqrt(magic);
    return {
      lat: lat + (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI),
      lng: lng + (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI)
    };
  }

  function nearestBuilding(lat, lng) {
    const school = getUserSchool();
    let best = school.buildings[0], bestKm = Infinity;
    school.buildings.forEach(function (b) {
      const km = distanceKm(lat, lng, b.lat, b.lng);
      if (km < bestKm) { bestKm = km; best = b; }
    });
    return { building: best, km: bestKm };
  }

  function autoDetectSpace(done) {
    const user = currentUser();
    if (!user) return;
    if (!db.locationEnabled) {
      toast('定位已关闭，请在联动页开启后再检索', 'warn');
      return;
    }
    const school = getUserSchool();
    function finish(label, lat, lng, approx) {
      user.currentSpace = {
        building: label, floor: '', room: '',
        beacon: approx ? 'SCHOOL-CENTER' : 'GPS-LOCATION',
        lat: lat, lng: lng, approx: !!approx,
        school: approx ? school.name : '当前位置'
      };
      saveDB();
      toast('已定位：' + label + (approx ? '（示意坐标）' : ''));
      renderApp(true);
      if (typeof done === 'function') done();
    }
    if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) {
      finish(school.short + '示意位置', school.center.lat, school.center.lng, true);
      return;
    }
    navigator.geolocation.getCurrentPosition(function (pos) {
      if (!pos || !pos.coords) return;
      const gcj = wgs84ToGcj02(pos.coords.latitude, pos.coords.longitude);
      const km = distanceKm(gcj.lat, gcj.lng, school.center.lat, school.center.lng);
      let label;
      if (km * 1000 <= school.radius) {
        label = nearestBuilding(gcj.lat, gcj.lng).building.name;
      } else {
        label = '当前位置 ' + gcj.lat.toFixed(4) + ', ' + gcj.lng.toFixed(4);
      }
      finish(label, gcj.lat, gcj.lng, false);
    }, function (err) {
      const msg = (err && err.code === 1)
        ? '定位权限未授予：请在浏览器设置中允许定位，或点「手动选择」'
        : '定位暂不可用：请稍后重试，或点「手动选择」';
      toast(msg, 'warn');
      const btn = $('#space-detect-btn');
      if (btn) btn.textContent = '自动检索位置';
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 });
  }

  function mapConfig() {
    return db.mapConfig && db.mapConfig.key ? db.mapConfig : null;
  }

  let amapPromise = null;
  function loadAMap() {
    if (wamap()) return Promise.resolve(wamap());
    const cfg = mapConfig();
    if (!cfg) return Promise.reject(new Error('NO_KEY'));
    if (!amapPromise) {
      amapPromise = new Promise(function (resolve, reject) {
        window._AMapSecurityConfig = { securityJsCode: cfg.securityCode || '' };
        function start() {
          if (!window.AMapLoader) { reject(new Error('LOADER_MISSING')); return; }
          window.AMapLoader.load({ key: cfg.key, version: '2.0', plugins: [] })
            .then(resolve).catch(reject);
        }
        if (window.AMapLoader) { start(); return; }
        const s = document.createElement('script');
        s.src = 'https://webapi.amap.com/loader.js';
        s.onload = start;
        s.onerror = function () { reject(new Error('NETWORK')); };
        document.head.appendChild(s);
      });
    }
    return amapPromise;
  }

  function wamap() { return window.AMap || null; }

  /* 唤起高德地图：使用高德官方 URI 页面（callnative=1）。
     已安装 App 时由高德官方页弹出「是否允许打开高德地图」，未安装则显示网页地图。
     不再直接拼 iosamap:// / androidamap://，避免 iOS Safari 报「网址无效」。 */
  function openInAmap(name, lat, lng) {
    const label = encodeURIComponent(name || '我的位置');
    const lc = Number(lat), ln = Number(lng);
    if (!isFinite(lc) || !isFinite(ln)) { toast('暂无可用坐标，请先手动选择位置', 'warn'); return; }
    const web = 'https://uri.amap.com/marker?position=' + ln + ',' + lc +
      '&name=' + label + '&src=' + encodeURIComponent('收纳小管家') +
      '&coordinate=gaode&callnative=1';
    toast('正在打开高德地图…');
    try {
      const w = window.open(web, '_blank');
      if (!w && window.location) window.location.href = web;
    } catch (e) {
      try { if (window.location) window.location.href = web; } catch (e2) { /* ignore */ }
    }
  }

  let activeRealMap = null;
  function destroyRealMap() {
    if (activeRealMap && typeof activeRealMap.destroy === 'function') {
      try { activeRealMap.destroy(); } catch (e) { /* ignore */ }
    }
    activeRealMap = null;
  }

  function deviceSearchResultsHTML(query) {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return '<div class="is-empty">输入物品名称或存放位置，搜索结果可直接一键查找</div>';
    const list = getUserItems().filter(function (i) {
      return [i.name, i.location, i.notes].join(' ').toLowerCase().indexOf(q) !== -1;
    });
    if (!list.length) return '<div class="is-empty">没有找到与「' + escapeHTML(query) + '」相关的物品</div>';
    return list.slice(0, 8).map(function (i) {
      return '<div class="is-row"><div class="is-ico">' + ICON.tag + '</div>' +
        '<div class="is-info"><b>' + escapeHTML(i.name) + '</b><span>' + escapeHTML(i.location || '未填写位置') + '</span></div>' +
        '<button class="btn soft" data-action="find-item" data-id="' + i.id + '">一键查找</button></div>';
    }).join('');
  }

  function deviceSearchHTML() {
    const query = state.deviceSearch || '';
    return '<div class="item-search">' +
      '<div class="is-title">' + ICON.search + '<b>搜索我的物品</b><span>找到后可一键定位</span></div>' +
      '<div class="is-field">' + ICON.search +
        '<input id="device-item-search" value="' + escapeHTML(query) + '" placeholder="输入物品名称或位置">' +
        '<button class="is-clear" data-action="clear-device-search" aria-label="清空">✕</button></div>' +
      '<div class="is-results" id="device-search-results">' + deviceSearchResultsHTML(query) + '</div>' +
      '</div>';
  }

  function scanDevices() {
    if (!db.bluetoothOn) { toast('请先开启蓝牙', 'warn'); return; }
    const found = [
      { name: 'Tag-BLE-3F2A', type: '定位标签', signal: 4 },
      { name: 'Tag-BLE-8C11', type: '定位标签', signal: 3 },
      { name: '收纳盒 Pro', type: '智能收纳盒', signal: 2 }
    ];
    const box = $('#bt-scan-results');
    if (!box) {
      $('#sheet-root').innerHTML =
        '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
          '<div class="sheet-handle"></div>' +
          '<div class="sheet-head"><h2>搜索附近设备</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
          '<p class="sheet-tip">正在扫描蓝牙低功耗（BLE）设备，请稍候…</p>' +
          '<div id="bt-scan-results" class="bt-scan-list"></div>' +
          '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
            '<button class="btn soft" data-action="scan-devices">重新搜索</button></div>' +
        '</div></div>';
    }
    const target = $('#bt-scan-results');
    target.innerHTML = '<div class="ai-loading">' + ICON.signal + ' 正在搜索附近的蓝牙标签…</div>';
    setTimeout(function () {
      if (!target.isConnected) return;
      target.innerHTML = found.map(function (f, i) {
        return '<div class="bt-device"><div class="bt-ico">' + ICON.signal + '</div>' +
          '<div class="bt-info"><b>' + f.name + '</b><span>' + f.type + ' · 信号 ' + f.signal + '/4</span></div>' +
          '<button class="btn primary" data-action="connect-device" data-name="' + escapeHTML(f.name) + '" data-signal="' + f.signal + '">连接</button></div>';
      }).join('');
    }, 900);
  }

  function connectDevice(name, signal) {
    const user = currentUser();
    if (!user) return;
    ensureDevices();
    const existing = db.devices.find(function (d) { return d.userId === user.id && d.name === name; });
    if (existing) {
      existing.online = true; existing.connected = true; existing.signal = signal;
    } else {
      db.devices.push({
        id: uid(), userId: user.id, name: name, animal: 'bear', itemId: null,
        battery: 90, signal: signal, zone: '待绑定', online: true, connected: true,
        autoRecord: true, awayAlert: false
      });
    }
    saveDB(); closeSheet(); state.devicesOpen = true;
    toast('已连接蓝牙设备：' + name);
    renderApp(true);
  }

  function showLocationHelp() {
    const ua = (navigator.userAgent || '').toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const steps = isIOS
      ? ['打开「设置 → 隐私与安全性 → 定位服务」，确认已开启', '找到 Chrome / Safari，设为「使用 App 或网站期间」', '完全关闭其他App的悬浮窗后，回到本页点「自动检索位置」', '若系统仍拦截，直接用下方「手动选择」或「用高德地图打开」']
      : ['关闭其他应用的悬浮窗 / 气泡 / 分屏（提示里说的"叠加层"）', '打开「设置 → 应用 → 浏览器 → 权限」，允许「位置信息」', '浏览器地址栏左侧锁图标 → 权限 → 位置 → 允许，然后刷新本页', '若授权仍被拦截，点「手动选择」或用「高德地图打开」，功能不受影响'];
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>定位授权解决方法</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">安卓提示「此网站无法请求您授权」是因为有悬浮窗 / 叠加层拦截了系统的授权弹窗，按下面步骤处理即可：</p>' +
        '<div class="install-steps">' + steps.map(function (s, i) {
          return '<div class="install-step"><span>' + (i + 1) + '</span><p>' + escapeHTML(s) + '</p></div>';
        }).join('') + '</div>' +
        '<p class="sheet-note">定位只用于自动检索你所在的楼栋，属于可选项。不想授权时，用「手动选择」或「高德地图打开」一样能正常使用全部功能。</p>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="open-space-picker">手动选择</button>' +
          '<button class="btn primary" data-action="close-sheet">知道了</button></div>' +
      '</div></div>';
  }

  function showMapPlanSheet() {
    const cfg = mapConfig();
    const space = getUserSpace();
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet map-plan-sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>高德地图 · 真实中国地图</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="mp-body">' +
          '<div class="amap-recommend">' +
            '<div class="ar-ico">' + ICON.pin + '</div>' +
            '<div class="ar-text"><b>直接用手机上的高德地图（推荐）</b>' +
              '<span>无需任何配置，点下方按钮会弹出「是否允许打开高德地图」，就像其他 App 一样，位置自动带到「' + escapeHTML(spaceLabel(space)) + '」。</span></div>' +
          '</div>' +
          '<button class="btn primary block" data-action="open-amap-current">' + ICON.pin + ' 用高德地图打开当前位置</button>' +
          '<div class="mp-divider">— 以下是进阶选项（一般无需设置）—</div>' +
          '<div class="amap-status ' + (cfg ? 'on' : '') + '"><i></i>' +
            (cfg ? '网页地图已配置 Key：' + escapeHTML(cfg.key.slice(0, 6) + '****' + cfg.key.slice(-4)) : '网页地图未配置 Key（不影响上面的功能）') +
          '</div>' +
          '<button class="btn soft block" data-action="open-map-config">' + (cfg ? '修改网页地图配置' : '配置网页版高德 Key（选填）') + '</button>' +
          '<p class="mp-note">只有在 App 内嵌网页地图时才需要 Key，需到 console.amap.com 申请「Web端(JS API)」类型。用手机高德 App 打开不需要它。</p>' +
          MAP_SDK_PLAN.map(function (sec) {
            return '<div class="mp-sec"><h4>' + escapeHTML(sec.title) + '</h4><ol>' +
              sec.steps.map(function (s) { return '<li>' + escapeHTML(s) + '</li>'; }).join('') +
              '</ol></div>';
          }).join('') +
        '</div>' +
      '</div></div>';
  }

  function mapConfigFormHTML() {
    const cfg = mapConfig() || { key: '', securityCode: '' };
    return '<div class="field"><label>高德 Web 端 Key</label><input id="amap-key" value="' + escapeHTML(cfg.key) + '" placeholder="在 console.amap.com 申请的 JS API Key"></div>' +
      '<div class="field"><label>安全密钥 jscode</label><input id="amap-code" value="' + escapeHTML(cfg.securityCode || '') + '" placeholder="2021年12月后申请的 Key 必须填写"></div>' +
      '<p class="sheet-tip">配置仅保存在本地浏览器，请到 console.amap.com 免费申请。</p>' +
      '<div class="sheet-actions"><button class="btn ghost" data-action="show-map-plan">返回</button>' +
        '<button class="btn primary" data-action="save-map-config">保存并启用</button></div>';
  }

  function bluetoothBannerHTML() {
    const on = db.bluetoothOn;
    return '<div class="bt-banner ' + (on ? 'on' : '') + '">' +
      '<div class="bt-ico">' + ICON.signal + '</div>' +
      '<div class="bt-info"><b>蓝牙连接' + (on ? '已开启' : '未开启') + '</b>' +
        '<span>' + (on ? '可搜索并连接附近的定位标签' : '开启后搜索附近标签，实现一键查找与离位提醒') + '</span></div>' +
      '<button class="btn ' + (on ? 'ghost' : 'primary') + '" data-action="toggle-bluetooth">' + (on ? '关闭' : '开启') + '</button>' +
      (on ? '<button class="btn soft" data-action="scan-devices">搜索设备</button>' : '') +
      '</div>';
  }

  function deviceMapCardHTML() {
    const space = getUserSpace();
    const open = state.deviceMapOpen;
    const label = spaceLabel(space);
    return '<div class="device-map-card">' +
      '<div class="dm-head"><div><b>我的实时位置</b><span>' + escapeHTML(label) + '</span></div>' +
        '<button class="dm-expand" data-action="toggle-device-map">' + (open ? '收起地图 ‹' : '下拉展开地图 ›') + '</button></div>' +
      '<div class="dm-view' + (open ? ' expanded' : '') + '">' +
        '<div class="dm-grid"></div><div class="dm-road"></div>' +
        '<div class="dm-pin"><span>你在这里</span></div>' +
        '<div class="dm-label">' + escapeHTML(label) + '</div>' +
        (open ? '<div id="device-amap" class="device-amap"></div>' : '') +
      '</div>' +
      '<div class="dm-actions">' +
        '<button class="btn primary" data-action="open-amap-current">' + ICON.pin + ' 用高德地图打开</button>' +
        '<button class="btn ghost" data-action="show-map-plan">地图方案</button>' +
      '</div>' +
    '</div>';
  }

  function initDeviceMap() {
    const holder = $('#device-amap');
    if (!holder || !mapConfig()) return;
    loadAMap().then(function (AMap) {
      const space = getUserSpace();
      const school = getUserSchool();
      const meLng = space.lng || school.center.lng, meLat = space.lat || school.center.lat;
      const map = new AMap.Map('device-amap', {
        zoom: 16, center: [meLng, meLat], viewMode: '2D', mapStyle: 'amap://styles/normal'
      });
      activeRealMap = map;
      new AMap.Marker({
        position: [meLng, meLat], title: '你在这里', zIndex: 200,
        content: '<div class="amap-me"><span class="amap-me-dot"></span><span class="amap-me-label">你在这里</span></div>'
      }).setMap(map);
    }).catch(function () {});
  }

  function deviceHTML() {
    ensureDevices();
    const devices = userDevices();
    const items = getUserItems();
    const shown = state.devicesOpen ? devices : devices.slice(0, 1);
    return '<div class="page">' +
      '<div class="section-head" style="margin-top:10px">' +
        '<span class="icon-btn" aria-hidden="true"></span>' +
        '<h2 style="flex:1;margin-left:6px">' + translateText('设备联动') + '</h2>' +
        '<button class="icon-btn" data-action="add-bound-device" title="添加绑定设备">' + ICON.plus + '</button></div>' +
      deviceMapCardHTML() +
      '<div class="section-head"><h2>设备</h2>' +
        '<button class="text-btn" data-action="scan-devices">＋ 添加设备</button></div>' +
      (shown.length ? shown.map(function (d) {
        const linked = items.find(function (i) { return i.id === d.itemId; });
        const bars = [1, 2, 3, 4].map(function (n) { return '<i class="' + (n <= d.signal ? 'on' : '') + '"></i>'; }).join('');
        const animal = d.animal || 'cat';
        return '<div class="device-card">' +
          '<div class="device-row"><button class="device-ico animal-ico" data-action="edit-device" data-id="' + d.id + '" title="自定义标签">' + ICON['a_' + animal] + '</button>' +
            '<div style="flex:1;min-width:0"><div class="device-name">' + escapeHTML(d.name) + '</div>' +
              '<div class="device-sub">' + (linked ? '绑定：' + escapeHTML(linked.name) : '尚未绑定物品') + ' · ' + escapeHTML(d.zone) + ' · ' + (d.connected ? '已连接' : '未连接') + '</div></div>' +
            '<span class="device-status">' + (d.online ? '在线' : '离线') + '</span></div>' +
          '<div class="device-metrics">' +
            '<div class="metric"><div class="metric-label">电量 ' + d.battery + '%</div>' +
              '<div class="battery-track"><div class="battery-fill" style="width:' + d.battery + '%"></div></div></div>' +
            '<div class="metric"><div class="metric-label">信号强度</div><div class="signal-bars">' + bars + '</div></div>' +
          '</div>' +
          '<div class="device-actions">' +
            '<button class="btn soft" data-action="find-device" data-id="' + d.id + '">播放声音</button>' +
            '<button class="btn ghost" data-action="edit-device" data-id="' + d.id + '">自定义标签</button>' +
            '<button class="btn ghost" data-action="bind-device" data-id="' + d.id + '">绑定物品</button>' +
            '<button class="btn ghost" data-action="toggle-away" data-id="' + d.id + '">' + (d.awayAlert ? '离位提醒 开' : '离位提醒 关') + '</button>' +
          '</div>' +
        '</div>';
      }).join('') : '<div class="empty"><div class="empty-orb">' + ICON.signal + '</div><h3>还没有定位标签</h3><p>开启蓝牙搜索，连接一个标签试试</p></div>') +
      '<div class="section-head" style="margin-top:22px"><h2>联动能力</h2><span>设备 + App</span></div>' +
      '<div class="feature-grid">' +
        feature(ICON.bell, '一键查找', 'App 呼叫标签，标签发声发光，按信号强弱找到物品。') +
        feature(ICON.homePin, '离位提醒', '物品离开设定区域时自动提醒，防止遗忘或丢失。') +
        feature(ICON.calendar, '自动记录收纳', '标签回到收纳区域时，自动更新收纳时间。') +
        feature(ICON.battery, '低电量提醒', '标签电量不足时提示更换，避免关键时刻失联。') +
      '</div>' +
      '<div class="info-card device-note" style="margin-top:16px;font-size:11px;color:var(--ink-soft);line-height:1.7">' +
        '<b>设备联动说明</b>' +
        '<p>当前为交互演示：标签状态在 App 内模拟。开启蓝牙后可搜索附近标签并模拟连接；接入真实硬件时，标签通过蓝牙广播 ID 与信号强度，App 接收后实现查找、离位判定与自动记录。</p>' +
        '<button class="btn ghost" data-action="show-map-plan">查看真实中国地图接入方案</button>' +
      '</div>' +
      '</div>';
  }

  function feature(icon, title, desc) {
    return '<div class="feature-card">' + icon + '<b>' + title + '</b><p>' + desc + '</p></div>';
  }

  function animalKey(item, index) {
    return ANIMAL_BY_CATEGORY[item.category] || ['cat', 'rabbit', 'bear', 'fox', 'bird', 'fish'][index % 6];
  }

  function findMapHTML(target) {
    const items = getUserItems();
    const linked = items.find(function (i) { return i.id === target.itemId; });
    const space = getUserSpace();
    const nearbyIds = nearbyItems(space).map(function (i) { return i.id; });
    const tags = items.slice(0, 8).map(function (item, idx) {
      const spot = MAP_SPOTS[idx % MAP_SPOTS.length];
      const animal = animalKey(item, idx);
      const isTarget = linked && item.id === linked.id;
      const isNear = nearbyIds.indexOf(item.id) !== -1;
      return '<button class="animal-tag ' + (isTarget ? 'target' : '') + (isNear ? ' in-space' : '') + '" data-action="find-tag" data-id="' + item.id + '" data-animal="' + animal + '" style="--x:' + spot.x + '%;--y:' + spot.y + '%;--d:' + (idx * 0.32).toFixed(2) + 's">' +
        '<span class="tag-animal">' + ICON['a_' + animal] + '</span>' +
        '<span class="tag-name">' + escapeHTML(item.name) + (isNear ? ' · 同空间' : '') + '</span>' +
      '</button>';
    }).join('');

    return '<div class="find-map" id="find-map">' +
      '<div class="map-stage" id="map-stage">' +
        '<div class="map-grid"></div>' +
        '<div class="map-ring r1"></div><div class="map-ring r2"></div><div class="map-ring r3"></div>' +
        '<span class="room room-1">客厅</span><span class="room room-2">厨房</span>' +
        '<span class="room room-3">卧室</span><span class="room room-4">书房</span>' +
        '<div class="map-me">' + ICON.user + '<span class="map-me-label">你在这里</span></div>' +
        (tags || '<div class="map-empty">暂无物品标签</div>') +
      '</div>' +
      '<div class="space-banner">' + ICON.homePin + '<span>当前空间：' + escapeHTML(spaceLabel(space)) + '</span></div>' +
      '<div class="map-zoom-ctrl">' +
        '<button data-action="map-zoom-in" aria-label="放大">＋</button>' +
        '<button id="map-zoom-label" data-action="map-zoom-reset" aria-label="复位">' + Math.round(state.mapZoom * 100) + '%</button>' +
        '<button data-action="map-zoom-out" aria-label="缩小">－</button>' +
      '</div>' +
      '<div id="amap-container" class="amap-container hidden"></div>' +
    '</div>';
  }

  function applyMapTransform() {
    const stage = $('#map-stage');
    if (stage) stage.style.transform = 'translate(' + state.mapPanX + 'px,' + state.mapPanY + 'px) scale(' + state.mapZoom + ')';
    const label = $('#map-zoom-label');
    if (label) label.textContent = Math.round(state.mapZoom * 100) + '%';
  }

  function initRealMap(target) {
    const cfg = mapConfig();
    const holder = $('#amap-container');
    if (!cfg || !holder) return;
    loadAMap().then(function (AMap) {
      const school = getUserSchool();
      const space = getUserSpace();
      const meLng = space.lng || school.center.lng, meLat = space.lat || school.center.lat;
      const map = new AMap.Map('amap-container', {
        zoom: 16, center: [meLng, meLat], viewMode: '2D', mapStyle: 'amap://styles/normal'
      });
      activeRealMap = map;
      map.addControl(new AMap.Scale());

      new AMap.Circle({
        center: [school.center.lng, school.center.lat], radius: school.radius,
        fillColor: '#7ba48d', fillOpacity: .1, strokeColor: '#2f7d6b', strokeOpacity: .6, strokeWeight: 2,
        strokeStyle: 'dashed'
      }).setMap(map);

      new AMap.Marker({
        position: [school.center.lng, school.center.lat],
        label: { content: school.name + '（校园范围 ' + school.radius + 'm）', direction: 'top' }
      }).setMap(map);

      const meMarker = new AMap.Marker({
        position: [meLng, meLat],
        title: '我当前所在：' + spaceLabel(space),
        zIndex: 200,
        anchor: 'bottom-center',
        content: '<div class="amap-me"><span class="amap-me-dot"></span><span class="amap-me-label">你在这里</span></div>'
      });
      meMarker.setMap(map);
      map.setCenter([meLng, meLat]);
      map.setZoom(17);

      const items = getUserItems();
      const linked = items.find(function (i) { return i.id === target.itemId; });
      items.slice(0, 8).forEach(function (item, idx) {
        const animal = animalKey(item, idx);
        const angle = idx * Math.PI / 4;
        const lng = meLng + Math.cos(angle) * 0.0011;
        const lat = meLat + Math.sin(angle) * 0.0011;
        const marker = new AMap.Marker({
          position: [lng, lat], title: item.name,
          content: '<div class="amap-tag' + (linked && linked.id === item.id ? ' target' : '') + '">' +
            '<span class="amap-animal">' + ICON['a_' + animal] + '</span>' +
            '<span class="amap-name">' + escapeHTML(item.name) + '</span></div>',
          offset: new AMap.Pixel(-28, -42)
        });
        marker.on('click', function () {
          $$('.animal-tag, .amap-tag').forEach(function (t) { t.classList.remove('selected'); });
          const el = marker.getContent && marker.getContent();
          if (el && el.classList) el.classList.add('selected');
          const nameEl = $('#find-name'), subEl = $('#find-sub');
          if (nameEl) nameEl.textContent = item.name;
          if (subEl) subEl.textContent = (item.location || '未填写') + ' · 地图标签已选中';
          vibrate(10);
        });
        marker.setMap(map);
      });

      holder.classList.remove('hidden');
      $$('.find-map > :not(#amap-container)').forEach(function (el) { el.classList.add('hidden'); });
      const status = $('#find-status');
      if (status) status.textContent = '高德地图已定位';
      toast('已加载高德地图 · 当前空间 ' + spaceLabel(space));
    }).catch(function (err) {
      holder.classList.add('hidden');
      toast(err.message === 'NO_KEY' ? '未配置高德 Key，使用示意地图' : '高德地图加载失败，已回退示意地图', 'warn');
    });
  }

  function openFind(id) {
    const d = db.devices.find(function (x) { return x.id === id; });
    if (d) showFind(d);
  }

  function openItemFind(id) {
    const item = getUserItems().find(function (i) { return i.id === id; });
    if (!item) return;
    showFind({ id: 'item_' + id, name: item.name + ' · 物品查找', itemId: id, zone: item.location || '未填写位置', signal: 4 });
  }

  function showFind(d) {
    const items = getUserItems();
    const linked = items.find(function (i) { return i.id === d.itemId; });
    const animal = linked ? animalKey(linked, 0) : 'cat';
    const bars = [1, 2, 3, 4].map(function (n) { return '<i class="' + (n <= d.signal ? 'on' : '') + '"></i>'; }).join('');

    $('#overlay-root').innerHTML =
      '<div class="find-mask">' +
        '<div class="find-head">' +
          '<button class="find-back" data-action="close-overlay">' + ICON.back + '</button>' +
          '<div class="find-head-text"><h3>查找物品</h3><p>' + escapeHTML(d.name) + ' · 标签正在发声</p></div>' +
          '<span class="find-live"><i></i>LIVE</span>' +
        '</div>' +
        findMapHTML(d) +
        '<div class="find-panel">' +
          '<div class="find-target" id="find-target">' +
            '<div class="ft-animal">' + ICON['a_' + animal] + '</div>' +
            '<div class="ft-info"><b id="find-name">' + (linked ? escapeHTML(linked.name) : '未绑定物品') + '</b>' +
              '<p id="find-sub">' + escapeHTML(d.zone) + ' · 信号 ' + d.signal + '/4</p></div>' +
            '<span class="ft-state" id="find-status">正在呼叫…</span>' +
          '</div>' +
          '<div class="find-signal"><span>信号强度</span><div class="find-bars">' + bars + '</div></div>' +
          '<button class="btn primary block" data-action="close-overlay">停止查找</button>' +
        '</div>' +
      '</div>';

    vibrate([20, 60, 20]);
    state.mapZoom = 1; state.mapPanX = 0; state.mapPanY = 0;
    applyMapTransform();
    initMapGestures();
    setTimeout(function () {
      const s = $('#find-status');
      if (s && !s.textContent.includes('高德')) s.textContent = '标签已响铃';
    }, 1400);
    initRealMap(d);
  }

  function initMapGestures() {
    const map = $('#find-map');
    if (!map) return;
    let lastDist = null, lastX = null, lastY = null, mode = null;
    function dist(t) { return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY); }
    map.addEventListener('touchstart', function (e) {
      if (e.touches.length === 2) { mode = 'pinch'; lastDist = dist(e.touches); }
      else if (e.touches.length === 1) { mode = 'pan'; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; }
    }, { passive: true });
    map.addEventListener('touchmove', function (e) {
      if (mode === 'pinch' && e.touches.length === 2) {
        const d = dist(e.touches);
        if (lastDist) {
          state.mapZoom = Math.min(2.4, Math.max(0.6, state.mapZoom * d / lastDist));
          applyMapTransform();
        }
        lastDist = d;
      } else if (mode === 'pan' && e.touches.length === 1) {
        const x = e.touches[0].clientX, y = e.touches[0].clientY;
        if (lastX !== null) {
          const limit = 90 * state.mapZoom;
          state.mapPanX = Math.max(-limit, Math.min(limit, state.mapPanX + (x - lastX)));
          state.mapPanY = Math.max(-limit, Math.min(limit, state.mapPanY + (y - lastY)));
          applyMapTransform();
        }
        lastX = x; lastY = y;
      }
    }, { passive: true });
    map.addEventListener('touchend', function () { mode = null; lastDist = null; lastX = null; lastY = null; }, { passive: true });
  }

  function openBind(id) {
    const d = db.devices.find(function (x) { return x.id === id; });
    if (!d) return;
    const items = getUserItems();
    if (!items.length) { toast('请先添加物品', 'warn'); return; }
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>绑定物品</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="field"><label>选择要绑定的物品</label><select id="bind-item">' +
          items.map(function (i) {
            return '<option value="' + i.id + '" ' + (d.itemId === i.id ? 'selected' : '') + '>' + escapeHTML(i.name) + '</option>';
          }).join('') +
        '</select></div>' +
        '<div class="field"><label>收纳区域</label><input id="bind-zone" value="' + escapeHTML(d.zone) + '" placeholder="例如：储物间"></div>' +
        '<div class="sheet-actions">' +
          '<button class="btn ghost" data-action="close-sheet">取消</button>' +
          '<button class="btn primary" data-action="save-bind" data-id="' + d.id + '">保存绑定</button>' +
        '</div>' +
      '</div></div>';
  }

  /* ---------------- Camera ---------------- */

  function compressImage(src, callback) {
    const img = new Image();
    img.onload = function () {
      const max = 1800;
      let w = img.width, h = img.height;
      const scale = Math.min(1, max / Math.max(w, h));
      w = Math.round(w * scale); h = Math.round(h * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.onerror = function () { toast('图片读取失败', 'error'); };
    img.src = src;
  }

  function isDraftTarget(target) {
    return target === 'item' || target === 'location' || target === 'expiry';
  }

  function addDraftPhoto(cat, data) {
    if (!state.photoDraft[cat]) state.photoDraft[cat] = [];
    state.photoDraft[cat].push(data);
    renderPhotoDraft();
    if (cat === 'item') runAI();
  }

  function renderPhotoDraft() {
    ['item', 'location', 'expiry'].forEach(function (cat) {
      const box = $('#draft-' + cat);
      if (!box) return;
      const list = state.photoDraft[cat] || [];
      box.innerHTML = list.length
        ? list.map(function (src, i) {
            return '<span class="draft-thumb"><img src="' + src + '" alt="照片' + (i + 1) + '">' +
              '<i data-action="remove-draft" data-cat="' + cat + '" data-index="' + i + '">✕</i></span>';
          }).join('')
        : '<small class="draft-empty">暂无照片（选填）</small>';
    });
  }

  function setPhoto(target, data) {
    if (isDraftTarget(target)) {
      addDraftPhoto(target, data);
      return;
    }
    const hidden = $('#' + target + '-photo');
    const preview = $('#' + target + '-photo-preview');
    if (hidden) hidden.value = data;
    if (preview) preview.innerHTML = '<img src="' + data + '" alt="预览">';
    closeOverlay();
    if (target === 'avatar') {
      const user = currentUser();
      if (user) { user.profile = user.profile || {}; user.profile.avatar = data; saveDB(); toast('头像已更新'); renderApp(true); }
      return;
    }
    toast('照片已添加');
  }

  function startCamera() {
    const video = $('#cam-video');
    const ph = $('#cam-placeholder');
    if (!video || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (ph) ph.style.display = '';
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false })
      .then(function (stream) {
        activeStream = stream;
        video.srcObject = stream;
        video.setAttribute('playsinline', '');
        video.play();
        if (ph) ph.style.display = 'none';
      })
      .catch(function () { if (ph) ph.style.display = ''; });
  }

  function openCamera(target) {
    state.photoCategory = target;
    const titles = { item: '拍摄物品照片', location: '拍摄存放地点', expiry: '拍摄保质期', avatar: '更换头像', post: '拍摄动态图片' };
    $('#overlay-root').innerHTML =
      '<div class="full-mask camera-mask">' +
        '<div class="full-head cam-head">' +
          '<button class="back cam-back" data-action="close-camera" aria-label="返回">' + ICON.back + '</button>' +
          '<h2>' + (titles[target] || '拍照') + '</h2>' +
          '<button class="cam-cancel" data-action="close-camera">完成</button></div>' +
        '<div class="camera-stage"><video id="cam-video" autoplay playsinline muted></video>' +
          '<div class="cam-placeholder" id="cam-placeholder">' + ICON.camera +
            '<p>相机预览不可用，可调用系统相机或从相册选择</p>' +
            '<button class="btn soft" data-action="native-camera" data-target="' + target + '">调用系统相机</button></div>' +
        '</div>' +
        '<div class="camera-controls">' +
          '<button class="cam-side" data-action="pick-photo" data-target="' + target + '">' + ICON.grid + '<span>相册（可多选）</span></button>' +
          '<button class="capture-btn" data-action="capture-photo" data-target="' + target + '" aria-label="拍照"></button>' +
          '<button class="cam-side" data-action="camera-ai" data-target="' + target + '">' + ICON.sparkle + '<span>AI 识别</span></button>' +
        '</div>' +
      '</div>';
    setTimeout(startCamera, 80);
  }

  function nativeCamera(target, aiMode) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.setAttribute('capture', 'environment');
    input.onchange = function (e) {
      const file = (e.target.files || [])[0];
      if (!file) return;
      const nameField = $('#item-photo-name');
      if (nameField && target === 'item') nameField.value = file.name;
      const reader = new FileReader();
      reader.onload = function (ev) {
        compressImage(ev.target.result, function (data) { openPhotoActions(target, data, !!aiMode); });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  function openPhotoActions(target, data, aiMode) {
    state.photoPending = { target: target, data: data, aiMode: !!aiMode };
    $('#overlay-root').innerHTML =
      '<div class="full-mask photo-action-mask">' +
        '<div class="photo-action-card">' +
          '<div class="photo-action-head"><b>拍摄完成</b><span>可直接使用、裁剪或重新拍摄</span></div>' +
          '<img class="photo-action-preview" src="' + data + '" alt="拍摄预览">' +
          '<div class="photo-action-btns">' +
            '<button class="btn primary" data-action="photo-use">使用照片</button>' +
            '<button class="btn ghost" data-action="photo-crop">裁剪照片</button>' +
          '</div>' +
          '<div class="photo-action-mini">' +
            '<button data-action="photo-retake">重新拍摄</button>' +
            '<button data-action="photo-cancel">退出拍照</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function openPhotoCrop() {
    const p = state.photoPending;
    if (!p) return;
    state.crop = null;
    $('#overlay-root').innerHTML =
      '<div class="full-mask crop-mask">' +
        '<div class="crop-head"><button data-action="photo-cancel">取消</button><b>' + translateText('裁剪照片') + '</b><button data-action="crop-apply">' + translateText('完成') + '</button></div>' +
        '<div class="crop-stage">' +
          '<div class="crop-viewport" id="crop-viewport">' +
            '<img id="photo-crop-img" src="' + p.data + '" alt="裁剪预览">' +
            '<div class="crop-grid"><i></i><i></i><i></i><i></i></div>' +
            '<div class="crop-corner tl"></div><div class="crop-corner tr"></div>' +
            '<div class="crop-corner bl"></div><div class="crop-corner br"></div>' +
          '</div>' +
        '</div>' +
        '<p class="crop-hint">' + translateText('拖动照片选择区域，双指可缩放') + '</p>' +
        '<div class="crop-tools">' +
          '<button data-action="crop-reset">' + translateText('重置') + '</button>' +
          '<button data-action="crop-rotate-left">↶ ' + translateText('左转') + '</button>' +
          '<button data-action="crop-rotate-right">↷ ' + translateText('右转') + '</button>' +
        '</div>' +
        '<button class="crop-retake" data-action="photo-retake">' + translateText('重新拍摄') + '</button>' +
      '</div>';
    const img = $('#photo-crop-img');
    const vp = $('#crop-viewport');
    if (img && vp) {
      const init = function () {
        const size = vp.getBoundingClientRect().width || 320;
        const iw = img.naturalWidth || size, ih = img.naturalHeight || size;
        img.style.width = iw + 'px';
        img.style.height = ih + 'px';
        img.style.marginLeft = (-iw / 2) + 'px';
        img.style.marginTop = (-ih / 2) + 'px';
        state.crop = { rot: 0, scale: 1, x: 0, y: 0, size: size, iw: iw, ih: ih, base: 1 };
        recomputeCropBase();
        renderCropImage();
      };
      if (img.complete && img.naturalWidth) init();
      else img.onload = init;
    }
    setTimeout(bindCropPan, 0);
  }

  function cropDims() {
    const c = state.crop;
    const rotated = Math.abs(c.rot % 180) === 90;
    return { bw: rotated ? c.ih : c.iw, bh: rotated ? c.iw : c.ih };
  }
  function cropK() { const c = state.crop; return c.base * c.scale; }
  function recomputeCropBase() {
    const c = state.crop;
    if (!c) return;
    const d = cropDims();
    c.base = Math.max(c.size / Math.max(1, d.bw), c.size / Math.max(1, d.bh));
  }
  function clampCrop() {
    const c = state.crop;
    if (!c) return;
    const d = cropDims(), k = cropK();
    const mx = Math.max(0, (d.bw * k - c.size) / 2);
    const my = Math.max(0, (d.bh * k - c.size) / 2);
    c.x = Math.max(-mx, Math.min(mx, c.x));
    c.y = Math.max(-my, Math.min(my, c.y));
  }
  function renderCropImage() {
    const img = $('#photo-crop-img'), c = state.crop;
    if (!img || !c) return;
    clampCrop();
    img.style.transform = 'translate(' + c.x + 'px,' + c.y + 'px) rotate(' + c.rot + 'deg) scale(' + cropK() + ')';
  }
  function resetCropBox() {
    if (!state.crop) return;
    state.crop.rot = 0; state.crop.scale = 1; state.crop.x = 0; state.crop.y = 0;
    recomputeCropBase(); renderCropImage();
  }
  function rotateCrop(deg) {
    if (!state.crop) return;
    state.crop.rot = (state.crop.rot + deg + 360) % 360;
    state.crop.scale = 1; state.crop.x = 0; state.crop.y = 0;
    recomputeCropBase(); renderCropImage();
  }
  function bindCropPan() {
    const vp = $('#crop-viewport');
    if (!vp) return;
    let drag = null, pinch = null;
    vp.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || !state.crop) return;
      drag = { sx: e.clientX, sy: e.clientY, x: state.crop.x, y: state.crop.y };
      vp.setPointerCapture(e.pointerId);
    });
    vp.addEventListener('pointermove', function (e) {
      if (!drag || !state.crop) return;
      state.crop.x = drag.x + (e.clientX - drag.sx);
      state.crop.y = drag.y + (e.clientY - drag.sy);
      renderCropImage();
    });
    const end = function () { drag = null; };
    vp.addEventListener('pointerup', end);
    vp.addEventListener('pointercancel', end);
    vp.addEventListener('wheel', function (e) {
      if (!state.crop) return;
      e.preventDefault();
      state.crop.scale = Math.max(1, Math.min(4, state.crop.scale * (e.deltaY < 0 ? 1.1 : 0.9)));
      renderCropImage();
    }, { passive: false });
    vp.addEventListener('touchstart', function (e) {
      if (!state.crop) return;
      if (e.touches.length === 1) {
        drag = { sx: e.touches[0].clientX, sy: e.touches[0].clientY, x: state.crop.x, y: state.crop.y };
      } else if (e.touches.length === 2) {
        drag = null;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinch = { dist: Math.hypot(dx, dy) || 1, scale: state.crop.scale };
      }
    }, { passive: false });
    vp.addEventListener('touchmove', function (e) {
      if (!state.crop) return;
      e.preventDefault();
      if (e.touches.length === 1 && drag) {
        state.crop.x = drag.x + (e.touches[0].clientX - drag.sx);
        state.crop.y = drag.y + (e.touches[0].clientY - drag.sy);
        renderCropImage();
      } else if (e.touches.length === 2 && pinch) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        state.crop.scale = Math.max(1, Math.min(4, pinch.scale * (Math.hypot(dx, dy) || 1) / pinch.dist));
        renderCropImage();
      }
    }, { passive: false });
    vp.addEventListener('touchend', function () { drag = null; pinch = null; });
  }

  function applyPhotoCrop() {
    const p = state.photoPending;
    const img = $('#photo-crop-img');
    const c = state.crop;
    if (!p || !img || !c) return;
    const iw = img.naturalWidth || c.iw, ih = img.naturalHeight || c.ih;
    const k = cropK();
    const rot = (c.rot * Math.PI) / 180;
    const vpSize = c.size;
    const out = 1200;
    const canvas = document.createElement('canvas');
    canvas.width = out; canvas.height = out;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, out, out);
    ctx.translate(out / 2, out / 2);
    ctx.translate((out / vpSize) * c.x, (out / vpSize) * c.y);
    ctx.scale(out / vpSize, out / vpSize);
    ctx.rotate(rot);
    ctx.scale(k, k);
    ctx.drawImage(img, -iw / 2, -ih / 2);
    setPhoto(p.target, canvas.toDataURL('image/jpeg', 0.92));
    closeOverlay();
    state.photoPending = null;
    state.crop = null;
  }

  function grabCameraFrame() {
    const video = $('#cam-video');
    if (!video || !video.videoWidth) return '';
    const canvas = document.createElement('canvas');
    const max = 640;
    let w = video.videoWidth, h = video.videoHeight;
    const scale = Math.min(1, max / Math.max(w, h));
    w = Math.round(w * scale); h = Math.round(h * scale);
    canvas.width = w; canvas.height = h;
    canvas.getContext('2d').drawImage(video, 0, 0, w, h);
    return canvas.toDataURL('image/jpeg', 0.6);
  }

  function capturePhoto(target) {
    const data = grabCameraFrame();
    if (!data) { toast('相机尚未就绪，可先点相册选择', 'warn'); return; }
    setPhoto(target, data);
    vibrate(10);
    toast('照片已添加，可继续拍摄');
  }

  function cameraAI(target) {
    const data = grabCameraFrame();
    if (data) setPhoto(target, data);
    const draft = state.photoDraft.item || [];
    if (!draft.length) { pickPhoto(target); return; }
    closeOverlay();
    toast('AI 正在识别照片…');
    runAI();
  }

  function pickPhoto(target) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = function (e) {
      const files = Array.prototype.slice.call(e.target.files || []);
      if (!files.length) return;
      const nameField = $('#item-photo-name');
      if (nameField && target === 'item') nameField.value = files[0].name;
      let left = files.length;
      files.forEach(function (file) {
        const reader = new FileReader();
        reader.onload = function (ev) {
          compressImage(ev.target.result, function (data) {
            setPhoto(target, data);
            left--;
            if (left === 0) closeOverlay();
          });
        };
        reader.readAsDataURL(file);
      });
    };
    input.click();
  }

  /* ---------------- Item sheet ---------------- */

  function locationChipsHTML(selected) {
    const keys = db.spaceKeys || DEFAULT_SPACE_KEYS;
    return keys.map(function (key) {
      const s = SPACES.find(function (x) { return x.key === key; }) || { key: key, label: key, icon: 'box' };
      return '<button type="button" class="loc-chip ' + (selected === key ? 'on' : '') + '" data-action="pick-location" data-value="' + escapeHTML(key) + '">' +
        (ICON[s.icon] ? ICON[s.icon] : ICON.box) + escapeHTML(s.label) + '</button>';
    }).join('');
  }

  function unitOptionsHTML(selected) {
    const custom = (db.customUnits || []).filter(function (u) { return UNIT_OPTIONS.indexOf(u) === -1; });
    const all = UNIT_OPTIONS.slice(0, -1).concat(custom, ['自定义']);
    return all.map(function (u) {
      return '<option value="' + escapeHTML(u) + '"' + (selected === u ? ' selected' : '') + '>' + escapeHTML(u) + '</option>';
    }).join('');
  }

  function dateTriggerHTML(id, value, label, required) {
    return '<input type="hidden" id="' + id + '" value="' + escapeHTML(value || '') + '">' +
      '<button type="button" class="date-trigger" data-action="pick-date" data-field="' + id + '">' +
        '<span>' + escapeHTML(value || '请选择日期') + '</span><i>' + ICON.calendar + '</i></button>';
  }

  function openItemSheet(itemId) {
    const item = itemId ? getUserItems().find(function (i) { return i.id === itemId; }) : null;
    const isEdit = !!item;
    const data = item || { name: '', category: 'food', quantity: 1, location: state.locationPreFill || '', storedAt: todayStr(), expiryDate: '', notes: '', photo: '' };
    state.locationPreFill = '';
    const savedPhotos = data.photos || {};
    state.photoDraft = {
      item: (savedPhotos.item || []).slice(),
      location: (savedPhotos.location || []).slice(),
      expiry: (savedPhotos.expiry || []).slice()
    };
    if (!state.photoDraft.item.length && data.photo) state.photoDraft.item.push(data.photo);

    state.aiDetections = [];
    const currentUnit = data.unit || '件';
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="form-sticky-head">' +
          '<div class="sheet-head sheet-head-form">' +
            '<button class="sheet-close" data-action="close-sheet" aria-label="关闭">✕</button>' +
            '<h2>' + (isEdit ? '编辑物品' : '添加物品') + '</h2>' +
            '<button type="submit" form="item-form" class="sheet-save">' + (isEdit ? '保存' : '保存') + '</button>' +
          '</div>' +
          '<p class="required-hint"><b>*</b> 为必填项，未标注的为选填项</p>' +
        '</div>' +
        '<form id="item-form">' +
          '<div class="photo-section">' +
            photoBlockHTML('item', '物品照片', '拍照后可点 AI 识别，自动填写物品名称和分类，原图保持不变') +
            photoBlockHTML('location', '存放地点照片', '拍下柜子 / 冰箱等位置，详情里会放大展示') +
            photoBlockHTML('expiry', '保质期照片', '可拍下包装上的保质期日期，方便日后核对') +
            '<p class="photo-optional">以上照片均为选填，不拍照也能保存物品。</p>' +
            '<input type="hidden" id="item-photo-name" value="">' +
          '</div>' +
          '<div class="ai-result" id="ai-result"></div>' +
          '<div class="field"><label>物品名称 *</label><input id="f-name" data-item-id="' + (isEdit ? item.id : '') + '" maxlength="60" placeholder="例如：牛奶、文件夹" value="' + escapeHTML(data.name) + '"></div>' +
          '<div class="form-row">' +
            '<div class="field"><label>分类</label><select id="f-category">' +
              allCategories().map(function (c) {
                return '<option value="' + c.key + '" ' + (data.category === c.key ? 'selected' : '') + '>' + c.label + '</option>';
              }).join('') +
              '<option value="custom_new">＋ 自定义分类</option>' +
            '</select>' +
              '<div class="custom-cat-wrap" id="custom-cat-wrap" style="display:' + ((data.category === 'other' || isCustomCategory(data.category)) ? 'block' : 'none') + '">' +
                '<input id="f-category-custom" maxlength="12" placeholder="输入自定义分类名" value="' + escapeHTML(customCategoryLabel(data.category)) + '">' +
              '</div>' +
            '</div>' +
            '<div class="field"><label>数量 *</label>' +
              '<div class="qty-control">' +
                '<button type="button" data-action="qty-minus">−</button>' +
                '<input id="f-quantity" type="number" min="1" step="1" value="' + escapeHTML(data.quantity || 1) + '">' +
                '<button type="button" data-action="qty-plus">＋</button>' +
                '<select id="f-unit">' + unitOptionsHTML(currentUnit) + '</select>' +
              '</div>' +
              '<input id="f-unit-custom" class="unit-custom" maxlength="6" placeholder="输入自定义单位" value="' + (UNIT_OPTIONS.indexOf(currentUnit) === -1 && currentUnit !== '自定义' ? escapeHTML(currentUnit) : '') + '" style="display:' + ((currentUnit === '自定义' || UNIT_OPTIONS.indexOf(currentUnit) === -1) ? 'block' : 'none') + '">' +
            '</div>' +
          '</div>' +
          '<div class="field"><label>存放位置</label>' +
            '<input id="f-location" maxlength="80" placeholder="例如：冰箱第二层（自定义会自动加入地图）" value="' + escapeHTML(data.location) + '">' +
            '<div class="hint">选择下方位置，或直接输入自定义位置</div>' +
            '<div class="loc-chips" id="loc-chips">' + locationChipsHTML(data.location) + '</div>' +
          '</div>' +
          '<div class="form-row">' +
            '<div class="field"><label>收纳日期 *</label>' + dateTriggerHTML('f-stored', data.storedAt, '收纳日期', true) + '<div class="hint">什么时候放进去的</div></div>' +
            '<div class="field"><label>保质期至</label>' + dateTriggerHTML('f-expiry', data.expiryDate, '保质期', false) + '<div class="hint">选填，会显示提醒</div></div>' +
          '</div>' +
          '<div class="field"><label>备注</label><textarea id="f-notes" rows="2" maxlength="300" placeholder="补充说明（选填）">' + escapeHTML(data.notes) + '</textarea></div>' +
          '<div class="form-error" id="item-error"></div>' +
        '</form>' +
      '</div></div>';
    renderPhotoDraft();
  }

  function photoBlockHTML(cat, label, hint) {
    return '<div class="photo-block">' +
      '<div class="photo-block-head"><b>' + label + '</b>' +
        '<span class="photo-block-btns">' +
          '<button type="button" class="text-btn" data-action="take-photo" data-target="' + cat + '">拍照</button>' +
          '<button type="button" class="text-btn" data-action="pick-photo" data-target="' + cat + '">相册</button>' +
        '</span></div>' +
      '<div class="draft-list" id="draft-' + cat + '"></div>' +
      '<p class="photo-hint">' + hint + '</p>' +
    '</div>';
  }

  function deleteItem(id) {
    const item = db.items.find(function (i) { return i.id === id; });
    if (!item) return;
    openConfirm('删除物品', '确定删除「' + item.name + '」吗？删除后无法恢复。', function () {
      db.items = db.items.filter(function (i) { return i.id !== id; });
      db.devices.forEach(function (d) { if (d.itemId === id) d.itemId = null; });
      saveDB();
      toast('已删除该物品');
      state.itemsOpen = true;
      renderApp(true);
    });
  }

  function loadSampleData() {
    const user = currentUser();
    const samples = [
      { name: '全脂牛奶', category: 'food', quantity: 2, location: '冰箱冷藏室', storedAt: shiftDate(-3), expiryDate: shiftDate(4), notes: '早餐搭配', photo: '' },
      { name: '维生素C片', category: 'medicine', quantity: 1, location: '客厅药箱', storedAt: shiftDate(-20), expiryDate: shiftDate(60), notes: '每天一片', photo: '' },
      { name: '防晒霜', category: 'cosmetic', quantity: 1, location: '梳妆台抽屉', storedAt: shiftDate(-100), expiryDate: shiftDate(120), notes: '', photo: '' },
      { name: '冬季围巾', category: 'clothing', quantity: 1, location: '衣柜上层', storedAt: shiftDate(-30), expiryDate: '', notes: '换季收纳', photo: '' },
      { name: '项目合同', category: 'document', quantity: 3, location: '书房文件柜', storedAt: shiftDate(-7), expiryDate: '', notes: '重要文件', photo: '' },
      { name: '充电宝', category: 'electronic', quantity: 1, location: '玄关抽屉', storedAt: shiftDate(-15), expiryDate: '', notes: '', photo: '' },
      { name: '鸡蛋', category: 'food', quantity: 10, location: '冰箱第一层', storedAt: shiftDate(-10), expiryDate: shiftDate(-2), notes: '已过期，记得清理', photo: '' }
    ];
    samples.forEach(function (s) {
      db.items.push(Object.assign({ id: uid(), userId: user.id, createdAt: new Date().toISOString() }, s));
    });
    saveDB();
    toast('已载入示例数据');
    state.itemsOpen = true;
    renderApp(true);
  }

  /* ---------------- Profile ---------------- */

  function settingRow(icon, label, sub, action, extra) {
    return '<button class="set-row" data-action="' + action + '" ' + (extra || '') + '>' +
      '<span class="set-ico">' + (ICON[icon] || ICON.grid) + '</span>' +
      '<span class="set-label"><b>' + label + '</b>' + (sub ? '<small>' + sub + '</small>' : '') + '</span>' +
      '<span class="set-arrow">›</span></button>';
  }

  function settingsGroup(title, key, rows) {
    const collapsed = !!(state.collapsedGroups && state.collapsedGroups[key]);
    return '<div class="set-group' + (collapsed ? ' collapsed' : '') + '">' +
      '<button class="set-group-title" data-action="toggle-group" data-key="' + key + '">' +
        '<span>' + title + '</span><span class="group-chevron">' + ICON.back + '</span></button>' +
      '<div class="set-group-body">' + rows + '</div></div>';
  }

  function profileHTML() {
    const user = currentUser();
    const p = user.profile || {};
    const name = p.name || user.username;
    const s = db.settings;
    const theme = THEMES.find(function (t) { return t.key === s.theme; }) || THEMES[0];
    const avatar = p.avatar
      ? '<img src="' + p.avatar + '" alt="头像">'
      : escapeHTML(name.charAt(0).toUpperCase());
    const fontLabel = s.fontScale <= 1.12 ? '标准' : (s.fontScale <= 1.35 ? '大' : '超大');
    const weightLabel = s.fontWeight === 400 ? '常规' : (s.fontWeight === 600 ? '标准（半粗）' : '加粗');
    const languageLabel = ({ system: '跟随系统', 'zh-CN': '简体中文', 'zh-Hant': '繁體中文', en: 'English' })[s.language] || '跟随系统';
    const myCount = getUserItems().length;

    const profileHead =
      '<button class="profile-head" data-action="change-avatar" style="width:100%;cursor:pointer">' +
        '<div class="profile-avatar' + frameClassOf(user, myCount) + '">' + avatar + '<span class="avatar-edit">✎</span>' + badgeOf(user, myCount) + '</div>' +
        '<h2>' + escapeHTML(name) + '</h2><p>@' + escapeHTML(user.username) + ' · ID ' + (user.friendId || '—') + '</p></button>';

    return '<div class="page settings-page">' +
      wrapCard(profileHead, user, myCount) +

        settingsGroup('个人信息', 'profile',
          settingRow('user', '昵称', name, 'edit-field', 'data-field="name"') +
          settingRow('comment', '联系方式', p.contact || '未填写', 'edit-field', 'data-field="contact"') +
          settingRow('book', '个性签名', p.bio || '未填写', 'edit-field', 'data-field="bio"') +
          settingRow('trophy', '成就等级', '第 ' + (achIndex(myCount) + 1) + ' 级 · ' + achievementLevels()[achIndex(myCount)].name + ' · 装扮管理', 'show-achievements')) +

        settingsGroup('界面设置', 'ui',
          settingRow('grid', '字体大小', fontLabel, 'settings-font') +
          settingRow('edit', '字体粗细', weightLabel, 'settings-weight') +
          settingRow('sparkle', '界面颜色', theme.label, 'settings-theme') +
          settingRow('book', '语言', languageLabel, 'settings-language')) +

        settingsGroup('功能设置', 'feature',
          '<div class="set-row elder-row" data-action="toggle-setting" data-key="elderMode"><span class="set-ico">' + ICON.user + '</span>' +
            '<span class="set-label"><b>老年模式</b><small>超大字体 · 高对比 · 简化功能</small></span>' +
            '<span class="switch ' + (s.elderMode ? 'on' : '') + '"><i></i></span></div>' +
          '<div class="set-row" data-action="toggle-setting" data-key="notify"><span class="set-ico">' + ICON.bell + '</span>' +
            '<span class="set-label"><b>消息通知</b><small>接收提醒与聊天消息</small></span>' +
            '<span class="switch ' + (s.notify ? 'on' : '') + '"><i></i></span></div>' +
          settingRow('clock', '通知时间', s.notifyTime + ' · 到期与临期提醒', 'settings-notify-time') +
          '<div class="set-row" data-action="toggle-setting" data-key="sound"><span class="set-ico">' + ICON.bell + '</span>' +
            '<span class="set-label"><b>提示音</b><small>查找标签时播放声音</small></span>' +
            '<span class="switch ' + (s.sound ? 'on' : '') + '"><i></i></span></div>' +
          '<div class="set-row" data-action="toggle-setting" data-key="secure"><span class="set-ico">' + ICON.shield + '</span>' +
            '<span class="set-label"><b>账号安全</b><small>登录验证与密码保护</small></span>' +
            '<span class="switch ' + (s.secure ? 'on' : '') + '"><i></i></span></div>' +
          settingRow('shield', '修改密码', '更新登录密码', 'change-password') +
          settingRow('book', '使用指南', '操作步骤与颜色说明', 'open-guide')) +

        '<button class="set-row" data-action="show-changelog" style="width:100%;background:var(--paper);border-radius:14px;margin-bottom:14px">' +
          '<span class="set-ico">' + ICON.book + '</span>' +
          '<span class="set-label"><b>版本与更新</b><small>查看历史更新内容</small></span>' +
          '<span class="version-badge">v' + APP_VERSION + '</span><span class="set-arrow">›</span></button>' +
        '<div class="info-card" style="text-align:center;color:var(--ink-soft);font-size:12px">' +
          '注册于 ' + formatDate(String(user.createdAt || '').slice(0, 10)) + ' · 已收纳 ' + getUserItems().length + ' 件物品</div>' +
        '<button class="btn ghost block" data-action="logout" style="color:#c98d86">退出登录</button>' +
      '</div>';
  }

  function logSections(log) {
    if (log.sections && log.sections.length) return log.sections;
    return [{ label: '更新内容', icon: 'sparkle', items: log.items || [] }];
  }

  function logAllItems(log) {
    const out = [];
    logSections(log).forEach(function (s) { s.items.forEach(function (t) { out.push(t); }); });
    return out;
  }

  function showChangelog() {
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>版本与更新</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">当前版本 v' + APP_VERSION + ' · 版本号按 1.01 → 1.02 依次递进</p>' +
        CHANGELOG.map(function (log, i) {
          return '<div class="version-item">' +
            '<div class="version-head"><span class="version-num">v' + log.version + '</span>' +
              (i === 0 ? '<span class="version-latest">当前版本</span>' : '') +
              '<span class="version-date">' + log.date + '</span></div>' +
            '<h4>' + escapeHTML(log.title) + '</h4>' +
            logSections(log).map(function (sec) {
              return '<div class="cl-section">' +
                '<div class="cl-label ' + (sec.icon || 'sparkle') + '">' + (ICON[sec.icon] || ICON.sparkle) + escapeHTML(sec.label) + '</div>' +
                '<ul>' + sec.items.map(function (t) { return '<li>' + escapeHTML(t) + '</li>'; }).join('') + '</ul>' +
              '</div>';
            }).join('') +
          '</div>';
        }).join('') +
        '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">关闭</button></div>' +
      '</div></div>';
    applyLanguage();
  }

  function settingsSheet(kind) {
    const s = db.settings;
    let body = '';
    let title = '';
    if (kind === 'font') {
      title = '字体大小';
      body = '<p class="sheet-tip">选择适合自己的阅读字号</p>' +
        [[1.12, '标准'], [1.35, '大'], [1.6, '超大']].map(function (o) {
          return '<button class="opt-row ' + (s.fontScale === o[0] ? 'on' : '') + '" data-action="set-font" data-value="' + o[0] + '"><b>' + o[1] + '</b><span>' + (s.fontScale === o[0] ? '✓' : '') + '</span></button>';
        }).join('');
    } else if (kind === 'weight') {
      title = '字体粗细';
      body = '<p class="sheet-tip">标准即半粗，推荐日常使用</p>' +
        [[400, '常规'], [600, '标准（半粗）'], [700, '加粗']].map(function (o) {
          return '<button class="opt-row ' + (s.fontWeight === o[0] ? 'on' : '') + '" data-action="set-weight" data-value="' + o[0] + '"><b>' + o[1] + '</b><span>' + (s.fontWeight === o[0] ? '✓' : '') + '</span></button>';
        }).join('');
    } else if (kind === 'notifyTime') {
      title = '通知时间';
      body = '<p class="sheet-tip">可自由设置到期提醒、临期提醒等消息的提醒时间</p>' +
        '<div class="field notify-custom"><label>提醒时间</label>' +
        '<input id="notify-time-custom" type="time" value="' + escapeHTML(s.notifyTime) + '">' +
        '<div class="hint">修改后点击下面的按钮保存</div>' +
        '<button type="button" class="btn primary block" data-action="save-notify-time">保存提醒时间</button></div>';
    } else if (kind === 'language') {
      title = '语言';
      body = '<p class="sheet-tip">选择 App 显示语言</p>' +
        [['system', '跟随系统'], ['zh-CN', '简体中文'], ['zh-Hant', '繁體中文'], ['en', 'English']].map(function (o) {
          return '<button class="opt-row ' + (s.language === o[0] ? 'on' : '') + '" data-action="set-language" data-value="' + o[0] + '"><b>' + o[1] + '</b><span>' + (s.language === o[0] ? '✓' : '') + '</span></button>';
        }).join('');
    } else {
      title = '界面颜色';
      body = '<p class="sheet-tip">选择你喜欢的主题色，立即生效</p>' +
        '<div class="theme-grid">' + THEMES.map(function (t) {
          return '<button class="theme-opt ' + (s.theme === t.key ? 'on' : '') + '" data-action="set-theme" data-value="' + t.key + '">' +
            '<span class="theme-dot" style="background:' + t.vars['--sage'] + ';border-color:' + t.vars['--sage-deep'] + '">' + (s.theme === t.key ? '✓' : '') + '</span>' +
            '<small>' + t.label + '</small></button>';
        }).join('') + '</div>';
    }
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>' + title + '</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        body +
      '</div></div>';
    applyLanguage();
  }

  function openEditField(field) {
    const user = currentUser();
    const p = user.profile || {};
    const labelMap = { name: '昵称', contact: '联系方式', bio: '个性签名' };
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>修改' + labelMap[field] + '</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="field"><label>' + labelMap[field] + '</label>' +
          (field === 'bio' ? '<textarea id="edit-field-value" rows="4">' + escapeHTML(p[field] || '') + '</textarea>'
            : '<input id="edit-field-value" maxlength="60" value="' + escapeHTML(p[field] || '') + '">') + '</div>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
          '<button class="btn primary" data-action="save-field" data-field="' + field + '">保存</button></div>' +
      '</div></div>';
  }

  function openDatePicker(field) {
    const input = $('#' + field);
    if (!input) return;
    const value = input.value || '';
    const d = value ? new Date(value + 'T00:00:00') : new Date();
    state.datePicker = {
      field: field,
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      selected: value
    };
    renderDatePicker();
  }

  function dateGridHTML() {
    const dp = state.datePicker;
    const days = new Date(dp.year, dp.month, 0).getDate();
    const first = (new Date(dp.year, dp.month - 1, 1).getDay() + 6) % 7;
    const blanks = Array(first).join('<i></i>');
    const cells = [];
    for (let day = 1; day <= days; day++) {
      const value = dp.year + '-' + pad(dp.month) + '-' + pad(day);
      cells.push('<button type="button" class="date-day' + (dp.selected === value ? ' on' : '') + '" data-action="date-pick" data-day="' + value + '">' + day + '</button>');
    }
    return blanks + cells.join('');
  }

  function refreshDateView() {
    const dp = state.datePicker;
    if (!dp) return;
    const title = $('.date-picker-top b');
    const grid = $('.date-grid');
    if (title) title.textContent = dp.year + ' 年 ' + pad(dp.month) + ' 月';
    if (grid) grid.innerHTML = dateGridHTML();
  }

  function renderDatePicker() {
    const dp = state.datePicker;
    if (!dp) return;
    $('#overlay-root').innerHTML =
      '<div class="full-mask date-mask">' +
        '<div class="date-sheet">' +
          '<div class="sheet-head"><h2>选择日期</h2><button class="sheet-close" data-action="date-close">✕</button></div>' +
          '<div class="date-picker">' +
            '<div class="date-picker-top"><b>' + dp.year + ' 年 ' + pad(dp.month) + ' 月</b>' +
              '<span><button type="button" data-action="date-prev">‹</button><button type="button" data-action="date-next">›</button></span></div>' +
            '<div class="date-week"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>' +
            '<div class="date-grid">' + dateGridHTML() + '</div>' +
            '<div class="date-actions"><button type="button" class="btn primary block" data-action="date-confirm">确定</button></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    applyLanguage();
  }

  function confirmDatePicker() {
    const dp = state.datePicker;
    if (!dp) return;
    const input = $('#' + dp.field);
    if (input) input.value = dp.selected || '';
    const trigger = $('.date-trigger[data-field="' + dp.field + '"] span');
    if (trigger) trigger.textContent = dp.selected || '请选择日期';
    state.datePicker = null;
    closeOverlay();
  }

  /* ---------------- Actions ---------------- */

  function handleAction(action, el) {
    switch (action) {
      case 'auth-tab':
        state.authTab = el.dataset.value; renderAuth(); break;
      case 'toggle-pwd':
        const pwd = $('#' + el.dataset.target);
        if (pwd) {
          const show = pwd.type === 'password';
          pwd.type = show ? 'text' : 'password';
          el.innerHTML = show ? ICON.eye : ICON.eyeOff;
        }
        break;
      case 'add-item': openItemSheet(); break;
      case 'edit-item': openItemSheet(el.dataset.id); break;
      case 'delete-item': deleteItem(el.dataset.id); break;
      case 'toggle-items': state.itemsOpen = !state.itemsOpen; renderApp(); break;
      case 'show-hub': state.view = 'hub'; renderApp(true); break;
      case 'hub-go':
        state.view = el.dataset.navTarget || 'hub';
        if (state.view === 'alerts' || state.view === 'guide') state.backTo = 'hub';
        if (el.dataset.tab === 'feed' || el.dataset.tab === 'chat') state.communityTab = el.dataset.tab;
        if (el.dataset.tab === 'map') { state.view = 'home'; state.itemsOpen = true; }
        vibrate(10); renderApp(true); break;
      case 'clear-hub-search': state.hubSearch = ''; renderApp(); break;
      case 'qty-minus':
      case 'qty-plus':
        const qtyInput = $('#f-quantity');
        if (qtyInput) {
          const next = (parseInt(qtyInput.value, 10) || 1) + (action === 'qty-plus' ? 1 : -1);
          qtyInput.value = String(Math.max(1, next));
        }
        break;
      case 'pick-date': openDatePicker(el.dataset.field); break;
      case 'date-prev':
        if (state.datePicker) {
          state.datePicker.month--;
          if (state.datePicker.month < 1) { state.datePicker.month = 12; state.datePicker.year--; }
          refreshDateView();
        }
        break;
      case 'date-next':
        if (state.datePicker) {
          state.datePicker.month++;
          if (state.datePicker.month > 12) { state.datePicker.month = 1; state.datePicker.year++; }
          refreshDateView();
        }
        break;
      case 'date-pick':
        if (state.datePicker) {
          state.datePicker.selected = el.dataset.day;
          $$('.date-day').forEach(function (d) { d.classList.toggle('on', d.dataset.day === state.datePicker.selected); });
        }
        break;
      case 'date-close':
        state.datePicker = null; closeOverlay(); break;
      case 'date-confirm': confirmDatePicker(); break;
      case 'open-storage-map': showStorageMapSheet(); break;
      case 'equip-reward':
        (function () {
          const u = currentUser();
          if (!u) return;
          const type = el.dataset.type, key = el.dataset.key;
          const r = rewardByKey(type, key);
          if (!r || !rewardUnlocked(r, getUserItems().length)) { toast('该装扮尚未解锁', 'warn'); return; }
          if (!u.equipped || typeof u.equipped !== 'object') u.equipped = {};
          u.equipped[type] = (u.equipped[type] === key) ? '' : key;
          saveDB(); showAchievements(); renderApp();
          toast(u.equipped[type] ? '已佩戴' + r.name : '已取下' + r.name);
        })();
        break;
      case 'install-app': installApp(); break;
      case 'edit-spaces': openSpaceEditor(); break;
      case 'toggle-space':
        (function () {
          const sk = el.dataset.key;
          const keys = db.spaceKeys || (db.spaceKeys = []);
          const si = keys.indexOf(sk);
          if (si >= 0) {
            if (keys.length <= 3) { toast('至少保留 3 个格子', 'warn'); return; }
            keys.splice(si, 1);
          } else keys.push(sk);
          saveDB();
          const on = keys.indexOf(sk) !== -1;
          el.classList.toggle('on', on);
          let tick = el.querySelector('i');
          if (on && !tick) el.insertAdjacentHTML('beforeend', '<i>✓</i>');
          if (!on && tick) tick.remove();
        })();
        break;
      case 'add-custom-space':
        (function () {
          const input = $('#custom-space-input');
          const name = input ? input.value.trim() : '';
          if (!name) { toast('请先输入地点名称', 'warn'); return; }
          if (name.length > 10) { toast('地点名称最多 10 个字', 'warn'); return; }
          const exists = SPACES.some(function (s) { return s.key === name || s.label === name; }) ||
            (db.customSpaces || []).some(function (s) { return s.key === name; });
          if (exists) { toast('该地点已存在', 'warn'); return; }
          if (!db.customSpaces) db.customSpaces = [];
          db.customSpaces.push({ key: name, label: name, icon: 'box' });
          if (!db.spaceKeys) db.spaceKeys = [];
          if (db.spaceKeys.indexOf(name) === -1) db.spaceKeys.push(name);
          saveDB();
          const editor = $('#space-editor');
          if (editor) editor.insertAdjacentHTML('beforeend', spaceOptHTML({ key: name, label: name, icon: 'box' }, db.spaceKeys));
          if (input) input.value = '';
          toast('已添加地点「' + name + '」');
        })();
        break;
      case 'reset-spaces':
        db.spaceKeys = DEFAULT_SPACE_KEYS.slice();
        (db.customSpaces || []).forEach(function (s) { if (db.spaceKeys.indexOf(s.key) < 0) db.spaceKeys.push(s.key); });
        saveDB(); openSpaceEditor(); toast('已恢复默认格子'); break;
      case 'edit-device': openDeviceEditor(el.dataset.id); break;
      case 'save-device':
        const ed = db.devices.find(function (d) { return d.id === el.dataset.id; });
        if (ed) {
          ed.name = $('#dev-name').value.trim() || ed.name;
          ed.animal = $('#dev-animal').value;
          saveDB(); closeSheet(); toast('标签已更新'); renderApp(true);
        }
        break;
      case 'toggle-location':
        db.locationEnabled = !db.locationEnabled; saveDB(); renderApp(true);
        toast(db.locationEnabled ? '定位已开启' : '定位已关闭'); break;
      case 'close-sheet': closeSheet(); break;
      case 'close-overlay': closeOverlay(); break;
      case 'close-chat': closeOverlay(); state.chatId = null; break;
      case 'back':
        if (state.view === 'community' || state.view === 'chat') state.view = 'hub';
        else if (state.view === 'location') state.view = 'home';
        else state.view = state.backTo === 'profile' ? 'profile' : (state.backTo === 'hub' ? 'hub' : 'home');
        state.communityTab = 'feed';
        renderApp(true); break;
      case 'add-item-at-location':
        state.locationPreFill = el.dataset.location || '';
        openItemSheet();
        break;
      case 'open-chat-list': state.view = 'chat'; vibrate(10); renderApp(true); break;
      case 'filter':
        state.filter = el.dataset.value;
        vibrate(8);
        $$('.chip').forEach(function (c) { c.classList.toggle('active', c.dataset.value === state.filter); });
        const area = $('#list-area');
        if (area) area.innerHTML = listHTML();
        break;
      case 'space':
        closeSheet();
        state.locationKey = el.dataset.location || '';
        state.search = '';
        state.filter = 'all';
        state.view = 'location';
        vibrate(12);
        renderApp(true);
        break;
      case 'community-tab':
        state.communityTab = el.dataset.value;
        $$('.community-tabs button').forEach(function (b) { b.classList.toggle('active', b.dataset.value === state.communityTab); });
        const content = $('#community-content');
        if (content) content.innerHTML = state.communityTab === 'feed' ? feedHTML() : chatListHTML();
        const fabBtn = $('.fab-post');
        if (fabBtn) fabBtn.style.display = state.communityTab === 'feed' ? '' : 'none';
        break;
      case 'like':
        const post = db.posts.find(function (p) { return p.id === el.dataset.id; });
        if (post) { post.liked = !post.liked; post.likes = (post.likes || 0) + (post.liked ? 1 : -1); saveDB(); renderApp(); }
        break;
      case 'comment-post': openComments(el.dataset.id); break;
      case 'close-comments': closeOverlay(); state.commentPostId = null; break;
      case 'open-chat': openChat(el.dataset.id); break;
      case 'new-post': openPostEditor(); break;
      case 'submit-post':
        const text = $('#post-text').value.trim();
        if (!text) { toast('请输入分享内容', 'warn'); return; }
        publishPost(text, $('#post-photo').value);
        break;
      case 'take-photo': nativeCamera(el.dataset.target); break;
      case 'native-camera': nativeCamera(el.dataset.target); break;
      case 'camera-ai': nativeCamera(el.dataset.target, true); break;
      case 'pick-photo': pickPhoto(el.dataset.target); break;
      case 'close-camera': closeOverlay(); renderPhotoDraft(); break;
      case 'capture-photo': capturePhoto(el.dataset.target); break;
      case 'photo-use':
        if (state.photoPending) {
          const pu = state.photoPending;
          setPhoto(pu.target, pu.data);
          closeOverlay();
          state.photoPending = null;
        }
        break;
      case 'photo-crop': openPhotoCrop(); break;
      case 'crop-apply': applyPhotoCrop(); break;
      case 'crop-reset': resetCropBox(); break;
      case 'crop-rotate-left': rotateCrop(-90); break;
      case 'crop-rotate-right': rotateCrop(90); break;
      case 'photo-retake':
        const prTarget = state.photoPending ? state.photoPending.target : 'item';
        const prAi = state.photoPending ? state.photoPending.aiMode : false;
        state.photoPending = null; nativeCamera(prTarget, prAi); break;
      case 'photo-cancel':
        state.photoPending = null; closeOverlay(); renderPhotoDraft(); toast('已退出拍照'); break;
      case 'remove-draft':
        const dc = el.dataset.cat, di = parseInt(el.dataset.index, 10);
        if (state.photoDraft[dc] && di >= 0) state.photoDraft[dc].splice(di, 1);
        renderPhotoDraft();
        break;
      case 'clear-photo':
        const hp = $('#item-photo'), pp = $('#item-photo-preview');
        if (hp) hp.value = '';
        if (pp) pp.innerHTML = ICON.camera;
        break;
      case 'find-device': openFind(el.dataset.id); break;
      case 'detect-space':
        const detectBtn = $('#space-detect-btn');
        if (detectBtn) detectBtn.textContent = '检索中…';
        vibrate(15);
        autoDetectSpace();
        break;
      case 'open-space-picker':
        const cur = getUserSpace();
        function opts(list, selected) {
          return list.map(function (o) {
            return '<option value="' + escapeHTML(o) + '" ' + (o === selected ? 'selected' : '') + '>' + escapeHTML(o) + '</option>';
          }).join('');
        }
        const roomList = roomsForFloor(cur.building, cur.floor);
        const curRoom = roomList.indexOf(cur.room) !== -1 ? cur.room : roomList[0];
        $('#sheet-root').innerHTML =
          '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
            '<div class="sheet-handle"></div>' +
            '<div class="sheet-head"><h2>手动选择空间</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
            '<p class="sheet-tip">宿舍楼共 6 层：1 层为教室与宿管；2 层是学生宿舍第 1 层（房间 101–124），3 层为 201–224，依次类推。</p>' +
            '<div class="field"><label>楼栋</label><select id="sp-building">' + opts(buildingOptions(), cur.building) + '</select></div>' +
            '<div class="field"><label>楼层</label><select id="sp-floor">' + opts(FLOOR_OPTIONS, cur.floor) + '</select></div>' +
            '<div class="field"><label>房间 / 区域</label><select id="sp-room">' + opts(roomList, curRoom) + '</select></div>' +
            '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
              '<button class="btn primary" data-action="save-space">保存</button></div>' +
          '</div></div>';
        break;
      case 'save-space':
        const su = currentUser();
        if (su) {
          const school = getUserSchool();
          const pickedName = $('#sp-building').value;
          const picked = school.buildings.find(function (b) { return b.name === pickedName; }) || school.buildings[5];
          su.currentSpace = {
            building: picked.name, floor: $('#sp-floor').value,
            room: $('#sp-room').value, beacon: 'HIFA-' + picked.name.replace(/[^0-9A-Za-z]/g, ''),
            lat: picked.lat, lng: picked.lng, approx: picked.approx, school: school.name
          };
          saveDB(); closeSheet(); toast('当前空间已更新'); renderApp(true);
        }
        break;
      case 'bind-school':
        const bound = getUserSchool();
        $('#sheet-root').innerHTML =
          '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
            '<div class="sheet-handle"></div>' +
            '<div class="sheet-head"><h2>绑定学校 / 校区</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
            '<p class="sheet-tip">绑定后，自动检索会优先判断你是否在该校区范围内，并列出校内楼栋。</p>' +
            '<div class="field"><label>学校 / 校区</label><select id="school-select">' +
              SCHOOLS.map(function (s) {
                return '<option value="' + escapeHTML(s.name) + '" ' + (bound && bound.name === s.name ? 'selected' : '') + '>' + escapeHTML(s.name) + '</option>';
              }).join('') +
            '</select></div>' +
            '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
              '<button class="btn primary" data-action="save-school">绑定</button></div>' +
          '</div></div>';
        break;
      case 'save-school':
        const schoolUser = currentUser();
        const schoolName = $('#school-select').value;
        const school = SCHOOLS.find(function (s) { return s.name === schoolName; });
        if (schoolUser && school) {
          const target = HIFA_BUILDINGS[5];
          schoolUser.school = school.name;
          schoolUser.currentSpace = {
            building: target.name, floor: '2层', room: '101',
            beacon: 'HIFA-6', lat: target.lat, lng: target.lng, school: school.name
          };
          saveDB(); closeSheet(); toast('已绑定 ' + school.name); renderApp(true);
        }
        break;
      case 'find-item': openItemFind(el.dataset.id); break;
      case 'clear-device-search':
        state.deviceSearch = '';
        const deviceInput = $('#device-item-search');
        if (deviceInput) { deviceInput.value = ''; deviceInput.focus(); }
        const deviceResults = $('#device-search-results');
        if (deviceResults) deviceResults.innerHTML = deviceSearchResultsHTML('');
        break;
      case 'show-map-plan': showMapPlanSheet(); break;
      case 'toggle-device-map': state.deviceMapOpen = !state.deviceMapOpen; renderApp(true); break;
      case 'location-help': showLocationHelp(); break;
      case 'map-zoom-in':
        state.mapZoom = Math.min(2.4, Math.round((state.mapZoom + 0.2) * 100) / 100); applyMapTransform(); break;
      case 'map-zoom-out':
        state.mapZoom = Math.max(0.6, Math.round((state.mapZoom - 0.2) * 100) / 100); applyMapTransform(); break;
      case 'map-zoom-reset':
        state.mapZoom = 1; state.mapPanX = 0; state.mapPanY = 0; applyMapTransform(); break;
      case 'open-amap-current':
        (function () {
          const sp = getUserSpace();
          openInAmap(spaceLabel(sp), sp.lat, sp.lng);
        })();
        break;
      case 'open-map-config':
        $('#sheet-root').innerHTML =
          '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
            '<div class="sheet-handle"></div>' +
            '<div class="sheet-head"><h2>高德地图配置</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
            mapConfigFormHTML() +
          '</div></div>';
        break;
      case 'save-map-config':
        const key = $('#amap-key').value.trim();
        const securityCode = $('#amap-code').value.trim();
        if (!key) { toast('请填写高德 Key', 'warn'); break; }
        db.mapConfig = { key: key, securityCode: securityCode };
        saveDB(); amapPromise = null; closeSheet();
        toast('高德地图配置已保存'); renderApp(true);
        break;
      case 'find-tag':
        const tagItem = getUserItems().find(function (i) { return i.id === el.dataset.id; });
        if (tagItem) {
          $$('.animal-tag').forEach(function (t) { t.classList.remove('selected'); });
          el.classList.add('selected');
          const nameEl = $('#find-name'), subEl = $('#find-sub');
          if (nameEl) nameEl.textContent = tagItem.name;
          if (subEl) subEl.textContent = (tagItem.location || '未填写') + ' · 已选中标签';
          vibrate(10);
        }
        break;
      case 'bind-device': openBind(el.dataset.id); break;
      case 'save-bind':
        const dev = db.devices.find(function (d) { return d.id === el.dataset.id; });
        if (dev) {
          dev.itemId = $('#bind-item').value;
          dev.zone = $('#bind-zone').value.trim() || dev.zone;
          saveDB(); closeSheet(); toast('绑定已保存'); renderApp(true);
        }
        break;
      case 'toggle-away':
        const dv = db.devices.find(function (d) { return d.id === el.dataset.id; });
        if (dv) { dv.awayAlert = !dv.awayAlert; saveDB(); renderApp(); toast(dv.awayAlert ? '离位提醒已开启' : '离位提醒已关闭'); }
        break;

      case 'tutorial-next':
        state.guideStep++;
        if (state.guideStep >= 7) finishTutorial();
        else renderTutorial();
        break;
      case 'tutorial-prev':
        state.guideStep = Math.max(0, state.guideStep - 1); renderTutorial(); break;
      case 'tutorial-skip': finishTutorial(); break;
      case 'close-update': closeUpdatePopup(); break;

      case 'show-all-items':
        state.itemsOpen = true; state.view = 'home'; state.search = ''; state.filter = 'all';
        state.sortBy = 'expiry'; state.letter = '';
        renderApp(true);
        setTimeout(function () {
          const sec = $('#items-section');
          if (sec && sec.scrollIntoView) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
        break;
      case 'show-alerts': state.view = 'alerts'; state.backTo = 'home'; renderApp(true); break;
      case 'show-categories': openCategorySheet(); break;
      case 'cat-filter':
        state.view = 'home'; state.filter = 'all'; state.itemsOpen = true;
        state.search = catOf(el.dataset.key).label;
        state.letter = ''; state.sortBy = 'expiry';
        closeSheet(); renderApp(true); toast(translateText('已筛选') + '：' + translateText(catOf(el.dataset.key).label));
        setTimeout(function () {
          const sec = $('#items-section');
          if (sec && sec.scrollIntoView) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
        break;

      case 'set-sort':
        state.sortBy = el.dataset.value; state.letter = ''; renderApp(); break;
      case 'set-letter':
        state.letter = state.letter === el.dataset.value ? '' : el.dataset.value;
        const listArea = $('#list-area'); if (listArea) listArea.innerHTML = listHTML();
        $$('.alpha-bar button').forEach(function (b) { b.classList.toggle('on', b.dataset.value === state.letter); });
        break;
      case 'toggle-map': state.mapExpanded = !state.mapExpanded; renderApp(); break;

      case 'use-history':
        state.search = el.dataset.value || '';
        renderApp();
        setTimeout(function () {
          const area = $('#list-area'); if (area && area.scrollIntoView) area.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
        break;
      case 'clear-history':
        const u = currentUser(); if (u) { u.searchHistory = []; saveDB(); }
        state.searchExpanded = false; renderApp(); toast('搜索历史已清空'); break;
      case 'toggle-history': state.searchExpanded = !state.searchExpanded; renderApp(); break;
      case 'cancel-search':
        state.search = ''; const searchIn = $('#search-input'); if (searchIn) searchIn.value = '';
        renderApp(); break;

      case 'pick-location':
        const locVal = el.dataset.value || '';
        const locInput = $('#f-location');
        if (locInput) { locInput.value = locVal; }
        $$('#loc-chips .loc-chip').forEach(function (c) { c.classList.toggle('on', c.dataset.value === locVal); });
        break;
      case 'ai-recognize': runAI(); break;
      case 'use-ai-detection':
        const det = state.aiDetections[0];
        if (!det) break;
        if ($('#f-name')) $('#f-name').value = det.name;
        if ($('#f-category')) $('#f-category').value = det.category;
        if ($('#f-location') && det.location) $('#f-location').value = det.location;
        if ($('#item-photo-name')) $('#item-photo-name').value = det.name;
        toast('已采用识别结果，可继续修改'); break;
      case 'apply-ai':
        const aiName = $('#ai-name'), aiCat = $('#ai-category'), aiLoc = $('#ai-location');
        if (aiName && $('#f-name')) $('#f-name').value = aiName.value;
        if (aiCat && $('#f-category')) $('#f-category').value = aiCat.value;
        if (aiLoc && $('#f-location')) {
          $('#f-location').value = aiLoc.value;
          $$('#loc-chips .loc-chip').forEach(function (c) { c.classList.toggle('on', c.dataset.value === aiLoc.value); });
        }
        toast('已采用 AI 识别结果'); break;

      case 'toggle-bluetooth':
        db.bluetoothOn = !db.bluetoothOn; saveDB();
        toast(db.bluetoothOn ? '蓝牙已开启' : '蓝牙已关闭'); renderApp(true); break;
      case 'scan-devices': scanDevices(); break;
      case 'connect-device': connectDevice(el.dataset.name, parseInt(el.dataset.signal, 10) || 3); break;
      case 'toggle-devices': state.devicesOpen = !state.devicesOpen; renderApp(); break;

      case 'change-avatar':
        const ai = document.createElement('input'); ai.type = 'file'; ai.accept = 'image/*';
        ai.onchange = function (ev) {
          const file = ev.target.files && ev.target.files[0]; if (!file) return;
          const reader = new FileReader();
          reader.onload = function (e2) { compressImage(e2.target.result, function (d) { setPhoto('avatar', d); }); };
          reader.readAsDataURL(file);
        };
        ai.click(); break;
      case 'edit-field': openEditField(el.dataset.field); break;
      case 'save-field':
        const field = el.dataset.field;
        const valueEl = $('#edit-field-value');
        const cu = currentUser();
        if (cu && valueEl) {
          cu.profile = cu.profile || {};
          cu.profile[field] = valueEl.value.trim() || (field === 'name' ? cu.username : '');
          saveDB(); closeSheet(); toast('已保存'); renderApp(true);
        }
        break;
      case 'toggle-group':
        const groupKey = el.dataset.key;
        state.collapsedGroups[groupKey] = !state.collapsedGroups[groupKey];
        renderApp();
        break;
      case 'settings-font': settingsSheet('font'); break;
      case 'settings-weight': settingsSheet('weight'); break;
      case 'settings-theme': settingsSheet('theme'); break;
      case 'settings-notify-time': settingsSheet('notifyTime'); break;
      case 'settings-language': settingsSheet('language'); break;
      case 'set-language':
        db.settings.language = el.dataset.value; saveDB(); applySettings();
        settingsSheet('language'); renderApp(); toast('语言已切换'); break;
      case 'set-notify-time':
        db.settings.notifyTime = el.dataset.value; saveDB(); settingsSheet('notifyTime'); toast('提醒时间已设置'); break;
      case 'save-notify-time':
        const timeInput = $('#notify-time-custom');
        if (timeInput && timeInput.value) {
          db.settings.notifyTime = timeInput.value; saveDB(); settingsSheet('notifyTime'); toast('提醒时间已保存');
        }
        break;
      case 'set-font': db.settings.fontScale = parseFloat(el.dataset.value); saveDB(); settingsSheet('font'); renderApp(); break;
      case 'set-weight': db.settings.fontWeight = parseInt(el.dataset.value, 10); saveDB(); settingsSheet('weight'); renderApp(); break;
      case 'set-theme': db.settings.theme = el.dataset.value; saveDB(); settingsSheet('theme'); applySettings(); toast('主题已切换'); break;
      case 'toggle-setting':
        const setKey = el.dataset.key;
        db.settings[setKey] = !db.settings[setKey]; saveDB(); renderApp(); toast('设置已更新'); break;
      case 'change-password':
        $('#sheet-root').innerHTML =
          '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
            '<div class="sheet-handle"></div>' +
            '<div class="sheet-head"><h2>修改密码</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
            '<div class="field"><label>原密码</label><input id="old-pwd" type="password"></div>' +
            '<div class="field"><label>新密码</label><input id="new-pwd" type="password"></div>' +
            '<div class="form-error" id="pwd-error"></div>' +
            '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
              '<button class="btn primary" data-action="save-password">保存</button></div>' +
          '</div></div>';
        break;
      case 'save-password':
        const pu = currentUser();
        const oldPwd = $('#old-pwd').value, newPwd = $('#new-pwd').value.trim();
        if (!pu || oldPwd !== pu.password) { $('#pwd-error').textContent = '原密码不正确'; break; }
        if (!newPwd) { $('#pwd-error').textContent = '请输入新密码'; break; }
        pu.password = newPwd; saveDB(); closeSheet(); toast('密码已修改'); break;
      case 'show-changelog': showChangelog(); break;
      case 'show-achievements': showAchievements(); break;
      case 'open-friends': openFriendsSheet(); break;
      case 'chat-friend-menu': openChatFriendMenu(el.dataset.id); break;
      case 'remove-friend-from-chat':
        removeFriend(el.dataset.id);
        closeOverlay();
        state.view = 'chat'; renderApp(true);
        break;
      case 'friend-profile': showFriendProfile(el.dataset.id); break;
      case 'add-friend-by-id': addFriendById(el.dataset.id, $('#friend-error')); break;
      case 'remove-friend': removeFriend(el.dataset.id); break;
      case 'add-friend': addFriend(); break;
      case 'toggle-friend-sort':
        state.friendSort = state.friendSort === 'az' ? 'default' : 'az';
        if (state.view === 'chat') renderApp(); else openFriendsSheet();
        break;
      case 'cycle-friend-group':
        (function () {
          const opts = ['全部', '未分组', '同学', '邻居', '家人', '同事'];
          const cur = state.friendGroup || '全部';
          state.friendGroup = opts[(opts.indexOf(cur) + 1) % opts.length];
        })();
        if (state.view === 'chat') renderApp(); else openFriendsSheet();
        break;
      case 'rename-friend-open':
        if (el.dataset.id) openRenameFriendSheet(el.dataset.id);
        else toast('请点击好友右侧的「备注」按钮', 'warn');
        break;
      case 'save-friend-remark':
        (function () {
          const u = currentUser();
          const friend = u && (u.friends || []).find(function (f) { return f.userId === el.dataset.id; });
          const nameInput = $('#friend-remark-input');
          const groupSel = $('#friend-group-select');
          if (!friend) { toast('好友不存在', 'warn'); return; }
          if (nameInput && nameInput.value.trim()) friend.remark = nameInput.value.trim();
          if (groupSel) friend.group = groupSel.value;
          saveDB();
          openFriendsSheet();
          toast('备注已保存');
        })();
        break;
      case 'join-group-by-id': joinGroupById(); break;
      case 'group-manage': openGroupManageSheet(el.dataset.id); break;
      case 'save-group-rename': saveGroupRename(el.dataset.id); break;
      case 'invite-friends-open': openInviteFriendsSheet(el.dataset.id); break;
      case 'toggle-group-invite':
        (function () {
          const uid2 = el.dataset.id;
          if (!Array.isArray(state.groupInvites)) state.groupInvites = [];
          const idx = state.groupInvites.indexOf(uid2);
          if (idx === -1) state.groupInvites.push(uid2);
          else state.groupInvites.splice(idx, 1);
          el.classList.toggle('on', state.groupInvites.indexOf(uid2) !== -1);
          const chk = $('.invite-check', el);
          if (chk) chk.textContent = state.groupInvites.indexOf(uid2) !== -1 ? '✓' : '';
        })();
        break;
      case 'confirm-group-invite': confirmGroupInvite(el.dataset.id); break;
      case 'remove-group-member':
        (function () {
          const g = findGroup(el.dataset.gid);
          if (!g) return;
          g.members = (g.members || []).filter(function (m) { return m.userId !== el.dataset.id; });
          saveDB();
          openGroupManageSheet(el.dataset.gid);
          toast('已移出群聊');
        })();
        break;
      case 'create-group': openCreateGroupSheet(); break;
      case 'pick-group-type':
        state.groupTypeIndex = parseInt(el.dataset.index, 10) || 0;
        $$('.group-type-row .chip').forEach(function (c) { c.classList.toggle('active', c === el); });
        break;
      case 'save-group': createGroup(); break;
      case 'open-device': state.view = 'device'; closeSheet(); renderApp(true); break;
      case 'add-bound-device': openAddBoundDeviceSheet(); break;
      case 'pick-device-icon':
        state.newDeviceIcon = el.dataset.icon;
        $$('.dev-icon-opt').forEach(function (b) { b.classList.toggle('on', b === el); });
        break;
      case 'save-bound-device': saveBoundDevice(); break;
      case 'open-guide': state.view = 'guide'; state.backTo = 'profile'; closeSheet(); renderApp(true); break;

      case 'chat-bg': openChatBgSheet(); break;
      case 'emoji-panel':
        state.stickerPanel = state.stickerPanel === 'emoji' ? '' : 'emoji';
        const ep = $('#emoji-panel');
        if (ep) { if (!state.stickerPanel) ep.classList.remove('show'); else renderEmojiPanel(); }
        break;
      case 'sticker-panel':
        state.stickerPanel = state.stickerPanel === 'sticker' ? '' : 'sticker';
        const sp = $('#emoji-panel');
        if (sp) { if (!state.stickerPanel) sp.classList.remove('show'); else renderStickerPanel(); }
        break;
      case 'insert-emoji':
        const et = $('#chat-text');
        if (et) { et.value += el.dataset.value; et.focus(); }
        break;
      case 'send-sticker': sendSticker(parseInt(el.dataset.index, 10)); break;
      case 'set-chat-bg':
        const bgv = el.dataset.value;
        if (bgv) db.chatBgs[state.chatId] = { type: 'color', value: bgv };
        else delete db.chatBgs[state.chatId];
        saveDB(); closeSheet();
        const cb = $('#chat-body'); if (cb) cb.setAttribute('style', chatBgStyle());
        toast('聊天背景已更换'); break;
      case 'import-chat-bg':
        const bi = document.createElement('input'); bi.type = 'file'; bi.accept = 'image/*';
        bi.onchange = function (ev) {
          const file = ev.target.files && ev.target.files[0]; if (!file) return;
          const reader = new FileReader();
          reader.onload = function (e2) {
            compressImage(e2.target.result, function (d) {
              db.chatBgs[state.chatId] = { type: 'image', value: d };
              saveDB(); closeSheet();
              const b = $('#chat-body'); if (b) b.setAttribute('style', chatBgStyle());
              toast('聊天背景已更换');
            });
          };
          reader.readAsDataURL(file);
        };
        bi.click(); break;
      case 'import-sticker':
        const si2 = document.createElement('input'); si2.type = 'file'; si2.accept = 'image/*'; si2.multiple = true;
        si2.onchange = function (ev) {
          const files = Array.prototype.slice.call(ev.target.files || []);
          if (!files.length) return;
          let left = files.length;
          files.forEach(function (f) {
            const reader = new FileReader();
            reader.onload = function (e2) {
              compressImage(e2.target.result, function (d) {
                if (!db.stickers) db.stickers = [];
                db.stickers.push(d); left--;
                if (left === 0) { saveDB(); renderStickerPanel(); toast('已导入 ' + files.length + ' 个表情包'); }
              });
            };
            reader.readAsDataURL(f);
          });
        };
        si2.click(); break;

      case 'sample': loadSampleData(); break;
      case 'logout':
        $('#sheet-root').innerHTML =
          '<div class="sheet-mask" data-mask="1"><div class="sheet" style="max-height:52%">' +
            '<div class="sheet-handle"></div><div class="sheet-head"><h2>确认退出登录</h2></div>' +
            '<p class="confirm-text">退出后需要重新输入账号和密码才能进入，确定要退出吗？</p>' +
            '<div class="sheet-actions">' +
              '<button class="btn ghost" data-action="close-sheet">取消</button>' +
              '<button class="btn danger" data-action="confirm-logout">确认退出</button>' +
            '</div>' +
          '</div></div>';
        break;
      case 'confirm-logout':
        closeOverlay(); closeSheet();
        db.session = null; saveDB();
        state.view = 'home'; state.search = ''; state.filter = 'all';
        state.authTab = 'login'; lastView = null;
        render(); toast('已退出登录'); break;
      default: break;
    }
  }

  /* ---------------- Events ---------------- */

  document.addEventListener('click', function (e) {
    const nav = e.target.closest('[data-nav]');
    if (nav) {
      const key = nav.dataset.nav;
      if (key === 'alerts') state.backTo = 'home';
      if (key === 'guide') state.backTo = 'profile';
      state.view = key;
      state.search = '';
      state.filter = 'all';
      vibrate(10);
      closeOverlay(); closeSheet();
      renderApp(true);
      return;
    }
    const act = e.target.closest('[data-action]');
    if (act) { e.preventDefault(); handleAction(act.dataset.action, act); return; }
    const card = e.target.closest('[data-card]');
    if (card) {
      vibrate(8);
      card.classList.toggle('expanded');
      card.classList.remove('tapped');
      void card.offsetWidth;
      card.classList.add('tapped');
      return;
    }
    if (e.target.dataset && e.target.dataset.mask) { closeSheet(); closeOverlay(); }
  });

  document.addEventListener('change', function (e) {
    if (e.target.id === 'f-category') {
      const wrap = $('#custom-cat-wrap');
      if (wrap) wrap.style.display = (e.target.value === 'other' || e.target.value === 'custom_new' || isCustomCategory(e.target.value)) ? 'block' : 'none';
    }
    if (e.target.id === 'f-unit') {
      const wrap = $('#f-unit-custom');
      if (wrap) wrap.style.display = e.target.value === '自定义' ? 'block' : 'none';
    }
    if (e.target.id === 'sp-building' || e.target.id === 'sp-floor') {
      const building = $('#sp-building');
      const floor = $('#sp-floor');
      const room = $('#sp-room');
      if (building && floor && room) {
        const list = roomsForFloor(building.value, floor.value);
        room.innerHTML = list.map(function (r) {
          return '<option value="' + escapeHTML(r) + '">' + escapeHTML(r) + '</option>';
        }).join('');
      }
    }
  });

  document.addEventListener('input', function (e) {
    if (e.target.id === 'search-input') {
      state.search = e.target.value;
      const area = $('#list-area');
      if (area) area.innerHTML = listHTML();
      const notice = $('#search-result-notice');
      if (notice) notice.outerHTML = searchResultNoticeHTML();
    }
    if (e.target.id === 'hub-search-input') {
      state.hubSearch = e.target.value;
      const grid = $('.hub-grid');
      if (grid) {
        const q = state.hubSearch.trim().toLowerCase();
        const all = HUB_FEATURES();
        const list = q ? all.filter(function (f) {
          return (f.label + f.desc + f.key).toLowerCase().indexOf(q) !== -1;
        }) : all;
        grid.innerHTML = list.map(hubTileHTML).join('');
      }
    }
  });

  document.addEventListener('submit', function (e) {
    const form = e.target;

    if (form.id === 'auth-form') {
      e.preventDefault();
      const username = $('#auth-username').value.trim();
      const password = $('#auth-password').value;
      const errorEl = $('#auth-error');
      errorEl.textContent = '';
      if (!username || !password) { errorEl.textContent = '请填写用户名和密码'; return; }
      if (state.authTab === 'register') {
        const password2 = $('#auth-password2') ? $('#auth-password2').value : '';
        if (password !== password2) { errorEl.textContent = '两次输入的密码不一致'; return; }
        if (db.users.some(function (u) { return u.username === username; })) { errorEl.textContent = '该用户名已被注册'; return; }
        const nickname = $('#auth-nickname').value.trim() || username;
        const user = { id: uid(), username: username, password: password,
          friendId: makeFriendId(),
          profile: { name: nickname, contact: '', bio: '', avatar: '' },
          friends: [], groups: PRESET_GROUPS.map(function (g) { return Object.assign({}, g); }),
          searchHistory: [], guideSeen: false,
          createdAt: new Date().toISOString() };
        db.users.push(user); db.session = user.id;
        starterItems(user.id).forEach(function (item) { db.items.push(item); });
        if (db.spaceKeys.indexOf('柜子') === -1) db.spaceKeys.push('柜子');
        saveDB();
        state.view = 'home'; state.itemsOpen = true; toast('注册成功'); render();
      } else {
        const user = db.users.find(function (u) { return u.username === username && u.password === password; });
        if (!user) { errorEl.textContent = '用户名或密码错误'; return; }
        db.session = user.id; saveDB();
        if (!user.friendId) { user.friendId = makeFriendId(); saveDB(); }
        state.view = 'home'; state.itemsOpen = true; toast('登录成功'); render();
      }
      showTutorial();
      return;
    }

    if (form.id === 'item-form') {
      e.preventDefault();
      const itemId = $('#f-name').dataset.itemId || null;
      const item = itemId ? getUserItems().find(function (i) { return i.id === itemId; }) : null;
      const name = $('#f-name').value.trim();
      const storedAt = $('#f-stored').value;
      const expiryDate = $('#f-expiry').value;
      const errorEl = $('#item-error');
      errorEl.textContent = '';
      if (!name) { errorEl.textContent = '请填写物品名称'; return; }
      if (!storedAt) { errorEl.textContent = '请选择收纳日期'; return; }
      if (expiryDate && expiryDate < storedAt) { errorEl.textContent = '保质期不能早于收纳日期'; return; }
      const location = $('#f-location').value.trim();
      let categoryKey = $('#f-category').value;
      const customCatInput = $('#f-category-custom');
      if (categoryKey === 'custom_new' && (!customCatInput || !customCatInput.value.trim())) {
        errorEl.textContent = '请输入自定义分类名称'; return;
      }
      if ((categoryKey === 'custom_new' || categoryKey === 'other' || isCustomCategory(categoryKey)) && customCatInput && customCatInput.value.trim()) {
        categoryKey = ensureCustomCategory(customCatInput.value.trim());
      }
      let unit = $('#f-unit') ? $('#f-unit').value : '件';
      if (unit === '自定义') {
        const customUnit = $('#f-unit-custom') && $('#f-unit-custom').value.trim();
        if (!customUnit) { errorEl.textContent = '请填写自定义单位'; return; }
        unit = customUnit;
        if (db.customUnits.indexOf(unit) === -1) db.customUnits.push(unit);
      }
      const payload = {
        name: name, category: categoryKey,
        quantity: Math.max(1, parseInt($('#f-quantity').value, 10) || 1),
        unit: unit,
        location: location, storedAt: storedAt,
        expiryDate: expiryDate, notes: $('#f-notes').value.trim(),
        photos: {
          item: (state.photoDraft.item || []).slice(),
          location: (state.photoDraft.location || []).slice(),
          expiry: (state.photoDraft.expiry || []).slice()
        },
        photo: (state.photoDraft.item && state.photoDraft.item[0]) ||
               (state.photoDraft.location && state.photoDraft.location[0]) || ''
      };
      if (location && !db.spaceKeys.some(function (k) { return k === location; })) {
        db.spaceKeys.push(location);
        toast('已同步「' + location + '」到收纳地图');
      }
      if (item) { Object.assign(item, payload); vibrate(15); toast('已保存修改'); }
      else {
        db.items.push(Object.assign({ id: uid(), userId: currentUser().id, createdAt: new Date().toISOString() }, payload));
      }
      saveDB(); closeSheet();
      state.view = 'home'; state.search = ''; state.filter = 'all'; state.itemsOpen = true;
      renderApp(true);
      if (!item) celebrate('已收纳「' + name + '」');
      return;
    }

    if (form.id === 'profile-form') {
      e.preventDefault();
      const user = currentUser();
      user.profile = {
        name: $('#pf-name').value.trim() || user.username,
        contact: $('#pf-contact').value.trim(), bio: $('#pf-bio').value.trim()
      };
      saveDB(); toast('资料已保存'); renderApp(true); return;
    }

    if (form.id === 'chat-form') {
      e.preventDefault();
      const input = $('#chat-text');
      const text = input.value.trim();
      if (!text) return;
      if (!db.messages[state.chatId]) db.messages[state.chatId] = [];
      db.messages[state.chatId].push({ from: 'mine', text: text, time: nowTime() });
      input.value = '';
      saveDB(); renderChatBody(); renderApp(); autoReply(state.chatId);
    }

    if (form.id === 'comment-form') {
      e.preventDefault();
      const input = $('#comment-text');
      const text = input.value.trim();
      if (!text) return;
      const post = db.posts.find(function (p) { return p.id === state.commentPostId; });
      if (!post) return;
      if (!Array.isArray(post.comments)) post.comments = [];
      const user = currentUser();
      const name = (user.profile && user.profile.name) || user.username;
      post.comments.push({
        name: name, avatar: (name.charAt(0) || '我').toUpperCase(),
        text: text, time: nowTime()
      });
      input.value = '';
      saveDB(); renderComments(); renderApp(); toast('评论已发布');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeOverlay(); closeSheet(); }
    if (e.key === 'Enter' && e.target && e.target.id === 'search-input') {
      const val = e.target.value.trim();
      if (val) {
        pushSearchHistory(val);
        state.search = val;
        state.itemsOpen = true;
        renderApp();
        const n = visibleItems().length;
        toast(n ? ('找到 ' + n + ' 件相关物品') : '没有找到相关物品', n ? '' : 'warn');
        setTimeout(function () {
          const sec = $('#items-section');
          if (sec && sec.scrollIntoView) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    }
  });

  function updateClock() {
    const now = new Date();
    const el = $('#sb-time');
    if (el) el.textContent = now.getHours() + ':' + pad(now.getMinutes());
  }

  function initPullRefresh() {
    const scroller = $('#app-view');
    const screen = $('.device-screen');
    if (!scroller || !screen || !('ontouchstart' in window)) return;
    const ua = (navigator.userAgent || '').toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) return;
    scroller.style.overscrollBehaviorY = 'contain';

    const indicator = document.createElement('div');
    indicator.className = 'pull-indicator';
    indicator.innerHTML = ICON.refresh + '<span>下拉刷新</span>';
    screen.appendChild(indicator);

    let startY = 0, pulling = false, distance = 0;
    const label = function () { return indicator.querySelector('span'); };

    scroller.addEventListener('touchstart', function (e) {
      if (scroller.scrollTop <= 0 && e.touches.length === 1) {
        startY = e.touches[0].clientY;
        pulling = true;
        distance = 0;
      }
    }, { passive: true });

    scroller.addEventListener('touchmove', function (e) {
      if (!pulling) return;
      distance = e.touches[0].clientY - startY;
      if (distance > 0) {
        indicator.classList.add('show');
        indicator.classList.toggle('ready', distance > 60);
        label().textContent = distance > 60 ? '松开刷新' : '下拉刷新';
      }
    }, { passive: true });

    scroller.addEventListener('touchend', function () {
      if (!pulling) return;
      pulling = false;
      if (distance > 60) {
        vibrate(10);
        label().textContent = '刷新中…';
        setTimeout(function () {
          renderApp(true);
          toast('已刷新，一切都井井有条');
          indicator.classList.remove('show', 'ready');
        }, 420);
      } else {
        indicator.classList.remove('show', 'ready');
      }
      distance = 0;
    }, { passive: true });
  }

  function render() {
    ensureLocalSession();
    if (currentUser()) {
      renderApp(true);
      const u = currentUser();
      if (u && !u.guideSeen) showTutorial();
      else showUpdatePopup();
    } else renderAuth();
  }

  updateClock();
  setInterval(updateClock, 30000);
  initPullRefresh();
  applySettings();
  render();
})();
