namespace zj {
// CommonDesGeneral
// hexiaowei 
// 2018/12/5

export class CommonDesGeneral extends UI {
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private lbNameLv: eui.Label;
    private imgGrade: eui.Image;
    private groupStar: eui.Group;
    private imgType: eui.Image;
    private lbInfo: eui.Label;

    private id: number;

    public constructor() {
        super();
        this.skinName = "resource/skins/common/CommonDesGeneralSkin.exml";
    }

    public setInfo(id: number, count: number) {
        this.id = id;
        this.setInfoGeneral(id);
    }

    public setInfoGeneral(id: number) {
        let itemSet = PlayerItemSystem.Set(id);
        let hero = PlayerHunterSystem.Table(id);
        let strName = itemSet.Info["name"];
        let gnrInfo = PlayerHunterSystem.Table(id);
        let strDes = gnrInfo.extra;
        let strSkill = gnrInfo.des;
        let strInfo = Helper.StringFormat(TextsConfig.TextsConfig_Common.intrAndDes, strDes, strSkill);
        let pathType = UIConfig.UIConfig_General.hunter_type2[gnrInfo.features];

        this.imgFrame.source = cachekey(itemSet.Frame , this) ;
        if(Device.isReviewSwitch && Util.isWxMiniGame) {
            this.imgIcon.source = cachekey("wx_" + itemSet.Clip , this) ;
        }else{
            this.imgIcon.source = cachekey(itemSet.Clip , this) ;
        }
        
        this.lbNameLv.text = strName;
        this.lbInfo.text = strInfo;
        this.imgGrade.source = cachekey(UIConfig.UIConfig_General.hunter_grade[hero.aptitude] , this) ;
        this.imgType.source = cachekey(pathType , this) ;

        Helper.NodeStarByAlignLeft(this.groupStar, hero.init_star, CommonConfig.general_max_star, null, false, UIConfig.UIConfig_Role.heroAwakenStar[1]);
    }

    public reSetGeneral() {
        let info = Otherdb.MissionGeneral(this.id);
        if (info == null) {
            return;
        }

        Helper.NodeStarByAlignLeft(this.groupStar, info.star, CommonConfig.general_max_star, null, false, UIConfig.UIConfig_Role.heroAwakenStar[info.awaken_level + 1]);
        this.imgGrade.source = cachekey(UIConfig.UIConfig_General.hunter_grade[Game.PlayerHunterSystem.Table(this.id).aptitude] , this) ;
        this.imgFrame.source = cachekey(TableGeneralStep.Item(info.step).frame_path, this);  //table_general_ste , this) p

        this.lbNameLv.text = this.lbNameLv.$getText() + " Lv" + info.level;
    }
}

}