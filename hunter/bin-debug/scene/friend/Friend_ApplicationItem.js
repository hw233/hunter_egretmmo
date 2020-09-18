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
    //Friend_ApplicationItem
    //wangshenzhuo
    // 2019/03/22
    var Friend_ApplicationItem = (function (_super) {
        __extends(Friend_ApplicationItem, _super);
        function Friend_ApplicationItem() {
            var _this = _super.call(this) || this;
            _this.roleIds = [];
            _this.skinName = "resource/skins/friend/Friend_ApplicationItemSkin.exml";
            zj.cachekeys(zj.UIResource["Friend_ApplicationItem"], null);
            _this.buttonCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonCheck, _this);
            _this.buttonAgree.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonAgree, _this);
            _this.buttonRefuse.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonRefuse, _this);
            return _this;
        }
        Friend_ApplicationItem.prototype.dataChanged = function () {
            this.id = this.data.index;
            this.applyInfo = this.data.father.applyMap[this.data.index];
            this.roleIds = [];
            this.roleIds.push(this.applyInfo.roleInfo.id);
            var tblHead = zj.TableItemPic.Table();
            var tblFrame = zj.TableItemPicFrame.Table();
            this.imageHead.source = zj.cachekey(tblHead[this.applyInfo.roleInfo.picId].path, this);
            this.imageFrame.source = zj.cachekey(tblFrame[this.applyInfo.roleInfo.picFrameId].path, this);
            this.labelTextName.text = this.applyInfo.roleInfo.name;
            this.labelTextVIP.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.levelDes, this.applyInfo.roleInfo.level);
            if (this.applyInfo.roleInfo.leagueId == 0) {
                this.labelTextLeague.text = zj.TextsConfig.TextConfig_Relation.leagueNone;
            }
            else {
                this.labelTextLeague.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.leagueDes, this.applyInfo.roleInfo.leagueName);
            }
        };
        Friend_ApplicationItem.prototype.onButtonCheck = function () {
            zj.TipManager.ReqRoleInfo(this.applyInfo.roleInfo.id, this.applyInfo.roleInfo.group_id);
        };
        Friend_ApplicationItem.prototype.onButtonAgree = function () {
            var _this = this;
            this.bAgree = true;
            zj.PlayerRelateSystem.RelationAnswerFriend_Visit(this.roleIds, true)
                .then(function (data) {
                if (_this.roleIds.length == 0) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Friend.appliction);
                }
                else if (_this.bAgree == true) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Friend.addSuccess);
                }
                setTimeout(function () {
                    _this.data.father.SetInfo();
                }, 500);
            }).catch(function (reason) { });
        };
        Friend_ApplicationItem.prototype.onButtonRefuse = function () {
            var _this = this;
            this.bAgree = false;
            zj.PlayerRelateSystem.RelationAnswerFriend_Visit(this.roleIds, false)
                .then(function (data) {
                if (_this.roleIds.length == 0) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Friend.appliction);
                }
                else if (_this.bAgree == true) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Friend.addSuccess);
                }
                setTimeout(function () {
                    _this.data.father.SetInfo();
                }, 500);
            }).catch(function (reason) { });
        };
        return Friend_ApplicationItem;
    }(eui.ItemRenderer));
    zj.Friend_ApplicationItem = Friend_ApplicationItem;
    __reflect(Friend_ApplicationItem.prototype, "zj.Friend_ApplicationItem");
    var Friend_ApplicationItemData = (function () {
        function Friend_ApplicationItemData() {
        }
        return Friend_ApplicationItemData;
    }());
    zj.Friend_ApplicationItemData = Friend_ApplicationItemData;
    __reflect(Friend_ApplicationItemData.prototype, "zj.Friend_ApplicationItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Friend_ApplicationItem.js.map