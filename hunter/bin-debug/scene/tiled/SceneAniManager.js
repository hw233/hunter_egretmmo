var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var SceneAniManager = (function () {
        function SceneAniManager(scene) {
            this.scene = scene;
            this.floatList = [];
        }
        SceneAniManager.prototype.init = function () {
            this.initImgFloat(this.scene);
            this.initWave(this.scene);
            this.initDove(this.scene);
            this.initSnowflake(this.scene);
        };
        /** 海浪 */
        SceneAniManager.prototype.initWave = function (stage) {
            var layer = stage.getLayer(zj.LAYER_TYPE.surface);
            var res = "imgWave";
            var aniName = "advent_ani_wave";
            var idx = 0;
            this.aniList = [];
            while (stage[res + idx]) {
                var img = stage[res + idx];
                var ani = zj.Game.AnimationManager.createTime(aniName, 100, 600);
                if (ani) {
                    ani.x = img.x;
                    ani.y = img.y;
                    ani.rotation = img.rotation;
                    layer.addChild(ani);
                    ani.onPlay();
                    this.aniList.push(ani);
                }
                img.parent.removeChild(img);
                ++idx;
            }
        };
        /** 浮动单位 */
        SceneAniManager.prototype.initImgFloat = function (stage) {
            var res = "imgFloat";
            var idx = 0;
            while (stage[res + idx]) {
                var body = new FloatBody();
                body.init(stage[res + idx]);
                this.floatList.push(body);
                ++idx;
            }
        };
        /** 鸽子 */
        SceneAniManager.prototype.initDove = function (stage) {
            var layer = stage.getLayer(zj.LAYER_TYPE.top);
            this.dove = new AdventDove();
            this.dove.init(stage, layer);
            layer.addChild(this.dove.dislay);
        };
        /** 雪花 */
        SceneAniManager.prototype.initSnowflake = function (stage) {
            // let layer = stage.getLayer(LAYER_TYPE.surface);
        };
        SceneAniManager.prototype.onEntryScene = function () {
            if (this.aniList) {
                var layer = this.scene.getLayer(zj.LAYER_TYPE.surface);
                for (var i = 0; i < this.aniList.length; ++i) {
                    if (!this.dove.dislay.parent) {
                        layer.addChild(this.aniList[i]);
                    }
                }
            }
            if (this.dove && this.dove.dislay) {
                var layer = this.scene.getLayer(zj.LAYER_TYPE.top);
                if (!this.dove.dislay.parent) {
                    layer.addChild(this.dove.dislay);
                }
            }
        };
        SceneAniManager.prototype.onLeaveScene = function () {
            if (this.aniList) {
                var layer = this.scene.getLayer(zj.LAYER_TYPE.surface);
                for (var i = 0; i < this.aniList.length; ++i) {
                    if (this.aniList[i].parent) {
                        layer.removeChild(this.aniList[i]);
                    }
                }
            }
            if (this.dove && this.dove.dislay && this.dove.dislay.parent) {
                var layer = this.scene.getLayer(zj.LAYER_TYPE.top);
                layer.removeChild(this.dove.dislay);
            }
        };
        SceneAniManager.prototype.Update = function (dt) {
            if (this.floatList) {
                for (var i = 0; i < this.floatList.length; ++i) {
                    this.floatList[i].update(dt);
                }
            }
            if (this.dove) {
                this.dove.update(dt);
            }
        };
        SceneAniManager.prototype.release = function () {
            if (this.aniList) {
                for (var i = 0; i < this.aniList.length; ++i) {
                    this.aniList[i].onRelease();
                    this.aniList[i] = null;
                }
                this.aniList = null;
            }
            if (this.dove) {
                this.dove.onRelease();
                this.dove = null;
            }
        };
        return SceneAniManager;
    }());
    zj.SceneAniManager = SceneAniManager;
    __reflect(SceneAniManager.prototype, "zj.SceneAniManager");
    /** 副本地图鸽子 */
    var AdventDove = (function () {
        function AdventDove() {
        }
        AdventDove.prototype.init = function (scene, layer) {
            this.scene = scene;
            this.dislay = zj.Game.AnimationManager.create("advent_ani_dove");
            this.offx = 30; // 向右飞
            this.offy = -this.offx * 0.71; // 向上飞
            layer.addChild(this.dislay);
            this.dislay.onPlay();
            this.stop();
        };
        AdventDove.prototype.stop = function () {
            this.dislay.visible = false;
            this.timeWait = zj.Util.randomValue(1, 3);
            this.state = 0;
        };
        AdventDove.prototype.setFlyStart = function () {
            var minX = this.scene.getMapX() - 100;
            var maxX = minX + zj.UIManager.StageWidth + 100;
            var x = zj.Util.randomValue(minX, maxX) + this.scene.getMapX();
            var y = this.scene.getMapY() + zj.UIManager.StageHeight + 100;
            this.dislay.x = x;
            this.dislay.y = y;
            this.dislay.visible = true;
            this.state = 1;
        };
        AdventDove.prototype.update = function (dt) {
            if (this.state == 0) {
                this.timeWait -= dt;
                if (this.timeWait <= 0) {
                    this.setFlyStart();
                }
            }
            else {
                this.dislay.x += this.offx * dt;
                this.dislay.y += this.offy * dt;
                if (this.dislay.y + 100 < this.scene.getMapY()) {
                    this.stop();
                }
            }
        };
        AdventDove.prototype.onRelease = function () {
            this.dislay.onRelease();
            this.dislay = null;
        };
        return AdventDove;
    }());
    zj.AdventDove = AdventDove;
    __reflect(AdventDove.prototype, "zj.AdventDove");
    /** 浮动对象 */
    var FloatBody = (function () {
        function FloatBody() {
        }
        FloatBody.prototype.init = function (img) {
            this.display = img;
            this.min = img.y - 20;
            this.max = img.y + 20;
            this.sp = zj.Util.randomValue(6, 8);
            this.display.y = zj.Util.randomValue(this.min, this.max);
            this.sp = zj.Util.randomValue(0, 100) < 50 ? -this.sp : this.sp;
        };
        FloatBody.prototype.update = function (dt) {
            this.display.y += this.sp * dt;
            if (this.display.y >= this.max || this.display.y <= this.min) {
                this.sp = -this.sp;
            }
        };
        return FloatBody;
    }());
    zj.FloatBody = FloatBody;
    __reflect(FloatBody.prototype, "zj.FloatBody");
})(zj || (zj = {}));
//# sourceMappingURL=SceneAniManager.js.map