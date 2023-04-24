const typeDefs = `
type employee {
    _id: String!
    FirstName: String!
    LastName: String!
    Age: Int!
    DateOfJoining: String!
    Title: String!
    Department: String!
    EmployeeType: String!
    CurrentStatus: Boolean!
}
 type Query {
    employees: [employee]
    single_employee(_id: String!): single_employee
    filterEmployees(Title: String, Department: String, EmployeeType: String): [employee]
    upComingRetirements: [employee]
    employeesByTypeAndEarylyRetirement(EmployeeType: String!): [employee]
    }
type Mutation {
    addEmployee(FirstName: String!, LastName: String!, Age: Int!, DateOfJoining: String!, Title: String!, Department: String!, EmployeeType: String!, CurrentStatus: Boolean!): response 
    updateEmployee(_id: String!, FirstName: String, LastName: String, Age: Int, DateOfJoining: String, Title: String, Department: String, EmployeeType: String, CurrentStatus: Boolean): employee
    deleteEmployee(_id: String!): response
}
`;

module.exports = typeDefs;
