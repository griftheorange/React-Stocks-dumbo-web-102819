import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  genStocks = () => {
    return this.props.stocks.filter((stock) => {
      return !stock.purchased
    }).map((stock, i) => {
      return <Stock key={i} stock={stock} togglePurchased={this.props.togglePurchased}/>
    })
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.genStocks()
        }
      </div>
    );
  }

}

export default StockContainer;
