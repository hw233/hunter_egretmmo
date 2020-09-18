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
    // lizhengqiang
    // 20190103
    var LeagueInstanceViewAwardItemItemIR = (function (_super) {
        __extends(LeagueInstanceViewAwardItemItemIR, _super);
        function LeagueInstanceViewAwardItemItemIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueInstanceViewAwardItemItemIRSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueInstanceViewAwardItemIR"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
            return _this;
        }
        LeagueInstanceViewAwardItemItemIR.prototype.dataChanged = function () {
            var goodsId = this.data.goodsId;
            var count = this.data.count;
            var fa = this.data.father;
            this.imgBoard.source = zj.cachekey(zj.PlayerItemSystem.ItemFrame(goodsId), this);
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(goodsId), this);
            this.lbLevel.text = count.toString();
        };
        LeagueInstanceViewAwardItemItemIR.prototype.touchBegin = function (e) {
            this.onChooseItemTap(this.data, e);
        };
        // 鼠标点击 掉落 材料说明
        LeagueInstanceViewAwardItemItemIR.prototype.onChooseItemTap = function (data, e) {
            var _this = this;
            var type = zj.PlayerItemSystem.ItemType(data.goodsId);
            var index = data.i;
            var index1 = data.j;
            var itemY;
            var count = 0;
            if (e.stageY >= data.father.height / 2) {
                itemY = e.stageY - e.localY;
                count = 1;
            }
            else {
                itemY = e.stageY + this.skin.height - e.localY;
            }
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
            if (type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                    if (index == "2" && index1 == "1") {
                        dialog.x = index * 260 - dialog.width / 2 + _this.skin.width * 1.5;
                        dialog.y = itemY - dialog.height * 0.5;
                    }
                    else {
                        dialog.x = index * 260 + index1 * 80;
                        if (count == 1) {
                            dialog.y = itemY - dialog.height;
                        }
                        else
                            dialog.y = itemY;
                    }
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(data.goodsId, data.count);
                    data.father.addChild(dialog);
                });
            }
            else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                    if (index == "2" && index1 == "1") {
                        dialog.x = index * 260 - dialog.width / 2 + _this.skin.width * 1.5;
                        dialog.y = itemY - dialog.height * 0.5;
                    }
                    else {
                        dialog.x = index * 260 + index1 * 80;
                        if (count == 1) {
                            dialog.y = itemY - dialog.height;
                        }
                        else
                            dialog.y = itemY;
                    }
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(data.goodsId, data.count);
                    data.father.addChild(dialog);
                });
            }
            else {
                zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                    if (index == "2" && index1 == "1") {
                        dialog.x = index * 260 - dialog.width / 2 + _this.skin.width * 1.5;
                        dialog.y = itemY - dialog.height * 0.5;
                    }
                    else {
                        dialog.x = index * 260 + index1 * 80;
                        if (count == 1) {
                            dialog.y = itemY - dialog.height;
                        }
                        else
                            dialog.y = itemY;
                    }
                    dialog.name = "Item-skill-common";
                    dialog.init(data.goodsId, data.count);
                    data.father.addChild(dialog);
                });
            }
        };
        return LeagueInstanceViewAwardItemItemIR;
    }(eui.ItemRenderer));
    zj.LeagueInstanceViewAwardItemItemIR = LeagueInstanceViewAwardItemItemIR;
    __reflect(LeagueInstanceViewAwardItemItemIR.prototype, "zj.LeagueInstanceViewAwardItemItemIR");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueInstanceViewAwardItemItemIR.js.map