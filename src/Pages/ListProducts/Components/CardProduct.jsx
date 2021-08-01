import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CardProduct.css';

function cardLoad(element) {
  return (
    <div className="containerTitleCard">
      <div className="titleCard">
        <h5 className="titleCardtitle">{element.Produto}</h5>
      </div>
      <div className="containerShipping">
        <div className="containerImg">
          <img className="cardImage" src={"https://picsum.photos/id/"+element.id+"/200/300"} alt={element.title} />
        </div>
        <p className="numero">{element.Qtd}</p>
      </div>
    </div>
  );
}

class CardProduct extends Component {
  static adicionaCart(element, idParam, arrCard, state) {
      
    const produto = arrCard.find((card) => card.id === idParam);
    if (localStorage.getItem(`Item${idParam}`) === null) {
      localStorage
        .setItem(`Item${idParam}`, JSON.stringify(
          { ...produto, count: state }));
    } else {
      const objKeyInfo = JSON.parse(localStorage.getItem(`Item${idParam}`));
      const lS = { ...objKeyInfo, count: objKeyInfo.count += state };
      localStorage.setItem(`Item${idParam}`, JSON.stringify(lS));
    }

    fetch('http://localhost:8080/ontology/inserirOfertaNoCarrinho?carrinho=carrinho_1&oferta='+element.offering)
    .then((resolve) => resolve.json());
  }

  request(element){
    fetch('http://localhost:8080/ontology/ofertaPorCategoria?categoria='+element.Categoria)
    .then((resolve) => resolve.json())
        .then((result) => {
          result.map((item) => ({ ...item, isSelected: false }));
          this.setState({ term: result });
        }); 
  }

  constructor(props) {
    super(props);
    this.state = {
      term: '',
      categoria: ''
    };
    this.carregaCardProduct = this.carregaCardProduct.bind(this);
  }

  carregaCardProduct(element, arrCard) {
    console.log("carregaCardProduct => ", element);
    
    return (
      <div>
        <button
          className="buttonAddCart"
          value={element.id}
          onClick={(event) => {
            CardProduct.adicionaCart(element, element.id, arrCard, 1);
            this.props.numberCart(); 
          }}
        >
          Adicionar no Carrinho
        </button>
      </div>
    );
  }

  componentDidMount() {
    const { arrCard} = this.props;
    this.request(arrCard[0]);
  }

  cardProduct() {
    const { arrCard, retornaParam} = this.props;
    
    return (
      <div className="containCard">
        {arrCard.map((element) =>
          {
            return (<div className="cardComplete" key={element.id}>
            <Link className="label" to={`/product-details/${element.id}`} onClick={() => retornaParam(element, arrCard)} >
              {cardLoad(element)}
              <div className="price">
                <h6>{new Intl.NumberFormat('pt-BR',
              { style: 'currency', currency: 'BRL' }).format(element.price)}</h6>
              </div>
            </Link>
            {this.carregaCardProduct(element, arrCard)}
          </div>)},
        )}
        
      </div>
    );
  }

  cardRelated() {
    const { term } = this.state;

    return (
      <div className="containRelated">
        {(term !== '') ? <h1> Você também pode se interessar por:</h1>: null }
        {(term !== '') ? term.map((element) =>
          {
            return (
            <div className="cardComplete" key={element.id}>
              {cardLoad(element)}
              <p>{element.Nome}</p>
              <div className="price">
                <h6>{new Intl.NumberFormat('pt-BR',
              { style: 'currency', currency: 'BRL' }).format(element.price)}</h6>
              </div>
            {this.carregaCardProduct(element, term)}
          </div>)},
        ): term }
      </div>
    );
  }

  render() {
    return (
      <div>
      {this.cardProduct()}
      {this.cardRelated()}
      </div>
      
    );
  }
}
export default CardProduct;
CardProduct.propTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}).isRequired;
