let globalUsers;

// global vars mapping html elements
const globalResultsList = document.getElementById('results-data');
const globalStatisticList = document.getElementById('statistics-data');
const globalSearchInput = document.getElementById('search');
const globalSearchBtn = document.getElementById('search-btn');

window.addEventListener('load', start);

async function start() {
  //request for data API
  globalUsers = await queryUsers();

  //adding events to inputs
  globalSearchInput.addEventListener('keyup', handleTyping);
  globalSearchBtn.addEventListener('click', handleInput);
}

function handleTyping(event) {
  if (event.key === 'Enter') {
    handleInput();
  }
}

function handleInput() {
  const queryText = globalSearchInput.value.toLocaleLowerCase();
  const results = doResearch(queryText);
  treatResults(results);
}

function doResearch(searchArg) {
  const found = globalUsers.filter((user) => {
    return user.name.toLocaleLowerCase().includes(searchArg);
  });

  return found;
}

function treatResults(results) {
  clearData();
  const masc = results.filter((user) => {
    return user.gender === 'male';
  }).length;
  const fem = results.filter((user) => {
    return user.gender === 'female';
  }).length;
  const sumAges = results.reduce((acc, curr) => {
    return acc + curr.age;
  }, 0);
  const avAges = sumAges / results.length;
  renderResults(results);
  renderStatistics(masc, fem, sumAges, avAges);
}

function renderResults(data) {
  const h2 = document.getElementById('results-title');
  if (data.length > 0) {
    h2.textContent = `${data.length} Usuário(s) encontrado(s)`;
  } else {
    h2.textContent = 'Nenhum usuário filtrado';
  }
  data.forEach((user) => {
    const li = document.createElement('li');
    globalResultsList.appendChild(li);

    const pic = document.createElement('img');
    pic.src = user.picture.thumbnail;
    pic.classList.add('picture');
    li.appendChild(pic);

    const data = document.createElement('span');
    data.textContent = `${user.name}, ${user.age} anos`;
    li.appendChild(data);
  });
}

function renderStatistics(masc, fem, sumAges, avAges) {
  const h2 = document.getElementById('statistics-title');
  if (sumAges === 0) {
    h2.textContent = 'Nada a ser exibido';
    return;
  }
  h2.textContent = 'Estatísticas';
  const liMasc = document.createElement('li');
  liMasc.textContent = `Sexo masculino: ${masc}`;
  globalStatisticList.appendChild(liMasc);
  const liFem = document.createElement('li');
  liFem.textContent = `Sexo feminino: ${fem}`;
  globalStatisticList.appendChild(liFem);
  const liSumAges = document.createElement('li');
  liSumAges.textContent = `Soma das idades: ${sumAges}`;
  globalStatisticList.appendChild(liSumAges);
  const liAvAges = document.createElement('li');
  liAvAges.textContent = `Média das idades: ${avAges}`;
  globalStatisticList.appendChild(liAvAges);
}

function clearData() {
  while (globalResultsList.firstChild) {
    globalResultsList.removeChild(globalResultsList.firstChild);
  }
  while (globalStatisticList.firstChild) {
    globalStatisticList.removeChild(globalStatisticList.firstChild);
  }
}

async function queryUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );

  const jsonUsers = await res.json();

  const users = jsonUsers.results.map((user) => {
    return {
      name: `${user.name.first} ${user.name.last}`,
      picture: user.picture,
      age: user.dob.age,
      gender: user.gender,
    };
  });

  console.log(users);
  return users;
}
