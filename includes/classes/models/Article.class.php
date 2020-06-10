<?php

namespace App\Models;

class Article
{
    // Refer to database connection
    private $db;

    // Instantiate object with database connection
    public function __construct($db_conn)
    {
        $this->db = $db_conn;
    }

    // Add new article
    public function addArticle($data)
    {
        try {

            // Define query to insert values into the users table
            $sql = "INSERT INTO articles(name, email, password, roles_id) VALUES(:name, :email, :password, :roles_id)";

            // Prepare the statement
            $query = $this->db->prepare($sql);

            // Bind parameters
            $query->bindParam(":title", $data['article_title']);
            $query->bindParam(":description", $data['article_description']);
            $query->bindParam(":mainImage", $data['article_image']);

            // Execute the query
            $query->execute();
        } catch (PDOException $e) {
            array_push($errors, $e->getMessage());
        }
    }

    // Get All Articles
    public function getAllArticles()
    {
        try {
            // Define query to insert values into the users table
            $sql = "SELECT * FROM articles";

            // Prepare the statement
            $query = $this->db->prepare($sql);


            // Execute the query
            $query->execute();

            // Return row as an array indexed by both column name
            $returned_row = $query->fetch(PDO::FETCH_ASSOC);
            // Check if row is actually returned
            if ($query->rowCount() > 0) {
                // Return Data
                return $returned_row;
            }
        } catch (PDOException $e) {
            array_push($errors, $e->getMessage());
        }
    }
}