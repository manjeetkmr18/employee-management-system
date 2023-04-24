import React from 'react'
import { Link, BrowserRouter } from 'react-router-dom';
import PageRoutes from './PageRoutes';

function Menu() {
  return (
    <div>
        <BrowserRouter>
        <nav>
            <ul className='navbar'>
            <li className='navlink'><Link to="/">Home</Link></li>
            <li className='navlink'><Link to="/add-employee">Add Employee</Link></li> 
            <li className='navlink'><Link to="/upcoming-retirements">Upcoming Retirements</Link></li>
            </ul>
            <PageRoutes />
        </nav>
        </BrowserRouter>

    </div>
  )
}


export default Menu