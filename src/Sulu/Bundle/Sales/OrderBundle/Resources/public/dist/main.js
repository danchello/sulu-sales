require.config({paths:{sulusalesorder:"../../sulusalesorder/dist"}}),define(["config"],function(a){return{name:"SuluSalesOrderBundle",initialize:function(b){"use strict";var c=b.sandbox;b.components.addSource("sulusalesorder","/bundles/sulusalesorder/dist/components"),a.set("suluresource.filters.type.orders",{breadCrumb:[{title:"navigation.sales"},{title:"salesorder.orders.title",link:"sales/orders"}],routeToList:"sales/orders"}),c.mvc.routes.push({route:"sales/orders",callback:function(){this.html('<div data-aura-component="orders@sulusalesorder" data-aura-display="list"/>')}}),c.mvc.routes.push({route:"sales/orders/add",callback:function(){this.html('<div data-aura-component="orders/components/content@sulusalesorder" data-aura-display="content" data-aura-content="form" />')}}),c.mvc.routes.push({route:"sales/orders/edit::id/:content",callback:function(a,b){this.html('<div data-aura-component="orders/components/content@sulusalesorder" data-aura-display="content" data-aura-content="'+b+'" data-aura-id="'+a+'"/>')}})}}});