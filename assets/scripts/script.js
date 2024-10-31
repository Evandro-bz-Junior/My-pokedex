const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const type1 = document.querySelector('.type_1');
const type2 = document.querySelector('.type_2');
const ability1 = document.querySelector('.ability_1');
const ability2 = document.querySelector('.ability_2');
const Stats1 = document.querySelector('.Stats1');
const Stats2 = document.querySelector('.Stats2');
const Stats3 = document.querySelector('.Stats3');
const Stats4 = document.querySelector('.Stats4');
const Stats5 = document.querySelector('.Stats5');
const Stats6 = document.querySelector('.Stats6');


let searchPokemon = 0;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return (data);
    }
}

const renderPokemon = async (pokemon) => {
    if (pokemon === 0) {
        pokemonName.innerHTML = 'Default Image';
        pokemonNumber.innerHTML = '#0';
        pokemonImage.src = './assets/images/pngwing.com.png';
        type1.innerHTML = '-';
        type2.innerHTML = '-';
        ability1.innerHTML = '-';
        ability2.innerHTML = '-';
        Stats1.innerHTML = '-';
        Stats2.innerHTML = '-';
        Stats3.innerHTML = '-';
        Stats4.innerHTML = '-';
        Stats5.innerHTML = '-';
        Stats6.innerHTML = '-';
        return;
    }
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if (data) {
        removeTypeClasses();
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        if(pokemonImage.src = data['sprites']['other']['dream_world']['front_default']){
            pokemonImage.src = data['sprites']['other']['dream_world']['front_default'];
        }else{
            pokemonImage.src = data['sprites']['other']['official-artwork']['front_default'];
        }
        
        input.value = '';
        searchPokemon = data.id;

        type1.innerHTML = data['types']['0']['type']['name'];
        let type1Class = type1.innerText;
        type1.classList.add(type1Class.toLowerCase());
        if (data['types'][1]) {
            type2.innerHTML = data['types'][1]['type']['name'];
            let type2Class = type2.innerText;
            type2.classList.add(type2Class.toLowerCase());
        } else {
            type2.innerHTML = '-';
        }

        ability1.innerHTML = data['abilities']['0']['ability']['name'];
        if (data['types'][1]) {
            ability2.innerHTML = data['abilities'][1]['ability']['name'];
        } else {
            ability2.innerHTML = '-';
        }

        Stats1.innerHTML =  `HP: `+data['stats']['0']['base_stat'];
        Stats2.innerHTML =  `ATK: `+data['stats']['1']['base_stat']
        Stats3.innerHTML =  `DEF: `+data['stats']['2']['base_stat']
        Stats4.innerHTML =  `SATK: `+data['stats']['3']['base_stat']
        Stats5.innerHTML =  `SDEF: `+data['stats']['4']['base_stat']
        Stats6.innerHTML =  `SPD: `+data['stats']['5']['base_stat']

    } else {
        removeTypeClasses();
        pokemonImage.style.display = 'block';
        pokemonImage.src = './assets/images/pngwing.com.png';
        pokemonName.innerHTML = "Not Found:c";
        pokemonNumber.innerHTML = '#';
        type1.innerHTML = '-';
        type2.innerHTML = '-';
        ability1.innerHTML = '-';
        ability2.innerHTML = '-';
        Stats1.innerHTML = '-';
        Stats2.innerHTML = '-';
        Stats3.innerHTML = '-';
        Stats4.innerHTML = '-';
        Stats5.innerHTML = '-';
        Stats6.innerHTML = '-';
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        removeTypeClasses()
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    removeTypeClasses()
    renderPokemon(searchPokemon);
});

function removeTypeClasses() {
    // Remover classes do elemento type1
    type1.classList.remove('fire', 'water', 'grass', 'electric', 'psychic', 'fighting', 'normal', 'flying', 'bug', 'rock', 'ground', 'poison', 'ghost', 'ice', 'dragon', 'dark', 'steel', 'fairy');
    type2.classList.remove('fire', 'water', 'grass', 'electric', 'psychic', 'fighting', 'normal', 'flying', 'bug', 'rock', 'ground', 'poison', 'ghost', 'ice', 'dragon', 'dark', 'steel', 'fairy');

    // Adicione todas as classes que deseja remover ao método remove()
}
pokemonImage.src = './assets/images/pngwing.com.png';
renderPokemon(searchPokemon)


