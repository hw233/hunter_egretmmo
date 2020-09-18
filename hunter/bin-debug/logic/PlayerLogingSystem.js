var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var PlayerLogingSystem = (function () {
        function PlayerLogingSystem() {
            this.isclose = true;
        }
        PlayerLogingSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.OPEN_LOGING_SCENE, this.openPanel, this); //打开事件
            zj.Game.EventManager.on(zj.GameEvent.CLOSE_LOGING_SCENE, this.closePanel, this); //关闭事件
            zj.Game.EventManager.on(zj.GameEvent.LOGING_SCENE_PROGRESS, this.progressHandler, this); //进度事件
        };
        PlayerLogingSystem.prototype.uninit = function () {
            this.panel = null;
            this.isclose = true;
        };
        PlayerLogingSystem.prototype.progressHandler = function (e) {
            if (this.panel) {
                this.panel.setImgBar(e.data);
            }
        };
        //开启
        PlayerLogingSystem.prototype.openPanel = function () {
            var _this = this;
            //界面加载
            this.isclose = false;
            zj.loadUI(zj.LodingScene).then(function (dialog) {
                _this.panel = dialog;
                if (_this.isclose == true) {
                    _this.panel.close();
                    _this.panel = null;
                }
                else {
                    while (zj.Game.UIManager.dialogCount() > 0)
                        zj.Game.UIManager.popDialog();
                    _this.panel.show();
                    zj.Game.EventManager.event(zj.GameEvent.LOGING_SCENE);
                }
            });
        };
        //关闭
        PlayerLogingSystem.prototype.closePanel = function () {
            this.isclose = true;
            if (this.panel) {
                this.panel.closeFun();
                this.panel = null;
            }
        };
        return PlayerLogingSystem;
    }());
    zj.PlayerLogingSystem = PlayerLogingSystem;
    __reflect(PlayerLogingSystem.prototype, "zj.PlayerLogingSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerLogingSystem.js.map