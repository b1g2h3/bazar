<?php
declare(strict_types=1);

// Include necessary file
require_once('./includes/core.inc.php');


// Check if user is not logged in
if (!$user->is_logged_in()) {
    $user->redirect('indexx.php');
}

try {
    // Define query to select values from the users table
    $sql = "SELECT * FROM users WHERE id=:id";

    // Prepare the statement
    $query = $db_conn->prepare($sql);

    // Bind the parameters
    $query->bindParam(':id', $_SESSION['user_session']);

    // Execute the query
    $query->execute();

    // Return row as an array indexed by both column name
    $returned_row = $query->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    array_push($errors, $e->getMessage());
}

if (isset($_GET['logout']) && ($_GET['logout'] == 'true')) {
    $user->log_out();
    $user->redirect('indexx.php');
}

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Title</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../../css/app.css" crossorigin="anonymous">

</head>

<body>
    <?php
    include_once('includes/src/nav.php');

    ?>

    <?php if (count($errors) > 0) : ?>
        <p>Error(s):</p>
        <ul>
            <?php foreach ($errors as $error) : ?>
                <li><?= $error ?></li>
            <?php endforeach ?>
        </ul>

    <?php endif; ?>

    <!-- Begin page content -->
    <main role="main" class="flex-shrink-0">
        <!--    <div class="container">-->
        <!--        <div class="container">-->
        <!--            Add article -->
        <!--            <div class="col-6 mt-5">-->
        <!--                <h2>Přidat inzerát</h2>-->
        <!--                <form action="/file-upload" class="dropzone">-->
        <!--                    <div class="fallback">-->
        <!--                        <input name="file" type="file" multiple />-->
        <!--                    </div>-->
        <!--                </form>-->
        <!---->
        <!--                <form action="/index.php" method="POST">-->
        <!--                    <div class="form-group">-->
        <!--                        <label for="name">Název:</label>-->
        <!--                        <input type="text" name="article_title" class="form-control" placeholder="Titulek" id="name">-->
        <!--                    </div>-->
        <!--                    <div class="form-group">-->
        <!--                        <label for="desc">Popis:</label>-->
        <!--                        <textarea name="article_description" placeholder="Popisek" class="form-control" id="desc" rows="3"></textarea>-->
        <!--                    </div>-->
        <!--                    <button name="addArticle" type="submit" class="btn btn-primary">Vytvořit </button>-->
        <!--                </form>-->
        <!---->
        <!--        </div>-->
        <!--    </div>-->


        <?php

        // process $_POST request
        if (isset($_POST["submitDropzone"])) {
            // Do something
            print_r($_POST);
        }

        ?>

        <form id="dropzone-form" action="home.php" method="POST" enctype="multipart/form-data">

            <div class="uk-margin">
                <input class="uk-input" type="text" name="name" palceholder="Name" />
            </div>

            <div class="uk-margin">
                <input class="uk-input" type="email" name="email" palceholder="Email Address" />
            </div>

            <div id="dropzone" class="dropzone"></div>

            <div class="uk-margin-top">
                <input id="submit-dropzone" class="uk-button uk-button-primary" type="submit" name="submitDropzone" value="Submit" />
            </div>

        </form>


    </main>

    <?php
    include_once('includes/src/scripts.php')
    ?>
</body>

</html>