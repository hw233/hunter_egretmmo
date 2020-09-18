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
     * 升星界面卡片左侧Item
     * created by Lian Lei
     * 2018.12.05
     */
    var CardUpStarNewItem = (function (_super) {
        __extends(CardUpStarNewItem, _super);
        function CardUpStarNewItem() {
            var _this = _super.call(this) || this;
            _this.CurState = {
                /**升星卡片 */
                Base: 1,
                /**选中升星材料 */
                Select: 2,
                /**空项 */
                Empty: 3,
                /**非材料 */
                NoUse: 4,
                /**升星材料未选中 */
                NoSelect: 5,
                Lock: 6,
                BHost: 7,
                /**首次进入 */
                BFirst: 8
            };
            _this.touchX = 0;
            _this.touchY = 0;
            _this.skinName = "resource/skins/card/CardUpStarNewItemSkin.exml";
            zj.cachekeys(zj.UIResource["CardUpStarNewItem"], null);
            _this.init();
            return _this;
        }
        CardUpStarNewItem.prototype.init = function () {
            this.type = this.CurState.Empty;
            // this.groupBingo.visible = false;
            this.imgShadow.visible = false;
            this.imgLock.visible = false;
            this.groupAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTouchGroupAllBegin, this);
            this.groupAll.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onBtnTouchGroupAllMove, this);
            this.groupAll.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnTouchGroupAllEnd, this);
        };
        CardUpStarNewItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        /**外部手动调用刷新Item事件 */
        CardUpStarNewItem.prototype.onTap = function () {
            this.updateView(this.data);
        };
        CardUpStarNewItem.prototype.updateView = function (data) {
            this.cardInfo = data.cardInfo;
            zj.closeCache(this.groupAll);
            this.initBase();
            this.setInfoType(data);
            this.setInfoItem(data);
            this.resume();
            zj.setCache(this.groupAll);
        };
        // 刷新页面动画
        CardUpStarNewItem.prototype.resume = function () {
            this.groupAll.alpha = 0;
            var tw = egret.Tween.get(this.groupAll);
            tw.to({ scaleX: 0.7, scaleY: 0.7 }).to({ scaleX: 1, scaleY: 1 });
            tw.to({ alpha: 1 }, 100);
        };
        // 初始化信息
        CardUpStarNewItem.prototype.initBase = function () {
            this.groupStar.removeChildren();
            this.groupAll.visible = true;
            // this.groupBingo.visible = false;
            this.imgLock.visible = false;
            this.imgShadow.visible = false;
            this.imgBingo.visible = false;
            this.imgBingo.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.upStarColor[1], this);
            this.type = this.CurState.Empty;
        };
        // 判断当前选中卡片状态类型
        CardUpStarNewItem.prototype.setInfoType = function (data) {
            if (data.father.cardInfo == null) {
                if (data.cardInfo == null || ((data.cardInfo.id == 0 && data.cardInfo.index == 0))) {
                    data.type = data.CurState.Empty;
                }
                else {
                    data.type = data.CurState.NoSelect;
                }
            }
            else {
                var hostInfo = zj.Game.PlayerCardSystem.getCardToHunterInfo(data.cardInfo.index);
                var cHostId = hostInfo.cHostId;
                var fatherHostInfo = zj.Game.PlayerCardSystem.getCardToHunterInfo(data.father.cardInfo.index);
                var fatherCHostId = fatherHostInfo.cHostId;
                if (data.cardInfo == null) {
                    data.type = data.CurState.Empty;
                }
                else if (data.father.cardInfo.index == data.cardInfo.index && fatherCHostId == cHostId && data.father.cardInfo.pos == data.cardInfo.pos) {
                    data.type = data.CurState.Base;
                }
                else if (data.cardInfo.star == data.father.cardInfo.star) {
                    if (cHostId != null && data.cardInfo.pos != 0) {
                        data.type = data.CurState.BHost;
                    }
                    else if (data.cardInfo.is_lock) {
                        data.type = data.CurState.Lock;
                    }
                    else {
                        data.type = (data.isSelected) ? data.CurState.Select : data.CurState.NoSelect;
                    }
                }
                else {
                    data.type = data.CurState.NoUse;
                }
            }
        };
        // 设置卡片信息 
        CardUpStarNewItem.prototype.setInfoItem = function (data) {
            if (data.cardInfo == null || (data.cardInfo.id == 0 && data.cardInfo.index == 0)) {
                this.groupAll.visible = false;
                return;
            }
            var hostInfo = zj.Game.PlayerCardSystem.getCardToHunterInfo(data.cardInfo.index);
            var cHostId = hostInfo.cHostId;
            var _a = zj.Table.FindR(data.father.propTbl, function (_k, _v) {
                if (data.cardInfo) {
                    return data.cardInfo.index == _v.index && data.cardInfo.pos == _v.pos;
                }
                else {
                    return false;
                }
            }), potatoInfo = _a[0], _ = _a[1];
            if (potatoInfo == null) {
                return;
            }
            var tbl = zj.TableItemPotato.Item(potatoInfo.id);
            var framePic = zj.PlayerCardSystem.GetItemFrame(potatoInfo.id)[0];
            this.imgCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1], this);
            this.imgIcon.source = zj.cachekey(tbl.path, this);
            this.labelCardName.text = tbl.name;
            var addStr = zj.PlayerCardSystem.GetAddStr(potatoInfo);
            if (addStr.length == 5) {
                zj.Helper.SetStar(this.groupStar, potatoInfo.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 9);
            }
            else {
                zj.Helper.SetStar(this.groupStar, potatoInfo.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 9);
            }
            this.imgGrade.visible = data.cardInfo.is_lock;
            this.imgFrame.source = zj.cachekey(framePic, this);
            this.labelLevel.text = potatoInfo.level;
            if (data.type == data.CurState.Base || data.type == data.CurState.Select) {
                // this.groupBingo.visible = true;
                this.imgBingo.visible = true;
                this.imgShadow.visible = false;
                this.imgLock.visible = false;
                if (data.type == data.CurState.Base) {
                    this.imgBingo.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.upStarColor[0], this);
                }
                else {
                    this.imgBingo.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.upStarColor[1], this);
                }
            }
            else if (data.type == data.CurState.Empty || data.type == data.CurState.NoSelect) {
                this.imgLock.visible = false;
                // this.groupBingo.visible = false;
                this.imgBingo.visible = false;
                this.imgShadow.visible = false;
            }
            else if (data.type == data.CurState.NoUse) {
                this.imgLock.visible = false;
                // this.groupBingo.visible = true;
                this.imgBingo.visible = false;
                this.imgShadow.visible = true;
            }
            else if (data.type == data.CurState.Lock || data.type == data.CurState.BHost || data.type == data.CurState.BFirst) {
                this.imgLock.visible = true;
                // this.groupBingo.visible = true;
                this.imgBingo.visible = false;
                this.imgShadow.visible = true;
            }
        };
        //长按卡片显示卡片详细信息
        CardUpStarNewItem.prototype.onBtnTouchGroupAllBegin = function (e) {
            var _this = this;
            this.touchX = e.stageX;
            this.touchY = e.stageY;
            this.timeOut = egret.setTimeout(function () { zj.TipManager.ShowCard(_this.cardInfo); }, this, 1000);
        };
        CardUpStarNewItem.prototype.onBtnTouchGroupAllMove = function (e) {
            if (Math.abs(e.stageX - this.touchX) <= 3 && Math.abs(e.stageY - this.touchY) <= 3)
                return;
            egret.clearTimeout(this.timeOut);
        };
        CardUpStarNewItem.prototype.onBtnTouchGroupAllEnd = function (e) {
            egret.clearTimeout(this.timeOut);
        };
        return CardUpStarNewItem;
    }(eui.ItemRenderer));
    zj.CardUpStarNewItem = CardUpStarNewItem;
    __reflect(CardUpStarNewItem.prototype, "zj.CardUpStarNewItem");
    /**
     * 卡片升星数据
     * created by Lian Lei
     * 2018.12.08
     */
    var CardUpStarNewItemData = (function () {
        function CardUpStarNewItemData() {
            this.isSelected = false;
            this.CurState = {
                /**升星卡片 */
                Base: 1,
                /**选中升星材料 */
                Select: 2,
                /**空项 */
                Empty: 3,
                /**非材料 */
                NoUse: 4,
                /**升星材料未选中 */
                NoSelect: 5,
                Lock: 6,
                BHost: 7,
                /**首次进入 */
                BFirst: 8
            };
        }
        return CardUpStarNewItemData;
    }());
    zj.CardUpStarNewItemData = CardUpStarNewItemData;
    __reflect(CardUpStarNewItemData.prototype, "zj.CardUpStarNewItemData");
})(zj || (zj = {}));
//# sourceMappingURL=CardUpStarNewItem.js.map