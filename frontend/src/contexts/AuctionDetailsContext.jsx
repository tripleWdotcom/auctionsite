import { createContext, useState } from 'react'

export const AuctionDetailsContext = createContext();

export default function AuctionDetailsProvider(props) {
  const [auctionItem, setAuctionItem] = useState([])
  const [filteredAuctionItems, setFilteredAuctionItems] = useState([])

  const fetchAuctionItem = async (id) => {
    let res = await fetch(`/rest/auctionItem/${id}`)
    res = await res.json()
    setAuctionItem(res)
  }

  const fetchFilteredAuctionItems = async (obj) => {

  //%7B%5Esearch%5E:%5EinputValue%5E,%5EcategoryId%5E:%5Enumber%5E,%5EpriceFrom%5E:%5ElowestPrice%5E,%5EpriceTo%5E:%5EhighestPrice%5E,%5EbuttonSelection%5E:%5EbuttonSelection%5E%7D

    obj = JSON.stringify(obj).replace('{', '%7B').replace('}', '%7D')
    obj = obj.replaceAll('"', '%5E')
    let res = await fetch(`/rest/auctionItem/filtered/${obj}`)
    res = await res.json()
    setFilteredAuctionItems(res)
  }

  const values = {
    auctionItem,
    fetchAuctionItem,
    filteredAuctionItems,
    fetchFilteredAuctionItems
  }

  return (
    <AuctionDetailsContext.Provider value={values}>
      {props.children}
    </AuctionDetailsContext.Provider>
  )
}