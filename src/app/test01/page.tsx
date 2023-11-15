"use client";

import { useEffect, useRef, useState } from "react";
import * as S from "./styles";

export default function Test01() {
  const [outsideBox, setOutsideBox] = useState({ x: 200, y: 200 });
  // const [insideBox, setInsideBox] = useState({ x: 100, y: 100 });
  const [movingBox, setMovingBox] = useState({
    x: 200,
    y: 200,
    destinationX: 200,
    destinationY: 200,
  });

  const [ticking, setTicking] = useState(true),
    [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 100);

    mouseWalk();

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, ticking]);

  const firstRender = useRef(true);

  function mouseWalk() {
    const movementSpeed = 20;
    const middleWidth = 50 - 2;
    const footHeight = 80 - 2;

    setMovingBox((cur) => {
      const { x, y, destinationX, destinationY } = cur;

      const xToGo = destinationX - outsideBox.x - middleWidth;
      const yToGo = destinationY - outsideBox.y - footHeight;

      const differenceX = xToGo - x;
      const differenceY = yToGo - y;

      if (differenceX !== 0 && differenceY !== 0) {
        const walkX =
          Math.abs(differenceX) > Math.round(movementSpeed / 2)
            ? Math.round(movementSpeed / 2)
            : differenceX;
        const walkY =
          Math.abs(differenceY) > Math.round(movementSpeed / 2)
            ? Math.round(movementSpeed / 2)
            : differenceY;

        return {
          ...cur,
          x: differenceX > 0 ? x + Math.abs(walkX) : x - Math.abs(walkX),
          y: differenceY > 0 ? y + Math.abs(walkY) : y - Math.abs(walkY),
        };
      }

      const walkX =
        Math.abs(differenceX) > movementSpeed ? movementSpeed : differenceX;
      const walkY =
        Math.abs(differenceY) > movementSpeed ? movementSpeed : differenceY;

      if (differenceX !== 0) {
        return {
          ...cur,
          x: differenceX > 0 ? x + Math.abs(walkX) : x - Math.abs(walkX),
        };
      }

      if (differenceY !== 0) {
        return {
          ...cur,
          y: differenceY > 0 ? y + Math.abs(walkY) : y - Math.abs(walkY),
        };
      }

      // if (x + movementSpeed < xToGo) {
      //   return {
      //     ...cur,
      //     x: x + movementSpeed
      //   };
      // } else if (x - movementSpeed > xToGo) {
      //   return {
      //     ...cur,
      //     x: x - movementSpeed
      //   };
      // } else if (x !== xToGo) {
      //   return {
      //     ...cur,
      //     x: xToGo
      //   };
      // }

      // if (y + movementSpeed < yToGo) {
      //   return {
      //     ...cur,
      //     y: y + movementSpeed
      //   };
      // } else if (y - movementSpeed > yToGo) {
      //   return {
      //     ...cur,
      //     y: y - movementSpeed
      //   };
      // } else if (y !== yToGo) {
      //   return {
      //     ...cur,
      //     y: yToGo
      //   };
      // }

      return {
        ...cur,
      };
    });
  }

  useEffect(() => {
    if (firstRender.current) {
      window.addEventListener("mousemove", (e) => {
        const { ctrlKey, shiftKey, altKey, movementX, movementY } = e;

        if (ctrlKey) {
          setOutsideBox((cur) => {
            return { x: cur.x + movementX, y: cur.y + movementY };
          });

          setMovingBox((cur) => {
            return {
              ...cur,
              destinationX: cur.destinationX + movementX,
              destinationY: cur.destinationY + movementY,
            };
          });
        }
      });

      window.addEventListener("click", (e) => {
        const { clientX, clientY } = e;

        setMovingBox((cur) => {
          return {
            ...cur,
            destinationX: clientX,
            destinationY: clientY,
          };
        });
      });
    }

    firstRender.current = false;
  }, [firstRender]);

  return (
    <S.Wrapper>
      <button
        className="button"
        onClick={() => {
          setTicking((cur) => !cur);
        }}
      >
        {ticking ? "⏸️" : "▶️"}
      </button>
      <div
        style={{ position: "absolute", top: outsideBox.y, left: outsideBox.x }}
        className="outside-box"
      >
        <div
          style={{
            position: "absolute",
            top: movingBox.y,
            left: movingBox.x,
          }}
          className="moving-box"
        >
          <div className="moving-box-point" />
        </div>
        {/* <div
          style={{ position: "absolute", top: insideBox.y, left: insideBox.x }}
          className="inside-box"
        >
        </div> */}
      </div>
    </S.Wrapper>
  );
}
