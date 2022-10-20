import express from 'express'
import { createExam, getAllExams, getExamFile, getExamInfo } from '../controllers/exam.js'

// handles file uploads
import multer from 'multer'
import { verifyAdmin } from '../utils/verifyToken.js'
const storage = multer.memoryStorage()
const upload = multer({storage: storage})


// router for exports

const router = express.Router()

router.get('/', getAllExams) // do not send files with this one!!

router.post('/', upload.single('file'), createExam)

router.get('/file/:_id', verifyAdmin, getExamFile)

router.get('/info/:_id', getExamInfo)

// router.delete('/:id', deleteExam)


export default router