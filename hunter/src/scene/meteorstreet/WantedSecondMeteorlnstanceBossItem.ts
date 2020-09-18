namespace zj {
    //WantedSecondMeteorlnstanceBossItem
    //hexiaowei
    // 2019/02/13
    export class WantedSecondMeteorlnstanceBossItem extends eui.ItemRenderer {
        public groupBoss: eui.Group;
        public imgHunterIcon: eui.Image;
        public imgHunterName: eui.Image;
        public imgbg: eui.Image;
        public labelBossDropInfo: eui.Label;
        public labelBossDropInfoB: eui.Label;
        public imageNew: eui.Image;
        public labelOpenLevel: eui.Label;
        public imgsuo: eui.Image;

        public bOpen: boolean;
        public constructor() {
            super();
            this.skinName = "resource/skins/meteorstreet/WantedSecondMeteorlnstanceBossItemSkin.exml";
            cachekeys(<string[]>UIResource["WantedSecondMeteorlnstanceBossItem"], null);

            this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
                Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, this);

        }

        protected dataChanged() {
            closeCache(this.groupBoss);
            let index = (this.data.tableWanted.wanted_id - 1) / 10000;
            if (this.data != null) {
                let textDrop = this.data.tableWanted.boss_drop_client;
                var strs = new Array()
                strs = textDrop.split("|");

                if (strs.length == 1) {
                    this.labelBossDropInfo.visible = false;
                    if (this.labelBossDropInfoB.y >= 198) {
                        this.labelBossDropInfoB.y -= 15;
                    }
                    this.labelBossDropInfoB.size = 21;
                    this.labelBossDropInfoB.text = strs[0];
                } else {
                    this.labelBossDropInfo.text = strs[0];
                    this.labelBossDropInfoB.text = strs[1];
                }
                this.imgHunterIcon.source = cachekey("ui_meteor_new_boss" + this.data.index + "-1_png", this); //cachekey(this.data.tableWanted.boss_head_client, this);
                this.imgHunterName.source = cachekey("ui_meteor_new_shilian" + this.data.index + "_png", this)// cachekey(this.data.tableWanted.boss_name_client, this);
            }

            // let limit_level = this.data.wanted_id;
            let limit_level = PlayerWantedSystem.GetLimitLevel(index);
            this.bOpen = false;
            if (limit_level <= CommonConfig.role_max_level) {
                this.bOpen = Game.PlayerInfoSystem.BaseInfo.level >= limit_level;
                this.labelOpenLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.open, limit_level);
            } else {
                this.bOpen = Table.FindK(Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, limit_level) != -1;
                let boosname = TextsConfig.TextsConfig_Comment.wanted_type[Math.floor(limit_level / 10000)];
                let part = limit_level % 100;
                this.labelOpenLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel2, boosname, part);
            }

            this.labelOpenLevel.visible = !this.bOpen;
            this.imgsuo.visible = !this.bOpen;
            // if(this.bOpen){
            let iconbool: boolean = Tips.GetSaveBoolForWantedNewOpen(this.data.index) && Game.PlayerInfoSystem.BaseInfo.level >= limit_level;
            this.imageNew.visible = iconbool;
            // }else{
            //    this.imageNew.visible = false;
            // }
            if (this.selected) {
                if (this.bOpen) {
                    this.imgbg.width = 278;
                    this.labelOpenLevel.size = 24;
                    this.imgHunterIcon.source = cachekey("ui_meteor_new_boss" + this.data.index + "-1_png", this);
                }
            } else {
                this.imgbg.width = 227;
                this.labelOpenLevel.size = 18;
                this.imgHunterIcon.source = cachekey("ui_meteor_new_boss" + this.data.index + "-2_png", this);
            }
            setCache(this.groupBoss);
        }
    }

    //子项数据源
    export class WantedSecondMeteorlnstanceBossItemData {
        index: number;
        //数据源
        tableWanted: TableWanted;
        father: WantedSecondMeteorstanceScene;
    }
}