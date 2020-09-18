namespace zj {
// lizhengqiang
// 2018/12/05
// 恭喜获得界面

export class CommonGetDialog extends Dialog {

    private groupInfo: eui.Group;
    private imgCongratulations: eui.Image;
    private scrollerRewards: eui.Scroller;
    private AwardmoveLocation: number = 0;
    private lstItem: eui.List;
    private btnLeft: eui.Button;
    private btnRight: eui.Button;
    private btnClose: eui.Button;
    private groupBackdrop: eui.Group;
    private imgCongratulationsB: eui.Image;
    public GroupMain: eui.Group;

    private TableViewItem: eui.ArrayCollection;
    private TableViewIndex: number = 0;

    private arrData: Array<message.GoodsInfo> = [];
    private CB: Function = null;
    private removeCb: Function = null;
    public constructor() {
        super();
        this.skinName = "resource/skins/common/CommonGetDialogSkin.exml";

        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY_1, this.showGoodsProperty, this);

        this.addBackdropAnimatoin("ui_tongyong_beijingguang", "001_beijignguang_02", 0, this.groupBackdrop);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY_1, this.showGoodsProperty, this);
        }, null);

        if (Game.TeachSystem.curPart == 3014 || Game.TeachSystem.curPart == 3020) this.btnClose.enabled = false;
    }

    //添加龙骨动画背景发光
    public addBackdropAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2
                //display.y =this.height*0.25;
                display.y = group.explicitHeight;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    public onEntryTopDialog() {
        Game.SoundManager.playEffect("ui_lingqu_wupin_mp3");
    }

    public init(goods: Array<message.GoodsInfo> = [], type?: string, ani?: boolean) {
        if (type == "HXH_InstanceSearchItem") {
            this.imgCongratulations.source = cachekey(UIConfig.UIConfig_Hunter.successB, this);
            this.imgCongratulationsB.source = cachekey(UIConfig.UIConfig_Hunter.successB, this);
            this.btnLeft.visible = false;
            this.btnRight.visible = false;
            this.scrollerRewards.width = 597;
        }
        this.arrData = goods;

        let aniBoolean: boolean = false;
        if (ani) {
            aniBoolean = ani;
        }

        this.lstItem.selectedIndex = -1; // 默认选中
        this.lstItem.itemRenderer = CommonGetDialogItemIR;//
        this.TableViewItem = new eui.ArrayCollection();
        for (let i = 0; i < this.arrData.length; i++) {
            let data = new CommonGetDialogItemIRData();
            data.index = i;
            data.info = this.arrData[i];
            data.father = this;
            data.aniBoolean = aniBoolean;
            this.TableViewItem.addItem(data)
        }

        this.scrollerRewards.viewport = this.lstItem;
        this.scrollerRewards.validateNow();
        this.scrollerRewards.viewport.scrollH = this.AwardmoveLocation;

        this.scrollerRewards.left = 0;

        let layout = new eui.HorizontalLayout();
        layout.verticalAlign = "middle";
        layout.horizontalAlign = "center";
        layout.gap = 20;

        // 1~4个商品时，居中显示特殊处理
        if (this.arrData.length > 0 && this.arrData.length < 5) {
            this.btnLeft.visible = false;
            this.btnRight.visible = false;
            let width = 94;
            switch (this.arrData.length) {
                case 1: {
                    layout.paddingLeft = this.lstItem.width / 2 - width / 2;
                }; break;
                case 2: {
                    layout.paddingLeft = this.lstItem.width / 2 - width - layout.gap / 2;
                }; break;
                case 3: {
                    layout.paddingLeft = this.lstItem.width / 2 - width * 3 / 2 - layout.gap;
                }; break;
                case 4: {
                    layout.paddingLeft = this.lstItem.width / 2 - width * 2 - layout.gap * 3 / 2;
                }; break;
            }
        }

        this.lstItem.layout = layout;
        this.lstItem.dataProvider = this.TableViewItem;
        this.TableViewIndex = this.lstItem.selectedIndex;

        this.playAnimation();
    }

    private onScrollerEnd() {
        if (this.lstItem.scrollH == 0) {
            this.btnLeft.visible = false;
            this.btnRight.visible = true;
        }
        else if (this.lstItem.scrollH + this.scrollerRewards.width >= this.lstItem.contentWidth) {
            this.btnLeft.visible = true;
            this.btnRight.visible = false;
        }
        else {
            this.btnLeft.visible = true;
            this.btnRight.visible = true;
        }
    }

    public setCB(cb?) {
        this.CB = cb;
    }

    private onBtnClose() {
        if (this.CB != null) this.CB();
        this.close();
    }

    private playAnimation() {
        this.imgCongratulations.scaleX = 10;
        this.imgCongratulations.scaleY = 10;
        this.imgCongratulations.alpha = 1;
        egret.Tween.get(this.imgCongratulations)
            // .to({ scaleY: 10, scaleX: 10, alpha: 0.75, fillAlpha: 0.75 }, 0)
            // .to({ fillAlpha: 0.75 }, 0)
            // .to({ alpha: 1 }, 0)
            .to({ scaleY: 0.85, scaleX: 0.85 }, 230, egret.Ease.quadIn)
            .call(() => {
                this.imgCongratulationsB.scaleX = 0.85;
                this.imgCongratulationsB.scaleY = 0.85;
                this.imgCongratulationsB.alpha = 1;
                egret.Tween.get(this.imgCongratulationsB)
                    // .to({ scaleY: 0.85, scaleX: 0.85, fillAlpha: 0.75 })
                    // .to({ alpha: 0.75 }, 0)
                    .to({ scaleY: 2.5, scaleX: 2.5, alpha: 0 }, 1000, egret.Ease.sineInOut)
                    .call(()=>{
                        egret.Tween.removeTweens(this.imgCongratulationsB);
                    });
            })
            .to({ scaleY: 1.04, scaleX: 1.04 }, 130, egret.Ease.quadInOut)
            .to({ scaleY: 1, scaleX: 1 }, 300, egret.Ease.sineInOut)
            .call(()=>{
                egret.Tween.removeTweens(this.imgCongratulations)
            });
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

    private showGoodsProperty(ev: egret.Event) {
        let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
        if (PlayerItemSystem.ItemType(ev.data.info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
            (<CommonDesGeneral>show).reSetGeneral();
        }
        show.name = "details";
        this.addChild(show);
        let any: boolean = true;
        let num = Number(any);
    }

}

}