<?php header('Content-Type: text/html; charset=utf-8');
$form = ini_get('magic_quotes_gpc') == 1 ? stripslashes( $_POST['jsonData'] ) : $_POST['jsonData'];
$data = json_decode($form, true);


if ($data['type'] == 1) {
	$subject = 'Новое сообщение';
	$message  = '<h3>Заявка</h3>';
	$message .=	'<b>Телефон:</b> '.$data['phone'].'.';
}

if ($data['type'] == 2) {
	$subject = 'Новое сообщение';
	$message  = '<h3>Заявка</h3>';
	$message .=	'<b>Имя:</b> '.$data['name'].'.<br />';
	$message .=	'<b>Телефон:</b> '.$data['phone'].'.';

}
$to .= "<info@online-lab.ru>";
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: cosmaweb' . "\r\n";

echo mail($to, $subject, $message, $headers);