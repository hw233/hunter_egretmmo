namespace zj {
// 音乐与音效文件管理类
// guoshanhe
// 2018.11.5

export class SoundManager {

    // 辅助静态方法
    private static onSoundManagerFirstClick(event) {
        Game.SoundManager.__checkClick();
    }

    private curMusicName: string = ""; // 当前使用音乐文件名
    private curMusic: egret.Sound = null; //当前音乐对象
    private curMusicChannel: egret.SoundChannel = null; // 当前音乐控制对象
    private curMusicChannelPosition = 0; // 最后播放位置（用于恢复）
    private curMusicLoops: number = 1; // 当前音乐循环次数
    private musicVolume: number = 1; // 音乐音量
    private effectVolume: number = 1; // 音效音量
    private musicEnabled: boolean = true; // 是否开启音乐
    private effectEnabled: boolean = true; // 是否开启音效
    private isPause: boolean = false; // 音乐是否暂停中
    private cacheSounds: { [key: string]: number } = {}; // 当前缓存音乐及缓存时间

    public constructor() {
        // empty
    }

    public init() {
        // 读取音量配置
        this.readConfig();
        this.saveConfig();

        // 很多浏览器要求必须点击一下才能播放声音，需要兼容
        console.log(egret.Capabilities.runtimeType);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            this.effectEnabled = false;
            this.musicEnabled = false;
            UIManager.Stage.addEventListener(egret.TouchEvent.TOUCH_TAP, SoundManager.onSoundManagerFirstClick, null);
        }
    }

    // 用于兼容有些浏览器需要点击一下才能播放声音，外部不要调用
    private __checkClick() {
        // 恢复配置
        this.readConfig();

        if (this.curMusicName.length > 0) {
            this.playMusic(this.curMusicName, this.curMusicLoops);
        }
        UIManager.Stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, SoundManager.onSoundManagerFirstClick, null);
    }

    public isMusicEnabled(): boolean {
        return this.musicEnabled;
    }

    public isEffectEnabled(): boolean {
        return this.effectEnabled;
    }

    public musicEnable() {
        this.musicEnabled = true;
        this.saveConfig();
    }

    public musicDisable() {
        this.musicEnabled = false;
        this.stopMusic();
        this.saveConfig();
    }

    public effectEnable() {
        this.effectEnabled = true;
        this.saveConfig();
    }

    public effectDisable() {
        this.effectEnabled = false;
        this.saveConfig();
    }

    public getMusicVolume(): number {
        return this.musicVolume;
    }

    public getEffectVolume(): number {
        return this.effectVolume;
    }

    public setMusicVolume(volume: number): void {
        if (volume <= 0) volume = 0;
        if (volume >= 1) volume = 1;
        this.musicVolume = volume;
        if (this.curMusicChannel != null) {
            this.curMusicChannel.volume = volume;
        }
        this.saveConfig();
    }

    public setEffectVolume(volume: number): void {
        if (volume <= 0) volume = 0;
        if (volume >= 1) volume = 1;
        this.effectVolume = volume;
        this.saveConfig();
    }

    public get CurMusicName(): string {
        return this.curMusicName;
    }

    // 异步预加载声音资源（音乐和音效）
    public preloadSound(name: string): void {
        if (!RES.hasRes(name)) return;
        if (!RES.getRes(name)) {
            RES.getResAsync(name, (value?: any, key?: string) => {
                this.cacheSounds[name] = egret.getTimer();
                //console.log(`[RESOURCE] 预加载声音[${name}]`);
            }, this);
        }
    }

    // 释放声音资源
    public destrySound(name: string): void {
        if (name == this.curMusicName) return;
        Util.destroyRes(name, false);
        delete this.cacheSounds[name];
        //console.log(`[RESOURCE] 释放[${name}]`);
        return;
    }

    // 播放背景音乐，同时只能一个背景音乐，播放新的，旧的自动停止
    // musicName: 音乐资源名字
    // loops: 播放次数，默认值是 0，循环播放。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放。
    public playMusic(musicName: string, loops?: number): void {
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
        } else {
            // 无缓存，动态加载再播放(延迟一会能接受)
            RES.getResAsync(musicName, (value?: any, key?: string) => {
                //console.log(`[RESOURCE] 加载音乐[${musicName}]`);
                this.stopMusic(); // 加载延时较大，短时间内播放多个音乐时需要
                this.cacheSounds[musicName] = egret.getTimer();
                this.curMusic = value;
                this.curMusicName = musicName;
                this.curMusicLoops = loops;
                this.curMusic.type = egret.Sound.MUSIC;
                this.curMusicChannel = this.curMusic.play(0, loops);
                this.curMusicChannel.volume = this.musicVolume;
                this.curMusicChannelPosition = 0;
            }, this);
        }

        this.checkAndDestroySounds();
    }

    public stopMusic() {
        if (!this.musicEnabled) return;
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
    }

    public pauseMusic() {
        if (!this.musicEnabled) return;
        if (this.isPause) return;
        this.isPause = true;
        if (this.curMusicName.length > 0) this.cacheSounds[this.curMusicName] = egret.getTimer();
        if (this.curMusicChannel) {
            this.curMusicChannelPosition = this.curMusicChannel.position;
            this.curMusicChannel.stop();
        }
    }

    public resumeMusic() {
        if (!this.musicEnabled) return;
        if (!this.isPause) return;
        this.isPause = false;
        if (this.curMusicChannel == null) return;
        if (this.curMusicName.length == 0) return;
        this.curMusic = RES.getRes(this.curMusicName);
        if (this.curMusic == null) return;
        this.cacheSounds[this.curMusicName] = egret.getTimer();
        this.curMusic.type = egret.Sound.MUSIC;
        this.curMusicChannel = this.curMusic.play(this.curMusicChannelPosition, this.curMusicLoops);
        this.curMusicChannel.volume = this.musicVolume;
    }

    // 播放音效
    // maxWaitMs: 实时加载时，延时超过指定毫秒数则本次不播放音效
    public playEffect(effectName: string, maxWaitMs?: number): void {
        if (!maxWaitMs || maxWaitMs < 500) maxWaitMs = 500;
        if (!this.effectEnabled) return;

        let effect = RES.getRes(effectName);
        if (effect) {
            // 有缓存的情况
            this.cacheSounds[effectName] = egret.getTimer();
            effect.type = egret.Sound.EFFECT;
            let channel = effect.play(0, 1);
            channel.volume = this.effectVolume;
        } else {
            // 无缓存，动态加载如果在maxWaitMs ms内就播放，否则本次就不播放了
            let startTime = egret.getTimer();
            RES.getResAsync(effectName, (value?: any, key?: string) => {
                //console.log(`[RESOURCE] 加载音效[${effectName}]`);
                this.cacheSounds[effectName] = egret.getTimer();
                if (egret.getTimer() > startTime + maxWaitMs) return; // 本次不播放了
                effect = value;
                if (value) {
                    effect.type = egret.Sound.EFFECT;
                    let channel = effect.play(0, 1);
                    channel.volume = this.effectVolume;
                }
            }, this);
        }

        this.checkAndDestroySounds();
    }

    private readConfig() {
        let musicVolume_data: string = Controller.getGlobalStorageItem("musicVolume");
        if (musicVolume_data != null && musicVolume_data.length > 0) {
            this.musicVolume = parseFloat(musicVolume_data);
            if (isNaN(this.musicVolume)) this.musicVolume = 1;
            if (this.musicVolume <= 0) this.musicVolume = 0;
            if (this.musicVolume >= 1) this.musicVolume = 1;
        }
        let effectVolume_data: string = Controller.getGlobalStorageItem("effectVolume");
        if (effectVolume_data != null && effectVolume_data.length > 0) {
            this.effectVolume = parseFloat(effectVolume_data);
            if (isNaN(this.effectVolume)) this.effectVolume = 1;
            if (this.effectVolume <= 0) this.effectVolume = 0;
            if (this.effectVolume >= 1) this.effectVolume = 1;
        }
        let musicEnabled_data: string = Controller.getGlobalStorageItem("musicEnabled");
        this.musicEnabled = (musicEnabled_data == null || musicEnabled_data == undefined || musicEnabled_data.length == 0 || musicEnabled_data == "true");
        let effectEnabled_data: string = Controller.getGlobalStorageItem("effectEnabled");
        this.effectEnabled = (effectEnabled_data == null || effectEnabled_data == undefined || effectEnabled_data.length == 0 || effectEnabled_data == "true");
    }

    public saveConfig() {
        Controller.setGlobalStorageItem("musicVolume", this.musicVolume.toString());
        Controller.setGlobalStorageItem("effectVolume", this.effectVolume.toString());
        Controller.setGlobalStorageItem("musicEnabled", this.musicEnabled ? "true" : "false");
        Controller.setGlobalStorageItem("effectEnabled", this.effectEnabled ? "true" : "false");
    }

    private checkAndDestroySounds() {
        // 查找最久未使用资源
        let count = 0;
        let name = "";
        let min = 0x7fffffff;
        for (let k in this.cacheSounds) {
            count++;
            if (k == this.curMusicName) continue;
            if (this.cacheSounds[k] < min) {
                min = this.cacheSounds[k];
                name = k;
            }
        }
        if (count < 50) return; // 50个以内不释放

        // 释放资源
        if (name.length > 0) {
            delete this.cacheSounds[name];
            Util.destroyRes(name, false);
            //console.log(`[RESOURCE] 释放声音[${name}]`);
        }
    }

    /**查询音效 */
    public static SoundOpen(id): string {
        let sound = TableClientSoundResource.Item(id);
        if (sound == null) {
            return "";
        }
        let textDrop = sound.sound_path;
        let strs = new Array()
        strs = textDrop.split("/");
        let soundtext = strs[2];
        soundtext = soundtext.replace('.', '_');
        return soundtext;
    }

    /**查询音乐 */
    public static playbgmByID(id): string {
        let sound = TableClientBgmResource.Item(id);
        if (sound == null) {
            return "";
        }
        let textDrop = sound.sound_path;
        let strs = new Array()
        strs = textDrop.split("/");
        let soundtext = strs[2];
        soundtext = soundtext.replace('.', '_');
        return soundtext;
    }
}
}