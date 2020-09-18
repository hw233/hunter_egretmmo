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
    // created by hhh in 2018/11/14
    /************** 图鉴界面 ****************/
    var TypePokedex;
    (function (TypePokedex) {
        TypePokedex[TypePokedex["Series"] = 1] = "Series";
        TypePokedex[TypePokedex["Quality"] = 2] = "Quality";
    })(TypePokedex || (TypePokedex = {}));
    var CardPokedex = (function (_super) {
        __extends(CardPokedex, _super);
        function CardPokedex() {
            var _this = _super.call(this) || this;
            _this.curType = TypePokedex.Series;
            _this.lastSelBag = 0;
            _this.cardList = new Array();
            _this.sumNum = 0;
            _this.getNum = 0;
            _this.isChanged = false;
            _this.isScro = false;
            _this.skinName = "resource/skins/card/CardPokedexSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.init();
            return _this;
        }
        CardPokedex.prototype.init = function () {
            this.btnQuality.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnQuality, this);
            this.btnSeries.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSeries, this);
            this.listCardBag.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardSelChange, this);
            this.scrollerPokedexInfo.addEventListener(egret.Event.CHANGE, this.scrollerPokedexChange, this);
            this.scrollerPokedexInfo.addEventListener(eui.UIEvent.CHANGE_END, this.scrollerPokedexChangeEnd, this);
            this.onBtnQuality();
        };
        CardPokedex.prototype.onBtnQuality = function () {
            this.curType = TypePokedex.Quality;
            this.btnQuality.enabled = false;
            this.btnSeries.enabled = true;
            this.setListByType();
        };
        CardPokedex.prototype.onBtnSeries = function () {
            this.curType = TypePokedex.Series;
            this.btnSeries.enabled = false;
            this.btnQuality.enabled = true;
            this.setListByType();
        };
        CardPokedex.prototype.setListByType = function () {
            if (this.isScro == true)
                this.isChanged = true;
            var cardData;
            if (this.curType == TypePokedex.Quality) {
                cardData = zj.PlayerCardSystem.GetAllCardByQualityForPokedex();
            }
            else if (this.curType == TypePokedex.Series) {
                cardData = zj.PlayerCardSystem.GetAllCardByTypeForPokedex();
            }
            this.cardList = cardData[0];
            this.sumNum = cardData[1];
            this.getNum = cardData[2];
            this.labelCardBur.text = this.getNum + "/" + this.sumNum;
            this.listCardBag.itemRenderer = zj.CardPokedexItem;
            var dataArr = [];
            for (var i = 0; i < this.cardList.length; i++) {
                dataArr[i] = { "pokedexType": this.curType, "pos": i };
            }
            this.listCardBag.dataProvider = new eui.ArrayCollection(dataArr);
            this.listCardBag.selectedIndex = 0;
            this.setPokedexList(this.cardList);
        };
        CardPokedex.prototype.setPokedexList = function (data) {
            this.listPokedexInfo.itemRendererFunction = this.pokedexItemRendererFunction;
            var arr = new eui.ArrayCollection();
            var count = 0;
            var contentItemNum = 0;
            // 需要计算 在不同的位置分别添加不同的item
            for (var i = 0; i < data.length; i++) {
                arr.addItemAt({ type: 1, PokedexType: this.curType, titleType: i }, count);
                count++;
                contentItemNum = contentItemNum + Math.ceil(data[i].length / 5);
                for (var j = 0; j < Math.ceil(data[i].length / 5); j++) {
                    var addCardNum = void 0;
                    var cardDataArr = [];
                    if ((j + 1) * 5 <= data[i].length)
                        addCardNum = 5;
                    else
                        addCardNum = data[i].length - j * 5;
                    for (var k = 0; k < addCardNum; k++) {
                        cardDataArr[k] = data[i][j * 5 + k];
                    }
                    arr.addItemAt({ type: 2, num: addCardNum, cardDatas: cardDataArr }, count);
                    count++;
                }
            }
            this.listPokedexInfo.dataProvider = arr;
        };
        // 根据type返回scroller加载的item
        CardPokedex.prototype.pokedexItemRendererFunction = function (item) {
            if (item.type == 1) {
                return zj.CardPokedexItemTitle;
            }
            else if (item.type == 2) {
                return zj.CardPokedexItemContent;
            }
            return null;
        };
        // 点击左侧按钮 使得scroller滑动到指定位置
        /* 问    题：有时第一次见进入点击相应按钮，scroller滑动不到相应的位置
           原    因：viewport.contentHeight的值是动态改变的，当此值小于想要滑动到的scrollV值时，会出现此现象
           处理方式：当想要滑动的scrollV值大于viewport.contentHeight - viewport.height时，使scrollV值等于viewport.contentHeight - viewport.height，并选中相应按钮
           结    果：出现这种现象是由于viewport.contentHeight的值导致的，当viewport.contentHeight正常时，显示是正常的
        */
        CardPokedex.prototype.onCardSelChange = function () {
            var contentItemNum = 0;
            var titleItemNum = 0;
            for (var i = 0; i < this.listCardBag.selectedIndex; i++) {
                contentItemNum = contentItemNum + Math.ceil(this.cardList[i].length / 5);
                titleItemNum++;
            }
            // this.scrollerPokedexInfo.validateNow();
            var scrollV = this.scrollerPokedexInfo.y + 141 * contentItemNum + 38 * (titleItemNum - 1) - 4;
            // if (scrollV > this.scrollerPokedexInfo.viewport.contentHeight - this.scrollerPokedexInfo.viewport.height)
            //     scrollV = this.scrollerPokedexInfo.viewport.contentHeight - this.scrollerPokedexInfo.viewport.height;
            this.scrollerPokedexInfo.viewport.scrollV = scrollV;
            // this.scrollerPokedexInfo.validateNow();
            this.calculteBtnPos();
        };
        // 滑动scroller 使得选中左侧对应按钮
        CardPokedex.prototype.scrollerPokedexChange = function () {
            if (this.isChanged && this.isScro) {
                this.listCardBag.selectedIndex = 0;
                this.scrollerPokedexInfo.viewport.scrollV = 0;
                return;
            }
            this.isScro = true;
            this.calculteBtnPos();
        };
        // 计算显示的按钮
        CardPokedex.prototype.calculteBtnPos = function () {
            var titleItemPosArr = [this.scrollerPokedexInfo.y];
            for (var i = 1; i < this.cardList.length; i++) {
                var contentItemNum = 0;
                var titleItemNum = 0;
                for (var j = 0; j < i; j++) {
                    contentItemNum = contentItemNum + Math.ceil(this.cardList[j].length / 5);
                    titleItemNum++;
                }
                titleItemPosArr[i] = this.scrollerPokedexInfo.y + 141 * contentItemNum + 38 * (titleItemNum - 1) - 4;
            }
            for (var i = 0; i < this.cardList.length; i++) {
                if ((i == this.cardList.length - 1 && this.scrollerPokedexInfo.viewport.scrollV >= titleItemPosArr[i]) ||
                    (this.scrollerPokedexInfo.viewport.scrollV >= titleItemPosArr[i] && this.scrollerPokedexInfo.viewport.scrollV < titleItemPosArr[i + 1])) {
                    this.listCardBag.selectedIndex = i;
                    break;
                }
            }
        };
        // 滑动结束
        CardPokedex.prototype.scrollerPokedexChangeEnd = function () {
            this.isChanged = false;
            this.isScro = false;
        };
        return CardPokedex;
    }(zj.CardBase));
    zj.CardPokedex = CardPokedex;
    __reflect(CardPokedex.prototype, "zj.CardPokedex");
})(zj || (zj = {}));
//# sourceMappingURL=CardPokedex.js.map