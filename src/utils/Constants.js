
import config from '../utils/config'
import { PixelRatio } from 'react-native'

export const isIphoneXSeries = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (screenHeight >= 812 || screenWidth >= 812)
  );
};

export const getRoundedDigit = number => {
  return String('0' + number).slice(-2);
};

export const getFullName = user => {
  return user.first_name + ' ' + user.last_name;
};

export const getUserImage = user => {
  if (user.photoUrl)
    return { uri: user.photoUrl }
  else
    return require("../assets/ic_user.png")
}

export const isObject = obj => {
  return typeof obj === 'object' && obj !== null;
};

export function normalize(size) {
  const scale = config.constants.width / 320;
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}