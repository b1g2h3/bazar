<?php
class User
{
    // Refer to database connection
    private $db;

    // Instantiate object with database connection
    public function __construct($db_conn)
    {
        $this->db = $db_conn;
    }

    // Register new users
    public function register($user_name, $user_email, $user_password, $user_role)
    {
        try {
            // Hash password
            $user_hashed_password = password_hash($user_password, PASSWORD_DEFAULT);

            // Define query to insert values into the users table
            $sql = "INSERT INTO users(name, email, password, roles_id) VALUES(:name, :email, :password, :roles_id)";

            // Prepare the statement
            $query = $this->db->prepare($sql);

            // Bind parameters
            $query->bindParam(":name", $user_name);
            $query->bindParam(":email", $user_email);
            $query->bindParam(":password", $user_hashed_password);
            $query->bindParam(":roles_id", $user_role);

            // Execute the query
            $query->execute();
        } catch (PDOException $e) {
            array_push($errors, $e->getMessage());
        }
    }

    // Log in registered users with either their username or email and their password
    public function login($user_name, $user_email, $user_password)
    {
        try {
            // Define query to insert values into the users table
            $sql = "SELECT * FROM users WHERE name=:name OR email=:email LIMIT 1";

            // Prepare the statement
            $query = $this->db->prepare($sql);

            // Bind parameters
            $query->bindParam(":name", $user_name);
            $query->bindParam(":email", $user_email);

            // Execute the query
            $query->execute();

            // Return row as an array indexed by both column name
            $returned_row = $query->fetch(PDO::FETCH_ASSOC);
            // Check if row is actually returned
            if ($query->rowCount() > 0) {
                // Verify hashed password against entered password
                if (password_verify($user_password, $returned_row['password'])) {
                    // Define session on successful login
                    $_SESSION['user_session'] = $returned_row['id'];
                    return true;
                } else {
                    // Define failure
                    return false;
                }
            }
        } catch (PDOException $e) {
            array_push($errors, $e->getMessage());
        }
    }

    public function getAllUsers()
    {
        try {
            // Define query to insert values into the users table
            $sql = "SELECT * FROM users";

            // Prepare the statement
            $query = $this->db->prepare($sql);


            // Execute the query
            $query->execute();

            $returned_row = $query->fetchAll(PDO::FETCH_ASSOC);
            // Check if row is actually returned
            if ($query->rowCount() > 0) {
              return $returned_row;
            }
        } catch (PDOException $e) {
            array_push($errors, $e->getMessage());
        }
    }

    // Check if the user is already logged in
    public function is_logged_in() {
        // Check if user session has been set
        if (isset($_SESSION['user_session'])) {
            return true;
        }
    }

    // Redirect user
    public function redirect($url) {
        header("Location: $url");
    }

    // Log out user
    public function log_out() {
        // Destroy and unset active session
        session_destroy();
        unset($_SESSION['user_session']);
        return true;
    }
}