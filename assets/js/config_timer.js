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
}


// Evendos de Click

// Eventos para abrir e fechar o menu de configuração
botaoAbrirConfiguracao.addEventListener('click', abrirEFecharMenuConfiguracao);
botaoFecharConfiguracao.addEventListener('click', abrirEFecharMenuConfiguracao);


// Configurando os tempos nos inputs 
botaoConfiguracao.addEventListener('click', () => {
    const pomodoroInputValue = parseInt(pomodoroInput.value);
    const curtoInputValue = parseInt(curtoInput.value);
    const longoInputValue = parseInt(longoInput.value);


    //Verificar se o valor informado é um numero
   
    if (!isNaN(pomodoroInputValue) && !isNaN(curtoInputValue) && !isNaN(longoInputValue)) {
        definirTempo(pomodoroInputValue);
        localStorage.setItem('pomodoroInputValue', pomodoroInputValue);

        definirTempo(curtoInputValue);
        localStorage.setItem('curtoInputValue', curtoInputValue);

        definirTempo(longoInputValue);
        localStorage.setItem('longoInputValue', longoInputValue);
        abrirEFecharMenuConfiguracao();
    } else {
        alert('Por favor, insira valores numéricos válidos.');
        
    }


});