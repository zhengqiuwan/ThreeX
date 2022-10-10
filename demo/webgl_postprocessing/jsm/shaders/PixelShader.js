
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
/**
 * Pixelation shader
 */

const PixelShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'resolution': { value: null },
		'pixelSize': { value: 1 },

	},

	vertexShader: /* glsl */`

		varying highp vec2 vUv;

			void main() {

				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform sampler2D tDiffuse;
		uniform float pixelSize;
		uniform vec2 resolution;

		varying highp vec2 vUv;

		void main(){

			vec2 dxy = pixelSize / resolution;
			vec2 coord = dxy * floor( vUv / dxy );
			gl_FragColor = texture2D(tDiffuse, coord);

		}`

};

export { PixelShader };