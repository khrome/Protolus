/*
---
description: This is an asynchronous JS request pool for MooTools. Sometimes it's useful to fetch a bunch of resources in parallel, this plugin facilitates that.

license: MIT-style

authors:
- Abbey Hawk Sparrow

requires:
- XHTMLParser
- Class
- Request.JSON
- Request.HTML
- Asset

provides: [Request.Stable]

*/
if(!Array.copy){
    Array.implement({
        copy : function() {
            var result = [];
            this.each(function(item){
                result.push(item);
            }.bind(this));
            return result;
        }
    });
}

//collect a series of potentially async items into an ordered array, useful to auto-order async returns
if(!Array.collect){
    Array.implement({
        collect : function(fn, callback){
            var results = [];
            var count = 0;
            this.each(function(value, key){
                count++;
                fn(value, key, function(val){
                    results[key] = val;
                    count--;
                    if(count == 0) callback(results);
                });
            });
        }
    });
}

if(!Array.sumStrings){
    Array.implement({
        sumStrings : function(){
            var result = 0;
            this.each(function(child){
                var val = parseInt(Number.from(child));
                if(val) result += val;
            });
            return result;
        }
    });
}

if(!Array.commonBase){
    Array.implement({
        commonBase : function(legalTerminals){ //todo: support callback
            if(legalTerminals && typeOf(legalTerminals) == 'string') legalTerminals = [legalTerminals];
            var directories = this.clone();
            if(directories.length == 0) throw('empty array has no base');
            var candidate = directories.pop();
            if(candidate.lastIndexOf('/') != -1) candidate = candidate.substring(0, candidate.lastIndexOf('/'));
            directories.each(function(directory){
                if(candidate == '') return;
                if(directory.indexOf(candidate) == -1 && legalTerminals.contains(candidate.substr(candidate.length-1, 1))) return;
                else candidate = candidate.substring(0, candidate.length-1);
            });
            return candidate;
        }
    });
}

if(!Array.stringsThatBeginWith){
    Array.implement({
        stringsThatBeginWith : function(prefix){ //todo: support callback
            var results = [];
            this.each(function(item){
                if(typeOf(item) != 'string') throw('tried to call stringsThatBeginWith on an array containing something besides strings');
                if(item.substring(0, prefix.length) == prefix) results.push(item);
            });
            return result;
        }
    });
}