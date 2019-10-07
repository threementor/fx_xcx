import {getBaseUrl} from '../constants/url'
import Taro from '@tarojs/taro'
import {httpGet, httpPost, httpPut} from './base.jsx'


export function getDeckList(succ, fail){
  let url = getBaseUrl() + '/v1/deck/'
  return httpGet(url, succ, fail)
}


export function getDeckInfo(did, succ, fail){
  let url = getBaseUrl() + `/v1/deck/${did}`
  return httpGet(url, succ, fail)
}


export function addDeck(deck, succ, fail){
  let url = getBaseUrl() + '/v1/deck/'
  return httpPost(url, deck, succ, fail)
}


export function editDeck(did, deck, succ, fail){
  let url = getBaseUrl() + `/v1/deck/${did}`
  return httpPut(url, deck, succ, fail)
}


export function getReadyCards(did, succ, fail){
  if(!did){
    fail('did is null')
    return
  }
  let url = getBaseUrl() + `/v1/deck/${did}/ready_cards`
  return httpGet(url, succ, fail)
}

export function addCard(did, card, succ, fail){
  if(!did){
    fail('did is null')
    return
  }
  let url = getBaseUrl() + `/v1/deck/${did}/create/card`
  return httpPost(url, card, succ, fail)
}


export function regDeck(did, succ, fail){
  if(!did){
    fail('did is null')
    return
  }
  let url = getBaseUrl() + `/v1/deck/${did}/reg`
  return httpPost(url, {}, succ, fail)
}