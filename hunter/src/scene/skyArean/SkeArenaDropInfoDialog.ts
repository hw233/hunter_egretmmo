namespace zj {
// SkeArenaDropInfoDialog(首领奖励)
// hexiaowei
// 20019/02/23
enum EnumTower {
        Low = 0,
        High = 1,
}
export class SkeArenaDropInfoDialog extends Dialog {
        
    private buttonClose : eui.Button;
    private listViewDrop : eui.List;
    private buttonLow : eui.Button;
    private buttonHigh : eui.Button;
    private groupAward : eui.Group;
    private scrollerRewards : eui.Scroller;

    private dropInfoItem: eui.ArrayCollection;;

    private towerState : number = 0;
    private key_floor : number = 10

    public constructor() {
        super();
        this.skinName = "resource/skins/skyArean/SkeArenaDropInfoSkin.exml";
        
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClose,this);
        this.buttonLow.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onButtonLowScale,this);
        this.buttonLow.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonLow,this);
        this.buttonHigh.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onButtonHighScale,this);
        this.buttonHigh.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonHigh,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveGroup, this);

        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, null);
        this.inIt();
        this.setInfo();
    }
    
    private inIt(){

        this.towerState = EnumTower.Low;
        //this.InitButtonShow();
        this.buttonLow.enabled = false;
        this.buttonHigh.enabled = true;
    }

    private InitButtonShow(){

        let bShow : boolean = false;
        // if(Game.PlayerTowerSystem.towerInfo.high_tower_cur != null && Game.PlayerTowerSystem.towerInfo.towerCur != null){
        //      bShow = true;
        // }
        this.buttonLow.enabled = bShow;
        this.buttonHigh.enabled = bShow;
    }

    private setInfo(){
        
        if(this.towerState == 0){
             this.buttonLow.enabled = false;
             this.buttonHigh.enabled = true;
        }else{
             this.buttonLow.enabled = true;
             this.buttonHigh.enabled = false;
        }
        let tbl = PlayerTowerSystem.floorInfo();
        let key_floor_tbl = [];
        for( const k in tbl[this.towerState]){
            const v =  tbl[this.towerState][k];
            if(( Number(k)+1) % this.key_floor == 0){
                key_floor_tbl.push(v);
            }

        }
        
        key_floor_tbl.sort( function (a:any, b:any) { return a.id - b.id });

        this.listViewDrop.itemRenderer = SkeArenaDropInfoItem;//
        this.dropInfoItem = new eui.ArrayCollection();

        for (let i = 0; i < key_floor_tbl.length; i++) {
            let data =  new SkeArenaDropInfoItemData();
            data.dropInfo = key_floor_tbl[i];
            data.index = i;
            data.father = this;
            this.dropInfoItem.addItem(data);
        }
        this.listViewDrop.dataProvider = this.dropInfoItem;

    }

   

    private showGoodsProperty(ev: egret.Event) {
        let a = ev.data;
        let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "details";
        this.addChild(show);
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

    private onRemoveGroup() {
        this.onRemoveButton();
    }

    private onButtonLow(){
        this.towerState = 0;
        this.setInfo();
        this.onRemoveButton();
    }

    private onButtonLowScale(){
        this.buttonLow.anchorOffsetX = this.buttonLow.width ;
        this.buttonLow.anchorOffsetY = this.buttonLow.height;
        this.buttonLow.scaleX = 1.1;
        this.buttonLow.scaleY = 1.1;
    }

    private onButtonHighScale(){
        this.buttonHigh.anchorOffsetX = this.buttonHigh.width / 2;
        this.buttonHigh.anchorOffsetY = this.buttonHigh.height / 2;
        this.buttonHigh.scaleX = 1.1;
        this.buttonHigh.scaleY = 1.1;
    }

    private ontouchend(){
        this.onRemoveButton;
    }

    private onRemoveButton(){
        this.buttonHigh.scaleX = 1;
        this.buttonHigh.scaleY = 1;

        this.buttonLow.scaleX = 1;
        this.buttonLow.scaleY = 1;
    }

    private onButtonHigh(){
        this.towerState = 1;
        this.setInfo();
        this.onRemoveButton();
    }

    private onButtonClose(){

        this.close(UI.HIDE_TO_TOP);

    }

}

}