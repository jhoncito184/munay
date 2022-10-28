<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 0);

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;

	//Load Composer's autoloader
	require 'vendor/PHPMailer/phpmailer/Exception.php';
	require 'vendor/PHPMailer/phpmailer/PHPMailer.php';
	require 'vendor/PHPMailer/phpmailer/SMTP.php';

	//Create an instance; passing `true` enables exceptions
	$mail = new PHPMailer(true);

    $name_contact = $_POST['name_contact'];
    $empresa_contact = $_POST['empresa_contact'];
    $telf_contact = $_POST['telf_contact'];
    $to = $email = $_POST['email_footer'] ? $_POST['email_footer'] : $_POST['email_contact'];

	$mail->SMTPDebug = 0;
	// $mail->isSMTP();
	$mail->CharSet = 'UTF-8';
	$mail->Mailer = 'smtp';
	$mail->Host = 'mail.alfredogama.com'; 
	$mail->SMTPAuth = true;
	$mail->Port= 587;
	$mail->Username = 'mails@alfredogama.com';
	$mail->Password = '+$tTyokDo*6.';
	$mail->SMTPSecure = 'tls';
	$mail->From = 'mails@alfredogama.com';
	$mail->FromName = 'Munay';
	$mail->addAddress('rsousa@aquatec-water.com');
	$mail->addAddress('apereda@aquatec-water.com');
	$mail->WordWrap = 50;
	$mail->isHTML(true);
    $mail->Subject = 'Nuevo Contacto | Munay';
    $mail->Body    = '<html><body><img src="#" alt="" /> <table rules="all" style="border-color: #666;" cellpadding="10"> <tr> <td><strong>Nombres:</strong> </td><td>' . $name_contact . '</td></tr><tr><td><strong>Empresa:</strong> </td><td>' . $empresa_contact . '</td> </tr><tr><td><strong>Teléfono:</strong> </td><td>' . $telf_contact . '</td></tr><tr><td><strong>Email:</strong> </td><td>' . strip_tags($email) . '</td> </tr> </table></body></html>';
	if(!$mail->send()) {
	   echo 'Message could not be sent.';
	   echo 'Mailer Error: ' . $mail->ErrorInfo;
	   exit;
	} else {
		echo "<script language='javascript'>
		alert('Mensaje enviado, Muchas Gracias.');
		window.location.href = './';
		</script>";
	}
?>