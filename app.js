import { categories, characters, insertCharacters } from "/data.js";

const elements = {
  categories: document.querySelector("#categories"),
  grid: document.querySelector("#character-grid"),
  count: document.querySelector("#result-count"),
  search: document.querySelector("#search"),
  clearSearch: document.querySelector("#clear-search"),
  empty: document.querySelector("#empty-state"),
  favorites: document.querySelector("#favorites"),
  favoriteCount: document.querySelector("#favorite-count"),
  clearFavorites: document.querySelector("#clear-favorites"),
  history: document.querySelector("#history"),
  historyCount: document.querySelector("#history-count"),
  clearHistory: document.querySelector("#clear-history"),
  idInput: document.querySelector("#id-input"),
  idPreview: document.querySelector("#id-preview"),
  idLength: document.querySelector("#id-length"),
  idCodePoints: document.querySelector("#id-codepoints"),
  copyId: document.querySelector("#copy-id"),
  removeCharacter: document.querySelector("#remove-character"),
  clearId: document.querySelector("#clear-id"),
  feedback: document.querySelector("#maker-feedback"),
  insertCharacters: document.querySelector("#insert-characters"),
  toast: document.querySelector("#toast")
};

const storageKeys = {
  favorites: "esports-id-favorites",
  history: "esports-id-history"
};

let activeCategory = "popular";
let favorites = loadList(storageKeys.favorites);
let history = loadList(storageKeys.history);
let toastTimer;
let copiedCharacter = "";

function loadList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showToast(message, isError = false) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.toggle("error", isError);
  elements.toast.classList.add("visible");
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 1800);
}

async function copyText(value, source = "character") {
  if (!value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = value;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    document.body.append(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand("copy");
    temporaryInput.remove();
    if (!copied) {
      showToast("コピーできませんでした。長押ししてコピーしてください。", true);
      return;
    }
  }

  if (source === "character") {
    copiedCharacter = value;
    history = [value, ...history.filter((item) => item !== value)].slice(0, 20);
    saveList(storageKeys.history, history);
    renderHistory();
    renderCharacters();
  }

  showToast(source === "id" ? "作成したIDをコピーしました" : "コピーしました");
}

function normalizedSearchValue() {
  return elements.search.value.trim().toLowerCase();
}

function filteredCharacters() {
  const query = normalizedSearchValue();
  return characters.filter((item) => {
    const categoryMatches = activeCategory === "all" || item.category === activeCategory;
    const searchText = [item.character, item.name, item.codePoint, ...item.keywords].join(" ").toLowerCase();
    return categoryMatches && (!query || searchText.includes(query));
  });
}

function createCharacterButton(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "character-item";
  if (copiedCharacter === item.character) {
    wrapper.classList.add("copied");
  }

  const copyButton = document.createElement("button");
  copyButton.className = "character-copy";
  copyButton.type = "button";
  copyButton.setAttribute("aria-label", `${item.character}をコピー`);
  copyButton.innerHTML = `<span>${item.character}</span><small>${copiedCharacter === item.character ? "コピーしました" : item.codePoint}</small>`;
  copyButton.addEventListener("click", () => copyText(item.character));

  const favoriteButton = document.createElement("button");
  const isFavorite = favorites.includes(item.character);
  favoriteButton.className = `favorite-button${isFavorite ? " active" : ""}`;
  favoriteButton.type = "button";
  favoriteButton.textContent = isFavorite ? "★" : "☆";
  favoriteButton.setAttribute("aria-pressed", String(isFavorite));
  favoriteButton.setAttribute("aria-label", `${item.character}をお気に入り${isFavorite ? "から解除" : "に追加"}`);
  favoriteButton.addEventListener("click", () => toggleFavorite(item.character));

  wrapper.append(copyButton, favoriteButton);
  return wrapper;
}

function renderCharacters() {
  const results = filteredCharacters();
  const fragment = document.createDocumentFragment();
  results.forEach((item) => fragment.append(createCharacterButton(item)));
  elements.grid.replaceChildren(fragment);
  elements.count.textContent = `${results.length}文字`;
  elements.empty.hidden = results.length !== 0;
  elements.grid.hidden = results.length === 0;
}

function renderCategories() {
  const fragment = document.createDocumentFragment();
  categories.forEach((category) => {
    const button = document.createElement("button");
    const selected = category.id === activeCategory;
    button.type = "button";
    button.role = "tab";
    button.textContent = category.label;
    button.className = selected ? "active" : "";
    button.setAttribute("aria-selected", String(selected));
    button.addEventListener("click", () => {
      activeCategory = category.id;
      renderCategories();
      renderCharacters();
    });
    fragment.append(button);
  });
  elements.categories.replaceChildren(fragment);
}

function toggleFavorite(character) {
  const isFavorite = favorites.includes(character);
  favorites = isFavorite
    ? favorites.filter((item) => item !== character)
    : [character, ...favorites];
  saveList(storageKeys.favorites, favorites);
  renderFavorites();
  renderCharacters();
  showToast(isFavorite ? "お気に入りから解除しました" : "お気に入りに追加しました");
}

function renderCompactList(container, values, emptyMessage) {
  if (values.length === 0) {
    const message = document.createElement("p");
    message.textContent = emptyMessage;
    container.replaceChildren(message);
    return;
  }

  const fragment = document.createDocumentFragment();
  values.forEach((character) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = character;
    button.setAttribute("aria-label", `${character}をコピー`);
    button.addEventListener("click", () => copyText(character));
    fragment.append(button);
  });
  container.replaceChildren(fragment);
}

function renderFavorites() {
  renderCompactList(elements.favorites, favorites, "よく使う文字の☆を押すと、ここに保存されます。");
  elements.favoriteCount.textContent = favorites.length;
  elements.clearFavorites.disabled = favorites.length === 0;
}

function renderHistory() {
  renderCompactList(elements.history, history, "コピーした文字が新しい順に表示されます。");
  elements.historyCount.textContent = history.length;
  elements.clearHistory.disabled = history.length === 0;
}

function updateIdMaker(message = "") {
  const value = elements.idInput.value;
  const charactersInId = Array.from(value);
  elements.idPreview.innerHTML = value ? "" : "<span>入力したIDがここに表示されます</span>";
  if (value) {
    elements.idPreview.textContent = value;
  }
  elements.idLength.textContent = `${charactersInId.length}文字`;
  elements.idCodePoints.textContent = charactersInId.length
    ? charactersInId.map((character) => `U+${character.codePointAt(0).toString(16).toUpperCase()}`).join(" ")
    : "";
  elements.copyId.disabled = !value;
  elements.removeCharacter.disabled = !value;
  elements.clearId.disabled = !value;
  if (message) {
    elements.feedback.textContent = message;
  }
}

function insertAtCursor(character) {
  const input = elements.idInput;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? start;
  input.value = `${input.value.slice(0, start)}${character}${input.value.slice(end)}`.slice(0, input.maxLength);
  const nextPosition = Math.min(start + character.length, input.value.length);
  input.focus();
  input.setSelectionRange(nextPosition, nextPosition);
  updateIdMaker(`${character} を追加しました`);
}

function renderInsertCharacters() {
  const fragment = document.createDocumentFragment();
  insertCharacters.forEach((character) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = character;
    button.setAttribute("aria-label", `${character}をカーソル位置に追加`);
    button.addEventListener("click", () => insertAtCursor(character));
    fragment.append(button);
  });
  elements.insertCharacters.replaceChildren(fragment);
}

elements.search.addEventListener("input", () => {
  elements.clearSearch.hidden = !elements.search.value;
  renderCharacters();
});

elements.clearSearch.addEventListener("click", () => {
  elements.search.value = "";
  elements.clearSearch.hidden = true;
  elements.search.focus();
  renderCharacters();
});

elements.clearFavorites.addEventListener("click", () => {
  favorites = [];
  saveList(storageKeys.favorites, favorites);
  renderFavorites();
  renderCharacters();
  showToast("お気に入りを解除しました");
});

elements.clearHistory.addEventListener("click", () => {
  history = [];
  saveList(storageKeys.history, history);
  renderHistory();
  showToast("コピー履歴を削除しました");
});

elements.idInput.addEventListener("input", () => updateIdMaker("入力内容を更新しました"));
elements.copyId.addEventListener("click", () => copyText(elements.idInput.value, "id"));
elements.removeCharacter.addEventListener("click", () => {
  elements.idInput.value = Array.from(elements.idInput.value).slice(0, -1).join("");
  updateIdMaker("最後の1文字を削除しました");
  elements.idInput.focus();
});
elements.clearId.addEventListener("click", () => {
  elements.idInput.value = "";
  updateIdMaker("入力内容を消去しました");
  elements.idInput.focus();
});

renderCategories();
renderCharacters();
renderFavorites();
renderHistory();
renderInsertCharacters();
updateIdMaker();

