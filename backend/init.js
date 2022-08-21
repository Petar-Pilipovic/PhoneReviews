const mongoose = require('mongoose')
const Phone = require('./models/phone')

mongoose.connect('mongodb://localhost:27017/phones', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log('Error in DB connection: ' + err)
    }
})

const all_phones = require('./all_phones.json')

Phone.insertMany(all_phones, (err, result) => {
    if (err) {
        console.log('Error ' + err)
        process.exit(1)
    }
    else {        
        console.log('Init complete. Exiting...')
        process.exit()
    }
})
