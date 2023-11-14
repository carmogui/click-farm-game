import styled from "styled-components";

const characterSize = "16px";
const pixelSize = 4;

const chopingFrames = 4;

export const ImageContainer = styled.figure<{ $toTheRight: boolean }>`
  position: relative;
  overflow: hidden;
  width: calc(${characterSize} * ${pixelSize});
  height: calc(${characterSize} * ${pixelSize});
  pointer-events: none;

  ${({ $toTheRight }) => ($toTheRight ? "transform: scale(-1, 1);" : "")}

  @keyframes chop {
    from {
      transform: translate3d(0px, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }

  .defaultCharacterSize {
    width: calc(${characterSize} * ${pixelSize});
    height: calc(${characterSize} * ${pixelSize});
  }

  .spriteChopCharacterMoving,
  .spriteChopCharacterStop {
    width: calc(calc(${characterSize} * ${pixelSize}) * ${chopingFrames});
  }

  .spriteChopCharacterMoving {
    animation: chop 500ms steps(4) infinite;
  }
`;
