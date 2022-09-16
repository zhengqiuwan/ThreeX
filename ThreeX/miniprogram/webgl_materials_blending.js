// webgl/webgl_materials_blending.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';


const THREE = requirePlugin('ThreeX');
Page({
	async onLoad() {
var that = this
        this.canvas = await document.createElementAsync("canvas","webgl")


			let camera, scene, renderer;
			let mapBg;

			const textureLoader = new THREE.TextureLoader();

			init();
			animate();

			function init() {

				// CAMERA

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 600;

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

				mapBg = new THREE.CanvasTexture( canvas );
				mapBg.wrapS = mapBg.wrapT = THREE.RepeatWrapping;
				mapBg.repeat.set( 64, 32 );

				scene.background = mapBg;

				// OBJECTS

				const blendings = [
					{ name: 'No', constant: THREE.NoBlending },
					{ name: 'Normal', constant: THREE.NormalBlending },
					{ name: 'Additive', constant: THREE.AdditiveBlending },
					{ name: 'Subtractive', constant: THREE.SubtractiveBlending },
					{ name: 'Multiply', constant: THREE.MultiplyBlending }
				];

				const map0 = textureLoader.load( 'textures/uv_grid_opengl.jpg' );
				const map1 = textureLoader.load( 'textures/sprite0.jpg' );
				const map2 = textureLoader.load( 'textures/sprite0.png' );
				const map3 = textureLoader.load( 'textures/lensflare/lensflare0.png' );
				const map4 = textureLoader.load( 'textures/lensflare/lensflare0_alpha.png' );

				const geo1 = new THREE.PlaneGeometry( 100, 100 );
				const geo2 = new THREE.PlaneGeometry( 100, 25 );

				addImageRow( map0, 300 );
				addImageRow( map1, 150 );
				addImageRow( map2, 0 );
				addImageRow( map3, - 150 );
				addImageRow( map4, - 300 );

				function addImageRow( map, y ) {

					for ( let i = 0; i < blendings.length; i ++ ) {

						const blending = blendings[ i ];

						const material = new THREE.MeshBasicMaterial( { map: map } );
						material.transparent = true;
						material.blending = blending.constant;

						const x = ( i - blendings.length / 2 ) * 110;
						const z = 0;

						let mesh = new THREE.Mesh( geo1, material );
						mesh.position.set( x, y, z );
						scene.add( mesh );

						mesh = new THREE.Mesh( geo2, generateLabelMaterial( blending.name ) );
						mesh.position.set( x, y - 75, z );
						scene.add( mesh );

					}

				}

				// RENDERER

				renderer = that.renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				// EVENTS

				window.addEventListener( 'resize', onWindowResize );

			}

			//

			function onWindowResize() {

				const SCREEN_WIDTH = window.innerWidth;
				const SCREEN_HEIGHT = window.innerHeight;

				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

				camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
				camera.updateProjectionMatrix();

			}


			function generateLabelMaterial( text ) {

				const canvas = document.createElement( 'canvas' );
				const ctx = canvas.getContext( '2d' );
				canvas.width = 128;
				canvas.height = 32;

				ctx.fillStyle = 'rgba( 0, 0, 0, 0.95 )';
				ctx.fillRect( 0, 0, 128, 32 );

				ctx.fillStyle = 'white';
				ctx.font = 'bold 12pt arial';
				ctx.fillText( text, 10, 22 );

				const map = new THREE.CanvasTexture( canvas );

				const material = new THREE.MeshBasicMaterial( { map: map, transparent: true } );

				return material;

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