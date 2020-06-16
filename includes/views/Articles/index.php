<div class="col-12 mt-5">
    <h2>Inzeráty</h2>
    <div class="col-12">
        <form class="d-flex align-items-center justify-content-center" method="get" action="?page=articles">
            <input type="hidden" value="articles" name="page">
            <div class="col-4 form-group">
                <label for="orderBy">Seřadit podle:</label>
                <select onchange="this.form.submit()" class="form-control"  name="orderBy" id="orderBy">
                    <option value="1"
                        <?php
                        echo isset($_REQUEST['orderBy']) && $_REQUEST['orderBy'] === 'desc' ? 'selected' : '';
                        ?>
                    >Vzestupně</option>
                    <option value="2"
                        <?php
                        echo isset($_REQUEST['orderBy']) && $_REQUEST['orderBy'] === 'asc' ? 'selected' : '';
                        ?>
                    >Sestupně</option>
                    <option value="price"
                        <?php
                        echo isset($_REQUEST['orderBy']) && $_REQUEST['orderBy'] === 'price' ? 'selected' : '';
                        ?>
                    >Podle ceny</option>
                </select>
            </div>
            <div class="form-group">
                <label for="CenaOd">Cena Od:</label>
                <input type="text" name="cenaOd" class="form-control"
                       placeholder="Cena od" id="CenaOd"
                        value="<?php echo !is_null($_REQUEST['cenaOd']) ? $_REQUEST['cenaOd'] : ''  ?>"
                >
                <div id="errCenaOd" class="hidden error text-danger"></div>
            </div>
            <div class="form-group">
                <label for="cenaDo">Cena Do:</label>
                <input type="text" name="cenaDo" class="form-control"
                       placeholder="Cena do" id="cenaDo"
                       value="<?php echo !is_null($_REQUEST['cenaDo']) ? $_REQUEST['cenaDo'] : ''  ?>"
                >
                <div id="errCenaOd" class="hidden error text-danger"></div>
            </div>
            <div style="margin-top:1rem; margin-left: 1rem">
                <button type="submit" class="btn btn-primary sendArticle">Fitrovat</button>
            </div>

        </form>
    </div>
    <div class="row">
        <?php foreach ($allArticles as $article) { ?>
            <div class="col-4 mt-2">
                    <a href="?page=articleDetail&id=<?php echo $article['id'] ?>">

                        <?php echo $article['title'] ?></h3>
                <?php
                echo '<img class="w-100" src="data:image/jpg;base64,'.base64_encode($article['image']) .'" />';
                ?>
                <span>Cena <?php echo $article['price'] ?> </span>
                    </a>
            </div>
        <?php } ?>

    </div>
</div>