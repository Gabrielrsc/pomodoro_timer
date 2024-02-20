let listaDeTarefas = [];

const adicionarTarefas = document.querySelector('.adicionar__tarefas');
const campoAdicionarTarefa = document.querySelector('.adicionando__tarefas');
const btnCancelar = document.querySelector('.btn__cancelar_adicao');
const btnSalvar = document.querySelector('.btn__salvar');
const textAreaCampoTarefa = document.querySelector('.app__form-input');
const textInputNumeroPomodoros = document.querySelector('.number_pomodoros');
const btnOpcao = document.querySelector('.opcaos');
const btnOpcaoLimpar = document.querySelector('.opcaos__menu');
const ulTarefas = document.querySelector('.tarefas__todo');
const numberPomodorosInput = document.getElementById('number_pomodoros');
const btnUpQtd = document.querySelector('.up_qtd');
const btnDownQtd = document.querySelector('.down_qtd');

btnUpQtd.addEventListener('click', () => {
  let value = parseInt(numberPomodorosInput.value);
  if (!isNaN(value)) {
    value++;
    numberPomodorosInput.value = value;
  }
});

btnDownQtd.addEventListener('click', () => {
  let value = parseInt(numberPomodorosInput.value);
  if (!isNaN(value) && value > 0) {
    value--;
    numberPomodorosInput.value = value;
  }
});

const listaRecuperada = localStorage.getItem('listaDeTarefas');

if (listaRecuperada) {
  listaDeTarefas = JSON.parse(listaRecuperada);
  mostrarTarefas();
} else {
  listaDeTarefas = [];
}

document.querySelectorAll('.opcaos__menu li').forEach(item => {
  item.addEventListener('click', () => {
    btnOpcaoLimpar.classList.toggle('ativo');
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

btnOpcao.addEventListener('click', () => {
  btnOpcaoLimpar.classList.toggle('ativo');
  adicionarTarefas.classList.remove('ocuto');
  campoAdicionarTarefa.classList.remove('ativo');
});

adicionarTarefas.addEventListener('click', () => {
  adicionarTarefas.classList.add('ocuto');
  campoAdicionarTarefa.classList.add('ativo');
  btnOpcaoLimpar.classList.remove('ativo');
  textAreaCampoTarefa.focus();
});

btnCancelar.addEventListener('click', (evento) => {
  evento.preventDefault();
  adicionarTarefas.classList.remove('ocuto');
  campoAdicionarTarefa.classList.remove('ativo');
  textAreaCampoTarefa.value = '';
  numberPomodorosInput.value = 1;
});

btnSalvar.addEventListener('click', (evento) => {
  evento.preventDefault();
  if (textAreaCampoTarefa.value === '') {
    evento.preventDefault();
  } else {
    salvarTarefa();
    mostrarTarefas();
    textAreaCampoTarefa.value = '';
    numberPomodorosInput.value = 1;
    adicionarTarefas.classList.remove('ocuto');
    campoAdicionarTarefa.classList.remove('ativo');
  }
});

ulTarefas.addEventListener('click', function(event) {
  const tarefaClicada = event.target.closest('li');

  ulTarefas.querySelectorAll('li').forEach(li => {
    li.classList.remove('li__acionado');
  });

  tarefaClicada.classList.add('li__acionado');
  nomeTarefa = tarefaClicada.querySelector('.tarefas_nome span').textContent;
  mensagemFoco.textContent = `Foco na Tarefa: ${nomeTarefa}`;
});

function atualizaLocalStorage() {
  localStorage.setItem('listaDeTarefas', JSON.stringify(listaDeTarefas));
}

function salvarTarefa() {
  const tarefas = textAreaCampoTarefa.value;
  const numeroDePomodoro = Number(textInputNumeroPomodoros.value);
  const chegarTarefasDuplicada = listaDeTarefas.some((elemento) =>
    elemento.tarefa.toUpperCase() === tarefas.toUpperCase()
  );
  if (chegarTarefasDuplicada) {
    alert('Item já existe');
  } else {
    listaDeTarefas.push({
      tarefa: tarefas,
      pomodoros: numeroDePomodoro,
      pomodorosRealizados: 0,
      concluido: false,
    });
  }
}

function mostrarTarefas() {
  ulTarefas.innerHTML = '';

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
          <span class="nome_tarefa">${elemento.tarefa}</span>
        </div>
        
        <div class="lateral-d">
          <div class="icon_editar"><i class="fa-solid fa-pen-to-square "></i></div>  
          <span class="numero_de_pomodoro">${elemento.pomodorosRealizados}/${elemento.pomodoros}</span>
        </div>
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

  ulTarefas.querySelectorAll('.icon_editar').forEach((editarTarefa, index) => {
    editarTarefa.addEventListener('click', () => {
      const nomeTarefaElement = ulTarefas.children[index].querySelector('.nome_tarefa');
      const nomeTarefaAnterior = nomeTarefaElement.textContent;
      nomeTarefaElement.innerHTML = `<input type="text" class="editaTarefaInput" value="${nomeTarefaAnterior}">`;
      const editaTarefaInput = nomeTarefaElement.querySelector('.editaTarefaInput');
      editaTarefaInput.focus();
      editaTarefaInput.select();

      editaTarefaInput.addEventListener('blur', () => {
        const novoNomeTarefa = editaTarefaInput.value;
        listaDeTarefas[index].tarefa = novoNomeTarefa;
        nomeTarefaElement.textContent = novoNomeTarefa;
        atualizaLocalStorage();
      });
    });
  });

  atualizaLocalStorage();
}
