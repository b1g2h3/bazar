<?php

?>

<main role="main" class="flex-shrink-0">
    <div class="container">
        <div class="row">
            <!-- Log in -->
            <div class="mt-5 col-6">
                <h2>Přihlásit se</h2>

                <form action="/prihlasit" method="post">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" name="name" class="form-control" placeholder="Email" id="email">
                    </div>
                    <div class="form-group">
                        <label for="pwd">Heslo:</label>
                        <input type="password" name="password" class="form-control" placeholder="Heslo" id="pwd">
                    </div>
                    <input type="hidden" name="token" value="<?php echo \App\Services\Token::generate(); ?>" />
                    <button name="login" type="submit" class="btn btn-primary">Přihlásit</button>
                </form>
            </div>
        </div>
    </div>
</main>
