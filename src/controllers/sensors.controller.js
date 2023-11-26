const { SerialPort, ReadlineParser } = require('serialport')

const connection = () => {
    // const port = new SerialPort({ path: 'COM10', baudRate: 9600 })
    const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })
    const parser = new ReadlineParser()

    port.pipe(parser);


    parser.on('open', function () {
        console.log('connection is opened');
    });

    parser.on('data', (data) => {
        console.log('Datos recibidos desde Arduino:', data);
        const valoresSensores = data.trim().split(' ');

        // Supongamos que tienes 3 sensores (temperatura, distancia, sensor de lluvia)
        if (valoresSensores.length === 3) {
            const temperatura = parseFloat(valoresSensores[0]);
            const distancia = parseFloat(valoresSensores[1]);
            const valorSensorLluvia = parseInt(valoresSensores[2]);

            console.log('Temperatura:', temperatura);
            console.log('Distancia:', distancia);
            console.log('Valor del sensor de lluvia:', valorSensorLluvia);

            // Puedes realizar operaciones adicionales o enviar estos datos a tu servidor aquí
        } else {
            console.log('Error: Los datos no tienen el formato esperado.');
        }
    });

    port.on('error', function (error) {
        console.log(error);
    })
}

/*
        ------------SIMULACIÓN DE SENSORES-----------------------

*/


// function getRandomArbitrary(min, max) {
//     return Math.random() * (max - min) + min;
// }

// function getRandomChoice(choices) {
//     const randomIndex = Math.floor(Math.random() * choices.length);
//     return choices[randomIndex];
// }

// function simulateSensorData() {
//     // Simulación de datos de sensores
//     const nivelAgua = getRandomArbitrary(0, 200);
//     const temperaturaAgua = getRandomArbitrary(20, 30);
//     const lluvia = getRandomChoice(["Sí", "No"]);
//     const ph = getRandomArbitrary(6.0, 8.0);
//     const actuadorCloro = getRandomChoice(["Activo", "Inactivo"]);

//     // Imprimir datos simulados
//     // console.log(`Nivel de Agua: ${nivelAgua} cm`);
//     datosAgua(nivelAgua);
//     // console.log(`Temperatura del Agua: ${temperaturaAgua} °C`);
//     datosTemperatura(temperaturaAgua);
//     // console.log(`Lluvia: ${lluvia}`);
//     datosPh(ph);
//     // console.log(`Nivel de pH: ${ph}`);
//     // console.log(`Actuador de Cloro: ${actuadorCloro}`);
// }

// // Simular intervalo de tiempo entre lecturas
// setInterval(simulateSensorData, 5000); // 5000 milisegundos = 5 segundos

/*
        ------------SIMULACIÓN DE SENSORES-----------------------

*/

const datosAgua = async (data) => {
    // console.log(`Nivel de Agua: ${data} cm`)

    try {
        const existingNivelAgua = await Agua.findOne();
        if (existingNivelAgua) {
            await Agua.findByIdAndUpdate(existingNivelAgua._id, { valor: data });
        } else {
            const nivelAgua = new Agua({ valor: data });
            await nivelAgua.save();
        }
    } catch (error) {
        console.log(error)
    }
}

const datosTemperatura = async (data) => {
    // console.log(`Temperatura del Agua: ${data} °C`)

    try {
        const existingTemperatura = await Temperatura.findOne();
        if (existingTemperatura) {
            await Temperatura.findByIdAndUpdate(existingTemperatura._id, { valor: data });
        } else {
            const temperatura = new Temperatura({ valor: data });
            await temperatura.save();
        }
    } catch (error) {
        console.log(error);
    }
}

const datosPh = async (data) => {
    // console.log(`Nivel de pH: ${data}`)
}




module.exports = {connection }