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
    /**
     * @author chen xi
     *
     * @date 2019-1-26
     *
     * @class 格斗场敌人Item.
     */
    var ArenaRivalItem = (function (_super) {
        __extends(ArenaRivalItem, _super);
        function ArenaRivalItem() {
            var _this = _super.call(this) || this;
            _this.info = [];
            _this.vis = true;
            _this.skinName = "resource/skins/arena/ArenaRivalItemSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaRivalItem"], null);
            _this.btnFive.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFive, _this);
            _this.btnFight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFight, _this);
            _this.btnPraise.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPraise, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.groupHunter.removeChildren();
                egret.Tween.removeTweens(_this);
            }, _this);
            if (zj.Device.isReviewSwitch) {
                _this.jewel.x = 65;
                _this.jewel.width = 40;
                _this.jewel.height = 40;
            }
            return _this;
        }
        ArenaRivalItem.prototype.onBtnFive = function () {
            this.data.father.onBtnFive(this.data);
        };
        ArenaRivalItem.prototype.onBtnFight = function () {
            this.data.father.onBtnFight(this.data, this.info);
        };
        ArenaRivalItem.prototype.dataChanged = function () {
            var _this = this;
            var data = this.data;
            if (this.vis) {
                this.vis = false;
                this.data.father.scroll.viewport.scrollH = 1450;
            }
            if (data.index <= 10) {
                this.labelRank.font = "arena2_fnt";
                if (data.index <= 3) {
                    this.imgguang.visible = true;
                }
                else {
                    this.imgguang.visible = false;
                }
                this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Arena.rankTip, data.info["rank"]);
                this.imgPan.source = zj.cachekey("ui_arena_yuanhuan1_png", this);
            }
            else {
                this.imgPan.source = zj.cachekey("ui_arena_yuanhuan2_png", this);
                this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Arena.rankTip, data.info.baseInfo.ladderRank);
                this.labelRank.font = "arena3_fnt";
                this.imgguang.visible = false;
            }
            if (data.info.baseInfo.id < 3000 && data.index <= 10) {
                // this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Arena.rankTip, data.index);
                this.labelName.text = "";
                this.labelLevel.text = "";
                this.group1.visible = false;
                this.group2.visible = false;
                this.groupButton.visible = false;
                this.label.visible = true;
                this.groupHunter.removeChildren();
                return;
            }
            else {
                this.group1.visible = true;
                this.group2.visible = true;
                this.groupButton.visible = true;
                this.label.visible = false;
            }
            this.loadKeel();
            if (data.info.baseInfo == null)
                return;
            if (data.index > 10) {
                this.btnFive.visible = true;
                this.btnFight.visible = true;
                this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Arena.rankTip, data.info.baseInfo.ladderRank);
                // this.imgPan.source = cachekey("ui_arena_yuanhuan2_png", this);
            }
            else {
                this.btnFive.visible = false;
                this.btnFight.visible = false;
                var info = zj.Table.FindR(data.info1, function (k, v) {
                    return v.key == data.info["rank"];
                })[0];
                var str = "";
                var num = (info ? info.value : 0);
                if (num > 1000) {
                    str = (num / 1000).toFixed(1) + "千";
                }
                else if (num > 10000) {
                    str = (num / 10000).toFixed(1) + "万";
                }
                else {
                    str = num.toString();
                }
                this.labelPraise.text = str;
                // this.imgPan.source = cachekey("ui_arena_yuanhuan1_png", this);
                this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Arena.rankTip, data.info["rank"]);
                //是否点赞过
                var vis = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.praiseRanks, function (k, v) {
                    return v == data.info["rank"];
                });
                if (vis) {
                    this.btnPraise.enabled = false;
                }
                else {
                    this.btnPraise.enabled = true;
                }
            }
            this.labelLevel.text = "Lv: " + data.info.baseInfo.level;
            this.labelName.text = data.info.baseInfo.name;
            // 是否可以连续吊打
            var isFiveCombo = function () {
                var ret = false;
                var open = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.LADDERQUICK);
                var max = zj.Game.PlayerInfoSystem.BaseInfo.ladderMax;
                var ladderRank = (max <= zj.CommonConfig.ladder_quick_reward_rank && max != 0);
                if ((open || ladderRank) && _this.itemIndex == 12) {
                    ret = true;
                }
                return ret;
            };
            var winGetToken = function (info) {
                var str = _this.labelLevel.text + " " + _this.labelName.text;
                _this.info = [_this.labelRank.text, str, data.info.baseInfo.id];
                var token = 0;
                if (zj.Game.PlayerInfoSystem.BaseInfo.ladderMax == 0) {
                    zj.Game.PlayerInfoSystem.BaseInfo.ladderMax = zj.Game.PlayerInfoSystem.BaseInfo.ladderRank;
                }
                if (zj.Game.PlayerInfoSystem.BaseInfo.ladderMax <= data.info.baseInfo.ladderRank) {
                    return token;
                }
                var ladderScores = zj.TableLadderScore.Table();
                var max = zj.Game.PlayerInfoSystem.BaseInfo.ladderMax;
                var oldInfo, newInfo;
                for (var k in ladderScores) {
                    if (ladderScores.hasOwnProperty(k)) {
                        var v = ladderScores[k];
                        if (v.rank_min < max && v.rank_max >= max) {
                            oldInfo = v;
                        }
                        if (v.rank_min < info.ladderRank && v.rank_max >= info.ladderRank) {
                            newInfo = v;
                        }
                    }
                }
                if (oldInfo == newInfo) {
                    token = (max - info.ladderRank) * oldInfo.reward_token;
                }
                else {
                    var middle = 0;
                    for (var i = oldInfo.id - 1; i > newInfo.id + 1; i--) {
                        var ladderInfo = ladderScores[i];
                        middle += (ladderInfo.rank_max - ladderInfo.rank_min) * ladderInfo.reward_token;
                    }
                    token = (max - oldInfo.rank_min) * oldInfo.reward_token + (newInfo.rank_max - info.ladderRank) * newInfo.reward_token + middle;
                }
                var vipInfo = zj.Game.PlayerVIPSystem.vipInfo;
                if (vipInfo.pvpPower < 1 && token < 30) {
                    token = 30;
                }
                return Math.floor(token);
            };
            if (data.index > 10) {
                this.labelRank.font = "arena3_fnt";
                this.group1.visible = true;
                this.group2.visible = false;
                this.btnPraise.visible = false;
                this.imgguang.visible = false;
                if (isFiveCombo()) {
                    this.btnFight.visible = false;
                    this.btnFive.visible = true;
                    this.group1.visible = false;
                }
                else {
                    this.group1.visible = true;
                    this.btnFight.visible = true;
                    this.btnFive.visible = false;
                    this.labelTime.visible = false;
                    var token = winGetToken(data.info.baseInfo);
                    var str = "";
                    if (token > 1000) {
                        str = (token / 1000).toFixed(1) + "千";
                    }
                    else if (token > 10000) {
                        str = (token / 10000).toFixed(1) + "万";
                    }
                    else {
                        str = token.toString();
                    }
                    this.labelRivalAwardNumber.text = str;
                }
            }
            else {
                this.labelRank.font = "arena2_fnt";
                if (data.index <= 3) {
                    this.imgguang.visible = true;
                }
                else {
                    this.imgguang.visible = false;
                }
                this.group1.visible = false;
                this.group2.visible = true;
                this.btnPraise.visible = true;
            }
            if (zj.Device.isReviewSwitch) {
                this.labelRank.visible = false;
                this.btnFight.visible = true;
                this.btnFive.visible = false;
                this.labelTime.visible = false;
            }
        };
        /**加载龙骨 */
        ArenaRivalItem.prototype.loadKeel = function () {
            var _this = this;
            var maproleId = this.getMapRoleInfo(this.data.info.baseInfo);
            var info = zj.TableMapRole.Item(maproleId).body_spx_id;
            var scale = zj.TableMapRole.Item(maproleId).spine_scale * 0.8;
            var name = zj.TableClientFightAniSpineSource.Item(info).atlas;
            var name1 = zj.TableClientFightAniSpineSource.Item(info).ani_name;
            this.groupHunter.removeChildren();
            if (info != -1) {
                zj.Game.DragonBonesManager.getArmatureDisplayAsync(this, name, "armatureName")
                    .then(function (display) {
                    display.scaleX = scale;
                    display.scaleY = scale;
                    zj.setDragonBonesRemove(display);
                    // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     display.animation.stop();
                    //     display.animation.reset();
                    //     display.armature.dispose();
                    //     display.dbClear();
                    //     display.dispose(true);
                    //     if (display.parent) display.parent.removeChild(display);
                    // }, null);
                    display.animation.play(name1, 0);
                    _this.groupHunter.removeChildren();
                    _this.groupHunter.addChild(display);
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
        };
        ArenaRivalItem.prototype.onBtnPraise = function () {
            var _this = this;
            var data = this.data;
            var rank = 0;
            if (data.index > 10) {
                rank = data.info.baseInfo.ladderRank;
            }
            else {
                rank = data.info["rank"];
            }
            this.jinbi = zj.Game.PlayerInfoSystem.Coin;
            zj.Game.PlayerArenaSystem.ladderPraiseRank(rank)
                .then(function (body) {
                var value = zj.Table.FindR(body.ladder_praise, function (k, v) {
                    return v.key == rank;
                })[0];
                // data.info["value"] = value.value;
                var info = zj.Table.FindR(data.info1, function (k, v) {
                    return v.key == rank;
                });
                if (info[0]) {
                    data.info1[info[1]].value = value.value;
                }
                else {
                    var a = new message.IIKVPairs();
                    a.key = data.index;
                    a.value = value.value;
                    data.info1.push(a);
                }
                var str = "";
                var num = value.value;
                if (num > 1000) {
                    str = (num / 1000).toFixed(1) + "千";
                }
                else if (num > 10000) {
                    str = (num / 10000).toFixed(1) + "万";
                }
                else {
                    str = num.toString();
                }
                _this.labelPraise.text = str;
                _this.btnPraise.enabled = false;
                var jinbi = new message.GoodsInfo();
                jinbi.goodsId = 20001;
                jinbi.count = zj.Game.PlayerInfoSystem.Coin - _this.jinbi;
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init([jinbi]);
                    dialog.show();
                });
            });
        };
        ArenaRivalItem.prototype.getMapRoleInfo = function (info) {
            var picTable = zj.TableItemPic.Table();
            var picMapRoleId = picTable[info.picId].mapRole_id;
            var fashionMapRoleInfo = zj.TableItemFashion.Item(info.fashion_id);
            var fashionMapRoleId = null;
            if (fashionMapRoleInfo != null) {
                fashionMapRoleId = fashionMapRoleInfo.fashion_roleId;
            }
            return fashionMapRoleId || picMapRoleId;
        };
        return ArenaRivalItem;
    }(eui.ItemRenderer));
    zj.ArenaRivalItem = ArenaRivalItem;
    __reflect(ArenaRivalItem.prototype, "zj.ArenaRivalItem");
    var ArenaRivalItemData = (function () {
        function ArenaRivalItemData() {
        }
        return ArenaRivalItemData;
    }());
    zj.ArenaRivalItemData = ArenaRivalItemData;
    __reflect(ArenaRivalItemData.prototype, "zj.ArenaRivalItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaRivalItem.js.map