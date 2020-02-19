import React, { Component } from 'react';

import './style.css';

import Produto from './components/Produto/Produto';
import Quantidade from './components/Quantidade/Quantidade';
import Avaliacoes from './components/Avaliacoes/Avaliacoes';
import Comments from './components/Comments/Comments';

const obj = {
  image: 'http://mlb-s1-p.mlstatic.com/660944-MLA40360945636_012020-I.jpg',
  title: 'Cadeira De Escritório Pelegrin 502 Preta',
  price: 299,
  availableQuantity: 500,
  soldQuantity: 4,
  condition: 'new',
  shipping: {
    freeShipping: true,
  },
  sellerAddress: {
    country: {
      name: 'Brasil',
    },
    state: {
      name: 'SP',
    },
    city: {
      name: 'São Paulo',
    },
  },
  installments: {
    rate: 14.69,
  },
};

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    }
    this.submitHandle = this.submitHandle.bind(this);
  }

  submitHandle(comment) {
    this.setState({
      comments: [...this.state.comments, comment],
    });
  }

  render() {
    const { title, price, installments: { rate } } = obj;
    const { comments } = this.state;
    return (
      <div className="page_productDetails">
        <div className="title">
          <p>{title} - </p>
          <p>{price},00 R$</p>
        </div>
        <Produto obj={obj} />
        <Quantidade />
        <Avaliacoes rate={rate} submitHandle={this.submitHandle} />
        <Comments comments={comments} />
      </div>
    );
  }
}
