import React,{ useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")


    const submitData = (e) => {
        e.preventDefault()
    }
    
    /// POST API ////
    const saveUser = () =>{
        console.log("save", name,email,address)
        axios.post('https://60cce86871b73400171f8b70.mockapi.io/Users', {
                name: name,
                email: email,
                address: address
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });   
    }

    return ( <div style={{textAlign: "center"}}>
        <h1>POST Api Example</h1>
        <form onSubmit={submitData}>
            <input  
            style={{padding: "10px",margin: "10px"}} 
            type="text"  value={name} placeholder="enter name" onChange={(e)=>{setName(e.target.value)}} name="name" /> <br/>
            <input  
            style={{padding: "10px",margin: "10px"}} 
            type="text"  value={email} placeholder="enter email" onChange={(e)=>{setEmail(e.target.value)}} name="email"/> <br/>
            <input  
            style={{padding: "10px",margin: "10px"}} 
            type="text"  value={address} placeholder="enter address" onChange={(e)=>{setAddress(e.target.value)}} name="address"/> <br/>
            <button type="button" onClick={saveUser}>Save New User</button> 
        </form>
    </div> );
}
 
export default Form;