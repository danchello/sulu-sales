define(["text!sulusalescore/components/item-table/item.form.html","text!sulusalescore/components/item-table/item.row.html","text!sulusalescore/components/item-table/item.row-head.html","text!sulusalescore/components/item-table/item.overlay.html","config"],function(a,b,c,d,e){"use strict";var f={urlFilter:{},formId:"item-table-form",data:[],isEditable:!0,columns:["name","number","settings","quantity","quantityUnit","price","discount","totalPrice"],hasNestedItems:!1,defaultData:{},columnCallbacks:{},rowCallback:null,settings:!1},g={products:"/admin/api/products{?filter*}",productsFlat:"/admin/api/products?flat=true&searchFields=number,name&fields=id,name,number{&filter*}",product:"/admin/api/products/"},h={listClass:".item-table-list",formSelector:".item-table-list-form",productSearchClass:".product-search",rowIdPrefix:"item-table-row-",rowClass:".item-table-row",quantityRowClass:".item-quantity",quantityInput:".item-quantity input",priceRowClass:".item-price",priceInput:".item-price input",discountRowClass:".item-discount",discountInput:".item-discount input",globalPriceTableClass:".global-price-table",overallEmptyString:"-",loaderSelector:".item-table-loader",loaderClass:"item-table-loader",overlayClassSelector:".settings-overlay"},i={rowClass:null,id:null,rowNumber:null,address:null,addressObject:null,description:null,rowId:"",name:"",number:"",quantity:"",quantityUnit:"",price:"",discount:null,overallPrice:"",currency:"EUR",useProductsPrice:!1,tax:0,supplierName:""},j={priceRow:function(a,b){return["<tr>","   <td>",a,"   </td>","   <td>",b,"   </td>","</tr>"].join("")},loader:function(a){return'<div style="display:hidden" class="grid-row '+a+'"></div>'}},k="sulu.item-table.",l=function(){return k+"changed"},m=function(){return p.call(this,"set-default-data")},n=function(){return p.call(this,"change-currency")},o=function(){return p.call(this,"set-addresses")},p=function(a){return k+this.options.instanceName+"."+a},q=function(){return{rowClass:"header",name:this.sandbox.translate("salescore.item.product"),number:this.sandbox.translate("salescore.item.number"),address:this.sandbox.translate("address.delivery"),description:this.sandbox.translate("salescore.item.description"),quantity:this.sandbox.translate("salescore.item.quantity"),quantityUnit:this.sandbox.translate("salescore.item.unit"),price:this.sandbox.translate("salescore.item.price"),discount:this.sandbox.translate("salescore.item.discount"),overallPrice:this.sandbox.translate("salescore.item.overall-value")}},r=function(){this.sandbox.on(m.call(this),C.bind(this)),this.sandbox.on(n.call(this),u.bind(this)),this.sandbox.on(o.call(this),t.bind(this))},s=function(){this.sandbox.dom.on(this.$el,"click",V.bind(this),".add-row"),this.sandbox.dom.on(this.$el,"click",S.bind(this),".remove-row"),this.sandbox.dom.on(this.$el,"click",D.bind(this),".item-table-row"),this.sandbox.dom.on(this.$el,"click",E.bind(this),".item-table-row td"),this.sandbox.dom.on(this.$el,"data-changed",function(a){var b=a.items||[];bb.call(this,b)}.bind(this)),this.sandbox.dom.on(this.$el,"change",F.bind(this),h.quantityInput),this.sandbox.dom.on(this.$el,"change",G.bind(this),h.priceInput),this.sandbox.dom.on(this.$el,"change",H.bind(this),h.discountInput)},t=function(a){this.options.settings&&(this.options.settings.addresses=a)},u=function(a){var b,c,d=new this.sandbox.data.deferred;this.currency=a,b=B.call(this,this.items),b&&b.length>0&&(z.call(this,d),c=x.call(this,b),this.sandbox.dom.when(c,d).done(function(a){v.call(this,a),K.call(this),y.call(this)}.bind(this)).fail(function(a,b,c){this.sandbox.emit("sulu.labels.error.show",this.sandbox.translate("salescore.item-table.error.changing-currency"),"labels.error",""),this.sandbox.logger.error(a,b,c)}.bind(this)))},v=function(a){var b,c,d,e=w.call(this,a._embedded.products);for(d in this.items)this.items.hasOwnProperty(d)&&(c=this.items[d],c.price=e[c.product.id]&&e[c.product.id][this.currency]?e[c.product.id][this.currency]:0,b=this.sandbox.dom.find(h.priceInput,this.sandbox.dom.find("#"+d,this.$list)),this.sandbox.dom.val(b,this.sandbox.numberFormat(c.price,"n")),J.call(this,d))},w=function(a){var b={};return this.sandbox.util.foreach(a,function(a){b[a.id]={},this.sandbox.util.foreach(a.prices,function(c){b[a.id][c.currency.code]=c.price||0}.bind(this))}.bind(this)),b},x=function(a){var b=this.sandbox.uritemplate.parse(g.products).expand({filter:{ids:a.join(",")}});return this.sandbox.util.load(b)},y=function(){this.sandbox.stop(this.$loader),this.sandbox.dom.show(this.$list)},z=function(a){A.call(this),this.sandbox.start([{name:"loader@husky",options:{el:this.$loader,size:"40px",hidden:!1}}]).done(function(){a.resolve()}.bind(this))},A=function(){var a=this.sandbox.dom.height(this.$el);this.$loader=this.sandbox.dom.createElement(j.loader.call(this,h.loaderClass)),this.$list=this.sandbox.dom.find(h.formSelector,this.$el),this.sandbox.dom.append(this.$el,this.$loader),this.sandbox.dom.height(this.$loader,a),this.sandbox.dom.hide(this.$list),this.sandbox.dom.show(this.$loader)},B=function(a){var b,c=[];for(b in a)a[b].hasOwnProperty("product")&&c.push(a[b].product.id);return c},C=function(a,b){this.options.defaultData[a]=b},D=function(a){if("INPUT"!==a.target.tagName.toUpperCase()&&"A"!==a.target.tagName.toUpperCase()){var b=this.sandbox.dom.attr(a.currentTarget,"id");this.options.rowCallback&&this.options.rowCallback.call(this,b,this.items[b]),this.options.settings&&"false"!==this.options.settings&&eb.call(this,this.items[b],this.options.settings,b)}},E=function(a){var b=this.sandbox.dom.data(a.currentTarget,"name"),c=this.sandbox.dom.data(this.sandbox.dom.parent(),"id");b&&this.options.columnCallbacks.hasOwnProperty(b)&&this.options.columnCallbacks[b].call(this,a.currentTarget,c)},F=function(a){var b=I.call(this,a).id;this.items[b].quantity=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),gb.call(this),J.call(this,b),K.call(this),this.sandbox.emit(l.call(this))},G=function(a){var b=I.call(this,a).id;this.items[b].price=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),gb.call(this),J.call(this,b),K.call(this),this.sandbox.emit(l.call(this))},H=function(a){var b=I.call(this,a).id;this.items[b].discount=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),gb.call(this),J.call(this,b),K.call(this),this.sandbox.emit(l.call(this))},I=function(a){var b=this.sandbox.dom.closest(a.target,".item-table-row"),c=this.sandbox.dom.attr(b,"id");return{row:b,id:c}},J=function(a){var b=this.$find("#"+a),c=this.items[a],d=this.sandbox.dom.find(".item-overall-price span",b);this.sandbox.dom.html(d,M.call(this,c))},K=function(){var a,b,c,d,e,f={},g=0,i=0;for(var j in this.items)b=this.items[j],c=parseFloat(O.call(this,b)),d=0,b.tax&&b.tax>0&&b.tax<=100&&(a=parseFloat(b.tax),d=c/100*a,f[a]=f[a]?f[a]+d:d),g+=c,i+=c+d;if(e=this.$find(h.globalPriceTableClass),this.sandbox.dom.html(e,""),Object.keys(this.items).length>0){L.call(this,e,this.sandbox.translate("salescore.item.net-price"),N.call(this,g));for(var j in f)L.call(this,e,this.sandbox.translate("salescore.item.vat")+".("+j+"%)",N.call(this,f[j]));L.call(this,e,this.sandbox.translate("salescore.item.overall-price"),N.call(this,i))}},L=function(a,b,c){var d=this.sandbox.dom.createElement(j.priceRow.call(this,b,c));this.sandbox.dom.append(a,d)},M=function(a,b){return N.call(this,O.call(this,a,b),P.call(this,a))},N=function(a,b){return b=b?b:this.currency,this.sandbox.numberFormat(a,"n")+" "+b},O=function(a,b){var c=0;return b&&"default"!==b||a.price&&a.quantity&&(c=a.price*a.quantity,a.discount&&a.discount>0&&a.discount<=100&&(c-=c/100*a.discount)),c},P=function(a){return a.currency?a.currency:this.currency},Q=function(a,b){var c=this.sandbox.dom.closest(b.currentTarget,h.rowClass),d=this.sandbox.dom.attr(c,"id"),e={};this.sandbox.start([{name:"loader@husky",options:{el:this.sandbox.dom.find(h.productSearchClass,c),size:"15px"}}]),this.sandbox.util.load(g.product+a.id).then(function(a){e=db.call(this,a),Z.call(this,d,e)}.bind(this)).fail(function(a,b,c){this.sandbox.emit("sulu.labels.error.show",this.sandbox.translate("salescore.item-table.error.loading-product"),"labels.error",""),this.sandbox.logger.error(a,b,c)}.bind(this))},R=function(a){var b=e.get("suluproduct.components.autocomplete.default");b.el=this.sandbox.dom.find(h.productSearchClass,a),b.selectCallback=Q.bind(this),b.remoteUrl=this.sandbox.uritemplate.parse(g.productsFlat).expand({filter:this.options.urlFilter}),this.sandbox.start([{name:"auto-complete@husky",options:b}])},S=function(a){a.preventDefault(),a.stopPropagation();var b=this.sandbox.dom.closest(a.currentTarget,".item-table-row"),c=this.sandbox.dom.attr(b,"id");W.call(this,c,b)},T=function(a){delete this.items[a],gb.call(this)},U=function(a,b){this.items[a]=b,gb.call(this)},V=function(a){a.preventDefault(),ab.call(this)},W=function(a,b){this.sandbox.dom.remove(b),T.call(this,a),_.call(this,b),K.call(this),this.sandbox.emit(l.call(this))},X=function(a,c){c!==!1&&this.rowCount++;var d,e,f=this.sandbox.util.extend({},i,this.options.defaultData,a,{isEditable:this.options.isEditable,columns:this.options.columns,rowId:h.rowIdPrefix+this.rowCount,rowNumber:this.rowCount});return f.address&&"object"==typeof f.address&&(f.addressObject=f.address,f.address=this.sandbox.sulu.createAddressString(f.address)),f.currency=this.currency,f.overallPrice=this.sandbox.numberFormat(M.call(this,f)),f.discount=this.sandbox.numberFormat(f.discount,"n"),f.price=this.sandbox.numberFormat(f.price,"n"),f.quantity=this.sandbox.numberFormat(f.quantity,"n"),d=this.sandbox.util.template(b,f),e=this.sandbox.dom.createElement(d)},Y=function(a){var b,c;return this.options.hasNestedItems&&(c=a,a=this.sandbox.util.extend({},a.item,c),delete a.item),b=X.call(this,a),this.sandbox.dom.append(this.$find(h.listClass),b),b},Z=function(a,b){var c=X.call(this,b,!1);return this.sandbox.dom.replaceWith(this.$find("#"+a),c),U.call(this,a,b),$.call(this,c),this.sandbox.emit(l.call(this)),c},$=function(a){this.options.columns.indexOf("quantity")>0&&this.sandbox.form.addField(this.selectorFormId,this.sandbox.dom.find(h.quantityInput,a)),this.options.columns.indexOf("price")>0&&this.sandbox.form.addField(this.selectorFormId,this.sandbox.dom.find(h.priceInput,a)),this.options.columns.indexOf("discount")>0&&this.sandbox.form.addField(this.selectorFormId,this.sandbox.dom.find(h.discountInput,a))},_=function(a){this.options.columns.indexOf("quantity")>0&&this.sandbox.form.removeField(this.selectorFormId,this.sandbox.dom.find(h.quantityInput,a)),this.options.columns.indexOf("price")>0&&this.sandbox.form.removeField(this.selectorFormId,this.sandbox.dom.find(h.priceInput,a)),this.options.columns.indexOf("discount")>0&&this.sandbox.form.removeField(this.selectorFormId,this.sandbox.dom.find(h.discountInput,a))},ab=function(){var a,b={rowClass:"new"};a=Y.call(this,b),R.call(this,a)},bb=function(a){this.items={},this.sandbox.dom.empty(this.$find(h.listClass)),cb.call(this,a)},cb=function(a){var b,c,d,e,f;for(b=-1,c=a.length;++b<c;)d=a[b],e=Y.call(this,a[b]),f=this.sandbox.dom.attr(e,"id"),this.items[f]=d;gb.call(this)},db=function(a){var b,c,d=this.sandbox.util.extend({},i,this.options.defaultData,{name:a.name,number:a.number,description:a.shortDescription,product:a,quantityUnit:a.orderUnit?a.orderUnit.name:""});if(a.prices&&a.prices.length>0)for(b=-1,c=a.prices.length;++b<c;)a.prices[b].currency.code===this.currency&&(d.price=a.prices[b].price);return a.supplierName&&(d.supplierName=a.supplierName),d},eb=function(a,b,c){var e,f,g,i;b=this.sandbox.util.extend({columns:[],addresses:[]},b),a=this.sandbox.util.extend({settings:b,createAddressString:this.sandbox.sulu.createAddressString,translate:this.sandbox.translate,deliveryDate:null,deliveryAddress:{id:null},costCenter:null},a),this.sandbox.stop(this.sandbox.dom.find(h.overlayClassSelector,this.$el)),this.sandbox.dom.remove(this.sandbox.dom.find(h.overlayClassSelector,this.$el)),f=this.sandbox.util.template(d,a),e=this.sandbox.dom.createElement('<div class="'+h.overlayClass+'"></div>'),this.sandbox.dom.append(this.$el,e),g=a.name,i="#"+a.number,""!==a.supplierName&&(i+="<br/>"+a.supplierName),this.sandbox.start([{name:"overlay@husky",options:{el:e,title:g,subTitle:i,instanceName:"settings",openOnStart:!0,removeOnClose:!1,skin:"wide",data:f,okCallback:function(){var a=this.sandbox.dom.val(h.overlayClassSelector+' *[data-mapper-property="deliveryAddress"]'),b=this.sandbox.dom.val(h.overlayClassSelector+' *[data-mapper-property="deliveryDate"] input'),d=this.sandbox.dom.val(h.overlayClassSelector+' *[data-mapper-property="costCenter"]');this.items[c].description=this.sandbox.dom.val(h.overlayClassSelector+' *[data-mapper-property="description"]'),this.items[c].quantity=this.sandbox.dom.val(h.overlayClassSelector+' *[data-mapper-property="quantity"]'),this.items[c].price=this.sandbox.dom.val(h.overlayClassSelector+' *[data-mapper-property="price"]'),this.items[c].discount=this.sandbox.dom.val(h.overlayClassSelector+' *[data-mapper-property="discount"]'),this.items[c].deliveryAddress="-1"!==a?a:{id:null},this.items[c].deliveryDate=""!==b?b:null,this.items[c].costCenter=""!==d?d:null,Z.call(this,c,this.items[c]),K.call(this,c),gb.call(this)}.bind(this)}},{name:"input@husky",options:{el:"#delivery-date",skin:"date",instanceName:"settings-delivery-date",inputId:"settings-delivery-date"}}])},fb=function(){var a=this.sandbox.util.extend({},i,this.options,{header:q.call(this)}),b=this.sandbox.util.template(c,a);this.sandbox.dom.append(this.$find(h.listClass),b)},gb=function(){this.sandbox.dom.data(this.$el,"items",this.getItems())},hb=function(){this.sandbox.form.create(this.selectorFormId)};return{initialize:function(){this.options=this.sandbox.util.extend({},f,this.options),this.selectorFormId="#"+this.options.formId,this.items={},this.rowCount=0,this.table=null,this.currency=this.options.currency||i.currency,this.isEmpty=this.items.length;var a=this.sandbox.dom.data(this.$el,"items");0===this.options.data.length&&a&&a.length>0&&(this.options.data=a),this.render(),r.call(this),s.call(this)},render:function(){var b=this.sandbox.util.extend({},{formId:this.options.formId,addText:this.sandbox.translate("salescore.item.add"),isEditable:this.options.isEditable,columns:this.options.columns});this.table=this.sandbox.util.template(a,b),this.html(this.table),fb.call(this),cb.call(this,this.options.data),hb.call(this),K.call(this)},getItems:function(){var a,b=[];for(a in this.items)b.push(this.items[a]);return b}}});