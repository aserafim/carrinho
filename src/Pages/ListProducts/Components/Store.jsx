import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Store extends Component {
  render() {
    //const { id } = useParams();
    return (
      <div className="payment_comp_produto">
        <h1>{this.props.match.params.id}</h1>
      </div>
    );
  }
}

Store.propTypes = {
  store: PropTypes.shape({
    nome: PropTypes.string
  }),
};

Store.defaultProps = {
  store: {
    nome: '',
  },
};

export default Store;
