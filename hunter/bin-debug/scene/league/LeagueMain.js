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
    //公会管理
    //yuqingchao
    //2018.11.29
    var LeagueMain = (function (_super) {
        __extends(LeagueMain, _super);
        function LeagueMain() {
            var _this = _super.call(this) || this;
            _this.num = 0;
            _this.popY = 0; // 鼠标点击坐标
            _this.moveLocation = 0; //列表下拉移动位置
            _this.exit = function () {
                zj.Game.PlayerLeagueSystem.leagueQuit().then(function () {
                    setTimeout(function () {
                        _this.close();
                        zj.Game.EventManager.event(zj.GameEvent.LEAGUE_HOME_CLOSE, { type: 1 });
                        zj.Game.EventManager.event(zj.GameEvent.LEAGUE_CHOOSE_CLOSE, { type: 1 });
                    }, 510);
                });
            };
            _this.skinName = "resource/skins/league/LeagueMainSkin.exml";
            _this.btnRankingList.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRankingList, _this); // 管理公会按钮监听
            _this.btnLog.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonLog, _this); // 公会日志按钮监听
            _this.btnManager.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonManager, _this); // 管理公会按钮监听
            _this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnExit, _this); // 公会日志按钮监听
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this); // 退出按钮监听
            _this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstDonateChoice, _this); // 列表点击监听
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchDown, _this);
            zj.Game.EventManager.on(zj.GameEvent.LEAGUE_MAIN_UPDATE, _this.update, _this);
            zj.Game.EventManager.on(zj.GameEvent.LEAGUE_MAIN_TWEEN, _this.tween, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, _this.update, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.LEAGUE_MAIN_UPDATE, _this.update, _this);
                zj.Game.EventManager.off(zj.GameEvent.LEAGUE_MAIN_TWEEN, _this.tween, _this);
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, _this.update, _this);
            }, null);
            return _this;
        }
        LeagueMain.prototype.tween = function () {
            egret.Tween.get(this.groupMain).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 1, scaleY: 1 }, 200);
        };
        LeagueMain.prototype.init = function () {
            this.update();
        };
        LeagueMain.prototype.update = function () {
            zj.closeCache(this.groupCache);
            this.setInfo();
            this.LoadListMember();
            zj.setCache(this.groupCache);
        };
        LeagueMain.prototype.setInfo = function () {
            this.imgHead.source = zj.cachekey(zj.TableItemPic.Item(zj.Game.PlayerLeagueSystem.BaseInfo.picId).path, this);
            this.imgFrame.source = zj.cachekey(zj.TableItemPicFrame.Item(zj.Game.PlayerLeagueSystem.BaseInfo.picFrameId).path, this);
            this.lbLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.levelDes, zj.Game.PlayerLeagueSystem.BaseInfo.level.toString());
            this.lbName.text = zj.Game.PlayerLeagueSystem.BaseInfo.name;
            this.lbID.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.idDes, zj.Game.PlayerLeagueSystem.BaseInfo.leagueId);
            this.lbNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.memberDes, zj.Game.PlayerLeagueSystem.BaseInfo.curNum, zj.TableLevel.Item(zj.Game.PlayerLeagueSystem.BaseInfo.level).league_people);
            this.lbActiveNum.text = zj.Game.PlayerLeagueSystem.BaseInfo.enliven_all + "/" + zj.TableLevel.Item(zj.Game.PlayerLeagueSystem.BaseInfo.level).league_enliven_all;
            this.lbText.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.home_pop_notice, zj.Game.PlayerLeagueSystem.getNotice(zj.Game.PlayerLeagueSystem.BaseInfo.notice));
        };
        LeagueMain.prototype.touchDown = function (e) {
            this.popY = e.stageY;
            var pop = this.getChildByName("pop");
            if (pop) {
                if (pop.contains(e.target) == false) {
                    this.removeChild(pop);
                }
            }
            else {
                this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstDonateChoice, this); // 添加列表监听事件
            }
        };
        LeagueMain.prototype.ManagePop = function (y) {
            if (zj.Game.PlayerInfoSystem.RoleID == zj.Game.PlayerLeagueSystem.Members[this.lstItem.selectedIndex].monarchbase.id)
                return;
            if (zj.Game.PlayerLeagueSystem.Member.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER) {
                var pop = void 0;
                pop = new zj.LeagueMemberPopElder();
                pop.name = "pop";
                pop.init(this.stage.stageWidth / 2 - pop.width / 2, this.popY, this.lstItem.selectedIndex, this);
                this.addChild(pop);
                this.scrollerInfo.viewport = this.lstItem;
                this.scrollerInfo.validateNow();
                this.moveLocation = this.scrollerInfo.viewport.scrollV;
            }
            else if (zj.Game.PlayerLeagueSystem.Member.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
                var pop = void 0;
                pop = new zj.LeagueMemberPopLeader();
                pop.name = "pop";
                pop.init(this.stage.stageWidth / 2 - pop.width / 2, this.popY, this.lstItem.selectedIndex, this);
                this.addChild(pop);
                // if (pop.btnElevate.currentState == "down" && pop.btnElevate1.currentState == "down") {
                this.scrollerInfo.viewport = this.lstItem;
                this.scrollerInfo.validateNow();
                this.moveLocation = this.scrollerInfo.viewport.scrollV;
                // }
            }
            else {
                var pop = void 0;
                pop = new zj.LeagueMemberPopNormal();
                pop.name = "pop";
                pop.init(this.stage.stageWidth / 2 - pop.width / 2, this.popY, this.lstItem.selectedIndex, this);
                this.addChild(pop);
                this.scrollerInfo.viewport = this.lstItem;
                this.scrollerInfo.validateNow();
                this.moveLocation = this.scrollerInfo.viewport.scrollV;
            }
        };
        LeagueMain.prototype.onLstDonateChoice = function (e) {
            this.arrCollectionPop.itemUpdated(this.arrCollectionPop.source[this.lstItem.selectedIndex]);
            this.arrCollectionPop.itemUpdated(this.arrCollectionPop.source[this.num]);
            this.num = this.lstItem.selectedIndex;
            var pop = this.getChildByName("pop");
            // let listY = this.lstItem.getChildAt(this.lstItem.selectedIndex).y;
            // this.popY = this.gruopList.y + this.scrollerInfo.y + listY - this.moveLocation;
            this.ManagePop(1);
            this.lstItem.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstDonateChoice, this); //移除列表点击事件
        };
        LeagueMain.prototype.LoadListMember = function () {
            this.arrCollectionPop = new eui.ArrayCollection();
            var member = zj.Game.PlayerLeagueSystem.Members;
            member.sort(function (a, b) {
                if (a.officialId == b.officialId)
                    return b.monarchbase.level - a.monarchbase.level;
                return b.officialId - a.officialId;
            });
            for (var i = 0; i < member.length; i++) {
                this.arrCollectionPop.addItem({
                    i: i,
                    mem: member[i],
                });
            }
            this.lstItem.itemRenderer = zj.LeagueMainMemberltem;
            this.lstItem.dataProvider = this.arrCollectionPop;
            this.scrollerInfo.viewport = this.lstItem;
            this.scrollerInfo.validateNow();
            this.scrollerInfo.viewport.scrollV = this.moveLocation;
        };
        // 公会排行榜
        LeagueMain.prototype.onBtnRankingList = function () {
            zj.loadUI(zj.LeagueRankingListNew)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        // 公会日志
        LeagueMain.prototype.onButtonLog = function () {
            var _this = this;
            // toast("公会日志");
            egret.Tween.get(this.groupMain).to({ scaleX: 0.8, scaleY: 0.8 }, 300).call(function () { _this.groupMain.touchChildren = false; });
            zj.Game.PlayerLeagueSystem.leagueLog(1).then(function (value) {
                zj.loadUI(zj.LeagueLog).then(function (dialog) {
                    dialog.init(zj.TableEnum.Enum.League_LogType.NORMAL, value, _this);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }).catch(function (reason) {
                zj.toast(zj.Helper.GetErrorString(reason));
            });
        };
        // 管理工会
        LeagueMain.prototype.onButtonManager = function () {
            // toast("管理公会");
            if (zj.Game.PlayerLeagueSystem.Member.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.noAuthManage));
            }
            else {
                zj.loadUI(zj.LeagueManageMian).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        // 退出公会
        LeagueMain.prototype.onBtnExit = function () {
            var _this = this;
            if (zj.Game.PlayerLeagueSystem.Member.officialId ==
                message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
                if (zj.Game.PlayerLeagueSystem.Members.length == 1) {
                    // 公会没有成员，盟主可以解散公会
                    zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(zj.TextsConfig.TextConfig_League.dismiss);
                        dialog.setCB(_this.exit);
                    });
                }
                else {
                    zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(zj.TextsConfig.TextConfig_League.transferFirst);
                    });
                }
            }
            else if (zj.Game.PlayerLeagueSystem.Member.leagueOutNumber == 0) {
                zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(zj.TextsConfig.TextConfig_League.exit1);
                    dialog.setCB(_this.exit);
                });
            }
            else {
                zj.loadUI(zj.ConfirmCancelDialog)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(zj.TextsConfig.TextConfig_League.exit2);
                    dialog.setCB(_this.exit);
                });
            }
        };
        LeagueMain.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueMain;
    }(zj.Dialog));
    zj.LeagueMain = LeagueMain;
    __reflect(LeagueMain.prototype, "zj.LeagueMain");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMain.js.map