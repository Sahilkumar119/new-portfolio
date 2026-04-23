import { useEffect, useRef, useState } from "react";

/**
 * Lightweight scroll-reveal hook using IntersectionObserver.
 *
 * Returns a ref to attach to the element and a boolean `visible`.
 * Once the element enters the viewport (by `threshold`), `visible`
 * flips to true permanently (no re-hide on scroll up).
 *
 * @param {Object}  opts
 * @param {number}  opts.threshold – fraction visible to trigger (0-1), default 0.15
 * @param {string}  opts.rootMargin – margin around root, default "0px 0px -60px 0px"
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = "0px 0px -60px 0px" } = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(el); // fire-once
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return [ref, visible];
}
