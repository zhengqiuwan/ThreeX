import init from './scene.js';
import {self} from "dhtml-weixin"

self.onmessage = function ( message ) {

	const data = message.data;
	init( data.drawingSurface, data.width, data.height, data.pixelRatio, data.path );

};
