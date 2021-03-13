<?php
header('Content-Type: application/json; charset=utf-8');

try
{
    if (!is_dir('../uploads'))
    {
        mkdir('../uploads', 0700);
    }

    // Undefined | Multiple Files | $_FILES Corruption Attack
    // If this request falls under any of them, treat it invalid.
    if (!isset($_FILES['upfile']['error']) || is_array($_FILES['upfile']['error']))
    {
        throw new RuntimeException('Invalid parameters.');
    }

    // Check $_FILES['upfile']['error'] value.
    switch ($_FILES['upfile']['error'])
    {
        case UPLOAD_ERR_OK:
        break;
        case UPLOAD_ERR_NO_FILE:
            throw new RuntimeException('No file sent.');
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            throw new RuntimeException('Exceeded filesize limit.');
        default:
            throw new RuntimeException('Unknown errors.');
    }

    // You should also check filesize here.
    if ($_FILES['upfile']['size'] > 1000000)
    {
        throw new RuntimeException('Exceeded filesize limit.');
    }

    // DO NOT TRUST $_FILES['upfile']['mime'] VALUE !!
    // Check MIME Type by yourself.
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    if (false === $ext = array_search($finfo->file($_FILES['upfile']['tmp_name']) , array(
        'pdf' => 'application/pdf',
        'doc' => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'rtf' => 'application/rtf',
        'txt' => 'application/txt',
        'odt' => 'application/vnd.oasis.opendocument.text'
    ) , true))
    {
        throw new RuntimeException('Invalid file format.');
    }

    $timestamp = time();
    $hash = sha1_file($_FILES['upfile']['tmp_name']);
    $filename = sprintf('/uploads/%s-%s.%s', $hash, $timestamp, $ext);
    if (!move_uploaded_file($_FILES['upfile']['tmp_name'], '..' . $filename))
    {
        throw new RuntimeException('Failed to move uploaded file.');
    }

    $url = sprintf('%s://%s%s', $_SERVER['HTTPS'] ? 'https' : 'http', $_SERVER['HTTP_HOST'], $filename);
    echo json_encode(array(
        'filename' => $url
    ));
}
catch(RuntimeException $e)
{
    echo json_encode(array(
        'error' => $e->getMessage()
    ));
}

