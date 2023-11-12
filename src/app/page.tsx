"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

enum Resources {
  Wood = "wood",
  Stone = "stone",
}

enum Tools {
  Axe = "axe",
  Pickaxe = "pickaxe",
}

export default function Home() {
  const [devMode, setDevMode] = useState(false);

  const [wood, setWood] = useState(0);
  const [stone, setStone] = useState(0);
  const [coins, setCoins] = useState(0);

  const [isCollecting, setIsCollecting] = useState<Resources | null>(null);

  const [woodWorker, setWoodWorker] = useState(0);
  const [stoneWorker, setStoneWorker] = useState(0);

  const [sellWoodQtd, setSellWoodQtd] = useState(0);
  const [sellStoneQtd, setSellStoneQtd] = useState(0);

  const [isChoping, setIsChoping] = useState(false);
  const [isMining, setIsMining] = useState(false);

  const [axeLevel, setAxeLevel] = useState(1);
  const [pickaxeLevel, setPickaxeLevel] = useState(1);

  const [stamina, setStamina] = useState(100);
  const [isResting, setIsResting] = useState(false);

  function getStamina() {
    setIsResting((cur) => !cur);
  }

  const axeHit = axeLevel * 2;
  const pickaxeHit = pickaxeLevel * 1;

  const axePrice = Math.floor(axeLevel * 0.5 * 100) + 100;
  const pickaxePrice = Math.floor(pickaxeLevel * 0.8 * 100) + 100;

  const [ticking, setTicking] = useState(true),
    [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 1e3);
    autoGetResourses();

    if (isResting) {
      if (stamina < 100) {
        setStamina((cur) => cur + 5);
      }
    }

    if (isChoping) {
      if (stamina >= 10) {
        setStamina((cur) => cur - 10);
        setWood((cur) => cur + 10);
      }
    }
    return () => clearTimeout(timer);
  }, [count, ticking]);

  function getWood() {
    // if (devMode) {
    //   setWood((cur) => cur + axeHit * 50);
    // } else {
    //   setWood((cur) => cur + axeHit);
    // }

    setIsChoping((cur) => !cur);
  }

  function getStone() {
    if (devMode) {
      setStone((cur) => cur + pickaxeHit * 50);
    } else {
      setStone((cur) => cur + pickaxeHit);
    }
  }

  function sellWood(quantity: number) {
    if (wood >= quantity) {
      setWood((cur) => cur - quantity);
      setSellWoodQtd((cur) => cur - quantity);
      setCoins((cur) => cur + quantity);
    } else {
      alert("you have no enoght wood");
    }
  }

  function sellStone(quantity: number) {
    if (stone >= quantity) {
      setStone((cur) => cur - quantity);
      setSellStoneQtd((cur) => cur - quantity);
      setCoins((cur) => cur + quantity * 2);
    } else {
      alert("you have no enoght stone");
    }
  }

  const woodWorkerHit = woodWorker * 2;
  const stoneWorkerHit = stoneWorker * 1;

  const woodWorkerPrice = Math.floor(woodWorker * 0.5 * 100) + 100;
  const stoneWorkerPrice = Math.floor(stoneWorker * 0.8 * 100) + 100;

  function buyWoodWorker() {
    if (coins >= woodWorkerPrice) {
      setWoodWorker((cur) => cur + 1);
      setCoins((cur) => cur - woodWorkerPrice);
    }
  }

  function buyStoneWorker() {
    if (coins >= stoneWorkerPrice) {
      setStoneWorker((cur) => cur + 1);
      setCoins((cur) => cur - stoneWorkerPrice);
    }
  }

  function autoGetResourses() {
    setWood((cur) => cur + woodWorkerHit);
    setStone((cur) => cur + stoneWorkerHit);
  }

  function upgradeTool(tool: Tools) {
    if (tool === Tools.Axe) {
      setCoins((cur) => cur - axePrice);
      setAxeLevel((cur) => cur + 1);
    } else if (tool === Tools.Pickaxe) {
      setCoins((cur) => cur - pickaxePrice);
      setPickaxeLevel((cur) => cur + 1);
    } else {
      alert("unknown tool");
    }
  }

  const sellLevels = [50, 100, 500, 1000, 5000];

  return (
    <main className={styles.main}>
      <div className={styles.devMode}>
        <span>dev mode: {devMode ? "on" : "off"}</span>
        <button
          className={styles.button}
          onClick={() => setDevMode((cur) => !cur)}
        >
          dev mode
        </button>
      </div>

      {devMode && (
        <div>
          <div>{count}</div>
          <button className={styles.button} onClick={() => setTicking(false)}>
            pause
          </button>
          <button className={styles.button} onClick={() => setTicking(true)}>
            resume
          </button>
        </div>
      )}

      {/*=========================================================== SCRENARY */}

      <div className={styles.scenary}>
        <img
          className={styles.treeInScenary}
          src="https://static.vecteezy.com/system/resources/previews/013/743/345/original/pixel-art-tree-icon-png.png"
          alt="get wood"
        />

        <img
          className={styles.stoneInScenary}
          src="https://i.pinimg.com/originals/b9/18/86/b918860d89d6ce3139dc89f8a3843aa6.png"
          alt="get stone"
        />

        <div
          className={
            isChoping
              ? styles.characterInScenaryChoping
              : styles.characterInScenary
          }
        >
          {isChoping ? (
            <div className={styles.spriteStop}>
              <Image
                className={
                  stamina >= 10
                    ? styles.spriteChopCharacterMoving
                    : styles.spriteChopCharacterStop
                }
                src="/character/chopping.png"
                width={16 * 4 * 4}
                height={16 * 4}
                alt="character"
                quality={100}
              />
            </div>
          ) : (
            <div className={styles.spriteStop}>
              <Image
                className={isResting ? styles.isResting : styles.sprite}
                src="/character/character.png"
                width={16 * 4}
                height={16 * 4}
                alt="character"
                quality={100}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.resources}>
          <div className={styles.resourceCounter}>
            <Image
              className={styles.sprite}
              src="/character/character.png"
              width={16 * 4}
              height={16 * 4}
              alt="character"
              quality={100}
            />
            <span className={styles.text}>Damian</span>
          </div>

          {/* =============================== STAMINA */}

          <div className={styles.resourceCounter}>
            <span>stamina</span>

            <div className={styles.staminaBar}>
              <div
                style={{ width: `${stamina}%` }}
                className={styles.stamina}
              ></div>
            </div>
          </div>

          <div className={styles.resourceCounter}>
            <img
              className={styles.image}
              src="https://media.printables.com/media/prints/139211/images/1323029_1068d1ae-63cf-4820-8763-9e935d91ec63/coin-image.png"
              alt="coins:"
            />
            <span className={styles.text}>{coins}</span>
          </div>

          <hr />

          <div className={styles.resourceCounter}>
            <span>wood worker: {woodWorker}</span>
            <span className={woodWorkerHit > 0 ? styles.textGreen : ""}>
              + {woodWorkerHit}
            </span>
          </div>

          <div className={styles.resourceCounter}>
            <span>stone worker: {stoneWorker}</span>
            <span className={stoneWorkerHit > 0 ? styles.textGreen : ""}>
              + {stoneWorkerHit}
            </span>
          </div>

          <hr />

          <div className={styles.resourceCounter}>
            <div className={styles.toolWrapper}>
              <img
                className={styles.image}
                src="https://art.pixilart.com/374fd2a7a4eafb0.png"
                alt="axe"
              />
              <span> Lvl: {axeLevel}</span>
            </div>

            <span className={axeHit > 0 ? styles.textGreen : ""}>
              + {axeHit}
            </span>
          </div>

          <div className={styles.resourceCounter}>
            <div className={styles.toolWrapper}>
              <img
                className={styles.image}
                src="https://art.pixilart.com/2c9335fed5ab4c7.png"
                alt="pickaxe"
              />
              <span> Lvl: {pickaxeLevel}</span>
            </div>

            <span className={pickaxeHit > 0 ? styles.textGreen : ""}>
              + {pickaxeHit}
            </span>
          </div>

          <hr />

          <div className={styles.resourceCounter}>
            <Image
              className={styles.sprite}
              src="/resources/log.png"
              width={32}
              height={32}
              alt="wood:"
            />
            <span className={styles.text}>{wood}</span>
          </div>

          <div className={styles.resourceCounter}>
            <img
              className={styles.image}
              src="https://i.redd.it/w1ctilzr8df71.png"
              alt="stone:"
            />
            <span className={styles.text}>{stone}</span>
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={getWood}
            disabled={isResting}
          >
            <img
              className={styles.image}
              src="https://art.pixilart.com/374fd2a7a4eafb0.png"
              alt="axe"
            />
            <span>{isChoping ? "stop" : "start"}</span>
          </button>

          <button className={styles.button} onClick={getStone}>
            <img
              className={styles.image}
              src="https://art.pixilart.com/2c9335fed5ab4c7.png"
              alt="pickaxe"
            />
          </button>

          <button
            className={styles.button}
            onClick={getStamina}
            disabled={isChoping}
          >
            REST
          </button>
        </div>
      </div>

      <div>
        <h2>orders</h2>

        <div className={styles.storeButtons}>
          <div className={styles.orderWrapper}>
            {sellLevels.map((sellLevel) => {
              const orderDisabled = wood < sellLevel;

              return (
                <div
                  key={sellLevel}
                  className={
                    orderDisabled ? styles.orderCardDisabled : styles.orderCard
                  }
                >
                  <Image
                    className={styles.sprite}
                    src="/resources/log.png"
                    width={32}
                    height={32}
                    alt="wood"
                  />
                  <span>{sellLevel}</span>
                  <button
                    className={styles.button}
                    onClick={() => sellWood(sellLevel)}
                    disabled={orderDisabled}
                  >
                    sell
                  </button>
                </div>
              );
            })}
          </div>

          <div className={styles.orderWrapper}>
            {sellLevels.map((sellLevel) => {
              const orderDisabled = stone < sellLevel;

              return (
                <div
                  key={sellLevel}
                  className={
                    orderDisabled ? styles.orderCardDisabled : styles.orderCard
                  }
                >
                  <img
                    className={styles.image}
                    src="https://i.redd.it/w1ctilzr8df71.png"
                    alt="stone"
                  />
                  <span>{sellLevel}</span>
                  <button
                    className={styles.button}
                    onClick={() => sellStone(sellLevel)}
                    disabled={orderDisabled}
                  >
                    sell
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <h2>store</h2>
        <div className={styles.storeButtons}>
          <button
            className={styles.button}
            onClick={buyWoodWorker}
            disabled={coins < woodWorkerPrice}
          >
            wood worker ({woodWorkerPrice} coins)
          </button>
          <button
            className={styles.button}
            onClick={buyStoneWorker}
            disabled={coins < stoneWorkerPrice}
          >
            stone worker ({stoneWorkerPrice} coins)
          </button>
          <button
            className={styles.button}
            onClick={() => upgradeTool(Tools.Axe)}
            disabled={coins < axePrice}
          >
            upgrade axe ({axePrice} coins)
          </button>
          <button
            className={styles.button}
            onClick={() => upgradeTool(Tools.Pickaxe)}
            disabled={coins < pickaxePrice}
          >
            upgrade pickaxe({pickaxePrice} coins)
          </button>
        </div>
      </div>
    </main>
  );
}
