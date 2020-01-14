import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    sortedBy: null,
    filteredBy: null
  }

  changeSorting = (changeTo) => {
    this.setState({
      sortedBy: changeTo
    })
  }

  changeFilter = (changeTo) => {
    this.setState({
      filteredBy: changeTo
    })
  }

  togglePurchased = (stock) => {
    let newStock = {...stock, purchased: !stock["purchased"]}
    let foundIndex = null
    this.state.stocks.forEach((stock, i) => {
      if(newStock.id == stock.id){
        foundIndex = i
      }
    })
    let newStocks = []
    if(foundIndex == 0){
      newStocks = [newStock, ...this.state.stocks.slice(1)]
    } else {
      newStocks = [...this.state.stocks.slice(0, foundIndex), newStock, ...this.state.stocks.slice(foundIndex+1)]
    }
    this.setState({
      stocks: newStocks
    })
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(r => r.json())
    .then((stocks) => {
      this.setState({
        stocks: stocks.map((stock) => {
          return {...stock, purchased: false}
        })
      }, ()=>{console.log(this.state)})
    })
  }

  getFilteredStocks = () => {
    if(this.state.filteredBy){
      return this.state.stocks.filter((stock) => {
        return stock.type == this.state.filteredBy
      })
    } else {
      return this.state.stocks
    }
  }

  getSortedStocks = () => {
    let filteredStocks = this.getFilteredStocks()
    if(this.state.sortedBy){
      let sortedStocks = [...filteredStocks]
      if(this.state.sortedBy == "alphabetically"){
        sortedStocks.sort((a, b) => {
          return a["ticker"].localeCompare(b["ticker"])
        })
      } else {
        sortedStocks.sort((a, b) => {
          return a["price"] - b["price"]
        })
      }
      return sortedStocks
    } else {
      return filteredStocks
    }
  }

  render() {
    return (
      <div>
        <SearchBar changeSorting={this.changeSorting} checked={this.state.sortedBy} changeFilter={this.changeFilter}/>

          <div className="row">
            <div className="col-8">
              <StockContainer stocks={this.getSortedStocks()} togglePurchased={this.togglePurchased}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.getSortedStocks()} togglePurchased={this.togglePurchased}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
