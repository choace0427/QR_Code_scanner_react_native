// Import necessary modules
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function Scanner() {

    // Define state variables with initial values
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not Yet Scanned");
    const [totalScan, setTotalScan] = useState(0);

    // Function to ask for camera permission
    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted');
        })()
    };

    // Call the askForCameraPermission function when the component mounts
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // Function to handle barcode scanning
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
        setTotalScan((totalScan) => totalScan + 1);
        console.log(`Type: ${type}, Data: ${data}`);
    };

    // Show message while asking for camera permission
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting For Camera Permission</Text>
            </View>
        );
    }

    // Show message when camera permission is not granted
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 15 }}>No Access To Camera !</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        );
    }

    // Show the barcode scanner view when camera permission is granted
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 36, fontWeight: 'bold', margin: 30 }}>Qr Code Scanner</Text>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }}
                />
            </View>
            <Text style={{ fontSize: 27, margin: 25, textAlign: 'center' }}>{text}</Text>
            <Text style={{ fontSize: 20 }}>Total Scan : {totalScan}</Text>

            {/* Show the Scan Again button after a successful scan */}
            {scanned && <Button title={'Scan Again ?'} onPress={() => setScanned(false)} color='tomato' />}
        </View>
    );
}

// Define styles for the components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodebox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 340,
        width: 340,
        overflow: 'hidden',
        borderRadius: 50,
    }
});