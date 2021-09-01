const buttons = document.querySelectorAll(".btn");
const heading = document.getElementById("level-title");

let level, move, playing, playingArray;
let restart = false;
const init = function () {
  level = 0;
  move = 0;
  playing = false;

  playingArray = [];
};

const randomColor = function () {
  return ["green", "red", "yellow", "blue"][Math.floor(Math.random() * 4)];
};

const updateLevel = function () {
  // console.log(playingArray);
  level += 1;
  move = 0;
  heading.textContent = `Level ${level}`;

  const random = randomColor();
  active(random, "fadeIn");
  playingArray.push(random);
};

function myPlay(id) {
  var audio = new Audio(`sounds/${id}.mp3`);
  audio.play();
}

const active = function (id, type = "pressed") {
  const button = document.getElementById(id);
  button.classList.add(type);
  setTimeout(() => button.classList.remove(type), 150);
  myPlay(button.id);
};

const gameOver = function () {
  playing = false;
  init();
  restart = true;

  document.querySelector("body").classList.add("game-over");
  myPlay("wrong");
  setTimeout(
    () => document.querySelector("body").classList.remove("game-over"),
    200
  );
  heading.textContent = "Game Over, Press Any Key to Restart";
};

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    active(button.id);

    if (playing) {
      if (button.id === playingArray[move]) {
        move += 1;
        if (move === playingArray.length) setTimeout(() => updateLevel(), 1000);
      } else {
        gameOver();
      }
    }
  });
});

document.addEventListener("keydown", function (e) {
  if (!playing) {
    if (e.key === "a" || e.key === "A" || restart) {
      playing = true;
      updateLevel();
    }
  }
});

init();
