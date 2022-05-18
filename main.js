let controller;
let slideScene;
let pageScene;
function animateSlides() {
    // initial controller
    controller = new ScrollMagic.Controller();
    // selecting something
    const sliders = document.querySelectorAll(".slide");
    const nav = document.querySelectorAll(".nav-header");

    //looping over slides

    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector(".reveal-img");
        const img = slide.querySelector("img");
        const revealText = slide.querySelector(".reveal-text");

        //gsap
        const slideTl = gsap.timeline({
            defaults: { duration: 1, ease: "power2.intOut" },
        });
        slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
        slideTl.fromTo(img, { scale: 1.5 }, { scale: 1 }, "-=1");
        slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.8");
        slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false,
        })
            .setTween(slideTl)
            // .addIndicators({
            //     colorStart: "white",
            //     colorTrigger: "white",
            //     name: "slide",
            // })
            .addTo(controller);

        // new animation

        const pageTl = gsap.timeline();
        let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
        pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
        pageTl.fromTo(
            slide,
            { opacity: 1, scale: 1 },
            { opacity: 0, scale: 0.5 }
        );
        pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=1");

        // create new scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0,
        })
            // .addIndicators({
            //     colorStart: "white",
            //     colorTrigger: "white",
            //     name: "page",
            //     indent: 200,
            // })
            .setPin(slide, { pushFollowers: false })
            .setTween(pageTl)
            .addTo(controller);
    });
}

const burger = document.querySelector(".burger");
const navToggle = (e) => {
    if (!e.target.classList.contains("active")) {
        e.target.classList.add("active");
        gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
        gsap.to(".line1", 0.5, { rotate: "45", y: 4, background: "black" });
        gsap.to(".line2", 0.5, { rotate: "-45", y: -4, background: "black" });
        gsap.to("#logo", 1, { color: "black" });
        document.body.classList.add("hide");
    } else {
        e.target.classList.remove("active");
        gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
        gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to("#logo", 1, { color: "white" });
        document.body.classList.remove("hide");
    }
};

const logo = document.querySelector("#logo");
// page transitions
barba.init({
    views: [
        {
            namespace: "home",
            beforeEnter() {
                animateSlides();
            },
            beforeLeave() {
                slideScene.destroy();
                pageScene.destroy();
                controller.destroy();
            },
        },
        {
            namespace: "fashion",
            beforeEnter() {
                gsap.fromTo(
                    ".nav-header",
                    1,
                    { y: "100%" },
                    { y: "0%", ease: "power2.inOut" }
                );
            },
        },
    ],
    transitions: [
        {
            leave({ current, next }) {
                let done = this.async();
                const tl = new gsap.timeline({
                    defaults: { ease: "power2.inOut" },
                });
                tl.fromTo(
                    current.container,
                    1,
                    { opacity: 1 },
                    { opacity: 0, onComplete: done }
                );
                tl.fromTo(
                    ".swipe",
                    0.75,
                    { x: "-100%" },
                    { x: "0%", onComplete: done },
                    "-=0.5"
                );
            },
            enter({ current, next }) {
                let done = this.async();

                // scroll to the top when entering in a new page
                window.scrollTo(0, 0);
                const tl = new gsap.timeline({
                    defaults: { ease: "power2.inOut" },
                });
                tl.fromTo(
                    ".swipe",
                    1,
                    { x: "0%" },
                    { x: "100%", stagger: 0.25, onComplete: done }
                );
                tl.fromTo(
                    next.container,
                    1,
                    { opacity: 0 },
                    { opacity: 1, onComplete: done }
                );
            },
        },
    ],
});
burger.addEventListener("click", navToggle);

var animateButton = function (e) {
    e.preventDefault;
    //reset animation
    e.target.classList.remove("animate");

    e.target.classList.add("animate");
    setTimeout(function () {
        e.target.classList.remove("animate");
    }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener("click", animateButton, false);
}
