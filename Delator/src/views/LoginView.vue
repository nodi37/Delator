<script>
import router from '@/router'
import axios from 'axios'
import store from '@/store'
import jwtDecode from 'jwt-decode';

export default {
  name: 'LoginView',
  data: () => ({
    formDisabled: false,
    resetForm: false,
    feedbackStyle: {
      color: 'red'
    },
    formData: {
      email: '',
      password: ''
    }
  }),
  methods: {
    setFeedback(text) {
      this.formDisabled = false;
      this.$refs.feedback.innerText = this.$t(text);
      this.$refs.feedback.classList.add('login-form__feedback--active');
      setTimeout(() => {
        this.$refs.feedback.classList.remove('login-form__feedback--active');
      }, 5000);
    },
    resetPassword() {
      this.formDisabled = true;
      axios.post(process.env.VUE_APP_API_PATH + '/auth/reset-password', {
        email: this.formData.email
      })
        .then(res => {
          if (res.data.success) {
            this.resetForm = false;
            this.feedbackStyle.color = 'green';
            this.setFeedback('reset-success');
          }
        }).catch(err => {
          console.log(err)
          this.feedbackStyle.color = 'red';
          this.setFeedback('reset-failed');
        })
    },
    submit() {
      this.formDisabled = true;
      axios.post(process.env.VUE_APP_API_PATH + `/auth/login`, this.formData, { withCredentials: true })
        .then(res => {
          if (!res.data.error) {
            const decoded = jwtDecode(res.data.accessToken);
            localStorage.setItem('userId', decoded._id);
            store.commit('SET_USER_ID', decoded._id);
            console.log(store.state)
            router.push({ name: 'app' });
          }
        }).catch(err => {
          this.feedbackStyle.color = 'red';
          this.setFeedback('login-error');
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
    <div class="center-container">
      <form v-if="!resetForm" @submit.prevent="submit" class="login-form">
        <h4 class="login-form__label">{{ $t('please-login') }}</h4>
        <input :disabled="formDisabled" type="email" name="email" placeholder="Email" v-model="formData.email" required>
        <input :disabled="formDisabled" type="password" name="password" placeholder="Password"
          v-model="formData.password" required>
        <button :disabled="formDisabled" type="submit">{{ $t('login') }}</button>
        <span class="login-form__form-switch" @click="resetForm = !resetForm">{{ $t('forgot-password') }}</span>
      </form>

      <form v-else @submit.prevent="resetPassword" class="login-form">
        <h4 class="login-form__label">{{ $t('email-to-reset') }}</h4>
        <input :disabled="formDisabled" type="email" name="email" placeholder="Email" v-model="formData.email" required>
        <button :disabled="formDisabled" type="submit">{{ $t('reset') }}</button>
        <span class="login-form__form-switch" @click="resetForm = !resetForm">{{ $t('back-to-login') }}</span>
      </form>
      <h5 class="login-form__feedback" :style="feedbackStyle" ref="feedback">&nbsp;</h5>
    </div>
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

.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 250px;

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
      margin-top: 20px;
    }
  }

  button {
    margin: 10px 0 5px 0;
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

  &__form-switch {
    color: gray;
    text-decoration: underline;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
  }

}
</style>