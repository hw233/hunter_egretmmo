namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-28
     * 
     * @description The car ui in hunter module.
     */
    export class HunterCardMain extends HunterSubUI {
        private listCard: eui.List;
        private btnUnLoad: eui.Button;
        private btnBag: eui.Button;
        private imgRedDot: eui.Image;
        private listCardData: eui.ArrayCollection = new eui.ArrayCollection();
        private update: number;
        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterCardMainSkin.exml";
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;

            this.btnBag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBag, this);
            this.btnUnLoad.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUnLoad, this);
            this.update = egret.setInterval(this.setTips, this, 1000);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.clearInterval(this.update);
            }, this);
            this.setTips();
        }

        protected reloadGeneral() {
            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
            let cardMap = PlayerHunterSystem.GetHunterCardMap(this.generalId);

            this.listCardData.removeAll();
            for (let i = 0; i < 9; i++) {
                let data = new HunterCardMainItemData();
                data.generalId = this.generalId;
                data.cardType = baseGeneralInfo.card_type[i];
                data.cardLevel = baseGeneralInfo.card_level[i];
                data.cardInfo = cardMap[i + 1];
                data.father = this;
                this.listCardData.addItem(data);
            }
            this.listCard.dataProvider = this.listCardData;
            this.listCard.itemRenderer = HunterCardMainItem;
            this.listCard.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListCardTap, this);


            this.btnUnLoad.visible = (Table.LengthDisorder(cardMap) > 0);
        }

        private onListCardTap(e: eui.ItemTapEvent) {
            let item = this.listCard.getElementAt(e.itemIndex) as HunterCardMainItem;
            if (item == null || item == undefined) return;

            let data = this.listCardData.getItemAt(e.itemIndex) as HunterCardMainItemData;
            if (data == null || data == undefined) return;

            if (item.uiType == CardUIType.NOCARD) {
                if (Game.TeachSystem.curPart == 8006 || Game.TeachSystem.curPart == 8022) Game.EventManager.event(GameEvent.CLEAR_TIP_SPX);
                loadUI(HunterCardEmptyPopDialog).
                    then((dialog: HunterCardEmptyPopDialog) => {
                        dialog.setInfo(this.generalId, data.cardType, e.itemIndex + 1, (isInstallSuccess) => {
                            if (isInstallSuccess) { // show battle value update
                                egret.setTimeout(() => {
                                    let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
                                    if (hunterInfo.battleValue > this.father.battleValue) {
                                        CommonTipBmfont.promptBattleValue(this.father.battleValue, hunterInfo.battleValue);
                                        this.father.onSubUIEvent(HunterSubUIEvent.Refresh);
                                    }
                                }, this, 500);
                            }
                            this.reloadGeneral();
                        }, () => {
                            this.reloadGeneral();
                            this.father.removeChild(dialog);
                        });
                        dialog.name = "hunterCardEmptyPopDialog"
                        this.father.addChild(dialog);
                        if (Game.TeachSystem.curPart == 8006 || Game.TeachSystem.curPart == 8022) Teach.addTeaching();
                    }).
                    catch(() => {
                        toast(LANG("加载失败"));
                    });
            } else if (item.uiType == CardUIType.CARD) {
                loadUI(HunterCardPopDialog).
                    then((dialog: HunterCardPopDialog) => {
                        dialog.setInfo(this.generalId, data.cardType, e.itemIndex + 1, this.father.battleValue, () => {
                            this.reloadGeneral();
                            this.father.onSubUIEvent(HunterSubUIEvent.Refresh);
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    }).
                    catch(() => {
                        toast(LANG("加载失败"));
                    });
            } else {
                // to do 
            }
        }

        private onBtnBag() {
            loadUI(CardMainScene)
                .then((scene: CardMainScene) => {
                    scene.onBtnCardBag(() => {
                        this.reloadGeneral();
                    });
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        private onUnLoad() {
            let unload = () => {
                for (let v of Game.PlayerHunterSystem.queryHunter(this.generalId).potatoInfo) {
                    if (v.index > Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex) {
                        Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex = v.index;
                    }
                }

                Game.PlayerHunterSystem.unLoadAllPotato(this.generalId).
                    then(() => {
                        egret.setTimeout(() => {
                            toast(TextsConfig.TextsConfig_Hunter_Card.unloadSuccessful);
                        }, this, 500);
                        this.reloadGeneral();
                    });
            }

            TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Hunter_Card.confirmUnloadCard, () => {
                unload();
            });
        }

        private itemList: Array<HunterCardMainItem> = [];

        private getItemList() {
            this.itemList = [];
            for (let i = 0; i < 9; i++) {
                let item = this.listCard.getElementAt(i) as HunterCardMainItem;
                this.itemList.push(item);
            }
        }

        private setTips() {
            this.imgRedDot.visible = Tips.GetTipsOfId(Tips.TAG.POTATO);
        }
    }
}