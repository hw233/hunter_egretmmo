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
    // 登录页选区
    // guoshanhe 创建于2018.11.14
    var SelectGameGroupDialog = (function (_super) {
        __extends(SelectGameGroupDialog, _super);
        function SelectGameGroupDialog() {
            var _this = _super.call(this) || this;
            _this.roles = []; // 角色列表信息
            _this.groups = []; // 分区列表
            _this.current_group = null; // 当前选择分区
            _this.skinName = "resource/skins/login/SelectGameGroupDialogSkin.exml";
            _this.scrollerGameGroup.visible = false;
            _this.scrollerGameRole.visible = false;
            _this.btnShowRoles.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnShowRoles, _this);
            _this.btnRecommend.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRecommend, _this);
            _this.btnCurrSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCurrSelect, _this);
            _this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOK, _this);
            _this.lstGameGroup.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onGameGroupItemTap, _this);
            _this.lstGameRole.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onGameRoleItemTap, _this);
            _this.lstGameGroupSection.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onGameGroupSectionItemTap, _this);
            return _this;
        }
        SelectGameGroupDialog.prototype.open = function (groups, roles, current_group, callback_function, callback_this) {
            this.callback_function = callback_function;
            this.callback_this = callback_this;
            this.groups = groups;
            this.roles = roles;
            this.current_group = current_group;
            this.generate_ui();
        };
        SelectGameGroupDialog.prototype.reset_all_buttons_states = function () {
            this.btnShowRoles.currentState = "up";
            this.btnRecommend.currentState = "up";
            var sections = [];
            var provider = this.lstGameGroupSection.dataProvider;
            if (provider == null)
                return;
            for (var i = 0; i < provider.length; i++) {
                var item = provider.getItemAt(i);
                sections.push({ start: item.start, end: item.end, is_selected: false });
            }
            this.lstGameGroupSection.dataProvider = new eui.ArrayCollection(sections);
            this.lstGameGroupSection.itemRenderer = zj.GameGroupSectionIR;
            return;
        };
        SelectGameGroupDialog.prototype.onBtnShowRoles = function () {
            var collection = [];
            for (var i = 0; i < this.roles.length; i++) {
                var role = this.roles[i];
                var group = this.findGroupInfoByID(role.owner_groupid);
                if (group) {
                    collection.push({ role: role, group: group });
                }
            }
            this.lstGameRole.dataProvider = new eui.ArrayCollection(collection);
            this.lstGameRole.itemRenderer = zj.GameRoleIR;
            this.scrollerGameRole.visible = true;
            this.scrollerGameGroup.visible = false;
            this.reset_all_buttons_states();
            this.btnShowRoles.currentState = "down";
            return;
        };
        // 推荐分区（我的分区）
        SelectGameGroupDialog.prototype.onBtnRecommend = function () {
            var mapGroups = {};
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].is_recommend) {
                    var num = this.getGroupNumber(this.groups[i].group_name);
                    mapGroups[num] = this.groups[i];
                }
            }
            var groups = [];
            for (var k in mapGroups) {
                groups.push(mapGroups[k]);
            }
            this.lstGameGroup.dataProvider = new eui.ArrayCollection(groups);
            this.lstGameGroup.itemRenderer = zj.GameGroupIR;
            this.scrollerGameRole.visible = false;
            this.scrollerGameGroup.visible = true;
            this.reset_all_buttons_states();
            this.btnRecommend.currentState = "down";
        };
        SelectGameGroupDialog.prototype.onBtnCurrSelect = function () {
            this.onBtnOK();
        };
        SelectGameGroupDialog.prototype.onBtnOK = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            if (this.callback_function) {
                this.callback_function.call(this.callback_this, this.current_group);
            }
        };
        SelectGameGroupDialog.prototype.onGameRoleItemTap = function (e) {
            this.current_group = this.lstGameRole.selectedItem.group;
            this.onBtnOK();
        };
        SelectGameGroupDialog.prototype.onGameGroupItemTap = function (e) {
            if (this.lstGameGroup.selectedItem.status <= 1) {
                // 维护状态不能选
                return;
            }
            this.current_group = this.lstGameGroup.selectedItem;
            this.onBtnOK();
        };
        SelectGameGroupDialog.prototype.onGameGroupSectionItemTap = function (e) {
            var start = this.lstGameGroupSection.selectedItem.start;
            var end = this.lstGameGroupSection.selectedItem.end;
            // 显示最新的分区
            var groups = [];
            for (var i = start; i <= end; i++) {
                var group = this.findGroupInfoByNumber(i);
                if (group)
                    groups.push(group);
            }
            this.lstGameGroup.dataProvider = new eui.ArrayCollection(groups);
            this.lstGameGroup.itemRenderer = zj.GameGroupIR;
            this.scrollerGameRole.visible = false;
            this.scrollerGameGroup.visible = true;
            var sections = [];
            var provider = this.lstGameGroupSection.dataProvider;
            for (var i = 0; i < provider.length; i++) {
                var item = provider.getItemAt(i);
                if (this.lstGameGroupSection.selectedIndex == i) {
                    item.is_selected = true;
                }
                else {
                    item.is_selected = false;
                }
                sections.push({ start: item.start, end: item.end, is_selected: item.is_selected });
            }
            this.lstGameGroupSection.dataProvider = new eui.ArrayCollection(sections);
            this.lstGameGroupSection.itemRenderer = zj.GameGroupSectionIR;
            this.btnRecommend.currentState = "up";
            this.btnShowRoles.currentState = "up";
            return;
        };
        SelectGameGroupDialog.prototype.generate_ui = function () {
            // 当前选择分区
            this.imgCurrClose.visible = false;
            this.imgCurrBusy.visible = false;
            this.imgCurrFull.visible = false;
            this.imgCurrGood.visible = false;
            if (this.current_group.status == 4) {
                this.imgCurrFull.visible = true;
            }
            else if (this.current_group.status == 3) {
                this.imgCurrBusy.visible = true;
            }
            else if (this.current_group.status == 2) {
                this.imgCurrGood.visible = true;
            }
            else {
                this.imgCurrClose.visible = true;
            }
            this.lbCurrGroupName.text = this.getGroupName(this.current_group.group_name);
            console.log(JSON.stringify(this.groups));
            console.log(JSON.stringify(this.roles));
            // 分区区段
            var max = 0;
            for (var i = 0; i < this.groups.length; i++) {
                var num = this.getGroupNumber(this.groups[i].group_name);
                if (num > max)
                    max = num;
            }
            var limit = (((max + 9) / 10) >>> 0) * 10; // 取到整10
            var sections = [];
            for (var i = 1; i <= limit; i += 10) {
                sections.push({ start: i, end: i + 9 });
            }
            console.log(max, limit);
            var sections_desc = [];
            for (var i = sections.length - 1; i >= 0; i--) {
                if (i == sections.length - 1)
                    sections[i].is_selected = true; // 第一个默认选中
                sections_desc.push(sections[i]);
            }
            console.log(sections_desc);
            this.lstGameGroupSection.dataProvider = new eui.ArrayCollection(sections_desc);
            this.lstGameGroupSection.itemRenderer = zj.GameGroupSectionIR;
            // 显示最新的分区
            var groups = [];
            for (var i = sections_desc[0].start; i <= sections_desc[0].end; i++) {
                var group = this.findGroupInfoByNumber(i);
                if (group)
                    groups.push(group);
            }
            console.log(JSON.stringify(groups));
            this.lstGameGroup.dataProvider = new eui.ArrayCollection(groups);
            this.lstGameGroup.itemRenderer = zj.GameGroupIR;
            this.scrollerGameRole.visible = false;
            this.scrollerGameGroup.visible = true;
        };
        // 根据分区ID查找分区信息
        SelectGameGroupDialog.prototype.findGroupInfoByID = function (group_id) {
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].group_id == group_id) {
                    return this.groups[i];
                }
            }
            return null;
        };
        // 根据分区区号查找分区信息
        SelectGameGroupDialog.prototype.findGroupInfoByNumber = function (num) {
            for (var i = 0; i < this.groups.length; i++) {
                var group_number = this.getGroupNumber(this.groups[i].group_name);
                if (num == group_number)
                    return this.groups[i];
            }
            return null;
        };
        // 取出分区名
        SelectGameGroupDialog.prototype.getGroupName = function (group_name) {
            var json = JSON.parse(group_name);
            if (typeof json != "object")
                return this.parseGroupName(group_name);
            if (zj.Game.LanguageManager.getLang() in json)
                return this.parseGroupName(json[zj.Game.LanguageManager.getLang()]);
            if ('zhcn' in json)
                return this.parseGroupName(json['zhcn']);
            if ('en' in json)
                return this.parseGroupName(json['en']);
            for (var k in json) {
                return this.parseGroupName(json[k]);
            }
            return zj.LANG("未知分区");
        };
        // 解析分区名
        SelectGameGroupDialog.prototype.parseGroupName = function (groupName) {
            var names = groupName.split("&");
            if (names.length <= 1)
                return zj.Util.cutString(groupName, 16);
            return zj.Util.cutString(names[0] + "\u533A " + names[1], 16);
        };
        // 取出分区的设定分区号
        SelectGameGroupDialog.prototype.getGroupNumber = function (group_name) {
            var json = JSON.parse(group_name);
            if (typeof json != "object")
                return 0;
            if (zj.Game.LanguageManager.getLang() in json)
                return this.parseGroupNumber(json[zj.Game.LanguageManager.getLang()]);
            if ('zhcn' in json)
                return this.parseGroupNumber(json['zhcn']);
            if ('en' in json)
                return this.parseGroupNumber(json['en']);
            for (var k in json) {
                return this.parseGroupNumber(json[k]);
            }
            return 0;
        };
        // 解析分区区号
        SelectGameGroupDialog.prototype.parseGroupNumber = function (groupName) {
            var names = groupName.split("&");
            if (names.length <= 1)
                return 0;
            var num = parseInt(names[0]);
            if (isNaN(num))
                return 0;
            return num;
        };
        return SelectGameGroupDialog;
    }(zj.Dialog));
    zj.SelectGameGroupDialog = SelectGameGroupDialog;
    __reflect(SelectGameGroupDialog.prototype, "zj.SelectGameGroupDialog");
})(zj || (zj = {}));
//# sourceMappingURL=SelectGameGroupDialog.js.map