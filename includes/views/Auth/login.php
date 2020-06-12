<!-- Log in -->
<div class="mt-5 col-6">
    <h2>Přihlásit se</h2>
    <form class="loginUser" method="post">
        <?php
        \App\Services\Input::create('Email', 'text', true);
        \App\Services\Input::create('Heslo', 'password', true);
        ?>
        <button name="login" type="button" class="btn btn-primary loginSubmit">Přihlásit</button>
    </form>
</div>