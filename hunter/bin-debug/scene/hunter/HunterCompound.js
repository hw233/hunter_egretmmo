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
    /**猎人合成
     *邢利伟
     *2018.12.19
     * @class HunterCompound
     */
    var HunterCompound = (function (_super) {
        __extends(HunterCompound, _super);
        function HunterCompound() {
            var _this = _super.call(this) || this;
            /**武将列表数据源 */
            _this.listGetHeroData = new eui.ArrayCollection();
            /**武将合成材料列表数据源 */
            _this.listMaterialData = new eui.ArrayCollection();
            /**详情数据源 */
            _this.listSkillData = new eui.ArrayCollection();
            /** 上次选中猎人ID */
            _this.lastSelectedHunterId = 0;
            _this.composeTable = [];
            /**判断list是否被点击 */
            _this.isUp = false;
            _this.array = [];
            _this.itemListMaterial = [];
            _this.skinName = "resource/skins/hunter/HunterCompoundSkin.exml";
            _this.init();
            return _this;
        }
        HunterCompound.prototype.init = function () {
            var _this = this;
            this.loadLeftHunterInfoList();
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnConpound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConpound, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            this.update = egret.setInterval(this.Update, this, 1000);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
                egret.Tween.removeTweens(_this);
            }, this);
            egret.Tween.get(this).wait(10).call(function () {
                _this.Update();
            });
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
        };
        HunterCompound.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterCompound.prototype.onBtnAddGemstone = function () {
            // toast_success("加钻石功能未开启");
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
            });
        };
        HunterCompound.prototype.CB = function (cb) {
            this.cb = cb;
        };
        HunterCompound.prototype.Update = function () {
            //钻石数量
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                this.labelIntegrate.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            }
            else {
                this.labelIntegrate.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            //钻石数量
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                this.labelToken.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            }
            else {
                this.labelToken.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            if (this.labelIntegrate.width < 60) {
                this.labelIntegrate.width = 60;
            }
            if (this.labelToken.width < 60) {
                this.labelToken.width = 60;
            }
            this.groupMoney.width = this.groupMoney1.width + this.groupMoney2.width + 20;
        };
        /**加载左侧武将列表 */
        HunterCompound.prototype.loadLeftHunterInfoList = function () {
            var table = zj.TableGeneralMake.Table();
            this.generalId = table[1].compose_id;
            for (var k in table) {
                if (table.hasOwnProperty(k)) {
                    var v = table[k];
                    this.array.push(v);
                }
            }
            var info = zj.Table.DeepCopy(this.array);
            var fix = zj.PlayerItemSystem.FixCount(info.length, 15, 3);
            for (var i = 0; i < fix; i++) {
                var one = new zj.TableGeneralMake();
                one.compose_id = 0;
                info.push(one);
            }
            this.listGetHeroData.removeAll();
            for (var i = 0; i < info.length; i++) {
                var v = info[i];
                var data = new zj.HunterCompoundItemData();
                data.index = i;
                if (i == this.lastSelectedHunterId) {
                    data.isSelected = true;
                }
                else {
                    data.isSelected = false;
                }
                data.info = v;
                data.skill = v.compose_id;
                data.father = this;
                this.listGetHeroData.addItem(data);
            }
            this.listGetHero.dataProvider = this.listGetHeroData;
            this.listGetHero.itemRenderer = zj.HunterCompoundItem;
            this.listGetHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickGetHeroList, this);
            this.setRightInfo();
        };
        /**列表点击 */
        HunterCompound.prototype.onClickGetHeroList = function (e, vis) {
            if (vis != true) {
                if (this.lastSelectedHunterId == e.itemIndex || e.itemIndex > this.array.length) {
                    return;
                }
            }
            this.composeTable = [];
            var lastData = this.listGetHeroData.getItemAt(this.lastSelectedHunterId);
            if (lastData) {
                lastData.isSelected = false;
                this.listGetHeroData.replaceItemAt(lastData, this.lastSelectedHunterId);
            }
            if (vis != true) {
                this.lastSelectedHunterId = e.itemIndex;
            }
            var data = this.listGetHeroData.getItemAt(this.lastSelectedHunterId);
            data.isSelected = true;
            this.listGetHeroData.replaceItemAt(data, this.lastSelectedHunterId);
            this.setRightInfo();
        };
        /**设置右侧信息 */
        HunterCompound.prototype.setRightInfo = function () {
            this.selectInfo = this.array[this.lastSelectedHunterId];
            this.generalId = this.selectInfo.compose_id;
            this.loadMaterialsInfo();
            this.lodeSkillInfo();
            this.refreshRightHunterInfo();
        };
        /**加载材料信息*/
        HunterCompound.prototype.loadMaterialsInfo = function () {
            this.listMaterialData.removeAll();
            for (var i = 0; i < this.selectInfo.exchange_ids.length; i++) {
                var data = new zj.HunterCompoundItemRightData();
                data.index = i;
                data.composeId = this.selectInfo.compose_id;
                data.id = this.selectInfo.exchange_ids[i];
                data.level = this.selectInfo.exchange_level[i];
                data.star = this.selectInfo.exchange_star[i];
                data.awaken = this.selectInfo.exchange_awaken[i];
                data.aptitude = this.selectInfo.exchange_aptitude[i];
                data.father = this;
                this.listMaterialData.addItem(data);
            }
            this.listMaterial.dataProvider = this.listMaterialData;
            this.listMaterial.itemRenderer = zj.HunterCompoundItemRight;
        };
        /**刷新右侧信息 */
        HunterCompound.prototype.refreshRightHunterInfo = function () {
            var generalId = this.generalId;
            /**获取武将信息 */
            var hunter = zj.PlayerHunterSystem.Table(generalId);
            var pathHead = zj.PlayerHunterSystem.Head(generalId);
            var pathAptitude = zj.UIConfig.UIConfig_General.hunter_grade[hunter.aptitude];
            var star = hunter.init_star;
            var pathName = hunter.name_pic;
            //右上方武将信息刷新
            this.imgIcon.source = zj.cachekey(pathHead, this);
            this.labelLevel.text = "1";
            zj.Helper.SetHeroAwakenStar(this.groupStar, star, 0);
            zj.Helper.SetHeroAwakenStar(this.groupStart, star, 0);
            this.imgGrade.source = zj.cachekey(pathAptitude, this);
            this.imgHunterType.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_type4[hunter.features], this);
            this.imgHunterName.source = zj.cachekey(pathName, this);
            this.imgFrame.source = zj.cachekey(zj.PlayerHunterSystem.GetGeneralFrame(generalId), this);
            /**武将属性信息 */
            var hunterAttributeInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            hunterAttributeInfo = new message.GeneralInfo();
            hunterAttributeInfo.general_id = generalId;
            hunterAttributeInfo.star = zj.PlayerHunterSystem.Table(generalId).init_star;
            hunterAttributeInfo.level = 1;
            hunterAttributeInfo.step = 0;
            hunterAttributeInfo.awakePassive.level = 0;
            /**属性信息赋值 */
            var info = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterAttributeInfo)[0];
            for (var i = 0; i < zj.TableEnum.EnumHunterAttriShow3.length; i++) {
                var vv = zj.TableEnum.EnumHunterAttriShow3[i];
                var str = String(Math.ceil(info[vv - 1]));
                var labelAttri = this.groupInfo.getChildByName("labelAtt" + (Number(i) + 1));
                labelAttri.text = String(str);
            }
            this.lableConpoundMoney.text = zj.Set.NumberUnit3(this.selectInfo.consume);
        };
        /**加载技能信息*/
        HunterCompound.prototype.lodeSkillInfo = function () {
            var genTable = zj.PlayerHunterSystem.Table(this.generalId);
            this.listSkillData.removeAll();
            for (var kk in genTable.skill_ids) {
                if (genTable.skill_ids.hasOwnProperty(kk)) {
                    var vv = genTable.skill_ids[kk];
                    var data = new zj.HunterSeeDetailItemData();
                    data.index = Number(kk);
                    data.generalId = this.generalId;
                    data.skillId = vv;
                    data.father = this;
                    this.listSkillData.addItem(data);
                }
            }
            if (genTable.init_passive[0] != 0) {
                var data = new zj.HunterSeeDetailItemData();
                data.index = 2;
                data.generalId = this.generalId;
                data.skillId = genTable.init_passive[0];
                data.father = this;
                this.listSkillData.addItem(data);
            }
            if (genTable.awake_passive != 0) {
                var data = new zj.HunterSeeDetailItemData();
                data.index = 3;
                data.generalId = this.generalId;
                data.skillId = genTable.awake_passive;
                data.father = this;
                this.listSkillData.addItem(data);
            }
            this.listSkill.dataProvider = this.listSkillData;
            this.listSkill.itemRenderer = zj.HunterSeeDetailItem;
        };
        /**关闭窗口 */
        HunterCompound.prototype.onBtnClose = function () {
            if (this.cb)
                this.cb();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        /**子项点击抬起调用的方法 */
        HunterCompound.prototype.subitemClick = function (isUp, data) {
            var _this = this;
            var ui = this.getChildByName("UI");
            if (ui) {
                return;
            }
            zj.loadUI(zj.Common_DesSkill)
                .then(function (dialog) {
                dialog.name = "UI";
                dialog.x = _this.groupMax.x + _this.groupRight.x + 92 * data.index - dialog.width / 3 + 13;
                dialog.y = _this.groupMax.y + _this.groupRight.y + 73;
                if (data.index == 2 || data.index == 3) {
                    dialog.setInfoTalent(data.skillId, data.index);
                }
                else {
                    dialog.setInfoSkill(data.skillId, data.index, 1);
                }
                _this.addChild(dialog);
            });
        };
        /**抬起移除技能详情对话框 */
        HunterCompound.prototype.up = function () {
            var ui = this.getChildByName("UI");
            if (ui) {
                this.removeChild(ui);
            }
        };
        /**点击合成按钮 */
        HunterCompound.prototype.onBtnConpound = function () {
            var _this = this;
            /**判断数据是否为空 */
            var judgeInfo = true;
            for (var i = 0; i < this.composeTable.length; i++) {
                if (this.composeTable[i] == null) {
                    judgeInfo = false;
                }
            }
            if (this.selectInfo.exchange_ids.length != this.composeTable.length || judgeInfo == false) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_Compound.notEnough);
                return;
            }
            var msg = zj.TextsConfig.TextsConfig_Hunter_Compound.confirmCompound;
            var thisOne = this;
            zj.TipManager.ShowConfirmCancel(msg, function () {
                zj.Game.PlayerHunterSystem.generalCompound(_this.lastSelectedHunterId, _this.composeTable, function () {
                    thisOne.onClickGetHeroList(null, true);
                    // toast("合成成功");
                    //加获得猎人的动画
                    //添加遮罩
                    if (thisOne.shade == null) {
                        thisOne.shade = new zj.CommonShade();
                    }
                    thisOne.addChild(thisOne.shade);
                    for (var i = 0; i < thisOne.listMaterialData.length; i++) {
                        var a = thisOne.listMaterial.$children[i];
                        a.donghua();
                    }
                    egret.Tween.get(thisOne).wait(400).call(function () {
                        zj.Game.DragonBonesManager.playAnimation(thisOne, "ui_lieren_hecheng", "armatureName", "0001_guang2", 1)
                            .then(function (display) {
                            display.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                                if (thisOne.shade != null) {
                                    thisOne.removeChild(thisOne.shade);
                                }
                                zj.loadUI(zj.TavernGetGeneral)
                                    .then(function (taverngetgeneral) {
                                    taverngetgeneral.init(thisOne);
                                    taverngetgeneral.setInfo(zj.TableGeneralMake.Table()[thisOne.lastSelectedHunterId + 1].compose_id, 1, 1, true);
                                    thisOne.addChild(taverngetgeneral);
                                });
                            }, thisOne);
                            display.x = thisOne.groupLog.width / 2;
                            display.y = thisOne.groupLog.height / 2;
                            thisOne.groupLog.addChild(display);
                        })
                            .catch(function (reason) {
                            zj.toast(reason);
                        });
                    });
                });
            });
        };
        HunterCompound.prototype.getItemListMaterial = function () {
            this.itemListMaterial = [];
            for (var i = 0; i < this.selectInfo.exchange_ids.length; i++) {
                var item = this.listMaterial.getElementAt(i);
                this.itemListMaterial.push(item);
            }
        };
        return HunterCompound;
    }(zj.Dialog));
    zj.HunterCompound = HunterCompound;
    __reflect(HunterCompound.prototype, "zj.HunterCompound");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCompound.js.map