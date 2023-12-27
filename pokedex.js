const pokemonDataArray = [];

async function obtenerDatosPokemon() {
  
  for (let i = 1; i <= 150; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + i);
      const data = await response.json();
      pokemonDataArray.push(data);
  }

}

const mainDiv$$ = document.querySelector('#pokedex');
async function cargarPokemonEnPagina() {
  try {
       await obtenerDatosPokemon();

      // Mostrar los elementos en la página
      mainDiv$$.innerHTML = "";
      pokemonDataArray.forEach((data) => callPokemons(data));
  } catch (error) {
      console.error("Error al obtener datos de la API:", error);
  }
}


async function callPokemons(data) {

      const pokemonName = data.name;
      const pokemonImg = data.sprites.front_default;
      const pokemonType = data.types.map((type) => type.type.name).join(', ');

      const div$$ = document.createElement('div');
      const nameP$$ = document.createElement('p');
      const img$$ = document.createElement('img');
      const p$$ = document.createElement('p');
      nameP$$.textContent = pokemonName.toUpperCase();
      div$$.appendChild(nameP$$);
      img$$.setAttribute('src', pokemonImg);


      div$$.classList.add('pokemonTarget');


      mainDiv$$.appendChild(div$$);
      div$$.appendChild(img$$);
      div$$.appendChild(p$$);

      p$$.textContent = `${pokemonType}`;

      renderPokemonStats(data.stats, p$$);
    } 

const renderPokemonStats = (stats, parentElement) => {
  stats.forEach(stat => {
    const statElement = document.createElement("div");
    const statElementName = document.createElement("div");
    const statElementAmount = document.createElement("div");
    statElementName.textContent = stat.stat.name;
    statElementAmount.textContent = stat.base_stat;
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);
    parentElement.appendChild(statElement);
  });
}

const searchPokemon = event => {
    event.preventDefault();
    mainDiv$$.innerHTML = '';
    const pokemonWanted = event.target.pokemon.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonWanted.toLowerCase()}`)
        .then(response => response.json())
        .then(data => callPokemons(data))
        .catch(err => renderNotFound())
}

const renderNotFound = () => {
  mainDiv$$.innerHTML = `
  <div class="pokemonTarget">
     <p>No encontrado</p> 
     <img src="./pikachu.png" alt="Pikachu-shadow" class="imagen_sombra">
     <p>null,null
     <div class="ajuste">
        <div>hp</div>
        <div>00</div>
     </div>
     <div class="ajuste">
        <div>attack</div>
        <div>00</div>
     </div>
     <div class="ajuste">
        <div>defense</div>
        <div>00</div>
     </div>
     <div class="ajuste">
        <div>special attack</div>
        <div>00</div>
     </div>
     <div class="ajuste">
        <div>special defense</div>
        <div>00</div>
     </div>
     </p>
  </div>
  
  `;
}



cargarPokemonEnPagina();

const h1$$ = document.querySelector('h1');
h1$$.onclick = function(){
  cargarPokemonEnPagina();
}

