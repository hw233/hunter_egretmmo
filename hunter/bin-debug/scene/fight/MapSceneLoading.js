var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var MapSceneLoading = (function () {
        function MapSceneLoading() {
            this.countAll = 2;
            this.url = "";
            zj.Game.EventManager.on(zj.GameEvent.LOGING_SCENE, this.openPanel, this);
        }
        MapSceneLoading.getInstance = function () {
            if (this.instance == null) {
                this.instance = new MapSceneLoading();
            }
            return this.instance;
        };
        MapSceneLoading.prototype.loadFightRes = function (id, fun, _thisAny) {
            this.mapId = id;
            this.comfun = fun;
            this.thisAny = _thisAny;
            zj.Game.EventManager.event(zj.GameEvent.OPEN_LOGING_SCENE);
            zj.StageSceneManager.Instance.clearScene();
            zj.StageSceneManager.Instance.newTemporaryScene();
        };
        MapSceneLoading.prototype.loadFightResLoading = function (id, fun, _thisAny) {
            this.mapId = id;
            this.comfun = fun;
            this.thisAny = _thisAny;
            // Game.EventManager.event(GameEvent.OPEN_LOGING_SCENE);
            zj.StageSceneManager.Instance.clearScene();
            zj.StageSceneManager.Instance.newTemporaryScene();
            this.openPanel();
        };
        MapSceneLoading.prototype.openPanel = function () {
            var _this = this;
            if (!this.comfun)
                return;
            var resArr = [];
            this.url = zj.AppConfig.ProjectUrlRoot + "resource/config/map/" + this.mapId + "/" + this.mapId + ".tmx";
            resArr = this.resMap(this.mapId);
            resArr.push(zj.UIConfig.UIConfig_LeagueWarScene.roleBloodBoard, zj.UIConfig.UIConfig_LeagueWarScene.roleProgressBoard, zj.UIConfig.UIConfig_LeagueWarScene.roleBuildProgressBar, zj.UIConfig.UIConfig_LeagueWarScene.sceneNameBoard, zj.UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar, zj.UIConfig.UIConfig_LeagueWarScene.roleBloodEnemyBar, zj.UIConfig.UIConfig_LeagueWarScene.roleCollectProgressBar);
            var bossui = zj.UIResource["Zork_Boss"];
            for (var i = 0; i < bossui.length; i++) {
                resArr.push(bossui[i]);
            }
            var uiArr = zj.UIResource["WonderLandChoose"];
            for (var i = 0; i < uiArr.length; i++) {
                resArr.push(resArr[i]);
            }
            var groupName = "mapScene" + egret.getTimer();
            if (!RES.createGroup(groupName, resArr, true)) {
                var str = zj.LANG("创建资源组失败:") + groupName;
                //toast(str);
                return;
            }
            this.countAll = 2;
            this.startLoadFight();
            zj.Game.RESGroupManager.loadGroup(groupName).then(function () {
                _this.resComplete();
            }).catch(function (error) {
                //失败
                //toast(error);
                return;
            });
            RES.getResAsync(this.mapId + "_tmx", function (value, key) {
                var data = egret.XML.parse(value);
                _this.data = data;
                _this.resComplete();
            }, this);
        };
        MapSceneLoading.prototype.startLoadFight = function () {
            var _this = this;
            this.count = 0;
            //
            var uispine = ["nianshou", "ui_tongyong_xinshou", "wj_032_xisuo", "wj_040_zhadanmo", "wj_034_niteluo", "npc_card_girl", "wj_031_xiaojie", "wj_002_xiaodi", "wj_007_banzang", "wj_023_menqi", "ui_tongyong_kongbai", "ui_tanlanzhidao_02", "ui_tanlanzhidao_01", "ui_tanlanzhidao_guoshu_da", "ui_tanlanzhidao_guoshu_xiao", "ui_tanlanzhidao_chuansongmen", "matou_guoshu_da", MapSceneLoading.BlackRole];
            this.countAll = this.countAll + uispine.length;
            var _loop_1 = function (i) {
                var dbName = uispine[i];
                zj.Game.DragonBonesManager.preloadDragonbone(zj.StageSceneManager.Instance.temporaryScene, dbName)
                    .then(function () {
                    _this.resComplete();
                })
                    .catch(function (error) {
                    var _dbName = dbName;
                    //toast(error);
                });
            };
            for (var i = 0; i < uispine.length; i++) {
                _loop_1(i);
            }
        };
        MapSceneLoading.prototype.resComplete = function () {
            this.count = this.count + 1;
            if (this.count == this.countAll) {
                this.comfun.call(this.thisAny);
                this.comfun = null;
                this.thisAny = null;
            }
            zj.Game.EventManager.event(zj.GameEvent.LOGING_SCENE_PROGRESS, this.count / this.countAll);
        };
        MapSceneLoading.prototype.resMap = function (id) {
            var _json = zj.Game.ConfigManager.getTable(id + ".json");
            var urlArr = [];
            for (var i = 0; i < _json["gameobjects"].length; i++) {
                var mainTbl = _json["gameobjects"][i];
                for (var k = 0; k < mainTbl["gameobjects"].length; k++) {
                    var obj = mainTbl["gameobjects"][k];
                    for (var j = 0; j < obj["gameobjects"].length; j++) {
                        var data = obj["gameobjects"][j];
                        for (var l = 0; l < data["components"].length; l++) {
                            var fData = data["components"][l];
                            var fileData = fData.fileData;
                            var imgUrl = fileData.path;
                            var egretUrl = this.CocosUrlToEgretUrl(imgUrl);
                            if (imgUrl != "" && imgUrl.indexOf("wu.png") == -1 && urlArr.indexOf(egretUrl) == -1) {
                                urlArr.push(egretUrl);
                            }
                        }
                    }
                }
            }
            return urlArr;
        };
        /**cocos场景配置坐标转换成Egret坐标 */
        MapSceneLoading.prototype.CocosUrlToEgretUrl = function (url) {
            var arrS = url.split(".");
            var sourceArr = arrS[0].split("/");
            var source = sourceArr[sourceArr.length - 1];
            return "map_" + sourceArr[sourceArr.length - 2] + "_" + source + "_png";
        };
        MapSceneLoading.BlackRole = "wj_hei";
        return MapSceneLoading;
    }());
    zj.MapSceneLoading = MapSceneLoading;
    __reflect(MapSceneLoading.prototype, "zj.MapSceneLoading");
})(zj || (zj = {}));
//# sourceMappingURL=MapSceneLoading.js.map