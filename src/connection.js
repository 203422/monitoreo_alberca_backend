const { SerialPort, ReadlineParser } = require('serialport');

const getData = () => {
    // const port = new SerialPort({ path: 'COM10', baudRate: 9600 })
    const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })
    const parser = new ReadlineParser()

    port.pipe(parser);


    parser.on('open', function () {
        console.log('connection is opened');
    });

 parser.on('data', (data) => {
        const lineas = data.split('\n');

        lineas.forEach((linea) => {
            
            const [nombre, valor] = linea.split(':');

            const nombreLimpio = nombre.trim();
            const valorLimpio = parseFloat(valor.trim());

            switch (nombreLimpio) {
                case 'Temperatura':
                    const temperatura = valorLimpio;
                    console.log('Temperatura:', temperatura);
                    break;
                case 'Distancia':
                    const distancia = valorLimpio;
                    console.log('Distancia:', distancia);
                    break;
                case 'Lluvia':
                    const valorLluvia = valorLimpio;
                    console.log('Valor del sensor de lluvia:', valorLluvia);
                    break;
                case 'Ph':
                    const ph = valorLimpio;
                    console.log('Ph:', ph);
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