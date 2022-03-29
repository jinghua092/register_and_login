import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom"
import courseService from '../services/course.service';

const CourseComponent = (props) => {
    let {currentUser, setCurrentUser} = props;
    const history = useHistory();
    const handleTakeToLogin = () =>{
        history.push("/login")
    }
    let [courseData, setCourseData] = useState(null);
    useEffect(()=>{
        console.log('using effect');
        let _id;
        if (currentUser) {
            _id = currentUser.user._id
        } else {
            _id=""
        }

        if (currentUser.user.role == "instructor"){
            courseService.get(_id).then((data)=>{
                setCourseData(data);
            }).catch((err)=>{
                console.log('err');
                
            })
        } else if(currentUser.user.role == "student"){
            courseService.getEnrolledCourses(_id).then((data)=>{
                console.log(data);
                setCourseData(data.data)
                
            }).catch((error)=>{
                console.log(error);
                
            })
            
        }
        
    }, [])

  return (
    <div style={{padding:"3rem"}}> 
    {
        !currentUser && (
            <div>
                <p>You must login first</p>
                <button onClick={handleTakeToLogin} className='btn btn-primary btn-lg'>login page</button>
            </div>
        )
    }

    {
        currentUser && currentUser.user.role == "instructor" && 
            (<div><h1> Welcome to instructor's Course page</h1>
            </div>)
        
    }

    {
        currentUser && currentUser.user.role == "student" && 
            (<div><h1> Welcome to student's Course page</h1>
            </div>)
        
    }

    {
        currentUser && courseData && courseData.length != 0 &&(
            <div> 
              <p>here's the data from server</p>
              {
                  courseData.map(course =>(
                      <div className='card' style={{width:"18rem"}}>
                        <div className='card-body'>
                            <h5 className='card-title'>{course.title}</h5>
                            <p className='card-text'>{course.description}</p>
                            <p className=''>Student count:{course.students.length}</p>
                            <button className='btn btn-primary'>{course.price}</button>
            
                        </div>
                      </div>
                  ))
              }
            </div>
        )
    }

   

    </div>
  )
}

export default CourseComponent