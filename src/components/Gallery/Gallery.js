import React, {useState, useEffect } from "react"
import { getImages } from "../../api/api"
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll"
import "./Gallery.sass"

const Gallery = () => {

    console.log("Gallery")
    const [ images, setImages] = useState([]);
    const [ start, setStart] = useState(-1);
    const toggleLockBodyScroll = useLockBodyScroll('visible');
    const limit = window.innerWidth <= 500 ? 8 : 15;
    const addNewImages = (prevImages, newImages) => {
        const lastPrevImage = prevImages[prevImages.length - 1];
        const lastNewImage = newImages[newImages.length - 1];
        if (lastPrevImage && lastPrevImage.id === lastNewImage.id) return prevImages
        return [...prevImages, ...newImages]
    }

    const handleClick = (idx) => {
        setImages(prevImatges => {
            const newImatges = [...prevImatges]
            newImatges.splice(idx, 1)
            return newImatges
        })
    }

    useEffect(() => {
        console.log('useEffect []')

        let options = {
            root: null, // When null is the viewport
            rootMargin: '0px',
            threshold: [0.5, 1]
        }
    
        let observer = new IntersectionObserver((entries, observer) => {
            const [ { isIntersecting } ] = entries
            entries.forEach(entry => {
                console.log('intersection observer', entry)
            })
            
            if (isIntersecting) {
                setStart(start => start + limit)
            }
        }, options);

        observer.observe(document.querySelector('div.boundary'));

        return() => observer.unobserve(document.querySelector('div.boundary'))
    }, [])
    
    useEffect(() => {
        console.log("useEffect [start] " + start)
        try {
            if (start === -1) return;
            toggleLockBodyScroll();
            getImages(start, limit)
                .then(images => {
                    if (images.length === 0) return false;
                    setImages(prevImages => addNewImages(prevImages, images))
                    return true;
            }).then(() => toggleLockBodyScroll())
          } catch(e) {
            console.log(e)
          }
    }, [start])

    return (
        <section className="gallery">
            {images.map(({id, src, alt}, idx) =>
                (
                    <button className="gallery__wrapper" key={id} onClick={() => handleClick(idx)}>
                        <img className="gallery__image" src={src} alt={alt}/>
                        <span className="gallery__text" >{id}</span>
                    </button>
                ))}
            <div className="gallery__placeholder boundary"></div>
            <div className="gallery__placeholder"></div>
            <div className="gallery__placeholder"></div>
            <div className="gallery__placeholder"></div>
        </section>
    );
}

export default Gallery;