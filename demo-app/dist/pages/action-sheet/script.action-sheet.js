module.exports=function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";var o=n(2);e.exports={template:o,methods:{showActionSheet:function(){quasar.action.sheet({title:"Article Actions",buttons:[{label:"Delete",icon:"delete",handler:function(){quasar.notify.positive("Deleted Article")}},{label:"Share",icon:"share",handler:function(){quasar.notify.positive("Shared!")}},{label:"Play",icon:"gamepad",handler:function(){quasar.notify.positive("Launched Game")}},{label:"Favorite",icon:"favorite",handler:function(){quasar.notify.positive("Added to favorites")}},{label:"Cancel",icon:"cancel",classes:"text-primary",handler:function(){}}]})}}}},function(e,t){e.exports='<div class="screen-bar shadow-1 fixed-top">Quasar Action Sheet</div>\n\n<h5>Lorel Ipsum</h5>\n<p>\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\n  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut\n  enim ad minim veniam, quis nostrud exercitation ullamco laboris\n  nisi ut aliquip ex ea commodo consequat.\n</p>\n\n<button class="teal glossy" @click="showActionSheet()">\n  <i class="on-left">settings</i>\n  Show Action Sheet\n</button>\n'}]);