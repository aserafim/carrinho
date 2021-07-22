import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import ShoppingCart from './Pages/ShoppingCart/ShoppingCart';
import ListProduct from './Pages/ListProducts/ListProducts';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Payment from './Pages/Payment/Payment';
import User from './Pages/Payment/User';
import ListStores from './Pages/ListProducts/ListStores';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objVazio: {},
      arrCard: [],
    };
    this.bananinha = this.bananinha.bind(this);
  }

  bananinha(element, arrCard) {
    this.setState({
      objVazio: element,
      arrCard,
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact path="/store-details/:id"
            render={(props) => (
              <ListProduct {...props} banana={this.bananinha} />
            )}
          />
          <Route
            exact path="/"
            render={(props) => (
              <ListStores {...props} banana={this.bananinha} />
            )}
          />
          <Route path="/shopping-cart" component={ShoppingCart} />
          <Route path="/payment" component={Payment} />
          <Route path="/user" component={User} />
          {/* <Route
            path="/store-details/:id"
            render={(props) => {
              const { objVazio, arrCard } = this.state;
              return (
                <CardProduct {...props}  />
              );
            }}
          /> */}
          <Route
            path="/product-details/:id"
            render={(props) => {
              const { objVazio, arrCard } = this.state;
              return (
                <ProductDetails {...props} passaObj={objVazio} passaArr={arrCard} />
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
