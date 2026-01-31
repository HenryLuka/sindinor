/**
 * Animations UI Module
 * Handles GSAP ScrollTriggers and Lenis Smooth Scroll.
 */

export class AnimationSystem {
    constructor() {
        this.lenis = null;
    }

    init() {
        this.initSmoothScroll();
        this.initGSAP();
        this.initStickyHeader();
    }

    initSmoothScroll() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        const raf = (time) => {
            this.lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
    }

    initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        // Batch animate text elements
        const elements = document.querySelectorAll('.reveal-text, .section-title, .section-label, .section-label-center');

        elements.forEach(el => {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%", // Trigger when top of element hits 85% of viewport
                    }
                }
            );
        });

        // Stagger cards
        this.animateStagger('.servico-card');
        this.animateStagger('.mvv-card');
        this.animateStagger('.member-card');
        this.animateStagger('.news-card');

        // Hero Typography Cinematic Entrance
        const heroTl = gsap.timeline();
        heroTl.fromTo('.logo', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
            .fromTo('.nav-item', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.5")
            .fromTo('.hero-content', { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, "-=0.5")
            .fromTo('.hero-stats', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=0.8");
    }

    animateStagger(selector) {
        const items = document.querySelectorAll(selector);
        if (items.length > 0) {
            ScrollTrigger.batch(selector, {
                start: "top 85%",
                onEnter: batch => gsap.fromTo(batch,
                    { y: 60, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" }
                )
            });
        }
    }

    initStickyHeader() {
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
                gsap.to(header, { backgroundColor: 'rgba(5, 11, 20, 0.9)', backdropFilter: 'blur(10px)', duration: 0.3 });
            } else {
                header.classList.remove('scrolled');
                gsap.to(header, { backgroundColor: '#020408', backdropFilter: 'blur(0px)', duration: 0.3 });
            }
        });
    }
}
