namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2019-1-26
     * 
     * @class 格斗场敌人Item.
     */
    export class ArenaRivalItem extends eui.ItemRenderer {
        public imgPan: eui.Image;
        public imgguang: eui.Image;
        public groupHunter: eui.Group;
        public labelRank: eui.BitmapLabel;
        public labelLevel: eui.Label;
        public labelName: eui.Label;
        public group1: eui.Group;
        public jewel: eui.Image;
        public labelRivalAwardNumber: eui.BitmapLabel;
        public group2: eui.Group;
        public labelPraise: eui.BitmapLabel;
        public btnFive: eui.Button;
        public labelTime: eui.BitmapLabel;
        public btnFight: eui.Button;
        public btnPraise: eui.Button;
        public groupButton: eui.Group;
        public label: eui.Label;
        private info = [];
        private vis: boolean = true;
        private jinbi: number;
        constructor() {
            super();

            this.skinName = "resource/skins/arena/ArenaRivalItemSkin.exml";
            cachekeys(<string[]>UIResource["ArenaRivalItem"], null);
            this.btnFive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFive, this);
            this.btnFight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFight, this);
            this.btnPraise.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPraise, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                this.groupHunter.removeChildren();
                egret.Tween.removeTweens(this);
            }, this)
            if (Device.isReviewSwitch) {
                this.jewel.x = 65;
                this.jewel.width = 40;
                this.jewel.height = 40;
            }
        }

        private onBtnFive() {
            (this.data as ArenaRivalItemData).father.onBtnFive(this.data);
        }

        private onBtnFight() {
            (this.data as ArenaRivalItemData).father.onBtnFight(this.data, this.info);
        }

        protected dataChanged() {
            let data = this.data as ArenaRivalItemData;
            if (this.vis) {
                this.vis = false;
                this.data.father.scroll.viewport.scrollH = 1450;
            }
            if (data.index <= 10) {
                this.labelRank.font = "arena2_fnt";
                if (data.index <= 3) {
                    this.imgguang.visible = true;
                } else {
                    this.imgguang.visible = false;
                }
                this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Arena.rankTip, data.info["rank"]);
                this.imgPan.source = cachekey("ui_arena_yuanhuan1_png", this);
            } else {
                this.imgPan.source = cachekey("ui_arena_yuanhuan2_png", this);
                this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Arena.rankTip, data.info.baseInfo.ladderRank);
                this.labelRank.font = "arena3_fnt";
                this.imgguang.visible = false;
            }
            if (data.info.baseInfo.id < 3000 && data.index <= 10) {
                // this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Arena.rankTip, data.index);
                this.labelName.text = "";
                this.labelLevel.text = "";
                this.group1.visible = false;
                this.group2.visible = false;
                this.groupButton.visible = false;
                this.label.visible = true;
                this.groupHunter.removeChildren();
                return;
            } else {
                this.group1.visible = true;
                this.group2.visible = true;
                this.groupButton.visible = true;
                this.label.visible = false;
            }
            this.loadKeel();
            if (data.info.baseInfo == null) return;

            if (data.index > 10) {
                this.btnFive.visible = true;
                this.btnFight.visible = true;
                this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Arena.rankTip, data.info.baseInfo.ladderRank);
                // this.imgPan.source = cachekey("ui_arena_yuanhuan2_png", this);
            } else {
                this.btnFive.visible = false;
                this.btnFight.visible = false;
                let info = Table.FindR(data.info1, (k, v) => {
                    return v.key == data.info["rank"];
                })[0];
                let str = "";
                let num = (info ? info.value : 0)
                if (num > 1000) {
                    str = (num / 1000).toFixed(1) + "千"
                } else if (num > 10000) {
                    str = (num / 10000).toFixed(1) + "万"
                } else {
                    str = num.toString();
                }
                this.labelPraise.text = str;
                // this.imgPan.source = cachekey("ui_arena_yuanhuan1_png", this);
                this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Arena.rankTip, data.info["rank"]);
                //是否点赞过
                let vis = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.praiseRanks, (k, v) => {
                    return v == data.info["rank"];
                })

                if (vis) {
                    this.btnPraise.enabled = false;
                } else {
                    this.btnPraise.enabled = true;
                }
            }

            this.labelLevel.text = "Lv: " + data.info.baseInfo.level;
            this.labelName.text = data.info.baseInfo.name;

            // 是否可以连续吊打
            let isFiveCombo = () => {
                let ret = false;
                let open = PlayerMissionSystem.FunOpenTo(FUNC.LADDERQUICK);
                let max = Game.PlayerInfoSystem.BaseInfo.ladderMax;
                let ladderRank = (max <= CommonConfig.ladder_quick_reward_rank && max != 0);
                if ((open || ladderRank) && this.itemIndex == 12) {
                    ret = true;
                }
                return ret;
            }

            let winGetToken = (info: message.RoleBriefInfo) => {
                let str = this.labelLevel.text + " " + this.labelName.text;
                this.info = [this.labelRank.text, str, data.info.baseInfo.id];
                let token = 0;
                if (Game.PlayerInfoSystem.BaseInfo.ladderMax == 0) {
                    Game.PlayerInfoSystem.BaseInfo.ladderMax = Game.PlayerInfoSystem.BaseInfo.ladderRank;
                }
                if (Game.PlayerInfoSystem.BaseInfo.ladderMax <= data.info.baseInfo.ladderRank) {
                    return token;
                }

                let ladderScores = TableLadderScore.Table();
                let max = Game.PlayerInfoSystem.BaseInfo.ladderMax;
                let oldInfo: TableLadderScore, newInfo: TableLadderScore;
                for (let k in ladderScores) {
                    if (ladderScores.hasOwnProperty(k)) {
                        let v = ladderScores[k];
                        if (v.rank_min < max && v.rank_max >= max) {
                            oldInfo = v;
                        }
                        if (v.rank_min < info.ladderRank && v.rank_max >= info.ladderRank) {
                            newInfo = v;
                        }
                    }
                }
                if (oldInfo == newInfo) {
                    token = (max - info.ladderRank) * oldInfo.reward_token;
                } else {
                    let middle = 0;
                    for (let i = oldInfo.id - 1; i > newInfo.id + 1; i--) {
                        let ladderInfo = ladderScores[i];
                        middle += (ladderInfo.rank_max - ladderInfo.rank_min) * ladderInfo.reward_token;
                    }
                    token = (max - oldInfo.rank_min) * oldInfo.reward_token + (newInfo.rank_max - info.ladderRank) * newInfo.reward_token + middle;
                }

                let vipInfo = Game.PlayerVIPSystem.vipInfo;
                if (vipInfo.pvpPower < 1 && token < 30) {
                    token = 30;
                }

                return Math.floor(token);
            }
            if (data.index > 10) {
                this.labelRank.font = "arena3_fnt";
                this.group1.visible = true;
                this.group2.visible = false;
                this.btnPraise.visible = false;
                this.imgguang.visible = false;
                if (isFiveCombo()) {
                    this.btnFight.visible = false;
                    this.btnFive.visible = true;
                    this.group1.visible = false;
                } else {
                    this.group1.visible = true;
                    this.btnFight.visible = true;
                    this.btnFive.visible = false;
                    this.labelTime.visible = false;
                    let token = winGetToken(data.info.baseInfo);
                    let str = "";
                    if (token > 1000) {
                        str = (token / 1000).toFixed(1) + "千"
                    } else if (token > 10000) {
                        str = (token / 10000).toFixed(1) + "万"
                    } else {
                        str = token.toString();
                    }
                    this.labelRivalAwardNumber.text = str;
                }
            } else {
                this.labelRank.font = "arena2_fnt";
                if (data.index <= 3) {
                    this.imgguang.visible = true;
                } else {
                    this.imgguang.visible = false;
                }
                this.group1.visible = false;
                this.group2.visible = true;
                this.btnPraise.visible = true;
            }
            if (Device.isReviewSwitch) {
                this.labelRank.visible = false;
                this.btnFight.visible = true;
                this.btnFive.visible = false;
                this.labelTime.visible = false;
            }
        }

        /**加载龙骨 */
        private loadKeel() {
            let maproleId = this.getMapRoleInfo(this.data.info.baseInfo);
            let info = TableMapRole.Item(maproleId).body_spx_id;
            let scale = TableMapRole.Item(maproleId).spine_scale * 0.8;
            let name = TableClientFightAniSpineSource.Item(info).atlas;
            let name1 = TableClientFightAniSpineSource.Item(info).ani_name;
            this.groupHunter.removeChildren();
            if (info != -1) {
                Game.DragonBonesManager.getArmatureDisplayAsync(this, name, "armatureName")
                    .then(display => {
                        display.scaleX = scale;
                        display.scaleY = scale;
                        setDragonBonesRemove(display);
                        // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                        //     display.animation.stop();
                        //     display.animation.reset();
                        //     display.armature.dispose();
                        //     display.dbClear();
                        //     display.dispose(true);
                        //     if (display.parent) display.parent.removeChild(display);
                        // }, null);
                        display.animation.play(name1, 0);
                        this.groupHunter.removeChildren();
                        this.groupHunter.addChild(display);
                    })
                    .catch(reason => {
                        toast(reason);
                    });
            }
        }

        private onBtnPraise() {
            let data = this.data as ArenaRivalItemData;
            let rank = 0;
            if (data.index > 10) {
                rank = data.info.baseInfo.ladderRank;
            } else {
                rank = data.info["rank"];
            }
            this.jinbi = Game.PlayerInfoSystem.Coin;
            Game.PlayerArenaSystem.ladderPraiseRank(rank)
                .then((body: message.LadderPraiseRankRespBody) => {
                    let value = Table.FindR(body.ladder_praise, (k, v: message.IIKVPairs) => {
                        return v.key == rank;
                    })[0];
                    // data.info["value"] = value.value;
                    let info = Table.FindR(data.info1, (k, v) => {
                        return v.key == rank;
                    });
                    if (info[0]) {
                        data.info1[info[1]].value = value.value;
                    } else {
                        let a = new message.IIKVPairs();
                        a.key = data.index;
                        a.value = value.value;
                        data.info1.push(a);
                    }
                    let str = "";
                    let num = value.value;
                    if (num > 1000) {
                        str = (num / 1000).toFixed(1) + "千"
                    } else if (num > 10000) {
                        str = (num / 10000).toFixed(1) + "万"
                    } else {
                        str = num.toString();
                    }
                    this.labelPraise.text = str;
                    this.btnPraise.enabled = false;
                    let jinbi = new message.GoodsInfo();
                    jinbi.goodsId = 20001;
                    jinbi.count = Game.PlayerInfoSystem.Coin - this.jinbi;
                    loadUI(CommonGetDialog)
                        .then((dialog: CommonGetDialog) => {
                            dialog.init([jinbi]);
                            dialog.show();
                        });
                })
        }

        private getMapRoleInfo(info) {
            let picTable = TableItemPic.Table();
            let picMapRoleId = picTable[info.picId].mapRole_id;
            let fashionMapRoleInfo = TableItemFashion.Item(info.fashion_id);
            let fashionMapRoleId = null;
            if (fashionMapRoleInfo != null) {
                fashionMapRoleId = fashionMapRoleInfo.fashion_roleId;
            }
            return fashionMapRoleId || picMapRoleId;
        }
    }

    export class ArenaRivalItemData {
        info: message.SimpleRoleFormationInfo | message.RankBaseItemInfo;
        info1: Array<message.IIKVPairs>;
        father: ArenaLadder;
        rivalCount: number;
        index: number;
    }
}