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
     * @author xingliwei
     *
     * @date 2019-1-23
     *
     * @class 格斗场主界面
     */
    var ArenaMainScene = (function (_super) {
        __extends(ArenaMainScene, _super);
        function ArenaMainScene() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaMainSceneSkin.exml";
            _this.init();
            if (_this.imgbg.width < zj.UIManager.StageWidth) {
                _this.imgbg.width = zj.UIManager.StageWidth;
            }
            _this.refresh();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
            }, _this);
            _this.update = egret.setInterval(_this.Update, _this, 2000);
            _this.Update();
            return _this;
        }
        ArenaMainScene.prototype.Update = function () {
            this.refresh();
        };
        ArenaMainScene.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnLadder.addEventListener(tap, this.onBtnLadder, this);
            this.btnPK.addEventListener(tap, this.onBtnPK, this);
            this.btnAddGemsTone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            var progressMap = [];
            for (var v in message.EProcessType) {
                if (message.EProcessType.hasOwnProperty(v)) {
                    var k = message.EProcessType[v];
                    if (Number(k) != message.EProcessType.PROCESS_TYPE_NONO) {
                        // let prog = 
                    }
                }
            }
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, this.refresh, this);
            // let process = PlayerArenaSystem
            // message.EProcessType
            this.setInfo();
            if (zj.Device.isReviewSwitch) {
                this.groupPK.visible = false;
                this.jewel.x = 8;
                this.jewel.y = 0;
                this.jewel.width = 40;
                this.jewel.height = 40;
                this.btnAddGemsTone.x = 100;
                this.btnAddGemsTone.y = 3;
                this.btnAddGemsTone.width = 30;
                this.btnAddGemsTone.height = 30;
                this.labelGemsToneNumber.width = 85;
            }
        };
        ArenaMainScene.prototype.refresh = function () {
            var ladderTipVisible = zj.Tips.getTipsOfMail(message.MailType.MAIL_TYPE_LADDER) || zj.Tips.GetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.LADDER_MALL) || zj.Tips.GetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.LADDER_FIGHT);
            this.imgTipLadder.visible = ladderTipVisible;
            var pkTipVisible = zj.Tips.GetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.CHARGE_CHALLENGE) || zj.Tips.getTipsOfMail(message.MailType.MAIL_TYPE_SINGLECRAFT);
            this.imgTipPK.visible = pkTipVisible;
            var tokenStr = zj.PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
            this.labelGemsToneNumber.text = tokenStr;
            var vipInfo = zj.Game.PlayerVIPSystem.vipInfo;
            var max = zj.CommonConfig.ladder_challenge_time;
            var currrent = vipInfo.buyPvpPower + max - vipInfo.pvpPower;
            this.labelLadder.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Arena.ladderLeft, currrent, max);
            if (this.labelGemsToneNumber.width < 80) {
                this.labelGemsToneNumber.width = 80;
            }
            var canOpen = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.SINGLE);
            var conditionLevel = zj.TableFunctionOpen.Item(zj.FUNC.SINGLE).condition;
            if (canOpen && conditionLevel <= zj.Game.PlayerInfoSystem.Level) {
                var process = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
                if (process == null)
                    return;
                var time = process.leftTime;
                var state = process.info % 10;
                if (state == message.CraftStateType.CRAFT_STATE_TYPE_NONO) {
                    this.labelPK.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.nextOpenTime, Math.floor(time / (3600 * 24) + 1)));
                }
                else {
                    if (state == message.CraftStateType.CRAFT_STATE_TYPE_FIGHTING) {
                        var licenceInfo = zj.TableLicence.Item(zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel);
                        var remainTimes = licenceInfo.singlecraft_free + (vipInfo.craft_buy * zj.CommonConfig.singlecraft_buy_time) - vipInfo.craft_time;
                        var maxTimes = licenceInfo.singlecraft_free;
                        this.labelPK.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.pkLeft, remainTimes, maxTimes));
                    }
                    else if (state == message.CraftStateType.CRAFT_STATE_TYPE_FINISH || state == message.CraftStateType.CRAFT_STATE_TYPE_READY) {
                        this.labelPK.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.nextOpenTimes, (Math.floor(time / (3600) + 1))));
                    }
                }
            }
            else {
                this.labelPK.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.open, conditionLevel));
            }
        };
        ArenaMainScene.prototype.setInfo = function () {
            var process = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
            var state = false;
            if (process != null) {
                state = process.info % 10 != message.CraftStateType.CRAFT_STATE_TYPE_NONO && process.info % 10 != message.CraftStateType.CRAFT_STATE_TYPE_READY;
            }
            this.btnLadder.enabled = (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ARENA));
            this.btnPK.enabled = (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.SINGLE) && state);
            var cur = zj.Game.PlayerVIPSystem.vipInfo.buyPvpPower * zj.CommonConfig.ladder_challenge_time + zj.CommonConfig.ladder_challenge_time - zj.Game.PlayerVIPSystem.vipInfo.pvpPower;
            var max = zj.CommonConfig.ladder_challenge_time;
            this.labelLadder.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Arena.ladderLeft, cur, max);
        };
        ArenaMainScene.prototype.onBtnLadder = function () {
            var _this = this;
            zj.loadUI(zj.ArenaLadder).then(function (dialog) {
                // if (ArenaMainScene.roleFormationInfo == null) {
                zj.Game.PlayerArenaSystem.ladderList(false).then(function (data) {
                    ArenaMainScene.roleFormationInfo = data;
                    dialog.setInfo(data, function () {
                        _this.refresh();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                // } else {
                //     dialog.setInfo(ArenaMainScene.roleFormationInfo, () => {
                //         this.refresh();
                //     });
                //     dialog.show(UI.SHOW_FROM_TOP);
                // }
            });
        };
        ArenaMainScene.prototype.onBtnAddGemstone = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
            });
        };
        /**点击进入跨服格斗场 */
        ArenaMainScene.prototype.onBtnPK = function () {
            zj.Game.PlayerArenaSystem.craftQureyList(false)
                .then(function () {
                zj.loadUI(zj.ArenaWhole).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        ArenaMainScene.prototype.onBtnClose = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.close(zj.UI.HIDE_TO_TOP);
                    return [2 /*return*/];
                });
            });
        };
        return ArenaMainScene;
    }(zj.Scene));
    zj.ArenaMainScene = ArenaMainScene;
    __reflect(ArenaMainScene.prototype, "zj.ArenaMainScene");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaMainScene.js.map