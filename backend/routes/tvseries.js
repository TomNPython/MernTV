const router = require('express').Router();

let TVSeries = require('../models/tvseries.model')

router.get('/', (req, res) => {
    TVSeries.find()
        .then(series => res.json(series))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/add', (req, res) => {
    const username = req.body.username
    const title = req.body.title
    const description = req.body.description
    const stars = Number(req.body.stars)
    const date = Date.parse(req.body.date)

    const newSeries = new TVSeries({
        username, 
        title, 
        description, 
        stars, 
        date
    })

    newSeries.save()
        .then(() => res.json('Series added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.get('/:id', (req, res) => {
    TVSeries.findById(req.params.id)
        .then(series => res.json(series))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.delete('/:id', (req, res) => {
    TVSeries.findByIdAndDelete(req.params.id)
        .then(() => res.json('Series deleted!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/update/:id', (req, res) => {
    TVSeries.findById(req.params.id)
        .then(series => {
            series.username = req.body.username,
            series.title = req.body.title,
            series.description = req.body.description,
            series.stars = Number(req.body.stars),
            series.date = Date.parse(req.body.date)

            series.save()
                .then(() => res.json('Series updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router