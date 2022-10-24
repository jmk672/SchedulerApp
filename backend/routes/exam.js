import express from 'express'
import { createExam, getAllExams, getExamFile, getExamInfo, deleteExam } from '../controllers/exam.js'

// handles file uploads
import multer from 'multer'
import { verifyAdmin, verifyToken } from '../utils/verifyToken.js'
const storage = multer.memoryStorage()
const upload = multer({storage: storage})


// router for exports

const router = express.Router()

router.get('/', verifyAdmin, getAllExams) // do not send files with this one!!

router.post('/', verifyToken, upload.single('file'), createExam)

router.get('/file/:_id', verifyToken, getExamFile)

router.get('/info/:_id', verifyToken, getExamInfo)

router.delete('/:_id', verifyAdmin, deleteExam)


export default router