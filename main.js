const btnStart = document.querySelector('.btnStart');
const btnRedo = document.querySelector('.btnRedo');
const firstIcon = document.querySelector('.firstIcon');
const notice = document.querySelector('.notice');
const msg = document.querySelector('.msg');
const redo = document.querySelector('.fa-redo');
const numBtn = document.querySelector('.numCarrot');
let num = numBtn.value;
numBtn.innerHTML = num;
const gameField = document.querySelector('.gameField');
const x = gameField.offsetHeight;
const y = gameField.offsetWidth;
const carrotBugList = document.querySelector('.carrotBugList');
const play = document.querySelector('.fa-play');

let id = 10;
let bug_id = 100;

function createCarrotAndBug() {
  const carrotBugbox = document.createElement('div');
  carrotBugbox.setAttribute('class', 'carrotBugbox');
  for (let i = 0; i < num; i++) {
    const li = document.createElement('li');
    li.setAttribute('class', 'carrot');
    const li_2 = document.createElement('li');
    li_2.setAttribute('class', 'bug');
    li.innerHTML = `<img class="carrot" src="img/carrot.png" alt="" data-id="${id}" />`;
    li_2.innerHTML = `<img class="bug" src="img/bug.png" alt="" data-id="${bug_id}" />`;
    carrotBugbox.appendChild(li);
    carrotBugbox.appendChild(li_2);
    carrotBugList.appendChild(carrotBugbox);
    createCoord(id);
    createCoord(bug_id);
    id++;
    bug_id++;
  }
}

// 랜덤 숫자 형성
function MakeRandomNum(a, b) {
  a = Math.ceil(a);
  b = Math.floor(b);
  return Math.floor(Math.random() * (b - a)) + a;
}

//좌표 생성 및 삽입
function createCoord(id) {
  const img = document.querySelector(`img[data-id="${id}"]`);
  const new_x = MakeRandomNum(0, x - 100);
  const new_y = MakeRandomNum(0, y - 100);
  img.style.top = new_x + 'px';
  img.style.left = new_y + 'px';
}

// 벌리랑 당근 눌렀을 때 이벤트 처리.
carrotBugList.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (id < 40) {
    carrotAudio.play();
    const toBeDeleted = document.querySelector(`.carrot[data-id="${id}"]`).parentNode;
    toBeDeleted.remove();
    num--;
    numBtn.innerText = num;
  }
  if (id > 99) {
    bugAudio.play();
    bgAudio.pause();
    notice.innerHTML = `
        <button class="btnRedo">
          <i class="fas fa-redo"></i>
        </button>
        <p class="msg">You Lost 👻</p>`;
    notice.classList.toggle('none');
  }
});

const bgAudio = new Audio('sound/bg.mp3');
const bugAudio = new Audio('sound/bug_pull.mp3');
const carrotAudio = new Audio('sound/carrot_pull.mp3');
// Btn control
let pressBtn = true;
function btnControl() {
  calTime();
  if (pressBtn == true) {
    bgAudio.play();
    createCarrotAndBug();
    firstIcon.classList.remove('fa-play');
    firstIcon.classList.add('fa-stop');
    pressBtn = false;
  }
  if (pressBtn == false) {
    btnStart.addEventListener('click', () => {
      bgAudio.pause();
      notice.classList.toggle('none');
      notice.innerHTML = `
        <button class="btnRedo">
          <i class="fas fa-redo"></i>
        </button>
        <p class="msg">Replay ❓</p>`;
      pressBtn = true;
    });
  }
}

function removeAll() {
  const carrotBugbox = document.querySelector('.carrotBugbox');
  carrotBugList.removeChild(carrotBugbox);
  createCarrotAndBug();
}

const timer = document.querySelector('#timer');

function calTime() {
  let time = 10;
  let min = '';
  let sec = '';
  let timeLeft = setInterval(() => {
    min = parseInt(time / 60);
    sec = time % 60;
    timer.innerHTML = `${sec < 10 ? `0${sec}` : sec}`;
    time--;
    if (time < 0 && numBtn != 0) {
      clearInterval(timeLeft);
      notice.classList.toggle('none');
      notice.innerHTML = `
        <button class="btnRedo">
          <i class="fas fa-redo"></i>
        </button>
        <p class="msg">You Lost 😈</p>`;
    }
    if (time > 0 && numBtn.innerText == 0) {
      clearInterval(timeLeft);
      notice.classList.toggle('none');
      notice.innerHTML = `
        <button class="btnRedo">
          <i class="fas fa-redo"></i>
        </button>
        <p class="msg">🎉 You win 🎉</p>`;
      pressBtn = true;
      bgAudio.pause();
      winAudio.play();
    }
  }, 1000);
}

const winAudio = new Audio('sound/game_win.mp3');

function restart() {
  notice.classList.toggle('none');
  firstIcon.classList.remove('fa-stop');
  firstIcon.classList.add('fa-play');
  removeAll();
}

function init() {
  btnStart.addEventListener('click', btnControl);
  notice.addEventListener('click', restart);
}

init();
