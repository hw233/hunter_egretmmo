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
    var League_WarSelectThingItem = (function (_super) {
        __extends(League_WarSelectThingItem, _super);
        function League_WarSelectThingItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fight/League_WarSelectThingItemSkin.exml";
            zj.cachekeys(zj.UIResource["League_WarSelectThingItem"], null);
            _this.init();
            return _this;
        }
        League_WarSelectThingItem.prototype.init = function () {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeClose, this);
            this.ButtonEvent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonReturn, this);
            this.time = egret.setInterval(this.Update, this, 330);
        };
        League_WarSelectThingItem.prototype.dataChanged = function () {
            this.SetItemInfo(this.data);
        };
        League_WarSelectThingItem.prototype.SetItemInfo = function (data) {
            this.id = data.index;
            this.thing = data.thing;
            this.father = data.father;
            this.SpriteAction.source = zj.cachekey(zj.UIConfig.UIConfig_RpgScene.warActionIcon[this.thing.type], this);
            this.LabelThingDes.visible = false;
            this.bVisible = false;
            if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Person) {
                this.LabelThingName.text = this.thing.data.playerInfo.name;
            }
            else if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Building) {
                this.LabelThingName.text = this.thing.data.info.build_name;
            }
            else if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Partner) {
                this.LabelThingName.text = this.thing.data.playerInfo.name;
            }
            else if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Npc) {
                this.LabelThingName.text = this.thing.data.info.build_name;
            }
            else if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Grass) {
                this.LabelThingName.text = this.thing.data.info.tree_name;
            }
            else if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Mob) {
                var num = Number(this.thing.data.playerInfo.name);
                var data_1 = zj.TableLanguage.Item(this.thing.data.playerInfo.name);
                var text = (num && data_1) ? (data_1.ch == null ? data_1['zhcn'] : data_1.ch) : this.thing.data.playerInfo.name;
                this.LabelThingName.text = text;
            }
        };
        League_WarSelectThingItem.prototype.procPerson = function () {
            if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Person || this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Partner) {
                if (this.thing.data.bProgressing == true && this.bVisible == false) {
                    this.LabelThingDes.visible = true;
                    this.bVisible = true;
                }
                if (this.thing.data.bProgressing == false && this.bVisible == true) {
                    this.LabelThingDes.visible = false;
                    this.bVisible = false;
                }
                if (this.thing.data.bProgressing == true && this.bVisible == true) {
                    var value = this.thing.data.controlFrame / this.thing.data.controlMaxFrame * 100;
                    var _tmp = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.person_gather, value);
                    this.LabelThingDes.text = _tmp;
                }
            }
        };
        League_WarSelectThingItem.prototype.procTree = function () {
            if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Grass) {
                if (this.bVisible == false) {
                    this.LabelThingDes.visible = true;
                    this.bVisible = true;
                }
                if (this.bVisible == true) {
                    if (this.thing.data.bMature == false) {
                        if (this.thing.data.unkonwnTime == false) {
                            var _str = zj.Helper.FormatMsTime3(this.thing.data.matureTime / 1000);
                            var _tmp = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.fruit_mature_time_label, _str);
                            this.LabelThingDes.text = _tmp;
                        }
                        else {
                            this.LabelThingDes.text = zj.TextsConfig.TextsConfig_Wonderland.fruit_unknown_time_lable;
                        }
                    }
                    else {
                        var _tmp = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.fruit_cnt_label, this.thing.data.fruitCnt);
                        this.LabelThingDes.text = _tmp;
                    }
                }
            }
        };
        League_WarSelectThingItem.prototype.ButtonReturn = function () {
            this.father.onBtnClose();
            // 安全区域检测
            var fightId = this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Person && this.thing.data.playerInfo.id || 0;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var canDo = scene.delSafeAreaCheck(this.thing.type, fightId);
            if (!canDo)
                return;
            if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Person) {
                scene.collideObjectReq(this.thing.data.playerInfo.id, null);
            }
            else if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Mob) {
                scene.collideObjectReq(this.thing.data.playerInfo.id, null);
            }
            else if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Building) {
                scene.controlBuildReq(this.thing.data.info.build_id, null);
            }
            else if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Partner) {
                scene.pushPersonInterface(this.thing.data.playerInfo);
            }
            else if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Npc) {
                if (this.thing.data.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Exchange) {
                    zj.loadUI(zj.ExchangeMainSence).then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (this.thing.data.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Mora) {
                    zj.loadUI(zj.MoraMainScene).then(function (scene) {
                        scene.Init();
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (this.thing.data.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Fish) {
                    zj.loadUI(zj.FishingMain).then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    return;
                }
            }
            else if (this.thing.type == zj.TableEnum.Enum.LeagueWarTouchType.Grass) {
                scene.wonderlandCollectionReq(this.thing.data.scenePosInfo.roleBase.id, null);
            }
        };
        League_WarSelectThingItem.prototype.removeClose = function () {
            this.father = null;
            egret.clearInterval(this.time);
        };
        League_WarSelectThingItem.prototype.Update = function () {
            this.procPerson();
            this.procTree();
        };
        return League_WarSelectThingItem;
    }(eui.ItemRenderer));
    zj.League_WarSelectThingItem = League_WarSelectThingItem;
    __reflect(League_WarSelectThingItem.prototype, "zj.League_WarSelectThingItem");
    var League_WarSelectThingItemData = (function () {
        function League_WarSelectThingItemData() {
        }
        return League_WarSelectThingItemData;
    }());
    zj.League_WarSelectThingItemData = League_WarSelectThingItemData;
    __reflect(League_WarSelectThingItemData.prototype, "zj.League_WarSelectThingItemData");
})(zj || (zj = {}));
//# sourceMappingURL=League_WarSelectThingItem.js.map