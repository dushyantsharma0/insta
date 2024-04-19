import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const User = () => {

  const [name , setName ] = useState("")
  const [content, setcontent] = useState("");
  let navigate = useNavigate();


  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      navigate('/home')
    }
  }, [namesend])

  function namesend(){
    if(name==""){
      alert("Please enter your name")
    }else{
      fetch("https://instaapinew.vercel.app/usersave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        bio:content
      }),
    })
     .then((res) => res.json())
     .then((data) => {
      if(data.msg){
        alert(data.msg)
      }else{
        localStorage.setItem("id", data._id)
        navigate('/home')
          localStorage.setItem("username", name)
      }
     })
     .catch((err) => console.log(err));
     setName("")
   
     setTimeout(() => {
      navigate("/home");
      
     }, 100);
    }
     
  }
  return (
    
    <div>
        <h1>Enter Detail</h1>
        <input style={{ height:"30px", paddingLeft: "15px", fontSize: "21px", }} placeholder='enter your name'  value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
        <br /><br />
        <textarea value={content}  onChange={(e)=>setcontent(e.target.value)}
  style={{ 
    maxWidth: "90%", 
    minWidth: "100px", 
    maxHeight: "120px", 
    minHeight: "20px", 
    fontSize: "25px", 
    paddingLeft: "15px" 
  }} 
  placeholder='enter your bio' 
/> 
        <br /> <br />
        <button onClick={namesend} >Submit</button>
        
    </div>
  )
}

export default User