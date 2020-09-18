//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////


class ThemeAdapter implements eui.IThemeAdapter {

    public static decode(data: Uint8Array): Uint8Array {
        let len = data.length;
        if (!data || len < 10) return data;
        if (data[0] != 65) return data; // 'A'
        if (data[1] != 79) return data; // 'O'
        if (data[2] != 78) return data; // 'N'
        if (data[3] != 69) return data; // 'E'
        let pading = data[4];
        if (len < 10 + pading) return data;
        let rc4_key = data[5 + pading];
        let size1 = data[6 + pading + 0];
        let size2 = data[6 + pading + 1];
        let size3 = data[6 + pading + 2];
        let size4 = data[6 + pading + 3];
        let size = size4;
        size = (size << 8) | size3;
        size = (size << 8) | size2;
        size = (size << 8) | size1;
        if (len < 10 + pading + size) return data;

        let result = new Uint8Array(size);
        for (let i = 0; i < size; i++) {
            result[i] = data[10 + pading + i] ^ rc4_key;
        }
        return result;
    }

    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    public getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void {
        function onResGet(e: string): void {
            onSuccess.call(thisObject, e);
        }
        function onResError(e: RES.ResourceEvent): void {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }

        if (typeof generateEUI !== 'undefined') {
            egret.callLater(() => {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl(zj.AppConfig.ProjectUrlRoot + "resource/gameEui.zip", (data, url) => {
                // console.log("game eui data: " + data);
                console.log("game eui url: " + url);
                data = ThemeAdapter.decode(data);
                JSZip.loadAsync(data).
                    then((zipdata) => {
                        zipdata.file("gameEui.json").async("text")
                            .then(text => {
                                // console.log("game eui text: " + text);
                                try {
                                    let json = JSON.parse(text);
                                    window["JSONParseClass"]["setData"](json);
                                    egret.callLater(() => {
                                        onSuccess.call(thisObject, generateEUI2);
                                    }, this);
                                } catch(e) {
                                    console.log(`async("text") catch: ` + JSON.stringify(e));
                                }
                            }).catch((e) => {
                                console.log(`zipdata.file("gamEijson").async("text") catch: ` + JSON.stringify(e));
                            });
                    }).catch((e) => {
                        console.log("JSZip.loadAsync(data) catch: " + JSON.stringify(e));
                    });
            }, this, RES.ResourceItem.TYPE_BIN);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                let dataPath = url.split("/");
                dataPath.pop();
                let dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, (data) => {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(() => {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                } else {
                    egret.callLater(() => {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(() => {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    }
}

declare var generateEUI: { paths: string[], skins: any }
declare var generateEUI2: { paths: string[], skins: any }
declare var generateJSON: { paths: string[], skins: any }