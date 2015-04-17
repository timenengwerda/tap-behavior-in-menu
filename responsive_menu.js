//everything below the responsiveFromWidth var will be prepared for responsiveness
var responsiveFromWidth = 768;
function ResponsiveMenu (obj) {
	/*
		This method is used to create some responsive listeners for the menu
		
		For example: clicking a menu item with a submenu will not be navigated to the page right away but the submenu will pop out
		a second click will navigate the user to the page. 
	*/
	
	this.obj = obj;
	this.allLinks = this.obj.find('li a');
	//Using proxies is overrated, that = this will suffice within jQuery objects :-p
	var that = this;
	
	this.resetAllClickAmounts = function (exceptionLink) {
		this.allLinks.not(exceptionLink).each(function () {
			//Remove the focus class from the LI that holds this links
			$(this).parent().removeClass('focus');
			
			//Set the click amount back to 0.
			that.setClickAmount($(this), 0);
		});
	}
	
	this.getClickAmount = function (link) {
		return link.data('clickamount');	
	}
	
	this.setClickAmount = function (link, amount) {
		link.data('clickamount', amount);	
	}
	
	this.linkHasSubmenu = function (link) {
		if (link.parent().find('ul').html()) {
			return true;
		}
		
		return false;
	}
	
	this.linkClicked = function (clickedLinkObj) {
		this.resetAllClickAmounts(clickedLinkObj);
		
		//add a focus class to the LI that holds this link
		clickedLinkObj.parent().addClass('focus');
		
		//If the clickamount is more than 0 it has been clicked before, so navigate to the href the link gives you
		//If the link doesnt have a submenu along with it, it's okay to navigate to the page right away aswell.
		if (this.getClickAmount(clickedLinkObj) > 0 || !this.linkHasSubmenu(clickedLinkObj)) {
			window.location = clickedLinkObj.attr('href');
		} else {
			//The link hasnt been clicked, higher the clickamount. if its clicked again, it will turn up in the IF above.
			this.setClickAmount(clickedLinkObj, this.getClickAmount(clickedLinkObj)+1);
		}
	}
	
	//attach listener to every list item link
	this.allLinks.each(function () {
		//Every link will be given a data attribute which shows if this is their first time being clicked or the second(in a row)
		//Since we're instantiating them now, all data attributes will have a clickamount of 0.
		that.setClickAmount($(this), 0);
		
		//When a user clicks or touchend's a link, go to `linkClicked`
		$(this).on('click touchend', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			that.linkClicked($(this));
			
		});
	});
	
	this.resetAll = function () {
		this.allLinks.each(function () {
			that.setClickAmount($(this), 0);
			$(this).off('click touchend');
			$(this).parent().removeClass('focus');
		});
	}
	
}

var responsiveMenu = null;
function responsiveMenuInit (obj) {	
	if (!obj) {
		alert("The object given is empty!");
	}
	
    
    var windowWidth = $(window).width();
    
    if (responsiveFromWidth >= windowWidth) {
    	//The window size is smaller than the given width so the responsive menu will be initiated(If not already done). 
    	//Attaching listeners etc. for responsive use
    	if (responsiveMenu == null) {
    	  	//Only instantiate once.
    	  	responsiveMenu = new ResponsiveMenu(obj);
    	}	
    } else {
    	//The window size is higher than required. If a responsiveMenu was made, reset the listeners and nullify it after.
    	if (responsiveMenu != null) {
    		responsiveMenu.resetAll();
    		responsiveMenu = null;
    	}
    }
}



