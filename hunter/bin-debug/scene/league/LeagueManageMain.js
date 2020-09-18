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
    //公会管理-管理公会
    //yuqingchao
    //2018/12/04
    var LeagueManageMian = (function (_super) {
        __extends(LeagueManageMian, _super);
        function LeagueManageMian() {
            var _this = _super.call(this) || this;
            _this.arrRoleId = [];
            _this.joinConditionX = 0;
            _this.joinLevelX = 0;
            _this.pictureIdCurrent = 0;
            _this.pictureFrameIdCurrent = 0;
            _this.nameCurrent = "";
            _this.noticeCurrent = "";
            _this.introduceCurrent = "";
            _this.joinConditionCurrent = 0;
            _this.joinLevelCurrent = 0;
            _this.pictureIdPrevious = 0;
            _this.pictureFrameIdPrevious = 0;
            _this.namePrevious = "";
            _this.noticePrevious = "";
            _this.introducePrevious = "";
            _this.joinConditionPrevious = 0;
            _this.joinLevelPrevious = 0;
            _this.setHead = function (picId) {
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 2 });
                if (picId == undefined || picId == 0 || picId == _this.pictureIdCurrent)
                    return;
                _this.imgHead.source = zj.cachekey(zj.TableItemPic.Item(picId).path, _this);
                _this.pictureIdCurrent = picId;
            };
            _this.setName = function (name, cb) {
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 2 });
                if (name == undefined)
                    return;
                if (name == "") {
                    zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.nameNone));
                }
                else if (name.length > zj.CommonConfig.limit_league_name_max) {
                    zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.nameOver));
                }
                else {
                    zj.Game.PlayerLeagueSystem.leagueModifyName(name).then(function () {
                        if (cb) {
                            cb();
                        }
                        _this.lbName.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.nameDes, name);
                        zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MAIN_UPDATE);
                        zj.Game.EventManager.event(zj.GameEvent.LEAGUE_HOME_UPDATE);
                        zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.nameSuccess));
                    });
                }
            };
            _this.setNotice = function (notice) {
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 2 });
                if (notice == undefined)
                    return;
                if (notice == "") {
                    zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.noticeNone));
                }
                else {
                    _this.lbNotice.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.noticeDes, notice);
                    _this.noticeCurrent = notice;
                }
            };
            _this.setIntroduce = function (introduce) {
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 2 });
                if (introduce == undefined)
                    return;
                if (introduce == "") {
                    zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.introduceNone));
                }
                else {
                    _this.lbIntroduce.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.introduceDes, introduce);
                    _this.introduceCurrent = introduce;
                }
            };
            _this.skinName = "resource/skins/league/LeagueManagerMainSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnApplication.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnApplication, _this);
            _this.btnMsgSet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMsgSet, _this);
            _this.btnRefuseAll.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRefuseAll, _this);
            _this.btnPassAll.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPassAll, _this);
            _this.btnHead.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnHead, _this);
            _this.btnName.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnName, _this);
            _this.btnNotice.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnNotice, _this);
            _this.btnConditionLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnConditionLeft, _this);
            _this.btnConditionRight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnConditionRight, _this);
            _this.btnLevelLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLevelLeft, _this);
            _this.btnLevelRight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLevelRight, _this);
            _this.btnIntroduce.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnIntroduce, _this);
            _this.btnSave.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSave, _this);
            zj.Game.EventManager.on(zj.GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, _this.tween, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_APPLY, _this.setInfo, _this);
            zj.Game.EventManager.on(zj.GameEvent.LEAGUE_MANAGE_MAIN_REMOVEITEM, _this.removeItem, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, _this.tween, _this);
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_LEAGUE_APPLY, _this.setInfo, _this);
                zj.Game.EventManager.off(zj.GameEvent.LEAGUE_MANAGE_MAIN_REMOVEITEM, _this.removeItem, _this);
            }, null);
            //图片滤镜改颜色
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, -16,
                0, 0, 1, 0, -31,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            _this.imgColor.filters = [colorFlilter];
            _this.imgColor1.filters = [colorFlilter];
            _this.onBtnApplication();
            return _this;
        }
        LeagueManageMian.prototype.tween = function (data) {
            switch (data.type) {
                case 1:
                    egret.Tween.get(this.groupAll).to({ scaleX: 0.9, scaleY: 0.9 }, 100);
                    break;
                case 2:
                    egret.Tween.get(this.groupAll).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 1, scaleY: 1 }, 100);
                    break;
            }
        };
        LeagueManageMian.prototype.onBtnApplication = function () {
            // toast("入会申请");
            this.btnApplication.currentState = "down";
            this.btnMsgSet.currentState = "up";
            this.groupApplication.visible = true;
            this.groupMsgSet.visible = false;
            this.setInfo();
        };
        LeagueManageMian.prototype.onBtnMsgSet = function () {
            // toast("公会信息");
            this.btnApplication.currentState = "up";
            this.btnMsgSet.currentState = "down";
            this.groupApplication.visible = false;
            this.groupMsgSet.visible = true;
            this.init();
        };
        // League_ManageApplication.lua
        /* ***************** 入会申请 ***************** */
        LeagueManageMian.prototype.setInfo = function () {
            this.lbApplyCount.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.applyCnt, zj.Game.PlayerLeagueSystem.Applicants.length);
            this.lbMemberCount.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.memberCnt, zj.Game.PlayerLeagueSystem.BaseInfo.curNum, zj.TableLevel.Item(zj.Game.PlayerLeagueSystem.BaseInfo.level).league_people);
            this.loadList();
        };
        LeagueManageMian.prototype.loadList = function () {
            this.arrCollection = new eui.ArrayCollection();
            for (var k in zj.Game.PlayerLeagueSystem.Applicants) {
                this.arrRoleId.push(zj.Game.PlayerLeagueSystem.Applicants[k].monarchbase.id);
                this.arrCollection.addItem({
                    "index": k
                });
            }
            this.lstItem.itemRenderer = zj.LeagueManageApplicationItemIR;
            this.lstItem.dataProvider = this.arrCollection;
        };
        LeagueManageMian.prototype.removeItem = function (ev) {
            this.lbApplyCount.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.applyCnt, zj.Game.PlayerLeagueSystem.Applicants.length);
            this.lbMemberCount.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.memberCnt, zj.Game.PlayerLeagueSystem.BaseInfo.curNum, zj.TableLevel.Item(zj.Game.PlayerLeagueSystem.BaseInfo.level).league_people);
            var index = ev.data;
            if (index == undefined || index < 0)
                return;
            this.arrCollection.removeItemAt(index);
        };
        // 全部拒绝
        LeagueManageMian.prototype.onBtnRefuseAll = function () {
            var _this = this;
            if (this.arrRoleId.length == 0)
                return;
            zj.Game.PlayerLeagueSystem.leagueApplyDeal(this.arrRoleId, false).then(function () {
                _this.arrCollection.removeAll();
                _this.setInfo();
                _this.arrRoleId = [];
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MAIN_UPDATE);
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_HOME_UPDATE);
            });
        };
        // 全部同意
        LeagueManageMian.prototype.onBtnPassAll = function () {
            var _this = this;
            if (this.arrRoleId.length == 0)
                return;
            zj.Game.PlayerLeagueSystem.leagueApplyDeal(this.arrRoleId, true).then(function () {
                _this.arrCollection.removeAll();
                _this.setInfo();
                _this.arrRoleId = [];
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MAIN_UPDATE);
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_HOME_UPDATE);
            });
        };
        // League_ManageMsgSet.lua
        /* ***************** 公会信息 ***************** */
        LeagueManageMian.prototype.init = function () {
            var leagueBase = zj.Game.PlayerLeagueSystem.BaseInfo;
            this.pictureIdCurrent = leagueBase.picId;
            this.pictureFrameIdCurrent = leagueBase.picFrameId;
            this.nameCurrent = leagueBase.name;
            this.noticeCurrent = zj.Game.PlayerLeagueSystem.getNotice(leagueBase.notice);
            this.introduceCurrent = leagueBase.introduce;
            this.joinConditionCurrent = leagueBase.join_condition;
            this.joinLevelCurrent = leagueBase.join_level;
            if (this.joinLevelCurrent < 1)
                this.joinLevelCurrent = 1;
            this.pictureIdPrevious = this.pictureIdCurrent;
            this.pictureFrameIdPrevious = this.pictureFrameIdCurrent;
            this.namePrevious = this.nameCurrent;
            this.noticePrevious = this.noticeCurrent;
            this.introducePrevious = this.introduceCurrent;
            this.joinConditionPrevious = this.joinConditionCurrent;
            this.joinLevelPrevious = this.joinLevelCurrent;
            this.joinConditionX = this.lbLimitCondition.x;
            this.joinLevelX = this.lbLimitLevel.x;
            this.setInfo1();
        };
        LeagueManageMian.prototype.setInfo1 = function () {
            this.imgFrame.source = zj.cachekey(zj.TableItemPicFrame.Item(this.pictureFrameIdCurrent).path, this);
            this.imgHead.source = zj.cachekey(zj.TableItemPic.Item(this.pictureIdCurrent).path, this);
            this.lbName.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.nameDes, this.nameCurrent);
            this.lbNotice.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.noticeDes, this.noticeCurrent);
            this.lbIntroduce.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.introduceDes, this.introduceCurrent);
            this.lbLimitCondition.text = zj.TextsConfig.TextConfig_League.limitCondition[this.joinConditionCurrent - 1];
            if (this.joinLevelCurrent <= 1) {
                this.lbLimitLevel.text = zj.TextsConfig.TextConfig_League.limitLevelNone;
            }
            else {
                this.lbLimitLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.limitLevel, this.joinLevelCurrent);
            }
        };
        LeagueManageMian.prototype.update1 = function () {
            this.init();
        };
        // 改头像
        LeagueManageMian.prototype.onBtnHead = function () {
            var _this = this;
            zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 1 });
            if (zj.Game.PlayerLeagueSystem.Member.officialId != message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.noAuthHead));
            }
            else {
                zj.loadUI(zj.Common_ChangeIconDialog)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setCB(_this.setHead);
                    dialog.loadList(zj.TableEnum.TableIconListState.LEAGUE);
                });
            }
        };
        // 改名
        LeagueManageMian.prototype.onBtnName = function () {
            var _this = this;
            zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 1 });
            if (zj.Game.PlayerLeagueSystem.Member.officialId != message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.noAuthName));
            }
            else {
                zj.loadUI(zj.Common_InputShortDialog)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setCB(_this.setName);
                    dialog.setLeagueInfo();
                });
            }
        };
        // 改公告
        LeagueManageMian.prototype.onBtnNotice = function () {
            var _this = this;
            zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 1 });
            zj.loadUI(zj.Common_InputLongDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(zj.TextsConfig.TextConfig_League.inputNotice, 1);
                dialog.setCB(_this.setNotice);
            });
        };
        LeagueManageMian.prototype.joinConditionDelegate = function (isLeft) {
            var _this = this;
            if (isLeft === void 0) { isLeft = false; }
            var distanceX = this.joinConditionX;
            if (isLeft) {
                this.joinConditionCurrent = this.joinConditionCurrent - 1;
                distanceX = distanceX - 60;
            }
            else {
                this.joinConditionCurrent = this.joinConditionCurrent + 1;
                distanceX = distanceX + 60;
            }
            if (this.joinConditionCurrent < message.LeagueJoinCondition.LEAGUE_JOIN_ALL) {
                this.joinConditionCurrent = message.LeagueJoinCondition.LEAGUE_JOIN_NOT;
            }
            else if (this.joinConditionCurrent > message.LeagueJoinCondition.LEAGUE_JOIN_NOT) {
                this.joinConditionCurrent = message.LeagueJoinCondition.LEAGUE_JOIN_ALL;
            }
            egret.Tween.get(this.lbLimitCondition)
                .to({ x: distanceX, alpha: 0.5 }, 300, egret.Ease.backInOut)
                .call(function () { _this.resetJoinCondition(); });
        };
        LeagueManageMian.prototype.resetJoinCondition = function () {
            this.lbLimitCondition.x = this.joinConditionX;
            this.lbLimitCondition.alpha = 1;
            this.lbLimitCondition.text = zj.TextsConfig.TextConfig_League.limitCondition[this.joinConditionCurrent - 1];
        };
        LeagueManageMian.prototype.onBtnConditionLeft = function () {
            this.joinConditionDelegate(true);
        };
        LeagueManageMian.prototype.onBtnConditionRight = function () {
            this.joinConditionDelegate(false);
        };
        LeagueManageMian.prototype.joinLevelDelegate = function (isLeft) {
            var _this = this;
            if (isLeft === void 0) { isLeft = false; }
            var distanceX = this.joinLevelX;
            if (isLeft) {
                this.joinLevelCurrent = this.joinLevelCurrent - 1;
                distanceX = distanceX - 60;
            }
            else {
                this.joinLevelCurrent = this.joinLevelCurrent + 1;
                distanceX = distanceX + 60;
            }
            if (this.joinLevelCurrent < 1) {
                this.joinLevelCurrent = 60;
            }
            else if (this.joinLevelCurrent > 60) {
                this.joinLevelCurrent = 1;
            }
            egret.Tween.get(this.lbLimitLevel)
                .to({ x: distanceX, alpha: 0.5 }, 300, egret.Ease.backInOut)
                .call(function () { _this.resetJoinLevel(); });
        };
        LeagueManageMian.prototype.resetJoinLevel = function () {
            this.lbLimitLevel.x = this.joinLevelX;
            this.lbLimitLevel.alpha = 1;
            if (this.joinLevelCurrent <= 1) {
                this.lbLimitLevel.text = zj.TextsConfig.TextConfig_League.limitLevelNone;
            }
            else {
                this.lbLimitLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.limitLevel, this.joinLevelCurrent);
            }
        };
        LeagueManageMian.prototype.onBtnLevelLeft = function () {
            this.joinLevelDelegate(true);
        };
        LeagueManageMian.prototype.onBtnLevelRight = function () {
            this.joinLevelDelegate(false);
        };
        // 改宣传语
        LeagueManageMian.prototype.onBtnIntroduce = function () {
            var _this = this;
            zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 1 });
            zj.loadUI(zj.Common_InputLongDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(zj.TextsConfig.TextConfig_League.inputIntroduce, 2);
                dialog.setCB(_this.setIntroduce);
            });
        };
        // 保存设置
        LeagueManageMian.prototype.onBtnSave = function () {
            var _this = this;
            var isNone = true;
            if (this.pictureIdCurrent != this.pictureIdPrevious || this.pictureFrameIdCurrent != this.pictureFrameIdPrevious) {
                zj.Game.PlayerLeagueSystem.leaguePic(this.pictureIdCurrent, this.pictureFrameIdCurrent);
                isNone = false;
            }
            if (this.noticeCurrent != this.noticePrevious) {
                zj.Game.PlayerLeagueSystem.leagueNotice(this.noticeCurrent);
                isNone = false;
            }
            if (this.joinConditionCurrent != this.joinConditionPrevious || this.joinLevelCurrent != this.joinLevelPrevious) {
                zj.Game.PlayerLeagueSystem.leagueJoinCondition(this.joinConditionCurrent, this.joinLevelCurrent);
                isNone = false;
            }
            if (this.introduceCurrent != this.introducePrevious) {
                zj.Game.PlayerLeagueSystem.leagueIntroduce(this.introduceCurrent);
                isNone = false;
            }
            if (!isNone) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.setSuccess));
                setTimeout(function () {
                    _this.update1();
                    zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MAIN_UPDATE);
                    zj.Game.EventManager.event(zj.GameEvent.LEAGUE_HOME_UPDATE);
                }, 800);
            }
            else {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.setNone));
            }
        };
        LeagueManageMian.prototype.onBtnClose = function () {
            zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MAIN_TWEEN);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueManageMian;
    }(zj.Dialog));
    zj.LeagueManageMian = LeagueManageMian;
    __reflect(LeagueManageMian.prototype, "zj.LeagueManageMian");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueManageMain.js.map