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
    // 星耀福利 HXH_VipMain
    // lizhengqiang
    // 20190509
    var VipMain = (function (_super) {
        __extends(VipMain, _super);
        function VipMain() {
            var _this = _super.call(this) || this;
            _this.BUTTON = {
                "GIFT": 1,
                "RIGHT": 2,
                "MALL": 3,
            };
            _this.MAX = 7;
            _this.allProducts = [];
            _this.isFirstGift = false;
            _this.skinName = "resource/skins/vip/VipMainSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPay, _this);
            _this.btnGift.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGift, _this);
            _this.btnSelLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSelLeft, _this);
            _this.btnSelRight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSelRight, _this);
            _this.btnGetLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetLeft, _this);
            _this.btnGetRight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetRight, _this);
            _this.btnRights.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRights, _this);
            _this.btnSee1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSee1, _this);
            _this.btnSee1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnSee1Begin, _this);
            _this.btnSee1.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.onBtnSee1, _this);
            _this.btnSee2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSee2, _this);
            _this.btnSee2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnSee2Begin, _this);
            _this.btnSee2.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.onBtnSee2, _this);
            _this.btnUseAura1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUseAura1, _this);
            _this.btnUseAura2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUseAura2, _this);
            _this.btnUseAura3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUseAura3, _this);
            _this.btnUseAura4.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUseAura4, _this);
            _this.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMall, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.tween)
                    _this.tween.stop();
                zj.Game.EventManager.off(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.setInfo, _this);
                zj.Game.EventManager.off(zj.GameEvent.ON_ABOVE_POP, _this.onAbovePop, _this);
            }, null);
            return _this;
        }
        VipMain.prototype.init = function () {
            var _this = this;
            this.imgName.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.WordsTips, this);
            this.groupBgAni.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", null, 0).then(function (display) {
                _this.groupBgAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            this.tween.items[0].props = { loop: true };
            this.tween.play();
            this.rectMask = zj.Util.getMaskImgBlack(this.imgExp.width, this.imgExp.height);
            this.rectMask.verticalCenter = 0;
            this.rectMask.left = 7;
            this.rectMask.visible = false;
            this.groupExp.addChild(this.rectMask);
            this.loadPayProducts();
            this.index = 1;
            // this.imgPay.visible = (Game.PlayerPaySystem.webPayUrl != "" || Game.PlayerPaySystem.customerInfo.customerWeb != "");
            this.imgPay.visible = false;
            var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var chargeList = [];
            for (var _i = 0, _a = Object.keys(tbl); _i < _a.length; _i++) {
                var v = _a[_i];
                if (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken >= tbl[v].sum) {
                    chargeList.push(tbl[v]);
                }
            }
            this.id = chargeList.length - 1;
            this.levelCur = 0;
            this.setInfo();
            this.setList();
            this.setTips();
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, this.setInfo, this);
            zj.Game.EventManager.on(zj.GameEvent.ON_ABOVE_POP, this.onAbovePop, this);
        };
        VipMain.prototype.setTips = function () {
            var showTips2 = zj.Tips.tips_Vip_get(this.BUTTON.RIGHT);
            var showTips3 = zj.Tips.tips_Vip_get(this.BUTTON.MALL);
            this.imgTips1.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.VIPX, zj.Tips.TAG.VipX_Right);
            this.imgTips2.visible = showTips2;
            this.imgTips3.visible = showTips3;
            // this.imgTips6.visible = Tips.GetTipsOfId(Tips.TAG.VIPX, Tips.TAG.VipX_WebPay);
            this.imgTips6.visible = false;
        };
        VipMain.prototype.checkMaxLevel = function () {
            var tbl = zj.TableLicenceWeal.Table();
            this.MAX = 0;
            for (var key in tbl) {
                this.MAX = Math.max(this.MAX, tbl[key].level);
            }
        };
        VipMain.prototype.setInfo = function () {
            this.checkMaxLevel();
            var levelBefor = this.levelCur;
            var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var chargeList = [];
            for (var _i = 0, _a = Object.keys(tbl); _i < _a.length; _i++) {
                var v = _a[_i];
                if (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken >= tbl[v].sum) {
                    chargeList.push(tbl[v]);
                }
            }
            this.levelCur = chargeList.length - 1;
            if (this.levelCur != this.MAX) {
                this.imgVipNext.visible = true;
                this.lbNeed.visible = true;
                // 当前星耀等级名称
                this.imgVip.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipLevel[this.levelCur - 1], this);
                // 下一星耀等级名称
                this.imgVipNext.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipLevel[this.levelCur + 1 - 1], this);
                // 需要充值
                this.lbNeed.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.vipMoney, (tbl[this.levelCur + 1].sum - zj.Game.PlayerInfoSystem.BaseInfo.chargeToken) / 10);
            }
            else {
                this.imgVip.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipLevel[this.levelCur - 1], this);
                this.imgVipNext.visible = false;
                this.lbNeed.text = zj.TextsConfig.TextsConfig_Common.expMax;
            }
            // 充值进度条
            var percent = 0;
            if (this.levelCur != this.MAX) {
                percent = (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken - tbl[this.levelCur].sum) / Number(tbl[this.levelCur].charge);
                this.lbPay.text = (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken / 10 + "/" + (Number(tbl[this.levelCur].charge) + tbl[this.levelCur].sum) / 10);
            }
            else {
                percent = zj.Game.PlayerInfoSystem.BaseInfo.chargeToken / tbl[this.levelCur].sum;
                this.lbPay.text = (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken / 10 + "/" + tbl[this.levelCur].sum / 10);
            }
            if (percent > 1) {
                percent = 1;
            }
            this.rectMask.visible = true;
            this.rectMask.width = this.imgExp.width * percent;
            this.imgExp.mask = this.rectMask;
            // 客服
            // if (Game.PlayerPaySystem.customerInfo.customerName != "") {
            //     this.lbKefu.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.kefu,
            //         Game.PlayerPaySystem.customerInfo.customerName,
            //         Game.PlayerPaySystem.customerInfo.customerQQ,
            //         Game.PlayerPaySystem.customerInfo.customerWeichat
            //     );
            // } else {
            //     this.lbKefu.visible = false;
            //     this.lbDes.visible = false;
            // }
            if (this.levelCur > levelBefor && this.index == this.BUTTON.MALL) {
                this.onAbovePop();
            }
            if (this.levelCur > levelBefor) {
                this.id = this.levelCur;
                this.setList();
            }
        };
        VipMain.prototype.setList = function () {
            var _this = this;
            var i = this.index;
            var level = this.id; // 当前星耀等级
            var haloBack = null;
            var haloFront = null;
            var haloBackRight = null;
            var haloFrontRight = null;
            if (i == this.BUTTON.RIGHT) {
                var info = zj.TableItemPicFrame.Table(); // StringConfig_Table.itemFrame
                var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
                this.imgYIncang1.visible = false;
                this.imgYIncang2.visible = false;
                if (this.id != this.MAX) {
                    haloBack = zj.PlayerVIPSystem.HaloItem(tbl[this.id].halo_id).halo_back_aniId;
                    haloFront = zj.PlayerVIPSystem.HaloItem(tbl[this.id].halo_id).halo_front_aniId;
                    haloBackRight = zj.PlayerVIPSystem.HaloItem(tbl[this.id + 1].halo_id).halo_back_aniId;
                    haloFrontRight = zj.PlayerVIPSystem.HaloItem(tbl[this.id + 1].halo_id).halo_front_aniId;
                }
                else {
                    haloBack = zj.PlayerVIPSystem.HaloItem(tbl[this.id - 1].halo_id).halo_back_aniId;
                    haloFront = zj.PlayerVIPSystem.HaloItem(tbl[this.id - 1].halo_id).halo_front_aniId;
                    haloBackRight = zj.PlayerVIPSystem.HaloItem(tbl[this.id].halo_id).halo_back_aniId;
                    haloFrontRight = zj.PlayerVIPSystem.HaloItem(tbl[this.id].halo_id).halo_front_aniId;
                }
                var path = "";
                var pathNext = "";
                if (this.id != this.MAX) {
                    path = zj.Table.FindV(info, tbl[level].picFrame_id)["path"];
                    pathNext = zj.Table.FindV(info, tbl[level + 1].picFrame_id)["path"];
                }
                else {
                    path = zj.Table.FindV(info, tbl[level - 1].picFrame_id)["path"];
                    pathNext = zj.Table.FindV(info, tbl[level].picFrame_id)["path"];
                }
                this.groupRight.visible = true;
                this.groupButton.visible = true;
                this.groupGift.visible = false;
                this.groupMall.visible = false;
                this.groupAuraProperty1.visible = false;
                this.groupAuraProperty2.visible = false;
                var mapRoleId = zj.PlayerVIPSystem.GetMapRoleInfo(zj.Game.PlayerInfoSystem.BaseInfo);
                var bodySpxId = zj.TableMapRole.Item(mapRoleId).body_spx_id;
                var scale_1 = zj.TableMapRole.Item(mapRoleId).spine_scale;
                var dbName = zj.TableClientFightAniSpineSource.Item(bodySpxId).atlas;
                var animation = zj.TableClientFightAniSpineSource.Item(bodySpxId).ani_name;
                this.groupHunter1.scaleX = 0.7;
                this.groupHunter1.scaleY = 0.7;
                this.groupHunter1.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", animation, 0).then(function (display) {
                    display.scaleX = scale_1;
                    display.scaleY = scale_1;
                    _this.groupHunter1.addChild(display);
                }).catch(function (reason) {
                    zj.toast(reason);
                });
                this.groupHunter2.scaleX = 0.7;
                this.groupHunter2.scaleY = 0.7;
                this.groupHunter2.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", animation, 0).then(function (display) {
                    display.scaleX = scale_1;
                    display.scaleY = scale_1;
                    _this.groupHunter2.addChild(display);
                }).catch(function (reason) {
                    zj.toast(reason);
                });
                var getAinmationInfo = function (id) {
                    var aniUi = zj.TableClientAniUi.Item(id);
                    var cssSource = zj.TableClientAniCssSource.Item(aniUi.css_id);
                    return [cssSource.name + "_" + cssSource.number, aniUi.index];
                };
                this.groupAuraBack1.removeChildren();
                this.groupAuraFront1.removeChildren();
                var back1 = getAinmationInfo(haloBack);
                var front1 = getAinmationInfo(haloFront);
                zj.Game.DragonBonesManager.playAnimation(this, back1[0], "armatureName", back1[1], 0).then(function (display) {
                    _this.groupAuraBack1.addChild(display);
                }).catch(function (reason) {
                    zj.toast(reason);
                });
                zj.Game.DragonBonesManager.playAnimation(this, front1[0], "armatureName", front1[1], 0).then(function (display) {
                    _this.groupAuraFront1.addChild(display);
                }).catch(function (reason) {
                    zj.toast(reason);
                });
                this.groupAuraBack2.removeChildren();
                this.groupAuraFront2.removeChildren();
                var back2 = getAinmationInfo(haloBackRight);
                var front2 = getAinmationInfo(haloFrontRight);
                zj.Game.DragonBonesManager.playAnimation(this, back2[0], "armatureName", back2[1], 0).then(function (display) {
                    _this.groupAuraBack2.addChild(display);
                }).catch(function (reason) {
                    zj.toast(reason);
                });
                zj.Game.DragonBonesManager.playAnimation(this, front2[0], "armatureName", front2[1], 0).then(function (display) {
                    _this.groupAuraFront2.addChild(display);
                }).catch(function (reason) {
                    zj.toast(reason);
                });
                if (this.id != this.MAX) {
                    this.imgVipLevel1.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipLevel[level - 1], this);
                    this.imgHeadLeft1.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
                    this.imgFrameLeft2.source = zj.cachekey(path, this);
                    this.imgHeadLeft2.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
                    this.imgVipLevel2.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipLevel[level], this);
                    this.imgHeadRight1.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
                    this.imgFrameRight2.source = zj.cachekey(pathNext, this);
                    this.imgIconRight2.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
                }
                else {
                    this.imgVipLevel1.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipLevel[level - 2], this);
                    this.imgHeadLeft1.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
                    this.imgFrameLeft2.source = zj.cachekey(path, this);
                    this.imgHeadLeft2.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
                    this.imgVipLevel2.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipLevel[level - 1], this);
                    this.imgHeadRight1.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
                    this.imgFrameRight2.source = zj.cachekey(pathNext, this);
                    this.imgIconRight2.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
                }
                var path1 = zj.UIConfig.UIConfig_VipMall.buttonUse;
                var pathFrame = zj.UIConfig.UIConfig_VipMall.buttonUseFrame;
                var userCancle = zj.UIConfig.UIConfig_VipMall.buttonUseCancel;
                if (this.levelCur != this.MAX && this.levelCur >= this.id && this.levelCur < this.id + 1) {
                    this.btnUseAura1.visible = true;
                    this.btnUseAura2.visible = true;
                    this.btnUseAura3.visible = false;
                    this.btnUseAura4.visible = false;
                    this.imgDontHaveLeft1.visible = false;
                    this.imgDontHaveLeft2.visible = false;
                    this.imgDontHaveRight1.visible = true;
                    this.imgDontHaveRight2.visible = true;
                    // 判断光环按钮状态（取消/使用）
                    if (zj.Game.PlayerInfoSystem.BaseInfo.haloId == tbl[this.id].halo_id) {
                        zj.Set.ButtonBackgroud(this.btnUseAura1, userCancle[0], userCancle[1], userCancle[1]);
                        this.imgYIncang1.visible = true;
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnUseAura1, path1[0], path1[1], path1[1]);
                    }
                    //判断头像框按钮状态（取消/使用）
                    if (zj.Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[this.id].picFrame_id) {
                        zj.Set.ButtonBackgroud(this.btnUseAura2, pathFrame[0], pathFrame[1], pathFrame[1]);
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnUseAura2, userCancle[0], userCancle[1], userCancle[1]);
                    }
                }
                else if (this.levelCur >= this.id + 1) {
                    this.btnUseAura1.visible = true;
                    this.btnUseAura2.visible = true;
                    this.btnUseAura3.visible = true;
                    this.btnUseAura4.visible = true;
                    this.imgDontHaveLeft1.visible = false;
                    this.imgDontHaveLeft2.visible = false;
                    this.imgDontHaveRight1.visible = false;
                    this.imgDontHaveRight2.visible = false;
                    if (zj.Game.PlayerInfoSystem.BaseInfo.haloId == tbl[this.id].halo_id) {
                        zj.Set.ButtonBackgroud(this.btnUseAura1, userCancle[0], userCancle[1], userCancle[1]);
                        this.imgYIncang1.visible = true;
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnUseAura1, path1[0], path1[1], path1[1]);
                    }
                    if (zj.Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[this.id].picFrame_id) {
                        zj.Set.ButtonBackgroud(this.btnUseAura2, pathFrame[0], pathFrame[1], pathFrame[1]);
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnUseAura2, userCancle[0], userCancle[1], userCancle[1]);
                    }
                    if (zj.Game.PlayerInfoSystem.BaseInfo.haloId == tbl[this.id + 1].halo_id) {
                        zj.Set.ButtonBackgroud(this.btnUseAura3, userCancle[0], userCancle[1], userCancle[1]);
                        this.imgYIncang2.visible = true;
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnUseAura3, path1[0], path1[1], path1[1]);
                    }
                    if (zj.Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[this.id + 1].picFrame_id) {
                        zj.Set.ButtonBackgroud(this.btnUseAura4, pathFrame[0], pathFrame[1], pathFrame[1]);
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnUseAura4, userCancle[0], userCancle[1], userCancle[1]);
                    }
                }
                else if (this.levelCur == this.MAX) {
                    this.btnUseAura1.visible = true;
                    this.btnUseAura2.visible = true;
                    this.btnUseAura3.visible = true;
                    this.btnUseAura4.visible = true;
                    this.imgDontHaveLeft1.visible = false;
                    this.imgDontHaveLeft2.visible = false;
                    this.imgDontHaveRight1.visible = false;
                    this.imgDontHaveRight2.visible = false;
                    if (zj.Game.PlayerInfoSystem.BaseInfo.haloId == tbl[this.id - 1].halo_id) {
                        zj.Set.ButtonBackgroud(this.btnUseAura1, userCancle[0], userCancle[1], userCancle[1]);
                        this.imgYIncang1.visible = true;
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnUseAura1, path1[0], path1[1], path1[1]);
                    }
                    if (zj.Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[this.id - 1].picFrame_id) {
                        zj.Set.ButtonBackgroud(this.btnUseAura2, pathFrame[0], pathFrame[1], pathFrame[1]);
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnUseAura2, userCancle[0], userCancle[1], userCancle[1]);
                    }
                    if (zj.Game.PlayerInfoSystem.BaseInfo.haloId == tbl[this.id].halo_id) {
                        zj.Set.ButtonBackgroud(this.btnUseAura3, userCancle[0], userCancle[1], userCancle[1]);
                        this.imgYIncang2.visible = true;
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnUseAura3, path1[0], path1[1], path1[1]);
                    }
                    if (zj.Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[this.id].picFrame_id) {
                        zj.Set.ButtonBackgroud(this.btnUseAura4, pathFrame[0], pathFrame[1], pathFrame[1]);
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnUseAura4, userCancle[0], userCancle[1], userCancle[1]);
                    }
                }
                else {
                    this.btnUseAura1.visible = false;
                    this.btnUseAura2.visible = false;
                    this.btnUseAura3.visible = false;
                    this.btnUseAura4.visible = false;
                    this.imgDontHaveLeft1.visible = true;
                    this.imgDontHaveLeft2.visible = true;
                    this.imgDontHaveRight1.visible = true;
                    this.imgDontHaveRight2.visible = true;
                }
            }
            else if (i == this.BUTTON.GIFT) {
                var tbl_1 = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
                if (!this.isFirstGift) {
                    var len = this.id;
                    var _loop_1 = function (j) {
                        if (!zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward, function (k, v) {
                            return v == tbl_1[j].reward_index;
                        })) {
                            this_1.id = j;
                            level = j;
                            this_1.isFirstGift = true;
                            return "break";
                        }
                    };
                    var this_1 = this;
                    for (var j = len; j > 0; j--) {
                        var state_1 = _loop_1(j);
                        if (state_1 === "break")
                            break;
                    }
                }
                this.groupRight.visible = false;
                this.groupButton.visible = true;
                this.groupGift.visible = true;
                this.groupMall.visible = false;
                var path = zj.UIConfig.UIConfig_VipMall.Get;
                if (this.id != this.MAX) {
                    this.imgGiftLevel1.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipLevel[level - 1], this);
                    this.imgAwardIcon1.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipAward[level - 1], this);
                    this.imgGiftLevel2.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipLevel[level + 1 - 1], this);
                    this.imgAwardIcon2.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipAward[level + 1 - 1], this);
                }
                else {
                    this.imgGiftLevel1.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipLevel[level - 1 - 1], this);
                    this.imgAwardIcon1.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipAward[level - 1 - 1], this);
                    this.imgGiftLevel2.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipLevel[level - 1], this);
                    this.imgAwardIcon2.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.vipAward[level - 1], this);
                }
                var getLevelAward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward, function (k, v) {
                    return v == tbl_1[_this.id].reward_index;
                });
                var getLevelNext = false;
                if (this.id != this.MAX) {
                    getLevelNext = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward, function (k, v) {
                        return v == tbl_1[_this.id + 1].reward_index;
                    });
                }
                var getLevelBefore = false;
                if (this.id != 1) {
                    getLevelBefore = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward, function (k, v) {
                        return v == tbl_1[_this.id - 1].reward_index;
                    });
                }
                if (this.levelCur != this.MAX && this.levelCur >= this.id && this.levelCur < this.id + 1) {
                    this.btnGetLeft.visible = true;
                    this.btnGetRight.visible = false;
                    this.imgDontHaveLeft.visible = false;
                    this.imgDontHaveRight.visible = true;
                    if (getLevelAward) {
                        zj.Set.ButtonBackgroud(this.btnGetLeft, path[0], path[0], path[0]);
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnGetLeft, path[1], path[2], path[2]);
                    }
                }
                else if (this.levelCur >= this.id + 1) {
                    this.btnGetLeft.visible = true;
                    this.btnGetRight.visible = true;
                    this.imgDontHaveLeft.visible = false;
                    this.imgDontHaveRight.visible = false;
                    if (getLevelAward) {
                        zj.Set.ButtonBackgroud(this.btnGetLeft, path[0], path[0], path[0]);
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnGetLeft, path[1], path[2], path[2]);
                    }
                    if (getLevelNext) {
                        zj.Set.ButtonBackgroud(this.btnGetRight, path[0], path[0], path[0]);
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnGetRight, path[1], path[2], path[2]);
                    }
                }
                else if (this.levelCur == this.MAX) {
                    this.btnGetLeft.visible = true;
                    this.btnGetRight.visible = true;
                    this.imgDontHaveLeft.visible = false;
                    this.imgDontHaveRight.visible = false;
                    if (getLevelBefore) {
                        zj.Set.ButtonBackgroud(this.btnGetLeft, path[0], path[0], path[0]);
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnGetLeft, path[1], path[2], path[2]);
                    }
                    if (getLevelAward) {
                        zj.Set.ButtonBackgroud(this.btnGetRight, path[0], path[0], path[0]);
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.btnGetRight, path[1], path[2], path[2]);
                    }
                }
                else {
                    this.btnGetLeft.visible = false;
                    this.btnGetRight.visible = false;
                    this.imgDontHaveLeft.visible = true;
                    this.imgDontHaveRight.visible = true;
                }
            }
            else if (i == this.BUTTON.MALL) {
                this.groupRight.visible = false;
                this.groupButton.visible = false;
                this.groupGift.visible = false;
                this.groupMall.visible = true;
                this.lstViewItem.visible = true;
                var giftList = [[], []];
                var list = [];
                giftList[0] = zj.PlayerGiftSystem.SortVipX(zj.Game.PlayerGiftSystem.giftInfos);
                giftList[1] = zj.PlayerGiftSystem.Trigger();
                for (var _i = 0, giftList_1 = giftList; _i < giftList_1.length; _i++) {
                    var v = giftList_1[_i];
                    if (v == undefined)
                        continue;
                    for (var _a = 0, v_1 = v; _a < v_1.length; _a++) {
                        var vv = v_1[_a];
                        list.push(vv);
                    }
                }
                var arrCollection = new eui.ArrayCollection();
                var i_1 = 1;
                for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                    var v = list_1[_b];
                    arrCollection.addItem({ id: i_1, info: v, father: this, level: this.levelCur });
                    i_1 = i_1 + 1;
                }
                this.lstViewItem.dataProvider = arrCollection;
                this.lstViewItem.itemRenderer = zj.VipMallItem;
            }
            // 按钮状态
            this.btnGift.enabled = (i != this.BUTTON.GIFT);
            this.btnRights.enabled = (i != this.BUTTON.RIGHT);
            this.btnMall.enabled = (i != this.BUTTON.MALL);
            this.btnGift.currentState = (i == this.BUTTON.GIFT ? "down" : "up");
            this.btnRights.currentState = (i == this.BUTTON.RIGHT ? "down" : "up");
            this.btnMall.currentState = (i == this.BUTTON.MALL ? "down" : "up");
            this.btnSelLeft.enabled = (this.id != 1);
            this.btnSelRight.enabled = (this.id != this.MAX - 1);
            if (this.id == 1) {
                this.btnSelLeft.visible = false;
            }
            else {
                this.btnSelLeft.visible = true;
            }
            if (this.id == this.levelCur || (this.id == this.levelCur - 1 && this.levelCur == this.MAX)) {
                this.btnSelRight.visible = false;
            }
            else {
                this.btnSelRight.visible = true;
            }
            this.vipSeeTips1(this.id);
            if (this.id == this.MAX) {
                this.vipSeeTips2(this.id);
            }
            else {
                this.vipSeeTips2(this.id + 1);
            }
        };
        VipMain.prototype.onAbovePop = function () {
            this.setInfo();
            this.setList();
        };
        VipMain.prototype.vipSeeTips1 = function (i) {
            var show = zj.Tips.tips_VipAttri_get(i);
            this.imgTips4.visible = (show && i <= this.levelCur);
        };
        VipMain.prototype.vipSeeTips2 = function (i) {
            var show = zj.Tips.tips_VipAttri_get(i);
            this.imgTips5.visible = (show && i <= this.levelCur);
        };
        VipMain.prototype.onBtnSee1Begin = function () {
            var flagId = 0;
            if (this.id == this.MAX) {
                flagId = this.id - 1;
            }
            else {
                flagId = this.id;
            }
            var info = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var tbl = zj.TableHalo.Table(); // StringConfig_Table.vipHalo
            var haloId = info[flagId].halo_id;
            var speed = tbl[haloId].scene_speed_add * 100;
            var types = tbl[haloId].add_type;
            var addCrit = tbl[haloId].add_crit;
            if (types == undefined || (types[0] == 0 && types[1] == 0)) {
                this.lbAuraProperty1.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.attriAdd1, speed);
            }
            else if ((types.length == 1 || (types[0] == 0 && types[1] != 0) || (types[0] != 0 && types[1] == 0)) && speed != 0) {
                var str = zj.TextsConfig.TextsConfig_VipMall.attri[types[0]];
                this.lbAuraProperty1.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.attriAdd2, str, addCrit[0], speed);
            }
            else if ((types.length == 1 || (types[0] == 0 && types[1] != 0) || (types[0] != 0 && types[1] == 0)) && speed == 0) {
                var str = zj.TextsConfig.TextsConfig_VipMall.attri[types[0]];
                this.lbAuraProperty1.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.attriAdd4, str, addCrit[0]);
            }
            else if (types.length == 2 && speed == 0) {
                var str1 = zj.TextsConfig.TextsConfig_VipMall.attri[types[0]];
                var str2 = zj.TextsConfig.TextsConfig_VipMall.attri[types[1]];
                this.lbAuraProperty1.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.attriAdd5, str1, addCrit[0], str2, addCrit[1]);
            }
            else {
                var str1 = zj.TextsConfig.TextsConfig_VipMall.attri[types[0]];
                var str2 = zj.TextsConfig.TextsConfig_VipMall.attri[types[1]];
                this.lbAuraProperty1.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.attriAdd3, str1, addCrit[0], str2, addCrit[1], speed);
            }
            this.groupAuraProperty1.visible = true;
        };
        VipMain.prototype.onBtnSee1 = function () {
            zj.Tips.tips_VipAttri_set(this.id);
            this.vipSeeTips1(this.id);
            this.groupAuraProperty1.visible = false;
        };
        VipMain.prototype.onBtnSee2Begin = function () {
            var flagId = 0;
            if (this.id == this.MAX) {
                flagId = this.id;
            }
            else {
                flagId = this.id + 1;
            }
            var info = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var tbl = zj.TableHalo.Table(); // StringConfig_Table.vipHalo
            var haloId = info[flagId].halo_id;
            var speed = tbl[haloId].scene_speed_add * 100;
            var types = tbl[haloId].add_type;
            var addCrit = tbl[haloId].add_crit;
            if (types == undefined || (types[0] == 0 && types[1] == 0)) {
                this.lbAuraProperty2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.attriAdd1, speed);
            }
            else if ((types.length == 1 || (types[0] == 0 && types[1] != 0) || (types[0] != 0 && types[1] == 0)) && speed != 0) {
                var str = zj.TextsConfig.TextsConfig_VipMall.attri[types[0]];
                this.lbAuraProperty2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.attriAdd2, str, addCrit[0], speed);
            }
            else if ((types.length == 1 || (types[0] == 0 && types[1] != 0) || (types[0] != 0 && types[1] == 0)) && speed == 0) {
                var str = zj.TextsConfig.TextsConfig_VipMall.attri[types[0]];
                this.lbAuraProperty2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.attriAdd4, str, addCrit[0]);
            }
            else if (types.length == 2 && speed == 0) {
                var str1 = zj.TextsConfig.TextsConfig_VipMall.attri[types[0]];
                var str2 = zj.TextsConfig.TextsConfig_VipMall.attri[types[1]];
                this.lbAuraProperty2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.attriAdd5, str1, addCrit[0], str2, addCrit[1]);
            }
            else {
                var str1 = zj.TextsConfig.TextsConfig_VipMall.attri[types[0]];
                var str2 = zj.TextsConfig.TextsConfig_VipMall.attri[types[1]];
                this.lbAuraProperty2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.attriAdd3, str1, addCrit[0], str2, addCrit[1], speed);
            }
            this.groupAuraProperty2.visible = true;
        };
        VipMain.prototype.onBtnSee2 = function () {
            zj.Tips.tips_VipAttri_set(this.id + 1);
            this.vipSeeTips2(this.id + 1);
            this.groupAuraProperty2.visible = false;
        };
        // 左侧 使用/取消光环
        VipMain.prototype.onBtnUseAura1 = function () {
            var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var haloId = 0;
            var flagId = 0;
            if (this.id == this.MAX) {
                flagId = this.id - 1;
            }
            else {
                flagId = this.id;
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.haloId != tbl[flagId].halo_id) {
                haloId = tbl[flagId].halo_id;
            }
            this.setHaloReq(haloId);
        };
        // 左侧 使用/取消头像框
        VipMain.prototype.onBtnUseAura2 = function () {
            var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var frameId = 150001;
            var flagId = 0;
            if (this.id == this.MAX) {
                flagId = this.id - 1;
            }
            else {
                flagId = this.id;
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[flagId].picFrame_id) {
                frameId = tbl[flagId].picFrame_id;
            }
            this.modifyRolePicReq(frameId);
        };
        // 右侧 使用/取消光环
        VipMain.prototype.onBtnUseAura3 = function () {
            var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var haloId = 0;
            var flagId = 0;
            if (this.id == this.MAX) {
                flagId = this.id - 1;
            }
            else {
                flagId = this.id;
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.haloId != tbl[flagId + 1].halo_id) {
                haloId = tbl[flagId + 1].halo_id;
            }
            this.setHaloReq(haloId);
        };
        // 右侧 使用/取消头像框
        VipMain.prototype.onBtnUseAura4 = function () {
            var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var frameId = 150001;
            var flagId = 0;
            if (this.id == this.MAX) {
                flagId = this.id - 1;
            }
            else {
                flagId = this.id;
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.picFrameId != tbl[flagId + 1].picFrame_id) {
                frameId = tbl[flagId + 1].picFrame_id;
            }
            this.modifyRolePicReq(frameId);
        };
        VipMain.prototype.onBtnSelLeft = function () {
            if (this.id != 1 && this.id != this.MAX) {
                this.id = this.id - 1;
                this.setList();
                this.setInfo();
            }
            else {
                this.id = this.id - 2;
                this.setInfo();
                this.setList();
            }
        };
        VipMain.prototype.onBtnSelRight = function () {
            if (this.id != this.MAX) {
                this.id = this.id + 1;
                this.setInfo();
                this.setList();
            }
        };
        // 回馈左侧领取奖励
        VipMain.prototype.onBtnGetLeft = function () {
            zj.Tips.SetTipsOfId(zj.Tips.TAG.VIPX, zj.Tips.TAG.VipX_Right);
            var flagId = 0;
            if (this.id == this.MAX) {
                flagId = this.id - 1;
            }
            else {
                flagId = this.id;
            }
            this.bigVipRewardReq(flagId);
            this.setTips();
        };
        // 回馈右侧领取奖励
        VipMain.prototype.onBtnGetRight = function () {
            zj.Tips.SetTipsOfId(zj.Tips.TAG.VIPX, zj.Tips.TAG.VipX_Right);
            var flagId = 0;
            if (this.id == this.MAX) {
                flagId = this.id - 1;
            }
            else {
                flagId = this.id;
            }
            this.bigVipRewardReq(flagId + 1);
            this.setTips();
        };
        // 领取奖励
        VipMain.prototype.bigVipRewardReq = function (level) {
            var _this = this;
            zj.Game.PlayerVIPSystem.bigVipReward(level).then(function (gameInfo) {
                zj.Tips.SetTipsOfId(zj.Tips.TAG.FRIEND, 1);
                _this.setTips();
                zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward = gameInfo.mixUnitInfo[0].vipReward;
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.show();
                    dialog.init(gameInfo.getGoods);
                    dialog.setCB(function () {
                        _this.setList();
                    });
                });
            });
        };
        VipMain.prototype.onBtnGift = function () {
            var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var chargeList = [];
            for (var k in tbl) {
                var v = tbl[k];
                if (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken >= v.sum) {
                    chargeList.push(v);
                }
            }
            this.id = chargeList.length - 1;
            this.index = this.BUTTON.GIFT;
            this.setList();
            var tbl1 = zj.PlayerGiftSystem.SortVipX(zj.Game.PlayerGiftSystem.giftInfos);
            for (var _i = 0, tbl1_1 = tbl1; _i < tbl1_1.length; _i++) {
                var v = tbl1_1[_i];
                var num = Number(v.gift_index + v.index);
                if (zj.Tips.tips_oneday_get(num) && !zj.Tips.tips_Vip_get(this.BUTTON.MALL)) {
                    zj.Tips.tips_oneday_set(num, true);
                }
            }
        };
        VipMain.prototype.onBtnRights = function () {
            zj.Tips.tips_Vip_set(this.BUTTON.RIGHT);
            this.setTips();
            var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var chargeList = [];
            for (var k in tbl) {
                var v = tbl[k];
                if (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken >= v.sum) {
                    chargeList.push(v);
                }
            }
            this.id = chargeList.length - 1;
            this.index = this.BUTTON.RIGHT;
            this.setList();
            var tbl1 = zj.PlayerGiftSystem.SortVipX(zj.Game.PlayerGiftSystem.giftInfos);
            for (var _i = 0, tbl1_2 = tbl1; _i < tbl1_2.length; _i++) {
                var v = tbl1_2[_i];
                var num = Number(v.gift_index + v.index);
                if (zj.Tips.tips_oneday_get(num) && !zj.Tips.tips_Vip_get(this.BUTTON.MALL)) {
                    zj.Tips.tips_oneday_set(num, true);
                }
            }
        };
        VipMain.prototype.onBtnMall = function () {
            var _this = this;
            zj.Game.PlayerGiftSystem.getNewGift().then(function () {
                zj.Tips.tips_Vip_set(_this.BUTTON.MALL);
                _this.setTips();
                _this.index = _this.BUTTON.MALL;
                _this.setList();
            });
        };
        VipMain.prototype.onBtnPay = function () {
            var _this = this;
            // if (Game.PlayerPaySystem.webPayUrl != "" || Game.PlayerPaySystem.customerInfo.customerWeb != "") {
            //     // web pay
            // } else {
            //     loadUI(PayMallScene)
            //         .then((scene: PayMallScene) => {
            //             scene.show(UI.SHOW_FROM_TOP);
            //             scene.init();
            //         });
            // }
            this.touchEnabled = false;
            zj.loadUI(zj.PayMallScene)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init();
                _this.touchEnabled = true;
            }).catch(function () {
                _this.touchEnabled = true;
            });
        };
        VipMain.prototype.onBtnClose = function () {
            zj.Tips.SetTipsOfId(zj.Tips.TAG.VIPX, zj.Tips.TAG.VipXGift);
            var tbl = zj.PlayerGiftSystem.SortVipX(zj.Game.PlayerGiftSystem.giftInfos);
            for (var _i = 0, tbl_2 = tbl; _i < tbl_2.length; _i++) {
                var v = tbl_2[_i];
                var num = Number(v.gift_index + v.index);
                if (zj.Tips.tips_oneday_get(num) && !zj.Tips.tips_Vip_get(this.BUTTON.MALL)) {
                    zj.Tips.tips_oneday_set(num, true);
                }
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        VipMain.prototype.setHaloReq = function (haloId) {
            var _this = this;
            zj.Game.PlayerVIPSystem.setHalo(haloId).then(function (gameInfo) {
                zj.Game.PlayerInfoSystem.BaseInfo.haloId = gameInfo.baseInfo[0].haloId;
                _this.setList();
            });
        };
        VipMain.prototype.modifyRolePicReq = function (frameId) {
            var _this = this;
            zj.Game.PlayerVIPSystem.modifyRolePic(zj.Game.PlayerInfoSystem.BaseInfo.picId, frameId, zj.Game.PlayerInfoSystem.BaseInfo.titleId, zj.Game.PlayerInfoSystem.BaseInfo.viceTitleId).then(function (gameInfo) {
                zj.Game.PlayerInfoSystem.BaseInfo.picFrameId = gameInfo.baseInfo[0].picFrameId;
                _this.setList();
            });
        };
        VipMain.prototype.loadPayProducts = function () {
            var _this = this;
            zj.Game.PlayerPaySystem.queryAppProducts().then(function (resp) {
                for (var _i = 0, _a = resp.products; _i < _a.length; _i++) {
                    var v = _a[_i];
                    for (var _b = 0, _c = resp.channel_products_ext; _b < _c.length; _b++) {
                        var vv = _c[_b];
                        if (v.id == vv.id) {
                            var tmp = {
                                id: "",
                                name: "",
                                describe: "",
                                currency: "",
                                amount: 0,
                                amount_usd: 0,
                                coin: 0,
                                type: "",
                                discount: "",
                                cp_product_id: "",
                            };
                            for (var k in tmp) {
                                tmp[k] = v[k];
                            }
                            tmp.cp_product_id = vv.cp_product_id;
                            _this.allProducts.push(tmp);
                            break;
                        }
                    }
                }
                var i = 0;
                while (i < _this.allProducts.length) {
                    if (zj.PlayerPaySystem.PayItemByID(_this.allProducts[i].cp_product_id) == null) {
                        _this.allProducts.splice(i, 1);
                    }
                    else {
                        i = i + 1;
                    }
                }
                _this.allProducts.sort(function (a, b) {
                    var itemA = zj.PlayerPaySystem.PayItemByID(a.cp_product_id);
                    var itemB = zj.PlayerPaySystem.PayItemByID(b.cp_product_id);
                    if (itemA == null)
                        return 1;
                    if (itemB == null)
                        return -1;
                    if (itemA.sort_index == itemB.sort_index) {
                        return b.amount - a.amount;
                    }
                    else {
                        return itemA.sort_index - itemB.sort_index;
                    }
                });
            }).catch(function (err) {
                zj.toast_warning(err);
            });
        };
        return VipMain;
    }(zj.Scene));
    zj.VipMain = VipMain;
    __reflect(VipMain.prototype, "zj.VipMain");
})(zj || (zj = {}));
//# sourceMappingURL=VipMain.js.map