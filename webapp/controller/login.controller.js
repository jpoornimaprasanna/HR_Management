 sap.ui.define([
 	"sap/ui/core/mvc/Controller",
 	"sap/m/MessageToast"
 ], function (Controller, MessageToast) {
 	"use strict";

 	return Controller.extend("HrAndEmp.HR_Management.controller.login", {

 		/*onPress: function (oEvent) {
 		var oModel = this.getView().getModel("empDetails").oData.details;
			for (var i = 0; i < oModel.length; i++) {
				
				var oId = this.getView().byId("Id").getValue();
				var oPassword = this.getView().byId("Password").getValue();
				if (oId === "" && oPassword === "") {
					MessageToast.show("Please enter the Id and Password");
					this.getView().byId("Id").setValueState("Error");
					this.getView().byId("Password").setValueState("Error");
					break;
				} else if (oId == 1 && oPassword == "Admin") {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("AdminPage");
					this.getView().byId("Id").setValueState("None");
					this.getView().byId("Password").setValueState("None");
					this.getView().byId("Id").setValue("");
					this.getView().byId("Password").setValue("");
					break;
				}else if(oModel[i].id === oId && oModel[i].password === oPassword && oModel[i].phoneno === undefined){
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("FirstEmpPage");
					break;
				}else if (oModel[i].id === oId && oModel[i].password === oPassword) {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("EmployeePage");
					this.getView().byId("Id").setValueState("None");
					this.getView().byId("Password").setValueState("None");
					this.getView().byId("Id").setValue("");
					this.getView().byId("Password").setValue("");
					break;
				}
			}
 		},*/
 		onPress: function (oEvent) {
			var oModel = this.getView().getModel("empDetails").oData.details;
			for (var i = 0; i < oModel.length; i++) {
				var oId = this.getView().byId("Id").getValue();
				var oPassword = this.getView().byId("Password").getValue();
				if (oId === "" && oPassword === "") {
					MessageToast.show("Please enter the Id and Password");
					this.getView().byId("Id").setValueState("Error");
					this.getView().byId("Password").setValueState("Error");
 					break;
				}else if (oId == 1 && oPassword == "Admin") {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("AdminPage");
					this.getView().byId("Id").setValueState("None");
					this.getView().byId("Password").setValueState("None");
					this.getView().byId("Id").setValue("");
					this.getView().byId("Password").setValue("");
					break;
				}
				
				
				else if (oModel[i].id === oId && oModel[i].password === oPassword && oModel[i].phoneno === undefined) {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("FirstEmpPage");
					
					break;
				} /*else if(oModel[i].id !== oId && oModel[i].password !== oPassword){
						MessageToast.show("Please Enter the Correct Credentials");
					}*/
					else if (oModel[i].id === oId && oModel[i].password === oPassword) {
					var id = this.getView().byId("Id").getValue();
					var oItem = oEvent.getSource();
				//	var oData = oItem.getParent().getModel("empDetails").oData;
					var model = this.getView().getModel("empDetails").getProperty("/details");
					for (i = 0; i < model.length; i++) {
						if (id === model[i].id) {
							var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
							oRouter.navTo("EmployeePage",{
								obj: i
							});
							// console.log(i);
							break;
						}
					}
					this.getView().byId("Id").setValueState("None");
					this.getView().byId("Password").setValueState("None");
					this.getView().byId("Id").setValue("");
					this.getView().byId("Password").setValue("");
					break;
				}
			}
		},
 		
 		
 		
 		checkValidation: function () {
 			var oModel = this.getView().getModel("empDetails").oData.details;
 			for (var i = 0; i < oModel.length; i++) {
 				var oId = this.getView().byId("Id").getValue();

 				var oPassword = this.getView().byId("Password").getValue();
 				if (oId.length > 6) {
 					MessageToast.show("Please enter valid nubmer");
 					this.getView().byId("Id").setValueState("Error");
 				}
 				if (oId.length <= 6) {

 					this.getView().byId("Id").setValueState("None");
 				}
 			}
 		}
 	});
 });