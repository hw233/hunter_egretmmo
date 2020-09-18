namespace zj {
export class PlayerBuffSystem {
	public constructor() {
	}
	public init(){

	}
	public uninit() {
		
	}
	private MAX_BUFF_SHOW = 8;
	public SetBuffLayer(tbl){
		let show_tbl = [];
		let index = 0;
		for(let k in tbl){
			let v = tbl[k];
			if(v.is_showIcon){
				let shieldNum = 0;
				if(v.buff_type == TableEnum.TableBufferType.BUFFER_SHIELD_RELATED_NUM){
					shieldNum = v.sec_value;
				}
				if(v.is_foldIcon == -1){
					if(show_tbl.length != 0){
						if(index > this.MAX_BUFF_SHOW){
							index = index % this.MAX_BUFF_SHOW;
						}
						show_tbl[index] = [];
						show_tbl[index].push([v.buff_type, 1, shieldNum]);
						index = index + 1;
					}else{
						show_tbl[index] = [];
						show_tbl[index].push([v.buff_type, 1, shieldNum]);
						index = index + 1;
					}
				}else{
					if(show_tbl.length != 0){
						if(index > this.MAX_BUFF_SHOW){
							index = index % this.MAX_BUFF_SHOW;
						}
						let [buffInfo, buffKey] = Table.FindR(show_tbl, function (kk,vv) {
            				return v.buff_type == vv[0][0];
        				});
						if(buffInfo == null){
							show_tbl[index] = [];
							show_tbl[index].push([v.buff_type, 1, shieldNum]);
							index = index + 1;
						}else{
							if(buffInfo[0][1] < v.is_foldIcon){
								show_tbl[buffKey][0][1] = buffInfo[0][1] + 1;
							}
							show_tbl[buffKey][0][2] = buffInfo[0][2] + shieldNum;
						}
					}else{
						show_tbl[index] = [];
						show_tbl[index].push([v.buff_type, 1, shieldNum]);
						index = index + 1;
					}
				}
			}
		}
		return show_tbl;
	}
	public FindDiffer(tbl1, tbl2){
		let tbl = [];
		if(tbl1.length != 0 && tbl2.length != 0){
			let more = tbl1.length >= tbl2.length && tbl1.length || tbl2.length;
			let use = tbl1.length >= tbl2.length;
			let index = 0;
			for(let i = 0;i<more;i++){
				if(tbl1[i] != null && tbl2[i]){
					if((tbl1[i][0][0] != tbl2[i][0][0]) || (tbl1[i][0][1] != tbl2[i][0][1]) || (tbl1[i][0][2] != tbl2[i][0][2])){
						tbl[index] = [i, tbl2[i]];
						index = index + 1;
					}
				}else{
					if(use){
						tbl[index] = [i, [[-1, 0, 0]]];
						index = index + 1;
					}else{
						tbl[index] = [i, tbl2[i]];
						index = index + 1;
					}
				}
			}
		}else if(tbl1.length != 0){
			let index = 0;
			for(let i = 0;i<tbl1.length;i++){
				tbl[index] = [i, [[-1, 0, 0]]];
				index = index + 1;
			}
		}else if(tbl2.length != 0){
			let index = 0;
			for(let i = 0;i<tbl2.length;i++){
				tbl[index] = [i, tbl2[i]];
				index = index + 1;
			}
		}
		return tbl;
	}
	public GetBuffsAttribTbl(buffs){
		let result = Helper.CreateGeneralAttrTbl0();
		for(let j = 0;j<buffs.length;j++){
			let tblAttrib = this.GetAttribTbl(buffs[j]);
			for(let i = TableEnum.EnumGelAttrib.ATTR_HP;i<TableEnum.EnumGelAttrib.ATTR_MAX;i++){
				result[i] = result[i] + tblAttrib[i];
			}
		}
		return result;
	}
	public GetAttribTbl(id){
		let result = Helper.CreateGeneralAttrTbl0();
		let tbl = TableBuff.Item(id);
		for(let i = TableEnum.EnumGelAttrib.ATTR_HP;i<TableEnum.EnumGelAttrib.ATTR_MAX;i++){
			let value = tbl[TableEnum.EnumGelAttribName[i]];
			if(value != null){
				result[i] = value;
			}
		}
		return result;
	}
}
}