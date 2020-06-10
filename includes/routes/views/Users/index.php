<main role="main" class="flex-shrink-0">
    <div class="container">
        <div class="row">

            <div class="col-6 mt-5">
                <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#addUser">Vytvořit uživatele</button>
                <!-- Modal -->
                <div id="addUser" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form action="/indexx.php" method="POST">
                                <div class="modal-body">
                                    <h2>Vytvořit uživatele</h2>
                                    <div class="form-group">
                                        <label for="name">Jméno:</label>
                                        <input type="text" name="user_email" class="form-control" placeholder="Jméno" id="name">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email:</label>
                                        <input type="email" name="user_name" class="form-control" placeholder="Email" id="email">
                                    </div>
                                    <div class="form-group">
                                        <label for="pwd">Heslo:</label>
                                        <input type="password" name="user_password" class="form-control" placeholder="Heslo" id="pwd">
                                    </div>
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
                                    <button name="register" type="submit" class="btn btn-primary">Vytvořit uživatele</button>
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
                                    <div class="form-group">
                                        <label for="name">Jméno:</label>
                                        <input type="text" name="user_name" class="form-control" placeholder="Jméno" id="name">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email:</label>
                                        <input type="email" name="user_name" class="form-control" placeholder="Email" id="email">
                                    </div>
                                    <!--                                <div class="form-group">-->
                                    <!--                                    <label for="pwd">Heslo:</label>-->
                                    <!--                                    <input type="password" name="user_password" class="form-control" placeholder="Heslo" id="pwd">-->
                                    <!--                                </div>-->
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
                                    <button type="button"  class="btn btn-primary edit_user">Upravit uživatele</button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
                <table id="example" class="table table-striped table-bordered" style="width:100%">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Jméno</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach($allUsers as $user) {?>
                        <tr>
                            <td><?php echo $user['id'] ?></td>
                            <td><?php echo $user['name'] ?></td>
                            <td><?php echo $user['email'] ?></td>
                            <td><?php echo $user['roles_id'] == 1 ? 'Admin' : 'Editor' ?></td>
                        </tr>
                    <?php } ?>
                    </tfoot>
                </table>
            </div>
        </div>
</main>

