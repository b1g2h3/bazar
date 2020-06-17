<div class="col-12 mt-5">
    <h2>Inzerát</h2>
    <div class="hidden alert alert-success font-weight-bold" role="alert"></div>
    <div class="hidden alert  alert-danger font-weight-bold" role="alert"></div>
    <?php if(empty($article['reservation'])) {?>
    <button type="button" class="d-print-none btn btn-primary mb-3" data-toggle="modal" data-target="#addReservation">Rezervovat inzerátu</button>
    <button type="button" class="d-print-none btn btn-secondary mb-3" data-toggle="modal" data-target="#sendArticleOnEmail">Odeslat inzerát na email</button>
    <?php } ?>
    <div id="addReservation" class="modal fade d-print-none" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form method="post" action="ajax.php" data-form-output="form-output-global" data-form-type="forms">
                    <div class="modal-body sendReservationToEmail">
                        <h2>Rezervovat inzerát</h2>
                        <?php
                        \App\Services\Input::create('Jméno', 'text', true);
                        \App\Services\Input::create('Email', 'email', true);
                        ?>
                        <div class="form-group">
                            <label for="Zpráva">Zpráva:</label>
                            <textarea name="Zpráva" required class="form-control" placeholder="Zpráva" id="Zpráva" cols="30" rows="2"></textarea>
                            <div id="errZpráva" class="hidden error text-danger"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Zavřít</button>
                        <button type="button" class="btn btn-primary sendReservation">Odeslat zprávu</button>
                    </div>
                </form>

            </div>

        </div>
    </div>
    <div id="sendArticleOnEmail" class="modal fade d-print-none" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form method="post" action="ajax.php" data-form-output="form-output-global" data-form-type="forms">
                    <div class="modal-body sendArticleToEmail">
                        <h2>Odešlete si inzerát na svůj email</h2>
                        <?php
                        \App\Services\Input::create('Email', 'email', true);
                        ?>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Zavřít</button>
                        <button type="button" class="btn btn-primary sendArticleEmail">Odeslat inzerát</button>
                    </div>
                </form>

            </div>

        </div>
    </div>
    <div class="row">
        <div class="col-4 mt-2">
            <h3>
                <?php echo $article['title']; ?>
            </h3>
            <div>Cena: <strong><?php echo $article['price'] ?></strong> kč</div>
            <div>Lokalita: <strong><?php echo $article['location'] ?></strong></div>
            <?php if(!empty($article['reservation'])) {?>
            <div><h3>Inzerát již byl rezervován</h3></div>
            <?php  } ?>
            <div>
                <div>Popis:
                    <p>
                        <?php echo $article['description'] ?>
                    </p>
                </div>

            </div>

        </div>
        <div class="row">

            <?php
            if($article['images']) {
            foreach ($article['images'] as $image) { ?>
            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 image">
                <div class="img-wrapper">
                    <?php echo '<img class="w-100" src="data:image/jpg;base64,' . base64_encode($image['image']) . '" />'; ?>
                    <div class="img-overlay">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        <?php
                }
            } else {
                ?>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 image">
                    <div class="img-wrapper">
                        <?php echo '<img class="w-100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/No_image_available_cs.svg/768px-No_image_available_cs.svg.png" />'; ?>
                        <div class="img-overlay">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
         <?php
            }
            ?>
    </div>
</div>