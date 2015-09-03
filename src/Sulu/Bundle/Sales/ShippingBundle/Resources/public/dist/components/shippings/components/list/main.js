define(["sulusalesshipping/util/sidebar"],function(a){"use strict";var b=function(){this.sandbox.on("husky.datagrid.item.click",function(a){this.sandbox.emit("salesorder.orders.sidebar.getData",{data:a,callback:function(a,b){this.sandbox.emit("sulu.sidebar.set-widget","/admin/widget-groups/order-info?contact="+a+"&account="+b)}.bind(this)})},this),this.sandbox.on("sulu.list-toolbar.delete",function(){this.sandbox.emit("husky.datagrid.items.get-selected",function(a){this.sandbox.emit("sulu.salesshipping.shipping.delete",a)}.bind(this))},this),this.sandbox.on("sulu.list-toolbar.add",function(){this.sandbox.emit("sulu.salesshipping.shipping.new")},this)},c=function(a){this.sandbox.emit("sulu.salesshipping.shipping.load",a)},d=function(a){this.sandbox.emit("sulu.salesshipping.shipping.sidebar.load",a)};return{view:!0,layout:{content:{width:"max"},sidebar:{width:"fixed",cssClasses:"sidebar-padding-50"}},header:{title:"salesshipping.shippings.title",noBack:!0,breadcrumb:[{title:"navigation.sales"},{title:"salesshipping.shippings.title"}]},templates:["/admin/shipping/template/shipping/list"],initialize:function(){this.render(),b.call(this)},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/shipping/template/shipping/list")),this.sandbox.sulu.initListToolbarAndList.call(this,"shippingsFields","/admin/api/shippings/fields",{el:this.$find("#list-toolbar-container"),instanceName:"shippings",inHeader:!0,template:[]},{el:this.sandbox.dom.find("#shippings-list",this.$el),url:"/admin/api/shippings?flat=true",searchInstanceName:"shippings",searchFields:["fullName"],resultKey:"shippings",actionCallback:c.bind(this),clickCallback:d.bind(this)}),a.initForList(this.sandbox)}}});