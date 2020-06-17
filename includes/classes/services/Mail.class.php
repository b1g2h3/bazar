<?php

namespace App\Services;

use Nette\Mail\Message;
use Nette\Mail\SmtpMailer;

class Mail
{

    protected static
        $host = "smtp.seznam.cz",
        $username = "testemailtest1@email.cz",
        $password = "123456321",
        $secure = "none",
        $port = "25";
    public $mail;

    protected static function init()
    {
        return new SmtpMailer([
        'host' => self::$host,
        'username' => self::$username,
        'password' => self::$password,
        'secure' => self::$secure,
        'port' => self::$port,
    ]);
    }

    public static function sendArticle($email, $article, $images)
    {
        $showImages = null;
        if(!is_null($images)) {
            foreach ($images as $image) {
                $showImages .= '<th><img style="width: 200px; height: 200px" src="data:image/jpg;base64,' . base64_encode($image['image']) . '" /></th>';
            }
        }

        $msg = "
                <html>
                <head>
                <title>Inzerát ".$article['title']."</title>
                </head>
                <body>
                <table style='text-align: left'>
                <tr>
                <th>Posíláme Vám inzerát na Vaše přání.
                 <br>Inzerát ".$article['title']."
                 <br>Popis:".$article['description']."
                 <br>Cena ".$article['price']." kč
                 <br>Lokalita: ".$article['location']."
                </tr>
                <tr>
                  <th>S pozdravem  <br>bazal.local</th>
                </tr>
                <tr>
                  <th>Na tento email neodpovídejte</th>
                </tr>
                <tr>
                ".$showImages."
                </tr>
                </table>
                </body>
                </html>
                ";

        $message = new Message;
        $message->setFrom(self::$username)
            ->addTo($email)
            ->setSubject(' Inzerát '.$article['title'])
            ->setHtmlBody($msg);
        $mailer = self::init();

        try {
            $mailer->send($message);
            return true;
        } catch (\Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    public static function sendReservation($article, $data)
    {

        $url =  'http://bazar.local/?reservation='.$data['reservationID'].'&articleId='.$article['id'];

        $msg = "

                <html>
                <head>
                <title>Inzerát ".$article['title']."</title>
                </head>
                <body>
                <table>
                <tbody style=\"text-align:left\">
                  <tr>
                    <th>Dobrý den, Posíláme nabídku na Váš inzerát ".$article['title'].".
                        <br>
                        od: ".$data['Jméno']." <br>
                        email: ".$data["Email"]."
                    </th>
                  </tr>
                  <th>Zpráva: ".$data['Zpráva']."</th>
                </tr>
                <tr>
                <th>Rezervaci můžete potvrdit na odkazu uvedeném níže <br>
                  <a href=".$url.">Klikněte zde</a></th>
                </tr>
                <tr>
                  <th>S pozdravem  <br>bazal.local</th>
                </tr>
                <tr>
                  <th>Na tento email neodpovídejte</th>
                </tr>
                </tbody>
                </table>
                </body>
                </html>
                ";

        $message = new Message;
        $message->setFrom(self::$username)
            ->addTo($article['email'])
            ->setSubject('Zájem o '.$article['title'])
            ->setHtmlBody($msg);
        $mailer = self::init();

        try {
            $mailer->send($message);
            return true;
        } catch (\Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }
}
