import React from 'react'
import EmployeeRow from './EmployeeRow'

function EmployeeTable({ allEmployees, deleteEmployee }) {

    const employeesRow = allEmployees.map((employee) => (
        <EmployeeRow employee={employee} />
    ));

    return (
        <div>
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
                        <th>Current Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {employeesRow}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeTable;