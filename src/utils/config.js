export default {
  colors: {
    THEME_COLOR: 'white',
    TEXT_COLOR: 'black',
    BACKGROUND_COLOR: 'white',
  },
  strings: {
    base_url: "",
    image_url: "",

    // google api url
    google_api_url: 'https://maps.googleapis.com/maps/api/place',
    google_api_key: "",

    //regular Expressions
    regExEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    nameRegEx: /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
    placeholder_image_url: 'https://via.placeholder.com/150C/969696',

    //strings used in application
    email: 'Email',
    password: 'Password',

    // success messages
    success_edit_profile: 'Profile Successfully Updated',
    success_password_changed: 'Password change successfully',

    // error messages 
    error_session_timeout:
      'Your session has been logged out. Please log in again to continue.',
    error_name_numeric: 'Name cannot have numeric values',
    error_empty_confirmPass: 'Please confirm your Password',
    error_numeric_phoneno: 'Please enter numeric values for phone number',
    error_empty_email: 'Please enter the email address',

    error_invalid_email: 'Please enter a valid email address',
    error_empty_password: 'Please enter the password',
    error_password_short_length: 'The password cannot be less than 6 characters',
    error_password_too_long: 'The password cannot be more than 20 characters',
    error_empty_name: 'Please enter the name',
    error_empty_phone_number: 'Please Enter Phone Number',
    error_password_not_match: 'Your new password and confirm password do not match',
    error_network_not_connected: 'Please check your Internet connection',
    error_valid_phone: 'Put valid phone number',
    error_name_specialChar: 'Name cannot have special characters',
    error_empty_currentPass: 'Please enter current password',
    error_empty_newPass: 'Please enter new password',
    error_spaceInPhone: 'Number cannot contain space',
    error_name_long: 'Name field cannot have more than 100 char',
    error_phone_length: 'The Phone Number cannot be less than 10 digits',
    error_no_items: 'No Items Found',

    //Permissions
    PHOTO_PERMISSION: 'photo',
    CAMERA_PERMISSION: 'camera',
    LOCATION_PERMISSION: 'location',
    VIDEO_PERMISSION: 'video',
    error_terms_and_condition: 'Please accept Terms and Conditions to proceed',
  },
  errorCodes: {
    api_error: 401,
    api_successful: 200,
    api_post_successful: 200,
  },
  constants: {

  },
};
