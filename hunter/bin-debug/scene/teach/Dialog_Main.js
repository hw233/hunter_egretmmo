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
     * 剧情对话
     * created by Lian Lei
     */
    var Dialog_Main = (function (_super) {
        __extends(Dialog_Main, _super);
        function Dialog_Main() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/teach/Dialog_MainSkin.exml";
            _this.init();
            return _this;
        }
        Dialog_Main.prototype.addEvent = function () {
            this.btnSkip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSkip, this);
            this.btnContinue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnContinue, this);
        };
        // 显示对话框
        Dialog_Main.prototype.showDialog = function (animation) {
            this.width = zj.UIManager.StageWidth;
            this.height = zj.UIManager.StageHeight;
            zj.Game.UIManager.GroupStory.addChild(this);
        };
        // 关闭对话框
        Dialog_Main.prototype.closeDialog = function (animation) {
            if (this.parent)
                this.parent.removeChild(this);
            zj.Game.UIManager.removeCacheResouce(this); // 移除UI缓存资源到待释放队列
            zj.Game.UIManager.GroupStory.removeChildren();
        };
        Dialog_Main.prototype.init = function () {
            this.dialogIndex = 1; // 数据索引
            this.groupLeft.alpha = 0;
            this.groupRight.alpha = 0;
            this.setInfo();
            this.DoActionsIn();
        };
        Dialog_Main.prototype.setInfo = function () {
            var _this = this;
            this.groupLeft.scaleX = 1;
            this.groupLeft.scaleY = 1;
            this.groupRight.scaleX = 1;
            this.groupRight.scaleY = 1;
            var headInfo = zj.StoryDialog.Dialog.tablePicCell[this.dialogIndex - 1];
            var textInfo = zj.StoryDialog.Dialog.tableContentCell[this.dialogIndex - 1];
            this.direction = textInfo.direction;
            if (this.direction == 0) {
                this.groupLeft.alpha = 1;
                this.groupRight.alpha = 0;
            }
            else if (this.direction == 1) {
                this.groupLeft.alpha = 0;
                this.groupRight.alpha = 1;
            }
            if (headInfo.spine == 10060) {
                this.imgLeftHand.visible = false;
                this.imgRightHand.visible = false;
                this.groupHeadLeft.removeChildren();
                this.groupHeadRight.removeChildren();
                var spineMap = zj.TableClientAniSpineSource.Table();
                var spineName = spineMap[10060].atlas; // 龙骨动画名
                var aniName = spineMap[10060].ani_name; // spine的动作名称
                if (this.direction == 0) {
                    zj.Game.DragonBonesManager.playAnimation(this, spineName, "armatureName", aniName, 0)
                        .then(function (display) {
                        // display.height = this.groupHeadLeft.height;
                        display.x = _this.groupHeadLeft.x + display.width / 3;
                        display.y = display.height + 10;
                        if (headInfo.flip != null && headInfo.flip == 1) {
                            display.scaleX = -1;
                        }
                        _this.groupHeadLeft.addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                }
                else if (this.direction == 1) {
                    zj.Game.DragonBonesManager.playAnimation(this, spineName, "armatureName", aniName, 0)
                        .then(function (display) {
                        // display.height = this.groupHeadRight.height;
                        display.x = _this.groupHeadRight.x + display.width / 3;
                        display.y = display.height + 10;
                        if (headInfo.flip != null && headInfo.flip == 1) {
                            display.scaleX = -1;
                        }
                        _this.groupHeadRight.addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                }
            }
            else {
                var ret = zj.TableMapRole.Item(headInfo.spine);
                if (ret != null) {
                    if (this.direction == 0) {
                        this.imgLeftHand.source = zj.cachekey(ret.half_path, this);
                        this.imgLeftHand.scaleX = ret.half_scale | 1;
                        if (headInfo.flip != null && headInfo.flip == 1) {
                            this.imgLeftHand.scaleX = 1;
                        }
                    }
                    else if (this.direction == 1) {
                        this.imgRightHand.source = zj.cachekey(ret.half_path, this);
                        this.imgRightHand.scaleX = ret.half_scale | 1;
                        if (headInfo.flip != null && headInfo.flip == 1) {
                            this.imgRightHand.scaleX = 1;
                        }
                    }
                }
            }
            if (this.direction == 0) {
                this.labelNameL.text = textInfo.name;
                this.lableContentL.textFlow = zj.Util.RichText(textInfo.content);
                this.groupAniL.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xinshou", "armatureName", 2, 0)
                    .then(function (display) {
                    display.x = _this.groupAniL.explicitWidth / 2;
                    display.y = _this.groupAniL.explicitHeight / 2;
                    _this.groupAniL.addChild(display);
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
            else if (this.direction == 1) {
                this.labelNameR.text = textInfo.name;
                this.lableContentR.textFlow = zj.Util.RichText(textInfo.content);
                this.groupAniR.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xinshou", "armatureName", 2, 0)
                    .then(function (display) {
                    display.x = _this.groupAniR.explicitWidth / 2;
                    display.y = _this.groupAniR.explicitHeight / 2;
                    _this.groupAniR.addChild(display);
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
        };
        Dialog_Main.prototype.DoActionsIn = function () {
            var _this = this;
            // if (this.direction == 0) {
            // 	this.groupLeft.alpha = 1;
            // 	this.groupRight.alpha = 0;
            // }
            // else if (this.direction == 1) {
            // 	this.groupLeft.alpha = 0;
            // 	this.groupRight.alpha = 1;
            // }
            this.groupLeft.alpha = 0;
            this.groupRight.alpha = 0;
            if (this.direction == 0) {
                egret.Tween.get(this.groupLeft)
                    .to({ x: 0 - this.groupLeft.width, alpha: 1 }, 0)
                    .to({ x: 0 }, 500, egret.Ease.backIn)
                    .wait(300)
                    .call(function () {
                    _this.addEvent();
                }, this);
            }
            else if (this.direction == 1) {
                egret.Tween.get(this.groupRight)
                    .to({ x: 0 + this.groupRight.width, alpha: 1 }, 0)
                    .to({ x: 0 }, 500, egret.Ease.backIn)
                    .wait(300)
                    .call(function () {
                    _this.addEvent();
                }, this);
            }
        };
        Dialog_Main.prototype.DoActionsOut = function () {
            var time = 8 / 45 * 1000;
        };
        Dialog_Main.prototype.onBtnSkip = function () {
            this.closeDialog();
            zj.Story.bFinish = true;
            zj.Teach.DoOperateTeach();
        };
        Dialog_Main.prototype.onBtnContinue = function () {
            if (this.dialogIndex >= zj.Game.PlayerMissionSystem.tableLength(zj.StoryDialog.Dialog.tableContentCell)) {
                this.closeDialog();
                console.log("-----------------------" + "关闭对话界面" + "----------------------");
                zj.Story.bFinish = true;
                zj.Teach.DoOperateTeach();
            }
            else {
                this.dialogIndex = this.dialogIndex + 1;
                zj.Story.bFinish = false;
                this.setInfo();
            }
        };
        return Dialog_Main;
    }(zj.Dialog));
    zj.Dialog_Main = Dialog_Main;
    __reflect(Dialog_Main.prototype, "zj.Dialog_Main");
})(zj || (zj = {}));
//# sourceMappingURL=Dialog_Main.js.map