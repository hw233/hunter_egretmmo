namespace zj {
//ShopMainType
//wangshenzhuo、hexiaowei
// 2018/12/20
export class ShopMainType extends eui.ItemRenderer {
    private groupMain: eui.Group;
    public imgSpriteType: eui.Image;
    public imgSpriteLock: eui.Image;
    public imgSpriteTips: eui.Image;
    public imgSpriteNew: eui.Image;
    public imgSpriteType1: eui.Image;

    private index: number;
    public father: ShopMallDialog;
    private dateIndex: number = 1;

    private _COST_MALL = [
        message.EMallType.MALL_TYPE_ORDINARY,  //普通商店
        message.EMallType.MALL_TYPE_LADDER,  //竞技场商店
        message.EMallType.MALL_TYPE_LEAGUE,  //公会商店
        message.EMallType.MALL_TYPE_HONOR,  //荣誉商店
        message.EMallType.MALL_TYPE_LOTTERY,  //酒馆商店 
    ];

    public constructor() {
        super();
        this.skinName = "resource/skins/shop/ShopMainTypeSkin.exml";
        cachekeys(<string[]>UIResource["ShopMainType"], null);
        this.imgSpriteType1.visible = false;
        this.imgSpriteType.visible = false;
    }

    protected dataChanged() {
        this.dateIndex = this.data;
        if (Device.isReviewSwitch) {
            if (this.data == 3 || this.data == 4) {
                this.groupMain.scaleX = 0;
            } else if (this.data == 5) {
                this.groupMain.x = 18;
            }
        }
        this.imgSpriteNew.visible = false;
        this.imgSpriteType1.visible = false;
        this.imgSpriteType.visible = false;

        if (this.selected) {
            this.imgSpriteType1.visible = true;
            this.imgSpriteType.visible = false;
            this.imgSpriteType1.source = cachekey(UIConfig.UIConfig_Mall.name[this.data][2], this);
            let bLock = !this.GetOpen(this.data, false, true);
            this.imgSpriteLock.visible = bLock;
        }
        else {
            this.imgSpriteType.visible = true;
            this.imgSpriteType1.visible = false;
            this.imgSpriteType.source = cachekey(UIConfig.UIConfig_Mall.name[this.data][1], this);
            let bLock = !this.GetOpen(this.data, false, false);
            this.imgSpriteLock.visible = bLock;
        }
        //this.imgSpriteTips.visible = shopmall.GetTips(this.data);
        let time = Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LOTTERY, "MALL");
        if (time < 2 && this.data == message.EMallType.MALL_TYPE_LOTTERY) {
            this.imgSpriteNew.visible = true;
        }
        
        if (this.data == message.EMallType.MALL_TYPE_LOTTERY) {
            this.imgSpriteTips.visible = false;
        }
        
        this.SetInfoTips();
    }

    public SetInfoTips() {
        let bTips: boolean = ShopMainType.GetTips(this.data);
        this.imgSpriteTips.visible = bTips;

        let time2 = Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LEAGUE, "MALL");
        if (time2 > 3 && this.dateIndex == message.EMallType.MALL_TYPE_LEAGUE) {
            this.imgSpriteTips.visible = false;
        }
    }

    public static GetTips(index) {
        if (index == TableEnum.Enum.Mall.NORMAL) {
            return Tips.GetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_MALL);
        } else if (index == TableEnum.Enum.Mall.ARENA) {
            return true && PlayerMissionSystem.FunOpenTo(FUNC.ARENA) && Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_MALL)
        } else if (index == message.EMallType.MALL_TYPE_LEAGUE) {
            let bOpens: boolean = Game.PlayerInfoSystem.BaseInfo.leagueId > 0;
            return true && Game.PlayerInfoSystem.BaseInfo.leagueId != 0 && PlayerMissionSystem.FunOpenTo(FUNC.LEAGUE) && bOpens && Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_MALL)
        } else if (index == TableEnum.Enum.Mall.LOTTERY) {
            let time = Tips.GetSaveByMallNewProduct(message.EMallType.MALL_TYPE_HONOR)
            if (time < 3) {
                return false
            } else {
                return Tips.GetTipsOfId(Tips.TAG.TREAUSER, Tips.TAG.TREAUSER_MALL)
            }
        } else if (index == TableEnum.Enum.Mall.HONOR) {
            return true && PlayerMissionSystem.FunOpenTo(FUNC.PK) && Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.PK_MALL)
        }
        return true;
    }

    //判断商店是否达到解锁条件
    public GetOpen(index, bTips, isdown): boolean {
        if (index == TableEnum.Enum.Mall.NORMAL) {
            return true;
        } else if (index == TableEnum.Enum.Mall.ARENA) {
            return PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER, isdown);
        } else if (index == TableEnum.Enum.Mall.LEAGUE) {
            return true
                && PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE, isdown)
                && PlayerHunterSystem.LevelDBOpenLeague(bTips)
                && Game.PlayerInfoSystem.LeagueId != 0;
        } else if (index == TableEnum.Enum.Rank.CONTEND) {
            return PlayerHunterSystem.LevelDBFunOpenTo(message.EC.XG_OPENFUNCTION_CONTEND, isdown);
        } else if (index == TableEnum.Enum.Mall.LOTTERY) {
            return true;
        } else if (index == TableEnum.Enum.OneKeySell.Demon) {
            return PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON, isdown);
        } else if (index == TableEnum.Enum.Mall.HONOR) {
            return PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_SINGLE_CRAFT, isdown);
        }
    }

}

export class ShopMainTypedata {
    index: number;
    father: ShopMallDialog;;
}
}