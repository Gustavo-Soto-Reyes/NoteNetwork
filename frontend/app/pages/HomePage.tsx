import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { FIRESTORE_DB } from "../../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import axios from "axios"

const HomePage = ({ navigation }: any) => {

    const createUser = async () => {
        addDoc(collection(FIRESTORE_DB, 'users'), userObject);
        setUserObject({
            name: '',
            password: '',
            email: '',
            type: '',
        });
        alert('user has been created',)
    }
    const [userObject, setUserObject] = useState({
        name: '',
        password: '',
        email: '',
        type: 'user',
    })
    const handleTextUpdate = (value: string, id: string) => {
        setUserObject((prevState) => ({
            ...prevState,
            [id]: value
        }));
    }
    const handleLogin = () => {
        navigation.navigate('Finder')
    }

    const handleCreateUser = async () => {
        try {
            const response = await axios.post('http://localhost:6000/api/createuser', JSON.stringify(userObject));
            setUserObject({
                name: '',
                password: '',
                email: '',
                type: '',
            });
            navigation.navigate('Finder')
            

        } catch (error) {
            alert(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.text}>
                    I hope you practiced today
                </Text>
            </View>
            <View style={styles.formContainer}>

                <Text style={styles.text}>
                    Please create your account
                </Text>
                <TextInput
                    style={styles.formItems}
                    placeholder="Name"
                    value={userObject.name}
                    onChangeText={(value) => handleTextUpdate(value, 'name')}
                />
                <TextInput
                    style={styles.formItems}
                    placeholder="Email"
                    value={userObject.email}
                    onChangeText={(value) => handleTextUpdate(value, 'email')}
                />
                <TextInput
                    style={styles.formItems}
                    secureTextEntry={true}
                    placeholder="Password"
                    value={userObject.password}
                    onChangeText={(value) => handleTextUpdate(value, 'password')}
                />
                <TextInput
                    style={styles.formItems}
                    placeholder="Band or Musician"
                    value={userObject.type}
                    onChangeText={(value) => handleTextUpdate(value, 'type')}
                />

                <Button onPress={handleCreateUser} title="Create Account" />



            </View>
            <Text style={styles.text}>Already have an account?</Text>
            <Button onPress={handleLogin} title="Login" />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: "#444444",
            height: "100%",
            justifyContent: "center"

        },
        formContainer: {
            marginTop: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: 10,
            marginBottom: 50
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
        text: {
            color: "#ffffff"
        }

    }
);

export default HomePage;