import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput,Button, Alert } from 'react-native';

// Define the functional component
const Login = ({ navigation }: any) => {
  const [loginObject, setLoginObject] = useState({
    username: '',
    password: '',
  })
  const handleTextUpdate = (value: string, id: string) => {
    setLoginObject((prevState) => ({
      ...prevState,
      [id]: value
    }));
  }
  const handleLogin = () => {
    navigation.navigate('Finder')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.formItems}
          placeholder="Username"
          value={loginObject.username}
          onChangeText={(value) => handleTextUpdate(value, 'username')}
        />
        <TextInput
          style={styles.formItems}
          secureTextEntry={true}
          placeholder="Password"
          value={loginObject.password}
          onChangeText={(value) => handleTextUpdate(value, 'password')}
        />
      </View>
      <Text style={{color:'white', marginTop:5}} onPress={()=>{alert("Sorry, we're still working on the forgot password feature");}}>Forgot Password?</Text>
    </View>
  );
};

// Define the component's styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
    // marginBottom: 50,
    marginTop: 5
  },
  formItems: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 50,
    height: 40,
    backgroundColor: "#fff",
    width: "85%",
    paddingLeft: 20
  },
});

// Export the component
export default Login;
