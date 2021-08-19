<template>
  <div class="movie-item mb-4">
    <div class="movie-item-poster" :style="posterBg"></div>
    <div class="movie-info-wrapp">
      <div class="movie-item-info">
        <h3 class="movie-title">{{ movie.Title }}</h3>
        <span class="movie-year">{{ movie.Year }}</span>
      </div>
      <div class="movie-item-controls row no-gutters">
        <div class="col pr-2">
          <BButton size="md" block variant="outline-light">Edit</BButton>
        </div>
        <div class="col pl-2">
          <BButton size="md" block variant="outline-light">Remove</BButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    posterBg() {
      return {
        'background-image':`url(${this.movie.Poster})`
      };
    }
  }
}
</script>

<style scoped>
  .movie-item {
    cursor: pointer;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease-in;
    height: 400px;
  }
  .movie-item:hover {
    box-shadow: 0px 5px 30px rgba(85, 77, 77, 0.7);
    transform: scale(1.02);
  }
  .movie-item-poster {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: -1;
  }
  .movie-title {
    color:#fff;
    font-size: 20px;
  }
  .movie-year {
    color:#fff;
    font-size: 16px;
  }
  .movie-info-wrapp {
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    height: 100%;
    flex-direction: column;
    opacity: 0;
    transition: all 0.2s ease;
  }
  .movie-item:hover .movie-info-wrapp {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>