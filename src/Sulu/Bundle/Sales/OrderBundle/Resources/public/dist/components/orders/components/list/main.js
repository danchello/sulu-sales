define(["sulusalesorder/util/sidebar"],function(a){"use strict";var b={datagridInstanceName:"orders"},c=function(){this.sandbox.on("sulu.toolbar.add",function(){this.sandbox.emit("sulu.salesorder.order.new")},this)},d=function(){return"/admin/api/orders?flat=true"},e=function(){return this.sandbox.sulu.buttons.get({settings:{options:{dropdownItems:[{type:"columnOptions"}]}}})},f=function(a){this.sandbox.emit("sulu.salesorder.orders.load",a)},g=function(a){this.sandbox.emit("sulu.salesorder.orders.sidebar.load",a)};return{view:!0,layout:{content:{width:"max"},sidebar:{width:"fixed",cssClasses:"sidebar-padding-50"}},header:{title:"salesorder.orders.title",noBack:!0,toolbar:{buttons:{add:{},"export":{options:{urlParameter:{flat:!0},url:"/admin/api/orders.csv"}}}}},templates:["/admin/order/template/order/list"],initialize:function(){this.render(),c.call(this)},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/order/template/order/list")),this.sandbox.sulu.initListToolbarAndList.call(this,"ordersFields","/admin/api/orders/fields",{el:this.$find("#list-toolbar-container"),instanceName:"orders",groups:[{id:1,align:"left"},{id:2,align:"right"}],template:e.call(this)},{el:this.sandbox.dom.find("#orders-list",this.$el),url:d.call(this),searchInstanceName:"orders",searchFields:["number","account","contact"],resultKey:"orders",instanceName:b.datagridInstanceName,actionCallback:f.bind(this),clickCallback:g.bind(this)},"orders","#orders-list-info"),a.initForList(this.sandbox)}}});