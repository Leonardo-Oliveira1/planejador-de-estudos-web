const weekday = ["domingo", "segunda","terca","quarta","quinta","sexta","sabado"];
const d = new Date();
let hoje = weekday[d.getDay()];

function getHorasEstudosPorDia(dia){
    let horaInicioValue = document.getElementById(`${dia}-inicio`).value;
    let horaFimValue = document.getElementById(`${dia}-fim`).value;
    
    var horaInicialDate = new Date(`2024-01-01T${horaInicioValue}`);
    var horaFinalDate = new Date(`2024-01-01T${horaFimValue}`);

    var diferencaEmMilissegundos = horaFinalDate - horaInicialDate;
    var tempoEmHoras = diferencaEmMilissegundos / (1000 * 60 * 60)

    return tempoEmHoras;
}

function setHorasEstudosPorDia(dia){
    document.getElementById(`${dia}-horas-estudadas`).innerText = convertHorasParaHorasEMinutos(getHorasEstudosPorDia(dia));
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

function DOM_exibicaoDeHorasIniciais(schedule) {
    var result = 0;
    console.log(schedule)

    schedule.forEach(day => {
        result += getHorasEstudosPorDia(day);
    });


    document.getElementById(`horasPorSemana`).innerText = `Horas semanais de estudos: ${convertHorasParaHorasEMinutos()}`;
}// não precisa testar por ser DOM

let horasAEstudarHoje = horasDiarias.find(arr => arr.dia === hoje);
horasAEstudarHoje = (horasAEstudarHoje == undefined) ? 0 : horasAEstudarHoje.tempo;

/////////////////PARTE DAS MATÉRIAS/////////////////

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

function diaNumberToDiaText(number){
    const day = ["domingo", "segunda","terca","quarta","quinta","sexta","sabado"];

    return day[number];
}

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