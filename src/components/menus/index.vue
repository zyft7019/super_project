<template>
  <div class="menu-entry">
    <div class="entry" @click.stop.prevent="onMenuExpand" :class="{expanded}">
      <b>系统导航</b>
      <span class="triangle"></span>
      <div class="menu-body" v-show="expanded">
        <ul class="menu">
          <li class="menu-item" v-for="(i, k) in menu" :key="k" @mouseenter.prevent.self="onMenuHover(i)" :class="{active: i.active}">
            <i class="icon"></i>
            <span class="text">{{i.t}}</span>
            <svg viewBox="0 0 1024 1024" class="triangle-right" v-show="i.c">
              <path d="M662.725 557.883l-343.092-362.169 43.386-45.799 343.093 362.169z M319.633 828.286l343.092-362.169 43.387 45.799-343.093 362.169z"></path>
            </svg>
            <ul class="sub-menu" v-if="i.c && i.active">
              <li class="sub-menu-item" v-for="(si, sk) in i.c" :key="sk">
                <span class="title">{{si.t}}</span>
                <span class="menu-port" v-for="(pi, pk) in si.c" :key="pk">{{pi.t}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      expanded: false,
      menu: [
        { t: '机器人管理', c: [{t: '机器人管理', c: [{t: '机器人管理'}]}] },
        { active: true, t: '任务管理', c: [
          {t: '全面巡检', c: [{t: '全面巡检'}]},
          {t: '专项巡检', c: [
            {t: '红外测温1'},
            {t: '红外测温2'},
            {t: '红外测温3'},
            {t: '红外测温4'},
            {t: '红外测温5'}
          ]}
        ] },
        { t: '实时监控' },
        { t: '用户管理' }
      ]
    }
  },
  watch: {
    backdrop (v) {
      if (v) {
        document.onclick = () => {
          this.setBackdrop(false)
          this.expanded = !this.expanded
        }
      } else {
        document.onclick = null
      }
    }
  },
  methods: {
    ...mapActions('home', ['setBackdrop']),
    onMenuExpand () {
      this.expanded = !this.expanded
      this.setBackdrop(this.expanded)
    },
    onMenuHover (i) {
      this.menu.forEach(m => {
        this.$set(m, 'active', false)
      })
      this.$set(i, 'active', true)
    }
  },
  computed: {
    ...mapState('home', ['backdrop'])
  }
}
</script>

<style lang="less" scoped>
/*@import "@scss/element-variables";*/
.menu-entry {
  box-sizing: border-box;
  padding: 6px;
  /*background-color: $--color-primary-light-2;*/
  display: flex;
  position: relative;
  z-index: 2;
  user-select: none;
  .entry {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /*color: $--color-white;*/
    font-size: 19px;
    width: 220px;
    text-align: center;
    line-height: 28px;
    box-shadow: 0 0 2px #333,0 0 1px inset #fff;
    /*background-image: linear-gradient(to bottom, $--color-primary-light-2 45%, $--color-primary 60%);*/
    &.expanded {
      .triangle {
        transform: rotate(180deg);
      }
    }
    .menu-body {
      position: absolute;
      top: 32px;
      left: 0;
      right: 0;
      z-index: 1;
      .menu {
        /*background: $--color-white;
        color: $--color-primary;*/
        font-size: 14px;
        padding: 10px;
        /*border: 1px solid $--color-primary-light-8;*/
        &-item {
          display: flex;
          justify-content: center;
          align-items: center;
          /*border: $--color-primary-light-6 1px solid;*/
          margin-bottom: 10px;
          line-height: 30px;
          position: relative;
          .sub-menu {
            cursor: default;
            position: absolute;
            text-align: left;
            font-weight: normal;
           /* background: $--color-white;
            box-shadow: 0 0 4px $--color-white;*/
            left: 210px;
            top: 0;
            width: 600px;
            padding: 1px;
            &-item {
              font-size: 13px;
              line-height: 22px;
              padding: 5px;
              &:not(:first-child) {
                border-top: 1px solid #aaa;
              }
              .title {
                padding: 0 15px 0 10px;
                font-weight: bold;
                /*border-right: 1px solid $--color-primary-light-3;*/
              }
              .menu-port {
                padding: 0 13px;
                color: #666;
                border-right: 1px solid #aaa;
                cursor: pointer;
                &:hover {
                  /*color: $--color-primary;*/
                  text-decoration: underline;
                }
              }
            }
          }
          &.active {
            font-weight: bold;
          }
          .triangle-right {
            position: absolute;
            width: 14px;
            height: 14px;
            right: 10px;
            path {
              fill: #666;
            }
          }
        }
      }
    }
  }
  .triangle {
    display: inline-block;
    transition: transform .2s;
    margin-left: 20px;
    width: 14px;
    height: 14px;
    /*background: url('~@image/icons/menu-triangle.png');*/
    background-size: contain;
  }
}
</style>

