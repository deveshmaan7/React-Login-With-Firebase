import React, {Component} from 'react';

var firebase = require('firebase');



  var config = {
    apiKey: "AIzaSyAw-mXuhrh_XnBTAkmD9Uym1gl6Kj-1dLU",
    authDomain: "fir-f0e91.firebaseapp.com",
    databaseURL: "https://fir-f0e91.firebaseio.com",
    projectId: "fir-f0e91",
    storageBucket: "fir-f0e91.appspot.com",
    messagingSenderId: "437647567371"
  };
  firebase.initializeApp(config);


class Authen extends Component{

  login(event){
    const email =this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email,password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email,password);

    promise
    .then( user => {
        var lout = document.getElementById('logout');
        lout.classList.remove('hide');
        var err  = "Welcome " + user.email;
        this.setState({err:err});
      });

    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  }

  signup(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email,password);
    promise
    .then(user => {
      var err  = "Welcome " + user.email;
      firebase.database().ref('users/'+ user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({err:err});
    });
    promise
    .catch(e => {
      var err = e.message;
      this.setState({err:err});
    });
  }

  logout(){
    firebase.auth().signOut();
    var err  = "You have been logout " ;
    var lout = document.getElementById('logout');
    lout.classList.add('hide');

    this.setState({err:err});
  }

  google(){
    console.log("I am in a google");

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);

    promise.then( result => {
      var user = result.user;
      console.log(result);
      firebase.database().ref('users/'+ user.uid).set({
        email: user.email,
        name: user.displayName
      });
    });

    promise.catch(e => {
      var err = e.message;
      this.setState({err:err});
    });
  }

  constructor(props){
    super(props);

    this.state = {
      err: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }

  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter Your Email" /><br/>
        <input id="pass" ref="password"  type="password" placeholder="Enter your password"/><br/>
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout}  id="logout" className="hide">Log Out</button><br/>
        <button onClick={this.google}  id="google" className="google" >Sign In With Google</button>
      </div>
    );
  }
}
export default Authen;
