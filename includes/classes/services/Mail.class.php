<?php

namespace App\Services;

use Nette\Mail\Mailer;
use Nette\Mail\Message;
use Nette\Mail\SendmailMailer;

class Mail
{

    protected $host = 'stmp.gmail.com',
              $username = 'john@gmail.com',
              $password = '*****';

    public function __construct()
    {

//        $mail = new Message;
//        $mail->setFrom('eVčelár <holubjan@gmail.com>')
//            ->addTo('holubjan@gmail.com')
//            ->setSubject($values['nazov'])
//            ->setBody($values['sprava']);
//
//        $mailer = new Nette\Mail\SmtpMailer([
//            'host' => 'smtp.gmail.com',
//            'username' => 'holubjan@gmail.com',
//            'password' => '**********',
//            'secure' => 'ssl',
//
//        ]);
//        $mailer->send($mail);
    }

    public static function sendArticle($email, $article, $images)
    {
//        $to = $email;
//        $subject = "Posílám vám inzerát";
        $showImages = null;
        foreach ($images as $image) {
            $showImages .= '<th><img class="w-100 col-4" src="data:image/jpg;base64,' . base64_encode($image['image']) . '" /></th>';
        }

        $msg = "
                <html>
                <head>
                <title>Inzerát ".$article['id']."</title>
                </head>
                <body>
                <table>
                <tr>
                <th>Posíláme Vám inzerát na Vaše přání.</th>
                <th>".$article['title']."</th>
                <th>Popis:".$article['description']."</th>
                <th>Cena ".$article['cena']." kč</th>
                <th>Lokalita: ".$article['location']."</th>
                </tr>
                <tr>
                <th>Obrázky</th>
                ".$showImages ? $showImages : 'Inzerát neobsahuje žádné obrázky'."
                </tr>
                </table>
                </body>
                </html>
                ";


        $file = str_replace(" ", '', $article['title']).'email.html';
        if(!is_file($file)){
            file_put_contents($file, $msg);
        }

//        $headers = "From: admin@bazar.local";

//        mail($to,$subject,$msg,$headers);
    }

    public static function sendReservation($article, $data)
    {
//        $to = $email;
//        $subject = "Posílám vám inzerát";

        $url =  'http://bazar.local/?reservation='.$article['id'];


        $msg = "
                <html>
                <head>
                <title>Inzerát ".$article['title']."</title>
                </head>
                <body>
                <table>
                <tr>
                <th>Dobrý den,</th>
                <th>Posíláme nabídku na Váš inzerát ".$article['title'].".</th>
                </tr>
                <tr>
                <th>Od: ".$data['Email']. "</th>
                <th>Zpráva: ".$data['Zpráva']. "</th>
                </tr>
                <tr>
                <th>Rezervaci můžete potvrdit na odkazu uvedeném níže</th>
                <th>Zpráva: ".$url. "</th>
                </tr>
                </table>
                </body>
                </html>
                ";

        $file = str_replace(" ", '', $article['title']).'rezervace.html';
        \Tracy\Debugger::barDump(is_file($file));
        if(!is_file($file)){
            file_put_contents($file, $msg);
        }


        return true;

//        $headers = "From: admin@bazar.local";

//        mail($to,$subject,$msg,$headers);
    }

    public static function testMail() {
        phpinfo();
        die;
        stream_socket_client();
        $mail = new Message;
        $mail->setFrom('Franta <franta@example.com>')
            ->addTo('petr@example.com')
            ->addTo('jirka@example.com')
            ->setSubject('Potvrzení objednávky')
            ->setBody("Dobrý den,\nvaše objednávka byla přijata.");
        $mailer = new SendmailMailer;
        $mailer->send($mail);
    }
}
