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
    var StageRpgNpc = (function (_super) {
        __extends(StageRpgNpc, _super);
        function StageRpgNpc(node, order) {
            var _this = _super.call(this, node, order) || this;
            _this.rectVisibleRt = new egret.Rectangle();
            return _this;
        }
        StageRpgNpc.prototype.release = function () {
            _super.prototype.release.call(this);
        };
        StageRpgNpc.prototype.InitNpc = function (info, scenePosInfo) {
            this.info = info;
            this.setScenePosInfo(null);
            this.LoadData();
            this.LoadView();
            this.loadOther();
            this.setRoot(this.x, this.y);
        };
        StageRpgNpc.prototype.LoadData = function () {
            this.map_x = this.info.build_x;
            this.map_y = this.curScene.mapHeight - (this.info.build_y); //this.curScene.MapBlockH - 
            var screen_x = this.map_x - (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
            var screen_y = this.map_y - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
            this.x = screen_x;
            this.y = screen_y;
        };
        StageRpgNpc.prototype.LoadView = function () {
            this.funType = -1;
            this.anchorSpine = new egret.Point(0, 0);
            if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Door) {
                //传送门
                this.spineAni = this.LoadFruitAni(this.info.spine_id, this.anchorSpine, zj.yuan3(this.info.is_mirror == 0, false, true));
            }
            else if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.DoubleColor) {
                //双色果西索
                this.spineAni = this.LoadGeneral(this.info, this.anchorSpine, this.info.spine_scale, zj.yuan3(this.info.is_mirror == 0, false, true));
            }
            else if (this.info.build_id == zj.TableEnum.Enum.PortNpc.SafeLine || this.info.build_id == zj.TableEnum.Enum.PortNpc.SafeUp || this.info.build_id == zj.TableEnum.Enum.PortNpc.SafeDown || this.info.build_id == zj.TableEnum.Enum.PortNpc.SafeUp2) {
                this.anchorSpine = new egret.Point(0, 0);
                this.spineAni = this.LoadPicWithPath(this.info.path, this.anchorSpine, zj.yuan3(this.info.is_mirror == 0, false, true));
            }
            else if (this.info.build_id == zj.TableEnum.Enum.ActivityNpc.ActivityBoss) {
                //年兽BOSS
                this.spineAni = this.LoadGeneral(this.info, this.anchorSpine, this.info.spine_scale, zj.yuan3(this.info.is_mirror == 0, false, true));
            }
            else if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Port) {
                this.funType = message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND;
                // 港口
                this.spineAni = this.LoadSpine(this.info, this.anchorSpine, this.info.spine_scale, zj.yuan3(this.info.is_mirror == 0, false, true));
            }
            else if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Boss) {
                this.funType = message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS;
                // BOSS
                this.spineAni = this.LoadGeneral(this.info, this.anchorSpine, this.info.spine_scale, zj.yuan3(this.info.is_mirror == 0, false, true));
            }
            else if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.PassCheck) {
                this.funType = 67;
                // 工作派遣
                this.spineAni = this.LoadGeneral(this.info, this.anchorSpine, this.info.spine_scale, zj.yuan3(this.info.is_mirror == 0, false, true));
            }
            else {
                this.spineAni = this.LoadSpine(this.info, this.anchorSpine, this.info.spine_scale, zj.yuan3(this.info.is_mirror == 0, false, true));
            }
            if (this.info.name_path == "") {
                return;
            }
            // 头顶图标，红点等
            if (this.info.build_id != zj.TableEnum.Enum.ActivityNpc.ActivityBoss) {
                var path1 = zj.UIConfig.UIConfig_City.BuildName_Normal;
                var pathTip = zj.UIConfig.UIConfig_City.BuildName_Tip;
                this.back1 = new eui.Image(path1);
                this.tips = new eui.Image(pathTip);
                this.back1.visible = true;
                this.back1.x = this.info.name_pos[0] - 70;
                this.back1.y = -(this.info.name_pos[1] + 30);
                this.tips.x = this.info.name_pos[0] + 40;
                this.tips.y = -(this.info.name_pos[1] + 30);
                this.titleSpace.addChild(this.back1);
                this.titleSpace.addChild(this.tips);
                var bar = new eui.Image(this.info.name_path);
                bar.x = -this.info.name_pos[0] - 50;
                bar.y = -(this.info.name_pos[1] + 15);
                this.titleSpace.addChild(bar);
                this.sizePic = { width: this.spineAni.width, height: this.spineAni.height };
                // 开启等级
                this.initOpenLabel();
                // 世界BOSS和港口加上倒计时
                this.initTimes();
            }
        };
        StageRpgNpc.prototype.initOpenLabel = function () {
            if (this.funType != -1) {
                var isOpen = zj.PlayerHunterSystem.LevelDBFunOpenTo(this.funType);
                if (!isOpen) {
                    var dbitem = zj.TableFunctionOpen.Item(this.funType);
                    if (dbitem != null) {
                        var label = new eui.Label();
                        label.size = 18;
                        label.x = this.back1.x + 43;
                        label.y = this.back1.y + 52;
                        label.stroke = 1.5;
                        label.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.openAutoLv, dbitem.condition);
                        this.titleSpace.addChild(label);
                        this.labelOpen = label;
                    }
                }
            }
        };
        StageRpgNpc.prototype.initTimes = function () {
            if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Boss
                || this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Port) {
                var group = new eui.Group();
                group.touchEnabled = group.touchChildren = false;
                group.width = 210;
                group.height = 34;
                var imgBG = new eui.Image("ui_wonderland_BoardBossEnter_png");
                imgBG.width = group.width;
                imgBG.height = group.height;
                group.addChild(imgBG);
                var imgIcon = new eui.Image("ui_wonderland_IconBossTime_png");
                imgIcon.width = 32;
                imgIcon.height = 33;
                imgIcon.verticalCenter = "0";
                imgIcon.x = 12;
                group.addChild(imgIcon);
                var label = new eui.Label();
                label.size = 20;
                label.horizontalCenter = "" + (imgIcon.width) / 2;
                label.verticalCenter = "0";
                group.addChild(label);
                group.x = this.info.name_pos[0] - group.width / 2;
                group.y = -(this.info.name_pos[1] + 60);
                this.titleSpace.addChild(group);
                group.visible = false;
                this.labelTime = label;
                this.groupTime = group;
            }
        };
        StageRpgNpc.prototype.udpateTimes = function () {
            if (this.labelOpen) {
                var isOpen = zj.PlayerHunterSystem.LevelDBFunOpenTo(this.funType);
                if (isOpen) {
                    this.labelOpen.parent.removeChild(this.labelOpen);
                    this.labelOpen = null;
                }
                else {
                    return;
                }
            }
            if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Boss) {
                this.updateBossTime();
            }
            else if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Port) {
                this.updatePortTime();
            }
        };
        StageRpgNpc.prototype.updateBossTime = function () {
            var openBoss = zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS);
            if (openBoss) {
                var progress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS];
                if (progress) {
                    if (this.bossState != progress.info) {
                        this.bossState = progress.info;
                    }
                    if (progress.leftTime == 0) {
                        zj.Game.PlayerZorkSystem.bossInfo();
                    }
                }
                zj.Game.PlayerZorkSystem.bossInfo().then(function () { });
                var strTime = progress.leftTime; //- Math.floor(egret.getTimer() / 1000);
                var strTimeText = zj.Helper.GetTimeStr(strTime > 0 ? strTime : 0, false);
                if (this.bossState == 0) {
                    this.labelTime.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, strTimeText));
                }
                else {
                    this.labelTime.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, strTimeText));
                }
            }
            this.groupTime.visible = openBoss;
        };
        StageRpgNpc.prototype.updatePortTime = function () {
            var openPort = zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND);
            if (openPort) {
                var _a = zj.PlayerDarkSystem.PortOpenTime(), bOpen = _a[0], lastTime = _a[1];
                var strTime = zj.Set.timeLeaveSec(lastTime);
                if (!bOpen) {
                    this.labelTime.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, strTime));
                }
                else {
                    this.labelTime.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, strTime));
                }
            }
            this.groupTime.visible = openPort;
        };
        StageRpgNpc.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.UpdateTips();
            this.udpateTimes();
        };
        StageRpgNpc.prototype.getVisibleRt = function () {
            return this.rectVisibleRt.setTo(this.x - 40, this.y, 80, 200);
        };
        StageRpgNpc.prototype.UpdateTips = function () {
            if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Exchange) {
                this.tips.visible = zj.otherdb.exchangeTips();
            }
            else if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Mora) {
                this.tips.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.RUNES);
            }
            else if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Fish) {
                this.tips.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.FISH);
            }
            else if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.DoubleColor) {
                this.tips.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.DOUBLE);
            }
            else if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Boss) {
                this.tips.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.ZORK_BOSS);
            }
            else if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Port) {
                this.tips.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.PORT);
            }
            else if (this.info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.PassCheck) {
                this.tips.visible = false;
            }
        };
        StageRpgNpc.prototype.isCanBeTouch = function () {
            var tag = false;
            if (this.info.be_attacked == 1) {
                tag = true;
            }
            return tag;
        };
        StageRpgNpc.prototype.loadOther = function () {
            if (this.info.draw_order == 5) {
                if (this.info.build_id == zj.TableEnum.Enum.PortNpc.SafeLine || this.info.build_id == zj.TableEnum.Enum.PortNpc.SafeUp2 || this.info.build_id == zj.TableEnum.Enum.PortNpc.SafeUp) {
                    this.nodeRoot.parent.addChild(this.nodeRoot);
                }
                else {
                    //有问题
                }
            }
        };
        StageRpgNpc.prototype.beInScope = function (x, y) {
            // let tag = false;
            // let rect: egret.Rectangle = new egret.Rectangle(this.x - this.info.balk_rt[2] / 2 + this.info.balk_rt[0], this.y + this.info.balk_rt[1] - this.info.balk_rt[3], this.info.balk_rt[2], this.info.balk_rt[3]);
            // let rect1: egret.Rectangle = new egret.Rectangle(this.x - this.info.touch_rt[2] / 2 + this.info.touch_rt[0], this.y + this.info.touch_rt[1] - this.info.touch_rt[3], this.info.touch_rt[2], this.info.touch_rt[3]);
            // let point = new egret.Point(x, y);
            // if (rect.containsPoint(point) == true) {
            // 	tag = true;
            // }
            // if (rect1.containsPoint(point) == true) {
            // 	tag = true;
            // }
            // return tag;
            return zj.Util.isPointInRect(this.x - this.info.balk_rt[2] / 2 + this.info.balk_rt[0], this.y + this.info.balk_rt[1] - this.info.balk_rt[3], this.info.balk_rt[2], this.info.balk_rt[3], x, y)
                || zj.Util.isPointInRect(this.x - this.info.touch_rt[2] / 2 + this.info.touch_rt[0], this.y + this.info.touch_rt[1] - this.info.touch_rt[3], this.info.touch_rt[2], this.info.touch_rt[3], x, y);
        };
        StageRpgNpc.prototype.getEventPos = function () {
            return [this.x, this.y - 100];
        };
        StageRpgNpc.prototype.OnTouchDown = function (touchs, event) {
            // let a = 1;
        };
        StageRpgNpc.prototype.OnTouchMove = function (touchs, event) {
            // let a = 1;
        };
        StageRpgNpc.prototype.OnTouchUp = function (touchs, event) {
            // let a = 1;
        };
        return StageRpgNpc;
    }(zj.StageRpgObject));
    zj.StageRpgNpc = StageRpgNpc;
    __reflect(StageRpgNpc.prototype, "zj.StageRpgNpc");
})(zj || (zj = {}));
//# sourceMappingURL=StageRpgNpc.js.map