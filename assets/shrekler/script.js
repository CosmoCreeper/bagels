const selectors = [
  "promptbox", "prompt", "prompttext", "prompttitle", "chartitle", "chargold", "herocarousel", "purchasebtn", "purchasetext",
  "tlpimg", "bbwimg", "pimg", "gimg", 'drimg', "pfimg", "pbimg", "dimg", "mm", "ex", "mws", "rp", "ws", "per", "soundimg", "credits", "fullimg", "fullimg2"
];

selectors.forEach((selector) => {
  window[selector] = document.getElementById(selector);
});

let anima, fullscrnum = 0;
let musicbtn = false, intervalsArr = [];
let gold = document.querySelector("#goldcount");
let coin = Number(localStorage.getItem("coin")) || 0;
let music = new Audio("./assets/vid/music.mp3");
let museimg = document.querySelector("#musicimg");
let promptbtn = document.querySelector("#promptbutton");
let promptbtn2 = document.querySelector("#promptbutton2");
let settings = document.querySelector('#settingsbox');
let upgrades = document.querySelector("#upgradesmenu");
let music2 = new Audio("./assets/vid/music2.mp4");
music2.volume = 0.5;
let metawidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
let firstslidevar = 0;

if (localStorage.getItem("mws") && !localStorage.getItem("ws")) ws.style.display = "block";
if (!localStorage.getItem("mm") && localStorage.getItem('7')) mm.style.display = "block";
if (!localStorage.getItem("ex") && localStorage.getItem('6')) ex.style.display = "block";
if (!localStorage.getItem("rp") && localStorage.getItem('4')) rp.style.display = "block";
if (localStorage.getItem("0") && localStorage.getItem("1") && localStorage.getItem("2") && !localStorage.getItem("per")) per.style.display = "block";
if (localStorage.getItem("0")) {
  purchasebtn.classList.add("purchased");
  purchasebtn.classList.remove("purchase");
  purchasetext.textContent = "Purchased";
  tlpimg.style.removeProperty('display');
  Array.from(document.getElementsByClassName(`1img`)).forEach((element) =>
    element.style.removeProperty("display")
  );
  Array.from(document.getElementsByClassName(`question1`)).forEach(
    (element) => (element.textContent = "")
  );
  intervalsArr.push(setInterval(fight, 1000, "tlp"));
}

if (localStorage.getItem("1")) {
  bbwimg.style.removeProperty('display');
  Array.from(document.getElementsByClassName(`2img`)).forEach((element) =>
    element.style.removeProperty("display")
  );
  Array.from(document.getElementsByClassName(`question2`)).forEach(
    (element) => (element.textContent = "")
  );
  intervalsArr.push(setInterval(fight, 1000, "bbw"));
}

if (localStorage.getItem("2")) {
  pimg.style.removeProperty('display');
  Array.from(document.getElementsByClassName(`3img`)).forEach((element) =>
    element.style.removeProperty("display")
  );
  Array.from(document.getElementsByClassName(`question3`)).forEach(
    (element) => (element.textContent = "")
  );
  Array.from(document.getElementsByClassName(`4img`)).forEach((element) =>
    element.style.removeProperty("display")
  );
  Array.from(document.getElementsByClassName(`question4`)).forEach(
    (element) => (element.textContent = "")
  );
  intervalsArr.push(setInterval(fight, 1000, "p"));
}

if (localStorage.getItem("3")) {gimg.style.removeProperty('display'); intervalsArr.push(setInterval(fight, 100, "g"));};
if (localStorage.getItem("4")) {drimg.style.removeProperty('display'); intervalsArr.push(setInterval(fight, 1000, "dr"))};

if (
  localStorage.getItem("3") &&
  localStorage.getItem("4")
) {
  Array.from(document.getElementsByClassName(`5img`)).forEach((element) =>
    element.style.removeProperty("display")
  );
  Array.from(document.getElementsByClassName(`question5`)).forEach(
    (element) => (element.textContent = "")
  );
}

if (localStorage.getItem("5")) {
  pfimg.style.removeProperty('display');
  Array.from(document.getElementsByClassName(`6img`)).forEach((element) =>
    element.style.removeProperty("display")
  );
  Array.from(document.getElementsByClassName(`question6`)).forEach(
    (element) => (element.textContent = "")
  );
  intervalsArr.push(setInterval(fight, 5000, "pf"));
}

if (localStorage.getItem("6")) {
  pbimg.style.removeProperty('display');
  Array.from(document.getElementsByClassName(`7img`)).forEach((element) =>
    element.style.removeProperty("display")
  );
  Array.from(document.getElementsByClassName(`question7`)).forEach(
    (element) => (element.textContent = "")
  );
  if (!localStorage.getItem("mws")) {
    mws.style.display = "block";
  }
  intervalsArr.push(setInterval(fight, 10, "pb"));
}

if (localStorage.getItem("7")) {dimg.style.removeProperty('display'); intervalsArr.push(setInterval(fight, 1, "d"));};

function toggleSettings() {
  settings.style.display === 'none' ? settings.style.display = 'block' : settings.style.display = 'none';
}

function fight(e) {
  let earn = 0;

  const earnMap = {
    "player": 1,
    "g": 1,
    "pb": 1,
    "d": 1,
    "tlp": 3,
    "bbw": 4,
    "p": 5,
    "dr": 10,
    "pf": 100,
  }

  earn = earnMap[e];
  
  if (e !== "player" && localStorage.getItem("mm")) earn *= 2;
  if (e === "player") {
    if (localStorage.getItem("ex")) {

    }
  }
  e === "player" ?
    localStorage.getItem("ex") ?
      earn *= 10 :
      localStorage.getItem("rp") ?
        earn *= 4 :
        localStorage.getItem("per") ?
          earn *= 2 :
          null
    : null;

  localStorage.getItem("ws") ? earn *= 10 : null;

  coin += earn;
  goldChange();
  let click = new Audio('./assets/vid/click.mp3');
  localStorage.getItem('sound') !== false && e === 'player' ? click.play() : null;
}

function confirmClearData() {
  prompttext.textContent = 'This action will delete all of your data including gold and music settings. Enter "Restart" below to confirm.';
  prompttitle.textContent = "Are you sure?";
  promptbtn.textContent = "Confirm";
  promptbtn2.style.display = "none";
  promptbox.style.display === "none" ? promptbox.style.display = "block" : promptbox.style.display = "none";
}

function toggleMusic() {
  if (!musicbtn) {
    musicbtn = true;
    museimg.src = "./assets/img/music.png";
    music.loop = true;
    music.play();
  } else {
    musicbtn = false;
    museimg.src = "./assets/img/nomusic.png";
    music.pause();
  }
}

function toggleSound() {
  if (localStorage.getItem('sound') !== false) {
    soundimg.src = "./assets/img/SoundOff.png";
    localStorage.setItem('sound', false);
  } else if (!localStorage.getItem('sound')) {
    soundimg.src = "./assets/img/SoundOn.png";
    localStorage.setItem('sound', true);
  }
}

function toggleFullscreen() {
  if (
    (document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)
  ) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
    fullimg.src = "./assets/img/nofullscr.png";
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    fullimg.src = "./assets/img/fullscr.png";
  }
}

function checkButton(e) {
  if (e.key === "F11") {
    e.preventDefault();
    alert("You are not allowed to fullscreen without pressing the button.");
  }
}

function toggleHeroes() {
  if (herocarousel.style.display === "none") {
    herocarousel.style.display = "block";
    if (musicbtn) {
      music.pause();
      music2.play();
    }
  } else {
    herocarousel.style.display = "none";
    purchasebtn.classList.remove("cantpurchase");
    if (musicbtn) {
      music2.pause();
      music.play();
    }
    if (purchasetext.textContent === "Not Enough Coin") {
      purchasetext.textContent = "Purchase";
      purchasebtn.classList.add("purchase");
    }
  }
}

function toggleUpgrades() {
  if (upgrades.style.display === "none") {
    upgrades.style.display = "block";
    if (musicbtn) {
      music.pause();
      music2.play();
    }
  } else {
    upgrades.style.display = "none";
    purchasebtn.classList.remove("cantpurchase");
    if (musicbtn) {
      music2.pause();
      music.play();
    }
  }
}

let swiper = 0;

if (metawidth <= 950) {
  //  Initialize Swiper
  swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    centeredSlides: true,
    loop: true,
    fade: true,
    mousewheel: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      500: {
        slidesPerView: 3,
      },
    },
  });
} else {
  //  Initialize Swiper
  swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 50,
    centeredSlides: true,
    loop: true,
    fade: true,
    mousewheel: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      250: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 3,
      },
      750: {
        slidesPerView: 4,
      },
      1000: {
        slidesPerView: 5,
      },
    },
  });
}

swiper.realIndex = 0;

swiper.on("slideChange", function () {
  if (!localStorage.getItem(`${this.realIndex}`)) {
    purchasetext.textContent = "Purchase";
    purchasebtn.classList.remove("purchased");
    purchasebtn.classList.remove("cantpurchase");
    purchasebtn.classList.add("purchase");
  } else {
    purchasetext.textContent = "Purchased";
    purchasebtn.classList.remove("cantpurchase");
    purchasebtn.classList.remove("purchase");
    purchasebtn.classList.add("purchased");
  }
  if (this.realIndex === 0) {
    chartitle.textContent = "Three Little Pigs";
    chargold.textContent = "50";
  } else if (this.realIndex === 1) {
    chartitle.textContent = "???";
    chargold.textContent = "???";
    if (localStorage.getItem("0")) {
      chartitle.textContent = "Big Bad Wolf";
      chargold.textContent = "250";
    } else {
      purchasebtn.classList.add("purchased");
      purchasebtn.classList.remove("purchase");
      purchasetext.textContent = "Not Available";
    }
  } else if (this.realIndex === 2) {
    chartitle.textContent = "???";
    chargold.textContent = "???";
    if (localStorage.getItem("1")) {
      chartitle.textContent = "Pinocchio";
      chargold.textContent = "2,500";
    } else {
      purchasebtn.classList.add("purchased");
      purchasebtn.classList.remove("purchase");
      purchasetext.textContent = "Not Available";
    }
  } else if (this.realIndex === 3) {
    chartitle.textContent = "???";
    chargold.textContent = "???";
    if (localStorage.getItem("2")) {
      chartitle.textContent = "Gingy";
      chargold.textContent = "10,000";
    } else {
      purchasebtn.classList.add("purchased");
      purchasebtn.classList.remove("purchase");
      purchasetext.textContent = "Not Available";
    }
  } else if (this.realIndex === 4) {
    chartitle.textContent = "???";
    chargold.textContent = "???";
    if (localStorage.getItem("2")) {
      chartitle.textContent = "Dragon";
      chargold.textContent = "100,000";
    } else {
      purchasebtn.classList.add("purchased");
      purchasebtn.classList.remove("purchase");
      purchasetext.textContent = "Not Available";
    }
  } else if (this.realIndex === 5) {
    chartitle.textContent = "???";
    chargold.textContent = "???";
    if (firstslidevar === 0) {
      firstslidevar = 1;
    }
    if (
      localStorage.getItem("3") &&
      localStorage.getItem("4")
    ) {
      chartitle.textContent = "Princess Fiona";
      chargold.textContent = "500,000";
    } else {
      purchasebtn.classList.add("purchased");
      purchasebtn.classList.remove("purchase");
      purchasetext.textContent = "Not Available";
    }
  } else if (this.realIndex === 6) {
    chartitle.textContent = "???";
    chargold.textContent = "???";
    if (localStorage.getItem("5")) {
      chartitle.textContent = "Puss In Boots";
      chargold.textContent = "1M";
    } else {
      purchasebtn.classList.add("purchased");
      purchasebtn.classList.remove("purchase");
      purchasetext.textContent = "Not Available";
    }
  } else if (this.realIndex === 7) {
    chartitle.textContent = "???";
    chargold.textContent = "???";
    if (localStorage.getItem("6")) {
      chartitle.textContent = "Donkey";
      chargold.textContent = "10M";
    } else {
      purchasebtn.classList.add("purchased");
      purchasebtn.classList.remove("purchase");
      purchasetext.textContent = "Not Available";
    }
  }
});

function purchaseChar() {
  let coinMap = {
    0: 50,
    1: 250,
    2: 2500,
    3: 10000,
    4: 100000,
    5: 500000,
    6: 1000000,
    7: 10000000,
  };

  let nameMap = {
    0: "tlp",
    1: "bbw",
    2: "p",
    3: "g",
    4: "dr",
    5: "pf",
    6: "pb",
    7: "d",
  };

  let timeMap = {
    0: 1000,
    1: 1000,
    2: 1000,
    3: 100,
    4: 1000,
    5: 5000,
    6: 10,
    7: 1,
  };

  let goalCoin = coinMap[swiper.realIndex];
  let reachGoal = coin >= goalCoin;
  let nameAbb = nameMap[swiper.realIndex];
  let interval = timeMap[swiper.realIndex];

  if (!localStorage.getItem(`${swiper.realIndex}`)) {
    if (reachGoal === true) {
      coin -= goalCoin;
      localStorage.setItem(`${swiper.realIndex}`, true);
      intervalsArr.push(setInterval(fight, interval, `${nameAbb}`));
      window[nameAbb + 'img'].style.removeProperty("display");
    } else {
      purchasetext.textContent = "Not Enough Shrekles";
      purchasebtn.classList.add("cantpurchase");
      purchasebtn.classList.remove("purchase");
      setTimeout(function () {
        purchasebtn.classList.remove("cantpurchase");
        purchasebtn.classList.add("purchase");
        purchasetext.textContent = "Purchase";
      }, 2000);
      return;
    }

    if (localStorage.getItem("0")) {
      Array.from(document.getElementsByClassName(`1img`)).forEach((element) =>
        element.style.removeProperty("display")
      );
      Array.from(document.getElementsByClassName(`question1`)).forEach(
        (element) => (element.textContent = "")
      );
    }
    if (localStorage.getItem("1")) {
      Array.from(document.getElementsByClassName(`2img`)).forEach((element) =>
        element.style.removeProperty("display")
      );
      Array.from(document.getElementsByClassName(`question2`)).forEach(
        (element) => (element.textContent = "")
      );
    }
    if (localStorage.getItem("2")) {
      Array.from(document.getElementsByClassName(`3img`)).forEach((element) =>
        element.style.removeProperty("display")
      );
      Array.from(document.getElementsByClassName(`question3`)).forEach(
        (element) => (element.textContent = "")
      );
      Array.from(document.getElementsByClassName(`4img`)).forEach((element) =>
        element.style.removeProperty("display")
      );
      Array.from(document.getElementsByClassName(`question4`)).forEach(
        (element) => (element.textContent = "")
      );
    }
    if (
      localStorage.getItem("3") &&
      localStorage.getItem("4")
    ) {
      Array.from(document.getElementsByClassName(`5img`)).forEach((element) =>
        element.style.removeProperty("display")
      );
      Array.from(document.getElementsByClassName(`question5`)).forEach(
        (element) => (element.textContent = "")
      );
    }
    if (localStorage.getItem("5")) {
      Array.from(document.getElementsByClassName(`6img`)).forEach((element) =>
        element.style.removeProperty("display")
      );
      Array.from(document.getElementsByClassName(`question6`)).forEach(
        (element) => (element.textContent = "")
      );
    }
    if (localStorage.getItem("6")) {
      Array.from(document.getElementsByClassName(`7img`)).forEach((element) =>
        element.style.removeProperty("display")
      );
      Array.from(document.getElementsByClassName(`question7`)).forEach(
        (element) => (element.textContent = "")
      );
      if (!localStorage.getItem("mws")) {
        mws.style.display = "block";
      }
      if (!localStorage.getItem("e")) {
        ex.style.display = "block";
      }
    }
    if (localStorage.getItem("0") && localStorage.getItem("1") && localStorage.getItem("2") && !localStorage.getItem("per")) {
      per.style.display = "block";
    }
    if (localStorage.getItem("7") && !localStorage.getItem("mm")) {
      mm.style.display = "block";
    }
    let purchase = new Audio("./assets/vid/purchase.mp3");
    if (localStorage.getItem('sound') !== false) {
      purchase.play();
    }
    goldChange();
    purchasebtn.classList.remove("cantpurchase");
    purchasebtn.classList.remove("purchase");
    purchasebtn.classList.add("purchased");
    purchasetext.textContent = "Purchased";
    let heromuse = new Audio(`./assets/Sounds/Heroes/${chartitle.textContent}.mp3`);
    if (chartitle.textContent === "Princess Fiona") {
      heromuse.volume = 0.5;
    }
    heromuse.play();
  }
}

function clearData() {
  if (prompt.value.toLowerCase() === "restart") {
    coin = 0;
    goldChange();
    localStorage.clear();
    for (let i = 1; i <= 7; i++) {
      Array.from(document.getElementsByClassName(`${i}img`)).forEach(
        (element) => (element.style.display = "none")
      );
      Array.from(document.getElementsByClassName(`question${i}`)).forEach(
        (element) => (element.textContent = "?")
      );
    }
    for (let id of intervalsArr) {
      clearInterval(id);
    }
    intervalsArr = [];
    ws.style.display = "none";
    mws.style.display = "none";
    mm.style.display = "none";
    ex.style.display = "none";
    per.style.display = "none";
    rp.style.display = "none";
    purchasebtn.classList.remove("purchased");
    purchasebtn.classList.add("purchase");
    purchasetext.textContent = "Purchase";
    if (chartitle.textContent !== "Three Little Pigs") {
      chartitle.textContent = "???";
      chargold.textContent = "???";
      purchasetext.textContent = "Not Available";
    }
    prompttext.textContent = "Your data has been cleared successfully.";
    prompttitle.textContent = "Cleared.";
    promptbtn.textContent = "Clear Again";
  } else {
    prompttext.textContent =
      'You have not entered "Restart". Your request has been cancelled.';
    prompttitle.textContent = "Cancelled.";
    promptbtn.textContent = "Retry";
  }
  promptbtn2.style.display = "inline";
  prompt.value = "";
}

function purchaseUpgrades(e) {
  let coinMap = {
    "mm": 250000,
    "ex": 50000,
    "mws": 0,
    "ws": 100000000,
    "per": 10000,
    "rp": 25000,
  };

  let goalCoin = coinMap[`${e}`];
  let reachGoal = coin >= goalCoin;

  if (!localStorage.getItem(`${e}`)) {
    if (reachGoal === true) {
      coin -= goalCoin;
      localStorage.setItem(`${e}`, true);
      window[e].style.display = "none";
      if (e === "mws") {
        ws.style.display = "block";
      }
      if (e === "ws") {
        credits.style.display = "block";
        autoScroll();
        setTimeout(function () {
          playEndCredits()
        }, 20000);
      }
    } else {
      window[e].classList.add("cantpurchase");
      setTimeout(() => {window[e].classList.remove("cantpurchase");}, 2000);
    }
  }
}

function goldChange() {
  localStorage.setItem("coin", coin);
  gold.textContent = coin;
}

function idle() {
  let prevtime = localStorage.getItem("prevtime");
  if (prevtime) {
    prevtime = new Date(prevtime);
    let newtime = new Date();
    let difference = Math.abs(newtime.getTime() - prevtime.getTime());
    let seconds = difference / 1000;
    let deciseconds = difference / 100;
    let centiseconds = difference / 10;
    let earnings = 0;
    newtime.setDate(newtime.getDate() + 1);

    localStorage.getItem("0") ? earnings += (seconds * 3) : null;
    localStorage.getItem("1") ? earnings += (seconds * 4) : null;
    localStorage.getItem("2") ? earnings += (seconds * 5) : null;
    localStorage.getItem("3") ? earnings += (deciseconds * 1) : null;
    localStorage.getItem("4") ? earnings += (seconds * 10) : null;
    localStorage.getItem("5") ? earnings += ((difference / 5000) * 100) : null;
    localStorage.getItem("6") ? earnings += (centiseconds * 1) : null;
    localStorage.getItem("7") ? earnings += (difference * 1) : null;
    localStorage.getItem("mm") ? earnings *= 2 : null;

    earnings = Math.round(earnings);
    coin += earnings;
    goldChange();
  }
}

function newTime() {
  let date = new Date();
  localStorage.setItem("prevtime", date);
}
idle();
setInterval(newTime, 1000);

function autoScroll() {
  window.scrollBy(0, 1);
  setTimeout(function () {
    return;
  }, 20000);
  setTimeout(autoScroll, 0);
}

function playEndCredits() {
  let creditmuse = new Audio('./assets/Sounds/Heroes/End Credits.mp3');
  creditmuse.play();
  setTimeout(function () {
    credits.style.display = 'none';
  }, 3000)
}

function updateAnima() {
  anima === 1 ? anima-- : anima++;

  localStorage.getItem("0") ? tlpimg.src = `./assets/img/figures/tlp${anima}.png` : null;
  localStorage.getItem("1") ? bbwimg.src = `./assets/img/figures/bbw${anima}.png` : null;
  localStorage.getItem("2") ? pimg.src = `./assets/img/figures/p${anima}.png` : null;
  localStorage.getItem("3") ? gimg.src = `./assets/img/figures/g${anima}.png` : null;
  localStorage.getItem("4") ? drimg.src = `./assets/img/figures/dr${anima}.png` : null;
  localStorage.getItem("5") ? pfimg.src = `./assets/img/figures/pf${anima}.png` : null;
  localStorage.getItem("6") ? pbimg.src = `./assets/img/figures/pb${anima}.png` : null;
  localStorage.getItem("7") ? dimg.src = `./assets/img/figures/d${anima}.png` : null;
}

setInterval(updateAnima, 500)