import styled from "styled-components";

const characterSize = "16px";
const pixelSize = 8;

const framesWidth = 4;
const framesHeight = 4;

export const ImageContainer = styled.figure`
  position: relative;
  overflow: hidden;
  width: calc(${characterSize} * ${pixelSize});
  height: calc(${characterSize} * ${pixelSize});
  pointer-events: none;

  .defaultCharacterSize {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(calc(${characterSize} * ${pixelSize}) * ${framesWidth});
    height: calc(calc(${characterSize} * ${pixelSize}) * ${framesHeight});
  }

  .shadow {
    width: calc(calc(${characterSize} * ${pixelSize}));
    height: calc(calc(${characterSize} * ${pixelSize}));
  }

  @keyframes moveSpriteBottom {
    from {
      transform: translate3d(0px, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes moveSpriteRight {
    from {
      transform: translate3d(0px, calc(-${characterSize} * ${pixelSize}), 0);
    }
    to {
      transform: translate3d(-100%, calc(-${characterSize} * ${pixelSize}), 0);
    }
  }

  @keyframes moveSpriteTop {
    from {
      transform: translate3d(
        0px,
        calc(calc(-${characterSize} * ${pixelSize}) * 2),
        0
      );
    }
    to {
      transform: translate3d(
        -100%,
        calc(calc(-${characterSize} * ${pixelSize}) * 2),
        0
      );
    }
  }

  @keyframes moveSpriteLeft {
    from {
      transform: translate3d(
        0px,
        calc(calc(-${characterSize} * ${pixelSize}) * 3),
        0
      );
    }
    to {
      transform: translate3d(
        -100%,
        calc(calc(-${characterSize} * ${pixelSize}) * 3),
        0
      );
    }
  }

  .stop-bottom {
    transform: translate3d(0px, 0, 0);
  }

  .stop-right {
    transform: translate3d(
      0px,
      calc(calc(-${characterSize} * ${pixelSize})),
      0
    );
  }

  .stop-top {
    transform: translate3d(
      0px,
      calc(calc(-${characterSize} * ${pixelSize}) * 2),
      0
    );
  }

  .stop-left {
    transform: translate3d(
      0px,
      calc(calc(-${characterSize} * ${pixelSize}) * 3),
      0
    );
  }

  .walking-bottom {
    animation: moveSpriteBottom 800ms steps(4) infinite;
  }

  .walking-right {
    animation: moveSpriteRight 800ms steps(4) infinite;
  }

  .walking-top {
    animation: moveSpriteTop 800ms steps(4) infinite;
  }

  .walking-left {
    animation: moveSpriteLeft 800ms steps(4) infinite;
  }
`;
