<template>
  <div>
    <NewProduct />
    <ul class='lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4 '>
      <li v-for="product in products" :key="product._id" class='group relative rounded-md'>
        <RouterLink :to="`/products/${product._id}`">
          <!-- Pass each product as a prop to the ProductCard -->
          <ProductCard :product="product" />
          <router-link class="
          btn-dark
          " :to="{ name: 'admin-edit', params: { id: product._id } }">
              Edit</router-link>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import ProductCard from '../../components/ProductCard.vue';
import { storeToRefs } from 'pinia';
import NewProduct from '../../components/Admin/AddNewProduct.vue';

const productStore = useProductsStore();
const { products } = storeToRefs(productStore);

onMounted(() => {
    productStore.fetchProducts();
});

</script>

<style lang="scss" scoped></style>
