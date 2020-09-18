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
    //Friend_AddFriendItem
    //wangshenzhuo
    // 2019/03/22
    var Friend_AddFriendItem = (function (_super) {
        __extends(Friend_AddFriendItem, _super);
        function Friend_AddFriendItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/friend/Friend_AddFriendItemSkin.exml";
            zj.cachekeys(zj.UIResource["Friend_AddFriendItem"], null);
            _this.buttonCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonCheck, _this);
            _this.buttonAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonAdd, _this);
            return _this;
        }
        Friend_AddFriendItem.prototype.dataChanged = function () {
            this.roleInfo = this.data.father.searchMap[this.data.id];
            this.labelTextName.text = this.roleInfo.name;
            this.labelTextVIP.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.levelDes, this.roleInfo.level);
            if (this.roleInfo.leagueId == 0) {
                this.labelTextLeague.text = zj.TextsConfig.TextConfig_Relation.leagueNone;
            }
            else {
                this.labelTextLeague.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.leagueDes, this.roleInfo.leagueName);
            }
            if (this.data.father.itemArray[this.roleInfo.id] != null) {
                this.buttonAdd.enabled = false;
            }
            else {
                this.buttonAdd.enabled = true;
            }
            this.imageHead.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.roleInfo.picId), this);
            this.imageFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.roleInfo.picFrameId), this);
        };
        Friend_AddFriendItem.prototype.onButtonCheck = function () {
            zj.TipManager.ReqRoleInfo(this.roleInfo.id, this.roleInfo.group_id);
        };
        Friend_AddFriendItem.prototype.onButtonAdd = function () {
            var _this = this;
            zj.TipManager.RelationAdd(this.roleInfo.id, function () { _this.RelationAdd_Visit(); });
            setTimeout(function () {
                zj.PlayerRelateSystem.RelationApplyListReq().then(function (data) {
                }).catch(function (reason) { });
            }, 800);
        };
        Friend_AddFriendItem.prototype.RelationAdd_Visit = function () {
            var _this = this;
            zj.PlayerRelateSystem.RelationApplyListReq().then(function (data) {
                setTimeout(function () {
                    _this.buttonAdd.enabled = false;
                    _this.data.father.SetDes();
                }, 500);
            }).catch(function (reason) { });
        };
        return Friend_AddFriendItem;
    }(eui.ItemRenderer));
    zj.Friend_AddFriendItem = Friend_AddFriendItem;
    __reflect(Friend_AddFriendItem.prototype, "zj.Friend_AddFriendItem");
    var Friend_AddFriendItemData = (function () {
        function Friend_AddFriendItemData() {
        }
        return Friend_AddFriendItemData;
    }());
    zj.Friend_AddFriendItemData = Friend_AddFriendItemData;
    __reflect(Friend_AddFriendItemData.prototype, "zj.Friend_AddFriendItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Friend_AddFriendItem.js.map