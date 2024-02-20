let listaDeTarefas = []

const adicionarTarefas = document.querySelector('.adicionar__tarefas');
const campoAdicionarTarefa = document.querySelector('.adicionando__tarefas');
const btnCancelar = document.querySelector('.btn__cancelar_adicao');
const btnSalvar = document.querySelector('.btn__salvar');
const textAreaCampoTarefa = document.querySelector('.app__form-input');
const textInputNumeroPomodoros = document.querySelector('.number_pomodoros');
const btnOpcao = document.querySelector('.opcaos')
const btnOpcaoLimpar = document.querySelector('.opcaos__menu');


const ulTarefas = document.querySelector('.tarefas__todo');

const listaRecuperada = localStorage.getItem('listaDeTarefas')

if (listaRecuperada){
  listaDeTarefas = JSON.parse(listaRecuperada)
  mostrarTarefas();
}else{
  listaDeTarefas = []
}

document.querySelectorAll('.opcaos__menu li').forEach(item => {
  item.addEventListener('click', () => {
    const textoItem = item.textContent.trim();
    if (textoItem === 'Limpar tarefas concluídas') {
      limparTarefasConcluidas();
    } else if (textoItem === 'Limpar todas as tarefas') {
      limparTodasTarefas();
    }
  });
});

function limparTarefasConcluidas() {
  listaDeTarefas = listaDeTarefas.filter(tarefa => !tarefa.concluido);
  mostrarTarefas();
}

function limparTodasTarefas() {
  listaDeTarefas = [];
  mostrarTarefas();
}

//EventListeners
btnOpcao.addEventListener('click', ()=>{
  btnOpcaoLimpar.classList.toggle('ativo');
  adicionarTarefas.classList.remove('ocuto');
  campoAdicionarTarefa.classList.remove('ativo');
})

adicionarTarefas.addEventListener('click', () => {
      
      adicionarTarefas.classList.add('ocuto');
      campoAdicionarTarefa.classList.add('ativo');
      // btnOpcaoLimpar.classList.remove('ativo');
      textAreaCampoTarefa.focus();
  });

btnCancelar.addEventListener('click', (evento) => {
    evento.preventDefault();
    adicionarTarefas.classList.remove('ocuto');
    campoAdicionarTarefa.classList.remove('ativo');
});

btnSalvar.addEventListener('click', (evento) =>{
  evento.preventDefault();
  salvarTarefa();
  mostrarTarefas();
  textAreaCampoTarefa.value = ''
  adicionarTarefas.classList.remove('ocuto');
  campoAdicionarTarefa.classList.remove('ativo');
  
})

ulTarefas.addEventListener('click', function(event){
  const tarefaClicada = event.target.closest('li');
  
  ulTarefas.querySelectorAll('li').forEach(li => {
    li.classList.remove('li__acionado');
  });

  tarefaClicada.classList.add('li__acionado');
  nomeTarefa = tarefaClicada.querySelector('.tarefas_nome span').textContent;
  mensagemFoco.textContent = `Foco na Tarefa: ${nomeTarefa}`;
});

//Funcoes 

function atualizaLocalStorage(){
  localStorage.setItem('listaDeTarefas', JSON.stringify(listaDeTarefas))
}

function salvarTarefa(){
  const tarefas = textAreaCampoTarefa.value
  const numeroDePomodoro = Number(textInputNumeroPomodoros.value)
  const chegarTarefasDuplicada = listaDeTarefas.some((elemento) =>
   elemento.tarefa.toUpperCase() === tarefas.toUpperCase())

   if(chegarTarefasDuplicada){
    alert("Item ja existe")
   }else{
    listaDeTarefas.push({
      tarefa: tarefas,
      pomodoros: numeroDePomodoro,
      pomodorosRealizados: 0,
      concluido: false,
    })
   }

   console.log(listaDeTarefas)

}

function mostrarTarefas(){
  ulTarefas.innerHTML = ''

  const tarefasNaoConcluidas = [];
  const tarefasConcluidas = [];

  listaDeTarefas.forEach((elemento, index) => {
    const liClass = elemento.concluido ? 'concluido' : '';
    const li = `
      <li data-value="${index}" id="lista-tarefas" class="${liClass}">
        <div class="tarefas_nome">
          <div>
            <input type="checkbox" id="checkbox${index}" class="checkbox" ${elemento.concluido ? 'checked' : ''}>
            <label for="checkbox${index}" class="checkbox-custom"></label>
          </div>
          <span> ${elemento.tarefa}</span>
        </div>
        <span class="numero_de_pomodoro">${elemento.pomodorosRealizados}/${elemento.pomodoros}</span>
      </li>
    `;
    if (elemento.concluido) {
      tarefasConcluidas.push(li);
    } else {
      tarefasNaoConcluidas.push(li);
    }
  });

  ulTarefas.innerHTML = [...tarefasNaoConcluidas, ...tarefasConcluidas].join('');

  ulTarefas.querySelectorAll('.checkbox').forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      listaDeTarefas[index].concluido = checkbox.checked;
      if (checkbox.checked) {
        listaDeTarefas.push(listaDeTarefas.splice(index, 1)[0]);
        ulTarefas.children[index].classList.add('move-down');
      } else {
        listaDeTarefas.unshift(listaDeTarefas.splice(index, 1)[0]);
      }
      mostrarTarefas();
      atualizaLocalStorage();
    });
  });

  atualizaLocalStorage();
}

