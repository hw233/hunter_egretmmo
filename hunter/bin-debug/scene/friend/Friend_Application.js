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
    // Friend_Application
    // wang shen zhuo
    // 2019/03/22
    var Friend_Application = (function (_super) {
        __extends(Friend_Application, _super);
        function Friend_Application() {
            var _this = _super.call(this) || this;
            _this.applyMap = [];
            _this.roleIds = [];
            _this.TableViewIndex = 0;
            _this.skinName = "resource/skins/friend/Friend_ApplicationSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonAgree.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonAgree, _this);
            _this.buttonRefuse.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonRefuse, _this);
            return _this;
        }
        Friend_Application.prototype.SetFather = function (father) {
            this.father = father;
        };
        Friend_Application.prototype.SetInfo = function () {
            this.applyMap = zj.Game.PlayerRelateSystem.relateResp.applys;
            this.roleIds = [];
            for (var i = 0; i < this.applyMap.length; i++) {
                this.roleIds.push(this.applyMap[i].roleInfo.id);
            }
            this.SetDes();
            this.LoadList();
        };
        Friend_Application.prototype.SetDes = function () {
            this.labelTextApplyCnt.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.applicationDes1, this.applyMap.length);
            this.labelTextFriendCnt.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.applicationDes2, zj.PlayerRelateSystem.Count(message.ERelationType.RELATION_TYPE_FRIEND), zj.PlayerVIPSystem.Level().reward_power);
        };
        Friend_Application.prototype.LoadList = function () {
            if (this.applyMap.length == 0) {
                this.imageTipNoApplicate.visible = true;
            }
            else {
                this.imageTipNoApplicate.visible = false;
            }
            this.listTabelView.selectedIndex = 0; // 默认选中
            this.listTabelView.itemRenderer = zj.Friend_ApplicationItem; //
            this.TableViewItem = new eui.ArrayCollection();
            for (var i = 0; i < this.applyMap.length; i++) {
                var data = new zj.Friend_ApplicationItemData();
                data.father = this;
                data.index = i;
                this.TableViewItem.addItem(data);
            }
            this.listTabelView.dataProvider = this.TableViewItem;
            this.TableViewIndex = this.listTabelView.selectedIndex;
            //红点提示
            // this.father.imageTipApply.visible = Tips.GetTipsOfId(Tips.TAG.FRIEND , 2);
        };
        Friend_Application.prototype.onButtonAgree = function () {
            var _this = this;
            this.bAgree = true;
            zj.PlayerRelateSystem.RelationAnswerFriend_Visit(this.roleIds, true)
                .then(function (data) {
                if (_this.roleIds.length == 0) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Friend.appliction);
                }
                else if (_this.bAgree == true) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Friend.addSuccess);
                }
                setTimeout(function () {
                    _this.SetInfo();
                }, 500);
            }).catch(function (reason) { });
        };
        Friend_Application.prototype.onButtonRefuse = function () {
            var _this = this;
            this.bAgree = false;
            zj.PlayerRelateSystem.RelationAnswerFriend_Visit(this.roleIds, false)
                .then(function (data) {
                if (_this.roleIds.length == 0) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Friend.appliction);
                }
                else if (_this.bAgree == true) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Friend.addSuccess);
                }
                setTimeout(function () {
                    _this.SetInfo();
                }, 500);
            }).catch(function (reason) { });
        };
        Friend_Application.prototype.onButtonClose = function () {
            var _this = this;
            zj.PlayerRelateSystem.RelationApplyListReq().then(function (data) {
                setTimeout(function () {
                    _this.father.SetInfo();
                }, 500);
                _this.close(zj.UI.HIDE_TO_TOP);
            }).catch(function (reason) { });
        };
        return Friend_Application;
    }(zj.Dialog));
    zj.Friend_Application = Friend_Application;
    __reflect(Friend_Application.prototype, "zj.Friend_Application");
})(zj || (zj = {}));
//# sourceMappingURL=Friend_Application.js.map