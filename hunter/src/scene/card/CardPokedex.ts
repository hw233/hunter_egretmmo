namespace zj {
// created by hhh in 2018/11/14

/************** 图鉴界面 ****************/

enum TypePokedex {
    Series = 1,
    Quality = 2
}

export class CardPokedex extends CardBase {
    private btnQuality: eui.Button;
    private btnSeries: eui.Button;

    private labelCardBur: eui.Label;

    private scrollerCardBag: eui.Scroller;
    private listCardBag: eui.List;
    private scrollerPokedexInfo: eui.Scroller;
    private listPokedexInfo: eui.List;

    private curType: TypePokedex = TypePokedex.Series;

    private lastSelBag: number = 0;

    private cardList: Array<Array<TableItemPotato>> = new Array<Array<TableItemPotato>>();
    private sumNum: number = 0;
    private getNum: number = 0;

    private isChanged: boolean = false;
    private isScro: boolean = false;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardPokedexSkin.exml";

        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        this.init();
    }

    private init() {
        this.btnQuality.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnQuality, this);
        this.btnSeries.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSeries, this);

        this.listCardBag.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardSelChange, this);
        this.scrollerPokedexInfo.addEventListener(egret.Event.CHANGE, this.scrollerPokedexChange, this);
        this.scrollerPokedexInfo.addEventListener(eui.UIEvent.CHANGE_END, this.scrollerPokedexChangeEnd, this);

        this.onBtnQuality();
    }

    private onBtnQuality() {
        this.curType = TypePokedex.Quality;
        this.btnQuality.enabled = false;
        this.btnSeries.enabled = true;

        this.setListByType();
    }

    private onBtnSeries() {
        this.curType = TypePokedex.Series;
        this.btnSeries.enabled = false;
        this.btnQuality.enabled = true;

        this.setListByType();
    }

    private setListByType() {
        if (this.isScro == true)
            this.isChanged = true;

        let cardData;
        if (this.curType == TypePokedex.Quality) {
            cardData = PlayerCardSystem.GetAllCardByQualityForPokedex();
        }
        else if (this.curType == TypePokedex.Series) {
            cardData = PlayerCardSystem.GetAllCardByTypeForPokedex();
        }

        this.cardList = cardData[0];
        this.sumNum = cardData[1];
        this.getNum = cardData[2];

        this.labelCardBur.text = this.getNum + "/" + this.sumNum;

        this.listCardBag.itemRenderer = CardPokedexItem;
        let dataArr = [];
        for (let i = 0; i < this.cardList.length; i++) {
            dataArr[i] = { "pokedexType": this.curType, "pos": i };
        }

        this.listCardBag.dataProvider = new eui.ArrayCollection(dataArr);
        this.listCardBag.selectedIndex = 0;

        this.setPokedexList(this.cardList);
    }

    private setPokedexList(data: Array<Array<TableItemPotato>>) {
        this.listPokedexInfo.itemRendererFunction = this.pokedexItemRendererFunction;
        let arr: eui.ArrayCollection = new eui.ArrayCollection();
        let count = 0;
        let contentItemNum = 0;
        // 需要计算 在不同的位置分别添加不同的item
        for (let i = 0; i < data.length; i++) {
            arr.addItemAt({ type: 1, PokedexType: this.curType, titleType: i }, count);
            count++;
            contentItemNum = contentItemNum + Math.ceil(data[i].length / 5);
            for (let j = 0; j < Math.ceil(data[i].length / 5); j++) {
                let addCardNum;
                let cardDataArr = [];
                if ((j + 1) * 5 <= data[i].length)
                    addCardNum = 5;
                else
                    addCardNum = data[i].length - j * 5;

                for (let k = 0; k < addCardNum; k++) {
                    cardDataArr[k] = data[i][j * 5 + k];
                }
                arr.addItemAt({ type: 2, num: addCardNum, cardDatas: cardDataArr }, count);
                count++;
            }
        }
        this.listPokedexInfo.dataProvider = arr;
    }

    // 根据type返回scroller加载的item
    private pokedexItemRendererFunction(item) {
        if (item.type == 1) {
            return CardPokedexItemTitle;
        } else if (item.type == 2) {
            return CardPokedexItemContent;
        }

        return null;
    }

    // 点击左侧按钮 使得scroller滑动到指定位置
    /* 问    题：有时第一次见进入点击相应按钮，scroller滑动不到相应的位置 
       原    因：viewport.contentHeight的值是动态改变的，当此值小于想要滑动到的scrollV值时，会出现此现象 
       处理方式：当想要滑动的scrollV值大于viewport.contentHeight - viewport.height时，使scrollV值等于viewport.contentHeight - viewport.height，并选中相应按钮
       结    果：出现这种现象是由于viewport.contentHeight的值导致的，当viewport.contentHeight正常时，显示是正常的
    */
    private onCardSelChange() {
        let contentItemNum = 0;
        let titleItemNum = 0;
        for (let i = 0; i < this.listCardBag.selectedIndex; i++) {
            contentItemNum = contentItemNum + Math.ceil(this.cardList[i].length / 5);
            titleItemNum++;
        }

        // this.scrollerPokedexInfo.validateNow();
        let scrollV = this.scrollerPokedexInfo.y + 141 * contentItemNum + 38 * (titleItemNum - 1) - 4;
        // if (scrollV > this.scrollerPokedexInfo.viewport.contentHeight - this.scrollerPokedexInfo.viewport.height)
        //     scrollV = this.scrollerPokedexInfo.viewport.contentHeight - this.scrollerPokedexInfo.viewport.height;
        this.scrollerPokedexInfo.viewport.scrollV = scrollV;
        // this.scrollerPokedexInfo.validateNow();

        this.calculteBtnPos()
    }

    // 滑动scroller 使得选中左侧对应按钮
    private scrollerPokedexChange() {
        if (this.isChanged && this.isScro) {
            this.listCardBag.selectedIndex = 0;
            this.scrollerPokedexInfo.viewport.scrollV = 0;
            return;
        }

        this.isScro = true;

        this.calculteBtnPos();
    }

    // 计算显示的按钮
    private calculteBtnPos() {
        let titleItemPosArr = [this.scrollerPokedexInfo.y];
        for (let i = 1; i < this.cardList.length; i++) {
            let contentItemNum = 0;
            let titleItemNum = 0;
            for (let j = 0; j < i; j++) {
                contentItemNum = contentItemNum + Math.ceil(this.cardList[j].length / 5);
                titleItemNum++;
            }
            titleItemPosArr[i] = this.scrollerPokedexInfo.y + 141 * contentItemNum + 38 * (titleItemNum - 1) - 4;
        }

        for (let i = 0; i < this.cardList.length; i++) {
            if ((i == this.cardList.length - 1 && this.scrollerPokedexInfo.viewport.scrollV >= titleItemPosArr[i]) ||
                (this.scrollerPokedexInfo.viewport.scrollV >= titleItemPosArr[i] && this.scrollerPokedexInfo.viewport.scrollV < titleItemPosArr[i + 1])) {
                this.listCardBag.selectedIndex = i;
                break;
            }
        }
    }

    // 滑动结束
    private scrollerPokedexChangeEnd() {
        this.isChanged = false;
        this.isScro = false;
    }
}

}