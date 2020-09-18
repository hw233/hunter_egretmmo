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
    //Friend_MainFriendItem
    //wangshenzhuo
    // 2019/03/22
    var Friend_MainFriendItem = (function (_super) {
        __extends(Friend_MainFriendItem, _super);
        function Friend_MainFriendItem() {
            var _this = _super.call(this) || this;
            _this.roleIds = [];
            _this.newpower = 0;
            _this.skinName = "resource/skins/friend/Friend_MainFriendItemSkin.exml";
            zj.cachekeys(zj.UIResource["Friend_MainFriendItem"], null);
            _this.buttonSend.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonSend, _this);
            _this.buttonGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonGet, _this);
            _this.groupmain.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.data.father.onlistTableView();
            }, _this);
            return _this;
        }
        Friend_MainFriendItem.prototype.dataChanged = function () {
            this.id = this.data.index;
            this.SetItemInfo(this.data.index);
            if (this.selected) {
                this.imageSelect.visible = true;
            }
            else {
                this.imageSelect.visible = false;
            }
        };
        Friend_MainFriendItem.prototype.SetItemInfo = function (index) {
            this.relation = this.data.father.relationMap[this.data.index];
            this.roleIds = [];
            this.roleIds.push(this.relation.roleInfo.id);
            //默认不选中
            this.imageSelect.visible = false;
            this.labelTextName.text = this.relation.roleInfo.name;
            this.imageHead.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.relation.roleInfo.picId), this);
            this.imageFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.relation.roleInfo.picFrameId), this);
            this.labelTextVip.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.levelDes, this.relation.roleInfo.level);
            if (this.relation.roleInfo.leagueId == 0) {
                this.labelTextLeague.text = zj.TextsConfig.TextConfig_Relation.leagueNone;
            }
            else {
                this.labelTextLeague.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.leagueDes, this.relation.roleInfo.leagueName);
            }
            if (this.relation.canReward && this.relation.isReward == false) {
                this.data.father.imageTipGet.visible = true;
            }
            if (this.data.father.relationType == message.ERelationType.RELATION_TYPE_ENEMY) {
                this.buttonGet.visible = false;
                this.buttonSend.visible = false;
                this.imageSendTip.visible = false;
            }
            else {
                if (this.relation.canReward && this.relation.isReward == false) {
                    this.buttonGet.visible = true;
                }
                else {
                    this.buttonGet.visible = false;
                }
                var a = zj.Game.PlayerRelateSystem.relateResp.givepower;
                var b = zj.Game.PlayerRelateSystem.givepower();
                if (zj.Game.PlayerRelateSystem.givepower()[this.relation.roleInfo.id] == null) {
                    this.buttonSend.visible = true;
                    this.imageSendTip.visible = false;
                }
                else {
                    this.buttonSend.visible = false;
                    this.imageSendTip.visible = true;
                }
            }
            var timesDes = this.GetTimeDes();
            this.labelTextTime.text = String(timesDes);
            if (this.relation.roleInfo.is_online == true) {
                this.labelTextTime.textColor = zj.ConstantConfig_Common.Color.online;
            }
            else {
                this.labelTextTime.textColor = zj.ConstantConfig_Common.Color.offline;
            }
            // //服务器名称
            var name1 = null;
            if (zj.Game.Controller.groupOwnerID() != this.relation.roleInfo.group_id && this.relation.roleInfo.group_name != "") {
                var json = JSON.parse(this.relation.roleInfo.group_name);
                var desc = "";
                if (desc.length <= 0 && json["zhcn"])
                    desc = json["zhcn"];
                if (desc.length <= 0 && json["zhtw"])
                    desc = json["zhtw"];
                if (desc.length <= 0 && json["en"])
                    desc = json["en"];
                var items = desc.split("&");
                if (items.length >= 2) {
                    this.labelServer.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, items[0], items[1]);
                }
            }
            else {
                this.labelServer.text = zj.TextsConfig.TextsConfig_Chat.serverSelf;
            }
            zj.Game.PlayerRelateSystem.serverName = name1;
        };
        Friend_MainFriendItem.prototype.GetTimeDes = function () {
            var des = "";
            var sec = this.relation.roleInfo.logoutTime;
            if (this.relation.roleInfo.is_online == true) {
                des = zj.TextsConfig.TextsConfig_Time.online;
            }
            else {
                var ret = 0;
                if (sec > (3600 * 24) * 30) {
                    des = zj.TextsConfig.TextsConfig_Time.noLogin;
                }
                else if (sec > (3600 * 24)) {
                    ret = Math.floor(sec / (3600 * 24));
                    des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.daysAgo, ret);
                }
                else if (sec > 3600) {
                    ret = Math.floor(sec / 3600);
                    des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.hoursAgo, ret);
                }
                else if (sec > 60) {
                    ret = Math.floor(sec / 60);
                    des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.minsAgo, ret);
                }
                else {
                    des = zj.TextsConfig.TextsConfig_Time.justNow;
                }
            }
            return des;
        };
        Friend_MainFriendItem.prototype.onButtonSend = function () {
            var _this = this;
            zj.PlayerRelateSystem.RelationGivePower_Req(this.roleIds)
                .then(function (data) {
                setTimeout(function () {
                    _this.data.father.SetRoleIds();
                    _this.data.father.LoadList(true);
                    _this.data.father.SetDes();
                    _this.SetItemInfo(_this.id);
                }, 800);
            }).catch(function (reason) { zj.toast_warning(reason); });
        };
        Friend_MainFriendItem.prototype.onButtonGet = function () {
            var _this = this;
            this.newpower = zj.Game.PlayerInfoSystem.BaseInfo.power;
            zj.PlayerRelateSystem.RelationRewardPower_Req(this.roleIds)
                .then(function (data) {
                var a = _this.relation.roleInfo.id;
                var isReward = zj.Table.FindF(_this.roleIds, function (k, v) {
                    return v == a;
                });
                if (isReward) {
                    _this.relation.canReward = false;
                }
                setTimeout(function () {
                    _this.data.father.SetRoleIds();
                    _this.data.father.LoadList(true);
                    _this.data.father.SetDes();
                    _this.SetItemInfo(_this.id);
                    _this.data.father.SetInfo();
                    var powerDt = zj.Game.PlayerInfoSystem.BaseInfo.power - _this.newpower;
                    zj.Common_Tip.AddTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Friend.getPower, powerDt), _this.data.father.height, _this.data.father.width);
                }, 800);
            }).catch(function (reason) { zj.toast_warning(reason); });
        };
        return Friend_MainFriendItem;
    }(eui.ItemRenderer));
    zj.Friend_MainFriendItem = Friend_MainFriendItem;
    __reflect(Friend_MainFriendItem.prototype, "zj.Friend_MainFriendItem");
    //子项数据源
    var Friend_MainFriendItemData = (function () {
        function Friend_MainFriendItemData() {
        }
        return Friend_MainFriendItemData;
    }());
    zj.Friend_MainFriendItemData = Friend_MainFriendItemData;
    __reflect(Friend_MainFriendItemData.prototype, "zj.Friend_MainFriendItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Friend_MainFriendItem.js.map