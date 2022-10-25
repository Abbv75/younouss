<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    ob_start();
    if(isset($_POST['email'])){
        $email=$_POST['email'];
        $nom='non saisie';
        $tel='non saisie';
        $message='non saisie';
        if(isset($_POST['nom'])){
            $nom=$_POST['nom'];
        }
        if(isset($_POST['tel'])){
            $tel=$_POST['tel'];
        }
        if(isset($_POST['message'])){
            $message=nl2br($_POST['message']);
        }
        $message="nom: <b>$nom</b><br>tel:<a href='tel:$tel'>$tel</a> <br>email:<a href='$email'>$email</a><br/>message:<b>$message</b>";
        try{
            require '../lib/php/PHPMailer/src/Exception.php';
            require '../lib/php/PHPMailer/src/PHPMailer.php';
            require '../lib/php/PHPMailer/src/SMTP.php';
            require 'mail_info.php';
            $mail= new PHPMailer(true);
            $mail->SMTPDebug=SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->Host=$Host;
            $mail->SMTPAuth=$SMTPAuth;
            $mail->SMTPOptions=Array('ssl'=>array('verify_peer'=>false,'verify_peer_name'=>false,'allow_self_signed'=>true));
            $mail->Username=$Username;
            $mail->Password=$Password;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->$Port=$Port;
            $mail->setFrom($Username, $nom_du_site);
            $mail->addReplyTo($send_email, $nom_du_site);
            $mail->WordWrap   = $WordWrap;
            $mail->isHTML(true);
            $mail->addAddress($email);
            $mail->Subject="Message depuis votre site";
            $mail->Body="<p>$message</p>";
            $mail->send();
            setcookie('email', $email, time()+24*3600*31,'/');
            header('HTTP/1.1 200 Message envoyer');
        }
        catch(Exception $e){
            header('HTTP/1.1 500 Message non envoyer');
        }

    }
    else{
        header('HTTP/1.1 404 information non saisie');
    }
    ob_end_flush();
?>