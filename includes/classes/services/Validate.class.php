<?php

namespace App\Services;

use App\Database\DB;
use App\Services\Session;
use App\Services\Redirect;

class Validate
{

    private $_passed = false,
        $_errors = false,
        $_db = null;

    private $customAttr = [
        'name' => 'Jméno',
        'Email' => 'Email',
        'roles_id' => 'Role',
        'Heslo' => 'Heslo',
        'password_again' => 'Potvrdit heslo',
    ];

    public function __construct()
    {
        $this->_db = DB::getInstance();
    }

    public function check($source, $items = array())
    {
        foreach ($items as $item => $rules) {
            foreach ($rules as $rule => $rule_value) {

                $value = trim($source[$item]);
                $item = escape($item);

                if ($rule === 'required' && empty($value)) {
                    $this->addError($item, "{$this->customAttr[$item]} je nutné vyplnit");
                } else if (!empty($value)) {
                    switch ($rule) {
                        case 'min':
                            if (strlen($value) < $rule_value) {
                                $this->addError($item, "{$this->customAttr[$item]} musí obsahovat minimálně {$rule_value} znaků.");
                            }
                            break;
                        case 'max':
                            if (strlen($value) > $rule_value) {
                                $this->addError($item, "{$this->customAttr[$item]} musí obsahovat maximálně {$rule_value} znaků.");
                            }
                            break;
                        case 'matches':
                            if ($value != $source[$rule_value]) {
                                $attrToLowerCase = strtolower($this->customAttr[$item]);
                                $this->addError($item, "{$this->customAttr[$rule_value]} se musí shodovat s {$attrToLowerCase}.");
                            }
                            break;
                        case 'unique':
                            $check = $this->_db->get($rule_value, array($item, '=', $value));
                            if ($check->count()) {
                                $this->addError($item, "{$this->customAttr[$item]} již existuje.");
                            }
                            break;
                        case 'email':
                            if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
                                $this->addError($item, "{$this->customAttr[$item]} je neplatný.");
                            }
                            break;
                    }
                }
            }
        }
        if ($this->_errors) {
            foreach ($items as $item => $rules) {
                if (Session::exists(escape($item))) {
                    Redirect::to($_SERVER['REQUEST_URI']);
                }
            }
        }
        $this->_passed = true;
        return $this;
    }

    private function addError($error, $msg)
    {
        Session::flash($error, $msg);
        $this->_errors = true;
    }

    public function passed()
    {
        return $this->_passed;
    }
}
