import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particle from './components/Particles/Particles';
import SignIn from './components/SingIn/SingIn';
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '363ac9e1a7cb4b8fba3e5556ab9fabb1'
 });

//a403429f2ddf4b49b307e318f00e528b

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

/*   componentDidMount() {
    fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(console.log)
  } */

  calculateFacePosition = (data) => {
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: ClarifaiFace.left_col * width,
      topRow: ClarifaiFace.top_row * height,
      rightCol: width - (ClarifaiFace.right_col * width),
      bottomRow: height - (ClarifaiFace.bottom_row * height),
    }
  }
  
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    console.log('success');
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      if(response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
      }
      this.displayFaceBox(this.calculateFacePosition(response))})
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route ==='home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }


  render() {
    const {isSignedIn, box, imageUrl, route, user} = this.state;
    return (
      <div className="App">
        <Particle />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' ?
        <>
        <Logo />
        <Rank userName={user.name} userEntries={user.entries}/>
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition box={box} imageUrl={imageUrl}/>
        </> 
        : (
          route !== 'register' ?
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
        }
      </div>
    );
  }
}

export default App;
