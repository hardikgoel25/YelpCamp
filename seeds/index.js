const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./SeedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20 + 10)
        const camp = new Campground({
            author: '669ccdd3aeb22780babddf40',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit suscipit voluptatibus consectetur, adipisci ipsam vero? Dolorum, est dolorem voluptatibus accusantium earum laboriosam accusamus ipsa explicabo repellat nobis unde perspiciatis minima.',
            price,
            geometry:
            {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dicad9ny2/image/upload/v1721721220/YelpCamp/dtorwhdruonfn9xmnx1t.jpg',
                    filename: 'YelpCamp/dtorwhdruonfn9xmnx1t',
                },
                {
                    url: 'https://res.cloudinary.com/dicad9ny2/image/upload/v1721721220/YelpCamp/hud1rlbnng8rzrj5evzg.jpg',
                    filename: 'YelpCamp/hud1rlbnng8rzrj5evzg',
                },
            ]
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})