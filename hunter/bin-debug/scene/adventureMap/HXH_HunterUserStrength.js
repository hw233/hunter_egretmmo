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
    // HXH_HunterUserStrength
    // wangshenzhuo
    // 20019/2/20
    var HXH_HunterUserStrength = (function (_super) {
        __extends(HXH_HunterUserStrength, _super);
        function HXH_HunterUserStrength() {
            var _this = _super.call(this) || this;
            _this.ID = 20003;
            _this.highHandIndex = 0;
            _this.lastPower = 0;
            _this.Power = 0;
            _this.skinName = "resource/skins/adventureMap/HXH_HunterUserStrengthSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.times = new egret.Timer(999, 0);
            _this.times.addEventListener(egret.TimerEvent.TIMER, _this.UpdateTime, _this);
            _this.times.start();
            zj.Game.EventManager.on(zj.GameEvent.HUNTER_USERSTRENG_POWER, _this.updateLastTime, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.times.stop();
                _this.times.removeEventListener(egret.TimerEvent.TIMER, _this.UpdateTime, _this);
                zj.Game.EventManager.off(zj.GameEvent.HUNTER_USERSTRENG_POWER, _this.updateLastTime, _this);
            }, _this);
            return _this;
        }
        HXH_HunterUserStrength.prototype.SetInfo = function () {
            this.lastPower = Math.floor(zj.Game.Controller.lastPower);
            this.Power = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_POWER);
            var tbl = zj.TableItemProp.Table();
            var tblResource = zj.TableItemResource.Table();
            var prop = [[], []];
            for (var kk in tbl) {
                var vv = tbl[kk];
                if (vv.power != "") {
                    prop[0].push(vv);
                }
            }
            zj.Table.Sort(prop[0], function (a, b) {
                return a[0] - b[0];
            });
            for (var kk in tblResource) {
                var vv = tblResource[kk];
                if (vv.id == this.ID) {
                    prop[1].push(vv);
                }
            }
            var ret = [];
            for (var c in prop) {
                var k = prop[c];
                for (var c_1 in k) {
                    var kk = k[c_1];
                    ret.push(kk);
                }
            }
            this.listStrength.selectedIndex = 0; // 默认选中
            this.listStrength.itemRenderer = zj.HXH_HunterUserStrengthItem; //
            this.highHandItem = new eui.ArrayCollection();
            for (var i = 0; i < ret.length; i++) {
                var data = new zj.HXH_HunterUserStrengthItemData();
                data.father = this;
                data.info = ret[i];
                data.index = i;
                data.id = ret[i].id;
                this.highHandItem.addItem(data);
            }
            this.listStrength.dataProvider = this.highHandItem;
            this.highHandIndex = this.listStrength.selectedIndex;
            this.UpdateTime();
        };
        HXH_HunterUserStrength.prototype.UpdateTime = function () {
            var level = zj.Game.PlayerInfoSystem.baseInfo_pre.level;
            var power;
            if (level == null || level == 0) {
                power = zj.PlayerVIPSystem.Item().role_power;
            }
            else {
                power = zj.PlayerVIPSystem.Item(zj.Game.PlayerInfoSystem.baseInfo_pre.level).role_power;
            }
            var times = 0;
            var timestamp = zj.Game.Controller.curServerTime;
            if (this.Power < power) {
                times = (power - this.Power) * zj.CommonConfig.role_add_power_time - Math.floor(timestamp - this.lastPower);
                if (times < 0) {
                    times = 0;
                    this.times.stop();
                }
            }
            else {
                this.times.stop();
            }
            this.labelTime.text = zj.Helper.FormatMsTime3(times);
        };
        HXH_HunterUserStrength.prototype.updateLastTime = function (ev) {
            var evdata = ev.data;
            this.Power = evdata.power;
            this.lastPower = evdata.lastPower;
        };
        HXH_HunterUserStrength.prototype.onItemTap = function (isTouchBegin, data) {
            var _this = this;
            var dialog = this.groupListTableViewExpPill.getChildByName("hunter-skill-common_DesProp");
            if (dialog)
                this.groupListTableViewExpPill.removeChild(dialog);
            var dialog2 = this.groupListTableViewExpPill.getChildByName("hunter-skill-common_DesRes");
            if (dialog2)
                this.groupListTableViewExpPill.removeChild(dialog2);
            if (isTouchBegin) {
                if (data.index < 3) {
                    zj.loadUI(zj.Common_DesProp).then(function (dialog) {
                        dialog.name = "hunter-skill-common_DesProp";
                        dialog.setInfo(data.id, 1);
                        if (data.index == 0) {
                            dialog.x = -88;
                            dialog.y = 120;
                        }
                        else if (data.index == 1) {
                            dialog.x = 87;
                            dialog.y = 120;
                        }
                        else if (data.index == 2) {
                            dialog.x = 262;
                            dialog.y = 120;
                        }
                        _this.groupListTableViewExpPill.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog2) {
                        dialog2.name = "hunter-skill-common_DesRes";
                        dialog2.setInfo(data.id, 0);
                        dialog2.x = 437;
                        dialog2.y = 120;
                        // dialog2.labelHide.visible
                        _this.groupListTableViewExpPill.addChild(dialog2);
                    });
                }
            }
        };
        /**抬起移除  详情 */
        HXH_HunterUserStrength.prototype.up = function () {
            var dialog = this.groupListTableViewExpPill.getChildByName("hunter-skill-common_DesProp");
            if (dialog)
                this.groupListTableViewExpPill.removeChild(dialog);
            var dialog2 = this.groupListTableViewExpPill.getChildByName("hunter-skill-common_DesRes");
            if (dialog2)
                this.groupListTableViewExpPill.removeChild(dialog2);
        };
        HXH_HunterUserStrength.prototype.onBtnClose = function () {
            this.times.stop();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HXH_HunterUserStrength;
    }(zj.Dialog));
    zj.HXH_HunterUserStrength = HXH_HunterUserStrength;
    __reflect(HXH_HunterUserStrength.prototype, "zj.HXH_HunterUserStrength");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_HunterUserStrength.js.map