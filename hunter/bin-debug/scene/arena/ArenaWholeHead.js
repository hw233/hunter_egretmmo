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
     * @author 邢利伟
     *
     * @date 2019-2-28
     *
     * @class 跨服格斗场主界面龙骨动画类
     */
    var ArenaWholeHead = (function (_super) {
        __extends(ArenaWholeHead, _super);
        function ArenaWholeHead() {
            var _this = _super.call(this) || this;
            _this.Node = { Node1: null, Node2: null };
            /**判断自身是否能点击 */
            _this.touchvis = true;
            _this.playerInfo = [];
            _this.skinName = "resource/skins/arena/ArenaWholeHeadSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.Down, _this);
            return _this;
        }
        ArenaWholeHead.prototype.dataChanged = function () {
        };
        ArenaWholeHead.prototype.setInfo = function (info, index) {
            this.index = index;
            this.info = info;
            if (this.info == null) {
                return;
            }
            this.setInfoAni();
            this.setInfoItem();
        };
        ArenaWholeHead.prototype.setInfoItem = function () {
            var _this = this;
            var genemy = this.info == null ? 2 : 1;
            // for (let k in this.Node) {
            // 	if (this.Node.hasOwnProperty(k)) {
            // 		let v = this.Node[k];
            // 		v.visible = (Number(k) == genemy)
            // 	}
            // }
            var score = this.info.craft_score > 0 ? this.info.craft_score : 0;
            if (this.info.role_id == -1) {
                // 暂时不写
            }
            var level = zj.singLecraft.GetLevel(score);
            var maproleId = this.getMapRoleInfo(this.info);
            var info = zj.TableMapRole.Item(maproleId).body_spx_id;
            var scale = zj.TableMapRole.Item(maproleId).spine_scale * 0.5;
            var name = zj.TableClientFightAniSpineSource.Item(info).atlas;
            var name1 = zj.TableClientFightAniSpineSource.Item(info).ani_name;
            if (info != -1) {
                this.groupHero.removeChildren();
                zj.Game.DragonBonesManager.getArmatureDisplayAsync(this, name, "armatureName")
                    .then(function (display) {
                    display.scaleX = scale;
                    display.scaleY = scale;
                    zj.setDragonBonesRemove(display);
                    // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    // 	display.animation.stop();
                    // 	display.animation.reset();
                    // 	display.armature.dispose();
                    // 	display.dbClear();
                    // 	display.dispose(true);
                    // 	if (display.parent) display.parent.removeChild(display);
                    // }, null);
                    // display.anchorOffsetX = -display.width / 2;
                    display.anchorOffsetY = -display.height / 2;
                    display.animation.play(name1, 0);
                    _this.groupHero.addChild(display);
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
            var groupStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, zj.singLecraft.decodeGroupName(this.info.group_name, "&", false), zj.singLecraft.decodeGroupName(this.info.group_name, "&", true));
            if (zj.Device.isDebug) {
                var str = "Lv." + this.info.role_level + " " + this.info.role_name + " ID: " + this.info.role_id;
                this.labelPlayerName.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.enemy.name, str));
            }
            else {
                var str = "Lv." + this.info.role_level + " " + this.info.role_name;
                this.labelPlayerName.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.enemy.name, str));
            }
            var honorStr = "<color>r=0,g=249,b=0</color><text>%s</text>";
            var honorCoin = zj.singLecraft.InstanceScore(level).win_coin;
            this.labelPlayerQu.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.enemy.sever, groupStr));
            this.labelPlayerPower.textFlow = zj.Util.RichText(zj.Helper.StringFormat(honorStr, honorCoin));
            this.labelJiFen.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.enemy.score, zj.TextsConfig.TextsConfig_Common.numCH[level - 1] || 0, score));
            this.labelPlayerName.anchorOffsetX = this.labelPlayerName.width / 2;
            this.labelPlayerName.anchorOffsetY = this.labelPlayerName.height / 2;
            this.labelPlayerQu.anchorOffsetX = this.labelPlayerQu.width / 2;
            this.labelPlayerQu.anchorOffsetY = this.labelPlayerQu.height / 2;
            this.labelPlayerPower.anchorOffsetX = this.labelPlayerPower.width / 2;
            this.labelPlayerPower.anchorOffsetY = this.labelPlayerPower.height / 2;
            this.playerInfo = ["Lv." + this.info.role_level + " " + this.info.role_name, groupStr, this.labelJiFen.text, this.info.pic, this.index];
        };
        ArenaWholeHead.prototype.setInfoAni = function () {
            this.groupAni.removeChildren();
            var cssName = zj.TableClientAniCssSource.Item(2001);
            var paths = [this.groupHero, this.labelPlayerName, this.labelPlayerQu, this.labelPlayerPower];
            var bones = ["008_zhantai1_juese", "009_xinxi01", "010_xinxi02", "011_xinxi03"];
            var thisOne = this;
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_gedou_01", null, paths, bones)
                .then(function (armatureDisplay) {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.play("002_juese_xunhuan", 0);
                }, thisOne);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.animation.play("000_juese_chuxian", 1);
                thisOne.groupAni.addChild(armatureDisplay);
            });
            this.touchvis = !this.info.is_win;
            if (this.info.is_win) {
                this.imgSkill.scaleX = this.imgSkill.scaleY = 1.5;
                egret.Tween.get(this.imgSkill).to({ scaleX: 1, scaleY: 1 }, 150);
            }
            else {
                this.imgSkill.visible = false;
            }
        };
        ArenaWholeHead.prototype.getMapRoleInfo = function (info) {
            var picTable = zj.TableItemPic.Table(); //table_item_pic
            var picMapRoleId = picTable[info.pic].mapRole_id;
            var fashionMapRoleInfo = zj.TableItemFashion.Item(info.fashion_id);
            zj.StringConfig_Table.itemHead;
            var fashionMapRoleId = null;
            if (fashionMapRoleInfo != null) {
                fashionMapRoleId = fashionMapRoleInfo.fashion_roleId;
            }
            return fashionMapRoleId || picMapRoleId;
        };
        ArenaWholeHead.prototype.Down = function () {
            if (this.touchvis) {
                var proccess = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
                if (proccess.info % 10 == message.CraftStateType.CRAFT_STATE_TYPE_FIGHTING) {
                    this.enemFormationReq();
                }
                else if (proccess.info % 10 == message.CraftStateType.CRAFT_STATE_TYPE_NONO) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Pk.disenter.skip);
                }
                else {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Pk.disenter.close);
                }
            }
        };
        ArenaWholeHead.prototype.enemFormationReq = function () {
            var thisOne = this;
            zj.Game.PlayerArenaSystem.craftQueryDetail(thisOne.info.role_id)
                .then(function (formations) {
                zj.loadUI(zj.ArenaWholeEnemy)
                    .then(function (dialog) {
                    dialog.setInfo(thisOne.info, formations, null, null, thisOne.playerInfo, thisOne);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }).catch(function (result) {
                zj.toast_warning(zj.Helper.GetErrorString(result));
            });
        };
        return ArenaWholeHead;
    }(zj.UI));
    zj.ArenaWholeHead = ArenaWholeHead;
    __reflect(ArenaWholeHead.prototype, "zj.ArenaWholeHead");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeHead.js.map