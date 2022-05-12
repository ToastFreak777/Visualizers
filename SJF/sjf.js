let btns = [];
document.querySelectorAll(".box").forEach((btn, i) => {
  btns[i] = btn;
});

const play = document.querySelector("#start");
const addJob = document.querySelector("#add");
const random = document.querySelector("#random");
const err = document.querySelector(".err");

random.addEventListener("click", () => {
  btns.forEach((btn) => {
    btn.value = Math.floor(Math.random() * 10) + 1;
  });

  random.style = "display:none";
});

addJob.addEventListener("click", () => {
  const ul = document.querySelector(".list");
  const li = document.createElement("li");
  li.classList.add("list-item");
  li.id = `box${btns.length}`;

  const input = document.createElement("input");
  input.classList.add("box");
  input.setAttribute("type", "number");
  input.setAttribute("value", Math.floor(Math.random() * 4) + 2);
  input.setAttribute("min", 1);
  input.setAttribute("max", 10);

  li.appendChild(input);
  ul.appendChild(li);
  btns.push(input);
  console.log(btns);

  btns.forEach((btn) => {
    if (btn.value <= 0) btn.style.display = "none";
  });
});

play.addEventListener("click", async () => {
  if (!inputValid()) {
    err.style.display = "inline";
    setTimeout(() => {
      err.style.display = "none";
    }, 3000);

    return;
  }
  play.style.display = "none";
  addJob.style.display = "inline";

  try {
    while (!jobFinished()) {
      let data = btns.map((btn) => (btn = btn.value));
      let results = data.reduce((curr, next) => {
        let job = curr;
        if (Number(curr) <= 0) {
          job = next;
          return job;
        }
        if (Number(curr) > Number(next) && !Number(next) == 0) job = next;
        return job;
      });

      console.log("Starting job...");
      while (Number(results) > 0) {
        await start(() => sJF(data, results));
        data = btns.map((btn) => (btn = btn.value));
        results = String(Number(results) - 1);
      }
      console.log("Finished");
    }
  } catch (e) {
    console.log(e);
  }
  addJob.style.display = "none";
  play.style.display = "inline";
});

function start(func) {
  // console.log("working");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(func());
    }, 1000);
  });
}

function sJF(data, results) {
  const index = data.indexOf(results);
  activeJob(btns[index], index);
  btns[index].value = Number(results) - 1;
  buttonFinished(btns[index], index);
}

function activeJob(btn, i) {
  const list_item = document.querySelectorAll(".list-item");
  list_item[i].classList.add("box-active");
  btn.classList.add("box-active");
}

function buttonFinished(btn, i) {
  const list_item = document.querySelectorAll(".list-item");
  if (btn.value == 0 && i != undefined) {
    btn.classList.remove("box-active");
    list_item[i].classList.add("box-finished");
    btn.classList.add("box-finished");
    return true;
  } else if (btn.value == 0 && i == undefined) {
    btn.classList.remove("box-active");
    btn.classList.add("box-finished");
    return true;
  }
  return false;
}

function jobFinished() {
  return btns.every((btn) => buttonFinished(btn));
}

function inputValid() {
  return btns.every((btn) => btn.checkValidity());
}
