import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input/Input';
import './style.css';

class Comprador extends Component {
  static renderiza(cb, redNome, redSobrenome, redEmail) {
    return (
      <div className="payment_comprador">
        <p>Faça o login para comprar</p>
        <div className="container">
          <Input name={'nome'} place={'Nome'} cb={cb} red={redNome} />
          <Input name={'sobrenome'} place={'Sobrenome'} cb={cb} red={redSobrenome} />
          <Input name={'email'} place={'Email'} cb={cb} red={redEmail} />
        </div>
      </div>
    );
  }

  render() {
    const cb = this.props.produtoHandle;
    const {
      nome: { red: redNome },
      sobrenome: { red: redSobrenome },
      email: { red: redEmail }
    } = this.props.campos;

    return (
      <div>
        {Comprador.renderiza(cb, redNome, redSobrenome, redEmail)}
      </div>
    );
  }
}

Comprador.propTypes = {
  produtoHandle: PropTypes.func,
  campos: PropTypes.shape({
    nome: PropTypes.shape({
      red: PropTypes.bool,
    }),
    sobrenome: PropTypes.shape({
      red: PropTypes.bool,
    }),
    email: PropTypes.shape({
      red: PropTypes.bool,
    })
  }),
};

Comprador.defaultProps = {
  produtoHandle: undefined,
  campos: {
    nome: {
      red: false,
    },
    sobrenome: {
      red: false,
    },
    email: {
      red: false,
    }
  },
};

export default Comprador;
