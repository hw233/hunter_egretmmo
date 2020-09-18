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
    //ShopMainType
    //wangshenzhuo、hexiaowei
    // 2018/12/20
    var ShopMainType = (function (_super) {
        __extends(ShopMainType, _super);
        function ShopMainType() {
            var _this = _super.call(this) || this;
            _this.dateIndex = 1;
            _this._COST_MALL = [
                message.EMallType.MALL_TYPE_ORDINARY,
                message.EMallType.MALL_TYPE_LADDER,
                message.EMallType.MALL_TYPE_LEAGUE,
                message.EMallType.MALL_TYPE_HONOR,
                message.EMallType.MALL_TYPE_LOTTERY,
            ];
            _this.skinName = "resource/skins/shop/ShopMainTypeSkin.exml";
            zj.cachekeys(zj.UIResource["ShopMainType"], null);
            _this.imgSpriteType1.visible = false;
            _this.imgSpriteType.visible = false;
            return _this;
        }
        ShopMainType.prototype.dataChanged = function () {
            this.dateIndex = this.data;
            if (zj.Device.isReviewSwitch) {
                if (this.data == 3 || this.data == 4) {
                    this.groupMain.scaleX = 0;
                }
                else if (this.data == 5) {
                    this.groupMain.x = 18;
                }
            }
            this.imgSpriteNew.visible = false;
            this.imgSpriteType1.visible = false;
            this.imgSpriteType.visible = false;
            if (this.selected) {
                this.imgSpriteType1.visible = true;
                this.imgSpriteType.visible = false;
                this.imgSpriteType1.source = zj.cachekey(zj.UIConfig.UIConfig_Mall.name[this.data][2], this);
                var bLock = !this.GetOpen(this.data, false, true);
                this.imgSpriteLock.visible = bLock;
            }
            else {
                this.imgSpriteType.visible = true;
                this.imgSpriteType1.visible = false;
                this.imgSpriteType.source = zj.cachekey(zj.UIConfig.UIConfig_Mall.name[this.data][1], this);
                var bLock = !this.GetOpen(this.data, false, false);
                this.imgSpriteLock.visible = bLock;
            }
            //this.imgSpriteTips.visible = shopmall.GetTips(this.data);
            var time = zj.Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LOTTERY, "MALL");
            if (time < 2 && this.data == message.EMallType.MALL_TYPE_LOTTERY) {
                this.imgSpriteNew.visible = true;
            }
            if (this.data == message.EMallType.MALL_TYPE_LOTTERY) {
                this.imgSpriteTips.visible = false;
            }
            this.SetInfoTips();
        };
        ShopMainType.prototype.SetInfoTips = function () {
            var bTips = ShopMainType.GetTips(this.data);
            this.imgSpriteTips.visible = bTips;
            var time2 = zj.Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LEAGUE, "MALL");
            if (time2 > 3 && this.dateIndex == message.EMallType.MALL_TYPE_LEAGUE) {
                this.imgSpriteTips.visible = false;
            }
        };
        ShopMainType.GetTips = function (index) {
            if (index == zj.TableEnum.Enum.Mall.NORMAL) {
                return zj.Tips.GetTipsOfId(zj.Tips.TAG.MALL, zj.Tips.TAG.MALL_MALL);
            }
            else if (index == zj.TableEnum.Enum.Mall.ARENA) {
                return true && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ARENA) && zj.Tips.GetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.LADDER_MALL);
            }
            else if (index == message.EMallType.MALL_TYPE_LEAGUE) {
                var bOpens = zj.Game.PlayerInfoSystem.BaseInfo.leagueId > 0;
                return true && zj.Game.PlayerInfoSystem.BaseInfo.leagueId != 0 && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.LEAGUE) && bOpens && zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_MALL);
            }
            else if (index == zj.TableEnum.Enum.Mall.LOTTERY) {
                var time = zj.Tips.GetSaveByMallNewProduct(message.EMallType.MALL_TYPE_HONOR);
                if (time < 3) {
                    return false;
                }
                else {
                    return zj.Tips.GetTipsOfId(zj.Tips.TAG.TREAUSER, zj.Tips.TAG.TREAUSER_MALL);
                }
            }
            else if (index == zj.TableEnum.Enum.Mall.HONOR) {
                return true && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.PK) && zj.Tips.GetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.PK_MALL);
            }
            return true;
        };
        //判断商店是否达到解锁条件
        ShopMainType.prototype.GetOpen = function (index, bTips, isdown) {
            if (index == zj.TableEnum.Enum.Mall.NORMAL) {
                return true;
            }
            else if (index == zj.TableEnum.Enum.Mall.ARENA) {
                return zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER, isdown);
            }
            else if (index == zj.TableEnum.Enum.Mall.LEAGUE) {
                return true
                    && zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE, isdown)
                    && zj.PlayerHunterSystem.LevelDBOpenLeague(bTips)
                    && zj.Game.PlayerInfoSystem.LeagueId != 0;
            }
            else if (index == zj.TableEnum.Enum.Rank.CONTEND) {
                return zj.PlayerHunterSystem.LevelDBFunOpenTo(message.EC.XG_OPENFUNCTION_CONTEND, isdown);
            }
            else if (index == zj.TableEnum.Enum.Mall.LOTTERY) {
                return true;
            }
            else if (index == zj.TableEnum.Enum.OneKeySell.Demon) {
                return zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON, isdown);
            }
            else if (index == zj.TableEnum.Enum.Mall.HONOR) {
                return zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_SINGLE_CRAFT, isdown);
            }
        };
        return ShopMainType;
    }(eui.ItemRenderer));
    zj.ShopMainType = ShopMainType;
    __reflect(ShopMainType.prototype, "zj.ShopMainType");
    var ShopMainTypedata = (function () {
        function ShopMainTypedata() {
        }
        ;
        return ShopMainTypedata;
    }());
    zj.ShopMainTypedata = ShopMainTypedata;
    __reflect(ShopMainTypedata.prototype, "zj.ShopMainTypedata");
})(zj || (zj = {}));
//# sourceMappingURL=ShopMainType.js.map