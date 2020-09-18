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
    // author liyunlong  hexiaowei
    // 2018.11.8
    var TavernScene = (function (_super) {
        __extends(TavernScene, _super);
        function TavernScene() {
            var _this = _super.call(this) || this;
            _this.timenpc = [];
            _this.gameinfo = new message.GameInfo();
            _this.timeGift = 0;
            //标记按钮状态
            _this.generalHistory = [];
            _this.ttype = 0;
            _this.num = 0;
            _this.ani_Delay_Time = 2500;
            _this.animationType = false;
            _this.timer = 0;
            _this.vis = true;
            _this.skinName = "resource/skins/tavern/TavernSceneSkin.exml";
            //创建一个计时器对象
            _this.Timer = new egret.Timer(999, 0);
            _this.Timer.start();
            _this.imgSchedule.mask = _this.imgScheduleMask;
            //注册事件侦听器
            _this.Timer.addEventListener(egret.TimerEvent.TIMER, _this.updateTip, _this);
            _this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnReturn, _this);
            _this.group2.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnGroup2End, _this);
            _this.group2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnGroup2Begin, _this);
            _this.group3.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnGroup3End, _this);
            _this.group3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnGroup3Begin, _this);
            _this.btnDrinkFiveSoda.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnDrinkFiveSoda, _this);
            _this.btnDrinkOneSoda.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnDrinkOneSoda, _this);
            _this.buttonArchive.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonArchive, _this);
            _this.buttonShop.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonShop, _this);
            _this.groupRedWine.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnRedWineEnd, _this);
            _this.groupRedWine.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnRedWineBegin, _this);
            _this.groupChampagne.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnChampagneEnd, _this);
            _this.groupChampagne.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnChampagneBegin, _this);
            // this.groupNpc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupDialogue, this);
            _this.buttonBeerGift.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonBeerGift, _this);
            _this.btnRum1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRum1, _this);
            _this.groupActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.openServerActive, _this);
            _this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAdddiamond, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.labelCloseTheTip); // 因为是循环播放，需要特别处理
            }, null);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeGroup, _this);
            _this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtn1, _this);
            _this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtn2, _this);
            _this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtn3, _this);
            _this.btnRum.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRum, _this);
            _this.btnDrinkOneRum.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnDrinkOneRum, _this);
            _this.btnDrinkOneRum.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnDrinkOneRum1, _this);
            _this.btnDrinkFiveRum.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnDrinkFiveRum, _this);
            _this.btnDrinkFiveRum.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnDrinkFiveRum1, _this);
            _this.imgRunFrame.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.setonimgGift, _this);
            _this.imgRunIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.setonimgGift, _this);
            _this.btnDrinkOneSoda.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnDrinkOneSuDa, _this);
            _this.btnDrinkFiveSoda.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnDrinkOneSuDa1, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.updateUIStates, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, _this.updateUIStates, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_ACTIVITY_INFO_CHANGE, _this.updateUIStates, _this);
            _this.RumInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == 23;
            })[0];
            if (_this.RumInfo) {
                _this.groupRecruit.visible = true;
                _this.GroupUpchi.visible = true;
                _this.btnRum.visible = true;
                _this.update = egret.setInterval(_this.Update, _this, 1000);
                _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                    egret.clearInterval(_this.update);
                    egret.Tween.removeTweens(_this);
                }, _this);
                _this.Update();
                _this.groupBtn.y = 265;
                _this.onBtnRum();
            }
            else {
                _this.GroupUpchi.visible = false;
                _this.groupRecruit.visible = false;
                _this.btnRum.visible = false;
                _this.groupBtn.y = 100;
                _this.onBtn2();
            }
            _this.updateUIStates();
            _this.imageRect.visible = false;
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.touchSoda = false;
            _this.touchBeer = false;
            _this.labelCloseTheTip.visible = false;
            _this.setUI();
            _this.initFunction();
            _this.ttype = 0;
            _this.num = 0;
            //酒馆主场景龙骨动画
            var dbname = "jg_zhaomu";
            if (RES.getRes("jg_zhaomu_large_tex_png"))
                dbname = "jg_zhaomu_large";
            zj.Game.DragonBonesManager.playAnimation(_this, dbname, "armatureName", null, 0)
                .then(function (display) {
                display.x = _this.width * 0.45;
                display.y = _this.height / 2;
                if (_this.height - 50 > 640) {
                    var a = _this.height;
                    var n = (_this.height - 50) / 640;
                    display.scaleX = n;
                    display.scaleY = n;
                }
                _this.groupAnimation.addChild(display);
                // this.addAnimatoin("role");
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            _this.setTavernActivityPage();
            _this.addActivityAnimatoin("icon_fuli", "005_huodong");
            _this.addBeerOpenActivities("pijiu_dazhe", null);
            if (zj.Device.isReviewSwitch) {
                _this.groupSoda.visible = false;
                _this.groupSeniorWine.visible = false;
                _this.groupBeerGift.visible = false;
                _this.groupActivity.visible = false;
                _this.groupGiftTime.visible = false;
                _this.groupButtonArchive.visible = false;
                _this.jewel.width = 40;
                _this.jewel.height = 40;
                _this.btnAdddiamond.width = 30;
                _this.btnAdddiamond.height = 30;
                _this.btnAdddiamond.y = 7;
            }
            //图鉴暂时隐藏
            _this.groupButtonArchive.visible = false;
            _this.btnReturn.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
            }, null);
            return _this;
        }
        TavernScene.prototype.Update = function () {
            var infotime = (this.RumInfo.closeTime - this.RumInfo.openTime) - (zj.Game.Controller.curServerTime - this.RumInfo.openTime); //- Math.floor(egret.getTimer() / 1000) 
            var day = Math.floor(infotime / 3600 / 24);
            var hour = Math.floor(infotime / 3600 % 24);
            var min = Math.floor(infotime / 60 % 60);
            var miao = Math.floor(infotime % 60);
            this.labelTime1.text = "活动时间:" + day + "天" + hour + ":" + min + ":" + miao;
        };
        TavernScene.prototype.removeEvent = function () {
            this.imageRect.visible = false;
        };
        TavernScene.prototype.AddEvent = function () {
            this.imageRect.visible = true;
        };
        /**UP池招募奖励领取或展示 */
        TavernScene.prototype.setonimgGift = function () {
            var _this = this;
            var type = 0;
            var _loop_1 = function (i) {
                var vis = zj.Table.FindF(this_1.RumInfo.rewardIndex, function (k, v) {
                    return v == i + 1;
                });
                if (!vis) {
                    type = i;
                    i = 4;
                    return out_i_1 = i, "break";
                }
                out_i_1 = i;
            };
            var this_1 = this, out_i_1;
            for (var i = 0; i < this.RumInfo.missions.length; i++) {
                var state_1 = _loop_1(i);
                i = out_i_1;
                if (state_1 === "break")
                    break;
            }
            //判断朗姆酒数量是否满足
            if (this.RumInfo.itemCount >= this.RumInfo.missions[type].mission_condition) {
                zj.Game.PlayerActivitySystem.activityReward(this.RumInfo.type, this.RumInfo.index, type + 1, true)
                    .then(function (resp) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(resp.getGoods);
                        dialog.setCB(function () {
                            _this.updateUIStates();
                        });
                        dialog.show();
                    });
                }).catch(function () {
                });
            }
            else {
                //展示奖励
                var bFinish = false;
                var bReward = true;
                // loadUI(Daily_AwardPop)
                //     .then((dialog: Daily_AwardPop) => {
                //         dialog.SetInfoGift(this.RumInfo.missions[type].rewards, bFinish, bReward, null);
                //         dialog.show(UI.SHOW_FROM_TOP)
                //     })
                zj.loadUI(zj.TavernSceneRun)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        /**点击左侧红酒&香槟 */
        TavernScene.prototype.onBtn1 = function () {
            this.setGroupVisible(1);
        };
        /**点击左侧冰爽啤酒 */
        TavernScene.prototype.onBtn2 = function () {
            this.setGroupVisible(2);
        };
        /**点击左侧苏打水 */
        TavernScene.prototype.onBtn3 = function () {
            this.setGroupVisible(3);
        };
        /**点击朗姆酒礼包 */
        TavernScene.prototype.onBtnRum = function () {
            this.setGroupVisible(4);
        };
        //设置酒水种类的隐藏与否
        TavernScene.prototype.setGroupVisible = function (type) {
            this.groupBeer.visible = false;
            this.groupSoda.visible = false;
            this.groupSeniorWine.visible = false;
            this.groupRum.visible = false;
            this.groupRecruit.visible = false;
            this.groupRum1.visible = false;
            this.groupBeerGift.visible = false;
            this.GroupUpchi.visible = false;
            this.btnRum.enabled = true;
            this.btn1.enabled = true;
            this.btn2.enabled = true;
            this.btn3.enabled = true;
            switch (type) {
                case 1:
                    this.btn1.enabled = false;
                    this.groupSeniorWine.visible = true;
                    break;
                case 2:
                    this.groupBeer.visible = true;
                    this.groupBeerGift.visible = true;
                    this.btn2.enabled = false;
                    break;
                case 3:
                    this.groupSoda.visible = true;
                    this.btn3.enabled = false;
                    break;
                case 4:
                    this.groupRum.visible = true;
                    this.btnRum.enabled = false;
                    this.groupRecruit.visible = true;
                    this.GroupUpchi.visible = true;
                    if (this.RumInfo.missions.length == this.RumInfo.rewardIndex.length) {
                        this.GroupUpchi.visible = false;
                    }
                    var vis = zj.Table.FindF(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                        return v.gift_index == 100211;
                    });
                    this.btnRum1.visible = vis;
                    this.groupRum1.visible = true;
                    break;
            }
        };
        //更新金币 钻石
        TavernScene.prototype.updateUIStates = function () {
            var token = zj.Game.PlayerInfoSystem.Token;
            if (token > 100000) {
                this.labelToken.text = Math.floor((token / 10000) * 100) / 100 + "万";
            }
            else {
                this.labelToken.text = token.toString();
            }
            var lotteryscore = zj.Game.PlayerInfoSystem.LotteryScore;
            if (lotteryscore > 100000) {
                this.labelIntegrate.text = Math.floor((lotteryscore / 10000) * 10) / 10 + "万";
            }
            else {
                this.labelIntegrate.text = lotteryscore.toString();
            }
            this.RumInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == 23;
            })[0];
            this.labelSoda.text = zj.Game.PlayerInfoSystem.Soda.toString();
            this.labelSoda1.text = zj.Game.PlayerInfoSystem.Soda.toString();
            this.labelRum1.text = zj.Game.PlayerInfoSystem.Rum.toString();
            this.labelBeer.text = zj.Game.PlayerInfoSystem.Beer.toString();
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.uplotter_dayfree.length == 0) {
                this.labelRum.text = "首次免费";
            }
            else {
                this.labelRum.text = zj.Game.PlayerInfoSystem.Rum.toString();
            }
            var visnumber = 0;
            if (this.RumInfo) {
                if (this.RumInfo.missions.length == this.RumInfo.rewardIndex.length) {
                    this.GroupUpchi.visible = false;
                }
                else {
                    var _loop_2 = function (i) {
                        var vis = zj.Table.FindF(this_2.RumInfo.rewardIndex, function (k, v) {
                            return v == i + 1;
                        });
                        if (!vis) {
                            visnumber = i;
                            i = 4;
                            return out_i_2 = i, "break";
                        }
                        out_i_2 = i;
                    };
                    var this_2 = this, out_i_2;
                    for (var i = 0; i < this.RumInfo.missions.length; i++) {
                        var state_2 = _loop_2(i);
                        i = out_i_2;
                        if (state_2 === "break")
                            break;
                    }
                    this.labelcont.text = "当前阶段：" + this.RumInfo.itemCount + "/" + this.RumInfo.missions[visnumber].mission_condition;
                    var generalId = this.RumInfo.missions[visnumber].rewards[0].goodsId;
                    var count = this.RumInfo.missions[visnumber].rewards[0].count;
                    this.labelRunNumber.text = zj.Set.NumberUnit2(count);
                    this.imgRunFrame.source = zj.cachekey(zj.PlayerItemSystem.Set(generalId, null, count).Frame, this);
                    this.imgRunIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(generalId), this);
                    var scx = this.RumInfo.itemCount / this.RumInfo.missions[visnumber].mission_condition;
                    this.imglingqu.visible = scx >= 1 && (this.RumInfo.rewardIndex.length != this.RumInfo.missions.length);
                    this.imgScheduleMask.width = (scx > 1 ? 1 : scx) * 200;
                }
            }
            this.SetCountFirst();
        };
        //酒馆开服活动动画
        TavernScene.prototype.addActivityAnimatoin = function (dbName, animationName, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, 0)
                .then(function (display) {
                display.x = 65;
                display.y = 65;
                //this.groupAnimation.addChild(display);
                _this.groupActivity.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        //酒馆开服活动动画
        TavernScene.prototype.addBeerOpenActivities = function (dbName, animationName, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, 0)
                .then(function (display) {
                display.x = 25;
                display.y = 25;
                //this.groupAnimation.addChild(display);
                _this.groupOpenActivities.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        //酒馆啤酒八折动画
        TavernScene.prototype.addBeerEightActivities = function (dbName, animationName, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, 0)
                .then(function (display) {
                display.x = _this.groupTimeLimit.width / 2;
                display.y = _this.groupTimeLimit.height / 2;
                //this.groupAnimation.addChild(display);
                _this.groupTimeLimit.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        //酒馆抽奖播放动画
        TavernScene.prototype.addAnimatoin001_putong = function (dbName, animationName, playTimes, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = zj.UIManager.StageWidth * 0.45;
                display.y = zj.UIManager.StageHeight / 2;
                _this.groupAnimation.addChild(display);
                _this.tavernDoorKeelAnimation = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        TavernScene.prototype.nPCDialog = function () {
            // this.onGroupDialogue();
        };
        TavernScene.prototype.SetInfoOpen = function (id) {
            var sound = zj.TableClientSoundResource.Item(id);
            var textDrop = sound.sound_path;
            var strs = new Array();
            strs = textDrop.split("/");
            var soundtext = strs[2];
            soundtext = soundtext.replace('.', '_');
            return soundtext;
        };
        TavernScene.prototype.setInfo = function () {
        };
        TavernScene.prototype.initFunction = function () {
            var _this = this;
            var _loop_3 = function (i) {
                this_3["group_" + i] = function () {
                    if (i == 1 && zj.Game.PlayerInfoSystem.Soda == 0) {
                        _this.setUI();
                    }
                    else if (i == 1 && zj.Game.PlayerInfoSystem.Soda > 1) {
                        _this.teach_pop = true;
                        if (!_this.touchSoda) {
                            // this.group4.visible = false;
                        }
                        else {
                        }
                        if (zj.Game.PlayerInfoSystem.Soda >= 5) {
                            // this.labelMore.text = TextsConfig.TextsConfig_Hunter_Tavern.again
                        }
                        else {
                            var formatString = zj.TextsConfig.TextsConfig_Hunter_Tavern.again_next;
                            // this.labelMore.text = HelpUtil.textConfigFormat(formatString, Game.PlayerInfoSystem.Soda)
                        }
                        _this.setUI();
                        _this.touchSoda = !_this.touchSoda;
                        _this.touchBeer = false;
                    }
                    else if (i == 1 && zj.Game.PlayerInfoSystem.Soda == 1) {
                    }
                    else if (i == 2) {
                        if (zj.Game.PlayerInfoSystem.Beer > 1) {
                            _this.reqFindHero(i, 1);
                        }
                    }
                    else if (i == 3) {
                        if (zj.Game.PlayerInfoSystem.Beer > 10) {
                            _this.reqFindHero(i, 10);
                        }
                    }
                    else if (i == 4) {
                        _this.setUI();
                        _this.touchBeer = !_this.touchBeer;
                        _this.touchSoda = false;
                    }
                    else {
                    }
                };
            };
            var this_3 = this;
            // Teach.addTeaching();
            for (var i = 1; i <= 6; i++) {
                _loop_3(i);
            }
            return;
        };
        //酒馆数据初始化
        TavernScene.prototype.setUI = function () {
            //显示免费/啤酒数量（每天4点免费一次）
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.first_beer) {
                this.LabelCost1_2.text = zj.Game.PlayerInfoSystem.BaseInfo.beer.toString();
                this.LabelCost1_2.visible = false;
                this.labelBeer.visible = true;
            }
            else {
                this.LabelCost1_2.text = zj.TextsConfig.TextConfig_League.freeName;
                this.LabelCost1_2.visible = true;
                this.labelBeer.visible = false;
            }
            if (zj.Game.PlayerInfoSystem.Level >= 2) {
                var beerGiftInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                    return v.gift_index == 100202;
                });
                var date = zj.Game.Controller.serverNow();
                var humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
                var serverTime = humanDate.getTime() / 1000 - 8 * 60 * 60;
                var beerTblInfo = zj.PlayerGiftSystem.Instance_item(100202);
                if (beerTblInfo != null) {
                    if (beerGiftInfo[0] != null) {
                        var timenew = (beerGiftInfo[0].trigger_time + beerTblInfo.duration) - serverTime;
                        if (timenew > 0) {
                        }
                    }
                }
            }
            this.setInfoBeerGift();
            this.labelBeer.text = zj.Game.PlayerInfoSystem.Beer.toString();
            if (zj.Game.PlayerInfoSystem.Beer < 10) {
                //Helper.RGBToHex("r:255,g:0,b:0");
                this.labelBeer10.textColor = zj.Helper.RGBToHex("r:255,g:0,b:0");
            }
            else {
                this.labelBeer10.textColor = zj.Helper.RGBToHex("r:212,g:224,b:238");
            }
            this.labelBeer10.text = zj.Game.PlayerInfoSystem.Beer.toString();
            this.labelSoda.text = zj.Game.PlayerInfoSystem.Soda.toString();
            this.labelSoda1.text = zj.Game.PlayerInfoSystem.Soda.toString();
            this.labelWine.text = zj.Game.PlayerInfoSystem.RedWine.toString();
            this.labelBubbly.text = zj.Game.PlayerInfoSystem.Champagne.toString();
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.uplotter_dayfree.length == 0) {
                this.labelRum.text = "首次免费";
            }
            else {
                this.labelRum.text = zj.Game.PlayerInfoSystem.Rum.toString();
            }
            this.labelRum1.text = zj.Game.PlayerInfoSystem.Rum.toString();
            this.labelTips1.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_1);
            this.labelTips2.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_2);
            this.labelTips3.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_3);
            this.labelTips4.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_4);
            this.labelTips.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_4);
            this.labelTips5.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_5);
            // this.labelTips6.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_6);
            this.labelTips7.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_7);
            this.labelTips8.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_8);
            var lotteryscore = zj.Game.PlayerInfoSystem.LotteryScore;
            if (lotteryscore > 100000) {
                this.labelIntegrate.text = Math.floor((lotteryscore / 10000) * 10) / 10 + "万";
                //this.labelIntegrate.text =(lotteryscore/10000).toFixed(1)+"万";
            }
            else {
                this.labelIntegrate.text = lotteryscore.toString();
            }
            //钻石数量
            var token = zj.Game.PlayerInfoSystem.Token;
            if (token > 100000) {
                this.labelToken.text = Math.floor((token / 10000) * 100) / 100 + "万";
                //this.labelToken.text = (token / 10000).toFixed(2) + "万";
            }
            else {
                this.labelToken.text = token.toString();
            }
            this.updateTip();
            this.SetInfoTavernMallNewProduct();
        };
        TavernScene.prototype.SetInfoTavernMallNewProduct = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.MALL)) {
                var times = zj.Tips.GetSaveByMallNewProduct(message.EMallType.MALL_TYPE_HONOR);
                // this.imageNew.visible = (times < 3);
            }
        };
        TavernScene.prototype.updateTip = function () {
            if (!zj.Device.isReviewSwitch) {
                this.imageNew2.visible = this.allItemImage();
            }
            else {
                this.imageNew2.visible = false;
            }
        };
        TavernScene.prototype.allItemImage = function () {
            return false;
        };
        TavernScene.prototype.SetCountFirst = function () {
            // 显示免费/啤酒数量（每天4点免费一次）
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.first_beer) {
                this.LabelCost1_2.text = zj.Game.PlayerInfoSystem.BaseInfo.beer.toString();
                this.labelBeer10.text = zj.Game.PlayerInfoSystem.BaseInfo.beer.toString();
            }
            else {
                this.LabelCost1_2.text = zj.TextsConfig.TextConfig_League.freeName;
                this.labelBeer10.text = zj.Game.PlayerInfoSystem.BaseInfo.beer.toString();
            }
        };
        //苏打水按钮抬起
        TavernScene.prototype.onBtnEnd = function () {
            if (zj.Game.PlayerInfoSystem.Soda == 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_Tavern.soda);
                this.setUI();
            }
            else if (zj.Game.PlayerInfoSystem.Soda > 1) {
                if (zj.Game.PlayerInfoSystem.Soda >= 5) {
                    // this.labelMore.text = TextsConfig.TextsConfig_Hunter_Tavern.again
                }
                else {
                    var formatString = zj.TextsConfig.TextsConfig_Hunter_Tavern.again_next;
                    // this.labelMore.text = HelpUtil.textConfigFormat(formatString, Game.PlayerInfoSystem.Soda)
                }
                this.setUI();
            }
            else if (zj.Game.PlayerInfoSystem.Soda == 1) {
                var num = 1;
                this.reqFindHero(4, num);
                this.setUI();
            }
        };
        /**朗姆酒1杯 */
        TavernScene.prototype.onBtnDrinkOneRum = function () {
            var _this = this;
            if (zj.Game.PlayerInfoSystem.Rum < 1 && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.uplotter_dayfree.length != 0) {
                this.removeEvent();
                this.updateUIStates();
                zj.loadUI(zj.TavernBuyPop)
                    .then(function (tavernBuyPop) {
                    tavernBuyPop.init(_this);
                    tavernBuyPop.setInfo(20032, zj.Game.PlayerInfoSystem.Rum, 1);
                    tavernBuyPop.show(zj.UI.SHOW_FROM_TOP);
                    _this.setUI();
                });
            }
            else {
                if (this.vis == true) {
                    this.vis = false;
                    this.num = 1;
                    this.ttype = 1;
                    zj.Game.PlayerInfoSystem.playAnnouce = false;
                    zj.PlayerInfoSystem.ActivityLotterPond(1, 1)
                        .then(function (data) {
                        egret.Tween.get(_this).wait(1000).call(function () {
                            _this.vis = true;
                        });
                        _this.reqFindHero_Visit(data);
                    })
                        .catch(function (reason) {
                        _this.vis = true;
                        _this.removeEvent();
                    });
                }
            }
        };
        /**朗姆酒10杯 */
        TavernScene.prototype.onBtnDrinkFiveRum = function () {
            var _this = this;
            if (zj.Game.PlayerInfoSystem.Rum < 10) {
                this.removeEvent();
                this.updateUIStates();
                zj.loadUI(zj.TavernBuyPop)
                    .then(function (tavernBuyPop) {
                    tavernBuyPop.init(_this);
                    tavernBuyPop.setInfo(20032, zj.Game.PlayerInfoSystem.Rum, 10);
                    tavernBuyPop.show(zj.UI.SHOW_FROM_TOP);
                    _this.setUI();
                });
            }
            else {
                if (this.vis == true) {
                    this.vis = false;
                    this.num = 10;
                    this.ttype = 1;
                    zj.Game.PlayerInfoSystem.playAnnouce = false;
                    zj.PlayerInfoSystem.ActivityLotterPond(1, 10)
                        .then(function (data) {
                        egret.Tween.get(_this).wait(1000).call(function () {
                            _this.vis = true;
                        });
                        _this.reqFindHero_Visit(data);
                    })
                        .catch(function (reason) {
                        _this.vis = true;
                        _this.removeEvent();
                    });
                }
            }
        };
        //再喝十杯朗姆酒
        TavernScene.prototype.onBtnDrinkAnother10Run = function () {
            this.onBtnDrinkFiveRum();
            this.setUI();
        };
        TavernScene.prototype.onBtnDrinkOneRum1 = function () {
            this.btnDrinkOneRum.scaleX = 1.2;
            this.btnDrinkOneRum.scaleY = 1.2;
        };
        TavernScene.prototype.onBtnDrinkFiveRum1 = function () {
            this.btnDrinkFiveRum.scaleX = 1.2;
            this.btnDrinkFiveRum.scaleY = 1.2;
        };
        //1杯啤酒按钮抬起
        TavernScene.prototype.onBtnGroup2End = function () {
            var _this = this;
            this.AddEvent();
            this.group2.scaleX = 1;
            this.group2.scaleY = 1;
            var a = zj.Game.PlayerInfoSystem.Beer;
            if (zj.Game.PlayerInfoSystem.Beer < 1 && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.first_beer) {
                this.removeEvent();
                zj.loadUI(zj.TavernBuyPop)
                    .then(function (tavernBuyPop) {
                    tavernBuyPop.init(_this);
                    tavernBuyPop.setInfo(20020, zj.Game.PlayerInfoSystem.Beer, 1);
                    tavernBuyPop.show(zj.UI.SHOW_FROM_TOP);
                    _this.setUI();
                });
            }
            else {
                this.reqFindHero(1, 1);
                this.setUI();
            }
        };
        //1杯啤酒按钮按下
        TavernScene.prototype.onBtnGroup2Begin = function () {
            this.group2.scaleX = 1.2;
            this.group2.scaleY = 1.2;
        };
        //喝冰爽啤酒10杯按钮抬起
        TavernScene.prototype.onBtnGroup3End = function () {
            var _this = this;
            this.AddEvent();
            this.group3.scaleX = 1;
            this.group3.scaleY = 1;
            if (zj.Game.PlayerInfoSystem.Beer >= 10) {
                this.reqFindHero(5, 10);
                this.setUI();
            }
            else {
                this.removeEvent();
                zj.loadUI(zj.TavernBuyPop)
                    .then(function (tavernBuyPop) {
                    tavernBuyPop.init(_this);
                    tavernBuyPop.setInfo(20020, zj.Game.PlayerInfoSystem.Beer, 10);
                    tavernBuyPop.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        //再喝十杯啤酒
        TavernScene.prototype.onBtnDrinkAnother10Beel = function () {
            this.reqFindHero(5, 10);
            this.setUI();
        };
        //弹出十杯啤酒之后的页面
        TavernScene.prototype.onBtn10Beer = function (info) {
            var _this = this;
            zj.loadUI(zj.TavernPopA)
                .then(function (tavernpopa) {
                tavernpopa.init(_this, (_this.btnRum.enabled == false));
                tavernpopa.setInfo(info);
                _this.addChild(tavernpopa);
                tavernpopa.setInfoAni(1);
                _this.ontaverngetgeneralpop(10, 1, info);
            });
        };
        //喝冰爽啤酒10杯按钮按下
        TavernScene.prototype.onBtnGroup3Begin = function () {
            this.group3.scaleX = 1.2;
            this.group3.scaleY = 1.2;
        };
        //高级美酒按钮抬起
        TavernScene.prototype.onBtn4End = function () {
        };
        //高级美酒按钮按下
        TavernScene.prototype.onBtn4Begin = function () {
        };
        //返回主界面
        TavernScene.prototype.onBtnReturn = function () {
            // Teach.addTeaching();
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_ACTIVITY_INFO_CHANGE, this.updateUIStates, this);
            this.Timer.stop();
            this.Timer.reset();
            zj.Game.PlayerInfoSystem.playAnnouce = true;
            this.close();
        };
        //连喝n杯苏打水
        TavernScene.prototype.onBtnDrinkFiveSoda = function () {
            //toast("n杯");  
            this.AddEvent();
            var num = zj.Game.PlayerInfoSystem.Soda > 5 ? 5 : zj.Game.PlayerInfoSystem.Soda;
            if (num < 1) {
                num = 1;
            }
            this.reqFindHero(4, num);
            this.setUI();
        };
        //再喝n杯苏打水
        TavernScene.prototype.onBtnxxxSoda = function (popNum) {
            //toast("再喝n杯");
            this.reqFindHero(4, popNum);
            this.setUI();
        };
        //连喝多瓶苏打水弹出的页面
        TavernScene.prototype.onBtnNSoda = function (info) {
            var _this = this;
            zj.loadUI(zj.TavernPop)
                .then(function (tavernPop) {
                tavernPop.init(_this);
                tavernPop.setInfo(info);
                _this.addChild(tavernPop); //tavernPop.show(); 
                tavernPop.setInfoAni(1);
            });
        };
        TavernScene.prototype.onBtnDrinkOneSuDa = function () {
            this.btnDrinkOneSoda.scaleX = 1.2;
            this.btnDrinkOneSoda.scaleY = 1.2;
        };
        TavernScene.prototype.onBtnDrinkOneSuDa1 = function () {
            this.btnDrinkFiveSoda.scaleX = 1.2;
            this.btnDrinkFiveSoda.scaleY = 1.2;
        };
        //喝一杯苏打水
        TavernScene.prototype.onBtnDrinkOneSoda = function () {
            //toast("1杯");
            this.AddEvent();
            var num = 1;
            this.reqFindHero(4, num);
            this.setUI();
        };
        //传协议
        // type (抽奖类型)  num(抽奖数量)
        TavernScene.prototype.reqFindHero = function (type, num) {
            var _this = this;
            if (this.vis) {
                this.vis = false;
                this.ttype = type;
                this.num = num;
                if (type == 5) {
                    type = 1;
                }
                zj.Game.PlayerInfoSystem.playAnnouce = false;
                zj.PlayerInfoSystem.compose(type, num)
                    .then(function (data) {
                    egret.Tween.get(_this).wait(1000).call(function () {
                        _this.vis = true;
                    });
                    _this.reqFindHero_Visit(data);
                })
                    .catch(function (reason) {
                    _this.vis = true;
                    _this.removeEvent();
                });
            }
        };
        //抽取单个猎人（1杯（苏打水、红酒、啤酒、香槟））
        // i 等于1时为单个猎人抽取，等于2时为十连抽出现A-S级猎人
        // type 抽奖类型
        // num 猎人的初始化等级（星级）
        TavernScene.prototype.onCommonTavern = function (i, goodsId, info, type, num) {
            var _this = this;
            zj.loadUI(zj.TavernGetGeneral)
                .then(function (taverngetgeneral) {
                taverngetgeneral.init(_this);
                taverngetgeneral.setInfo(goodsId, type, num);
                _this.addChild(taverngetgeneral); //taverngetgeneral.show();
                taverngetgeneral.name = "getGeneral";
                zj.Game.EventManager.event(zj.GameEvent.SHOW_UI, { typeName: "getGeneral" });
                if (i == 1) {
                    _this.ontaverngetgeneralpop(1, 1, info);
                }
                else {
                    return;
                }
                _this.setUI();
            });
        };
        //十连抽啤酒出现A-S级猎人调用的回调方法
        TavernScene.prototype.test = function (callback_function_ok, callback_this, goodsId) {
            this.callback_function_ok = callback_function_ok;
            this.callback_this = callback_this;
            console.log(this.callback_function_ok);
            this.onCommonTavern(2, goodsId);
            this.setUI();
        };
        //解锁猎人界面
        // num  总循环次数
        // i    第几次循环
        TavernScene.prototype.ontaverngetgeneralpop = function (num, i, info) {
            if (i > num || num == 0)
                return;
            if (zj.Table.FindK(this.generalHistory, zj.PlayerHunterSystem.Table(info[i - 1].goodsId).general_id) != -1) {
                this.ontaverngetgeneralpop(num, i++, info);
            }
            else {
                this.setUI();
            }
        };
        //恭喜获得页面
        //  i (等于1时，是为十连抽，等于2时为单个猎人抽取)
        //  type(抽奖类型（啤酒、苏打、红酒等）)
        //  num（抽的数量）
        TavernScene.prototype.onEarnPoint = function (i, goodsId, type, num) {
            var _this = this;
            if (i === void 0) { i = 0; }
            if (this.callback_function_ok) {
                if (i == 1) {
                    zj.loadUI(zj.TavernGet)
                        .then(function (tavernget) {
                        tavernget.init(_this);
                        tavernget.setInfo(1);
                        tavernget.show(); //this.addChild(tavernget);
                        tavernget.setInfoAni();
                    });
                }
                else {
                    console.log("LOG");
                    this.callback_function_ok.call(this.callback_this);
                    this.callback_function_ok;
                }
            }
            else {
                if (i == 2) {
                    zj.loadUI(zj.TavernGet)
                        .then(function (tavernget) {
                        tavernget.init(_this);
                        tavernget.setInfo(2, goodsId, type, num);
                        tavernget.show(); //this.addChild(tavernget);
                        tavernget.setInfoAni();
                    });
                }
                else {
                    zj.loadUI(zj.TavernGet)
                        .then(function (tavernget) {
                        tavernget.init(_this);
                        tavernget.setInfo(1);
                        tavernget.show(); //this.addChild(tavernget);
                        tavernget.setInfoAni();
                    });
                }
            }
        };
        //操作一杯（苏打、啤酒、红酒）计算所得酒馆积分
        // type  抽奖类型
        // num   抽奖数量
        TavernScene.prototype.onEarnPointOne = function (goodsId, type, num) {
            var _this = this;
            zj.loadUI(zj.TavernGet)
                .then(function (tavernget) {
                tavernget.init(_this);
                tavernget.setInfo(2, goodsId, type, num);
                tavernget.show(); //this.addChild(tavernget); 
                tavernget.setInfoAni();
                console.log("——————————————————————————" + "新手引导： 酒馆恭喜获得打开" + "——————————————————————————");
            });
        };
        //啤酒十连抽最后一次出现A级以上猎人
        TavernScene.prototype.onTavernget = function () {
            var _this = this;
            zj.loadUI(zj.TavernGet)
                .then(function (dialog) {
                dialog.init(_this);
                dialog.setInfo(1);
                dialog.show();
                //this.addChild(dialog);
                dialog.setInfoAni();
            });
        };
        //红酒按钮抬起操作
        TavernScene.prototype.onBtnRedWineEnd = function () {
            this.AddEvent();
            //toast("红酒");
            this.groupRedWine.scaleX = 1;
            this.groupRedWine.scaleY = 1;
            if (zj.Game.PlayerInfoSystem.RedWine == 0) {
                this.removeEvent();
                zj.toast_warning("红酒不足");
                this.setUI();
            }
            else {
                this.reqFindHero(2, 1);
                this.setUI();
            }
        };
        //红酒按钮按下操作
        TavernScene.prototype.onBtnRedWineBegin = function () {
            //toast("红酒");
            this.groupRedWine.scaleX = 1.2;
            this.groupRedWine.scaleY = 1.2;
        };
        //香槟抬起操作
        TavernScene.prototype.onBtnChampagneEnd = function () {
            this.AddEvent();
            this.groupChampagne.scaleX = 1;
            this.groupChampagne.scaleY = 1;
            if (zj.Game.PlayerInfoSystem.Champagne == 0) {
                this.removeEvent();
                zj.toast_warning("香槟不足");
                this.setUI();
            }
            else {
                this.reqFindHero(3, 1);
                this.setUI();
            }
        };
        //香槟按下操作
        TavernScene.prototype.onBtnChampagneBegin = function () {
            //toast("香槟");
            this.groupChampagne.scaleX = 1.2;
            this.groupChampagne.scaleY = 1.2;
        };
        TavernScene.prototype.typerEffect = function (obj, content, interval, backFun) {
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
        //接受协议传回来的值
        TavernScene.prototype.reqFindHero_Visit = function (msg) {
            var _this = this;
            var tavernmask = new zj.TavernMask();
            if (zj.Teach.BeInTeaching() == false) {
                //点击任意区域关闭
                this.labelCloseTheTip.visible = true;
                egret.Tween.get(this.labelCloseTheTip, { loop: true })
                    .to({ alpha: 1 }, 1000)
                    .to({ alpha: 0 }, 1000);
                tavernmask.init(this);
                this.addChild(tavernmask);
                tavernmask.name = "tavernmask";
                this.removeEvent();
            }
            // this.group6.visible = false;
            if (this.num == 1 || this.num == 0) {
                var heroId_1 = 0;
                if (zj.PlayerItemSystem.ItemType(msg.gameInfo.getGoods[0].goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    heroId_1 = msg.gameInfo.getGoods[0].goodsId;
                }
                else if (msg.gameInfo.getGoods[0].index > 0 && zj.PlayerItemSystem.ItemType(msg.gameInfo.getGoods[0].index) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    heroId_1 = msg.gameInfo.getGoods[0].index;
                }
                if (heroId_1 != 0) {
                    var info = zj.PlayerHunterSystem.Table(heroId_1);
                    var dbname = "jg_zhaomu";
                    if (RES.getRes("jg_zhaomu_large_tex_png"))
                        dbname = "jg_zhaomu_large";
                    if (info.aptitude >= 13) {
                        this.addAnimatoin001_putong(dbname, "002_gaoji", 1);
                        //this.sence.ChangeAction(2)
                    }
                    else {
                        this.addAnimatoin001_putong(dbname, "001_putong", 1);
                        //this.sence.ChangeAction(1)
                    }
                }
                else {
                    // this.sence.ChangeAction(1)
                }
                //this.sence.SetLoop(false)
                egret.Tween.get(this).wait(30).call(function () {
                    zj.Game.SoundManager.playMusic(_this.SetInfoOpen(31053), 1);
                }).wait(500).call(function () {
                    zj.Game.SoundManager.playMusic(_this.SetInfoOpen(31054), 1);
                }).wait(2800).call(function () {
                    zj.Game.SoundManager.playMusic(_this.SetInfoOpen(31055), 1);
                }).wait(2800).call(function () {
                    zj.Game.SoundManager.playMusic("city_mp3", 0);
                });
                var cur_time_1 = 0;
                this.timer = setInterval(function () {
                    cur_time_1 = cur_time_1 + 500;
                    if (cur_time_1 >= _this.ani_Delay_Time || _this.animationType == true) {
                        //this.sence.ChangeAction(0)
                        //this.sence.SetLoop(true)
                        _this.labelCloseTheTip.visible = false;
                        if (tavernmask.parent)
                            _this.removeChild(tavernmask);
                        _this.animationType = false;
                        _this.onCommonTavern(1, heroId_1, msg.gameInfo.getGoods, _this.ttype, _this.num);
                        zj.Game.PlayerInfoSystem.playAnnouce = true;
                        msg.gameInfo.getGoods.push(_this.lotter);
                        var hero = zj.Table.FindR(msg.gameInfo.getGoods, function (key, var_) {
                            return (zj.PlayerItemSystem.ItemType(var_.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) ||
                                (var_.index > 0 && zj.PlayerItemSystem.ItemType(var_.index) == message.EGoodsType.GOODS_TYPE_GENERAL);
                        })[0];
                        if (hero != null) {
                            var hunterId = 0;
                            if (hero.index > 0 && zj.PlayerItemSystem.ItemType(hero.index) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                                hunterId = hero.index;
                            }
                            else {
                                hunterId = hero.goodsId;
                            }
                        }
                        else {
                            var mn = msg.gameInfo.getGoods;
                            //TipMgr.GetList(msg.gameInfo.getGoods, this, this.SetUI,null,null,TableEnum.Enum.HXHGetGoodsFromType.Tavern)
                        }
                        clearInterval(_this.timer);
                        //this.labelMap.LabelCloseTip.node.active = false;
                    }
                }, 500);
            }
            else if (this.ttype == 4 && this.num > 1) {
                var has_high_aptitude = false;
                for (var k in msg.gameInfo.getGoods) {
                    if (msg.gameInfo.getGoods.hasOwnProperty(k)) {
                        if (zj.PlayerItemSystem.ItemType(msg.gameInfo.getGoods[1].goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                            var v = msg.gameInfo.getGoods[k];
                            if (zj.PlayerHunterSystem.Table(v.goodsId).aptitude >= 13) {
                                has_high_aptitude = true;
                                break;
                            }
                        }
                    }
                }
                var dbname = "jg_zhaomu";
                if (RES.getRes("jg_zhaomu_large_tex_png"))
                    dbname = "jg_zhaomu_large";
                this.addAnimatoin001_putong(dbname, "001_putong", 1);
                if (has_high_aptitude) {
                    //this.sence.ChangeAction(2)
                }
                else {
                    //this.sence.ChangeAction(1)
                }
                egret.Tween.get(this).wait(30).call(function () {
                    zj.Game.SoundManager.playMusic("tavern1_mp3", 1);
                }).wait(500).call(function () {
                    zj.Game.SoundManager.playMusic("tavern2_mp3", 1);
                }).wait(2800).call(function () {
                    zj.Game.SoundManager.playMusic("tavern3_mp3", 1);
                }).wait(3000).call(function () {
                    zj.Game.SoundManager.playMusic("city_mp3", 0);
                });
                var cur_time_2 = 0;
                this.timer = setInterval(function () {
                    cur_time_2 = cur_time_2 + 500;
                    if (cur_time_2 >= _this.ani_Delay_Time || _this.animationType == true) {
                        _this.labelCloseTheTip.visible = false;
                        if (tavernmask.parent)
                            _this.removeChild(tavernmask);
                        _this.animationType = false;
                        _this.onBtnNSoda(msg.gameInfo.getGoods);
                        clearInterval(_this.timer);
                    }
                }, 500);
            }
            else if (this.ttype == 5 || this.ttype == 1 && this.num == 10) {
                var has_high_aptitude = false;
                for (var k in msg.gameInfo.getGoods) {
                    if (msg.gameInfo.getGoods.hasOwnProperty(k)) {
                        if (zj.PlayerItemSystem.ItemType(msg.gameInfo.getGoods[1].goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                            var v = msg.gameInfo.getGoods[k];
                            if (zj.PlayerHunterSystem.Table(v.goodsId).aptitude >= 13) {
                                has_high_aptitude = true;
                                break;
                            }
                        }
                    }
                }
                var dbname = "jg_zhaomu";
                if (RES.getRes("jg_zhaomu_large_tex_png"))
                    dbname = "jg_zhaomu_large";
                this.addAnimatoin001_putong(dbname, "002_gaoji", 1);
                egret.Tween.get(this).wait(30).call(function () {
                    zj.Game.SoundManager.playMusic("tavern1_mp3", 1);
                }).wait(500).call(function () {
                    zj.Game.SoundManager.playMusic("tavern2_mp3", 1);
                }).wait(2800).call(function () {
                    zj.Game.SoundManager.playMusic("tavern3_mp3", 1);
                }).wait(2800).call(function () {
                    zj.Game.SoundManager.playMusic("city_mp3", 0);
                });
                var cur_time_3 = 0;
                this.timer = setInterval(function () {
                    cur_time_3 = cur_time_3 + 500;
                    if (cur_time_3 >= _this.ani_Delay_Time || _this.animationType == true) {
                        _this.labelCloseTheTip.visible = false;
                        if (tavernmask.parent)
                            _this.removeChild(tavernmask);
                        _this.animationType = false;
                        _this.onBtn10Beer(msg.gameInfo.getGoods);
                        clearInterval(_this.timer);
                    }
                }, 500);
                console.log("gogo" + this.timer + cur_time_3);
                if (has_high_aptitude) {
                    //this.sence.ChangeAction(2)
                }
                else {
                    //this.sence.ChangeAction(1)
                }
                console.log("gogo" + this.timer);
            }
            this.setUI();
            if (zj.Game.TeachSystem.curPart == 3001) {
                zj.Teach.addTeaching();
            }
        };
        //开服活动
        TavernScene.prototype.openServerActive = function () {
            var _this = this;
            zj.loadUI(zj.TavemAdversePage)
                .then(function (tavemadversepage) {
                tavemadversepage.init(_this);
                tavemadversepage.show(zj.UI.SHOW_FILL_OUT); //this.addChild(tavemadversepage);
            });
        };
        //猎人图鉴
        TavernScene.prototype.onButtonArchive = function () {
            zj.loadUI(zj.HeroesPokedexScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //进入商店
        TavernScene.prototype.onButtonShop = function () {
            var _this = this;
            var d = new Date().getDay();
            if (zj.Game.PlayerInfoSystem.Level == 5) {
                zj.loadUI(zj.ShopMallDialog)
                    .then(function (dialog) {
                    dialog.load(5, false, _this);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (zj.Game.PlayerInfoSystem.Level < 5) {
                zj.toast_warning("队伍达到5级后开启商店");
            }
            else {
                if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_MALL, true))
                    if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_MALL))
                        zj.loadUI(zj.ShopMallDialog)
                            .then(function (dialog) {
                            dialog.load(5, false, _this);
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                        });
            }
        };
        //进入商城
        TavernScene.prototype.onBtnAdddiamond = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        TavernScene.prototype.setTavernActivityPage = function () {
            var _this = this;
            var lastTime = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime - (7 * 86400 - zj.CommonConfig.activity_lottery_survival_time);
            var bOpen = ((lastTime > 0) && (!zj.Device.isReviewSwitch));
            var unixTimestamp = this.giftTimeShow(lastTime);
            if (!bOpen) {
                this.groupActivity.visible = false;
                this.groupGiftTime.visible = false;
                this.groupOpenActivities.visible = false;
            }
            else {
                this.groupActivity.visible = true;
                this.groupGiftTime.visible = true;
                this.groupOpenActivities.visible = true;
            }
            this.labelGiftTime.text = unixTimestamp;
            var bShowToday = zj.Tips.tips_oneday_get(zj.Tips.SAVE.TAVERN_ACTIVITY);
            if (bOpen == true && bShowToday == true && zj.Game.TeachSystem.curPart != 3001) {
                zj.loadUI(zj.TavemAdversePage)
                    .then(function (tavemadversepage) {
                    tavemadversepage.init(_this);
                    tavemadversepage.show(zj.UI.SHOW_FILL_OUT);
                });
            }
        };
        //显示那种啤酒礼包（打折、非打折）
        TavernScene.prototype.setInfoBeerGift = function () {
            if (zj.Game.PlayerInfoSystem.Level >= 2) {
                this.buttonBeerGift.visible = false;
                this.imageGiftNewLog.visible = false;
                this.groupTime.visible = false;
                this.groupBeerGift.visible = false;
                if (zj.Game.PlayerGiftSystem.beerGift() == 100201) {
                    //this.addBeerEightActivities("dazhe_eff","001_dazhe_xunhuan");
                    this.groupTimeLimit.visible = false;
                    if (!zj.Device.isReviewSwitch && this.groupBeer.visible == true) {
                        this.groupBeerGift.visible = true;
                    }
                    this.buttonBeerGift.visible = true;
                    this.timeGift = zj.Tips.GetSaveIntValue(1, "TAVERN");
                    if (this.timeGift >= 1) {
                        this.imageGiftNewLog.visible = false;
                    }
                    else {
                        this.imageGiftNewLog.visible = true;
                    }
                }
                else if (zj.Game.PlayerGiftSystem.beerGift() == 100202) {
                    var beerGiftInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                        return v.gift_index == 100202;
                    });
                    this.addBeerEightActivities("dazhe_eff", "001_dazhe_xunhuan");
                    if (!zj.Device.isReviewSwitch && this.groupBeer.visible == true) {
                        this.groupBeerGift.visible = true;
                    }
                    this.buttonBeerGift.visible = true;
                    this.groupTime.visible = true;
                    var date = zj.Game.Controller.serverNow();
                    var humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
                    var serverTime = humanDate.getTime() / 1000 - 8 * 60 * 60;
                    var beerTblInfo = zj.PlayerGiftSystem.Instance_item(100202);
                    var timenew = (beerGiftInfo[0].trigger_time + beerTblInfo.duration) - serverTime;
                    var unixTimestamp = this.giftTimeShow(timenew);
                    this.labelTime.text = unixTimestamp;
                }
                else {
                    this.groupBeerGift.visible = false;
                }
            }
            else {
                this.groupBeerGift.visible = false;
            }
        };
        //礼包剩余时间
        TavernScene.prototype.giftTimeShow = function (ms) {
            ms = ms >= 0 && ms || 0;
            var a = 0;
            var tmp = ms;
            var b = Math.floor(tmp / 3600);
            var c = Math.floor((tmp % 3600) / 60);
            var day = a;
            var hour = b;
            var min = c;
            if (a == 0 && b != 0 && c != 0) {
                return hour + zj.TextsConfig.TextsConfig_Time.hour + min + zj.TextsConfig.TextsConfig_Time.min;
            }
            else if (a == 0 && b == 0) {
                return min + zj.TextsConfig.TextsConfig_Time.min;
            }
            else if (a != 0 && b == 0 && c == 0) {
                return day + zj.TextsConfig.TextsConfig_Time.day;
            }
            else if (a == 0 && b != 0 && c == 0) {
                return hour + zj.TextsConfig.TextsConfig_Time.hour;
            }
            return day + zj.TextsConfig.TextsConfig_Time.day + " " + hour + ":" + min;
        };
        //啤酒礼包
        TavernScene.prototype.onButtonBeerGift = function () {
            var _this = this;
            var info = null;
            var beerGiftInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == 100201;
            });
            var giftBTime = zj.PlayerGiftSystem.Instance_item(100202).buy_times;
            var beerGiftInfoB = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == 100202 && v.buy_times < giftBTime;
            });
            if (beerGiftInfoB[0] == null && beerGiftInfo[0] != null) {
                this.timeGift = zj.Tips.GetSaveIntValue(1, "TAVERN");
                zj.Tips.SetSaveIntValue(1, this.timeGift + 1, "TAVERN");
            }
            info = beerGiftInfoB[0] != null ? beerGiftInfoB[0] : (beerGiftInfo[0] != null ? beerGiftInfo[0] : null);
            //info=beerGiftInfo;
            if (info == null) {
                zj.toast(zj.TextsConfig.TextsConfig_Hunter_Tavern.limitBeer);
            }
            else {
                zj.loadUI(zj.GiftFirstPopC)
                    .then(function (gift) {
                    gift.setInfo(info, _this, true);
                    gift.show(zj.UI.SHOW_FROM_TOP);
                    _this.setUI();
                });
            }
        };
        /**朗姆酒礼包 */
        TavernScene.prototype.onBtnRum1 = function () {
            var _this = this;
            var info = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == 100211;
            })[0];
            if (info == null) {
                zj.toast(zj.TextsConfig.TextsConfig_Hunter_Tavern.limitBeer);
            }
            else {
                zj.loadUI(zj.GiftFirstPopC)
                    .then(function (gift) {
                    gift.setInfo(info, _this, true);
                    gift.show(zj.UI.SHOW_FROM_TOP);
                    _this.setUI();
                });
            }
        };
        TavernScene.prototype.removeGroup = function () {
            this.groupSoda.scaleX = 1;
            this.groupSoda.scaleY = 1;
            this.group2.scaleX = 1;
            this.group2.scaleY = 1;
            this.group3.scaleX = 1;
            this.group3.scaleY = 1;
            this.groupSeniorWine.scaleX = 1;
            this.groupSeniorWine.scaleY = 1;
            this.groupRedWine.scaleX = 1;
            this.groupRedWine.scaleY = 1;
            this.groupChampagne.scaleX = 1;
            this.groupChampagne.scaleY = 1;
            this.btnDrinkOneSoda.scaleX = 1;
            this.btnDrinkOneSoda.scaleY = 1;
            this.btnDrinkFiveSoda.scaleX = 1;
            this.btnDrinkFiveSoda.scaleY = 1;
            this.btnDrinkFiveRum.scaleX = 1;
            this.btnDrinkFiveRum.scaleY = 1;
            this.btnDrinkOneRum.scaleX = 1;
            this.btnDrinkOneRum.scaleY = 1;
        };
        return TavernScene;
    }(zj.Scene));
    zj.TavernScene = TavernScene;
    __reflect(TavernScene.prototype, "zj.TavernScene");
})(zj || (zj = {}));
//# sourceMappingURL=TavernScene.js.map