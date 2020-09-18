var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    /**
     * @class ActivitySpecislShare 邀请好友
     *
     * @author Yu Qingchao
     *
     * 2019.07.30
     */
    var ActivitySpecialShare = (function (_super) {
        __extends(ActivitySpecialShare, _super);
        // private imgTip: eui.Image;
        // private lstTableViewShare: eui.List;
        // private arrTableViewShare: eui.ArrayCollection;
        // private btnSubmit: eui.Button;
        // private shareUrl;
        function ActivitySpecialShare() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivitySpecislShareSkin.exml";
            // this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSubmit, this);
            _this.InitShareInfo();
            return _this;
        }
        ActivitySpecialShare.prototype.init = function () {
            // Game.EventManager.event(GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
            // this.InitListener();
        };
        //分享
        ActivitySpecialShare.prototype.onBtnSubmit = function () {
            // let num: number = Object.keys(TextsConfig.TextsConfig_Share.ShareTexts).length;//分享图片数组的长度
            // let a = Math.floor(Math.random() * num);//随机数，随机抽取一套分享资源
            // let shareUrl: string = Game.PlayerMixUnitInfoSystem.mixunitinfo.share_url;
            // let functionShare = () => {
            // 	let url = shareUrl.substring(7, 13);
            // 	platform.share(TextsConfig.TextsConfig_Share.ShareTexts[a], AppConfig.ProjectUrlRoot + UIConfig.UIConfig_Special.shareImg[a], AppConfig.ProjectUrlRoot + "index.html", `url=${url}`);
            // }
            // if (shareUrl == "") {
            // 	Game.PlayerActivitySystem.PublishShareInfo().then((data: message.PublishShareInfoRespBody) => {
            // 		shareUrl = data.url;
            // 		Game.PlayerActivitySystem.ShareUrl(shareUrl).then(() => {
            // 		}).catch(reason => { });
            // 		functionShare();
            // 	});
            // } else {
            // 	functionShare();
            // }
        };
        ActivitySpecialShare.prototype.InitShareInfo = function () {
            // Game.PlayerActivitySystem.shareInfo = [];
            // let tbl = Game.ConfigManager.getTable(StringConfig_Table.shareTable + ".json");
            // for (let k in tbl) {
            // 	let v = tbl[k];
            // 	let info = [];
            // 	info.push(v.count, v.reward_goods, v.reward_count);
            // 	if (Game.PlayerActivitySystem.shareInfo[v["type"] - 1] == null) {
            // 		Game.PlayerActivitySystem.shareInfo[v["type"] - 1] = [];
            // 	}
            // 	Game.PlayerActivitySystem.shareInfo[v["type"] - 1].push(info);
            // }
        };
        ActivitySpecialShare.prototype.InitListener = function () {
            // this.arrTableViewShare = new eui.ArrayCollection();
            // for (let i = 0; i < Game.PlayerActivitySystem.shareInfo.length; i++) {
            // 	this.arrTableViewShare.addItem({
            // 		i,
            // 		father: this,
            // 	})
            // }
            // this.lstTableViewShare.dataProvider = this.arrTableViewShare;
            // this.lstTableViewShare.itemRenderer = ActivitySpecialShareItem;
        };
        return ActivitySpecialShare;
    }(zj.UI));
    zj.ActivitySpecialShare = ActivitySpecialShare;
    __reflect(ActivitySpecialShare.prototype, "zj.ActivitySpecialShare");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpecialShare.js.map