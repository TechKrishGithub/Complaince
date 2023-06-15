import React, {
  useRef, 
  useState,
  useEffect
} from 'react';
import { 
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style';
import { useFocusEffect } from '@react-navigation/native';



const PinGeneration = ({navigation}) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');
  const [user,setUser]=useState('');
  
  const createPinRef=useRef(null);
  const confirmPinRef = useRef(null);

  const backgroundImage = require('../../assets/top.png')

  useEffect(()=>
  {
      GetUsePin();
      createPinRef.current.focus();
  },[]);


  useFocusEffect(
    React.useCallback(() => {
      GetUsePin();
      createPinRef.current.focus();
     
    }, [])
  );



  const GetUsePin=async ()=>
  {
     try{
         const jsonValue=await AsyncStorage.getItem('Pin');
       if(jsonValue != null)
       {
         navigation.replace('PinAccess');
       }
       }
       catch(error)
       {
         console.log(error);
       }
  }



  const handleChangeText = (value) => {
    if(error)
    {
      setError('');
    }
    if (value.length === 4) {
      confirmPinRef.current.focus();
    }
    setPin(value);
  };

  const handleConfirmChangeText = (value) => {
    if(error)
    {
      setError('');
    }
    setConfirmPin(value);
  };

  const handleCreatePinKeyPress = (e) => {
    if (e.nativeEvent.key === 'Backspace' && pin.length === 0) {
      e.preventDefault();
      confirmPinRef.current.blur();
    }
  };

  const handleCreatePin = async () => {

      if(pin==''||confirmPin=='')
      {
        setError('Sorry please Enter Pin')
      }
else
{
  setError('');
  if (pin !== confirmPin) {
    setError('Pins do not match');
    setTimeout(()=>
    {
      setError('');
    },2000)
    setPin('');
    setConfirmPin('');
    createPinRef.current.focus();
  } else if (pin.length < 4) {
    setError('Pin must be 4 digits')
  } else {
    setError('');
    setSuccess('Pin created successfully !');
    try {
      const jsonValue=JSON.stringify(pin);
      await AsyncStorage.setItem('Pin',jsonValue);
    } catch (error) 
    {
      console.log(error);
    }
    setTimeout(()=>
    {
      setError('');
      setSuccess('')
      navigation.navigate('PinAccess');
      setPin('');
      setConfirmPin('');
    },1000)
    
  }
}
  
  };

  const circleSize = 60;
  const dotSize = 20;

  return (
    <ImageBackground source={backgroundImage} style={style.backgroundImage} blurRadius={5}>
    <View style={style.container}>
      <View style={style.containerInside}>
   
      <View style={{flex:1,alignItems:'center'}}>
      <Text style={[style.PinText]}>Create Pin</Text>
      <View style={style.circle}>
        <View style={style.dot}>
          {pin.length >= 1 && <View style={style.dotFilled} />}
        </View>
        <View style={style.dot}>
          {pin.length >= 2 && <View style={style.dotFilled} />}
        </View>
        <View style={style.dot}>
          {pin.length >= 3 && <View style={style.dotFilled} />}
        </View>
        <View style={style.dot}>
          {pin.length >= 4 && <View style={style.dotFilled} />}
        </View>
        <TextInput
          style={style.input}
          ref={createPinRef}
          keyboardType="numeric"
          maxLength={4}
          onChangeText={handleChangeText}
          value={pin}
        />
        {/* <Image source={lockIcon} style={{height:50,width:50}}/> */}
      </View>

     <View style={{paddingTop:30,alignItems:'center'}}>
      <Text style={style.PinText}>Confirm Pin</Text>
      <View style={style.confirmCircle}>
        <View style={style.dot}>
          {confirmPin.length >= 1 && <View style={style.dotFilled} />}
        </View>
        <View style={style.dot}>
          {confirmPin.length >= 2 && <View style={style.dotFilled} />}
        </View>
        <View style={style.dot}>
          {confirmPin.length >= 3 && <View style={style.dotFilled} />}
        </View>
        <View style={style.dot}>
          {confirmPin.length >= 4 && <View style={style.dotFilled} />}
        </View>
        <TextInput
         ref={confirmPinRef}
          style={style.input}
          keyboardType="numeric"
          maxLength={4}
          onChangeText={handleConfirmChangeText}
          value={confirmPin}
          onSubmitEditing={handleCreatePin}
        />
        {/* <Image source={lockIcon} style={{height:50,width:50}}/> */}
      </View>
</View>
      <Text></Text>

    
      {error && 
      <Text style={style.error}>{error}</Text>
      }
      {
        success && 
        <Text style={style.success}>{success}</Text>
      }
    <Text></Text>
<View style={{justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity style={style.button}  onPress={handleCreatePin}>
      <Text style={style.text}>Create Pin</Text>
    </TouchableOpacity>
</View>

    </View>
    </View>
     
    </View>
    </ImageBackground>
  );
};


export default PinGeneration;