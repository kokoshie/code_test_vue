import Dashboard from "@/components/layout/sideNav"
const axios = require('axios').default;
import { ref } from "vue";
import $ from 'jquery';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    name: 'productPage',
    components: {
        Dashboard
    },
    setup() {
        const create_success = () => {
            toast.success("Successfully Added Product", {
                theme: "colored",
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_RIGHT,
            }); // ToastOptions

        }
        const update_success = () => {
            toast.success("Successfully Updated Product", {
                theme: "colored",
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_RIGHT,
            }); // ToastOptions
        }
        const delete_success = () => {
            toast.error("Successfully Deleted Product", {
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
            products: null,
            editProduct: {},
            categories: null,
            errors: {
                photo: '',
                name: '',
                category_id: '',
                price: '',
                description: ''
            },
        }
    },
    methods: {
        storeProduct() {
            let formData = new FormData(this.$refs.newproduct);
            formData.append('role', this.currentUser.user_role);
            formData.append('user_id', this.currentUser.user_id);
            axios.post(this.$store.state.url + 'store_product', formData)
                .then(res => res.data)
                .then(data => {
                    console.log(data);
                    if (data.msg == 'success') {
                        $('#close_product_modal').click();
                        this.getProduct();
                        this.create_success();
                    }
                })
                .catch(err => {
                    console.log(err.response.data.data);
                    this.errors.photo = err.response.data.data.photo;
                    this.errors.name = err.response.data.data.name;
                    this.errors.category_id = err.response.data.data.category_id;
                    this.errors.price = err.response.data.data.price;
                    this.errors.description = err.response.data.data.description;
                });
        },
        getProduct() {
            // alert("dd");
            axios.get(this.$store.state.url + "getProduct")
                .then(response => response.data.products)
                .then((data) => {
                    if (this.currentUser.user_role == 'admin') {
                        this.products = data;
                    } else if (this.currentUser.user_role == 'seller') {
                        let products = data;
                        products = products.filter(el => el.seller_id == this.currentUser.user_id)
                        this.products = products
                    }

                    for (let i = 0; i < this.products.length; i++) {
                        let photo = this.products[i].photo
                        this.products[i].photo = `<img class="rounded" src="http://localhost:8000/assets/images/products/${this.products[i].photo}" width="50" height="50">`;
                        if (this.products[i].seller_name == null) {
                            this.products[i].seller_name = 'Admin'
                        }
                    }
                    $('#productTable').DataTable({
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
                        data: this.products,
                        columns: [{
                                data: null,
                                render: function(data, type, row, meta) {
                                    return meta.row + 1;
                                },
                            },
                            { data: 'id' },
                            { data: 'seller_name' },
                            { data: 'photo' },
                            { data: 'category_name' },
                            { data: 'name' },
                            { data: 'price' },
                            { data: 'description' },
                            {
                                data: 'id',
                                render: function(data) {
                                    return `
                                    <button data-id="${data}" class="btn btn-outline-warning" id="edit" data-bs-toggle="modal" data-bs-target="#edit_product_modal"><i data-id="${data}" id="edit" class="fa-sharp fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#edit_product_modal"></i></button>
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
        getCategory() {
            axios.get(this.$store.state.url + "getCategory")
                .then(response => response.data.categories)
                .then((data) => {
                    this.categories = data;
                })
                .catch(err => {
                    this.errors = err.response.data.errors
                });

        },
        edit(id) {
            // alert(id);
            axios.get(this.$store.state.url + 'product/' + id)
                .then(response => response.data.data)
                .then(data => {
                    console.log(data)
                    this.editProduct = data
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        update(id) {
            let formData = new FormData(this.$refs.product);
            axios.post(this.$store.state.url + 'update_product/' + id, formData)
                .then(res => res.data)
                .then(data => {
                    console.log(data);
                    if (data.msg == "success") {
                        this.getProduct();
                        $('#close_update_product_modal').click();
                        this.update_success();
                    }

                })
                .catch((err) => {
                    console.log(err);
                    this.errors.photo = err.response.data.data.photo;
                    this.errors.name = err.response.data.data.name;
                    this.errors.category_id = err.response.data.data.category_id;
                    this.errors.price = err.response.data.data.price;
                    this.errors.description = err.response.data.data.description;
                });
        },
        delete(id) {
            // alert(id);
            axios.delete(this.$store.state.url + 'delete_product/' + id)
                .then(response => response.data)
                .then(data => {
                    this.getProduct();
                    this.delete_success();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        clear_errors() {
            this.errors.photo = '';
            this.errors.name = '';
            this.errors.category_id = '';
            this.errors.price = '';
            this.errors.description = '';
        }
    },
    mounted() {
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
        this.getProduct();
        this.getCategory();
        $(document).on('click', '#edit', (e) => {
            this.clear_errors();
            this.edit(e.target.getAttribute('data-id'));
        });
        $(document).on('click', '#delete', (e) => {
            this.delete(e.target.getAttribute('data-id'));
        });
    }
}