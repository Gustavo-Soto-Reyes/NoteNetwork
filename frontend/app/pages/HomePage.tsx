import { View, Text, Button, TextInput, StyleSheet, Alert, Modal, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { FIRESTORE_DB } from "../../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import { Avatar } from '@rneui/themed';
import avatarMap from "../data/avatarmap";
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
    const [modalVisible, setModalVisible] = useState(false);
    const avatars = Object.entries(avatarMap)
    const [avatarKey, setAvatarKey] = useState("penguin")

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>

                <Text style={styles.text}>
                    Please create your account
                </Text>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                            {avatars.map((item)=>{
                                return <Avatar
                                size={45}
                                rounded
                                source={item[1]}
                                onPress={()=>{
                                    setAvatarKey(item[0]);
                                    setModalVisible(!modalVisible)
                                }}
                            />
                            })}
                            </View>
                        </View>
                    </View>
                </Modal>

                <Avatar
                    size={45}
                    rounded
                    source={avatarMap[avatarKey]}
                    onPress={()=>{setModalVisible(true)}}
                />

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
        },



        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          },
          modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          },
          button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
          },
          buttonOpen: {
            backgroundColor: '#F194FF',
          },
          buttonClose: {
            backgroundColor: '#2196F3',
          },

    }
);

export default HomePage;