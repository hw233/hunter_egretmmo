namespace zj {
    /**
     * 2019.11.19
     * xingliwei
     * @class 天空竞技场左侧Item
     */
    export class SkyAreanMainItem extends eui.ItemRenderer {

        private group1: eui.Group;
        private imgFrame1: eui.Image;
        private imgIcon1: eui.Image;
        private imgBg1: eui.Image;
        private imgpass1: eui.Image;
        private imgLock1: eui.Image;
        private group11: eui.Group;
        private imgAward1: eui.Image;
        private labelQuantity1: eui.BitmapLabel;
        private labelTier1: eui.Label;
        private imgsuo1: eui.Image;
        private group2: eui.Group;
        private imgFrame2: eui.Image;
        private imgIcon2: eui.Image;
        private imgBg2: eui.Image;
        private imgpass2: eui.Image;
        private imgLock2: eui.Image;
        private group22: eui.Group;
        private imgAward2: eui.Image;
        private labelQuantity2: eui.BitmapLabel;
        private labelTier2: eui.Label;
        private imgsuo2: eui.Image;

        private info;
        public constructor() {
            super();
            this.skinName = "resource/skins/skyArean/SkyAreanMainItemSkin.exml";
            cachekeys(<string[]>UIResource["SkyAreanMainItem"], this);
            this.imgIcon1.mask = this.imgBg1;
            this.imgIcon2.mask = this.imgBg2;
            this.info = TableTower.Table() //[key.toString()]
            this.group1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.data.father.buttonAward(this.data.father.floorInfo[0].length - this.data.index * 2 - 2) }, this);
            this.group2.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.data.father.buttonAward(this.data.father.floorInfo[0].length - this.data.index * 2 - 3) }, this);
            this.group11.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
                let a = new message.GoodsInfo();
                a.goodsId = this.data.info.first_reward[0][0];
                a.count = this.data.info.first_reward[0][1];
                Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: a, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY })
            }, this);
            this.group22.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
                let a = new message.GoodsInfo();
                a.goodsId = this.data.info1.first_reward[0][0];
                a.count = this.data.info1.first_reward[0][1];
                Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: a, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY })
            }, this);
        }

        protected dataChanged() {
            let data = this.data as SkyAreanMainItemData;
            if (data.info != null) {
                this.group1.visible = true;
                this.labelTier1.text = "第" + (data.index * 2 + 1) + "层";
                let info1 = data.info
                let itemSet1 = PlayerItemSystem.Set(info1.first_reward[0][0], 1, info1.first_reward[0][1]);
                this.imgIcon1.source = cachekey(TableMapRole.Item(this.data.info.boss_roleId[1]).head_path, this);
                this.labelQuantity1.text = ("x" + Set.NumberUnit2(info1.first_reward[0][1]));
                this.imgAward1.source = cachekey(itemSet1.Clip, this);
                if (data.index * 2 + 1 > Game.PlayerTowerSystem.towerInfo.towerCur) { //未通关
                    this.imgLock1.visible = true;
                    this.imgLock1.source = cachekey("ui_skyarean_biaoqian1_png", this);
                    this.imgpass1.visible = false;
                    this.imgFrame1.source = cachekey("ui_skyarean_touxiangkuang1_png", this);
                    this.imgLock1.visible = false;
                    this.imgsuo1.visible = true;
                } else if (data.index * 2 + 1 < Game.PlayerTowerSystem.towerInfo.towerCur) { //已通关
                    this.imgpass1.visible = true;
                    this.imgsuo1.visible = false;
                    this.imgLock1.visible = false;
                    this.imgFrame1.source = cachekey("ui_skyarean_touxiangkuang3_png", this);
                } else {
                    this.imgpass1.visible = false;
                    this.imgLock1.visible = true;
                    this.imgsuo1.visible = false;
                    this.imgLock1.source = cachekey("ui_skyarean_biaoqian2_png", this);
                    this.imgFrame1.source = cachekey("ui_skyarean_touxiangkuang2_png", this);
                }
            } else {
                this.group1.visible = false;
            }

            if (data.info1 != null) {
                this.group2.visible = true;
                this.labelTier2.text = "第" + (data.index * 2 + 2) + "层";
                let info2 = data.info1;
                let itemSet2 = PlayerItemSystem.Set(info2.first_reward[0][0], 1, info2.first_reward[0][1]);
                this.imgIcon2.source = cachekey(TableMapRole.Item(data.info1.boss_roleId[1]).head_path, this);
                this.imgAward2.source = cachekey(itemSet2.Clip, this);
                this.labelQuantity2.text = ("x" + Set.NumberUnit2(info2.first_reward[0][1]));
                if (data.index * 2 + 2 > Game.PlayerTowerSystem.towerInfo.towerCur) {//未通关
                    this.imgFrame2.source = cachekey("ui_skyarean_touxiangkuang1_png", this);
                    this.imgLock2.source = cachekey("ui_skyarean_biaoqian1_png", this);
                    this.imgLock2.visible = false;
                    this.imgpass2.visible = false;
                    this.imgsuo2.visible = true;
                } else if (data.index * 2 + 2 < Game.PlayerTowerSystem.towerInfo.towerCur) {//已通关
                    this.imgpass2.visible = true;
                    this.imgsuo2.visible = false;
                    this.imgLock2.visible = false;
                    this.imgFrame2.source = cachekey("ui_skyarean_touxiangkuang3_png", this);
                } else {
                    this.imgFrame2.source = cachekey("ui_skyarean_touxiangkuang2_png", this);
                    this.imgLock2.source = cachekey("ui_skyarean_biaoqian2_png", this);
                    this.imgLock2.visible = true;
                    this.imgpass2.visible = false;
                    this.imgsuo2.visible = false;
                }
            } else {
                this.group2.visible = false;
            }
        }
    }
    //子项数据源
    export class SkyAreanMainItemData {
        index: number;
        info: TableTower;
        info1: TableTower;
        father: SkyAreanMainScene;
    }
}