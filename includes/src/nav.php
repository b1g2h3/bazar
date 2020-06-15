<header class="d-print-none">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a class="navbar-brand" href="/">Bazar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="?page=articles">Inzeráty</a>
                </li>
                <?php
//                if (isset($_SESSION['isEditor']) && $_SESSION['isEditor']) {
                ?>
                    <li class="nav-item active">
                        <a class="nav-link" href="?page=editArticles">Upravit inzeráty</a>
                    </li>
                <?php
//                } elseif (isset($_SESSION['isAdmin']) && $_SESSION['isAdmin']) {
                ?>
                    <li class="nav-item active">
                        <a class="nav-link" href="?page=users">Uživatelé</a>
                    </li>

                <?php
//                }
                if (isset($_SESSION['isLoggedIn'])) :
                ?>
                    <li class="nav-item active">
                        <a class="nav-link" href="?page=logout">Odhlásit se</a>
                    </li>
                <?php else :
                ?>
                    <li class="nav-item">
                        <a class="nav-link" href="?page=login">Přihlásit se</a>
                    </li>
                <?php endif
                ?>

            </ul>
<!--            <form class="form-inline mt-2 mt-md-0">-->
<!--                <input class="form-control mr-sm-2" type="text" placeholder="Vyhledat inzerát" aria-label="Search">-->
<!--                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Vyhledat</button>-->
<!--            </form>-->
        </div>
    </nav>
</header>
<main role="main" class="flex-shrink-0">
    <div class="container">
        <div class="row  justify-content-center">