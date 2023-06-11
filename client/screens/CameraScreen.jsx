import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import ErrorSection from '../components/ErrorSection';
import { Box, Spinner, Text, Toast } from 'native-base';
import ButtonIcon from '../components/ButtonIcon';
import PhotoPreviewSection from '../components/PhotoPreviewSection';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { postNewRecord } from '../redux/recordReducer';
import { selectWeatherData } from '../redux/weatherReducer';

const CameraScreen = ({ navigation }) => {

  const { data } = useSelector(selectWeatherData);

  const description = useRoute().params;

  const dispatch = useDispatch();

  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [permissionError, setPermissionError] = useState();
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraPerission = await Camera.requestCameraPermissionsAsync();
      cameraPerission.status === 'granted' ?
        setHasCameraPermission(true) :
        setPermissionError('Permission to access camera was denied, change this in settings!')
    })();
  }, []);

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      let options = {
        quality: 1,
        base64: true,
        exif: false
      };
      const takenPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takenPhoto);
    }
  };

  const handleRetakePhoto = () => setPhoto(null);


  const toggleCameraType = () => {
    setCameraType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const handleCreateNewRecordWithPhoto = () => {

    const currentDayData = data.currentDay;
    const { mintemp, maxtemp, wind } = currentDayData.recordData;
    const params = {
      mintemp,
      maxtemp,
      wind,
      description,
      weatherData: currentDayData.weatherData,
      photo
    };

    dispatch(postNewRecord(params));
  };


  if (hasCameraPermission === undefined) {
    return (
      <View style={styles.container}>
        <Box
          alignSelf="center"
          rounded='15'
          p='10'
          w='60%'
          mt='30%'
          bg="primary.200"
          shadow={9}
          shadowOffset={{ width: 0, height: 0 }}
          shadowOpacity={0.3}
          shadowRadius={4}
        >
          <Spinner alignSelf='center' size='lg' color='primary.100' />
          <Text
            fontSize='lg'
            fontWeight='500'
            textAlign='center'
            color='primary.50'
            mt='10'
          >
            Pending camera permission
          </Text>
        </Box>

      </View>
    );
  }

  if (!hasCameraPermission) {
    return (
      <View style={styles.container}>
        <ErrorSection errorText={permissionError} />
      </View>
    );
  }

  if (photo) {
    return (
      <PhotoPreviewSection
        photo={photo}
        handleRetakePhoto={handleRetakePhoto}
        handleCreateNewRecordWithPhoto={handleCreateNewRecordWithPhoto}
        navigation={navigation}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} type={cameraType} />
      <Box mt='4%' mb='5%' flexDir='row' justifyContent='space-around' >
        <ButtonIcon handleClick={() => navigation.navigate('Home')} iconPath={require('../assets/icons/homeIcon.png')} />
        <ButtonIcon handleClick={handleTakePhoto} iconPath={require('../assets/icons/cameraIcon.png')} />
        <ButtonIcon handleClick={toggleCameraType} iconPath={require('../assets/icons/switchIcon.png')} />
      </Box>
      <Box
        opacity='0.3'
        position='absolute'
        top='10'
        zIndex='2'
        width='180'
        height='80%'
        alignSelf='center'
        borderColor='primary.100'
        borderWidth='2'
        rounded='50%'
        _text={{
          marginTop: 15,
          fontSize: "15",
          fontWeight: "light",
          color: "primary.50",
          letterSpacing: "lg",
          alignSelf: 'center',
          textAlign: 'center',
          width: 135
        }}
      >
        Please try to fit in this frame
      </Box>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282B34'
  },
  camera: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default CameraScreen;