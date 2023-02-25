<?php
header('Access-Control-Allow-Origin: http://localhost:3000');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $data = $_POST['data'];
    $sourceFile = $_POST['source'];
    $fp = fopen("./data/". $_POST['place'], "w+");
    fwrite($fp, $data);
    fclose($fp);
    header('Content-Type: application/json');
    echo 'Данные сохранены - ' . $_POST['file'];
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