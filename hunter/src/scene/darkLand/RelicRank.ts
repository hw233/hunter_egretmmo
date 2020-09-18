namespace zj {
//RelicMain (遗迹探索)排行榜
//hexiaowei
// 2019/03/06
export class RelicRank extends Dialog {


    private listViewRank: eui.List;
    private groupMiRanking: eui.Group;
    private labelLevelRanking: eui.Label;
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private LabelName: eui.Label;
    private labelValue: eui.Label;
    private imageHurt: eui.Image;
    private buttonWorld: eui.Button;
    private buttonServer: eui.Button;
    private imageWorld: eui.Image;
    private imageServer: eui.Image;

    private buttonClose: eui.Button;

    public relicId: number;

    public rankType: number;

    private button: any;
    private rankMyCache = [];
    private rankCache = [];

    private selectedItem: eui.ArrayCollection;
    private selectedIndex: number = 0;

    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/RelicRankSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.buttonWorld.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonWorld, this);
        this.buttonServer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonServer, this);

        this.button = [this.buttonWorld, this.buttonServer];

        this.listViewRank.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListRankTap, this);

        this.inIt();
    }

    private inIt() {
        this.rankType = 1;
        this.setMyBaseInfo();
    }

    private setMyBaseInfo() {
        this.imgFrame.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picFrameId), this);
        this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);
        this.LabelName.text = Game.PlayerInfoSystem.BaseInfo.name;
        this.labelValue.text = "";

    }

    public setInfo(relicId) {
        this.relicId = relicId;
        this.setButtonState();
        this.relicRankInfo();
        this.buttonServer.visible
    }

    private setButtonState() {
        if (this.rankType == 1) {
            this.buttonWorld.visible = false;
            this.buttonWorld.enabled = false;
            this.imageWorld.visible = true;
            this.imageServer.visible = false;
            this.buttonServer.enabled = true;
            this.buttonServer.visible = true;
        } else {
            this.buttonWorld.visible = true;
            this.buttonWorld.enabled = true;
            this.imageWorld.visible = false;
            this.imageServer.visible = true;
            this.buttonServer.enabled = false;
            this.buttonServer.visible = false;

        }
        // for(const k in this.button){
        //      const v = this.button[k];
        //      if(Number( k) != (this.rankType - 1)){
        //          v.enabled = false;
        //          v.visible = false;
        //          this.imageWorld.visible = true;
        //      }
        //      v.enabled = Number( k) != this.rankType;
        // }
    }

    private setInfoListAndMy() {

        this.listViewRank.selectedIndex = 0; // 默认选中
        this.listViewRank.itemRenderer = RelicRankList;//
        this.selectedItem = new eui.ArrayCollection();
        for (const k in this.rankCache[this.rankType]) {
            const v = this.rankCache[this.rankType][k];
            let data = new RelicRankListData();
            data.index = Number(k);
            data.tableRankBase = v;
            data.father = this;
            this.selectedItem.addItem(data);
        }

        this.listViewRank.dataProvider = this.selectedItem;
        this.selectedIndex = this.listViewRank.selectedIndex;

        let hurtPic = UIConfig.UIConfig_DarkLand.relicHurtLevel2[PlayerDarkSystem.GetLevelByHurt(this.relicId, this.rankMyCache[this.rankType].value)];
        this.imageHurt.source = cachekey(hurtPic, this);
        let groupName = this.GetServerName(Game.Controller.selectedGroup().group_name);

        if (this.rankType == 1) {
            this.labelValue.text = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple,groupName[0],groupName[1] );
        }
        else {
            this.labelValue.text = Game.PlayerInfoSystem.BaseInfo.leagueName;
        }

        if (this.rankMyCache[this.rankType].rank == 0 || this.rankMyCache[this.rankType].rank >= 50) {
            this.labelLevelRanking.text = TextsConfig.TextsConfig_WonderlandBoss.disAttend;
        } else {
            this.labelLevelRanking.text = this.rankMyCache[this.rankType].rank;
        }
    }

    private relicRankInfo() {
        PlayerDarkSystem.GetServerRankInfo(this.relicId, this.rankType)
            .then((data: any) => {
                if (data.sign == 0) {
                    return;
                }
                if (data.body.rankInfo.length > 0) {
                    if (data.body.rankInfo[data.body.rankInfo.length - 1].baseInfo.id == Game.PlayerInfoSystem.BaseInfo.id) {
                        this.rankMyCache[this.rankType] = data.body.rankInfo[data.body.rankInfo.length - 1];
                    }
                }
                this.rankCache[this.rankType] = [];
                for (const k in data.body.rankInfo) {
                    const v = data.body.rankInfo[k];
                    if (v.value != 0 && Number(k) != (data.body.rankInfo.length - 1)) {
                        this.rankCache[this.rankType].push(v);
                    }
                }

                this.rankCache[this.rankType].sort(function (a: any, b: any) { return b.value - a.value });

                this.setInfoListAndMy()
            })
            .catch(reason => {  });
    }

    private onListRankTap(e: eui.ItemTapEvent) {
        let data = this.selectedItem.getItemAt(e.itemIndex);

        loadUI(RankDetail).then((ui: RankDetail) => {
            ui.setInfo(data.tableRankBase.baseInfo);
            ui.show(UI.SHOW_FILL_OUT);
        });
    }



    private onButtonWorld() {
        this.rankType = 1;
        if (this.rankCache[this.rankType] == null) {
            this.relicRankInfo();
        } else {
            this.setInfoListAndMy();
        }

        this.setButtonState();
    }


    private onButtonServer() {
        this.rankType = 2;
        if (this.rankCache[this.rankType] == null) {
            this.relicRankInfo();
        } else {
            this.setInfoListAndMy();
        }

        this.setButtonState();
    }

    private GetServerName(str: string) {
        if (str.indexOf("{") == -1) return str;
        let json = JSON.parse(str);
        if (!json) return "";
        let lang = Game.LanguageManager.getLang().replace("-", "").toLowerCase();
        if (json[lang] == null || json[lang] == undefined) return "";
        let arr = json[lang].split("&");
        if (arr && arr.length >= 2) return arr;
        return "";
    }





    private onButtonClose() {
        this.close();
    }


}

}