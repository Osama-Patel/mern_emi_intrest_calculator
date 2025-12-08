
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayLoans = () => {
    const [data,setData]=useState([])
    const navigate=useNavigate()

    const fetchData=async ()=>{
        await axios.get("http://localhost:3000/api/loans").then((res)=>{
            setData(res.data)
        })
        
    }

    const handleEdit=(id)=>{

        navigate("/EditLoanDetails/"+id)
        


    }
    

      const handleDelete=async (id)=>{

        await axios.delete(`http://localhost:3000/api/loans/${id}`)
     
          setData((prev)=>prev.filter((loan)=>loan._id!==id))
    }

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div>
        <br />
        <center><h1>Previous Loans</h1></center>
        <br />
        {data.length==0?<>
       <center> <p>No data</p></center>
        </>:<>
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
                <th>Actions</th>
                </tr>

            </thead>
            <tbody>
                { data.map((d)=>(   
                <tr class="table-primary">
                    <td class="table-primary">{d.name}</td>
                    <td class="table-primary">{d.email}</td>
                    <td class="table-primary">{d.panNumber}</td>
                    <td class="table-primary">{d.address}</td>
                    <td class="table-primary">Rs. {d.loanAmount?.toLocaleString('en-IN')}</td>
                    <td class="table-primary">{d.intrestRate}%</td>
                    <td class="table-primary">{d.loanTenure} Months</td>
                    <td class="table-primary"  style={{ whiteSpace: "nowrap" }}>Rs. {d.emi?.toLocaleString('en-IN')}</td>
                    <td class="table-primary">Rs. {d.totalIntrest?.toLocaleString('en-IN')}</td>
                    <td class="table-primary">Rs. {d.totalPayment?.toLocaleString('en-IN')}</td>
                    <td>
                       <div className='d-flex gap-2'>
                        <button onClick={()=>handleEdit(d._id)}  className='btn btn-primary'>Edit</button>{" "}
                       
                        <button style={{display:"inline-block"}} onClick={()=>{
                            if(confirm('are you sure?')){
                            handleDelete(d._id)
                         
                            navigate('/DisplayLoans')

                            }
                        }} className='btn btn-danger'>Delete</button>
                      </div>
                    </td>

                </tr>
                ))
             
                }
            </tbody>

        </table>

        </>}
            
    </div>
  );
}

export default DisplayLoans;
