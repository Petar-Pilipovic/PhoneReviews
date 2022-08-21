const express = require('express')
const router = express.Router()
const Phone = require('../models/phone')

// GET sve
router.get('/', async(req, res) => {
    try {
        console.log("GET request received") // debug
        let phones = await Phone.find()
        res.json(phones)
    } catch (error) {
        res.send('Error ' + err)
    }
})

// Telefon po ID, koristi script.js
router.get('/:id', async(req, res) => {
    try {
        console.log("GET (:id) request received")
        let phone = await Phone.findById(req.params.id)
        res.json(phone)
    } catch (error) {
        res.send('No model by that name was found.\nReported error - ' + error)
    }
})

// likes i dislikes
router.patch('/ld/:id/:idKom', async(req, res) => {
    try {
        let temp = await Phone.findById(req.params.id)
        let c = temp.comments
        let idx = -1
        for (let i = 0; i < c.length; i++) {
            let retComp = (c[i]._id).toString()
            if (retComp.localeCompare(req.params.idKom) == 0) {
                idx = i
                break
            }
        }
        if (idx == -1) {
            console.log("It's -1")
            return
        }
        // return retComp.localeCompare(req.params.idKom)
        let myQuery = {"comments._id": idx}
        if (req.body.isLike){
            console.log('PATCH (like) request received')
            temp.comments[idx].likes++
            await temp.save() 
        } else {
            console.log('PATCH (dislike) request received')
            temp.comments[idx].dislikes++
            await temp.save() 
        }
        // debug: res.send(await Phone.find(myQuery))
        res.send('Success')
        console.log("Patch (ld) finished")
    } catch (error) {
        console.log(error)
    }
})

// Za Advanced Rest Client / ARC
router.post('/', async(req, res) => {
    console.log('POST request received')
    let phone = new Phone({
        identifier: req.body.identifier,
        link: req.body.link,
        name: req.body.name,
        image: req.body.image,
        model: req.body.model,
        brand: req.body.brand,
        os: req.body.os,
        price: req.body.price,
        screenDia: req.body.screenDia,
        RAM: req.body.RAM,
        internalMemory: req.body.internalMemory,
        backCam: req.body.backCam,
        batCapacity: req.body.batCapacity,
        screenRes: req.body.screenRes,
        screenType: req.body.screenType,
        touchSensitive: req.body.touchSensitive,
        numberOfColours: req.body.numberOfColours,
        numOfCores: req.body.numOfCores,
        processorType: req.body.processorType,
        processorDesc: req.body.processorDesc,
        chipset: req.body.chipset,
        graphics: req.body.graphics,
        internalMemoryExtensions: req.body.internalMemoryExtensions,
        stabilization: req.body.stabilization,
        frontCamera: req.body.frontCamera,
        wifi: req.body.wifi,
        bluetooth: req.body.bluetooth,
        gps: req.body.gps,
        gpsSpecs: req.body.gpsSpecs,
        nfc: req.body.nfc,
        fastCharge: req.body.fastCharge,
        keyboard: req.body.keyboard,
        wirelessCharging: req.body.wirelessCharging,
        simSlot: req.body.simSlot,
        simSlotType: req.body.simSlotType,
        colours: req.body.colours,
        twoG: req.body.twoG,
        threeG: req.body.threeG,
        fourG: req.body.fourG,
        dimensions: req.body.dimensions,
        weight: req.body.weight,

        vidReview: req.body.vidReview,
        professionalReview: req.body.professionalReview,
        professionalReviewOrigin: req.body.professionalReviewOrigin,
        professionalReviewRating: req.body.professionalReviewRating,
        
        comments: req.body.comments
    })
    try {
        let p1 = await phone.save()
        res.json(p1)
    } catch (error) {
        res.send('Error ' + error)
    }
})

// Dodavanje reply
router.patch('/reply/:id', async(req, res) => {
    try {
        console.log("PATCH (reply) request received")
        let myQuery = {"comments._id": req.params.id}
        await Phone.findOneAndUpdate(myQuery, {$push: {"comments.$.reply": req.body.myReply}}, {useFindAndModify: false})
        res.send('Success')
    } catch (error) {
        res.send(error)
    }
})

// Dodavanje komentara
router.post('/:id/comment', async(req, res) => {
    try {
        console.log('POST (comment) request received')
        let phone = await Phone.findById(req.params.id)
        let commentJSON = {rating: req.body.rating, title: req.body.title, review: req.body.review, likes: 0, dislikes: 0, reply: ""}
        phone.comments.push(commentJSON)
        await phone.save()
        console.log(phone)
        res.send('Success')
    } catch (error) {
        res.send('Error: ' + error)
    }
})

module.exports = router