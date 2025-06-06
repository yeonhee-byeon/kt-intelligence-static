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


  // 스티키 헤더 show 클래스 토글
  function toggleStickyHeader() {
    const stickyHeader = document.querySelector('.tab-sticky-header');
    const tabsComponent = document.querySelector('.tabs-component');

    if (!stickyHeader || !tabsComponent) return;

    // 플래그: 첫 번째 li 클릭 후 일정 시간 동안 show 유지
    let forceShowStickyHeader = false;

    function checkScroll() {
      const tabsRect = tabsComponent.getBoundingClientRect();
      const headerHeight = document.querySelector('#main-header').offsetHeight;
      const inRange = tabsRect.top <= headerHeight && tabsRect.bottom > headerHeight;

      // 배경색 영역 체크
      const blackStyleSection = document.querySelector('.bg-black-style');
      if (blackStyleSection) {
        const blackStyleRect = blackStyleSection.getBoundingClientRect();
        const isInBlackStyle = blackStyleRect.top <= headerHeight && blackStyleRect.bottom > headerHeight;
        stickyHeader.classList.toggle('black-style', isInBlackStyle);
      }

      const firstLi = stickyHeader.querySelector('.sticky-header-list li:first-child');
      if (firstLi && firstLi.classList.contains('active')) {
        // 첫 번째 li가 active이거나, forceShowStickyHeader가 true면 show 유지
        if (inRange || forceShowStickyHeader) {
          stickyHeader.classList.add('show');
        } else {
          stickyHeader.classList.remove('show');
        }
        return;
      }

      if (inRange) {
        stickyHeader.classList.add('show');
      } else {
        stickyHeader.classList.remove('show');
      }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    const stickyItems = stickyHeader.querySelectorAll('.tab-sticky-header .sticky-header-list li');
    let isScrolling = false;

    stickyItems.forEach((item, index) => {
      item.addEventListener('click', function () {
        const targetId = this.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          isScrolling = true;
          const headerHeight = document.querySelector('#main-header').offsetHeight;
          const targetRect = targetSection.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = scrollTop + targetRect.top - headerHeight;

          if (index === 0) {
            // 첫 번째 li 클릭 시 일정 시간 동안 show 유지
            forceShowStickyHeader = true;
            stickyHeader.classList.add('show');
            window.scrollTo({
              top: targetPosition + 2,
              behavior: 'smooth'
            });
            setTimeout(() => {
              forceShowStickyHeader = false;
              checkScroll(); // 플래그 해제 후 상태 재확인
            }, 800); // 스크롤 애니메이션 시간에 맞게 조정
          } else {
            window.scrollTo({
              top: targetPosition + 3,
              behavior: 'smooth'
            });
          }

          // 활성화된 탭 버튼 클릭
          const tabButton = document.querySelector(`[aria-labelledby="${targetId}"]`);
          if (tabButton) {
            tabButton.click();
          }

          stickyItems.forEach(li => li.classList.remove('active'));
          this.classList.add('active');

          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      });
    });

    // 스크롤 시 현재 보이는 섹션에 해당하는 li에 active 클래스 추가
    function updateActiveItem() {
      if (isScrolling) return; // 스크롤 중에는 업데이트하지 않음

      const sections = Array.from(document.querySelectorAll('.tabs__panel__anchor'));
      const headerHeight = document.querySelector('#main-header').offsetHeight;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // 섹션이 헤더 아래에 위치할 때 active
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          const sectionId = section.id;
          stickyItems.forEach(item => {
            if (item.getAttribute('data-section') === sectionId) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }

    // 스크롤 이벤트에 updateActiveItem 추가
    window.addEventListener('scroll', updateActiveItem);
  }

  // 초기 로드시 실행
  document.addEventListener('DOMContentLoaded', function () {
    toggleStickyHeader();
  });

})();