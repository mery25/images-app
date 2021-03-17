import { useLayoutEffect, useState } from 'react';

export function useLockBodyScroll(initialState) {

    const [ overflowStyle, setOverflowStyle] = useState(initialState)

    const toggleScrollLock = () => {
        setOverflowStyle(prevOverflowStyle => {
            if (prevOverflowStyle === initialState) {
                return 'hidden'
            }
            return initialState;
        })
    }

    useLayoutEffect(() => {
        document.body.style.overflow = overflowStyle;

        return () => document.body.style.overflow = initialState;

    }, [overflowStyle])

    return toggleScrollLock;
}