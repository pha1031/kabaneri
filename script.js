let counters = {
  cnt_1: 0, cnt_2: 0, cnt_3: 0,
  cnt_4: 0, cnt_5: 0, cnt_6: 0,
  cnt_7: 0, cnt_8: 0, cnt_9: 0,
  cnt_10: 0, cnt_11: 0, cnt_12: 0,
  cnt_13: 0, cnt_14: 0, cnt_15: 0
};

let accumPoints = { muname:0, ikoma:0, mima:0 };

// リセット時の蓄積ポイントを保存（差分表示用）
let resetValueMuname = 0;
let resetValueIkoma = 0;
let resetValueMima = 0;

// Undo用の直前リセット値保存
let undoResetValueMuname = null;
let undoResetValueIkoma = null;
let undoResetValueMima = null;

function calcAccumPoints() {
  accumPoints.muname =
    counters.cnt_1 + counters.cnt_4 * 15 + counters.cnt_7 * 15 + counters.cnt_10 * 15 + counters.cnt_13 * 30;

  accumPoints.ikoma =
    counters.cnt_2 + counters.cnt_5 * 15 + counters.cnt_8 * 15 + counters.cnt_11 * 15 + counters.cnt_14 * 30;

  accumPoints.mima =
    counters.cnt_3 + counters.cnt_6 * 15 + counters.cnt_9 * 15 + counters.cnt_12 * 15 + counters.cnt_15 * 30;
}

function updateAccumDisplay() {
  document.getElementById('point_muname').innerText = Math.max(0, accumPoints.muname - resetValueMuname);
  document.getElementById('point_ikoma').innerText = Math.max(0, accumPoints.ikoma - resetValueIkoma);
  document.getElementById('point_mima').innerText = Math.max(0, accumPoints.mima - resetValueMima);
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
  undoResetValueMuname = resetValueMuname;
  resetValueMuname = accumPoints.muname;
  updateAccumDisplay();
  document.getElementById('undoMunameBtn').disabled = false;
});
document.getElementById('undoMunameBtn').addEventListener('click', function() {
  if(undoResetValueMuname !== null) {
    resetValueMuname = undoResetValueMuname;
    undoResetValueMuname = null;
    updateAccumDisplay();
    this.disabled = true;
  }
});

// 生駒蓄積ポイントリセット＆戻る
document.getElementById('resetIkomaBtn').addEventListener('click', function() {
  undoResetValueIkoma = resetValueIkoma;
  resetValueIkoma = accumPoints.ikoma;
  updateAccumDisplay();
  document.getElementById('undoIkomaBtn').disabled = false;
});
document.getElementById('undoIkomaBtn').addEventListener('click', function() {
  if(undoResetValueIkoma !== null) {
    resetValueIkoma = undoResetValueIkoma;
    undoResetValueIkoma = null;
    updateAccumDisplay();
    this.disabled = true;
  }
});

// 美馬蓄積ポイントリセット＆戻る
document.getElementById('resetMimaBtn').addEventListener('click', function() {
  undoResetValueMima = resetValueMima;
  resetValueMima = accumPoints.mima;
  updateAccumDisplay();
  document.getElementById('undoMimaBtn').disabled = false;
});
document.getElementById('undoMimaBtn').addEventListener('click', function() {
  if(undoResetValueMima !== null) {
    resetValueMima = undoResetValueMima;
    undoResetValueMima = null;
    updateAccumDisplay();
    this.disabled = true;
  }
});

// 初期表示
calcAccumPoints();
updateAccumDisplay();
updateResult();
