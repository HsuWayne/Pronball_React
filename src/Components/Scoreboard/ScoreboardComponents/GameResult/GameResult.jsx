import React from "react";
import { useSelector } from "react-redux";
import {
  doc,
  setDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import GameResultDisplay from "./GameResultDisplay";
import playersFromDB from "../../../../firebase";

function GameResult(props) {
  const { showGameResult, setShowGameResult } = props;
  const gameData = useSelector((state) => state.gameData);
  const allPitchers = [...gameData.homePitchers, ...gameData.awayPitchers];
  const allBatters = [...gameData.homeBatters, ...gameData.awayBatters];

  const updatePlayerData = (playerListFromDB) => {
    //處理投手數據
    const alreadyExistPitcher = [];
    const noRegisterPitcher = [];
    for (let pitcher of allPitchers) {
      playerListFromDB.find((player) => player.name === pitcher.name)
        ? alreadyExistPitcher.push(pitcher)
        : noRegisterPitcher.push(pitcher);
    }
    alreadyExistPitcher.forEach((pitcher) => {
      playerListFromDB.forEach((player, index, arr) => {
        if (player.name === pitcher.name) {
          arr[index] = {
            ...player,
            pitcher: {
              strike: player.pitcher.strike + pitcher.strike,
              ball: player.pitcher.ball + pitcher.ball,
              er: player.pitcher.er + pitcher.er,
              ira: player.pitcher.ira + pitcher.ira,
              k: player.pitcher.k + pitcher.k,
              o: player.pitcher.o + pitcher.o,
              goPit: player.pitcher.goPit + pitcher.goPit,
              aoPit: player.pitcher.aoPit + pitcher.aoPit,
              bbPit: player.pitcher.bbPit + pitcher.bbPit,
              dpPit: player.pitcher.dpPit + pitcher.dpPit,
              h: player.pitcher.h + pitcher.h,
              hr: player.pitcher.hr + pitcher.hr,
              gamePlayed: player.pitcher.gamePlayed + 1,
            },
          };
        } else {
          arr[index] = player;
        }
      });
    });
    //處理及註冊未在資料庫球員
    noRegisterPitcher.forEach((pitcher, index, arr) => {
      arr[index] = {
        ...pitcher,
        name: pitcher.name + "(Pitcher" + index + ")",
      };
    });
    for (let player of noRegisterPitcher) {
      registerPitcher(player);
    }
    //處理打者數據
    const alreadyExistBatter = [];
    const noRegisterBatter = [];
    for (let batter of allBatters) {
      playerListFromDB.find((player) => player.name === batter.name)
        ? alreadyExistBatter.push(batter)
        : noRegisterBatter.push(batter);
    }
    alreadyExistBatter.forEach((batter) => {
      playerListFromDB.forEach((player, index, arr) => {
        if (player.name === batter.name) {
          arr[index] = {
            ...player,
            batter: {
              single: player.batter.single + batter.single,
              double: player.batter.double + batter.double,
              triple: player.batter.triple + batter.triple,
              homerun: player.batter.homerun + batter.homerun,
              rbi: player.batter.rbi + batter.rbi,
              runs: player.batter.runs + batter.runs,
              bb: player.batter.bb + batter.bb,
              so: player.batter.so + batter.so,
              go: player.batter.go + batter.go,
              ao: player.batter.ao + batter.ao,
              dp: player.batter.dp + batter.dp,
              sf: player.batter.sf + batter.sf,
              sh: player.batter.sh + batter.sh,
              gamePlayed: player.batter.gamePlayed + 1,
            },
          };
        } else {
          arr[index] = player;
        }
      });
    });
    //處理及註冊未在資料庫球員
    noRegisterBatter.forEach((batter, index, arr) => {
      arr[index] = {
        ...batter,
        name: batter.name + "(Batter" + index + ")",
      };
    });
    for (let player of noRegisterBatter) {
      registerBatter(player);
    }
    //上傳球員數據
    for (let player of playerListFromDB) {
      updatePlayerToFirebase(player);
    }
  };

  async function handleGameResultUpdate() {
    const playerListFromDB = [];
    await getDocs(query(playersFromDB, orderBy("serialNumber")))
      .then((queryPlayer) => {
        queryPlayer.forEach((player) => {
          playerListFromDB.push({
            name: player.id,
            pitcher: player.data().pitcher,
            batter: player.data().batter,
          });
        });
      })
      .then(() => updatePlayerData(playerListFromDB));
  }

  const updatePlayerToFirebase = async (player) => {
    await updateDoc(doc(playersFromDB, player.name), {
      pitcher: {
        strike: player.pitcher.strike,
        ball: player.pitcher.ball,
        er: player.pitcher.er,
        ira: player.pitcher.ira,
        k: player.pitcher.k,
        o: player.pitcher.o,
        goPit: player.pitcher.goPit,
        aoPit: player.pitcher.aoPit,
        bbPit: player.pitcher.bbPit,
        dpPit: player.pitcher.dpPit,
        h: player.pitcher.h,
        hr: player.pitcher.hr,
        gamePlayed: player.pitcher.gamePlayed,
      },
      batter: {
        single: player.batter.single,
        double: player.batter.double,
        triple: player.batter.triple,
        homerun: player.batter.homerun,
        rbi: player.batter.rbi,
        runs: player.batter.runs,
        bb: player.batter.bb,
        so: player.batter.so,
        go: player.batter.go,
        ao: player.batter.ao,
        dp: player.batter.dp,
        sf: player.batter.sf,
        sh: player.batter.sh,
        gamePlayed: player.batter.gamePlayed,
      },
    }).then(() => window.location.reload());
  };

  const registerPitcher = (player) => {
    setDoc(doc(playersFromDB, player.name), {
      serialNumber: player.serialNum,
      pitcher: {
        strike: player.strike,
        ball: player.ball,
        er: player.er,
        ira: player.ira,
        k: player.k,
        o: player.o,
        goPit: player.goPit,
        aoPit: player.aoPit,
        bbPit: player.bbPit,
        dpPit: player.dpPit,
        h: player.h,
        hr: player.hr,
        gamePlayed: 1,
      },
      batter: {
        single: 0,
        double: 0,
        triple: 0,
        homerun: 0,
        rbi: 0,
        runs: 0,
        bb: 0,
        so: 0,
        go: 0,
        ao: 0,
        dp: 0,
        sf: 0,
        sh: 0,
        gamePlayed: 0,
      },
    });
  };

  const registerBatter = (player) => {
    setDoc(doc(playersFromDB, player.name), {
      serialNumber: player.serialNum,
      pitcher: {
        strike: 0,
        ball: 0,
        er: 0,
        ira: 0,
        k: 0,
        o: 0,
        goPit: 0,
        aoPit: 0,
        bbPit: 0,
        dpPit: 0,
        h: 0,
        hr: 0,
        gamePlayed: 0,
      },
      batter: {
        single: player.single,
        double: player.double,
        triple: player.triple,
        homerun: player.homerun,
        rbi: player.rbi,
        runs: player.runs,
        bb: player.bb,
        so: player.so,
        go: player.go,
        ao: player.ao,
        dp: player.dp,
        sf: player.sf,
        sh: player.sh,
        gamePlayed: 1,
      },
    });
  };

  return (
    <GameResultDisplay
      showGameResult={showGameResult}
      setShowGameResult={setShowGameResult}
      handleGameResultUpdate={handleGameResultUpdate}
    />
  );
}

export default GameResult;
