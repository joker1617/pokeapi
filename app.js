// Url de l'API
// https://pokeapi.co/api/v2/pokemon/
const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const resultContainer = document.querySelector(".resultContainer");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  if (input.value === "") {
    errorMsg.textContent = "Wops, veuillez remplir l'input";
    return;
  } else {
    errorMsg.textContent = "";
    loader.style.display = "flex";
    resultContainer.textContent = "";
    search(input.value);
  }
}

async function search(searchInput) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchInput}`
    );
    console.log(response);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    createCards(data);
  } catch (error) {
    errorMsg.textContent = `${error}
    Veuillez rentrer un numéro entre 1 et 1010`;
    loader.style.display = "none";
  }
}

function createCards(data) {
  resultContainer.innerHTML = "";

  const card = document.createElement("div");
  card.className = "result-item";
  card.innerHTML = `
    <h3 class= "name">${data.name}</h3>
    <img src="${data.sprites.front_default}" alt="${
    data.name
  }" class="pokemon-image">

    <p class= "type">Types : ${data.types
      .map((type) => type.type.name)
      .join(",")}</p> 
    <p class= "stats">Stats de base:</p>
    <ul>
    ${data.stats
      .map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
      .join("")}
      </ul>   
    `;

  resultContainer.appendChild(card);
  loader.style.display = "none";
}
