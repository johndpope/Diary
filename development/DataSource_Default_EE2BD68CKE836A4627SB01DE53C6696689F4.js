// Generated by CoffeeScript 1.12.7
(function() {
  ui.UiFactory.dataSources["default"] = function() {
    return {
      "database": RecordManager,
      "settings": GameManager.settings,
      "tempSettings": GameManager.tempSettings,
      "globalData": GameManager.globalData,
      "backlog": GameManager.backlog,
      "saveGameSlots": GameManager.saveGameSlots,
      "scene": GameManager.scene,
      "languages": LanguageManager.languages,
      "chapters": GameManager.chapters.where(function(c) {
        return RecordManager.cgGalleryArray.first(function(cg) {
          var ref;
          return ((ref = cg.relationData) != null ? ref.chapter.uid : void 0) === c.uid;
        }) !== null;
      }),
      "textInputPages": ui.Helper.generateTextInputPages(),
      "cgGalleryByChapter": RecordManager.cgGalleryArray.groupBy(function(x) {
        var ref;
        return (x != null ? (ref = x.relationData) != null ? ref.chapter.uid : void 0 : void 0) || "";
      }).toDictionary((function(x) {
        var ref, ref1;
        return (x != null ? (ref = x[0]) != null ? (ref1 = ref.relationData) != null ? ref1.chapter.uid : void 0 : void 0 : void 0) || "";
      }), (function(x) {
        return x;
      }))
    };
  };

}).call(this);