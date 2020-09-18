namespace zj {
    /**
     * 新手引导
     * created by Lian Lei
     * 2019.03.24
     */
    export class Teach {
        /**是否开启教学 */
        public static m_bOpenTeach = false;
        /**第一帧判断是否操作教学 */
        public static bFirstTeachUpdata = true;
        /**持续教学更新 */
        public static bTeachUpdata = false;
        /**不再处理教学脚本 */
        public static bStopTeachUpdata = false;
        /**操作教学进行到哪个部分 */
        public static nOperateTeachPart = -1;
        /**操作教学部分步骤 */
        public static nOperateTeachStep = 0;
        /**操作教学帧计数 */
        public static nOperateTeachFrame = 0;
        /**限制操作 */
        public static bLimitOperate = false;
        /**7种操作，true允许，false不允许 */
        public static bFixOperate = [true, true, true, true, true, true, true, true];
        /**是否屏蔽全部角色的update */
        public static bCancelAllUpdata = false;
        /**是否屏蔽怪的update */
        public static bCancelMonsterUpdata = false;
        /**spx */
        public static m_apGo = null;
        /**gogo所属layer */
        public static gogoRootNode: eui.Group = null;
        /**处于教学中的操作 */
        public static isTeaching = false;
        /**自动隐藏小手提示 */
        public static bAutoVisible = false;
        /**是否在教学中 */
        public static bInTeaching = false;
        /**服务器保存的教学步骤 */
        public static nServerPart: Array<message.TeachItem> = [];
        /**技能结束跳下一步标记 */
        public static bSkillEnd = false;
        /**跳起到一半的时候就中断 */
        public static bJumpHalf = false;
        /**1-2门教学 */
        public static bDoorTeach = false;
        public static ani_doorTeach = null;
        /**教学到大地图 */
        public static TeachtoMap = false;
        /**提示地图未开启 */
        public static bLockDoorTip = false;
        /**异步addTeaching */
        public static bAsyncContinue = false;
        /**原始的子节点 */
        public static origChild = null;
        /**临时层节点 */
        public static tmpLayer = null;

        private _ID_ZHAOYUN = 10001;
        private _ID_DIAOCHAN = 10003;
        private _ID_MACHAO = 10010;
        private _ID_HUATUO = 10016;

        public static isMask: boolean = false;
        public static generals: Array<number> = [];

        public static nServerPartLocal: Array<message.TeachItem> = [];
        public static isShowHunter: boolean = false;

        public static hand: dragonBones.EgretArmatureDisplay = null;
        public static teachingNow: boolean = false;
        public static waitTimer: number = 1000;

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
        public static reloadCount: number = 0;
        public static _reuse_button(node: egret.DisplayObject, force: boolean, bDialog: boolean, bBtnEnabled: boolean,
            index: number, opacity: number, bmirror: boolean, moveXHalf: boolean, isHideMask?: boolean, isClickAnyWherw?: boolean, scale: Array<number> = [1, 1]) {

            let [x, y, w, h] = [0, 0, 0, 0];
            x = Math.floor(node.localToGlobal().x - zj.Game.UIManager.x);
            w = Math.floor(node.width * scale[0]);
            y = Math.floor(node.localToGlobal().y - zj.Game.UIManager.y);
            h = Math.floor(node.height * scale[1]);

            if (w == 0 || h == 0) {
                console.log("——————————————————新手引导选中区域:  " + "return " + "w: " + w + " " + "h: " + h + " " + "——————————————————————");
                Teach.reloadTeach();
                return;
            }

            if (this.origChild == null) this.origChild = node;
            console.log("——————————————————新手引导选中区域:  " + "goon " + "x: " + x + " " + "y: " + y + " " + "w: " + w + " " + "h: " + h + "" + "——————————————————————");
            this.setTouchTipSprite(x, y, w, h, force, bDialog, bBtnEnabled, index, opacity, bmirror, moveXHalf, isClickAnyWherw);
            this.reloadCount = 0;
            this.setStopTeachUpdata(true);
            if (force != false) this.setTeaching(true);

            if (isHideMask) Teach.removeMask();
            if (!isHideMask) Teach.addMask();
        }

        public static reloadTeach() {
            if (Teach.reloadCount < 10) {
                Teach.reloadCount++;
                console.log("+++++++++++++++++++新手引导等待次数+++++++++++++++++" + Teach.reloadCount);
                egret.setTimeout(function () { Teach.DoOperateTeach(); }, this, Teach.waitTimer);
            } else {
                Teach.reloadCount = 0;
                Teach.delTouchTipSpx();
                Teach.removeMask();
            }
        }

        public static _reuse_rect(rect, force?: boolean, bDialog?: boolean, bBtnEnabled?: boolean,
            index?: number, opacity?: number, bmirror?: boolean, moveXHalf?: boolean, isHideMask?: boolean, isClickAnyWhere?: boolean) {
            this.setTouchTipSprite(rect.x, rect.y, rect.width, rect.height, force, bDialog, bBtnEnabled, index, opacity, bmirror, moveXHalf, isClickAnyWhere);
            this.setStopTeachUpdata(true);
            if (force != false) this.setTeaching(true);

            if (isHideMask) Teach.removeMask();

            if (!isHideMask) Teach.addMask();
        }

        /**微调 */
        public static _reuse_ajust(rctNode: eui.Group, deltaX: number, deltaY: number, deltaW: number, deltaH: number, zNode) {
            let dtX = deltaX != null ? deltaX : 0;
            let dtY = deltaY != null ? deltaY : 0;
            let dtW = deltaW != null ? deltaW : 0;
            let dtH = deltaH != null ? deltaH : 0;
            let x = rctNode.localToGlobal().x - zj.Game.UIManager.x;
            let y = rctNode.localToGlobal().y;
            let w = rctNode.width;
            let h = rctNode.height;
            if (zNode != null) {
                this.origChild = rctNode;
            }
            else {
                this.origChild = zNode;
            }
            this._reuse_rect(rctNode);
        }

        /**判断是否进入教学 */
        public static isTeach(nodeID: number) {
            let _teach: { [key: string]: TableTeach } = TableTeach.Table();
            let len = TableTeach.tableLength;//zj.Game.PlayerMissionSystem.tableLength(_teach);
            for (let i = 1; i <= len; i++) {
                if ((this.isDone(_teach[i].part) == false && this.isDone2(_teach[i].part) == false) && this.teachConditionsByIndex(nodeID, i)) {
                    return _teach[i].part;
                }
            }
            return -1;
        }

        public static LastTeach: number = 0;
        /**
         * 教学是否已经完成了(服务器保存)
         * @param part {number} 新手引导任务ID
         */
        public static isDone(part: number): boolean {
            let len = this.nServerPart.length;
            for (let i = 0; i < len; i++) {
                if (this.nServerPart[i].part == part) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 教学是否已经完成(前端保存)
         */
        public static isDone2(part: number): boolean {
            let len = this.nServerPartLocal.length;
            for (let i = 0; i < len; i++) {
                this.LastTeach = this.nServerPartLocal[i].part;
                if (this.nServerPartLocal[i].part == part && Teach.LastTeach == part) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 判断教学步骤是否满足条件
         * @param nodeID {number} 教学步骤ID
         * @param index {number}
         */
        public static teachConditionsByIndex(nodeID: number, index: number) {
            // let _teach: { [key: string]: TableTeach } = TableTeach.Table();
            // // let condition = TableTeach.Item(index).condition;
            // let condition = TeachCondition.condition(index);
            // let stringValue = `return` + condition;
            // TeachCondition.nodeID = nodeID;
            // let ret = condition;
            // if (ret != true) ret = false;
            // return ret;
            TableTeach.Table();
            TeachCondition.nodeID = nodeID;
            if (TeachCondition.condition(index) == true) {
                return true;
            }
            return false;
        }

        public static getDialogContent(idx) {
            return StringConfig_Teach[idx];
        }

        public static getTranByIdx(idx_: number) {
            let temp = idx_ % 10;
            let trans = 0;
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
        }

        public static setTouchTipSpriteVisible(b: boolean) {
            for (let [k, v] of HelpUtil.GetKV(ConstantConfig_Teach.Tag)) {
                let str = v + "";
                let node = zj.Game.UIManager.GroupTeachUI.getChildByName(str);
                if (node) node.visible = b;
            }
        }

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
        public static setTouchTipSprite(x: number, y: number, w: number, h: number, force: boolean, bDialog: boolean,
            bBtnEnabled: boolean, index: number, opacity: number, bmirror: boolean, moveXHalf: boolean, isClickAnyWhere) {
            if (isClickAnyWhere == null) isClickAnyWhere = true;
            let _bDialog: boolean = true;
            let _bBtnEnabled: boolean = false;
            let _index: number = 0;
            if (bDialog != null) _bDialog = bDialog;
            if (bBtnEnabled != null) _bBtnEnabled = bBtnEnabled;
            if (index != null) _index = index;
            let childStrName: string = (ConstantConfig_Teach.Tag.SpxHand).toString();
            let hand = zj.Game.UIManager.GroupTeachUI.getChildByName(childStrName);
            if (hand != null) zj.Game.UIManager.GroupTeachUI.removeChild(hand);

            let lft_: number = Math.floor(x);
            let rgt_: number = Math.floor(x + w);
            let top_: number = Math.floor(y + h);
            let bom_: number = Math.floor(y);
            let scrw_: number = Math.floor(UIManager.StageWidth);
            let scrh_: number = Math.floor(UIManager.StageHeight);

            if (opacity == null) opacity = ConstantConfig_Teach.LayerOpacity;

            if (force == null || force == true) {
                // 上
                let layer = new eui.Rect();
                layer.anchorOffsetX = 0;
                layer.anchorOffsetY = 0;
                layer.x = 0;
                layer.y = top_;
                layer.width = scrw_;
                layer.height = scrh_;
                layer.alpha = opacity;
                zj.Game.UIManager.pushTeachUI(layer)
                layer.name = (ConstantConfig_Teach.Tag.LayerUp).toString();

                // 左
                let layer1 = new eui.Rect();
                layer1.anchorOffsetX = 0;
                layer1.anchorOffsetY = 0;
                layer1.x = 0;
                layer1.y = bom_;
                layer1.width = lft_;
                // layer1.height = scrh_;
                layer1.height = h;
                layer1.alpha = opacity;
                zj.Game.UIManager.pushTeachUI(layer1)
                layer1.name = (ConstantConfig_Teach.Tag.LayerLeft).toString();

                // 右
                let layer2 = new eui.Rect();
                layer2.anchorOffsetX = 0;
                layer2.anchorOffsetY = 0;
                layer2.x = rgt_;
                layer2.y = bom_;
                layer2.width = scrw_ - rgt_;
                layer2.height = h;
                layer2.alpha = opacity;
                zj.Game.UIManager.pushTeachUI(layer2)
                layer2.name = (ConstantConfig_Teach.Tag.LayerLeft).toString();

                // 下
                let layer3 = new eui.Rect();
                layer3.anchorOffsetX = 0;
                layer3.anchorOffsetY = 0;
                layer3.x = 0;
                layer3.y = 0;
                layer3.width = scrw_;
                layer3.height = bom_;
                layer3.alpha = opacity;
                zj.Game.UIManager.pushTeachUI(layer3)
                layer3.name = (ConstantConfig_Teach.Tag.LayerLeft).toString();

                this.bAutoVisible = false;
                this.setTouchTipSpriteVisible(true);

                if (index == 0 && Game.TeachSystem.curPart != 6001 && Game.TeachSystem.curPart != 6003 && isClickAnyWhere) {
                    layer.once(egret.TouchEvent.TOUCH_TAP, () => {
                        Teach.addOperateTeachStep();
                    }, this);
                    layer1.once(egret.TouchEvent.TOUCH_TAP, () => {
                        Teach.addOperateTeachStep();
                    }, this);
                    layer2.once(egret.TouchEvent.TOUCH_TAP, () => {
                        Teach.addOperateTeachStep();
                    }, this);
                    layer3.once(egret.TouchEvent.TOUCH_TAP, () => {
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
                let ani = zj.Game.UIManager.GroupTeachUI.getChildByName(childStrName);
                if (ani != null) zj.Game.UIManager.GroupTeachUI.removeChild(ani);
                let newHand = (_x, _y, _w, _h) => {
                    let currPart = Game.TeachSystem.curPart;
                    let currId = Teach.nOperateTeachStep;
                    if (Teach.hand) {
                        zj.Game.UIManager.GroupTeachHand.removeChildren();
                        Teach.hand = null;
                    }
                    zj.Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", index, 0).then(display => {
                        if (currPart == Game.TeachSystem.curPart && currId == Teach.nOperateTeachStep) {
                            if (Teach.hand) Teach.hand = null;
                            display.touchEnabled = false;
                            Teach.hand = display;
                            Teach.hand.name = childStrName;
                            Teach.hand.x = _x + _w / 2;
                            Teach.hand.y = _y + _h / 2;
                            Teach.hand.touchEnabled = false;
                            zj.Game.UIManager.GroupTeachHand.addChild(Teach.hand);
                            Teach.hand.visible = true;
                        } else {
                            clearSpine(display);
                        }

                    });
                }

                newHand(x, y, w, h);
            }
            else {
                // 代码拼接的动画，矩形聚焦
                // 3:只有矩形聚焦，有手点击
                // 0:矩形聚焦，无手点击

                let ani = zj.Game.UIManager.GroupTeachUI.getChildByName(childStrName);
                if (ani != null) zj.Game.UIManager.GroupTeachUI.removeChild(ani);
                let bHand = _index == 3;
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

            let _getNodePos = (node: eui.Group, x: number, y: number, w: number, h: number, index: number) => {
                if (index == null) index = 0;
                let xRet = 0
                let yRet = 0
                let size = { width: node.width, height: node.height };
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
                    if (y + h + size.height <= UIManager.StageHeight) {
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
                        if (y + h <= UIManager.StageHeight) {
                            // 正左偏上
                            yRet = y + h - size.height;
                            if (yRet < 0) {
                                yRet = 0;
                            }
                        }
                        else {
                            // 正左贴屏幕上方
                            yRet = UIManager.StageHeight - size.height;
                        }
                    }
                    else {
                        // 左侧放不下 贴屏幕左侧
                        xRet = 0;
                        if (y + h + size.height <= UIManager.StageHeight) {
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
            }

            let name = Game.TeachSystem.curPart;
            let ext = Teach.nOperateTeachStep;
            let _isHaveTip = () => {
                return StoryDialog.getItemTip(name, ext);
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
            }

            if (_bDialog != true) return;

            let n: string = (ConstantConfig_Teach.Tag.Dialog).toString();
            let dialog = zj.Game.UIManager.GroupTeachUI.getChildByName(n) as any;
            if (dialog == null) {
                let win = newUI(Dialog_Simple) as Dialog_Simple;
                if (_bBtnEnabled) {
                    win.btnOk.touchEnabled = true;
                }
                else {
                    win.btnOk.touchEnabled = false;
                }
                win.name = (ConstantConfig_Teach.Tag.Dialog).toString();
                zj.Game.UIManager.pushTeachUI(win);
                dialog = win['groupUI'];
                win.touchEnabled = false;
                let [px, py] = _getNodePos(win.NodeBG, x, y, w, h, _index);
                if (moveXHalf) {
                    px = px + win.NodeBG.width / 2;
                }
                win.NodeBG.x = px;
                win.NodeBG.y = py;

                let ret = _isHaveTip();
                if (ret) {
                    win.labelContent.textFlow = Util.RichText(ret.content);
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
                let btn = dialog['btnOk'];
                if (_bBtnEnabled) {
                    btn.touchEnabled = true;
                }
                else {
                    btn.touchEnabled = false;
                }

                // let node = dialog.getChildByName("2");
                let node = dialog['NodeBG'];
                let [px, py] = _getNodePos(node, x, y, w, h, _index);
                node.x = px;
                node.y = py;

                // let text = node.getChildByName("3");
                let text = dialog['labelContent'];
                let ret = _isHaveTip();
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
        }

        public static DoOperateTeach() {
            Teach_diff.OperateTeach(null, Game.TeachSystem.curPart, this.nOperateTeachStep, 0);
        }

        /**教学剧情对话 */
        public static ProcTeachStory() {
            if (Story.bFinish != true) {
                Story.playStory(Game.TeachSystem.curPart, this.nOperateTeachStep);
            }
        }

        /**
         * 手动设置教学步骤ID
         * @param part {number} 教学步骤ID
         */
        public static SetTeachPart(part: number) {
            if (Teach.isDone(1011)) return;
            this.bFirstTeachUpdata = false;
            this.delTouchTipSpx();
            this.nOperateTeachStep = 0;
            this.nOperateTeachFrame = 0;
            this.bStopTeachUpdata = false;
            this.bTeachUpdata = true;
            this.bInTeaching = true;
            console.log("——————————————————新手引导触发:  " + part + "——————————————————————");
            Game.EventManager.event(GameEvent.START_NEW_TEACHING, { curPart: part });
        }

        /**手动跳到下一个教学步骤 */
        public static AddTeachPart() {
            this.bFirstTeachUpdata = true;
            Game.TeachSystem.curPart = Game.TeachSystem.curPart + 1;
            this.cleanTeach();
        }

        public static cleanTeach() {
            Teach.removeMask();
            this.delTouchTipSpx()
            this.setStopTeachUpdata(false)
            this.nOperateTeachStep = 0
            this.nOperateTeachFrame = 0
            this.bTeachUpdata = false
            this.bInTeaching = false
            Teach.teachingNow = false;
            zj.Game.UIManager.GroupStory.removeChildren();
            zj.Game.UIManager.GroupTeachUI.removeChildren();
        }

        public static setFixOperate(lr: boolean, ll: boolean, rc: boolean, rr: boolean, rl: boolean, ru: boolean, rd: boolean, lcc: boolean) {
            this.bFixOperate[ConstantConfig_Teach.Teach_Operate_Left_Part_Right] = lr;
            this.bFixOperate[ConstantConfig_Teach.Teach_Operate_Left_Part_Left] = ll;
            this.bFixOperate[ConstantConfig_Teach.Teach_Operate_Right_Part_Click] = rc;
            this.bFixOperate[ConstantConfig_Teach.Teach_Operate_Right_Part_Right] = rr;
            this.bFixOperate[ConstantConfig_Teach.Teach_Operate_Right_Part_Left] = rl;
            this.bFixOperate[ConstantConfig_Teach.Teach_Operate_Right_Part_Up] = ru;
            this.bFixOperate[ConstantConfig_Teach.Teach_Operate_Right_Part_Down] = rd;
            this.bFixOperate[ConstantConfig_Teach.Teach_Operate_Left_Double_Click] = lcc;// 冲刺
        }

        public static setLimitOperate(limit: boolean) {
            this.bLimitOperate = limit;
        }

        public static setCancelAllUpdata(isallupdata: boolean) {
            this.bCancelAllUpdata = isallupdata;
            let scene = StageSceneManager.Instance.GetCurScene();
            if (scene.tableEnemys == null) return;
            if (isallupdata) {
                for (let i = 0; i < zj.Game.PlayerMissionSystem.tableLength(scene.tableEnemys); i++) {
                    scene.tableEnemys[i].Pause();
                }
                for (let i = 0; i < zj.Game.PlayerMissionSystem.tableLength(scene.tableAllys); i++) {
                    scene.tableAllys[i].Pause()
                }
            }
            else {
                for (let i = 0; i < zj.Game.PlayerMissionSystem.tableLength(scene.tableEnemys); i++) {
                    scene.tableEnemys[i].Resume();
                }
                for (let i = 0; i < zj.Game.PlayerMissionSystem.tableLength(scene.tableAllys); i++) {
                    scene.tableAllys[i].Resume()
                }
            }
        }

        public static setCancelMonsterUpdata(ismonsterupdata: boolean) {
            this.bCancelMonsterUpdata = ismonsterupdata;
        }

        /**教学中根据玩家的操作开始下一步操作 */
        public static addTeaching() {
            if (this.isTeaching) {
                this.isTeaching = false;
                this.addOperateTeachStep();
                // this.DoOperateTeach();
            }
        }

        /**增加步骤(上阵用) */
        public static addTeachingFormation() {
            let isAdd: boolean = ((Game.TeachSystem.curPart == 3002 && (Teach.nOperateTeachStep == 20 || Teach.nOperateTeachStep == 21 || Teach.nOperateTeachStep == 22))
                || (Game.TeachSystem.curPart == 1003 && (Teach.nOperateTeachStep == 13 || Teach.nOperateTeachStep == 14 || Teach.nOperateTeachStep == 15 || Teach.nOperateTeachStep == 16))
                || (Game.TeachSystem.curPart == 8023 && (Teach.nOperateTeachStep == 1 || Teach.nOperateTeachStep == 2 || Teach.nOperateTeachStep == 3 || Teach.nOperateTeachStep == 4)))

            if (isAdd) Teach.addOperateTeachStep();
        }

        /**删除spx */
        public static delTouchTipSpx() {
            zj.Game.UIManager.GroupTeachUI.removeChildren();
            if (Teach.hand) {
                zj.Game.UIManager.GroupTeachHand.removeChildren();
                Teach.hand = null;
            }

            this.bAutoVisible = false;
            this.origChild = null;

            let childStrName: string = (ConstantConfig_Teach.Tag.SpxHand).toString()
            let ani = zj.Game.UIManager.GroupTeachUI.getChildByName(childStrName);
            if (ani != null) {
                zj.Game.UIManager.GroupTeachUI.removeChild(ani);
            }
        }

        public static setDoorTeach(doorteach: boolean) {
            this.bDoorTeach = doorteach;
        }

        public static setStopTeachUpdata(isstop: boolean) {
            this.bStopTeachUpdata = isstop;
        }

        public static getTeachStepFrame(): number {
            return this.nOperateTeachFrame;
        }

        public static setTeachStepFrame(frame) {
            this.nOperateTeachFrame = frame;
        }

        public static addOperateTeachStep() {
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
        }

        public static setOperateTeachStep(step) {
            this.nOperateTeachStep = step
            this.bLimitOperate = false
            this.nOperateTeachFrame = 0
            this.bStopTeachUpdata = false
            Teach.DoOperateTeach();
        }

        /**教学中通过事件进行下一步标志 */
        public static setTeaching(isTeach: boolean) {
            this.isTeaching = isTeach;
        }

        /**将教学步骤保存到服务器 */
        public static SaveTeachPart(bLocal?: boolean, teachPartID?: number) {
            // if (teachPartID == null) teachPartID = this.nOperateTeachPart;
            if (teachPartID == null) teachPartID = Game.TeachSystem.curPart;
            let item = new message.TeachItem();
            item.part = teachPartID;
            item.is_jump = false;

            let bFind = false;
            for (let i = 0; i < this.nServerPart.length; i++) {
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
                    .then((value: any) => {
                        // toast_success("保存成功");
                    })
                    .catch((reason) => {
                        toast_warning(reason);
                    });
            }
        }

        public static SaveTeachPartLocal(teachPartID?: number) {
            if (teachPartID == null) teachPartID = Game.TeachSystem.curPart;
            let item = new message.TeachItem();
            item.part = teachPartID;
            item.is_jump = false;

            let bFind = false;
            for (let i = 0; i < this.nServerPartLocal.length; i++) {
                if (this.nServerPartLocal[i].part == item.part) {
                    bFind = true;
                    break;
                }
            }
            if (bFind == false) {
                this.nServerPartLocal.push(item);
            }
        }

        public static Reset() {
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
            this.nOperateTeachStep = 0
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

            this.delTouchTipSpx()
            // this.CleanOperateTeach()
            // this.clearGo()
            this.EndCurPart(false)
        }

        //////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////// 新手引导辅助方法(教学扩展) ///////////////////////////////
        ///////////////////////////////////// 原Teach_ext.lua ////////////////////////////////////////


        /**结束本次步骤的教学 */
        public static EndCurPart(bContinue: boolean) {
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
            TeachSystem.nodeOrStageID = null;
            this.bFirstTeachUpdata = true;
            // 教学提示
            Tips.SetTipsOfId(Tips.TAG.TEACH);

            zj.Game.TeachSystem.QueryTeach().then((teachItems: Array<message.TeachItem>) => {
                Teach.nServerPart = teachItems;
            });

            // 每个任务结束 去除遮罩
            Teach.removeMask();
            console.log("——————————————————新手引导结束:  " + Game.TeachSystem.curPart + "——————————————————————");
            RolePointTracker.track(30000 + (Game.TeachSystem.curPart * 10) + 1);
            // let num = 30000 + (Game.TeachSystem.curPart * 10) + 1
            // console.log("—————————————————————— 新手引导任务结束打点" + num + "——————————————————————");

            Teach.LastTeach = Game.TeachSystem.curPart;
            Teach.teachingNow = false;
            Game.TeachSystem.curPart = -1;
            Game.EventManager.event(GameEvent.IS_END_LAST_TEACH);
        }


        /**检测UI是否已经可以引导教学 */
        public static GetDstUI(uiNames): [any, boolean] {
            // 和之前的接口统一
            if (typeof uiNames == "string") {
                uiNames = [uiNames];
            }
            let ui: any;
            let aa = zj.Game.UIManager.topDialog();
            if (zj.Game.UIManager.topDialog() == null || zj.Game.UIManager.topDialog() == undefined) {
                ui = zj.Game.UIManager.topScene();
            }
            else {
                ui = zj.Game.UIManager.topDialog()
            }
            let str = egret.getQualifiedClassName(ui)
            if (ui == null || Table.VIn(uiNames, str) == false) {
                return [ui, true];
            }
            return [ui, false];
        }

        public static Dst_Menu(bGrowth: boolean) {
            let uiNames = [SceneManager.mainCityClassStr];
            if (bGrowth == true) {
                uiNames = [SceneManager.mainCityClassStr, SceneManager.adventureClassStr];
            }
            return this.GetDstUI(uiNames);
        }

        public static Dst_Hero() {
            return this.GetDstUI("zj.HunterMainScene")
        }

        public static Dst_BattleEnd() {
            return this.GetDstUI("zj.BattleEnd_Win");
        }

        public static Dst_InstanceNormal() {
            return this.GetDstUI(SceneManager.adventureClassStr);
        }

        public static Dst_InstanceElite() {
            return this.GetDstUI(SceneManager.adventureClassStr);
        }

        public static Dst_Formation() {
            return this.GetDstUI("zj.CommonFormatePveMain");
        }

        public static Dst_BattleMsg() {
            return this.GetDstUI("zj.Battle_MsgPreview");
        }

        /**指定阵上位置上阵武将 */
        public static Format_ClickIdx(index: number, ignoreID: number, preferID: number) {
            let ui: any = zj.Game.UIManager.topDialog();
            let itemlist = zj.Game.PlayerFormationSystem.itemlist;
            for (let i = 0; i < (index - 1 < 0 ? 0 : index - 1); i++) {
                if (itemlist[i] == undefined) {
                    Teach.needIsEndAni = true;
                    return;
                }
            }
            if (egret.getQualifiedClassName(ui) == "zj.CommonFormatePveMain") {
                let item = zj.Game.PlayerFormationSystem.blowGuideFormations;

                let selectedTeam = this.generals[index - 1];

                if (selectedTeam != 0 && selectedTeam != undefined && selectedTeam != null) {
                    this.addOperateTeachStep();
                    return;
                }
                let [ret, idx] = this.GetGeneralIndexToFormat(ui, ignoreID, preferID, itemlist);
                if (ret == false) {
                    this.addOperateTeachStep();
                }
                else {

                    let list = (<eui.List>ui['down']['listBottom']);
                    let xItem = itemlist[idx]['imgFrame'].localToGlobal().x - zj.Game.UIManager.x;
                    let yItem = itemlist[idx]['imgFrame'].localToGlobal().x;
                    let wItem = itemlist[idx]['imgFrame'].width;
                    let hItem = itemlist[idx]['imgFrame'].height;

                    let xList = list.localToGlobal().x - zj.Game.UIManager.x;
                    let yList = list.localToGlobal().y;
                    let wList = list.width;
                    let hList = list.height;

                    if (xItem >= xList + wList || xItem + wItem <= xList || wItem >= xItem) {
                        list.selectedIndex = idx;
                    }

                    let KaiTeIndex: number = -1;
                    for (let i = 0; i < PlayerHunterSystem.GetHunterList().length; i++) {
                        if (PlayerHunterSystem.GetGeneralId(PlayerHunterSystem.GetHunterList()[i]) == 10005) {
                            KaiTeIndex = i;
                            break;
                        }
                    }

                    let space: number;

                    if (Game.TeachSystem.curPart == 8023 && KaiTeIndex != -1 && KaiTeIndex > 11) {
                        space = Math.floor(KaiTeIndex / 12) * list.width;
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
                            if (Teach.isHaveTip() == true) Teach._reuse_button(itemlist[KaiTeIndex], true, true, false, 1, 0.7, false, false, true);
                            console.log("----------------" + "新手引导选中上阵猎人" + "-----------------");
                        }, 500);
                    }
                    else {
                        setTimeout(function () {
                            Teach.removeMask();
                            if (Teach.isHaveTip() == true) Teach._reuse_button(itemlist[idx], true, true, false, 1, 0.7, false, false, true);
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
        }

        public static getItemPosition(id: number, list: eui.List, curPart_: number, rowNum: number, lineNum: number) {
            let itemIndex: number = -1;
            id = PlayerHunterSystem.GetGeneralId(id);
            for (let i = 0; i < PlayerHunterSystem.GetHunterList().length; i++) {
                if (PlayerHunterSystem.GetGeneralId(PlayerHunterSystem.GetHunterList()[i]) == id) {
                    itemIndex = i;
                    break;
                }
            }
            let space: number;

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
        }

        /**战斗结束升级 返回主城 */
        public static BattleLevelUp(curStep_: number) {
            if (curStep_ == 0) {
                let [ui, bLoading] = this.Dst_BattleEnd();
                if (bLoading) return true;
                if (zj.Game.PlayerInstanceSystem.canSyncLevel == true) {
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonGoOn']);
                    if (this.isHaveTip() == true) this._reuse_button(ui['ButtonGoOn'], true, true, false, 0, 0.7, false, true);
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
        }

        /**主城操作（扫荡副本 任务完成）升级，返回主城 */
        public static CityLevelUp(curStep_: number, bGrowth: boolean) {
            if (curStep_ == 0) {
                Teach.addMask();
                let ui: any = zj.Game.UIManager.topScene();
                let uiNames = [SceneManager.mainCityClassStr];
                if (bGrowth == true) {
                    uiNames = [SceneManager.mainCityClassStr, SceneManager.adventureClassStr];
                }
                if (ui == null || Table.VIn(uiNames, egret.getQualifiedClassName(ui)) == false) {
                    this.setStopTeachUpdata(true);
                    this.setTeaching(true);
                    zj.Game.UIManager.popAllScenesAndDialogs(() => {
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
                let [ui, bLoading] = this.Dst_Menu(bGrowth);
                if ((SceneManager.instance.isMainCityScene() || SceneManager.instance.isAdventureScene()) && Game.UIManager.topDialog() == null) {
                    this.addOperateTeachStep();
                }
                else {
                    Teach.removeMask();
                    Teach.closeDialogName = egret.getQualifiedClassName(ui);
                    Teach.isNeedCloseAddStep = false;
                    return;
                }
            }
        }

        /**升级打开菜单按钮 */
        public static LevelUpToBtn(curStep_: number, bnt_name: string, ui_names, bGrowth?: boolean, curPart_?: number) {
            if (typeof ui_names == "string") {
                ui_names = [ui_names];
            }
            // 判断界面情况
            if (curStep_ == 0) {
                let ui: any = zj.Game.UIManager.topScene();
                if (ui == null || Table.VIn(ui_names, egret.getQualifiedClassName(ui))) {
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
                let [ui, bLoading] = [null, null];
                let topScene: any = zj.Game.UIManager.topScene();
                if (bGrowth == null && SceneManager.instance.isAdventureScene()) {
                    if (zj.Game.UIManager.topDialog() != null) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                }
                else if (Table.VIn(ui_names, egret.getQualifiedClassName(topScene))) {
                    ui = topScene;
                }
                else {
                    [ui, bLoading] = this.Dst_Menu(bGrowth);
                    if (bLoading) {
                        Teach.openSceneName = ui;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }

                this.ProcTeachStory();
                if (Story.isFinish()) {
                    Story.bFinish = false;
                    let b_instance = SceneManager.instance.isAdventureScene(ui); // 副本
                    if (b_instance) {
                        let [top, bLoading] = this.GetDstUI(SceneManager.adventureClassStr);
                        let scene = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI

                        if (scene.dialogInfo.parent.visible == false) { // 无右侧列表
                            this.setOperateTeachStep(4);
                        }
                        else {
                            // part 对应关卡
                            let partByIndex = null;
                            if (curPart_ == 3003 || curPart_ == 3014 || curPart_ == 8007) {
                                partByIndex = 1;
                            }
                            else if (curPart_ == 3019) {
                                partByIndex = 2;
                            }
                            else if (curPart_ == 8010) {
                                partByIndex = 3
                            }

                            if (partByIndex != null && (Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID == partByIndex)) {
                                // 无需关闭右侧列表
                                this.addOperateTeachStep();
                            }
                            else {
                                // 需关闭右侧列表 
                                // 动作完毕
                                // this.addMask();
                                let mask = new eui.Rect(UIManager.StageWidth, UIManager.StageHeight, 0x00ff00);
                                mask.alpha = 0;
                                mask.name = "temporaryMaskClose";
                                zj.Game.UIManager.pushTeachUI(mask);
                                setTimeout(function () {
                                    let rect = zj.Game.UIManager.GroupTeachUI.getChildByName("temporaryMaskClose");
                                    if (rect != null) {
                                        zj.Game.UIManager.GroupTeachUI.removeChild(rect);
                                    }
                                    let adven = Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                                    if (Teach.isHaveTip() == true) Teach._reuse_button(adven.dialogInfo['btnCloseAdventure'], true, true, false, 1, 0.7, false, false, false, false, [1.2, 1.2]);
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
                let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                if (SceneManager.instance.isAdventureScene(ui)) {
                    ui['btnCloseTop'].enabled = false;
                }
                this.addOperateTeachStep();
            }
            else if (curStep_ == 4) {
                let [ui, bLoading] = [null, null];
                let topscene: any = zj.Game.UIManager.topScene();
                let uiName: string = egret.getQualifiedClassName(zj.Game.UIManager.topScene());
                if (bGrowth == null && SceneManager.instance.isAdventureScene(topscene)) {
                    [ui, bLoading] = this.GetDstUI(ui_names);
                    if (bLoading) {
                        Teach.openSceneName = ui_names;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }
                else if (Table.VIn(ui_names, uiName)) {
                    ui = topscene;
                }
                else {
                    [ui, bLoading] = this.Dst_Menu(bGrowth);
                    if (bLoading) {
                        Teach.openSceneName = ui;
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                }

                let b_instance = SceneManager.instance.isAdventureScene(topscene);
                if (b_instance) {
                    // part 对应关卡
                    let partByIndex: number = null;
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
                            if (this.isHaveTip() == true) this._reuse_button(ui[bnt_name], true, true, false, 1, 0.7, false, false);
                        }
                        else {
                            this.addOperateTeachStep();
                        }
                    }
                    else {
                        let adven: any = zj.Game.UIManager.topScene();
                        if (adven[bnt_name] != null) {
                            Teach.addMask();
                            if (adven['dialogInfo'].parent.visible == false) {
                                if (SceneManager.instance.isAdventureScene(adven)) {
                                    adven['btnCloseTop'].enabled = true;
                                    let mask = new eui.Rect(UIManager.StageWidth, UIManager.StageHeight, 0x00ff00);
                                    mask.alpha = 0;
                                    mask.name = "temporaryMaskMaskHero";
                                    zj.Game.UIManager.pushTeachUI(mask);
                                    let callBack = () => {
                                        // adven['topShadow'].visible = false;
                                    }

                                    setTimeout(function () {
                                        if (Teach.isHaveTip() == true) Teach._reuse_button(adven[bnt_name], true, true, false, 1, 0.7, false, false);
                                        zj.Game.UIManager.setMaskAttachedTapObj(new onTouchToHero(callBack));
                                        let rect = zj.Game.UIManager.GroupTeachUI.getChildByName("temporaryMaskMaskHero");
                                        if (rect != null) {
                                            zj.Game.UIManager.GroupTeachUI.removeChild(rect);
                                        }
                                    }, 500);
                                } else {
                                    setTimeout(function () {
                                        Teach.removeMask();
                                        if (Teach.isHaveTip() == true) Teach._reuse_button(adven[bnt_name], true, true, false, 1, 0.7, false, false);
                                        zj.Game.UIManager.setMaskAttachedTapObj(adven[bnt_name]);
                                        Teach.addOnceEvent(adven[bnt_name]);
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
                    let topUI: MainCitySceneNew | HunterMainScene = null;
                    if (egret.getQualifiedClassName(Game.UIManager.topScene()) == "zj.HunterMainScene") topUI = zj.Game.UIManager.topScene() as HunterMainScene;
                    if (egret.getQualifiedClassName(Game.UIManager.topScene()) == SceneManager.mainCityClassStr) topUI = (zj.Game.UIManager.topScene() as MainCityUI).sceneUI;

                    if (zj.Game.UIManager.topDialog() != null) {
                        Teach.removeMask();
                        Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    Teach.addMask();
                    if (topUI[bnt_name] != null && topUI[bnt_name] != undefined) {
                        setTimeout(function () {
                            zj.Game.UIManager.setMaskAttachedTapObj(topUI[bnt_name]);
                            if (Teach.isHaveTip() == true) Teach._reuse_button(topUI[bnt_name], true, true, false, 1, 0.7, false, false);
                            let btn = (<eui.Button>topUI[bnt_name]);
                            Teach.addOnceEvent(btn);
                            btn.once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX) }, null);
                            Teach.openSceneName = ui_names;
                            return;
                        }, 500);
                    }
                    else {
                        Teach.addOperateTeachStep();
                    }
                }
            }
        }

        /**升级打开更多里面的菜单按钮 */
        public static LevelUpToBtnMore(curStep_, bnt_name, ui_names, bGrowth) {
            if (typeof ui_names == "string") {
                ui_names = [ui_names];
            }

            // 判断界面情况
            if (curStep_ == 0) {
                let ui: any = zj.Game.UIManager.topScene();
                if (ui != null && Table.VIn(ui_names, egret.getQualifiedClassName(ui))) {
                    this.setOperateTeachStep(2);
                }
                else {
                    this.CityLevelUp(curStep_, bGrowth);
                }
            }
            else if (curStep_ < 2) {
                this.CityLevelUp(curStep_, bGrowth);
            }
            else if (curStep_ == 2) { // 打开more
                let [ui, bLoading] = this.Dst_Menu(bGrowth);
                if (bLoading) return;
                this.ProcTeachStory();
                if (Story.isFinish() && !ui['_press_more'])
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['ButtonMore']);
                if (this.isHaveTip() == true) this._reuse_button(ui['ButtonMore'], true, true, false, 0, 0.7, false, true);
                else {
                    this.setOperateTeachStep(3);
                }

            }
            else if (curStep_ == 3) { // 打开界面
                let [ui, bLoading] = this.Dst_Menu(bGrowth);
                if (bLoading) return;
                this.ProcTeachStory();
                if (Story.isFinish()) {
                    Story.bFinish = false;
                    zj.Game.UIManager.setMaskAttachedTapObj(ui[bnt_name]);
                    if (this.isHaveTip() == true) this._reuse_button(ui[bnt_name], true, true, false, 0, 0.7, false, false);
                }

            }
            else if (curStep_ == 4) { //判断界面信息，注意此处的Teach锁定！！
                let [ui, bLoading] = this.GetDstUI(ui_names);
                if (bLoading) return;
                this.addOperateTeachStep()
            }
        }

        public static LevelUpToHero(curStep_: number, general_id: number, choose_other: boolean, bRealGeneral: boolean) {
            if (curStep_ < 5) {
                this.LevelUpToBtn(curStep_, "btnHunter", "zj.HunterMainScene", true);
            }
            else if (curStep_ == 5) { // 判断右侧武将信息
                Teach.addMask();
                let [ui, bLoading] = this.Dst_Hero();
                if (bLoading) {
                    Teach.openSceneName = "zj.HunterMainScene";
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.HunterMainScene") {
                    Teach.delTouchTipSpx();
                    ui['rectMask'].visible = true;
                }
                if (ui['generalId'] == null) {
                    Teach.needIsEndAni = true;
                    return;
                }
                if ((bRealGeneral && ui['generalId'] == general_id) || (!bRealGeneral && PlayerHunterSystem.GetGeneralId(ui['generalId']) == general_id)) {
                    this.addOperateTeachStep();
                    return;
                }
                else {
                    if (ui.getChildByName("hero") == null) {
                        Teach.openUiName = "zj.HunterHero";
                        return;
                    }
                }

                let item;
                setTimeout(function () {
                    item = ui['SetInfoMoveTo'](general_id, bRealGeneral);
                    if (item == null || item == undefined) {
                        if (choose_other != true) {
                            Teach.removeMask();
                            Teach.SaveTeachPart();
                            Teach.SaveTeachPartLocal();
                            Teach.EndCurPart(false);
                            return;
                        }
                        else {
                            item = ui['SetInfoMoveToFirst']();
                            if (item == null || item == undefined) {
                                Teach.removeMask();
                                Teach.SaveTeachPart();
                                Teach.SaveTeachPartLocal();
                                Teach.EndCurPart(false);
                                return;
                            }
                        }
                    }

                    let hero = ui.getChildByName("hunterHero");
                    Teach.getItemPosition(item.data.generalId, hero['listHero'], 1021, 5, 5);
                    hero['getItemListHero']();
                    (<eui.Scroller>hero['scrollerHero']).scrollPolicyV = eui.ScrollPolicy.OFF;
                    if (Teach.isHaveTip()) Teach._reuse_button(item, true, true, false, 1, 0.7, false, false, true);
                    // zj.Game.UIManager.setMaskAttachedTapObj(hero['listHero']);
                    // Teach.addOnceEvent(hero['listHero']);
                    // hero['listHero'].once(egret.TouchEvent.TOUCH_TAP, () => {
                    //     (<eui.Scroller>hero['scrollerHero']).scrollPolicyV = eui.ScrollPolicy.ON;
                    // }, null);
                }, Game.TeachSystem.curPart == 1021 ? 2500 : 2000);
            }
        }

        /**升级打开副本界面 */
        public static LevelUpToInstance(curStep_: number, curPart_: number) {
            if (curStep_ < 5) {
                this.LevelUpToBtn(curStep_, "btnAdventrue", SceneManager.adventureClassStr, null, curPart_);
            }
            else if (curStep_ == 5) {
                let [ui, bLoading] = this.GetDstUI(SceneManager.adventureClassStr);
                if (bLoading) {
                    Teach.openSceneName = SceneManager.adventureClassStr;
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                this.addOperateTeachStep();
            }
        }

        /**升级打开建筑 */
        public static LevelUpToBuild(curStep_: number, buildType: number, buildUINames, btnName: string, rectName: string) {
            if (zj.Game.UIManager.topDialog() != null) {
                Teach.removeMask();
                Teach.closeDialogName = egret.getQualifiedClassName(zj.Game.UIManager.topDialog());
                Teach.isNeedCloseAddStep = false;
                if (Game.TeachSystem.curPart == 3001) {
                    Teach.teachingNow = false;
                    Game.TeachSystem.curPart = -1;
                }
                return;
            }
            if (!SceneManager.instance.isMainCityScene()) {
                if (typeof buildUINames === 'string') { // 其他
                    if (egret.getQualifiedClassName(zj.Game.UIManager.topScene()) != buildUINames) {
                        Teach.removeMask();
                        Teach.closeSceneName = egret.getQualifiedClassName(zj.Game.UIManager.topScene());
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                }
                else if (typeof buildUINames === 'object') { // 公会
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
                let ui: any;
                if (zj.Game.UIManager.topDialog() == null) {
                    ui = zj.Game.UIManager.topScene();
                }
                else {
                    ui = zj.Game.UIManager.topDialog();
                }

                if (ui != null && Table.VIn(buildUINames, egret.getQualifiedClassName(ui))) {
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

                if (Story.isFinish() == true && zj.Game.UIManager.GroupStory.numChildren == 0) {
                    Story.bFinish = false;
                    Teach.addMask();
                    this.setLimitOperate(true);
                    if (SceneManager.instance.isMainCityScene() && zj.Game.UIManager.topDialog() == null) {
                        let ui = zj.Game.UIManager.topScene() as MainCityUI
                        ui.sceneMap.setTeachBuild(buildType, () => {
                            if (Teach.isHaveTip() == true) {
                                let part: number = Game.TeachSystem.curPart;
                                let area: egret.DisplayObject = part == 1009 ? ui.sceneUI.getTouchTitle(buildType).getTouchGroup().getChildAt(0) : ui.sceneUI.getTouchTitle(buildType).getTouchGroup();
                                if (Teach.isHaveTip() == true) Teach._reuse_button(area, true, true, false, 0, 0.7, false, false, true, false);
                                zj.Game.UIManager.topScene().once(egret.TouchEvent.TOUCH_TAP, () => {
                                    Game.EventManager.event(GameEvent.CLEAR_TIP_SPX);
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
        }

        /**领取副本宝箱 */
        public static GetBox(curStep_: number, bBoss: boolean, pass: number, curPart_: number) {
            if (curStep_ < 5) { // 进入副本
                if (Game.TeachSystem.playAreaAnimate) {
                    Teach.removeMask();
                    Teach.needIsEndAni = true;
                    return;
                }
                if (SceneManager.instance.isAdventureScene()) { // 此时关卡列表界面未关闭
                    Teach.addMask();
                    let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                    Teach.ProcTeachStory();
                    if (Story.isFinish()) {
                        Story.bFinish = false;
                        Teach.setOperateTeachStep(13);
                    }
                }
                else {
                    this.LevelUpToInstance(curStep_, curPart_);
                }
            }
            else if (curStep_ == 5) { // 地图回到初始状态
                Teach.addMask();
                let [top, bLoading] = this.GetDstUI(SceneManager.adventureClassStr);
                if (bLoading) {
                    Teach.openSceneName = SceneManager.adventureClassStr;
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                let adven = Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                adven.SetMapCanTouch(false);
                if (adven.dialogInfo.parent.visible == false) { // 无关卡列表界面
                    Teach.setOperateTeachStep(9);
                }
                else {// 有关卡列表
                    Teach.setOperateTeachStep(13);
                }
            }
            else if (curStep_ == 6) { // 关闭关卡按钮
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
            else if (curStep_ == 8) { // 等待完全退出
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
            else if (curStep_ == 9) { // 选择对应关卡
                // GameCommon.EventLockTeach(true);
                Teach.addMask();
                let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;

                let nodeName = null;
                if (curPart_ == 3014) { // -- 副本1-7            
                    nodeName = 1;
                }
                else if (curPart_ == 3019) { //-- 副本2-7
                    nodeName = 2;
                }
                else if (curPart_ == 3020) { //-- 副本3-7
                    nodeName = 3;
                }

                if (nodeName != null) {
                    ui.SetMapCanTouch(false);
                    Teach.addMask();
                    (ui.sceneMap as SceneMapTiledAdventure).moveMapToArea(nodeName, () => {
                        if (Teach.isHaveTip() == true) Teach._reuse_button((ui.sceneMap as SceneMapTiledAdventure).getAdventureById(nodeName), true, true, false, 1, 0.7, false, false, true);
                        (ui.sceneMap as SceneMapTiledAdventure).once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX) }, null);
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
            else if (curStep_ == 10) { // 等待动画结束
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
            else if (curStep_ == 12) { // 保存
                this.ProcTeachStory();
                if (Story.isFinish()) {
                    Story.bFinish = false;
                    this.addOperateTeachStep();
                }
            }
            else if (curStep_ == 13) { // 聚焦箱子
                Teach.addMask();
                let ui = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                if (curPart_ == 3014 || curPart_ == 3019 || curPart_ == 3020) { // 副本1-7 2-7 3-7
                    let areaId: number = 0;
                    if (curPart_ == 3014) areaId = 1;
                    if (curPart_ == 3019) areaId = 2;
                    if (curPart_ == 3020) areaId = 3;
                    let mobInfo: message.MobInfo = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[Game.PlayerInstanceSystem.getLastInstance(areaId)];
                    if (ui.dialogInfo.parent.visible == false) {
                        Teach.openUiName = "zj.AdventureDialog";
                        Teach.isNeedOpenAddStep = false;
                        return;
                    }
                    if (mobInfo.star <= 0) { // 未通关
                        this.SaveTeachPart();
                        Teach.SaveTeachPartLocal();
                        this.setOperateTeachStep(16);
                    }
                    else if (mobInfo.star > 0 && !mobInfo.chestReward) { // 可领取
                        Game.UIManager.setMaskAttachedTapObj(ui.dialogInfo['btnBox']);
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui.dialogInfo['btnBox'], true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                        if (curPart_ == 3014 || curPart_ == 3020) {
                            Teach.openUiName = "zj.TavernGetGeneral";
                            Teach.isNeedOpenAddStep = true;
                        }
                        else {
                            Teach.openDialogName = "zj.CommonGetDialog";
                            Teach.isNeedOpenAddStep = true;
                        }
                    }
                    else { // 已领取
                        Teach.SaveTeachPart();
                        Teach.SaveTeachPartLocal();
                        Teach.setOperateTeachStep(16);
                    }
                }
            }
            else if (curStep_ == 14) { // 点击收了
                let [ui, bLoading] = Teach.GetDstUI("zj.CommonGetDialog");
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
                egret.Tween.get(ui).wait(300).call(() => {
                    if (this.isHaveTip() == true) this._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false, null, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['groupTeach']);
                    // this.addOnceEvent(ui['groupTeach']);
                    ui['groupTeach'].once(egret.TouchEvent.TOUCH_TAP, () => {
                        Teach.delTouchTipSpx();
                        (ui.btnClose as eui.Button).enabled = true;
                        ui['onBtnClose']();
                    }, null);
                    Teach.closeDialogName = "zj.CommonGetDialog";
                    return;
                });
            }
            else if (curStep_ == 15) { // 点击收了
                Teach.SaveTeachPart();
                Teach.SaveTeachPartLocal();
                this.addOperateTeachStep();
            }
            else if (curStep_ == 16) { //关闭获得界面
                Teach.addMask();
                let scene = zj.Game.UIManager.topScene() as SceneMapTiledAdventureUI
                if (!SceneManager.instance.isAdventureScene(scene)) {
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
                    if (Teach.isHaveTip() == true) Teach._reuse_button(scene.dialogInfo['btnCloseAdventure'], true, true, false, 1, 0.7, false, false, true, false, [1.2, 1.2]);
                    scene.dialogInfo['btnCloseAdventure'].once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX); }, null);
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
                    Game.TeachSystem.playAreaAnimate = false;
                }
            }
            else if (curStep_ == 18) { // 18 19步是获得卡包回到主城特殊处理
                Teach.addMask();
                let topUI = Game.UIManager.topScene() as SceneMapTiledAdventureUI;
                if (topUI.sceneMap.isOpenAniRun) {
                    Teach.needIsEndAni = true;
                    return;
                }
                topUI['btnCloseTop'].enabled = true;
                Teach.removeMask();
                if (Teach.isHaveTip() == true) Teach._reuse_button(topUI['btnCloseTop'], true, true, false, 1, 0.7, false, false, true);
                topUI['btnCloseTop'].once(egret.TouchEvent.TOUCH_TAP, () => { Game.EventManager.event(GameEvent.CLEAR_TIP_SPX); }, null);
                Teach.closeSceneName = "zj.SceneMapTiledAdventureUI";
                Teach.isNeedCloseAddStep = true;
                return;
            }
            else if (curStep_ == 19) {
                Teach.removeMask();
                Teach.delTouchTipSpx();
                Teach.EndCurPart(true);
                Game.TeachSystem.playAreaAnimate = false;
            }
        }

        /**激活羁绊卡 */
        public static ActivatePartner(curStep_: number, hole_index: number, general_id: number, bClose: boolean, bFocusAttri: boolean) {
            if (curStep_ < 6) { // 点击武将
                this.LevelUpToHero(curStep_, general_id, null, null);
            }
            else if (curStep_ == 6) { // 判断
                let ui: any;
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
                if (PlayerHunterSystem.GetGeneralId(ui['generalId']) != general_id) return;
                this.addOperateTeachStep();
            }
            else if (curStep_ == 7) { // 点击详情按钮
                Teach.addMask();
                let ui: any = zj.Game.UIManager.topScene();
                ui['rectMask'].visible = true;
                if (ui['btnMainDetail'].visible) {
                    setTimeout(function () {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnMainDetail'], true, true, false, 1, 0.7, false, false, true);
                    }, 400);
                    setTimeout(function () {
                        ui['rectMask'].visible = false;
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
                let scene: any = zj.Game.UIManager.topScene();
                let ui: any = scene.getChildByName("detail");
                if (ui == null || ui.alpha != 1) {
                    Teach.needIsEndAni = true
                    return;
                }
                Teach.addOperateTeachStep();
            }
            else if (curStep_ == 9) { // 锁定框
                Teach.addMask();
                let scene: any = zj.Game.UIManager.topScene();
                let ui: any = scene.getChildByName("detail");
                if (ui == null || ui.alpha != 1) {
                    Teach.needIsEndAni = true
                    return;
                }
                egret.Tween.get(ui).wait(450).call(() => {
                    if (this.isHaveTip() == true) this._reuse_button(ui['groupTeach'], true, true, false, 0, 0.7, false, false);
                    zj.Game.UIManager.setMaskAttachedTapObj(new onTouchAddStep());
                });

            }
            else if (curStep_ == 10) { // 点击安装羁绊卡
                Teach.addMask();
                let scene: any = zj.Game.UIManager.topScene();
                let ui: any = scene.getChildByName("detail");
                if (ui == null || ui.alpha != 1) {
                    Teach.needIsEndAni = true
                    return;
                }
                let generalsMap: { [id: number]: message.GeneralInfo } = zj.Game.PlayerHunterSystem.allHuntersMap();
                if (generalsMap[ui['generalId']].step == 0 && ui['setHoleInfo'](hole_index) == true) {
                    if (ui['btnFate' + hole_index].enabled) {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate' + hole_index]);
                        if (this.isHaveTip() == true) this._reuse_button(ui['btnFate' + hole_index], true, true, false, 1, 0.7, false, false);
                        this.addOnceEvent(ui['btnFate' + hole_index])
                    }
                    else {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['imgFate' + hole_index]);
                        if (this.isHaveTip() == true) this._reuse_button(ui['imgFate' + hole_index], true, true, false, 1, 0.7, false, false);
                        this.addOnceEvent(ui['imgFate' + hole_index])
                    }
                }
                else {
                    this.setOperateTeachStep(12);
                }
            }
            else if (curStep_ == 11) { // 聚焦激活
                Teach.addMask();
                let scene: any = zj.Game.UIManager.topScene();
                let ui: any = scene.getChildByName("detail");
                if (ui == null || ui.alpha != 1) {
                    Teach.needIsEndAni = true
                    return;
                }
                zj.Game.UIManager.setMaskAttachedTapObj(ui['btnActive']);
                if (this.isHaveTip() == true) this._reuse_button(ui['btnActive'], true, true, false, 1, 0.7, false, false);
                this.addOnceEvent(ui['btnActive']);
            }
            else if (curStep_ == 12) { // 点击安装羁绊卡
                Teach.addMask();
                let scene: any = zj.Game.UIManager.topScene();
                let ui: any = scene.getChildByName("detail");
                if (ui == null || ui.alpha != 1) {
                    Teach.needIsEndAni = true
                    return;
                }
                let generalsMap: { [id: number]: message.GeneralInfo } = zj.Game.PlayerHunterSystem.allHuntersMap();
                if (generalsMap[ui['generalId']].step == 0 && ui['setHoleInfo'](hole_index + 1) == true) {
                    if (ui['btnFate' + (hole_index + 1)].enabled) {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['btnFate' + (hole_index + 1)]);
                        if (this.isHaveTip() == true) this._reuse_button(ui['btnFate' + (hole_index + 1)], true, true, false, 1, 0.7, false, false);
                        this.addOnceEvent(ui['btnFate' + (hole_index + 1)]);
                    }
                    else {
                        zj.Game.UIManager.setMaskAttachedTapObj(ui['imgFate' + (hole_index + 1)]);
                        if (this.isHaveTip() == true) this._reuse_button(ui['imgFate' + (hole_index + 1)], true, true, false, 1, 0.7, false, false);
                        this.addOnceEvent(ui['imgFate' + (hole_index + 1)]);
                    }
                }
                else {
                    this.setOperateTeachStep(15);
                }
            }
            else if (curStep_ == 13) { // 聚焦激活
                Teach.addMask();
                let scene: any = zj.Game.UIManager.topScene();
                let ui: any = scene.getChildByName("detail");
                if (ui == null || ui.alpha != 1) {
                    Teach.needIsEndAni = true
                    return;
                }
                setTimeout(function () {
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnActive']);
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnActive'], true, true, false, 1, 0.7, false, false);
                    Teach.addOnceEvent(ui['btnActive']);
                }, 200);
            }
            else if (curStep_ == 14) {
                this.addOperateTeachStep();
            }
            else if (curStep_ == 15) {
                this.ProcTeachStory();
                if (Story.isFinish()) {
                    Story.bFinish = false;
                    this.addOperateTeachStep();
                }
            }
            else if (curStep_ == 16) { // 保存进度
                this.SaveTeachPart();
                Teach.SaveTeachPartLocal();
                this.addOperateTeachStep();
            }
            else if (curStep_ == 17) { // 聚焦退出
                Teach.addMask();
                let ui = zj.Game.UIManager.topScene(); //HunterMainScene
                setTimeout(function () {
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    Teach.addOnceEvent(ui['btnClose']);
                }, 200);

            }
            else if (curStep_ == 18) { // 退出
                this.addOperateTeachStep();
            }
            else if (curStep_ == 19) { // 聚焦退出
                let ui = zj.Game.UIManager.topScene(); //HunterMainScene
                setTimeout(function () {
                    zj.Game.UIManager.setMaskAttachedTapObj(ui['btnClose']);
                    if (Teach.isHaveTip() == true) Teach._reuse_button(ui['btnClose'], true, true, false, 1, 0.7, false, false);
                    Teach.addOnceEvent(ui['btnClose']);
                }, 100);
            }
            else if (curStep_ == 20) { // 退出
                // Teach.addOperateTeachStep();
                Teach.removeMask();
                // Teach.EndCurPart(false);
                // while (Game.UIManager.sceneCount() > 1) Game.UIManager.popScene();
                // Game.UIManager.GroupTeachUI.removeChildren();
                SceneManager.instance.ReEnterMainCityNew();
                // Game.UIManager.popAllScenesAndDialogs();
                Teach.setOperateTeachStep(23);
            }
            else if (curStep_ == 21) { // 到副本界面聚焦到第一关 主城结束
                Teach.addMask();
                let [ui, bLoading] = this.GetDstUI([SceneManager.adventureClassStr, SceneManager.mainCityClassStr]);
                if (bLoading) {
                    Teach.openSceneName = SceneManager.adventureClassStr || SceneManager.mainCityClassStr;
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                let topUI: any = zj.Game.UIManager.topScene();
                if (SceneManager.instance.isAdventureScene() || egret.getQualifiedClassName(ui) == "zj.HunterMainScene") {
                    topUI['topShadow'].visible = true;
                    ui['SetMapCanTouch'](false);
                    ui['btnCloseTop'].enabled = false;
                    egret.Tween.get(ui).wait(450).call(() => {
                        Teach.removeMask();
                        if (Teach.isHaveTip() == true) Teach._reuse_button(ui['imgMapSelect1'], true, true, false, 1, 0.7, false, false, true);
                    }).wait(300).call(() => {
                        topUI['topShadow'].visible = false;
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
            else if (curStep_ == 22) { // 增加步骤
                let adven: any = zj.Game.UIManager.topScene();
                if (SceneManager.instance.isAdventureScene(adven)) {
                    adven['SetMapCanTouch'](true);
                    adven['btnCloseTop'].enabled = true;
                }
                this.addOperateTeachStep();
            }
            else if (curStep_ == 23) { // 结束
                Teach.removeMask();
                this.EndCurPart(false);
            }
        }

        /**进入贪婪之岛 */
        public static GoWonderland(curStep_: number, bTeach: boolean, bSkip: boolean, wonderlandIndex: number, curPart_: number) {
            SceneManager.teachId = wonderlandIndex;
            if (curStep_ < 4) {
                Teach.LevelUpToBuild(curStep_, message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3, "zj.WonderLandChoose", "btnGreedyIsland", "rectGreedyIsland");
            }
            else if (curStep_ == 4) {
                let [ui, bLoading] = Teach.GetDstUI("zj.WonderLandChoose");
                if (bLoading) {
                    Teach.openDialogName = "zj.WonderLandChoose";
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                Teach.setOperateTeachStep(7);
            }
            else if (curStep_ == 5) {
                Teach.addMask();
                let ui = zj.Game.UIManager.topScene();
                if (egret.getQualifiedClassName(ui) != "zj.WonderlandScene") {
                    Teach.openSceneName = "zj.WonderlandScene";
                    Teach.isNeedOpenAddStep = false;
                    return;
                }
                Teach.ProcTeachStory();
                if (Story.isFinish()) {
                    Story.bFinish = false;
                    Teach.addOperateTeachStep();
                }
            }
            else if (curStep_ == 6) {
                let ui = zj.Game.UIManager.topScene();
                let button_name = null;
                if (bTeach == true) {
                    button_name = ui['SetTeach'](wonderlandIndex);
                }

                let btn = null;

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
                if (Teach.isHaveTip() == true) Teach._reuse_button(ui[button_name], true, true, false, 1, 0.6, false, false, true);
                Teach.addOnceEvent(ui[button_name]);

            }
            else if (curStep_ == 7) {
                Teach.SaveTeachPart(true);
                Teach.SaveTeachPartLocal(Game.TeachSystem.curPart);
                Teach.EndCurPart(bSkip);
                SceneManager.teachId = null;
            }
        }

        /**引导上阵的时候帮助索引可上阵武将 */
        public static GetGeneralIndexToFormat(uiWindow, ignoreIDs, preferIDs, itemlist: Array<FormatChooseHeroItem>): [boolean, number] { // 索引从0开始
            if (ignoreIDs instanceof Array) {

            }
            else {
                if (ignoreIDs == null) {
                    ignoreIDs = [];
                } else {
                    ignoreIDs = [ignoreIDs];
                }

            }
            for (let [k, v] of HelpUtil.GetKV(CommonConfig.general_limit_use_ids)) {
                ignoreIDs.push(v);
            }
            if (preferIDs instanceof Array) {

            }
            else {
                if (preferIDs == null) {
                    preferIDs = [];
                } else {
                    preferIDs = [preferIDs];
                }
            }

            let ret = false;
            let idx = -1;
            //判断是否有多余武将
            let formatChoose = ["generals", "reserves", "supports"]
            let suffix = formatChoose[0];

            if (zj.Game.PlayerFormationSystem.HaveMoreGeneral(uiWindow, [suffix], null)[0] == false) {
                return [ret, idx];
            }

            let tblGeneral = itemlist;

            for (let i = 0; i < tblGeneral.length; i++) {
                if (tblGeneral[i] != null
                    && Table.VIn(ignoreIDs, PlayerHunterSystem.GetGeneralId(tblGeneral[i].data.generalId)) == false
                    && Table.VIn(preferIDs, PlayerHunterSystem.GetGeneralId(tblGeneral[i].data.generalId)) == true
                    && zj.Game.PlayerFormationSystem.bUsed(tblGeneral[i].data.generalId) == -1
                    // && tblGeneral[i].bHas == true
                ) {
                    ret = true;
                    idx = i;
                    return [ret, idx];
                }
            }

            for (let i = 0; i < tblGeneral.length; i++) {
                if (tblGeneral[i] != null
                    && Table.VIn(ignoreIDs, PlayerHunterSystem.GetGeneralId(tblGeneral[i].data.generalId)) == false
                    && zj.Game.PlayerFormationSystem.bUsed(tblGeneral[i].data.generalId) == -1
                    // && tblGeneral[i].bHas == true
                ) {
                    ret = true;
                    idx = i;
                    return [ret, idx];
                }
            }
            return [ret, idx];
        }

        /**副本区域解锁动画 */
        public static AddAreaAnimation(curStep_: number, graph_id: number) {
            if (curStep_ < 6) { // 进入副本
                if (SceneManager.instance.isAdventureScene()) {
                    let ui: any = zj.Game.UIManager.topScene();
                    if (ui['groupDialog'].numChildren != 0 && ui['groupDialog'].alpha == 1) {
                        ui['closeSceneFun']();
                    }
                    Teach.setOperateTeachStep(6);
                }
                else if (SceneManager.instance.isMainCityScene()) {
                    this.LevelUpToInstance(curStep_, null);
                }

            }
            else if (curStep_ == 6) { // 演示动画
                // GameCommon.EventLockTeach(true);
                if (graph_id <= 105) {
                    loadUI(Common_AnimationB)
                        .then((dailog: Common_AnimationB) => {
                            dailog.LoadAni(graph_id);
                            dailog.show();
                        });
                    this.addOperateTeachStep()
                }
                else {
                    zj.Game.TeachSystem.playAreaAnimate = true;
                    this.setOperateTeachStep(8);
                }
                this.SaveTeachPart();
                Teach.SaveTeachPartLocal();
            }
            else if (curStep_ == 7) { // 等待界面展开
                Teach.removeMask();
                let [top, bLoading] = this.GetDstUI("zj.Common_AnimationB");
                if (bLoading) {
                    Teach.openDialogName = "zj.Common_AnimationB";
                    return;
                }
            }
            else if (curStep_ == 8) { // 等待结束
                Teach.removeMask();
                if (zj.Game.TeachSystem.playAreaAnimate == true) { // 动画播放完毕并关闭界面
                    // GameCommon.EventLockTeach(true);
                    let [top, bLoading] = this.GetDstUI(SceneManager.adventureClassStr);
                    if (bLoading) {
                        Teach.removeMask();
                        Teach.closeDialogName = "zj.Common_AnimationB";
                        Teach.isNeedCloseAddStep = false;
                        return;
                    }
                    zj.Game.TeachSystem.playAreaAnimate = false;
                    if (zj.Game.PlayerInstanceSystem.GetAreaComplete(zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID)) {
                        top['TeachNewAreaUnLockAni'](zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID + 1);
                    }
                    else {
                        top['TeachNewAreaUnLockAni'](zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID);
                    }
                    this.addOperateTeachStep();
                }
                else {
                    Teach.needIsEndAni = true;
                    return;
                }
            }
            else if (curStep_ == 9) { // 等待结束
                Teach.removeMask();
                let [ui, bLoading] = this.GetDstUI(SceneManager.adventureClassStr);
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
        }

        /**战斗暂停 */
        public static PauseAddStep() {
            let scene: any = zj.Game.UIManager.topScene();
            scene['pauseAll']();
            this.addOperateTeachStep();
        }

        /**恢复 */
        public static ResumeAddStep() {
            let scene: any = zj.Game.UIManager.topScene();
            scene['resumeAll']();
            this.addOperateTeachStep();
        }

        public static CheckTeachName() {
            if (this.m_bOpenTeach == false) return;
            if (this.isDone(teachBattle.teachPartID_NAME) == false && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.modifyName == 0) {
                this.SetTeachPart(teachBattle.teachPartID_NAME);
            }
        }

        public static CheckAndSetTeach(teachID) {
            // 改名
            if (this.m_bOpenTeach == false) return;
            if (Teach.isDone(teachID) == false) {
                Teach.SetTeachPart(teachID);
            }
        }

        /**检测指定教学 并设置教学 */
        public static CheckDstTeach(teachID: number, nodeOrStageID: number) {
            if (Game.TeachSystem.curPart != -1) return; // 是否在教学中
            let part = this.isTeach(nodeOrStageID);
            if (part == teachID) {
                this.SetTeachPart(teachID);
            }
        }

        /**检测教学是否满足条件 */
        public static IsTeachReady(nodeOrStageID: number): boolean {
            let ret = false;
            if (Game.TeachSystem.curPart == -1 && this.isTeach(nodeOrStageID) != -1) {
                ret = true;
            }
            return ret;
        }

        /**调试教学 从登陆信息中删除指定教学步骤 */
        public static DebugHelper(parts) {
            if (parts == null) {
                parts = [];
            }
            let teachDelete = [];
            for (let i = 0; i < zj.Game.PlayerMissionSystem.tableLength(this.nServerPart); i++) {
                let v = this.nServerPart[i].part;
                if (Table.VIn(parts, v)) {
                    teachDelete.push(i);
                }
            }
            // 逆序删除
            for (let i = teachDelete.length; i >= 0; i--) {
                this.nServerPart.splice(i, 1);
            }
        }

        /**是否在新手中 或马上会进入新手 */
        public static BeInTeaching() {
            let teach = this.IsTeachReady(null);
            if ((teach || this.bInTeaching) && this.m_bOpenTeach) {
                return true;
            }
            else {
                return false;
            }
        }

        /**武将升星新手条件 */
        public static GeneralUpStarTeach() {
            let _teachID: number = 2005;
            if (zj.Game.UIManager.topScene() == null) return;
            if (Gmgr.Instance.getLayerId() == zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND &&
                PlayerItemSystem.Count(40032) >= 20 &&
                zj.Game.PlayerHunterSystem.HasIncreaseStar() &&
                (SceneManager.instance.isMainCityScene() || SceneManager.instance.isAdventureScene()) &&
                zj.Game.PlayerInstanceSystem.isJumpToInstance) {
                this.CheckAndSetTeach(_teachID);
            }
        }


        /**判断是否已经聚焦 如果是就不再重复添加 */
        public static isHaveTip(): boolean {
            let nameArr: Array<string> = [(ConstantConfig_Teach.Tag.LayerUp).toString()
                , (ConstantConfig_Teach.Tag.LayerDown).toString()
                , (ConstantConfig_Teach.Tag.LayerLeft).toString()
                , (ConstantConfig_Teach.Tag.LayerRight).toString()];

            if (zj.Game.UIManager.GroupTeachUI.getChildByName(nameArr[0]) == null
                && zj.Game.UIManager.GroupTeachUI.getChildByName(nameArr[1]) == null
                && zj.Game.UIManager.GroupTeachUI.getChildByName(nameArr[2]) == null
                && zj.Game.UIManager.GroupTeachUI.getChildByName(nameArr[3]) == null) {
                return true;
            }
            else {
                return false;
            }
        }

        public static loadTeach(nodeOrStageID: number) {
            Teach.checkTeachId(nodeOrStageID);
        }

        public static proOperateTeach() {
            Teach.nOperateTeachFrame = Teach.nOperateTeachFrame + 1;
        }

        public static procTeach() {
            let nodeOrStageID = TeachSystem.nodeOrStageID;
            if (this.m_bOpenTeach == false) {
                return;
            }
            if (this.bFirstTeachUpdata) {
                let part = this.isTeach(nodeOrStageID);
                if (part != -1) {
                    this.bFirstTeachUpdata = false;
                }

                if (-1 != part) {
                    this.nOperateTeachFrame = 0;
                    this.bStopTeachUpdata = false;
                    this.bTeachUpdata = true;
                    this.bInTeaching = true;
                    Game.TeachSystem.curPart = part;
                    zj.Game.PlayerFormationSystem.saveFrom = [];
                }
                else {
                    this.bTeachUpdata = false;
                    this.bInTeaching = false;
                    Game.TeachSystem.curPart = -1;
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
        }

        /**添加遮罩 执行下一步操作时自动移除 */
        public static addMask() {
            if (Teach.isMask == false) {
                // zj.Game.UIManager.maskAllUIs();
                Teach.isMask = true;
            }
        }

        public static removeMask() {
            if (Teach.isMask) {
                zj.Game.UIManager.unmaskAllUIs();
                Teach.isMask = false;
            }
        }

        /**添加一次临时监听 点击按钮增加步骤 */
        public static addOnceEvent(obj: egret.EventDispatcher) {
            obj.once(egret.TouchEvent.TOUCH_TAP, () => {
                // Teach.delTouchTipSpx();
                Teach.addOperateTeachStep();
            }, null);
        }



        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////事件回调方法////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 哪需要哪赋值
        public static openSceneName: string = null;
        public static openDialogName: string | [string, string];
        public static openUiName: string = null;
        public static openFightUiName: string = null;
        public static closeSceneName: string = null;
        public static closeDialogName: string = null;
        public static closeUiName: string = null;
        public static needIsEndAni: boolean = false;
        public static isNeedOpenAddStep: boolean = true; // 打开界面或Dialog时是否需要增加步骤 默认未true
        public static isNeedCloseAddStep: boolean = true; // 关闭界面或dialog时是否需要增加步骤 默认未true
        public static skillCdEnd: boolean = false // 新手引导技能cd是否完成
        public static num_dialog: number; // 对话框数量
        public static isNeedMoudleSize: boolean; // 是否需要获取组件xywh
        public static isOpenWaitingUi: boolean = true; // 现在是否有转圈UI


        public static showScene(ev: egret.Event) {
            if (Teach.openSceneName == ev.data.typeName) { // 针对点击增加步骤 判断打开界面名字是否是下一步需要的界面 需要的话给openSceneName赋值
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
        }

        public static showDialog(ev: egret.Event) {
            if (typeof Teach.openDialogName == "string") {
                if (Teach.openDialogName == ev.data.typeName) {
                    if (Teach.isNeedOpenAddStep) {
                        Teach.openDialogName = null
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

        }

        public static showUi(ev: egret.Event) {
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
        }

        public static isEndAnimation(ev: egret.Event) {
            if (Teach.needIsEndAni === ev.data.isAni) {// 针对需要等待动画结束情况 判断是否需要等待动画 需要的话给needIsEndAni赋值
                Teach.needIsEndAni = false;
                Teach.DoOperateTeach();
                return;
            }
        }

        public static closeScene(ev: egret.Event) {
            if (Teach.closeSceneName == ev.data.typeName) {// 针对关闭界面增加步骤情况 判断界面是否已经关闭 需要的话给closeSceneName赋值
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
        }

        public static closeDialog(ev: egret.Event) {
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
        }

        public static closeUi(ev: egret.Event) {
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
        }

        public static showFightUi(ev: egret.Event) {
            if (Teach.openFightUiName == ev.data.typeName) {
                Teach.openFightUiName = "";
                Teach.DoOperateTeach();
                return;
            }
        }

        public static skillIsOk(ev: egret.Event) {
            if (Teach.skillCdEnd === ev.data.isOk) {
                Teach.skillCdEnd = false;
                Teach.DoOperateTeach();
                return;
            }
        }

        public static dialogCount(ev: egret.Event) {
            if (Teach.num_dialog == ev.data.count) {
                Teach.num_dialog = null;
                Teach.DoOperateTeach();
                return;
            }
        }

        public static getMoudleSize(ev: egret.Event) {
            if (Teach.isNeedMoudleSize == ev.data.isGetSize) {
                Teach.isNeedMoudleSize = false;
                Teach.DoOperateTeach();
                return;
            }
        }

        public static checkTeachId(nodeId?: number) {
            if (Teach.isDone(1011)) return;
            let part = Teach.isTeach(nodeId).toString();
            if (part != "-1" && !Teach.isDone(Number(part)) && Teach.teachingNow == false) {
                console.log("——————————————————新手引导触发:  " + part + "——————————————————————");
                Game.EventManager.event(GameEvent.START_NEW_TEACHING, { curPart: Number(part) });
            }
        }

        /**
         * 点击增加步骤
         * @param obj 点击的对象
         * @param isHideSpx 是否删除新手选中框
         */
        public static addStepAndRemoveMask(obj: egret.EventDispatcher, isHideSpx: boolean) {
            obj.once(egret.TouchEvent.TOUCH_TAP, () => {
                if (isHideSpx) Game.EventManager.event(GameEvent.CLEAR_TIP_SPX);
                Teach.addOperateTeachStep();
            }, null);
        }
    }
}