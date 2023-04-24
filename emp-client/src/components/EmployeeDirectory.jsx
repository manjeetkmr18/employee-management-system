import React from 'react'
import EmployeeTable from './EmployeeTable'
import EmployeeSearch from './EmployeeSearch'

function EmployeeDirectory() {
    const [allemployees, setEmployees] = React.useState([]);

    let query = `
    query Employees {
        employees {
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

    function fetchData() {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            const { data } = await response.json();
            setEmployees(data.employees);
        })
    }

    //delete employee
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
        alert(res.data.deleteEmployee.message);
        fetchData();
    };

//delete employee
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
        alert(res.data.deleteEmployee.message);
        fetchData();
    };

    const employeeFilter = (query, title, department, type) => {
        console.log(title, department, type);
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query, variables: {
                    title: title,
                    department: department,
                    employeeType: type
                }
            }),
        }).then(async (response) => {
            const { data } = await response.json();
            setEmployees(data.filterEmployees);
        }
        );
    }

    React.useEffect(function () {
        fetchData();
    }, []);

    return (
        <React.StrictMode>
            <div className="container">
                <EmployeeSearch employeesFilter={employeeFilter} />
                <EmployeeTable allEmployees={allemployees} />
            </div>
        </React.StrictMode>
    );
}

export default EmployeeDirectory;