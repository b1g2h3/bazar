<!-- Log in -->
<div class="col-6">
    <h2>Přihlásit se</h2>
    <form action="/indexx.php" method="POST">
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" name="user_name_email" class="form-control" placeholder="Email" id="email">
        </div>
        <div class="form-group">
            <label for="pwd">Heslo:</label>
            <input type="password" name="user_password" class="form-control" placeholder="Heslo" id="pwd">
        </div>
        <button name="log_in" type="submit" class="btn btn-primary">Přihlásit</button>
    </form>
</div>