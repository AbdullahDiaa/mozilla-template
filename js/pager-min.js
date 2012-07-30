$(document).ready(function(){$.extend($.easing,{pagerFadeIn:function(f,g,e,i,h){return i*(g/=h)*g+e},pagerFadeOut:function(f,g,e,i,h){return -i*(g/=h)*(g-2)+e}});Mozilla.Pager.createPagers(document.body,Mozilla.Pager.rootPagers,null);for(var a=0;a<Mozilla.Pager.rootPagers.length;a++){if(Mozilla.Pager.rootPagers[a].history){setInterval(Mozilla.Pager.checkLocation,Mozilla.Pager.LOCATION_INTERVAL);break}}});if(typeof Mozilla=="undefined"){var Mozilla={}}Mozilla.Pager=function(b,a){this.$container=$(b);if(!b.id){b.id="mozilla-pager-"+Mozilla.Pager.currentId;Mozilla.Pager.currentId++}var p=this.$container.find("div.pager-content");if(!p.length){return}this.$pageContainer=$(p[0]);this.id=b.id;this.pagesById={};this.pages=[];this.previousPage=null;this.currentPage=null;this.animatingOut=false;this.childPagers={};this.parentPager=a;this.randomStartPage=(this.$container.hasClass("pager-random"));if(this.$container.hasClass("pager-with-tabs")){var k=this.$container.find("ul.pager-tabs");if(k.length){this.$tabs=$(k[0])}else{this.$tabs=null}}else{this.$tabs=null}if(this.$container.hasClass("pager-with-nav")){this.drawNav()}else{this.$nav=null}this.history=(!this.$container.hasClass("pager-no-history"));this.cleartypeFix=(this.$container.hasClass("pager-cleartype-fix"));var l;var o=this.$pageContainer.children("div");if(this.$tabs){var m=this.$tabs.children().not(".pager-not-tab");var j=0;for(var f=0;f<o.length;f++){if(f<m.length){var n=$(m[f]).children("a:first");if(n.length){l=new Mozilla.Page(o[f],j,n[0]);this.addPage(l);this.childPagers[l.id]=[];Mozilla.Pager.createPagers(l.el,this.childPagers[l.id],this);j++}}}}else{for(var f=0;f<o.length;f++){l=new Mozilla.Page(o[f],f);this.addPage(l);this.childPagers[l.id]=[];Mozilla.Pager.createPagers(l.el,this.childPagers[l.id],this)}}var g;if(this.history&&!this.parentPager){var e=location.hash;e=(e.substring(0,1)=="#")?e.substring(1):e;e=e.replace(/(^\/|\/$)/g,"");if(e.length){this.setStateFromPath(e,false,false);g=this.currentPage}}if(!g&&this.pages.length>0){if(this.randomStartPage){this.setPage(this.getPseudoRandomPage())}else{var c=this.$pageContainer.children(".default-page:first");if(c.length){var d;if(c[0].id.substring(0,5)=="page-"){d=c[0].id.substring(5)}else{d=c[0].id}this.setPage(this.pagesById[d])}else{this.setPage(this.pages[0])}}}if(this.$container.hasClass("pager-auto-rotate")){var h=this;this.autoRotate=true;this.startAutoRotate();this.$container.hover(function(i){h.stopAutoRotate()},function(i){if(h.autoRotate){h.startAutoRotate()}});this.$container.find("a,input,textarea").each(function(q){$(this).focus(function(i){h.stopAutoRotate()}).blur(function(i){if(h.autoRotate){h.startAutoRotate()}})})}else{this.autoRotate=false}Mozilla.Pager.pagers[this.id]=this};Mozilla.Pager.currentId=1;Mozilla.Pager.pagers={};Mozilla.Pager.rootPagers=[];Mozilla.Pager.createPagers=function(e,c,b){if(/(^pager$|^pager | pager$| pager )/.test(e.className)){var a=new Mozilla.Pager(e,b);c.push(a)}else{for(var d=0;d<e.childNodes.length;d++){if(e.nodeType==1){Mozilla.Pager.createPagers(e.childNodes[d],c,b)}}}};Mozilla.Pager.checkLocation=function(){var c=location.hash;c=(c.substring(0,1)=="#")?c.substring(1):c;c=c.replace(/(^\/|\/$)/g,"");var a;for(var b=0;b<Mozilla.Pager.rootPagers.length;b++){a=Mozilla.Pager.rootPagers[b];if(a.history){a.setStateFromPath(c,true,true)}}};Mozilla.Pager.prototype.getPseudoRandomPage=function(){var b=null;if(this.pages.length>0){var a=new Date();b=this.pages[a.getSeconds()%this.pages.length]}return b};Mozilla.Pager.PAGE_DURATION=150;Mozilla.Pager.PAGE_AUTO_DURATION=850;Mozilla.Pager.LOCATION_INTERVAL=200;Mozilla.Pager.NEXT_TEXT="Next";Mozilla.Pager.PREV_TEXT="Previous";Mozilla.Pager.PAGE_NUMBER_TEXT="%s / %s";Mozilla.Pager.AUTO_ROTATE_INTERVAL=10000;Mozilla.Pager.prototype.setStateFromPath=function(k,b,l){var a=k,h=a.indexOf("/");if(h!==-1){a=a.substr(0,h);k=k.substr(h+1)}var f=a.split("+"),c,g;for(var e=0;e<f.length;e++){a=f[e];g=this.pagesById[a];c=(this.currentPage===null||a!==this.currentPage.id);if(g){if(c){if(b){this.setPageWithAnimation(g,Mozilla.Pager.PAGE_DURATION)}else{this.setPage(g)}}for(var d=0;d<this.childPagers[a].length;d++){this.childPagers[a][d].setStateFromPath(k,b,l)}if(c&&l){this.currentPage.focusTab()}break}}};Mozilla.Pager.prototype.prevPageWithAnimation=function(b){var a=this.currentPage.index-1;if(a<0){a=this.pages.length-1}this.setPageWithAnimation(this.pages[a],b)};Mozilla.Pager.prototype.nextPageWithAnimation=function(b){var a=this.currentPage.index+1;if(a>=this.pages.length){a=0}this.setPageWithAnimation(this.pages[a],b)};Mozilla.Pager.prototype.drawNav=function(){var b=this;this.$nav=$('<div class="pager-nav">');this.$pageNumber=$('<span class="pager-nav-page-number">');this.$pageNumber.appendTo(this.$nav);this.$prevInsensitive=$('<span class="pager-prev-insensitive">');this.$prevInsensitive.css("display","none").appendTo(this.$nav);this.$prev=$('<a href="#" class="pager-prev" title="'+Mozilla.Pager.PREV_TEXT+'"></a>');this.$prev.click(function(c){c.preventDefault();b.prevPageWithAnimation(Mozilla.Pager.PAGE_DURATION);b.autoRotate=false;b.stopAutoRotate()}).dblclick(function(c){c.preventDefault()}).appendTo(this.$nav);var a=$('<span class="pager-nav-divider">|</span>');a.appendTo(this.$nav);this.$next=$('<a href="#" class="pager-next" title="'+Mozilla.Pager.NEXT_TEXT+'"></a>');this.$next.click(function(c){c.preventDefault();b.nextPageWithAnimation(Mozilla.Pager.PAGE_DURATION);b.autoRotate=false;b.stopAutoRotate()}).dblclick(function(c){c.preventDefault()}).appendTo(this.$nav);this.$nextInsensitive=$('<span class="pager-next-insensitive">');this.$nextInsensitive.css("display","none").appendTo(this.$nav);this.$nav.insertBefore(this.$pageContainer)};Mozilla.Pager.prototype.updateLocation=function(d){if(!this.history){return}var c=location.href.split("#")[0];var e=d.id;var a=this;while(a.parentPager!==null){e=a.parentPager.currentPage.id+"/"+e;a=a.parentPager}if(this.childPagers[d.id]&&this.childPagers[d.id].length){e+="/";for(var b=0;b<this.childPagers[d.id].length;b++){e+=this.childPagers[d.id][b].currentPage.id+"+"}e=e.substr(0,e.length-1)}location.href=c+"#"+e};Mozilla.Pager.prototype.addPage=function(b){this.pagesById[b.id]=b;this.pages.push(b);if(b.tab){var a=this;b.$tab.click(function(c){c.preventDefault();a.setPageWithAnimation(b,Mozilla.Pager.PAGE_DURATION);a.autoRotate=false;a.stopAutoRotate()})}};Mozilla.Pager.prototype.update=function(){if(this.$tabs){this.updateTabs()}if(this.$nav){this.updateNav()}var b=this.$pageContainer.get(0);var a=b.className;a=a.replace(/pager-selected-[\w-]+/g,"");a=a.replace(/^\s+|\s+$/g,"");b.className=a;this.$pageContainer.addClass("pager-selected-"+this.currentPage.id)};Mozilla.Pager.prototype.updateTabs=function(){var b=this.$tabs.get(0);var a=b.className;a=a.replace(/pager-selected-[\w-]+/g,"");a=a.replace(/^\s+|\s+$/g,"");b.className=a;this.currentPage.selectTab();this.$container.trigger("changePage",[this.currentPage.tab]);this.$tabs.addClass("pager-selected-"+this.currentPage.id)};Mozilla.Pager.prototype.updateNav=function(){var a=this.currentPage.index+1;var b=this.pages.length;var c=Mozilla.Pager.PAGE_NUMBER_TEXT.replace(/%s/,a);c=c.replace(/%s/,b);this.$pageNumber.text(c);this.setPrevSensitivity(this.currentPage.index!=0);this.setNextSensitivity(this.currentPage.index!=this.pages.length-1)};Mozilla.Pager.prototype.setPrevSensitivity=function(a){if(a){this.$prevInsensitive.css("display","none");this.$prev.css("display","inline")}else{this.$prevInsensitive.css("display","inline");this.$prev.css("display","none")}};Mozilla.Pager.prototype.setNextSensitivity=function(a){if(a){this.$nextInsensitive.css("display","none");this.$next.css("display","inline")}else{this.$nextInsensitive.css("display","inline");this.$next.css("display","none")}};Mozilla.Pager.prototype.setPage=function(a){if(this.currentPage!==a){if(this.currentPage){this.currentPage.deselectTab();this.currentPage.hide()}if(this.previousPage){this.previousPage.hide()}this.previousPage=this.currentPage;this.currentPage=a;this.currentPage.show();this.update()}};Mozilla.Pager.prototype.setPageWithAnimation=function(c,d){if(this.currentPage!==c){this.updateLocation(c);if(this.currentPage){this.currentPage.deselectTab()}if(!this.animatingOut){if(this.$pageContainer.is(":animated")){var a=parseFloat(this.$pageContainer.css("opacity"));d=a*Mozilla.Pager.PAGE_DURATION;this.$pageContainer.stop(true,false)}this.previousPage=this.currentPage;this.animatingOut=true;this.currentPage=c;var b=this;this.$pageContainer.animate({opacity:0},d,"pagerFadeOut",function(){b.fadeInPage(d)})}else{this.currentPage=c}this.update()}return false};Mozilla.Pager.prototype.fadeInPage=function(b){if(this.previousPage){this.previousPage.hide()}this.currentPage.show();this.animatingOut=false;var a=this;this.$pageContainer.animate({opacity:1},b,"pagerFadeOut",function(){if(a.cleartypeFix&&$.browser.msie){this.style.removeAttribute("filter")}})};Mozilla.Pager.prototype.stopAutoRotate=function(){if(this.autoRotateInterval){clearInterval(this.autoRotateInterval);this.autoRotateInterval=null}};Mozilla.Pager.prototype.startAutoRotate=function(){var a=function(b){var c=function(){b.nextPageWithAnimation(Mozilla.Pager.PAGE_AUTO_DURATION)};b.autoRotateInterval=setInterval(c,Mozilla.Pager.AUTO_ROTATE_INTERVAL,b)};a(this)};Mozilla.Page=function(c,a,b){this.el=c;if(!this.el.id){this.el.id="mozilla-pager-page-"+Mozilla.Page.currentId;Mozilla.Page.currentId++}if(this.el.id.substring(0,5)=="page-"){this.id=this.el.id.substring(5)}else{this.id=this.el.id}this.el.id="page-"+this.id;this.index=a;if(b){this.tab=b;this.tab.href="#"+this.id;this.$tab=$(this.tab)}else{this.tab=null}this.$el=$(this.el);this.hide()};Mozilla.Page.currentId=1;Mozilla.Page.prototype.selectTab=function(){if(this.tab){this.$tab.addClass("selected")}};Mozilla.Page.prototype.deselectTab=function(){if(this.tab){this.$tab.removeClass("selected")}};Mozilla.Page.prototype.focusTab=function(){if(this.tab){this.tab.focus()}};Mozilla.Page.prototype.hide=function(){this.el.style.display="none"};Mozilla.Page.prototype.show=function(){this.el.style.display="block"};