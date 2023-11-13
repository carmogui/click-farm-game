import { PixelImage } from "..";
import * as S from "./styles";

interface Props {
  level: 0 | 1;
}

export function House({ level = 0 }: Props) {
  return (
    <S.ImageContainer>
      <PixelImage
        src="/props/house0.png"
        alt="house-0"
        className="defaultSize"
      />
    </S.ImageContainer>
  );
}
