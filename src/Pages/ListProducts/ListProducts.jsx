import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ListProducts.css';
import ListFilter from './Components/ListFilter';
import CardProduct from './Components/CardProduct';
import lupa from './images/lupa.png';

class ListProducts extends Component {
  static caixaCarrinho(carrinho) {
    return (
      <div className="carrinho-user">
        <div className="container-cart">
        <Link className="user" to="/user">
          <img
            className="user-img"
            src="https://image.flaticon.com/icons/png/512/456/456212.png" alt="carrinho de compras"
          />
        </Link>
      </div>
        <div className="container-cart">
          <Link className="carrinhoCart" to="/shopping-cart">
            <img
              className="carrinho"
              src="https://image.flaticon.com/icons/svg/126/126083.svg" alt="carrinho de compras"
            />
            <div className="contadorCarrinho">
              <span className="numero">{carrinho}</span>
            </div>
          </Link>
        </div>
        
    </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 'Você ainda não realizou uma Busca',
      results: '',
      valueradio: '',
      valorPesquisa: '',
      carrinhoCont: 0,
      mapa: ''
    };
    this.pesquisa = this.pesquisa.bind(this);
    this.callback = this.callback.bind(this);
    this.caixaLupa = this.caixaLupa.bind(this);
    this.returnParam = this.returnParam.bind(this);
    this.numberCart = this.numberCart.bind(this);
    this.valorCarrinho = this.valorCarrinho.bind(this);
  }
  componentDidMount() {
    this.valorCarrinho();
  }
  valorCarrinho() {
    this.setState({ carrinhoCont: Number(localStorage.getItem('CartCount')) });
  }
  reduceFunction(res) {
    if (res.results === 0) {
      this.setState({ value: 'Nenhum Produto foi Encontrado' });
    } else {
      this.setState({
        results:
          res.results.reduce((offering) => [...offering], []),
      });
    }
  }
  pesquisa(e) {
    const { valueradio } = this.state;
    fetch((this.state.valueradio === '') ? `https://api.mercadolibre.com/sites/MLB/search?q=${e}` : `https://api.mercadolibre.com/sites/MLB/search?category=${valueradio}&q=${e}`)
      .then((resolve) => resolve.json())
      .then((res) => {
        this.reduceFunction(res);
      });
  }

  callback(value) {
    this.setState({ valueradio: value });
    if (this.state.valorPesquisa === '') {
      fetch(`http://localhost:8080/ontology/ofertaPorLojas?loja=${value}`)
        .then((resolve) => resolve.json())
        .then((result) => {
          result.map((item) => ({ ...item }));
          this.setState({ results: result });
        });
    }
  }

  caixaLupa() {
    return (
      <div className="container-input">
        <div className="caixaLupa">
          <input
            className="searchBar"
            type="text"
            onChange={(e) => this.setState({ valorPesquisa: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') this.pesquisa(e.target.value); }}
          />
          <div className="lupa">
            <div>
              <img className="lupinha" src={lupa} alt="Lupa" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  returnParam(element, arrCard) {
    const { banana } = this.props;
    banana(element, arrCard);
  }

  // mudarMapa(value){
  //   const { mapa } = this.state;

  //   if (value === 'Uaumart'){
  //     this.setState({ mapa: ulmart });
  //   }
  //   return (
  //     <div className="containerImg">
  //       <img className="cardImage" src={mapa} alt={mapa}/>
  //     </div>
  //   );
  // }


  numberCart() {
    this.setState((state) => {
      localStorage.setItem('CartCount', (state.carrinhoCont + 1));
      return ({ carrinhoCont: state.carrinhoCont + 1 });
    });
  }

  render() {
    const { value, results, carrinhoCont, valueradio} = this.state;

    return (
      <div className="maxContain" >
        <ListFilter callback={this.callback}/>
        <div className="header">
          {ListProducts.caixaCarrinho(carrinhoCont)}
          {valueradio !== '' ? 
            <div className="headerStore">
              <div className="titleStore">
                <h5 className="titleStoretitle">{valueradio}</h5>
                <a href={"https://www."+valueradio+".com/"}>Visite {valueradio}.com!</a>
                {/* <div className="containerImg">
                  <img className="cardImage" src=} alt={mapa}/>
                </div> */}
              </div>
            </div>
          : null }
          {this.caixaLupa()}
          {(Object.keys(results).length === 0) ?
            <h1>{value}</h1> :
            <CardProduct
              arrCard={results}
              numberCart={this.numberCart}
              retornaParam={this.returnParam}
            />
          }
        </div>
      </div>
    );
  }
}

export default ListProducts;

ListProducts.propTypes = PropTypes.shape({
  banana: PropTypes.func,
}).isRequired;