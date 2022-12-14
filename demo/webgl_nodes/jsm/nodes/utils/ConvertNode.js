
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
	Image,
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
	TextDecoder,
    core
    } from 'dhtml-weixin';
import Node from '../core/Node.js';

class ConvertNode extends Node {

	constructor( node, convertTo ) {

		super();

		this.node = node;
		this.convertTo = convertTo;

	}

	getNodeType( /*builder*/ ) {

		return this.convertTo;

	}

	generate( builder, output ) {

		const convertTo = this.convertTo;
		const node = this.node;
		const type = this.getNodeType( builder );

		let snippet = null;

		if ( builder.isReference( convertTo ) === false ) {

			const nodeSnippet = node.build( builder, convertTo );

			snippet = builder.format( nodeSnippet, type, convertTo );

		} else {

			snippet = node.build( builder, convertTo );

		}

		return builder.format( snippet, type, output );

	}

}

export default ConvertNode;
