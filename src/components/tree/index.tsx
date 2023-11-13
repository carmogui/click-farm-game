import { PixelImage } from "..";
import * as S from "./styles";

interface Props {
  level: 0 | 1;
}

export function Tree({ level = 0 }: Props) {
  return (
    <S.ImageContainer>
      <PixelImage src="/props/tree.png" alt="tree" className="defaultSize" />
    </S.ImageContainer>
  );
}
