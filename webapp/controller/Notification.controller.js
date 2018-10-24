sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("HrAndEmp.HR_Management.controller.Notification", {
		
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("AdminPage", {}, true /*no history*/);
			}
		},
		onClick : function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("AdminPage");
		},
		logOut: function(){
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
	},

		item: function(oEvent){
			var obj = oEvent.getParameters().listItem.getBindingContext("empDetails").getObject(),
			oDetails = this.getView().getModel("empDetails");
			oDetails.setProperty("/oForm", obj);
			
		}

	});

});