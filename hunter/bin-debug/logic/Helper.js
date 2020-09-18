var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * @author chen xi
     *
     * @date 2018-11-20
     *
     * @class 帮助类，辅助做一些计算
     */
    var Helper = (function () {
        function Helper() {
        }
        /**
         * 字符串格式化
         *
         * @param str 字符串
         * @param para 可选参数
         *
         * @description 可选参数如果传入数组，需要对数组进行解构操作
         */
        Helper.StringFormat = function (str) {
            var para = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                para[_i - 1] = arguments[_i];
            }
            if (str == null || str == undefined)
                return "";
            if (typeof str !== "string")
                return String(str);
            var count = 0;
            str = str.replace(/(%%)/g, "%");
            //通过正则替换%s
            return str.replace(/(%.2f%)|(%s)|(%d)|(%u)|(%.1f)|(%2d)/g, function (s, i) {
                return para[count++];
            });
        };
        Helper.getWonderlandPlayerType = function (myMode, bMem) {
            var _type = zj.TableEnum.Enum.LeagueWarTouchType.Partner;
            if (myMode == message.EBattleMode.BATTLE_MODE_PEACE) {
                _type = zj.TableEnum.Enum.LeagueWarTouchType.Partner;
            }
            else if (myMode == message.EBattleMode.BATTLE_MODE_KILLING) {
                if (bMem) {
                    _type = zj.TableEnum.Enum.LeagueWarTouchType.Partner;
                }
                else {
                    _type = zj.TableEnum.Enum.LeagueWarTouchType.Person;
                }
            }
            return _type;
        };
        Helper.getWonderlandBloodPath = function (mode) {
            var path = zj.UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar;
            if (mode == message.EBattleMode.BATTLE_MODE_PEACE) {
                path = zj.UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar;
            }
            else if (mode == message.EBattleMode.BATTLE_MODE_KILLING) {
                path = zj.UIConfig.UIConfig_LeagueWarScene.roleBloodFightBar;
            }
            return path;
        };
        Helper.beInWonderlandWater = function (point) {
            var rect = new egret.Rectangle();
            var tag = false;
            for (var k in zj.ConstantConfig_Wonderland.warter_range) {
                var v = zj.ConstantConfig_Wonderland.warter_range[k];
                rect.x = v.x;
                rect.y = v.y;
                rect.width = v.width;
                rect.height = v.height;
                if (rect.containsPoint(point)) {
                    tag = true;
                    break;
                }
            }
            return tag;
        };
        //主城弹窗显示时间用
        Helper.FormatMsTime3 = function (ms) {
            var a = Math.floor(ms / 3600);
            var tmp = Math.floor(ms % 3600);
            var b = Math.floor(tmp / 60);
            var c = Math.floor(tmp % 60);
            var hour = null;
            var min = null;
            var ms1 = null;
            if (a >= 10) {
                hour = Helper.StringFormat("%d", a);
            }
            else {
                hour = "0" + Helper.StringFormat("%d", a);
            }
            if (b >= 10) {
                min = Helper.StringFormat("%d", b);
            }
            else {
                min = "0" + Helper.StringFormat("%d", b);
            }
            if (c >= 10) {
                ms1 = Helper.StringFormat("%d", c);
            }
            else {
                ms1 = "0" + Helper.StringFormat("%d", c);
            }
            var ret = Helper.StringFormat("%s:%s:%s", hour, min, ms1);
            return ret;
        };
        Helper.random = function (seed) {
            if (seed === void 0) { seed = 1; }
            var k = seed;
            k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
            k ^= k >>> 24;
            k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
            var h = (97 ^ 4);
            h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;
            h ^= h >>> 13;
            h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
            h ^= h >>> 15;
            return (h >>> 0) & 0x7fffffff;
        };
        Helper.getRandom2 = function (n, m) {
            if (n > m) {
                m = m + n;
                n = m - n;
                m = m - n;
            }
            var rand = n + zj.TsMtirand() % (m - n + 1);
            return rand;
        };
        //获取段位对应星图
        Helper.GetSegmentStar = function (score, lowShow) {
            var tbl = zj.TableLeagueMatchScore.Table();
            for (var i = 1; i <= Helper.getObjLen(tbl); i++) {
                if (tbl[i + 1] == null && score >= tbl[i].score_min) {
                    return zj.UIConfig.UIConfig_Union.segmentLogo[i - 1];
                }
                if (score >= tbl[i].score_min && score < tbl[i + 1].score_min && (i >= 4 || lowShow)) {
                    return zj.UIConfig.UIConfig_Union.segmentLogo[i - 1];
                }
            }
        };
        Helper.baseToBriefInfo = function (msg) {
            var brief = new message.RoleBriefInfo;
            brief.id = msg.id;
            brief.name = msg.name;
            brief.level = msg.level;
            brief.picId = msg.picId;
            brief.picFrameId = msg.picFrameId;
            brief.titleId = msg.titleId;
            //brief.viceTitleId = msg.viceTitleId
            brief.ladderRank = msg.ladderRank;
            brief.ladderMax = msg.ladderMax;
            brief.leagueId = msg.leagueId;
            brief.leagueName = msg.leagueName;
            brief.is_online = msg.is_online;
            brief.logoutTime = msg.logoutTime;
            brief.battleValue = msg.battleValue;
            brief.vipLevel = msg.vipLevel;
            //brief.praisedCount = msg.praisedCount
            return brief;
        };
        Helper.writeDetailFormat = function (detailFormat) {
            var tbl = [];
            for (var i = 0; i < detailFormat.generals.length; i++) {
                if (detailFormat.generals[i] != null && detailFormat.generals[i].general_id) {
                    tbl.push(detailFormat.generals[i].general_id);
                }
            }
            for (var i = 0; i < detailFormat.reserves.length; i++) {
                if (detailFormat.reserves[i] != null && detailFormat.reserves[i].general_id) {
                    tbl.push(detailFormat.reserves[i].general_id);
                }
            }
            for (var i = 0; i < detailFormat.supports.length; i++) {
                if (detailFormat.supports[i] != null && detailFormat.supports[i].general_id) {
                    tbl.push(detailFormat.supports[i].general_id);
                }
            }
            return tbl;
        };
        Helper.writeSimpleFormat = function (format) {
            var tbl = [];
            for (var i = 0; i < format.generals.length; i++) {
                if (format.generals[i] > 0) {
                    tbl.push(format.generals[i]);
                }
            }
            for (var i = 0; i < format.reserves.length; i++) {
                if (format.reserves[i] > 0) {
                    tbl.push(format.reserves[i]);
                }
            }
            for (var i = 0; i < format.supports.length; i++) {
                if (format.supports[i] > 0) {
                    tbl.push(format.supports[i]);
                }
            }
            return tbl;
        };
        Helper.writeMainFormat = function (format) {
            var tbl = [];
            for (var i = 0; i < format.generals.length; i++) {
                if (format.generals[i] > 0) {
                    tbl.push(format.generals[i]);
                }
            }
            return tbl;
        };
        Helper.detailCovertFormat = function (detailFormat) {
            var msg = new message.FormationInfo;
            msg.adviserId = detailFormat.adviserId;
            //msg.strategy = detailFormat.strategy;
            msg.adviserSkill = detailFormat.adviserSkill;
            for (var i = 0; i < detailFormat.generals.length; i++) {
                msg.generals.push(detailFormat.generals[i].general_id);
            }
            for (var i = 0; i < detailFormat.reserves.length; i++) {
                msg.reserves.push(detailFormat.reserves[i].general_id);
            }
            for (var i = 0; i < detailFormat.supports.length; i++) {
                msg.supports.push(detailFormat.supports[i].general_id);
            }
            return msg;
        };
        Helper.getGeneralIndexById = function (generalId) {
            var index = -1;
            for (var i = 0; i < zj.Game.PlayerHunterSystem.queryAllHunters().length; i++) {
                if (zj.Game.PlayerHunterSystem.queryAllHunters()[i].general_id == generalId) {
                    index = i;
                    break;
                }
            }
            if (index == -1) {
                console.log("not find general, id===" + generalId);
            }
            return index;
        };
        /**
         * RGB值合成颜色值
         * r:60,g:255,b:0
         */
        Helper.RGBToHex = function (color) {
            var rgb = color.split(',');
            var r = parseInt(rgb[0].split(':')[1]);
            var g = parseInt(rgb[1].split(':')[1]);
            var b = parseInt(rgb[2].split(':')[1]);
            return Math.floor(((r * 256) + g) * 256 + b);
        };
        /**
         * 16进制颜色值分割成rgb值
         */
        Helper.HexToRGB = function (color) {
            var result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor(color / 256) % 256;
            result.r = Math.floor(color / 256) / 256;
            return result;
        };
        /** 角度转弧度 */
        Helper.DegreeToRadian = function (degrees) {
            return degrees * (Math.PI / 180);
        };
        /** 弧度转角度 */
        Helper.RadianToDegree = function (radians) {
            return radians * (180 / Math.PI);
        };
        /**
         * 获取在直线上的点
         *
         * @param positionCenter 中心点坐标
         * @param gap 两点的间距
         * @param num 数量
         * @param angle 角度
         */
        Helper.GetLinePosition = function (centerX, centerY, gap, num, angle) {
            if (angle === void 0) { angle = 0; }
            // console.log("\n---- centerX = ", centerX, "centerY = ", centerY, " gap = ", gap, " num = ", num);
            if (num % 2 == 0) {
                centerX += gap / 2 - gap * num / 2;
                centerY += gap * Math.tan(this.DegreeToRadian(angle)) / 2 - gap * num * Math.tan(this.DegreeToRadian(angle)) / 2;
            }
            else {
                centerX -= (gap * (num - 1)) / 2;
                centerY -= gap * (num - 1) * Math.tan(this.DegreeToRadian(angle) / 2);
            }
            var ret = [];
            for (var i = 0; i < num; i++) {
                var pos = new egret.Point();
                pos.x = centerX + gap * i;
                pos.y = centerY + gap * i * Math.tan(this.DegreeToRadian(angle));
                ret.push(pos);
            }
            return ret;
        };
        /**
         * 居左对齐星星
         * @param node 星星节点
         * @param star 显示星星个数
         * @param maxStar 最大显示个数
         * @param scale 缩放
         * @param showDark 是否显示暗星
         * @param lightStarPath 亮星路径
         * @param darkStarPath 暗星路径
         */
        Helper.NodeStarByAlignLeft = function (node, star, maxStar, scale, showDark, lightStarPath, darkStarPath) {
            if (showDark === void 0) { showDark = false; }
            if (lightStarPath === void 0) { lightStarPath = null; }
            if (darkStarPath === void 0) { darkStarPath = null; }
            node.removeChildren();
            scale = (scale != null) ? scale : node.scaleX;
            maxStar = (maxStar != null) ? maxStar : zj.CommonConfig.general_max_star;
            star = (maxStar < star) ? maxStar : star;
            var showStarNum = showDark ? maxStar : star;
            lightStarPath = (lightStarPath != null) ? lightStarPath : zj.UIConfig.UIConfig_Role.starOnNew;
            darkStarPath = (darkStarPath != null) ? darkStarPath : zj.UIConfig.UIConfig_Role.heroAwakenStar[0];
            var starArray = [];
            var gap = node.width / (maxStar - 1);
            var centerPos = new egret.Point(node.width / 2, node.height / 2);
            var posList = this.GetLinePosition(centerPos.x, centerPos.y, gap, maxStar);
            for (var i = 0; i < showStarNum; i++) {
                var img = new eui.Image();
                img.source = zj.cachekey(((i < star) ? lightStarPath : darkStarPath), null);
                img.x = posList[i].x;
                img.y = posList[i].y;
                img.height = node.height;
                img.width = node.height;
                img.scaleX = scale;
                img.scaleY = scale;
                img.anchorOffsetX = img.width / 2;
                img.anchorOffsetY = img.height / 2;
                if (i < star) {
                    node.addChild(img);
                    starArray.push(img);
                }
                else {
                    if (showDark == true) {
                        node.addChild(img);
                        starArray.push(img);
                    }
                }
            }
            return starArray;
        };
        /**
         * 居中对齐星星
         *
         * @param node 星星节点
         * @param star 显示星星个数
         * @param maxStar 最大显示个数
         * @param scale 缩放
         * @param path 路径
         * @param angle 旋转角度
         */
        Helper.NodeStarByAlignMiddle = function (node, star, maxStar, scale, path, angle) {
            if (scale === void 0) { scale = 1.0; }
            if (path === void 0) { path = zj.UIConfig.UIConfig_Role.starOnNew; }
            if (angle === void 0) { angle = 0; }
            if (maxStar == null) {
                maxStar = zj.CommonConfig.general_max_star;
            }
            node.removeChildren();
            var gap = node.width / (maxStar - 1);
            var centerPos = new egret.Point(node.width / 2, node.height / 2);
            var posList = this.GetLinePosition(centerPos.x, centerPos.y, gap, maxStar);
            for (var i = 0; i < star; i++) {
                var img = new eui.Image();
                img.source = path;
                img.rotation = angle;
                img.x = posList[i].x;
                img.y = posList[i].y;
                img.height = node.height;
                img.width = img.height;
                img.scaleX = scale;
                img.scaleY = scale;
                node.addChild(img);
            }
        };
        /**
         * 觉醒后星级颜色(居中)
         * @param node 星星节点
         * @param star 星星显示个数
         * @param level 技能觉醒等级
         */
        Helper.SetHeroAwakeStarMid = function (node, star, level) {
            if (node != null) {
                this.NodeStarByAlignMiddle(node, star, null, null, zj.UIConfig.UIConfig_Role.heroAwakenStar[level]);
            }
        };
        /**
         * 觉醒后星级颜色(居左)
         * @param node 星星节点
         * @param star 星星显示个数
         * @param level 技能觉醒等级
         */
        Helper.SetHeroAwakenStar = function (node, star, level) {
            if (node != null) {
                this.NodeStarByAlignLeft(node, star, zj.CommonConfig.general_max_star, null, false, zj.UIConfig.UIConfig_Role.heroAwakenStar[level + 1]);
            }
        };
        /**
         * 觉醒后星级颜色(显示暗星星)
         * @param node 星星节点
         * @param star 星星节点
         * @param level 技能觉醒等级
         */
        Helper.SetAwakeSpriteStar = function (node, star, level) {
            if (node != null) {
                this.NodeStarByAlignLeft(node, star, zj.CommonConfig.general_max_star, null, true, zj.UIConfig.UIConfig_Role.heroAwakenStar[level + 1]);
            }
        };
        /**
         * 设置突破角标
         *
         * @param level 突破等级(0-3，0隐藏, 1 - 3 突破阶级).
         * */
        Helper.GetBreakLevelToPath = function (sprite, level) {
            if (sprite != null) {
                sprite.visible = (level != 0);
                if (level > 0 && level <= 9) {
                    sprite.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_break.breaklevelIcon[level - 1], null);
                }
                else {
                    sprite.source = "";
                }
            }
        };
        // 设置星星
        Helper.SetStar = function (starGroup, starNum, starPic, scale, starInterval, cla) {
            starGroup.removeChildren();
            for (var i = 0; i < starNum; i++) {
                var imageStar = new eui.Image();
                if (cla) {
                    imageStar.source = zj.cachekey(starPic, cla);
                }
                else {
                    imageStar.source = starPic;
                }
                imageStar.scaleX = scale;
                imageStar.scaleY = scale;
                imageStar.y = 0;
                imageStar.x = starInterval * i;
                starGroup.addChild(imageStar);
            }
        };
        Helper.StarHunterLevelPath = function (stars, level, path) {
            for (var v in stars) {
                if (stars.hasOwnProperty(v)) {
                    var k = stars[v];
                    k.source = (zj.yuan3(v <= level, path[0], path[1]));
                }
            }
        };
        Helper.AttriConvertTbl = function (attri) {
            // body
            var result = Helper.CreateGeneralAttrTbl0();
            result[zj.TableEnum.EnumGelAttrib.ATTR_HP] = attri.general_hp;
            result[zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK] = attri.general_atk;
            result[zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF] = attri.general_def;
            result[zj.TableEnum.EnumGelAttrib.ATTR_HTV] = attri.skill_atk;
            result[zj.TableEnum.EnumGelAttrib.ATTR_EVA] = attri.skill_def;
            result[zj.TableEnum.EnumGelAttrib.ATTR_PHY_CRIT] = attri.atk_crit;
            result[zj.TableEnum.EnumGelAttrib.ATTR_SKILL_CRIT] = attri.skill_crit;
            result[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA] = attri.crit_extra;
            result[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS] = attri.crit_resistance;
            result[zj.TableEnum.EnumGelAttrib.ATTR_DODGE_RATE] = attri.dodge_rate;
            result[zj.TableEnum.EnumGelAttrib.ATTR_HIT_RATE] = attri.hit_rate;
            result[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF] = attri.ignore_phyDef;
            result[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_MAGICDEF] = attri.ignore_magicDef;
            result[zj.TableEnum.EnumGelAttrib.ATTR_FINAL_EXTRA] = attri.final_extra;
            result[zj.TableEnum.EnumGelAttrib.ATTR_FINAL_REDUCE] = attri.final_reduce;
            result[zj.TableEnum.EnumGelAttrib.ATTR_ATK_ALL] = attri.general_atk_all;
            result[zj.TableEnum.EnumGelAttrib.ATTR_DEF_ALL] = attri.general_def_all;
            result[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_ALL] = attri.all_crit;
            result[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL] = attri.ignore_def_all;
            result[zj.TableEnum.EnumGelAttrib.ATTR_UNIL_RESIS] = attri.universal_resistance;
            result[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_RESIS] = attri.ignore_resistance;
            result[zj.TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS] = attri.float_resistance;
            result[zj.TableEnum.EnumGelAttrib.ATTR_CD_SPEED] = attri.cd_speed;
            return result;
        };
        Helper.tblConvertAttri = function (result) {
            var attri = new message.AttriInfo;
            attri.general_hp = result[zj.TableEnum.EnumGelAttrib.ATTR_HP];
            attri.general_atk = result[zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK];
            attri.general_def = result[zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF];
            attri.skill_atk = result[zj.TableEnum.EnumGelAttrib.ATTR_HTV];
            attri.skill_def = result[zj.TableEnum.EnumGelAttrib.ATTR_EVA];
            attri.atk_crit = result[zj.TableEnum.EnumGelAttrib.ATTR_PHY_CRIT];
            attri.skill_crit = result[zj.TableEnum.EnumGelAttrib.ATTR_SKILL_CRIT];
            attri.crit_extra = result[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA];
            attri.crit_resistance = result[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS];
            attri.dodge_rate = result[zj.TableEnum.EnumGelAttrib.ATTR_DODGE_RATE];
            attri.hit_rate = result[zj.TableEnum.EnumGelAttrib.ATTR_HIT_RATE];
            attri.ignore_phyDef = result[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF];
            attri.ignore_magicDef = result[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_MAGICDEF];
            attri.final_extra = result[zj.TableEnum.EnumGelAttrib.ATTR_FINAL_EXTRA];
            attri.final_reduce = result[zj.TableEnum.EnumGelAttrib.ATTR_FINAL_REDUCE];
            attri.general_atk_all = result[zj.TableEnum.EnumGelAttrib.ATTR_ATK_ALL];
            attri.general_def_all = result[zj.TableEnum.EnumGelAttrib.ATTR_DEF_ALL];
            attri.all_crit = result[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_ALL];
            attri.ignore_def_all = result[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL];
            attri.universal_resistance = result[zj.TableEnum.EnumGelAttrib.ATTR_UNIL_RESIS];
            attri.ignore_resistance = result[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_RESIS];
            attri.float_resistance = result[zj.TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS];
            attri.cd_speed = result[zj.TableEnum.EnumGelAttrib.ATTR_CD_SPEED];
            return attri;
        };
        /**
         * 返回阶级颜色
         */
        Helper.GetStepColor = function (step) {
            var _COLOR_WHITE = 0;
            var _COLOR_GREEN = 2;
            var _COLOR_BLUE = 5;
            var _COLOR_PURPLE = 8;
            var _COLOR_ORANGE = 12;
            var _COLOR_RED = 16;
            var _COLOR_GOLD = 20;
            if (step <= _COLOR_WHITE) {
                return zj.ConstantConfig_Common.Color.white;
            }
            else if (step <= _COLOR_GREEN) {
                return zj.ConstantConfig_Common.Color.quality_green;
            }
            else if (step <= _COLOR_BLUE) {
                return zj.ConstantConfig_Common.Color.quality_blue;
            }
            else if (step <= _COLOR_PURPLE) {
                return zj.ConstantConfig_Common.Color.quality_purple;
            }
            else if (step <= _COLOR_ORANGE) {
                return zj.ConstantConfig_Common.Color.quality_orange;
            }
            else if (step <= _COLOR_RED) {
                return zj.ConstantConfig_Common.Color.quality_red;
            }
            else if (step <= _COLOR_GOLD) {
                return zj.ConstantConfig_Common.Color.quality_gold;
            }
            else {
                return zj.ConstantConfig_Common.Color.quality_gold;
            }
        };
        Helper.CreateGeneralAttrTbl = function () {
            var result = [];
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                result.push(0);
            }
            return result;
        };
        Helper.CreateGeneralAttrTbl0 = function () {
            var result = [];
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                result.push(0);
            }
            result.unshift(0);
            return result;
        };
        /**
         * 设置图片滤镜颜色
         * @param img 图片
         * @param color null 原色, 'gray' 灰色 ,'black' 黑色,'yellow' 黄色
         */
        Helper.SetImageFilterColor = function (img, color) {
            if (color == null) {
                var colorMatrix = [
                    1, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                img.filters = [colorFlilter];
            }
            else if (color === 'gray') {
                var colorMatrix = [
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                img.filters = [colorFlilter];
            }
            else if (color === 'black') {
                var colorMatrix = [
                    0.05, 0.05, 0, 0, 0,
                    0.05, 0.05, 0, 0, 0,
                    0.05, 0.05, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                img.filters = [colorFlilter];
            }
            else if (color === 'yellow') {
                var colorMatrix = [
                    1, 1, 0, 0, 0,
                    1, 1, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                img.filters = [colorFlilter];
            }
            else if (color == "cool") {
                var colorMatrix = [
                    0.2, 0.05, 0, 0, 0,
                    0.2, 0.05, 0, 0, 0,
                    0.2, 0.05, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                img.filters = [colorFlilter];
            }
        };
        /** 字符串转换，如"一百零五" */
        Helper.GetNumCH = function (src, bSpecial) {
            if (bSpecial === void 0) { bSpecial = false; }
            if (bSpecial && parseInt(src) == 2) {
                return zj.TextsConfig.TextsConfig_Common.two;
            }
            if (parseInt(src) == 0) {
                return zj.TextsConfig.TextsConfig_Common.numZero;
            }
            var numCH = zj.TextsConfig.TextsConfig_Common.numCH;
            var numUnit1 = zj.TextsConfig.TextsConfig_Common.numUnit1;
            var numUnit2 = zj.TextsConfig.TextsConfig_Common.numUnit2;
            var numUnit3 = zj.TextsConfig.TextsConfig_Common.numUnit3;
            var numZero = zj.TextsConfig.TextsConfig_Common.numZero;
            var numOne = zj.TextsConfig.TextsConfig_Common.numOne;
            var numTen = zj.TextsConfig.TextsConfig_Common.numTen;
            var ajustZero = function (str) {
                var sub = str.substr(-3);
                if (sub == numZero) {
                    str = str.substr(0, str.length - 3);
                }
                return str;
            };
            var num2Table = function (num, denominator) {
                if (denominator === void 0) { denominator = 10; }
                // 默认分母是10
                var tbl = [];
                var len = String(num).length;
                for (var i = 0; i < len; i++) {
                    if (num != 0) {
                        var tmp = num % denominator;
                        tbl.push(tmp);
                        num = Math.floor(num / denominator);
                    }
                    else {
                        break;
                    }
                }
                return tbl;
            };
            var num2Str = function (t) {
                var str = "";
                for (var i = t.length - 1; i >= 0; i--) {
                    var v = t[i];
                    if (v != 0) {
                        if (t.length == i + 1 && v == 1 && numUnit3[i] == numTen) {
                            str += numUnit3[i];
                        }
                        else {
                            str += (numCH[v - 1] + numUnit3[i]);
                        }
                    }
                    else {
                        if (i != t.length - 1) {
                            // 多个零只要一个零
                            if (i % 4 == 1) {
                                // 万亿兆需特殊处理
                                str = ajustZero(str);
                                str += (numUnit3[i] + numZero);
                            }
                            else {
                                if (t[i + 1] != 0 && t.length > 2) {
                                    str += numZero;
                                }
                            }
                        }
                    }
                }
                return str;
            };
            var num = parseInt(src);
            if (num != null) {
                if (num < 0) {
                    num = -num;
                }
                var ret = "";
                var tbl = num2Table(num);
                ret = num2Str(tbl);
                return ret;
            }
            return "";
        };
        /**
         * 根据品质和字符串，返回相应颜色的富文本
         */
        Helper.GetLevelColorStr = function (name, quality) {
            var richStr = "<font color=%s><text>%s</text></font>";
            return Helper.StringFormat(richStr, zj.ConstantConfig_Common.Color.quality_level_color[quality - 1], name);
        };
        /**
         * 查询错误码对应的错误描述
         * @param code 错误码
         *
         * @description from db_other.lua
         */
        Helper.GetErrorString = function (code) {
            var itemInfo = zj.TableClientError.Item(code);
            if (code == null) {
                return "error";
            }
            else if (itemInfo == null) {
                return Helper.StringFormat("%s[%d]", zj.TextsConfig.TextsConfig_Common.unknownError, code);
            }
            else if (itemInfo.des_custom != "") {
                return Helper.StringFormat("%s[%d]", itemInfo.des_custom, code);
            }
            else {
                return Helper.StringFormat("%s[%d]", itemInfo.des_default, code);
            }
        };
        Helper.getObjLen = function (obj) {
            var len = 0;
            if (obj == null) {
                return len;
            }
            for (var k in obj) {
                len++;
            }
            return len;
        };
        //商铺折扣
        Helper.MallDiscount = function (per) {
            var discount = per * 100;
            var discount_str = "";
            var discount_tbl = [];
            if (discount % 10 == 0) {
                discount = discount / 10;
            }
            else if (discount % 100 == 0) {
                discount = discount / 100;
            }
            var insert = function () {
                if (discount == 0) {
                    return;
                }
                else {
                    discount_tbl.unshift(Helper.GetNumCH((discount % 10).toString()));
                    discount = (discount - discount % 10) / 10;
                    insert();
                }
            };
            insert();
            for (var k in discount_tbl) {
                var v = discount_tbl[k];
                discount_str = discount_str + v;
            }
            return discount_str;
        };
        //转化为 时：分：秒
        Helper.GetTimeStr = function (secTotal, noHour) {
            var s = secTotal % 60;
            var ss;
            if (s < 10) {
                ss = "0" + s;
            }
            else {
                ss = s;
            }
            var mm;
            var m = Math.floor(secTotal % 3600 / 60);
            if (m < 10) {
                mm = "0" + m;
            }
            else {
                mm = m;
            }
            var hh;
            var h = Math.floor(secTotal % (3600 * 24) / 3600);
            if (h >= 1 && h <= 9) {
                hh = "0" + h;
            }
            else if (h > 9) {
                hh = h;
            }
            else {
                // hh = "0" + "0";
                hh = "";
            }
            if (noHour) {
                return Helper.StringFormat("%2d:%2d", m, s);
            }
            else {
                if (hh) {
                    return Helper.StringFormat("%2d:%2d:%2d", hh, mm, ss);
                }
                return Helper.StringFormat("%2d:%2d", mm, ss);
            }
        };
        Helper.GetTimeStr1 = function (secTotal) {
            var s = Math.floor(secTotal % 60);
            var ss;
            if (s < 10) {
                ss = "0" + s;
            }
            else {
                ss = s;
            }
            var mm;
            var m = Math.floor(secTotal % 3600 / 60);
            if (m < 10) {
                mm = "0" + m;
            }
            else {
                mm = m;
            }
            var hh;
            var h = Math.floor(secTotal % (3600 * 24) / 3600);
            if (h > 1 && h <= 9) {
                hh = "0" + h;
            }
            else if (h > 9) {
                hh = h;
            }
            else {
                hh = "0" + "0";
            }
            return mm + ":" + ss;
        };
        Helper.FormatMsTime = function (ms) {
            var a = Math.floor(ms / 3600);
            var tmp = Math.floor(ms % 3600);
            var b = Math.floor(tmp / 60);
            var c = Math.floor((tmp % 60));
            var hour = a;
            var min = b;
            var s = c;
            if (a != 0 && b != 0 && c == 0)
                return hour + zj.TextsConfig.TextsConfig_Time.hours + min + zj.TextsConfig.TextsConfig_Time.min;
            else if (a != 0 && b == 0 && c == 0)
                return hour + zj.TextsConfig.TextsConfig_Time.hours;
            else if (a == 0 && b == 0 && c != 0)
                return ms + zj.TextsConfig.TextsConfig_Time.sec;
            else if (a == 0 && b != 0 && c != 0)
                return min + zj.TextsConfig.TextsConfig_Time.min + ms + zj.TextsConfig.TextsConfig_Time.sec;
            else if (a == 0 && b != 0 && c == 0)
                return min + zj.TextsConfig.TextsConfig_Time.min;
            return hour + zj.TextsConfig.TextsConfig_Time.hours + min + zj.TextsConfig.TextsConfig_Time.min + ms + zj.TextsConfig.TextsConfig_Time.sec;
        };
        Helper.SetButtonLabel = function (btn, text, size, center) {
            if (size === void 0) { size = 16; }
            if (center === void 0) { center = true; }
            var label = btn.labelDisplay;
            label.width = size * 5;
            label.height = size * 2;
            label.size = size;
            label.fontFamily = "Arial";
            label.text = text;
            if (center) {
                label.textAlign = egret.HorizontalAlign.CENTER;
                label.verticalAlign = egret.VerticalAlign.MIDDLE;
            }
            label.textColor = this.RGBToHex("r:0,g:0,b:0");
        };
        Helper.rnd = function (seed) {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / (233280.0);
        };
        ;
        Helper.Rand = function (number) {
            var today = new Date();
            var seed = today.getTime();
            return Math.ceil(Helper.rnd(seed) * number);
        };
        ;
        Helper.GetRandItem = function (tbl) {
            var total = [];
            var length = Object.keys(tbl).length;
            for (var i = 0; i < length; i++) {
                total.push(tbl[i]);
            }
            var randNum = Helper.Rand(length);
            var rowNum = (randNum % length) + 1;
            return total[rowNum];
        };
        /**
         * 设置升星成功星星。
         *
         * @param node 星星容器
         * @param star 星星个数
         * @param level 被动觉醒技能
         */
        Helper.setUpstarImage = function (node, star, level) {
            node.removeChildren();
            var isSmallStar = function (i) {
                var index = 2; // 2:小星星 1:大星星
                if (star == 3) {
                    index = (i == 1) ? 1 : 2;
                }
                else if (star == 4) {
                    index = (i == 1 || i == 2) ? 1 : 2;
                }
                else if (star == 5) {
                    index = (i == 2) ? 1 : 2;
                }
                else if (star == 6) {
                    index = (i == 2 || i == 3) ? 1 : 2;
                }
                return (index == 2);
            };
            var offSetY = function (i) {
                var offSet = 0;
                if (star == 3) {
                    offSet = (i == 1) ? -15 : 0;
                }
                else if (star == 4) {
                    offSet = (i == 1 || i == 2) ? -15 : 0;
                }
                else if (star == 5) {
                    if (i == 2) {
                        offSet = -15;
                    }
                    else if (i == 1 || i == 3) {
                        offSet = -5;
                    }
                }
                else if (star == 6) {
                    if (i == 2 || i == 3) {
                        offSet = -15;
                    }
                    else if (i == 1 || i == 4) {
                        offSet = -5;
                    }
                }
                return offSet;
            };
            var scaleX = 0.6; // 缩放比例
            var list = [];
            var sumWidth = 0;
            for (var i = 0; i < star; i++) {
                var w = (isSmallStar(i)) ? 60 * scaleX : 70 * scaleX;
                list.push(w);
                sumWidth += w;
            }
            var gap = -6; // 星星间隔
            var beginX = (node.width - sumWidth) * 0.5;
            for (var i = 0; i < star; i++) {
                var index = isSmallStar(i) ? 2 : 1; // 2:小星星 1:大星星
                var w = (index == 2) ? 60 * scaleX : 70 * scaleX;
                var source = "ui_hunter_UpStar" + level.toString() + "_" + index.toString() + "_png";
                var image = new eui.Image(source);
                // image.anchorOffsetX = w * 0.5;
                image.anchorOffsetY = w * 0.5;
                image.scaleX = scaleX;
                image.scaleY = scaleX;
                image.y = offSetY(i);
                image.x = beginX;
                node.addChild(image);
                beginX += (list[i] + gap);
            }
            return node;
        };
        Helper.convertStringWithColor = function (msg, color) {
            if (color == "green") {
                return "<color>r:0,g:220,b:0</color><text>" + msg + "</text>";
            }
            return msg;
        };
        Helper.CreateTalentAttrTbl = function () {
            var result = {};
            for (var k in zj.TableEnum.TableRoleBaseAttribute) {
                var v = zj.TableEnum.TableRoleBaseAttribute[k];
                result[v] = 0;
            }
            return result;
        };
        Helper.getTwoPointsDis = function (pos1, pos2) {
            var px1 = pos1.x;
            var py1 = pos1.y;
            var px2 = pos2.x;
            var py2 = pos2.y;
            var x = px2 - px1;
            var y = py1 - py2;
            var dis = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            return dis;
        };
        Helper.tAnyIn = function (tbl, valTbl) {
            for (var k in valTbl) {
                var v = valTbl[k];
                if (Helper.vIn(tbl, v)) {
                    return true;
                }
            }
            return false;
        };
        Helper.vIn = function (tbl, value) {
            if (tbl == null) {
                return false;
            }
            for (var k in tbl) {
                var v = tbl[k];
                if (v == value) {
                    return true;
                }
            }
            return false;
        };
        Helper.getSkillBaseTypeById = function (id) {
            var tableSkillBase = zj.TableGeneralSkill.Table();
            if (tableSkillBase[id] == null) {
            }
            var eType = tableSkillBase[id].skill_big_type;
            return eType;
        };
        /**根据排名获取竞技场奖励信息 */
        Helper.GetArenaScoreInfo = function (rank) {
            var tableArenaScore = zj.TableLadderScore.Table();
            for (var k in tableArenaScore) {
                if (tableArenaScore.hasOwnProperty(k)) {
                    var v = tableArenaScore[k];
                    if (rank > v.rank_min && rank <= v.rank_max) {
                        return [v, Number(k)];
                    }
                }
            }
            return [null, -1];
        };
        Helper.getBuffRelate = function (level, id) {
            var tableBuff = zj.TableSkillBuff.Table();
            if (tableBuff[id] == null) {
                return null;
            }
            var param = tableBuff[id].hit_rate;
            var baseType = tableBuff[id].base_type;
            var damageType = tableBuff[id].damage_type;
            var hitRate = zj.buff_hit(level, param[0], param[1]);
            return [hitRate, baseType, damageType];
        };
        Helper.getBuffUseType = function (type) {
            var tableBaseBuff = zj.TableClientBuffBase.Table();
            if (tableBaseBuff[type] == null) {
                return null;
            }
            return [tableBaseBuff[type].buff_profit, tableBaseBuff[type].is_fold, tableBaseBuff[type].fold_number];
        };
        Helper.getComboLv = function (curLv, num) {
            var _tag = false;
            var tableCombo = zj.TableClientFightCombo.Table();
            for (var i = curLv + 1; i < Helper.getObjLen(tableCombo); i++) {
                if (num >= tableCombo[i].combo_condition) {
                    _tag = true;
                    return [_tag, i];
                }
            }
            return [_tag, -1];
        };
        Helper.instanceToBriefInfo = function (fightType, instanceId, bossInfo) {
            var brief = new message.RoleBriefInfo;
            var name = "";
            var chapterId = 0;
            var chapterName = "";
            var bossMapRoleID = 1;
            var bossLevel = 1;
            var id = instanceId;
            if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
                var tableInstance = zj.TableInstance.Table();
                name = tableInstance[instanceId].instance_name;
                var mobId = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
                var _a = zj.Game.PlayerInstanceSystem.ChapterIdx(mobId), dstChapterIdx = _a[0], dstMobIdx = _a[1];
                chapterName = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Replay.Title.instance_normal, dstChapterIdx, Number(dstMobIdx) + 1);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
                var tableInstance = zj.TableInstance.Table();
                name = tableInstance[instanceId].instance_name;
                var mobId = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
                var _b = zj.Game.PlayerInstanceSystem.ChapterIdx(mobId), dstChapterIdx = _b[0], dstMobIdx = _b[1];
                chapterName = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Replay.Title.instance_elite, dstChapterIdx, dstMobIdx);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
                var temp = instanceId;
                name = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Replay.Title.tower_content, temp);
                chapterName = zj.TextsConfig.TextsConfig_Replay.Title.tower_title;
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
                var temp = instanceId;
                name = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Replay.Title.tower_content, temp % 1000);
                chapterName = zj.TextsConfig.TextsConfig_Replay.Title.tower_title;
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                name = Lang.Des(bossInfo.monster_name);
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
                var _tmp = zj.Game.PlayerLeagueSystem.Instances[zj.Game.PlayerLeagueSystem.leagueInstance.curInstanceId - 1].instance_id;
                var _tmp_c = zj.TableLeagueInstance.Item(_tmp).instance_name;
                chapterName = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Replay.Title.league_instance, _tmp_c);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_WANTED || fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_GAOJI_WANTED) {
                name = Lang.Des(bossInfo.monster_name);
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
                //流星街%s第%s关
                var _index = zj.Game.PlayerMissionSystem.fightExt;
                var _cell = zj.Game.PlayerWantedSystem.wantedCurPos % 100;
                chapterName = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Replay.Title.tower_content, zj.TextsConfig.TextsConfig_Comment.wanted_type[_index + 1] + "·" + _cell);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                name = Lang.Des(bossInfo.monster_name);
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
                name = Lang.Des(bossInfo.monster_name);
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
                name = Lang.Des(bossInfo.monster_name);
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                bossMapRoleID = bossInfo.monster_roleId;
                bossLevel = bossInfo.monster_level;
                var temp = instanceId;
                name = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Replay.Title.license_content, temp);
                chapterName = zj.TextsConfig.TextsConfig_Replay.Title.license_title;
            }
            brief.id = id;
            brief.name = name || " ";
            brief.level = bossLevel || 1;
            brief.picId = bossMapRoleID || 1;
            brief.picFrameId = 0;
            brief.leagueId = chapterId || 0;
            brief.leagueName = chapterName || " ";
            return brief;
        };
        //异步技能数据加载
        Helper.cacheSkillSpineId = function (type, enemys) {
            zj.Gmgr.Instance.relatedAsynDataId = [];
            var forArr = zj.Game.PlayerFormationSystem.curFormations;
            var formation = {};
            if (type == message.EFormationType.FORMATION_TYPE_WANTED) {
                formation = zj.Game.PlayerFormationSystem.formatsWant[zj.Game.PlayerMissionSystem.fightExt];
            }
            else if (type == message.EFormationType.FORMATION_TYPE_RELIC) {
                formation = zj.Game.PlayerFormationSystem.formatsRelic[zj.Game.PlayerMissionSystem.fightExt];
            }
            else {
                formation = forArr[type - 1];
            }
            var suffixs = ["generals", "reserves", "supports"];
            for (var i = 0; i < suffixs.length; i++) {
                var ids = formation[suffixs[i]];
                for (var j = 0; j < ids.length; j++) {
                    if (ids[j] > 0) {
                        var gelInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[ids[j]];
                        if (gelInfo != null) {
                            for (var x = 0; x < gelInfo.skills.length; x++) {
                                zj.Gmgr.Instance.relatedAsynDataId.push(gelInfo.skills[x].skillId);
                            }
                        }
                    }
                }
            }
            for (var k in enemys) {
                var v = enemys[k];
                var info = zj.Game.PlayerMobSystem.Instance(v.id);
                zj.Gmgr.Instance.relatedAsynDataId.push(info.skill_ids);
            }
        };
        Helper.getSpeedMaxIndex = function (level) {
            var index = 0;
            for (var i = 0; i < zj.ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT.length; i++) {
                if (level >= zj.ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT[i] || zj.PlayerVIPSystem.LowLevel().level >= zj.ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT_VIP[i]) {
                    index = i;
                }
            }
            return index + 1;
        };
        //判断屏幕坐标(GL坐标系，左下角为(0, 0))(x, y)是否在节点的rect中
        Helper.bInNodeRect = function (node, x, y) {
            var sizeNode = node;
            var trans = node.globalToLocal(x, y);
            // trans.x += Game.UIManager.x;
            if (trans.x >= 0 && trans.x <= sizeNode.width && trans.y >= 0 && trans.y <= sizeNode.height) {
                return true;
            }
            else {
                return false;
            }
        };
        //返回node绝对坐标
        Helper.GetWolrdPoint = function (node, _point) {
            var point = node.localToGlobal(0, 0, _point);
            point.x -= zj.Game.UIManager.x;
            return point;
            // return new egret.Point(point.x + width / 2, point.y + height / 2);
        };
        //获得首杀物品
        Helper.getFirstBloodGoods = function (goods, fightType) {
            2;
            var tbl = [];
            for (var i = 0; i < goods.length; i++) {
                if (goods[i].goodsId == message.EResourceType.RESOURCE_ROLE_EXP && goods[i].count == 0) {
                    continue;
                }
                if (goods[i].goodsId == message.EResourceType.RESOURCE_MONEY && goods[i].count == 0) {
                    continue;
                }
                if (goods[i].index != 2) {
                    continue;
                }
                tbl.push(goods[i]);
            }
            return tbl;
        };
        //隐藏掉铜钱为0的
        Helper.hideSpecialGoods = function (goods) {
            var tbl = [];
            for (var i = 0; i < goods.length; i++) {
                if (goods[i].goodsId == message.EResourceType.RESOURCE_ROLE_EXP && goods[i].count == 0) {
                    continue;
                }
                if (goods[i].goodsId == message.EResourceType.RESOURCE_MONEY && goods[i].count == 0) {
                    continue;
                }
                tbl.push(goods[i]);
            }
            return tbl;
        };
        //获得翻牌子物品
        Helper.getTurnGoods = function (goods, fightType) {
            var tbl = [];
            var extraTbl = [];
            for (var i = 0; i < goods.length; i++) {
                if (goods[i].goodsId == message.EResourceType.RESOURCE_ROLE_EXP && goods[i].count == 0) {
                    continue;
                }
                if (goods[i].goodsId == message.EResourceType.RESOURCE_MONEY && goods[i].count == 0) {
                    continue;
                }
                if (goods[i].index == 1 && zj.Game.PlayerInstanceSystem.curInstanceType != message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                    tbl.push(goods[i]);
                }
                if (goods[i].index == 3 && zj.Game.PlayerInstanceSystem.curInstanceType != message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                    extraTbl.push(goods[i]);
                }
            }
            return [tbl, extraTbl];
        };
        Helper.getBattleStar = function (after, before) {
            var num = after;
            if (num == before) {
                num = message.EBattleStar.BATTLE_STAR_3;
            }
            if (num >= message.EBattleStar.BATTLE_STAR_3) {
                num = message.EBattleStar.BATTLE_STAR_3;
            }
            if (num <= message.EBattleStar.BATTLE_STAR_NONO) {
                num = message.EBattleStar.BATTLE_STAR_1;
            }
            return num;
        };
        // 战斗数据(类型为16\22\23数据格式为MultiResultInfo否则为ReplayBattleInfo)
        Helper.createBattleResultInfo = function (battleType, battleResult, battleStar, battleTime, totalDamage, maxCombo, msg) {
            for (var i = 0; i < msg.leftReplayInfo.generals.length; i++) {
                msg.leftReplayInfo.generals[i].pos = msg.leftReplayInfo.generals[i].pos + 1;
            }
            for (var i = 0; i < msg.rightReplayInfo.generals.length; i++) {
                msg.rightReplayInfo.generals[i].pos = parseInt(msg.rightReplayInfo.generals[i].pos) + 1;
            }
            var encoder2 = new aone.BinaryEncoder(); //序列化数据
            msg.to_bytes(encoder2);
            var inflate = new Zlib.Deflate(new Uint8Array(encoder2.buffer, 0, encoder2.length));
            var plain = inflate.compress();
            // rightReplayInfo
            var plainArr = [];
            var length = encoder2.length;
            plainArr.push(length & 0xff);
            plainArr.push((length >> 8) & 0xff);
            plainArr.push((length >> 16) & 0xff);
            plainArr.push((length >> 24) & 0xff);
            for (var i = 0; i < plain.length; i++) {
                plainArr.push(plain[i]);
            }
            var info = new message.BattleResultInfo;
            info.is_check = zj.Device.isBattleValidate;
            info.battleId = "0";
            info.battleType = battleType;
            info.battleResult = battleResult;
            info.battleStar = battleStar;
            info.battleTime = battleTime / 2;
            info.totalDamage = totalDamage;
            info.maxCombo = maxCombo;
            info.battleData = plainArr;
            return info;
        };
        Helper.createPvpBattleResultInfo = function (msg) {
            var encoder2 = new aone.BinaryEncoder(); //序列化数据
            msg.to_bytes(encoder2);
            var inflate = new Zlib.Deflate(new Uint8Array(encoder2.buffer, 0, encoder2.length));
            var plain = inflate.compress();
            var plainArr = [];
            var length = encoder2.length;
            plainArr.push(length & 0xff);
            plainArr.push((length >> 8) & 0xff);
            plainArr.push((length >> 16) & 0xff);
            plainArr.push((length >> 24) & 0xff);
            for (var i = 0; i < plain.length; i++) {
                plainArr.push(plain[i]);
            }
            return plainArr;
        };
        Helper.createMutiBattleResultInfo = function (battleType, battleResult, battleStar, battleTime, totalDamage, maxCombo, msg) {
            var info = new message.BattleResultInfo();
            var encoder2 = new aone.BinaryEncoder(); //序列化数据
            msg.to_bytes(encoder2);
            var inflate = new Zlib.Deflate(new Uint8Array(encoder2.buffer, 0, encoder2.length));
            var plain = inflate.compress();
            var plainArr = [];
            var length = encoder2.length;
            plainArr.push(length & 0xff);
            plainArr.push((length >> 8) & 0xff);
            plainArr.push((length >> 16) & 0xff);
            plainArr.push((length >> 24) & 0xff);
            for (var i = 0; i < plain.length; i++) {
                plainArr.push(plain[i]);
            }
            info.is_check = zj.Device.isBattleValidate;
            info.battleId = "0";
            info.battleType = battleType;
            info.battleResult = battleResult;
            info.battleStar = battleStar;
            if (zj.ConstantConfig_RoleBattle.DEFAULTFPS == 60) {
                info.battleTime = battleTime / 2;
            }
            else {
                info.battleTime = battleTime;
            }
            info.totalDamage = totalDamage;
            info.maxCombo = maxCombo;
            info.battleData = plainArr;
            return info;
        };
        Helper.getGenerlBeforeTotalExp = function (level, step) {
            var tableLevel = zj.TableLevel.Table();
            var total = 0;
            for (var i = 0; i < level - 1; i++) {
                total = total + tableLevel[i + 1].general_exp[step - 1];
            }
            return total;
        };
        Helper.getInstanceDetailName = function (fightType, rightBrief) {
            var str = "";
            if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Replay.Title.pve_normal_title, rightBrief.leagueName);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                var a = rightBrief.leagueName.slice(rightBrief.leagueName, Object.keys(rightBrief.leagueName).length - 1) + (Number(rightBrief.leagueName[Object.keys(rightBrief.leagueName).length - 1]) + 1);
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Replay.Title.pve_elite_title, a);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Replay.Title.pve_tower_title, rightBrief.name);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Replay.Title.pve_hightower_title, rightBrief.name);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Replay.Title.pve_wanted_title, rightBrief.leagueName);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Replay.Title.pve_leagueMon_title, rightBrief.leagueName);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Replay.Title.pve_leagueBoss_title, rightBrief.name);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Replay.Title.pvp_arena_title, rightBrief.name);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Replay.Title.pvp_license_title, rightBrief.leagueName);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Replay.Title.pve_zorkboss_title, rightBrief.name);
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                str = rightBrief;
            }
            else if (fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY) {
                str = zj.TableActivityBattleInstance.Item(zj.PlayerActivitySystem.activityBattleCurPos).name;
            }
            return str;
        };
        Helper.integrateAttri = function (tbl) {
            var result = Helper.CreateGeneralAttrTbl0();
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX - 1; i++) {
                if (i != zj.TableEnum.EnumGelAttrib.ATTR_ATK_ALL && i != zj.TableEnum.EnumGelAttrib.ATTR_DEF_ALL && i != zj.TableEnum.EnumGelAttrib.ATTR_CRIT_ALL && i != zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL) {
                    var tmp = [i];
                    if (i == zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK) {
                        tmp.push(zj.TableEnum.EnumGelAttrib.ATTR_ATK_ALL);
                    }
                    else if (i == zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF) {
                        tmp.push(zj.TableEnum.EnumGelAttrib.ATTR_DEF_ALL);
                    }
                    else if (i == zj.TableEnum.EnumGelAttrib.ATTR_PHY_CRIT || i == zj.TableEnum.EnumGelAttrib.ATTR_SKILL_CRIT) {
                        tmp.push(zj.TableEnum.EnumGelAttrib.ATTR_CRIT_ALL);
                    }
                    else if (i == zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF || i == zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_MAGICDEF) {
                        tmp.push(zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL);
                    }
                    for (var j = 0; j < tmp.length; j++) {
                        result[i] = result[i] + tbl[tmp[j + 1]];
                    }
                }
            }
            return result;
        };
        Helper.integrateAttri0 = function (tbl) {
            tbl.unshift(0);
            var result = Helper.CreateGeneralAttrTbl0();
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                if (i != zj.TableEnum.EnumGelAttrib.ATTR_ATK_ALL && i != zj.TableEnum.EnumGelAttrib.ATTR_DEF_ALL && i != zj.TableEnum.EnumGelAttrib.ATTR_CRIT_ALL && i != zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL) {
                    var tmp = [i];
                    if (i == zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK) {
                        tmp.push(zj.TableEnum.EnumGelAttrib.ATTR_ATK_ALL);
                    }
                    else if (i == zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF) {
                        tmp.push(zj.TableEnum.EnumGelAttrib.ATTR_DEF_ALL);
                    }
                    else if (i == zj.TableEnum.EnumGelAttrib.ATTR_PHY_CRIT || i == zj.TableEnum.EnumGelAttrib.ATTR_SKILL_CRIT) {
                        tmp.push(zj.TableEnum.EnumGelAttrib.ATTR_CRIT_ALL);
                    }
                    else if (i == zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF || i == zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_MAGICDEF) {
                        tmp.push(zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL);
                    }
                    for (var j = 0; j < tmp.length; j++) {
                        result[i] = result[i] + tbl[tmp[j]];
                    }
                }
            }
            return result;
        };
        //根据物品id获得物品数量
        Helper.getGoodsCountFrTbl = function (tbl, id) {
            var count = 0;
            for (var i = 0; i < tbl.length; i++) {
                if (tbl[i].goodsId == id) {
                    count = tbl[i].count;
                }
            }
            return count;
        };
        Helper.LocalGeneralIdTranToGelSimpleInfo = function (id) {
            var generalInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[id];
            var msg = new message.GeneralSimpleInfo();
            if (generalInfo == null) {
                return msg;
            }
            msg.general_id = generalInfo.general_id;
            msg.level = generalInfo.level;
            msg.star = generalInfo.star;
            msg.step = generalInfo.step;
            msg.fashionId = generalInfo.fashionId;
            msg.battleValue = generalInfo.battleValue;
            return msg;
        };
        Helper.DetailGeneralTranToGelSimpleInfo = function (generalInfo) {
            var msg = new message.GeneralSimpleInfo();
            if (generalInfo == null) {
                return msg;
            }
            msg.general_id = generalInfo.general_id;
            msg.level = generalInfo.level;
            msg.star = generalInfo.star;
            msg.step = generalInfo.step;
            msg.fashionId = generalInfo.fashionId;
            msg.battleValue = generalInfo.battleValue;
            return msg;
        };
        Helper.CacheTeachSkillSpineId = function () {
            zj.Gmgr.Instance.relatedAsynDataId = [];
            for (var k in zj.teachBattle.teachLeftGeneral) {
                var v = zj.teachBattle.teachLeftGeneral[k];
                var instance = zj.TableClientMonsterLocal.Item(v.id);
                for (var i = 0; i < instance.skill_ids.length; i++) {
                    zj.Gmgr.Instance.relatedAsynDataId.push(instance.skill_ids[i]);
                }
            }
            for (var k in zj.teachBattle.teachLeftSupport) {
                var v = zj.teachBattle.teachLeftSupport[k];
                var instance = zj.TableClientMonsterLocal.Item(v.id);
                for (var i = 0; i < instance.skill_ids.length; i++) {
                    zj.Gmgr.Instance.relatedAsynDataId.push(instance.skill_ids[i]);
                }
            }
            for (var k in zj.teachBattle.teachRightGeneral) {
                var v = zj.teachBattle.teachRightGeneral[k];
                var instance = zj.TableClientMonsterLocal.Item(v.id);
                for (var i = 0; i < instance.skill_ids.length; i++) {
                    zj.Gmgr.Instance.relatedAsynDataId.push(instance.skill_ids[i]);
                }
            }
        };
        Helper.sortBattleInfoByDamage = function (Left, right) {
            var sortByDamage = function (a, b) {
                return a.totalDamage + a.recoverValue > b.totalDamage + b.recoverValue;
            };
            Left.sort(sortByDamage);
            right.sort(sortByDamage);
        };
        Helper.GetMvp = function (t) {
            var totalValue = 0;
            var index = 0;
            var maxValue = 0;
            for (var i = 0; i < zj.Game.PlayerMissionSystem.tableLength(t); i++) {
                var hurt = t[i].totalDamage;
                var recover = t[i].recoverValue;
                var max = Math.max(hurt, recover);
                if (hurt + recover > totalValue) {
                    totalValue = hurt + recover;
                    index = i;
                }
                if (max > maxValue) {
                    maxValue = max;
                }
            }
            //最大干将索引，速度判断最大值
            return [index, maxValue];
        };
        Helper.GetTMStrForActivity = function (secTotal) {
            var time;
            if (secTotal == null || secTotal == undefined) {
                time = zj.Game.Controller.serverNow();
            }
            else {
                time = new Date(secTotal * 1000);
            }
            return Helper.StringFormat("%d-%s-%s %s:%s", time.getFullYear(), time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1).toString() : (time.getMonth() + 1).toString(), time.getDate() < 10 ? "0" + time.getDate().toString() : time.getDate().toString(), time.getHours() < 10 ? "0" + time.getHours().toString() : time.getHours().toString(), time.getMinutes() < 10 ? "0" + time.getMinutes().toString() : time.getMinutes().toString());
        };
        /**特效音乐id */
        Helper.EftByID = function (id) {
            var sound = zj.TableClientSoundResource.Item(id);
            if (sound) {
                var arr = sound.sound_path.split("/");
                zj.Game.SoundManager.playEffect(arr[arr.length - 1].replace(".", "_"));
            }
        };
        /**背景音乐id */
        Helper.PlaybgmByID = function (id, loops) {
            var sound = zj.TableClientBgmResource.Item(id);
            var arr = sound.sound_path.split("/");
            zj.Game.SoundManager.playMusic(arr[arr.length - 1].replace(".", "_"), loops);
        };
        /**特效音乐路径名字 */
        Helper.PlayEff = function (name, maxWaitMs) {
            var arr = name.split("/");
            zj.Game.SoundManager.playEffect(arr[arr.length - 1].replace(".", "_"), maxWaitMs);
        };
        //中文时间
        Helper.FormatDaysTimeChs = function (ms) {
            var a = Math.floor(ms / 3600);
            var tmp = Math.floor(ms % 3600);
            var b = Math.floor(tmp / 60);
            var c = Math.floor(tmp % 60);
            var hour = a;
            var min = b;
            var sec = c;
            if (b != 0 && c == 0) {
                return hour + zj.TextsConfig.TextsConfig_Time.hours + min + zj.TextsConfig.TextsConfig_Time.min;
            }
            else if (b == 0 && c == 0) {
                return hour + zj.TextsConfig.TextsConfig_Time.hours;
            }
            return hour + zj.TextsConfig.TextsConfig_Time.hours + min + zj.TextsConfig.TextsConfig_Time.min + sec + zj.TextsConfig.TextsConfig_Time.sec;
        };
        Helper.FormatDaysTimeCh = function (ms) {
            var a = Math.floor(ms / 24 / 3600);
            var tmp = Math.floor(ms % (3600 * 24));
            var b = Math.floor(tmp / 3600);
            var c = Math.floor((tmp % 3600) / 60);
            var day = a;
            var hour = b;
            var min = c;
            if (a == 0 && b != 0 && c != 0) {
                return hour + zj.TextsConfig.TextsConfig_Time.hour + min + zj.TextsConfig.TextsConfig_Time.min;
            }
            else if (a == 0 && b == 0) {
                return min + zj.TextsConfig.TextsConfig_Time.min;
            }
            else if (a != 0 && b == 0 && c == 0) {
                return day + zj.TextsConfig.TextsConfig_Time.day;
            }
            else if (a == 0 && b != 0 && c == 0) {
                return hour + zj.TextsConfig.TextsConfig_Time.hour;
            }
            return day + zj.TextsConfig.TextsConfig_Time.day + hour + zj.TextsConfig.TextsConfig_Time.hour + min + zj.TextsConfig.TextsConfig_Time.min;
        };
        Helper.MissionProgress = function (tableCur, type) {
            var ret = 0;
            for (var i in tableCur) {
                if (tableCur.hasOwnProperty(i)) {
                    var v = tableCur[i];
                    if (Math.floor(v / 10000) == type) {
                        ret = v % 10000;
                    }
                }
            }
            return ret;
        };
        Helper.isPointInCircle = function (point, center, r) {
            var tag = false;
            var px1 = point.x;
            var py1 = point.y;
            var px2 = center.x;
            var py2 = center.y;
            var x = px1 - px2;
            var y = py1 - py2;
            var xie = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            if (xie <= r) {
                tag = true;
            }
            return tag;
        };
        Helper.findNearCrossBlock = function (beginPoint, endPoint, blocks, blockWidth) {
            var _a = [0, 0], b_i = _a[0], b_j = _a[1];
            var b_actorWNum = beginPoint.x / blockWidth;
            var b_actorHNum = beginPoint.y / blockWidth;
            var wNum = Math.floor(b_actorWNum);
            var hNum = Math.floor(b_actorHNum);
            if (b_actorWNum == wNum) {
                b_i = wNum;
            }
            else {
                b_i = wNum;
            }
            if (b_actorHNum == hNum) {
                b_j = hNum;
            }
            else {
                b_j = hNum;
            }
            var _b = [0, 0], e_i = _b[0], e_j = _b[1];
            var e_actorWNum = endPoint.x / blockWidth;
            var e_actorHNum = endPoint.y / blockWidth;
            wNum = Math.floor(e_actorWNum);
            hNum = Math.floor(e_actorHNum);
            if (e_actorWNum == wNum) {
                e_i = wNum;
            }
            else {
                e_i = wNum;
            }
            if (e_actorHNum == hNum) {
                e_j = hNum;
            }
            else {
                e_j = hNum;
            }
            var tmp = [];
            for (var i = e_i - 1; i <= e_i + 1; i++) {
                for (var j = e_j - 1; j <= e_j + 1; j++) {
                    var key = Helper.StringFormat("%d_%d", i, j);
                    if (blocks[key] == null) {
                        continue;
                    }
                    if (blocks[key].couldCross == false) {
                        continue;
                    }
                    var info = { key: key, value: Math.abs(i - b_i) + Math.abs(j - b_j) };
                    tmp.push(info);
                }
            }
            if (tmp.length != 0) {
                tmp.sort(function (a, b) {
                    return a.value - b.value;
                });
                return tmp[0].key;
            }
            else {
                var _c = [0, 0], new_i = _c[0], new_j = _c[1];
                if (Math.abs(e_i - b_i) < 2) {
                    new_i = e_i;
                }
                else if (e_i > b_i) {
                    new_i = e_i - 1;
                }
                else if (e_i < b_i) {
                    new_i = e_i + 1;
                }
                if (Math.abs(e_j - b_j) < 2) {
                    new_j = e_j;
                }
                else if (e_j > b_j) {
                    new_j = e_j - 1;
                }
                else if (e_j < b_j) {
                    new_j = e_j + 1;
                }
                var newPoint = new egret.Point(new_i * blockWidth, new_j * blockWidth);
                return Helper.findNearCrossBlock(beginPoint, newPoint, blocks, blockWidth);
            }
        };
        Helper.activityTime = function (open, close) {
            var curTime = zj.Game.Controller.serverNow();
            var curServerTime = Date.parse(curTime.toString()) / 1000;
            var start = open - curServerTime;
            var stop = close - curServerTime;
            var _a = [null, null], str = _a[0], color = _a[1];
            if (start > 0) {
                color = zj.ConstantConfig_Common.Color.red;
            }
            else {
                color = zj.ConstantConfig_Common.Color.green;
            }
            if (3600 * 24 < start) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.openDay, Math.floor(start / 3600 / 24));
            }
            else if (3600 < start && start <= 3600 * 24) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.openHour, Math.floor(start / 3600));
            }
            else if (60 < start && start <= 3600) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.openMin, Math.floor(start / 60));
            }
            else if (0 < start && start <= 60) {
                str = zj.TextsConfig.TextsConfig_Time.openNow;
            }
            else if (3600 * 24 < stop) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.closeDay, Math.floor(stop / 3600 / 24));
            }
            else if (3600 < stop && stop <= 3600 * 24) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.closeHour, Math.floor(stop / 3600));
            }
            else if (0 < stop && stop <= 3600) {
                str = Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.closeMin, Math.floor(stop / 60));
            }
            else if (0 < stop && stop <= 60) {
                str = zj.TextsConfig.TextsConfig_Time.closeNow;
            }
            else if (start < 0 && stop <= 0) {
                str = zj.TextsConfig.TextsConfig_Time.closed;
            }
            return [str, color];
        };
        Helper.getWantedBattleStar = function (after, before) {
            var dif = before - after;
            var num = message.EBattleStar.BATTLE_STAR_1;
            if (dif == 0) {
                num = message.EBattleStar.BATTLE_STAR_3;
            }
            else if (dif == 1) {
                num = message.EBattleStar.BATTLE_STAR_2;
            }
            else if (dif >= 2) {
                num = message.EBattleStar.BATTLE_STAR_1;
            }
            return num;
        };
        /**获取建号第几天 四点刷新 四点之前算前一天*/
        Helper.day = function () {
            return Helper.getDayIdx(zj.Game.PlayerInfoSystem.BaseInfo.createTime * 1000, zj.Game.Controller.curServerTime * 1000);
        };
        /**
         * 获取注册账号时间到服务器当前时间的天数(凌晨4点刷新)
         * @param timeCreate {number} 注册账号时间
         * @param timeCurr {number} 服务器当前时间
         * @returns 返回当前时间与创建时间天数的差值{number}
         */
        Helper.getDayIdx = function (timeCreate, timeCurr) {
            var day1 = 86400000; // 1天时间的毫秒数
            var date = new Date(timeCreate - day1); // 创建时间前24小时的时间戳
            // 设置时间为凌晨4点
            date.setHours(4);
            date.setMinutes(0);
            date.setSeconds(0);
            // 获取凌晨4点的毫秒值
            var time = date.getTime();
            // 创建时间离凌晨4点的天数
            var createIdx = Math.floor((timeCreate - time) / day1);
            // 当前时间离凌晨4点的天数
            var currIdx = Math.floor((timeCurr - time) / day1);
            // 返回当前时间与创建时间天数的差值
            return currIdx - createIdx + 1;
        };
        return Helper;
    }());
    zj.Helper = Helper;
    __reflect(Helper.prototype, "zj.Helper");
    var Table = (function () {
        function Table() {
        }
        Table.Count = function (t, f) {
            var count = 0;
            for (var k in t) {
                if (t.hasOwnProperty(k)) {
                    var v = t[k];
                    count += f(k, v);
                }
            }
            return count;
        };
        /**
         * 函数求和
         * @param a 起始索引
         * @param b 终止索引
         * @param f 函数
         */
        Table.Add = function (a, b, f) {
            // if (a >= b) return 0;
            var count = 0;
            for (var i = a; i < b; i++) {
                count += f(i);
            }
            return count;
        };
        /**
         * 遍历数组查找对应的值
         * @param t 待遍历的数组
         * @param f 比较函数
         *
         * @returns 元祖 [对应的值， 该值对应的索引]
         */
        Table.FindR = function (t, f) {
            for (var i = 0; i < t.length; i++) {
                if (f(i, t[i])) {
                    return [t[i], i];
                }
            }
            return [null, null];
        };
        Table.FindZ = function (t, max) {
            var index = 0;
            for (var k in t) {
                var v = t[k];
                if (max < v) {
                    index = Number(k);
                    break;
                }
                else {
                    index = Number(k) + 1;
                }
            }
            return index;
        };
        Table.FindRcall = function (t, f, thisObj) {
            for (var i = 0; i < t.length; i++) {
                if (f.call(thisObj, i, t[i])) {
                    return [t[i], i];
                }
            }
            return [null, null];
        };
        Table.ObjFindRcall = function (t, f, thisObj) {
            for (var i in t) {
                if (f.call(thisObj, i, t[i])) {
                    return [t[i], parseInt(i)];
                }
            }
            return [null, null];
        };
        Table.FindF = function (t, f) {
            for (var k in t) {
                if (t.hasOwnProperty(k)) {
                    var v = t[k];
                    if (f(k, v) == true) {
                        return true;
                    }
                }
            }
            return false;
        };
        Table.FindFCall = function (t, f, thisObj) {
            for (var k in t) {
                if (t.hasOwnProperty(k)) {
                    var v = t[k];
                    if (f.call(thisObj, k, v) == true) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * 查找数组对应的元素的下标
         * -1 未找到
        */
        Table.FindK = function (t, v) {
            return t.indexOf(v);
        };
        Table.FindV = function (t, v) {
            for (var _k in t) {
                if (t.hasOwnProperty(_k)) {
                    var _v = t[_k];
                    if (_k == v) {
                        return _v;
                    }
                }
            }
            return null;
        };
        Table.VIn = function (t, value) {
            if (t == null) {
                return false;
            }
            for (var key in t) {
                if (t.hasOwnProperty(key)) {
                    if (t[key] == value) {
                        return true;
                    }
                }
            }
            return false;
        };
        Table.Findev = function (t, val) {
            for (var _k in t) {
                var _v = t[_k];
                if (Table.FindK(_v, val) != -1) {
                    return _k;
                }
            }
            return -1;
        };
        /**
         * 深拷贝
         * @param data 对于非引用值类型的数值，直接赋值，而对于引用值类型（object）遍历，递归赋值。
         */
        Table.DeepCopy = function (data) {
            var t = Table._type(data), o, i, ni;
            if (t === 'array') {
                o = [];
            }
            else if (t === 'object') {
                o = {};
            }
            else {
                return data;
            }
            if (t === 'array') {
                for (i = 0, ni = data.length; i < ni; i++) {
                    o.push(Table.DeepCopy(data[i]));
                }
                return o;
            }
            else if (t === 'object') {
                for (i in data) {
                    o[i] = Table.DeepCopy(data[i]);
                }
                return o;
            }
        };
        Table._type = function (obj) {
            var toString = Object.prototype.toString;
            var map = {
                '[object Boolean]': 'boolean',
                '[object Number]': 'number',
                '[object String]': 'string',
                '[object Function]': 'function',
                '[object Array]': 'array',
                '[object Date]': 'date',
                '[object RegExp]': 'regExp',
                '[object Undefined]': 'undefined',
                '[object Null]': 'null',
                '[object Object]': 'object'
            };
            return map[toString.call(obj)];
        };
        Table.Init = function (c, f) {
            var ret = [];
            for (var i = 0; i < c; i++) {
                ret.push(f(i));
            }
            return ret;
        };
        Table.initi = function (t, f) {
            var ret = [];
            for (var k in t) {
                if (t.hasOwnProperty(k)) {
                    var v = t[k];
                    var value = f(k, v);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            return ret;
        };
        Table.alltrue = function (t, f) {
            var count1 = Table.countture(t, f);
            var count2 = Table.length1(t);
            return count1 == count2;
        };
        Table.countture = function (t, f) {
            var count = 0;
            for (var k in t) {
                if (t.hasOwnProperty(k)) {
                    var v = t[k];
                    count = count + (f(k, v) && 1 || 0);
                }
            }
            return count;
        };
        Table.length1 = function (t) {
            var count = 0;
            for (var k in t) {
                if (t.hasOwnProperty(k)) {
                    var v = t[k];
                    count = count + 1;
                }
            }
            return count;
        };
        Table.copy = function (src) {
            if (src == null) {
                return null;
            }
            var dst = [];
            for (var k in src) {
                if (src.hasOwnProperty(k)) {
                    var v = src[k];
                    dst[k] = v;
                }
            }
            return dst;
        };
        /**
         *初始化数组
         *
         * @static
         * @param {Array<any>} t 需要遍历的数组
         * @param {(a:number , b:any) =>number} f 遍历的方法
         * @returns 被初始化的数组
         * @memberof Table
         */
        Table.InitF = function (t, f) {
            var result = [];
            for (var i = 0; i < t.length; i++) {
                var v = t[i];
                result[i] = f(i, v);
                this;
            }
            return result;
        };
        Table.LengthDisorder = function (t) {
            var len = 0;
            for (var k in t) {
                if (t.hasOwnProperty(k)) {
                    len += 1;
                }
            }
            return len;
        };
        Table.Sort = function (a, b) {
            if (a.value1 == b.value1) {
                if (a.value2 == b.value2) {
                    return a.key < b.key;
                }
                else {
                    return a.value2 > b.value2;
                }
            }
            else {
                return a.value1 > b.value1;
            }
        };
        Table.tableLength = function (t) {
            var count = 0;
            for (var k in t) {
                if (t.hasOwnProperty(k)) {
                    count += 1;
                }
            }
            return count;
        };
        return Table;
    }());
    zj.Table = Table;
    __reflect(Table.prototype, "zj.Table");
    var Set = (function () {
        function Set() {
        }
        Set.NumberUnit2 = function (number) {
            if (number < 100000) {
                return Helper.StringFormat("%d", number);
            }
            else {
                return Helper.StringFormat("%d%s", number / 10000, zj.TextsConfig.TextsConfig_Common.wan);
            }
        };
        Set.NumberUnit3 = function (n) {
            if (n < 100000) {
                if (n == 0) {
                    return String(0);
                }
                else {
                    return String(n);
                }
            }
            else if (n >= 100000 && n < 1000000000) {
                if (n % 10000 == 0) {
                    return Helper.StringFormat("%s%s", String(n / 10000), zj.TextsConfig.TextsConfig_Common.wan);
                }
                return Helper.StringFormat("%s%s", (n / 10000).toFixed(1), zj.TextsConfig.TextsConfig_Common.wan);
            }
            else if (n >= 1000000000) {
                if (n % 100000000 == 0) {
                    return Helper.StringFormat("%s%s", String(n / 100000000), zj.TextsConfig.TextsConfig_Common.yi);
                }
                return Helper.StringFormat("%s%s", (n / 100000000).toFixed(1), zj.TextsConfig.TextsConfig_Common.yi);
            }
        };
        Set.numberUnitBattleValue = function (number) {
            if (number < 1000000) {
                return Helper.StringFormat("%d", number);
            }
            else if (1000000 <= number) {
                return Helper.StringFormat("%s%s", Math.floor(number / 10000), zj.TextsConfig.TextsConfig_Common.wan);
            }
        };
        Set.NumberUnit4 = function (number) {
            if (number < 100000) {
                return Helper.StringFormat("%d", number);
            }
            else if (100000 <= number) {
                return Helper.StringFormat("%s%s", (number / 10000).toFixed(2), zj.TextsConfig.TextsConfig_Common.wan);
            }
        };
        Set.timeLeaveSec = function (second) {
            var hours = Math.floor(second % (3600 * 24) / 3600);
            var minutes = Math.floor(second % 3600 / 60);
            var seconds = second % 60;
            var str = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
            return str;
        };
        /**
         * 设置按钮背景图片
         * @param btn 按钮
         * @param normalPath 正常显示图片
         * @param highLightPath 高亮图片
         * @param disablePath 按钮失效显示图片
         */
        Set.ButtonBackgroud = function (btn, normalPath, highLightPath, disablePath) {
            if (btn != null && normalPath != null) {
                // 正常
                btn.getChildAt(0).source = normalPath;
                // 按下 
                if (highLightPath != null) {
                    var property = btn.skin.states[1].overrides[0];
                    if (property != null && property.name == "source") {
                        property.value = highLightPath;
                    }
                }
                // 禁用
                if (disablePath != null) {
                    var property = btn.skin.states[2].overrides[0];
                    if (property != null && property.name == "source") {
                        property.value = disablePath;
                    }
                }
            }
        };
        /**
         * 设置label数量足够时绿色,不足时红色
         * @param label label
         * @param number 当前
         * @param enough
         */
        Set.LabelNumberGreenAndRed = function (label, number, enough) {
            label.textColor = (number < enough) ? zj.ConstantConfig_Common.Color.red : zj.ConstantConfig_Common.Color.green;
        };
        Set.getNodeRect = function (node) {
            var rect = { left: 10000, right: 0, top: 10000, bottom: 0 };
            for (var i = 0; i < node.numChildren; i++) {
                var c = node.getChildAt(i);
                var sizew = c.width;
                var sizeh = c.height;
                var px = c.x;
                var py = c.y;
                var anchorX = c.anchorOffsetX;
                var anchorY = c.anchorOffsetY;
                var set = { x: px - anchorX, y: py - anchorY };
                var trans = new egret.Point();
                node.localToGlobal(set.x, set.y, trans);
                var rx = trans.x;
                var ry = trans.y;
                if (rx < rect.left) {
                    rect.left = rx;
                }
                if (ry < rect.top) {
                    rect.top = ry;
                }
                if (rx + sizew > rect.right) {
                    rect.right = rx + sizew;
                }
                if (ry + sizeh > rect.bottom) {
                    rect.bottom = ry + sizeh;
                }
            }
            return rect;
        };
        Set.DecodeJson = function (value, key) {
            var ret = "";
            var defaultKey = (key != null) ? key : zj.StringConfig_Language_Server[zj.Device.languageType];
            // let status = () == null ? false : true;
            // if (value instanceof Array) {
            //     ret = value[0];
            // } else {
            //     if (value.substring(0, 1) == "{" || value.substring(0, 2) == "[{") {
            //         ret = JSON.parse(value);
            //     } else {
            //         ret = value;
            //     }
            // }
            try {
                ret = JSON.parse(value);
            }
            catch (e) {
                // console.error(e);
                ret = value;
            }
            if (ret != null && ret[defaultKey] != null) {
                return ret[defaultKey];
            }
            return value;
        };
        Set.TimeOffset = function (sec) {
            var date = zj.Game.Controller.serverNow();
            var humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            humanDate.getTime() / 1000 - 8 * 60 * 60;
            sec = (humanDate.getTime() / 1000 - 8 * 60 * 60) - sec;
            var ret = 0;
            var des;
            if (sec > (3600 * 24) * 365) {
                ret = Math.floor(sec / ((3600 * 24) * 365));
                des = Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.yearsAgo, ret);
            }
            else if (sec > (3600 * 24) * 30) {
                ret = Math.floor(sec / ((3600 * 24) * 30));
                des = Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.monsAgo, ret);
            }
            else if (sec > (3600 * 24)) {
                ret = Math.floor(sec / (3600 * 24));
                des = Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.daysAgo, ret);
            }
            else if (sec > 3600) {
                ret = Math.floor(sec / 3600);
                des = Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.hoursAgo2, ret);
            }
            else if (sec > 60) {
                ret = Math.floor(sec / 60);
                des = Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.minsAgo, ret);
            }
            else {
                des = zj.TextsConfig.TextsConfig_Time.justNow;
            }
            return des;
        };
        Set.TimeForMail = function (sec) {
            // return Set.TimeFormatBeijing("%s-%s-%s  %s:%s", sec);
            var time = sec;
            if (time == null || time == undefined) {
                if (zj.Game.Controller.curServerTime != null && zj.Game.Controller.curServerTime != 0) {
                    time = zj.Game.Controller.curServerTime;
                }
                else {
                    time = new Date().valueOf() / 1000;
                }
            }
            var date = new Date(time * 1000);
            return Helper.StringFormat("%s-%s-%s  %s:%s", date.getFullYear(), date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1, date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate(), date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours(), date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes());
        };
        /**在任何时区返回北京时间的格式化 */
        Set.TimeFormatBeijing = function () {
            // let time;Game.Controller.serverNow()
            // if (Game.PlayerInstanceSystem.curServerTime != null && Game.PlayerInstanceSystem.curServerTime != 0) {
            //     time = Game.PlayerInstanceSystem.curServerTime;
            // } else {
            //     let timestamp = (new Date()).getTime();
            //     time = timestamp;
            // }
            // let data = new Date((time + 8 * 3600));
            // let y = data.getFullYear();
            // let m = data.getMonth() + 1;
            // let d = data.getDate();
            // let h = data.getHours();
            // let mm = data.getMinutes();
            return zj.Game.Controller.serverNow();
        };
        Set.add0 = function (m) {
            return m < 10 ? '0' + m : m;
        };
        Set.FormatMsTime2 = function (msg) {
            var a = Math.floor(msg % 60);
            var b = Math.floor(msg / 60);
            var ms = Helper.StringFormat("%2d", a);
            if (Number(ms) < 10) {
                ms = "0" + ms;
            }
            var min = Helper.StringFormat("%2d", b);
            if (Number(min) < 10) {
                min = "0" + min;
            }
            var ret = Helper.StringFormat("%s:%s", min, ms);
            return ret;
        };
        // 转换币值
        Set.CashUnit = function (str) {
            if (str == undefined)
                return "";
            var cash = "";
            if (str.indexOf("CNY") != -1) {
                cash = "¥";
            }
            else if (str.indexOf("USD") != -1) {
                cash = "$";
            }
            else if (str.indexOf("KRW") != -1) {
                cash = "₩";
            }
            else if (str.indexOf("TWD") != -1) {
                cash = "NT$";
            }
            else {
                cash = "¥";
            }
            return cash;
        };
        /**对齐显示魔域boss伤害 */
        Set.numberUnit4 = function (number) {
            if (number < 100000) {
                return Helper.StringFormat("%d", number);
            }
            else {
                var num = (number / 10000);
                var strNum = num.toString();
                var pos = strNum.indexOf(".");
                var newStrNum = strNum.substr(0, pos + 2);
                num = Number(newStrNum);
                return Helper.StringFormat("%.1f%s", num, zj.TextsConfig.TextsConfig_Common.wan);
            }
        };
        return Set;
    }());
    zj.Set = Set;
    __reflect(Set.prototype, "zj.Set");
    var singLecraft = (function () {
        function singLecraft() {
        }
        singLecraft.decodeGroupName = function (str, strchar, bAfter) {
            if (str == null) {
                return;
            }
            else {
                var jsonStr = Set.DecodeJson(str, null);
                var arr = String(jsonStr).split(strchar);
                if (arr.length == 1)
                    return "";
                if (bAfter) {
                    return arr[1] ? arr[1] : "";
                }
                else {
                    return arr[0] ? arr[0] : "";
                }
            }
        };
        singLecraft.GetLevel = function (score) {
            var tbl = zj.TableSinglecraftScore.Table();
            var level = 1;
            for (var k in tbl) {
                if (tbl.hasOwnProperty(k)) {
                    var v = tbl[k];
                    if (score >= v.section_score) {
                        level = Number(k);
                    }
                    else {
                        break;
                    }
                }
            }
            return level;
        };
        singLecraft.InstanceScore = function (id) {
            if (zj.ckid(id)) {
                return null;
            }
            return zj.TableSinglecraftScore.Item(id);
        };
        singLecraft.LevelProgresBar = function (score) {
            //当前段位
            var curLevel = singLecraft.GetLevel(score);
            //当前段位对应积分
            var preCore = singLecraft.InstanceScore(curLevel).section_score;
            preCore = preCore == 0 ? zj.CommonConfig.singlecraft_init_score : preCore;
            //下一段位
            var nextLevel = curLevel;
            if (singLecraft.InstanceScore(nextLevel + 1) != null) {
                nextLevel = curLevel + 1;
            }
            //下一段位对应积分
            var nextCore = singLecraft.InstanceScore(nextLevel).section_score;
            //百分比
            var percent = 1;
            var bLast = true;
            if (nextCore == preCore) {
                //已达到最高
            }
            else {
                percent = Math.floor((score - preCore) / (nextCore - preCore) * 100) / 100;
                percent = percent >= 1 ? 1 : percent;
                bLast = false;
            }
            return [preCore, nextCore, percent, bLast];
        };
        singLecraft.RewardGoods = function (type, season) {
            season = season || 1;
            var goodsList = [];
            var strGood = (_a = {},
                _a[1] = "reward_goods",
                _a[2] = "season_reward_goods",
                _a);
            var strCount = (_b = {},
                _b[1] = "reward_count",
                _b[2] = "season_reward_count",
                _b);
            if (type == 1 || type == 2) {
                var tbl = zj.TableSinglecraftScore.Table();
                for (var k in tbl) {
                    if (tbl.hasOwnProperty(k)) {
                        var v = tbl[k];
                        var item = { good: null, max: null, min: null, icon: null, logo: null };
                        item.good = [];
                        if (type == 2 && v.title_id != "") {
                            var goods = [];
                            var good = new message.GoodsInfo();
                            good.goodsId = Number(v.title_id);
                            good.count = 1;
                            item.good.push(good);
                        }
                        for (var kk_1 in v[strGood[type]]) {
                            if (v[strGood[type]].hasOwnProperty(kk_1)) {
                                var vv_1 = v[strGood[type]][kk_1];
                                var goods = [];
                                var good = new message.GoodsInfo();
                                good.goodsId = Number(vv_1);
                                good.count = tbl[k][strCount[type]][kk_1];
                                item.good.push(good);
                            }
                        }
                        item.max = null;
                        item.min = tbl[k].section_score;
                        item.icon = tbl[k].icon_num;
                        item.logo = tbl[k].title;
                        goodsList.push(item);
                    }
                }
            }
            else if (type == 3 || type == 4) {
                var tbl = {};
                if (type == 3) {
                    tbl = zj.TableSinglecraftRank.Table();
                }
                else {
                    tbl = zj.TableSinglecraftRankSelf.Table();
                }
                var maxSeason = 1;
                for (var k in tbl) {
                    if (tbl.hasOwnProperty(k)) {
                        var v = tbl[k];
                        if (v.index != null && v.index > maxSeason) {
                            maxSeason = v.index;
                        }
                    }
                }
                if (season > maxSeason) {
                    season = maxSeason;
                }
                for (var k in tbl) {
                    if (tbl.hasOwnProperty(k)) {
                        var v = tbl[k];
                        var curIndex = v.index || 1;
                        if (curIndex == season) {
                            var item = { good: null, max: null, min: null, icon: null, logo: null };
                            item.good = [];
                            if (v.title_id != "") {
                                var goods = {};
                                var good = new message.GoodsInfo();
                                good.goodsId = v.title_id;
                                good.count = 1;
                                item.good.push(good);
                            }
                            for (var kk in v.reward_goods) {
                                if (v.reward_goods.hasOwnProperty(kk)) {
                                    var vv = v.reward_goods[kk];
                                    var goods = {};
                                    var good = new message.GoodsInfo();
                                    good.goodsId = vv;
                                    good.count = tbl[k].reward_count[kk];
                                    item.good.push(good);
                                }
                            }
                            item.max = tbl[k].rank_max;
                            item.min = tbl[k].rank_min;
                            item.icon = tbl[k].icon_num;
                            item.logo = tbl[k].title;
                            goodsList.push(item);
                        }
                    }
                }
            }
            return goodsList;
            var _a, _b;
        };
        return singLecraft;
    }());
    zj.singLecraft = singLecraft;
    __reflect(singLecraft.prototype, "zj.singLecraft");
    var Lang = (function () {
        function Lang() {
        }
        Lang.chatContent = function (chatMsg) {
            var contentInfo = null;
            var ret = "";
            var isJson = false;
            if (chatMsg.content.substring(0, 2) != "[{") {
                isJson = false;
                // [{"content":"2d1935e806f5","type":"0"},
                // {"content":"{\"en\":\"1&H5_172\",\"ko\":\"1&H5_172\",\"ru\":\"1&H5_172\",\"zhcn\":\"1&H5_172\",\"zhtw\":\"1&H5_172\"}","type":"12"},
                // {"content":"40","type":"0"}]
                contentInfo = chatMsg.content.split("&");
                if (chatMsg.content_type == "") {
                    if (contentInfo.length > 0) {
                        ret = contentInfo[contentInfo.length - 1];
                    }
                    return ret;
                }
                if (contentInfo.length >= 1 && contentInfo[0]) {
                    return contentInfo[0];
                }
                if (contentInfo == null) {
                    contentInfo = [];
                }
            }
            else {
                isJson = true;
                contentInfo = JSON.parse(chatMsg.content);
                if (chatMsg.content_type == "") {
                    if (contentInfo.length > 0) {
                        ret = contentInfo[contentInfo.length - 1].content;
                    }
                    return ret;
                }
            }
            var paramTbl = [];
            for (var i = 0; i < contentInfo.length; i++) {
                var curType = null;
                var curId = null;
                var curCon = null;
                if (typeof contentInfo[i] === "string") {
                    var curContent = contentInfo[i].split("|");
                    if (curContent == null) {
                        return zj.TextsConfig.TextsConfig_Common.mail_error;
                    }
                    curType = Number(curContent[0]);
                    curId = Number(curContent[1]);
                    curCon = curContent[1];
                }
                else {
                    curType = Number(contentInfo[i].type);
                    curId = Number(contentInfo[i].content);
                    curCon = contentInfo[i].content;
                }
                if (curType == message.ETextArgType.TEXT_ARG_TYPE_NONO) {
                    paramTbl.push(curCon);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_GOODS) {
                    if (curId != 0) {
                        var name_1 = zj.PlayerItemSystem.Item(curId)["name"];
                        paramTbl.push(name_1);
                    }
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_MOBS) {
                    var name_2 = Lang.Des(curId);
                    paramTbl.push(name_2);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_WONDERLAND) {
                    var name_3 = zj.TableWonderland.Item(curId).wonderland_name;
                    paramTbl.push(name_3);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_WONDERLAND_TREE) {
                    var name_4 = zj.TableWonderlandTree.Item(curId).tree_name;
                    paramTbl.push(name_4);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_ARTIFACT) {
                    var name_5 = zj.TableBaseArtifact.Item(curId).equip_name;
                    paramTbl.push(name_5);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_GENERAL) {
                    var name_6 = null;
                    if (zj.PlayerHunterSystem.Table(curId) == null) {
                        name_6 = zj.TextsConfig.TextsConfig_Common.unknowGeneral;
                    }
                    else {
                        name_6 = zj.PlayerHunterSystem.Table(curId).general_name;
                    }
                    paramTbl.push(name_6);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_FORMATION_COMPOSE) {
                    var name_7 = zj.TableGeneralCompose.Item(curId).compose_name;
                    paramTbl.push(name_7);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_LEAUGE_INSTANCE) {
                    var name_8 = zj.TableLeagueInstance.Item(curId).instance_name;
                    paramTbl.push(name_8);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_GIFT) {
                    var name_9 = "";
                    if (zj.TableNewgiftItem.Item(curId) != null) {
                        name_9 = zj.TableNewgiftItem.Item(curId).name;
                    }
                    else if (zj.TableMonthgift.Item(curId) != null) {
                        name_9 = zj.TableMonthgift.Item(curId).name;
                    }
                    paramTbl.push(name_9);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_GROUP) {
                    var name_10 = null;
                    if (isJson) {
                        name_10 = Set.DecodeJson(curCon);
                    }
                    else {
                        var newStr = "";
                        for (var j = 0; j < contentInfo.length; j++) {
                            if (j >= i) {
                                if (contentInfo[i].split("|") == null) {
                                    newStr = newStr + "&" + contentInfo[j];
                                }
                                else {
                                    if (j == i) {
                                        newStr = newStr + curCon;
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                        }
                        name_10 = Set.DecodeJson(newStr);
                    }
                    name_10 = singLecraft.decodeGroupName(name_10, "&", false);
                    paramTbl.push(name_10);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_SINGLECRAFT_SECTION) {
                    var name_11 = zj.TableSinglecraftScore.Item(curId).name;
                    paramTbl.push(name_11);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_ADVISER) {
                    zj.StringConfig_Table.adviserBase;
                    var name_12 = zj.TableBaseAdviser.Item(curId).adviser_name;
                    paramTbl.push(name_12);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_FRUIT) {
                    var name_13 = curId % 100;
                    paramTbl.push(name_13);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_GIFT_BACK) {
                    var name_14 = zj.TextsConfig.TextsConfig_Activity.bigGift;
                    paramTbl.push(name_14);
                }
                else if (curType == message.ETextArgType.TEXT_ARG_TYPE_LEAGUEMATCH_SCORE) {
                    var name_15 = zj.TableLeagueMatchScore.Item(curId).name;
                    paramTbl.push(name_15);
                }
            }
            var funcName = chatMsg.content_type;
            if (zj.LanguageManager[funcName]) {
                ret = zj.LanguageManager[funcName].apply(zj.LanguageManager, paramTbl);
            }
            return ret;
        };
        /**根据索引，返回对应语句的描述 */
        Lang.Des = function (id) {
            var suffix = zj.Device.languageInfo;
            var ret = zj.TableLanguage.Item(id);
            return ret[suffix];
        };
        return Lang;
    }());
    zj.Lang = Lang;
    __reflect(Lang.prototype, "zj.Lang");
})(zj || (zj = {}));
//# sourceMappingURL=Helper.js.map