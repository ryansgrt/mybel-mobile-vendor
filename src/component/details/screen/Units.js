import React, { useReducer, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { vendorReducer, initialState } from '../../Account/reducers/VendorReducer';
import AsyncStorage from '@react-native-community/async-storage';
import { SET_LOADING } from '../../Account/reducers/VendorAction';
import * as Services from '../../Account/services/VendorServices';
import { Card } from 'react-native-paper';


const Units = () => {

    const [state, dispatch] = useReducer(vendorReducer, initialState)
    const setLoading = () => dispatch({ type: SET_LOADING })
    const { form } = state;

    const [units, setUnits] = React.useState([])
    console.log('UNIT FORM', form)

    const getUnitVendor = async () => {
        try {
            const vendor = await AsyncStorage.getItem('userToken')
            console.log('VENDOR GET SERVICE UNITS', vendor);

            setLoading()
            Services.getVendorId(vendor).then(response => {
                console.log('PROFILE RESPONSE UNITS', response);
                setUnits(response.units)
            })

        } catch (error) {
            console.log(error);
        }
    }
    console.log(units, "unitnya nih");

    useEffect(() => {
        getUnitVendor();
    }, [])

    return (
        <View >
            <ScrollView >
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        units.map((unit, index) => {
                            console.log('UNIT MAP', unit);
                            console.log(unit.name);
                            console.log('INDEX', index);

                            return (
                                <View style={{ flexWrap: 'wrap' }} key={index}>
                                    <View style={styles.container}>
                                        <TouchableHighlight  >
                                            <Card style={styles.cardStyle}>
                                                <Image source={{ uri: `https://87d1a54af0df.ngrok.io/unit/photo/${unit.id}` }} style={styles.photo} />
                                                <Text style={styles.title} >{unit.name}</Text>
                                                <Text style={styles.title}>Rp. {unit.price}</Text>
                                            </Card>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            )
                        })}
                </View>
            </ScrollView>

        </View>
    )
}
export default Units;

const { width, height } = Dimensions.get('window')

// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const productNumColums = 2;
// item size
const PRODUCT_ITEM_HEIGHT = 80;
const PRODUCT_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: PRODUCT_ITEM_MARGIN,
        marginTop: 20,
        width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        height: PRODUCT_ITEM_HEIGHT + 75,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15,
        // flexDirection: 'row'
    },
    photo: {
        width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        height: PRODUCT_ITEM_HEIGHT,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

    },
    title: {
        flex: 1,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    price: {
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
        color: '#444444',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    cardStyle: {
        justifyContent: 'space-between',

    }
})