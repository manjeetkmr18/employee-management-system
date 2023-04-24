import React from 'react'
import '../assets/styles.css';
import {Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';


export default function RetirementFilter( {retirementFilter} ) {
    const [EmployeeType, setEmployeeType] = useState("all");

    const query =  `query EmployeesByTypeAndEarylyRetirement($employeeType: String!) {
        employeesByTypeAndEarylyRetirement(EmployeeType: $employeeType) {
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
        retirementFilter(query, EmployeeType);
      };

  return (
    <Form onSubmit={handleSubmit} >
    <Row className="upcoming-search-bar">

      <Col>
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

      <Col>
        <Button variant="primary" type="submit" className='retired-search-btn'>
          Submit
        </Button>
      </Col>
    </Row>
  </Form>

  )
}
