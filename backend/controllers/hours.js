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

export const batchHours = async (req, res, next) => {
    const { sundayCode, sundayOpen, sundayClose,
        mondayCode, mondayOpen, mondayClose,
        tuesdayCode, tuesdayOpen, tuesdayClose,
        wednesdayCode, wednesdayOpen, wednesdayClose,
        thursdayCode, thursdayOpen, thursdayClose,
        fridayCode, fridayOpen, fridayClose,
        saturdayCode, saturdayOpen, saturdayClose} = req.body

    try {
        // clear week submitted
        await Hours.findOneAndDelete({date: sundayCode})
        await Hours.findOneAndDelete({date: mondayCode})
        await Hours.findOneAndDelete({date: tuesdayCode})
        await Hours.findOneAndDelete({date: wednesdayCode})
        await Hours.findOneAndDelete({date: thursdayCode})
        await Hours.findOneAndDelete({date: fridayCode})
        await Hours.findOneAndDelete({date: saturdayCode})

        if (sundayOpen && sundayClose) {
            await Hours.create({
                date: sundayCode,
                startTime: sundayOpen,
                endTime: sundayClose
            })
        }

        if (mondayOpen && mondayClose) {
            await Hours.create({
                date: mondayCode,
                startTime: mondayOpen,
                endTime: mondayClose
            })
        }

        if (tuesdayOpen && tuesdayClose) {
            await Hours.create({
                date: tuesdayCode,
                startTime: tuesdayOpen,
                endTime: tuesdayClose
            })
        }

        if (wednesdayOpen && wednesdayClose) {
            await Hours.create({
                date: wednesdayCode,
                startTime: wednesdayOpen,
                endTime: wednesdayClose
            })
        }

        if (thursdayOpen && thursdayClose) {
            await Hours.create({
                date: thursdayCode,
                startTime: thursdayOpen,
                endTime: thursdayClose
            })
        }

        if (fridayOpen && fridayClose) {
            await Hours.create({
                date: fridayCode,
                startTime: fridayOpen,
                endTime: fridayClose
            })
        }

        if (saturdayOpen && saturdayClose) {
            await Hours.create({
                date: saturdayCode,
                startTime: saturdayOpen,
                endTime: saturdayClose
            })
        }

        res.status(200).json({message: "Update Successful"})
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

