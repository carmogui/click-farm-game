"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  Bad,
  Button,
  Character,
  Grass,
  House,
  Stone,
  Tree,
} from "@/components";
import { Cash } from "@/components/cash";

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
    cash: 200,
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
    pickaxe: 1,

    stamina: 100,
    isResting: false,
    isChoping: false,
    isMining: false,
  });

  const axeHit = character.axe * 2;
  const pickaxeHit = character.pickaxe * 1;
  const workerPickaxeHit = worker0.pickaxe * 1;

  const axePrice = Math.floor(character.axe * 0.5 * 100) + 100;
  const pickaxePrice = Math.floor(character.pickaxe * 0.6 * 100) + 100;
  const workerPickaxePrice = Math.floor(worker0.pickaxe * 0.8 * 150) + 150;

  const [menus, setMenus] = useState({
    showWorkers: false,
    showInventory: false,
    showOrders: false,
    showStore: false,
  });

  function toggleInventory() {
    setMenus((cur) => {
      return {
        showInventory: !cur.showInventory,
        showWorkers: false,
        showOrders: false,
        showStore: false,
      };
    });
  }

  function toggleOrders() {
    setMenus((cur) => {
      return {
        showOrders: !cur.showOrders,
        showWorkers: false,
        showInventory: false,
        showStore: false,
      };
    });
  }

  function toggleStore() {
    setMenus((cur) => {
      return {
        showStore: !cur.showStore,
        showWorkers: false,
        showOrders: false,
        showInventory: false,
      };
    });
  }

  function toggleWorkers() {
    setMenus((cur) => {
      return {
        showStore: false,
        showWorkers: !cur.showWorkers,
        showOrders: false,
        showInventory: false,
      };
    });
  }

  /// ACTIONS ====================================
  function characterResting(
    character: any,
    setCharacter: (character: any) => any
  ) {
    if (character.isResting) {
      if (character.stamina < 100) {
        setCharacter((cur: any) => {
          return { ...cur, stamina: cur.stamina + 5 };
        });
      }
    }
  }

  function characterChoping(
    character: any,
    setCharacter: (character: any) => any
  ) {
    if (character.isChoping) {
      if (character.stamina >= 10) {
        setCharacter((cur: any) => {
          return {
            ...cur,
            stamina: cur.stamina - 10,
            wood: cur.wood + axeHit,
          };
        });
      }
    }
  }

  function characterMining(
    character: any,
    setCharacterAny: (character: any) => any
  ) {
    const damage = character.name === "Summer" ? workerPickaxeHit : pickaxeHit;

    if (character.isMining) {
      if (character.stamina >= 10) {
        setCharacterAny((cur: any) => {
          return {
            ...cur,
            stamina: cur.stamina - 10,
            stone: cur.stone + damage,
          };
        });

        if (character.name === "Summer") {
          setCharacter((cur) => {
            return {
              ...cur,
              stone: cur.stone + damage,
            };
          });
        }
      }
    }
  }

  const [ticking, setTicking] = useState(true),
    [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 1e3);

    superDuperWorkerAi(worker0);

    characterResting(character, setCharacter);
    characterResting(worker0, setWorker0);

    characterChoping(character, setCharacter);
    characterChoping(worker0, setWorker0);

    characterMining(character, setCharacter);
    characterMining(worker0, setWorker0);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, ticking]);

  function superDuperWorkerAi(worker: any) {
    if (worker.stamina < 50 && !worker.isResting) {
      getStaminaWorker();
    }

    if (worker.stamina === 100 && !worker.isMining) {
      getStoneWoker();
    }
  }

  function stopWorker() {
    const { isChoping, isMining, isResting } = worker0;
    const isWorking = isChoping || isMining || isResting;

    if (isWorking) {
      setWorker0((cur) => {
        return {
          ...cur,
          isResting: false,
          isChoping: false,
          isMining: false,
        };
      });
    } else {
      getStoneWoker();
    }
  }

  function getStaminaWorker() {
    setWorker0((cur) => {
      return {
        ...cur,
        isResting: !cur.isResting,
        isChoping: false,
        isMining: false,
      };
    });
  }

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

  function getWoodWorker() {
    setWorker0((cur) => {
      return {
        ...cur,
        isChoping: !cur.isChoping,
        isMining: false,
        isResting: false,
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

  function getStoneWoker() {
    setWorker0((cur) => {
      return {
        ...cur,
        isMining: !cur.isMining,
        isChoping: false,
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

  function sellWood({ quantity, price }: { quantity: number; price: number }) {
    if (character.wood >= quantity) {
      setCharacter((cur) => {
        return {
          ...cur,
          wood: cur.wood - quantity,
          cash: cur.cash + price,
        };
      });
    } else {
      alert("you have no enoght wood");
    }
  }

  function sellStone({ quantity, price }: { quantity: number; price: number }) {
    if (character.stone >= quantity) {
      setCharacter((cur) => {
        return {
          ...cur,
          stone: cur.stone - quantity,
          cash: cur.cash + price,
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

  function upgradeToolWorker() {
    setCharacter((cur) => {
      return {
        ...cur,
        cash: cur.cash - workerPickaxePrice,
      };
    });
    setWorker0((cur) => {
      return {
        ...cur,
        pickaxe: cur.pickaxe + 1,
      };
    });
  }

  const sellLogLevels = [
    { quantity: 50, price: 50 },
    { quantity: 100, price: 110 },
    { quantity: 150, price: 180 },
    { quantity: 200, price: 280 },
  ];
  const sellStoneLevels = [
    { quantity: 50, price: 100 },
    { quantity: 100, price: 220 },
    { quantity: 150, price: 360 },
    { quantity: 200, price: 560 },
  ];

  const inventoryWorker = (() => {
    const { isChoping, isMining, isResting } = worker0;
    const isWorking = isChoping || isMining || isResting;

    return (
      <div className={styles.floatMenu}>
        <h2>workers</h2>

        <div className={styles.resourceCounter}>
          <Character skin={"worker0"} />
          <span className={styles.text}>{worker0.name}</span>
        </div>

        <hr />

        <span className={styles.text}>stamina: {worker0.stamina}</span>
        <span className={styles.text}>
          isChoping: {worker0.isChoping ? "✔️" : "❌"}
        </span>
        <span className={styles.text}>
          isMining: {worker0.isMining ? "✔️" : "❌"}
        </span>
        <span className={styles.text}>
          isResting: {worker0.isResting ? "✔️" : "❌"}
        </span>

        <hr />

        <div className={styles.resourceCounter}>
          <div className={styles.toolWrapper}>
            <img
              className={styles.image}
              src="https://art.pixilart.com/2c9335fed5ab4c7.png"
              alt="pickaxe"
            />
            <span> Lvl: {worker0.pickaxe}</span>
          </div>

          <span className={workerPickaxeHit > 0 ? styles.textGreen : ""}>
            + {workerPickaxeHit}
          </span>
        </div>

        <hr />

        <Button
          onClick={() => stopWorker()}
          variant={isWorking ? "success" : undefined}
        >
          working
        </Button>
      </div>
    );
  })();

  const inventory = (
    <div className={styles.floatMenu}>
      <h2>inventory</h2>

      <div className={styles.resourceCounter}>
        <Character skin={"main"} />
        <span className={styles.text}>Damian</span>
      </div>

      <div className={styles.resourceCounter}>
        <Cash />
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

      <div className={styles.iconsOrderWrapper}>
        <Cash />
        <span>{character.cash}</span>
      </div>

      <hr />

      <div className={styles.resourceCounter}>
        <div className={styles.toolWrapper}>
          <Image
            className={styles.sprite}
            src="/resources/log.png"
            width={32}
            height={32}
            alt="wood:"
          />
          <span className={styles.text}>{character.wood}</span>
        </div>
      </div>

      <div className={styles.resourceCounter}>
        <div className={styles.toolWrapper}>
          <img
            className={styles.image}
            src="https://i.redd.it/w1ctilzr8df71.png"
            alt="stone:"
          />
          <span className={styles.text}>{character.stone}</span>
        </div>
      </div>

      <hr />

      <div className={styles.storeButtons}>
        <div className={styles.orderWrapper}>
          {sellLogLevels.map((sellLevel) => {
            const orderDisabled = character.wood < sellLevel.quantity;

            return (
              <div
                key={sellLevel.price}
                className={
                  orderDisabled ? styles.orderCardDisabled : styles.orderCard
                }
              >
                <div className={styles.iconsOrderWrapper}>
                  <Image
                    className={styles.sprite}
                    src="/resources/log.png"
                    width={32}
                    height={32}
                    alt="wood"
                  />
                  <span>{sellLevel.quantity}</span>
                </div>

                <Button
                  onClick={() => sellWood(sellLevel)}
                  disabled={orderDisabled}
                >
                  <div className={styles.iconsOrderWrapper}>
                    <span>+</span>
                    <Cash />
                    <span>{sellLevel.price}</span>
                  </div>
                </Button>
              </div>
            );
          })}
        </div>

        <div className={styles.orderWrapper}>
          {sellStoneLevels.map((sellLevel) => {
            const orderDisabled = character.stone < sellLevel.quantity;

            return (
              <div
                key={sellLevel.price}
                className={
                  orderDisabled ? styles.orderCardDisabled : styles.orderCard
                }
              >
                <div className={styles.iconsOrderWrapper}>
                  <img
                    className={styles.image}
                    src="https://i.redd.it/w1ctilzr8df71.png"
                    alt="stone"
                  />
                  <span>{sellLevel.quantity}</span>
                </div>

                <Button
                  onClick={() => sellStone(sellLevel)}
                  disabled={orderDisabled}
                >
                  <div className={styles.iconsOrderWrapper}>
                    <span>+</span>
                    <Cash />
                    <span>{sellLevel.price}</span>
                  </div>
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

      <div className={styles.iconsOrderWrapper}>
        <Cash />
        <span>{character.cash}</span>
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

      <div
        className={
          character.cash < axePrice
            ? styles.orderCardDisabled2
            : styles.orderCard2
        }
      >
        <div className={styles.iconsOrderWrapper}>
          <img
            className={styles.image}
            src="https://art.pixilart.com/374fd2a7a4eafb0.png"
            alt="axe"
          />
          <span>+1 lvl</span>
        </div>

        <Button
          onClick={() => upgradeTool(Tools.Axe)}
          disabled={character.cash < axePrice}
        >
          <div className={styles.iconsOrderWrapper}>
            <span>-</span>
            <Cash />
            <span>{axePrice}</span>
          </div>
        </Button>
      </div>

      <div
        className={
          character.cash < pickaxePrice
            ? styles.orderCardDisabled2
            : styles.orderCard2
        }
      >
        <div className={styles.iconsOrderWrapper}>
          <img
            className={styles.image}
            src="https://art.pixilart.com/2c9335fed5ab4c7.png"
            alt="pickaxe"
          />
          <span>+1 lvl</span>
        </div>

        <Button
          onClick={() => upgradeTool(Tools.Pickaxe)}
          disabled={character.cash < pickaxePrice}
        >
          <div className={styles.iconsOrderWrapper}>
            <span>-</span>
            <Cash />
            <span>{pickaxePrice}</span>
          </div>
        </Button>
      </div>

      <div
        className={
          character.cash < workerPickaxePrice
            ? styles.orderCardDisabled2
            : styles.orderCard2
        }
      >
        <div className={styles.iconsOrderWrapper}>
          <img
            className={styles.image}
            src="https://art.pixilart.com/2c9335fed5ab4c7.png"
            alt="pickaxe"
          />
          <span>+1 lvl (worker)</span>
        </div>

        <Button
          onClick={() => upgradeToolWorker()}
          disabled={character.cash < workerPickaxePrice}
        >
          <div className={styles.iconsOrderWrapper}>
            <span>-</span>
            <Cash />
            <span>{workerPickaxePrice}</span>
          </div>
        </Button>
      </div>
    </div>
  );

  const renderGrass = (
    <>
      <div className={styles.moreGrassInScenary0}>
        <div className={styles.grassInScenary0}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary1}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary2}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary3}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary4}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary5}>
          <Grass variant={0} />
        </div>
      </div>
      <div className={styles.moreGrassInScenary1}>
        <div className={styles.grassInScenary0}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary1}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary2}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary3}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary4}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary5}>
          <Grass variant={0} />
        </div>
      </div>
      <div className={styles.moreGrassInScenary2}>
        <div className={styles.grassInScenary0}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary1}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary2}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary3}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary4}>
          <Grass variant={0} />
        </div>
        <div className={styles.grassInScenary5}>
          <Grass variant={0} />
        </div>
      </div>
    </>
  );

  return (
    <main className={styles.main}>
      {menus.showWorkers && inventoryWorker}

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
        {renderGrass}

        <div className={styles.treeInScenary}>
          <Tree level={0} />
        </div>

        <div className={styles.stoneInScenary}>
          <Stone level={0} />
        </div>

        <div className={styles.badInScenary}>
          <Bad level={0} />
        </div>

        <div className={styles.bad2InScenary}>
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
            worker0.isResting
              ? styles.workerInScenaryResting
              : worker0.isChoping
              ? styles.workerInScenaryChoping
              : worker0.isMining
              ? styles.workerInScenaryMining
              : styles.workerInScenary
          }
        >
          <Character
            skin={"worker0"}
            toTheRight={worker0.isChoping}
            isChopping={worker0.isChoping}
            isMining={worker0.isMining}
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
          onClick={toggleWorkers}
          variant={menus.showWorkers ? "success" : undefined}
        >
          workers
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
