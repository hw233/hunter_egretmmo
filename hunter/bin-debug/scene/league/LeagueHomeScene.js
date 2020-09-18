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
    //公会主页面
    //lizhengqiang
    //2018.11.27
    var LeagueHomeScene = (function (_super) {
        __extends(LeagueHomeScene, _super);
        function LeagueHomeScene() {
            var _this = _super.call(this) || this;
            _this.listBottomData = new eui.ArrayCollection(); // 聊天数据
            _this.touchStartX = 0; // 触摸开始坐标
            _this.type = 1;
            _this.imgBackroundScaleX = 1;
            _this.imgBackroundScaleY = 1;
            _this.goCele = function () {
                zj.Game.PlayerLeagueSystem.leaguePartyScene().then(function () {
                    // "League_BossCelebrate"
                    zj.loadUI(zj.LeagueBossCelebrate)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                });
            };
            _this.skinName = "resource/skins/league/LeagueHomeSenceSkin.exml";
            _this.groupDonate.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupDonate, _this); //公会建设
            _this.groupManager.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupManager, _this); //公会管理
            _this.groupShop.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupShop, _this); //公会商店
            _this.groupInstance.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupInstance, _this); //公会副本
            _this.groupAnimal.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupAnimal, _this); //公会BOOS
            _this.groupUnionBattle.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupUnionBattle, _this); //公会战
            _this.groupSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupSkill, _this); //公会技能
            _this.groupLeftTop.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupLeftTopBegin, _this);
            _this.groupLeftTop.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupLeftTopEnd, _this);
            _this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChat, _this);
            _this.btnRecruit.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRecurit, _this);
            _this.btnSetNotice.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSetNotice, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.messageHistoryChat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChat, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
            zj.Game.EventManager.on(zj.GameEvent.LEAGUE_HOME_UPDATE, _this.update, _this);
            zj.Game.EventManager.on(zj.GameEvent.LEAGUE_HOME_CLOSE, _this.onBtnClose, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, _this.update, _this);
            zj.Game.EventManager.on(zj.GameEvent.GUILD_LOUNCH, _this.duild_lounch, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.LEAGUE_HOME_UPDATE, _this.update, _this);
                zj.Game.EventManager.off(zj.GameEvent.LEAGUE_HOME_CLOSE, _this.onBtnClose, _this);
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, _this.update, _this);
                zj.Game.EventManager.off(zj.GameEvent.GUILD_LOUNCH, _this.duild_lounch, _this);
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            _this.lbNoticeX = _this.lbNotice.x;
            _this.lbNoticeY = _this.lbNotice.y;
            _this.groupShopX = _this.groupShop.x;
            _this.groupShopY = _this.groupShop.y;
            _this.groupDonateX = _this.groupDonate.x;
            _this.groupDonateY = _this.groupDonate.y;
            _this.groupManagerX = _this.groupManager.x;
            _this.groupManagerY = _this.groupManager.y;
            _this.groupInstanceX = _this.groupInstance.x;
            _this.groupInstanceY = _this.groupInstance.y;
            _this.groupAnimalX = _this.groupAnimal.x;
            _this.groupAnimalY = _this.groupAnimal.y;
            _this.groupUnionBattleX = _this.groupUnionBattle.x;
            _this.groupUnionBattleY = _this.groupUnionBattle.y;
            return _this;
        }
        LeagueHomeScene.prototype.onClose = function () {
            this.listBottomData.removeAll();
            this.messageHistoryChat.visible = false;
        };
        LeagueHomeScene.prototype.init = function () {
            var _this = this;
            this.setInfoTips();
            this.imgBackroundScaleX = this.imgBackround.scaleX;
            this.imgBackroundScaleY = this.imgBackround.scaleY;
            this.timer = new egret.Timer(0.4 * 1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
                _this.setInfoTips();
                _this.adaptScene();
            }, this);
            this.addAnimations();
            zj.Game.PlayerLeagueSystem.leagueInfo().then(function () {
                _this.setInfo();
            });
        };
        LeagueHomeScene.prototype.adaptScene = function () {
            var scaleX = zj.UIManager.StageWidth - 1541 > 0 ? zj.UIManager.StageWidth / 1541 : 1;
            var scaleY = zj.UIManager.StageHeight - 640 > 0 ? zj.UIManager.StageHeight / 640 : 1;
            if (scaleX > 1) {
                this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            }
            else {
                this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            }
            this.imgBackround.scaleX = this.imgBackroundScaleX * scaleX;
            this.imgBackround.scaleY = this.imgBackroundScaleY * scaleY;
            this.lbNotice.x = this.lbNoticeX * scaleX;
            this.lbNotice.y = this.lbNoticeY * scaleY;
            this.groupShop.x = this.groupShopX * scaleX;
            this.groupShop.y = this.groupShopY * scaleY;
            this.groupDonate.x = this.groupDonateX * scaleX;
            this.groupDonate.y = this.groupDonateY * scaleY;
            this.groupManager.x = this.groupManagerX * scaleX;
            this.groupManager.y = this.groupManagerY * scaleY;
            this.groupInstance.x = this.groupInstanceX * scaleX;
            this.groupInstance.y = this.groupInstanceY * scaleY;
            this.groupAnimal.x = this.groupAnimalX * scaleX;
            this.groupAnimal.y = this.groupAnimalY * scaleY;
            this.groupUnionBattle.x = this.groupUnionBattleX * scaleX;
            this.groupUnionBattle.y = this.groupUnionBattleY * scaleY;
            for (var i = 0; i < 4; i++) {
                var display = this.groupMain.getChildByName("display" + i);
                if (display) {
                    display.x = 0;
                    display.y = zj.UIManager.StageHeight;
                    display.scaleX = scaleX;
                    display.scaleY = scaleY;
                }
            }
        };
        LeagueHomeScene.prototype.setInfo = function () {
            this.imgLeagueIcon.source = zj.cachekey(zj.TableItemPic.Item(zj.Game.PlayerLeagueSystem.BaseInfo.picId).path, this);
            this.lbLevel.text = zj.Game.PlayerLeagueSystem.BaseInfo.level.toString();
            this.lbLeagueName.text = zj.Game.PlayerLeagueSystem.BaseInfo.name;
            this.lbMemberNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.memberDes, zj.Game.PlayerLeagueSystem.getLineNum(), zj.Game.PlayerLeagueSystem.BaseInfo.curNum);
            this.lbLiveNum.text = zj.Game.PlayerLeagueSystem.BaseInfo.enliven_all + "/" + zj.TableLevel.Item(zj.Game.PlayerLeagueSystem.BaseInfo.level).league_enliven_all;
            this.lbNotice.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.home_pop_notice, zj.Game.PlayerLeagueSystem.getNotice(zj.Game.PlayerLeagueSystem.BaseInfo.notice));
            var bLeader = false;
            if (zj.Game.PlayerLeagueSystem.Member.officialId != message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL) {
                bLeader = true;
            }
            this.btnSetNotice.visible = bLeader;
            this.btnRecruit.visible = bLeader;
        };
        LeagueHomeScene.prototype.update = function () {
            this.setInfo();
        };
        LeagueHomeScene.prototype.duild_lounch = function () {
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.ChatMessageNotice_Visit, this);
        };
        LeagueHomeScene.prototype.ChatMessageNotice_Visit = function (msg, result) {
            this.messageHistoryChat.visible = true;
            this.listBottomData.removeAll();
            for (var i = 0; i < msg.data.body.chatinfos.length; i++) {
                var v = msg.data.body.chatinfos[i];
                var ChatItem = new zj.FormatChatItem();
                var content = zj.Game.PlayerChatDataSystem.GetChatInfo(v);
                var lineNum = zj.Game.PlayerChatDataSystem.getStrlineNum(zj.HelpUtil.textConfigFormat(content[0]), 350);
                if (lineNum == 1) {
                    if (v.type == 5 && v.content != "") {
                        ChatItem.itemNum = 40;
                    }
                    else {
                        ChatItem.itemNum = 20;
                    }
                }
                else {
                    ChatItem.itemNum = 40;
                }
                ChatItem.Data = v;
                this.listBottomData.addItem(ChatItem);
            }
            this.simpleChat.dataProvider = this.listBottomData;
            this.simpleChat.itemRenderer = zj.HXH_ChatItem;
            egret.setTimeout(this.onClose, this, 10000);
        };
        LeagueHomeScene.prototype.setInfoTips = function () {
            this["imgTip1"].visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_DONATE);
            this["imgTip2"].visible = zj.Tips.FUNC[zj.Tips.TAG.LEAGUE][zj.Tips.TAG.LEAGUE_MALL]();
            this["imgTip3"].visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_APPLY);
            this["imgTip4"].visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_INSTANCE);
            this["imgTip5"].visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_CELEBRATE);
            this["imgTip6"].visible =
                zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_ENTRANCE) ||
                    zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_DEFENCE_FORMATE) ||
                    zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_SIGNIN) ||
                    zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.MATCH_MALL);
        };
        LeagueHomeScene.prototype.addAnimations = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "fish", "armatureName", null, 0) // 鱼
                .then(function (display) {
                display.x = 0;
                display.y = zj.UIManager.StageHeight;
                display.name = "display0";
                _this.groupMain.addChildAt(display, 100);
            });
            zj.Game.DragonBonesManager.playAnimation(this, "hunterhallfloor", "armatureName", null, 0) // 场景灯光
                .then(function (display) {
                display.x = 0;
                display.y = zj.UIManager.StageHeight;
                display.name = "display1";
                _this.groupMain.addChildAt(display, 2);
            });
            zj.Game.DragonBonesManager.playAnimation(this, "fb", "armatureName", null, 0) // 副本动态
                .then(function (display) {
                display.x = 0;
                display.y = zj.UIManager.StageHeight;
                display.name = "display2";
                _this.groupMain.addChildAt(display, 1);
            });
            zj.Game.DragonBonesManager.playAnimation(this, "window", "armatureName", null, 0) // 飞艇
                .then(function (display) {
                display.x = 0;
                display.y = zj.UIManager.StageHeight;
                display.name = "display3";
                _this.groupMain.addChildAt(display, 0);
            });
            this.timer.start();
        };
        LeagueHomeScene.prototype.onTouchBegin = function (evt) {
            this.touchStartX = evt.stageX;
        };
        LeagueHomeScene.prototype.onTouchMove = function (evt) {
            var deltaX = 0;
            if (this.groupHome.touchChildren == true) {
                deltaX = evt.stageX - this.touchStartX;
                this.touchStartX = evt.stageX;
                if (this.groupMain.x + deltaX > 0) {
                    deltaX = -this.groupMain.x;
                }
                if (this.imgBackround.width * this.imgBackroundScaleX - zj.UIManager.StageWidth + this.groupMain.x + deltaX < 0) {
                    deltaX = -(this.imgBackround.width * this.imgBackroundScaleX - zj.UIManager.StageWidth + this.groupMain.x);
                }
                this.groupMain.x += deltaX;
            }
        };
        LeagueHomeScene.prototype.onTouchEnd = function () {
            this.onGroupLeftTopEnd();
        };
        LeagueHomeScene.prototype.onGroupDonate = function () {
            var _this = this;
            // toast("公会建设");
            egret.Tween.get(this.btnDonate).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(function () {
                zj.loadUI(zj.LeagueDonate)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                egret.Tween.get(_this.btnDonate).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        LeagueHomeScene.prototype.onGroupManager = function () {
            var _this = this;
            // toast("公会管理");
            egret.Tween.get(this.btnManager).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(function () {
                zj.loadUI(zj.LeagueMain)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.init();
                });
                egret.Tween.get(_this.btnManager).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        LeagueHomeScene.prototype.onGroupShop = function () {
            var _this = this;
            // toast("公会商店")
            egret.Tween.get(this.btnShop).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(function () {
                zj.loadUI(zj.ShopMallDialog)
                    .then(function (dialog) {
                    dialog.load(3);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                egret.Tween.get(_this.btnShop).to({ scaleX: 1, scaleY: 1 }, 10);
            });
        };
        LeagueHomeScene.prototype.onGroupInstance = function () {
            var _this = this;
            // toast("公会副本")
            egret.Tween.get(this.btnInstance).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(function () {
                zj.loadUI(zj.LeagueInstanceMain)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                    dialog.init();
                });
                egret.Tween.get(_this.btnInstance).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        LeagueHomeScene.prototype.onGroupAnimal = function () {
            var _this = this;
            // toast("公会BOOS")
            egret.Tween.get(this.btnAnimal).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(function () {
                var tip = zj.Table.FindF(zj.Game.PlayerLeagueSystem.BaseInfo.processes, function (k, v) {
                    if (v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_BOSS && v.leftTime * 1000 - egret.getTimer() > 0) {
                        return true;
                    }
                });
                var partyTip = zj.Table.FindF(zj.Game.PlayerLeagueSystem.BaseInfo.processes, function (k, v) {
                    if (v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY && v.leftTime * 1000 - egret.getTimer() > 0) {
                        return true;
                    }
                });
                if (partyTip) {
                    _this.goCeleTip();
                }
                else if (tip) {
                    zj.Game.PlayerLeagueSystem.leagueBossScene().then(function () {
                        // "League_BossFighting"
                        zj.loadUI(zj.LeagueBossFighting)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.init();
                        });
                    });
                }
                else {
                    zj.loadUI(zj.LeagueBossInfo)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                egret.Tween.get(_this.btnAnimal).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        LeagueHomeScene.prototype.goCeleTip = function () {
            var _this = this;
            if (zj.Game.PlayerLeagueSystem.Member.is_party_join) {
                // "League_BossCelebrate"
                zj.loadUI(zj.LeagueBossCelebrate)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                if (zj.Game.PlayerLeagueSystem.Member.is_boss_join) {
                    this.goCele();
                }
                else {
                    zj.loadUI(zj.ConfirmCancelDialog)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.animal_goCele, zj.CommonConfig.league_party_consume));
                        dialog.setCB(_this.goCele);
                    });
                }
            }
        };
        LeagueHomeScene.prototype.onGroupUnionBattle = function () {
            var _this = this;
            // toast("公会战")
            egret.Tween.get(this.btnUnionBattle).to({ scaleX: -1.1, scaleY: 1.1 }, 100).call(function () {
                zj.loadUI(zj.LeagueUnionBattleMain)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.init();
                });
                egret.Tween.get(_this.btnUnionBattle).to({ scaleX: -1, scaleY: 1 }, 100);
            });
        };
        /**点击公会技能 */
        LeagueHomeScene.prototype.onGroupSkill = function () {
            zj.loadUI(zj.LeagueSkill)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        LeagueHomeScene.prototype.onGroupLeftTopBegin = function () {
            var _this = this;
            zj.loadUI(zj.LeagueHomeDesLive)
                .then(function (des) {
                des.x = _this.groupLeftTop.x + _this.groupLeftTop.width;
                des.y = _this.groupLeftTop.y + _this.groupLeftTop.height;
                des.name = "des";
                _this.addChild(des);
            });
        };
        LeagueHomeScene.prototype.onGroupLeftTopEnd = function () {
            var des = this.getChildByName("des");
            if (des)
                this.removeChild(des);
        };
        LeagueHomeScene.prototype.onBtnChat = function () {
            var _this = this;
            // "Chat_Main"
            zj.loadUI(zj.Chat_Main)
                .then(function (dialog) {
                dialog.show();
                dialog.inittypr(_this.type);
            });
        };
        LeagueHomeScene.prototype.onBtnRecurit = function () {
            var _this = this;
            // toast("公会招募");
            egret.Tween.get(this.btnRecruit).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(function () {
                zj.loadUI(zj.LeagueRecruit)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                egret.Tween.get(_this.btnRecruit).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        LeagueHomeScene.prototype.onBtnSetNotice = function () {
            var _this = this;
            // toast("编辑公告");
            egret.Tween.get(this.btnSetNotice).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(function () {
                zj.loadUI(zj.LeagueManageMian)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.onBtnMsgSet();
                });
                egret.Tween.get(_this.btnSetNotice).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        LeagueHomeScene.prototype.onBtnClose = function (data) {
            if (data === void 0) { data = { type: 0 }; }
            if (data.type == 1) {
                this.close();
            }
            else {
                this.close(zj.UI.HIDE_TO_TOP);
            }
        };
        return LeagueHomeScene;
    }(zj.Scene));
    zj.LeagueHomeScene = LeagueHomeScene;
    __reflect(LeagueHomeScene.prototype, "zj.LeagueHomeScene");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueHomeScene.js.map