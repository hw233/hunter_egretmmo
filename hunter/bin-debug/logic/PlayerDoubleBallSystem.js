var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    //PlayerDoubleBallSystem
    //yuqingchao
    var PlayerDoubleBallSystem = (function () {
        function PlayerDoubleBallSystem() {
            var _this = this;
            this.my_id = [0, 0, 0, 0, 0];
            this.public_id = [0, 0, 0, 0, 0];
            // public lastDoubleInfo: Array<message.CustomLastDoubleInfo> = [];					//昨日双色球信息
            this.RedNum = 1;
            this.BlueNum = 3;
            /**双色球信息 */
            this._lastDoubleInfo = new message.CustomLastDoubleInfo();
            /** 信息 */
            this._LastDoubleInfoMap = [];
            //
            this.GetLotteryFruitInfoReqBody_Visit = function () {
                return new Promise(function (resolve, reject) {
                    var request = new message.GetLotteryFruitInfoRequest();
                    zj.Game.Controller.send(request, function (req, resp) {
                        var response = resp;
                        console.log(response);
                        if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_TOKEN && response.header.result != message.EC.XG_LACK_PROMISE) {
                            zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                            return;
                        }
                        resolve(response);
                        return;
                    }, function (req) {
                        reject(zj.LANG("请求超时"));
                        return;
                    }, _this, false, true);
                    return;
                });
            };
        }
        Object.defineProperty(PlayerDoubleBallSystem.prototype, "lastDoubleInfo", {
            get: function () {
                return this._lastDoubleInfo;
            },
            set: function (v) {
                this._lastDoubleInfo = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerDoubleBallSystem.prototype, "LastDoubleInfoMap", {
            get: function () {
                return this._LastDoubleInfoMap;
            },
            set: function (v) {
                this._LastDoubleInfoMap = v;
            },
            enumerable: true,
            configurable: true
        });
        PlayerDoubleBallSystem.prototype.init = function () {
            //初始化
            this.InitLastDoubleInfo(); //双色球初始化
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.LoadLastDoubleInfo, this); // 双色球加载
        };
        /**
       * 双色球结果初始化
       */
        PlayerDoubleBallSystem.prototype.InitLastDoubleInfo = function () {
            // this.lastDoubleInfo = [];
            var redNum = 1;
            var blueNum = zj.CommonConfig.double_fruit_blue_number;
            var initDoubleInfoStr = "";
            for (var i = 0; i < (redNum + blueNum); i++) {
                if (i == 0) {
                    initDoubleInfoStr = initDoubleInfoStr + "0";
                }
                else if (i < 4) {
                    initDoubleInfoStr = initDoubleInfoStr + "&0";
                }
            }
            this.lastDoubleInfo.doubleInfo = initDoubleInfoStr;
            this.lastDoubleInfo.lastTime = "0";
            this.lastDoubleInfo.bPushed = false;
        };
        /**
        * 双色球加载
        */
        PlayerDoubleBallSystem.prototype.LoadLastDoubleInfo = function () {
            var msg = zj.Game.Controller.getRoleStorageItem("lastDoubleInfo");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }
            var map = JSON.parse(msg);
            this.lastDoubleInfo.bPushed = map[0].bPushed;
            this.lastDoubleInfo.doubleInfo = map[0].doubleInfo;
            this.lastDoubleInfo.lastTime = map[0].lastTime;
        };
        /**
         * 保存信息
         */
        PlayerDoubleBallSystem.prototype.SaveLastDoubleInfo = function () {
            var formatInfo = this.getSaveLastDoubleInfoStreet();
            this.LastDoubleInfoMap.push(formatInfo);
            var msg = JSON.stringify(this.LastDoubleInfoMap);
            zj.Game.Controller.setRoleStorageItem("lastDoubleInfo", msg);
        };
        PlayerDoubleBallSystem.prototype.getSaveLastDoubleInfoStreet = function () {
            var msg = new message.CustomLastDoubleInfo();
            msg.doubleInfo = this.lastDoubleInfo.doubleInfo;
            msg.lastTime = this.lastDoubleInfo.lastTime;
            msg.bPushed = this.lastDoubleInfo.bPushed;
            return msg;
        };
        PlayerDoubleBallSystem.prototype.serverFruit = function (red, blue) {
            var tbl = [];
            var c_blue = zj.Table.DeepCopy(blue);
            c_blue.sort(function (a, b) {
                return a - b;
            });
            for (var i = 0; i < 4; i++) {
                if (c_blue[i]) {
                    tbl.push(c_blue[i]);
                }
                else {
                    tbl.push(0);
                }
            }
            tbl.push(red);
            return tbl;
        };
        PlayerDoubleBallSystem.prototype.fruitId = function (id) {
            return id % 100;
        };
        /**
         * 果子颜色
         * */
        PlayerDoubleBallSystem.prototype.fruitColor = function (id) {
            var color = Math.floor((id % 1000) / 100); // id % 1000 >= 100 ? 1 : 0;
            return color;
        };
        /**
         * 根据颜色查找果子
         * */
        PlayerDoubleBallSystem.prototype.findFruitByColor = function (list, color) {
            var colorList = [];
            for (var k in list) {
                var v = list[k];
                if (this.fruitColor(v) == color) {
                    colorList.push(v);
                }
            }
            return this.sortById(colorList);
        };
        PlayerDoubleBallSystem.prototype.sortById = function (list) {
            var newTbl = zj.Table.DeepCopy(list);
            var soretByValue = function (a, b) {
                return a > b;
            };
            newTbl.sort(soretByValue);
            return newTbl;
        };
        /**
         * 投注情况对应奖励
         * */
        PlayerDoubleBallSystem.prototype.betReward = function (my, win) {
            var c_my = zj.Table.DeepCopy(my);
            var c_win = zj.Table.DeepCopy(win);
            var inn = [];
            var point = 0;
            var size = 0;
            //每个位置是否中奖
            var is_lottory = [];
            var _loop_1 = function (k) {
                var v = c_my[k];
                inn.push(v);
                point = point + 1;
                size = size + 1;
                var find = zj.Table.FindF(c_win, function (_k, _v) {
                    return _v = v;
                });
                if (!find) {
                    //非中奖果子
                    var ann = inn;
                    var num = point - 1;
                    inn.splice(num, 1);
                    point = point - 1;
                    size = size - 1;
                    is_lottory.push(false);
                }
                else {
                    is_lottory.push(true);
                }
            };
            for (var k in c_my) {
                _loop_1(k);
            }
            if (Object.keys(inn).length == 1) {
                inn = this.findFruitByColor(inn, 0);
            }
            return [inn, is_lottory];
        };
        ;
        /**
         * 红蓝混色按照4蓝1红排序
         * */
        PlayerDoubleBallSystem.prototype.SortByIdAndColor = function (list) {
            var _this = this;
            var sortByValue = function (a, b) {
                if (_this.fruitColor(a) == _this.fruitColor(b)) {
                    return a - b;
                }
                else {
                    return _this.fruitColor(b) - _this.fruitColor(a);
                }
            };
            list.sort(sortByValue);
            return list;
        };
        /**
         * 是否有资格下注
         * */
        PlayerDoubleBallSystem.prototype.canPour = function () {
            var blue_num = 0;
            var red_num = 0;
            var fruits = zj.Game.PlayerItemSystem.getWonderlandFruits();
            for (var k in fruits) {
                var v = fruits[k];
                if (this.fruitColor(v) == 0) {
                    red_num = red_num + 1;
                }
                else if (this.fruitColor(v) == 1) {
                    blue_num = blue_num + 1;
                }
                if (blue_num > this.BlueNum && red_num >= this.RedNum) {
                    return true;
                }
            }
            return false;
        };
        /**
         *单个插入，修改原有队列
        */
        PlayerDoubleBallSystem.prototype.FruitListStateC2hange = function (pre_list, id) {
            var any = pre_list;
            if (pre_list[this.BlueNum] != 0)
                return [any, -1];
            var modify_list = {
                add: [],
                delete: [],
                change: [],
            };
            var cur_list = [];
            var cur_list_copy = zj.Table.DeepCopy(pre_list);
            cur_list_copy.push(id);
            for (var k in cur_list_copy) {
                var v = cur_list_copy[k];
                if (v != 0) {
                    cur_list.push(v);
                }
            }
            cur_list = this.sortById(cur_list);
            for (var i = 0; i < 4; i++) {
                if (cur_list[i] == null) {
                    cur_list.push(0);
                }
            }
            for (var k in cur_list) {
                var v = cur_list[k];
                if (pre_list[k] == 0 && v != 0) {
                    var tbl = {
                        pos: k,
                        id: v,
                    };
                    modify_list.add.push(tbl);
                }
                else if (pre_list[k] != v) {
                    var tbl = {
                        pos: k,
                        id: v,
                    };
                    modify_list.change.push(tbl);
                }
            }
            return [cur_list, modify_list];
        };
        /**
         * 单个删除，修改原有队列
         * */
        PlayerDoubleBallSystem.prototype.FruitListStateDelete = function (pre_list, id) {
            if (id == 0)
                return;
            var modify_list = {
                add: [],
                delete: [],
                change: [],
            };
            var cur_list = zj.Table.DeepCopy(pre_list);
            var find_k = zj.Table.FindR(cur_list, function (_k, _v) {
                return _v == id;
            })[1];
            if (find_k != null) {
                cur_list.splice(find_k, 1);
                cur_list.push(0);
            }
            for (var k in pre_list) {
                var v = pre_list[k];
                if (cur_list[k] == 0 && v != 0) {
                    var tbl = {
                        pos: k,
                        id: v,
                    };
                    modify_list.delete.push(tbl);
                }
                else if (cur_list[k] != v) {
                    var tbl = {
                        pos: k,
                        id: cur_list[k],
                    };
                    modify_list.change.push(tbl);
                }
                else {
                }
            }
            return [cur_list, modify_list];
        };
        /**
         * 随机果子
         * */
        PlayerDoubleBallSystem.prototype.RandomFruit = function () {
            var per = 80;
            var is_whole_random = Math.random() * 100 < per;
            var fruits = zj.Game.PlayerItemSystem.getWonderlandFruits();
            var randomList = [0, 0, 0, 0, 0];
            var redList = [];
            var blueList = [];
            var blueMoreTen = [];
            for (var k in fruits) {
                var v = fruits[k];
                if (this.fruitColor(v) == 0) {
                    redList.push(v);
                }
                else if (this.fruitColor(v) == 1) {
                    blueList.push(v);
                    if (this.fruitId(v) >= 10) {
                        //蓝色编号大于10
                        blueMoreTen.push(v);
                    }
                }
            }
            var num = Math.round(Math.random() * (redList.length - 1));
            randomList[4] = redList[num];
            if (is_whole_random) {
                //全随机
                for (var i = 0; i < 4; i++) {
                    var any_1 = blueList.length;
                    var random_k = Math.round(Math.random() * (blueList.length - 1));
                    randomList[i] = blueList[random_k];
                    blueList.splice(random_k, 1);
                }
            }
            else {
                var _loop_2 = function (i) {
                    if (i == 0) {
                        if (blueMoreTen.length != 0) {
                            var blueFrist_1 = blueMoreTen[Math.round(Math.random() * (blueMoreTen.length - 1))];
                            var kk = zj.Table.FindR(blueList, function (k, v) {
                                return v == blueFrist_1;
                            })[1];
                            if (kk != null) {
                                randomList[i] = blueList[kk];
                                blueList.splice(kk, 1);
                            }
                        }
                        else {
                            var random_k = Math.round(Math.random() * (blueList.length - 1));
                            randomList[i] = blueList[random_k];
                            blueList.splice(random_k, 1);
                        }
                    }
                    else {
                        var random_k = Math.round(Math.random() * (blueList.length - 1));
                        randomList[i] = blueList[random_k];
                        blueList.splice(random_k, 1);
                    }
                };
                //概率随机
                for (var i = 0; i < 4; i++) {
                    _loop_2(i);
                }
            }
            var any = randomList;
            return this.SortByIdAndColor((randomList));
        };
        //网络协议
        //下注
        PlayerDoubleBallSystem.prototype.setRoleLotteryFruit = function (redFruit, blueFruit) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SetRoleLotteryFruitRequest();
                request.body.redFruit = redFruit;
                request.body.blueFruit = blueFruit;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
                return;
            });
        };
        return PlayerDoubleBallSystem;
    }());
    zj.PlayerDoubleBallSystem = PlayerDoubleBallSystem;
    __reflect(PlayerDoubleBallSystem.prototype, "zj.PlayerDoubleBallSystem");
    /**
     * 其他存储
     */
    var LastDoubleInfoMap = (function () {
        function LastDoubleInfoMap() {
            this.units = [];
        }
        return LastDoubleInfoMap;
    }());
    zj.LastDoubleInfoMap = LastDoubleInfoMap;
    __reflect(LastDoubleInfoMap.prototype, "zj.LastDoubleInfoMap");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerDoubleBallSystem.js.map