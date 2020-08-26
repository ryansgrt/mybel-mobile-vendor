import React, { useState, useEffect, useReducer } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, TouchableHighlight, Image, Text, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Services from '../../Account/services/VendorServices';
import { Card } from 'react-native-paper';
import { vendorReducer, initialState } from '../../Account/reducers/VendorReducer';

const DesignInterior = props => {

    // const [state, dispatch] = useReducer(vendorReducer, initialState)
    const [design, setDesign] = useState([]);
    console.log('DESIGN', design);

    // const setLoading = () => dispatch({ type: SET_LOADING });

    const getDesignInterior = async () => {
        try {
            const vendor = await AsyncStorage.getItem('userToken')
            console.log('VENDOR GET SERVICE design', vendor);

            // setLoading()
            Services.getVendorId(vendor).then(response => {
                console.log('PROFILE RESPONSE DESIGN', response);
                setDesign(response.designInteriors)
            })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDesignInterior();
    }, [])

    return (
        <View >
            <ScrollView >
                <View >
                    {
                        design.map((design, index) => {
                            console.log('UNIT DESIGN', design);
                            console.log(design.name);
                            console.log('INDEX', index);

                            return (
                                <View style={styles.container} key={index}>
                                    <TouchableHighlight >
                                        <Card style={styles.cardStyle}>
                                            <ImageBackground source={{ uri: `https://87d1a54af0df.ngrok.io/design/photo/${design.id}` }} style={styles.photo} >
                                                <View style={styles.blurImage}>
                                                    <Text style={styles.title} >{design.room.name}</Text>
                                                    <Text style={styles.title}>{design.description}</Text>
                                                    <Text style={styles.title}>Rp. {design.price}</Text>
                                                </View>
                                            </ImageBackground>
                                        </Card>
                                    </TouchableHighlight>
                                </View>

                            )

                        })}
                </View>
            </ScrollView>

        </View >
    )
}
export default DesignInterior;

const { width, height } = Dimensions.get('window')

// orientation must fixed
const SCREEN_WIDTH = width > height ? width : height;

const productNumColums = 2;
// item size
const PRODUCT_ITEM_HEIGHT = 200;
const PRODUCT_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: PRODUCT_ITEM_MARGIN,
        marginTop: 20,
        // width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        // height: PRODUCT_ITEM_HEIGHT + 75,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15,


    },
    photo: {
        width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        height: PRODUCT_ITEM_HEIGHT,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        marginRight: 15

    },
    title: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    price: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        color: '#444444',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    cardStyle: {
        justifyContent: 'space-between',
    },
    blurImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba( 0, 0, 0, 0.6 )',

    }
})