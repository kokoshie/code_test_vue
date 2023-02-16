import Dashboard from "@/components/layout/sideNav"
const axios = require('axios').default;
import { ref } from "vue";
import $ from 'jquery';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import '@sweetalert2/themes/dark/dark.scss'
export default {
    name: 'loginPage',
    components: {
        Dashboard
    },
    data() {
        return {
            loginData: {
                email: '',
                password: '',
                status: 1
            },
            errors: {
                email: '',
                password: '',
            },
            login_type_error: ''

        }
    },
    methods: {
        register() {
            this.$router.push({ name: 'Admin_Register' })
        },
        seller_login_page() {
            this.$router.push({ name: 'Seller_Login' })
        },
        login() {
            axios.post(this.$store.state.url + 'login/', this.loginData)
                .then((response) => {
                    console.log(response);
                    this.$store.dispatch("setToken", response.data.data.token);
                    this.$store.dispatch("setUserData", response.data.data);
                    this.$router.push({ name: 'category_list' })
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Successfully Login ',
                    })
                }).catch((err) => {
                    console.log(err.response.data.error);
                    this.errors.email = err.response.data.data.email;
                    this.errors.password = err.response.data.data.password;
                    this.login_type_error = err.response.data.data.error;
                });
        },
        clear_errors() {
            this.errors.email = '';
            this.errors.password = '';
            this.login_type_error = ''
        }
    },

}