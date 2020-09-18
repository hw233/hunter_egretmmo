var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var ComboEffect = (function () {
        function ComboEffect(node) {
            this.x = 0;
            this.y = 0;
            this.boardX = 0;
            this.boardY = 0;
            this.wordX = 0;
            this.wordY = 0;
            this.numX = 0;
            this.numY = 0;
            this.curPicIndex = 1;
            this.callBack = null;
            this.spriteBg = null;
            this.spriteWord = null;
            this.spriteNum = null;
            this.count = 0;
            this.comboFrame = 0;
            this.totalTick = 0;
            this.boardMaxCnt = zj.ConstantConfig_CommonNum.comboBgEffect.num;
            this.wordMaxCnt = zj.ConstantConfig_CommonNum.comboWordEffect.num;
            this.numMaxCnt = zj.ConstantConfig_CommonNum.comboNumEffect.num;
            this.node = node;
            this.loadBoardPic();
            this.loadWordPic();
            this.loadNumPic();
        }
        ComboEffect.prototype.loadBoardPic = function () {
            var bg = new eui.Image("ui_battle_BoardAttakBuff_png");
            bg.visible = false;
            this.spriteBg = bg;
        };
        ComboEffect.prototype.loadWordPic = function () {
            var word = new eui.Image("ui_battle_WordsAttakBuff_png");
            word.visible = false;
            this.spriteWord = word;
        };
        ComboEffect.prototype.setVisible = function (boo) {
            this.node.visible = boo;
        };
        ComboEffect.prototype.loadNumPic = function () {
            var num = new zj.BitmapText();
            num.setData("fight_number_lianjinum_png", "+0123456789");
            num.visible = false;
            this.spriteNum = num;
        };
        ComboEffect.prototype.setCallBack = function (fun, thisObj) {
            this.thisObj = thisObj;
            this.callBack = fun;
        };
        ComboEffect.prototype.resetNum = function (num) {
            this.comboFrame = 0;
            this.count = 0;
            this.totalTick = 0;
            var arr = zj.Helper.getComboLv(this.curPicIndex, num);
            var _tag = arr[0];
            var _index = arr[1];
            if (_tag == true) {
                this.curPicIndex = Number(_index);
                var tableCombo = zj.TableClientFightCombo.Table();
                if (this.callBack != null) {
                    this.callBack.call(this.thisObj, tableCombo[this.curPicIndex]);
                }
            }
            this.spriteBg.visible = true;
            this.spriteWord.visible = true;
            this.spriteNum.visible = true;
            this.spriteNum.setText = "+" + num;
            var sec = 1 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.update(sec);
        };
        ComboEffect.prototype.clear = function () {
            this.spriteBg.visible = false;
            this.spriteWord.visible = false;
            this.spriteNum.visible = false;
        };
        ComboEffect.prototype.release = function () {
            this.node.removeChild(this.spriteBg);
            this.node.removeChild(this.spriteWord);
            this.node.removeChild(this.spriteNum);
            this.node = null;
            this.thisObj = null;
            this.callBack = null;
        };
        ComboEffect.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
            this.boardX = this.x;
            this.boardY = this.y;
            this.wordX = this.x;
            this.wordY = this.y;
            this.numX = this.x;
            this.numY = this.y;
        };
        ComboEffect.prototype.addToLayer = function () {
            this.node.addChild(this.spriteBg);
            this.node.addChild(this.spriteWord);
            this.node.addChild(this.spriteNum);
        };
        ComboEffect.prototype.update = function (tick) {
            if (this.totalTick >= zj.ConstantConfig_RoleBattle.COMBO_TIME) {
                return true;
            }
            var rt = tick * 1000;
            this.comboFrame = this.comboFrame + rt;
            this.totalTick = this.totalTick + rt;
            if (this.comboFrame >= 33.3) {
                this.updateLayer();
                this.comboFrame = this.comboFrame - 33.3;
                this.count = this.count + 1;
            }
            return false;
        };
        ComboEffect.prototype.updateLayer = function () {
            var index = this.count + 1;
            function freshSriteData(p, stand_x, stand_y, tbl, index) {
                var _a = [tbl.tblX[index], tbl.tblY[index], tbl.tblOpacity[index], tbl.tblScaleX[index], tbl.tblScaleY[index]], param1 = _a[0], param2 = _a[1], param3 = _a[2], param4 = _a[3], param5 = _a[4];
                if (p != null) {
                    p.scaleX = param4;
                    p.scaleY = param5;
                    p.alpha = param3;
                    p.x = stand_x + param1;
                    p.y = stand_y - param2;
                }
            }
            if (this.count < this.boardMaxCnt) {
                freshSriteData(this.spriteBg, this.boardX, this.boardY, zj.ConstantConfig_CommonNum.comboBgEffect, index);
            }
            if (this.count < this.numMaxCnt) {
                freshSriteData(this.spriteNum, this.numX + 30, this.numY, zj.ConstantConfig_CommonNum.comboNumEffect, index);
            }
            if (this.count < this.wordMaxCnt) {
                freshSriteData(this.spriteWord, this.spriteNum.x + this.spriteNum.width - 35, this.wordY + 5, zj.ConstantConfig_CommonNum.comboWordEffect, index);
            }
        };
        ComboEffect.prototype.isTeach = function () {
            if (this.totalTick <= 300) {
                if ((zj.ConstantConfig_RoleBattle.COMBO_SPC_FRAME - this.totalTick) / zj.ConstantConfig_RoleBattle.COMBO_SPC_FRAME * 0.5 <= 0.2) {
                    return true;
                }
            }
            return false;
        };
        return ComboEffect;
    }());
    zj.ComboEffect = ComboEffect;
    __reflect(ComboEffect.prototype, "zj.ComboEffect");
})(zj || (zj = {}));
//# sourceMappingURL=ComboEffect.js.map