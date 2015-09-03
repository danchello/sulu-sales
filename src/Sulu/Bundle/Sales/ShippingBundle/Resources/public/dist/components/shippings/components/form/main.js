define(["sulusalesshipping/util/shippingStatus","sulusalesshipping/util/sidebar","widget-groups"],function(a,b,c){"use strict";var d="#shipping-form",e={shippedOrderItems:null},f={accountId:"#account",contactId:"#contact",accountAddressesUrl:"/admin/api/accounts/<%= id %>/addresses",deliveryAddressInstanceName:"delivery-address",validateQuantityWarningTranslation:"salesshipping.shipping.validation.quantityError",validateWarningTranslation:"salesshipping.shipping.validation.error"},g=function(){var b=[{id:"save-button",icon:"floppy-o",iconSize:"large","class":"highlight",position:1,group:"left",disabled:!0,callback:function(){this.sandbox.emit("sulu.header.toolbar.save")}.bind(this)}],c={icon:"hand-o-right",iconSize:"large",group:"left",id:"workflow",position:40,items:[]},d={confirm:{title:this.sandbox.translate("salesshipping.shippings.confirm"),callback:h.bind(this)},edit:{title:this.sandbox.translate("salesshipping.shippings.edit"),callback:i.bind(this)},ship:{title:this.sandbox.translate("salesshipping.shippings.ship"),callback:j.bind(this)},cancel:{title:this.sandbox.translate("salesshipping.shippings.cancel"),callback:k.bind(this)},divider:{divider:!0}};this.options.data.id&&(this.shippingStatusId===a.CREATED?c.items.push(d.confirm):this.shippingStatusId===a.DELIVERY_NOTE?(c.items.push(d.edit),c.items.push(d.cancel),c.items.push(d.divider),c.items.push(d.ship)):this.shippingStatusId===a.SHIPPED&&c.items.push(d.cancel),c.items.length>0&&b.push(c)),this.sandbox.emit("sulu.header.set-toolbar",{template:b})},h=function(){l.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.confirm")})},i=function(){l.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.edit")})},j=function(){l.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.ship")})},k=function(){l.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.cancel")})},l=function(a){if("function"!=typeof a)throw"checkForUnsavedData: callback is not a function";this.saved?a.call(this):this.sandbox.emit("sulu.overlay.show-warning","sulu.overlay.be-careful","sulu.overlay.unsaved-changes-confirm",null,a.bind(this))},m=function(){return this.options.data&&this.options.data.status?this.options.data.status.id:null},n=function(){this.sandbox.on("sulu.header.toolbar.delete",function(){this.sandbox.emit("sulu.salesshipping.shipping.delete",this.options.data.id)},this),this.sandbox.on("sulu.salesshipping.shipping.saved",function(a){this.options.data=a,p.call(this,!0)},this),this.sandbox.on("sulu.header.toolbar.save",function(){this.submit()},this),this.sandbox.on("husky.toolbar.header.initialized",function(){p.call(this,!this.isNew)}.bind(this)),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.salesshipping.shippings.list"),this.sandbox.emit("husky.navigation.select-item","sales/shippings")},this),this.sandbox.on("husky.input.expected-delivery-date.initialized",function(){this.dfdExpectedDeliveryDate.resolve()},this),this.sandbox.on("sulu.editable-data-row.delivery-address.initialized",function(){this.dfdDeliveryAddressInitialized.resolve()}.bind(this)),this.sandbox.on("sulu.editable-data-row.address-view.delivery-address.changed",function(a){this.options.data.deliveryAddress=a,r.call(this,this.options.data),u.call(this)}.bind(this))},o=function(){var a=this.sandbox.translate("salesshipping.shipping"),b=[{title:"navigation.sales"},{title:"salesshipping.shippings.title",event:"salesshipping.shippings.list"}];this.options.data&&this.options.data.number&&(a+=" #"+this.options.data.number,b.push({title:"#"+this.options.data.number})),this.sandbox.emit("sulu.header.set-title",a),this.sandbox.emit("sulu.header.set-breadcrumb",b)},p=function(a){if(a!==this.saved){var b=this.options.data&&this.options.data.id?"edit":"add";this.sandbox.emit("sulu.header.toolbar.state.change",b,a,!0)}this.saved=a},q=function(a){var b=this.sandbox.form.create(d);b.initialized.then(function(){r.call(this,a,!0),t.call(this,a)}.bind(this))},r=function(a){this.sandbox.form.setData(d,a).then(function(){a.hasOwnProperty("deliveryAddress")&&(this.sandbox.dom.html(this.$find(f.accountId),a.deliveryAddress.accountName),this.sandbox.dom.html(this.$find(f.contactId),a.deliveryAddress.firstName+" "+a.deliveryAddress.lastName))}.bind(this)).fail(function(a){this.sandbox.logger.error("An error occured when setting data!",a)}.bind(this))},s=function(a){this.sandbox.util.load(this.sandbox.util.template(f.accountAddressesUrl,{id:a.order.customerAccount.id})).then(function(b){var c=b._embedded.addresses,d=null;a&&a.deliveryAddress?d=a.deliveryAddress:a&&a.hasOwnProperty("order")?d=a.order.deliveryAddress:!d&&c.length>0&&(d=c[0]),this.sandbox.data.when(this.dfdDeliveryAddressInitialized).then(function(){this.sandbox.emit("sulu.editable-data-row."+f.deliveryAddressInstanceName+".data.update",c,d),this.options.data.deliveryAddress=d,r.call(this,this.options.data),this.dfdAddressSet.resolve()}.bind(this))}.bind(this)).fail(function(a,b){this.sandbox.logger.error(a,b)}.bind(this))},t=function(a){this.sandbox.start(d),s.call(this,a)},u=function(){p.call(this,!1)};return{view:!0,layout:{sidebar:{width:"fixed",cssClasses:"sidebar-padding-50"}},templates:["/admin/shipping/template/shipping/form"],initialize:function(){this.options=this.sandbox.util.extend({},e,this.options),this.saved=!0,this.isNew=!this.options.data.id,this.dfdAllFieldsInitialized=this.sandbox.data.deferred(),this.dfdExpectedDeliveryDate=this.sandbox.data.deferred(),this.dfdDesiredDeliveryDate=this.sandbox.data.deferred(),this.dfdAddressSet=this.sandbox.data.deferred(),this.dfdDeliveryAddressInitialized=this.sandbox.data.deferred(),this.sandbox.data.when(this.dfdExpectedDeliveryDate,this.dfdAddressSet).then(function(){this.dfdAllFieldsInitialized.resolve()}.bind(this)),this.shippingStatusId=m.call(this),this.isEditable=!this.shippingStatusId||this.shippingStatusId===a.CREATED,n.call(this),o.call(this),g.call(this),this.render(),this.listenForChange(),this.options.data&&this.options.data.id&&c.exists("shipping-detail")&&b.initForDetail(this.sandbox,this.options.data)},render:function(){var a=this.options.data,b=this.sandbox.util.extend({},{isEditable:this.isEditable,isNew:this.isNew,shippedOrderItems:this.options.shippedOrderItems},a);this.sandbox.dom.html(this.$el,this.renderTemplate(this.templates[0],b)),q.call(this,a)},submit:function(){var a=this.sandbox.form.getData(d),b=this.isQuantityZero(a);this.sandbox.form.validate(d)&&!b?(""===a.id&&delete a.id,this.sandbox.logger.log("saving shipping",a),this.sandbox.emit("sulu.salesshipping.shipping.save",a)):b?this.sandbox.emit("sulu.labels.warning.show",this.sandbox.translate(f.validateQuantityWarningTranslation)):this.sandbox.emit("sulu.labels.warning.show",this.sandbox.translate(f.validateWarningTranslation))},isQuantityZero:function(a){var b=!0;return this.sandbox.util.foreach(a.items,function(a){return parseInt(a.quantity,10)>0?(b=!1,!1):void 0}.bind(this)),b},listenForChange:function(){this.sandbox.data.when(this.dfdAllFieldsInitialized).then(function(){this.sandbox.dom.on(d,"change",u.bind(this),".changeListener select, .changeListener input, .changeListener .husky-select, .changeListener textarea"),this.sandbox.dom.on(d,"keyup",u.bind(this),".changeListener select, .changeListener input, .changeListener textarea"),this.sandbox.on("sulu.item-table.changed",u.bind(this))}.bind(this))}}});