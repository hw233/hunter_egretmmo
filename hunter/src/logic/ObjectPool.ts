namespace zj {
export class ObjectPool {
	/**对象池*/
	private pool = {};
	/**对象池清理计数 战斗N场后清理一次 */
	// private releaseNum: number;
	public constructor() {
		// this.releaseNum = 0;
	}
	/** 
	 * 从池中拿出一个对象,有就拿,没有就创建! 
	 * @param itemName:存进对应名字的池
	 * @param item:class
	*/
	public getItem(itemName:string,item:any){
		let obj;
		if(!this.pool[itemName]){
			this.pool[itemName]=[];
		}
		if(this.pool[itemName].length == 0){
			obj = new item();
		}else{
			// obj = this.pool[itemName][0];
			// this.pool[itemName].splice(0,1);
			obj = this.pool[itemName].shift();
		}	
		return obj;
	}


	/**
	 * 根据类型将对象回收对象池。（注意：放入对象池的对象必须停止放入前停止计时器以及事件，等影响垃圾回收的方法）
	 * @param itemName对象类名
	 * @param item对象实例
	 * */
	public returnItem(itemName:string,item:any){
		if(!this.pool[itemName]){//这个判断是为了那些不需要在对象池创建的用
			this.pool[itemName] = [];
		}
		this.pool[itemName].push(item);
	}


	/**根据类型释放对应的对象池*/
	public destoryTypePool(itemName:string){
		if(this.pool[itemName]){
			let arr = this.pool[itemName];
			while(arr.length > 0){
				if(itemName != "BitmapLabel" 
					&& itemName != "Bitmap" 
					&& itemName != "FightNumberEffect" 
					&& itemName != "SkillHit"){//不需要调用这个方法
					zj.CC_SAFE_DELETE(arr[0]);
				}
				arr.splice(0,1);
			}
		}
	}
	/**释放对象池所有对象 */
	public destoryPool(){
		// if(++this.releaseNum > 8){
		// 	this.releaseNum = 0;
			for(let k in this.pool){
				this.destoryTypePool(k);
			}
			this.pool = {};
		// }
	}
}
}