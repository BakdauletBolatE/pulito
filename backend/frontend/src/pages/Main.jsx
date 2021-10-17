import React, {Component, Fragment} from 'react';
import '../style.css';
import {connect} from 'react-redux';
import AdminPage from './admin-page.jsx';
import ClientPage from './client-page.jsx';

class Main extends Component {


  render() {
    const user = this.props.user;
    if (user) {
      if (user.is_superuser) {
        return (
          <AdminPage></AdminPage>
        )
      }
      else{
        return (
          <ClientPage></ClientPage>
        )
      }
    }
    else{
      return (
        <Fragment>ДЛЯ ГОСТИ</Fragment>
      )
      
    }
  }
  
}


const mapStateToProps = state => ({
  user: state.auth.user,
  route: state.status.route
})

export default connect(mapStateToProps,{})(Main);
