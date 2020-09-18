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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var zj;
(function (zj) {
    /**
     * @author chen xi
     *
     * @date 2018-11-13
     *
     * @class 猎人主界面
     */
    var HunterMainScene = (function (_super) {
        __extends(HunterMainScene, _super);
        function HunterMainScene() {
            var _this = _super.call(this) || this;
            _this.rightContentDictionary = {};
            _this.rightSprites = [];
            _this.isEntryHeros = false;
            _this.currentSelectedIndex = 0;
            _this.lastSelectedIndex = Number.NaN;
            _this.generalId = null;
            _this.soulId = null;
            _this._battleValue = 0; // current battle value, used for sub ui
            _this.skinName = "resource/skins/hunter/HunterMainSkin.exml";
            _this.init();
            _this.gRightSideBar.visible = false;
            _this.loadSubUI();
            _this.setChildIndex(_this.gDetail, _this.numChildren - 1);
            _this.rightButtons = [
                _this.btnDetail,
                _this.btnSkill,
                _this.btnCard,
                _this.btnAwaken,
                _this.btnCollection,
                _this.btnPsychic
            ];
            _this.rightSprites = [
                _this.spriteDetail,
                _this.spriteSkill,
                _this.spriteCard,
                _this.spriteAwaken,
                _this.spriteCollection,
                _this.spritePsychic
            ];
            _this._in_heroesUI = true;
            // this.addChildAt(this.btnClose, 3008);
            // // this.addChildAt(this.groupImg, 3000);
            if (zj.Device.isReviewSwitch) {
                _this.groupCard.visible = false;
                _this.groupAwaken.visible = false;
                _this.groupCollect.visible = false;
                _this.btnAddGold.visible = false;
                _this.gold.width = 40;
                _this.gold.height = 40;
                _this.jewel.width = 40;
                _this.jewel.height = 40;
                _this.btnAdddiamond.width = 30;
                _this.btnAdddiamond.height = 30;
                _this.btnAdddiamond.y = 7;
            }
            return _this;
        }
        Object.defineProperty(HunterMainScene.prototype, "battleValue", {
            get: function () {
                return this._battleValue;
            },
            set: function (v) {
                this._battleValue = v;
            },
            enumerable: true,
            configurable: true
        });
        HunterMainScene.prototype.init = function () {
            var _this = this;
            this.rectMask.visible = false;
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnMainDetail.addEventListener(tap, this.onBtnMainDetail, this);
            this.btnDetail.addEventListener(tap, this.onBtnDetail, this);
            this.btnSkill.addEventListener(tap, this.onBtnSkill, this);
            this.btnCard.addEventListener(tap, this.onBtnCard, this);
            this.btnAwaken.addEventListener(tap, this.onBtnAwaken, this);
            this.btnCollection.addEventListener(tap, this.onBtnCollection, this);
            this.btnPsychic.addEventListener(tap, this.onBtnPsychic, this);
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.update = egret.setInterval(this.Update, this, 1000);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
            }, this);
            egret.Tween.get(this).wait(10).call(function () {
                _this.Update();
            });
            this.btnMainDetail.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
            }, this);
            zj.Game.EventManager.on(zj.HUNTER_REFRESH_TIP, this.onRefreshTips, this);
        };
        HunterMainScene.prototype.loadSubUI = function () {
            var _this = this;
            var p1 = zj.loadUI(zj.HunterHeroList);
            var p2 = zj.loadUI(zj.HunterHero);
            Promise.all([p1, p2]).then(function (all) {
                var hero = all[1];
                hero.setCallBack(_this.onHeroCallback, _this);
                _this.addChild(hero);
                hero.name = "hero";
                _this.hero = hero;
                var heroList = all[0];
                heroList.setCallback(_this.onListCallback, _this);
                _this.addChild(heroList);
                heroList.name = "hunterHero";
                _this.list = heroList;
                var destX = zj.UIManager.StageWidth * 0.5 * (1 + 0.1) - _this.list.mainNode.width;
                destX = destX >= 0 ? destX : 0;
                var destY = zj.UIManager.StageHeight * 0.5 * (1 + 0.06) - _this.list.mainNode.height * 0.5;
                _this.list.mainNode.x = destX;
                _this.list.mainNode.y = destY;
                destX = zj.UIManager.StageWidth * (1 - 0.5 * 0.06) - _this.hero.mainNode.width;
                destY = zj.UIManager.StageHeight * 0.5 * (1 + 0.06) - _this.hero.mainNode.height * 0.5;
                _this.hero.mainNode.x = destX >= 0 ? destX : 0;
                _this.hero.mainNode.y = destY;
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                _this.list.loadList(true);
                _this.loadRightContent();
                _this.setChildIndex(_this.gDetail, _this.numChildren - 1);
                _this.addChildAt(_this.groupImg, 3000);
            });
        };
        HunterMainScene.prototype.Update = function () {
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
            this.spriteMainDetailRedDot.visible = zj.Tips.GetTipsOfHero(this.generalId);
        };
        HunterMainScene.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterMainScene.prototype.onBtnAddGemstone = function () {
            // toast_success("加钻石功能未开启");
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
            });
        };
        // fix bug; load right content at first.
        HunterMainScene.prototype.loadRightContent = function () {
            return __awaiter(this, void 0, void 0, function () {
                var detail, skill, card, awaken, collection, psychic, k, v;
                return __generator(this, function (_a) {
                    detail = zj.newUI(zj.HunterDetail);
                    detail.groupMain.x = this.width;
                    detail.groupMain.y = this.height * 0.5 * (1 + 0.05) - detail.groupMain.height * 0.5;
                    detail.alpha = 0;
                    detail.name = "detail";
                    this.addChild(detail);
                    detail.alpha = 0;
                    this.rightContentDictionary[0] = detail;
                    skill = zj.newUI(zj.HunterSkill);
                    skill.groupMain.x = this.width;
                    skill.groupMain.y = this.height * 0.5 * (1 + 0.05) - skill.groupMain.height * 0.5;
                    skill.alpha = 0;
                    skill.name = "skill";
                    this.addChild(skill);
                    skill.alpha = 0;
                    this.rightContentDictionary[1] = skill;
                    card = zj.newUI(zj.HunterCardMain);
                    card.groupMain.x = this.width;
                    card.groupMain.y = this.height * 0.5 * (1 + 0.05) - card.groupMain.height * 0.5;
                    card.alpha = 0;
                    card.name = "card";
                    this.addChild(card);
                    card.alpha = 0;
                    this.rightContentDictionary[2] = card;
                    awaken = zj.newUI(zj.HunterAwaken);
                    awaken.groupMain.x = this.width;
                    awaken.groupMain.y = this.height * 0.5 * (1 + 0.05) - awaken.groupMain.height * 0.5;
                    awaken.alpha = 0;
                    awaken.name = "awaken";
                    this.addChild(awaken);
                    awaken.alpha = 0;
                    this.rightContentDictionary[3] = awaken;
                    collection = zj.newUI(zj.HunterCollection);
                    collection.groupMain.x = this.width;
                    collection.groupMain.y = this.height * 0.5 * (1 + 0.05) - collection.groupMain.height * 0.5;
                    collection.alpha = 0;
                    collection.name = "collection";
                    this.addChild(collection);
                    collection.alpha = 0;
                    this.rightContentDictionary[4] = collection;
                    psychic = zj.newUI(zj.HunterPsychic);
                    psychic.groupMain.x = this.width;
                    psychic.groupMain.y = this.height * 0.5 * (1 + 0.05) - psychic.groupMain.height * 0.5;
                    psychic.alpha = 0;
                    psychic.name = "psychic";
                    this.addChild(psychic);
                    psychic.alpha = 0;
                    this.rightContentDictionary[5] = psychic;
                    for (k in this.rightContentDictionary) {
                        if (this.rightContentDictionary.hasOwnProperty(k)) {
                            v = this.rightContentDictionary[k];
                            v.father = this;
                            v.setSelected(false, null);
                        }
                    }
                    return [2 /*return*/];
                });
            });
        };
        HunterMainScene.prototype.setRightContent = function (index) {
            if (index === void 0) { index = zj.HunterSubUIType.Detail; }
            this.isEntryHeros = true;
            // this if statement will not run.
            if (this.rightContentDictionary[index] == null) {
                var subUI = null;
                if (index == zj.HunterSubUIType.Detail) {
                    subUI = new zj.HunterDetail();
                }
                else if (index == zj.HunterSubUIType.Skill) {
                    subUI = new zj.HunterSkill();
                }
                else if (index == zj.HunterSubUIType.Card) {
                    subUI = new zj.HunterCardMain();
                }
                else if (index == zj.HunterSubUIType.Awaken) {
                    subUI = new zj.HunterAwaken();
                }
                else if (index == zj.HunterSubUIType.Psychic) {
                    subUI = new zj.HunterPsychic();
                }
                else if (index == zj.HunterSubUIType.Collection) {
                    subUI = new zj.HunterCollection();
                }
                else {
                    throw new Error("sub UI type error");
                }
                subUI.groupMain.x = this.width * 0.5 * (1 - 0.11);
                subUI.groupMain.y = this.height * 0.5 * (1 + 0.05) - subUI.groupMain.height * 0.5;
                subUI.alpha = 1;
                subUI.father = this;
                this.addChild(subUI);
                this.rightContentDictionary[index] = subUI;
            }
        };
        HunterMainScene.prototype.setRightButtonsSelected = function (index, showAni) {
            var _this = this;
            if (index === void 0) { index = 0; }
            if (showAni === void 0) { showAni = true; }
            for (var i = 0; i < this.rightButtons.length; i++) {
                this.rightButtons[i].enabled = (this.currentSelectedIndex != i);
            }
            var _loop_1 = function (i) {
                var initX = this_1.rightSprites[i].x;
                if (index == i) {
                    if (showAni) {
                        egret.Tween.get(this_1.rightSprites[i])
                            .call(function () { _this.rightSprites[i].visible = true; })
                            .to({ x: initX + 50 }, 0)
                            .to({ x: initX }, 200, egret.Ease.backInOut);
                    }
                    else {
                        this_1.rightSprites[i].visible = true;
                    }
                }
                else if (this_1.lastSelectedIndex == i) {
                    egret.Tween.get(this_1.rightSprites[i])
                        .to({ x: initX + 50 }, 200, egret.Ease.backInOut)
                        .call(function () { _this.rightSprites[i].visible = false; })
                        .to({ x: initX }, 0);
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.rightSprites.length; i++) {
                _loop_1(i);
            }
        };
        HunterMainScene.prototype.selectUI = function (index, showAni) {
            if (index === void 0) { index = zj.HunterSubUIType.Detail; }
            if (showAni === void 0) { showAni = true; }
            this.currentSelectedIndex = index;
            this.setRightButtonsSelected(index, showAni);
            this.setRightContent(index);
            this.lastSelectedIndex = this.currentSelectedIndex;
            this.setChildIndex(this.gRightSideBar, this.numChildren - 1);
            for (var k in this.rightContentDictionary) {
                if (this.rightContentDictionary.hasOwnProperty(k)) {
                    var v = this.rightContentDictionary[k];
                    if (v != null) {
                        v.alpha = 1;
                        v.setSelected(Number(k) == index, this.generalId);
                    }
                }
            }
        };
        HunterMainScene.prototype.onRefreshTips = function () {
            this["imgDetailRedDot"].visible = zj.Tips.GetTipsOfHero(this.generalId, zj.Tips.TAG.GENERAL_GRADE) || zj.Tips.GetTipsOfHero(this.generalId, zj.Tips.TAG.GENERAL_GRADE_STEP);
            this["imgSkillRedDot"].visible = zj.Tips.GetTipsOfHero(this.generalId, zj.Tips.TAG.GENERAL_SKILL);
            this["imgCardRedDot"].visible = zj.Tips.GetTipsOfHero(this.generalId, zj.Tips.TAG.GENERAL_Card);
            this["imgAwakenRedDot"].visible = zj.Tips.GetTipsOfHero(this.generalId, zj.Tips.TAG.GENERAL_AWAKEN);
            this["imgColectionRedDot"].visible = zj.Tips.GetTipsOfHero(this.generalId, zj.Tips.TAG.GENERAL_EQUIP);
            this["imgPsychicRedDot"].visible = zj.Tips.GetTipsOfHero(this.generalId, zj.Tips.TAG.GENERAL_PSYCHIC);
        };
        // ================= ani begin =================
        /** 列表 进入动画 */
        HunterMainScene.prototype.listAniEnter = function (cb) {
            var _this = this;
            var destX = zj.UIManager.StageWidth * 0.5 * (1 + 0.1) - this.list.mainNode.width;
            destX = (destX >= 0) ? destX : 0;
            egret.Tween.get(this.list.mainNode)
                .call(function () {
                _this.list.mainNode.visible = true;
            }, this)
                .to({ x: destX }, 150)
                .call(function () {
                if (cb)
                    cb(_this);
            }, this);
        };
        /** 列表 隐藏动画 */
        HunterMainScene.prototype.listAniExit = function (cb) {
            var _this = this;
            egret.Tween.get(this.list.mainNode)
                .to({ x: -this.list.mainNode.width }, 150)
                .call(function () {
                _this.list.mainNode.visible = false;
                if (cb)
                    cb(_this);
            }, this);
        };
        /** 猎人 左移动画 */
        HunterMainScene.prototype.heroMoveLeftAni = function (cb) {
            var _this = this;
            // hero 向左动
            // 中线往左偏移40%
            var destX = zj.UIManager.StageWidth * 0.5 * (1 - 0.15) - this.hero.mainNode.width;
            destX = destX >= 0 ? destX : 0;
            egret.Tween.get(this.hero.mainNode)
                .call(function () {
                _this.hero.hiddenUnlock();
                _this.hero.showBottomList(_this.list.sortType);
            }, this)
                .to({ x: destX }, 150)
                .call(function () {
                if (cb)
                    cb(_this);
            }, this);
        };
        /** 猎人 右移动画 */
        HunterMainScene.prototype.heroMoveRightExit = function (cb) {
            var _this = this;
            // 保持距离左边10%
            var destX = zj.UIManager.StageWidth * (1 - 0.5 * 0.06) - this.hero.mainNode.width;
            ;
            destX = destX >= 0 ? destX : 0;
            egret.Tween.get(this.hero.mainNode)
                .call(function () {
                _this.hero.showUnLock();
                _this.hero.hiddenBottomList();
            }, this)
                .to({ x: destX }, 150)
                .call(function () {
                if (cb)
                    cb(_this);
            }, this);
        };
        /** 详情按钮 显示动画 */
        HunterMainScene.prototype.detailButtonAniShow = function (cb) {
            var _this = this;
            this.gDetail.visible = true;
            // let originX = this.groupBtnMainDetail.x;
            // let destX = originX + this.groupBtnMainDetail.width;
            egret.Tween.get(this.groupBtnMainDetail)
                .to({ right: -this.groupBtnMainDetail.width }, 0)
                .to({ right: 0 }, 250, egret.Ease.backInOut)
                .call(function () {
                _this.setChildIndex(_this.gDetail, _this.numChildren - 1);
                if (cb)
                    cb(_this);
            }, this);
        };
        /** 详情按钮 隐藏动画 */
        HunterMainScene.prototype.detailButtonAniHidden = function (cb) {
            var _this = this;
            var originX = this.groupBtnMainDetail.x;
            var destX = originX + this.groupBtnMainDetail.width;
            egret.Tween.get(this.groupBtnMainDetail)
                .to({ right: -this.groupBtnMainDetail.width }, 250, egret.Ease.backInOut)
                .call(function () {
                _this.gDetail.visible = false;
                if (cb)
                    cb(_this);
            }, this)
                .to({ right: 0 }, 0);
        };
        /** 右侧边栏 显示动画 */
        HunterMainScene.prototype.rightSideBarShowAni = function (cb) {
            var _this = this;
            egret.Tween.get(this.gRightSideBar)
                .to({ alpha: 1 }, 150, egret.Ease.quadInOut)
                .call(function () {
                _this.gRightSideBar.visible = true;
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                // this.gDetail.touchEnabled = false;
                // this.setChildIndex(this.gRightSideBar, this.numChildren - 1);
                if (cb)
                    cb(_this);
            }, this);
        };
        /** 右侧边栏 隐藏动画 */
        HunterMainScene.prototype.rightSideBarHideAni = function (cb) {
            var _this = this;
            egret.Tween.get(this.gRightSideBar)
                .to({ alpha: 0 }, 150, egret.Ease.quadInOut)
                .call(function () {
                _this.gRightSideBar.visible = false;
                // this.gDetail.touchEnabled = true;
                if (cb)
                    cb(_this);
            }, this);
        };
        // ================= ani end =================
        HunterMainScene.prototype.advanced = function () {
            egret.Tween.get(this).wait(1000).call(this.onBtnMainDetail);
        };
        /** 主界面详情按钮 */
        HunterMainScene.prototype.onBtnMainDetail = function () {
            this.detailButtonAniHidden();
            this.rightSideBarShowAni();
            this.listAniExit();
            this.heroMoveLeftAni();
            this.onRefreshTips();
            this.selectUI(zj.HunterSubUIType.Detail, false);
        };
        HunterMainScene.prototype.onBtnDetail = function () {
            this.selectUI(zj.HunterSubUIType.Detail);
        };
        HunterMainScene.prototype.onBtnSkill = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.SKILL, true)) {
                this.selectUI(zj.HunterSubUIType.Skill);
            }
        };
        HunterMainScene.prototype.onBtnCard = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO, true)) {
                this.selectUI(zj.HunterSubUIType.Card);
                if (zj.Game.TeachSystem.curPart == 8006 || zj.Game.TeachSystem.curPart == 8022)
                    zj.Teach.addTeaching();
            }
        };
        HunterMainScene.prototype.onBtnAwaken = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.AWAKEN, true)) {
                if (this.canAwaken()) {
                    this.selectUI(zj.HunterSubUIType.Awaken);
                }
            }
        };
        HunterMainScene.prototype.onBtnCollection = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.EQUIP, true)) {
                this.selectUI(zj.HunterSubUIType.Collection);
            }
        };
        HunterMainScene.prototype.onBtnPsychic = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.PSYCHIC, true)) {
                this.selectUI(zj.HunterSubUIType.Psychic);
            }
        };
        HunterMainScene.prototype.onBtnClose = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, k, v;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isEntryHeros) return [3 /*break*/, 5];
                            this.isEntryHeros = false;
                            this._in_heroesUI = true;
                            this.lastSelectedIndex = Number.NaN;
                            this.currentSelectedIndex = 0;
                            this.refresh();
                            return [4 /*yield*/, this.rightSideBarHideAni()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.detailButtonAniShow()];
                        case 2:
                            _a.sent();
                            // 右侧内容移出屏幕
                            for (i = 0; i < this.rightSprites.length; i++) {
                                this.rightSprites[i].visible = false;
                            }
                            for (k in this.rightContentDictionary) {
                                if (this.rightContentDictionary.hasOwnProperty(k)) {
                                    v = this.rightContentDictionary[k];
                                    if (v != null) {
                                        v.setSelected(false, this.generalId, false);
                                    }
                                }
                            }
                            return [4 /*yield*/, this.heroMoveRightExit()];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.listAniEnter()];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            this.close(zj.UI.HIDE_TO_TOP);
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /** 列面界面回调事件 */
        HunterMainScene.prototype.onListCallback = function (type, data) {
            switch (type) {
                case 0 /* HunterListSelected */:
                    this.onListSelectedHunter(data);
                    break;
                case 1 /* FragmentListSelected */:
                    this.onListSelectedFragment(data);
                    break;
                case 2 /* HeroButtonTap */:
                    this.onBtnHero();
                    break;
                case 3 /* FragmentButtonTap */:
                    this.onBtnFragment();
                    break;
                case 4 /* SellSuccess */:
                    this.refresh(true);
                    break;
                default:
                    throw new Error("list callback type error");
            }
        };
        /** 猎人列表界面点击英雄 */
        HunterMainScene.prototype.onBtnHero = function () {
            this.detailButtonAniShow();
            this.hero.onBtnHero();
        };
        /** 猎人列表界面点击碎片 */
        HunterMainScene.prototype.onBtnFragment = function () {
            this.detailButtonAniHidden();
            this.hero.onBtnFragment();
        };
        HunterMainScene.prototype.refresh = function (loadList) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null || hunterInfo == undefined) {
                // fix bug: 
                // if current hunter is delete, cant't get hunter info, so refresh the hunter list and selected the first hunter.
                this.list.loadList(true);
                return;
            }
            this.setLock();
            this.hero.setGeneralId(this.generalId, this.isEntryHeros);
            this.battleValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            if (loadList != null) {
                this.list.loadList(true);
            }
        };
        // 子界面相应事件
        HunterMainScene.prototype.onSubUIEvent = function (type) {
            switch (type) {
                case zj.HunterSubUIEvent.Refresh:
                    this.refresh(true);
                    break;
                case zj.HunterSubUIEvent.GoAwaken:
                    this.selectUI(zj.HunterSubUIType.Awaken, true);
                    break;
                case zj.HunterSubUIEvent.UnableAwaken:
                    this.selectUI(zj.HunterSubUIType.Detail, true);
                    break;
                default:
                    throw Error("sub ui error");
            }
        };
        /** 猎人列表界面选中猎人 */
        HunterMainScene.prototype.onListSelectedHunter = function (id) {
            this.generalId = id;
            zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            this.refresh();
        };
        /** 猎人列表界面选中碎片 */
        HunterMainScene.prototype.onListSelectedFragment = function (data) {
            this.soulId = data[0];
            this.hero.setSoulId(this.soulId, data[1]);
        };
        HunterMainScene.prototype.heroBottomListSelected = function (index, data) {
            this.generalId = data.generalId;
            this.refresh();
            this.list.heroBottomListSelectedGeneral(data.generalId);
            this.rightContentDictionary[this.currentSelectedIndex].setSelected(true, this.generalId);
        };
        /** 英雄界面事件回调 */
        HunterMainScene.prototype.onHeroCallback = function (type, generalId) {
            switch (type) {
                case 0 /* UpGradeSuccess */:
                    this.refresh(true);
                    break;
                case 1 /* UpLevelSuccess */:
                    this.refresh(true);
                    break;
                case 2 /* Advance */:
                    this.advanced();
                    break;
                case 3 /* BreakSuccess */:
                    this.refresh(true);
                    break;
                case 4 /* BottomListLeft */:
                    this.onHeroBtnLeft();
                    break;
                case 5 /* BottomListRight */:
                    this.onHeroBtnRight();
                    break;
                case 6 /* RecruitSuccess */:
                    this.list.onBtnHero(generalId);
                    break;
                default:
                    throw new Error("hero callback type error");
            }
        };
        HunterMainScene.prototype.onHeroBtnLeft = function (index) {
        };
        HunterMainScene.prototype.onHeroBtnRight = function (index) {
        };
        HunterMainScene.prototype.onTouchEnd = function () {
            this.list.onTouchEnd();
        };
        HunterMainScene.prototype.canAwaken = function () {
            var skillInfoList = zj.PlayerHunterSystem.GetSkillEachLvList(this.generalId);
            if (skillInfoList.length < 4) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.noawaken);
                return false;
            }
            return true;
        };
        HunterMainScene.prototype.setLock = function () {
            this["imgLockSkill"].visible = !zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.SKILL);
            if (!zj.Device.isReviewSwitch) {
                this["imgLockCard"].visible = !zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO);
                this["imgLockAwaken"].visible = !zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.AWAKEN);
                this["imgLockCollection"].visible = !zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.EQUIP);
                this["imgLockPsychic"].visible = !zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.PSYCHIC);
            }
        };
        HunterMainScene.prototype.SetInfoMoveTo = function (generalId, vis) {
            var newgeneralId = zj.Table.FindR(this.list.newHunter, function (k, v) {
                return ((!vis) && zj.PlayerHunterSystem.GetGeneralId(v) == generalId) || (vis && v == generalId);
            });
            if (this.list != null && newgeneralId != null) {
                return this.list.FocusHunter(newgeneralId[0]);
            }
            // return null;
        };
        HunterMainScene.prototype.SetInfoMoveToFirst = function () {
            var new_general_id = this.list.newHunter[0];
            if (this.list != null && new_general_id != null) {
                return this.list.FocusHunter(new_general_id);
            }
            // return null;
        };
        return HunterMainScene;
    }(zj.Scene));
    zj.HunterMainScene = HunterMainScene;
    __reflect(HunterMainScene.prototype, "zj.HunterMainScene");
})(zj || (zj = {}));
//# sourceMappingURL=HunterMainScene.js.map