const { SerialPort, ReadlineParser } = require('serialport');
const sensorControllers = require('../controllers/sensors.controller');

const sockets = (io) => {

  io.on('connection', (socket) => {
    const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })
    const parser = new ReadlineParser()

    port.pipe(parser);
    console.log('Usuario conectado');

    parser.on('open', function () {
      console.log('connection is opened');
    });

    parser.on('data', (data) => {
      const lineas = data.split('\n');

      lineas.forEach((linea) => {

        const [nombre, valor] = linea.split(':');

        if (nombre && valor) {
          const nombreLimpio = nombre.trim();
          const valorLimpio = parseFloat(valor.trim());

          switch (nombreLimpio) {
            case 'Temperatura':
              const temperatura = valorLimpio;
              console.log('Temperatura:', temperatura);
              sensorControllers.datosTemperatura(temperatura);
              io.emit('temperatura-data', {
                sensor: 'temperatura',
                value: temperatura
              });
              break;
            case 'Distancia':
              const distancia = valorLimpio;
              console.log('Distancia:', distancia);
              io.emit('agua-data', {
                sensor: 'agua',
                value: 30 - distancia,
              });
              sensorControllers.datosAgua(distancia);
              break;
            case 'Lluvia':
              const valorLluvia = valorLimpio;
              console.log('Valor del sensor de lluvia:', valorLluvia);
              sensorControllers.datosLluvia(valorLluvia);
              io.emit('lluvia-data', {
                sensor: 'lluvia',
                value: valorLluvia
              });
              break;
            case 'Ph':
              const ph = valorLimpio;
              console.log('Ph:', ph);
              io.emit('ph-data', {
                sensor: 'ph',
                value: ph
              });
              sensorControllers.datosPh(ph);
              break;
            default:
              console.log('Nombre desconocido:', nombreLimpio);

          }
        }
      });
    });

    port.on('error', function (error) {
      console.log(error);
    })

    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });
};

module.exports = { sockets };
