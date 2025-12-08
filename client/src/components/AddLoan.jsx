import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const AddLoan = () => {
    const [form,setForm]=useState({
        name:"",
        email:"",
        panNumber:"",
        address:"",
        loanAmount:"",
        intrestRate:"",
        loanTenure:""
    })

    const [data,setData]=useState({})
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

             if(!form.loanAmount)
            {
              newErrors.loanAmount="Please Enter Loan Amount"
            }
              if(!form.intrestRate)
            {
              newErrors.intrestRate="Please Enter Intrest rate"
            }
              if(!form.loanTenure)
            {
              newErrors.loanTenure="Please Enter Loan Tenure"
            }

      setErrors(newErrors)
      return Object.keys(newErrors).length===0

      
    }

    const calulateEMI=(loanAmount,intrestRate,loanTenure)=>{
        const R=intrestRate/(12*100)
      // const numerator=(loanAmount*R)*(1+R)**loanTenure  
     // const denominator=(((1+R)**loanTenure)-1)
        const numerator=(loanAmount*R)*Math.pow(1+R,loanTenure)
        const denominator=(Math.pow(1+R,loanTenure)-1)
        const emi=numerator/denominator
        const totalPayment=emi*loanTenure
        const totalIntrest=totalPayment-loanAmount
        const fixedemi=Math.floor(emi+0.5)
        const fixedtotalIntrest=Math.floor(totalIntrest+0.5)
        const fixedtotalPayment=Math.floor(totalPayment+0.5)

        return{
             emi:fixedemi,
             totalIntrest:fixedtotalIntrest,
            totalPayment:fixedtotalPayment
        }
        
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        if(!validateform()){
          return
        }
        const data=calulateEMI(parseFloat(form.loanAmount),parseFloat(form.intrestRate),parseFloat(form.loanTenure))
        const finalRecord={...form,
             emi:data.emi,
             totalIntrest:data.totalIntrest,
             totalPayment:data.totalPayment
        }
        console.log(finalRecord);
        
        
       await axios.post("http://localhost:3000/api/loans/add",finalRecord)
       alert("Added Successfully")
       setForm({
        name:"",
        email:"",
        panNumber:"",
        address:"",
        loanAmount:"",
        intrestRate:"",
        loanTenure:""
       })

       setData(
        {...data,
          CustomerName:form.name,
           emi:data.emi,
            totalIntrest:data.totalIntrest,
            totalPayment:data.totalPayment
        }
       )

       

    }



    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

  return (
    <div>
        <br />
        <center><h1>Add Loan</h1></center>
        <br />
        <form action="">
        <input type="text" name="name" placeholder='Enter Full Name' className='form-control' value={form.name} onChange={handleChange}/>
       <p style={{color:"red"}}>{errors.name}</p>
       <br />
        <input type="text" name="email" placeholder='Enter email' className='form-control' value={form.email} onChange={handleChange}/>
       <p style={{color:"red"}}>{errors.email}</p>
      <br />
         <input type="text" name="panNumber"  placeholder='Enter pan Number' className='form-control' value={form.panNumber} onChange={handleChange}/>
         <p style={{color:"red"}}>{errors.panNumber}</p>
      <br />
      <textarea name="address"  className='form-control' cols={3} rows={5} placeholder='Enter address' value={form.address} onChange={handleChange}></textarea>
        <p style={{color:"red"}}>{errors.address}</p>
      <br />
         <input type="number" name="loanAmount" min={0} placeholder='Enter loan Amount' className='form-control' value={form.loanAmount} onChange={handleChange}/>
       <p style={{color:"red"}}>{errors.loanAmount}</p>
      <br />
         <input type="number" name="intrestRate" min={0} placeholder='Enter intrest Rate' className='form-control' value={form.intrestRate} onChange={handleChange}/>
       <p style={{color:"red"}}>{errors.intrestRate}</p>
      <br />
        <input type="number" name="loanTenure" min={0} placeholder='Enter loan Tenure Months' className='form-control' value={form.loanTenure} onChange={handleChange}/>
      <p style={{color:"red"}}>{errors.loanTenure}</p>
      <br />
      <center><button className='btn btn-primary' type='submit' onClick={handleSubmit}>Add</button></center>
      </form>
      {
        Object.keys(data).length===0 ?
        <p>
            No New Loan Added
        </p>:
        <>     
         <br />
      Customer Name:{data.CustomerName}
      <br />
      
      Calculated EMI:{data.emi}
      <br />
      Total Intrest:{data.totalIntrest}
      <br />
      Total Payment:{data.totalPayment}
      </>

}
    </div>
  );
}

export default AddLoan;
