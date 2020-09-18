namespace zj {

	// 改版主城方向键
	// 翟伟利
	// 2019.11.7

	export class MainCityWalk extends UI{
		private mainCityUI: MainCitySceneNew;
		private groupBG: eui.Group;
		private groupWalk: eui.Group;
		private imgDot: eui.Image;
		private _isTouch: boolean;
		private posCenter: egret.Point;
		private dotDisMax: number;
		private _currArc: number;
		public constructor() {
			super();
            this.skinName = "resource/skins/main/MainCityWalkSkin.exml";
			this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
		}

		public init(mainCityUI: MainCitySceneNew){
			this.mainCityUI = mainCityUI;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegan, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMoved, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnded, this);

			let centerx = this.groupWalk.left + this.groupWalk.width / 2;
			let centery = this.height - this.groupWalk.bottom - this.groupWalk.width / 2;

			this.posCenter = new egret.Point(centerx, centery);
			this.dotDisMax = (this.groupWalk.width - this.imgDot.width) / 2;
			this._currArc = 0;
			this.imgDot.visible = true;
			this.setUp();
		}
		public isTouch(): boolean{
			return this._isTouch;
		}
		public currArc(): number{
			return Math.floor(this._currArc);
		}
		public setUp(){
			this._isTouch = false;
			this.groupBG.visible = false;
			this.alpha = 0.5;
			this.imgDot.x = this.posCenter.x;
			this.imgDot.y = this.posCenter.y;
		}
		private updatePos(touchX, touchY){
			let dis = Util.pDisPoint(this.posCenter.x, this.posCenter.y, touchX, touchY);
			if(dis < 4){
				return;
			}
			if(dis > this.dotDisMax){
				let pc = this.dotDisMax / dis;
				this.imgDot.x = this.posCenter.x + (touchX - this.posCenter.x) * pc;
				this.imgDot.y = this.posCenter.y + (touchY - this.posCenter.y) * pc;
			} else {
				this.imgDot.x = touchX;
				this.imgDot.y = touchY;
			}
			this._currArc = 180 - Util.angleTo360(this.posCenter.x, this.posCenter.y, touchX, touchY);
			return;
		}
		private OnTouchBegan(touchs: egret.TouchEvent) {
			if(this.mainCityUI.isMapLock()){
				return;
			}
			this.updatePos(touchs.stageX - Game.UIManager.x, touchs.stageY - Game.UIManager.y);
			this.groupBG.visible = true;
			this.alpha = 1;
			this._isTouch = true;
			this.mainCityUI.onWalkStart();
		}
		private OnTouchMoved(touchs: egret.TouchEvent) {
			if(this._isTouch){
				this.updatePos(touchs.stageX - Game.UIManager.x, touchs.stageY - Game.UIManager.y);
			}
		}
		private OnTouchEnded(touchs: egret.TouchEvent) {
			this.setUp();
			this.mainCityUI.onWalkEnd();
		}
	}
}