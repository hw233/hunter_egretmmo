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
    //公会建设
    //yuqingchao
    //2018/11/28
    var LeagueDonate = (function (_super) {
        __extends(LeagueDonate, _super);
        function LeagueDonate() {
            var _this = _super.call(this) || this;
            _this.addStone = function () {
                zj.loadUI(zj.PayMallScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.init();
                });
            };
            _this.addMoney = function () {
                zj.loadUI(zj.HelpGoldDialog)
                    .then(function (dialog) {
                    dialog.SetInfoList();
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            };
            _this.skinName = "resource/skins/league/LeagueDonateSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnDonate.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDonate, _this);
            _this.lstDonateChoice.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstDonateChoice, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.imgTop); // 因为是循环播放，需要特别处理
                egret.Tween.removeTweens(_this.imgDonate); // 因为是循环播放，需要特别处理
            }, null);
            _this.init();
            return _this;
        }
        LeagueDonate.prototype.init = function () {
            this.rectMask = zj.Util.getMaskImgBlack(this.imgSpriteBarExp.width, this.imgSpriteBarExp.height);
            this.rectMask.verticalCenter = 0;
            this.rectMask.left = 7;
            this.rectMask.visible = false;
            this.groupExp.addChild(this.rectMask);
            this.setInfo();
            this.lstDonateChoice.selectedIndex = 0;
            this.loadList();
            this.addBackdropAnimatoin("ui_tongyong_beijingguang", "001_beijignguang_02", 0, this.groupBackdrop);
            egret.Tween.get(this.imgTop)
                .to({ scaleX: 1, scaleY: 1, y: -18 }, 400)
                .to({ y: 12 }, 600)
                .to({ y: -8 }, 400)
                .to({ y: 2 }, 200);
            egret.Tween.get(this.imgDonate)
                .to({ scaleX: 1, scaleY: 1, y: -3 }, 400)
                .to({ y: 27 }, 600)
                .to({ y: 7 }, 400)
                .to({ y: 17 }, 200);
            egret.Tween.get(this.imgTop, { loop: true })
                .to({ y: -1 }, 300)
                .to({ y: 5 }, 600)
                .to({ y: 2 }, 300);
            egret.Tween.get(this.imgDonate, { loop: true })
                .to({ y: 14 }, 300)
                .to({ y: 20 }, 600)
                .to({ y: 17 }, 300);
        };
        LeagueDonate.prototype.setInfo = function (isdonate) {
            this.lbTextLevel.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.donateLevel, zj.Game.PlayerLeagueSystem.BaseInfo.level);
            var tbLevel = zj.TableLevel.Table(); //StringConfig_Table.level ;
            var expCur = zj.Game.PlayerLeagueSystem.BaseInfo.exp;
            var expTotal = tbLevel[zj.Game.PlayerLeagueSystem.BaseInfo.level].league_exp; // 公会升到下一级所需的贡献
            this.lbTextProgress.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.donateProgress, expCur, expTotal);
            var percent = expCur / expTotal;
            if (percent > 1) {
                percent = 1;
            }
            //经验条
            this.rectMask.visible = true;
            this.rectMask.width = this.imgSpriteBarExp.width * percent;
            this.imgSpriteBarExp.mask = this.rectMask;
            var bDonateValid = zj.Game.PlayerLeagueSystem.Member.is_donate; // 建设点击次数
            if (isdonate != null) {
                bDonateValid = isdonate;
            }
            /**判断公会等级是否大于规定的最高等级 */
            if (zj.Game.PlayerLeagueSystem.BaseInfo.level == zj.CommonConfig.league_level_max) {
                this.lbTextProgress.text = zj.TextsConfig.TextsConfig_HeroMain.level_max;
            }
            this.lbRightTip.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.donateLast, zj.CommonConfig.league_donate_daily_times - bDonateValid, zj.CommonConfig.league_donate_daily_times);
            /**判断建设次数是否大于零 */
            if (zj.CommonConfig.league_donate_daily_times - bDonateValid > 0) {
                this.btnDonate.enabled = true;
            }
            else {
                this.btnDonate.enabled = false;
                //改变button的状态
                this.btnDonate.currentState = "disabled";
            }
        };
        LeagueDonate.prototype.loadList = function () {
            var arrCollection = new eui.ArrayCollection();
            for (var k in zj.TableLeagueDonate.Table()) {
                arrCollection.addItem({
                    num: k
                });
            }
            this.lstDonateChoice.itemRenderer = zj.LeagueDonateItem;
            this.lstDonateChoice.dataProvider = arrCollection;
        };
        LeagueDonate.prototype.onLstDonateChoice = function (e) {
            this.lstDonateChoice.selectedIndex = e.itemIndex;
            this.loadList(); // 刷新list中的数据
        };
        //添加龙骨动画背景发光
        LeagueDonate.prototype.addBackdropAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        LeagueDonate.prototype.onBtnDonate = function () {
            var _this = this;
            zj.Game.PlayerLeagueSystem.leagueDonate(this.lstDonateChoice.selectedItem.num).then(function (response) {
                _this.setInfo(response.body.members[0].is_donate);
                var tblDonate = zj.TableLeagueDonate.Table();
                var str = zj.HelpUtil.textConfigFormat("+%d", tblDonate[_this.lstDonateChoice.selectedItem.num].reward_token);
                zj.Game.SoundManager.playEffect("ui_tili_zengjia_mp3", 500);
                setTimeout(function () {
                    var ui = zj.newUI(zj.CommonMessage);
                    _this.addChild(ui);
                    ui.init("ui_iconresources_gonghuibi3_png", str);
                }, 300);
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_HOME_UPDATE);
            }).catch(function (result) {
                if (result == message.EC.XG_LACK_TOKEN) {
                    zj.loadUI(zj.ConfirmCancelDialog)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(zj.TextsConfig.TextsConfig_Money.demstone);
                        dialog.setCB(_this.addStone);
                    });
                }
                else if (result == message.EC.XG_LACK_MONEY) {
                    zj.loadUI(zj.ConfirmCancelDialog)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(zj.TextsConfig.TextsConfig_Money.moneys);
                        dialog.setCB(_this.addMoney);
                    });
                }
                else {
                    zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result));
                }
            });
        };
        LeagueDonate.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueDonate;
    }(zj.Dialog));
    zj.LeagueDonate = LeagueDonate;
    __reflect(LeagueDonate.prototype, "zj.LeagueDonate");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueDonate.js.map