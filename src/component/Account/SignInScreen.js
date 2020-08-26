import React, { useState, useReducer, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import bgSrc from "./WALLPAPERLAGI.png";
import { initialState, VendorReducer } from './reducers/VendorReducer';
import { AuthContext } from './context/AuthContext'
import { useTheme } from 'react-native-paper';
import { login } from './services/VendorServices';

const SignInScreen = props => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    // const { secureTextEntry, check_textInputChange, isValidUser, isValidPassword, form } = state;
    const { signIn } = useContext(AuthContext);
    console.log('SIGN IN useContext', signIn);


    const handleInputChange = (value) => {
        if (value.trim().length >= 4) {
            setData({
                ...data,
                username: value,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: value,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (value) => {
        if (value.trim().length >= 8) {
            setData({
                ...data,
                password: value,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: value,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (value) => {
        if (value.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {
        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }
        login(userName, password)
            .then((response) => {
                let foundUser = []

                if (response) {
                    console.log('LOGIN', response);

                    const { username, id } = response
                    foundUser = [{ userName: username, userToken: id }]

                }

                if (foundUser.length == 0) {
                    Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                        { text: 'Okay' }
                    ]);
                    return;
                }
                signIn(foundUser);
            })
    }

    return (
        <ImageBackground style={styles.picture} source={bgSrc} >

            <View style={styles.header}>
                <Text style={styles.text_header}></Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}>
                <ScrollView>
                    <Text style={styles.text_footer}>USERNAME</Text>
                    <View style={styles.action}>
                        <FontAwesomeIcon
                            name="user-circle-o"
                            color="black"
                            size={20}
                            style={{ marginTop: 13 }}
                        />
                        <TextInput
                            placeholder="Enter username"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => handleInputChange(value)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                                style={{ marginTop: 13 }}
                            />
                            : null}

                    </View>

                    <Text style={styles.text_footer, { marginTop: 40 }}>PASSWORD</Text>
                    <View style={styles.action}>
                        <FontAwesomeIcon
                            name="lock"
                            color="black"
                            size={20}
                            style={{ marginTop: 13 }}
                        />

                        <TextInput
                            placeholder="Enter password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => handlePasswordChange(value)}
                        />

                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                    }
                    <Animatable.View
                        animation="bounceIn" style={styles.button}>
                        <TouchableOpacity style={styles.buttonsSignUp} onPress={() => { loginHandle(data.username, data.password) }}
                        >
                            <Text style={styles.buttonSignUp}>LET'S  GO</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                    <View style={styles.button2}>
                        <TouchableOpacity style={styles.buttonText} onPress={() => props.navigation.goBack()}>
                            <Text style={styles.buttonText}>BACK</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>

        </ImageBackground>
    )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 1.5,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: 'black',
        fontSize: 15
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 15,
        color: 'black',
    },
    button2: {
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: 'yellow',
        marginTop: 20
    },
    button: {
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: 'blue',
        marginTop: 15
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSignIn: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonSignUp: {
        fontSize: 13,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 13,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center'
    },
    buttons: {
        borderRadius: 25,
        width: 300,
        marginVertical: 10,
        paddingVertical: 13,
        backgroundColor: "white"
    },
})
