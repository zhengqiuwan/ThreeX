
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
if ( window.GPUShaderStage === undefined ) {

	window.GPUShaderStage = { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };

}

class WebGPU {

	static isAvailable() {

		return ( navigator.gpu !== undefined );

	}

	static getErrorMessage() {

		const message = 'Your browser does not support <a href="https://gpuweb.github.io/gpuweb/" style="color:blue">WebGPU</a>';

		const element = document.createElement( 'div' );
		element.id = 'webgpumessage';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		element.innerHTML = message;

		return element;

	}

}

export default WebGPU;
