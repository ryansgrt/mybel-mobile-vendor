import React, { useContext, useReducer, useState, useEffect } from 'react';
import { ScrollView, View, Text, ImageBackground, StyleSheet, TextInput, Image, Button, Modal } from 'react-native';
import { Avatar } from 'react-native-paper';
import { AuthContext } from '../../Account/context/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import * as Services from '../../Account/services/VendorServices';
import { initialState, vendorReducer } from '../../Account/reducers/VendorReducer';
import { SET_LOADING, FETCH_COMPLETE } from '../../Account/reducers/VendorAction';
import bg from '../pictures/backgroundPhotoProfile.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {
    const { signOut } = useContext(AuthContext)
    const [state, dispatch] = useReducer(vendorReducer, initialState)
    const [modalOpen, setModalOpen] = useState(false)
    const { form } = state
    const [text, setText] = useState(form)
    const [editable, setEditable] = useState(true)
    const [localState, setLocalState] = useState({ action: 'list' });
    console.log('FORM PROFILE', state.form);
    console.log('ID FORM', form.id);
    const [data, setData] = React.useState({
        check_textInputChange: false,
        secureTextEntry: true,
        isValidPassword: true,
        checked: 'MALE'
    });

    const setLoading = () => dispatch({ type: SET_LOADING })
    const fetchComplete = payload => dispatch({ type: FETCH_COMPLETE, payload })


    const getProfileVendor = async () => {
        try {
            const vendor = await AsyncStorage.getItem('userToken')
            console.log('VENDOR GET SERVICE', vendor);

            setLoading()
            Services.getVendorId(vendor).then(response => {
                console.log('PROFILE RESPONSE', response);
                fetchComplete(response);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const showToast = message => {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    };

    const handleClickEdit = (vendor) => {
        Services.updateVendor(vendor).then(response => {
            setLocalState('update')
            showToast('DATA UPDATED')
        })
    }

    const handleClickSave = () => {
        handleClickEdit(vendor)
        // setEditable(true)
    }

    // const handleClick = () => {
    //     setEditable(false)
    // }

    useEffect(() => {
        getProfileVendor()
    }, [])

    return (
        <ScrollView>
            <Modal visible={modalOpen} transparent={true}>
                <View style={{ flex: 1, backgroundColor: '#000000aa' }}>
                    <View style={{ backgroundColor: '#85F0DA', marginVertical: 40, marginHorizontal: 20, flex: 1, borderRadius: 10, borderColor: '#F2F8F7', borderWidth: 8 }}>
                        <ScrollView>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                    <Icons name="account" size={30} style={styles.iconStyle} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Name</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TextInput style={{ width: 300, textAlign: 'center' }} underlineColorAndroid='black'>{form.name}</TextInput>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                    <Icons name="account-key" size={30} style={styles.iconStyle} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 3 }}>Username</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TextInput style={{ width: 300, textAlign: 'center' }} underlineColorAndroid='black'>{form.username}</TextInput>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                    <Icons name="email" size={30} style={styles.iconStyle} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 3 }}>Email</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TextInput style={{ width: 300, textAlign: 'center' }} underlineColorAndroid='black'>{form.email}</TextInput>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                    <Icons name="gender-male-female" size={30} style={styles.iconStyle} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 3 }}>Gender</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TextInput style={{ width: 300, textAlign: 'center' }} underlineColorAndroid='black'>{form.gender}</TextInput>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                    <Icons name="key" size={30} style={styles.iconStyle} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 3 }}>Password</Text>
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <TextInput style={{ width: 300, textAlign: 'center' }} underlineColorAndroid='black'>{form.password}</TextInput>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                    <Icons name="home-city-outline" size={30} style={styles.iconStyle} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 3 }}>Company</Text>
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <TextInput style={{ width: 300, textAlign: 'center' }} underlineColorAndroid='black'>{form.company}</TextInput>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                    <Icons name="map-marker-radius" size={30} style={styles.iconStyle} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 3 }}>Address</Text>
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <TextInput style={{ width: 300, textAlign: 'center' }} underlineColorAndroid='black'>{form.address}</TextInput>
                                </View>
                                <View style={{marginVertical: 20, width: 200, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Button title='Cancel' onPress={() => setModalOpen(false)} />
                                    <Button title='Update' onPress={() => handleClickEdit()} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <ImageBackground style={styles.background} source={bg}>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'yellow' }}>{form.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 90 }}>
                    <View style={styles.profileView}>
                        <Avatar.Image source={{ uri: `http://e80e6a76b8a8.ngrok.io/vendor/photo/${form.id}` }} size={150} />
                    </View>
                    <View style={{ marginTop: 120, marginLeft: 20 }}>
                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }} onPress={() => setModalOpen(true)}>
                            <Image source={require('../../../../asset/images/setting.png')} style={{ width: 40, height: 40 }} />
                            <Text style={{ color: 'blue' }}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.textInputView}>
                <View style={styles.formStyle}>
                    <View style={styles.title}>
                        <Icons name="account-key" size={25} style={styles.iconStyle} />
                        <Text style={styles.titleText}>Username</Text>
                    </View>
                    <Text style={styles.textInput}>{form.username}</Text>
                </View>
                <View style={styles.formStyle}>
                    <View style={styles.title}>
                        <Icons name="email" size={25} style={styles.iconStyle} />
                        <Text style={styles.titleText}>Email</Text>
                    </View>
                    <Text style={styles.textInput}>{form.email}</Text>
                </View>
                <View style={styles.formStyle}>
                    <View style={styles.title}>
                        <Icons name="human-male-female" size={25} style={styles.iconStyle} />
                        <Text style={styles.titleText}>Gender</Text>
                    </View>
                    <Text style={styles.textInput}>{form.gender}</Text>
                </View>
                <View style={styles.formStyle}>
                    <View style={styles.title}>
                        <Icons name="key" size={25} style={styles.iconStyle} />
                        <Text style={styles.titleText}>Password</Text>
                    </View>
                    <TextInput
                        value={form.password}
                        secureTextEntry={data.secureTextEntry}
                        editable={!editable}
                        onChangeText={(form) => setText(form)}
                    />
                </View>
                <View style={styles.formStyle}>
                    <View style={styles.title}>
                        <Icons name="office-building" size={25} style={styles.iconStyle} />
                        <Text style={styles.titleText}>Company</Text>
                    </View>
                    <Text style={styles.textInput}>{form.company}</Text>
                </View>
                <View style={styles.formStyle}>
                    <View style={styles.title}>
                        <Icons name="map-marker-multiple" size={25} style={styles.iconStyle} />
                        <Text style={styles.titleText}>Address</Text>
                    </View>
                    <Text style={styles.textInput}>{form.address}</Text>
                </View>
            </View >
            <View >
                <View style={styles.buttonStyle}>
                    <TouchableOpacity onPress={() => { signOut() }} style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <AntDesign name="logout" size={25} color={'red'} />
                        <Text style={{ fontSize: 15, color: 'red', fontWeight: 'bold', marginLeft: 10 }}>SIGN OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView >
    )
}

export default Profile;

const styles = StyleSheet.create({
    background: {
        width: 400,
        height: 150,
        alignItems: 'center',
        marginHorizontal: 6,
        marginBottom: 50,
    },
    profileView: {
        marginTop: 10,
        borderRadius: 30
    },
    title: {
        flexDirection: 'row',
        marginVertical: 10
    },
    titleText: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 3,
    },
    iconStyle: {
        color: 'blue'
    },
    textInput: {
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 10
    },
    textInputView: {
        marginTop: 30,
        backgroundColor: '#E6E4E4',
        borderRadius: 20,
        width: 360,
        marginLeft: 25,
    },
    formStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
