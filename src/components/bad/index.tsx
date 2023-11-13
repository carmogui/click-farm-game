import { PixelImage } from "..";
import * as S from "./styles";

interface Props {
  level: 0 | 1;
}

export function Bad({ level = 0 }: Props) {
  return (
    <S.ImageContainer>
      <PixelImage src="/props/bad-0.png" alt="bad-0" className="defaultSize" />
      <PixelImage
        src="/props/bad-0-sheet.png"
        alt="bad-0-sheet"
        className="defaultSize sheet"
      />
    </S.ImageContainer>
  );
}
