import { View, Text, Button, TextInput, StyleSheet, Alert, Modal, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { FIRESTORE_DB } from "../../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import { Avatar, Switch } from '@rneui/themed';
import avatarMap from "../data/avatarmap";
import axios from "axios"

const HomePage = ({ navigation }: any) => {

    const createUser = async () => {
        addDoc(collection(FIRESTORE_DB, 'users'), userObject);
        setUserObject({
            name: '',
            username: '',
            password: '',
            email: '',
            type: 'musician',
            avatar:'lion'
        });
        alert('user has been created',)
    }
    const [userObject, setUserObject] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        type: 'musician',
        avatar:'lion'
    })
    const handleTextUpdate = (value: string, id: string) => {
        setUserObject((prevState) => ({
            ...prevState,
            [id]: value
        }));
    }
    const handleLogin = () => {
        navigation.navigate('Login')
    }

    const handleCreateUser = async () => {
        try {
            const response = await axios.post('http://localhost:6000/api/createuser', JSON.stringify(userObject));
            setUserObject({
                name: '',
                username: '',
                password: '',
                email: '',
                type: 'musician',
                avatar:'lion'
            });
            navigation.navigate('Finder')


        } catch (error) {
            alert(error);
        }
    }
    const [modalVisible, setModalVisible] = useState(false);
    const avatars = Object.entries(avatarMap)
    // const [avatarKey, setAvatarKey] = useState("lion")

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
                            {/* <View > */}
                                {avatars.map((item) => {
                                    return <Avatar
                                        size={45}
                                        rounded
                                        source={item[1]}
                                        onPress={() => {
                                            // setAvatarKey(item[0]);
                                            setModalVisible(!modalVisible);
                                            handleTextUpdate(item[0], 'avatar');
                                        }}
                                    />
                                })}
                            {/* </View> */}
                        </View>
                    </View>
                </Modal>

                <Avatar
                    size={45}
                    rounded
                    source={avatarMap[userObject.avatar]}
                    onPress={() => { setModalVisible(true)}}
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
                    placeholder="Username"
                    value={userObject.username}
                    onChangeText={(value) => handleTextUpdate(value, 'username')}
                />
                <TextInput
                    style={styles.formItems}
                    secureTextEntry={true}
                    placeholder="Password"
                    value={userObject.password}
                    onChangeText={(value) => handleTextUpdate(value, 'password')}
                />
                <Text style={{color: 'white', fontWeight:'700'}}> I'm looking for:</Text>
                <View style={styles.switchContainter}>
                    {userObject.type === 'musician' ?
                        <Text style={{ color: 'white', fontWeight:'700' }}>Bands</Text> :
                        <Text style={{ color: 'grey', fontWeight:'700' }}>Bands</Text>
                    }                    
                    <Switch
                        value={userObject.type === 'band'}
                        onValueChange={(value) => {
                            userObject.type === 'musician' ?
                            handleTextUpdate('band', 'type'):
                            handleTextUpdate('musician', 'type')                                                            
                        }}
                    />
                    {userObject.type === 'band' ?
                        <Text style={{ color: 'white', fontWeight:'700'  }}>Musicians</Text> :
                        <Text style={{ color: 'grey', fontWeight:'700'  }}>Musicians</Text>
                    }
                </View>

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
        switchContainter: {
            width:'90%',
            display: "flex",
            flexDirection: 'row',
            justifyContent:'space-evenly',
        },


        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },
        modalView: {
            display:'flex',
            flexDirection:'row',
            flexWrap:'wrap',
            width:"80%",
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