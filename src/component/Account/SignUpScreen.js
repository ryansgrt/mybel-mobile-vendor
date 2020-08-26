import React, { useState, Component, useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button, RadioButton } from 'react-native-paper'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from "react-native-image-picker";
import bgSrc from "./WALLPAPERLAGI.png";
import * as Services from './services/VendorServices'
import { vendorReducer, initialState } from './reducers/VendorReducer';
import { useForm } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons'

function SignUpScreen(props) {
    const [state, dispatch] = useReducer(vendorReducer, initialState)

    const [localState, setLocalState] = useState({ action: 'list' });
    const { register, setValue, handleSubmit, reset, watch } = useForm({ defaultValues });
    const { form } = state;
    const value = watch();
    const [data, setData] = React.useState({
        check_textInputChange: false,
        secureTextEntry: true,
        isValidPassword: true,
        checked: 'MALE'
    });

    const defaultValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        gender: '',
        company: '',
        address: '',

    }

    useEffect(() => {
        register('name')
        register('username')
        register('email', { pattern: /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i })
        register('password')
        register('gender')
        register('company')
        register('address')
        setLocalState({ action: 'list' })
    }, [register])


    const onSubmit = (form) => {
        Services.saveVendor(form).then(response => {
            console.log('add', response);
            setLocalState({ action: 'create' });
            showToast('Data Created.');
            reset(defaultValues)
            props.navigation.navigate('SignIn')
        });
    };

    const showToast = message => {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    return (
        <>
            <ImageBackground style={styles.picture} source={bgSrc} >
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}>
                    <ScrollView>
                        <Text style={styles.text_footer}>NAME</Text>
                        <View style={styles.action}>
                            <MaterialCommunityIcons
                                name="account"
                                color="black"
                                size={20}
                                style={{ marginTop: 13 }}
                            />
                            <TextInput
                                placeholder="Enter name"
                                style={styles.textInput}
                                value={value.name}
                                onChangeText={(form) => { setValue('name', form) }}
                            />
                        </View>
                        <Text style={styles.text_footer}>USERNAME</Text>
                        <View style={styles.action}>
                            <MaterialCommunityIcons
                                name="account-circle"
                                color="black"
                                size={20}
                                style={{ marginTop: 13 }}
                            />
                            <TextInput
                                placeholder="Enter username"
                                style={styles.textInput}
                                value={value.username}
                                onChangeText={(form) => { setValue('username', form) }}
                            />

                        </View>
                        <Text style={styles.text_footer}>EMAIL</Text>
                        <View style={styles.action}>
                            <MaterialCommunityIcons
                                name="email"
                                color="black"
                                size={20}
                                style={{ marginTop: 13 }}
                            />
                            <TextInput
                                placeholder="Enter email"
                                style={styles.textInput}
                                keyboardType="email-address"
                                value={value.email}
                                autoCapitalize="none"
                                onChangeText={(form) => { setValue('email', form) }}
                            />

                        </View>
                        <Text style={styles.text_footer}>Password</Text>
                        <View style={styles.action}>
                            <MaterialCommunityIcons
                                name="key"
                                color="black"
                                size={20}
                                style={{ marginTop: 13 }}
                            />
                            <TextInput
                                placeholder="Enter password"
                                style={styles.textInput}
                                secureTextEntry={data.secureTextEntry ? true : false}
                                value={value.password}
                                autoCapitalize="none"
                                onChangeText={(form) => { setValue('password', form) }}
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
                        <View style={styles.action}>
                        <Text style={styles.text_footer}>Gender</Text>
                            {/* <MaterialCommunityIcons
                                name="office-building"
                                color="black"
                                size={20}
                                style={{ marginTop: 13 }}
                            /> */}
                            <View>
                                <RadioButton.Group
                                    onValueChange={(form) => { setValue('gender', form) }}
                                    value={value.gender}
                                >
                                    <View style={styles.radio}>
                                        <Ionicons name="md-male" size={20} style={{ paddingTop: 5, paddingLeft: 80 }} />
                                        <RadioButton value="MALE"/>
                                        <Text>Male</Text>

                                        <Ionicons name="md-female" size={20} style={{ paddingTop: 5, paddingLeft: 20 }} />
                                        <RadioButton value="FEMALE" />
                                        <Text>Female</Text>
                                    </View>
                                </RadioButton.Group>
                            </View>
                        </View>
                        <Text style={styles.text_footer}>COMPANY</Text>
                        <View style={styles.action}>
                            <MaterialCommunityIcons
                                name="office-building"
                                color="black"
                                size={20}
                                style={{ marginTop: 13 }}
                            />
                            <TextInput
                                placeholder="Enter company"
                                style={styles.textInput}
                                value={value.company}
                                onChangeText={(form) => { setValue('company', form) }}
                            />
                        </View>
                        <Text style={styles.text_footer}>ADDRESS</Text>
                        <View style={styles.action}>
                            <MaterialCommunityIcons
                                name="building"
                                color="black"
                                size={20}
                                style={{ marginTop: 13 }}
                            />
                            <TextInput
                                placeholder="Enter address"
                                style={styles.textInput}
                                value={value.address}
                                onChangeText={(form) => { setValue('address', form) }}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Button
                                style={{ borderRadius: 30, width: 200 }}
                                mode="contained"
                                onPress={handleSubmit(onSubmit)}
                                // onPress={ handleSubmit(onSubmit)}
                                disable={(form == "" ? true : false)}
                            >SUBMIT</Button>
                        </View>
                    </ScrollView>
                </Animatable.View>

            </ImageBackground>
        </>
    )

}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    footer: {
        flex: 6,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
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
        marginTop: 10
    },
    button: {
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: 'blue',
        marginTop: 60
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
    radio: {
        flexDirection: 'row'
    }
})

