const mongoose = require('mongoose')

var userSchema = new mongoose.Schema(
  {
    identifier:
      String
    ,
    link:
      String
    ,
    name:
      String
    ,
    image:
      String
    ,
    model:
      String
    ,
    brand:
      String
    ,
    os:
      String
    ,
    price:
      String
    ,
    screenDia:
      String
    ,
    RAM:
      String
    ,
    internalMemory:
      String
    ,
    backCam:
      String
    ,
    batCapacity:
      String
    ,
    screenRes:
      String
    ,
    screenType:
      String
    ,
    touchSensitive:
      String
    ,
    numberOfColours:
      String
    ,
    numOfCores:
      String
    ,
    processorType:
      String
    ,
    processorDesc:
      String
    ,
    chipset:
      String
    ,
    graphics:
      String
    ,
    internalMemoryExtensions:
      String
    ,
    stabilization:
      String
    ,
    frontCamera:
      String
    ,
    wifi:
      String
    ,
    bluetooth:
      String
    ,
    gps:
      String
    ,
    gpsSpecs:
      String
    ,
    nfc:
      String
    ,
    fastCharge:
      String
    ,
    keyboard:
      String
    ,
    wirelessCharging:
      String
    ,
    simSlot:
      String
    ,
    simSlotType:
      String
    ,
    colours:
      String
    ,
    twoG:
      String
    ,
    threeG:
      String
    ,
    fourG:
      String
    ,
    dimensions:
      String
    ,
    weight:
      String
    ,
    vidReview:
      String
    ,
    professionalReview:
      String
    ,
    professionalReviewOrigin:
      String
    ,
    professionalReviewRating:
      String
    ,
    avgReview: {
      type: Number,
      min: 0,
      max: 5
    },
    commentCount: {
      type: Number,
      min: 0
    },
    comments: [{
      rating: {
        type: Number,
        min: 0,
        max: 5
      },

      title: String,
      review: String,
      reply: [String],

      likes: {
        type: Number,
        min: 0
      },
      dislikes: {
        type: Number,
        min: 0
      }
    }]
  });

module.exports = mongoose.model('Phone', userSchema, 'phones')