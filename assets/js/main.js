// let tempoDecorridoEmsegundos = 1500;
// const html = document.querySelector('html');
// const body = document.querySelector('body');

// //Botao de Focos
// const focoBt = document.querySelector('.btn__foco');
// const curtoBt = document.querySelector('.btn__curto');
// const longoBt = document.querySelector('.btn__longo');

// const botao = document.querySelectorAll('.btn__timer');
// const mensagemFoco = document.querySelector('.mensagem__foco');
// const focosFeitos = document.querySelector('.focos__feitos');
// const startPauseBt = document.querySelector('#start-pause');
// const tempoNaTela = document.querySelector('#timer');
// const audiofim = new Audio('assets/sons/alarm-kitchen.mp3');

// function configurarContextoInicial() {
//     const contextoSalvo = localStorage.getItem('contextoAtual');
//     const pomodoroInputValue = localStorage.getItem('pomodoroInputValue') || 25;
//     const curtoInputValue = localStorage.getItem('curtoInputValue') || 5;
//     const longoInputValue = localStorage.getItem('longoInputValue') || 15;

//     pomodoroInput.value = pomodoroInputValue;
//     curtoInput.value = curtoInputValue;
//     longoInput.value = longoInputValue;

//     foco();
//     if (contextoSalvo === 'foco') {
//         foco();
//         definirTempo(pomodoroInputValue);
//     } else if (contextoSalvo === 'curto') {
//         curto();
//         definirTempo(curtoInputValue);
//     } else if (contextoSalvo === 'longo') {
//         longo();
//         definirTempo(longoInputValue);
//     }
// }


// let intervaloId = null;
// let contagemFoco = 0;

// function foco() {
//     definirTempo(pomodoroInput.value);
//     alterarContexto('foco');
//     adicionarClasseAtiva(focoBt);
// }

// function curto() {
//     definirTempo(curtoInput.value);
//     alterarContexto('curto');
//     adicionarClasseAtiva(curtoBt);
// }

// function longo() {
//     definirTempo(longoInput.value);
//     alterarContexto('longo');
//     adicionarClasseAtiva(longoBt);
// }

// function adicionarClasseAtiva(elemento) {
//     botao.forEach(btn => btn.classList.remove('active'));
//     elemento.classList.add('active');
// }

// focoBt.addEventListener('click', foco);
// curtoBt.addEventListener('click', curto);
// longoBt.addEventListener('click', longo);

// function alterarContexto(contexto) {
//     mostrarTempo();
//     botao.forEach(btn => btn.classList.remove('active'));
//     html.setAttribute('data-contexto', contexto);
//     localStorage.setItem('contextoAtual', contexto);
// }

// function contagemRegressiva() {
//     if (tempoDecorridoEmsegundos <= 0) {
//         finalizarFoco();
//         return;
//     }

//     tempoDecorridoEmsegundos = Math.max(0, tempoDecorridoEmsegundos - 1);
//     mostrarTempo();
// }

// function finalizarFoco() {
//     audiofim.play();

//     const focoAtivo = html.getAttribute('data-contexto');
//     if (focoAtivo === 'foco') {
//         contagemFoco++;
//         const tarefaAtual = obterTarefaAtual();
//         if (tarefaAtual) {
//             tarefaAtual.pomodoroRealizados++;
//             localStorage.setItem('tarefas', JSON.stringify(tarefas));
//             atualizarQuantidadeFocos();
//             console.log('Pomodoros realizados na tarefa atual:', tarefaAtual.pomodoroRealizados);
//         }
//         if (contagemFoco === 4) {
//             contagemFoco = 0;
//             longo();
//         } else {
//             curto();
//         }
//     } else {
//         foco();
//     }

//     zerar();
// }

// function obterTarefaAtual() {
//     const nomeTarefaAtual = mensagemFoco.textContent.replace('Foco na Tarefa: ', '');
//     return tarefas.find(tarefa => tarefa.descricao === nomeTarefaAtual);
// }

// startPauseBt.addEventListener('click', () => {
//     if (intervaloId) {
//         zerar();
//     } else {
//         intervaloId = setInterval(contagemRegressiva, 1000);
//         startPauseBt.textContent = 'Pause';
//     }
// });

// function zerar() {
//     const contextoAtual = html.getAttribute('data-contexto');
//     localStorage.setItem('contextoAtual', contextoAtual);
//     clearInterval(intervaloId);
//     startPauseBt.textContent = 'Start';
//     intervaloId = null;
// }

// function mostrarTempo() {
//     const tempo = new Date(tempoDecorridoEmsegundos * 1000);
//     const tempoFormatado = tempo.toLocaleTimeString('pr-br', {
//         minute: '2-digit',
//         second: '2-digit'
//     });
//     tempoNaTela.innerHTML = tempoFormatado;
// }
