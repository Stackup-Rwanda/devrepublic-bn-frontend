/* eslint-disable react/prop-types */
import React from 'react';
import {
  Carousel, Image, Button,
} from 'react-bootstrap';
import BackgroundImage from '../../assets/travel-bn.jpg';
import BackgroundImage2 from '../../assets/travel-bn-2.jpg';
import BackgroundImage3 from '../../assets/travel-bn-3.jpg';
import NavBarComponent from './NavbarComponent';
import translate from '../languages/Translate';
import Footer from './Footer';
import '../../scss/app.scss';

const Home = (props) => {
  const handleClick = (e) => {
    if (e.target.value === 'Signup') {
      props.history.push('/signup');
    } else {
      props.history.push('/login');
    }
  };
  return (
    <div>
      <NavBarComponent />
      <Carousel>
        <Carousel.Item>
          <Image className="home-image" src={BackgroundImage} />
          <Carousel.Caption>
            <div className="home-container">
              <h3 className="home-text">
                {translate('Welcome to Barefoot Nomad')}
              </h3>
            </div>
            <Button className="home-btn signup-btn" onClick={handleClick} value="Signup">
              {translate('Sign Up')}
            </Button>
            <Button className="home-btn signin-btn" onClick={handleClick} value="Signin">
              {translate('Log In')}
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="home-image" src={BackgroundImage2} />
          <Carousel.Caption>
            <div className="home-container">
              <h3 className="home-text">
                {translate('Make travel arrangement with us.')}
              </h3>
            </div>
            <Button className="home-btn" onClick={handleClick} value="Signup">
              {translate('Sign Up')}
            </Button>
            <Button className="home-btn" onClick={handleClick} value="Signin">
              {translate('Log In')}
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="home-image" src={BackgroundImage3} />
          <Carousel.Caption>
            <div className="home-container">
              <h3 className="home-text">
                {translate('Have more control on your travel experience.')}
              </h3>
            </div>
            <Button className="home-btn" onClick={handleClick} value="Signup">
              {translate('Sign Up')}
            </Button>
            <Button className="home-btn" onClick={handleClick} value="Signin">
              {translate('Log In')}
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Footer />
    </div>
  );
};

export default Home;
