// UI资源列表
// auto generate by tools

namespace zj {
    export let cacheList: any = {
        "HunterMainScene": ["ui_tongyong_xinshou_json", "ui_tongyong_xinshou_png"]
    };
    export let UIResource = {};
    export async function UIResource_init() {
        return new Promise((resolve, reject) => {
            RES.getResAsync("UIResource_json", (data: any, key: string) => {
                for (let k in cacheList) {
                    if (data[k]) {
                        data[k] = data[k].concat(cacheList[k]);
                    } else {
                        data[k] = cacheList[k];
                    }
                }
                zj.UIResource = data;
                resolve(); // 结束
                return;
            }, this);
        });
    }
}