<!-- Log in -->
<div class="mt-5 col-6">
    <h2>Přihlásit se</h2>
    <form class="loginUser" method="post">
        <?php
        \App\Services\Input::create('Email', 'text');
        \App\Services\Input::createErrorMsg('Email');
        \App\Services\Input::create('Heslo', 'password');
        \App\Services\Input::createErrorMsg('Heslo');
        ?>
        <button name="login" type="button" class="btn btn-primary loginSubmit">Přihlásit</button>
    </form>
</div>