<?php
/**
 * Переменные
 */
if (!isset($_POST['phone']) && !isset($_POST['email'])) {
	die("Phone or email - empty");
}

$mailto = 'svchost@inbox.ru';
$name = '';
// $mailFrom = '';
$phone = '';
$formtype = '';
$site_name = 'Стоматологическая клиника -';

$site_address = $_SERVER['SERVER_NAME'];
$mailFrom = "noreply@".$site_address;

date_default_timezone_set('Europe/Moscow');

function getIp() {
	if (!isset($ip_address)){
		if (isset($_SERVER['REMOTE_ADDR']))
		$ip_address=$_SERVER['REMOTE_ADDR'];
	}
	if (!$ip_address) {
		$ip_address = "unknown";
	}
	return $ip_address;
}

//taking info about date, IP and user agent

$timestamp = date("Y-m-d H:i:s");
$ip = getIp();

//taking the data from form

$name = isset($_POST['name']) ? addslashes(trim($_POST['name'])) : null;
$surname = isset($_POST['surname']) ? addslashes(trim($_POST['surname'])) : null;
$phone = isset($_POST['phone']) ? addslashes(trim($_POST['phone'])) : null;
$email = isset($_POST['email']) ? addslashes(trim($_POST['email'])) : null;
$formtype = isset($_POST['form-type']) ? addslashes(trim($_POST['form-type'])) : null;
// $mailFrom = addslashes(trim($_POST['mail']));

//preparing mail

$headers = "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=utf-8\n";
$headers .= "Content-Transfer-Encoding: quoted-printable\n";
$headers .= "From: $mailFrom\n";

$content = $name ? 'имя: {$name} <br>' : "";
$content .= $surname ? 'Фамилия: {$surname} <br>' : "";
$content .= $phone ? 'Телефон: $phone<br>' : "";
$content .= $email ? 'Email: $email <br>' : "";
$content .= $formtype ? 'Тип формы: $formtype<br>' : "";
$content .= 'IP: $ip<br>';
$content .= 'Время отправки (по Москве): $timestamp <br>';

$mailTopic = $site_name." - заявка от: ".$name." тел.: ".$phone;

//sending mail
if (!mail($mailto, $mailTopic, $content, $headers)){
	echo "Error - не удалось отправить почту функцией mail().";
}


	$content = str_replace("<br>", "\n", $content);
  $content .= "\n---------------------------\n\n";
  file_put_contents("applications.txt", $content, FILE_APPEND);

?>