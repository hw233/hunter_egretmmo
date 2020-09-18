var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * created by Lian Lei
     * 2019.03.39
     */
    var Train = (function () {
        function Train() {
        }
        Train.OnPushUI = function (ui) {
            if (this.isWaitPushUI && ui == this.waitParam1) {
                this.ClearWait();
                if (this.cbFunc != null) {
                    this.cbFunc();
                }
            }
        };
        Train.OnPopUI = function () {
            if (this.isWaitPushUI) {
                this.ClearWait();
                if (this.cbFunc != null) {
                    this.cbFunc();
                }
            }
        };
        Train.OnAddSubWin = function (ui, subName) {
            if (this.isWaitAddSubWin && ui == this.waitParam1 && subName == this.waitParam2) {
                this.ClearWait();
                if (this.cbFunc != null) {
                    this.cbFunc();
                }
            }
        };
        Train.OnDeleteSubWin = function () {
            if (this.isWaitDeleteSubWin) {
                this.ClearWait();
                if (this.cbFunc != null) {
                    this.cbFunc();
                }
            }
        };
        Train.ClearWait = function () {
            this.isWaitCallBack = false;
            this.isWaitPushUI = false;
            this.isWaitPopUI = false;
            this.isWaitAddSubWin = false;
            this.isWaitDeleteSubWin = false;
            this.isWaitProtocal = false;
            this.waitProtocal = -1;
            this.waitParam1 = "";
            this.waitParam2 = "";
        };
        Train.WaitPushUI = function (ui, cbThisPointer, cbFunc) {
            this.waitParam1 = ui;
            this.isWaitPushUI = true;
            this.cbFunc = cbFunc;
        };
        Train.WaitPopUI = function (cbThisPointer, cbFunc) {
            this.isWaitPopUI = true;
            this.cbFunc = cbFunc;
        };
        Train.WaitAddSubWin = function (ui, subName, cbThisPointer, cbFunc) {
            this.waitParam1 = ui;
            this.waitParam2 = subName;
            this.isWaitAddSubWin = true;
            this.cbFunc = cbFunc();
        };
        Train.WaitDeleteSubWin = function (cbThisPointer, cbFunc) {
            this.isWaitDeleteSubWin = true;
            this.cbFunc = cbFunc;
        };
        Train.isWaitCallBack = false;
        Train.isWaitPushUI = false;
        Train.isWaitPopUI = false;
        Train.isWaitAddSubWin = false;
        Train.isWaitDeleteSubWin = false;
        Train.isWaitProtocal = false;
        Train.waitProtocal = -1;
        Train.cbFunc = null;
        return Train;
    }());
    zj.Train = Train;
    __reflect(Train.prototype, "zj.Train");
})(zj || (zj = {}));
//# sourceMappingURL=Train.js.map