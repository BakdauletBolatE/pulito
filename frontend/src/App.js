import { Provider } from 'react-redux';
import React, {Component, Fragment} from 'react';
import store from './store';
import { BrowserRouter, Route } from "react-router-dom";
import {Provider as AlerProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Header from './components/header.jsx';
import Main from './pages/Main.jsx';
import Alerts from './components/Alerts.jsx';
import Register from './pages/accounts/register.jsx';
import './style.css';
import Login from './pages/accounts/login.jsx';
import OrderItemShow from './pages/client/order-item-show.jsx';


const alertOptions = {
  timeout: 3000,
  position: 'top right'
}

class App extends Component {

  render() {
      return (
        <Provider store={store}>
          <AlerProvider template={AlertTemplate} {...alertOptions}>
          <BrowserRouter >
            <Fragment>
              <Header></Header>
              <Alerts></Alerts>
              <Route exact path="/" component={Main}/>
              <Route path="/order/:id" children={<OrderItemShow />}/>
              <Route path="/register" component={Register}></Route>
              <Route path="/login" component={Login}/> 
            </Fragment>
          </BrowserRouter>
          </AlerProvider>
        </Provider> 
      );
  }
  
}

export default App;
