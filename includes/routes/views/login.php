<!-- Log in -->
<div class="mt-5 col-6">
    <h2>Přihlásit se</h2>
    <form action="/prihlasit" method="post">
        <?php
        \App\Services\Input::create('Email', 'email');
        \App\Services\Input::create('Heslo', 'password')
        ?>
        <input type="hidden" name="token" value="<?php echo \App\Services\Token::generate(); ?>" />
        <button name="login" type="submit" class="btn btn-primary">Přihlásit</button>
    </form>
</div>