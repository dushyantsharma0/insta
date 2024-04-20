import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const User = () => {

  const [name , setName ] = useState("")
  const [content, setcontent] = useState("");
  const [password , setPassword] = useState("");
  const [login, setlogin] = useState(true);
  let navigate = useNavigate();


  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      navigate('/')
    }
  }, [namesend])

  function namesend(){
    if(name==""||content==""||password==""){
      alert("Please enter full detail")
    }else{
      
      fetch("https://fewdemo.vercel.app/usersave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          bio:content,
           password: password
        }),
      })
       .then((res) => res.json())
       .then((data) => {
        if(data.msg){
          alert(data.msg)
        }else{
         setlogin(false)
        }
       })
       .catch((err) => console.log(err));
       setName("")
       setcontent("")
       setPassword("")
    
    }
    
  }

function loginbtn(){
  if(name==""&&content==""&&password==""){
    alert("Please enter full detail")
  }else{
     fetch("https://fewdemo.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password
      }),
    }).then((res)=>res.json().then((data)=>{
      if(data.msg){
        alert(data.msg)
      }else{
        localStorage.setItem('username',name)
        localStorage.setItem('id',data._id)
        navigate('/')
      }
    }))
  }
  
}
  return (
    
    <>
    
<div className='mainform' >
  <div className='formstyle' >
       {
        login?<>
         <h1>SignUp </h1>
        <input style={{ height:"30px", paddingLeft: "15px", fontSize: "21px", }} placeholder='enter your username'  value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
        <br /><br />
        <input style={{ height:"30px", paddingLeft: "15px", fontSize: "21px", }} placeholder='enter your password'  value={password} onChange={(e)=>setPassword(e.target.value)} type="password"/>
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
        <p onClick={()=>setlogin(false)} className='ptag'>Click here if already register</p>
        </>:<>
        <h1>Login </h1>
        <input style={{ height:"30px", paddingLeft: "15px", fontSize: "21px", }} placeholder='enter your username'  value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
        <br /><br />
        <input style={{ height:"30px", paddingLeft: "15px", fontSize: "21px", }} placeholder='enter your password'  value={password} onChange={(e)=>setPassword(e.target.value)} type="password"/>
        <br /><br />
       
       
        <button onClick={loginbtn} >login</button>
        <p onClick={()=>setlogin(true)}  className='ptag'>Click here for register</p>
        </>
       }
    </div>
</div>
    
    </>
  )
}

export default User