/*
        ------------SIMULACIÓN DE SENSORES-----------------------

*/

// const { datosAgua, datosPh } = require("../controllers/sensors.controller");
const sensorsControllers = require('./controllers/sensors.controller');


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomChoice(choices) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function simulateSensorData() {
    // Simulación de datos de sensores
    const nivelAgua = getRandomArbitrary(0, 200);
    const temperaturaAgua = getRandomArbitrary(20, 30);
    const lluvia = 960;
    const ph = getRandomArbitrary(6.0, 8.0);
    const actuadorCloro = getRandomChoice(["Activo", "Inactivo"]);

    // Imprimir datos simulados
    sensorsControllers.datosAgua(nivelAgua);
    console.log(`Agua: ${nivelAgua} cm`);
    
    // datosAgua(nivelAgua);
    // console.log(`Temperatura: ${temperaturaAgua} °C`);
    // datosTemperatura(temperaturaAgua);
    // console.log(`Lluvia: ${lluvia}`);
    // datosPh(ph);
    console.log(`Ph: ${ph}`);
    sensorsControllers.datosAgua(ph);
    




    // datosAgua(nivelAgua);
    // datosPh(ph);
    // console.log(`Actuador de Cloro: ${actuadorCloro}`);

    // io.emit('ph-data', 'DATOS ENVIADOS PH')

    // io.emit('ph-data', 'PHHH');
    // io.on('connection', (socket) => {
    //     console.log('Usuario conectado');
    //     socket.on('disconnect', () => {
    //       console.log('Usuario desconectado');
    //     });
    //   });
}

// Simular intervalo de tiempo entre lecturas
setInterval(simulateSensorData, 5000); //

/*
        ------------SIMULACIÓN DE SENSORES-----------------------

*/

module.exports = { simulateSensorData }