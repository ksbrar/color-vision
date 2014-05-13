// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the first ColorVision screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
 define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );
  var ColorVisionSlider = require( 'COLOR_VISION/view/ColorVisionSlider' );
  var ColorVisionEllipse = require( 'COLOR_VISION/view/ColorVisionEllipse' );

  // images
  var mockupImage = require( 'image!COLOR_VISION/mockup1.png' );
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );

  function ColorVisionScreenView( model ) {

    ScreenView.call( this );

    this.addChild( new Image( mockupImage,
      {
        centerX: this.layoutBounds.centerX,
        centerY: this.layoutBounds.centerY,
        scale: this.layoutBounds.height / mockupImage.height,
        opacity: 0.5
      } ) );


    // Add flashlights
    var flashlightScale = new Vector2( 0.36, 0.2 );

    var redFlashlight = new Image( flashlight,
      {
        scale: flashlightScale,
        rotation: -Math.PI / 6
      } );

    var greenFlashlight = new Image( flashlight,
      {
        scale: flashlightScale,
      } );

    var blueFlashlight = new Image( flashlight,
      {
        scale: flashlightScale,
        rotation: Math.PI / 6
      } );

    var flashlightVBox = new VBox(
      {
        children: [
          redFlashlight,
          greenFlashlight,
          blueFlashlight ],
        spacing: 75,
        right: this.layoutBounds.maxX - 100,
        centerY: this.layoutBounds.centerY
      } );

    this.addChild( flashlightVBox );

    // Add sliders
    var redSlider = new ColorVisionSlider( model.redIntensityProperty, 'red' );
    var greenSlider = new ColorVisionSlider( model.greenIntensityProperty, 'green' );
    var blueSlider = new ColorVisionSlider( model.blueIntensityProperty, 'blue' );

    var sliderVBox = new VBox(
      {
        children: [
          redSlider,
          greenSlider,
          blueSlider ],
        spacing: 22,
        right: this.layoutBounds.maxX - 30,
        centerY: this.layoutBounds.centerY
      } );

    this.addChild( sliderVBox );

    // Add thought bubbles
    this.addChild( new ColorVisionEllipse( model, 225, 55, 53 ) );
    this.addChild( new ColorVisionEllipse( model, 90, 105, 15 ) );
    this.addChild( new ColorVisionEllipse( model, 62, 165, 12 ) );
    this.addChild( new ColorVisionEllipse( model, 50, 220, 7 ) );

  }

  return inherit( ScreenView, ColorVisionScreenView );
} );
