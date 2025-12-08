import React, { useState } from 'react';
import axios from 'axios';
const SearchByTenure = () => {

  const [month,setMonth]=useState("")
  const [data,setData]=useState([])
  const handleChange=(e)=>{
    setMonth(e.target.value)
  }
     const [errors,setErrors]=useState({})
    const validateform=()=>{
        const newErrors={}
        if(!month.trim()){
          newErrors.months="Please Enter Tenure Months"
        }

          setErrors(newErrors)
      return Object.keys(newErrors).length===0

      }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    if(!validateform()){
      return
    }
    await axios.get("http://localhost:3000/api/loans/compare/"+Number(month)).then((res)=>{
    setData(res.data)
   })

  }


 
  
    

  return (
    <div>
        <br />
        <center><h1>Search By Loan Tenure</h1></center>
        <br />
      
        <form action="">
              <center>

      
       
          <div className='d-flex align-items-center justify-content-center gap-3' style={{width:600}}>
          <label htmlFor="loanTenure" className="form-label mb-0 fw-bold">Loan Tenure Months : </label>
           
           <input type="number" id='loanTenure' min={0}  style={{ width: '50%' }}  name="loanTenure" placeholder='Enter loan Tenure Months(e.g.12)' className='form-control' value={month} onChange={handleChange}/>
          
          
            </div> 

          
      <p style={{color:"red"}}>{errors.months}</p>
     </center>
      <br />
           
        
            
           <center> <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Compare</button></center>
        </form>
        <br />
            {
              data.length===0?
      <>
     <center> No Data</center>
      </>:
        <>
     <table className='table table-bordered table-striped border-primary'>
            <thead>
              <tr>
                <th scope="col">Customer Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Pan Number</th>
                <th scope='col'>Address</th>
                <th scope='col'>Loan Amount</th>
                <th scope='col'>Intrest Rate</th>
                <th scope='col'>Loan Tenure</th>
                <th scope='col'>EMI</th>
                <th scope='col'>Total Intrest</th>
                <th scope='col'>Total Payment</th>
                </tr>
            </thead>
            <tbody>
                { data.map((d)=>(   
                <tr class="table-primary" key={d._id}>
                    <td className="table-primary">{d.name}</td>
                    <td className="table-primary">{d.email}</td>
                    <td className="table-primary">{d.panNumber}</td>
                    <td className="table-primary">{d.address}</td>
                    <td className="table-primary">Rs. {d.loanAmount.toLocaleString('en-IN')}</td>
                    <td className="table-primary">{d.intrestRate}%</td>
                    <td className="table-primary">{d.loanTenure} Months</td>
                    <td className="table-primary">Rs. {d.emi.toLocaleString('en-IN')}</td>
                    <td className="table-primary">Rs. {d.totalIntrest.toLocaleString('en-IN')}</td>
                    <td className="table-primary">Rs. {d.totalPayment.toLocaleString('en-IN')}</td>

                </tr>
                ))
             
                }
            </tbody>

        </table>
      
      </>
    }
    </div>

  );
}

export default SearchByTenure;
