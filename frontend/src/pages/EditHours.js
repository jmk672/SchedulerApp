import useAuthContext from "../auth/useAuthContext"
import { useState, useEffect } from "react"
import axios from "axios"
import api from "../api"
import _ from 'lodash'
import { VscAdd } from "react-icons/vsc"

const SetHours = () => {
    const { token } = useAuthContext()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [data, setData] = useState()
    const [activeWeek, setActiveWeek] = useState()
    const [weeksArray, setWeeksArray] = useState()
    const [sundayOpen, setSundayOpen] = useState()
    const [sundayClose, setSundayClose] = useState()
    const [mondayOpen, setMondayOpen] = useState()
    const [mondayClose, setMondayClose] = useState()
    const [tuesdayOpen, setTuesdayOpen] = useState()
    const [tuesdayClose, setTuesdayClose] = useState()
    const [wednesdayOpen, setWednesdayOpen] = useState()
    const [wednesdayClose, setWednesdayClose] = useState()
    const [thursdayOpen, setThursdayOpen] = useState()
    const [thursdayClose, setThursdayClose] = useState()
    const [fridayOpen, setFridayOpen] = useState()
    const [fridayClose, setFridayClose] = useState()
    const [saturdayOpen, setSaturdayOpen] = useState()
    const [saturdayClose, setSaturdayClose] = useState()

    // I don't think we need to fetch the current data. This can just overwrite the hours...
    //
    // useEffect( () => {
    //     const fetch = async () => {
    //     try {
    //         const res = await axios.get(api + '/hours/',
    //             {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             })
    //         setData(_.sortBy(res.data,['date']))
    //     } catch (err) {
    //         setError(err.response.data.message)
    //     }
    // }
    // fetch()
    // },[token])

    const toLocaleISO = (day) => {
        const str = day.toLocaleDateString()
        const [month, date, year ] = str.split('/')
        return(year+'-'+month+'-'+date)
    }

    const submit = async (e) => {
        e.preventDefault()

        console.log(JSON.stringify({
            sundayCode: weeksArray.find((week) => week.sundayCode === activeWeek).sundayCode, 
            sundayOpen: sundayOpen, 
            sundayClose: sundayClose,
            mondayCode: weeksArray.find((week) => week.sundayCode === activeWeek).mondayCode,
            mondayOpen: mondayOpen, 
            mondayClose: mondayClose,
            tuesdayCode: weeksArray.find((week) => week.sundayCode === activeWeek).tuesdayCode,
            tuesdayOpen: tuesdayOpen, 
            tuesdayClose: tuesdayClose,
            wednesdayCode: weeksArray.find((week) => week.sundayCode === activeWeek).wednesdayCode,
            wednesdayOpen: wednesdayOpen, 
            wednesdayClose: wednesdayClose,
            thursdayCode: weeksArray.find((week) => week.sundayCode === activeWeek).thursdayCode,
            thursdayOpen: thursdayOpen, 
            thursdayClose: thursdayClose,
            fridayCode: weeksArray.find((week) => week.sundayCode === activeWeek).fridayCode,
            fridayOpen: fridayOpen, 
            fridayClose: fridayClose,
            saturdayCode: weeksArray.find((week) => week.sundayCode === activeWeek).saturdayCode,
            saturdayOpen: saturdayOpen, 
            saturdayClose: saturdayClose,
            
        }))
        // try {

        //     const courseArray = activeUserObject.courses.filter( (course) => (course.courseNumber && course.sectionNumber))
        //     const res = await axios.patch(api + '/users/' + activeUser,
        //     { courses: courseArray },
        //     {
        //         headers: { Authorization: `Bearer ${token}` }
        //     })
            
        //     setActiveUser('')
        //     const tempdata = data.map((u, i) => {
        //         if (u.id===activeUser) {
        //             const {courses, ...rest} = u
        //             return {courses: courseArray, ...rest}}
        //         return u
        //     }
        //     )
        //     setData(tempdata)
        //     console.log(res)
        //     setSuccess(`Updated user ${res.data.id}`)
        // }
        // catch (err) {
        //     console.log(err)
        //     setError(err.message)
        // }
    }


    useEffect ( ()=> {
        const today = new Date()

        var nextSunday = new Date()
        if (today.getDay()===0) { nextSunday = today}
        else { nextSunday.setDate(today.getDate()+7-today.getDay())}

        var nextMonday = new Date()
        var nextTuesday = new Date()
        var nextWednesday = new Date()
        var nextThursday = new Date()
        var nextFriday = new Date()
        var nextSaturday = new Date()
        nextMonday.setDate(nextSunday.getDate()+1)
        nextTuesday.setDate(nextSunday.getDate()+2)
        nextWednesday.setDate(nextSunday.getDate()+3)
        nextThursday.setDate(nextSunday.getDate()+4)
        nextFriday.setDate(nextSunday.getDate()+5)
        nextSaturday.setDate(nextSunday.getDate()+6)

        var tempArray = []

        for (var i=0; i<30; i++) {
            tempArray.push({
                sunday: nextSunday.toDateString(),
                sundayCode: toLocaleISO(nextSunday),
                mondayCode: toLocaleISO(nextMonday),
                tuesdayCode: toLocaleISO(nextTuesday),
                wednesdayCode: toLocaleISO(nextWednesday),
                thursdayCode: toLocaleISO(nextThursday),
                fridayCode: toLocaleISO(nextFriday),
                saturdayCode: toLocaleISO(nextSaturday),
                saturday: nextSaturday.toDateString()
            })
            toLocaleISO(nextSunday)
            nextSunday.setDate(nextSunday.getDate()+7)
            nextSaturday.setDate(nextSaturday.getDate()+7)
            }

            setWeeksArray(tempArray)

        }, []
    )

    return (
        <div className="row">
        <div className="col-md-1"/>
        <div className="mt-4 mx-2 col-md-10">
             {error && 
                <div className="alert alert-danger alert-dismissible fade show my-1" role="alert">
                    {error}
                    {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setError('')}}></button>}
                </div>}
            {success && 
                <div className="alert alert-success alert-dismissible fade show my-1" role="alert">
                    {success}
                    {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setSuccess('')}}></button>}
                </div>}
            <form onSubmit={e => submit(e)}>
                <div className="form-group">
                    <label> Week: </label>
                    <select className="form-control" value={activeWeek} onChange={e => {
                        setActiveWeek(e.target.value)
                        //resetAll()
                    }}>
                            <option value=''></option>
                        {weeksArray && weeksArray.map((week) => (
                            <option key={week.sundayCode} value={week.sundayCode} >
                                {week.sunday} -- {week.saturday}
                            </option>
                        ))}
                    </select>

                    {activeWeek &&
                    <div className="row">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label mt-2 mb-1" >Sun. Open</label>
                                <select className="form-control" value={sundayOpen} onChange={e => setSundayOpen(e.target.value)} >
                                    <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                                <label className="form-label mt-2 mb-1" >Sun. Close</label>
                                <select className="form-control" value={sundayClose} onChange={e => setSundayClose(e.target.value)}>
                                    <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label mt-2 mb-1" >Mon. Open</label>
                                <select className="form-control" value={mondayOpen} onChange={e => setMondayOpen(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                                <label className="form-label mt-2 mb-1" >Mon. Close</label>
                                <select className="form-control" value={mondayClose} onChange={e => setMondayClose(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label mt-2 mb-1" >Tues. Open</label>
                                <select className="form-control" value={tuesdayOpen} onChange={e => setTuesdayOpen(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                                <label className="form-label mt-2 mb-1" >Tues. Close</label>
                                <select className="form-control" value={tuesdayClose} onChange={e => setTuesdayClose(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label mt-2 mb-1" >Wed. Open</label>
                                <select className="form-control" value={wednesdayOpen} onChange={e => setWednesdayOpen(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                                <label className="form-label mt-2 mb-1" >Wed. Close</label>
                                <select className="form-control" value={wednesdayClose} onChange={e => setWednesdayClose(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label mt-2 mb-1" >Thurs. Open</label>
                                <select className="form-control" value={thursdayOpen} onChange={e => setThursdayOpen(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                                <label className="form-label mt-2 mb-1" >Thurs. Close</label>
                                <select className="form-control" value={thursdayClose} onChange={e => setThursdayClose(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label mt-2 mb-1" >Fri. Open</label>
                                <select className="form-control" value={fridayOpen} onChange={e => setFridayOpen(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                                <label className="form-label mt-2 mb-1" >Fri. Close</label>
                                <select className="form-control" value={fridayClose} onChange={e => setFridayClose(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label mt-2 mb-1" >Sat. Open</label>
                                <select className="form-control" value={saturdayOpen} onChange={e => setSaturdayOpen(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                                <label className="form-label mt-2 mb-1" >Sat. Close</label>
                                <select className="form-control" value={saturdayClose} onChange={e => setSaturdayClose(e.target.value)} >
                                <option value =''></option>
                                    <option value ='700'>7 am</option>
                                    <option value ='800'>8 am</option>
                                    <option value ='900'>9 am</option>
                                    <option value ='1000'>10 am</option>
                                    <option value ='1100'>11 am</option>
                                    <option value ='1200'>noon</option>
                                    <option value ='1300'>1 pm</option>
                                    <option value ='1400'>2 pm</option>
                                    <option value ='1500'>3 pm</option>
                                    <option value ='1600'>4 pm</option>
                                    <option value ='1700'>5 pm</option>
                                    <option value ='1800'>6 pm</option>
                                    <option value ='1900'>7 pm</option>
                                </select>
                            </div>
                        </div>
                    </div>}

                </div>
                <button disabled={!activeWeek} type="submit" className="btn btn-primary btn-block my-1">Update</button>
            </form>
            <div className="alert alert-warning my-2 p-3" role="alert">Note: This will overrite any previously saved hours.</div>
            <div className="alert alert-warning my-2 p-3" role="alert">Any day without both an open and close time will not be saved.</div>
        </div>
        </div>
    )
}

export default SetHours