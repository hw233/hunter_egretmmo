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
    //WantedSecondMeteorlnstanceBossItem
    //hexiaowei
    // 2019/02/13
    var WantedSecondMeteorlnstanceBossItem = (function (_super) {
        __extends(WantedSecondMeteorlnstanceBossItem, _super);
        function WantedSecondMeteorlnstanceBossItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/meteorstreet/WantedSecondMeteorlnstanceBossItemSkin.exml";
            zj.cachekeys(zj.UIResource["WantedSecondMeteorlnstanceBossItem"], null);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, _this);
            return _this;
        }
        WantedSecondMeteorlnstanceBossItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupBoss);
            var index = (this.data.tableWanted.wanted_id - 1) / 10000;
            if (this.data != null) {
                var textDrop = this.data.tableWanted.boss_drop_client;
                var strs = new Array();
                strs = textDrop.split("|");
                if (strs.length == 1) {
                    this.labelBossDropInfo.visible = false;
                    if (this.labelBossDropInfoB.y >= 198) {
                        this.labelBossDropInfoB.y -= 15;
                    }
                    this.labelBossDropInfoB.size = 21;
                    this.labelBossDropInfoB.text = strs[0];
                }
                else {
                    this.labelBossDropInfo.text = strs[0];
                    this.labelBossDropInfoB.text = strs[1];
                }
                this.imgHunterIcon.source = zj.cachekey("ui_meteor_new_boss" + this.data.index + "-1_png", this); //cachekey(this.data.tableWanted.boss_head_client, this);
                this.imgHunterName.source = zj.cachekey("ui_meteor_new_shilian" + this.data.index + "_png", this); // cachekey(this.data.tableWanted.boss_name_client, this);
            }
            // let limit_level = this.data.wanted_id;
            var limit_level = zj.PlayerWantedSystem.GetLimitLevel(index);
            this.bOpen = false;
            if (limit_level <= zj.CommonConfig.role_max_level) {
                this.bOpen = zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level;
                this.labelOpenLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.open, limit_level);
            }
            else {
                this.bOpen = zj.Table.FindK(zj.Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, limit_level) != -1;
                var boosname = zj.TextsConfig.TextsConfig_Comment.wanted_type[Math.floor(limit_level / 10000)];
                var part = limit_level % 100;
                this.labelOpenLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel2, boosname, part);
            }
            this.labelOpenLevel.visible = !this.bOpen;
            this.imgsuo.visible = !this.bOpen;
            // if(this.bOpen){
            var iconbool = zj.Tips.GetSaveBoolForWantedNewOpen(this.data.index) && zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level;
            this.imageNew.visible = iconbool;
            // }else{
            //    this.imageNew.visible = false;
            // }
            if (this.selected) {
                if (this.bOpen) {
                    this.imgbg.width = 278;
                    this.labelOpenLevel.size = 24;
                    this.imgHunterIcon.source = zj.cachekey("ui_meteor_new_boss" + this.data.index + "-1_png", this);
                }
            }
            else {
                this.imgbg.width = 227;
                this.labelOpenLevel.size = 18;
                this.imgHunterIcon.source = zj.cachekey("ui_meteor_new_boss" + this.data.index + "-2_png", this);
            }
            zj.setCache(this.groupBoss);
        };
        return WantedSecondMeteorlnstanceBossItem;
    }(eui.ItemRenderer));
    zj.WantedSecondMeteorlnstanceBossItem = WantedSecondMeteorlnstanceBossItem;
    __reflect(WantedSecondMeteorlnstanceBossItem.prototype, "zj.WantedSecondMeteorlnstanceBossItem");
    //子项数据源
    var WantedSecondMeteorlnstanceBossItemData = (function () {
        function WantedSecondMeteorlnstanceBossItemData() {
        }
        return WantedSecondMeteorlnstanceBossItemData;
    }());
    zj.WantedSecondMeteorlnstanceBossItemData = WantedSecondMeteorlnstanceBossItemData;
    __reflect(WantedSecondMeteorlnstanceBossItemData.prototype, "zj.WantedSecondMeteorlnstanceBossItemData");
})(zj || (zj = {}));
//# sourceMappingURL=WantedSecondMeteorlnstanceBossItem.js.map