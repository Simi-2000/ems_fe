import axios from 'axios';

const baseURL = "http://localhost:8089/advanced/";

class Service {
  insertStudent(student_detail) {
    return axios.post(baseURL + "add", student_detail);
  }
  viewAllStudents() {
    return axios.get(baseURL + "all");
  }
  viewOneStudent(id) {
    return axios.get(baseURL + "one?studentRollNo=" + id)
  }
  updateStudent(student_detail) {
    return axios.put(baseURL + "update", student_detail)
  }
  deleteStudent(id) {
    return axios.delete(baseURL + "delete?studentRollNo=" + id)
  }
}

const obj = new Service();
export default obj; 