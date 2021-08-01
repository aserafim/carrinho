import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comprador from './components/Comprador/Comprador';
import './style.css';
import { Link } from 'react-router-dom';
import backButton from './images/backButton.png';

import { AuthConsumer } from '../../context/authContext';

const initCampos = {
  usuario: {
    name: 'Usuario',
    value: '',
    red: false,
  },
  senha: {
    name: 'Senha',
    value: '',
    red: false,
  }
};

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campos: { ...initCampos },
      result:''
    };
    this.submitHandle = this.submitHandle.bind(this);
    this.produtoHandle = this.produtoHandle.bind(this);
  }

  componentDidMount() {
  }

  submitHandle(e, setLoggedIn) {
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
      fetch('http://localhost:8080/ontology/usuarioPorAccountName?accountName='+campos2.usuario.value)
      .then((resolve) => resolve.json())
      .then((result) => {
        result.map((item) => ({ ...item, isSelected: false }));
        this.setState({ result: result });
        if (result !== '') {
          setLoggedIn(true);
          this.setState({isShow: true})
        } else {
          setLoggedIn(false);
          this.setState({isShow: false})
        }
      });
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
    const { campos, result } = this.state;
    return (
      <AuthConsumer>
        {(props) => {
          return (
            <div className="page_payment">
              {this.botaoVolta()}
              <p>Revise seus produtos</p>
              <form onSubmit={(e) => { this.submitHandle(e, props.setLoggedIn) }}>
                <div className="comprador">
                  <Comprador produtoHandle={this.produtoHandle} campos={campos} />
                </div>
                <div className="buttonPagar">
                  <button onClick={(e) => { this.submitHandle(e, props.setLoggedIn) }}>{this.state.isShow ? 'Logout' : 'Login'}</button>
                  {this.state.isShow ? 
                  <div>
                    {(result !== '') ? result.map((usuario, index) => (
                        <div>
                        <h1>{'Logado com sucesso'}</h1>
                        <p>{'Account: '+ usuario.Account}</p>
                        <p>{ 'Nome: '+ usuario.Nome }</p>
                        <p>{ 'Surname: '+ usuario.Surname}</p>
                        </div>
                    )): result}
                  </div> : null}
                </div>
              </form>
            </div>
          )
        }}
      </AuthConsumer>
    );
  }
}

User.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default User;