import { NavLink, useNavigate } from 'react-router-dom'

const AdminNav = () => {
    return(<div class="col-md-3 col-lg-2">
                <nav id="adminSidebar" className='d-lg-block sidebar'>
                    <div class="position-sticky">
                        <div className='list-group list-group-flush mx-3 mt-4'>
                        <NavLink id="createMakeup" className='list-group-item list-group-item-action py-2'  to="/admin"><span>Home</span></NavLink>
                        <a id="createMakeup" className='list-group-item list-group-item-action py-2'  href="#"><span>Schedule Makeup</span></a>
                        <a id="createMakeup" className='list-group-item list-group-item-action py-2'  href="#"><span>Schedule Makeup</span></a>
                        <a id="createMakeup" className='list-group-item list-group-item-action py-2'  href="#"><span>Schedule Makeup</span></a>
                        </div>
                    </div>
                </nav>
            </div>
    )
}

export default AdminNav