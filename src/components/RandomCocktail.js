import React from 'react';
import { Link } from 'react-router-dom';

class RandomCocktail extends React.Component {

  constructor(){
    super()

    this.state = {
      data: []
    }
  }

  componentDidMount(){
    this.getData()
  }

  getData() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(res => {
        res.json().then(data => {
          const cocktail = {
            image: data.drinks[0].strDrinkThumb,
            name: data.drinks[0].strDrink,
            id: data.drinks[0].idDrink
          }
          this.setState({ cocktail })
        })
      })
  }

  render(){

    if(!this.state.cocktail) return null
    return(
      <div className="hero is-dark is-bold">
        <div className="hero-body hero-padding">
          <div className="container">
            <div className="columns is-centred">
              <div className="column is-two-thirds-desktop">
                <h1 className="title is-1">Welcome to Aditya Cocktail</h1>
              </div>
              <div className="column is-one-third has-text-centred">
                <h1 className="title is-2">Cocktail of the day</h1>
                <Link to={`/cocktails/${this.state.cocktail.id}`}><marquee><div className="subtitle is-size-3">{this.state.cocktail.name}</div></marquee></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RandomCocktail
