/**
 * @jest-environment jsdom
 */

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="checkbox" id="segunda-habilitado" checked>
    <label>Segunda-feira:</label>
    <input type="time" onchange="showHorasEstudadas('segunda')" id="segunda-inicio" value="18:00" required/>
    <input type="time" onchange="showHorasEstudadas('segunda')" id="segunda-fim" value="22:00" required/>
    <span id="segunda-horas-estudadas">--</span><br>

    <input type="checkbox" id="terca-habilitado" checked>
    <label>Terça-feira:</label>
    <input type="time" onchange="showHorasEstudadas('terca')" id="terca-inicio" value="19:59" required/>
    <input type="time" onchange="showHorasEstudadas('terca')" id="terca-fim" value="22:00" required/>
    <span id="terca-horas-estudadas">--</span><br>

    <input type="checkbox" id="quarta-habilitado" checked>
    <label>Quarta-feira:</label>
    <input type="time" onchange="showHorasEstudadas('quarta')" id="quarta-inicio" value="19:58" required/>
    <input type="time" onchange="showHorasEstudadas('quarta')" id="quarta-fim" value="22:00" required/>
    <span id="quarta-horas-estudadas">--</span><br>

    <input type="checkbox" id="quinta-habilitado" checked>
    <label>Quinta-feira:</label>
    <input type="time" onchange="showHorasEstudadas('quinta')" id="quinta-inicio" value="20:00" required/>
    <input type="time" onchange="showHorasEstudadas('quinta')" id="quinta-fim" value="22:00" required/>
    <span id="quinta-horas-estudadas">--</span><br>

    <input type="checkbox" id="sexta-habilitado" checked>
    <label>Sexta-feira:</label>
    <input type="time" onchange="showHorasEstudadas('sexta')" id="sexta-inicio" value="20:00" required/>
    <input type="time" onchange="showHorasEstudadas('sexta')" id="sexta-fim" value="22:00" required/>
    <span id="sexta-horas-estudadas">--</span><br>

    <input type="checkbox" id="sabado-habilitado" checked>
    <label>Sábado:</label>
    <input type="time" onchange="showHorasEstudadas('sabado')" id="sabado-inicio" value="20:00" required/>
    <input type="time" onchange="showHorasEstudadas('sabado')" id="sabado-fim" value="22:00" required/>
    <span id="sabado-horas-estudadas">--</span><br>

    <input type="checkbox" id="domingo-habilitado">
    <label>Domingo:</label>
    <input type="time" onchange="showHorasEstudadas('domingo')" id="domingo-inicio" value="00:00" required/>
    <input type="time" onchange="showHorasEstudadas('domingo')" id="domingo-fim" value="00:00" required/>
    <span id="domingo-horas-estudadas">--</span><br>

    <br>
    <span id="horasPorSemana">Horas semanais de estudos: ...</span>

    <br>
    <br>

    <h2>Contéudos que você vai estudar</h2>
    <ul id="lista-materias"></ul>

    <button id="btn-comecar">Começar</button>

    <h1>Assuntos semanais</h1>
    <h2 id="segunda_assunto"></h2>
    <h2 id="terca_assunto">Terça-feira:</h2>
    <h2 id="quarta_assunto">Quarta-feira:</h2>
    <h2 id="quinta_assunto">Quinta-feira:</h2>
    <h2 id="sexta_assunto">Sexta-feira:</h2>
    <h2 id="sabado_assunto">Sábado:</h2>
    <h2 id="domingo_assunto">Domingo:</h2>

    <h1 id="totalHorasHoje"></h1>
    <h1 id="etapa-1"></h1>
    <h1 id="etapa-2"></h1>
    <h1 id="etapa-3"></h1>
    <h1 id="etapa-4"></h1>


</body>

</html>`;

beforeEach(() => {
    document.body.innerHTML = html;
})

test('get times input data', () => {
    const { getHorasEstudosPorDia } = require('./../app');
    expect(getHorasEstudosPorDia("segunda")).toBe("4 horas");
    expect(getHorasEstudosPorDia("terca")).toBe("2 horas e 1 minuto");
    expect(getHorasEstudosPorDia("quarta")).toBe("2 horas e 2 minutos");
});

test('convert horas decimal para horas e minutos', () => {
    const { convertHorasParaHorasEMinutos } = require('./../app');
    expect(convertHorasParaHorasEMinutos(1)).toBe("1 hora");
    expect(convertHorasParaHorasEMinutos(2)).toBe("2 horas");
    expect(convertHorasParaHorasEMinutos(2.32)).toBe("2 horas e 19 minutos");
});