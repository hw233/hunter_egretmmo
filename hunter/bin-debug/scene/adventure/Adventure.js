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
    var Adventure = (function (_super) {
        __extends(Adventure, _super);
        function Adventure() {
            return _super.call(this) || this;
        }
        Adventure.prototype.setInfo = function (owner, idx) {
            this.owner = owner;
            this.idx = idx;
            this.initData();
        };
        Adventure.prototype.initData = function () {
            this.imgElite.touchEnabled = false;
            this.adventureTitle.touchEnabled = false;
            this.adventureTitle.touchChildren = false;
            var touch = this["touch"];
            this.touchRect = new egret.Rectangle(this.x + touch.x, this.y - this.anchorOffsetY + touch.y, touch.width, touch.height);
            this.removeChild(touch);
            this.initAni();
        };
        Adventure.prototype.initAni = function () {
            var res = "ani";
            var idx = 0;
            while (this[res + idx]) {
                var display = this[res + idx];
                var name_1 = display.name;
                if (name_1) {
                    var ani = zj.Game.AnimationManager.create(name_1);
                    if (ani) {
                        ani.x = display.x;
                        ani.y = display.y;
                        var idx_1 = this.getChildIndex(display);
                        this.addChildAt(ani, idx_1);
                        ani.onPlay();
                    }
                }
                this.removeChild(display);
                ++idx;
            }
        };
        Adventure.prototype.setData = function (_data) {
            this.data = _data;
            this.adventureTitle.setData(this.owner, _data);
        };
        Object.defineProperty(Adventure.prototype, "id", {
            get: function () {
                return this.idx;
            },
            enumerable: true,
            configurable: true
        });
        Adventure.prototype.setMaxArea = function (maxId) {
            if (this.id <= zj.SceneManager.adventureOpenMax) {
                if (this.id < maxId) {
                    this.adventureTitle.setState(1); // 0-未开启，1-开启，2-当前, 3-下一关
                }
                else if (this.id == maxId) {
                    this.adventureTitle.setState(2);
                }
                else if (this.id == maxId + 1) {
                    this.adventureTitle.setState(3, this.checkLockType(maxId));
                }
                else {
                    this.adventureTitle.setState(0);
                }
            }
            else {
                this.adventureTitle.setState(0);
            }
        };
        Adventure.prototype.checkLockType = function (maxId) {
            var customInstanceInfo = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL];
            var maxMobID = customInstanceInfo.maxMobID;
            // 判断上一关卡是否全部通关
            var lastChapterNormal = zj.TableChapterNormal.Item(maxId);
            var chapters = lastChapterNormal.chapter_pack;
            var modId = chapters[chapters.length - 1];
            var isPass = customInstanceInfo.mobsMap[modId] && customInstanceInfo.mobsMap[modId].star > 0;
            if (isPass) {
                // 等级限制
                if (zj.Game.PlayerInfoSystem.Level < this.data.open_level) {
                    return zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Instance.instanceLockLevel, this.data.open_level);
                }
                else {
                    // 副本限制
                    var chapter = zj.Game.PlayerInstanceSystem.ChapterInstance(this.data.area_normal[0]);
                    var instanceData = zj.TableInstance.Item(chapter.chapter_pack[0]);
                    if (instanceData.challenge_level > 0) {
                        var _a = zj.Game.PlayerInstanceSystem.getChapterByInstanceId(instanceData.challenge_level), chapterLock = _a[0], idx = _a[1];
                        if (chapterLock) {
                            return zj.TextsConfig.TextConfig_Instance.instanceLockElite + chapterLock.chapter_id + "-" + (idx + 1);
                        }
                    }
                }
            }
            return zj.TextsConfig.TextConfig_Instance.instanceLockNormal;
        };
        Adventure.prototype.setMaxElite = function (maxId) {
            if (this.id == maxId && this.id < zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL)) {
                this.imgElite.visible = true;
            }
            else {
                this.imgElite.visible = false;
            }
        };
        Adventure.prototype.setBorn = function (x, y) {
            this.bornX = x;
            this.bornY = y;
        };
        Adventure.prototype.isTouch = function (x, y) {
            return this.touchRect.contains(x, y);
        };
        Adventure.prototype.setTouch = function () {
            this.currentState = "down";
        };
        Adventure.prototype.clearTouch = function () {
            this.currentState = "up";
        };
        Adventure.prototype.getAniX = function () {
            return this.x - this.anchorOffsetX + this.adventureTitle.x + 80;
        };
        Adventure.prototype.getAniY = function () {
            return this.y - this.anchorOffsetY + this.adventureTitle.y + 34;
        };
        return Adventure;
    }(zj.UI));
    zj.Adventure = Adventure;
    __reflect(Adventure.prototype, "zj.Adventure");
})(zj || (zj = {}));
//# sourceMappingURL=Adventure.js.map