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
    //RelicMain (遗迹探索)排行榜
    //hexiaowei
    // 2019/03/06
    var RelicRank = (function (_super) {
        __extends(RelicRank, _super);
        function RelicRank() {
            var _this = _super.call(this) || this;
            _this.rankMyCache = [];
            _this.rankCache = [];
            _this.selectedIndex = 0;
            _this.skinName = "resource/skins/darkLand/RelicRankSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonWorld.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonWorld, _this);
            _this.buttonServer.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonServer, _this);
            _this.button = [_this.buttonWorld, _this.buttonServer];
            _this.listViewRank.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onListRankTap, _this);
            _this.inIt();
            return _this;
        }
        RelicRank.prototype.inIt = function () {
            this.rankType = 1;
            this.setMyBaseInfo();
        };
        RelicRank.prototype.setMyBaseInfo = function () {
            this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picFrameId), this);
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
            this.LabelName.text = zj.Game.PlayerInfoSystem.BaseInfo.name;
            this.labelValue.text = "";
        };
        RelicRank.prototype.setInfo = function (relicId) {
            this.relicId = relicId;
            this.setButtonState();
            this.relicRankInfo();
            this.buttonServer.visible;
        };
        RelicRank.prototype.setButtonState = function () {
            if (this.rankType == 1) {
                this.buttonWorld.visible = false;
                this.buttonWorld.enabled = false;
                this.imageWorld.visible = true;
                this.imageServer.visible = false;
                this.buttonServer.enabled = true;
                this.buttonServer.visible = true;
            }
            else {
                this.buttonWorld.visible = true;
                this.buttonWorld.enabled = true;
                this.imageWorld.visible = false;
                this.imageServer.visible = true;
                this.buttonServer.enabled = false;
                this.buttonServer.visible = false;
            }
            // for(const k in this.button){
            //      const v = this.button[k];
            //      if(Number( k) != (this.rankType - 1)){
            //          v.enabled = false;
            //          v.visible = false;
            //          this.imageWorld.visible = true;
            //      }
            //      v.enabled = Number( k) != this.rankType;
            // }
        };
        RelicRank.prototype.setInfoListAndMy = function () {
            this.listViewRank.selectedIndex = 0; // 默认选中
            this.listViewRank.itemRenderer = zj.RelicRankList; //
            this.selectedItem = new eui.ArrayCollection();
            for (var k in this.rankCache[this.rankType]) {
                var v = this.rankCache[this.rankType][k];
                var data = new zj.RelicRankListData();
                data.index = Number(k);
                data.tableRankBase = v;
                data.father = this;
                this.selectedItem.addItem(data);
            }
            this.listViewRank.dataProvider = this.selectedItem;
            this.selectedIndex = this.listViewRank.selectedIndex;
            var hurtPic = zj.UIConfig.UIConfig_DarkLand.relicHurtLevel2[zj.PlayerDarkSystem.GetLevelByHurt(this.relicId, this.rankMyCache[this.rankType].value)];
            this.imageHurt.source = zj.cachekey(hurtPic, this);
            var groupName = this.GetServerName(zj.Game.Controller.selectedGroup().group_name);
            if (this.rankType == 1) {
                this.labelValue.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, groupName[0], groupName[1]);
            }
            else {
                this.labelValue.text = zj.Game.PlayerInfoSystem.BaseInfo.leagueName;
            }
            if (this.rankMyCache[this.rankType].rank == 0 || this.rankMyCache[this.rankType].rank >= 50) {
                this.labelLevelRanking.text = zj.TextsConfig.TextsConfig_WonderlandBoss.disAttend;
            }
            else {
                this.labelLevelRanking.text = this.rankMyCache[this.rankType].rank;
            }
        };
        RelicRank.prototype.relicRankInfo = function () {
            var _this = this;
            zj.PlayerDarkSystem.GetServerRankInfo(this.relicId, this.rankType)
                .then(function (data) {
                if (data.sign == 0) {
                    return;
                }
                if (data.body.rankInfo.length > 0) {
                    if (data.body.rankInfo[data.body.rankInfo.length - 1].baseInfo.id == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                        _this.rankMyCache[_this.rankType] = data.body.rankInfo[data.body.rankInfo.length - 1];
                    }
                }
                _this.rankCache[_this.rankType] = [];
                for (var k in data.body.rankInfo) {
                    var v = data.body.rankInfo[k];
                    if (v.value != 0 && Number(k) != (data.body.rankInfo.length - 1)) {
                        _this.rankCache[_this.rankType].push(v);
                    }
                }
                _this.rankCache[_this.rankType].sort(function (a, b) { return b.value - a.value; });
                _this.setInfoListAndMy();
            })
                .catch(function (reason) { });
        };
        RelicRank.prototype.onListRankTap = function (e) {
            var data = this.selectedItem.getItemAt(e.itemIndex);
            zj.loadUI(zj.RankDetail).then(function (ui) {
                ui.setInfo(data.tableRankBase.baseInfo);
                ui.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        RelicRank.prototype.onButtonWorld = function () {
            this.rankType = 1;
            if (this.rankCache[this.rankType] == null) {
                this.relicRankInfo();
            }
            else {
                this.setInfoListAndMy();
            }
            this.setButtonState();
        };
        RelicRank.prototype.onButtonServer = function () {
            this.rankType = 2;
            if (this.rankCache[this.rankType] == null) {
                this.relicRankInfo();
            }
            else {
                this.setInfoListAndMy();
            }
            this.setButtonState();
        };
        RelicRank.prototype.GetServerName = function (str) {
            if (str.indexOf("{") == -1)
                return str;
            var json = JSON.parse(str);
            if (!json)
                return "";
            var lang = zj.Game.LanguageManager.getLang().replace("-", "").toLowerCase();
            if (json[lang] == null || json[lang] == undefined)
                return "";
            var arr = json[lang].split("&");
            if (arr && arr.length >= 2)
                return arr;
            return "";
        };
        RelicRank.prototype.onButtonClose = function () {
            this.close();
        };
        return RelicRank;
    }(zj.Dialog));
    zj.RelicRank = RelicRank;
    __reflect(RelicRank.prototype, "zj.RelicRank");
})(zj || (zj = {}));
//# sourceMappingURL=RelicRank.js.map