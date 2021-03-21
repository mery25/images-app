import React, { useState, useEffect, useCallback } from "react";
import { getImages } from "../../api/api";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import useCalculatedGridSize from "../../hooks/useCalculatedGridSize";
import "./Gallery.sass";

const Gallery = () => {
  const { numCols, numRows, sizeItem } = useCalculatedGridSize(210);
  console.log("gallery init ", numCols, numRows, sizeItem);
  const [images, setImages] = useState([]);
  const toggleLockBodyScroll = useLockBodyScroll("visible");
  const [ loaded, setLoaded] = useState(false);
  const onScroll = useCallback(
    entries => {
      console.log("useCallback onscroll" , numCols, numRows, sizeItem, loaded)
      const [{ intersectionRatio, boundingClientRect, rootBounds }] = entries;

      console.log(entries[0])

      if (intersectionRatio === 1 && boundingClientRect.top + 40 > rootBounds.bottom && numCols && numRows && sizeItem) {
          console.log("intersects ", numCols, numRows, sizeItem)
          loadMore();
      }
    }, [numCols, numRows, sizeItem, images])


  const addNewImages = (prevImages, newImages) => {
    const lastPrevImage = prevImages[prevImages.length - 1];
    const lastNewImage = newImages[newImages.length - 1];
    if (lastPrevImage && lastPrevImage.id === lastNewImage.id)
      return prevImages;
    return [...prevImages, ...newImages];
  };

  function loadImages(start, limit) {
    console.log("loadImages", start, limit);
    try {
      toggleLockBodyScroll();
      getImages(start, limit).then((images) => {
        if (images.length === 0) return false;
        setImages((prevImages) => addNewImages(prevImages, images));
        return true;
      })
      .then(() => setLoaded(prevLoaded => true));
    } catch (e) {
      console.log(e);
    }  finally {
      toggleLockBodyScroll();
    } 
  }

  function loadMore() {
    const limit = numCols * numRows;
    console.log("loadMore", numCols, numRows, sizeItem);
    const indexLastImg = images.length > 0 ? images[images.length - 1].id - 1 : 0;
    loadImages(indexLastImg + 1, limit);
  }

 function fillScreen() {
    let limit = numCols * numRows;
    let start = 0;
    if (images.length === 0) loadImages(start, limit);
    const indexLastImg = images.length > 0 ? images[images.length - 1].id - 1 : 0;
    const remainder = indexLastImg % limit;
    if (remainder === 0) return;
    limit -= remainder;
    start =  indexLastImg + 1;
    loadImages(start, limit);
  }

  useEffect(() => {
    console.log("useEffect fillscreen");
    if (!loaded && numCols && numRows && sizeItem) {
        console.log("fillscreen")
        fillScreen();
    }
  }, [ numCols, numRows, sizeItem]);

  useEffect(() => {
    console.log("useEffect observer");
    const observer = new IntersectionObserver(onScroll,
        { threshold: [1], rootMargin: "8px"}
      );
    observer.observe(document.querySelector("div.boundary"));

    return () =>
      document.querySelector("div.boundary") &&
      observer.unobserve(document.querySelector("div.boundary"));
  }, [onScroll]);

  const handleClick = (idx) => {
    setImages((prevImatges) => {
      const newImatges = [...prevImatges];
      newImatges.splice(idx, 1);
      return newImatges;
    });
  };

  return (
    <section
      className="images-section"
      style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
    >
        <div 
            className="gallery" 
            style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
        >
            {images.map(({ id, src, alt }, idx) => (
                <button
                className="gallery__wrapper"
                key={id}
                onClick={() => handleClick(idx)}
                style={{ width: `${sizeItem}px`, height: `${sizeItem}px` }}
                >
                <img className="gallery__image" src={src} alt={alt} />
                <span className="gallery__text">{id}</span>
                </button>
            ))}
        </div>
        <div className="boundary"></div>
    </section>
  );
};

export default Gallery;
