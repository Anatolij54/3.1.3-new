$(async function () {
    await getTableWithUsers();
    //await getNewUserForm();
    await getDefaultModal();
   // await addNewUser();
})


const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    // bodyAdd : async function(user) {return {'method': 'POST', 'headers': this.head, 'body': user}},
    findAllUsers: async () => await fetch('api/users'),
    findOneUser: async (id) => await fetch(`api/users/${id}`),
    addNewUser: async (user) => await fetch('api/users', {
        method: 'POST',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),
    updateUser: async (user, id) => await fetch(`api/users/${id}`, {
        method: 'PUT',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),
    deleteUser: async (id) => await fetch(`api/users/${id}`, {method: 'DELETE', headers: userFetchService.head})
}

async function getTableWithUsers() {
    let table = $('#mainTableWithUsers tbody');
    table.empty();

    await userFetchService.findAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let tableFilling = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.userName}</td>
                            <td>${user.userLastName}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.roles.map(roleUser =>
                    roleUser.role
                )}</td>     
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-info" 
                                data-toggle="modal" data-target="#someDefaultModal">Edit</button>
                            </td>
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger" 
                                data-toggle="modal" data-target="#someDefaultModal">Delete</button>
                            </td>
                        </tr>
                )`;
                table.append(tableFilling);
            })
        })

    // обрабатываем нажатие на любую из кнопок edit или delete
    // достаем из нее данные и отдаем модалке, которую к тому же открываем
    $("#mainTableWithUsers").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}


// async function getNewUserForm() {
//     let button = $(`#SliderNewUserForm`);
//     let form = $(`#defaultSomeForm`)
//     button.on('click', () => {
//         if (form.attr("data-hidden") === "true") {
//             form.attr('data-hidden', 'false');
//             form.show();
//             button.text('Hide panel');
//         } else {
//             form.attr('data-hidden', 'true');
//             form.hide();
//             button.text('Show panel');
//         }
//     })
// }


// что то деалем при открытии модалки и при закрытии
// основываясь на ее дата атрибутах
async function getDefaultModal() {
    $('#someDefaultModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false
    }).on("show.bs.modal", (event) => {
        let thisModal = $(event.target);
        let userid = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');
        switch (action) {
            case 'edit':
                editUser(thisModal, userid);
                break;
            case 'delete':
                deleteUser(thisModal, userid);
                break;
        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}


// редактируем юзера из модалки редактирования, забираем данные, отправляем
async function editUser(modal, id) {
    console.log(id);
    let preuser = await userFetchService.findOneUser(id);
    let user = preuser.json();
    console.log(user);

    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-outline-success" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>;`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group" id="editUser">
            
       
                                                               
                                                                        <label for="id">ID</label>
                                                                        <input type="text"
                                                                               value="${user.id}"
                                                                               class="form-control"
                                                                               id="id"
                                                                               name ="id"
                                                                               disabled
                                                                               >
                                                                   
                                                                  
                                                                        <label for="userName">First
                                                                            name</label>
                                                                        <input type="text"
                                                                               value="${user.userName}"
                                                                               name="userName"
                                                                               class="form-control"
                                                                               id="userName">
                                                             
                                                             
                                                                        <label for="userLastName">Last
                                                                            name</label>
                                                                        <input type="text"
                                                                               value="${user.userLastName}"
                                                                               name="userLastName"
                                                                               class="form-control"
                                                                               id="userLastName">
                                                                 
                                                                        <label for="age">Age</label>
                                                                        <input type="number"
                                                                               value="${user.age}"
                                                                               name="age"
                                                                               class="form-control"
                                                                               min="1" value="1"
                                                                               id="age">
                                                                   
                                                                        <label for="email">Email</label>
                                                                        <input type="text"
                                                                               value="${user.email}"
                                                                               class="form-control"
                                                                               name="email"
                                                                               id="email">
                                                                   
                                                                        <label for="password">Password</label>
                                                                        <input type="text"
                                                                               value="${user.password}"
                                                                               class="form-control"
                                                                         
                                                                               name="password"
                                                                               id="password">
                                                                   
                                                                        <label>Role</label>
                                                                        <select name="roles" id="roles"
                                                                                class="form-select" size="2" multiple
                                                                                aria-label="multiple select example">
                                                                            <option value="USER">USER</option>
                                                                            <option value="ADMIN">ADMIN</option>
                                                                        </select>
                                                                  
                
                
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        let id = modal.find("#id").val().trim();
        let userName = modal.find("#userName").val().trim();
        let userLastName = modal.find("#userLastName").val().trim();
        let age = modal.find("#age").val().trim();
        let email = modal.find("#email").val().trim();
        let password = modal.find("#password").val().trim();
        let roles = modal.find("#roles").val().trim();
        let data = {
            id: id,
            username: userName,
            userLastName: userLastName,
            age: age,
            email: email,
            password: password,
            roles: roles
        }
        const response = await userFetchService.updateUser(data, id);

        if (response.ok) {
            getTableWithUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}


// удаляем юзера из модалки удаления
async function deleteUser(modal, id) {
    await userFetchService.deleteUser(id);
    getTableWithUsers();
    modal.find('.modal-title').html('');
    modal.find('.modal-body').html('User was deleted');
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(closeButton);
}


// async function addNewUser() {
//     $('#addNewUserButton').click(async () => {
//         let addUserForm = $('#defaultSomeForm')
//         let login = addUserForm.find('#AddNewUserLogin').val().trim();
//         let password = addUserForm.find('#AddNewUserPassword').val().trim();
//         let age = addUserForm.find('#AddNewUserAge').val().trim();
//         let data = {
//             login: login,
//             password: password,
//             age: age
//         }
//         const response = await userFetchService.addNewUser(data);
//         if (response.ok) {
//             getTableWithUsers();
//             addUserForm.find('#AddNewUserLogin').val('');
//             addUserForm.find('#AddNewUserPassword').val('');
//             addUserForm.find('#AddNewUserAge').val('');
//         } else {
//             let body = await response.json();
//             let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
//                             ${body.info}
//                             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//                                 <span aria-hidden="true">&times;</span>
//                             </button>
//                         </div>`;
//             addUserForm.prepend(alert)
//         }
//     })
// }