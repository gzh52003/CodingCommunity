<template>
    <div>
        <BlogsSearch></BlogsSearch>
        <BlogsList></BlogsList>
    </div>
</template>
<script>
import BlogsSearch from './BlogsSearch.vue'
import BlogsList from './BlogsList.vue'
export default {
    data() {
        return {
            
        }
    },
    components:{
        BlogsSearch,
        BlogsList
    }
}
</script>