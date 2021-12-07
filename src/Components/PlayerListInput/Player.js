export const defaultPitcher = {
  serialNum: "",
  name: "",
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
};

// 投球局數
// parseInt(o / 3) + (o % 3) / 10;
// 總投球數
// strike + ball;

export const defaultBatter = {
  serialNum: "",
  name: "",
  orderNumber: "",
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
};

// 總安打數
// single + double + triple + homerun;
// 打數
// h() + so + go + ao - sf - sh;
// 打席
// ab() + bb + sf + sh;
