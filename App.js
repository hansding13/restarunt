import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import Home from './screens/Home';
import LoginForm from './LoginForm';
import {auth } from './firebase'
import { AppRegistry} from 'react-native';




if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('X');
    AppRegistry.runApplication('main', { rootTag });
}


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    console.log('User logged in:', email); // Logging the email from the component's state
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorCode, errorMessage);
      });
  };

  const handleRegister = () => {
      console.log('User logged in:', email);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch(error => alert(error.message));
  };
  

  let content = isLoggedIn ? <Home /> : (
    <LoginForm
      onLogin={handleLogin}
      onRegister={handleRegister}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );

  if (Platform.OS === 'web') {
    content = (
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {content}
      </View>
    );
  }

  return <>{content}</>;
};

export default App;

