const html = document.querySelector('html')
const focoBt = document.querySelector('.btn__foco')
const curtoBt = document.querySelector('.btn__curto')
const longoBt = document.querySelector('.btn__longo')
const botao = document.querySelectorAll('.btn__timer')

const startPauseBt = document.querySelector('#start-pause') 

const tempoNaTela = document.querySelector('#timer')

const audiofim = new Audio ('assets/sons/alarm-kitchen.mp3')

let tempoDecorridoEmsegundos = 1500
let intervaloId = null
function foco(){
    tempoDecorridoEmsegundos = 15
    alterarContexto('foco')
    focoBt.classList.add('active')
    
}

focoBt.addEventListener('click', foco)



function curto() {
    tempoDecorridoEmsegundos = 3
    alterarContexto('curto')
    curtoBt.classList.add('active')
    console.log('Test2')
}

curtoBt.addEventListener('click', curto)

function longo() {
    tempoDecorridoEmsegundos = 9
    alterarContexto('longo')
    longoBt.classList.add('active')
    console.log('Test3')


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