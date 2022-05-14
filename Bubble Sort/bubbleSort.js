// shorthands
const QS = document.querySelector.bind(document);
const CE = document.createElement.bind(document);

// DOM elements
const amount = QS("#amount");
const sortType = QS("#sort-type");
const array = QS("#values");
const form = QS("form");
const container = QS(".container");

// Cards
let cards = {
  values: [],
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkForArray(array.value);
  form.style = "display:none";

  // Create sorting screen
  const div = CE("div");
  div.className = "content";

  const ul = CE("ul");
  ul.className = "content-list";

  fillList(ul);

  QS(".underline").style.display = "block";
  div.appendChild(ul);
  container.appendChild(div);

  cards.items = ul.children;

  const gen = bubbleSort(cards, sortType.options[sortType.selectedIndex].value);

  const btn = CE("button");
  btn.innerHTML = "Next Step";
  btn.addEventListener("click", () => {
    try {
      btn.disabled = true;
      let [a, b] = gen.next().value;
      a = cards.items[a];
      b = cards.items[b];
      setTimeout(function () {
        ul.insertBefore(a, b);
        btn.disabled = false;
      }, 1000);
    } catch (error) {
      if (error instanceof TypeError) {
        alert("done");
        btn.style = "display:none;";
      } else console.log(error);
    }
  });

  div.appendChild(btn);
});

function* bubbleSort(listItems, sortType) {
  let { values: arr, items } = listItems;
  const size = arr.length;

  var i, j, swapped;

  for (i = 0; i < size - 1; i++) {
    swapped = false;
    for (j = 0; j < size - i - 1; j++) {
      if (sortType === "asc") {
        if (arr[j] > arr[j + 1]) {
          items[j].classList.toggle("active-list-item");
          items[j + 1].classList.toggle("active-list-item");
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          yield [j + 1, j];
          items[j].classList.toggle("active-list-item");
          items[j + 1].classList.toggle("active-list-item");
        }
      } else {
        if (arr[j] < arr[j + 1]) {
          items[j].classList.toggle("active-list-item");
          items[j + 1].classList.toggle("active-list-item");
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          yield [j + 1, j];
          items[j].classList.toggle("active-list-item");
          items[j + 1].classList.toggle("active-list-item");
        }
      }
    }
    if (!swapped) break;
  }

  console.log(arr);

  return;
}

const checkForArray = () => {
  if (array.value) {
    const cardValue = array.value.split("/");
    cardValue.forEach((value) => cards.values.push(Number(value)));
  } else {
    for (let i = 0; i < amount.value; i++) {
      cards.values.push(Math.floor(Math.random() * 10) + 1);
    }
  }
};

const fillList = (ul) => {
  for (card of cards.values) {
    const li = CE("li");
    li.className = "list-item";
    li.innerText = card;
    const height = 5 * Number(amount.value) * Number(card);
    li.style.height = `${height}px`;

    // values are hard coded for now
    if (height < 120) {
      li.style.backgroundColor = getComputedStyle(
        document.body
      ).getPropertyValue("--low");
    } else if (height >= 120 && height < 200) {
      li.style.backgroundColor = getComputedStyle(
        document.body
      ).getPropertyValue("--medium");
    } else if (height >= 200 && height < 280) {
      li.style.backgroundColor = getComputedStyle(
        document.body
      ).getPropertyValue("--high");
    } else {
      li.style.backgroundColor = getComputedStyle(
        document.body
      ).getPropertyValue("--extreme");
    }

    ul.appendChild(li);
  }
};
