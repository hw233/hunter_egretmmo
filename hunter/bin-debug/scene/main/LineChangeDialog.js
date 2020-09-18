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
    // 换线界面
    // 翟伟利
    // 2019.12.14
    var LineChangeDialog = (function (_super) {
        __extends(LineChangeDialog, _super);
        function LineChangeDialog() {
            var _this = _super.call(this) || this;
            _this.roleNums = [35, 60]; // 0-角儿数量拥挤线，1-角色数量满线
            _this.skinName = "resource/skins/main/LineChangeDialogSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.groupLook.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLook, _this);
            return _this;
        }
        LineChangeDialog.getLineName = function (key) {
            if (key < 100) {
                return 1;
            }
            else {
                return (key % 100) + 1;
            }
        };
        LineChangeDialog.prototype.Init = function () {
            this.isLookOther = zj.Game.PlayerInfoSystem.getIsLookOtherPlayer();
            this.imgSelect.visible = this.isLookOther;
            this.lbLineMy.text = LineChangeDialog.getLineName(zj.Game.PlayerWonderLandSystem.serverSceneId) + "线";
            this.sendGetLines();
        };
        LineChangeDialog.prototype.sendGetLines = function () {
            var _this = this;
            var req = new message.WonderlandGetBranchInfoRequest();
            req.body.id = 2;
            zj.Game.Controller.send(req, function (req, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                _this.reqLinesBack(response);
            }, null, this, false);
        };
        LineChangeDialog.prototype.reqLinesBack = function (resp) {
            var list = resp.body.branchInfo;
            this.resetRoleNums(list);
            this.updateList(list);
        };
        LineChangeDialog.prototype.resetRoleNums = function (list) {
            if (list.length > 0) {
                var nums = [];
                for (var i = 0; i < list.length; ++i) {
                    nums.push(list[i].value);
                }
                var sort = function (a, b) {
                    return a - b;
                };
                nums.sort(sort);
                if (nums[0] >= this.roleNums[1]) {
                    var idx = Math.floor(list.length / 2);
                    if (idx >= nums.length) {
                        idx = nums.length - 1;
                    }
                    this.roleNums[1] = nums[idx] + 1;
                }
            }
        };
        LineChangeDialog.prototype.updateList = function (list) {
            this.groupList.removeChildren();
            for (var i = 0; i < list.length; ++i) {
                var item = new zj.LineChangeDialogItem(this);
                item.setData(list[i], this.roleNums);
                this.groupList.addChild(item);
            }
        };
        LineChangeDialog.prototype.onSelItem = function (item) {
            if (item.key != zj.Game.PlayerWonderLandSystem.serverSceneId) {
                this.sendChangeline(item.key);
            }
        };
        LineChangeDialog.prototype.sendChangeline = function (id) {
            var _this = this;
            var req = new message.WonderlandChangeBranchInfoRequest();
            req.body.id = id;
            zj.Game.Controller.send(req, function (req, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                _this.reqChangeLineBack(response);
            }, null, this, false);
        };
        LineChangeDialog.prototype.reqChangeLineBack = function (response) {
            zj.Game.PlayerWonderLandSystem.changeLine(response);
            this.onBtnClose();
            zj.Game.EventManager.event(zj.GameEvent.SERVER_LINE_CHANGE); //message.WonderlandChangeBranchInfoRespBody
            // this.sendGetLines();
        };
        LineChangeDialog.prototype.onBtnLook = function () {
            this.isLookOther = !this.isLookOther;
            this.imgSelect.visible = this.isLookOther;
        };
        LineChangeDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TRAIL_OFF);
            zj.Game.PlayerInfoSystem.setLookOther(this.isLookOther);
            zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
        };
        return LineChangeDialog;
    }(zj.Dialog));
    zj.LineChangeDialog = LineChangeDialog;
    __reflect(LineChangeDialog.prototype, "zj.LineChangeDialog");
})(zj || (zj = {}));
//# sourceMappingURL=LineChangeDialog.js.map