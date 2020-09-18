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
    // HXH_GroupFightMain (飞龙营地)
    // wangshenzhuo
    // 2019/03/05
    var HXH_GroupFightMain = (function (_super) {
        __extends(HXH_GroupFightMain, _super);
        function HXH_GroupFightMain() {
            var _this = _super.call(this) || this;
            _this.listOpen = false;
            _this.base_id = 10000;
            _this.imageTalk = [];
            _this.hardIndex = 0;
            _this.listTableIndex = 0;
            _this.timenpc = [];
            _this.formats = [];
            _this.skinName = "resource/skins/darkLand/HXH_GroupFightMainSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonDropList.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonDropList, _this);
            _this.buttonLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonLevel, _this);
            _this.groupBossClick.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.imagemove, _this);
            _this.buttonChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonChallenge, _this);
            _this.listTableView.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.buttonlistTableView, _this);
            _this.btnAddToken.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddStrength, _this);
            _this.buttonExplain.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonExplain, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POWER_CHANGE, _this.updateUIStates, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.updateUIStates, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.groupBoss); //特殊处理
            }, null);
            if (_this.width >= 1344) {
                _this.imageBackGroud.scaleX = _this.width / 1334;
            }
            return _this;
        }
        ;
        ;
        HXH_GroupFightMain.prototype.Init = function () {
            this.imageTalk = [
                this.imageBoss1,
                this.imageBoss2,
                this.imageBoss3,
            ];
            for (var k in this.imageTalk) {
                var v = this.imageTalk[k];
                v.visible = false;
            }
            this.labelBossInfo.visible = false;
            this.listOpen = false;
            zj.PlayerGroupFightSystem.fightGroupExt = message.EGroupBattleType.GROUPBATTLE_TYPE_ONE;
            this.allHardInfo = zj.PlayerGroupFightSystem.GetCurGroupTbl(zj.PlayerGroupFightSystem.fightGroupExt);
            this.hardIndex = zj.PlayerGroupFightSystem.GetMaxCustomsByIndex(zj.PlayerGroupFightSystem.fightGroupExt);
            this.SetInfo();
            this.InitMyGroupFormation();
        };
        HXH_GroupFightMain.prototype.SetInfo = function () {
            var _this = this;
            this.groupYinCang.visible = false;
            this.curHardInfo = this.allHardInfo[this.hardIndex];
            this.SetInfoList();
            this.SetInfoUI();
            egret.Tween.get(this).wait(400).call(function () {
                _this.imagemove();
            });
            this.updateUIStates();
        };
        HXH_GroupFightMain.prototype.updateUIStates = function () {
            //鑽石
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                this.labelToken.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            }
            else {
                this.labelToken.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            var str_energy = zj.Helper.StringFormat("%d/%d", zj.Game.PlayerInfoSystem.Power, zj.TableLevel.Item(zj.Game.PlayerInfoSystem.Level).role_power + zj.PlayerVIPSystem.LowLevel().power_add);
            this.lbStrength.text = str_energy;
        };
        HXH_GroupFightMain.prototype.onRemoveFromStage = function () {
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_POWER_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
            egret.Tween.removeTweens(this);
        };
        HXH_GroupFightMain.prototype.SetInfoList = function () {
            this.listTableView.selectedIndex = (this.hardIndex % 10000 - 1); // 默认选中
            this.listTableView.itemRenderer = zj.HXH_GroupFightMainItem; //
            this.listTableItem = new eui.ArrayCollection();
            var allHardInfo = zj.PlayerGroupFightSystem.GetCurGroup(zj.PlayerGroupFightSystem.fightGroupExt);
            for (var i = 0; i < allHardInfo.length; i++) {
                var data = new zj.HXH_GroupFightMainItemData();
                data.father = this;
                data.index = i + 1;
                data.id = zj.PlayerGroupFightSystem.fightGroupExt * 10000 + i;
                this.listTableItem.addItem(data);
            }
            this.listTableView.dataProvider = this.listTableItem;
            this.listTableIndex = this.listTableView.selectedIndex;
        };
        HXH_GroupFightMain.prototype.buttonlistTableView = function (e) {
            var maxId = zj.PlayerGroupFightSystem.GetMaxCustomsByIndex(zj.PlayerGroupFightSystem.fightGroupExt) % 10;
            if (this.listTableIndex != this.listTableView.selectedIndex) {
                if (this.listTableView.selectedIndex + 1 > maxId) {
                    zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_GroupFight.chooseTips, this.listTableIndex + 1));
                    return;
                }
                this.listTableItem.itemUpdated(this.listTableItem.source[this.listTableIndex]);
                this.listTableItem.itemUpdated(this.listTableItem.source[this.listTableView.selectedIndex]);
                this.listTableIndex = this.listTableView.selectedIndex;
            }
            if (this.listTableIndex + 1 == (this.hardIndex % 10000)) {
                return;
            }
            else if (this.listTableIndex + 1 > maxId) {
                return;
            }
            this.hardIndex = this.listTableIndex + 10001;
            this.SetInfo();
            this.onGroupDialogue();
            this.SetInfoUI();
        };
        HXH_GroupFightMain.prototype.SetInfoUI = function () {
            var name = this.curHardInfo.boss_name;
            var times = zj.Table.FindR(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleTime, function (k, v) {
                return k == (zj.PlayerGroupFightSystem.fightGroupExt - 1);
            });
            if (times[0] == null) {
                times[0] = 0;
            }
            else {
                times[0] = times[0].value;
            }
            var timeStr = zj.CommonConfig.group_battle_limit_times[zj.PlayerGroupFightSystem.fightGroupExt - 1] - times[0] + "/" + zj.CommonConfig.group_battle_limit_times[zj.PlayerGroupFightSystem.fightGroupExt - 1];
            this.labelBossName.text = name;
            this.labelLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_GroupFight.hard, this.hardIndex % 10000);
            this.labelTimes.text = timeStr;
        };
        HXH_GroupFightMain.prototype.onButtonLevel = function () {
            egret.Tween.removeTweens(this.groupYinCang);
            if (this.listOpen) {
                this.listAniClose();
            }
            else {
                this.ListAniOpen();
            }
            this.listOpen = !this.listOpen;
        };
        HXH_GroupFightMain.prototype.InitMyGroupFormation = function () {
            for (var i = 0; i < 2; i++) {
                this.formats[i] = new message.FormationInfo();
            }
            var buttonName = ["generals", "reserves", "supports"];
            var a = zj.Game.PlayerFormationSystem.formatsGroupFight;
            for (var kk in zj.Game.PlayerFormationSystem.formatsGroupFight) {
                var vv = zj.Game.PlayerFormationSystem.formatsGroupFight[kk];
                if (vv.formationIndex <= 2) {
                    this.formats[vv.formationIndex - 1] = vv;
                }
            }
            for (var fk in this.formats) {
                var fv = this.formats[fk];
                for (var kk in buttonName) {
                    var vv = buttonName[kk];
                    for (var i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0; // 空缺补0
                        }
                    }
                }
                this.formats[fk].formationType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
                this.formats[fk].formationIndex = Number(fk) + 1;
            }
            zj.Game.PlayerFormationSystem.formatsGroupFight = this.formats;
            var b = zj.Game.PlayerFormationSystem.formatsGroupFight;
        };
        HXH_GroupFightMain.prototype.onButtonChallenge = function () {
            var _this = this;
            this.MobsInfo_Visit()
                .then(function (data) {
                zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
                zj.loadUI(zj.HXH_GroupFightFormate)
                    .then(function (Scene) {
                    Scene.SetInfo(_this.hardIndex, _this);
                    Scene.show(zj.UI.SHOW_FROM_TOP);
                });
            })
                .catch(function (reason) { zj.toast_warning(reason); });
        };
        HXH_GroupFightMain.prototype.MobsInfo_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MobsInfoRequest();
                request.body.battleType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
                request.body.mobsId = _this.hardIndex;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
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
        HXH_GroupFightMain.prototype.onGroupDialogue = function () {
            var _this = this;
            //toast("对话框");
            // this.groupBossInfo.visible = false;
            this.labelBossInfo.visible = false;
            egret.Tween.removeTweens(this.groupBossInfo);
            if (this.timenpc.length > 0) {
                for (var i = 0; i < this.timenpc.length; i++) {
                    egret.clearTimeout(this.timenpc[i]);
                }
            }
            var npc_id = zj.TableEnum.EnumTalkNpcId["GROUPFIGHT"];
            var str_talk = zj.PlayerHunterSystem.NpcDialog(npc_id);
            if (str_talk == "") {
                return "";
            }
            egret.Tween.get(this.groupBossInfo)
                .wait(100, false)
                .call(function () {
                _this.groupBossInfo.visible = true;
                _this.labelBossInfo.visible = true;
                _this.typerEffect(_this.labelBossInfo, str_talk, 30);
            }).wait(0.1).call(function () {
                _this.imageBossMove();
            });
        };
        HXH_GroupFightMain.prototype.imageBossMove = function () {
            egret.Tween.get(this.groupBoss, { loop: true })
                .to({ y: 215 }, 0)
                .to({ y: 210 }, 1000)
                .to({ y: 220 }, 2000)
                .to({ y: 215 }, 1000);
        };
        HXH_GroupFightMain.prototype.imagemove = function () {
            var _this = this;
            egret.Tween.removeTweens(this.imageTalk);
            egret.Tween.removeTweens(this.groupBossInfo);
            egret.Tween.removeTweens(this.groupBoss);
            this.labelBossInfo.visible = false;
            for (var k in this.imageTalk) {
                var v = this.imageTalk[k];
                var scale_x = v.scaleX;
                var scale_y = v.scaleY;
                if (Number(k) == 0) {
                    egret.Tween.get(v).to({ alpha: 0.5 }, 0)
                        .to({ alpha: 1 }, 350);
                    egret.Tween.get(v).wait(10)
                        .to({ visible: false })
                        .to({ scaleX: 0.2, scaleY: 0.2 }, 0)
                        .to({ visible: true })
                        .to({ scaleX: 0.9, scaleY: 0.9 }, 400, egret.Ease.backOut);
                }
                if (Number(k) == 1) {
                    egret.Tween.get(v).to({ alpha: 0.5 }, 0)
                        .to({ alpha: 1 }, 350);
                    egret.Tween.get(v).wait(60)
                        .to({ visible: false })
                        .to({ scaleX: 0, scaleY: 0 }, 0)
                        .to({ visible: true })
                        .to({ scaleX: 0.75, scaleY: 0.75 }, 430, egret.Ease.backOut);
                }
                if (Number(k) == 2) {
                    egret.Tween.get(v).to({ alpha: 0.5 }, 0)
                        .to({ alpha: 1 }, 350);
                    egret.Tween.get(v).wait(110)
                        .to({ visible: false })
                        .to({ scaleX: 0.5, scaleY: 0.5 }, 0)
                        .to({ visible: true })
                        .to({ scaleX: 0.8, scaleY: 0.8 }, 400, egret.Ease.backOut).call(function () {
                        _this.onGroupDialogue();
                    });
                }
            }
        };
        HXH_GroupFightMain.prototype.typerEffect = function (obj, content, interval, backFun) {
            if (content === void 0) { content = ""; }
            if (interval === void 0) { interval = 200; }
            if (backFun === void 0) { backFun = null; }
            var strArr = content.split("");
            var len = strArr.length;
            obj.text = "";
            this.timenpc = [];
            for (var i = 0; i < len; i++) {
                var timenum = egret.setTimeout(function () {
                    obj.appendText(strArr[Number(this)]);
                }, i, interval * i);
                this.timenpc.push(timenum);
            }
        };
        //list关闭动画
        HXH_GroupFightMain.prototype.listAniClose = function () {
            egret.Tween.get(this.groupYinCang)
                .to({ x: 742, y: 85 }, 0).wait(50)
                .to({ x: 742, y: 115, }, 200);
            egret.Tween.get(this.groupYinCang)
                .to({ scaleX: 1, scaleY: 0.1 }, 300, egret.Ease.backIn).wait(0.1)
                .to({ visible: false });
        };
        //list打开动画
        HXH_GroupFightMain.prototype.ListAniOpen = function () {
            egret.Tween.get(this.groupYinCang)
                .to({ x: 742, y: 115, }, 0)
                .to({ visible: true }).wait(0.1)
                .to({ x: 742, y: 85, }, 150, egret.Ease.backOut).wait(10)
                .to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        };
        HXH_GroupFightMain.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HXH_GroupFightMain.prototype.onButtonDropList = function () {
            zj.loadUI(zj.HXH_GroupFightDropInfo)
                .then(function (Dialog) {
                Dialog.SetInfo();
                Dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HXH_GroupFightMain.prototype.onBtnAddGemstone = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        HXH_GroupFightMain.prototype.onBtnAddStrength = function () {
            zj.loadUI(zj.HXH_HunterUserStrength)
                .then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HXH_GroupFightMain.prototype.onButtonExplain = function () {
            zj.toast_warning("高手攻略暂未开启！");
        };
        return HXH_GroupFightMain;
    }(zj.Scene));
    zj.HXH_GroupFightMain = HXH_GroupFightMain;
    __reflect(HXH_GroupFightMain.prototype, "zj.HXH_GroupFightMain");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_GroupFightMain.js.map