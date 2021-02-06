import React from 'react'

import CocktailIndex from './CocktailIndex'
import RandomCocktail from './RandomCocktail'

class Home extends React.Component {
  constructor(){
    super()

    this.state = {
      search: [],
      data: null,
      filter: 'search.php?s'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  handleChange(e){
    const searchData = {[e.target.name]: e.target.value }
    this.setState({search: searchData})
  }

  handleSubmit(e) {
    e.preventDefault()

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/${this.state.filter}=${this.state.search.searchInput}`)
      .then(res => {res.json().then(data => this.setState({ data: data }))})
      
  }

  handleFilterChange(e){
    const filter = e.target.value
    this.setState({filter: filter})
  }

  handleSort(){
    let data = this.state.data;
    data.drinks.sort((a,b) => (a.strDrink > b.strDrink) ? 1 : ((b.strDrink > a.strDrink) ? -1 : 0));
    this.setState({ data: data });
  }

  render() {
    return(
      <section>
        <RandomCocktail />
        <div className="container">
          <section className="section" >
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <div className="control" onChange={this.handleFilterChange}>
                <label className="radio">
                    <input type="radio" name="searchFilter" value="search.php?s" defaultChecked={true} /> Cocktail name
                  </label>
                  <label className="radio">
                    <input type="radio" name="searchFilter" value="filter.php?i" /> Ingredient
                  </label>
                  <label className="radio">
                    <input type="radio" name="searchFilter" value="filter.php?g" /> Glass Type
                  </label>
                  <label className="radio">
                    <input type="radio" name="searchFilter" value="filter.php?c" /> Category
                  </label>
                </div>
              </div>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="searchInput"
                    placeholder="eg. Gin or Margarita"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="control">
                  <button className="button search-button">Search</button>
                </div>
              </div>
            </form>
            {this.state.data != null &&
                <div className="control">
                    <button onClick={this.handleSort} className="button search-button">Sort By Name</button>
                </div>
            }
          </section>
          <section className="section">
            <CocktailIndex {...this.state.data}/>
          </section>
        </div>
      </section>
    )
  }

}

export default Home
