import { Route, Routes } from "react-router-dom";
import EmployeeDirectory from "./EmployeeDirectory";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeUpdate from "./EmployeeUpdate";
import EmployeeDetials from "./EmployeeDetials";
import UpComingRetirements from "./UpComingRetirements";


function PageRoutes() {
    return (
        <Routes>
        <Route path="/" element={<EmployeeDirectory/> } />
        <Route path="/employees" element={<EmployeeDirectory/> } />
        <Route path="/add-employee" element={<EmployeeCreate/> } />
        <Route path="/employee-details/:id" element={<EmployeeDetials/> } />
        <Route path="/edit-employee/:id" element={<EmployeeUpdate/> } />
        <Route path="/upcoming-retirements" element={<UpComingRetirements/>} />
        </Routes>
    );
    }

export default PageRoutes;