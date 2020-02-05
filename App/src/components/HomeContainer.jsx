import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/HomeContainer.css'

class HomeContainer extends Component {
  render () {
    return (
      <div>
        <div className='SearchTerm'>
          <form onSubmit={this.props.onHandleGetProducts}>
            <fieldset disabled={this.props.isFetching}>
              <input type='text' value={this.props.term} onChange={this.props.onHandleChangeTerm} placeholder='TERMO DE CONSULTA' />
              <input type='submit' value='Consultar' />
            </fieldset>
          </form>
          <form onSubmit={this.props.onHandleSendEmail}>
            <fieldset disabled={this.props.isFetching}>
              <input type='text' value={this.props.emails} onChange={this.props.onHandleChangeEmails} placeholder='EMAILS' />
              <input type='text' value={this.props.timebox} onChange={this.props.onHandleChangeTimebox} placeholder='tempo ms' />
              <input type='submit' value='Enviar Email' />
            </fieldset>
          </form>
          <button onClick={this.props.onHandleSaveSearch}>Salvar</button>
          <button onClick={this.props.onHandleNavSearches}>Ir Consultas</button>
        </div>
        {this.props.isFetching && <div>Searching...</div>}
        <div>{this.props.message}</div>
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
  emails: PropTypes.string.isRequired,
  timebox: PropTypes.string.isRequired,
  message: PropTypes.string,
  isFetching: PropTypes.bool,
  products: PropTypes.array,
  onHandleGetProducts: PropTypes.func.isRequired,
  onHandleChangeTerm: PropTypes.func.isRequired,
  onHandleSendEmail: PropTypes.func.isRequired,
  onHandleChangeEmails: PropTypes.func.isRequired,
  onHandleNavSearches: PropTypes.func.isRequired,
  onHandleChangeTimebox: PropTypes.func.isRequired,
  onHandleSaveSearch: PropTypes.func.isRequired
}

export default HomeContainer
