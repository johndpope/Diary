// Generated by CoffeeScript 1.12.7
(function() {
  var Component_BlendAnimation,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Component_BlendAnimation = (function(superClass) {
    extend(Component_BlendAnimation, superClass);


    /**
    * Executes a blend-animation on a game-object.
    *
    * @module gs
    * @class Component_BlendAnimation
    * @extends gs.Component_Animation
    * @memberof gs
    * @constructor
     */

    function Component_BlendAnimation(data) {
      Component_BlendAnimation.__super__.constructor.apply(this, arguments);

      /**
      * The easing-object used for the animation.
      * @property easing
      * @type gs.Easing
       */
      this.easing = new gs.Easing(null, data != null ? data.easing : void 0);
    }


    /**
    * Serializes the blend-animation into a data-bundle.
    *
    * @method toDataBundle
     */

    Component_BlendAnimation.prototype.toDataBundle = function() {
      return {
        easing: this.easing
      };
    };


    /**
    * Updates the blend-animation.
    *
    * @method update
     */

    Component_BlendAnimation.prototype.update = function() {
      Component_BlendAnimation.__super__.update.apply(this, arguments);
      if (!this.easing.isRunning) {
        return;
      }
      this.easing.updateValue();
      this.object.opacity = this.easing.value;
      if (!this.easing.isRunning) {
        this.object.opacity = Math.round(this.object.opacity);
        return typeof this.callback === "function" ? this.callback(this.object, this) : void 0;
      }
    };


    /**
    * Stops the blend-animation.
    *
    * @method stop
     */

    Component_BlendAnimation.prototype.stop = function() {
      if (this.easing.isRunning) {
        this.easing.isRunning = false;
        return typeof this.callback === "function" ? this.callback(this.object, this) : void 0;
      }
    };


    /**
    * Starts the blend-animation.
    *
    * @method start
    * @param {number} opacity The target opacity.
    * @param {number} duration The duration in frames.
    * @param {Object} easingType The easing-type.
    * @param {function} [callback] An optional callback called if blending is finished.
     */

    Component_BlendAnimation.prototype.start = function(opacity, duration, easingType, callback) {
      if (this.easing.isRunning) {
        if (typeof this.callback === "function") {
          this.callback(this.object, this);
        }
      }
      this.callback = callback;
      this.easing.type = easingType || gs.Easings.EASE_LINEAR[gs.EasingTypes.EASE_IN];
      if (this.object.opacity === opacity) {
        return typeof this.callback === "function" ? this.callback(this.object, this) : void 0;
      }
      if (duration === 0 || this.isInstantSkip()) {
        this.object.opacity = opacity;
        return typeof this.callback === "function" ? this.callback(this.object, this) : void 0;
      } else {
        return this.easing.startValue(this.object.opacity, opacity - this.object.opacity, duration);
      }
    };

    return Component_BlendAnimation;

  })(gs.Component_Animation);

  gs.Component_BlendAnimation = Component_BlendAnimation;

}).call(this);
