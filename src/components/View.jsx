import {React, useState,useEffect} from 'react';
import {Button, FormControl, Table} from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import obj from "../services/Service";


const ViewStudents=()=>{
    const location=useLocation();
    const[students,setStudents]=useState([]);
    const navigate=useNavigate();
    const[selectedId,setSelectedId]=useState(-1);
    const[selectedStudent,setSelectedStudent]=useState({
        studentId:0,
        studentName:"",
        studentAge:"",
        studentPlace:""
    })
    const[count,setCount]=useState(0);
    useEffect(()=>{
       getData();
    },[])

    async function getData() {
        const response=await obj.viewAllStudents();
        setStudents(response.data);
    }
    function handleBack(){
        navigate( "/"
            // ,{
            //     state:{
            //         students:students
            //     }
            // }
        );
    }
  const handleUpdate=async (id)=>{
    console.log(id)
    setSelectedId(id);
    const response=await obj.viewOneStudent(id);
    console.log(response.data)
    setSelectedStudent(response.data);  
    
    }
    const handleDelete=async(id)=>{
        
         const response=await obj.deleteStudent(id);
         console.log(response.data)
         if(response.status===202){
            alert('deleted successfully');
            getData()
         }
         else{
            alert("student not found");
         }
         
         }
    function handleChange(event){
        setSelectedStudent({...selectedStudent,[event.target.name]:event.target.value});
    }
    async function handleSave(){
     const response=await obj.updateStudent(selectedStudent);
    if(response.status===202){
      alert('student updated successfully');
    }
        await getData();
       setSelectedId(-1);
    }
    function handleCancel(){
        setSelectedId(-1);
    }
    
    return(
        <div className='container mt-5'>
            <h2><i className="bi bi-skip-backward-circle" onClick={handleBack}></i>view all students</h2>
            <Table bordered striped hover className='text-center'>
                
              <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Place</th>
                    <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                 {students.map((student,index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{
                                selectedId===student.studentId?
                                <FormControl name="studentName" type="text" value={selectedStudent.studentName} onChange={handleChange}/>
                                :
                                student.studentName
                            }</td>
                            <td>{
                                selectedId===student.studentId?
                                <FormControl name="studentAge" type="number" value={selectedStudent.studentAge} onChange={handleChange}/>
                                :
                                student.studentAge
                            }</td>
                            <td>{
                                selectedId===student.studentId?
                                <FormControl name="studentPlace" type="text" value={selectedStudent.studentPlace} onChange={handleChange}/>
                                :
                                student.studentPlace
                            }</td>
                            <td>{
                                selectedId===student.studentId?
                                <Button variant='success' onClick={()=>handleSave()}>Save</Button>
                                :
                                <Button variant='success' onClick={()=>handleUpdate(student.studentId)}>Update</Button>
                               }</td>
                            <td>{
                                selectedId===student.studentId?
                                <Button variant='danger' onClick={()=>handleCancel()}>Cancel</Button>
                                :
                                <Button variant='danger' onClick={()=>handleDelete(student.studentId)}>Delete</Button>
                            }</td>
                        </tr>
                    )
                 })}
              </tbody>
            </Table>
        </div>
    )

}
export default ViewStudents;