import React, { useState } from 'react'
import {Form, Button, Row, Col } from 'react-bootstrap';

export default function EmployeeSearch({ employeesFilter }) {
  const [Title, setTitle] = useState("all");
  const [Department, setDepartment] = useState("all");
  const [EmployeeType, setEmployeeType] = useState("all");

  const query = `query FilterEmployees($title: String, $department: String, $employeeType: String) {
    filterEmployees(Title: $title, Department: $department, EmployeeType: $employeeType) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    employeesFilter(query, Title, Department, EmployeeType);
  };


  return (

    <Form onSubmit={handleSubmit}>
      <Row className="search-bar">
        <Col className='search-item'>
          <Form.Group controlId="formDropdown1">
          <Form.Label>Employee Title</Form.Label>
            <Form.Control as="select" onChange={(e) => setTitle(e.target.value)}>
          <option value="all">All</option>
          <option value="VP">VP</option>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
        </Form.Control>
          </Form.Group>
        </Col>

        <Col className='search-item'>
          <Form.Group controlId="formDropdown2">
            <Form.Label>Employee Department</Form.Label>
            <Form.Control as="select" onChange={(e) => setDepartment(e.target.value)}>
              <option value="all">All</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col className='search-item'>
          <Form.Group controlId="formDropdown3">
            <Form.Label>Employee type</Form.Label>
            <Form.Control as="select" onChange={(e) => setEmployeeType(e.target.value)}>
                <option value="all">All</option>
                <option value="Full-Time">FullTime</option>
                <option value="Part-Time">PartTime</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
          </Form.Control>
          </Form.Group>
        </Col>

        <Col className='search-button'>
          <Button variant="primary" type="submit" className='search-btn'>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>

  );
}
  


    // <div className='filter'>
    //   <a href='/employees' className='filter-link'>All Employees</a>
    //   <a href='/employees?EmployeeType=Full-Time' className='filter-link'>Full Time</a>
    //   <a href='/employees?EmployeeType=Part-Time' className='filter-link'>Part Time</a>
    //   <a href='/employees?EmployeeType=Contract' className='filter-link'>Contract</a>
    //   <a href='/employees?EmployeeType=Seasonal' className='filter-link'>Seasonal</a>
    // </div>
 