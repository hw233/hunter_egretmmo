namespace zj {
    // 兑换码  关注公众号
    // wangshenzhuo
    // 2019-7-26

    export class AttentionGiftDialog extends Dialog {
        public imageBG: eui.Image;
        public buttonClose: eui.Button;
        public buttonCopy: eui.Button;

        public constructor() {
            super();
            this.skinName = "resource/skins/gift/AttentionGiftDialogSkin.exml";
            this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
            this.buttonCopy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonCopy, this);
        }

        public isFullScreen(){
            return true;
        }
        
        // 关闭按钮
        private onButtonClose() {
            this.close(UI.HIDE_TO_TOP);
            // let vis: boolean = true;
            // for (var key of Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType) {
            //     if (key == 10001) {
            //         vis = false;
            //     }
            // }
            // let isShow = vis && ActivityCollection.vis && ((Util.isWxMiniGame() && egret.Capabilities.os == "Android") || ActivityCollection.myBrowser() == "Safari" || (ActivityCollection.myBrowser() == "micromessenger" && egret.Capabilities.os == "iOS") || egret.Capabilities.os == "iOS");
            // if (isShow && !Teach.isDone(teachBattle.teachPartID_GiftBag)) {
            //     Teach.SetTeachPart(teachBattle.teachPartID_GiftBag);    
            // }
        }

        // 点击复制
        private onButtonCopy() {
            platform.setClipboardData("猎人世界");
        }

    }

}
