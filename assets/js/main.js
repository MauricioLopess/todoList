let inpt = document.querySelector('.inpt');
let ul = document.querySelector('.ul');
let btn = document.querySelector('.btn');


function limpaInpt(){
    inpt.value = '';
    inpt.focus();    
}

function addBtnApagar(li){
    li.innerHTML += ' ';
    let btnApagar = document.createElement('button');
    btnApagar.innerHTML = 'Apagar';
    btnApagar.setAttribute('class', 'apagar');
    btnApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(btnApagar);
}

function addTarefa(txtInput){
    let li = document.createElement('li');
    li.innerText = txtInput;
    ul.appendChild(li);
    addBtnApagar(li);
    limpaInpt();
    salvaTarefas();
}

btn.addEventListener('click', function(e){
    if(!inpt.value) return;
    addTarefa(inpt.value);
})

inpt.addEventListener('keypress', function(e){
    if(!inpt.value) return;
    if(e.keyCode === 13){
        addTarefa(inpt.value);
        limpaInpt();
        salvaTarefas();
    }
})

document.addEventListener('click', function(e){
    if(e.target.classList.contains('apagar')){
        e.target.parentElement.remove();
        salvaTarefas();
    }
});

function salvaTarefas(){
    let tarefas = ul.querySelectorAll('li');
    let arrTarefas = [];

    for(let tarefa of tarefas){
        let tarefaText = tarefa.innerText;
        tarefaText = tarefaText.replace('Apagar', '').trim();
        arrTarefas.push(tarefaText);
        console.log(arrTarefas);
    }

    const tarefasJSON = JSON.stringify(arrTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function addTarefasSalvas(){
    let tarefas = localStorage.getItem('tarefas');
    let arrTarefas = JSON.parse(tarefas);

    for (const tarefa of arrTarefas) {
        addTarefa(tarefa);
    }
}

addTarefasSalvas();
