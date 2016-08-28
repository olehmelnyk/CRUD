'use strict';

let deleteUser = $('.deleteUser');

deleteUser.each((i, delBtn) => {
    delBtn.addEventListener('click', e => {
        e.preventDefault();
        let uid = +delBtn.getAttribute('data-uid');
        if(confirm('Are you sure you want to delete this user?')){
            window.location = `users/${uid}/delete`;
        }
    });
});