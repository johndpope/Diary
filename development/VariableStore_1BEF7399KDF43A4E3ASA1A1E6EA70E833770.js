// Generated by CoffeeScript 1.12.7
(function() {
  var VariableStore;

  VariableStore = (function() {
    VariableStore.objectCodecBlackList = ["persistentNumbers", "persistentStrings", "persistentBooleans", "persistentLists"];


    /**
    * <p>A storage for different kind of game variables. The following scopes
    * for variables exist:</p>
    *
    * - Local Variables -> Only valid for the current scene.
    * - Global Variables -> Valid for the whole game but bound to a single save-game.
    * - Persistent Variables -> Valid for the whole game indepentent from the save-games.
    *
    * <p>The following data-types exist:</p>
    * - Strings -> Variables storing text data.
    * - Numbers -> Variables storing integer number values.
    * - Booleans -> Variables storing boolean values. (Called "Switches" for easier understanding)
    * - Lists -> Variables storing multiple other variables. Lists can also contain Lists.
    * <p>
    * Local variables are stored by scene UID. For each scene UID a list of local variables is stored.</p>
    *
    * <p>Global and persistent variables are stored and a specific domain. A domain is just a unique name such
    * as <i>com.example.game</i> for example. The default domain is an empty string. Domains are useful to avoid
    * overlapping of variable numbers when sharing content with other users. </p>
    *
    * @module gs
    * @class VariableStore
    * @memberof gs
    * @constructor
     */

    function VariableStore() {

      /**
      * Current local variable context
      * @property context
      * @type Object
       */
      this.context = null;

      /**
      * Current domain for global and persistent variables. Each domain has its own
      * variables. Please use <b>changeDomain</b> method to change the domain.
      * @property domain
      * @type Object
      * @readOnly
       */
      this.domain = "";

      /**
      * List of available domains for global and persistent variables.
      * @property domains
      * @type string[]
       */
      this.domains = [""];

      /**
      * The global number variables of the current domain.
      * @property numbers
      * @type number[]
       */
      this.numbers = null;

      /**
      * The global boolean variables of the current domain.
      * @property booleans
      * @type boolean[]
       */
      this.booleans = null;

      /**
      * The global string variables of the current domain.
      * @property strings
      * @type string[]
       */
      this.strings = null;

      /**
      * The global list variables of the current domain.
      * @property lists
      * @type Object[][]
       */
      this.lists = null;

      /**
      * The storage of all global variables by domain.
      * @property globalVariablesByDomain
      * @type Object[][]
       */
      this.globalVariablesByDomain = {};

      /**
      * The storage of all persistent variables by domain.
      * @property persistentVariablesByDomain
      * @type Object[][]
       */
      this.persistentVariablesByDomain = {};

      /**
      * The persistent number variables of the current domain.
      * @property persistentNumbers
      * @type number[]
       */
      this.persistentNumbers = [];

      /**
      * The persistent string variables of the current domain.
      * @property persistentStrings
      * @type string[]
       */
      this.persistentStrings = [];

      /**
      * The persistent boolean variables of the current domain.
      * @property persistentBooleans
      * @type boolean[]
       */
      this.persistentBooleans = [];

      /**
      * The persistent list variables of the current domain.
      * @property persistentLists
      * @type Object[][]
       */
      this.persistentLists = [];

      /**
      * The local number variables.
      * @property localNumbers
      * @type Object
       */
      this.localNumbers = {};

      /**
      * The local string variables.
      * @property localStrings
      * @type Object
       */
      this.localStrings = {};

      /**
      * The local boolean variables.
      * @property localBooleans
      * @type Object
       */
      this.localBooleans = {};

      /**
      * The local list variables.
      * @property localLists
      * @type Object
       */
      this.localLists = {};

      /**
      * @property tempNumbers
      * @type number[]
       */
      this.tempNumbers = null;

      /**
      * @property tempStrings
      * @type string[]
       */
      this.tempStrings = null;

      /**
      * @property localBooleans
      * @type number[]
       */
      this.tempBooleans = null;

      /**
      * @property localLists
      * @type Object[][]
       */
      this.tempLists = null;
    }


    /**
    * Called if this object instance is restored from a data-bundle. It can be used
    * re-assign event-handler, anonymous functions, etc.
    *
    * @method onDataBundleRestore.
    * @param Object data - The data-bundle
    * @param gs.ObjectCodecContext context - The codec-context.
     */

    VariableStore.prototype.onDataBundleRestore = function(data, context) {
      var domain, domains, i, j, len;
      domains = DataManager.getDocumentsByType("global_variables").select(function(d) {
        return d.items.domain;
      });
      for (i = j = 0, len = domains.length; j < len; i = ++j) {
        domain = domains[i];
        this.numbersByDomain[domain] = this.numbersByDomain[i];
        this.stringsByDomain[domain] = this.stringsByDomain[i];
        this.booleansByDomain[domain] = this.booleansByDomain[i];
        this.listsByDomain[domain] = this.listsByDomain[i];
      }
      return null;
    };

    VariableStore.prototype.setupGlobalDomains = function() {
      var domain, i, j, len, ref;
      this.numbersByDomain = [];
      this.stringsByDomain = [];
      this.booleansByDomain = [];
      this.listsByDomain = [];
      ref = this.domains;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        domain = ref[i];
        this.numbersByDomain[i] = new Array(1000);
        this.numbersByDomain[domain] = this.numbersByDomain[i];
        this.stringsByDomain[i] = new Array(1000);
        this.stringsByDomain[domain] = this.stringsByDomain[i];
        this.booleansByDomain[i] = new Array(1000);
        this.booleansByDomain[domain] = this.booleansByDomain[i];
        this.listsByDomain[i] = new Array(1000);
        this.listsByDomain[domain] = this.listsByDomain[i];
      }
      this.numbers = this.numbersByDomain[0];
      this.strings = this.stringsByDomain[0];
      this.booleans = this.booleansByDomain[0];
      return this.lists = this.numbersByDomain[0];
    };

    VariableStore.prototype.setupPersistentDomains = function(domains) {
      var domain, i, j, len, ref;
      this.persistentNumbersByDomain = {};
      this.persistentStringsByDomain = {};
      this.persistentBooleansByDomain = {};
      this.persistentListsByDomain = {};
      ref = this.domains;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        domain = ref[i];
        this.persistentNumbersByDomain[i] = new Array(10);
        this.persistentNumbersByDomain[domain] = this.persistentNumbers[i];
        this.persistentStringsByDomain[i] = new Array(10);
        this.persistentStringsByDomain[domain] = this.persistentStrings[i];
        this.persistentBooleansByDomain[i] = new Array(10);
        this.persistentBooleansByDomain[domain] = this.persistentBooleans[i];
        this.persistentListsByDomain[i] = new Array(10);
        this.persistentListsByDomain[domain] = this.persistentLists[i];
      }
      this.persistentNumbers = this.persistentNumbersByDomain[0];
      this.persistentStrings = this.persistentStringsByDomain[0];
      this.persistentBooleans = this.persistentBooleansByDomain[0];
      return this.persistentLists = this.persistentListsByDomain[0];
    };

    VariableStore.prototype.setupDomains = function(domains) {
      this.domains = domains;
      this.setupGlobalDomains();
      return this.setupPersistentDomains();
    };


    /**
    * Restores the variable store from a serialized store.
     */

    VariableStore.prototype.restore = function(store) {
      var ignore, k, results;
      ignore = ["domains"];
      results = [];
      for (k in store) {
        if (!k.startsWith("persistent") && ignore.indexOf(k) === -1) {
          results.push(this[k] = store[k]);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };


    /**
    * Changes the current domain.
    *
    * @deprecated
    * @method changeDomain
    * @param {string} domain - The domain to change to.
     */

    VariableStore.prototype.changeDomain = function(domain) {
      var globalVariables, persistentVariables;
      this.domain = domain;
      globalVariables = this.globalVariablesByDomain[domain];
      persistentVariables = this.persistentVariablesByDomain[domain];
      if (!globalVariables) {
        globalVariables = this.globalVariablesByDomain[domain] = {
          numbers: new Array(500),
          strings: new Array(500),
          booleans: new Array(500),
          lists: new Array(500)
        };
      }
      if (!persistentVariables) {
        persistentVariables = this.persistentVariablesByDomain[domain] = {
          numbers: new Array(500),
          strings: new Array(500),
          booleans: new Array(500),
          lists: new Array(500)
        };
      }
      this.numbers = globalVariables.numbers;
      this.strings = globalVariables.strings;
      this.booleans = globalVariables.booleans;
      this.lists = globalVariables.lists;
      this.persistentNumbers = persistentVariables.numbers;
      this.persistentBooleans = persistentVariables.booleans;
      this.persistentStrings = persistentVariables.strings;
      return this.persistentLists = persistentVariables.lists;
    };


    /**
    * Clears all global variables
    *
    * @method clearGlobalVariables
     */

    VariableStore.prototype.clearAllGlobalVariables = function() {
      var globalVariables;
      this.setupGlobalDomains();
      return;
      globalVariables = this.globalVariablesByDomain[this.domain];
      this.numbersByDomain = new Array(1000);
      globalVariables.booleans = new Array(1000);
      globalVariables.strings = new Array(1000);
      this.numbers = globalVariables.numbers;
      this.strings = globalVariables.strings;
      return this.booleans = globalVariables.booleans;
    };


    /**
    * Clears all local variables for all contexts/scenes/common-events.
    *
    * @method clearAllLocalVariables
     */

    VariableStore.prototype.clearAllLocalVariables = function() {
      this.localNumbers = {};
      this.localStrings = {};
      this.localBooleans = {};
      return this.localLists = {};
    };


    /**
    * Clears specified variables.
    *
    * @method clearVariables
    * @param {number[]} numbers - The number variables to clear.
    * @param {string[]} strings - The string variables to clear.
    * @param {boolean[]} booleans - The boolean variables to clear.
    * @param {Array[]} lists - The list variables to clear.
    * @param {number} type - Determines what kind of variables should be cleared.
    * <ul>
    * <li>0 = All</li>
    * <li>1 = Switches / Booleans</li>
    * <li>2 = Numbers</li>
    * <li>3 = Texts</li>
    * <li>4 = Lists</li>
    * </ul>
    * @param {Object} range - The variable id-range to clear. If <b>null</b> all specified variables are cleared.
     */

    VariableStore.prototype.clearVariables = function(numbers, strings, booleans, lists, type, range) {
      switch (type) {
        case 0:
          if (numbers != null) {
            numbers.fill(0, range.start, range.end);
          }
          if (strings != null) {
            strings.fill("", range.start, range.end);
          }
          if (booleans != null) {
            booleans.fill(false, range.start, range.end);
          }
          return lists != null ? lists.fill([], range.start, range.end) : void 0;
        case 1:
          return booleans != null ? booleans.fill(false, range.start, range.end) : void 0;
        case 2:
          return numbers != null ? numbers.fill(0, range.start, range.end) : void 0;
        case 3:
          return strings != null ? strings.fill("", range.start, range.end) : void 0;
        case 4:
          return lists != null ? lists.fill([], range.start, range.end) : void 0;
      }
    };


    /**
    * Clears all local variables for a specified context. If the context is not specified, all
    * local variables for all contexts/scenes/common-events are cleared.
    *
    * @method clearLocalVariables
    * @param {Object} context - The context to clear the local variables for. If <b>null</b>, all
    * @param {number} type - Determines what kind of variables should be cleared.
    * <ul>
    * <li>0 = All</li>
    * <li>1 = Switches / Booleans</li>
    * <li>2 = Numbers</li>
    * <li>3 = Texts</li>
    * <li>4 = Lists</li>
    * </ul>
    * @param {Object} range - The variable id-range to clear. If <b>null</b> all variables are cleared.
     */

    VariableStore.prototype.clearLocalVariables = function(context, type, range) {
      var id, ids, j, len, results;
      if (context != null) {
        ids = [context.id];
      } else {
        ids = Object.keys(this.localNumbers);
      }
      if (range != null) {
        range = {
          start: range.start,
          end: range.end + 1
        };
      } else {
        range = {
          start: 0,
          end: null
        };
      }
      results = [];
      for (j = 0, len = ids.length; j < len; j++) {
        id = ids[j];
        results.push(this.clearVariables(this.localNumbers[id], this.localStrings[id], this.localBooleans[id], this.localLists[id], type, range));
      }
      return results;
    };


    /**
    * Clears global variables.
    *
    * @method clearGlobalVariables
    * @param {number} type - Determines what kind of variables should be cleared.
    * <ul>
    * <li>0 = All</li>
    * <li>1 = Switches / Booleans</li>
    * <li>2 = Numbers</li>
    * <li>3 = Texts</li>
    * <li>4 = Lists</li>
    * </ul>
    * @param {Object} range - The variable id-range to clear. If <b>null</b> all variables are cleared.
     */

    VariableStore.prototype.clearGlobalVariables = function(type, range) {
      if (range != null) {
        range = {
          start: range.start,
          end: range.end + 1
        };
      } else {
        range = {
          start: 0,
          end: null
        };
      }
      return this.clearVariables(this.numbers, this.strings, this.booleans, this.lists, type, range);
    };


    /**
    * Clears persistent variables.
    *
    * @method clearPersistentVariables
    * @param {number} type - Determines what kind of variables should be cleared.
    * <ul>
    * <li>0 = All</li>
    * <li>1 = Switches / Booleans</li>
    * <li>2 = Numbers</li>
    * <li>3 = Texts</li>
    * <li>4 = Lists</li>
    * </ul>
    * @param {Object} range - The variable id-range to clear. If <b>null</b> all variables are cleared.
     */

    VariableStore.prototype.clearPersistentVariables = function(type, range) {
      if (range != null) {
        range = {
          start: range.start,
          end: range.end + 1
        };
      } else {
        range = {
          start: 0,
          end: null
        };
      }
      return this.clearVariables(this.persistentNumbers, this.persistentstrings, this.persistentBooleans, this.persistentLists, type, range);
    };


    /**
    * Initializes the variables. Should be called whenever the context changes. (Like after a scene change)
    *
    * @method setup
    * @param {Object} context - The context(current scene) needed for local variables. Needs have at least an id-property.
     */

    VariableStore.prototype.setup = function(context) {
      this.setupLocalVariables(context);
      return this.setupTempVariables(context);
    };


    /**
    * Initializes the local variables for the specified context. Should be called on first time use.
    *
    * @method setupLocalVariables
    * @param {Object} context - The context(current scene). Needs have at least an id-property.
     */

    VariableStore.prototype.setupLocalVariables = function(context) {
      this.setupVariables(context, "localNumbers", 0);
      this.setupVariables(context, "localStrings", "");
      this.setupVariables(context, "localBooleans", false);
      return this.setupVariables(context, "localLists", []);
    };


    /**
    * Initializes the specified kind of variables.
    *
    * @method setupVariables
    * @param {Object} context - The context(current scene). Needs have at least an id-property.
    * @param {string} property - The kind of variables (property-name).
    * @param {Object} defaultValue - The default value for each variable.
     */

    VariableStore.prototype.setupVariables = function(context, property, defaultValue) {
      if (this[property][context.id] == null) {
        return this[property][context.id] = [];
      }
    };


    /**
    * Initializes the current temp variables for the specified context. Should be called whenever the context changed.
    *
    * @method setupTempVariables
    * @param {Object} context - The context(current scene). Needs have at least an id-property.
     */

    VariableStore.prototype.setupTempVariables = function(context) {
      this.context = context;
      if (!this.localNumbers[context.id]) {
        this.setupLocalVariables(context);
      }
      this.tempNumbers = this.localNumbers[context.id];
      this.tempStrings = this.localStrings[context.id];
      this.tempBooleans = this.localBooleans[context.id];
      return this.tempLists = this.localLists[context.id];
    };

    VariableStore.prototype.clearTempVariables = function(context) {};


    /**
    * Gets the index for the variable with the specified name. If a variable with that
    * name cannot be found, the index will be 0.
    *
    * @method indexOfTempVariable
    * @param {string} name - The name of the variable to get the index for.
    * @param {string} type - The type name: number, string, boolean or list.
    * @param {number} scope - The variable scope: 0 = local, 1 = global, 2 = persistent.
    * @param {string} domain - The variable domain to search in. If not specified, the default domain will be used.
     */

    VariableStore.prototype.indexOfVariable = function(name, type, scope, domain) {
      var result;
      result = 0;
      switch (scope) {
        case 0:
          result = this.indexOfTempVariable(name, type);
          break;
        case 1:
          result = this.indexOfGlobalVariable(name, type, domain);
          break;
        case 2:
          result = this.indexOfPersistentVariable(name, type, domain);
      }
      return result;
    };


    /**
    * Gets the index for the local variable with the specified name. If a variable with that
    * name cannot be found, the index will be 0.
    *
    * @method indexOfTempVariable
    * @param {string} name - The name of the variable to get the index for.
    * @param {string} type - The type name: number, string, boolean or list.
     */

    VariableStore.prototype.indexOfTempVariable = function(name, type) {
      var ref, result, variable;
      result = 0;
      if ((ref = this.context) != null ? ref.owner : void 0) {
        if (this.context.owner.sceneDocument) {
          variable = this.context.owner.sceneDocument.items[type + "Variables"].first(function(v) {
            return v.name === name;
          });
          if (variable != null) {
            result = variable.index;
          }
        } else if (this.context.owner[type + "Variables"]) {
          variable = this.context.owner[type + "Variables"].first(function(v) {
            return v.name === name;
          });
          if (variable != null) {
            result = variable.index;
          } else {
            console.warn("Variable referenced by name not found: " + name(+"(local, " + type + ")"));
          }
        }
      }
      return result;
    };


    /**
    * Gets the index for the global variable with the specified name. If a variable with that
    * name cannot be found, the index will be 0.
    *
    * @method indexOfTempVariable
    * @param {string} name - The name of the variable to get the index for.
    * @param {string} type - The type name: number, string, boolean or list.
    * @param {string} domain - The variable domain to search in. If not specified, the default domain will be used.
     */

    VariableStore.prototype.indexOfGlobalVariable = function(name, type, domain) {
      var result, variable, variables, variablesDocument;
      result = 0;
      variables = DataManager.getDocumentsByType("global_variables");
      variablesDocument = variables.first(function(v) {
        return v.items.domain === domain;
      });
      if (variablesDocument == null) {
        variablesDocument = variables[0];
      }
      if (variablesDocument) {
        variable = variablesDocument.items[type + "s"].first(function(v) {
          return v.name === name;
        });
        if (variable) {
          result = variable.index;
        } else {
          console.warn("Variable referenced by name not found: " + name + " (persistent, " + type + ")");
        }
      }
      return result;
    };


    /**
    * Gets the index for the persistent variable with the specified name. If a variable with that
    * name cannot be found, the index will be 0.
    *
    * @method indexOfTempVariable
    * @param {string} name - The name of the variable to get the index for.
    * @param {string} type - The type name: number, string, boolean or list.
    * @param {string} domain - The variable domain to search in. If not specified, the default domain will be used.
     */

    VariableStore.prototype.indexOfPersistentVariable = function(name, type, domain) {
      var result, variable, variables, variablesDocument;
      result = 0;
      variables = DataManager.getDocumentsByType("persistent_variables");
      variablesDocument = variables.first(function(v) {
        return v.items.domain === domain;
      });
      if (variablesDocument == null) {
        variablesDocument = variables[0];
      }
      if (variablesDocument) {
        variable = variablesDocument.items[type + "s"].first(function(v) {
          return v.name === name;
        });
        if (variable != null) {
          result = variable.index;
        } else {
          console.warn("Variable referenced by name not found: " + name + " (persistent, " + type + ")");
        }
      }
      return result;
    };


    /**
    * Sets the value of the number variable at the specified index.
    *
    * @method setNumberValueAtIndex
    * @param {number} scope - The variable scope.
    * @param {number} type - The variable's index.
    * @param {number} value - The value to set.
     */

    VariableStore.prototype.setNumberValueAtIndex = function(scope, index, value, domain) {
      if (scope === 2) {
        return this.persistentNumbersByDomain[domain][index] = value;
      } else if (scope === 1) {
        return this.numbersByDomain[domain || 0][index] = value;
      } else {
        return this.tempNumbers[index] = value;
      }
    };


    /**
    * Sets the value of a specified number variable.
    *
    * @method setNumberValueAtIndex
    * @param {number} variable - The variable to set.
    * @param {number} value - The value to set.
     */

    VariableStore.prototype.setNumberValueTo = function(variable, value) {
      if (variable.scope === 2) {
        return this.persistentNumbersByDomain[variable.domain || 0][variable.index] = value;
      } else if (variable.scope === 1) {
        return this.numbersByDomain[variable.domain || 0][variable.index] = value;
      } else {
        return this.tempNumbers[variable.index] = value;
      }
    };


    /**
    * Sets the value of a specified list variable.
    *
    * @method setListObjectTo
    * @param {Object} variable - The variable to set.
    * @param {Object} value - The value to set.
     */

    VariableStore.prototype.setListObjectTo = function(variable, value) {
      if (variable.scope === 2) {
        return this.persistentListsByDomain[variable.domain || 0][variable.index] = value;
      } else if (variable.scope === 1) {
        return this.listsByDomain[variable.domain || 0][variable.index] = value;
      } else {
        return this.tempLists[variable.index] = value;
      }
    };


    /**
    * Sets the value of a specified boolean variable.
    *
    * @method setBooleanValueTo
    * @param {Object} variable - The variable to set.
    * @param {boolean} value - The value to set.
     */

    VariableStore.prototype.setBooleanValueTo = function(variable, value) {
      if (variable.scope === 2) {
        return this.persistentBooleansByDomain[variable.domain][variable.index] = value;
      } else if (variable.scope === 1) {
        return this.booleansByDomain[variable.domain][variable.index] = value;
      } else {
        return this.tempBooleans[variable.index] = value;
      }
    };


    /**
    * Sets the value of the boolean variable at the specified index.
    *
    * @method setBooleanValueAtIndex
    * @param {number} scope - The variable scope.
    * @param {number} index - The variable's index.
    * @param {boolean} value - The value to set.
     */

    VariableStore.prototype.setBooleanValueAtIndex = function(scope, index, value, domain) {
      if (scope === 2) {
        return this.persistentBooleansByDomain[domain][index] = value;
      } else if (scope === 1) {
        return this.booleansByDomain[domain][index] = value;
      } else {
        return this.tempBooleans[index] = value;
      }
    };


    /**
    * Sets the value of a specified string variable.
    *
    * @method setStringValueTo
    * @param {Object} variable - The variable to set.
    * @param {string} value - The value to set.
     */

    VariableStore.prototype.setStringValueTo = function(variable, value) {
      if (variable.scope === 2) {
        return this.persistentStringsByDomain[variable.domain][variable.index] = value;
      } else if (variable.scope === 1) {
        return this.stringsByDomain[variable.domain][variable.index] = value;
      } else {
        return this.tempStrings[variable.index] = value;
      }
    };


    /**
    * Sets the value of the string variable at the specified index.
    *
    * @method setStringValueAtIndex
    * @param {number} scope - The variable scope.
    * @param {number} index - The variable's index.
    * @param {string} value - The value to set.
     */

    VariableStore.prototype.setStringValueAtIndex = function(scope, index, value, domain) {
      if (scope === 2) {
        return this.persistentStringsByDomain[domain][index] = value;
      } else if (scope === 1) {
        return this.stringsByDomain[domain][index] = value;
      } else {
        return this.tempStrings[index] = value;
      }
    };


    /**
    * Gets the value of a specified list variable.
    *
    * @method listObjectOf
    * @param {Object} object - The list-variable/object to get the value from.
    * @return {Object} The list-object.
     */

    VariableStore.prototype.listObjectOf = function(object) {
      var result;
      result = 0;
      if ((object != null) && (object.index != null)) {
        if (object.scope === 2) {
          result = this.persistentListsByDomain[object.domain][object.index];
        } else if (object.scope === 1) {
          result = this.listsByDomain[object.domain][object.index];
        } else {
          result = this.tempLists[object.index];
        }
      } else {
        result = object;
      }
      return result || [];
    };


    /**
    * Gets the value of a number variable at the specified index.
    *
    * @method numberValueAtIndex
    * @param {number} scope - The variable scope.
    * @param {number} index - The variable's index.
    * @return {Object} The number value of the variable.
     */

    VariableStore.prototype.numberValueAtIndex = function(scope, index, domain) {
      var result;
      result = 0;
      if (scope === 2) {
        result = this.persistentNumbersByDomain[domain][index];
      } else if (scope === 1) {
        result = this.numbersByDomain[domain][index];
      } else {
        result = this.tempNumbers[index];
      }
      return result;
    };


    /**
    * Gets the value of a specified number variable.
    *
    * @method numberValueOf
    * @param {Object} object - The variable to get the value from.
    * @return {Object} The number value of the variable.
     */

    VariableStore.prototype.numberValueOf = function(object) {
      var result;
      result = 0;
      if ((object != null) && (object.index != null)) {
        if (object.scope === 2) {
          result = this.persistentNumbersByDomain[object.domain][object.index];
        } else if (object.scope === 1) {
          result = this.numbersByDomain[object.domain][object.index];
        } else {
          result = this.tempNumbers[object.index];
        }
      } else {
        result = object;
      }
      return result || 0;
    };


    /**
    * Gets the value of a specified string variable.
    *
    * @method stringValueOf
    * @param {Object} object - The variable to get the value from.
    * @return {string} The string value of the variable.
     */

    VariableStore.prototype.stringValueOf = function(object) {
      var result;
      result = "";
      if ((object != null) && (object.index != null)) {
        if (object.scope === 2) {
          result = this.persistentStringsByDomain[object.domain][object.index];
        } else if (object.scope === 1) {
          result = this.stringsByDomain[object.domain][object.index];
        } else {
          result = this.tempStrings[object.index];
        }
      } else {
        result = object;
      }
      return result || "";
    };


    /**
    * Gets the value of a string variable at the specified index.
    *
    * @method stringValueAtIndex
    * @param {number} scope - The variable scope.
    * @param {number} index - The variable's index.
    * @return {string} The string value of the variable.
     */

    VariableStore.prototype.stringValueAtIndex = function(scope, index, domain) {
      var result;
      result = "";
      if (scope === 2) {
        result = this.persistentStringsByDomain[domain][index];
      } else if (scope === 1) {
        result = this.stringsByDomain[domain][index];
      } else {
        result = this.tempStrings[index];
      }
      return result || "";
    };


    /**
    * Gets the value of a specified boolean variable.
    *
    * @method booleanValueOf
    * @param {Object} object - The variable to get the value from.
    * @return {Object} The boolean value of the variable.
     */

    VariableStore.prototype.booleanValueOf = function(object) {
      var result;
      result = false;
      if ((object != null) && (object.index != null)) {
        if (object.scope === 2) {
          result = this.persistentBooleansByDomain[object.domain][object.index] || false;
        } else if (object.scope === 1) {
          result = this.booleansByDomain[object.domain][object.index] || false;
        } else {
          result = this.tempBooleans[object.index] || false;
        }
      } else {
        result = object ? true : false;
      }
      return result;
    };


    /**
    * Gets the value of a boolean variable at the specified index.
    *
    * @method booleanValueAtIndex
    * @param {number} scope - The variable scope.
    * @param {number} index - The variable's index.
    * @return {boolean} The boolean value of the variable.
     */

    VariableStore.prototype.booleanValueAtIndex = function(scope, index, domain) {
      var result;
      result = false;
      if (scope === 2) {
        result = this.persistenBooleansByDomain[domain][index] || false;
      } else if (scope === 1) {
        result = this.booleansByDomain[domain][index] || false;
      } else {
        result = this.tempBooleans[index] || false;
      }
      return result;
    };

    return VariableStore;

  })();

  gs.VariableStore = VariableStore;

}).call(this);