<div class="col-12 mt-5">
    <h2>Inzeráty</h2>
    <div class="hidden alert alert-success font-weight-bold" role="alert"></div>
    <div class="hidden alert  alert-danger font-weight-bold" role="alert"></div>
    <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#addArticle">Vytvořit inzerát</button>
    <div id="addArticle" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form method="post" action="ajax.php" enctype="multipart/form-data" data-form-output="form-output-global" data-form-type="forms">
                    <div class="modal-body createArticle">
                        <h2>Vytvořit inzerát</h2>
                        <?php
                        \App\Services\Input::create('Název', 'text', false);
                        ?>
                        <div class="form-group">
                            <label for="Popis">Popis:</label>
                            <textarea name="Popis" required class="form-control" placeholder="Popis" id="Popis" cols="30" rows="2"></textarea>
                            <div id="errPopis" class="hidden error text-danger"></div>
                        </div>
                        <?php
                        \App\Services\Input::create('Telefon', 'phone', false);
                        \App\Services\Input::create('Lokalita', 'text', false);
                        \App\Services\Input::create('Cena', 'text', false);
                        ?>
                        <div id="errObrázky" class="hidden error text-danger"></div>
                        <div class="dropzone" id="myDropzone">
                            <div class="fallback">
                                <input class="form-input-file" id="form-input-file" type="file" name="articleImages" multiple />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Zavřít</button>
                        <button type="button" class="btn btn-primary addArticle">Vytvořit inzerát</button>
                    </div>
                </form>

            </div>

        </div>
    </div>
    <div id="editArticle" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form method="post" action="ajax.php" enctype="multipart/form-data" data-form-output="form-output-global" data-form-type="forms">
                    <div class="modal-body editArticle">
                        <h2>Upravit inzerát</h2>
                        <?php
                        \App\Services\Input::create('Název', 'text', false);
                        ?>
                        <div class="form-group">
                            <label for="Popis">Popis:</label>
                            <textarea name="Popis" required class="form-control" placeholder="Popis" id="Popis" cols="30" rows="2"></textarea>
                            <div id="errPopis" class="hidden error text-danger"></div>
                        </div>
                        <?php
                        \App\Services\Input::create('Telefon', 'phone', false);
                        \App\Services\Input::create('Lokalita', 'text', false);
                        \App\Services\Input::create('Cena', 'text', false);
                        ?>
                        <div id="errObrázky" class="hidden error text-danger"></div>
                        <div class="dropzone" id="myDropzone">
                            <div class="fallback">
                                <input class="form-input-file" id="form-input-file" type="file" name="articleImages" multiple />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Zavřít</button>
                        <button type="button" class="btn btn-primary addArticle">Upravit inzerát</button>
                    </div>
                </form>

            </div>

        </div>
    </div>
    <div>
        <table id="articles" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Název</th>
                    <th>Popis</th>
                    <th>Cena</th>
                    <th>Lokalita</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($allArticles as $article) { ?>
                    <tr>
                        <td><?php echo $article['id'] ?></td>
                        <td><?php echo $article['title'] ?></td>
                        <td><?php echo $article['description'] ?></td>
                        <td><?php echo $article['price'] ?></td>
                        <td><?php echo $article['location'] ?></td>
                    </tr>
                <?php } ?>
                </tfoot>
        </table>
    </div>
</div>