import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourseComponent = ()=>{
  let {currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const history = useHistory();
  const handleTakeToLogin = () =>{
    history.push("/login");
  }

  const handleChangeTitle = (e)=>{
    setTitle(e.target.value);

  }

  const handleChangeDescription = (e) =>{
    setDescription(e.target.value);
  }

  const handleChangePrice = (e) =>{
    setPrice(e.target.value);
  }

  const postCourse = ()=>{
    CourseService.post(title, description, price).then(() => {
      window.alert("New course has been created")
      history.push("/course")
    }).catch((error)=>{
      console.log(error.response);
      setMessage(error.response.data);
      
    })
  }

  return (
    <div style={{padding:"3rem"}}>
      {!currentUser && (
        <div>
          <p>you must login first</p>
          <button className="btn btn-primary btn-lg"
          onClick = {handleTakeToLogin}
          >
            to login page
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "instructor"&&(
        <div>
          <p>only instructor can post new course</p>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" &&(
        <div className="form-group">
          <label for="exampleforTitle" htmlFor="">Title</label>
          <input name="title" type="text" className="form-control" id="exampleforTitle" onChange={handleChangeTitle} />
          <br />
          <label for="exampleforContent" htmlFor="">Content</label>
          <textarea className="form-control" aria-describedby="emailHelp" name="description" id="exampleforContent" onChange={handleChangeDescription} cols="30" rows="10"></textarea>
          <br />
          <label for="exampleforPrice">Price</label>
          <input type="number" name="price" className="form-control" id="exampleforPrice" onChange={handleChangePrice}/>
          <br />
          <button className="btn btn-primary" onClick={postCourse}>
            Submit
          </button>
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
             {message}
            </div>
          )}
        </div>
      )}  

    </div>
  )

}

export default PostCourseComponent