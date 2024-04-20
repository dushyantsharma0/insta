import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoAddCircle } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import AddPost from './addPost';
import Comments from './store/slicer/comments';
import  {useDispatch, useSelector } from 'react-redux'
import { self } from './store/slicer/userSlicer';
import { BiSolidLike } from "react-icons/bi";
const Posts = () => {







  // todo usestate ka use 
   const data=useSelector(state => state.user)
  // todo  useDispatch ka use 
   const dispatch=useDispatch()
  function openpost(){
    dispatch(self(true))
    console.log("thsi si data",data)
  }
 
  const [all , setAll ] = useState(true)
const [val , setVal] = useState();

  
  const [titel, settitel] = useState([]); // Initialize 'titel' state with an empty array
    const [show , setShow ] = useState(false)
  let navigate = useNavigate();
  useEffect(() => {
    console.log(data)
    // todo: getalldata 
    const fetchData = async () => {
      const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      navigate('/home')
    }
  
      try {
        const response = await fetch("https://fewdemo.vercel.app/api/products/showposts");
        if (response.ok) {
          const data = await response.json();
          const newtitles = data.map((res) => res); // Map the 'author.name' from the data
          settitel(newtitles);
           // Update the 'titel' state with the mapped titles
           // Log the newtitles array
        } 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
    
  }, []);
  // todo: get your data only 
  const fetchYourData = async () => {
    try {
      const response = await fetch("https://fewdemo.vercel.app/yourpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: localStorage.getItem('id')
        })
      });
      const data = await response.json();
      console.log(data.Posts);
      const newdata= data.Posts.map((res)=>res)
      settitel(newdata)
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // todo: get all data 
   async function allpost(){
    try {
      const response = await fetch("https://fewdemo.vercel.app/api/products/showposts");
      if (response.ok) {
        const data = await response.json();
        const newtitles = data.map((res) => res); // Map the 'author.name' from the data
        settitel(newtitles); // Update the 'titel' state with the mapped titles
         // Log the newtitles array
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  // todo: get other data 
  
  let newdata = [];

  async function otherpost() {
    try {
      const response = await fetch("https://fewdemo.vercel.app/otherdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: localStorage.getItem('id')
        })
      });
      const data = await response.json();
      
      data.forEach((res) => {
     
        if(res.Posts.length!=0){
          // console.log(res.Posts[0]);
          newdata.push(res.Posts[0])
          console.log(newdata);
          settitel(newdata)
        }
        
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }

 
  }
     //  todo: comments open
     const [comment , setComment] = useState(false);

    //  setlike funclity  
    const [likea, setlike] = useState();
   
const [setId, setsetId] = useState();
 const [setnewtitle, setsetnewtitle] = useState();
 function setvalues(title){
  setsetId(title._id)
  setsetnewtitle(title.title)
 }
    function like(event) {
     
      
      // like ko fetch karna hai  
      fetch("https://fewdemo.vercel.app/like",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          post: setId,
          user:localStorage.getItem('id')
        })
      }).then((response) => {
        response.json().then((data) => {
           fetch('https://fewdemo.vercel.app/posts',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: setnewtitle,
              like: data._id,
             
            })
           })
          
        })
      })
      
      
      if (event.target.style.color === '') {
        event.target.style.color = 'red';
      } else {
        event.target.style.color = '';
      }
      //  alert(event.target.style.color)
    }
    function unlike(event){

      fetch("https://fewdemo.vercel.app/like",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          post: setId,
          user:localStorage.getItem('id')
        })
      }).then((response) =>console.log(response) )


      
      if (event.target.style.color === ''|| event.target.style.color==='red') {
        event.target.style.color = 'black';
      } else {
        event.target.style.color = 'red';
      }
    }
    
   
    
    var color = ["#000066", "#330066", "#660066", "#990066", "#CC0066", "#FF0066","#003366", "#333366", "#663366", "#993366", "#CC3366", "#FF3366","#006666", "#336666", "#666666", "#996666", "#CC6666", "#FF6666","#009966", "#339966", "#669966", "#999966", "#CC9966", "#FF9966","#00CC66", "#33CC66", "#66CC66", "#99CC66", "#CCCC66", "#FFCC66","#00FF66", "#33FF66", "#66FF66", "#99FF66", "#CCFF66", "#FFFF66",
"#0000CC", "#3300CC", "#6600CC", "#9900CC", "#CC00CC", "#FF00CC",
    "#0033CC", "#3333CC", "#6633CC", "#9933CC", "#CC33CC", "#FF33CC",
    "#0066CC", "#3366CC", "#6666CC", "#9966CC", "#CC66CC", "#FF66CC",
    "#0099CC", "#3399CC", "#6699CC", "#9999CC", "#CC99CC", "#FF99CC",
    "#00CCCC", "#33CCCC", "#66CCCC", "#99CCCC", "#CCCCCC", "#FFCCCC",
    "#00FFCC", "#33FFCC", "#66FFCC", "#99FFCC", "#CCFFCC", "#FFFFCC",
    "#0000FF", "#3300FF", "#6600FF", "#9900FF", "#CC00FF", "#FF00FF",
    "#0033FF", "#3333FF", "#6633FF", "#9933FF", "#CC33FF", "#FF33FF",
    "#0066FF", "#3366FF", "#6666FF", "#9966FF", "#CC66FF", "#FF66FF",
    "#0099FF", "#3399FF", "#6699FF", "#9999FF", "#CC99FF", "#FF99FF",
    "#00CCFF", "#33CCFF", "#66CCFF", "#99CCFF", "#CCCCFF", "#FFCCFF",
    "#00FFFF", "#33FFFF", "#66FFFF", "#99FF9FF", "#CCFFFF", "#FFFFFF","#000066", "#330066", "#660066", "#990066", "#CC0066", "#FF0066",
    "#003366", "#333366", "#663366", "#993366", "#CC3366", "#FF3366",
    "#006666", "#336666", "#666666", "#996666", "#CC6666", "#FF6666",
    "#009966", "#339966", "#669966", "#999966", "#CC9966", "#FF9966",
    "#00CC66", "#33CC66", "#66CC66", "#99CC66", "#CCCC66", "#FFCC66",
    "#00FF66", "#33FF66", "#66FF66", "#99FF66", "#CCFF66", "#FFFF66",
    "#0000CC", "#3300CC", "#6600CC", "#9900CC", "#CC00CC", "#FF00CC",
    "#0033CC", "#3333CC", "#6633CC", "#9933CC", "#CC33CC", "#FF33CC",
    "#0066CC", "#3366CC", "#6666CC", "#9966CC", "#CC66CC", "#FF66CC",
    "#0099CC", "#3399CC", "#6699CC", "#9999CC", "#CC99CC", "#FF99CC",
    "#00CCCC", "#33CCCC", "#66CCCC", "#99CCCC", "#CCCCCC", "#FFCCCC",
    "#00FFCC", "#33FFCC", "#66FFCC", "#99FFCC", "#CCFFCC", "#FFFFCC",
    "#0000FF", "#3300FF", "#6600FF", "#9900FF", "#CC00FF", "#FF00FF",
    "#0033FF", "#3333FF", "#6633FF", "#9933FF", "#CC33FF", "#FF33FF",
    "#0066FF", "#3366FF", "#6666FF", "#9966FF", "#CC66FF", "#FF66FF",
    "#0099FF", "#3399FF", "#6699FF", "#9999FF", "#CC99FF", "#FF99FF",
    "#00CCFF", "#33CCFF", "#66CCFF", "#99CCFF", "#CCCCFF", "#FFCCFF",
    "#00FFFF", "#33FFFF", "#66FFFF", "#99FF9FF", "#CCFFFF", "#FFFFFF","#000066", "#330066", "#660066", "#990066", "#CC0066", "#FF0066",
    "#003366", "#333366", "#663366", "#993366", "#CC3366", "#FF3366",
    "#006666", "#336666", "#666666", "#996666", "#CC6666", "#FF6666",
    "#009966", "#339966", "#669966", "#999966", "#CC9966", "#FF9966",
    "#00CC66", "#33CC66", "#66CC66", "#99CC66", "#CCCC66", "#FFCC66",
    "#00FF66", "#33FF66", "#66FF66", "#99FF66", "#CCFF66", "#FFFF66",
    "#0000CC", "#3300CC", "#6600CC", "#9900CC", "#CC00CC", "#FF00CC",
    "#0033CC", "#3333CC", "#6633CC", "#9933CC", "#CC33CC", "#FF33CC",
    "#0066CC", "#3366CC", "#6666CC", "#9966CC", "#CC66CC", "#FF66CC",
    "#0099CC", "#3399CC", "#6699CC", "#9999CC", "#CC99CC", "#FF99CC",
    "#00CCCC", "#33CCCC", "#66CCCC", "#99CCCC", "#CCCCCC", "#FFCCCC",
    "#00FFCC", "#33FFCC", "#66FFCC", "#99FFCC", "#CCFFCC", "#FFFFCC",
    "#0000FF", "#3300FF", "#6600FF", "#9900FF", "#CC00FF", "#FF00FF",
    "#0033FF", "#3333FF", "#6633FF", "#9933FF", "#CC33FF", "#FF33FF",
    "#0066FF", "#3366FF", "#6666FF", "#9966FF", "#CC66FF", "#FF66FF",
    "#0099FF", "#3399FF", "#6699FF", "#9999FF", "#CC99FF", "#FF99FF",
    "#00CCFF", "#33CCFF", "#66CCFF", "#99CCFF", "#CCCCFF", "#FFCCFF",
    "#00FFFF", "#33FFFF", "#66FFFF", "#99FF9FF", "#CCFFFF", "#FFFFFF"]


    // getsingleuser 
    const [specialname, setspecialname] = useState();
    const [special , setSpecial] = useState(true);
     async function getsingleuser(name) {
      try {
        const response = await fetch("https://fewdemo.vercel.app/yourpost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: name
          })
        });
        const data = await response.json();
       
        const newdata= data.Posts.map((res)=>res)
        settitel(newdata)
        
        
        setspecialname(newdata[0].author.name)
        setSpecial(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
      
     function back(){
          location.reload()
     }


     function logout(){
    
      localStorage.removeItem('username')
      localStorage.removeItem('id')
       location.reload()
    }

  return (
    <div>
      <div >
      <button onClick={logout}  style={{ zIndex:"1000", background: "green", position: "fixed", top: "10px", right: "0px", transform: "translate(-50%)" }}  >LogOut</button>

     {special? <>
      <h1 style={{ background: "black", position: "fixed", top: "40px", left: "50%", transform: "translate(-50%)" }}>
  welcome dear <span style={{ color: "red" }}>{localStorage.getItem('username')}</span>
</h1>
<div style={{ position: "fixed", top: "10px", left: "50%", transform: "translate(-50%)" }}>
<button  onClick={fetchYourData}  style={{ background: "black", marginLeft:"10px", top: "10px"}} >Your post</button> 
<button onClick={allpost} style={{ background: "black", marginLeft:"10px", top: "10px"  }} >All post</button>
<button onClick={otherpost} style={{ background: "black", marginLeft:"10px", top: "10px" }} >other post</button> 
</div>
     
     </>    :<>
     <h1 style={{ width:"100%",height:"100px", paddingTop:"20px",  background: "black", position: "fixed", top: "-40px", left: "50%", transform: "translate(-50%)" }}>
<span style={{ color: "red" }}>{specialname}</span>   :        All Post 
</h1>
<button onClick={back}  style={{position:"fixed", top:"20px", left:"20px", backgroundColor:"#ddd", color:"black" }}>back</button>
<div style={{ background: "", marginTop:"150px" , marginBottom:"-100px", paddingLeft:"45%", textAlign:'justify'  }}  >
  <p style={{fontSize:"2rem",lineHeight:"0.1rem"  }} >name: &nbsp; <span style={{color:"skyblue"}} >{specialname}</span> </p>
  <p style={{fontSize:"2rem",lineHeight:"0.1rem"  }}>total post: &nbsp; <span style={{color:"orange"}} > {titel.length} </span> </p>
  <p style={{fontSize:"1rem",lineHeight:"0.1rem",color:"red"  }}>about  &nbsp;  </p>
  <p style={{ marginTop:'-10px',  fontSize:"1.4rem", color:"green"}} >
  
     {titel[0].author.bio}</p>
     
</div>
     </>       }      



     <div className='removescroll' style={{  width:"100wh", height:"75vh", overflow:"scroll",  marginTop:"150px", display:"flex", flexWrap:"wrap", justifyContent:'center' }}>
     {all? 
           titel.map((title, index) => {
          
          return <div onMouseEnter={()=>setvalues(title)} onTouchStart={()=>setvalues(title)}  style={{ paddingBottom:"40px", position:"relative", margin:"20px", width:"500px", height:"max-content", backgroundColor:'#ddd',
           color:'black'}}  key={index}>
                <div  style={{display:'flex', justifyContent:'center', width:"100%", gap:"5px", paddingTop:"10px", alignItems:"center"  }}>
                  
                <div onClick={()=>getsingleuser(title.author._id)}   style={{ cursor:"pointer", position:"relative",textAlign:'center',  width:"35px",height:"35px",
                             paddingBottom:"4px",  color:'white',   backgroundColor:color[index]
                             ,  borderRadius:"50%",fontWeight:"900",fontSize:"1.5rem" }} >{title.author.name[0]}</div>
                  
                  <p style={{color:"green"}} >   <span style={{color:"blue"}}>author :</span> {title.author.name}</p>

                  </div>                
                            

            <h2 style={{color:"#1f82f6"}}> <span style={{color:"darkorange", fontWeight:"900" }} >titel : </span>{title.title}</h2>
            <h3 style={{color:"#9e7d1c"}} >content </h3>
            <p>{title.content}</p>
            <FaRegComment onTouchStart={()=>setVal(title)}   onMouseEnter={()=>setVal(title)}   onClick={()=>setComment(true)}  style={{ fontSize:"20px", cursor:"pointer", position:"absolute", right:"10%"}}/>
                   <p  style={{position:"absolute"  , right:"50px", fontWeight:"900" }} > {title.comment.length} </p>        
                   {title.like ? <p style={{position:'absolute', left:"50%" }} >{title.like.users.length}</p> : null}
                   {title.like ?
        title.like.users.map((resp,i) => {
          console.log(resp)
          
          if (resp._id == localStorage.getItem('id')) {
            console.log(resp._id)
                      return <BiSolidLike key={i} className='black' onClick={unlike} onTouchStart={()=>setlike(title._id)}  onMouseEnter={()=>setlike(title._id)}   style={{ zIndex:"100", position:'absolute', left:"50%" , cursor:"pointer", color: "red", fontSize: "20px" }} />             
          }else{

          }
               
        })
        :    <BiSolidLike className='black' onMouseEnter={()=>setlike(title._id)}  onTouchStart={()=>setlike(title._id)}  onClick={like} style={{position:'absolute', left:"50%" , cursor:"pointer", color: "black", fontSize: "20px" }} /> 
      }
                 <BiSolidLike className='black' onMouseEnter={()=>setlike(title._id)} onTouchStart={()=>setlike(title._id)}  onClick={like} style={{position:'absolute', left:"50%" , cursor:"pointer", color: "black", fontSize: "20px" }} /> 

                             </div>
                  
      }):null
      }
     </div>
<h1 onClick={openpost}  style={{position:"fixed", bottom:"20px", right:"40px", cursor:"pointer"}}><IoAddCircle/></h1>
     {
      data?<AddPost/>:null
     }
     {
      comment?<Comments values={val} />:null
     }
      </div>
    </div>
  );
}

export default Posts;
