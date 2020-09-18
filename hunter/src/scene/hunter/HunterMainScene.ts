namespace zj {
    /** 
     * @author chen xi
     * 
     * @date 2018-11-13
     * 
     * @class 猎人主界面
     */

    export class HunterMainScene extends Scene {
        /** 关闭 按钮 */
        private btnClose: eui.Button;
        private groupBtnMainDetail: eui.Group;
        /** 主界面 详情 按钮 */
        private btnMainDetail: eui.Button;
        /** 主界面 详情 按钮上的红点*/
        private spriteMainDetailRedDot: eui.Image;
        /** 右侧边栏 */
        private gRightSideBar: eui.Group;
        /** 详情 */
        private gDetail: eui.Group;
        private groupImg: eui.Group;
        private list: HunterHeroList;
        private hero: HunterHero;
        private rightContentDictionary: { [key: number]: HunterSubUI, } = {};

        private btnDetail: eui.Button;
        private btnSkill: eui.Button;
        private btnCard: eui.Button;
        private btnAwaken: eui.Button;
        private btnCollection: eui.Button;
        private btnPsychic: eui.Button;
        private rightButtons: Array<eui.Button>;
        private labelToken: eui.Label;
        private btnAdddiamond: eui.Button;
        private labelIntegrate: eui.Label;
        private btnAddGold: eui.Button;
        private groupMoney: eui.Group;
        private groupMoney1: eui.Group;
        private groupMoney2: eui.Group;
        private spriteDetail: eui.Image;
        private spriteSkill: eui.Image;
        private spriteCard: eui.Image;
        private spriteAwaken: eui.Image;
        private spriteCollection: eui.Image;
        private spritePsychic: eui.Image;
        private rightSprites: Array<eui.Image> = [];
        private groupCard: eui.Group;
        private groupAwaken: eui.Group;
        private groupCollect: eui.Group;
        private isEntryHeros: boolean = false;
        private currentSelectedIndex = 0;
        private lastSelectedIndex = Number.NaN;
        private generalId: number = null;
        private soulId: number = null;
        private _battleValue: number = 0; // current battle value, used for sub ui

        private gold: eui.Image;
        private jewel: eui.Image;

        public get battleValue(): number {
            return this._battleValue;
        }
        public set battleValue(v: number) {
            this._battleValue = v;
        }

        private _in_heroesUI: boolean;
        private update: number;
        private rectMask: eui.Rect;
        public constructor() {
            super();

            this.skinName = "resource/skins/hunter/HunterMainSkin.exml";
            this.init();

            this.gRightSideBar.visible = false;

            this.loadSubUI();

            this.setChildIndex(this.gDetail, this.numChildren - 1);

            this.rightButtons = [
                this.btnDetail,
                this.btnSkill,
                this.btnCard,
                this.btnAwaken,
                this.btnCollection,
                this.btnPsychic
            ];
            this.rightSprites = [
                this.spriteDetail,
                this.spriteSkill,
                this.spriteCard,
                this.spriteAwaken,
                this.spriteCollection,
                this.spritePsychic
            ];
            this._in_heroesUI = true;

            // this.addChildAt(this.btnClose, 3008);
            // // this.addChildAt(this.groupImg, 3000);
            if (Device.isReviewSwitch) {
                this.groupCard.visible = false;
                this.groupAwaken.visible = false;
                this.groupCollect.visible = false;
                this.btnAddGold.visible = false;

                this.gold.width = 40;
                this.gold.height = 40;

                this.jewel.width = 40;
                this.jewel.height = 40;

                this.btnAdddiamond.width = 30;
                this.btnAdddiamond.height = 30;
                this.btnAdddiamond.y = 7;
            }
        }

        private init() {
            this.rectMask.visible = false;
            let tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnMainDetail.addEventListener(tap, this.onBtnMainDetail, this);
            this.btnDetail.addEventListener(tap, this.onBtnDetail, this);
            this.btnSkill.addEventListener(tap, this.onBtnSkill, this);
            this.btnCard.addEventListener(tap, this.onBtnCard, this);
            this.btnAwaken.addEventListener(tap, this.onBtnAwaken, this);
            this.btnCollection.addEventListener(tap, this.onBtnCollection, this);
            this.btnPsychic.addEventListener(tap, this.onBtnPsychic, this);
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.update = egret.setInterval(this.Update, this, 1000);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.clearInterval(this.update);
            }, this);
            egret.Tween.get(this).wait(10).call(() => {
                this.Update();
            })

            this.btnMainDetail.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
                Game.EventManager.event(GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
            }, this);
            Game.EventManager.on(HUNTER_REFRESH_TIP, this.onRefreshTips, this);
        }

        private loadSubUI() {
            let p1 = loadUI(HunterHeroList);
            let p2 = loadUI(HunterHero);

            Promise.all([p1, p2]).then((all: [UI, UI]) => {

                let hero = all[1] as HunterHero;
                hero.setCallBack(this.onHeroCallback, this);
                this.addChild(hero);
                hero.name = "hero";
                this.hero = hero;

                let heroList = all[0] as HunterHeroList;
                heroList.setCallback(this.onListCallback, this);
                this.addChild(heroList);
                heroList.name = "hunterHero";
                this.list = heroList;

                let destX = UIManager.StageWidth * 0.5 * (1 + 0.1) - this.list.mainNode.width;
                destX = destX >= 0 ? destX : 0
                let destY = UIManager.StageHeight * 0.5 * (1 + 0.06) - this.list.mainNode.height * 0.5;
                this.list.mainNode.x = destX;
                this.list.mainNode.y = destY;

                destX = UIManager.StageWidth * (1 - 0.5 * 0.06) - this.hero.mainNode.width;
                destY = UIManager.StageHeight * 0.5 * (1 + 0.06) - this.hero.mainNode.height * 0.5;
                this.hero.mainNode.x = destX >= 0 ? destX : 0;
                this.hero.mainNode.y = destY;
                Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});

                this.list.loadList(true);

                this.loadRightContent();

                this.setChildIndex(this.gDetail, this.numChildren - 1);
                this.addChildAt(this.groupImg, 3000);
            });
        }

        private Update() {
            //钻石数量
            if (Game.PlayerInfoSystem.Coin > 100000) {
                this.labelIntegrate.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            } else {
                this.labelIntegrate.text = Game.PlayerInfoSystem.Coin.toString();
            }
            //钻石数量
            if (Game.PlayerInfoSystem.Token > 100000) {
                this.labelToken.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            } else {
                this.labelToken.text = Game.PlayerInfoSystem.Token.toString();
            }
            if (this.labelIntegrate.width < 60) {
                this.labelIntegrate.width = 60;
            }
            if (this.labelToken.width < 60) {
                this.labelToken.width = 60;
            }
            this.groupMoney.width = this.groupMoney1.width + this.groupMoney2.width + 20;
            this.spriteMainDetailRedDot.visible = Tips.GetTipsOfHero(this.generalId);
        }

        private onBtnAddGold() {
            loadUI(HelpGoldDialog)
                .then((dialog: HelpGoldDialog) => {
                    dialog.SetInfoList();
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnAddGemstone() {
            // toast_success("加钻石功能未开启");
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init(false);
                });
        }

        // fix bug; load right content at first.
        private async loadRightContent() {

            let detail = newUI(HunterDetail) as HunterDetail;
            detail.groupMain.x = this.width;
            detail.groupMain.y = this.height * 0.5 * (1 + 0.05) - detail.groupMain.height * 0.5;
            detail.alpha = 0;
            detail.name = "detail";
            this.addChild(detail);
            detail.alpha = 0;
            this.rightContentDictionary[0] = detail;

            let skill = newUI(HunterSkill) as HunterSkill;
            skill.groupMain.x = this.width;
            skill.groupMain.y = this.height * 0.5 * (1 + 0.05) - skill.groupMain.height * 0.5;
            skill.alpha = 0;
            skill.name = "skill";
            this.addChild(skill);
            skill.alpha = 0;
            this.rightContentDictionary[1] = skill;

            let card = newUI(HunterCardMain) as HunterCardMain;
            card.groupMain.x = this.width;
            card.groupMain.y = this.height * 0.5 * (1 + 0.05) - card.groupMain.height * 0.5;
            card.alpha = 0;
            card.name = "card";
            this.addChild(card);
            card.alpha = 0;
            this.rightContentDictionary[2] = card;

            let awaken = newUI(HunterAwaken) as HunterAwaken;
            awaken.groupMain.x = this.width;
            awaken.groupMain.y = this.height * 0.5 * (1 + 0.05) - awaken.groupMain.height * 0.5;
            awaken.alpha = 0;
            awaken.name = "awaken";
            this.addChild(awaken);
            awaken.alpha = 0;
            this.rightContentDictionary[3] = awaken;

            let collection = newUI(HunterCollection) as HunterCollection;
            collection.groupMain.x = this.width;
            collection.groupMain.y = this.height * 0.5 * (1 + 0.05) - collection.groupMain.height * 0.5;
            collection.alpha = 0;
            collection.name = "collection";
            this.addChild(collection);
            collection.alpha = 0;
            this.rightContentDictionary[4] = collection;

            let psychic = newUI(HunterPsychic) as HunterPsychic;
            psychic.groupMain.x = this.width;
            psychic.groupMain.y = this.height * 0.5 * (1 + 0.05) - psychic.groupMain.height * 0.5;
            psychic.alpha = 0;
            psychic.name = "psychic";
            this.addChild(psychic);
            psychic.alpha = 0;
            this.rightContentDictionary[5] = psychic;

            for (let k in this.rightContentDictionary) {
                if (this.rightContentDictionary.hasOwnProperty(k)) {
                    let v = this.rightContentDictionary[k];
                    v.father = this;
                    v.setSelected(false, null);
                }
            }

            // let p1 = loadUI(HunterDetail);
            // let p2 = loadUI(HunterSkill);
            // let p3 = loadUI(HunterCardMain);
            // let p4 = loadUI(HunterAwaken);
            // let p5 = loadUI(HunterCollection);
            // let p6 = loadUI(HunterPsychic);

            // Promise.all([p1, p2, p3, p4, p5, p6]).then((all: Array<UI>) => {

            // });
        }

        private setRightContent(index: HunterSubUIType = HunterSubUIType.Detail) {
            this.isEntryHeros = true;
            // this if statement will not run.
            if (this.rightContentDictionary[index] == null) {
                let subUI: HunterSubUI = null;
                if (index == HunterSubUIType.Detail) {
                    subUI = new HunterDetail();
                } else if (index == HunterSubUIType.Skill) {
                    subUI = new HunterSkill();
                } else if (index == HunterSubUIType.Card) {
                    subUI = new HunterCardMain();
                } else if (index == HunterSubUIType.Awaken) {
                    subUI = new HunterAwaken();
                } else if (index == HunterSubUIType.Psychic) {
                    subUI = new HunterPsychic();
                } else if (index == HunterSubUIType.Collection) {
                    subUI = new HunterCollection();
                } else {
                    throw new Error("sub UI type error");
                }

                subUI.groupMain.x = this.width * 0.5 * (1 - 0.11);
                subUI.groupMain.y = this.height * 0.5 * (1 + 0.05) - subUI.groupMain.height * 0.5;
                subUI.alpha = 1;
                subUI.father = this;
                this.addChild(subUI);
                this.rightContentDictionary[index] = subUI;
            }
        }

        private setRightButtonsSelected(index = 0, showAni: boolean = true) {
            for (let i = 0; i < this.rightButtons.length; i++) {
                this.rightButtons[i].enabled = (this.currentSelectedIndex != i);
            }

            for (let i = 0; i < this.rightSprites.length; i++) {
                let initX = this.rightSprites[i].x;
                if (index == i) {
                    if (showAni) {
                        egret.Tween.get(this.rightSprites[i])
                            .call(() => { this.rightSprites[i].visible = true; })
                            .to({ x: initX + 50 }, 0)
                            .to({ x: initX }, 200, egret.Ease.backInOut);
                    } else {
                        this.rightSprites[i].visible = true;
                    }

                } else if (this.lastSelectedIndex == i) {
                    egret.Tween.get(this.rightSprites[i])
                        .to({ x: initX + 50 }, 200, egret.Ease.backInOut)
                        .call(() => { this.rightSprites[i].visible = false; })
                        .to({ x: initX }, 0);
                }
            }

        }

        private selectUI(index: HunterSubUIType = HunterSubUIType.Detail, showAni: boolean = true) {
            this.currentSelectedIndex = index;
            this.setRightButtonsSelected(index, showAni);

            this.setRightContent(index);
            this.lastSelectedIndex = this.currentSelectedIndex;

            this.setChildIndex(this.gRightSideBar, this.numChildren - 1);

            for (const k in this.rightContentDictionary) {
                if (this.rightContentDictionary.hasOwnProperty(k)) {
                    let v = this.rightContentDictionary[k];
                    if (v != null) {
                        v.alpha = 1;
                        v.setSelected(Number(k) == index, this.generalId);
                    }
                }
            }
        }

        private onRefreshTips() {
            this[`imgDetailRedDot`].visible = Tips.GetTipsOfHero(this.generalId, Tips.TAG.GENERAL_GRADE) || Tips.GetTipsOfHero(this.generalId, Tips.TAG.GENERAL_GRADE_STEP);
            this[`imgSkillRedDot`].visible = Tips.GetTipsOfHero(this.generalId, Tips.TAG.GENERAL_SKILL);
            this[`imgCardRedDot`].visible = Tips.GetTipsOfHero(this.generalId, Tips.TAG.GENERAL_Card);
            this[`imgAwakenRedDot`].visible = Tips.GetTipsOfHero(this.generalId, Tips.TAG.GENERAL_AWAKEN);
            this[`imgColectionRedDot`].visible = Tips.GetTipsOfHero(this.generalId, Tips.TAG.GENERAL_EQUIP);
            this[`imgPsychicRedDot`].visible = Tips.GetTipsOfHero(this.generalId, Tips.TAG.GENERAL_PSYCHIC);
        }

        // ================= ani begin =================

        /** 列表 进入动画 */
        private listAniEnter(cb?: Function) {
            let destX = UIManager.StageWidth * 0.5 * (1 + 0.1) - this.list.mainNode.width;
            destX = (destX >= 0) ? destX : 0;
            egret.Tween.get(this.list.mainNode)
                .call(() => {
                    this.list.mainNode.visible = true;
                }, this)
                .to({ x: destX }, 150)
                .call(() => {
                    if (cb) cb(this);
                }, this);
        }

        /** 列表 隐藏动画 */
        private listAniExit(cb?: Function) {
            egret.Tween.get(this.list.mainNode)
                .to({ x: -this.list.mainNode.width }, 150)
                .call(() => {
                    this.list.mainNode.visible = false;
                    if (cb) cb(this);
                }, this);
        }

        /** 猎人 左移动画 */
        private heroMoveLeftAni(cb?: Function) {
            // hero 向左动
            // 中线往左偏移40%
            let destX = UIManager.StageWidth * 0.5 * (1 - 0.15) - this.hero.mainNode.width;
            destX = destX >= 0 ? destX : 0;
            egret.Tween.get(this.hero.mainNode)
                .call(() => {
                    this.hero.hiddenUnlock();
                    this.hero.showBottomList(this.list.sortType);
                }, this)
                .to({ x: destX }, 150)
                .call(() => {
                    if (cb) cb(this);
                }, this);
        }

        /** 猎人 右移动画 */
        private heroMoveRightExit(cb?: Function) {
            // 保持距离左边10%
            let destX = UIManager.StageWidth * (1 - 0.5 * 0.06) - this.hero.mainNode.width;;
            destX = destX >= 0 ? destX : 0;

            egret.Tween.get(this.hero.mainNode)
                .call(() => {
                    this.hero.showUnLock();
                    this.hero.hiddenBottomList();
                }, this)
                .to({ x: destX }, 150)
                .call(() => {
                    if (cb) cb(this);
                }, this);
        }

        /** 详情按钮 显示动画 */
        private detailButtonAniShow(cb?: Function) {
            this.gDetail.visible = true;
            // let originX = this.groupBtnMainDetail.x;
            // let destX = originX + this.groupBtnMainDetail.width;

            egret.Tween.get(this.groupBtnMainDetail)
                .to({ right: -this.groupBtnMainDetail.width }, 0)
                .to({ right: 0 }, 250, egret.Ease.backInOut)
                .call(() => {
                    this.setChildIndex(this.gDetail, this.numChildren - 1);
                    if (cb) cb(this);
                }, this);
        }

        /** 详情按钮 隐藏动画 */
        private detailButtonAniHidden(cb?: Function) {
            let originX = this.groupBtnMainDetail.x;
            let destX = originX + this.groupBtnMainDetail.width;

            egret.Tween.get(this.groupBtnMainDetail)
                .to({ right: -this.groupBtnMainDetail.width }, 250, egret.Ease.backInOut)
                .call(() => {
                    this.gDetail.visible = false;
                    if (cb) cb(this);
                }, this)
                .to({ right: 0 }, 0);
        }

        /** 右侧边栏 显示动画 */
        private rightSideBarShowAni(cb?: Function) {
            egret.Tween.get(this.gRightSideBar)
                .to({ alpha: 1 }, 150, egret.Ease.quadInOut)
                .call(() => {
                    this.gRightSideBar.visible = true;
                    Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
                    // this.gDetail.touchEnabled = false;
                    // this.setChildIndex(this.gRightSideBar, this.numChildren - 1);
                    if (cb) cb(this);
                }, this);
        }

        /** 右侧边栏 隐藏动画 */
        private rightSideBarHideAni(cb?: Function) {
            egret.Tween.get(this.gRightSideBar)
                .to({ alpha: 0 }, 150, egret.Ease.quadInOut)
                .call(() => {
                    this.gRightSideBar.visible = false;
                    // this.gDetail.touchEnabled = true;
                    if (cb) cb(this);
                }, this);
        }

        // ================= ani end =================
        private advanced() {
            egret.Tween.get(this).wait(1000).call(this.onBtnMainDetail);
        }

        /** 主界面详情按钮 */
        private onBtnMainDetail() {
            this.detailButtonAniHidden();
            this.rightSideBarShowAni();
            this.listAniExit();
            this.heroMoveLeftAni();

            this.onRefreshTips();

            this.selectUI(HunterSubUIType.Detail, false);
        }

        private onBtnDetail() {
            this.selectUI(HunterSubUIType.Detail);
        }

        private onBtnSkill() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.SKILL, true)) {
                this.selectUI(HunterSubUIType.Skill);
            }
        }

        private onBtnCard() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.POTATO, true)) {
                this.selectUI(HunterSubUIType.Card);
                if (Game.TeachSystem.curPart == 8006 || Game.TeachSystem.curPart == 8022) Teach.addTeaching();
            }
        }

        private onBtnAwaken() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.AWAKEN, true)) {
                if (this.canAwaken()) {
                    this.selectUI(HunterSubUIType.Awaken);
                }
            }
        }

        private onBtnCollection() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.EQUIP, true)) {
                this.selectUI(HunterSubUIType.Collection);
            }
        }

        private onBtnPsychic() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.PSYCHIC, true)) {
                this.selectUI(HunterSubUIType.Psychic);
            }
        }

        private async onBtnClose() {
            if (this.isEntryHeros) {
                this.isEntryHeros = false;
                this._in_heroesUI = true;
                this.lastSelectedIndex = Number.NaN;
                this.currentSelectedIndex = 0;

                this.refresh();

                await this.rightSideBarHideAni();
                await this.detailButtonAniShow();

                // 右侧内容移出屏幕
                for (let i = 0; i < this.rightSprites.length; i++) {
                    this.rightSprites[i].visible = false;
                }
                for (const k in this.rightContentDictionary) {
                    if (this.rightContentDictionary.hasOwnProperty(k)) {
                        let v = this.rightContentDictionary[k];
                        if (v != null) {
                            v.setSelected(false, this.generalId, false);
                        }
                    }
                }

                await this.heroMoveRightExit();
                await this.listAniEnter();
            } else {
                this.close(UI.HIDE_TO_TOP);
            }

        }

        /** 列面界面回调事件 */
        private onListCallback(type: HunterHeroListCallbackEvent, data?: any) {
            switch (type) {
                case HunterHeroListCallbackEvent.HunterListSelected:
                    this.onListSelectedHunter(data);
                    break;
                case HunterHeroListCallbackEvent.FragmentListSelected:
                    this.onListSelectedFragment(data);
                    break;
                case HunterHeroListCallbackEvent.HeroButtonTap:
                    this.onBtnHero();
                    break;
                case HunterHeroListCallbackEvent.FragmentButtonTap:
                    this.onBtnFragment();
                    break;
                case HunterHeroListCallbackEvent.SellSuccess:
                    this.refresh(true);
                    break;
                default:
                    throw new Error("list callback type error");
            }
        }

        /** 猎人列表界面点击英雄 */
        private onBtnHero() {
            this.detailButtonAniShow();
            this.hero.onBtnHero();
        }

        /** 猎人列表界面点击碎片 */
        private onBtnFragment() {
            this.detailButtonAniHidden();
            this.hero.onBtnFragment();
        }

        private refresh(loadList?: boolean) {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null || hunterInfo == undefined) {
                // fix bug: 
                // if current hunter is delete, cant't get hunter info, so refresh the hunter list and selected the first hunter.
                this.list.loadList(true);
                return;
            }
            this.setLock();
            this.hero.setGeneralId(this.generalId, this.isEntryHeros);
            this.battleValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            if (loadList != null) {
                this.list.loadList(true);
            }
        }

        // 子界面相应事件
        public onSubUIEvent(type: HunterSubUIEvent) {
            switch (type) {
                case HunterSubUIEvent.Refresh:
                    this.refresh(true);
                    break;
                case HunterSubUIEvent.GoAwaken:
                    this.selectUI(HunterSubUIType.Awaken, true);
                    break;
                case HunterSubUIEvent.UnableAwaken:
                    this.selectUI(HunterSubUIType.Detail, true);
                    break;
                default:
                    throw Error("sub ui error");
            }
        }

        /** 猎人列表界面选中猎人 */
        private onListSelectedHunter(id: number) {
            this.generalId = id;
            Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            this.refresh();
        }

        /** 猎人列表界面选中碎片 */
        private onListSelectedFragment(data: [number, boolean]) {
            this.soulId = data[0];
            this.hero.setSoulId(this.soulId, data[1]);
        }

        public heroBottomListSelected(index: Number, data: HeroItemData) {
            this.generalId = data.generalId;
            this.refresh();
            this.list.heroBottomListSelectedGeneral(data.generalId);

            this.rightContentDictionary[this.currentSelectedIndex].setSelected(true, this.generalId);
        }

        /** 英雄界面事件回调 */
        private onHeroCallback(type: HunterHeroCallbackEvent, generalId?: number) {
            switch (type) {
                case HunterHeroCallbackEvent.UpGradeSuccess:
                    this.refresh(true);
                    break;

                case HunterHeroCallbackEvent.UpLevelSuccess:
                    this.refresh(true);
                    break;

                case HunterHeroCallbackEvent.Advance:
                    this.advanced()
                    break;

                case HunterHeroCallbackEvent.BreakSuccess:
                    this.refresh(true);
                    break;

                case HunterHeroCallbackEvent.BottomListLeft:
                    this.onHeroBtnLeft();
                    break;

                case HunterHeroCallbackEvent.BottomListRight:
                    this.onHeroBtnRight();
                    break;

                case HunterHeroCallbackEvent.RecruitSuccess:
                    this.list.onBtnHero(generalId);
                    break;

                default:
                    throw new Error("hero callback type error");
            }
        }

        private onHeroBtnLeft(index?: Number) {

        }

        private onHeroBtnRight(index?: Number) {

        }

        private onTouchEnd() {
            this.list.onTouchEnd();
        }

        private canAwaken(): boolean {
            let skillInfoList = PlayerHunterSystem.GetSkillEachLvList(this.generalId);
            if (skillInfoList.length < 4) {
                toast_warning(TextsConfig.TextsConfig_Hunter.noawaken);
                return false;
            }
            return true;
        }

        private setLock() {
            this[`imgLockSkill`].visible = !PlayerMissionSystem.FunOpenTo(FUNC.SKILL);
            if (!Device.isReviewSwitch) {
                this[`imgLockCard`].visible = !PlayerMissionSystem.FunOpenTo(FUNC.POTATO);
                this[`imgLockAwaken`].visible = !PlayerMissionSystem.FunOpenTo(FUNC.AWAKEN);
                this[`imgLockCollection`].visible = !PlayerMissionSystem.FunOpenTo(FUNC.EQUIP);
                this[`imgLockPsychic`].visible = !PlayerMissionSystem.FunOpenTo(FUNC.PSYCHIC);
            }

        }

        public SetInfoMoveTo(generalId: number, vis: boolean) {
            let newgeneralId = Table.FindR(this.list.newHunter, (k, v) => {//this.list
                return ((!vis) && PlayerHunterSystem.GetGeneralId(v) == generalId) || (vis && v == generalId);
            })
            if (this.list != null && newgeneralId != null) {
                return this.list.FocusHunter(newgeneralId[0]);
            }
            // return null;
        }

        public SetInfoMoveToFirst() {
            let new_general_id = this.list.newHunter[0];
            if (this.list != null && new_general_id != null) {
                return this.list.FocusHunter(new_general_id);
            }
            // return null;
        }
    }

}