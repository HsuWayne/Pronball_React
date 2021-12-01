class Pitcher {
  constructor() {
    this.strike = 0;
    this.ball = 0;
    this.er = 0;
    this.ira = 0;
    this.k = 0;
    this.o = 0;
    this.goPit = 0;
    this.aoPit = 0;
    this.bbPit = 0;
    this.dpPit = 0;
    this.h = 0;
    this.hr = 0;
  }
  //投球局數
  ip() {
    return parseInt(this.o / 3) + (this.o % 3) / 10;
  }
  //總投球數
  pitchNum() {
    return this.strike + this.ball;
  }
}

class Batter {
  constructor() {
    this.single = 0;
    this.double = 0;
    this.triple = 0;
    this.homerun = 0;
    this.rbi = 0;
    this.runs = 0;
    this.bb = 0;
    this.so = 0;
    this.go = 0;
    this.ao = 0;
    this.dp = 0;
    this.sf = 0;
    this.sh = 0;
  }
  //總安打數
  h() {
    return this.single + this.double + this.triple + this.homerun;
  }
  //打數
  ab() {
    return this.h() + this.so + this.go + this.ao - this.sf - this.sh;
  }
  //打席
  pa() {
    return this.ab() + this.bb + this.sf + this.sh;
  }
}

class Player {
  constructor(serialNum, name) {
    this.serialNum = serialNum;
    this.name = name;
    this.Pitcher = new Pitcher();
    this.Batter = new Batter();
  }
}

export default Player;
