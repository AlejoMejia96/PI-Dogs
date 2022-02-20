const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { getAllDogs, getDogsfromApi } = require('./controllers.js')




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    const { name } = req.query;
    let dogsTotal = await getAllDogs();
    if(name){
        let dogName = await dogsTotal.filter(e => e.name.
            toLowerCase().includes(name.toLowerCase()));
        dogName.length ? 
        res.status(200).send(dogName):
        res.status(404).send('There is not a dog with that name');
    } else {
        res.status(200).send(dogsTotal)
    }
});


router.get('/dogs/:idRaza', async (req, res) => {
    const idRaza = req.params.idRaza;
    if(idRaza){
        let dogsTotal = await getAllDogs();
        if(dogsTotal){
            let dogId = await dogsTotal.filter(e => e.id === idRaza);
            dogId.length ? 
            res.status(200).json(dogId) :
            res.status(404).send('Id does not exist')
        }
    }
})


router.get('/temperament', async (req, res) => {
        try{
            const apiTemp = await getDogsfromApi();

            // arreglo con todos los temperamentos como strings:
            
            const temperaments = await apiTemp.map(e =>
            (e.temperament)); 

            /*temperaments=['Active, Playful, Adveturous',
            'Curious, Funny, Fearless',
            'Brave, Playful, Intelligent, Stubborn'] */

            // arreglo con todos los temperamentos separados
            // por coma y espacio. el método flat, crea un nuevo
            // arreglo con TODOS los elementos concatenados:

            const arrayTemp = temperaments.map((temp) => 
            (temp ? temp.split(', ') : null)).flat();

            /* ["Active", "Playful", "Adveturous", "Curious",
            "Funny", "Fearless", "Brave", "Playful", 
            "Intelligent", "Stubborn"] */
            
            // arreglo para dejar temperamentos SIN repetir y no nulos
            // y agregarlos al modelo Temperament:

            const temperamentUnique = [...new Set(arrayTemp)];

            /* ["Active", "Playful", "Adveturous", "Curious", "Funny",
            "Fearless", "Brave", "Intelligent", "Stubborn"] */
            
            temperamentUnique.filter(temp => temp !== null).forEach(
                async (temp) => await Temperament.findOrCreate({
                    where: {temperament: temp},
                })
            );
            const allTemperaments = await Temperament.findAll();
            res.send(allTemperaments);
        } catch (error){
            console.log(error.message);
        }
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

    if(name && heightMin && heightMax && weightMin &&
        weightMax && lifespan && temperament && image){
            let dogCreated = await Dog.create({
                name:name,
                heightMax:parseInt(heightMax),
                heightMin:parseInt(heightMin),
                weightMax:parseInt(weightMax),
                weightMin:parseInt(weightMin),
                lifespan,
                image: image,
                createdInDb: createdInDb,
            })

            let temperamentDB = await Temperament.findAll({
                where: {temperament : temperament },
            });
            dogCreated.addTemperament(temperamentDB);
            res.status(200).send('Dog sucessfully created');

    } else{
        res.status(404).send('Complete all the fields')
    }
});



module.exports = router;
