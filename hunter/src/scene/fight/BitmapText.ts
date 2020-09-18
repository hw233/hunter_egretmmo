namespace zj {
export class BitmapText extends egret.Sprite{
	public constructor() {
		super();
		this.init();
	}
	private imageMap = {};
	private image:egret.Bitmap;
	public bitWidth = 0;
	
	private init(){
		this.image=new egret.Bitmap();
		//this.addChild(this.image);
	}
	public setData(url:string,txt:string="0123456789"){
		let texture:egret.Texture = RES.getRes(url);
		let width = texture.textureWidth;
		let height = texture.textureHeight;
		this.image.texture = texture;
		let arr:string[] = txt.split("");
		this.bitWidth = width/arr.length;
		let rect:egret.Rectangle=new egret.Rectangle(0,0,this.bitWidth,height);
		
		for(let i=0;i<arr.length;i++){
			rect.x = i * this.bitWidth;
			var rt:egret.RenderTexture = new egret.RenderTexture;
			rt.drawToTexture( this.image, rect );
			this.imageMap[arr[i]] = rt;
		}
		this.image = null;
		for(let i = 0;i<10;i++){
			let img = new egret.Bitmap();
			this.bitmapArr.push(img);
		}
	}
	private bitmapArr = [];
	private clearImage(){
		// for(let key in this.imageMap){
		// 	let img = this.imageMap[key];
		// 	img.x=0;
		// 	if(img.stage){
		// 		this.removeChild(img);
		// 	}
		// }
	}
	public set setText(num:string){
		this.removeChildren();
		let arr:string[] = num.split("");
		for(let i=0;i<arr.length;i++){
			let img = this.bitmapArr[i];
			img.texture = this.imageMap[arr[i]];
			this.addChild(img);
			img.x = i * this.bitWidth;
		}
	}
}
}