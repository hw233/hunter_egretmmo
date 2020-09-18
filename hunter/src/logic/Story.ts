namespace zj {
	/**
	 * 剧情对话
	 * created by LianLei
	 */
	export class Story {
		public static bInStory: boolean = null;
		public static bFinish: boolean = null;
		private static storyName: number = -1;
		private static ext: number = -1;
		private static frame: number = -1;
		private static _frame_delay = 2;


		public static isHaveStory(name, ext) {
			// 检验table
			if (StoryDialog.getItemPlot(name, ext)) {
				return true;
			}
			if (StoryDialog.getItemStory(name, ext)) {
				return true;
			}
			return false;
			// return StoryDialog.getItemStory(name, ext) || StoryDialog.getItemPlot(name, ext);
			// let tableStory: { [key: string]: TableClientStory } = TableClientStory.Table();
			// let ret: boolean = false;
			// // console.log(JSON.stringify(tableStory[name]));
			// if (tableStory[name] != null) {
			// 	ret = true;
			// }
			// // 检验文件是存在
			// let fileStatus: boolean;
			// let funcStatus: boolean;
			// if (ret == true) {
			// 	if (("story_" + name) in zj) fileStatus = true;
			// 	if (fileStatus == true) {
			// 		if (("show_" + ext) in zj["story_" + name]) funcStatus = true;
			// 	}
			// }
			// ret = ret && fileStatus && funcStatus;
			// return ret;
		}


		public static update(name, ext) {
			if (this.bInStory) {
				if (this.frame > this._frame_delay) {
					// let dialog:any = Game.UIManager.topDialog();
					// if ('func' in dialog) {
					// 	dialog['func']();
					// }
					if (Game.UIManager.GroupStory.numChildren == 0) {
						this.bInStory = false;
						this.bFinish = true;
						console.log("-----------------------" + "对话结束1" + "----------------------");

						// GlobalCfg.stageTouchEnable = true
					}
				}
				else if (this.frame == this._frame_delay) {
					// GameCommon.EventLockStory(false);
					if (name == 8007) {
						if (Game.TeachSystem.openTime == 0) {
							// let storyInfo = "story_" + name;
							zj.StoryDialog.init();
							// if (zj['story_' + name]['show_' + ext]) {
							// 	zj['story_' + name]['show_' + ext]();
							// 	Game.TeachSystem.openTime = 1;
							// }
							if (this.showStory(name, ext)) {
								Game.TeachSystem.openTime = 1;
							}
						}
						else if (Game.TeachSystem.openTime == 1) {
							this.bFinish = true;
						}
					}
					else {
						// let storyInfo = "story_" + name;
						zj.StoryDialog.init();
						// if (zj['story_' + name]['show_' + ext]) {
						// 	zj['story_' + name]['show_' + ext]();
						// }
						this.showStory(name, ext);
					}
				}
				this.frame = this.frame + 1;
			}

			if (this.storyName != name || this.ext != ext) {
				if (this.isHaveStory(name, ext)) {
					this.bInStory = true;
					this.bFinish = false;
					console.log("-----------------------" + "对话中" + "----------------------");
					// GlobalCfg.stageTouchEnable = false
					// GameCommon.EventLockStory(true)
				}
				else {
					this.bInStory = false;
					this.bFinish = true;
					console.log("-----------------------" + "对话结束2" + "----------------------");
				}
				this.frame = 0;
				this.storyName = name;
				this.ext = ext;
			}
		}

		public static playStory(name, ext, callback: Function = null, thisObj: any = null) {
			console.log("——————————————————————————" + "新手引导剧情对话：name " + name + " ext: " + ext + "——————————————————————————");
			if (this.isHaveStory(name, ext)) {
				zj.StoryDialog.init();
				// if (zj['story_' + name]['show_' + ext]) {
				// 	zj['story_' + name]['show_' + ext]();
				// }
				this.showStory(name, ext, callback, thisObj);
			}
			else {
				Story.bFinish = true;
			}
		}

		private static showStory(name, ext, callback: Function = null, thisObj: any = null): boolean {
			let plotTable: TableClientTableStory[] = StoryDialog.getItemPlot(name, ext);
			if (plotTable) {
				if (StoryDialog.startPlot(plotTable, callback, thisObj)) {
					return true;
				} else {
					console.log("story showStory error: " + name + ", " + ext);
				}
			} else {
				let lables: TableClientTableStory[] = StoryDialog.getItemStory(name, ext);
				if (lables && lables.length > 0) {
					for (let i = 0; i < lables.length; ++i) {
						let content = lables[i];
						StoryDialog.addHead(content.spine, content.action, content.scale, content.flip);
						StoryDialog.addContent(content.direction, content.name, content.content, content.sound);
					}
					StoryDialog.start(true);
					return true;
				}
			}
			// if (zj['story_' + name]['show_' + ext]) {
			// 	zj['story_' + name]['show_' + ext]();
			// 	return true;
			// }
			return false;
		}

		public static isFinish() {
			return this.bFinish;
		}
	}
}