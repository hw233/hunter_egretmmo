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
     * @date 2019-1-22
     *
     * @class 获得猎人动画界面
     */
    var CommonGetGeneral = (function (_super) {
        __extends(CommonGetGeneral, _super);
        function CommonGetGeneral() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonGetGeneralSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.labelCloseTheTip); // 因为是循环播放，需要特别处理
            }, null);
            // this.width = UIManager.StageWidth;
            // this.height = UIManager.StageHeight;
            for (var i = 1; i < 6; i++) {
                _this["img" + i].visible = false;
            }
            _this.imgHunterLevel.visible = false;
            zj.Game.DragonBonesManager.playAnimation(_this, "ui_jiuguan_zhaomu", "armatureName", null, 0)
                .then(function (display) {
                _this.groupAnimation.addChild(display);
            });
            return _this;
        }
        CommonGetGeneral.prototype.setInfo = function (generalId, sould, cb, info, trasfer) {
            this.callback = cb;
            zj.Game.SoundManager.playEffect(this.SoundOpen(30012), 300);
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(generalId);
            var transfer_level = zj.Game.PlayerHunterSystem.GeneralTransferLevel(generalId);
            var half_path = zj.TableMapRole.Item(baseGeneralInfo.general_roleId).half_path;
            var typePath = zj.UIConfig.UIConfig_General.hunter_type3[baseGeneralInfo.features];
            var levelPath = zj.UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude]; //品级（A-S）
            var picRoleInfo;
            var tranferInfo;
            if (transfer_level && transfer_level > 0) {
                tranferInfo = zj.TableGeneralTransfer.Item(zj.PlayerHunterSystem.GetGeneralId(Number(generalId))); //PlayerHunterSystem.Table(generalId , transfer_level);
                picRoleInfo = zj.TableMapRole.Item(tranferInfo.transfer_role);
                half_path = picRoleInfo.half_path;
                this.imgHunterName.source = zj.cachekey(tranferInfo.name_pic, this);
            }
            else {
                this.imgHunterName.source = zj.cachekey(baseGeneralInfo.name_pic, this);
            }
            var transfer = zj.Game.PlayerHunterSystem.GeneralTransferLevel(generalId);
            var general_roleId;
            var body_spx_id;
            if (transfer > 0) {
                var info_gnr = zj.TableGeneralTransfer.Item(zj.PlayerHunterSystem.GetGeneralId(Number(generalId))); //PlayerHunterSystem.Table(generalId, transfer);
                var info_map = zj.TableMapRole.Item(info_gnr.transfer_role);
                body_spx_id = info_map.body_spx_id;
            }
            else {
                general_roleId = baseGeneralInfo.general_roleId;
                body_spx_id = zj.PlayerHunterSystem.MapInstance(general_roleId).body_spx_id;
            }
            var animationUrl = zj.TableClientFightAniSpineSource.Item(body_spx_id).json;
            var strs = new Array();
            strs = animationUrl.split("/");
            var animationPracticalUrl = strs[strs.length - 1].split(".")[0];
            this.playHunterAnimation(animationPracticalUrl);
            this.labelHunterExplain.text = baseGeneralInfo.extra;
            this.imgHunter.source = zj.cachekey(half_path, this);
            this.imgType.source = zj.cachekey(typePath, this);
            this.imgHunterLevel.source = zj.cachekey(levelPath, this);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                this.imageBg.source = zj.cachekey("wx_ui_tavern_BoardGetHunter_png", this);
            }
            this.playStarAnimation(1, baseGeneralInfo.init_star);
            var generalTbl = zj.PlayerHunterSystem.Table(generalId, trasfer).general_roleId;
            var soundnum = zj.TableMapRole.Item(generalTbl).taici_dub_sound;
            zj.Game.SoundManager.playEffect(this.SoundOpen(soundnum), 500);
            egret.setTimeout(this.playTipAnimation, this, 1500);
            if (generalId == 10022) {
                this.imgHunter.left = -120;
                this.imgHunter.scaleX = 1.1;
                this.imgHunter.scaleY = 1.1;
            }
            if (info != null) {
                if (zj.Table.FindK(info, zj.PlayerHunterSystem.Table(generalId, trasfer).general_id) != -1) {
                }
                else {
                    // loadUI(TavernGetGeneralPop)
                    //     .then((taverngetgeneralpop: TavernGetGeneralPop) => {
                    //         taverngetgeneralpop.init(this);
                    //         egret.Tween.get(taverngetgeneralpop.group1)
                    //             //.wait(500,false)
                    //             .call(() => {
                    //                 let info = new message.GoodsInfo();
                    //                 info.goodsId = generalId;
                    //                 taverngetgeneralpop.setInof(info);
                    //                 this.addChild(taverngetgeneralpop);
                    //             })
                    //             .to({ alpha: 1 }, 100)
                    //             .to({ y: 10 }, 150, egret.Ease.sineInOut)
                    //             .wait(300, false)
                    //             .to({ y: -10 }, 150, egret.Ease.sineInOut)
                    //             .wait(300, false)
                    //             .call(() => { taverngetgeneralpop.onGroupParent(); }) 
                    //             .call(() => {
                    //             }, this);
                    //     });
                }
            }
        };
        CommonGetGeneral.prototype.playHunterAnimation = function (dbName) {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", "0001_daiji", 0)
                .then(function (display) {
                if (dbName == "wj_032_xisuo") {
                }
                display.x = 50;
                display.y = 220;
                _this.groupHunterAnimation.addChild(display);
            });
        };
        CommonGetGeneral.prototype.playTipAnimation = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            egret.Tween.get(this.labelCloseTheTip, { loop: true })
                .to({ alpha: 1 }, 1000)
                .to({ alpha: 0 }, 1000);
        };
        CommonGetGeneral.prototype.playStarAnimation = function (current, total) {
            var _this = this;
            var callOneStar = function (index) {
                egret.Tween.get(_this["img" + index]).call(function () {
                    _this["img" + index].visible = true;
                }).to({ scaleX: 4, scaleY: 4 }, 0).
                    to({ scaleX: 0.9, scaleY: 0.9 }, 120).
                    to({ scaleX: 1.0, scaleY: 1.0 }, 100).
                    wait(index * 100 + 150).
                    call(function () {
                    _this.playStarAnimation(index + 1, total);
                });
            };
            var calGrade = function () {
                egret.Tween.get(_this.imgHunterLevel).call(function () {
                    _this.imgHunterLevel.visible = true;
                    zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                }).to({ scaleX: 5, scaleY: 5 }, 0).
                    to({ scaleX: 0.9, scaleY: 0.9 }, 150).
                    to({ scaleX: 1.0, scaleY: 1.0 }, 150);
            };
            if (current > total) {
                calGrade();
            }
            else {
                callOneStar(current);
            }
        };
        CommonGetGeneral.prototype.onClose = function () {
            if (this.callback)
                this.callback();
            this.close();
        };
        CommonGetGeneral.prototype.SoundOpen = function (id) {
            var sound = zj.TableClientSoundResource.Item(id);
            var textDrop = sound.sound_path;
            var strs = new Array();
            strs = textDrop.split("/");
            var soundtext = strs[2];
            soundtext = soundtext.replace('.', '_');
            return soundtext;
        };
        return CommonGetGeneral;
    }(zj.Dialog));
    zj.CommonGetGeneral = CommonGetGeneral;
    __reflect(CommonGetGeneral.prototype, "zj.CommonGetGeneral");
})(zj || (zj = {}));
//# sourceMappingURL=CommonGetGeneral.js.map