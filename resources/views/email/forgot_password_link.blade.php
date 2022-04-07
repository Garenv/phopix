<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Forgot Password Reset</title>

    <style>
        body {
            align-items: center;
            background: rgb(63,94,251);
            background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(196,70,252,1) 100%);
            display: flex;
            justify-content: center;
            height: 100vh;
        }

        .form {
            background-color: #15172b;
            border-radius: 20px;
            box-sizing: border-box;
            padding: 20px;
            width: 320px;
        }

        .logo {
            margin: 0 auto;
            display: flex;
        }

        .input-container {
            height: 50px;
            position: relative;
            width: 100%;
        }

        .ic1 {
            margin-top: 40px;
        }

        .ic2 {
            margin-top: 30px;
        }

        .input {
            background-color: #303245;
            border-radius: 12px;
            border: 0;
            box-sizing: border-box;
            color: #eee;
            font-size: 18px;
            height: 100%;
            outline: 0;
            padding: 4px 20px 0;
            width: 100%;
        }

        .cut {
            background-color: #15172b;
            border-radius: 10px;
            height: 20px;
            left: 20px;
            position: absolute;
            top: -20px;
            transform: translateY(0);
            transition: transform 200ms;
            width: 42%;
        }

        .cut-short {
            width: 50px;
        }

        .input:focus ~ .cut,
        .input:not(:placeholder-shown) ~ .cut {
            transform: translateY(8px);
        }

        .placeholder {
            color: #65657b;
            font-family: sans-serif;
            left: 20px;
            line-height: 14px;
            pointer-events: none;
            position: absolute;
            transform-origin: 0 50%;
            transition: transform 200ms, color 200ms;
            top: 20px;
        }

        .input:focus ~ .placeholder,
        .input:not(:placeholder-shown) ~ .placeholder {
            transform: translateY(-30px) translateX(10px) scale(0.75);
        }

        .input:not(:placeholder-shown) ~ .placeholder {
            color: #808097;
        }

        .input:focus ~ .placeholder {
            color: #dc2f55;
        }

        .submit {
            background-color: #08d;
            border-radius: 12px;
            border: 0;
            box-sizing: border-box;
            color: #eee;
            cursor: pointer;
            font-size: 18px;
            height: 50px;
            margin-top: 38px;
            text-align: center;
            width: 100%;
        }

        .submit:active {
            background-color: #06b;
        }

    </style>

</head>

<body>
    <form action="{{ route('reset.password.post') }}" method="POST" class="form">
        {{csrf_field()}}
        <input type="hidden" name="token" value="{{ $token }}">
        <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/user/phopixLogo_v2.png" class="logo" alt="Phopixel Logo">
{{--        <h3 style="color: red;">error</h3>--}}
        <div class="input-container ic1">
            <input id="firstname" class="input" type="text" name="email" placeholder=" " />
            <div class="cut"></div>
            <label for="Email" class="placeholder">Email</label>
        </div>
{{--        <h3 style="color: red;">error</h3>--}}
        <div class="input-container ic2">
            <input id="lastname" class="input" type="password" name="password" placeholder=" " />
            <div class="cut"></div>
            <label for="Password" class="placeholder">Password</label>
        </div>
{{--        <h3 style="color: red;">error</h3>--}}
        <div class="input-container ic2">
            <input id="email" class="input" type="password" name="password_confirmation" placeholder=" " />
            <div class="cut"></div>
            <label for="confirmPassword" class="placeholder">Confirm Password</label>
        </div>
        <button type="text" class="submit">Reset Password</button>
    </form>
</body>
</html>





{{--<main class="login-form">--}}
{{--    <div class="cotainer">--}}
{{--        <div class="row justify-content-center">--}}
{{--            <div class="col-md-8">--}}
{{--                <div class="card">--}}
{{--                    <div class="card-header">Reset Password</div>--}}
{{--                    <div class="card-body">--}}

{{--                        <form action="{{ route('reset.password.post') }}" method="POST">--}}
{{--                            {{csrf_field()}}--}}
{{--                            <input type="hidden" name="token" value="{{ $token }}">--}}

{{--                            <div class="form-group row">--}}
{{--                                <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>--}}
{{--                                <div class="col-md-6">--}}
{{--                                    <input type="text" id="email_address" class="form-control" name="email" required autofocus>--}}
{{--                                </div>--}}
{{--                            </div>--}}

{{--                            <div class="form-group row">--}}
{{--                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>--}}
{{--                                <div class="col-md-6">--}}
{{--                                    <input type="password" id="password" class="form-control" name="password" required autofocus>--}}

{{--                                </div>--}}
{{--                            </div>--}}

{{--                            <div class="form-group row">--}}
{{--                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>--}}
{{--                                <div class="col-md-6">--}}
{{--                                    <input type="password" id="password-confirm" class="form-control" name="password_confirmation" required autofocus>--}}

{{--                                </div>--}}
{{--                            </div>--}}

{{--                            <div class="col-md-6 offset-md-4">--}}
{{--                                <button type="submit" class="btn btn-primary">--}}
{{--                                    Reset Password--}}
{{--                                </button>--}}
{{--                            </div>--}}
{{--                        </form>--}}

{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </div>--}}
{{--</main>--}}
