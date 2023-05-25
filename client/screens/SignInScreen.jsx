import { Image, StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AuthForm from '../components/AuthForm';
import { Button, Toast } from 'native-base';
import { signIn } from '../services/authService';
import { setToken, setUserName } from '../services/apiClient';

export default SignInScreen = ({ navigation }) => {

  const handleSubmit = async (values) => {
    if (values.name.includes('@')) {
      const email = values.name;
      delete values.name;
      values.email = email;
    } else {
      delete values.email;
    }
    await signIn(values)
      .then(async (response) => {
        const { token, name } = response.data;
        await setToken(token);
        await setUserName(name);
      })
      .catch((error) => {
        Toast.show({
          title: error.response.data.message,
          placement: 'top',
          duration: 3000,
        });
      });;
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logoIcon.png')} />
      <AuthForm handleSubmit={handleSubmit} type='SignIn' />
      <Text style={styles.text}>In you do nota have an account, please</Text>
      <Button mt='5' alignSelf='center' w='35%' rounded='full' onPress={() => navigation.navigate('SignUp')}>go to Sign Up</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282B34'
  },
  logo: {
    alignSelf: 'flex-end',
  },
  text: {
    color: 'gray',
    textAlign: 'center'
  }
});