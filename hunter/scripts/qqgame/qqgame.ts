import * as fs from 'fs';
import * as path from 'path';
export class QQgamePlugin implements plugins.Command {

    constructor() {
    }
    async onFile(file: plugins.File) {
        if (file.extname == '.js') {
            const filename = file.origin;
            if (filename == "libs/modules/promise/promise.js" || filename == 'libs/modules/promise/promise.min.js') {
                return null;
            }
            if (filename == 'libs/modules/egret/egret.js' || filename == 'libs/modules/egret/egret.min.js') {
                let content = file.contents.toString();
                content += `;window.egret = egret;`;
                content = content.replace(/definition = __global/, "definition = window");
                file.contents = Buffer.from(content);
            }
            else {
                let content = file.contents.toString();
                if (
                    filename == "libs/modules/res/res.js" ||
                    filename == 'libs/modules/res/res.min.js' ||
                    filename == 'libs/modules/assetsmanager/assetsmanager.min.js' ||
                    filename == 'libs/modules/assetsmanager/assetsmanager.js'
                ) {
                    content += ";window.RES = RES;"
                }
                if (filename == "libs/modules/eui/eui.js" || filename == 'libs/modules/eui/eui.min.js') {
                    content += ";window.eui = eui;"
                }
                if (filename == 'libs/modules/dragonBones/dragonBones.js' || filename == 'libs/modules/dragonBones/dragonBones.min.js') {
                    content += ';window.dragonBones = dragonBones';
                }
                if (filename == 'libs/modules/jszip/jszip.js' || filename == 'libs/modules/jszip/jszip.min.js') {
                    content = content.replace(/module\.exports/, "window.JSZip");
                }
                //if (filename == 'libs/modules/zlib/zlib.js' || filename == 'libs/modules/zlib/zlib.min.js') {
                //    content += ';window.Zlib = Zlib';
                //}
                if (filename == 'libs/modules/md5/md5.js' || filename == 'libs/modules/md5/md5.min.js') {
                    content += ';window.md5 = md5';
                }
                if (filename == 'libs/modules/tiled/tiled.js' || filename == 'libs/modules/tiled/tiled.min.js') {
                    content += ';window.tiled = tiled';
                }
                if (filename == 'libs/modules/message/message.js' || filename == 'libs/modules/message/message.min.js') {
                    content += ';window.aone = aone;window.message = message;';
                }
                if (filename == 'libs/modules/frame/frame.js' || filename == 'libs/modules/frame/frame.min.js') {
                    content += ';window.zj = zj;';
                }
                if (filename == "libs/modules/zlib/zlib.js" || filename == 'libs/modules/zlib/zlib.min.js') {
                    // content += ";window.Zlib = Zlib;window.Zlib.Gunzip =Zlib.Gunzip;"
                    content = `(function (global, factory) { 
                                typeof exports === 'object' && typeof module !== 'undefined'
                                    ? module.exports = factory(global)
                                    : typeof define === 'function' && define.amd
                                    ? define(factory) : null
                                }((
                                typeof self !== 'undefined' ? self
                                    : typeof window !== 'undefined' ? window
                                    : typeof global !== 'undefined' ? global
                                        : this
                                ), function (global) {`+ content + `return { Zlib: global.Zlib }
                                }));module.exports = Zlib;`;
                }
                content = "var egret = window.egret;" + content;
                if (filename == 'main.js') {
                    content = "var zj = window.zj;" + content;
                    content += "\n;window.Main = Main;"
                    content = content.replace(/\"resource\/gameEui\.json\"/, "zj.AppConfig.ProjectUrlRoot+\"resource/gameEui.json\"");
                }
                file.contents = Buffer.from(content);
            }
        }
        return file;
    }
    async onFinish(pluginContext: plugins.CommandContext) {
        //同步 index.html 配置到 game.js
        const gameJSPath = path.join(pluginContext.outputDir, "game.js");
        if(!fs.existsSync(gameJSPath)) {
            console.log(`${gameJSPath}不存在，请先使用 Launcher 发布QQ小游戏`);
            return;
        }
        let gameJSContent = fs.readFileSync(gameJSPath, { encoding: "utf8" });
        const projectConfig = pluginContext.buildConfig.projectConfig;
        projectConfig.frameRate = 30; // QQ小游戏帧率固定为30
        const optionStr =
            `entryClassName: ${projectConfig.entryClassName},\n\t\t` +
            `orientation: ${projectConfig.orientation},\n\t\t` +
            `frameRate: ${projectConfig.frameRate},\n\t\t` +
            `scaleMode: ${projectConfig.scaleMode},\n\t\t` +
            `contentWidth: ${projectConfig.contentWidth},\n\t\t` +
            `contentHeight: ${projectConfig.contentHeight},\n\t\t` +
            `showFPS: ${projectConfig.showFPS},\n\t\t` +
            `fpsStyles: ${projectConfig.fpsStyles},\n\t\t` +
            `showLog: ${projectConfig.showLog},\n\t\t` +
            `maxTouches: ${projectConfig.maxTouches},`;
        const reg = /\/\/----auto option start----[\s\S]*\/\/----auto option end----/;
        const replaceStr = '\/\/----auto option start----\n\t\t' + optionStr + '\n\t\t\/\/----auto option end----';
        gameJSContent = gameJSContent.replace(reg, replaceStr);
        fs.writeFileSync(gameJSPath, gameJSContent);

        //修改横竖屏
        let orientation;
        if (projectConfig.orientation == '"landscape"') {
            orientation = "landscape";
        }
        else {
            orientation = "portrait";
        }
        const gameJSONPath = path.join(pluginContext.outputDir, "game.json");
        let gameJSONContent = JSON.parse(fs.readFileSync(gameJSONPath, { encoding: "utf8" }));
        gameJSONContent.deviceOrientation = orientation;
        gameJSONContent.networkTimeout.request = 30000;
        gameJSONContent.networkTimeout.connectSocket = 10000;
        gameJSONContent.networkTimeout.uploadFile = 10000;
        gameJSONContent.networkTimeout.downloadFile = 10000;
        fs.writeFileSync(gameJSONPath, JSON.stringify(gameJSONContent, null, "\t"));
    }
}