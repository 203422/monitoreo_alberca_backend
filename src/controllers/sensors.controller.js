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
        // Dividir la cadena en líneas
        const lineas = data.split('\n');

        // Procesar cada línea
        lineas.forEach((linea) => {
            // Dividir cada línea en nombre y valor
            const [nombre, valor] = linea.split(':');

            // Limpiar espacios alrededor del nombre y el valor
            const nombreLimpio = nombre.trim();
            const valorLimpio = parseFloat(valor.trim());

            // Guardar los datos en variables según el nombre
            switch (nombreLimpio) {
                case 'Temperatura':
                    const temperatura = valorLimpio;
                    console.log('Temperatura:', temperatura);
                    // Puedes hacer más cosas con la variable 'temperatura' aquí
                    break;
                case 'Distancia':
                    const distancia = valorLimpio;
                    console.log('Distancia:', distancia);
                    // Puedes hacer más cosas con la variable 'distancia' aquí
                    break;
                case 'Lluvia':
                    const valorLluvia = valorLimpio;
                    console.log('Valor del sensor de lluvia:', valorLluvia);
                    // Puedes hacer más cosas con la variable 'valorLluvia' aquí
                    break;
                case 'Ph':
                    const ph = valorLimpio;
                    console.log('Ph:', ph);
                    // Puedes hacer más cosas con la variable 'ph' aquí
                    break;
                default:
                    console.log('Nombre desconocido:', nombreLimpio);
            }
        });
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




module.exports = { connection }