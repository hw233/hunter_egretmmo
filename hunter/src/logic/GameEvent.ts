namespace zj {
// 全局事件定义
// guoshanhe
// 2018.11.5

export class GameEvent {

    // 网络状态变更
    public static NET_SERVER_CONNECTED = "NET_SERVER_CONNECTED"; // 连接上游戏服务器
    public static NET_SERVER_DISCONNECTED = "NET_SERVER_DISCONNECTED"; // 与游戏服务器断开连接

    public static TABLE_CONFIG_LOAD_OK = "TABLE_CONFIG_LOAD_OK"; // 策划配置表加载完成

    // aone账号管理
    public static AONE_SELECT_ACCOUNT = "AONE_SELECT_ACCOUNT"; // 选择账号<account:string>
    public static AONE_DELETE_ACCOUNT = "AONE_DELETE_ACCOUNT"; // 选择账号<account:string>

    // 游戏数据变更
    public static PLAYER_LOGIN_GAMESERVER_INFO = "PLAYER_LOGIN_GAMESERVER_INFO"; // 角色登录游戏服返回数据<LoginGameserverRespBody>
    public static PLAYER_BASE_INFO_CHANGE = "PLAYER_BASE_INFO_CHANGE"; // 角色基础数据<RoleBaseInfo>
    public static PLAYER_MIX_UNIT_INFO_CHANGE = "PLAYER_MIX_UNIT_INFO_CHANGE"; // 角色数据杂项<RoleMixUnit>
    public static PLAYER_POTATOS_INFO_CHANGE = "PLAYER_POTATOS_INFO_CHANGE"; // 宝物/卡片信息Array<PotatoInfo>
    public static PLAYER_SIGN_INFO_CHANGE = "PLAYER_SIGN_INFO_CHANGE"; // 签到信息<SignInfo>
    public static PLAYER_GOODS_INFO_CHANGE = "PLAYER_GOODS_INFO_CHANGE"; // 物品信息<PlayerGoodsInfoChangeEvent>
    public static PLAYER_LICENCE_INFO_CHANGE = "PLAYER_LICENCE_INFO_CHANGE"; // 执照信息<LicenceInfo>
    public static PLAYER_MISSION_INFO_CHANGE = "PLAYER_MISSION_INFO_CHANGE"; // 任务信息Array<MissionInfo>
    public static PLAYER_MISSION_ACTIVE_CHANGE = "PLAYER_MISSION_ACTIVE_CHANGE"; // 每日活跃度<MissionActive>
    public static PLAYER_GENERALS_CHANGE = "PLAYER_GENERALS_CHANGE"; // 武将/猎人信息Array<GeneralInfo>
    public static PLAYER_MOB_INFO_CHANGE = "PLAYER_MOB_INFO_CHANGE"; // 普通怪物信息Array<MobInfo>
    public static PLAYER_INSTANCE_INFO_CHANGE = "PLAYER_INSTANCE_INFO_CHANGE"; // 副本信息<InstanceInfo>
    public static PLAYER_TOWER_INFO_CHANGE = "PLAYER_TOWER_INFO_CHANGE"; // 塔信息<TowerInfo>
    public static PLAYER_ADVISER_INFO_CHANGE = "PLAYER_ADVISER_INFO_CHANGE"; // 军师信息Array<AdviserInfo>
    public static PLAYER_FORMATION_INFO_CHANGE = "PLAYER_FORMATION_INFO_CHANGE"; // 阵型信息Array<FormationInfo>
    public static PLAYER_PROGRESS_INFO_CHANGE = "PLAYER_PROGRESS_INFO_CHANGE"; // 进程队列Array<ProgressInfo>
    public static PLAYER_MEMBER_INFO_CHANGE = "PLAYER_MEMBER_INFO_CHANGE"; // 联盟成员信息<MemberInfo>
    public static PLAYER_WANTED_INFO_CHANGE = "PLAYER_WANTED_INFO_CHANGE"; // 通缉令<WantedInfo>
    public static PLAYER_ACTIVITY_INFO_CHANGE = "PLAYER_ACTIVITY_INFO_CHANGE"; // 活动信息Array<ActivityInfo>
    public static PLAYER_ROLE_OTHER_ATTRI_CHANGE = "PLAYER_ROLE_OTHER_ATTRI_CHANGE"; // 角色属性<RoleOtherAttri>
    public static PLAYER_ARTIFACT_INFO_CHANGE = "PLAYER_ARTIFACT_INFO_CHANGE"; // 神兵信息Array<ArtifactInfo>
    public static PLAYER_GIFTS_INFO_CHANGE = "PLAYER_GIFTS_INFO_CHANGE"; // 礼包信息<PlayerGiftsInfoChangeEvent>
    public static PLAYER_ENEMY_CAMP_CHANGE = "PLAYER_ENEMY_CAMP_CHANGE"; // 已通关最大关卡Array<IIKVPairs>
    public static PLAYER_SINGLECRAFT_INFO_CHANGE = "PLAYER_SINGLECRAFT_INFO_CHANGE"; // 跨服信息Array<SinglecraftInfo>
    public static PLAYER_GENERAL_HISTORY_IDS_CHANGE = "PLAYER_GENERAL_HISTORY_IDS_CHANGE"; // 猎人图鉴Array<number>
    public static PLAYER_POTATO_HISTORY_IDS_CHANGE = "PLAYER_POTATO_HISTORY_IDS_CHANGE"; // 卡片图鉴Array<number>
    public static PLAYER_PET_INFO_CHANGE = "PLAYER_PET_INFO_CHANGE"; // 宠物信息Array<PetInfo>
    public static PLAYER_GET_GOODS_CHANGE = "PLAYER_GET_GOODS_CHANGE"; // 物品获得信息Array<GoodsInfo>
    public static PLAYER_LEAGUE_INFO_CHANGE = "PLAYER_LEAGUE_INFO_CHANGE"; // 联盟信息<LeagueInfo>
    public static PLAYER_SIGN_ITEMS_CHANGE = "PLAYER_SIGN_ITEMS_CHANGE"; // 签到列表Array<SignItem>
    public static PLAYER_MAIL_BOX_INFO_CHANGE = "PLAYER_MAIL_BOX_INFO_CHANGE"; // 邮件信息Array<MailBoxInfo>
    public static PLAYER_DOUBLE_COLOR_INFO_CHANGE = "PLAYER_DOUBLE_COLOR_INFO_CHANGE"; // 双色球Array<MailBoxInfo>


    // 服务端通知
    public static SERVER_NOTICE_ROLE_INFO = "SERVER_NOTICE_ROLE_INFO"; // 玩家数据变更<message.RoleInfoNoticeRequest>
    public static SERVER_NOTICE_OTHER_ROLE_INFO = "SERVER_NOTICE_OTHER_ROLE_INFO"; // 玩家其他数据变更<message.RoleOtherInfoNoticeRequest>
    public static SERVER_NOTICE_CHAT_CHANNEL = "SERVER_NOTICE_CHAT_CHANNEL"; // 跨服聊天频道变化通知<message.ChatChannelChangeNoticeRequest>
    public static SERVER_NOTICE_CHAT_MESSAGE = "SERVER_NOTICE_CHAT_MESSAGE"; // 推送聊天消息<message.ChatMessageNoticeRequest>
    public static SERVER_NOTICE_MAIL_STATE = "SERVER_NOTICE_MAIL_STATE"; // 新邮件通知<message.MailStateNoticeRequest>
    public static SERVER_NOTICE_CHARGE = "SERVER_NOTICE_CHARGE"; // 新充值通知<message.ChargeNoticeRequest>
    public static SERVER_NOTICE_LEAGUE_APPLY = "SERVER_NOTICE_LEAGUE_APPLY"; // 申请联盟通知<message.LeagueApplyNoticeRequest>
    public static SERVER_NOTICE_FRIEND_APPLY = "SERVER_NOTICE_FRIEND_APPLY"; // 好友申请通知<message.FriendApplyNoticeRequest>
    public static SERVER_NOTICE_REMOVE_FORMATION = "SERVER_NOTICE_REMOVE_FORMATION"; // 删除阵型通知<message.RemoveFormationNoticeRequest>
    public static SERVER_NOTICE_TEACH_STEP = "SERVER_NOTICE_TEACH_STEP"; // 新手引导通知<message.TeachStepNoticeRequest>
    public static SERVER_NOTICE_LEAGUE_SCENE_JOIN = "SERVER_NOTICE_LEAGUE_SCENE_JOIN"; // 成员加入场景通知<message.LeagueSceneJoinNoticeRequest>
    public static SERVER_NOTICE_LEAGUE_BOSS = "SERVER_NOTICE_LEAGUE_BOSS"; // BOSS变化通知<message.LeagueBossNoticeRequest>
    public static SERVER_NOTICE_LEAGUE_BOSS_RANK = "SERVER_NOTICE_LEAGUE_BOSS_RANK"; // BOSS伤害排行榜通知<message.LeagueBossRankNoticeRequest>
    public static SERVER_NOTICE_LEAGUE_MEMBER = "SERVER_NOTICE_LEAGUE_MEMBER"; // 通知联盟成员信息变化<message.LeagueMemberNoticeRequest>
    public static SERVER_NOTICE_LEAGUE_BOSS_PARTY = "SERVER_NOTICE_LEAGUE_BOSS_PARTY"; // 联盟加餐通知<message.LeagueBossPartyNoticeRequest>
    public static SERVER_NOTICE_LEAGUE_INSTANCE = "SERVER_NOTICE_LEAGUE_INSTANCE"; // 联盟副本变化通知<message.LeagueInstanceNoticeRequest>
    public static SERVER_NOTICE_LEAGUE_MATCH_BATTLE = "SERVER_NOTICE_LEAGUE_MATCH_BATTLE"; // 联赛联盟信息变化<message.LeagueMatchBattleNoticeRequest>
    public static SERVER_NOTICE_SCENE_ITEM_POS_INFO = "SERVER_NOTICE_SCENE_ITEM_POS_INFO"; // 场景推送其他玩家位置<message.SceneItemPosInfoNoticeRequest>
    public static SERVER_NOTICE_BATTLE_IMITATE_RESULT = "SERVER_NOTICE_BATTLE_IMITATE_RESULT"; // 推送对方战斗结果<message.BattleImitateResultNoticeRequest>
    public static SERVER_NOTICE_SCENE_ITEM_POS = "SERVER_NOTICE_SCENE_ITEM_POS"; // 推送其他玩家位置<message.SceneItemPosNoticeRequest>
    public static SERVER_NOTICE_WONDERLAND_ROLE_INFO = "SERVER_NOTICE_WONDERLAND_ROLE_INFO"; // 仙境玩家信息<message.WonderlandRoleInfoNoticeRequest>
    public static SERVER_NOTICE_BOSS_HP_CHANGE = "SERVER_NOTICE_BOSS_HP_CHANGE"; // 仙境boss血量变化<message.BossHpChangeNoticeRequest>
    public static SERVER_NOTICE_BOSS_ROLE_INFO = "SERVER_NOTICE_BOSS_ROLE_INFO"; // 仙境BOSS玩家信息<message.BossRoleInfoNoticeRequest>
    public static SERVER_NOTICE_SCENE_BOSS_RESULT = "SERVER_NOTICE_SCENE_BOSS_RESULT"; // 仙境boss结算信息<message.SceneBossResultNoticeRequest>
    public static SERVER_NOTICE_MATCHING_RESULT = "SERVER_NOTICE_MATCHING_RESULT"; // 推送匹配成功信息<message.MatchingResultNoticeRequest>

    public static SERVER_LINE_CHANGE = "SERVER_LINE_CHANGE";// 换线通知
    // 公共数值变更
    public static PLAYER_LEVEL_UP = "PLAYER_LEVEL_UP"; // 玩家升级<level:number>
    public static PLAYER_COIN_CHANGE = "PLAYER_COIN_CHANGE"; // 玩家金币变更<coin:number>
    public static PLAYER_POWER_CHANGE = "PLAYER_POWER_CHANGE"; // 玩家体力变更<power:number>
    public static PLAYER_TOKEN_CHANGE = "PLAYER_TOKEN_CHANGE"; // 玩家钻石(代币)变更<token:number>


    // 公会
    public static LEAGUE_HOME_UPDATE = "LEAGUE_HOME_UPDATE";
    public static LEAGUE_HOME_CLOSE = "LEAGUE_HOME_CLOSE";
    public static LEAGUE_CHOOSE_CLOSE = "LEAGUE_CHOOSE_CLOSE";
    public static LEAGUE_MAIN_UPDATE = "LEAGUE_MAIN_UPDATE";
    public static LEAGUE_MAIN_TWEEN = "LEAGUE_MAIN_TWEEN";
    public static LEAGUE_BEFORE_JOIN_CLOSE = "LEAGUE_BEFORE_JOIN_CLOSE";
    public static LEAGUE_MANAGER_MAIN_TWEEN = "LEAGUE_MANAGER_MAIN_TWEEN";
    public static LEAGUE_MANAGE_MAIN_REMOVEITEM = "LEAGUE_MANAGE_MAIN_REMOVEITEM";
    public static LEAGUE_MATCH_MALL_MAIN_UPDATE = "LEAGUE_MATCH_MALL_MAIN_UPDATE";
    public static LEAGUE_UNION_BATTLE_MAIN_UPDATE2 = "LEAGUE_UNION_BATTLE_MAIN_UPDATE2";

    // 上阵界面
    public static ON_MOVE = "ON_MOVE";
    public static BATTLE_VALUE_CHANGE = "BATTLE_VALUE_CHANGE";
    public static FORMATE_REFRESH_LIST = "FORMATE_REFRESH_LIST";
    public static FORMATE_REFRESH_LIST_ITEM = "FORMATE_REFRESH_LIST_ITEM";
    public static MOUSE_BEGIN = "MOUSE_BEGIN";
    public static FORMATION_DATE = "FORMATION_DATE";
    public static CROSS_BEAM_FIELD = "CROSS_BEAM_FIELD";
    public static DELAY_EXECUTE = "DELAY_EXECUTE";
    // 战斗力
    public static FIGHTING_CAPACITY = "FIGHTING_CAPACITY";

    // 阵容方案
    public static DRAG_LOOSEN = "DRAGLOOSEN";
    public static USING_SUCCESSFUL = "USING_SUCCESSFUL";
    public static CONTINUE = "CONTINUE";
    public static BUTTON_Get_AWARD = "BUTTON_Get_AWARD";

    // 工会战数据
    public static TEAM_FIGHT_ITEM = "TEAM_FIGHT_ITEM";
    // 跨服格斗场数据
    public static CROSS_SERVER_COMBAT_ITEM = "CROSS_SERVER_COMBAT_ITEM";
    // 本服格斗场数据
    public static FIGHT_FIELD_ITEM = "FIGHT_FIELD_ITEM";
    // 执照数据
    public static LICENSE_ITEM = "LICENSE_ITEM";
    // 好友单队数据
    public static FRIUNDS_ITEM = "FRIUNDS_ITEM";
    // 好友多队数据
    public static MANY_TEAMS = "MANY_TEAMS";

    /**打开加载界面 */
    public static OPEN_LOGING_SCENE = "OPEN_LOGING_SCENE";
    /**关闭加载界面 */
    public static CLOSE_LOGING_SCENE = "CLOSE_LOGING_SCENE";
    /**加载界面打开了 */
    public static LOGING_SCENE = "LOGING_SCENE";
    /**加载界面进度 */
    public static LOGING_SCENE_PROGRESS = "LOGING_SCENE_PROGRESS";
    /**工会boss战斗 */
    public static LEAGUEBOSSBATTLE = "LEAGUEBOSSBATTLE";

    // 主城刷新
    public static MAIN_CITY_UPDATE = "MAIN_CITY_UPDATE";
    // 其他玩家是否可见
    public static LOOK_OTHER_PLAYER = "LOOK_OTHER_PLAYER";
    // 主城重新拉取其他玩家
    public static MAIN_CITY_MEMBER_LIST = "MAIN_CITY_MEMBER_LIST";

    // 显示物品详情
    public static SHOW_GOODS_PROPERTY = "SHOW_GOODS_PROPERTY";
    public static SHOW_GOODS_PROPERTY_1 = "SHOW_GOODS_PROPERTY_1"; // 恭喜获得用

    //许愿屋更新
    public static XUYUAN_UPDATE = "XUYUAN_UPDATE";

    // 
    public static FISHING_ENDITEM = "FISHING_ENDITEM";
    public static ON_ABOVE_POP = "ON_ABOVE_POP";

    //选择头像
    public static COMMON_CHANGE_ICON_SHUAXIN = "COMMON_CHANGE_ICON_SHUAXIN";

    /**玩家信息里系统设置 */
    public static SYSTEM_SETUP = "SYSTEM_SETUP";

    /**挑战完副本后刷新信息 */
    public static PLAYER_HUNTER_BADGE = "PLAYER_HUNTER_BADGE";

    /**好友 -- 私聊 */
    public static FRIEND_CHAT = "FRIEND_CHAT";
    /**聊天 -- 三队数据 */
    public static MSGINFOP_DATA = "MSGINFOP_DATA";
    /**聊天 -- 公会发布 */
    public static GUILD_LOUNCH = "GUILD_LOUNCH";
    /**聊天 -- 战斗数据 */
    public static COMBAT_CHAT = "COMBAT_CHAT";
    /**聊天 -- 战斗关闭 */
    public static CLOSE_CHAT = "CLOSE_CHAT";

    // 好友 -- 移除弹窗
    public static FRIEND_TOPPOP_REMOVE = "FRIEND_TOPPOP_REMOVE";

    //  聊天重启拉取数据
    public static CHAT_RESTART = "CHAT_RESTART";

    //  体力补充界面刷新体力
    public static HUNTER_USERSTRENG_POWER = "HUNTER_USERSTRENG_POWER";

    public static SHOW_COMMON_MESSAGE = "SHOW_COMMON_MESSAGE";

    public static ACTIVITY_SPECIAL_TYPE_UPDATE = "ACTIVITY_SPECIAL_TYPE_UPDATE";
    public static ACTIVITY_TYPE_UPDATE = "ACTIVITY_TYPE_UPDATE";

    public static REFRESH_MAINCITY_BUBBLE = "REFRESH_MAINCITY_BUBBLE"; // 主线任务提示刷新

    // public static TEACH = "TEACH";

    // 新手引导
    public static START_NEW_TEACHING = "START_NEW_TEACHING"; // 所有新手引导教学任务 <curPart: number> 任务Id

    public static SHOW_UI = "SHOW_UI"; // ui添加到界面 <typeName: string> ui名字
    public static CLOSE_UI = "CLOSE_UI"; // ui从界面移除 <typeName: string> ui名字
    public static SHOW_FIGHT_UI = "SHOW_FIGHT_UI"; // 打开战斗UI <typeName: string> ui名字
    public static SHOW_SCENE = "SHOW_SCENE"; // 打开scene <typeName: string> scene名字
    public static CLOSE_SCENE = "CLOSE_SCENE"; // 关闭scene <typeName: string> scene名字
    public static SHOW_DIALOG = "SHOW_DIALOG"; // 打开dialog <typeName: string> dialog名字
    public static CLOSE_DIALOG = "CLOSE_DIALOG"; // 关闭dialog <typeName: string> dialog名字
    public static NUMBER_OF_DIALOG = "NUMBER_OF_DIALOG"; // 对话框显示数量 <count: number> dialog数量
    public static END_OF_THE_ANIMATION = "END_OF_THE_ANIMATION"; // 界面中动画结束标志 <isAni: boolean> 动画是否结束
    public static CLEAR_TIP_SPX = "CLEAR_TIP_SPX"; // 清除新手引导选中区域以及遮罩 <>
    public static IS_END_LAST_TEACH = "IS_END_LAST_TEACH"; // 是否完成上一个新手任务
    public static SKILL_CD_OK = "SKILL_CD_OK"; // 新手引导cd特殊处理 <isOk: boolean> 技能cd是否结束
    public static GET_MOUDLE_SIZE = "GET_MOUDLE_SIZE"; // 获取组件xywh事件 <isGetSize: boolean> 是否获取到组件的x y width height
    public static UI_LOADED_SUCCESS = "UI_LOADED_SUCCESS"; // 界面加载成功<typeName: string> // uiName
    public static LOGIN_BLACK_MASK = "LOGIN_BLACK_MASK";
    public static RESET_PLAYER_AVATA = "RESET_PLAYER_AVATA";// 更新角色形象

    // 埋点事件
    public static TRACK_SELECT_GROUP = "TRACK_SELECT_GROUP"; // 选择分区
    public static TRACK_ENTRY_GAME = "TRACK_ENTRY_GAME"; // 进入主城<{group:message.GameGroupInfo, role:message.RoleShortInfo}>

    public static NETWORK_DISCONNECTION = "NETWORK_DISCONNECTION"; // 网络断开显示断线重连界面

    public static GET_LEVELUP_REWARD = "GET_LEVELUP_REWARD"; // 领取升级奖励

    public static WORK_SEND_START = "WORK_SEND_START"; // 工作派遣开始
    public static RERESH_WORKLOCK_STATE = "FRESH_WORKLOCK_STATE"; // 刷新工作派遣锁定状态
    public static WORK_END_REFRESH = "WORK_END_REFRESH"; // 任务结束领取奖励后刷新列表

    // 通行证
    public static UPDATE_BATTLEPASS_GIFT = "UPDATE_BATTLEPASS_GIFT"; // 初始化以及更新通行证奖励UI界面
    public static UPDATE_BATTLEPASS_MISSION = "UPDATE_BATTLEPASS_MISSION"; // 初始化以及更新通行证任务UI界面
    public static UPDATE_BATTLEPASS_REDTIP = "UPDATE_BATTLEPASS_REDTIP"; // 刷新通行证主界面红点
    public static UPDATE_BATTLEPASS_REWARD = "UPDATE_BATTLEPASS_REWARD"; // 更新通行证界面等级奖励
    public static PLAYER_PERMITPAY_CHANGE = "PLAYER_PERMITPAY_CHANGE"; // 购买高级通行证
    public static PLAYER_PERMITLEVEL_CHANGE = "PLAYER_PERMITLEVEL_CHANGE"; // 通行证等级变化
    public static CLOSE_BATTLEPASS = "CLOSE_BATTLEPASS"; //关闭通行证

    // 每日首充
    public static CLOSE_DAILYFIRSTCHARGE = "CLOSE_DAILYFIRSTCHARGE"; // 领取奖励关闭每日首充

    // 玩家vip等级发生变化
    public static PLAYER_VIPLEVEL_CHANGE = "PLAYER_VIPLEVEL_CHANGE";
    // 玩家执照等级发生变化
    public static PLAYER_LICENCELEVEL_CHANGE = "PLAYER_LICENCELEVEL_CHANGE";

    // 通知支付结果
    public static USER_PAY_RESULT = "USER_PAY_RESULT"; // 支付结果<boolean>

    // 关闭超值福利
    public static CLOSE_ACTIVITY_SCENE = "CLOSE_ACTIVITY_SCENE";

    // 关闭超值福利
    public static SET_HUNTER_ITEM = "SET_HUNTER_ITEM";
}

export class PlayerGoodsInfoChangeEvent extends egret.Event {
    public goodsInfo: Array<message.GoodsInfo> = [];  // 5.物品信息(不覆盖)
    public delGoods: Array<number> = [];  // 6.删除物品(删除没有的物品Id)
}

export class PlayerGiftsInfoChangeEvent extends egret.Event {
    public giftInfos: Array<message.GiftInfo> = [];  // 23.礼包情况(不覆盖)
    public delGiftIndexs: Array<number> = [];  // 24.删除礼包(删除已购买的礼包)
}

}