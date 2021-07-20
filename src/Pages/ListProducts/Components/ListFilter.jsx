import React from 'react';
import PropTypes from 'prop-types';

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.trocaIcone = this.trocaIcone.bind(this);
  }

  componentDidMount() {
  }

  trocaIcone(index) {
    const icone = this.state.term;
    for (let i = 0; i < icone.length; i += 1) {
      this.setState({
        icone: icone[i].isSelected = false,
      });
    }
    this.setState({
      icone: !icone[index].isSelected ?
      icone[index].isSelected = true :
      icone[index].isSelected = false,
    });
  }

  render() {
    const { term } = this.state;
    const { callback } = this.props;
    const buttons = ['Todas', 'Nome','Categoria'];

    const filter = (button) =>{

      if(button === 'Todas'){
          fetch('https://api.mercadolibre.com/sites/MLB/categories')
        .then((resolve) => resolve.json())
        .then((result) => {
          result.map((item) => ({ ...item, isSelected: false }));
          this.setState({ term: result });
        });
      } else {
        fetch('https://api.mercadolibre.com/classified_locations/countries')
        .then((resolve) => resolve.json())
        .then((result) => {
          result.map((item) => ({ ...item, isSelected: false }));
          this.setState({ term: result });
        });
      }
    }
    return (
      <div className="container">
        <h1>Lojas</h1>
        <p> filtrar por: </p>
        <Button button={buttons} filter={filter} />
        <div className=""> {(term !== '') ? term.map((categoria, index) => (
            <label key={categoria.id} htmlFor={categoria.id} className="labels">{categoria.name}
              <div className="containerCategorias">
                <span>
                  <i className="material-icons">
                    { categoria.isSelected ? 'check_box' : 'check_box_outline_blank' }
                  </i>
                </span>
                <input
                  className="inputs"
                  id={categoria.id}
                  name="categoria"
                  value={categoria.id}
                  onClick={() => this.trocaIcone(index)}
                  onChange={((e) => callback(e.target.value))}
                  type="checkbox"
                />
              </div>
            </label>
          )) : term}</div>
      </div>
    );
  }
}

function Button({button, filter}) {
  return (
      <div className="buttons">
          {
              button.map((cat, i)=>{
                  return <button type="button" className="buttonAddCart"  onClick={()=> filter(cat)}>{cat}</button>
              })
          }
      </div>
  )
}

export default SearchList;

SearchList.propTypes = PropTypes.shape({
  callback: PropTypes.func
}).isRequired;
