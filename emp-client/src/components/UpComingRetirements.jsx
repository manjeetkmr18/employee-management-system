import React from 'react'
import RetirementFilter from './RetirementFilter'

export default function UpComingRetirements({}) {
    const [upcomingretirements, setUpcomingRetirements] = React.useState([]);
    
    const query = `
    query UpComingRetirements {
        upComingRetirements {
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
      }`;
        

    function fetchData() {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            const { data } = await response.json();
            setUpcomingRetirements(data.upComingRetirements);
        })
    }

    function retirementFilter(query, type) {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query, variables: {
                    employeeType: type
                }
            }),
        }).then(async (response) => {
            const { data } = await response.json();
            setUpcomingRetirements(data.employeesByTypeAndEarylyRetirement);
        }
        );
    };

    React.useEffect(function () {
        fetchData();
    }, []);

  return (
    <div className="container">
            <h1>Upcoming Retirements</h1>
            <RetirementFilter retirementFilter={ retirementFilter }/>
            <table>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Age</th>
                        <th>Date Of Joining</th>
                        <th>Title</th>
                        <th>Department</th>
                        <th>EmployeeType</th>
                        <th>Retirement Date</th>
                    </tr>
                </thead>
                <tbody>
                    {upcomingretirements.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.FirstName}</td>
                            <td>{employee.LastName}</td>
                            <td>{employee.Age}</td>
                            <td>{new Date(parseInt(employee.DateOfJoining)).toLocaleDateString()}</td>
                            <td>{employee.Title}</td>
                            <td>{employee.Department}</td>
                            <td>{employee.EmployeeType}</td>
                            <td>{employee.RetirementDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}
