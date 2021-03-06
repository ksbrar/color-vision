// Copyright 2014-2017, University of Colorado Boulder

/**
 * View for the 'RGB' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );
  var ColorVisionScreenView = require( 'COLOR_VISION/common/view/ColorVisionScreenView' );
  var HeadNode = require( 'COLOR_VISION/common/view/HeadNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RGBConstants = require( 'COLOR_VISION/rgb/RGBConstants' );
  var RGBPhotonBeamNode = require( 'COLOR_VISION/rgb/view/RGBPhotonBeamNode' );
  var RGBSlider = require( 'COLOR_VISION/rgb/view/RGBSlider' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // images
  var flashlightDownImage = require( 'image!COLOR_VISION/flashlight-neg-45-deg.png' );
  var flashlightImage = require( 'image!COLOR_VISION/flashlight-0-deg.png' );
  var flashlightUpImage = require( 'image!COLOR_VISION/flashlight-pos-45-deg.png' );

  // constants
  var BEAM_ANGLE = Math.PI / 6;
  var FLASHLIGHT_SCALE = 0.73;

  /**
   * @param {RGBModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function RGBScreenView( model, tandem ) {

    ColorVisionScreenView.call( this, model, tandem );

    // Add photon beams
    // @private
    this.redBeam = new RGBPhotonBeamNode( model.redBeam, tandem.createTandem( 'redBeam' ), {
      canvasBounds: new Bounds2( 0, 0, RGBConstants.RED_BEAM_LENGTH, ColorVisionConstants.BEAM_HEIGHT ),
      x: 280,
      y: 190,
      rotation: -BEAM_ANGLE
    } );

    // @private
    this.greenBeam = new RGBPhotonBeamNode( model.greenBeam, tandem.createTandem( 'greenBeam' ), {
      canvasBounds: new Bounds2( 0, 0, RGBConstants.GREEN_BEAM_LENGTH, ColorVisionConstants.BEAM_HEIGHT ),
      x: 320
    } );
    this.greenBeam.centerY = this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET;

    // @private
    this.blueBeam = new RGBPhotonBeamNode( model.blueBeam, tandem.createTandem( 'blueBeam' ), {
      canvasBounds: new Bounds2( 0, 0, RGBConstants.BLUE_BEAM_LENGTH, ColorVisionConstants.BEAM_HEIGHT ),
      x: 320,
      y: 145,
      rotation: BEAM_ANGLE
    } );

    // add head node
    var beamArray = [ this.redBeam, this.blueBeam, this.greenBeam ];
    var headNode = new HeadNode( model.headModeProperty, this.layoutBounds.bottom, beamArray, tandem.createTandem( 'headNode' ) );
    this.addChild( headNode );

    // Add flashlights
    var redFlashlightNode = new Image( flashlightDownImage, { scale: FLASHLIGHT_SCALE } );
    var greenFlashlightNode = new Image( flashlightImage, { scale: FLASHLIGHT_SCALE } );
    var blueFlashlightNode = new Image( flashlightUpImage, { scale: FLASHLIGHT_SCALE } );

    var flashlightVBox = new VBox( {
      children: [
        redFlashlightNode,
        greenFlashlightNode,
        blueFlashlightNode ],
      spacing: 85,
      right: this.layoutBounds.maxX - 84,
      centerY: this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET
    } );

    this.addChild( flashlightVBox );

    // Add sliders
    var redSlider = new RGBSlider( model.redIntensityProperty, 'red', tandem.createTandem( 'redSlider' ) );
    var greenSlider = new RGBSlider( model.greenIntensityProperty, 'green', tandem.createTandem( 'greenSlider' ) );
    var blueSlider = new RGBSlider( model.blueIntensityProperty, 'blue', tandem.createTandem( 'blueSlider' ) );

    var sliderVBox = new VBox( {
      children: [
        redSlider,
        greenSlider,
        blueSlider ],
      spacing: 15,
      right: this.layoutBounds.maxX - 30,
      centerY: flashlightVBox.centerY
    } );

    this.addChild( sliderVBox );
  }

  colorVision.register( 'RGBScreenView', RGBScreenView );

  return inherit( ColorVisionScreenView, RGBScreenView, {
    step: function( dt ) {
      dt = Math.min( dt, 0.5 ); // Cap DT, see https://github.com/phetsims/color-vision/issues/115 and https://github.com/phetsims/joist/issues/130
      this.redBeam.step( dt );
      this.greenBeam.step( dt );
      this.blueBeam.step( dt );
    }
  } );
} );
