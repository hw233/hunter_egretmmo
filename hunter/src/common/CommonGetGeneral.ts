namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2019-1-22
     * 
     * @class 获得猎人动画界面
     */
    export class CommonGetGeneral extends Dialog {
        private groupAnimation: eui.Group;
        private imgType: eui.Image;
        private imgHunter: eui.Image;
        private labelHunterExplain: eui.Label;
        private imgHunterName: eui.Image;
        private imgHunterLevel: eui.Image;
        private groupHunterAnimation: eui.Group;
        private labelCloseTheTip: eui.Label;
        private callback: Function;
        private imageBg: eui.Image;

        constructor() {
            super();
            this.skinName = "resource/skins/common/CommonGetGeneralSkin.exml";
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.Tween.removeTweens(this.labelCloseTheTip); // 因为是循环播放，需要特别处理
            }, null);

            // this.width = UIManager.StageWidth;
            // this.height = UIManager.StageHeight;

            for (let i = 1; i < 6; i++) {
                this[`img${i}`].visible = false;
            }
            this.imgHunterLevel.visible = false;

            Game.DragonBonesManager.playAnimation(this, "ui_jiuguan_zhaomu", "armatureName", null, 0)
                .then(display => {
                    this.groupAnimation.addChild(display);
                });
        }

        public setInfo(generalId: number, sould?: number, cb?: Function, info?, trasfer?: number) {
            this.callback = cb;
            Game.SoundManager.playEffect(this.SoundOpen(30012), 300);
            let baseGeneralInfo = PlayerHunterSystem.Table(generalId);
            let transfer_level = Game.PlayerHunterSystem.GeneralTransferLevel(generalId);
            let half_path = TableMapRole.Item(baseGeneralInfo.general_roleId).half_path;
            let typePath = UIConfig.UIConfig_General.hunter_type3[baseGeneralInfo.features];
            let levelPath = UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude]; //品级（A-S）
            let picRoleInfo: any;
            let tranferInfo: any;

            if (transfer_level && transfer_level > 0) {
                tranferInfo = TableGeneralTransfer.Item(PlayerHunterSystem.GetGeneralId(Number(generalId))) //PlayerHunterSystem.Table(generalId , transfer_level);
                picRoleInfo = TableMapRole.Item(tranferInfo.transfer_role);
                half_path = picRoleInfo.half_path;
                this.imgHunterName.source = cachekey(tranferInfo.name_pic, this);
            } else {
                this.imgHunterName.source = cachekey(baseGeneralInfo.name_pic, this);
            }

            let transfer = Game.PlayerHunterSystem.GeneralTransferLevel(generalId);
            let general_roleId: number;
            let body_spx_id: number;
            if (transfer > 0) {
                let info_gnr = TableGeneralTransfer.Item(PlayerHunterSystem.GetGeneralId(Number(generalId)))//PlayerHunterSystem.Table(generalId, transfer);
                let info_map = TableMapRole.Item(info_gnr.transfer_role);
                body_spx_id = info_map.body_spx_id;
            } else {
                general_roleId = baseGeneralInfo.general_roleId;
                body_spx_id = PlayerHunterSystem.MapInstance(general_roleId).body_spx_id;
            }

            let animationUrl = TableClientFightAniSpineSource.Item(body_spx_id).json;
            var strs = new Array()
            strs = animationUrl.split("/");
            let animationPracticalUrl = strs[strs.length - 1].split(".")[0];
            this.playHunterAnimation(animationPracticalUrl);

            this.labelHunterExplain.text = baseGeneralInfo.extra;
            this.imgHunter.source = cachekey(half_path, this);
            this.imgType.source = cachekey(typePath, this);
            this.imgHunterLevel.source = cachekey(levelPath, this);

            if (Device.isReviewSwitch && Util.isWxMiniGame) {
                this.imageBg.source = cachekey("wx_ui_tavern_BoardGetHunter_png", this);
            }

            this.playStarAnimation(1, baseGeneralInfo.init_star);
            let generalTbl = PlayerHunterSystem.Table(generalId, trasfer).general_roleId;
            let soundnum = TableMapRole.Item(generalTbl).taici_dub_sound;
            Game.SoundManager.playEffect(this.SoundOpen(soundnum), 500);

            egret.setTimeout(this.playTipAnimation, this, 1500);

            if (generalId == 10022) {
                this.imgHunter.left = -120;
                this.imgHunter.scaleX = 1.1;
                this.imgHunter.scaleY = 1.1;
            }
            if (info != null) {
                if (Table.FindK(info, PlayerHunterSystem.Table(generalId, trasfer).general_id) != -1) {

                } else {
                    // loadUI(TavernGetGeneralPop)
                    //     .then((taverngetgeneralpop: TavernGetGeneralPop) => {
                    //         taverngetgeneralpop.init(this);
                    //         egret.Tween.get(taverngetgeneralpop.group1)
                    //             //.wait(500,false)
                    //             .call(() => {
                    //                 let info = new message.GoodsInfo();
                    //                 info.goodsId = generalId;
                    //                 taverngetgeneralpop.setInof(info);
                    //                 this.addChild(taverngetgeneralpop);
                    //             })
                    //             .to({ alpha: 1 }, 100)
                    //             .to({ y: 10 }, 150, egret.Ease.sineInOut)
                    //             .wait(300, false)
                    //             .to({ y: -10 }, 150, egret.Ease.sineInOut)
                    //             .wait(300, false)
                    //             .call(() => { taverngetgeneralpop.onGroupParent(); }) 
                    //             .call(() => {
                    //             }, this);
                    //     });
                }
            }
        }

        private playHunterAnimation(dbName: string) {
            Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", "0001_daiji", 0)
                .then(display => {
                    if (dbName == "wj_032_xisuo") {
                    }
                    display.x = 50;
                    display.y = 220;
                    this.groupHunterAnimation.addChild(display);
                });
        }

        private playTipAnimation() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

            egret.Tween.get(this.labelCloseTheTip, { loop: true })
                .to({ alpha: 1 }, 1000)
                .to({ alpha: 0 }, 1000)
        }

        private playStarAnimation(current: number, total: number) {
            let callOneStar = (index: number) => {
                egret.Tween.get(this[`img${index}`]).call(() => {
                    this[`img${index}`].visible = true;
                }).to({ scaleX: 4, scaleY: 4 }, 0).
                    to({ scaleX: 0.9, scaleY: 0.9 }, 120).
                    to({ scaleX: 1.0, scaleY: 1.0 }, 100).
                    wait(index * 100 + 150).
                    call(() => {
                        this.playStarAnimation(index + 1, total);
                    });
            }
            let calGrade = () => {
                egret.Tween.get(this.imgHunterLevel).call(() => {
                    this.imgHunterLevel.visible = true;
                    Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                }).to({ scaleX: 5, scaleY: 5 }, 0).
                    to({ scaleX: 0.9, scaleY: 0.9 }, 150).
                    to({ scaleX: 1.0, scaleY: 1.0 }, 150);
            }

            if (current > total) {
                calGrade();
            } else {
                callOneStar(current);
            }
        }

        private onClose() {
            if (this.callback) this.callback();

            this.close();
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
    }

}