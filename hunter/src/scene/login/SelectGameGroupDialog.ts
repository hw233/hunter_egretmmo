namespace zj {
// 登录页选区
// guoshanhe 创建于2018.11.14

export class SelectGameGroupDialog extends Dialog {
    private btnShowRoles: eui.Button;
    private btnRecommend: eui.Button;
    private btnOK: eui.Button;
    private lstGameGroup: eui.List;
    private lstGameRole: eui.List;
    private lstGameGroupSection: eui.List;
    private scrollerGameGroup: eui.Scroller;
    private scrollerGameRole: eui.Scroller;
    private scrollerGroupSection: eui.Scroller;

    // 当前选择
    private btnCurrSelect: eui.Button;
    private imgCurrClose: eui.Image;
    private imgCurrGood: eui.Image;
    private imgCurrBusy: eui.Image;
    private imgCurrFull: eui.Image;
    private lbCurrGroupName: eui.Label;

    private callback_this: any; // 回调接收者
    private callback_function: (select_group: message.GameGroupInfo) => void; // 回调函数

    private roles : Array<message.RoleShortInfo>  =  [];  // 角色列表信息
    private groups : Array<message.GameGroupInfo>  =  [];  // 分区列表
    private current_group: message.GameGroupInfo = null; // 当前选择分区

    public constructor() {
        super();
        this.skinName = "resource/skins/login/SelectGameGroupDialogSkin.exml";
        this.scrollerGameGroup.visible = false;
        this.scrollerGameRole.visible = false;

        this.btnShowRoles.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShowRoles, this);
        this.btnRecommend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRecommend, this);
        this.btnCurrSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCurrSelect, this);
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOK, this);
        this.lstGameGroup.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onGameGroupItemTap, this);
        this.lstGameRole.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onGameRoleItemTap, this);
        this.lstGameGroupSection.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onGameGroupSectionItemTap, this);
    }

    public open(groups : Array<message.GameGroupInfo>, roles : Array<message.RoleShortInfo>, current_group: message.GameGroupInfo, callback_function?: (select_group: message.GameGroupInfo) => void, callback_this?: any) {
        this.callback_function = callback_function;
        this.callback_this = callback_this;
        this.groups = groups;
        this.roles = roles;
        this.current_group = current_group;

        this.generate_ui();
    }

    private reset_all_buttons_states() {
        this.btnShowRoles.currentState = "up";
        this.btnRecommend.currentState = "up";

        let sections = [];
        let provider= this.lstGameGroupSection.dataProvider;
        if (provider == null) return;
        for (let i = 0; i < provider.length; i++) {
            let item = provider.getItemAt(i);
            sections.push({start: item.start, end: item.end, is_selected: false});
        }
        this.lstGameGroupSection.dataProvider = new eui.ArrayCollection(sections);
        this.lstGameGroupSection.itemRenderer = GameGroupSectionIR;
        return;
    }

    private onBtnShowRoles() {
        let collection = [];
        for (let i = 0; i < this.roles.length; i++) {
            let role = this.roles[i];
            let group = this.findGroupInfoByID(role.owner_groupid);
            if (group) {
                collection.push({role:role, group:group})
            }
        }
        this.lstGameRole.dataProvider = new eui.ArrayCollection(collection);
        this.lstGameRole.itemRenderer = GameRoleIR;
        this.scrollerGameRole.visible = true;
        this.scrollerGameGroup.visible = false;

        this.reset_all_buttons_states();
        this.btnShowRoles.currentState = "down";
        return;
    }

    // 推荐分区（我的分区）
    private onBtnRecommend() {
        let mapGroups: {[key:number]: message.GameGroupInfo} = {};
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].is_recommend) {
                let num = this.getGroupNumber(this.groups[i].group_name);
                mapGroups[num] = this.groups[i];
            }
        }

        let groups = [];
        for (let k in mapGroups) {
            groups.push(mapGroups[k]);
        }

        this.lstGameGroup.dataProvider = new eui.ArrayCollection(groups);
        this.lstGameGroup.itemRenderer = GameGroupIR;
        this.scrollerGameRole.visible = false;
        this.scrollerGameGroup.visible = true;

        this.reset_all_buttons_states();
        this.btnRecommend.currentState = "down";
    }

    private onBtnCurrSelect() {
        this.onBtnOK();
    }

    private onBtnOK() {
        this.close(UI.HIDE_TO_TOP);

        if (this.callback_function) {
            this.callback_function.call(this.callback_this, this.current_group);
        }
    }

    private onGameRoleItemTap(e: eui.PropertyEvent) {
        this.current_group = this.lstGameRole.selectedItem.group;
        this.onBtnOK();
    }

    private onGameGroupItemTap(e: eui.PropertyEvent) {
        if (this.lstGameGroup.selectedItem.status <= 1) {
            // 维护状态不能选
            return;
        }
        this.current_group = this.lstGameGroup.selectedItem;
        this.onBtnOK();
    }

    private onGameGroupSectionItemTap(e: eui.PropertyEvent) {
        let start = this.lstGameGroupSection.selectedItem.start;
        let end = this.lstGameGroupSection.selectedItem.end;
        // 显示最新的分区
        let groups: Array<message.GameGroupInfo> = [];
        for (let i = start; i <= end; i++) {
            let group = this.findGroupInfoByNumber(i);
            if (group) groups.push(group);
        }
        this.lstGameGroup.dataProvider = new eui.ArrayCollection(groups);
        this.lstGameGroup.itemRenderer = GameGroupIR;
        this.scrollerGameRole.visible = false;
        this.scrollerGameGroup.visible = true;

        let sections = [];
        let provider= this.lstGameGroupSection.dataProvider;
        for (let i = 0; i < provider.length; i++) {
            let item = provider.getItemAt(i);
            if (this.lstGameGroupSection.selectedIndex == i) {
                item.is_selected = true;
            } else {
                item.is_selected = false;
            }
            sections.push({start: item.start, end: item.end, is_selected: item.is_selected});
        }
        this.lstGameGroupSection.dataProvider = new eui.ArrayCollection(sections);
        this.lstGameGroupSection.itemRenderer = GameGroupSectionIR;
        this.btnRecommend.currentState = "up";
        this.btnShowRoles.currentState = "up";
        return;
    }

    private generate_ui() {
        // 当前选择分区
        this.imgCurrClose.visible = false;
        this.imgCurrBusy.visible = false;
        this.imgCurrFull.visible = false;
        this.imgCurrGood.visible = false;
        if (this.current_group.status == 4) {
            this.imgCurrFull.visible = true;
        } else if (this.current_group.status == 3) {
            this.imgCurrBusy.visible = true;
        } else if (this.current_group.status == 2) {
            this.imgCurrGood.visible = true;
        } else {
            this.imgCurrClose.visible = true;
        }
        this.lbCurrGroupName.text = this.getGroupName(this.current_group.group_name);

        console.log(JSON.stringify(this.groups));
        console.log(JSON.stringify(this.roles));
        // 分区区段
        let max = 0;
        for (let i = 0; i < this.groups.length; i++) {
            let num = this.getGroupNumber(this.groups[i].group_name);
            if (num > max) max = num;
        }
        let limit = (((max + 9) / 10) >>> 0) * 10; // 取到整10
        let sections = [];
        for (let i = 1; i <= limit; i+= 10) {
            sections.push({start:i, end:i+9});
        }
        console.log(max, limit);
        let sections_desc = [];
        for (let i = sections.length - 1; i >= 0; i--) {
            if (i == sections.length - 1) sections[i].is_selected = true; // 第一个默认选中
            sections_desc.push(sections[i]);
        }
        console.log(sections_desc);
        this.lstGameGroupSection.dataProvider = new eui.ArrayCollection(sections_desc);
        this.lstGameGroupSection.itemRenderer = GameGroupSectionIR;

        // 显示最新的分区
        let groups: Array<message.GameGroupInfo> = [];
        for (let i = sections_desc[0].start; i <= sections_desc[0].end; i++) {
            let group = this.findGroupInfoByNumber(i);
            if (group) groups.push(group);
        }
        console.log(JSON.stringify(groups));
        this.lstGameGroup.dataProvider = new eui.ArrayCollection(groups);
        this.lstGameGroup.itemRenderer = GameGroupIR;
        this.scrollerGameRole.visible = false;
        this.scrollerGameGroup.visible = true;
    }

    // 根据分区ID查找分区信息
    private findGroupInfoByID(group_id: number) {
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].group_id == group_id) {
                return this.groups[i];
            }
        }
        return null;
    }

    // 根据分区区号查找分区信息
    private findGroupInfoByNumber(num: number) {
        for (let i = 0; i < this.groups.length; i++) {
            let group_number = this.getGroupNumber(this.groups[i].group_name);
            if (num == group_number) return this.groups[i];
        }
        return null;
    }

    // 取出分区名
    private getGroupName(group_name: string): string {
        let json = JSON.parse(group_name);
        if (typeof json != "object") return this.parseGroupName(group_name);
        if (Game.LanguageManager.getLang() in json) return this.parseGroupName(json[Game.LanguageManager.getLang()]);
        if ('zhcn' in json) return this.parseGroupName(json['zhcn']);
        if ('en' in json) return this.parseGroupName(json['en']);
        for (let k in json) {
            return this.parseGroupName(json[k]);
        }
        return LANG("未知分区");
    }

    // 解析分区名
    private parseGroupName(groupName: string): string {
        let names = groupName.split("&");
        if (names.length <= 1) return Util.cutString(groupName, 16);
        return Util.cutString(`${names[0]}区 ${names[1]}`, 16);
    }

    // 取出分区的设定分区号
    private getGroupNumber(group_name: string): number {
        let json = JSON.parse(group_name);
        if (typeof json != "object") return 0;
        if (Game.LanguageManager.getLang() in json) return this.parseGroupNumber(json[Game.LanguageManager.getLang()]);
        if ('zhcn' in json) return this.parseGroupNumber(json['zhcn']);
        if ('en' in json) return this.parseGroupNumber(json['en']);
        for (let k in json) {
            return this.parseGroupNumber(json[k]);
        }
        return 0;
    }

    // 解析分区区号
    private parseGroupNumber(groupName: string): number {
        let names = groupName.split("&");
        if (names.length <= 1) return 0;
        let num = parseInt(names[0]);
        if (isNaN(num)) return 0;
        return num;
    }
}

}