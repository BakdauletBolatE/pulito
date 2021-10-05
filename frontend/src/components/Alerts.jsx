import React, {Component, Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';

class Alerts extends Component {

    
    componentDidUpdate(prevProps) {
        if (this.props.messages !== prevProps.messages){
          console.log(this.props.messages)
        this.props.alert.success(this.props.messages.msg);
        }

        if (this.props.errors !== prevProps.errors){
        if (this.props.errors.name) {
          this.props.alert.error('Поля имя обязательно');
        }
        if (this.props.errors.number_phone) {
          this.props.alert.error('Такой телефон уже есть');
        }
        if (this.props.errors.email) {
          this.props.alert.error('Такой email уже существует');
        }
        if (this.props.errors.re_password) {
          this.props.alert.error('Пароль не соответсвует');
        }
        
        }
        
    }
    
  render() {
      return (
        <Fragment></Fragment>
      )
  }
  
}

const mapStateToProps = state => ({
    messages: state.alerts.messages,
    errors: state.alerts.errors
})

export default connect(mapStateToProps)(withAlert()(Alerts));
