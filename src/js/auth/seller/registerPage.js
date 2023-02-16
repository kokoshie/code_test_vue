const axios = require('axios').default;
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import '@sweetalert2/themes/dark/dark.scss'
export default {
    name: 'registerPage',
    data() {
        return {
            registerData: {
                name: '',
                email: '',
                password: '',
                c_password: '',
                login_status: 2,
            },
            errors: {
                name: '',
                email: '',
                password: '',
                c_password: '',
            }
        }
    },
    methods: {
        login() {
            this.$router.push({ name: 'Seller_Login' })
        },
        register() {
            axios.post(this.$store.state.url + 'register/', this.registerData)
                .then((response) => {
                    console.log(response);
                    this.$store.dispatch("setToken", response.data.data.token);
                    this.$store.dispatch("setUserData", response.data.data);
                    this.$router.push({ name: 'category_list' })
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Successfully Registered And Login',
                    })
                }).catch((err) => {
                    this.errors.name = err.response.data.data.name;
                    this.errors.email = err.response.data.data.email;
                    this.errors.password = err.response.data.data.password;
                    this.errors.c_password = err.response.data.data.c_password

                });
        },
        clear_errors() {
            this.errors.name = '';
            this.errors.email = '';
            this.errors.password = '';
            this.errors.c_password = ''
        }
    }
}