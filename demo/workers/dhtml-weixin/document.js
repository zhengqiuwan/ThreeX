/* eslint-disable no-redeclare */
/* eslint-disable import/export */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import Image from './Image'
import Window from './window'
import Location from './Location'
import EventTarget from './EventTarget'
/* eslint-disable class-methods-use-this */
import Style from './Style'
import Element from './Element'
import ClassCollection from './ClassCollection'

class HTMLElement extends Element {
  constructor(wx_element) {
    super()
    this.wx_element = wx_element
    this.style = new Style()
    this.classList = new ClassCollection()
    this._children = []
    this.textContent = ''
  }

  get ownerDocument() {
    return new Document()
  }

  get parentElement() {
    return new HTMLElement()
  }

  get children() {
    return this._children
  }
  append() {

  }
  appendChild() {

  }
  removeChild() {

  }
  remove() {

  }

  insertBefore() {

  }

  setAttribute() {

  }

  toggleAttribute() {

  }

  click() {

  }

  getBoundingClientRect() {
    return {}
  }
  play() {

  }
  setPointerCapture() {

  }
  releasePointerCapture() {

  }
  get clientWidth() {
    return this.wx_element ? this.wx_element.width : 0
  }
  get clientHeight() {
    return this.wx_element ? this.wx_element.height : 0
  }
}

class Head extends HTMLElement {

}

class Body extends HTMLElement {

}

export default class Document extends EventTarget {
  constructor() {
    super()
    this.window = new Window()
  }

  get body() {
    return new Body()
  }

  get head() {
    return new Head()
  }

  async createElementAsync(nodeName, canvasType = '2d') {
    switch (nodeName) {
      case 'canvas':
        return new Promise((resolve) => {
          const query = wx.createSelectorQuery()
          query.select(`#canvas_${canvasType}`)
            .fields({ node: true })
            .exec((res) => {
              const canvas = res[0].node
              if (canvasType === '2d') {
                const context = canvas.getContext('2d')
                context.clearRect(0, 0, 10000, 10000)
              }
              resolve(canvas)
            })
        })
      default:
        console.error('createElementAsync', nodeName)
        throw new Error(nodeName)
    }
  }

  async getElementByIdAsync(id) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery()
      query.select(`#${id}`)
        .fields({ node: true })
        .exec((res) => {
          resolve(res[0].node)
        })
    })
  }

  async getElementsByTagNameAsync(tagName) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery()
      query.select(tagName)
        .fields({ node: true })
        .exec((res) => {
          resolve(res[0].node)
        })
    })
  }

  async getElementsByClassNameAsync(className) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery()
      query.select(`.${className}`)
        .fields({ node: true })
        .exec((res) => {
          resolve(res[0].node)
        })
    })
  }

  createElement(nodeName, canvasType = '2d') {
    switch (nodeName) {
      case 'canvas':
        return wx.createOffscreenCanvas({ type: canvasType })
      case 'img':
        return new Image()
      default:
        return new HTMLElement()
    }
  }

  createElementNS(namesspace, nodeName, canvasType) {
    return this.createElement(nodeName, canvasType)
  }

  get documentElement() {
    return new HTMLElement()
  }

  getElementById() {
    return new HTMLElement()
  }

  getElementsByTagName() {
    return []
  }

  getElementsByClassName() {
    return []
  }

  querySelector() {
    return new HTMLElement()
  }

  get location() {
    return new Location()
  }

  querySelectorAll() {
    return []
  }
}
