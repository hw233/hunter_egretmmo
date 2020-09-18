namespace zj {
    // 签到item
    // lizhengiang
    // 20190320
    export class AwardSignItem extends eui.ItemRenderer {
        private btnSign: eui.Button;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private groupClip: eui.Group;
        private lbNum: eui.BitmapLabel;
        private lbDay: eui.Label;
        private imgOrn: eui.Image;
        private imgShadow: eui.Image;
        private imgHook: eui.Image;

        private day: number;

        private cacheGroup: eui.Group;

        public constructor() {
            super();
            this.skinName = "resource/skins/award/AwardSignItemSkin.exml";
            cachekeys(<string[]>UIResource["AwardSignItem"], null);
            this.btnSign.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSign, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
        }

        protected dataChanged() {
            this.groupClip.removeChildren();
            this.day = this.data;
            this.refreshInfo();
        }

        private refreshInfo = () => {
            closeCache(this.cacheGroup);

            let info = ServerTableSign.Item(this.data);
            let itemSet = PlayerItemSystem.Set(info.good_id, info.show_type, info.good_count);

            this.imgFrame.source = cachekey(itemSet.Frame, this);
            this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(info.good_id), this);
            this.lbNum.text = info.good_count.toString();

            this.groupClip.visible = false;
            if (info.show_type != 0) {
                this.groupClip.visible = true;
                Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(display => {
                    this.groupClip.addChild(display);
                }).catch(reason => {
                    toast(reason);
                });
            }

            this.btnSign.touchEnabled = false;
            let str = Helper.StringFormat(TextsConfig.TextsConfig_Award.day, this.day);
            let infoa = Game.PlayerMixUnitInfoSystem.mixunitinfo;
            //判断是否可领取
            if (!Game.PlayerMixUnitInfoSystem.mixunitinfo.is_signToday && this.day == Game.PlayerMixUnitInfoSystem.mixunitinfo.sign_time + 1) {
                str = TextsConfig.TextsConfig_Award.click;
                this.btnSign.touchEnabled = true;
                this.imgOrn.visible = true;
                Set.ButtonBackgroud(this.btnSign, "ui_acitivity_signin_rili2_png", "ui_acitivity_signin_rili2_png");
                this.lbDay.textColor = 0xffffff;
            } else {
                Set.ButtonBackgroud(this.btnSign, "ui_acitivity_signin_rili1_png", "ui_acitivity_signin_rili1_png")
                this.imgOrn.visible = false;
                this.lbDay.textColor = 0x228935;
            }
            this.lbDay.textFlow = Util.RichText(str);
            let bSign: boolean = (this.day <= Game.PlayerMixUnitInfoSystem.mixunitinfo.sign_time);
            this.imgShadow.visible = bSign;
            this.imgHook.visible = bSign;

            setCache(this.cacheGroup);
        }

        private onShowGoodProperty(e: egret.TouchEvent) {
            if (this.btnSign.touchEnabled) {
                this.onBtnSign();
                return;
            }
            let info = ServerTableSign.Item(this.data);
            let goodsInfo: message.GoodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = info.good_id;
            goodsInfo.count = info.good_count;
            goodsInfo.showType = info.show_type;
            Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        }

        private onBtnSign() {
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.is_signToday) return;

            Game.PlayerSignSystem.sign().then((msg: message.SignRespBody) => {
                Tips.SetTipsOfId(Tips.TAG.AWARD, Tips.TAG.AWARD_SIGN);
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.show();
                        dialog.init(msg.gameInfo.getGoods);
                        dialog.setCB(this.refreshInfo);
                    });

                Game.EventManager.event(GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
            });
        }

    }
}