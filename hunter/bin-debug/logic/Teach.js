var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * 新手引导
     * created by Lian Lei
     * 2019.03.24
     */
    var Teach = (function () {
        function Teach() {
            this._ID_ZHAOYUN = 10001;
            this._ID_DIAOCHAN = 10003;
            this._ID_MACHAO = 10010;
            this._ID_HUATUO = 10016;
        }
        Teach._reuse_button = function (node, force, bDialog, bBtnEnabled, index, opacity, bmirror, moveXHalf, isHideMask, isClickAnyWherw, scale) {
            if (scale === void 0) { scale = [1, 1]; }
            var _a = [0, 0, 0, 0], x = _a[0], y = _a[1], w = _a[2], h = _a[3];
            x = Math.floor(node.localToGlobal().x - zj.Game.UIManager.x);
            w = Math.floor(node.width * scale[0]);
            y = Math.floor(node.localToGlobal().y - zj.Game.UIManager.y);
            h = Math.floor(node.height * scale[1]);
            if (w == 0 || h == 0) {
                console.log("——————————————————新手引导选中区域:  " + "return " + "w: " + w + " " + "h: " + h + " " + "——————————————————————");
                Teach.reloadTeach();
                return;
            }
            if (this.origChild == null)
                this.origChild = node;
            console.log("——————————————————新手引导选中区域:  " + "goon " + "x: " + x + " " + "y: " + y + " " + "w: " + w + " " + "h: " + h + "" + "——————————————————————");
            this.setTouchTipSprite(x, y, w, h, force, bDialog, bBtnEnabled, index, opacity, bmirror, moveXHalf, isClickAnyWherw);
            this.reloadCount = 0;
            this.setStopTeachUpdata(true);
            if (force != false)
                this.setTeaching(true);
            if (isHideMask)
                Teach.removeMask();
            if (!isHideMask)
                Teach.addMask();
        };
        Teach.reloadTeach = function () {
            if (Teach.reloadCount < 10) {
                Teach.reloadCount++;
                console.log("+++++++++++++++++++新手引导等待次数+++++++++++++++++" + Teach.reloadCount);
                egret.setTimeout(function () { Teach.DoOperateTeach(); }, this, Teach.waitTimer);
            }
            else {
                Teach.reloadCount = 0;
                Teach.delTouchTipSpx();
                Teach.removeMask();
            }
        };
        Teach._reuse_rect = function (rect, force, bDialog, bBtnEnabled, index, opacity, bmirror, moveXHalf, isHideMask, isClickAnyWhere) {
            this.setTouchTipSprite(rect.x, rect.y, rect.width, rect.height, force, bDialog, bBtnEnabled, index, opacity, bmirror, moveXHalf, isClickAnyWhere);
            this.setStopTeachUpdata(true);
            if (force != false)
                this.setTeaching(true);
            if (isHideMask)
                Teach.removeMask();
            if (!isHideMask)
                Teach.addMask();
        };
        /**微调 */
        Teach._reuse_ajust = function (rctNode, deltaX, deltaY, deltaW, deltaH, zNode) {
            var dtX = deltaX != null ? deltaX : 0;
            var dtY = deltaY != null ? deltaY : 0;
            var dtW = deltaW != null ? deltaW : 0;
            var dtH = deltaH != null ? deltaH : 0;
            var x = rctNode.localToGlobal().x - zj.Game.UIManager.x;
            var y = rctNode.localToGlobal().y;
            var w = rctNode.width;
            var h = rctNode.height;
            if (zNode != null) {
                this.origChild = rctNode;
            }
            else {
                this.origChild = zNode;
            }
            this._reuse_rect(rctNode);
        };
        /**判断是否进入教学 */
        Teach.isTeach = function (nodeID) {
            var _teach = zj.TableTeach.Table();
            var len = zj.TableTeach.tableLength; //zj.Game.PlayerMissionSystem.tableLength(_teach);
            for (var i = 1; i <= len; i++) {
                if ((this.isDone(_teach[i].part) == false && this.isDone2(_teach[i].part) == false) && this.teachConditionsByIndex(nodeID, i)) {
                    return _teach[i].part;
                }
            }
            return -1;
        };
        /**
         * 教学是否已经完成了(服务器保存)
         * @param part {number} 新手引导任务ID
         */
        Teach.isDone = function (part) {
            var len = this.nServerPart.length;
            for (var i = 0; i < len; i++) {
                if (this.nServerPart[i].part == part) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 教学是否已经完成(前端保存)
         */
        Teach.isDone2 = function (part) {
            var len = this.nServerPartLocal.length;
            for (var i = 0; i < len; i++) {
                this.LastTeach = this.nServerPartLocal[i].part;
                if (this.nServerPartLocal[i].part == part && Teach.LastTeach == part) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 判断教学步骤是否满足条件
         * @param nodeID {number} 教学步骤ID
         * @param index {number}
         */
        Teach.teachConditionsByIndex = function (nodeID, index) {
            // let _teach: { [key: string]: TableTeach } = TableTeach.Table();
            // // let condition = TableTeach.Item(index).condition;
            // let condition = TeachCondition.condition(index);
            // let stringValue = `return` + condition;
            // TeachCondition.nodeID = nodeID;
            // let ret = condition;
            // if (ret != true) ret = false;
            // return ret;
            zj.TableTeach.Table();
            zj.TeachCondition.nodeID = nodeID;
            if (zj.TeachCondition.condition(index) == true) {
                return true;
            }
            return false;
        };
        Teach.getDialogContent = function (idx) {
            return zj.StringConfig_Teach[idx];
        };
        Teach.getTranByIdx = function (idx_) {
            var temp = idx_ % 10;
            var trans = 0;
            if (temp == 0 || temp == 6 || temp == 7 || temp == 8 || temp == 9) {
                trans = 0.25;
            }
            else if (temp == 1) {
                trans = 0.3;
            }
            else if (temp == 2 || temp == 3) {
                trans = 0.35;
            }
            else if (temp == 4) {
                trans = 0.32;
            }
            else if (temp == 5) {
                trans = 0.28;
            }
            return trans;
        };
        Teach.setTouchTipSpriteVisible = function (b) {
            for (var _i = 0, _a = zj.HelpUtil.GetKV(zj.ConstantConfig_Teach.Tag); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                var str = v + "";
                var node = zj.Game.UIManager.GroupTeachUI.getChildByName(str);
                if (node)
                    node.visible = b;
            }
        };
        /**
         * 新手引导指引指定区域点击
         * @param x           {number}      指定区域x
         * @param y           {number}      指定区域y
         * @param w           {number}      指定区域width
         * @param h           {number}      指定区域height
         * @param force       {boolean}     [true]  [是否强制引导，现在无用，一般传true]
         * @param bDialog     {boolean}     [true]  [是否有对话提示]
         * @param bBtnEnabled {boolean}     [false] [最外层的按钮是否可用，可用的时候会屏蔽界面原按钮]
         * @param index       {number}      [0]     [动画序号]
         * @param opacity     {number}      [140]   [透明度]
         * @param bmirror     {boolean}     [false] 小手动画是否翻转
         * @param moveXHalf   {moveXHalf}   [false] 小手动画是否移动
         */
        Teach.setTouchTipSprite = function (x, y, w, h, force, bDialog, bBtnEnabled, index, opacity, bmirror, moveXHalf, isClickAnyWhere) {
            if (isClickAnyWhere == null)
                isClickAnyWhere = true;
            var _bDialog = true;
            var _bBtnEnabled = false;
            var _index = 0;
            if (bDialog != null)
                _bDialog = bDialog;
            if (bBtnEnabled != null)
                _bBtnEnabled = bBtnEnabled;
            if (index != null)
                _index = index;
            var childStrName = (zj.ConstantConfig_Teach.Tag.SpxHand).toString();
            var hand = zj.Game.UIManager.GroupTeachUI.getChildByName(childStrName);
            if (hand != null)
                zj.Game.UIManager.GroupTeachUI.removeChild(hand);
            var lft_ = Math.floor(x);
            var rgt_ = Math.floor(x + w);
            var top_ = Math.floor(y + h);
            var bom_ = Math.floor(y);
            var scrw_ = Math.floor(zj.UIManager.StageWidth);
            var scrh_ = Math.floor(zj.UIManager.StageHeight);
            if (opacity == null)
                opacity = zj.ConstantConfig_Teach.LayerOpacity;
            if (force == null || force == true) {
                // 上
                var layer = new eui.Rect();
                layer.anchorOffsetX = 0;
                layer.anchorOffsetY = 0;
                layer.x = 0;
                layer.y = top_;
                layer.width = scrw_;
                layer.height = scrh_;
                layer.alpha = opacity;
                zj.Game.UIManager.pushTeachUI(layer);
                layer.name = (zj.ConstantConfig_Teach.Tag.LayerUp).toString();
                // 左
                var layer1 = new eui.Rect();
                layer1.anchorOffsetX = 0;
                layer1.anchorOffsetY = 0;
                layer1.x = 0;
                layer1.y = bom_;
                layer1.width = lft_;
                // layer1.height = scrh_;
                layer1.height = h;
                layer1.alpha = opacity;
                zj.Game.UIManager.pushTeachUI(layer1);
                layer1.name = (zj.ConstantConfig_Teach.Tag.LayerLeft).toString();
                // 右
                var layer2 = new eui.Rect();
                layer2.anchorOffsetX = 0;
                layer2.anchorOffsetY = 0;
                layer2.x = rgt_;
                layer2.y = bom_;
                layer2.width = scrw_ - rgt_;
                layer2.height = h;
                layer2.alpha = opacity;
                zj.Game.UIManager.pushTeachUI(layer2);
                layer2.name = (zj.ConstantConfig_Teach.Tag.LayerLeft).toString();
                // 下
                var layer3 = new eui.Rect();
                layer3.anchorOffsetX = 0;
                layer3.anchorOffsetY = 0;
                layer3.x = 0;
                layer3.y = 0;
                layer3.width = scrw_;
                layer3.height = bom_;
                layer3.alpha = opacity;
                zj.Game.UIManager.pushTeachUI(layer3);
                layer3.name = (zj.ConstantConfig_Teach.Tag.LayerLeft).toString();
                this.bAutoVisible = false;
                this.setTouchTipSpriteVisible(true);
                if (index == 0 && zj.Game.TeachSystem.curPart != 6001 && zj.Game.TeachSystem.curPart != 6003 && isClickAnyWhere) {
                    layer.once(egret.TouchEvent.TOUCH_TAP, function () {
                        Teach.addOperateTeachStep();
                    }, this);
                    layer1.once(egret.TouchEvent.TOUCH_TAP, function () {
                        Teach.addOperateTeachStep();
                    }, this);
                    layer2.once(egret.TouchEvent.TOUCH_TAP, function () {
                        Teach.addOperateTeachStep();
                    }, this);
                    layer3.once(egret.TouchEvent.TOUCH_TAP, function () {
                        Teach.addOperateTeachStep();
                    }, this);
                }
            }
            else {
                this.setTouchTipSpriteVisible(false);
                this.bAutoVisible = true;
            }
            if (_index >= 1 && _index <= 2) {
                // inedx == 0 聚焦框动画
                // inedx == 1 手点击动画
                // index == 2 剧情下一句动画
                var ani = zj.Game.UIManager.GroupTeachUI.getChildByName(childStrName);
                if (ani != null)
                    zj.Game.UIManager.GroupTeachUI.removeChild(ani);
                var newHand = function (_x, _y, _w, _h) {
                    var currPart = zj.Game.TeachSystem.curPart;
                    var currId = Teach.nOperateTeachStep;
                    if (Teach.hand) {
                        zj.Game.UIManager.GroupTeachHand.removeChildren();
                        Teach.hand = null;
                    }
                    zj.Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", index, 0).then(function (display) {
                        if (currPart == zj.Game.TeachSystem.curPart && currId == Teach.nOperateTeachStep) {
                            if (Teach.hand)
                                Teach.hand = null;
                            display.touchEnabled = false;
                            Teach.hand = display;
                            Teach.hand.name = childStrName;
                            Teach.hand.x = _x + _w / 2;
                            Teach.hand.y = _y + _h / 2;
                            Teach.hand.touchEnabled = false;
                            zj.Game.UIManager.GroupTeachHand.addChild(Teach.hand);
                            Teach.hand.visible = true;
                        }
                        else {
                            zj.clearSpine(display);
                        }
                    });
                };
                newHand(x, y, w, h);
            }
            else {
                // 代码拼接的动画，矩形聚焦
                // 3:只有矩形聚焦，有手点击
                // 0:矩形聚焦，无手点击
                var ani = zj.Game.UIManager.GroupTeachUI.getChildByName(childStrName);
                if (ani != null)
                    zj.Game.UIManager.GroupTeachUI.removeChild(ani);
                var bHand = _index == 3;
                hand = zj.Game.TeachSystem.getAniFocus(w, h, bHand);
                zj.Game.UIManager.pushTeachUI(hand);
                hand.name = childStrName;
                hand.x = x + w / 2;
                hand.y = y + h / 2;
                hand.touchEnabled = false;
            }
            if (bmirror) {
                hand.scaleX = -1;
            }
            var _getNodePos = function (node, x, y, w, h, index) {
                if (index == null)
                    index = 0;
                var xRet = 0;
                var yRet = 0;
                var size = { width: node.width, height: node.height };
                if (index == 0 || index == 2) {
                    // 点击指引
                    if (x - size.width >= 0) {
                        // 左侧可以放下
                        xRet = x - size.width;
                    }
                    else {
                        // 贴屏幕左侧
                        xRet = 0;
                    }
                    if (y + h + size.height <= zj.UIManager.StageHeight) {
                        // 上方可以放下
                        yRet = y + h;
                    }
                    else if (y - size.height >= 0) {
                        // 下方能放下
                        yRet = y - size.height;
                    }
                    else {
                        yRet = 0;
                    }
                }
                else {
                    // 关注指引
                    if (x - size.width >= 0) {
                        // 左侧能放下
                        xRet = x - size.width;
                        if (y + h <= zj.UIManager.StageHeight) {
                            // 正左偏上
                            yRet = y + h - size.height;
                            if (yRet < 0) {
                                yRet = 0;
                            }
                        }
                        else {
                            // 正左贴屏幕上方
                            yRet = zj.UIManager.StageHeight - size.height;
                        }
                    }
                    else {
                        // 左侧放不下 贴屏幕左侧
                        xRet = 0;
                        if (y + h + size.height <= zj.UIManager.StageHeight) {
                            // 左上方
                            yRet = y + h;
                        }
                        else if (y - size.height >= 0) {
                            // 左下方
                            yRet = y - size.height;
                        }
                        else {
                            // 左下贴屏幕下方
                            yRet = 0;
                        }
                    }
                }
                return [xRet, yRet];
            };
            var name = zj.Game.TeachSystem.curPart;
            var ext = Teach.nOperateTeachStep;
            var _isHaveTip = function () {
                return zj.StoryDialog.getItemTip(name, ext);
                // // 检验table
                // let tabelStory: { [key: string]: TableClientStory } = TableClientStory.Table();
                // let ret: boolean = false;
                // if (tabelStory[name] != null) {
                //     ret = true;
                // }
                // // 检验文件是否存在
                // let fileStatus: boolean;
                // let funcStatus: boolean;
                // if (ret == true) {
                //     if (("story_" + name) in zj) fileStatus = true;
                //     if (fileStatus == true) {
                //         if (("tip_" + ext) in zj["story_" + name]) funcStatus = true;
                //     }
                // }
                // ret = ret && fileStatus && funcStatus;
                // return ret;
            };
            if (_bDialog != true)
                return;
            var n = (zj.ConstantConfig_Teach.Tag.Dialog).toString();
            var dialog = zj.Game.UIManager.GroupTeachUI.getChildByName(n);
            if (dialog == null) {
                var win = zj.newUI(zj.Dialog_Simple);
                if (_bBtnEnabled) {
                    win.btnOk.touchEnabled = true;
                }
                else {
                    win.btnOk.touchEnabled = false;
                }
                win.name = (zj.ConstantConfig_Teach.Tag.Dialog).toString();
                zj.Game.UIManager.pushTeachUI(win);
                dialog = win['groupUI'];
                win.touchEnabled = false;
                var _a = _getNodePos(win.NodeBG, x, y, w, h, _index), px = _a[0], py = _a[1];
                if (moveXHalf) {
                    px = px + win.NodeBG.width / 2;
                }
                win.NodeBG.x = px;
                win.NodeBG.y = py;
                var ret = _isHaveTip();
                if (ret) {
                    win.labelContent.textFlow = zj.Util.RichText(ret.content);
                    win.RunAction();
                    // if (("story_" + name) in zj) {
                    //     let storyInfo = "story_" + name;
                    //     if ("tip_" + ext in zj["story_" + name]) {
                    //         let str = zj["story_" + name]["tip_" + ext]();
                    //         win.labelContent.textFlow = Util.RichText(str);
                    //         win.RunAction();
                    //     }
                    // }
                }
                else {
                    win.NodeBG.visible = false;
                }
            }
            else {
                var btn = dialog['btnOk'];
                if (_bBtnEnabled) {
                    btn.touchEnabled = true;
                }
                else {
                    btn.touchEnabled = false;
                }
                // let node = dialog.getChildByName("2");
                var node = dialog['NodeBG'];
                var _b = _getNodePos(node, x, y, w, h, _index), px = _b[0], py = _b[1];
                node.x = px;
                node.y = py;
                // let text = node.getChildByName("3");
                var text = dialog['labelContent'];
                var ret = _isHaveTip();
                if (ret) {
                    text.text = ret.content;
                    // if (("story_" + name) in zj) {
                    //     let storyInfo = "story_" + name;
                    //     if ("tip_" + ext in zj["story_" + name]) {
                    //         let str = zj["story_" + name]["tip_" + ext]();
                    //         text.text = str;
                    //     }
                    // }
                }
                else {
                    dialog.visible = false;
                }
            }
        };
        Teach.DoOperateTeach = function () {
            zj.Teach_diff.OperateTeach(null, zj.Game.TeachSystem.curPart, this.nOperateTeachStep, 0);
        };
        /**教学剧情对话 */
        Teach.ProcTeachStory = function () {
            if (zj.Story.bFinish != true) {
                zj.Story.playStory(zj.Game.TeachSystem.curPart, this.nOperateTeachStep);
            }
        };
        /**
         * 手动设置教学步骤ID
         * @param part {number} 教学步骤ID
         */
        Teach.SetTeachPart = function (part) {
            if (Teach.isDone(1011))
                return;
            this.bFirstTeachUpdata = false;
            this.delTouchTipSpx();
            this.nOperateTeachStep = 0;
            this.nOperateTeachFrame = 0;
            this.bStopTeachUpdata = false;
            this.bTeachUpdata = true;
            this.bInTeaching = true;
            console.log("——————————————————新手引导触发:  " + part + "——————————————————————");
            zj.Game.EventManager.event(zj.GameEvent.START_NEW_TEACHING, { curPart: part });
        };
        /**手动跳到下一个教学步骤 */
        Teach.AddTeachPart = function () {
            this.bFirstTeachUpdata = true;
            zj.Game.TeachSystem.curPart = zj.Game.TeachSystem.curPart + 1;
            this.cleanTeach();
        };
        Teach.cleanTeach = function () {
            Teach.removeMask();
            this.delTouchTipSpx();
            this.setStopTeachUpdata(false);
            this.nOperateTeachStep = 0;
            this.nOperateTeachFrame = 0;
            this.bTeachUpdata = false;
            this.bInTeaching = false;
            Teach.teachingNow = false;
            zj.Game.UIManager.GroupStory.removeChildren();
            zj.Game.UIManager.GroupTeachUI.removeChildren();
        };
        Teach.setFixOperate = function (lr, ll, rc, rr, rl, ru, rd, lcc) {
            this.bFixOperate[zj.ConstantConfig_Teach.Teach_Operate_Left_Part_Right] = lr;
            this.bFixOperate[zj.ConstantConfig_Teach.Teach_Operate_Left_Part_Left] = ll;
            this.bFixOperate[zj.ConstantConfig_Teach.Teach_Operate_Right_Part_Click] = rc;
            this.bFixOperate[zj.ConstantConfig_Teach.Teach_Operate_Right_Part_Right] = rr;
            this.bFixOperate[zj.ConstantConfig_Teach.Teach_Operate_Right_Part_Left] = rl;
            this.bFixOperate[zj.ConstantConfig_Teach.Teach_Operate_Right_Part_Up] = ru;
            this.bFixOperate[zj.ConstantConfig_Teach.Teach_Operate_Right_Part_Down] = rd;
            this.bFixOperate[zj.ConstantConfig_Teach.Teach_Operate_Left_Double_Click] = lcc; // 冲刺
        };
        Teach.setLimitOperate = function (limit) {
            this.bLimitOperate = limit;
        };
        Teach.setCancelAllUpdata = function (isallupdata) {
            this.bCancelAllUpdata = isallupdata;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (scene.tableEnemys == null)
                return;
            if (isallupdata) {
                for (var i = 0; i < zj.Game.PlayerMissionSystem.tableLength(scene.tableEnemys); i++) {
                    scene.tableEnemys[i].Pause();
                }
                for (var i = 0; i < zj.Game.PlayerMissionSystem.tableLength(scene.tableAllys); i++) {
                    scene.tableAllys[i].Pause();
                }
            }
            else {
                for (var i = 0; i < zj.Game.PlayerMissionSystem.tableLength(scene.tableEnemys); i++) {
                    scene.tableEnemys[i].Resume();
                }
                for (var i = 0; i < zj.Game.PlayerMissionSystem.tableLength(scene.tableAllys); i++) {
                    scene.tableAllys[i].Resume();
                }
            }
        };
        Teach.setCancelMonsterUpdata = function (ismonsterupdata) {
            this.bCancelMonsterUpdata = ismonsterupdata;
        };
        /**教学中根据玩家的操作开始下一步操作 */
        Teach.addTeaching = function () {
            if (this.isTeaching) {
                this.isTeaching = false;
                this.addOperateTeachStep();
                // this.DoOperateTeach();
            }
        };
        /**增加步骤(上阵用) */
        Teach.addTeachingFormation = function () {
            var isAdd = ((zj.Game.TeachSystem.curPart == 3002 && (Teach.nOperateTeachStep == 20 || Teach.nOperateTeachStep == 21 || Teach.nOperateTeachStep == 22))
                || (zj.Game.TeachSystem.curPart == 1003 && (Teach.nOperateTeachStep == 13 || Teach.nOperateTeachStep == 14 || Teach.nOperateTeachStep == 15 || Teach.nOperateTeachStep == 16))
                || (zj.Game.TeachSystem.curPart == 8023 && (Teach.nOperateTeachStep == 1 || Teach.nOperateTeachStep == 2 || Teach.nOperateTeachStep == 3 || Teach.nOperateTeachStep == 4)));
            if (isAdd)
                Teach.addOperateTeachStep();
        };
        /**删除spx */
        Teach.delTouchTipSpx = function () {
            zj.Game.UIManager.GroupTeachUI.removeChildren();
            if (Teach.hand) {
                zj.Game.UIManager.GroupTeachHand.removeChildren();
                Teach.hand = null;
            }
            this.bAutoVisible = false;
            this.origChild = null;
            var childStrName = (zj.ConstantConfig_Teach.Tag.SpxHand).toString();
            var ani = zj.Game.UIManager.GroupTeachUI.getChildByName(childStrName);
            if (ani != null) {
                zj.Game.UIManager.GroupTeachUI.removeChild(ani);
            }
        };
        Teach.setDoorTeach = function (doorteach) {
            this.bDoorTeach = doorteach;
        };
        Teach.setStopTeachUpdata = function (isstop) {
            this.bStopTeachUpdata = isstop;
        };
        Teach.getTeachStepFrame = function () {
            return this.nOperateTeachFrame;
        };
        Teach.setTeachStepFrame = function (frame) {
            this.nOperateTeachFrame = frame;
        };
        Teach.addOperateTeachStep = function () {
            if (zj.Game.UIManager.GroupStory.numChildren != 0) {
                return;
            }
            this.delTouchTipSpx();
            this.nOperateTeachStep = this.nOperateTeachStep + 1;
            this.bLimitOperate = false;
            this.bSkillEnd = false;
            this.bJumpHalf = false;
            this.nOperateTeachFrame = 0;
            this.bStopTeachUpdata = false;
            Teach.DoOperateTeach();
        };
        Teach.setOperateTeachStep = function (step) {
            this.nOperateTeachStep = step;
            this.bLimitOperate = false;
            this.nOperateTeachFrame = 0;
            this.bStopTeachUpdata = false;
            Teach.DoOperateTeach();
        };
        /**教学中通过事件进行下一步标志 */
        Teach.setTeaching = function (isTeach) {
            this.isTeaching = isTeach;
        };
        /**将教学步骤保存到服务器 */
        Teach.SaveTeachPart = function (bLocal, teachPartID) {
            // if (teachPartID == null) teachPartID = this.nOperateTeachPart;
            if (teachPartID == null)
                teachPartID = zj.Game.TeachSystem.curPart;
            var item = new message.TeachItem();
            item.part = teachPartID;
            item.is_jump = false;
            var bFind = false;
            for (var i = 0; i < this.nServerPart.length; i++) {
                if (this.nServerPart[i].part == item.part) {
                    bFind = true;
                    break;
                }
            }
            if (bFind == false) {
                this.nServerPart.push(item);
            }
            if (bLocal != true) {
                zj.Game.TeachSystem.SaveTeach()
                    .then(function (value) {
                    // toast_success("保存成功");
                })
                    .catch(function (reason) {
                    zj.toast_warning(reason);
                });
            }
        };
        Teach.SaveTeachPartLocal = function (teachPartID) {
            if (teachPartID == null)
                teachPartID = zj.Game.TeachSystem.curPart;
            var item = new message.TeachItem();
            item.part = teachPartID;
            item.is_jump = false;
            var bFind = false;
            for (var i = 0; i < this.nServerPartLocal.length; i++) {
                if (this.nServerPartLocal[i].part == item.part) {
                    bFind = true;
                    break;
                }
            }
            if (bFind == false) {
                this.nServerPartLocal.push(item);
            }
        };
        Teach.Reset = function () {
            /**是否开启教学 */
            this.m_bOpenTeach = false;
            /**第一帧判断是否教学操作 */
            this.bFirstTeachUpdata = true;
            /**持续教学更新 */
            this.bTeachUpdata = false;
            /**不再处理教学脚本 */
            this.bStopTeachUpdata = false;
            /**操作教学进行到哪个部分 */
            // this.nOperateTeachPart = -1;
            /**操作教学部分步骤 */
            this.nOperateTeachStep = 0;
            /**操作教学帧计数 */
            this.nOperateTeachFrame = 0;
            /**限制操作 */
            this.bLimitOperate = false;
            /**7种操作，true允许，false不允许 */
            this.bFixOperate = [true, true, true, true, true, true, true, true];
            /**是否屏蔽全部角色的update */
            this.bCancelAllUpdata = false;
            /**是否屏蔽怪的update */
            this.bCancelMonsterUpdata = false;
            /**spx */
            this.m_apGo = null;
            /**gogo所属layer */
            this.gogoRootNode = null;
            /**处于教学中的操作 */
            this.isTeaching = false;
            /**自动隐藏小手提示 */
            this.bAutoVisible = false;
            /**是否在教学中 */
            this.bInTeaching = false;
            /**服务器保存的教学步骤 */
            this.nServerPart = [];
            /**技能结束跳下一步标记 */
            this.bSkillEnd = false;
            /**跳起到一半的时候就中断 */
            this.bJumpHalf = false;
            /**1 - 2门教学 */
            this.bDoorTeach = false;
            this.ani_doorTeach = null;
            /**教学到大地图 */
            this.TeachtoMap = false;
            /**提示地图未开启 */
            this.bLockDoorTip = false;
            /**异步addTeaching */
            this.bAsyncContinue = false;
            /**原始的子节点 */
            this.origChild = null;
            /**临时层节点 */
            this.tmpLayer = null;
            this.delTouchTipSpx();
            // this.CleanOperateTeach()
            // this.clearGo()
            this.EndCurPart(false);
        };
        //////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////// 新手引导辅助方法(教学扩展) ///////////////////////////////
        ///////////////////////////////////// 原Teach_ext.lua ////////////////////////////////////////
        /**结束本次步骤的教学 */
        Teach.EndCurPart = function (bContinue) {
            this.setStopTeachUpdata(false);
            // this.nOperateTeachPart = -1;
            this.nOperateTeachStep = 0;
            this.bInTeaching = false;
            if (bContinue) {
                this.bFirstTeachUpdata = true;
            }
            else {
                this.bFirstTeachUpdata = false;
            }
            zj.TeachSystem.nodeOrStageID = null;
            this.bFirstTeachUpdata = true;
            // 教学提示
            zj.Tips.SetTipsOfId(zj.Tips.TAG.TEACH);
            zj.Game.TeachSystem.QueryTeach().then(function (teachItems) {
                Teach.nServerPart = teachItems;
            });
            // 每个任务结束 去除遮罩
            Teach.removeMask();
            console.log("——————————————————新手引导结束:  " + zj.Game.TeachSystem.curPart + "——————————————————————");
            zj.RolePointTracker.track(30000 + (zj.Game.TeachSystem.curPart * 10) + 1);
            // let num = 30000 + (Game.TeachSystem.curPart * 10) + 1
            // console.log("—————————————————————— 新手引导任务结束打点" + num + "——————————————————————");
            Teach.LastTeach = zj.Game.TeachSystem.curPart;
            Teach.teachingNow = false;
            zj.Game.TeachSystem.curPart = -1;
            zj.Game.EventManager.event(zj.GameEvent.IS_END_LAST_TEACH);
        };
        /**检测UI是否已经可以引导教学 */
        Teach.GetDstUI = function (uiNames) {
            // 和之前的接口统一
            if (typeof uiNames == "string") {
                uiNames = [uiNames];
            }
            var ui;
            var aa = zj.Game.UIManager.topDialog();
            if (zj.Game.UIManager.topDialog() == null || zj.Game.UIManager.topDialog() == undefined) {
                ui = zj.Game.UIManager.topScene();
            }
            else {
                ui = zj.Game.UIManager.topDialog();
            }
            var str = egret.getQualifiedClassName(ui);
            if (ui == null || zj.Table.VIn(uiNames, str) == false) {
                return [ui, true];
            }
            return [ui, false];
        };
        Teach.Dst_Menu = function (bGrowth) {
            var uiNames = [zj.SceneManager.mainCityClassStr];
            if (bGrowth == true) {
                uiNames = [zj.SceneManager.mainCityClassStr, zj.SceneManager.adventureClassStr];
            }
            return this.GetDstUI(uiNames);
        };
        Teach.Dst_Hero = function () {
            return this.GetDstUI("zj.HunterMainScene");
        };
        Teach.Dst_BattleEnd = function () {
            return this.GetDstUI("zj.BattleEnd_Win");
        };
        Teach.Dst_InstanceNormal = function () {
            return this.GetDstUI(zj.SceneManager.adventureClassStr);
        };
        Teach.Dst_InstanceElite = function () {
            return this.GetDstUI(zj.SceneManager.adventureClassStr);
        };
        Teach.Dst_Formation = function () {
            return this.GetDstUI("zj.CommonFormatePveMain");
        };
        Teach.Dst_BattleMsg = function () {
            return this.GetDstUI("zj.Battle_MsgPreview");
        };
        /**指定阵上位置上阵武将 */
        Teach.Format_ClickIdx = function (index, ignoreID, preferID) {
            var ui = zj.Game.UIManager.topDialog();
            var itemlist = zj.Game.PlayerFormationSystem.itemlist;
            for (var i = 0; i < (index - 1 < 0 ? 0 : index - 1); i++) {
                if (itemlist[i] == undefined) {
                    Teach.needIsEndAni = true;
                    return;
                }
            }
            if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") {
                var item = zj.Game.PlayerFormationSystem.blowGuideFormations;
                var selectedTeam = this.generals[index - 1];
                if (selectedTeam != 0 && selectedTeam != undefined && selectedTeam != null) {
                    this.addOperateTeachStep();
                    return;
                }
                var _a = this.GetGeneralIndexToFormat(ui, ignoreID, preferID, itemlist), ret = _a[0], idx_1 = _a[1];
                if (ret == false) {
                    this.addOperateTeachStep();
                }
                else {
                    var list = ui['down']['listBottom'];
                    var xItem = itemlist[idx_1]['imgFrame'].localToGlobal().x - zj.Game.UIManager.x;
                    var yItem = itemlist[idx_1]['imgFrame'].localToGlobal().x;
                    var wItem = itemlist[idx_1]['imgFrame'].width;
                    var hItem = itemlist[idx_1]['imgFrame'].height;
                    var xList = list.localToGlobal().x - zj.Game.UIManager.x;
                    var yList = list.localToGlobal().y;
                    var wList = list.width;
                    var hList = list.height;
                    if (xItem >= xList + wList || xItem + wItem <= xList || wItem >= xItem) {
                        list.selectedIndex = idx_1;
                    }
                    var KaiTeIndex_1 = -1;
                    for (var i = 0; i < zj.PlayerHunterSystem.GetHunterList().length; i++) {
                        if (zj.PlayerHunterSystem.GetGeneralId(zj.PlayerHunterSystem.GetHunterList()[i]) == 10005) {
                            KaiTeIndex_1 = i;
                            break;
                        }
                    }
                    var space = void 0;
                    if (zj.Game.TeachSystem.curPart == 8023 && KaiTeIndex_1 != -1 && KaiTeIndex_1 > 11) {
                        space = Math.floor(KaiTeIndex_1 / 12) * list.width;
                        if (list.contentWidth - space > list.width) {
                            list.scrollH = space;
                        }
                        else {
                            list.scrollH = list.contentWidth - list.width;
                        }
                        list.validateNow();
                        Teach.addMask();
                        setTimeout(function () {
                            ui['down']['getItemList']();
                            itemlist = zj.Game.PlayerFormationSystem.itemlist;
                            if (Teach.isHaveTip() == true)
                                Teach._reuse_button(itemlist[KaiTeIndex_1], true, true, false, 1, 0.7, false, false, true);
                            console.log("----------------" + "新手引导选中上阵猎人" + "-----------------");
                        }, 500);
                    }
                    else {
                        setTimeout(function () {
                            Teach.removeMask();
                            if (Teach.isHaveTip() == true)
                                Teach._reuse_button(itemlist[idx_1], true, true, false, 1, 0.7, false, false, true);
                            console.log("----------------" + "新手引导选中上阵猎人" + "-----------------");
                        }, 500);
                    }
                }
            }
            else {
                Teach.openDialogName = "zj.CommonFormatePveMain";
                Teach.isNeedOpenAddStep = false;
                return;
            }
        };
        Teach.getItemPosition = function (id, list, curPart_, rowNum, lineNum) {
            var itemIndex = -1;
            id = zj.PlayerHunterSystem.GetGeneralId(id);
            for (var i = 0; i < zj.PlayerHunterSystem.GetHunterList().length; i++) {
                if (zj.PlayerHunterSystem.GetGeneralId(zj.PlayerHunterSystem.GetHunterList()[i]) == id) {
                    itemIndex = i;
                    break;
                }
            }
            var space;
            if (itemIndex != -1 && itemIndex > (rowNum * lineNum) - 1) {
                space = Math.floor(itemIndex / (rowNum * lineNum)) * list.height;
                if (list.contentHeight - space > list.height) {
                    list.scrollV = space;
                }
                else {
                    list.scrollV = list.contentHeight - list.height;
                }
                list.validateNow();
            }
        };
        /**战斗结束升级 返回主城 */
        Teach.BattleLevelUp = function (curStep_) {
            if (curStep_ == 0) {
                var _a = this.Dst_BattleEnd(), ui = _a[0], bLoading = _a[1];
                if (bLoading)
                    return true;
                if (zj.Game.PlayerInstanceSystem.canSyncLevel == true) {
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonGoOn']);
                    if (this.isHaveTip() == true)
                        this._reuse_button(ui['ButtonGoOn'], true, true, false, 0, 0.7, false, true);
                }
                else {
                    this.addOperateTeachStep();
                }
            }
            else if (curStep_ == 1) {
                this.SaveTeachPart();
                this.EndCurPart(false);
                Teach.SaveTeachPartLocal();
            }
        };
        /**主城操作（扫荡副本 任务完成）升级，返回主城 */
        Teach.CityLevelUp = function (curStep_, bGrowth) {
            if (curStep_ == 0) {
                Teach.addMask();
                var ui = zj.Game.UIManager.topScene();
                var uiNames = [zj.SceneManager.mainCityClassStr];
                if (bGrowth == true) {
                    uiNames = [zj.SceneManager.mainCityClassStr, zj.SceneManager.adventureClassStr];
                }
                if (ui == null || zj.Table.VIn(uiNames, egret.getQualifiedClassName(ui)) == false) {
                    this.setStopTeachUpdata(true);
                    this.setTeaching(true);
                    zj.Game.UIManager.popAllScenesAndDialogs(function () {
                        Teach.removeMask();
                        Teach.addOperateTeachStep();
                    });
                    return;
                }
                else {
                    Teach.setOperateTeachStep(1);
                }
            }
            else if (curStep_ == 1) {
                Teach.addMask();
                var _a = this.Dst_Menu(bGrowth), ui = _a[0], bLoading = _a[1];
                if ((zj.SceneManager.instance.isMainCityScene() || zj.SceneManager.instance.isAdventureScene()) && zj.Game.UIManager.topDialog() == null) {
                    this.addOperateTeachStep();
                }
                else {
                    Teach.removeMask();
                    Teach.closeDialogName = egret.getQualifiedClassName(ui);
                    Teach.isNeedCloseAddStep = false;
                    return;
                }
            }
        };
        /**升级打开菜单按钮 */
        Teach.LevelUpToBtn = function (curStep_, bnt_name, ui_names, bGrowth, curPart_) {
            if (typeof ui_names == "string") {
                ui_names = [ui_names];
            }
            // 判断界面情况
            if (curStep_ == 0) {
                var ui = zj.Game.UIManager.topScene();
                if (ui == null || zj.Table.VIn(ui_names, egret.getQualifiedClassName(ui))) {
                    this.setOperateTeachStep(2);
                }
                else {
                    this.CityLevelUp(curStep_, bGrowth);
                }
            }
            else if (curStep_ < 2) {
                this.CityLevelUp(curStep_, bGrowth);
            }
            else if (curStep_ == 2) {
                // 非目标界面打开目标界面
                var _a = [null, null], ui = _a[0], bLoading = _a[1];
                var topScene = zj.Game.UIManager.topScene();
                if (bGrowth == null && zj.SceneManager.instance.isAdventureScene()) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                }
                else if (zj.Table.VIn(ui_names, egret.getQualifiedClassName(topScene))) {
                    ui = topScene;
                }
                else {
                    _b = this.Dst_Menu(bGrowth), ui = _b[0], bLoading = _b[1];
                    if (bLoading) {
                        Teach.openSceneName = ui;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }
                this.ProcTeachStory();
                if (zj.Story.isFinish()) {
                    zj.Story.bFinish = false;
                    var b_instance = zj.SceneManager.instance.isAdventureScene(ui); // 副本
                    if (b_instance) {
                        var _c = this.GetDstUI(zj.SceneManager.adventureClassStr), top_1 = _c[0], bLoading_1 = _c[1];
                        var scene = zj.Game.UIManager.topScene();
                        if (scene.dialogInfo.parent.visible == false) {
                            this.setOperateTeachStep(4);
                        }
                        else {
                            // part 对应关卡
                            var partByIndex = null;
                            if (curPart_ == 3003 || curPart_ == 3014 || curPart_ == 8007) {
                                partByIndex = 1;
                            }
                            else if (curPart_ == 3019) {
                                partByIndex = 2;
                            }
                            else if (curPart_ == 8010) {
                                partByIndex = 3;
                            }
                            if (partByIndex != null && (zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID == partByIndex)) {
                                // 无需关闭右侧列表
                                this.addOperateTeachStep();
                            }
                            else {
                                // 需关闭右侧列表 
                                // 动作完毕
                                // this.addMask();
                                var mask = new eui.Rect(zj.UIManager.StageWidth, zj.UIManager.StageHeight, 0x00ff00);
                                mask.alpha = 0;
                                mask.name = "temporaryMaskClose";
                                zj.Game.UIManager.pushTeachUI(mask);
                                setTimeout(function () {
                                    var rect = zj.Game.UIManager.GroupTeachUI.getChildByName("temporaryMaskClose");
                                    if (rect != null) {
                                        zj.Game.UIManager.GroupTeachUI.removeChild(rect);
                                    }
                                    var adven = zj.Game.UIManager.topScene();
                                    if (Teach.isHaveTip() == true)
                                        Teach._reuse_button(adven.dialogInfo['btnCloseAdventure'], true, true, false, 1, 0.7, false, false, false, false, [1.2, 1.2]);
                                    zj.Game.UIManager.setMaskAttachedTapObj(adven.dialogInfo['btnCloseAdventure']);
                                    Teach.addOnceEvent(adven.dialogInfo['btnCloseAdventure']);
                                    Teach.closeUiName = "zj.AdventureDialog";
                                    Teach.isNeedCloseAddStep = false;
                                    return;
                                }, 500);
                            }
                        }
                    }
                    else {
                        this.addOperateTeachStep();
                    }
                }
            }
            else if (curStep_ == 3) {
                var ui = zj.Game.UIManager.topScene();
                if (zj.SceneManager.instance.isAdventureScene(ui)) {
                    ui['btnCloseTop'].enabled = false;
                }
                this.addOperateTeachStep();
            }
            else if (curStep_ == 4) {
                var _d = [null, null], ui = _d[0], bLoading = _d[1];
                var topscene = zj.Game.UIManager.topScene();
                var uiName = egret.getQualifiedClassName(zj.Game.UIManager.topScene());
                if (bGrowth == null && zj.SceneManager.instance.isAdventureScene(topscene)) {
                    _e = this.GetDstUI(ui_names), ui = _e[0], bLoading = _e[1];
                    if (bLoading) {
                        Teach.openSceneName = ui_names;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }
                else if (zj.Table.VIn(ui_names, uiName)) {
                    ui = topscene;
                }
                else {
                    _f = this.Dst_Menu(bGrowth), ui = _f[0], bLoading = _f[1];
                    if (bLoading) {
                        Teach.openSceneName = ui;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }
                var b_instance = zj.SceneManager.instance.isAdventureScene(topscene);
                if (b_instance) {
                    // part 对应关卡
                    var partByIndex = null;
                    if (curPart_ == 3003 || curPart_ == 3014) {
                        partByIndex = 1;
                    }
                    else if (curPart_ == 3019 || curPart_ == 8007) {
                        partByIndex = 2;
                    }
                    else if (curPart_ == 8010) {
                        partByIndex = 3;
                    }
                    if (partByIndex != null && ui._curZoneIndex == partByIndex) {
                        // 无需关闭右侧列表
                        if (ui[bnt_name] != null) {
                            zj.Game.UIManager.setMaskAttachedTapObj(ui[bnt_name]);
                            if (this.isHaveTip() == true)
                                this._reuse_button(ui[bnt_name], true, true, false, 1, 0.7, false, false);
                        }
                        else {
                            this.addOperateTeachStep();
                        }
                    }
                    else {
                        var adven_1 = zj.Game.UIManager.topScene();
                        if (adven_1[bnt_name] != null) {
                            Teach.addMask();
                            if (adven_1['dialogInfo'].parent.visible == false) {
                                if (zj.SceneManager.instance.isAdventureScene(adven_1)) {
                                    adven_1['btnCloseTop'].enabled = true;
                                    var mask = new eui.Rect(zj.UIManager.StageWidth, zj.UIManager.StageHeight, 0x00ff00);
                                    mask.alpha = 0;
                                    mask.name = "temporaryMaskMaskHero";
                                    zj.Game.UIManager.pushTeachUI(mask);
                                    var callBack_1 = function () {
                                        // adven['topShadow'].visible = false;
                                    };
                                    setTimeout(function () {
                                        if (Teach.isHaveTip() == true)
                                            Teach._reuse_button(adven_1[bnt_name], true, true, false, 1, 0.7, false, false);
                                        zj.Game.UIManager.setMaskAttachedTapObj(new zj.onTouchToHero(callBack_1));
                                        var rect = zj.Game.UIManager.GroupTeachUI.getChildByName("temporaryMaskMaskHero");
                                        if (rect != null) {
                                            zj.Game.UIManager.GroupTeachUI.removeChild(rect);
                                        }
                                    }, 500);
                                }
                                else {
                                    setTimeout(function () {
                                        Teach.removeMask();
                                        if (Teach.isHaveTip() == true)
                                            Teach._reuse_button(adven_1[bnt_name], true, true, false, 1, 0.7, false, false);
                                        zj.Game.UIManager.setMaskAttachedTapObj(adven_1[bnt_name]);
                                        Teach.addOnceEvent(adven_1[bnt_name]);
                                        Teach.openSceneName = ui_names;
                                        return;
                                    }, 500);
                                }
                            }
                            else {
                                Teach.needIsEndAni = true;
                                return;
                            }
                        }
                        else {
                            Teach.addOperateTeachStep();
                        }
                    }
                }
                else {
                    var topUI_1 = null;
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.HunterMainScene")
                        topUI_1 = zj.Game.UIManager.topScene();
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == zj.SceneManager.mainCityClassStr)
                        topUI_1 = zj.Game.UIManager.topScene().sceneUI;
                    if (zj.Game.UIManager.topDialog() != null) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (topUI_1[bnt_name] != null && topUI_1[bnt_name] != undefined) {
                        setTimeout(function () {
                            zj.Game.UIManager.setMaskAttachedTapObj(topUI_1[bnt_name]);
                            if (Teach.isHaveTip() == true)
                                Teach._reuse_button(topUI_1[bnt_name], true, true, false, 1, 0.7, false, false);
                            var btn = topUI_1[bnt_name];
                            Teach.addOnceEvent(btn);
                            btn.once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                            Teach.openSceneName = ui_names;
                            return;
                        }, 500);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
            }
            var _b, _e, _f;
        };
        /**升级打开更多里面的菜单按钮 */
        Teach.LevelUpToBtnMore = function (curStep_, bnt_name, ui_names, bGrowth) {
            if (typeof ui_names == "string") {
                ui_names = [ui_names];
            }
            // 判断界面情况
            if (curStep_ == 0) {
                var ui = zj.Game.UIManager.topScene();
                if (ui != null && zj.Table.VIn(ui_names, egret.getQualifiedClassName(ui))) {
                    this.setOperateTeachStep(2);
                }
                else {
                    this.CityLevelUp(curStep_, bGrowth);
                }
            }
            else if (curStep_ < 2) {
                this.CityLevelUp(curStep_, bGrowth);
            }
            else if (curStep_ == 2) {
                var _a = this.Dst_Menu(bGrowth), ui = _a[0], bLoading = _a[1];
                if (bLoading)
                    return;
                this.ProcTeachStory();
                if (zj.Story.isFinish() && !ui['_press_more'])
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonMore']);
                if (this.isHaveTip() == true)
                    this._reuse_button(ui['ButtonMore'], true, true, false, 0, 0.7, false, true);
                else {
                    this.setOperateTeachStep(3);
                }
            }
            else if (curStep_ == 3) {
                var _b = this.Dst_Menu(bGrowth), ui = _b[0], bLoading = _b[1];
                if (bLoading)
                    return;
                this.ProcTeachStory();
                if (zj.Story.isFinish()) {
                    zj.Story.bFinish = false;
                    zj.Game.UIManager.setMaskAttachedTapObj(ui[bnt_name]);
                    if (this.isHaveTip() == true)
                        this._reuse_button(ui[bnt_name], true, true, false, 0, 0.7, false, false);
                }
            }
            else if (curStep_ == 4) {
                var _c = this.GetDstUI(ui_names), ui = _c[0], bLoading = _c[1];
                if (bLoading)
                    return;
                this.addOperateTeachStep();
            }
        };
        Teach.LevelUpToHero = function (curStep_, general_id, choose_other, bRealGeneral) {
            if (curStep_ < 5) {
                this.LevelUpToBtn(curStep_, "btnHunter", "zj.HunterMainScene", true);
            }
            else if (curStep_ == 5) {
                Teach.addMask();
                var _a = this.Dst_Hero(), ui_1 = _a[0], bLoading = _a[1];
                if (bLoading) {
                    Teach.openSceneName = "zj.HunterMainScene";
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.HunterMainScene") {
                    Teach.delTouchTipSpx();
                    ui_1['rectMask'].visible = true;
                }
                if (ui_1['generalId'] == null) {
                    Teach.needIsEndAni = true;
                    return;
                }
                if ((bRealGeneral && ui_1['generalId'] == general_id) || (!bRealGeneral && zj.PlayerHunterSystem.GetGeneralId(ui_1['generalId']) == general_id)) {
                    this.addOperateTeachStep();
                    return;
                }
                else {
                    if (ui_1.getChildByName("hero") == null) {
                        Teach.openUiName = "zj.HunterHero";
                        return;
                    }
                }
                var item_1;
                setTimeout(function () {
                    item_1 = ui_1['SetInfoMoveTo'](general_id, bRealGeneral);
                    if (item_1 == null || item_1 == undefined) {
                        if (choose_other != true) {
                            Teach.removeMask();
                            Teach.SaveTeachPart();
                            Teach.SaveTeachPartLocal();
                            Teach.EndCurPart(false);
                            return;
                        }
                        else {
                            item_1 = ui_1['SetInfoMoveToFirst']();
                            if (item_1 == null || item_1 == undefined) {
                                Teach.removeMask();
                                Teach.SaveTeachPart();
                                Teach.SaveTeachPartLocal();
                                Teach.EndCurPart(false);
                                return;
                            }
                        }
                    }
                    var hero = ui_1.getChildByName("hunterHero");
                    Teach.getItemPosition(item_1.data.generalId, hero['listHero'], 1021, 5, 5);
                    hero['getItemListHero']();
                    hero['scrollerHero'].scrollPolicyV = eui.ScrollPolicy.OFF;
                    if (Teach.isHaveTip())
                        Teach._reuse_button(item_1, true, true, false, 1, 0.7, false, false, true);
                    // zj.Game.UIManager.setMaskAttachedTapObj(hero['listHero']);
                    // Teach.addOnceEvent(hero['listHero']);
                    // hero['listHero'].once(egret.TouchEvent.TOUCH_TAP, () => {
                    //     (<eui.Scroller>hero['scrollerHero']).scrollPolicyV = eui.ScrollPolicy.ON;
                    // }, null);
                }, zj.Game.TeachSystem.curPart == 1021 ? 2500 : 2000);
            }
        };
        /**升级打开副本界面 */
        Teach.LevelUpToInstance = function (curStep_, curPart_) {
            if (curStep_ < 5) {
                this.LevelUpToBtn(curStep_, "btnAdventrue", zj.SceneManager.adventureClassStr, null, curPart_);
            }
            else if (curStep_ == 5) {
                var _a = this.GetDstUI(zj.SceneManager.adventureClassStr), ui = _a[0], bLoading = _a[1];
                if (bLoading) {
                    Teach.openSceneName = zj.SceneManager.adventureClassStr;
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                this.addOperateTeachStep();
            }
        };
        /**升级打开建筑 */
        Teach.LevelUpToBuild = function (curStep_, buildType, buildUINames, btnName, rectName) {
            if (zj.Game.UIManager.topDialog() != null) {
                Teach.removeMask();
                Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                Teach.isNeedCloseAddStep = false;
                if (zj.Game.TeachSystem.curPart == 3001) {
                    Teach.teachingNow = false;
                    zj.Game.TeachSystem.curPart = -1;
                }
                return;
            }
            if (!zj.SceneManager.instance.isMainCityScene()) {
                if (typeof buildUINames === 'string') {
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) != buildUINames) {
                        Teach.removeMask();
                        Teach.closeSceneName = egret.getQualifiedClassName(zj.Game.UIManager.topScene());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                }
                else if (typeof buildUINames === 'object') {
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) != buildUINames[0]) {
                        if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) != buildUINames[1]) {
                            // return;
                            Teach.removeMask();
                            Teach.closeSceneName = egret.getQualifiedClassName(zj.Game.UIManager.topScene());
                            Teach.isNeedCloseAddStep = false;
                            return;
                        }
                    }
                }
            }
            if (typeof (buildUINames) == "string") {
                buildUINames = [buildUINames];
            }
            //判断界面情况
            if (curStep_ == 0) {
                Teach.addMask();
                var ui = void 0;
                if (zj.Game.UIManager.topDialog() == null) {
                    ui = zj.Game.UIManager.topScene();
                }
                else {
                    ui = zj.Game.UIManager.topDialog();
                }
                if (ui != null && zj.Table.VIn(buildUINames, egret.getQualifiedClassName(ui))) {
                    this.setOperateTeachStep(3);
                }
                else {
                    this.CityLevelUp(curStep_, null);
                }
            }
            else if (curStep_ < 2) {
                Teach.addMask();
                this.CityLevelUp(curStep_, null);
            }
            else if (curStep_ == 2) {
                Teach.addMask();
                this.ProcTeachStory();
                if (zj.Story.isFinish() == true && zj.Game.UIManager.GroupStory.numChildren == 0) {
                    zj.Story.bFinish = false;
                    Teach.addMask();
                    this.setLimitOperate(true);
                    if (zj.SceneManager.instance.isMainCityScene() && zj.Game.UIManager.topDialog() == null) {
                        var ui_2 = zj.Game.UIManager.topScene();
                        ui_2.sceneMap.setTeachBuild(buildType, function () {
                            if (Teach.isHaveTip() == true) {
                                var part = zj.Game.TeachSystem.curPart;
                                var area = part == 1009 ? ui_2.sceneUI.getTouchTitle(buildType).getTouchGroup().getChildAt(0) : ui_2.sceneUI.getTouchTitle(buildType).getTouchGroup();
                                if (Teach.isHaveTip() == true)
                                    Teach._reuse_button(area, true, true, false, 0, 0.7, false, false, true, false);
                                zj.Game.UIManager.topScene().once(egret.TouchEvent.TOUCH_TAP, function () {
                                    zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX);
                                    Teach.addMask();
                                }, null);
                                part == 1009 ? Teach.openDialogName = buildUINames[0] : Teach.openSceneName = buildUINames[0];
                                Teach.isNeedOpenAddStep = true;
                                return;
                            }
                        }, this);
                    }
                }
            }
            else if (curStep_ == 3) {
                Teach.addMask();
                Teach.addOperateTeachStep();
            }
        };
        /**领取副本宝箱 */
        Teach.GetBox = function (curStep_, bBoss, pass, curPart_) {
            var _this = this;
            if (curStep_ < 5) {
                if (zj.Game.TeachSystem.playAreaAnimate) {
                    Teach.removeMask();
                    Teach.needIsEndAni = true;
                    return;
                }
                if (zj.SceneManager.instance.isAdventureScene()) {
                    Teach.addMask();
                    var ui = zj.Game.UIManager.topScene();
                    Teach.ProcTeachStory();
                    if (zj.Story.isFinish()) {
                        zj.Story.bFinish = false;
                        Teach.setOperateTeachStep(13);
                    }
                }
                else {
                    this.LevelUpToInstance(curStep_, curPart_);
                }
            }
            else if (curStep_ == 5) {
                Teach.addMask();
                var _a = this.GetDstUI(zj.SceneManager.adventureClassStr), top_2 = _a[0], bLoading = _a[1];
                if (bLoading) {
                    Teach.openSceneName = zj.SceneManager.adventureClassStr;
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                var adven = zj.Game.UIManager.topScene();
                adven.SetMapCanTouch(false);
                if (adven.dialogInfo.parent.visible == false) {
                    Teach.setOperateTeachStep(9);
                }
                else {
                    Teach.setOperateTeachStep(13);
                }
            }
            else if (curStep_ == 6) {
                // let scene: any = zj.Game.UIManager.topScene();
                // let ui = scene['dialog'];
                // let btn: eui.Button;
                // if (ui['type'] == 1) {
                //     btn = ui['btnCloseAdventure'];
                // } else if (ui['type'] == 2) {
                //     btn = ui['btnCloseElite'];
                // }
                // else if (ui['type'] == 3) {
                //     btn = ui['btnCloseSearch'];
                // }
                // zj.Game.UIManager.setMaskAttachedTapObj(btn);
                // if (this.isHaveTip() == true) this._reuse_button(btn, true, true, false, 1, 0.7, false, false);
                Teach.addOperateTeachStep();
            }
            else if (curStep_ == 7) {
                // let scene: any = zj.Game.UIManager.topScene();
                // let ui = scene['dialog'];
                // let ButtonClose_CallBack: () => void;
                // if (ui['type'] == 1) {
                //     ButtonClose_CallBack = ui['onBtnCloseAdventure'];
                // } else if (ui['type'] == 2) {
                //     ButtonClose_CallBack = ui['onBtnCloseElite'];
                // }
                // else if (ui['type'] == 3) {
                //     ButtonClose_CallBack = ui['onBtnCloseSearch'];
                // }
                // if (scene['groupDialog'].numChildren != 0) {
                //     ButtonClose_CallBack();
                // }
                this.addOperateTeachStep();
            }
            else if (curStep_ == 8) {
                // GameCommon.ventLockTeach(true);
                // let ui: any = zj.Game.UIManager.topScene();
                // ui['SetTeachMoveBack']();
                // if (ui['ani_end']) {
                //     this.addOperateTeachStep();
                // }
                // else {
                //     return;
                // }
                Teach.addOperateTeachStep();
            }
            else if (curStep_ == 9) {
                // GameCommon.EventLockTeach(true);
                Teach.addMask();
                var ui_3 = zj.Game.UIManager.topScene();
                var nodeName_1 = null;
                if (curPart_ == 3014) {
                    nodeName_1 = 1;
                }
                else if (curPart_ == 3019) {
                    nodeName_1 = 2;
                }
                else if (curPart_ == 3020) {
                    nodeName_1 = 3;
                }
                if (nodeName_1 != null) {
                    ui_3.SetMapCanTouch(false);
                    Teach.addMask();
                    ui_3.sceneMap.moveMapToArea(nodeName_1, function () {
                        if (Teach.isHaveTip() == true)
                            Teach._reuse_button(ui_3.sceneMap.getAdventureById(nodeName_1), true, true, false, 1, 0.7, false, false, true);
                        ui_3.sceneMap.once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                        Teach.openUiName = "zj.AdventureDialog";
                        return;
                    }, this);
                }
                else {
                    Teach.removeMask();
                    Teach.SaveTeachPart();
                    Teach.SaveTeachPartLocal();
                    Teach.setOperateTeachStep(16);
                }
            }
            else if (curStep_ == 10) {
                Teach.addMask();
                // let ui: any = zj.Game.UIManager.topScene();
                // ui['SetMapCanTouch'](true);
                // for (let i = 0; i < ui['_area']; i++) {
                //     ui['isLock'][i] = true;
                // }
                // if (ui['btnCloseTop'].enabled == false) {
                //     ui['btnCloseTop'].enabled = true;
                //     Teach.addOperateTeachStep();
                // }
                // else {
                //     Teach.addOperateTeachStep();
                // }
                Teach.addOperateTeachStep();
            }
            else if (curStep_ == 11) {
                Teach.addOperateTeachStep();
            }
            else if (curStep_ == 12) {
                this.ProcTeachStory();
                if (zj.Story.isFinish()) {
                    zj.Story.bFinish = false;
                    this.addOperateTeachStep();
                }
            }
            else if (curStep_ == 13) {
                Teach.addMask();
                var ui = zj.Game.UIManager.topScene();
                if (curPart_ == 3014 || curPart_ == 3019 || curPart_ == 3020) {
                    var areaId = 0;
                    if (curPart_ == 3014)
                        areaId = 1;
                    if (curPart_ == 3019)
                        areaId = 2;
                    if (curPart_ == 3020)
                        areaId = 3;
                    var mobInfo = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[zj.Game.PlayerInstanceSystem.getLastInstance(areaId)];
                    if (ui.dialogInfo.parent.visible == false) {
                        Teach.openUiName = "zj.AdventureDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (mobInfo.star <= 0) {
                        this.SaveTeachPart();
                        Teach.SaveTeachPartLocal();
                        this.setOperateTeachStep(16);
                    }
                    else if (mobInfo.star > 0 && !mobInfo.chestReward) {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui.dialogInfo['btnBox']);
                        if (Teach.isHaveTip() == true)
                            Teach._reuse_button(ui.dialogInfo['btnBox'], true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                        if (curPart_ == 3014 || curPart_ == 3020) {
                            Teach.openUiName = "zj.TavernGetGeneral";
                            Teach.isNeedOpenAddStep = true;
                        }
                        else {
                            Teach.openDialogName = "zj.CommonGetDialog";
                            Teach.isNeedOpenAddStep = true;
                        }
                    }
                    else {
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal();
                        Teach.setOperateTeachStep(16);
                    }
                }
            }
            else if (curStep_ == 14) {
                var _b = Teach.GetDstUI("zj.CommonGetDialog"), ui_4 = _b[0], bLoading = _b[1];
                if (bLoading) {
                    Teach.removeMask();
                    Teach.openDialogName = "zj.CommonGetDialog";
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                if (egret.getQualifiedClassName(zj.Game.UIManager.topDialog()) != "zj.CommonGetDialog") {
                    Teach.openDialogName = "zj.CommonGetDialog";
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                Teach.addMask();
                egret.Tween.get(ui_4).wait(300).call(function () {
                    if (_this.isHaveTip() == true)
                        _this._reuse_button(ui_4['groupTeach'], true, true, false, 0, 0.7, false, false, null, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui_4['groupTeach']);
                    // this.addOnceEvent(ui['groupTeach']);
                    ui_4['groupTeach'].once(egret.TouchEvent.TOUCH_TAP, function () {
                        Teach.delTouchTipSpx();
                        ui_4.btnClose.enabled = true;
                        ui_4['onBtnClose']();
                    }, null);
                    Teach.closeDialogName = "zj.CommonGetDialog";
                    return;
                });
            }
            else if (curStep_ == 15) {
                Teach.SaveTeachPart();
                Teach.SaveTeachPartLocal();
                this.addOperateTeachStep();
            }
            else if (curStep_ == 16) {
                Teach.addMask();
                var scene = zj.Game.UIManager.topScene();
                if (!zj.SceneManager.instance.isAdventureScene(scene)) {
                    Teach.num_dialog = 0;
                    return;
                }
                scene.SetMapCanTouch(true);
                if (scene.dialogInfo.parent.visible) {
                    // zj.Game.UIManager.setMaskAttachedTapObj(scene.dialogInfo['btnCloseAdventure']);
                    // if (Teach.isHaveTip() == true) Teach._reuse_button(scene.dialogInfo['btnCloseAdventure'], true, true, false, 1, 0.7, false, false, false, false, [1.2, 1.2]);
                    // scene.dialogInfo['btnCloseAdventure'].once(egret.TouchEvent.TOUCH_TAP, () => {
                    //     Game.EventManager.event(GameEvent.CLEAR_TIP_SPX);
                    //     Teach.removeMask();
                    //     Teach.delTouchTipSpx();
                    //     Teach.EndCurPart(true);
                    //     Game.TeachSystem.playAreaAnimate = false;
                    // }, null);
                    if (Teach.isHaveTip() == true)
                        Teach._reuse_button(scene.dialogInfo['btnCloseAdventure'], true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                    scene.dialogInfo['btnCloseAdventure'].once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                    Teach.closeUiName = "zj.AdventureDialog";
                    Teach.isNeedCloseAddStep = true;
                    return;
                }
                else {
                    Teach.addOperateTeachStep();
                }
            }
            else if (curStep_ == 17) {
                if (curPart_ == 3019) {
                    Teach.addOperateTeachStep();
                }
                else {
                    Teach.removeMask();
                    Teach.delTouchTipSpx();
                    Teach.EndCurPart(true);
                    zj.Game.TeachSystem.playAreaAnimate = false;
                }
            }
            else if (curStep_ == 18) {
                Teach.addMask();
                var topUI = zj.Game.UIManager.topScene();
                if (topUI.sceneMap.isOpenAniRun) {
                    Teach.needIsEndAni = true;
                    return;
                }
                topUI['btnCloseTop'].enabled = true;
                Teach.removeMask();
                if (Teach.isHaveTip() == true)
                    Teach._reuse_button(topUI['btnCloseTop'], true, true, false, 1, 0.7, false, false, true);
                topUI['btnCloseTop'].once(egret.TouchEvent.TOUCH_TAP, function () { zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX); }, null);
                Teach.closeSceneName = "zj.SceneMapTiledAdventureUI";
                Teach.isNeedCloseAddStep = true;
                return;
            }
            else if (curStep_ == 19) {
                Teach.removeMask();
                Teach.delTouchTipSpx();
                Teach.EndCurPart(true);
                zj.Game.TeachSystem.playAreaAnimate = false;
            }
        };
        /**激活羁绊卡 */
        Teach.ActivatePartner = function (curStep_, hole_index, general_id, bClose, bFocusAttri) {
            var _this = this;
            if (curStep_ < 6) {
                this.LevelUpToHero(curStep_, general_id, null, null);
            }
            else if (curStep_ == 6) {
                var ui = void 0;
                if (zj.Game.UIManager.topDialog() == null) {
                    ui = zj.Game.UIManager.topScene();
                }
                else {
                    ui = zj.Game.UIManager.topDialog();
                }
                if (egret.getQualifiedClassName(ui) != "zj.HunterMainScene") {
                    Teach.openSceneName = "zj.HunterMainScene";
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                if (zj.PlayerHunterSystem.GetGeneralId(ui['generalId']) != general_id)
                    return;
                this.addOperateTeachStep();
            }
            else if (curStep_ == 7) {
                Teach.addMask();
                var ui_5 = zj.Game.UIManager.topScene();
                ui_5['rectMask'].visible = true;
                if (ui_5['btnMainDetail'].visible) {
                    setTimeout(function () {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true)
                            Teach._reuse_button(ui_5['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                    }, 400);
                    setTimeout(function () {
                        ui_5['rectMask'].visible = false;
                        // Teach.addOnceEvent((<eui.Button>ui['btnMainDetail']));
                        Teach.openUiName = "zj.HunterDetail";
                        return;
                    }, 700);
                }
                else {
                    return;
                }
            }
            else if (curStep_ == 8) {
                Teach.delTouchTipSpx();
                var scene = zj.Game.UIManager.topScene();
                var ui = scene.getChildByName("detail");
                if (ui == null || ui.alpha != 1) {
                    Teach.needIsEndAni = true;
                    return;
                }
                Teach.addOperateTeachStep();
            }
            else if (curStep_ == 9) {
                Teach.addMask();
                var scene = zj.Game.UIManager.topScene();
                var ui_6 = scene.getChildByName("detail");
                if (ui_6 == null || ui_6.alpha != 1) {
                    Teach.needIsEndAni = true;
                    return;
                }
                egret.Tween.get(ui_6).wait(450).call(function () {
                    if (_this.isHaveTip() == true)
                        _this._reuse_button(ui_6['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new zj.onTouchAddStep());
                });
            }
            else if (curStep_ == 10) {
                Teach.addMask();
                var scene = zj.Game.UIManager.topScene();
                var ui = scene.getChildByName("detail");
                if (ui == null || ui.alpha != 1) {
                    Teach.needIsEndAni = true;
                    return;
                }
                var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
                if (generalsMap[ui['generalId']].step == 0 && ui['setHoleInfo'](hole_index) == true) {
                    if (ui['btnFate' + hole_index].enabled) {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate' + hole_index]);
                        if (this.isHaveTip() == true)
                            this._reuse_button(ui['btnFate' + hole_index], true, true, false, 1, 0.7, false, false);
                        this.addOnceEvent(ui['btnFate' + hole_index]);
                    }
                    else {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['imgFate' + hole_index]);
                        if (this.isHaveTip() == true)
                            this._reuse_button(ui['imgFate' + hole_index], true, true, false, 1, 0.7, false, false);
                        this.addOnceEvent(ui['imgFate' + hole_index]);
                    }
                }
                else {
                    this.setOperateTeachStep(12);
                }
            }
            else if (curStep_ == 11) {
                Teach.addMask();
                var scene = zj.Game.UIManager.topScene();
                var ui = scene.getChildByName("detail");
                if (ui == null || ui.alpha != 1) {
                    Teach.needIsEndAni = true;
                    return;
                }
                zj.Game.UIManager.setMaskAttachedTapObj(ui['btnActive']);
                if (this.isHaveTip() == true)
                    this._reuse_button(ui['btnActive'], true, true, false, 1, 0.7, false, false);
                this.addOnceEvent(ui['btnActive']);
            }
            else if (curStep_ == 12) {
                Teach.addMask();
                var scene = zj.Game.UIManager.topScene();
                var ui = scene.getChildByName("detail");
                if (ui == null || ui.alpha != 1) {
                    Teach.needIsEndAni = true;
                    return;
                }
                var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
                if (generalsMap[ui['generalId']].step == 0 && ui['setHoleInfo'](hole_index + 1) == true) {
                    if (ui['btnFate' + (hole_index + 1)].enabled) {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate' + (hole_index + 1)]);
                        if (this.isHaveTip() == true)
                            this._reuse_button(ui['btnFate' + (hole_index + 1)], true, true, false, 1, 0.7, false, false);
                        this.addOnceEvent(ui['btnFate' + (hole_index + 1)]);
                    }
                    else {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['imgFate' + (hole_index + 1)]);
                        if (this.isHaveTip() == true)
                            this._reuse_button(ui['imgFate' + (hole_index + 1)], true, true, false, 1, 0.7, false, false);
                        this.addOnceEvent(ui['imgFate' + (hole_index + 1)]);
                    }
                }
                else {
                    this.setOperateTeachStep(15);
                }
            }
            else if (curStep_ == 13) {
                Teach.addMask();
                var scene = zj.Game.UIManager.topScene();
                var ui_7 = scene.getChildByName("detail");
                if (ui_7 == null || ui_7.alpha != 1) {
                    Teach.needIsEndAni = true;
                    return;
                }
                setTimeout(function () {
                    zj.Game.UIManager.setMaskAttachedTapObj(ui_7['btnActive']);
                    if (Teach.isHaveTip() == true)
                        Teach._reuse_button(ui_7['btnActive'], true, true, false, 1, 0.7, false, false);
                    Teach.addOnceEvent(ui_7['btnActive']);
                }, 200);
            }
            else if (curStep_ == 14) {
                this.addOperateTeachStep();
            }
            else if (curStep_ == 15) {
                this.ProcTeachStory();
                if (zj.Story.isFinish()) {
                    zj.Story.bFinish = false;
                    this.addOperateTeachStep();
                }
            }
            else if (curStep_ == 16) {
                this.SaveTeachPart();
                Teach.SaveTeachPartLocal();
                this.addOperateTeachStep();
            }
            else if (curStep_ == 17) {
                Teach.addMask();
                var ui_8 = zj.Game.UIManager.topScene(); //HunterMainScene
                setTimeout(function () {
                    zj.Game.UIManager.setMaskAttachedTapObj(ui_8['btnClose']);
                    if (Teach.isHaveTip() == true)
                        Teach._reuse_button(ui_8['btnClose'], true, true, false, 1, 0.7, false, false);
                    Teach.addOnceEvent(ui_8['btnClose']);
                }, 200);
            }
            else if (curStep_ == 18) {
                this.addOperateTeachStep();
            }
            else if (curStep_ == 19) {
                var ui_9 = zj.Game.UIManager.topScene(); //HunterMainScene
                setTimeout(function () {
                    zj.Game.UIManager.setMaskAttachedTapObj(ui_9['btnClose']);
                    if (Teach.isHaveTip() == true)
                        Teach._reuse_button(ui_9['btnClose'], true, true, false, 1, 0.7, false, false);
                    Teach.addOnceEvent(ui_9['btnClose']);
                }, 100);
            }
            else if (curStep_ == 20) {
                // Teach.addOperateTeachStep();
                Teach.removeMask();
                // Teach.EndCurPart(false);
                // while (Game.UIManager.sceneCount() > 1) Game.UIManager.popScene();
                // Game.UIManager.GroupTeachUI.removeChildren();
                zj.SceneManager.instance.ReEnterMainCityNew();
                // Game.UIManager.popAllScenesAndDialogs();
                Teach.setOperateTeachStep(23);
            }
            else if (curStep_ == 21) {
                Teach.addMask();
                var _a = this.GetDstUI([zj.SceneManager.adventureClassStr, zj.SceneManager.mainCityClassStr]), ui_10 = _a[0], bLoading = _a[1];
                if (bLoading) {
                    Teach.openSceneName = zj.SceneManager.adventureClassStr || zj.SceneManager.mainCityClassStr;
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                var topUI_2 = zj.Game.UIManager.topScene();
                if (zj.SceneManager.instance.isAdventureScene() || egret.getQualifiedClassName(ui_10) == "zj.HunterMainScene") {
                    topUI_2['topShadow'].visible = true;
                    ui_10['SetMapCanTouch'](false);
                    ui_10['btnCloseTop'].enabled = false;
                    egret.Tween.get(ui_10).wait(450).call(function () {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true)
                            Teach._reuse_button(ui_10['imgMapSelect1'], true, true, false, 1, 0.7, false, false, true);
                    }).wait(300).call(function () {
                        topUI_2['topShadow'].visible = false;
                    });
                    // ui.once(egret.TouchEvent.TOUCH_TAP, () => {
                    //     Teach.delTouchTipSpx();
                    // }, null)
                    Teach.openUiName = "zj.HXH_InstanceDialog";
                    return;
                }
                else {
                    // this.setOperateTeachStep(22);
                    Teach.removeMask();
                    Teach.setOperateTeachStep(23);
                }
            }
            else if (curStep_ == 22) {
                var adven = zj.Game.UIManager.topScene();
                if (zj.SceneManager.instance.isAdventureScene(adven)) {
                    adven['SetMapCanTouch'](true);
                    adven['btnCloseTop'].enabled = true;
                }
                this.addOperateTeachStep();
            }
            else if (curStep_ == 23) {
                Teach.removeMask();
                this.EndCurPart(false);
            }
        };
        /**进入贪婪之岛 */
        Teach.GoWonderland = function (curStep_, bTeach, bSkip, wonderlandIndex, curPart_) {
            zj.SceneManager.teachId = wonderlandIndex;
            if (curStep_ < 4) {
                Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3, "zj.WonderLandChoose", "btnGreedyIsland", "rectGreedyIsland");
            }
            else if (curStep_ == 4) {
                var _a = Teach.GetDstUI("zj.WonderLandChoose"), ui = _a[0], bLoading = _a[1];
                if (bLoading) {
                    Teach.openDialogName = "zj.WonderLandChoose";
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                Teach.setOperateTeachStep(7);
            }
            else if (curStep_ == 5) {
                Teach.addMask();
                var ui = zj.Game.UIManager.topScene();
                if (egret.getQualifiedClassName(ui) != "zj.WonderlandScene") {
                    Teach.openSceneName = "zj.WonderlandScene";
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                Teach.ProcTeachStory();
                if (zj.Story.isFinish()) {
                    zj.Story.bFinish = false;
                    Teach.addOperateTeachStep();
                }
            }
            else if (curStep_ == 6) {
                var ui = zj.Game.UIManager.topScene();
                var button_name = null;
                if (bTeach == true) {
                    button_name = ui['SetTeach'](wonderlandIndex);
                }
                var btn = null;
                if (button_name == "groupZone1") {
                    btn = "rectClick1_2";
                }
                else if (button_name == "groupZone2") {
                    btn = "rectClick2_2";
                }
                else if (button_name == "groupZone5") {
                    btn = "rectClick5_2";
                }
                Teach.removeMask();
                if (Teach.isHaveTip() == true)
                    Teach._reuse_button(ui[button_name], true, true, false, 1, 0.6, false, false, true);
                Teach.addOnceEvent(ui[button_name]);
            }
            else if (curStep_ == 7) {
                Teach.SaveTeachPart(true);
                Teach.SaveTeachPartLocal(zj.Game.TeachSystem.curPart);
                Teach.EndCurPart(bSkip);
                zj.SceneManager.teachId = null;
            }
        };
        /**引导上阵的时候帮助索引可上阵武将 */
        Teach.GetGeneralIndexToFormat = function (uiWindow, ignoreIDs, preferIDs, itemlist) {
            if (ignoreIDs instanceof Array) {
            }
            else {
                if (ignoreIDs == null) {
                    ignoreIDs = [];
                }
                else {
                    ignoreIDs = [ignoreIDs];
                }
            }
            for (var _i = 0, _a = zj.HelpUtil.GetKV(zj.CommonConfig.general_limit_use_ids); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                ignoreIDs.push(v);
            }
            if (preferIDs instanceof Array) {
            }
            else {
                if (preferIDs == null) {
                    preferIDs = [];
                }
                else {
                    preferIDs = [preferIDs];
                }
            }
            var ret = false;
            var idx = -1;
            //判断是否有多余武将
            var formatChoose = ["generals", "reserves", "supports"];
            var suffix = formatChoose[0];
            if (zj.Game.PlayerFormationSystem.HaveMoreGeneral(uiWindow, [suffix], null)[0] == false) {
                return [ret, idx];
            }
            var tblGeneral = itemlist;
            for (var i = 0; i < tblGeneral.length; i++) {
                if (tblGeneral[i] != null
                    && zj.Table.VIn(ignoreIDs, zj.PlayerHunterSystem.GetGeneralId(tblGeneral[i].data.generalId)) == false
                    && zj.Table.VIn(preferIDs, zj.PlayerHunterSystem.GetGeneralId(tblGeneral[i].data.generalId)) == true
                    && zj.Game.PlayerFormationSystem.bUsed(tblGeneral[i].data.generalId) == -1) {
                    ret = true;
                    idx = i;
                    return [ret, idx];
                }
            }
            for (var i = 0; i < tblGeneral.length; i++) {
                if (tblGeneral[i] != null
                    && zj.Table.VIn(ignoreIDs, zj.PlayerHunterSystem.GetGeneralId(tblGeneral[i].data.generalId)) == false
                    && zj.Game.PlayerFormationSystem.bUsed(tblGeneral[i].data.generalId) == -1) {
                    ret = true;
                    idx = i;
                    return [ret, idx];
                }
            }
            return [ret, idx];
        };
        /**副本区域解锁动画 */
        Teach.AddAreaAnimation = function (curStep_, graph_id) {
            if (curStep_ < 6) {
                if (zj.SceneManager.instance.isAdventureScene()) {
                    var ui = zj.Game.UIManager.topScene();
                    if (ui['groupDialog'].numChildren != 0 && ui['groupDialog'].alpha == 1) {
                        ui['closeSceneFun']();
                    }
                    Teach.setOperateTeachStep(6);
                }
                else if (zj.SceneManager.instance.isMainCityScene()) {
                    this.LevelUpToInstance(curStep_, null);
                }
            }
            else if (curStep_ == 6) {
                // GameCommon.EventLockTeach(true);
                if (graph_id <= 105) {
                    zj.loadUI(zj.Common_AnimationB)
                        .then(function (dailog) {
                        dailog.LoadAni(graph_id);
                        dailog.show();
                    });
                    this.addOperateTeachStep();
                }
                else {
                    zj.Game.TeachSystem.playAreaAnimate = true;
                    this.setOperateTeachStep(8);
                }
                this.SaveTeachPart();
                Teach.SaveTeachPartLocal();
            }
            else if (curStep_ == 7) {
                Teach.removeMask();
                var _a = this.GetDstUI("zj.Common_AnimationB"), top_3 = _a[0], bLoading = _a[1];
                if (bLoading) {
                    Teach.openDialogName = "zj.Common_AnimationB";
                    return;
                }
            }
            else if (curStep_ == 8) {
                Teach.removeMask();
                if (zj.Game.TeachSystem.playAreaAnimate == true) {
                    // GameCommon.EventLockTeach(true);
                    var _b = this.GetDstUI(zj.SceneManager.adventureClassStr), top_4 = _b[0], bLoading = _b[1];
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = "zj.Common_AnimationB";
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Game.TeachSystem.playAreaAnimate = false;
                    if (zj.Game.PlayerInstanceSystem.GetAreaComplete(zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID)) {
                        top_4['TeachNewAreaUnLockAni'](zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID + 1);
                    }
                    else {
                        top_4['TeachNewAreaUnLockAni'](zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID);
                    }
                    this.addOperateTeachStep();
                }
                else {
                    Teach.needIsEndAni = true;
                    return;
                }
            }
            else if (curStep_ == 9) {
                Teach.removeMask();
                var _c = this.GetDstUI(zj.SceneManager.adventureClassStr), ui = _c[0], bLoading = _c[1];
                if (bLoading) {
                    Teach.removeMask();
                    Teach.closeDialogName = "zj.Common_AnimationB";
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                // if (ui['topShadow'].visible == false) {
                if (ui['isAniEnd'] == true) {
                    if (zj.Game.PlayerInstanceSystem.GetAreaComplete(zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID)) {
                        if (ui['imgFlag_' + zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID + 1] != null) {
                            ui['imgFlag_' + zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID + 1].visible = true;
                        }
                    }
                    else {
                        if (ui['imgFlag_' + zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID] != null) {
                            ui['imgFlag_' + zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID].visible = true;
                        }
                    }
                    ui['init']();
                    Teach.SaveTeachPartLocal();
                    this.EndCurPart(true);
                }
                else {
                    Teach.needIsEndAni = true;
                    return;
                }
            }
        };
        /**战斗暂停 */
        Teach.PauseAddStep = function () {
            var scene = zj.Game.UIManager.topScene();
            scene['pauseAll']();
            this.addOperateTeachStep();
        };
        /**恢复 */
        Teach.ResumeAddStep = function () {
            var scene = zj.Game.UIManager.topScene();
            scene['resumeAll']();
            this.addOperateTeachStep();
        };
        Teach.CheckTeachName = function () {
            if (this.m_bOpenTeach == false)
                return;
            if (this.isDone(zj.teachBattle.teachPartID_NAME) == false && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.modifyName == 0) {
                this.SetTeachPart(zj.teachBattle.teachPartID_NAME);
            }
        };
        Teach.CheckAndSetTeach = function (teachID) {
            // 改名
            if (this.m_bOpenTeach == false)
                return;
            if (Teach.isDone(teachID) == false) {
                Teach.SetTeachPart(teachID);
            }
        };
        /**检测指定教学 并设置教学 */
        Teach.CheckDstTeach = function (teachID, nodeOrStageID) {
            if (zj.Game.TeachSystem.curPart != -1)
                return; // 是否在教学中
            var part = this.isTeach(nodeOrStageID);
            if (part == teachID) {
                this.SetTeachPart(teachID);
            }
        };
        /**检测教学是否满足条件 */
        Teach.IsTeachReady = function (nodeOrStageID) {
            var ret = false;
            if (zj.Game.TeachSystem.curPart == -1 && this.isTeach(nodeOrStageID) != -1) {
                ret = true;
            }
            return ret;
        };
        /**调试教学 从登陆信息中删除指定教学步骤 */
        Teach.DebugHelper = function (parts) {
            if (parts == null) {
                parts = [];
            }
            var teachDelete = [];
            for (var i = 0; i < zj.Game.PlayerMissionSystem.tableLength(this.nServerPart); i++) {
                var v = this.nServerPart[i].part;
                if (zj.Table.VIn(parts, v)) {
                    teachDelete.push(i);
                }
            }
            // 逆序删除
            for (var i = teachDelete.length; i >= 0; i--) {
                this.nServerPart.splice(i, 1);
            }
        };
        /**是否在新手中 或马上会进入新手 */
        Teach.BeInTeaching = function () {
            var teach = this.IsTeachReady(null);
            if ((teach || this.bInTeaching) && this.m_bOpenTeach) {
                return true;
            }
            else {
                return false;
            }
        };
        /**武将升星新手条件 */
        Teach.GeneralUpStarTeach = function () {
            var _teachID = 2005;
            if (zj.Game.UIManager.topScene() == null)
                return;
            if (zj.Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND &&
                zj.PlayerItemSystem.Count(40032) >= 20 &&
                zj.Game.PlayerHunterSystem.HasIncreaseStar() &&
                (zj.SceneManager.instance.isMainCityScene() || zj.SceneManager.instance.isAdventureScene()) &&
                zj.Game.PlayerInstanceSystem.isJumpToInstance) {
                this.CheckAndSetTeach(_teachID);
            }
        };
        /**判断是否已经聚焦 如果是就不再重复添加 */
        Teach.isHaveTip = function () {
            var nameArr = [(zj.ConstantConfig_Teach.Tag.LayerUp).toString(),
                (zj.ConstantConfig_Teach.Tag.LayerDown).toString(),
                (zj.ConstantConfig_Teach.Tag.LayerLeft).toString(),
                (zj.ConstantConfig_Teach.Tag.LayerRight).toString()];
            if (zj.Game.UIManager.GroupTeachUI.getChildByName(nameArr[0]) == null
                && zj.Game.UIManager.GroupTeachUI.getChildByName(nameArr[1]) == null
                && zj.Game.UIManager.GroupTeachUI.getChildByName(nameArr[2]) == null
                && zj.Game.UIManager.GroupTeachUI.getChildByName(nameArr[3]) == null) {
                return true;
            }
            else {
                return false;
            }
        };
        Teach.loadTeach = function (nodeOrStageID) {
            Teach.checkTeachId(nodeOrStageID);
        };
        Teach.proOperateTeach = function () {
            Teach.nOperateTeachFrame = Teach.nOperateTeachFrame + 1;
        };
        Teach.procTeach = function () {
            var nodeOrStageID = zj.TeachSystem.nodeOrStageID;
            if (this.m_bOpenTeach == false) {
                return;
            }
            if (this.bFirstTeachUpdata) {
                var part = this.isTeach(nodeOrStageID);
                if (part != -1) {
                    this.bFirstTeachUpdata = false;
                }
                if (-1 != part) {
                    this.nOperateTeachFrame = 0;
                    this.bStopTeachUpdata = false;
                    this.bTeachUpdata = true;
                    this.bInTeaching = true;
                    zj.Game.TeachSystem.curPart = part;
                    zj.Game.PlayerFormationSystem.saveFrom = [];
                }
                else {
                    this.bTeachUpdata = false;
                    this.bInTeaching = false;
                    zj.Game.TeachSystem.curPart = -1;
                    return;
                }
            }
            if (this.bTeachUpdata && this.bStopTeachUpdata == false) {
                this.DoOperateTeach();
            }
            if (this.bAsyncContinue) {
                Teach.bAsyncContinue = false;
                this.addTeaching();
            }
        };
        /**添加遮罩 执行下一步操作时自动移除 */
        Teach.addMask = function () {
            if (Teach.isMask == false) {
                // zj.Game.UIManager.maskAllUIs();
                Teach.isMask = true;
            }
        };
        Teach.removeMask = function () {
            if (Teach.isMask) {
                zj.Game.UIManager.unmaskAllUIs();
                Teach.isMask = false;
            }
        };
        /**添加一次临时监听 点击按钮增加步骤 */
        Teach.addOnceEvent = function (obj) {
            obj.once(egret.TouchEvent.TOUCH_TAP, function () {
                // Teach.delTouchTipSpx();
                Teach.addOperateTeachStep();
            }, null);
        };
        Teach.showScene = function (ev) {
            if (Teach.openSceneName == ev.data.typeName) {
                if (Teach.isNeedOpenAddStep) {
                    Teach.openSceneName = "";
                    Teach.isNeedOpenAddStep = true;
                    Teach.addOperateTeachStep();
                    return;
                }
                else {
                    Teach.openSceneName = "";
                    Teach.isNeedOpenAddStep = true;
                    Teach.DoOperateTeach();
                    return;
                }
            }
        };
        Teach.showDialog = function (ev) {
            if (typeof Teach.openDialogName == "string") {
                if (Teach.openDialogName == ev.data.typeName) {
                    if (Teach.isNeedOpenAddStep) {
                        Teach.openDialogName = null;
                        Teach.isNeedOpenAddStep = true;
                        Teach.addOperateTeachStep();
                        return;
                    }
                    else {
                        Teach.openDialogName = null;
                        Teach.isNeedOpenAddStep = true;
                        Teach.DoOperateTeach();
                        return;
                    }
                }
            }
            else if (Teach.openDialogName instanceof Array) {
                if (Teach.openDialogName.indexOf(ev.data.typeName) != -1) {
                    if (Teach.isNeedOpenAddStep) {
                        Teach.openDialogName = null;
                        Teach.isNeedOpenAddStep = true;
                        Teach.addOperateTeachStep();
                        return;
                    }
                    else {
                        Teach.openDialogName = null;
                        Teach.isNeedOpenAddStep = true;
                        Teach.DoOperateTeach();
                        return;
                    }
                }
            }
        };
        Teach.showUi = function (ev) {
            if (Teach.openUiName == ev.data.typeName) {
                if (Teach.isNeedOpenAddStep) {
                    Teach.openUiName = "";
                    Teach.isNeedOpenAddStep = true;
                    Teach.addOperateTeachStep();
                    return;
                }
                else {
                    Teach.openUiName = "";
                    Teach.isNeedOpenAddStep = true;
                    Teach.DoOperateTeach();
                    return;
                }
            }
        };
        Teach.isEndAnimation = function (ev) {
            if (Teach.needIsEndAni === ev.data.isAni) {
                Teach.needIsEndAni = false;
                Teach.DoOperateTeach();
                return;
            }
        };
        Teach.closeScene = function (ev) {
            if (Teach.closeSceneName == ev.data.typeName) {
                if (Teach.isNeedCloseAddStep) {
                    Teach.closeSceneName = "";
                    Teach.isNeedCloseAddStep = true;
                    Teach.addOperateTeachStep();
                    return;
                }
                else {
                    Teach.closeSceneName = "";
                    Teach.isNeedCloseAddStep = true;
                    Teach.DoOperateTeach();
                    return;
                }
            }
        };
        Teach.closeDialog = function (ev) {
            if (Teach.closeDialogName == ev.data.typeName) {
                if (Teach.isNeedCloseAddStep) {
                    Teach.closeDialogName = "";
                    Teach.isNeedCloseAddStep = true;
                    Teach.addOperateTeachStep();
                    return;
                }
                else {
                    Teach.closeDialogName = "";
                    Teach.isNeedCloseAddStep = true;
                    Teach.DoOperateTeach();
                    return;
                }
            }
        };
        Teach.closeUi = function (ev) {
            if (Teach.closeUiName == ev.data.typeName) {
                if (Teach.isNeedCloseAddStep) {
                    Teach.closeUiName = "";
                    Teach.isNeedCloseAddStep = true;
                    Teach.addOperateTeachStep();
                    return;
                }
                else {
                    Teach.closeUiName = "";
                    Teach.isNeedCloseAddStep = true;
                    Teach.DoOperateTeach();
                    return;
                }
            }
        };
        Teach.showFightUi = function (ev) {
            if (Teach.openFightUiName == ev.data.typeName) {
                Teach.openFightUiName = "";
                Teach.DoOperateTeach();
                return;
            }
        };
        Teach.skillIsOk = function (ev) {
            if (Teach.skillCdEnd === ev.data.isOk) {
                Teach.skillCdEnd = false;
                Teach.DoOperateTeach();
                return;
            }
        };
        Teach.dialogCount = function (ev) {
            if (Teach.num_dialog == ev.data.count) {
                Teach.num_dialog = null;
                Teach.DoOperateTeach();
                return;
            }
        };
        Teach.getMoudleSize = function (ev) {
            if (Teach.isNeedMoudleSize == ev.data.isGetSize) {
                Teach.isNeedMoudleSize = false;
                Teach.DoOperateTeach();
                return;
            }
        };
        Teach.checkTeachId = function (nodeId) {
            if (Teach.isDone(1011))
                return;
            var part = Teach.isTeach(nodeId).toString();
            if (part != "-1" && !Teach.isDone(Number(part)) && Teach.teachingNow == false) {
                console.log("——————————————————新手引导触发:  " + part + "——————————————————————");
                zj.Game.EventManager.event(zj.GameEvent.START_NEW_TEACHING, { curPart: Number(part) });
            }
        };
        /**
         * 点击增加步骤
         * @param obj 点击的对象
         * @param isHideSpx 是否删除新手选中框
         */
        Teach.addStepAndRemoveMask = function (obj, isHideSpx) {
            obj.once(egret.TouchEvent.TOUCH_TAP, function () {
                if (isHideSpx)
                    zj.Game.EventManager.event(zj.GameEvent.CLEAR_TIP_SPX);
                Teach.addOperateTeachStep();
            }, null);
        };
        /**是否开启教学 */
        Teach.m_bOpenTeach = false;
        /**第一帧判断是否操作教学 */
        Teach.bFirstTeachUpdata = true;
        /**持续教学更新 */
        Teach.bTeachUpdata = false;
        /**不再处理教学脚本 */
        Teach.bStopTeachUpdata = false;
        /**操作教学进行到哪个部分 */
        Teach.nOperateTeachPart = -1;
        /**操作教学部分步骤 */
        Teach.nOperateTeachStep = 0;
        /**操作教学帧计数 */
        Teach.nOperateTeachFrame = 0;
        /**限制操作 */
        Teach.bLimitOperate = false;
        /**7种操作，true允许，false不允许 */
        Teach.bFixOperate = [true, true, true, true, true, true, true, true];
        /**是否屏蔽全部角色的update */
        Teach.bCancelAllUpdata = false;
        /**是否屏蔽怪的update */
        Teach.bCancelMonsterUpdata = false;
        /**spx */
        Teach.m_apGo = null;
        /**gogo所属layer */
        Teach.gogoRootNode = null;
        /**处于教学中的操作 */
        Teach.isTeaching = false;
        /**自动隐藏小手提示 */
        Teach.bAutoVisible = false;
        /**是否在教学中 */
        Teach.bInTeaching = false;
        /**服务器保存的教学步骤 */
        Teach.nServerPart = [];
        /**技能结束跳下一步标记 */
        Teach.bSkillEnd = false;
        /**跳起到一半的时候就中断 */
        Teach.bJumpHalf = false;
        /**1-2门教学 */
        Teach.bDoorTeach = false;
        Teach.ani_doorTeach = null;
        /**教学到大地图 */
        Teach.TeachtoMap = false;
        /**提示地图未开启 */
        Teach.bLockDoorTip = false;
        /**异步addTeaching */
        Teach.bAsyncContinue = false;
        /**原始的子节点 */
        Teach.origChild = null;
        /**临时层节点 */
        Teach.tmpLayer = null;
        Teach.isMask = false;
        Teach.generals = [];
        Teach.nServerPartLocal = [];
        Teach.isShowHunter = false;
        Teach.hand = null;
        Teach.teachingNow = false;
        Teach.waitTimer = 1000;
        /////////////////////////////////////////////////////////////////
        /**
         * [_reuse_button]
         * @param {boolean} force       [true]  [是否强制引导，现在无用，一般传true]
         * @param {boolean} bDialog     [true]  [是否有对话提示]
         * @param {boolean} bBtnEnabled [false] [最外层的按钮是否可用，可用的时候会屏蔽界面原按钮]
         * @param {number}  index       [0]     [动画序号]
         * @param {number}  opacity     [140]   [透明度]
         * @param {boolean} bmirror             小手动画是否翻转
         * @param {boolean} moveXHalf           小手动画是否移动
         * @param {boolean} isHideMask?         是否移除UIManager遮罩 null || false不移除 true移除
         * @param {Array<number>} scale [1, 1]  node缩放大小
         *
         * if index >= 0 and index <= 2 then
         *    美术编辑的动画，直接播
         *    0:手点击，带圆圈
         *    1:只有圆圈
         *    2:手滑动
         *    3:大圆圈聚焦
         *    4:只有手点击
         * else
         *    代码拼接的动画，矩形聚焦
         *    3:只有矩形聚焦，无手点击
         *    4:矩形聚焦，右手点击
         */
        Teach.reloadCount = 0;
        Teach.LastTeach = 0;
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////事件回调方法////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 哪需要哪赋值
        Teach.openSceneName = null;
        Teach.openUiName = null;
        Teach.openFightUiName = null;
        Teach.closeSceneName = null;
        Teach.closeDialogName = null;
        Teach.closeUiName = null;
        Teach.needIsEndAni = false;
        Teach.isNeedOpenAddStep = true; // 打开界面或Dialog时是否需要增加步骤 默认未true
        Teach.isNeedCloseAddStep = true; // 关闭界面或dialog时是否需要增加步骤 默认未true
        Teach.skillCdEnd = false; // 新手引导技能cd是否完成
        Teach.isOpenWaitingUi = true; // 现在是否有转圈UI
        return Teach;
    }());
    zj.Teach = Teach;
    __reflect(Teach.prototype, "zj.Teach");
})(zj || (zj = {}));
//# sourceMappingURL=Teach.js.map