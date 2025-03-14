import React, { useEffect, useState } from "react";
import { Button, Card, TextField, Typography, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import obj from "../services/Service";

const StudentInfoBE = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    studentName: "",
    studentDob: "",
    place: "",
    address: "",
    rollNumber: "",
  });
  const [count, setCount] = useState(0);

  function handleChange(event) {
    setStudent({ ...student, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      alert("error");
    }
  }, [count]);

  async function getData() {
    try {
      const response = await obj.viewAllStudents();
      setCount(response.data.length);
    } catch (error) {
      alert("error");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Prepare data to be sent to backend (don't send student_id)
      const studentData = {
        studentName: student.studentName,
        studentDob: student.studentDob,
        place: student.place,
        address: student.address,
        rollNumber: student.rollNumber || "", // Handle empty roll number properly
      };

      const response = await obj.insertStudent(studentData); // Send data without student_id
      if (response.status === 201) {
        alert("User added successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      alert("Something went wrong");
    }
    // Reset the form after submission
    setStudent({
      studentName: "",
      studentDob: "",
      place: "",
      address: "",
      rollNumber: "",
    });
  };

  const handleView = () => {
    navigate("/v", { state: { students: [] } });
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <br />
      <br />
      <Container maxWidth="lg">
        <Card sx={{ padding: 2 }}>
          <Typography variant="h5" align="center" sx={{ fontFamily: "Lora, serif", color: "purple" }}>
            Register Here
          </Typography>
          <br />
          <img
            src="https://img.freepik.com/premium-vector/girl-logging-into-accounts_118167-6273.jpg"
            alt="image"
            style={{
              width: 190,
              height: 86,
              objectFit: "cover",
              margin: "0px 3px 3px 423px",
            }}
          />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Enter your name"
                  name="studentName"
                  value={student.studentName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Enter your date of birth"
                  name="studentDob"
                  value={student.studentDob}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Enter your place"
                  name="place"
                  value={student.place}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Enter your address"
                  name="address"
                  value={student.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Enter your roll number"
                  name="rollNumber"
                  value={student.rollNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center", marginTop: 2 }}>
                <Button variant="contained" color="success" type="submit">
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
        <Typography variant="h6" align="center" sx={{ marginTop: 3 }}>
          Total students: {count}
        </Typography>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Button variant="outlined" color="primary" onClick={handleView}>
            View Students
          </Button>
        </Grid>
      </Container>
    </Container>
  );
};

export default StudentInfoBE;
