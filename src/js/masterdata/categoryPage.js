import Dashboard from "@/components/layout/sideNav"
const axios = require('axios').default;
import { ref } from "vue";
import $ from 'jquery';
import { mapGetters } from 'vuex'

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
export default {
    name: 'categoryPage',
    components: {
        Dashboard
    },
    setup() {
        const create_success = () => {
            toast.success("Successfully Added Category", {
                theme: "colored",
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_RIGHT,
            }); // ToastOptions

        }
        const update_success = () => {
            toast.success("Successfully Updated Category", {
                theme: "colored",
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_RIGHT,
            }); // ToastOptions
        }
        const delete_success = () => {
            toast.error("Successfully Deleted Category", {
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
            categories: null,
            editCategory: {},
            errors: {
                photo: '',
                name: ''
            },
        }
    },
    computed: {
        ...mapGetters(["gettoken", 'getUserData'])
    },
    methods: {
        storeCategory() {
            let formData = new FormData(this.$refs.newcategory);
            axios.post(this.$store.state.url + 'store_category', formData)
                .then(res => res.data)
                .then(data => {
                    console.log(data);
                    if (data.msg == 'success') {
                        $('#close_category_modal').click();
                        this.getCategory();
                        this.create_success();
                    }
                })
                .catch(err => {
                    console.log("here errrrrrors");
                    // console.log(err.response.data);
                    this.errors.photo = err.response.data.data.photo;
                    this.errors.name = err.response.data.data.name
                });
        },
        getCategory() {
            axios.get(this.$store.state.url + "getCategory")
                .then(response => response.data.categories)
                .then((data) => {
                    this.categories = data;

                    for (let i = 0; i < this.categories.length; i++) {

                        let photo = this.categories[i].photo
                        this.categories[i].photo = `<img class="rounded" src="http://localhost:8000/assets/images/categories/${this.categories[i].photo}" width="50" height="50">`;
                    }
                    $('#categoryTable').DataTable({
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
                        data: this.categories,
                        columns: [{
                                data: null,
                                render: function(data, type, row, meta) {
                                    return meta.row + 1;
                                },
                            },
                            { data: 'id' },
                            { data: 'photo' },
                            { data: 'name' },
                            {
                                data: 'id',
                                render: function(data) {
                                    return `
                                    <button data-id="${data}" class="btn btn-outline-warning" id="edit" data-bs-toggle="modal" data-bs-target="#edit_category_modal"><i data-id="${data}" id="edit" class="fa-sharp fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#edit_category_modal"></i></button>
                                    <button data-id="${data}" class="btn btn-outline-danger" id="delete"><i data-id="${data}" id="delete" class="fa-solid fa-trash"></i></button>
                                    `
                                }
                            }
                        ]
                    });

                })
                .catch(err => {
                    this.errors = err.response.data.errors
                });

        },
        edit(id) {
            axios.get(this.$store.state.url + 'category/' + id)
                .then(response => response.data.data)
                .then(data => {
                    console.log(data)
                    this.editCategory = data
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        update(id) {
            let formData = new FormData(this.$refs.category);
            axios.post(this.$store.state.url + 'update_category/' + id, formData)
                .then(res => res.data)
                .then(data => {
                    console.log(data);
                    if (data.msg == "success") {
                        this.getCategory();
                        $('#close_update_category_modal').click();
                        this.update_success();
                    }

                })
                .catch((err) => {
                    console.log(err.response.data.data.name);
                    this.errors.name = err.response.data.data.name
                });
        },
        delete(id) {
            alert(id);
            axios.delete(this.$store.state.url + 'delete_category/' + id)
                .then(response => response.data)
                .then(data => {
                    this.getCategory();
                    this.delete_success();
                    this.categories = this.categories.filter(el => el.id != id)
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        clear_errors() {
            this.errors.photo = '';
            this.errors.name = '';
        }
    },
    mounted() {
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
        this.getCategory();
        $(document).on('click', '#edit', (e) => {
            this.clear_errors();
            this.edit(e.target.getAttribute('data-id'));
        });
        $(document).on('click', '#delete', (e) => {
            // alert("del");
            this.delete(e.target.getAttribute('data-id'));
        });
    }


}