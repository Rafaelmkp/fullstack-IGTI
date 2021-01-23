import { promises as fs } from 'fs';

//Using global scope arrays for decreasing i/o operations on files
let globalStates;
let globalCities;

init();

async function init() {
  await createFiles();
  console.log(await countCities('SP'));
  await biggestStates();
  await smallestStates();
  outOldCityName();
  smallCityNameByState();
  bigCityNameByState();
  biggestCityName();
  smallestCityName();
}

//Activity 1
async function createFiles() {
  globalStates = JSON.parse(await fs.readFile('./files/Estados.json'));

  globalStates.forEach((state) => {
    fs.writeFile(`./states/${state.Sigla}.json`, '');
  });

  globalCities = JSON.parse(await fs.readFile('./files/Cidades.json'));

  //iterates in each state to build a file with its abbrev
  for (const state of globalStates) {
    const statedCities = globalCities.filter(
      (city) => city.Estado === state.ID
    );
    await fs.writeFile(
      `./states/${state.Sigla}.json`,
      `${JSON.stringify(statedCities)}`
    );
  }
}

//Activity 2
//Returns how many cities in given state
async function countCities(uf) {
  const data = await fs.readFile(`./states/${uf.toUpperCase()}.json`);
  const cities = JSON.parse(data);
  return cities.length;
}

//Support function for activities 2 and 3
//Counts how many cities is in each state
//Uses function in activity 2
//Returns array with all states counted
async function stateNumCities() {
  const countedCities = [];
  for (const state of globalStates) {
    countedCities.push({
      uf: state.Sigla,
      numCities: await countCities(state.Sigla),
    });
  }
  return countedCities;
}

//Activity 3
//Return 5 states with more cities
async function biggestStates() {
  const countedCities = await stateNumCities();
  countedCities.sort((a, b) => {
    return b.numCities - a.numCities;
  });

  const results = [];
  countedCities.slice(0, 5).forEach((item) => {
    results.push(`${item.uf} - ${item.numCities}`);
  });
  console.log('Biggest states:');
  console.log(results);
}

//Activity 4
//Return 5 states with fewer cities
async function smallestStates() {
  const countedCities = await stateNumCities();
  countedCities.sort((a, b) => {
    return a.numCities - b.numCities;
  });
  const results = [];
  countedCities.slice(0, 5).forEach((item) => {
    results.push(`${item.uf} - ${item.numCities}`);
  });
  console.log('Smallest states:');
  console.log(results);
}

//Support procedure for activities 5, 6, 7, 8
//Takes out (old name) of city Names
function outOldCityName() {
  return globalCities.map((city) => {
    let splittedName = city.Nome.split('(');
    return {
      ID: city.ID,
      Nome: splittedName[0],
      Estado: city.Estado,
    };
  });
}

//Activity 5
//Returns array with biggest city Name in each state
function bigCityNameByState() {
  const results = [];
  const treatedCities = outOldCityName();
  for (let state of globalStates) {
    const cities = treatedCities.filter((city) => {
      return city.Estado === state.ID;
    });
    cities.sort((a, b) => {
      return a.Nome.length - b.Nome.length || a.Nome.localeCompare(b.Nome);
    });
    results.push({ Nome: cities[0].Nome, Sigla: state.Sigla });
  }

  results.forEach((city) => {
    console.log(`${city.Nome} - ${city.Sigla}`);
  });
}

//Activity 6
//Returns array with smallest city Name in each state
function smallCityNameByState() {
  const results = [];
  const treatedCities = outOldCityName();
  for (let state of globalStates) {
    const cities = treatedCities.filter((city) => {
      return city.Estado === state.ID;
    });
    cities.sort((a, b) => {
      return b.Nome.length - a.Nome.length || a.Nome.localeCompare(b.Nome);
    });
    results.push({ Nome: cities[0].Nome, Sigla: state.Sigla });
  }

  results.forEach((city) => {
    console.log(`${city.Nome} - ${city.Sigla}`);
  });
}

//Activity 7
//Returns the biggest city Name of all
function biggestCityName() {
  let sortedCityNames = outOldCityName();
  sortedCityNames.sort((a, b) => {
    return b.Nome.length - a.Nome.length || a.Nome.localeCompare(b.Nome);
  });
  let state = globalStates.find((state) => {
    return state.ID === sortedCityNames[0].Estado;
  });
  console.log(`${sortedCityNames[0].Nome} - ${state.Sigla}`);
}

//Activity 8
//Returns the smallest city Name of all
function smallestCityName() {
  let sortedCityNames = outOldCityName();

  sortedCityNames.sort((a, b) => {
    return a.Nome.length - b.Nome.length || a.Nome.localeCompare(b.Nome);
  });
  let state = globalStates.find((state) => {
    return state.ID === sortedCityNames[0].Estado;
  });
  console.log(`${sortedCityNames[0].Nome} - ${state.Sigla}`);
}
