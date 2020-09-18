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
    // 游戏相关的配置文件管理器
    // 包括策划给的配置表
    // guoshanhe
    // 2018.11.5
    var ConfigManager = (function () {
        function ConfigManager() {
            this.allTableObjects = {}; // 所有json表对象
            this.loadList = null;
            this.parseList = null;
        }
        // 初始化
        // 加载所有策划配置表
        ConfigManager.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("ConfigManager.init start");
                            // RES.getResByUrl("https://testapi01.smartspace-game.com/hunter/resource/_2d33511d43f2.zip", (data, url) =>{
                            //     console.log("load http://testapi01.smartspace-game.com/hunter/resource/_2d33511d43f2.zip ok ok " + data.length);
                            // }, this, RES.ResourceItem.TYPE_BIN);
                            return [4 /*yield*/, this.loadPreConfigs()];
                        case 1:
                            // RES.getResByUrl("https://testapi01.smartspace-game.com/hunter/resource/_2d33511d43f2.zip", (data, url) =>{
                            //     console.log("load http://testapi01.smartspace-game.com/hunter/resource/_2d33511d43f2.zip ok ok " + data.length);
                            // }, this, RES.ResourceItem.TYPE_BIN);
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // 启动加载即返回
        ConfigManager.prototype.loadPreConfigs = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.load_db_ske("dbbin_ske_login_zip")];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.load_login_config()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // 是否已加载完毕
        ConfigManager.prototype.isLoadOK = function () {
            if (this.loadList) {
                for (var i = 0; i < this.loadList.length; ++i) {
                    if (!RES.getRes(this.loadList[i])) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
            return true;
        };
        // 是否已解压解析完毕
        ConfigManager.prototype.isConfigureOK = function () {
            for (var i = 0; i < this.loadList.length; ++i) {
                if (!this.parseList[this.loadList[i]]) {
                    return false;
                }
            }
            return true;
        };
        // 加载剩余配置文件
        ConfigManager.prototype.loadConfigs = function () {
            var _this = this;
            this.loadList = ["dbbin_ske_game_common_zip", "dbbin_ske_game_fight_zip", "table_sub0_zip", zj.Device.isReviewSwitch ? "table_sub2_zip" : "table_sub1_zip"];
            this.parseList = {};
            this.loadCount = this.loadList.length;
            this.loadProgress = 0;
            this.parseProgress = 0;
            var self = this;
            this.loadControler = new zj.LoadControler(this.loadList, function () {
                _this.loadProgress = _this.loadCount;
                self.loadControler = null;
            }, function (key, idx) {
                _this.loadProgress = idx + 1;
            });
            this.loadControler.onStart();
            return;
        };
        // 解压剩余配置文件
        ConfigManager.prototype.TryConfigure = function (callFinish, thisObj) {
            // Game.EventManager.event(GameEvent.TABLE_CONFIG_LOAD_OK);
            var self = this;
            this.parseProgress = 0;
            for (var i = 0; i < this.loadList.length; ++i) {
                if (this.parseList[this.loadList[i]]) {
                    ++this.parseProgress;
                }
                else {
                    var promise = null;
                    if (i == 0 || i == 1) {
                        promise = this.async_parse_db_ske(this.loadList[i], i == 0);
                    }
                    else {
                        promise = this.async_parse_config(this.loadList[i]);
                    }
                    promise.then(function (key) {
                        self.TryConfigure(callFinish, thisObj);
                    });
                    return;
                }
            }
            zj.Game.EventManager.event(zj.GameEvent.TABLE_CONFIG_LOAD_OK);
            callFinish.call(thisObj);
        };
        ConfigManager.prototype.load_login_config = function () {
            var _this = this;
            var ext_tab_key = zj.Device.isReviewSwitch ? "table_sub2_login_zip" : "table_sub1_login_zip";
            return new Promise(function (resolve, reject) {
                RES.getResAsync(ext_tab_key, function (data, key) {
                    var needLoadTableCount = 0;
                    var loadedTableCount = 0;
                    JSZip.loadAsync(data).then(function (zipdata) {
                        zipdata.forEach(function (path, file) {
                            needLoadTableCount++;
                            file.async('text').then(function (txt) {
                                loadedTableCount++;
                                try {
                                    _this.allTableObjects[path] = JSON.parse(txt);
                                }
                                catch (e) {
                                    console.log(JSON.stringify(e));
                                }
                                if (needLoadTableCount == loadedTableCount) {
                                    resolve();
                                    return;
                                }
                            });
                        });
                    }).catch(function (e) {
                        console.log("JSZip.loadAsync fail(" + ext_tab_key + "):" + JSON.stringify(e));
                        reject();
                    });
                }, _this);
            });
        };
        ConfigManager.prototype.async_parse_config = function (key) {
            var self = this;
            return new Promise(function (resolve, reject) {
                var data = RES.getRes(key);
                var needLoadTableCount = 0;
                var loadedTableCount = 0;
                JSZip.loadAsync(data).then(function (zipdata) {
                    zipdata.forEach(function (path, file) {
                        needLoadTableCount++;
                        file.async('text').then(function (text) {
                            loadedTableCount++;
                            try {
                                self.allTableObjects[path] = JSON.parse(text);
                            }
                            catch (e) {
                                console.log(JSON.stringify(e));
                            }
                            if (needLoadTableCount == loadedTableCount) {
                                self.parseList[key] = true;
                                resolve(key);
                                return;
                            }
                        });
                    });
                });
            });
        };
        ConfigManager.prototype.async_parse_db_ske = function (key, needParse) {
            var self = this;
            return new Promise(function (resolve, reject) {
                var data = RES.getRes(key);
                var needLoadTableCount = 0;
                var loadedTableCount = 0;
                JSZip.loadAsync(data).then(function (zipdata) {
                    zipdata.forEach(function (path, file) {
                        needLoadTableCount++;
                        if (path.indexOf(".json") >= 0) {
                            file.async('text').then(function (txt) {
                                loadedTableCount++;
                                try {
                                    zj.Game.DragonBonesDataManager.parseSkeData(path, JSON.parse(txt), needParse);
                                }
                                catch (e) {
                                    console.log(JSON.stringify(e));
                                }
                                if (needLoadTableCount == loadedTableCount) {
                                    self.parseList[key] = true;
                                    resolve(key);
                                    return;
                                }
                            });
                        }
                        else if (path.indexOf(".dbbin") >= 0) {
                            file.async('arraybuffer').then(function (bin) {
                                loadedTableCount++;
                                zj.Game.DragonBonesDataManager.parseSkeData(path, bin, needParse);
                                if (needLoadTableCount == loadedTableCount) {
                                    self.parseList[key] = true;
                                    resolve(key);
                                    return;
                                }
                            });
                        }
                    });
                });
            });
        };
        ConfigManager.prototype.load_db_ske = function (url) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                RES.getResAsync(url, function (data, key) {
                    var needLoadTableCount = 0;
                    var loadedTableCount = 0;
                    JSZip.loadAsync(data).then(function (zipdata) {
                        zipdata.forEach(function (path, file) {
                            needLoadTableCount++;
                            if (path.indexOf(".json") >= 0) {
                                file.async('text').then(function (txt) {
                                    loadedTableCount++;
                                    try {
                                        zj.Game.DragonBonesDataManager.parseSkeData(path, JSON.parse(txt), true);
                                    }
                                    catch (e) {
                                        console.log(JSON.stringify(e));
                                    }
                                    if (needLoadTableCount == loadedTableCount) {
                                        resolve();
                                        return;
                                    }
                                });
                            }
                            else if (path.indexOf(".dbbin") >= 0) {
                                file.async('arraybuffer').then(function (bin) {
                                    loadedTableCount++;
                                    zj.Game.DragonBonesDataManager.parseSkeData(path, bin, true);
                                    if (needLoadTableCount == loadedTableCount) {
                                        resolve();
                                        return;
                                    }
                                });
                            }
                        });
                    }).catch(function (e) {
                        console.log("JSZip.loadAsync fail(" + url + "):" + JSON.stringify(e));
                        reject();
                    });
                }, _this);
            });
        };
        // 返回配置表的json对象，没找到返回null
        ConfigManager.prototype.getTable = function (jsonfilename) {
            if (!this.allTableObjects.hasOwnProperty(jsonfilename))
                return null;
            return this.allTableObjects[jsonfilename];
        };
        // 查找网络请求错误描述
        ConfigManager.prototype.getAone2CodeReason = function (errorcode) {
            var table = this.getTable("client_table_error.json");
            if (table == null)
                return "\u672A\u77E5\u9519\u8BEF(" + errorcode + ")";
            if (!table.hasOwnProperty(errorcode.toString()))
                return "\u672A\u77E5\u9519\u8BEF(" + errorcode + ")";
            var item = table[errorcode.toString()];
            if (item.hasOwnProperty("des_custom"))
                return item["des_custom"];
            if (item.hasOwnProperty("des_default"))
                return item["des_default"];
            return "\u672A\u77E5\u9519\u8BEF(" + errorcode + ")";
        };
        return ConfigManager;
    }());
    zj.ConfigManager = ConfigManager;
    __reflect(ConfigManager.prototype, "zj.ConfigManager");
})(zj || (zj = {}));
//# sourceMappingURL=ConfigManager.js.map