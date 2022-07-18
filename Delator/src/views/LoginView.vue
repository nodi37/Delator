<script>
import router from '@/router'
import axios from 'axios'
import store from '@/store'
import jwtDecode from 'jwt-decode';

export default {
  name: 'LoginView',
  data: () => ({
    formDisabled: false,
    formData: {
      email: '',
      password: ''
    }
  }),
  methods: {
    submit() {
      this.formDisabled = true
      axios.post(process.env.VUE_APP_API_PATH + `/auth/login`, this.formData, { withCredentials: true })
        .then(res => {
          if (!res.data.error) {
            const decoded = jwtDecode(res.data.accessToken);
            localStorage.setItem('userId', decoded._id);
            router.push({ name: 'app' });
          }
        })
        .catch(err => {
          this.$refs.feedback.innerText = this.$t('login-error');
          this.$refs.feedback.classList.add('login-form__feedback--active');
          setTimeout(() => {
            this.$refs.feedback.classList.remove('login-form__feedback--active');
          }, 5000);
        });
    }
  },
  beforeCreate() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      router.push({ name: 'app' });
    }
  }
}

</script>

<template>
  <div class="login-page">
    <form @submit.prevent="submit" class="login-form">
      <h4 class="login-form__label">{{ $t('please-login') }}</h4>
      <input :disabled="formDisabled" type="email" name="email" placeholder="Email" v-model="formData.email" required>
      <input :disabled="formDisabled" type="password" name="password" placeholder="Password" v-model="formData.password"
        required>
      <span class="login-form__feedback" ref="feedback">dupa</span>
      <button :disabled="formDisabled" type="submit">{{ $t('login') }}</button>
    </form>
  </div>
</template>

<style lang="scss">
.login-page {
  font-family: sans-serif;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgb(119, 131, 224);
  background: linear-gradient(to right, #a977e0, #b8387a);
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);

  &__label {
    color: gray;
    text-align: center;
    margin-bottom: 20px;
  }

  input {
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
    background-color: #8080803b;
    margin-bottom: 10px;
  }

  &__feedback {
    height: 0px;
    text-align: center;
    color: red;
    overflow: hidden;
    transition: all .3s;

    &--active {
      height: 25px;
    }
  }

  button {
    margin: 20px 0 5px 0;
    border-radius: 10px;
    background-color: #1976D2;
    color: white;
    padding: 10px;
    transition: all .3s;

    &:hover {
      transform: translateY(-3px);
    }

    &:active {
      transform: translateY(0);
      opacity: .6;
    }
  }


}
</style>