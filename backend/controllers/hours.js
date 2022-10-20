import Hours from '../models/hoursModel.js'

export const getHours = async ( req, res, next ) => {
    try {
        const hours = await Hours.find({})
        res.status(200).json(hours)
    } catch (err) {
        next(err)
    }
}

export const setHours = async ( req, res, next ) => {
    const { date, startTime, endTime, seats } = req.body

    try{
        const hours = await Hours.create({date, startTime, endTime, seats })
        res.status(200).json(hours)
       
    } catch (err) {
        next(err)
    }
}

export const deleteHours = async ( req, res, next ) => {
    const date = req.params.date

    try {
        const hours = await Hours.findOneAndDelete({date: date})
        res.status(200).json(hours)
    } catch (err) {
        next(err)
    }
}