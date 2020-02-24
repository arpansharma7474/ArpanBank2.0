import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import WrapperComponent from '../WrapperComponent';
import {normalize} from '../../utils/Constants';
import AppTextField from '../reusable_comp/AppTextField';
import AppButton from '../reusable_comp/AppButton';
import ListSelectionModal from '../reusable_comp/ListSelectionModal';
import {getLocations} from '../../redux/actions/LocationsActions';
import {connect} from 'react-redux';

class AddTransaction extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      amount: 0,
      message: '',
      date: undefined,

      showModal: false,
      locations: [],
      selectedLocation: {},
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
    this.getLocations();
  }

  render() {
    return (
      <View style={{flex: 1}}>
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
            });
          }}
          error={this.state.error}
        />
        <AppTextField
          label={'Message'}
          onChangeText={text => {
            this.setState({
              message: text,
            });
          }}
          error={this.state.error}
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
            error={this.state.error}
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
            editable={false}
            label={'Select Date'}
            error={this.state.error}
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
    });
  };

  onSelectDatePressed = () => {};

  onSubmitPressed = () => {};
}

function mapStateToProps(state) {
  return {
    Loading: state.LoadingReducer.loadingStatus,
  };
}
export default connect(mapStateToProps, {getLocations})(
  WrapperComponent(AddTransaction),
);
