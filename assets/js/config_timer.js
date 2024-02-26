const abrirConfiguracao = document.querySelector('.configuracao_pomodoro_container');
const botaoAbrirConfiguracao = document.querySelector('.btn_config');
const botaoFecharConfiguracao = document.querySelector('.remover_configuracao');
const botaoConfiguracao = document.querySelector('.configuracao_botao');
const pomodoroInput = document.getElementById('pomodoroInput');
const curtoInput = document.getElementById('curtoInput');
const longoInput = document.getElementById('longoInput');



//Funções 

// Função para abrir ou fechar o menu de configuração
function abrirEFecharMenuConfiguracao() {
    abrirConfiguracao.classList.toggle('esconder');
    body.classList.toggle('scroll');
}
//Converter Tempo para minutos
function definirTempo(segundos) {
    tempoDecorridoEmsegundos = segundos * 60;
    mostrarTempo(); // Mostrar o tempo inicial ao definir um novo tempo
    
}

// Evendos de Click

// Eventos para abrir e fechar o menu de configuração
botaoAbrirConfiguracao.addEventListener('click', abrirEFecharMenuConfiguracao);
botaoFecharConfiguracao.addEventListener('click', abrirEFecharMenuConfiguracao);

// Função para carregar os tempos configurados do armazenamento local
function carregarTemposConfigurados() {
    pomodoroInput.value = localStorage.getItem('pomodoroInputValue') || 25;
    curtoInput.value = localStorage.getItem('curtoInputValue') || 5;
    longoInput.value = localStorage.getItem('longoInputValue') || 15;
}

carregarTemposConfigurados();

// Configurando os tempos nos inputs 
botaoConfiguracao.addEventListener('click', () => {
    const pomodoroInputValue = parseInt(pomodoroInput.value);
    const curtoInputValue = parseInt(curtoInput.value);
    const longoInputValue = parseInt(longoInput.value);


    //Verificar se o valor informado é um numero   
    if (!isNaN(pomodoroInputValue) && !isNaN(curtoInputValue) && !isNaN(longoInputValue)) {
        definirTempo(pomodoroInputValue); 
        localStorage.setItem('pomodoroInputValue', pomodoroInputValue);
        localStorage.setItem('curtoInputValue', curtoInputValue);
        localStorage.setItem('longoInputValue', longoInputValue);
        
        abrirEFecharMenuConfiguracao();
    } else {
        alert('Por favor, insira valores numéricos válidos.');
        
    }

 


});

