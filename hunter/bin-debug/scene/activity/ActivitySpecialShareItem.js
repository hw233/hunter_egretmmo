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
    /**
     * @class ActivitySpecislShareItem 邀请好友Item
     *
     * @author Yu Qingchao
     *
     * 2019.07.30
     */
    var ShareTaskType;
    (function (ShareTaskType) {
        ShareTaskType[ShareTaskType["SHARE_TASK_TYPE_NONO"] = 0] = "SHARE_TASK_TYPE_NONO";
        ShareTaskType[ShareTaskType["SHARE_TASK_TYPE_CREATE_ROLE"] = 1] = "SHARE_TASK_TYPE_CREATE_ROLE";
        ShareTaskType[ShareTaskType["SHARE_TASK_TYPE_SIX_STAR"] = 2] = "SHARE_TASK_TYPE_SIX_STAR";
        ShareTaskType[ShareTaskType["SHARE_TASK_TYPE_FIRST_CHARGE"] = 3] = "SHARE_TASK_TYPE_FIRST_CHARGE";
        ShareTaskType[ShareTaskType["SHARE_TASK_TYPE_END"] = 4] = "SHARE_TASK_TYPE_END";
    })(ShareTaskType || (ShareTaskType = {}));
    var ActivitySpecialShareItem = (function (_super) {
        __extends(ActivitySpecialShareItem, _super);
        function ActivitySpecialShareItem() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.father = null;
            _this.shareInfo = null;
            _this.PERCENT_BAR = 0.25;
            _this.skinName = "resource/skins/activity/ActivitySpecislShareItemSkin.exml";
            _this.init();
            return _this;
        }
        ActivitySpecialShareItem.prototype.init = function () {
            this.rectMask = zj.Util.getMaskImgBlack(this.imgBar.width, this.imgBar.height);
            this.rectMask.verticalCenter = 0;
            this.rectMask.left = 7;
            this.rectMask.visible = false;
            this.groupBar.addChild(this.rectMask);
            for (var i = 0; i < 4; i++) {
                this["imgGet" + i].visible = false;
            }
            this.imgBox0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImgBox0, this);
            this.imgBox1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImgBox1, this);
            this.imgBox2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImgBox2, this);
            this.imgBox3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImgBox3, this);
        };
        ActivitySpecialShareItem.prototype.SetData = function () {
            this.mixUnitInfo = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo;
            this.shareCount = (_a = {},
                _a[message.ShareTaskType.SHARE_TASK_TYPE_CREATE_ROLE] = this.mixUnitInfo.share_role_create_count,
                _a[message.ShareTaskType.SHARE_TASK_TYPE_SIX_STAR] = this.mixUnitInfo.share_role_six_star_count,
                _a[message.ShareTaskType.SHARE_TASK_TYPE_FIRST_CHARGE] = this.mixUnitInfo.share_role_first_charge_count,
                _a);
            this.shareReceive = (_b = {},
                _b[message.ShareTaskType.SHARE_TASK_TYPE_CREATE_ROLE] = this.mixUnitInfo.share_role_create_gift,
                _b[message.ShareTaskType.SHARE_TASK_TYPE_SIX_STAR] = this.mixUnitInfo.share_role_six_star_gift,
                _b[message.ShareTaskType.SHARE_TASK_TYPE_FIRST_CHARGE] = this.mixUnitInfo.share_role_first_charge_gift,
                _b);
            var _a, _b;
        };
        ActivitySpecialShareItem.prototype.InitTips = function () {
            this.shareInfo = zj.Table.DeepCopy(zj.Game.PlayerActivitySystem.shareInfo);
            this.lbTaskDesciotion.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.shareNumStr[this.index], this.shareCount[this.index + 1]);
        };
        ActivitySpecialShareItem.prototype.dataChanged = function () {
            this.index = this.data.i;
            this.father = this.data.father;
            this.SetData();
            this.InitTips();
            this.SetAwardBoxStatus();
            this.SetScheduleStatus();
        };
        ActivitySpecialShareItem.prototype.onImgBox0 = function () {
            this.InitButtonEvent(0);
        };
        ActivitySpecialShareItem.prototype.onImgBox1 = function () {
            this.InitButtonEvent(1);
        };
        ActivitySpecialShareItem.prototype.onImgBox2 = function () {
            this.InitButtonEvent(2);
        };
        ActivitySpecialShareItem.prototype.onImgBox3 = function () {
            this.InitButtonEvent(3);
        };
        ActivitySpecialShareItem.prototype.InitButtonEvent = function (id) {
            var _this = this;
            var ButtonEvent = function () {
                getTag = Math.floor(arrSetTag[id] / 10);
                var type = arrSetTag[id] - getTag * 10 + 1;
                if (getTag > _this.shareCount[type]) {
                    bReceive = false;
                }
                else {
                    for (var k in _this.shareReceive[type]) {
                        var v = _this.shareReceive[type][k];
                        if (getTag == v) {
                            bReceive = false;
                            break;
                        }
                    }
                }
                if (bReceive) {
                    zj.Game.PlayerActivitySystem.ShareTaskReward(type, getTag).then(function (msg) {
                        _this.SetData();
                        _this.SetScheduleStatus();
                        _this.SetAwardBoxStatus();
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.init(msg.getGoods);
                            dialog.show();
                        });
                    }).catch(function (reason) { console.log("req:", reason); });
                }
                else {
                    var arrGoodsinfo_1 = [];
                    for (var kk in _this.shareInfo[_this.index]) {
                        var vv = _this.shareInfo[_this.index][kk];
                        var goodsinfo = [];
                        for (var i = 0; i < vv[1].length; i++) {
                            var info = new message.GoodsInfo();
                            info.goodsId = vv[1][i];
                            info.count = vv[2][i];
                            goodsinfo.push(info);
                        }
                        arrGoodsinfo_1.push(goodsinfo);
                    }
                    zj.loadUI(zj.Daily_AwardPop)
                        .then(function (dialog) {
                        zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_TYPE_UPDATE);
                        dialog.SetInfoGift(arrGoodsinfo_1[id], null, null);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            };
            var setTag = 0;
            var getTag = 0;
            var arrSetTag = [];
            var bReceive = true;
            for (var k in this.shareInfo[this.index]) {
                var v = this.shareInfo[this.index][k];
                setTag = v[0] * 10 + this.index;
                arrSetTag.push(setTag);
            }
            ButtonEvent();
        };
        ActivitySpecialShareItem.prototype.SetAwardBoxStatus = function () {
            var nReceiveStatus = 0;
            var bReceive = true;
            for (var k in this.shareInfo[this.index]) {
                var v = this.shareInfo[this.index][k];
                if (this.shareCount[this.index + 1] >= v[0]) {
                    nReceiveStatus = 0;
                    bReceive = true;
                    for (var kk in this.shareReceive[this.index + 1]) {
                        var vv = this.shareReceive[this.index + 1][kk];
                        if (v[0] == vv) {
                            nReceiveStatus = 1;
                            bReceive = false;
                        }
                    }
                }
                else {
                    nReceiveStatus = 0;
                    bReceive = false;
                }
                this["lbNum" + k].text = v[0];
                this["imgGet" + k].visible = bReceive;
                this["imgBox" + k].source = zj.UIConfig.UIConfig_Special.shareBox[k][nReceiveStatus];
            }
        };
        /**进度条遮罩设置*/
        ActivitySpecialShareItem.prototype.SetScheduleStatus = function () {
            var percent = 0;
            var lastNum = 0;
            for (var k in this.shareInfo[this.index]) {
                var v = this.shareInfo[this.index][k];
                if (this.shareCount[this.index + 1] >= v[0]) {
                    percent = percent + this.PERCENT_BAR;
                }
                else {
                    percent = percent + (this.shareCount[this.index + 1] - lastNum) / (v[0] - lastNum) * this.PERCENT_BAR;
                    break;
                }
                lastNum = v[0];
            }
            //经验条
            this.rectMask.visible = true;
            this.rectMask.width = this.imgBar.width * percent;
            this.imgBar.mask = this.rectMask;
        };
        return ActivitySpecialShareItem;
    }(eui.ItemRenderer));
    zj.ActivitySpecialShareItem = ActivitySpecialShareItem;
    __reflect(ActivitySpecialShareItem.prototype, "zj.ActivitySpecialShareItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpecialShareItem.js.map