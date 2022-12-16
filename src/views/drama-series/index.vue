<template>
  <div>
    <el-row :gutter="20">
      <!--左侧区域开始-->
      <el-col :span="5">
        <left-menu :menu-list="leftMenu" :current-active="leftMenu[0]" :title="add ? '新增' : '编辑'"/>
      </el-col>
      <!--左侧区域结束-->
      <!--右侧区域开始-->
      <el-col :span="19">
        <router-view/>
      </el-col>
      <!--右侧区域结束-->
    </el-row>
  </div>
</template>

<script>
import LeftMenu from "./components/LeftMenu";
export default {
  name: "index",
  components: { LeftMenu },
  data() {
    return {
      leftMenu: [
        {
          active: 'dramaSeriesBasic',
          name: '基本信息',
          route: '/dramaSeries/index/basic'
        },
        {
          active: 'dramaSeriesAlias',
          name: '别名',
          route: '/dramaSeries/index/alias'
        },
        {
          active: 'dramaSeriesSeason',
          name: '季',
          route: '/dramaSeries/index/season'
        }
      ],
      currentActive: 'dramaSeriesBasic'
    }
  },
  computed: {
    readOnly: function() {
      return this.$route.params.type === 'detail'
    },
    add: function() {
      return this.$route.params.type === 'add'
    },
    detail: function() {
      return this.$route.params.type === 'detail'
    },
    edit: function() {
      return this.$route.params.type === 'edit'
    }
  },
  methods: {
    activeClick(item) {
      this.currentActive = item.active
      this.$router.push({
        path: item.route
      })
    }
  },
  mounted() {
    this.activeClick(this.leftMenu[0])
  }
}
</script>

<style scoped>
</style>