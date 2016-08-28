'use strict';

$('#cancel').on('click', () => {window.history.back();});

function getFormData(form){
    return form.serializeArray().reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
    }, {});
}