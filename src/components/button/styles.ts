import styled, { css } from "styled-components";

const ButtonVariant = {
  success: css`
    background-color: #4dd435;
    border-bottom: 5px solid green;
    border-right: 5px solid green;
  `,
  danger: css`
    background-color: red;
    border-bottom: 5px solid #9e1a1a;
    border-right: 5px solid #9e1a1a;
  `,
};

export const Button = styled.button<{ $variant?: "success" | "danger" }>`
  background-color: rgb(239, 239, 239);

  outline: none;
  padding: 10px 14px;
  cursor: pointer;
  border: none;
  border-bottom: 5px solid gray;
  border-right: 5px solid gray;
  margin: 5px;
  box-shadow: -5px 0 0 0 black, 5px 0 0 0 black, 0 -5px 0 0 black,
    0 5px 0 0 black;

  ${({ $variant }) => ($variant ? ButtonVariant[$variant] : "")}

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
  }

  &:enabled:active {
    border: none;
    border-top: 5px solid gray;
    border-left: 5px solid gray;
  }
`;
