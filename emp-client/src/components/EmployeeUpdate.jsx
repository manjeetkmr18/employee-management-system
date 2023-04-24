import React, { useState, useEffect } from 'react'

function EmployeeUpdate() {

  let id = window.location.pathname.split('/')[2];

  const [employee, setSingleEmployee] = React.useState('');
  const [status, setCurrentStatus] = React.useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [department, setDepartment] = useState('');
  const [title, setTitle] = useState('');
  const [employeeType, setEmployeeType] = useState('');

  useEffect(() => {

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
      }
    }
    `;

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id } }),
    })
      .then(async (response) => {
        const { data } = await response.json();
        setSingleEmployee(data.single_employee);
        setFirstName(data.single_employee.FirstName);
        setLastName(data.single_employee.LastName);
        setAge(data.single_employee.Age);
        setTitle(data.single_employee.Title);
        setDepartment(data.single_employee.Department);
        setCurrentStatus(data.single_employee.CurrentStatus);
        setDateOfJoining(new Date(parseInt(data.single_employee.DateOfJoining)).toLocaleDateString());
        setEmployeeType(data.single_employee.EmployeeType);
      });
  }, []);


  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStatusChange = (e) => {
    setCurrentStatus(e.target.value);
  };


  const handleSubmit = (e) => {

    e.preventDefault();
    const updatedEmployee = {
      FirstName: firstName,
      LastName: lastName,
      Age: age,
      DateOfJoining: dateOfJoining,
      Department: department,
      Title: title,
      CurrentStatus: status,
    };
    console.log("updated emp", updatedEmployee);

    let updatequery = `
    mutation UpdateEmployee($id: String!, $Title: String, $Department: String, $CurrentStatus: Boolean) {
      updateEmployee(_id: $id, Title: $Title, Department: $Department, CurrentStatus: $CurrentStatus) {
        _id
        Department
        CurrentStatus
        Title
      }
    }
    `;

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: updatequery,
        variables: {
          id: id,
          Title: updatedEmployee.Title,
          Department: updatedEmployee.Department,
          CurrentStatus: updatedEmployee.CurrentStatus === "true" ? true : false
        },
      }),
    })
      .then(
        response => response.json(),
        )
      .then(
        data => console.log(data),
        window.location.href = '/'
      )
      .catch(error => console.error(error));
  }

  return (
    <div className='container'>
      <form className="form-container" width="100%" name="employeeupdate" onSubmit={handleSubmit}>
        <div className="formGroup">
          <div className="form-field">
            <label>First Name</label>
            <input type="text" className="Inputtext" name="FirstName" id="FirstName" placeholder="First Name" value={firstName} disabled />
          </div>
          <div className="form-field">
            <label>Last Name</label>
            <input type="text" className="Inputtext" name="LastName" id="LastName" placeholder="Last Name" value={lastName} disabled />
          </div>
        </div>
        <div className="formGroup">
          <div className="form-field">
            <label>Age</label>
            <input type="number" className="Inputtext" name="Age" id="Age" placeholder="Age" value={age} disabled />
          </div>
          <div className="form-field">
            <label>Date Of Joining</label>
            <input type="text" className="Inputtext" name="DateOfJoining" id="DateOfJoining" placeholder="Date Of Joining" value={dateOfJoining} disabled
            />
          </div>
        </div>
        <div className="formGroup">
          <div className="form-field">
            <label>Job Title</label>
            <select name="Title" className="Inputtext" id="Title" value={title} onChange={handleTitleChange}>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <div className="form-field">
            <label>Department</label>
            <select name="Department" className="Inputtext" id="Department" value={department} onChange={handleDepartmentChange}>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
        </div>
        <div className="formGroup">
          <div className="form-field">
            <label>Employee Type</label>
            <select id="EmployeeType" className="Inputtext" name="EmployeeType" value={
              employeeType
            } disabled>
              <option value="Full-Time">FullTime</option>
              <option value="Part-Time">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
          <div className="form-field">
            <label>Current Status</label>
            <div>
              <input type="radio" name="currentStatus" id="currentStatus1" value="true" checked={status === true} onChange={(e) => setCurrentStatus(true)} />
              <label className="radiolabel" htmlFor="currentStatus1">Working</label>
              <input type="radio" name="currentStatus" id="currentStatus2" value="false" checked={status === false} onChange={(e) => setCurrentStatus(false)} />
              <label htmlFor="currentStatus2" className="radiolabel">Retired</label>
            </div>

          </div>
        </div>
        <div className="btn-field">
          <button type="submit" className="submitButton">Update Employee</button>
        </div>
      </form>
      {/* <h3 style={{ "color": "Red" }}>{errorMessage}</h3> */}
    </div>
  )
}


export default EmployeeUpdate