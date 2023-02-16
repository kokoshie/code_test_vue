const axios = require('axios').default;
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import '@sweetalert2/themes/dark/dark.scss'
export default {
    name: 'sideNav',
    data() {
        return {
            currentUser: {
                user_name: sessionStorage.getItem('name'),
                user_role: sessionStorage.getItem('role'),
                user_id: sessionStorage.getItem('user_id'),
            },
            token: sessionStorage.getItem('token'),
        }
    },
    methods: {
        to_seller_list() {
            this.$router.push({ name: 'Seller_List' })
        },
        logout() {
            // sessionStorage.clear();
            axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
            axios.post(this.$store.state.url + 'logout/', this.currentUser)
                .then(res => {
                    console.log(res.data)
                    sessionStorage.clear();
                    if (res.data.data.role == 'admin') {
                        this.$router.push('/');
                    } else if (res.data.data.role == 'seller') {
                        this.$router.push('/seller');
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Successfully Logout ',
                    })
                })
                .catch((err) => {
                    console.log("jfjfj");
                });
        }
    }

}