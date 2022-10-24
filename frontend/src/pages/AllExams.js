import { useEffect, useState } from "react"
import useAuthContext from "../auth/useAuthContext"
import axios from "axios"
import api from "../api"
import _ from 'lodash'
import { VscFilePdf, VscTrash } from 'react-icons/vsc'

const AllExams = () => {

    const {  token } = useAuthContext()
    const [error, setError] = useState()
    const [data, setData] = useState()

    useEffect( () => {
        const fetchExams = async () => {
        try {
            const res = await axios.get(api + '/exams/',
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            setData(_.sortBy(res.data,['owner']))
        } catch (err) {
            setError(err.response.data.message)
        }
    }
    fetchExams()
    },[token])

    const deleteExam = async (id, name) => {
        try { 
            await axios.delete(api + '/exams/' + id,
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        setError(`Exam "${name}" deleted`)
        setData(data.filter(exam => exam._id !== id))
        }
        catch (err) {
            setError(err.message)
        }
    }

    return(
        <div className="container mx-2 my-4">
            {error && 
                <div className="alert alert-danger alert-dismissible fade show my-1" role="alert">
                    {error}
                    {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setError('')}}></button>}
                </div>}
            <ul className="list-group">
                {data && data.map((listexam) => (
                <li className="list-group-item d-flex" key={listexam._id}>
                    <div className="col-3">{listexam.owner}</div>
                    <div className="col-3">{listexam.name}</div>
                    <div className="col-5">
                        <div >Course: Math {listexam.courseNumber}</div>
                        {listexam.isCoordinated && <div className="text-danger">Coordinated</div>}
                        <div>Length: {listexam.standardLength}</div>
                        <div>Calculator: {listexam.calculator}</div>
                        <div>Notes: {listexam.notes}</div>
                        <div>Other: {listexam.calculator}</div>
                        <div><button type="button" className="btn btn-outline-success"><VscFilePdf/></button></div>
                    </div>
                    <div className="col-1"><button type="button" className="btn btn-outline-danger" onClick={()=>deleteExam(listexam._id, listexam.name)}><VscTrash/></button></div>
                </li>
                ))}
            </ul>
            <div className="alert alert-warning my-2" role="alert">Note: Deleting an Exam during the semester is probably a bad idea!</div>
        </div>
    )
}

export default AllExams