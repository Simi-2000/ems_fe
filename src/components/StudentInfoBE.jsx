import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, FormControl, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import obj from "../services/Service";

const StudentRegistrationBE = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [student, setStudent] = useState({
    studentName: "",
    studentDob: ""
  })
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);

  function handleChange(event) {
    setStudent({ ...student, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    getData();
  }, [count])

  async function getData() {
    const response = await obj.viewAllStudents();
    setCount(response.data.length);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await obj.insertStudent(student);
    console.log(response)
    if (response.status == 201) {
      alert("User added successfully")
    } else {
      alert("Something went wrong")
    }
    setStudent({
      studentName: "",
      studentDob: ""
    })
    const response2 = await obj.viewAllStudents();
    setCount(response2.data.length);
  }

  function handleView() {
    navigate("/v", {
      state: {
        students: students,
      }
    });
  }

  return (
    <div className="container w-50 mt-5">
      <Card>
        <CardHeader>
          <h2>Register Here</h2>
        </CardHeader>
        <Form onSubmit={handleSubmit}>
          <CardBody>
            <FormControl type='text' name='studentName' onChange={handleChange} placeholder="Enter your name" value={student.studentName} required /><br />
            <FormControl type='date' name='studentDob' onChange={handleChange} placeholder="Enter your date of birth" value={student.studentDob} required /><br />
          </CardBody>
          <CardFooter>
            <Button variant='success' type='submit'>Register</Button>
          </CardFooter>
        </Form>
      </Card>
      <h3 className="text-center mt-5">Total students : {count}</h3>
      <div className="text-center">
        <Button onClick={handleView}>View</Button>
      </div>
    </div>
  )
}

export default StudentRegistrationBE;