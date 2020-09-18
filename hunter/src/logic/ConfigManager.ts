namespace zj {
    // 游戏相关的配置文件管理器
    // 包括策划给的配置表
    // guoshanhe
    // 2018.11.5

    export class ConfigManager {

        private allTableObjects: Object = {}; // 所有json表对象

        // 初始化
        // 加载所有策划配置表
        public async init() {
            console.log("ConfigManager.init start");
            // RES.getResByUrl("https://testapi01.smartspace-game.com/hunter/resource/_2d33511d43f2.zip", (data, url) =>{
            //     console.log("load http://testapi01.smartspace-game.com/hunter/resource/_2d33511d43f2.zip ok ok " + data.length);
            // }, this, RES.ResourceItem.TYPE_BIN);

            await this.loadPreConfigs();
        }

        // 启动加载即返回
        private async loadPreConfigs() {
            await this.load_db_ske("dbbin_ske_login_zip");
            await this.load_login_config();
            return;
        }

        // 是否已加载完毕
        public isLoadOK(): boolean {
            if (this.loadList) {
                for (let i = 0; i < this.loadList.length; ++i) {
                    if (!RES.getRes(this.loadList[i])) {
                        return false;
                    }
                }
            } else {
                return false;
            }
            return true;
        }

        // 是否已解压解析完毕
        public isConfigureOK(): boolean {
            for (let i = 0; i < this.loadList.length; ++i) {
                if (!this.parseList[this.loadList[i]]) {
                    return false;
                }
            }
            return true;
        }

        public loadList: string[] = null;
        public parseList: any = null;
        public loadControler: LoadControler;
        public loadProgress: number;// 加载进度
        public loadCount: number;// 文件总数量
        public parseProgress: number;// 解析进度
        // 加载剩余配置文件
        public loadConfigs() {
            this.loadList = ["dbbin_ske_game_common_zip", "dbbin_ske_game_fight_zip", "table_sub0_zip", Device.isReviewSwitch ? "table_sub2_zip" : "table_sub1_zip"];
            this.parseList = {};
            this.loadCount = this.loadList.length;
            this.loadProgress = 0;
            this.parseProgress = 0;
            let self = this;
            this.loadControler = new LoadControler(this.loadList, () => {
                this.loadProgress = this.loadCount;
                self.loadControler = null;
            }, (key: string, idx: number) => {
                this.loadProgress = idx + 1;
            });
            this.loadControler.onStart();
            return;
        }
        // 解压剩余配置文件
        public TryConfigure(callFinish: Function, thisObj: any) {
            // Game.EventManager.event(GameEvent.TABLE_CONFIG_LOAD_OK);
            let self = this;
            this.parseProgress = 0;
            for (let i = 0; i < this.loadList.length; ++i) {
                if (this.parseList[this.loadList[i]]) {
                    ++this.parseProgress;
                } else {
                    let promise: Promise<any> = null;
                    if (i == 0 || i == 1) {
                        promise = this.async_parse_db_ske(this.loadList[i], i == 0);
                    } else {
                        promise = this.async_parse_config(this.loadList[i]);
                    }
                    promise.then((key) => {
                        self.TryConfigure(callFinish, thisObj);
                    });
                    return;
                }
            }
            Game.EventManager.event(GameEvent.TABLE_CONFIG_LOAD_OK);
            callFinish.call(thisObj);
        }

        private load_login_config(): Promise<any> {
            let ext_tab_key = Device.isReviewSwitch ? "table_sub2_login_zip" : "table_sub1_login_zip";
            return new Promise((resolve, reject) => {
                RES.getResAsync(ext_tab_key, (data: any, key: string) => {
                    let needLoadTableCount = 0;
                    let loadedTableCount = 0;
                    JSZip.loadAsync(data).then((zipdata) => {
                        zipdata.forEach((path, file) => {
                            needLoadTableCount++;
                            file.async('text').then(txt => {
                                loadedTableCount++;
                                try {
                                    this.allTableObjects[path] = JSON.parse(txt);
                                } catch (e) {
                                    console.log(JSON.stringify(e));
                                }
                                if (needLoadTableCount == loadedTableCount) {
                                    resolve();
                                    return;
                                }
                            })
                        });
                    }).catch((e) => {
                        console.log("JSZip.loadAsync fail(" + ext_tab_key + "):" + JSON.stringify(e));
                        reject();
                    });
                }, this);
            });
        }

        private async_parse_config(key: string): Promise<any> {
            let self = this;
            return new Promise((resolve, reject) => {
                let data = RES.getRes(key);
                let needLoadTableCount = 0;
                let loadedTableCount = 0;
                JSZip.loadAsync(data).then((zipdata) => {
                    zipdata.forEach((path, file) => {
                        needLoadTableCount++;
                        file.async('text').then(text => {
                            loadedTableCount++;
                            try {
                                self.allTableObjects[path] = JSON.parse(text);
                            } catch (e) {
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
        }

        private async_parse_db_ske(key: string, needParse: boolean): Promise<any> {
            let self = this;
            return new Promise((resolve, reject) => {
                let data = RES.getRes(key);
                let needLoadTableCount = 0;
                let loadedTableCount = 0;
                JSZip.loadAsync(data).then((zipdata) => {
                    zipdata.forEach((path, file) => {
                        needLoadTableCount++;
                        if (path.indexOf(".json") >= 0) {
                            file.async('text').then(txt => {
                                loadedTableCount++;
                                try {
                                    Game.DragonBonesDataManager.parseSkeData(path, JSON.parse(txt), needParse);
                                } catch (e) {
                                    console.log(JSON.stringify(e));
                                }
                                if (needLoadTableCount == loadedTableCount) {
                                    self.parseList[key] = true;
                                    resolve(key);
                                    return;
                                }
                            })
                        } else if (path.indexOf(".dbbin") >= 0) {
                            file.async('arraybuffer').then(bin => {
                                loadedTableCount++;
                                Game.DragonBonesDataManager.parseSkeData(path, bin, needParse);
                                if (needLoadTableCount == loadedTableCount) {
                                    self.parseList[key] = true;
                                    resolve(key);
                                    return;
                                }
                            })
                        }
                    });
                });
            });
        }

        private load_db_ske(url: string): Promise<any> {
            return new Promise((resolve, reject) => {
                RES.getResAsync(url, (data: any, key: string) => {
                    let needLoadTableCount = 0;
                    let loadedTableCount = 0;
                    JSZip.loadAsync(data).then((zipdata) => {
                        zipdata.forEach((path, file) => {
                            needLoadTableCount++;
                            if (path.indexOf(".json") >= 0) {
                                file.async('text').then(txt => {
                                    loadedTableCount++;
                                    try {
                                        Game.DragonBonesDataManager.parseSkeData(path, JSON.parse(txt), true);
                                    } catch (e) {
                                        console.log(JSON.stringify(e));
                                    }
                                    if (needLoadTableCount == loadedTableCount) {
                                        resolve();
                                        return;
                                    }
                                })
                            } else if (path.indexOf(".dbbin") >= 0) {
                                file.async('arraybuffer').then(bin => {
                                    loadedTableCount++;
                                    Game.DragonBonesDataManager.parseSkeData(path, bin, true);
                                    if (needLoadTableCount == loadedTableCount) {
                                        resolve();
                                        return;
                                    }
                                })
                            }
                        });
                    }).catch((e) => {
                        console.log("JSZip.loadAsync fail(" + url + "):" + JSON.stringify(e));
                        reject();
                    });
                }, this);
            });
        }

        // 返回配置表的json对象，没找到返回null
        public getTable(jsonfilename: string): Object {
            if (!this.allTableObjects.hasOwnProperty(jsonfilename)) return null;
            return this.allTableObjects[jsonfilename];
        }

        // 查找网络请求错误描述
        public getAone2CodeReason(errorcode: number): string {
            let table = this.getTable("client_table_error.json");
            if (table == null) return `未知错误(${errorcode})`;
            if (!table.hasOwnProperty(errorcode.toString())) return `未知错误(${errorcode})`;
            let item: Object = table[errorcode.toString()];
            if (item.hasOwnProperty("des_custom")) return item["des_custom"];
            if (item.hasOwnProperty("des_default")) return item["des_default"];
            return `未知错误(${errorcode})`;
        }
    }
}