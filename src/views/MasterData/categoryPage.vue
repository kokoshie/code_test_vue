<template>
    <Dashboard>
    <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-10">
                <h3 class="text-muted fw-bold">Category List</h3>
              </div>
              <div class="col-2 pl-5">
                <button class="btn btn-dark text-white" data-bs-toggle="modal" data-bs-target="#create_category_modal" @click="clear_errors"><i class="fa-solid fa-plus me-2"></i>Create</button>
              </div>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <table class="table table-bordered" id="categoryTable">
              <thead class="bg-dark">
              <tr>
                <th class="text-center" >No</th>
                <th class="text-center">ID</th>
                <th class="text-center">Photo</th>
                <th class="text-center">Name</th>
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
        <div class="modal fade" id="create_category_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-dark">
                <h5 class="modal-title" id="staticBackdropLabel">Create Category</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="">
                    <div class="card-body">
                      <form @submit.prevent="storeCategory" ref="newcategory">
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
                                  <label for="formFile" class="form-label">Name*</label>
                                  <input class="form-control" name="name" type="text" id="name" @mousedown="clear_errors">
                                  <div class="" v-if="errors.name">
                                  <p class="text-danger fw-bold">{{ errors.name[0] }}</p>
                                  </div>
                              </div>
                          </div>
                          <button type="submit" class="btn btn-primary me-1">Submit</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close_category_modal">Close</button>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <!--Edit Modal -->
      <div class="modal fade" id="edit_category_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-dark">
              <h5 class="modal-title" id="staticBackdropLabel">Update Category</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="">
                  <div class="card-body">
                    <form @submit.prevent="update(editCategory.id)" ref="category">
                        <div class="">
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Photo</label>
                                <input class="form-control" name="photo" type="file" id="photo">
                            </div>
                        </div>
                        <div class="">
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Name</label>
                                <input class="form-control" name="name" type="text" v-model="editCategory.name" id="name" @mousedown="clear_errors">
                                <div class="" v-if="errors.name">
                                <p class="text-danger fw-bold">{{ errors.name[0] }}</p>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary me-1">Submit</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close_update_category_modal">Close</button>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
</template>

<script src="../../js/masterdata/categoryPage.js"></script>

<style lang="scss" scoped>

</style>