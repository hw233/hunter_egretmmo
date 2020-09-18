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
    //HXH_FirstChargeMainNew
    //wangshenzhuo
    // 2019/03/29
    var HXH_FirstChargeMainNew = (function (_super) {
        __extends(HXH_FirstChargeMainNew, _super);
        function HXH_FirstChargeMainNew() {
            var _this = _super.call(this) || this;
            _this.TableViewPayIndex = 0;
            _this.ScrollViewIndex = 0;
            _this.buttonGo = [];
            _this.skinName = "resource/skins/firstCharge/HXH_FirstChargeMainNewSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.buttonGo1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonGo1, _this);
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonReward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonReward, _this);
            _this.listTableViewPay.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onlistTableView, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            if (_this.width >= 1344) {
                _this.imageBackGroud.scaleX = _this.width / 1334;
            }
            _this.init();
            return _this;
        }
        HXH_FirstChargeMainNew.prototype.init = function () {
            var num = zj.TableFirstCharge.Table();
            this.FIRST_FIVE = Object.keys(num).length;
            this.buttonGo = [
                this.buttonGo1,
                this.buttonGo2,
                this.buttonGo3
            ];
            this.index = 0;
            this.first_data = zj.Game.PlayerGiftSystem.firstCharge();
            this.SetInfo();
            this.listTableViewPay.selectedIndex = this.index; // 默认选中
            this.listTableViewPay.itemRenderer = zj.HXH_FirstChargeMainPayItemNew; //
            this.TableViewPayItem = new eui.ArrayCollection();
            for (var i = 0; i < this.first_data.length; i++) {
                var data = new zj.HXH_FirstChargeMainPayItemNewData();
                data.father = this;
                data.index = i;
                data.info = this.first_data[i];
                this.TableViewPayItem.addItem(data);
            }
            this.listTableViewPay.dataProvider = this.TableViewPayItem;
            this.TableViewPayIndex = this.listTableViewPay.selectedIndex;
            this.addAnimatoin("shouchong_eff", "000_lei", 0, this.groupAdd);
        };
        HXH_FirstChargeMainNew.prototype.onlistTableView = function () {
            if (this.TableViewPayIndex != this.listTableViewPay.selectedIndex) {
                this.TableViewPayItem.itemUpdated(this.TableViewPayItem.source[this.TableViewPayIndex]);
                this.TableViewPayItem.itemUpdated(this.TableViewPayItem.source[this.listTableViewPay.selectedIndex]);
                this.TableViewPayIndex = this.listTableViewPay.selectedIndex;
            }
            this.SetSelectIndex(this.TableViewPayIndex);
        };
        HXH_FirstChargeMainNew.prototype.SetSelectIndex = function (index) {
            this.index = index;
            this.SetCost();
            this.SetSelectReward();
            this.SetInfoReward();
            this.SetTime();
        };
        HXH_FirstChargeMainNew.prototype.SetInfo = function () {
            this.SetCost();
            this.SetInfoIndex();
            this.SetSelectReward();
            this.SetInfoReward();
            this.SetTime();
        };
        HXH_FirstChargeMainNew.prototype.SetTime = function () {
            var info = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD];
            var show = false;
            this.SetFirstTimmer();
            if (zj.Device.isDebug) {
                show = info.leftTime <= 3600 * 24 * 5 && info.leftTime > 0;
            }
            else {
                show = info.leftTime <= 3600 * 24 && info.leftTime > 0;
            }
            this.groupTime.visible = (info.leftTime > 0 && show);
            if (info.leftTime > 0 && this.firstTime == null) {
                this.SetFirstTimmer();
            }
        };
        HXH_FirstChargeMainNew.prototype.SetInfoReward = function () {
            var info = this.first_data[this.index];
            var title = zj.UIConfig.UIConfig_Activity.title[this.index];
            var token = (info.token - zj.Game.PlayerInfoSystem.BaseInfo.chargeToken) / 10;
            var bFull = zj.Game.PlayerInfoSystem.BaseInfo.chargeToken >= info.token;
            var bGoCharge = zj.Game.PlayerInfoSystem.BaseInfo.chargeToken < info.token;
            var a = this.index + 1;
            var bAward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward, function (k, v) {
                return v == a;
            });
            var str_tips = "";
            if (bFull && bAward) {
                str_tips = zj.TextsConfig.TextsConfig_Activity.rewarded;
            }
            else if (bFull && !bAward) {
                str_tips = zj.TextsConfig.TextsConfig_Activity.reward;
            }
            else if (!bFull) {
                str_tips = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.charge, token);
            }
            this.labelTips.text = str_tips;
            this.SetButtonGO(!bFull);
            this.buttonReward.visible = bFull;
            this.buttonReward.enabled = (bFull && !bAward);
            this.imageTitle.source = zj.cachekey(info.icon_path_title, this);
            this.imageTitleTip.source = zj.cachekey(info.icon_path_topic, this);
            this.imageTips.visible = false;
        };
        HXH_FirstChargeMainNew.prototype.SetButtonGO = function (visible) {
            for (var k in this.buttonGo) {
                var v = this.buttonGo[k];
                v.visible = false;
            }
            this.buttonGo1.visible = visible;
        };
        HXH_FirstChargeMainNew.prototype.SetSelectReward = function () {
            this.listScrollView.selectedIndex = -1; // 默认选中
            this.listScrollView.itemRenderer = zj.HXH_FirstChargeMainItemNew; //
            this.ScrollViewItem = new eui.ArrayCollection();
            for (var i = 0; i < this.first_data[this.index].reward_goods.length; i++) {
                var data = new zj.HXH_FirstChargeMainItemNewData();
                data.father = this;
                data.index = i;
                data.info = this.first_data[this.index];
                data.itemindex = this.index;
                this.ScrollViewItem.addItem(data);
            }
            this.listScrollView.dataProvider = this.ScrollViewItem;
            this.ScrollViewIndex = this.listScrollView.selectedIndex;
        };
        HXH_FirstChargeMainNew.prototype.SetInfoIndex = function () {
            var index = 1;
            var bFind = false;
            for (var i = 0; i < this.first_data.length; i++) {
                //充值阶梯未满
                var b = zj.Game.PlayerInfoSystem.BaseInfo.chargeToken;
                var c = this.first_data[i].token;
                if (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken < this.first_data[i].token) {
                    index = i;
                    bFind = true;
                    //充值满了未领取
                }
                else if (zj.Table.FindK(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward, i + 1) < 0) {
                    var a = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward;
                    index = i;
                    bFind = true;
                }
                //满足其一
                if (bFind) {
                    break;
                }
            }
            this.index = index;
        };
        HXH_FirstChargeMainNew.prototype.SetCost = function () {
            var own = zj.PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
            var labeltext = own;
        };
        HXH_FirstChargeMainNew.prototype.SetFirstTimmer = function () {
            var _this = this;
            var info = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD];
            var call = function () {
                if (info.leftTime <= 0) {
                    return;
                }
                _this.labelTime.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Common.fistTimeTips + zj.PlayerGiftSystem.upToTime3(info.leftTime));
            };
            call();
            this.firstTime = this.SetTime;
        };
        HXH_FirstChargeMainNew.prototype.onDropInfoItemTap = function (isTouchBegin, data) {
            var _this = this;
            var goodsId = data.info.reward_goods[data.index];
            var count = data.info.reward_count[data.index];
            var _type = zj.PlayerItemSystem.ItemType(goodsId);
            var dialog = this.groupListItem.getChildByName("Item-skill-common");
            if (dialog)
                this.groupListItem.removeChild(dialog);
            var cardMap = zj.PlayerHunterSystem.GetHunterCardMap(goodsId);
            var goodsInfo = zj.TableItemPotato.Table()[goodsId];
            var distance = -150 + data.index * 85;
            var type = 0;
            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                        dialog.x = distance;
                        dialog.y = -250;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsId, count);
                        _this.groupListItem.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.x = distance;
                        dialog.y = -250;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsId, count);
                        _this.groupListItem.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                        dialog.x = distance;
                        dialog.y = -200;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsId, count);
                        _this.groupListItem.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_POTATO) {
                    zj.loadUI(zj.PlayerCardPopDialog).then(function (dialog) {
                        dialog.x = -480 + 100;
                        dialog.y = -320;
                        dialog.name = "Item-skill-common";
                        dialog.loadNotGet(goodsInfo);
                        _this.groupListItem.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                        dialog.x = distance;
                        dialog.y = -250;
                        dialog.name = "Item-skill-common";
                        dialog.init(goodsId, count);
                        _this.groupListItem.addChild(dialog);
                    });
                }
            }
        };
        //鼠标抬起，移除通关奖励材料说明
        HXH_FirstChargeMainNew.prototype.onRemoveAward = function () {
            var dialog = this.groupListItem.getChildByName("Item-skill-common");
            if (dialog)
                this.groupListItem.removeChild(dialog);
        };
        HXH_FirstChargeMainNew.prototype.onButtonGo1 = function () {
            var _this = this;
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.setCB(function () { _this.init(); });
                scene.init();
            });
        };
        HXH_FirstChargeMainNew.prototype.onButtonGo2 = function () {
            var _this = this;
            var junior_Id = zj.CommonConfig.month_card_fit[0];
            var junior_Info = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == junior_Id;
            });
            if (junior_Info != null && junior_Info.buy_times == 0) {
                zj.loadUI(zj.PayMallScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.setCB(function () { _this.init(); });
                    scene.init();
                });
            }
            else {
                this.onButtonClose();
            }
        };
        HXH_FirstChargeMainNew.prototype.onButtonGo3 = function () {
            var _this = this;
            var Advanced_Id = zj.CommonConfig.month_card_fit[1]; //高级月卡
            var Advanced_Info = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == Advanced_Id;
            });
            if (Advanced_Info != null && Advanced_Info.buy_times == 0) {
                zj.loadUI(zj.PayMallScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.setCB(function () { _this.init(); });
                    scene.init();
                });
            }
            else {
                this.onButtonClose();
            }
        };
        HXH_FirstChargeMainNew.prototype.onButtonReward = function () {
            var _this = this;
            this.ReqFirstCharge()
                .then(function (data) {
                var _a = zj.Table.FindR(data.body.gameInfo.getGoods, function (k, v) {
                    return zj.PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
                }), hero = _a[0], index = _a[1];
                if (hero != null && index != null) {
                    zj.loadUI(zj.CommonGetGeneral)
                        .then(function (dialog) {
                        dialog.setInfo(hero.goodsId, hero.index);
                        dialog.show(zj.UI.SHOW_FILL_OUT);
                        // setTimeout(() => {
                        //     loadUI(TavernGetGeneralPop)
                        //         .then((taverngetgeneralpop: TavernGetGeneralPop) => {
                        //             taverngetgeneralpop.init(this);
                        //             egret.Tween.get(taverngetgeneralpop.group1)
                        //                 .call(() => {
                        //                     taverngetgeneralpop.setInof(hero);
                        //                     // taverngetgeneralpop.show();
                        //                     dialog.addChild(taverngetgeneralpop);
                        //                 })
                        //                 .to({ alpha: 1 }, 100)
                        //                 .to({ y: 10 }, 150, egret.Ease.sineInOut)
                        //                 .wait(300, false)
                        //                 .to({ y: -10 }, 150, egret.Ease.sineInOut)
                        //                 .wait(300, false)
                        //                 .call(() => { taverngetgeneralpop.onGroupParent(); })
                        //         });
                        // }, 300)
                    });
                }
                else {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(data.body.gameInfo.getGoods);
                        dialog.show();
                    });
                }
                _this.init();
            }).catch(function (reason) { });
        };
        HXH_FirstChargeMainNew.prototype.ReqFirstCharge = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.FirstChargeRewardRequest();
                request.body.index = _this.index + 1;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        HXH_FirstChargeMainNew.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            if (zj.Teach.m_bOpenTeach == true && zj.Teach.teachingNow == false && !zj.Teach.isDone(zj.teachBattle.teachPartID_GiftBag) && zj.Teach.isDone(3005)) {
                // Teach.SetTeachPart(teachBattle.teachPartID_GiftBag);
                zj.Game.TeachSystem.isShowGetVip = false;
                zj.Game.EventManager.event(zj.GameEvent.START_NEW_TEACHING, { curPart: zj.teachBattle.teachPartID_GiftBag });
                var ui = zj.Game.UIManager.topScene();
                if (ui instanceof zj.MainCityUI) {
                    ui.sceneUI.setInfoGiftList();
                }
            }
        };
        //添加龙骨动画
        HXH_FirstChargeMainNew.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight / 2;
                display.alpha = 0.6;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        return HXH_FirstChargeMainNew;
    }(zj.Scene));
    zj.HXH_FirstChargeMainNew = HXH_FirstChargeMainNew;
    __reflect(HXH_FirstChargeMainNew.prototype, "zj.HXH_FirstChargeMainNew");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_FirstChargeMainNew.js.map