let tempoDecorridoEmsegundos = 1500;

const html = document.querySelector('html');
const body = document.querySelector('body')
const focoBt = document.querySelector('.btn__foco');
const curtoBt = document.querySelector('.btn__curto');
const longoBt = document.querySelector('.btn__longo');
const botao = document.querySelectorAll('.btn__timer');
const mensagemFoco = document.querySelector('.mensagem__foco');
const focosFeitos = document.querySelector('.focos__feitos');
const startPauseBt = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer');
const audiofim = new Audio('assets/sons/alarm-kitchen.mp3');




/// Parte de Configuracao do TIMER POMODORO
const abrirConfiguracao = document.querySelector('.configuracao_pomodoro_container')
const botaoAbrirConfiguracao = document.querySelector('.btn_config')
const botaoFecharConfiguracao = document.querySelector('.remover_configuracao')

function abrirEFecharMenuConfiguracao(){
    abrirConfiguracao.classList.toggle('esconder')
    body.classList.toggle('scroll')
}

//Abrir Menu de Configuracao
botaoAbrirConfiguracao.addEventListener('click', abrirEFecharMenuConfiguracao)
//Fechar Menu de Configuracao
botaoFecharConfiguracao.addEventListener('click', abrirEFecharMenuConfiguracao)

//Configurando Tempo nos Input
const botaoConfiguracao = document.querySelector('.configuracao_botao');
const pomodoroInput = document.getElementById('pomodoroInput');
const curtoInput = document.getElementById('curtoInput');
const longoInput = document.getElementById('longoInput');


//Salvando as Configuracao de Tempo
botaoConfiguracao.addEventListener('click', () => {
    abrirEFecharMenuConfiguracao()
    const pomodoroInputValue = parseInt(pomodoroInput.value, 10);
    const curtoInputValue = parseInt(curtoInput.value, 10);
    const longoInputValue = parseInt(longoInput.value, 10);

    // Verifique se os valores são válidos
    if (!isNaN(pomodoroInputValue) && !isNaN(curtoInputValue) && !isNaN(longoInputValue)) {
        definirTempo(pomodoroInputValue);
        localStorage.setItem('pomodoroInputValue', pomodoroInputValue);

        definirTempo(curtoInputValue);  // Corrigido aqui
        localStorage.setItem('curtoInputValue', curtoInputValue);

        definirTempo(longoInputValue);  // Corrigido aqui
        localStorage.setItem('longoInputValue', longoInputValue);

        // Atualize os campos de entrada com os novos valores
        
    } else {
        alert('Por favor, insira valores numéricos válidos.');
    }
});

function mostrarConfiguracaoAtual() {
    const pomodoroInputValue = localStorage.getItem('pomodoroInputValue') || 25;
    const curtoInputValue = localStorage.getItem('curtoInputValue') || 5;
    const longoInputValue = localStorage.getItem('longoInputValue') || 15;

    pomodoroInput.value = pomodoroInputValue;
    curtoInput.value = curtoInputValue;
    longoInput.value = longoInputValue;
}

function configurarContextoInicial() {
    const contextoSalvo = localStorage.getItem('contextoAtual');
    const pomodoroInputValue = localStorage.getItem('pomodoroInputValue') || 25;
    const curtoInputValue = localStorage.getItem('curtoInputValue') || 5;
    const longoInputValue = localStorage.getItem('longoInputValue') || 15;

    pomodoroInput.value = pomodoroInputValue;
    curtoInput.value = curtoInputValue;
    longoInput.value = longoInputValue;

    foco();  // Configurar inicialmente como foco

    if (contextoSalvo === 'foco') {
        foco();
        definirTempo(pomodoroInputValue);
    } else if (contextoSalvo === 'curto') {
        curto();
        definirTempo(curtoInputValue);
    } else if (contextoSalvo === 'longo') {
        longo();
        definirTempo(longoInputValue);
    }
}


mostrarConfiguracaoAtual();
configurarContextoInicial();

let intervaloId = null;
let contagemFoco = 0;

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

function definirTempo(segundos) {
    tempoDecorridoEmsegundos = segundos * 60;
    mostrarTempo();
}

function adicionarClasseAtiva(elemento) {
    botao.forEach(btn => btn.classList.remove('active'));
    elemento.classList.add('active');
}

focoBt.addEventListener('click', foco);
curtoBt.addEventListener('click', curto);
longoBt.addEventListener('click', longo);

function alterarContexto(contexto) {
    mostrarTempo();
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
    mostrarTempo();
}


function finalizarFoco() {
    audiofim.play();

    const focoAtivo = html.getAttribute('data-contexto');
    if (focoAtivo === 'foco') {
        contagemFoco ++
        const tarefaAtual = obterTarefaAtual();
        if (tarefaAtual) {
            tarefaAtual.pomodoroRealizados++;
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            atualizarQuantidadeFocos();
            console.log('Pomodoros realizados na tarefa atual:', tarefaAtual.pomodoroRealizados);
        }
        if (contagemFoco === 4) {
            contagemFoco = 0;
            longo();
        } else {
            curto();
        }
    } else {
        foco();

    }


    zerar();
}

function obterTarefaAtual() {
    const nomeTarefaAtual = mensagemFoco.textContent.replace('Foco na Tarefa: ', '');
    return tarefas.find(tarefa => tarefa.descricao === nomeTarefaAtual);
}

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

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmsegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pr-br', {
        minute: '2-digit',
        second: '2-digit'
    });
    tempoNaTela.innerHTML = tempoFormatado;
}


///Lista de Tarefas

const adicionarTarefas = document.querySelector('.adicionar__tarefas');
const campoAdicionarTarefa = document.querySelector('.adicionando__tarefas');
const btnCancelar = document.querySelector('.btn__cancelar_adicao');
const btnOpcao = document.querySelector('.opcaos');
const btnOpcaoLimpar = document.querySelector('.opcaos__menu');
const btnSalvar = document.querySelector('.btn__salvar');
const textArea = document.querySelector('.app__form-input');
const textInput = document.querySelector('.number_pomodoros');
const ulTarefas = document.querySelector('.tarefas__todo');
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    const divTarefas = document.createElement('div');
    divTarefas.classList.add('tarefas_nome');
    const divCheck = document.createElement('div');
    divCheck.classList.add('check');
    const spanDescricao = document.createElement('span');
    spanDescricao.textContent = tarefa.descricao;
    const spanPomodoro = document.createElement('span');
    spanPomodoro.classList.add('numero_de_pomodoro');
    spanPomodoro.textContent = `${tarefa.pomodoroRealizados}/${tarefa.pomodoro}`;
    li.appendChild(divTarefas);
    divTarefas.appendChild(divCheck);
    divTarefas.appendChild(spanDescricao);
    li.appendChild(spanPomodoro);

    return li;
}

adicionarTarefas.addEventListener('click', () => {
    adicionarTarefas.classList.add('ocuto');
    campoAdicionarTarefa.classList.add('ativo');
    btnOpcaoLimpar.classList.remove('ativo');
});

btnCancelar.addEventListener('click', () => {
    adicionarTarefas.classList.remove('ocuto');
    campoAdicionarTarefa.classList.remove('ativo');
});

btnOpcao.addEventListener('click', () => {
    btnOpcaoLimpar.classList.toggle('ativo');
    adicionarTarefas.classList.remove('ocuto');
    campoAdicionarTarefa.classList.remove('ativo');
});

btnSalvar.addEventListener('click', (evento) => {
    evento.preventDefault();
    
    const descricao = textArea.value.trim();

    if (!descricao) {
        alert('Por favor, insira uma descrição para a tarefa.');
        return;
    }

    const pomodoros = parseInt(textInput.value, 10);

    if (isNaN(pomodoros) || pomodoros < 1) {
        alert('Por favor, insira um número válido de pomodoros.');
        return;
    }

    const tarefaExistente = tarefas.find(tarefa => tarefa.descricao.toLowerCase() === descricao.toLowerCase());

    if (tarefaExistente) {
        alert('Esta tarefa já foi adicionada.');
        return;
    }

    const tarefa = {
        descricao: descricao,
        pomodoro: pomodoros,
        pomodoroRealizados: 0
    };

    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    const novaTarefaElemento = criarElementoTarefa(tarefa);
    ulTarefas.appendChild(novaTarefaElemento);

    textArea.value = '';
    textInput.value = '';

    campoAdicionarTarefa.classList.remove('ativo');
    adicionarTarefas.classList.remove('ocuto');
});

tarefas.forEach((tarefa) => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.appendChild(elementoTarefa);
});

document.addEventListener('DOMContentLoaded', function () {
    const numberInput = document.querySelector('.number_pomodoros');
    const upButton = document.querySelector('.up_qtd');
    const downButton = document.querySelector('.down_qtd');

    upButton.addEventListener('click', function () {
        numberInput.value = parseInt(numberInput.value, 10) + 1;
    });

    downButton.addEventListener('click', function () {
        numberInput.value = Math.max(0, parseInt(numberInput.value, 10) - 1);
    });
});

const btnLimparTarefas = document.querySelector('.opcaos__menu li:nth-child(2)');

btnLimparTarefas.addEventListener('click', () => {
    tarefas.length = 0;
    localStorage.removeItem('tarefas');
    ulTarefas.innerHTML = '';
    btnOpcaoLimpar.classList.toggle('ativo');
});

const listaTarefas = document.querySelector('.tarefas__todo');

listaTarefas.addEventListener('click', function(event) {
    const tarefaClicada = event.target.closest('li');

    if (tarefaClicada) {
        document.querySelectorAll('.tarefas__todo li').forEach((tarefa) => {
            tarefa.classList.remove('li__acionado');
        });

        tarefaClicada.classList.toggle('li__acionado');

        const nomeTarefa = tarefaClicada.querySelector('.tarefas_nome span').textContent;
        mensagemFoco.textContent = `Foco na Tarefa: ${nomeTarefa}`;

        const checkFeito = event.target.closest('.check');
        if (checkFeito) {
            checkFeito.classList.toggle('check__feito');
        }
    }
});



function contarFocosNasTarefas() {
    let quantidadeFocos = 0;

    document.querySelectorAll('.tarefas__todo li').forEach((tarefa) => {
        const contexto = tarefa.getAttribute('data-contexto');
        if (contexto === 'foco') {
            quantidadeFocos++;
        }
    });

    return quantidadeFocos;
}

function atualizarQuantidadeFocos() {
    const quantidadeFocos = contarFocosNasTarefas();
    focosFeitos.textContent = `#${quantidadeFocos}`;

    document.querySelectorAll('.tarefas__todo li').forEach((tarefaElemento) => {
        const descricao = tarefaElemento.querySelector('.tarefas_nome span').textContent;
        const tarefa = tarefas.find(t => t.descricao === descricao);
        if (tarefa) {
            const spanPomodoro = tarefaElemento.querySelector('.numero_de_pomodoro');
            spanPomodoro.textContent = `${tarefa.pomodoroRealizados}/${tarefa.pomodoro}`;
        }
    });
}

document.querySelector('header h1').addEventListener('click', atualizarQuantidadeFocos);
document.addEventListener('DOMContentLoaded', () => {
    configurarContextoInicial();
    mostrarConfiguracaoAtual();
});