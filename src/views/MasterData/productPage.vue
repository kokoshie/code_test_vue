<template>
    <Dashboard>
    <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-10">
                <h3 class="text-muted fw-bold">Product List</h3>
              </div>
              <div class="col-2 pl-5">
                <button class="btn btn-dark text-white" data-bs-toggle="modal" data-bs-target="#create_product_modal" @click="clear_errors"><i class="fa-solid fa-plus me-2"></i>Create</button>
              </div>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <table class="table table-bordered" id="productTable">
              <thead class="bg-dark">
              <tr>
                <th class="text-center">No</th>
                <th class="text-center">Id</th>
                <th class="text-center">By</th>
                <th class="text-center">Photo</th>
                <th class="text-center">Category</th>
                <th class="text-center">Name</th>
                <th class="text-center">Price</th>
                <th class="text-center">Description</th>
                <th class="text-center">Action</th>
              </tr>
              </thead>
              <tbody class="text-center">
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- Create Category Modal -->
        <!--Create Modal -->
        <div class="modal fade" id="create_product_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-dark">
                <h5 class="modal-title" id="staticBackdropLabel">Create Product</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="">
                    <div class="card-body">
                      <form @submit.prevent="storeProduct" ref="newproduct">
                          <div class="">
                              <div class="mb-3">
                                  <label for="formFile" class="form-label">Photo*</label>
                                  <input class="form-control" name="photo" type="file" id="photo" @change="clear_errors">
                                  <div class="" v-if="errors.photo">
                                    <p class="text-danger fw-bold">{{ errors.photo[0] }}</p>
                                  </div>
                              </div>
                          </div>
                          <div class="">
                              <div class="mb-3">
                                  <label for="formFile" class="form-label">Name</label>
                                  <input class="form-control" name="name" type="text" id="name" @mousedown="clear_errors">
                                  <div class="" v-if="errors.name">
                                    <p class="text-danger fw-bold">{{ errors.name[0] }}</p>
                                  </div>
                              </div>
                          </div>
                          <div class="">
                              <div class="mb-3">
                                <label for="formFile" class="form-label">Category</label>
                                <select class="form-select" name="category_id" aria-label="Default select example" @change="clear_errors">
                                  <option value="0" selected>Select Category</option>
                                  <option v-for="(category,index) in categories" :key="index" :value="category.id">{{ category.name }}</option>
                                </select>
                                <div class="" v-if="errors.category_id">
                                  <p class="text-danger fw-bold">{{ errors.category_id[0] }}</p>
                                </div>
                              </div>
                          </div>
                          <div class="">
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Price</label>
                                <input class="form-control" name="price" type="number" id="price" @mousedown="clear_errors">
                                <div class="" v-if="errors.price">
                                  <p class="text-danger fw-bold">{{ errors.price[0] }}</p>
                                </div>
                            </div>
                          </div>
                          <div class="">
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Description</label>
                                <textarea class="form-control" rows="3" cols="6" name="description" @mousedown="clear_errors"></textarea>
                                <div class="" v-if="errors.description">
                                  <p class="text-danger fw-bold">{{ errors.description[0] }}</p>
                                </div>
                            </div>
                          </div>
                          <button type="submit" class="btn btn-primary me-1">Submit</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close_product_modal">Close</button>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <!--Edit Modal -->
      <div class="modal fade" id="edit_product_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-dark">
              <h5 class="modal-title" id="staticBackdropLabel">Update Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="">
                  <div class="card-body">
                    <form @submit.prevent="update(editProduct.id)" ref="product">
                        <div class="">
                              <div class="mb-3">
                                  <label for="formFile" class="form-label">Photo</label>
                                  <input class="form-control" name="photo" type="file" id="photo">
                              </div>
                          </div>
                          <div class="">
                              <div class="mb-3">
                                  <label for="formFile" class="form-label">Name</label>
                                  <input class="form-control" name="name" type="text" id="name" v-model="editProduct.name" @mousedown="clear_errors">
                              </div>
                              <div class="" v-if="errors.name">
                                <p class="text-danger fw-bold">{{ errors.name[0] }}</p>
                              </div>
                          </div>
                          <div class="">
                              <div class="mb-3">
                                <label for="formFile" class="form-label">Category</label>
                                <select class="form-select"  v-model="editProduct.category_id" name="category_id"  aria-label="Default select example" @change="clear_errors">
                                  <option value="0">Select Category</option>
                                  <option v-for="(category,index) in categories" :key="index" :value="category.id">{{ category.name }}</option>
                                </select>
                                <div class="" v-if="errors.category_id">
                                  <p class="text-danger fw-bold">{{ errors.category_id[0] }}</p>
                                </div>
                              </div>
                          </div>
                          <div class="">
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Price</label>
                                <input class="form-control" name="price" type="number" id="price" v-model="editProduct.price" @mousedown="clear_errors">
                                <div class="" v-if="errors.price">
                                  <p class="text-danger fw-bold">{{ errors.price[0] }}</p>
                                </div>
                            </div>
                          </div>
                          <div class="">
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Description</label>
                                <textarea class="form-control" rows="3" cols="6" name="description" v-model="editProduct.description" @mousedown="clear_errors"></textarea>
                                <div class="" v-if="errors.description">
                                  <p class="text-danger fw-bold">{{ errors.description[0] }}</p>
                                </div>
                            </div>
                          </div>
                          <button type="submit" class="btn btn-primary me-1">Submit</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close_update_product_modal">Close</button>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
</template>

<script src="../../js/masterdata/productPage.js"></script>

<style lang="scss" scoped>

</style>
