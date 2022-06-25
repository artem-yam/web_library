let Utils = function () {
    const AJAX_DATA_TYPE = "application/json";

    function setElementProperty(element, property, value) {
        element[property] = value;
    }

    function resetInnerHTML(element) {
        setElementProperty(element, "innerHTML", "");
    }

    function sendRequest(url, data, requestType) {
        let ajaxRequest;

        if (!requestType) {
            requestType = requestType.GET;
        }

        ajaxRequest = $.ajax({
            url: url,
            type: requestType,
            contentType: AJAX_DATA_TYPE,
            data: JSON.stringify(data)
        });

        ajaxRequest.then(function (data) {
            return data;
        }, function (error) {
            console.log("Error status = " + error.status);
            throw(error);
        });

        return ajaxRequest;
    }

    return {
        setElementProperty,
        resetInnerHTML,
        sendRequest
    }

}();

