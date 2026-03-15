"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPScrollEffects() {
    useEffect(() => {
        // Parallax drift for section titles
        gsap.utils.toArray<HTMLElement>("section h2").forEach((el) => {
            gsap.fromTo(
                el,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        end: "top 40%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        // Floating drift for cards
        gsap.utils.toArray<HTMLElement>(".tilt-card").forEach((el, i) => {
            gsap.fromTo(
                el,
                { y: 80, opacity: 0, rotateX: 5 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1,
                    delay: i * 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        // Cinematic reveal for the contact section
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            gsap.fromTo(
                contactSection,
                { backgroundPosition: "50% 100%" },
                {
                    backgroundPosition: "50% 0%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: contactSection,
                        start: "top bottom",
                        end: "top top",
                        scrub: 1,
                    },
                }
            );
        }

        // Smooth section entry for all sections
        gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
            const children = section.querySelectorAll(
                ":scope > div > *:not(h2):not(p[class*='tracking'])"
            );
            gsap.fromTo(
                children,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return null;
}
