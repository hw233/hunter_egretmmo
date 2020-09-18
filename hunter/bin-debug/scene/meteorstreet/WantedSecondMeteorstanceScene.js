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
    //WantedSecondMeteorstanceScene
    //hexiaowei
    // 2019/02/12
    var WantedSecondMeteorstanceScene = (function (_super) {
        __extends(WantedSecondMeteorstanceScene, _super);
        function WantedSecondMeteorstanceScene() {
            var _this = _super.call(this) || this;
            _this.cost_id = [message.EResourceType.RESOURCE_WANTED_COIN, message.EResourceType.RESOURCE_ARREST_COIN, message.EResourceType.RESOURCE_HUNT_COIN];
            _this.coststr = ["wanted_time", "arrest_time", "hunt_time"];
            _this.MAX_BOSS_NUM = message.EWantedType.WANTED_TYPE_END - 1;
            _this.floorInfo = [];
            _this.selectedBossIndex = 0;
            _this.listBossIndex = 0;
            _this.listBossAwardIndex = 0;
            _this.chooseIndex = 0;
            _this.startIndex = 0;
            _this.highHandIndex = 0;
            _this.technique_id = 0;
            _this.AwardmoveLocation = 0;
            _this.chooselist = [];
            _this.timenpc = [];
            _this.itemList = [];
            _this.skinName = "resource/skins/meteorstreet/WantedSecondMeteorstanceSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.buttonReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.listSelectedBoss.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.buttonSelectedBossCallBack, _this);
            //首杀奖励
            _this.groupAnimate.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.ongroupAnimate, _this);
            _this.groupAnimate.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveGroup, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveGroup, _this);
            //挑战消耗物品卡
            _this.imageIconMeterials.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.ongroupMeterials, _this);
            _this.imageIconMeterials.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveGroup, _this);
            _this.buttonElites.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonElitesClicked, _this);
            _this.buttonElitesA.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonBattleClicked, _this);
            _this.buttonStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonBattleClicked, _this);
            _this.listBoss.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.buttonState, _this);
            _this.listBossAward.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.buttonAward, _this);
            _this.groupNpc.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupDialogue, _this);
            _this.buttonAddpower.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonAddpower, _this);
            _this.buttonAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POWER_CHANGE, _this.setInfoUpdate, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.setInfoUpdate, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            _this.buttonPlan.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonPlan, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.groupTalk);
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            //遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.scaleX = 0.8;
            _this.imgMask.scaleY = 0.8;
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupAnimate.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(83, 84);
            _this.rectMaskCommon.scaleX = 0.8;
            _this.rectMaskCommon.scaleY = 0.8;
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupAnimate.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            _this.common_DesRes = new zj.Common_DesRes();
            _this.groupFirstBlood.addChild(_this.common_DesRes);
            _this.common_DesRes.visible = false;
            //挑战消耗物品卡
            _this.common_DesProp = new zj.Common_DesProp();
            _this.groupConsume.addChild(_this.common_DesProp);
            _this.common_DesProp.visible = false;
            _this.widthhight();
            _this.setNewOpenState(1, false);
            zj.Game.TeachSystem.battleEndOpenTeach = true;
            return _this;
        }
        WantedSecondMeteorstanceScene.prototype.Init = function (index) {
            this.setInfoUpdate();
            this.setInfoBossList(index);
        };
        WantedSecondMeteorstanceScene.prototype.widthhight = function () {
            if (this.width >= 1344) {
                this.imageBackGroud.scaleX = this.width / 1334;
            }
        };
        WantedSecondMeteorstanceScene.prototype.ongroupAnimate = function () {
            var _this = this;
            var _type = zj.PlayerItemSystem.ItemType(this.itemId);
            message.EGoodsType.GOODS_TYPE_GENERAL;
            var dialog = this.groupFirstBlood.getChildByName("Item-skill-common");
            if (dialog)
                this.groupFirstBlood.removeChild(dialog);
            if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(_this.itemId, _this.itemCount);
                    _this.groupFirstBlood.addChild(dialog);
                });
            }
            else {
                zj.loadUI(zj.Common_DesProp).then(function (dialog) {
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(_this.itemId, _this.itemCount);
                    _this.groupFirstBlood.addChild(dialog);
                });
            }
        };
        WantedSecondMeteorstanceScene.prototype.onRemoveAnimate = function () {
            var dialog = this.groupFirstBlood.getChildByName("Item-skill-common");
            if (dialog)
                this.groupFirstBlood.removeChild(dialog);
        };
        WantedSecondMeteorstanceScene.prototype.ongroupMeterials = function () {
            this.common_DesProp.visible = true;
        };
        WantedSecondMeteorstanceScene.prototype.onRemoveGroup = function () {
            this.common_DesRes.visible = false;
            this.common_DesProp.visible = false;
            this.up();
            this.onRemoveAward();
            this.onRemoveAnimate();
        };
        //添加龙骨动画
        WantedSecondMeteorstanceScene.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.7;
                display.scaleY = 0.7;
                group.addChild(display);
                _this.generalKeelAnimation = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        // 推荐上阵列表显示
        WantedSecondMeteorstanceScene.prototype.setInfo = function (index) {
            var headPath = [];
            for (var k in this.roleInfo) {
                var v = this.roleInfo[k];
                var path = zj.TableMapRole.Item(v).head_path;
                headPath.push(path);
            }
            this.technique_id = index;
            var floor_id = index * 10000 + 1;
            var floor_info = zj.otherdb.WantedInstance(floor_id);
            //推荐上阵
            var technique = floor_info.technique;
            this.listSysTeam.selectedIndex = 0; // 默认选中
            this.listSysTeam.itemRenderer = zj.WantedSecondMeteorlnstance; //
            this.highHandItem = new eui.ArrayCollection();
            for (var i = 0; i < technique.length; i++) {
                var data = new zj.WantedSecondMeteorlnstanceData();
                data.father = this;
                data.index = technique[i];
                data.id = i;
                this.highHandItem.addItem(data);
            }
            this.listSysTeam.dataProvider = this.highHandItem;
            this.highHandIndex = this.listSysTeam.selectedIndex;
        };
        //推荐上阵 信息显示
        WantedSecondMeteorstanceScene.prototype.onItemTap = function (isTouchBegin, data) {
            var _this = this;
            var dialog = this.groupRightNew.getChildByName("hunter-skill-commondesgeneral");
            if (dialog)
                this.groupRightNew.removeChild(dialog);
            if (isTouchBegin) {
                zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                    if (data.id == 0) {
                        dialog.x = -125;
                        dialog.y = -82;
                    }
                    else if (data.id == 1) {
                        dialog.x = -55;
                        dialog.y = -82;
                    }
                    else if (data.id == 2) {
                        dialog.x = 25;
                        dialog.y = -83;
                    }
                    else if (data.id == 3) {
                        dialog.x = 100;
                        dialog.y = -83;
                    }
                    dialog.name = "hunter-skill-commondesgeneral";
                    var floor_id = _this.technique_id * 10000 + 1;
                    var floor_info = zj.otherdb.WantedInstance(floor_id);
                    var technique = floor_info.technique;
                    dialog.setInfo(technique[data.id], 1);
                    _this.groupRightNew.addChild(dialog);
                });
            }
        };
        /**抬起移除 推荐上阵 详情 */
        WantedSecondMeteorstanceScene.prototype.up = function () {
            var dialog = this.groupRightNew.getChildByName("hunter-skill-commondesgeneral");
            if (dialog)
                this.groupRightNew.removeChild(dialog);
        };
        // 鼠标点击 提示通关材料的说明
        WantedSecondMeteorstanceScene.prototype.onChooseItemTap = function (isTouchBegin, data) {
            var _this = this;
            var _type = zj.PlayerItemSystem.ItemType(data.tableWanted.goodsId);
            message.EGoodsType.GOODS_TYPE_GENERAL;
            var dialog = this.groupAward.getChildByName("Item-skill-common");
            if (dialog)
                this.groupAward.removeChild(dialog);
            var listnum = this.scrollerRewards.viewport.scrollH; //列表滑动位置
            var distance = 0;
            if (this.chooselist.length < 3) {
                if (this.chooselist.length == 1) {
                    distance = listnum - 84 * data.index - 105;
                }
                else {
                    distance = listnum - 84 * data.index - 60;
                }
            }
            else {
                distance = listnum - 84 * data.index;
            }
            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                        dialog.x = -154 - distance;
                        dialog.y = -243;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.tableWanted.goodsId, data.tableWanted.count);
                        _this.groupAward.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.x = -154 - distance;
                        dialog.y = -248;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.tableWanted.goodsId, data.tableWanted.count);
                        _this.groupAward.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.Common_DesProp).then(function (dialog) {
                        dialog.x = -154 - distance;
                        dialog.y = -248;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.tableWanted.goodsId, data.tableWanted.count);
                        _this.groupAward.addChild(dialog);
                    });
                }
            }
        };
        //鼠标抬起，移除通关奖励材料说明
        WantedSecondMeteorstanceScene.prototype.onRemoveAward = function () {
            var dialog = this.groupAward.getChildByName("Item-skill-common");
            if (dialog)
                this.groupAward.removeChild(dialog);
        };
        //长按 技能 详情
        WantedSecondMeteorstanceScene.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowTalent(ev.data.info.talent, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "Talenttouch";
            this.addChild(show);
        };
        // 长按 技能 抬起
        WantedSecondMeteorstanceScene.prototype.removeShow = function () {
            var show = this.getChildByName("Talenttouch");
            if (show) {
                this.removeChild(show);
            }
        };
        // 钻石、体力的数量
        WantedSecondMeteorstanceScene.prototype.setInfoUpdate = function () {
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
            this.labelGemstone.text = str_energy;
            this.labelGemstone.size = 20;
            // if (this.labelGemstone.text.length > 7) {
            //     this.labelGemstone.size = 14;
            // } else {
            //     this.labelGemstone.size = 16;
            // }
            //钻石数量
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                this.labelGold.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            }
            else {
                this.labelGold.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            // this.labelGold.text = str_token;
            //体力数量
            this.labelGemstone.text = str_energy;
        };
        //boss
        WantedSecondMeteorstanceScene.prototype.setInfoBossList = function (index) {
            //list 加载
            this.listSelectedBoss.selectedIndex = index - 1; // 默认选中
            this.listSelectedBoss.itemRenderer = zj.WantedSecondMeteorlnstanceBossItem; //
            this.selectedBossItem = new eui.ArrayCollection();
            for (var i = 1; i <= this.MAX_BOSS_NUM; i++) {
                var data = new zj.WantedSecondMeteorlnstanceBossItemData();
                data.index = i;
                data.father = this;
                data.tableWanted = zj.PlayerWantedSystem.Instance(1 + i * 10000);
                this.selectedBossItem.addItem(data);
            }
            this.listSelectedBoss.dataProvider = this.selectedBossItem;
            this.selectedBossIndex = this.listSelectedBoss.selectedIndex;
            zj.Game.PlayerMissionSystem.fightExt = this.selectedBossIndex;
            zj.Game.PlayerWantedSystem.wantedBossDifficulty = this.selectedBossIndex;
            this.listSelectedBoss.addEventListener(eui.ItemTapEvent.ITEM_TAP, function () {
                // this.selectedBossIndex = this.listSelectedBoss.selectedIndex;
            }, this);
            this.ReqWanted_Visit(index);
            //this.setInfoTime(0);
        };
        //boss点击
        WantedSecondMeteorstanceScene.prototype.buttonSelectedBossCallBack = function (e) {
            var limit_level = zj.PlayerWantedSystem.GetLimitLevel(this.listSelectedBoss.selectedIndex + 1);
            var bOpen = false;
            if (limit_level <= zj.CommonConfig.role_max_level) {
                bOpen = zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level;
                if (bOpen) {
                    var iconbool = zj.Tips.GetSaveBoolForWantedNewOpen(this.listSelectedBoss.selectedIndex + 1, true);
                    if (!false) {
                        this.setNewOpenState(this.listSelectedBoss.selectedIndex + 1, false);
                    }
                    if (this.selectedBossIndex != this.listSelectedBoss.selectedIndex) {
                        this.selectedBossItem.itemUpdated(this.selectedBossItem.source[this.selectedBossIndex]);
                        this.selectedBossItem.itemUpdated(this.selectedBossItem.source[this.listSelectedBoss.selectedIndex]);
                        this.selectedBossIndex = this.listSelectedBoss.selectedIndex;
                        zj.Game.PlayerWantedSystem.wantedBossDifficulty = this.selectedBossIndex;
                        zj.Game.PlayerMissionSystem.fightExt = this.selectedBossIndex;
                        this.ReqWanted_Visit(this.listSelectedBoss.selectedIndex + 1);
                        if (this.bossMainKeelAnimation.parent)
                            this.bossMainKeelAnimation.parent.removeChild(this.bossMainKeelAnimation);
                        if (this.generalKeelAnimation.parent)
                            this.generalKeelAnimation.parent.removeChild(this.generalKeelAnimation);
                    }
                }
                else {
                    zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[this.listSelectedBoss.selectedIndex + 1]));
                    return;
                }
            }
            else {
                bOpen = zj.Table.FindK(zj.Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, limit_level) != -1;
                if (bOpen) {
                    var iconbool = zj.Tips.GetSaveBoolForWantedNewOpen(this.listSelectedBoss.selectedIndex + 1, true);
                    if (!false) {
                        this.setNewOpenState(this.listSelectedBoss.selectedIndex + 1, false);
                    }
                    if (this.selectedBossIndex != this.listSelectedBoss.selectedIndex) {
                        this.selectedBossItem.itemUpdated(this.selectedBossItem.source[this.selectedBossIndex]);
                        this.selectedBossItem.itemUpdated(this.selectedBossItem.source[this.listSelectedBoss.selectedIndex]);
                        this.selectedBossIndex = this.listSelectedBoss.selectedIndex;
                        this.ReqWanted_Visit(this.listSelectedBoss.selectedIndex + 1);
                        if (this.bossMainKeelAnimation.parent)
                            this.bossMainKeelAnimation.parent.removeChild(this.bossMainKeelAnimation);
                        if (this.generalKeelAnimation.parent)
                            this.generalKeelAnimation.parent.removeChild(this.generalKeelAnimation);
                    }
                }
                else {
                    var boosname = zj.TextsConfig.TextsConfig_Comment.wanted_type[Math.floor(limit_level / 10000)];
                    var part = limit_level % 100;
                    zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel3, part, boosname));
                    return;
                }
            }
        };
        //boss难度选择
        WantedSecondMeteorstanceScene.prototype.setInfoList = function (args) {
            this.floorInfo = zj.otherdb.WantedTypeInfo(args);
            //list 加载
            var typeIndex = (zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[this.selectedBossIndex].value % 100) - 1;
            if (typeIndex <= 0) {
                typeIndex = 0;
            }
            this.listBoss.selectedIndex = typeIndex; // 默认选中
            this.listBoss.itemRenderer = zj.WantedSecondMeteorlnstanceItem; //
            this.listBossItem = new eui.ArrayCollection();
            for (var i = 0; i < this.floorInfo.length; i++) {
                var data = new zj.WantedSecondMeteorlnstanceItemData();
                data.indexId = this.selectedBossIndex + 1;
                data.tableWanted = this.floorInfo[i];
                this.listBossItem.addItem(data);
            }
            this.listBoss.dataProvider = this.listBossItem;
            this.listBossIndex = this.listBoss.selectedIndex;
            this.scrollerInfo.viewport = this.listBoss;
            this.scrollerInfo.validateNow();
            //this.onGroupDialogue();
            this.setFloorInfo(this.listBoss.selectedIndex);
            zj.Game.PlayerWantedSystem.wantedCurPos = this.floorInfo[this.listBossIndex].wanted_id;
            var index = (this.listBossIndex - 3) * 60;
            if (index > 0) {
                if ((this.listBossIndex + 1) == this.floorInfo.length) {
                    this.scrollerInfo.viewport.scrollV = index - 60;
                }
                else {
                    this.scrollerInfo.viewport.scrollV = index;
                }
            }
            else {
                this.scrollerInfo.viewport.scrollV = 0;
            }
            this.setInfoTime(this.listBoss.selectedIndex);
        };
        //boss难度选中
        WantedSecondMeteorstanceScene.prototype.buttonState = function (e) {
            if (this.listBossIndex != this.listBoss.selectedIndex) {
                this.listBossItem.itemUpdated(this.listBossItem.source[this.listBossIndex]);
                this.listBossItem.itemUpdated(this.listBossItem.source[this.listBoss.selectedIndex]);
                this.listBossIndex = this.listBoss.selectedIndex;
                zj.Game.PlayerWantedSystem.wantedCurPos = this.floorInfo[this.listBossIndex].wanted_id;
                if (this.bossMainKeelAnimation.parent)
                    this.bossMainKeelAnimation.parent.removeChild(this.bossMainKeelAnimation);
                if (this.generalKeelAnimation.parent)
                    this.generalKeelAnimation.parent.removeChild(this.generalKeelAnimation);
                this.setFloorInfo(this.listBoss.selectedIndex);
                this.setInfoTime(this.listBossIndex);
            }
        };
        //显示  通关奖励 boss技能 等
        WantedSecondMeteorstanceScene.prototype.setFloorInfo = function (indexId) {
            var _this = this;
            var maprole = zj.TableMapRole.Item(this.roleInfo[indexId]);
            var animationUrl = zj.TableClientFightAniSpineSource.Item(maprole.body_spx_id).json;
            zj.Game.DragonBonesManager.playAnimation(this, animationUrl, null, "0001_daiji", 0)
                .then(function (display) {
                display.x = _this.groupNPC.width * 0.4;
                display.y = _this.groupNPC.height;
                display.scaleX = maprole.body_scale < 0.5 ? 0.53 : maprole.body_scale;
                display.scaleY = maprole.body_scale < 0.5 ? 0.53 : maprole.body_scale;
                _this.groupNPC.removeChildren();
                _this.groupNPC.addChild(display);
                _this.bossMainKeelAnimation = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            var floor_id = (this.selectedBossIndex + 1) * 10000 + 1 + indexId;
            this.wantedId = floor_id;
            var floor_info = zj.otherdb.WantedInstance(floor_id);
            this.tableWantedInfo = floor_info;
            var bSpecial = floor_info.bSpecial;
            this.onGroupDialogue();
            var boradPath = bSpecial == 0 ? zj.UIConfig.UIConfig_Wanted.newBoard[1] : zj.UIConfig.UIConfig_Wanted.newBoard[2];
            // this.imageBackground.source = cachekey(boradPath, this);
            if (bSpecial != 0) {
                if (bSpecial == 2) {
                    if (this.bossMainKeelAnimation1 != undefined) {
                        this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation1);
                        this.groupBackgroundAnimation2.removeChild(this.bossMainKeelAnimation3);
                        this.bossMainKeelAnimation1 = undefined;
                    }
                    else if (this.bossMainKeelAnimation3 != undefined) {
                        this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation3);
                        this.groupBackgroundAnimation2.removeChild(this.bossMainKeelAnimation2);
                        this.bossMainKeelAnimation3 = undefined;
                    }
                    zj.Game.DragonBonesManager.playAnimation(this, "guanghuan_eff_2", null, "016_guanghuan6_1", 0)
                        .then(function (display) {
                        display.x = _this.groupBackgroundAnimation2.width * 0.4;
                        display.y = _this.groupBackgroundAnimation2.height;
                        _this.groupBackgroundAnimation2.addChild(display);
                        _this.bossMainKeelAnimation2 = display;
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                    zj.Game.DragonBonesManager.playAnimation(this, "guanghuan_eff_2", null, "017_guanghuan6_2", 0)
                        .then(function (display) {
                        display.x = _this.groupBackgroundAnimation1.width * 0.7;
                        display.y = _this.groupBackgroundAnimation1.height;
                        _this.groupBackgroundAnimation1.addChild(display);
                        _this.bossMainKeelAnimation3 = display;
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                }
                else if (bSpecial == 1) {
                    var m = this.bossMainKeelAnimation3;
                    if (this.bossMainKeelAnimation3 != undefined) {
                        this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation3);
                        this.groupBackgroundAnimation2.removeChild(this.bossMainKeelAnimation2);
                        this.bossMainKeelAnimation3 = undefined;
                    }
                    else if (this.bossMainKeelAnimation1 != undefined) {
                        this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation1);
                        this.bossMainKeelAnimation1 = undefined;
                    }
                    zj.Game.DragonBonesManager.playAnimation(this, "guanghuan_eff_2", null, "013_guanghuan5_1", 0)
                        .then(function (display) {
                        display.x = _this.groupBackgroundAnimation2.width * 0.4;
                        display.y = _this.groupBackgroundAnimation2.height;
                        _this.groupBackgroundAnimation2.removeChildren();
                        _this.groupBackgroundAnimation2.addChild(display);
                        _this.bossMainKeelAnimation2 = display;
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                    zj.Game.DragonBonesManager.playAnimation(this, "guanghuan_eff_2", null, "014_guanghuan5_2", 0)
                        .then(function (display) {
                        display.x = _this.groupBackgroundAnimation1.width * 0.7;
                        display.y = _this.groupBackgroundAnimation1.height;
                        _this.groupBackgroundAnimation1.removeChildren();
                        _this.groupBackgroundAnimation1.addChild(display);
                        _this.bossMainKeelAnimation3 = display;
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                }
            }
            else {
                if (this.bossMainKeelAnimation1 != undefined) {
                    this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation1);
                    this.bossMainKeelAnimation1 = undefined;
                }
                else if (this.bossMainKeelAnimation3 != undefined) {
                    this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation3);
                    this.groupBackgroundAnimation2.removeChild(this.bossMainKeelAnimation2);
                    this.bossMainKeelAnimation3 = undefined;
                }
            }
            this.imageBossType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.type2[floor_info.boss_type_client - 1], this);
            this.imageBossTypeInfoA.source = zj.cachekey(floor_info.boss_feature_client[0], this);
            this.imageBossTypeInfoB.source = zj.cachekey(floor_info.boss_feature_client[1], this);
            var itemSet = zj.PlayerItemSystem.Set(floor_info.first_reward[0][0], 1, floor_info.first_reward[0][1]);
            this.imageFrameFirstBlood.source = zj.cachekey(itemSet.Frame, this);
            this.imageIconFirstBlood.source = zj.cachekey(itemSet.Clip, this);
            if (this.isRectMask(floor_info.first_reward[0][0])) {
                this.imgMask.visible = true;
                this.imageIconFirstBlood.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.imageIconFirstBlood.mask = this.rectMaskCommon;
            }
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);
            this.labelFirstBlood.text = ("x" + zj.Set.NumberUnit2(floor_info.first_reward[0][1]));
            this.itemId = floor_info.first_reward[0][0];
            this.itemCount = floor_info.first_reward[0][1];
            //boss技能
            var feature = floor_info.feature;
            this.listBossSkill.selectedIndex = 0; // 默认选中
            this.listBossSkill.itemRenderer = zj.WantedSecondStartItem; //
            this.startItem = new eui.ArrayCollection();
            for (var i = 0; i < feature.length; i++) {
                var boosTalent = new zj.WantedSecondStartItemData();
                boosTalent.father = this;
                boosTalent.index = i;
                boosTalent.talent = feature[i];
                this.startItem.addItem(boosTalent);
            }
            this.listBossSkill.dataProvider = this.startItem;
            this.startIndex = this.listBossSkill.selectedIndex;
            if (feature.length <= 6) {
                this.scrollerBossSkill.scrollPolicyH = "off";
                if (feature.length == 4) {
                    this.scrollerBossSkill.left = 50;
                }
                else if (feature.length == 5) {
                    this.scrollerBossSkill.left = 25;
                }
                else if (feature.length == 6) {
                    this.scrollerBossSkill.left = 0;
                }
            }
            else {
                this.scrollerBossSkill.scrollPolicyH = "on";
                this.scrollerBossSkill.left = 0;
            }
            //通关奖励 list 加载
            var infoList = zj.PlayerWantedSystem.GetClientDrop(floor_id);
            this.chooselist = infoList;
            this.listBossAward.selectedIndex = 0; // 默认选中
            this.listBossAward.itemRenderer = zj.WantedSecondChooseItem; //
            this.chooseItem = new eui.ArrayCollection();
            for (var i = 0; i < infoList.length; i++) {
                var data = new zj.WantedSecondChooseItemData();
                data.index = i;
                data.father = this;
                data.tableWanted = infoList[i];
                this.chooseItem.addItem(data);
            }
            this.listBossAward.dataProvider = this.chooseItem;
            this.chooseIndex = this.listBossAward.selectedIndex;
            this.scrollerRewards.viewport = this.listBossAward;
            this.scrollerRewards.validateNow();
            this.scrollerRewards.viewport.scrollH = this.AwardmoveLocation;
            if (infoList.length <= 3) {
                this.scrollerRewards.scrollPolicyH = "off";
                if (infoList.length == 2) {
                    this.scrollerRewards.left = 60;
                }
                else if (infoList.length == 1) {
                    this.scrollerRewards.left = 100;
                }
                else {
                    this.scrollerRewards.left = 0;
                }
            }
            else {
                this.scrollerRewards.scrollPolicyH = "on";
                this.scrollerRewards.left = 0;
            }
            this.bFirstReward = zj.Table.FindK(zj.Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, floor_id) == -1;
            this.imageGetFirstBlood.visible = !this.bFirstReward;
            var consumeStr = "";
            if (this.bFirstReward) {
                consumeStr = zj.TextsConfig.TextsConfig_Common.firstFree;
            }
            else {
                consumeStr = floor_info.battle_consume.toString();
            }
            this.labelStrength.text = consumeStr;
            this.labelElitesA.text = consumeStr;
        };
        WantedSecondMeteorstanceScene.prototype.onButtonElitesClicked = function () {
            //判断此时
            var floor_id = (zj.Game.PlayerMissionSystem.fightExt + 1) * 10000 + (this.listBoss.selectedIndex + 1);
            var floor_info = zj.TableWanted.Item(floor_id);
            var lastTime = zj.Game.PlayerItemSystem.itemCount(Number(floor_info.consume_type));
            // if(!this.bFirstReward && lastTime <= 0) {
            //     this.BuyEliteTime(Number(floor_info.consume_type));
            // }else{
            this.onButtonBattleClicked();
            // }
        };
        WantedSecondMeteorstanceScene.prototype.BuyEliteTime = function (consumeType) {
            var _this = this;
            var a = zj.PlayerItemSystem.Item(consumeType);
            var buyTime = 0;
            var buyInfo = zj.Table.FindR(zj.Game.PlayerWantedSystem.wantedInfo.wantedTicketTime, function (k, v) {
                return v.key == consumeType;
            });
            if (buyInfo[0] != null || buyInfo[1] != null) {
                buyTime = buyInfo[0].value;
            }
            if (buyTime < zj.CommonConfig.wanted_ticket_daily_buy_time) {
                var cost = zj.CommonConfig.wanted_buy_ticket_token(buyTime);
                var consumeName = zj.PlayerItemSystem.Item(consumeType)["name"];
                var lastTime = zj.CommonConfig.wanted_ticket_daily_buy_time - buyTime;
                var allTime = zj.CommonConfig.wanted_ticket_daily_buy_time;
                var everyAddNum = zj.CommonConfig.wanted_ticket_add_count;
                var numMsg = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.buyEliteTimes, cost, everyAddNum, consumeName, lastTime, allTime);
                zj.TipManager.ShowConfirmCancel(numMsg, function () { _this.BuyEliteTimeReq(consumeType); });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wanted.buyEliteTimesMax);
            }
        };
        WantedSecondMeteorstanceScene.prototype.BuyEliteTimeReq = function (consumeType) {
            var _this = this;
            zj.Game.PlayerWantedSystem.WantedBuyTicketReq_Visit(consumeType).then(function (data) {
                if (data.header.result == 0) {
                    //购买成功
                    _this.setInfoTime(_this.listBoss.selectedIndex);
                    zj.toast_success(zj.TextsConfig.TextsConfig_Wanted.buyChallengeNumSuccessTip);
                }
                else if (data.header.result == message.EC.XG_LACK_TOKEN) {
                    zj.loadUI(zj.PayMallScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.init(false);
                    });
                }
            }).catch(function (reason) { zj.toast(reason); });
        };
        //点击通关奖励信息
        WantedSecondMeteorstanceScene.prototype.buttonAward = function (e) {
            var a = this.listBossAward.selectedIndex;
            if (this.chooseIndex != this.listBossAward.selectedIndex) {
                this.chooseItem.itemUpdated(this.chooseItem.source[this.chooseIndex]);
                this.chooseItem.itemUpdated(this.chooseItem.source[this.listBossAward.selectedIndex]);
                this.chooseIndex = this.listBossAward.selectedIndex;
            }
        };
        //根据奖励类型判断是否添加遮罩
        WantedSecondMeteorstanceScene.prototype.isRectMask = function (goodsId) {
            var m = zj.PlayerItemSystem.ItemType(goodsId);
            if (goodsId == 33053 || goodsId == 33055 || goodsId == 33057) {
                return true;
            }
            return false;
        };
        // 挑战按钮的显示方式
        WantedSecondMeteorstanceScene.prototype.setInfoTime = function (index) {
            var cost = [
                zj.Game.PlayerInfoSystem.BaseInfo.wantedCoin,
                zj.Game.PlayerInfoSystem.BaseInfo.arrestCoin,
                zj.Game.PlayerInfoSystem.BaseInfo.huntCoin
            ];
            var coststr = [
                "wanted_time",
                "arrest_time",
                "hunt_time"
            ];
            var floor_id = (this.selectedBossIndex + 1) * 10000 + 1 + index;
            var floor_info = zj.otherdb.WantedInstance(floor_id);
            var bFirstReward = zj.Table.FindK(zj.Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, floor_id) == -1;
            var bButtontype;
            if (this.listBossIndex > ((zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[this.selectedBossIndex].value % 100) - 1)) {
                bButtontype = true;
            }
            else if (this.listBossIndex < zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[this.selectedBossIndex].value % 100 && bFirstReward) {
                bButtontype = false;
            }
            else {
                bButtontype = false;
            }
            if (this.selectedBossIndex + 1 == message.EWantedType.WANTED_TYPE_EASY || this.selectedBossIndex + 1 == message.EWantedType.WANTED_TYPE_HARD) {
                this.groupChallengeBoss2.visible = false;
                this.groupChallengeBoss3.visible = false;
                this.groupChallengeBoss1.visible = true;
                var str = null;
                if (bFirstReward) {
                    str = zj.TextsConfig.TextsConfig_Common.firstFreeCom;
                }
                else {
                    if (cost[this.selectedBossIndex] > 0) {
                        str = "<color>r=60,g=255,b=0</color><text>" + cost[this.selectedBossIndex] + "</text>" + "<text>/" + zj.PlayerVIPSystem.Level()[coststr[this.selectedBossIndex]] + "</text>";
                    }
                    else {
                        str = "<color>r=255,g=38,b=0</color><text>" + cost[this.selectedBossIndex] + "</text>" + "<text>/" + zj.PlayerVIPSystem.Level()[coststr[this.selectedBossIndex]] + "</text>";
                    }
                }
                zj.Game.PlayerWantedSystem.ChallengeNumber = cost[this.selectedBossIndex];
                this.labelStrengthNum.textFlow = zj.Util.RichText(str);
                WantedSecondMeteorstanceScene.challenge = this.labelStrengthNum.textFlow[0].text;
                if (bButtontype) {
                    this.buttonElites.enabled = false;
                }
                else {
                    this.buttonElites.enabled = true;
                }
            }
            else if (floor_info.consume_type != null && floor_info.consume_type != "") {
                this.groupChallengeBoss2.visible = false;
                this.groupChallengeBoss3.visible = true;
                this.groupChallengeBoss1.visible = false;
                this.setSpecialConsumeInfo(floor_info);
                if (bButtontype) {
                    this.buttonElitesA.enabled = false;
                }
                else {
                    this.buttonElitesA.enabled = true;
                }
            }
            else {
                this.groupChallengeBoss2.visible = true;
                this.groupChallengeBoss3.visible = false;
                this.groupChallengeBoss1.visible = false;
                this.labelStrengthNum.text = zj.TextsConfig.TextsConfig_Common.noLimit;
                WantedSecondMeteorstanceScene.challenge = this.labelStrengthNum.text;
                if (bButtontype) {
                    this.buttonStrength.enabled = false;
                }
                else {
                    this.buttonStrength.enabled = true;
                }
            }
        };
        //挑战boss (统治者) 消耗的材料 
        WantedSecondMeteorstanceScene.prototype.setSpecialConsumeInfo = function (floor_info) {
            var itemSet = zj.PlayerItemSystem.Set(Number(floor_info.consume_type));
            this.common_DesProp.setInfo(floor_info.consume_type, null);
            this.imageFrameMeterials.source = zj.cachekey(itemSet.Frame, this);
            this.imageIconMeterials.source = zj.cachekey(itemSet.Clip, this);
            var haveCount = 0;
            if (zj.Game.PlayerItemSystem.mapGoodsInfo[floor_info.consume_type] != null) {
                haveCount = zj.Game.PlayerItemSystem.mapGoodsInfo[floor_info.consume_type].count;
            }
            var str = "";
            if (haveCount > 0 || this.buttonElitesA.enabled) {
                if (haveCount > 0) {
                    str = "<color>r=60,g=255,b=0</color><text>" + haveCount + "</text>" + "<text>/" + 1 + "</text>";
                }
                else {
                    str = "<color>r=255,g=38,b=0</color><text>" + haveCount + "</text>" + "<text>/" + 1 + "</text>";
                }
                this.imageAddSkillMeterials.visible = false;
            }
            else {
                str = "<color>r=255,g=38,b=0</color><text>" + haveCount + "</text>" + "<text>/" + 1 + "</text>";
                this.imageAddSkillMeterials.visible = true;
            }
            this.labelNumMeterials.textFlow = zj.Util.RichText(str);
        };
        // 场景添加到舞台时自动调用
        // 此时可以打开定时器、播放音乐等操作
        WantedSecondMeteorstanceScene.prototype.onAddedToStage = function () {
        };
        // 场景从舞台移除时自动调用
        // 此时可以关闭定时器、暂停音乐等操作
        WantedSecondMeteorstanceScene.prototype.onRemoveFromStage = function () {
        };
        // 场景从UI栈里弹出时回调
        // 此时可以回收资源，移除事件监听等操作
        WantedSecondMeteorstanceScene.prototype.onRemoveFromStack = function () {
        };
        //挑战Boss
        WantedSecondMeteorstanceScene.prototype.onButtonBattleClicked = function () {
            var _this = this;
            var floor_id = (zj.Game.PlayerMissionSystem.fightExt + 1) * 10000 + (this.listBoss.selectedIndex + 1);
            var floor_info = zj.TableWanted.Item(floor_id);
            if (!this.bFirstReward && zj.Game.PlayerInfoSystem.BaseInfo.power < floor_info.battle_consume) {
                zj.loadUI(zj.HXH_HunterUserStrength)
                    .then(function (dialog) {
                    dialog.SetInfo();
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_WANTED;
                zj.PlayerWantedSystem.ReqGetMobsInfo(this.wantedId)
                    .then(function (data) {
                    zj.loadUI(zj.CommonFormatePveMain)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(_this.wantedId);
                    });
                })
                    .catch(function (reason) { zj.toast_warning(reason); });
            }
        };
        WantedSecondMeteorstanceScene.prototype.ReqWanted_Visit = function (diff) {
            var _this = this;
            zj.PlayerWantedSystem.reqMobRoles(diff)
                .then(function (data) {
                _this.roleInfo = data.body.mapRoles;
                _this.setInfo(diff);
                _this.setInfoList(diff);
            })
                .catch(function (reason) { zj.toast_warning(reason); });
        };
        WantedSecondMeteorstanceScene.prototype.typerEffect = function (obj, content, interval, backFun) {
            if (content === void 0) { content = ""; }
            if (interval === void 0) { interval = 200; }
            if (backFun === void 0) { backFun = null; }
            var strArr = content.split("");
            var len = strArr.length;
            obj.text = "";
            this.timenpc = [];
            for (var i = 0; i < len; i++) {
                var timenum = egret.setTimeout(function () {
                    obj.appendText(strArr[Number(this)]);
                }, i, interval * i);
                this.timenpc.push(timenum);
            }
        };
        //NPC对话框
        WantedSecondMeteorstanceScene.prototype.onGroupDialogue = function () {
            var _this = this;
            //toast("对话框");
            this.groupTalk.visible = false;
            this.labelTalk.visible = false;
            egret.Tween.removeTweens(this.groupTalk);
            if (this.timenpc.length > 0) {
                for (var i = 0; i < this.timenpc.length; i++) {
                    egret.clearTimeout(this.timenpc[i]);
                }
            }
            // let m = this.tableWantedInfo;
            // var index =  Math.floor((Math.random() * this.floorInfo.length));
            var str_talk = this.tableWantedInfo.dialog_tip;
            if (str_talk == "") {
                return "";
            }
            //let str_talk = this.floorInfo[1].dialog_tip;
            egret.Tween.get(this.groupTalk)
                .wait(100, false)
                .call(function () {
                _this.groupTalk.visible = true;
                _this.labelTalk.visible = true;
                _this.typerEffect(_this.labelTalk, str_talk, 50);
            })
                .to({ y: 90 }, 1000, egret.Ease.quartIn)
                .to({ y: 85 }, 1000, egret.Ease.quartIn)
                .to({ y: 95 }, 1000, egret.Ease.quartIn)
                .to({ y: 90 }, 1000, egret.Ease.quartIn)
                .call(function () { _this.groupTalk.visible = false; });
        };
        //设置红点新
        WantedSecondMeteorstanceScene.prototype.setNewOpenState = function (index, str) {
            zj.Tips.SetSaveBoolForWantedNewOpen(index, str);
        };
        //添加体力
        WantedSecondMeteorstanceScene.prototype.onButtonAddpower = function () {
            zj.loadUI(zj.HXH_HunterUserStrength)
                .then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //添加钻石
        WantedSecondMeteorstanceScene.prototype.onBtnAddGemstone = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
            });
        };
        WantedSecondMeteorstanceScene.prototype.onButtonPlan = function () {
            zj.toast_warning("攻略暂未开启！");
        };
        WantedSecondMeteorstanceScene.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        WantedSecondMeteorstanceScene.prototype.getItemList = function () {
            for (var i = 0; i < this.MAX_BOSS_NUM; i++) {
                var item = this.listSelectedBoss.getElementAt(i);
                this.itemList.push(item);
            }
        };
        /**流星街挑战哪里显示的挑战次数 */
        WantedSecondMeteorstanceScene.challenge = null;
        return WantedSecondMeteorstanceScene;
    }(zj.Scene));
    zj.WantedSecondMeteorstanceScene = WantedSecondMeteorstanceScene;
    __reflect(WantedSecondMeteorstanceScene.prototype, "zj.WantedSecondMeteorstanceScene");
})(zj || (zj = {}));
//# sourceMappingURL=WantedSecondMeteorstanceScene.js.map