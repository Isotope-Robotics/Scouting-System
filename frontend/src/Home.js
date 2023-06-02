import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Home.css';
import logo from "./react-logo.png";
import Footer from './Footer';

//Image Imports
import TeamImg from './img/frc2023-team.jpg';
import img1 from './img/20230318_164742.jpg';

function Home() {

  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('/api/token', {
      withCredentials: true,
      headers: {
        'Authorization' : localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.user);
        } else {
          setAuth(false);
          setName("Not Signed In")
        }
      })
      .then(err => console.error(err))
  })

  return (

    <div className="container">

      <div className="d-flex justify-content-end">
        {
          auth ?
            <div className='user'>
              <p>Signed In As: {name}</p> 
            </div>
           
            :
            <div className='user'>
              <p></p>
            </div>
        }
      </div>

      <div className="Welcome">
        <h1>Welcome to FRC Team 7429 Convergence Robotics Website</h1>
      </div>

      <div className="Info">
        <img className='team-img' src={TeamImg}/>
        <br/>
        <p>FRC Team 7429 is a school-based FIRST Robotics Competition Team in Chesterfield, Va. 
          To learn more please visit the About tab or explore just explore around. If you are a student please login to 
          use all the websites features.
        </p>

        <br/>

        <h3>Competing in 2023 At:</h3>
        <p>CHS Portsmouth Event
          <br/>
          CHS Glen Allen Event
        </p>
      </div>

      <div className="react-logo-container" >
        <p>Built With</p>
        <img src={logo} alt='React-Logo' width={'1300%'} height={'auto'} className='image-react' />
      </div>

    <br/>
    </div>
  )
}

export default Home