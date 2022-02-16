const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getDogsfromApi = async() => {
    const getdataDogsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
    const dataDogsApi = await getdataDogsApi.data.map(d => {
        return {
            id: d.id,
            name: d.name,
            temperament: d.temperament,
            image: d.image.url,
            heightMax: parseInt(d.height.metric.slice(4).trim()),
            heightMin: parseInt(d.height.metric.slice(0,2).trim()),
            weightMax: parseInt(d.weight.metric.slice(4).trim()),
            weightMin: parseInt(d.weight.metric.slice(0,2).trim()),
            lifespan: d.life_span,

        };
        
    });
    //console.log(dataDogsApi);
    return dataDogsApi;
};

const getDogsfromDB = async() => {
    var dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    //console.log(dogsDB);
    return dogsDB;
};

const getAllDogs = async () => {
    const apiInfoDog = await getDogsfromApi();
    const dbInfoDog = await getDogsfromDB();
    const totalDogsAll = dbInfoDog.concat(apiInfoDog);
    return totalDogsAll;
};

router.get('/dogs', async (req, res) => {
    const { name } = req.query;
    let dogsTotal = await getAllDogs();
    if(name){
        let dogName = await dogsTotal.filter(e => e.name.
            toLowerCase().includes(name));
        dogName.length ? 
        res.status(200).send(dogName):
        res.status(404).send('There is not a dog with that name');
    } else {
        res.status(200).send(dogsTotal)
    }
});

router.get('/temperament', async (req, res) => {
    const tempApi = await getDogsfromApi();
    const temps = tempApi.map(e => {
        return e.temperament});
    const tempsAll = temps.toString().split(/\s*,\s*/).
    filter(e => e !== '');
    //console.log(tempsAll);

    tempsAll.forEach(e => {
        Temperament.findOrCreate({
            where: {name: e}
        })
    })
    const allTemperaments = await Temperament
    .findAll({
            attributes: ['name'],
            order: [['name' , 'ASC']],
            through: {
                attributes: [],
                },
            });
    res.status(200).send(allTemperaments);
});

router.post('/dog', async (req, res) => {
    let { name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        lifespan, 
        temperament,
        image, 
        createdInDb } = req.body;

    let dogCreated = await Dog.create({
        name: name,
        heightMax,
        heightMin,
        weightMax,
        weightMin,
        lifespan,
        image,
        createdInDb,
    });

    let temperamentDB = await Temperament.findAll({
        where: {name : temperament },
    });

    dogCreated.addTemperament(temperamentDB);
    res.status(200).send('Dog sucessfully created');
});

router.get('/dogs/:idRaza', async (req, res) => {
    const idRaza = req.params.idRaza;
    if(idRaza){
        let dogsTotal = await getAllDogs();
        if(dogsTotal){
            let dogId = await dogsTotal.filter(e => e.id == idRaza);
            dogId.length ? 
            res.status(200).json(dogId) :
            res.status(404).send('Id does not exist')
        }
    }
})

module.exports = router;
