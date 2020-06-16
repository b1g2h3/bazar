<?php

namespace App\Services;

class Mail
{
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

        $msg = "
                <html>
                <head>
                <title>Inzerát ".$article['title']."</title>
                </head>
                <body>
                <table>
                <tr>
                <th>Posíláme nabídku na Váš inzerát ".$article['title'].".</th>
                </tr>
                <tr>
                <th>Od: ".$data['Email']. "</th>
                <th>Zpráva: ".$data['Zpráva']. "</th>
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

}
