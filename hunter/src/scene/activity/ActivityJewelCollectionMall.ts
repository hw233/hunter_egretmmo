namespace zj {
// 宝石收藏 -- 宝石商店
// wangshenzhuo
// 20019/05/07
export class ActivityJewelCollectionMall extends Dialog {

    private labelCore: eui.BitmapLabel;
    private groupMain: eui.Group;
    private listViewTask: eui.List;
    private buttonRed: eui.Button;
    private father: ActivityJewelCollectionSence;

    private aData : any;
    private TableViewItem: eui.ArrayCollection;
    private TableViewIndex: number = 0;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivityJewelCollectionMallSkin.exml";
        this.buttonRed.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclose, this);
    }

    public SetInfo() {
        // 商品数据
        this.aData = PlayerJewelSystem.GetJewelMallData(PlayerJewelSystem.GetActivityIndex());
        //当前可用宝石
        this.labelCore.text = String(Game.PlayerMissionSystem.missionActive.jewelHave);
        this.SetList();
        this.fatherTips();
    }

    public SetList() {
        this.listViewTask.selectedIndex = -1; // 默认选中
        this.listViewTask.itemRenderer = ActivityJewelCollectionMallItem;//
        this.TableViewItem = new eui.ArrayCollection();
        for (let i = 0; i < this.aData.length; i++) {
            let data = new ActivityJewelCollectionMallItemData();
            data.father = this;
            data.info = this.aData[i];
            data.id = i;
            this.TableViewItem.addItem(data);
        }

        this.listViewTask.dataProvider = this.TableViewItem;
        this.TableViewIndex = this.listViewTask.selectedIndex;
    }

    public SetFather(father: ActivityJewelCollectionSence) {
        this.father = father;
    }

    public fatherTips() {
        this.father.tips();
    }

    //关闭按钮
    public onBtnclose() {
        this.father.SetInfo();
        this.close(UI.HIDE_TO_TOP);
    }
}
}