const day = 24 * 60 * 60 * 1000;
const nbOfDays = 3;
let startBtn;
let starthh = 24 * nbOfDays;
let startmm = 0;
let startss = 0;
let hh;
let mm;
let ss;
let int;

function init() {
  startBtn = document.getElementById("ctdown");
  hhT = document.getElementById("hh");
  mmT = document.getElementById("mm");
  ssT = document.getElementById("ss");
  hh = localStorage.getItem("hh") ? localStorage.getItem("hh") : starthh;
  ss = localStorage.getItem("ss") ? localStorage.getItem("ss") : startss;
  mm = localStorage.getItem("mm") ? localStorage.getItem("mm") : startmm;
  if (localStorage.getItem("hh")) {
    startCtdw();
  }
  hhT.innerText = sanitaze(hh);
  mmT.innerText = sanitaze(mm);
  ssT.innerText = sanitaze(ss);
  startBtn.addEventListener("click", function () {
    startCtdw();
  });
}

function startCtdw() {
  const d = Date.now();
  const endDate = d + day * nbOfDays;
  first =
    localStorage.getItem("ctdwn-start") &&
    localStorage.getItem("ctdwn-start") == "set"
      ? true
      : false;
  if (!first) {
    int = setInterval(startInterval, 1000);
    localStorage.setItem("ctdwn-start", "reset");
  } else {
    let c = confirm("Coutdown already started.\nDo you want to restart! ");
    if (c) {
      localStorage.setItem("ctdwn-start", "set");
      localStorage.removeItem("hh");
      localStorage.removeItem("mm");
      localStorage.removeItem("ss");
      clearInterval(int);
      hh = starthh;
      ss = startss;
      mm = startmm;
      hhT.innerText = sanitaze(hh);
      mmT.innerText = sanitaze(mm);
      ssT.innerText = sanitaze(ss);
      int = setInterval(startInterval, 1000);
    } else {
    }
  }
}

function startInterval() {
  if (ss == 0) {
    if (mm == 0) {
      hh--;
      mm = 59;
      ss = 59;
    } else {
      mm--;
      ss = 59;
    }
  } else {
    ss--;
  }
  hhT.innerText = sanitaze(hh);
  mmT.innerText = sanitaze(mm);
  ssT.innerText = sanitaze(ss);
  localStorage.setItem("hh", hh);
  localStorage.setItem("mm", mm);
  localStorage.setItem("ss", ss);

  if (mm == 0 && hh == 0 && ss == 0) {
    clearInterval(int);
  }
}

function sanitaze(nb) {
  return nb < 10 ? "0" + nb : nb;
}
