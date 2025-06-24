// 스크롤 위치 복원 방지
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// 새로고침/이동 직전 스크롤 위치 초기화
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// ===== 애니메이션 함수 정의 =====
function initHeroSectionAnimation() {
    const button = document.querySelector('.hero-btn-wrap');
    if (!button || !window.gsap) return;
    gsap.set(button, { opacity: 0 });
    gsap.to(button, { opacity: 1, duration: 1, delay: 1.5, ease: 'power2.out' });
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
                    start: 'top top',
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

    let wheelNavInstance; // 휠 네비게이션 인스턴스
    ScrollTrigger.matchMedia({
        all: function () {
            let tlComplete = false;
            const tl = gsap.timeline({
                ease: 'cubic-bezier(0.33, 1, 0.68, 1)',
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'bottom center',
                    id: 'start-tl',
                },
            });

            tl.fromTo(
                '.cube-item',
                { opacity: 0, yPercent: -10 },
                {
                    opacity: 1,
                    yPercent: 0,
                    duration: 0.4,
                    stagger: 0.2,
                    onStart: () => {
                        gsap.set('.cube-wrapper', { xPercent: 0 });
                    },
                },
            )
                .fromTo('.cube-wrapper', { xPercent: 0 }, { xPercent: 34, duration: 0.3 })
                .fromTo(
                    '.list-wrap ul',
                    { opacity: 0, xPercent: 52, yPercent: -12 },
                    {
                        opacity: 1,
                        xPercent: 0,
                        yPercent: 0,
                        duration: 0.3,
                        onComplete: () => {
                            tlComplete = true;
                        },
                    },
                    '<',
                )
                .fromTo(
                    '.list-wrap ul li:first-child',
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.3,
                        onStart: () => {
                            const img = document.querySelector(
                                '.cube-wrapper .cube-item.cube-item-6 img',
                            );
                            if (img) {
                                img.src = imagePaths[0].active;
                            }
                        },
                    },
                    '<',
                );

            ScrollTrigger.create({
                trigger: '.component-content',
                start: 'top top',
                end: '+=1200', // 충분한 스크롤 공간 확보
                pin: true,
                pinSpacing: true,
                id: 'depth-pin',
                onEnter: () => {
                    const checkComplete = () => {
                        if (tlComplete) {
                            if (wheelNavInstance) {
                                wheelNavInstance.destroy();
                                wheelNavInstance = null;
                            }
                            wheelNavInstance = new WheelNavigation(0);
                        } else {
                            requestAnimationFrame(checkComplete);
                        }
                    };
                    requestAnimationFrame(checkComplete);
                },
                onLeave: () => {
                    if (wheelNavInstance) {
                        wheelNavInstance.destroy();
                        wheelNavInstance = null;
                    }
                },
                onEnterBack: () => {
                    const lastIndex =
                        document.querySelectorAll('.parallax-depth-section .list-wrap ul li')
                            .length - 1;
                    if (wheelNavInstance) {
                        wheelNavInstance.destroy();
                        wheelNavInstance = null;
                    }
                    wheelNavInstance = new WheelNavigation(lastIndex);
                },
                onLeaveBack: () => {
                    if (wheelNavInstance) {
                        wheelNavInstance.destroy();
                        wheelNavInstance = null;
                    }
                    const imgs = document.querySelectorAll('.cube-wrapper .cube-item img');
                    const listItems = document.querySelectorAll('.list-wrap ul li');
                    if (imgs && listItems) {
                        imgs.forEach((img) => {
                            if (img.src.includes('k-model')) {
                                img.src = imagePaths[0].active;
                            } else if (img.src.includes('k-rag')) {
                                img.src = imagePaths[1].src;
                            } else if (img.src.includes('k-agent')) {
                                img.src = imagePaths[2].src;
                            } else if (img.src.includes('k-studio')) {
                                img.src = imagePaths[3].src;
                            } else if (img.src.includes('k-rai')) {
                                img.src = imagePaths[4].src;
                            } else if (img.src.includes('k-infra')) {
                                img.src = imagePaths[5].src;
                            }
                        });

                        listItems.forEach((item) => {
                            if (item.classList.contains('active')) {
                                item.classList.remove('active');
                            }
                            listItems[0].classList.add('active');

                            gsap.set(item, { opacity: 0 });
                            gsap.to(listItems[0], {
                                opacity: 1,
                                duration: 0.3,
                                ease: 'power2.inOut',
                            });
                        });
                    }
                },
            });

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.component-content',
                    start: '+=1',
                    end: '+=1300',
                    id: 'depth-pin2',
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    onEnter: () => {
                        console.log('onEnter2');
                        wheelNavInstance = new WheelNavigation(-1);
                    },
                    onLeave: () => {
                        console.log('onLeave2');
                        if (wheelNavInstance) {
                            console.log('destroy');
                            wheelNavInstance.destroy();
                            wheelNavInstance = null;
                        }
                    },
                },
            });

            tl2.fromTo('.list-wrap ul', { opacity: 1 }, { opacity: 0, duration: 0.5 })
                .fromTo(
                    '.cube-wrapper',
                    { xPercent: 34 },
                    {
                        xPercent: 0,
                        duration: 0.5,
                        ease: 'power2.inOut',
                    },
                    '<',
                )
                .fromTo('.component-content', { scale: 1 }, { scale: 0.8, ease: 'power2.inOut' })
                .fromTo(
                    '.cube-last-text',
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            // 애니메이션 완료 후 AOS 재설정
                            if (window.AOS) {
                                setTimeout(() => {
                                    AOS.refreshHard();
                                }, 200);
                            }
                        },
                    },
                    '-=0.2',
                );
        },
    });

    // 리사이즈 시 WheelNavigation만 재생성
    window.addEventListener('resize', () => {
        if (wheelNavInstance) {
            wheelNavInstance.destroy();
            wheelNavInstance = null;
        }
        // 현재 활성화된 li 인덱스 파악 (없으면 0)
        // const activeIndex = (() => {
        //     const items = document.querySelectorAll('.list-wrap ul li');
        //     for (let i = 0; i < items.length; i++) {
        //         if (items[i].classList.contains('active')) return i;
        //     }
        //     return 0;
        // })();
        // wheelNavInstance = new WheelNavigation(activeIndex);
    });
}

class WheelNavigation {
    constructor(startIndex = 0) {
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

        this.currentIndex = startIndex;
        this.isAnimating = false;
        this.boundHandleWheel = this.handleWheel.bind(this);

        this.init();
    }

    init() {
        // Deactivate all items first
        this.listItems.forEach((item) => {
            item.classList.remove('active');
            gsap.set(item, { opacity: 0 });
        });
        this.cubeItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (img && imagePaths[index]) {
                img.src = imagePaths[index].src;
            }
        });

        if (this.currentIndex === -1) {
            return;
        }
        // Activate the item at currentIndex
        const initialListItem = this.listItems[this.currentIndex];
        const initialCubeImg = this.cubeItems[this.currentIndex].querySelector('img');

        initialListItem.classList.add('active');
        gsap.set(initialListItem, { opacity: 1 });

        if (initialCubeImg && imagePaths[this.currentIndex]) {
            initialCubeImg.src = imagePaths[this.currentIndex].active;
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
            duration: 0.5,
            ease: 'power2.inOut',
        });

        this.listItems[newIndex].classList.add('active');
        tl.to(
            this.listItems[newIndex],
            {
                opacity: 1,
                duration: 0.5,
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
    if (window.gsap && window.ScrollTrigger) {
        setTimeout(() => {
            window.ScrollTrigger.refresh();
        }, 100);
    }
    initHeroSectionAnimation();
    initParallaxSectionAnimation();
    initParallaxDepthSectionAnimation();
    initMobileMenu();
});

// Ensure GSAP ScrollToPlugin is registered
if (window.gsap && window.ScrollToPlugin) {
    gsap.registerPlugin(ScrollToPlugin);
}
