// Generated by CoffeeScript 1.12.7
(function() {
  var GameManager;

  GameManager = (function() {

    /**
    * Manages all general things around the game like holding the game settings,
    * manages the save/load of a game, etc.
    *
    * @module gs
    * @class GameManager
    * @memberof gs
    * @constructor
     */
    function GameManager() {

      /**
      * The current scene data.
      * @property sceneData
      * @type Object
       */
      this.sceneData = {};

      /**
      * The scene viewport containing all visual objects which are part of the scene and influenced
      * by the in-game camera.
      * @property sceneViewport
      * @type gs.Object_Viewport
       */
      this.sceneViewport = null;

      /**
      * The list of common events.
      * @property commonEvents
      * @type gs.Object_CommonEvent[]
       */
      this.commonEvents = [];

      /**
      * Indicates if the GameManager is initialized.
      * @property commonEvents
      * @type gs.Object_CommonEvent[]
       */
      this.initialized = false;

      /**
      * Temporary game settings.
      * @property tempSettings
      * @type Object
       */
      this.tempSettings = {
        skip: false,
        skipTime: 5,
        loadMenuAccess: true,
        menuAccess: true,
        backlogAccess: true,
        saveMenuAccess: true,
        messageFading: {
          animation: {
            type: 1
          },
          duration: 15,
          easing: null
        }

        /**
        * Temporary game fields.
        * @property tempFields
        * @type Object
         */
      };
      this.tempFields = null;

      /**
      * Stores default values for backgrounds, pictures, etc.
      * @property defaults
      * @type Object
       */
      this.defaults = {
        background: {
          "duration": 30,
          "origin": 0,
          "zOrder": 0,
          "loopVertical": 0,
          "loopHorizontal": 0,
          "easing": {
            "type": 0,
            "inOut": 1
          },
          "animation": {
            "type": 1,
            "movement": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "motionBlur": {
            "enabled": 0,
            "delay": 2,
            "opacity": 100,
            "dissolveSpeed": 3
          }
        },
        picture: {
          "appearDuration": 30,
          "disappearDuration": 30,
          "origin": 1,
          "zOrder": 0,
          "appearEasing": {
            "type": 0,
            "inOut": 1
          },
          "disappearEasing": {
            "type": 0,
            "inOut": 1
          },
          "appearAnimation": {
            "type": 1,
            "movement": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "disappearAnimation": {
            "type": 1,
            "movement": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "motionBlur": {
            "enabled": 0,
            "delay": 2,
            "opacity": 100,
            "dissolveSpeed": 3
          }
        },
        character: {
          "expressionDuration": 0,
          "appearDuration": 40,
          "disappearDuration": 40,
          "origin": 1,
          "zOrder": 0,
          "appearEasing": {
            "type": 2,
            "inOut": 2
          },
          "disappearEasing": {
            "type": 1,
            "inOut": 1
          },
          "appearAnimation": {
            "type": 1,
            "movement": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "disappearAnimation": {
            "type": 1,
            "movement": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "motionBlur": {
            "enabled": 0,
            "delay": 2,
            "opacity": 100,
            "dissolveSpeed": 3
          },
          "changeAnimation": {
            "type": 1,
            "movement": 0,
            "fading": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "changeEasing": {
            "type": 2,
            "inOut": 2
          }
        },
        text: {
          "appearDuration": 30,
          "disappearDuration": 30,
          "positionOrigin": 0,
          "origin": 0,
          "zOrder": 0,
          "appearEasing": {
            "type": 0,
            "inOut": 1
          },
          "disappearEasing": {
            "type": 0,
            "inOut": 1
          },
          "appearAnimation": {
            "type": 1,
            "movement": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "disappearAnimation": {
            "type": 1,
            "movement": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "motionBlur": {
            "enabled": 0,
            "delay": 2,
            "opacity": 100,
            "dissolveSpeed": 3
          }
        },
        video: {
          "appearDuration": 30,
          "disappearDuration": 30,
          "origin": 0,
          "zOrder": 0,
          "appearEasing": {
            "type": 0,
            "inOut": 1
          },
          "disappearEasing": {
            "type": 0,
            "inOut": 1
          },
          "appearAnimation": {
            "type": 1,
            "movement": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "disappearAnimation": {
            "type": 1,
            "movement": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "motionBlur": {
            "enabled": 0,
            "delay": 2,
            "opacity": 100,
            "dissolveSpeed": 3
          }
        },
        live2d: {
          "motionFadeInTime": 1000,
          "appearDuration": 30,
          "disappearDuration": 30,
          "zOrder": 0,
          "appearEasing": {
            "type": 0,
            "inOut": 1
          },
          "disappearEasing": {
            "type": 0,
            "inOut": 1
          },
          "appearAnimation": {
            "type": 1,
            "movement": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "disappearAnimation": {
            "type": 1,
            "movement": 0,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          }
        },
        messageBox: {
          "appearDuration": 30,
          "disappearDuration": 30,
          "zOrder": 0,
          "appearEasing": {
            "type": 0,
            "inOut": 1
          },
          "disappearEasing": {
            "type": 0,
            "inOut": 1
          },
          "appearAnimation": {
            "type": 0,
            "movement": 3,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          },
          "disappearAnimation": {
            "type": 0,
            "movement": 3,
            "mask": {
              "graphic": null,
              "vague": 30
            }
          }
        },
        audio: {
          "musicFadeInDuration": 0,
          "musicFadeOutDuration": 0,
          "musicVolume": 100,
          "musicPlaybackRate": 100,
          "soundVolume": 100,
          "soundPlaybackRate": 100,
          "voiceVolume": 100,
          "voicePlaybackRate": 100
        }
      };

      /**
      * The game's backlog.
      * @property backlog
      * @type Object[]
       */
      this.backlog = [];

      /**
      * Character parameters by character ID.
      * @property characterParams
      * @type Object[]
       */
      this.characterParams = [];

      /**
      * The game's chapter
      * @property chapters
      * @type gs.Document[]
       */
      this.chapters = [];

      /**
      * The game's current displayed messages. Especially in NVL mode the messages
      * of the current page are stored here.
      * @property messages
      * @type Object[]
       */
      this.messages = [];

      /**
      * Count of save slots. Default is 100.
      * @property saveSlotCount
      * @type number
       */
      this.saveSlotCount = 100;

      /**
      * The index of save games. Contains the header-info for each save game slot.
      * @property saveGameSlots
      * @type Object[]
       */
      this.saveGameSlots = [];

      /**
      * Stores global data like the state of persistent game variables.
      * @property globalData
      * @type Object
       */
      this.globalData = null;

      /**
      * Indicates if the game runs in editor's live-preview.
      * @property inLivePreview
      * @type Object
       */
      this.inLivePreview = false;
    }


    /**
    * Initializes the GameManager, should be called before the actual game starts.
    *
    * @method initialize
     */

    GameManager.prototype.initialize = function() {
      var character, i, j, k, l, len, len1, param, ref, ref1, ref2, ref3, ref4, ref5, ref6;
      this.initialized = true;
      this.inLivePreview = $PARAMS.preview != null;
      this.saveSlotCount = RecordManager.system.saveSlotCount || 100;
      this.tempFields = new gs.GameTemp();
      window.$tempFields = this.tempFields;
      this.createSaveGameIndex();
      this.variableStore = new gs.VariableStore();
      DataManager.getDocumentsByType("persistent_variables");
      this.variableStore.setupDomains(DataManager.getDocumentsByType("global_variables").select(function(v) {
        return v.items.domain || "";
      }));
      this.variableStore.persistentNumbersByDomain = (ref = this.globalData.persistentNumbers) != null ? ref : this.variableStore.persistentNumbersByDomain;
      this.variableStore.persistentBooleansByDomain = (ref1 = this.globalData.persistentBooleans) != null ? ref1 : this.variableStore.persistentBooleansByDomain;
      this.variableStore.persistentStringsByDomain = (ref2 = this.globalData.persistentStrings) != null ? ref2 : this.variableStore.persistentStringsByDomain;
      this.variableStore.persistentListsByDomain = (ref3 = this.globalData.persistentLists) != null ? ref3 : this.variableStore.persistentListsByDomain;
      this.sceneViewport = new gs.Object_Viewport(new Viewport(0, 0, Graphics.width, Graphics.height, Graphics.viewport));
      ref4 = RecordManager.charactersArray;
      for (j = 0, len = ref4.length; j < len; j++) {
        character = ref4[j];
        if (character != null) {
          this.characterParams[character.index] = {};
          if (character.params != null) {
            ref5 = character.params;
            for (k = 0, len1 = ref5.length; k < len1; k++) {
              param = ref5[k];
              this.characterParams[character.index][param.name] = param.value;
            }
          }
        }
      }
      this.setupCommonEvents();
      for (i = l = 0, ref6 = RecordManager.characters; 0 <= ref6 ? l < ref6 : l > ref6; i = 0 <= ref6 ? ++l : --l) {
        this.settings.voicesPerCharacter[i] = 100;
      }
      this.chapters = DataManager.getDocumentsByType("vn.chapter");
      return this.chapters.sort(function(a, b) {
        if (a.items.order > b.items.order) {
          return 1;
        } else if (a.items.order < b.items.order) {
          return -1;
        } else {
          return 0;
        }
      });
    };


    /**
    * Sets up common events.
    *
    * @method setupCommonEvents
     */

    GameManager.prototype.setupCommonEvents = function() {
      var event, j, k, len, len1, object, ref, ref1, results;
      ref = this.commonEvents;
      for (j = 0, len = ref.length; j < len; j++) {
        event = ref[j];
        if (event != null) {
          event.dispose();
        }
      }
      this.commonEvents = [];
      ref1 = RecordManager.commonEvents;
      results = [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        event = ref1[k];
        object = new gs.Object_CommonEvent();
        object.record = event;
        object.rid = event.index;
        this.commonEvents[event.index] = object;
        results.push(this.commonEvents.push(object));
      }
      return results;
    };


    /**
    * Preloads resources for common events with auto-preload option enabled.
    *
    * @method preloadCommonEvents
     */

    GameManager.prototype.preloadCommonEvents = function() {
      var event, j, len, ref, results;
      ref = RecordManager.commonEvents;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        event = ref[j];
        if (!event) {
          continue;
        }
        if (event.startCondition === 1 && event.autoPreload) {
          results.push(gs.ResourceLoader.loadEventCommandsGraphics(event.commands));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };


    /**
    * Sets up cursor depending on system settings.
    *
    * @method setupCursor
     */

    GameManager.prototype.setupCursor = function() {
      var bitmap, ref;
      if ((ref = RecordManager.system.cursor) != null ? ref.name : void 0) {
        bitmap = ResourceManager.getBitmap("Graphics/Pictures/" + RecordManager.system.cursor.name);
        return Graphics.setCursorBitmap(bitmap, RecordManager.system.cursor.hx, RecordManager.system.cursor.hy);
      } else {
        return Graphics.setCursorBitmap(null);
      }
    };


    /**
    * Disposes the GameManager. Should be called before quit the game.
    *
    * @method dispose
     */

    GameManager.prototype.dispose = function() {};


    /**
    * Quits the game. The implementation depends on the platform. So for example on mobile
    * devices this method has no effect.
    *
    * @method exit
     */

    GameManager.prototype.exit = function() {
      return Application.exit();
    };


    /**
    * Resets the GameManager by disposing and re-initializing it.
    *
    * @method reset
     */

    GameManager.prototype.reset = function() {
      this.initialized = false;
      this.interpreter = null;
      this.dispose();
      return this.initialize();
    };


    /**
    * Starts a new game.
    *
    * @method newGame
     */

    GameManager.prototype.newGame = function() {
      this.messages = [];
      this.variableStore.clearAllGlobalVariables();
      this.variableStore.clearAllLocalVariables();
      this.tempSettings.skip = false;
      this.tempFields.clear();
      this.tempFields.inGame = true;
      this.setupCommonEvents();
      this.tempSettings.menuAccess = true;
      this.tempSettings.saveMenuAccess = true;
      this.tempSettings.loadMenuAccess = true;
      return this.tempSettings.backlogAccess = true;
    };


    /**
    * Exists the game and resets the GameManager which is important before going back to
    * the main menu or title screen.
    *
    * @method exitGame
     */

    GameManager.prototype.exitGame = function() {
      this.tempFields.inGame = false;
      return this.tempFields.isExitingGame = true;
    };


    /**
    * Updates the GameManager. Should be called once per frame.
    *
    * @method update
     */

    GameManager.prototype.update = function() {};


    /**
    * Creates the index of all save-games. Should be called whenever a new save game
    * is created.
    *
    * @method createSaveGameIndex
    * @protected
     */

    GameManager.prototype.createSaveGameIndex = function() {
      var chaper, chapter, header, i, image, j, ref, scene;
      this.saveGameSlots = [];
      for (i = j = 0, ref = this.saveSlotCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (GameStorage.exists("SaveGame_" + i + "_Header")) {
          header = GameStorage.getObject("SaveGame_" + i + "_Header");
          chapter = DataManager.getDocument(header.chapterUid);
          scene = DataManager.getDocumentSummary(header.sceneUid);
          image = header.image;
        } else {
          header = null;
          chaper = null;
          scene = null;
        }
        if ((chapter != null) && (scene != null) && !this.inLivePreview) {
          this.saveGameSlots.push({
            date: header.date,
            chapter: chapter.items.name || "DELETED",
            scene: scene.items.name || "DELETED",
            image: image
          });
        } else {
          this.saveGameSlots.push({
            "date": "",
            "chapter": "",
            "scene": "",
            "image": null
          });
        }
      }
      return this.saveGameSlots;
    };


    /**
    * Resets the game's settings to its default values.
    *
    * @method resetSettings
     */

    GameManager.prototype.resetSettings = function() {
      var i, j, ref;
      this.settings = {
        version: 342,
        renderer: 0,
        filter: 1,
        confirmation: true,
        adjustAspectRatio: false,
        allowSkip: true,
        allowSkipUnreadMessages: true,
        allowVideoSkip: true,
        skipVoiceOnAction: true,
        allowChoiceSkip: false,
        voicesByCharacter: [],
        timeMessageToVoice: true,
        "autoMessage": {
          enabled: false,
          time: 0,
          waitForVoice: true,
          stopOnAction: false
        },
        "voiceEnabled": true,
        "bgmEnabled": true,
        "soundEnabled": true,
        "voiceVolume": 100,
        "bgmVolume": 100,
        "seVolume": 100,
        "messageSpeed": 4,
        "fullScreen": false,
        "aspectRatio": 0
      };
      this.saveGameSlots = [];
      for (i = j = 0, ref = this.saveSlotCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        GameStorage.remove("SaveGame_" + i + "_Header");
        GameStorage.remove("SaveGame_" + i);
        this.saveGameSlots.push({
          "date": "",
          "chapter": "",
          "scene": "",
          "thumb": ""
        });
      }
      return GameStorage.setObject("settings", this.settings);
    };


    /**
    * Saves current game settings.
    *
    * @method saveSettings
     */

    GameManager.prototype.saveSettings = function() {
      return GameStorage.setObject("settings", this.settings);
    };


    /**
    * Saves current global data.
    *
    * @method saveGlobalData
     */

    GameManager.prototype.saveGlobalData = function() {
      this.globalData.persistentNumbers = this.variableStore.persistentNumbersByDomain;
      this.globalData.persistentLists = this.variableStore.persistentListsByDomain;
      this.globalData.persistentBooleans = this.variableStore.persistentBooleansByDomain;
      this.globalData.persistentStrings = this.variableStore.persistentStringsByDomain;
      return GameStorage.setObject("globalData", this.globalData);
    };


    /**
    * Resets current global data. All stored data about read messages, persistent variables and
    * CG gallery will be deleted.
    *
    * @method resetGlobalData
     */

    GameManager.prototype.resetGlobalData = function() {
      var cg, data, i, j, len, ref, ref1, version;
      version = (ref = this.globalData) != null ? ref.version : void 0;
      data = this.globalData;
      this.globalData = {
        messages: {},
        cgGallery: {},
        version: 342,
        persistentNumbers: {
          "0": [],
          "com.degica.vnm.default": []
        },
        persistentStrings: {
          "0": [],
          "com.degica.vnm.default": []
        },
        persistentBooleans: {
          "0": [],
          "com.degica.vnm.default": []
        },
        persistentLists: {
          "0": [],
          "com.degica.vnm.default": []
        }
      };
      ref1 = RecordManager.cgGalleryArray;
      for (i = j = 0, len = ref1.length; j < len; i = ++j) {
        cg = ref1[i];
        if (cg != null) {
          this.globalData.cgGallery[cg.index] = {
            unlocked: false
          };
        }
      }
      GameStorage.setObject("globalData", this.globalData);
      return this.migrateGlobalData(data, version + 1, this.globalData.version);
    };

    GameManager.prototype.migrateGlobalData = function(data, from, to) {
      var i, j, ref, ref1, results;
      results = [];
      for (i = j = ref = from, ref1 = to; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
        if (this["migrateGlobalData" + i] != null) {
          results.push(this["migrateGlobalData" + i](data));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    GameManager.prototype.migrateGlobalData342 = function(data) {
      if (data != null) {
        this.globalData.persistentNumbers[0] = data.persistentNumbers[0] || [];
        this.globalData.persistentStrings[0] = data.persistentStrings[0] || [];
        this.globalData.persistentBooleans[0] = data.persistentBooleans[0] || [];
        this.globalData.persistentLists[0] = data.persistentLists[0] || [];
        this.globalData.persistentNumbers["com.degica.vnm.default"] = data.persistentNumbers[0] || [];
        this.globalData.persistentStrings["com.degica.vnm.default"] = data.persistentStrings[0] || [];
        this.globalData.persistentBooleans["com.degica.vnm.default"] = data.persistentBooleans[0] || [];
        return this.globalData.persistentLists["com.degica.vnm.default"] = data.persistentLists[0] || [];
      }
    };

    GameManager.prototype.readSaveGame = function(saveGame) {};

    GameManager.prototype.writeSaveGame = function(saveGame) {};

    GameManager.prototype.prepareSaveGame = function(snapshot) {
      var context, messageBoxIds, messageBoxes, messageIds, messages, saveGame, sceneData;
      if (snapshot) {
        snapshot = ResourceManager.getCustomBitmap("$snapshot");
        if (snapshot != null) {
          snapshot.dispose();
        }
        ResourceManager.setCustomBitmap("$snapshot", Graphics.snapshot());
      }
      context = new gs.ObjectCodecContext();
      context.decodedObjectStore.push(Graphics.viewport);
      context.decodedObjectStore.push(this.scene);
      context.decodedObjectStore.push(this.scene.behavior);
      messageBoxIds = ["messageBox", "nvlMessageBox", "messageMenu"];
      messageIds = ["gameMessage_message", "nvlGameMessage_message"];
      messageBoxes = messageBoxIds.select((function(_this) {
        return function(id) {
          return _this.scene.behavior.objectManager.objectById(id);
        };
      })(this));
      messages = messageIds.select((function(_this) {
        return function(id) {
          return _this.scene.behavior.objectManager.objectById(id);
        };
      })(this));
      sceneData = {};
      saveGame = {};
      saveGame.encodedObjectStore = null;
      saveGame.sceneUid = this.scene.sceneDocument.uid;
      saveGame.data = {
        resourceContext: this.scene.behavior.resourceContext.toDataBundle(),
        currentCharacter: this.scene.currentCharacter,
        characterParams: this.characterParams,
        frameCount: Graphics.frameCount,
        tempFields: this.tempFields,
        viewport: this.scene.viewport,
        characters: this.scene.characters,
        characterNames: RecordManager.charactersArray.select(function(c) {
          return {
            name: c.name,
            index: c.index
          };
        }),
        backgrounds: this.scene.backgrounds,
        pictures: this.scene.pictureContainer.subObjectsByDomain,
        texts: this.scene.textContainer.subObjectsByDomain,
        videos: this.scene.videoContainer.subObjectsByDomain,
        viewports: this.scene.viewportContainer.subObjects,
        commonEvents: this.scene.commonEventContainer.subObjects,
        hotspots: this.scene.hotspotContainer.subObjectsByDomain,
        interpreter: this.scene.interpreter,
        choices: this.scene.choices,
        messageBoxes: messageBoxes.select((function(_this) {
          return function(mb, i) {
            return {
              visible: mb.visible,
              id: mb.id,
              message: messages[i]
            };
          };
        })(this)),
        backlog: this.backlog,
        variableStore: this.variableStore,
        defaults: this.defaults,
        transitionData: SceneManager.transitionData,
        audio: {
          audioBuffers: AudioManager.audioBuffers,
          audioBuffersByLayer: AudioManager.audioBuffersByLayer,
          audioLayers: AudioManager.audioLayers,
          soundReferences: AudioManager.soundReferences
        },
        messageAreas: this.scene.messageAreaContainer.subObjectsByDomain
      };
      saveGame.data = gs.ObjectCodec.encode(saveGame.data, context);
      saveGame.encodedObjectStore = context.encodedObjectStore;
      return this.saveGame = saveGame;
    };

    GameManager.prototype.createSaveGameSlot = function(header) {
      var slot;
      slot = {
        "date": new Date().toDateString(),
        "chapter": this.scene.chapter.items.name,
        "scene": this.scene.sceneDocument.items.name,
        "image": header.image
      };
      return slot;
    };

    GameManager.prototype.createSaveGameHeader = function(thumbWidth, thumbHeight) {
      var header, thumbImage;
      thumbImage = this.createSaveGameThumbImage(thumbWidth, thumbHeight);
      header = {
        "date": new Date().toDateString(),
        "chapterUid": this.scene.chapter.uid,
        "sceneUid": this.scene.sceneDocument.uid,
        "image": thumbImage != null ? thumbImage.image.toDataURL() : void 0
      };
      if (thumbImage != null) {
        thumbImage.dispose();
      }
      return header;
    };

    GameManager.prototype.createSaveGameThumbImage = function(width, height) {
      var snapshot, thumbImage;
      snapshot = ResourceManager.getBitmap("$snapshot");
      thumbImage = null;
      if (snapshot && snapshot.loaded) {
        if (width && height) {
          thumbImage = new Bitmap(width, height);
        } else {
          thumbImage = new Bitmap(Graphics.width / 8, Graphics.height / 8);
        }
        thumbImage.stretchBlt(new Rect(0, 0, thumbImage.width, thumbImage.height), snapshot, new Rect(0, 0, snapshot.width, snapshot.height));
      }
      return thumbImage;
    };

    GameManager.prototype.storeSaveGame = function(name, saveGame, header) {
      if (header) {
        GameStorage.setData(name + "_Header", JSON.stringify(header));
      }
      return GameStorage.setData(name, JSON.stringify(saveGame));
    };


    /**
    * Saves the current game at the specified slot.
    *
    * @method save
    * @param {number} slot - The slot where the game should be saved at.
    * @param {number} thumbWidth - The width for the snapshot-thumb. You can specify <b>null</b> or 0 to use an auto calculated width.
    * @param {number} thumbHeight - The height for the snapshot-thumb. You can specify <b>null</b> or 0 to use an auto calculated height.
     */

    GameManager.prototype.save = function(slot, thumbWidth, thumbHeight) {
      var header;
      if (this.saveGame) {
        header = this.createSaveGameHeader(thumbWidth, thumbHeight);
        this.saveGameSlots[slot] = this.createSaveGameSlot(header);
        this.storeSaveGame("SaveGame_" + slot, this.saveGame, header);
        this.sceneData = {};
        return this.saveGame;
      }
    };

    GameManager.prototype.restore = function(saveGame) {
      this.backlog = saveGame.data.backlog;
      this.defaults = saveGame.data.defaults;
      this.variableStore.restore(saveGame.data.variableStore);
      this.sceneData = saveGame.data;
      this.saveGame = null;
      this.loadedSaveGame = null;
      this.tempFields = saveGame.data.tempFields;
      this.characterParams = saveGame.data.characterParams;
      window.$tempFields = this.tempFields;
      return window.$dataFields.backlog = this.backlog;
    };

    GameManager.prototype.prepareLoadGame = function() {
      return AudioManager.stopAllMusic(30);
    };


    /**
    * Loads the game from the specified save game slot. This method triggers
    * a automatic scene change.
    *
    * @method load
    * @param {number} slot - The slot where the game should be loaded from.
     */

    GameManager.prototype.load = function(slot) {
      if (!this.saveGameSlots[slot] || this.saveGameSlots[slot].date.trim().length === 0) {
        return;
      }
      this.prepareLoadGame();
      this.loadedSaveGame = this.loadSaveGame("SaveGame_" + slot);
      gs.Audio.reset();
      gs.GlobalEventManager.clear();
      SceneManager.switchTo(new vn.Object_Scene());
      return SceneManager.clear();
    };

    GameManager.prototype.loadSaveGame = function(name) {
      return JSON.parse(GameStorage.getData(name));
    };


    /**
    * Gets the save game data for a specified slot.
    *
    * @method getSaveGame
    * @param {number} slot - The slot to get the save data from.
    * @return {Object} The save game data.
     */

    GameManager.prototype.getSaveGame = function(slot) {
      return JSON.parse(GameStorage.getData("SaveGame_" + slot));
    };

    return GameManager;

  })();

  window.GameManager = new GameManager();

  gs.GameManager = window.GameManager;

}).call(this);