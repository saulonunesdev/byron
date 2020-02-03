import React, { Component } from 'react'
import { GetProducts } from '../api/ebayAPI'
import { SendEmail } from '../api/emailAPI'
import HomeContainer from '../components/HomeContainer'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      isFetching: false,
      message: '',
      term: '',
      emails: '',
      products: []
    }

    this.handleGetProducts = this.handleGetProducts.bind(this)
    this.handleChangeTerm = this.handleChangeTerm.bind(this)
    this.handleSendEmail = this.handleSendEmail.bind(this)
    this.handleChangeEmails = this.handleChangeEmails.bind(this)
  }

  handleSendEmail (e) {
    e.preventDefault()
    this.setState({
      isFetching: true,
      message: ''
    })

    var items = this.state.products
    var _html = '<div style="margin-top: 15px;width: 100%;height: auto;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">'
    for (let i = 0; i < items.length; i++) {
      _html += '<div style="width: 90%;height: auto;margin: 5px;padding: 5px;background-color: rgb(246, 246, 246);border: 2px solid #bdbdbd;border-radius: 10px;display: flex;flex-direction: row;justify-content: space-between;"><img src="' + items[i].image.imageUrl + '"style="width: 225px;height: 225px;border-radius: 3px;border: 2px solid #ddd;"></img>'
      _html += '<div style="padding-left: 10px;padding-top: 10px;width: 100%;display: flex;flex-direction: column;justify-content: space-between;font-family: "Helvetica Neue", Helvetica, Arial, Roboto, sans-serif;box-sizing: inherit;align-items: flex-start;"><div style="font-size: 16px;font-weight: 400;line-height: 1.3;list-style: none;color: rgb(6, 84, 186);">' + items[i].title + '</div>'
      _html += '<div style="display: flex;flex-direction: row;justify-content: space-between;width: 90%;"><div style="color: #767676;">ID: ' + items[i].itemId + '</div>'
      _html += '<div style="color: #767676;">Condicao: ' + items[i].condition + '</div>'
      _html += '<div style="color: #767676;">Vendedor: <a style="text-decoration: none;color: #000;" target="_blank" rel="noopener noreferrer" href="https://www.ebay.com/usr/' + items[i].seller.username + '">' + items[i].seller.username + '</a></div>'
      _html += '<div style="color: #767676;">rep: ' + items[i].seller.feedbackPercentage + '%</div><div style="color: #767676;">score: ' + items[i].seller.feedbackScore + '</div><div style="color: #767676;">Localizacao: ' + items[i].itemLocation.country + '</div></div>'
      _html += '<div style="display: flex;flex-direction: row;"><div style="color: #333;font-weight: 700;font-size: 20px;margin-right: 10px;">Preco: ' + items[i].price.currency + '</div><div style="color: #333;font-weight: 700;font-size: 20px;margin-right: 10px;">' + items[i].price.value + '</div></div><div style="display: flex;flex-direction: row;"><div style="color: #333;font-weight: 700;font-size: 20px;margin-right: 10px;">Envio: ' + items[i].shippingOptions[0].shippingCostType + '</div><div style="color: #333;font-weight: 700;font-size: 20px;margin-right: 10px;">Custo: ' + items[i].shippingOptions[0].shippingCost.currency + '</div><div style="color: #333;font-weight: 700;font-size: 20px;margin-right: 10px;">' + items[i].shippingOptions[0].shippingCost.value + '</div></div>'
      _html += '<a style="  text-decoration: none;color: rgb(17, 0, 255);background-color: #22dff8;width: 90%;height: 30px;display: flex;justify-content: center;align-items: center;font-weight: 700;font-size: 20px;border: 2px solid #148290;border-radius: 10px;font-family: inherit;" target="_blank" rel="noopener noreferrer" href="' + items[i].itemWebUrl + '">Acesse</a></div></div>'
    }
    _html += '</div>'

    SendEmail(this.state.emails, this.state.term, _html)
      .then((response) => {
        this.setState({ message: response.data })
      })
      .catch((error) => {
        this.setState({ message: error.Error })
      })
      .finally(() => {
        this.setState({ isFetching: false })
      })
  }

  handleChangeTerm (e) {
    this.setState({
      term: e.target.value
    })
  }

  handleChangeEmails (e) {
    this.setState({
      emails: e.target.value
    })
  }

  handleGetProducts (e) {
    e.preventDefault()
    this.setState({
      isFetching: true,
      products: []
    })

    GetProducts(this.state.term)
      .then((response) => {
        const arr = []
        for (let i = 0; i < response.data.itemSummaries.length; i++) {
          arr.push(response.data.itemSummaries[i])
        }

        this.setState({
          products: arr
        })
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this.setState({ isFetching: false })
      })
  }

  render () {
    return (
      <HomeContainer
        {...this.state}
        onHandleGetProducts={this.handleGetProducts}
        onHandleChangeTerm={this.handleChangeTerm}
        onHandleSendEmail={this.handleSendEmail}
        onHandleChangeEmails={this.handleChangeEmails}
      />
    )
  }
}

export default Home
