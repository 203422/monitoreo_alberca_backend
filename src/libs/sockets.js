const sensorControllers = require('../controllers/sensors.controller');

const sockets = (io) => {

  io.on('connection', (socket) => {
    console.log('Usuario conectado');


    socket.on('data-to-api', (data) => {

      const lineas = data.split('\n');

      lineas.forEach((linea) => {

        const [nombre, valor] = linea.split(':');

        if (nombre && valor) {
          const nombreLimpio = nombre.trim();
          const valorLimpio = parseFloat(valor.trim());

          switch (nombreLimpio) {
            case 'Temperatura':
              const temperatura = valorLimpio;
              // console.log('Temperatura:', temperatura);
              sensorControllers.datosTemperatura(temperatura);
              io.emit('temperatura-data', {
                sensor: 'temperatura',
                value: temperatura
              });
              break;
            case 'Distancia':
              const distancia = valorLimpio;
              // console.log('Distancia:', distancia);
              io.emit('agua-data', {
                sensor: 'agua',
                value: distancia
              });
              sensorControllers.datosAgua(distancia);
              break;
            case 'Lluvia':
              const valorLluvia = valorLimpio;
              // console.log('Valor del sensor de lluvia:', valorLluvia);
              sensorControllers.datosLluvia(valorLluvia);
              io.emit('lluvia-data', {
                sensor: 'lluvia',
                value: valorLluvia
              });
              break;
            case 'Ph':
              const ph = valorLimpio;
              // console.log('Ph:', ph);
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
    })

    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });
};

module.exports = { sockets };
