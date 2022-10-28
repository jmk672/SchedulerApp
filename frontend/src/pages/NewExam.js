import useAuthContext from "../auth/useAuthContext"
import { useState, useEffect } from "react"
//import { useNavigate } from "react-router-dom"
import axios from "axios"
import api from "../api"

const NewExam = () => {
        const [users, setUsers] = useState()
        const [courses, setCourses] = useState()
        const [name, setName] = useState('')
        const [owner, setOwner] = useState('')
        const [courseNumber, setCourseNumber] = useState()
        const [isCoordinated, setIsCoordinated] = useState(false)
        const [standardLength, setStandardLength] = useState('')
        const [calculator, setCalculator] = useState('')
        const [notes, setNotes] = useState('')
        const [other, setOther] = useState('')
        const [file, setFile] = useState()
    
        const [error, setError] = useState('')
        const [success, setSuccess] = useState('')
    
        const { token } = useAuthContext()
    
        useEffect(() => {
            const fetch = async ()=> {
                try {
                    const res = await axios.get(api + '/users/',
                    {
                        headers: { Authorization: `Bearer ${token}`,
                                   'Content-Type': 'multipart/form-data' }
                   })
                   if(res.data) setUsers(res.data)
                } catch (err) { setError(err.message) }
            }
            fetch()
        }, [token])

        useEffect(()=> {
            if (users) {
                if (users.find((user)=>(user.id === owner))) {
                    const uniqueCourses = [
                        ...new Set(users.find((user)=>(user.id === owner)).courses.map( course => course.courseNumber ))]
                setCourses(uniqueCourses)
                }}
        }, [owner, users])
    
        const submit = async (event) => {
            event.preventDefault()
            
            try {
                const form = new FormData();

                form.append('name', name)
                form.append('owner', owner)
                form.append('courseNumber', courseNumber)
                form.append('isCoordinated', isCoordinated)
                form.append('standardLength', standardLength)
                if (calculator) form.append('calculator', calculator)
                if (notes) form.append('notes', notes)
                if (calculator) form.append('other', other)
                form.append('file', file)

                const res = await axios.post(api + '/exams', 
                form,
                {
                     headers: { Authorization: `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data' }
                })
                setSuccess(`Exam "${name} created`)
                console.log(res.message)
            } catch (err) {
                setError(err.message)
            }
        }
        
    
        return(
        <div className="row">
        <div className="col-md-1"/>
        <div className="mt-4 mx-2 col-md-8">
            <form onSubmit={e => submit(e)}>
                <div className="row mt-2">
                    <div className="form-outline">
                        {success && 
                        <div className="alert alert-success alert-dismissible fade show my-2" role="alert">
                            {success}
                            {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setSuccess('')}}></button>}
                        </div>}
                    {error && 
                        <div className="alert alert-danger alert-dismissible fade show my-2" role="alert">
                            {error}
                            {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setError('')}}></button>}
                        </div>}
                    </div>
                    <div className="form-outline mb-2">
                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        <label className="form-label" >Exam Name</label>
                    </div>

 
                    <div className="form-outline mb-2">
                        <select className="form-control" value={owner} onChange={e => setOwner(e.target.value)}>
                                <option value=''></option>
                            {users && users.map((listuser) => (
                                <option key={listuser.id} value={listuser.id} >
                                    {listuser.lastName}, {listuser.firstName} ({listuser.id})
                                </option>
                            ))}
                        </select>
                        <label className="form-label" >Owner</label>
                    </div>
                
    
                <div className="form-outline mb-2">
                    <select className="form-control" value={courseNumber} onChange={e => setCourseNumber(e.target.value)}>
                        <option value=''></option>
                            {courses && 
                            courses.map((course) => (
                                <option key={course} value={course} >
                                    {course}
                                </option>
                            ))}
                        </select>
                    <label className="form-label">Course Number</label>
                </div>
            </div>
                <div className="form-check d-flex  my-2">
                    <input className="form-check-input me-2" type="checkbox" checked={isCoordinated} onChange={e => setIsCoordinated(!isCoordinated)} />
                    <label className="form-check-label">
                    Coordinated Exam?
                    </label>
                </div>
            <div className="row mt-2">
                <div className="form-outline mb-2">
                    <input type="number" min="1" className="form-control" value={standardLength} onChange={e => setStandardLength(e.target.value)}/>
                    <label className="form-label">Length in minutes (before any accommodations)</label>
                </div>

                <div className="form-outline mb-2">
                    <input type="text" className="form-control" value={calculator} onChange={e => setCalculator(e.target.value)}/>
                    <label className="form-label">Calculator Policy</label>
                </div>

                <div className="form-outline mb-2">
                    <input type="text" className="form-control" value={notes} onChange={e => setNotes(e.target.value)}/>
                    <label className="form-label">Notes Policy</label>
                </div>

                <div className="form-outline mb-2">
                    <input type="text" className="form-control" value={other} onChange={e => setOther(e.target.value)}/>
                    <label className="form-label">Other instructions (for all students)</label>
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label">Exam pdf</label>
                    <input className="form-control" type="file" onChange={e => setFile(e.target.files[0])}/>
                </div>
            </div>
                <button disabled={!name || !owner || !standardLength || !file} type="submit" className="btn btn-primary btn-block mb-4">Add Exam</button>
            </form>
        </div>
        </div>
        )
    }

export default NewExam