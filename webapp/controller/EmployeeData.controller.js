sap.ui.define([
	'jquery.sap.global',
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (jQuery, Controller, History, JSONModel,MessageToast) {
	"use strict";

	return Controller.extend("HrAndEmp.HR_Management.controller.EmployeeData", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("EmployeeData").attachPatternMatched(this._onObjectMatched, this);

			var oJsonModel = new JSONModel("EmployeeDetail.json");
			this.getView().setModel(oJsonModel, "ObjectPageModel");

		},

		_onObjectMatched: function (oEvent) {
			var oArg = oEvent.getParameters("arguments");
			var oView = this.getView();
			oView.setModel(this.getOwnerComponent().getModel("empDetails"));
			oView.bindElement("/details/" + oArg.arguments.obj);
			//this.myEmpPath=oArg.arguments.obj;
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("AdminPage", {}, true /*no history*/ );
			}
		},

		handlePress: function (oEvent) {
			var oObjectHeaderCont = this.byId("ObjectPageLayout");
			oObjectHeaderCont.setShowHeaderContent(!oObjectHeaderCont.getShowHeaderContent());
		},

		logOut: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
		},
		handleEditPress: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().sPath;

			var oData = oEvent.getSource().getBindingContext().oModel.oData.details;

			this.byId("iphonenumberId").setVisible(true);
			this.byId("lphonenumberId").setVisible(false);

			this.byId("iaddressId").setVisible(true);
			this.byId("laddressId").setVisible(false);

			this.byId("imailingId").setVisible(true);
			this.byId("lmailingId").setVisible(false);

			this.byId("ipaymentId").setVisible(true);
			this.byId("lpaymentId").setVisible(false);

			this.byId("save").setVisible(true);
			this.byId("cancel").setVisible(true);
			this.byId("edit").setVisible(false);
		},
		onCancelPress: function () {
			this.byId("cancel").setVisible(false);
			this.byId("save").setVisible(false);
			this.byId("edit").setVisible(true);

			this.byId("lphonenumberId").setVisible(true);
			this.byId("iphonenumberId").setVisible(false);

			this.byId("laddressId").setVisible(true);
			this.byId("iaddressId").setVisible(false);

			this.byId("lmailingId").setVisible(true);
			this.byId("imailingId").setVisible(false);

			this.byId("ipaymentId").setVisible(false);
			this.byId("lpaymentId").setVisible(true);

		},
		onSavePress: function () {
			this.byId("save").setVisible(false);
			this.byId("cancel").setVisible(false);
			this.byId("edit").setVisible(true);

			this.byId("lphonenumberId").setVisible(true);
			this.byId("iphonenumberId").setVisible(false);

			this.byId("laddressId").setVisible(true);
			this.byId("iaddressId").setVisible(false);

			this.byId("lmailingId").setVisible(true);
			this.byId("imailingId").setVisible(false);

			this.byId("ipaymentId").setVisible(false);
			this.byId("lpaymentId").setVisible(true);

			var oView = this.getView();
			var oDialog = oView.byId("helloDialog");
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "HrAndEmp.HR_Management.view.HelloDialog", this);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		onCloseDialog: function () {
			this.byId("helloDialog").close();
			//write a code to send request to Admin
		},
		validatePhone: function(){
			var home_aphone=this.byId("hphoneId").getValue();
			var office_aphone=this.byId("oPhoneId").getValue();
			if(home_aphone === ""){
				MessageToast.show("Please enter valid nubmer");
				this.getView().byId("hphoneId").setValueState("Error");
			}
			if(home_aphone.length !== 10){
				this.getView().byId("hphoneId").setValueState("Error");
			}
			if(home_aphone.length === 10){
				this.getView().byId("hphoneId").setValueState("None");
			}
			if(home_aphone[0] == 0 || home_aphone[0] == 1||home_aphone[0] == 2 ||home_aphone[0] == 3||home_aphone[0] == 4||home_aphone[0] == 5||home_aphone[0] == 6){
				MessageToast.show("Please check the number u entered");
			}
			
		}
	});
});