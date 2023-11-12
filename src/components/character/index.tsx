import * as S from "./styles";
import { PixelImage } from "..";

interface Props {
  skin: "main" | "worker0";
  isChopping?: boolean;
  isMining?: boolean;
  isResting?: boolean;
  isTired?: boolean;
  toTheRight?: boolean;
}

const skins = {
  main: "/character/",
  worker0: "/character/worker/",
};

export function Character({
  skin,
  isChopping = false,
  isMining = false,
  isResting = false,
  isTired = false,
  toTheRight = false,
}: Props) {
  const characterStop = (
    <PixelImage
      className="defaultCharacterSize"
      src={`${skins[skin]}character.png`}
      alt="character"
    />
  );

  const characterChoping = (
    <PixelImage
      className={`defaultCharacterSize ${
        isTired ? "spriteChopCharacterStop" : "spriteChopCharacterMoving"
      }`}
      src={`${skins[skin]}chopping.png`}
      alt="character"
    />
  );

  const characterMining = (
    <PixelImage
      className={`defaultCharacterSize ${
        isTired ? "spriteChopCharacterStop" : "spriteChopCharacterMoving"
      }`}
      src={`${skins[skin]}mining.png`}
      alt="character"
    />
  );

  const characterResting = (
    <PixelImage
      className="defaultCharacterSize isResting"
      src={`${skins[skin]}character.png`}
      alt="character"
    />
  );

  function renderCharacter() {
    if (isResting) {
      return characterResting;
    }

    if (isChopping) {
      return characterChoping;
    }

    if (isMining) {
      return characterMining;
    }

    return characterStop;
  }

  return (
    <S.ImageContainer $toTheRight={toTheRight}>
      {renderCharacter()}
    </S.ImageContainer>
  );
}
