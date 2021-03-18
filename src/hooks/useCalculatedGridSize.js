import { useLayoutEffect, useState } from "react";
import PropTypes from 'prop-types';

const useCalculateGridSize = (maxWidthItem = 200, itemPadding = 8) => {
  const [size, setSize] = useState([0, 0]);

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

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const numCols = calculateNumCols(size[0]);
  const numRows = calculateNumRows(numCols, size[0], size[1], itemPadding);
  const sizeItem = calculateHeightImgWrapper(size[1], numRows, itemPadding);
  return {
    numCols: numCols,
    numRows: numRows,
    sizeItem: sizeItem,
  };
};

useCalculateGridSize.propTypes = {
  maxWidthItem: PropTypes.number,
  itemPadding: PropTypes.number
};

export default useCalculateGridSize;
