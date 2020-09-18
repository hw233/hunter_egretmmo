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
     * 升星界面右侧Item
     * created by Lian Lei
     * 2018.12.05
     */
    var CardUpStarNewItemB = (function (_super) {
        __extends(CardUpStarNewItemB, _super);
        function CardUpStarNewItemB() {
            var _this = _super.call(this) || this;
            _this.id = null;
            _this.skinName = "resource/skins/card/CardUpStarNewItemBSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            zj.cachekeys(zj.UIResource["CardUpStarNewItemB"], null);
            _this.groupIcon.visible = false;
            _this.imgLock.visible = false;
            _this.imgNode.visible = true;
            _this.imgIconStar.visible = false;
            return _this;
        }
        CardUpStarNewItemB.prototype.setInfo = function (id, father, cb) {
            this.father = father;
            this.cardInfo = this.father.cardInfo;
            if (this.cardInfo) {
                this.index = this.cardInfo.index;
            }
            this.groupIcon.visible = false;
            this.imgLock.visible = false;
            this.imgNode.visible = true;
            this.imgIconStar.visible = false;
            this.id = id;
            this.cb = cb;
        };
        // 点击调用 取消选择升星材料 回调函数
        CardUpStarNewItemB.prototype.onTap = function () {
            if (this.index > 0 && this.cb != null) {
                this.cb(this.cardIndex);
            }
        };
        //刷新右侧卡片显示信息
        CardUpStarNewItemB.prototype.setFresh = function (info) {
            // info = -1 显示锁
            if (info == -1) {
                this.cardInfo == null;
                this.groupIcon.visible = false;
                this.imgLock.visible = true;
                this.imgIconStar.visible = false;
                this.imgNode.visible = false;
            }
            else if (info == 0) {
                this.cardInfo = null;
                this.groupIcon.visible = false;
                this.imgLock.visible = false;
                this.imgIconStar.visible = true;
                if (this.father.cardInfo.star == null) {
                    this.imgIconStar.visible = false;
                }
                else {
                    this.imgIconStar.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_upstar_bottom[this.father.cardInfo.star - 1], this);
                }
                this.imgNode.visible = false;
            }
            else if (info) {
                this.cardInfo = info;
                this.cardIndex = info.index;
                this.groupIcon.visible = true;
                this.imgLock.visible = false;
                this.imgIconStar.visible = false;
                this.imgNode.visible = false;
                var _a = zj.Table.FindR(this.father.propTbl, function (k, v) {
                    // return info.index == v.index && info.cHostId == v.cHostId && info.pos == v.pos;
                    return info.index == v.index && info.pos == v.pos;
                }), potatoInfo = _a[0], _ = _a[1];
                if (potatoInfo == null) {
                    return;
                }
                var tbl = zj.TableItemPotato.Item(potatoInfo.id);
                var framePic = zj.PlayerCardSystem.GetItemFrame(potatoInfo.id)[0];
                this.imgCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1], this);
                this.imgIcon.source = zj.cachekey(tbl.path, this);
                var addStr = zj.PlayerCardSystem.GetAddStr(potatoInfo);
                if (addStr.length == 5) {
                    zj.Helper.SetStar(this.groupStar, potatoInfo.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.6, 7);
                }
                else {
                    zj.Helper.SetStar(this.groupStar, potatoInfo.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.6, 7);
                }
                this.imgGrade.visible = false;
                this.imgFrame2.source = zj.cachekey(framePic, this);
                this.labelLevel.text = potatoInfo.level;
            }
        };
        return CardUpStarNewItemB;
    }(zj.UI));
    zj.CardUpStarNewItemB = CardUpStarNewItemB;
    __reflect(CardUpStarNewItemB.prototype, "zj.CardUpStarNewItemB");
})(zj || (zj = {}));
//# sourceMappingURL=CardUpStarNewItemB.js.map