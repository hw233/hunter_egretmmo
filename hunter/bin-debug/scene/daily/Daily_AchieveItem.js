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
    /**
     * 成就任务Item
     * created by Lian Lei
     * 2019.03.19
     */
    var Daily_AchieveItem = (function (_super) {
        __extends(Daily_AchieveItem, _super);
        function Daily_AchieveItem() {
            var _this = _super.call(this) || this;
            _this.lock = [];
            _this.complete = [];
            _this.listViewAwardData = new eui.ArrayCollection();
            _this.setInfoGet = function () {
                egret.Tween.get(_this.groupAll)
                    .to({ x: _this.x + _this.width }, 500, egret.Ease.backInOut)
                    .to({ x: 0 }, 500, egret.Ease.backInOut)
                    .call(function () {
                    _this.data.father.setInfo();
                });
            };
            _this.skinName = "resource/skins/daily/Daily_AchieveItemSkin.exml";
            _this.groupGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            zj.cachekeys(zj.UIResource["Daily_AchieveItem"], null);
            _this.init();
            return _this;
        }
        Daily_AchieveItem.prototype.init = function () {
            this.lock = [this.labelLevel, this.imgMask, this.imgLock];
            this.complete = [this.imgAward1, this.listViewAward, this.labelCount];
            this.scrollerViewAward.mask = this.imgScroMask;
            this.imgBar.mask = this.rectMask;
        };
        Daily_AchieveItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Daily_AchieveItem.prototype.updateView = function (data) {
            this.indexId = data.indexId;
            this.refreshInfo();
        };
        Daily_AchieveItem.prototype.refreshInfo = function () {
            if (this.saveIndexId != null &&
                this.saveMissionId != null &&
                this.saveIndexId == this.indexId &&
                this.saveMissionId != zj.Game.PlayerMissionSystem.missionMap[this.indexId].missionId) {
                this.setInfoCome();
            }
            else if (this.saveIndexId != null && this.saveMissionId != null && this.saveIndexId != this.indexId) {
                this.setInfoNew();
            }
            else {
                this.setInfoMission();
            }
            this.saveIndexId = this.indexId;
            this.saveMissionId = zj.Game.PlayerMissionSystem.missionMap[this.indexId].missionId;
        };
        Daily_AchieveItem.prototype.setInfoCome = function () {
            this.setInfoMission();
            egret.Tween.get(this).to({ x: this.x + this.width }, 500, egret.Ease.backInOut);
        };
        Daily_AchieveItem.prototype.setInfoNew = function () {
            this.setInfoMission();
        };
        Daily_AchieveItem.prototype.setInfoMission = function () {
            var mission = zj.Game.PlayerMissionSystem.missionMap[this.indexId];
            var tbl = zj.Game.PlayerMissionSystem.itemInfo(mission.missionId);
            var tblType = zj.Game.PlayerMissionSystem.itemType(mission.type, mission.subType);
            // let isLock = tblType.open_level > Game.PlayerInfoSystem.BaseInfo.level;
            var _a = zj.Game.PlayerMissionSystem.itemComplete(this.indexId), isdo = _a[0], todo = _a[1], isLock = _a[2], isOver = _a[3], percent = _a[4];
            var isNotGet;
            if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_STAR) {
                isNotGet = (isdo == todo && !mission.isFinish && tblType.open_level <= zj.Game.PlayerInfoSystem.BaseInfo.level);
            }
            else {
                isNotGet = (isdo >= todo && !mission.isFinish && tblType.open_level <= zj.Game.PlayerInfoSystem.BaseInfo.level);
            }
            var strName = zj.Helper.StringFormat("%s", tbl.name);
            var strDes = zj.Helper.StringFormat("%s", zj.yuan3(isOver, zj.TextsConfig.TextsConfig_Daily.over, tbl.des));
            var strDo = zj.Helper.StringFormat("%d/%d", isdo, todo);
            var strLock = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Daily.lock, tblType.open_level);
            // this.imgBar.width = 422 * percent;
            this.rectMask.width = 422 * percent;
            this.labelName.text = strName;
            this.labelContent.text = strDes;
            this.labelCount.text = strDo;
            this.imgDone.visible = isOver;
            this.lock[0].text = strLock;
            this.groupGet.touchEnabled = isNotGet;
            this.imgGet.visible = isNotGet;
            for (var i = 0; i < this.lock.length; i++) {
                this.lock[i].visible = isLock;
            }
            for (var i = 0; i < this.complete.length; i++) {
                this.complete[i].visible = !isOver;
            }
            var goods = [];
            for (var i = 0; i < tbl.reward_goods.length; i++) {
                goods.push([]);
            }
            for (var i = 0; i < tbl.reward_goods.length; i++) {
                var v = tbl.reward_goods[i];
                if (goods.length == 1) {
                    goods[i].push(v[0], v[1]);
                }
                else {
                    for (var j = 0; j < tbl.reward_goods[i].length; j++) {
                        goods[i].push(v[j]);
                    }
                }
            }
            this.listViewAwardData.removeAll();
            for (var i = 0; i < goods.length; i++) {
                var itemData = new zj.Daily_AwardItemData();
                itemData.goodsId = goods[i][0];
                itemData.count = goods[i][1];
                itemData.father = this;
                itemData.Ffather = this.data.father;
                itemData.type = itemData.CurState.daily_achieve;
                this.listViewAwardData.addItem(itemData);
            }
            this.listViewAward.dataProvider = this.listViewAwardData;
            this.listViewAward.itemRenderer = zj.Daily_AwardItem;
        };
        Daily_AchieveItem.prototype.onBtnGet = function () {
            var _this = this;
            var mission = zj.Game.PlayerMissionSystem.missionMap[this.indexId];
            var tbl = zj.Game.PlayerMissionSystem.itemInfo(mission.missionId);
            var tblType = zj.Game.PlayerMissionSystem.itemType(mission.type, mission.subType);
            var _a = zj.Game.PlayerMissionSystem.itemComplete(this.indexId), isdo = _a[0], todo = _a[1], isLock = _a[2], isOver = _a[3], percent = _a[4];
            var isNotGet;
            if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_STAR) {
                isNotGet = (isdo == todo && !mission.isFinish && tblType.open_level <= zj.Game.PlayerInfoSystem.BaseInfo.level);
            }
            else {
                isNotGet = (isdo >= todo && !mission.isFinish && tblType.open_level <= zj.Game.PlayerInfoSystem.BaseInfo.level);
            }
            if (!isNotGet)
                return;
            zj.Game.PlayerMissionSystem.ReqReward(mission.type, mission.subType)
                .then(function (value) {
                zj.Game.PlayerInstanceSystem.canSyncLevel = false;
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init(value.body.gameInfo.getGoods);
                    dialog.setCB(function () {
                        _this.setInfoGet();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            })
                .catch(function (reason) {
                // toast_warning(Helper.GetErrorString(reason));
            });
        };
        return Daily_AchieveItem;
    }(eui.ItemRenderer));
    zj.Daily_AchieveItem = Daily_AchieveItem;
    __reflect(Daily_AchieveItem.prototype, "zj.Daily_AchieveItem");
    var Daily_AchieveItemData = (function () {
        function Daily_AchieveItemData() {
        }
        return Daily_AchieveItemData;
    }());
    zj.Daily_AchieveItemData = Daily_AchieveItemData;
    __reflect(Daily_AchieveItemData.prototype, "zj.Daily_AchieveItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Daily_AchieveItem.js.map