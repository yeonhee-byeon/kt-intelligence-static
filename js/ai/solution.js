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
