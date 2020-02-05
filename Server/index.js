const axios = require('axios')
require('dotenv').config()

const getMongoSearches = function () {
  return axios.get(process.env.MONGO_API + '/searches')
}

const base64Encode = (encodeData) => {
  const buff = Buffer.from(encodeData)
  return buff.toString('base64')
}

const SendEmail = function (item) {
  const params = {
    emails: item.email,
    term: item.term,
    html: item.html
  }

  return axios.post(process.env.EMAIL_API + '/email', params)
}

function GetEbayResults (_url) {
  return axios.get(_url)
}

function updateSearch (item) {
  return axios.put(process.env.MONGO_API + '/searches/' + item._id, item)
}

async function main () {
  getMongoSearches()
    .then((response) => {
      const arrTerms = response.data
      for (let i = 0; i < arrTerms.length; i++) {
        const diffTime = Date.now() - new Date(arrTerms[i].lastMailTimestamp)
        if (diffTime > arrTerms[i].timebox) {
          GetEbayResults(process.env.EBAY_API + '/ebay/' + arrTerms[i].term)
            .then((response) => {
              arrTerms[i].lastMailTimestamp = Date.now()
              var _html = '<div>'
              for (let j = 0; j < response.data.itemSummaries.length; j++) {
                _html += '<div style="width: 90%;height: auto;margin: 5px;padding: 5px;background-color: rgb(246, 246, 246);border: 2px solid #bdbdbd;border-radius: 10px;display: flex;flex-direction: row;justify-content: space-between;"><img src="' + response.data.itemSummaries[j].image.imageUrl + '"style="width: 225px;height: 225px;border-radius: 3px;border: 2px solid #ddd;"></img>'
                _html += '<div style="padding-left: 10px;padding-top: 10px;width: 100%;display: flex;flex-direction: column;justify-content: space-between;font-family: "Helvetica Neue", Helvetica, Arial, Roboto, sans-serif;box-sizing: inherit;align-items: flex-start;"><div style="font-size: 16px;font-weight: 400;line-height: 1.3;list-style: none;color: rgb(6, 84, 186);">' + response.data.itemSummaries[j].title + '</div>'
                _html += '<div style="display: flex;flex-direction: row;justify-content: space-between;width: 90%;"><div style="color: #767676;">ID: ' + response.data.itemSummaries[j].itemId + '</div>'
                _html += '<div style="color: #767676;">Condicao: ' + response.data.itemSummaries[j].condition + '</div>'
                _html += '<div style="color: #767676;">Vendedor: <a style="text-decoration: none;color: #000;" target="_blank" rel="noopener noreferrer" href="https://www.ebay.com/usr/' + response.data.itemSummaries[j].seller.username + '">' + response.data.itemSummaries[j].seller.username + '</a></div>'
                _html += '<div style="color: #767676;">rep: ' + response.data.itemSummaries[j].seller.feedbackPercentage + '%</div><div style="color: #767676;">score: ' + response.data.itemSummaries[j].seller.feedbackScore + '</div><div style="color: #767676;">Localizacao: ' + response.data.itemSummaries[j].itemLocation.country + '</div></div>'
                _html += '<div style="display: flex;flex-direction: row;"><div style="color: #333;font-weight: 700;font-size: 20px;margin-right: 10px;">Preco: ' + response.data.itemSummaries[j].price.currency + '</div><div style="color: #333;font-weight: 700;font-size: 20px;margin-right: 10px;">' + response.data.itemSummaries[j].price.value + '</div></div><div style="display: flex;flex-direction: row;"><div style="color: #333;font-weight: 700;font-size: 20px;margin-right: 10px;">Envio: ' + response.data.itemSummaries[j].shippingOptions[0].shippingCostType + '</div><div style="color: #333;font-weight: 700;font-size: 20px;margin-right: 10px;">Custo: ' + response.data.itemSummaries[j].shippingOptions[0].shippingCost.currency + '</div><div style="color: #333;font-weight: 700;font-size: 20px;margin-right: 10px;">' + response.data.itemSummaries[j].shippingOptions[0].shippingCost.value + '</div></div>'
                _html += '<a style="  text-decoration: none;color: rgb(17, 0, 255);background-color: #22dff8;width: 90%;height: 30px;display: flex;justify-content: center;align-items: center;font-weight: 700;font-size: 20px;border: 2px solid #148290;border-radius: 10px;font-family: inherit;" target="_blank" rel="noopener noreferrer" href="' + response.data.itemSummaries[j].itemWebUrl + '">Acesse</a></div></div>'
              }
              _html += '</div>'
              arrTerms[i].html = base64Encode(_html)
            })
            .catch((error) => {
              console.log(error)
            })
            .finally(() => {
              SendEmail(arrTerms[i])
                .then((response) => {
                  console.log(response.data)
                })
                .catch((error) => {
                  console.log(error.Error)
                })
                .finally(() => {
                  updateSearch(arrTerms[i])
                    .then((response) => {
                      console.log(response.data)
                    })
                    .catch((error) => {
                      console.log(error.Error)
                    })
                    .finally(() => {
                      console.log('done')
                    })
                })
            })
        }
      }
    })
    .catch((error) => {
      console.log(error.Error)
    })
    .finally(() => {
      console.log('end')
    })
}

function start () {
  setInterval(async () => main(), parseInt(process.env.SERVER_MIN * 60001))
}

start()
