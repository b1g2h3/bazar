<header>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Bazar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Inzeráty<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#">Uživatelé<span class="sr-only">(current)</span></a>
                </li>
                <?php if ($user->is_logged_in()): ?>
                <li class="nav-item">
                    <form action="/index.php" method="POST">
                        <button style="background: transparent; border: none" name="logout" type="submit"  class="nav-link" >Odhlásit</button>
                    </form>
                </li>

            </ul>
            <form class="form-inline mt-2 mt-md-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Vyhledat</button>
            </form>
            <?php endif ?>
        </div>
    </nav>
</header>