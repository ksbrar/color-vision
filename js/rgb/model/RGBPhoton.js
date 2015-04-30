// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model of a photon for RGB screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   * @param {Number} intensity between 0-255 for rgb intensity
   # @constructor
   */
  function RGBPhoton( location, velocity, intensity ) {
    this.location = location;
    this.velocity = velocity;
    this.intensity = intensity;
  }

  return inherit( Object, RGBPhoton, {
    updateAnimationFrame: function( newX, newY ) {
      this.location.x = newX;
      this.location.y = newY;
    },

    toJSON: function() {
      return {
        location: this.location.toJSON(),
        velocity: this.velocity.toJSON(),
        intensity: this.intensity
      };
    }

  } );
} );
