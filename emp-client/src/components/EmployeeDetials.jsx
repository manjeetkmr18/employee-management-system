import React from 'react'
import Countdown from './RetirementCountdown'

function EmployeeDetials() {

  const [employee, setSingleEmployee] = React.useState('');


  const deletequery = `mutation DeleteEmployee($id: String!) {
    deleteEmployee(_id: $id) {
        status
        message
    }
  }`

  const deleteEmployeefun = async (query, id) => {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables: { id },
        }),
    });
    const res = await response.json();
    if(res.data.deleteEmployee.status === true)
    {
        window.location.href = '/';
    }
    alert(res.data.deleteEmployee.message);
    // window.location.href = '/';
};

  const handleDelete = (id) => {
    deleteEmployeefun(deletequery, id);
  };


  let query = `
  query Single_employee($id: String!) {
    single_employee(_id: $id) {
      _id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
      RetirementDate
    }
  }
  `;

  let id = window.location.pathname.split('/')[2];

  fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { id } }),
  }).then(async (response) => {
    const { data } = await response.json();
    setSingleEmployee(data.single_employee);
    // console.log(data.single_employee);
  }
  );

  const currentStatus = (employee.CurrentStatus ? "Working" : "Retired");
  return (
    <div>
      <h1>Employee Details</h1>
      <div className='container'>
      <table>
        <tr>
          <th>Full Name</th>
          <th>{employee.FirstName} {employee.LastName}</th>
        </tr>
        <tr>
          <th>Age</th>
          <th>{employee.Age}</th>
        </tr>
        <tr>
          <th>Date Of Joining</th>
          <th>{new Date(parseInt(employee.DateOfJoining)).toLocaleDateString()}</th>
        </tr>
        <tr>
          <th>Title</th>
          <th>{employee.Title}</th>
        </tr>
        <tr>
          <th>Department</th>
          <th>{employee.Department}</th>
        </tr>
        <tr>
          <th>EmployeeType</th>
          <th>{employee.EmployeeType}</th>
        </tr>
        <tr>
          <th>Current Status</th>
          <th>{
            currentStatus            
          }</th>
        </tr>
       </table>
          
          <div className='container'>          
          <Countdown retirementDate={new Date(parseInt(employee.RetirementDate)).toLocaleDateString()} />
          </div>
          
       <div className='container detailsbtn'>
       <a href={`/edit-employee/${id}`} className="action-btn">Edit</a>
       <button  onClick={handleDelete.bind(this, id)} className="action-btn">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetials