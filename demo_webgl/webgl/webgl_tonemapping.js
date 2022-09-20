// webgl/webgl_tonemapping.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';
var requestId
Page({
	   
         onUnload() {
	   		cancelAnimationFrame(requestId, this.canvas)

if( this.renderer){
        this.renderer.dispose()
        this.renderer.forceContextLoss()
        this.renderer.context = null
        this.renderer.domElement = null
        this.renderer = null  }
        
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

        let mesh, renderer, scene, camera, controls;
        let gui, guiExposure = null;

        const params = {
            exposure: 1.0,
            toneMapping: 'ACESFilmic'
        };

        const toneMappingOptions = {
            None: THREE.NoToneMapping,
            Linear: THREE.LinearToneMapping,
            Reinhard: THREE.ReinhardToneMapping,
            Cineon: THREE.CineonToneMapping,
            ACESFilmic: THREE.ACESFilmicToneMapping,
            Custom: THREE.CustomToneMapping
        };

        init().catch( function ( err ) {

            console.error( err );

        } );

        async function init() {

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            renderer.toneMapping = toneMappingOptions[ params.toneMapping ];
            renderer.toneMappingExposure = params.exposure;

            renderer.outputEncoding = THREE.sRGBEncoding;

            // Set CustomToneMapping to Uncharted2
            // source: http://filmicworlds.com/blog/filmic-tonemapping-operators/

            THREE.ShaderChunk.tonemapping_pars_fragment = THREE.ShaderChunk.tonemapping_pars_fragment.replace(
                'vec3 CustomToneMapping( vec3 color ) { return color; }',
                `#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )
                float toneMappingWhitePoint = 1.0;
                vec3 CustomToneMapping( vec3 color ) {
                    color *= toneMappingExposure;
                    return saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );
                }`
            );

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
            camera.position.set( - 1.8, 0.6, 2.7 );

            controls = new OrbitControls( camera, renderer.domElement );
            controls.addEventListener( 'change', render ); // use if there is no animation loop
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.target.set( 0, 0, - 0.2 );
            controls.update();

            const rgbeLoader = new RGBELoader()
                .setPath( 'textures/equirectangular/' );

            const gltfLoader = new GLTFLoader().setPath( 'models/gltf/DamagedHelmet/glTF/' );

            const [ texture, gltf ] = await Promise.all( [
                rgbeLoader.loadAsync( 'venice_sunset_1k.hdr' ),
                gltfLoader.loadAsync( 'DamagedHelmet.gltf' ),
            ] );

            // environment

            texture.mapping = THREE.EquirectangularReflectionMapping;

            scene.background = texture;
            scene.environment = texture;

            // model

            mesh = gltf.scene.getObjectByName( 'node_damagedHelmet_-6514' );
            scene.add( mesh );

            render();

            window.addEventListener( 'resize', onWindowResize );

            gui = new GUI();

            gui.add( params, 'toneMapping', Object.keys( toneMappingOptions ) )

                .onChange( function () {

                    updateGUI();

                    renderer.toneMapping = toneMappingOptions[ params.toneMapping ];
                    render();

                } );

            updateGUI();

            gui.open();

        }

        function updateGUI() {

            if ( guiExposure !== null ) {

                guiExposure.destroy();
                guiExposure = null;

            }

            if ( params.toneMapping !== 'None' ) {

                guiExposure = gui.add( params, 'exposure', 0, 2 )

                    .onChange( function () {

                        renderer.toneMappingExposure = params.exposure;
                        render();

                    } );

            }

        }

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