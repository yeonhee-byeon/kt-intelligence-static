// Tabs Component
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

// Solution Model Inner Tabs
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.inner-tabs-container').forEach(function (container) {
    const triggers = container.querySelectorAll('.inner-tab-trigger');
    const contents = container.querySelectorAll('.inner-tab-content');

    // Initial setup: hide all but active
    contents.forEach(function (content) {
      content.style.transition = 'opacity 0.4s ease-in-out';
      if (!content.classList.contains('active')) {
        content.style.opacity = '0';
        content.style.position = 'absolute';
        content.style.visibility = 'hidden';
        content.style.zIndex = '-1';
      } else {
        content.style.position = 'relative';
      }
    });

    function fadeOut(element, callback) {
      element.style.opacity = '0';
      setTimeout(function () {
        element.style.position = 'absolute';
        element.style.visibility = 'hidden';
        element.style.zIndex = '-1';
        if (callback) {
          callback();
        }
      }, 300); // transition duration
    }

    function fadeIn(element) {
      element.style.position = 'relative';
      element.style.visibility = 'visible';
      element.style.zIndex = '1';
      setTimeout(function () {
        element.style.opacity = '1';
      }, 20); // allow visibility to apply before starting transition
    }

    triggers.forEach(function (clickedTrigger, index) {
      clickedTrigger.addEventListener('click', function () {

        if (clickedTrigger.classList.contains('active')) return;

        let currentActiveTrigger = container.querySelector('.inner-tab-trigger.active');
        let currentActiveContent = container.querySelector('.inner-tab-content.active');

        if (currentActiveTrigger) {
          currentActiveTrigger.classList.remove('active');
        }
        clickedTrigger.classList.add('active');

        const newContent = contents[index];

        if (currentActiveContent && newContent) {
          fadeOut(currentActiveContent, function () {
            currentActiveContent.classList.remove('active');
            newContent.classList.add('active');
            fadeIn(newContent);
          });
        }
      });
    });
  });
});


// Solution Model Inner Tabs swiper
const modelTabs = document.querySelector('.mobile-model-tabs');
function initTabMobileSwiper() {
  if (window.innerWidth < 768) {
    if (!window.mobileTabSwiper) {
      window.mobileTabSwiper = new Swiper('.mobile-model-tabs', {
        spaceBetween: 12,
        slidesPerView: 'auto',
        centeredSlides: false,
        on: {
          slideChange: function () {
            syncMobileTabContent(this.activeIndex);
          },
          tap: function (swiper, e) {
            const clickedIdx = swiper.clickedIndex;
            if (typeof clickedIdx === 'number' && clickedIdx !== swiper.activeIndex) {
              swiper.slideTo(clickedIdx);
            }
            syncMobileTabContent(swiper.activeIndex);
          }
        }
      });
      // data-index 부여 (dl, div 모두)
      assignMobileTabIndexes();
      syncMobileTabContent(window.mobileTabSwiper.activeIndex || 0);
    }
    // 모바일에서는 .mobile-model-tabs .inner-tab-trigger에 직접 클릭 이벤트 제거
    const mobileTriggers = document.querySelectorAll('.mobile-model-tabs .inner-tab-trigger');
    mobileTriggers.forEach(trigger => {
      trigger.onclick = null;
    });
  } else {
    if (window.mobileTabSwiper) {
      window.mobileTabSwiper.destroy();
      window.mobileTabSwiper = null;
    }
  }
}

// 모바일 탭/컨텐츠에 data-index 부여
function assignMobileTabIndexes() {
  const triggers = document.querySelectorAll('.mobile-model-tabs .inner-tab-trigger');
  const contents = document.querySelectorAll('.example-side-item .inner-tab-content');
  triggers.forEach((el, idx) => {
    el.setAttribute('data-index', idx);
  });
  contents.forEach((el, idx) => {
    el.setAttribute('data-index', idx);
  });
}

function syncMobileTabContent(activeIdx) {
  if (window.innerWidth >= 768) return;
  const triggers = document.querySelectorAll('.mobile-model-tabs .inner-tab-trigger');
  const contents = document.querySelectorAll('.example-side-item .inner-tab-content');
  triggers.forEach((el, idx) => {
    const tIdx = el.getAttribute('data-index');
    if (parseInt(tIdx) === activeIdx) {
      el.classList.add('active');
      el.style.opacity = '1';
      el.style.transition = 'opacity';
    } else {
      el.classList.remove('active');
      el.style.opacity = '0.6';
      el.style.transition = 'opacity';
    }
  });
  contents.forEach((el, idx) => {
    const cIdx = el.getAttribute('data-index');
    if (parseInt(cIdx) === activeIdx) {
      el.classList.add('active');
      el.style.opacity = '1';
      el.style.transition = 'opacity';
      el.style.visibility = 'visible';
      el.style.zIndex = '1';
      el.style.position = 'relative';
    } else {
      el.classList.remove('active');
      el.style.opacity = '0';
      el.style.transition = 'opacity';
      el.style.visibility = 'hidden';
      el.style.zIndex = '-1';
      el.style.position = 'absolute';
    }
  });
}

if (modelTabs) {
  window.addEventListener('resize', function () {
    initTabMobileSwiper();
    if (window.innerWidth < 768) assignMobileTabIndexes();
  });
  window.addEventListener('DOMContentLoaded', function () {
    initTabMobileSwiper();
    if (window.innerWidth < 768) assignMobileTabIndexes();
  });
}

function initInnerTabClick() {
  if (window.innerWidth >= 768) {
    const triggers = document.querySelectorAll('.example-side-txts.top-tab-txts .inner-tab-trigger');
    const contents = document.querySelectorAll('.example-side-item .inner-tab-content');
    triggers.forEach((trigger, idx) => {
      trigger.onclick = function () {
        triggers.forEach((el, i) => {
          el.classList.toggle('active', i === idx);
          if (contents[i]) contents[i].classList.toggle('active', i === idx);
        });
      };
    });
  } else {
    // PC가 아니면 .example-side-txts.top-tab-txts .inner-tab-trigger 클릭 이벤트 제거
    const triggers = document.querySelectorAll('.example-side-txts.top-tab-txts .inner-tab-trigger');
    triggers.forEach(trigger => {
      trigger.onclick = null;
    });
  }
}
window.addEventListener('DOMContentLoaded', initInnerTabClick);
window.addEventListener('resize', initInnerTabClick);

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
      const blackStyleSections = document.querySelectorAll('.bg-black-style');
      blackStyleSections.forEach(section => {
        const sectionRect = section.getBoundingClientRect();
        const isInBlackStyle = sectionRect.top <= headerHeight && sectionRect.bottom > headerHeight;
        if (isInBlackStyle) {
          stickyHeader.classList.add('black-style');
          return;
        }
      });
      if (!Array.from(blackStyleSections).some(section => {
        const sectionRect = section.getBoundingClientRect();
        return sectionRect.top <= headerHeight && sectionRect.bottom > headerHeight;
      })) {
        stickyHeader.classList.remove('black-style');
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


// 모바일에서 스크롤 시 탭 active 동기화 (강제 초기화)
function syncMobileTabActiveByScroll() {
  if (window.innerWidth >= 768) return;
  const triggers = document.querySelectorAll('.mobile-model-tabs .inner-tab-trigger');
  const contents = document.querySelectorAll('.example-side-item .inner-tab-content');
  const header = document.querySelector('#main-header');
  const headerHeight = header ? header.offsetHeight : 0;
  const viewportHeight = window.innerHeight;
  let foundIdx = -1;
  contents.forEach((content, idx) => {
    const rect = content.getBoundingClientRect();
    // 화면 상단 기준(헤더 아래)에서 컨텐츠가 40% 이상 보이면 해당 탭 active
    const visibleTop = Math.max(rect.top, headerHeight);
    const visibleBottom = Math.min(rect.bottom, viewportHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const contentHeight = rect.height;
    if (contentHeight > 0 && visibleHeight / contentHeight > 0.4 && foundIdx === -1) {
      foundIdx = idx;
    }
  });
  // 항상 모든 탭의 active를 먼저 제거
  triggers.forEach((el) => el.classList.remove('active'));
  // 해당 섹션만 active
  if (foundIdx !== -1) {
    triggers[foundIdx].classList.add('active');
  }
}
window.addEventListener('scroll', syncMobileTabActiveByScroll);






// ====== K Model 순차 영상 자동재생 (IntersectionObserver + 모바일 분기) ======
(function () {
  // 유틸: 이미지/비디오 show/hide
  function showVideo(wrapper) {
    const img = wrapper.querySelector('img');
    const videoWrap = wrapper.querySelector('.video-play-wrapper');
    if (img) img.style.opacity = 0;
    if (videoWrap) videoWrap.style.opacity = 1;
  }
  function showImage(wrapper) {
    const img = wrapper.querySelector('img');
    const videoWrap = wrapper.querySelector('.video-play-wrapper');
    if (img) img.style.opacity = 1;
    if (videoWrap) videoWrap.style.opacity = 0;
  }

  // 순차 재생 컨트롤러 (PC)
  function SequentialVideoPlayer(container) {
    this.container = container;
    this.wrappers = Array.from(container.querySelectorAll('.auto-video-wrapper'));
    this.videos = this.wrappers.map(w => w.querySelector('video'));
    this.currentIdx = 0;
    this.isPlaying = false;
    this.loop = true;
    this._onEnded = this._onEnded.bind(this);
  }
  SequentialVideoPlayer.prototype.play = function () {
    if (this.isPlaying || this.wrappers.length === 0) return;
    this.isPlaying = true;
    this.currentIdx = 0;
    this._playCurrent();
  };
  SequentialVideoPlayer.prototype._playCurrent = function () {
    this.wrappers.forEach(showImage);
    const wrapper = this.wrappers[this.currentIdx];
    const video = this.videos[this.currentIdx];
    showVideo(wrapper);
    video.currentTime = 0;
    video.loop = false;
    video.removeEventListener('ended', this._onEnded);
    video.addEventListener('ended', this._onEnded);
    video.play().catch(() => { });
  };
  SequentialVideoPlayer.prototype._onEnded = function () {
    showImage(this.wrappers[this.currentIdx]);
    this.currentIdx++;
    if (this.currentIdx >= this.videos.length) {
      if (this.loop) {
        this.currentIdx = 0;
      } else {
        this.isPlaying = false;
        return;
      }
    }
    this._playCurrent();
  };
  SequentialVideoPlayer.prototype.stop = function () {
    this.isPlaying = false;
    this.videos.forEach((video, idx) => {
      video.pause();
      video.currentTime = 0;
      showImage(this.wrappers[idx]);
      video.removeEventListener('ended', this._onEnded);
    });
  };

  // 모바일: 모든 영상 동시 무한재생
  function playAllVideos(wrappers, videos) {
    wrappers.forEach(showVideo);
    videos.forEach(video => {
      video.loop = true;
      video.currentTime = 0;
      video.play().catch(() => { });
    });
  }
  function stopAllVideos(wrappers, videos) {
    videos.forEach((video, idx) => {
      video.pause();
      video.currentTime = 0;
      showImage(wrappers[idx]);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('video-play-trigger-01');
    if (!container) return;
    const wrappers = Array.from(container.querySelectorAll('.auto-video-wrapper'));
    const videos = wrappers.map(w => w.querySelector('video'));
    wrappers.forEach(showImage);

    // PC: 기존 IntersectionObserver 순차재생
    // 모바일: AOS 등장 후 전체 영상 무한재생
    function isMobile() {
      return window.innerWidth <= 767;
    }

    let observer;
    let aosIn = false;

    function handleEnter() {
      if (isMobile()) {
        playAllVideos(wrappers, videos);
        aosIn = true;
      } else {
        player.play();
      }
    }
    function handleLeave() {
      if (isMobile()) {
        stopAllVideos(wrappers, videos);
        aosIn = false;
      } else {
        player.stop();
      }
    }

    // PC용 순차재생 인스턴스
    const player = new SequentialVideoPlayer(container);

    // 옵저버 등록 (PC/모바일 공통)
    observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            handleEnter();
          } else {
            handleLeave();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(container);

    // 모바일: AOS 등장 후 바로 재생 (IntersectionObserver가 즉시 트리거됨)
    // 리사이즈 대응: PC<->모바일 전환 시 상태 초기화
    window.addEventListener('resize', function () {
      if (isMobile()) {
        if (aosIn) {
          playAllVideos(wrappers, videos);
        } else {
          stopAllVideos(wrappers, videos);
        }
      } else {
        stopAllVideos(wrappers, videos);
        player.stop();
      }
    });
  });
})();
// ====== // K Model 순차 영상 자동재생 ======


