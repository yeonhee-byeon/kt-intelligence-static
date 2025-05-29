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
    // const logo = document.querySelector(".hero-logo");
    const button = document.querySelector(".hero-btn-wrap");
    const title1First = document.querySelector(".hero-title1-first");
    const title1Second = document.querySelector(".hero-title1-second");
    const title1Third = document.querySelector(".hero-title1-third");
    const title2First = document.querySelector(".hero-title2-first");
    const title2Second = document.querySelector(".hero-title2-second");
    const title2Third = document.querySelector(".hero-title2-third");

    // 등장 애니메이션
    gsap.set(title1First, { opacity: 0 });
    gsap.set(title2First, { opacity: 0 });
    gsap.set(title1Second, { opacity: 0 });
    gsap.set(title2Second, { opacity: 0 });
    gsap.set(title1Third, { opacity: 0 });
    gsap.set(title2Third, { opacity: 0 });
    gsap.set(button, { opacity: 0 });

    if (window.gsap) {
        const tl = gsap.timeline({ repeat: -1 });

        // First set
        tl.to(title1First, { opacity: 1, duration: 1, ease: "power2.out" })
            .to(title2First, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.2")
            .to([title1First, title2First], { opacity: 0, ease: "power2.out", delay: 5 })

            // Second set
            .to(title1Second, { opacity: 1, duration: 1, ease: "power2.out" })
            .to(title2Second, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.2")
            .to([title1Second, title2Second], { opacity: 0, ease: "power2.out", delay: 5 })

            // Third set
            .to(title1Third, { opacity: 1, duration: 1, ease: "power2.out" })
            .to(title2Third, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.2")
            .to([title1Third, title2Third], { opacity: 0, ease: "power2.out", delay: 5 });
    }
    gsap.to(button, { opacity: 1, duration: 1, delay: 1.5, ease: "power2.out" });

    // 롤링 애니메이션
    // const interval = setInterval(() => {
    //     if (title1First && title1Second && title1Third && title2First && title2Second && title2Third) {
    //         // 첫 번째 텍스트 롤링
    //         title1First.style.animation = "rollingCurrent 0.5s ease-in-out forwards";
    //         title1Second.style.animation = "rollingNext 0.5s ease-in-out forwards";
    //         setTimeout(() => {
    //             if (title2First && title2Second && title2Third) {
    //                 title2First.style.animation = "rollingCurrent 0.5s ease-in-out forwards";
    //                 title2Second.style.animation = "rollingNext 0.5s ease-in-out forwards";
    //                 title2Third.style.animation = "rollingNext 0.5s ease-in-out forwards";
    //             }
    //         }, 250);
    //         setTimeout(() => {
    //             if (title1First && title1Second && title1Third) {
    //                 title1First.style.animation = "";
    //                 title1Second.style.animation = "";
    //                 title1Third.style.animation = "";
    //                 // 텍스트 스왑
    //                 const temp1 = title1First.innerHTML;
    //                 title1First.innerHTML = title1Second.innerHTML;
    //                 title1Second.innerHTML = title1Third.innerHTML;
    //                 title1Third.innerHTML = temp1;
    //             }
    //         }, 500);
    //         setTimeout(() => {
    //             if (title2First && title2Second && title2Third) {
    //                 title2First.style.animation = "";
    //                 title2Second.style.animation = "";
    //                 title2Third.style.animation = "";
    //                 // 텍스트 스왑
    //                 const temp2 = title2First.innerHTML;
    //                 title2First.innerHTML = title2Second.innerHTML;
    //                 title2Second.innerHTML = title2Third.innerHTML;
    //                 title2Third.innerHTML = temp2;
    //             }
    //         }, 750);
    //     }
    // }, 5000);
    // window.addEventListener("beforeunload", () => {
    //     clearInterval(interval);
    // });
})();

// InfoSection 카운트업 애니메이션 (info-section 진입 시 1회만 실행)
(function () {
    function animateCountUp(el, target, duration) {
        let start = 0;
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value.toString().padStart(3, "0");
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toString().padStart(3, "0");
            }
        }
        requestAnimationFrame(step);
    }
    function startCountUp() {
        const groupTitles = document.querySelectorAll(".group-title strong");
        groupTitles.forEach(function (el) {
            const target = parseInt(el.textContent.replace(/[^0-9]/g, ""), 10);
            el.textContent = "000";
            animateCountUp(el, target, 1000);
        });
    }
    document.addEventListener("DOMContentLoaded", function () {
        const infoSection = document.getElementById("info-section");
        if (!infoSection) return;
        let hasAnimated = false;
        const observer = new window.IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && !hasAnimated) {
                        hasAnimated = true;
                        startCountUp();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );
        observer.observe(infoSection);
    });
})();

// Parallax Section Animation (Vanilla JS + GSAP)
(function () {
    // Element selectors
    const section = document.getElementById("parallax-section");
    const subtitle1 = document.getElementById("subtitle1");
    const subtitle2 = document.getElementById("subtitle2");
    const subtitle3 = document.getElementById("subtitle3");
    const description = document.getElementById("parallax-description");

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

    // Timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%",
            scrub: 2,
            pin: true,
            pinSpacing: true,
        },
    });

    // Sequence: subtitles, images, description
    tl.fromTo(...fadeInY(subtitle3))
        .fromTo(...fadeInY(".image-obj-2"))
        .fromTo(...fadeInY(".image-obj-5", 100, "<", false))
        .fromTo(...fadeInY(subtitle2))
        .fromTo(...fadeInY(".image-obj-4"))
        .fromTo(...fadeInY(".image-obj-1", 100, "-=0.4", false))
        .fromTo(...fadeInY(subtitle1))
        .fromTo(...fadeInY(".image-obj-0"))
        .fromTo(...fadeInY(".image-obj-3"))
        .fromTo(...fadeInY(".image-obj-6", 100, "<", false))
        .fromTo(...fadeInY(description, 100, "<"));
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

    // GSAP 애니메이션 초기 세팅
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=3000",
        pin: true,
        pinSpacing: true,
    });
    gsap.set(titleGroup, { opacity: 0, y: 30 });
    gsap.set(konGroup, { opacity: 0, y: 30 });
    gsap.set(contentMenu, { opacity: 0 });
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
            start: "top top",
            end: "+=1000",
            toggleActions: "play reset play reset",
        },
    });

    titleTl
        .to(titleGroup, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        })
        .to(konGroup, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        });

    // 큐브 이동 애니메이션
    const cubeTl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "+=1000",
            end: "+=1000",
            toggleActions: "play none none reset",
        },
    });
    cubeTl.to(cubeItems[0], { opacity: 1, duration: 0.3, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" }).to(cubeItems[1], { yPercent: 34, xPercent: 50, duration: 0.8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" }).to(cubeItems[2], { yPercent: 76, xPercent: 22, duration: 0.8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" }, "-=0.6").to(cubeItems[3], { yPercent: 90, xPercent: 50, duration: 0.8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" }, "-=0.6").to(cubeItems[4], { yPercent: 103, xPercent: 78, duration: 0.8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" }, "-=0.6").to(
        cubeItems[5],
        {
            yPercent: 75,
            xPercent: 50,
            duration: 0.8,
            ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        },
        "-=0.6"
    );

    const contentTl = gsap.timeline({
        delay: 1,
        scrollTrigger: {
            trigger: container,
            start: "+=1000",
            end: "+=1000",
            toggleActions: "play reset play reset",
        },
    });
    contentTl.to(contentMenu, { opacity: 1, duration: 0.3, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" });

    // 마지막 큐브/타이틀/설명 등장
    const cubeTl2 = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "+=2000",
            end: "+=1000",
            toggleActions: "play none none reset",
            onEnter: () => {
                savedActiveIndex = activeIndex;
                resetAllCubeImages();
                setActiveMenu(7);
            },
            onLeaveBack: () => {
                setActiveMenu(savedActiveIndex);
            },
        },
    });
    cubeTl2.to(contentMenu, { opacity: 0, duration: 0.5, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" }, "<").to(cubeItems[6], { opacity: 1, duration: 0.5, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" }).to(cubeTitle, { opacity: 1, duration: 0.5, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" }).to(cubeDesc, { opacity: 1, duration: 0.5, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)" });

    // 초기화
    setActiveMenu(0);
    setTimeout(() => ScrollTrigger.refresh(), 0);
})();
