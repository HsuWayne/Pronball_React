import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  // getDocs,
  // orderBy,
  // query,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh6fWlLO_5BBg6KYIhOpQm-NYYxGThxT8",
  authDomain: "pronball-51cf0.firebaseapp.com",
  projectId: "pronball-51cf0",
  storageBucket: "pronball-51cf0.appspot.com",
  messagingSenderId: "962660474419",
  appId: "1:962660474419:web:9c454bcaf770cabca0cd46",
  measurementId: "G-DRK81DGZ5G",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const players = collection(db, "Players");

export const registerPlayer = async (name, serialNum) => {
  await setDoc(doc(players, name), {
    serialNumber: serialNum,
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
    },
  })
    .then(alert("成功"))
    .catch((e) => alert("送出失敗" + e));
};

// export const getFirebasePlayers = async () => {
//   const firebasePlayersList = [];
//   const queryPlayers = await getDocs(query(players, orderBy("serialNumber")));
//   queryPlayers.forEach((player) => {
//     firebasePlayersList.push({
//       name: player.id,
//       serialNum: player.data().serialNumber,
//       pitcher: player.data().pitcher,
//       batter: player.data().batter,
//     });
//   });
//   console.log(firebasePlayersList.length);
//   return firebasePlayersList;
// };

export const updatePitcherToFirebase = (player) => {
  updateDoc(doc(players, player.name), {
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
    },
  });
};

export const updateBatterToFirebase = (player) => {
  updateDoc(doc(players, player.name), {
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
    },
  });
};
