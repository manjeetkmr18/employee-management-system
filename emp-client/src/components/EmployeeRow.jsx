import React from 'react';

function EmployeeRow({employee , deleteEmployee}) {

    const query = `mutation DeleteEmployee($id: String!) {
        deleteEmployee(_id: $id) {
            status
            message
        }
      }`

    const handleDelete = (id) => {
        deleteEmployee(query, id);
    };


<<<<<<< HEAD
    return (
        <tr key={employee._id}>
            <td>{employee.FirstName}</td>
            <td>{employee.LastName}</td>
            <td>{employee.Age}</td>
            <td>{new Date(parseInt(employee.DateOfJoining)).toLocaleDateString()}</td>
            <td>{employee.Title}</td>
            <td>{employee.Department}</td>
            <td>{employee.EmployeeType}</td>
            <td>{employee.CurrentStatus === true ? "Working" : "Retired"}</td>
            <td>
                <ul className='actionul'>
                    <li><a href={`/employee-details/${employee._id}`}>Details</a></li>
                    <li>|</li>
                    <li><a href={`/edit-employee/${employee._id}`}>Edit</a></li>
                    <li>|</li>
                    <li><button onClick={handleDelete.bind(this, employee._id)}>Delete</button></li>
                </ul>
            </td>
        </tr>
=======
function EmployeeRow({employee, deleteEmployee}) {

    const query = `mutation DeleteEmployee($id: String!) {
        deleteEmployee(_id: $id) {
            status
            message
        }
      }`

    const handleDelete = (id) => {
        deleteEmployee(query, id);
    };

    return (
        <tr key={employee._id}>
        <td>{employee.FirstName}</td>
        <td>{employee.LastName}</td>
        <td>{employee.Age}</td>
        <td>{new Date(parseInt(employee.DateOfJoining)).toLocaleDateString()}</td>
        <td>{employee.Title}</td>
        <td>{employee.Department}</td>
        <td>{employee.EmployeeType}</td>
        <td>{employee.CurrentStatus === true ? "Working" : "Retired"}</td>
        <td>
            <ul className='actionul'>
                <li><a href={`/employee-details/${employee._id}`}>Details</a></li>
                <li>|</li>
                <li><a href={`/edit-employee/${employee._id}`}>Edit</a></li>
                <li>|</li>
                <li><button onClick={handleDelete.bind(this, employee._id)}>Delete</button></li>
            </ul>
        </td>
    </tr>
>>>>>>> origin/master
    );
}

export default EmployeeRow;