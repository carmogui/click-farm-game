import styled from "styled-components";

const propSize = "64px";
const pixelSize = 4;

export const ImageContainer = styled.figure`
  position: relative;
  overflow: hidden;
  width: calc(${propSize} * ${pixelSize});
  height: calc(${propSize} * ${pixelSize});
  pointer-events: none;

  .defaultSize {
    width: calc(${propSize} * ${pixelSize});
    height: calc(${propSize} * ${pixelSize});
  }
`;
