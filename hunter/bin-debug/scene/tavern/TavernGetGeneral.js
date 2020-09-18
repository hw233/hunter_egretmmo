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
    //TavernGetGeneral
    //hexiaowei
    // 2018/11/15
    var TavernGetGeneral = (function (_super) {
        __extends(TavernGetGeneral, _super);
        function TavernGetGeneral() {
            var _this = _super.call(this) || this;
            _this.num = 0;
            /**判断是否是从合成点进来 */
            _this.vis = false;
            _this.skinName = "resource/skins/tavern/TavernGetGeneralSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.labelCloseTheTip); // 因为是循环播放，需要特别处理
                egret.Tween.removeTweens(_this);
            }, null);
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            //this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClose, this);
            _this.groupParent.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupParent, _this);
            zj.Game.DragonBonesManager.playAnimation(_this, "ui_jiuguan_zhaomu", "armatureName", null, 0)
                .then(function (display) {
                display.x = zj.UIManager.StageWidth / 2;
                display.y = zj.UIManager.StageHeight / 2;
                _this.groupParent.addChild(display);
                //this.addAnimatoinnew("ui_jiuguan_zhaomu");
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            _this.image1.visible = false;
            _this.image2.visible = false;
            _this.image3.visible = false;
            _this.image4.visible = false;
            _this.imageHunLevel.visible = false;
            //点击任意区域关闭
            egret.Tween.get(_this.labelCloseTheTip, { loop: true })
                .to({ alpha: 1 }, 1000)
                .to({ alpha: 0 }, 1000);
            return _this;
            //this.SetInfoAni(this.init_star);
        }
        TavernGetGeneral.prototype.init = function (tavern) {
            zj.Game.SoundManager.playEffect(this.SoundOpen(30012), 100);
            this.tavern = tavern;
        };
        TavernGetGeneral.prototype.info = function (dbName, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", armatureName, 0)
                .then(function (display) {
                display.x = 50;
                display.y = 220;
                _this.groupHunterAnimation.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        TavernGetGeneral.prototype.setInfo = function (heroId, type, num, vis, cb) {
            this.goodid = heroId;
            this.type = type;
            this.num = num;
            this.callBack = cb;
            if (vis != null) {
                this.vis = vis;
            }
            var infonew = zj.PlayerHunterSystem.Table(heroId);
            var general_roleId = zj.PlayerHunterSystem.Table(heroId).general_roleId;
            var body_spx_id = zj.PlayerHunterSystem.MapInstance(general_roleId).body_spx_id;
            var animationUrl = zj.TableClientFightAniSpineSource.Item(body_spx_id).json;
            var strs = new Array();
            strs = animationUrl.split("/");
            var animationPracticalUrl = strs[strs.length - 1].split(".")[0];
            //let animationPracticalUrl ="wj_004_kaite";
            //this.info(animationPracticalUrl)
            this.info(animationPracticalUrl, "0001_daiji");
            //猎人头像
            //let head_path=PlayerHunterSystem.MapInstance(general_roleId).head_path;
            this.imageHunTypes.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_type3[zj.PlayerHunterSystem.Table(heroId).features], this);
            var aptitude = zj.PlayerHunterSystem.Table(heroId).aptitude;
            this.imageHunLevel.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[aptitude], this); //品级（A-S）
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                this.imageHunName.source = zj.cachekey("wx_" + infonew.name_pic, this);
            }
            else {
                this.imageHunName.source = zj.cachekey(infonew.name_pic, this);
            }
            this.init_star = infonew.init_star; //初始星级
            var pingzhi = infonew.init_quality; //初始品质
            this.labelHunExplain.text = infonew.extra;
            var roleId = zj.PlayerHunterSystem.Table(heroId).general_roleId;
            var path = zj.PlayerHunterSystem.MapInstance(roleId).half_path;
            this.imageHun.source = zj.cachekey(path, this);
            this.setInfoAnitest(infonew.init_star);
            var generalTbl = zj.PlayerHunterSystem.Table(heroId).general_roleId;
            var soundnum = zj.TableMapRole.Item(generalTbl).taici_dub_sound;
            // Game.SoundManager.playMusic(this.SoundOpen(soundnum) , 1);
            zj.Game.SoundManager.playEffect(this.SoundOpen(soundnum), 250);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                this.imageBg.source = zj.cachekey("wx_ui_tavern_BoardGetHunter_png", this);
            }
        };
        TavernGetGeneral.prototype.setInfoAnitest = function (num) {
            var _this = this;
            var _loop_1 = function (i) {
                egret.Tween.get(this_1)
                    .wait(300 * i, true)
                    .call(function () {
                    if (i == num + 1) {
                        _this.imageHunLevel.visible = true;
                        zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                    }
                    else {
                        _this["image" + i].visible = true;
                    }
                });
            };
            var this_1 = this;
            for (var i = 1; i <= num + 1; i++) {
                _loop_1(i);
            }
            /*
            egret.Tween.get(this)
                    .wait(1000*num,true)
                    .call(()=>{ this.imageHunLevel.visible=true; })
            */
        };
        TavernGetGeneral.prototype.setInfoAni = function (num) {
            var _this = this;
            var _loop_2 = function (i) {
                egret.Tween.get(this_2)
                    .wait(1000 * i, true)
                    .call(function () { _this["image" + i].visible = true; });
            };
            var this_2 = this;
            for (var i = 1; i <= num; i++) {
                _loop_2(i);
            }
        };
        TavernGetGeneral.prototype.onGroupParent = function () {
            //this.tavern.removeChild(this);
            if (this.vis == false) {
                this.close();
                if (this.callBack) {
                    this.callBack();
                }
                var goodid = this.goodid;
                if (this.num != null) {
                    this.tavern.onEarnPointOne(goodid, this.type, this.num);
                }
                else {
                    this.tavern.onEarnPoint(2, goodid, this.type, this.num);
                }
            }
            else {
                this.close(zj.UI.HIDE_TRAIL_OFF); //从大变小
                if (this.callBack) {
                    this.callBack();
                }
            }
        };
        TavernGetGeneral.prototype.SoundOpen = function (id) {
            var sound = zj.TableClientSoundResource.Item(id);
            var textDrop = sound.sound_path;
            var strs = new Array();
            strs = textDrop.split("/");
            var soundtext = strs[2];
            soundtext = soundtext.replace('.', '_');
            return soundtext;
        };
        TavernGetGeneral.prototype.onClose = function () {
            this.close();
        };
        return TavernGetGeneral;
    }(zj.UI));
    zj.TavernGetGeneral = TavernGetGeneral;
    __reflect(TavernGetGeneral.prototype, "zj.TavernGetGeneral");
})(zj || (zj = {}));
//# sourceMappingURL=TavernGetGeneral.js.map