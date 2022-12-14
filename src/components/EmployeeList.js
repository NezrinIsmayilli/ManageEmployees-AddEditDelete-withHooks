import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import Employee from "./Employee";
import AddForm from "./AddForm";
import Pagination from "./Pagination";
import { Button, Modal} from "react-bootstrap";


const EmployeeList = () => {

  const {sortedEmployees} = useContext(EmployeeContext);

  const [show, setShow] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(2);

  const handleShow =()=>{setShow(true)};
  const handleClose=()=>{setShow(false)};

  useEffect(()=>{
    handleClose();
  },[sortedEmployees])

  //Pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee );
  const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage);

 
  return (
        <>
          <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>Manage <b>Employees</b></h2>
                </div>
                <div className="col-sm-6">
                  <Button onClick={handleShow} className="btn btn-success text-white" data-toggle="modal">
                    <i className="material-icons">&#xE147;</i> <span>Add New Employee</span>
                  </Button>
                </div>
              </div>
          </div>
          
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map(employee=>(
                <Employee key={employee.id} employee={employee}/>
              ))}
            </tbody>
          </table>

          <Pagination pages={totalPagesNum} 
                      setCurrentPage={setCurrentPage}
                      currentEmployees={currentEmployees}
                      sortedEmployees={sortedEmployees}/>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="modal-header" closeButton>
                <Modal.Title>
                    Add Employee
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
                <AddForm />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close Modal
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default EmployeeList;