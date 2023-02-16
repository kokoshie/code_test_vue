<template>
    <div>
        <div class="wrapper">
            <div class="container main">
                <div class="row">
                    <div class="col-md-6 side-image signup">
                        <div class="text">
                            <p>Join Us!</p>
                        </div>
                    </div>
                    <div class="col-md-6 right">
                        <div class="input-box">
                            <header>Admin</header>
                            <header>Create account</header>
                            <div class="input-field">
                                <input type="text" class="input" id="name" v-model="registerData.name" required autocomplete="off">
                                <label for="name">Name</label>
                            </div>
                            <div class="input-field">
                                <input type="text" class="input" id="email" v-model="registerData.email" required autocomplete="off">
                                <label for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <input type="password" class="input" id="password" v-model="registerData.password" required>
                                <label for="password">Password</label>
                            </div>
                            <div class="input-field">
                                <input type="password" class="input" id="c_password" v-model="registerData.c_password" required>
                                <label for="c_password">Confirm Password</label>
                            </div>
                            <div class="input-field">
                                <input type="submit" class="submit" value="Sign Up" @click="register">
                            </div>
                            <div class="signin">
                                <span>Already have an account? <a href="#" @click="login">Log in here</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="../../../js/auth/admin/registerPage.js"></script>

<style lang="scss" scoped>
     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&display=swap');

* {
    font-family: 'Poppins', sans-serif;
}

p, h1, h2, h3 {
    margin-bottom: 0;
}

.wrapper {
    background: #ececec;
    padding: 0 20px 0 20px;
}

.main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.row {
    width: 900px;
    height: 550px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2);
}

.side-image {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    border-radius: 10px 0 0 10px;
}

.side-image.signup {
    background-image: url("../../../assets/sign-up.jpg");
}
.side-image.signin {
    background-image: url("../../../assets/sign-in.jpg");
}

img {
    width: 35px;
    position: absolute;
    top: 30px;
    left: 30px;
}

.text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.text p {
    color: #fff;
    font-size: 45px;
    font-weight: bold;
    text-align: center;
}

i {
    font-weight: 400;
    font-size: 15px;
}

.right {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.input-box {
    width: 330px;
    box-sizing: border-box;
}

.input-box header {
    font-size: 35px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 45px;
}

.input-field {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0 10px 0 10px;
}

.input {
    height: 45px;
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    margin-bottom: 20px;
    color: #40414a;
}

.input-box .input-field label {
    position: absolute;
    top: 10px;
    left: 10px;
    pointer-events: none;
    transition: .5s;
}

.input-field .input:focus ~ label {
    top: -10px;
    font-size: 13px;
}

.input-field .input:valid ~ label {
    top: -10px;
    font-size: 13px;
    color: #5d5076;
}

.input-field .input:focus, .input-field .input:valid {
    border-bottom: 1px solid #743ae1;
}

.submit {
    border: none;
    outline: none;
    height: 45px;
    background: #ececec;
    border-radius: 5px;
    transition: .4s;
}

.submit:hover {
    background: rgb(49, 49, 49);
    color: #fff;
}

.signin, .signup {
    text-align: center;
    font-size: small;
    margin-top: 25px;
}

span a {
    text-decoration: none;
    font-weight: 700;
    color: #000;
    transition: .5s;
}

span a:hover {
    text-decoration: underline;
    color: #000;
}

@media only screen and (max-width: 768px) {
    .wrapper {
        padding: 0;
    }
    .side-image {
        border-radius: 10px 10px 0 0;
        height: 150px;
    }

    img {
        width: 35px;
        position: absolute;
        top: 20px;
        left: 47%;
    }

    .text {
        position: absolute;
        top: 50%;
        text-align: center;
    }

    .text p {
        font-size: 40px;
        font-weight: bold;
        margin: 0;
    }

    .row {
        max-width: 420px;
        width: 100%;
    }
}
</style>