<template>
  <div class="detail-container">
    <div class="tab-list">
      <div v-for="item in menuList" :key="item.itemIndex" class="list-item">
        {{ item.name }} <span class="down"></span>
      </div>
    </div>
    <div class="main-content">
      <div class="bg-image">
        <div class="content">
          <div class="main-photo"></div>
        </div>
      </div>
      <div></div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      menuList: [
        {
          level: 0,
          itemIndex: 0,
          name: "概览",
          children: [],
        },
        {
          level: 0,
          itemIndex: 1,
          name: "媒体",
          children: [],
        },
        {
          level: 0,
          itemIndex: 2,
          name: "影迷圈",
          children: [],
        },
        {
          level: 0,
          itemIndex: 3,
          name: "分享",
          children: [],
        },
      ],
    };
  },
};
</script>

<style scoped>
.detail-container {
  width: 100%;
}
.tab-list {
  position: absolute;
  top: 64px;
  width: 69%;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-item {
  width: 100px;
  height: 46px;
  line-height: 46px;
  cursor: pointer;
}
.down {
  display: inline-block;
  height: 0px;
  width: 0px;
  margin-left: 3px;
  border: 5px solid #000;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}
.main-content {
  position: absolute;
  top: 110px;
  left: 0;
  height: 510px;
  width: 100%;
}
.bg-image {
  height: 100%;
  width: 100%;
  background-image: url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/jDqWNcHoOy7Q1PR7fJ9tzFKVvoS.jpg);
  background-size: cover;
}
.content {
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to bottom right,
    rgba(241.5, 220.5, 199.5, 1),
    rgba(241.5, 220.5, 199.5, 0.84)
  );
  display: flex;
  padding: 0 16%;
  align-items: center;
}
.main-photo {
  height: 450px;
  width: 300px;
  border-radius: 10px;
  background-image: url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lvvoZflkIvqcyhI2qUlobhshP5q.jpg);
  background-size: cover;
}
</style>
