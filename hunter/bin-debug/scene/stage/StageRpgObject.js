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
    var StageRpgObject = (function (_super) {
        __extends(StageRpgObject, _super);
        function StageRpgObject(node, order) {
            var _this = _super.call(this) || this;
            _this.map_x = 0;
            _this.map_y = 0;
            _this.sizeSpx = null;
            _this.sizeSpine = null;
            _this.sizePic = null;
            _this.anchorSpx = new egret.Point(0, 0);
            _this.anchorPic = new egret.Point(0, 0);
            _this.anchorSpine = new egret.Point(0, 0);
            _this.ledIndex = -1;
            _this.commonLedAni = null;
            _this.bVisible = true;
            _this.bEnemy = false;
            _this.rootNode = node;
            _this.nodeRoot = new eui.Group();
            _this.rootNode.addChild(_this.nodeRoot);
            _this.curScene = zj.StageSceneManager.Instance.GetCurScene();
            _this.info = null;
            _this.nodePos = new eui.Group();
            _this.nodeRoot.addChild(_this.nodePos);
            _this.nodeNormal = new eui.Group();
            _this.nodePos.addChild(_this.nodeNormal);
            _this.titleSpace = new eui.Group();
            _this.nodePos.addChild(_this.titleSpace);
            _this.x = 0;
            _this.y = 0;
            _this.order = order;
            _this.trans = 1;
            _this.ePositionType = zj.TableEnum.TablePositionType.POSITION_NONE;
            return _this;
        }
        StageRpgObject.prototype.release = function () {
            if (this.spritePic) {
                this.spritePic.clearSpine();
                this.spritePic = null;
            }
            if (this.spineAni && this.spineAni instanceof eui.Image) {
                this.spineAni.parent.removeChild(this.spineAni);
                this.spineAni = null;
            }
            else if (this.spineAni) {
                this.spineAni.clearSpine();
                this.spineAni = null;
            }
            if (this.spxAni) {
                this.spxAni.clearSpine();
                this.spxAni = null;
            }
            if (this.commonLedAni) {
                this.commonLedAni.clearSpine();
                this.commonLedAni = null;
            }
        };
        StageRpgObject.prototype.Update = function (tick) {
            this.updateZone();
        };
        StageRpgObject.prototype.setPos = function (x, y) {
            this.x = x;
            this.y = y;
            this.nodePos.x = x;
            this.nodePos.y = y;
        };
        StageRpgObject.prototype.setLoadPos = function (x, y) {
            // if(this.spritePic != null){
            // 	this.spritePic.SetPosition(x,y);
            // }
            // if(this.spineAni != null){
            // 	this.spineAni.SetPosition(x,y);
            // }
            // if(this.spxAni != null){
            // 	this.spxAni.SetPosition(x,y);
            // }
        };
        StageRpgObject.prototype.setRoot = function (x, y) {
            this.setPos(x, y);
            this.setLoadPos(0, 0);
        };
        StageRpgObject.prototype.setScenePosInfo = function (info) {
            this.scenePosInfo = info;
        };
        StageRpgObject.prototype.setVisible = function (tag) {
            this.bVisible = tag;
            this.setPicVisible(tag);
        };
        StageRpgObject.prototype.setPicVisible = function (tag) {
            if (this.spritePic != null) {
                this.spritePic.visible = tag;
            }
            if (this.spineAni != null) {
                this.spineAni.visible = tag;
            }
            if (this.spxAni != null) {
                this.spxAni.visible = tag;
            }
        };
        StageRpgObject.prototype.getVisible = function () {
            return this.bVisible;
        };
        StageRpgObject.prototype.getPos = function () {
            return [this.x, this.y];
        };
        StageRpgObject.prototype.setPositionType = function (eType) {
            this.ePositionType = eType;
        };
        StageRpgObject.prototype.setIsEnemy = function (tag) {
            this.bEnemy = tag;
        };
        StageRpgObject.prototype.setTrans = function (trans) {
            if (this.trans == trans) {
                return;
            }
            this.trans = trans;
            if (this.spritePic != null) {
                this.spritePic.alpha = trans;
            }
        };
        StageRpgObject.prototype.LoadPicWithPath = function (path, anchor, bMirror) {
            var build = new eui.Image(zj.cachekey(path, this));
            // build.anchorOffsetX = anchor;
            // build.x = this.info.build_x;
            // build.y = this.info.build_y;
            // build.scaleX = bMirror;
            build.addEventListener(egret.Event.COMPLETE, function (e) {
                ///在图片的载入完成事件中获得图片的宽高。
                var img = e.currentTarget;
                img.anchorOffsetY = img.height;
            }, this);
            this.nodeNormal.addChild(build);
            return build;
        };
        StageRpgObject.prototype.LoadPic = function (path, anchor, bMirror, plist) {
        };
        StageRpgObject.prototype.LoadFruitAni = function (index, anchor, bMirror) {
            var item = zj.TableClientAniUi.Item(index);
            var tableAni = zj.TableClientAniCssSource.Item(item.css_id);
            var ani = zj.HunterSpineX(index, 1, null, tableAni.name)[0];
            ani.ChangeAction(item.index);
            //ani.SetPosition(this.x,this.y);
            this.nodeNormal.addChild(ani.spine);
            return ani;
        };
        StageRpgObject.prototype.LoadSpine = function (info, anchor, scale, bMirror) {
            var item = zj.TableClientAniSpineSource.Item(info.spine_id);
            var spine = zj.HunterSpineX(info.spine_id, scale || 1.0, null, item.json)[0];
            spine.ChangeAnimation(item.ani_name);
            spine.setFlipX(bMirror);
            this.nodeNormal.addChild(spine.spine);
            return spine;
        };
        StageRpgObject.prototype.LoadGeneral = function (info, anchor, scale, bMirror) {
            var spine = zj.HunterSpineX(info.spine_id)[0];
            spine.SetScale(scale);
            spine.setFlipX(bMirror);
            //spine.SetPosition(this.x,PlayerWonderLandSystem.MapHeight - this.y);
            spine.ChangeAction(1);
            this.nodeNormal.addChild(spine.spine);
            return spine;
        };
        StageRpgObject.prototype.LoadSpx = function (info, anchor) {
        };
        StageRpgObject.prototype.loadLedAni = function () {
            this.commonLedAni = zj.HunterSpineX(-1, 1, null, zj.TableClientAniCssSource.Item(zj.UIConfig.UIConfig_RpgScene.ledEffect.jsonId).name)[0];
            this.commonLedAni.SetScale(0.8);
            this.commonLedAni.setVisibleSpx(false);
            this.nodeNormal.addChild(this.commonLedAni.spine);
        };
        StageRpgObject.prototype.flashLedAni = function (action) {
            if (this.commonLedAni == null) {
                return;
            }
            if (action == -1) {
                this.ledIndex = -1;
                this.commonLedAni.setVisibleSpx(false);
            }
            else {
                this.commonLedAni.setVisibleSpx(true);
                if (action != this.ledIndex) {
                    this.ledIndex = action;
                    this.commonLedAni.stopAllActions();
                    if (this.ttfDes != null) {
                        var _a = [this.ttfDes.x, this.ttfDes.y], t_x = _a[0], t_y = _a[1];
                        var t_h = this.bloodBoardDes.height;
                        this.commonLedAni.SetPosition(t_x, t_y - t_h / 2 - zj.ConstantConfig_Rpg.COMMON_LED_OFFSET_Y);
                    }
                    this.commonLedAni.ChangeAction(zj.UIConfig.UIConfig_RpgScene.ledEffect.actionIds[action]);
                }
            }
        };
        StageRpgObject.prototype.updateZone = function () {
            if (this.spritePic != null && this.sizePic == null) {
                this.sizePic = { width: this.spritePic.width, height: this.spritePic.height };
            }
            if (this.spineAni != null && this.sizeSpine == null) {
                this.sizeSpine = { width: this.spineAni.width, height: this.spineAni.height };
                this.setRoot(this.x, this.y);
            }
            if (this.spxAni != null && this.sizeSpx == null) {
                this.sizeSpx = { width: this.spxAni.width, height: this.spxAni.height };
                this.setRoot(this.x, this.y);
            }
            var tag = false;
            if (this.sizePic != null) {
                if (this.x + (1 - this.anchorPic.x) * this.sizePic.width >= 0 && this.y + (1 - this.anchorPic.y) * this.sizePic.height >= 0 &&
                    this.x - this.anchorPic.x * this.sizePic.width <= zj.UIManager.StageWidth && this.y - this.anchorPic.y * this.sizePic.height <= zj.Device.screenHeight) {
                    tag = true;
                }
            }
            if (this.sizeSpine != null) {
                if (this.x + (1 - this.anchorSpine.x) * this.sizeSpine.width >= 0 && this.y + (1 - this.anchorSpine.y) * this.sizeSpine.height >= 0 &&
                    this.x - this.anchorSpine.x * this.sizeSpine.width <= zj.UIManager.StageWidth && this.y - this.anchorSpine.y * this.sizeSpine.height <= zj.Device.screenHeight) {
                    tag = true;
                }
            }
            if (tag == false && this.bVisible == true) {
                this.visible = false;
            }
            else if (tag == true && this.bVisible == false) {
                this.visible = true;
            }
        };
        return StageRpgObject;
    }(zj.StageObject));
    zj.StageRpgObject = StageRpgObject;
    __reflect(StageRpgObject.prototype, "zj.StageRpgObject");
})(zj || (zj = {}));
//# sourceMappingURL=StageRpgObject.js.map