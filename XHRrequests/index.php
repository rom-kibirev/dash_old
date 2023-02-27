<?php
header('Access-Control-Allow-Origin: http://localhost:3000');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $filename = "./data/". $_POST['place'];
    $content = $_POST['data'];
    if (file_exists($filename)) file_put_contents($filename, $content);
    else file_put_contents($filename, $content);

    http_response_code(200);
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $filename = './data/'.$_GET['filename'].'.json';

    $file = fopen($filename, 'r');

    if ($file) {
        $data = fread($file, filesize($filename));
        fclose($file);

        header('Content-Type: application/json');
        $json = json_encode($data,true);
        echo json_decode($json);
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        echo false;
    }
}