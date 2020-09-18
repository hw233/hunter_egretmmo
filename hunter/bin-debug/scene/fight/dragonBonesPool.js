var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**龙骨动画对象池*/
var zj;
(function (zj) {
    var dragonBonesPool = (function () {
        function dragonBonesPool() {
            /**对象池*/
            this.pool = {};
            this.dbArr = [];
        }
        dragonBonesPool.getInstance = function () {
            if (dragonBonesPool._instance == null) {
                dragonBonesPool._instance = new dragonBonesPool();
            }
            return dragonBonesPool._instance;
        };
        /**
         * 根据类型将对象回收对象池。
         * @param itemName对象类名
         * @param item对象实例
         * */
        dragonBonesPool.prototype.returnItem = function (itemName, item) {
            if (!this.pool[itemName]) {
                this.pool[itemName] = [];
            }
            this.pool[itemName].push(item);
        };
        /**根据类型从对象池里拿一个出来，如果没有就返回null*/
        dragonBonesPool.prototype.getTypeItem = function (itemName) {
            if (!this.pool[itemName]) {
                this.pool[itemName] = [];
            }
            var arr = this.pool[itemName];
            if (arr.length > 0) {
                var obj = arr[0];
                arr.splice(0, 1);
                return obj;
            }
            return null;
        };
        // public removeFromStage(spine: dragonBones.EgretArmatureDisplay, name: string){
        // 	let list: dragonBones.EgretArmatureDisplay[] = this.pool[name];
        // 	if (list) {
        // 		for(let i = 0; i < list.length; ++i){
        // 			if(list)
        // 		}
        // 		clearSpine(spine.spine);
        // 	}
        // }
        /**根据类型释放对应的对象池*/
        dragonBonesPool.prototype.destoryTypePool = function (itemName) {
            if (this.pool[itemName]) {
                var arr = this.pool[itemName];
                while (arr.length > 0) {
                    var spine = arr[0];
                    zj.clearSpine(spine.spine);
                    arr.splice(0, 1);
                    spine = null;
                }
            }
        };
        /**释放对象池所有对象 */
        dragonBonesPool.prototype.destoryPool = function () {
            // if (this.dbArr.length > 150) {
            for (var k in this.pool) {
                this.destoryTypePool(k);
                this.pool[k].length = 0;
            }
            this.pool = {};
            while (this.dbArr.length > 0) {
                var spine = this.dbArr[0];
                zj.clearSpine(spine.spine);
                this.dbArr.splice(0, 1);
                spine.spine = null;
                spine = null;
            }
            this.dbArr.length = 0;
            // Game.DragonBonesResManager.checkFactory();
            // }
        };
        return dragonBonesPool;
    }());
    zj.dragonBonesPool = dragonBonesPool;
    __reflect(dragonBonesPool.prototype, "zj.dragonBonesPool");
})(zj || (zj = {}));
//# sourceMappingURL=dragonBonesPool.js.map