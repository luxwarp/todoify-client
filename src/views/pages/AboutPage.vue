<template>
  <div class="aboutPage">
    <BrandHero />

    <p>
      Todoify is a simple but great open source to-do app. With Todoify you can
      organize your tasks in categories.
    </p>

    <div class="row">
      <div class="iconCard">
        <i class="icon-desktop icon"></i>
        <div class="title">
          Use on any device
        </div>
      </div>
      <div class="iconCard">
        <i class="icon-dollar icon"></i>
        <div class="title">
          Completely free
        </div>
      </div>
      <div class="iconCard">
        <i class="icon-code icon"></i>
        <div class="title">
          Open Source
        </div>
      </div>
    </div>

    <p>
      If you create an account your to-do's and categories will be synced to our
      server so you can access it on any device with internet connection.
      <strong>That's amazing!</strong>
    </p>

    <h2>Use it on any device</h2>
    <p>
      Todoify is built with responsive design in mind. This means that Todoify
      works and looks good on both big screens like computers, and small screens
      like tablets and phones.
    </p>
    <p>
      The only requirement for using Todoify is that your device has an browser
      and active internet connection first time you enter
      <router-link :to="{ name: 'home.page' }">Todoify</router-link>, Todoify
      will then be saved in your device cache memory and you can access it later
      on without an active internet connection. You can also install Todoify to
      your device home screen like a regular app.
    </p>

    <h2>Offline support</h2>
    <p>
      You should always be able to use an app offline if your network is down.
      Todoify supports full offline mode. This means that if you loose your
      internet connection you can keep on using Todoify as before. When your
      internet connection comes back, Todoify will automatically sync your data
      to our server (if you have an account).
    </p>

    <h2>Open source</h2>
    <p>
      Todoify is built on VueJS and using our Todoify server as backend. Both
      Todoify Client (this one you are visiting now) and Todoify Server is
      licensed under ISC license. So if you are a programmer and want to
      contribute to Todoify your are welcome to visit our code base at GitHub.
    </p>
    <div class="row spaceBetween">
      <a
        href="https://github.com/luxwarp/todoify-client/"
        class="button success"
        target="_blank"
        rel="noreferrer"
      >
        <span class="label">Todoify Client</span>
        <i class="icon-github"></i>
      </a>
      <a
        href="https://github.com/luxwarp/todoify-server/"
        class="button primary"
        target="_blank"
        rel="noreferrer"
      >
        <span class="label">Todoify Server</span>
        <i class="icon-github"></i>
      </a>
    </div>

    <h2>Help us</h2>
    <p>
      We love to hear your thoughts and ideas on how to make Todoify better. So
      feel free to reach out to us on GitHub. Here you can report a bug, and
      request new features.
    </p>
    <a
      href="https://github.com/luxwarp/todoify-client/issues"
      class="button alert"
      target="_blank"
      rel="noreferrer"
    >
      <span class="label">
        Create new issue
      </span>
      <i class="icon-github"></i>
    </a>

    <h2>Author</h2>
    <p>
      Todoify is created by Mikael Luxwarp Carlsson. He is an IT consult and web
      developer from Gothenburg, Sweden. Read more about him at his website.
      <a
        href="https://luxwarp.info"
        target="_blank"
        rel="noreferrer"
        title="Luxwarp's website and blog."
      >
        luxwarp.info
      </a>
    </p>
    <p>
      ISC © 2019 Copyright Mikael Luxwarp Carlsson
    </p>

    <p>
      Icons from:
      <a
        href="http://fortawesome.github.com/Font-Awesome/"
        rel="noreferrer"
        target="_blank"
        title="Free and premium icons."
      >
        Font-Awesome
      </a>
      |
      <a
        href="http://www.entypo.com"
        rel="noreferrer"
        target="_blank"
        title="Free and premium icons."
      >
        Entypo
      </a>
      |
      <a
        href="http://fontello.com/"
        rel="noreferrer"
        target="_blank"
        title="A free icon fonts generator."
      >
        Fontello
      </a>
    </p>
  </div>
</template>

<script>
import BrandHero from "@/components/ui/BrandHero/BrandHero";
export default {
  name: "AboutPage",
  components: {
    BrandHero
  }
};
</script>

<style lang="scss" scoped>
.aboutPage {
  width: 100%;
  max-width: 800px;
  margin: auto;
  text-align: center;

  .iconCard {
    text-align: center;
    border: 0px solid #000;
    margin: 10px auto;
    width: auto;

    > .icon {
      font-size: 3rem;
      margin-bottom: 25px;
    }

    > .title {
      font-size: 1rem;
      font-weight: 900;
    }
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
