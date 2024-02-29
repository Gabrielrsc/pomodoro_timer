const html = document.querySelector('html');
const body = document.querySelector('body');

//Botao de Focos
const focoBt = document.querySelector('.btn__foco');
const curtoBt = document.querySelector('.btn__curto');
 const longoBt = document.querySelector('.btn__longo');

const botao = document.querySelectorAll('.btn__timer');
const mensagemFoco = document.querySelector('.mensagem__foco');
const focosFeitos = document.querySelector('.focos__feitos');
const startPauseBt = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer');
const audiofim = new Audio('assets/sons/alarm-kitchen.mp3');


let intervaloId = null;



function foco() {
    definirTempo(pomodoroInput.value);
    alterarContexto('foco');
    adicionarClasseAtiva(focoBt);
}

function curto() {
    definirTempo(curtoInput.value);
    alterarContexto('curto');
    adicionarClasseAtiva(curtoBt);
}

function longo() {
    definirTempo(longoInput.value);
    alterarContexto('longo');
    adicionarClasseAtiva(longoBt);
}

function adicionarClasseAtiva(elemento) {
    botao.forEach(btn => btn.classList.remove('active'));
    elemento.classList.add('active');
}

focoBt.addEventListener('click', foco);
curtoBt.addEventListener('click', curto);
longoBt.addEventListener('click', longo);

function alterarContexto(contexto) {
    botao.forEach(btn => btn.classList.remove('active'));
    html.setAttribute('data-contexto', contexto);
    localStorage.setItem('contextoAtual', contexto);
}
function contagemRegressiva() {
    if (tempoDecorridoEmsegundos <= 0) {
        finalizarFoco();
        return;
    }

    tempoDecorridoEmsegundos = Math.max(0, tempoDecorridoEmsegundos - 1);
    mostrarTempo(); // Mostrar o tempo atualizado a cada segundo
    
}
let cicloPomodoro = parseInt(localStorage.getItem('cicloPomodoro')) || 0;
let pomodorosTotal = parseInt(localStorage.getItem('pomodorosTotal')) || 0;

function finalizarFoco() {
    audiofim.play();
    zerar();
    const contextoAtual = html.getAttribute('data-contexto');
    if (contextoAtual === 'foco') {
        curto() // Muda para a próxima fase (curto descanso)
        cicloPomodoro++
        pomodorosTotal++
        localStorage.setItem('cicloPomodoro', cicloPomodoro);
        localStorage.setItem('pomodorosTotal', pomodorosTotal);
        console.log(cicloPomodoro)
        if (cicloPomodoro === 4){
            cicloPomodoro = 0
            localStorage.setItem('cicloPomodoro', cicloPomodoro);
            longo()  
        } 
        if (tarefaSelecionadaIndex !== null) {
            listaDeTarefas[tarefaSelecionadaIndex].pomodorosRealizados++;
            mostrarTarefas();


    } else if (contextoAtual === 'curto' || contextoAtual === 'longo'){
        foco()
    } 
}}
startPauseBt.addEventListener('click', () => {
    if (intervaloId) {
        zerar();
    } else {
        intervaloId = setInterval(contagemRegressiva, 1000);
        startPauseBt.textContent = 'Pause';
    }
});

function zerar() {
    const contextoAtual = html.getAttribute('data-contexto');
    localStorage.setItem('contextoAtual', contextoAtual);
    clearInterval(intervaloId);
    startPauseBt.textContent = 'Start';
    intervaloId = null;
}
//Converter Tempo para minutos
function definirTempo(segundos) {
    tempoDecorridoEmsegundos = segundos * 60;
    mostrarTempo(); // Mostrar o tempo inicial ao definir um novo tempo
    
}

function mostrarTempo() {
    const minutos = Math.floor(tempoDecorridoEmsegundos / 60);
    const segundos = tempoDecorridoEmsegundos % 60;
    tempoNaTela.innerHTML = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}
document.addEventListener('DOMContentLoaded', () => {
    foco()
});

