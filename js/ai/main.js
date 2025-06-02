// 스크롤 위치 복원 방지
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// 새로고침/이동 직전 스크롤 위치 초기화
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// 새로고침 후 상단 이동 및 GSAP 초기화
window.addEventListener("load", function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 10);
  if (window.gsap && window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
    console.log("gsap 초기화");
  }
});

// HeroSection 등장 및 롤링 애니메이션
(function () {
  const button = document.querySelector(".hero-btn-wrap");
  gsap.set(button, { opacity: 0 });
  gsap.to(button, { opacity: 1, duration: 1, delay: 1.5, ease: "power2.out" });
})();

// ===== sub-banner-section =====
(function () {
  const subBannerSection = document.querySelector(".sub-banner-section");
  if (!subBannerSection) return;

  const subBannerBg = document.querySelector(".sub-banner-inner > img");
  const subBannerList1 = document.querySelector(".sub-banner-item.sub-banner-item1");
  const subBannerList2 = document.querySelector(".sub-banner-item.sub-banner-item2");
  const subBannerList3 = document.querySelector(".sub-banner-item.sub-banner-item3");
  const subBannerList4 = document.querySelector(".sub-banner-item.sub-banner-item4");
  const subBannerList5 = document.querySelector(".sub-banner-item.sub-banner-item5");
  const subBannerList6First = document.querySelector(".sub-banner-item6-first");
  const subBannerList6Second = document.querySelector(".sub-banner-item6-second");

  // 필수 요소가 없으면 실행하지 않음
  if (
    !subBannerBg ||
    !subBannerList1 ||
    !subBannerList2 ||
    !subBannerList3 ||
    !subBannerList4 ||
    !subBannerList5 ||
    !subBannerList6First ||
    !subBannerList6Second
  ) {
    return;
  }

  const numberWrap = document.querySelector(".number-wrap");
  const number = document.querySelector(".number-wrap li");
  if (!numberWrap || !number) return;

  const numberWrapHeight = numberWrap.offsetHeight;
  const numberHeight = number.offsetHeight;

  const counterTimeline = gsap.timeline();
  let r = 0;
  const count = (i) => {
    let rv = -(numberHeight * (i + 10 * r));
    return rv;
  };

  const countAnimation = (n, m) => {
    counterTimeline
      .add("start")
      .to(".nb1 .number-wrap", { y: count(n), duration: 1, ease: "Power2.easeOut" }, "start")
      .to(".nb2 .number-wrap", { y: count(m), duration: 1, ease: "Power2.easeOut" }, "start+=0.3");

    if (r === 0) {
      r++;
    } else if (r == 1) {
      r--;
    }
  };

  // sub-banner-item4
  const nb1_4 = subBannerList4.querySelector(".nb1 .number-wrap");
  const nb2_4 = subBannerList4.querySelector(".nb2 .number-wrap");
  if (!nb1_4 || !nb2_4) return;

  const numberHeight4 = nb1_4.querySelector("li")?.offsetHeight;
  if (!numberHeight4) return;

  let r4 = 0;
  const counterTimeline4 = gsap.timeline();
  const count4 = (i) => -(numberHeight4 * (i + 10 * r4));
  function countAnimation4(n, m) {
    counterTimeline4.clear();
    counterTimeline4
      .add("start")
      .to(nb1_4, { y: count4(n), duration: 1, ease: "Power2.easeOut" }, "start")
      .to(nb2_4, { y: count4(m), duration: 1, ease: "Power2.easeOut" }, "start+=0.3");
    r4 = r4 === 0 ? 1 : 0;
  }

  // sub-banner-item5
  const nb1_5 = subBannerList5.querySelector(".nb1 .number-wrap");
  const nb2_5 = subBannerList5.querySelector(".nb2 .number-wrap");
  if (!nb1_5 || !nb2_5) return;

  const numberHeight5 = nb1_5.querySelector("li")?.offsetHeight;
  if (!numberHeight5) return;

  let r5 = 0;
  const counterTimeline5 = gsap.timeline();
  const count5 = (i) => -(numberHeight5 * (i + 10 * r5));
  function countAnimation5(n, m) {
    counterTimeline5.clear();
    counterTimeline5
      .add("start")
      .to(nb1_5, { y: count5(n), duration: 1, ease: "Power2.easeOut" }, "start")
      .to(nb2_5, { y: count5(m), duration: 1, ease: "Power2.easeOut" }, "start+=0.3");
    r5 = r5 === 0 ? 1 : 0;
  }

  gsap.set(subBannerBg, { opacity: 0, scale: 5, filter: "blur(50px)" });
  gsap.set(subBannerList1, { opacity: 0, x: -100 });
  gsap.set(subBannerList2, { opacity: 0, y: 100 });
  gsap.set(subBannerList3, { opacity: 0, y: 100 });
  gsap.set(subBannerList4, { opacity: 0 });
  gsap.set(subBannerList5, { opacity: 0 });
  gsap.set(subBannerList6First, { opacity: 0, letterSpacing: "20rem", fontSize: "0.2rem" });
  gsap.set(subBannerList6Second, { opacity: 0, letterSpacing: "20rem", fontSize: "0.2rem" });

  // ScrollTrigger 생성 전 GSAP 존재 확인
  if (!window.gsap || !window.ScrollTrigger) return;

  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 2,
    scrollTrigger: {
      trigger: subBannerSection,
      start: "top top",
      pin: true,
      pinSpacing: true,
    },
  });

  tl.to(subBannerBg, {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    duration: 12,
    ease: "power2.out",
  })
    .to(
      subBannerList1,
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      "-=12"
    )
    .to(
      subBannerList1,
      {
        opacity: 0,
        duration: 1,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      "-=11"
    )
    .to(
      subBannerList2,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      "-=10"
    )
    .to(
      subBannerList3,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      "-=9.5"
    )
    .to(
      [subBannerList2, subBannerList3],
      {
        opacity: 0,
        duration: 0.5,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        onComplete: () => {
          countAnimation4(2, 4);
          countAnimation5(5, 8);
        },
      },
      "-=7"
    )
    .to(
      [subBannerList4, subBannerList5],
      {
        opacity: 1,
        duration: 1,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      "-=6.5"
    )
    .to(
      [subBannerList4, subBannerList5],
      {
        opacity: 0,
        duration: 1,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      "-=4.5"
    )
    .to(
      subBannerList6First,
      {
        opacity: 1,
        letterSpacing: "-0.03rem",
        fontSize: "4rem",
        duration: 1.5,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      "-=4"
    )
    .to(
      subBannerList6Second,
      {
        opacity: 1,
        letterSpacing: "-0.03rem",
        fontSize: "4rem",
        duration: 2,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      "-=3.5"
    );
})();

// Parallax Section Animation
(function () {
  // Element selectors
  const section = document.getElementById("parallax-section");
  const subtitle1 = document.getElementById("subtitle1");
  const subtitle2 = document.getElementById("subtitle2");
  const subtitle3 = document.getElementById("subtitle3");
  const description = document.getElementById("parallax-description");
  const imageObj0 = document.querySelector(".image-obj-0");
  const imageObj1 = document.querySelector(".image-obj-1");
  const imageObj2 = document.querySelector(".image-obj-2");
  const imageObj3 = document.querySelector(".image-obj-3");
  const imageObj4 = document.querySelector(".image-obj-4");
  const imageObj5 = document.querySelector(".image-obj-5");
  const imageObj6 = document.querySelector(".image-obj-6");

  // Guard: Required elements and GSAP/ScrollTrigger
  if (!section || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  // Animation config
  const fadeInY = (target, y = 100, delay = "-=0.4", fromTop = true) => [
    target,
    { opacity: 0, y: fromTop ? y : -y },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    },
    delay,
  ];

  gsap.set(
    [
      subtitle3,
      subtitle2,
      subtitle1,
      description,
      imageObj0,
      imageObj1,
      imageObj2,
      imageObj3,
      imageObj4,
      imageObj5,
      imageObj6,
    ],
    { opacity: 0 }
  );
  // Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=50%",
    },
  });

  // Sequence: subtitles, images, description
  tl.fromTo(...fadeInY(subtitle3))
    .fromTo(...fadeInY(".image-obj-2"), 100, "<")
    .fromTo(...fadeInY(".image-obj-5", 100, "<", false))
    .fromTo(...fadeInY(subtitle2))
    .fromTo(...fadeInY(".image-obj-1", 100, "<"))
    .fromTo(...fadeInY(".image-obj-4", 100, "<", false))
    .fromTo(...fadeInY(subtitle1))
    .fromTo(...fadeInY(".image-obj-0", 100, "<"))
    .fromTo(...fadeInY(".image-obj-3", 100, "<", false))
    .fromTo(...fadeInY(".image-obj-6", 100, "<"))
    .fromTo(...fadeInY(description, 100, "+=0.1"));
})();

// ParallaxDepthSection (K intelligence 구성요소) 애니메이션
(function () {
  const section = document.querySelector(".pds-inner");
  if (!section || !window.gsap || !window.ScrollTrigger) return;

  // 주요 엘리먼트
  const container = section.querySelector(".pds-container");
  const titleGroup = section.querySelector(".pds-title-group");
  const konGroup = section.querySelector(".pds-kon-group");
  const contentMenu = section.querySelector(".pds-menu-list").parentElement;
  const cubeWrap = section.querySelector(".pds-cube-wrap");
  const cubeTitle = section.querySelector(".pds-cube-title");
  const cubeDesc = section.querySelector(".pds-cube-desc");
  const menuItems = section.querySelectorAll(".pds-menu-item");
  const cubeItems = section.querySelectorAll(".pds-cube-item");
  const menuTab = section.querySelectorAll(".pds-menu-tab");
  const menuTabItems = section.querySelectorAll(".pds-menu-tab ul li");

  // 큐브 이미지 경로
  const imagePaths = [
    { src: "/resource/images/ai/k-cube/k-spc.svg", active: "/resource/images/ai/k-cube/k-spc-act.svg" },
    { src: "/resource/images/ai/k-cube/k-studio.svg", active: "/resource/images/ai/k-cube/k-studio-act.svg" },
    { src: "/resource/images/ai/k-cube/k-model.svg", active: "/resource/images/ai/k-cube/k-model-act.svg" },
    { src: "/resource/images/ai/k-cube/k-rag.svg", active: "/resource/images/ai/k-cube/k-rag-act.svg" },
    { src: "/resource/images/ai/k-cube/k-agent.svg", active: "/resource/images/ai/k-cube/k-agent-act.svg" },
    { src: "/resource/images/ai/k-cube/k-rai.svg", active: "/resource/images/ai/k-cube/k-rai-act.svg" },
  ];

  let activeIndex = 0;
  let savedActiveIndex = 0;
  let isScrollLocked = false;

  // 메뉴/큐브 활성화 및 이미지 교체
  function setActiveMenu(index) {
    menuItems.forEach((item, i) => item.classList.toggle("active", i === index));
    menuTabItems.forEach((item, i) => item.classList.toggle("active", i === index));
    cubeItems.forEach((li, i) => {
      const img = li.querySelector("img");
      if (!img) return;
      if (i === index && imagePaths[i]) img.src = imagePaths[i].active;
      else if (imagePaths[i]) img.src = imagePaths[i].src;
    });
  }

  function resetAllCubeImages() {
    cubeItems.forEach((li, i) => {
      const img = li.querySelector("img");
      if (img && imagePaths[i]) img.src = imagePaths[i].src;
    });
  }

  // 탭 메뉴 클릭 이벤트
  menuTabItems.forEach((li, i) => {
    li.addEventListener("click", () => {
      activeIndex = i;
      setActiveMenu(i);
    });
  });

  function lockScroll() {
    if (isScrollLocked) return;
    isScrollLocked = true;
    document.addEventListener("wheel", preventDefault, { passive: false });
    document.addEventListener("touchmove", preventDefault, { passive: false });
    document.addEventListener("keydown", preventScrollKeys, { passive: false });
    document.addEventListener("DOMMouseScroll", preventDefault, { passive: false });
    window.addEventListener("mousewheel", preventDefault, { passive: false });
    window.addEventListener("touchstart", preventDefault, { passive: false });
    window.addEventListener("touchend", preventDefault, { passive: false });
  }

  function unlockScroll() {
    if (!isScrollLocked) return;
    isScrollLocked = false;
    document.removeEventListener("wheel", preventDefault, { passive: false });
    document.removeEventListener("touchmove", preventDefault, { passive: false });
    document.removeEventListener("keydown", preventScrollKeys, { passive: false });
    document.removeEventListener("DOMMouseScroll", preventDefault, { passive: false });
    window.removeEventListener("mousewheel", preventDefault, { passive: false });
    window.removeEventListener("touchstart", preventDefault, { passive: false });
    window.removeEventListener("touchend", preventDefault, { passive: false });
  }

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function preventScrollKeys(e) {
    const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
    if (keys.includes(e.keyCode)) {
      e.preventDefault();
      return false;
    }
  }

  // console.log(section.getBoundingClientRect().top);

  // GSAP 애니메이션 초기 세팅
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "+=2000",
    pin: true,
    pinSpacing: true,
    id: "parallax-depth-section",
  });
  gsap.set(titleGroup, { opacity: 0, y: 30 });
  gsap.set(konGroup, { opacity: 0, y: 30 });
  gsap.set(contentMenu, { opacity: 0 });
  gsap.set(menuTab, { opacity: 0 });
  gsap.set(cubeItems[0], { opacity: 0 });
  // 큐브 초기 위치
  gsap.set(cubeItems[1], { yPercent: -400, xPercent: 50 });
  gsap.set(cubeItems[2], { yPercent: -400, xPercent: 22 });
  gsap.set(cubeItems[3], { yPercent: -400, xPercent: 50 });
  gsap.set(cubeItems[4], { yPercent: -400, xPercent: 78 });
  gsap.set(cubeItems[5], { yPercent: 400, xPercent: 50 });
  gsap.set(cubeItems[6], { opacity: 0 });
  gsap.set(cubeTitle, { opacity: 0 });
  gsap.set(cubeDesc, { opacity: 0 });

  // 타이틀/설명 등장
  const titleTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "-10% top",
      end: "+=600",
      toggleActions: "play reset play reset",
      onEnter: lockScroll,
      onLeaveBack: unlockScroll,
    },
    onComplete: unlockScroll,
  });

  titleTl
    .to(titleGroup, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    })
    .to(
      konGroup,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      "-=0.6"
    );

  // 큐브 이동 애니메이션
  const cubeTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "+=520",
      end: "+=680",
      toggleActions: "play none none reset",
      id: "parallax-depth-cube",
      onEnter: lockScroll,
      onLeaveBack: () => {
        setActiveMenu(-1);
        unlockScroll();
      },
    },
  });

  cubeTl
    .to(cubeItems[0], { opacity: 1, duration: 0.3, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" })
    .to(
      cubeItems[1],
      { yPercent: 34, xPercent: 50, duration: 0.8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
      "-=0.3"
    )
    .to(
      cubeItems[2],
      { yPercent: 76, xPercent: 22, duration: 0.8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
      "-=0.6"
    )
    .to(
      cubeItems[3],
      { yPercent: 90, xPercent: 50, duration: 0.8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
      "-=0.6"
    )
    .to(
      cubeItems[4],
      { yPercent: 103, xPercent: 78, duration: 0.8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
      "-=0.6"
    )
    .to(
      cubeItems[5],
      {
        yPercent: 75,
        xPercent: 50,
        duration: 0.8,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        onComplete: () => {
          setActiveMenu(0);
        },
      },
      "-=0.6"
    );

  const contentTl = gsap.timeline({
    delay: 1.4,
    scrollTrigger: {
      trigger: container,
      start: "+=520",
      end: "+=680",
      toggleActions: "play reset play reset",
      onEnter: lockScroll,
      onLeaveBack: unlockScroll,
    },
    onComplete: unlockScroll,
  });

  contentTl
    .to(contentMenu, {
      opacity: 1,
      duration: 0.8,
      ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    })
    .to(
      menuTab,
      {
        opacity: 1,
        duration: 0.8,
        ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      "<"
    );

  // 마지막 큐브/타이틀/설명 등장
  const cubeTl2 = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "+=1200",
      end: "+=600",
      toggleActions: "play none none reset",
      onEnter: () => {
        savedActiveIndex = activeIndex;
        resetAllCubeImages();
        setActiveMenu(7);
        lockScroll();
      },
      onLeaveBack: () => {
        setActiveMenu(savedActiveIndex);
        unlockScroll();
      },
    },
    onComplete: unlockScroll,
  });

  cubeTl2
    .to(contentMenu, { opacity: 0, duration: 0.5, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" }, "<")
    .to(cubeItems[6], { opacity: 1, duration: 0.5, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" })
    .to(cubeTitle, { opacity: 1, duration: 0.5, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" })
    .to(cubeDesc, { opacity: 1, duration: 0.5, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" });

  // 초기화
  setActiveMenu(-1);
  setTimeout(() => ScrollTrigger.refresh(), 0);
})();

// Custom Slider
(function () {
  const slider = document.getElementById("custom-slider");
  const track = document.getElementById("custom-slider-track");
  const slides = Array.from(track.children);
  const slideCount = slides.length;
  const slideWidth = slides[0].offsetWidth + 32;
  let animationId;
  let pos = 0;
  let isPaused = false;
  let lastTimestamp = 0;
  const FRAME_RATE = 60; // 60fps
  const FRAME_INTERVAL = 1000 / FRAME_RATE;
  const MOVE_SPEED = 1;

  // 트랙 복제(무한루프)
  track.innerHTML += track.innerHTML;

  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;

    const elapsed = timestamp - lastTimestamp;

    if (elapsed > FRAME_INTERVAL) {
      if (!isPaused) {
        pos -= MOVE_SPEED;
        if (Math.abs(pos) >= slideWidth * slideCount) {
          pos = 0;
        }
        track.style.transform = `translate3d(${pos}px, 0, 0)`;
      }
      lastTimestamp = timestamp;
    }

    animationId = requestAnimationFrame(animate);
  }

  slider.addEventListener("mouseenter", () => {
    isPaused = true;
  });
  slider.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  animate();
})();
