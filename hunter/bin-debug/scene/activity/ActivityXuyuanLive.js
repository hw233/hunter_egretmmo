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
    //ActivityXuyuanLive
    // yuqingchao
    // 2019.05.09
    var ActivityXuyuanLive = (function (_super) {
        __extends(ActivityXuyuanLive, _super);
        function ActivityXuyuanLive() {
            var _this = _super.call(this) || this;
            _this.percent = null;
            _this.count = null;
            /**用于赋值奖励详情界面有利于界面移除 */
            _this.commonDesSkill = null;
            /**判断奖励详情界面是否已加载进界面 */
            _this.commonDesSkillvis = false;
            _this.touchID = 0;
            _this.displayAnimatoin = null; // 添加龙骨动画
            _this.skinName = "resource/skins/activity/ActivityXuyuanLiveSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.groupDown0.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroup0, _this);
            _this.groupDown1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroup1, _this);
            _this.groupDown2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroup2, _this);
            _this.groupDown3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroup3, _this);
            _this.groupDown4.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroup4, _this);
            _this.groupDown0.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin1, _this);
            _this.groupDown1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin2, _this);
            _this.groupDown2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin3, _this);
            _this.groupDown3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin4, _this);
            _this.groupDown4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin5, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                var displayAnimatoin = _this.displayAnimatoin;
                _this.displayAnimatoin = null;
                _this.father = null;
                if (displayAnimatoin && displayAnimatoin.parent) {
                    displayAnimatoin.parent.removeChild(displayAnimatoin);
                }
            }, null);
            return _this;
        }
        ActivityXuyuanLive.prototype.init = function (father) {
            this.father = father;
            this.rectMask = zj.Util.getMaskImgBlack(this.imgBar.width, this.imgBar.height);
            this.rectMask.verticalCenter = 0;
            this.rectMask.visible = false;
            this.groupBar.addChild(this.rectMask);
            var activityCount = 5;
            var xuyuanTbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.xuyuan_random + ".json"); //读表
            var len = Object.keys(xuyuanTbl).length;
            var index = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info % len;
            index = index == 0 && len || index;
            this.curTopicInfo = xuyuanTbl[index];
            for (var i = 0; i < activityCount; i++) {
                var itemSet = zj.PlayerItemSystem.Set(this.curTopicInfo.step_reward[i][0], 1, this.curTopicInfo.step_reward[i][1]);
                this["groupClip" + i].removeChildren();
                this["lbTag" + i].text = this.curTopicInfo.step_score[i];
                this["imgBag" + i].source = zj.cachekey(itemSet.Clip, this);
                this["imgFrame" + i].source = zj.cachekey(itemSet.Frame, this);
                this["imgGet" + i].visible = false;
                this["groupDown" + i].visible = true;
                this["lbNum" + i].text = this.curTopicInfo.step_reward[i][1];
            }
            for (var i = 0; i < 5; i++) {
                // Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", null, 0)
                // 	.then(display => {
                // 		this[`groupClip${i}`].addChild(display);
                // 	});
                this["groupClip" + i].removeChildren();
                this.displayAnimatoin = null;
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this["groupClip" + i]);
                this.touchID = i;
            }
            this.setInfoLive();
            this.setInfoScoreList();
        };
        //添加龙骨动画
        ActivityXuyuanLive.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2 + 1;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                _this.displayAnimatoin = display;
            })
                .catch(function (reason) {
            });
        };
        ActivityXuyuanLive.prototype.setInfoLive = function () {
            var _this = this;
            var score = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore;
            this.lbCount.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Egg_Random.score, score);
            var ratio = [20, 40, 60, 80, 100];
            var curKey = 4;
            for (var k in this.curTopicInfo.step_score) {
                var v = this.curTopicInfo.step_score[k];
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore < v) {
                    var num = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore;
                    curKey = Number(k);
                    break;
                }
            }
            var per = 1;
            if (curKey == 0) {
                per = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore / this.curTopicInfo.step_score[curKey] * 20;
                if (per > 100) {
                    per = 100;
                }
            }
            else {
                per = ratio[curKey - 1] + ((zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore - this.curTopicInfo.step_score[curKey - 1]) / (this.curTopicInfo.step_score[curKey] - this.curTopicInfo.step_score[curKey - 1])) * 20;
                if (per > 100) {
                    per = 100;
                }
            }
            this.count = this.curTopicInfo.step_score.length;
            this.rectMask.visible = true;
            this.percent = per / 100;
            this.rectMask.width = this.imgBar.width * per / 100;
            this.imgBar.mask = this.rectMask;
            for (var k in zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_freeZone) {
                var v = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_freeZone[k];
                this["imgGet" + v].visible = true;
            }
            var _loop_1 = function (i) {
                if ((this_1.percent * this_1.count) - 1 >= i) {
                    if (!this_1["imgGet" + i].visible) {
                        this_1["groupLight" + i].removeChildren();
                        zj.Game.DragonBonesManager.playAnimation(this_1, "ui_tongyong_lingqu", "armatureName", null, 0)
                            .then(function (display) {
                            _this["groupLight" + i].addChild(display);
                        });
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < 5; i++) {
                _loop_1(i);
            }
        };
        ActivityXuyuanLive.prototype.onGroup0 = function (e, i) {
            if (i === void 0) { i = 0; }
            this.setInfoButtonRewardClick(e, i);
        };
        ActivityXuyuanLive.prototype.onGroup1 = function (e, i) {
            if (i === void 0) { i = 1; }
            this.setInfoButtonRewardClick(e, i);
        };
        ActivityXuyuanLive.prototype.onGroup2 = function (e, i) {
            if (i === void 0) { i = 2; }
            this.setInfoButtonRewardClick(e, i);
        };
        ActivityXuyuanLive.prototype.onGroup3 = function (e, i) {
            if (i === void 0) { i = 3; }
            this.setInfoButtonRewardClick(e, i);
        };
        ActivityXuyuanLive.prototype.onGroup4 = function (e, i) {
            if (i === void 0) { i = 4; }
            this.setInfoButtonRewardClick(e, i);
        };
        ActivityXuyuanLive.prototype.setInfoButtonRewardClick = function (e, i) {
            var _this = this;
            if ((this.percent * this.count) - 1 >= i) {
                if (!this["imgGet" + i].visible) {
                    var hasBought = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_freeZone, function (k, v) {
                        return v == i;
                    });
                    this.xuyuanStepReqBody_Visit(i).then(function (data) {
                        if (data.header.result == 0) {
                            _this["groupLight" + i].removeChildren();
                            zj.loadUI(zj.CommonGetDialog)
                                .then(function (dialog) {
                                dialog.init(data.body.gameInfo.getGoods);
                                dialog.show();
                                dialog.setCB(function () { _this.setInfoLive(); });
                            });
                        }
                    });
                }
            }
        };
        ActivityXuyuanLive.prototype.setInfoScoreList = function () {
            var goods = [];
            for (var k in this.curTopicInfo.exchange_goods) {
                var v = this.curTopicInfo.exchange_goods[k];
                var good = new message.GoodsInfo();
                good.goodsId = v[0];
                good.count = v[1];
                goods.push(good);
            }
            var lcTbl = zj.Table.DeepCopy(goods);
            var fix = zj.PlayerItemSystem.FixCount(goods.length, 8, 4);
            for (var i = 0; i < fix; i++) {
                var good = new message.GoodsInfo();
                good.goodsId = 0;
                good.count = 0;
                goods.push(good);
            }
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < goods.length; i++) {
                this.arrayCollection.addItem({
                    i: i,
                    info: goods[i],
                    father: this,
                });
            }
            this.lstViewTask.dataProvider = this.arrayCollection;
            this.lstViewTask.itemRenderer = zj.ActivityXuyuanLiveItem;
            this.refreshScoreList();
        };
        ActivityXuyuanLive.prototype.refreshScoreList = function () {
            var curScore = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore;
            this.lbCore.text = curScore.toString();
        };
        ActivityXuyuanLive.prototype.onBtnClose = function () {
            this.father.OnAbovePop();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        ActivityXuyuanLive.prototype.xuyuanStepReqBody_Visit = function (step_id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.XuyuanStepRewardRequest();
                request.body.step_id = step_id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        console.log(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
                return;
            });
        };
        ActivityXuyuanLive.prototype.onTouchBegin1 = function (e) {
            this.onChooseItemTap(e, 0);
        };
        ActivityXuyuanLive.prototype.onTouchBegin2 = function (e) {
            this.onChooseItemTap(e, 1);
        };
        ActivityXuyuanLive.prototype.onTouchBegin3 = function (e) {
            this.onChooseItemTap(e, 2);
        };
        ActivityXuyuanLive.prototype.onTouchBegin4 = function (e) {
            this.onChooseItemTap(e, 3);
        };
        ActivityXuyuanLive.prototype.onTouchBegin5 = function (e) {
            this.onChooseItemTap(e, 4);
        };
        // 鼠标点击 掉落 材料说明
        ActivityXuyuanLive.prototype.onChooseItemTap = function (e, i) {
            var info = new message.GoodsInfo();
            info.goodsId = this.curTopicInfo.step_reward[i][0];
            info.count = this.curTopicInfo.step_reward[i][1];
            this.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
        };
        /**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
        ActivityXuyuanLive.prototype.up = function () {
            if (this.commonDesSkillvis == true) {
                this.removeChild(this.commonDesSkill);
                this.commonDesSkillvis = false;
            }
        };
        /**奖励详情 */
        ActivityXuyuanLive.prototype.awardParticulars = function (xy, cx, cy, info) {
            this.commonDesSkill = zj.TipManager.ShowProp(info, this, xy, cx, cy);
            this.addChild(this.commonDesSkill);
            this.commonDesSkillvis = true;
        };
        return ActivityXuyuanLive;
    }(zj.Dialog));
    zj.ActivityXuyuanLive = ActivityXuyuanLive;
    __reflect(ActivityXuyuanLive.prototype, "zj.ActivityXuyuanLive");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityXuyuanLive.js.map