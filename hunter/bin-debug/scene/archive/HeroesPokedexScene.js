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
    //HeroesPokedexScene
    //hexiaowei
    // 2018/12/05
    var HeroesPokedexScene = (function (_super) {
        __extends(HeroesPokedexScene, _super);
        function HeroesPokedexScene() {
            var _this = _super.call(this) || this;
            _this._typeIndex = 0;
            /**变化系、操作系、放出系、具象化系、强化系、特质系 */
            _this.dptIndex = [5, 6, 2, 3, 1, 4];
            _this.itemIndex2 = [5, 3, 4, 6, 1, 2];
            _this.ShieldGeneralId = [];
            _this.currPageIndex = 0;
            _this.lastSelIndex = 0;
            _this.setVisible = true;
            _this.currDpt = 0;
            _this.skillTbl = {};
            _this.retPicMap = [];
            _this.retMap = [];
            _this.itemIndex = 0;
            _this.TipsNumber = -1;
            _this.itemList = [];
            _this.skinName = "resource/skins/archive/HeroesPokedexSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            //创建一个计时器对象
            _this.Timer = new egret.Timer(999, 0);
            _this.Timer.start();
            //注册事件侦听器
            _this.Timer.addEventListener(egret.TimerEvent.TIMER, _this.allItemImage, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.btnHunterGroup1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.HunterGroup1, _this);
            _this.btnHunterGroup2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.HunterGroup2, _this);
            _this.btnHunterGroup3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.HunterGroup3, _this);
            _this.btnHunterGroup4.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.HunterGroup4, _this);
            _this.btnHunterGroup5.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.HunterGroup5, _this);
            _this.btnHunterGroup6.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.HunterGroup6, _this);
            _this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnHelp, _this);
            _this.listType0.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.AddHeroesPokedexInfo, _this);
            var _a = zj.Game.PlayerHunterHistorySystem.pokedexDataFresh(), has = _a[0], total = _a[1];
            _this.loadPokedexSkill(zj.Game.PlayerHunterHistorySystem.getPokedexSkill());
            _this.HunterGroup1();
            _this.labelCardBur.text = (has + "/" + total).toString();
            _this.CheckAllTips(); //红点
            _this.teachCheck();
            _this.allItemImage();
            return _this;
        }
        HeroesPokedexScene.prototype.SetInfo = function () {
            var _a = zj.Game.PlayerHunterHistorySystem.pokedexDataFresh(), has = _a[0], total = _a[1];
            this.loadPokedexSkill(zj.Game.PlayerHunterHistorySystem.getPokedexSkill());
            this.labelCardBur.text = (has + "/" + total).toString();
        };
        HeroesPokedexScene.prototype.teachCheck = function () {
            if (zj.Teach.isDone(zj.teachBattle.teachPartID_Pokedex) == false) {
                zj.Teach.CheckAndSetTeach(zj.teachBattle.teachPartID_Pokedex);
            }
        };
        HeroesPokedexScene.prototype.loadPokedexSkill = function (tbl) {
            var m = tbl;
            this.skillTbl = {};
            for (var i = 0; i < this.dptIndex.length; i++) {
                if (tbl[this.dptIndex[i]] == null) {
                    continue;
                }
                var retTbl = {};
                for (var k in tbl[this.dptIndex[i]]) {
                    var v = tbl[this.dptIndex[i]][k];
                    var talent = zj.TableGeneralTalent.Item(v);
                    var effect = zj.TableGeneralTalentEffect.Item(talent.talent_effect[0]);
                    if (effect != null) {
                        var attri = effect.effect_param;
                        if (retTbl[attri] == null) {
                            var info = {
                                des: null,
                                value: null,
                            };
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
        };
        //累计加成
        HeroesPokedexScene.prototype.LoadCurrWholeSkill = function () {
            for (var i = 1; i < 4; i++) {
                this["labelWholeAttri" + i].visible = false;
            }
            var ret = this.skillTbl[this.currDpt];
            if (ret != null) {
                var i = 0;
                for (var k in ret) {
                    i = i + 1;
                    var v = ret[k];
                    if (v != null) {
                        this["labelWholeAttri" + i].visible = true;
                        this["labelWholeAttri" + i].text = zj.HelpUtil.textConfigFormat(v.des, v.value);
                    }
                }
            }
        };
        HeroesPokedexScene.prototype.allItemImage = function () {
            this.CheckAllTips();
            var generalhistoryids = zj.Game.PlayerHunterHistorySystem.generalsPokedexMap;
            for (var k in generalhistoryids) {
                var v = generalhistoryids[k];
                if (v.isHave == true) {
                    if (zj.PlayerHunterHistorySystem.GetPokedexKey(v.generalId) == false) {
                        var num = this.itemIndex2[v.dpt - 1];
                        this["imgSpriteRedIcon" + num].visible = true;
                    }
                }
            }
        };
        //各个派系
        HeroesPokedexScene.prototype.LoadLayer = function (page) {
            this.lastSelIndex = -1;
            this.currPageIndex = page - 1;
            this.currDpt = this.dptIndex[this.currPageIndex];
            this.retMap = [];
            this.retPicMap = [];
            var generalhistoryids = zj.Game.PlayerHunterHistorySystem.generalsPokedexMap;
            for (var k in generalhistoryids) {
                var v = generalhistoryids[k];
                if (v.dpt == this.currDpt && v.bOpen && !(zj.Table.VIn(this.ShieldGeneralId, k))) {
                    this.retMap.push(v);
                }
            }
            for (var k in generalhistoryids) {
                var v = generalhistoryids[k];
                if (v.dpt == this.currDpt) {
                    this.retPicMap.push(v);
                }
            }
            this.retMap.sort(function (a, b) { return b.order - a.order; });
            //list 加载
            this.listType0.selectedIndex = 0; // 默认选中
            this.listType0.itemRenderer = zj.HeroesPokedexItem;
            this.arrCollectionItem = new eui.ArrayCollection();
            for (var i_1 = 0; i_1 < this.retMap.length; i_1++) {
                this.arrCollectionItem.addItem(this.retMap[i_1]);
            }
            this.listType0.dataProvider = this.arrCollectionItem;
            this.itemIndex = this.listType0.selectedIndex;
            //图鉴加载
            // this.imgSpriteHunterDpt.source = cachekey(UIConfig.UIConfig_Hunter_Pokedex.dpt[this.currDpt], this);
            //layer切换
            for (var i = 1; i <= this.dptIndex.length; i++) {
                if (i == (this.currPageIndex + 1)) {
                    this["groupLayerHunter" + i].visible = true;
                }
                else {
                    this["groupLayerHunter" + i].visible = false;
                }
            }
            for (var i = 1; i <= this.dptIndex.length; i++) {
                if (this["btnHunterGroup" + i] != null) {
                    if (i == (this.currPageIndex + 1)) {
                        this["btnHunterGroup" + i].highlighted = true;
                    }
                    else {
                        this["btnHunterGroup" + i].highlighted = false;
                    }
                }
            }
            this.showHalf();
            this.LoadCurrWholeSkill();
        };
        HeroesPokedexScene.prototype.TipsRedImage = function (num) {
            if (num == -1) {
                return;
            }
            var currDpt = this.dptIndex[num];
            var RetMap = [];
            var generalhistoryids = zj.Game.PlayerHunterHistorySystem.generalsPokedexMap;
            for (var k in generalhistoryids) {
                var v = generalhistoryids[k];
                if (v.dpt == currDpt && v.bOpen && !(zj.Table.VIn(this.ShieldGeneralId, k))) {
                    RetMap.push(v);
                }
            }
            for (var k in RetMap) {
                var v = RetMap[k];
                if (v.isHave) {
                    if (!zj.PlayerHunterHistorySystem.GetPokedexKey(v.generalId)) {
                        zj.PlayerHunterHistorySystem.SavePokedexKey(v.generalId, 1);
                    }
                }
            }
        };
        // 显示页面猎人
        HeroesPokedexScene.prototype.showHalf = function () {
            for (var i = 0; i < this.retPicMap.length; i++) {
                var pokedex = this.retPicMap[i];
                var sprite = this["imgSprite_" + pokedex.generalId];
                if (sprite != null) {
                    if (!pokedex.isHave || (!pokedex.bOpen)) {
                        zj.Helper.SetImageFilterColor(sprite, "black");
                    }
                    //隐藏没获得的猎人
                    if (zj.Table.VIn(this.ShieldGeneralId, pokedex.generalId)) {
                        sprite.visible = false;
                    }
                }
            }
        };
        HeroesPokedexScene.prototype.OnExit = function () {
            // this.ReadPagTips();
            zj.Tips.SetTipsOfId(zj.Tips.TAG.Pokedex);
        };
        /**关闭按钮*/
        HeroesPokedexScene.prototype.onButtonClose = function () {
            this.OnExit();
            this.Timer.stop();
            this.Timer.start();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        /**添加新的弹窗界面 */
        HeroesPokedexScene.prototype.AddHeroesPokedexInfo = function (e) {
            var _this = this;
            if (this.itemIndex != this.listType0.selectedIndex) {
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.itemIndex]);
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.listType0.selectedIndex]);
                this.itemIndex = this.listType0.selectedIndex;
            }
            var lastData = this.retMap[e.itemIndex];
            var listitem = this.listType0.getElementAt(this.itemIndex);
            listitem.FreshTips();
            // this.CheckCurTips();
            zj.loadUI(zj.HeroesPokedexInfo)
                .then(function (dialog) {
                dialog.init(_this);
                dialog.name = "HeroesPokedexInfo";
                dialog.Load(lastData);
                _this.addChild(dialog);
                zj.Game.EventManager.event(zj.GameEvent.SHOW_UI, { typeName: "zj.HeroesPokedexInfo" });
            });
        };
        /**跳转帮助界面 */
        HeroesPokedexScene.prototype.onBtnHelp = function () {
            zj.loadUI(zj.HelpDialog)
                .then(function (dialog) {
                dialog.loadBySmallType(102);
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        HeroesPokedexScene.prototype.CheckAllTips = function () {
            for (var i = 1; i < 7; i++) {
                this["imgSpriteRedIcon" + i].visible = false;
            }
        };
        HeroesPokedexScene.prototype.TipsImage = function (num) {
            for (var j = 0; j < this.retMap.length; j++) {
                if (this.retMap[j].isHave == true) {
                    if (zj.PlayerHunterHistorySystem.GetPokedexKey(this.retMap[j].generalId) == false) {
                        this["imgSpriteRedIcon" + num].visible = true;
                        return;
                    }
                }
            }
        };
        HeroesPokedexScene.prototype.HunterGroup1 = function () {
            this.HunterGroup();
            this.HunterGroupisdown();
            this.groupLayerHunter1.visible = true;
            this.btnHunterGroup1.currentState = "down";
            this.SetInfo();
            this.LoadLayer(1);
            this.TipsRedImage(this.TipsNumber);
            this.TipsImage(1);
            this.TipsNumber = 0;
        };
        HeroesPokedexScene.prototype.HunterGroup2 = function () {
            this.HunterGroup();
            this.HunterGroupisdown();
            this.groupLayerHunter2.visible = true;
            this.btnHunterGroup2.currentState = "down";
            this.SetInfo();
            this.LoadLayer(2);
            this.TipsRedImage(this.TipsNumber);
            this.TipsImage(2);
            this.TipsNumber = 1;
        };
        HeroesPokedexScene.prototype.HunterGroup3 = function () {
            this.HunterGroup();
            this.HunterGroupisdown();
            this.groupLayerHunter3.visible = true;
            this.btnHunterGroup3.currentState = "down";
            this.SetInfo();
            this.LoadLayer(3);
            this.TipsRedImage(this.TipsNumber);
            this.TipsImage(3);
            this.TipsNumber = 2;
        };
        HeroesPokedexScene.prototype.HunterGroup4 = function () {
            this.HunterGroup();
            this.HunterGroupisdown();
            this.groupLayerHunter4.visible = true;
            this.btnHunterGroup4.currentState = "down";
            this.SetInfo();
            this.LoadLayer(4);
            this.TipsRedImage(this.TipsNumber);
            this.TipsImage(4);
            this.TipsNumber = 3;
        };
        HeroesPokedexScene.prototype.HunterGroup5 = function () {
            this.HunterGroup();
            this.HunterGroupisdown();
            this.groupLayerHunter5.visible = true;
            this.btnHunterGroup5.currentState = "down";
            this.SetInfo();
            this.LoadLayer(5);
            this.TipsRedImage(this.TipsNumber);
            this.TipsImage(5);
            this.TipsNumber = 4;
        };
        HeroesPokedexScene.prototype.HunterGroup6 = function () {
            this.HunterGroup();
            this.HunterGroupisdown();
            this.groupLayerHunter6.visible = true;
            this.btnHunterGroup6.currentState = "down";
            this.SetInfo();
            this.LoadLayer(6);
            this.TipsRedImage(this.TipsNumber);
            this.TipsImage(6);
            this.TipsNumber = 5;
        };
        /**不选中任何按钮 */
        HeroesPokedexScene.prototype.HunterGroup = function () {
            this.groupLayerHunter1.visible = false;
            this.groupLayerHunter2.visible = false;
            this.groupLayerHunter3.visible = false;
            this.groupLayerHunter4.visible = false;
            this.groupLayerHunter5.visible = false;
            this.groupLayerHunter6.visible = false;
        };
        /**不显示按钮按下的图片 */
        HeroesPokedexScene.prototype.HunterGroupisdown = function () {
            this.btnHunterGroup1.currentState = "null";
            this.btnHunterGroup2.currentState = "null";
            this.btnHunterGroup3.currentState = "null";
            this.btnHunterGroup4.currentState = "null";
            this.btnHunterGroup5.currentState = "null";
            this.btnHunterGroup6.currentState = "null";
        };
        HeroesPokedexScene.prototype.getItemList = function () {
            this.itemList = [];
            for (var i = 0; i < this.retMap.length; i++) {
                var item = this.listType0.getElementAt(i);
                this.itemList.push(item);
            }
        };
        return HeroesPokedexScene;
    }(zj.Scene));
    zj.HeroesPokedexScene = HeroesPokedexScene;
    __reflect(HeroesPokedexScene.prototype, "zj.HeroesPokedexScene");
})(zj || (zj = {}));
//# sourceMappingURL=HeroesPokedexScene.js.map