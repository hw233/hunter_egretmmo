var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 音乐与音效文件管理类
    // guoshanhe
    // 2018.11.5
    var SoundManager = (function () {
        function SoundManager() {
            this.curMusicName = ""; // 当前使用音乐文件名
            this.curMusic = null; //当前音乐对象
            this.curMusicChannel = null; // 当前音乐控制对象
            this.curMusicChannelPosition = 0; // 最后播放位置（用于恢复）
            this.curMusicLoops = 1; // 当前音乐循环次数
            this.musicVolume = 1; // 音乐音量
            this.effectVolume = 1; // 音效音量
            this.musicEnabled = true; // 是否开启音乐
            this.effectEnabled = true; // 是否开启音效
            this.isPause = false; // 音乐是否暂停中
            this.cacheSounds = {}; // 当前缓存音乐及缓存时间
            // empty
        }
        // 辅助静态方法
        SoundManager.onSoundManagerFirstClick = function (event) {
            zj.Game.SoundManager.__checkClick();
        };
        SoundManager.prototype.init = function () {
            // 读取音量配置
            this.readConfig();
            this.saveConfig();
            // 很多浏览器要求必须点击一下才能播放声音，需要兼容
            console.log(egret.Capabilities.runtimeType);
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                this.effectEnabled = false;
                this.musicEnabled = false;
                zj.UIManager.Stage.addEventListener(egret.TouchEvent.TOUCH_TAP, SoundManager.onSoundManagerFirstClick, null);
            }
        };
        // 用于兼容有些浏览器需要点击一下才能播放声音，外部不要调用
        SoundManager.prototype.__checkClick = function () {
            // 恢复配置
            this.readConfig();
            if (this.curMusicName.length > 0) {
                this.playMusic(this.curMusicName, this.curMusicLoops);
            }
            zj.UIManager.Stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, SoundManager.onSoundManagerFirstClick, null);
        };
        SoundManager.prototype.isMusicEnabled = function () {
            return this.musicEnabled;
        };
        SoundManager.prototype.isEffectEnabled = function () {
            return this.effectEnabled;
        };
        SoundManager.prototype.musicEnable = function () {
            this.musicEnabled = true;
            this.saveConfig();
        };
        SoundManager.prototype.musicDisable = function () {
            this.musicEnabled = false;
            this.stopMusic();
            this.saveConfig();
        };
        SoundManager.prototype.effectEnable = function () {
            this.effectEnabled = true;
            this.saveConfig();
        };
        SoundManager.prototype.effectDisable = function () {
            this.effectEnabled = false;
            this.saveConfig();
        };
        SoundManager.prototype.getMusicVolume = function () {
            return this.musicVolume;
        };
        SoundManager.prototype.getEffectVolume = function () {
            return this.effectVolume;
        };
        SoundManager.prototype.setMusicVolume = function (volume) {
            if (volume <= 0)
                volume = 0;
            if (volume >= 1)
                volume = 1;
            this.musicVolume = volume;
            if (this.curMusicChannel != null) {
                this.curMusicChannel.volume = volume;
            }
            this.saveConfig();
        };
        SoundManager.prototype.setEffectVolume = function (volume) {
            if (volume <= 0)
                volume = 0;
            if (volume >= 1)
                volume = 1;
            this.effectVolume = volume;
            this.saveConfig();
        };
        Object.defineProperty(SoundManager.prototype, "CurMusicName", {
            get: function () {
                return this.curMusicName;
            },
            enumerable: true,
            configurable: true
        });
        // 异步预加载声音资源（音乐和音效）
        SoundManager.prototype.preloadSound = function (name) {
            var _this = this;
            if (!RES.hasRes(name))
                return;
            if (!RES.getRes(name)) {
                RES.getResAsync(name, function (value, key) {
                    _this.cacheSounds[name] = egret.getTimer();
                    //console.log(`[RESOURCE] 预加载声音[${name}]`);
                }, this);
            }
        };
        // 释放声音资源
        SoundManager.prototype.destrySound = function (name) {
            if (name == this.curMusicName)
                return;
            zj.Util.destroyRes(name, false);
            delete this.cacheSounds[name];
            //console.log(`[RESOURCE] 释放[${name}]`);
            return;
        };
        // 播放背景音乐，同时只能一个背景音乐，播放新的，旧的自动停止
        // musicName: 音乐资源名字
        // loops: 播放次数，默认值是 0，循环播放。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放。
        SoundManager.prototype.playMusic = function (musicName, loops) {
            var _this = this;
            if (!this.musicEnabled) {
                this.curMusicName = musicName;
                this.curMusicLoops = loops;
                return;
            }
            this.isPause = false; // 一播放暂停就失效
            this.stopMusic();
            this.curMusic = RES.getRes(musicName);
            if (this.curMusic) {
                // 有缓存的情况
                this.cacheSounds[musicName] = egret.getTimer();
                this.curMusicName = musicName;
                this.curMusicLoops = loops;
                this.curMusic.type = egret.Sound.MUSIC;
                this.curMusicChannel = this.curMusic.play(0, loops);
                this.curMusicChannel.volume = this.musicVolume;
                this.curMusicChannelPosition = 0;
            }
            else {
                // 无缓存，动态加载再播放(延迟一会能接受)
                RES.getResAsync(musicName, function (value, key) {
                    //console.log(`[RESOURCE] 加载音乐[${musicName}]`);
                    _this.stopMusic(); // 加载延时较大，短时间内播放多个音乐时需要
                    _this.cacheSounds[musicName] = egret.getTimer();
                    _this.curMusic = value;
                    _this.curMusicName = musicName;
                    _this.curMusicLoops = loops;
                    _this.curMusic.type = egret.Sound.MUSIC;
                    _this.curMusicChannel = _this.curMusic.play(0, loops);
                    _this.curMusicChannel.volume = _this.musicVolume;
                    _this.curMusicChannelPosition = 0;
                }, this);
            }
            this.checkAndDestroySounds();
        };
        SoundManager.prototype.stopMusic = function () {
            if (!this.musicEnabled)
                return;
            this.isPause = false;
            if (this.curMusicChannel != null) {
                this.cacheSounds[this.curMusicName] = egret.getTimer();
                this.curMusicChannel.stop();
                this.curMusic = null;
                this.curMusicChannel = null;
                this.curMusicName = "";
                this.curMusicLoops = 1;
                this.curMusicChannelPosition = 0;
            }
        };
        SoundManager.prototype.pauseMusic = function () {
            if (!this.musicEnabled)
                return;
            if (this.isPause)
                return;
            this.isPause = true;
            if (this.curMusicName.length > 0)
                this.cacheSounds[this.curMusicName] = egret.getTimer();
            if (this.curMusicChannel) {
                this.curMusicChannelPosition = this.curMusicChannel.position;
                this.curMusicChannel.stop();
            }
        };
        SoundManager.prototype.resumeMusic = function () {
            if (!this.musicEnabled)
                return;
            if (!this.isPause)
                return;
            this.isPause = false;
            if (this.curMusicChannel == null)
                return;
            if (this.curMusicName.length == 0)
                return;
            this.curMusic = RES.getRes(this.curMusicName);
            if (this.curMusic == null)
                return;
            this.cacheSounds[this.curMusicName] = egret.getTimer();
            this.curMusic.type = egret.Sound.MUSIC;
            this.curMusicChannel = this.curMusic.play(this.curMusicChannelPosition, this.curMusicLoops);
            this.curMusicChannel.volume = this.musicVolume;
        };
        // 播放音效
        // maxWaitMs: 实时加载时，延时超过指定毫秒数则本次不播放音效
        SoundManager.prototype.playEffect = function (effectName, maxWaitMs) {
            var _this = this;
            if (!maxWaitMs || maxWaitMs < 500)
                maxWaitMs = 500;
            if (!this.effectEnabled)
                return;
            var effect = RES.getRes(effectName);
            if (effect) {
                // 有缓存的情况
                this.cacheSounds[effectName] = egret.getTimer();
                effect.type = egret.Sound.EFFECT;
                var channel = effect.play(0, 1);
                channel.volume = this.effectVolume;
            }
            else {
                // 无缓存，动态加载如果在maxWaitMs ms内就播放，否则本次就不播放了
                var startTime_1 = egret.getTimer();
                RES.getResAsync(effectName, function (value, key) {
                    //console.log(`[RESOURCE] 加载音效[${effectName}]`);
                    _this.cacheSounds[effectName] = egret.getTimer();
                    if (egret.getTimer() > startTime_1 + maxWaitMs)
                        return; // 本次不播放了
                    effect = value;
                    if (value) {
                        effect.type = egret.Sound.EFFECT;
                        var channel = effect.play(0, 1);
                        channel.volume = _this.effectVolume;
                    }
                }, this);
            }
            this.checkAndDestroySounds();
        };
        SoundManager.prototype.readConfig = function () {
            var musicVolume_data = zj.Controller.getGlobalStorageItem("musicVolume");
            if (musicVolume_data != null && musicVolume_data.length > 0) {
                this.musicVolume = parseFloat(musicVolume_data);
                if (isNaN(this.musicVolume))
                    this.musicVolume = 1;
                if (this.musicVolume <= 0)
                    this.musicVolume = 0;
                if (this.musicVolume >= 1)
                    this.musicVolume = 1;
            }
            var effectVolume_data = zj.Controller.getGlobalStorageItem("effectVolume");
            if (effectVolume_data != null && effectVolume_data.length > 0) {
                this.effectVolume = parseFloat(effectVolume_data);
                if (isNaN(this.effectVolume))
                    this.effectVolume = 1;
                if (this.effectVolume <= 0)
                    this.effectVolume = 0;
                if (this.effectVolume >= 1)
                    this.effectVolume = 1;
            }
            var musicEnabled_data = zj.Controller.getGlobalStorageItem("musicEnabled");
            this.musicEnabled = (musicEnabled_data == null || musicEnabled_data == undefined || musicEnabled_data.length == 0 || musicEnabled_data == "true");
            var effectEnabled_data = zj.Controller.getGlobalStorageItem("effectEnabled");
            this.effectEnabled = (effectEnabled_data == null || effectEnabled_data == undefined || effectEnabled_data.length == 0 || effectEnabled_data == "true");
        };
        SoundManager.prototype.saveConfig = function () {
            zj.Controller.setGlobalStorageItem("musicVolume", this.musicVolume.toString());
            zj.Controller.setGlobalStorageItem("effectVolume", this.effectVolume.toString());
            zj.Controller.setGlobalStorageItem("musicEnabled", this.musicEnabled ? "true" : "false");
            zj.Controller.setGlobalStorageItem("effectEnabled", this.effectEnabled ? "true" : "false");
        };
        SoundManager.prototype.checkAndDestroySounds = function () {
            // 查找最久未使用资源
            var count = 0;
            var name = "";
            var min = 0x7fffffff;
            for (var k in this.cacheSounds) {
                count++;
                if (k == this.curMusicName)
                    continue;
                if (this.cacheSounds[k] < min) {
                    min = this.cacheSounds[k];
                    name = k;
                }
            }
            if (count < 50)
                return; // 50个以内不释放
            // 释放资源
            if (name.length > 0) {
                delete this.cacheSounds[name];
                zj.Util.destroyRes(name, false);
                //console.log(`[RESOURCE] 释放声音[${name}]`);
            }
        };
        /**查询音效 */
        SoundManager.SoundOpen = function (id) {
            var sound = zj.TableClientSoundResource.Item(id);
            if (sound == null) {
                return "";
            }
            var textDrop = sound.sound_path;
            var strs = new Array();
            strs = textDrop.split("/");
            var soundtext = strs[2];
            soundtext = soundtext.replace('.', '_');
            return soundtext;
        };
        /**查询音乐 */
        SoundManager.playbgmByID = function (id) {
            var sound = zj.TableClientBgmResource.Item(id);
            if (sound == null) {
                return "";
            }
            var textDrop = sound.sound_path;
            var strs = new Array();
            strs = textDrop.split("/");
            var soundtext = strs[2];
            soundtext = soundtext.replace('.', '_');
            return soundtext;
        };
        return SoundManager;
    }());
    zj.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "zj.SoundManager");
})(zj || (zj = {}));
//# sourceMappingURL=SoundManager.js.map