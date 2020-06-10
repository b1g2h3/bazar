<?php
// Include necessary file
include_once './includes/core.inc.php';

// Check if user is not logged in
$user = new User(); // current user

if (!$user->isLoggedIn()) {
    Redirect::to('login.php');
}


if(isset($_POST["ukol"])) {

    $data = json_decode($_POST['data']);
//    $id = json_decode($_POST['id']);
//    $user_name = json_decode($_POST['name']);
//    $user_email = json_decode($_POST['email']);
//    $role = json_decode($_POST['role']);
//    // Check for empty and invalid inputs
//    try{
//        checkEmpty($id);
//        checkEmpty($user_name);
//        checkEmpty($user_email);
//        checkEmpty($role);
//        checkValidEmail($user_email);
//    } catch(Exception $ex) {
//        echo json_encode(array(
//            'success' => false,
//            'reason'  => $ex->getMessage(),
//        ));
//    }
}

function checkEmpty($value)
{
    if(empty($value)) {
        throw new Exception("Vyplńte všechny pole");
    }
    return true;
}

function checkValidEmail($email)
{
    //check if
    if(filter_var($email, FILTER_VALIDATE_EMAIL) === FALSE) {
        //throw exception if email is not valid
        throw new Exception($email);
    }
    return true;
}

?>

<?php if (count($errors)>0): ?>
    <p>Error(s):</p>
    <ul>
        <?php foreach ($errors as $error): ?>
            <li><?= $error ?></li>
        <?php endforeach ?>
    </ul>

<?php   endif; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Administrace</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../../css/app.css" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.21/datatables.min.css"/>
</head>
<body>
<?php
//include_once('includes/src/nav.php');

?>

<?php if (count($errors)>0): ?>
    <p>Error(s):</p>
    <ul>
        <?php foreach ($errors as $error): ?>
            <li><?= $error ?></li>
        <?php endforeach ?>
    </ul>

<?php   endif; ?>


<?php
    $users = $user->getAllUsers();
?>
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
                <?php foreach($users as $user) {?>
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

<?php
include_once('includes/src/scripts.php')
?>
<script src="../../js/admin.js"></script>
</body>
</html>
