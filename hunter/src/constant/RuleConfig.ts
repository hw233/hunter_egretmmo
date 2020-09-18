namespace zj {
export const RuleConfig = {

sign : `
【签到说明】
1.签到列表每个自然月轮换一次。
2.奖励下方标识天数为累计签到天数，并不是按日期签到，中间不会跳跃。
`,

treasure : `
【宝箱说明】
`,

worship : `
【访仙说明】
`,

tavern : `
【酒馆说明】
1.在酒馆中喝酒可以获得猎人、猎人碎片、友情点等。
2.喝酒有三种方式，其中“请喝酒”可以使用道具和钻石，其他两种只能使用道具。
3.喝酒获得的友情点可以在友情商店兑换稀有道具。
4.获得已有的猎人将会转化成一定数量的该猎人碎片。
`,

tower : `
【天空竞技场说明】
【普通】
1.天空竞技场挑战没有次数限制，玩家每通关一层可获得该层奖励，并且解锁下一层。
2.挑战进度和奖励每两周重置一次。
3.重置后玩家可以使用直达功能（VIP2解锁），直达到历史最高层并领取该层之前的所有奖励。
【高级】
1.天空竞技场挑战没有次数限制，玩家每通关一层可获得该层奖励，并且解锁下一层。
2.挑战进度和奖励每四周重置一次。
3.重置后玩家可以使用直达功能（VIP2解锁），直达到历史最高层并领取该层之前的所有奖励。
`,

league : `
【公会说明】
1.会长和副会长为公会管理员，可以在管理界面中处理公会事务，以及开启公会BOSS和购买公会副本挑战次数。
2.公会等级越高，公会成员人数上限越大。
3.公会成员参与建设可提升公会经验，同时建设的成员可以获得一定数量的公会币。
`,

money : `
【招财说明】
`,

bastille : `
【伏牛寨说明】
`,

arena : `
【本服格斗说明】
1.本服格斗每晚20：00结算排名，并通过邮件发放排名奖励。排名越高，奖励越丰厚。
2.本服格斗中为自动战斗，不可手动操作，亦不可中途暂停或退出战斗。
3.战斗中可上阵4名猎人，并且可以为每名猎人设置一名援护。
4.战斗规定时间内，将对方全部猎人消灭即为胜利。若战斗超时，则判进攻方为负。
5.若进攻方挑战胜利，则双方排位名次对调。
6.每天每个玩家可以免费进行5场格斗，每次格斗之后需等待一定冷却时间才可进行下次格斗。玩家可花费钻石清除冷却。
7.格斗次数用完时，玩家可花费钻石购买格斗次数。
8.当玩家提升了自身历史最高排名时，可获得一定数量的钻石作为奖励。
`,

psychic : `
【念力说明】
1.念力是猎人的特有属性，猎人达到6星之后即可激发。
2.激发后将在念力阵法的6个位置上分别生成念力属性。
3.念力属性初始均为1级，最高可修炼至10级。
4.相同名称前缀的念力可以激活组合效果。
5.组合效果的等级与同名称前缀念力中等级最低的念力一致，最高10级。
`
,

//强化、锻造、刻印
equip :  {
    [1] : `【装备强化说明】`,
    [2] : `【装备锻造说明】`,
    [3] : `【装备刻印说明】`,

},



wanted_main :  `
【流星街说明】
1.流星街共分为三个地区，分别是：街道外围、废物堆填区、病毒隔离区。
2.三个地区分别产出金币、经验道具、猎人碎片等资源。
3.三个地区内的怪物各具特点，玩家需要根据怪物特点选择合适的猎人应战。
4.地区内的关卡需逐个挑战进行解锁，解锁后的关卡可随意进行挑战，但高等级关卡的产出更好。
5.三个地区的挑战都有可能产出上阵猎人的碎片。
6.挑战次数每日凌晨4点重置。
`,

wanted_choose :  `
【流星街说明】
1.流星街共分为三个地区，分别是：街道外围、废物堆填区、病毒隔离区。
2.三个地区分别产出金币、经验道具、猎人碎片等资源。
3.三个地区内的怪物各具特点，玩家需要根据怪物特点选择合适的猎人应战。
4.地区内的关卡需逐个挑战进行解锁，解锁后的关卡可随意进行挑战，但高等级关卡的产出更好。
5.三个地区的挑战都有可能产出上阵猎人的碎片。
6.挑战次数每日凌晨4点重置。
`,

mine :  `
【矿洞说明】
`,

adviser : `
【观星】
`,

leagueAnimal : `
【公会BOSS说明】
1.会长和副会长有权限花费一定公会活跃开启公会BOSS，公会BOSS每天可以开启一次。
2.公会BOSS开启后，每名公会成员都有一定的挑战机会。
3.每次挑战开始前，玩家都可以使用5次激励，激励仅对当次挑战有效。
4.成员在规定时间内击杀BOSS，则可开启庆功宴。
5.庆功宴会持续一段时间，期间每名成员可以领取一份庆功宴奖励。
6.公会成员可在庆功宴中花费钻石进行“加菜”，加菜后所有成员可额外领取一份奖励。
`,

leagueBoss : `
【公会BOSS说明】
1.会长和副会长有权限花费一定公会活跃开启公会BOSS，公会BOSS每天可以开启一次。
2.公会BOSS开启后，每名公会成员都有一定的挑战机会。
3.每次挑战开始前，玩家都可以使用5次激励，激励仅对当次挑战有效。
4.成员在规定时间内击杀BOSS，则可开启庆功宴。
5.庆功宴会持续一段时间，期间每名成员可以领取一份庆功宴奖励。
6.公会成员可在庆功宴中花费钻石进行“加菜”，加菜后所有成员可额外领取一份奖励。
`,

leagueFish : `
【钓鱼说明】
1.玩家每天都有一定次数的垂钓机会。
2.共有4种品质的鱼类供玩家垂钓，鱼的品质越高奖励越好。
3.玩家可以使用刷新品质和一键刷紫功能来得到自己满意的鱼类。
4.下竿后，玩家需要等待一段时间才可以收竿。
5.垂钓结束后，玩家可进行收竿，得到的鱼类会自动开出奖励。
`,

leagueInstance : `
【公会副本说明】
1.公会副本共有7关，第一关默认开启，其余关卡需要通关前一关解锁。
2.所有成员共用一个副本进度，玩家需在有限的挑战次数里尽可能消耗BOSS血量。
3.挑战次数每日重置，会长和副会长有权限花费公会活跃为全员增加挑战次数。
4.每个关卡都分为三个阶段的奖励，分别在BOSS损失30%、60%、100%血量时获得。
5.阶段达成时，每名成员均可以领取一份奖励。
6.公会副本每周重置一次，未领取的奖励将以邮件形式发放。
`,

leagueWar : `
【帮会战说明】
`,

wonderland : `
【贪婪之岛说明】
1.贪婪之岛内包含多个区域，每个区域都有丰富有趣的玩法。
2.安多尼拔是和平区域，在这里玩家可以采集果实兑换道具，还可以进行猜拳、钓鱼等活动。
3.大草原是战斗区域，在这里玩家可以相互切磋抢夺果实。
4.安多尼拔和大草原里的果树，采集时都需要消耗能量胶囊。
`,

runes : `
【猜拳说明】
1.玩家每天有一定次数的猜拳机会。
2.玩家每次猜拳都会派出6名选手出战，根据我方选手的胜场数量，获得对应奖励，胜场越多，奖励越丰厚。
3.若玩家对猜拳结果不满意，可以使用重新猜拳的功能，有机会获得更多的胜场。
`,

wonderlandBoss : `
【世界BOSS说明】
1.世界BOSS每天21点开启，持续30分钟，30级以上玩家可以在贪婪之岛内的“寿富拉比”地区参加活动。
2.活动开启后玩家才可以进入活动场景，BOSS会在倒计时30秒后出现在场景里。
3.点击BOSS形象或者点击挑战按钮均可对BOSS进行挑战。
4.挑战失败后队伍会进入复活状态，复活后可再次挑战。
5.玩家在活动时间内将BOSS击杀或者活动开启30分钟后，活动结束。
6.活动结束后，系统会根据玩家的伤害排行发放奖励，击杀BOSS的玩家会额外获得一份幸运奖。
`,

ActivityBoss :`
【活动BOSS说明】
1.活动开启时间内每天进行2场，每场持续30分钟，30级以上玩家可参加。
2.活动开启后玩家才可以进入活动场景。
3.点击BOSS形象或者点击挑战按钮均可对BOSS进行挑战。
4.每场活动有5次挑战机会，每次挑战最多持续1分30秒。
5.玩家对BOSS造成伤害可获得活动积分。
6.玩家可以花费金币或钻石进行激励，提高积分加成。
7.积分加成只对每场活动的5次挑战有效。
8.活动结束后根据玩家的积分排名以邮件形式发放奖励。
`,



singlePk : `
【跨服格斗场说明】
1.跨服格斗场是由所有服务器内40级以上玩家组成的。
2.玩家每天可以免费进行6次挑战，也可花费一定钻石补充挑战次数。
3.玩家主动挑战或被动挑战都会发生积分的变化。
4.段位共分为九段，积分达到一定数值会产生段位变化。
5.每日22点系统会根据玩家的段位发放段位日常奖励。
6.每个赛季结束时系统会根据玩家段位发放段位赛季奖励，排名前100名的玩家还会有丰厚的排名奖励！
7.参与挑战会获得荣誉，荣誉可在商店兑换稀有道具。
`,

Jade : `
【玉石坊说明】
`,

Life : `
【天命说明】
`,

GroupFight : `
【山贼讨伐说明】
`,

// 酒馆概率
Random_General : "道具名称\t\t\t出现概率\n铜钱道具\t\t\t2%\n经验道具\t\t\t2%\n羁绊卡\t\t\t\t8%\n锻造石\t\t\t\t2%\n其它材料\t\t\t4%\nS级武将信物\t\t2%\nA级武将信物\t\t20%\nB级武将信物\t\t20%\nC级武将信物\t\t20%\nA级武将\t\t\t\t7%\nB级武将\t\t\t\t7%\nC级武将\t\t\t\t6%",

// 祭坛概率
Random_Zork : "组合名称\t\t\t出现概率\n六道轮回\t\t\t10%\n五行混沌\t\t\t12%\n四象无极\t\t\t14%\n三界独尊\t\t\t16%\n双龙现世\t\t\t20%\n一元初始\t\t\t28%",

// 宝箱概率
Random_Treasure : "普通宝箱\n道具名称\t\t\t出现概率\n锻造材料\t\t\t40%\n元宝\t\t\t\t\t20%\n铜钱道具\t\t\t10%\n魂丹\t\t\t\t\t12%\n经验丹\t\t\t\t12%\n体力道具\t\t\t2%\n小喇叭\t\t\t\t3%\n洗练石\t\t\t\t1%\n精致宝箱\n道具名称\t\t\t出现概率\n锻造材料\t\t\t6%\n魂丹\t\t\t\t\t20%\n铜钱道具\t\t\t16%\n刻印石\t\t\t\t12%\n元宝\t\t\t\t\t11%\n武将经验\t\t\t10%\n天赋经验\t\t\t10%\n稀有道具\t\t\t15%",

// 玉石概率
Random_Jade : "普通切割\n玉石等级\t\t\t出现概率\n一级玉石\t\t\t70%\n二级玉石\t\t\t20%\n三级玉石\t\t\t7%\n四级玉石\t\t\t3%\n精细切割\n玉石等级\t\t\t出现概率\n三级玉石\t\t\t66%\n四级玉石\t\t\t24%\n五级玉石\t\t\t5%\n六级玉石\t\t\t3%\n七级玉石\t\t\t2%",

UnionBattle : `
【公会战说明】
1.公会战是一个大型的公会对战玩法，每周一轮，周一至周六进行排位战。
2.排位战：每天中午12点系统会将全部服务器内所有报名的公会进行两两匹配，匹配结束后，双方互为各自的对手进行战斗，值得注意的是，玩家将有机会与其他服务器的公会进行交手。
3.报名要求：公会等级达到3级，成员人数大于等于8个，可由会长或副会长报名参加公会战，报名需要至少12支防守队伍，并且每个飞艇需要布置至少1个防守队伍。报名需要消耗一定的公会活跃。报名成功后可以参加本轮公会战，下一轮需重新报名。
4.公会战分为备战阶段和战斗阶段。
4.1.备战阶段：每日23点到次日12点为备战阶段，备战阶段每名公会成员最多可以设置五支防守队伍，会长和副会长可以将成员设置的防守队伍布置在5支飞艇内，飞艇共分为3个级别，级别越高提供的生命越高，每支飞艇最多布置6支防守队伍。
4.2.战斗阶段：每日12点到23点为战斗阶段，战斗阶段内每名公会成员有3次进攻机会，可以进攻敌方公会的飞艇，削减敌方飞艇的生命，最终战斗阶段结束后将双方飞艇剩余生命进行比较，生命较多的公会获得该场公会战的胜利。
5.公会战的奖励共分为四部分：战斗奖励、段位奖励、排名奖励。
5.1.战斗奖励：每场战斗结束后，获胜方会根据段位获得一定数量的战功。战功可在战功商店购买各种稀有道具。
5.2.段位奖励：周一至周六，每日23点结算，根据玩家所在公会的公会战段位进行发放，当日至少战斗一次的成员可获得。
5.3.排名奖励：周六23点结算，根据玩家所在公会的公会战本服排名进行发放，当轮至少战斗五次的成员可获得。
6.新成员入会后的24小时内不能参与公会战的进攻。
`,

Tavern :  {

    [1] : "<color>r:25,g:227,b:68</color><text>C级猎人：</text><color>r:212,g:224,b:238</color><text>80%</text><color>r:122,g:250,b:255</color><text>   B级猎人：</text><color>r:212,g:224,b:238</color><text>20%</text>",
    [2] : "<color>r:122,g:250,b:255</color><text>B级猎人：</text><color>r:212,g:224,b:238</color><text>88.7%</text><color>r:235,g:11,b:235</color><text>   A级猎人：</text><color>r:212,g:224,b:238</color><text>10%</text><color>r:237,g:142,b:37</color><text>   S级猎人：</text><color>r:212,g:224,b:238</color><text>1.3%</text>",
    [3] : "<color>r:235,g:11,b:235</color><text>A级猎人：</text><color>r:212,g:224,b:238</color><text>90%</text><color>r:237,g:142,b:37</color><text>   S级猎人：</text><color>r:212,g:224,b:238</color><text>10%</text>",
    [4] : "<color>r:237,g:142,b:37</color><text>S级猎人：</text><color>r:212,g:224,b:238</color><text>100%</text>",
},

DarklandResource : `
· 港口是跨服场景，每天开启两次，时间分别是12:30~13:00和21:15~21:45。
· 玩家可以通过采集果树、击杀怪物、挑战其他玩家等途径获得积分。
· 系统根据每天两场战斗的总积分进行排名，积分10分以上即可上榜。
· 每天系统会根据最终排名发放奖励，所有上榜玩家均有奖励。
· 奖励以邮件形式发放，请注意查收。
`,

relic : `
【遗迹副本说明】
`,

battlepass : `
【战斗通行证说明】
1.完成通行证任务，提升通行证等级，可获得大量等级奖励。
2.通行证任务每日4点刷新。
3.通行证可激活高级通行证，解锁更多高级道具还可获得额外专属奖励，用户还可购买通行证经验礼包，通行证等级直接增加10级，还有专属头像框等你领取。
4.每月重置通行证并更新通行证奖励。
5.若本赛季激活高级通行证，下赛季再次激活，通行证将直升10级（10000点通行证经验）。
6.通行证最高可升至100级。
`
,

}

}