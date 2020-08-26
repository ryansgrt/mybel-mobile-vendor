import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import bgSrc from "./WALLPAPERLAGI.png";
import * as Animatable from 'react-native-animatable';

const HomeScreen = props => {
    return (
        <ImageBackground style={styles.picture} source={bgSrc} >
            <View style={{marginTop: 450}}>
                <Animatable.View animation="zoomIn" style={styles.buttonStyle}>
                    <TouchableOpacity style={styles.buttons} onPress={() => props.navigation.navigate('SignIn')}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </TouchableOpacity>
                </Animatable.View>
                <Animatable.View animation="zoomIn" style={styles.buttonStyle}>
                    <TouchableOpacity style={styles.buttonsSignUp} onPress={() => props.navigation.navigate('SignUp')}>
                        <Text style={styles.buttonSignUp}>SIGN UP</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </ImageBackground>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    buttonSignUp: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ffff',
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
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
    buttonsSignUp: {
        borderRadius: 25,
        width: 300,
        marginVertical: 10,
        paddingVertical: 13,
        backgroundColor: "blue"
    },
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    buttonStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
    }
})