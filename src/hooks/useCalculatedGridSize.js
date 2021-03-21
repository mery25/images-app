import { useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";

const useCalculateGridSize = (maxWidthItem = 200, itemPadding = 8) => {
  const [dimensions, setDimensions] = useState([0, 0]);
  const [sizeItem, setSizeItem] = useState(0);

  function calculateNumCols(widthScreen, maxWidthItem) {
    return Math.round(widthScreen / maxWidthItem);
  }

  function calculateNumRows(numCols, innerWidth, innerHeight, padding) {
    const availWidth = innerWidth - padding * (numCols + 1);
    const maxWidthImg = availWidth / numCols;
    return Math.ceil(innerHeight / maxWidthImg);
  }

  function calculateHeightImgWrapper(innerHeight, numRows, padding) {
    const innerHeightWithPadding = innerHeight / numRows;
    const totalPadingImg = (padding * (numRows + 1)) / numRows;
    const heightImg = innerHeightWithPadding - totalPadingImg;
    return Math.round((heightImg + Number.EPSILON) * 100) / 100;
  }
  useLayoutEffect(() => {

    function updateSize() {
      const startTime = performance.now();
      console.log("useCallback updateSize");

      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;

      //if (innerWidth === size[0] && innerHeight === size[1]) return;

      //const numCols = useMemo(() => calculateNumCols(innerWidth, maxWidthItem), [innerWidth]);
      const numCols = calculateNumCols(innerWidth, maxWidthItem);

      const numRows = calculateNumRows(
        numCols,
        innerWidth,
        innerHeight,
        itemPadding
      );
      setDimensions([numRows, numCols]);

      const sizeItem = calculateHeightImgWrapper(
        innerHeight,
        numRows,
        itemPadding
      );
      setSizeItem(sizeItem);
      //setSize([innerWidth, innerHeight]);

      const duration = performance.now() - startTime;
      console.log(`updateSize took ${duration}ms`);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);

  }, [itemPadding, maxWidthItem]);

  return {
    numCols: dimensions[1],
    numRows: dimensions[0],
    sizeItem: sizeItem,
  };
};

useCalculateGridSize.propTypes = {
  maxWidthItem: PropTypes.number,
  itemPadding: PropTypes.number,
};

export default useCalculateGridSize;
