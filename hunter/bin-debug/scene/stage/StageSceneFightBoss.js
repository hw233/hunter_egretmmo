var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    var StageSceneFightBoss = (function (_super) {
        __extends(StageSceneFightBoss, _super);
        function StageSceneFightBoss(node, order) {
            var _this = _super.call(this, node, order) || this;
            _this.tableTouchRt = [];
            _this.setPlayerState(zj.EnumPlayerState.PLAYER_STATE_BOSS);
            _this.ttfSkillName = null;
            _this.innerFoot = null;
            _this.outerFoot = null;
            _this.storageNormalIcon = null;
            _this.storageFrame = null;
            _this.storageBeginValue = 0;
            _this.storageMaxValue = 0;
            _this.storageCurValue = 0;
            _this.storageProgress = null;
            _this.bStorageBarPlay = false;
            _this.barPercent = 0;
            return _this;
        }
        StageSceneFightBoss.prototype.release = function () {
            _super.prototype.release.call(this);
        };
        StageSceneFightBoss.prototype.createZorkBoss = function (scenePosInfo, floor, x, y, dir, moveDis, verDis) {
            this.setPlayerInfo(scenePosInfo.roleBase);
            this.commonCreate(floor, x, y, dir, moveDis, verDis);
            this.dealSceneNotice(scenePosInfo);
        };
        StageSceneFightBoss.prototype.createActivityBoss = function (scenePosInfo, floor, x, y, dir, moveDis, verDis) {
            this.setPlayerInfo(scenePosInfo);
            this.commonCreate(floor, x, y, dir, moveDis, verDis);
        };
        StageSceneFightBoss.prototype.init = function () {
            this.parseInfo();
            this.loadDB();
            this.loadNormalSpx();
            this.loadBody();
            this.loadNameBoard();
            this.loadLvTitle();
            this.loadNameTitle();
            this.loadSpeed();
            this.loadScale();
            this.loadTouchRt();
        };
        StageSceneFightBoss.prototype.loadTouchRt = function () {
            this.tableTouchRt = [];
            this.tableTouchRt.push(new egret.Rectangle(-50, 0, 100, 300));
        };
        StageSceneFightBoss.prototype.loadNormalSpx = function () {
            this.scale = 1;
            this.uiScale = this.scale * 1.1;
        };
        StageSceneFightBoss.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
        };
        StageSceneFightBoss.prototype.parseInfo = function () {
            this.mapRoleId = this.playerInfo.picId;
            if (zj.TableLanguage.Item(this.playerInfo.name)) {
                var lang = zj.Game.LanguageManager.getLang();
                this.name = zj.TableLanguage.Item(this.playerInfo.name)[lang];
            }
        };
        StageSceneFightBoss.prototype.getMaxHp = function () {
            return this.scenePosInfo.roleBase.battleValue;
        };
        StageSceneFightBoss.prototype.getCurHp = function () {
            return zj.yuan3(this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die, 0, this.scenePosInfo.hpPre);
        };
        StageSceneFightBoss.prototype.procHp = function () {
            if (this.bVisible == false) {
                return;
            }
            var hpP = this.scenePosInfo.hpPre * 100 / this.scenePosInfo.roleBase.battleValue;
            if (hpP != this.uiHp && this.bloodBar != null) {
                this.uiHp = hpP;
                this.bloodBar.width = this.bloodBarWidth * hpP / 100;
            }
        };
        StageSceneFightBoss.prototype.getNameColor = function () {
            return zj.ConstantConfig_Common.Color.red;
        };
        StageSceneFightBoss.prototype.loadNameBoard = function () {
            var pic = new eui.Image(zj.UIConfig.UIConfig_LeagueWarScene.sceneNameBoard);
            pic.anchorOffsetX = 158 / 2;
            pic.anchorOffsetY = 27 / 2;
            pic.scaleX = pic.scaleY = 1.5;
            this.nameBoard = pic;
            this.titleSpace.addChild(this.nameBoard);
        };
        StageSceneFightBoss.prototype.loadNameTitle = function () {
            this.cacheName = this.name;
            this.ttfName = new eui.Label("Lv" + this.playerInfo.level + " " + this.name);
            var _color = this.getNameColor();
            this.nameColor = _color;
            this.ttfName.textColor = _color;
            // this.ttfName.anchorOffsetX = this.ttfName.width/2;
            this.ttfName.anchorOffsetY = this.ttfName.height / 2;
            this.titleSpace.addChild(this.ttfName);
        };
        StageSceneFightBoss.prototype.loadLvTitle = function () {
            this.cacheLv = this.playerInfo.level;
            var _text = ""; //"Lv"+ this.playerInfo.level;
            this.ttfLv = new eui.Label(_text);
            this.ttfLv.textColor = zj.ConstantConfig_Common.Color.white;
            this.ttfLv.anchorOffsetY = this.ttfLv.height / 2;
            this.titleSpace.addChild(this.ttfLv);
        };
        StageSceneFightBoss.prototype.updateZone = function () {
            var tag = false;
            if (this.x + this.bodyWidth / 2 >= 0 && this.y + this.bodyHeight >= 0 && this.x - this.bodyWidth / 2 <= zj.UIManager.StageWidth && this.y <= zj.UIManager.StageHeight) {
                tag = true;
            }
            this.bInZone = tag;
            if (this.bHidden == true) {
                return;
            }
            if (tag == false && this.bVisible == true) {
                this.setVisible(false);
            }
            else if (tag == true && this.bVisible == false && this.curScene.prepareTime <= 0) {
                this.setVisible(true);
            }
        };
        StageSceneFightBoss.prototype.getTouchRt = function () {
            var rt = [];
            for (var i = 0; i < this.tableTouchRt.length; i++) {
                if (this.dir == zj.TableEnum.TableEnumDir.Dir_Left) {
                    var tmp = new egret.Rectangle(this.x - this.tableTouchRt[i].x - this.tableTouchRt[i].width, this.y - this.tableTouchRt[i].y - this.tableTouchRt[i].height, this.tableTouchRt[i].width, this.tableTouchRt[i].height);
                    rt.push(tmp);
                }
                else if (this.dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                    var tmp = new egret.Rectangle(this.x + this.tableTouchRt[i].x, this.y - this.tableTouchRt[i].y - this.tableTouchRt[i].height, this.tableTouchRt[i].width, this.tableTouchRt[i].height);
                    rt.push(tmp);
                }
            }
            return rt;
        };
        StageSceneFightBoss.prototype.OnTouchDown = function (touch) {
            // if(this.otherState != TableEnum.TableEnumOtherState.OtherState_None){
            // 	return;
            // }
            var touchs = [touch.stageX - zj.Game.UIManager.x, touch.stageY];
            var tableSize = touchs.length;
            var touchRt = this.getTouchRt();
            var point = new egret.Point(touchs[0], touchs[1]);
            for (var i = 0; i < touchRt.length; i++) {
                if (touchRt[i].containsPoint(point)) {
                    return true;
                }
            }
            return false;
        };
        return StageSceneFightBoss;
    }(zj.StageSceneFightInLeauge));
    zj.StageSceneFightBoss = StageSceneFightBoss;
    __reflect(StageSceneFightBoss.prototype, "zj.StageSceneFightBoss");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightBoss.js.map