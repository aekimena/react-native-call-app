import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import useZegoUIKit from '../../hooks/ZegoInit';

export const Login = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [loading, setLoading] = useState(false);

  const {onUserLogin} = useZegoUIKit();
  // functions

  const storeUserInfo = async (info: {userID: string; userName: string}) => {
    await EncryptedStorage.setItem('credentials', JSON.stringify(info));
  };

  function signIn() {
    try {
      if (userID == '' || userName == '') {
        return;
      }
      setLoading(true);
      onUserLogin(userID, userName)
        .then(() => {
          storeUserInfo({userID, userName});
          setLoading(false);
          navigation.replace('main');
        })
        .catch(err => {
          console.log('error initializing, ', err);
        });
    } catch (error) {
      console.log('error oooooo', error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{gap: 25, paddingHorizontal: 20, marginTop: 50}}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor={'#999'}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number"
          placeholderTextColor={'#999'}
          onChangeText={setUserID}
        />
        <TouchableOpacity
          onPress={signIn}
          disabled={loading}
          style={{
            height: 45,
            width: '100%',
            backgroundColor: '#3995E6',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {loading ? (
            <ActivityIndicator size={30} color={'#fff'} />
          ) : (
            <Text style={{fontSize: 16, fontWeight: '500', color: '#fff'}}>
              LOGIN
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: '100%',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    color: '#555',
  },
});
