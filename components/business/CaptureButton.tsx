import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Camera, PhotoFile, TakePhotoOptions } from 'react-native-vision-camera';
import { CAPTURE_BUTTON_SIZE, SCREEN_WIDTH } from './Constants';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { RNCamera } from 'react-native-camera';

const PAN_GESTURE_HANDLER_FAIL_X = [-SCREEN_WIDTH, SCREEN_WIDTH];
const PAN_GESTURE_HANDLER_ACTIVE_Y = [-2, 2];

const TAKE_PHOTO_DELAY = 200;
const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;

interface Props extends ViewProps {
  camera: React.RefObject<Camera>;
  onMediaCaptured: (media: PhotoFile, type: 'photo') => void;
  flash: 'off' | 'on';
  enabled: boolean;
  setIsPressingButton: (isPressingButton: boolean) => void;
}

const _CaptureButton: React.FC<Props> = ({
  camera,
  onMediaCaptured,
  flash,
  enabled,
  setIsPressingButton,
  style,
  ...props
}): React.ReactElement => {
  const pressDownDate = useRef<number | undefined>(undefined);

  const takePhotoOptions: TakePhotoOptions = {
    qualityPrioritization: 'speed',
    flash: flash,
    enableShutterSound: false,
  };

  
    const takePhoto = async () => {
      console.log('current: ', camera.current)
      try {
        if (camera.current) {
          console.log('Taking photo...');
          const photo = await camera.current.takePhoto(takePhotoOptions);
          onMediaCaptured(photo, 'photo');
        } else {
          console.error('Camera ref is null.');
        }
      } catch (error) {
        console.error('Failed to take photo:', error);
      }
    };


  const onHandlerStateChanged = useCallback(
    async ({ nativeEvent: event }) => {
      switch (event.state) {
        case State.BEGAN: {
          // Take a picture when the button is tapped (BEGAN state)
          await takePhoto();
          setIsPressingButton(true);
          return;
        }
        case State.END:
        case State.FAILED:
        case State.CANCELLED: {
          // Handle other states if needed
          setIsPressingButton(false);
          return;
        }
        default:
          break;
      }
    },
    [takePhoto, setIsPressingButton]
  );

  return (
    <TapGestureHandler
      enabled={enabled}
      onHandlerStateChange={onHandlerStateChanged}
      shouldCancelWhenOutside={false}
      maxDurationMs={TAKE_PHOTO_DELAY} // Prevent the gesture from failing too quickly
    >
      <View {...props} style={[style]}>
        <View style={styles.flex}>
          <View style={[styles.shadow]} />
          <View style={styles.button} />
        </View>
      </View>
    </TapGestureHandler>
  );
};

export const CaptureButton = React.memo(_CaptureButton);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    backgroundColor: '#e34077',
  },
  button: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: 'white',
  },
});

