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
    // lizhengqiang
    // 20190112
    var Common_ChangeIconItemIR = (function (_super) {
        __extends(Common_ChangeIconItemIR, _super);
        function Common_ChangeIconItemIR() {
            var _this = _super.call(this) || this;
            _this.vis = false;
            _this.mapID = 0;
            _this.skinName = "resource/skins/common/Common_ChangeIconItemIRSKin.exml";
            zj.cachekeys(zj.UIResource["Common_ChangeIconItemIR"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnThis, _this);
            zj.Game.EventManager.on(zj.GameEvent.COMMON_CHANGE_ICON_SHUAXIN, _this.update, _this);
            _this.imgUse.visible = false;
            return _this;
        }
        Common_ChangeIconItemIR.prototype.dataChanged = function () {
            var _this = this;
            var iconType = this.data.iconType;
            var picId = this.data.picId;
            var index = this.data.index;
            this.mapID = this.data.father.listID * zj._count_per_row + this.data.i;
            if (iconType != 3) {
                this.imgIcon.source = zj.cachekey(zj.TableItemPic.Item(picId).path, this);
                this.imgBG.visible = true;
            }
            else {
                this.imgIcon.visible = false;
                this.imgBG.visible = false;
                this.imgFrame.source = zj.cachekey(zj.TableItemPicFrame.Item(picId).path, this);
            }
            if (iconType == zj.TableEnum.TableIconListState.GENERAL) {
                var mapID = this.data.father.listID * 4 + this.data.i;
                var totalListID = this.data.father.data.father.mapIndex;
                this.idRet = this.data.father.data.father.idMap[this.data.father.listType + 1][mapID];
                if (totalListID == 0) {
                    this.data.father.data.father.idRet = this.idRet;
                }
                this.data.father.data.father.idRet = this.idRet;
                var normalPic = zj.PlayerItemSystem.GetNormalPic(1);
                this.b_lightNormal = zj.Table.FindF(normalPic, function (key, value) {
                    return Number(_this.idRet) == value;
                });
                this.b_lightHigh = zj.Table.FindF(zj.Game.PlayerWonderLandSystem.otherAttri.picIds, function (key, value) {
                    return Number(_this.idRet) == value;
                });
                if (!(this.b_lightHigh || this.b_lightNormal)) {
                    zj.Helper.SetImageFilterColor(this.imgIcon, 'gray');
                }
                else {
                    zj.Helper.SetImageFilterColor(this.imgIcon, 'null');
                }
                this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Common.roleFrame[0], this);
                this.imgUse.visible = this.idRet == zj.Game.PlayerInfoSystem.BaseInfo.picId;
            }
            else if (iconType == zj.TableEnum.TableIconListState.LEAGUE) {
                // let normalPic = PlayerItemSystem.GetNormalPic(3)
                // this.b_lightNormal = Table.FindF(normalPic, (key, value) => {
                //     return this.idRet == value
                // })
                // this.b_lightHigh = Table.FindF(TableItemPic.Table(), (key, value) => {
                //     return this.idRet == value
                // })
                // if (!(this.b_lightHigh || this.b_lightNormal)) {
                //     Helper.SetImageFilterColor(this.imgIcon, 'gray')
                // }
                this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Common.roleFrame[1], this);
            }
            else if (iconType == 3) {
                this.idRet = this.data.father.data.father.frameIdMap[this.data.father.listType][this.mapID];
                zj.Helper.SetImageFilterColor(this.imgFrame, 'null');
                var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.itemFrame + ".json");
                if (this.GetInPart(tbl[this.idRet].order) == zj.ActivityFrameType && zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length == 0) {
                    zj.Helper.SetImageFilterColor(this.imgFrame, 'gray');
                }
                else if (this.GetInPart(tbl[this.idRet].order) == zj.ActivityFrameType && zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length != 0) {
                    var hasFrameIdList = [];
                    for (var k in zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
                        var v = zj.Game.PlayerWonderLandSystem.otherAttri.picFrameIds[k];
                        if (v.value > Date.parse(zj.Game.Controller.serverNow().toString()) / 1000 + 1) {
                            hasFrameIdList.push(v.key);
                        }
                    }
                    if (!zj.Table.VIn(hasFrameIdList, this.idRet)) {
                        zj.Helper.SetImageFilterColor(this.imgFrame, 'gray');
                    }
                }
                this.imgUse.visible = this.idRet == zj.Game.PlayerInfoSystem.BaseInfo.picFrameId;
            }
            if (!this.getChildByName("ani") && index == zj.Common_ChangeIconDialog.index && this.vis == false) {
                this.playAnimation();
                zj.Game.EventManager.event("COMMON_CHANGE_ICON_SETPICID", picId);
            }
            else {
                var last = this.getChildByName("ani");
                if (last) {
                    this.vis = false;
                    this.removeChild(last);
                }
            }
        };
        Common_ChangeIconItemIR.prototype.update = function () {
            this.dataChanged();
        };
        Common_ChangeIconItemIR.prototype.playAnimation = function () {
            var _this = this;
            this.vis = true;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                .then(function (display) {
                display.x = _this.imgFrame.x + _this.imgFrame.width / 2;
                display.y = _this.imgFrame.y + _this.imgFrame.height / 2;
                display.scaleX = 1.2;
                display.scaleY = 1.2;
                display.name = "ani";
                _this.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        Common_ChangeIconItemIR.prototype.onBtnThis = function () {
            if (this.data.iconType == zj.TableEnum.TableIconListState.GENERAL) {
                if (!(this.b_lightHigh || this.b_lightNormal)) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_User.name_none_get);
                    return;
                }
            }
            if (zj.Common_ChangeIconDialog.index != this.data.index) {
                zj.Common_ChangeIconDialog.index = this.data.index;
            }
            else {
                return;
            }
            this.data.father.data.father.FreshFocus(this.data.index, this.idRet, true);
        };
        Common_ChangeIconItemIR.prototype.GetInPart = function (num) {
            return num / zj.NumLevel - num / zj.NumLevel % 1;
        };
        return Common_ChangeIconItemIR;
    }(eui.ItemRenderer));
    zj.Common_ChangeIconItemIR = Common_ChangeIconItemIR;
    __reflect(Common_ChangeIconItemIR.prototype, "zj.Common_ChangeIconItemIR");
})(zj || (zj = {}));
//# sourceMappingURL=Common_ChangeIconItemIR.js.map