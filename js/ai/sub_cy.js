// Tabs Component (공통)
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.tabs').forEach(function (tabs) {
      // tabs를 감싸는 가장 가까운 .tabs-component를 컨테이너로 사용
      const container = tabs.closest('.tabs-component') || tabs.parentNode;
      const tabButtons = tabs.querySelectorAll('.tabs__tab');
      const tabPanels = Array.from(container.querySelectorAll('.tabs__panel'));
      tabs.addEventListener('click', function (e) {
        if (e.target.classList.contains('tabs__tab')) {
          const selectedId = e.target.id;
          tabButtons.forEach(btn => {
            const isActive = btn.id === selectedId;
            btn.classList.toggle('tabs__tab--active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
          });
          tabPanels.forEach(panel => {
            const isActive = panel.getAttribute('aria-labelledby') === selectedId;
            panel.classList.toggle('tabs__panel--active', isActive);
            panel.hidden = !isActive;
          });
        }
      });
    });
  });


  // 필터 드롭다운 기능
(function() {
  var dropdowns = document.querySelectorAll('.filter-dropdown');
  dropdowns.forEach(function(dropdown) {
    var toggleBtn = dropdown.querySelector('.filter-dropdown__toggle');
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var expanded = dropdown.getAttribute('aria-expanded') === 'true';
      dropdown.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
    // 바깥 클릭 시 닫힘
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();