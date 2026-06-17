/**
 * TOS 共享侧边栏
 * 使用纯 HTML 渲染，不依赖 Ant Design Vue 菜单组件
 */
window.renderSidebar = function(active) {
  var items = ['首页', '任务账号', '任务配置', '任务执行'];
  var parentActive = items.indexOf(active) >= 1; // 首页之外的都属于 API任务
  var html = '';

  // 首页
  html += '<a class="tos-menu-item' + (active === '首页' ? ' active' : '') + '" href="#">';
  html += '<i class="fas fa-home" style="width:18px;"></i><span>首页</span></a>';

  // API任务 分组标题
  html += '<div class="tos-menu-group' + (parentActive ? ' active' : '') + '">';
  html += '<div class="tos-menu-group__title"><i class="fas fa-cogs" style="width:18px;"></i><span>API任务</span></div>';

  // 子菜单
  var subs = [
    { key: '任务账号', icon: 'fa-plug', href: '任务账号.html' },
    { key: '任务配置', icon: 'fa-tasks', href: '任务配置.html' },
    { key: '任务执行', icon: 'fa-history', href: '任务执行.html' },
  ];
  for (var i = 0; i < subs.length; i++) {
    var s = subs[i];
    html += '<a class="tos-menu-item tos-menu-item--sub' + (active === s.key ? ' active' : '') + '" href="' + s.href + '">';
    html += '<i class="fas ' + s.icon + '" style="width:18px;"></i><span>' + s.key + '</span></a>';
  }

  html += '</div>';
  document.querySelector('.tos-sidebar').innerHTML = html;
};
