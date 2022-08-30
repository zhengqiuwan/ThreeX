import GUID from './core/GUID'

export default class URL {
  static createObjectURL(blob) {
    const url = `blob:http://localhost/${GUID()}`
    if (!getApp().ObjectURL) {
      getApp().ObjectURL = {}
    }
    console.error("[createObjectURL]"+url)
    getApp().ObjectURL[url] = blob
    return url
  }

  static revokeObjectURL(url) {
    delete getApp().ObjectURL[url]
  }
}
