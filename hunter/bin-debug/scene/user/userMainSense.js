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
     * @author xingliwei
     *
     * @date 2019-5-14
     *
     * @class 玩家详情
     */
    var userMainSense = (function (_super) {
        __extends(userMainSense, _super);
        function userMainSense() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/user/userMainSenseSkin.exml";
            if (_this.imgbg) {
                if (_this.imgbg.width < zj.UIManager.StageWidth) {
                    _this.imgbg.width = zj.UIManager.StageWidth;
                }
            }
            _this.init();
            return _this;
        }
        userMainSense.prototype.init = function () {
            var _this = this;
            //打开时缓动动画
            this.groupMain.alpha = 0;
            this.imgbg.alpha = 0;
            this.width = this.groupMain.width = zj.UIManager.StageWidth;
            this.height = this.groupMain.height = zj.UIManager.StageHeight;
            this.groupMain.scaleX = this.groupMain.scaleY = 0;
            egret.Tween.get(this.imgbg).to({ alpha: 1 }, 100).call(function () {
                var top_scene = zj.Game.UIManager.topScene();
                if (top_scene) {
                    top_scene.visible = false;
                }
            });
            egret.Tween.get(this.groupMain).to({ alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 1, scaleY: 1 }, 50);
            this.update = egret.setInterval(this.Update, this, 1000);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnVip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnVip, this);
            this.btnChangeHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeHead, this);
            this.btnChangeName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeName, this);
            this.btnReLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReLogin, this);
            this.btnSystem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSystem, this);
            this.bthKey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBthKey, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
            }, this);
            this.Update();
            //用户协议屏蔽
            this.btnProtocol.visible = false;
            this.imgExpBar.mask = this.imgExpBarBg;
            this.SetInfoUser();
            this.setName();
            if (zj.Device.isReviewSwitch) {
                this.groupLicense.visible = false;
                this.btnVip.visible = false;
                this.btnChangeHead.visible = false;
                this.btnSystem.visible = false;
                this.bthKey.visible = false;
                this.btnProtocol.visible = false;
            }
            if (zj.Device.isReviewSwitch) {
                this.btnClose.x = 630;
            }
        };
        userMainSense.prototype.isFullScreen = function () {
            return true;
        };
        userMainSense.prototype.Update = function () {
            this.setName();
        };
        userMainSense.prototype.setName = function () {
            var strName = zj.Helper.StringFormat("%s%s", zj.TextsConfig.TextsConfig_User.text_name, zj.Game.PlayerInfoSystem.BaseInfo.name);
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.modifyName == 0) {
                strName = zj.Helper.StringFormat("%s%s", zj.TextsConfig.TextsConfig_User.text_name, zj.TextsConfig.TextsConfig_Common.nameDefault);
            }
            this.labelUserName.text = strName;
            this.labelPlayerPower.text = zj.Set.NumberUnit3(zj.Game.PlayerInfoSystem.BaseInfo.battleValue);
            if (zj.Game.PlayerMissionSystem.missionActive.licence == 0) {
                if (this.boardTitle.source != zj.UIConfig.UIConfig_Task.board[2]) {
                    this.boardTitle.source = zj.cachekey(zj.UIConfig.UIConfig_Task.board[2], this);
                }
            }
            else if (zj.Game.PlayerMissionSystem.missionActive.licence > zj.CommonConfig.licence_max_level) {
                if (this.boardTitle.source != zj.UIConfig.UIConfig_Task.board[3]) {
                    this.boardTitle.source = zj.cachekey(zj.UIConfig.UIConfig_Task.board[3], this);
                }
            }
            else {
                if (this.boardTitle.source != zj.UIConfig.UIConfig_Task.board[1]) {
                    this.boardTitle.source = zj.cachekey(zj.UIConfig.UIConfig_Task.board[1], this);
                }
            }
            if (this.imgTitle.source != zj.UIConfig.UIConfig_Task.Title[zj.Game.PlayerMissionSystem.missionActive.licence]) {
                this.imgTitle.source = zj.cachekey(zj.UIConfig.UIConfig_Task.Title[zj.Game.PlayerMissionSystem.missionActive.licence], this);
            }
        };
        userMainSense.prototype.SetInfoUser = function () {
            var level = zj.TableLevel.Item(zj.Game.PlayerInfoSystem.BaseInfo.level);
            var title1;
            if (zj.Game.PlayerInfoSystem.BaseInfo.titleId == 0) {
                title1 = zj.TextsConfig.TextsConfig_User.text_no_title;
            }
            else {
                var a = zj.PlayerItemSystem.Table(zj.Game.PlayerInfoSystem.BaseInfo.titleId);
                title1 = a.name;
            }
            var effect1;
            if (zj.Game.PlayerInfoSystem.BaseInfo.titleId == 0) {
                effect1 = zj.TextsConfig.TextsConfig_User.text_no_effect;
            }
            else {
                var a = zj.PlayerItemSystem.Table(zj.Game.PlayerInfoSystem.BaseInfo.titleId);
                effect1 = a.effect;
            }
            var pathVip = zj.UIConfig.UIConfig_User.vip[zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel - 1];
            var pathHead = zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId);
            var pathFrame = zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picFrameId);
            var strName = zj.Helper.StringFormat("%s%s", zj.TextsConfig.TextsConfig_User.text_name, zj.Game.PlayerInfoSystem.BaseInfo.name);
            var strUid = zj.Helper.StringFormat("%s%s", zj.TextsConfig.TextsConfig_User.text_id, zj.Game.PlayerInfoSystem.BaseInfo.id);
            var strLevel = zj.Helper.StringFormat("%s%s", zj.TextsConfig.TextsConfig_User.text_level, zj.Game.PlayerInfoSystem.BaseInfo.level);
            var strExp = zj.Helper.StringFormat("%s/%s", zj.Game.PlayerInfoSystem.BaseInfo.cur_exp, level.role_exp);
            var strTitle1 = zj.Helper.StringFormat("%s%s", zj.TextsConfig.TextsConfig_User.text_title[1], title1);
            var strEffect1 = zj.Helper.StringFormat("%s%s", zj.TextsConfig.TextsConfig_User.text_effect, effect1);
            var bMax = zj.Game.PlayerInfoSystem.BaseInfo.level == zj.CommonConfig.role_max_level;
            this.imgExpBarBg.width = 393 * zj.Game.PlayerInfoSystem.BaseInfo.cur_exp / level.role_exp;
            this.imgHead.source = zj.cachekey(pathHead, this);
            this.imgFrame.source = zj.cachekey(pathFrame, this);
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.modifyName == 0) {
                // this.labelUserName.text = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_User.name, TextsConfig.TextsConfig_Common.nameDefault);
            }
            else {
                // this.labelUserName.text = strName;
            }
            this.labelUserId.text = strUid;
            this.labelUserLevel.text = strLevel;
            this.labelExp.text = strExp;
            this.labelTitle1.text = strTitle1;
            this.labelEffext1.text = strEffect1;
            this.labelMax.visible = bMax;
            this.labelExp.visible = !bMax;
            //发事件通知主城改头像
            zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
        };
        /**查看特权 */
        userMainSense.prototype.onBtnVip = function () {
            var _this = this;
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.LICENSE, true)) {
                zj.loadUI(zj.licenseMain)
                    .then(function (scene) {
                    scene.CB(function () {
                        _this.close();
                    });
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        /**个性装扮 */
        userMainSense.prototype.onBtnChangeHead = function () {
            var _this = this;
            zj.loadUI(zj.Common_ChangeIcon)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setCB(function (head, frame) {
                    if (frame) {
                        if (head != 0) {
                            _this.ReqModifyUserHeadBefore(Number(head), frame);
                        }
                    }
                    else {
                        if (head != 0) {
                            _this.ReqModifyUserHeadBefore(Number(head), frame);
                        }
                    }
                });
                dialog.loadList(zj.TableEnum.TableIconListState.GENERAL);
            });
        };
        /**改名字 */
        userMainSense.prototype.onBtnChangeName = function () {
            var _this = this;
            var propId = zj.CommonConfig.role_modify_name_prop_id;
            var strNew = zj.TextsConfig.TextsConfig_User.name_new;
            var strTip = "";
            if (zj.Game.PlayerItemSystem.itemCount(propId) > 0) {
                var a = zj.PlayerItemSystem.Table(zj.Game.PlayerInfoSystem.BaseInfo.titleId);
                strTip = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_User.name_prop, a.name);
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.token > zj.CommonConfig.modify_role_name_consume) {
                strTip = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_User.name_token, zj.CommonConfig.modify_role_name_consume);
            }
            zj.loadUI(zj.Common_InputShortDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setCB(function (name, cb) {
                    _this.cb = cb;
                    _this.ReqModifyUserNameBefore(name);
                });
                dialog.SetInfo(null, message.EResourceType.RESOURCE_TOKEN);
                if (message.EResourceType.RESOURCE_TOKEN == zj.CommonConfig.league_modify_name_prop_id) {
                    dialog.btnRand.visible = false;
                    dialog.btnRand.enabled = false;
                }
            });
        };
        /**重新登录 */
        userMainSense.prototype.onBtnReLogin = function () {
            var _this = this;
            zj.Game.PlayerWonderLandSystem.WonderlandLeave().then(function () {
                zj.StageSceneManager.Instance.GetCurScene().delMember(zj.Game.PlayerInfoSystem.BaseInfo.id);
                zj.StageSceneManager.Instance.clearScene();
                zj.Game.PlayerWonderLandSystem.scenePosInfo = {};
                zj.Game.PlayerWonderLandSystem.timePosInfo = {};
                _this.gotoLogin();
            }).catch(function () {
            });
        };
        userMainSense.prototype.gotoLogin = function () {
            egret.clearInterval(this.update);
            zj.Game.uninit();
            zj.loadUI(zj.LoginScene)
                .then(function (scene) {
                zj.Game.UIManager.popAllUIs();
                scene.show();
            });
        };
        /**系统设置 */
        userMainSense.prototype.onBtnSystem = function () {
            zj.loadUI(zj.userSystem)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**激活码 */
        userMainSense.prototype.onBthKey = function () {
            zj.loadUI(zj.CommonInputCode)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        userMainSense.prototype.onBtnClose = function () {
            var _this = this;
            var top_scene = zj.Game.UIManager.topScene();
            if (top_scene) {
                top_scene.visible = true;
            }
            egret.Tween.get(this.imgbg).to({ alpha: 0 }, 100);
            egret.Tween.get(this.groupMain).to({ scaleX: 1.1, scaleY: 1.1 }, 50).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 200).call(function () {
                _this.close();
            });
            zj.Game.EventManager.event(zj.GameEvent.RESET_PLAYER_AVATA);
        };
        userMainSense.prototype.ReqModifyUserHeadBefore = function (head, frame) {
            var _this = this;
            if (head != zj.Game.PlayerInfoSystem.BaseInfo.picId) {
                this.ModifyRolePicReqBody(head, frame).then(function () {
                    _this.SetInfoUser();
                }).catch(function (result) {
                });
            }
        };
        userMainSense.prototype.ModifyRolePicReqBody = function (head, frame) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ModifyRolePicRequest();
                if (frame) {
                    request.body.picId = zj.Game.PlayerInfoSystem.BaseInfo.picId;
                    request.body.picFrame = head;
                }
                else {
                    request.body.picId = head;
                    request.body.picFrame = zj.Game.PlayerInfoSystem.BaseInfo.picFrameId;
                }
                request.body.titleId = zj.Game.PlayerInfoSystem.BaseInfo.titleId;
                request.body.viceTitleId = zj.Game.PlayerInfoSystem.BaseInfo.viceTitleId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        userMainSense.prototype.ReqModifyUserNameBefore = function (name) {
            var _this = this;
            if (name == undefined) {
                return;
            }
            else if (name == "" || name == null || name.length > zj.CommonConfig.limit_role_name_max * 2) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_User.error_name);
            }
            else if (name == zj.Game.PlayerInfoSystem.BaseInfo.name) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_User.same_name);
            }
            else {
                this.modifyRoleNameRespBody(name).then(function () {
                    if (_this.cb) {
                        _this.cb();
                    }
                    _this.ReqModifyUserInfo_Visit();
                }).catch(function (result) {
                    if (result == message.EC.XG_LACK_TOKEN) {
                        zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                            zj.loadUI(zj.PayMallScene)
                                .then(function (scene) {
                                scene.show(zj.UI.SHOW_FROM_TOP);
                                scene.init(false);
                            });
                        }, function () {
                        });
                    }
                });
            }
        };
        userMainSense.prototype.ReqModifyUserInfo_Visit = function () {
            this.SetInfoUser();
        };
        userMainSense.prototype.modifyRoleNameRespBody = function (name) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ModifyRoleNameRequest();
                request.body.name = name;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        return userMainSense;
    }(zj.Dialog));
    zj.userMainSense = userMainSense;
    __reflect(userMainSense.prototype, "zj.userMainSense");
})(zj || (zj = {}));
//# sourceMappingURL=userMainSense.js.map