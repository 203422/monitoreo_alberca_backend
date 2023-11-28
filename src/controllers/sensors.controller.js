const Agua = require('../models/agua');
const Temperatura = require('../models/temperatura');
const Ph = require('../models/ph');
const Lluvia = require('../models/lluvia');

const datosAgua = async (data) => {

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
    try {
        const existingPh = await Ph.findOne();
        if (existingPh) {
            await Ph.findByIdAndUpdate(existingPh._id, { valor: data });
        } else {
            const ph = new Ph({ valor: data });
            await ph.save();
        }
    } catch (error) {
        console.log(error)
    }
}

const datosLluvia = async (data) => {
    try {
        const existingLluvia = await Lluvia.findOne();
        if (existingLluvia) {
            await Lluvia.findByIdAndUpdate(existingLluvia._id, { valor: data });
        } else {
            const lluvia = new Lluvia({ valor: data });
            await lluvia.save();
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { datosAgua, datosTemperatura, datosPh, datosLluvia }


