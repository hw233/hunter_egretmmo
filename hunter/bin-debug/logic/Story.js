var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * 剧情对话
     * created by LianLei
     */
    var Story = (function () {
        function Story() {
        }
        Story.isHaveStory = function (name, ext) {
            // 检验table
            if (zj.StoryDialog.getItemPlot(name, ext)) {
                return true;
            }
            if (zj.StoryDialog.getItemStory(name, ext)) {
                return true;
            }
            return false;
            // return StoryDialog.getItemStory(name, ext) || StoryDialog.getItemPlot(name, ext);
            // let tableStory: { [key: string]: TableClientStory } = TableClientStory.Table();
            // let ret: boolean = false;
            // // console.log(JSON.stringify(tableStory[name]));
            // if (tableStory[name] != null) {
            // 	ret = true;
            // }
            // // 检验文件是存在
            // let fileStatus: boolean;
            // let funcStatus: boolean;
            // if (ret == true) {
            // 	if (("story_" + name) in zj) fileStatus = true;
            // 	if (fileStatus == true) {
            // 		if (("show_" + ext) in zj["story_" + name]) funcStatus = true;
            // 	}
            // }
            // ret = ret && fileStatus && funcStatus;
            // return ret;
        };
        Story.update = function (name, ext) {
            if (this.bInStory) {
                if (this.frame > this._frame_delay) {
                    // let dialog:any = Game.UIManager.topDialog();
                    // if ('func' in dialog) {
                    // 	dialog['func']();
                    // }
                    if (zj.Game.UIManager.GroupStory.numChildren == 0) {
                        this.bInStory = false;
                        this.bFinish = true;
                        console.log("-----------------------" + "对话结束1" + "----------------------");
                        // GlobalCfg.stageTouchEnable = true
                    }
                }
                else if (this.frame == this._frame_delay) {
                    // GameCommon.EventLockStory(false);
                    if (name == 8007) {
                        if (zj.Game.TeachSystem.openTime == 0) {
                            // let storyInfo = "story_" + name;
                            zj.StoryDialog.init();
                            // if (zj['story_' + name]['show_' + ext]) {
                            // 	zj['story_' + name]['show_' + ext]();
                            // 	Game.TeachSystem.openTime = 1;
                            // }
                            if (this.showStory(name, ext)) {
                                zj.Game.TeachSystem.openTime = 1;
                            }
                        }
                        else if (zj.Game.TeachSystem.openTime == 1) {
                            this.bFinish = true;
                        }
                    }
                    else {
                        // let storyInfo = "story_" + name;
                        zj.StoryDialog.init();
                        // if (zj['story_' + name]['show_' + ext]) {
                        // 	zj['story_' + name]['show_' + ext]();
                        // }
                        this.showStory(name, ext);
                    }
                }
                this.frame = this.frame + 1;
            }
            if (this.storyName != name || this.ext != ext) {
                if (this.isHaveStory(name, ext)) {
                    this.bInStory = true;
                    this.bFinish = false;
                    console.log("-----------------------" + "对话中" + "----------------------");
                    // GlobalCfg.stageTouchEnable = false
                    // GameCommon.EventLockStory(true)
                }
                else {
                    this.bInStory = false;
                    this.bFinish = true;
                    console.log("-----------------------" + "对话结束2" + "----------------------");
                }
                this.frame = 0;
                this.storyName = name;
                this.ext = ext;
            }
        };
        Story.playStory = function (name, ext, callback, thisObj) {
            if (callback === void 0) { callback = null; }
            if (thisObj === void 0) { thisObj = null; }
            console.log("——————————————————————————" + "新手引导剧情对话：name " + name + " ext: " + ext + "——————————————————————————");
            if (this.isHaveStory(name, ext)) {
                zj.StoryDialog.init();
                // if (zj['story_' + name]['show_' + ext]) {
                // 	zj['story_' + name]['show_' + ext]();
                // }
                this.showStory(name, ext, callback, thisObj);
            }
            else {
                Story.bFinish = true;
            }
        };
        Story.showStory = function (name, ext, callback, thisObj) {
            if (callback === void 0) { callback = null; }
            if (thisObj === void 0) { thisObj = null; }
            var plotTable = zj.StoryDialog.getItemPlot(name, ext);
            if (plotTable) {
                if (zj.StoryDialog.startPlot(plotTable, callback, thisObj)) {
                    return true;
                }
                else {
                    console.log("story showStory error: " + name + ", " + ext);
                }
            }
            else {
                var lables = zj.StoryDialog.getItemStory(name, ext);
                if (lables && lables.length > 0) {
                    for (var i = 0; i < lables.length; ++i) {
                        var content = lables[i];
                        zj.StoryDialog.addHead(content.spine, content.action, content.scale, content.flip);
                        zj.StoryDialog.addContent(content.direction, content.name, content.content, content.sound);
                    }
                    zj.StoryDialog.start(true);
                    return true;
                }
            }
            // if (zj['story_' + name]['show_' + ext]) {
            // 	zj['story_' + name]['show_' + ext]();
            // 	return true;
            // }
            return false;
        };
        Story.isFinish = function () {
            return this.bFinish;
        };
        Story.bInStory = null;
        Story.bFinish = null;
        Story.storyName = -1;
        Story.ext = -1;
        Story.frame = -1;
        Story._frame_delay = 2;
        return Story;
    }());
    zj.Story = Story;
    __reflect(Story.prototype, "zj.Story");
})(zj || (zj = {}));
//# sourceMappingURL=Story.js.map