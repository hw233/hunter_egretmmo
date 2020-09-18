namespace zj {

/**猎人详情
 *xingliwei
 *2018.12.18
 * @class HunterSeeDetail
 */
export class HunterSeeDetail extends Dialog {
    private btnClose: eui.Button;
    private groupInfo: eui.Group;
    private groupList: eui.Group;
    private listHunterSkill: eui.List;
    private father: eui.Group;
    /**回调方法 */
    private callback: () => void;

    /**猎人ID */
    private generalId: number = 0;

    public constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterSeeDetailSkin.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.father = null;
        }, null);
        this.init();
    }

    private init() {
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
    }

    public setInfo(generalId: number, cb: any) {
        this.generalId = generalId;
        this.callback = cb;
        this.loadData();
        this.listInfo();
    }

    /**加载各属性数据*/
    private loadData() {
        let gen: message.GeneralInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);

        if (gen == null || this.generalId < 100000) {
            gen = new message.GeneralInfo();
            gen.general_id = this.generalId;
            gen.star = PlayerHunterSystem.Table(this.generalId).init_star;
            gen.level = 1;
            gen.step = 0;
            gen.awakePassive.level = 1;
        }

        let [info] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(gen);
        for (let i = 0; i < TableEnum.EnumHunterAttriShow.length; i++) {
            let vv = TableEnum.EnumHunterAttriShow[i];
            let str = String(Math.ceil(info[vv - 1]));
            if (Number(i + 1) > 4) {
                str += "%";
            }
            let labelAttri = this.groupInfo.getChildByName(`labelAttri${Number(i) + 1}`) as eui.Label;
            labelAttri.text = String(str);
        }
    }

    private listInfo() {
        let genTable = PlayerHunterSystem.Table(this.generalId);
        let array = new eui.ArrayCollection();

        for (let kk in genTable.skill_ids) {
            if (genTable.skill_ids.hasOwnProperty(kk)) {
                let vv = genTable.skill_ids[kk];
                let data = new HunterSeeDetailItemData();
                data.index = Number(kk);
                data.generalId = this.generalId;
                data.skillId = vv;
                data.fatherDetail = this;
                array.addItem(data);
            }
        }
        if (genTable.init_passive[0] != 0) {
            let data = new HunterSeeDetailItemData();
            data.index = 2;
            data.generalId = this.generalId;
            data.skillId = genTable.init_passive[0];
            data.fatherDetail = this;
            array.addItem(data);
        }
        if (genTable.awake_passive != 0) {
            let data = new HunterSeeDetailItemData();
            data.index = 3;
            data.generalId = this.generalId;
            data.skillId = genTable.awake_passive;
            data.fatherDetail = this;
            array.addItem(data);
        }
        this.listHunterSkill.dataProvider = array;
        this.listHunterSkill.itemRenderer = HunterSeeDetailItem;
    }

    public subitemClick(vis: boolean, data: HunterSeeDetailItemData) {
        let ui = this.getChildByName("UI_Common_DesSkill");
        if (ui) {
            return;
        }
        loadUI(Common_DesSkill)
            .then((dialog: Common_DesSkill) => {
                dialog.name = "UI_Common_DesSkill";
                dialog.x = this.father.x + 100 * data.index;
                dialog.y = this.father.y + this.groupList.y - dialog.height + 20;
                if (data.index == 2 || data.index == 3) {
                    // this.commonDesSkill.setInfoLevelSkill(data.skillId, data.generalId, data.index, 0);
                    dialog.setInfoTalent(data.skillId, data.index);
                } else {
                    dialog.setInfoSkill(data.skillId, data.index, 1);
                }
                this.addChild(dialog);
            });
    }

    private up() {
        let ui = this.getChildByName("UI_Common_DesSkill");
        if (ui) {
            this.removeChild(ui);
        }
    }

    /**关闭弹窗 */
    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }

}

}