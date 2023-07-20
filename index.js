// // Using import (ES modules)
// import firebase from 'firebase/app';

// // Using require (CommonJS)
// // const firebase = require('firebase/app');
const firebaseConfig = {

  apiKey: "AIzaSyAsvSRALl7uqOHMP0Jhvh9DRVBT8znrGlg",

  authDomain: "testapp-1d20e.firebaseapp.com",

  projectId: "testapp-1d20e",

  storageBucket: "testapp-1d20e.appspot.com",

  messagingSenderId: "55027173783",

  appId: "1:55027173783:web:cdb3f17624e5c2f849dcd2"

};

firebase.initializeApp(firebaseConfig);

// reset
reset = () => {
  document.getElementById('uemail').reset();
  document.getElementById('upass').reset();
}

// Login
login = () => {
  var email = document.getElementById('uemail').value;
  var password = document.getElementById('upass').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // Login successful, access the user object
      var user = userCredential.user;
      // window.location.assign('index.html');
      document.getElementById('loginMessage').style.color = "green";
      document.getElementById('loginMessage').innerHTML = "Logged in successfully!";
      console.log("Logged in user:", user.email);
    })
    .catch(function (error) {
      // Login failed, handle the error
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById('loginMessage').style.color = "red";
      document.getElementById('loginMessage').innerHTML = errorMessage;
      console.error("Login error:", errorCode, errorMessage);
    });
}

var eye1 = document.getElementById('eyeToggle1');
var count1 = 0;
countClick1 = () => {
  if (eye1.onclick)
    count1++;
  return count1;
}
passwordVisible1 = () => {
  let count = countClick1();
  var passwordType = document.getElementById('pass');
  if (count % 2 == 1) {
    if (passwordType.type === "password") {
      passwordType.type = 'text';
      eye1.className = "fa-regular fa-eye-slash"
    }
  }
  else {
    passwordType.type = "password";
    eye1.className = "fa-regular fa-eye"

  }
}

var eye2 = document.getElementById('eyeToggle2');
var count2 = 0;
countClick2 = () => {
  if (eye2.onclick)
    count2++;
  return count2;
}
passwordVisible2 = () => {
  let count2 = countClick2();
  var passwordType = document.getElementById('repass');
  if (count2 % 2 == 1) {
    if (passwordType.type === "password") {
      passwordType.type = 'text';
      eye2.className = "fa-regular fa-eye-slash"
    }
  }
  else {
    passwordType.type = "password";
    eye2.className = "fa-regular fa-eye"

  }
}



// SIGN UP
signUp = () => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;
  var confirmPassword = document.getElementById("repass").value;
  if (password == confirmPassword) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User registration successful
        const user = userCredential.user;
        console.log('User registered:', user);
        document.getElementById('message').style.color = "green";
        document.getElementById('message').innerHTML = "Account created successfully!";
      })
      .catch((error) => {
        // Handle registration error
        document.getElementById('message').style.color = "red";
        document.getElementById('message').innerHTML = error;
        console.log('Registration error:', error);
      });
  }
  else {
    document.getElementById('message').style.color = "red";
    document.getElementById('message').innerHTML = "Password doesn't match!";
  }
}
const db = firebase.firestore();

// Create a reference to a collection
const rf = db.collection('users');
// Store in db
save = () => {
  var data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("pass").value

  }
  rf.add(data).then(docRef => {
    console.log('Document written with ID: ', docRef.id);
  })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
};
// Retrieve data from db
getData = () => {
  rf.get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        document.getElementById('result').innerHTML = doc.data().password;

        console.log(doc.id, ' => ', doc.data());
      });
    })
    .catch(error => {
      console.error('Error getting documents: ', error);
    });
}

const provider = new firebase.auth.GoogleAuthProvider();

// Attach an event listener to the sign-in button
const signInButton = document.getElementById('google-sign-in-button');
signInButton.addEventListener('click', () => {
  // Start the sign-in process
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // User signed in successfully
      const user = result.user;
      console.log('Signed in user:', user);
      console.log('current user:', firebase.auth().currentUser);
    })
    .catch((error) => {
      // Handle sign-in error
      console.error('Error signing in:', error);
    });
});

const docRef = db.collection('users').doc('userdetails');
update = () => {

  const newData = {
    password: document.getElementById("npass").value

    // Add more fields as needed
  };

  // Update the document with the new data
  docRef.update(newData)
    .then(() => {
      console.log('Document updated successfully');
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
}
