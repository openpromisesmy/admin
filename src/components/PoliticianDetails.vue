<template>
    <div>
        <h1>{{ politician.name }}</h1>
        <img class="image" :src="politician.profile_image">
        <p><b>{{ politician.primary_position }}</b></p>
        <p>{{ politician.brief }}</p>
    </div>
</template>

<script>
import { getPolitician, listPoliticianPromises } from '@/api'
import { generateStats, formatDate } from '@/utils'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

export default {
  name: 'Politician',
  props: [ 'politician'],
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

#politicians p b {
  display: inline-block
}
</style>
