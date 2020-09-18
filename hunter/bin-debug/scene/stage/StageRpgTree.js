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
    var StageRpgTree = (function (_super) {
        __extends(StageRpgTree, _super);
        function StageRpgTree(node, order) {
            var _this = _super.call(this, node, order) || this;
            _this.bloodBoardName = null;
            _this.bloodBoardDes = null;
            _this.ttfName = null;
            _this.ttfDes = null;
            _this.fruitCnt = -1;
            _this.matureTime = -1;
            _this.uiCnt = -1;
            _this.bMature = false;
            _this.bTagVisible = null;
            _this.ripeAni = null;
            _this.ripeIndex = -1;
            _this.bInWater = false;
            _this.showTimeLine = -1;
            _this.unkonwnTime = false;
            return _this;
        }
        StageRpgTree.prototype.release = function () {
            _super.prototype.release.call(this);
            if (this.ripeAni) {
                this.ripeAni.clearSpine();
                this.ripeAni = null;
            }
            if (this.ttfName) {
                this.titleSpace.removeChild(this.ttfName);
            }
            if (this.ttfDes) {
                this.titleSpace.removeChild(this.ttfDes);
            }
            if (this.bloodBoardName) {
                this.titleSpace.removeChild(this.bloodBoardName);
            }
            if (this.bloodBoardName) {
                this.titleSpace.removeChild(this.bloodBoardDes);
            }
        };
        StageRpgTree.prototype.InitTree = function (info, scenePosInfo) {
            this.info = info;
            this.dealSceneNotice(scenePosInfo);
            this.LoadData();
            this.LoadView();
            this.loadOther();
            this.flashTree(false, -1);
            this.setRoot(this.x, this.y);
        };
        StageRpgTree.prototype.loadNameTitle = function () {
            var board = new eui.Image(zj.UIConfig.UIConfig_LeagueWarScene.sceneTreeBoardName);
            board.anchorOffsetX = 158 / 2;
            board.anchorOffsetY = 27 / 2;
            this.bloodBoardName = board;
            this.titleSpace.addChild(this.bloodBoardName);
            this.ttfName = new eui.Label(this.info.tree_name);
            this.ttfName.size = 20;
            this.ttfName.bold = true;
            this.ttfName.textColor = zj.ConstantConfig_Wonderland.tree_quality_color[this.info.quality - 1];
            this.ttfName.anchorOffsetX = this.ttfName.width / 2;
            this.ttfName.anchorOffsetY = this.ttfName.height / 2;
            this.titleSpace.addChild(this.ttfName);
        };
        StageRpgTree.prototype.loadDesTitle = function () {
            var board = new eui.Image(zj.UIConfig.UIConfig_LeagueWarScene.sceneTreeBoardDes);
            board.anchorOffsetX = 158 / 2;
            board.anchorOffsetY = 27 / 2;
            this.bloodBoardDes = board;
            this.titleSpace.addChild(this.bloodBoardDes);
            this.loadDes();
        };
        StageRpgTree.prototype.loadDes = function () {
            var isTime = zj.TableWonderlandTree.Item(this.info.tree_id).is_timeTree == 1;
            if (isTime) {
                this.loadTreeCnt();
                return;
            }
            if (this.bMature == true) {
                this.loadTreeCnt();
            }
            else {
                if (this.showTimeLine == -1) {
                    this.loadTime();
                }
                else {
                    if (this.matureTime <= this.showTimeLine * 1000) {
                        this.loadTime();
                    }
                    else {
                        this.loadUnknownTime();
                    }
                }
            }
        };
        StageRpgTree.prototype.flashTree = function (tag, action) {
            if (this.bTagVisible != tag) {
                this.bTagVisible = tag;
                this.setTagVisible(tag);
            }
            this.flashLedAni(action);
        };
        StageRpgTree.prototype.setTagVisible = function (tag) {
            //类型为4不显示数量
            this.ttfName.visible = tag;
            this.ttfDes.visible = tag && (this.info.fruit_type != 4);
            this.bloodBoardName.visible = tag;
            this.bloodBoardDes.visible = tag && (this.info.fruit_type != 4);
        };
        StageRpgTree.prototype.loadTreeCnt = function () {
            var isTime = zj.TableWonderlandTree.Item(this.info.tree_id).is_timeTree == 1;
            var can_pick = zj.Otherdb.inPeaceWonderlandNotPick(this.info.tree_id);
            var _tmp = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.fruit_cnt_label, this.fruitCnt);
            var color = zj.ConstantConfig_Common.Color.yellow;
            if (isTime) {
                if (can_pick) {
                    _tmp = zj.TextsConfig.TextsConfig_Wonderland.fruit_can_pick;
                }
                else {
                    _tmp = zj.Otherdb.inPeaceWonderlandLastTime();
                    color = zj.ConstantConfig_Common.Color.red;
                }
            }
            if (this.ttfDes != null) {
                this.ttfDes.text = _tmp;
                this.ttfDes.textColor = color;
                this.ttfDes.anchorOffsetX = this.ttfDes.width / 2;
                this.ttfDes.anchorOffsetY = this.ttfDes.height / 2;
            }
            else {
                this.ttfDes = new eui.Label();
                this.ttfDes.size = 20;
                this.ttfDes.bold = true;
                this.ttfDes.textColor = color;
                this.ttfDes.anchorOffsetX = this.ttfDes.width / 2;
                this.ttfDes.anchorOffsetY = this.ttfDes.height / 2;
                this.titleSpace.addChild(this.ttfDes);
            }
        };
        StageRpgTree.prototype.loadTime = function () {
            this.unkonwnTime = false;
            var _str = zj.Helper.FormatMsTime3(this.matureTime / 1000);
            var _tmp = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.fruit_mature_time_label, _str);
            if (!this.ttfDes) {
                this.ttfDes = new eui.Label();
                this.ttfDes.size = 20;
                this.ttfDes.bold = true;
                this.ttfDes.text = _tmp;
                this.ttfDes.textColor = zj.ConstantConfig_Common.Color.red;
                this.ttfDes.anchorOffsetX = this.ttfDes.width / 2;
                this.ttfDes.anchorOffsetY = this.ttfDes.height / 2;
                this.titleSpace.addChild(this.ttfDes);
            }
            this.ttfDes.visible = false;
        };
        StageRpgTree.prototype.loadUnknownTime = function () {
            this.unkonwnTime = true;
            if (!this.ttfDes) {
                this.ttfDes = new eui.Label();
                this.ttfDes.size = 20;
                this.ttfDes.bold = true;
                this.ttfDes.text = zj.TextsConfig.TextsConfig_Wonderland.fruit_unknown_time_lable;
                this.ttfDes.textColor = zj.ConstantConfig_Common.Color.red;
                this.ttfDes.anchorOffsetX = this.ttfDes.width / 2;
                this.ttfDes.anchorOffsetY = this.ttfDes.height / 2;
                this.titleSpace.addChild(this.ttfDes);
            }
            this.ttfDes.visible = false;
        };
        StageRpgTree.prototype.loadRipeAni = function () {
            //成熟果实
            this.ripeAni = zj.HunterSpineX(null, 1, null, zj.TableClientAniCssSource.Item(zj.UIConfig.UIConfig_Wonderland.ripeEffect.jsonId).name)[0];
            this.ripeAni.setVisibleSpx(false);
            this.nodeNormal.addChild(this.ripeAni.spine);
        };
        StageRpgTree.prototype.procRipeAni = function () {
            this.ripeAni.setVisibleSpx(false);
        };
        StageRpgTree.prototype.setLoadPos = function (x, y) {
            _super.prototype.setLoadPos.call(this, x, y);
            if (this.ripeAni != null) {
                this.ripeAni.SetPosition(x, y);
            }
            if (this.ttfName != null) {
                var _a = [x, y - this.info.tag_y], t_x = _a[0], t_y = _a[1];
                this.ttfName.x = t_x;
                this.ttfName.y = t_y;
                this.bloodBoardName.x = t_x;
                this.bloodBoardName.y = t_y;
            }
            if (this.ttfDes != null) {
                var _b = [this.ttfName.x, this.ttfName.y], t_x = _b[0], t_y = _b[1];
                var t_h = this.bloodBoardName.height;
                var _c = [t_x, t_y - t_h - zj.ConstantConfig_Wonderland.TREE_DES_NAME_OFFSET_Y], _x = _c[0], _y = _c[1];
                this.bloodBoardDes.x = _x;
                this.bloodBoardDes.y = _y;
                this.ttfDes.x = _x;
                this.ttfDes.y = _y;
            }
            if (this.commonLedAni != null && this.commonLedAni.isVisible() == true) {
                var _d = [this.ttfDes.x, this.ttfDes.y], t_x = _d[0], t_y = _d[1];
                var t_h = this.bloodBoardDes.height;
                this.commonLedAni.SetPosition(t_x, t_y - t_h / 2 - zj.ConstantConfig_Rpg.COMMON_LED_OFFSET_Y);
            }
        };
        StageRpgTree.prototype.LoadData = function () {
            this.scenePosInfo.posItem.scene_y = this.curScene.mapHeight - (this.scenePosInfo.posItem.scene_y);
            this.bMature = zj.yuan3(this.fruitCnt > 0, true, false);
            var x = Math.floor(this.scenePosInfo.posItem.scene_x / zj.ConstantConfig_Common.BLOCK_WIDTH) * zj.ConstantConfig_Common.BLOCK_WIDTH + zj.ConstantConfig_Common.BLOCK_WIDTH / 2;
            var y = Math.floor(this.scenePosInfo.posItem.scene_y / zj.ConstantConfig_Common.BLOCK_WIDTH) * zj.ConstantConfig_Common.BLOCK_WIDTH;
            this.map_x = x;
            this.map_y = y;
            var beInWater = zj.Helper.beInWonderlandWater(new egret.Point(this.map_x, this.map_y));
            var screen_x = this.map_x - (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
            var screen_y = this.map_y - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
            this.x = screen_x;
            this.y = screen_y;
            this.showTimeLine = this.info.time_show;
        };
        StageRpgTree.prototype.LoadView = function () {
            var isTime = zj.TableWonderlandTree.Item(this.info.tree_id).is_timeTree == 1;
            var can_pick = zj.Otherdb.inPeaceWonderlandNotPick(this.info.tree_id);
            var path = zj.yuan3(this.bMature, this.info.mature_path, this.info.immature_img);
            if (isTime) {
                path = zj.yuan3(can_pick, this.info.mature_path, this.info.immature_img);
                if (this.freshPeace == null || this.freshPeace != can_pick) {
                    this.freshPeace = can_pick;
                }
                else {
                    return;
                }
            }
            this.spritePic = this.LoadFruitAni(path, this.anchorPic, zj.yuan3(this.info.is_mirror == 0, false, true));
            this.sizePic = { width: this.spritePic.spine.width, height: this.spritePic.spine.height };
        };
        StageRpgTree.prototype.loadOther = function () {
            //self.nodeRoot:setLocalZOrder( math.floor(((self.order - self.map_y))) )  -- /80
            this.loadNameTitle();
            this.loadDesTitle();
            this.loadLedAni();
            this.loadRipeAni();
        };
        StageRpgTree.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.procMatureTime(tick);
            this.procForm();
            this.procRipeAni();
        };
        StageRpgTree.prototype.procMatureTime = function (tick) {
            var rt = tick * 1000;
            if (this.bMature == false) {
                this.matureTime = this.matureTime - rt;
                if (this.matureTime <= 0) {
                    this.matureTime = 0;
                }
                if (this.ttfDes.visible == true && this.unkonwnTime == false) {
                    this.ttfDes.textColor = zj.ConstantConfig_Common.Color.red;
                    var _str = zj.Helper.FormatMsTime3(this.matureTime / 1000);
                    var _tmp = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.fruit_mature_time_label, _str);
                    this.ttfDes.text = _tmp;
                    this.ttfDes.anchorOffsetX = this.ttfDes.width / 2;
                    this.ttfDes.anchorOffsetY = this.ttfDes.height / 2;
                }
            }
        };
        StageRpgTree.prototype.falshPic = function () {
            this.LoadView();
            this.loadDes();
            this.setRoot(this.x, this.y);
        };
        StageRpgTree.prototype.procForm = function () {
            var isTime = zj.TableWonderlandTree.Item(this.info.tree_id).is_timeTree == 1;
            if (isTime) {
                this.falshPic();
            }
            if (this.bMature == true && this.fruitCnt <= 0) {
                this.bMature = false;
                this.falshPic();
            }
            if (this.bMature == false && this.fruitCnt > 0) {
                this.bMature = true;
                this.falshPic();
            }
            if (this.bMature == false) {
                if (this.showTimeLine != -1) {
                    if (this.unkonwnTime == false && this.matureTime > this.showTimeLine * 1000) {
                        this.loadUnknownTime();
                        this.setRoot(this.x, this.y);
                    }
                    else if (this.unkonwnTime == true && this.matureTime <= this.showTimeLine * 1000) {
                        this.loadTime();
                        this.setRoot(this.x, this.y);
                    }
                }
            }
            if (this.uiCnt != this.fruitCnt) {
                this.uiCnt = this.fruitCnt;
                this.loadDes();
                this.setTagVisible(this.bTagVisible);
                this.setRoot(this.x, this.y);
            }
        };
        StageRpgTree.prototype.setFruitCnt = function (cnt) {
            this.fruitCnt = cnt;
        };
        StageRpgTree.prototype.setMatureTime = function (time) {
            this.matureTime = time * 1000;
        };
        StageRpgTree.prototype.dealSceneNotice = function (notice) {
            this.setScenePosInfo(notice);
            this.setFruitCnt(this.scenePosInfo.battleProtectTime);
            this.setMatureTime(this.scenePosInfo.deadProtectTime);
        };
        StageRpgTree.prototype.beInScope = function (x, y) {
            var screen_x = x + (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
            var screen_y = y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
            var yy = this.y; //this.curScene.mapHeight = 
            var tag = false;
            var rect = new egret.Rectangle();
            // rect.x = this.x - this.info.balk_rt[2]/2 + this.info.balk_rt[0];
            // rect.y = yy - this.info.balk_rt[1];
            // rect.width = this.info.balk_rt[2];
            // rect.height = this.info.balk_rt[3];
            // if(rect.containsPoint(new egret.Point(x,y)) == true){
            // 	tag = true;
            // }
            rect.x = this.x - this.info.touch_rt[2] / 2 + this.info.touch_rt[0];
            rect.y = yy - this.info.touch_rt[1];
            rect.y = rect.y - this.info.touch_rt[2];
            rect.width = this.info.touch_rt[2] + Math.abs(this.info.touch_rt[0]) * 2;
            rect.height = this.info.touch_rt[3];
            if (rect.containsPoint(new egret.Point(x, y)) == true) {
                tag = true;
            }
            return tag;
        };
        StageRpgTree.prototype.getEventPos = function () {
            return [this.x, this.y - this.sizePic.height / 2];
        };
        StageRpgTree.prototype.getVisibleRt = function () {
            var rt = new egret.Rectangle(this.x - this.sizePic.width / 2, this.y, this.sizePic.width, this.sizePic.height);
            return rt;
        };
        StageRpgTree.prototype.isExitShelter = function (x, y) {
            if (x > this.x + this.info.shelter_pos[0] - this.info.shelter_pos[2] / 2 && x < this.x + this.info.shelter_pos[0] + this.info.shelter_pos[2] / 2 && y > this.y + this.info.shelter_pos[3]) {
                return true;
            }
        };
        return StageRpgTree;
    }(zj.StageRpgObject));
    zj.StageRpgTree = StageRpgTree;
    __reflect(StageRpgTree.prototype, "zj.StageRpgTree");
})(zj || (zj = {}));
//# sourceMappingURL=StageRpgTree.js.map