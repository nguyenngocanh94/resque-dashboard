angular.module("app").controller("jobClassDistributionController",["$scope","$http",function(a,b){"use strict";function c(a,b,c){var d=80,e=40,f=14,g=d3.scale.category20(),h=5,i=0,j=[];for(var k in c)c[k].perc<h?i+=c[k].perc:j.push(c[k]);i>0&&("other"===j[j.length-1].name.toLowerCase()?j[j.length-1].perc+=i:j.push({name:"Other",perc:i}));var l=d3.layout.pie().value(function(a){return a.perc}),m=$("#"+a),n=m.width(),o=250,p=d3.svg.arc().startAngle(function(a){return a.startAngle}).endAngle(function(a){return a.endAngle}).innerRadius(e).outerRadius(d),q=function(a){return a>1e4?Math.round(a/1e3)+"K":a},r=d3.select(m[0]).append("svg:svg").attr("class","classyPieChart").attr("width",n).attr("height",o),s=r.append("svg:g").attr("transform","translate("+n/2+","+o/2+")"),t=r.append("svg:g").attr("transform","translate("+n/2+","+o/2+")"),u=r.append("svg:g").attr("transform","translate("+n/2+","+o/2+")");s.selectAll("path").data(l(j)).enter().append("svg:path").attr("d",p).attr("stroke","white").attr("stroke-width",.5).attr("fill",function(a,b){return g(b)}).each(function(a,b){j[b].startAngle=a.startAngle,j[b].endAngle=a.endAngle}),0===j.length&&(s.append("svg:circle").attr("fill","#EFEFEF").attr("r",d),u.append("svg:circle").attr("fill","white").attr("r",e)),u.append("svg:text").attr("class","pie-label").attr("dy",-15).attr("text-anchor","middle").text("TOTAL"),u.append("svg:text").attr("class","pie-total").attr("dy",7).attr("text-anchor","middle").text(q(b)),u.append("svg:text").attr("class","pie-units").attr("dy",21).attr("text-anchor","middle").text("jobs");var v=t.selectAll("line").data(j);v.enter().append("svg:line").attr("x1",0).attr("x2",0).attr("y1",-d-3).attr("y2",-d-8).attr("stroke","gray").attr("transform",function(a){return"rotate("+(a.startAngle+a.endAngle)/2*(180/Math.PI)+")"}),t.selectAll("text.pie-value").data(j).attr("dy",function(a){return(a.startAngle+a.endAngle)/2>Math.PI/2&&(a.startAngle+a.endAngle)/2<1.5*Math.PI?5:-7}).attr("text-anchor",function(a){return(a.startAngle+a.endAngle)/2<Math.PI?"beginning":"end"}).enter().append("svg:text").attr("class","pie-value").attr("transform",function(a){return"translate("+Math.cos((a.startAngle+a.endAngle-Math.PI)/2)*(d+f)+","+Math.sin((a.startAngle+a.endAngle-Math.PI)/2)*(d+f)+")"}).attr("dy",function(a){return(a.startAngle+a.endAngle)/2>Math.PI/2&&(a.startAngle+a.endAngle)/2<1.5*Math.PI?5:-7}).attr("text-anchor",function(a){return(a.startAngle+a.endAngle)/2<Math.PI?"beginning":"end"}).text(function(a){return Math.round(a.perc)+"%"});var w=t.selectAll("text.pie-units").data(j).attr("dy",function(a){return(a.startAngle+a.endAngle)/2>Math.PI/2&&(a.startAngle+a.endAngle)/2<1.5*Math.PI?17:5}).attr("text-anchor",function(a){return(a.startAngle+a.endAngle)/2<Math.PI?"beginning":"end"}).text(function(a){return a.name});w.enter().append("svg:text").attr("class","pie-units").attr("transform",function(a){return"translate("+Math.cos((a.startAngle+a.endAngle-Math.PI)/2)*(d+f)+","+Math.sin((a.startAngle+a.endAngle-Math.PI)/2)*(d+f)+")"}).attr("dy",function(a){return(a.startAngle+a.endAngle)/2>Math.PI/2&&(a.startAngle+a.endAngle)/2<1.5*Math.PI?17:5}).attr("text-anchor",function(a){return(a.startAngle+a.endAngle)/2<Math.PI?"beginning":"end"}).text(function(a){return a.name})}a._init=0,a.init=function(){var d="api/jobs/distribution/class";"undefined"!=typeof a.limit&&(d+="/"+a.limit),a.displayedCount=0,b({method:"GET",url:d}).success(function(b){for(var d in b.stats)b.stats[d].rank=+d+1,a.displayedCount+=b.stats[d].count;a.displayedCount<b.total&&b.stats.push({rank:b.stats.length+1,name:"Other",count:b.total-a.displayedCount,perc:100*((b.total-a.displayedCount)/b.total)}),a.classes=b.stats,a.total=b.total,0===a.total?a._init=2:(a._init=1,c("jobRepartition",a.total,a.classes))}).error(function(b,c){a._errorCode=c,a._init=3})},a.init()}]);