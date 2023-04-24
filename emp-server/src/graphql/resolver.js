const Employee = require("../models/employee");
require("../models/db");

const resolvers = {
<<<<<<< HEAD
    Query: {
        employees,
        single_employee,
        filterEmployees,
        upComingRetirements,
        employeesByTypeAndEarylyRetirement
    },
    Mutation: {
        addEmployee,
        updateEmployee,
        deleteEmployee
    }
};


async function addEmployee(_, { FirstName, LastName, Age, DateOfJoining, Title, Department, EmployeeType, CurrentStatus }) {

    if ((EmployeeType === "Contract" || EmployeeType === "Seasonal") && (Title === "Manager" || Title === "Director" || Title === "VP")) {
        return {
            status: false,
            message: 'Contractor/Seasonal Employee Can’t be Manager/Director/VP'
        };
    }

    const birthYear = new Date(DateOfJoining).getFullYear() - Age;
    const retirementAge = 65;
    const retirementDate = new Date(`October 31, ${birthYear}`);
    retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge);

    const retirementcalculateddate = new Date(retirementDate);

    let emp = new Employee({ FirstName, LastName, Age, DateOfJoining, Title, Department, EmployeeType, CurrentStatus, RetirementDate: retirementcalculateddate });

    await Employee.create(emp);
    return {
        status: true,
        message: 'Employee Added Successfully'
    };
=======
  Query: {
    employees,
    single_employee,
    filterByType,
    filterEmployees,
  },
  Mutation: {
    addEmployee,
    updateEmployee,
    deleteEmployee,
  },
};

async function addEmployee(
  _,
  {
    FirstName,
    LastName,
    Age,
    DateOfJoining,
    Title,
    Department,
    EmployeeType,
    CurrentStatus,
  }
) {
  let emp = new Employee({
    FirstName,
    LastName,
    Age,
    DateOfJoining,
    Title,
    Department,
    EmployeeType,
    CurrentStatus,
  });
  return await Employee.create(emp);
>>>>>>> origin/master
}

async function employees() {
  const employees = await Employee.find();
  return employees;
}

async function single_employee(_, { _id }) {
  const employee = await Employee.findById(_id);
  return employee;
}

async function updateEmployee(_, { _id, Title, Department, CurrentStatus }) {
<<<<<<< HEAD
    return await Employee.findByIdAndUpdate(_id, {
        Title: Title,
        Department: Department,
        CurrentStatus: CurrentStatus
    })
        .then(employee => {
            return employee;
        })
        .catch(error => {
            return error;
        })

    // return updatedEmp;
}

//upcoming retirements
async function upComingRetirements() {
    const employees = await Employee.find({ CurrentStatus: true });
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

    var emps = employees.filter((employee) => {

        const dateOfJoining = employee.DateOfJoining;
        const ageAtJoining = employee.Age;
        const birthYear = new Date(dateOfJoining).getFullYear() - ageAtJoining;
        const retirementAge = 65;
        // console.log(birthYear);
        const retirementDate = new Date(`October 31, ${birthYear}`);
        retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge);

        const retirementcalculateddate = new Date(retirementDate);
        const sexmonths = new Date(sixMonthsFromNow);

        const diffTime = Math.abs(sexmonths - retirementcalculateddate);
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

        return diffMonths < 6;
        // return retirementDate < sixMonthsFromNow;
    });

    return emps;
}


async function employeesByTypeAndEarylyRetirement(_, { EmployeeType }) {

    const employees = await Employee.find({ CurrentStatus: true });
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

    var emps = employees.filter((employee) => {

        const dateOfJoining = employee.DateOfJoining;
        const ageAtJoining = employee.Age;
        const birthYear = new Date(dateOfJoining).getFullYear() - ageAtJoining;
        const retirementAge = 65;
        const retirementDate = new Date(`October 31, ${birthYear}`);
        retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge);

        const retirementcalculateddate = new Date(retirementDate);
        const sixmonths = new Date(sixMonthsFromNow);

        const diffTime = Math.abs(sixmonths - retirementcalculateddate);
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

        return diffMonths < 6;
    });

    const employeesByTypeAndRetirementDate = emps.filter((employee) => employee.EmployeeType === EmployeeType);

    return employeesByTypeAndRetirementDate;

}


//delete Employee
async function deleteEmployee(_, { _id }) {
    const employee = await Employee.findById(_id);

    if (employee && employee.CurrentStatus === false) {
        await Employee.findByIdAndDelete(_id);
        return {
            status: true,
            message: 'Employee deleted'
        };
    }
    else {
        return {
            status: false,
            message: "CAN\’T DELETE EMPLOYEE – STATUS ACTIVE"
        };
    }
}

async function filterEmployees(_, { Title, Department, EmployeeType }) {
    let query = {};
    if (Title.toLowerCase() !== "all") {
        query['Title'] = Title;
    }
    if (Department.toLowerCase() !== "all") {
        query['Department'] = Department;
    }
    if (EmployeeType.toLowerCase() !== "all") {
        query['EmployeeType'] = EmployeeType;
    }
    console.log(query);
    const employees = await Employee.find(query);
    console.log(employees);
    return employees;
=======
  console.log(Title, Department);

  return await Employee.findByIdAndUpdate(_id, {
    Title: Title,
    Department: Department,
    CurrentStatus: CurrentStatus,
  })
    .then((employee) => {
      // console.log(employee);
      return employee;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  // return updatedEmp;
}

//delete Employee
async function deleteEmployee(_, { _id }) {
  const employee = await Employee.findById(_id);

  if (employee && employee.CurrentStatus === false) {
    await Employee.findByIdAndDelete(_id);
    return {
      status: true,
      message: "Employee deleted",
    };
  } else {
    return {
      status: false,
      message: "CAN’T DELETE EMPLOYEE – STATUS ACTIVE",
    };
  }
}

async function filterByType(_, { EmployeeType }) {
  const employees = await Employee.find({ EmployeeType: EmployeeType });
  return employees;
}

async function filterEmployees(_, { Title, Department, EmployeeType }) {
  let query = {};
  if (Title.toLowerCase() !== "all") {
    query["Title"] = Title;
  }
  if (Department.toLowerCase() !== "all") {
    query["Department"] = Department;
  }
  if (EmployeeType.toLowerCase() !== "all") {
    query["EmployeeType"] = EmployeeType;
  }
  console.log(query);
  const employees = await Employee.find(query);
  console.log(employees);
  return employees;
>>>>>>> origin/master
}

module.exports = resolvers;
