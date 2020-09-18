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
     * 演示关动画
     * created by Lian Lei
     * 2019.05.09
     */
    var Common_Animation = (function (_super) {
        __extends(Common_Animation, _super);
        function Common_Animation() {
            var _this = _super.call(this) || this;
            /**效果淡出淡入最小时间 */
            _this.Fade_Min = 500;
            _this.pic = [];
            _this.isPlot = false;
            _this.skinName = "resource/skins/common/Common_AnimationBSkin.exml";
            _this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnExit, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
            _this.init();
            return _this;
        }
        Common_Animation.prototype.init = function () {
            this.picIndex = 0;
            this.aniIndex = 1;
            this.ani_end = false;
            this.pic = [this.imgBG, this.imgBGB];
            this.tblAni = zj.TableClientTeachCartoon.Table();
            this.maxIndex = zj.Game.PlayerMissionSystem.tableLength(this.tblAni);
        };
        Common_Animation.prototype.onAddedToStage = function () {
            zj.Game.SoundManager.playMusic("demon_mp3", 0);
        };
        Common_Animation.prototype.LoadAni = function (index, cb) {
            this.index = index;
            this.init_ani_index = 1;
            this.max_ani_index = 1;
            this.callBack = cb;
            this.btnExit.visible = true;
            this.btnExit.alpha = 1;
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.pic); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                v.alpha = 0;
            }
            for (var _c = 0, _d = zj.HelpUtil.GetKV(this.tblAni); _c < _d.length; _c++) {
                var _e = _d[_c], k = _e[0], v = _e[1];
                if (v.graph == index) {
                    this.aniIndex = Number(k);
                    break;
                }
            }
            for (var _f = 0, _g = zj.HelpUtil.GetKV(this.tblAni); _f < _g.length; _f++) {
                var _h = _g[_f], k = _h[0], v = _h[1];
                if (v.graph == index) {
                    this.max_ani_index = Number(k);
                }
            }
            this.init_ani_index = this.aniIndex;
            this.labelTip.alpha = 0;
            this.groupUI.alpha = 0;
            this.SetPicAniMation();
        };
        Common_Animation.prototype.SetPicIndex = function () {
            this.picIndex = this.picIndex == 0 ? 1 : 0;
        };
        Common_Animation.prototype.SetPicAniMation = function () {
            var _this = this;
            this.pic[this.picIndex].source = zj.cachekey(this.tblAni[this.aniIndex].pic_path + "_jpg", this);
            var rect = { x: this.pic[this.picIndex].x, y: this.pic[this.picIndex].y, height: this.pic[this.picIndex].height, width: this.pic[this.picIndex].width, };
            var x = 0;
            var y = 0;
            var end_x = 0;
            var end_y = 0;
            var pic_time = this.tblAni[this.aniIndex].pic_time;
            var pic_speed = this.tblAni[this.aniIndex].pic_speed;
            // 第一次时间延迟
            var first_delay = this.aniIndex == 1 ? 0 : 0;
            // 图片淡入时间
            var fadeInTime = this.tblAni[this.aniIndex].pic_opacity_time1;
            // 图片淡出时间
            this.fadeOutTime = this.tblAni[this.aniIndex].pic_opacity_time2;
            this.fadeOutTime = pic_time - fadeInTime >= this.Fade_Min ? this.fadeOutTime : pic_time - fadeInTime;
            // 图片淡出延迟时间
            var fadeOutDelay = pic_time - this.fadeOutTime;
            var opacity = this.tblAni[this.aniIndex].pic_opacity >= 255 ? 120 : this.tblAni[this.aniIndex].pic_opacity;
            // 文字延迟时间
            var text_delayTime = this.tblAni[this.aniIndex].text_delayTime > pic_time ? 0 : this.tblAni[this.aniIndex].text_delayTime;
            // 文字淡入时间
            var text_fadeInTime = this.Fade_Min;
            // 文字淡出时间
            var text_fadeOutTime = this.Fade_Min;
            // 文字淡出延迟时间
            var text_delayTime2 = pic_time - this.fadeOutTime - text_fadeOutTime;
            var str = this.tblAni[this.aniIndex].text_info == null ? "" : this.tblAni[this.aniIndex].text_info;
            this.labelTip.text = str;
            var rate = zj.UIManager.StageHeight / rect.height;
            this.pic[this.picIndex].height *= rate;
            this.pic[this.picIndex].width *= rate;
            if (this.picIndex % 2 == 0) {
                x = -(this.pic[this.picIndex].width - zj.UIManager.StageWidth);
                y = 0;
                end_x = 0;
                end_y = 0;
            }
            else {
                x = 0;
                y = 0;
                end_x = -(this.pic[this.picIndex].width - zj.UIManager.StageWidth);
                end_y = 0;
            }
            this.pic[this.picIndex].x = x;
            this.pic[this.picIndex].y = y;
            if (this.aniIndex != this.init_ani_index) {
                this.pic[this.picIndex].alpha = Math.floor(opacity / 255);
            }
            egret.Tween.get(this.labelTip).wait(1000).to({ alpha: 1 }, 3000).wait(3000).to({ alpha: this.aniIndex == this.max_ani_index ? 0.5 : 0 }, 3000);
            // egret.Tween.removeTweens(this.pic[this.picIndex]);
            var tween = egret.Tween.get(this.pic[this.picIndex]);
            tween.wait(first_delay * 400)
                .call(function () {
                if (_this.aniIndex == _this.init_ani_index) {
                    egret.Tween.get(_this.groupUI)
                        .wait(first_delay * 600)
                        .to({ alpha: 1 }, fadeInTime * 1000);
                }
            })
                .to({ alpha: 1 }, fadeInTime * 600)
                .to({ x: end_x, y: end_y }, pic_time * 800)
                .wait(fadeOutDelay * 600)
                .to({ alpha: this.aniIndex == this.max_ani_index ? 0.5 : 0 }, this.fadeOutTime * 600)
                .call(function () {
                // if (this.aniCallBack1(() => { tween.play(); })) {
                // 	tween.pause();
                // }
            })
                .wait(this.fadeOutTime)
                .call(function () {
                if (_this.aniIndex != _this.max_ani_index && _this.tblAni[_this.aniIndex + 1].graph == _this.index) {
                    _this.aniIndex = _this.aniIndex + 1;
                    egret.Tween.removeTweens(_this.pic[_this.picIndex]);
                    _this.SetPicIndex();
                    _this.SetPicAniMation();
                }
                else {
                    egret.Tween.removeTweens(_this.pic[_this.picIndex]);
                    egret.Tween.removeTweens(_this.groupUI);
                    egret.Tween.get(_this.groupUI).to({ alpha: 0.5 }, 500).wait(200).call(function () {
                        _this.aniCallback2();
                    });
                    egret.Tween.removeTweens(_this.rectTop);
                    egret.Tween.get(_this.rectTop).to({ alpha: 0.5 }, 500).wait(200).call(function () {
                        // this.aniCallback2();
                    });
                    egret.Tween.removeTweens(_this.btnExit);
                    egret.Tween.get(_this.btnExit).to({ alpha: 0.5 }, 500).wait(200).call(function () {
                        // this.aniCallback2();
                    });
                    _this.btnExit.visible = false;
                }
            });
        };
        Common_Animation.prototype.onBtnExit = function () {
            var _this = this;
            this.btnExit.visible = false;
            // egret.Tween.removeAllTweens();
            zj.Game.UIManager.removeTweenAll();
            egret.Tween.get(this.pic[this.picIndex])
                .to({ alpha: 0.5 }, 500)
                .call(function () {
                _this.InstanceAreaCallBack();
                // 去掉演示关特殊处理
                zj.Game.TeachSystem.isEndCommonAnimation = true; // 去掉演示关特殊处理
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true }); // 去掉演示关特殊处理
            })
                .wait(500)
                .call(function () {
                egret.Tween.removeTweens(_this.pic[_this.picIndex]);
                egret.Tween.get(_this.groupUI).to({ alpha: 0.5 }, 500).wait(400).call(function () {
                    egret.Tween.removeTweens(_this.groupUI);
                    _this.aniCallback2();
                });
            });
            egret.Tween.removeTweens(this.labelTip);
            egret.Tween.get(this.labelTip).to({ alpha: 0.5 }, 500).call(function () {
                egret.Tween.removeTweens(_this.labelTip);
            });
        };
        Common_Animation.prototype.InstanceAreaCallBack = function () {
            // if (this.index == 2) {
            // 	let scene = StageSceneManager.Instance.GetCurScene();
            // 	scene.bEnd = true;
            // }
        };
        Common_Animation.prototype.aniCallBack1 = function (callbackPlot) {
            // if (this.aniIndex == this.max_ani_index && this.index == 1) {
            // 	egret.Tween.get(this.groupUI)
            // 		.to({ alpha: 0.5 }, 500);
            // 	this.btnExit.visible = false;
            // 	let scene = StageSceneManager.Instance.GetCurScene();
            // 	// scene.bEnd = true;
            // }
        };
        Common_Animation.prototype.aniCallback2 = function () {
            // if (this.index == 2) {
            var _this = this;
            // }
            // else {
            // 	// Helper.PlaybgmByID(100006);
            // 	// let scene = StageSceneManager.Instance.GetCurScene();
            // 	// scene.bMp4 = false;
            // 	if (this.callBack != null) {
            // 		this.callBack();
            // 	}
            // 	Game.TeachSystem.isEndCommonAnimation = true;// 去掉演示关特殊处理
            // 	Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });// 去掉演示关特殊处理
            // 	// Game.EventManager.event(GameEvent.OPEN_LOGING_SCENE);
            // 	// Game.EventManager.event(GameEvent.LOGING_SCENE_PROGRESS, 1);
            // 	//this.close();
            // }
            if (this.isPlot) {
                this.close();
                // egret.Tween.removeAllTweens();
                zj.Game.UIManager.removeTweenAll();
                if (this.callBack != null)
                    this.callBack();
                zj.Game.TeachSystem.isEndCommonAnimation = true; // 去掉演示关特殊处理
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true }); // 去掉演示关特殊处理
                return;
            }
            else {
                zj.loadUI(zj.Dialog_InstanceArea).then(function (dialog) {
                    dialog.show();
                    dialog.cloudAni(function () {
                        zj.Story.playStory(100000, 1, function () {
                            dialog.close();
                            _this.isPlot = true;
                            zj.Story.bFinish = false;
                            _this.LoadAni(1001, function () {
                                // egret.Tween.removeAllTweens();
                                zj.Game.UIManager.removeTweenAll();
                                zj.Game.TeachSystem.init();
                                zj.Teach.SetTeachPart(zj.teachBattle.teachPart); // 去掉演示关特殊处理
                                zj.Game.SoundManager.pauseMusic();
                            });
                        }, _this);
                    });
                });
            }
        };
        return Common_Animation;
    }(zj.Dialog));
    zj.Common_Animation = Common_Animation;
    __reflect(Common_Animation.prototype, "zj.Common_Animation");
})(zj || (zj = {}));
//# sourceMappingURL=Common_Animation.js.map