// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: Infinity,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// Seleção de elementos
const imcTable = document.querySelector("#imc-table");
const nameInput = document.querySelector('#name');
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");
const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");
const backBtn = document.querySelector("#back-btn");

// Funções
function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  nameInput.value = "";
  imcNumber.className = "";
  imcInfo.className = "";
}

function validaDigits(text) {
  return text.replace(/[^0-9,.]/g, "");
}

function calcIMC(weight, height) {
  const IMC = (weight / (height * height)).toFixed(1);
  return IMC;
}

function showResults() {
  calcContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
}

function hideResults() {
  calcContainer.classList.remove("hide");
  resultContainer.classList.add("hide");
}

// Validação para altura e peso
function validaAltura(altura) {
  return altura >= 0.5 && altura <= 3.0;
}

function validaPeso(peso) {
  return peso >= 3 && peso <= 600;
}

// Inicialização
createTable(data);

// Eventos
[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updatedValue = validaDigits(e.target.value);
    e.target.value = updatedValue;
  });
});

function validaNome(nome) {
  return nome.length >= 3;
}

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const nome = nameInput.value;
  if (!validaNome(nome)) {
    alert("O nome deve ter no mínimo 3 caracteres.");
    return;
  }

  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  // Verificação de valores válidos para altura e peso
  if (!validaAltura(height)) {
    alert("Por favor, insira uma altura válida entre 0.5m e 3m.");
    return;
  }

  if (!validaPeso(weight)) {
    alert("Por favor, insira um peso válido entre 3kg e 600kg.");
    return;
  }

  if (!weight || !height) return;

  const IMC = calcIMC(weight, height);

  let info = '';

  data.forEach((item) => {
    if (IMC >= item.min && IMC <= item.max) {
      info = item.info;
    }
  });

  if (!info) return;

  imcNumber.innerText = IMC;
  imcInfo.innerText = info;
  
  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showResults();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cleanInputs();
});

backBtn.addEventListener("click", () => {
  hideResults();
  cleanInputs();
});

/* Tabela - CRUD */
const tbody = document.querySelector('tbody');
const Nome = document.querySelector('#name');
const Altura = document.querySelector('#height');
const Peso = document.querySelector('#weight');
const btnSalvar = document.querySelector('#aply-btn');
const searchInput = document.getElementById('search');

let editId; // Armazena o ID do usuário que está sendo editado

async function loadUsers() {
  try {
    const users = await api.buscarUsuarios();
    tbody.innerHTML = ''; // Limpa linhas existentes

    users.forEach(user => {
      const tr = document.createElement('tr');

      let situacaoClass = '';
      switch (user.situacao) {
        case "Magreza":
          situacaoClass = "low";
          break;
        case "Normal":
          situacaoClass = "good";
          break;
        case "Sobrepeso":
          situacaoClass = "medium";
          break;
        case "Obesidade":
          situacaoClass = "medium";
          break;
        case "Obesidade grave":
          situacaoClass = "high";
          break;
      }

      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.height}</td>
        <td>${user.weight}</td>
        <td>${user.imc}</td>
        <td class="${situacaoClass}">${user.situacao}</td>
        <td class="acao">
          <button onclick="editUser('${user.id}')"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
          <button onclick="deleteUser('${user.id}')"><i class='bx bx-trash'></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  }
}

async function createUser() {
  const altura = parseFloat(Altura.value.replace(",", "."));
  const peso = parseFloat(Peso.value.replace(",", "."));
  const IMC = calcIMC(peso, altura);
  let situacao = '';

  data.forEach((item) => {
    if (IMC >= item.min && IMC <= item.max) {
      situacao = item.info;
    }
  });

  if (!situacao) {
    console.error('Situação não encontrada para IMC:', IMC);
    return;
  }

  const user = {
    name: Nome.value,
    height: altura,
    weight: peso,
    imc: IMC,
    situacao: situacao
  };

  try {
    await api.criarUsuario(user);
    loadUsers();
    cleanInputs();
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}

async function editUser(id) {
  console.log('ID passado para editUser:', id); 
  try {
    const users = await api.buscarUsuarios();
    console.log('Usuários retornados pela API:', users);
    const selectedUser = users.find(u => u.id === id);

    if (!selectedUser) {
      console.error('Usuário não encontrado:', id);
      return;
    }

    Nome.value = selectedUser.name;
    Altura.value = selectedUser.height;
    Peso.value = selectedUser.weight;
    editId = id;
    
    // Muda o texto do botão para "Atualizar" quando editando
    btnSalvar.innerText = 'Atualizar';
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
  }
}

async function updateUser() {
  const altura = parseFloat(Altura.value.replace(",", "."));
  const peso = parseFloat(Peso.value.replace(",", "."));
  const IMC = calcIMC(peso, altura);
  let situacao = '';

  data.forEach((item) => {
    if (IMC >= item.min && IMC <= item.max) {
      situacao = item.info;
    }
  });

  if (!situacao) {
    console.error('Situação não encontrada para IMC:', IMC);
    return;
  }

  const user = {
    name: Nome.value,
    height: altura,
    weight: peso,
    imc: IMC,
    situacao: situacao
  };

  try {
    await api.atualizarUsuario(editId, user);
    loadUsers();
    cleanInputs();
    editId = undefined;
    btnSalvar.innerText = 'Salvar'; // Volta ao texto original após atualizar
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
}

async function deleteUser(id) {
  const confirmed = confirm("Tem certeza que deseja excluir este item?");
  if (confirmed) {
    try {
      await api.deletarUsuario(id);
      loadUsers();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  }
}

searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();

  Array.from(tbody.querySelectorAll('tr')).forEach(row => {
    const name = row.querySelector('td:nth-child(1)').innerText.toLowerCase();
    const height = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
    const weight = row.querySelector('td:nth-child(3)').innerText.toLowerCase();
    const imc = row.querySelector('td:nth-child(4)').innerText.toLowerCase();
    const situacao = row.querySelector('td:nth-child(5)').innerText.toLowerCase();

    // Verifica se a pesquisa corresponde ao nome, altura, peso, IMC ou situação
    const matches = name.includes(searchValue) || 
                    height.includes(searchValue) || 
                    weight.includes(searchValue) || 
                    imc.includes(searchValue) || 
                    situacao.includes(searchValue);

    row.style.display = matches ? '' : 'none';
  });
});


// Configurar o botão de salvar para chamar a função apropriada
btnSalvar.addEventListener('click', (e) => {
  e.preventDefault();

  const nome = Nome.value;
  if (!validaNome(nome)) {
    alert("O nome deve ter no mínimo 3 caracteres.");
    return;
  }

  if (editId) {
    updateUser(); // Atualiza o usuário se estiver em modo de edição
  } else {
    createUser(); // Cria um novo usuário
  }
});


// Carregar usuários ao inicializar
loadUsers();
