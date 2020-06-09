<?php
// Include necessary file
include_once './includes/db.inc.php';

// Check if user is not logged in
if (!$user->is_logged_in()) {
    $user->redirect('index.php');
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
    $user->redirect('index.php');
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
    <link rel="stylesheet" href="includes/css/app.css" crossorigin="anonymous">

</head>
<body>
<?php
include_once('includes/src/nav.php');

?>

<?php if (count($errors)>0): ?>
    <p>Error(s):</p>
    <ul>
        <?php foreach ($errors as $error): ?>
            <li><?= $error ?></li>
        <?php endforeach ?>
    </ul>

<?php   endif; ?>

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
    if(isset($_POST["submitDropzone"])) {
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

<script>
    // disable autodiscover
    Dropzone.autoDiscover = false;

    var myDropzone = new Dropzone("#dropzone", {
        url: "upload.php",
        method: "POST",
        paramName: "file",
        autoProcessQueue : false,
        acceptedFiles: "image/*",
        maxFiles: 5,
        maxFilesize: 0.3, // MB
        uploadMultiple: true,
        parallelUploads: 100, // use it with uploadMultiple
        createImageThumbnails: true,
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        addRemoveLinks: true,
        timeout: 180000,
        dictRemoveFileConfirmation: "Are you Sure?", // ask before removing file
        // Language Strings
        dictFileTooBig: "File is to big ({{filesize}}mb). Max allowed file size is {{maxFilesize}}mb",
        dictInvalidFileType: "Invalid File Type",
        dictCancelUpload: "Cancel",
        dictRemoveFile: "Remove",
        dictMaxFilesExceeded: "Only {{maxFiles}} files are allowed",
        dictDefaultMessage: "Drop files here to upload",
    });

    myDropzone.on("addedfile", function(file) {
        //console.log(file);
    });

    myDropzone.on("removedfile", function(file) {
        // console.log(file);
    });

    // Add mmore data to send along with the file as POST data. (optional)
    myDropzone.on("sending", function(file, xhr, formData) {
        formData.append("dropzone", "1"); // $_POST["dropzone"]
    });

    myDropzone.on("error", function(file, response) {
        console.log(response);
    });

    // on success
    myDropzone.on("successmultiple", function(file, response) {
        // get response from successful ajax request
        console.log(response);
        // submit the form after images upload
        // (if u want yo submit rest of the inputs in the form)
        document.getElementById("dropzone-form").submit();
    });


    /**
     *  Add existing images to the dropzone
     *  @var images
     *
     */

    var images = [
        {name:"image_1.jpg", url: "example/image1.jpg", size: "12345"},
        {name:"image_2.jpg", url: "example/image2.jpg", size: "12345"},
        {name:"image_2.jpg", url: "example/image2.jpg", size: "12345"},
    ]

    for(let i = 0; i < images.length; i++) {

        let img = images[i];
        //console.log(img.url);

        // Create the mock file:
        var mockFile = {name: img.name, size: img.size, url: img.url};
        // Call the default addedfile event handler
        myDropzone.emit("addedfile", mockFile);
        // And optionally show the thumbnail of the file:
        myDropzone.emit("thumbnail", mockFile, img.url);
        // Make sure that there is no progress bar, etc...
        myDropzone.emit("complete", mockFile);
        // If you use the maxFiles option, make sure you adjust it to the
        // correct amount:
        var existingFileCount = 1; // The number of files already uploaded
        myDropzone.options.maxFiles = myDropzone.options.maxFiles - existingFileCount;

    }

    // button trigger for processingQueue
    var submitDropzone = document.getElementById("submit-dropzone");
    submitDropzone.addEventListener("click", function(e) {
        // Make sure that the form isn't actually being sent.
        e.preventDefault();
        e.stopPropagation();

        if (myDropzone.files != "") {
            // console.log(myDropzone.files);
            myDropzone.processQueue();
        } else {
            // if no file submit the form
            document.getElementById("dropzone-form").submit();
        }

    });
</script>
</body>
</html>
