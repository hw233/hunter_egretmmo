namespace zj {
// SkeArenaRankDialog（天空竞技场排行榜）
// hexiaowei
// 20019/02/23
export class SkeArenaRankDialog extends Dialog {
        
    private imageRect:eui.Image;
    private imageRankTip:eui.Image;
    private buttonClose:eui.Button;
    private listViewRank:eui.List;
    private labelLevel:eui.Label;
    private imageFrame:eui.Image;
    private imageIcon:eui.Image;
    private labelName:eui.Label;
    private labelValue:eui.Label;

    private father : SkyAreanMainScene;
    private rankType = null;
    
    private RANK_TYPE= ConstantConfig_UI_Config.RANK_TYPE;
    private RANK_NUM=49;

    private rankUser = null;

    public constructor() {
        super();
        this.skinName = "resource/skins/skyArean/SkeArenaRankSkin.exml";
        
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClose,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
		}, null);
    }

    public loadFrom(father, index){
        this.father = father;
        this.imageRankTip.source = cachekey(UIConfig.UIConfig_Tower.rankTitle[index] , this) ;
        this.reqRankBefore(index);
    }

    private reqRankBefore( index ){
        this.rankType = this.RANK_TYPE[index];
        let start = 0;
        let count = CommonConfig.rank_list_max - 1;
        this.ReqRankVisit(this.rankType,start,count)
            .then((data: any) => {
                for (const k in data.rankItemsInfo){
                    const v = data.rankItemsInfo[k];
                    if(k == data.rankItemsInfo.length){
                          this.rankUser = v.rank;
                    }
                }
                let m = data.rankItemsInfo;

            })
            .catch(reason => { toast_warning(reason) });
    }

    private ReqRankVisit(rankType, start, num){
         return new Promise((resolve, reject) => {
            let request = new message.RankItemInfoRequest();
            request.body.type = 4;
            request.body.start = start;
            request.body.num = num;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.RankItemInfoResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    let m =Game.ConfigManager.getAone2CodeReason(response.header.result);
                    return;
                }
                // 解压RankItemsZip 信息
                let para = {}
                para["index"] = 4
                let inflate = new Zlib.Inflate(response.body.itemsZip, para);
                let plain = inflate.decompress();
                let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                let items = new message.RankItemsZip()
                if (!items.parse_bytes(decoder)) {
                    toast(LANG("游戏数据解析失败"));
                    return;
                }

                resolve(items);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        }); 
    }
    
    private onButtonClose(){

        this.close(UI.HIDE_TO_TOP);

    }

}

}