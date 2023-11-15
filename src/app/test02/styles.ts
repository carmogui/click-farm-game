import styled from "styled-components";

export const Wrapper = styled.div`
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100px;
    width: 100px;
    font-size: 50px;
    z-index: 5;
    cursor: pointer;
  }

  .outside-box {
    width: 5000px;
    height: 5000px;
    background-color: green;
  }

  .inside-box {
    width: 400px;
    height: 200px;
    background-color: blue;
  }

  .moving-box {
    width: 100px;
    height: 100px;
    background-color: red;
  }

  .moving-box-point {
    position: absolute;
    top: calc(80px - 2px);
    left: calc(50px - 2px);
    width: 4px;
    height: 4px;
    background-color: black;
  }
`;
