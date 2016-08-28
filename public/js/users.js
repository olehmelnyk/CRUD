'use strict';

let addUser = $('#addUser');
let updateUser = $('#updateUser');
let deleteUser = $('.deleteUser');

function getFormData(form){
    return form.serializeArray().reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
    }, {});
}

addUser.on('submit', e => {
    e.preventDefault();
    $.ajax({
        url: '/users',
        method: 'POST',
        data: getFormData(addUser),
        success: (data) => { if(data.status === 'ok') window.location = '/users'}
    });
    //window.location = '/users';
});

updateUser.on('submit', e => {
    e.preventDefault();
    let data = getFormData(updateUser);
    $.ajax({
        url: `/users/${data['id'].value}`,
        method: 'PUT',
        data: data,
        success: (data) => { if(data.status === 'ok') window.location = '/users'}
    });
});

deleteUser.each((i, delBtn) => {
    delBtn.addEventListener('click', e => {
        e.preventDefault();
        let uid = +delBtn.getAttribute('data-uid');
        if(confirm('Are you sure you want to delete this user?')){
            $.ajax({
                url: `/users/${uid}`,
                method: 'DELETE',
                data: uid,
                success: (data) => { if(data.status === 'ok') window.location = '/users'}
            });
        }
    });
});