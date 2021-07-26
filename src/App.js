import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import ShoppingCart from './Pages/ShoppingCart/ShoppingCart';
import ListProduct from './Pages/ListProducts/ListProducts';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Payment from './Pages/Payment/Payment';
import User from './Pages/Payment/User';
import Store from './Pages/ListProducts/Components/Store'

import { AuthProvider } from './context/authContext';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      objVazio: {},
      arrCard: [],
      loggedIn: false,
    };
    this.bananinha = this.bananinha.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);
  }

  setLoggedIn(value) {
    this.setState({ loggedIn: value });
  }

  bananinha(element, arrCard) {
    this.setState({
      objVazio: element,
      arrCard,
    });
  }

  render() {
    return (
      <AuthProvider value={{ loggedIn: this.state.loggedIn, setLoggedIn: this.setLoggedIn }}>
        <>
          <BrowserRouter>
            <Switch>
              <Route
                exact path="/"
                render={(props) => (
                  <ListProduct {...props} banana={this.bananinha} />
                )}
              />
              <Route path="/shopping-cart" component={ShoppingCart} />
              <Route path="/payment" component={Payment} />
              <Route path="/user" component={User} />
              <Route
                path="/product-details/:id"
                render={(props) => {
                  const { objVazio, arrCard } = this.state;
                  return (
                    <ProductDetails {...props} passaObj={objVazio} passaArr={arrCard} />
                  );
                }}
              />
              <Route
                path="/store/:id"
                render={(props) => {
                  const { objVazio, arrCard } = this.state;
                  return (
                    <Store {...props} passaObj={objVazio} passaArr={arrCard} />
                  );
                }}
              />
            </Switch>
          </BrowserRouter>
        </>
      </AuthProvider>
    );
  }
}

export default App;
