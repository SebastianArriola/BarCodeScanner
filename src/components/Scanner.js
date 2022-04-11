import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const Scanner = () => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [useCamera, setUseCamera] = useState(false)
    const [data, setData] = useState()

    useEffect(() => {
      
        askForCameraPermission();

    }, [])
    

    const askForCameraPermission = () =>{

        (async () => {

            const {status} =  await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted')

        })

    }
    
    /*if(hasPermission === "false"){

        return(
            <View>
            <Text>

                Please allow permissions

            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={askForCameraPermission}
            >
                <Text>Dar permisos de camara</Text>
            </TouchableOpacity>
            </View>

        )

    */

    const useCameraOn = () =>{

        setUseCamera(true)
        setScanned(false)

    }
        
    const handleBarCodeScanned = ({ type, data }) => {

        if (!scanned) {

            setData(data) 
            setScanned(true);
            setUseCamera(false);           

        }

    }

    return (
        <View style={styles.container}>
            {useCamera ? <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        /> : <View style={styles.container}>{data && <View style={styles.info}><Text style={styles.text}>{data}</Text></View>}
        <TouchableOpacity onPress={useCameraOn}>   
        <View style={styles.button}>
        <Text style={styles.textButton}>Escanear codigo</Text>
        </View>
        </TouchableOpacity>
        </View>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {

        justifyContent: 'center',
        marginTop: 50,
        borderRadius: 50,
        width: 200,
        height: 50,
        backgroundColor: '#4DA0FD'

    },
    text: {

        color: 'white',
        fontSize: 17,

    },
    info: {

        alignItems: 'center',
        backgroundColor: '#A1B8D2',
        width: 400,
        height: 300,
        borderRadius: 10,
        justifyContent: 'center'

    },
    textButton: {

        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'

    }
});

export default Scanner