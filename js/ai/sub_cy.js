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

        // 모바일에서 탭 클릭 시 해당 탭을 왼쪽으로 스크롤 (1.25rem 여백)
        if (window.innerWidth <= 767) {
          const tabsContainer = tabs;
          const tabElement = e.target;
          const containerRect = tabsContainer.getBoundingClientRect();
          const tabRect = tabElement.getBoundingClientRect();
          const scrollLeft = tabRect.left - containerRect.left - 20; // 1.25rem = 20px

          tabsContainer.scrollTo({
            left: tabsContainer.scrollLeft + scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});


//arcodian
(function () {
  function closeAllAccordionItems(container, exceptItem) {
    container.querySelectorAll('.kt-accordion__item').forEach(function (item) {
      if (item !== exceptItem) {
        item.classList.remove('active');
        const panel = item.querySelector('.kt-accordion__panel');
        panel.style.maxHeight = null;
      }
    });
  }

  document.querySelectorAll('.kt-accordion').forEach(function (accordion) {
    accordion.querySelectorAll('.kt-accordion__header').forEach(function (header) {
      header.addEventListener('click', function () {
        const item = header.closest('.kt-accordion__item');
        const panel = item.querySelector('.kt-accordion__panel');
        const isActive = item.classList.contains('active');

        if (!isActive) {
          closeAllAccordionItems(accordion, item);
          item.classList.add('active');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          panel.style.maxHeight = null;
        }
      });
    });

    // 페이지 로드시 열려있는 아코디언이 있으면 높이 세팅
    accordion.querySelectorAll('.kt-accordion__item.active .kt-accordion__panel').forEach(function (panel) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });
})();