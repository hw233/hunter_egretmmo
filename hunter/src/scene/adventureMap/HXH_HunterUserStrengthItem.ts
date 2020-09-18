namespace zj {
//WantedSecondChooseItem
//wangshenzhuo
// 2019/02/20
export class HXH_HunterUserStrengthItem extends eui.ItemRenderer {

    public groupBuy: eui.Group;
    public labelBuyStrengthNum: eui.Label;
    public btnBuyStrengthNum: eui.Button;
    public groupBuyStrength: eui.Group;
    public labelBuyNum: eui.BitmapLabel;
    public groupUse: eui.Group;
    public groupItem: eui.Group;
    public labelPropName: eui.Label;
    public labelPropExp: eui.Label;
    public imgFrame: eui.Image;
    public imgIcon: eui.Image;
    public imgMask: eui.Image;
    public labelTextNum: eui.BitmapLabel;
    public btnAdd: eui.Button;
    public groupHead: eui.Group;

    public itemSet: any;
    public resType: any;
    public jewel: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/adventureMap/HXH_HunterUserStrengthItemSkin.exml";
        cachekeys(<string[]>UIResource["HXH_HunterUserStrengthItem"], null);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdd, this);
        this.btnBuyStrengthNum.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuyStrengthNum, this);

        this.groupHead.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            (this.data as HXH_HunterUserStrengthItemData).father.onItemTap(true, this.data);
        }, this);
        this.groupHead.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            (this.data as HXH_HunterUserStrengthItemData).father.onItemTap(false, this.data);
        }, this);
        if (Device.isReviewSwitch) {
            this.jewel.width = 40;
            this.jewel.height = 40;
            this.groupBuyStrength.y = 240;
        }
    }

    protected dataChanged() {
        this.SetInfo();
    }
    private SetInfo() {

        if (this.data.index < 3) {
            this.itemSet = PlayerItemSystem.Set(this.data.info.id);
            this.labelTextNum.text = PlayerItemSystem.Count(this.data.info.id).toString();
            this.labelPropName.text = this.data.info.name;
        } else {
            this.itemSet = PlayerItemSystem.Set(this.data.info.id, CommonConfig.role_buy_add_power);
            this.labelTextNum.text = CommonConfig.role_buy_add_power.toString();
            this.labelPropName.text = TextsConfig.TextsConfig_User.name_power;
        }

        this.imgIcon.source = cachekey(this.itemSet.Path, this);
        this.imgFrame.source = cachekey(this.itemSet.Frame, this);

        if (this.data.index < 3) {
            this.groupUse.visible = true;
            this.btnBuyStrengthNum.visible = false;
            if (this.itemSet.Count > 0) {
                this.btnAdd.enabled = true;
                this.imgMask.visible = false;
            } else {
                this.btnAdd.enabled = false;
                let path = UIConfig.UIConfig_Package.use[3];
                Set.ButtonBackgroud(this.btnAdd, path, path, path);
                this.imgMask.visible = true;
            }

            let resCost = this.data.info.power;
            this.groupBuyStrength.visible = false;
            this.labelBuyStrengthNum.visible = false;
            this.labelPropExp.text = Helper.StringFormat(TextsConfig.TextsConfig_Friend.getPower, resCost);
        } else {
            this.btnBuyStrengthNum.visible = true;
            this.groupUse.visible = false;
            this.labelBuyStrengthNum.visible = true;

            //剩余次数
            this.groupBuyStrength.visible = true;

            let time = PlayerVIPSystem.LowLevel().buy_power - Game.PlayerVIPSystem.vipInfo.buyPower;
            if (time == 0) {
                this.labelBuyStrengthNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_User.daytime_power1,
                    PlayerVIPSystem.LowLevel().buy_power - Game.PlayerVIPSystem.vipInfo.buyPower, PlayerVIPSystem.LowLevel().buy_power));
            } else {
                this.labelBuyStrengthNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_User.daytime_power2,
                    PlayerVIPSystem.LowLevel().buy_power - Game.PlayerVIPSystem.vipInfo.buyPower, PlayerVIPSystem.LowLevel().buy_power));
            }

            this.labelPropExp.text = Helper.StringFormat(TextsConfig.TextsConfig_Friend.getPower, CommonConfig.role_buy_add_power);
            this.labelBuyNum.text = CommonConfig.power_buy_token(Game.PlayerVIPSystem.vipInfo.buyPower).toString();
        }

    }

    //道具兑换体力值
    private onBtnAdd() {
        let goods = new message.GoodsInfo;
        // goods.def = null;
        goods.goodsId = this.data.info.id;
        goods.count = 1;
        goods.index = 0;
        goods.showType = 0;
        this.ReqGetMobsInfo(goods)
            .then((data: any) => {
                let resCost = this.data.info.power;
                let resType: any = PlayerItemSystem.UseOfResource(this.data.info.id);
                this.resType = resType;
                let str_Resource = "+" + resCost;
                this.SetInfo();
                Common_ShortMsg.promptBattleValue(str_Resource, resType, this.data.father.height);
                // TipManager.GetResource(str_Resource , resCost);
                // toast("体力值+" + str_Resource);
            })
            .catch(reason => { });
    }

    public ReqGetMobsInfo(goods) {
        return new Promise((resolve, reject) => {
            let request = new message.UsePropRequest();
            request.body.goodses = [goods];
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.UsePropResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    return;
                }
                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }

    //快速购买体力值
    private onBtnBuyStrengthNum() {
        this.BuyPower();

    }

    public BuyPower() {
        if (Game.PlayerInfoSystem.BaseInfo.vipLevel == PlayerVIPSystem.GetMaxLevel() && Game.PlayerVIPSystem.vipInfo.buyPower == PlayerVIPSystem.LowLevel().buy_power) {
            toast_warning(TextsConfig.TextsConfig_Error.buy_power_error);
        } else if (PlayerVIPSystem.LowLevel().buy_power > Game.PlayerVIPSystem.vipInfo.buyPower) {
            let str = Helper.StringFormat(TextsConfig.TextsConfig_User.buy_power, CommonConfig.power_buy_token(Game.PlayerVIPSystem.vipInfo.buyPower), CommonConfig.role_buy_add_power,
                PlayerVIPSystem.LowLevel().buy_power - Game.PlayerVIPSystem.vipInfo.buyPower, PlayerVIPSystem.LowLevel().buy_power);
            TipManager.ShowConfirmCancel(str, () => { this.ReqBuyPower_Visit2() })
        } else {
            if (Device.isVipOpen) {
                if (Device.isVipOpen) {
                    let str1 = Helper.StringFormat(TextsConfig.TextConfig_Instance.replenishPhysicalPower, Game.PlayerVIPSystem.vipInfo.buyPower, PlayerVIPSystem.LowLevel().buy_power);
                    TipManager.ShowConfirmCancel(str1, () => { this.GoPayMallScene() })
                } else {
                    let str = Helper.StringFormat(TextsConfig.TextConfig_Instance.errBuyPower, Game.PlayerVIPSystem.vipInfo.buyPower, PlayerVIPSystem.LowLevel().buy_power);
                    TipManager.ShowConfirmCancel(str, () => { this.GoPayMallScene() })
                }
            } else {
                toast_warning(TextsConfig.TextsConfig_Error.buy_power_error);
            }
        }
    }

    public GoPayMallScene() {
        // this.data.father.onBtnClose();

        loadUI(PayMallScene)
            .then((scene: PayMallScene) => {
                scene.show(UI.SHOW_FROM_TOP);
                scene.init();
            });
    }

    public ReqBuyPower_Visit2() {
        return new Promise((resolve, reject) => {
            let request = new message.BuyPowerRequest();
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.BuyPowerResponse>resp;
                console.log(response);
                if (response.header.result == message.EC.XG_POWER_BUY_LIMIT) {
                    if (Device.isVipOpen) {
                        let str = Helper.StringFormat(TextsConfig.TextConfig_Instance.errBuyPower, Game.PlayerVIPSystem.vipInfo.buyPower, PlayerVIPSystem.LowLevel().buy_power);
                        this.GoPayMallScene();
                        //---------------------------------   
                    } else {
                        toast_warning(TextsConfig.TextsConfig_Wanted.noTimes);
                    }
                } else if (response.header.result == message.EC.XG_LACK_TOKEN) {
                    let a = CommonConfig.power_buy_token(Game.PlayerVIPSystem.vipInfo.buyPower)
                    let b = Game.PlayerInfoSystem.Token;
                    if (Game.PlayerInfoSystem.Token < CommonConfig.power_buy_token(Game.PlayerVIPSystem.vipInfo.buyPower)) {
                        let str = TextsConfig.TextsConfig_Money.demstone;
                        TipManager.ShowConfirmCancel(str, () => { this.GoPayMallScene() })
                    } else {
                        this.GoPayMallScene();
                    }
                } else if (response.header.result == 0) {
                    let str_power = "+" + CommonConfig.role_buy_add_power;
                    let a = this.data.info.id;
                    let b = PlayerItemSystem.UseOfResource(this.data.info.id);
                    // toast_warning("str_power");
                    Common_ShortMsg.promptBattleValue(str_power, this.data.info.id, this.data.father.height);
                }
                // resolve(response);
                this.SetInfo();
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false, true);
            return;
        });
    }

}

//子项数据源
export class HXH_HunterUserStrengthItemData {
    index: number;
    father: HXH_HunterUserStrength;
    info: number;
    id: number;
}


}