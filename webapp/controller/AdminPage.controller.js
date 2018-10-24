sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
		"sap/m/MessageToast"
], function (Controller,JSONModel,Filter,FilterOperator,MessageToast) {
	"use strict";

	return Controller.extend("HrAndEmp.HR_Management.controller.AdminPage", {

	onInit: function() {
			this.getView().setModel(new JSONModel(), "oDetail");

		},
		logOut: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
		},
		onPressItem: function(oEvent) {
			var oItem = oEvent.getSource();
			var model = this.getView().getModel("empDetails");
			var text = oEvent.getParameters().listItem.getBindingContext("empDetails").getObject();

			// Routing 
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oObj = oEvent.getParameter("listItem").getBindingContext("empDetails").getPath();
			oRouter.navTo("EmployeeData", {
				//	obj:text,
				obj: oObj.substr(9)
			});
		},
		onSearch: function(oEvent) {
			var olist = this.getView().byId("list1"),
				arr = [],
				binding,
				filters;
			filters = new Filter({
				filters: [new Filter("name", FilterOperator.Contains, oEvent.getSource().getValue()),
					new Filter("id", FilterOperator.Contains, oEvent.getSource().getValue())
				],
				and: false
			});

			//  var empId = new Filter("number", FilterOperator.Contains,event.getSource().getValue());
			binding = olist.getBinding("items");
			arr.push(filters);
			// arr.push(empId);
			binding.filter(arr);
			binding.filter(arr);
		},
		addEmployee: function(oEvent) {
			/*var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("AdminAddEmployee");*/
			var oView = this.getView();
			var oDialog = oView.byId("AddEmployeeId");
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "HrAndEmp.HR_Management.view.AdminAddEmployee", this);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		onCloseDialog: function () {
			this.byId("AddEmployeeId").close();
		},
		notifications: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Notification");
		},
		Submit: function(oEvent){
		var empid = this.byId("empId").getValue();
		var empname = this.byId("empName").getValue();
		var emppassword = this.byId("empPassword").getValue();
		
		
		
		var obj = {
				id: empid,
				name: empname,
				password: emppassword
				
			};
			var myArray = [];

			var oModel = this.getView().getModel("empDetails");
			for (var i = 0; i < oModel.oData.details.length; i++) {
				myArray.push(oModel.oData.details[i]);
			}
			
			if(empid !== "" && empname !== "" && emppassword !== ""){
			myArray.push(obj);
			oModel.setProperty("/details", myArray);

			 myArray = oModel.getProperty("/details", myArray);
			 MessageToast.show("Created the Employee");
			 this.reset();
		       }
		       if(empid == "" || empname == "" || emppassword == ""){
		       		MessageToast.show("Please enter all the Feilds");
		       }
			/*myArray.push(obj);
			oModel.setProperty("/details", myArray);

			 myArray = oModel.getProperty("/details", myArray);*/
			 
			
		},
		reset: function () {
			this.getView().byId("empId").setValue('');
			this.getView().byId("empName").setValue('');
			this.getView().byId("empPassword").setValue('');
		},
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
		/*logOut: function(){
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
	},*/
	checkValidation: function(){
			var oModel = this.getView().getModel("empDetails").oData.details;
			for (var i = 0; i < oModel.length; i++) {
				var oId = this.getView().byId("empId").getValue();
			
				/*var oPassword = this.getView().byId("Password").getValue();*/
				if(oId.length > 6){
					MessageToast.show("Please enter valid nubmer");
					this.getView().byId("empId").setValueState("Error");
				}
				if(oId.length <= 6){
					
					this.getView().byId("empId").setValueState("None");
				}
				
			}
			
		}
	});

});




































