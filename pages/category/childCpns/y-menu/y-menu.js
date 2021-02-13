Component({
	properties: {
		leftMenuList: {
			type: Array,
			value: [],
		},
	},
	data: {
		// 被点击的左侧菜单序号
		currentIndex: 0,
	},
	methods: {
		handleItemTap(e) {
			let index = e.currentTarget.dataset.index
			this.setData({
				currentIndex: index,
			})
			this.triggerEvent('menuclick', {index}, {})
		},
	},
})
