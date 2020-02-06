// import {
//   STATUS_AUTH,
//   LOADING_STATUS,
//   USER_DETAILS,
//   USER_ID,
//   PHONE_NUMBER,
// } from './types';
// import {facebookLogin, googleSignin} from '../Utils/SocialLogin';
// import {executePostRequest, socialLoginApi} from '../Utils/FetchUtils';
// import {log} from '../Utils/Logger';
// import {
//   ValidateLogin,
//   ValidateSignup,
//   validateForgotPassword,
//   validateResetPassword,
// } from '../Utils/ValidationHelper';
// import firebase from 'react-native-firebase';

// export const signIn = (email = '', password = '') => {
//   return async dispatch => {
//     dispatch({type: LOADING_STATUS, payload: true});
//     try {
//       await ValidateLogin(email, password);
//       const device_token = await firebase.messaging().getToken();
//       const res = await executePostRequest(
//         'login',
//         {
//           email,
//           password,
//           device_token,
//         },
//         true,
//       );
//       dispatch({type: LOADING_STATUS, payload: false});
//       if (res.status.code !== 200) throw res.status.message;
//       const phone = res.data.response.phone;
//       dispatch({type: PHONE_NUMBER, payload: phone});
//       persistUser(dispatch, {
//         user: res.data.response.user,
//         token: res.data.response.token,
//       });
//       return {success: res.data.response};
//     } catch (err) {
//       dispatch({type: LOADING_STATUS, payload: false});
//       return {error: err};
//     }
//   };
// };
