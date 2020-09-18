namespace zj {
    //TavernGetGeneral
    //hexiaowei
    // 2018/11/15
    export class TavernGetGeneral extends UI {
        private imageHunTypes: eui.Image;
        private imageHun: eui.Image;
        private labelHunExplain: eui.Label;
        private imageHunName: eui.Image;
        private imageHunLevel: eui.Image;

        private image1: eui.Image;
        private image2: eui.Image;
        private image3: eui.Image;
        private image4: eui.Image;
        private imageBg: eui.Image;

        private group1: eui.Group;
        private groupParent: eui.Group;
        private groupHunterAnimation: eui.Group;
        private labelCloseTheTip: eui.Group;

        private goodid: number;
        private type: number;
        private num: number = 0;
        private init_star: number;//星级
        private tavern: TavernScene;
        private callBack: () => void;

        /**判断是否是从合成点进来 */
        private vis: boolean = false;

        public constructor() {
            super();
            this.skinName = "resource/skins/tavern/TavernGetGeneralSkin.exml";
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.Tween.removeTweens(this.labelCloseTheTip); // 因为是循环播放，需要特别处理
                egret.Tween.removeTweens(this);
            }, null);

            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            //this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClose, this);
            this.groupParent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupParent, this);
            Game.DragonBonesManager.playAnimation(this, "ui_jiuguan_zhaomu", "armatureName", null, 0)
                .then(display => {
                    display.x = UIManager.StageWidth / 2;
                    display.y = UIManager.StageHeight / 2;
                    this.groupParent.addChild(display);
                    //this.addAnimatoinnew("ui_jiuguan_zhaomu");
                })
                .catch(reason => {
                    toast(reason);
                });
            this.image1.visible = false;
            this.image2.visible = false;
            this.image3.visible = false;
            this.image4.visible = false;
            this.imageHunLevel.visible = false;
            //点击任意区域关闭
            egret.Tween.get(this.labelCloseTheTip, { loop: true })
                .to({ alpha: 1 }, 1000)
                .to({ alpha: 0 }, 1000)
            //this.SetInfoAni(this.init_star);
        }

        public init(tavern) {
            Game.SoundManager.playEffect(this.SoundOpen(30012), 100);
            this.tavern = tavern;
        }

        private info(dbName: string, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", armatureName, 0)
                .then(display => {
                    display.x = 50;
                    display.y = 220;
                    this.groupHunterAnimation.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        public setInfo(heroId: number, type?: number, num?: number, vis?: boolean, cb?: () => void) {

            this.goodid = heroId;
            this.type = type;
            this.num = num;
            this.callBack = cb;
            if (vis != null) {
                this.vis = vis;
            }
            let infonew = PlayerHunterSystem.Table(heroId)
            let general_roleId = PlayerHunterSystem.Table(heroId).general_roleId;
            let body_spx_id = PlayerHunterSystem.MapInstance(general_roleId).body_spx_id;
            let animationUrl = TableClientFightAniSpineSource.Item(body_spx_id).json;
            var strs = new Array()
            strs = animationUrl.split("/");
            let animationPracticalUrl = strs[strs.length - 1].split(".")[0];
            //let animationPracticalUrl ="wj_004_kaite";
            //this.info(animationPracticalUrl)
            this.info(animationPracticalUrl, "0001_daiji");

            //猎人头像
            //let head_path=PlayerHunterSystem.MapInstance(general_roleId).head_path;
            this.imageHunTypes.source = cachekey(UIConfig.UIConfig_General.hunter_type3[PlayerHunterSystem.Table(heroId).features], this);
            let aptitude = PlayerHunterSystem.Table(heroId).aptitude
            this.imageHunLevel.source = cachekey(UIConfig.UIConfig_General.hunter_grade[aptitude], this); //品级（A-S）
            if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                this.imageHunName.source = cachekey("wx_" + infonew.name_pic, this);
            } else {
                this.imageHunName.source = cachekey(infonew.name_pic, this);
            }

            this.init_star = infonew.init_star;//初始星级
            let pingzhi = infonew.init_quality;//初始品质
            this.labelHunExplain.text = infonew.extra;
            let roleId = PlayerHunterSystem.Table(heroId).general_roleId
            let path = PlayerHunterSystem.MapInstance(roleId).half_path
            this.imageHun.source = cachekey(path, this);
            this.setInfoAnitest(infonew.init_star);
            let generalTbl = PlayerHunterSystem.Table(heroId).general_roleId;
            let soundnum = TableMapRole.Item(generalTbl).taici_dub_sound;
            // Game.SoundManager.playMusic(this.SoundOpen(soundnum) , 1);
            Game.SoundManager.playEffect(this.SoundOpen(soundnum), 250);
            if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                this.imageBg.source = cachekey("wx_ui_tavern_BoardGetHunter_png", this);
            }

        }

        private setInfoAnitest(num: number) {
            for (let i = 1; i <= num + 1; i++) {
                egret.Tween.get(this)
                    .wait(300 * i, true)
                    .call(() => {
                        if (i == num + 1) {
                            this.imageHunLevel.visible = true;
                            Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                        } else {
                            this[`image${i}`].visible = true;
                        }
                    })
            }
            /*
            egret.Tween.get(this)
                    .wait(1000*num,true)
                    .call(()=>{ this.imageHunLevel.visible=true; })
            */
        }

        private setInfoAni(num: number) {
            for (let i = 1; i <= num; i++) {
                egret.Tween.get(this)
                    .wait(1000 * i, true)
                    .call(() => { this[`image${i}`].visible = true; })
            }
        }

        public onGroupParent() {
            //this.tavern.removeChild(this);
            if (this.vis == false) {
                this.close();
                if (this.callBack) {
                    this.callBack();
                }
                let goodid = this.goodid;
                if (this.num != null) {
                    this.tavern.onEarnPointOne(goodid, this.type, this.num);
                } else {
                    this.tavern.onEarnPoint(2, goodid, this.type, this.num);
                }
            } else {
                this.close(UI.HIDE_TRAIL_OFF);//从大变小
                if (this.callBack) {
                    this.callBack();
                }
            }

        }

        public SoundOpen(id) {
            let sound = TableClientSoundResource.Item(id);
            let textDrop = sound.sound_path;
            let strs = new Array()
            strs = textDrop.split("/");
            let soundtext = strs[2];
            soundtext = soundtext.replace('.', '_');
            return soundtext;
        }

        public onClose() {
            this.close();
        }
    }

}