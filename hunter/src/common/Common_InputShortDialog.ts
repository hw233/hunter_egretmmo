namespace zj {
// 
// lizhengqiang
// 20190111
export class Common_InputShortDialog extends Dialog {
    public static ID = "Common_InputShortDialog";

    private textContent: eui.TextInput;
    private imgProp: eui.Image;
    private lbProp: eui.Label;
    public btnRand: eui.Button;
    private btnCancel: eui.Button;
    private btnConfirm: eui.Button;
    private btnClose: eui.Button;

    private CB: Function = null;
    private itemId: number = 0;
    public constructor() {
        super();

        this.skinName = "resource/skins/common/Common_InputShortDialogSkin.exml";

        this.btnRand.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRand, this);
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCancel, this);
        this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOK, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

        this.init();
        if (Device.isReviewSwitch) {
            this.imgProp.width = 40;
            this.imgProp.height = 40;
            this.imgProp.y = -5;
        }
    }

    private init() {
        this.textContent.skinName = "resource/skins/common/TextInputSkin.exml";
        this.textContent.textDisplay.textColor = 0x5A3722;
        this.textContent.promptDisplay.textColor = 0xB19782;
        this.textContent.inputType = egret.TextFieldType.INPUT;
        this.textContent.prompt = TextsConfig.TextConfig_Input.commonShort;
    }

    public setCB(cb?) {
        this.CB = cb;
    }

    public SetInfo(strTitle, itemId) {
        this.itemId = itemId;
        if (this.itemId != null) {
            if (Game.PlayerInfoSystem.BaseInfo.modify_name > 0) {
                this.imgProp.visible = false;
                this.lbProp.visible = true;
                this.lbProp.text = TextsConfig.TextConfig_League.freeName;
            } else {
                if (this.itemId == message.EResourceType.RESOURCE_TOKEN) {
                    this.imgProp.visible = true;
                    this.lbProp.visible = true;
                    this.lbProp.text = "x" + CommonConfig.modify_role_name_consume;
                } else {
                    this.imgProp.visible = true;
                    this.imgProp.source = cachekey(PlayerItemSystem.ItemPath(this.itemId), this);
                    this.lbProp.visible = true;
                    this.lbProp.text = PlayerItemSystem.Count(this.itemId).toString();
                }
            }
        } else {
            this.imgProp.visible = false;
            this.lbProp.visible = false;
        }

        if (this.itemId == CommonConfig.league_modify_name_prop_id && Game.PlayerLeagueSystem.leagueInfo[0].info.modify_name > 0) {
            this.imgProp.visible = false;
            this.lbProp.visible = true;
            this.lbProp.text = TextsConfig.TextConfig_League.freeName;
        }
    }


    public setLeagueInfo() {
        if (Game.PlayerLeagueSystem.BaseInfo.modify_name > 0) {
            this.imgProp.visible = false;
            this.lbProp.visible = true;
            this.lbProp.text = TextsConfig.TextConfig_League.freeName;
            let lbPropX = this.lbProp.x;
            this.lbProp.x = lbPropX - 40;
        } else {
            this.imgProp.visible = true;
            this.lbProp.visible = true;
            this.lbProp.text = "x" + CommonConfig.modify_league_name_consume;
        }
    }

    private getRandomName(): string {
        let lastName = Helper.GetRandItem(TableClientRandomFamilyName.Table())["family_name"];
        let firstName = Helper.GetRandItem(TableClientRandomName.Table())["name"];

        return lastName + firstName;
    }

    private onBtnRand() {
        this.textContent.text = this.getRandomName();
    }

    private onBtnCancel() {
        this.onBtnClose();
    }

    private onBtnOK() {
        if (this.CB != null) this.CB(this.textContent.text, () => {
            this.close(UI.HIDE_TO_TOP);
        });
    }

    private onBtnClose() {
        if (this.CB != null) this.CB(undefined, null);
        this.close(UI.HIDE_TO_TOP);
    }

}

}