import { useLayoutEffect, useState } from "react";
import PropTypes from 'prop-types';

const useCalculateGridSize = (maxWidthItem = 200, itemPadding = 8) => {
  const [dimensions, setDimensions] = useState([0, 0]);
  const [sizeItem, setSizeItem] = useState(0);

  const updateSize = () => {
    console.log("useCallback updateSize")
    const calculateNumCols = (widthScreen) => {
      return Math.round(widthScreen / maxWidthItem);
    };
  
    const calculateNumRows = (numCols, innerWidth, innerHeight, padding) => {
      const availWidth = innerWidth - padding * (numCols + 1);
      const maxWidthImg = availWidth / numCols;
      return Math.ceil(innerHeight / maxWidthImg);
    };
  
    const calculateHeightImgWrapper = (innerHeight, numRows, padding) => {
      const innerHeightWithPadding = innerHeight / numRows;
      const totalPadingImg = padding * (numRows + 1) / numRows;
      const heightImg = innerHeightWithPadding - totalPadingImg;
      return Math.round((heightImg + Number.EPSILON) * 100) / 100;
    };

    const { innerWidth, innerHeight } = window
    const numCols = calculateNumCols(innerWidth);
    const numRows = calculateNumRows(numCols, innerWidth,innerHeight, itemPadding);
    setDimensions([numRows, numCols])
    const sizeItem = calculateHeightImgWrapper(innerHeight, numRows, itemPadding);
    setSizeItem(sizeItem);
  };


  useLayoutEffect(() => {
    console.log("useLayoutEffect updateSize")
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);


  return {
    numCols: dimensions[1],
    numRows: dimensions[0],
    sizeItem: sizeItem,
  };
};

useCalculateGridSize.propTypes = {
  maxWidthItem: PropTypes.number,
  itemPadding: PropTypes.number
};

export default useCalculateGridSize;
