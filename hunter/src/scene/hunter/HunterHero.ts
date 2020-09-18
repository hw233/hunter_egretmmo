namespace zj {
    /** 
     * @author chen xi
     * 
     * @date 2018-11-14
     * 
     * @class 猎人英雄界面
     */
    export class HunterHero extends UI {
        public mainNode: eui.Group;

        private father: HunterMainScene = null;
        private spriteGrade: eui.Image;
        private btnHelp: eui.Button;
        private spriteType2: eui.Image;

        // icon node
        private nodeIcon: eui.Group;
        private spriteHunterHalfDraw: eui.Image;

        // get node
        private nodeGet: eui.Group;
        private spriteHunterName: eui.Image;
        private spriteTitle: eui.Image;
        private labelLevel: eui.Label;
        private starArr: Array<eui.Image> = [];

        private spriteType: eui.Image;

        // recruit node
        private nodeRecruit: eui.Group;
        private spriteHunterRecruitName: eui.Image;
        private gRecruitStar: eui.Group;

        // unlock node
        private nodeUnLock: eui.Group;
        private btnUpLevel: eui.Button;
        private btnUpStar: eui.Button;
        private btnBreak: eui.Button;
        /** 攻略 按钮 */
        private btnPlayerSkill: eui.Button;

        private imgBreakRedDot: eui.Image;
        private imgUpLevelRedDot: eui.Image;
        private imgCommentRedDot: eui.Image;
        /** 战斗力数值 */
        private labelPlayerPower: eui.Label;

        private btnAvata: eui.Button;
        // lock node
        private nodeLock: eui.Group;
        /** 查看详情 */
        private btnViewFate: eui.Button;
        /** 获取 */
        private btnHaveHunter: eui.Button;
        private groupCallHunter: eui.Group;

        // select list node
        private nodeSelectList: eui.Group;
        private listBottom: eui.List;
        private lastSelectedGeneralId: number = null;
        private listBottomData: eui.ArrayCollection = new eui.ArrayCollection();
        private btnLeft: eui.Button;
        private btnRight: eui.Button;
        private callback: Function = null;
        private thisObj: any = null;
        private generalId: number = null;
        private soulId: number = null;
        private canEquip: boolean = false;
        private currentHunterSortType: number;
        private cx: number; //记录按下时坐标
        private cy: number;
        private begainvis: boolean;//判断动画是否播放完毕
        private index: number = 0;//为于list里的猎人索引;
        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterHeroSkin.exml";
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                this.father = null;
            }, null);
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.Up, this);
            this.spriteHunterHalfDraw.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begain, this);
            this.init();

            this.hiddenBottomList();
            if (Device.isReviewSwitch) {
                this.btnHelp.visible = false;
            }
        }

        private bubbleSort(array: number[]) {
            let tmp = 0;
            let lastExchangeIndex = 0;
            let sortBorder = array.length - 1;
            for (let i = 0; i < array.length; i++) {
                let isSorted = true;
                for (let j = 0; j < sortBorder; j++) {
                    if (array[j] > array[j + 1]) {
                        tmp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = tmp;
                        isSorted = false;
                        lastExchangeIndex = j;
                    }
                }
                sortBorder = lastExchangeIndex;
                if (isSorted) break;
            }
            return array;
        }

        private init() {
            let tap = egret.TouchEvent.TOUCH_TAP;
            this.btnHelp.addEventListener(tap, this.onBtnHelp, this);
            this.btnBreak.addEventListener(tap, this.onBtnBreak, this);
            this.btnUpLevel.addEventListener(tap, this.onBtnUpLevel, this);
            this.btnUpStar.addEventListener(tap, this.onbtnUpStar, this);
            this.btnPlayerSkill.addEventListener(tap, this.onBtnPlayerSkill, this);
            this.btnViewFate.addEventListener(tap, this.onBtnViewFate, this);
            this.btnHaveHunter.addEventListener(tap, this.onBtnHaveHunter, this);
            this.btnLeft.addEventListener(tap, this.onBtnLeft, this);
            this.btnRight.addEventListener(tap, this.onBtnRight, this);
            this.groupCallHunter.addEventListener(tap, this.onCallHunter, this);
            // this.btnAvata.addEventListener(tap, this.onBtnAvata, this);
            // this.spriteType2
            this.btnAvata.addEventListener(tap, () => {
                if (this.isHasAvata()) {
                    loadUI(Hunterskin).then((dialog: Hunterskin) => {
                        dialog.setInfo(this.generalId);
                        dialog.CB(() => {
                            this.refreshHunterInfo();
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    })
                } else {
                    toast_warning("该猎人没有皮肤")
                }
            }, this);

            for (let i = 1; i < 7; i++) {
                let img = <eui.Image>this.nodeGet.getChildByName(`spriteStar${i}`);
                this.starArr.push(img);
            }
            this.currentHunterSortType = Tips.GetSaveTimeForGeneralSort(TableEnum.Enum.HXHHunterEnum.Level);
        }

        private isHasAvata() {
            /**是否有皮肤 */
            let vis = Table.FindF(PlayerFashionSystem.GetHunterListWithFashion(), (k, v) => {
                return v.general_id == this.generalId % 100000
            })
            // /**是否可变身 */
            // let vis1 = Table.FindF(PlayerHunterSystem.getGeneralTransfer(), (k, v) => {
            //     return v.general_id == this.generalId % 100000;
            // })
            return vis //|| vis1;
        }

        public setCallBack(cb: Function, thisObj: any) {
            this.callback = cb;
            this.thisObj = thisObj;
            this.father = thisObj;
        }

        private onBtnHelp() {
            loadUI(HelpDialog)
                .then((dialog: HelpDialog) => {
                    dialog.show(UI.SHOW_FILL_OUT);
                    dialog.loadBySmallType(101);
                });
        }

        private onBtnBreak() {
            let breakLevel = TableFunctionOpen.Item(FUNC.HUNTERBREAK).condition;
            if (Game.PlayerInfoSystem.Level >= breakLevel) {
                Tips.tips_HunterBreak_set(1);
            }
            loadUI(HunterBreak)
                .then((dialog: HunterBreak) => {

                    dialog.setInfo(this.generalId, (isBreakSuccess?: boolean, isUpLevelSuccess?: boolean) => {
                        if (!this.callback) return;

                        if (isBreakSuccess) {
                            this.callback.call(this.thisObj, HunterHeroCallbackEvent.BreakSuccess);
                        }

                        if (isUpLevelSuccess) { // in this case may consume the hunter, so refresh hunter list.
                            this.callback.call(this.thisObj, HunterHeroCallbackEvent.UpLevelSuccess);
                        }

                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnUpLevel() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo.level <= 0) {
                toast_warning(TextsConfig.TextsConfig_Error.add_exp_soul);
                return;
            }
            if (PlayerMissionSystem.FunOpenTo(FUNC.HEROLEVEL, true) == false) return;

            loadUI(HunterUpLevel).then((dialog: HunterUpLevel) => {
                dialog.setInfo(this.generalId, (isUpLevelSuccess: boolean, isAdvance: boolean) => {
                    if (this.callback) {
                        if (isUpLevelSuccess) {
                            this.callback.call(this.thisObj, HunterHeroCallbackEvent.UpLevelSuccess);
                        } else if (isAdvance) {
                            this.callback.call(this.thisObj, HunterHeroCallbackEvent.Advance);
                        }
                    }
                }, this);
                dialog.show(UI.SHOW_FROM_TOP);
            });
        }

        /** 点击 升星 */
        private onbtnUpStar() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.HEROSTAR, true) == false) return;

            loadUI(HunterUpStar)
                .then((dialog: HunterUpStar) => {
                    dialog.setInfo(this.generalId, this.father.battleValue, (type?: string) => {
                        // 升星成功，刷新界面.
                        if (this.callback) {
                            this.callback.call(this.thisObj, HunterHeroCallbackEvent.UpGradeSuccess);
                        }
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnPlayerSkill() {
            console.log("点击攻略");
        }

        private onBtnViewFate() {
            loadUI(HunterSeeDetail)
                .then((dialog: HunterSeeDetail) => {
                    dialog.setInfo((this.soulId - 30000), () => { });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnHaveHunter() {
            loadUI(Common_OutPutDialog).then((dialog: Common_OutPutDialog) => {
                dialog.setInfo((this.soulId), this, () => {

                });
                dialog.show(UI.SHOW_FROM_TOP);
            }).catch(() => {
                // can't load UI
            });
        }

        private onBtnLeft() {
            if (this.callback) {
                this.callback.call(this.thisObj, HunterHeroCallbackEvent.BottomListLeft);
            }
        }

        private onBtnRight() {
            if (this.callback) {
                this.callback.call(this.thisObj, HunterHeroCallbackEvent.BottomListRight);
            }
        }

        public showUnLock() {
            this.nodeUnLock.visible = true;
        }

        public hiddenUnlock() {
            this.nodeUnLock.visible = false;
        }

        public showBottomList(type?: number) {
            if (this.nodeSelectList.visible == false) this.nodeSelectList.visible = true;
            this.btnHelp.visible = false;

            if (type) this.currentHunterSortType = type;
            let hunterList = PlayerHunterSystem.GetHunterList(this.currentHunterSortType);
            if (hunterList.length <= 0) return;

            this.listBottomData.removeAll();
            for (let i = 0; i < hunterList.length; i++) {
                const v = hunterList[i];
                let data = new HeroItemData();
                data.generalId = v;
                data.type = HeroItemTypeEnum.HeroBottom;
                data.isSelected = (v == this.generalId);
                this.listBottomData.addItem(data);
                if (v == this.generalId) {
                    this.index = i;
                }
            }
            this.listBottom.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onHeroBottomListTap, this);
            this.listBottom.dataProvider = this.listBottomData;
            this.listBottom.itemRenderer = HunterHeroItem;

            this.lastSelectedGeneralId = this.generalId;

            this.scrollList(this.getHunterIndex(this.generalId));
        }

        private onHeroBottomListTap(e?: eui.ItemTapEvent, Index?: number) {
            if (e != null) {
                this.index = e.itemIndex;
            }
            if (Index != null) {
                this.index = Index;
            }
            let data: HeroItemData = this.listBottomData.getItemAt(this.index);
            if (data === null || data.generalId === null || data.generalId === 0) {
                return;
            }
            Tips.SetTipsOfHero(data.generalId);
            let lastSelectedIndex = this.getHunterIndex(this.lastSelectedGeneralId);
            if (lastSelectedIndex >= 0) {
                let lastData = this.listBottomData.getItemAt(lastSelectedIndex) as HeroItemData;
                lastData.isSelected = false;
                this.listBottomData.replaceItemAt(lastData, lastSelectedIndex);
            }

            data.isSelected = true;
            this.listBottomData.replaceItemAt(data, this.index);

            this.lastSelectedGeneralId = data.generalId;

            this.father.heroBottomListSelected(this.index, data);
        }

        private getHunterIndex(id: number) {
            let index = -1;
            if (id == null || id == undefined || id == 0) {
                return index;
            }
            // binary search
            // let low = 0;
            // let high = this.listBottomData.length - 1;
            // while (low <= high) {
            //     let middle = Math.floor((high - low) / 2);

            //     let data = this.listBottomData.getItemAt(middle) as HeroItemData;
            //     if (data == null || data == undefined) break;

            //     if (data.generalId == id) {
            //         return middle;
            //     } else if (data.generalId > id) {
            //         high = middle - 1;
            //     } else {
            //         low = middle + 1;
            //     }
            // }
            // return index;

            for (let i = 0; i < this.listBottomData.length; i++) {
                let data = this.listBottomData.getItemAt(i) as HeroItemData;
                if (data != null && data.generalId === id) {
                    index = i;
                    break;
                }
            }
            return index;
        }

        private scrollList(selectedIndex: number) {
            if (selectedIndex < 0) {
                selectedIndex = 0;
            }
            if (this.listBottomData.length > 4 && this.listBottomData.length - selectedIndex <= 3) {
                selectedIndex = this.listBottomData.length - 3.5;
            }
            let item = new HunterHeroItem();
            let gap = 0; // get the value from the skin
            let scrollWidth = (item.width + gap) * selectedIndex;

            egret.Tween.get(this.listBottom)
                .to({ scrollH: scrollWidth }, 350, egret.Ease.backIn);
        }

        private updateBottomList() {
            if (this.nodeSelectList.visible == false || this.listBottom.visible == false) return;

            let index = this.getHunterIndex(this.lastSelectedGeneralId);
            let data = this.listBottomData.getItemAt(index);
            if (data) {
                this.listBottomData.replaceItemAt(data, index);
            }
        }

        public hiddenBottomList() {
            this.nodeSelectList.visible = false;
            this.btnHelp.visible = true;
            if (Device.isReviewSwitch) {
                this.btnHelp.visible = false;
            }
        }

        public onBtnHero() {
            this.nodeUnLock.visible = true;
            this.nodeGet.visible = true;
            this.nodeIcon.visible = true;
            this.nodeLock.visible = false;
            this.nodeRecruit.visible = false;
        }

        public onBtnFragment() {
            this.nodeUnLock.visible = false;
            this.nodeGet.visible = false;
            this.nodeIcon.visible = true;
            this.nodeLock.visible = true;
            this.nodeRecruit.visible = true;
        }

        public setGeneralId(id: number, isEntryHeros: boolean) {
            // console.log("--- hero set general id = ", id);
            this.generalId = id;

            this.refreshHunterInfo();
            // this.updateBottomList();

            if (isEntryHeros) {
                this.showBottomList(this.currentHunterSortType);
            }
        }

        public setSoulId(id: number, canEquip: boolean) {
            // console.log("--- hero set soul id = ", id);
            this.soulId = id;
            this.canEquip = canEquip;
            this.refreshSoulInfo();
        }

        private refreshHunterInfo() {
            this.btnAvata.visible = this.isHasAvata();
            let baseInfo = PlayerHunterSystem.Table(this.generalId);
            let roleInfoId = PlayerHunterSystem.GetGeneralRoleInfoID(this.generalId);
            let roleInfo = PlayerHunterSystem.MapInstance(roleInfoId);
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (baseInfo == null || roleInfo == null || hunterInfo == null) {
                throw Error("hunter info or role info can't be null");
            }

            // console.log("\nrefreshHunterInfo --- baseInfo = ", baseInfo, "\nroleInfoId = ", roleInfoId, "\nroleInfo = ", roleInfo, "\n hunterInfo = ", hunterInfo);
            if (hunterInfo.battleValue > 100000) {
                this.labelPlayerPower.text = (hunterInfo.battleValue / 10000).toFixed(1) + "万";
            } else {
                this.labelPlayerPower.text = hunterInfo.battleValue.toString();
            }

            // handle level
            let max_level = 0;
            let level = null;
            let levelNext = null;
            if (hunterInfo.break_level != 0 && hunterInfo.level >= 60) {
                [level, levelNext] = PlayerHunterSystem.GetBreakHunterLevel(hunterInfo.break_level);
                max_level = 60 + levelNext;
            } else {
                max_level = PlayerHunterSystem.GetStep(this.generalId).max_level;
            }
            this.labelLevel.text = hunterInfo.level + "/" + max_level;

            // 设置猎人觉醒星级
            let star = 0;
            if (hunterInfo.level == 0) {
                star = baseInfo.init_star;
            } else {
                star = hunterInfo.star;
            }
            for (let i = 1; i <= CommonConfig.general_max_star; i++) {
                let img = this.starArr[i - 1];
                if (img == null || img == undefined) throw Error("star image is null");
                if (i <= star) {
                    let source = UIConfig.UIConfig_Role.heroAwakenStar[hunterInfo.awakePassive.level + 1];
                    img.source = cachekey(source, this);
                } else {
                    img.source = cachekey(UIConfig.UIConfig_Role.heroAwakenStar[0], this);
                }
            }
            let halfPath = roleInfo.half_path;
            let namePath = baseInfo.name_pic;
            if (hunterInfo.transfer_level && hunterInfo.transfer_level > 0 && hunterInfo.is_show_transfer) {
                let transferTab = TableGeneralTransfer.Table();
                let transformInfo = transferTab[baseInfo.general_id];
                let picRoleInfo = PlayerHunterSystem.MapInstance(transformInfo.transfer_role)
                halfPath = picRoleInfo.half_path;
                namePath = transformInfo.name_pic;
            } else {
                namePath = baseInfo.name_pic;
                halfPath = roleInfo.half_path;
            }

            let gradePath = UIConfig.UIConfig_General.hunter_grade[baseInfo.aptitude];
            let typePath = UIConfig.UIConfig_General.hunter_type1[baseInfo.type];
            let type2Path = UIConfig.UIConfig_General.hunter_type2[baseInfo.features];
            let titlePath = PlayerHunterSystem.GetStep(this.generalId).name_path;

            this.spriteHunterHalfDraw.source = cachekey(halfPath, this);
            Helper.SetImageFilterColor(this.spriteHunterHalfDraw);
            if (this.spriteHunterHalfDraw.source == "hero_half_wj_libeiduo_png") {
                this.spriteHunterHalfDraw.x = -181;
                this.spriteHunterHalfDraw.y = -204;
            } else {
                this.spriteHunterHalfDraw.x = -113;
                this.spriteHunterHalfDraw.y = -107;
            }
            if (Device.isReviewSwitch && Util.isWxMiniGame) {
                this.spriteHunterName.source = cachekey("wx_" + namePath, this);
            } else {
                this.spriteHunterName.source = cachekey(namePath, this);
            }
            this.spriteGrade.source = cachekey(gradePath, this);
            this.spriteType.source = cachekey(typePath, this);
            this.spriteType2.source = cachekey(type2Path, this);
            this.spriteTitle.source = cachekey(titlePath, this);
            
            this.setHunterBreak();
        }

        private refreshSoulInfo() {
            let generalId = PlayerHunterSystem.SoulIdFindGeneral(this.soulId).general_id;
            let baseInfo = PlayerHunterSystem.Table(generalId);
            let roleInfo = PlayerHunterSystem.MapInstance(baseInfo.general_roleId);
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            this.btnAvata.visible = false;

            let halfPath = roleInfo.half_path
            let namePath = baseInfo.name_pic;
            let gradePath = UIConfig.UIConfig_General.hunter_grade[baseInfo.aptitude];
            let typePath = UIConfig.UIConfig_General.hunter_type1[baseInfo.type];
            let type2Path = UIConfig.UIConfig_General.hunter_type2[baseInfo.features];
            let titlePath = PlayerHunterSystem.GetStep(this.generalId).name_path;

            this.spriteHunterHalfDraw.source = cachekey(halfPath, this);
            Helper.SetImageFilterColor(this.spriteHunterHalfDraw, 'cool');
            if (this.spriteHunterHalfDraw.source == "hero_half_wj_libeiduo_png") {
                this.spriteHunterHalfDraw.x = -181;
                this.spriteHunterHalfDraw.y = -204;
            } else {
                this.spriteHunterHalfDraw.x = -113;
                this.spriteHunterHalfDraw.y = -107;
            }
            if (Device.isReviewSwitch && Util.isWxMiniGame) {
                this.spriteHunterRecruitName.source = cachekey("wx_" + namePath, this);
            } else {
                this.spriteHunterRecruitName.source = cachekey(namePath, this);
            }
            this.spriteGrade.source = cachekey(gradePath, this);
            this.spriteType.source = cachekey(typePath, this);
            this.spriteType2.source = cachekey(type2Path, this);
            this.spriteTitle.source = cachekey(titlePath, this);

            let star = baseInfo.init_star;
            let awakenLevel = 0;
            if (hunterInfo != null) {
                awakenLevel = hunterInfo.awakePassive.level;
            }
            Helper.SetAwakeSpriteStar(this.gRecruitStar, star, awakenLevel);

            let obj = this.groupCallHunter.getChildByName("000_zhaomu");
            if (obj) this.groupCallHunter.removeChild(obj);
            let callCount = PlayerHunterSystem.SoulIdFindGeneral(this.soulId).soul_count;
            let count = PlayerItemSystem.Count(this.soulId);
            if (callCount <= count) {
                Game.DragonBonesManager.playAnimation(this, "ui_zhaomu_eff", null, "000_zhaomu", 0).then((display: dragonBones.EgretArmatureDisplay) => {
                    display.x = this.groupCallHunter.width * 0.5 - 10;
                    display.y = this.groupCallHunter.height * 0.5;
                    display.scaleX = 0.88;
                    display.scaleY = 0.88;
                    display.name = "000_zhaomu";
                    this.groupCallHunter.addChild(display);
                });
            }
        }

        private onBtnAvata() {
            loadUI(FashionMain)
                .then((dialog: FashionMain) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.init();
                });
        }

        private onCallHunter() {
            if (!this.canEquip) return;
            // Table.FindK(Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(), PlayerHunterSystem.Table(generalId).general_id) != -1
            let info = Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            Game.PlayerHunterSystem.generalRecruit(this.soulId).then((callGeneralId: number) => {

                let generalId = PlayerHunterSystem.GetGeneralId(callGeneralId);

                loadUI(CommonGetGeneral).then((dialog: CommonGetGeneral) => {
                    dialog.setInfo(generalId, this.soulId, () => {

                        if (this.callback) {
                            this.callback.call(this.thisObj, HunterHeroCallbackEvent.RecruitSuccess, callGeneralId);
                        }

                    }, info);
                    dialog.show(UI.SHOW_FILL_OUT);
                })
            });
        }

        private setHunterBreak() {
            // 小于6星，显示升星，隐藏突破
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let showBreak = (hunterInfo.star >= 6 && PlayerHunterSystem.Table(this.generalId).aptitude >= 13);
            this.btnBreak.visible = showBreak;
            this.btnUpStar.visible = !showBreak;

            let tips = false;
            let breakLevel = TableFunctionOpen.Item(FUNC.HUNTERBREAK).condition;
            if (Game.PlayerInfoSystem.Level >= breakLevel) {
                tips = Tips.tips_HunterBreak_get(1);
            }
            let using = Table.FindF(hunterInfo.using_break_skill, (_, v) => {
                return v == 0;
            });
            if (tips && hunterInfo.star >= 6 && Game.PlayerInfoSystem.BaseInfo.level >= TableFunctionOpen.Item(FUNC.HUNTERBREAK).condition) {
                this.imgBreakRedDot.visible = true;
            } else if (using) {
                this.imgBreakRedDot.visible = true;
            } else if (hunterInfo.break_level == CommonConfig.general_max_break) {
                this.imgBreakRedDot.visible = false;
            } else {
                this.imgBreakRedDot.visible = false;
            }
        }

        private begain(e: egret.TouchEvent) {
            if (this.nodeSelectList.visible == false) {
                return;
            }
            this.cx = e.stageX;
            this.cy = e.stageY;
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.Up, this);
        }

        private Up(e: egret.TouchEvent) {
            if (this.nodeSelectList.visible == false) {
                return;
            }
            let thisOne = this;//缓动动画里this指针会改变
            this.spriteHunterHalfDraw.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begain, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.Up, this);
            let ax = Table.DeepCopy(this.spriteHunterHalfDraw.x);
            let ay = Table.DeepCopy(this.spriteHunterHalfDraw.y);
            if (this.cx - e.stageX > 30) {
                console.log("1111111111111");
                egret.Tween.get(this.spriteHunterHalfDraw)
                    .to({ x: ax - 50, y: ay - 50, alpha: 0 }, 300)
                    .call(() => {
                        if ((thisOne.index + 1) < thisOne.listBottomData.length) {
                            thisOne.onHeroBottomListTap(null, thisOne.index + 1);
                            if (thisOne.spriteHunterHalfDraw.source == "hero_half_wj_libeiduo_png") {
                                ax = -181;
                                ay = -204;
                            } else {
                                ax = -113;
                                ay = -107;
                            }
                        } else {
                            toast_warning(TextsConfig.TextsConfig_HeroMain.beLastHero);
                        }
                        egret.Tween.get(this.spriteHunterHalfDraw)
                            .to({ x: ax + 50, y: ay + 50, alpha: 0 }, 1)
                            .to({ x: ax, y: ay, alpha: 1 }, 300)
                            .call(() => {
                                thisOne.spriteHunterHalfDraw.addEventListener(egret.TouchEvent.TOUCH_BEGIN, thisOne.begain, thisOne);
                            })
                    })

            } else if (this.cx - e.stageX < -30) {
                console.log("222222222222");
                egret.Tween.get(this.spriteHunterHalfDraw)
                    .to({ x: ax + 50, y: ay + 50, alpha: 0 }, 300)
                    .call(() => {
                        if ((thisOne.index - 1) >= 0) {
                            thisOne.onHeroBottomListTap(null, thisOne.index - 1);
                            if (thisOne.spriteHunterHalfDraw.source == "hero_half_wj_libeiduo_png") {
                                ax = -181;
                                ay = -204;
                            } else {
                                ax = -113;
                                ay = -107;
                            }
                        } else {
                            toast_warning(TextsConfig.TextsConfig_HeroMain.beFirstHero);
                        }
                        egret.Tween.get(this.spriteHunterHalfDraw)
                            .to({ x: ax - 50, y: ay - 50, alpha: 0 }, 1)
                            .to({ x: ax, y: ay, alpha: 1 }, 300)
                            .call(() => {
                                thisOne.spriteHunterHalfDraw.addEventListener(egret.TouchEvent.TOUCH_BEGIN, thisOne.begain, thisOne);
                            })
                    })

            } else {
                thisOne.spriteHunterHalfDraw.addEventListener(egret.TouchEvent.TOUCH_BEGIN, thisOne.begain, thisOne);
            }
        }
    }


    export const enum HunterHeroCallbackEvent {
        /** 升星成功 */
        UpGradeSuccess = 0,

        /** 升级成功 */
        UpLevelSuccess = 1,

        /** 进阶 */
        Advance = 2,

        /** 突破成功 */
        BreakSuccess = 3,

        /** 点击底部list左侧按钮 */
        BottomListLeft = 4,

        /** 点击底部list右侧按钮 */
        BottomListRight = 5,

        RecruitSuccess = 6
    }

}