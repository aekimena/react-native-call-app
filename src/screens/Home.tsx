import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import KeyCenter from '../utils/keyCenter';
import EncryptedStorage from 'react-native-encrypted-storage';

const contacts = [
  {
    id: '1',
    name: 'Barry Jay',
    number: '09876543',
    imageurl: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: '2',
    name: 'Kelly',
    number: 'kelly123',
    imageurl: 'https://picsum.photos/id/37/200/300',
  },
  {
    id: '3',
    name: 'Bjorn Ironside',
    number: '09876543',
    imageurl: 'https://picsum.photos/id/247/200/300',
  },
  {
    id: '4',
    name: 'aekimena',
    number: '',
    imageurl: 'https://picsum.photos/id/147/200/300',
  },
];

export const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const existingInfo = await EncryptedStorage.getItem('credentials');
      if (existingInfo) {
        setData(
          contacts.filter(
            item => item.number !== JSON.parse(existingInfo).userID,
          ),
        );
      }
    })();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 20, gap: 20}}>
        {data?.map((item, index) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}
            key={item.id}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                flex: 1,
              }}>
              <Image
                source={{uri: item.imageurl}}
                style={{height: 50, width: 50, borderRadius: 50}}
              />
              <Text style={{color: '#555', fontSize: 16, fontWeight: '500'}}>
                {item.name}
              </Text>
            </View>
            {/* <Pressable>
              <IonIcons name="car" size={20} color={'red'} />
            </Pressable> */}
            <ZegoSendCallInvitationButton
              invitees={[{userID: item.number, userName: item.name}]}
              isVideoCall={false}
              backgroundColor={'#3995E6'}
              resourceID={KeyCenter.resourceID}
              textColor={'#fff'}
              // icon={require('../../assets/images/call-calling.png')}
              width={45}
              height={45}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
