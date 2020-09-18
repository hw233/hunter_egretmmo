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
     * @date 2018-11-23
     *
     * @class 猎人升级
     */
    var HunterUpLevel = (function (_super) {
        __extends(HunterUpLevel, _super);
        function HunterUpLevel() {
            var _this = _super.call(this) || this;
            _this.generalId = 0;
            _this.callback = null;
            _this.thisObj = null;
            _this.itemId = null;
            _this.itemList = [];
            /**计算经验道具数量用 */
            _this.propList = [];
            /**刷新数据用 */
            _this.propSend = [];
            /**服务器发协议用 */
            _this.propGoods = [];
            /**子项道具图片ID */
            _this.PROP_INDEX = [30001, 30002, 30003, 30004];
            _this.MAXLEVEL = 60;
            _this.LEVELSHOW = 0;
            /**长按道具使用需要的时间*/
            _this.time = 0;
            /**判断长按是否开始 */
            _this.visStart = false;
            /**判断长按是否结束 */
            _this.visOver = false;
            /**解决升多级或升一级时动画执行 */
            _this.viscartoon = true;
            _this.canTeach = false;
            _this.array = new eui.ArrayCollection();
            //判断使用道具是点击list列表还是点击升级按钮
            _this.vislevel = false;
            _this.item_list = [];
            _this.skinName = "resource/skins/hunter/HunterUpLevelSkin.exml";
            _this.init();
            return _this;
        }
        HunterUpLevel.prototype.init = function () {
            var _this = this;
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnLevel.addEventListener(tap, this.onBtnLevel, this);
            this.btnLevelX.addEventListener(tap, this.onBtnLevelX, this);
            this.btnGoUpGrade.addEventListener(tap, this.onBtnGoUpGrade, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.removeEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
            }, this);
            this.spriteExpBar.mask = this.spriteBarExpBg;
            for (var i = 0; i < 4; i++) {
                var propfore = new message.GoodsInfo();
                propfore.goodsId = this.PROP_INDEX[i];
                this.propGoods.push(propfore);
                var propone = new message.GoodsInfo();
                propone.goodsId = this.PROP_INDEX[i];
                propone.count = 0;
                this.propSend.push(propone);
                var propThree = new message.GoodsInfo();
                propThree.goodsId = this.PROP_INDEX[i];
                propThree.count = 0;
                this.propList.push(propThree);
            }
        };
        /**主循环 */
        HunterUpLevel.prototype.update = function () {
            if (this.visOver == false)
                return;
            if (this.visStart == true) {
                this.time++;
                if (this.time > 3) {
                    if (this.falseLevel >= this.maxStepLevel) {
                        this.visStart = false;
                    }
                    else {
                        this.rankCurrent += Number(zj.PlayerItemSystem.Table(this.PROP_INDEX[this.itemId]).general_exp); //当前经验加使用道具获得的经验
                        //加道具使用量
                        this.itemList[this.itemId].count++;
                        this.propSend[this.itemId].count++;
                        //刷新数据
                        this.setPropUseOne();
                        this.countProgressbar();
                        //计算进度条
                        this.labelExpNum.text = this.rankCurrent + "/" + this.rankCrest;
                        var generalLevel = this.falseLevel;
                        var generalInfo = zj.PlayerHunterSystem.Table(this.generalId);
                        var levelString = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_HeroMain.Upgrade_NameLv, generalInfo.general_name, generalLevel, this.maxStepLevel);
                        this.labelLevel.text = levelString;
                        this.spriteBarExpBg.x = this.spriteExpBar.x - this.spriteBarExpBg.width + this.spriteBarExpBg.width * this.rankCurrent / this.rankCrest;
                        //道具动画
                        this.runShow();
                        this.time = 0;
                    }
                }
            }
            else {
                this.setPropUseEnd(this.itemId);
                this.visOver = false;
            }
        };
        /**计算进度条 */
        HunterUpLevel.prototype.countProgressbar = function () {
            if (this.rankCurrent > this.rankCrest) {
                this.rankCurrent -= this.rankCrest;
                this.falseLevel++;
                this.rankCrest = zj.TableLevel.Item(this.falseLevel).general_exp[0];
                // let [expNow, expNext,_] = PlayerHunterSystem.Exp(this.generalId);
                // let experienceString;
                // if (this.falseLevel == this.maxGeneralLevel && this.rankCrest == this.rankCurrent) {
                //     experienceString = TextsConfig.TextsConfig_HeroMain.level_max;
                //     this.labelExpNum.text = experienceString;
                // }
                this.countProgressbar();
            }
        };
        /**悬浮框缓动动画 */
        HunterUpLevel.prototype.runAni = function () {
            var _this = this;
            var off = 4 + 2 * Math.random();
            egret.Tween.get(this.gInfor)
                .to({ y: off }, (2.5 - 0.5 * Math.random()) * 1000, egret.Ease.sineInOut)
                .to({ y: -off }, (2.5 - 0.5 * Math.random()) * 1000, egret.Ease.sineInOut)
                .wait(0.5 * Math.random() * 1000)
                .call(function () {
                _this.runAni();
            }, this);
        };
        HunterUpLevel.prototype.getItemList = function () {
            for (var i = 0; i < 4; i++) {
                var item = this.listExpPill.getElementAt(i);
                this.item_list.push(item);
            }
        };
        /**加载列表 */
        HunterUpLevel.prototype.loadList = function () {
            for (var i = 0; i < 4; i++) {
                var data = new zj.HunterUpLevelItemData();
                data.index = i;
                data.count = 0;
                data.iconId = this.PROP_INDEX[i];
                data.father = this;
                this.array.addItem(data);
                this.itemList.push(data);
            }
            this.listExpPill.dataProvider = this.array;
            this.listExpPill.itemRenderer = zj.HunterUpLevelItem;
            this.listExpPill.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBtnList, this);
        };
        HunterUpLevel.prototype.setInfo = function (generalId, cb, thisObj) {
            this.generalId = generalId;
            this.callback = cb;
            this.thisObj = thisObj;
            this.oldBattleValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            var hunter = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            this.falseLevel = zj.Game.PlayerHunterSystem.queryHunter(generalId).level;
            if (hunter.break_level != 0 && hunter.level >= 60) {
                var _a = zj.PlayerHunterSystem.GetBreakHunterLevel(hunter.break_level), _ = _a[0], levelNext = _a[1];
                this.maxGeneralLevel = 60 + levelNext;
                this.maxStepLevel = this.maxGeneralLevel;
            }
            else {
                this.maxGeneralLevel = zj.TableGeneralStep.Item(zj.CommonConfig.general_max_quality).max_level;
                this.maxStepLevel = zj.PlayerHunterSystem.GetStep(generalId).max_level;
            }
            this.loadList();
            this.refreshInfo();
            this.SetInfoTeach();
        };
        /**点击列表相应 */
        HunterUpLevel.prototype.onBtnList = function (e) {
            var _this = this;
            /**判断武将当前等级是否小于最大等级 */
            if (zj.Game.PlayerHunterSystem.queryHunter(this.generalId).level < this.maxStepLevel) {
                if (zj.Game.PlayerItemSystem.itemCount(this.PROP_INDEX[e.itemIndex]) == 0) {
                    zj.loadUI(zj.Common_OutPutDialog)
                        .then(function (dialog) {
                        dialog.setInfo(_this.PROP_INDEX[e.itemIndex], _this, function () {
                            _this.refreshInfo();
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    this.itemId = e.itemIndex;
                    this.vislevel = false;
                    this.popItem = this.listExpPill.getElementAt(e.itemIndex);
                    if (this.visOver == false) {
                        for (var i = 0; i < 4; i++) {
                            this.itemList[i].count = 0;
                        }
                        this.itemList[e.itemIndex].count += 1;
                        this.setPropUseEnd(e.itemIndex);
                        this.itemList[e.itemIndex].count = 0;
                    }
                }
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.step_level_max);
            }
        };
        HunterUpLevel.prototype.SetInfoTeach = function () {
            var generalInfo = zj.TableBaseGeneral.Item(this.generalId % zj.CommonConfig.general_id_to_index_multiple);
            //可升级
            var hunter = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var generalLevel = hunter.level;
            var cond2 = generalLevel < this.maxStepLevel;
            this.canTeach = cond2;
        };
        /**刷新信息*/
        HunterUpLevel.prototype.refreshInfo = function () {
            /**显示头像边框 */
            var framePath = zj.PlayerHunterSystem.Frame(this.generalId);
            this.spriteHeroFrame.source = zj.cachekey(framePath, this);
            /**显示头像 */
            var headPath = zj.PlayerHunterSystem.Head(this.generalId);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                this.spriteHeroHead.source = zj.cachekey("wx_" + headPath, this);
            }
            else {
                this.spriteHeroHead.source = zj.cachekey(headPath, this);
            }
            /**获取武将信息*/
            var hunter = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            /**武将等级 */
            var levelString;
            var generalLevel = hunter.level;
            var generalInfo = zj.PlayerHunterSystem.Table(this.generalId);
            levelString = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_HeroMain.Upgrade_NameLv, generalInfo.general_name, generalLevel, this.maxStepLevel);
            this.labelLevel.text = levelString;
            /**武将经验值 */
            var _a = zj.PlayerHunterSystem.Exp(this.generalId), expNow = _a[0], expNext = _a[1], _ = _a[2];
            var experienceString;
            if (generalLevel == this.maxGeneralLevel && expNow == expNext) {
                experienceString = zj.TextsConfig.TextsConfig_HeroMain.level_max;
            }
            else {
                experienceString = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_HeroMain.Upgrade_Exp, expNow, expNext);
            }
            this.labelExpNum.text = experienceString;
            /**显示进度条 */
            var _b = experienceString.split("/"), nexpNow = _b[0], nexpNext = _b[1];
            this.rankCurrent = Number(nexpNow);
            this.rankCrest = Number(nexpNext);
            this.spriteBarExpBg.x = this.spriteExpBar.x - this.spriteBarExpBg.width + this.spriteBarExpBg.width * this.rankCurrent / this.rankCrest;
            /**等级判断 */
            var b_max;
            /**猎人突破等级上限 */
            var stepLevel;
            if (hunter.break_level != zj.CommonConfig.general_max_break) {
                stepLevel = zj.PlayerHunterSystem.GetBreakHunterLevel(hunter.break_level + 1)[1];
            }
            else {
                stepLevel = zj.PlayerHunterSystem.GetBreakHunterLevel(hunter.break_level)[1];
            }
            if (hunter.level < 60) {
                b_max = hunter.level >= this.maxGeneralLevel; //当前武将等级是否大于最大武将等级
            }
            else {
                b_max = (hunter.level >= this.MAXLEVEL + stepLevel) || (hunter.level >= this.MAXLEVEL + stepLevel);
            } //当前武将等级>=60级+突破等级上线                 //突破等级>= 60级+突破等级上限  
            /**最大武将等级>当前武将等级 并且 最大武将等级不等于突破等级 */
            var toTopLevel = (this.maxStepLevel > hunter.level) && (this.maxStepLevel != hunter.break_level);
            /**武将等级是否大于等于0 */
            var blevel = generalLevel >= this.LEVELSHOW;
            if (b_max) {
                this.gInfo.visible = false; //前往进阶按钮与说明悬浮框
                this.btnLevel.visible = false; //升一级按钮
                this.btnLevelX.visible = false; //升多级按钮
                this.lableLevelNum.visible = false; //升多级按钮上数字
                this.spriteLevel.visible = false; //长按道具图标可连续使用图片
                this.spriteHunterLevelMax.visible = true; //已满级图片
            }
            else if (hunter.level >= 60 && this.maxGeneralLevel >= 60) {
                if (toTopLevel) {
                    this.gInfo.visible = false;
                    this.btnLevel.visible = blevel;
                    this.btnLevelX.visible = blevel;
                    this.lableLevelNum.visible = blevel;
                    this.spriteLevel.visible = !blevel;
                    this.spriteHunterLevelMax.visible = false;
                }
                else {
                    this.gInfo.visible = true;
                    this.runAni();
                    this.btnLevel.visible = false;
                    this.btnLevelX.visible = false;
                    this.lableLevelNum.visible = false;
                    this.spriteLevel.visible = false;
                    this.btnGoUpGrade.visible = false; //前往进阶按钮
                    this.spriteHunterLevelMax.visible = false;
                    this.labelTip.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_HeroMain.GradeAndBreak, hunter.break_level + 1, this.MAXLEVEL + stepLevel));
                }
            }
            else {
                if (toTopLevel) {
                    this.gInfo.visible = false;
                    this.btnLevel.visible = blevel;
                    this.btnLevelX.visible = blevel;
                    this.lableLevelNum.visible = blevel;
                    this.spriteLevel.visible = !blevel;
                }
                else {
                    this.gInfo.visible = true;
                    this.runAni();
                    this.btnLevel.visible = false;
                    this.btnLevelX.visible = false;
                    this.labelExpNum.visible = true; //进度条上显示的当前经验值与最大经验值
                    this.spriteLevel.visible = false;
                    console.log(zj.PlayerHunterSystem.GetStep(this.generalId).general_step);
                    var _c = zj.PlayerHunterSystem.UpLevelNeedGrade(zj.PlayerHunterSystem.GetStep(this.generalId).general_step), step = _c[0], level = _c[1];
                    this.labelTip.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_HeroMain.GradeAndLevel, step, level));
                    console.log(zj.Helper.StringFormat("<color>r=8059647,g=8059647,b=8059647</color><text>初级猎人</text>"));
                }
                this.spriteHunterLevelMax.visible = false;
            }
            /**虚假等级刷新 */
            this.falseLevel = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).level;
            /**升多级按钮上数字*/
            var maxlevel = 0;
            if (this.maxStepLevel - zj.Game.PlayerHunterSystem.queryHunter(this.generalId).level >= 5) {
                maxlevel = 5;
            }
            else {
                maxlevel = this.maxStepLevel - zj.Game.PlayerHunterSystem.queryHunter(this.generalId).level;
            }
            this.lableLevelNum.text = String(maxlevel);
        };
        /**关闭弹窗*/
        HunterUpLevel.prototype.onBtnClose = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        /**升一级*/
        HunterUpLevel.prototype.onBtnLevel = function () {
            this.getItemList();
            if (zj.Game.PlayerHunterSystem.queryHunter(this.generalId).level < this.maxStepLevel) {
                this.itemList = this.countExperienceProp(this.rankCrest - this.rankCurrent);
                if (this.itemList[0].count <= zj.Game.PlayerItemSystem.itemCount(this.PROP_INDEX[0]) &&
                    this.itemList[1].count <= zj.Game.PlayerItemSystem.itemCount(this.PROP_INDEX[1]) &&
                    this.itemList[2].count <= zj.Game.PlayerItemSystem.itemCount(this.PROP_INDEX[2]) &&
                    this.itemList[3].count <= zj.Game.PlayerItemSystem.itemCount(this.PROP_INDEX[3])) {
                    if (this.itemList[0].count == 0 && this.itemList[1].count == 0 && this.itemList[2].count == 0 && this.itemList[3].count == 0) {
                        zj.toast_warning(zj.TextsConfig.TextsConfig_Error.upgrade_not_enough);
                        return;
                    }
                    for (var j = 0; j < 4; j++) {
                        if (this.itemList[j].count != 0) {
                            this.setPropUseEnd(j);
                            this.itemId = j;
                            this.vislevel = true;
                            this.popItem = this.listExpPill.getElementAt(j);
                            this.itemList[j].count = 0;
                        }
                    }
                }
            }
            this.viscartoon = false;
        };
        /**计算经验道具 */
        HunterUpLevel.prototype.countExperienceProp = function (experience) {
            //k 前数组下标 v 前数组物品编号
            var prop = zj.Table.InitF(this.PROP_INDEX, function (_, v) {
                var goodsId = v;
                var count = 0;
                var index = zj.PlayerItemSystem.Count(v);
                var showType = 0;
                var overdueTime = 0;
                var a = zj.PlayerItemSystem.Table(v);
                var experience = Number(a.general_exp);
                return { "goodsId": goodsId, "count": count, "index": index, "showType": showType, "overdueTime": overdueTime, "experience": experience };
            });
            var bFull = false;
            var count = 0;
            for (var k in prop) {
                if (prop.hasOwnProperty(k)) {
                    var v = prop[k];
                    for (var i = 0; i < v.index; i++) {
                        var j = v[i];
                        if (v.experience + count <= experience) {
                            v.count = v.count + 1;
                            count = count + v.experience;
                        }
                        else {
                            v.count = v.count + 1;
                            bFull = true;
                        }
                        if (bFull) {
                            break;
                        }
                    }
                }
                if (bFull) {
                    break;
                }
            }
            for (var k = 0; k < prop.length; k++) {
                var v = prop[k];
                v.index = 0;
                v.experience = null;
            }
            return prop;
        };
        /**升多级*/
        HunterUpLevel.prototype.onBtnLevelX = function () {
            if (zj.Game.PlayerHunterSystem.queryHunter(this.generalId).level < this.maxStepLevel) {
                var maxLevel = Math.min(this.maxStepLevel, this.maxGeneralLevel);
                var _a = zj.PlayerHunterSystem.ExpFive(this.generalId, maxLevel), experienceNow = _a[0], experienceNext = _a[1];
                this.itemList = this.countExperienceProp(experienceNext - experienceNow);
                if (this.itemList[0].count <= zj.Game.PlayerItemSystem.itemCount(this.PROP_INDEX[0]) &&
                    this.itemList[1].count <= zj.Game.PlayerItemSystem.itemCount(this.PROP_INDEX[1]) &&
                    this.itemList[2].count <= zj.Game.PlayerItemSystem.itemCount(this.PROP_INDEX[2]) &&
                    this.itemList[3].count <= zj.Game.PlayerItemSystem.itemCount(this.PROP_INDEX[3])) {
                    if (this.itemList[0].count == 0 && this.itemList[1].count == 0 && this.itemList[2].count == 0 && this.itemList[3].count == 0) {
                        zj.toast_warning(zj.TextsConfig.TextsConfig_Error.upgrade_not_enough);
                        return;
                    }
                    for (var j = 0; j < 4; j++) {
                        if (this.itemList[j].count != 0) {
                            this.setPropUseEnd(j);
                            this.itemId = j;
                            this.vislevel = true;
                            this.popItem = this.listExpPill.getElementAt(j);
                            this.itemList[j].count = 0;
                        }
                    }
                }
            }
            this.viscartoon = false;
        };
        /**前往进阶*/
        HunterUpLevel.prototype.onBtnGoUpGrade = function () {
            if (this.callback) {
                this.callback.call(this.thisObj, false, true);
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        /**发送请求 */
        HunterUpLevel.prototype.setPropUseEnd = function (itemId) {
            if (this.itemList[itemId].count != 0) {
                for (var i = 0; i < 4; i++) {
                    this.propGoods[i].count = 0;
                }
                if (this.visOver == false) {
                    this.propSend[itemId].count += this.itemList[itemId].count;
                }
                this.propGoods[itemId].count = this.itemList[itemId].count;
                this.requsteExperienceUpdate();
            }
        };
        /**刷新list子类信息 */
        HunterUpLevel.prototype.setPropUseOne = function () {
            //声音
            zj.Game.SoundManager.playEffect("ui_wujiang_shengji_mp3", 500);
            //刷新数字
            if (this.vislevel == true) {
                for (var i = 0; i < 4; i++) {
                    this.popItem = this.listExpPill.getElementAt(i);
                    if (this.popItem) {
                        this.popItem.setInfoUsed(this.propSend[i].count);
                        if (this.visOver == false) {
                            this.popItem.updateView(this.popItem.data);
                        }
                        else {
                            this.popItem.labelNum.text = String(Number(this.popItem.labelNum.text) - 1);
                        }
                    }
                }
            }
            else {
                if (this.popItem) {
                    this.popItem.setInfoUsed(this.propSend[this.itemId].count);
                    if (this.visOver == false) {
                        this.popItem.updateView(this.popItem.data);
                    }
                    else {
                        this.popItem.labelNum.text = String(Number(this.popItem.labelNum.text) - 1);
                    }
                    // 动画
                    this.runShow();
                }
            }
            /**升多级按钮上数字*/
            var maxlevel = 0;
            if (this.maxStepLevel - zj.Game.PlayerHunterSystem.queryHunter(this.generalId).level >= 5) {
                maxlevel = 5;
            }
            else {
                maxlevel = this.maxStepLevel - zj.Game.PlayerHunterSystem.queryHunter(this.generalId).level;
            }
            this.lableLevelNum.text = String(maxlevel);
        };
        /**动画 */
        HunterUpLevel.prototype.runShow = function () {
            var _this = this;
            if (this.viscartoon == false) {
                this.viscartoon = true;
                return;
            }
            var img = new egret.Bitmap;
            img.texture = RES.getRes(String(this.popItem.getSpriteIcon().source));
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
            img.x = this.mainNode.x + this.gBottom.x + this.itemId * 178 + 50 + img.width / 2;
            img.y = this.mainNode.y + this.gBottom.y + 25 + img.height / 2;
            this.addChild(img);
            egret.Tween.get(img).wait(100).to({ scaleX: 0.3, scaleY: 0.3, x: this.mainNode.x + this.gTop.x + this.head.x + this.spriteHeroHead.x + 40, y: this.mainNode.y + this.gTop.y + this.head.y + this.spriteHeroHead.y + 30 }, this.itemId * 50 + 200)
                .to({ scaleX: 3, scaleY: 3, alpha: 0 }, 200).call(function () { _this.removeChild(img); });
        };
        /**该向服务器发协议了*/
        HunterUpLevel.prototype.requsteExperienceUpdate = function () {
            var _this = this;
            var level = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).level;
            var oldValue = this.oldBattleValue;
            var p = zj.Game.PlayerHunterSystem.requsteExperienceUpdate(this.generalId, this.propGoods);
            p.then(function () {
                if (_this.callback) {
                    _this.callback.call(_this.thisObj, true, false);
                }
                _this.refreshInfo();
                _this.setPropUseOne();
                _this.array.refresh();
                var newValue = zj.Game.PlayerHunterSystem.queryHunter(_this.generalId).battleValue;
                if (level != zj.Game.PlayerHunterSystem.queryHunter(_this.generalId).level) {
                    _this.promptLevel(oldValue, newValue);
                }
            });
            p.catch(function (reason) {
                zj.toast(reason);
            });
        };
        /**提示升级成功 */
        HunterUpLevel.prototype.promptLevel = function (oldValue, newValue) {
            var _this = this;
            var source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.common_hint[5], this);
            var image = new eui.Image(source);
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then(function (armatureDisplay) {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    if (armatureDisplay.parent)
                        armatureDisplay.parent.removeChild(armatureDisplay);
                }, _this);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.animation.play("000_tishi", 1);
                armatureDisplay.x = _this.gTop.width * 0.5;
                armatureDisplay.y = _this.gTop.height * 0.3;
                _this.gTop.addChild(armatureDisplay);
                zj.CommonTipBmfont.promptBattleValue(oldValue, newValue);
                if (_this.callback)
                    _this.callback();
            });
        };
        return HunterUpLevel;
    }(zj.Dialog));
    zj.HunterUpLevel = HunterUpLevel;
    __reflect(HunterUpLevel.prototype, "zj.HunterUpLevel");
})(zj || (zj = {}));
//# sourceMappingURL=HunterUpLevel.js.map