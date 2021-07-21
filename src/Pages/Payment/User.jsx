import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Produto from './components/Produto/Produto';
import Comprador from './components/Comprador/Comprador';
import Pagamento from './components/Pagamento/Pagamento';
import './style.css';
import { Link } from 'react-router-dom';
import backButton from './images/backButton.png';

const initCampos = {
  nome: {
    name: 'Nome',
    value: '',
    red: false,
  },
  sobrenome: {
    name: 'Sobrenome',
    value: '',
    red: false,
  },
  email: {
    name: 'Email',
    value: '',
    red: false,
  }
};

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campos: { ...initCampos }
    };
    this.submitHandle = this.submitHandle.bind(this);
    this.produtoHandle = this.produtoHandle.bind(this);
  }

  componentDidMount() {
  }

  submitHandle(e) {
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
      //apagaIds();
      this.setState({isShow: true})
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

  botaoVolta() {
    return (
      <div className="containerButtonReturn">
        <Link className="buttonReturn" to="/">
          <img src={backButton} alt="backButton" />
          <span className="paginaInicial">
            Pagina Inicial
          </span>
        </Link>
      </div>
    );
  }

  render() {
    const { campos } = this.state;
    return (
      <div className="page_payment">
        {this.botaoVolta()}
        <p>Revise seus produtos</p>
        <form onSubmit={this.submitHandle}>
          <div className="comprador">
            <Comprador produtoHandle={this.produtoHandle} campos={campos} />
          </div>
          <div className="buttonPagar">
            <button onClick={this.submitHandle}>{this.state.isShow ? 'Logout' : 'Login'}</button>
            {this.state.isShow ? 
            <div>
              <h2>Logado com sucesso </h2>
            </div> : null}
          </div>
        </form>
      </div>
    );
  }
}

User.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default User;