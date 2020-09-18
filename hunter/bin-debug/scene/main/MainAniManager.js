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
    var MainAniManager = (function () {
        function MainAniManager(scene) {
            this.scene = scene;
            this.moveList = [];
            this.flashList = [];
            this.screenList = [];
            this.carImgs = [];
        }
        MainAniManager.prototype.addImgFlash = function (img) {
            var data = img.name.split(",");
            var body = new FlashBody();
            body.display = img;
            if (data) {
                if (data[0])
                    body.timeMin = Number(data[0]);
                if (data[1])
                    body.timeMax = Number(data[1]);
                if (data[2])
                    body.alphaMax = Number(data[2]);
                if (data[3])
                    body.timeShow = Number(data[3]);
            }
            this.flashList.push(body);
            body.reset();
        };
        MainAniManager.prototype.addImgLight = function (img) {
            var body = new LightBody();
            body.display = img;
            this.flashList.push(body);
            body.reset();
        };
        MainAniManager.prototype.addImgMove = function (img) {
            var data = -4;
            if (img.name.length > 0) {
                data = Number(img.name);
            }
            var body = new MoveBody();
            body.display = img;
            body.sp = data;
            body.minX = 90;
            body.maxX = this.scene.mapWidth;
            this.moveList.push(body);
        };
        MainAniManager.prototype.addCloud = function (img) {
            this.addImgMove(img);
        };
        MainAniManager.prototype.addDove = function (ani) {
            var body = new ScreenBody();
            body.scene = this.scene;
            body.display = ani;
            body.sp = -6;
            body.checkMin = 1078;
            body.checkMax = 2324;
            this.screenList.push(body);
        };
        MainAniManager.prototype.addCar = function (img) {
            img.visible = false;
            this.carImgs.push(img);
        };
        MainAniManager.prototype.initCar = function () {
            if (this.carImgs.length == 4) {
                var body1 = new CarBody();
                body1.display = [this.carImgs[0], this.carImgs[1]];
                body1.posList = [MainAniManager.carPosList[0], MainAniManager.carPosList[1]];
                body1.scaleList = [MainAniManager.cardScales[0], MainAniManager.cardScales[1]];
                body1.sp = [Number(this.carImgs[0].name), Number(this.carImgs[1].name)];
                body1.init();
                var body2 = new CarBody();
                body2.display = [this.carImgs[2], this.carImgs[3]];
                body2.posList = [MainAniManager.carPosList[2], MainAniManager.carPosList[3]];
                body2.scaleList = [MainAniManager.cardScales[2], MainAniManager.cardScales[3]];
                body2.sp = [Number(this.carImgs[2].name), Number(this.carImgs[3].name)];
                body2.init();
                this.carList = [body1, body2];
            }
        };
        MainAniManager.prototype.Update = function (tick) {
            var mapLeft = this.scene.getScreenLeft();
            var mapRight = this.scene.getScreenRight();
            for (var i = 0; i < this.moveList.length; ++i) {
                this.moveList[i].update(tick);
            }
            for (var i = 0; i < this.flashList.length; ++i) {
                this.flashList[i].update(tick);
            }
            for (var i = 0; i < this.screenList.length; ++i) {
                this.screenList[i].update(tick, mapLeft, mapRight);
            }
            for (var i = 0; i < this.carList.length; ++i) {
                this.carList[i].update(tick);
            }
        };
        MainAniManager.prototype.onEntryTopScene = function () {
            for (var i = 0; i < this.flashList.length; ++i) {
                this.flashList[i].reset();
            }
        };
        MainAniManager.prototype.onLeaveTopScene = function () {
            for (var i = 0; i < this.flashList.length; ++i) {
                this.flashList[i].onClose();
            }
        };
        MainAniManager.prototype.onRelease = function () {
        };
        MainAniManager.carPosList = [[new egret.Point(2236, 440), new egret.Point(1946, 310), new egret.Point(1850, 278), new egret.Point(1776, 256)],
            [new egret.Point(2158, 445), new egret.Point(1930, 323), new egret.Point(1855, 290), new egret.Point(1771, 264)],
            [new egret.Point(1581, 265), new egret.Point(1508, 285), new egret.Point(1466, 306), new egret.Point(1416, 346)],
            [new egret.Point(1581, 267), new egret.Point(1544, 277), new egret.Point(1487, 304), new egret.Point(1434, 346)]];
        MainAniManager.cardScales = [[1, 0.3], [1, 0.2], [0.3, 1], [0.3, 1]];
        return MainAniManager;
    }());
    zj.MainAniManager = MainAniManager;
    __reflect(MainAniManager.prototype, "zj.MainAniManager");
    /** 主界面汽车单位 */
    var CarBody = (function () {
        function CarBody() {
        }
        CarBody.prototype.init = function () {
            this.waitTimeMin = 2000;
            this.waitTimeMax = 6000;
            for (var i = 0; i < this.display.length; ++i) {
                this.display[i].visible = false;
            }
            this.dispAll = [];
            for (var i = 0; i < this.posList.length; ++i) {
                this.dispAll[i] = 0;
                for (var j = 1; j < this.posList[i].length; ++j) {
                    this.dispAll[i] += zj.Util.pDisPoint(this.posList[i][j - 1].x, this.posList[i][j - 1].y, this.posList[i][j].x, this.posList[i][j].y);
                }
            }
            this.carIdx = 0;
            this.setWait();
        };
        CarBody.prototype.setWait = function () {
            this.dispMove = 0;
            this.state = 0;
            this.stepIdx = 0;
            this.waitTimeCurr = zj.Util.randomValue(this.waitTimeMin, this.waitTimeMax) / 1000;
        };
        CarBody.prototype.runFinish = function () {
            this.carIdx = (this.carIdx + 1) % this.display.length;
            this.setWait();
        };
        CarBody.prototype.getCar = function () {
            return this.display[this.carIdx];
        };
        CarBody.prototype.update = function (dt) {
            if (this.state == 0) {
                this.waitTimeCurr -= dt;
                if (this.waitTimeCurr <= 0) {
                    var car = this.getCar();
                    car.x = this.posList[this.carIdx][0].x;
                    car.y = this.posList[this.carIdx][0].y;
                    car.scaleX = car.scaleY = this.scaleList[this.carIdx][0];
                    car.visible = true;
                    this.stepIdx = 1;
                    this.state = 1;
                }
            }
            else {
                var car = this.getCar();
                var endP = this.posList[this.carIdx][this.stepIdx];
                var tsp = this.sp[this.carIdx] * dt;
                var _a = zj.Util.moveObj(car, tsp, endP.x, endP.y), isFinish = _a[0], offx = _a[1], offy = _a[2];
                car.x += offx;
                car.y += offy;
                this.dispMove += tsp;
                var scales = this.scaleList[this.carIdx];
                car.scaleX = car.scaleY = scales[0] + (scales[1] - scales[0]) * (this.dispMove / this.dispAll[this.carIdx]);
                if (isFinish) {
                    if (this.stepIdx < this.posList[this.carIdx].length - 1) {
                        ++this.stepIdx;
                    }
                    else {
                        car.visible = false;
                        this.runFinish();
                    }
                }
            }
        };
        return CarBody;
    }());
    zj.CarBody = CarBody;
    __reflect(CarBody.prototype, "zj.CarBody");
    /** 与屏幕位置有逻辑的运行单位 */
    var ScreenBody = (function () {
        function ScreenBody() {
        }
        ScreenBody.prototype.update = function (dt, mapLeft, mapRight) {
            this.display.x += this.sp * dt;
            if (this.sp < 0) {
                if (this.display.x + this.display.width < this.checkMin && this.isOutScreen(mapLeft, mapRight)) {
                    this.display.x = Math.max(mapRight, this.checkMax) + 20;
                }
            }
            else {
                if (this.display.x > this.checkMax && this.isOutScreen(mapLeft, mapRight)) {
                    this.display.x = Math.min(mapLeft, this.checkMin) - this.display.width - 20;
                }
            }
        };
        ScreenBody.prototype.isOutScreen = function (mapLeft, mapRight) {
            return this.display.x + this.display.width < mapLeft
                || this.display.x > mapRight;
        };
        return ScreenBody;
    }());
    zj.ScreenBody = ScreenBody;
    __reflect(ScreenBody.prototype, "zj.ScreenBody");
    /** 移动单位 */
    var MoveBody = (function () {
        function MoveBody() {
        }
        MoveBody.prototype.update = function (dt) {
            this.display.x += this.sp * dt;
            if (this.sp < 0) {
                if (this.display.x + this.display.width < this.minX) {
                    this.display.x = this.maxX;
                }
            }
            else {
                if (this.display.x > this.maxX) {
                    this.display.x = this.minX - this.display.width;
                }
            }
        };
        return MoveBody;
    }());
    zj.MoveBody = MoveBody;
    __reflect(MoveBody.prototype, "zj.MoveBody");
    /** 闪烁单位基类单位（此为阳光类，阳光闪烁逻辑） */
    var LightBody = (function () {
        function LightBody() {
        }
        LightBody.prototype.reset = function () {
            this.display.visible = false;
            this.timeCurr = 4;
            this.state = 0;
        };
        LightBody.prototype.setFlash = function () {
            var _this = this;
            this.state = 1;
            this.display.alpha = 0;
            this.display.visible = true;
            egret.Tween.get(this.display)
                .to({ alpha: 0.3 }, 1200)
                .wait(1000)
                .to({ alpha: 0.2 }, 400)
                .wait(800)
                .to({ alpha: 0.4 }, 1200)
                .wait(3000)
                .to({ alpha: 0 }, 3000)
                .call(function () {
                _this.onClose();
            });
        };
        LightBody.prototype.onClose = function () {
            egret.Tween.removeTweens(this.display);
            this.reset();
        };
        LightBody.prototype.update = function (dt) {
            if (this.state == 0) {
                this.timeCurr -= dt;
                if (this.timeCurr <= 0) {
                    this.setFlash();
                }
            }
        };
        return LightBody;
    }());
    zj.LightBody = LightBody;
    __reflect(LightBody.prototype, "zj.LightBody");
    /** 闪烁子类 */
    var FlashBody = (function (_super) {
        __extends(FlashBody, _super);
        function FlashBody() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.timeMin = 2000;
            _this.timeMax = 10000;
            _this.alphaMax = 1;
            _this.timeShow = 1000;
            _this.timeOpen = 800;
            _this.timeClose = 800;
            return _this;
        }
        FlashBody.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.timeCurr = zj.Util.randomValue(this.timeMin, this.timeMax) / 1000;
        };
        FlashBody.prototype.setFlash = function () {
            var _this = this;
            this.state = 1;
            this.display.alpha = 0;
            this.display.visible = true;
            egret.Tween.get(this.display)
                .to({ alpha: this.alphaMax }, this.timeOpen)
                .wait(this.timeShow)
                .to({ alpha: 0 }, this.timeClose)
                .call(function () {
                _this.onClose();
            });
        };
        return FlashBody;
    }(LightBody));
    zj.FlashBody = FlashBody;
    __reflect(FlashBody.prototype, "zj.FlashBody");
})(zj || (zj = {}));
//# sourceMappingURL=MainAniManager.js.map