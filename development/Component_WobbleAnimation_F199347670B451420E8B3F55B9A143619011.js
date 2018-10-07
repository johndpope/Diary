// Generated by CoffeeScript 1.12.7
(function() {
  var Component_WobbleAnimation,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Component_WobbleAnimation = (function(superClass) {
    extend(Component_WobbleAnimation, superClass);


    /**
    * Executes a blur-animation on a game-object.
    *
    * @module gs
    * @class Component_WobbleAnimation
    * @extends gs.Component_Animation
    * @memberof gs
    * @constructor
     */

    function Component_WobbleAnimation(data) {
      Component_WobbleAnimation.__super__.constructor.apply(this, arguments);

      /**
      * The easing-object used for the animation.
      * @property easing
      * @type gs.Easing
       */
      this.powerEasing = new gs.Easing(null, data != null ? data.powerEasing : void 0);
      this.speedEasing = new gs.Easing(null, data != null ? data.speedEasing : void 0);
    }


    /**
    * Updates the blend-animation.
    *
    * @method update
     */

    Component_WobbleAnimation.prototype.update = function() {
      Component_WobbleAnimation.__super__.update.apply(this, arguments);
      if (!this.powerEasing.isRunning && !this.speedEasing.isRunning) {
        return;
      }
      this.powerEasing.updateValue();
      this.speedEasing.updateValue();
      this.object.effects.wobble.power = this.powerEasing.value;
      this.object.effects.wobble.speed = this.speedEasing.value;
      if (!this.powerEasing.isRunning && !this.speedEasing.isRunning) {
        return typeof this.callback === "function" ? this.callback(this.object, this) : void 0;
      }
    };


    /**
    * Starts the blend-animation.
    *
    * @method start
    * @param {number} power The target power.
    * @param {number} duration The duration in frames.
    * @param {Object} easingType The easing-type.
    * @param {function} [callback] An optional callback called if the animation is finished.
     */

    Component_WobbleAnimation.prototype.start = function(power, speed, duration, easingType, callback) {
      this.callback = callback;
      this.powerEasing.type = easingType || gs.Easings.EASE_LINEAR[gs.EasingTypes.EASE_IN];
      this.speedEasing.type = easingType || gs.Easings.EASE_LINEAR[gs.EasingTypes.EASE_IN];
      if (this.object.effects.wobble.power === power || this.object.effects.wobble.speed === speed) {
        return typeof this.callback === "function" ? this.callback(this.object, this) : void 0;
      }
      if (duration === 0 || this.isInstantSkip()) {
        this.object.effects.wobble.power = power;
        this.object.effects.wobble.speed = speed;
        return typeof this.callback === "function" ? this.callback(this.object, this) : void 0;
      } else {
        this.powerEasing.startValue(this.object.effects.wobble.power, power - this.object.effects.wobble.power, duration);
        return this.speedEasing.startValue(this.object.effects.wobble.speed, speed - this.object.effects.wobble.speed, duration);
      }
    };

    return Component_WobbleAnimation;

  })(gs.Component_Animation);

  gs.Component_WobbleAnimation = Component_WobbleAnimation;

}).call(this);