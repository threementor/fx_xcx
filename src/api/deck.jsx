import {BASE_URL} from '../constants/url'
import Taro from '@tarojs/taro'
import {httpGet, httpPost} from './base.jsx'


export function getDeckList(succ, fail){
  let url = BASE_URL + '/v1/deck/'
  return httpGet(url, succ, fail)
}

export function addDeck(deck, succ, fail){
  let url = BASE_URL + '/v1/deck/'
  return httpPost(url, deck, succ, fail)
}

export function getReadyCards(did, succ, fail){
  if(!did){
    fail('did is null')
    return
  }
  let url = BASE_URL + `/v1/deck/${did}/ready_cards`
  return httpGet(url, succ, fail)
}

export function addCard(did, card, succ, fail){
  if(!did){
    fail('did is null')
    return
  }
  let url = BASE_URL + `/v1/deck/${did}/create/card`
  return httpPost(url, card, succ, fail)
}