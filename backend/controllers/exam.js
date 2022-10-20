import Exam from '../models/examModel.js'


// sends info for all exams, without attached files
export const getAllExams = async ( req, res, next ) => {
    try {
        const exams = await Exam.find({})

        var examsWithoutFiles=[]

        for (var i=0; i<exams.length; i++) {  // removes file from output array for each exam
            const { file, ...others } = exams[i]._doc
            examsWithoutFiles.push(others)
        }

        res.status(200).json(examsWithoutFiles)

    } catch (err) {
        next(err)
    }
}

// makes a new exam
// TODO - allow coordinated exams to omit file - WARN coordinator/admin in this case!
export const createExam = async ( req, res, next ) => {
    try{
        console.log(req.body, req.file)
        const exam = await Exam.create({
            name: req.body.name, 
            owner: req.body.owner,
        courseNumber: req.body.courseNumber,
        isCoordinated: req.body.isCoordinated,
        standardLength: req.body.standardLength,
        calculator: req.body.calculator,
        notes: req.body.notes,
        other: req.body.other,
        file: {
            data: req.file.buffer, 
            contentType: req.file.mimetype
        }})
        res.status(200).json(exam)
       
    } catch (err) {
        next(err)
    }
}

// sends file for an exam
export const getExamFile = async (req, res, next) => {
    try {
        const exam = await Exam.findOne({_id: req.params._id})

        res.writeHead(200, {'Content-Type': exam.file.contentType})
        res.end(new Buffer.from(exam.file.data, 'base64'))
    } catch (err) {
        next(err)
    }
}

// sends info for an exam, without the file
export const getExamInfo = async (req, res, next) => {
    try {
        const exam = await Exam.findOne({_id: req.params._id})

        const { file, ...others } = exam._doc
        console.log(others)
        res.status(200).json(others)
    } catch (err) {
        next(err)
    }
}