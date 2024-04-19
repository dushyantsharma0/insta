import React, { useState } from 'react'
import  {useDispatch, useSelector } from 'react-redux'
import { self } from './store/slicer/userSlicer'
import { IoIosBackspace } from "react-icons/io";


const AddPost = () => {
  const dispatch = useDispatch();
    const [content, setcontent] = useState('')
    const [title, settitle] = useState('')
    function sendpost(){
      fetch('https://instaapinew.vercel.app/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: content,
          author:localStorage.getItem('id')

        })
      })
     .then(res => res.json())
     .then(data => {
        fetch("https://instaapinew.vercel.app/usersave", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: localStorage.getItem('username'),
              Posts:data._id
            }),
          })
           .then((res) => res.json())
           .then((data) => console.log(data))
           .catch((err) => console.log(err));
        })
     .catch(err => console.log(err))
      setcontent('')
      settitle('')
      dispatch(self(false))
    }

    
    function back(){
      dispatch(self(false))
      
    }

  return (
    <div>
        <div  className='bgadd2'  style={{  display:'flex',justifyContent:"center",alignItems:"center", width:"100%", position:'absolute', left:'0', top:'0',  height:"100vh", backgroundColor:'transparent'}} >
            
            <div className='bgadd' style={{ borderRadius:"15px", position:'relative',  zIndex:'1000',  width:'700px',height:"350px", background:"#b2680e"  }} >
                <h1 >Add your Post</h1>
                <input value={title} onChange={(e)=>settitle(e.target.value)} style={{ marginBottom:"20px", fontSize:"25px", paddingLeft:"15px", width:"50%", height:"30px"}}  placeholder='enter your titel' type="text"/>
<br />
                <textarea value={content}  onChange={(e)=>setcontent(e.target.value)}
  style={{ 
    maxWidth: "90%", 
    minWidth: "50%", 
    maxHeight: "120px", 
    minHeight: "20px", 
    fontSize: "25px", 
    paddingLeft: "15px" 
  }} 
  placeholder='enter your content' 
/>  <br />
 <button onClick={sendpost} >Submit</button>
            <IoIosBackspace onClick={back}  style={{ cursor:"pointer" ,  fontSize:"60px", position:"absolute", top:"-25px", right:'-20'  }} />
          </div>
        </div>
    </div>
  )
}

export default AddPost