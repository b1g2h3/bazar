<div class="col-12 mt-5">
    <h2>Inzeráty</h2>
    <div class="row">
        <?php foreach ($allArticles as $article) { ?>
            <div class="col-4 mt-2">
                <h3><a href="?page=articleDetail&id=<?php echo $article['id'] ?>"><?php echo $article['title'] ?></a></h3>
                <img class="w-100" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="">
                <span>Cena <?php echo $article['price'] ?> </span>
            </div>
        <?php } ?>

    </div>
</div>