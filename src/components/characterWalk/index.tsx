import * as S from "./styles";
import { PixelImage } from "..";

interface Props {
  side: "top" | "right" | "bottom" | "left";
  isWalking: boolean;
}

export function CharacterWalk({ side = "bottom", isWalking = false }: Props) {
  const characterBottom = (
    <PixelImage
      className={`defaultCharacterSize ${
        isWalking ? "walking-bottom" : "stop-bottom"
      }`}
      src={`/character/characterWalk.png`}
      alt="characterWalk"
    />
  );

  const characterRight = (
    <PixelImage
      className={`defaultCharacterSize ${
        isWalking ? "walking-right" : "stop-right"
      }`}
      src={`/character/characterWalk.png`}
      alt="characterWalk"
    />
  );

  const characterTop = (
    <PixelImage
      className={`defaultCharacterSize ${
        isWalking ? "walking-top" : "stop-top"
      }`}
      src={`/character/characterWalk.png`}
      alt="characterWalk"
    />
  );

  const characterLeft = (
    <PixelImage
      className={`defaultCharacterSize ${
        isWalking ? "walking-left" : "stop-left"
      }`}
      src={`/character/characterWalk.png`}
      alt="characterWalk"
    />
  );

  function renderCharacter() {
    if (side === "bottom") {
      return characterBottom;
    }

    if (side === "right") {
      return characterRight;
    }

    if (side === "top") {
      return characterTop;
    }

    if (side === "left") {
      return characterLeft;
    }

    return characterBottom;
  }

  return (
    <S.ImageContainer>
      <PixelImage
        className="defaultCharacterSize shadow"
        src={`/character/characterShadow.png`}
        alt="characterShadow"
      />

      {renderCharacter()}
    </S.ImageContainer>
  );
}
