import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';

export default function App() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not Yet Scanned");
  const [totalScan, setTotalScan] = useState(0);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'Granted')
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, [])

  // What Happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(True);
    setText(data);
    setTotalScan(totalScan + 1);
    console.log('Type: ', type, ' Data: ', data);
  }

  // check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting For Camera Permission</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 15 }}>No Access To Camera !</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={{ fontSize: 30, margin: 25 }}>{text}</Text>
      <Text style={{ fontSize: 20 }}>Total Scan : {totalScan}</Text>
      {scanned && <Button title={'Scan Again ?'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
}

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
