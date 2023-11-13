import { PixelImage } from "..";
import * as S from "./styles";

interface Props {
  variant: 0 | 1;
}

export function Grass({ variant = 0 }: Props) {
  return (
    <S.ImageContainer>
      <PixelImage src="/props/grass0.png" alt="grass" className="defaultSize" />
    </S.ImageContainer>
  );
}
