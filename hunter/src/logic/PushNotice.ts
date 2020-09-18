namespace zj {
// AoneSDK环境支持

// 本地推送相关
export class PushNotice {
    public static powerFulltick: string;
    public static powerFulltitle: string;
    public static powerFullcontent: string;
    public static powerGettick: string;
    public static powerGettitle: string;
    public static powerGetcontent: string;
    public static noticeLogintick: string;
    public static noticeLogintitle: string;
    public static noticeLogincontent: string;

    public static init() {
        PushNotice.powerFulltick = Game.LanguageManager.common_push_2.zhcn;
        PushNotice.powerFulltitle = Game.LanguageManager.common_push_1.zhcn;
        PushNotice.powerFullcontent = Game.LanguageManager.common_push_2.zhcn;

        PushNotice.powerGettick = Game.LanguageManager.common_push_6.zhcn;
        PushNotice.powerGettitle = Game.LanguageManager.common_push_5.zhcn;
        PushNotice.powerGetcontent = Game.LanguageManager.common_push_6.zhcn;

        PushNotice.noticeLogintick = Game.LanguageManager.common_push_16.zhcn;
        PushNotice.noticeLogintitle = Game.LanguageManager.common_push_15.zhcn;
        PushNotice.noticeLogincontent = Game.LanguageManager.common_push_16.zhcn;

        Game.EventManager.on(GameEvent.PLAYER_POWER_CHANGE, PushNotice.PowerFull, this);
    }

    public static AddNotify(notifyId: number, tickText: string, title: string, content: string, interval: number, repeatInterval?: number) {
        if (repeatInterval == undefined || repeatInterval == null) repeatInterval = 0;
        let param = {
            action: "AddNotify",
            notifyId: notifyId.toString(),
            tickText: tickText.toString(),
            title: title.toString(),
            content: content.toString(),
            interval: interval.toString(),
            repeatInterval: repeatInterval.toString()
        };
        if (window['AoneSDKPlatform'] &&　(platform instanceof window['AoneSDKPlatform'])) {
            egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
        }
        console.log("sendToNative: " + JSON.stringify(param));
    }

    public static ClearNotify(notifyId: number) {
        let param = {
            action: "ClearNotify",
            notifyId: notifyId.toString(),
        };
        if (window['AoneSDKPlatform'] &&　(platform instanceof window['AoneSDKPlatform'])) {
            egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
        }
        console.log("sendToNative: " + JSON.stringify(param));
    }

    // 获取当前时间到指定时间的秒数（传入0点到该时间的秒数）
    public static getInterval(time) {
        // 获取当前时间
        let curTime = Game.Controller.serverNow();
        // 获取0点到当前时间的秒数
        let timeS = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();

        if (timeS <= time) {
            return time - timeS;
        } else {
            return time + 24 * 3600 - timeS;
        }
    }

    // 设置根据当前体力设置体力回满推送
    public static PowerFull() {
        console.log("call PushNotice.PowerFull");
        if (!Game.PlayerUserSystem.info.physical) {
            PushNotice.ClearNotify(TableEnum.Enum.NotifyType.PowerFull);
            return;
        }

        // 重新计算体力回满推送时间
        let levelinfo: TableLevel = TableLevel.Item(Game.PlayerInfoSystem.Level);
        if (levelinfo == null) {
            console.log("PowerFull error");
            return;
        }
        let left_power = levelinfo.role_power - Game.PlayerInfoSystem.Power;
        let currServerTime = Game.Controller.serverNow().getTime() / 1000;
        let left_time = CommonConfig.role_add_power_time - Math.floor(currServerTime - Game.Controller.lastPower);
        
        if(left_time < 0 && left_power > 0) {
            if(Device.GetSaveBoolInfo(StringConfig_Save.power_bug) == false) {
                Device.SetSaveBoolInfo(StringConfig_Save.power_bug, true);
                Game.PlayerInfoSystem.BaseInfo.power = Game.PlayerInfoSystem.Power + 1;
                left_power = left_power - 1;
            }
            left_time = CommonConfig.role_add_power_time + left_time
        }else if(left_power == 0) {
            Game.Controller.lastPower = currServerTime;
            Device.SetSaveBoolInfo(StringConfig_Save.power_bug , false);
        }

        let interval = yuan3(left_power > 0, (left_power - 1) * 300 + left_time, 0);
        console.log(`call PushNotice.PowerFull, left_power:${left_power}, currServerTime:${currServerTime}, lastPower:${Game.Controller.lastPower}, left_time: ${left_time}, interval: ${interval}`);
        if (isNaN(interval) || interval == undefined) return;
        if (interval != 0) {
            PushNotice.AddNotify(
                TableEnum.Enum.NotifyType.PowerFull,
                PushNotice.powerFulltick,
                PushNotice.powerFulltitle,
                PushNotice.powerFullcontent,
                interval)
        } else {
            PushNotice.ClearNotify(TableEnum.Enum.NotifyType.PowerFull);
        }
    }

    // 设置领体力推送 每天 12点 18点 21点推送
    public static PowerGet() {
        let times = [3600*12, 3600*18, 3600*21];
        let types = [TableEnum.Enum.NotifyType.PowerGet12, TableEnum.Enum.NotifyType.PowerGet18, TableEnum.Enum.NotifyType.PowerGet21];

        if (!Game.PlayerUserSystem.info.physical) {
            for (let i = 0; i < types.length; i++) {
                PushNotice.ClearNotify(types[i]);
            }
            return;
        }

        for (let i = 0; i < times.length; i++) {
            PushNotice.AddNotify(
                types[i], 
                PushNotice.powerGettick, 
                PushNotice.powerGettitle, 
                PushNotice.powerGetcontent, 
                PushNotice.getInterval(times[i]),
                24*3600
            )
        }
    }

    // 设置一个距离现在24小时后的推送，提醒登陆
    public static NotifyLogin() {
        PushNotice.ClearNotify(TableEnum.Enum.NotifyType.NotifyLogin);

        PushNotice.AddNotify(
            TableEnum.Enum.NotifyType.NotifyLogin, 
            PushNotice.noticeLogintick, 
            PushNotice.noticeLogintitle, 
            PushNotice.noticeLogincontent, 
            24*3600,
            //120,
            24*3600);
    }

    // 刷新本地推送设置
    public static RefreshNotice(index) {
        if (index == message.ClientOperation.CLIENT_OPERATION_POWERFULL) {
            PushNotice.PowerFull();
        } else if (index == message.ClientOperation.CLIENT_OPERATION_POWERREWARD) {
            PushNotice.PowerGet();
        }
    }
}

}