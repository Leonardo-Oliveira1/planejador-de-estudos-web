let horasDiarias = [
    {
        dia: 'domingo',
        tempo: 0
    },
    {
        dia: 'segunda',
        tempo: 0
    },
    {
        dia: 'terca',
        tempo: 0
    },
    {
        dia: 'quarta',
        tempo: 0
    },
    {
        dia: 'quinta',
        tempo: 0
    },
    {
        dia: 'sexta',
        tempo: 0
    },
    {
        dia: 'sabado',
        tempo: 0
    },
];

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

    horasDiarias = addHorasDiariasToArray(dia, tempoEmHoras);

    return convertHorasParaHorasEMinutos(tempoEmHoras);
}

function addHorasDiariasToArray(dia, tempoEmHoras){
    let i = horasDiarias.findIndex(item => item.dia === dia);
    horasDiarias[i].tempo = tempoEmHoras;
    
    return horasDiarias; 
}

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
}

function getHorasEstudosTotais(){
    var result = 0;

    horasDiarias.forEach(e => {
        result += e.tempo;
    });

    return result;
}

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


document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        let dia = (this.id).split("-")[0];
        let inicio_html = document.getElementById(`${dia}-inicio`);
        let fim_html = document.getElementById(`${dia}-fim`);
        let horas_estudadas = document.getElementById(`${dia}-horas-estudadas`);
        
        if(!this.checked){
            inicio_html.disabled = true;
            fim_html.disabled = true;
        
            horas_estudadas.innerText = "--";
        
        } else {
            inicio_html.disabled = false;
            fim_html.disabled = false;
        }
        DOM_exibicaoDeHorasIniciais()
    });
});

DOM_exibicaoDeHorasIniciais()

let horasAEstudarHoje = horasDiarias.find(arr => arr.dia === hoje);
horasAEstudarHoje = (horasAEstudarHoje == undefined) ? 0 : horasAEstudarHoje.tempo;

/////////////////PARTE DAS MATÉRIAS/////////////////

var listaMaterias = document.getElementById('lista-materias');
let materias = [
    {
        nome: 'Química',
        assuntos: [
            {
                nome: 'Nomenclatura IUPAC',
                horas_estimadas: 3.2,
                prioridade: 5,
                totalmente_aprendido: false
            },
            {
                nome: 'NOX',
                horas_estimadas: 2,
                prioridade: 4,
                totalmente_aprendido: false
            },
        ]
    },
    {
        nome: 'Física',
        assuntos: [
            {
                nome: 'Corrente elétrica',
                horas_estimadas: 1,
                prioridade: 1,
                totalmente_aprendido: false
            }
        ]
    },
    {
        nome: 'História',
        assuntos: [            
            {
                nome: 'Judeus e hebreus',
                horas_estimadas: 0.7,
                prioridade: 1,
                totalmente_aprendido: false
            },
            {
                nome: 'Mesopotâmia',
                horas_estimadas: 1,
                prioridade: 2,
                totalmente_aprendido: false
            },
            {
                nome: 'Egito antigo',
                horas_estimadas: 1,
                prioridade: 2,
                totalmente_aprendido: false
            },
            {
                nome: 'Grécia',
                horas_estimadas: 1,
                prioridade: 1,
                totalmente_aprendido: false
            },
            {
                nome: 'Proclamação da República',
                horas_estimadas: 1,
                prioridade: 1,
                totalmente_aprendido: false
            }
        ]
    },
    {
        nome: 'Biologia',
        assuntos: [
            {
                nome: 'Imunização',
                horas_estimadas: 0.4,
                prioridade: 1,
                totalmente_aprendido: true
            },
            {
                nome: 'Formas de prevenção',
                horas_estimadas: 0.4,
                prioridade: 1,
                totalmente_aprendido: true
            },
            {
                nome: 'Medicamentos',
                horas_estimadas: 0.5,
                prioridade: 1,
                totalmente_aprendido: true
            }
        ]
    }
];

function getPrioridadeText(num){
    let prioridades = ['muito baixa', 'baixa', 'normal', 'média', 'alta', 'crítica']

    return prioridades[num];
}


function DOM_listMateriasEAssuntos(){
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
    });
}

function ordenarAssuntosPorPrioridade(materias){
    let assuntosOrdenadosPorPrioridade = [];

    materias.forEach(materia =>{
        materia.assuntos.forEach( assunto => {
            if(assunto.totalmente_aprendido == false){
                assuntosOrdenadosPorPrioridade.push({"assunto": assunto.nome, "prioridade": assunto.prioridade, "horas": assunto.horas_estimadas})
            }
        })
    })
    
    assuntosOrdenadosPorPrioridade = assuntosOrdenadosPorPrioridade.sort((a, b) => b.prioridade - a.prioridade);

    return assuntosOrdenadosPorPrioridade;
}

function getDiasSemEstudo(){
    let assuntosPorDiaSemana = {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
    };

    for(let i = 0; i < 6; i++){
        if(horasDiarias[i].tempo == 0){
            assuntosPorDiaSemana[i] = "--";
        }
    }

    return assuntosPorDiaSemana;
}//TESTAR

function diaNumberToDiaText(number){
    const day = ["domingo", "segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];

    return day[number];
}


let assuntoEDuracao = [];
function getAssuntosPorDiaSemana(){
    let diasNecessarios = 0;
    let assuntoAtualIndex = 0;
    let assuntosPorDiaSemana = getDiasSemEstudo();
    let assuntosOrdenadosPorPrioridade = ordenarAssuntosPorPrioridade(materias);

    horasDiarias.forEach(dia => {
        if (assuntosOrdenadosPorPrioridade[assuntoAtualIndex].horas > -1) {

            // console.log(`${assuntosOrdenadosPorPrioridade[assuntoAtualIndex].horas} horas para aprender ${assuntosOrdenadosPorPrioridade[assuntoAtualIndex].assunto} - ${dia.tempo} horas`)
            assuntosOrdenadosPorPrioridade[assuntoAtualIndex].horas -= dia.tempo

            if(assuntosPorDiaSemana[diasNecessarios] == "--"){
                diasNecessarios++;
            } else {
                diasNecessarios++;
            }
            
            if(diasNecessarios < 7 && assuntosPorDiaSemana[diasNecessarios] != "--"){
                if(assuntosPorDiaSemana[diasNecessarios] == "--"){
                    diasNecessarios++;
    
                    if(assuntosPorDiaSemana[diasNecessarios] == "--"){
                        diasNecessarios++;
    
                        if(assuntosPorDiaSemana[diasNecessarios] == "--"){
                            diasNecessarios++;
    
                            if(assuntosPorDiaSemana[diasNecessarios] == "--"){
                                diasNecessarios++;
    
                                if(assuntosPorDiaSemana[diasNecessarios] == "--"){
                                    diasNecessarios++;
        
                                    if(assuntosPorDiaSemana[diasNecessarios] == "--"){
                                        diasNecessarios++;
    
                                        if(assuntosPorDiaSemana[diasNecessarios] == "--"){
                                            diasNecessarios++;
    
                                        }
    
                                    }
                                }
    
                            }
                        }
    
                    }
                }
                assuntosPorDiaSemana[diasNecessarios] = assuntosOrdenadosPorPrioridade[assuntoAtualIndex].assunto
            }

            


            // console.log("assunto index: " +assuntoAtualIndex)
            
        }

        // console.log("HORAS RESTANTES: " + assuntosOrdenadosPorPrioridade[assuntoAtualIndex].horas + " na " + dia.dia)
        // console.log("DIA PASSADOS: " + diasNecessarios)

        
        while (assuntosOrdenadosPorPrioridade[assuntoAtualIndex].horas <= 0) {
            
            diasNecessarios--;
            //COM DOMINGO DESATIVADO ISSO FUNCIONA, ATIVADO NÃO



            if(diasNecessarios > 7){
                break;
            }
            
            assuntoEDuracao.push({"assunto": assuntosOrdenadosPorPrioridade[assuntoAtualIndex].assunto, "ultimo_dia": diasNecessarios})
            if (assuntoAtualIndex >= assuntosOrdenadosPorPrioridade.length) {
                break;
            }
            assuntoAtualIndex++;
        }

    });

    return assuntoEDuracao;
}//testar

function DOM_showAssuntoPorDia(){
    let assuntosPorDiaSemana = getAssuntosPorDiaSemana();
    
    assuntoList = document.getElementById("assuntoList");

    let contador = 1;
    assuntosPorDiaSemana.forEach(assunto => {
        const span = document.createElement('span');
        span.innerHTML = `${contador}º assunto: ${assunto.assunto} (até ${diaNumberToDiaText(assunto.ultimo_dia)}) </br>`;
        assuntoList.appendChild(span);
        contador++;
    });

    document.getElementById('assunto_a_estudar').innerText = `Assunto a estudar: ${assuntosPorDiaSemana[0].assunto}`;
}//testar

function formatarTempo(segundos) {
    let horas = Math.floor(segundos / 3600);
    let minutos = Math.floor((segundos % 3600) / 60);
    let segundosRestantes = segundos % 60;
  
    if(horas == 0){
        return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
    }
    
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}//testar essa função

function getTempoEtapas(horasHoje){
    let totalSegundos = 60 * 60 * horasHoje;
    let etapas = [
        {
            "descricao": "Revisão do dia anterior",
            "duracao": totalSegundos * 0.2
        },
        {
            "descricao": "Teoria",
            "duracao": totalSegundos * 0.3
        },
        {
            "descricao": "Resoluções de questões",
            "duracao": totalSegundos * 0.3
        },
        {
            "descricao": "Criar flashcards Anki",
            "duracao": totalSegundos * 0.2
        }
    ]
    return etapas;
}

if(horasDiarias.findIndex(item => item.dia === hoje) === -1){
    totalSegundos = false;
}

function cronometroPorEtapa(etapa, horasHoje){

let horasUtilizadas = null;

horasUtilizadas = !horasHoje ? horasAEstudarHoje : horasHoje;

let segundosEtapa = 0;

switch(etapa) {
    case 1:
        segundosEtapa = getTempoEtapas(horasUtilizadas)[0].duracao;
        break;
    case 2:
        segundosEtapa = getTempoEtapas(horasUtilizadas)[1].duracao;
        break;
    case 3:
        segundosEtapa = getTempoEtapas(horasUtilizadas)[2].duracao;
        break;
    case 4:
        segundosEtapa = getTempoEtapas(horasUtilizadas)[3].duracao;
        break;
    default:
        segundosEtapa = 0;
        break;
}

segundosEtapa--;

let progresso = document.getElementById("progresso");
let cronometro = setInterval(() => {
    document.getElementById(`etapa-${etapa}-counter`).textContent = `${formatarTempo(segundosEtapa)}`;
    document.title = `Revisão: ${formatarTempo(segundosEtapa)}`
    if (segundosEtapa === 0) {
        clearInterval(cronometro)
        
        if(etapa < 4){
            document.getElementById(`etapa-${etapa}-counter`).style.display = `none`;
            document.getElementById(`etapa-${etapa + 1}-counter`).style.display = `block`;
            
            document.getElementById(`etapa-${etapa}-description`).style.display = `none`;
            document.getElementById(`etapa-${etapa + 1}-description`).style.display = `block`;
        } else {
            document.getElementById(`etapa-${etapa}-description`).style.display = "none";
            document.getElementById(`etapa-${etapa}-counter`).innerText = "Estudos finalizados."
        }
        
        let status_image = progresso.querySelector(`#etapa-${etapa}-status`);
        status_image.src = "img/check-circle.svg"

        switch(etapa) {
            case 1:
                cronometroPorEtapa(2, horasHoje);
                break;
            case 2:
                cronometroPorEtapa(3, horasHoje);
                break;
            case 3:
                cronometroPorEtapa(4, horasHoje);
                break;
        }
    } else {
        segundosEtapa--;
    }

}, 1000)
}

    function DOM_exibicaoInformacaoIniciais(){
        let totalSegundos = 10;

        document.getElementById('totalHorasHoje').innerText = `Estudo por ${convertHorasParaHorasEMinutos(horasAEstudarHoje)}`;
        document.title = `Revisão: ${formatarTempo(getTempoEtapas(horasAEstudarHoje)[0].duracao)}`
        document.getElementById("etapa-1-counter").innerText = `${formatarTempo(getTempoEtapas(horasAEstudarHoje)[0].duracao)}`
        document.getElementById("etapa-2-counter").innerText = `${formatarTempo(getTempoEtapas(horasAEstudarHoje)[1].duracao)}`
        document.getElementById("etapa-3-counter").innerText = `${formatarTempo(getTempoEtapas(horasAEstudarHoje)[2].duracao)}`
        document.getElementById("etapa-4-counter").innerText = `${formatarTempo(getTempoEtapas(horasAEstudarHoje)[3].duracao)}`
    
        let etapas = getTempoEtapas(null);
        let etapa_counter = 1;

        let progresso = document.getElementById("progresso");
        if(progresso.childElementCount == 0){
            etapas.forEach(etapa => {
                document.getElementById(`etapa-${etapa_counter}-description`).innerText = `Etapa ${etapa_counter} - ${etapa.descricao}`
    
                const span = document.createElement('span');
                span.innerHTML = `<img src="img/circle.svg" id="etapa-${etapa_counter}-status" alt="check-list"> ${etapa.descricao} </br>`;
                progresso.appendChild(span);
    
                etapa_counter++;
            });
        }

        DOM_listMateriasEAssuntos()
        DOM_showAssuntoPorDia();
    
        //TESTAR ISSO
        document.getElementById('btn-comecar').addEventListener('click', function() {
            if (totalSegundos !== false) {
                cronometroPorEtapa(1, horasAEstudarHoje)
                
                this.disabled = true;
                this.innerText = "Pausar"
            } else {
                document.getElementById('tempo-restante').textContent = `Hoje não há estudos!`;
            }
        });
    }

    DOM_exibicaoInformacaoIniciais();

module.exports = { getHorasEstudosPorDia, convertHorasParaHorasEMinutos, addHorasDiariasToArray, getHorasEstudosTotais, ordenarAssuntosPorPrioridade };