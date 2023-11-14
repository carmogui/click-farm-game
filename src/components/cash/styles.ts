import styled from "styled-components";

const propSize = "16px";
const pixelSize = 2;

export const ImageContainer = styled.figure`
  position: relative;
  overflow: hidden;
  width: calc(${propSize} * ${pixelSize});
  height: calc(${propSize} * ${pixelSize});

  .defaultSize {
    width: calc(${propSize} * ${pixelSize});
    height: calc(${propSize} * ${pixelSize});
  }
`;
