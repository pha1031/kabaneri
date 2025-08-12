let counters = {
  cnt_1: 0, cnt_2: 0, cnt_3: 0,
  cnt_4: 0, cnt_5: 0, cnt_6: 0,
  cnt_7: 0, cnt_8: 0, cnt_9: 0,
  cnt_10: 0, cnt_11: 0, cnt_12: 0,
  cnt_13: 0, cnt_14: 0, cnt_15: 0
};

let accumPoints = {
  muname: 0,
  ikoma: 0,
  mima: 0
};

// それぞれのundo用保存
let prevAccumMuname = null;
let prevAccumIkoma = null;
let prevAccumMima = null;

function calcAccumPoints() {
  accumPoints.muname = counters.cnt_1 + counters.cnt_4 * 15 + counters.cnt_7 * 15 + counters.cnt_10 * 15 + counters.cnt_13 * 30;
  accumPoints.ikoma = counters.cnt_2 + counters.cnt_5 * 15 + counters.cnt_8 * 15 + counters.cnt_11 * 15 + counters.cnt_14 * 30;
  accumPoints.mima = counters.cnt_3 + counters.cnt_6 * 15 + counters.cnt_9 * 15 + counters.cnt_12 * 15 + counters.cnt_15 * 30;
}

function updateAccumDisplay() {
  document.getElementById('point_muname').innerText = accumPoints.muname;
  document.getElementById('point_ikoma').innerText = accumPoints.ikoma;
  document.getElementById('point_mima').innerText = accumPoints.mima;
}

function updateResult() {
  const denom = counters.cnt_1 + counters.cnt_2 + counters.cnt_3 + counters.cnt_4 + counters.cnt_5 + counters.cnt_6;
  const numer = counters.cnt_4 + counters.cnt_5 + counters.cnt_6;

  if (denom === 0) {
    document.getElementById('result').innerText = '発光確率: 計算不可（対象カウンタ合計が0）';
  } else {
    const rate = (numer / denom) * 100;
    document.getElementById('result').innerText = `発光確率: ${rate.toFixed(2)}%`;
  }
}

function addCount(key, step = 1) {
  counters[key] += step;
  if (counters[key] < 0) counters[key] = 0;
  document.getElementById(key).innerText = counters[key];

  calcAccumPoints();
  updateAccumDisplay();

  updateResult();
}

// 無名蓄積ポイントリセット＆戻る
document.getElementById('resetMunameBtn').addEventListener('click', function() {
  prevAccumMuname = accumPoints.muname;
  accumPoints.muname = 0;
  updateAccumDisplay();
  document.getElementById('undoMunameBtn').disabled = false;
});
document.getElementById('undoMunameBtn').addEventListener('click', function() {
  if (prevAccumMuname !== null) {
    accumPoints.muname = prevAccumMuname;
    updateAccumDisplay();
    prevAccumMuname = null;
    this.disabled = true;
  }
});

// 生駒蓄積ポイントリセット＆戻る
document.getElementById('resetIkomaBtn').addEventListener('click', function() {
  prevAccumIkoma = accumPoints.ikoma;
  accumPoints.ikoma = 0;
  updateAccumDisplay();
  document.getElementById('undoIkomaBtn').disabled = false;
});
document.getElementById('undoIkomaBtn').addEventListener('click', function() {
  if (prevAccumIkoma !== null) {
    accumPoints.ikoma = prevAccumIkoma;
    updateAccumDisplay();
    prevAccumIkoma = null;
    this.disabled = true;
  }
});

// 美馬蓄積ポイントリセット＆戻る
document.getElementById('resetMimaBtn').addEventListener('click', function() {
  prevAccumMima = accumPoints.mima;
  accumPoints.mima = 0;
  updateAccumDisplay();
  document.getElementById('undoMimaBtn').disabled = false;
});
document.getElementById('undoMimaBtn').addEventListener('click', function() {
  if (prevAccumMima !== null) {
    accumPoints.mima = prevAccumMima;
    updateAccumDisplay();
    prevAccumMima = null;
    this.disabled = true;
  }
});

// 初期表示
calcAccumPoints();
updateAccumDisplay();
updateResult();
