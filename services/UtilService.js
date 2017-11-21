define(['jquery', 'qvangular'], function ($, qvangular) {
	return qvangular.service("utilService", function () {

		this.isMobile = false;
		this.screenWidth = window.innerWidth;

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			this.isMobile = true;
		}

		this.closeMenus = function (listItems, cId) {
			listItems.forEach(function (listitem) {
				if (listitem.cId !== cId) {
					listitem.isOpen = false;
					listitem.show = false;
					qvangular.$rootScope.tcmenuNoScroll = true;
				}
			});
		};

		this.handleMenuScroll = function (itemId) {
			var $item = $('#item_' + itemId)[0];
			var $menu = this.findParentByIdPrefix($item, 'hico-menu-vertical_');

			if (!$menu) {
				// horizontal menu is special
				$menu = this.findParentByIdPrefix($item, 'panel_');
				if ($menu) $menu = $menu.children[0];
			}

			var offset = $item.offsetTop;
			var $parentItem = this.findParentByIdPrefix($item, 'item_');
			if ($parentItem) offset += $parentItem.offsetTop;

			if ($menu) {
				$($menu).animate({ scrollTop: offset }, {
					duration: 'slow',
					easing: 'swing'
				});
			}
		};

		this.findParentByIdPrefix = function ($item, idPrefix) {
			var $parent = $item.parentElement;
			if ($parent === null) return null;

			if ($parent.id && $parent.id.indexOf(idPrefix) === 0) return $parent;

			return this.findParentByIdPrefix($parent, idPrefix);
		};
	});
});