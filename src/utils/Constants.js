const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default constants = {
  screenWidth,
  screenHeight,
};

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

export const isObject = obj => {
  return typeof obj === 'object' && obj !== null;
};