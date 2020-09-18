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
    //  wangshenzhuo
    //  2019-7-17
    //  HXH_StoryInstanceMain
    var StoryInstanceMainScene = (function (_super) {
        __extends(StoryInstanceMainScene, _super);
        function StoryInstanceMainScene() {
            var _this = _super.call(this) || this;
            _this.data_list = [];
            _this.type_list = [];
            _this.cur_sel = 0;
            _this.cur_info = [];
            _this.skinName = "resource/skins/storyHunter/StoryInstanceMainSceneSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchEndRemoveShowSkill, _this);
            _this.listSelectInstance.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onListInstance, _this);
            _this.buttonMall.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonMall, _this);
            _this.buttonStart.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonStart, _this);
            return _this;
        }
        StoryInstanceMainScene.prototype.Init = function () {
            this.SetInit();
            this.SetList();
            this.SetSelect(0);
        };
        StoryInstanceMainScene.prototype.SelAndOpen = function () {
            for (var i = 0; i < this.data_list.length; i++) {
                if (this.data_list[i].index == zj.Game.PlayerInstanceSystem.activityBattleIndex) {
                    this.SetSelect(i);
                    this.onButtonStart();
                }
            }
        };
        StoryInstanceMainScene.prototype.SetInit = function () {
            this.data_list = zj.otherdb.getActivityBattle();
            this.type_list = [];
            var curTime = zj.Game.Controller.serverNow();
            var curServerTime = Date.parse(curTime.toString()) / 1000;
            zj.Table.Sort(this.data_list, function (a, b) {
                if (a.openTime < curServerTime && a.closeTime > curServerTime && b.openTime < curServerTime && b.closeTime > curServerTime) {
                    if (a.openTime == b.openTime) {
                        return a.index - b.index;
                    }
                    else {
                        return b.index - a.index;
                    }
                }
                else if (a.openTime < curServerTime && a.closeTime > curServerTime) {
                    return true;
                }
                else if (b.openTime < curServerTime && b.closeTime > curServerTime) {
                    return false;
                }
                else if (a.closeTime < curServerTime && a.stopTime > curServerTime && b.closeTime < curServerTime && b.stopTime > curServerTime) {
                    if (a.closeTime == b.closeTime) {
                        return a.index - b.index;
                    }
                    else {
                        return b.closeTime - a.closeTime;
                    }
                }
                else if (a.closeTime < curServerTime && a.stopTime > curServerTime) {
                    return true;
                }
                else if (b.closeTime < curServerTime && b.stopTime > curServerTime) {
                    return false;
                }
                else if (a.openTime > curServerTime && b.openTime > curServerTime) {
                    if (a.openTime == b.openTime) {
                        return a.index - b.index;
                    }
                    else {
                        return b.openTime - a.openTime;
                    }
                }
                else if (a.openTime > curServerTime) {
                    return true;
                }
                else if (b.openTime > curServerTime) {
                    return false;
                }
                else {
                    return a.index - b.index;
                }
            });
        };
        StoryInstanceMainScene.prototype.SetList = function () {
            this.listSelectInstance.itemRenderer = zj.StoryInstanceMainItem;
            this.listSelectInstance.selectedIndex = 0;
            this.listItem = new eui.ArrayCollection();
            for (var k in this.data_list) {
                var v = this.data_list[k];
                var data = new zj.StoryInstanceMainItemData();
                data.info = v;
                data.index = Number(k);
                data.father = this;
                this.listItem.addItem(data);
            }
            this.listSelectInstance.dataProvider = this.listItem;
            this.listItemIndex = this.listSelectInstance.selectedIndex;
        };
        StoryInstanceMainScene.prototype.onListInstance = function (e) {
            if (this.listItemIndex == this.listSelectInstance.selectedIndex) {
                return;
            }
            if (this.listItemIndex != this.listSelectInstance.selectedIndex) {
                this.listItem.itemUpdated(this.listItem.source[this.listItemIndex]);
                this.listItem.itemUpdated(this.listItem.source[this.listSelectInstance.selectedIndex]);
                this.listItemIndex = this.listSelectInstance.selectedIndex;
            }
            this.SetRightInfo();
        };
        StoryInstanceMainScene.prototype.SetSelect = function (sel) {
            this.cur_sel = sel;
            this.SetRightInfo();
        };
        StoryInstanceMainScene.prototype.SetRightInfo = function () {
            this.cur_info = this.data_list[this.cur_sel];
            this.cur_table = zj.TableActivityBattle.Item(this.cur_info["buffValue"]);
            this.max_star = this.cur_table.instance_pack.length * 3;
            this.cur_star = zj.otherdb.ActivityBattleGetCurStar(this.cur_info);
            this.imageBG.source = zj.cachekey(this.cur_table.instance_bg, this);
            this.imageRole.source = zj.cachekey(this.cur_table.instance_half, this);
            this.labelProgressNormal.text = this.cur_star + "/" + this.max_star;
            var size_bar = this.cur_star / this.max_star;
            this.imageBurNormal2.scaleX = size_bar;
            this.imageBurNormal2.mask = this.imageBurNormal;
            this.listHunterIconA.itemRenderer = zj.HXH_InstanceAwardItem;
            var listIconAItem = new eui.ArrayCollection();
            for (var i = 0; i < this.cur_table.extra_general[0].length; i++) {
                var data = new zj.HXH_InstanceAwardItemData();
                data.info = this.cur_table.extra_general[0][i];
                data.father = this;
                data.scale = 0.8;
                listIconAItem.addItem(data);
            }
            this.listHunterIconA.dataProvider = listIconAItem;
            this.listHunterIconB.itemRenderer = zj.HXH_InstanceAwardItem;
            var listIconBItem = new eui.ArrayCollection();
            for (var i = 0; i < this.cur_table.extra_general[1].length; i++) {
                var data = new zj.HXH_InstanceAwardItemData();
                data.info = this.cur_table.extra_general[1][i];
                data.father = this;
                data.scale = 0.8;
                listIconBItem.addItem(data);
            }
            this.listHunterIconB.dataProvider = listIconBItem;
            this.listBuffA.itemRenderer = zj.StoryInstanceMainBuff;
            var listbuffAItem = new eui.ArrayCollection();
            for (var i = 0; i < this.cur_table.extra_reward1.length; i++) {
                var data = new zj.StoryInstanceMainBuffData();
                data.id = i;
                data.goodsId = this.cur_table.extra_reward1[i][0];
                data.father = this;
                data.per = this.cur_table.extra_reward1[i][1];
                listbuffAItem.addItem(data);
            }
            this.listBuffA.dataProvider = listbuffAItem;
            this.listBuffB.itemRenderer = zj.StoryInstanceMainBuff;
            var listbuffBItem = new eui.ArrayCollection();
            for (var i = 0; i < this.cur_table.extra_reward2.length; i++) {
                var data = new zj.StoryInstanceMainBuffData();
                data.id = i;
                data.goodsId = this.cur_table.extra_reward2[i][0];
                data.father = this;
                data.per = this.cur_table.extra_reward2[i][1];
                listbuffBItem.addItem(data);
            }
            this.listBuffB.dataProvider = listbuffBItem;
            var str_open = zj.Set.TimeForMail(this.cur_info["openTime"]);
            ;
            var str_close = zj.Set.TimeForMail(this.cur_info["closeTime"]);
            ;
            this.labelStoryDuration.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.timeOpenAndClose, str_open, str_close);
            this.labelTimeLeft.visible = false;
            var curTime = zj.Game.Controller.serverNow();
            var curServerTime = Date.parse(curTime.toString()) / 1000;
            if ((this.cur_info["closeTime"] - curServerTime) > 0 && this.cur_info["openTime"] < curServerTime) {
                this.labelTimeLeft.visible = true;
                var timems = this.cur_info["closeTime"] - curServerTime;
                this.labelTimeLeft.text = zj.TextsConfig.TextsConfig_Activity.battleLeftDes + zj.Helper.FormatDaysTimeCh(timems);
            }
        };
        // 鼠标抬起移除技能详情
        StoryInstanceMainScene.prototype.touchEndRemoveShowSkill = function () {
            var show = this.getChildByName("skill");
            if (show)
                this.removeChild(show);
            var award = this.getChildByName("award");
            if (award)
                this.removeChild(award);
        };
        StoryInstanceMainScene.prototype.onButtonMall = function () {
            var _this = this;
            var curTime = zj.Game.Controller.serverNow();
            var curServerTime = Date.parse(curTime.toString()) / 1000;
            if (this.cur_info["stopTime"] < curServerTime) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.battleStop);
            }
            else if (this.cur_info["openTime"] > curServerTime) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.battleNotStart);
            }
            else {
                zj.loadUI(zj.StoryInstanceMall)
                    .then(function (scene) {
                    scene.Load(_this.cur_info);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        StoryInstanceMainScene.prototype.onButtonStart = function () {
            var _this = this;
            var curTime = zj.Game.Controller.serverNow();
            var curServerTime = Date.parse(curTime.toString()) / 1000;
            if (this.cur_info["closeTime"] < curServerTime) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.battleStop);
            }
            else if (this.cur_info["openTime"] > curServerTime) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.battleNotStart);
            }
            else {
                zj.loadUI(zj.StoryInstanceSelectStage)
                    .then(function (scene) {
                    scene.Init();
                    scene.Load(_this.cur_info);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        StoryInstanceMainScene.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return StoryInstanceMainScene;
    }(zj.Scene));
    zj.StoryInstanceMainScene = StoryInstanceMainScene;
    __reflect(StoryInstanceMainScene.prototype, "zj.StoryInstanceMainScene");
})(zj || (zj = {}));
//# sourceMappingURL=StoryInstanceMainScene.js.map