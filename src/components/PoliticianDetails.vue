<template>
    <el-card id="PoliticianDetails">
    <el-row>
        <el-col :span="12">
            <img class="image" :src="politician.profile_image">
        </el-col>
         <el-col :span="12">
            <h1>{{ politician.name }}</h1>
            <p><b>{{ politician.primary_position }}</b></p>
            <p>{{ politician.brief }}</p>
         </el-col>
    </el-row>
    </el-card>
</template>

<script>
import LoadingSpinner from '@/components/shared/LoadingSpinner'

export default {
  name: 'Politician',
  props: ['politician'],
  components: { LoadingSpinner }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  min-width: 30%;
  display: inline-block;
  object-fit: cover; /* Do not scale the image */
  object-position: top; /* Center the image within the element */
  height: 300px;
}

#PoliticianDetails{
    max-width: 900px;
    margin: 10px auto
}

</style>
