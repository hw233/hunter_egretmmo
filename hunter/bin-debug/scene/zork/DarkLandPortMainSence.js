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
    // DarkLand_PortMain  (贪婪之岛 -- 港口)
    // wangshenzhuo
    // 2019/6/14
    var DarkLandPortMainSence = (function (_super) {
        __extends(DarkLandPortMainSence, _super);
        function DarkLandPortMainSence() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/zork/DarkLandPortMainSenceSkin.exml";
            //创建一个计时器对象
            _this.timer = new egret.Timer(300, 0);
            // 注册事件侦听器
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.UpdateTime, _this);
            _this.timer.start();
            _this.buttonRuturn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonRuturn, _this);
            _this.buttonEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonEnter, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            return _this;
        }
        DarkLandPortMainSence.prototype.Init = function () {
            this.darklandMapTbl = zj.TableDarkland.Table();
            this.UpdateTime();
            this.SetRule();
            this.SetInfoAward();
            this.ReqMyRank();
        };
        DarkLandPortMainSence.prototype.isFullScreen = function () {
            return true;
        };
        DarkLandPortMainSence.prototype.UpdateTime = function () {
            var _a = zj.PlayerDarkSystem.PortOpenTime(), bOpen = _a[0], lastTime = _a[1];
            var str_time = this.formatMsTimeCh(lastTime);
            if (!bOpen) {
                str_time = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, str_time);
                this.labelTime.textFlow = zj.Util.RichText(str_time);
            }
            else {
                str_time = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, str_time);
                this.labelTime.textFlow = zj.Util.RichText(str_time);
            }
            this.buttonEnter.enabled = bOpen;
        };
        DarkLandPortMainSence.prototype.SetRule = function () {
            this.lebelRule.text = zj.RuleConfig.DarklandResource;
            ;
        };
        DarkLandPortMainSence.prototype.SetInfoAward = function () {
            var awardTbl = zj.TableDarklandRankReward.Table();
            this.listHit.selectedIndex = -1; // 默认选中
            this.listHit.itemRenderer = zj.DarkLandPortMainItem; //
            this.TableViewItem = new eui.ArrayCollection();
            for (var i = 0; i < Object.keys(awardTbl).length; i++) {
                var data = new zj.DarkLandPortMainItemData();
                data.father = this;
                data.info = awardTbl[i + 1];
                data.index = i;
                this.TableViewItem.addItem(data);
            }
            this.listHit.dataProvider = this.TableViewItem;
        };
        DarkLandPortMainSence.prototype.ReqMyRank = function () {
            var _this = this;
            zj.PlayerDarkSystem.SceneQueryScoreRankReq().then(function (data) {
                _this.labelAllCore.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.grade, data.body.self_rank.score);
                _this.labelRank.text = data.body.self_rank.rank.toString();
                if (data.body.self_rank.rank == 0 || data.body.self_rank.score < zj.CommonConfig.darkland_rank_base_score) {
                    _this.labelRank.text = (zj.TextsConfig.TextsConfig_WonderlandBoss.disAttend);
                }
                else if (data.body.self_rank.rank >= 100) {
                    _this.labelRank.text = "100+";
                }
            }).catch(function (reason) { });
        };
        DarkLandPortMainSence.prototype.onButtonRuturn = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        DarkLandPortMainSence.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        DarkLandPortMainSence.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        DarkLandPortMainSence.prototype.onButtonEnter = function () {
            var _this = this;
            var bOpen = zj.PlayerDarkSystem.PortOpenTime();
            if (bOpen || zj.Device.isDevLog) {
                zj.PlayerDarkSystem.SetFormationReq().then(function () {
                    _this.DarklandEnterReq();
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_DarkLand.notOpen);
            }
        };
        DarkLandPortMainSence.prototype.DarklandEnterReq = function () {
            var _this = this;
            zj.Game.PlayerDarkSystem.SceneEnterRespBody().then(function () {
                zj.Tips.tips_4_10_set(true);
                zj.Game.PlayerWonderLandSystem.darkland.mapBlockIndex = _this.darklandMapTbl[1].block_index;
                zj.PlayerWonderLandSystem.MapHeight = 1500;
                zj.MapSceneLoading.getInstance().loadFightRes(41, _this.wonderland, _this);
                zj.Game.PlayerWonderLandSystem.darkland.darklandId = 1;
            }).catch(function (reason) {
                if (reason == message.EC.XG_FORMATION_IS_EMPTY) {
                    zj.toast_warning(reason);
                }
                else {
                    zj.toast_warning(reason);
                }
            });
        };
        DarkLandPortMainSence.prototype.wonderland = function () {
            zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneDarkland);
        };
        // 中文时间
        DarkLandPortMainSence.prototype.formatMsTimeCh = function (ms) {
            var d = Math.floor(ms / 86400);
            var ttmp = Math.floor(ms % 86400);
            var a = Math.floor(ttmp / 3600);
            var tmp = Math.floor(ttmp % 3600);
            var b = Math.floor(tmp / 60);
            var c = Math.floor(tmp % 60);
            var hour = a;
            var min = b;
            var sec = c;
            var day = d;
            if (a < 10) {
                hour = "0" + a;
            }
            if (b < 10) {
                min = "0" + b;
            }
            if (c < 10) {
                sec = "0" + c;
            }
            if (d == 0) {
                return hour + ":" + min + ":" + sec;
            }
            return day + ":" + hour + ":" + min + ":" + sec;
        };
        return DarkLandPortMainSence;
    }(zj.Dialog));
    zj.DarkLandPortMainSence = DarkLandPortMainSence;
    __reflect(DarkLandPortMainSence.prototype, "zj.DarkLandPortMainSence");
})(zj || (zj = {}));
//# sourceMappingURL=DarkLandPortMainSence.js.map