let horasTotais = [];

const weekday = ["domingo", "segunda","terca","quarta","quinta","sexta","sabado"];
const d = new Date();
let hoje = weekday[d.getDay()];

function getHorasEstudosPorDia(dia){
    let horaInicioValue = document.getElementById(`${dia}-inicio`).value;
    let horaFimValue = document.getElementById(`${dia}-fim`).value;
    
    var horaInicialDate = new Date(`2024-04-12T${horaInicioValue}:00`);
    var horaFinalDate = new Date(`2024-04-12T${horaFimValue}:00`);

    var diferencaEmMilissegundos = horaFinalDate - horaInicialDate;
    var tempoEmHoras = diferencaEmMilissegundos / (1000 * 60 * 60)

    addHorasDiariasToTotalArray(dia, tempoEmHoras);

    return convertHorasParaHorasEMinutos(tempoEmHoras);
}//possui testes


function addHorasDiariasToTotalArray(dia, tempoEmHoras){
    let index = horasTotais.findIndex(item => item.dia === dia);
    if (index !== -1) {
        horasTotais[index].tempo = tempoEmHoras;
    } else {
        horasTotais.push({ dia: dia, tempo: tempoEmHoras });
    }
}//não precisa de testes

function convertHorasParaHorasEMinutos(horas) {
    var horasInteiras = Math.floor(horas);
    var minutos = Math.round((horas - horasInteiras) * 60);
    var horasTexto = horasInteiras === 1 ? 'hora' : 'horas';
    var minutosTexto = minutos === 1 ? 'minuto' : 'minutos';
    
    if (horasInteiras === 0) {
        return `${minutos} ${minutosTexto}`;
    } else if (minutos === 0) {
        return `${horasInteiras} ${horasTexto}`;
    } else {
        return `${horasInteiras} ${horasTexto} e ${minutos} ${minutosTexto}`;
    }
}//possui testes

function getHorasEstudosTotais(){
    var result = 0;

    horasTotais.forEach(e => {
        result += e.tempo;
    });
    
    return result;
}// não precisa de testes

function DOM_showHorasEstudadas(dia){
    if(document.getElementById(`${dia}-habilitado`).checked){
        document.getElementById(`${dia}-horas-estudadas`).innerText = getHorasEstudosPorDia(dia);
    }
}// não precisa testar por ser DOM

function DOM_exibicaoDeHorasIniciais() {
    DOM_showHorasEstudadas("segunda")
    DOM_showHorasEstudadas("terca")
    DOM_showHorasEstudadas("quarta")
    DOM_showHorasEstudadas("quinta")
    DOM_showHorasEstudadas("sexta")
    DOM_showHorasEstudadas("sabado")
    DOM_showHorasEstudadas("domingo")
    
    document.getElementById(`horasPorSemana`).innerText = `Horas semanais de estudos: ${convertHorasParaHorasEMinutos(getHorasEstudosTotais())}`;
}// não precisa testar por ser DOM

DOM_exibicaoDeHorasIniciais()

let horasAEstudarHoje = horasTotais.find(arr => arr.dia === hoje);
horasAEstudarHoje = (horasAEstudarHoje == undefined) ? 0 : horasAEstudarHoje.tempo;

/////////////////PARTE DAS MATÉRIAS/////////////////

var listaMaterias = document.getElementById('lista-materias');
let materias = [
    {
        nome: 'Estrutura de dados e algoritmos',
        assuntos: [
            {
                nome: 'Arrays',
                horas_estimadas: 4,
                prioridade: 1,
                totalmente_aprendido: true
            },
            {
                nome: 'Filas',
                horas_estimadas: 4,
                prioridade: 2,
                totalmente_aprendido: false
            },
            {
                nome: 'Pilhas',
                horas_estimadas: 4,
                prioridade: 2,
                totalmente_aprendido: false
            }
        ]
    },
    {
        nome: 'Engenharia de Software',
        assuntos: [
            {
                nome: 'Metodologias Ágeis',
                horas_estimadas: 10,
                prioridade: 3,
                totalmente_aprendido: false
            },
            {
                nome: 'Engenharia de Requisitos',
                horas_estimadas: 1,
                prioridade: 4,
                totalmente_aprendido: false
            }
        ]
    },
    {
        nome: 'Qualidade de Software',
        assuntos: [            
            {
                nome: 'Testes de Software',
                horas_estimadas: 5,
                prioridade: 2,
                totalmente_aprendido: false
            },
            {
                nome: 'Garantia de Qualidade',
                horas_estimadas: 5,
                prioridade: 4,
                totalmente_aprendido: false
            }
        ]
    },
    {
        nome: 'Bancos de Dados',
        assuntos: [
            {
                nome: 'Modelagem de Dados',
                horas_estimadas: 5,
                prioridade: 2,
                totalmente_aprendido: false
            },
            {
                nome: 'SQL',
                horas_estimadas: 2,
                prioridade: 1,
                totalmente_aprendido: false
            }
        ]
    }
];

function getPrioridadeText(num){
    let result = "";

    switch (num) {
        case 1:
            result = "baixa";
            break;
    
        case 2:
            result = "normal";
            break;

        case 3:
            result = "média";
            break;
            
        case 4:
            result = "alta";
            break;

        case 5:
            result = "crítica";
            break;
    }

    return result;
}//não precisa testar por ser função de longo prazo


//TESTAR E REFATORAR TUDO DAQUI PRA BAIXO
materias.forEach(materia => {
    let li = document.createElement('li');
    li.textContent = materia.nome;

    if (materia.assuntos && materia.assuntos.length > 0) {
        let ulAssuntos = document.createElement('ul');
        materia.assuntos.forEach(function(assunto) {
            let liAssunto = document.createElement('li');
            liAssunto.textContent = `${assunto.nome} (${assunto.horas_estimadas} horas) [Prioridade: ${getPrioridadeText(assunto.prioridade)}]`;
            
            if(assunto.totalmente_aprendido == true){
                liAssunto.style.textDecoration = "line-through";
            }

            ulAssuntos.appendChild(liAssunto);
        });
        li.appendChild(ulAssuntos);
    }

    listaMaterias.appendChild(li);


let assuntosOrdenadosPorPrioridade = [];
materias.forEach(materia =>{
    materia.assuntos.forEach( assunto => {
        if(assunto.totalmente_aprendido == false){
            assuntosOrdenadosPorPrioridade.push({"assunto": assunto.nome, "prioridade": assunto.prioridade, "horas": assunto.horas_estimadas})
        }
    })
})

assuntosOrdenadosPorPrioridade = assuntosOrdenadosPorPrioridade.sort((a, b) => b.prioridade - a.prioridade);

let assuntosPorDiaSemana = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: ""
};

let diasNecessarios = 0;
let assuntoAtualIndex = 0;

horasTotais.forEach(dia => {
    if (assuntosOrdenadosPorPrioridade[assuntoAtualIndex].horas > -1) {
        assuntosOrdenadosPorPrioridade[assuntoAtualIndex].horas -= dia.tempo;
        
        diasNecessarios++;
        assuntosPorDiaSemana[diasNecessarios] = assuntosOrdenadosPorPrioridade[assuntoAtualIndex].assunto
    }
    
    while (assuntosOrdenadosPorPrioridade[assuntoAtualIndex].horas <= 0) {
        assuntoAtualIndex++;
        if (assuntoAtualIndex >= assuntosOrdenadosPorPrioridade.length) {
            break;
        }
    }
});



document.getElementById('segunda_assunto').innerText = `Segunda-feira: ${assuntosPorDiaSemana[1]}`;
document.getElementById('terca_assunto').innerText = `Terça-feira: ${assuntosPorDiaSemana[2]}`;
document.getElementById('quarta_assunto').innerText = `Quarta-feira: ${assuntosPorDiaSemana[3]}`;
document.getElementById('quinta_assunto').innerText = `Quinta-feira: ${assuntosPorDiaSemana[4]}`;
document.getElementById('sexta_assunto').innerText = `Sexta-feira: ${assuntosPorDiaSemana[5]}`;
document.getElementById('sabado_assunto').innerText = `Sábado: ${assuntosPorDiaSemana[6]}`;
document.getElementById('domingo_assunto').innerText = `Domingo: ${assuntosPorDiaSemana[0]}`;



    let totalSegundos = 60 * 60 * horasAEstudarHoje; // 1 hora (3600 segundos)
    let segundosEtapa1 = totalSegundos * (20/100);
    let segundosEtapa2 = totalSegundos * (30/100);
    let segundosEtapa3 = totalSegundos * (30/100);
    let segundosEtapa4 = totalSegundos * (20/100);
    let intervalId;
    
    if(horasTotais.findIndex(item => item.dia === hoje) === -1){
        totalSegundos = false;
    }

    // Função para formatar o tempo em HH:MM:SS
    function formatarTempo(segundos) {
        let horas = Math.floor(segundos / 3600);
        let minutos = Math.floor((segundos % 3600) / 60);
        let segundosRestantes = segundos % 60;
      
        if(horas == 0){
            return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
        }
        
        return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
    }

    // Função para atualizar o tempo restante e exibir
    function cronometroEtapa1() {
        document.getElementById('etapa-1-counter').textContent = `${formatarTempo(segundosEtapa1)}`;
        document.title = `Revisão: ${formatarTempo(segundosEtapa1)}`
        if (segundosEtapa1 === 0) {
            clearInterval(intervalId);
            document.getElementById("etapa-1-counter").style.display = "none";
            document.getElementById("etapa-2-counter").style.display = "block";

            document.getElementById("etapa-1-description").style.display = "none";
            document.getElementById("etapa-2-description").style.display = "block";
            cronometroEtapa2()
        } else {
            segundosEtapa1--;
        }
    }

    function cronometroEtapa2() {
        document.getElementById('etapa-2-counter').textContent = `${formatarTempo(segundosEtapa2)}`;
        document.title = `Teoria: ${formatarTempo(segundosEtapa2)}`
        if (segundosEtapa2 === 0) {
            clearInterval(intervalId);

            document.getElementById("etapa-2-counter").style.display = "none";
            document.getElementById("etapa-3-counter").style.display = "block";

            document.getElementById("etapa-2-description").style.display = "none";
            document.getElementById("etapa-3-description").style.display = "block";

            cronometroEtapa3()
        } else {
            intervalId = setInterval(cronometroEtapa1, 1000);
            segundosEtapa2--;
        }
    }

    function cronometroEtapa3() {
        document.getElementById('etapa-3-counter').textContent = `${formatarTempo(segundosEtapa3)}`;
        document.title = `Questões: ${formatarTempo(segundosEtapa3)}`
        if (segundosEtapa3 === 0) {
            clearInterval(intervalId);

            document.getElementById("etapa-3-counter").style.display = "none";
            document.getElementById("etapa-4-counter").style.display = "block";

            document.getElementById("etapa-3-description").style.display = "none";
            document.getElementById("etapa-4-description").style.display = "block";

            cronometroEtapa4()
        } else {
            intervalId = setInterval(cronometroEtapa2, 1000);
            segundosEtapa3--;
        }
    }

    function cronometroEtapa4() {
        document.getElementById('etapa-4-counter').textContent = `${formatarTempo(segundosEtapa4)}`;
        document.title = `Anotações: ${formatarTempo(segundosEtapa4)}`
        if (segundosEtapa4 === 0) {
            document.getElementById("etapa-4-description").style.display = "none";
            document.getElementById("etapa-4-counter").innerText = "Estudos finalizados."
            clearInterval(intervalId);
        } else {
            intervalId = setInterval(cronometroEtapa3, 1000);
            segundosEtapa4--;
        }
    }


    
    document.getElementById('btn-comecar').addEventListener('click', function() {
        if (totalSegundos !== false) {
            intervalId = setInterval(cronometroEtapa1, 1000);
            document.getElementById('btn-comecar').disabled = true; // desabilita o botão começar
            document.getElementById('btn-comecar').innerText = "Pausar"
        } else {
            document.getElementById('tempo-restante').textContent = `Hoje não há estudos!`;
        }
    });

    document.getElementById('totalHorasHoje').innerText = `Estudo por ${convertHorasParaHorasEMinutos(horasAEstudarHoje)}`;
    document.title = `Revisão: ${formatarTempo(segundosEtapa1)}`
    document.getElementById("etapa-1-counter").innerText = `${formatarTempo(segundosEtapa1)}`
    document.getElementById("etapa-2-counter").innerText = `${formatarTempo(segundosEtapa2)}`
    document.getElementById("etapa-3-counter").innerText = `${formatarTempo(segundosEtapa3)}`
    document.getElementById("etapa-4-counter").innerText = `${formatarTempo(segundosEtapa4)}`

    document.getElementById("etapa-1-description").innerText = `Etapa 1 - Revisão do dia anterior`
    document.getElementById("etapa-2-description").innerText = `Etapa 2 - Teoria`
    document.getElementById("etapa-3-description").innerText = `Etapa 3 - Resoluções de questões`
    document.getElementById("etapa-4-description").innerText = `Etapa 4 - Criar flashcards Anki`


    });

module.exports = { getHorasEstudosPorDia, convertHorasParaHorasEMinutos };