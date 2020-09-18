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
    //Friend_MainFriendSence
    //wangshenzhuo
    // 2019/03/21
    var Friend_MainFriendSence = (function (_super) {
        __extends(Friend_MainFriendSence, _super);
        function Friend_MainFriendSence() {
            var _this = _super.call(this) || this;
            _this.buttonNames = [];
            _this.relationMap = [];
            _this.roleIds_get = [];
            _this.roleIds_send = [];
            _this.moveLocation = 0; //列表下拉移动位置
            _this.TableViewIndex = 0;
            _this.newpower = 0;
            _this.skinName = "resource/skins/friend/Friend_MainFriendSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonSend.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonSend, _this);
            _this.buttonGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonGet, _this);
            _this.buttonApply.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonApply, _this);
            _this.buttonFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonFriend, _this);
            _this.buttonEnemy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonEnemy, _this);
            _this.buttonAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonAdd, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchUplistTable, _this);
            zj.Game.EventManager.on(zj.GameEvent.FRIEND_TOPPOP_REMOVE, _this.touchUplistTable, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.FRIEND_TOPPOP_REMOVE, _this.touchUplistTable, _this);
            }, null);
            _this.imageRect.visible = false;
            _this.imageTipGet.visible = false;
            _this.imageTipApply.visible = false;
            if (_this.width >= 1344) {
                _this.imageBackground.scaleX = _this.width / 1334;
            }
            return _this;
        }
        Friend_MainFriendSence.prototype.init = function () {
            this.openMode();
            this.buttonNames = ["Friend", "Enemy"];
            this.ButtonDelegate(this.buttonNames[0]);
            this.first = true;
            this.buttonEnemy.enabled = true;
            this.buttonFriend.enabled = false;
        };
        Friend_MainFriendSence.prototype.openMode = function () {
            this.imageBackground.visible = true;
            this.groupShow.anchorOffsetX = 0;
            this.groupShow.anchorOffsetY = this.groupShow.height / 2;
            this.groupShow.x = (zj.UIManager.StageWidth - this.groupShow.width) / 2 + this.groupShow.anchorOffsetX;
            this.groupShow.y = (zj.UIManager.StageHeight - this.groupShow.height) / 2 + this.groupShow.anchorOffsetY;
            this.groupShow.scaleX = 0;
            this.groupShow.scaleY = 0;
            egret.Tween.get(this.groupShow).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
            // this.groupMain.sca
        };
        Friend_MainFriendSence.prototype.ButtonDelegate = function (name) {
            var _this = this;
            this.relationType = zj.StringConfig_TagType.friend[name];
            zj.PlayerRelateSystem.RelationApplyListReq().then(function (data) {
                setTimeout(function () {
                    _this.SetInfo();
                }, 200);
            }).catch(function (reason) { });
        };
        Friend_MainFriendSence.prototype.SetInfo = function () {
            this.LoadList();
            this.SetDes();
            // this.SetButtonState();
        };
        Friend_MainFriendSence.prototype.SetRoleIds = function () {
            this.roleIds_get = [];
            this.roleIds_send = [];
            for (var i = 0; i < this.relationMap.length; i++) {
                if (this.relationMap[i].canReward && this.relationMap[i].isReward == false) {
                    this.roleIds_get.push(this.relationMap[i].roleInfo.id);
                }
                if (zj.Game.PlayerRelateSystem.givepower()[this.relationMap[i].roleInfo.id] == null) {
                    this.roleIds_send.push(this.relationMap[i].roleInfo.id);
                }
            }
        };
        Friend_MainFriendSence.prototype.SetDes = function () {
            var des = zj.TextsConfig.TextConfig_Relation.mainDes1[this.relationType - 1];
            this.labelTextCnt.text = zj.Helper.StringFormat(des, this.relationMap.length, zj.PlayerVIPSystem.Level().relation_count);
            this.labelTextPower.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.mainDes2, zj.Game.PlayerVIPSystem.vipInfo.rewardPower, zj.PlayerVIPSystem.Level().reward_power);
            this.imageTipFriend.visible = false;
            this.imageTipApply.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.FRIEND, 2);
            if (zj.Game.PlayerRelateSystem.relateResp.applys.length == 0) {
                this.imageTipApply.visible = false;
            }
            else {
                this.imageTipApply.visible = true;
            }
            // this.imageTipGet.visible = Tips.GetTipsOfId(Tips.TAG.FRIEND, 1);
        };
        Friend_MainFriendSence.prototype.LoadList = function (data_only) {
            if (this.relationType == zj.StringConfig_TagType.friend[this.buttonNames[0]]) {
                this.relationMap = zj.PlayerRelateSystem.Map(message.ERelationType.RELATION_TYPE_FRIEND, zj.PlayerRelateSystemSORT.MAIN);
                if (this.relationMap.length == 0) {
                    this.imageNoFriend.visible = true;
                }
                else {
                    this.imageNoFriend.visible = false;
                }
                this.SetRoleIds();
            }
            else if (this.relationType == zj.StringConfig_TagType.friend[this.buttonNames[1]]) {
                this.relationMap = zj.PlayerRelateSystem.Map(message.ERelationType.RELATION_TYPE_ENEMY, zj.PlayerRelateSystemSORT.MAIN);
                this.imageNoFriend.visible = false;
            }
            if (data_only) {
                return;
            }
            this.imageTipGet.visible = false;
            this.listTableView.selectedIndex = -1; // 默认选中
            this.listTableView.itemRenderer = zj.Friend_MainFriendItem; //
            this.TableViewItem = new eui.ArrayCollection();
            for (var i = 0; i < this.relationMap.length; i++) {
                var data = new zj.Friend_MainFriendItemData();
                data.father = this;
                data.index = i;
                this.TableViewItem.addItem(data);
            }
            this.listTableView.dataProvider = this.TableViewItem;
            this.TableViewIndex = this.listTableView.selectedIndex;
            this.scrollerInfo.viewport = this.listTableView;
            this.scrollerInfo.validateNow();
            this.scrollerInfo.viewport.scrollV = this.moveLocation;
            this.focusCur = 0;
            this.focusLast = this.focusCur;
            this.first = false;
        };
        Friend_MainFriendSence.prototype.onlistTableView = function () {
            if (this.TableViewIndex != this.listTableView.selectedIndex) {
                this.TableViewItem.itemUpdated(this.TableViewItem.source[this.TableViewIndex]);
                this.TableViewItem.itemUpdated(this.TableViewItem.source[this.listTableView.selectedIndex]);
                this.TableViewIndex = this.listTableView.selectedIndex;
            }
            var pop = this.groupMain.getChildByName("pop");
            if (pop) {
                this.groupMain.removeChild(pop);
            }
            else {
                this.friendpop();
            }
        };
        Friend_MainFriendSence.prototype.friendpop = function () {
            var pop = new zj.Friend_MyFriendPop();
            pop.name = "pop";
            this.groupMain.addChild(pop);
            this.imageRect.visible = true;
            this.popYY = 200 + 100 * this.TableViewIndex - this.moveLocation;
            if (this.popYY + pop.height / 2 > this.groupMain.y + this.groupMain.height) {
                this.popYY = this.groupMain.y + this.groupMain.height / 2;
            }
            pop.SetInfo(this.relationMap[this.TableViewIndex], this, this.TableViewIndex, this.groupMain.width / 2 - pop.width / 2, this.popYY);
            this.scrollerInfo.viewport = this.listTableView;
            this.scrollerInfo.validateNow();
            this.moveLocation = this.scrollerInfo.viewport.scrollV;
        };
        Friend_MainFriendSence.prototype.touchUplistTable = function () {
            var pop = this.groupMain.getChildByName("pop");
            if (pop) {
                this.groupMain.removeChild(pop);
                this.imageRect.visible = false;
            }
        };
        Friend_MainFriendSence.prototype.SetButtonState = function () {
            for (var k in this.buttonNames) {
                var v = this.buttonNames[k];
                if (Number(k) == this.relationType) {
                    this["button" + v].touchEnabled = false;
                }
                else {
                    this["button" + v].touchEnabled = true;
                }
            }
        };
        Friend_MainFriendSence.prototype.onButtonFriend = function () {
            zj.Game.PlayerRelateSystem.relationInfo();
            this.ButtonDelegate(this.buttonNames[0]);
            this.buttonEnemy.enabled = true;
            this.buttonFriend.enabled = false;
        };
        Friend_MainFriendSence.prototype.onButtonEnemy = function () {
            zj.Game.PlayerRelateSystem.relationInfo();
            this.ButtonDelegate(this.buttonNames[1]);
            this.buttonEnemy.enabled = false;
            this.buttonFriend.enabled = true;
        };
        Friend_MainFriendSence.prototype.onButtonAdd = function () {
            var _this = this;
            zj.loadUI(zj.Friend_AddFriend)
                .then(function (dialog) {
                dialog.Init();
                dialog.SetFather(_this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        Friend_MainFriendSence.prototype.onButtonGet = function () {
            var _this = this;
            this.newpower = zj.Game.PlayerInfoSystem.BaseInfo.power;
            if (this.relationType == message.ERelationType.RELATION_TYPE_FRIEND) {
                if (this.roleIds_get.length == 0) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Friend.canGetNone);
                }
                else {
                    zj.PlayerRelateSystem.RelationRewardPower_Req(this.roleIds_get)
                        .then(function (data) {
                        var a = _this.relationMap.length;
                        setTimeout(function () {
                            for (var i = 0; i < _this.relationMap.length; i++) {
                                _this.relationMap[i].canReward = false;
                            }
                            // Tips.SetTipsOfId(Tips.TAG.FRIEND, 1);
                            // this.imageTipGet.visible = Tips.GetTipsOfId(Tips.TAG.FRIEND, 1);
                            _this.SetInfo();
                            zj.Common_Tip.AddTip(zj.TextsConfig.TextsConfig_Friend.getSuccess, _this.height, _this.width);
                            setTimeout(function () {
                                var powerDt = zj.Game.PlayerInfoSystem.BaseInfo.power - _this.newpower;
                                zj.Common_Tip.AddTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Friend.getPower, powerDt), _this.height, _this.width);
                            }, 1000);
                        }, 800);
                    })
                        .catch(function (reason) { });
                }
            }
            else {
                zj.toast_success(zj.TextsConfig.TextsConfig_Friend.getOnly);
            }
            this.SetInfo();
        };
        Friend_MainFriendSence.prototype.onButtonSend = function () {
            var _this = this;
            if (this.relationType == message.ERelationType.RELATION_TYPE_FRIEND) {
                if (zj.PlayerRelateSystem.Count(message.ERelationType.RELATION_TYPE_FRIEND) == 0) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Friend.noFriend);
                }
                else if (this.roleIds_send.length == 0) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Friend.canSendNone);
                }
                else {
                    zj.PlayerRelateSystem.RelationGivePower_Req(this.roleIds_send)
                        .then(function (data) {
                        setTimeout(function () {
                            _this.SetRoleIds();
                            _this.SetInfo();
                        }, 800);
                    }).catch(function (reason) { zj.toast_warning(reason); });
                }
            }
            else {
                zj.toast_success(zj.TextsConfig.TextsConfig_Friend.sendOnly);
            }
            this.SetInfo();
        };
        Friend_MainFriendSence.prototype.onButtonApply = function () {
            var _this = this;
            zj.PlayerRelateSystem.RelationApplyListReq().then(function (data) {
                zj.loadUI(zj.Friend_Application)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.SetInfo();
                    dialog.SetFather(_this);
                });
            }).catch(function (reason) { zj.toast_warning(reason); });
        };
        Friend_MainFriendSence.prototype.onButtonClose = function () {
            var _this = this;
            zj.PlayerRelateSystem.RelationApplyListReq().then(function (data) {
                // if (this.imageTipApply.visible == true || this.imageTipGet.visible == true) {
                //     Game.PlayerRelateSystem.TipFirend = true;
                // } else {
                //     Game.PlayerRelateSystem.TipFirend = false;
                // }
                _this.closeMode();
            });
        };
        Friend_MainFriendSence.prototype.closeMode = function () {
            var _this = this;
            this.groupShow.anchorOffsetX = 0;
            this.groupShow.anchorOffsetY = this.groupShow.height / 2;
            this.groupShow.x = (zj.UIManager.StageWidth - this.groupShow.width) / 2 + this.groupShow.anchorOffsetX;
            this.groupShow.y = (zj.UIManager.StageHeight - this.groupShow.height) / 2 + this.groupShow.anchorOffsetY;
            this.groupShow.scaleX = 1;
            this.groupShow.scaleY = 1;
            egret.Tween.get(this.groupShow).to({ scaleX: 0.1, scaleY: 0.1 }, 250, egret.Ease.backIn).call(function () {
                _this.close();
            });
        };
        return Friend_MainFriendSence;
    }(zj.Scene));
    zj.Friend_MainFriendSence = Friend_MainFriendSence;
    __reflect(Friend_MainFriendSence.prototype, "zj.Friend_MainFriendSence");
})(zj || (zj = {}));
//# sourceMappingURL=Friend_MainFriendSence.js.map