import React from 'react'

class CocktailShow extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      cocktail: null
    }
    this.getData = this.getData.bind(this);
  }

  componentDidMount(){
    this.getData()
  }


  getData(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+ this.props.match.params.id)
      .then(res => res.json().then(data => {
        const cocktailDetail = data.drinks[0]

        const drinks = Object.keys(cocktailDetail)
          .filter(key => key.match(/ingredient/i))
          .filter(key => !(!cocktailDetail[key] || cocktailDetail[key] === ' '))
          .map(key => cocktailDetail[key].trim())
        
        const measures = Object.keys(cocktailDetail)
          .filter(key => key.match(/measure/i))
          .filter(key => !(!cocktailDetail[key] || cocktailDetail[key] === ' '))
          .map(key => cocktailDetail[key].trim())
        
        const ingredients = drinks.map((drink, index) => {
          return { drink: drinks[index], measure: measures[index] }
        })
        
        const cocktail = {
          image: cocktailDetail.strDrinkThumb,
          name: cocktailDetail.strDrink,
          instructions: cocktailDetail.strInstructions,
          glass: cocktailDetail.strGlass,
          alcoholic: cocktailDetail.strAlcoholic,
          category: cocktailDetail.strCategory,
          id: cocktailDetail.idDrink,
          ingredients
        }
        
        this.setState({ cocktail })
      }))
  }

  render() {
    if(!this.state.cocktail) return null
    return (
      <div className="container">
        <section className="section">
          <div className="columns">
            <div className="column is-one-third-desktop">
              <img src={this.state.cocktail.image} alt={this.state.cocktail.name} className="cocktail-show-image"/>
            </div>
            <div className="column is-two-thirds-desktop">
              <div className="title is-3">{this.state.cocktail.name}</div>
              <div><strong>(</strong> {this.state.cocktail.alcoholic} <strong>)</strong></div>
              <hr/>
              <div className="columns">
                <div className="column is-one-half">
                  <div className="subtitle is-4">Category</div>
                  <div className="content">
                    <ul>
                        <li>{this.state.cocktail.category}</li>
                    </ul>
                  </div>
                  <div className="subtitle is-4">Ingredients</div>
                  <div className="content">
                    <ul>
                      {this.state.cocktail.ingredients.map(ingredient =>
                        <li key={ingredient.drink}><strong>{ingredient.drink}</strong> {ingredient.measure}</li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="column is-one-half">
                  <div className="subtitle is-4">Instructions</div>
                  <p>{this.state.cocktail.instructions}</p>
                  <br/>
                  <div className="subtitle is-4">Glass to use</div>
                  <div className="content">
                    <ul>
                        <li>{this.state.cocktail.glass}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>
      </div>
    )
  }
}

export default CocktailShow
