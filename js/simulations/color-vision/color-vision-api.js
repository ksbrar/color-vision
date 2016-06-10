// Copyright 2015-2016, University of Colorado Boulder

/**
 * This is the public API for the color-vision sim.  It can be used in concert with phetio.js and phetioEvents.js for API
 * simulation features.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
// Permit uppercase function names, such as TProperty(string)
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var assertInstanceOfTypes = require( 'PHET_IO/assertions/assertInstanceOfTypes' );
  var phetio = require( 'PHET_IO/phetio' );
  var PhETIOCommon = require( 'PHET_IO/api/PhETIOCommon' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var Tandem = require( 'TANDEM/Tandem' );
  var TArray = require( 'PHET_IO/api/TArray' );
  var TBoolean = require( 'PHET_IO/api/TBoolean' );
  var TButton = require( 'PHET_IO/api/sun/buttons/TButton' );
  var TColor = require( 'PHET_IO/api/scenery/util/TColor' );
  var TDerivedProperty = require( 'PHET_IO/api/axon/TDerivedProperty' );
  var THSlider = require( 'PHET_IO/api/sun/THSlider' );
  var TNumber = require( 'PHET_IO/api/TNumber' );
  var TObject = require( 'PHET_IO/api/TObject' );
  var TOnOffSwitch = require( 'PHET_IO/api/sun/TOnOffSwitch' );
  var TProperty = require( 'PHET_IO/api/axon/TProperty' );
  var TRadioButton = require( 'PHET_IO/api/sun/buttons/TRadioButton' );
  var TResetAllButton = require( 'PHET_IO/api/sun/buttons/TResetAllButton' );
  var TString = require( 'PHET_IO/api/TString' );
  var TTandemText = require( 'PHET_IO/api/tandem/scenery/nodes/TTandemText' );
  var TToggleButton = require( 'PHET_IO/api/sun/buttons/TToggleButton' );
  var TWavelengthSlider = require( 'PHET_IO/api/scenery-phet/TWavelengthSlider' );

  var TSingleBulbPhoton = phetioInherit( TObject, 'TSingleBulbPhoton', function( instance, phetioID ) {
    assertInstanceOf( instance, phet.colorVision.SingleBulbPhoton );
    TObject.call( this, instance, phetioID );
  }, {}, {
    fromStateObject: function( stateObject ) {
      return window.phet.colorVision.SingleBulbPhoton.fromStateObject( stateObject );
    },
    toStateObject: function( value ) {
      return value.toStateObject();
    },
    setValue: function() {}
  } );

  var TRGBPhoton = phetioInherit( TObject, 'TRGBPhoton', function( instance, phetioID ) {
    assertInstanceOf( instance, phet.colorVision.RGBPhoton );
    TObject.call( this, instance, phetioID );
  }, {}, {
    fromStateObject: function( stateObject ) {
      return window.phet.colorVision.RGBPhoton.fromStateObject( stateObject );
    },
    toStateObject: function( value ) {
      return value.toStateObject();
    },
    setValue: function() {}
  } );

  var TPhotonView = phetioInherit( TObject, 'TPhotonView', function( instance, phetioID ) {
    assertInstanceOfTypes( instance, [
      phet.colorVision.SingleBulbPhotonBeamNode,
      phet.colorVision.RGBPhotonBeamNode
    ] );
    TObject.call( this, instance, phetioID );
  }, {
    setValue: {
      implementation: function() {
        this.instance.invalidatePaint();
      }
    }
  }, {
    fromStateObject: function( stateObject ) {
      return {
        // not needed, at least not yet
      };
    },
    toStateObject: function( value ) {
      return {
        // not needed, at least not yet
      };
    }
  } );

  var colorVisionAPI = PhETIOCommon.createAPI( {
    colorVision: PhETIOCommon.createSim( {
      singleBulbScreen: {
        model: {
          lightTypeProperty: TProperty( TString ),
          beamTypeProperty: TProperty( TString ),

          playingProperty: TProperty( TBoolean ),
          headModeProperty: TProperty( TString ),
          photonBeam: {
            photons: TArray( TSingleBulbPhoton )
          },
          flashlight: {
            flashlightWavelengthProperty: TProperty( TNumber, { units: 'nanometers' } ),

            flashlightOnProperty: TProperty( TBoolean )
          },
          filter: {
            filterWavelengthProperty: TProperty( TNumber, { units: 'nanometers' } ),
            filterVisibleProperty: TProperty( TBoolean )
          }
        },
        view: {
          bulbColorSlider: TWavelengthSlider,
          bulbColorText: TTandemText,
          whiteLightRadioButton: TRadioButton( TString ),
          coloredLightRadioButton: TRadioButton( TString ),
          beamRadioButton: TRadioButton( TString ),
          photonRadioButton: TRadioButton( TString ),
          headNode: {
            hideBrainRadioButton: TRadioButton( TString ),
            showBrainRadioButton: TRadioButton( TString )
          },

          resetAllButton: TResetAllButton,
          playPauseButton: TToggleButton( TBoolean ),
          stepButton: TButton,
          gaussianSlider: TWavelengthSlider,
          filterWireNode: {
            onOffSwitch: TOnOffSwitch
          },
          flashlightNode: {
            button: TToggleButton( TBoolean )
          },
          photonBeamNode: TPhotonView
        }
      },
      rgbBulbsScreen: {
        model: {
          redIntensityProperty: TProperty( TNumber ),
          greenIntensityProperty: TProperty( TNumber ),
          blueIntensityProperty: TProperty( TNumber ),
          perceivedRedIntensityProperty: TProperty( TNumber ),
          perceivedGreenIntensityProperty: TProperty( TNumber ),
          perceivedBlueIntensityProperty: TProperty( TNumber ),
          playingProperty: TProperty( TBoolean ),
          headModeProperty: TProperty( TString ),
          perceivedColor: TDerivedProperty( TColor ),
          redBeam: {
            photons: TArray( TRGBPhoton )
          },
          greenBeam: {
            photons: TArray( TRGBPhoton )
          },
          blueBeam: {
            photons: TArray( TRGBPhoton )
          }
        },
        view: {
          resetAllButton: TResetAllButton,
          playPauseButton: TToggleButton( TBoolean ),
          stepButton: TButton,
          headNode: {
            showBrainRadioButton: TRadioButton( TString ),
            hideBrainRadioButton: TRadioButton( TString )
          },
          redSlider: THSlider,
          greenSlider: THSlider,
          blueSlider: THSlider,
          redBeam: TPhotonView,
          greenBeam: TPhotonView,
          blueBeam: TPhotonView
        }
      }
    } )
  } );

  phetioNamespace.register( 'color-vision-api', colorVisionAPI );

  // Set the phetio.api after it was declared
  phetio.api = colorVisionAPI;

  window.api = colorVisionAPI;

  // Register phetio as a tandem instance after API assigned
  new Tandem( 'phetio' ).addInstance( phetio );

  return colorVisionAPI;
} );

