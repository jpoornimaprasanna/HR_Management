sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller,MessageToast) {
	"use strict";

	return Controller.extend("HrAndEmp.HR_Management.controller.FirstEmpPage", {

		onSubmit: function (oEvent) {
			var empname = this.byId("name").getValue();
			var empdesignation = this.byId("designation").getValue();
			var empimage = this.byId("image").getValue();
			var empgoal1 = this.byId("goal1").getValue();
			var empgoal2 = this.byId("goal2").getValue();
			var emphomenumber = this.byId("home").getValue();
			var empoffice = this.byId("office").getValue();
			var empaddress1 = this.byId("aline1").getValue();
			var empaddress2 = this.byId("aline2").getValue();
			var empaddress3 = this.byId("aline3").getValue();
			var empmail1 = this.byId("mline1").getValue();
			var empmail2 = this.byId("mline2").getValue();
			var empmail3 = this.byId("mline3").getValue();
			var empemail = this.byId("email").getValue();
			var empplace = this.byId("place").getValue();
			var empaccount = this.byId("account").getValue();
			var emppassword = this.byId("password").getValue();

			var obj = {
				designation: empdesignation,
				name: empname,
				image: empimage,
				goal1: empgoal1,
				goal2: empgoal2,
				phoneno: emphomenumber,
				officeno: empoffice,
				line1: empaddress1,
				line2: empaddress2,
				line3: empaddress3,
				mline1: empmail1,
				mline2: empmail2,
				mline3: empmail3,
				email: empemail,
				place: empplace,
				account: empaccount,
				password: emppassword
			};
			var myArray = [];
			var oModel = this.getView().getModel("empDetails");
			for (var i = 0; i < oModel.oData.details.length; i++) {
				if (oModel.oData.details[i].name === obj.name) {
					myArray.splice(i, 1);
					break;
				}
				myArray.push(oModel.oData.details[i]);
			}
			myArray.push(obj);
			oModel.setProperty("/details", myArray);
			myArray = oModel.getProperty("/details", myArray);
			//     code to get the object
			var name = this.byId("name").getValue();
			var oItem = oEvent.getSource();
			var oData = oItem.getParent().getModel("empDetails").oData;
			var model = this.getView().getModel("empDetails");

			for (i = 0; i < oData.details.length; i++) {
				if (name === oData.details[i].name) {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("EmployeePage", {
						obj: i
					});
				}
			}
				oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
		},

		logOut: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
		},
		phoneValidation: function(oEvent){
			var empphoneno = this.byId("home").getValue();
			var empofficeno = this.byId("office").getValue();
			
			if(empphoneno.length < 10 || empphoneno.length>10){
				MessageToast.show("Please enter only 10 numbers");
				this.getView().byId("home").setValueState("Error");
				
			}
			if(empofficeno.length<10 || empofficeno>10){
				MessageToast.show("Please enter only 10 numbers");
				this.getView().byId("office").setValueState("Error");
			}
			
			if(empphoneno.length === 10 ){
				this.getView().byId("home").setValueState("None");
			}
			if(empofficeno.length === 10 ){
				this.getView().byId("office").setValueState("None");
			}
			
		},
	});

});