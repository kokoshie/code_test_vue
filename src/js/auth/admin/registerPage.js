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
                login_status: 1,
            },
            errors: {}
        }
    },
    methods: {
        login() {
            this.$router.push({ name: 'Admin_Login' })
        },
        register() {
            axios.post(this.$store.state.url + 'register/', this.registerData)
                .then((response) => {
                    console.log(response);
                    this.$store.dispatch("setToken", response.data.data.token);
                    this.$store.dispatch("setUserData", response.data.data);
                    this.$router.push({ name: 'category_list' })
                }).catch((errors) => {
                    this.errors = errors.response.data.errors
                });
        }
    }
}