import React from 'react'

function EmployeeCreate() {
    // const navigate = useNavigate();
    const NewEmployee = async (employee) => {
        let query = `
        mutation AddEmployee($FirstName: String!, $LastName: String!, $Age: Int!, $DateOfJoining: String!, $Title: String!, $Department: String!, $EmployeeType: String!, $CurrentStatus: Boolean!) {
            addEmployee(FirstName: $FirstName, LastName: $LastName, Age: $Age, DateOfJoining: $DateOfJoining, Title: $Title, Department: $Department, EmployeeType: $EmployeeType, CurrentStatus: $CurrentStatus) {
                status
                message
            }
          }`;

          fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: {
                FirstName: employee.FirstName,
                LastName: employee.LastName,
                Age: parseInt(employee.Age),
                DateOfJoining: employee.DateOfJoining,
                Title: employee.Title,
                Department: employee.Department,
                EmployeeType: employee.EmployeeType,
                CurrentStatus: employee.CurrentStatus === "true" ? true : false
             }}),
        }).then(async (response) => {
            const { data } = await response.json();
            if(data.addEmployee.status === true)
            {
                alert(data.addEmployee.message);
                // form.reset();
                window.location.href = "/";
            }
            else{
                alert(data.addEmployee.message);
            }
        //    fetchData();
        });
        };


    const [errorMessage, setErrorMessage] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.forms.employeeAdd;

        const employee = {
            FirstName: form.FirstName.value,
            LastName: form.LastName.value,
            Age: parseInt(form.Age.value),
            DateOfJoining: form.DateOfJoining.value,
            Title: form.Title.value,
            Department: form.Department.value,
            EmployeeType: form.EmployeeType.value,
            CurrentStatus: form.currentStatus.value
        };
        if(employee.FirstName === "" || employee.LastName === "" || employee.Age === "" || employee.DateOfJoining === "" || employee.Title === "" || employee.Department === "" || employee.EmployeeType === "" || employee.CurrentStatus === ""){
            setErrorMessage("Please fill all the fields");
        }
        else if(employee.Age < 20 || employee.Age > 70){
            setErrorMessage("Age Must be number and between 20 and 70");
        }
        else{
            NewEmployee(employee);
            // form.reset();
            setErrorMessage("");
            // navigate("/");
        }
    };

    return (
        <div className='container'>
            <form className="form-container" width="100%" name="employeeAdd" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <div className="form-field">
                        <label>First Name</label>
                        <input type="text" className="Inputtext" name="FirstName" id="FirstName" placeholder="First Name" required />
                    </div>
                    <div className="form-field">
                        <label>Last Name</label>
                        <input type="text" className="Inputtext" name="LastName" id="LastName" placeholder="Last Name" required />
                    </div>
                </div>
                <div className="formGroup">
                    <div className="form-field">
                        <label>Age</label>
                        <input type="number" className="Inputtext" name="Age" id="Age" placeholder="Age" required />
                    </div>
                    <div className="form-field">
                        <label>Date Of Joining</label>
                        <input type="date" className="Inputtext" name="DateOfJoining" id="DateOfJoining" placeholder="Date Of Joining" required />
                    </div>
                </div>
                <div className="formGroup">
                    <div className="form-field">
                        <label>Job Title</label>
                        <select name="Title" className="Inputtext" id="Title" required>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                            <option value="VP">VP</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Department</label>
                        <select name="Department" className="Inputtext" id="Department" required>
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
                        <select id="EmployeeType" className="Inputtext" name="EmployeeType" required>
                        <option value="Full-Time">FullTime</option>
                        <option value="Part-Time">PartTime</option>
                        <option value="Contract">Contract</option>
                        <option value="Seasonal">Seasonal</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Current Status</label>
                        <input type="radio" name="currentStatus" id="currentStatus1" value="true" defaultChecked />
                        <label className="radiolabel" htmlFor="currentStatus1">Working</label>
                        <input type="radio" name="currentStatus" id="currentStatus2" value="false" />
                        <label htmlFor="currentStatus2" className="radiolabel">Retired</label>
                    </div>
                </div>
                <div className="btn-field">
                    <button type="submit" className="submitButton">Add Employee</button>
                </div>
            </form>
            <h3 className="text-danger" >{errorMessage}</h3>
        </div>
    );
}

export default EmployeeCreate;