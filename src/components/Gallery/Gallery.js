import React, {useState, useEffect} from "react"
import { getImages } from "../../api/api"
import "./Gallery.sass"

const Gallery = () => {

    const [ images, setImages] = useState([]);
    const [ page, setPage] = useState(1);

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
        console.log("useEffect " + page)
        try {
            const limit = window.innerWidth <= 500 ? 9 : 16;
            getImages(page, limit)
                .then(images => {
                    if (images.length === 0) return false;
                    setImages(prevImages => addNewImages(prevImages, images))
                    return true;
                })
          } catch(e) {
            console.log(e)
          }
    }, [page])

    useEffect(() => {
        let options = {
            root: null, // When null is the viewport
            rootMargin: '0px',
            threshold: [0.25, 0.5, 0.75, 1]
        }
    
        let observer = new IntersectionObserver((entries, observer) => {
            const [ { isIntersecting } ] = entries

            if (isIntersecting) setPage(page => ++page)
        }, options);

        observer.observe(document.querySelector('div.boundary'));

        return() => observer.unobserve(document.querySelector('div.boundary'))
    }, [])

    return (
        <section className="gallery">
            {images.map(({id, src, alt}, idx) =>
                (
                    <button className="gallery__wrapper" key={id} onClick={() => handleClick(idx)}>
                        <img className="gallery__image" src={src} alt={alt}/>
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