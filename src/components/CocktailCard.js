import React from 'react'

class CocktailCard extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="card">
      <div className="card-image">
        <figure>
          <img src ={this.props.strDrinkThumb} alt={this.props.strDrink} />
        </figure>
      </div>
      <div className="card-content">
        <div className="subtitle is-5">{this.props.strDrink}</div>
      </div>
    </div>
  )}
}

export default CocktailCard
