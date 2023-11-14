import { PixelImage } from "..";
import * as S from "./styles";

export function Cash() {
  return (
    <S.ImageContainer>
      <PixelImage src="/props/cash.png" alt="cash" className="defaultSize" />
    </S.ImageContainer>
  );
}
