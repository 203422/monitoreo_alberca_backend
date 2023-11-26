const { SerialPort, ReadlineParser } = require('serialport')

const getData = () => {
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

module.exports = { getData }