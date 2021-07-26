import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input/Input';
import './style.css';

class Comprador extends Component {
  static renderiza(cb, redUsuario, redSenha) {
    return (
      <div className="payment_comprador">
        <p>Faça o login para comprar</p>
        <div className="container">
          <Input name={'usuario'} place={'usuario'} cb={cb} red={redUsuario} />
          <Input name={'senha'} place={'senha'} cb={cb} red={redSenha} />
        </div>
      </div>
    );
  }

  render() {
    const cb = this.props.produtoHandle;
    const {
      usuario: { red: redUsuario },
      senha: { red: redSenha }
    } = this.props.campos;

    return (
      <div>
        {Comprador.renderiza(cb, redUsuario, redSenha)}
      </div>
    );
  }
}

Comprador.propTypes = {
  produtoHandle: PropTypes.func,
  campos: PropTypes.shape({
    usuario: PropTypes.shape({
      red: PropTypes.bool,
    }),
    senha: PropTypes.shape({
      red: PropTypes.bool,
    })
  }),
};

Comprador.defaultProps = {
  produtoHandle: undefined,
  campos: {
    usuario: {
      red: false,
    },
    senha: {
      red: false,
    }
  },
};

export default Comprador;
