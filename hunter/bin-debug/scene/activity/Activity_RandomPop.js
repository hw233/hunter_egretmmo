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
    // 2019/04/13
    // wangshenzhuo
    // 抓取成功
    var Activity_RandomPop = (function (_super) {
        __extends(Activity_RandomPop, _super);
        function Activity_RandomPop() {
            var _this = _super.call(this) || this;
            _this.time = 0;
            _this.time2 = 0;
            _this.time3 = 0;
            _this.arrayItem = [];
            _this.arrayItem2 = [];
            _this.item_list = [];
            _this.skinName = "resource/skins/activity/Activity_RandomPopSkin.exml";
            _this.buttonReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonReturn, _this);
            _this.buttonOne.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonOne, _this);
            _this.buttonMore.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonMore, _this);
            //创建一个计时器对象
            _this.timer = new egret.Timer(16.6, 0);
            //注册事件侦听器
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.update, _this);
            // this.timer.start();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, _this);
            return _this;
        }
        Activity_RandomPop.prototype.SetInfo = function (goods, father) {
            zj.Helper.PlayEff(zj.TableClientSoundResource.Item(30010).sound_path, 100);
            this.father = father;
            this.goods = goods;
            this.groupMain3.visible = false;
            this.groupMain4.visible = false;
            this.SetInfoEggAni();
            var scoreAdd = this.father.takeNum * this.father.curTopicInfo.get_integral;
            this.labelCore.text = scoreAdd.toString();
            this.textsss = new eui.Label;
            this.addChild(this.textsss);
        };
        Activity_RandomPop.prototype.SetInfoEggAni = function () {
            var _this = this;
            var bones = [];
            var paths = [];
            var thisOne = this;
            var _loop_1 = function (k) {
                var v = thisOne.goods[k];
                var item = new zj.Activity_RandomPopItem();
                item.SetInfo(k, v, thisOne);
                thisOne.item_list.push(item);
                var bone = zj.Helper.StringFormat("00%2d_daoju0%2d", Number(k) + 1, Number(k) + 1);
                if (Number(k) + 1 >= 10) {
                    bone = zj.Helper.StringFormat("0%2d_daoju%2d", Number(k) + 1, Number(k) + 1);
                }
                var path = item.groupMain;
                path.anchorOffsetX = path.width / 2;
                path.anchorOffsetY = path.height / 2;
                bones.push(bone);
                paths.push(path);
                var ball_bone = zj.Helper.StringFormat("00%2d_caidan%d", Number(k) + 1, Number(k) + 1);
                if (Number(k) + 1 >= 10) {
                    ball_bone = zj.Helper.StringFormat("0%2d_caidan%d", Number(k) + 1, Number(k) + 1);
                }
                var ball_path = new eui.Image();
                ball_path.width = 100;
                ball_path.height = 100;
                ball_path.anchorOffsetX = ball_path.width / 2;
                ball_path.anchorOffsetY = ball_path.height / 2;
                var ani_id = void 0;
                if (zj.PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    if (zj.PlayerHunterSystem.Table(v.goodsId).aptitude >= 14) {
                        ani_id = "002_daojuguang_01";
                        ball_path.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.random[14], this_1);
                    }
                    else if (zj.PlayerHunterSystem.Table(v.goodsId).aptitude == 13) {
                        ani_id = "004_daojuguang_03";
                        ball_path.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.random[13], this_1);
                    }
                    else {
                        ani_id = "003_daojuguang_02";
                        ball_path.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.random[1], this_1);
                    }
                }
                else {
                    if (zj.PlayerItemSystem.ItemQuality(v.goodsId) >= 5) {
                        ani_id = "002_daojuguang_01";
                        ball_path.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.random[1], this_1);
                    }
                    else if (zj.PlayerItemSystem.ItemQuality(v.goodsId) == 4) {
                        ani_id = "004_daojuguang_03";
                        ball_path.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.random[1], this_1);
                    }
                    else {
                        ani_id = "003_daojuguang_02";
                        ball_path.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.random[1], this_1);
                    }
                }
                var light_node = new eui.Group;
                light_node.anchorOffsetX = light_node.width / 2;
                light_node.anchorOffsetY = light_node.height / 2;
                zj.Game.DragonBonesManager.playAnimation(this_1, "ui_wawaji02_eff", "armatureName", ani_id, 0)
                    .then(function (display) {
                    light_node.addChild(display);
                });
                var light_bone = zj.Helper.StringFormat("00%2d_daoju_guang0%2d", Number(k) + 1, Number(k) + 1);
                if (Number(k) + 1 >= 10) {
                    light_bone = zj.Helper.StringFormat("0%2d_daoju_guang%2d", Number(k) + 1, Number(k) + 1);
                }
                bones.push(light_bone);
                paths.push(light_node);
                bones.push(ball_bone);
                paths.push(ball_path);
                if (zj.PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    // if((PlayerHunterSystem.Table(v.goodsId).aptitude >= 13 && thisOne.goods.length == 10) || (thisOne.goods.length == 1)) {
                    thisOne.arrayItem.push(k);
                    // }
                }
                var generalhistoryids = zj.Game.PlayerHunterHistorySystem.getPokedexSkill();
                for (var kk in generalhistoryids) {
                    var vv = generalhistoryids[kk];
                    if (vv.generalId == v.goodsId) {
                        thisOne.arrayItem2.push(k);
                    }
                }
            };
            var this_1 = this;
            for (var k in thisOne.goods) {
                _loop_1(k);
            }
            if (this.goods.length == 1) {
                zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_wawaji02_eff", null, paths, bones)
                    .then(function (armatureDisplay) {
                    // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     armatureDisplay.animation.stop();
                    //     armatureDisplay.animation.reset();
                    //     armatureDisplay.armature.dispose();
                    //     armatureDisplay.dbClear();
                    //     armatureDisplay.dispose(true);
                    //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    // }, null);
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        armatureDisplay.animation.stop();
                        zj.Game.PlayerInfoSystem.playAnnouce = true;
                        _this.SetButtonOpen();
                    }, thisOne);
                    armatureDisplay.animation.play("000_caiqiu_00", 1);
                    armatureDisplay.x = _this.groupMain.width / 2;
                    armatureDisplay.y = _this.groupMain.height;
                    _this.anminmoy = armatureDisplay;
                    _this.groupMain.addChild(_this.anminmoy);
                    _this.timer.start();
                });
            }
            else {
                zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_wawaji02_eff", null, paths, bones)
                    .then(function (armatureDisplay) {
                    // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     armatureDisplay.animation.stop();
                    //     armatureDisplay.animation.reset();
                    //     armatureDisplay.armature.dispose();
                    //     armatureDisplay.dbClear();
                    //     armatureDisplay.dispose(true);
                    //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    // }, null);
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        armatureDisplay.animation.stop();
                        zj.Game.PlayerInfoSystem.playAnnouce = false;
                        _this.SetButtonOpen();
                    }, thisOne);
                    armatureDisplay.animation.play("001_caiqiu_01", 1);
                    armatureDisplay.x = _this.groupMain2.width / 2;
                    armatureDisplay.y = _this.groupMain2.height / 2;
                    _this.anminmoy = armatureDisplay;
                    _this.groupMain2.addChild(armatureDisplay);
                    _this.timer.start();
                });
            }
        };
        Activity_RandomPop.prototype.update = function () {
            this.time = this.time + 1;
            //console.log(this.time);
            if (this.time >= 94) {
                var time1 = 0;
                time1++;
                if (this.time == 94 + this.arrayItem[this.time2] * 14) {
                    this.animationFrame(this.anminmoy);
                    this.time2++;
                }
            }
            if (this.time >= 240) {
                this.timer.stop();
                this.timer.reset();
            }
        };
        Activity_RandomPop.prototype.SetButtonOpen = function () {
            this.groupMain3.visible = true;
            this.groupMain4.visible = true;
            var show_one = this.goods.length == 1;
            var price = null;
            this.buttonOne.visible = show_one;
            this.buttonMore.visible = !show_one;
            if (show_one) {
                price = this.father.curTopicInfo.consume_token;
            }
            else {
                price = this.father.curTopicInfo.consume_token_ten;
            }
            this.labelMore.text = zj.Game.PlayerInfoSystem.BaseInfo.dollCoin.toString();
            zj.Helper.PlayEff(zj.TableClientSoundResource.Item(30067).sound_path, 100);
        };
        Activity_RandomPop.prototype.animationFrame = function (anminmoy) {
            var _this = this;
            var index = this.arrayItem[this.time2];
            var isPokedex = false;
            var generalHistory = this.father.AllGeneralHistory;
            var general = zj.Table.FindK(generalHistory, zj.PlayerHunterSystem.Table(this.goods[index].goodsId).general_id);
            if (index != null) {
                if (zj.PlayerItemSystem.ItemType(this.goods[index].goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    if ((zj.PlayerHunterSystem.Table(this.goods[index].goodsId).aptitude >= 13 && this.goods.length == 10) || (this.goods.length == 1)) {
                        anminmoy.animation.stop();
                        this.timer.stop();
                        zj.loadUI(zj.CommonGetGeneral)
                            .then(function (dialog) {
                            dialog.setInfo(_this.goods[index].goodsId, 0, function () {
                                anminmoy.animation.play();
                                _this.timer.start();
                            });
                            dialog.show(zj.UI.SHOW_FILL_OUT);
                            // if (general == -1) {
                            //     setTimeout(() => {
                            //         loadUI(TavernGetGeneralPop)
                            //             .then((taverngetgeneralpop: TavernGetGeneralPop) => {
                            //                 taverngetgeneralpop.init(this);
                            //                 egret.Tween.get(taverngetgeneralpop.group1)
                            //                     .call(() => {
                            //                         taverngetgeneralpop.setInof(this.goods[index]);
                            //                         dialog.addChild(taverngetgeneralpop);
                            //                     })
                            //                     .to({ alpha: 1 }, 100)
                            //                     .to({ y: 10 }, 150, egret.Ease.sineInOut)
                            //                     .wait(300, false)
                            //                     .to({ y: -10 }, 150, egret.Ease.sineInOut)
                            //                     .wait(300, false)
                            //                     .call(() => { taverngetgeneralpop.onGroupParent(); })
                            //             });
                            //     }, 300)
                            // }
                        });
                    }
                    else {
                        // if (general == -1) {
                        //     egret.Tween.get(this).wait(700 * this.time2).call(() => {
                        //         setTimeout(() => {
                        //             loadUI(TavernGetGeneralPop)
                        //                 .then((taverngetgeneralpop: TavernGetGeneralPop) => {
                        //                     taverngetgeneralpop.init(this);
                        //                     egret.Tween.get(taverngetgeneralpop.group1)
                        //                         .call(() => {
                        //                             taverngetgeneralpop.setInof(this.goods[index]);
                        //                             this.addChild(taverngetgeneralpop);
                        //                         })
                        //                         .to({ alpha: 1 }, 100)
                        //                         .to({ y: 10 }, 150, egret.Ease.sineInOut)
                        //                         .wait(300, false)
                        //                         .to({ y: -10 }, 150, egret.Ease.sineInOut)
                        //                         .wait(300, false)
                        //                         .call(() => { taverngetgeneralpop.onGroupParent(); })
                        //                 });
                        //         }, 300)
                        //     })
                        // }
                    }
                }
            }
        };
        //再来一次
        Activity_RandomPop.prototype.onButtonOne = function () {
            this.buttonOne.enabled = false;
            this.close();
            this.father.onButtonOne();
        };
        //再来10次
        Activity_RandomPop.prototype.onButtonMore = function () {
            this.buttonMore.enabled = false;
            this.close();
            this.father.onButtonMore();
        };
        //返回
        Activity_RandomPop.prototype.onButtonReturn = function () {
            var _this = this;
            this.buttonReturn.enabled = false;
            zj.loadUI(zj.CommonGetDialog)
                .then(function (dialog) {
                dialog.init(_this.goods);
                dialog.show();
            });
            this.close();
        };
        return Activity_RandomPop;
    }(zj.Dialog));
    zj.Activity_RandomPop = Activity_RandomPop;
    __reflect(Activity_RandomPop.prototype, "zj.Activity_RandomPop");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_RandomPop.js.map