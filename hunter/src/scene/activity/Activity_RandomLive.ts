namespace zj {
// wangshenzhuo
// 2019/04/12
// 娃娃机---兑换奖励
export class Activity_RandomLive extends Dialog {

    public labelCore:eui.BitmapLabel;
    public listTableViewTask:eui.List;
    public buttonClose:eui.Button;
    public groupMain:eui.Group;

    public GoodsInfo : any;
    public curTopicInfo : any; 
    private TableViewItem: eui.ArrayCollection;
    private TableViewIndex: number = 0;
    public father : Activity_RandomBoomSence;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/Activity_RandomLiveSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END , this.onRemoveAward , this);
    }

    public SetInfo(father:Activity_RandomBoomSence) {
        this.father = father; 
        let cur_sore = Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore;
        this.labelCore.text = String(cur_sore);

        let randomTbl = TableIntegralEgg.Table();
        let index = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info % Object.keys(randomTbl).length;
        index = index == 0 && Object.keys(randomTbl).length || index;
        let tblConsume = Game.ConfigManager.getTable(StringConfig_Table.egg_random + ".json");  //读表
		this.curTopicInfo = tblConsume[index];
        let goods = [];
        for(const k in this.curTopicInfo.exchange_goods) {
            const v = this.curTopicInfo.exchange_goods[k];
            let good = new message.GoodsInfo();
            good.goodsId = v[0];
            good.count = v[1];
            goods.push(good);
        }
        this.GoodsInfo = goods;
        this.SetInfoList();
    }

    public SetInfoList() {
        let lc_tbl = Table.DeepCopy(this.GoodsInfo);
        let fix = PlayerItemSystem.FixCount(this.GoodsInfo.length , 8 , 4);
        for(let i = 0 ; i < fix ; i ++) {
            let good = new message.GoodsInfo();
            good.goodsId = 0;
            good.count = 0;
            this.GoodsInfo.push(good);
        }

        this.listTableViewTask.selectedIndex = -1; // 默认选中
        this.listTableViewTask.itemRenderer = Activity_RandomLiveItem;//
        this.TableViewItem = new eui.ArrayCollection();
        for (let i = 0; i < this.GoodsInfo.length; i++) {
            let data = new Activity_RandomLiveItemData();
            data.father = this;
            data.goods = this.GoodsInfo[i];
            data.index = i;
            this.TableViewItem.addItem(data);
        }

        this.listTableViewTask.dataProvider = this.TableViewItem;
        this.TableViewIndex = this.listTableViewTask.selectedIndex;
    }

    public RefreshScoreList() {
        let cur_score = Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore;
        this.labelCore.text = cur_score.toString();
        this.father.SetFresh();
        this.father.FreshRedTips();
    }

    // 鼠标点击 物品详情
    public onChooseItemTap(isTouchBegin: boolean, data: Activity_RandomLiveItemData) {
        let _type = PlayerItemSystem.ItemType(data.goods.goodsId);

        let dialog = this.groupMain.getChildByName("Item-skill-common") as CommonDesGeneral;
        if (dialog) this.groupMain.removeChild(dialog);
        let posY : number;
        let posX : number;
        let index : number;

        if(data.index > 3) {
            posY = 50;
            index = data.index - 3;
        }else {
            posY = 100;
            index = data.index + 1;
        }
       
        if(data.index == 0) {
            index = 2.4;
            posY = -65;
        }else if(data.index == 4) {
            index = 2.4;
            posY = 180;
        }

        posX = -250 +  index*170;

        if (isTouchBegin) {
            if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
                    dialog.x = posX;
                    dialog.y = posY;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(data.goods.goodsId,data.goods.count);
                     this.groupMain.addChild(dialog);
                });
            }else
            if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
                    dialog.x = posX  ;
                    dialog.y = posY;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(data.goods.goodsId, data.goods.count);
                    this.groupMain.addChild(dialog);
                });
            }else  if(_type == message.EGoodsType.GOODS_TYPE_RESOURCE){
                loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                    dialog.x = posX ;
                    dialog.y = posY;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(data.goods.goodsId,data.goods.count);
                    this.groupMain.addChild(dialog);
                });
            }
            else {
                loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
                    dialog.x = posX ;
                    dialog.y = posY;
                    dialog.name = "Item-skill-common";
                    dialog.init(data.goods.goodsId,data.goods.count);
                    this.groupMain.addChild(dialog);
                });

            }
        }
    }

     //鼠标抬起，移除 物品详情
    private onRemoveAward() {
        let dialog = this.groupMain.getChildByName("Item-skill-common");
        if (dialog) this.groupMain.removeChild(dialog);
    }

    //返回主界面
    private onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}
}