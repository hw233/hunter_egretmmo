namespace zj {
// HXH_HunterUserStrength
// wangshenzhuo
// 20019/2/20
export class HXH_HunterUserStrength extends Dialog {

    private ID: number = 20003;

    private btnClose: eui.Button;
    private groupListTableViewExpPill: eui.Group;
    private listStrength: eui.List;

    private labelTime: eui.Label;

    private highHandItem: eui.ArrayCollection;
    private highHandIndex: number = 0;
    private times: egret.Timer;
    private lastPower: number = 0;
    private Power: number = 0;


    public constructor() {
        super();
        this.skinName = "resource/skins/adventureMap/HXH_HunterUserStrengthSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.times = new egret.Timer(999, 0);
        this.times.addEventListener(egret.TimerEvent.TIMER, this.UpdateTime, this);
        this.times.start();
        Game.EventManager.on(GameEvent.HUNTER_USERSTRENG_POWER, this.updateLastTime, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.times.stop();
            this.times.removeEventListener(egret.TimerEvent.TIMER, this.UpdateTime, this);
            Game.EventManager.off(GameEvent.HUNTER_USERSTRENG_POWER, this.updateLastTime, this);
        }, this);
    }

    public SetInfo() {
        this.lastPower = Math.floor(Game.Controller.lastPower);
        this.Power = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_POWER);
        let tbl = TableItemProp.Table();
        let tblResource = TableItemResource.Table();
        let prop = [[], []];
        for (const kk in tbl) {
            const vv = tbl[kk];
            if (vv.power != "") {
                prop[0].push(vv);
            }
        }

        Table.Sort(prop[0], function (a, b) {
            return a[0] - b[0];
        })

        for (const kk in tblResource) {
            const vv = tblResource[kk];
            if (vv.id == this.ID) {
                prop[1].push(vv);
            }
        }

        let ret = [];
        for (const c in prop) {
            const k = prop[c];
            for (const c in k) {
                const kk = k[c];
                ret.push(kk);
            }
        }

        this.listStrength.selectedIndex = 0; // 默认选中
        this.listStrength.itemRenderer = HXH_HunterUserStrengthItem;//
        this.highHandItem = new eui.ArrayCollection();

        for (let i = 0; i < ret.length; i++) {
            let data = new HXH_HunterUserStrengthItemData();
            data.father = this;
            data.info = ret[i];
            data.index = i;
            data.id = ret[i].id;
            this.highHandItem.addItem(data);
        }

        this.listStrength.dataProvider = this.highHandItem;
        this.highHandIndex = this.listStrength.selectedIndex;
        this.UpdateTime();

    }

    private UpdateTime() {
        let level = Game.PlayerInfoSystem.baseInfo_pre.level;
        let power: number;
        if (level == null || level == 0) {
            power = PlayerVIPSystem.Item().role_power;
        } else {
            power = PlayerVIPSystem.Item(Game.PlayerInfoSystem.baseInfo_pre.level).role_power;
        }
        let times = 0;
        let timestamp = Game.Controller.curServerTime;

        if (this.Power < power) {
            times = (power - this.Power) * CommonConfig.role_add_power_time - Math.floor(timestamp - this.lastPower);

            if (times < 0) {
                times = 0;
                this.times.stop();
            }
        } else {
            this.times.stop();
        }
        this.labelTime.text = Helper.FormatMsTime3(times);
    }

    private updateLastTime(ev) {
        let evdata = ev.data;
        this.Power = evdata.power;
        this.lastPower = evdata.lastPower;
    }

    public onItemTap(isTouchBegin: boolean, data: HXH_HunterUserStrengthItemData) {

        let dialog = this.groupListTableViewExpPill.getChildByName("hunter-skill-common_DesProp") as Common_DesProp;
        if (dialog) this.groupListTableViewExpPill.removeChild(dialog);

        let dialog2 = this.groupListTableViewExpPill.getChildByName("hunter-skill-common_DesRes") as Common_DesRes;
        if (dialog2) this.groupListTableViewExpPill.removeChild(dialog2);

        if (isTouchBegin) {
            if (data.index < 3) {
                loadUI(Common_DesProp).then((dialog: Common_DesProp) => {
                    dialog.name = "hunter-skill-common_DesProp";
                    dialog.setInfo(data.id, 1);
                    if (data.index == 0) {
                        dialog.x = -88;
                        dialog.y = 120;
                    } else if (data.index == 1) {
                        dialog.x = 87;
                        dialog.y = 120;
                    } else if (data.index == 2) {
                        dialog.x = 262;
                        dialog.y = 120;
                    }
                    this.groupListTableViewExpPill.addChild(dialog);
                });
            } else {
                loadUI(Common_DesRes).then((dialog2: Common_DesRes) => {
                    dialog2.name = "hunter-skill-common_DesRes";
                    dialog2.setInfo(data.id, 0);
                    dialog2.x = 437;
                    dialog2.y = 120;
                    // dialog2.labelHide.visible
                    this.groupListTableViewExpPill.addChild(dialog2);
                });
            }
        }
    }

    /**抬起移除  详情 */
    private up() {
        let dialog = this.groupListTableViewExpPill.getChildByName("hunter-skill-common_DesProp") as Common_DesProp;
        if (dialog) this.groupListTableViewExpPill.removeChild(dialog);

        let dialog2 = this.groupListTableViewExpPill.getChildByName("hunter-skill-common_DesRes") as Common_DesRes;
        if (dialog2) this.groupListTableViewExpPill.removeChild(dialog2);
    }

    public onBtnClose() {
        this.times.stop();
        this.close(UI.HIDE_TO_TOP);
    }

}
}