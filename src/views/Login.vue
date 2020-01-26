<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ 'CRM_Title' | localize }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || $v.email.$dirty && !$v.email.email}"
        >
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >{{ 'Message_EmailRequired' | localize }}</small>

        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >{{ 'Message_EmailValid' | localize }}</small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || $v.password.$dirty && !$v.password.minLength}"
        >
        <label for="password">{{ 'Password' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{ 'Message_EnterPassword' | localize }}</small>

        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{ 'Message_MinLength' | localize }} {{ $v.password.$params.minLength.min }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ 'Login' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'NoAccount' | localize }}
        <router-link to="/register">{{ 'Register' | localize }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '../utils/messages'
import localizeFilter from '../filter/localize.filter'

export default {
  metaInfo () {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(localizeFilter(messages[this.$route.query.message]))
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  },
  validations: {
    email: { email, required },
    password: {
      required,
      minLength: minLength(6)
    }
  }
}
</script>
