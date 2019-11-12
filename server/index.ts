import Kitty from '../models/kittyModel'

;(async () => {
    const felyne = new Kitty({
        name: 'Felyne'
    })
    await felyne.save((err, fluffy) => {
        if (err) throw err
        fluffy.meow()
    })

    await Kitty.find({
        name: /^fluff/
    }, (err, result) => {
        if (err) throw err
        console.log(result)
    })
})()
