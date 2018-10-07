// Generated by CoffeeScript 1.12.7
(function() {
  ui.UiFactory.customTypes["ui.SettingsStepSlider"] = {
    "type": "ui.StackLayout",
    "sizeToFit": true,
    "orientation": "vertical",
    "margin": [10, 10, 0, 0],
    "controls": [
      {
        "type": "ui.Text",
        "text": function() {
          return p.label;
        },
        "styles": ["regularUIText"],
        "frame": [0, 0, 350, gs.UIConstants.OPTION_BUTTON_H - 30],
        "margin": [0, 0, 0, 0]
      }, {
        "type": "ui.StepSlider",
        "frame": [40, 0, gs.UIConstants.LAYOUT_SETTINGS_WINDOW_W - 150, gs.UIConstants.OPTION_BUTTON_H + 30],
        "params": {
          "actions": [],
          "write": (function() {
            return p.write;
          }),
          "read": (function() {
            return p.read;
          }),
          "steps": (function() {
            var ref;
            return (ref = p.steps) != null ? ref : 5;
          }),
          "data": function() {
            return p.data;
          }
        }
      }
    ]
  };

}).call(this);