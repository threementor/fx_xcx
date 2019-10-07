import {getBaseUrl} from '../constants/url'
import Taro from '@tarojs/taro'
import {httpGet, httpPost, httpPut} from './base.jsx'

export function onCardHard(card_id, succ, fail){
  let url = getBaseUrl() + `/v1/card/${card_id}/hard`
  httpPut(url, {}, succ, fail)
}

export function onCardNormal(card_id, succ, fail){
  let url = getBaseUrl() + `/v1/card/${card_id}/ok`
  httpPut(url, {}, succ, fail)
}

export function onCardEasy(card_id, succ, fail){
  let url = getBaseUrl() + `/v1/card/${card_id}/easy`
  httpPut(url, {}, succ, fail)
}

export function getCard(card_id, succ, fail){
  let url = getBaseUrl() + `/v1/card/${card_id}`
  httpGet(url, succ, fail)
}

export function editCard(card_id, note, succ, fail){
  let url = getBaseUrl() + `/v1/card/${card_id}/note`
  httpPut(url, note, succ, fail)
}

