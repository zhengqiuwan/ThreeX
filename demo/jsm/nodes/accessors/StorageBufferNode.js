
import {
    Blob,
    btoa,
    createImageBitmap,
    CSSStyleDeclaration,
    performance,
    document,
    DOMParser,
    EventTarget,
    fetch,
    Headers,
    HTMLCanvasElement,
    HTMLImageElement,
    ImageBitmap,
    location,
    navigator,
    Request,
    requestAnimationFrame,
    cancelAnimationFrame,
    Response,
    URL,
    window,
    self,
    WebAssembly,
    Worker,
    XMLHttpRequest,
	ImageData,
    core,
    } from 'dhtml-weixin';
import BufferNode from './BufferNode.js';

class StorageBufferNode extends BufferNode {

	constructor( value, bufferType, bufferCount = 0 ) {

		super( value, bufferType, bufferCount );

		this.isStorageBufferNode = true;

	}

	getInputType( /*builder*/ ) {

		return 'storageBuffer';

	}

}

export default StorageBufferNode;
