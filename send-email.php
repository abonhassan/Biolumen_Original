<?php
// CONFIGURE THIS
$to = "fabiana.luz@biolumen.com.br";

// GET FIELDS
$name = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['mensagem'] ?? '';

// SET SUBJECT AND HEADERS
$subject = "Nova mensagem do site BioLumen";
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// MESSAGE BODY
$body = "Você recebeu uma nova mensagem do site:\n\n";
$body .= "Nome: $name\n";
$body .= "Email: $email\n\n";
$body .= "Mensagem:\n$message\n";

// SEND EMAIL
if (mail($to, $subject, $body, $headers)) {
    echo "Mensagem enviada com sucesso.";
} else {
    echo "Erro ao enviar a mensagem. Tente novamente.";
}
?>
