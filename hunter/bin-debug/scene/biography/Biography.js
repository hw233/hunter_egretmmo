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
     * @class 猎人传记
     *
     * @author LianLei
     *
     * @date 2019-10-24
     */
    var UI_STATE = {
        button_left1: 1,
        button_left2: 2,
        button_left3: 3,
        button_left4: 4
    };
    var Biography = (function (_super) {
        __extends(Biography, _super);
        function Biography() {
            var _this = _super.call(this) || this;
            _this.listHeroData = new eui.ArrayCollection();
            _this.listAwardData = new eui.ArrayCollection();
            _this.itemIndex = 0;
            _this.skinName = "resource/skins/biography/BiographySkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnDetails.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDetails, _this);
            _this.btnGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetAward, _this);
            _this.btnGetWay.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetWay, _this);
            _this.listHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onChangeHeroList, _this);
            for (var i = 1; i <= 4; i++) {
                _this["btnLeft" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this["onBtnLeft" + i], _this);
            }
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, _this.update, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POWER_CHANGE, _this.update, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.update, _this);
            _this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGold, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddStrength, _this);
            _this.init(1);
            _this.setButtonState();
            return _this;
        }
        Biography.prototype.onEntryTopScene = function () {
            this.setHeroList();
            this.setMissionInfo();
            this.setRedTip();
        };
        Biography.prototype.init = function (uiState) {
            this.itemIndex = 0;
            this.uiState = uiState;
            this.heroData = [];
            this.rewardData = [];
            for (var key in zj.TableSpgeneralInformation.Table()) {
                if (zj.TableSpgeneralInformation.Table().hasOwnProperty(key)) {
                    var element = zj.TableSpgeneralInformation.Table()[key];
                    if (element.task_type == uiState) {
                        this.heroData.push(element);
                    }
                }
            }
            for (var key in zj.TableSpgeneralReward.Table()) {
                if (zj.TableSpgeneralReward.Table().hasOwnProperty(key)) {
                    var element = zj.TableSpgeneralReward.Table()[key];
                    if (element.index.toString().substr(0, 1) == uiState.toString()) {
                        this.rewardData.push(element);
                    }
                }
            }
            this.setInfoList();
            this.setMissionInfo();
            this.setHeroDescription();
            this.setRedTip();
            this.update();
        };
        Biography.prototype.update = function () {
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                if (((zj.Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
                    this.labelGold.text = ((zj.Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
                }
                else {
                    this.labelGold.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.labelGold.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                if (((zj.Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.labelGemstone.text = ((zj.Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
                }
                else {
                    this.labelGemstone.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.labelGemstone.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            var str = "";
            if (zj.Game.PlayerInfoSystem.Power > 100000) {
                if (((zj.Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
                    str += ((zj.Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
                }
                else {
                    str += (zj.Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
                }
            }
            else {
                str += zj.Game.PlayerInfoSystem.Power.toString();
            }
            var str_energy = zj.Helper.StringFormat("%d/%d", str, (zj.TableLevel.Item(zj.Game.PlayerInfoSystem.Level).role_power + zj.PlayerVIPSystem.LowLevel().power_add));
            this.labelStrength.text = str_energy;
        };
        Biography.prototype.setInfoList = function () {
            this.setHeroList();
            this.setAwardList();
        };
        Biography.prototype.setHeroList = function () {
            this.listHeroData.removeAll();
            for (var i = 0; i < this.heroData.length; i++) {
                var itemData = new zj.BiographyHeroItemData();
                itemData.info = this.heroData[i];
                itemData.index = i;
                this.listHeroData.addItem(itemData);
            }
            this.listHero.itemRenderer = zj.BiographyHeroItem;
            this.listHero.dataProvider = this.listHeroData;
            this.listHero.selectedIndex = this.itemIndex;
        };
        Biography.prototype.setAwardList = function () {
            var awardIds = null;
            var awardCounts = null;
            for (var i = 0; i < this.rewardData.length; i++) {
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(this.rewardData[i].index) == -1) {
                    awardIds = this.rewardData[i].reward_goods;
                    awardCounts = this.rewardData[i].reward_count;
                    break;
                }
            }
            if (awardIds == null) {
                awardIds = this.rewardData[this.rewardData.length - 1].reward_goods;
                awardCounts = this.rewardData[this.rewardData.length - 1].reward_count;
            }
            var goodsInfo = [];
            for (var i = 0; i < awardIds.length; i++) {
                var info = new message.GoodsInfo();
                info.goodsId = awardIds[i];
                info.count = awardCounts[i];
                goodsInfo.push(info);
            }
            var gap = 6;
            this.scrollerAward.width = goodsInfo.length * 85 + gap * (goodsInfo.length - 1);
            this.listAwardData.removeAll();
            for (var i = 0; i < goodsInfo.length; i++) {
                var itemData = new zj.BiographyAwardItemData();
                itemData.goodsInfo = goodsInfo[i];
                this.listAwardData.addItem(itemData);
            }
            this.listAward.itemRenderer = zj.BiographyAwardItem;
            this.listAward.dataProvider = this.listAwardData;
        };
        Biography.prototype.onChangeHeroList = function (e) {
            if (e.itemIndex == this.itemIndex)
                return;
            var item = this.listHero.getElementAt(e.itemIndex);
            var data = this.listHeroData.getItemAt(e.itemIndex);
            this.listHeroData.itemUpdated(this.listHeroData.source[e.itemIndex]);
            this.listHeroData.itemUpdated(this.listHeroData.source[this.itemIndex]);
            this.itemIndex = e.itemIndex;
            this.setHeroDescription();
        };
        Biography.prototype.setMissionInfo = function () {
            var heroCount = 0;
            var own_count = 0;
            var missionNum = 0;
            var bAwardAll = false;
            for (var i = 0; i < this.rewardData.length; i++) {
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(this.rewardData[i].index) == -1) {
                    own_count = this.rewardData[i].own_count;
                    missionNum = i + 1;
                    this.missionIndex = this.rewardData[i].index;
                    break;
                }
            }
            if (own_count == 0) {
                own_count = this.rewardData[this.rewardData.length - 1].own_count;
            }
            for (var i = 0; i < this.heroData.length; i++) {
                if (zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(this.heroData[i].general_id) != -1) {
                    heroCount++;
                }
            }
            bAwardAll = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(this.rewardData[this.rewardData.length - 1].index) != -1; // 三个任务是否全部完成并领取奖励
            if (bAwardAll) {
                this.labelMissionNum.text = this.rewardData.length + "/" + this.rewardData.length;
            }
            else {
                this.labelMissionNum.text = missionNum + "/" + this.rewardData.length;
            }
            this.labelMissionInfo.text = "收集其中" + own_count + "种猎人";
            var num = heroCount >= own_count ? own_count : heroCount;
            this.labelMissionState.textColor = heroCount >= own_count ? 0x00FF00 : 0xFF0000;
            this.labelMissionState.text = "(" + num + "/" + own_count + ")";
            this.btnGetAward.enabled = heroCount >= own_count;
            this.btnGetAward.visible = !bAwardAll;
            this.imgGetAllAward.visible = bAwardAll;
        };
        Biography.prototype.setRedTip = function () {
            var _a = [[], [], [], []], heroData1 = _a[0], heroData2 = _a[1], heroData3 = _a[2], heroData4 = _a[3];
            var _b = [[], [], [], []], rewardData1 = _b[0], rewardData2 = _b[1], rewardData3 = _b[2], rewardData4 = _b[3];
            for (var key in zj.TableSpgeneralInformation.Table()) {
                if (zj.TableSpgeneralInformation.Table().hasOwnProperty(key)) {
                    var element = zj.TableSpgeneralInformation.Table()[key];
                    if (element.task_type == UI_STATE.button_left1)
                        heroData1.push(element);
                    if (element.task_type == UI_STATE.button_left2)
                        heroData2.push(element);
                    if (element.task_type == UI_STATE.button_left3)
                        heroData3.push(element);
                    if (element.task_type == UI_STATE.button_left4)
                        heroData4.push(element);
                }
            }
            for (var key in zj.TableSpgeneralReward.Table()) {
                if (zj.TableSpgeneralReward.Table().hasOwnProperty(key)) {
                    var element = zj.TableSpgeneralReward.Table()[key];
                    if (element.index.toString().substr(0, 1) == UI_STATE.button_left1.toString())
                        rewardData1.push(element);
                    if (element.index.toString().substr(0, 1) == UI_STATE.button_left2.toString())
                        rewardData2.push(element);
                    if (element.index.toString().substr(0, 1) == UI_STATE.button_left3.toString())
                        rewardData3.push(element);
                    if (element.index.toString().substr(0, 1) == UI_STATE.button_left4.toString())
                        rewardData4.push(element);
                }
            }
            var _c = [0, 0, 0, 0], heroCount1 = _c[0], heroCount2 = _c[1], heroCount3 = _c[2], heroCount4 = _c[3];
            var _d = [0, 0, 0, 0], own_count1 = _d[0], own_count2 = _d[1], own_count3 = _d[2], own_count4 = _d[3];
            var getRedTipVis = function (awardData, ownCount, heroData, heroCount) {
                for (var i = 0; i < awardData.length; i++) {
                    if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(awardData[i].index) == -1) {
                        ownCount = awardData[i].own_count;
                        break;
                    }
                }
                var awardlen = 0;
                for (var i = 0; i < awardData.length; i++) {
                    if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(awardData[i].index) != -1) {
                        awardlen++;
                    }
                }
                for (var i = 0; i < heroData.length; i++) {
                    if (zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(heroData[i].general_id) != -1) {
                        heroCount++;
                    }
                }
                return heroCount >= ownCount && awardlen != awardData.length;
            };
            this.imgRedTip1.visible = getRedTipVis(rewardData1, own_count1, heroData1, heroCount1);
            this.imgRedTip2.visible = getRedTipVis(rewardData2, own_count2, heroData2, heroCount2);
            this.imgRedTip3.visible = getRedTipVis(rewardData3, own_count3, heroData3, heroCount3);
            this.imgRedTip4.visible = getRedTipVis(rewardData4, own_count4, heroData4, heroCount4);
        };
        Biography.prototype.setHeroDescription = function () {
            var hunterBaseInfo = (this.heroData[this.listHero.selectedIndex]);
            if (hunterBaseInfo == null)
                return;
            this.imgHeroType.source = zj.cachekey(hunterBaseInfo.general_type_path, this);
            this.labelHeroName.text = hunterBaseInfo.general_name;
            this.labelUserExperience.text = hunterBaseInfo.general_technique;
            this.labelRoleDefinition.text = hunterBaseInfo.general_des;
        };
        Biography.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Biography.prototype.onBtnDetails = function () {
            var _this = this;
            zj.loadUI(zj.Biographyinfo).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(_this.heroData[_this.listHero.selectedIndex]);
            });
        };
        Biography.prototype.onBtnGetWay = function () {
            var _this = this;
            zj.loadUI(zj.Common_OutPutDialog).then(function (dialog) {
                var any = _this.heroData[_this.listHero.selectedIndex].general_id;
                dialog.setInfo(_this.heroData[_this.listHero.selectedIndex].general_id, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        Biography.prototype.setButtonState = function () {
            for (var i = 1; i <= zj.Helper.getObjLen(UI_STATE); i++) {
                if (i == UI_STATE.button_left1) {
                    this["btnLeft" + i].enabled = false;
                    this.imgBanner.source = zj.cachekey("ui_acitivity_biography_banner" + UI_STATE.button_left1 + "_png", this);
                    this.labelTeamRecommended.text = "秒杀清场，打断控制，副本畅通无阻！";
                }
                else {
                    this["btnLeft" + i].enabled = true;
                }
            }
        };
        Biography.prototype.onBtnGetAward = function () {
            var self = this;
            zj.Game.PlayerActivitySystem.sPgeneralReward(this.missionIndex).then(function (resp) {
                zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.init(resp.getGoods);
                    dialog.setCB(function () {
                        self.setInfoList();
                        self.setMissionInfo();
                        self.setRedTip();
                        zj.Tips.SetTipsOfId(zj.Tips.TAG.Biography);
                    });
                });
            });
        };
        Biography.prototype.onBtnLeft1 = function () {
            this.scrollerHero.stopAnimation();
            for (var i = 1; i <= zj.Helper.getObjLen(UI_STATE); i++) {
                if (i == UI_STATE.button_left1) {
                    this["btnLeft" + i].enabled = false;
                    continue;
                }
                this["btnLeft" + i].enabled = true;
            }
            this.init(UI_STATE.button_left1);
            this.imgBanner.source = zj.cachekey("ui_acitivity_biography_banner" + UI_STATE.button_left1 + "_png", this);
            this.labelTeamRecommended.text = "秒杀清场，打断控制，副本畅通无阻！";
        };
        Biography.prototype.onBtnLeft2 = function () {
            this.scrollerHero.stopAnimation();
            for (var i = 1; i <= zj.Helper.getObjLen(UI_STATE); i++) {
                if (i == UI_STATE.button_left2) {
                    this["btnLeft" + i].enabled = false;
                    continue;
                }
                this["btnLeft" + i].enabled = true;
            }
            this.init(UI_STATE.button_left2);
            this.imgBanner.source = zj.cachekey("ui_acitivity_biography_banner" + UI_STATE.button_left2 + "_png", this);
            this.labelTeamRecommended.text = "浮空沉默，致命毒伤，流星街boss克星！";
        };
        Biography.prototype.onBtnLeft3 = function () {
            this.scrollerHero.stopAnimation();
            for (var i = 1; i <= zj.Helper.getObjLen(UI_STATE); i++) {
                if (i == UI_STATE.button_left3) {
                    this["btnLeft" + i].enabled = false;
                    continue;
                }
                this["btnLeft" + i].enabled = true;
            }
            this.init(UI_STATE.button_left3);
            this.imgBanner.source = zj.cachekey("ui_acitivity_biography_banner" + UI_STATE.button_left3 + "_png", this);
            this.labelTeamRecommended.text = "加速控制，高额输出，天空竞技场所向披靡！";
        };
        Biography.prototype.onBtnLeft4 = function () {
            this.scrollerHero.stopAnimation();
            for (var i = 1; i <= zj.Helper.getObjLen(UI_STATE); i++) {
                if (i == UI_STATE.button_left4) {
                    this["btnLeft" + i].enabled = false;
                    continue;
                }
                this["btnLeft" + i].enabled = true;
            }
            this.init(UI_STATE.button_left4);
            this.imgBanner.source = zj.cachekey("ui_acitivity_biography_banner" + UI_STATE.button_left4 + "_png", this);
            this.labelTeamRecommended.text = "多段加速，免疫恢复，配合爆发输出，助你成为最强王者！";
        };
        //添加金币
        Biography.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog).then(function (dialog) {
                dialog.SetInfoList(true);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        Biography.prototype.onBtnAddGemstone = function () {
            // toast_success("加钻石功能未开启");
            zj.loadUI(zj.PayMallScene).then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(true);
            });
        };
        Biography.prototype.onBtnAddStrength = function () {
            //增加体力
            zj.loadUI(zj.HXH_HunterUserStrength).then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        Biography.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show)
                this.removeChild(show);
        };
        Biography.prototype.showGoodsProperty = function (ev) {
            if (zj.Game.UIManager.dialogCount() > 0)
                return;
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return Biography;
    }(zj.Scene));
    zj.Biography = Biography;
    __reflect(Biography.prototype, "zj.Biography");
})(zj || (zj = {}));
//# sourceMappingURL=Biography.js.map