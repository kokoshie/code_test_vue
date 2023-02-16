import Dashboard from "@/components/layout/sideNav"
const axios = require('axios').default;
import { ref } from "vue";
import $ from 'jquery';
import { mapGetters } from 'vuex'

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    name: 'SellerPage',
    components: {
        Dashboard
    },
    setup() {
        const create_success = () => {
            toast.success("Successfully Added Seller Account", {
                theme: "colored",
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_RIGHT,
            }); // ToastOptions

        }
        const update_success = () => {
            toast.success("Successfully Updated Seller Account", {
                theme: "colored",
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_RIGHT,
            }); // ToastOptions
        }
        const delete_success = () => {
            toast.error("Successfully Deleted Seller Account", {
                theme: "colored",
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_RIGHT,
            }); // ToastOptions
        }
        return { create_success, update_success, delete_success };
    },
    data() {
        return {
            currentUser: {
                user_name: sessionStorage.getItem('name'),
                user_role: sessionStorage.getItem('role'),
                user_id: sessionStorage.getItem('user_id'),
            },
            token: sessionStorage.getItem('token'),
            sellers: {},
            editSeller: {},
            errors: {
                photo: '',
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        storeSeller() {
            let formData = new FormData(this.$refs.newseller);
            formData.append('role', this.currentUser.user_role);
            formData.append('user_id', this.currentUser.user_id);
            axios.post(this.$store.state.url + 'store_seller', formData)
                .then(res => res.data)
                .then(data => {
                    console.log(data);
                    if (data.msg == 'success') {
                        $('#close_seller_modal').click();
                        this.getSeller();
                        this.create_success();
                    }
                })
                .catch(err => {
                    console.log(err.response.data.data);
                    this.errors.photo = err.response.data.data.photo;
                    this.errors.name = err.response.data.data.name;
                    this.errors.email = err.response.data.data.email;
                    this.errors.password = err.response.data.data.password;
                });
        },
        getSeller() {
            axios.get(this.$store.state.url + "getSeller")
                .then(response => response.data.sellers)
                .then((data) => {
                    this.sellers = data;

                    for (let i = 0; i < this.sellers.length; i++) {
                        if (this.sellers[i].photo != null) {
                            let photo = this.sellers[i].photo
                            this.sellers[i].photo = `<img class="rounded" src="http://localhost:8000/assets/images/sellers/${this.sellers[i].photo}" width="50" height="50">`;
                        } else {
                            this.sellers[i].photo = `<img class="rounded" src="https://img.freepik.com/premium-vector/cartoon-man-with-global-sphere_24911-13380.jpg" width="50" height="50">`;
                        }
                    }
                    $('#sellerTable').DataTable({
                        // lengthMenu: [
                        //     [10, 25, 50, -1],
                        //     [10, 25, 50, 'All'],
                        // ],
                        destroy: true,
                        responsive: true,
                        lengthChange: true,
                        autoWidth: false,
                        paging: true,
                        dom: "Blfrtip",

                        buttons: ["colvis", "excel", "print", "pdf", "copy", "csv"],
                        // columnDefs: [
                        //     { responsivePriority: 1, targets: 1 },
                        //     { responsivePriority: 2, targets: 2 },
                        // ],
                        language: {
                            "searchPlaceholder": 'Search ...',
                            paginate: {
                                next: '<i class="fa fa-angle-right"></i>', // or '→'
                                previous: '<i class="fa fa-angle-left"></i>' // or '←'
                            }
                        },
                        "order": [
                            [3, "desc"]
                        ],
                        data: this.sellers,
                        columns: [{
                                data: null,
                                render: function(data, type, row, meta) {
                                    return meta.row + 1;
                                },
                            },
                            { data: 'photo' },
                            { data: 'name' },
                            { data: 'email' },
                            {
                                data: 'id',
                                render: function(data) {
                                    return `
                                        <button data-id="${data}" class="btn btn-outline-warning" id="edit" data-bs-toggle="modal" data-bs-target="#edit_seller_modal"><i data-id="${data}" id="edit" class="fa-sharp fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#edit_category_modal"></i></button>
                                        <button data-id="${data}" class="btn btn-outline-danger" id="delete"><i data-id="${data}" id="delete" class="fa-solid fa-trash"></i></button>
                                        `
                                }
                            }
                        ]
                    });

                })
                .catch(err => {
                    console.log(err);
                    this.errors = err
                });


        },
        edit(id) {
            // alert(id);
            axios.get(this.$store.state.url + 'seller/' + id)
                .then(response => response.data.data)
                .then(data => {
                    console.log(data)
                    this.editSeller = data
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        update(id) {
            let formData = new FormData(this.$refs.seller);
            axios.post(this.$store.state.url + 'update_seller/' + id, formData)
                .then(res => res.data)
                .then(data => {
                    console.log(data);
                    if (data.msg == "success") {
                        this.getSeller();
                        $('#close_update_seller_modal').click();
                        this.update_success();
                    }

                })
                .catch((err) => {
                    // console.log(err.response.data.data.name);
                    this.errors.name = err.response.data.data.name
                    this.errors.email = err.response.data.data.email
                });
        },
        delete(id) {

            axios.delete(this.$store.state.url + 'delete_seller/' + id)
                .then(response => response.data)
                .then(data => {
                    this.getSeller();
                    this.delete_success();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        clear_errors() {
            this.errors.photo = '';
            this.errors.name = '';
            this.errors.email = '';
            this.errors.password = '';
        }
    },
    mounted() {
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
        this.getSeller();
        $(document).on('click', '#edit', (e) => {
            this.errors.photo = '';
            this.errors.name = '';
            this.errors.email = '';
            this.errors.password = '';
            this.edit(e.target.getAttribute('data-id'));
        });
        $(document).on('click', '#delete', (e) => {
            // alert("del");
            this.delete(e.target.getAttribute('data-id'));
        });
    }
}