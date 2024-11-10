<template>
  <div class="tree-edit-add">
    <div class="my-breadcrumb">
      <div @click="pageBack" class="back-box">
        <div class="back-icon"><</div>
        <div class="back-lable">返回</div>
      </div>
    </div>
    <div class="select-part">
      <div class="flex">
        <div class="select-item">
          <div style="width: 50px; line-height: 30px">机型 </div>
          <el-select v-model="model" placeholder="请选择" @change="getTree()">
            <el-option
              v-for="item in modelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div style="margin-left: 12px" class="select-item">
          <div style="width: 100px; line-height: 30px">故障代码 </div>
          <el-select v-model="faultCode" clearable filterable placeholder="请选择">
            <el-option
              v-for="item in faultCodeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div style="margin-left: 12px; height: 32px" class="select-item">
          <el-input placeholder="输入故障树关键字进行过滤" v-model="filterText" clearable> </el-input>
        </div>
      </div>

      <div class="flex">
        <el-button class="dwonload-tempele" @click="exportTree">下载模板</el-button>
        <el-upload
          class="upload"
          :headers="header"
          name="multipartFile"
          action="https://ccm.quant-cloud.cn/api/fault/tree/import"
          :show-file-list="false"
          :on-success="onSuccess"
          :on-error="onerror"
        >
          <el-button class="dwonload-button">导入数据</el-button>
        </el-upload>
        <!-- <div class="divider"></div> -->
        <!-- <el-button @click="handleAdd()">新建</el-button> -->
        <el-button class="search-form-queryBtn" type="primary" @click="handleAdd" style="margin-left: 25px"
          >新建</el-button
        >
      </div>
    </div>
    <div class="main-part" v-show="model">
      <div>
        <div v-loading="loading" element-loading-text="loading" element-loading-background="rgba(16,41,82,0.5)">
          <el-tree
            ref="tree"
            :data="treeData"
            :props="props"
            node-key="id"
            :check-on-click-node="true"
            :expand-on-click-node="true"
            :default-expand-all="false"
            :accordion="false"
            @node-click="nodeClick"
            :filter-node-method="filterNode"
          >
            <template v-slot="{ node, data }">
              <span class="custom-tree-node">
                <span v-if="node.label.length < 40">{{ node.label }}</span>
                <el-tooltip v-else class="mylabel" effect="dark" :content="node.label" placement="top-start">
                  <span>{{ node.label.slice(0, 30) + '...' }}</span>
                </el-tooltip>
                <span class="handle-box">
                  <el-icon style="color: rgba(72, 170, 255, 1)"><Edit @click="editTree(node, data)" /></el-icon>
                  <el-icon style="color: rgba(72, 170, 255, 1)"><CirclePlus @click="append(node, data)" /></el-icon>
                  <el-icon style="color: red"><Delete @click="remove(node, data)" /></el-icon>
                </span>
              </span>
            </template>
          </el-tree>
        </div>
      </div>
      <div class="tree-form-part" v-show="Object.keys(treeForm).length > 0" v-options-hide="setOptionsHide">
        <div class="my-lable">
          <span>{{ parentName }}</span>
          <label v-if="childrenName !== null"> / </label>
          <span>{{ childrenName }}</span>
          <label v-if="lastChildrenName !== null"> / </label>
          <span>{{ lastChildrenName }}</span>
        </div>
        <el-form
          label-position="left"
          ref="treeForm"
          :model="treeForm"
          class="treeForm"
          label-width="100px"
          :rules="rules"
        >
          <el-form-item label="故障树名称:" prop="nodeName">
            <el-input v-model="treeForm.nodeName" ref="getfocus" maxlength="40"></el-input>
          </el-form-item>
          <el-form-item label="故障代码:" prop="nodeId" v-if="node == '新建'">
            <el-input v-model="treeForm.nodeId" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="故障代码:" v-if="node !== '新建'">
            <el-input v-model="treeForm.rootNodeId"></el-input>
          </el-form-item>
          <el-form-item label="节点描述:" prop="nodeDesc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 3 }"
              maxlength="255"
              v-model="treeForm.nodeDesc"
            ></el-input>
          </el-form-item>
          <el-form-item label="原因概率:" prop="faultReasonPr">
            <el-input v-model="treeForm.faultReasonPr">
              <i slot="suffix">%</i>
            </el-input>
          </el-form-item>
          <el-form-item label="判断方法:" prop="judgeMethods">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 8 }"
              maxlength="2000"
              v-model="treeForm.judgeMethods"
            ></el-input>
          </el-form-item>
          <el-form-item label="处理方法:" prop="processingMethods">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 8 }"
              maxlength="2000"
              v-model="treeForm.processingMethods"
            ></el-input>
          </el-form-item>
          <el-form-item label="工具:">
            <el-input v-model="treeForm.remark" maxlength="255"></el-input>
          </el-form-item>
          <el-form-item label="工艺控制:">
            <el-input v-model="treeForm.techControl" maxlength="255"></el-input>
          </el-form-item>
        </el-form>
        <div class="save-part">
          <!-- <div class="save-part" v-show="node !== '查看'"> -->
          <el-button @click="handelCancel()" class="dwonload-button">取 消</el-button>
          <el-button type="primary" @click="onSubmit('treeForm')">确 定</el-button>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="errorDialogVisible" width="40%">
      <div slot="title" class="dialog-header-title">
        <i class="el-icon-warning-outline err-icon"></i>
        <span>错误提示</span>
      </div>
      <el-table :data="errorTableData" stripe style="width: 100%" max-height="3rem">
        <el-table-column type="index" label="序号" width="100" align="center"> </el-table-column>
        <el-table-column
          v-for="item in errorTableHeaders"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :min-width="item.width"
          :key="item.prop"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="errorDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import optionsHide from '../methods/optionsHide'
export default {
  directives: {
    optionsHide
  },
  data() {
    return {
      props: {
        label: 'nodeName',
        children: 'children',
        isLeaf: 'leaf'
      },
      title: '编辑',
      model: null,
      modelOptions: [],
      faultCode: null,
      faultCodeOptions: [],
      treeForm: {},
      treeData: [],
      filterText: null,
      node: null, //树结构的数据
      data: {},
      rules: {
        nodeName: [{ required: true, message: '请输入故障树名称', trigger: 'blur' }],
        nodeId: [{ required: true, message: '请输入故障代码', trigger: 'blur' }],
        faultReasonPr: [
          {
            pattern: /^((\d|[123456789]\d)(\.\d{1,4})?|100)$/,
            message: '仅支持0-100以内的最多4位小数的数或整数',
            trigger: 'blur'
          }
        ],
        judgeMethods: [{ required: true, message: '请输入判断方法', trigger: 'blur' }],
        processingMethods: [{ required: true, message: '请输入处理方法', trigger: 'blur' }]
      },
      header: {},
      errorDialogVisible: false,
      errorTableData: [],
      errorTableHeaders: [
        { prop: 'row', label: '行号', width: 100 },
        { prop: 'message', label: '错误原因', width: 100 }
      ],
      parentName: '',
      childrenName: null,
      lastChildrenName: null,
      loading: false
    }
  },
  mounted() {
    // (this.header = { token: sessionStorage.getItem("token") }),
    // this.$bus.$off("getParams");
    // this.$bus.$on("getParams", (item) => {
    //   this.title = item.title;
    //   this.model = item.model;
    // });
    this.getModel()
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    faultCode(val) {
      this.$refs.tree.filter()
    }
  },

  methods: {
    backBtn() {},
    addModel() {},
    pageBack() {
      this.$emit('pageBack')
    },
    setOptionsHide() {
      if (this.node == '新建' && Object.keys(this.treeForm).length > 0) {
        const index = this.treeData.findIndex((d) => d.id === null)
        if (index > -1) {
          this.treeData.splice(index, 1)
        }
      }
    },
    filterNode(value, data) {
      if (!value && !this.faultCode) return true
      if (this.faultCode && value) {
        return data.nodeName.indexOf(value) !== -1 && data.nodeId.indexOf(this.faultCode) !== -1
      } else if (this.faultCode && !value) {
        return data.nodeId.indexOf(this.faultCode) !== -1
      } else if (!this.faultCode && value) {
        return data.nodeName.indexOf(value) !== -1
      }
    },
    remove(node, data) {
      this.handelCancel()
      let _that = this
      if (node.level == 1 && node.childNodes.length) {
        this.$confirm(`${data.nodeName}模块包含有子模块，确定一并删除？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'del-model'
        })
          .then(() => {
            _that.delTree(data.id)
          })
          .catch(() => {
            _that.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$confirm(`确定删除 ${data.nodeName} 模块吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            _that.delTree(data.id)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    append(node, data) {
      this.handelCancel()
      if (node.level == 1) {
        this.parentName = data.nodeName
        this.childrenName = null
        this.lastChildrenName = null
      } else if (node.level == 2) {
        const parent = this.treeData.filter((d) => d.nodeId === data.nodeParentid)
        this.parentName = parent[0].nodeName
        this.childrenName = data.nodeName
        this.lastChildrenName = null
      } else if (node.level == 3) {
        let parent = []
        let children = []
        let index = 0
        this.treeData.map((item) => {
          if (item.children.findIndex((d) => d.nodeId === data.nodeParentid) > -1) {
            index = item.children.findIndex((d) => d.nodeId === data.nodeParentid)
            parent = item
            children = item.children
          }
        })
        this.parentName = parent.nodeName
        this.childrenName = children[index].nodeName
        this.lastChildrenName = data.nodeName
      }

      this.$refs.treeForm.clearValidate()
      if (Object.keys(this.treeForm).length == 0) {
        const newChild = {
          id: null,
          nodeName: '',
          edit: true,
          children: [],
          model: this.model,
          nodeParentid: data.nodeId
        }
        this.treeForm = newChild
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        this.$nextTick(() => {
          this.$refs.getfocus.focus()
        })
        data.children.push(this.treeForm)
        this.data = data
        this.node = node
      }
    },
    //编辑
    editTree(node, data) {
      this.oldTreeForm = JSON.stringify(data)
      if (node.level == 1) {
        this.parentName = data.nodeName
        this.childrenName = null
        this.lastChildrenName = null
      } else if (node.level == 2) {
        const parent = this.treeData.filter((d) => d.nodeId === data.nodeParentid)
        this.parentName = parent[0].nodeName
        this.childrenName = data.nodeName
        this.lastChildrenName = null
      } else if (node.level == 3) {
        let parent = []
        let children = []
        let index = 0
        this.treeData.map((item) => {
          if (item.children.findIndex((d) => d.nodeId === data.nodeParentid) > -1) {
            index = item.children.findIndex((d) => d.nodeId === data.nodeParentid)
            parent = item
            children = item.children
          }
        })
        this.parentName = parent.nodeName
        this.childrenName = children[index].nodeName
        this.lastChildrenName = data.nodeName
      }
      this.node = '编辑'
      this.$refs.treeForm.clearValidate()

      let data1 = JSON.parse(JSON.stringify(data))
      this.treeForm = {
        ...data1,
        faultReasonPr: data1.faultReasonPr == 0 || data1.faultReasonPr === null ? '-' : data1.faultReasonPr
      }
    },
    handleAdd() {
      this.parentName = null
      this.childrenName = null
      this.lastChildrenName = null
      this.handelCancel()
      this.$refs.treeForm.clearValidate()
      this.node = '新建'
      this.treeForm = {
        id: null,
        nodeName: '',
        edit: true,
        children: [],
        model: this.model
      }
      this.treeData.push(this.treeForm)
    },
    onSubmit(formName) {
      return
      let _that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addTree()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handelCancel() {
      if (this.node == '编辑' || this.node == '查看' || this.node == null || this.node == '新建') {
        this.treeForm = {}
      } else {
        if (this.node.level == 1) {
          const parent = this.treeData
          const data = parent.filter((d) => d.id === this.data.id)
          const index1 = data[0].children.findIndex((d) => d.id === null)
          data[0].children.splice(index1, 1)
        } else {
          const index = this.node.data.children.findIndex((d) => d.id === null)
          this.node.data.children.splice(index, 1)
        }
      }
      this.treeForm = {}
    },
    //查看
    nodeClick(data, node) {
      this.handelCancel()
      this.node = '查看'
      if (node.level == 1) {
        this.parentName = data.nodeName
        this.childrenName = null
        this.lastChildrenName = null
      } else if (node.level == 2) {
        const parent = this.treeData.filter((d) => d.nodeId === data.nodeParentid)
        this.parentName = parent[0].nodeName
        this.childrenName = data.nodeName
        this.lastChildrenName = null
      } else if (node.level == 3) {
        let parent = []
        let children = []
        let index = 0
        this.treeData.map((item) => {
          if (item.children.findIndex((d) => d.nodeId === data.nodeParentid) > -1) {
            index = item.children.findIndex((d) => d.nodeId === data.nodeParentid)
            parent = item
            children = item.children
          }
        })
        this.parentName = parent.nodeName
        this.childrenName = children[index].nodeName
        this.lastChildrenName = data.nodeName
      }
      this.oldTreeForm = JSON.stringify(data)
      if (data.id === null) {
        this.treeForm = {}
      } else {
        this.treeForm = {
          ...data,
          faultReasonPr: data.faultReasonPr == 0 || data.faultReasonPr === null ? '-' : data.faultReasonPr
        }
        this.$refs.treeForm.clearValidate()
      }
    },
    arryToTree(arr) {
      this.faultCodeOptions = []
      if (!Array.isArray(arr) || arr.length < 1) return null
      const [...root] = arr.filter((item) => item.nodeType == '1')
      const addChildren = (node, dataList) => {
        const child = dataList
          .filter((item) => item.nodeParentid === node.nodeId)
          .map((item) => addChildren(item, dataList))
        const children = child.map((item) => {
          return { ...item }
        })
        return {
          ...node,
          children
        }
      }
      let tree = root.map((item) => {
        this.faultCodeOptions.push({ value: item.nodeId, label: item.nodeId })
        return addChildren(item, arr)
      })
      return tree
    },
    download(res, fileName) {
      if (!res) {
        return
      }
      let blob = new Blob([res.data], { type: 'application/octet-stream' })
      let url = window.URL.createObjectURL(blob) //创建下载的链接
      let link = document.createElement('a')

      link.href = url
      link.download = fileName + '.xlsx' //下载后文件名
      document.body.appendChild(link)
      link.click() //点击下载
      window.URL.revokeObjectURL(url) //释放掉blob对象
      document.body.removeChild(link) //下载完成移除元素
    },
    onSuccess(response, file, fileList) {
      if (response.code === 20000 && response.data.length == 0) {
        this.errorDialogVisible = false
        this.$message({ type: 'success', message: '导入成功!' })
        this.getTree()
      } else {
        if (response.data && response.data.length > 0) {
          this.$message.error('导入失败')
          this.errorTableData = response.data
          this.errorDialogVisible = true
        } else {
          this.$message.error('导入失败')
        }
      }
    },
    onerror(err, file, fileList) {
      this.$message.error('导入失败')
    },
    async getModel() {
      console.log('getModel')
      this.modelOptions = [
        {
          value: 'MY1.5',
          label: 'MY1.5'
        },
        {
          value: 'MY2.0',
          label: 'MY2.0'
        },
        {
          value: 'MySE3.0',
          label: 'MySE3.0'
        },
        {
          value: 'MySE5.5',
          label: 'MySE5.5'
        }
      ]
      this.model = 'MY1.5'
      this.getTree('')
      // try {
      //   let data = await this.$api.health.getModel();
      //   if (data.code == 20000) {
      //     if (data.data.length > 0) {
      //       this.modelOptions = data.data.map((item) => {
      //         return { value: item, label: item };
      //       });
      //       this.model = this.modelOptions[0].value;
      //       this.getTree("");
      //     }
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async getTree(id) {
      // this.loading = true;
      // this.treeData = [];
      // try {
      //   let data = await this.$api.health.getTree({
      //     model: this.model,
      //     parentNodeId: id,
      //   });
      //   this.loading = false;
      //   if (data.code == 20000) {
      //     if (data.data.length > 0) {
      //       this.treeData = this.arryToTree(data.data);
      //     }
      //   }
      // } catch (error) {
      //   this.loading = false;
      //   console.log(error);
      // }

      this.loading = false
      this.treeData = [
        {
          id: 18009,
          model: 'MY1.5',
          nodeId: '01_05_033',
          rootNodeId: '01_05_033',
          nodeParentid: '',
          nodeType: '1',
          nodeName: '桨叶2变桨电机风扇保护动作',
          nodeDesc: '桨叶2变桨电机风扇保护动作',
          faultReasonPr: 0,
          color: '#2CBFF5',
          judgeMethods: '机组桨叶2变桨电机风扇保护动作故障',
          processingMethods:
            '1.登塔检查，紧固桨叶2温度传感器接线,2.检查线路，清理风扇,3.登机检查变桨电机风扇，发现风扇损坏则更换变桨电机风扇',
          techControl: '',
          remark: '',
          createTime: '2021-10-19 15:22:39',
          children: [
            {
              id: 18010,
              model: 'MY1.5',
              nodeId: '01_05_033-1',
              rootNodeId: '01_05_033',
              nodeParentid: '01_05_033',
              nodeType: '2',
              nodeName: '桨叶2电机风扇插头松动',
              nodeDesc: '桨叶2电机风扇插头松动',
              faultReasonPr: 78,
              color: '#CB2E03',
              judgeMethods: '',
              processingMethods: '登塔检查，紧固桨叶2温度传感器接线',
              techControl: '',
              remark: '',
              createTime: '2021-10-19 15:22:39',
              children: []
            },
            {
              id: 18011,
              model: 'MY1.5',
              nodeId: '01_05_033-3',
              rootNodeId: '01_05_033',
              nodeParentid: '01_05_033',
              nodeType: '2',
              nodeName: '桨叶2电机散热风扇损坏',
              nodeDesc: '桨叶2电机散热风扇损坏',
              faultReasonPr: 13,
              color: '#4963FE',
              judgeMethods: '',
              processingMethods: '更换变桨电机风扇',
              techControl: '',
              remark: '',
              createTime: '2021-10-19 15:22:39',
              children: []
            },
            {
              id: 18012,
              model: 'MY1.5',
              nodeId: '01_05_033-2',
              rootNodeId: '01_05_033',
              nodeParentid: '01_05_033',
              nodeType: '2',
              nodeName: '桨叶2电机风扇卡塞',
              nodeDesc: '桨叶2电机风扇卡塞',
              faultReasonPr: 9,
              color: '#2CBFF5',
              judgeMethods: '',
              processingMethods: '检查线路，清理风扇',
              techControl: '',
              remark: '',
              createTime: '2021-10-19 15:22:39',
              children: []
            }
          ]
        },
        {
          id: 18016,
          model: 'MY1.5',
          nodeId: '02_04_002',
          rootNodeId: '02_04_002',
          nodeParentid: '',
          nodeType: '1',
          nodeName: '主轴超速等级2',
          nodeDesc: '主轴超速等级2',
          faultReasonPr: 0,
          color: '#2CBFF5',
          judgeMethods:
            '齿轮箱增速比不为0时，主轴转速1秒值＞（1950rpm/齿轮箱变比）且风速10分钟平均值＞3.5m/s且发电机实时转速＞350rpm且不在低穿模式，延时1s报警停机，（1小时允许出现3次）（部分老项目为1945rpm/齿轮箱变比）',
          processingMethods: '',
          techControl: '',
          remark: '',
          createTime: '2021-10-20 08:44:27',
          children: [
            {
              id: 18023,
              model: 'MY1.5',
              nodeId: '02_04_002-3',
              rootNodeId: '02_04_002',
              nodeParentid: '02_04_002',
              nodeType: '2',
              nodeName: '编码器安装异常',
              nodeDesc: '编码器安装异常',
              faultReasonPr: 38,
              color: '#CB2E03',
              judgeMethods: '编码器安装松动、联轴节安装松动',
              processingMethods: '1、检查编码器安装；2、检查联轴节安装；',
              techControl: '',
              remark: '',
              createTime: '2021-10-20 09:24:43',
              children: [
                {
                  id: 18024,
                  model: 'MY1.5',
                  nodeId: '02_04_002-3-1',
                  rootNodeId: '02_04_002',
                  nodeParentid: '02_04_002-3',
                  nodeType: '3',
                  nodeName: '滑环编码器联轴器连接螺栓松动',
                  nodeDesc:
                    '由于编码器联轴器连接螺栓松动，导致速度传递到编码器轴端出现橡皮筋效应。致使编码器输出转速突然增大。',
                  faultReasonPr: 32,
                  color: '#CB2E03',
                  judgeMethods: '使用紧固螺栓工具测试是否松动。',
                  processingMethods: '使用紧固螺栓工具紧固',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-20 09:24:43',
                  children: []
                },
                {
                  id: 18026,
                  model: 'MY1.5',
                  nodeId: '02_04_002-3-3',
                  rootNodeId: '02_04_002',
                  nodeParentid: '02_04_002-3',
                  nodeType: '3',
                  nodeName: '滑环编码器内部损坏',
                  nodeDesc: '编码器内部光栅损坏，或编码器防护等级破坏内部进入灰尘等。',
                  faultReasonPr: 27,
                  color: '#DB8202',
                  judgeMethods:
                    '检查滑环轴承及编码器联轴器没有异常前提下，更换滑环编码器，若机组运行后故障消除，说明滑环编码器异常。',
                  processingMethods: '更换编码器。',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-20 09:24:43',
                  children: []
                },
                {
                  id: 18027,
                  model: 'MY1.5',
                  nodeId: '02_04_002-3-4',
                  rootNodeId: '02_04_002',
                  nodeParentid: '02_04_002-3',
                  nodeType: '3',
                  nodeName: '滑环编码器电磁干扰，屏蔽线未良好接地',
                  nodeDesc: '滑环编码器屏蔽线未与编码器外壳连接，控制柜内屏蔽线未良好可靠接地。',
                  faultReasonPr: 23,
                  color: '#DB8202',
                  judgeMethods: '用万用表测量屏蔽线与编码器外壳及控制柜内地线导通情况。',
                  processingMethods: '屏蔽线控制柜内环切接地，编码器屏蔽线在电缆出线航插上环切压接好。',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-20 09:24:43',
                  children: []
                },
                {
                  id: 18025,
                  model: 'MY1.5',
                  nodeId: '02_04_002-3-2',
                  rootNodeId: '02_04_002',
                  nodeParentid: '02_04_002-3',
                  nodeType: '3',
                  nodeName: '编码器联轴器损坏',
                  nodeDesc: '编码器联轴器损坏，导致转速与实际转速出现不可控差异。',
                  faultReasonPr: 19,
                  color: '#4963FE',
                  judgeMethods: '拆卸编码器联轴器，观察联轴器本体上是否有裂纹、或是断裂等。',
                  processingMethods: '更换联轴器。',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-20 09:24:43',
                  children: []
                }
              ]
            },
            {
              id: 18028,
              model: 'MY1.5',
              nodeId: '02_04_002-4',
              rootNodeId: '02_04_002',
              nodeParentid: '02_04_002',
              nodeType: '2',
              nodeName: '滑环异常',
              nodeDesc: '滑环异常',
              faultReasonPr: 31,
              color: '#CB2E03',
              judgeMethods: '滑环尾部晃动幅度较大',
              processingMethods: '检查滑环；',
              techControl: '',
              remark: '',
              createTime: '2021-10-20 09:24:43',
              children: [
                {
                  id: 18029,
                  model: 'MY1.5',
                  nodeId: '02_04_002-4-1',
                  rootNodeId: '02_04_002',
                  nodeParentid: '02_04_002-4',
                  nodeType: '3',
                  nodeName: '滑环安装异常',
                  nodeDesc: '滑环未安装好，导致滑环尾部尾摆严重。',
                  faultReasonPr: 50,
                  color: '#CB2E03',
                  judgeMethods: '查看滑环安装是否满足车间工艺指导书要求。',
                  processingMethods: '按工艺指导书文件要求的工艺调整滑环的安装',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-20 09:24:43',
                  children: []
                },
                {
                  id: 18030,
                  model: 'MY1.5',
                  nodeId: '02_04_002-4-2',
                  rootNodeId: '02_04_002',
                  nodeParentid: '02_04_002-4',
                  nodeType: '3',
                  nodeName: '滑环内部轴承损坏',
                  nodeDesc: '滑环内部轴承损坏，导致滑环尾部尾摆严重。',
                  faultReasonPr: 50,
                  color: '#CB2E03',
                  judgeMethods: '观察滑环转动是是否存在尾摆及轴承异响等情况。',
                  processingMethods: '更换滑环。',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-20 09:24:43',
                  children: []
                }
              ]
            },
            {
              id: 18019,
              model: 'MY1.5',
              nodeId: '02_04_002-2',
              rootNodeId: '02_04_002',
              nodeParentid: '02_04_002',
              nodeType: '2',
              nodeName: '联轴器打滑',
              nodeDesc: '联轴器打滑',
              faultReasonPr: 18,
              color: '#4963FE',
              judgeMethods: '查看联轴器是否打滑',
              processingMethods: '检查联轴器是否打滑；',
              techControl: '',
              remark: '',
              createTime: '2021-10-20 09:24:43',
              children: [
                {
                  id: 18022,
                  model: 'MY1.5',
                  nodeId: '02_04_002-2-3',
                  rootNodeId: '02_04_002',
                  nodeParentid: '02_04_002-2',
                  nodeType: '3',
                  nodeName: '联轴器连杆弹性体损坏',
                  nodeDesc: '联轴器连杆弹性体损坏',
                  faultReasonPr: 41,
                  color: '#CB2E03',
                  judgeMethods: '弹性体大量掉粉碎裂，或严重老化开裂鼓包',
                  processingMethods: '更换连杆',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-20 09:24:43',
                  children: []
                },
                {
                  id: 18020,
                  model: 'MY1.5',
                  nodeId: '02_04_002-2-1',
                  rootNodeId: '02_04_002',
                  nodeParentid: '02_04_002-2',
                  nodeType: '3',
                  nodeName: '联轴器打滑',
                  nodeDesc: '由于联轴器打滑导致机组发电机转速与叶轮转速无法正常同步。',
                  faultReasonPr: 30,
                  color: '#CB2E03',
                  judgeMethods: '联轴器摩擦片融化从力矩限制器缝隙处甩出，可见文件M0000007065',
                  processingMethods: '更换联轴器',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-20 09:24:43',
                  children: []
                },
                {
                  id: 18021,
                  model: 'MY1.5',
                  nodeId: '02_04_002-2-2',
                  rootNodeId: '02_04_002',
                  nodeParentid: '02_04_002-2',
                  nodeType: '3',
                  nodeName: '联轴器结构件开焊或断裂',
                  nodeDesc: '由于联轴器开焊断裂导致机组发电机转速与叶轮转速无法正常同步。',
                  faultReasonPr: 29,
                  color: '#DB8202',
                  judgeMethods: '联轴器力矩限制器结构件开焊损坏，脱开',
                  processingMethods: '更换联轴器',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-20 09:24:43',
                  children: []
                }
              ]
            },
            {
              id: 18017,
              model: 'MY1.5',
              nodeId: '02_04_002-1',
              rootNodeId: '02_04_002',
              nodeParentid: '02_04_002',
              nodeType: '2',
              nodeName: '主轴真实超速',
              nodeDesc: '主轴真实超速',
              faultReasonPr: 10,
              color: '#4963FE',
              judgeMethods: '查看机组tracelog数据，若发电机转速超过1900rpm，且机组报出主轴超速故障，说明主轴真实超速。',
              processingMethods: '反馈至公司相关部门',
              techControl: '',
              remark: '',
              createTime: '2021-10-20 09:24:43',
              children: [
                {
                  id: 18018,
                  model: 'MY1.5',
                  nodeId: '02_04_002-1-1',
                  rootNodeId: '02_04_002',
                  nodeParentid: '02_04_002-1',
                  nodeType: '3',
                  nodeName: '主轴真实超速',
                  nodeDesc: '主轴真实超速',
                  faultReasonPr: 100,
                  color: '#CB2E03',
                  judgeMethods:
                    '查看机组tracelog数据，若发电机转速超过1900rpm，且机组报出主轴超速故障，说明主轴真实超速。',
                  processingMethods: '反馈至公司相关部门',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-20 09:24:43',
                  children: []
                }
              ]
            },
            {
              id: 18031,
              model: 'MY1.5',
              nodeId: '02_04_002-5',
              rootNodeId: '02_04_002',
              nodeParentid: '02_04_002',
              nodeType: '3',
              nodeName: '其他',
              nodeDesc: null,
              faultReasonPr: 2,
              color: '#2CBFF5',
              judgeMethods: null,
              processingMethods: null,
              techControl: null,
              remark: null,
              createTime: '2021-10-20 09:24:43',
              children: []
            }
          ]
        },
        {
          id: 18054,
          model: 'MY1.5',
          nodeId: '01_05_004',
          rootNodeId: '01_05_004',
          nodeParentid: '',
          nodeType: '1',
          nodeName: '桨叶同步故障等级2',
          nodeDesc: '非自检模式12时，刹车模式≤50时，3个桨叶角度最大与最小差值>2度，24小时内允许出现2次',
          faultReasonPr: 0,
          color: '#2CBFF5',
          judgeMethods: '机组刹车模式小于等于50时，Y轴方向振动信号滤波值标准方差>0.8。',
          processingMethods: '1、分析振动曲线；2、检查传感器；3、检查偏航系统。',
          techControl: null,
          remark: '1、调试电脑',
          createTime: '2021-10-21 16:54:00',
          children: [
            {
              id: 18061,
              model: 'MY1.5',
              nodeId: '01_05_004-1',
              rootNodeId: '01_05_004',
              nodeParentid: '01_05_004',
              nodeType: '2',
              nodeName: '桨叶同步问题',
              nodeDesc: '桨叶不同步，三个叶片受力不均导致振动超限',
              faultReasonPr: 41,
              color: '#CB2E03',
              judgeMethods: '"1、单个桨叶对零出现问题；2、三个桨叶不同步"',
              processingMethods: '1、桨叶重新校对；2、分析不同步原因并处理',
              techControl: null,
              remark: '',
              createTime: '2021-10-21 17:05:30',
              children: [
                {
                  id: 18062,
                  model: 'MY1.5',
                  nodeId: '01_05_004-1-1',
                  rootNodeId: '01_05_004',
                  nodeParentid: '01_05_004-1',
                  nodeType: '3',
                  nodeName: '桨叶对零出现问题',
                  nodeDesc: '桨叶对零不准确导致三个叶片受力不均',
                  faultReasonPr: 50,
                  color: '#CB2E03',
                  judgeMethods:
                    'OAT变桨手动模式下，PMM旋钮选择位置3，按下quit按钮，使变桨电机自动停止变桨后，检查0度指针和叶片标尺0度位置是否重合，若误差大于3mm以上，说明对零不准确\r\n',
                  processingMethods: '桨叶重新对零',
                  techControl: null,
                  remark: '',
                  createTime: '2021-10-21 17:05:30',
                  children: []
                },
                {
                  id: 18066,
                  model: 'MY1.5',
                  nodeId: '01_05_004-1-2',
                  rootNodeId: '01_05_004',
                  nodeParentid: '01_05_004-1',
                  nodeType: '3',
                  nodeName: '三个桨叶不同步',
                  nodeDesc: '运行过程中，三个桨叶角度位置不同步',
                  faultReasonPr: 50,
                  color: '#CB2E03',
                  judgeMethods:
                    '1、检查三个PMC参数6091.1、6091.2、6891.1不一致；3、可通过tracelog数据分析，一般伴随同步误差大故障报出',
                  processingMethods: '1、更新变桨PMC参数；2、按照变桨同步故障处理',
                  techControl: null,
                  remark: '',
                  createTime: '2021-10-21 17:05:30',
                  children: []
                }
              ]
            },
            {
              id: 18064,
              model: 'MY1.5',
              nodeId: '01_05_004-3',
              rootNodeId: '01_05_004',
              nodeParentid: '01_05_004',
              nodeType: '2',
              nodeName: '编码器故障',
              nodeDesc: '1、编码器损坏；',
              faultReasonPr: 24,
              color: '#DB8202',
              judgeMethods: '1、通过对调其他编码器来判断2、紧固编码器固定螺栓',
              processingMethods: '1、通过对调其他编码器来判断2、紧固编码器固定螺栓',
              techControl: null,
              remark: '',
              createTime: '2021-10-21 17:05:30',
              children: [
                {
                  id: 18055,
                  model: 'MY1.5',
                  nodeId: '01_05_004-3-1',
                  rootNodeId: '01_05_004',
                  nodeParentid: '01_05_004-3',
                  nodeType: '3',
                  nodeName: '电机编码器松动',
                  nodeDesc: '位于电机尾部的编码器安装不牢靠，螺栓未紧固。',
                  faultReasonPr: 52,
                  color: '#CB2E03',
                  judgeMethods: '紧固检查电机编码器固定螺栓、编码器锁紧螺栓是否松动',
                  processingMethods: '重新固定编码器',
                  techControl: null,
                  remark: '1、万用表；2、小一字；',
                  createTime: '2021-10-21 17:05:30',
                  children: []
                },
                {
                  id: 18056,
                  model: 'MY1.5',
                  nodeId: '01_05_004-3-2',
                  rootNodeId: '01_05_004',
                  nodeParentid: '01_05_004-3',
                  nodeType: '3',
                  nodeName: '电机编码器损坏',
                  nodeDesc: '位于电机尾部的编码器损坏',
                  faultReasonPr: 48,
                  color: '#CB2E03',
                  judgeMethods: '更换新编码器故障消除后说明编码器损坏',
                  processingMethods: '更换电机侧编码器',
                  techControl: null,
                  remark: '1、万用表；2、小一字；',
                  createTime: '2021-10-21 17:05:30',
                  children: []
                }
              ]
            },
            {
              id: 18059,
              model: 'MY1.5',
              nodeId: '01_05_004-5',
              rootNodeId: '01_05_004',
              nodeParentid: '01_05_004',
              nodeType: '2',
              nodeName: 'PMC内部故障',
              nodeDesc: 'PMC损坏',
              faultReasonPr: 16,
              color: '#4963FE',
              judgeMethods: '测量PMC模块的X8端子Uz﹢、Uz-（PMC直流母线电压输入）之间的电压，正常应为560VDC',
              processingMethods: '更换PMC模块',
              techControl: null,
              remark: '',
              createTime: '2021-10-21 17:05:30',
              children: [
                {
                  id: 18060,
                  model: 'MY1.5',
                  nodeId: '01_05_004-5-1',
                  rootNodeId: '01_05_004',
                  nodeParentid: '01_05_004-5',
                  nodeType: '3',
                  nodeName: 'PMC内部故障',
                  nodeDesc: 'PMC损坏',
                  faultReasonPr: 100,
                  color: '#CB2E03',
                  judgeMethods: '测量PMC模块的X8（PMC直流母线电压输入端子）Uz﹢、Uz-之间的电压，正常应为560VDC',
                  processingMethods: '更换PMC模块（变桨系统桨叶控制单元）',
                  techControl: null,
                  remark: '',
                  createTime: '2021-10-21 17:05:30',
                  children: []
                }
              ]
            },
            {
              id: 18065,
              model: 'MY1.5',
              nodeId: '01_05_004-2',
              rootNodeId: '01_05_004',
              nodeParentid: '01_05_004',
              nodeType: '2',
              nodeName: '插头或接线松动',
              nodeDesc: '由于插头或接线松动，触发此故障。',
              faultReasonPr: 8,
              color: '#2CBFF5',
              judgeMethods: '由于插头或接线松动，触发此故障。',
              processingMethods: '紧固编码器插头，检查并紧固编码器接线',
              techControl: null,
              remark: '',
              createTime: '2021-10-21 17:05:30',
              children: [
                {
                  id: 18063,
                  model: 'MY1.5',
                  nodeId: '01_05_004-2-1',
                  rootNodeId: '01_05_004',
                  nodeParentid: '01_05_004-2',
                  nodeType: '3',
                  nodeName: '插头或接线松动',
                  nodeDesc: '由于插头或接线松动，触发此故障。',
                  faultReasonPr: 100,
                  color: '#CB2E03',
                  judgeMethods: '由于插头或接线松动，触发此故障。',
                  processingMethods: '紧固编码器插头，检查并紧固编码器接线',
                  techControl: null,
                  remark: '',
                  createTime: '2021-10-21 17:05:30',
                  children: []
                }
              ]
            },
            {
              id: 18057,
              model: 'MY1.5',
              nodeId: '01_05_004-4',
              rootNodeId: '01_05_004',
              nodeParentid: '01_05_004',
              nodeType: '2',
              nodeName: '95°限位开关误触发',
              nodeDesc: '95°限位开关误触发',
              faultReasonPr: 5,
              color: '#2CBFF5',
              judgeMethods: '检查95°限位开关是否被异物卡住',
              processingMethods: '清理轮毂内部垃圾和杂物',
              techControl: null,
              remark: '',
              createTime: '2021-10-21 17:05:30',
              children: [
                {
                  id: 18058,
                  model: 'MY1.5',
                  nodeId: '01_05_004-4-1',
                  rootNodeId: '01_05_004',
                  nodeParentid: '01_05_004-4',
                  nodeType: '3',
                  nodeName: '95°限位开关误触发',
                  nodeDesc: '95°限位开关误触发',
                  faultReasonPr: 100,
                  color: '#CB2E03',
                  judgeMethods: '检查发现是否有异物卡住限位开关，或轮毂内存在垃圾杂物导致限位开关误触发',
                  processingMethods: '清理轮毂内部垃圾和杂物',
                  techControl: null,
                  remark: '',
                  createTime: '2021-10-21 17:05:30',
                  children: []
                }
              ]
            },
            {
              id: 18067,
              model: 'MY1.5',
              nodeId: '01_05_004-6',
              rootNodeId: '01_05_004',
              nodeParentid: '01_05_004',
              nodeType: '3',
              nodeName: '其他',
              nodeDesc: null,
              faultReasonPr: 5,
              color: '#2CBFF5',
              judgeMethods: null,
              processingMethods: null,
              techControl: null,
              remark: null,
              createTime: '2021-10-21 17:05:30',
              children: []
            }
          ]
        },
        {
          id: 18068,
          model: 'MY1.5',
          nodeId: '02_04_003',
          rootNodeId: '02_04_003',
          nodeParentid: '',
          nodeType: '1',
          nodeName: '发电机超速等级1',
          nodeDesc: '发电机编码器转速>1965rpm，1小时内允许出现3次',
          faultReasonPr: 0,
          color: '#2CBFF5',
          judgeMethods: '发电机编码器转速>1965rpm，1小时内允许出现3次',
          processingMethods:
            'A、硬超速、调节风机Kp参数、变桨系统相关参数，修改功率曲线及控制策略以适合当地风况。B、软超速、1、检查发电机转速曲线是否由于电磁干扰而有毛刺，对编码器与发电机外壳好做绝缘处理，将发电机编码器至变频器的线路中盘绕处尽量解开，避免形成涡流磁场；2、检查校正发电机编码器接线，做好屏蔽处理；3、更换发电机编码器。',
          techControl: '无',
          remark: '',
          createTime: '2021-10-22 09:58:31',
          children: [
            {
              id: 18069,
              model: 'MY1.5',
              nodeId: '02_04_003-1',
              rootNodeId: '02_04_003',
              nodeParentid: '02_04_003',
              nodeType: '2',
              nodeName: '发电机转速检测回路异常',
              nodeDesc: '发电机转速检测回路虚接、短路或元器件损坏',
              faultReasonPr: 71,
              color: '#CB2E03',
              judgeMethods:
                '查看主控小软件的趋势图，确认发电机转速是否接近主轴转速乘以齿轮箱变比或确认变频器测发电机转速与主控测发电机转速是否接近。',
              processingMethods: '1、检查发电机编码器检测线路以及接线情况；2、检查编码器；3、检查CD盒；4、检查4U机箱；',
              techControl: '',
              remark: '1、小一字；2、万用表；',
              createTime: '2021-10-22 10:43:19',
              children: [
                {
                  id: 18070,
                  model: 'MY1.5',
                  nodeId: '02_04_003-1-1',
                  rootNodeId: '02_04_003',
                  nodeParentid: '02_04_003-1',
                  nodeType: '3',
                  nodeName: '发电机编码器检测回路异常（发电机编码器安装松动）',
                  nodeDesc: '发电机编码器安装松动',
                  faultReasonPr: 26,
                  color: '#DB8202',
                  judgeMethods: '检查编码器码盘与发电机转轴之间固定以及发电机编码器外壳与发电机外壳固定是否牢固；',
                  processingMethods: '重新安装；',
                  techControl: '',
                  remark: '1、小一字螺丝刀；2、万用表；3、内六角；4、13开口扳手；',
                  createTime: '2021-10-22 10:43:19',
                  children: []
                },
                {
                  id: 18072,
                  model: 'MY1.5',
                  nodeId: '02_04_003-1-3',
                  rootNodeId: '02_04_003',
                  nodeParentid: '02_04_003-1',
                  nodeType: '3',
                  nodeName: '发电机编码器检测回路异常（发电机编码器屏蔽不良）',
                  nodeDesc: '发电机编码器屏蔽线接线不规范',
                  faultReasonPr: 26,
                  color: '#DB8202',
                  judgeMethods: '检查变频器处编码器线缆屏蔽线接线是否规范；',
                  processingMethods:
                    '将编码器线缆每组双绞线与总的屏蔽线均可靠接地，按照《MF.W16.440.001-MY2.0MW风力发电机组现场安装手册》规范接线；',
                  techControl: '',
                  remark: '1、小一字螺丝刀；2、万用表；3、内六角；4、13开口扳手；',
                  createTime: '2021-10-22 10:43:19',
                  children: []
                },
                {
                  id: 18073,
                  model: 'MY1.5',
                  nodeId: '02_04_003-1-4',
                  rootNodeId: '02_04_003',
                  nodeParentid: '02_04_003-1',
                  nodeType: '3',
                  nodeName: '发电机编码器检测回路异常（发电机编码器损坏）',
                  nodeDesc: '发电机编码器损坏',
                  faultReasonPr: 26,
                  color: '#DB8202',
                  judgeMethods: '对调正常编码器后故障消除说明编码器异常；',
                  processingMethods: '更换编码器。',
                  techControl: '',
                  remark: '1、小一字螺丝刀；2、万用表；3、内六角；4、13开口扳手；',
                  createTime: '2021-10-22 10:43:19',
                  children: []
                },
                {
                  id: 18071,
                  model: 'MY1.5',
                  nodeId: '02_04_003-1-2',
                  rootNodeId: '02_04_003',
                  nodeParentid: '02_04_003-1',
                  nodeType: '3',
                  nodeName: '发电机编码器检测回路异常（发电机编码器接线松动）',
                  nodeDesc: '发电机编码器接线松动',
                  faultReasonPr: 21,
                  color: '#DB8202',
                  judgeMethods:
                    '检查编码器端子上线缆是否有松动，检查发电机编码器1、1-、2、2-、0、0-、+E、0V（linde编码器）或S1、S1-、S2、S2-、S0、S0-、+E、0V(Baumer编码器）到变频器Z6发电机编码器端子的1、2、3、4、5、6、7、8脚之间的接线是否对应导通，如有断路、线间短路、线缆破损说明信号电缆异常；',
                  processingMethods: '紧固接线；',
                  techControl: '',
                  remark: '1、小一字螺丝刀；2、万用表；3、内六角；4、13开口扳手；',
                  createTime: '2021-10-22 10:43:19',
                  children: []
                }
              ]
            },
            {
              id: 18077,
              model: 'MY1.5',
              nodeId: '02_04_003-3',
              rootNodeId: '02_04_003',
              nodeParentid: '02_04_003',
              nodeType: '3',
              nodeName: '其他',
              nodeDesc: null,
              faultReasonPr: 19,
              color: '#4963FE',
              judgeMethods: null,
              processingMethods: null,
              techControl: null,
              remark: null,
              createTime: '2021-10-22 10:43:19',
              children: []
            },
            {
              id: 18074,
              model: 'MY1.5',
              nodeId: '02_04_003-2',
              rootNodeId: '02_04_003',
              nodeParentid: '02_04_003',
              nodeType: '2',
              nodeName: '环境因素',
              nodeDesc: '环境或其他特殊情况导致发电机超速',
              faultReasonPr: 10,
              color: '#4963FE',
              judgeMethods: '机组运行是遇到特殊天气原因或地形原因',
              processingMethods: '排查具体故障',
              techControl: '',
              remark: '',
              createTime: '2021-10-22 10:43:19',
              children: [
                {
                  id: 18075,
                  model: 'MY1.5',
                  nodeId: '02_04_003-2-1',
                  rootNodeId: '02_04_003',
                  nodeParentid: '02_04_003-2',
                  nodeType: '3',
                  nodeName: '风速过大且波动大',
                  nodeDesc: '风速波动过大导致致发电机超速',
                  faultReasonPr: 100,
                  color: '#CB2E03',
                  judgeMethods:
                    '查看风速数据，确认风速短时间变化巨大。当前功率与理论功率偏差巨大。且X向振动正常，Y向振动较大。',
                  processingMethods: '确认风机无其他硬件问题后，复位启机。',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-22 10:51:29',
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 18078,
          model: 'MY1.5',
          nodeId: '01_05_068',
          rootNodeId: '01_05_068',
          nodeParentid: '',
          nodeType: '1',
          nodeName: '桨叶设定值与实际值偏差大等级4',
          nodeDesc: '桨叶设定故障等级4（1秒平均值）',
          faultReasonPr: 0,
          color: '#2CBFF5',
          judgeMethods:
            '3个桨叶任一桨叶出现1秒的平均值与系统设定值差值>5度就出现此故障（只有在刹车模式50、51或者100下才进行此故障，而且15秒内系统的运行模式没有出现变化）。',
          processingMethods: '检查机舱柜至轮毂的硬接线（主要是EFC）是否连接可靠。',
          techControl: '无',
          remark: '',
          createTime: '2021-10-22 16:11:07',
          children: [
            {
              id: 18082,
              model: 'MY1.5',
              nodeId: '01_05_068-2',
              rootNodeId: '01_05_068',
              nodeParentid: '01_05_068',
              nodeType: '2',
              nodeName: '滑环异常',
              nodeDesc: '滑环异常',
              faultReasonPr: 44,
              color: '#CB2E03',
              judgeMethods: '滑环尾部晃动幅度较大',
              processingMethods: '检查滑环；',
              techControl: '',
              remark: '',
              createTime: '2021-10-22 16:19:56',
              children: [
                {
                  id: 18083,
                  model: 'MY1.5',
                  nodeId: '01_05_068-2-1',
                  rootNodeId: '01_05_068',
                  nodeParentid: '01_05_068-2',
                  nodeType: '3',
                  nodeName: '滑环异常',
                  nodeDesc: '滑环内部X1端子的10、11引脚滑道通讯不良，引起闪断',
                  faultReasonPr: 42,
                  color: '#CB2E03',
                  judgeMethods: '清洗滑环，如清洗后故障不再复现，则判断为滑环通道闪断',
                  processingMethods: '清洗滑环',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-22 16:19:56',
                  children: []
                },
                {
                  id: 18087,
                  model: 'MY1.5',
                  nodeId: '01_05_068-2-2',
                  rootNodeId: '01_05_068',
                  nodeParentid: '01_05_068-2',
                  nodeType: '3',
                  nodeName: '滑环内部轴承损坏',
                  nodeDesc: '滑环内部轴承损坏，导致滑环尾部尾摆严重。',
                  faultReasonPr: 32,
                  color: '#CB2E03',
                  judgeMethods: '观察滑环转动是是否存在尾摆及轴承异响等情况。',
                  processingMethods: '更换滑环。',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-22 16:19:56',
                  children: []
                },
                {
                  id: 18088,
                  model: 'MY1.5',
                  nodeId: '01_05_068-2-3',
                  rootNodeId: '01_05_068',
                  nodeParentid: '01_05_068-2',
                  nodeType: '3',
                  nodeName: '滑环内部刷针断裂',
                  nodeDesc: '滑环异常',
                  faultReasonPr: 26,
                  color: '#DB8202',
                  judgeMethods: '拆开滑环，检查滑环内部刷针是否断裂',
                  processingMethods: '更换滑环',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-22 16:19:56',
                  children: []
                }
              ]
            },
            {
              id: 18079,
              model: 'MY1.5',
              nodeId: '01_05_068-1',
              rootNodeId: '01_05_068',
              nodeParentid: '01_05_068',
              nodeType: '2',
              nodeName: '编码器信号回路接线异常',
              nodeDesc: '接线松动或损坏导致读数出现偏差',
              faultReasonPr: 35,
              color: '#CB2E03',
              judgeMethods:
                '1、拧紧A编码器（电机编码器）与电缆连接插头；2、用手轻拽线路接线端子PMC的X3、X5端子，判断接线端子是否存在松动；3、用万用表对线；',
              processingMethods: '1、紧固桨叶编码器接线；2、更换桨叶编码器接线。',
              techControl: '',
              remark: '',
              createTime: '2021-10-22 16:19:56',
              children: [
                {
                  id: 18080,
                  model: 'MY1.5',
                  nodeId: '01_05_068-1-1',
                  rootNodeId: '01_05_068',
                  nodeParentid: '01_05_068-1',
                  nodeType: '3',
                  nodeName: '编码器信号回路异常',
                  nodeDesc: 'PMM模块至编码器之间接线松动或断开导致信号传输异常',
                  faultReasonPr: 41,
                  color: '#CB2E03',
                  judgeMethods:
                    '1、检查X5接线端子（电机编码器数据读取接线端子）是否松动；2、检查编码器接线是否一一导通。',
                  processingMethods: '1、重进紧固编码器接插件2、更换编码器线缆',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-22 16:19:56',
                  children: []
                },
                {
                  id: 18081,
                  model: 'MY1.5',
                  nodeId: '01_05_068-1-3',
                  rootNodeId: '01_05_068',
                  nodeParentid: '01_05_068-1',
                  nodeType: '3',
                  nodeName: '电机编码器损坏',
                  nodeDesc: '编码器损坏造成桨叶度数偏差大于设定值',
                  faultReasonPr: 32,
                  color: '#CB2E03',
                  judgeMethods: '用tracelog数据查看编码器读数是否有异常跳变情况',
                  processingMethods: '更换电机编码器',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-22 16:19:56',
                  children: []
                },
                {
                  id: 18086,
                  model: 'MY1.5',
                  nodeId: '01_05_068-1-2',
                  rootNodeId: '01_05_068',
                  nodeParentid: '01_05_068-1',
                  nodeType: '3',
                  nodeName: '桨叶编码器损坏',
                  nodeDesc: '桨叶编码器损坏',
                  faultReasonPr: 27,
                  color: '#DB8202',
                  judgeMethods: '通过对机组数据录播或者tracelog数据分析判断变桨角度是否存在异常',
                  processingMethods: '更换编码器；',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-22 16:19:56',
                  children: []
                }
              ]
            },
            {
              id: 18091,
              model: 'MY1.5',
              nodeId: '01_05_068-5',
              rootNodeId: '01_05_068',
              nodeParentid: '01_05_068',
              nodeType: '3',
              nodeName: '其他',
              nodeDesc: null,
              faultReasonPr: 10,
              color: '#4963FE',
              judgeMethods: null,
              processingMethods: null,
              techControl: null,
              remark: null,
              createTime: '2021-10-22 16:19:56',
              children: []
            },
            {
              id: 18089,
              model: 'MY1.5',
              nodeId: '01_05_068-3',
              rootNodeId: '01_05_068',
              nodeParentid: '01_05_068',
              nodeType: '2',
              nodeName: '桨叶91°或95°限位开关误触发',
              nodeDesc: '桨叶91°或95°限位开关误触发',
              faultReasonPr: 8,
              color: '#2CBFF5',
              judgeMethods: '桨叶91°或95°限位开关是否被异物卡住',
              processingMethods: '清理轮毂内部垃圾和杂物',
              techControl: '',
              remark: '',
              createTime: '2021-10-22 16:19:56',
              children: [
                {
                  id: 18090,
                  model: 'MY1.5',
                  nodeId: '01_05_068-3-1',
                  rootNodeId: '01_05_068',
                  nodeParentid: '01_05_068-3',
                  nodeType: '3',
                  nodeName: '桨叶91°或95°限位开关误触发',
                  nodeDesc: '桨叶91°或95°限位开关误触发',
                  faultReasonPr: 100,
                  color: '#CB2E03',
                  judgeMethods: '检查发现是否有异物卡住限位开关，或轮毂内存在垃圾杂物导致限位开关误触发',
                  processingMethods: '清理轮毂内部垃圾和杂物',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-22 16:19:56',
                  children: []
                }
              ]
            },
            {
              id: 18084,
              model: 'MY1.5',
              nodeId: '01_05_068-4',
              rootNodeId: '01_05_068',
              nodeParentid: '01_05_068',
              nodeType: '2',
              nodeName: 'PMC内部故障',
              nodeDesc: 'PMC损坏',
              faultReasonPr: 3,
              color: '#2CBFF5',
              judgeMethods: '测量PMC模块的X8端子Uz﹢、Uz-（PMC直流母线电压输入）之间的电压，正常应为560VDC',
              processingMethods: '更换PMC模块',
              techControl: '',
              remark: '',
              createTime: '2021-10-22 16:19:56',
              children: [
                {
                  id: 18085,
                  model: 'MY1.5',
                  nodeId: '01_05_068-4-1',
                  rootNodeId: '01_05_068',
                  nodeParentid: '01_05_068-4',
                  nodeType: '3',
                  nodeName: 'PMC内部故障',
                  nodeDesc: 'PMC损坏',
                  faultReasonPr: 100,
                  color: '#CB2E03',
                  judgeMethods: '测量PMC模块的X8（PMC直流母线电压输入端子）Uz﹢、Uz-之间的电压，正常应为560VDC',
                  processingMethods: '更换PMC模块（变桨系统桨叶控制单元）',
                  techControl: '',
                  remark: '',
                  createTime: '2021-10-22 16:19:56',
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 18092,
          model: 'MY1.5',
          nodeId: '02_02_049',
          rootNodeId: '02_02_049',
          nodeParentid: '',
          nodeType: '1',
          nodeName: '机舱柜偏航电机4热继电器230Q7保护动作',
          nodeDesc: '机舱柜偏航电机4热继电器230Q7保护动作',
          faultReasonPr: 0,
          color: '#2CBFF5',
          judgeMethods: null,
          processingMethods: null,
          techControl: null,
          remark: null,
          createTime: '2023-04-21 14:46:09',
          children: [
            {
              id: 18103,
              model: 'MY1.5',
              nodeId: '02_02_049-2',
              rootNodeId: '02_02_049',
              nodeParentid: '02_02_049',
              nodeType: '2',
              nodeName: '电磁抱闸功能异常',
              nodeDesc: '电磁抱闸功能异常',
              faultReasonPr: 20,
              color: '#DB8202',
              judgeMethods: '手动变桨，对比三个桨叶变桨电磁抱闸声音是否一致，与其他桨叶有明显差异说明电磁抱闸异常',
              processingMethods: '更换电磁抱闸',
              techControl: null,
              remark: null,
              createTime: '2021-10-25 18:41:11',
              children: [
                {
                  id: 18101,
                  model: 'MY1.5',
                  nodeId: '02_02_049-2-2',
                  rootNodeId: '02_02_049',
                  nodeParentid: '02_02_049-2',
                  nodeType: '3',
                  nodeName: '偏航驱动电磁抱闸磨损',
                  nodeDesc: '电磁抱闸被磨损，制动能力降低',
                  faultReasonPr: 50,
                  color: '#CB2E03',
                  judgeMethods: '拆开偏航电机端盖，测量电磁抱闸间隙，如果间隙大于正常范围（不同品牌间隙范围不同）',
                  processingMethods: '更换电磁抱闸或电磁抱闸摩擦片',
                  techControl: null,
                  remark: null,
                  createTime: '2021-10-25 18:41:11',
                  children: []
                },
                {
                  id: 18102,
                  model: 'MY1.5',
                  nodeId: '02_02_049-2-1',
                  rootNodeId: '02_02_049',
                  nodeParentid: '02_02_049-2',
                  nodeType: '3',
                  nodeName: '电磁抱闸线圈异常',
                  nodeDesc: '电磁抱闸线圈异常',
                  faultReasonPr: 50,
                  color: '#CB2E03',
                  judgeMethods: '对比测量三个变桨电机电磁抱闸线圈电阻，若阻值差异较大，说明电磁抱闸损坏',
                  processingMethods: '更换电磁抱闸',
                  techControl: null,
                  remark: null,
                  createTime: '2021-10-25 18:41:11',
                  children: []
                }
              ]
            },
            {
              id: 18098,
              model: 'MY1.5',
              nodeId: '02_02_049-3',
              rootNodeId: '02_02_049',
              nodeParentid: '02_02_049',
              nodeType: '2',
              nodeName: '接触器故障',
              nodeDesc: '接触器故障',
              faultReasonPr: 13,
              color: '#4963FE',
              judgeMethods: '冷却风扇接触器反馈触点断路',
              processingMethods: '更换接触器',
              techControl: null,
              remark: null,
              createTime: '2021-10-25 18:41:11',
              children: [
                {
                  id: 18100,
                  model: 'MY1.5',
                  nodeId: '02_02_049-3-2',
                  rootNodeId: '02_02_049',
                  nodeParentid: '02_02_049-3',
                  nodeType: '3',
                  nodeName: '接触器损坏',
                  nodeDesc: '变桨K1接触器损坏',
                  faultReasonPr: 71,
                  color: '#CB2E03',
                  judgeMethods:
                    '在接触器吸合的条件下，测量K1接触器上端进线相间400V电压在315~460V之间，但下端相间电压不在该范围内',
                  processingMethods: '更换K1接触器',
                  techControl: null,
                  remark: null,
                  createTime: '2021-10-25 18:41:11',
                  children: []
                },
                {
                  id: 18099,
                  model: 'MY1.5',
                  nodeId: '02_02_049-3-1',
                  rootNodeId: '02_02_049',
                  nodeParentid: '02_02_049-3',
                  nodeType: '3',
                  nodeName: '接触器未吸合',
                  nodeDesc: '电磁抱闸供电接触器未吸合',
                  faultReasonPr: 29,
                  color: '#DB8202',
                  judgeMethods: '接触器无动作',
                  processingMethods: '更换接触器',
                  techControl: null,
                  remark: null,
                  createTime: '2021-10-25 18:41:11',
                  children: []
                }
              ]
            },
            {
              id: 18104,
              model: 'MY1.5',
              nodeId: '02_02_049-4',
              rootNodeId: '02_02_049',
              nodeParentid: '02_02_049',
              nodeType: '3',
              nodeName: '其他',
              nodeDesc: null,
              faultReasonPr: 6,
              color: '#2CBFF5',
              judgeMethods: null,
              processingMethods: null,
              techControl: null,
              remark: null,
              createTime: '2023-04-21 16:35:59',
              children: []
            }
          ]
        },
        {
          id: 18105,
          model: 'MY1.5',
          nodeId: '03_01_002',
          rootNodeId: '03_01_002',
          nodeParentid: '',
          nodeType: '1',
          nodeName: '安全链断开',
          nodeDesc: '安全继电器安全链断开信号触发',
          faultReasonPr: 0,
          color: '#2CBFF5',
          judgeMethods:
            'PLC检测到用于监测程序运行状态的信号断开，常闭开关断开，则输出至主控的24V信号断开，安全继电器机舱PLC安全链断开，触发PLC断开安全链故障。',
          processingMethods: '根据故障记录和实地检查确认具体原因',
          techControl: '',
          remark: '',
          createTime: '2021-10-26 10:29:40',
          children: [
            {
              id: 18110,
              model: 'MY1.5',
              nodeId: '03_01_002-5',
              rootNodeId: '03_01_002',
              nodeParentid: '03_01_002',
              nodeType: '3',
              nodeName: 'DI模块或其底座问题',
              nodeDesc: '检测安全链正常信号正常的DI模块或其底座故障',
              faultReasonPr: 27,
              color: '#DB8202',
              judgeMethods: '在安全链DI模块处可以检测到安全链正常信号的24V信号，但是主控程序仍然触发着“安全链断开”故障',
              processingMethods: '更换故障的DI模块或其底座',
              techControl: '',
              remark: '',
              createTime: '2023-05-16 11:15:02',
              children: []
            },
            {
              id: 18111,
              model: 'MY1.5',
              nodeId: '03_01_002-6',
              rootNodeId: '03_01_002',
              nodeParentid: '03_01_002',
              nodeType: '3',
              nodeName: '安全链至DI模块线路问题',
              nodeDesc: '安全链模块至DI模块线路问题导致安全链DI模块处未能检测到安全链正常信号的24V信号',
              faultReasonPr: 27,
              color: '#DB8202',
              judgeMethods: '安全链模块有正常输出24V安全链正常信号，但是DI模块处无24V安全链正常信号。',
              processingMethods: '检查安全链模块至DI模块线路，重新连接断点。',
              techControl: '',
              remark: '',
              createTime: '2021-10-26 10:49:10',
              children: []
            },
            {
              id: 18109,
              model: 'MY1.5',
              nodeId: '03_01_002-4',
              rootNodeId: '03_01_002',
              nodeParentid: '03_01_002',
              nodeType: '3',
              nodeName: '安全链模块故障',
              nodeDesc: '安全链模块本身硬件故障导致安全链无输出。',
              faultReasonPr: 17,
              color: '#4963FE',
              judgeMethods:
                '安全链模块所有输入通道正常导通；复位信号可正常输入；未触发01001-01009、01011、01012故障中任何故障，但是安全链模块仍然无24V输出。',
              processingMethods: '更换安全链模块',
              techControl: '',
              remark: '',
              createTime: '2021-10-26 10:49:10',
              children: []
            },
            {
              id: 18112,
              model: 'MY1.5',
              nodeId: '03_01_002-7',
              rootNodeId: '03_01_002',
              nodeParentid: '03_01_002',
              nodeType: '3',
              nodeName: '其他',
              nodeDesc: '',
              faultReasonPr: 17,
              color: '#4963FE',
              judgeMethods: '',
              processingMethods: '',
              techControl: '',
              remark: '',
              createTime: '2021-10-26 10:51:13',
              children: []
            },
            {
              id: 18108,
              model: 'MY1.5',
              nodeId: '03_01_002-3',
              rootNodeId: '03_01_002',
              nodeParentid: '03_01_002',
              nodeType: '3',
              nodeName: '安全链复位回路问题',
              nodeDesc: '实际触发了01001-01009、01011、01012故障，在故障已经排除后，仍然报出此故障，无法复位。',
              faultReasonPr: 5,
              color: '#2CBFF5',
              judgeMethods:
                '风机实际触发了01001-01009、01011、01012故障，在处理完所有安全链故障后，复位安全链时无法正常复位。实地检查发现复位时安全链复位通道INS无24V输入。',
              processingMethods: '检查24V端子排与安全链模块INS脚的线路，将断点重新连接。',
              techControl: '',
              remark: '',
              createTime: '2021-10-26 10:49:10',
              children: []
            },
            {
              id: 18106,
              model: 'MY1.5',
              nodeId: '03_01_002-1',
              rootNodeId: '03_01_002',
              nodeParentid: '03_01_002',
              nodeType: '3',
              nodeName: '安全链实际断开',
              nodeDesc: '安全链输入通道中有一个或者多个处于断开状态，安全链故障实际触发。',
              faultReasonPr: 3,
              color: '#2CBFF5',
              judgeMethods: '同时触发了其他安全链故障组的故障，如01001-01009、01011、01012故障',
              processingMethods: '参考01001-01009、01011、01012故障的故障树实际处理安全链故障',
              techControl: '',
              remark: '',
              createTime: '2021-10-26 10:49:10',
              children: []
            },
            {
              id: 18107,
              model: 'MY1.5',
              nodeId: '03_01_002-2',
              rootNodeId: '03_01_002',
              nodeParentid: '03_01_002',
              nodeType: '3',
              nodeName: '安全链输入线路问题',
              nodeDesc:
                '实际没有发生包括超速、急停、偏航极限、短路、过功率、PLC安全链信号断开、振动过大等触发安全链的问题，仅为安全链输入通道的线路问题导致报出故障。',
              faultReasonPr: 3,
              color: '#2CBFF5',
              judgeMethods:
                '未触发其他安全链故障组的故障，如01001-01009、01011、01012故障，实际测量各安全链相关的传感器处的开关状态，都是闭合，但是安全链模块的各个IN1、T1中有断开情况。',
              processingMethods: '检查安全链模块的IN1、T1之间接线，将断电重新连接',
              techControl: '',
              remark: '',
              createTime: '2021-10-26 10:49:10',
              children: []
            }
          ]
        },
        {
          id: 18139,
          model: 'MY1.5',
          nodeId: 'N0001',
          rootNodeId: 'N0001',
          nodeParentid: '',
          nodeType: '1',
          nodeName: 'mywind',
          nodeDesc: '轮毂温度超出最大限制设定值',
          faultReasonPr: 0,
          color: '#2CBFF5',
          judgeMethods: '轮毂1分钟平均温度>60℃(＜50℃时自动复位)',
          processingMethods:
            '1、检查轴箱2的PMM(变桨系统电源控制单元）轮毂温度超出最大限制设定参数是否正常\n2、检查轮毂温度传感器是否虚接；\n3、轴箱2的PMM（变桨系统电源控制单元）检测是否正常；\n4、更换温度传感器。',
          techControl: '请参考《XX工艺控制流程说明》第X章第X节',
          remark: '1、小一字螺丝刀；\n2、38件套；\n3、万用表；\n4、电脑',
          createTime: '2023-05-16 15:32:44',
          children: [
            {
              id: 18140,
              model: 'MY1.5',
              nodeId: 'N0001-1',
              rootNodeId: 'N0001',
              nodeParentid: 'N0001',
              nodeType: '2',
              nodeName: 'my-01',
              nodeDesc: '轮毂温度传感器(在中控箱外）B2、测量回路虚接开路或PMM故障导致轮毂温度测量不准确',
              faultReasonPr: 30,
              color: '#CB2E03',
              judgeMethods: '检查轮毂温度测量回路是否存在异常；',
              processingMethods:
                '1、检查温度传感器B2（轮毂温度传感器）;\n2、检查温度测量回路是否虚接或开路：\n3、检查桨叶2PMM（变桨系统电源控制单元）是否异常',
              techControl: '请参考《XX工艺控制流程说明》第X章第X节',
              remark: '1、电脑；\n2、转换卡；',
              createTime: '2023-05-16 15:32:44',
              children: [
                {
                  id: 18141,
                  model: 'MY1.5',
                  nodeId: 'N0001-1-1',
                  rootNodeId: 'N0001',
                  nodeParentid: 'N0001-1',
                  nodeType: '3',
                  nodeName: 'mytest-01-01',
                  nodeDesc: '轮毂温度传感器（在中控箱外）B2',
                  faultReasonPr: 60,
                  color: '#CB2E03',
                  judgeMethods: '用万用表测量轴箱B2（轮毂温度传感器）阻值，应与环境温度相符合',
                  processingMethods: '更换轮毂温度传感器（在中控箱外）B2',
                  techControl: '请参考《XX工艺控制流程说明》第X章第X节',
                  remark: '1、万用表；\n2、小一字；',
                  createTime: '2023-05-16 15:32:44',
                  children: []
                },
                {
                  id: 18142,
                  model: 'MY1.5',
                  nodeId: 'N0001-1-2',
                  rootNodeId: 'N0001',
                  nodeParentid: 'N0001-1',
                  nodeType: '3',
                  nodeName: 'mytest-01-02',
                  nodeDesc: '轮毂温度传感器（在中控箱外）B2传感器线路松动',
                  faultReasonPr: 40,
                  color: '#CB2E03',
                  judgeMethods: '检查轴箱2的PMM模块X15（轮毂温度传感器接线端子）的1脚和2脚接线是否松动',
                  processingMethods: '紧固PMM模块X15（轮毂温度传感器接线端子）的1脚和2脚接线',
                  techControl: '请参考《XX工艺控制流程说明》第X章第X节',
                  remark: '1、万用表；\n2、小一字；',
                  createTime: '2023-05-16 15:32:44',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    async addTree() {
      try {
        let res = await this.$api.health.addTree(this.treeForm)
        if (res.code == 20000) {
          this.treeForm = {}
          this.node = null
          this.getTree()
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        }
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
        console.log(error)
      }
    },
    async delTree(id) {
      return
      try {
        let res = await this.$api.health.delTree({ id: id })
        if (res.code == 20000) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getTree()
        } else {
          this.$message({
            type: 'error',
            message: error
          })
        }
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
        console.log(error)
      }
    },
    async exportTree() {
      return
      try {
        let res = await this.$api.health.exportTree()
        this.download(res, '故障树模板')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-edit-add {
  height: 100%;
  display: flex;
  flex-direction: column;

  .my-breadcrumb {
    height: 50px !important;
    color: #216bc5;
    .back-box {
      width: 100px;
      height: 30px;
      margin-left: 10px;
      text-align: center;
      line-height: 30px;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .back-icon {
      width: 26px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      color: rgba(103, 158, 252, 1);
      font-weight: 500;
      background: rgba(72, 170, 255, 0.1);
      border: 1px solid rgba(72, 170, 255, 0.2);
      border-radius: 13px;
    }
    > span {
      cursor: default;
      &:not(:last-child) {
        cursor: pointer;
        &:hover {
          color: #389fff;
        }
      }
    }
  }
  .select-part {
    height: 50px !important;
    margin-bottom: 0.16rem;
    display: flex;
    justify-content: space-between;
    .flex {
      .select-item {
        display: flex;
        justify-content: start;
        width: 250px;
      }
    }
    .divider {
      height: 100%;
      width: 1px;
      background-color: rgb(146, 147, 151);
      margin: 0 0.2rem;
    }
    .dwonload-tempele {
      background-color: transparent;
      border: 0.01rem solid #2b62ab;
      margin-right: 0.2rem;
    }
    .dwonload-button {
      background-color: transparent;
      border: 0.01rem solid #2b62ab;
    }
  }
  .main-part {
    height: calc(100% - 0.9rem);
    display: flex;
    gap: 20px;
    > div {
      &:first-child {
        width: 30%;
        background-color: rgba(64, 47, 157, 0.32);
        padding: 0.16rem 0;
        > div {
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          > div {
            height: 100%;
          }
        }
      }
      &:last-child {
        flex: 1;
        background-color: transparent;
        // background-color: rgba(54, 127, 190, 0.1);
      }
    }
    .mylabel {
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 0.08rem;
      .handle-box {
        display: flex;
        justify-content: start;
        gap: 10px;
      }
    }
    .tree-form-part {
      display: flex;
      flex-direction: column;
      .my-lable {
        margin: 10px 5px 0;
        height: 25px;
        line-height: 25px;
        color: #ffffff;
        // border-bottom: 1px solid rgba(173, 182, 194, 0.5);
      }
      .treeForm {
        // flex: 1;
        // height: 500px;
        min-height: 350px;
        margin: 10px 10px;
        display: grid;
        grid-template-columns: repeat(2, 48%);
        grid-gap: 10% 5%;
        .el-form-item {
          display: flex;
          justify-content: center;
          align-content: center;
        }
        > div {
          margin-top: 0.2rem;
        }
      }
      .save-part {
        display: flex;
        justify-content: center;
        gap: 10px;
        height: 0.4rem;
        margin-top: 120px;
      }
    }
  }
}
</style>
