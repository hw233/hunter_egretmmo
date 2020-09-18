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
    //RelicOpenChest
    //hexiaowei
    // 2019/03/013
    var RelicOpenChest = (function (_super) {
        __extends(RelicOpenChest, _super);
        function RelicOpenChest() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/darkLand/RelicOpenChestSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.groupCardBack1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupCard1, _this);
            _this.groupCardBack2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupCard2, _this);
            _this.groupCardBack3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupCard3, _this);
            _this.groupCardBack4.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupCard4, _this);
            _this.groupCardBack5.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupCard5, _this);
            _this.groupCardBack6.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupCard6, _this);
            _this.groupItemContent1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupContent1, _this);
            _this.groupItemContent2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupContent2, _this);
            _this.groupItemContent3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupContent3, _this);
            _this.groupItemContent4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupContent4, _this);
            _this.groupItemContent5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupContent5, _this);
            _this.groupItemContent6.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupContent6, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.buttonAllOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonAllOpen, _this);
            _this.buttonShowAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonShowAward, _this);
            _this.imageRect.visible = false;
            _this.Init();
            return _this;
        }
        RelicOpenChest.prototype.Init = function () {
            this.openPosInfo = [];
            for (var i = 1; i <= 6; i++) {
                this.openPosInfo.push(null);
            }
        };
        //添加龙骨动画
        RelicOpenChest.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.scaleY = 0.8;
                display.scaleX = 0.85;
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        RelicOpenChest.prototype.setChestId = function (id, father) {
            this.chestId = id;
            this.father = father;
            var chestTbl = zj.PlayerDarkSystem.RelicInstanceChest(id);
            this.chestTbl = chestTbl;
            // 总免费次数
            var allFreeTimes = zj.Table.Count(chestTbl.price, function (k, v) {
                var count = v == 0 ? 1 : 0;
                return count;
            });
            this.allFreeTimes = allFreeTimes;
            // 总开启次数
            var allTimes = chestTbl.open_time;
            this.allTimes = allTimes;
            // 已经开启信息
            this.openInfos = zj.Table.FindR(zj.Game.PlayerInstanceSystem.RelicChest, function (k, v) {
                return v.key == id;
            });
            // 设置宝箱信息
            for (var i = 1; i <= this.openInfos[0].value; i++) {
                var key = this.openPosInfo.length - i;
                this.openPosInfo[key] = -1;
                this["groupCard" + (key + 1)].visible = false;
            }
            this.setUI();
        };
        RelicOpenChest.prototype.setUI = function () {
            // 已经开启信息
            var chestid = this.chestId;
            this.openInfos = zj.Table.FindR(zj.Game.PlayerInstanceSystem.RelicChest, function (k, v) {
                return v.key == chestid;
            });
            // 剩余免费次数
            var lastFreeTimes = this.allFreeTimes > this.openInfos[0].value ? this.allFreeTimes - this.openInfos[0].value : 0;
            this.labelMaxOpenTime.text = this.allTimes.toString();
            this.labelLastFreeTime.text = lastFreeTimes.toString();
            if (lastFreeTimes != 0) {
                this.labelLastFreeTime.textColor = zj.Helper.RGBToHex("r:60,g:255,b:0");
            }
            else {
                this.labelLastFreeTime.textColor = zj.Helper.RGBToHex("r:255,g:38,b:0");
            }
            //花费
            var cost = this.chestTbl.price[this.openInfos[0].value];
            for (var i = 1; i <= 6; i++) {
                if (cost == 0) {
                    this["groupCost" + i].visible = false;
                    this["labelFree" + i].visible = true;
                }
                else {
                    this["groupCost" + i].visible = true;
                    this["labelFree" + i].visible = false;
                    this["labelCost" + i].text = cost;
                }
            }
            // 全开花费
            // 剩余开启次数
            var price = this.chestTbl.price;
            var lastOpenTimes = this.allTimes - this.openInfos[0].value;
            var allCost = zj.Table.Add(this.openInfos[0].value, 5, function (i) {
                return price[i];
            });
            this.buttonAllOpen.enabled = lastOpenTimes != 0;
            this.labelCost.text = allCost.toString();
            this.allNum = allCost;
        };
        RelicOpenChest.prototype.setGoodsInfo = function (Info, index) {
            var i = index;
            var cur_goods = Info;
            var goods_type = zj.PlayerItemSystem.ItemType(cur_goods.goodsId);
            var itemSet = zj.PlayerItemSystem.Set(cur_goods.goodsId, null, cur_goods.count);
            this["imageItemFrame" + i].source = zj.cachekey(itemSet.Frame, this);
            this["imageItemIcon" + i].source = zj.cachekey(itemSet.Clip, this);
            this["labelItemNum" + i].text = cur_goods.count;
            var itemInfo = itemSet.Info;
            this["labelItemName" + i].text = itemInfo.name;
            this["labelItemName" + i].textColor = zj.ConstantConfig_Common.Color.psy_quality_color[itemInfo.quality - 1];
        };
        RelicOpenChest.prototype.playPosAni = function (Infos, indexs) {
            var _this = this;
            for (var k in Infos) {
                this.setGoodsInfo(Infos[k], indexs[k]);
                this["groupItemContent" + indexs[k]].visible = false;
            }
            egret.Tween.get(this.groupEntirety)
                .call(function () {
                var _loop_1 = function (k) {
                    egret.Tween.get(_this["groupCardBack" + indexs[k]])
                        .to({ scaleX: 0 }, 600, egret.Ease.backIn)
                        .to({ scaleX: 1 }, 600, egret.Ease.backIn)
                        .call(function () {
                        _this["groupCardBack" + indexs[k]].visible = false;
                        _this["groupItemContent" + indexs[k]].visible = true;
                        _this.imageRect.visible = false;
                        var goods_type = zj.PlayerItemSystem.ItemType(Infos[k].goodsId);
                        var itemSet = zj.PlayerItemSystem.Set(Infos[k].goodsId, null, Infos[k].count).Info;
                        if (itemSet["quality"] == 5) {
                            _this.addAnimatoin("kapai_chengse", "002_xunhuan_hou", 0, _this["groupAnim" + indexs[k]]);
                        }
                    });
                };
                for (var k in Infos) {
                    _loop_1(k);
                }
            });
        };
        RelicOpenChest.prototype.openRelicChest = function (chestId, indexs) {
            var _this = this;
            var cost = this.chestTbl.price[this.openInfos[0].value];
            var nowGold = zj.Game.PlayerInfoSystem.Token;
            if (nowGold < cost) {
                zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Tavern.tips, (function () {
                    zj.loadUI(zj.PayMallScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.init();
                    });
                }));
            }
            else {
                this.imageRect.visible = true;
                RelicOpenChest.ReqOpenChest(chestId, indexs)
                    .then(function (data) {
                    for (var k in indexs) {
                        var v = indexs[k];
                        _this.openPosInfo[Number(v) - 1] = data.body.gameInfo.getGoods[k];
                    }
                    var mn = _this.openPosInfo;
                    _this.setUI();
                    _this.playPosAni(data.body.gameInfo.getGoods, indexs);
                }).catch(function (reason) {
                    _this.imageRect.visible = false;
                    zj.toast(reason);
                });
            }
        };
        RelicOpenChest.ReqOpenChest = function (chestId, indexs) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.OpenRelicChestRequest();
                request.body.chest_id = chestId;
                request.body.is_open_all = indexs.length > 1;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        RelicOpenChest.prototype.onButtonAllOpen = function () {
            if (this.allNum > zj.Game.PlayerInfoSystem.Token) {
                zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Tavern.tips, (function () {
                    zj.loadUI(zj.PayMallScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.init();
                    });
                }));
            }
            else {
                var canOpenPos = [];
                for (var k in this.openPosInfo) {
                    var v = this.openPosInfo[k];
                    if (v != -1 && v == null) {
                        canOpenPos.push(Number(k) + 1);
                    }
                }
                for (var i = 0; i < canOpenPos.length; i++) {
                    this.openRelicChest(this.chestId, [canOpenPos[i]]);
                }
            }
        };
        RelicOpenChest.prototype.onGroupCard1 = function () {
            this.openRelicChest(this.chestId, [1]);
        };
        RelicOpenChest.prototype.onGroupCard2 = function () {
            this.openRelicChest(this.chestId, [2]);
        };
        RelicOpenChest.prototype.onGroupCard3 = function () {
            this.openRelicChest(this.chestId, [3]);
        };
        RelicOpenChest.prototype.onGroupCard4 = function () {
            this.openRelicChest(this.chestId, [4]);
        };
        RelicOpenChest.prototype.onGroupCard5 = function () {
            this.openRelicChest(this.chestId, [5]);
        };
        RelicOpenChest.prototype.onGroupCard6 = function () {
            this.openRelicChest(this.chestId, [6]);
        };
        RelicOpenChest.prototype.onGroupContent1 = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.openPosInfo[0], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        RelicOpenChest.prototype.onGroupContent2 = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.openPosInfo[1], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        RelicOpenChest.prototype.onGroupContent3 = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.openPosInfo[2], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        RelicOpenChest.prototype.onGroupContent4 = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.openPosInfo[3], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        RelicOpenChest.prototype.onGroupContent5 = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.openPosInfo[4], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        RelicOpenChest.prototype.onGroupContent6 = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.openPosInfo[5], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        RelicOpenChest.prototype.onButtonShowAward = function () {
            var tblInfo = zj.PlayerDarkSystem.RelicInstanceChest(this.chestId);
            var goodsMap = [];
            for (var i = 0; i < tblInfo.client_good.length; i++) {
                var goods = new message.GoodsInfo;
                goods.goodsId = tblInfo.client_good[i];
                goods.count = 0;
                goods.showType = 1;
                goodsMap.push(goods);
            }
            zj.loadUI(zj.Common_DesRelic)
                .then(function (dialog) {
                dialog.setInfoActivity(goodsMap);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        RelicOpenChest.prototype.onButtonClose = function () {
            var _this = this;
            var chestId = this.chestId;
            ;
            var openInfos = zj.Table.FindR(zj.Game.PlayerInstanceSystem.RelicChest, function (k, v) {
                return v.key == chestId;
            });
            var haveFree = this.allFreeTimes > this.openInfos[0].value;
            var lastOpenTimes = this.allTimes - this.openInfos[0].value;
            if (!haveFree && (lastOpenTimes > 0)) {
                zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_DarkLand.relic.closeCannotOpen, (function () {
                    _this.close(zj.UI.HIDE_TO_TOP), _this.father.setInfoList();
                }));
            }
            else {
                this.close(zj.UI.HIDE_TO_TOP);
                this.father.setInfoList();
            }
        };
        RelicOpenChest.prototype.showGoodsProperty = function (ev) {
            if (zj.Game.UIManager.dialogCount() == 3)
                return;
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        RelicOpenChest.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        return RelicOpenChest;
    }(zj.Dialog));
    zj.RelicOpenChest = RelicOpenChest;
    __reflect(RelicOpenChest.prototype, "zj.RelicOpenChest");
})(zj || (zj = {}));
//# sourceMappingURL=RelicOpenChest.js.map