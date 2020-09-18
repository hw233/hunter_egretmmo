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
    //  wangshenzhuo
    //  2019-7-19
    //  HXH_StoryInstanceMall
    var StoryInstanceMall = (function (_super) {
        __extends(StoryInstanceMall, _super);
        function StoryInstanceMall() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/StoryInstanceMallSkin.exml";
            _this.Times = new egret.Timer(999, 0);
            _this.Times.start();
            _this.Times.addEventListener(egret.TimerEvent.TIMER, _this.updateTime, _this);
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                _this.Times.stop();
            }, null);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            return _this;
        }
        StoryInstanceMall.prototype.Load = function (Info) {
            this.activityInfo = zj.otherdb.getActivityByTypeAndIndex(Info.type, Info.index);
            this.cur_table = zj.TableActivityBattle.Item(this.activityInfo.buffValue);
            this.imageBG.source = zj.cachekey(this.cur_table.instance_bg, this);
            this.imageRole.source = zj.cachekey(this.cur_table.instance_half, this);
            this.listInstance.itemRenderer = zj.StoryInstanceMallItem;
            this.listItem = new eui.ArrayCollection();
            for (var i = 0; i < this.cur_table.exchange_get_goods.length; i++) {
                var data = new zj.StoryInstanceMallItemData();
                data.info = this.cur_table;
                data.father = this;
                data.index = i;
                this.listItem.addItem(data);
            }
            this.listInstance.dataProvider = this.listItem;
            this.imageIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.cur_table.act_coin), this);
            var posX = this.groupTalk.x;
            var posY = this.groupTalk.y;
            egret.Tween.get(this.groupTalk, { loop: true })
                .to({ y: posY }, 0)
                .to({ y: posY + 5 }, 1000)
                .to({ y: posY - 10 }, 2000)
                .to({ y: posY }, 1000);
            this.updateTime();
        };
        StoryInstanceMall.prototype.updateTime = function () {
            this.labelHaveNum.text = this.activityInfo.daysIndex;
        };
        StoryInstanceMall.prototype.onAwardInfo = function () {
            for (var i = 0; i < this.listItem.length; i++) {
                var tmp = this.listItem.source[i];
                if (i != this.listInstance.selectedIndex) {
                    this.listItem.replaceItemAt(tmp, i);
                }
                else {
                    this.listItem.replaceItemAt(tmp, i);
                }
            }
        };
        //长按详情
        StoryInstanceMall.prototype.showGoodsProperty = function (ev) {
            var a = zj.Game.UIManager.sceneCount();
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "GoodsTouch";
            this.addChild(show);
        };
        // 长按抬起
        StoryInstanceMall.prototype.removeShow = function () {
            var show = this.getChildByName("GoodsTouch");
            if (show) {
                this.removeChild(show);
            }
        };
        StoryInstanceMall.prototype.onButtonClose = function () {
            this.Times.stop();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return StoryInstanceMall;
    }(zj.Dialog));
    zj.StoryInstanceMall = StoryInstanceMall;
    __reflect(StoryInstanceMall.prototype, "zj.StoryInstanceMall");
})(zj || (zj = {}));
//# sourceMappingURL=StoryInstanceMall.js.map