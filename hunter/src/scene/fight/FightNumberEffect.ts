namespace zj {

export class FightNumberEffectMgr {

    public static Instance = new FightNumberEffectMgr();    


    public tableNumbers = []
    public fatherNode = null
    public cutValue = 11


    constructor() {

    }

    public addFightNumberEffect(eff) {
        // body
        if ( this.fatherNode == null) {
            return
        }
        this.tableNumbers.push(eff);
    }

    public Pause(...args) {
        // body
        let i = adjustIndex(1)
        while (i < this.tableNumbers.length) {
            this.tableNumbers[i].Pause()
            i = i + 1
        }
    }

    public resume(...args) {
        // body
        let i = adjustIndex(1)
        while (i < this.tableNumbers.length) {
            this.tableNumbers[i].resume()
            i = i + 1
        }
    }

    public update(delta) {
        let self = this;
        // body
        let i = adjustIndex(1)
        while (i < self.tableNumbers.length) {
            let tNumber = self.tableNumbers[i]
            let bFinish = tNumber.isFinish()
            if (bFinish == true) {
                self.tableNumbers.splice(i, 1);
                tNumber.release();
            } else {
                tNumber.update(delta)
                i = i + 1
            }
        }
    }

    public addToLayer(layer) {
        // body
        if (layer == null  || this.fatherNode != null) {
            return
        }
        //let sprite_path = "ccbResources/fight_ui/fight_number.plist"
        //let sprite_frame_cache = cc.SpriteFrameCache.getInstance()
        //sprite_frame_cache.addSpriteFramesWithFile(sprite_path)
        //let texture = cc.TextureCache.getInstance().getTextureForKey("ccbResources/fight_ui/fight_number.png")
        //this.batchNode = cc.SpriteBatchNode.createWithTexture(texture,256)
        //   let textureAtlas = this.batchNode.getTextureAtlas()
        //textureAtlas.resizeCapacity(1000)
        //layer.addChild(this.batchNode)
        this.fatherNode = layer
    }

    public removeFromLayer(...args) {
        // body
        if (this.fatherNode == null) {
            return
        }
        for (let i = adjustIndex(1); i < this.tableNumbers.length; i++) {
            this.tableNumbers[i].release()
            // CC_SAFE_DELETE(this.tableNumbers[i])
        }
        this.tableNumbers = []
        this.fatherNode = null
    }

    public removeChildFromBatchNode(node) {
        // body
        if (node == null) {
            return
        }
        this.fatherNode.removeChild(node)
    }

    public addChildToBatchNode(node) {
        // body
        if (node == null ) {
            return
        }
        this.fatherNode.addChild(node);
    }
    public getSpriteByFileName(fileName) {
        // body
        if (this.fatherNode == null) {
            return
        }
        let texture:egret.Texture = RES.getRes(fileName);
        let _sprite:egret.Bitmap = Game.ObjectPool.getItem("Bitmap",egret.Bitmap);//new egret.Bitmap();
        _sprite.alpha = 1;
        _sprite.visible = true;
        _sprite.x = 0;
        _sprite.y = 0;
        _sprite.scaleX = 1;
        _sprite.scaleY = 1;
        if(texture){
           _sprite.texture = texture;
        }
        this.addChildToBatchNode(_sprite);
        return _sprite;
    }
    public getNumSpriteByFileName(fileName:string, num, w, h, offset, is_sign) : [any, number, number] {
        // body
        if ( this.fatherNode == null) {
            return [null, 0, 0]
        }

        let fontT = "";
        
        num = Math.floor(num);
        let _fondBitmap:eui.BitmapLabel = Game.ObjectPool.getItem("BitmapLabel",eui.BitmapLabel); //new eui.BitmapLabel();
        _fondBitmap.alpha = 1;
        _fondBitmap.visible = true;
        _fondBitmap.x = 0;
        _fondBitmap.y = 0;
        _fondBitmap.scaleX = 1;
        _fondBitmap.scaleY = 1;
        fileName = fileName.slice(0,-4)
        _fondBitmap.font = RES.getRes(fileName+"_fnt");
        _fondBitmap.text = num;
        this.addChildToBatchNode(_fondBitmap);
        return [_fondBitmap, 1, 1];
    }

    public moveDistance(x, y) {
        // body
        for (let i= adjustIndex(1); i < this.tableNumbers.length; i++){
            let tNumber = this.tableNumbers[i]
		    let mx, my = tNumber.getPos()
            tNumber.setPosition(mx - x, my - y)
        }

}

}

export class FightNumberEffect {

    public count = 0
    public frame = 0
    public alpha = 1

    public eff;
    public word = null

    public eff_width : number = 0
    public eff_height : number = 0

    public x = 0
    public y = 0

    public word_x = 0
    public word_y = 0
    public gap = null

    public dir_right = true
    public b_finish = false
    public layout = TableEnum.TableEnumNumLayout.Layout_Down_Up
    public tblConfig = {num : 0, tblX: [], tblY: [], tblOpacity: [], tblScaleX: [], tblScaleY: []}
    public maxCount = -1

    public bPause = false

    // unknow
    public scale = 1;
    public orginal_x = 0;
    public orginal_y = 0;
    

    constructor() {

    }
    public newSetData(){
        this.b_finish = false;
        this.maxCount = -1;
        this.count = 0;
        this.frame = 0;
        this.alpha = 1;
        this.eff_width = 0
        this.eff_height = 0

        this.x = 0
        this.y = 0

        this.word_x = 0
        this.word_y = 0
        this.gap = null

        this.dir_right = true
        this.layout = TableEnum.TableEnumNumLayout.Layout_Down_Up
        this.tblConfig = {num : 0, tblX: [], tblY: [], tblOpacity: [], tblScaleX: [], tblScaleY: []}

        this.bPause = false

        // unknow
        this.scale = 1;
        this.orginal_x = 0;
        this.orginal_y = 0;
    }
    public Pause(...args ){
        // body
        if (this.bPause == false) {
            this.bPause = true
            //if (this.eff != null) { this.eff.Pause() }
            //if (this.word != null) { this.word.Pause() }
        }
    }

    public resume(...args ){
        if (this.bPause == true) {
            this.bPause = false
            //if (this.eff != null) { this.eff.resume() }
            //if (this.word != null) { this.word.resume() }
        }
    }

    public runAction(...args ){
        // body
        if (this.layout == TableEnum.TableEnumNumLayout.Layout_SPURTING) {
            this.runAction1()
        } else if (this.layout == TableEnum.TableEnumNumLayout.Layout_HIT_HALT) {
            this.runAction2()
        } else if (this.layout == TableEnum.TableEnumNumLayout.Layout_SHIFT) {
            this.runAction3()
        } else if (this.layout == TableEnum.TableEnumNumLayout.Layout_Left_Right_Short) {
            this.runAction4()
        }
    }

    public runAction1(...args ){
        
        // body
        if (this.layout != TableEnum.TableEnumNumLayout.Layout_SPURTING) { return }
        
    }

    public runAction2(...args ){

        if (this.layout != TableEnum.TableEnumNumLayout.Layout_HIT_HALT) { return }
        
    }

    public runAction4(...args ){

        if (this.layout != TableEnum.TableEnumNumLayout.Layout_Left_Right_Short) { return }
        
        let yy = this.y;
        if (this.eff != null) {
            egret.Tween.get(this.eff).to({ y: yy -  50}, 500)
					.call(() => {
						this.endMe();
					});
        }

        if (this.word != null) {
            if (this.eff == null) {
                egret.Tween.get(this.word).to({ y: yy -  50 }, 500)
					.call(() => {
						this.endMe();
					});
            } else {
                egret.Tween.get(this.word).to({ y: yy -  50 }, 500)
					.call(() => {
						this.endMe();
					});
            }

        }
    }

    public endMe() {
        // body
        this.b_finish = true
    }

    public runAction3(...args ){

        if (this.layout != TableEnum.TableEnumNumLayout.Layout_SHIFT) { return }
       
    }

    public release(...args ){
        // body
        if (this.eff != null) {
            egret.Tween.removeTweens(this.eff);
            this.eff.font = null;
            FightNumberEffectMgr.Instance.removeChildFromBatchNode(this.eff);
            Game.ObjectPool.returnItem("BitmapLabel",this.eff);
            this.eff = null;
        }
        if (this.word != null) {
            egret.Tween.removeTweens(this.word);
            this.word.texture = null;
            FightNumberEffectMgr.Instance.removeChildFromBatchNode(this.word);
            Game.ObjectPool.returnItem("Bitmap",this.word);
            this.word = null;
        }
        Game.ObjectPool.returnItem("FightNumberEffect",this);
    }

    public update(tick) {
        // body
        if (this.layout == TableEnum.TableEnumNumLayout.Layout_SPURTING  || this.layout == TableEnum.TableEnumNumLayout.Layout_HIT_HALT
        || this.layout == TableEnum.TableEnumNumLayout.Layout_SHIFT || this.layout == TableEnum.TableEnumNumLayout.Layout_Left_Right_Short ){
            // null
        }else if (this.layout == TableEnum.TableEnumNumLayout.Layout_Layout_New) {
            if (this.bPause == true) { return }

            if (this.count >= this.maxCount) { return }
            let rt = tick * 1000
            this.frame = this.frame + rt
            if (this.frame >= 33.3) {
                this.updateLayerNew()
                this.frame = this.frame - 33.3
                this.count = this.count + 1
            }
        } else {
            if (this.bPause == true) { return }

            if (this.count >= 20) { return }
            let rt = tick * 1000
            this.frame = this.frame + rt
            if (this.frame >= 50) {
                if (this.layout == TableEnum.TableEnumNumLayout.Layout_Down_Up) {
                    this.updateDownUp()
                } else if (this.layout == TableEnum.TableEnumNumLayout.Layout_Up_Down) {
                    this.updateUpDown()
                } else if (this.layout == TableEnum.TableEnumNumLayout.Layout_Left_Right) {
                    this.updateLeftRight()
                }
                this.frame = this.frame - 50
                this.count = this.count + 1
            }
        }
    }

    public updateLayerNew(...args ){
        // body
        let index = this.count + 1
        let [t_x, t_y, t_opacity, t_scaleX, t_scaleY] = [0, 0, 0, 0, 0]

        if (true) {
            t_x = this.tblConfig.tblX[index]
            t_y = this.tblConfig.tblY[index]
            t_opacity = this.tblConfig.tblOpacity[index]
            t_scaleX = this.tblConfig.tblScaleX[index] * this.scale
            t_scaleY = this.tblConfig.tblScaleY[index] * this.scale
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
            let x = this.orginal_x + t_x
            let y = this.orginal_y - t_y
            this.setPosition(x, y)
        }
    }

    public updateDownUp(...args ){
        
    }

    public updateUpDown(...args ){
       
    }

    public updateLeftRight(...args ){
        // body
        if (this.count > 5 && this.count < 10 ){
            this.y = this.y + 10
            this.setPosition(this.x, this.y)
        }else if (this.count >= 10) {
            this.alpha = this.alpha - 0.3
            if (this.alpha <= 0) {
                this.alpha = 0
            }
            this.y = this.y + 15
            this.setPosition(this.x, this.y)

            if (this.eff != null) {
                this.eff.alpha = this.alpha;
            }

            if (this.word != null) {
                this.word.alpha = this.alpha;
            }
        }
    }

    public setData(x, y, scale, opacity) {
        this.orginal_x = x
        this.orginal_y = y
        this.setPosition(x, y)
        this.setScale(scale)
        this.setOpacity(opacity)
    }

    public setScale(scale) {
        if (this.word != null) {
            this.word.scaleX = scale;
            this.word.scaleY = scale;
        }

        if (this.eff != null) {
            this.eff.scaleX = scale;
            this.eff.scaleY = scale;
        }
    }

    public setOpacity(opacity) {
        if (this.word != null) {
            this.word.alpha = opacity;
        }

        if (this.eff != null) {
            this.eff.alpha = opacity;
        }
    }

    public setPosition(x, y) {
        // body
        this.x = x;
        this.y = y;

        if (this.layout == TableEnum.TableEnumNumLayout.Layout_Down_Up || this.layout == TableEnum.TableEnumNumLayout.Layout_Layout_New ){
            if (this.eff != null) {
                this.eff.x = x;
                this.eff.y = y;
            }

            if (this.word != null) {
                this.word.x = x;
                this.word.y = y + 30;
            }
        }else if (this.layout == TableEnum.TableEnumNumLayout.Layout_Up_Down) {
            if (this.eff != null) {
                this.eff.x = x;
                this.eff.y = y;
            }

            if (this.word != null) {
                this.word.x = x;
                this.word.y = y - 50;
            }
        } else if (this.layout == TableEnum.TableEnumNumLayout.Layout_Left_Right || this.layout == TableEnum.TableEnumNumLayout.Layout_Left_Right_Short ){
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
        }else if (this.layout == TableEnum.TableEnumNumLayout.Layout_HIT_HALT) {
            // body
            let gap = 40
            let w = gap
            let wordWidth = 0

            if (this.eff != null) {
                w = w + this.eff_width
            }

            if (this.word != null) {
                wordWidth = this.word.width
                w = w + wordWidth
            }

            if (this.eff != null) {
                this.eff.anchorOffsetX = this.eff.width / 2;
                this.eff.anchorOffsetY = this.eff.height / 2;
                this.x = x + w / 2 - this.eff_width / 2;
                this.y = y;

                this.eff.scaleX=this.eff.scaleY=0.8;
                this.eff.alpha=0.58;
            }

            if (this.word != null) {
                this.word.anchorOffsetX = this.word.width / 2;
                this.word.anchorOffsetY = this.word.height / 2;
                this.word.x = x - w / 2 + wordWidth / 2;
                this.word.y = y;

                this.word.scaleX=this.word.scaleY=0.8;
                this.word.alpha=0.58;
            }
        } else if (this.layout == TableEnum.TableEnumNumLayout.Layout_SHIFT) {
            // body
            let gap = 10
            let w = gap;
            let wordWidth = 0

            if (this.eff != null) {
                w = w + this.eff_width
            }

            if (this.word != null) {
                wordWidth = this.word.width
                w = w + wordWidth
            }

            let sign = yuan3(this.dir_right == true, 1, -1)

            if (this.eff != null) {
                this.eff.anchorOffsetX = this.eff.width / 2;
                this.eff.anchorOffsetY = this.eff.height / 2;
                this.eff.x = x + w / 2 - this.eff_width / 2 - sign * 100;
                this.eff.y = y;
                this.eff.alpha=0;
            }

            if (this.word != null) {
                this.word.anchorOffsetX = this.word.width / 2;
                this.word.anchorOffsetY = this.word.height / 2;
                this.word.x = x - w / 2 + wordWidth / 2 - sign * 100;
                this.word.y = y;
                this.word.alpha = 0;
            }
        } else if (this.layout == TableEnum.TableEnumNumLayout.Layout_SPURTING) {
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

    }

    public isFinish(...args ){
        // body
        let tag = false
        if (this.layout == TableEnum.TableEnumNumLayout.Layout_SPURTING  || this.layout == TableEnum.TableEnumNumLayout.Layout_HIT_HALT
        || this.layout == TableEnum.TableEnumNumLayout.Layout_SHIFT || this.layout == TableEnum.TableEnumNumLayout.Layout_Left_Right_Short ){
            tag = this.b_finish
        }else if (this.layout == TableEnum.TableEnumNumLayout.Layout_Layout_New) {
            if (this.count >= this.maxCount) {
                tag = true
            }
        } else {
            if (this.count >= 20) {
                tag = true
            }
        }
        return tag
    }

    public setNumberInfo(fileName, value, w, h, offset, scale?, sign?) {
        // body
        // for test
        //if( true ){ return }
        if (this.eff != null) {
            FightNumberEffectMgr.Instance.removeChildFromBatchNode(this.eff)
        }

        [this.eff, this.eff_width, this.eff_height] = FightNumberEffectMgr.Instance.getNumSpriteByFileName(fileName, value, w, h, offset, sign)
    }

    public setWordInfo(fileName) {
        // body
        if (this.word != null) {
            FightNumberEffectMgr.Instance.removeChildFromBatchNode(this.word)
        }

        this.word = FightNumberEffectMgr.Instance.getSpriteByFileName(fileName)
    }

    public setLayout(layout, param, scale) {
        // body
        this.layout = layout
        if (this.layout == TableEnum.TableEnumNumLayout.Layout_Layout_New && param != null ){
            if (param == 1) {
                this.tblConfig = ConstantConfig_CommonNum.yellowNumEffect
            } else if (param == 2) {
                this.tblConfig = ConstantConfig_CommonNum.otherNumEffect
            } else if (param == 3) {
                this.tblConfig = ConstantConfig_CommonNum.greenNumEffect
            } else if (param == 4) {
                this.tblConfig = ConstantConfig_CommonNum.redNumEffect
            } else if (param == 5) {
                this.tblConfig = ConstantConfig_CommonNum.whiteNumEffect
            }
            this.maxCount = this.tblConfig.num
            this.scale = yuan3(scale == null, 1.0, scale)
        }
    }

    public getPos(...args ){
        // body
        return this.x, this.y
    }

    public start(...args ){
        // body
        FightNumberEffectMgr.Instance.addFightNumberEffect(this)
    }


public setEffectDir(right){
    // body
    this.dir_right = right
}

public setGap(gap){
    // body
    this.gap = gap
}
}
}