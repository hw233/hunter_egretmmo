var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * 新手教学系统
     * created by Lian Lei
     * 2019.03.28
     */
    var TeachSystem = (function () {
        function TeachSystem() {
            /**是否播放区域解锁动画 */
            this.playAreaAnimate = false;
            /**第一次进入loading界面 */
            this.loadnum = 0;
            this.openTime = 0;
            this.battleEndOpenTeach = true; // 战斗结算后会默认打开原始界面 在打开之前新手不触发 打开之后触发
            this.isEndCommonAnimation = false;
            this.isShowGetVip = true;
        }
        TeachSystem.prototype.init = function () {
            zj.Teach.m_bOpenTeach = true; // 新手引导开启标志
            zj.Teach.nServerPartLocal = zj.Teach.nServerPart;
            zj.Game.EventManager.on(zj.GameEvent.START_NEW_TEACHING, this.teach, this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_SCENE, zj.Teach.showScene, this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_DIALOG, zj.Teach.showDialog, this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_UI, zj.Teach.showUi, this);
            zj.Game.EventManager.on(zj.GameEvent.CLOSE_SCENE, zj.Teach.closeScene, this);
            zj.Game.EventManager.on(zj.GameEvent.CLOSE_DIALOG, zj.Teach.closeDialog, this);
            zj.Game.EventManager.on(zj.GameEvent.CLOSE_UI, zj.Teach.closeUi, this);
            zj.Game.EventManager.on(zj.GameEvent.NUMBER_OF_DIALOG, zj.Teach.dialogCount, this);
            zj.Game.EventManager.on(zj.GameEvent.END_OF_THE_ANIMATION, zj.Teach.isEndAnimation, this);
            zj.Game.EventManager.on(zj.GameEvent.CLEAR_TIP_SPX, zj.Teach.delTouchTipSpx, this);
            zj.Game.EventManager.on(zj.GameEvent.IS_END_LAST_TEACH, zj.Teach.checkTeachId, this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_FIGHT_UI, zj.Teach.showFightUi, this);
            zj.Game.EventManager.on(zj.GameEvent.SKILL_CD_OK, zj.Teach.skillIsOk, this);
            zj.Game.EventManager.on(zj.GameEvent.GET_MOUDLE_SIZE, zj.Teach.getMoudleSize, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_LEVEL_UP, zj.Teach.checkTeachId, this);
        };
        TeachSystem.prototype.teach = function (ev) {
            if (ev.data != null) {
                if (this.curPart != ev.data.curPart) {
                    zj.Teach.teachingNow = true;
                    this.curPart = ev.data.curPart;
                    console.log("——————————————————新手引导执行:  " + zj.Game.TeachSystem.curPart + "——————————————————————");
                    zj.RolePointTracker.track(30000 + (zj.Game.TeachSystem.curPart * 10));
                    // let num = (30000 + (Game.TeachSystem.curPart * 10));
                    // console.log("—————————————————————— 新手引导任务开始打点" + num + "——————————————————————");
                    zj.Teach.nOperateTeachStep = 0;
                    zj.Teach.addMask();
                    zj.Teach_diff.OperateTeach(null, this.curPart, zj.Teach.nOperateTeachStep, 0);
                }
                else {
                    this.curPart = ev.data.curPart;
                }
            }
        };
        TeachSystem.prototype.uninit = function () {
            this.playAreaAnimate = false;
            this.openTime = 0;
            this.loadnum = 0;
            this.curPart = -1;
            zj.Teach.teachingNow = false;
        };
        TeachSystem.prototype.endTeach = function () {
            zj.Teach.m_bOpenTeach = false;
            if (zj.Teach.isMask) {
                zj.Game.UIManager.unmaskAllUIs();
                zj.Teach.isMask = false;
            }
        };
        TeachSystem.prototype.getAniFocus = function (w, h, bHand) {
            var node = new eui.Group();
            var node1 = zj.Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", null, 0)
                .then(function (display) {
                display.x = -w / 2;
                display.y = -h / 2;
                display.rotation = 90;
                node.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            var node2 = zj.Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", null, 0)
                .then(function (display) {
                display.x = w / 2;
                display.y = -h / 2;
                display.rotation = 180;
                node.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            var node3 = zj.Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", null, 0)
                .then(function (display) {
                display.x = w / 2;
                display.y = h / 2;
                display.rotation = 270;
                node.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            var node4 = zj.Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", null, 0)
                .then(function (display) {
                display.x = -w / 2;
                display.y = h / 2;
                display.rotation = 0;
                node.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            if (bHand == true) {
                var hand = zj.Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", null, 0)
                    .then(function (display) {
                    display.rotation = 270;
                    node.addChild(display);
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
            return node;
        };
        /////////////////////////////// 发协议 ////////////////////////////////////
        TeachSystem.prototype.SaveTeach = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SaveTeachInfoRequest;
                request.body.teachItems = zj.Teach.nServerPart;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        /**拉取新手引导回复 */
        TeachSystem.prototype.QueryTeach = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QueryTeachInfoRequest;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.teachItems);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        TeachSystem.prototype.ModifyRoleName_Req = function (edit) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ModifyRoleNameRequest;
                request.body.name = edit;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        TeachSystem.nodeOrStageID = null;
        return TeachSystem;
    }());
    zj.TeachSystem = TeachSystem;
    __reflect(TeachSystem.prototype, "zj.TeachSystem");
})(zj || (zj = {}));
//# sourceMappingURL=TeachSystem.js.map