import styled from "styled-components";

const propSize = "32px";
const pixelSize = 4;

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
