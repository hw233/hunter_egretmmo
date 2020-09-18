namespace zj {

/**
 * @author chen xi 
 * 
 * @date 2018-12-25
 * 
 * @class 猎人技能 -> 添加技能 dialog
 */
export class HunterSkillAddDialog extends Dialog {
    private btnClose: eui.Button;
    private labelInfo2: eui.Label;
    private labelInfo3: eui.Label;
    private imgChangeTime: eui.Image;
    private imgChangeTimeMask: eui.Image;
    private labelChangeTime: eui.Label;
    private imgChangeSkill: eui.Image;
    private imgChangeSkillMask: eui.Image;
    private labelChangeSkill: eui.Label;
    private imgFrame: eui.Image;
    private imgIconSkill: eui.Image;
    private labelOwn: eui.Label;
    private btnChange: eui.Button;
    private generalId: number;
    private callback: Function = null;
    private itemId: number = 30507;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterSkillAddDialogSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChange, this);

        this.imgChangeSkill.mask = this.imgChangeSkillMask;
        this.imgChangeTime.mask = this.imgChangeTimeMask;
    }

    public setInfo(generalId: number, callback: Function) {
        this.generalId = generalId;
        this.callback = callback;

        this.refresh();
    }

    private refresh() {
        let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
        this.setChangeTimeProgress(hunterInfo.use_skillItem, CommonConfig.general_skill_prop_limit);


        let currentStep = PlayerHunterSystem.GetCurStepSkillPoint(hunterInfo.step);
        let maxStep = PlayerHunterSystem.GetMaxStepSkillPoint();
        this.setChangeSkillProgress(currentStep, maxStep);

        this.labelInfo2.text = Helper.StringFormat(TextsConfig.TextConfig_League.skillChangeTexts, maxStep);
        this.labelInfo3.text = Helper.StringFormat(TextsConfig.TextConfig_League.stepChangeTexts, CommonConfig.general_skill_prop_limit);

        let framePath = PlayerItemSystem.ItemFrame(this.itemId);
        let path = PlayerItemSystem.ItemPath(this.itemId);
        this.imgFrame.source = cachekey(framePath, this);
        this.imgIconSkill.source = cachekey(path,this);

        let count = PlayerItemSystem.Count(this.itemId);
        this.labelOwn.text = count.toString();
    }

    private onBtnClose() {
        this.close();
    }

    private onBtnChange() {
        let goods = new message.GoodsInfo();
        goods.goodsId = this.itemId;
        goods.count = 1;
        Game.PlayerHunterSystem.generalAddSkill(this.generalId, [goods]).then(() => {
            toast(Helper.convertStringWithColor(TextsConfig.TextsConfig_Hunter.add_skill_point, "green"));
            this.refresh();
            if (this.callback) this.callback();
        }).catch(() => {

        });
    }

    private setChangeTimeProgress(current: number, enough: number) {
        this.labelChangeTime.text = (current.toString() + "/" + enough.toString());
        let x = this.imgChangeTime.parent.width * (current / enough);
        this.imgChangeTimeMask.width = x;
        // this.imgChangeTime.width = this.imgChangeTime.parent.width * (current/enough);
    }

    private setChangeSkillProgress(current: number, enough: number) {
        this.labelChangeSkill.text = (current.toString() + "/" + enough.toString());
        let x = this.imgChangeTime.parent.width * (current / enough);;
        this.imgChangeSkillMask.width = x;
        // this.imgChangeSkill.width = this.imgChangeTime.parent.width * (current / enough);
    }
}
}