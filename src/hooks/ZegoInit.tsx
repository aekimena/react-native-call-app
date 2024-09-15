import {Image, View} from 'react-native';

import ZegoUIKitPrebuiltCallService, {
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import KeyCenter from '../utils/keyCenter';
import {useNavigation} from '@react-navigation/native';

const useZegoUIKit = () => {
  const navigation = useNavigation();

  const onUserLogin = async (userID, userName) => {
    return await ZegoUIKitPrebuiltCallService.init(
      KeyCenter.appID,
      KeyCenter.appSign,
      userID.toString(),
      userName.toString(),
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        androidNotificationConfig: {
          channelID: 'ZegoUIKit',
          channelName: 'ZegoUIKit',
        },
        avatarBuilder: ({userInfo}) => (
          <View style={{width: '100%', height: '100%'}}>
            <Image
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
              source={{uri: `https://robohash.org/${userInfo.userID}.png`}}
            />
          </View>
        ),
        requireConfig: data => ({
          turnOnCameraWhenJoining: false,
          turnOnMicrophoneWhenJoining: false,
          useSpeakerWhenJoining: true,
          notifyWhenAppRunningInBackgroundOrQuit: true,
          isIOSSandboxEnvironment: true,
          timingConfig: {
            isDurationVisible: true,
            onDurationUpdate: duration => {
              console.log(
                '########CallWithInvitation onDurationUpdate',
                duration,
              );
              if (duration === 10 * 60) {
                ZegoUIKitPrebuiltCallService.hangUp();
              }
            },
          },
          topMenuBarConfig: {
            buttons: [ZegoMenuBarButtonName.minimizingButton],
          },
          onWindowMinimized: () => {
            console.log('[Demo]CallInvitation onWindowMinimized');
            navigation.navigate('main');
          },
          onWindowMaximized: () => {
            console.log('[Demo]CallInvitation onWindowMaximized');
            navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
          },
        }),
      },
    ).then(() => {
      ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
        message:
          'We need your consent for the following permissions in order to use the offline call function properly',
        allow: 'Allow',
        deny: 'Deny',
      });
    });
  };

  const onUserLogout = async () => {
    return ZegoUIKitPrebuiltCallService.uninit();
  };

  return {onUserLogin, onUserLogout};
};

export default useZegoUIKit;
