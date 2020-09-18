namespace zj {
//  wangshenzhuo
//  2019-7-16
//  HXH_HunterTransformDetailsItem
export class HunterTransformDetailsItem extends Scene {

    public buttonClose: eui.Button;
    public labelDes: eui.Label;
    public imageHunterTransformName: eui.Image;
    public groupMain: eui.Group;
    public imageFrameHunter: eui.Image;
    public imageHunterIcon: eui.Image;
    public imageHunterBottom: eui.Image;
    public imageType1: eui.Image;
    public imageGrade: eui.Image;
    public imageType: eui.Image;
    public imageHunterName: eui.Image;
    public buttonTransform: eui.Button;
    public labelNumStoryBook: eui.Label;
    public groupStoryBook: eui.Group;
    public imageFrameStoryBook: eui.Image;
    public imageIconStoryBook: eui.Image;
    public imageAddStoryBook: eui.Image;
    public labelNumTransformCard: eui.Label;
    public groupTransformCard: eui.Group;
    public imageFrameTransformCard: eui.Image;
    public imageIconTransformCard: eui.Image;
    public imageAddTransformCard: eui.Image;
    public labelNumHunterMeterials: eui.Label;
    public imageFrameHunterMeterials: eui.Image;
    public imageIconHunterMeterials: eui.Image;
    public groupStart: eui.Group;
    public imageAddHunterMeterials: eui.Image;
    public imageTransLv: eui.Image;
    public labelLevel: eui.BitmapLabel;
    public listAttri1: eui.List;
    public listAttri2: eui.List;
    public groupHunterMeterials: eui.Group;


    public info;
    public costId: number;
    public cardId: number;
    public generalId: number;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/HunterTransformDetailsItemSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.groupStoryBook.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonStoryBook, this);
        this.groupTransformCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTransformCard, this);
        this.groupHunterMeterials.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHunterMeterials, this);
        this.buttonTransform.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonTransform , this);
    }

    public SetInfo(info) {
        if (info) {
            this.info = info;
            let baseInfo = Game.PlayerHunterSystem.Table(info.general_id);
            let picTbl = TableBaseGeneral.Table();
            let picRoleInfo = PlayerHunterSystem.MapInstance(info.transfer_role);
            if (baseInfo.aptitude) {
                this.imageGrade.source = cachekey(UIConfig.UIConfig_General.hunter_grade[baseInfo.aptitude], this);
                this.imageType1.source = cachekey(UIConfig.UIConfig_General.hunter_type1[baseInfo.type], this);
                this.imageType.source = cachekey(UIConfig.UIConfig_General.hunter_type2[baseInfo.features], this);
            }
            if (info.transfer_des && info.transfer_des != 0) {
                this.labelDes.text = info.transfer_des;
            }
            Helper.SetStar(this.groupStart , this.info.general_star , UIConfig.UIConfig_Role.heroAwakenStar[1] , 0.65 , 10);
            // Helper.NodeStarByAlignLeft(this.groupStart, this.info.general_star, CommonConfig.general_max_star, 0.65, false, UIConfig.UIConfig_Role.heroAwakenStar[1]);
            this.labelLevel.text = info.general_level;
            let path_aptitude = UIConfig.UIConfig_General.hunter_grade[Game.PlayerHunterSystem.Table(info.general_id).aptitude];
            this.imageTransLv.source = cachekey(path_aptitude, this);
            this.imageHunterBottom.source = cachekey(info.transfer_board, this);
            this.imageFrameHunter.source = cachekey(info.transfer_floor, this);
            this.imageHunterName.source = cachekey(info.name_pic, this);
            this.imageHunterTransformName.source = cachekey(info.name_pic, this);
            this.imageHunterIcon.source = cachekey(picRoleInfo.half_path, this);
        }
        this.createAttItems();
        this.createSkills();
        this.setConsume();
    }

    private createAttItems() {
        this.listAttri1.itemRenderer = HunterTransformDetailsItemItem;
        let listItem = new eui.ArrayCollection();

        for (let i = 0; i < 4; i++) {
            let data = new HunterTransformDetailsItemItemData();
            if (i == 0) {
                data.index = i;
                data.info = this.info.general_hp[0];
            } else if (i == 1) {
                data.index = i;
                data.info = this.info.general_atk[0];
            } else if (i == 2) {
                data.index = i;
                data.info = this.info.skill_atk[0];
            } else {
                data.index = i;
                data.info = this.info.skill_def[0];
            }
            data.father = this;
            listItem.addItem(data);
        }

        this.listAttri1.dataProvider = listItem;
    }

    private createSkills() {
        if (this.info) {
            this.listAttri2.itemRenderer = HunterTransformDetailsItemItemRight;
            let listItem = new eui.ArrayCollection();
            listItem.addItem(this.info);
            this.listAttri2.dataProvider = listItem;
        }
    }

    public setConsume() {
        if (this.info) {
            let count11 = 0;
            let str_count = Helper.StringFormat("%d/%d", 0, 0);
            for (let i = 0; i < 3; i++) {
                if (this.info.consume_goods[i]) {
                    let itemSet = PlayerItemSystem.Set(this.info.consume_goods[i][0]);
                    count11 = this.info.consume_goods[i][1];
                    str_count = Helper.StringFormat("%d/%d", itemSet.Count, count11);
                    if (i == 0) {
                        this.costId = itemSet.Info["id"];
                        this.labelNumStoryBook.text = str_count;
                        this.imageIconStoryBook.source = cachekey(itemSet["Path"], this);
                        Set.LabelNumberGreenAndRed(this.labelNumStoryBook, itemSet.Count, count11);
                        if (itemSet.Count >= count11) {
                            this.imageAddStoryBook.visible = false;
                        } else {
                            this.imageAddStoryBook.visible = true;
                        }
                    } else if (i == 1) {
                        this.cardId = itemSet.Info["id"];
                        this.labelNumTransformCard.text = str_count;
                        this.imageIconTransformCard.source = cachekey(itemSet["Path"], this);
                        Set.LabelNumberGreenAndRed(this.labelNumTransformCard, itemSet.Count, count11);
                        if (itemSet.Count >= count11) {
                            this.imageAddTransformCard.visible = false;
                        } else {
                            this.imageAddTransformCard.visible = true;
                        }
                    } else {
                        count11 = 1;
                        if (PlayerHunterSystem.transformSel != 1) {
                            itemSet.Count = 1;
                        } else {
                            itemSet.Count = 0;
                        }
                        str_count = Helper.StringFormat("%d/%d", itemSet.Count, count11);
                        this.generalId = this.info.general_id;
                        this.labelNumHunterMeterials.text = str_count;
                        this.imageIconHunterMeterials.source = cachekey(itemSet["Path"], this);
                        Set.LabelNumberGreenAndRed(this.labelNumHunterMeterials, itemSet.Count, count11);
                        if (itemSet.Count >= count11) {
                            this.imageAddHunterMeterials.visible = false;
                        } else {
                            this.imageAddHunterMeterials.visible = true;
                        }
                    }
                } else {
                    count11 = 1;
                    let itemSets = new message.GoodsInfo;
                    if (PlayerHunterSystem.transformSel != 1) {
                        itemSets.count = 1;
                    } else {
                        itemSets.count = 0;
                    }
                    str_count = Helper.StringFormat("%d/%d", itemSets.count, count11);
                    this.generalId = this.info.general_id;
                    this.labelNumHunterMeterials.text = str_count;
                    let iconTab = TableItemPic.Table();
                    let info_gnr = PlayerHunterSystem.Table(this.generalId);
                    let info_map = TableMapRole.Item(info_gnr.general_roleId);
                    let path_head = info_map.head_path;
                    this.imageIconHunterMeterials.source = path_head;
                    Set.LabelNumberGreenAndRed(this.labelNumHunterMeterials, itemSets.count, count11);
                    if (itemSets.count >= count11) {
                        this.imageAddHunterMeterials.visible = false;
                    } else {
                        this.imageAddHunterMeterials.visible = true;
                    }
                }
            }
        }
    }

    private onButtonStoryBook() {
        loadUI(Common_OutPutDialog)
            .then((dialog: Common_OutPutDialog) => {
                dialog.setInfo(this.costId, this);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onButtonTransformCard() {
        loadUI(Common_OutPutDialog)
            .then((dialog: Common_OutPutDialog) => {
                dialog.setInfo(this.cardId, this);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onButtonHunterMeterials() {
        let newGeneralId = PlayerHunterSystem.replaceGeneralID(this.info.general_id);
        loadUI(HunterTransformSkillPop)
            .then((popDialog: HunterTransformSkillPop) => {
                popDialog.SetInfo(this.info.general_id,this.info.general_id,this.info ,this);
                popDialog.show(UI.SHOW_FROM_TOP);
            })
    }

    private onButtonTransform() {
        if (this.info) {
            let newGeneralId = PlayerHunterSystem.replaceGeneralID(this.info.general_id);
            let generalId = PlayerHunterSystem.transformSel;
            HunterTransformDetailsItem.GeneralTransferReq(generalId).then((data: message.GeneralTransferResponse) => {
                loadUI(CommonGetGeneral).then((dialog: CommonGetGeneral) => {
                    dialog.setInfo(data.body.gameInfo.generals[0].general_id, 0, () => {
                        this.setConsume();
                    });
                    dialog.show(UI.SHOW_FILL_OUT);
                    PlayerHunterSystem.transformSel = 1;
                    
                })
            }).catch((reason) => { });
        }
    }

    public static GeneralTransferReq(generalId: number) {
        return new Promise((resolve, reject) => {
            let request = new message.GeneralTransferRequest();
            request.body.generalId = generalId;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.GeneralTransferResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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

    private onButtonClose() {
        this.info = null;
        PlayerHunterSystem.transformSel = 1;
        this.close(UI.HIDE_TO_TOP);
    }

}
}