// Desktop: Dropdown
if (document.querySelectorAll(".has-dropdown").length) {
    document.querySelectorAll(".has-dropdown").forEach((item) => {
        item.addEventListener("mouseenter", () => item.classList.add("active"));
        item.addEventListener("mouseleave", () => item.classList.remove("active"));
        item.querySelector(".nav-link").addEventListener("click", (e) => {
            e.preventDefault();
            item.classList.toggle("active");
        });
    });
}

// Language Dropdown
const langBtn = document.getElementById("lang-btn");
const langMenu = document.getElementById("lang-menu");
const langCurrent = document.getElementById("lang-current");
if (langBtn && langMenu) {
    langBtn.addEventListener("mouseenter", (e) => {
        e.stopPropagation();
        langMenu.classList.add("active");
    });
    langMenu.addEventListener("mouseleave", (e) => {
        langMenu.classList.remove("active");
    });
    langMenu.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            langCurrent.textContent = btn.dataset.lang;
            langMenu.classList.remove("active");
        });
    });
    document.addEventListener("click", (e) => {
        if (!langMenu.contains(e.target) && !langBtn.contains(e.target)) {
            langMenu.classList.remove("active");
        }
    });
}

// 스크롤 시 헤더 숨김/노출
let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");
const sticky = document.querySelector(".sticky-header");
window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    if (currentY === 0) {
        header.classList.add("show");
        header.classList.remove("hide", "scrolled");
        return;
    }
    if (currentY > lastScrollY && currentY > 80) {
        // down
        header.classList.add("hide");
        header.classList.remove("show");
    } else {
        // up
        header.classList.add("show");
        header.classList.remove("hide");
    }
    if (currentY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
    lastScrollY = currentY;
});

// 구성요소 영역에서 dark-header 클래스 토글
const depthSection = document.querySelector(".pds-inner");
const kqualitySection = document.querySelector(".kquality-section");
if (depthSection) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    header.classList.add("dark-header");
                } else {
                    header.classList.remove("dark-header");
                }
            });
        },
        {
            threshold: 0.9,
        }
    );

    observer.observe(depthSection);
}
if (kqualitySection) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    header.classList.add("gray-header");
                } else {
                    header.classList.remove("gray-header");
                }
            });
        },
        {
            threshold: 0.7,
        }
    );
    observer.observe(kqualitySection);
}

// Sticky Header
const stickyHeaderList = document.querySelector(".sticky-header-list");
const componentSections = document.querySelectorAll("#parallax-depth-section, #kquality-section, #eco-section, #usecase-section, #news-section");

if (stickyHeaderList && componentSections.length > 0) {
    // li 클릭 시 해당 section으로 스크롤 이동
    const stickyItems = stickyHeaderList.querySelectorAll("li");
    stickyItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            const sectionId = item.dataset.section;
            const targetSection = document.getElementById(sectionId) || document.querySelector(`[data-section="${sectionId}"]`);
            if (targetSection) {
                // 스크롤 이동 (header 높이만큼 오프셋)
                const headerOffset = (header && header.offsetHeight) || 0;
                const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: sectionTop, behavior: "smooth" });

                // 모든 li에서 active 제거 후, 클릭한 li에 active 부여
                stickyItems.forEach((el) => el.classList.remove("active"));
                item.classList.add("active");
            }
        });
    });

    // 직접 스크롤 시 IntersectionObserver로 li 활성화
    const stickyMenuObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id || entry.target.dataset.section;
                    stickyItems.forEach((el) => el.classList.remove("active"));
                    const activeStickyItem = stickyHeaderList.querySelector(`li[data-section="${sectionId}"]`);
                    if (activeStickyItem) {
                        activeStickyItem.classList.add("active");
                    }
                }
            });
        },
        {
            rootMargin: "-40% 0px",
            threshold: 0.05,
        }
    );
    componentSections.forEach((section) => {
        stickyMenuObserver.observe(section);
    });
}

const stickyHeader = document.querySelector(".sticky-header");
const parallaxSection = document.getElementById("parallax-depth-section");

// 스크롤 위치로 sticky-header show/hide
if (stickyHeader && parallaxSection) {
    window.addEventListener("scroll", () => {
        const sectionRect = parallaxSection.getBoundingClientRect();
        if (sectionRect.top <= 0) {
            stickyHeader.classList.add("show");
        } else {
            stickyHeader.classList.remove("show");
        }
    });
}

// ===== 모바일 메뉴 인터랙션 =====
(function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenuClose = document.getElementById("mobile-menu-close");
    const mobileSolutionToggle = document.getElementById("mobile-solution-toggle");
    const mobileSolutionItem = mobileSolutionToggle && mobileSolutionToggle.closest(".has-sub");
    const mobileSolutionSub = document.getElementById("mobile-solution-sub");
    const mobileLangBtns = document.querySelectorAll(".mobile-menu-lang button");

    // 메뉴 열기
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function () {
            mobileMenu.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }
    // 메뉴 닫기
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener("click", function () {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";
        });
    }
    // Solution 아코디언
    if (mobileSolutionToggle && mobileSolutionItem) {
        mobileSolutionToggle.addEventListener("click", function (e) {
            e.preventDefault();
            mobileSolutionItem.classList.toggle("open");
        });
    }
    // 언어 선택
    if (mobileLangBtns.length) {
        mobileLangBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                mobileLangBtns.forEach(function (b) {
                    b.classList.remove("active");
                });
                btn.classList.add("active");
            });
        });
    }
    // 메뉴 외부 클릭 시 닫기 (선택사항)
    // document.addEventListener('click', function(e) {
    //   if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
    //     mobileMenu.classList.remove('active');
    //     document.body.style.overflow = '';
    //   }
    // });
})();
