import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';

export default function App() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText]  = useState("Not Yet Scanned");
  const [totalScan, setTotalScan] = useState(0);

  const askForCameraPermission = ()=>{
    (async ()=>{
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'Granted')
    })()
  }

  // Request Camera Permission
  useEffect(()=>{
    askForCameraPermission();
  },[])

  // What Happens when we scan the bar code
  const handleBarCodeScanned = ({type, data}) =>{
    setScanned(True);
    setText(data);
    console.log('Type: ', type , ' Data: ', data);
  }

  // check permissions and return the screens
  if (hasPermission === null){
    return(
      <View style={styles.container}>
        <Text>Requesting For Camera Permission</Text>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Text>Yooooooooo</Text>
      <StatusBar style="auto" />
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
});
