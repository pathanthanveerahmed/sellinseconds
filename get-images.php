<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust for production if needed for security

$image_directory_path = $_SERVER['DOCUMENT_ROOT'] . '/dynamic/images/'; // Server's absolute path to images
$image_base_url = 'https://www.sellinseconds.in/dynamic/images/';    // Base URL for accessing images

$image_files = [];
$allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

if (is_dir($image_directory_path)) {
    $files = scandir($image_directory_path);
    if ($files !== false) {
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                if (in_array($extension, $allowed_extensions)) {
                    $image_files[] = $image_base_url . rawurlencode($file);
                }
            }
        }
    } else {
        // Optionally log an error if scandir fails
    }
} else {
    // Optionally log an error if directory doesn't exist
}

echo json_encode($image_files);
?>
