namespace zj {
    // 时装信息系统
    // lizhengqiang
    // 20190318

    export class PlayerFashionSystem {

        ///////////////////////////////////////////////////////////////////////////
        // 静态函数

        public static FashionWithId(id: number): TableItemFashion {
            let info1: TableBaseGeneral = PlayerHunterSystem.Table(id);
            let info2: TableItemFashion = TableItemFashion.Item(info1.fashion_id[0]);

            return info2;
        }

        // 获取拥有时装猎人列表（无论是否有此猎人）
        public static GetHunterListWithFashion(): Array<TableBaseGeneral> {
            let tbl = TableBaseGeneral.Table();
            let list: Array<TableBaseGeneral> = [];
            for (let k in tbl) {
                if (tbl[k].fashion_id[0] != null && tbl[k].fashion_id[0] != 0 && PlayerFashionSystem.FashionWithId(tbl[k].general_id) != null) {
                    list.push(tbl[k]);
                }
            }

            list.sort(function (a, b) {
                if (a.aptitude == b.aptitude) {
                    return b.general_id - a.general_id;
                } else {
                    return b.aptitude - a.aptitude;
                }
            });

            return list;
        }

        // 查询一个武将id所有的时装
        public static GetAllFashionByGeneralId(generalId: number): [Array<{ id: number, state: number }>, number] {
            // 0未购买 1已购买未使用 2已购买已使用 3原皮肤
            let fashionList: Array<{ id: number, state: number }> = [];

            let generalTbl = PlayerHunterSystem.Table(generalId % 100000);
            let tmp = Table.FindR(Game.PlayerHunterSystem.queryAllHunters(), function (k, v) { return generalId == v.general_id });
            let generalInfo = tmp[0] != null ? tmp[0] : null;

            let equipFashionId: number = 0;
            if (generalInfo != null) {
                equipFashionId = generalInfo.fashionId;
            }

            for (let i = 0; i <= generalTbl.fashion_id.length; i++) {
                let tempTbl = {};
                if (i == 0) {
                    tempTbl["id"] = generalId % 100000;
                    tempTbl["state"] = 3;
                } else {
                    tempTbl["id"] = generalTbl.fashion_id[i - 1];
                    if (tempTbl["id"] == equipFashionId) {
                        tempTbl["state"] = 2;
                    } else if (Game.PlayerItemSystem.itemCount(tempTbl["id"]) > 0) {
                        tempTbl["state"] = 1;
                    } else {
                        tempTbl["state"] = 0;
                    }
                }

                fashionList.push(<{ id: number, state: number }>tempTbl);
            }

            // fashionList.sort(function (a, b) {
            //     return b.state - a.state;
            // });

            let [_, focusIndex] = Table.FindR(fashionList, function (k, v) {
                return (PlayerFashionSystem.GetFashionIsNews(v.id) == false && v.state == 1) || v.id == equipFashionId || PlayerItemSystem.Type2(v.id) == message.EGoodsType.GOODS_TYPE_FASHION;
            });

            return [fashionList, focusIndex != null ? focusIndex - 1 : 0]
        }

        public static GetHunterFashionTips(generalId: number): boolean {
            let fashionList = PlayerHunterSystem.Table(generalId).fashion_id;
            for (let v of fashionList) {
                if (this.GetFashionIsNews(v) == false && Game.PlayerItemSystem.itemCount(v) > 0) {
                    return true;
                }
            }
            return false;
        }

        public static GetFashionIsNews(fashionId: number): boolean {
            if (Game.PlayerItemSystem.itemCount(fashionId) > 0) {
                // 已拥有时装
                let showTips = Tips.GetSaveBoolForFashionNewGet(fashionId);
                if (showTips) {
                    return true;
                }
            }
            return false;
        }

        ///////////////////////////////////////////////////////////////////////////
        // 变量

        ///////////////////////////////////////////////////////////////////////////
        // 成员方法

        public init() {
        }

        public uninit() {

        }

        // 武将时装激活
        public fashionWear(isUnwear: boolean, id: number, generalId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.FashionWearRequest();
                request.body.is_unwear = isUnwear;
                request.body.fashion_id = id;
                request.body.general_id = generalId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.FashionWearResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 变身标识设置请求
        public GeneralTransferTab(isUnwear: boolean, id: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GeneralTransferTabRequest();
                request.body.generalId = id;
                request.body.is_show_transfer = isUnwear;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GeneralTransferTabResponse>resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }
                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        //  购买时装
        public fashionBuy(fashionId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.FashionBuyRequest();
                request.body.fashionId = fashionId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.FashionBuyResponse>resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }
                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

    }
}