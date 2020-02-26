import React from 'react';
import { Image, TouchableOpacity, View, Keyboard } from 'react-native';
import WrapperComponent from '../WrapperComponent';
import { normalize } from '../../utils/Constants';
import AlertModal from '../reusable_comp/AlertModal';
import AppTextField from '../reusable_comp/AppTextField';
import AppButton from '../reusable_comp/AppButton';
import ListSelectionModal from '../reusable_comp/ListSelectionModal';
import { getLocations } from '../../redux/actions/LocationsActions';
import { addMoney } from '../../redux/actions/TransactionActions';
import { connect } from 'react-redux';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import { log } from '../../utils/Logger';

class AddTransaction extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      amount: 0,
      message: '',
      date: new Date(),
      showModal: false,
      locations: [],
      selectedLocation: {},
      alert: undefined
    };

    this.props.navigation.setOptions({
      title: 'Add Transaction',
      headerStyle: {
        backgroundColor: 'green',
      },
      headerTitleStyle: {
        fontFamily: 'Monaco',
        fontSize: normalize(15),
      },
      headerTintColor: 'white',
    });
  }

  componentDidMount() {
    this.dateRef.setValue(new Date().toDateString())
    this.getLocations();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.alert ? <AlertModal
          message={this.state.alert}
          onOkClicked={() => {
            this.setState({
              alert: undefined
            }, () => {
              this.props.navigation.goBack()
            })
          }}
        /> : null}
        {this.state.showModal ? (
          <ListSelectionModal
            optionsArray={this.state.locations}
            onCancelClicked={() => {
              this.setState({
                showModal: false,
              });
            }}
            onItemClicked={item => {
              this.setState({
                selectedLocation: item,
                showModal: false,
              });
              this.locationRef.setValue(item.title);
            }}
          />
        ) : null}

        <AppTextField
          keyboardType="number-pad"
          label={'Amount'}
          onChangeText={text => {
            this.setState({
              amount: text,
              error: undefined
            });
          }}
          error={this.state.error && this.state.error.error_amount}
        />
        <AppTextField
          label={'Message'}
          onChangeText={text => {
            this.setState({
              message: text,
              error: undefined
            });
          }}
          error={this.state.error && this.state.error.error_message}
        />
        <TouchableOpacity
          onPress={() => {
            this.onLocationPressed();
          }}
          style={{
            justifyContent: 'center',
          }}>
          <AppTextField
            getRef={ref => {
              this.locationRef = ref;
            }}
            editable={false}
            label={'Select location'}
            error={this.state.error && this.state.error.error_location}

          />
          <Image
            style={{
              width: 20,
              height: 20,
              position: 'absolute',
              right: 20,
            }}
            source={require('../../assets/ic_download.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onSelectDatePressed();
          }}
          style={{
            justifyContent: 'center',
          }}>
          <AppTextField
            getRef={ref => {
              this.dateRef = ref;
            }}
            editable={false}
            label={'Select Date'}
            error={this.state.error && this.state.error.error_date}
          />
          <Image
            style={{
              width: 20,
              height: 20,
              position: 'absolute',
              right: 20,
            }}
            source={require('../../assets/ic_download.png')}
          />
        </TouchableOpacity>
        <AppButton
          style={{
            width: '50%',
            paddingVertical: 10,
            alignSelf: 'center',
          }}
          title={'Submit'}
          onPress={() => {
            this.onSubmitPressed();
          }}
        />
        <DatePickerDialog ref="dobDialog" onDatePicked={this.onDateSelected} />
      </View>
    );
  }

  getLocations = async () => {
    const res = await this.props.getLocations();
    if (res.success) {
      this.setState({
        locations: res.success,
      });
    }
  };

  onLocationPressed = () => {
    this.setState({
      showModal: true,
      error: undefined
    });
  };

  onSelectDatePressed = () => {
    this.refs.dobDialog.open({
      date: new Date(),
      maxDate: new Date()
    });
  };

  onDateSelected = date => {
    this.setState({
      date: date
    })
    this.dateRef.setValue(date.toDateString())
  }

  onSubmitPressed = async () => {
    Keyboard.dismiss()
    const res = await this.props.addMoney({
      amount: this.state.amount,
      location: this.state.selectedLocation,
      date: this.state.date,
      message: this.state.message
    })
    if (res.error) {
      if (res.error.validationMessage)
        this.setState({
          error: res.error.validationMessage
        })
      else
        this.setState({
          alert: res
        })
    }
    if (res.success) {
      this.setState({
        alert: res
      })
    }
  };
}

function mapStateToProps(state) {
  return {
    Loading: state.LoadingReducer.loadingStatus,
  };
}
export default connect(mapStateToProps, {
  getLocations,
  addMoney
})(
  WrapperComponent(AddTransaction),
);
