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
      max: 99,
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
const situacaoInfo = document.querySelector("#situacao-info")

const backBtn = document.querySelector("#back-btn");
 
// Funções
function createTable(data) {
    data.forEach((item) => {
        const div = document.createElement("div")
        div.classList.add("table-data")
 
        const classification = document.createElement("p")
        classification.innerText = item.classification;
 
        const info = document.createElement("p")
        info.innerText = item.info;
 
        const obesity = document.createElement("p")
        obesity.innerText = item.obesity;
 
        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);
 
        imcTable.appendChild(div);
    });
}
 
// Função que limpa as informações
function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  nameInput.value = "";
  imcNumber.className = "";
  imcInfo.className = "";
}

// Valida apenas números e vírgula ou ponto
function validaDigits(text) {
    return text.replace(/[^0-9,.]/g, "");
}

// Calculo IMC
function calcIMC(weight, height) {
    const IMC = (weight / (height * height)).toFixed(1);
    return IMC;
}

function showOrHideResults() {
    calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")
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

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");

    if (!weight || !height) return;

    const IMC = calcIMC(weight, height);

    let info

    data.forEach((item) => {
        if (IMC >= item.min && IMC <= item.max) {
            info = item.info;
        }
    });

    if (!info) return;

    imcNumber.innerText = IMC;
    imcInfo.innerText = info;
    
    switch (info) {
        case "Abaixo do normal":
          imcNumber.classList.add("low");
          imcInfo.classList.add("low");
          break;
        case "Normal":
          imcNumber.classList.add("good");
          imcInfo.classList.add("good");
          break;
        case "Sobrepeso":
          imcNumber.classList.add("low");
          imcInfo.classList.add("low");
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

    showOrHideResults();
});

// Limpa campos e evita o envio do formulário
clearBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Evita o envio do formulário

    cleanInputs(); // Limpa os campos
});

backBtn.addEventListener("click", (e) => {
    cleanInputs();
    showOrHideResults();
});

/* Tabela - Controle*/
const tbody = document.querySelector('tbody');
const Nome = document.querySelector('#name');
const Altura = document.querySelector('#height');
const Peso = document.querySelector('#weight');
const btnSalvar = document.querySelector('#aply-btn');

let itens = JSON.parse(localStorage.getItem('itens')) || []; 
let id; 

function setItensBD() {
  localStorage.setItem('itens', JSON.stringify(itens)); 
}

function loadItens() {
  tbody.innerHTML = ''; 
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

window.onload = loadItens;

function editItem(index) {
  const item = itens[index];
  
  Nome.value = item.nome;
  Altura.value = item.altura;
  Peso.value = item.peso;
  
  id = index;
}

function deleteItem(index) {
  const confirmed = confirm("Tem certeza que deseja excluir este item?");
  
  if (confirmed) {
    itens.splice(index, 1);  // Remove o item se confirmado
    setItensBD();            // Atualiza localStorage
    loadItens();             // Recarrega a table
  }
}


function insertItem(item, index) {
  let tr = document.createElement('tr');

  let situacaoClass = '';
  switch (item.situacao) {
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
    case "Obesidade grave":
      situacaoClass = "high";
      break;
  }

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.altura}</td>
    <td>${item.peso}</td>
    <td>${item.imc}</td>
    <td class="${situacaoClass}">${item.situacao}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;

  tbody.appendChild(tr);
}

btnSalvar.onclick = e => {
  if (Nome.value === '' || Altura.value === '' || Peso.value === '') {
    return;
  }

  e.preventDefault();

  const altura = parseFloat(Altura.value.replace(",", "."));
  const peso = parseFloat(Peso.value.replace(",", "."));
  const IMC = calcIMC(peso, altura);

  let situacao = '';

  data.forEach((item) => {
    if (IMC >= item.min && IMC <= item.max) {
      situacao = item.info;
    }
  });

  const clienteData = {
    nome: Nome.value,
    altura: Altura.value,
    peso: Peso.value,
    imc: IMC,
    situacao: situacao
  };

  if (id !== undefined) {
    itens[id] = clienteData; 
  } else {
    itens.push(clienteData); 
  }

  setItensBD();
  loadItens();
  id = undefined; 
  Nome.value = "";
  Altura.value = "";
  Peso.value = "";
};

// Buscar por nome do user
function buscarUsuario() {
  // Pega o valor na barra de pesquisa
  const input = document.getElementById('search').value.toUpperCase();

  // Pega todas as linhas da tabela
  const tr = tbody.getElementsByTagName('tr');

  // Loop através de todas as linhas da tabela
  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td')[0]; // // Seleciona a primeira célula (nome)
    if (td) {
      const textValue = td.textContent || td.innerText;
      // Verifica se o nome contém o valor pesquisado
      if (textValue.toUpperCase().indexOf(input) > -1) {
        tr[i].style.display = ""; // Mostra a linha
      } else {
        tr[i].style.display = "none"; // Oculta a linha
      }
    }    
  }
}

// Adiciona o evento de pesquisa ao input
document.getElementById('search').addEventListener('keyup', buscarUsuario);

