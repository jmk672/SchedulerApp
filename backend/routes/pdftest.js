import express from 'express'
import PDFDocument from 'pdfkit' // I want to switch to pdf-lib for merging


// router for exports
const router = express.Router()

router.get('/', (req, res) => {
    const doc = new PDFDocument()



    doc.font('Helvetica-Bold').text("Name:")
    doc.font('Helvetica').text("Leo Alexandroff", {bold: false}).moveDown(1)

    doc.font('Helvetica-Bold').text("Course:")
    doc.font('Helvetica').text("Math 110", {bold: false}).moveDown(1)

    doc.font('Helvetica-Bold').text("Instructor:")
    doc.font('Helvetica').text("Kowalski", {bold: false}).moveDown(1)

    doc.font('Helvetica-Bold').text("Start Time:")
    doc.font('Helvetica').text("October 13, 2:00pm", {bold: false}).moveDown(1)

    doc.font('Helvetica-Bold').text("Time Allowed:")
    doc.font('Helvetica').text("75 minutes", {bold: false}).moveDown(1)

    doc.font('Helvetica-Bold').text("Notes:")
    doc.font('Helvetica').text("One page, handwritten, front and back", {bold: false}).moveDown(1)

    doc.font('Helvetica-Bold').text("Calculator:")
    doc.font('Helvetica').text("Simple Calculator Allowed", {bold: false}).moveDown(1)

    doc.font('Helvetica-Bold').text("Other Comments:")
    doc.font('Helvetica').text("none", {bold: false}).moveDown(1)

    doc.end()
    doc.toString('base64')

    doc.pipe(res)
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment; filename=test.pdf',
    })

    //res.send( doc )  // this wasn't needed, lol

})

export default router