// js/ai/common/common.js

function includeCommonLayout(options = {}) {
    // header
    fetch("/ai/common/header")
        .then((res) => res.text())
        .then((data) => {
            document.querySelector(".header-inner").innerHTML = data;
        })
        .then(() => {
            //solution 페이지에서만 checkHeader 실행
            if (typeof checkHeader === "function" && window.location.pathname.startsWith("/ai/solution/")) {
                checkHeader();
            }
            // header.js 동적 로드
            var script = document.createElement("script");
            script.src = "/js/ai/common/header.js";
            document.body.appendChild(script);
        });

    // KT Model 체험하기
    if (!options.skipKtModel) {
        fetch("/ai/common/model")
            .then((res) => res.text())
            .then((data) => {
                document.querySelector(".kt-model-section").innerHTML = data;
                // KT Model 삽입 후 AOS 다시 초기화
                if (window.AOS && typeof window.AOS.init === "function") {
                    window.AOS.init();
                }
            });
    }

    //resources Detail banner
    fetch("/ai/common/resourcesBanner")
        .then((res) => res.text())
        .then((data) => {
            document.querySelector(".tech-banner-sec").innerHTML = data;
        });

    // footer
    fetch("/ai/common/footer")
        .then((res) => res.text())
        .then((data) => {
            document.querySelector(".footer").innerHTML = data;
        });
}
