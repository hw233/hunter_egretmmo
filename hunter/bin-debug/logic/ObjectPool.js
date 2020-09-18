var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var ObjectPool = (function () {
        /**对象池清理计数 战斗N场后清理一次 */
        // private releaseNum: number;
        function ObjectPool() {
            /**对象池*/
            this.pool = {};
            // this.releaseNum = 0;
        }
        /**
         * 从池中拿出一个对象,有就拿,没有就创建!
         * @param itemName:存进对应名字的池
         * @param item:class
        */
        ObjectPool.prototype.getItem = function (itemName, item) {
            var obj;
            if (!this.pool[itemName]) {
                this.pool[itemName] = [];
            }
            if (this.pool[itemName].length == 0) {
                obj = new item();
            }
            else {
                // obj = this.pool[itemName][0];
                // this.pool[itemName].splice(0,1);
                obj = this.pool[itemName].shift();
            }
            return obj;
        };
        /**
         * 根据类型将对象回收对象池。（注意：放入对象池的对象必须停止放入前停止计时器以及事件，等影响垃圾回收的方法）
         * @param itemName对象类名
         * @param item对象实例
         * */
        ObjectPool.prototype.returnItem = function (itemName, item) {
            if (!this.pool[itemName]) {
                this.pool[itemName] = [];
            }
            this.pool[itemName].push(item);
        };
        /**根据类型释放对应的对象池*/
        ObjectPool.prototype.destoryTypePool = function (itemName) {
            if (this.pool[itemName]) {
                var arr = this.pool[itemName];
                while (arr.length > 0) {
                    if (itemName != "BitmapLabel"
                        && itemName != "Bitmap"
                        && itemName != "FightNumberEffect"
                        && itemName != "SkillHit") {
                        zj.CC_SAFE_DELETE(arr[0]);
                    }
                    arr.splice(0, 1);
                }
            }
        };
        /**释放对象池所有对象 */
        ObjectPool.prototype.destoryPool = function () {
            // if(++this.releaseNum > 8){
            // 	this.releaseNum = 0;
            for (var k in this.pool) {
                this.destoryTypePool(k);
            }
            this.pool = {};
            // }
        };
        return ObjectPool;
    }());
    zj.ObjectPool = ObjectPool;
    __reflect(ObjectPool.prototype, "zj.ObjectPool");
})(zj || (zj = {}));
//# sourceMappingURL=ObjectPool.js.map