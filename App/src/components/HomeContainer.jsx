import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/HomeContainer.css'

class HomeContainer extends Component {
  render () {
    return (
      <div>
        <form onSubmit={this.props.onHandleGetProducts}>
          <fieldset disabled={this.props.isFetching} className='SearchTerm'>
            <input type='text' value={this.props.term} onChange={this.props.onHandleChangeTerm} placeholder='TERMO DE CONSULTA' />
            <input type='submit' value='Consultar' />
          </fieldset>
        </form>
        {this.props.isFetching && <div>Searching...</div>}
        <ul className='ResultsBox'>
          {this.props.products.map((item, index) => (
            <li key={index} className='ResultItem'>
              <img src={item.image.imageUrl} className='PhotoProduct' />
              <div className='ItemDetails'>
                <div className='ItemTitle'>{item.title}</div>
                <div className='ItemDesc'>
                  <div className='ItemCondition'>ID: {item.itemId}</div>
                  <div className='ItemCondition'>Condição: {item.condition}</div>
                  <div className='ItemCondition'>
                    Vendedor: <a target='_blank' rel='noopener noreferrer' href={'https://www.ebay.com/usr/' + item.seller.username}>{item.seller.username}</a>
                  </div>
                  <div className='ItemCondition'>rep: {item.seller.feedbackPercentage}%</div>
                  <div className='ItemCondition'>score: {item.seller.feedbackScore}</div>
                  <div className='ItemCondition'>Localização: {item.itemLocation.country}</div>
                </div>
                <div className='ItemPrice'>
                  <div className='PriceCurrency'>Preço: {item.price.currency}</div>
                  <div className='PriceCurrency'>{item.price.value}</div>
                </div>
                <div className='ItemPrice'>
                  <div className='PriceCurrency'>Envio: {item.shippingOptions[0].shippingCostType}</div>
                  <div className='PriceCurrency'>Custo: {item.shippingOptions[0].shippingCost.currency}</div>
                  <div className='PriceCurrency'>{item.shippingOptions[0].shippingCost.value}</div>
                </div>
                <a className='PageItem' target='_blank' rel='noopener noreferrer' href={item.itemWebUrl}>Acesse</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

HomeContainer.propTypes = {
  term: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  products: PropTypes.array,
  onHandleGetProducts: PropTypes.func.isRequired,
  onHandleChangeTerm: PropTypes.func.isRequired
}

export default HomeContainer
