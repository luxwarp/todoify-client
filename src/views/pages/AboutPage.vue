<template>
  <div class="container">
    <div class="hero">
      <div class="title">
        <div class="brandLogo"></div>
        Todoify
      </div>
      <div class="subTitle">Organize and take control over your life</div>
    </div>
    <div class="container text-center">
      <p>
        Todoify is a simple but great open source to-do app. With Todoify you
        can organize your tasks in categories.
      </p>
    </div>
    <div class="container">
      <div class="row no-wrap full-width">
        <div class="iconCard">
          <i class="fas fa-tv icon"></i>
          <div class="title">
            Use on any device
          </div>
        </div>
        <div class="iconCard">
          <i class="fas fa-dollar-sign icon"></i>
          <div class="title">
            Completely free
          </div>
        </div>
        <div class="iconCard">
          <i class="fab fa-osi icon"></i>
          <div class="title">
            Open Source
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center">
      <p>
        If you create an account your to-do's and categories will be synced to
        our server so you can access it on any device with internet connection.
        <span style="font-weight: 900;">That's amazing!</span>
      </p>
    </div>
    <div class="container text-center">
      <h2>Use it on any device</h2>
      <p>
        Todoify is built with responsive design in mind. This means that Todoify
        works and looks good on both big screens like computers, and small
        screens like tablets and phones.
      </p>
      <p>
        The only requirement for using Todoify is that your device has an
        browser and active internet connection first time you enter
        <router-link :to="{ name: 'home.page' }">Todoify</router-link>
        Todoify will then be saved in your device cache memory and you can
        access it later on without an active internet connection. You can also
        install Todoify to your device home screen like a regular app.
      </p>
    </div>

    <div class="container text-center">
      <h2>Offline support</h2>
      <p>
        You should always be able to use an app offline if your network is down.
        Todoify supports full offline mode. This means that if you loose your
        internet connection you can keep on using Todoify as before. When your
        internet connection comes back, Todoify will automatically sync your
        data to our server (if you have an account).
      </p>
    </div>

    <div class="container text-center">
      <h2>Open source</h2>
      <p>
        Todoify is built on VueJS and using our Todoify server as backend. Both
        Todoify Client (this one you are visiting now) and Todoify Server is
        licensed under ISC license. So if you are a programmer and want to
        contribute to Todoify your are welcome to visit our code base at GitHub.
      </p>
      <div class="row space-evenly no-wrap">
        <a
          href="https://github.com/luxwarp/todoify-client/"
          class="button success"
          target="_blank"
          >Todoify Client <i class="fab fa-github"></i
        ></a>
        <a
          href="https://github.com/luxwarp/todoify-server/"
          class="button primary"
          target="_blank"
          >Todoify Server <i class="fab fa-github"></i
        ></a>
      </div>
    </div>
    <div class="container text-center">
      <h2>Help us</h2>
      <p>
        We love to hear your thoughts and ideas on how to make Todoify better.
        So feel free to reach out to us on GitHub. Here you can report a bug,
        and request new features.
      </p>
      <a
        href="https://github.com/luxwarp/todoify-client/issues"
        class="button alert"
        style="width: auto;"
        target="_blank"
        >Create new issue <i class="fab fa-github"></i
      ></a>
    </div>
    <div class="container text-center">
      <h2>Author</h2>
      <p>
        Todoify is created by Mikael Luxwarp Carlsson. He is an IT consult and
        web developer from Gothenburg, Sweden. Read more about him at his
        website. <a href="https://luxwarp.info" target="_blank">luxwarp.info</a>
      </p>
      <p>
        ISC © 2019 Copyright Mikael Luxwarp Carlsson
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage"
};
</script>

<style lang="scss"></style>
