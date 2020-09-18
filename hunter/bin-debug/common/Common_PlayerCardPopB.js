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
    // 物品卡片预览
    // wangshenzhuo
    // 2019/3/1
    var Common_PlayerCardPopB = (function (_super) {
        __extends(Common_PlayerCardPopB, _super);
        function Common_PlayerCardPopB() {
            var _this = _super.call(this) || this;
            _this.listAttributeData = new eui.ArrayCollection();
            _this.cur_tbl = [];
            _this.skinName = "resource/skins/common/Common_PlayerCardPopBSkin.exml";
            //物品遮罩
            _this.maskimage = new eui.Image;
            _this.maskimage.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.maskimage.horizontalCenter = 0;
            _this.maskimage.verticalCenter = 0;
            _this.groupMain.addChild(_this.maskimage);
            _this.maskimage.visible = false;
            return _this;
        }
        Common_PlayerCardPopB.prototype.SetInfo = function (id, count) {
            var _this = this;
            this.cur_tbl = [];
            var pieceTbl = zj.PlayerItemSystem.Table(id);
            this.cur_tbl = zj.TableItemPotato.Item(pieceTbl.compose_cards[1]);
            var ItemSet = zj.PlayerItemSystem.Set(id, 1, null);
            var bigFramePic = zj.PlayerCardSystem.GetItemFrame(this.cur_tbl.id);
            this.labelNumID.visible = false;
            this.imageIcon.source = zj.cachekey(ItemSet["Path"], this);
            this.maskimage.visible = true;
            this.imageIcon.mask = this.maskimage;
            this.imageFrame1.source = zj.cachekey(ItemSet.Frame, this);
            this.labelTextName.text = ItemSet.Info["name"];
            this.labelTextNum.text = ItemSet["Count"];
            this.labelTextOwn.text = ItemSet["Count"];
            this.labelTextType.text = zj.TextsConfig.TextsConfig_Hunter_Card.card_Piece;
            this.labelTextInfo.text = ItemSet.Info["des"];
            //卡片预览
            this.labelCardName.text = this.cur_tbl.name;
            this.labelCardNum.text = this.cur_tbl.num;
            this.imageCard.source = zj.cachekey(this.cur_tbl.paths, this);
            this.imageCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_small[this.cur_tbl.type], this);
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0)
                .then(function (display) {
                display.width = _this.groupClip.width;
                display.height = _this.groupClip.height;
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                display.x = _this.groupClip.width / 2;
                display.y = _this.groupClip.height / 2;
                _this.groupClip.addChild(display);
            })
                .catch(function (reason) {
                // toast(reason);
            });
            //添加星星
            zj.Helper.NodeStarByAlignLeft(this.groupStar, this.cur_tbl.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star);
            this.labelLevel.text = "1";
            this.labelCardDetails.text = this.cur_tbl.des;
            this.imageFrame.source = zj.cachekey(bigFramePic[1], this);
            //主属性
            var baseStr = zj.PlayerCardSystem.GetCardBaseAttri(this.cur_tbl.id, this.cur_tbl.star, 1);
            this.LabelAttriMain.text = baseStr[0].toString();
            this.groupFull.visible = true;
            this.groupAddAttri.y += 20;
            var baseStrFullNum = zj.PlayerCardSystem.GetCardBaseAttri(this.cur_tbl.id, zj.CommonConfig.card_max_star, zj.CommonConfig.card_star_max_level[zj.CommonConfig.card_star_max_level.length - 1]);
            this.labelAttriMainFull.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.card_full_attr, zj.CommonConfig.card_star_max_level[zj.CommonConfig.card_star_max_level.length - 1], baseStrFullNum[1]);
            var addStr = zj.PlayerCardSystem.GetAddStrNotGet(this.cur_tbl);
            this.listAttributeData.removeAll();
            for (var i = 0; i < addStr.length; i++) {
                var itemData = new zj.CardAttriItemData();
                itemData.index = i;
                itemData.info = addStr[i];
                itemData.width = this.listScroller.width;
                itemData.type = 1;
                this.listAttributeData.addItem(itemData);
            }
            this.listAttri.dataProvider = this.listAttributeData;
            this.listAttri.itemRenderer = zj.CardAttriItem;
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupMain);
        };
        //添加龙骨动画
        Common_PlayerCardPopB.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        return Common_PlayerCardPopB;
    }(zj.UI));
    zj.Common_PlayerCardPopB = Common_PlayerCardPopB;
    __reflect(Common_PlayerCardPopB.prototype, "zj.Common_PlayerCardPopB");
})(zj || (zj = {}));
//# sourceMappingURL=Common_PlayerCardPopB.js.map