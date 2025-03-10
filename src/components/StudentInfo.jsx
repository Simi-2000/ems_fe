import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, FormControl, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";

const StudentInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [student, setStudent] = useState({
    "studentName": "",
    "studentDob": ""
  });
  const [students, setStudents] = useState(location.state?.students || []);

  const handleChange = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStudents([...students, student]);
    setStudent({
      "studentName": "",
      "studentDob": ""
    });
  };

  const handleView = () => {
    navigate("/v", { state: { students } });
  };

  return (
    <div className="container w-50 mt-5">
      <Card>
        <CardHeader>
          <h2>Register Here</h2>
        </CardHeader>
        <Form onSubmit={handleSubmit}>
          <CardBody>
            <FormControl
              type='text'
              name='studentName'
              onChange={handleChange}
              placeholder="Enter your name"
              value={student.studentName}
              required
            /><br />
            <FormControl
              type='date'
              name='studentDob'
              onChange={handleChange}
              placeholder="Enter your date of birth"
              value={student.studentDob}
              required
            /><br />
          </CardBody>
          <CardFooter>
            <Button variant='success' type='submit'>Register</Button>
          </CardFooter>
        </Form>
      </Card>
      <h3 className="text-center mt-5">Total students : {students.length}</h3>
      <div className="text-center">
        <Button onClick={handleView}>View</Button>
      </div>
      <div>
        <h2>Student List</h2>
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              {student.studentName} - {student.studentDob}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentInfo;