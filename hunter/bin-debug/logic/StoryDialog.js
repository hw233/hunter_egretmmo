var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var StoryDialog = (function () {
        function StoryDialog() {
        }
        StoryDialog.ResetGameInfo = function () {
            this.Dialog.tableContentCell = [];
            this.Dialog.tablePicCell = [];
        };
        StoryDialog.init = function () {
            this.Dialog.tableContentCell = [];
            this.Dialog.tablePicCell = [];
        };
        /**
         * 给对话添加内容
         * @param direction {0,1} 头像所在的位置
         * @param name {string} 人物名字
         * @param content {string} 对话内容
         * @param sound {string} 音乐
         */
        StoryDialog.addContent = function (direction, name, content, sound) {
            var info = {
                direction: direction,
                name: name,
                content: content,
                sound: sound,
            };
            this.Dialog.tableContentCell.push(info);
        };
        /**
         * 给对话添加人物头像
         * @param spine {number} 人物spine ID
         * @param action {string} spine的动作名称
         * @param scale {number} spine 的缩放
         * @param flip  {0,1} 是否翻转
         */
        StoryDialog.addHead = function (spine, action, scale, flip) {
            var info = {
                spine: spine,
                action: action,
                scale: scale,
                flip: flip,
            };
            this.Dialog.tablePicCell.push(info);
        };
        StoryDialog.start = function (bShowAtOnce) {
            // let dialog = newUI(Dialog_Main);
            // dialog['showDialog']();
            // loadUI(Dialog_Main)
            // 	.then((dialog: Dialog_Main) => {
            // 		dialog.show();
            // 	})
        };
        StoryDialog.GetCurScene = function () {
            return zj.StageSceneManager.Instance.GetCurScene();
        };
        /////////////////////////////////////剧情start/////////////////////////////////////
        StoryDialog.startPlot = function (items, callback, thisObj) {
            if (callback === void 0) { callback = null; }
            if (thisObj === void 0) { thisObj = null; }
            var dialog = zj.newUI(zj.PlotMain);
            if (dialog.initData(items, callback, thisObj)) {
                dialog.showDialog();
                return true;
            }
            return false;
        };
        StoryDialog.getPlotCacheImg = function (item) {
            var str = "plot_" + item.content + "_";
            var idx = 0;
            var isHas = true;
            var result = [];
            while (isHas) {
                isHas = false;
                var name_1 = str + idx + "_png";
                if (RES.hasRes(name_1)) {
                    isHas = true;
                    result.push(name_1);
                }
                var nameTalk = str + (idx + 10) + "_png";
                if (RES.hasRes(nameTalk)) {
                    isHas = true;
                    result.push(nameTalk);
                }
                if (isHas) {
                    ++idx;
                }
            }
            if (result.length == 0) {
                result = null;
            }
            return result;
        };
        /**
         * 初始化剧情表，分表管理剧情和tips
         */
        StoryDialog.initStory = function () {
            if (!this.isInit) {
                this.isInit = true;
                this.storyMap = {};
                this.tipMap = {};
                this.plotMap = {};
                var map = zj.TableClientTableStory.Table();
                for (var key in map) {
                    this.addStory(map[key]);
                }
            }
        };
        StoryDialog.addStory = function (item) {
            var key = item.id + "_" + item.step;
            switch (item.type) {
                case 0:
                    if (!this.storyMap[key]) {
                        this.storyMap[key] = [];
                    }
                    this.storyMap[key][item.idx] = item;
                    break;
                case 1:
                    this.tipMap[key] = item;
                    break;
                case 2:
                    if (!this.plotMap[key]) {
                        this.plotMap[key] = [];
                    }
                    this.plotMap[key][item.idx] = item;
                    break;
            }
        };
        /**
         * 获取tips文字内容
         */
        StoryDialog.getItemTip = function (name, ext) {
            this.initStory();
            var key = name + "_" + ext;
            return this.tipMap[key];
        };
        /**
         * 获取剧情对象
         */
        StoryDialog.getItemStory = function (name, ext) {
            this.initStory();
            var key = name + "_" + ext;
            return this.storyMap[key];
        };
        /**
         * 获取剧情对象
         */
        StoryDialog.getItemPlot = function (name, ext) {
            this.initStory();
            var key = name + "_" + ext;
            return this.plotMap[key];
        };
        //////////////////////////////////////原Dialog.lua/////////////////////////////////
        StoryDialog.Dialog = {
            // tableContentCell: Array<{ direction: number, name: string, content: string, sound: number }>,
            // tablePicCell: Array<{ spine: number, action: string, scale: number, flip: number }>,
            tableContentCell: null,
            tablePicCell: null,
        };
        StoryDialog.isInit = false; // 是否初始化
        return StoryDialog;
    }());
    zj.StoryDialog = StoryDialog;
    __reflect(StoryDialog.prototype, "zj.StoryDialog");
})(zj || (zj = {}));
//# sourceMappingURL=StoryDialog.js.map