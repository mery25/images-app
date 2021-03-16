import { useLayoutEffect } from 'react';

export function useLockBodyScroll() {
    useLayoutEffect(() => {

        const originalStyle = windows.getComputedStyle(document.body).overflow;

        document.body.style.overflow = 'hidden';

        return () => document.body.style.overflow = originalStyle;
    }, []))
}