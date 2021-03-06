// Generated by CoffeeScript 1.12.7
(function() {
  var Object_ImageMapHotspot,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Object_ImageMapHotspot = (function(superClass) {
    extend(Object_ImageMapHotspot, superClass);

    Object_ImageMapHotspot.objectCodecBlackList = ["parent"];

    Object_ImageMapHotspot.fromDataBundle = function(data, context) {
      return data;
    };

    Object_ImageMapHotspot.toDataBundle = function(object, context) {
      return {
        enabled: object.enabled,
        selected: object.selected
      };
    };


    /**
    * A game object used for pictures in a scene.
    *
    * @module gs
    * @class Object_Picture
    * @extends gs.Object_Visual
    * @memberof gs
    * @constructor
     */

    function Object_ImageMapHotspot() {
      Object_ImageMapHotspot.__super__.constructor.call(this);
    }

    return Object_ImageMapHotspot;

  })(gs.Object_Picture);

  gs.Object_ImageMapHotspot = Object_ImageMapHotspot;

}).call(this);
