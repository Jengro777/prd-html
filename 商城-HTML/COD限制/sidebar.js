function renderSidebar(activeId) {
  var container = document.getElementById('sidebar-container');
  if (!container) return;
  var items = [
    { id: 'fee', href: 'COD手续费.html', icon: 'fa-percent', label: 'COD手续费' },
    { id: 'rejection', href: '拒签报表.html', icon: 'fa-undo-alt', label: '拒签报表' },
    { id: 'rules', href: 'COD限制规则.html', icon: 'fa-cogs', label: 'COD限制规则' },
    { id: 'members', href: '会员管理.html', icon: 'fa-users', label: '会员列表' },
  ];
  var html = '<aside class="sidebar"><div class="sidebar-section"><div class="sidebar-label">COD \u9650\u5236</div>';
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var cls = item.id === activeId ? 'sidebar-item active' : 'sidebar-item';
    html += '<a class="' + cls + '" href="' + item.href + '"><i class="fas ' + item.icon + '"></i> ' + item.label + '</a>\n        ';
  }
  html += '</div></aside>';
  container.innerHTML = html;
}
