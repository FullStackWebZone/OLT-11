!function(t){var i={};function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var r in t)e.d(s,r,function(i){return t[i]}.bind(null,r));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i);class s{constructor(t,i){this.x=t,this.y=i}static fromPolar(t,i,e=i){const s=i*Math.cos(t),r=e*Math.sin(t);return new this(Math.floor(s),Math.floor(r))}static add(t,i){return new this(t.x+i.x,t.y+i.y)}static sub(t,i){return new this(t.x-i.x,t.y-i.y)}static eq(t,i){return t.x===i.x&&t.y===i.y}add(t){return this.x+=t.x,this.y+=t.y,this}addX(t){return this.x+=t,this}addY(t){return this.y+=t,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subX(t){return this.x-=t,this}subY(t){return this.y-=t,this}mul(t){return this.x=this.x*t,this.y=this.y*t,this}div(t){if(0!==t)return this.x=this.x/t,this.y=this.y/t,this}get magnitude(){return Math.hypot(this.x,this.y)}normalize(){const t=this.getMagnitude();return this.div(t),this}getDistance(t){const i=t.x-this.x,e=t.y-this.y;return Math.hypot(i,e)}getAngle(t){return Math.atan2(t.y-this.y,t.x-this.x)}eq(t){return this.x===t.x&&this.y===t.y}quasiEq(t){return Math.abs(this.x-t.x)<=1&&this.y===t.y||this.x===t.x&&Math.abs(this.y-t.y)<=1}copy(){return new s(this.x,this.y)}}const r={number:10,backgroundColor:"#000",sphere:{radius:new s(180,180),radiusOffset:0,layersNum:150,angleVel:.05},waves:[{type:"sin",A:2,B:4,C:0,D:0},{type:"cos",A:160,B:1.5,C:.2,D:0},{type:"sin",A:150,B:1.3,C:0,D:0}]};class n{constructor({angleVel:t,center:i,radiusX:e,radiusY:s,layerNum:r,modifiers:n}){this._angleVel=t,this._center=i,this._radiusX=e,this._radiusY=s,this._layerNum=r,this._modifiers=n,this._outlinePointsNum=Math.floor(2*Math.PI/t),this._outline,this._setOutline()}_setOutline(){this._outline=Array.from({length:this._outlinePointsNum},(t,i)=>{const e=this._angleVel*i,r=this._modifiers.modifyEllipseRadius(this._radiusX,e,i,this._layerNum),n=this._modifiers.modifyEllipseRadius(this._radiusY,e,i,this._layerNum),a=s.fromPolar(e,r,n).add(this._center);return this._modifiers.modifyOutlinePoint(a,this._radiusX,e,i,this._layerNum)})}update({radiusX:t,radiusY:i}){this._radiusX=t,this._radiusY=i,this._setOutline()}plot(t,i=0){t.strokeStyle=this._modifiers.setColor(i),t.lineWidth=this._modifiers.setLineWidth(i),t.beginPath(),t.moveTo(this._outline[0].x,this._outline[0].y),this._outline.forEach(i=>{t.lineTo(i.x,i.y)}),t.lineTo(this._outline[0].x,this._outline[0].y),t.stroke()}}class a{constructor({center:t,radius:i,radiusOffset:e=0,layersNum:r,angleVel:a,modifiers:u}){this._radiusX=i.x,this._radiusY=i.y,this._radiusOffset=e,this._center=t,this._layersNum=r,this._angleVel=a,this._modifiers=u,this._sep=2*this._radiusY/this._layersNum,this._layers=Array.from({length:r},(t,i)=>{const e=this._getLayerRadius(i);return new n({angleVel:this._angleVel,center:new s(this._center.x,this._center.y+this._radiusY-i*this._sep),radiusX:e,radiusY:e*this._modifiers.modifySmallRadius(i),layerNum:i,modifiers:this._modifiers})})}get boundaries(){return[this._center.x-this._radiusX-250,this._center.y-this._radiusY-250,2*this._radiusX+500,2*this._radiusY+500]}_getLayerRadius(t){const i=Math.PI/this._layersNum*t,e=s.fromPolar(i,this._radiusY,this._radiusX).subX(this._radiusY-t*this._sep).magnitude+this._radiusOffset;return this._modifiers.modifyLayerRadius(e,i,t)}update({plotting:t=!1,ctx:i,setColor:e,setLineWidth:s}={}){this._layers.forEach((e,s)=>{const r=this._getLayerRadius(s);e.update({radiusX:r,radiusY:r*this._modifiers.modifySmallRadius(s)}),t&&e.plot(i,s)})}}class u{constructor({type:t="sin",A:i,B:e,C:s=0,D:r=0,maxR:n=0}){this.type=t,this.A=i,this.B=e,this.C=s,this.D=r,this.maxR=n,this.orig={A:i,B:e,C:s,D:r}}getPoint(t){return this.A*Math[this.type](this.B*t+this.C)+this.D}scaleA(t){this.A=this.orig.A*t/this.maxR}rotate(t=.05,i=!0){const e=t;this.C=i?this.C+e:e}breath({x:t,amp:i=.2,freq:e=2,acc:s=!0}){const r=i*Math.sin(t*e);this.D=s?this.D+r:r}shake({x:t,freq:i=1,centerY:e,amp:s=1}){this.C=s*Math.sin(t*i*e)}mul({a:t=1,b:i=1,c:e=1,d:s=1,acc:r=!1}){const n=r?this:this.orig;this.A=n.A*t,this.B=n.B*i,this.C=n.C*s,this.D=n.D*e}}const o=function({ctx:t,options:i,setModifiers:e}){document.querySelector("#panel p").innerHTML="#"+i.number;const r=t.canvas.clientHeight,n=t.canvas.clientWidth,o=new s(n/2,r/2),h=i.waves.map(t=>new u({...t,maxR:i.sphere.radius.x})),d=i.backgroundColor,l=e(h),c=i.sphere.radius.y/i.sphere.radius.x,y={x:2*i.sphere.radius.x+20>n?n/2-20:i.sphere.radius.x,y:2*i.sphere.radius.x+20>n?(n/2-20)*c:i.sphere.radius.y};let f=new a({center:o,radius:y,radiusOffset:i.sphere.radiusOffset,layersNum:i.sphere.layersNum,angleVel:i.sphere.angleVel,modifiers:l});const m=(i=[0,0,n,r])=>{t.fillStyle=d,t.fillRect(...i)},_=i=>{l.update(),f.update({plotting:!0,ctx:t})},p=function(t){let i,e=!1;const s=t=>{e||(e=!0),i=window.requestAnimationFrame(n)},r=t=>{i&&(window.cancelAnimationFrame(i),i=void 0,e=!1)},n=i=>{t(),s()};return{start:s,stop:r,toggle:t=>{(e=!e)?s():r()},get animating(){return e}}}(t=>{m(f.boundaries),_()});return document.addEventListener("keyup",t=>{" "==t.key&&p.toggle()}),{clear:m,update:_,animation:p}}({ctx:function(t="canvas"){const i=window.devicePixelRatio,e=window.innerHeight,s=window.innerWidth,r=document.querySelector(t).getContext("2d");return i&&(r.canvas.width=s*i,r.canvas.height=e*i,r.scale(i,i)),r}(),options:r,setModifiers:function(t){let i=0;return{update:function(){i+=.02},modifySmallRadius:function(t){return.8},modifyLayerRadius:function(t,i,e){return t},modifyOutlinePoint:function(e,r,n,a,u){return t[1].C=t[1].orig.C*i,e.sub(new s(t[1].getPoint(n),t[2].getPoint(n)))},modifyEllipseRadius:function(i,e,s,r){return t[0].getPoint(e)+i},setColor:function(t){return`hsl(${1.2*t+100}, 40%, 60%)`},setLineWidth:function(t){return.0035*(t+1)}}}});o.clear(),o.animation.start()}]);