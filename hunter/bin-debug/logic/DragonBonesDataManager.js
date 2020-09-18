var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 龙骨数据文件管理类
    // zhaiweili
    // 2019.9.18
    function setDragonBonesRemove(spine) {
        var _this = this;
        var clear = function () {
            spine.removeEventListener(egret.Event.REMOVED_FROM_STAGE, clear, _this);
            clearSpine(spine);
        };
        spine.addEventListener(egret.Event.REMOVED_FROM_STAGE, clear, this);
    }
    zj.setDragonBonesRemove = setDragonBonesRemove;
    function clearSpine(spine) {
        if (spine) {
            if (spine.parent) {
                spine.parent.removeChild(spine);
            }
            if (spine.armature) {
                if (spine.animation) {
                    spine.animation.reset();
                    spine.animation.stop();
                }
                spine.armature.dispose();
                zj.Game.DragonBonesDataManager.removeArmature(spine);
            }
            spine.dispose(true);
            spine.dbClear();
            spine = null;
            // this.spine.armature.dispose();
            // this.spine.dbClear();
            //this.spine.dispose(true);
            // this.spine = null;
        }
    }
    zj.clearSpine = clearSpine;
    var DragonBonesDataManager = (function () {
        function DragonBonesDataManager() {
            this.dragFactory = new dragonBones.EgretFactory();
            this.skeDatas = {};
            this.texureDatas = {};
            this.dbbinDatas = {};
        }
        DragonBonesDataManager.prototype.parseSkeData = function (name, data, isParse) {
            if (name && data) {
                // name = name.replace("_ske.json", "");
                name = name.replace(".json", "");
                name = name.replace(".dbbin", "");
                if (isParse) {
                    this.parseSke(name, data);
                }
                else {
                    this.dbbinDatas[name] = data;
                }
            }
            else {
                egret.error("parse ske data null: " + name);
            }
        };
        DragonBonesDataManager.prototype.checkSkeData = function (name) {
            if (!this.skeDatas[name]) {
                var data = this.dbbinDatas[name];
                if (!data) {
                    data = RES.getRes(name + "_dbbin");
                }
                if (data) {
                    this.parseSke(name, data);
                    delete this.dbbinDatas[name];
                }
                else {
                    egret.error("check dragon ske data error: " + name);
                }
            }
        };
        DragonBonesDataManager.prototype.parseSke = function (name, data) {
            var info = this.dragFactory.parseDragonBonesData(data, name);
            if (info) {
                this.skeDatas[name] = info;
                this.dragFactory.removeDragonBonesData(name, false);
            }
            else {
                egret.error("parse ske error: " + name);
            }
        };
        DragonBonesDataManager.prototype.getSkeData = function (name) {
            this.checkSkeData(name);
            return this.skeDatas[name];
        };
        DragonBonesDataManager.prototype.hasSkeData = function (name) {
            if (name && (this.skeDatas[name] || this.dbbinDatas[name])) {
                return true;
            }
            return false;
        };
        DragonBonesDataManager.prototype.hasTextureData = function (name) {
            if (name && this.texureDatas[name]) {
                return true;
            }
            return false;
        };
        DragonBonesDataManager.prototype.getTextureData = function (name, texture) {
            var textData = this.texureDatas[name];
            if (!textData) {
                var textureJson = RES.getRes(name + "_json");
                if (textureJson) {
                    textData = this.dragFactory.parseTextureAtlasData(textureJson, texture, name);
                    if (textData) {
                        this.texureDatas[name] = textData;
                        this.dragFactory.removeTextureAtlasData(name, false);
                    }
                }
            }
            return textData;
        };
        DragonBonesDataManager.prototype.getDragonBonesFactory = function (dbName) {
            var texture = RES.getRes(dbName + "_tex_png");
            if (!texture) {
                egret.error("getDragonBonesFactory - texture - error: " + dbName);
                return;
            }
            var textureData = this.getTextureData(dbName + "_tex", texture);
            if (!textureData) {
                egret.error("getDragonBonesFactory - textureData - error: " + dbName);
                return;
            }
            var dragonbonesData = this.getSkeData(dbName + "_ske");
            if (!dragonbonesData) {
                egret.error("getDragonBonesFactory - dragonbonesData - error: " + dbName);
                return;
            }
            this.dragFactory.addDragonBonesData(dragonbonesData, dbName);
            this.dragFactory.addTextureAtlasData(textureData, dbName);
            textureData["renderTexture"] = texture;
            return this.dragFactory;
        };
        DragonBonesDataManager.prototype.removeArmature = function (display) {
            if (display.armature)
                this.dragFactory.dragonBones.clock.remove(display.armature);
        };
        return DragonBonesDataManager;
    }());
    zj.DragonBonesDataManager = DragonBonesDataManager;
    __reflect(DragonBonesDataManager.prototype, "zj.DragonBonesDataManager");
})(zj || (zj = {}));
//# sourceMappingURL=DragonBonesDataManager.js.map