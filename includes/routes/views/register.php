<?php
declare(strict_types=1);
require_once 'includes/core.inc.php';


if (Input::exists()) {
    if (Token::check(Input::get('token'))) {
        $validate = new Validate();
        $validation = $validate->check($_POST, array(
            'email' => array(
                'required' => true,
                'min' => 2,
                'max' => 30,
                'unique' => 'users',
                // 'email' => true,
            ),
            'password' => array(
                'required' => true,
                'min' => 6
            ),
            'password_again' => array(
                'required' => true,
                'matches' => 'password'
            ),
            'name' => array(
                'required' => true,
                'min' => 2,
                'max' => 50
            ),
            'roles_id' => array(
                'required' => true,
            )
        ));

        if ($validation->passed()) {

            $user = new User();

            try {
                $user->create(array(
                    'name'        => Input::get('name'),
                    'email'    => Input::get('email'),
                    'password'    => Hash::make(Input::get('password')),
                    'roles_id'        => Input::get('roles_id'),
                ));
                // Session::flash('home', 'You have been registered and can now log in!');
                header('Location: indexx.php');
                // Redirect::to('indexx.php');
            } catch (Exception $e) {
                die($e->getMessage());
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
<?php include_once('./includes/src/nav.php') ?>

<main role="main" class="flex-shrink-0">
    <div class="container">
        <div class="row">
            <!-- Log in -->
            <div class="mt-5 col-6">
                <form action="" method="post">
                    <h2>Vytvořit uživatele</h2>
                    <div class="form-group">
                        <label for="name">Jméno:</label>
                        <input type="text" name="name" class="form-control" placeholder="Jméno" value="<?php echo escape(Input::get('name')); ?>" id="name" minlength="2" maxlength="20" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" name="email" class="form-control" placeholder="Email" value="<?php echo escape(Input::get('email')); ?>" id="email" minlength="2" maxlength="50" required>
                    </div>
                    <div class="form-group">
                        <label for="pwd">Heslo:</label>
                        <input type="password" name="password" class="form-control" value="<?php echo escape(Input::get('password')); ?>" placeholder="Heslo" id="pwd" minlength="6" required>
                    </div>
                    <div class="form-group">
                        <label for="pwd2">Potvrdit heslo:</label>
                        <input type="password" name="password_again" class="form-control" value="<?php echo escape(Input::get('password_again')); ?>" placeholder="Potvrdit heslo" minlength="6" id="pwd2" required>
                    </div>
                    <div class="form-group">
                        <label for="role">Role:</label>
                        <select name="roles_id" class="form-control" placeholder="Role" id="role" required>
                            <option value="1">Admin</option>
                            <option value="2">Editor</option>
                        </select>
                    </div>
                    <input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />
                    <button name="login" type="submit" class="btn btn-primary">Přihlásit</button>
                </form>
            </div>
        </div>
    </div>
</main>

<?php include_once('./includes/src/footer.php') ?>