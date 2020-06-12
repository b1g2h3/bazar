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
                <form>
                    <div class="modal-body createArticle">
                        <h2>Vytvořit inzerát</h2>
                        <?php
                        \App\Services\Input::create('Název', 'text', true);
                        \App\Services\Input::create('Popis', 'textarea', true);
                        \App\Services\Input::create('Lokalita', 'text', true);
                        \App\Services\Input::create('Cena', 'number', true);
                        ?>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Zavřít</button>
                        <button type="button" class="btn btn-primary addArticle">Vytvořit inzerát</button>
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
                    <th>Cena</th>
                    <th>Lokalita</th>
                    <th>Kategorie</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($allUsers as $user) { ?>
                    <tr>
                        <td><?php echo $user['id'] ?></td>
                        <td><?php echo $user['name'] ?></td>
                        <td><?php echo $user['email'] ?></td>
                        <td><?php echo $user['role_id'] == 1 ? 'Admin' : 'Editor' ?></td>
                    </tr>
                <?php } ?>
                </tfoot>
        </table>
    </div>


    <div class="row">
        <div class="col-4">
            <h3>Název</h3>
            <img class="w-100" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="">
            <span>Cena 500kč </span>
            <span>Přidáno <?php echo date("l jS \of F Y h:i:s A") ?> </span>
        </div>
        <div class="col-4 mt-2">
            <h3>Název</h3>
            <img class="w-100" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="">
            <span>Cena 500kč </span>
            <span>Přidáno <?php echo date("l jS \of F Y h:i:s A") ?> </span>
        </div>
        <div class="col-4 mt-2">
            <h3>Název</h3>
            <img class="w-100" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="">
            <div>
                <span>Cena 500kč </span>
                <span>Přidáno <?php echo date("l jS \of F Y h:i:s A") ?> </span>
            </div>
        </div>
        <div class="col-4 mt-2">
            <h3>Název</h3>
            <img class="w-100" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="">
            <span>Cena 500kč </span>
            <span>Přidáno <?php echo date("l jS \of F Y h:i:s A") ?> </span>
        </div>
        <div class="col-4 mt-2">
            <h3>Název</h3>
            <img class="w-100" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="">
            <span>Cena 500kč </span>
            <span>Přidáno <?php echo date("l jS \of F Y h:i:s A") ?> </span>
        </div>
        <div class="col-4 mt-2">
            <h3>Název</h3>
            <img class="w-100" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="">
            <div>
                <span>Cena 500kč </span>
                <span>Přidáno <?php echo date("l jS \of F Y h:i:s A") ?> </span>
            </div>
        </div>
        <div class="col-4 mt-2">
            <h3>Název</h3>
            <img class="w-100" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="">
            <div>
                <span>Cena 500kč </span>
                <span>Přidáno <?php echo date("l jS \of F Y h:i:s A") ?> </span>
            </div>
        </div>
        <div class="col-4 mt-2">
            <h3>Název</h3>
            <img class="w-100" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="">
            <span>Cena 500kč </span>
            <span>Přidáno <?php echo date("l jS \of F Y h:i:s A") ?> </span>
        </div>
        <div class="col-4 mt-2">
            <h3>Název</h3>
            <img class="w-100" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="">
            <span>Cena 500kč </span>
            <span>Přidáno <?php echo date("l jS \of F Y h:i:s A") ?> </span>
        </div>
        <div class="col-4 mt-2">
            <h3>Název</h3>
            <img class="w-100" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="">
            <div>
                <span>Cena 500kč </span>
                <span>Přidáno <?php echo date("l jS \of F Y h:i:s A") ?> </span>
            </div>
        </div>
    </div>
</div>