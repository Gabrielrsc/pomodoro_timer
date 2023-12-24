const html = document.querySelector('html')
const focoBt = document.querySelector('.btn__foco')
const curtoBt = document.querySelector('.btn__curto')
const longoBt = document.querySelector('.btn__longo')
const botao = document.querySelectorAll('.btn__timer')

const mensagemFoco = document.querySelector('.mensagem__foco')
const focosFeitos = document.querySelector('.focos__feitos')

const startPauseBt = document.querySelector('#start-pause') 

const tempoNaTela = document.querySelector('#timer')

const audiofim = new Audio ('assets/sons/alarm-kitchen.mp3')





let tempoDecorridoEmsegundos = 1500
let intervaloId = null
function foco(){
    tempoDecorridoEmsegundos = 15
    alterarContexto('foco')
    focoBt.classList.add('active')
    mensagemFoco.textContent = 'Hora de Focar!'
    
}

focoBt.addEventListener('click', foco)



function curto() {
    tempoDecorridoEmsegundos = 3
    alterarContexto('curto')
    curtoBt.classList.add('active')
    mensagemFoco.textContent = 'Tempo para uma Pausa!';
}

curtoBt.addEventListener('click', curto)

function longo() {
    tempoDecorridoEmsegundos = 9
    alterarContexto('longo')
    longoBt.classList.add('active')
    mensagemFoco.textContent = 'Tempo para uma pausa Longa!';


}

longoBt.addEventListener('click', longo)
    

function alterarContexto(contexto){
    mostrarTempo()
    botao.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
}

let contagemFoco = 0

const contagemRegressiva = () =>{
    focosFeitos.textContent = contagemFoco

    if (tempoDecorridoEmsegundos <= 0){
        audiofim.play()
        
        const focoAtivo = html.getAttribute('data-contexto')
        console.log(focoAtivo)
        if (focoAtivo == 'foco'){   
            contagemFoco++
            console.log(contagemFoco)
            if (contagemFoco == 4){
                contagemFoco = 0
                longo()
            }else{
                curto()
            }

        }else{
            foco()
        }

        zerar()
        return
    }
   tempoDecorridoEmsegundos -=1
   mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)


function iniciarOuPausar(){
    if (intervaloId){
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseBt.textContent = 'Pause'
}

function zerar(){
    clearInterval(intervaloId)
    startPauseBt.textContent = 'Start'
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmsegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pr-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

// alert('Site em Construção')

///// Tarefas

const adicionarTarefas = document.querySelector('.adicionar__tarefas')
const campoAdicionarTarefa = document.querySelector('.adicionando__tarefas')
const btnCancelar = document.querySelector('.btn__cancelar_adicao')
const btnOpcao = document.querySelector('.opcaos')
const btnOpcaoLimpar = document.querySelector('.opcaos__menu')

adicionarTarefas.addEventListener('click', ()=> {
    adicionarTarefas.classList.add('ocuto')
    campoAdicionarTarefa.classList.add('ativo')
    btnOpcaoLimpar.classList.remove('ativo')
})

btnCancelar.addEventListener('click', ()=> {
    adicionarTarefas.classList.remove('ocuto')
    campoAdicionarTarefa.classList.remove('ativo')
})

btnOpcao.addEventListener('click', ()=>{
    btnOpcaoLimpar.classList.toggle('ativo')
    adicionarTarefas.classList.remove('ocuto')
    campoAdicionarTarefa.classList.remove('ativo')
    
})