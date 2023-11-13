import { PixelImage } from "..";
import * as S from "./styles";

interface Props {
  level: 0 | 1;
}

export function Stone({ level = 0 }: Props) {
  return (
    <S.ImageContainer>
      <PixelImage
        src="/props/stone.png"
        alt="stone-0"
        className="defaultSize"
      />
    </S.ImageContainer>
  );
}
