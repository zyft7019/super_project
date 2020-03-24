<template>
  <div>
    <el-button type="danger">sdf</el-button>
    <el-button type="success">sdf</el-button>
    <el-button type="warning">sdf</el-button>
    <el-button type="primary">sdf</el-button>
    <el-button type="info">sdf</el-button>
    <el-button icon="el-icon-edit" @click="visible=!visible">修改</el-button>
    <div class="form">
      <el-select v-model="a" class="demo">
        <el-option label="a" value="a"></el-option>
        <el-option label="b" value="b"></el-option>
        <el-option label="c" value="c"></el-option>
      </el-select>&nbsp;
      <el-input class="demo" v-model="a" placeholder="acasd"></el-input>&nbsp;
      <el-input class="demo" type="textarea" v-model="a" resize="none"/>&nbsp;
      <el-checkbox v-model="b" size="medium">sss</el-checkbox>&nbsp;
      <el-input-number class="demo-nubmer" v-model="num"></el-input-number>
    </div>
    <el-dialog :visible.sync="visible" title="asdf" v-drag="'dialog'">adf</el-dialog>
  </div>
</template>

<script>
export default {
  mounted () {},
  data () {
    return {
      a: 'a',
      b: false,
      num: 0,
      visible: false
    }
  }
}
</script>

<style lang="less" scoped>
.demo{
  width: 180px;
  &-number{
    width: 100px;
  }
}
.form{
  background-color: #eee;
  margin: 10px 0;
  height: 300px;
}
</style>
