
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
import Object3DNode from './Object3DNode.js';

class ModelNode extends Object3DNode {

	constructor( scope = ModelNode.VIEW_MATRIX ) {

		super( scope );

	}

	update( frame ) {

		this.object3d = frame.object;

		super.update( frame );

	}

}

export default ModelNode;
