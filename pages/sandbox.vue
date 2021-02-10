<template>
  <div id="app" class="container mt-5">
    <h2>ユーザ登録画面</h2>
    <div class="row">
      <div class="col-sm-8">
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="email">メールアドレス:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label for="password">パスワード:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
            />
          </div>
          <button type="submit" class="btn btn-info">登録</button>
        </form>
      </div>
    </div>
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js"></script>

    <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
    <script src="https://www.gstatic.com/firebasejs/8.2.6/firebase-analytics.js"></script>

    <script>
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      var firebaseConfig = {
        apiKey: 'AIzaSyDPmv1Nr6a_24QFhhWXXtvIGGN8_QeUo5I',
        authDomain: 'hamusa-c1fd6.firebaseapp.com',
        projectId: 'hamusa-c1fd6',
        storageBucket: 'hamusa-c1fd6.appspot.com',
        messagingSenderId: '1029394351767',
        appId: '1:1029394351767:web:9190fb4523b78196f04bd2',
        measurementId: 'G-DHC5JQKQGY',
      }
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig)
      firebase.analytics()
    </script>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    registerUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    },
  },
}
</script>
