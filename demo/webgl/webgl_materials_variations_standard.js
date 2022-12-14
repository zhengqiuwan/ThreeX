// webgl/webgl_materials_variations_standard.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

			import { OrbitControls } from './jsm/controls/OrbitControls.js';
			import { RGBELoader } from './jsm/loaders/RGBELoader.js';
			import { FontLoader } from './jsm/loaders/FontLoader.js';
			import { TextGeometry } from './jsm/geometries/TextGeometry.js';
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
        let container, stats;

        let camera, scene, renderer;
        let particleLight;

        const loader = new FontLoader();
        loader.load( 'fonts/gentilis_regular.typeface.json', function ( font ) {

            init( font );
            animate();

        } );

        function init( font ) {

            container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2500 );
            camera.position.set( 0.0, 400, 400 * 3.5 );

            //

            scene = new THREE.Scene();

            new RGBELoader()
                .setPath( 'textures/equirectangular/' )
                .load( 'pedestrian_overpass_1k.hdr', function ( texture ) {

                    texture.mapping = THREE.EquirectangularReflectionMapping;

                    // Materials

                    const cubeWidth = 400;
                    const numberOfSphersPerSide = 5;
                    const sphereRadius = ( cubeWidth / numberOfSphersPerSide ) * 0.8 * 0.5;
                    const stepSize = 1.0 / numberOfSphersPerSide;

                    const geometry = new THREE.SphereGeometry( sphereRadius, 32, 16 );

                    let index = 0;

                    for ( let alpha = 0; alpha <= 1.0; alpha += stepSize ) {

                        for ( let beta = 0; beta <= 1.0; beta += stepSize ) {

                            for ( let gamma = 0; gamma <= 1.0; gamma += stepSize ) {

                                const diffuseColor = new THREE.Color().setHSL( alpha, 0.5, 0.25 );

                                const material = new THREE.MeshPhysicalMaterial( {
                                    color: diffuseColor,
                                    metalness: 0,
                                    roughness: 0.5,
                                    clearcoat: 1.0 - alpha,
                                    clearcoatRoughness: 1.0 - beta,
                                    reflectivity: 1.0 - gamma,
                                    envMap: ( index % 2 ) == 1 ? texture : null
                                } );

                                index ++;

                                const mesh = new THREE.Mesh( geometry, material );

                                mesh.position.x = alpha * 400 - 200;
                                mesh.position.y = beta * 400 - 200;
                                mesh.position.z = gamma * 400 - 200;

                                scene.add( mesh );

                            }

                            index ++;

                        }

                        index ++;

                    }

                    scene.background = texture;

                } );

            function addLabel( name, location ) {

                const textGeo = new TextGeometry( name, {

                    font: font,

                    size: 20,
                    height: 1,
                    curveSegments: 1

                } );

                const textMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
                const textMesh = new THREE.Mesh( textGeo, textMaterial );
                textMesh.position.copy( location );
                scene.add( textMesh );

            }

            addLabel( '+clearcoat', new THREE.Vector3( - 350, 0, 0 ) );
            addLabel( '-clearcoat', new THREE.Vector3( 350, 0, 0 ) );

            addLabel( '+clearcoatRoughness', new THREE.Vector3( 0, - 300, 0 ) );
            addLabel( '-clearcoatRoughness', new THREE.Vector3( 0, 300, 0 ) );

            addLabel( '+reflectivity', new THREE.Vector3( 0, 0, - 300 ) );
            addLabel( '-reflectivity', new THREE.Vector3( 0, 0, 300 ) );

            particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
            scene.add( particleLight );

            // Lights

            scene.add( new THREE.AmbientLight( 0x222222 ) );

            const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
            directionalLight.position.set( 1, 1, 1 ).normalize();
            scene.add( directionalLight );

            const pointLight = new THREE.PointLight( 0xffffff, 2, 800 );
            particleLight.add( pointLight );

            //

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( renderer.domElement );

            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 0.75;

            //

            stats = new Stats();
            container.appendChild( stats.dom );

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.minDistance = 200;
            controls.maxDistance = 2000;

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        //

        function animate() {

            requestId = requestAnimationFrame(animate);

            render();
            stats.update();

        }

        function render() {

            const timer = Date.now() * 0.00025;

            //camera.position.x = Math.cos( timer ) * 800;
            //camera.position.z = Math.sin( timer ) * 800;

            camera.lookAt( scene.position );

            particleLight.position.x = Math.sin( timer * 7 ) * 300;
            particleLight.position.y = Math.cos( timer * 5 ) * 400;
            particleLight.position.z = Math.cos( timer * 3 ) * 300;

            renderer.render( scene, camera );

        }

    }
})