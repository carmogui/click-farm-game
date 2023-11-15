"use client";

import { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { CharacterWalk } from "@/components";

enum MouseButtons {
  Primary = 1,
  Secondary = 2,
}

export default function Test02() {
  const [outsideBox, setOutsideBox] = useState({ x: 200, y: 200 });
  const [movingBox, setMovingBox] = useState({
    x: 200,
    y: 200,
    destinationX: 200,
    destinationY: 200,
  });
  const [charPositionMouse, setCharPositionMouse] = useState<{
    side: "top" | "right" | "bottom" | "left";
    isWalking: boolean;
    x: number;
    y: number;
    destinationX: number;
    destinationY: number;
  }>({
    x: 300,
    y: 300,
    side: "bottom",
    isWalking: false,
    destinationX: 300,
    destinationY: 300,
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
    const middleWidth = 64;
    const footHeight = 120;

    setCharPositionMouse((cur) => {
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
          side: differenceX > 0 ? "right" : "left",
          isWalking: true,
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
          side: differenceX > 0 ? "right" : "left",
          isWalking: true,
        };
      }

      if (differenceY !== 0) {
        return {
          ...cur,
          y: differenceY > 0 ? y + Math.abs(walkY) : y - Math.abs(walkY),
          side: differenceY > 0 ? "bottom" : "top",
          isWalking: true,
        };
      }

      return {
        ...cur,
        isWalking: false,
      };
    });
  }

  useEffect(() => {
    if (firstRender.current) {
      window.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        const { clientX, clientY } = e;

        setCharPositionMouse((cur) => {
          return {
            ...cur,
            destinationX: clientX,
            destinationY: clientY,
          };
        });
      });

      window.addEventListener("mousemove", (e) => {
        const {
          ctrlKey,
          shiftKey,
          altKey,
          movementX,
          movementY,
          button,
          buttons,
        } = e;

        e.preventDefault();

        if (buttons === MouseButtons.Primary) {
          setOutsideBox((cur) => {
            return { x: cur.x + movementX, y: cur.y + movementY };
          });

          setCharPositionMouse((cur) => {
            return {
              ...cur,
              destinationX: cur.destinationX + movementX,
              destinationY: cur.destinationY + movementY,
            };
          });
        }
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
            left: charPositionMouse.x,
            top: charPositionMouse.y,
          }}
        >
          <CharacterWalk
            side={charPositionMouse.side}
            isWalking={charPositionMouse.isWalking}
          />
        </div>

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
      </div>
    </S.Wrapper>
  );
}
