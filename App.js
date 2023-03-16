import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

const firebaseConfig = {
  // Configuración de Firebase
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <NavigationBar handleLogout={handleLogout} />
          <Profile user={user} />
          <Today />
          <Food />
          <History />
          <Recommendations />
        </>
      ) : (
        <>
          <LoginForm
            handleLogin={handleLogin}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            error={error}
          />
          <RegistrationForm />
        </>
      )}
    </div>
  );
}

function LoginForm(props) {
  return (
    <form onSubmit={props.handleLogin}>
      <input type="email" placeholder="Email" onChange={props.handleEmailChange} />
      <input type="password" placeholder="Password" onChange={props.handlePasswordChange} />
      <button type="submit">Login</button>
      {props.error && <p>{props.error}</p>}
    </form>
  );
}

function RegistrationForm() {
  return (
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}

function NavigationBar(props) {
  return (
    <div>
      <button>Perfil</button>
      <button>Hoy</button>
      <button>Alimentos</button>
      <button>Historial</button>
      <button>Recomendaciones</button>
      <button onClick={props.handleLogout}>Logout</button>
    </div>
  );
}

function Profile(props) {
  const { displayName, email } = props.user;
  return (
    <div>
      <h1>{displayName}</h1>
      <p>{email}</p>
    </div>
  );
}

function Today() {
  return <h2>Today's Information</h2>;
}

function Food() {
  return <h2>Food Information</h2>;
}

function History() {
  return <h2>History Information</h2>;
}

function Recommendations() {
  return <h2>Recommendations Information</h2>;
}

export default App;