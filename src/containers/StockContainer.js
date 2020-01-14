import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  genStocks = () => {
    return this.props.stocks.map((stock, i) => {
      return <Stock key={i} stock={stock} togglePurchased={stock.purchased ? ()=>{} : this.props.togglePurchased}/>
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
