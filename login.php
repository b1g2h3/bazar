<?php

require_once 'includes/db.inc.php';
$validate = new Validate();

if (Input::exists()) {

    if (Token::check(Input::get('token'))) {

        $validate = new Validate();
        $validation = $validate->check($_POST, array(
            'name' => array('required' => true),
            'password' => array('required' => true)
        ));
        if ($validation->passed()) {
            // Login user
            $user = new User();

            $login = $user->login(Input::get('name'), Input::get('password'), false);

            if ($login) {
                // echo 'Success';
                Redirect::to('index.php');
            } else {
                echo '<p>Sorry, logging in failed';
            }
        } else {
            foreach ($validation->errors() as $error) {
                echo $error, '<br>';
            }
        }
    }
}

?>
<?php include_once('./includes/src/header.php') ?>

<main role="main" class="flex-shrink-0">
    <div class="container">
        <div class="row">
            <!-- Log in -->
            <div class="mt-5 col-6">
                <h2>Přihlásit se</h2>

                <form action="" method="post">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" name="name" class="form-control" placeholder="Email" id="email">
                    </div>
                    <div class="form-group">
                        <label for="pwd">Heslo:</label>
                        <input type="password" name="password" class="form-control" placeholder="Heslo" id="pwd">
                    </div>
                    <input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />
                    <button name="login" type="submit" class="btn btn-primary">Přihlásit</button>
                </form>
            </div>
        </div>
    </div>
</main>

<?php include_once('./includes/src/footer.php') ?>