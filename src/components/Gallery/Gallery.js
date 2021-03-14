import React, {useState, useEffect} from "react"
import { getImages } from "../../api/api"
import "./Gallery.sass"

const Gallery = () => {

    const [ images, setImages] = useState([]);
    const [ page, setPage] = useState(1);

    useEffect(() => {
        try {
            getImages(page)
                .then(images => setImages(prevImages => ([...prevImages, ...images])))
          } catch(e) {
            console.log(e)
          }
    }, [page])

    console.log(images);
    return (
        <section className="gallery">
            {images.map(({src, alt}, idx) =>
             (<div className="gallery__wrapper"><img className="gallery__image" key={idx} src={src} alt={alt}/></div>))}
            <div className="gallery__placeholder"></div>
            <div className="gallery__placeholder"></div>
            <div className="gallery__placeholder"></div>
            <div className="gallery__placeholder"></div>
        </section>
    );
}

export default Gallery;