// webgl/webgl_materials_blending_custom.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from 'three-weixin';	
import { GUI } from './jsm/libs/lil-gui.module.min.js';
Page({
  onUnload(){
    cancelAnimationFrame()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.renderer.context = null
    this.renderer.domElement = null
    this.renderer = null
},
    webgl_touch(e){
        const web_e = Event.fix(e)
       window.dispatchEvent(web_e)
        this.canvas && this.canvas.dispatchEvent(web_e)
    },
async onLoad(){
var that = this
        const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")

        let camera, scene, renderer;

			let mapBg;
			const materials = [];

			const params = {
				blendEquation: THREE.AddEquation
			};

			const equations = { Add: THREE.AddEquation, Subtract: THREE.SubtractEquation, ReverseSubtract: THREE.ReverseSubtractEquation, Min: THREE.MinEquation, Max: THREE.MaxEquation };

		await	init();
			animate();

		async	function init() {

				// CAMERA

				camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 700;

				// SCENE

				scene = new THREE.Scene();

				// BACKGROUND

				const canvas = document.createElement( 'canvas' );
				const ctx = canvas.getContext( '2d' );
				canvas.width = canvas.height = 128;
				ctx.fillStyle = '#ddd';
				ctx.fillRect( 0, 0, 128, 128 );
				ctx.fillStyle = '#555';
				ctx.fillRect( 0, 0, 64, 64 );
				ctx.fillStyle = '#999';
				ctx.fillRect( 32, 32, 32, 32 );
				ctx.fillStyle = '#555';
				ctx.fillRect( 64, 64, 64, 64 );
				ctx.fillStyle = '#777';
				ctx.fillRect( 96, 96, 32, 32 );

				mapBg = new THREE.CanvasTexture(await core.Canvas.fix( canvas ));
				mapBg.wrapS = mapBg.wrapT = THREE.RepeatWrapping;
				mapBg.repeat.set( 64, 32 );

				scene.background = mapBg;

				// FOREGROUND OBJECTS

				const src = [
					{ name: 'Zero', constant: THREE.ZeroFactor },
					{ name: 'One', constant: THREE.OneFactor },
					{ name: 'SrcColor', constant: THREE.SrcColorFactor },
					{ name: 'OneMinusSrcColor', constant: THREE.OneMinusSrcColorFactor },
					{ name: 'SrcAlpha', constant: THREE.SrcAlphaFactor },
					{ name: 'OneMinusSrcAlpha', constant: THREE.OneMinusSrcAlphaFactor },
					{ name: 'DstAlpha', constant: THREE.DstAlphaFactor },
					{ name: 'OneMinusDstAlpha', constant: THREE.OneMinusDstAlphaFactor },
					{ name: 'DstColor', constant: THREE.DstColorFactor },
					{ name: 'OneMinusDstColor', constant: THREE.OneMinusDstColorFactor },
					{ name: 'SrcAlphaSaturate', constant: THREE.SrcAlphaSaturateFactor }
				];

				const dst = [
					{ name: 'Zero', constant: THREE.ZeroFactor },
					{ name: 'One', constant: THREE.OneFactor },
					{ name: 'SrcColor', constant: THREE.SrcColorFactor },
					{ name: 'OneMinusSrcColor', constant: THREE.OneMinusSrcColorFactor },
					{ name: 'SrcAlpha', constant: THREE.SrcAlphaFactor },
					{ name: 'OneMinusSrcAlpha', constant: THREE.OneMinusSrcAlphaFactor },
					{ name: 'DstAlpha', constant: THREE.DstAlphaFactor },
					{ name: 'OneMinusDstAlpha', constant: THREE.OneMinusDstAlphaFactor },
					{ name: 'DstColor', constant: THREE.DstColorFactor },
					{ name: 'OneMinusDstColor', constant: THREE.OneMinusDstColorFactor }
				];

				const geo1 = new THREE.PlaneGeometry( 100, 100 );
				const geo2 = new THREE.PlaneGeometry( 100, 25 );

				const texture = new THREE.TextureLoader().load( 'textures/lensflare/lensflare0_alpha.png' );

				for ( let i = 0; i < dst.length; i ++ ) {

					const blendDst = dst[ i ];

					for ( let j = 0; j < src.length; j ++ ) {

						const blendSrc = src[ j ];

						const material = new THREE.MeshBasicMaterial( { map: texture } );
						material.transparent = true;

						material.blending = THREE.CustomBlending;
						material.blendSrc = blendSrc.constant;
						material.blendDst = blendDst.constant;
						material.blendEquation = THREE.AddEquation;

						const x = ( j - src.length / 2 ) * 110;
						const z = 0;
						const y = ( i - dst.length / 2 ) * 110 + 50;

						const mesh = new THREE.Mesh( geo1, material );
						mesh.position.set( x, - y, z );
						mesh.matrixAutoUpdate = false;
						mesh.updateMatrix();
						scene.add( mesh );

						materials.push( material );

					}

				}

				for ( let j = 0; j < src.length; j ++ ) {

					const blendSrc = src[ j ];

					const x = ( j - src.length / 2 ) * 110;
					const z = 0;
					const y = ( 0 - dst.length / 2 ) * 110 + 50;

					const mesh = new THREE.Mesh( geo2,await generateLabelMaterial( blendSrc.name, 'rgba( 0, 150, 0, 1 )' ) );
					mesh.position.set( x, - ( y - 70 ), z );
					mesh.matrixAutoUpdate = false;
					mesh.updateMatrix();
					scene.add( mesh );

				}

				for ( let i = 0; i < dst.length; i ++ ) {

					const blendDst = dst[ i ];

					const x = ( 0 - src.length / 2 ) * 110 - 125;
					const z = 0;
					const y = ( i - dst.length / 2 ) * 110 + 165;

					const mesh = new THREE.Mesh( geo2,await generateLabelMaterial( blendDst.name, 'rgba( 150, 0, 0, 1 )' ) );
					mesh.position.set( x, - ( y - 120 ), z );
					mesh.matrixAutoUpdate = false;
					mesh.updateMatrix();
					scene.add( mesh );

				}

				// RENDERER

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				// EVENTS

				window.addEventListener( 'resize', onWindowResize );

				// GUI

				//
				const gui = new GUI( { width: 300 } );

				gui.add( params, 'blendEquation', equations ).onChange( updateBlendEquation );
				gui.open();

			}

			//

			function onWindowResize() {

				renderer.setSize( window.innerWidth, window.innerHeight );

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

			}

			//

	async		function generateLabelMaterial( text, bg ) {

				const canvas = document.createElement( 'canvas' );
				const ctx = canvas.getContext( '2d' );
				canvas.width = 128;
				canvas.height = 32;

				ctx.fillStyle = bg;
				ctx.fillRect( 0, 0, 128, 32 );

				ctx.fillStyle = 'white';
				ctx.font = 'bold 11pt arial';
				ctx.fillText( text, 8, 22 );

				const map = new THREE.CanvasTexture(await core.Canvas.fix( canvas ));

				const material = new THREE.MeshBasicMaterial( { map: map, transparent: true } );
				return material;

			}

			function updateBlendEquation( value ) {

				for ( const material of materials ) {

					material.blendEquation = value;

				}

			}

			function animate() {

				requestAnimationFrame( animate );

				const time = Date.now() * 0.00025;
				const ox = ( time * - 0.01 * mapBg.repeat.x ) % 1;
				const oy = ( time * - 0.01 * mapBg.repeat.y ) % 1;

				mapBg.offset.set( ox, oy );

				renderer.render( scene, camera );

			}

    }
})