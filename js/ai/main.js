// 스크롤 위치 복원 방지
// if ('scrollRestoration' in history) {
//     history.scrollRestoration = 'manual';
// }

// 새로고침/이동 직전 스크롤 위치 초기화
// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
// };

// ===== 애니메이션 함수 정의 =====
function initHeroSectionAnimation() {
    const button = document.querySelector('.hero-btn-wrap');
    if (!button || !window.gsap) return;
    gsap.set(button, { opacity: 0 });
    gsap.to(button, { opacity: 1, duration: 1, delay: 1.5, ease: 'power2.out' });
}

function initSubBannerSectionAnimation() {
    const section = document.getElementById('sub-banner-section');
    if (!section) return;

    const countElements = section.querySelectorAll('.rolling-number');
    if (!countElements.length) return;

    const animateCount = (element, targetNum) => {
        let startNum = 0;
        const duration = 2000; // 2초 동안 애니메이션
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = duration / frameDuration;

        // 이징 함수 추가 - easeOutQuad
        const easeOutQuad = (t) => t * (2 - t);

        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;

            if (progress >= 1) {
                element.textContent = String(targetNum).padStart(2, '0');
                clearInterval(counter);
            } else {
                // 이징 적용하여 부드러운 움직임 구현
                const easedProgress = easeOutQuad(progress);
                const currentNum = Math.floor(targetNum * easedProgress);
                element.textContent = String(currentNum).padStart(2, '0');
            }
        }, frameDuration);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCount(countElements[0], 24);
                    animateCount(countElements[1], 58);
                    observer.unobserve(entry.target); // 한번만 실행
                }
            });
        },
        {
            threshold: 0.5,
            rootMargin: '0px 0px -10% 0px',
        },
    );

    countElements.forEach((element) => {
        observer.observe(element);
    });
}

function initParallaxSectionAnimation() {
    const section = document.querySelector('.parallax-section');
    if (!section || !window.gsap || !window.ScrollTrigger) return;

    // 이미지 요소들 선택
    const images = section.querySelectorAll('.parallax-images img');
    const container = section.querySelector('.parallax-container');

    // 컨테이너 고정 애니메이션
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: true,
            pinSpacing: false,
        },
    });

    // 각 이미지별 패럴렉스 애니메이션
    images.forEach((img, index) => {
        tl.fromTo(
            img,
            {
                y: '0', // 시작 위치 (화면 하단)
            },
            {
                y: '-200vh', // 최종 위치 (원래 위치)
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'bottom bottom',
                    scrub: 1, // 부드러운 스크롤 효과
                    toggleActions: 'play none none reverse',
                },
            },
        );
    });

    return tl;
}

// 큐브 이미지 경로
const imagePaths = [
    {
        src: '/resource/images/ai/k-cube/k-model.png',
        active: '/resource/images/ai/k-cube/k-model-act.png',
    },
    {
        src: '/resource/images/ai/k-cube/k-rag.png',
        active: '/resource/images/ai/k-cube/k-rag-act.png',
    },
    {
        src: '/resource/images/ai/k-cube/k-agent.png',
        active: '/resource/images/ai/k-cube/k-agent-act.png',
    },
    {
        src: '/resource/images/ai/k-cube/k-studio.png',
        active: '/resource/images/ai/k-cube/k-studio-act.png',
    },
    {
        src: '/resource/images/ai/k-cube/k-rai.png',
        active: '/resource/images/ai/k-cube/k-rai-act.png',
    },
    {
        src: '/resource/images/ai/k-cube/k-infra.png',
        active: '/resource/images/ai/k-cube/k-infra-act.png',
    },
];

function initParallaxDepthSectionAnimation() {
    const section = document.querySelector('.parallax-depth-section .component-content');
    if (!section || !window.gsap || !window.ScrollTrigger) return;

    const cubeItems = section.querySelectorAll('.cube-item');
    if (!cubeItems.length) return;

    const tl = gsap.timeline({
        ease: 'cubic-bezier(0.33, 1, 0.68, 1)',
        scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'bottom center',
        },
    });

    tl.fromTo(
        '.cube-item',
        { opacity: 0, y: -100 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
        },
    )
        .fromTo(
            '.cube-wrapper',
            { xPercent: 0, yPercent: 0 },
            { xPercent: 34, yPercent: -5, duration: 0.3 },
        )
        .fromTo(
            '.list-wrap ul',
            { opacity: 0, xPercent: 10, yPercent: -10 },
            { opacity: 1, xPercent: 0, yPercent: 0, duration: 0.3 },
            '<',
        );

    let wheelNavInstance;

    ScrollTrigger.create({
        trigger: '.component-content',
        start: 'top top',
        end: '+=3000', // 충분한 스크롤 공간 확보
        pin: true,
        pinSpacing: true,
        markers: true,
        id: 'depth-pin',
        onEnter: () => {
            wheelNavInstance = new WheelNavigation();
        },
        onLeave: () => {
            if (wheelNavInstance) {
                wheelNavInstance.destroy();
                wheelNavInstance = null;
            }
        },
        onEnterBack: () => {
            wheelNavInstance = new WheelNavigation();
        },
        onLeaveBack: () => {
            if (wheelNavInstance) {
                wheelNavInstance.destroy();
                wheelNavInstance = null;
            }
        },
    });
}

class WheelNavigation {
    constructor() {
        this.listItems = document.querySelectorAll('.list-wrap ul li');
        this.cubeItems = document.querySelectorAll('.cube-wrapper .cube-item');
        this.cubeItems = Array.from(this.cubeItems).reverse();
        if (
            !this.listItems.length ||
            !this.cubeItems.length ||
            this.listItems.length !== this.cubeItems.length
        ) {
            console.warn('WheelNavigation: Mismatch between list and cube items.');
            return;
        }

        this.currentIndex = 0;
        this.isAnimating = false;
        this.boundHandleWheel = this.handleWheel.bind(this);

        this.init();
    }

    init() {
        // Cube items setup: all visible, do not set z-index
        this.cubeItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (img && imagePaths[index]) {
                img.src = imagePaths[index].src;
            }
            gsap.set(item, {
                opacity: 1,
                // zIndex: index === 0 ? 1 : 0, // z-index 제거
            });
        });

        // List items setup
        gsap.set(this.listItems, { opacity: 0 });
        gsap.set(this.listItems[0], { opacity: 1 });
        this.listItems[0].classList.add('active');

        // Set active image for the first cube item
        const initialCubeImg = this.cubeItems[0].querySelector('img');
        if (initialCubeImg && imagePaths[0]) {
            initialCubeImg.src = imagePaths[0].active;
        }

        window.addEventListener('wheel', this.boundHandleWheel, { passive: false });
    }

    destroy() {
        window.removeEventListener('wheel', this.boundHandleWheel, { passive: false });
    }

    handleWheel(e) {
        if (this.isAnimating) {
            e.preventDefault();
            return;
        }

        const direction = e.deltaY > 0 ? 1 : -1;

        // Check for unpinning conditions
        const isExitingTop = direction === -1 && this.currentIndex === 0;
        const isExitingBottom = direction === 1 && this.currentIndex === this.listItems.length - 1;

        if (isExitingTop || isExitingBottom) {
            e.preventDefault();
            this.isAnimating = true;
            const st = ScrollTrigger.getById('depth-pin');

            if (st && window.gsap && window.ScrollToPlugin) {
                let scrollY;
                if (isExitingTop) {
                    scrollY = st.start - 1; // Scroll to just before the pin starts
                } else {
                    // isExitingBottom
                    scrollY = st.end + 1; // Scroll to just after the pin ends
                }

                gsap.to(window, {
                    scrollTo: scrollY,
                    duration: 0.5,
                    onComplete: () => {
                        this.isAnimating = false;
                    },
                });
            } else {
                this.isAnimating = false;
            }
            return;
        }

        e.preventDefault();
        const nextIndex = this.currentIndex + direction;

        if (nextIndex >= 0 && nextIndex < this.listItems.length) {
            this.animateTo(nextIndex);
        }
    }

    animateTo(newIndex) {
        if (this.isAnimating || newIndex === this.currentIndex) return;
        this.isAnimating = true;

        const oldIndex = this.currentIndex;
        this.currentIndex = newIndex;

        const oldCubeImg = this.cubeItems[oldIndex].querySelector('img');
        const newCubeImg = this.cubeItems[newIndex].querySelector('img');

        if (oldCubeImg && imagePaths[oldIndex]) {
            oldCubeImg.src = imagePaths[oldIndex].src;
        }
        if (newCubeImg && imagePaths[newIndex]) {
            newCubeImg.src = imagePaths[newIndex].active;
        }

        // --- List Items: Animate opacity ---
        const tl = gsap.timeline({
            onComplete: () => {
                this.isAnimating = false;
            },
        });

        this.listItems[oldIndex].classList.remove('active');
        tl.to(this.listItems[oldIndex], {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
        });

        this.listItems[newIndex].classList.add('active');
        tl.to(
            this.listItems[newIndex],
            {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.inOut',
            },
            '>-0.2',
        );
    }
}

// 페이지 로드 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    // new WheelNavigation();
});

function initMobileMenu() {
    const pdsSection = document.querySelector('.mobile-pds-menu');
    const ecoSection = document.querySelector('.eco-partners-mobile');

    if (!pdsSection || !ecoSection || !window.Swiper) return;

    const pdsMenuSwiper = new Swiper('.mobile-pds-menu .swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 14,
        centeredSlides: true,
        speed: 500,
        effect: 'slide',
        on: {
            slideChange: function () {
                const activeIndex = this.activeIndex;
                setActiveMenu(activeIndex);
            },
        },
    });

    const ecoSwiper = new Swiper('.eco-partners-mobile .swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 14,
        // centeredSlides: true,
        speed: 500,
        effect: 'slide',
    });
}

// ===== 페이지 로드 후 애니메이션 실행 =====
window.addEventListener('load', function () {
    if (window.gsap && window.ScrollToPlugin) {
        gsap.registerPlugin(ScrollToPlugin);
    }
    // setTimeout(function () {
    //     window.scrollTo(0, 0);
    // }, 10);
    if (window.gsap && window.ScrollTrigger) {
        setTimeout(() => {
            window.ScrollTrigger.refresh();
        }, 100);
        // window.ScrollTrigger.refresh();
    }
    initHeroSectionAnimation();
    initSubBannerSectionAnimation();
    initParallaxSectionAnimation();
    initParallaxDepthSectionAnimation();
    initMobileMenu();
});

// Ensure GSAP ScrollToPlugin is registered
if (window.gsap && window.ScrollToPlugin) {
    gsap.registerPlugin(ScrollToPlugin);
}
