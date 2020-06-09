<?php
// Include necessary file
require_once('./includes/db.inc.php');

// Check if user is already logged in
if ($user->is_logged_in()) {
    // Redirect logged in user to their home page
    $user->redirect('home.php');
}

// Check if log-in form is submitted
if (isset($_POST['log_in'])) {
    // Retrieve form input
    $user_name = trim($_POST['user_name_email']);
    $user_email = trim($_POST['user_name_email']);
    $user_password = trim($_POST['user_password']);

    // Check for empty and invalid inputs
    if (empty($user_name) || empty($user_email)) {
        array_push($errors, "Please enter a valid username or e-mail address");
    } elseif (empty($user_password)) {
        array_push($errors, "Please enter a valid password.");
    } else {
        // Check if the user may be logged in
        if ($user->login($user_name, $user_email, $user_password)) {
            // Redirect if logged in successfully
            $user->redirect('home.php');
        } else {
            array_push($errors, "Incorrect log-in credentials.");
        }
    }
}

// Check if register form is submitted
if (isset($_POST['register'])) {
    // Retrieve form input
    $user_name = trim($_POST['user_name']);
    $user_email = trim($_POST['user_email']);
    $user_password = trim($_POST['user_password']);
    $user_role = trim($_POST['user_role']);

    // Check for empty and invalid inputs
    if (empty($user_name)) {
        array_push($errors, "Prosím vyplňte jméno.");
    } elseif (empty($user_email)) {
        array_push($errors, "Prosím vyplňte email.");
    } elseif (empty($user_password)) {
        array_push($errors, "Prosím vyplňte heslo.");
    } elseif (empty($user_role)) {

        array_push($errors, "Prosím zadejte roli uživatele.");
    } else {
        try {
            // Define query to select matching values
            $sql = "SELECT name, email FROM users WHERE name=:name OR email=:email";

            // Prepare the statement
            $query = $db_conn->prepare($sql);

            // Bind parameters
            $query->bindParam(':name', $user_name);
            $query->bindParam(':email', $user_email);

            // Execute the query
            $query->execute();

            // Return clashes row as an array indexed by both column name
            $returned_clashes_row = $query->fetch(PDO::FETCH_ASSOC);

            // Check for usernames or e-mail addresses that have already been used
            if ($returned_clashes_row['name'] == $user_name) {
                array_push($errors, "That username is taken. Please choose something different.");
            } elseif ($returned_clashes_row['email'] == $user_email) {
                array_push($errors, "That e-mail address is taken. Please choose something different.");
            } else {
                // Check if the user may be registered
                if ($user->register($user_name, $user_email, $user_password, $user_role)) {
                    echo "Registered";
                }
            }
        } catch (PDOException $e) {
            array_push($errors, $e->getMessage());
        }
    }
}

if (isset($_POST['logout'])) {
    session_destroy();
    unset($_SESSION['user_session']);
}
?>
<?php include_once('./includes/src/header.php') ?>

<main role="main" class="flex-shrink-0">
    <div class="container">
        <div class="row">
            <!-- Log in -->
            <div class="mt-5 col-6">
                <h2>Přihlásit se</h2>
                <form action="/index.php" method="POST">
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
</body>

</html>