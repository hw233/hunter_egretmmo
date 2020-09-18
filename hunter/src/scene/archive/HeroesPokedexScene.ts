namespace zj {
//HeroesPokedexScene
//hexiaowei
// 2018/12/05
export class HeroesPokedexScene extends Scene {
  //关闭按钮
  private btnClose: eui.Button;
  private labelCardBur: eui.Label;

  //帮助按钮
  private btnHelp: eui.Button;

  private btnHunterGroup1: eui.Button;
  private btnHunterGroup2: eui.Button;
  private btnHunterGroup3: eui.Button;
  private btnHunterGroup4: eui.Button;
  private btnHunterGroup5: eui.Button;
  private btnHunterGroup6: eui.Button;

  private groupListCardBag: eui.Group;
  private imgSpriteHeroIcon: eui.Image;
  //人物滤镜图片
  private imgSprite_10066: eui.Image;
  private imgSpriteHunterDpt: eui.Image;


  private listType0: eui.List;
  private _typeIndex: number = 0;

  private groupLayerHunter1: eui.Group;
  private groupLayerHunter2: eui.Group;
  private groupLayerHunter3: eui.Group;
  private groupLayerHunter4: eui.Group;
  private groupLayerHunter5: eui.Group;
  private groupLayerHunter6: eui.Group;

  //红点
  private imgSpriteRedIcon1: eui.Image;
  private imgSpriteRedIcon2: eui.Image;
  private imgSpriteRedIcon3: eui.Image;
  private imgSpriteRedIcon4: eui.Image;
  private imgSpriteRedIcon5: eui.Image;
  private imgSpriteRedIcon6: eui.Image;

  private _arrCollectionType: eui.ArrayCollection;

  /**变化系、操作系、放出系、具象化系、强化系、特质系 */
  private dptIndex = [5, 6, 2, 3, 1, 4];
  private itemIndex2 = [5, 3, 4, 6, 1, 2]
  private ShieldGeneralId: Array<string> = [];
  private currPageIndex: number = 0;
  private lastSelIndex: number = 0;
  private setVisible: boolean = true;
  private currDpt: number = 0;
  private skillTbl = {};
  private retPicMap: Array<string> = [];
  private retMap: any = [];
  private Timer: egret.Timer;

  private itemIndex: number = 0;
  private arrCollectionItem: eui.ArrayCollection;

  /**累计加成 */
  private labelWholeAttri1: eui.Label;
  private labelWholeAttri2: eui.Label;
  private labelWholeAttri3: eui.Label;
  private groupTeach1: eui.Group;
  private TipsNumber: number = -1;

  public constructor() {
    super();
    this.skinName = "resource/skins/archive/HeroesPokedexSkin.exml";
    this.width = UIManager.StageWidth;
    this.height = UIManager.StageHeight;
    //创建一个计时器对象
    this.Timer = new egret.Timer(999, 0);
    this.Timer.start();
    //注册事件侦听器
    this.Timer.addEventListener(egret.TimerEvent.TIMER, this.allItemImage, this);

    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);

    this.btnHunterGroup1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HunterGroup1, this);
    this.btnHunterGroup2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HunterGroup2, this);
    this.btnHunterGroup3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HunterGroup3, this);
    this.btnHunterGroup4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HunterGroup4, this);
    this.btnHunterGroup5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HunterGroup5, this);
    this.btnHunterGroup6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HunterGroup6, this);

    this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHelp, this);

    this.listType0.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.AddHeroesPokedexInfo, this);
    let [has, total] = Game.PlayerHunterHistorySystem.pokedexDataFresh();
    this.loadPokedexSkill(Game.PlayerHunterHistorySystem.getPokedexSkill());
  
    this.HunterGroup1();
    this.labelCardBur.text = (has + "/" + total).toString();
    this.CheckAllTips(); //红点

    this.teachCheck();
    this.allItemImage();
  }

  private SetInfo() {
    let [has, total] = Game.PlayerHunterHistorySystem.pokedexDataFresh();
    this.loadPokedexSkill(Game.PlayerHunterHistorySystem.getPokedexSkill());
    this.labelCardBur.text = (has + "/" + total).toString();
  }

  private teachCheck() {
    if (Teach.isDone(teachBattle.teachPartID_Pokedex) == false) {
      Teach.CheckAndSetTeach(teachBattle.teachPartID_Pokedex);
    }
  }

  private loadPokedexSkill(tbl) {
    let m = tbl;
    this.skillTbl = {};
    for (let i = 0; i < this.dptIndex.length; i++) {
      if (tbl[this.dptIndex[i]] == null) {
        continue;
      }
      let retTbl = {};
      for (const k in tbl[this.dptIndex[i]]) {
        const v = tbl[this.dptIndex[i]][k];
        let talent = TableGeneralTalent.Item(v);
        let effect = TableGeneralTalentEffect.Item(talent.talent_effect[0]);
        if (effect != null) {
          let attri = effect.effect_param;
          if (retTbl[attri] == null) {
            let info = {
              des: null,
              value: null,
            }
            info.des = talent.talent_describe;
            info.value = effect.effect_value[0];
            retTbl[attri] = info;
          }
          else {
            retTbl[attri].value = retTbl[attri].value + effect.effect_value[0];
          }
        }
      }
      this.skillTbl[this.dptIndex[i]] = retTbl;

    }
  }

  //累计加成
  private LoadCurrWholeSkill() {
    for (let i = 1; i < 4; i++) {
      this["labelWholeAttri" + i].visible = false;
    }
    let ret = this.skillTbl[this.currDpt];
    if (ret != null) {
      let i = 0;
      for (const k in ret) {
        i = i + 1;
        const v = ret[k];
        if (v != null) {
          this[`labelWholeAttri${i}`].visible = true;
          this[`labelWholeAttri${i}`].text = HelpUtil.textConfigFormat(v.des, v.value)
        }

      }
    }
  }

  private allItemImage() {
      this.CheckAllTips();
      let generalhistoryids:any = Game.PlayerHunterHistorySystem.generalsPokedexMap;
      for(const k in generalhistoryids) {
        const v = generalhistoryids[k];
        if(v.isHave == true) {
          if (PlayerHunterHistorySystem.GetPokedexKey(v.generalId) == false) {
            let num = this.itemIndex2[v.dpt - 1];
              this["imgSpriteRedIcon" + num].visible = true;
            }
        }
      }
  }

  //各个派系
  private LoadLayer(page) {
    this.lastSelIndex = -1
    this.currPageIndex = page - 1;
    this.currDpt = this.dptIndex[this.currPageIndex]

    this.retMap = []
    this.retPicMap = [];
    let generalhistoryids = Game.PlayerHunterHistorySystem.generalsPokedexMap;
    for (const k in generalhistoryids) {
      const v: any = generalhistoryids[k];
      if (v.dpt == this.currDpt && v.bOpen && !(Table.VIn(this.ShieldGeneralId, k))) {
        this.retMap.push(v);
      }
    }
    for (const k in generalhistoryids) {
      const v: any = generalhistoryids[k];
      if (v.dpt == this.currDpt) {
        this.retPicMap.push(v);
      }
    }

    this.retMap.sort(function (a: any, b: any) { return b.order - a.order });

    //list 加载
    this.listType0.selectedIndex = 0; // 默认选中
    this.listType0.itemRenderer = HeroesPokedexItem;
    this.arrCollectionItem = new eui.ArrayCollection();
    for (let i = 0; i < this.retMap.length; i++) {
      this.arrCollectionItem.addItem(this.retMap[i]);
    }
    this.listType0.dataProvider = this.arrCollectionItem;
    this.itemIndex = this.listType0.selectedIndex;

    //图鉴加载
    // this.imgSpriteHunterDpt.source = cachekey(UIConfig.UIConfig_Hunter_Pokedex.dpt[this.currDpt], this);

    //layer切换
    for (var i = 1; i <= this.dptIndex.length; i++) {
      if (i == (this.currPageIndex + 1)) {
        this[`groupLayerHunter${i}`].visible = true;
      } else {
        this[`groupLayerHunter${i}`].visible = false;
      }
    }

    for (var i = 1; i <= this.dptIndex.length; i++) {
      if (this[`btnHunterGroup${i}`] != null) {
        if (i == (this.currPageIndex + 1)) {
          this[`btnHunterGroup${i}`].highlighted = true;
        } else {
          this[`btnHunterGroup${i}`].highlighted = false;
        }
      }
    }
    this.showHalf();
    this.LoadCurrWholeSkill();

  }

   private TipsRedImage(num) {
      if(num == -1) {
        return;
      }
      let currDpt = this.dptIndex[num]

      let RetMap = []
      let generalhistoryids = Game.PlayerHunterHistorySystem.generalsPokedexMap;
      for (const k in generalhistoryids) {
        const v: any = generalhistoryids[k];
        if (v.dpt == currDpt && v.bOpen && !(Table.VIn(this.ShieldGeneralId, k))) {
          RetMap.push(v);
        }
      }
      for(const k in RetMap) {
          const v = RetMap[k];
          if(v.isHave) {
              if (!PlayerHunterHistorySystem.GetPokedexKey(v.generalId)) {
                PlayerHunterHistorySystem.SavePokedexKey(v.generalId, 1);
              }
          }
      }
  }

  // 显示页面猎人
  private showHalf() {
    for (var i = 0; i < this.retPicMap.length; i++) {
      let pokedex: any = this.retPicMap[i];
      let sprite = this["imgSprite_" + pokedex.generalId]
      if (sprite != null) {
        if (!pokedex.isHave || (!pokedex.bOpen)) {
          Helper.SetImageFilterColor(sprite, "black");
        }
        //隐藏没获得的猎人
        if (Table.VIn(this.ShieldGeneralId, pokedex.generalId)) {
          sprite.visible = false;
        }
      }
    }
  }

  private OnExit() {
    // this.ReadPagTips();
    Tips.SetTipsOfId(Tips.TAG.Pokedex);
  }

  /**关闭按钮*/
  private onButtonClose() {
    this.OnExit();
    this.Timer.stop();
    this.Timer.start();
    this.close(UI.HIDE_TO_TOP);
  }

  /**添加新的弹窗界面 */
  private AddHeroesPokedexInfo(e: eui.ItemTapEvent) {
    if (this.itemIndex != this.listType0.selectedIndex) {
      this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.itemIndex]);
      this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.listType0.selectedIndex]);
      this.itemIndex = this.listType0.selectedIndex;
    }
    let lastData: any = this.retMap[e.itemIndex];
    let listitem = this.listType0.getElementAt(this.itemIndex) as HeroesPokedexItem;
    listitem.FreshTips();
    // this.CheckCurTips();
    loadUI(HeroesPokedexInfo)
      .then((dialog: HeroesPokedexInfo) => {
        dialog.init(this);
        dialog.name = "HeroesPokedexInfo";
        dialog.Load(lastData);
        this.addChild(dialog);
        Game.EventManager.event(GameEvent.SHOW_UI, {typeName: "zj.HeroesPokedexInfo"});
      });
  }


  /**跳转帮助界面 */
  private onBtnHelp() {
    loadUI(HelpDialog)
      .then((dialog: HelpDialog) => {
        dialog.loadBySmallType(102);
        dialog.show(UI.SHOW_FILL_OUT);
      });
  }

  private CheckAllTips() {
      for(let i = 1 ; i < 7 ; i ++) {
          this["imgSpriteRedIcon" + i].visible = false;
      }
  }

  private TipsImage(num) {
      for (let j = 0; j < this.retMap.length; j++) {
        if (this.retMap[j].isHave == true) {
          if (PlayerHunterHistorySystem.GetPokedexKey(this.retMap[j].generalId) == false) {
            this["imgSpriteRedIcon" + num].visible = true;
            return;
          }
        }
      }
  }


  private HunterGroup1() {
    this.HunterGroup();
    this.HunterGroupisdown();
    this.groupLayerHunter1.visible = true;
    this.btnHunterGroup1.currentState = "down";
    this.SetInfo();
    this.LoadLayer(1);
    this.TipsRedImage(this.TipsNumber);
    this.TipsImage(1);
    this.TipsNumber = 0;
  }

  private HunterGroup2() {
    this.HunterGroup();
    this.HunterGroupisdown();
    this.groupLayerHunter2.visible = true;
    this.btnHunterGroup2.currentState = "down";
    this.SetInfo();
    this.LoadLayer(2);
    this.TipsRedImage(this.TipsNumber);
    this.TipsImage(2);
    this.TipsNumber = 1;
  }

  private HunterGroup3() {
    this.HunterGroup();
    this.HunterGroupisdown();
    this.groupLayerHunter3.visible = true;
    this.btnHunterGroup3.currentState = "down";
    this.SetInfo();
    this.LoadLayer(3)
    this.TipsRedImage(this.TipsNumber);
    this.TipsImage(3);
    this.TipsNumber = 2;
  }

  private HunterGroup4() {
    this.HunterGroup();
    this.HunterGroupisdown();
    this.groupLayerHunter4.visible = true;
    this.btnHunterGroup4.currentState = "down";
    this.SetInfo();
    this.LoadLayer(4);
    this.TipsRedImage(this.TipsNumber);
    this.TipsImage(4);
    this.TipsNumber = 3;
  }

  private HunterGroup5() {
    this.HunterGroup();
    this.HunterGroupisdown();
    this.groupLayerHunter5.visible = true;
    this.btnHunterGroup5.currentState = "down";
    this.SetInfo();
    this.LoadLayer(5);
    this.TipsRedImage(this.TipsNumber);
    this.TipsImage(5);
    this.TipsNumber = 4;
  }

  private HunterGroup6() {
    this.HunterGroup();
    this.HunterGroupisdown();
    this.groupLayerHunter6.visible = true;
    this.btnHunterGroup6.currentState = "down";
    this.SetInfo();
    this.LoadLayer(6);
    this.TipsRedImage(this.TipsNumber);
    this.TipsImage(6);
    this.TipsNumber = 5;
  }

  /**不选中任何按钮 */
  private HunterGroup() {
    this.groupLayerHunter1.visible = false;
    this.groupLayerHunter2.visible = false;
    this.groupLayerHunter3.visible = false;
    this.groupLayerHunter4.visible = false;
    this.groupLayerHunter5.visible = false;
    this.groupLayerHunter6.visible = false;
  }

  /**不显示按钮按下的图片 */
  private HunterGroupisdown() {
    this.btnHunterGroup1.currentState = "null";
    this.btnHunterGroup2.currentState = "null";
    this.btnHunterGroup3.currentState = "null";
    this.btnHunterGroup4.currentState = "null";
    this.btnHunterGroup5.currentState = "null";
    this.btnHunterGroup6.currentState = "null";
  }

  private itemList: Array<HeroesPokedexItem> = [];

  private getItemList() {
    this.itemList = [];
    for (let i = 0; i < this.retMap.length; i++) {
      let item = this.listType0.getElementAt(i) as HeroesPokedexItem;
      this.itemList.push(item);
    }
  }

}

}