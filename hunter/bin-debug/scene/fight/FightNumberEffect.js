var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var FightNumberEffectMgr = (function () {
        function FightNumberEffectMgr() {
            this.tableNumbers = [];
            this.fatherNode = null;
            this.cutValue = 11;
        }
        FightNumberEffectMgr.prototype.addFightNumberEffect = function (eff) {
            // body
            if (this.fatherNode == null) {
                return;
            }
            this.tableNumbers.push(eff);
        };
        FightNumberEffectMgr.prototype.Pause = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var i = zj.adjustIndex(1);
            while (i < this.tableNumbers.length) {
                this.tableNumbers[i].Pause();
                i = i + 1;
            }
        };
        FightNumberEffectMgr.prototype.resume = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var i = zj.adjustIndex(1);
            while (i < this.tableNumbers.length) {
                this.tableNumbers[i].resume();
                i = i + 1;
            }
        };
        FightNumberEffectMgr.prototype.update = function (delta) {
            var self = this;
            // body
            var i = zj.adjustIndex(1);
            while (i < self.tableNumbers.length) {
                var tNumber = self.tableNumbers[i];
                var bFinish = tNumber.isFinish();
                if (bFinish == true) {
                    self.tableNumbers.splice(i, 1);
                    tNumber.release();
                }
                else {
                    tNumber.update(delta);
                    i = i + 1;
                }
            }
        };
        FightNumberEffectMgr.prototype.addToLayer = function (layer) {
            // body
            if (layer == null || this.fatherNode != null) {
                return;
            }
            //let sprite_path = "ccbResources/fight_ui/fight_number.plist"
            //let sprite_frame_cache = cc.SpriteFrameCache.getInstance()
            //sprite_frame_cache.addSpriteFramesWithFile(sprite_path)
            //let texture = cc.TextureCache.getInstance().getTextureForKey("ccbResources/fight_ui/fight_number.png")
            //this.batchNode = cc.SpriteBatchNode.createWithTexture(texture,256)
            //   let textureAtlas = this.batchNode.getTextureAtlas()
            //textureAtlas.resizeCapacity(1000)
            //layer.addChild(this.batchNode)
            this.fatherNode = layer;
        };
        FightNumberEffectMgr.prototype.removeFromLayer = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (this.fatherNode == null) {
                return;
            }
            for (var i = zj.adjustIndex(1); i < this.tableNumbers.length; i++) {
                this.tableNumbers[i].release();
                // CC_SAFE_DELETE(this.tableNumbers[i])
            }
            this.tableNumbers = [];
            this.fatherNode = null;
        };
        FightNumberEffectMgr.prototype.removeChildFromBatchNode = function (node) {
            // body
            if (node == null) {
                return;
            }
            this.fatherNode.removeChild(node);
        };
        FightNumberEffectMgr.prototype.addChildToBatchNode = function (node) {
            // body
            if (node == null) {
                return;
            }
            this.fatherNode.addChild(node);
        };
        FightNumberEffectMgr.prototype.getSpriteByFileName = function (fileName) {
            // body
            if (this.fatherNode == null) {
                return;
            }
            var texture = RES.getRes(fileName);
            var _sprite = zj.Game.ObjectPool.getItem("Bitmap", egret.Bitmap); //new egret.Bitmap();
            _sprite.alpha = 1;
            _sprite.visible = true;
            _sprite.x = 0;
            _sprite.y = 0;
            _sprite.scaleX = 1;
            _sprite.scaleY = 1;
            if (texture) {
                _sprite.texture = texture;
            }
            this.addChildToBatchNode(_sprite);
            return _sprite;
        };
        FightNumberEffectMgr.prototype.getNumSpriteByFileName = function (fileName, num, w, h, offset, is_sign) {
            // body
            if (this.fatherNode == null) {
                return [null, 0, 0];
            }
            var fontT = "";
            num = Math.floor(num);
            var _fondBitmap = zj.Game.ObjectPool.getItem("BitmapLabel", eui.BitmapLabel); //new eui.BitmapLabel();
            _fondBitmap.alpha = 1;
            _fondBitmap.visible = true;
            _fondBitmap.x = 0;
            _fondBitmap.y = 0;
            _fondBitmap.scaleX = 1;
            _fondBitmap.scaleY = 1;
            fileName = fileName.slice(0, -4);
            _fondBitmap.font = RES.getRes(fileName + "_fnt");
            _fondBitmap.text = num;
            this.addChildToBatchNode(_fondBitmap);
            return [_fondBitmap, 1, 1];
        };
        FightNumberEffectMgr.prototype.moveDistance = function (x, y) {
            // body
            for (var i = zj.adjustIndex(1); i < this.tableNumbers.length; i++) {
                var tNumber = this.tableNumbers[i];
                var mx = void 0, my = tNumber.getPos();
                tNumber.setPosition(mx - x, my - y);
            }
        };
        FightNumberEffectMgr.Instance = new FightNumberEffectMgr();
        return FightNumberEffectMgr;
    }());
    zj.FightNumberEffectMgr = FightNumberEffectMgr;
    __reflect(FightNumberEffectMgr.prototype, "zj.FightNumberEffectMgr");
    var FightNumberEffect = (function () {
        function FightNumberEffect() {
            this.count = 0;
            this.frame = 0;
            this.alpha = 1;
            this.word = null;
            this.eff_width = 0;
            this.eff_height = 0;
            this.x = 0;
            this.y = 0;
            this.word_x = 0;
            this.word_y = 0;
            this.gap = null;
            this.dir_right = true;
            this.b_finish = false;
            this.layout = zj.TableEnum.TableEnumNumLayout.Layout_Down_Up;
            this.tblConfig = { num: 0, tblX: [], tblY: [], tblOpacity: [], tblScaleX: [], tblScaleY: [] };
            this.maxCount = -1;
            this.bPause = false;
            // unknow
            this.scale = 1;
            this.orginal_x = 0;
            this.orginal_y = 0;
        }
        FightNumberEffect.prototype.newSetData = function () {
            this.b_finish = false;
            this.maxCount = -1;
            this.count = 0;
            this.frame = 0;
            this.alpha = 1;
            this.eff_width = 0;
            this.eff_height = 0;
            this.x = 0;
            this.y = 0;
            this.word_x = 0;
            this.word_y = 0;
            this.gap = null;
            this.dir_right = true;
            this.layout = zj.TableEnum.TableEnumNumLayout.Layout_Down_Up;
            this.tblConfig = { num: 0, tblX: [], tblY: [], tblOpacity: [], tblScaleX: [], tblScaleY: [] };
            this.bPause = false;
            // unknow
            this.scale = 1;
            this.orginal_x = 0;
            this.orginal_y = 0;
        };
        FightNumberEffect.prototype.Pause = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (this.bPause == false) {
                this.bPause = true;
                //if (this.eff != null) { this.eff.Pause() }
                //if (this.word != null) { this.word.Pause() }
            }
        };
        FightNumberEffect.prototype.resume = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.bPause == true) {
                this.bPause = false;
                //if (this.eff != null) { this.eff.resume() }
                //if (this.word != null) { this.word.resume() }
            }
        };
        FightNumberEffect.prototype.runAction = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_SPURTING) {
                this.runAction1();
            }
            else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_HIT_HALT) {
                this.runAction2();
            }
            else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_SHIFT) {
                this.runAction3();
            }
            else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Left_Right_Short) {
                this.runAction4();
            }
        };
        FightNumberEffect.prototype.runAction1 = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (this.layout != zj.TableEnum.TableEnumNumLayout.Layout_SPURTING) {
                return;
            }
        };
        FightNumberEffect.prototype.runAction2 = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.layout != zj.TableEnum.TableEnumNumLayout.Layout_HIT_HALT) {
                return;
            }
        };
        FightNumberEffect.prototype.runAction4 = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.layout != zj.TableEnum.TableEnumNumLayout.Layout_Left_Right_Short) {
                return;
            }
            var yy = this.y;
            if (this.eff != null) {
                egret.Tween.get(this.eff).to({ y: yy - 50 }, 500)
                    .call(function () {
                    _this.endMe();
                });
            }
            if (this.word != null) {
                if (this.eff == null) {
                    egret.Tween.get(this.word).to({ y: yy - 50 }, 500)
                        .call(function () {
                        _this.endMe();
                    });
                }
                else {
                    egret.Tween.get(this.word).to({ y: yy - 50 }, 500)
                        .call(function () {
                        _this.endMe();
                    });
                }
            }
        };
        FightNumberEffect.prototype.endMe = function () {
            // body
            this.b_finish = true;
        };
        FightNumberEffect.prototype.runAction3 = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.layout != zj.TableEnum.TableEnumNumLayout.Layout_SHIFT) {
                return;
            }
        };
        FightNumberEffect.prototype.release = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (this.eff != null) {
                egret.Tween.removeTweens(this.eff);
                this.eff.font = null;
                FightNumberEffectMgr.Instance.removeChildFromBatchNode(this.eff);
                zj.Game.ObjectPool.returnItem("BitmapLabel", this.eff);
                this.eff = null;
            }
            if (this.word != null) {
                egret.Tween.removeTweens(this.word);
                this.word.texture = null;
                FightNumberEffectMgr.Instance.removeChildFromBatchNode(this.word);
                zj.Game.ObjectPool.returnItem("Bitmap", this.word);
                this.word = null;
            }
            zj.Game.ObjectPool.returnItem("FightNumberEffect", this);
        };
        FightNumberEffect.prototype.update = function (tick) {
            // body
            if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_SPURTING || this.layout == zj.TableEnum.TableEnumNumLayout.Layout_HIT_HALT
                || this.layout == zj.TableEnum.TableEnumNumLayout.Layout_SHIFT || this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Left_Right_Short) {
                // null
            }
            else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Layout_New) {
                if (this.bPause == true) {
                    return;
                }
                if (this.count >= this.maxCount) {
                    return;
                }
                var rt = tick * 1000;
                this.frame = this.frame + rt;
                if (this.frame >= 33.3) {
                    this.updateLayerNew();
                    this.frame = this.frame - 33.3;
                    this.count = this.count + 1;
                }
            }
            else {
                if (this.bPause == true) {
                    return;
                }
                if (this.count >= 20) {
                    return;
                }
                var rt = tick * 1000;
                this.frame = this.frame + rt;
                if (this.frame >= 50) {
                    if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Down_Up) {
                        this.updateDownUp();
                    }
                    else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Up_Down) {
                        this.updateUpDown();
                    }
                    else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Left_Right) {
                        this.updateLeftRight();
                    }
                    this.frame = this.frame - 50;
                    this.count = this.count + 1;
                }
            }
        };
        FightNumberEffect.prototype.updateLayerNew = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var index = this.count + 1;
            var _a = [0, 0, 0, 0, 0], t_x = _a[0], t_y = _a[1], t_opacity = _a[2], t_scaleX = _a[3], t_scaleY = _a[4];
            if (true) {
                t_x = this.tblConfig.tblX[index];
                t_y = this.tblConfig.tblY[index];
                t_opacity = this.tblConfig.tblOpacity[index];
                t_scaleX = this.tblConfig.tblScaleX[index] * this.scale;
                t_scaleY = this.tblConfig.tblScaleY[index] * this.scale;
            }
            if (this.count < this.maxCount) {
                if (this.eff != null) {
                    this.eff.scaleX = t_scaleX;
                    this.eff.scaleY = t_scaleY;
                }
                if (this.word != null) {
                    this.word.scaleX = t_scaleX;
                    this.word.scaleY = t_scaleY;
                }
                if (this.eff != null) {
                    this.eff.alpha = t_opacity;
                }
                if (this.word != null) {
                    this.word.alpha = t_opacity;
                }
                //this.x = this.x + t_x
                //this.y = this.y + t_y
                var x = this.orginal_x + t_x;
                var y = this.orginal_y - t_y;
                this.setPosition(x, y);
            }
        };
        FightNumberEffect.prototype.updateDownUp = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        FightNumberEffect.prototype.updateUpDown = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        FightNumberEffect.prototype.updateLeftRight = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (this.count > 5 && this.count < 10) {
                this.y = this.y + 10;
                this.setPosition(this.x, this.y);
            }
            else if (this.count >= 10) {
                this.alpha = this.alpha - 0.3;
                if (this.alpha <= 0) {
                    this.alpha = 0;
                }
                this.y = this.y + 15;
                this.setPosition(this.x, this.y);
                if (this.eff != null) {
                    this.eff.alpha = this.alpha;
                }
                if (this.word != null) {
                    this.word.alpha = this.alpha;
                }
            }
        };
        FightNumberEffect.prototype.setData = function (x, y, scale, opacity) {
            this.orginal_x = x;
            this.orginal_y = y;
            this.setPosition(x, y);
            this.setScale(scale);
            this.setOpacity(opacity);
        };
        FightNumberEffect.prototype.setScale = function (scale) {
            if (this.word != null) {
                this.word.scaleX = scale;
                this.word.scaleY = scale;
            }
            if (this.eff != null) {
                this.eff.scaleX = scale;
                this.eff.scaleY = scale;
            }
        };
        FightNumberEffect.prototype.setOpacity = function (opacity) {
            if (this.word != null) {
                this.word.alpha = opacity;
            }
            if (this.eff != null) {
                this.eff.alpha = opacity;
            }
        };
        FightNumberEffect.prototype.setPosition = function (x, y) {
            // body
            this.x = x;
            this.y = y;
            if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Down_Up || this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Layout_New) {
                if (this.eff != null) {
                    this.eff.x = x;
                    this.eff.y = y;
                }
                if (this.word != null) {
                    this.word.x = x;
                    this.word.y = y + 30;
                }
            }
            else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Up_Down) {
                if (this.eff != null) {
                    this.eff.x = x;
                    this.eff.y = y;
                }
                if (this.word != null) {
                    this.word.x = x;
                    this.word.y = y - 50;
                }
            }
            else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Left_Right || this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Left_Right_Short) {
                // let gap = yuan3(this.gap == null, 20, this.gap)
                // let w = gap
                // let wordWidth = 0
                // if (this.eff != null) {
                //     w = w + this.eff_width
                // }
                // if (this.word != null){
                //     wordWidth = this.word.width;
                //     w = w + wordWidth
                // }
                // if (this.eff != null) {
                //     this.eff.anchorOffsetX = this.eff.width / 2;
                //     this.eff.anchorOffsetY = this.eff.height / 2;
                //     this.eff.x = x + w / 2 - this.eff_width / 2;
                //     this.eff.y = y;
                // }
                // if (this.word != null) {
                //     this.word.anchorOffsetX = this.word.width / 2;
                //     this.word.anchorOffsetY = this.word.height / 2;
                //     this.word.x = x - w / 2 + wordWidth / 2;
                //     this.word.y = y;
                // }
                if (this.eff != null) {
                    this.eff.x = x;
                    this.eff.y = y;
                }
                if (this.word != null) {
                    this.word.x = x - this.word.width;
                    this.word.y = y;
                }
            }
            else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_HIT_HALT) {
                // body
                var gap = 40;
                var w = gap;
                var wordWidth = 0;
                if (this.eff != null) {
                    w = w + this.eff_width;
                }
                if (this.word != null) {
                    wordWidth = this.word.width;
                    w = w + wordWidth;
                }
                if (this.eff != null) {
                    this.eff.anchorOffsetX = this.eff.width / 2;
                    this.eff.anchorOffsetY = this.eff.height / 2;
                    this.x = x + w / 2 - this.eff_width / 2;
                    this.y = y;
                    this.eff.scaleX = this.eff.scaleY = 0.8;
                    this.eff.alpha = 0.58;
                }
                if (this.word != null) {
                    this.word.anchorOffsetX = this.word.width / 2;
                    this.word.anchorOffsetY = this.word.height / 2;
                    this.word.x = x - w / 2 + wordWidth / 2;
                    this.word.y = y;
                    this.word.scaleX = this.word.scaleY = 0.8;
                    this.word.alpha = 0.58;
                }
            }
            else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_SHIFT) {
                // body
                var gap = 10;
                var w = gap;
                var wordWidth = 0;
                if (this.eff != null) {
                    w = w + this.eff_width;
                }
                if (this.word != null) {
                    wordWidth = this.word.width;
                    w = w + wordWidth;
                }
                var sign = zj.yuan3(this.dir_right == true, 1, -1);
                if (this.eff != null) {
                    this.eff.anchorOffsetX = this.eff.width / 2;
                    this.eff.anchorOffsetY = this.eff.height / 2;
                    this.eff.x = x + w / 2 - this.eff_width / 2 - sign * 100;
                    this.eff.y = y;
                    this.eff.alpha = 0;
                }
                if (this.word != null) {
                    this.word.anchorOffsetX = this.word.width / 2;
                    this.word.anchorOffsetY = this.word.height / 2;
                    this.word.x = x - w / 2 + wordWidth / 2 - sign * 100;
                    this.word.y = y;
                    this.word.alpha = 0;
                }
            }
            else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_SPURTING) {
                if (this.eff != null) {
                    this.eff.anchorOffsetX = this.eff.width;
                    this.eff.anchorOffsetY = this.eff.height / 2;
                    this.eff.x = x;
                    this.eff.y = y;
                }
                if (this.word != null) {
                    this.word.x = x;
                    this.word.y = y + 50;
                }
            }
        };
        FightNumberEffect.prototype.isFinish = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var tag = false;
            if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_SPURTING || this.layout == zj.TableEnum.TableEnumNumLayout.Layout_HIT_HALT
                || this.layout == zj.TableEnum.TableEnumNumLayout.Layout_SHIFT || this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Left_Right_Short) {
                tag = this.b_finish;
            }
            else if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Layout_New) {
                if (this.count >= this.maxCount) {
                    tag = true;
                }
            }
            else {
                if (this.count >= 20) {
                    tag = true;
                }
            }
            return tag;
        };
        FightNumberEffect.prototype.setNumberInfo = function (fileName, value, w, h, offset, scale, sign) {
            // body
            // for test
            //if( true ){ return }
            if (this.eff != null) {
                FightNumberEffectMgr.Instance.removeChildFromBatchNode(this.eff);
            }
            _a = FightNumberEffectMgr.Instance.getNumSpriteByFileName(fileName, value, w, h, offset, sign), this.eff = _a[0], this.eff_width = _a[1], this.eff_height = _a[2];
            var _a;
        };
        FightNumberEffect.prototype.setWordInfo = function (fileName) {
            // body
            if (this.word != null) {
                FightNumberEffectMgr.Instance.removeChildFromBatchNode(this.word);
            }
            this.word = FightNumberEffectMgr.Instance.getSpriteByFileName(fileName);
        };
        FightNumberEffect.prototype.setLayout = function (layout, param, scale) {
            // body
            this.layout = layout;
            if (this.layout == zj.TableEnum.TableEnumNumLayout.Layout_Layout_New && param != null) {
                if (param == 1) {
                    this.tblConfig = zj.ConstantConfig_CommonNum.yellowNumEffect;
                }
                else if (param == 2) {
                    this.tblConfig = zj.ConstantConfig_CommonNum.otherNumEffect;
                }
                else if (param == 3) {
                    this.tblConfig = zj.ConstantConfig_CommonNum.greenNumEffect;
                }
                else if (param == 4) {
                    this.tblConfig = zj.ConstantConfig_CommonNum.redNumEffect;
                }
                else if (param == 5) {
                    this.tblConfig = zj.ConstantConfig_CommonNum.whiteNumEffect;
                }
                this.maxCount = this.tblConfig.num;
                this.scale = zj.yuan3(scale == null, 1.0, scale);
            }
        };
        FightNumberEffect.prototype.getPos = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.x, this.y;
        };
        FightNumberEffect.prototype.start = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            FightNumberEffectMgr.Instance.addFightNumberEffect(this);
        };
        FightNumberEffect.prototype.setEffectDir = function (right) {
            // body
            this.dir_right = right;
        };
        FightNumberEffect.prototype.setGap = function (gap) {
            // body
            this.gap = gap;
        };
        return FightNumberEffect;
    }());
    zj.FightNumberEffect = FightNumberEffect;
    __reflect(FightNumberEffect.prototype, "zj.FightNumberEffect");
})(zj || (zj = {}));
//# sourceMappingURL=FightNumberEffect.js.map