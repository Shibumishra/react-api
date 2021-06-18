import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


// axios.delete("abc")
// .then(response => setStatus('Delete successful'))
// .catch(error => {
//     setErrorMessage(error.message);
//     console.error('There was an error!', error);
// });

const Tables = () => {
    const [userData, setUserData] = useState([])
    const [name, setName] = useState("")
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [userId, setUserId]=useState(null)
  


    // useEffect(() => {
    //     const  getUser = async () => {
    //        try {
    //          const response = await axios.get('https://60cce86871b73400171f8b70.mockapi.io/admin');
    //          const tour = response.data
    //          console.log("response", tour);
    //          setUserData(tour)
    //        } catch (error) {
    //          console.error("error", error);
    //        }
    //      }
    //     getUser()
    //    }, [])

    useEffect(() => {

        getList()

    }, [])

    
    //GET API
    function getList(){
        fetch('https://60cce86871b73400171f8b70.mockapi.io/admin').then((result)=>{
            result.json().then((resp)=>{
                setUserData(resp)
                setName(resp[0].name)
                setUserName(resp[0].username)
                setEmail(resp[0].email)
                setPhone(resp[0].phone)
                setUserId(resp[0].userId)
                
            })
        })
    }

    ///DELETE API
       const deleteUser = (id) => {
           fetch(`https://60cce86871b73400171f8b70.mockapi.io/admin/${id}`,{
               method:'DELETE'
           }).then((result)=>{
               result.json().then((resp)=>{
                   console.log(resp)
                   getList()
               })
           })
       }


    const submitData = (e) => {
        e.preventDefault()
    }
     const selectUser = (id) => {
         const items= userData[id-1]
         console.log(items)
         setName(items.name)
         setUserName(items.username)
         setEmail(items.email)
         setPhone(items.phone)
         setUserId(items.userId)
     }

     ///PUT API
     const updateUser=()=> {
         const item = {name,username,email,phone,userId}
         fetch(`https://60cce86871b73400171f8b70.mockapi.io/admin/${userId}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(item)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp)
                getList()
            })
        })
     }
    return ( <>
   <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Username</th>
      <th>Email Id</th>
      <th>phone no.</th>
      <th>Operations</th>
      <th>Pre-filled</th>
    </tr>
  </thead>
  <tbody>
    {userData.map(({email, name, id, phone, username})=> 
    <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td><button onClick={()=> {deleteUser(id)}}>Delete</button></td>
        <td><button onClick={()=> {selectUser(id)}}>Update</button></td>
    </tr>
    )}
    
  </tbody>
</Table>

{/* Update Data */}

<div style={{textAlign: "center"}}>
    <form onSubmit={submitData}>
    <input type="text"  value={name} onChange={(e)=>setName(e.target.value)}/> <br /> <br />
    <input type="text"  value={username}  onChange={(e)=>setUserName(e.target.value)}/> <br /> <br />
    <input type="text"  value={email}   onChange={(e)=>setEmail(e.target.value)}/> <br /> <br />
    <input type="text"  value={phone}   onChange={(e)=>setPhone(e.target.value)}/> <br /><br />
    <button onClick={updateUser}>Update User</button>
    </form>
</div>
    </> );
}
 
export default Tables;