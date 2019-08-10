const selectionSort = (array: Array<any>): void => {
    var temp;

    for(var i=0; i<array.length; i++){
        var mi = i;
        
        for(var j = i + 1; j<array.length; j++) {
            if(array[j] < array[mi])
                mi = j;
        }
        temp = array[i];
        array[i] = array[mi];
        array[mi] = temp;
    }
};

const binarySearch = (array: Array<any>, target: Object<any>): Number => {
    let leftIndex = 0;
    let rightIndex = array.length - 1;
    let middleIndex;

    while (leftIndex <= rightIndex) {
        middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
        if (array[middleIndex] === target) {
            return middleIndex;
        }
        if (arr[middleIndex] < target) {
            leftIndex = middleIndex + 1;
        } else {
            rightIndex = middleIndex - 1;
        }
    }
    return -1;
};

const linearSearch = (array: Array<any>, item: Object<any>): Number => {
    for (let i = 0; i < array.length; i++) {
      if(array[i] === item) {
        return i;
      }
    }
    return -1;
};


/*
(function ($) {
    $.CreateSingleton = function (p) {
        var Singleton = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: "Web Service url",
                method: "",
                ajaxCallMode: 0,
                successMethod: "",
                failureMethod: ""
            },
            init: function () {
                
                
            },
            
            ajaxCall: function () {
                $.ajax({
                    type: Singleton.config.type,
                    contentType: Singleton.config.contentType,
                    cache: Singleton.config.cache,
                    url: Singleton.config.baseURL + Singleton.config.method,
                    data: Singleton.config.data,
                    dataType: Singleton.config.dataType,
                    success: Singleton.config.successMethod,
                    error: Singleton.config.failureMethod,
                    async: Singleton.config.async
                });
            },

            invokeAjax: function(){
                cat.config.method = "method";
                cat.config.data = JSON.stringify({
                    param1: value1
                });
                cat.config.successMethod = cat.invokeAjaxSuccess;
                cat.config.failureMethod = cat.invokeAjaxFailure;
                cat.ajaxCall(cat.config);
            },

            invokeAjaxSuccess: function(data){
            	console.log(data.d);
            },

            invokeAjaxFailure: function(){
            	console.log("Something went wrong.", "error");
            }
        };
        Singleton.init();
    };
    $.fn.CallSingleton = function (p) {
        $.CreateSingleton(p);
    };
})(jQuery);
*/