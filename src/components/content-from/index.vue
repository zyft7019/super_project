<!-- 文章管理 -->
<template>
  <div class="article-manage">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="content_title">
        <el-input v-model="ruleForm.content_title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <!--      <el-form-item label="自定义顺序" prop="content_order">-->
      <!--        <el-input v-model.number="ruleForm.content_order"></el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="文章属性" prop="content_type">-->
      <!--        <el-checkbox-group v-model="ruleForm.content_type">-->
      <!--          <el-checkbox label="头条" name="type"></el-checkbox>-->
      <!--          <el-checkbox label="推荐" name="type"></el-checkbox>-->
      <!--          <el-checkbox label="图片" name="type"></el-checkbox>-->
      <!--          <el-checkbox label="幻灯" name="type"></el-checkbox>-->
      <!--        </el-checkbox-group>-->
      <!--      </el-form-item>-->
      <el-form-item label='上传图片' prop='content_face'>
        <el-upload
          class="inline-block"
          style="margin-right: 5px;vertical-align: top;"
          :action="uploadRobotUrl"
          :limit="1"
          :before-upload="beforeUploadFile"
          :on-error="upLoadPhoError"
          :on-exceed="handleExceed"
          :on-remove="upLoadRoLayRemove"
          :on-success="upLoadRoLaySuccess">
          <el-button type="primary">点击上传</el-button>
        </el-upload>
        <el-popover
          placement="right"
          height="200px"
          width="200px"
          trigger="click">
          <a v-if="ruleForm.content_face != null" :href="ruleForm.content_face" target="_blank">
            <img style="height: 100px" alt="暂无图片" :src="ruleForm.content_face">
          </a>
          <el-button slot="reference" type="primary" style="margin-top: 10px">预 览</el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="文章来源" prop="content_source">
        <el-input v-model="ruleForm.content_source" placeholder="请输入文章来源"></el-input>
      </el-form-item>
      <el-form-item label="文章作者" prop="content_author">
        <el-input v-model="ruleForm.content_author" placeholder="请输入文章作者"></el-input>
      </el-form-item>
      <el-form-item label="所属栏目" prop="cms_category_id">
        <el-cascader ref="myCascader" v-model="ruleForm.cms_category_id" :options="columnData" @change="cascaderChange"
                     :props="{value:'cms_category_id',label:'category_title'}"></el-cascader>
      </el-form-item>
      <el-form-item label="发布时间" prop="release_time_format">
        <el-date-picker
          v-model="ruleForm.release_time_format"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="描述" prop="content_desc">
        <el-input type="textarea" v-model="ruleForm.content_desc" placeholder="请输入文章描述或介绍"></el-input>
      </el-form-item>
      <el-form-item label="关键字" prop="content_keyword">
        <el-input type="textarea" v-model="ruleForm.content_keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item v-show="this.$route.query.cms_category_id !== 1" label="文章内容" prop="content_note">
        <vue-ueditor-wrap v-model="ruleForm.content_note" :config="editorConfig"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">更 新</el-button>
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {addContentData, updateContentData, getRecordByPK} from '@/api/article-manage/article.js'
    import {getRecordLists} from '@/api/sideBar/sideBar.js'
    import {decode64, utf8to16} from '@/utils/Base64Utf8Utf16.js'
    import moment from 'moment'
    import {upLoadUrl} from '@/config'
    import VueUeditorWrap from 'vue-ueditor-wrap'

    // console.log(upLoadUrl)
    export default {
        props: [

        ],
        name: "index.vue",
        components: {VueUeditorWrap},
        data() {
            return {
                editorConfig: {
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 300,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                },
                // uploadRobotUrl: upLoadUrl,
                msg: '654646464654',
                // uploadRobotUrl: 'http://192.168.201.42:8077/cms/file/savefile', // 上传图片地址
                // uploadRobotUrl: upLoadUrl + '/cms/ueditor/savecontentface', // 上传图片地址
                uploadRobotUrl: 'https://192.168.50.114/web/cms/ueditor/savecontentface', // 上传图片地址(服务器地址)
                // uploadRobotUrl: 'https://36.112.33.43:1357/web/cms/ueditor/savecontentface', // 上传图片地址(外网服务器地址)
                // uploadRobotUrl: 'http://192.168.201.42:8077/cms/ueditor/operation?action=uploadimage', // 上传图片地址
                contentFaceUrl: null,
                articleType: [
                    {id: 1, val: '头条'},
                    {id: 2, val: '推荐'},
                    {id: 3, val: '图片'},
                    {id: 4, val: '幻灯'}
                ],
                columnData: [], // 所属栏目数据
                ruleForm: {
                    content_title: null, // 新闻标题
                    content_order: 1, // 新闻排序
                    content_face: null, // 新闻缩略图
                    content_source: null, // 新闻来源
                    content_author: '', // 新闻作者
                    cms_category_id: null, // 新闻栏目表cms_category数据记录序列
                    // release_time: null, // 新闻发布时间
                    release_time_format: new Date(), // 新闻发布时间
                    content_type: null, // 文章属性
                    content_desc: null, // 新闻描述
                    content_keyword: null, // 新闻关键字
                    content_note: null, // 新闻内容
                },
                rules: {
                    content_title: [
                        {required: true, message: '请输入文章标题', trigger: 'blur'},
                        // {  message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    content_order: [
                        {required: true, message: '请输入自定义顺序', trigger: 'blur'}
                    ],
                    release_time_format: [
                        {type: 'date', required: true, message: '请选择文章发布时间', trigger: 'blur'}
                    ],
                    cms_category_id: [
                        {required: true, message: '请选择文章所属栏目', trigger: 'change'}
                    ],
                    content_note: [
                        {required: false, message: '请输入文章内容', trigger: 'blur'}
                    ],
                    content_desc: [
                        {required: true, message: '请输入文章描述或介绍', trigger: 'blur'}
                    ]
                }
            };
        },
        mounted() {
            this.init()
            this.getData()
        },
        methods: {
            init() {
                let num = this.$route.query.num
                if (num) {
                    if (num === 1) {
                        this.ruleForm = this.$route.query
                    }
                    if (num === 2) {
                        let a = new FormData()
                        a.append("id", this.$route.query.id)
                        getRecordByPK(a).then(res => {
                            // console.log(res.data)
                            res.data.content_note = utf8to16(decode64(res.data.content_note))
                            this.ruleForm = res.data
                        })
                    }
                    if (num === 3) {
                        // alert(123)
                        // this.ruleForm = this.$route.query
                        this.ruleForm.cms_category_id = this.$route.query.cms_category_id
                        this.ruleForm.content_note = ''
                    }
                } else {
                    // console.log(this.$route.query)
                    this.ruleForm.cms_category_id = 1
                    this.ruleForm.content_note = ''
                    // this.ruleForm = this.$route.query
                }
            },
            // 获取栏目数据
            getData() {
                getRecordLists().then(res => {
                    // console.log(res)
                    this.columnData = res.data
                })
                // this.columnData = require('@/layout/components/treeData.js').default
            },
            cascaderChange(val) {
                // 获取当前选中的节点
                let currentNode = this.$refs.myCascader.getCheckedNodes()
                this.ruleForm.cms_category_id = currentNode[0].data.cms_category_id
            },
            // 提交
            submitForm(formName) {
                // console.log(this.ruleForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let b = new FormData()
                        let createdTime = new moment(this.ruleForm.release_time_format).format('YYYY-MM-DD HH:mm:ss')
                        b.append("cms_category_id", this.ruleForm.cms_category_id)
                        b.append("content_order", 1)
                        b.append("content_title", this.ruleForm.content_title)
                        b.append("content_face", this.ruleForm.content_face)
                        b.append("content_source", this.ruleForm.content_source)
                        b.append("content_author", this.ruleForm.content_author)
                        b.append("release_time_format", createdTime)
                        b.append("content_keyword", this.ruleForm.content_keyword)
                        b.append("content_desc", this.ruleForm.content_desc)
                        b.append("content_note", this.ruleForm.content_note)
                        let num = this.$route.query.num
                        if (num === 1) {
                            // 添加新闻
                            addContentData(b).then(res => {
                                if (res.code === 1000) {
                                    this.$message.success(res.msg)
                                    // console.log(res.data.id)
                                    let data = {}
                                    data.cms_category_id = res.data.cms_category_id
                                    // data.category_single_page = res.data.category_single_page
                                    this.$router.push({name: 'contentManage', query: data})
                                }
                                if (res.code === 2201) this.$message.warning(res.msg)
                                if (res.code === 2205) this.$message.warning(res.msg)
                            })
                        } else {
                            // 编辑新闻
                            b.append("id", this.ruleForm.id)
                            updateContentData(b).then(res => {
                                if (res.code === 1000) {
                                    this.$message.success(res.msg)
                                    let navId = {}
                                    navId.cms_category_id = res.data.cms_category_id
                                    this.$router.push({name: 'contentManage', query: navId})
                                }
                            })
                        }
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 限制上传图片分比率大小
            beforeUploadFile(file) {
                console.log(file)
                // const isSize = new Promise(function (resolve, reject) {
                //     let width = 320;
                //     let height = 320;
                //     let _URL = window.URL || window.webkitURL;
                //     let img = new Image();
                //     img.onload = function () {
                //         let valid = img.width == width && img.height == height;
                //         valid ? resolve() : reject();
                //     }
                //     img.src = _URL.createObjectURL(file);
                // }).then(() => {
                //     return file;
                // }, () => {
                //     this.$message.error('上传的图片宽高必须是320*320!');
                //     return Promise.reject();
                // });
                // return isSize;
            },
            // 上传成功
            upLoadRoLaySuccess(response, file, fileList) {
                // console.log(response, file, fileList)
                this.ruleForm.content_face = response.url
            },
            // 上传失败
            upLoadRoLayError(err, file, fileList) {
                this.$message.error('图片上传失败!')
            },
            // 删除时的钩子
            upLoadRoLayRemove() {
                this.ruleForm.content_face = null
            },
            // 上传失败
            upLoadPhoError(err, file, fileList) {
                this.$message.error('图片上传失败!')
            },
            handleExceed() {
                this.$message.error('只允许上传一张图片,请删除后再添加!')
            }
        }
    }
</script>

<style scoped>
  .article-manage {
    background-color: #fff;
    padding: 10px;
    overflow: auto;
  }
</style>
