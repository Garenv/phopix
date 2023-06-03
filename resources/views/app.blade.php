<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Phopix</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

        <style>

            body{
                font-family: 'Poppins', sans-serif;
                font-size: 15px;
                line-height: 1.7;
                background: rgb(63,94,251);
                background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(196,70,252,1) 100%);
                overflow-x: hidden;
            }

            #light {
                background-color: #f3ebf6;
            }

            #dark {
                background-color: #46045e;
            }
        </style>


        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">
        <script>
            let APP_URL = {!! \Psy\Util\Json::encode(url('/')) !!};
        </script>
    </head>

    <body class="antialiased">
        <div id="example"></div>
        <script src="{{asset('js/app.js')}}" ></script>
    </body>
</html>
