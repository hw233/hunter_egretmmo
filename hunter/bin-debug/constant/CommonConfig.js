var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var CommonConfig = (function () {
        function CommonConfig() {
        }
        // 流星街购买门票花费元宝
        CommonConfig.wanted_buy_ticket_token = function (buytime) {
            return buytime * 50 + 100;
        };
        //活动副本购买次数花费元宝
        CommonConfig.activity_instance_buy_consume_token = function (buytime) {
            return buytime * 100 + 200;
        };
        // 重置联盟技能消耗钻石
        CommonConfig.league_skill_reset_consume_token = function (_time) {
            if (_time < 1) {
                return 50;
            }
            else {
                return 200;
            }
        };
        // 探索加速消耗钻石
        CommonConfig.speed_search_comsume_token = function (_time) {
            if (_time > 600) {
                return 5 * Math.ceil(_time / 600);
            }
            else {
                return 0;
            }
        };
        // 名字长度
        CommonConfig.name_length = function (name) {
            return name.length();
        };
        // 仙境抢夺果子相关(true抢，false被抢)
        CommonConfig.wonderland_fruit_rand = function (is_get, evil_value) {
            if (is_get == true) {
                return 1 * ((100 - evil_value * 1) / 100) * 100;
            }
            else {
                if (evil_value == 0) {
                    return 18;
                }
                else {
                    return 40 + evil_value * 8;
                }
            }
        };
        // 酒馆抽卡相关(啤酒，红酒)
        CommonConfig.lottery_beer_rand_addpower = function (own_general_a, own_general_s, pay_token, fail_a, fail_s, s_count) {
            if (s_count < 1) {
                var cs_a = 0.5;
                var cs_s = 1;
                if (fail_a >= 9) {
                    cs_a = 0.5 * 12;
                }
                if (fail_s > 20) {
                    cs_s = 1.0 * 9;
                }
                return [cs_a, cs_s];
            }
            else if (s_count < 2) {
                var cs_a = 0.5;
                var cs_s = 1;
                if (fail_a >= 9) {
                    cs_a = 0.5 * 12;
                }
                if (fail_s > 60) {
                    cs_s = 1.0 * 20;
                }
                return [cs_a, cs_s];
            }
            else if (s_count < 3) {
                var cs_a = 0.5;
                var cs_s = 1;
                if (fail_a >= 9) {
                    cs_a = 0.5 * 12;
                }
                if (fail_s > 80) {
                    cs_s = 1.0 * 30;
                }
                return [cs_a, cs_s];
            }
            else {
                // step one
                var cs_a = 0.5;
                var cs_s = 1 * (1 - own_general_s / 30);
                // step two
                if (pay_token >= 0 && pay_token < 500) {
                    cs_a = cs_a * 1;
                    cs_s = cs_s * 1;
                }
                else if (pay_token >= 500 && pay_token < 3000) {
                    cs_a = cs_a * 1.1;
                    cs_s = cs_s * 1.1;
                }
                else if (pay_token >= 3000 && pay_token < 8000) {
                    cs_a = cs_a * 1.2;
                    cs_s = cs_s * 1.2;
                }
                else if (pay_token >= 8000 && pay_token < 20000) {
                    cs_a = cs_a * 1.3;
                    cs_s = cs_s * 1.3;
                }
                else if (pay_token >= 20000 && pay_token < 50000) {
                    cs_a = cs_a * 1.4;
                    cs_s = cs_s * 1.4;
                }
                else {
                    cs_a = cs_a * 1.5;
                    cs_s = cs_s * 1.5;
                }
                // step three
                if (fail_a >= 9) {
                    cs_a = cs_a * 12;
                }
                if (fail_s > 130) {
                    cs_s = cs_s * 15;
                }
                return [cs_a, cs_s];
            }
        };
        CommonConfig.lottery_redwine_rand_addpower = function (own_general_s, pay_token, fail_s) {
            // step one
            var cs_s = 1 * (1 - own_general_s / 30);
            // step two
            if (pay_token >= 0 && pay_token < 500) {
                cs_s = cs_s * 1;
            }
            else if (pay_token >= 500 && pay_token < 3000) {
                cs_s = cs_s * 1.2;
            }
            else if (pay_token >= 3000 && pay_token < 8000) {
                cs_s = cs_s * 1.4;
            }
            else if (pay_token >= 8000 && pay_token < 20000) {
                cs_s = cs_s * 1.6;
            }
            else if (pay_token >= 20000 && pay_token < 50000) {
                cs_s = cs_s * 1.8;
            }
            else {
                cs_s = cs_s * 2;
            }
            // step three
            if (fail_s > 100) {
                cs_s = cs_s * 4;
            }
            return cs_s;
        };
        // 宝物升级消耗金币
        CommonConfig.potato_uplevel_comsume_money = function (quailty, level) {
            return 100 * level * (3 + Math.floor(level / 5) + Math.floor(level / 6) + Math.floor(level / 10) + Math.floor(level / 15) + Math.floor(level / 20) + 2 * Math.floor(level / 25) + 3 * Math.floor(level / 30) + 4 * Math.floor(level / 35) + 5 * Math.floor(level / 40));
        };
        // 天梯冷却清除花费元宝
        CommonConfig.ladder_cooling_token = function (cooling) {
            if (cooling >= 600) {
                return 20;
            }
            else if (cooling >= 500) {
                return 16;
            }
            else if (cooling >= 400) {
                return 12;
            }
            else if (cooling >= 300) {
                return 8;
            }
            else if (cooling >= 200) {
                return 4;
            }
            else {
                return 4;
            }
        };
        // 念力修炼消耗念力果
        CommonConfig.psychic_refresh_consume = function (lock_num) {
            if (lock_num == 1) {
                return 15;
            }
            else if (lock_num == 2) {
                return 30;
            }
            else if (lock_num == 3) {
                return 55;
            }
            else if (lock_num == 4) {
                return 105;
            }
            else {
                return 5;
            }
        };
        // 天梯挑战次数花费元宝
        CommonConfig.ladder_challenge_token = function (count) {
            if (count == 0) {
                return 30;
            }
            else if (count >= 1 && count <= 3) {
                return 50 * count;
            }
            else {
                return 200;
            }
        };
        // 刷紫耗费元宝
        CommonConfig.refresh_purple_token = function (times) {
            if (times >= 20) {
                return 100;
            }
            else if (times >= 15) {
                return 80;
            }
            else if (times >= 10) {
                return 60;
            }
            else if (times >= 6) {
                return 50;
            }
            else if (times >= 3) {
                return 50;
            }
            else {
                return 30;
            }
        };
        // 刷双倍奖励耗费元宝
        CommonConfig.refresh_double_token = function (times) {
            return 50;
        };
        // 商城刷新花费元宝_type表示商城类型_count表示刷新次数，从0开始
        // 返回值第一个表示消耗数量，第二个表示消耗类型
        CommonConfig.mall_refresh_token = function (_type, _count) {
            var _consume = _count * 20 + 20;
            var _res_type = 20002;
            if (_type == 1) {
                _consume = _count * 5 + 20;
            }
            else if (_type == 4) {
                _consume = _count * 5 + 20;
            }
            else if (_type == 7) {
                _consume = _count * 30 + 30;
                _res_type = 20008;
            }
            else if (_type == 8) {
                _consume = _count * 5 + 20;
            }
            return [_consume, _res_type];
        };
        // 出售星级武将所得金币数
        CommonConfig.sell_general_money = function (star) {
            if (star == 2) {
                return 3000;
            }
            else if (star == 3) {
                return 30000;
            }
            else if (star == 4) {
                return 90000;
            }
            else if (star == 5) {
                return 150000;
            }
            else if (star >= 6) {
                return 200000;
            }
            else {
                return 0;
            }
        };
        // 体力购买花费元宝
        CommonConfig.power_buy_token = function (count) {
            //count从0开始
            if (count <= 1) {
                return 30;
            }
            else if (count <= 2) {
                return 50;
            }
            else if (count <= 4) {
                return 100;
            }
            else if (count <= 10) {
                return 200;
            }
            else if (count <= 15) {
                return 300;
            }
            else {
                return 300;
            }
        };
        // 盘子购买花费元宝
        CommonConfig.plate_buy_token = function (count) {
            //count从0开始
            if (count <= 0) {
                return 100;
            }
            else if (count <= 1) {
                return 150;
            }
            else {
                return 200;
            }
        };
        // 通缉令购买次数花费元宝,获得令牌数
        CommonConfig.wanted_buy_token = function (type_, buytime) {
            if (type_ == 20016) {
                if (buytime <= 1) {
                    return [6, 2];
                }
                else if (buytime <= 4) {
                    return [10, 2];
                }
                else if (buytime <= 7) {
                    return [20, 2];
                }
                else if (buytime <= 11) {
                    return [30, 2];
                }
                else if (buytime <= 15) {
                    return [40, 2];
                }
                else {
                    return [40, 2];
                }
            }
            else if (type_ == 20017) {
                if (buytime <= 1) {
                    return [6, 2];
                }
                else if (buytime <= 4) {
                    return [10, 2];
                }
                else if (buytime <= 7) {
                    return [20, 2];
                }
                else if (buytime <= 11) {
                    return [40, 2];
                }
                else if (buytime <= 15) {
                    return [60, 2];
                }
                else {
                    return [60, 2];
                }
            }
            else if (type_ == 20018) {
                if (buytime <= 1) {
                    return [8, 2];
                }
                else if (buytime <= 4) {
                    return [12, 2];
                }
                else if (buytime <= 7) {
                    return [24, 2];
                }
                else if (buytime <= 11) {
                    return [45, 2];
                }
                else if (buytime <= 15) {
                    return [60, 2];
                }
                else {
                    return [60, 2];
                }
            }
            else {
                return [0, 0];
            }
        };
        // 购买精英怪挑战次数
        CommonConfig.changlle_time = function (count) {
            if (count == 0) {
                return 50;
            }
            else if (count == 1) {
                return 100;
            }
            else if (count == 2) {
                return 150;
            }
            else if (count == 3) {
                return 200;
            }
            else if (count == 4) {
                return 250;
            }
            else if (count == 5) {
                return 300;
            }
            else if (count == 6) {
                return 300;
            }
            else {
                return 400;
            }
        };
        // 通缉令消耗
        CommonConfig.wanted_refresh_consume = function (refresh_time) {
            // refresh_time从1开始
            if (refresh_time >= 0 && refresh_time <= 1) {
                return 10;
            }
            else if (refresh_time >= 2 && refresh_time <= 4) {
                return 20;
            }
            else if (refresh_time >= 5 && refresh_time <= 7) {
                return 40;
            }
            else if (refresh_time >= 8 && refresh_time <= 10) {
                return 60;
            }
            else {
                return 80;
            }
        };
        // 通缉令获得道具数量
        CommonConfig.wanted_reward_count = function (cur_id) {
            var rand_value = Math.floor(Math.random() * (101));
            if (cur_id <= 3) {
                return 1;
            }
            if (cur_id <= 6) {
                if (rand_value < 20) {
                    return 2;
                }
                else {
                    return 1;
                }
            }
            if (cur_id > 6) {
                if (rand_value < 0) {
                    return 3;
                }
                else if (rand_value < 25) {
                    return 2;
                }
                else {
                    return 1;
                }
            }
        };
        // 洗练消耗数量，返回0表示错误
        CommonConfig.artifact_wash_consume = function (_type, _lock) {
            if (_type == 1) {
                if (_lock == 1) {
                    return 12;
                }
                else if (_lock == 2) {
                    return 15;
                }
                else {
                    return 10;
                }
            }
            else if (_type == 2) {
                if (_lock == 1) {
                    return 20;
                }
                else if (_lock == 2) {
                    return 20;
                }
                else {
                    return 20;
                }
            }
            return 0;
        };
        // 洗练数值增减系数
        CommonConfig.artifact_wash_ratio = function (_type, src_attri, max_attri) {
            var pre = src_attri / max_attri;
            // 高级
            if (_type == 2) {
                if (pre > 0.0 && pre <= 0.5) {
                    return [1, 5];
                }
                else if (pre > 0.5 && pre <= 0.65) {
                    return [1, 4];
                }
                else if (pre > 0.65 && pre <= 0.7) {
                    return [1, 3];
                }
                else if (pre > 0.7 && pre <= 100) {
                    return [0, 1];
                }
                else {
                    return [0, 3];
                }
                // 默认为普通
            }
            else {
                if (pre > 0.0 && pre <= 0.4) {
                    return [-1, 4];
                }
                else if (pre > 0.4 && pre <= 0.65) {
                    return [-1, 3];
                }
                else if (pre > 0.65 && pre <= 0.7) {
                    return [-1, 2];
                }
                else if (pre > 0.7 && pre <= 0.9) {
                    return [-2, 2];
                }
                else if (pre > 0.9 && pre <= 100) {
                    return [-2, 1];
                }
                else {
                    return [-1, 3];
                }
            }
        };
        // 联盟副本购买挑战次数花费_count从0开始
        CommonConfig.league_instance_buytime_consume = function (_count) {
            if (_count == 0)
                return 30;
            if (_count == 1)
                return 50;
            if (_count == 2)
                return 70;
            return 100;
        };
        // 仙境杀怪次数以及怪物等级对掉落物品概率的影响
        CommonConfig.wonderland_mobs_kill_reward_rand = function (kill_time, diff_level) {
            var rand_level = 100;
            // if ( diff_level <= 10 ) {
            // rand_level = 100
            // } else if ( diff_level <= 15 ) {
            // rand_level = 80
            // } else if ( diff_level <= 20 ) {
            // rand_level = 50
            // } else if ( diff_level <= 25 ) {
            // rand_level = 20
            // } else {
            // rand_level = 0
            // }
            var rand_kill = 100;
            if (kill_time <= 20) {
                rand_kill = 100;
            }
            else if (kill_time <= 30) {
                rand_kill = 50;
            }
            else if (kill_time <= 40) {
                rand_kill = 10;
            }
            else if (kill_time <= 50) {
                rand_kill = 0;
            }
            else {
                rand_kill = 0;
            }
            var rand_result, _ = Math.floor(rand_level * rand_kill / 100);
            return rand_result;
        };
        // 刷新许愿树次数花费(从1开始)
        CommonConfig.refresh_wish_tree = function (buy_time) {
            if (buy_time <= 3) {
                return 0;
            }
            else if (buy_time > 3 && buy_time <= 5) {
                return 1000;
            }
            else if (buy_time > 5 && buy_time <= 7) {
                return 2000;
            }
            else if (buy_time > 7 && buy_time <= 9) {
                return 3000;
            }
            else if (buy_time > 9 && buy_time <= 11) {
                return 4000;
            }
            else if (buy_time > 11 && buy_time <= 13) {
                return 5000;
            }
            else if (buy_time > 13 && buy_time <= 15) {
                return 6000;
            }
            else if (buy_time > 15 && buy_time <= 17) {
                return 7000;
            }
            else if (buy_time > 17 && buy_time <= 19) {
                return 8000;
            }
            else if (buy_time > 19 && buy_time <= 21) {
                return 9000;
            }
            else {
                return 10000;
            }
        };
        // 场景boss等级变化
        CommonConfig.scene_boss_levelchange = function (kill_time, boss_level) {
            if (boss_level < 50) {
                if (kill_time == 0) {
                    return boss_level - 6;
                }
                else if (kill_time > 0 && kill_time <= 180) {
                    return boss_level + 6;
                }
                else if (kill_time > 180 && kill_time <= 300) {
                    return boss_level + 2;
                }
                else if (kill_time > 300 && kill_time <= 480) {
                    return boss_level;
                }
                else if (kill_time > 480 && kill_time <= 600) {
                    return boss_level - 2;
                }
                else {
                    return boss_level - 3;
                }
            }
            else if (boss_level < 70) {
                if (kill_time == 0) {
                    return boss_level - 3;
                }
                else if (kill_time > 0 && kill_time <= 180) {
                    return boss_level + 3;
                }
                else if (kill_time > 180 && kill_time <= 300) {
                    return boss_level + 1;
                }
                else if (kill_time > 300 && kill_time <= 480) {
                    return boss_level;
                }
                else if (kill_time > 480 && kill_time <= 600) {
                    return boss_level - 1;
                }
                else {
                    return boss_level - 3;
                }
            }
            else {
                if (kill_time == 0) {
                    return boss_level - 2;
                }
                else if (kill_time > 0 && kill_time <= 180) {
                    return boss_level + 2;
                }
                else if (kill_time > 180 && kill_time <= 300) {
                    return boss_level + 1;
                }
                else if (kill_time > 300 && kill_time <= 480) {
                    return boss_level;
                }
                else if (kill_time > 480 && kill_time <= 600) {
                    return boss_level - 1;
                }
                else {
                    return boss_level - 2;
                }
            }
        };
        // 换符文花费元宝
        CommonConfig.change_runes_consume = function (_time) {
            if (_time < 6) {
                return 20;
            }
            else if (_time < 11) {
                return 30;
            }
            else {
                return 50;
            }
        };
        // 符文出现权重计算
        CommonConfig.runes_randpower = function (runes_num) {
            var rand_power = ((runes_num + 20) * Math.pow(7.5 - runes_num, 2)) / (runes_num + 1);
            return rand_power;
        };
        // 宝物附加属性条数权重
        CommonConfig.potapo_addattri_randpower = function (quailty, num) {
            if (quailty == 1) {
                return (quailty + 1) / num + 1;
            }
            else if (quailty == 2) {
                return (quailty + 1) / num + 1;
            }
            else if (quailty == 3) {
                return (quailty + 1) / num + 2;
            }
            else if (quailty == 4) {
                return (quailty + 1) / num + 0.5;
            }
            else if (quailty == 5) {
                return (quailty + 1) / num - 1;
            }
            else {
                return (quailty + 1) / num - 1;
            }
        };
        // 跨服战相关
        // 购买挑战次数消耗元宝
        CommonConfig.singlecraft_buy_time_consume = function (_time) {
            var token = (1 + _time) * 50;
            if (token < 300) {
                return token;
            }
            else {
                return 300;
            }
        };
        // 联赛结算积分变化
        CommonConfig.league_match_score_change = function (is_win, oldscore, diff) {
            var zone = 0;
            var m_score = 0;
            var m_index = 0;
            var score = [1000, 1100, 1300, 1500, 1800];
            var newTbWin = [
                [[120, "&"], [100, 90, 80, 70, 60]],
                [[60, 120], [80, 70, 70, 60, 40]],
                [[20, 60], [60, 60, 60, 50, 20]],
                [[0, 20], [40, 40, 40, 40, 10]],
            ];
            var newTbLose = [
                [[120, "&"], [0, 25, 30, 35, 40]],
                [[60, 120], [0, 20, 25, 30, 35]],
                [[20, 60], [0, 15, 20, 25, 30]],
                [[0, 20], [0, 10, 15, 20, 25]],
            ];
            for (var i = 0; i < score.length; i++) {
                if (score[i] < oldscore) {
                    zone = i;
                }
            }
            if (is_win) {
                for (var i = 0; i < newTbWin.length; i++) {
                    var v = newTbWin[i];
                    if (v[0][1] == "&" && diff >= v[0][0]) {
                        m_score = newTbWin[i][1][zone];
                        m_index = i;
                    }
                    else if (diff >= v[0][0] && diff < v[0][1]) {
                        m_score = newTbWin[i][1][zone];
                        m_index = i;
                    }
                }
            }
            if (!is_win) {
                for (var i = 0; i < newTbLose.length; i++) {
                    var v = newTbLose[i];
                    if (v[0][1] == "&" && diff > v[0][0]) {
                        m_score = newTbLose[i][1][zone];
                        m_index = newTbWin.length + i;
                    }
                    else if (diff > v[0][0] && diff <= v[0][1]) {
                        m_score = newTbLose[0][1][zone];
                        m_index = newTbWin.length + 0;
                    }
                }
            }
            return m_score;
        };
        // 联赛结算积分变化
        CommonConfig.league_match_score_change1 = function (is_win, oldscore, diff) {
            var zone = 0;
            var m_score = 0;
            var m_index = 0;
            var score = [1000, 1100, 1300, 1500, 1800];
            var newTbWin = [
                [[120, "&"], [100, 90, 80, 70, 60]],
                [[60, 120], [80, 70, 70, 60, 40]],
                [[20, 60], [60, 60, 60, 50, 20]],
                [[0, 20], [40, 40, 40, 40, 10]],
            ];
            var newTbLose = [
                [[120, "&"], [0, 25, 30, 35, 40]],
                [[60, 120], [0, 20, 25, 30, 35]],
                [[20, 60], [0, 15, 20, 25, 30]],
                [[0, 20], [0, 10, 15, 20, 25]],
            ];
            for (var i = 0; i < score.length; i++) {
                if (score[i] <= oldscore) {
                    zone = i;
                }
            }
            if (is_win) {
                for (var i = 0; i < newTbWin.length; i++) {
                    var v = newTbWin[i];
                    if (v[0][1] == "&" && diff >= v[0][0]) {
                        m_score = newTbWin[i][1][zone];
                        m_index = i;
                    }
                    else if (diff >= v[0][0] && diff < v[0][1]) {
                        m_score = newTbWin[i][1][zone];
                        m_index = i;
                    }
                }
            }
            if (!is_win) {
                for (var i = 0; i < newTbLose.length; i++) {
                    var v = newTbLose[i];
                    if (v[0][1] == "&" && diff >= v[0][0]) {
                        m_score = newTbLose[i][1][zone];
                        m_index = newTbWin.length + i;
                    }
                    else if (diff >= v[0][0] && diff < v[0][1]) {
                        m_score = newTbLose[i][1][zone];
                        m_index = newTbWin.length + i;
                    }
                }
            }
            return [m_score, m_index + 1];
        };
        // 联赛轮空积分变化
        CommonConfig.league_match_score_change_special = function (score) {
            if (score <= 10000) {
                return 40;
            }
            else {
                return 0;
            }
        };
        // 联赛重置积分
        CommonConfig.league_match_reset_score = function (old_score, open_time) {
            var orderIndex = [[30 * 86400, 1100], [60 * 86400, 1200]];
            var new_socre = Math.ceil((old_score - 1000) / 1.5) + 1000;
            for (var i = 0; i < orderIndex.length; i++) {
                if (open_time > orderIndex[i][0] && new_socre < orderIndex[i][1]) {
                    new_socre = orderIndex[i][1];
                }
            }
            var trees = new_socre % 10;
            if (trees != 0) {
                new_socre = new_socre - trees + 10;
            }
            return new_socre;
        };
        /**
         * 猎人统一战力测试用计算
         *
         * @param skill_level1    自动技等级
         * @param skill_level2    手动技等级
         * @param init_passive    被动技等级
         * @param awake_passive   觉醒技等级
         * @param break_level1    突破1技能等级
         * @param break_level2    突破2技能等级
         * @param break_level3    突破3技能等级
         * @param equip_level     装备等级
         * @param general_atk     攻击
         * @param atk_crit        暴击
         * @param crit_extra      暴击伤害
         * @param general_hp      生命值
         * @param general_def     防御
         * @param crit_resistance 暴击抵抗
         * @param cd_speed        速度
         * @param skill_atk       效果命中
         * @param skill_def       效果抵抗
         * @param dodge_rate      格挡率
         * @param adviserTbl      年兽
         *
         * @description 版本 20181114-1-7-2-Android
         */
        CommonConfig.hunter_calc_battervalue = function (skill_level1, skill_level2, init_passive, awake_passive, break_level1, break_level2, break_level3, equip_level, general_atk, atk_crit, crit_extra, general_hp, general_def, crit_resistance, cd_speed, skill_atk, skill_def, dodge_rate, adviserTbl) {
            var defGiven = 0;
            if (general_def <= 16500) {
                defGiven = general_hp / (1 - 1.2 * general_def / (general_def + 3500));
            }
            else {
                defGiven = (general_hp + (general_def - 16500) * 73) / (1 - 1.2 * 16500 / (16500 + 3500));
            }
            var base = Math.pow(((skill_level1 * 0.01 + 1) * (skill_level2 * 0.05 + 1) * (init_passive * 0.02 + 1) * (awake_passive * 0.02 + 1) * (break_level1 * 0.1 + 1) * (break_level2 * 0.1 + 1) * (break_level3 * 0.1 + 1) * (equip_level * 0.02 + 1) * general_atk * (1 - atk_crit / 100 + atk_crit / 100 * crit_extra / 100) * defGiven * (1 - crit_resistance / 100 + crit_resistance / 100 * crit_extra / 100) * 19000 / (10000000 / cd_speed - 1000) * (1 + skill_atk / 400) * (1 + skill_def / 400) * (1 + dodge_rate / 400)), 0.5);
            var adviserValue = 0;
            for (var i = 0; i < adviserTbl.length; i++) {
                var v = adviserTbl[i];
                var adviserId = v.adviserId;
                var adviserLevel = v.level;
                var adviserQuality = zj.TableBaseAdviser.Item(adviserId).quality;
                adviserValue = adviserValue + adviserQuality ^ 2 * adviserLevel ^ 1.1;
            }
            return base + adviserValue;
            // if (general_def <= 16500) {
            //     let temp1 = (skill_level1 * 0.01 + 1) * (skill_level2 * 0.05 + 1) * (init_passive * 0.02 + 1) * (awake_passive * 0.02 + 1)
            //     let temp2 = (break_level1 * 0.1 + 1) * (break_level2 * 0.1 + 1) * (break_level3 * 0.1 + 1)
            //     let temp3 = general_atk * (1 - atk_crit / 100 + atk_crit / 100 * crit_extra / 100)
            //     let temp4 = general_hp / (1 - 1.2 * general_def / (general_def + 3500))
            //     let temp5 = (1 - crit_resistance / 100 + crit_resistance / 100 * crit_extra / 100) * 19000 / (10000000 / cd_speed - 1000)
            //     let temp6 = (1 + skill_atk / 400) * (1 + skill_def / 400) * (1 + dodge_rate / 400)
            //     return Math.pow((temp1 * temp2 * temp3 * temp4 * temp5 * temp6), 0.5)
            // } else {
            //     let temp1 = (skill_level1 * 0.01 + 1) * (skill_level2 * 0.05 + 1) * (init_passive * 0.02 + 1) * (awake_passive * 0.02 + 1)
            //     let temp2 = (break_level1 * 0.1 + 1) * (break_level2 * 0.1 + 1) * (break_level3 * 0.1 + 1)
            //     let temp3 = general_atk * (1 - atk_crit / 100 + atk_crit / 100 * crit_extra / 100)
            //     let temp4 = (general_hp + (general_def - 16500) * 73) / (1 - 1.2 * 16500 / (16500 + 3500))
            //     let temp5 = (1 - crit_resistance / 100 + crit_resistance / 100 * crit_extra / 100) * 19000 / (10000000 / cd_speed - 1000)
            //     let temp6 = (1 + skill_atk / 400) * (1 + skill_def / 400) * (1 + dodge_rate / 400)
            //     return Math.pow((temp1 * temp2 * temp3 * temp4 * temp5 * temp6), 0.5)
            // }
        };
        // 计算仙境战斗初始血量、初始攻击
        CommonConfig.scene_battle_hp_attack = function (battle_value, general_hp, general_def, crit_resistance, general_attack, atk_crit, crit_extra) {
            var base_hp = general_hp;
            var def_hp = general_def * 73;
            var crit_resistance_hp = crit_resistance * 3333;
            var battle_hp = base_hp + def_hp + crit_resistance_hp;
            var base_attack = general_attack;
            var crit_attack = atk_crit * 66;
            var crit_extra_attack = crit_extra * 20;
            var battle_attack = base_attack + crit_attack + crit_extra_attack;
            var hp = Math.pow(battle_value / (battle_attack / battle_hp), 0.5) / 3;
            var attack = Math.pow(battle_value / (battle_hp / battle_attack), 0.5);
            return [hp, attack];
        };
        //仙境复活元宝消耗
        CommonConfig.wonderland_rebirth_token_comsume = function (count) {
            if (count == 0) {
                return 0;
            }
            else if (count == 1) {
                return 50;
            }
            else {
                return 100;
            }
        };
        /**
         * 活动Boss积分换算
         *
         * @param {number} battle_hunter 伤害值
         */
        CommonConfig.darkland_boss_calc_battle_score = function (battle_hunter) {
            var add_score = 0;
            if (battle_hunter < 1) {
                add_score = 0;
            }
            else {
                add_score = Math.pow(battle_hunter, 1 / 3);
            }
            if (add_score > 100000) {
                add_score = 0;
            }
            return Math.floor(add_score);
        };
        // 屏蔽字
        // 英文删除
        CommonConfig.split_charset = "~!@#$%^&*()_+=-`/?.><'\"]}[{\\|\t\n ";
        // 中文删除
        CommonConfig.split_wcharset = "！￥…（）—【】、‘’“”，。《》？";
        // 英文屏蔽
        CommonConfig.filter_charset = "'\"{},/\\[]?<>=@`";
        // 战斗验证数据误差率
        CommonConfig.battle_data_error_rate = 0.05;
        // 邮件标题最小长度
        CommonConfig.limit_mail_title_min = 1;
        // 邮件标题最大长度
        CommonConfig.limit_mail_title_max = 128;
        // 邮件内容最小长度
        CommonConfig.limit_mail_content_min = 1;
        // 邮件内容最大长度
        CommonConfig.limit_mail_content_max = 1024;
        // 黑名单列表最大值
        CommonConfig.limit_blighter_max = 100;
        // 敌人列表最大值
        CommonConfig.limit_enemy_max = 100;
        // 角色昵称最大长度
        CommonConfig.limit_role_name_max = 6;
        // 聊天最大长度
        CommonConfig.limit_chat_message_max = 120;
        // 千里传音最大长度
        CommonConfig.limit_chat_bulletin_max = 48;
        // 联盟名称最大长度
        CommonConfig.limit_league_name_max = 10;
        // 联盟简介最大长度
        CommonConfig.limit_league_introduce_max = 20;
        // 联盟公告最大长度
        CommonConfig.limit_league_announcement_max = 40;
        // 玩家最大申请联盟数
        CommonConfig.limit_league_role_apply_max = 10;
        // 联盟申请最长保留时间
        CommonConfig.limit_league_apply_time = 3600 * 24;
        // 单类邮件数量上限
        CommonConfig.limit_mail_type_max = 100;
        // 申请己方延迟删除时间(好友、联盟)
        CommonConfig.limit_applying_delay = 1800;
        // 联盟日志数量上限
        CommonConfig.limit_league_record_max = 100;
        // 角色各个模块在内存中停留时间
        CommonConfig.role_module_keepalive_time = 1800;
        // 心跳时长(秒)
        CommonConfig.role_heart_time = 120;
        // 多长时间没有收到心跳视为下线(秒)
        CommonConfig.role_heart_miss_time = 600;
        // 玩家离线多久被判定为流失
        CommonConfig.role_logout_time_loss = 86400 * 14;
        // 历史聊天记录保存条数
        CommonConfig.chat_message_history_max = 30;
        // 允许重复发言次数
        CommonConfig.chat_repeated_count = 2;
        // 每次屏蔽发言时长
        CommonConfig.chat_shield_time = 300;
        // 聊天内容相似程度
        CommonConfig.chat_content_similarity = 0.9;
        // 聊天检测保存记录条数
        CommonConfig.chat_check_record = 5;
        // 聊天充值额度
        CommonConfig.chat_check_charge = 60;
        // 聊天检测字符长度
        CommonConfig.chat_content_len = 15;
        // 发帖之间时间间隔
        CommonConfig.comment_publish_interval_time = 300;
        // 评论之间时间间隔
        CommonConfig.reply_publish_interval_time = 180;
        // 发帖最大字数
        CommonConfig.public_post_content_max_number = 300;
        // 评论最大字数
        CommonConfig.public_comment_content_max_number = 300;
        // 创建用户初始数据
        CommonConfig.init_user_power = 70;
        CommonConfig.init_user_money = 50000;
        CommonConfig.init_user_token = 100;
        CommonConfig.init_user_crystalSoul = 200;
        CommonConfig.init_user_general = [10032,];
        CommonConfig.init_user_beer = 1;
        CommonConfig.init_user_soda = 1;
        CommonConfig.init_role_head = [140008, 140031, 140032, 140034,];
        CommonConfig.init_role_head_frame = [150001,];
        CommonConfig.init_role_title = [160001,];
        CommonConfig.init_league_head = [142001, 142002, 142003, 142004, 142005,];
        CommonConfig.init_league_head_frame = [150001,];
        CommonConfig.init_goodses = [[30201, 30],];
        CommonConfig.init_user_goldPlate = 8;
        CommonConfig.init_league_enliven = 800;
        // 特殊道具id
        // 联盟修改名称道具
        CommonConfig.league_modify_name_prop_id = 30102;
        // 角色名修改道具
        CommonConfig.role_modify_name_prop_id = 30101;
        // 小喇叭
        CommonConfig.world_chat_small_prop_id = 30201;
        // 大喇叭
        CommonConfig.world_chat_big_prop_id = 30202;
        // 小喇叭喊话消耗代币
        CommonConfig.world_chat_small_cosume = 0;
        // 大喇叭喊话消耗代币
        CommonConfig.world_chat_big_cosume = 0;
        // 角色最大等级
        CommonConfig.role_max_level = 60;
        // 武将最大星级
        CommonConfig.general_max_star = 6;
        // 武将最大等级
        CommonConfig.general_max_level = 60;
        // 武将最大品阶
        CommonConfig.general_max_quality = 21;
        // 武将最大羁绊数
        CommonConfig.general_max_partner = 4;
        // 武将最大装备数
        CommonConfig.general_max_equip = 6;
        // 武将最大天赋数(作废)
        CommonConfig.general_max_talent = 3;
        // 武将最大技能数
        CommonConfig.general_max_skill = 2;
        // 武将装备最大刻印数
        CommonConfig.general_max_carve = 12;
        // 武将最大传记数
        CommonConfig.general_max_life = 3;
        // 武将传记初始解锁条件
        CommonConfig.general_life_open_condition_star = 6;
        // 武将传记剩余解锁条件
        CommonConfig.general_life_surplus_condition_num = 40;
        // 武将传记行列数
        CommonConfig.general_life_points_row_line = [7, 11];
        // 武将索引规则倍数
        CommonConfig.general_id_to_index_multiple = 100000;
        // 武将最大数量
        CommonConfig.general_add_max_num = 300;
        // 武将第一次升星扣金币数
        CommonConfig.general_first_upstar = 1000;
        //----------------------------------------------------------------------
        // 猎人相关
        // 武将最大技能等级
        CommonConfig.general_max_skill_level = 10;
        // 武将技能最大等级差
        CommonConfig.general_max_skill_difference = 3;
        // 武将最大装备数
        CommonConfig.general_max_card = 9;
        // 武将觉醒最大技能等级
        CommonConfig.general_awaken_max_skill_level = 5;
        /**武将最大变身技能等级*/
        CommonConfig.general_max_transfer_level = 6;
        // 不上阵武将
        CommonConfig.general_limit_use_ids = [10057, 10058, 10059, 10074];
        // 武将伙伴最大等级
        CommonConfig.general_friend_max_level = 10;
        // 武将伙伴激活消耗契约书
        CommonConfig.general_friend_activate_goods = 30506;
        // 武将伙伴激活亲密度
        CommonConfig.general_friend_activate_exp = 100;
        // 武将伙伴亲密度加成
        CommonConfig.general_friend_add_exp = 1;
        // 武将可使用技能卷轴上限
        CommonConfig.general_skill_prop_limit = 10;
        // 武将重置技能点消耗元宝
        CommonConfig.general_reset_skill_token = 500;
        // 武将出售最大数量
        CommonConfig.general_sell_max_count = 25;
        // 武将需要剩余最少数量
        CommonConfig.general_remain_min_count = 1;
        // 猎人仓库最大容量
        CommonConfig.general_ware_max_num = 200;
        // 猎人最大突破等级
        CommonConfig.general_max_break = 9;
        // 猎人突破技能最大等级
        CommonConfig.general_break_skill_max_level = 5;
        // 猎人念力激活星级
        CommonConfig.general_psychic_activate_star = 6;
        /**猎人念力属性最大等级 */
        CommonConfig.general_psychic_attri_max_level = 10;
        /**猎人念力修炼最大锁定数量 */
        CommonConfig.general_psychic_lock_max_num = 3;
        /**猎人念力新手念力组合 */
        CommonConfig.general_psychic_teach_activate = [[5, 1], [6, 1], [1, 2], [2, 4], [3, 3], [4, 5]];
        /**猎人念力方案总数(以表里配的为主) */
        CommonConfig.general_psychic_page_num = 2;
        /**解锁念力方案消耗钻石数(默认使用的方案1) */
        CommonConfig.general_psychic_unlock_consume = [0, 800];
        // 卡片最大星级
        CommonConfig.card_max_star = 6;
        // 卡片星级的等级上限
        CommonConfig.card_star_max_level = [5, 10, 15, 20, 25, 30];
        // 卡片附加属性激活星级
        CommonConfig.card_addattri_awake_star = [2, 3, 4, 5, 6];
        // 卡片升星消耗同名卡片数量
        CommonConfig.card_up_star_consume_cards = [1, 2, 3, 4, 5, 6];
        // 卡片突破最大等级
        CommonConfig.card_break_through_max_level = 5;
        // 卡片突破1级增加等级上限
        CommonConfig.card_break_add_max_level = 2;
        //--卡片达到积分显示金色框
        CommonConfig.card_growth_score = 10;
        // 爬塔刷新天数
        CommonConfig.tower_refresh_day = 14;
        // 爬塔可跳层数
        CommonConfig.tower_jump_step = [25, 50, 75];
        // 高阶塔刷新天数 
        CommonConfig.high_refresh_day = 28;
        // 高阶塔可跳层数
        CommonConfig.high_jump_step = [10010, 10020, 10030];
        // 开启高阶塔条件
        CommonConfig.open_high_condition = 90;
        // 高级塔首层id
        CommonConfig.high_tower_first_id = 10001;
        // 组队战类型对应挑战次数
        CommonConfig.group_battle_limit_times = [1];
        // 仙境抢夺果实上限
        CommonConfig.wonderland_battle_get_fruit = 10;
        CommonConfig.wonderland_battle_lost_fruit = 10;
        // 酒馆三类随机项id(b,a,s,苏打)
        CommonConfig.lottery_rand_item = [1, 2, 3, 4];
        // 啤酒单次抽消耗元宝
        CommonConfig.lottery_beer_token_consume = 200;
        // 酒馆增加酒馆积分（啤酒，红酒，香槟，苏打水，朗姆酒）
        CommonConfig.lottery_add_lotteryscore = [10, 20, 30, 0, 50];
        // 啤酒酒馆前两次出的武将
        CommonConfig.lottery_beer_will_general = [10006];
        // 啤酒酒馆首次必得的次数(已屏蔽)
        CommonConfig.lottery_beer_firstwill_randItem = [6, 103];
        // 啤酒酒馆几次必得的次数和武将库(已屏蔽)
        CommonConfig.lottery_beer_tenwill_randItem = [10, 100];
        // 苏打水首次必得武将
        CommonConfig.lottery_soda_will_general = 10053;
        // 啤酒抽奖分阶段
        CommonConfig.lottery_beer_step = 2;
        // 猎人同资质(13/14)对应玩偶id
        CommonConfig.same_aptitude_doll = [31001, 31002];
        // 主线初始任务id
        CommonConfig.main_mission_start = 1;
        // 新创建角色任务持续时长
        CommonConfig.mission_create_duration = 7 * 86400;
        // 新创建角色抽奖持续时长
        CommonConfig.normal_lottery_create_duration = 2 * 86400;
        //切磋邮件显示拉取数量
        CommonConfig.mail_pvp_show_num = 10;
        // 遗迹副本每个挑战次数
        CommonConfig.relic_max_battle_time = 1;
        // 普通执照最大等级
        CommonConfig.licence_max_level = 7;
        //高级执照最大等级
        CommonConfig.high_licence_max_level = 5;
        // 流星街精英门票每日购买次数
        CommonConfig.wanted_ticket_daily_buy_time = 3;
        // 流星街精英门票id
        CommonConfig.wanted_ticket_ids = [39101, 39102, 39103];
        // 流星街精英门票购买添加数量
        CommonConfig.wanted_ticket_add_count = 5;
        // 活动副本每天战斗次数
        CommonConfig.activity_instance_battle_time = 3;
        // 活动副本每天购买次数上限
        CommonConfig.activity_instance_buy_time_limit = 2;
        // 活动副本购买次数增加次数
        CommonConfig.activity_instance_buy_battle_time_add = 2;
        // 通行证赛季划分月份
        CommonConfig.permit_season_zone_month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        // 通行证最大等级
        CommonConfig.permit_max_level = 100;
        // 通行证再次购买赠送经验
        CommonConfig.permit_buy_send_exp = 4000;
        // 每日首冲奖励
        CommonConfig.charge_everyday_reward = [[20002, 60], [31102, 1], [20020, 1], [30004, 1]];
        // 随机活动消耗体力生成副本
        CommonConfig.activity_rand_instance_consume_power = 50;
        // 随机活动副本数量
        CommonConfig.activity_rand_instance_max_count = 3;
        // 随机活动副本战斗次数
        CommonConfig.activity_rand_instance_battle_times = 10;
        // 随机活动副本存在时间
        CommonConfig.activity_rand_instance_duration = 7200;
        // 红包活动开始时间
        CommonConfig.activity_redpacket_time = [19 * 3600, 20 * 3600, 21 * 3600];
        CommonConfig.activity_redpacket_time_more = [19 * 3600, 20 * 3600, 21 * 3600, 22 * 3600];
        // 红包活动可抢时间
        CommonConfig.activity_redpacket_grab_time = 1800;
        //---------------------------双色球--------------------------------------
        // 拉取双色球历史纪录数量
        CommonConfig.double_fruit_history_numer = 30;
        // 双色球下注和开奖时间
        CommonConfig.double_fruit_bet_time = [24 * 3600, 7 * 3600, 7 * 3600 + 10 * 60];
        // 蓝色果子数量
        CommonConfig.double_fruit_blue_number = 4;
        // 红果子权重分配
        CommonConfig.red_fruit_power = [[131001, 131002, 131003], [1, 1, 1]];
        // 蓝果子权重分配
        CommonConfig.blue_fruit_A_power = [[131101, 131102, 131103, 131104, 131105], [1, 1, 1, 1, 1]];
        CommonConfig.blue_fruit_B_power = [[131106, 131107, 131108, 131109, 131110], [1, 1, 1, 1, 1]];
        //---------------------------扭蛋机-------------------------------------
        // 扭蛋机第一次开启距离开服时间
        CommonConfig.integral_first_duration = 1;
        // 扭蛋机主题等待天数(不能为0)
        CommonConfig.integral_wait = 1;
        // 猜拳新手结果和换符的结果
        CommonConfig.runes_teach_result = [2, 5];
        // 探索副本每日次数
        CommonConfig.instance_search_daily_time = 1;
        // 联盟每日捐献次数
        CommonConfig.league_donate_daily_times = 2;
        //----------------------------联赛----------------------------------------
        // 联赛报名等级限制
        CommonConfig.league_match_join_limit_level = 3;
        // 联赛成员参加入帮时间限制
        CommonConfig.league_match_member_join_limit_time = 86400;
        // 联赛成员阵容数量
        CommonConfig.league_match_max_member_formation = 5;
        // 联赛成员进攻次数
        CommonConfig.league_match_member_attack_times = 3;
        // 联赛各个据点队伍数量(高，中1，中2，低1，低2)
        CommonConfig.league_match_fortress_team_num = [6, 6, 6, 6, 6];
        // 联赛开始时间和结束时间
        CommonConfig.league_match_start_close_time = [12 * 3600, 23 * 3600, 36 * 3600, 60 * 3600];
        // 联赛报名消耗活跃度
        CommonConfig.league_match_sign_consume_enliven = 500;
        // 联赛联盟初始积分
        CommonConfig.league_match_base_score = 1000;
        // 联赛参赛人数要求
        CommonConfig.league_match_limit_members = 8;
        // 联赛防守队伍数量要求
        CommonConfig.league_match_limit_defence_team = 12;
        // 联赛匹配的积分区间划分
        CommonConfig.league_match_score_diff = 50;
        // 联赛据点星级对应分数
        CommonConfig.league_match_fortress_star_socre = [[3, 6, 9], [2, 4, 6], [2, 4, 6], [1, 2, 3], [1, 2, 3]];
        // 联赛据点全通额外加分
        CommonConfig.league_match_fortress_extra_socre = [18, 12, 12, 6, 6];
        // 联赛据点星级对应倍数
        CommonConfig.league_match_fortress_star_times = [3, 2, 2, 1, 1];
        // 联赛本服决赛名次额外积分
        CommonConfig.league_match_local_final_extra_socre = [0, 0, 0, 0];
        // 联赛四服决赛名次额外积分
        CommonConfig.league_match_craft_final_extra_socre = [0, 0, 0, 0];
        // 匹配对手时间
        CommonConfig.league_match_match_opponent_time = 3 * 60;
        //-------------------------------------------------------------------------
        // 军师最大属性数
        CommonConfig.adviser_max_property = 5;
        // 神兵突破百分比
        CommonConfig.artifact_break_pre = 0.8;
        // 神兵洗练材料Id
        CommonConfig.artifact_wash_goods = 31101;
        // 神兵洗练最大锁定数量
        CommonConfig.artifact_wash_max_lock = 2;
        // 神兵突破后属性加成
        CommonConfig.artifact_break_up = 0.08;
        // 神兵初始属性百分比
        CommonConfig.artifact_init_pre = 0.5;
        // 太极玉Id
        CommonConfig.artifact_split_super = 31001;
        // 宝物最大数量
        CommonConfig.potapo_max_number = 400;
        // 宝石普通单切每日免费次数
        CommonConfig.jade_normal_gamble_once_free_number = 5;
        // 自动磨洗最大元宝数
        CommonConfig.jade_auto_refresh_token_number = 5000;
        // 宠物最大星级
        CommonConfig.pet_star_max = 35;
        // 宠物最大阶数
        CommonConfig.pet_step_max = 7;
        // 武将万能信物Id
        CommonConfig.general_soul_omnipotent = 30701;
        // 军师阵型锁定最大数量
        CommonConfig.adviser_refresh_lock_max = 4;
        // 武将技能觉醒后提升等级
        CommonConfig.general_skill_awaken_uplvel = 5;
        // 武将头像获得星级
        CommonConfig.general_head_unlock_star = 1;
        // 角色光环索引倍数规则
        CommonConfig.role_halo_index = 100;
        // 聊天各个频道时间间隔
        CommonConfig.speak_time_space = [1, 1, 5, 5, 1, 5, 5, 30, 1, 1, 1];
        // 商城刷新时间(从零开始)
        CommonConfig.mall_refresh_time = [[24 * 3600], [4 * 3600, 8 * 3600, 12 * 3600, 16 * 3600, 20 * 3600, 24 * 3600], [7 * 24 * 3600], [7 * 24 * 3600], [7 * 24 * 3600], [7 * 24 * 3600], [7 * 24 * 3600], [7 * 24 * 3600]];
        // 商城刷新1品数量
        CommonConfig.mall_refresh_count = [0, 8, 8, 12, 9, 8, 8, 10, 10, 10, 10];
        // 商城折扣数量
        CommonConfig.mall_discount_count = [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0];
        // 智能商城策略选择(物品类型4, 6, 7, 8, 9)
        CommonConfig.mall_intelligent_strategy = [[], [], [4, 6, 7, 8, 9], [4, 6, 7, 8, 9], [4, 6, 7, 8, 9], [4, 6, 7, 8, 9], [], [], [], [], [], []];
        // 体力增加间隔
        CommonConfig.role_add_power_time = 300;
        // 购买增加体力
        CommonConfig.role_buy_add_power = 100;
        // 购买增加盘子
        CommonConfig.role_buy_add_plate = 5;
        // 盘子增加间隔
        CommonConfig.role_add_gold_plate_time = 3600;
        // 盘子自增长最大上限
        CommonConfig.role_gold_plate_max = 10;
        // 修改君主名称消耗
        CommonConfig.modify_role_name_consume = 500;
        // 修改联盟名称消耗
        CommonConfig.modify_league_name_consume = 300;
        // 各个排行榜刷新间隔
        CommonConfig.rank_refresh_time = 1800;
        // 排名一次拉取数量上限
        CommonConfig.rank_list_max = 50;
        // 可以对前几名点赞
        CommonConfig.rank_praise_count = 10;
        // 被点赞最大值
        CommonConfig.rank_praise_other_max = 9999;
        // 自己点赞最大值
        CommonConfig.rank_praise_myself_max = 10;
        // 排名类型定义
        CommonConfig.rank_type = ['', 'role.level', 'role.ladder', 'league.active', 'tower.normal', 'tower.senior', 'relic.instance'];
        CommonConfig.rank_activity_charge = 'activity.charge';
        CommonConfig.rank_activity_rank = 'activity.rank';
        CommonConfig.rank_auto_level = 'auto.level';
        // 排行分数偏移量
        CommonConfig.rank_score_diff = 10000000000000;
        // 天梯免费挑战次数
        CommonConfig.ladder_challenge_time = 5;
        // 天梯连胜次数提示
        CommonConfig.ladder_swarm_hint = 15;
        // 天梯获取挑战玩家数量百分比
        CommonConfig.ladder_challenge_percent = 30;
        // 天梯奖励发放时间
        CommonConfig.ladder_reward_time = 20;
        // 天梯胜利固定奖励
        CommonConfig.ladder_win_reward = [[20001, 5000], [20004, 30],];
        // 天梯失败固定奖励
        CommonConfig.ladder_fail_reward = [[20004, 15],];
        // 战斗时长
        CommonConfig.ladder_battle_duration = 180;
        // 天梯快速战斗花费元宝
        CommonConfig.ladder_quick_reward_token = 0;
        // 竞技场吊打五次排名
        CommonConfig.ladder_quick_reward_rank = 800;
        // 普通副本连扫等级限制
        CommonConfig.instance_sweep_limit_level = 1;
        // 全部技能升级等级限制
        CommonConfig.skill_all_uplevel_limit_level = 1;
        // 全部强化装备等级限制
        CommonConfig.equip_all_uplevel_limit_level = 32;
        // 伏牛寨挑战次数
        CommonConfig.instance_village_number = 2;
        // 伏牛寨CD
        CommonConfig.instance_village_cd = 300;
        // 经验副本开启日期
        CommonConfig.instance_exp_open_day = [0, 1, 2, 3, 4, 5, 6,];
        // 游戏币副本开启日期
        CommonConfig.instance_money_open_day = [0, 1, 2, 3, 4, 5, 6,];
        // 普通副本不足三星扫荡消耗元宝
        CommonConfig.instance_normal_sweep_consume_token = 1;
        // 精英副本不足三星扫荡消耗元宝
        CommonConfig.instance_elite_sweep_consume_token = 2;
        // 月卡相关
        // 月卡持续天数
        CommonConfig.month_days_duration = 30;
        // 普通月卡激活元宝
        CommonConfig.month_normal_activity_token = 250;
        // 高级月卡激活元宝
        CommonConfig.month_senior_activity_token = 1980;
        // 月度礼包相关
        // 月度礼包开启等级
        CommonConfig.month_gift_level = 30;
        // 月卡福利
        CommonConfig.month_card_fit = [100203, 100204];
        // 小礼包触发概率增长
        CommonConfig.gift_trigger_rand = [1, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
        // 小礼包触发的累充活动奖励
        CommonConfig.gift_charge_add_level = [100, 200];
        CommonConfig.gift_charge_add_rewards = [[20020, 30507, 30453, 10058], [20020, 30507, 30453, 10058]];
        CommonConfig.gift_charge_add_count = [[10, 10, 10, 10], [10, 10, 10, 10]];
        // 武将首次升星奖励等级
        CommonConfig.general_upstar_level = [5, 6];
        // 武将首次升星奖励物品
        CommonConfig.general_upstar_rewards = [[20020, 30453, 10058, 30004], [20002, 30507, 30453, 10059]];
        // 武将首次升星奖励数量
        CommonConfig.general_upstar_count = [[1, 1, 2, 2], [300, 1, 2, 1]];
        // 联盟最大等级
        CommonConfig.league_level_max = 20;
        // 退出联盟之后的时间限制
        CommonConfig.league_quit_time_limit = 12 * 3600;
        // 踢出联盟时间限制
        CommonConfig.league_kick_time_limit = 12 * 3600;
        // 换帮会不能参加困兽之战或庆功宴时间限制
        CommonConfig.league_quit_time_boss_limit = 24 * 3600;
        // 创建联盟需要花费
        CommonConfig.league_create_coins = 300;
        // 联盟长老最大人数
        CommonConfig.league_elder_max = 5;
        // 联盟技能每周重置次数
        CommonConfig.league_week_reset = 1;
        // 联盟技能每日重选次数
        CommonConfig.league_day_reset = 2;
        // 联盟异兽普通喂养最大值
        CommonConfig.league_animal_feed_value = 200;
        // 联盟异兽高级喂养最大次数
        CommonConfig.league_animal_feed_count = 3;
        // 异兽成长值与联盟贡献比例
        CommonConfig.league_animal_grow_donate = 0.25;
        // 异兽成长值与联盟币比例
        CommonConfig.league_animal_grow_coin = 0.5;
        // 联盟boss伤害排行数量
        CommonConfig.league_boss_hurt_rank_number = 5;
        // 联盟boss鼓舞次数
        CommonConfig.league_boss_inspire_number = 5;
        // 联盟boss普通鼓舞花费
        CommonConfig.league_boss_inspire_normal = 10000;
        // 联盟boss高级鼓舞花费
        CommonConfig.league_boss_inspire_senior = 25;
        // 联盟boss最大攻击次数
        CommonConfig.league_boss_battle_number = 3;
        // 联盟boss击杀奖励
        CommonConfig.league_boss_kill_reward = [[20001, 30000], [20007, 100],];
        // 联盟宴会入场券
        CommonConfig.league_party_consume = 50;
        // 联盟宴会增加体力
        CommonConfig.league_party_power = 100;
        // 联盟宴会加餐花费
        CommonConfig.league_party_add_consume = 500;
        // 联盟宴会加餐获得贡献值
        CommonConfig.league_party_add_donate = 500;
        // 联盟禅让帮主时长
        CommonConfig.league_leader_demise_duration = 5 * 86400;
        // 联盟禅让成员离线时长
        CommonConfig.league_member_logout_duration = 3 * 86400;
        // 联盟boss增长等级
        CommonConfig.league_boss_level_add = 3;
        // 联盟钓鱼免费刷新次数
        CommonConfig.league_fishing_free_refresh = 5;
        // 联盟钓鱼刷新消耗铜钱
        CommonConfig.league_fishing_refresh_money = 2000;
        // 联盟钓鱼刷新消耗元宝
        CommonConfig.league_fishing_refresh_token = 20;
        // 联盟钓鱼奖励翻倍消耗
        CommonConfig.league_fishing_reward_token = 50;
        // 联盟钓鱼刷新数量
        CommonConfig.league_fishing_number = 3;
        // 联盟活跃度每日上限
        CommonConfig.league_active_day_max = 300;
        // 体力与活跃度兑换比例
        CommonConfig.league_active_power_pre = 6;
        // 联盟副本挑战保护时长
        CommonConfig.league_instance_battle_duration = 300;
        // 联盟副本每日攻打次数
        CommonConfig.league_instance_day_time = 2;
        // 联盟副本伤害排行显示数量
        CommonConfig.league_instance_rank_number = 10;
        // 联盟副本挑战次数购买限制
        CommonConfig.league_instance_buy_time_max = 4;
        // 联盟副本胜利增加联盟经验
        CommonConfig.league_instance_add_league_exp = 100;
        // 联盟战成员移动协议发送间隔(ms)
        CommonConfig.league_battle_scene_move_duration = 100;
        // 场景中相关值
        // 各种场景宽高(联盟战、仙境、boss场景)
        CommonConfig.scene_h = [1200, 1680, 600, 600];
        CommonConfig.scene_w = [4400, 3520, 1920, 1920];
        // 在场景中一个角色的宽高
        CommonConfig.scene_item_w = 210;
        CommonConfig.scene_item_h = 210;
        // 场景中加血冷却时长
        CommonConfig.scene_add_blood_cooling_duration = [60, 60, 60, 60];
        // 场景中加血消耗
        CommonConfig.scene_add_blood_token = [100, 50, 50, 50];
        // 场景中加速冷却时长
        CommonConfig.scene_add_speed_cooling_duration = [60, 60, 50, 50];
        // 场景中加速消耗
        CommonConfig.scene_add_speed_honor = [50, 25, 50, 50];
        // 场景中加速持续时长
        CommonConfig.scene_add_speed_duration = [10, 10, 10, 10];
        // 场景中死亡保护时长
        CommonConfig.scene_dead_protect_duration = [30, 30, 30, 30];
        // 场景中死亡复活清空cd消耗
        CommonConfig.scene_clear_dead_cooling_consume = [100, 50, 50, 50];
        // 场景中战斗保护时长
        CommonConfig.scene_battle_protect_duration = [3, 3, 3, 3];
        // 场景掉线离开时长
        CommonConfig.scene_logout_leave_duration = 300;
        // 发起挑战倒计时
        CommonConfig.scene_declare_duration = 3;
        // 无敌时长
        CommonConfig.scene_invincible_duration = 3;
        // 快速战斗系数设定
        CommonConfig.scene_battle_coefficient = 0.7;
        // 场景中移动速度
        CommonConfig.league_scene_move_speed_x = 0.35;
        CommonConfig.league_scene_move_speed_y = 0.15;
        // 盟战匹配活跃度起始值
        CommonConfig.league_war_average_enliven = 100;
        // 联盟招募需求贡献度
        CommonConfig.league_recruit_contribute = 100;
        // 上阵武将等级
        CommonConfig.wonderland_general_level = 1;
        // 每类树可以采摘果实上限
        CommonConfig.wonderland_fruit_max = [9999, 9999, 5, 9999, 9999,];
        // 怪物移动频率
        CommonConfig.wonderland_mobs_move_hz = 5;
        // 仙境中最大罪恶值
        CommonConfig.wonderland_evil_max = 100;
        // 罪恶值减少频率
        CommonConfig.wonderland_evil_hz = 60 * 5;
        // 清除罪恶值花费元宝比例
        CommonConfig.wonderland_evil_token = 5;
        // 离开仙境一段时间后清除数量标示
        CommonConfig.wonderland_leave_duration = 300;
        // 离开黑暗大陆一段时间后消除数量标识
        CommonConfig.darkland_leave_duration = 120;
        // 黑暗大陆城市容纳人数
        CommonConfig.darkland_city_role_number = 1000;
        // 黑暗大陆城市容纳分区数
        CommonConfig.darkland_city_group_number = 10;
        // 黑暗大陆复活增加积分
        CommonConfig.darkland_revive_add_score = 10;
        // 黑暗大陆元宝加血增加积分
        CommonConfig.darkland_blood_add_score = 10;
        // 黑暗大陆被杀增加积分上限
        CommonConfig.darkland_dead_add_score_max = 30;
        // 黑暗大陆杀人积分上限
        CommonConfig.darkland_kill_add_score_max = 400;
        // 黑暗大陆排行榜门槛
        CommonConfig.darkland_rank_base_score = 10;
        // 港口开启时间
        CommonConfig.port_open_time = [[45000, 46800], [76500, 78300]];
        // 黑暗大陆boss出现前公告时间
        CommonConfig.darkland_boss_coming_minute = 5;
        //活动boss开启时间
        CommonConfig.darkland_boss_open_time = [[54000, 55800], [72000, 73800]];
        // 活动bossID
        CommonConfig.darkland_boss_monster_id = [8000000];
        //  黑暗大陆boss激励次数(普通、高级)
        CommonConfig.darkland_boss_inspire_times = [5, 10];
        //  黑暗大陆boss激励消耗
        CommonConfig.darkland_boss_inspire_consume = [[20001, 100000], [20002, 100]];
        //  黑暗大陆boss战斗次数
        CommonConfig.darkland_boss_battle_times = 5;
        // 黑暗大陆boss激励加成百分比
        CommonConfig.darkland_boss_inspire_percent = [5, 20];
        // 仙境额外发送的皮包触发区间
        CommonConfig.wonderland_goldfruit_section = [1, 30];
        // 仙境额外发送的皮包触发概率和随机范围
        CommonConfig.wonderland_goldfruit_rand = [27, 10000];
        // 仙境额外发送的皮包
        CommonConfig.wonderland_goldfruit = [130202, 1];
        //--------------------已屏蔽-----------------
        // 仙境额外发送的通缉令触发区间
        CommonConfig.wonderland_wanted_section = [1, 20];
        // 仙境额外发送的通缉令触发概率和随机范围
        CommonConfig.wonderland_wanted_rand = [147, 10000];
        // 仙境额外发送的通缉令
        CommonConfig.wonderland_wanted_goodses = [20016, 20017, 20018];
        // 仙境额外发送的通缉令数量
        CommonConfig.wonderland_wanted_count = [1, 1, 1];
        // 仙境额外发送的通缉令权重
        CommonConfig.wonderland_wanted_power = [1, 2, 1];
        // 仙境额外发送的通缉令等级
        CommonConfig.wonderland_wanted_level = [32, 36, 50];
        // 仙境额外发送的天山玉露触发区间
        CommonConfig.wonderland_jadedew_section = [1, 15];
        // 仙境额外发送的天山玉露触发概率和随机范围
        CommonConfig.wonderland_jadedew_rand = [300, 10000];
        // 仙境额外发送的天山玉露
        CommonConfig.wonderland_jadedew = [31401, 1];
        //-----------------------------------------------
        //-----------------------------------------------
        //--猎人装备最大等级
        CommonConfig.general_equip_max_level = 20;
        //--猎人装备最大品阶
        CommonConfig.general_equip_max_step = 26;
        //--猎人装备倍数索引
        CommonConfig.general_equip_multiple_index = 10000;
        //--猎人装备通用1武将开启等级
        CommonConfig.general_equip_one_openlevel = 30;
        //--猎人装备通用2武将开启等级
        CommonConfig.general_equip_two_openlevel = 40;
        //-----------------------------------------------
        // 上阵武将等级
        CommonConfig.zork_general_level = 1;
        // 场景boss两次战斗间隔
        CommonConfig.scene_boss_battle_cooling_duration = 90;
        // 场景boss伤害排行数量
        CommonConfig.scene_boss_hurt_rank_number = 100;
        // 向客户端传递数量
        CommonConfig.scene_boss_hurt_rank_toclient = 30;
        // BOSS刷新时间段
        CommonConfig.scene_boss_state_duration = [[75600, 77400]];
        // 场景开启后boss倒计时
        CommonConfig.scene_boss_open_duration = 30;
        // 场景boss最后一击杀奖励
        CommonConfig.scene_boss_kill_reward = [130105, 1];
        // 场景boss伤害分成奖励最底额度(废除)
        CommonConfig.scene_boss_burt_lowpercent = 0.005;
        // 场景boss伤害分成总奖励(废除)
        CommonConfig.scene_boss_hurt_reward = [[135002, 500], [20007, 1000]];
        // boss场景优化程度(0表示不优化)
        CommonConfig.scene_boss_optimize_degree = 20;
        // boss场景复活区域
        CommonConfig.scene_boss_revive_x = [100, 100];
        CommonConfig.scene_boss_revive_y = [100, 300];
        // boss场景bossId
        CommonConfig.scene_boss_mobs_id = [7920001, 7920200];
        // boss初始等级
        CommonConfig.scene_boss_public_level = 35;
        // boss刷新坐标
        CommonConfig.scene_boss_refresh_xy = [1100, 242];
        // 购买游戏币最大经验
        CommonConfig.buy_money_max_exp = 3;
        // 访仙商城限购数量(作废)
        CommonConfig.immortal_mall_limit = 100;
        // 购买开服基金vip
        CommonConfig.fund_reward_vip = 3;
        // 购买开服基金代币
        CommonConfig.fund_reward_token = 500;
        // 离线时长推送提醒
        CommonConfig.push_logout_time = 3600 * 24;
        // 外挂允许最大值
        CommonConfig.plugin_power_max = 10;
        // 战斗数据常量参数
        CommonConfig.plugin_battle_const = [1.0, 20, 100, 16500, 3500];
        // 战斗相关begin
        // 胜负定义
        // 普通/精英副本:规定时间内敌方全部死亡或者boss死亡为胜利，否则失败
        // 爬塔:规定时间内敌方全部死亡或者boss死亡为胜利，否则失败
        // 竞技场:规定时间内敌方全部死亡为胜利，否则失败
        // 伏牛寨:规定时间内敌方死亡或者自方没有死光为胜利，否则失败
        // 特训:规定时间内到一定连击数，否则失败
        // 通缉令:规定时间内我方没有死亡活着规定时间内敌方死亡为胜利，否则为失败
        // 战斗最短时长(s)
        CommonConfig.check_battle_min_time = 5;
        // 连击时间间隔
        CommonConfig.battle_combo_spc_ms = 2000;
        // 普通攻击涨怒气数
        CommonConfig.common_dodge_rage = 10;
        // 技能攻击涨怒气数
        CommonConfig.skill_dodge_rage = 30;
        // 掉血涨怒气数
        CommonConfig.bleed_make_rage = 5;
        // 最后一击涨怒气数
        CommonConfig.last_hit_rage = 40;
        // 掉血线
        CommonConfig.blood_trigger_line = 0.05;
        // 战斗相关end
        // 推荐好友数量
        CommonConfig.relation_applying_count = [25, 26, 30, 35, 40, 43, 46, 50, 50, 50, 50, 50, 50, 50, 50,];
        // 许愿树免费刷新次数
        CommonConfig.refresh_wish_tree_free_time = 3;
        // 许愿树全领天数
        CommonConfig.allreward_wish_tree_day = 3;
        // 祭祀符文数量
        CommonConfig.gain_runes_number = 6;
        // 祭祀和换符文获得的幸运值
        CommonConfig.gain_runes_lucky = [8, 4];
        // 祭祀获得高值的结点
        CommonConfig.runes_lucky_five = 96;
        CommonConfig.runes_lucky_six = 160;
        // 祭祀新手引导获得的物品
        CommonConfig.gain_runes_new_goods = [[131110, 1]];
        // 跨服战相关
        // 购买挑战次数
        CommonConfig.singlecraft_buy_time = 5;
        // 联盟战各个间断时间长度3600 * 9, 3600 * 10, 86400 * 6 + 3600 * 22 + 60"; 
        CommonConfig.singlecraft_state_duration = [32400, 36000, 597660];
        // 总参赛人数
        CommonConfig.singlecraft_join_number = 1000;
        // 每日奖励发放时间22 * 3600
        CommonConfig.singlecraft_daily_time = 22;
        // 缓存滞留时间
        CommonConfig.singlecraft_cache_retention_time = 600;
        // 初始积分
        CommonConfig.singlecraft_init_score = 1000;
        // 跨服战强退后荣誉值获得
        CommonConfig.singlecraft_balance_honor = 100;
        // 跨服战称号持续时长
        CommonConfig.singlecraft_title_durtime = 86400 * 6 + 23 * 3600 + 40 * 60;
        // 跨服战积分计算标准值
        CommonConfig.singlecraft_score_diff = 10000000.0;
        // 跨服战最低积分下限[)
        CommonConfig.singlecraft_score_low = [[1, 42, 1000], [42, 46, 1050], [46, 51, 1100], [51, 56, 1150], [56, 60, 1180], [60, 100, 1200]];
        // 领体力时间(开始时间、结束时间、体力数量)1,2,3
        CommonConfig.reward_power_time = [4 * 60 * 60, 12 * 60 * 60, 20 * 60 * 60];
        // 领副本体力时间(开始时间/结束时间/开始时间/结束时间...)
        CommonConfig.recieve_instance_power_time = [4 * 60 * 60, 12 * 60 * 60, 16 * 60 * 60 - 1, 16 * 60 * 60, 20 * 60 * 60 - 1, 20 * 60 * 60, 24 * 60 * 60];
        CommonConfig.recieve_instance_power_info = [2, 4, 6];
        // 各阶段可领取体力数
        CommonConfig.recieve_instance_power_count = [50, 100, 50];
        // 各阶段补领体力消耗钻石数
        CommonConfig.recieve_instance_power_consume = [10, 20, 10];
        // 分享获得物品
        CommonConfig.share_goods = [[20002, 25]];
        // 特训奖励大礼包
        CommonConfig.training_goods = [[20002, 100], [40001, 10], [40003, 10], [40005, 10]];
        // 新手活动总奖励
        // static missionnew_goods = [[30908, 8], [10038, 1], [30003, 5]];
        CommonConfig.missionnew_goods = [[30908, 8], [10038, 1], [30003, 10]];
        CommonConfig.missionnew_reward_one = [[10020, 1], [138003, 1], [30003, 10]];
        CommonConfig.missionnew_reward_two = [[139010, 1], [20001, 100000]];
        CommonConfig.missionnew_reward_maqi = [[139010, 1], [20001, 100000]];
        CommonConfig.missionnew_reward_kubi = [[139010, 1], [20001, 100000]];
        // 宝物使用鉴定符时附加属性权重（4,5,6）(0~5)
        CommonConfig.potapo_addattri_randpower_appraise = [[0, 0, 0, 7, 3, 0], [0, 0, 0, 0, 7, 3], [0, 0, 0, 0, 0, 1]];
        // 武将统计权值
        CommonConfig.general_stats_weight = [1, 1, 1, 1, 1, 1, 1, 1];
        // 武将统计积分星级映射
        CommonConfig.general_rank_star = [50, 45, 45, 40, 40, 35, 35, 35, 30, 30, 30, 25, 25, 25, 25, 20, 20, 20, 20, 20,
            15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0,];
        // // 黑暗大陆排行榜门槛
        // static darkland_rank_base_score = 10;
        // 活动初始化信息
        CommonConfig.activity_content = [[{
                    "activities": [
                        { "note0": "开服冲级" },
                        {
                            "type": "8", "noticeType": "1", "picId": "1", "name": "开服冲级赢大奖", "duration": "2592000", "uplevel": "50",
                            "des": "开服30天内，率先达到50级的玩家即可获得超值大奖哦，还在等什么？漫漫冲级路，有你更精彩！",
                            "uplevelItem": [{ "index": "1", "picId": "3", "rewardCount": "10", "goodsInfo": "20022&1&1|139009&2&1|20002&1000&1" },
                                { "index": "2", "picId": "2", "rewardCount": "100", "goodsInfo": "20021&2&1|139008&5&1|20002&500&1" },
                                { "index": "3", "picId": "1", "rewardCount": "800", "goodsInfo": "20020&10&1|139008&2&1|20002&300&1" }]
                        },
                        { "note1": "双月卡" },
                        {
                            "type": "18", "noticeType": "3", "picId": "1", "name": "购双月卡送A级猎人", "duration": "864000",
                            "des": "活动内容:开服10天内，只要同时购买初级月卡和高级月卡，就可免费获得一个A级猎人自选礼包哦~",
                            "rewards": [{ "goodsInfo": "190001&1&1" }]
                        },
                        { "note2": "双倍友情点" },
                        {
                            "type": "19", "noticeType": "3", "picId": "1", "name": "酒馆畅饮得双倍积分", "duration": "315360000",
                            "des": "活动时间内，在酒馆中畅饮可获得双倍积分。积分可在酒馆商店兑换各种稀有道具，更有必出S级猎人的酩悦香槟哟~",
                            "buffType": "8", "buffValue": "1",
                            "rewards": [{ "goodsInfo": "20014&100&1" }]
                        },
                        { "note3": "开服献礼" },
                        {
                            "type": "15", "noticeType": "3", "picId": "1", "name": "开服献礼", "duration": "345600",
                            "des": "活动内容:开服4天内，专题献礼活动",
                            "missions": [{ "mission_type": "1", "mission_condition": "1", "rewards": "20002&28&1|30451&1&1|30003&1&1|20001&8888&0" },
                                { "mission_type": "3", "mission_condition": "3", "rewards": "20002&58&1|139003&1&1|30003&3&1|20001&8888&0" },
                                { "mission_type": "4", "mission_condition": "5", "rewards": "20002&58&1|139002&1&1|30003&3&1|20001&8888&0" },
                                { "mission_type": "5", "mission_condition": "30", "rewards": "20002&58&1|10058&1&1|30003&1&&1|20001&8888&0" },
                                { "mission_type": "10", "mission_condition": "2000", "rewards": "20002&58&1|30453&1&1|30004&1&1|20001&8888&0" }]
                        },
                        { "note4": "每日首充活动" },
                        {
                            "type": "2", "noticeType": "1", "picId": "1", "name": "任意充值送好礼", "duration": "432000",
                            "des": "开服5天内，每日充值送好礼，5天一循环", "rewardZone": "1|2|3|4|5", "chargeDaily": "1",
                            "rewards": [{ "goodsInfo": "30452&1&1|139007&1&1|30004&1&1|20001&28888&0" }, { "goodsInfo": "30452&1&1|139007&1&1|30004&2&1|20001&38888&0" },
                                { "goodsInfo": "30452&1&1|139007&1&1|30004&3&1|20001&58888&0" }, { "goodsInfo": "30452&1&1|139007&1&1|30004&4&1|20001&68888&0" },
                                { "goodsInfo": "30453&1&1|139008&1&1|30004&5&1|20001&88888&0" }]
                        },
                        { "note5": "升星挑战" },
                        {
                            "type": "15", "noticeType": "3", "picId": "1", "name": "升星挑战", "duration": "259200",
                            "des": "活动内容:开服3天内，专题献礼活动",
                            "missions": [{ "mission_type": "42", "mission_condition": "1", "rewards": "10032&1&1|30811&10&1|30003&3&1|20001&10000&0" },
                                { "mission_type": "37", "mission_condition": "5", "rewards": "139004&1&1|31101&3&1|30004&1&1|20001&10000&0" },
                                { "mission_type": "38", "mission_condition": "2", "rewards": "139008&1&1|30812&5&1|30004&2&1|20001&10000&0" },
                                { "mission_type": "43", "mission_condition": "20", "rewards": "30452&1&1|130202&1&1|30004&1&1|20001&10000&0" }]
                        },
                        { "note6": "专题献礼B, 复用字段collectId，延迟的开启时间" },
                        {
                            "type": "15", "noticeType": "3", "picId": "1", "name": "猎人养成计划", "collectId": "259200", "duration": "345600",
                            "des": "活动内容:开服4天内，专题献礼活动",
                            "missions": [{ "mission_type": "29", "mission_condition": "10", "rewards": "30453&1&1|20015&3&1|30003&3&1|20001&10000&0" },
                                { "mission_type": "31", "mission_condition": "1", "rewards": "20002&58&1|20015&3&1|30003&3&1|20001&10000&0" },
                                { "mission_type": "32", "mission_condition": "1", "rewards": "20002&88&1|20015&3&1|30004&1&1|20001&10000&0" },
                                { "mission_type": "44", "mission_condition": "3", "rewards": "30813&3&1|20015&3&1|30004&1&1|20001&10000&0" }]
                        }
                    ]
                }]];
        // 循环活动内容
        CommonConfig.activity_circulation_content = [[{
                    "activities": [
                        { "note0": "每日首充活动" },
                        {
                            "type": "2", "noticeType": "1", "picId": "1", "name": "任意充值送好礼", "duration": "432000",
                            "des": "每日充值精彩好礼送不停，5天一循环", "rewardZone": "1|2|3|4|5", "chargeDaily": "1",
                            "rewards": [{ "goodsInfo": "30452&1&1|31101&1&1|30812&1&1|20001&28888&0" }, { "goodsInfo": "30452&1&1|31101&1&1|30812&2&1|20001&38888&0" },
                                { "goodsInfo": "30452&1&1|31101&1&1|30813&1&1|20001&58888&0" }, { "goodsInfo": "30452&1&1|31101&1&1|30813&2&1|20001&68888&0" },
                                { "goodsInfo": "30453&1&1|31102&1&1|139008&1&1|20001&88888&0" }]
                        },
                        { "note1": "连续登陆活动，复用字段chargeDaily，星级六开" },
                        {
                            "type": "1", "noticeType": "3", "picId": "2", "name": "周末登录活动", "duration": "259200",
                            "des": "周六至周一登陆送好礼", "rewardZone": "1|2|3", "chargeDaily": "6",
                            "rewards": [{ "goodsInfo": "20002&50&1|30451&1&1|30004&1&1|20001&10000&0" }, { "goodsInfo": "20002&50&1|139007&1&1|30004&1&1|20001&20000&0" },
                                { "goodsInfo": "20002&100&1|20006&15&1|30004&3&1|20001&30000&0" }]
                        }
                    ]
                }]];
        // 个人双倍友情点活动存在时长
        CommonConfig.activity_lottery_survival_time = 172800;
        // 敌犯大本营排行数量
        CommonConfig.enemycamp_rank_num = 6;
        // 身份认证奖励内容
        CommonConfig.identification_reward = [[20002, 200]];
        // 援护战力折算
        CommonConfig.support_battle_value = 0.2;
        // 初级探索任务数量
        CommonConfig.init_search_count = 4;
        // 探索任务最大数量
        CommonConfig.instance_search_max_count = 10;
        // 最大技能联盟等级
        CommonConfig.league_max_skill_level = 40;
        // 重置联盟技能返还金币比例
        CommonConfig.league_skill_reset_return = 80;
        return CommonConfig;
    }());
    zj.CommonConfig = CommonConfig;
    __reflect(CommonConfig.prototype, "zj.CommonConfig");
})(zj || (zj = {}));
//# sourceMappingURL=CommonConfig.js.map