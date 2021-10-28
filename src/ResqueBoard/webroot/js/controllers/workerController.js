angular.module("app").controller("workerController",["$scope","$http","jobsSuccessCounter","jobsFailedCounter","workersStartListener","workersStopListener","workersPauseListener","workersResumeListener",function(a,b,c,d,e,f,g,h){"use strict";a._init=0,a.workers={},a.length=0;var i={};a.jobsCount=0,a.init=function(){b({method:"GET",url:"api/workers"}).success(function(b){if($.isEmptyObject(b))a._init=2;else{a.workers=b;var c=Object.keys(b);for(var d in c)a.jobsCount+=a.workers[c[d]].stats.processed,a.updateStats(c[d]),a.workers[c[d]].active=!0;a.length=c.length,a._init=1}}).error(function(b,c){a._errorCode=c,a._errorMessage=b.message,a._init=3})},a.init(),c.onmessage(function(b){var c=JSON.parse(b.data);a.workers.hasOwnProperty(c.data.worker)?(a.workers[c.data.worker].stats.processed++,a.updateStats(c.data.worker)):i.hasOwnProperty(c.data.worker)?i[c.data.worker].stats.processed++:i[c.data.worker]={stats:{processed:1,failed:0}},a.jobsCount++}),d.onmessage(function(b){var c=JSON.parse(b.data);a.workers.hasOwnProperty(c.data.worker)?a.workers[c.data.worker].stats.failed++:i.hasOwnProperty(c.data.worker)?i[c.data.worker].stats.failed++:i[c.data.worker]={stats:{processed:0,failed:1}}}),a.updateStats=function(b){var c=moment(a.workers[b].start),d=moment().diff(c,"minutes");a.workers[b].stats.jobrate=0===d?a.workers[b].stats.processed:a.workers[b].stats.processed/d,0!==a.jobsCount&&(a.workers[b].stats.jobperc=100*a.workers[b].stats.processed/a.jobsCount)},e.onmessage(function(b){var c=JSON.parse(b.data),d=c.data.worker.split(":"),e=d[0]+":"+d[1],f={fullname:c.data.worker,id:e,host:d[0],process:d[1],queues:d[2].split(","),start:c.time,active:!0,status:null,working:!1,stats:{processed:0,failed:0,jobrate:0,jobperc:0}};a.workers[e]=f,a.length++,a._init=1,i.hasOwnProperty(e)&&(a.workers[e].stats.processed+=i[e].stats.processed,a.workers[e].stats.failed+=i[e].stats.failed,delete i[e])}),f.onmessage(function(b){var c=JSON.parse(b.data);delete a.workers[c.data.worker],a.length--,0===a.length&&(a._init=2)}),g.onmessage(function(b){var c=JSON.parse(b.data);a.workers[c.data.worker].active=!1,a.workers[c.data.worker].status="paused",a.workers[c.data.worker].working=!1}),h.onmessage(function(b){var c=JSON.parse(b.data);a.workers[c.data.worker].status=null,a.workers[c.data.worker].active=!0,a.workers[c.data.worker].working=!1}),a.pause=function(c){b({method:"GET",url:"api/workers/pause/"+a.workers[c].fullname}).success(function(){a.workers[c].status="pausing …",a.workers[c].working=!0}).error(function(b){alert(b.message),410===status?a.cleanupWorker(c):"Worker is already paused"===b.message&&(a.workers[c].active=!1,a.workers[c].status="paused")})},a.resume=function(c){b({method:"GET",url:"api/workers/resume/"+a.workers[c].fullname}).success(function(){a.workers[c].status="resuming …",a.workers[c].working=!0}).error(function(b,d){alert(b.message),410===d?a.cleanupWorker(c):"Worker is already running"===b.message&&(a.workers[c].active=!0,a.workers[c].status=null)})},a.stop=function(c){b({method:"GET",url:"api/workers/stop/"+a.workers[c].fullname}).success(function(){a.workers[c].status="stopping …",a.workers[c].working=!0}).error(function(b,d){alert(b.message),410===d&&a.cleanupWorker(c)})},a.cleanupWorker=function(b){a.workers[b].active=!0,delete a.workers[b],a.length--,0===a.length&&(a._init=2)}}]);