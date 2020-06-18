<div class="col-6 mt-5">
    <div class="hidden alert alert-success font-weight-bold" role="alert"></div>
    <div class="hidden alert  alert-danger font-weight-bold" role="alert"></div>
    <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#addUser">Vytvořit uživatele</button>
    <div id="addUser" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body create">
                        <h2>Vytvořit uživatele</h2>
                        <?php
                        \App\Services\Input::create('Jméno', 'text', true);
                        \App\Services\Input::create('Email', 'email', true);
                        \App\Services\Input::create('Heslo', 'password', true);
                        ?>
                        <div class="form-group">
                            <label for="role">Role:</label>
                            <select name="user_role" class="form-control" placeholder="Role" id="role">
                                <option value="1">Admin</option>
                                <option value="2">Editor</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Zavřít</button>
                        <button type="button" class="btn btn-primary createUser">Vytvořit uživatele</button>
                    </div>
                </form>

            </div>

        </div>
    </div>
    <div id="updateUser" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form>
                    <div class="modal-body edit">
                        <h2>Upravit uživatele</h2>
                        <?php
                        \App\Services\Input::create('Jméno', 'text', true);
                        \App\Services\Input::create('Email', 'email', true);
                        \App\Services\Input::create('Heslo', 'password', false);
                        ?>
                        <div class="form-group">
                            <label for="role">Role:</label>
                            <select name="user_role" class="form-control" placeholder="Role" id="role">
                                <option value="Admin">Admin</option>
                                <option value="Editor">Editor</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger deleteUser">Smazat uživatele</button>
                        <button type="button" class="btn btn-primary editUser">Upravit uživatele</button>
                        <button type="button" class="btn btn-dark" data-dismiss="modal">Zavřít</button>
                    </div>
                </form>

            </div>

        </div>
    </div>
    <table id="users" class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>Jméno</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($allUsers as $user) { ?>
                <tr>
                    <td class="userID"><?php echo $user['id'] ?></td>
                    <td><?php echo $user['name'] ?></td>
                    <td><?php echo $user['email'] ?></td>
                    <td><?php echo $user['roles_id'] == 1 ? 'Admin' : 'Editor' ?></td>
                    <td>
                        <div style="cursor:pointer" class="editUserEvent">
                            <i class="fas fa-edit"></i>
                        </div>
                    </td>
                </tr>
            <?php } ?>
            </tfoot>
    </table>