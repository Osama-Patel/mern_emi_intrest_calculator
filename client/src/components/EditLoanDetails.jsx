import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditLoanDetails = () => {


  const [form,setForm]=useState({
          name:"",
          email:"",
          panNumber:"",
          address:""
      })

      const {id}=useParams()
      const navigate=useNavigate()

      const fetchloan=async ()=>{
        await axios.get(`http://localhost:3000/api/loans/${id}`).then((res)=>{
          setForm(res.data)
        })
      }

      useEffect(()=>{
          fetchloan()
      },[id])

       const [errors,setErrors]=useState({})
      
          const validateform=()=>{
            const newErrors={}
            if(!form.name.trim()){
              newErrors.name="Please Enter Name"
            }
            if(form.name.length<3){
              newErrors.name="Name must be at least 3 digits"
            }
                 if (!form.email.trim()) {
    newErrors.email = "Please Enter Email";
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      newErrors.email = "Please Enter a valid Email";
    }
  }
            if(!form.panNumber.trim()){
              newErrors.panNumber="Please Enter Pan Number"
            }
            if(form.panNumber.length<10 || form.panNumber.length>10)
            {
              newErrors.panNumber="Pan Number must be 10 alphanumeric digit"
            }

            if(form.address.length<3)
            {
              newErrors.address="address must be at least 3 digit"
            }
            setErrors(newErrors)
            return Object.keys(newErrors).length===0
          }


      const handleSubmit=async (e)=>{
        e.preventDefault()
          if(!validateform()){
          return
        }
        await axios.put(`http://localhost:3000/api/loans/${id}`,form)
        alert("Updated Successfully")
        navigate('/DisplayLoans')

      }

      const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
      }

      
  return (
    <div>
         <br />
        <center><h1>Edit Details</h1></center>
        <br />
        <form action="">
        <input type="text" name="name" placeholder='Enter Name' className='form-control' value={form.name} onChange={handleChange}/>
       <p style={{color:"red"}}>{errors.name}</p>
      
       <br />
        <input type="text" name="email" placeholder='Enter email' className='form-control' value={form.email} onChange={handleChange}/>
       <p style={{color:"red"}}>{errors.email}</p>
    
      <br />
         <input type="text" name="panNumber" placeholder='Enter pan Number' className='form-control' value={form.panNumber} onChange={handleChange}/>
       <p style={{color:"red"}}>{errors.panNumber}</p>
    
      <br />
      <textarea name="address"  className='form-control' cols={3} rows={5} placeholder='Enter address' value={form.address} onChange={handleChange}></textarea>
       <p style={{color:"red"}}>{errors.address}</p>
    
      <br />
       
      <center><button className='btn btn-primary' type='submit' onClick={handleSubmit}>Update</button></center>
      </form>
      
    </div>
  );
}

export default EditLoanDetails;
