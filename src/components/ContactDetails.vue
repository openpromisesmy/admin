<template>
  <section>
    <p><b>Email</b> {{ email }} </p>
    <p><b>Phone Number</b> {{ phone_number }} </p>
    <p><b>Facebook</b> {{ facebook_url }} </p>
    <p><b>Twitter</b> {{ twitter_url }} </p>
  </section>
</template>

<script>
export default {
  props: {
    email: {
      type: String
    },
    facebook_url: {
      type: String
    },
    phone_number: {
      type: String
    },
    twitter_url: {
      type: String
    }
  }
}
</script>
