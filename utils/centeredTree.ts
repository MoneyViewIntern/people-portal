// import { useCallback, useState } from "react";

// export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
//   const [translate, setTranslate] = useState(defaultTranslate);
//   const [dimensions, setDimensions] = useState();
//   const containerRef = useCallback((containerElem) => {
//     if (containerElem !== null) {
//       const { width, height } = containerElem.getBoundingClientRect();
//       setDimensions({ width, height });
//       setTranslate({ x: width / 2, y: height / 2 });
//     }
//   }, []);
//   return [dimensions, translate, containerRef];
// };

import { useCallback, useState, RefObject } from "react";

interface Point {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}

export const useCenteredTree = (
  defaultTranslate: Point = { x: 0, y: 0 }
): [
  Dimensions | undefined,
  Point,
  (containerElem: HTMLElement | null) => void
] => {
  const [translate, setTranslate] = useState<Point>(defaultTranslate);
  const [dimensions, setDimensions] = useState<Dimensions | undefined>();

  const containerRef = useCallback((containerElem: HTMLElement | null) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);

  return [dimensions, translate, containerRef];
};
