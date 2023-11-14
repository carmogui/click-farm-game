import styled from "styled-components";

const propSize = "32px";
const pixelSize = 4;

export const ImageContainer = styled.figure`
  position: relative;
  overflow: hidden;
  width: calc(${propSize} * ${pixelSize});
  height: calc(${propSize} * ${pixelSize});
  pointer-events: none;

  .defaultSize {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(${propSize} * ${pixelSize});
    height: calc(${propSize} * ${pixelSize});
  }

  .sheet {
    z-index: 2;
  }
`;
