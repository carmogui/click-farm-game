import styled from "styled-components";

const propSize = "8px";
const pixelSize = 4;

export const ImageContainer = styled.figure`
  position: relative;
  overflow: hidden;
  width: calc(${propSize} * ${pixelSize});
  height: calc(${propSize} * ${pixelSize});

  .defaultSize {
    position: absolute;
    width: calc(${propSize} * ${pixelSize});
    height: calc(${propSize} * ${pixelSize});
  }

  .sheet {
    z-index: 2;
  }
`;
