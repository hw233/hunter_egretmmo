var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var zj;
(function (zj) {
    // 多语言支持
    // guoshanhe
    // 2018.11.11
    // 多语言支持
    // 例子1：  this.lbName = LANG("COMMON_OK");
    // 例子2：  this.lbDesc = LANG("COMMON_DESC", 'name', gold);
    //          COMMON_DESC: "你送给{0}{1}钻石"
    function LANG(key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // return Game.LanguageManager.translate(Game.LanguageManager.getLang(), key, ...args);
        return key; // 猎人项目暂时不采用新规范
    }
    zj.LANG = LANG;
    function LANG2(key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = zj.Game.LanguageManager).translate.apply(_a, [zj.Game.LanguageManager.getLang(), key].concat(args));
        var _a;
        // return key; // 猎人项目暂时不采用新规范
    }
    zj.LANG2 = LANG2;
    // 多语言管理类
    var LanguageManager = (function () {
        function LanguageManager() {
            this.lang = "zhcn"; // 默认语言
            this.table = null; // 配置表
            this.common_0 = "Successful";
            this.common_1 = { "zhcn": "系统", "zhtw": "系統", "ko": "시스템", "en": "system" };
            this.common_2 = { "zhcn": "公会申请处理", "zhtw": "公會申請處理", "ko": "길드 신청 처리", "en": "league apply deal" };
            this.common_3 = { "zhcn": "充值成功记录", "zhtw": "儲值成功紀錄", "ko": "충전 성공 기록", "en": "pay success record" };
            this.common_4 = { "zhcn": "充值失败记录", "zhtw": "儲值失敗紀錄", "ko": "충전 실패 기록", "en": "pay failed record" };
            this.common_5 = { "zhcn": "成功", "zhtw": "成功", "ko": "성공", "en": "success" };
            this.common_6 = { "zhcn": "失败", "zhtw": "失敗", "ko": "실패", "en": "failed" };
            this.common_7 = { "zhcn": "禅让会长", "zhtw": "禪讓會長", "ko": "회장 선양", "en": "Transfer leadership" };
            //作廢
            this.common_8 = { "zhcn": "弹劾失败", "zhtw": "彈劾失敗", "ko": "탄핵 실패", "en": "Impeach failed" };
            //作廢
            this.common_9 = { "zhcn": "弹劾成功", "zhtw": "彈劾成功", "ko": "탄핵 성공", "en": "Impeach success" };
            this.common_12 = { "zhcn": "本服格斗挑战", "zhtw": "本服格鬥挑戰", "ko": "본 서버 격투 도전", "en": "Server arena" };
            this.common_13 = { "zhcn": "大家一定要好好玩耍啊！", "zhtw": "大家一定要好好玩耍啊！", "ko": "헌터님 여러분,꼭 화목히 지내세요~", "en": "Enjoy your adventure!" };
            this.common_14 = { "zhcn": "本服格斗奖励", "zhtw": "本服格鬥獎勵", "ko": "본 서버 격투 보상", "en": "Server arena reward" };
            this.common_15 = { "zhcn": "活动奖励", "zhtw": "活動獎勵", "ko": "이벤트 보상", "en": "activity reward" };
            this.common_16 = { "zhcn": "BOSS伤害排名奖励", "zhtw": "BOSS傷害排名獎勵", "ko": "보스 대미지 랭킹 보상", "en": "Boss damage ranking reward" };
            this.common_17 = { "zhcn": "BOSS击杀奖励", "zhtw": "BOSS擊殺獎勵", "ko": "보스 처치 보상", "en": "Boss annihilation reward" };
            this.common_18 = { "zhcn": "助战奖励", "zhtw": "助戰獎勵", "ko": "서포터 보상", "en": "Support reward" };
            this.common_19 = { "zhcn": "公会副本重置补偿", "zhtw": "公會副本重置補償", "ko": "길드 던전 초기화 보상", "en": "Compensation for guild dungeon resetting" };
            this.common_20 = { "zhcn": "公会战本服争霸奖励", "zhtw": "公會戰本服爭霸獎勵", "ko": "길드전 본서버 쟁패 보상", "en": "Guild War Server Contest Reward" };
            this.common_21 = { "zhcn": "未开启遗迹宝箱奖励", "zhtw": "作廢", "en": "Unopened Relic Chest rewards" };
            this.common_22 = { "zhcn": "许愿屋未领取积分奖励", "zhtw": "作廢", "en": "Uncollected points rewards from the Wish Hut" };
            this.common_23 = { "zhcn": "手机号绑定奖励", "zhtw": "作廢", "en": "Phone number linking rewards" };
            this.common_24 = { "zhcn": "内测返现", "zhtw": "內測返現", "ko": "CBT 피드백", "en": "Alpha-test rebating" };
            this.common_25 = { "zhcn": "作废", "zhtw": "作廢", "en": "Cancelled" };
            this.common_26 = { "zhcn": "与时间赛跑未领取奖励", "zhtw": "與時間賽跑未領取獎勵", "ko": "시간과의 싸움의 보상을 수령하지 않았습니다.", "en": "Unclaimed reward for Race Against Time" };
            this.common_27 = { "zhcn": "港口排名奖励", "zhtw": "作廢", "en": "Port ranking rewards" };
            this.common_28 = { "zhcn": "全勤奖励", "zhtw": "全勤獎勵", "ko": "개근 보상", "en": "Sign-in reward" };
            this.common_29 = { "zhcn": "BOSS伤害分成奖励", "zhtw": "BOSS傷害分成獎勵", "ko": "보스 대미지 분배 보상", "en": "Boss damage divid} reward" };
            this.common_30 = { "zhcn": "猜拳奖励", "zhtw": "猜拳獎勵", "ko": "가위바위보 보상", "en": "Finger guessing reward" };
            this.common_31 = { "zhcn": "友情提示", "zhtw": "友情提示", "ko": "힌트", "en": "Hint" };
            this.common_32 = { "zhcn": "身份认证奖励", "zhtw": "身份認證獎勵", "ko": "신분 인증 보상", "en": "Identity au tication reward" };
            this.common_33 = { "zhcn": "跨服格斗每日奖励", "zhtw": "跨服格鬥每日獎勵", "ko": "서버간 격투 매일 보상", "en": "Cross-server arena daily reward" };
            this.common_34 = { "zhcn": "跨服格斗段位奖励", "zhtw": "跨服格鬥段位獎勵", "ko": "서버간 전투 단계 보상", "en": "Cross-server arena grade reward" };
            this.common_35 = { "zhcn": "跨服格斗排名奖励", "zhtw": "跨服格鬥排名獎勵", "ko": "서버간 격투 랭킹 보상", "en": "Cross-server arena ranking reward" };
            this.common_36 = { "zhcn": "赛季结束", "zhtw": "賽季結束", "ko": "시즌 완료", "en": "} of season" };
            this.common_37 = { "zhcn": "您的卡包已满", "zhtw": "您的卡包已滿", "ko": "패키지 가방이 가득찼습니다", "en": "Your card packs are maxed" };
            this.common_38 = { "zhcn": "双色果开奖", "zhtw": "雙色果開獎", "ko": "로또 결과", "en": "Duo Fruit prize time" };
            this.common_39 = { "zhcn": "公会福利", "zhtw": "公會福利", "ko": "길도 보너스", "en": "Guild bonus" };
            this.common_40 = { "zhcn": "累计充值奖励", "zhtw": "累計儲值獎勵", "ko": "누적 충전 보상", "en": "Cumulative recharge reward" };
            this.common_41 = { "zhcn": "公会战每日奖励", "zhtw": "公會戰每日獎勵", "en": "Guild War daily reward" };
            this.common_42 = { "zhcn": "公会战本服排名奖励", "zhtw": "公會戰本服排名獎勵", "ko": "길드전 본서버 순위 보상", "en": "Guild War Server Ranking Reward" };
            this.common_43 = { "zhcn": "退会通知", "en": "Guild withdrawal notice" };
            this.common_push_1 = { "zhcn": "体力已回复满", "zhtw": "體力已回復滿", "ko": "체력은 전부 회복되었습니다.", "en": "tiliman" };
            this.common_push_2 = { "zhcn": "猎人们早已整装待发，快回来一起闯关吧！", "zhtw": "獵人們早已整裝待發，快回來一起闖關吧！", "ko": "헌터들은 이미 준비되었습니다.함께 도전을 진행합시다!", "en": "The hunters are ready for battle. Come back and challenge tough enemies!" };
            this.common_push_3 = { "zhcn": "活动开启啦", "zhtw": "活動開啟啦", "ko": "이벤트가 오픈되었습니다.", "en": "Event has started" };
            this.common_push_4 = { "zhcn": "走过路过不要错过哦~", "zhtw": "走過路過不要錯過哦~", "ko": "기회를 놓치지 마세요.", "en": "Don't miss out on it~" };
            this.common_push_5 = { "zhcn": "领体力时间到", "zhtw": "領體力時間到", "ko": "체력 수령 시간이 되었습니다.", "en": "You may claim Stamina now" };
            this.common_push_6 = { "zhcn": "领体力时间到，大家快去领", "zhtw": "領體力時間到，大家快去領", "ko": "체력 수령 시간이 되었습니다.수령하러 갑시다.", "en": "You may claim Stamina now! Don't forget it" };
            this.common_push_13 = { "zhcn": "本服格斗守擂失败", "zhtw": "本服格鬥守擂失敗", "ko": "본 서버 격투도전 실패", "en": "You were defeated by the challenger" };
            this.common_push_14 = { "zhcn": "是可忍孰不可忍，还不快把排名抢回来~", "zhtw": "是可忍孰不可忍，還不快把排名搶回來~", "ko": "참을 수 없네요!순위를 이겨 오세요!", "en": "Defeat your opponents and get your ranking back~" };
            this.common_push_15 = { "zhcn": "离线提醒", "zhtw": "離線提醒", "ko": "오프라인 힌트", "en": "Offline reminder" };
            this.common_push_16 = { "zhcn": "您好久没有上线了，快回家看看吧。", "ko": "오랫동안 접속을 하지않았네요.집으로 돌아가 봅시다!", "zhtw": "您好久沒有上線了，快回家看看吧。", "en": "You have been inactive for a long time. Why not come back and take a look?" };
            this.common_push_17 = { "zhcn": "BOSS开始", "zhtw": "BOSS開始", "ko": "보스 시작", "en": "Boss has emerged" };
            this.common_push_18 = { "zhcn": "BOSS开启啦，大家快去打", "zhtw": "BOSS開啟啦，大家快去打", "ko": "보스 도전이 오픈되었습니다.도전하러 갑시다.", "en": "Boss has emerged! Join in the fight now" };
            this.common_push_19 = { "zhcn": "宴会开启", "zhtw": "宴會開啟", "ko": "축하연 오픈", "en": "Banquet has started" };
            this.common_push_20 = { "zhcn": "宴会开启啦，大家快去吃", "zhtw": "宴會開啟啦，大家快去吃", "ko": "축하연이 오픈되었습니다.축하연에 참가하러 갑시다.", "en": "Banquet has started. Don't miss out on the delicious dishes" };
            this.common_push_21 = { "zhcn": "公会副本开启", "zhtw": "公會副本開啟", "ko": "길드 던전 오픈", "en": "Guild dungeon is open" };
            this.common_push_22 = { "zhcn": "亲爱的主人！公会副本已经开启，快抓紧时间挑战吧！", "zhtw": "親愛的主人！公會副本已經開啟，快抓緊時間挑戰吧！", "ko": "친애하는 유저님!길드 던전이 오픈되었습니다.도전하러 갑시다!", "en": "Dear player! A guild dungeon is available to challenge!" };
            this.common_push_23 = { "zhcn": "公会副本购买次数", "zhtw": "公會副本購買次數", "ko": "길드 던전 구매 횟수", "en": "Guild dungeon chances purchased" };
            this.common_push_24 = { "zhcn": "亲爱的主人！会长(副会)为您购买了公会副本挑战次数，快去抓紧时间挑战吧！", "zhtw": "親愛的主人！會長(副會)為您購買了公會副本挑戰次數，快去抓緊時間挑戰吧！", "ko": "친애하는 유저님,회장(부회장)께서 길드 던전 횟수를 구매하였습니다.어서 도전하러 갑시다!", "en": "Dear player! Your guild leader (or deputy leader) has purchased challenge chances for the guild dungeon! Seize the chance and challenge it now!" };
            this.common_push_25 = { "zhcn": "群雄争霸开启", "zhtw": "群雄爭霸開啟", "ko": "군웅쟁패 오픈", "en": "Heroes Gathering has started" };
            this.common_push_26 = { "zhcn": "群雄争霸已经开启，猎人们的大刀是否已经饥渴难耐啦啦啦？", "zhtw": "群雄爭霸已經開啟，獵人們的大刀是否已經飢渴難耐啦啦啦？", "ko": "군웅쟁패는 이미 오픈되었습니다.우수한 성적을 따내길 바랍니다.", "en": "Heroes Gathering has started! Are you prepared for the fierce battle?" };
            this.common_push_27 = { "zhcn": "公会战", "zhtw": "公會戰", "ko": "길드전", "en": "Guild War" };
            this.common_push_28 = { "zhcn": "公会战即将开打，快召集你的小伙伴一起来参加啊！", "zhtw": "公會戰即將開打，快召集你的小伙伴一起來參加啊！", "ko": "길드전은 이미 시작되었습니다.친구과 함께 참여합시다!", "en": "Guild War will break out soon! Gather your partners and fight against the enemies!" };
            this.common_push_29 = { "zhcn": "贪婪之岛BOSS", "zhtw": "貪婪之島BOSS", "ko": "그리드 아일랜드 보스", "en": "Greed Island Boss" };
            this.common_push_30 = { "zhcn": "贪婪之岛BOSS已经开启，快召集你的小伙伴一起来参加啊！", "zhtw": "貪婪之島BOSS已經開啟，快召集你的小伙伴一起來參加啊！", "ko": "길드전은 이미 시작되었습니다.친구과 함께 참여합시다!", "en": "Greed Island boss has emerged! Convoke your fri}s and challenge him right now!" };
            //其他文本
            this.common_other1 = { "1": String, "2": String, "3": String, "4": String, "5": String, "6": String, "7": String, "8": String, "9": String, "10": String };
            this.common_other2 = { "A": String, "B": String, "C": String, "D": String, "E": String, "F": String, "G": String, "H": String, "I": String, "J": String };
            this.common_other3 = { "Leader": String, "Deputy Leader": String, "Member": String };
            this.common_other4 = { "1st": String, "2nd": String, "3rd": String };
        }
        // 初始化，加载配置表
        LanguageManager.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            RES.getResAsync("lang_zip", function (data, key) {
                                JSZip.loadAsync(data).then(function (zipdata) {
                                    zipdata.forEach(function (path, file) {
                                        file.async('text').then(function (text) {
                                            _this.table = JSON.parse(text);
                                            resolve(); // 结束
                                            return;
                                        });
                                    });
                                });
                            }, _this);
                        })];
                });
            });
        };
        // 获取默认语言类别
        LanguageManager.prototype.getLang = function () {
            return this.lang;
        };
        // 设置默认语言类别
        LanguageManager.prototype.setLang = function (value) {
            this.lang = value;
        };
        // 获取默认语言的翻译
        LanguageManager.prototype.translate = function (lang, key) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (this.table == null)
                return "not found lang table";
            var item = this.table[key];
            if (item == null || item == undefined)
                return "not found key: " + key;
            var result = item[lang];
            if (result == null || result == undefined)
                return "not found lang: " + lang;
            return this.writeFormat.apply(this, [result].concat(args));
        };
        Object.defineProperty(LanguageManager.prototype, "TableLang", {
            get: function () {
                return this.table;
            },
            enumerable: true,
            configurable: true
        });
        // 带参数格式化输出
        // 例子1： writeFormat("this is {0}, is {1}, is {0}", 'dog, 'cat'); // 输出 this is dog, is cat, is dog
        // 例子2： writeFormat("风一样的女子"); // 输出  风一样的女子
        LanguageManager.prototype.writeFormat = function (format) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var result = format;
            for (var i = 0; i < args.length; i++) {
                var exp = new RegExp("\\{" + i + "\\}", "g");
                result = result.replace(exp, args[i].toString());
            }
            return result;
        };
        // 聊天頻道相關文本
        // client_chat_role
        LanguageManager.client_chat_role_1 = function (vip, name) {
            return LANG2("client_chat_role_1", vip, name);
        };
        LanguageManager.client_chat_role_2 = function (name, count) {
            return LANG2("client_chat_role_2", name, count);
        };
        LanguageManager.client_chat_role_3 = function (name, count) {
            return LANG2("client_chat_role_3", name, count);
        };
        LanguageManager.client_chat_role_4 = function (name) {
            return LANG2("client_chat_role_4", name);
        };
        LanguageManager.client_chat_role_5 = function (name) {
            return LANG2("client_chat_role_5", name);
        };
        LanguageManager.client_chat_role_6 = function (name, vip) {
            return LANG2("client_chat_role_6", name, vip);
        };
        // 參數2向客戶端發送一個物品Id在該函數中將物品名稱傳遞進來
        LanguageManager.client_chat_role_7 = function (name, goods) {
            return LANG2("client_chat_role_7", name, goods);
        };
        // 參數2向客戶端發送一個物品Id在該函數中將物品名稱傳遞進來
        LanguageManager.client_chat_role_8 = function (name, goods, count) {
            return LANG2("client_chat_role_8", name, goods, count);
        };
        // 參數2向客戶端發送一個物品Id在該函數中將物品名稱傳遞進來
        LanguageManager.client_chat_role_9 = function (name, goods, count) {
            return LANG2("client_chat_role_9", name, goods, count);
        };
        // 參數2向客戶端發送一個物品Id在該函數中將物品名稱傳遞進來
        LanguageManager.client_chat_role_10 = function (name, goods) {
            return LANG2("client_chat_role_10", name, goods);
        };
        // 參數2,3向客戶端發送一個物品Id在該函數中將物品名稱傳遞進來
        LanguageManager.client_chat_role_11 = function (name1, name2, goods, count) {
            return LANG2("client_chat_role_11", name1, name2, goods, count);
        };
        // 參數2向客戶端發送一個物品Id在該函數中將物品名稱傳遞進來
        LanguageManager.client_chat_role_12 = function (name, goods) {
            return LANG2("client_chat_role_12", name, goods);
        };
        // 參數2向客戶端發送一個神兵Id在該函數中將神兵名稱傳遞進來
        LanguageManager.client_chat_role_13 = function (name1, name2) {
            return LANG2("client_chat_role_13", name1, name2);
        };
        // 參數2向客戶端發送一個獵人Id在該函數中將獵人名稱傳遞進來
        LanguageManager.client_chat_role_14 = function (name1, name2, star) {
            return LANG2("client_chat_role_14", name1, name2, star);
        };
        // 參數2向客戶端發送一個神兵Id在該函數中將神兵名稱傳遞進來
        LanguageManager.client_chat_role_15 = function (name1, name2, star) {
            return LANG2("client_chat_role_15", name1, name2, star);
        };
        // 參數2向客戶端發送一個獵人Id在該函數中將獵人名稱傳遞進來
        LanguageManager.client_chat_role_16 = function (name1, name2, star) {
            return LANG2("client_chat_role_16", name1, name2, star);
        };
        LanguageManager.client_chat_role_17 = function (name1, name2) {
            return LANG2("client_chat_role_17", name1, name2);
        };
        LanguageManager.client_chat_role_18 = function (name1, name2) {
            return LANG2("client_chat_role_18", name1, name2);
        };
        LanguageManager.client_chat_role_19 = function (name1, _type) {
            if (1 == Number(_type)) {
                return LANG2("client_chat_role_19_1", name1);
            }
            else {
                return LANG2("client_chat_role_19_2", name1);
            }
        };
        LanguageManager.client_chat_role_20 = function (name1, name2) {
            return LANG2("client_chat_role_20", name1, name2);
        };
        // 卡片相關
        LanguageManager.client_chat_role_21 = function (name1, star, name2) {
            return LANG2("client_chat_role_21", name1, star, name2);
        };
        LanguageManager.client_chat_role_22 = function (name1, name2, star) {
            return LANG2("client_chat_role_22", name1, name2, star);
        };
        LanguageManager.client_chat_role_23 = function (name, goods) {
            return LANG2("client_chat_role_23", name, goods);
        };
        LanguageManager.client_chat_role_24 = function (name1, name2) {
            return LANG2("client_chat_role_24", name1, name2);
        };
        LanguageManager.client_chat_role_25 = function (name1, name2) {
            return LANG2("client_chat_role_25", name1, name2);
        };
        LanguageManager.client_chat_role_26 = function (name1, name2) {
            return LANG2("client_chat_role_26", name1, name2);
        };
        LanguageManager.client_chat_role_27 = function (name1, name2, star) {
            return LANG2("client_chat_role_27", name1, name2, star);
        };
        LanguageManager.client_chat_role_28 = function (name1, star) {
            return LANG2("client_chat_role_28", name1, star);
        };
        // 聯盟聊天相關
        // client_chat_league
        LanguageManager.client_chat_league_1 = function (_minutes) {
            return LANG2("client_chat_league_1", _minutes);
        };
        LanguageManager.client_chat_league_2 = function (name, _level) {
            return LANG2("client_chat_league_2", name, _level);
        };
        LanguageManager.client_chat_league_3 = function (name) {
            return LANG2("client_chat_league_3", name);
        };
        LanguageManager.client_chat_league_4 = function (name) {
            return LANG2("client_chat_league_4", name);
        };
        LanguageManager.client_chat_league_5 = function (arg1, arg2) {
            return LANG2("client_chat_league_5", arg1, arg2);
        };
        LanguageManager.client_chat_league_6 = function (arg1, arg2) {
            return LANG2("client_chat_league_6", arg1, arg2);
        };
        LanguageManager.client_chat_league_7 = function (memberName, mobsName) {
            return LANG2("client_chat_league_7", memberName, mobsName);
        };
        LanguageManager.client_chat_league_8 = function (memberName) {
            return LANG2("client_chat_league_8", memberName);
        };
        // 首次被踢出公会
        LanguageManager.client_chat_league_9 = function (memberName) {
            return LANG2("client_chat_league_9", memberName);
        };
        // 非首次被踢出公会
        LanguageManager.client_chat_league_10 = function (memberName) {
            return LANG2("client_chat_league_10", memberName);
        };
        // 联赛推送消息
        LanguageManager.client_chat_league_match_start = function () {
            return LANG2("client_chat_league_match_start");
        };
        LanguageManager.client_chat_league_match_finish = function () {
            return LANG2("client_chat_league_match_finish");
        };
        LanguageManager.client_chat_league_match_battle_win = function (memberName, index, num) {
            var flyZHCN = ["指挥艇", "护卫艇左", "护卫艇右", "先锋艇左", "先锋艇右"];
            var flyZHTW = ["指揮艇", "護衛艇左", "護衛艇右", "先鋒艇左", "先鋒艇右"];
            var flyKO = ["지휘선", "좌 호위선", "우 호위선", "좌 선봉선", "우 선봉선"];
            var flyEN = ["Command Zeppelin", "Left of Escort Zeppelin", "Right of Escort Zeppelin", "Left of Vanguard Zeppelin", "Right of Vanguard Zeppelin"];
            return zj.Helper.StringFormat(LANG2("client_chat_league_match_battle_win"), memberName, flyZHCN[Number(index)], num, memberName, flyZHTW[Number(index)], num, memberName, flyEN[Number(index)], num, memberName, flyEN[Number(index)], num);
        };
        LanguageManager.client_chat_league_match_battle_lose = function (memberName, index, num) {
            var flyZHCN = ["指挥艇", "护卫艇左", "护卫艇右", "先锋艇左", "先锋艇右"];
            var flyZHTW = ["指揮艇", "護衛艇左", "護衛艇右", "先鋒艇左", "先鋒艇右"];
            var flyKO = ["지휘선", "좌 호위선", "우 호위선", "좌 선봉선", "우 선봉선"];
            var flyEN = ["Command Zeppelin", "Left of Escort Zeppelin", "Right of Escort Zeppelin", "Left of Vanguard Zeppelin", "Right of Vanguard Zeppelin"];
            return zj.Helper.StringFormat(LANG2("client_chat_league_match_battle_lose"), memberName, flyZHCN[Number(index)], num, memberName, flyZHTW[Number(index)], num, memberName, flyEN[Number(index)], num, memberName, flyEN[Number(index)], num);
        };
        // 仙境聊天相關
        // client_chat_landwonder
        // 參數2向客戶端發送一個怪物Id在該函數中將怪物名稱傳遞進來
        LanguageManager.client_chat_landwonder_1 = function (level, name) {
            return LANG2("client_chat_landwonder_1", level, name);
        };
        LanguageManager.client_chat_landwonder_2 = function () {
            return LANG2("client_chat_landwonder_2");
        };
        // 參數3向客戶端發送一個怪物Id在該函數中將怪物名稱傳遞進來
        LanguageManager.client_chat_landwonder_3 = function (name1, level, name2) {
            return LANG2("client_chat_landwonder_3", name1, level, name2);
        };
        // 參數2向客戶端發送一個仙境Id在該函數中將仙境名稱傳遞進來
        LanguageManager.client_chat_landwonder_4 = function (name1, name2, hurt) {
            return LANG2("client_chat_landwonder_4", name1, name2, hurt);
        };
        LanguageManager.client_chat_landwonder_5 = function (name) {
            return LANG2("client_chat_landwonder_5", name);
        };
        // 參數2,3向客戶端發送一個建築Id在該函數中將建築名稱傳遞進來
        LanguageManager.client_chat_landwonder_6 = function (name1, name2, goodsId, goodsCount) {
            return LANG2("client_chat_landwonder_6", name1, name2, goodsId, goodsCount);
        };
        LanguageManager.client_chat_landwonder_7 = function (name, fruit, num) {
            return LANG2("client_chat_landwonder_7", name, fruit, num);
        };
        LanguageManager.client_chat_landwonder_8 = function (name1, _minutes) {
            return LANG2("client_chat_landwonder_8", name1, _minutes);
        };
        // 黑暗大陆相关
        // 即将开启
        LanguageManager.client_chat_darkland_open = function () {
            return LANG2("client_chat_darkland_open");
        };
        // 即将关闭
        LanguageManager.client_chat_darkland_close = function () {
            return LANG2("client_chat_darkland_close");
        };
        // 参数2向客户端发送一个怪物Id在该函数中将怪物名称传递进来
        LanguageManager.client_chat_darkland_1 = function (level, name, brach_id) {
            return LANG2("client_chat_darkland_1", level, name, brach_id);
        };
        // 魔域BOSS
        LanguageManager.client_chat_scene_boss_1 = function (_minutes) {
            return LANG2("client_chat_scene_boss_1", _minutes);
        };
        LanguageManager.client_chat_scene_boss_2 = function () {
            return LANG2("client_chat_scene_boss_2");
        };
        LanguageManager.client_chat_scene_boss_3 = function (name, goodsId, goodsCount) {
            return LANG2("client_chat_scene_boss_3", name, goodsId, goodsCount);
        };
        LanguageManager.client_chat_scene_boss_4 = function () {
            return LANG2("client_chat_scene_boss_4");
        };
        LanguageManager.client_chat_scene_boss_5 = function (name, rank) {
            return LANG2("client_chat_scene_boss_5", name, rank);
        };
        LanguageManager.client_chat_scene_boss_6 = function (name, hurt) {
            return LANG2("client_chat_scene_boss_6", name, hurt);
        };
        // 盟戰聊天相關
        // client_chat_leaguewar
        LanguageManager.client_chat_leaguewar_12 = function (name1, name2) {
            var str = {};
            // table.insert(str["zhcn"],  { "zhcn": " %s照着%s的屁股狠狠地踹了一脚，对手跪在地上连忙求饶！", "zhtw": " %s照著%s的屁股狠狠地踹了一腳，對手跪在地上連忙求饒！", "ko": "%s님께서 %s님을 전승하였습니다.축하드립니다.", "en": " <text>%s kicked %s's ass!</text>" }  );
            // table.insert(str["zhcn"],  { "zhcn": " %s一个瞬移来到%s面前，只一下就将对手打倒在地！", "zhtw": " %s一個瞬移來到%s面前，只一下就將對手打倒在地！", "ko": "%s님께서 %s님을 전승하였습니다.축하드립니다.", "en": " <text>%s blinked to %s and knocked them down with one hit!</text>" }  );
            // table.insert(str["zhcn"],  { "zhcn": " 只见%s一记漂亮的回旋踢！%s转了三个圈，然后晕倒在地...", "zhtw": " 只見%s一記漂亮的回旋踢！%s轉了三個圈，然後暈倒在地...", "ko": "%s님께서 %s님을 전승하였습니다.축하드립니다.", "en": " <text>%s delivered a spin-kick on %s's face and kicked them down...</text>" }  );
            // table.insert(str["zhcn"],  { "zhcn": " %s打出一套漂亮的组合拳，%s虽然护住了自己的屁股，脸却被打成了包子！", "zhtw": " %s打出一套漂亮的組合拳，%s雖然護住了自己的屁股，臉卻被打成了包子！", "ko": "%s님께서 %s님을 전승하였습니다.축하드립니다.", "en": " <text>%s stroke %s down with a brilliant combination of heavy blows!</text>" }  );
            // table.insert(str["zhcn"],  { "zhcn": " %s实力太强了！%s根本就毫无还手之力，快要被虐上天了！", "zhtw": " %s實力太強了！%s根本就毫無還手之力，快要被虐上天了！", "ko": "%s님께서 %s님을 전승하였습니다.축하드립니다.", "en": " <text>%s is too powerful for helpless %s! That was totally an one-sided battle!</text>" }  );
            // return Helper.StringFormat(str[Math.random(Object.keys(str).length)],name1, name2, name1, name2, name1, name2, name1, name2);
        };
        // 跨服格鬥相關
        // client_chat_fine_player
        LanguageManager.client_chat_fine_player = function (groupId, name, rank) {
            rank = Number(rank);
            var str = null;
            if (1 == rank) {
                return LANG2("client_chat_fine_player_1", groupId, name);
            }
            else if (2 == rank) {
                return LANG2("client_chat_fine_player_2", groupId, name);
            }
            else {
                return LANG2("client_chat_fine_player_3", groupId, name);
            }
        };
        LanguageManager.client_mail_relic_chest_reset = function () {
            return LANG2("client_mail_relic_chest_reset");
        };
        LanguageManager.client_mail_xuyuan_chest_reset = function () {
            return LANG2("client_mail_xuyuan_chest_reset");
        };
        // 角色郵件相關
        // client_mail_role
        LanguageManager.client_mail_role_1 = function (roleLevel, rank, rewardLevel) {
            return LANG2("client_mail_role_1", roleLevel, rank, rewardLevel);
        };
        LanguageManager.client_mail_role_2 = function (strname, strtime, gold) {
            return LANG2("client_mail_role_2", strname, strtime, gold);
        };
        LanguageManager.client_mail_role_3 = function (name, buyTime, monthType, firstMoney) {
            monthType = Number(monthType);
            var monthNameZh = ["普通月卡", "高级月卡"];
            var monthNameTw = ["普通月卡", "高級月卡"];
            var monthNameKo = ["일반 카드", "고급 카드"];
            var monthNameEn = ["Common Monthly Card", "Advanced Monthly Card"];
            return LANG2("client_mail_role_3", name, buyTime, monthNameZh[monthType], firstMoney);
        };
        LanguageManager.client_mail_role_4 = function (gold, token) {
            return LANG2("client_mail_role_4", gold, token);
        };
        LanguageManager.client_mail_role_5 = function (index, score, section, rank) {
            return LANG2("client_mail_role_5", index, score, section, rank);
        };
        LanguageManager.client_mail_role_6 = function () {
            return LANG2("client_mail_role_6");
        };
        LanguageManager.client_mail_role_7 = function (num) {
            return LANG2("client_mail_role_7", num);
        };
        LanguageManager.client_mail_role_8 = function (rank, num) {
            return LANG2("client_mail_role_8", rank, num);
        };
        LanguageManager.client_mail_role_9 = function (rank, num) {
            return LANG2("client_mail_role_9", rank, num);
        };
        LanguageManager.client_mail_role_gift = function (rmb, gift_name) {
            return LANG2("client_mail_role_gift", rmb, gift_name);
        };
        LanguageManager.client_mail_role_secret_gift = function (gift_name) {
            return LANG2("client_mail_role_secret_gift", gift_name);
        };
        LanguageManager.client_mail_role_potato = function () {
            return LANG2("client_mail_role_potato");
        };
        LanguageManager.client_mail_group_fight_reward = function (name, group_name) {
            return LANG2("client_mail_group_fight_reward", name, group_name);
        };
        LanguageManager.client_mail_group_fight_rewardOne = function (name, group_name) {
            return LANG2("client_mail_group_fight_rewardOne", name, group_name);
        };
        LanguageManager.client_mail_mission_race_reward = function () {
            return LANG2("client_mail_mission_race_reward");
        };
        LanguageManager.client_mail_darkland_rank_reward = function (score, rank) {
            return LANG2("client_mail_darkland_rank_reward", score, rank);
        };
        // 雙色果獎勵相關文本
        // 沒有中獎
        LanguageManager.client_mail_double_fruit_none = function (argv1, argv2, argv3, argv4, argv5, argv6, argv7, argv8, argv9, argv10) {
            return LANG2("client_mail_double_fruit_none", argv1, argv2, argv3, argv4, argv5, argv6, argv7, argv8, argv9, argv10);
        };
        // 雙色果中獎
        LanguageManager.client_mail_double_fruit_reward = function (argv1, argv2, argv3, argv4, argv5, argv6, argv7, argv8, argv9, argv10, argv11) {
            var reward_name_ch = ["四等奖", "三等奖", "二等奖", "一等奖", "特等奖"];
            var reward_name_tw = ["四等獎", "三等獎", "二等獎", "一等獎", "特等獎"];
            var reward_name_ko = ["4급상", "3급상", "2급상", "1급상", "특급상"];
            var reward_name_en = ["4th Prize", "3rd Prize", "2nd Prize", "1st Prize", "Jackpot"];
            var _argv11 = Number(argv11) - 1;
            return LANG2("client_mail_double_fruit_reward", argv1, argv2, argv3, argv4, argv5, argv6, argv7, argv8, argv9, argv10, reward_name_ch[Math.max(_argv11, 0)]);
            // return Helper.StringFormat(LANG2("client_mail_double_fruit_reward"), argv1, argv2, argv3, argv4, argv5, argv6, argv7, argv8, argv9, argv10, reward_name_ch[_argv11], argv1, argv2, argv3, argv4, argv5, argv6, argv7, argv8, argv9, argv10, reward_name_tw[_argv11], argv1, argv2, argv3, argv4, argv5, argv6, argv7, argv8, argv9, argv10, reward_name_ko[_argv11], argv1, argv2, argv3, argv4, argv5, argv6, argv7, argv8, argv9, argv10, reward_name_en[_argv11])
        };
        // 發送今日中獎公告
        LanguageManager.client_chat_double_fruit = function (argv1, argv2, argv3, argv4, argv5, argv6, argv7, argv8) {
            return LANG2("client_chat_double_fruit", argv1, argv2, argv3, argv4, argv5, argv6, argv7, argv8);
        };
        // 聯盟郵件相關
        // cache_league.cpp
        LanguageManager.client_mail_league_1 = function (strleague, is_pass) {
            is_pass = Number(is_pass);
            var passZh = ["通过", "拒绝"];
            var passTw = ["通過", "拒絕"];
            var passKo = ["동의하다", "거절"];
            var passEn = ["pass", "refuse"];
            if (1 == is_pass) {
                return zj.Helper.StringFormat(LANG2("client_mail_league_1"), strleague, passZh[0], strleague, passTw[0], strleague, passKo[0], strleague, passEn[0]);
            }
            else {
                return zj.Helper.StringFormat(LANG2("client_mail_league_1"), strleague, passZh[1], strleague, passTw[1], strleague, passKo[1], strleague, passEn[1]);
            }
        };
        LanguageManager.client_mail_league_2 = function (name) {
            return LANG2("client_mail_league_2", name);
        };
        LanguageManager.client_mail_league_3 = function (_level) {
            return LANG2("client_mail_league_3", _level);
        };
        LanguageManager.client_mail_league_4 = function () {
            return LANG2("client_mail_league_4");
        };
        LanguageManager.client_mail_league_instance_reward = function () {
            return LANG2("client_mail_league_instance_reward");
        };
        // 儲值聯盟回饋郵件
        LanguageManager.client_mail_league_chargeback_reward = function (name, giftIndex) {
            return LANG2("client_mail_league_chargeback_reward", name, giftIndex);
        };
        LanguageManager.client_mail_league_chargeback_reward_update = function (giftIndex) {
            return LANG2("client_mail_league_chargeback_reward_update", giftIndex);
        };
        // 联盟联赛邮件
        LanguageManager.client_mail_league_match_daily_reward = function (rank) {
            return LANG2("client_mail_league_match_daily_reward", rank);
        };
        LanguageManager.client_mail_league_match_daily_reward_empty = function (rank) {
            return LANG2("client_mail_league_match_daily_reward_empty", rank);
        };
        LanguageManager.client_mail_league_match_rank_reward = function (rank) {
            return LANG2("client_mail_league_match_rank_reward", rank);
        };
        LanguageManager.client_mail_league_match_rank_reward_empty = function (rank) {
            return LANG2("client_mail_league_match_rank_reward_empty", rank);
        };
        LanguageManager.client_mail_league_match_let_craft_reward = function (rank) {
            return LANG2("client_mail_league_match_let_craft_reward", rank);
        };
        LanguageManager.client_mail_league_match_let_craft_reward_empty = function (rank) {
            return LANG2("client_mail_league_match_let_craft_reward_empty", rank);
        };
        // 聯盟boss郵件相關
        // client_mail_league_boss
        LanguageManager.client_mail_league_boss_win_1 = function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            return LANG2("client_mail_league_boss_win_1", arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        };
        LanguageManager.client_mail_league_boss_win_2 = function (arg0, arg1, arg2, arg3, arg4, arg5) {
            return LANG2("client_mail_league_boss_win_2", arg0, arg1, arg2, arg3, arg4, arg5);
        };
        LanguageManager.client_mail_league_boss_win_3 = function (arg0, arg1, arg2, arg3) {
            return LANG2("client_mail_league_boss_win_3", arg0, arg1, arg2, arg3);
        };
        LanguageManager.client_mail_league_boss_win_4 = function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            return LANG2("client_mail_league_boss_win_4", arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        };
        LanguageManager.client_mail_league_boss_win_5 = function (arg0, arg1, arg2, arg3, arg4) {
            return LANG2("client_mail_league_boss_win_5", arg0, arg1, arg2, arg3, arg4);
        };
        LanguageManager.client_mail_league_boss_win_6 = function (arg0, arg1, arg2) {
            return LANG2("client_mail_league_boss_win_6", arg0, arg1, arg2);
        };
        LanguageManager.client_mail_league_boss_fail_1 = function (arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            return LANG2("client_mail_league_boss_fail_1", arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        };
        LanguageManager.client_mail_league_boss_fail_2 = function (arg1, arg2, arg3, arg4, arg5) {
            return LANG2("client_mail_league_boss_fail_2", arg1, arg2, arg3, arg4, arg5);
        };
        LanguageManager.client_mail_league_boss_fail_3 = function (arg1, arg2, arg3) {
            return LANG2("client_mail_league_boss_fail_3", arg1, arg2, arg3);
        };
        LanguageManager.client_mail_league_boss_fail_4 = function (arg1, arg2, arg3, arg4, arg5, arg6) {
            return LANG2("client_mail_league_boss_fail_4", arg1, arg2, arg3, arg4, arg5, arg6);
        };
        LanguageManager.client_mail_league_boss_fail_5 = function (arg1, arg2, arg3, arg4) {
            return LANG2("client_mail_league_boss_fail_5", arg1, arg2, arg3, arg4);
        };
        LanguageManager.client_mail_league_boss_fail_6 = function (arg1, arg2) {
            return LANG2("client_mail_league_boss_fail_6", arg1, arg2);
        };
        // 盟戰郵件相關
        // 本服格鬥郵件相關
        // client_mail_ladder
        LanguageManager.client_mail_ladder_win_1 = function (name, change) {
            return LANG2("client_mail_ladder_win_1", name, change);
        };
        LanguageManager.client_mail_ladder_win_2 = function (name, change) {
            return LANG2("client_mail_ladder_win_2", name, change);
        };
        LanguageManager.client_mail_ladder_fail_1 = function (name) {
            return LANG2("client_mail_ladder_fail_1", name);
        };
        LanguageManager.client_mail_ladder_fail_2 = function (name) {
            return LANG2("client_mail_ladder_fail_2", name);
        };
        LanguageManager.client_mail_ladder_reward = function (rank) {
            return LANG2("client_mail_ladder_reward", rank);
        };
        LanguageManager.client_mail_ladder_reward_empty = function (rank) {
            return LANG2("client_mail_ladder_reward_empty", rank);
        };
        LanguageManager.mail_ladder_title = function (name, is_win) {
            if (is_win) {
                return LANG2("mail_ladder_title_1", name);
            }
            else {
                return LANG2("mail_ladder_title_2", name);
            }
        };
        // 切磋郵件相關
        LanguageManager.mail_title_pvp = function (is_ladder, name) {
            if (is_ladder) {
                return LANG2("mail_title_pvp_1", name);
            }
            else {
                return LANG2("mail_title_pvp_2", name);
            }
        };
        LanguageManager.mail_pvp_ladder = function (is_win, name, group_name) {
            is_win = Number(is_win);
            if (is_win == 1) {
                return LANG2("mail_pvp_ladder_1", name, group_name);
            }
            else {
                return LANG2("mail_pvp_ladder_2", name, group_name);
            }
        };
        LanguageManager.mail_pvp_single = function (is_win, name, group_name) {
            is_win = Number(is_win);
            if (is_win == 1) {
                return LANG2("mail_pvp_single_1", name, group_name);
            }
            else {
                return LANG2("mail_pvp_single_2", name, group_name);
            }
        };
        // 仙境郵件相關
        LanguageManager.client_mail_wonderland_get_fruit = function (is_win, name, goodId, count) {
            is_win = Number(is_win);
            if (is_win == 1) {
                return LANG2("client_mail_wonderland_get_fruit_1", name, goodId, count);
            }
            else {
                return LANG2("client_mail_wonderland_get_fruit_2", name, goodId, count);
            }
        };
        LanguageManager.client_mail_wonderland_no_fruit = function (is_win, name) {
            is_win = Number(is_win);
            if (is_win == 1) {
                return LANG2("client_mail_wonderland_no_fruit_1", name);
            }
            else {
                return LANG2("client_mail_wonderland_no_fruit_2", name);
            }
        };
        // 魔域boss郵件相關
        // client_mail_scene_boss
        LanguageManager.client_mail_scene_boss_1 = function () {
            return LANG2("client_mail_scene_boss_1");
        };
        LanguageManager.client_mail_scene_boss_2 = function (is_kill, rank) {
            is_kill = Number(is_kill);
            if (is_kill == 1) {
                return LANG2("client_mail_scene_boss_2_1", rank);
            }
            else {
                return LANG2("client_mail_scene_boss_2_2", rank);
            }
        };
        LanguageManager.client_mail_scene_boss_3 = function (arg) {
            return LANG2("client_mail_scene_boss_2_2", Number(arg));
        };
        // 跨服格鬥相關
        // 每日獎勵
        LanguageManager.client_singlecraft_1 = function (section) {
            return LANG2("client_singlecraft_1", section);
        };
        // 每輪獎勵
        LanguageManager.client_singlecraft_2 = function (section) {
            return LANG2("client_singlecraft_2", section);
        };
        // 排名獎勵
        LanguageManager.client_singlecraft_3 = function (section, title) {
            return LANG2("client_singlecraft_3", section, title);
        };
        // 本輪結束通告
        LanguageManager.client_singlecraft_4 = function () {
            return LANG2("client_singlecraft_4");
        };
        // 本服排名獎勵
        LanguageManager.client_singlecraft_5 = function (section, title) {
            if (title == null) {
                return LANG2("client_singlecraft_5_1", section);
            }
            else {
                return LANG2("client_singlecraft_5_2", section, title);
            }
        };
        LanguageManager.client_mail_singlecraft_fail_1 = function (name, gropu_name, score) {
            return LANG2("client_mail_singlecraft_fail_1", gropu_name, name, score);
        };
        LanguageManager.client_mail_singlecraft_win_2 = function (name, gropu_name, score) {
            return LANG2("client_mail_singlecraft_win_2", gropu_name, name, score);
        };
        LanguageManager.client_mail_singlecraft_win_1 = function (name, gropu_name, score) {
            return LANG2("client_mail_singlecraft_win_1", gropu_name, name, score);
        };
        LanguageManager.client_mail_singlecraft_fail_2 = function (name, gropu_name, score) {
            return LANG2("client_mail_singlecraft_fail_2", gropu_name, name, score);
        };
        LanguageManager.client_mail_singlecraft_fail_3 = function (name, gropu_name) {
            return LANG2("client_mail_singlecraft_fail_2", gropu_name, name);
        };
        // 郵件標題
        LanguageManager.mail_craft_title = function (name, is_win) {
            if (is_win) {
                return LANG2("mail_craft_title_1", name);
            }
            else {
                return LANG2("mail_craft_title_2", name);
            }
        };
        // 累計儲值網頁領取獎勵
        LanguageManager.client_mail_charge_reward = function () {
            return LANG2("client_mail_charge_reward");
        };
        // 天空竞技场
        LanguageManager.client_mail_tower_reward = function (rank) {
            return LANG2("client_mail_tower_reward", rank);
        };
        LanguageManager.client_mail_tower_max_reward = function (rank) {
            return LANG2("client_mail_tower_max_reward", rank);
        };
        LanguageManager.client_mail_permit_reward = function () {
            return LANG2("client_mail_permit_reward");
        };
        // 身份認證郵件內容
        LanguageManager.client_identification_content = function () {
            return LANG2("client_identification_content");
        };
        // 手机号认证邮件内容
        LanguageManager.client_bind_phone_content = function () {
            return LANG2("client_bind_phone_content");
        };
        return LanguageManager;
    }());
    zj.LanguageManager = LanguageManager;
    __reflect(LanguageManager.prototype, "zj.LanguageManager");
})(zj || (zj = {}));
//# sourceMappingURL=LanguageManager.js.map