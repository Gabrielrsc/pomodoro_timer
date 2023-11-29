const html = document.querySelector('html')
const focoBt = document.querySelector('.btn__foco')
const curtoBt = document.querySelector('.btn__curto')
const longoBt = document.querySelector('.btn__longo')
const botao = document.querySelectorAll('.btn__timer')

const startPauseBt = document.querySelector('#start-pause') 

const tempoNaTela = document.querySelector('#timer')


let tempoDecorridoEmsegundos = 1500

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmsegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
    
})

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmsegundos = 300
    alterarContexto('curto')
    curtoBt.classList.add('active')
    console.log('Test2')
    

})

longoBt.addEventListener('click', () =>{
    tempoDecorridoEmsegundos = 900
    alterarContexto('longo')
    longoBt.classList.add('active')
    console.log('Test3')
    

})

function alterarContexto(contexto){
    mostrarTempo()
    botao.forEach(function (contexto){
        contexto.classList.remove('active')
    })
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    alert('Olá mené')
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmsegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pr-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

alert('Site em Construção')