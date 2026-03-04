document.addEventListener("DOMContentLoaded", () => {
    // --- 1. スライドカルーセル ---
    const heroInner = document.querySelector(".hero-inner");
    const slides = document.querySelectorAll(".carousel-slide");
    let currentSlide = 0;

    if (heroInner && slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
            heroInner.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 5000);
    }

    // --- 2. スクロールフェードイン ---
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1, // 10%見えたら即座に反応
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- 3. 料金計算 (客室ページ用) ---
    const roomSelect = document.getElementById("room-select");
    const courseSelect = document.getElementById("course-select");
    const totalPrice = document.getElementById("total-price");
    
    if (roomSelect && courseSelect && totalPrice) {
        const calculate = () => {
            const rPrice = parseInt(roomSelect.options[roomSelect.selectedIndex].dataset.price) || 0;
            const cPrice = parseInt(courseSelect.options[courseSelect.selectedIndex].dataset.price) || 0;
            totalPrice.textContent = `¥${(rPrice + cPrice).toLocaleString()}`;
        };
        roomSelect.addEventListener("change", calculate);
        courseSelect.addEventListener("change", calculate);
        calculate();
    }

    // --- 4. モバイルメニューの開閉 (ここを修正・統合しました) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // ボタン自身にactiveをつける（CSSで3本線を「×」にするため）
            menuToggle.classList.toggle('active');
            // メニュー本体にactiveをつける（画面横からスライドインさせるため）
            navMenu.classList.toggle('active');
        });
    }
});