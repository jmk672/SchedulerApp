import useAuthContext from "../auth/useAuthContext"
import { useState, useEffect } from "react"
import axios from "axios"
import api from "../api"
import _ from 'lodash'
import { VscTrash } from "react-icons/vsc"

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
    const [update, setUpdate] = useState(false)

    // Fetch current data for display
    //
    useEffect( () => {
        const fetch = async () => {
        try {
            const res = await axios.get(api + '/hours/',
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            setData(_.sortBy(res.data,['date']))
        } catch (err) {
            setError(err.response.data.message)
        }
    }
    fetch()
    setUpdate(false)
    },[token, update])

    const toLocaleISO = (day) => {
        const str = day.toLocaleDateString()
        const [month, date, year ] = str.split('/')
        return(year+'-'+month+'-'+date)
    }

    const submit = async (e) => {
        e.preventDefault()

        const postData = {
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
        }
        try {

            const res = await axios.post(api + '/hours/batch',
            postData,
            {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log(res)
            setSuccess(`Updated hours`)
            setUpdate(true)
        }
        catch (err) {
            console.log(err)
            setError(err.message)
        }
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

        for (var i=0; i<25; i++) {
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

            nextSunday.setDate(nextSunday.getDate()+7)
            nextMonday.setDate(nextMonday.getDate()+7)
            nextTuesday.setDate(nextTuesday.getDate()+7)
            nextWednesday.setDate(nextWednesday.getDate()+7)
            nextThursday.setDate(nextThursday.getDate()+7)
            nextFriday.setDate(nextFriday.getDate()+7)
            nextSaturday.setDate(nextSaturday.getDate()+7)
            }

            setWeeksArray(tempArray)

        }, []
    )

    const deleteWeek = async (week) => {
        try {
            const postData = {
                sundayCode: week.sundayCode,
                mondayCode: week.mondayCode,
                tuesdayCode: week.tuesdayCode,
                wednesdayCode: week.wednesdayCode,
                thursdayCode: week.thursdayCode,
                fridayCode: week.fridayCode,
                saturdayCode: week.saturdayCode,
            }
            const res = await axios.post(api + '/hours/batch',
            postData,
            {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log(res)
            setSuccess(`Deleted hours`)
            setUpdate(true)
        }
        catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    return (
        <div className="row">
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

            {data && weeksArray.map((week) => {
                const sundayHours = data.find( e => e.date === week.sundayCode)
                    
                const mondayHours = data.find( e => e.date === week.mondayCode)
                const tuesdayHours = data.find( e => e.date === week.tuesdayCode)
                const wednesdayHours = data.find( e => e.date === week.wednesdayCode)
                const thursdayHours = data.find( e => e.date === week.thursdayCode)
                const fridayHours = data.find( e => e.date === week.fridayCode)
                const saturdayHours = data.find( e => e.date === week.saturdayCode)
                
                if (sundayHours || mondayHours || tuesdayHours || wednesdayHours || thursdayHours || fridayHours || saturdayHours)
                return (<div key = {week.sundayCode}><div className="row m-2 p-1 border">{week.sunday} through {week.saturday}</div>
                        <div className="m-2 p-1 row border">
                        <div className="col">
                            <div>Sunday</div>
                            {sundayHours && <div>{sundayHours.startTime} to {sundayHours.endTime}</div>}
                        </div>
                        <div className="col">
                            <div>Monday</div>
                            {mondayHours && <div>{mondayHours.startTime} to {mondayHours.endTime}</div>}
                        </div>
                        <div className="col">
                            <div>Tuesday</div>
                            {tuesdayHours && <div>{tuesdayHours.startTime} to {tuesdayHours.endTime}</div>}
                        </div>
                        <div className="col">
                            <div>Wednesday</div>
                            {wednesdayHours && <div>{wednesdayHours.startTime} to {wednesdayHours.endTime}</div>}
                        </div>
                        <div className="col">
                            <div>Thursday</div>
                            {thursdayHours && <div>{thursdayHours.startTime} to {thursdayHours.endTime}</div>}
                        </div>
                        <div className="col">
                            <div>Friday</div>
                            {fridayHours && <div>{fridayHours.startTime} to {fridayHours.endTime}</div>}
                        </div>
                        <div className="col">
                            <div>Saturday</div>
                            {saturdayHours && <div>{saturdayHours.startTime} to {saturdayHours.endTime}</div>}
                        </div>
                        <div className="col-1"><button type="button" className="btn btn-outline-danger" onClick={()=>deleteWeek(week)}><VscTrash/></button></div>
                    </div>
                    </div>)
                else return <div key = {week.sundayCode} className="row"/>
            })}
        </div>
        </div>
    )
}

export default SetHours