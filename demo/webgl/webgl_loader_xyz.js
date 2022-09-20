// webgl/webgl_loader_xyz.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { XYZLoader } from './jsm/loaders/XYZLoader.js';

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

        let camera, scene, renderer, clock;

        let points;

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
            camera.position.set( 10, 7, 10 );

            scene = new THREE.Scene();
            scene.add( camera );
            camera.lookAt( scene.position );

            clock = new THREE.Clock();

            const loader = new XYZLoader();
            loader.load( 'models/xyz/helix_201.xyz', function ( geometry ) {

                geometry.center();

                const vertexColors = ( geometry.hasAttribute( 'color' ) === true );

                const material = new THREE.PointsMaterial( { size: 0.1, vertexColors: vertexColors } );

                points = new THREE.Points( geometry, material );
                scene.add( points );

            } );

            //

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            //

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {

            requestAnimationFrame( animate );

            const delta = clock.getDelta();

            if ( points ) {

                points.rotation.x += delta * 0.2;
                points.rotation.y += delta * 0.5;

            }

            renderer.render( scene, camera );

        }
    }
})