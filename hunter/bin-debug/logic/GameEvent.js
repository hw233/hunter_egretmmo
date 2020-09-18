var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    // 全局事件定义
    // guoshanhe
    // 2018.11.5
    var GameEvent = (function () {
        function GameEvent() {
        }
        // 网络状态变更
        GameEvent.NET_SERVER_CONNECTED = "NET_SERVER_CONNECTED"; // 连接上游戏服务器
        GameEvent.NET_SERVER_DISCONNECTED = "NET_SERVER_DISCONNECTED"; // 与游戏服务器断开连接
        GameEvent.TABLE_CONFIG_LOAD_OK = "TABLE_CONFIG_LOAD_OK"; // 策划配置表加载完成
        // aone账号管理
        GameEvent.AONE_SELECT_ACCOUNT = "AONE_SELECT_ACCOUNT"; // 选择账号<account:string>
        GameEvent.AONE_DELETE_ACCOUNT = "AONE_DELETE_ACCOUNT"; // 选择账号<account:string>
        // 游戏数据变更
        GameEvent.PLAYER_LOGIN_GAMESERVER_INFO = "PLAYER_LOGIN_GAMESERVER_INFO"; // 角色登录游戏服返回数据<LoginGameserverRespBody>
        GameEvent.PLAYER_BASE_INFO_CHANGE = "PLAYER_BASE_INFO_CHANGE"; // 角色基础数据<RoleBaseInfo>
        GameEvent.PLAYER_MIX_UNIT_INFO_CHANGE = "PLAYER_MIX_UNIT_INFO_CHANGE"; // 角色数据杂项<RoleMixUnit>
        GameEvent.PLAYER_POTATOS_INFO_CHANGE = "PLAYER_POTATOS_INFO_CHANGE"; // 宝物/卡片信息Array<PotatoInfo>
        GameEvent.PLAYER_SIGN_INFO_CHANGE = "PLAYER_SIGN_INFO_CHANGE"; // 签到信息<SignInfo>
        GameEvent.PLAYER_GOODS_INFO_CHANGE = "PLAYER_GOODS_INFO_CHANGE"; // 物品信息<PlayerGoodsInfoChangeEvent>
        GameEvent.PLAYER_LICENCE_INFO_CHANGE = "PLAYER_LICENCE_INFO_CHANGE"; // 执照信息<LicenceInfo>
        GameEvent.PLAYER_MISSION_INFO_CHANGE = "PLAYER_MISSION_INFO_CHANGE"; // 任务信息Array<MissionInfo>
        GameEvent.PLAYER_MISSION_ACTIVE_CHANGE = "PLAYER_MISSION_ACTIVE_CHANGE"; // 每日活跃度<MissionActive>
        GameEvent.PLAYER_GENERALS_CHANGE = "PLAYER_GENERALS_CHANGE"; // 武将/猎人信息Array<GeneralInfo>
        GameEvent.PLAYER_MOB_INFO_CHANGE = "PLAYER_MOB_INFO_CHANGE"; // 普通怪物信息Array<MobInfo>
        GameEvent.PLAYER_INSTANCE_INFO_CHANGE = "PLAYER_INSTANCE_INFO_CHANGE"; // 副本信息<InstanceInfo>
        GameEvent.PLAYER_TOWER_INFO_CHANGE = "PLAYER_TOWER_INFO_CHANGE"; // 塔信息<TowerInfo>
        GameEvent.PLAYER_ADVISER_INFO_CHANGE = "PLAYER_ADVISER_INFO_CHANGE"; // 军师信息Array<AdviserInfo>
        GameEvent.PLAYER_FORMATION_INFO_CHANGE = "PLAYER_FORMATION_INFO_CHANGE"; // 阵型信息Array<FormationInfo>
        GameEvent.PLAYER_PROGRESS_INFO_CHANGE = "PLAYER_PROGRESS_INFO_CHANGE"; // 进程队列Array<ProgressInfo>
        GameEvent.PLAYER_MEMBER_INFO_CHANGE = "PLAYER_MEMBER_INFO_CHANGE"; // 联盟成员信息<MemberInfo>
        GameEvent.PLAYER_WANTED_INFO_CHANGE = "PLAYER_WANTED_INFO_CHANGE"; // 通缉令<WantedInfo>
        GameEvent.PLAYER_ACTIVITY_INFO_CHANGE = "PLAYER_ACTIVITY_INFO_CHANGE"; // 活动信息Array<ActivityInfo>
        GameEvent.PLAYER_ROLE_OTHER_ATTRI_CHANGE = "PLAYER_ROLE_OTHER_ATTRI_CHANGE"; // 角色属性<RoleOtherAttri>
        GameEvent.PLAYER_ARTIFACT_INFO_CHANGE = "PLAYER_ARTIFACT_INFO_CHANGE"; // 神兵信息Array<ArtifactInfo>
        GameEvent.PLAYER_GIFTS_INFO_CHANGE = "PLAYER_GIFTS_INFO_CHANGE"; // 礼包信息<PlayerGiftsInfoChangeEvent>
        GameEvent.PLAYER_ENEMY_CAMP_CHANGE = "PLAYER_ENEMY_CAMP_CHANGE"; // 已通关最大关卡Array<IIKVPairs>
        GameEvent.PLAYER_SINGLECRAFT_INFO_CHANGE = "PLAYER_SINGLECRAFT_INFO_CHANGE"; // 跨服信息Array<SinglecraftInfo>
        GameEvent.PLAYER_GENERAL_HISTORY_IDS_CHANGE = "PLAYER_GENERAL_HISTORY_IDS_CHANGE"; // 猎人图鉴Array<number>
        GameEvent.PLAYER_POTATO_HISTORY_IDS_CHANGE = "PLAYER_POTATO_HISTORY_IDS_CHANGE"; // 卡片图鉴Array<number>
        GameEvent.PLAYER_PET_INFO_CHANGE = "PLAYER_PET_INFO_CHANGE"; // 宠物信息Array<PetInfo>
        GameEvent.PLAYER_GET_GOODS_CHANGE = "PLAYER_GET_GOODS_CHANGE"; // 物品获得信息Array<GoodsInfo>
        GameEvent.PLAYER_LEAGUE_INFO_CHANGE = "PLAYER_LEAGUE_INFO_CHANGE"; // 联盟信息<LeagueInfo>
        GameEvent.PLAYER_SIGN_ITEMS_CHANGE = "PLAYER_SIGN_ITEMS_CHANGE"; // 签到列表Array<SignItem>
        GameEvent.PLAYER_MAIL_BOX_INFO_CHANGE = "PLAYER_MAIL_BOX_INFO_CHANGE"; // 邮件信息Array<MailBoxInfo>
        GameEvent.PLAYER_DOUBLE_COLOR_INFO_CHANGE = "PLAYER_DOUBLE_COLOR_INFO_CHANGE"; // 双色球Array<MailBoxInfo>
        // 服务端通知
        GameEvent.SERVER_NOTICE_ROLE_INFO = "SERVER_NOTICE_ROLE_INFO"; // 玩家数据变更<message.RoleInfoNoticeRequest>
        GameEvent.SERVER_NOTICE_OTHER_ROLE_INFO = "SERVER_NOTICE_OTHER_ROLE_INFO"; // 玩家其他数据变更<message.RoleOtherInfoNoticeRequest>
        GameEvent.SERVER_NOTICE_CHAT_CHANNEL = "SERVER_NOTICE_CHAT_CHANNEL"; // 跨服聊天频道变化通知<message.ChatChannelChangeNoticeRequest>
        GameEvent.SERVER_NOTICE_CHAT_MESSAGE = "SERVER_NOTICE_CHAT_MESSAGE"; // 推送聊天消息<message.ChatMessageNoticeRequest>
        GameEvent.SERVER_NOTICE_MAIL_STATE = "SERVER_NOTICE_MAIL_STATE"; // 新邮件通知<message.MailStateNoticeRequest>
        GameEvent.SERVER_NOTICE_CHARGE = "SERVER_NOTICE_CHARGE"; // 新充值通知<message.ChargeNoticeRequest>
        GameEvent.SERVER_NOTICE_LEAGUE_APPLY = "SERVER_NOTICE_LEAGUE_APPLY"; // 申请联盟通知<message.LeagueApplyNoticeRequest>
        GameEvent.SERVER_NOTICE_FRIEND_APPLY = "SERVER_NOTICE_FRIEND_APPLY"; // 好友申请通知<message.FriendApplyNoticeRequest>
        GameEvent.SERVER_NOTICE_REMOVE_FORMATION = "SERVER_NOTICE_REMOVE_FORMATION"; // 删除阵型通知<message.RemoveFormationNoticeRequest>
        GameEvent.SERVER_NOTICE_TEACH_STEP = "SERVER_NOTICE_TEACH_STEP"; // 新手引导通知<message.TeachStepNoticeRequest>
        GameEvent.SERVER_NOTICE_LEAGUE_SCENE_JOIN = "SERVER_NOTICE_LEAGUE_SCENE_JOIN"; // 成员加入场景通知<message.LeagueSceneJoinNoticeRequest>
        GameEvent.SERVER_NOTICE_LEAGUE_BOSS = "SERVER_NOTICE_LEAGUE_BOSS"; // BOSS变化通知<message.LeagueBossNoticeRequest>
        GameEvent.SERVER_NOTICE_LEAGUE_BOSS_RANK = "SERVER_NOTICE_LEAGUE_BOSS_RANK"; // BOSS伤害排行榜通知<message.LeagueBossRankNoticeRequest>
        GameEvent.SERVER_NOTICE_LEAGUE_MEMBER = "SERVER_NOTICE_LEAGUE_MEMBER"; // 通知联盟成员信息变化<message.LeagueMemberNoticeRequest>
        GameEvent.SERVER_NOTICE_LEAGUE_BOSS_PARTY = "SERVER_NOTICE_LEAGUE_BOSS_PARTY"; // 联盟加餐通知<message.LeagueBossPartyNoticeRequest>
        GameEvent.SERVER_NOTICE_LEAGUE_INSTANCE = "SERVER_NOTICE_LEAGUE_INSTANCE"; // 联盟副本变化通知<message.LeagueInstanceNoticeRequest>
        GameEvent.SERVER_NOTICE_LEAGUE_MATCH_BATTLE = "SERVER_NOTICE_LEAGUE_MATCH_BATTLE"; // 联赛联盟信息变化<message.LeagueMatchBattleNoticeRequest>
        GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO = "SERVER_NOTICE_SCENE_ITEM_POS_INFO"; // 场景推送其他玩家位置<message.SceneItemPosInfoNoticeRequest>
        GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT = "SERVER_NOTICE_BATTLE_IMITATE_RESULT"; // 推送对方战斗结果<message.BattleImitateResultNoticeRequest>
        GameEvent.SERVER_NOTICE_SCENE_ITEM_POS = "SERVER_NOTICE_SCENE_ITEM_POS"; // 推送其他玩家位置<message.SceneItemPosNoticeRequest>
        GameEvent.SERVER_NOTICE_WONDERLAND_ROLE_INFO = "SERVER_NOTICE_WONDERLAND_ROLE_INFO"; // 仙境玩家信息<message.WonderlandRoleInfoNoticeRequest>
        GameEvent.SERVER_NOTICE_BOSS_HP_CHANGE = "SERVER_NOTICE_BOSS_HP_CHANGE"; // 仙境boss血量变化<message.BossHpChangeNoticeRequest>
        GameEvent.SERVER_NOTICE_BOSS_ROLE_INFO = "SERVER_NOTICE_BOSS_ROLE_INFO"; // 仙境BOSS玩家信息<message.BossRoleInfoNoticeRequest>
        GameEvent.SERVER_NOTICE_SCENE_BOSS_RESULT = "SERVER_NOTICE_SCENE_BOSS_RESULT"; // 仙境boss结算信息<message.SceneBossResultNoticeRequest>
        GameEvent.SERVER_NOTICE_MATCHING_RESULT = "SERVER_NOTICE_MATCHING_RESULT"; // 推送匹配成功信息<message.MatchingResultNoticeRequest>
        GameEvent.SERVER_LINE_CHANGE = "SERVER_LINE_CHANGE"; // 换线通知
        // 公共数值变更
        GameEvent.PLAYER_LEVEL_UP = "PLAYER_LEVEL_UP"; // 玩家升级<level:number>
        GameEvent.PLAYER_COIN_CHANGE = "PLAYER_COIN_CHANGE"; // 玩家金币变更<coin:number>
        GameEvent.PLAYER_POWER_CHANGE = "PLAYER_POWER_CHANGE"; // 玩家体力变更<power:number>
        GameEvent.PLAYER_TOKEN_CHANGE = "PLAYER_TOKEN_CHANGE"; // 玩家钻石(代币)变更<token:number>
        // 公会
        GameEvent.LEAGUE_HOME_UPDATE = "LEAGUE_HOME_UPDATE";
        GameEvent.LEAGUE_HOME_CLOSE = "LEAGUE_HOME_CLOSE";
        GameEvent.LEAGUE_CHOOSE_CLOSE = "LEAGUE_CHOOSE_CLOSE";
        GameEvent.LEAGUE_MAIN_UPDATE = "LEAGUE_MAIN_UPDATE";
        GameEvent.LEAGUE_MAIN_TWEEN = "LEAGUE_MAIN_TWEEN";
        GameEvent.LEAGUE_BEFORE_JOIN_CLOSE = "LEAGUE_BEFORE_JOIN_CLOSE";
        GameEvent.LEAGUE_MANAGER_MAIN_TWEEN = "LEAGUE_MANAGER_MAIN_TWEEN";
        GameEvent.LEAGUE_MANAGE_MAIN_REMOVEITEM = "LEAGUE_MANAGE_MAIN_REMOVEITEM";
        GameEvent.LEAGUE_MATCH_MALL_MAIN_UPDATE = "LEAGUE_MATCH_MALL_MAIN_UPDATE";
        GameEvent.LEAGUE_UNION_BATTLE_MAIN_UPDATE2 = "LEAGUE_UNION_BATTLE_MAIN_UPDATE2";
        // 上阵界面
        GameEvent.ON_MOVE = "ON_MOVE";
        GameEvent.BATTLE_VALUE_CHANGE = "BATTLE_VALUE_CHANGE";
        GameEvent.FORMATE_REFRESH_LIST = "FORMATE_REFRESH_LIST";
        GameEvent.FORMATE_REFRESH_LIST_ITEM = "FORMATE_REFRESH_LIST_ITEM";
        GameEvent.MOUSE_BEGIN = "MOUSE_BEGIN";
        GameEvent.FORMATION_DATE = "FORMATION_DATE";
        GameEvent.CROSS_BEAM_FIELD = "CROSS_BEAM_FIELD";
        GameEvent.DELAY_EXECUTE = "DELAY_EXECUTE";
        // 战斗力
        GameEvent.FIGHTING_CAPACITY = "FIGHTING_CAPACITY";
        // 阵容方案
        GameEvent.DRAG_LOOSEN = "DRAGLOOSEN";
        GameEvent.USING_SUCCESSFUL = "USING_SUCCESSFUL";
        GameEvent.CONTINUE = "CONTINUE";
        GameEvent.BUTTON_Get_AWARD = "BUTTON_Get_AWARD";
        // 工会战数据
        GameEvent.TEAM_FIGHT_ITEM = "TEAM_FIGHT_ITEM";
        // 跨服格斗场数据
        GameEvent.CROSS_SERVER_COMBAT_ITEM = "CROSS_SERVER_COMBAT_ITEM";
        // 本服格斗场数据
        GameEvent.FIGHT_FIELD_ITEM = "FIGHT_FIELD_ITEM";
        // 执照数据
        GameEvent.LICENSE_ITEM = "LICENSE_ITEM";
        // 好友单队数据
        GameEvent.FRIUNDS_ITEM = "FRIUNDS_ITEM";
        // 好友多队数据
        GameEvent.MANY_TEAMS = "MANY_TEAMS";
        /**打开加载界面 */
        GameEvent.OPEN_LOGING_SCENE = "OPEN_LOGING_SCENE";
        /**关闭加载界面 */
        GameEvent.CLOSE_LOGING_SCENE = "CLOSE_LOGING_SCENE";
        /**加载界面打开了 */
        GameEvent.LOGING_SCENE = "LOGING_SCENE";
        /**加载界面进度 */
        GameEvent.LOGING_SCENE_PROGRESS = "LOGING_SCENE_PROGRESS";
        /**工会boss战斗 */
        GameEvent.LEAGUEBOSSBATTLE = "LEAGUEBOSSBATTLE";
        // 主城刷新
        GameEvent.MAIN_CITY_UPDATE = "MAIN_CITY_UPDATE";
        // 其他玩家是否可见
        GameEvent.LOOK_OTHER_PLAYER = "LOOK_OTHER_PLAYER";
        // 主城重新拉取其他玩家
        GameEvent.MAIN_CITY_MEMBER_LIST = "MAIN_CITY_MEMBER_LIST";
        // 显示物品详情
        GameEvent.SHOW_GOODS_PROPERTY = "SHOW_GOODS_PROPERTY";
        GameEvent.SHOW_GOODS_PROPERTY_1 = "SHOW_GOODS_PROPERTY_1"; // 恭喜获得用
        //许愿屋更新
        GameEvent.XUYUAN_UPDATE = "XUYUAN_UPDATE";
        // 
        GameEvent.FISHING_ENDITEM = "FISHING_ENDITEM";
        GameEvent.ON_ABOVE_POP = "ON_ABOVE_POP";
        //选择头像
        GameEvent.COMMON_CHANGE_ICON_SHUAXIN = "COMMON_CHANGE_ICON_SHUAXIN";
        /**玩家信息里系统设置 */
        GameEvent.SYSTEM_SETUP = "SYSTEM_SETUP";
        /**挑战完副本后刷新信息 */
        GameEvent.PLAYER_HUNTER_BADGE = "PLAYER_HUNTER_BADGE";
        /**好友 -- 私聊 */
        GameEvent.FRIEND_CHAT = "FRIEND_CHAT";
        /**聊天 -- 三队数据 */
        GameEvent.MSGINFOP_DATA = "MSGINFOP_DATA";
        /**聊天 -- 公会发布 */
        GameEvent.GUILD_LOUNCH = "GUILD_LOUNCH";
        /**聊天 -- 战斗数据 */
        GameEvent.COMBAT_CHAT = "COMBAT_CHAT";
        /**聊天 -- 战斗关闭 */
        GameEvent.CLOSE_CHAT = "CLOSE_CHAT";
        // 好友 -- 移除弹窗
        GameEvent.FRIEND_TOPPOP_REMOVE = "FRIEND_TOPPOP_REMOVE";
        //  聊天重启拉取数据
        GameEvent.CHAT_RESTART = "CHAT_RESTART";
        //  体力补充界面刷新体力
        GameEvent.HUNTER_USERSTRENG_POWER = "HUNTER_USERSTRENG_POWER";
        GameEvent.SHOW_COMMON_MESSAGE = "SHOW_COMMON_MESSAGE";
        GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE = "ACTIVITY_SPECIAL_TYPE_UPDATE";
        GameEvent.ACTIVITY_TYPE_UPDATE = "ACTIVITY_TYPE_UPDATE";
        GameEvent.REFRESH_MAINCITY_BUBBLE = "REFRESH_MAINCITY_BUBBLE"; // 主线任务提示刷新
        // public static TEACH = "TEACH";
        // 新手引导
        GameEvent.START_NEW_TEACHING = "START_NEW_TEACHING"; // 所有新手引导教学任务 <curPart: number> 任务Id
        GameEvent.SHOW_UI = "SHOW_UI"; // ui添加到界面 <typeName: string> ui名字
        GameEvent.CLOSE_UI = "CLOSE_UI"; // ui从界面移除 <typeName: string> ui名字
        GameEvent.SHOW_FIGHT_UI = "SHOW_FIGHT_UI"; // 打开战斗UI <typeName: string> ui名字
        GameEvent.SHOW_SCENE = "SHOW_SCENE"; // 打开scene <typeName: string> scene名字
        GameEvent.CLOSE_SCENE = "CLOSE_SCENE"; // 关闭scene <typeName: string> scene名字
        GameEvent.SHOW_DIALOG = "SHOW_DIALOG"; // 打开dialog <typeName: string> dialog名字
        GameEvent.CLOSE_DIALOG = "CLOSE_DIALOG"; // 关闭dialog <typeName: string> dialog名字
        GameEvent.NUMBER_OF_DIALOG = "NUMBER_OF_DIALOG"; // 对话框显示数量 <count: number> dialog数量
        GameEvent.END_OF_THE_ANIMATION = "END_OF_THE_ANIMATION"; // 界面中动画结束标志 <isAni: boolean> 动画是否结束
        GameEvent.CLEAR_TIP_SPX = "CLEAR_TIP_SPX"; // 清除新手引导选中区域以及遮罩 <>
        GameEvent.IS_END_LAST_TEACH = "IS_END_LAST_TEACH"; // 是否完成上一个新手任务
        GameEvent.SKILL_CD_OK = "SKILL_CD_OK"; // 新手引导cd特殊处理 <isOk: boolean> 技能cd是否结束
        GameEvent.GET_MOUDLE_SIZE = "GET_MOUDLE_SIZE"; // 获取组件xywh事件 <isGetSize: boolean> 是否获取到组件的x y width height
        GameEvent.UI_LOADED_SUCCESS = "UI_LOADED_SUCCESS"; // 界面加载成功<typeName: string> // uiName
        GameEvent.LOGIN_BLACK_MASK = "LOGIN_BLACK_MASK";
        GameEvent.RESET_PLAYER_AVATA = "RESET_PLAYER_AVATA"; // 更新角色形象
        // 埋点事件
        GameEvent.TRACK_SELECT_GROUP = "TRACK_SELECT_GROUP"; // 选择分区
        GameEvent.TRACK_ENTRY_GAME = "TRACK_ENTRY_GAME"; // 进入主城<{group:message.GameGroupInfo, role:message.RoleShortInfo}>
        GameEvent.NETWORK_DISCONNECTION = "NETWORK_DISCONNECTION"; // 网络断开显示断线重连界面
        GameEvent.GET_LEVELUP_REWARD = "GET_LEVELUP_REWARD"; // 领取升级奖励
        GameEvent.WORK_SEND_START = "WORK_SEND_START"; // 工作派遣开始
        GameEvent.RERESH_WORKLOCK_STATE = "FRESH_WORKLOCK_STATE"; // 刷新工作派遣锁定状态
        GameEvent.WORK_END_REFRESH = "WORK_END_REFRESH"; // 任务结束领取奖励后刷新列表
        // 通行证
        GameEvent.UPDATE_BATTLEPASS_GIFT = "UPDATE_BATTLEPASS_GIFT"; // 初始化以及更新通行证奖励UI界面
        GameEvent.UPDATE_BATTLEPASS_MISSION = "UPDATE_BATTLEPASS_MISSION"; // 初始化以及更新通行证任务UI界面
        GameEvent.UPDATE_BATTLEPASS_REDTIP = "UPDATE_BATTLEPASS_REDTIP"; // 刷新通行证主界面红点
        GameEvent.UPDATE_BATTLEPASS_REWARD = "UPDATE_BATTLEPASS_REWARD"; // 更新通行证界面等级奖励
        GameEvent.PLAYER_PERMITPAY_CHANGE = "PLAYER_PERMITPAY_CHANGE"; // 购买高级通行证
        GameEvent.PLAYER_PERMITLEVEL_CHANGE = "PLAYER_PERMITLEVEL_CHANGE"; // 通行证等级变化
        GameEvent.CLOSE_BATTLEPASS = "CLOSE_BATTLEPASS"; //关闭通行证
        // 每日首充
        GameEvent.CLOSE_DAILYFIRSTCHARGE = "CLOSE_DAILYFIRSTCHARGE"; // 领取奖励关闭每日首充
        // 玩家vip等级发生变化
        GameEvent.PLAYER_VIPLEVEL_CHANGE = "PLAYER_VIPLEVEL_CHANGE";
        // 玩家执照等级发生变化
        GameEvent.PLAYER_LICENCELEVEL_CHANGE = "PLAYER_LICENCELEVEL_CHANGE";
        // 通知支付结果
        GameEvent.USER_PAY_RESULT = "USER_PAY_RESULT"; // 支付结果<boolean>
        // 关闭超值福利
        GameEvent.CLOSE_ACTIVITY_SCENE = "CLOSE_ACTIVITY_SCENE";
        // 关闭超值福利
        GameEvent.SET_HUNTER_ITEM = "SET_HUNTER_ITEM";
        return GameEvent;
    }());
    zj.GameEvent = GameEvent;
    __reflect(GameEvent.prototype, "zj.GameEvent");
    var PlayerGoodsInfoChangeEvent = (function (_super) {
        __extends(PlayerGoodsInfoChangeEvent, _super);
        function PlayerGoodsInfoChangeEvent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.goodsInfo = []; // 5.物品信息(不覆盖)
            _this.delGoods = []; // 6.删除物品(删除没有的物品Id)
            return _this;
        }
        return PlayerGoodsInfoChangeEvent;
    }(egret.Event));
    zj.PlayerGoodsInfoChangeEvent = PlayerGoodsInfoChangeEvent;
    __reflect(PlayerGoodsInfoChangeEvent.prototype, "zj.PlayerGoodsInfoChangeEvent");
    var PlayerGiftsInfoChangeEvent = (function (_super) {
        __extends(PlayerGiftsInfoChangeEvent, _super);
        function PlayerGiftsInfoChangeEvent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.giftInfos = []; // 23.礼包情况(不覆盖)
            _this.delGiftIndexs = []; // 24.删除礼包(删除已购买的礼包)
            return _this;
        }
        return PlayerGiftsInfoChangeEvent;
    }(egret.Event));
    zj.PlayerGiftsInfoChangeEvent = PlayerGiftsInfoChangeEvent;
    __reflect(PlayerGiftsInfoChangeEvent.prototype, "zj.PlayerGiftsInfoChangeEvent");
})(zj || (zj = {}));
//# sourceMappingURL=GameEvent.js.map