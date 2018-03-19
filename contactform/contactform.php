<?php
$type = strip_tags(htmlspecialchars($_POST['type']));

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$companyName = strip_tags(htmlspecialchars($_POST['companyName']));
$message = strip_tags(htmlspecialchars($_POST['message']));
$email_orcamento = "";
if ($type == "orcamento"){
    $service = strip_tags(htmlspecialchars($_POST['service']));
    $date = strip_tags(htmlspecialchars($_POST['date']));
    $site = strip_tags(htmlspecialchars($_POST['site']));
    $logo = strip_tags(htmlspecialchars($_POST['logo']));

    $email_orcamento = "\n\nServiço: $service\n\nPrazo: $date\n\nPossui site? $site\n\nPossui logo? $logo";
}
	
$to = 'contato@vulpis.tech';
$email_subject = "Mensagem do site:  $name";
$email_body = "Você recebeu uma nova mensagem do seu site.\n\n"."Aqui estão os detalhes:\n\nNome: $name\n\nE-mail: $email\n\nEmpresa: $companyName\n\nMensagem:\n$message";
$headers = "De: noreply@vulpis.com.br\n";
$headers .= "Responder a: $email";	
mail($to,$email,$email_body.$email_orcamento,$headers);
return true;			
?>
