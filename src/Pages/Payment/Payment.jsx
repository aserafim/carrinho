import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Produto from './components/Produto/Produto';
import Pagamento from './components/Pagamento/Pagamento';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import './style.css';

const initCampos = {
  pagamento: {
    name: 'Forma de pagamento',
    value: '',
    red: false,
  },
};

function allStorageKeys() {
  const keys = Object.keys(localStorage);
  return keys;
}

function carregaProdutos() {
  const keys = allStorageKeys();
  const ids = keys.filter((key) => key.includes('Item'));
  return ids.map((id) => JSON.parse(localStorage.getItem(id)));
}


function apagaIds() {
  const keys = allStorageKeys();
  const ids = keys.filter((key) => key.includes('Item'));
  ids.forEach((id) => localStorage.removeItem(id));
  localStorage.removeItem('CartCount');
}

function verificaIds() {
  const keys = allStorageKeys();
  const ids = keys.filter((key) => key.includes('Item'));
  return !(ids.length === 0);
}

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campos: { ...initCampos },
      produtos: carregaProdutos(),
      term: ''
    };
    this.submitHandle = this.submitHandle.bind(this);
    this.produtoHandle = this.produtoHandle.bind(this);
  }

  componentDidMount() {
    verificaIds();
  }

  async submitHandle(e) {
    //const { produtos } = this.state;
    e.preventDefault();
    const campos2 = this.state.campos;
    const verifica = Object.keys(campos2).reduce((acc, key) => {
      if (campos2[key].value.length === 0) {
        this.redState(key, true);
        return false;
      }
      this.redState(key, false);
      return acc;
    }, true);
    if (verifica) {
      apagaIds();
      this.setState({isShow: true})

      // await  fetch('http://localhost:8080/ontology/inserirCarrinho1')
      // .then((resolve) => resolve.json())

      await fetch('http://localhost:8080/ontology/inserirObjetoCompra?cliente=Client_1&carrinho=carrinho_1')
      .then((resolve) => resolve.json())

      // await produtos.map(async (produto) => {
      //   await fetch('http://localhost:8080/ontology/inserirOfertaNoCarrinho?carrinho=carrinho_1&oferta='+produto.offering)
      //   .then((resolve) => resolve.json())
      // })
    }
  }

  redState(key, bool) {
    this.setState((state) => ({
      campos: {
        ...state.campos,
        [key]: {
          ...state.campos[key],
          red: bool,
        },
      },
    }),
    );
  }

  produtoHandle(e) {
    const { name, value } = e.target;
    this.setState({
      campos: {
        ...this.state.campos,
        [name]: {
          ...this.state.campos[name],
          value,
        },
      },
      isShow: false
    });
  }

  render() {
    const { produtos, campos } = this.state;
    const { pagamento } = campos;

    return (
      <div className="page_payment">
        {ShoppingCart.botaoVolta()}
        <p>Revise seus produtos</p>
        <form onSubmit={this.submitHandle}>
          {(verificaIds()) ?
            <div className="products">
              {produtos.map((produto) => (
                <Produto key={produto.id} produto={produto} />
              ))}
            </div> : <div />}
          <Pagamento produtoHandle={this.produtoHandle} pagamento={pagamento} />
          <div className="buttonPagar">
            <button onClick={this.submitHandle}>Pagar</button>
            {this.state.isShow ? 
            <div>
              <h2>Pago com sucesso </h2>
            </div> : null}
          </div>
        </form>
      </div>
    );
  }
}

Payment.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Payment;  