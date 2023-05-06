import { Image, StyleSheet, Text, View } from 'react-native';
import SignInForm from '../components/SignInForm';
import AuthForm from '../components/AuthForm';
import { Button } from 'native-base';


export default SignInScreen = ({ navigation }) => {

  const handleSubmit = (values) => {
    if (values.name.includes('@')) {
      const email = values.name;
      delete values.name;
      values.email = email;
    } else {
      delete values.email;
    }
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logoIcon.png')} />
      <AuthForm handleSubmit={handleSubmit} type='SignIn' />
      <Text style={styles.text}>In you do nota have an account, please</Text>
      <Button mt='5' alignSelf='center' w='35%' onPress={() => navigation.navigate('SignUp')}>go to Sign Up</Button>
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