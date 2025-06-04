const bannerSection = document.querySelector("#banner-section");
// const subBannerSection = document.querySelector("#sub-banner-section");
if (bannerSection) {
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
            threshold: 0.1,
        }
    );

    observer.observe(bannerSection);
}

function checkHeader() {
    const header = document.querySelector("#main-header");
    const contentSection = document.querySelector(".content-wrapper");
    const contentSectionRect = contentSection.getBoundingClientRect();

    if (contentSectionRect.top < 0) {
        header.classList.remove("dark-header");
    } else {
        header.classList.add("dark-header");
    }
}

window.addEventListener("scroll", checkHeader);

const cardListHorizontal = document.querySelector(".card-list-horizontal.swiper-container");
function initMobileSwiper() {
    if (window.innerWidth < 768) {
        if (!window.mobileSwiper) {
            window.mobileSwiper = new Swiper(".card-list-horizontal.swiper-container", {
                slidesPerView: 1.2,
                spaceBetween: 16,
            });
        }
    } else {
        if (window.mobileSwiper) {
            window.mobileSwiper.destroy();
            window.mobileSwiper = null;
        }
    }
}
if (cardListHorizontal) {
    window.addEventListener("resize", initMobileSwiper);
    window.addEventListener("DOMContentLoaded", initMobileSwiper);
}
