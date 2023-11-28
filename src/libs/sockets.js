const { SerialPort, ReadlineParser } = require('serialport');
// const { datosAgua, datosTemperatura, datosPh } = require('./controllers/sensors.controller');

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
              // datosTemperatura(temperatura);
              break;
            case 'Distancia':
              const distancia = valorLimpio;
              console.log('Distancia:', distancia);
              // datosAgua(distancia);
              break;
            case 'Lluvia':
              const valorLluvia = valorLimpio;
              console.log('Valor del sensor de lluvia:', valorLluvia);
              break;
            case 'Ph':
              const ph = valorLimpio;
              console.log('Ph:', ph);
              // datosPh(ph);
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

    // const emitSensorData = () => {
    //   // const { nivelAgua, temperaturaAgua, ph, lluvia } = simulateSensorData(); // Obtener los datos simulados
    //   io.emit('ph-data', {
    //     sensor: 'ph',
    //     value: ph
    //   });

    //   io.emit('agua-data', {
    //     sensor: 'agua',
    //     value: nivelAgua
    //   });

    //   io.emit('temperatura-data', {
    //     sensor: 'temperatura',
    //     value: temperaturaAgua
    //   });

    //   io.emit('lluvia-data', {
    //     sensor: 'lluvia',
    //     value: lluvia
    //   });

    //   setTimeout(emitSensorData, 5000); // Esperar 5 segundos antes de la próxima emisión
    // };

    // emitSensorData(); // Iniciar la emisión al conectar

    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });

  // function getRandomArbitrary(min, max) {
  //   return Math.random() * (max - min) + min;
  // }

  // function getRandomChoice(choices) {
  //   const randomIndex = Math.floor(Math.random() * choices.length);
  //   return choices[randomIndex];
  // }

  // function simulateSensorData() {
  //   // Simulación de datos de sensores
  //   const nivelAgua = parseFloat(getRandomArbitrary(0, 200).toFixed(2));
  //   const temperaturaAgua = parseFloat(getRandomArbitrary(20, 30).toFixed(2));
  //   const lluvia = parseFloat(getRandomArbitrary(0, 960).toFixed(2));
  //   const ph = parseFloat(getRandomArbitrary(6.0, 8.0).toFixed(2));
  //   const actuadorCloro = getRandomChoice(["Activo", "Inactivo"]);

  //   console.log(`Agua: ${nivelAgua} cm`);
  //   console.log(`Temperatura: ${temperaturaAgua} °C`);
  //   console.log(`Lluvia: ${lluvia}`);
  //   console.log(`Ph: ${ph}`);

  //   return {
  //     nivelAgua,
  //     temperaturaAgua,
  //     lluvia,
  //     ph,
  //     actuadorCloro
  //   };
  // }
};

module.exports = { sockets };
