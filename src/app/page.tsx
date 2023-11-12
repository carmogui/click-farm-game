"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Bad, Button, Character } from "@/components";

enum Resources {
  Wood = "wood",
  Stone = "stone",
}

enum Tools {
  Axe = "axe",
  Pickaxe = "pickaxe",
}

export default function Home() {
  const [character, setCharacter] = useState({
    wood: 0,
    stone: 0,
    cash: 20000,
    axe: 1,
    pickaxe: 1,

    stamina: 100,
    isResting: false,
    isChoping: false,
    isMining: false,
  });

  const [worker0, setWorker0] = useState({
    name: "Summer",
    stars: 5,

    stamina: 100,
    isResting: false,
    isChoping: false,
    isMining: false,
  });

  const axeHit = character.axe * 2;
  const pickaxeHit = character.pickaxe * 1;

  const axePrice = Math.floor(character.axe * 0.5 * 100) + 100;
  const pickaxePrice = Math.floor(character.pickaxe * 0.8 * 100) + 100;

  const [menus, setMenus] = useState({
    showInventory: false,
    showOrders: false,
    showStore: false,
  });

  function toggleInventory() {
    setMenus((cur) => {
      return {
        showInventory: !cur.showInventory,
        showOrders: false,
        showStore: false,
      };
    });
  }

  function toggleOrders() {
    setMenus((cur) => {
      return {
        showOrders: !cur.showOrders,
        showInventory: false,
        showStore: false,
      };
    });
  }

  function toggleStore() {
    setMenus((cur) => {
      return {
        showStore: !cur.showStore,
        showOrders: false,
        showInventory: false,
      };
    });
  }

  const [ticking, setTicking] = useState(true),
    [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 1e3);

    if (character.isResting) {
      if (character.stamina < 100) {
        setCharacter((cur) => {
          return { ...cur, stamina: cur.stamina + 5 };
        });
      }
    }

    if (character.isChoping) {
      if (character.stamina >= 10) {
        setCharacter((cur) => {
          return {
            ...cur,
            stamina: cur.stamina - 10,
            wood: cur.wood + axeHit,
          };
        });
      }
    }

    if (character.isMining) {
      if (character.stamina >= 10) {
        setCharacter((cur) => {
          return {
            ...cur,
            stamina: cur.stamina - 10,
            stone: cur.stone + pickaxeHit,
          };
        });
      }
    }
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, ticking]);

  function getStamina() {
    setCharacter((cur) => {
      return {
        ...cur,
        isResting: !cur.isResting,
        isChoping: false,
        isMining: false,
      };
    });
  }

  function getWood() {
    setCharacter((cur) => {
      return {
        ...cur,
        isChoping: !cur.isChoping,
        isMining: false,
        isResting: false,
      };
    });
  }

  function getStone() {
    setCharacter((cur) => {
      return {
        ...cur,
        isMining: !cur.isMining,
        isChoping: false,
        isResting: false,
      };
    });
  }

  function sellWood(quantity: number) {
    if (character.wood >= quantity) {
      setCharacter((cur) => {
        return {
          ...cur,
          wood: cur.wood - quantity,
          cash: cur.cash + quantity,
        };
      });
    } else {
      alert("you have no enoght wood");
    }
  }

  function sellStone(quantity: number) {
    if (character.stone >= quantity) {
      setCharacter((cur) => {
        return {
          ...cur,
          stone: cur.stone - quantity,
          cash: cur.cash + quantity,
        };
      });
    } else {
      alert("you have no enoght stone");
    }
  }

  function upgradeTool(tool: Tools) {
    if (tool === Tools.Axe) {
      setCharacter((cur) => {
        return {
          ...cur,
          cash: cur.cash - axePrice,
          axe: cur.axe + 1,
        };
      });
    } else if (tool === Tools.Pickaxe) {
      setCharacter((cur) => {
        return {
          ...cur,
          cash: cur.cash - pickaxePrice,
          pickaxe: cur.pickaxe + 1,
        };
      });
    } else {
      alert("unknown tool");
    }
  }

  const sellLevels = [50, 100, 500, 1000, 5000];

  const inventory = (
    <div className={styles.floatMenu}>
      <h2>inventory</h2>

      <div className={styles.resourceCounter}>
        <Character skin={"main"} />
        <span className={styles.text}>Damian</span>
      </div>

      <div className={styles.resourceCounter}>
        <img
          className={styles.image}
          src="https://media.printables.com/media/prints/139211/images/1323029_1068d1ae-63cf-4820-8763-9e935d91ec63/coin-image.png"
          alt="coins:"
        />
        <span className={styles.text}>{character.cash}</span>
      </div>

      <hr />

      <div className={styles.resourceCounter}>
        <div className={styles.toolWrapper}>
          <img
            className={styles.image}
            src="https://art.pixilart.com/374fd2a7a4eafb0.png"
            alt="axe"
          />
          <span> Lvl: {character.axe}</span>
        </div>

        <span className={axeHit > 0 ? styles.textGreen : ""}>+ {axeHit}</span>
      </div>

      <div className={styles.resourceCounter}>
        <div className={styles.toolWrapper}>
          <img
            className={styles.image}
            src="https://art.pixilart.com/2c9335fed5ab4c7.png"
            alt="pickaxe"
          />
          <span> Lvl: {character.pickaxe}</span>
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
        <span className={styles.text}>{character.wood}</span>
      </div>

      <div className={styles.resourceCounter}>
        <img
          className={styles.image}
          src="https://i.redd.it/w1ctilzr8df71.png"
          alt="stone:"
        />
        <span className={styles.text}>{character.stone}</span>
      </div>
    </div>
  );

  const orders = (
    <div className={styles.floatMenu}>
      <h2>orders</h2>

      <div className={styles.storeButtons}>
        <div className={styles.orderWrapper}>
          {sellLevels.map((sellLevel) => {
            const orderDisabled = character.wood < sellLevel;

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
                <Button
                  onClick={() => sellWood(sellLevel)}
                  disabled={orderDisabled}
                >
                  sell
                </Button>
              </div>
            );
          })}
        </div>

        <div className={styles.orderWrapper}>
          {sellLevels.map((sellLevel) => {
            const orderDisabled = character.stone < sellLevel;

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
                <Button
                  onClick={() => sellStone(sellLevel)}
                  disabled={orderDisabled}
                >
                  sell
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const store = (
    <div className={styles.floatMenu}>
      <h2>store</h2>

      <span>cash {character.cash}</span>

      <div className={styles.storeButtons}>
        <Button
          onClick={() => upgradeTool(Tools.Axe)}
          disabled={character.cash < axePrice}
        >
          upgrade axe ({axePrice} coins)
        </Button>
        <Button
          onClick={() => upgradeTool(Tools.Pickaxe)}
          disabled={character.cash < pickaxePrice}
        >
          upgrade pickaxe({pickaxePrice} coins)
        </Button>
      </div>
    </div>
  );

  return (
    <main className={styles.main}>
      {menus.showInventory && inventory}

      {menus.showOrders && orders}

      {menus.showStore && store}

      {/* =============================== STAMINA */}
      <div className={styles.staminaWrapper}>
        <div className={styles.resourceCounter}>
          <span>stamina</span>

          <span>{character.stamina}/100</span>
          <div className={styles.staminaBar}>
            <div
              style={{ width: `${character.stamina}%` }}
              className={styles.stamina}
            ></div>
          </div>
        </div>
      </div>

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

        <div className={styles.badInScenary}>
          <Bad level={0} />
        </div>

        <div
          className={
            character.isResting
              ? styles.characterInScenaryResting
              : character.isChoping
              ? styles.characterInScenaryChoping
              : character.isMining
              ? styles.characterInScenaryMining
              : styles.characterInScenary
          }
        >
          <Character
            skin={"main"}
            toTheRight={character.isMining}
            isChopping={character.isChoping}
            isMining={character.isMining}
            isResting={character.isResting}
            isTired={character.stamina < 10}
          />
        </div>

        <div
          className={
            character.isResting
              ? styles.workerInScenaryResting
              : character.isChoping
              ? styles.workerInScenaryChoping
              : character.isMining
              ? styles.workerInScenaryMining
              : styles.workerInScenary
          }
        >
          <Character
            skin={"worker0"}
            toTheRight={worker0.isChoping}
            isChopping={worker0.isChoping}
            isMining={character.isMining}
            isResting={worker0.isResting}
            isTired={worker0.stamina < 10}
          />
        </div>
      </div>

      <div className={styles.actionButtons}>
        <Button
          onClick={getWood}
          variant={character.isChoping ? "success" : undefined}
        >
          <img
            className={styles.image}
            src="https://art.pixilart.com/374fd2a7a4eafb0.png"
            alt="axe"
          />
        </Button>

        <Button
          onClick={getStone}
          variant={character.isMining ? "success" : undefined}
        >
          <img
            className={styles.image}
            src="https://art.pixilart.com/2c9335fed5ab4c7.png"
            alt="pickaxe"
          />
        </Button>

        <Button
          onClick={getStamina}
          variant={character.isResting ? "success" : undefined}
        >
          REST
        </Button>

        <Button
          onClick={toggleInventory}
          variant={menus.showInventory ? "success" : undefined}
        >
          inventory
        </Button>

        <Button
          onClick={toggleOrders}
          variant={menus.showOrders ? "success" : undefined}
        >
          orders
        </Button>

        <Button
          onClick={toggleStore}
          variant={menus.showStore ? "success" : undefined}
        >
          store
        </Button>
      </div>
    </main>
  );
}
