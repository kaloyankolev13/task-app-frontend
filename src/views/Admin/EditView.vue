<template>
    <div class="isolate bg-white px-6 py-16 sm:py-10 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Edit a product</h2>
      </div>
      <form class="mx-auto mt-16 max-w-xl sm:mt-20">
        <div class="grid grid-cols-1  gap-y-6 ">
          <div class="sm:col-span-2">
            <label for="name"  class="block text-sm font-semibold
            leading-6 text-gray-900">Name
            <div class="mt-2.5">
              <input type="text" name="name" id="name" autocomplete="name"
              placeholder='Product Name' v-model='product.name'
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900
              shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </label>
          </div>
          <div class="sm:col-span-2">
            <label for="price"  class="block text-sm font-semibold leading-6 text-gray-900">Price
            <div class="mt-2.5">
              <input v-model='product.price' type="number" name="price"
              placeholder='Product Price' id="price" autocomplete="price" class="block w-full
              rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset
              ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
              focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </label>
          </div>
          <div class="mb-6 pt-4 sm:grid-cols-1">
            <label for='image' class="mb-5 block text-sm font-semibold text-[#07074D]">
          Upload image
          <!-- <input type="file" multiple name="image" class='sr-only' ref='image'
          @change='handleUpload($event)' id="image"> -->
  
          <div
          class="relative flex min-h-[200px] items-center
          justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
          >
            <div>
              <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                Drop files here
              </span>
              <span class="mb-2 block text-base font-medium text-[#6B7280]">
                Or
              </span>
              <span
                class="inline-flex rounded border border-[#e0e0e0]
                py-2 px-7 text-base font-medium text-[#07074D]"
              >
                Browse
              </span>
            </div>
          </div>
        </label>
          <!-- Display the URL and image preview of uploaded image(s) -->
          <div class='grid grid-cols-3'>
          <div v-for='img in product.images' class='' :key='img._id'>
            <img  :src="img.url" alt="" class=''>
          </div>
          <div v-for='img in url' class='' :key='img'>
            <img  :src="img" alt="" >
            <p>{{ img }}</p>
          </div>
    </div>
      </div>
          <div class="sm:col-span-2">
            <label for="description"  class="block text-sm
            font-semibold leading-6 text-gray-900">Description
            <div class="mt-2.5">
              <textarea name="description" id="description"
              v-model='product.description'
              placeholder='Product Description' rows="4"
              class="block w-full rounded-md border-0
              px-3.5 py-2 text-gray-900 shadow-sm ring-1
              ring-inset ring-gray-300 placeholder:text-gray-400
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </label>
          </div>
  
        </div>
        <label for="category" class="block my-3 text-sm font-semibold leading-6 ">Select an option
        <select id="category" v-model='product.category'
        class="bg-gray-50 border border-gray-300 text-sm rounded-lg
        focus:ring-accent focus:border-accent block w-full p-2.5 ">
          <option selected >  Select a category </option>
          <option value="special">Special</option>
          <option value="limited">Limited</option>
          <option value="bestseller">Bestseller</option>
        </select>
      </label>
        <div class="mt-10">
          <button type="button" @click='submitForm()'
          class="block w-full rounded-md bg-accent px-3.5 py-2.5 text-center
          text-sm font-semibold text-white shadow-sm hover:bg-primary
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-accent">Add new product</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang='ts'>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import {useProductsStore} from '@/stores/products';
  import {storeToRefs} from 'pinia';

  const productStore = useProductsStore();
    const { product } = storeToRefs(productStore);

    const route = useRoute();
    const id = route.params.id;


  
  // Import the function to add a new product from the products API
  
    // Initialize the data object for the new product
      const newImages = ref({});
  
      onMounted(() => {
        productStore.fetchProduct(id as string);
      });
      let url = ref([]);
      // // Initialize the image uploader and URL to display uploaded image(s)
      // const imageUploader = ref(null);  
      // // Handle file upload when an image is selected
      // const handleUpload = (event: Event) => {
      //   event.preventDefault();
      //   const { files } = (event.target as HTMLInputElement);
      //   if (!files) return 'No files selected';

      //   for (const file of files) {
      //     const link = URL.createObjectURL(file);
      //     console.log(link);
      //     url.value.push(link);
      //   }
      //   console.log(url.value);
      //   // Add the uploaded image(s) to the new product object
      //   product.images.push(url.value);
      //   newImages.value.images = files;
      // };
      // const resetForm = () => {
      //   newProduct.value.name = '';
      //   newProduct.value.price = '';
      //   newProduct.value.description = '';
      //   newProduct.value.images = [];
      //   // url.value = [];
      // };
  
      const submitForm = () => {
        productStore.updateProduct(product.value);
      };
  

  </script>
  
  <style lang="scss" scoped>
  
  </style>
  