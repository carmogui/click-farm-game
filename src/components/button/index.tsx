import { ButtonHTMLAttributes } from "react";
import * as S from "./styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "success" | "danger";
}

export function Button({ variant, children, ...rest }: Props) {
  return (
    <S.Button $variant={variant} {...rest}>
      {children}
    </S.Button>
  );
}
