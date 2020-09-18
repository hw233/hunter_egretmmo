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
    var BattleSettleWinDrop = (function (_super) {
        __extends(BattleSettleWinDrop, _super);
        function BattleSettleWinDrop() {
            return _super.call(this) || this;
        }
        // public SpriteNoDropTip: eui.Image;
        BattleSettleWinDrop.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.tableDropItem = [];
            this.bDropCome = false;
            this.bContinueBattleSettleCome = false;
            this.bContinueBattleNextCome = false;
            this._touch_id = 0;
        };
        BattleSettleWinDrop.prototype.Load = function () {
            _super.prototype.Load.call(this);
            zj.Game.SoundManager.playMusic(zj.SoundManager.playbgmByID(100005), 1);
            this.hideDrops();
        };
        BattleSettleWinDrop.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.UpdateDrop(tick);
        };
        BattleSettleWinDrop.prototype.hideDrops = function () {
            // this.SpriteNoDropTip.visible = false;
        };
        BattleSettleWinDrop.prototype.DropFadeIn = function (tip) {
            var _this = this;
            var endFade = function () {
                _this.DropsComeIn();
            };
            endFade();
            // if(this.SpriteNoDropTip != null){
            // 	if(Table.g){
            // 	}
            // }
        };
        BattleSettleWinDrop.prototype.UpdateDrop = function (tick) {
            if (this.bDropCome == false) {
                this.bDropCome = true;
                this.DropFadeIn(tick);
            }
            //是否弹出连续战斗结算
            if (this.ui_name == "BattleEnd_Win") {
                return;
            }
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.continueBattleSettleTime * 1000) {
                zj.Gmgr.Instance.checkContinueBattleSettle(true, this.nextMobID);
            }
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.continueBattleNextTime * 1000) {
                if (zj.Gmgr.Instance.isKeepContinueBattle()) {
                    this.clickNext();
                }
            }
        };
        BattleSettleWinDrop.prototype.LoadDropsList = function () {
            if (this.TableViewDrops == null) {
                return;
            }
            var TableViewDrops = new eui.ArrayCollection();
            for (var i = 0; i < this.scene.getItemInfo.items.length; i++) {
                if (this.scene.getItemInfo.items[i].goodsId != 0) {
                    var data = new zj.BattleEndDropItemData();
                    data.index = i;
                    data.itemInfo = this.scene.getItemInfo.items[i];
                    data.father = this;
                    TableViewDrops.addItem(data);
                }
            }
            this.TableViewDrops.dataProvider = TableViewDrops;
            this.TableViewDrops.itemRenderer = zj.BattleEndDropItem;
        };
        /**奖励详情 */
        BattleSettleWinDrop.prototype.awardParticulars = function (xy, cx, cy, info) {
            var ui = this.getChildByName("UI");
            if (ui) {
                return;
            }
            var UI = zj.TipManager.ShowProp(info, this, xy, cx, cy);
            if (zj.PlayerItemSystem.ItemType(info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                UI.reSetGeneral();
            }
            UI.name = "UI";
            this.addChild(UI);
        };
        /**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
        BattleSettleWinDrop.prototype.up = function () {
            var ui = this.getChildByName("UI");
            if (ui) {
                this.removeChild(ui);
            }
        };
        BattleSettleWinDrop.prototype.DropsComeIn = function () {
            this.LoadDropsList();
        };
        return BattleSettleWinDrop;
    }(zj.BattleSettleWin));
    zj.BattleSettleWinDrop = BattleSettleWinDrop;
    __reflect(BattleSettleWinDrop.prototype, "zj.BattleSettleWinDrop");
})(zj || (zj = {}));
//# sourceMappingURL=BattleSettleWinDrop.js.map