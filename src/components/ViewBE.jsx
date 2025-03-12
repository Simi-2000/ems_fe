import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TablePagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import obj from "../services/Service"; // Assuming your API functions are here

const ViewBE = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [selectedStudent, setSelectedStudent] = useState({
    studentId: 0,
    studentName: "",
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  // Fetch students data
  async function getData() {
    setLoading(true);
    try {
      const response = await obj.viewAllStudents();
      setStudents(response.data);
      setFilteredStudents(response.data); // Initialize filtered students with all students
    } catch (error) {
      alert('Error fetching data');
    }
    setLoading(false);
  }

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterStudents(event.target.value);
  };

  // Filter students based on search query
  const filterStudents = (query) => {
    if (!query) {
      setFilteredStudents(students); // If no search query, display all students
    } else {
      const filtered = students.filter((student) =>
        student.studentName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleUpdate = async (id) => {
    setSelectedId(id);
    const response = await obj.viewOneStudent(id);
    setSelectedStudent(response.data);
  };

  const handleChange = (event) => {
    setSelectedStudent({ ...selectedStudent, [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    const response = await obj.updateStudent(selectedStudent);
    if (response.status === 202) {
      alert('Student updated successfully');
      getData();
      setSelectedId(-1);
    }
  };

  const handleCancel = () => {
    setSelectedId(-1);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  return (
    <div className="container mt-1">
      <Typography variant="h4" gutterBottom>
        <br />
        View All Students
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        style={{ marginBottom: '20px' }}
      />

      {/* Loading Spinner */}
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="student table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {selectedId === student.studentId ? (
                        <TextField
                          name="studentName"
                          value={selectedStudent.studentName}
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        student.studentName
                      )}
                    </TableCell>
                    <TableCell>
                      {selectedId === student.studentId ? (
                        <TextField
                          name="studentDob"
                          value={selectedStudent.studentDob}
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        student.studentDob
                      )}
                    </TableCell>
                    <TableCell>
                      {selectedId === student.studentId ? (
                        <Button variant="contained" color="primary" onClick={handleSave}>
                          Save
                        </Button>
                      ) : (
                        <Button variant="contained" color="primary" onClick={() => handleUpdate(student.studentId)}>
                          Update
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredStudents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ViewBE;
