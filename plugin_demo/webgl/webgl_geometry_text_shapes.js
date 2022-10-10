// webgl/webgl_geometry_text_shapes.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { FontLoader } from './jsm/loaders/FontLoader.js';
var requestId
Page({
	   
         onUnload() {
	   		cancelAnimationFrame(requestId, this.canvas)
this.worker && this.worker.terminate()
		setTimeout(() => {
			if (this.renderer instanceof THREE.WebGLRenderer) {
				this.renderer.dispose()
				this.renderer.forceContextLoss()
				this.renderer.context = null
				this.renderer.domElement = null
				this.renderer = null
			}
		}, 0)
        
	},
         webgl_touch(e) {
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
        let camera, scene, renderer;

        init();

        function init( ) {

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.set( 0, - 400, 600 );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xf0f0f0 );

            const loader = new FontLoader();
            loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

                const color = 0x006699;

                const matDark = new THREE.LineBasicMaterial( {
                    color: color,
                    side: THREE.DoubleSide
                } );

                const matLite = new THREE.MeshBasicMaterial( {
                    color: color,
                    transparent: true,
                    opacity: 0.4,
                    side: THREE.DoubleSide
                } );

                const message = '   Three.js\nSimple text.';

                const shapes = font.generateShapes( message, 100 );

                const geometry = new THREE.ShapeGeometry( shapes );

                geometry.computeBoundingBox();

                const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

                geometry.translate( xMid, 0, 0 );

                // make shape ( N.B. edge view not visible )

                const text = new THREE.Mesh( geometry, matLite );
                text.position.z = - 150;
                scene.add( text );

                // make line shape ( N.B. edge view remains visible )

                const holeShapes = [];

                for ( let i = 0; i < shapes.length; i ++ ) {

                    const shape = shapes[ i ];

                    if ( shape.holes && shape.holes.length > 0 ) {

                        for ( let j = 0; j < shape.holes.length; j ++ ) {

                            const hole = shape.holes[ j ];
                            holeShapes.push( hole );

                        }

                    }

                }

                shapes.push.apply( shapes, holeShapes );

                const lineText = new THREE.Object3D();

                for ( let i = 0; i < shapes.length; i ++ ) {

                    const shape = shapes[ i ];

                    const points = shape.getPoints();
                    const geometry = new THREE.BufferGeometry().setFromPoints( points );

                    geometry.translate( xMid, 0, 0 );

                    const lineMesh = new THREE.Line( geometry, matDark );
                    lineText.add( lineMesh );

                }

                scene.add( lineText );

                render();

            } ); //end load function

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.target.set( 0, 0, 0 );
            controls.update();

            controls.addEventListener( 'change', render );

            window.addEventListener( 'resize', onWindowResize );

        } // end init

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

            render();

        }

        function render() {

            renderer.render( scene, camera );

        }

    }
})