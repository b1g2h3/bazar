<?php
/*
error_reporting(E_ALL);
ini_set('display_errors', 1);
*/

require_once './includes/core.inc.php';

if(Session::exists('home')){
    echo '<p>' . Session::flash('home') . '</p>';
}


$user = new User(); // current user

    if (!$user->isLoggedIn()) {
        Redirect::to('login.php');
    }


?>

<?php include_once('./includes/src/header.php') ?>
<?php include_once('./includes/src/nav.php')    ?>

<main role="main" class="flex-shrink-0">
    <div class="container">
        <div class="row">
            <!-- Log in -->
            <div class="mt-5 col-6">
                <h2>Přihlásit se</h2>
                <form action="/indexx.php" method="POST">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" name="user_name_email" class="form-control" placeholder="Email" id="email">
                    </div>
                    <div class="form-group">
                        <label for="pwd">Heslo:</label>
                        <input type="password" name="user_password" class="form-control" placeholder="Heslo" id="pwd">
                    </div>
                    <button name="log_in" type="submit" class="btn btn-primary">Přihlásit</button>
                </form>
            </div>
        </div>
    </div>
</main>

<?php include_once('./includes/src/footer.php') ?>