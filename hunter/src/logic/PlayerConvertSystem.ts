namespace zj {
// 贪婪之岛活动 系统
// wangshenzhuo 创建于2019.05.18
// 对应db_convert.ts

export class PlayerConvertSystem {

    public static Instance(id) {
        if (id == null || id == "") {
            return;
        }
        return TableExchangeMall.Item(id);
    }

    public static SortType(type) {
        let base_tbl = TableExchangeMall.Table();
        let tbl = Table.DeepCopy(base_tbl);
        let select_tbl = [];
        for (const k in tbl) {
            const v = tbl[k];
            if (v.type == type && v.level_min <= Game.PlayerInfoSystem.BaseInfo.level) {
                let has_get = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (key, value) {
                    return value.key == k;
                })
                let is_only = PlayerConvertSystem.Instance(k).is_only == 1;
                if (has_get != null) {
                    if (is_only) {
                        v["get"] = 0
                    }else{
                        if(has_get["value"] >= v.exchange_times) {
                            v["get"] = 1
                        }else{
                            if(PlayerConvertSystem.CanConvert(v.id)) {
                                v["get"] = 3;
                            }else{
                                v["get"] = 2;
                            }
                        }
                    }
                }else{
                    if(PlayerConvertSystem.CanConvert(v.id)) {
                        v["get"] = 3;
                    }else{
                        v["get"] = 2;
                    }
                }
                select_tbl.push(v);
            }
        }
         select_tbl.sort(function (a, b){
            if(a.get == b.get) {
                return a.quality - b.quality;
            }else{
                return b.get - a.get;
            }
        }) 

        return select_tbl;
    }

    // public static Tips(index) {
    //     let exchange = TableExchangeMall.Table();
    //     let fit = [];
    //     let fit_tbl = [];
    //     for(const k in exchange) {
    //         const v = exchange[k];
    //         let fit_type = v.type == index;
    //         let fit_level = Game.PlayerInfoSystem.BaseInfo.level >= v.level_min;
    //         if(fit_type && fit_level) {
    //             fit.push(v);
    //         }
    //     }
    //     for(const k in fit){
    //         const v = fit[k];
    //         let is_fit = true;
    //         let fit_show = !Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls , function(k , v){
    //             return v.key == v.id;
    //         })
    //         let fit_material = PlayerConvertSystem.CanConvert(v.id);
    //         is_fit = fit_show && fit_material;
    //         fit_tbl.push(is_fit);   
    //     }
    //     return Table.FindF(fit_tbl , function(key , value){
    //         return value == true;
    //     })
    // }
    public static Tips( index ){
		let exchange = TableExchangeMall.Table();
		let fit = [];
		let fit_tbl = [];
		for(let k in exchange){
			let v = exchange[k];
			let fit_type = v.type == index;
			let fit_level = Game.PlayerInfoSystem.Level >= v.level_min;
			if(fit_type && fit_level){
				fit.push(v);
			}
		}
		for(let k = 0;k<fit.length;k++){
			let v = fit[k];
			let is_fit = true;
			let fit_show = !Table.FindFCall(Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (_k,_v) {
				return _v.key == v.id;
			},this);
			let fit_material = PlayerConvertSystem.CanConvert(v.id);
			is_fit = fit_show && fit_material;
			fit_tbl.push(is_fit);
		}
		return Table.FindFCall(fit_tbl, function (key,value) {
				return value == true;
			},this);
	}

    public static Tip() {
        let exchange = TableExchangeMall.Table();
        let types = [];
        for(const k in exchange) {
            const v = exchange[k];
            let typeExit = Table.FindF(types , function(_k , _v){
                return _v == v.type;
            })
            if(!typeExit) {
                types.push(v.type);
                let b_convert = PlayerConvertSystem.Tips(v.type);
                if(b_convert) {
                    return true;
                }
            }
            return false;
        }
    }

    public static CheckPotato(n_tbl,h_tbl) {
        let is_check = [];
    }

    public static NumCanConvert(id) {
        let info = PlayerConvertSystem.Instance(id);
        let count = 0;
        for(const k in info.exchange_goods) {
            const v = info.exchange_goods[k];
            let type = PlayerItemSystem.ItemType(v[0]);
            if(type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                if( PlayerItemSystem.Resource(v[0]) >= v[1]) {
                    count = count + 1;
                }
            }else{
                if(PlayerItemSystem.Count(v[0]) >= v[1]) {
                    count = count + 1;
                }
            }
        }
        return count;
    }

    public static needMaterials(info) {
        let tbl_need = [];
        let seat = {
            [1]: "exchange_one",
            [2]: "exchange_two",
            [3]: "exchange_three",
        }
        let use = 0;
        for (let i = 0; i < 3; i++) {
            if (info[seat[1]].length != 0) {
                let goods: any = [];
                goods.id = info[seat[i]][0]
                goods.count = 1
                goods.level = info[seat[i]][1] || -1;
                tbl_need.push(goods);
            } else if (info.exchange_goods.length > 0) {
                if (info.exchange_goods[use] != null) {
                    let goods: any = [];
                    goods.id = info.exchange_goods[use][0]
                    goods.count = info.exchange_goods[use][1]
                    goods.level = info.exchange_goods[use][2] || -1;
                    tbl_need.push(goods);
                    use = use + 1;
                } else {
                    let goods: any = [];
                    goods.id = -2;
                    goods.count = -2;
                    goods.elvel = -2;
                    tbl_need.push(goods);
                }
            } else {
                let goods: any = [];
                goods.id = -2;
                goods.count = -2;
                goods.elvel = -2;
                tbl_need.push(goods);
            }
        }
        return tbl_need;
    }

    public static fitPotato(info,exist,has) {
        let fit_tbl = [];
        // for(const k in Game.PlayerInfoSystem.BaseInfo.po)
    }

    public upToTime(time) {
        let str = "";
        let day = Math.floor(time/86400);
        let hour = Math.floor((time%86400)/3600);
        let min = Math.floor(((time%86400)%3600)/60);
        if(day == 0) {
            if(hour == 0) {
                if(min == 0) {
                    str = TextsConfig.TextsConfig_Convert.upToStock[4];
                }else{
                    str = Helper.StringFormat(TextsConfig.TextsConfig_Convert.upToStock[3] , min); 
                }
            }else{
                str = Helper.StringFormat(TextsConfig.TextsConfig_Convert.upToStock[2] , hour , min); 
            }
        }else{
            str = Helper.StringFormat(TextsConfig.TextsConfig_Convert.upToStock[1] , day , hour , min);
        }
        return str;
    }

    public static CanConvert(id){
		let info = TableExchangeMall.Item(id);
		let can_convert = true;
		for(let k = 0;k<info.exchange_goods.length;k++){
			let v = info.exchange_goods[k];
			if(Game.PlayerItemSystem.queryItem(v[0]) == null){
				return false;
			}
			if(Game.PlayerItemSystem.itemCount(v[0]) < v[1]){
				can_convert = false;
            	return false;
			}
		}
		let [find] = Table.FindRcall(Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (key, value) {
				return value.key == id;
		},this);
		let can_convert1 = find == null && true || (find.value < info.exchange_times);
    	return can_convert1;
	}

    public static ExchangeMall_Visit(type? , id?) {
        return new Promise((resolve, reject) => {
            let request = new message.ExchangeMallRequest();
            request.body.type = type;
            request.body.mallId = id;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.ExchangeMallResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }
}

}