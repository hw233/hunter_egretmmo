namespace zj {
    /**
     * 向上拖动选择上阵猎人list列表中--每个item数据
     */
    export class FormatChooseHeroItem extends eui.ItemRenderer {
        public bDead: boolean = false;
        // 头像边框
        public imgFrame: eui.Image;
        // 头像icon
        public imgIcon: eui.Image;
        public labelNum: eui.BitmapLabel;
        public imgTopRight: eui.Image;
        public imgTick: eui.Image;
        public imgLetter: eui.Image;
        public groupStar: eui.Group;
        public imgShade: eui.Image;
        public imgYuan: eui.Image;
        public SpriteDead: eui.Image;
        public imgbg: eui.Image;
        public groupMain: eui.Group;
        protected touchBeginTime: number = 0;
        protected touchTimeInterval: number = 1000; // 长按间隔1秒
        /** 是否处于长按状态中 */
        public isInLongPress: boolean = false;
        public selectIds: any;
        // 副本类型
        public type: number = Game.PlayerInstanceSystem.curInstanceType;

        constructor() {
            super();
            this.skinName = "resource/skins/formation/Formate_ItemHero.exml";
            // this.groupMain.cacheAsBitmap = true;//item不能加位图缓存
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
                if (Game.PlayerInstanceSystem.curInstanceType == 0) {
                    if (this.data.isCanTouch) {
                        Game.EventManager.event(GameEvent.MOUSE_BEGIN, { generalId: this.data.generalId, index: -1 })
                    }
                } else {
                    if (this.data.isCanTouch) {
                        Game.EventManager.event(GameEvent.MOUSE_BEGIN, { generalId: this.data.generalId, index: -1 })
                    }
                    this.isInLongPress = false;
                    this.touchBeginTime = egret.setTimeout(this.onLongPress, this, 1000, this.data);// 超时触发（长按）
                }
            }, this);

            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, () => {
                egret.clearTimeout(this.touchBeginTime);// 注销超时触发
                Game.EventManager.event(GameEvent.DELAY_EXECUTE, { isInLongPress: this.isInLongPress });
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                egret.clearTimeout(this.touchBeginTime);
            }, this);

            Game.EventManager.on(GameEvent.FORMATE_REFRESH_LIST_ITEM, () => {
                this.dataChanged();
            }, this);

            this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
                Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, this);
        }

        public onLongPress(data: FormatChooseHeroData) {
            if (Teach.teachingNow == false && Game.TeachSystem.curPart != 3002 && Game.TeachSystem.curPart != 8023 && Game.TeachSystem.curPart != 1003) {
                this.isInLongPress = true;
                if (Game.PlayerHunterSystem.huntervis == true) {
                    Game.PlayerHunterSystem.huntervis = false;
                    loadUI(Common_ViewHeroDetail)
                        .then((dialog: Common_ViewHeroDetail) => {
                            Game.EventManager.event(GameEvent.DELAY_EXECUTE, { isInLongPress: this.isInLongPress });
                            dialog.setInfo(data.generalId, () => {
                                Game.PlayerHunterSystem.huntervis = true;
                            });
                            dialog.show(UI.SHOW_FROM_TOP);
                        });
                }
            }

        }

        public setIcon(data: FormatChooseHeroData) {
            closeCache(this.groupMain);
            let framePath = PlayerHunterSystem.Frame(data.generalId);
            this.imgFrame.source = cachekey(framePath, this);

            let iconPath = PlayerHunterSystem.Head(data.generalId);
            if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                this.imgIcon.source = cachekey("wx_" + iconPath, this);
            } else {
                this.imgIcon.source = cachekey(iconPath, this);
            }
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(data.generalId);
            let baseGeneralInfo = PlayerHunterSystem.Table(data.generalId);

            this.imgTopRight.source = cachekey(UIConfig.UIConfig_Arena.hunterFeatureType[baseGeneralInfo.features - 1], this)

            this.labelNum.text = hunterInfo.level.toString();
            Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);
            this.imgLetter.source = cachekey(UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude], this);

            let father = data.father;
            this.selectIds = father.getSelectGenIds();

            this.imgYuan.visible = false;
            this.imgTick.visible = false;
            this.imgShade.visible = false;
            this.SpriteDead.visible = false;
            data.isCanTouch = true;
            if (Object.keys(this.selectIds).length) {
                for (let [k, v] of HelpUtil.GetKV(this.selectIds)) {
                    // 如果选中则跳过
                    if (data.generalId == v.generalId) {
                        this.imgTick.visible = true;// V
                        //this.imgShade.visible = false;// 遮罩
                        this.imgShade.visible = true;
                        this.imgShade.alpha = 0;
                        this.imgShade.touchEnabled = false;
                        if (k % 8 < 4) {
                            this.imgTick.visible = true;
                            this.imgYuan.visible = false;
                        }
                        else {
                            this.imgYuan.visible = true;
                            this.imgTick.visible = false;
                        }
                        data.isCanTouch = false;
                        break;
                    }
                    if (data.generalId % CommonConfig.general_id_to_index_multiple == v.generalId % CommonConfig.general_id_to_index_multiple) {
                        this.imgTick.visible = false;
                        this.imgShade.visible = true;
                        this.imgShade.alpha = 1;
                        data.isCanTouch = false;
                        break;
                    }
                    //工会战
                    if (Game.PlayerLeagueSystem.Member != null && Game.PlayerInstanceSystem.curInstanceType == 24) {
                        this.bDead = Table.FindF(Game.PlayerLeagueSystem.Member.usedMatchGenerals, (_k, _v) => {
                            return _v == data.generalId;
                        });
                        if (this.bDead) {
                            data.isCanTouch = false;
                            this.imgShade.touchEnabled = true;
                            this.imgShade.visible = true;
                            this.SpriteDead.visible = true;
                        }
                    }
                }
            }
            setCache(this.groupMain);
        }

        protected dataChanged() {
            if (this.data.generalId == 0) {
                this.imgbg.visible = true;
                this.groupMain.visible = false;
                return;
            } else {
                this.imgbg.visible = false;
                this.groupMain.visible = true;
            }
            this.setIcon(this.data);
        }
    }

    export class FormatChooseHeroData {
        public generalId: number;
        public father: FormatChoose | CommonFormationPvpArena | CommonFormationPvpArenaB | HXH_CommonFormationPveGroupFigh | CommonFormationSet;
        public isCanTouch = true;
    }
}