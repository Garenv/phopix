<!-- Free to use, HTML email template designed & built by FullSphere. Learn more about us at www.fullsphere.co.uk -->

<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>

    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->

    <!-- Your title goes here -->
    <title>Newsletter</title>
    <!-- End title -->

    <!-- Start stylesheet -->
    <style type="text/css">
        a,a[href],a:hover, a:link, a:visited {
            /* This is the link colour */
            text-decoration: none!important;
            color: #0000EE;
        }
        .link {
            text-decoration: underline!important;
        }
        p, p:visited {
            /* Fallback paragraph style */
            font-size:15px;
            line-height:24px;
            font-family:'Helvetica', Arial, sans-serif;
            font-weight:300;
            text-decoration:none;
            color: #000000;
        }
        h1 {
            /* Fallback heading style */
            font-size:22px;
            line-height:24px;
            font-family:'Helvetica', Arial, sans-serif;
            font-weight:normal;
            text-decoration:none;
            color: #000000;
        }
        .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
        .ExternalClass {width: 100%;}
    </style>
    <!-- End stylesheet -->

</head>

<!-- You can change background colour here -->
<body style="text-align: center; margin: 0; padding-top: 10px; padding-bottom: 10px; padding-left: 0; padding-right: 0; -webkit-text-size-adjust: 100%;background-color: #f2f4f6; color: #000000" align="center">

<!-- Fallback force center content -->
<div style="text-align: center;">

    <!-- Start container for logo -->
    <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #000000;" width="600">
        <tbody>
        <tr>
            <td style="width: 596px; vertical-align: top; padding-left: 0; padding-right: 0; padding-top: 15px; padding-bottom: 15px;" width="596">

                <!-- Your logo is here -->
                <img style="text-align: center; color: #ffffff;" alt="Logo" src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/logos/phopixel_360x170_transparent.png" align="center" width="180" height="170">

            </td>
        </tr>
        </tbody>
    </table>
    <!-- End container for logo -->


    <!-- Hero image -->
{{--    https://cruskip.s3.us-east-2.amazonaws.com/assets/images/giftCards/25_amazon_gc_1200x700.png--}}
{{--    https://cruskip.s3.us-east-2.amazonaws.com/assets/images/giftCards/50_visa_gc_1200x700.jpg--}}
{{--    https://cruskip.s3.us-east-2.amazonaws.com/assets/images/giftCards/10_walmart_gc__1200x700.jpg--}}
    @if(in_array($place ?? '', ['1st Place', '2nd Place', '3rd Place']))
        @if($place == "1st Place")
            <img style="width: 600px; max-width: 600px; height: 350px; max-height: 350px; text-align: center;" alt="Hero image" src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/giftCards/50_visa_gc_1200x700.jpg" align="center" width="600" height="350">
        @endif

        @if($place == "2nd Place")
            <img style="width: 600px; max-width: 600px; height: 350px; max-height: 350px; text-align: center;" alt="Hero image" src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/giftCards/25_amazon_gc_1200x700.png" align="center" width="600" height="350">
        @endif

        @if($place == "3rd Place")
            <img style="width: 600px; max-width: 600px; height: 350px; max-height: 350px; text-align: center;" alt="Hero image" src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/giftCards/10_walmart_gc__1200x700.jpg" align="center" width="600" height="350">
        @endif
    @endif
    <!-- Hero image -->

    @php
        $backgroundColor = "#ffffff";

        if ($place == "1st Place") {
            $backgroundColor = "#FFD700";
        } elseif ($place == "2nd Place") {
            $backgroundColor = "#C0C0C0";
        } elseif ($place == "3rd Place") {
            $backgroundColor = "#CD7F32";
        }
    @endphp

    <!-- Start single column section -->
    <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: {{ $backgroundColor }}" width="600">
        <tbody>
        <tr>
            <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 40px;" width="596">
                @if(in_array($place ?? '', ['1st Place', '2nd Place', '3rd Place']))
                    <b>Congratulations, {{ $winnerData }}!  You're our {{ $place }} winner of this week!</b>
                    <br>
                    <br>
                    <b>We'll email you your prize in less than one business day, be on the lookout!</b>
                @endif
            </td>
        </tr>
        </tbody>
    </table>
    <!-- End single column section -->

</div>

</body>

</html>
