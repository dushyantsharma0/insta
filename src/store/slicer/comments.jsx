import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdSend } from "react-icons/io";
const Comments = (props) => {
  console.log("this is props")
  console.log(props)

// use post method in fetch 
const [text , setText] = useState("");
function sendComment() {
  if (text !== "") {
    fetch('https://fewdemo.vercel.app/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        sender: localStorage.getItem('id'),
        post: props.values._id
      })
    })
      .then(res => res.json())
      .then(data => {
        fetch('https://fewdemo.vercel.app/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: props.values.title,
            comment: data._id
          })
        })
      })
      .catch(err => console.log(err))
    setText('')
  } else {
    alert("Please enter a comment")
  }
}
 navigation=useNavigate()
function back(){
 location.reload()
  
}

  return (
    <div style={{ zIndex:"1000", display:"flex",   justifyContent:"center", paddingTop:"5%",   position:"fixed ", top:"0", backgroundColor:"#ddd", width:'100%' ,height:"100vh" }} >
    <div  style={{  boxShadow:"5px 5px 35px red", borderRadius:"15px", color:"black",border:"5px solid black", height:"max-content", padding:"3rem" }} >
      <p style={{  color:"#7f3396", fontSize:"1.2rem",lineHeight:'0.1rem'  }} >Author: <span style={{color:"#339678"}} >{props.values.author.name}</span> </p>
      <h4 style={{color:"#669633", fontSize:"1.5rem",lineHeight:'0.1rem' }} >title: <span style={{color:"#966933"}} > {props.values.title}</span> </h4>
      <h4  style={{color:"#474a99", fontSize:"1rem",lineHeight:'0.1rem' }} >content: </h4>
      <p style={{ width:"260px", color:" #1379F2"}} >{props.values.content}</p>
      <hr />
      <p  style={{color:"#00A844" , fontWeight:"900",lineHeight:'0.1rem' }} >comments</p>
      <div className='changescroll' style={{ marginBottom:"30px", minHeight:"20px",  maxHeight:"150px", overflowY:"scroll" }} >
      
        {/* <h6>{props.values.comment[0].sender.name} :{props.values.comment[0].text}</h6> */}
       
        {
          props.values.comment.map((comment, index) => {
            return (
            <>
              <div key={index}>
                <h5> {index+1} &nbsp; <span style={{color:"#094c99"}} >{comment.sender.name}</span>&nbsp;&nbsp; :&nbsp;&nbsp;{comment.text}</h5>
            
              </div>
               
            </>
            )
          })
          
        }
      </div>
       
        <div style={{display:"flex", justifyContent:'center'}} >
        <input value={text} onChange={(e)=>setText(e.target.value)} type="text"
         placeholder='Add Your Comment' />
         <IoMdSend onMouseDown={sendComment} style={{ cursor:"pointer", fontSize:"30px"}} />
        </div>
    </div>
     <button onClick={back}  style={{position:"absolute", top:"10px", left:"10px"  }} > GoBack</button>
     <button onClick={back}  style={{position:"absolute", top:"10px", right:"10px"  }} >GoBack</button>
    </div>
  )
}

export default Comments