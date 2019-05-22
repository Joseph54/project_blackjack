<?php

class Database {
    
    public $pdo;
    
    function __construct(){
            /* Attempt to connect to MySQL database */
        try{
            $this->pdo = $this->createPDO();
            // Set the PDO error mode to exception
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e){
            die("ERROR: Could not connect. " . $e->getMessage());
        }
    }
    
    private function createPDO(){

        define('DB_SERVER', 'localhost:81');
        define('DB_USERNAME', 'root');
        define('DB_PASSWORD', '');
        define('DB_NAME', 'blackjack');

        $pdo = new PDO("mysql:host=".DB_SERVER.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
        return $pdo;
    }


    public function updateBalance($id, $amount){
        
        $prev = $this->getBalance($id);
        $sql = "UPDATE users SET account = account + $amount WHERE id = $id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        if($this->getBalance($id) == $prev + $amount){
            return true;
        }else{
            return false;
        }
    }
    public function getBalance($id){
        
        $sql = "SELECT account FROM users WHERE id = $id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        $balance = $stmt->fetch(PDO::FETCH_ASSOC);
        return $balance['account'];
    }
    
}
?>