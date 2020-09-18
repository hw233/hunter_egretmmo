namespace zj {
// 星耀福利 HXH_VipMain
// lizhengqiang
// 20190509
export class VipMain extends Scene {
    private imgBackground: eui.Image;
    private groupMain: eui.Group;
    private lbNeed: eui.Label;
    private imgVipNext: eui.Image;
    private groupExp: eui.Group;
    private imgExpNull: eui.Image;
    private imgExp: eui.Image;
    private lbPay: eui.Label;
    private imgVip: eui.Image;
    private btnPay: eui.Button;
    private imgTips6: eui.Image;
    private imgPay: eui.Image;
    private btnGift: eui.Button;
    private imgTips1: eui.Image;
    private btnRights: eui.Button;
    private imgTips2: eui.Image;
    private btnMall: eui.Button;
    private imgTips3: eui.Image;
    private groupKeFu: eui.Group;
    private lbDes: eui.Label;
    private lbKefu: eui.Label;
    private groupButton: eui.Group;
    private btnSelLeft: eui.Button;
    private btnSelRight: eui.Button;
    private groupGift: eui.Group;
    private groupGiftLeft: eui.Group;
    private imgGiftLevel1: eui.Image;
    private imgAwardIcon1: eui.Image;
    private imgTimes1: eui.Image;
    private imgDontHaveLeft: eui.Image;
    private btnGetLeft: eui.Button;
    private groupGiftRight: eui.Group;
    private imgGiftLevel2: eui.Image;
    private imgAwardIcon2: eui.Image;
    private imgTimes2: eui.Image;
    private imgDontHaveRight: eui.Image;
    private btnGetRight: eui.Button;
    private groupRight: eui.Group;
    private groupRightLeft: eui.Group;
    private imgVipLevel1: eui.Image;
    private groupAuraBack1: eui.Group;
    private groupHunter1: eui.Group;
    private groupAuraFront1: eui.Group;
    private imgYIncang1: eui.Image;
    private btnSee1: eui.Button;
    private imgTips4: eui.Image;
    private groupAuraProperty1: eui.Group;
    private lbAuraProperty1: eui.Label;
    private imgDontHaveLeft1: eui.Image;
    private imgDontHaveLeft2: eui.Image;
    private btnUseAura1: eui.Button;
    private btnUseAura2: eui.Button;
    private groupHeadLeft1: eui.Group;
    private imgHeadLeft1: eui.Image;
    private imgFrameLeft1: eui.Image;
    private groupHeadLeft2: eui.Group;
    private imgHeadLeft2: eui.Image;
    private imgFrameLeft2: eui.Image;
    private groupRightRight: eui.Group;
    private imgVipLevel2: eui.Image;
    private groupAuraBack2: eui.Group;
    private groupHunter2: eui.Group;
    private groupAuraFront2: eui.Group;
    private imgYIncang2: eui.Image;
    private btnSee2: eui.Button;
    private imgTips5: eui.Image;
    private groupAuraProperty2: eui.Group;
    private lbAuraProperty2: eui.Label;
    private imgDontHaveRight1: eui.Image;
    private imgDontHaveRight2: eui.Image;
    private btnUseAura3: eui.Button;
    private btnUseAura4: eui.Button;
    private groupHeadRight1: eui.Group;
    private imgHeadRight1: eui.Image;
    private imgFrameRight1: eui.Image;
    private groupHeadRight2: eui.Group;
    private imgIconRight2: eui.Image;
    private imgFrameRight2: eui.Image;
    private groupMall: eui.Group;
    private lstViewItem: eui.List;
    private groupTitle: eui.Group;
    private groupBgAni: eui.Group;
    private imgName: eui.Image;
    private btnClose: eui.Button;

    private BUTTON: { "GIFT": number, "RIGHT": number, "MALL": number } = {
        "GIFT": 1, // 特权
        "RIGHT": 2, // 回馈
        "MALL": 3, // 商城
    };
    private MAX: number = 7;

    private rectMask: eui.Image;
    private tween: egret.tween.TweenGroup;
    private allProducts: Array<MyProductInfo> = [];
    private index: number;
    private id: number;
    private levelCur: number;

    private isFirstGift: boolean = false;

    public constructor() {
        super();
        this.skinName = "resource/skins/vip/VipMainSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPay, this);

        this.btnGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGift, this);
        this.btnSelLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelLeft, this);
        this.btnSelRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelRight, this);
        this.btnGetLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetLeft, this);
        this.btnGetRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetRight, this);

        this.btnRights.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRights, this);
        this.btnSee1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSee1, this);
        this.btnSee1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSee1Begin, this);
        this.btnSee1.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnSee1, this);
        this.btnSee2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSee2, this);
        this.btnSee2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSee2Begin, this);
        this.btnSee2.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnSee2, this);
        this.btnUseAura1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUseAura1, this);
        this.btnUseAura2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUseAura2, this);
        this.btnUseAura3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUseAura3, this);
        this.btnUseAura4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUseAura4, this);

        this.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMall, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            if (this.tween) this.tween.stop();
            Game.EventManager.off(GameEvent.PLAYER_TOKEN_CHANGE, this.setInfo, this);
            Game.EventManager.off(GameEvent.ON_ABOVE_POP, this.onAbovePop, this);
        }, null);
    }

    public init() {
        this.imgName.source = cachekey(UIConfig.UIConfig_VipMall.WordsTips, this);
        this.groupBgAni.removeChildren();
        Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", null, 0).then(display => {
            this.groupBgAni.addChild(display);
        }).catch(reason => {
            toast(reason);
        });
        this.tween.items[0].props = { loop: true };
        this.tween.play();

        this.rectMask = Util.getMaskImgBlack(this.imgExp.width, this.imgExp.height);
        this.rectMask.verticalCenter = 0;
        this.rectMask.left = 7;
        this.rectMask.visible = false;
        this.groupExp.addChild(this.rectMask);

        this.loadPayProducts();
        this.index = 1;

        // this.imgPay.visible = (Game.PlayerPaySystem.webPayUrl != "" || Game.PlayerPaySystem.customerInfo.customerWeb != "");
        this.imgPay.visible = false;

        let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
        let chargeList = [];
        for (const v of Object.keys(tbl)) {
            if (Game.PlayerInfoSystem.BaseInfo.chargeToken >= tbl[v].sum) {
                chargeList.push(tbl[v]);
            }
        }
        this.id = chargeList.length - 1;
        this.levelCur = 0;
        this.setInfo();
        this.setList();
        this.setTips();

        Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.setInfo, this);
        Game.EventManager.on(GameEvent.ON_ABOVE_POP, this.onAbovePop, this);
    }

    private setTips() {
        let showTips2 = Tips.tips_Vip_get(this.BUTTON.RIGHT);
        let showTips3 = Tips.tips_Vip_get(this.BUTTON.MALL);
        this.imgTips1.visible = Tips.GetTipsOfId(Tips.TAG.VIPX, Tips.TAG.VipX_Right);
        this.imgTips2.visible = showTips2;
        this.imgTips3.visible = showTips3;

        // this.imgTips6.visible = Tips.GetTipsOfId(Tips.TAG.VIPX, Tips.TAG.VipX_WebPay);
        this.imgTips6.visible = false;
    }

    private checkMaxLevel(){
        let tbl = TableLicenceWeal.Table();
        this.MAX = 0;
        for(let key in tbl){
            this.MAX = Math.max(this.MAX, tbl[key].level);
        }
    }

    private setInfo() {
        this.checkMaxLevel();
        let levelBefor: number = this.levelCur;
        let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
        let chargeList = [];
        for (const v of Object.keys(tbl)) {
            if (Game.PlayerInfoSystem.BaseInfo.chargeToken >= tbl[v].sum) {
                chargeList.push(tbl[v]);
            }
        }
        this.levelCur = chargeList.length - 1;

        if (this.levelCur != this.MAX) {
            this.imgVipNext.visible = true;
            this.lbNeed.visible = true;
            // 当前星耀等级名称
            this.imgVip.source = cachekey(UIConfig.UIConfig_VipMall.vipLevel[this.levelCur - 1], this);
            // 下一星耀等级名称
            this.imgVipNext.source = cachekey(UIConfig.UIConfig_VipMall.vipLevel[this.levelCur + 1 - 1], this);
            // 需要充值
            this.lbNeed.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.vipMoney, (tbl[this.levelCur + 1].sum - Game.PlayerInfoSystem.BaseInfo.chargeToken) / 10);
        } else {
            this.imgVip.source = cachekey(UIConfig.UIConfig_VipMall.vipLevel[this.levelCur - 1], this);
            this.imgVipNext.visible = false;
            this.lbNeed.text = TextsConfig.TextsConfig_Common.expMax;
        }

        // 充值进度条
        let percent: number = 0;
        if (this.levelCur != this.MAX) {
            percent = (Game.PlayerInfoSystem.BaseInfo.chargeToken - tbl[this.levelCur].sum) / Number(tbl[this.levelCur].charge);
            this.lbPay.text = (Game.PlayerInfoSystem.BaseInfo.chargeToken / 10 + "/" + (Number(tbl[this.levelCur].charge) + tbl[this.levelCur].sum) / 10);
        } else {
            percent = Game.PlayerInfoSystem.BaseInfo.chargeToken / tbl[this.levelCur].sum;
            this.lbPay.text = (Game.PlayerInfoSystem.BaseInfo.chargeToken / 10 + "/" + tbl[this.levelCur].sum / 10);
        }

        if (percent > 1) {
            percent = 1;
        }

        this.rectMask.visible = true;
        this.rectMask.width = this.imgExp.width * percent;
        this.imgExp.mask = this.rectMask;

        // 客服
        // if (Game.PlayerPaySystem.customerInfo.customerName != "") {
        //     this.lbKefu.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.kefu,
        //         Game.PlayerPaySystem.customerInfo.customerName,
        //         Game.PlayerPaySystem.customerInfo.customerQQ,
        //         Game.PlayerPaySystem.customerInfo.customerWeichat
        //     );
        // } else {
        //     this.lbKefu.visible = false;
        //     this.lbDes.visible = false;
        // }

        if (this.levelCur > levelBefor && this.index == this.BUTTON.MALL) {
            this.onAbovePop();
        }

        if (this.levelCur > levelBefor) {
            this.id = this.levelCur;

            this.setList();
        }
    }

    private setList() {
        let i: number = this.index;
        let level = this.id; // 当前星耀等级
        let haloBack = null;
        let haloFront = null;
        let haloBackRight = null;
        let haloFrontRight = null;

        if (i == this.BUTTON.RIGHT) {// 特权
            let info = TableItemPicFrame.Table();// StringConfig_Table.itemFrame
            let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
            this.imgYIncang1.visible = false;
            this.imgYIncang2.visible = false;

            if (this.id != this.MAX) {
                haloBack = PlayerVIPSystem.HaloItem(tbl[this.id].halo_id).halo_back_aniId;
                haloFront = PlayerVIPSystem.HaloItem(tbl[this.id].halo_id).halo_front_aniId
                haloBackRight = PlayerVIPSystem.HaloItem(tbl[this.id + 1].halo_id).halo_back_aniId;
                haloFrontRight = PlayerVIPSystem.HaloItem(tbl[this.id + 1].halo_id).halo_front_aniId;
            } else {
                haloBack = PlayerVIPSystem.HaloItem(tbl[this.id - 1].halo_id).halo_back_aniId;
                haloFront = PlayerVIPSystem.HaloItem(tbl[this.id - 1].halo_id).halo_front_aniId;
                haloBackRight = PlayerVIPSystem.HaloItem(tbl[this.id].halo_id).halo_back_aniId;
                haloFrontRight = PlayerVIPSystem.HaloItem(tbl[this.id].halo_id).halo_front_aniId;
            }

            let path = "";
            let pathNext = "";
            if (this.id != this.MAX) {
                path = Table.FindV(info, tbl[level].picFrame_id)["path"];
                pathNext = Table.FindV(info, tbl[level + 1].picFrame_id)["path"];
            } else {
                path = Table.FindV(info, tbl[level - 1].picFrame_id)["path"];
                pathNext = Table.FindV(info, tbl[level].picFrame_id)["path"];
            }

            this.groupRight.visible = true;
            this.groupButton.visible = true;
            this.groupGift.visible = false;
            this.groupMall.visible = false;
            this.groupAuraProperty1.visible = false;
            this.groupAuraProperty2.visible = false;

            let mapRoleId = PlayerVIPSystem.GetMapRoleInfo(Game.PlayerInfoSystem.BaseInfo);
            let bodySpxId = TableMapRole.Item(mapRoleId).body_spx_id;
            let scale = TableMapRole.Item(mapRoleId).spine_scale;
            let dbName = TableClientFightAniSpineSource.Item(bodySpxId).atlas;
            let animation = TableClientFightAniSpineSource.Item(bodySpxId).ani_name;

            this.groupHunter1.scaleX = 0.7;
            this.groupHunter1.scaleY = 0.7;
            this.groupHunter1.removeChildren();
            Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", animation, 0).then(display => {
                display.scaleX = scale;
                display.scaleY = scale;
                this.groupHunter1.addChild(display);
            }).catch(reason => {
                toast(reason);
            });

            this.groupHunter2.scaleX = 0.7;
            this.groupHunter2.scaleY = 0.7;
            this.groupHunter2.removeChildren();
            Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", animation, 0).then(display => {
                display.scaleX = scale;
                display.scaleY = scale;
                this.groupHunter2.addChild(display);
            }).catch(reason => {
                toast(reason);
            });

            let getAinmationInfo = (id: number): [string, number] => {
                let aniUi = TableClientAniUi.Item(id);
                let cssSource = TableClientAniCssSource.Item(aniUi.css_id);
                return [cssSource.name + "_" + cssSource.number, aniUi.index];
            };

            this.groupAuraBack1.removeChildren();
            this.groupAuraFront1.removeChildren();
            let back1 = getAinmationInfo(haloBack);
            let front1 = getAinmationInfo(haloFront);
            Game.DragonBonesManager.playAnimation(this, back1[0], "armatureName", back1[1], 0).then(display => {
                this.groupAuraBack1.addChild(display);
            }).catch(reason => {
                toast(reason);
            });
            Game.DragonBonesManager.playAnimation(this, front1[0], "armatureName", front1[1], 0).then(display => {
                this.groupAuraFront1.addChild(display);
            }).catch(reason => {
                toast(reason);
            });

            this.groupAuraBack2.removeChildren();
            this.groupAuraFront2.removeChildren();
            let back2 = getAinmationInfo(haloBackRight);
            let front2 = getAinmationInfo(haloFrontRight);
            Game.DragonBonesManager.playAnimation(this, back2[0], "armatureName", back2[1], 0).then(display => {
                this.groupAuraBack2.addChild(display);
            }).catch(reason => {
                toast(reason);
            });
            Game.DragonBonesManager.playAnimation(this, front2[0], "armatureName", front2[1], 0).then(display => {
                this.groupAuraFront2.addChild(display);
            }).catch(reason => {
                toast(reason);
            });


            if (this.id != this.MAX) {
                this.imgVipLevel1.source = cachekey(UIConfig.UIConfig_VipMall.vipLevel[level - 1], this);
                this.imgHeadLeft1.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);
                this.imgFrameLeft2.source = cachekey(path, this);
                this.imgHeadLeft2.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);

                this.imgVipLevel2.source = cachekey(UIConfig.UIConfig_VipMall.vipLevel[level], this);
                this.imgHeadRight1.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);
                this.imgFrameRight2.source = cachekey(pathNext, this);
                this.imgIconRight2.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);
            } else {
                this.imgVipLevel1.source = cachekey(UIConfig.UIConfig_VipMall.vipLevel[level - 2], this);
                this.imgHeadLeft1.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);
                this.imgFrameLeft2.source = cachekey(path, this);
                this.imgHeadLeft2.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);

                this.imgVipLevel2.source = cachekey(UIConfig.UIConfig_VipMall.vipLevel[level - 1], this);
                this.imgHeadRight1.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);
                this.imgFrameRight2.source = cachekey(pathNext, this);
                this.imgIconRight2.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);
            }

            let path1: string[] = UIConfig.UIConfig_VipMall.buttonUse;
            let pathFrame: string[] = UIConfig.UIConfig_VipMall.buttonUseFrame;
            let userCancle: string[] = UIConfig.UIConfig_VipMall.buttonUseCancel;

            if (this.levelCur != this.MAX && this.levelCur >= this.id && this.levelCur < this.id + 1) {
                this.btnUseAura1.visible = true;
                this.btnUseAura2.visible = true;
                this.btnUseAura3.visible = false;
                this.btnUseAura4.visible = false;
                this.imgDontHaveLeft1.visible = false;
                this.imgDontHaveLeft2.visible = false;
                this.imgDontHaveRight1.visible = true;
                this.imgDontHaveRight2.visible = true;
                // 判断光环按钮状态（取消/使用）
                if (Game.PlayerInfoSystem.BaseInfo.haloId == tbl[this.id].halo_id) {
                    Set.ButtonBackgroud(this.btnUseAura1, userCancle[0], userCancle[1], userCancle[1]);
                    this.imgYIncang1.visible = true;
                } else {
                    Set.ButtonBackgroud(this.btnUseAura1, path1[0], path1[1], path1[1]);
                }
                //判断头像框按钮状态（取消/使用）
                if (Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[this.id].picFrame_id) {
                    Set.ButtonBackgroud(this.btnUseAura2, pathFrame[0], pathFrame[1], pathFrame[1]);
                } else {
                    Set.ButtonBackgroud(this.btnUseAura2, userCancle[0], userCancle[1], userCancle[1]);
                }
            } else if (this.levelCur >= this.id + 1) {
                this.btnUseAura1.visible = true;
                this.btnUseAura2.visible = true;
                this.btnUseAura3.visible = true;
                this.btnUseAura4.visible = true;
                this.imgDontHaveLeft1.visible = false;
                this.imgDontHaveLeft2.visible = false;
                this.imgDontHaveRight1.visible = false;
                this.imgDontHaveRight2.visible = false;

                if (Game.PlayerInfoSystem.BaseInfo.haloId == tbl[this.id].halo_id) {
                    Set.ButtonBackgroud(this.btnUseAura1, userCancle[0], userCancle[1], userCancle[1]);
                    this.imgYIncang1.visible = true;
                } else {
                    Set.ButtonBackgroud(this.btnUseAura1, path1[0], path1[1], path1[1]);
                }

                if (Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[this.id].picFrame_id) {
                    Set.ButtonBackgroud(this.btnUseAura2, pathFrame[0], pathFrame[1], pathFrame[1]);
                } else {
                    Set.ButtonBackgroud(this.btnUseAura2, userCancle[0], userCancle[1], userCancle[1]);
                }

                if (Game.PlayerInfoSystem.BaseInfo.haloId == tbl[this.id + 1].halo_id) {
                    Set.ButtonBackgroud(this.btnUseAura3, userCancle[0], userCancle[1], userCancle[1]);
                    this.imgYIncang2.visible = true;
                } else {
                    Set.ButtonBackgroud(this.btnUseAura3, path1[0], path1[1], path1[1]);
                }

                if (Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[this.id + 1].picFrame_id) {
                    Set.ButtonBackgroud(this.btnUseAura4, pathFrame[0], pathFrame[1], pathFrame[1]);
                } else {
                    Set.ButtonBackgroud(this.btnUseAura4, userCancle[0], userCancle[1], userCancle[1]);
                }
            } else if (this.levelCur == this.MAX) {
                this.btnUseAura1.visible = true;
                this.btnUseAura2.visible = true;
                this.btnUseAura3.visible = true;
                this.btnUseAura4.visible = true;
                this.imgDontHaveLeft1.visible = false;
                this.imgDontHaveLeft2.visible = false;
                this.imgDontHaveRight1.visible = false;
                this.imgDontHaveRight2.visible = false;

                if (Game.PlayerInfoSystem.BaseInfo.haloId == tbl[this.id - 1].halo_id) {
                    Set.ButtonBackgroud(this.btnUseAura1, userCancle[0], userCancle[1], userCancle[1]);
                    this.imgYIncang1.visible = true;
                } else {
                    Set.ButtonBackgroud(this.btnUseAura1, path1[0], path1[1], path1[1]);
                }

                if (Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[this.id - 1].picFrame_id) {
                    Set.ButtonBackgroud(this.btnUseAura2, pathFrame[0], pathFrame[1], pathFrame[1]);
                } else {
                    Set.ButtonBackgroud(this.btnUseAura2, userCancle[0], userCancle[1], userCancle[1]);
                }

                if (Game.PlayerInfoSystem.BaseInfo.haloId == tbl[this.id].halo_id) {
                    Set.ButtonBackgroud(this.btnUseAura3, userCancle[0], userCancle[1], userCancle[1]);
                    this.imgYIncang2.visible = true;
                } else {
                    Set.ButtonBackgroud(this.btnUseAura3, path1[0], path1[1], path1[1]);
                }

                if (Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[this.id].picFrame_id) {
                    Set.ButtonBackgroud(this.btnUseAura4, pathFrame[0], pathFrame[1], pathFrame[1]);
                } else {
                    Set.ButtonBackgroud(this.btnUseAura4, userCancle[0], userCancle[1], userCancle[1]);
                }
            } else {
                this.btnUseAura1.visible = false;
                this.btnUseAura2.visible = false;
                this.btnUseAura3.visible = false;
                this.btnUseAura4.visible = false;
                this.imgDontHaveLeft1.visible = true;
                this.imgDontHaveLeft2.visible = true;
                this.imgDontHaveRight1.visible = true;
                this.imgDontHaveRight2.visible = true;
            }
        } else if (i == this.BUTTON.GIFT) {// 回馈
            let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
            if (!this.isFirstGift) {
                let len = this.id;
                for (let j = len; j > 0; j--) {
                    if (!Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward, (k, v) => {
                        return v == tbl[j].reward_index;
                    })) {
                        this.id = j;
                        level = j;
                        this.isFirstGift = true;
                        break;
                    }
                }
            }

            this.groupRight.visible = false;
            this.groupButton.visible = true;
            this.groupGift.visible = true;
            this.groupMall.visible = false;
            let path: string[] = UIConfig.UIConfig_VipMall.Get;
            if (this.id != this.MAX) {
                this.imgGiftLevel1.source = cachekey(UIConfig.UIConfig_VipMall.vipLevel[level - 1], this);
                this.imgAwardIcon1.source = cachekey(UIConfig.UIConfig_VipMall.vipAward[level - 1], this);

                this.imgGiftLevel2.source = cachekey(UIConfig.UIConfig_VipMall.vipLevel[level + 1 - 1], this);
                this.imgAwardIcon2.source = cachekey(UIConfig.UIConfig_VipMall.vipAward[level + 1 - 1], this);
            } else {
                this.imgGiftLevel1.source = cachekey(UIConfig.UIConfig_VipMall.vipLevel[level - 1 - 1], this);
                this.imgAwardIcon1.source = cachekey(UIConfig.UIConfig_VipMall.vipAward[level - 1 - 1], this);

                this.imgGiftLevel2.source = cachekey(UIConfig.UIConfig_VipMall.vipLevel[level - 1], this);
                this.imgAwardIcon2.source = cachekey(UIConfig.UIConfig_VipMall.vipAward[level - 1], this);
            }

            let getLevelAward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward, (k, v) => {
                return v == tbl[this.id].reward_index;
            });

            let getLevelNext: boolean = false;
            if (this.id != this.MAX) {
                getLevelNext = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward, (k, v) => {
                    return v == tbl[this.id + 1].reward_index;
                });
            }

            let getLevelBefore: boolean = false;
            if (this.id != 1) {
                getLevelBefore = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward, (k, v) => {
                    return v == tbl[this.id - 1].reward_index;
                });
            }

            if (this.levelCur != this.MAX && this.levelCur >= this.id && this.levelCur < this.id + 1) {
                this.btnGetLeft.visible = true;
                this.btnGetRight.visible = false;
                this.imgDontHaveLeft.visible = false;
                this.imgDontHaveRight.visible = true;

                if (getLevelAward) {
                    Set.ButtonBackgroud(this.btnGetLeft, path[0], path[0], path[0]);
                } else {
                    Set.ButtonBackgroud(this.btnGetLeft, path[1], path[2], path[2]);
                }
            } else if (this.levelCur >= this.id + 1) {
                this.btnGetLeft.visible = true;
                this.btnGetRight.visible = true;
                this.imgDontHaveLeft.visible = false;
                this.imgDontHaveRight.visible = false;

                if (getLevelAward) {
                    Set.ButtonBackgroud(this.btnGetLeft, path[0], path[0], path[0]);
                } else {
                    Set.ButtonBackgroud(this.btnGetLeft, path[1], path[2], path[2]);
                }

                if (getLevelNext) {
                    Set.ButtonBackgroud(this.btnGetRight, path[0], path[0], path[0]);
                } else {
                    Set.ButtonBackgroud(this.btnGetRight, path[1], path[2], path[2]);
                }

            } else if (this.levelCur == this.MAX) {
                this.btnGetLeft.visible = true;
                this.btnGetRight.visible = true;
                this.imgDontHaveLeft.visible = false;
                this.imgDontHaveRight.visible = false;

                if (getLevelBefore) {
                    Set.ButtonBackgroud(this.btnGetLeft, path[0], path[0], path[0]);
                } else {
                    Set.ButtonBackgroud(this.btnGetLeft, path[1], path[2], path[2]);
                }

                if (getLevelAward) {
                    Set.ButtonBackgroud(this.btnGetRight, path[0], path[0], path[0]);
                } else {
                    Set.ButtonBackgroud(this.btnGetRight, path[1], path[2], path[2]);
                }
            } else {
                this.btnGetLeft.visible = false;
                this.btnGetRight.visible = false;
                this.imgDontHaveLeft.visible = true;
                this.imgDontHaveRight.visible = true;
            }

        } else if (i == this.BUTTON.MALL) {// 商城
            this.groupRight.visible = false;
            this.groupButton.visible = false;
            this.groupGift.visible = false;
            this.groupMall.visible = true;
            this.lstViewItem.visible = true;

            let giftList = [[], []];
            let list = [];
            giftList[0] = PlayerGiftSystem.SortVipX(Game.PlayerGiftSystem.giftInfos);
            giftList[1] = PlayerGiftSystem.Trigger();
            for (const v of giftList) {
                if (v == undefined) continue;
                for (const vv of v) {
                    list.push(vv);
                }
            }

            let arrCollection = new eui.ArrayCollection();
            let i: number = 1;
            for (const v of list) {
                arrCollection.addItem({ id: i, info: v, father: this, level: this.levelCur });
                i = i + 1;
            }
            this.lstViewItem.dataProvider = arrCollection;
            this.lstViewItem.itemRenderer = VipMallItem;
        }

        // 按钮状态
        this.btnGift.enabled = (i != this.BUTTON.GIFT);
        this.btnRights.enabled = (i != this.BUTTON.RIGHT);
        this.btnMall.enabled = (i != this.BUTTON.MALL);

        this.btnGift.currentState = (i == this.BUTTON.GIFT ? "down" : "up");
        this.btnRights.currentState = (i == this.BUTTON.RIGHT ? "down" : "up");
        this.btnMall.currentState = (i == this.BUTTON.MALL ? "down" : "up");

        this.btnSelLeft.enabled = (this.id != 1);
        this.btnSelRight.enabled = (this.id != this.MAX - 1);

        if (this.id == 1) {
            this.btnSelLeft.visible = false;
        } else {
            this.btnSelLeft.visible = true;
        }

        if (this.id == this.levelCur || (this.id == this.levelCur - 1 && this.levelCur == this.MAX)) {
            this.btnSelRight.visible = false;
        } else {
            this.btnSelRight.visible = true;
        }

        this.vipSeeTips1(this.id);
        if (this.id == this.MAX) {
            this.vipSeeTips2(this.id);
        } else {
            this.vipSeeTips2(this.id + 1);
        }
    }

    private onAbovePop() {
        this.setInfo();
        this.setList();
    }

    private vipSeeTips1(i: number) {
        let show = Tips.tips_VipAttri_get(i);
        this.imgTips4.visible = (show && i <= this.levelCur);
    }

    private vipSeeTips2(i: number) {
        let show = Tips.tips_VipAttri_get(i);
        this.imgTips5.visible = (show && i <= this.levelCur);
    }

    private onBtnSee1Begin() {
        let flagId: number = 0;
        if (this.id == this.MAX) {
            flagId = this.id - 1;
        } else {
            flagId = this.id;
        }

        let info = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
        let tbl = TableHalo.Table();// StringConfig_Table.vipHalo
        let haloId = info[flagId].halo_id;
        let speed = tbl[haloId].scene_speed_add * 100;
        let types = tbl[haloId].add_type;
        let addCrit = tbl[haloId].add_crit;

        if (types == undefined || (types[0] == 0 && types[1] == 0)) {
            this.lbAuraProperty1.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.attriAdd1, speed);
        } else if ((types.length == 1 || (types[0] == 0 && types[1] != 0) || (types[0] != 0 && types[1] == 0)) && speed != 0) {
            let str = TextsConfig.TextsConfig_VipMall.attri[types[0]];
            this.lbAuraProperty1.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.attriAdd2, str, addCrit[0], speed);
        } else if ((types.length == 1 || (types[0] == 0 && types[1] != 0) || (types[0] != 0 && types[1] == 0)) && speed == 0) {
            let str = TextsConfig.TextsConfig_VipMall.attri[types[0]];
            this.lbAuraProperty1.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.attriAdd4, str, addCrit[0]);
        } else if (types.length == 2 && speed == 0) {
            let str1 = TextsConfig.TextsConfig_VipMall.attri[types[0]];
            let str2 = TextsConfig.TextsConfig_VipMall.attri[types[1]];
            this.lbAuraProperty1.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.attriAdd5, str1, addCrit[0], str2, addCrit[1]);
        } else {
            let str1 = TextsConfig.TextsConfig_VipMall.attri[types[0]];
            let str2 = TextsConfig.TextsConfig_VipMall.attri[types[1]];
            this.lbAuraProperty1.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.attriAdd3, str1, addCrit[0], str2, addCrit[1], speed);
        }
        this.groupAuraProperty1.visible = true;
    }

    private onBtnSee1() {
        Tips.tips_VipAttri_set(this.id);
        this.vipSeeTips1(this.id);
        this.groupAuraProperty1.visible = false;
    }

    private onBtnSee2Begin() {
        let flagId: number = 0;
        if (this.id == this.MAX) {
            flagId = this.id;
        } else {
            flagId = this.id + 1;
        }

        let info = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
        let tbl = TableHalo.Table();// StringConfig_Table.vipHalo
        let haloId = info[flagId].halo_id;
        let speed = tbl[haloId].scene_speed_add * 100;
        let types = tbl[haloId].add_type;
        let addCrit = tbl[haloId].add_crit;

        if (types == undefined || (types[0] == 0 && types[1] == 0)) {
            this.lbAuraProperty2.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.attriAdd1, speed);
        } else if ((types.length == 1 || (types[0] == 0 && types[1] != 0) || (types[0] != 0 && types[1] == 0)) && speed != 0) {
            let str = TextsConfig.TextsConfig_VipMall.attri[types[0]];
            this.lbAuraProperty2.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.attriAdd2, str, addCrit[0], speed);
        } else if ((types.length == 1 || (types[0] == 0 && types[1] != 0) || (types[0] != 0 && types[1] == 0)) && speed == 0) {
            let str = TextsConfig.TextsConfig_VipMall.attri[types[0]];
            this.lbAuraProperty2.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.attriAdd4, str, addCrit[0]);
        } else if (types.length == 2 && speed == 0) {
            let str1 = TextsConfig.TextsConfig_VipMall.attri[types[0]];
            let str2 = TextsConfig.TextsConfig_VipMall.attri[types[1]];
            this.lbAuraProperty2.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.attriAdd5, str1, addCrit[0], str2, addCrit[1]);
        } else {
            let str1 = TextsConfig.TextsConfig_VipMall.attri[types[0]];
            let str2 = TextsConfig.TextsConfig_VipMall.attri[types[1]];
            this.lbAuraProperty2.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.attriAdd3, str1, addCrit[0], str2, addCrit[1], speed);
        }
        this.groupAuraProperty2.visible = true;
    }

    private onBtnSee2() {
        Tips.tips_VipAttri_set(this.id + 1);
        this.vipSeeTips2(this.id + 1);
        this.groupAuraProperty2.visible = false;
    }

    // 左侧 使用/取消光环
    private onBtnUseAura1() {
        let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
        let haloId: number = 0;
        let flagId: number = 0;
        if (this.id == this.MAX) {
            flagId = this.id - 1;
        } else {
            flagId = this.id;
        }
        if (Game.PlayerInfoSystem.BaseInfo.haloId != tbl[flagId].halo_id) {
            haloId = tbl[flagId].halo_id;
        }
        this.setHaloReq(haloId);
    }

    // 左侧 使用/取消头像框
    private onBtnUseAura2() {
        let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
        let frameId: number = 150001;
        let flagId: number = 0;
        if (this.id == this.MAX) {
            flagId = this.id - 1;
        } else {
            flagId = this.id;
        }
        if (Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[flagId].picFrame_id) {
            frameId = tbl[flagId].picFrame_id;
        }
        this.modifyRolePicReq(frameId);
    }

    // 右侧 使用/取消光环
    private onBtnUseAura3() {
        let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
        let haloId: number = 0;
        let flagId: number = 0;
        if (this.id == this.MAX) {
            flagId = this.id - 1;
        } else {
            flagId = this.id;
        }
        if (Game.PlayerInfoSystem.BaseInfo.haloId != tbl[flagId + 1].halo_id) {
            haloId = tbl[flagId + 1].halo_id;
        }
        this.setHaloReq(haloId);
    }

    // 右侧 使用/取消头像框
    private onBtnUseAura4() {
        let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
        let frameId: number = 150001;
        let flagId: number = 0;
        if (this.id == this.MAX) {
            flagId = this.id - 1;
        } else {
            flagId = this.id;
        }
        if (Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[flagId + 1].picFrame_id) {
            frameId = tbl[flagId + 1].picFrame_id;
        }
        this.modifyRolePicReq(frameId);
    }

    private onBtnSelLeft() {
        if (this.id != 1 && this.id != this.MAX) {
            this.id = this.id - 1;
            this.setList();
            this.setInfo();
        } else {
            this.id = this.id - 2;
            this.setInfo();
            this.setList();
        }
    }

    private onBtnSelRight() {
        if (this.id != this.MAX) {
            this.id = this.id + 1;
            this.setInfo();
            this.setList();
        }
    }

    // 回馈左侧领取奖励
    private onBtnGetLeft() {
        Tips.SetTipsOfId(Tips.TAG.VIPX, Tips.TAG.VipX_Right);
        let flagId: number = 0;
        if (this.id == this.MAX) {
            flagId = this.id - 1;
        } else {
            flagId = this.id;
        }
        this.bigVipRewardReq(flagId);
        this.setTips();
    }

    // 回馈右侧领取奖励
    private onBtnGetRight() {
        Tips.SetTipsOfId(Tips.TAG.VIPX, Tips.TAG.VipX_Right);
        let flagId: number = 0;
        if (this.id == this.MAX) {
            flagId = this.id - 1;
        } else {
            flagId = this.id;
        }
        this.bigVipRewardReq(flagId + 1);
        this.setTips();
    }

    // 领取奖励
    private bigVipRewardReq(level: number) {
        Game.PlayerVIPSystem.bigVipReward(level).then((gameInfo: message.GameInfo) => {
            Tips.SetTipsOfId(Tips.TAG.FRIEND, 1);
            this.setTips();
            Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward = gameInfo.mixUnitInfo[0].vipReward;
            loadUI(CommonGetDialog)
                .then((dialog: CommonGetDialog) => {
                    dialog.show();
                    dialog.init(gameInfo.getGoods);
                    dialog.setCB(() => {
                        this.setList();
                    });
                });

        });
    }

    private onBtnGift() {
        let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
        let chargeList = [];
        for (const k in tbl) {
            const v = tbl[k];
            if (Game.PlayerInfoSystem.BaseInfo.chargeToken >= v.sum) {
                chargeList.push(v);
            }
        }
        this.id = chargeList.length - 1;
        this.index = this.BUTTON.GIFT;
        this.setList();
        let tbl1 = PlayerGiftSystem.SortVipX(Game.PlayerGiftSystem.giftInfos);
        for (const v of tbl1) {
            let num = Number(<string>v.gift_index + (<string>v.index));
            if (Tips.tips_oneday_get(num) && !Tips.tips_Vip_get(this.BUTTON.MALL)) {
                Tips.tips_oneday_set(num, true);
            }
        }
    }

    private onBtnRights() {
        Tips.tips_Vip_set(this.BUTTON.RIGHT)
        this.setTips();
        let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
        let chargeList = [];
        for (const k in tbl) {
            const v = tbl[k];
            if (Game.PlayerInfoSystem.BaseInfo.chargeToken >= v.sum) {
                chargeList.push(v);
            }
        }
        this.id = chargeList.length - 1;
        this.index = this.BUTTON.RIGHT;
        this.setList();
        let tbl1 = PlayerGiftSystem.SortVipX(Game.PlayerGiftSystem.giftInfos);
        for (const v of tbl1) {
            let num = Number(<string>v.gift_index + (<string>v.index));
            if (Tips.tips_oneday_get(num) && !Tips.tips_Vip_get(this.BUTTON.MALL)) {
                Tips.tips_oneday_set(num, true);
            }
        }
    }

    private onBtnMall() {
        Game.PlayerGiftSystem.getNewGift().then(() => {
            Tips.tips_Vip_set(this.BUTTON.MALL);
            this.setTips();
            this.index = this.BUTTON.MALL;
            this.setList();
        });
    }

    private onBtnPay() {
        // if (Game.PlayerPaySystem.webPayUrl != "" || Game.PlayerPaySystem.customerInfo.customerWeb != "") {
        //     // web pay
        // } else {
        //     loadUI(PayMallScene)
        //         .then((scene: PayMallScene) => {
        //             scene.show(UI.SHOW_FROM_TOP);
        //             scene.init();
        //         });
        // }
        this.touchEnabled = false;
        loadUI(PayMallScene)
            .then((dialog: PayMallScene) => {
                dialog.show(UI.SHOW_FROM_TOP);
                dialog.init();

                this.touchEnabled = true;
            }).catch(() => {
                this.touchEnabled = true;
            });
    }

    private onBtnClose() {
        Tips.SetTipsOfId(Tips.TAG.VIPX, Tips.TAG.VipXGift);
        let tbl = PlayerGiftSystem.SortVipX(Game.PlayerGiftSystem.giftInfos);
        for (const v of tbl) {
            let num = Number(<string>v.gift_index + (<string>v.index));
            if (Tips.tips_oneday_get(num) && !Tips.tips_Vip_get(this.BUTTON.MALL)) {
                Tips.tips_oneday_set(num, true);
            }
        }
        this.close(UI.HIDE_TO_TOP);
    }

    private setHaloReq(haloId: number) {
        Game.PlayerVIPSystem.setHalo(haloId).then((gameInfo: message.GameInfo) => {
            Game.PlayerInfoSystem.BaseInfo.haloId = gameInfo.baseInfo[0].haloId;
            this.setList();
        });
    }

    private modifyRolePicReq(frameId: number) {
        Game.PlayerVIPSystem.modifyRolePic(Game.PlayerInfoSystem.BaseInfo.picId, frameId, Game.PlayerInfoSystem.BaseInfo.titleId, Game.PlayerInfoSystem.BaseInfo.viceTitleId).then((gameInfo: message.GameInfo) => {
            Game.PlayerInfoSystem.BaseInfo.picFrameId = gameInfo.baseInfo[0].picFrameId;
            this.setList();
        });
    }

    private loadPayProducts() {
        Game.PlayerPaySystem.queryAppProducts().then((resp: message.QueryAppProductsRespBody) => {
            for (let v of resp.products) {
                for (let vv of resp.channel_products_ext) {
                    if (v.id == vv.id) {
                        let tmp: MyProductInfo = {
                            id: "",
                            name: "",
                            describe: "",
                            currency: "",
                            amount: 0,
                            amount_usd: 0,
                            coin: 0,
                            type: "",
                            discount: "",
                            cp_product_id: "",
                        };
                        for (const k in tmp) {
                            tmp[k] = v[k];
                        }
                        tmp.cp_product_id = vv.cp_product_id;
                        this.allProducts.push(tmp);
                        break;
                    }
                }
            }

            let i = 0;
            while (i < this.allProducts.length) {
                if (PlayerPaySystem.PayItemByID(this.allProducts[i].cp_product_id) == null) {
                    this.allProducts.splice(i, 1);
                } else {
                    i = i + 1;
                }
            }

            this.allProducts.sort(function (a, b) {
                let itemA = PlayerPaySystem.PayItemByID(a.cp_product_id);
                let itemB = PlayerPaySystem.PayItemByID(b.cp_product_id);
                if (itemA == null) return 1;
                if (itemB == null) return -1;
                if (itemA.sort_index == itemB.sort_index) {
                    return b.amount - a.amount;
                } else {
                    return itemA.sort_index - itemB.sort_index;
                }

            });
        }).catch((err) => {
            toast_warning(err);
        });
    }
}
}