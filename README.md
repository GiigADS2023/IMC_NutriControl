Controle de pacientes para clínica de nutrição             

Giorgia Batista Schmidt - giorgia.schmidt@alunos.sc.senac.br

Regra de Negócios para a Calculadora de IMC
- Entrada de Informações:
    - Peso: Deve ser informado em kg (quilograma). O campo deve aceitar apenas valores numéricos positivos.
    - Altura: Deve ser informado em m (metros). O campo deve aceitar apenas valores numéricos positivos.
    - Sexo: Deve selecionar apenas uma das opções de sexo: homem ou mulher. 

- Validação:
    - O peso deve ser um valor numérico positivo. Se o valor inserido for inválido, uma mensagem de erro deve ser exibida.
    - A altura deve ser um valor numérico positivo. Se o valor inserido for inválido, uma mensagem de erro deve ser exibida.
    - Deve ser selecionada uma das opções de sexo antes de prosseguir com o cálculo.
    - Os campos de entrada não devem permitir a inserção de caracteres não numéricos.

- Cálculo IMC:
    - IMC = Peso / (Altura * Altura).
    - O valor resultante deve ser mostrado na tela após o cálculo.

- Exibição dos Resultados:
    - O resultado deve ser exibido com uma precisão de duas casas decimais.
    - A tela deve exibir uma imagem visual que corresponda a cada faixa de IMC, ajudando o usuário a identificar rapidamente em qual categoria se encontra.
    - Dependendo do resultado de IMC deve ser exibido as seguintes mensagens:
	    - Abaixo do peso: IMC < 18.5
		- Peso normal: 18,5 <= IMC < 24.9
		- Sobrepeso: 25 <= IMC < 29.9
		- Obesidade grau I: 30 <= IMC < 34.9
		- Obesidade grau II: 35 <= IMC < 39.9
		- Obesidade grau III: Acima de 40


- Estilos e Layout:
    - O botão “Calcular” deve estar desativado até que todos os campos necessários sejam preenchidos corretamente.
    - A interface deve ser responsiva e ajustada para diferentes tamanhos de tela, garantindo uma experiência de usuário consistente.
    - O resultado do IMC e a mensagem correspondente devem ser exibidos em uma seção separada abaixo do botão “Calcular”.

- Acessibilidade
    - As etiquetas dos campos e botões devem ser claras e descritivas.
    - A mensagem de resultado do IMC deve ser facilmente compreensível e apresentada de maneira clara.


- Informações Adicionais
    - Um link para "Mais informações sobre o IMC" deve ser fornecido abaixo do resultado do IMC, direcionando os usuários a uma página com informações detalhadas sobre o IMC, suas faixas e implicações para a saúde.
