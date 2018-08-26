/**
 * 显示对象的封装
 */
class DisUtil {
	/**
	 * 设置大小
	 * @param disObj 目标容器
	 * @param width 宽
	 * @param height 高
	 */
	public static size(disObj : egret.DisplayObject, width : number, height : number) {
		disObj.width = width;
		disObj.height = height;
	}

	/**
	 * 设置锚点
	 * @param disObj 显示对象
	 * @param anchoX x锚点
	 * @param anchoY y锚点
	 */
	public static ancho(disObj : egret.DisplayObject, anchoX : number, anchoY : number) {
		disObj.anchorOffsetX = anchoX;
		disObj.anchorOffsetY = anchoY;
	}

	/**
	 * 设置坐标
	 * @param disObj 显示对象
	 * @param x 横坐标
	 * @param y 纵坐标
	 */
	public static location(disObj : egret.DisplayObject, x : number, y : number) {
		disObj.x = x;
		disObj.y = y;
	}
	/**
	 * 获取一个复制显示对象枚举属性的显示对象
	 * @param disObj 复制对象的宽高，坐标设置为0
	 */
	public static getCloneBase(disObj : egret.DisplayObject) : egret.DisplayObject {
		var clone = new egret.DisplayObject();
		DisUtil.location(clone,0,0);
		DisUtil.size(clone,disObj.width,disObj.height);
		return clone;
	}

	/**
	 * 定义“基础型显示对象”为锚点位于左上角，x缩放、y缩放均为1的显示对象
	 * 获取对于显示对象A而言，B显示对象的“基础型显示对象”,A为B的祖先
	 * @param child 显示对象B
	 * @param ancient 显示对象A
	 */
	public static getRelaRect( child : egret.DisplayObject, ancient ?: egret.DisplayObjectContainer ) : egret.DisplayObject {
		var rect : egret.DisplayObject = DisUtil.getCloneBase( child );
		
		rect = DisUtil.getInRectRelaRect( rect, child, ancient );
		return rect;
	}

	/**
	 * 获取对于显示对象A而言的"基础型显示对象"B 对于C而言的 “基础型显示对象”D
	 * @param rect “基础型显示对象”B
	 * @param parent 显示对象A
	 * @param ancient 显示对象C
	 */
	public static getInRectRelaRect( rect : egret.DisplayObject, parent : egret.DisplayObject, ancient : egret.DisplayObjectContainer ) : egret.DisplayObject {
		var parX : number, parY : number, parScaleX : number, parScaleY : number;
		while( parent != ancient ) {
			if( !egret.is( parent, "egret.Stage" ) ) {
				parX = parent.x;
				parY = parent.y;
				parScaleX = parent.scaleX;
				parScaleY = parent.scaleY;
			} else {
				parX = 0;
				parY = 0;
				parScaleX = 1;
				parScaleY = 1;
			}
			rect.x = parX + ( rect.x - parent.anchorOffsetX ) * parScaleX;
			rect.y = parY + ( rect.y - parent.anchorOffsetY ) * parScaleY;
			rect.width *= parScaleX;
			rect.height *= parScaleY;

			parent = parent.parent;
		}
		return rect;
	}

	
	/**
	 * 给显示对象布局
	 * @param disObj 目标显示对象
	 * @param ancient 参考对象，无则默认为浏览器窗口
	 */
	public static get(disObj : egret.DisplayObject, ancient ?: egret.DisplayObjectContainer ) {
		var relRect = DisUtil.getRelaRect(disObj, ancient);
		return new situate(relRect, disObj, ancient);
	}

	/**
	 * 设置显示对象的缩放
	 * @param disObj 设置对象
	 * @param scalNum 缩放值
	 */
	public static setScal(disObj : egret.DisplayObject, scalNum : number) {
		disObj.scaleX = disObj.scaleY = scalNum;
	}
	/**
	 * 缩放当前显示对象
	 * @param disObj 缩放对象
	 * @param scaleNum 缩放值
	 */
	public static scale(disObj : egret.DisplayObject, scalNum : number) {
		disObj.scaleX *= scalNum;
		disObj.scaleY *= scalNum;
	}
	/**
	 * 通过改变宽高来达到缩放的效果
	 * @param disObj 显示对象
	 * @param scaleNum 缩放大小
	 */
	public static scalLen(disObj : egret.DisplayObject, scaleNum : number) {
		disObj.width *= scaleNum;
		disObj.height *= scaleNum;
	}
	/**
	 * 输出显示对象的状态
	 * @param disObj 显示对象
	 */
	public static disShow(disObj : egret.DisplayObject, fixNum ?: number) {
		fixNum = fixNum ? fixNum : 1;
		console.log(`x:${disObj.x.toFixed(fixNum)},y:${disObj.y.toFixed(fixNum)},anchorOffsetX:${disObj.anchorOffsetX.toFixed(fixNum)},anchorOffsetY:${disObj.anchorOffsetY.toFixed(fixNum)},scaleX:${disObj.scaleX.toFixed(fixNum)},scaleY:${disObj.scaleY.toFixed(fixNum)},width:${disObj.width.toFixed(fixNum)},height:${disObj.height.toFixed(fixNum)},alpha:${disObj.alpha}`);
	}
}
/**
 * 用于链式对显示对象进行布局
 */
class situate{
	//祖先容器的宽度
	private conWidth : number;
	//祖先容器的高度
	private conHeight : number;
	//锚点位置占宽比
	private anRateX : number;
	//锚点位置占高比
	private anRateY : number
	public constructor(private relRect : egret.DisplayObject, private disObj : egret.DisplayObject, private ancient : egret.DisplayObjectContainer) {
		if(ancient) {
			this.conWidth = ancient.width;
			this.conHeight = ancient.height;
		} else {
			this.conWidth = window.innerWidth;
			this.conHeight = window.innerHeight;
		}
		this.anRateX = disObj.anchorOffsetX / disObj.width;
		this.anRateY = disObj.anchorOffsetY / disObj.height;
	}
	/**
	 * 进行缩放的同时进行其他处理
	 * @param scaleNum 缩放大小
	 */
	private scale(scaleNum : number) {
		var self = this;
		var relDistanceX = this.anRateX * (scaleNum - 1) * self.relRect.width;
		var relDistanceY = this.anRateY * (scaleNum - 1) * self.relRect.height;
		DisUtil.scale(self.disObj, scaleNum);
		DisUtil.scalLen(self.relRect, scaleNum);
		//更正坐标
		self.relRect.x -= relDistanceX;
		self.relRect.y -= relDistanceY;
	}
	/**
	 * 水平移动同时进行其他处理
	 * @param distance 相对距离
	 * @param scaleNum 缩放大小
	 */
	private moveX(distance:number, scaleNum : number) {
		var self = this;
		self.relRect.x += distance;
		self.disObj.x += (distance*=scaleNum);
	}
	/**
	 * 竖直移动同时进行其他处理
	 * @param distance 相对距离
	 * @param scaleNum 缩放大小
	 */
	private moveY(distance:number, scaleNum : number) {
		var self = this;
		self.relRect.y += distance;
		self.disObj.y += (distance*=scaleNum);
	}
	/**
	 * 适应宽度
	 */
	public fitW() : situate {
		var self = this;
		if(self.relRect.width == 0) {
			egret.error(`宽度为0的显示对象无法应用“适应宽度”的缩放模式`);
			return this;
		}
		//获取父容器、目标容器缩放比
		var scaleNum = self.conWidth / self.relRect.width;
		self.scale(scaleNum);
		
		self.cenHor();
		return self;
	}
	/**
	 * 适应高度
	 */
	public fitH() : situate {
		var self = this;
		if(self.relRect.height == 0) {
			egret.error(`高度为0的显示对象无法应用“适应高度”的缩放模式`);
			return this;
		}
		//获取父容器、目标容器缩放比
		var scaleNum = self.conHeight / self.relRect.height;
		self.scale(scaleNum);
		
		self.cenVer();
		return self;
	}
	/**
	 * 被包含在内
	 */
	public beCon() : situate {
		var self = this;
		var conRate : number = self.conWidth / self.conHeight;
		var rectRate : number = self.relRect.width / self.relRect.height;
		var scaleNum : number = rectRate >= conRate ? self.conWidth / self.relRect.width : self.conHeight / self.relRect.height ;
		self.scale(scaleNum)
		self.center();
		return this;
	}
	/**
	 * 覆盖全部
	 */
	public cover() : situate {
		var self = this;
		var conRate : number = self.conWidth / self.conHeight;
		var rectRate : number = self.relRect.width / self.relRect.height;
		var scaleNum : number = rectRate >= conRate ? self.conHeight / self.relRect.height : self.conWidth / self.relRect.width ;
		self.scale(scaleNum)
		self.center();
		return this;
	}
	/**
	 * 水平垂直居中
	 */
	public center() : situate {
		this.cenVer();
		this.cenHor();
		return this;
	}
	/**
	 * 垂直居中
	 */
	public cenVer() : situate {
		var self = this;
		var yDistance : number =  self.conHeight / 2 - self.relRect.y - self.relRect.height / 2;
		var scaleNumY : number = self.disObj.height * self.disObj.scaleY / self.relRect.height;
		self.moveY(yDistance,scaleNumY);
		return self;
	}
	/**
	 * 水平居中
	 */
	public cenHor() : situate {
		var self = this;
		var xDistance : number =  self.conWidth / 2 - self.relRect.x - self.relRect.width / 2;
		var scaleNumX : number = self.disObj.width * self.disObj.scaleX / self.relRect.width;
		self.moveX(xDistance,scaleNumX);
		
		return self;
	}
	/**
	 * 居左
	 * @param distance 距离
	 */
	public left(distance ?: number) : situate {
		distance = distance == null ? 0 : distance;
		var self = this;
		var scaleNumX : number = self.disObj.width * self.disObj.scaleX / self.relRect.width;
		var xDistance : number = distance - self.relRect.x;
		self.moveX(xDistance, scaleNumX);
		return this;
	}
	/**
	 * 居右
	 * @param distance 距离
	 */
	public right(distance ?: number) : situate {
		var self = this;
		distance = distance == null ? 0 : distance;
		var scaleNumX : number = self.disObj.width * self.disObj.scaleX / self.relRect.width;
		var xDistance : number = self.conWidth - self.relRect.x - self.relRect.width - distance;
		self.moveX(xDistance,scaleNumX);
		return this;
	}
	/**
	 * 居顶
	 * @param distance 距离
	 */
	public top(distance ?: number) : situate {
		distance = distance == null ? 0 : distance;
		var self = this;
		var scaleNumY : number = self.disObj.height * self.disObj.scaleY / self.relRect.height;
		var yDistance : number = distance - self.relRect.y;
		self.moveY(yDistance, scaleNumY);
		return this;
	}
	/**
	 * 居底
	 * @param distance 距离
	 */
	public bottom(distance ?: number) : situate {
		distance = distance == null ? 0 : distance;
		var self = this;
		distance = distance == null ? 0 : distance;
		var scaleNumY : number = self.disObj.height * self.disObj.scaleY / self.relRect.height;
		var yDistance : number = self.conHeight - self.relRect.y - self.relRect.height - distance;
		self.moveY(yDistance, scaleNumY);
		return this;
	}
	/**
	 * 输出当前“基础型对象的坐标和宽高”
	 * @param fixNum 精度
	 */
	public show(fixNum ?: number) : situate {
		fixNum = fixNum ? fixNum : 1;
		var rect = this.relRect;
		console.log(`x:${rect.x.toFixed(fixNum)},y:${rect.y.toFixed(fixNum)},width:${rect.width.toFixed(fixNum)},height:${rect.height.toFixed(fixNum)}`);
		return this;
	}
}