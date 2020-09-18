namespace zj {

    export const TextsConfig = {

        TextsConfig_GameName: {
            name: "最无双"
        },

        TextsConfig_Login: {
            errMailNone: "账号不能为空",
            errPwdNone: "密码不能为空",
            errMin: "密码不能少于6位",
            errMax: "密码不能多于16位",
            errDiff: "两次输入的密码不一致",
            accountQuick: "游客账号",
            quickNoDelete: "游客账号未绑定，无法删除",
            accountWrong: "帐号输入错误",
            passwordWrong: "密码输入错误",
            mailLoginFailed: "账号登录失败",
            quickLoginFailed: "快速登录失败",
            accountBanned: "您的帐号目前禁止登录",
            quickAccountFind: "您曾经使用过快速试玩功能，现为您找回游客账号",
            aoneAccountFind: "您已将游客账号绑定，现为您找回该账号",

            authNullNameOrId: "姓名或身份证号码不能为空",

            // for StringConfig_Login
            connectServerFailed: "链接服务器失败",
            Account: "账号登录，账号注册",
            AccountBind: "试玩账号，点击绑定",
            Mail: "请输入正确的邮箱地址",
            Password: "请输入6-10位密码",
            OldPwd: "请输入旧密码",
            NewPwd: "6~10位数字，字母",
            typeDes: [
                "拥有非常强大的近战力量，配合速度优势，能够轻松运用连续技给敌人造成多段浮空伤害",
                "通过远程剑气牵制敌人，并且s拥有最卓越的群体伤害威力，疾刃的技能多以远程攻击为主",
                "拥有召唤魔剑进行辅助攻击、控怪的能力，叠加召唤技能造成连续伤害是灵剑的主要手段",
                "拥有被剑魔附身的体质，随时可以通过剑魔变换手中的武器，发出碾碎敌人的剑魔气波",
            ],
            login_failed: "登录失败，请重新登录",
            connect_entery_failed: "网络连接失败，请尝试切换网络环境或稍后重试【%s】",
            login_entery_failed: "登录入口服务器失败",
            login_time_out: "登录超时或异常【%s】",
            login_allready: "已经登录成功",
            bind_success: "绑定账号成功",
            switch_success: "切换账号成功",

            serverNone: "无",
            serverCollect: "%s-%s区",
            serverDesSimple: "%s区 %s",
            serverDes: "<text>%s区 %s </text><color>%s</color><text>【%s】</text>",
            serverDesBoss: "S%s",
            serverState: [
                "维护",
                "流畅",
                "繁忙",
                "火爆",
            ],
            selectNone: "选择的分区不存在",
            selectClose: "选择的分区维护中",
            connect_server_fail: "链接服务器失败",
            please_choose_server: "选择服务器",
            version_overdue: "您的版本太低，无法进行游戏",
            version_overdue_and_update: "您的版本太低，无法进行游戏\n请点击确定前往下载新版本",
            server_closed: "服务器暂停，请稍候，非常抱歉！",
            server_unknow: "未知问题！",
            server_full: "在线玩家已满，请稍后重试",
            update_nospace: "存储空间不足，请清理后重试",
            update_failure: "下载失败，请检查网络后重试",
            update_confirm: "更新包大小为：%s，\n正在使用移动网络，是否继续下载？\n（建议在WIFI网络下更新）",
            server_invalid: "程序猿小哥正在维护服务器，\n请耐心等待",
            usertoken_invalid: "您的账号已在其他地方登陆，\n是否尝试重启游戏？",
            check_update: "正在检测更新...",
            server_version_change: "程序猿小哥刚刚上传了最新版本，\n请更新之后再继续玩耍吧~~",
            sdk_init_failed: "网络连接失败，请确认网络，\n重新进入游戏！",
            sdk_net_failed: "连接服务器失败，请重试。",
            beLoading: "正在加载: %s%%",
            connect_error: "哎呀呀！一不小心就断开链接啦~",
            reviewLodingTip: "正在加载: %s%%，总大小%.1fM，本地加载不消耗流量",
        },


        TextsConfig_Reconnect: {
            again: "断线重连失败，请重试！",
            logined: "账号已在其他设备登录，确定返回登录界面",
            kicked: "已被管理员强制下线，确定返回登录界面",
            disconnect: "已经断开连接，确定重连或返回登录界面",
            restart: "服务器已重新启动，确定返回登录界面",
            broken: "服务器已完全断开，确定返回登录界面",
            timeout: "请求超时，请稍后再试",
            loadError: "资源加载失败，请检查网络后重试",
            // errDes : {
            //     [EC.XG_INVALID_ROLEID_OR_SESSION] : "账号已在其他设备登录，确定返回登录界面",
            //     [EC.XG_INVALID_LOGIN] : "已被管理员强制下线，确定返回登录界面",
            //     [EC.XG_INVALID_ARG] : "服务器已重新启动，确定返回登录界面",
            //     [EC.XC_SERVER_ID_NOT_EXIST] : "服务器已完全断开，确定返回登录界面",
            //     [EC.XG_SERVER_RESTART] : "服务器已重新启动，确定返回登录界面",
            //     [EC.XG_PLUGIN_CHECK_SPEEDUP] : "检测到您的网络环境不佳，\n请检测网络环境后重新进入游戏。",
            // },
        },

        TextsConfig_Common: {
            version: "v%s",
            // un use
            defaultFontName: "ssof.ttf",
            unknownError: "未知错误",
            unknow: "未知",
            nothing: "无",
            before: "前",
            pending: "待定",

            // format
            percent: "%",
            formatSelect: "(%s/%s人)",
            power: "战力：%s",
            wan: "万",
            s_wan: "%s万",
            yi: "亿",
            mult: "×",
            cishu: "次",
            tian: "天",
            kuo: "【%s】",

            chat_msg: "<text>【%s】</text>",



            me: "我",
            reward: "奖励",
            recommend: "推荐",
            remainder: "剩余",
            sweepCount: "扫荡%s次",

            // error
            noLimit: "无限制",
            srhsNone: "您搜索的对象不存在！",
            searchNumErr: "请输入正确的ID",
            name_cost_money: "<text>您的改名卡数量不足，是否花费</text><color>r:200,g:38,b:0</color><text>%s钻石</text><text>直接改名？</text>",
            chat_cost_money: "<text>您的小喇叭数量不足，是否花费</text><color>r:200,g:38,b:0</color><text>%s钻石</text><text>直接发送？</text>",
            common_cost_money_next: "",
            // common_cost_money :         
            // [[
            //     <text>是否花费</text>
            //     <color>r:200,g:38,b:0</color><text>%d</text>
            //     <text>钻石，购买</text>
            //     <color>r:200,g:38,b:0</color><text>%d</text>
            //     <text>金币？（今日剩余购买次数：%d/%d）</text>
            //     <text>暴击 *%d</text>
            //     ]],
            // common_cost_money_next :         
            // [[
            //     <text>是否花费</text>
            //     <color>r:200,g:38,b:0</color><text>%d</text>
            //     <text>钻石，购买</text>
            //     <color>r:200,g:38,b:0</color><text>%d</text>
            //     <text>金币？（今日剩余购买次数：%d/%d）</text>       
            //     ]],
            message_cirt: "暴击x%d",
            common_error: "购买次数已达上限",
            expMax: "已满级",
            openAutoLv: "%d级开启",
            passEliteOpen: "通关挑战%s_%s开启",
            nameDefault: "新手猎人",
            noOpen: "本次删档测试暂未开放充值功能",
            multiple1: "%d倍暴击",//白

            one_key_nor_tips: "是否全部使用以下物品？",
            one_key_fruit_tips: "是否全部使用以下仙果？",
            one_key_demon_tips: "是否全部使用以下魔匣？",
            one_key_fruit_max: "单次最多使用100个仙果",
            one_key_fruit_nor: "仙果中获得的道具请到背包查看",
            one_key_demon_nor: "魔匣中获得的道具请到背包查看",
            one_key_rogue_nor: "包裹中获得的道具请到背包查看",

            numCH: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
            numUnit1: ["", "十", "百", "千"],
            numUnit2: ["", "万", "亿", "兆"],
            numUnit3: ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "兆"],
            numZero: "零",
            numOne: "一",
            numTen: "十",

            two: "两",
            ri: "日",

            unknowGeneral: "神秘猎人",
            detaillimit: "玩家不允许他人查看猎人详情",
            noHunter: "玩家没有培养猎人",
            intrAndDes: "介绍：%s\n特点：%s",
            fistTimeTips: "<color>r:255,g:216,b:60</color><text>首充结束时间</text>",
            mail_error: "该邮件内容由于版本原因无法正常显示,如有附件可正常领取。",
            weekDay: {
                [1]: "周日",
                [2]: "周一",
                [3]: "周二",
                [4]: "周三",
                [5]: "周四",
                [6]: "周五",
                [7]: "周六",
            },
            phoneBind: "验证码已发送，请注意查收",
            phoneBindSend: "验证码已发送，%s秒后可重新获取验证码",
            phoneBindSuccess: "恭喜您已成功绑定手机，奖励稍后将通过邮件形式发送~",
            firstFree: "首杀免费",
            firstFreeCom: "首杀不计次",
        },

        TextsConfig_FunOpen: {
            Elite: "队伍达到8级可以开启精英副本",
        },

        TextsConfig_Name: {
            none: "名字不能为空",
            err: "名字不能包含特殊字符",
        },

        TextsConfig_Time: {
            online: "在线",
            justNow: "刚刚",
            minsAgo: "%s分钟前",
            hoursAgo: "%s个小时前",
            hoursAgo2: "%s小时前",
            daysAgo: "%s天前",
            monsAgo: "%s月前",
            yearsAgo: "%s年前",
            noLogin: "近期未登录",

            openNow: "马上开启",
            openMin: "%d分钟后开启",
            openHour: "%d小时后开启",
            openDay: "%d天后开启",

            closeNow: "马上关闭",
            closeMin: "%d分钟后关闭",
            closeHour: "%d小时后关闭",
            closeDay: "%d天后关闭",

            closed: "<color>r:255,g:38,b:0</color><text>已经关闭</text>",

            leave: "%d天%d小时%d分钟",
            time: "<color>r:0,g:255,b:0</color><text>%d</text><color>r:230,g:210,b:100</color><text>天</text><color>r:0,g:255,b:0</color><text>%d</text><color>r:230,g:210,b:100</color><text>小时</text><color>r:0,g:255,b:0</color><text>%d</text><color>r:230,g:210,b:100</color><text>分钟</text>",

            leaveSec: "%02d:%02d:%02d",
            minsAndSec: "%02d:%02d",

            timeStr: "%s年%s月%s日",
            day: "天",
            yesterday: "昨天",
            hour: "小时",
            hours: "时",
            min: "分钟",
            sec: "秒",
        },

        TextConfig_Input: {
            commonInput: "请输入%s：",
            commonShort: "长度不可超过六个字",
            commonLong: "请输入内容（最长不超过40字）",
            chat: "点此输入聊天内容(1-38个字)",
            addFriendID: "请输入完整的玩家ID",
            addFriendName: "请输入玩家名字关键词",
            joinLeagueID: "请输入完整的公会ID",
            joinLeagueName: "请输入公会关键词",
            createLeagueName: "公会名字不可超过六个字",
            loginMail: "请输入正确的账号",
            loginPwd: "请输入6-10位密码",
            loginOldPwd: "请输入您的原密码",
            mineDigInvite: "请输入您要说的话",

            mineName: "请填写您的真实姓名",
            mineID: "请填写真实有效证件号",
            auth_success: "实名认证成功",
        },

        TextsConfig_Chat: {
            no_league: "您尚未加入任何公会",
            no_receiver: "请先选择私聊对象",
            input_whisper: "对%s说：%s",
            say_you: "你",
            send_err_1: "聊天内容字数过长",
            send_err_2: "不能发空消息",
            send_err_3: "内容不能包含特殊符号",
            // say_tag_1 : "【系统消息】",
            say_tag_1: "<color>r:241,g:34,b:0</color><text>【系统消息】</text>",
            battle_report: "<color>r:241,g:34,b:0</color><text>【战报分享】</text>",
            // say_tag_2 : "对%s说：%s",
            say_tag_2: "<text>对</text><color>r:200,g:38,b:0</color><text>%s</text><text>说：</text><text>%s</text>",
            say_tag_3: "%s<color>r=50,g=255,b=50</color><text>对</text>%s<color>r=50,g=255,b=50</color><text>说</text>",
            say_tag_5: "<color>r=79,g=191,b=89</color><text>【公会招募】</text>",
            mini_title: {
                // 全部
                [1]: "<color>r:255,g:255,b:255</color><text>【全部】</text>",
                // 世界
                [2]: "<color>r:255,g:255,b:40</color><text>【世界】</text>",
                // 公会
                [3]: "<color>r:0,g:220,b:0</color><text>【公会】</text>",
                // 私聊
                [4]: "<color>r:255,g:70,b:255</color><text>【私聊】</text>",
                // 系统
                [5]: "<color>r:255,g:0,b:0</color><text>【系统】</text>",
                // 公告
                [6]: "<color>r:255,g:255,b:255</color><text>【公告】</text>",
                // 附近
                [8]: "<color>r:0,g:220,b:0</color><text>【附近】</text>",
            },
            mini_content: {
                // 全部
                [1]: "",
                // 世界 "%s：%s",
                [2]: "<color>r:40,g:255,b:255</color><text>%s</text><color>r:40,g:255,b:255</color><text>：</text><color>r:255,g:255,b:40</color><text>%s</text>",
                // 公会 "%s：%s",
                [3]: "<color>r:40,g:255,b:255</color><text>%s</text><color>r:40,g:255,b:255</color><text>：</text><color>r:0,g:220,b:0</color><text>%s</text>",
                // 私聊 "%s对%s说：%s",
                [4]: "<color>r:40,g:255,b:255</color><text>%s</text><color>r:255,g:70,b:255</color><text>对</text><color>r:40,g:255,b:255</color><text>%s</text><color>r:255,g:70,b:255</color><text>说：</text><color>r:255,g:70,b:255</color><text>%s</text>",
                // 系统
                [5]: "",
                // 公告
                [6]: "",
                // 附近 "%s：%s",
                [8]: "<color>r:40,g:255,b:255</color><text>%s</text><color>r:40,g:255,b:255</color><text>：</text><color>r:0,g:220,b:0</color><text>%s</text>",
            },
            mini_content_pure: {
                // 全部
                [1]: "",
                // 世界 "%s：%s",
                [2]: "<color>r:40,g:255,b:255</color><text>%s</text><color>r:40,g:255,b:255</color><text>：</text>%s",
                // 公会 "%s：%s",
                [3]: "<color>r:40,g:255,b:255</color><text>%s</text><color>r:40,g:255,b:255</color><text>：</text>%s",
                // 私聊 "%s对%s说：%s",
                [4]: "<color>r:40,g:255,b:255</color><text>%s</text><color>r:255,g:70,b:255</color><text>对</text><color>r:40,g:255,b:255</color><text>%s</text><color>r:255,g:70,b:255</color><text>说：</text><color>r:255,g:70,b:255</color><text>%s</text>",
                // 系统
                [5]: "",
                // 公告
                [6]: "",
                // 附近 "%s：%s",
                [8]: "<color>r:40,g:255,b:255</color><text>%s</text><color>r:40,g:255,b:255</color><text>：</text>%s",
            },
            change_channel_success: "成功切换到频道%s",
            input_not_number: "频道号非法，请输入1~%s的数字",
            serverSelf: "本服",

            //    singleNo: "跨服单队切磋暂未开放",
            //    battleNO:"队伍等级达到8级开启单队切磋",
            //    battleThreeNO:"队伍等级达到40级开启三队切磋",
            battleing: "战斗中不能切磋",
            worderland: "贪婪之岛中不能切磋",
            enter_chat: "您已进入频道%s",
        },

        TextsConfig_ChooseHero: {
            animateType: {
                generals: "先锋",
                reserves: "后卫",
                supports: "援护",
                [1]: "先锋",
                [2]: "后卫",
                [3]: "援护",
            }
        },

        TextsConfig_GetRes: {

            power: "精力+",
            split: "仙玉+",
        },



        TextsConfig_HeroMain: {

            fate_compose: "与%s一起上阵时,",

            everLevel: "每级",
            level: "等级：",

            open1: "已开启",
            open2: "未开启",

            partnerLv: "级可激活",

            LevelUp1: "等级：",
            LevelUp4: "精力：",

            LevelUp7: "体力上限：",
            LevelUp8: "猎人等级上限：",
            LevelUp9: "念兽等级上限：",
            LevelUp10: "解锁功能：",
            GradeAndLevel: "<text>进阶到</text>%s<text>\n可提升等级上限到</text><color>r=255,g=252,b=0</color><text>%s</text><text>级</text>",

            GradeAndBreak: "<text>猎人</text><color>r=255,g=252,b=0</color><text>%s阶突破</text><text>\n可提升等级上限到</text><color>r=255,g=252,b=0</color><text>%s</text><text>级</text>",
            GreadStepMax: "猎人达到66级可以进阶",
            chapter: "章节：",

            beFirstHero: "这已经是第一个猎人了",
            beLastHero: "这已经是最后一个猎人了",

            //使用的语句
            ownHero: "<text>拥有猎人</text><color>r:0,g:150,b:0</color><text>%s</text>",
            ownArtifact: "<text>拥有神兵</text><color>r:0,g:150,b:0</color><text>%s</text>",

            //未激活的语句
            fateTextUp_No_Active: "<text>拥有</text><color>r:0,g:150,b:0</color><text>%s</text><text>后可激活</text>",
            fateTextDn_No_Active: "<text>下一级:%s</text><color>r:0,g:150,b:0</color><text>+%d%%</text>",

            //已激活的语句
            fateTextUp_Active: "<color>r:65,g:35,b:5</color><text>当前:%s</text><color>r:0,g:150,b:0</color><text>+%d%%</text>",
            fateTextDn_Active: "<text>下一级:%s</text><color>r:0,g:150,b:0</color><text>+%d%%</text>",

            //升级条件
            fateCond: "将%s突破至+%d",
            fateValue: "<text>%s</text><color>r:0,g:150,b:0</color><text>+%s%%</text>",

            // detail : {
            //     [[
            //         <color>r:50,g:20,b:5</color><text>生命值：   </text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>物理攻击：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>物理防御：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>法术攻击：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>法术防御：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>物理暴击：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>法术暴击：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>暴伤加成：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>暴击抵抗：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>闪避：     </text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>命中：     </text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>忽视物防：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>忽视法防：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>终伤附加：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>终伤减免：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>攻击：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>防御：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>暴击：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>忽视防御：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>异常抵抗：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>忽视异常抵抗：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            //     [[
            //         <color>r:50,g:20,b:5</color><text>浮空抵抗：</text>
            //         <color>r:170,g:70,b:20</color><text>%d</text>
            //     ]],
            // },

            attr: {
                [1]: "生命值",
                [2]: "攻击",
                [3]: "防御",
                [4]: "效果命中",
                [5]: "效果抵抗",
                [6]: "暴击概率",
                [7]: "法术暴击",
                [8]: "暴击伤害",
                [9]: "暴击抵抗",
                [10]: "浮空格挡",
                [11]: "忽视格挡",
                [12]: "忽视防御",
                [13]: "忽视法防",
                [14]: "终伤附加",
                [15]: "终伤减免",
                [16]: "怒气减免",
                [17]: "攻击",
                [18]: "防御",
                [19]: "暴击",
                [20]: "忽视防御",
                [21]: "异常抵抗",
                [22]: "忽视异常抵抗",
                [23]: "浮空抵抗",
                [24]: "速度",
                [25]: "援护消耗",
            },

            quality: {
                [1]: "丁级",
                [2]: "丙级",
                [3]: "乙级",
                [4]: "甲级",
                [5]: "神级",
                [6]: "最大",
            },

            //天赋格式: 守护Lv5 +2
            talent_ui_name: "<text>%s</text><color>r:0,g:255,b:0</color><text>+%d</text>",

            talent_ui_grade: "【品质】",
            talent_ui_now: "【天赋效果】",
            talent_ui_next1: "【升级效果】",
            talent_ui_next2: "【Lv%d效果】",

            talent_ui_one: "【初始效果】",
            talent_ui_max: "【最终效果】",


            quality_name: "品质：",

            grow: "成长值：",
            forge_tips: "%d级可锻造",
            carve_tips: "%s可刻印",
            carve_tips_err: "%s即可刻印",

            carve: "%d件：%s+%d",
            carve_name: {
                [0]: "无",
                [1]: "一元印",
                [2]: "两仪印",
                [3]: "三才印",
                [4]: "四象印",
                [5]: "五行印",
                [6]: "六合印",
                [7]: "七星印",
                [8]: "八卦印",
                [9]: "九宫印",
                [10]: "十方印",
                [11]: "百戈印",
                [12]: "千钧印",
            },
            carve_attr_tips: {
                [1]: "(所有装备刻到一元后才能刻两仪)",
                [2]: "(所有装备刻到两仪后才能刻三才)",
                [3]: "(所有装备刻到三才后才能刻四象)",
                [4]: "(所有装备刻到四象后才能刻五行)",
                [5]: "(所有装备刻到五行后才能刻六合)",
                [6]: "(所有装备刻到六合后才能刻七星)",
                [7]: "(所有装备刻到七星后才能刻八卦)",
                [8]: "(所有装备刻到八卦后才能刻九宫)",
                [9]: "(所有装备刻到九宫后才能刻十方)",
                [10]: "(所有装备刻到十方后才能刻百戈)",
                [11]: "(所有装备刻到百戈后才能刻千钧)",
                [12]: "(所有装备刻已刻印至最高)",
            },

            suffix_step: {
                [0]: "",
                [1]: "绿",
                [2]: "绿+1",
                [3]: "绿+2",
                [4]: "蓝",
                [5]: "蓝+1",
                [6]: "蓝+2",
                [7]: "蓝+3",
                [8]: "紫",
                [9]: "紫+1",
                [10]: "紫+2",
                [11]: "紫+3",
                [12]: "紫+4",
                [13]: "橙",
                [14]: "橙+1",
                [15]: "橙+2",
                [16]: "橙+3",
                [17]: "橙+4",

                [18]: "红",
                [19]: "红+1",
                [20]: "红+2",
                [21]: "红+3",
                [22]: "红+4",
                [23]: "红+5",
                [24]: "红+6",
                [25]: "红+7",
                [26]: "红+8",
            },

            forge_equip_step: {
                [1]: "白色",
                [2]: "绿色",
                [3]: "绿+1",
                [4]: "绿+2",
                [5]: "蓝色",
                [6]: "蓝+1",
                [7]: "蓝+2",
                [8]: "蓝+3",
                [9]: "紫色",
                [10]: "紫+1",
                [11]: "紫+2",
                [12]: "紫+3",
                [13]: "紫+4",
                [14]: "橙色",
                [15]: "橙+1",
                [16]: "橙+2",
                [17]: "橙+3",
                [18]: "橙+4",

                [19]: "红",
                [20]: "红+1",
                [21]: "红+2",
                [22]: "红+3",
                [23]: "红+4",
                [24]: "红+5",
                [25]: "红+6",
                [26]: "红+7",
                [27]: "红+8",
            },

            carve_equip_tips: {
                [1]: "装备白色可印刻",
                [2]: "装备绿色可印刻",
                [3]: "装备绿+1可印刻",
                [4]: "装备绿+2可印刻",
                [5]: "装备蓝色可印刻",
                [6]: "装备蓝+1可印刻",
                [7]: "装备蓝+2可印刻",
                [8]: "装备蓝+3可印刻",
                [9]: "装备紫色可印刻",
                [10]: "装备紫+1可印刻",
                [11]: "装备紫+2可印刻",
                [12]: "装备紫+3可印刻",
                [13]: "装备紫+4可印刻",
                [14]: "装备橙色可印刻",
                [15]: "装备橙+1可印刻",
                [16]: "装备橙+2可印刻",
                [17]: "装备橙+3可印刻",
                [18]: "装备橙+4可印刻",

                [19]: "装备红色可印刻",
                [20]: "装备红+1可印刻",
                [21]: "装备红+2可印刻",
                [22]: "装备红+3可印刻",
                [23]: "装备红+4可印刻",
                [24]: "装备红+5可印刻",
                [25]: "装备红+6可印刻",
            },

            carve_tips_0: "六件装备均刻印至【一元】可激活属性",
            carve_tips_1: "【%s】",
            carve_tips_1_9: "六件装备均已刻至【%s】",
            carve_tips_10: "六件装备均已刻至【千钧】",
            carve_tips_name: {
                [0]: "无",
                [1]: "一元",
                [2]: "两仪",
                [3]: "三才",
                [4]: "四象",
                [5]: "五行",
                [6]: "六合",
                [7]: "七星",
                [8]: "八卦",
                [9]: "九宫",
                [10]: "十方",
                [11]: "百戈",
                [12]: "千钧",
            },

            carve_master: "<text>恭喜刻印大师升至 </text><color>r:255,g:255,b:0</color><text>%d</text><text> 级</text>",

            level_max: "已满级",
            quality_max: "已至最高品质",

            FightValue: "当前战斗力：+",

            Role_NameLv: "%s：Lv%d",
            Role_level: "Lv：%d",
            Role_Power: "战力：%d",
            Role_PowerTest: "%d 00 %d",

            Role_Hero_Power: "猎人战力",
            Role_Equip_Power: "装备战力",
            Role_Exp: "经验：%4d/%d",
            Role_Soul: "信物：%4d/%d",

            Skill_Name: "技能：",
            Skill_Type: "类型：",
            Skill_Grade: "等级：",
            Skill_cd: "冷却：",
            Skill_Detail: "详细：",
            Skill_Lv_Awake: "<text>Lv%d/%d</text><color>r:0,g:180,b:0</color><text>+%d</text>",
            Skill_Lv_Name: "<text>%s Lv%d/%d</text><color>r:0,g:180,b:0</color><text>+%d</text>",
            Skill_Lv_Level: "<text>Lv%d</text><color>r:0,g:180,b:0</color><text>+%d</text>",

            Skill_Lv_Life: "<text>%s</text><color>r:0,g:180,b:0</color><text>+%d</text>",

            Skill_Type_Name: [
                "基础技",
                "手动技",
                "怒斩技",
            ],

            Upgrade_NameLv: "%s Lv%d/%d",
            Upgrade_Exp: "%d/%d",

            fight: "战力",
            up_strengthen: "强化至",
            up_forge: "锻造至",
            up_carve: [
                "一级印",
                "二级印",
                "三级印",
            ],
            piece: "件",

            AddStar_Cost: "升到%d星需要消耗%d金币，是否继续？",
            AddStar_OverA: "升星材料中含有A级猎人，是否继续？",
            AddStar_OverS: "升星材料中含有S级猎人，是否继续？",
            AddStar_NameLv: "%s Lv%d",
            AddStar_Soul: "%4d/%d",

            instance_name: "%d-%d %s",
            instance_normal: "冒险副本",
            instance_elit: "精英",
            instance_lock: "未开启",
            instance_count: "",

            Talent_Name: "专精天赋：",
            Talent_Effect: "专精效果：",

            full_level_simple: "满级",
            full_exp: "猎人经验已满",
            full_level: "猎人已达到满级",
            full_star: "星级已升到最高",
            full_talent: "天赋已升到最高",

            general_level_up: "猎人等级升级到：第%d级",
            general_skill_up: "猎人技能升级到：第%d级",
            general_step_up: "猎人阶级升级到：第%d级",

            equip_strengthen: "装备强化到：第%d级",
            equip_forge: "装备锻造到：[%d]%s",
            equip_carve: "装备印刻到：第%d级",

            equip_type: [
                "武器",
                "衣甲",
                "鞋子",
                "帽子",
                "配饰",
                "坐骑",
            ],
            profession: [
                "步兵",
                "刺客",
                "法师",
                "弓箭手",
                "骑兵",
            ],


            drop_chapter: "第%s章",
            drop_instance: "第%d关",

            star_lock: "关卡尚未开启",
            star_open: "先通关该副本",
            partner_lock: "关卡尚未开启",

            partner_unit: [
                //拥有大于0个
                "<text>拥有</text><color>r:36,g:215,b:0</color><text>%d</text><text>个</text>",
                //拥有0个
                "<text>拥有</text><color>r:241,g:34,b:0</color><text>%d</text><text>个</text>",
            ],
            partner_compose: "徽章已合成",
            partner_activite: "徽章激活成功",

            talent_lock: "咋解锁咋解锁",
            talent_unUp: "未学习哪来升级",
            // talent_unlearn      : "未学习快学习",
            talent_choose: "已选择：%d/%d",
            talent_exp: "天赋经验+%d",

            talent_unlock: {
                [3]: "<text>猎人</text><color>r:241,g:34,b:0</color><text>3星</text><text>时解锁</text>",
                [4]: "<text>猎人</text><color>r:241,g:34,b:0</color><text>4星</text><text>时解锁</text>",
                [5]: "<text>猎人</text><color>r:241,g:34,b:0</color><text>5星</text><text>时解锁</text>",
                [6]: "<text>猎人</text><color>r:241,g:34,b:0</color><text>6星</text><text>时解锁</text>",
            },

            // talent_learn        : "成功学习 %s 天赋",
            talent_update: "成功升级 %s 天赋",
            talent_no: "暂无天赋",
            talent_relearn: "是否覆盖原有天赋：",

            talent_compose: "成功合成 %s 天赋书",
            talent_resolve: "成功分解 %d 本天赋书",
            talent_not_pro: "此天赋非专精天赋",

            talent_tolearn: "可以学习",
            talent_learn: "已学习",
            talent_unlearn: "未激活",
            talent_next: "级效果",

            equip_level: "等级：",
            equip_grade: "品级：",
            equip_quality: "品质：",

            talent_pro: "专精：",

            grade_word: [
                "品质：丁级",
                "品质：丙级",
                "品质：乙级",
                "品质：甲级",
                "品质：神级",
                "品质：最大",
            ],


            equip_tip: "猎人战力：%d",


            get_soul: "已拥有该猎人，本次将转化为%d个%s的碎片",

            soul_tips: "还差%d个%s信物可召唤",
            soul_full: "可以召唤猎人了",

            has: "拥有：%d ",

            general_state: {
                [1]: "综合人气指数",
                [2]: "官方新手推荐",
                [3]: "最佳先锋指数",
                [4]: "最佳援护指数",
                [5]: "最佳后卫指数",
                [6]: "副本上阵人气",
                [7]: "本服格斗守擂人气",
                [8]: "本服格斗攻擂人气",
                [9]: "伏牛宝穴人气",
                [10]: "伏牛金窟人气",
                [11]: "天空竞技场上阵人气",
                [12]: "通缉令上阵人气",
            },

            up_value: "剩余培养空间:%d%%",

            release_attri: "%d",
            release_specail_attri: "%d%%",

            test_attri: "c:%d s:%d",
            test_specail_attri: "c:%d%% s:%d%%",

            talent_lock_new: "<text>猎人</text><color>r:241,g:34,b:0</color><text>%s星</text><color>r:255,g:255,b:255</color><text>时解锁此栏</text>",
            talent_lock_life_new: "<text>完成天命</text><color>r:241,g:34,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>时解锁此栏</text>",

            talent_lock_new_right: "<color>r:83,g:46,b:3</color><text>猎人</text><color>r:241,g:34,b:0</color><text>%s星</text><color>r:83,g:46,b:3</color><text>时解锁此栏</text>",
            talent_lock_life_new_right: "<color>r:83,g:46,b:3</color><text>完成天命</text><color>r:241,g:34,b:0</color><text>%s</text><color>r:83,g:46,b:3</color><text>时解锁此栏</text>",


            talent_change: "天赋切换成功",

            talent_text_choose: "(可从%s个天赋中选择一项学习)",

            talent_change_tips: "确认花费%s钻石更换天赋吗？（原天赋的等级经验将转移给新天赋）",

        },

        // 消息
        TextsConfig_Mail: {
            count: "数量：",
            from: "来自：",
            system: "系统",
            title_min: "邮件标题最小长度1字",
            title_max: "邮件标题最大长度10字",
            content_min: "邮件内容最小长度1字",
            content_max: "邮件内容最大长度150字",
            send_success: "发送成功",

            report_detail: "不能查看对方信息",
            report_addfoe: "不能添加对方为仇人",
            GetMessage: "收件人：%s"
        },

        TextsConfig_Comment: {
            wanted_type: {
                [1]: "芬克斯の试炼",
                [2]: "西索の试炼",
                [3]: "团长の试炼",
                [4]: "窝金の试炼",
                [5]: "玛琪の试炼",
                [6]: "库哔の试炼",
                [7]: "柯特の试炼",
            },
            title_type: {
                [2]: "天空竞技场",
                [3]: "猎人执照",
                [4]: "挑战副本",
                [5]: "流星街",
                [6]: "交流平台",
                [8]: "遗迹",
            },
            wanted: {
                [1]: "芬克斯",
                [2]: "西索",
                [3]: "库洛洛",
                [4]: "窝金",
                [5]: "玛琪",
                [6]: "库哔",
                [7]: "柯特",
            },

            license: "执照",


            total: {
                [1]: "猎人",
                [2]: "天空竞技场",
                [3]: "猎人执照",
                [4]: "流星街",
                [5]: "山贼老巢",
            },

            tower: {
                [1]: "普通",
                [2]: "高阶",
            },

            Group: {
                [1]: "山贼老巢",
                [2]: "副本二",
                [3]: "副本三",
            },

            request: "回复： %s",


            content_min: "发布内容不能为空",
            content_max: "发布内容最多100个字",
            sureDelete: "确定删除此条评论吗？",
            comment: "点此输入聊天内容(1-100个字)",
            send: "<color>r:25,g:227,b:68</color><text>发布成功</text>",
            des: "<text>【%s】</text><text>%s</text>",
            des_next: "<text>【%s】</text><text>Lv%s </text><text>%s</text>",
            des_next_1: "<text>Lv%s </text><text>【%s】 </text><text>%s</text>",
            des_next_2: "<text>Lv%s   </text><text>【%s】 </text><text>%s</text>",
            des_next_3: "<color>r:46,g:139,b:87</color><text>【%s】 %s</text>",
            des_level: "Lv %s",
            system: "<text>【系统】</text><text>%s</text>",
            time: "%s后可输入",

            commentInfo: "<text>【%s】 </text><text>%s</text>",
            commentReq: "点此回复%s的消息",

        },

        TextsConfig_Task: {
            need: "<text>%s</text><color>r:25,g:227,b:68</color><text>%s</text><text>/</text><color>r:25,g:227,b:68</color><text>%s</text>",
            needLevel: "<text>%s</text><color>r:255,g:0,b:0</color><text>%s</text><text>/</text><color>r:25,g:227,b:68</color><text>%s</text>",
            Activtion: "达到%s级",
            License: "猎人执照已达到最大星级",
            License_text: "有科目未达到条件，无法继续考试",
            tishi: "请先领取上一星级执照 ",

            starlevel: "%s星猎人资格考试",
            ButtonLevel: "_%s星",
            Test: "%s科目星级未达到考试要求",
            Examination: "已通关",
            message: "队伍达到10级后开启执照功能",

            name: {
                [1]: "队伍等级达到%s级",
                [2]: "通关副本 :%s_1",
                [3]: "获得%s个4星猎人",
                [4]: "通关天空竞技场%s层",
                [5]: "跨服格斗场达到%s名%段",
                [6]: "获得%s个4星卡片",

            },

            title: {
                [1]: "角色等级",
                [2]: "地图探索",
                [3]: "猎人能力",
                [4]: "天空竞技场",
                [5]: "猎人格斗",
                [6]: "卡片能力",
            },

            canGet: "请按顺序领取，有奖励未领取",

            des_Get: "表现不错嘛！赶快领取%s星猎人执照吧！",
            conditioned: "<text>(</text><color>r:25,g:227,b:68</color><text>%s</text><text>/</text><color>r:25,g:227,b:68</color><text>%s</text><text>)</text>",
            conditioning: "<text>(</text><color>r:255,g:0,b:0</color><text>%s</text><text>/</text><color>r:25,g:227,b:68</color><text>%s</text><text>)</text>",
            instanced: "<text>(</text><color>r:25,g:227,b:68</color><text>%s_%s</text><text>/</text><color>r:25,g:227,b:68</color><text>%s_%s</text><text>)</text>",
            instancing: "<text>(</text><color>r:255,g:0,b:0</color><text>%s_%s</text><text>/</text><color>r:25,g:227,b:68</color><text>%s_%s</text><text>)</text>",
            getSeven: "请先获得七星猎人执照",
        },

        // 商城
        TextsConfig_Mall: {
            // refresh : "每天%s 会自动刷新商品",
            fourfresh: "每周一 4:00刷新物品",
            fourfreshs: "每4小时刷新一次商品",
            refresh_confirm: "是否确认花费%d钻石刷新商铺中所有商品？",
            refresh_confirm2: "是否确认花费%d远古晶石刷新商铺中所有商品？",
            mall_limit: "限购：%s件",
            mall_close: "距关闭时间还有",
            mall_refresh: "距下次自动刷新还有",
            mall_secret: "神秘商铺已关闭",
            mall_left: "今日剩余购买数量：",

            dis: "折",

            // buy_format :
            //     [[
            //     <text>是否花费</text>
            //     <color>r:200,g:38,b:0</color><text>%d</text>
            //     <text>%s购买</text>
            //     <color>r:200,g:38,b:0</color><text>%sx%d</text>
            //     ]],

            // name : [
            //     [1] : "普通商铺",
            //     [2] : "演武商铺",
            //     [3] : "公会商铺",
            //     [4] : "争霸商铺",
            //     [5] : "神秘商铺",
            //     [6] : "如意商铺",
            // ],

            lottery_tips: "酒馆畅饮可以获得酒馆积分哦~",
            demon_tips: "参与魔域内活动玩法可获得魔晶~",
            pk_tips: "参与跨服战可以获得荣誉值~",
            buy_count: "拥有: ",
            buy_limit: "<color>r:255,g:0,b:0</color><text>%s级可购买</text>",

        },

        // 宝箱
        TextsConfig_Treasure: {

            key_name: {
                [1]: "普通钥匙",
                [2]: "精致钥匙",
            },

            left: {
                [1]: "下次双倍奖励（剩余%d次）",
                [2]: "下次四倍奖励（剩余%d次）",
            },

            more: {
                [1]: "下次双倍奖励（剩余%d次）",
                [2]: "下次四倍奖励（剩余%d次）",
            },

            // buy_str : {
            //     [1] :
            //         [[
            //         <text>钥匙数量不足，是否花费</text>
            //         <color>r:200,g:38,b:0</color>
            //         <text>%d钻石</text>
            //         <text>开%d次宝箱？(%s单价：%d个钻石)</text>
            //         ]],
            //     [2] :
            //         [[
            //         <text>钥匙数量不足，是否花费</text>
            //         <color>r:200,g:38,b:0</color>
            //         <text>%d钻石</text>
            //         <text>连开%d次宝箱？(%s单价：%d个钻石)</text>
            //         ]],
            // },
        },

        // // 访仙
        TextsConfig_Worship: {


            count: "今日剩余次数：%d/%d",
            left: "剩余访仙：%d/%d次",
            free1: "免费",
            free2: "免费求书：%d次",
            resolve: "已选择天赋书：甲级x%d本、乙级x%d本、丙级x%d本、丁级x%d本。",
            warning: "还有天赋残卷未获取，是否确认结束本次访仙？",
            has_book: "拥有：",
            has_split: "残卷：",
            book_sold: "已全部获取",
            handbook_resolve: "是否分解该天赋书？",
            handbook_compose: "是否合成该天赋书？",
        },

        //日常
        TextsConfig_Daily: {

            has: "当前活跃:",
            over: "敬请期待",
            lock: "队伍达到%d级开启",
            inst: "通关 %s 后解锁",
            token: "%s(已累充%d/%d钻石)",
            month: "%s(已领取%d/%d天)",
        },

        //领奖
        TextsConfig_Award: {

            day: "第%s天",
            day_get: "<text>激活后第</text><color>r:46,g:255,b:255</color><text>%s</text><text>天可领</text>",
            resign: "可补领",
            click: "<color>r:0,g:249,b:0</color><text>点击领取</text>",
            energy: "%d:00 - %d:00",
            hasSign: "本月已累积签到%d天",
            sign: "本月已累积签到%d天了（漏签%d天）",
            fix: "本月剩余补签次数：%d次",

            fund: "基金购买成功!",
            token: "钻石",

            month1: "再充值%d元即可激活",
            month2: "月卡失效后充值%d元可再激活",

            GetPowerTime: "%d点- %d点",
        },

        //玩家信息
        TextsConfig_User: {

            name_new: "新的名字",

            text_name: "名称：",
            text_id: "ID：",
            text_level: "等级：",
            text_type: {
                [1]: "当前主称号：",
                [2]: "当前副称号：",
            },
            text_title: {
                [1]: "主称号：",
                [2]: "副称号：",
            },
            text_effect: "描述：",

            text_no_title: "暂无称号",
            text_no_effect: "暂无效果",

            error_name: "名字长度不符合",
            same_name: "名字相同",

            name: [
                "普通头像",
                "皮肤头像",
                "高级头像",
            ],
            name_info: [
                "",
                "",
                "以下头像将在获得猎人后解锁",
            ],
            name_league: [
                "普通公会头像",
                "高级公会头像",
            ],
            name_league_info: [
                "",
                "",
            ],
            name_frame: [
                "普通边框",
                "星耀边框",
                "高级边框",
            ],
            name_frame_info: [
                "",
                "",
                "",
            ],
            name_none: [
                "未拥主角猎人",
                "未拥有任何高级猎人",
                "未拥有3星猎人",
            ],
            name_none_league: [
                "未拥主角猎人",
                "未拥有3星猎人",
            ],
            name_none_get: "未获得该猎人",
            buy_power: "<text>是否花费</text><color>r:200,g:38,b:0</color><text>%d</text><text>钻石，购买</text><color>r:200,g:38,b:0</color><text>%d</text><text>点体力？（今日剩余购买次数：%d/%d）</text>",
            // buy_power :
            //     [[
            //     <text>是否花费</text>
            //     <color>r:200,g:38,b:0</color><text>%d</text>
            //     <text>钻石，购买</text>
            //     <color>r:200,g:38,b:0</color><text>%d</text>
            //     <text>点体力？（今日剩余购买次数：%d/%d）</text>
            //     ]],

            energy1: "今日购买体力剩余次数",
            energy2: "下点体力恢复时间",
            energy3: "恢复全部体力时间",
            energy4: "恢复体力时间间隔",
            energy5: "5分钟",
            energy6: "当前时间",
            daytime: "今日剩余次数：%d/%d ",
            name_prop: "使用一张%s，修改君主名字",
            name_token: "使用%d个钻石，修改君主名字",
            name_power: "快速补给",
            daytime_power1: "<text>今日剩余次数：</text><color>r:255,g:0,b:0</color><text>%d</text><text>/%d</text> ",
            daytime_power2: "<text>今日剩余次数：</text><color>r:25,g:227,b:68</color><text>%d</text><text>/%d</text> ",
            key_tips: "请输入激活码（20位）",
            notime: "购买次数不足",
            key_tips_error: "您输入的激活码有误或已使用",

            text_qq_team: "%s官方交流群：%s",
            text_qq_team2: "《%s》运营团队祝您游戏愉快！",
            text_pic_str: "此处选择的头像会改变您在贪婪之岛的形象",

            frameTime: "<color>r=0,g=187,b=68</color><text>永久</text>",
        },

        //经验副本
        TextsConfig_Bastille: {
            name: {
                [3]: "伏牛金窟",
                [4]: "伏牛宝穴",
            },
            stage: "关卡：",
            open: "今日剩余次数：%d/%d",
            close: "今日未开启",
            level: "%d级开启",

            drop: {
                name1: "连击加成",
                name2: "伤害加成",
                award1: "",
                award2: "",
                info1: "尽量在伏牛宝穴中获得更高的最大连击数，连击数越高，结算时附加的经验丹奖励加成越高",
                info2: "尽量在伏牛金窟中对敌人造成更大的伤害，总伤害量越大，结算时附加的金币奖励加成越高",
            },

            battle: "推荐战力",
            btl_money: "金币",
            btl_exp: "EXP",
            btl_max_combo: "最高连斩:",
            btl_total_damage: "累计伤害:",

            left_time: "%s后可再次挑战",
        },

        //酒馆
        TextsConfig_Tavern: {
            count: "今日剩余寻访次数：%d/%d",
            tips: "您当前的钻石不足，是否前往充值？",
            tips_2: "再充值%d钻石升至VIP1，即可进行寻访十次，必获得猎人！是否前往充值？",
            tips_3: "再充值%d钻石升至VIP1，即可增加寻访次数。是否前往充值？",
            tips_4: "您当前的剩余次数不足",
            free: "免费",
            time: "%s后免费",
            cost_tips: "是否确认花费%s钻石进行十连访？",
        },

        //排行
        TextsConfig_Rank: {

            level: "第%d名",
            floor_next: "第%s名",
            floor: "第%d层",
            defend: "防守战力：",
            ally: "帮派：",
            title: "称号：",
            ally_no: "无",
            noRank: "未进入排名",
            noleague: "未加入公会",

            pop_league: "公会：%s",
            pop_league_level: "公会等级：%d",
            pop_league_own: "帮主：%s",
            pop_league_part: "成员：%d/%d",
            pop_title: "称号：%s",
            pop_title_effects: "无",

            pop_power_three: "最高三人战力：%s",
            pop_power_six: "最高六人战力：%s",
            pop_power_all: "全队战力：%s",
            tower: "最高层数：%s",

            rank_type: {
                [1]: "全队战力：",
                [2]: "最高三人战力：",
                [3]: "最高六人战力：",
                [4]: "最多钻石：",
                [5]: "最多充值额度：",
                [6]: "最多金币：",
                [7]: "最多断章：",
                [8]: "最多银钥匙：",
                [9]: "最多金钥匙：",
                [10]: "最高天梯积分：",
                [11]: "最多体力：",
                [12]: "最多晶魂：",
                [13]: "最多真气：",
                [14]: "防守战力：",
                [15]: "公会等级：",
                [16]: "最高层数：",
                [17]: "最高连斩数：",
                [18]: "最大累计伤害：",
                [19]: "世界boss最高：",
                [20]: "公会boss最高：",
                [21]: "抽奖积分：",
                [22]: "群英争霸积分：",
                [23]: "队伍等级：",
            },
        },

        //背包
        TextsConfig_Package: {

            number: "数量：",
            has: "拥有：%d",

            sell_rand: "随机物品 x %d",
            sell_error: "错误物品信息",
            use_cimelia: "一次最多使用100个",

            // cimelia : {
            //     [1] : "礼盒",
            //     [2] : "宝箱",
            //     [3] : "卡包",
            // }
        },

        TextsConfig_Lack: {
            crystal: "晶魄数量不足，是否前往矿洞获取晶魄？",
        },

        //点金
        TextsConfig_Money: {

            vip: "VIP",
            crit: "x%d-x%d",
            today: "今日招财剩余次数：",
            more: "连招%d次",
            lucky: "下次必暴击",

            money: "是否前往摇钱树进行招财？",
            close: "幸运值已满，下次招财必产生暴击（获得多倍收益），是否执意离开？",
            moneys: "金币不足，是否用钻石购买金币？",
            demstone: "钻石不足，是否前往充值？",
        },

        //礼盒
        TextsConfig_Pakage: {
            use: `
                <text>正在使用【</text><color>r:255,g:255,b:0</color>
                <text> %s </text>
                <color>r:255,g:255,b:255</color><text>】（当前拥有</text>
                <text> %s </text>
                <text> 个） </text>
            `,
            stillUse: `
                 <text>您已经拥有【</text>
                 <text>%s</text>
                 <text>】,是否依然兑换此道具</text>
        `,
            selects: `
                 <text>您当前选用的是【</text><color>r:35,g:55,b:45</color>
                 <text>%s</text>
                 <text>】x</text>
                 <text>%s</text>
        `
        },
        //活动
        TextsConfig_Activity: {
            collectClientTitle: "收集道具换豪礼",
            bigGift: "礼包",
            yuan: "%s元",
            zuan: "%s钻",
            beerGiftLast: "<text>礼包剩余购买数量:</text><color>r:%s,g:%s,b:%s</color><text>%s</text><text>/%s</text>",
            getAward: "<color>r:0,g:255,b:0</color><text>%s级</text>",
            signName: "签到",
            day: "第%d天",
            month_price1: "初级月卡:%s%s元",
            month_price2: "高级月卡:%s%s元",
            cannotBuyReason: "您未达到购买此礼包条件",
            timeOpenAndClose: "%s 至 %s",
            has_topup: "已消耗：%s",
            chargeToday: "%s/%s钻石",
            get: "%s/%s",
            giftAndNum: "%s×%s",
            greenstr: "<color>r:0,g:97,b:0</color><text>%s</text>",
            redstr: "<color>r:105,g:0,b:0</color><text>%s</text>",
            greenstr_light: "<color>r=60,g=255,b=0</color><text>%s</text>",
            redstr_light: "<color>r=255,g=38,b=0</color><text>%s</text>",
            consumeInfo:
            `
                <text>累计%s</text><color>r:27,g:252,b:255</color>
                <text> %s </text>
                <color>r:255,g:255,b:255</color><text>%s可领</text>
            `,
            consume: "消耗",
            mine: "挖矿",
            tavern: "寻访",
            village: "攻打伏牛寨",
            consumeMoney: "钻石",
            consumePower: "体力",
            consumeCoin: "金币",
            consumeTimes: "次",
            uplevelTitle: "%s等奖获奖名单",
            uplevelTitleNum: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
            uplevelLevel: "%s等奖",
            uplevelRank: "第%s名",
            giftName: "超值大礼包",
            discount: "%.1f折",

            pre_pirce: "原价：",

            doubleTokenName: "钻石商城双倍狂欢",
            giftBagName: "绝版新手礼包",
            openforever: "永久有效",

            novice_now: "目前:",
            novice_fight: "达到战力",
            novice_left: "还差:",
            novice_over: "排名:",
            novice_rate: "进度:",

            novice_rate_1: "<color>r:212,g:224,b:238</color><text>进度: </text><color>r:0,g:255,b:0</color><text>%d</text><color>r:212,g:224,b:238</color><text>/%d</text>",
            novice_rate_2: "<color>r:212,g:224,b:238</color><text>进度: %d/%d</text>",

            novice_rate_3: "<color>r:212,g:224,b:238</color><text>进度: </text><color>r:0,g:255,b:0</color><text>%d</text><color>r:212,g:224,b:238</color><text>/1</text>",
            novice_rate_4: "<color>r:212,g:224,b:238</color><text>进度: %d/1</text>",

            novice_rate_5: "<color>r:212,g:224,b:238</color><text>进度: </text><color>r:0,g:255,b:0</color><text>%d_%d</text><color>r:212,g:224,b:238</color><text>/%d_%d </text>",
            novice_rate_6: "<color>r:212,g:224,b:238</color><text>进度: %d_%d/%d_%d</text>",


            novice_rate_7: "<color>r:212,g:224,b:238</color><text>进度: </text><color>r:255,g:0,b:0</color><text>%d</text><color>r:212,g:224,b:238</color><text>/%d</text>",
            novice_rate_8: "<color>r:212,g:224,b:238</color><text>进度: </text><color>r:255,g:0,b:0</color><text>%d</text><color>r:212,g:224,b:238</color><text>/1</text>",
            novice_rate_9: "<color>r:212,g:224,b:238</color><text>进度: </text><color>r:255,g:0,b:0</color><text>%d_%d</text><color>r:212,g:224,b:238</color><text>/%d_%d </text>",

            newNovice: "%s<text>(</text><color>r=25,g=227,b=68</color><text>%s</text><text>/%s)</text>",
            newNovices: "%s<text>(</text><color>r=25,g=227,b=68</color><text>%s-%s</text><text>/%s-%s)</text>",

            novice_open: "队伍%d级",
            novice_inst: "%d-%d通关",
            novice_talk: {
                [1]: "完成全部任务，即可领取神兵泰阿哦~",
                [2]: "战力是衡量队伍实力强弱的最佳准则！",
                [3]: "提升猎人品阶可以使其更加强大~",
                [4]: "装备锻造可大幅提升猎人战斗力哦~",
                [5]: "精英副本是每天的必刷项目，奖励超值！",
                [6]: "本服格斗排名越高，奖励越多，也更拉风！",
                [7]: "天空竞技场奖励丰厚，同时也是实力的象征！",
            },

            general: "<text>拥有</text><color>r:255,g:255,b:0</color><text>%s</text><text>即可领取</text>",
            charge: "再充值 %d 元可领取",
            reward: "点击即可领取",
            rewarded: "该档位奖励已领取",
            cannotreward: "不满足领取条件",
            upLevelText: "率先达到%s级的前%s名玩家将享有一等奖大礼包，奖励会在达成等级要求时，以邮件附件形式自动送出，注意查收哦。",
            page_error: "已获取",

            wishing_tree_talk: {
                [1]: "正在帮树仙大人擦鞋……",
                [2]: "正在陪树仙夫人逛街……",
                [3]: "正在扶老奶奶过马路攒人品……",
                [4]: "正在进贡香油钱……",
                [5]: "正在给树叶刷绿漆……",
                [6]: "正在树仙家里擦地板……",
                [7]: "正在往其他许愿者碗里下巴豆……",
                [8]: "正在贿赂程序猿小哥……",
                [9]: "正在给客服老大捏脚……",
            },

            wishing_tree_time: "活动时间：%s至%s",
            wishing_tree_free: "免费（%s次）",
            wishing_tree_vip: "VIP%s 可选",
            wishing_tomorrow: "<color>r:255,g:255,b:0</color><text>明日登陆</text><color>r:255,g:255,b:255</color><text>，即可把它领回家~</text>",
            wishing_today: "<color>r:255,g:255,b:0</color><text>可以领奖啦~</text>",
            wishing_tree_wishtimes: "<color>r:0,g:255,b:0</color><text>许愿值+1</text>",

            wishing_tomorrow_all: "<color>r:255,g:255,b:0</color><text>明日登陆</text><color>r:255,g:255,b:255</color><text>，即可把它们</text><color>r:255,g:255,b:0</color><text>全部</text><color>r:255,g:255,b:255</color><text>领回家哦~</text>",
            wishing_tomorrow_fresh_all: "刷新出想要的奖励，明天登陆即可全部领回家哦~",

            mission_times: "(%s/%s)",
            mission_login: "每天登录1次(1/1)",
            mission_type_text: {
                [1]: "每天登录%s次",
                [2]: "完成冒险副本%s次",
                [3]: "完成挑战副本%s次",
                [4]: "格斗场中比试%s次",
                [5]: "在贪婪之岛中采集果子%s次",
                [6]: "在贪婪之岛中钓鱼%s次",
                [7]: "洗练神兵%s次",
                [8]: "酒馆畅饮%s次",
                [9]: "开启精致宝箱%s次",
                [10]: "累计消费%s钻石",
                [11]: "累计充值%s钻石",
                [12]: "累计消费%s金币",
                [13]: "念兽升级%s次",
                [14]: "世界频道聊天%s次",
                [15]: "攻打伏牛寨%s次",
                [16]: "挑战天空竞技场%s次",
                [17]: "在摇钱树中招财%s次",
                [18]: "挑战公会副本%s次",
                [19]: "磨洗玉石%s次",
                [20]: "合成玉石%s次",
                [21]: "切割玉石%s次",
                [22]: "购买体力%s次",
                [23]: "在贪婪之岛中猜拳%s次",
                [24]: "在贪婪之岛中钻石重新猜拳%s次",
                [25]: "探索副本成功%s次",
                [26]: "在贪婪之岛中战斗%s次",
                [27]: "卡片升级%s次",
                [28]: "开卡包%s次",
                [29]: "猎人进阶%s次",
                [30]: "卡片升星到3星%s次",
                [31]: "卡片升星到4星%s次",
                [32]: "卡片升星到5星%s次",
                [33]: "累计消费体力%s",
                [34]: "获取%s个3星卡片",
                [35]: "获取%s个4星卡片",
                [36]: "获取%s个5星卡片",
                [37]: "将1个猎人升到%s星",
                [38]: "将%s个猎人升到5星",
                [39]: "将%s个猎人升到6星",
                [40]: "切磋%s次",
                [41]: "参加组队战%s次",
                [42]: "将%s个猎人升到4星",
                [43]: "猎人升星%s次",
                [44]: "猎人觉醒%s次",
            },


            OpenVisit: {
                name: "开服畅饮赢A级猎人",
                info: "活动期间内，在酒馆中累计畅饮（苏打水除外）达到指定次数即可领取超值奖励，还有A级猎人等着你哦~",
            },

            Rank_Charge: {  // 充值排行榜
                last_time: " %s      %s        %s",
                rule: "1.活动期间内，只要充值或累计充值达到%s钻石的玩家，即可参与冲榜达人的活动。\n2.玩家在参与冲榜达人的同时，只要累积充值达到一定额度即可在活动面板领取充值礼包。\n3.每种充值礼包只能领取一次，并且在活动结束后将不能领取，所以请记得及时领取哦。\n4.冲榜达人奖励将会在活动结束后一小时内通过邮件发放，请注意查收。\n5.活动结束后，活动面板将保持一天，但未领取的奖励将不能领取。",
                costAll: "%s钻石",
                index: "第%s名",
                out: "未上榜",
                over: "活动已结束",
                nobody: "虚位以待",
                des: "<color>r:246,g:254,b:0</color><text>%s</text>",
            },

            BuyCard: "该奖励只有月卡用户可领取",
            levelReward: "不满足领奖条件",
            GetAward: "该奖励已领取",
            randomCoreAdd: "积分：+%s",
            baselevel: "<text>当前队伍等级： </text><color>r:25,g:227,b:68</color><text>%s</text> ",
            doubleDemDes: "活动期间内,钻石商城内的每件商品首次购买均可获得双倍钻石。\n(注：额外赠送的钻石不计入累冲活动)",

            kilometre: "%s公里",
            completeMission: "<text>(</text><color>r:%s,g:%s,b:%s</color><text>%s</text><text>/%s)</text>",
            moveMetres: "移动%s公里",
            completeKM: "完成%s公里",
            estimateKM: "预计%s公里",
            Jewel: {
                activityTime: "%d年%d月%d日4:00 ~ %d年%d月%d日4:00",
                activityContent: "活动时间内，达成收集条件获得宝石，兑换稀有道具",
                // 宝石商店兑换剩余次数
                g_lastTimes: "<text>剩余次数:</text><color>r:0,g:255,b:0</color><text>%s</text><text>/%s</text>",
                r_lastTimes: "<text>剩余次数:</text><color>r:255,g:0,b:0</color><text>%s</text><text>/%s</text>",
                g_todayLastTimes: "<text>今日剩余:</text><color>r:0,g:255,b:0</color><text>%s</text><text>/%s</text>",
                r_todayLastTimes: "<text>今日剩余:</text><color>r:255,g:0,b:0</color><text>%s</text><text>/%s</text>",
                con_jewel: "%s宝石",
                get_card: "每获取一张%s星卡片  可得",
                up_card: "每次将卡片升至%s星  可得",
                get_hunter: "每获取一名%s星猎人  可得",
                up_hunter: "每次将猎人升至%s星  可得",
                not_enough: "兑换次数不足",
                collection: "已收集: %d/%d",
                degree_complete: "完成度: %d/%d",
                jewel_limit: "提示:每日获得宝石上限%d。",
                jewel_Daily: "%d/%d",
                X: "X%d",
            },
            skipAni: "点击任何区域可跳过动画",
            closeUI: "点击任何区域可关闭界面",

            foodDonGet: "我还在准备料理，一会记得来吃哦~",
            foodCanGet: "来尝尝我亲手制作的料理吧，吃了可以补充体力哟~",
            buySuccess: "<color>r=25,g=227,b=68</color><text>激励成功</text>",
            g_lastTimes: "<text>剩余次数:</text><color>r=30,g=180,b=50</color><text>%s</text><text>/%s</text>",
            r_lastTimes: "<text>剩余次数:</text><color>r=255,g=0,b=0</color><text>%s</text><text>/%s</text>",

            battleStar1: "通关副本",
            battleStar2: "上阵1名%s猎人",
            battleStar3: "上阵猎人%s",
            battleStarX: "完成故事",

            battleStarDes: "获得%s颗星星可获得",
            battleLeftDes: "剩余",
            buyBattleNumSuccessTip: "购买成功",
            battleNumTip: "<text>是否花费</text><color>r=200,g=38,b=0</color><text>%d钻石</text><text>购买</text><color>r=200,g=38,b=0</color><text>%d次</text><text>挑战次数？（今日剩余购买次数：</text><color>r=200,g=38,b=0</color><text>%d/%d</text><text>）</text>",

            battleNotStart: "活动未开启",
            battleStop: "活动已结束",
            mastWinNor: "必须先通关普通副本",

            shareNumStr: {
                [0]: "成功创建角色的好友数：%d",
                [1]: "拥有首个六星猎人的好友数：%d",
                [2]: "完成首充奖励的好友数：%d",
            },
            ShareSuccess: "分享成功！",
            ShareFail: "分享失败！",
        },

        // 竞技场
        TextsConfig_Arena: {
            rankTip: "第%d名",
            clearCoolingTip: "<text>您确定要花费</text><color>r:200,g:38,b:0</color><text>%d钻石</text><text>清除冷却CD么?</text>",
            buyNumTip: "<text>是否花费</text><color>r:200,g:38,b:0</color><text>%d钻石</text><text>购买</text><color>r:200,g:38,b:0</color><text>%d次</text><text>比试次数？（今日剩余购买次数：</text><color>r:200,g:38,b:0</color><text>%d/%d</text><text>）</text>",
            rankRewardTip: "<text>您的当前排名为</text><color>r:200,g:38,b:0</color><text>%d</text><text>，处于排名区间</text><color>r:200,g:38,b:0</color><text>%d</text><text>至</text><color>r:200,g:38,b:0</color><text>%d</text><text>之间，继续保持该区间排名，可在20：00领取奖励</text>",
            rankZeroTip: "您当前排名靠后，继续努力吧！",

            ladderChallengeNumEmptyError: "您当日的次数已用光，请购买次数",
            ladderChallengeNumEmptyToVip: "您今日的比试次数已至上限，提升VIP等级可购买更多比试次数，是否前往充值以提升VIP等级?",
            ladderChallengeNumEmpty: "比试购买次数已达上限",
            formationSuc: "已保存阵容",

            coolingTip: "比试冷却",
            clearCoolingSuccessTip: "清除冷却成功",
            buyChallengeNumSuccessTip: "购买成功",

            chooseDes1: "排名：%s",
            chooseDes2: "Lv%s %s",
            chooseDes3: "战力：%s",

            settlePromote: "%d名",
            settleReward: "×%d",
            nameAndLevel: "Lv %s %s",
            ladderLeft: "剩余比试次数：%s/%s",

            myRank: "我的当前排名 ：%s",

            final: "每晚 20:00 结算奖励"
        },

        // 通用战斗
        TextsConfig_Fight: {
            errorTip: "<color>r:255,g:0,b:0</color><text>Error: %s</text>",
            formatError: {
                [1]: "阵型为空,请至少选择一名猎人上阵",
                [2]: "主队阵容不能为空",
                [3]: "阵型里有非法猎人",
                [4]: "主队满3人才可上后卫",
                [5]: "本次进攻过的角色，无法在本次公会战中继续战斗",
            },
            mainErrorTip: "当前猎人处于上阵中",
            supportErrorTip: "当前猎人属于其他猎人的援护",
            sameGeneral: "同名猎人不可重复上阵",
            sameGeneral2: "同名猎人不可在同一队伍中上阵",
        },

        // 结算
        TextsConfig_BattleSettle: {
            nobody: "无猎人上阵",
        },

        // 爬塔
        TextConfig_Tower: {
            mainDes1: "正在扫荡第%s层...",
            mainDes2: "剩余等待时间 %s",
            challengeDes1: "敌人总数：%s个",
            challengeDes2: "普通敌人：%s个",
            challengeDes3: "精英敌人：%s个",
            challengeDes4: "BOSS：%s个",
            challengeDes5: "推荐战力：\n%s",
            challengeDes6: "挑战次数：%s/%s",
            chooseDes1: "当前：第 %s 层",
            chooseDes2: "敌人总数：%s个",
            chooseDes3: "推荐战力：%s",
            sureQuit: "是否结束本次挑战？",
            rewardDes: "从第%s层扫荡到%s层，共扫荡了%s层，获得的所有奖励如下：",
            rewardGet: "奖励领取成功！",
            mallBuy: "<color>r:60,g:255,b:0</color><text>购买成功！</text>",
            maxErr: "您的最高战绩为0层，不可扫荡！",
            loseMall: "<text>嫌输的太惨？我这儿倒是有点好货没准能帮上你。喏，</text><color>r:28,g:135,b:24</color><text>%s</text><text>，只要</text><color>r:28,g:135,b:24</color><text>%s</text><text>。买不买随你，我还要继续赶路。年轻人，要想清楚哦~</text>",
            floor: "第%s层",
            floorErr: "该层尚未开启，请继续努力",
            rewardErr: "上一层的奖励未领取，请点击宝箱领取",
            resetErr: "重置后将回到第1层，是否放弃当前挑战？",
            errClear: "您已通关天空竞技场，无法攻打下一层",
            errAutoBoss: "Boss关请手动挑战",
            errAutoExit: "关闭该界面将结束自动挑战，是否结束？",
            errAutoING: "是否结束自动挑战并结算奖励？",
            errAutoVIP: "VIP%s级可开启自动爬塔，\n是否前往充值提升VIP？",
            maxFloor: "历史最高层数: %s",
            towerMax: "最高层数: %s",
            passOpenHigh: "通关普通难度%s层后开启高阶难度",
            towerCur: "当前层数: %s",
            jumpVipLimit: "VIP%s级可开启直达功能，\n是否前往充值提升VIP？",
        },

        // 好友
        TextConfig_Relation: {
            levelDes: "Lv %s",
            vipDes: "VIP %s",
            mainDes1: [
                "好友数量：%s/%s",
                "仇人数量：%s/%s",
            ],
            mainDes2: "今日已领体力：%s/%s",
            addDes1: "好友数量：%s/%s",
            addDes2: "申请中：%s/%s",
            applicationDes1: "申请数量：%s",
            applicationDes2: "好友数量：%s/%s",
            leagueDes: "公会：%s",
            leagueNone: "公会：无",
            title: "称号：%s"
        },

        TextConfig_Format: {
            lockLv: "%s级解锁",
            lockMob: "通关副本%s解锁",
            errFormatPosLv: "%s级开启新的%s位置",
            errFormatPosMob: "通关副本%s开启新的%s位置",
        },

        TextConfig_Instance: {
            vipWipe: "Vip 1级开起扫荡功能",
            wipeTitle: "第%s场掉落",
            wipeExp: "经验补偿",
            stageName: "%s-%s %s",
            powerGeneral: "主队战力：%s",
            powerTotal: "总战力：%s",
            errPower: "<text>当前剩余体力不足，\n是否花费</text><color>r:200,g:38,b:0</color><text>%d钻石</text><text>，购买</text><color>r:200,g:38,b:0</color><text>%d点体力</text><text>。\n（今日剩余购买次数：%d/%d）</text>",
            errCount: "<text>剩余挑战次数不足，\n是否花费</text><color>r:200,g:38,b:0</color><text>%d钻石</text><text>重置挑战次数？\n（今日剩余重置次数:%d/%d）</text>",
            limitNormal: "%s级可开启新章节",
            limitElite: "通关副本%s后开启",
            choosePower: "推荐战力：%s",
            sweepFocus: "已获得 %s %s/%s",
            errLeftPos: "您还有未上阵猎人的空位，是否坚持进入副本？",
            errWipe: "三星通关才可以使用扫荡功能",
            errBuyPower: "<text>今日已买体力</text><color>r:200,g:38,b:0</color><text>%d/%d</text><text>次，\n提升VIP等级可增加次数，\n是否前往充值提升VIP？</text>",
            replenishPhysicalPower: "<text>今日已买体力</text><color>r:200,g:38,b:0</color><text>%d/%d</text><text>次",
            errBuyMobs: "<color>r:200,g:38,b:0</color><text>购买副本次数</text><text>已达最大，</text><text>\n是否前往充值提升VIP？</text>",
            errWipeTen: "<text>队伍达到</text><color>r:200,g:38,b:0</color><text>45级</text><text>或</text><color>r:200,g:38,b:0</color><text>VIP4级</text><text>\n可使用副本连续扫荡功能，</text><text>\n是否前往充值提升VIP等级？</text>",
            errClear: "您已通关该副本，无法攻打下一关",
            warnWipe: "<text>是否花费</text><color>r:200,g:38,b:0</color><text>%d钻石</text><text>，扫荡</text><color>r:200,g:38,b:0</color><text>%d次</text><text>？\n（三星通关扫荡免费）</text>",
            condition: "条件一：%s星%s级",
            condition2: "条件一：%s星猎人",
            condition3: "条件一：%s级猎人",
            condition_next: "条件二：%s",
            nothing: "条件一：无",
            nothing_next: "条件二：无",
            instance_drop: "%s地区掉落",
            errorCountWanted: "剩余挑战次数不足",
            passAndOpen: "<color>r:255,g:38,b:0</color><text>通关本章节后解锁下一章</text>",
            vip3BuyGift: "VIP3可购买",
            instanceLockNormal: "通关上一关卡",
            instanceLockElite: "通关挑战",
            instanceLockLevel: "角色达到%d级",
            SweepNoOpen: "<color>r:255,g:38,b:0</color><text>普通副本 %s 未开启</text>",
        },

        //点赞
        TextConfig_Praise: {
            praiseMyOver: "您的点赞次数已经用完",
            praiseOver: "对方的点赞次数已满",
            praiseDidGet: "您对应的点赞奖励已经领取",
            praiseCountGet: "您的被点赞次数不足",
            praiseCountGive: "您的点赞次数不足",
        },
        // 公会
        TextConfig_League: {
            noRank: "未上榜",
            createNameNone: "请输入公会名，不超过6个字",
            freeName: "本次免费",
            joinDefault: "一起来愉快地玩耍吧！",
            joinDes: "申请中：%s/%s",
            idDes: "ID：%s",
            enlivenDes: "%s",
            vipDes: "VIP %s",
            levelDes: "Lv%s",
            memberDes: "成员：%s/%s",
            memberDesRank: "%s/%s",
            lineDes: "在线: %s/%s 人",
            nameLv: "%s",
            homeLevel: "%s级",
            nameDes: "公会名：%s",
            nameNone: "名字不能为空",
            nameOver: "名字超过10个字",
            noticeDes: "公告：%s",
            noticeNone: "公告不能为空",
            introduceDes: "宣传语：%s",
            introduceNone: "宣传语不能为空",
            limitDes: "限制%s级以上",
            limitNone: "无等级限制",
            sevenDonate: "贡献：%s",
            applyCnt: "申请数量：%s",
            memberCnt: "当前成员数量：%s/%s",
            limitLevel: "限制等级：%s",
            limitLevelNone: "无等级限制",
            limitCondition: [
                "无等级限制",
                "需通过批准",
                "不允许加入",
            ],
            setSuccess: "修改成功，已保存",
            setNone: "当前没有任何修改！",
            nameSuccess: "名字修改成功，已保存",
            inputName: "公会名",
            inputNotice: "公会公告",
            inputIntroduce: "公会宣传语",
            donateLevel: "当前公会等级：%s",
            donateCost: "%s，可获得",
            donateExp: "EXP+%s",
            donateProgress: "%s/%s",
            donateLast: "剩余次数：%s/%s",
            skillName: "%s lv%s",
            skillDes: "效果：%s",
            skillCost: "升级消耗：%s点",
            skillReset: "本周剩余次数：%s",
            skillUp: "剩余技能点：%s",
            skillUse: "今日剩余使用次数：%s",
            skillChange: "今日剩余修改次数：%s",
            skillChangeTexts: "每名猎人可以通过进阶获得%s个技能点",
            stepChangeTexts: "每名猎人可以使用%s次技能卷轴,每次获得1个技能点",
            transferFirst: "请先禅让会长，再退出公会",
            transfer: "是否确定将会长禅让给%s？",
            dismiss: "是否确定解散公会？",
            exit1: "是否确定退出公会？\n首次退出后您可以立即创建或加入其他公会。",
            exit2: "是否确定退出公会？\n本次退出12小时后您可以创建或加入其他公会。",
            kick: "是否确定踢出%s？",
            applySend: "公会申请已送出，请耐心等候",
            noAuthManage: "您没有权限管理公会。",
            noAuthName: "您没有权限修改公会名称。",
            noAuthHead: "您没有权限修改公会头像。",
            max_level: "已满级",
            already_donate_tip: "（今日捐献次数已用完）",
            max_level_tip: "（公会已满级）",
            elder_already: "对方已经是副会长！",
            elder_notyet: "对方不是副会长！",
            err_kick_leader: "副会长不可踢出会长！",
            err_kick_elder: "副会长不可踢出副会长！",
            name_nomal: "公会通用头像",
            name_general: "会长特殊头像",

            quick_success: "恭喜您成功加入了【%s】",
            join_league_next: "您可在%s后加入公会",
            build_league_next: "您可在%s后创建公会",

            award_level: "帮战第%s名宝箱",
            award_get: "<text>您的公会在上期公会战中排行</text><color>r:67,g:246,b:219</color><text>第%s名</text><text>,本期帮战结束前</text><color>r:200,g:38,b:0</color><text>每天可领取</text><text>一个帮战宝箱.</text>",
            already_get: "奖励已过期！",

            officalName: {
                [1]: "成员",
                [2]: "副会长",
                [3]: "会长",
            },

            animal_Exp: "%s/%s",
            animal_Sundries_Count: "今日已使用杂物投喂%s/%s点",
            animal_Feed_Count: "今日已使用饲料投喂%s/%s次",
            animal_level: {
                [1]: "幼年状态",
                [2]: "成年状态",
                [3]: "巨兽状态",
                [4]: "巨兽状态",
            },
            animal_LowLevel: "公会BOSS成长值不够",
            animal_buff: "激励%s:",
            animal_GrowAdd: "成长值+%s",
            animal_resolve: "没有选择要喂养的物品",
            animal_fightCount: "剩余攻击次数 %s/%s",
            animal_costTips: "<text>是否确认花费</text><color>r:200,g:38,b:0</color><text>%s</text><color>r:66,g:27,b:4</color><text>钻石喂养帮派BOSS？</text>",
            animal_feed: "<text>已选择</text><color>r:67,g:246,b:219</color><text>%s</text><color>r:65,g:33,b:3</color><text>件杂物，共可以转化</text><color>r:67,g:246,b:219</color><text>%s/%s</text><color>r:65,g:33,b:3</color><text>点成长值</text>",
            animal_feed_red: "<text>已选择</text><color>r:67,g:246,b:219</color><text>%s</text><color>r:65,g:33,b:3</color><text>件杂物，共可以转化</text><color>r:250,g:2,b:2</color><text>%s/%s</text><color>r:65,g:33,b:3</color><text>点成长值</text>",
            animal_maxFight: "攻击次数已用完",
            animal_goCele: "您未参与此次公会BOSS，需要花费%s公会币购买门票方可进入庆功宴，是否购买？",
            animal_noName: "无名英雄",
            animal_celeNoAdd: "<text>加菜后所有人可额外领取</text><color>r:36,g:215,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>体力</text>",
            animal_celeAdd: "<text>土豪</text><color>r:255,g:255,b:40</color><text>%s</text><color>r:255,g:255,b:255</color><text>为大家加了一道菜</text>",
            animal_celeAddSuccess: "加菜成功！快请小伙伴来吃吧",
            animal_killName: "<text>恭喜！公会成员</text><color>r:255,g:255,b:40</color><text>%s</text><color>r:255,g:255,b:255</color><text>发出致命一击，成功击杀Boss</text>",
            animal_fightTip: "是否确认开启公会BOSS？",

            animal_feedVip: "达到VIP%d级可开启饲料投喂，是否前往充值提升VIP等级？",
            animal_AddFoodVip: "达到VIP%d级可加餐，是否前往充值提升VIP等级？",
            animal_growNumAni: "+成长值:%s",

            animal_feed_overflow: "您选择的杂物已超过今日可投喂点数上限，多余的点数将会损失，是否继续？",

            fish_costTime: "耗时%s",
            fish_costTime_min: "分钟",
            fish_costTime_sec: "秒",
            fish_costTimeAll: "<text>本次垂钓共耗时</text><color>r:0,g:252,b:255</color><text>%s</text>",
            fish_curTime: "<text>垂钓中...剩余时间：</text><color>r:0,g:252,b:255</color><text>%s</text>",
            fish_canPull: "<color>r:244,g:216,b:12</color><text>可以收竿啦！</text>",
            fish_freeFreash: "免费（剩%s次）",
            fish_giftAndNum: "%s×%s",
            fish_giftAndNumDouble: "<text>%s×</text><color>r:255,g:255,b:0</color><text>%s</text>",
            fish_giftFish: "%s可开出奖励如下：",

            fish_vip_times: "提升VIP等级可增加钓鱼次数，是否前往充值提升VIP等级？",
            fish_vip_refresh: "达到VIP%d级可开启一键刷紫，是否前往充值提升VIP等级？",
            fish_vip_double: "达到VIP%d级可开启奖励翻倍，是否前往充值提升VIP等级？",

            fish_start: "开始钓鱼",
            fish_all_gold_tips: "你已找到三条沼泽之王，机遇难得，是否执意继续刷新？",

            instance_level: "<color>r:255,g:255,b:0</color><text>%d级以上</text><color>r:255,g:255,b:255</color><text>可以挑战</text>",
            instance_member_num: "<color>r:255,g:255,b:255</color><text>推荐人数:</text><color>r:255,g:255,b:0</color><text>%s</text>",
            instance_power_num: "<color>r:255,g:255,b:255</color><text>推荐战力:</text><color>r:255,g:255,b:0</color><text>%s</text>",

            instance_unlock_level: "<color>r:255,g:255,b:255</color><text>解锁条件：\n</text><color>r:255,g:0,b:0</color><text>通关%s</text>",
            instance_type: {
                [0]: "普通",
                [1]: "精英",
            },


            instance_addtimes_notleader: "只有会长或副会长可以购买挑战次数",
            instance_addtimes_notimes: "今日剩余购买次数为0",
            instance_addtimes_no_enliven: "活跃度不足",
            instance_addtimes_success: "购买挑战次数成功",
            instance_open_tips: "是否花费%s活跃度开启公会副本：%s？",
            instance_open_member: "只有会长和副会长可开启副本",
            instance_open_alreadyopen: "当前有挑战中的副本",
            instance_enter_lowlevel: "您当前的队伍等级未达到挑战要求",


            instance_addtimes_tips: "是否花费%s钻石，购买1次挑战机会？（今日剩余购买次数：%s/%s）",
            instance_times_left: "挑战次数：%s/%s",

            instance_boss_unlock: "先击杀六名精英后，才可以挑战BOSS！",

            instance_rank_name: "Lv%s %s",
            instance_rank_power: "队伍战力：%s",

            instance_cannot_get: "今日已在其他公会领取过该位置奖励，不可重复领取",

            war: "公会战",
            war_enroll_success: "公会战报名成功",
            war_end_hp: "生命值",
            war_end_honor: "荣誉值",
            war_end_kill: "杀敌数",

            war_state: {
                [1]: "非报名状态",
                [2]: "报名状态",
                [3]: "匹配状态",
                [4]: "准备阶段",
                [5]: "开打阶段",
                [6]: "结束",
            },

            war_enroll: {
                [1]: "已报名",
                [2]: "未报名",
            },

            war_num_and_name: "%s:%s人",

            war_honor_sum: "<color>r:28,g:155,b:246</color><text> %s </text><color>r:255,g:255,b:255</color><text>:</text> <color>r:246,g:58,b:0</color><text> %s</text>",

            war_buff_speed: "移动速度提升%s%%，效果持续%s秒",
            war_buff_blood: "所有上阵猎人血量恢复至100%",
            war_buff_hurt1: "所有上阵猎人全属性提升5%",
            war_buff_hurt2: "所有上阵猎人全属性提升10%",

            war_enroll_tips: "<text>是否花费</text><color>r:246,g:58,b:0</color><text>%s</text><color>r:65,g:26,b:3</color><text>活跃度报名公会战</text>",

            home_pop_notice: "公告:%s",
            home_pop_notice2: "【  公告  】 %s",
            home_pop_active: "公会当前活跃度：%s",
            home_pop_mine_active: "您今日贡献的活跃度：%s/%s",
            home_pop_today: "公会今日获得活跃度：%s/%s",
            war_cost: "%s 活跃度",

            prepare_move_error: "准备阶段，不能到该区域",

            war_fast_format_lock: "%s级解锁",
            war_fast_format_hp: "血量:%s/%s",
            war_fast_result_power: "战斗力：%s",

            war_fast_tips: "<text>能力最高的前</text><color>r:105,g:0,b:0</color><text>%s</text><text>名猎人可出战,长按猎人头像可调整出战顺序</text>",
            war_fast_tips2: "拖动猎人头像可与其他猎人头像互换位置",
            war_fast_hurt: "伤害:%s",

            war_get_tips: "<color>r:255,g:255,b:255</color><text>获得：</text><color>r:254,g:34,b:236</color><text>荣誉值</text> <color>r:255,g:255,b:0</color><text>× %s</text>",
            war_error_tips: "公会战已结束，即将退出场景",
            war_error_add_tips: "%s，即将退出场景",

            war_commingsoon: "公会战将在周日开启报名，届时请踊跃报名。",
            war_commingsoon_next_week: "公会战将在下一个周日开启报名，届时请踊跃报名。",


            // 新公会战相关
            war_rank_common: "<color>r:255,g:246,b:143</color><text>第%s名</text>",
            war_match_winer: "<color>r:0,g:255,b:0</color><text>初赛胜者</text>",
            war_match_loser: "<color>r:255,g:0,b:0</color><text>初赛败者</text>",

            war_title_info: {
                [1]: "<color>r:255,g:255,b:0</color><text>报名参赛</text>",
                [2]: "<color>r:255,g:255,b:0</color><text>报名结果</text>",
                [3]: "<color>r:255,g:255,b:0</color><text>第一轮：周三20点55分</text>",
                [4]: "<color>r:255,g:255,b:0</color><text>第一轮：</text><color>r:0,g:255,b:0</color><text>准备阶段</text>",
                [5]: "<color>r:255,g:255,b:0</color><text>第一轮：</text><color>r:0,g:255,b:0</color><text>比赛阶段</text>",
                [6]: "<color>r:255,g:255,b:0</color><text>第二轮：周四20点55分</text>",
                [7]: "<color>r:255,g:255,b:0</color><text>第二轮：</text><color>r:0,g:255,b:0</color><text>准备阶段</text>",
                [8]: "<color>r:255,g:255,b:0</color><text>第二轮：</text><color>r:255,g:0,b:0</color><text>比赛阶段</text>",
                [9]: "<color>r:255,g:255,b:0</color><text>最终结果</text>",
            },

            war_finish_title: {
                [1]: "<color>r:255,g:255,b:0</color><text>第一轮：</text><color>r:255,g:0,b:0</color><text>已结束</text>",
                [2]: "<color>r:255,g:255,b:0</color><text>第二轮：</text><color>r:255,g:0,b:0</color><text>已结束</text>",
            },

            war_finish_info: {
                [1]: "<color>r:255,g:255,b:255</color><text>本轮比赛已结束，请等待下轮匹配结果</text>",
                [2]: "<color>r:255,g:255,b:255</color><text>本轮比赛已结束，请耐心等待最终结果</text>",
            },

            war_time_info: {
                [1]: "<color>r:255,g:255,b:255</color><text>报名将在</text><color>r:255,g:0,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>后结束</text>",
                [2]: "<color>r:255,g:255,b:255</color><text>报名结果展示将在</text><color>r:255,g:0,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>后结束</text>",
                [3]: "<color>r:255,g:255,b:255</color><text>第一轮比赛将在</text><color>r:0,g:255,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>后开始</text>",
                [4]: "<color>r:255,g:255,b:255</color><text>比赛将在</text><color>r:0,g:255,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>后开始</text>",
                [5]: "<color>r:255,g:255,b:255</color><text>比赛将在</text><color>r:255,g:0,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>后结束</text>",
                [6]: "<color>r:255,g:255,b:255</color><text>第二轮比赛将在</text><color>r:0,g:255,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>后开始</text>",
                [7]: "<color>r:255,g:255,b:255</color><text>比赛将在</text><color>r:0,g:255,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>后开始</text>",
                [8]: "<color>r:255,g:255,b:255</color><text>比赛将在</text><color>r:255,g:0,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>后结束</text>",
                [9]: "<color>r:255,g:255,b:255</color><text>下期公会战报名将在</text><color>r:0,g:255,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>后开启</text>",
            },

            war_match_title_tip1: {
                [1]: "<color>r:255,g:255,b:0</color><text>第一轮：周三20点55分</text>",
                [2]: "<color>r:255,g:255,b:0</color><text>第一轮：</text><color>r:0,g:255,b:0</color><text>进行中</text>",
                [3]: "<color>r:255,g:255,b:0</color><text>第一轮：</text><color>r:255,g:0,b:0</color><text>已结束</text>",
            },

            war_match_title_tip2: {
                [1]: "<color>r:255,g:255,b:0</color><text>第二轮：周四20点55分</text>",
                [2]: "<color>r:255,g:255,b:0</color><text>第二轮：</text><color>r:0,g:255,b:0</color><text>进行中</text>",
                [3]: "<color>r:255,g:255,b:0</color><text>第二轮：</text><color>r:255,g:0,b:0</color><text>已结束</text>",
            },

            war_match_last_str: {
                [1]: "报名第一",
                [2]: "报名第二",
                [3]: "报名第三",
                [4]: "报名第四",
                [5]: "报名第五",
                [6]: "报名第六",
                [7]: "报名第七",
                [8]: "报名第八",
                [9]: "报名第九",
                [10]: "报名第十",
                [11]: "报名第十一",
                [12]: "报名第十二",
                [13]: "报名第十三",
                [14]: "报名第十四",
                [15]: "报名第十五",
                [16]: "报名第十六",
            },

            war_rank_str: {
                [1]: "<color>r:255,g:255,b:0</color><text>甲级第一</text>",
                [2]: "<color>r:255,g:255,b:0</color><text>甲级第二</text>",
                [3]: "<color>r:255,g:255,b:0</color><text>甲级第三</text>",
                [4]: "<color>r:255,g:255,b:0</color><text>甲级第四</text>",
                [5]: "<color>r:255,g:255,b:0</color><text>乙级第一</text>",
                [6]: "<color>r:255,g:255,b:0</color><text>乙级第二</text>",
                [7]: "<color>r:255,g:255,b:0</color><text>乙级第三</text>",
                [8]: "<color>r:255,g:255,b:0</color><text>乙级第四</text>",
                [9]: "<color>r:255,g:255,b:0</color><text>丙级第一</text>",
                [10]: "<color>r:255,g:255,b:0</color><text>丙级第二</text>",
                [11]: "<color>r:255,g:255,b:0</color><text>丙级第三</text>",
                [12]: "<color>r:255,g:255,b:0</color><text>丙级第四</text>",
                [13]: "<color>r:255,g:255,b:0</color><text>丁级第一</text>",
                [14]: "<color>r:255,g:255,b:0</color><text>丁级第二</text>",
                [15]: "<color>r:255,g:255,b:0</color><text>丁级第三</text>",
                [16]: "<color>r:255,g:255,b:0</color><text>丁级第四</text>",

            },

            war_history_rank_str: {
                [1]: "<color>r:255,g:255,b:0</color><text>冠军</text>",
                [2]: "<color>r:255,g:255,b:0</color><text>亚军</text>",
                [3]: "<color>r:255,g:255,b:0</color><text>季军</text>",
                [4]: "<color>r:255,g:255,b:0</color><text>甲级第四</text>",
                [5]: "<color>r:255,g:255,b:0</color><text>乙级第一</text>",
                [6]: "<color>r:255,g:255,b:0</color><text>乙级第二</text>",
                [7]: "<color>r:255,g:255,b:0</color><text>乙级第三</text>",
                [8]: "<color>r:255,g:255,b:0</color><text>乙级第四</text>",
                [9]: "<color>r:255,g:255,b:0</color><text>丙级第一</text>",
                [10]: "<color>r:255,g:255,b:0</color><text>丙级第二</text>",
                [11]: "<color>r:255,g:255,b:0</color><text>丙级第三</text>",
                [12]: "<color>r:255,g:255,b:0</color><text>丙级第四</text>",
                [13]: "<color>r:255,g:255,b:0</color><text>丁级第一</text>",
                [14]: "<color>r:255,g:255,b:0</color><text>丁级第二</text>",
                [15]: "<color>r:255,g:255,b:0</color><text>丁级第三</text>",
                [16]: "<color>r:255,g:255,b:0</color><text>丁级第四</text>",

            },

            war_enroll_des: "<color>r:255,g:255,b:255</color><text>报名排行</text><color>r:255,g:255,b:0</color><text>每10分钟</text><color>r:255,g:255,b:255</color><text>刷新一次，参赛资格以报名截止时的排行为准</text>",
            war_no_entitl: "<color>r:180,g:180,b:180</color><text>没有资格</text>",
            war_no_enroll: "<color>r:180,g:180,b:180</color><text>尚未报名</text>",
            war_donot_enroll: "<color>r:255,g:246,b:143</color><text>无需报名</text>",

            war_history_rank: "<color>r:255,g:255,b:255</color><text>历史最高排名：</text><color>r:255,g:255,b:0</color><text>%s</text>",
            war_history_totalNum: "<color>r:255,g:255,b:255</color><text>累计参加次数：</text><color>r:255,g:255,b:0</color><text>%s</text>",
            war_history_winNum: "<color>r:255,g:255,b:255</color><text>胜利：</text><color>r:255,g:255,b:0</color><text>%s</text>",
            war_history_failNum: "<color>r:255,g:255,b:255</color><text>失败：</text><color>r:255,g:255,b:0</color><text>%s</text>",
            war_history_winRate: "<color>r:255,g:255,b:255</color><text>胜率：</text><color>r:255,g:255,b:0</color><text>%d%%</text>",

            war_history_info_blood: "<color>r:255,g:255,b:0</color><text>%s/%s</text>",
            war_history_info_honor: "<color>r:255,g:255,b:255</color><text>荣誉：</text><color>r:255,g:255,b:0</color><text>%s</text>",
            war_history_info_kill: "<color>r:255,g:255,b:255</color><text>杀人：</text><color>r:255,g:255,b:0</color><text>%s</text>",
            war_history_info_best_killNum: "<color>r:255,g:255,b:0</color><text>（%s人）</text>",

            war_match_zone: [
                "<color>r:255,g:255,b:0</color><text>甲级联赛</text>",
                "<color>r:255,g:255,b:0</color><text>乙级联赛</text>",
                "<color>r:255,g:255,b:0</color><text>丙级联赛</text>",
                "<color>r:255,g:255,b:0</color><text>丁级联赛</text>",
            ],

            // 报名开始
            war_tip_1: "<color>r:255,g:255,b:255</color><text>您的公会在上期公会战获得</text>%s<color>r:255,g:255,b:255</color><text>的成绩，将自动进入本期公会战的</text>%s<color>r:255,g:255,b:255</color><text>。请在【本期对阵表】中查看详细对阵情况。</text>",
            war_tip_2: "<color>r:255,g:255,b:255</color><text>本期将从报名公会中选出</text><color>r:255,g:255,b:0</color><text>前%s名</text><color>r:255,g:255,b:255</color><text>参加联赛，截止目前已有</text><color>r:255,g:255,b:0</color><text>%s个</text><color>r:255,g:255,b:255</color><text>公会报名，您的公会尚未报名，请及时报名。</text>",
            war_tip_3: "<color>r:255,g:255,b:255</color><text>本期将从报名公会中选出</text><color>r:255,g:255,b:0</color><text>前%s名</text><color>r:255,g:255,b:255</color><text>参加联赛，截止目前已有</text><color>r:255,g:255,b:0</color><text>%s个</text><color>r:255,g:255,b:255</color><text>公会报名，您的公会暂时排名</text><color>r:255,g:255,b:0</color><text>第%s位</text><color>r:255,g:255,b:255</color><text>，保持当前排名到报名截止将获得参赛资格。</text>",
            war_tip_4: "<color>r:255,g:255,b:255</color><text>本期将从报名公会中选出</text><color>r:255,g:255,b:0</color><text>前%s名</text><color>r:255,g:255,b:255</color><text>参加联赛，截止目前已有</text><color>r:255,g:255,b:0</color><text>%s个</text><color>r:255,g:255,b:255</color><text>公会报名，您的公会暂时排名</text><color>r:255,g:255,b:0</color><text>第%s位</text><color>r:255,g:255,b:255</color><text>，请努力提升公会总战力。</text>",
            // 最终结果
            war_tip_5: "<color>r:255,g:255,b:255</color><text>恭喜！</text><color>r:255,g:255,b:0</color><text>%s</text>\n<color>r:255,g:255,b:255</color><text>获得了本期公会战的</text><color>r:255,g:255,b:0</color><text>冠军</text>",
            war_tip_6: "<color>r:255,g:255,b:255</color><text>您的公会\n获得了本次公会战的</text>%s",
            war_tip_7: "公会战已结束",
            // 报名结果
            war_tip_8: "<color>r:255,g:255,b:255</color><text>恭喜！您的公会最终排名</text>%s<color>r:255,g:255,b:255</color><text>，获得了</text>%s<color>r:255,g:255,b:255</color><text>的参赛资格，请在【本期对阵表】中查看详细对阵情况。</text>",
            war_tip_9: "<color>r:255,g:255,b:255</color><text>您的公会在上期公会战获得</text>%s<color>r:255,g:255,b:255</color><text>的成绩，将自动进入本期公会战的</text>%s<color>r:255,g:255,b:255</color><text>。请在【本期对阵表】中查看详细对阵情况。</text>",
            war_tip_10: "<color>r:255,g:255,b:255</color><text>很遗憾！您的公会最终排名</text><color>r:255,g:0,b:0</color><text>第%s位</text><color>r:255,g:255,b:255</color><text>，</text><color>r:255,g:0,b:0</color><text>未能获得参赛资格</text><color>r:255,g:255,b:255</color><text>，请努力提升公会总战力，下期公会战再见。</text>",
            war_tip_11: "<color>r:255,g:255,b:255</color><text>很遗憾！您的公会最终</text><color>r:255,g:0,b:0</color><text>没有报名</text><color>r:255,g:255,b:255</color><text>，</text><color>r:255,g:0,b:0</color><text>未能获得参赛资格</text><color>r:255,g:255,b:255</color><text>，请努力提升公会总战力，下期公会战再见。</text>",
            // 没报上名
            war_tip_12: "您的公会未获得本期公会战的参赛资格",

            war_fight_control_cannon: "<color>r:255,g:255,b:0</color><text>%s正在抢夺控制权</text>",

            war_win_reason: {
                [1]: "<color>r:255,g:255,b:255</color><text>公会</text><color>r:255,g:255,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>率先将对手的</text><color>r:255,g:255,b:0</color><text>主神像破坏</text><color>r:255,g:255,b:255</color><text>，获得了本场比赛的胜利！</text>",
                [2]: "<color>r:255,g:255,b:255</color><text>比赛时间到，公会</text><color>r:255,g:255,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>以</text><color>r:255,g:255,b:0</color><text>生命值优势</text><color>r:255,g:255,b:255</color><text>，获得了本场比赛的胜利！</text>",
                [3]: "<color>r:255,g:255,b:255</color><text>比赛时间到，公会</text><color>r:255,g:255,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>以</text><color>r:255,g:255,b:0</color><text>荣誉值优势</text><color>r:255,g:255,b:255</color><text>，获得了本场比赛的胜利！</text>",
                [4]: "<color>r:255,g:255,b:255</color><text>比赛时间到，公会</text><color>r:255,g:255,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>以</text><color>r:255,g:255,b:0</color><text>杀敌数优势</text><color>r:255,g:255,b:255</color><text>，获得了本场比赛的胜利！</text>",
                [5]: "<color>r:255,g:255,b:255</color><text>比赛时间到，双方战斗数据相同，系统判定公会</text><color>r:255,g:255,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>获得本场比赛胜利！</text>",
            },

            war_cheats_tip1: "1.<color>r:255,g:255,b:0</color><text>占领龙神大炮</text><color>r:255,g:255,b:255</color><text>对敌方神像造成巨量伤害！</text>",
            war_cheats_tip2: "2.<color>r:255,g:255,b:255</color><text>率先</text><color>r:255,g:255,b:0</color><text>破坏敌方主神像</text><color>r:255,g:255,b:255</color><text>即可获得比赛胜利！</text>",

            war_league_tips: "今天%s将进行公会战，请各位成员务必准时参加！",
            war_league_tips_city: "公会战已开始，请各位成员快速入场参战！",
            war_league_enroll_tips: "本期公会战活动正在火热报名中，请您尽快报名！",

            war_league_attend_tip: "（奖品将在第二轮公会战结束后发放，请务必出勤！）",

            war_city_start_tip: "%s\n后开始",
            war_city_end_tip: "%s\n后结束",

            recruit: {
                noTime: "下次发布招募时间 %s秒后",
                noContribute: "公会活跃度不足%s",
                defaultStr: "%s收人了！加入我们，和我们一起打造最强公会吧！",
                none: "不能输入空",
                err: "不能包含特殊字符",
                success: "<color>r=60,g=255,b=0</color><text>发布喊话成功</text>",
                notThisServer: "此帮会非本服帮会",
            },
        },

        TextsConfig_Error: {

            uc_error: "UC删档不计费封测期间,暂不开放充值功能",

            sw_error: "内测期间,暂不开放充值功能",

            sw_close: "更多内测奖励，请关注精彩活动",

            tk_error: "钻石不足",

            //查看对方详情点“查看念兽”时，如果对方一个念兽都没有，直接弹错误码“对方念兽系统未开启”
            adviser_error: "对方念兽系统未开启",

            wait: "敬请期待",

            not_open: "未开放",
            not_has_hero: "未拥有该猎人",

            instance_close: "该副本尚未开启",

            worship_open: "22级队伍开启访仙",

            [10200]: "达到VIP%d级可开启",
            [10344]: "强化到%d级可锻造",
            skill_up_one: "技能等级不可超过猎人等级",
            skill_up_all: "已至当前最大等级",
            skill_same: "不可学习相同的天赋",
            bastille_pre: "次数已用完",

            hero_level_up: "已升到当前最高等级",

            partner_compose_not_enough: "羁绊碎片不足",
            partner_not_enough: "激活材料不足",
            add_exp_soul: "未拥有该猎人",
            upgrade_not_enough: "道具不足",
            upgrade_level_max: "经验已满，请提升队伍等级",
            step_level_max: "已达到当前品阶需求等级上限,请前往提升品阶",
            general_level_max: "已达到猎人最大等级",

            talent_not_enungh: "天赋书不足",

            battle_num: "剩余挑战次数 x%s",

            talent_compose: "不够数量",

            treasure_key: "钥匙数量不足",
            treasure_not_open: "VIP%d级可十连开该宝箱",

            buy_money: "探索次数不足",

            talent_not: "没有选中天赋残卷",

            mail_attach: "没有可领取的物品",
            mail_read: "没有新的邮件",
            mall_secret_level: "队伍15级攻打副本有几率开启神秘商铺",
            mall_secret_vip: "VIP %d 级可永久开启神秘商铺",
            mall_secret_open: "神秘商铺未开启",

            worship_resolve: "没有选择要分解的天赋书",

            player_not_adviser: "对方还没有念兽",

            equip_forge_max: "已锻造至最高品质",

            talent_lock: "天赋位未解锁",

            partner_activited: "徽章已激活",

            league_already: "您已有公会请勿重复加入",
            chat_self: "为何与自己对话？",

            full_exp: "经验已满",

            join_league: "未加入公会",

            wanted_boss: "先打败下方四名精英敌犯后，才可以挑战Boss!",
            wanted_exit_time: "没有剩余挑战次数，不可重置",
            wanted_exit_boss: "您还有未捉捕的敌犯，重置后将结束本次挑战，是否坚持重置？",
            wanted_exit_award: "您还有未领取的奖励，重置后将不可领取，是否坚持重置？",
            wanted_win_boss: "该Boss已经打过了",

            no_league_to_join: "对方尚未加入任何公会",

            money_time_10258: "您的招财次数不足，提升VIP等级可增加招财次数，是否前往充值？",
            money_time_10209: "您当前的钻石不足，是否前往充值？",

            vip_error_10200: "请升级VIP等级",
            gift_error_10200: "升到VIP%d级可购买，是否前往充值提升VIP等级？",
            growth_error_10200: "升到VIP3级可购买，是否前往充值提升VIP等级？",
            skill_error_10200: "<text>队伍达到</text><color>r:200,g:38,b:0</color><text>32级</text><text>或</text><color>r:200,g:38,b:0</color><text>VIP3级</text><text>可使用全部升级技能功能，是否前往充值提升VIP等级？</text>",
            equip_error_10200: "<text>队伍达到</text><color>r:200,g:38,b:0</color><text>32级</text><text>或</text><color>r:200,g:38,b:0</color><text>VIP3级</text><text>可使用全部强化装备功能，是否前往充值提升VIP等级？</text>",
            mall_error_10200: "达到VIP%d级可永久开启神秘商铺，是否前往充值提升VIP等级？",
            key_error_10200: "达到VIP%d级可十连开，是否前往充值提升VIP等级？",

            equip_sthen_10212: "金币不足",
            equip_forge_10212: "锻造材料不足",
            equip_carve_10212: "刻印材料不足",
            treasure_10212: ["普通钥匙不足", "精致钥匙不足",],

            equip_carve_10347: "所有装备刻至%s后才能进行下一级",

            debug_task: "未配置相关跳转信息",
            debug_packge: "未配置相关使用信息",

            talent_max_10321: "天赋已满级",
            talent_error_lock: "天赋未开启",

            equip_error_10312: "装备等级不可超过猎人等级，是否前往升级该猎人？",

            fate_error_10363_1: "猎人星级不足，是否去升星猎人？",
            fate_error_10363_2: "神兵突破等级不足，是否去突破神兵？",

            package_error_hero: "未拥有该猎人!",
            pacakge_error_skill: "未开启猎人技能!",

            activity_seven_zgl: "诸葛亮寻访活动未开启",

            activity_error: "活动未开启",

            jade_compose_error: "玉石数量不足",

            speed_next_open: "达到%d级可开启2倍速",
            speed_max_open: "达到%d级可开启3倍速",

            buy_power_error: "体力购买次数达上限",
            buy_mobs_error: "副本购买次数达上限",
            pk_not_open: "跨服战未开启",
            league_not_open: "未加入公会",
        },

        TextsConfig_Friend: {
            applyMsg: "验证信息",
            applySend: "好友申请已送出，请耐心等候",
            getOnly: "只能从好友领取体力",
            sendOnly: "只能给好友赠送体力",
            getSuccess: "领取体力成功！",
            getPower: "体力 +%s",
            canSendNone: "您的好友都已赠送过体力了！",
            canGetNone: "当前无可领取的体力！",
            noFriend: "您当前还没有好友",
            enemyAdd: "已添加为仇人",
            confirmDelete: {
                [1]: "是否与%s解除好友关系？",
                [2]: "是否与%s解除敌人关系？",
                [3]: "是否从黑名单中删除%s？",
            },
            addSuccess: "添加好友成功",
            appliction: "当前没有好友申请",


        },

        TextsConfig_Vip: {
            vip_label: "VIP %d 特权",
            vip_charge: "再充值%d钻石即可成为",
            vip_max: "等级已满",

            Gold_num: "本次免费（剩余%s次）",
            Gold_num_mall: "  本次免费\n（剩余%s次）",

            //开头
            vip_head: "<text>累计充值</text><color>r:255,g:255,b:0</color><text>%d</text><text>钻石即可享受该级特权。</text>",

            vip_gift_go: "<text>达到</text><color>r=200,g=38,b=0</color><text>VIP%s级</text><text>可购买</text><color>r=200,g=38,b=0</color><text>VIP专属礼包(%s)</text><text>,是否前往提升VIP等级</text>",

            //结尾
            vip_tail: "<text>包含</text><color>r:255,g:255,b:0</color><text>%d星猎人执照</text><text>所有特权。</text>",
            lowvip_tail: "<text>包含</text><color>r=255,g=255,b=0</color><text>VIP%d</text><text>的所有特权。</text>",

            //中间
            vip_string: {

                // 特殊奖励
                [1]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP1</text><text>专属福利</text>",
                [2]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP2</text><text>专属福利</text>",
                [3]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP3</text><text>专属福利</text>",
                [4]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP4</text><text>专属福利</text>",
                [5]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP5</text><text>专属福利</text>",
                [6]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP6</text><text>专属福利</text>",
                [7]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP7</text><text>专属福利</text>",
                [8]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP8</text><text>专属福利</text>",
                [9]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP9</text><text>专属福利</text>",
                [10]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP10</text><text>专属福利</text>",
                [11]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP11</text><text>专属福利</text>",
                [12]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP12</text><text>专属福利</text>",
                [13]: "<text>每天可领取</text><color>r=255,g=255,b=0</color><text>VIP0</text><text>专属福利</text>",

                [14]: "<text>每天探索任务数量增加</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
                // 特殊权利
                [21]: "<text>解锁技能</text><color>r:255,g:255,b:0</color><text>一键升级</text><text>功能。</text>",
                [22]: "<text>解锁装备</text><color>r:255,g:255,b:0</color><text>一键强化</text><text>功能。</text>",
                [23]: "<text>解锁技能</text><color>r:255,g:255,b:0</color><text>全部升级</text><text>功能。</text>",
                [24]: "<text>解锁装备</text><color>r:255,g:255,b:0</color><text>全部强化</text><text>功能。</text>",
                [25]: "<text>天空竞技场扫荡时</text><color>r:255,g:255,b:0</color><text>无需等待</text><text>时间。</text>",
                [26]: "<text>可使用副本</text><color>r:255,g:255,b:0</color><text>连续扫荡</text><text>功能。</text>",
                [27]: "<text>可使用玉石坊</text><color>r:255,g:255,b:0</color><text>快速合成</text><text>功能。</text>",
                [28]: "<text>解锁神兵洗练的</text><color>r:255,g:255,b:0</color><text>连洗5次</text><text>功能。</text>",
                [29]: "<text>永久开启</text><color>r:255,g:255,b:0</color><text>神秘商铺</text><text>。</text>",
                [30]: "<text>天空竞技场每天可</text><color>r:255,g:255,b:0</color><text>重置2次</text><text>。</text>",    //del
                [31]: "<text>解锁第三名</text><color>r:255,g:255,b:0</color><text>念兽蔡文姬</text><text>。</text>",
                [32]: "<text>念兽阵法每天可</text><color>r:255,g:255,b:0</color><text>免费刷新10次</text><text>。</text>",
                [33]: "<text>通缉令中可</text><color>r:255,g:255,b:0</color><text>免费扫荡</text><text>。</text>",    //del
                [34]: "<text>通缉令中免费更换通缉犯次数</text><color>r:255,g:255,b:0</color><text>增至5次</text><text>。</text>",
                [35]: "<text>解锁神兵洗练的</text><color>r:255,g:255,b:0</color><text>连洗10次</text><text>功能。</text>",
                [36]: "<text>通缉令所得</text><color>r:255,g:255,b:0</color><text>奖励翻倍</text><text>（不包含信物）。</text>",    //del
                [37]: "<text>通缉令中免费更换通缉犯次数</text><color>r:255,g:255,b:0</color><text>增至10次</text><text>。</text>",    //del
                [38]: "<text>可使用玉石坊</text><color>r:255,g:255,b:0</color><text>自动磨洗</text><text>功能。</text>",    //del
                [39]: "<text>可免费领取首充大礼包：</text><color>r:255,g:255,b=0</color><text>四星奇犽</text>",
                [40]: "<text>开启</text><color>r=255,g=255,b=0</color><text>荣耀福利</text><text>功能</text>",
                [41]: "<text>开启</text><color>r=255,g=255,b=0</color><text>星耀福利</text><text>功能</text>",
                [42]: "<text>卡片数量上限增加</text><color>r=255,g=255,b=0</color><text>10</text>",
                [43]: "<text>卡片数量上限增加</text><color>r=255,g=255,b=0</color><text>20</text>",
                [44]: "<text>卡片数量上限增加</text><color>r=255,g=255,b=0</color><text>30</text>",
                [45]: "<text>体力上限增加</text><color>r=255,g=255,b=0</color><text>5</text>",
                [46]: "<text>体力上限增加</text><color>r=255,g=255,b=0</color><text>10</text>",
                [47]: "<text>开启战斗</text><color>r=255,g=255,b=0</color><text>3倍速</text><text>功能</text>",
                [48]: "<text>开启副本</text><color>r=255,g=255,b=0</color><text>扫荡5次</text><text>功能</text>",
                [49]: "<text>商店免费刷新次数增加</text><color>r=255,g=255,b=0</color><text>1</text><text>次</text>",
                [50]: "<text>金币宝藏免费探索次数增加</text><color>r=255,g=255,b=0</color><text>1</text><text>次</text>",
                [501]: "<text>钓鱼免费刷新次数</text><color>r=255,g=255,b=0</color><text>+1</text>",
                [502]: "<text>V0礼包：</text><color>r=255,g=255,b=0</color><text>进阶礼盒（进阶快人一步）</text>",
                [503]: "<text>V1礼包：</text><color>r=255,g=255,b=0</color><text>龙虾大餐（冲级必不可少）</text>",
                [504]: "<text>V2礼包：</text><color>r=255,g=255,b=0</color><text>高级觉醒石（S级觉醒必备）</text>",
                [505]: "<text>V3礼包：</text><color>r=255,g=255,b=0</color><text>红酒（必出A级以上猎人）</text>",
                [506]: "<text>V4礼包：</text><color>r=255,g=255,b=0</color><text>圣骑士的首饰（绝版红卡）</text>",
                [507]: "<text>V5礼包：</text><color>r=255,g=255,b=0</color><text>甘舒（定时炸弹极限秒杀）</text>",
                [508]: "<text>V6礼包：</text><color>r=255,g=255,b=0</color><text>高级替身人偶（S级觉醒必备）</text>",
                [509]: "<text>V7礼包：</text><color>r=255,g=255,b=0</color><text>黄金辞典（稀有特效红卡）</text>",
                [510]: "<text>V8礼包：</text><color>r=255,g=255,b=0</color><text>致命炸弹（甘舒专属藏品）</text>",
                [511]: "<text>V9礼包：</text><color>r=255,g=255,b=0</color><text>库洛洛（超强控制暴力输出）</text>",
                [512]: "<text>V10礼包：</text><color>r=255,g=255,b=0</color><text>盗贼之书（库洛洛专属藏品）</text>",
                [513]: "<text>V11礼包：</text><color>r=255,g=255,b=0</color><text>一坪的海岸线（稀有特效红卡）</text>",
                [514]: "<text>V12礼包：</text><color>r=255,g=255,b=0</color><text>千里眼的蛇（稀有特效红卡）</text>",
                [515]: "<text>钓鱼免费刷新次数</text><color>r=255,g=255,b=0</color><text>+2</text>",
                [516]: "<text>钓鱼免费刷新次数</text><color>r=255,g=255,b=0</color><text>+3</text>",
                [517]: "<text>钓鱼免费刷新次数</text><color>r=255,g=255,b=0</color><text>+4</text>",
                [518]: "<text>解锁天空竞技场</text><color>r=255,g=255,b=0</color><text>直达历史最高层</text><text>功能</text>",
                [519]: "<text>可购买成长基金</text><color>r=255,g=255,b=0</color><text>（最高可得10000钻石！）</text><text>。</text>",
                [520]: "<text>每日福利增加</text><color>r=255,g=255,b=0</color><text>钻石×50</text><text>奖励。</text>",
                [521]: "<text>每日福利增加</text><color>r=255,g=255,b=0</color><text>体力×20</text><text>奖励。</text>",
                [522]: "<text>每日福利增加</text><color>r=255,g=255,b=0</color><text>钻石×80</text><text>奖励。</text>",
                [523]: "<text>每日福利增加</text><color>r=255,g=255,b=0</color><text>体力×35</text><text>奖励。</text>",
                [524]: "<text>每日福利增加</text><color>r=255,g=255,b=0</color><text>钻石×100</text><text>奖励。</text>",
                [525]: "<text>每日福利增加</text><color>r=255,g=255,b=0</color><text>体力×50</text><text>奖励。</text>",

                // 正常权利
                [51]: "<text>每天可购买体力</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [52]: "<text>每天可探索金币宝藏</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [53]: "<text>金币宝藏暴击区间</text><color>r:255,g:255,b:0</color><text>%d-%d</text><text>倍。</text>",
                [54]: "<text>每天可重置挑战副本</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [55]: "<text>每天可购买本服格斗挑战</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [56]: "<text>每天可钓鱼次数</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [57]: "<text>每天可进行普通切玉</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [58]: "<text>每天可购买群英争霸对战次数</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [59]: "<text>每月拥有补签次数</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [60]: "<text>好友数量上限</text><color>r:255,g:255,b:0</color><text>%d</text><text>人。</text>",
                [61]: "<text>每天可领取好友赠送的体力</text><color>r:255,g:255,b:0</color><text>%d</text><text>点。</text>",
                [62]: "<text>每天可猜拳次数</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [63]: "<text>每天可重猜次数</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [64]: "<text>每天可领好友体力</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [65]: "<text>每天流星街挑战自动恢复至</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [66]: "<text>每天金币宝藏探索次数</text><color>r:255,g:255,b:0</color><text>%d</text><text>次。</text>",
                [67]: "<color>r:255,g:255,b:0</color><text>%s</text><text>之树产量提升至</text><color>r:255,g:255,b:0</color><text>%s</text><text>个。</text>",
                [68]: "<color>r:255,g:255,b:0</color><text>%s</text><text>之树产量提升至</text><color>r:255,g:255,b:0</color><text>%s</text><text>个。</text><color>r:255,g:255,b:0</color><text>\n%s</text><text>之树产量提升至</text><color>r:255,g:255,b:0</color><text>%s</text><text>个。</text>",
                [69]: "<color>r:255,g:255,b:0</color><text>%s</text><text>之树产量提升至</text><color>r:255,g:255,b:0</color><text>%s</text><text>个。</text><color>r:255,g:255,b:0</color><text>\n%s</text><text>之树产量提升至</text><color>r:255,g:255,b:0</color><text>%s</text><text>个。</text><color>r:255,g:255,b:0</color><text>\n%s</text><text>之树产量提升至</text><color>r:255,g:255,b:0</color><text>%s</text><text>个。</text>",
                [70]: "<color>r:255,g:255,b:0</color><text>%s</text><text>之树产量提升至</text><color>r:255,g:255,b:0</color><text>%s</text><text>个。</text><color>r:255,g:255,b:0</color><text>\n%s</text><text>之树产量提升至</text><color>r:255,g:255,b:0</color><text>%s</text><text>个。</text><color>r:255,g:255,b:0</color><text>\n%s</text><text>之树产量提升至</text><color>r:255,g:255,b:0</color><text>%s</text><text>个。</text><color>r:255,g:255,b:0</color><text>\n%s</text><text>之树产量提升至</text><color>r:255,g:255,b:0</color><text>%s</text><text>个。</text>",
            },

            vip_tag: {

                [1]: "buy_power",        //买体力
                [2]: "league_fishing",   //钓鱼次数
                [3]: "gain_runes_time",  //猜拳
                [4]: "relation_count",   //好友、仇人数量上限
                [5]: "reward_power",     //好友领体力
                [6]: "buy_money",        //招财
                [7]: "buy_money_cirt", //招财暴击率
                [8]: "tree_cirt", //产果子倍数
                [9]: "search_count",//探索任务数量

                //        [1] : "buy_power",        //买体力      
                //        [3] : "buy_money_cirt",   //招财暴击率
                //        [4] : "buy_mobs",         //每天可重置精英副本
                //        [5] : "ladder",           //购买本服格斗
                //        [6] : "league_fishing",   //公会钓鱼次数
                //        [7] : "sign_supply_time", //每月拥有补签次数
                //        [8] : "relation_count",   //好友、仇人数量上限
                //        [9] : "reward_power",     //好友领体力
                //        [10] : "gamble_jade_time",//切玉
                //        [11] : "buy_contend",     //争霸次数
                //        [12] : "gain_runes_time", //祭祀次数
                //        [13] : "change_runes_time",//换符次数
                //        [14] : "contend_free",    //争霸免费次数
                //        [15] : "wanted_time",    //悬赏令(只读悬赏令列)、海捕令、缉拿令
            },
            vip_title: {
                [1]: "power_speed",                //体力恢复速度
                [2]: "power_add",                  //体力上限
                [3]: "instance_exp_add",           //副本经验
                [4]: "wanted_coin_add",            //流星街金币
                [5]: "mall_free_time",             //商城免费刷新
                [6]: "buy_coin_free_time",         //金币宝藏每日免费
                [7]: "runes_free_time",            //免费重新猜拳
                [8]: "fishing_free_time",          //钓鱼免费刷紫
                [9]: "package_add",                //猎人仓库容量
                [10]: "potato_add",                //卡片数量上限
                [11]: "craft_buy_time",            //跨服战可购买次数
                [12]: "scene_revive_time",         //流星街复活时间减少
                [13]: "buy_power",                 //购买体力次数
                [14]: "search_count"               //探索任务数量
            },
            vip_tree_name: [
                "金币",
                "体力",
                "钻石",
                "念力",
            ],
            vip_des: {
                [1]: "<text>体力恢复速度</text><color>r=255,g=255,b=0</color><text>+%s%%</text>",
                [2]: "<text>体力上限</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [3]: "<text>副本经验</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [4]: "<text>流星街金币</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [5]: "<text>每日商店免费刷新</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
                [6]: "<text>每日金币宝藏免费探索</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
                [7]: "<text>每日猜拳免费重猜</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
                [8]: "<text>每日钓鱼免费</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
                [9]: "<text>猎人仓库容量</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [10]: "<text>卡片数量上限</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [11]: "<text>跨服格斗场可购买次数</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [12]: "<text>流星街复活时间减少</text><color>r=255,g=255,b=0</color><text>%s</text><text>秒</text>",
                [13]: "<text>每天可购买体力</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
                [14]: "<text>每天探索任务数量增加</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
            },
            search_count: {
                [1]: "<text>体力恢复速度</text><color>r=255,g=255,b=0</color><text>+%s%%</text>",
                [2]: "<text>体力上限</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [3]: "<text>副本经验</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [4]: "<text>流星街金币</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [5]: "<text>每日商店免费刷新</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
                [6]: "<text>每日金币宝藏免费探索</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
                [7]: "<text>每日猜拳免费重猜</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
                [8]: "<text>每日钓鱼免费</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
                [9]: "<text>猎人仓库容量</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [10]: "<text>卡片数量上限</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [11]: "<text>跨服格斗场可购买次数</text><color>r=255,g=255,b=0</color><text>+%s</text>",
                [12]: "<text>流星街复活时间减少</text><color>r=255,g=255,b=0</color><text>%s</text><text>秒</text>",
                [13]: "<text>每天可购买体力</text><color>r=255,g=255,b=0</color><text>%s</text><text>次</text>",
            },
        },

        TextsConfig_Mine: {
            level: "Lv %s",
            league: "公会：%s",
            manageMoney: "%s（已被抢：%s）",
            manageSoul: "%s（已被抢：%s）",
            inviteErr: "请至少选择一名邀请对象",
            inviteTitle: "当前已选择邀请：%s 人",
            inviteSend: "护矿邀请已发送",
            inviteDefault: "还有谁？！",
            genLvErr: "选派猎人不可低于%s级",
            mineChooseConfirm: "是否要花费%s钻石挖%s矿？",
            mineChooseType: {
                [1]: "石",
                [2]: "铜",
                [3]: "银",
            },
            mineInviteDes: {
                [1]: "石矿",
                [2]: "铜矿",
                [3]: "银矿",
                [4]: "金矿",
            },
            generalOnuse: "该猎人正在使用中，无法上阵，请使用其它猎人。",
            timeMine: "矿洞开启时间:%s-%s",
            timeDig: "挖矿时间:%s-%s",
            timeRob: "抢矿时间:%s-%s",
            timeDes: "%s  %s  %s",
            errInvite: "该玩家矿洞未开启",
        },

        TextsConfig_Adviser: {
            maxAttr: "无",
            maxChance: "无",
            none: "空",
            lv: "Lv%s",
            lockStrategy: "%s观星至\n【%s】\n可解锁",
            lockDes: [
                "君主%s级可解锁该念兽",
                "将%s观星至【%s】后可解锁该念兽，\n是否前去观星？",
                "将%s观星至【%s】，\n或达到VIP %s级可解锁该念兽，\n是否前往充值提升VIP等级？",
            ],

            lockNumDes: "已锁定：%s个",
            levelup_tip: "念兽战力：%d",
            noPropCRYSTAL: "矿洞玩法中可以获得大量晶魄，是否前往？",
            noPropMONEY: "金币不足，是否前往招财？",
            costTips: "<text>是否确认花费</text><color>r:200,g:38,b:0</color><text>%s</text><color>r:66,g:27,b:4</color><text>钻石，学习阵法</text><color>r:200,g:38,b:0</color><text>%s</text><color>r:66,g:27,b:4</color><text>？</text>",
            lawAttri: [
                "生命值+%s",
                "物理攻击+%s",
                "物理防御+%s",
                "法术攻击+%s",
                "法术防御+%s",
                "物理暴击+%s",   //暴击率物法同时加，显示不做区分
                "技能暴击+%s",
                "暴击伤害+%s",
                "暴击抵抗+%s",
                "闪避+%s",
                "命中+%s",
                "忽视物防+%s",
                "忽视魔防+%s",
                "终伤附加+%s",
                "终伤减免+%s",
                "怒气减免+%s",
                "攻击+%s", //17  //下面两个是，物法同时加的情况
                "防御+%s", //18
                "暴击+%s",
                "忽视防御+%s",
                "异常抵抗+%s",
                "忽视异常抵抗+%s",
                "浮空抵抗+%s",
            ],
            lawAttriLF: [
                "生命值\n+%s",
                "物理攻击\n+%s",
                "物理防御\n+%s",
                "法术攻击\n+%s",
                "法术防御\n+%s",
                "物理暴击\n+%s",   //暴击率物法同时加，显示不做区分
                "技能暴击\n+%s",
                "暴击伤害\n+%s",
                "暴击抵抗\n+%s",
                "闪避\n+%s",
                "命中\n+%s",
                "忽视物防\n+%s",
                "忽视魔防\n+%s",
                "终伤附加\n+%s",
                "终伤减免\n+%s",
                "怒气减免\n+%s",
                "攻击\n+%s", //17  //下面两个是，物法同时加的情况
                "防御\n+%s", //18
                "暴击\n+%s",
                "忽视防御\n+%s",
                "异常抵抗\n+%s",
                "忽视异常抵抗\n+%s",
                "浮空抵抗\n+%s",
            ],

            add_name: {
                [1]: "密室游鱼",
                [2]: "玩具修理者",
                [3]: "凸眼鱼",
                [4]: "白猩猩",
                [5]: "黑猩猩",
                [6]: "疯狂小丑",
                //        [4] : "流星街生命力+%s",
                //        [5] : "格斗场生命力+%s",
                //        [6] : "PK仙境生命力+%s",
                //        [7] : "世界boss攻击力+%s",
                //        [8] : "公会战攻击力+%s",
                //        [9] : "定时生产金币+%s",
                //        [10] : "定时生产体力+%s",
                //        [11] :"定时生产钻石+%s",
                //        [12] : "黑暗大陆攻击力+%s",
            },

            attrFormat: "%s%s%s",
            attrNext: "%s%s",
            costFree: "免费（%s次）",
            nameTip: "【%s】",
            nameDot: "、",
            newComb: "<color>r:255,g:255,b:255</color><text>恭喜！你激活了组合效果</text><color>r:0,g:200,b:0</color><text>%s</text>",
            lawLockMsg: "解锁念兽%s后开启该栏位",
            lawName: [
                "阵法一",
                "阵法二",
                "阵法三",
            ],
            checkStar: "已观星至【%s】",
            combCond: "（%s/%s）",
            starAll: "%s为全体猎人加成属性如下：",
            attr_space: " ",

            LabelGetName: "念兽 %s/%s",
            strengthLevel: "等级: %s",
            // current : "Lv%s %s",
            change: "变化系猎人  %s",
            LabelPetSkillNames: "%s",
            LabelPetSkillName: [
                "<color>r:25,g:227,b:68</color><text>%s</text>",
                "<color>r:122,g:250,b:255</color><text>%s</text>",
                "<color>r:235,g:11,b:235</color><text>%s</text>",
                "<color>r:237,g:142,b:37</color><text>%s</text>",
            ],

            current: [
                "<color>r:25,g:227,b:68</color><text>Lv%s %s</text>",
                "<color>r:122,g:250,b:255</color><text>Lv%s %s</text>",
                "<color>r:235,g:11,b:235</color><text>Lv%s %s</text>",
                "<color>r:237,g:142,b:37</color><text>Lv%s %s</text>",
            ],
            LableSkill: "<text>当前效果：</text><text>\n</text>%s<text>\n</text><text>升级效果：</text><text>\n</text>%s",
            LabelSkillNext: "<text>当前效果：\n</text>%s",
            strengthNextLevel: "升级条件：念兽等级达到%s级 (%s/%s)",
            strengthMaxLevel: "念兽技能等级达到最大值",
            strengthMax: "念兽等级达到最大值",
            needFragment: "<color>r:0,g:255,b:0</color><text>%s</text><color>r:212,g:224,b:238</color><text>/%s</text>",
            needFragments: "<color>r:255,g:0,b:0</color><text>%s</text><color>r:212,g:224,b:238</color><text>/%s</text>",
            currentGet: "<text>当前拥有: </text><color>r:25,g:227,b:68</color><text>%s</text>",
            skillPet: "念力技等级已经达到最高",
            PetCondition: "<color>r:255,g:0,b:0</color><text>念兽强化+%s时激活</text>",
            attriAll: "属性加成：生命值 +%s\n攻击 +%s\n防御 +%s\n念力技 ：%s",
            goods: "<color>r:255,g:0,b:0</color><text>物品不足</text>",
            attri: {
                [1]: "全体猎人 生命值 +%s",
                [2]: "全体猎人 攻击 +%s",
                [3]: "全体猎人 防御 +%s",
            },

            talent_describe: {
                [1]: "<text>全体猎人战斗中基础攻击增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [2]: "<text>全体猎人战斗中基础防御增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [3]: "<text>全体猎人战斗中基础生命值增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [4]: "<text>全体猎人战斗中基础攻击增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [5]: "<text>全体猎人战斗中基础防御增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [6]: "<text>全体猎人战斗中基础生命值增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [7]: "<text>全体猎人战斗中基础攻击增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [8]: "<text>全体猎人战斗中基础防御增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [9]: "<text>全体猎人战斗中基础生命值增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [10]: "<text>全体猎人战斗中暴击伤害增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [11]: "<text>攻击型猎人战斗中暴击伤害额外增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [12]: "<text>辅助型猎人战斗中速度额外增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [13]: "<text>防御型猎人战斗中暴击抵抗额外增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [14]: "<text>攻击型猎人战斗中暴击伤害额外增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [15]: "<text>辅助型猎人战斗中速度额外增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [16]: "<text>防御型猎人战斗中暴击抵抗额外增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [17]: "<text>攻击型猎人战斗中暴击伤害额外增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [18]: "<text>辅助型猎人战斗中速度额外增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [19]: "<text>防御型猎人战斗中暴击抵抗额外增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                [20]: "<text>全体猎人战斗中暴击率额外增加</text><color>r=25,g=227,b=68</color><text>%s%%</text>",

            },

            adviser_attri: {
                [1]: "体力上限增加 %s  \n体力恢复系数 %s",
                [2]: "流星街金币奖励+%s  \n产出金币数量 %s",
                [3]: "挑战副本获得钻石概率%s \n产出钻石数量 %s",
                [5]: "流星街金币奖励+%s  \n%s秒产出%s个金币",
                [6]: "挑战副本获得钻石概率%s \n%s秒产出%s个钻石",
            },

            adviser_success: "<color>r:25,g:227,b:68</color><text>领取成功</text>",

            //   LableSkill_attri_power:"<text>当前效果：</text><text>\n</text><text>体力上限增加 %s 体力恢复系数 %s</text><text>\n</text><text>升级效果：</text><text>\n</text><text>体力上限增加 %s  体力恢复系数 %s</text>",
            //   LableSkill_attri_instance:"<text>当前效果：</text><text>\n</text><text>流星街金币奖励+%s  \n产出金币数量 %s</text><text>\n</text><text>升级效果：</text><text>\n</text><text>流星街金币奖励+%s  \n产出金币数量 %s</text>",
            //   LableSkill_attri_wanted:"<text>当前效果：</text><text>\n</text><text>挑战副本获得钻石概率%s \n产出钻石数量 %s</text><text>\n</text><text>升级效果：</text><text>\n</text><text>挑战副本获得钻石概率%s \n产出钻石数量 %s</text>",

            base_attri: "<text>基础技：</text>%s",
            skill_attri: "<text>念力技：</text>%s",
            des1: "<color>r:212,g:224,b:238</color><text>(此为1星属性，之后每升</text><color>r:255,g:120,b:0</color><text>1星</text><color>r:212,g:224,b:238</color><text>提升一次加成属性)</text>",
            des2: "<color>r:212,g:224,b:238</color><text>(此为1星属性，之后每升</text><color>r:255,g:120,b:0</color><text>5星</text><color>r:212,g:224,b:238</color><text>提升一次加成属性)</text>",
            add_star: "<text>再升</text><color>r:255,g:120,b:0</color><text>%s</text><text>星可提升</text>",
            add_star_next: "念力技提升",
            attri_star: {
                [1]: "<text>基础技：</text>%s",
                [2]: "<text>念力技：</text>%s",
            },

            add_up_star: "<text>再升</text><color>r:255,g:120,b:0</color><text>%s</text><text>星可提升</text>",
            //宠物
            pet_own: "%s的宠物",
            pet_get_num: "宠物 %s/%s",
            pet_battle: "跟随中",
            pet_stop: "休息中",

            pet_battle_success: "<color>r=25,g=227,b=68</color><text>宠物进入跟随状态</text>",
            pet_stop_success: "<color>r=25,g=227,b=68</color><text>宠物进入休息状态</text>",

            pet_unlock: "%s阶进化解锁",
            max_step: "宠物已进化到最大品阶",
            pet_lock_stpe: "%s阶进化",

            unlock_root: "解锁%s阶进化权限",
            darkland_attr1: "贪婪之岛内",
            darkland_attr2: "贪婪之岛外",

            pet_attri_dont: [
                "贪婪之岛中碰撞战斗时我方全体猎人生命属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人攻击属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人防御属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人暴击属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人暴击伤害属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人格挡率属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人忽视格挡属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人忽视防御属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人怒气减少属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人异常状态抵抗属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人忽视异常抵抗属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人浮空抗性属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人速度属性提升%s%%",
                "贪婪之岛中碰撞战斗时我方全体猎人援护怒气属性提升%s%%",
            ],


            pet_attri_Get: [
                "<text>贪婪之岛中碰撞战斗时我方全体猎人生命属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人攻击属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人防御属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人暴击属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人暴击伤害属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人整体格挡率属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人忽视格挡属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人忽视防御属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人怒气减少属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人异常状态抵抗属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人忽视异常抵抗属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人浮空抗性属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人速度属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
                "<text>贪婪之岛中碰撞战斗时我方全体猎人援护怒气属性提升</text><color>r=25,g=227,b=68</color><text>%s%%</text>",
            ],


            pet_start: "初始效果：",
            pet_Max: "满级效果：",

            attri_talent_don_get: "<color>r=255,g=255,b=0</color><text>    (宠物获得后激活)</text>",
            attri_talent: "<color>r=255,g=255,b=0</color><text>     (宠物%s阶进化后激活)</text>",
            attri_talent_get: "<color>r=25,g=227,b=68 </color><text>    (已激活)</text>",


            darkland: "<text>贪婪之岛中碰撞战斗时我方全体猎人%s属性提升%s%%</text>",

            pet_passive_des: {
                [1]: "属性+%s%%",
                [2]: "击杀敌人后有%s%%几率额外抢夺一枚果实",
                [3]: "采集果实时间缩短%s秒",
                [4]: "死亡复活CD缩短%s秒",
                [5]: "碰撞战斗击杀敌人后将本次造成伤害的%s%%转化为自身生命值"
            },

            pet_passive: {
                [1]: "属性+%s%%",
                [2]: "<text>击杀敌人后有%s%%几率额外抢夺一枚果实</text>",
                [3]: "<text>采集果实时间缩短%s秒</text>",
                [4]: "<text>死亡复活CD缩短%s秒</text>",
                [5]: "<text>碰撞战斗击杀敌人后将本次造成伤害的%s%%转化为自身生命值</text>",

            },


            pet_skill_unlock: "<text%s,%s</text>",
        },
        TextsConfig_Fate: {
            title: "%s的组合",
            posDes: {
                generals: "先锋",
                reserves: "后卫",
                supports: "援护",
            },
            posCompose: "%s%s号位",
        },

        TextsConfig_Replay: {
            Title: {
                instance_normal: "冒险副本%s_%s",
                instance_elite: "挑战副本%s_%s",
                village_title: "伏牛寨",
                village_money: "金窟LV%s",
                village_exp: "宝穴LV%s",
                tower_title: "天空竞技场",
                tower_content: "%s层",
                wanted_title: "流星街%s第%s关",
                wanted_content: "通缉要犯%s",
                train_title: "特训",
                league_instance: "%s",
                license_content: "%s星",
                license_title: "猎人执照",


                pve_normal_title: "%s",
                pve_elite_title: "%s",
                pve_tower_title: "天空竞技场%s",
                pve_hightower_title: "高阶竞技场%s",
                pve_wanted_title: "%s",
                pve_leagueMon_title: "公会副本-%s",
                pve_leagueBoss_title: "%s", // 公会boss-
                pvp_arena_title: "格斗场-%s",
                pvp_license_title: "%s",
                pve_zorkboss_title: "世界boss-%s",
            },

            ReplayMsg_Error: "战报已经过期",
            Share_Success: "恭喜您分享成功",
            LV: "LV%s",
            Chat: {
                // 后面备注为%s的内容
                // 普通副本
                [3]: "<text>%s在挑战%s时大获全胜，简直霸气外漏，大家快去围观一下吧！</text>",       //`普通副本2-1`
                [4]: "<text>%s在挑战%s时不幸战败，跪求安慰，大家快去围观一下吧！</text>",          //`普通副本2-1`

                // 精英副本
                [5]: "<text>%s在挑战%s时大获全胜，简直霸气外漏，大家快去围观一下吧！</text>",       //`精英副本3-2`
                [6]: "<text>%s在挑战%s时不幸战败，跪求安慰，大家快去围观一下吧！</text>",          //`精英副本3-2`

                // 伏牛金窟
                [7]: "<text>%s在挑战伏牛%s时大获全胜，简直霸气外漏，大家快去围观一下吧！</text>",    //`金窟LV99`
                [8]: "<text>%s在挑战伏牛%s时不幸战败，跪求安慰，大家快去围观一下吧！</text>",       //`金窟LV99`

                // 伏牛宝穴
                [9]: "<text>%s在挑战伏牛%s时大获全胜，简直霸气外漏，大家快去围观一下吧！</text>",    //`宝穴LV99`
                [10]: "<text>%s在挑战伏牛%s时不幸战败，跪求安慰，大家快去围观一下吧！</text>",      //`宝穴LV99`

                // 天空竞技场
                [11]: "<text>%s在挑战天空斗技场第%s时大获全胜，简直霸气外漏，大家快去围观一下吧！</text>",//`300层`
                [12]: "<text>%s在挑战天空斗技场第%s时不幸战败，跪求安慰，大家快去围观一下吧！</text>",   //`300层`

                // 本服格斗
                [15]: "<text>%s在本服格斗中将擂主%s一举击败，取而代之晋级榜上第%d名，大家快去围观一下吧！</text>",
                [16]: "<text>%s在本服格斗中挑战榜上第%d名的擂主%s，却被打得落花流水，大家快去围观一下吧！</text>",

                // 矿洞
                [19]: "<text>%s肆无忌惮地对%s的%s发起掠夺，并将其保镖%s打得落花流水，大家快去围观一下吧！</text>",
                [20]: "<text>%s妄图抢夺%s的%s，却被其保镖%s的强大阵容所震慑，不幸手滑落败，大家快去围观一下吧！</text>",
                [21]: "<text>%s肆无忌惮地对%s的%s发起掠夺，并将矿主的守军打得落花流水，大家快去围观一下吧！</text>",
                [22]: "<text>%s妄图抢夺%s的%s，却被矿主的强大阵容所震慑，不幸手滑落败，大家快去围观一下吧！</text>",

                // 通缉令
                [23]: "<text>%s在流星街挑战旅团成员%s大获全胜，简直霸气外漏，大家快去围观一下吧！</text>",    //`（通缉犯）董卓`
                [24]: "<text>%s在流星街挑战旅团成员%s时不幸战败，跪求安慰，大家快去围观一下吧！</text>",      //`（通缉犯）董卓`

                // 特训
                [25]: "<text>%s在挑战特训官%s时顺利达成目标，值得鼓励，大家快去围观一下吧！</text>",   //`（特训官）董卓`
                [26]: "<text>%s在挑战特训官%s时不慎任务失败，十分可惜，大家快去围观一下吧！</text>",   //`（特训官）董卓`

                // 公会副本
                [29]: "<text>%s在挑战%s-%s时大获全胜，简直霸气外漏，大家快去围观一下吧！</text>",
                [30]: "<text>%s在挑战%s-%s时不幸战败，跪求安慰，大家快去围观一下吧！</text>",          //`普通副本2-1`

                // 联赛
                [35]: "<text>%s联赛中将%s一举击败，大家快去围观一下吧！</text>",
                [36]: "<text>%s在联赛中挑战%s，却被打得落花流水，大家快去围观一下吧！</text>",
                [39]: "<text>%s跨服战中将%s一举击败，大家快去围观一下吧！</text>",
                [40]: "<text>%s在跨服战中挑战%s，却被打得落花流水，大家快去围观一下吧！</text>",
                //[3] : "<text>%s分享了攻打</text><color>r:255,g:80,b:0</color><text>伏牛%s</text><text>的战报，大家快去看吧！</text>",       //`金窟LV99`
                //[4] : "<text>%s分享了攻打</text><color>r:255,g:80,b:0</color><text>伏牛%s</text><text>的战报，大家快去看吧！</text>",       //`宝穴LV99`
                //[5] : "<text>%s分享了一场挑战</text><color>r:255,g:80,b:0</color><text>天空竞技场%s</text><text>的战报，大家快去看吧！</text>",  //`300层`
                //[7] : "<text>%s分享了一场</text><color>r:255,g:80,b:0</color><text>本服格斗</text><text>战报，大家快去看吧！</text>",
                //[10] : "<text>%s分享了一场</text><color>r:255,g:80,b:0</color><text>抢矿</text><text>战报，大家快去看吧！</text>",
                //[11] : "<text>%s分享了一场捉拿通缉犯</text><color>r:255,g:80,b:0</color><text>%s</text><text>的战报，大家快去看吧！</text>",   //`（通缉犯）董卓`
                //[12] : "<text>%s分享了一场挑战</text><color>r:255,g:80,b:0</color><text>特训官%s</text><text>的战报，大家快去看吧！</text>",   //`司马懿`
                [43]: "<text>%s在敌犯大本营%s大获全胜，简直霸气外漏，大家快去围观一下吧！</text>",    //`（通缉犯）董卓`
                [44]: "<text>%s在敌犯大本营%s时不幸战败，跪求安慰，大家快去围观一下吧！</text>",      //`（通缉犯）董卓`
            },
        },

        TextsConfig_Pk: {
            open: "%s级开启",
            enemy: {
                name: "<color>r:235,g:208,b:118</color><text>%s</text>",
                sever: "<color>r:235,g:208,b:118</color><text>%s</text>",
                battle: "<color>r:255,g:255,b:255</color><text>战力:</text><color>r:0,g:249,b:0</color><text>%s</text>",
                score: "%s段 %s分",
                level: "<color>r:255,g:255,b:255</color><text>等级:</text><color>r:0,g:249,b:0</color><text>%s</text>",
            },
            battle: "战力:%s",
            rank_interval: {
                [1]: "第%s名",
                [2]: "第%s-%s名",
            },
            award_fresh: {
                [1]: "<text>(每日</text><color>r:235,g:208,b:118</color><text>%s点</text><text>结算奖励)</text>",
                [2]: "赛季结束后结算奖励",
            },
            tipFresh: {
                [1]: "提示: 今日排行榜实时刷新",
                [2]: "提示: 昨日排行榜每日%s点更新",
                [3]: "提示: 天下第一榜每赛季结束时更新",
            },
            freshTime: "%s秒后可刷新",
            show_jifen: "积分:%s分以上",
            point: "点",
            grade: "%s分",
            order: "第%s名",
            pkLeft: "<color>r:0,g:0,b:0</color><text>剩余比试次数：%s/%s</text>",
            buyLeft: "剩余%s次",
            notUp: "第%s队至少需要1人上阵",
            pkChallengeNumEmptyToVip: "您今日的挑战次数已至上限，提升VIP等级可购买更多比试次数，是否前往充值以提升VIP等级?",
            DoYouGoOut: "您确认离开调整界面吗？离开将不保存对阵容的调整。",
            pkHaveNotEnoughtTimes: "比试次数不足，是否购买",
            buyNumTip: "<text>是否花费</text><color>r:200,g:38,b:0</color><text>%d钻石</text><text>购买</text><color>r:200,g:38,b:0</color><text>%d次</text><text>比试次数？（今日剩余购买次数：</text><color>r:200,g:38,b:0</color><text>%d/%d</text><text>）</text>",
            buyChallengeNumSuccessTip: "购买成功",
            nextOpenTime: "<color>r:255,g:0,b:0</color><text>%s天后开启新赛季</text>",
            nextOpenTimes: "<color>r:255,g:0,b:0</color><text>%s小时后开启新赛季</text>",
            norank: {
                name: "虚位以待",
                qu: "暂无区服",
                battleValue: "战力不详",
                rank: "暂未上榜",
                score: "暂无积分",
                level: "暂无段位",
                rangking: "暂无排行",
            },
            rank: {
                order: "第%s名",
                level: "%s段",
                score: "%s分",
                noTitile: "暂无称号",
            },
            attack_info: {
                level: "Lv%s",
                server: "区服：%s",
                battle: "战斗力:%s",
            },
            battlePoints: "积分:%d",
            battleReward: "+%d",
            disenter: {
                close: "跨服战处于关闭阶段，请等待下一轮开启",
                skip: "您未能参加本轮跨服战，请等待下一轮开启",
            },
            otherNeedScore: "再获得%s积分可升至%s段",
            getMaxLevel: "已达到最大段位",
            curScores: "当前积分: %s/%s",
        },

        TextsConfig_Wanted: {
            openLevel: "队伍等级达到%s级开启%s",
            openLevel2: "   通关%s%s关开启",
            openLevel3: "通关%s关%s开启",
            noTimes: "购买次数不足",
            buyNumTip: "是否花费%s钻石，购买%s次挑战机会？\n（今日剩余购买次数：%s/%s）",
            buyChallengeNumSuccessTip: "购买成功",
            level: "第%s关",


            lv: "Lv%s",

            floor: "第%s层",


            Time: "<color>r:230,g:210,b:100</color><text>副本将在</text>%s<color>r:230,g:210,b:100</color><text>后重置</text>",

            hxh_name: {
                [1]: "街道外围",
                [2]: "废物堆填区",
                [3]: "病毒隔离区",
                [4]: "街道外围",
                [5]: "废物堆填区",
                [6]: "病毒隔离区",
            },

            name: {
                [1]: "信物大盗",
                [2]: "卡片大盗",
                [3]: "宝石大盗",
            },

            sname: {
                [1]: "巨石洞穴",
                [2]: "戈壁荒丘",
                [3]: "冰原匪窟",
            },

            hard: {
                [1]: "普通",
                [2]: "困难",
                [3]: "地狱",
            },

            reward: {
                [1]: "中量刻印材料",
                [2]: "大量刻印材料",
                [3]: "超大量刻印材料",
            },

            goods: "神秘奖励",

            chat:
            `
    <color>r:200,g:38,b:0</color><text>%s</text>
    <text>从宝箱中获得了</text>
    <color>r:255,g:80,b:0</color><text>%sx%d</text>
    `,
            errFormat: "该猎人已经阵亡，无法上阵。",


            title1: "通缉要犯",
            title2: "缉拿进度%d/%d",
            free1: "免费%d次",

            buff: "激励：%s",

            level_error: "%d级可挑战",



            show_item_not_start: "%s x%d",
            show_item_is_start: "<text>%s </text><color>r:255,g:255,b:0</color><text>(%d/%d)</text>",

            vip_wipe: "(VIP %d 免费)",

            inst_name: {
                [1]: "绿林山贼",
                [2]: "沙谷悍匪",
                [3]: "冰原鬼盗",
            },

            wipe: "<text>是否花费</text><color>r:200,g:38,b:0</color><text>%d钻石</text><text>进行一键扫荡？</text>",

            mission: "第%s关",

            tips1: "请先通关上一关卡",
            tips2: "请先通关本场景所有关卡",

            cost_tips: "%s不足",

            mob_level: "等级:%s",

            noOpen: "暂未开放",

            buyEliteTimesMax: "今日已达到最大购买次数",
            buyEliteTimes: "<text>是否花费</text><color>r=200,g=38,b=0</color><text>%s</text><text>钻石，购买</text><color>r=200,g=38,b=0</color><text>%s张</text><text>%s？</text> \n <text>（今日剩余购买次数：</text><color>r=200,g=38,b=0</color><text>%s/%s</text><text>）</text>",
        },

        TextsConfig_Teach: {
            entryDes: "那场大战过后，神鹰门迅速统治了世界，人间笼罩在一片黑暗之中。。。",
        },

        TextsConfig_Train: {
            transformName: "需要:%s",
            transformCondition: "满足条件:猎人%s星%s级",
            transformLevelERR: "玩家等级不足",
            transformNoCopy: "当前没有进行中的猎人副本",
            transformEnough: "已经选择符合猎人",
            Attri: {
                [1]: "生命+%s",
                [2]: "攻击+%s",
                [3]: "防御+%s",
                [4]: "效果命中+%s%%",
                [5]: "效果抵抗+%s%%",
                [6]: "暴击概率+%s",
                [7]: "x技能暴击+%s",
                [8]: "暴击伤害+%s",
                [9]: "暴击抵抗+%s",
                [10]: "格挡率<+%s",
                [11]: "忽视格挡+%s",
                [12]: "忽视防御+%s",
                [13]: "x忽视魔防+%s",
                [14]: "x终伤附加+%s",
                [15]: "x终伤减免+%s",
                [16]: "怒气减免+%s",
                [17]: "x攻击+%s",
                [18]: "x防御+%s",
                [19]: "x暴击+%s",
                [20]: "x忽视防御+%s",
                [21]: "异常抵抗+%s",
                [22]: "忽视异常抵抗+%s",
                [23]: "浮空抵抗+%s",
                [24]: "速度+%s",
                [25]: "援护怒气+%s",
            },
        },

        TextsConfig_Hunter_Trans: {
            transformName: "需要:%s",
            transformCondition: "满足条件:猎人%s星%s级",
            transformLevelERR: "玩家等级不足",
            transformNoCopy: "当前没有进行中的猎人副本",
            transformEnough: "已经选择符合猎人",
            Attri: {
                [1]: "生命+%s",
                [2]: "攻击+%s",
                [3]: "防御+%s",
                [4]: "效果命中+%s%%",
                [5]: "效果抵抗+%s%%",
                [6]: "暴击概率+%s",
                [7]: "x技能暴击+%s",
                [8]: "暴击伤害+%s",
                [9]: "暴击抵抗+%s",
                [10]: "格挡率<+%s",
                [11]: "忽视格挡+%s",
                [12]: "忽视防御+%s",
                [13]: "x忽视魔防+%s",
                [14]: "x终伤附加+%s",
                [15]: "x终伤减免+%s",
                [16]: "怒气减免+%s",
                [17]: "x攻击+%s",
                [18]: "x防御+%s",
                [19]: "x暴击+%s",
                [20]: "x忽视防御+%s",
                [21]: "异常抵抗+%s",
                [22]: "忽视异常抵抗+%s",
                [23]: "浮空抵抗+%s",
                [24]: "速度+%s",
                [25]: "援护怒气+%s",
            },

        },

        TextsConfig_Gift: {
            // primer : "原价:%s",
            old_solider: "<color>r:235,g:208,b:118</color><text>欢迎您重新回到无双大陆!特为您送上五日登录礼包</text>",
            gold_str: "<color>r:235,g:208,b:118</color><text>%s</text>",
            all_need_get_1: "<color>r:235,g:208,b:118</color><text>1、每日登录均可领取一份奖励!</text>",
            all_need_get_2: "<color>r:235,g:208,b:118</color><text>2、礼物需要在</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>天内全部领取呦!</text>",
            token: "<color>r:235,g:208,b:118</color><text>%s钻石</text>",
            no_point: "<color>r:255,g:38,b:38</color><text>无此计费点</text>",
            can_buy: "<color>r:235,g:208,b:118</color><text>礼包限购</text><color>r:%s,g:%s,b:%s</color><text>%s</text><color>r:235,g:208,b:118</color><text>次</text>",
            each_can_buy: "<color>r:235,g:208,b:118</color><text>每种礼包限购</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>次</text>",
            see_more: "再看一眼呗~",
            get_after_buy: "购买后可领取%s天",
            get_after_buy2: "购买后立即获得",
            login_gift_3: "<color>r:235,g:208,b:118</color><text>恭喜获得六星猎人</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>!特为您送上三日登录礼包</text>",
            login_gift_5: "<color>r:235,g:208,b:118</color><text>恭喜获得七星猎人</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>!特为您送上五日登录礼包</text>",
            upToTime: {
                [1]: "<color>r:0,g:249,b:0</color><text>%s</text><text>天后到期</text>",
                [2]: "<color>r:0,g:249,b:0</color><text>%s</text><text>小时后到期</text>",
                [3]: "<color>r:0,g:249,b:0</color><text>%s</text><text>分后到期</text>",
                [4]: "<color>r:255,g:38,b:38</color><text>已到期</text>",
            },
            upToStock: {
                [1]: "<color>r:0,g:249,b:0</color><text>%s</text><text>天后下架</text>",
                [2]: "<color>r:0,g:249,b:0</color><text>%s</text><text>小时后下架</text>",
                [3]: "<color>r:0,g:249,b:0</color><text>%s</text><text>分后下架</text>",
                [4]: "<color>r:255,g:38,b:38</color><text>已下架</text>",
            },
            upToOpTime: {
                [1]: "<text>剩余时间:</text><color>r:0,g:249,b:0</color><text>%s</text><text>天</text>",
                [2]: "<text>剩余时间:</text><color>r:0,g:249,b:0</color><text>%s</text><text>小时</text>",
                [3]: "<text>剩余时间:</text><color>r:0,g:249,b:0</color><text>%s</text><text>分</text>",
                [4]: "<color>r:255,g:38,b:38</color><text>已到期</text>",
            },
            upToTime2: {
                [1]: "<color>r=72,g=72,b=72</color><text>%s</text><color>r=136,g=34,b=221</color><text>天</text><color>r=72,g=72,b=72</color><text>%s</text><color>r=136,g=34,b=221</color><text>时</text><color>r=72,g=72,b=72</color><text>%s</text><color>r=136,g=34,b=221</color><text>分后到期</text>",
                [2]: "<color>r=72,g=72,b=72</color><text>%s</text><color>r=136,g=34,b=221</color><text>小时</text><color>r=72,g=72,b=72</color><text>%s</text><color>r=136,g=34,b=221</color><text>分后到期</text>",
                [3]: "<color>r=72,g=72,b=72</color><text>%s</text><color>r=136,g=34,b=221</color><text>分后到期</text>",
                [4]: "<color>r=255,g=38,b=38</color><text>未获得</text>",
            },
            upToTime3: {
                [1]: "<color>r:255,g:216,b:60</color><text>剩余:</text><color>r:102,g:255,b:0</color><text>%s</text><color>r:255,g:216,b:60</color><text>天</text>",
                [2]: "<color>r:255,g:216,b:60</color><text>剩余:</text><color>r:102,g:255,b:0</color><text>%s</text><color>r:255,g:216,b:60</color><text>小时</text>",
                [3]: "<color>r:255,g:216,b:60</color><text>剩余:</text><color>r:102,g:255,b:0</color><text>%s</text><color>r:255,g:216,b:60</color><text>分</text>",
                [4]: "<color>r:255,g:216,b:60</color><text>已到期</text>",
            },
            upToStock2: {
                [1]: "<color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>天</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>时</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>分后下架</text>",
                [2]: "<color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>小时</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>分后下架</text>",
                [3]: "<color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>分后下架</text>",
                [4]: "<color>r:255,g:38,b:38</color><text>已下架</text>",
            },
            gift: {
                all_limit: {   //  限时限购
                    limit: "<color>r:235,g:208,b:118</color><text>限购</text><color>r:%s,g:%s,b:%s</color><text>%s</text><color>r:235,g:208,b:118</color><text>个</text>",
                },
                free: "免费",
                count_limit: {     //  限购
                    week_buy: "<text>每周限购%s个</text>",
                    day_buy: "<text>每日限购%s个</text>",
                    week_last: "<text>本周剩余数量:</text><color>r:%s,g:%s,b:%s</color><text>%s</text>",
                    day_last: "<text>今日剩余数量:</text><color>r:%s,g:%s,b:%s</color><text>%s</text>",
                    week_lasts: "<text>本周剩余数量:</text>",
                    day_lasts: "<text>今日剩余数量:</text>",
                    lasts: "<text>      剩余数量:</text>",
                },
                time_limit: {      //  限时
                    can_get: "<color>r:60,g:255,b:0</color><text>今日可领</text>",
                    not_get: "<color>r:255,g:255,b:0</color><text>今日已领</text>",
                    get_pro: "<text>领取进度:</text>",
                    per_str: "%s/%s",
                    per_str2: "<text>%s/%s</text>",

                },
                month_limit: {    // 月卡类型
                    can_buy: "<text>限购%s个</text>",
                    has_last: "<text>剩余%s个</text>"
                },
                fund_limit: {   // 基金类型
                    next_pro: "<text>下次领取等级:</text><color>r:%s,g:%s,b:%s</color><text>%s</text><text>/%s</text>",
                    can_get: "<color>r:60,g:255,b:0</color><text>当前可领</text>",
                    not_get: "<color>r:255,g:38,b:0</color><text>不可领</text>",
                    can_buy: "%s以下可购买",
                    forever: "剩余时间:永久",
                    get_out: "已领完",
                },
                popc: {
                    [1]: "<color>r:60,g:255,b:0</color><text>限购 </text>%s<color>r:60,g:255,b:0</color><text> 个</text>",
                    [2]: "<color>r:60,g:255,b:0</color><text>每日限购 </text>%s<color>r:60,g:255,b:0</color><text> 个</text>",
                    [4]: "<color>r:60,g:255,b:0</color><text>每周限购 </text>%s<color>r:60,g:255,b:0</color><text> 个</text>",
                    [5]: "<color>r:60,g:255,b:0</color><text>不限制购买</text>",
                },
            },
            first_get_award: {
                [1]: "购买可一次性获得如下物品:",
                [2]: "购买可一次性获得如下物品:",
                [3]: "首次领取一次性可获得如下物品:",
            },
            after_get_award: "之后%s天还可每天领取",
            has_bought: "已购买",

            todaySeven: "今日%s折",
            primer: "原价：%s"
        },

        TextsConfig_Convert: {
            once_convert: "只可兑换一次",
            time_convert: "%s/次",
            day_limit_times: "每日可兑换%s次",
            week_limit_times: "每周可兑换%s次",
            t_day_times: "今日还可兑换%s次",
            t_week_times: "本周还可兑换%s次",
            day_times_sold_out: "已达到每日兑换次数上限，请明日再来",
            week_times_sold_out: "已达到每周兑换次数上限，请下周再来",
            not_enough: "所需材料不足",
            no_material: "无需其他材料",
            full_use: "所需材料已满",
            upToStock: {
                [1]: "<color>r:235,g:208,b:118</color><text>剩余时间:</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>天</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>时</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>分</text>",
                [2]: "<color>r:235,g:208,b:118</color><text>剩余时间:</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>小时</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>分</text>",
                [3]: "<color>r:235,g:208,b:118</color><text>剩余时间:</text><color>r:0,g:249,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>分</text>",
                [4]: "",
            },
            once_buy: "<color>r:235,g:208,b:118</color><text></text>",
            up: "以上",
            convert_gap: {
                [1]: "兑换间隔",
                [2]: "本日兑换次数:",
                [3]: "本周兑换次数:",
            },
        },

        TextsConfig_Charge: {

            monthGo: "月卡剩余天数小于10天才可以续卡哦",
            doubleText: "首次充值额外赠送%s钻石",
            normalText: "额外赠送%s钻石",
            monthText: "立得%s钻石，每天可领%s钻石",
            chargeSuccess: "恭喜，充值成功！",
            noPay: "不可购买",
        },

        TextsConfig_Rpg: {
            leave_error: {
                [1]: "正在攻打建筑中，不能退出",
                [2]: "正在采集果树，不能退出",
            },
            free: "本次免费",
            no_scene: "您不在场景中",
        },

        TextsConfig_Wonderland: {

            fruit_cnt_label: "数量：%d个",
            fruit_can_pick: "可采集",
            fruit_mature_time_label: "%s后成熟",
            fruit_unknown_time_lable: "??:??:??后成熟",
            fruit_next_time_lable: "下次成熟:%s点",
            pop_name: "场景名称：%s",
            pop_time: "开放时间：%s",
            pop_time_all_day: "全天",
            pop_time_normal: "%s时~%s时",
            pop_mode: "战斗模式：%s",
            pop_mode_peace: "和平（不允许玩家之间的战斗）",
            pop_mode_war: "战斗（允许玩家之间的战斗）",
            pop_level: "准入等级：%s级~%s级",
            pop_level_max: "准入等级：%s级以上可进入",
            pop_tree: "果树产出：%s",

            level_max: "%s级以上可进入",
            level_nor: "%s~%s级可进入",

            first_free: "首次免费",

            return_tip: "确认离开当前场景吗？",
            no_wonderland: "您不在仙境场景中",
            wonderland_get_tips: "<color>r:%s,g:%s,b:%s</color><text>%s</text><color>r:255,g:255,b:0</color><text>× %s</text>",
            wonderland_lose_tips: "<text>%s x%s</text>",
            no_Rogue: "当前没有可开启的包裹，采集果树有几率获得",

            plate2: "下次能量胶囊恢复时间",
            plate3: "恢复全部能量胶囊时间",
            plate4: "恢复能量胶囊时间间隔",
            plate6: "当前时间",
            getGoods: "<color>r:0,g:249,b:0</color><text>获得</text>",
            loseGoods: "<color>r:255,g:38,b:38</color><text>损失</text>",
            die_error_tips: "死亡状态不能进行此操作",
            battle_error_tips: "战斗中不能进行此操作",

            buy_plate: "<text>是否花费</text><color>r:200,g:38,b:0</color><text>%d</text><text>钻石，购买</text><color>r:200,g:38,b:0</color><text>%d</text><text>个能量胶囊？（今日剩余购买次数：%d/%d）</text>",

            err_buy_plate: "<text>今日已买能量胶囊</text><color>r:200,g:38,b:0</color><text>%d/%d</text><text>次，\n提升VIP等级可增加次数，\n是否前往充值提升VIP？</text>",

            auto_format_success: "布阵成功",

            change_to_peace: "切换为和平模式",
            change_to_battle: "切换为战斗模式",
            change_to_kill: "切换为杀戮模式",
            can_not_change: "该仙境不能切换模式",
            pk_tips: "该场景允许自由PK，可切换三种对战模式",

            change_clear_tips: "当前罪恶值为%s，需要将罪恶值清除才可切换到其他模式，是否花费%s钻石清除（每点5钻石）？",
            clear_tips: "是否花费%s钻石，清除%s罪恶值？",
            clear_success_tips: "罪恶值已清除",
            clear_zero: "罪恶值已为0",

            person_gather: "采集进度:%d%%",

            die_tips: "<text>惩罚提示:当前罪恶值</text><color>r:255,g:0,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>,将增加</text><color>r:255,g:0,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>秒复活时间</text>",
            evil_tips_add: "<color>r:255,g:0,b:0</color><text>罪恶值 +%s</text>",
            evil_tips_sub: "<color>r:0,g:255,b:0</color><text>罪恶值 -%s</text>",
            mobs_debuff: "您已进入打怪疲劳期，物品掉落数量将会受到影响！",

            buff_tips_frozen: "<color>r:255,g:255,b:255</color><text>糟糕！触碰冰冻机关，</text><color>r:255,g:0,b:0</color><text>%d秒内</text><color>r:255,g:255,b:255</color><text>无法移动</text>",
            buff_tips_bomb: "<color>r:255,g:255,b:255</color><text>糟糕！触碰爆炸机关，血量减少</text><color>r:255,g:0,b:0</color><text>%d%%</text>",
            buff_tips_fast: "<color>r:255,g:255,b:255</color><text>恭喜！触碰急速机关，速度提升</text><color>r:0,g:255,b:0</color><text>%d%%</text>",
            buff_tips_recover: "<color>r:255,g:255,b:255</color><text>恭喜！触碰加血机关，血量恢复</text><color>r:0,g:255,b:0</color><text>%d%%</text>",
            buff_tips_collectDouble: "<color>r:255,g:255,b:255</color><text>恭喜！触碰加倍机关，本次果实</text><color>r:0,g:255,b:0</color><text>数量加倍</text>",
        },

        TextsConfig_WonderlandBoss: {
            bossName: "炸弹魔",
            rewardRank: "第%s名",
            rewardRank1: "第%s名",
            rewardRank2: "第%s名\n至%s名",
            rewardRank3: "%s名外",
            killer: "击杀者",
            disAttend: "未上榜",
            timeToOpen: "<color>r:255,g:38,b:0</color><text>%s后开启</text>",
            timeToEnd: "<color>r:60,g:255,b:0</color><text>%s后结束</text>",
            timeToOpen2: "<color>r:255,g:255,b:255</color><text>活动将在</text><color>r:200,g:38,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>后开启</text>",
            timeToEnd2: "<color>r:255,g:255,b:255</color><text>活动将在</text><color>r:0,g:200,b:0</color><text>%s</text><color>r:255,g:255,b:255</color><text>后结束</text>",
            timeToOpen3: "<color>r=255,g=255,b=255</color><text> 距离活动开始：</text><color>r=200,g=38,b=0</color><text>%s</text>",
            timeToEnd3: "<color>r=255,g=255,b=255</color><text>距离入口关闭</text><color>r=0,g=200,b=0</color><text>%s</text>",
            timeLast: "剩余时间: %s",
            bossLevel: "Lv%s",
            winKill: "<text>恭喜玩家</text><color>r:0,g:200,b:0</color><text>%s</text><text>完成最后一击！</text>",
            loseKill: "<text>共对</text><color>r:255,g:200,b:0</color><text>炸弹魔</text><text>造成</text><color>r:0,g:200,b:0</color><text>%s(%.2f%%)</text><text>的伤害！</text>",
            comat: "战斗力:%s",
            perDemage: "%s(%s%)",
            totalDamage: "%s",
            exitScene: "您已离开场景，请重新进入！",
            perBlood: "%.2f%%",
            lastPerBlood: "剩余血量:%s%%",
            lasBossBlood: "剩余血量:? ? ?",
            war_end_tips: "活动已结束,请您尽快退出场景",
            die_error_tips: "死亡状态不能进行此操作",
            too_fast: "操作过快 请稍后再试",
            not_start: "战斗尚未开始",
            boss_tips_city: "世界BOSS已经开启，您是否前往挑战？",
            boss_not_open: "世界BOSS未开启",
            role_level: "Lv.%s",
        },

        TextsConfig_Share: {
            ShareTexts: {
                [0]: "这个暑假最火的卡牌游戏，开黑走起！",
                [1]: "开局十连抽，神卡快速养成！",
                [2]: "平民狂虐土豪，不玩你就亏大了！",
                [3]: "大开眼界！卡牌还能这么玩！",
                [4]: "终于解锁黑暗大陆，前方高能预警！",
                [5]: "无愧经典，这才叫卡牌！",
            }
        },

        TextsConfig_Runes: {
            magicGet: "<color>r:0,g:200,b:0</color><text>参与魔域内活动玩法可获得魔晶~</text>",
            freeCharm: {
                [1]: "<color>r:0,g:200,b:0</color><text>%s/%s</text>",
                [2]: "<color>r:200,g:38,b:0</color><text>%s/%s</text>",
            },
            RunesTime: {
                [1]: "<color>r:0,g:200,b:0</color><text>%s/%s</text>",
                [2]: "<color>r:200,g:38,b:0</color><text>%s/%s</text>",
            },
            CharmLast: "免费：(%s/%s)",
            Get: "确定领取奖励吗?",
            AlreadyGet: "由于您未及时领取奖励，奖励请到邮箱查看。",
            ReLogin: "请重新登录。",

        },

        TextsConfig_Artifact: {
            hostChange: "%s的宿主更替为%s",
            hostNone: "宿主：暂无",
            hostName: "宿主：%s",
            hostUsed: "已装备%s",
            hostSure: "当前猎人已装备神兵%s，是否替换？",
            hostSame: "TA已经是这把神兵的宿主了",
            wearSure: "该神兵已有宿主%s，装备后原宿主神兵槽位将置空，是否继续？",
            wearSame: "已装备该神兵",
            lockClear: "%s级可洗练",
            lockJade: "%s级可镶嵌",
            unknown: "???",
            attrMax: "上限",
            attrAdd: "+",
            attrReduce: "-",
            // 物理攻击 + 600 +300（上限 +1000）
            attrFormat: "%s%s%s（%s%s）",
            attrNext: "%s%s%s+%s/%s+%s",
            attrDes: {
                general_hp: "生命",
                general_atk: "攻击",
                general_def: "防御",
                skill_atk: "效果命中",
                skill_def: "效果抵抗",
                atk_crit: "暴击概率",
                skill_crit: "技能暴击",
                crit_extra: "暴击伤害",
                crit_resistance: "暴击抵抗",
                dodge_rate: "格挡率",
                hit_rate: "忽视格挡",
                ignore_phyDef: "忽视物防",
                ignore_magicDef: "忽视魔防",
                final_extra: "终伤附加",
                final_reduce: "终伤减免",
                rage_reduce: "怒气减免",
                general_atk_all: "攻击",
                general_def_all: "防御",
                all_crit: "暴击",
                ignore_def_all: "忽视防御",
                universal_resistance: "异常抵抗",
                ignore_resistance: "忽视异常抵抗",
                float_resistance: "浮空抵抗",
                cd_speed: "速度"
            },
            lockErr: "最多可锁定%s条属性",
            clearWarn: "继续洗练将丢弃当前洗练结果，\n建议替换属性后再进行。\n是否确认丢弃结果并继续洗练？",
            breakCond: "已达成%s/%s",
            breakTip: "三条属性均洗练至%s",
            washVIP: "VIP %s级即可解锁连洗%s次功能，是否前往充值提升VIP等级？",
            notHave: "未召唤该神兵",
            lackSplit: "神兵碎片不足",
            lackJunior: "洗练石不足",
            skillLv: "Lv%s",

            jade_lock: "%d级解锁",
            jade_free: "免费(%d/%d)",
            jade_rand: "直接升级概率：%d%%",
            jade_dscp: "%s x%d",
            jade_cost: "请输入0-5000之间的整数",
            jade_cost_less: "设置的钻石数不可超过拥有数量",
            jade_cost_little: "您设置的钻石数过低",
            jade_error_jade: "尚未勾选参与磨洗的玉石",
            jade_error_type: "尚未勾选期望的玉石类型",
            jade_error_types: "参与磨洗的玉石类型与期望类型不能相同",
            jade_wash: "您期望的玉石类型为：%s。消耗钻石数超过%d时将停止自动磨洗。\n是否确认并开始自动磨洗？",
            jade_type: ["攻击", "生命", "防御", "暴击", "闪避", "命中",],
            jade_comma: "、",
            jade_result_null: "未获得期待类型的宝石",

            jade_compose: "获得 %s x %d",
            jade_compose_error: "玉石已经是最高等级",
            jade_compose_null: "参与合成的玉石不足",

            jade_tips_all: "所有玉石",
            jade_tips_src: "已筛选玉石",
            jade_tips_wsh: "待磨洗的玉石",

            jade_error_no_jade: "您暂无宝石",
            jade_error_same_jade: "已经镶嵌了这颗宝石",

            jade_click_close: "是否终止自动磨洗？",
            jade_click_stop: "是否确认停止自动磨洗？",
            jade_click_quick: "是否直接结算？",
            jade_vip_wash: "达到VIP %d级可开启自动磨洗功能",
            jade_vip_fast: "达到VIP %d级可开启快速合成功能",

            jade_result_format: "<text>此次自动磨洗，共花费了</text><color>r:255,g:255,b:0</color><text>%d钻石</text><text>， 磨洗了</text><color>r:255,g:255,b:0</color><text>%d次</text><text>，直接升级玉石</text><color>r:255,g:255,b:0</color><text>%d次</text><text>，获得期望类型玉石</text><color>r:255,g:255,b:0</color><text>%d颗</text><text>。</text>",

            jade_divide_error: "剩余可切割次数不足十次",
            jade_convert_tips: "自动磨洗中，当花费的钻石超过%d，或所选玉石已全部洗为期望类型时将停止自动磨洗。",
        },

        TextsConfig_Contend: {
            mineRank: "第%s名",
            mineRankVoid: "无",
            curScore: "当前积分：%s (%s段)",
            nextDan: "再胜利%s场对战可晋升段位",
            TopDan: "您已达到最高段位",

            succReward: "<text>胜利 </text><color>r:255,g:255,b:0</color><text>+%s</text>",
            loseReward: "<text>失败 </text><color>r:255,g:255,b:0</color><text>+%s</text>",
            timeReward: "<text>每小时 </text><color>r:255,g:255,b:0</color><text>+%s</text>",
            curCoin: "当前：%s",

            rankItemScore: "积分：%s",

            matchName: "%s lv%s",
            matchScore: "积分：%s",
            matchPower: "总战力：%s",

            rewardDanTips: "当前段位：%s (新赛季开启后，所有段位奖励将重置)",
            rewardRankTips: "当前积分排名：%s （赛季结束时将通过邮件发放排名奖励）",
            rewardDan: "(%s段积分%s-%s)",
            rewardDanMax: "(%s段积分%s以上)",

            formationSave: "<color>r:60,g:255,b:0</color><text>阵型保存成功</text>",

            rankRound: "第%s名\n至%s名",
            addtimes_tips: "是否花费%s钻石，购买%s次挑战机会？\n（今日剩余购买次数：%s/%s）",
            addtimes_success: "购买挑战次数成功",

            finalDanTips: "第%s赛季最终成绩：",
            finalScoreTips: "%s积分 （%s段）",

            finalRankTips: "第%s赛季最终排名：",

            nextTime: "<color>r:0,g:255,b:0</color><text>%s </text><color>r:255,g:255,b:255</color><text>后开启第%s赛季</text>",

            battlePoints: "积分+%d",
            battleReward: "+%d",
            lastDanTips: "根据您上一赛季的最终段位【%s】",

            powerGeneral: "%s队战力：%s",
            powerTotal: "总战力：%s",
            matchLeft: "剩余对战次数：%s/%s",
            newSeasonTips: "<color>r:255,g:0,b:0</color><text>%s天后开启新赛季</text>",
            lowLevelTips: "<color>r:255,g:0,b:0</color><text>%s级开启群英争霸</text>",

            adviserSameTips: "%s已替换至%s队",
        },

        TextsConfig_Recovery: {

            GetGeneral: "请先添加需要重生的猎人",
            GetEquip: "请先添加需要重生的装备",

            HeroTip: "确认对当前猎人进行重生吗？",
            EquipTip: "确认对当前装备进行重生吗？",

            LevelEmpty: "没有可还原的等级",
            QualityEmpty: "没有可还原的品阶",
            SkillEmpty: "没有可还原的技能",
            TalentEmpty: "没有可还原的天赋",
            StrengthEmpty: "没有可还原的等级",
            ForgeEmpty: "没有可还原的锻造",
            CarveEmpty: "没有可还原的刻印",
        },

        TextsConfig_Potato: {
            all: "全部",

            split_num: "数量:%s/%s",
            unIded: "<color>r:255,g:0,b:0</color><text>未鉴定</text>",
            none: "无",

            power: "战力:%s",
            lord: "宿主:%s",
            cur_lord: "<color>r:235,g:208,b:118</color><text>%s装备中</text>",
            cur_lord_none: "<color>r:150,g:150,b:150</color><text>空闲中</text>",

            unidTips: "<color>r:235,g:208,b:118</color><text>包含</text><color>r:0,g:255,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>条属性，鉴定可知</text>",
            unidTipes: "<color>r:235,g:208,b:118</color><text>包含</text><color>r:0,g:255,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>条属性，鉴定必得以下属性</text>",
            unidTip: "<color>r:235,g:208,b:118</color><text>包含</text><color>r:0,g:255,b:0</color><text>%s</text><color>r:235,g:208,b:118</color><text>条追加属性</text>",
            split_num_tip: "%s合1",

            attriFate: "[缘分] %s",
            attriAdd: "[附加] %s",
            attriFateNone: "<color>r:150,g:150,b:150</color><text>[缘分] 空</text>",
            attriAddNone: "<color>r:150,g:150,b:150</color><text>[附加] 空</text>",

            breakLevel: "%s级可突破",
            noPotato: "没有足够的道具用来突破",
            breakToLevel: "<color>r:235,g:208,b:118</color><text>此属性将被提升至</text>%s<color>r:235,g:208,b:118</color><text>品质</text>",
            breakNotAdd: "无可提升的附加属性",
            canUseabth: "您有可用的鉴定符，是否要使用?\n(使用鉴定符能提升出高星的概率)",
            sixAttri: "随机获得一条副属性（六星激活）",
            level: [
                "凡品·",
                "上品·",
                "极品·",
                "仙品·",
                "神品·",
            ],

            general_features: [
                "战士",
                "刺客",
                "法师",
                "弓箭手",
            ],
            fate_general: "宿主为%s时，%s",
            fate_artifact: "宿主同时装备%s时，%s",
            fate_jade: "是否将宿主原卡片上的玉石转移到此卡片上？",
            general_jade: "是否将原卡片上的玉石转移到新卡片上？",

            host_no_artifact: "无神兵",
            host_no_potato: "无卡片",

            break_tips: "请选择突破需要消耗的同名卡片  （已选择：%s/%s）",
            break_cost_enough: "<color>r:255,g:0,b:0</color><text>突破所需卡片已满</text>",

            decompose_tips: "已选择：%s/%s",
            decompose_enough: "可分解卡片已满",

            potato_attri: [
                "增加%s点持有者%s属性",
                "增加持有者%s属性的%s%%",
                "增加%s点卡片%s属性",
            ],

            potato_attri_per: "增加持有者%s%%%s属性",

            attri_unil_resis: "宿主增加%s%%异常抵抗概率",
            attri_ignore_resis: "宿主增加%s%%忽视异常抵抗概率",

            potato_fate_general: "宿主为%s时,%s",
            potato_fate_artifact: "宿主装备%s时,增加%s%%卡片属性",

            potato_host_tip: "请先选择宿主",

            potato_host_no: "设置为空闲",

            potato_break_next: "<color>r:235,g:208,b:118</color><text>再突破</text><color>r:200,g:38,b:0</color><text>%s级</text><color>r:235,g:208,b:118</color><text>可将第%s条附加属性突破至</text>%s<color>r:235,g:208,b:118</color><text>品质</text>",

            potato_fresh_break_tips: "当前卡片有未保留的刷新属性，请先完成刷新操作。",

            potato_dec_tips: "本次分解的卡片中包含稀有卡片，确认继续分解吗？",

            potato_color: {
                [1]: "白色",
                [2]: "绿色",
                [3]: "蓝色",
                [4]: "紫色",
                [5]: "橙色",
                [6]: "红色",
                [7]: "金色",
                [8]: "无敌色",
            },

            AttriStr: [
                "生命值", // 1
                "攻击", // 2
                "防御", // 3
                "效果命中", // 4
                "效果抵抗",
                "暴击概率", // 6
                "x技能暴击",
                "暴击伤害", // 8
                "暴击抵抗",
                "格挡率", // 10
                "忽视格挡",
                "忽视防御",
                "x忽视魔防",
                "x终伤附加",
                "x终伤减免",
                "怒气减免",
                "x攻击",
                "x防御",
                "x暴击",
                "x忽视防御",
                "异常抵抗",
                "忽视异常抵抗",
                "浮空抵抗",
                "速度", // 24
                "援护怒气",
            ],

            Attri: [
                "生命值+%s",
                "物理攻击+%s",
                "物理防御+%s",
                "法术攻击+%s",
                "法术防御+%s",
                "物理暴击+%s",
                "技能暴击+%s",
                "暴击伤害+%s",
                "暴击抵抗+%s",
                "闪避+%s",
                "命中+%s",
                "忽视物防+%s",
                "忽视魔防+%s",
                "终伤附加+%s",
                "终伤减免+%s",
                "怒气减免+%s",
                "攻击+%s",
                "防御+%s",
                "暴击+%s",
                "忽视防御+%s",
                "异常抵抗+%s",
                "忽视异常抵抗+%s",
                "浮空抵抗+%s",
            ],
            card_attr_pur_per: "<color>r=0,g=0,b=0</color><text>%s%%</text><color>r=8,g=134,b=214</color><text>+%s%%</text>",
            card_attr_org_per: "<color>r=0,g=0,b=0</color><text>%s%%</text><color>r=191,g=43,b=175</color><text>+%s%%</text>",
            card_no_color_per: "<text>%s%%</text>",

            card_attr_pur: "<color>r=0,g=0,b=0</color><text>%s</text><color>r=8,g=134,b=214</color><text>+%s</text>",
            card_attr_org: "<color>r=0,g=0,b=0</color><text>%s</text><color>r=191,g=43,b=175</color><text>+%s</text>",

            attri_unil_resis_color: "<text>宿主增加</text>%s<text>异常抵抗概率</text>",
            attri_ignore_resis_color: "<text>宿主增加</text>%s<text>忽视异常抵抗概率</text>",

            potato_attri_color: [
                "<text>增加</text>%s<text>点持有者%s属性</text>",
                "<text>增加持有者%s属性的</text>%s",
                "<text>增加</text>%s<text>点卡片%s属性</text>",
            ],

            potato_attri_per_color: "<text>增加持有者</text>%s<text>%s属性</text>",
        },


        TextsConfig_Life: {

            Attri: [
                "生命+%s",
                "攻击+%s",
                "防御+%s",
                "闪避+%s",
                "命中+%s",
                "暴击+%s",
                "暴抗+%s",
            ],
            complete: "完成度：%s/%s",
            imp_error: "所选道具数量不足",
            power: "推荐战力：%s",
            battle_general: "1.使用%s出战",
            battle_name: "解封挑战：%s",
            battle_Tips: "解封挑战必须出战指定猎人",

            life_1_unlock: "猎人%s星可解锁",
            life_2_unlock: "%s完成度达到%s可解锁",
            life_name: "天命",

            life_icon_open: "<color>r:0,g:255,b:0</color><text>已激活</text>",
            life_icon_colse: "<color>r:255,g:10,b:10</color><text>完成度达到%s可激活</text>",

            life_icon_tips_1: "全属性加成%s%%",
            life_icon_tips_2: "技能%s最大等级+%s",
            life_icon_tips_3: "增加1个新天赋栏位",


        },

        TextsConfig_Hunter: {
            no_soul: "当前没有猎人碎片",
            card_unlock: "队伍%s级解锁",
            count: "猎人数量:%s/%s",
            starHunter: "%s星猎人 %s",
            chooseUpStarHunter: "请选择升星猎人",
            chooseUpStarCard: "请选择升星卡片",
            chooseUpStarMet: "请选择升星材料",
            battleValue: "战斗力",
            up_battle: "战斗力提升",

            level_star_max: "<color>r=255,g=0,b=0</color><text>（升星可提升技能等级上限）</text>",
            level_break_max: "<color>r=255,g=0,b=0</color><text>（突破可提升技能等级上限）</text>",
            level_max: "所有技能等级上限",
            // level_max: "已满级",
            skill_level: "%s级",
            quality_max: "已至最高品质",

            Attri: [
                "生命值+%s", // 1
                "攻击+%s", // 2
                "防御+%s", // 3
                "效果命中+%s%%", // 4
                "效果抵抗+%s%%",
                "暴击概率+%s%%", // 6
                "x技能暴击+%s",
                "暴击伤害+%s%%", // 8
                "暴击抵抗+%s%%",
                "格挡率+%s%%", // 10
                "忽视格挡+%s",
                "忽视防御+%s",
                "x忽视魔防+%s",
                "x终伤附加+%s",
                "x终伤减免+%s",
                "怒气减免+%s",
                "x攻击+%s",
                "x防御+%s",
                "x暴击+%s",
                "x忽视防御+%s",
                "异常抵抗+%s",
                "忽视异常抵抗+%s",
                "浮空抵抗+%s",
                "速度+%s", // 24
                "援护怒气+%s",
            ],

            AttriNum: [
                "%s", // 1
                "%s", // 2
                "%s", // 3
                "%s%%", // 4
                "%s%%",
                "%s%%", // 6
                "%s",
                "%s%%", // 8
                "%s%%",
                "%s%%", // 10
                "%s",
                "%s",
                "%s",
                "%s",
                "%s",
                "%s",
                "%s",
                "%s",
                "%s",
                "%s",
                "%s",
                "%s",
                "%s",
                "%s", // 24
                "%s",
            ],

            AttriName: [
                "生命值", // 1
                "攻击", // 2
                "防御", // 3
                "效果命中", // 4
                "效果抵抗",
                "暴击概率", // 6
                "x技能暴击",
                "暴击伤害", // 8
                "暴击抵抗",
                "格挡率", // 10
                "忽视格挡",
                "忽视防御",
                "x忽视魔防",
                "x终伤附加",
                "x终伤减免",
                "怒气减免",
                "x攻击",
                "x防御",
                "x暴击",
                "x忽视防御",
                "异常抵抗",
                "忽视异常抵抗",
                "浮空抵抗",
                "速度", // 24
                "援护怒气",
            ],

            Attri1: [
                "基础生命值+%s%%", // 1
                "基础攻击+%s%%", // 2
                "基础防御+%s%%", // 3
                "基础效果命中+%s%%", // 4
                "基础效果抵抗+%s%%",
                "基础暴击概率+%s%%", // 6
                "基础x技能暴击+%s%%",
                "基础暴击伤害+%s%%", // 8
                "基础暴击抵抗+%s%%",
                "基础格挡率+%s%%", // 10
                "基础忽视格挡+%s%%",
                "基础忽视防御+%s%%",
                "基础x忽视魔防+%s%%",
                "基础x终伤附加+%s%%",
                "基础x终伤减免+%s%%",
                "基础怒气减免+%s%%",
                "基础x攻击+%s%%",
                "基础x防御+%s%%",
                "基础x暴击+%s%%",
                "基础x忽视防御+%s%%",
                "基础异常抵抗+%s%%",
                "基础忽视异常抵抗+%s%%",
                "基础浮空抵抗+%s%%",
                "基础速度+%s", // 24
                "基础援护怒气+%s",
            ],

            auto_skill: "自动技",
            active_skill: "必杀技",
            passive_skill: "被动技",
            pledge_skill: "觉醒技",
            change_skill: "变身技",

            skill_type: [
                "自动技",
                "必杀技",
                "被动技",
                "觉醒技",
                "变身技",
            ],
            unlock1: "<color>r:0,g:0,b:0</color><text>解锁：</text><color>r:1,g:130,b:40</color><text>%s·%s级</text>",
            unlock2: "<color>r:0,g:0,b:0</color><text>%s·%s级</text><text>      (最终效果)</text>",


            card_star_act: "（%s星激活）",

            not_choose_card: "您还没有选择要替换的卡片",
            card_upstar_num_max: "<color>r:255,g:0,b:0</color><text>升星所需卡片已满</text>",
            general_upstar_num_max: "升星所需猎人已满",
            defence_general: "该猎人为防守阵容猎人,不能作为升星材料",
            defence_general1: "该猎人为本服格斗场防守阵容猎人,不能作为升星材料",
            defence_general2: "该猎人为跨服格斗场防守阵容猎人,不能作为升星材料",
            defence_general3: "该猎人正在探索中,不能作为升星材料",
            defence_general4: "该猎人为飞龙营地防守阵容猎人,不能作为升星材料",
            unload_base_general: "卸载升星猎人请点击猎人头像",

            sell_defence_general: "该猎人为防守阵容猎人,不能出售",
            sell_defence_general1: "该猎人为本服格斗场防守阵容猎人,不能出售",
            sell_defence_general2: "该猎人为跨服格斗场防守阵容猎人,不能出售",
            sell_defence_general3: "该猎人正在探索中,不能出售",
            sell_defence_general4: "该猎人为飞龙营地防守阵容猎人,不能出售",

            storage_defence_general: "该猎人为防守阵容猎人,不能放入仓库",
            storage_defence_general1: "该猎人为本服格斗场防守阵容猎人,不能放入仓库",
            storage_defence_general2: "该猎人为跨服格斗场防守阵容猎人,不能放入仓库",
            storage_defence_general3: "该猎人正在探索中,不能放入仓库",
            storage_defence_general4: "该猎人为飞龙营地防守阵容猎人,不能放入仓库",

            sell_last_general: "猎人携带数量至少为1",
            sell_max: "本次出售猎人达到上限",

            storage_last_general: "猎人携带数量至少为1",
            storage_max: "本次出售猎人达到上限",

            select_num: "已选择：%s个",
            sell_succeseful: "<color>r:60,g:255,b:0</color><text>出售成功</text>",
            storage_In_succeseful: "<color>r:60,g:255,b:0</color><text>猎人入库成功</text>",
            storage_Out_succeseful: "<color>r:60,g:255,b:0</color><text>猎人出库成功</text>",
            sell_star_limit: "出售列表中包含%s星及以上猎人,确定全部出售吗？",

            card_star: "%s星",
            card_lock_tips: "<color>r:0,g:255,b:0</color><text>该卡片已锁定</text>",
            card_unlock_tips: "<color>r:0,g:255,b:0</color><text>该卡片已解锁</text>",

            card_level: "%s级",
            conditionCan: "随机获得一条副属性",

            friend_add_exp: "好感度+%s",

            storageTips: {
                In: [
                    "超出仓库数量上限",
                    "已选择猎人：%s",
                    "仓库数量：%s/%s",
                ],
                Out: [
                    "超出携带容量上限",
                    "已选择猎人：%s",
                    "携带容量：%s/%s",
                ],
            },

            card_level_level_before: "<color>r:255,g:100,b:0</color><text>%s/%s</text>",
            card_level_level_after: "<color>r:10,g:140,b:10</color><text>%s</text><color>r:255,g:100,b:0</color><text>/%s</text>",
            card_level_max: "<color>r:255,g:100,b:0</color><text>已满级</text>",
            card_break_level_max: "卡片已突破到最大等级",

            card_level_attr_before: "<color>r:255,g:100,b:0</color><text>%s</text>",
            card_level_attr_after: "<color>r:10,g:140,b:10</color><text>%s</text>",
            card_level_attr_max: "<color>r:255,g:100,b:0</color><text>最大值</text>",

            card_star_max: "卡片等级达到%s/%s级",

            card_be_hosted: "该卡片被装备中,不可以作为升星材料",
            card_be_locked: "<color>r:255,g:0,b:0</color><text>该卡片被锁定中，不可以作为升星材料</text>",
            card_be_first: "本次升星的目标卡片不能做为升星材料",
            hunter_be_first: "本次升星的目标猎人不能做为升星材料",
            card_is_full: "卡片已达携带上限，请到邮箱查收",
            card_be_break: "该卡片被装备中,不可以作为突破材料",
            card_be_lock: "<color>r:255,g:0,b:0</color><text>该卡片已锁定，不可作为突破材料</text>",

            card_full_attr: "(%s级属性:+%s)",

            card_break_tips: "<text>突破材料为</text><color>r:255,g:255,b:0</color><text>%s</text><text>级的</text><color>r:25,g:227,b:68</color><text>%s卡</text>",
            card_break_rand: "<text>突破材料为</text><color>r:255,g:255,b:0</color><text>任意等级</text><text>级的</text><color>r:25,g:227,b:68</color><text>%s卡</text>",

            hunter_type: [
                "强化系",
                "放出系",
                "具现化系",
                "特质系",
                "变化系",
                "操作系",
            ],

            talent_des_trigger: "<text>有</text><color>r:200,g:50,b:25</color><text>%s%%</text><text>概率触发,</text>",

            friend_attr: "%s加成:%s%%",

            hunter_act_low_level: "%s级可激活",

            partner_tips: "<color>r:0,g:0,b:0</color><text>和</text><color>r:0,g:180,b:0</color><text>%s</text><color>r:0,g:0,b:0</color><text>一起出战可增加好感度</text>",

            hunter_partner_upgrade_not_enough: "道具不足",
            hunter_partner_enough: "好感度已满",
            hunter_partner_max_level: "关系已满级",

            recycle_success: "技能点已重置",
            add_skill_point: "技能点添加成功",

            hp: "生命值+%s",
            atk: "攻击+%s",
            def: "防御+%s",
            crit: "暴击+%s",

            //     attri:{
            //     "生命值+%s",
            //     "攻击+%s",
            //     "防御+%s",
            //     "暴击+%s",
            //    },


            attriName: [
                "生命值",
                "攻击",
                "防御",
                "暴击",
            ],

            hunter_card_type: [
                "缠系",
                "绝系",
                "练系",
                "发系",
                "圆系",
                "坚系",
                "硬系",
            ],

            card_info_num: "卡片数量 %s/%s",

            life_not_open: "念力功能暂未开启，敬请期待",

            skill_recycle_tips: "确定花费%s钻石重置当前技能等级吗?(重置后技能变回1级，且返还升级所消耗的全部技能点)",
            //pledge_skill_success : "誓约技能成功激活！",
            pledge_skill_success: "觉醒技解锁成功",


            no_partner_can_sel: "无可结伴猎人",


            awaken: "<text>觉醒材料为</text><color>r:15,g:165,b:15</color><text>同名猎人</text><text>或者同资质的</text><color>r:15,g:165,b:15</color><text>替身人偶</text>",
            awaken_next: "<text>觉醒材料为</text><color>r:15,g:165,b:15</color><text>同名猎人</text>",
            awaken_select: "<color>r:0,g:255,b:255</color><text>已选择：</text><color>r:255,g:0,b:0</color><text>%d/%d</text>",
            awaken_select_next: "<color>r:0,g:255,b:255</color><text>已选择：</text><color>r:15,g:165,b:15</color><text>%d/%d</text>",
            selectAwaken: "觉醒材料已满足条件",
            errorAwaken1: "该猎人为本服格斗场防守阵容猎人,不能作为觉醒材料",
            errorAwaken2: "该猎人为跨服格斗场防守阵容猎人,不能作为觉醒材料",
            errorAwaken3: "该猎人为探索阵容猎人,不能作为觉醒材料",
            errorAwaken4: "该猎人为飞龙营地防守阵容猎人,不能作为合成材料",

            stepAwaken: "所选材料中有培养过的猎人，确定使用用吗？",

            awakenStart: "觉醒技能激活成功",
            awakenUpLevel: "觉醒技能升级成功",
            noawaken: "该猎人无法觉醒",
            unlock: "<color>r:1,g:130,b:40</color><text>(激活)</text>",
            lock: "<color>r:120,g:120,b:120</color><text>(%s次觉醒激活)</text>",
            final: "<color>r:1,g:130,b:40</color><text>(最终效果)</text>",

            hunter_type_Pokedex: [
                "强化系猎人",
                "放出系猎人",
                "具现化系猎人",
                "特质系猎人",
                "变化系猎人",
                "操作系猎人",
            ],

            hunter_aptitude: {
                [11]: "C",
                [12]: "B",
                [13]: "A",
                [14]: "S",
                [15]: "SS",
            },

            fashion: {
                wearSuccess: "<color>r:60,g:255,b:0</color><text>形象变换成功</text>",
                buySuccess: "<color>r:60,g:255,b:0</color><text>形象购买成功</text>",
                original: "经典 %s",
                noGeneral: "尚未获得该猎人",
            },
        },

        TextsConfig_Hunter_Instance: {

            level: "%s级",
            star: "%s星",

            not_complete: "请通关当前区域的冒险副本",
            not_complete_last: [
                "请先通关冒险副本%s-%s",
                "请先通关上一地区挑战副本",
            ],
            chapter_num: "第%s章",

            eliteRecommend: "推荐等级：LV%s",

            card_output_lock: "掉落区域%s挑战副本暂未解锁",
            cancle: "确定取消本次探索吗？取消后将不会获得奖励呦~",
            begin: "<color>r:60,g:255,b:0</color><text>开始探索</text>",
            awardFirst: "<text>获得初次通关奖励</text><color>r:15,g:165,b:15</color><text>%s</text><text> x%s</text>",
            relicAwardFirst: "<text>获得初次通关第%s阶段奖励</text><color>r=15,g=165,b=15</color><text>%s</text><text> x%s</text>",

            continue_battle_content1: "开启连续战斗后系统将自动进行最多%s场战斗",
            continue_battle_content2: "遇到以下情况任意一种托管将终止",
            continue_battle_content3: "体力不足、挑战失败、战斗满%s场、手动终止",

            exit_continue_battle: "当前处于连续战斗中,是否立即终止？",

            card_full_tips: "卡片存放空间已满，新获得的卡片有可能会丢失，是否继续战斗？",
        },

        TextsConfig_Hunter_Card: {

            nothing_sell: "<color>r:255,g:0,b:0</color><text>没有卡片可以出售</text>",
            uplevel_success: "<color>r:0,g:255,b:0</color><text>卡片升级成功</text>",
            upstar_success: "<color>r:0,g:255,b:0</color><text>卡片升星成功</text>",
            break_success: "<color>r:0,g:255,b:0</color><text>卡片突破成功</text>",
            card_bag_tips: "卡包可以在贪婪之岛和酒馆商店获得呦~",
            sell_tips: "确定出售此卡片吗？出售可获得%s金币",
            upstar_tips: "<color>r:0,g:0,b:0</color><text>需要</text><color>r:15,g:165,b:15</color><text>%s</text><color>r:0,g:0,b:0</color><text>张</text><color>r:15,g:165,b:15</color><text>%s</text><color>r:0,g:0,b:0</color><text>卡片(已选择：%s/%s)</text>",
            max_star: "已达到最大星级",
            card_lock_tips: "该卡片已锁定，是否解锁该卡片？",
            card_Piece: "碎片",

            unidTipes: "<text>获得后随机生成</text><color>r:15,g:165,b:15</color><text>%s</text><text>条副属性</text>",
            unidAttriTips: "<text>其中必含以下</text><color>r:15,g:165,b:15</color><text>%s</text><text>条属性</text>",
            unloadSuccessful: "<color>r:60,g:255,b:0</color><text>一键卸载成功</text>",
            confirmUnloadCard: "确认卸载当前猎人身上所有卡片吗？",
            collect: "（收集%s枚可合成整卡）",

            card_error: "只有六星SS级卡片可以进行念力注入",
            card_down: "念力注入效果未提升，系统将自动保留原效果",

            card_add_next_a_per: "<color>r=0,g=0,b=0</color><text>%s</text><color>r=8,g=134,b=214</color><text>+%s~%s</text>",
            card_add_next_b_per: "<color>r=0,g=0,b=0</color><text>%s</text><color>r=191,g=43,b=175</color><text>+%s~%s</text>",

            card_up_add_per: "%s",

            card_add_before_a_per: "<color>r=0,g=0,b=0</color><text>%s</text><color>r=8,g=134,b=214</color><text>+%s</text>",
            card_add_before_b_per: "<color>r=0,g=0,b=0</color><text>%s</text><color>r=191,g=43,b=175</color><text>+%s</text>",

            card_add_next_a: "<color>r=0,g=0,b=0</color><text>%s%%</text><color>r=8,g=134,b=214</color><text>+%s~%s%%</text>",
            card_add_next_b: "<color>r=0,g=0,b=0</color><text>%s%%</text><color>r=191,g=43,b=175</color><text>+%s~%s%%</text>",

            card_add_before_a: "<color>r=0,g=0,b=0</color><text>%s%%</text><color>r=8,g=134,b=214</color><text>+%s%%</text>",
            card_add_before_b: "<color>r=0,g=0,b=0</color><text>%s%%</text><color>r=191,g=43,b=175</color><text>+%s%%</text>",

            card_up_add: "%s%%",

            card_select_error: "所选方式的增幅区间过低，不可注入",

            card_select_Max: "当前增幅已达最大值，不可注入",

            card_up_have: "<color>r=25,g=227,b=68</color><text>%s</text><color>r=25,g=227,b=68</color><text>/%s</text>",

            card_up_no: "<color>r=255,g=0,b=0</color><text>%s</text><color>r=25,g=227,b=68</color><text>/%s</text>",

            card_popa_per: "<color>r=212,g=224,b=238</color><text>%s</text><color>r=8,g=134,b=214</color><text>+%s</text>",
            card_popb_per: "<color>r=212,g=224,b=238</color><text>%s</text><color>r=191,g=43,b=175</color><text>+%s</text>",

            card_attri_gr: "<color>r=25,g=227,b=68</color><text>%s</text>",
            card_attri_re: "<color>r=255,g=0,b=0</color><text>%s</text>",

            card_dif_gr: "<color>r=8,g=134,b=214</color><text>%s</text>",
            card_dif_re: "<color>r=191,g=43,b=175</color><text>%s</text>",

            card_popa_per_up: "<color>r=212,g=224,b=238</color><text>%s%%</text><color>r=8,g=134,b=214</color><text>+%s%%</text>",
            card_popb_per_up: "<color>r=212,g=224,b=238</color><text>%s%%</text><color>r=191,g=43,b=175</color><text>+%s%%</text>",
        },

        TextsConfig_Hunter_League: {

            league_boss_cost: "活跃度x%s",
            league_instance_inbattle: "该怪物正在被挑战，不能进入阵容选择界面",
        },

        TextsConfig_Hunter_Tavern: {
            soda: "苏打水不足",
            again: "x5",
            again_next: "x%s",
            limitBeer: "不满足购买条件",

            tavern_tips_last: "本次必得猎人",
            //    tavern_tips_1 : "<color>r:15,g:165,b:15</color><text>%s次</text><color>r:255,g:255,b:255</color><text>后必得猎人</text>",
            //    tavern_tips_2 : "<color>r:255,g:255,b:255</color><text>必得</text><color>r:235,g:11,b:235</color><text>A级</text><color>r:255,g:255,b:255</color><text>及以上猎人</text>",
            //    tavern_tips_3 : "<color>r:255,g:255,b:255</color><text>必得</text><color>r:237,g:142,b:37</color><text>S级</text><color>r:255,g:255,b:255</color><text>猎人</text>",

            tavern_tips_1: "<color>r:255,g:255,b:255</color><text>可获得</text><color>r:122,g:250,b:255</color><text>B</text><color>r:255,g:255,b:255</color><text>~</text><color>r:237,g:142,b:37</color><text>S</text><text>级猎人</text>",
            tavern_tips_2: "<color>r:255,g:255,b:255</color><text>可获得</text><color>r:235,g:11,b:235</color><text>A</text><color>r:255,g:255,b:255</color><text>~</text><color>r:237,g:142,b:37</color><text>S</text><text>级猎人</text>",
            tavern_tips_3: "<color>r:255,g:255,b:255</color><text>必得</text><color>r:237,g:142,b:37</color><text>S</text><color>r:255,g:255,b:255</color><text>级猎人</text>",
            tavern_tips_4: "<color>r:255,g:255,b:255</color><text>可获得</text><color>r:25,g:227,b:68</color><text>C</text><color>r:255,g:255,b:255</color><text>~</text><color>r:122,g:250,b:255</color><text>B</text><text>级猎人</text>",
            tavern_tips_5: "<color>r:255,g:255,b:255</color><text>必包含</text><color>r:235,g:11,b:235</color><text>A</text><color>r:255,g:255,b:255</color><text>~</text><color>r:237,g:142,b:37</color><text>S</text><color>r:255,g:255,b:255</color><text>级猎人</text>",
            tavern_tips_6: "<color>r:255,g:255,b:255</color><text>可获得</text><color>r:235,g:11,b:235</color><text>A</text><color>r:255,g:255,b:255</color><text>~</text><color>r:237,g:142,b:37</color><text>S</text><text>级猎人</text>",
            tavern_tips_7: "<color>r:255,g:255,b:255</color><text>可获得</text><color>r:122,g:250,b:255</color><text>B</text><color>r:255,g:255,b:255</color><text>~</text><color>r:237,g:142,b:37</color><text>S</text><text>级猎人</text>",
            tavern_tips_8: "<color>r:255,g:255,b:255</color><text>可获得</text><color>r:235,g:11,b:235</color><text>A</text><color>r:255,g:255,b:255</color><text>~</text><color>r:237,g:142,b:37</color><text>S</text><text>级猎人</text>",
            /*
            tavern_tips_1 : "可获得B~S级猎人",
            tavern_tips_2 : "可获得A~S级猎人",
            tavern_tips_3 : "必得S级猎人",
            tavern_tips_4 : "可获得C~B级猎人",
            tavern_tips_5 : "必包含A~S级猎人",
            tavern_tips_6: "可获得A~S级猎人",
            tavern_tips_7 : "可获得B~S级猎人",
            tavern_tips_8: "可获得A~S级猎人",
            */
        },

        TextsConfig_Hunter_Pay: {
            token: "%s钻石",
            addToken: "送%s钻石",
            can_get_and_has_get: "还可以领%s天",
            cur_level: "<text>当前队伍等级:</text><color>r:60,g:255,b:0</color><text>%s</text>",
            get_level: "<text>队伍达到</text><color>r:46,g:255,b:255</color><text>%s</text><text>级可领取</text>",
            level_gift_name: "%s级礼包",
            can_get_level: "%s级可领取",
            not_limit_buy: "不限制购买",
            change_any: "充值任意一笔金额可免费领取首充奖励",
            not_limit: "不限购",
            week_buy_num: "本周购买数量",
            day_buy_num: "今日购买数量",
        },

        TextsConfig_Hunter_NewGift: {
            sold_out: "已购买",
            last_time: "剩余时间:"
        },

        TextsConfig_Egg_Random: {
            score: "%s分",
            jifen: "%s积分",
            last_times: "<text>剩余次数:</text><color>r:%s,g:%s,b:%s</color><text>%s</text><text>/%s</text>",
            free: "本次免费",
            not_enough: "积分不足",
        },

        TextsConfig_Hunter_DoubleColor: {
            start_time: "投注时间：每日%s 至 %s",
            run_time: "开奖时间：次日%s",
            next_run: "距离开奖还有：%s",
            next_turn: "距离下期开始还有：%s",
            reward: {
                [5]: "特等奖",
                [4]: "一等奖",
                [3]: "二等奖",
                [2]: "三等奖",
                [1]: "四等奖",
                [0]: "未中奖",
            },
            reward_people: [
                "%s人",
                "%s人",
                "%s人",
            ],
            not_enough: "您拥有的果子不足以下注",
            pos_not_enough: "位置不足",
            fruit_not_enough: "投注果实数量不满足要求",
            bet_succsee: "投注成功，开奖要来哦~",
            cannot_bet: "关闭界面不能完成投注，是否要离开",
            bet_result: "我的投注结果：",
            not_bet: "未开奖",
            not_in: "未下注",



        },

        TextsConfig_Hunter_Compound: {
            battleValue: "战斗力:   %s",
            cardNum: "装备卡片数量:   %s",
            needCondition: "条件:%s星;%s突",
            needConditionNoAwake: "条件:%s星;%s突",
            otherNeed: " %s资质",

            compound_defence_general:
            [
                "该猎人为本服格斗场防守阵容猎人,不能作为合成材料",
                "该猎人为跨服格斗场防守阵容猎人,不能作为合成材料",
                "该猎人为探索阵容猎人,不能作为合成材料",
                "该猎人为飞龙营地防守阵容猎人,不能作为合成材料",
            ],

            hunter_grade: {
                [11]: "C",
                [12]: "B",
                [13]: "A",
                [14]: "S",
                [15]: "SS",
            },

            notEnough: "请点击材料头像添加猎人",
            composeSuccess: "合成猎人成功",
            closeNotSave: "关闭界面将不保存本次操作",
            noMet: "需求:   任意%s级猎人",
            hunterMet: "需求:   %s",
            confirmCompound: "合成将消耗全部材料猎人，确认合成吗？"
        },

        //突破
        TextsConfig_Hunter_Break: {
            Attri: [
                "生命+%s", // 1
                "攻击+%s", // 2
                "防御+%s", // 3
                "效果命中+%s", // 4
                "效果抵抗+%s",
                "暴击概率+%s", // 6
                "x技能暴击+%s",
                "暴击伤害+%s", // 8
                "暴击抵抗+%s",
                "格挡率<+%s", // 10
                "忽视格挡+%s",
                "忽视防御+%s",
                "x忽视魔防+%s",
                "x终伤附加+%s",
                "x终伤减免+%s",
                "怒气减免+%s",
                "x攻击+%s",
                "x防御+%s",
                "x暴击+%s",
                "x忽视防御+%s",
                "异常抵抗+%s",
                "忽视异常抵抗+%s",
                "浮空抵抗+%s",
                "速度+%s", // 24
                "援护怒气+%s",
            ],

            Attri1: [
                "生命值+%s%%", //-- 1
                "攻击+%s%%", //-- 2
                "防御+%s%%", //-- 3
                "效果命中+%s%%", //--4
                "效果抵抗+%s%%",
                "暴击概率+%s%%", //--6
                "x技能暴击+%s%%",
                "暴击伤害+%s%%", //--8
                "暴击抵抗+%s%%",
                "格挡率+%s%%", //--10
                "忽视格挡+%s%%",
                "忽视防御+%s%%",
                "x忽视魔防+%s%%",
                "x终伤附加+%s%%",
                "x终伤减免+%s%%",
                "怒气减免+%s%%",
                "x攻击+%s%%",
                "x防御+%s%%",
                "x暴击+%s%%",
                "x忽视防御+%s%%",
                "异常抵抗+%s%%",
                "忽视异常抵抗+%s%%",
                "浮空抵抗+%s%%",
                "速度+%s", //--24
                "援护怒气+%s",
            ],

            break_defence_general:
            [
                "该猎人为本服格斗场防守阵容猎人,不能作为突破材料",
                "该猎人为跨服格斗场防守阵容猎人,不能作为突破材料",
                "该猎人为探索阵容猎人,不能作为突破材料",
                "该猎人为飞龙营地防守阵容猎人,不能作为突破材料",
            ],

            selectBreak: "<color>r:255,g:0,b:0</color><text>已满足突破条件</text>",

            nolevel: "队伍达到50级后开启猎人突破",
            hunter_no_level: "猎人等级不足",

            levelMax: "猎人等级上限+%s",
            skilllevelMax: "普通技能等级上限+%s",

            skillBreak: "解锁：%s阶突破技",
            allSkillBreak: "已解锁全部突破技",

            condition1: "请选择一个突破技使用",
            condition2: "使用过程中可随时更换其它同阶突破技",
            condition3: "长按技能图标可查看全部等级效果",
            noMet: "需求:   任意猎人",
            noMet2: "需求:   任意%s级及以上猎人",
            hunterMet: "需求 ：%s",
            noMetS: "当前无满足条件的猎人",
            breakSuccess: "%s阶突破技解锁成功",

            buttonskillDes: "三阶突破暂未开放",

            breakCondition: [
                "猎人%s星可进行一阶突破",
                "猎人%s级可进行二阶突破",
                "猎人%s次觉醒可进行三阶阶突破",
            ],

        },
        //念力系统

        TextsConfig_Hunter_psychic: {

            psychic_Open: "猎人%d星解锁",
            psychic_CanOpen: "点击解锁",
            psychic_lockTips: "最多可锁定%s个念力",
            psychic_title_str: "%s件套组合：同时拥有任意%s个相同前缀的念力时，激活组合效果",
            psychic_lockSaveTips: "请先选择结果",
            psychic_refresh_tips: "确认保存修炼后的结果吗？",
            psychic_refresh_not_open: "解锁全部栏位后开启念力修炼",
            psychic_group: "(%s件套)",

            psychic_no_change: "<color>r:255,g:255,b:255</color><text>%s +%s</text>",
            psychic_add: "<color>r:255,g:255,b:255</color><text>%s +%s</text><color>r:46,g:255,b:50</color><text> (+%s)</text>",
            psychic_sub: "<color>r:255,g:255,b:255</color><text>%s +%s</text><color>r:255,g:50,b:50</color><text> (%s)</text>",

            attri_type: {
                [1]: "生命",
                [2]: "攻击",
                [4]: "命中",
                [5]: "抵抗",
                [6]: "暴击",
                [8]: "暴伤",
                [9]: "暴抗",
            },
            attri_type_type: {
                [1]: "%",
                [2]: "%",
                [4]: "%",
                [5]: "%",
                [6]: "%",
                [8]: "%",
                [9]: "%",
            },

            condition: {
                [1]: "方案1",
                [2]: "方案2",
                [3]: "方案3",
            },

            locked: "<color>r:25,g:227,b:68</color><text>方案%s使用成功</text>",
            use_money: "<text>确定花费</text><color>r:255,g:100,b:0</color><text>%s钻石</text><text>解锁一个新的念力方案吗？</text>",

            useCondition: "请先激发方案%s念力",
            curAttriEffect: "<color>r=25,g=227,b=68 </color><text> (当前效果)</text>",
            psychic_defence_general:
            {
                [1]: "该猎人为本服格斗场防守阵容猎人,不能作为材料",
                [2]: "该猎人为跨服格斗场防守阵容猎人,不能作为材料",
                [3]: "该猎人为探索阵容猎人,不能作为材料",
                [4]: "该猎人为飞龙营地防守阵容猎人,不能作为材料",
            },
            selectPsychic: "已满足修炼条件",
            psychic_fruits_insufficient: "念力果不足",
            psychic_material_insufficient: "猎人材料不足",

        },

        TextsConfig_GroupFight: {
            hard: "%s阶段",
            teamName: "%s的队伍",
            myTeamName: [
                "我的主队",
                "我的二队",
            ],
            timeNotEnough: "剩余次数不足",
            timeNotEnough2: "剩余邀请次数不足",
            timeLastAssist: "剩余邀请次数:%s/%s",
            hasAssistTime: "今日已为他人助战:%s次",
            noFriend: "无助战队伍",
            needGeneral: "%s队至少需要上阵一名猎人",
            needGeneral2: [
                "主队至少需要上阵一名猎人",
                "二队至少需要上阵一名猎人",
            ],

            win2: "SSS通关可解锁难度级别%s阶段",
            win3: "恭喜您！解锁难度级别%s阶段",
            fakeRoleInfo: {
                name: "助战好友",
                level: 60,
            },
            chooseTips: "阶段%s获得SSS评分可解锁",
            makeSuccess: "<color>r:60,g:255,b:0</color><text>设置成功</text>",

        },

        TextsConfig_Mission: {
            mission_over: "任务完成！",
            completed: "已完成",
        },



        TextsConfig_VipMall: {
            vipMoney: "再充值%s元即可成为",
            attriAdd1: "贪婪之岛玩法中碰撞战斗时可获得以下效果：\n跑动速度+ %s%%",
            attriAdd2: "贪婪之岛玩法中碰撞战斗时可获得以下效果：\n%s+ %s%%\n跑动速度+ %s%%",
            attriAdd3: "贪婪之岛玩法中碰撞战斗时可获得以下效果：\n%s+ %s%%\n%s+ %s%%\n跑动速度+ %s%%",
            attriAdd4: "贪婪之岛玩法中碰撞战斗时可获得以下效果：\n%s+ %s%%",
            attriAdd5: "贪婪之岛玩法中碰撞战斗时可获得以下效果：\n%s+ %s%%\n%s+ %s%%",

            buyGift: "%s可购买",

            attri: {
                [1]: "全体生命",
                [2]: "全体攻击",
                [3]: "全体防御",
                [4]: "全体命中",
                [5]: "全体暴击抵抗",
                [6]: "全体暴击",
                [8]: "全体暴击伤害",
            },

            kefu: "客服%s：QQ %s、微信 %s",

            kefuname: [
                "小辰",
                "小点",
                "双双",
            ],

            qq: [
                "374107615",
                "917089132",
                "2306406151",
            ],

            weixin: [
                "lierenvipchen",
                "kuaile21755zhaodian",
                "ss_gzswkl",
            ],
        },

        TextsConfig_Match: {
            teamName: "%s的%s小队",
            oneKeySuccess: "<color>r:60,g:255,b:0</color><text>一键驻防成功</text>",
            downGarSuccess: "<color>r:60,g:255,b:0</color><text>一键撤防成功</text>",

            levelAndScore: [
                "高级 （%s倍积分）",
                "中级 （%s倍积分）",
                "中级 （%s倍积分）",
                "低级 （%s倍积分）",
                "低级 （%s倍积分）",
            ],
            flyName: [
                "<color>r:234,g:88,b:0</color><text>指挥艇</text>",
                "<color>r:255,g:0,b:255</color><text>护卫艇左</text>",
                "<color>r:255,g:0,b:255</color><text>护卫艇右</text>",
                "<color>r:10,g:216,b:255</color><text>先锋艇左</text>",
                "<color>r:10,g:216,b:255</color><text>先锋艇右</text>",
            ],
            pass: "<color>r:60,g:255,b:0</color><text>此队伍已被完全击败，不可再次攻打</text>",
            leagueAddScore: "您的公会获得了%s积分",

            SignUpConsume: "活跃度 X%d",
            defendPeople: "<text>%d/%d</text>",
            starInfoGreen: "<color>r:15,g:238,b:68</color><text>%d</text><text>/%d</text>",
            defendPeopleRed: "<color>r:241,g:9,b:37</color><text>%d</text><text>/%d</text>",
            level: [
                "高级",
                "中级",
                "中级",
                "低级",
                "低级",
            ],
            airshipInfo: [
                "名称: %s",
                "级别: %s",
                "生命: %s/%s",
                "<text>驻守: </text>%s",
            ],
            sign_conditions: [
                "只有会长或者副会长可以报名",
                "公会人数不足%d人",
                "防守队伍数量不足%d支",
                "公会活跃度不足%d",
                "有未设防的飞艇",
                "公会等级不足%s",
            ],
            sign_success: "<color>r:60,g:255,b:0</color><text>报名成功</text>",
            rank: {
                [1]: "四服公会战暂未开启",
                [2]: "<color>r:255,g:0,b:0</color><text>周一至周六</text><color>r:255,g:255,b:255</color><text>23点</text><color>r:255,g:0,b:0</color><text>结算</text>",
                [3]: "<color>r:255,g:0,b:0</color><text>每周六</text><color>r:255,g:255,b:255</color><text>23点</text><color>r:255,g:0,b:0</color><text>结算奖励</text>",
                [4]: "<color>r:255,g:0,b:0</color><text>每周日</text><color>r:255,g:255,b:255</color><text>23点</text><color>r:255,g:0,b:0</color><text>结算奖励</text>",
                [5]: "积分:%s以上",
                [6]: "第%s名",
                [7]: "获取条件：当日至少参与一次排位战战斗",
                [8]: "获取条件：当轮至少参与五次排位战战斗(%d/5)",
                [9]: "获取条件：当轮至少参与一次争霸战战斗",
            },
            timeDiff: [
                "备战剩余时间 %s",
                "战斗剩余时间 %s",
                "正在匹配对手 %s",
            ],
            union_status: {
                [1]: "服务器: %s",
                [2]: "段位: %s",
                [3]: "排位积分: %d",
                [4]: "本服排行: %d",
                [5]: "等级%d",
                [6]: "剩余次数 %d",
                [7]: "玩家%s的队伍%d(防御中)",
                [8]: "<color>r:255,g:0,b:0</color><text>玩家%s的队伍%d(被击败)</text>",
            },
            settlement: [
                "<color>r:0,g:190,b:255</color><text>排位积分 %d </text>%s",
                "<color>r:53,g:136,b:16</color><text> +%d</text>", // 绿色
                "<color>r:178,g:14,b:26</color><text> -%d</text>", // 红色
                "尚无结算信息"
            ],
            no: "无防守队伍",
            notbSet: "未被设防",
            pos: "%s号位",
            battleEnd: [
                "%s",
                "%s",
                "%s",
            ],
            openStr: "公会战将于本周开放，敬请期待",
            winAndScore: [
                "  险胜 %s点伤害",
                "  小胜 %s点伤害",
                "  大胜 %s点伤害"
            ],
            otherScore: "全灭增加%s点额外伤害",
            passAll: [
                "<color>r:255,g:38,b:0</color><text>未达成</text>",
                "<color>r:60,g:255,b:0</color><text>已达成</text>",
            ],
            scoreBar: [
                "进攻次数:%s/%s"
            ],
            defendTeams: "已布防队伍数:%s",
            countTeams: "公会队伍总数:%s",
            attackNoUpset: "公会战战斗期间,不可更改已被设防阵容",
            catchTip: "追击战斗，只能获得战功，无法获得贡献",
            bAttackNoPk: "%s攻击中",
        },

        TextsConfig_DarkLand: {
            campName: [
                "第一王子 伽迪亚",
                "第二王子 亚路嘉",
                "第三王子 塞万提斯",
                "第四王子 朵唯",
            ],
            attendNum: "参与人数：%s",
            confimAttenCamp: "你确认加入%s的佣兵团吗？加入后不能退出。",
            attendSuccess: "申请加入佣兵团成功",
            buyMoJing: "是否花费%s%s购买%s魔晶",
            noPetCanSelect: "当前没有宠物可供选择",

            relic: {
                damage1: "%s≤伤害＜%s",
                damage2: "伤害≥%s",

                step: "第%s阶段",
                stepAward: "第%s阶段通关奖励",
                openTime: "开启时间：周%s",
                closeCannotOpen: "关闭后将不能打开剩余宝箱",
                chestIsClose: "该宝箱已经消失，奖励请到邮件中获取",
                mallLastFresh: "  (剩余:%d次)",
            },
            curPortCity: "%s号港口",
            curPortChannel: "第%s线",
            pleaseChooseChannel: "请选择你要切换的线路",
            successChannel: "<color>r=60,g=255,b=0</color><text>成功切换至第%s线</text>",
            inThisChannel: "当前处于第%s线",
            redFull: "<color>r=255,g=38,b=0</color><text>爆满</text>",
            notOpen: "未到达开启时间",
            allAddAttr: "全队%s增加%s%%",

            levelDes: {
                [1]: "D",
                [2]: "C-",
                [3]: "C",
                [4]: "C+",
                [5]: "B-",
                [6]: "B",
                [7]: "B+",
                [8]: "A-",
                [9]: "A",
                [10]: "A+",
                [11]: "S-",
                [12]: "S",
                [13]: "S+",
                [14]: "SS-",
                [15]: "SS",
                [16]: "SS+",
            },
        },

        TextsConfig_Hunter_Equip: {
            baseAttri: "基础属性(Lv%s)",
            breakAttri: "高级属性(Lv%s)",
            talentAttr: "被动天赋(Lv%s)",

            successStrength: "<color>r=25,g=227,b=68</color><text>强化成功</text>",
            successSelect: "<color>r=25,g=227,b=68</color><text>合成成功</text>",
            successUpStep: "<color>r=25,g=227,b=68</color><text>升品成功</text>",

            name: "<text>%s :</text>",

            type1: "%s",
            type2: "%s",


            nameColor: [
                "<color>r=212,g=224,b=238</color><text>%s</text>",
                "<color>r=25,g=227,b=68</color><text>%s</text>",
                "<color>r=122,g=250,b=255</color><text>%s</text>",
                "<color>r=254,g=34,b=236</color><text>%s</text>",
                "<color>r=255,g=0,b=0</color><text>%s</text>",
            ],

            EquipDes: "(%s+%s)",

            strengthLv: "强化等级 +%s",

            skillSuccess: "<color>r=25,g=227,b=68</color><text>技能提升成功</text>"
        },
        TextsConfig_Xuyuan: {
            cannotBuyTime: "已经到达购买上限",
            bEnd: "许愿屋活动已结束",
            not_enough: "许愿星不足",
        },
        TextsConfig_BattlePass: {
            SeasonNum: "第%s赛季",
            NoReward: "当前没有可领取的奖励",
            expMAN: "经验值：已满级",
            exp: "经验值：%s/%s",
            levelMax: "您的通行证已达到最高等级",
            timeOver: "%s/%s/1 4:00",
        }

    }
}