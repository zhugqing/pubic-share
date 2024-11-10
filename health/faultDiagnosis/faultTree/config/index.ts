import { reactive } from 'vue'
export let datas = reactive({
  eqmTypeOptions: [],
  eqmTypeOptions2: [],
  runTrendTabList: [
    { label: '严重', value: '1' },
    { label: '一般', value: '2' },
    { label: '提示', value: '3' }
  ],
  cardList: [
    { label: '风速', value: 20, unit: 'm/s' },
    { label: '装机台数', value: 900, unit: '台' },
    { label: '装机容量', value: 150, unit: '万kW' },
    { label: '总有功', value: 55, unit: '万kW' },
    { label: '出力率', value: 15, unit: '%' },
    { label: '日发电量', value: 150, unit: '万kWh' }
  ],
  statusMapColor: {
    online: '#26CC26',
    limit: '#4BD4FF',
    standby: '#FF8800',
    maintenance: '#FF688C',
    stop: '#FF1D1D',
    unconnect: '#D9D9D9'
  },
  statusMapLabel: {
    online: '运行',
    limit: '限功率',
    standby: '待机',
    maintenance: '主动停机',
    stop: '故障停机',
    unconnect: '无通讯'
  },
  filterStatusArr: [],
  activeIndex: 0,
  matrixTabList: [
    {
      id: 0,
      activeImgSrc: new URL('@/assets/images/monitoring/station/active-matrix.png', import.meta.url).href,
      imgSrc: new URL('@/assets/images/monitoring/station/matrix.png', import.meta.url).href
    },
    {
      id: 1,
      activeImgSrc: new URL('@/assets/images/monitoring/station/active-structure.png', import.meta.url).href,
      imgSrc: new URL('@/assets/images/monitoring/station/structure.png', import.meta.url).href
    }
  ],
  multipleSelection: [],
  alarmTypeOptions: [
    { label: '告警类型1', value: '1' },
    { label: '告警类型2', value: '2' },
    { label: '告警类型3', value: '3' }
  ],
  ruleStatusOptions: [
    { label: '启用中', value: '1' },
    { label: '禁用中', value: '2' }
  ],
  alarmLevelOptions: [
    { label: '严重', value: '严重' },
    { label: '提示', value: '提示' },
    { label: '一般', value: '一般' }
  ],
  testPointOptions: [
    { label: '塔基温度', value: '1' },
    { label: '室外温度', value: '2' },
    { label: '桨叶角度1A', value: '3' }
  ],
  calculateSymbolsOptions: [
    { label: '>', value: '1' },
    { label: '<', value: '2' },
    { label: '=', value: '3' },
    { label: '>=', value: '4' },
    { label: '<=', value: '5' }
  ],
  alarmWayOptions: [
    { label: '弹窗', value: '1' },
    { label: '邮箱', value: '2' },
    { label: '语音', value: '3' }
  ],
  andOrOptions: [
    { label: '或', value: '1' },
    { label: '且', value: '2' }
  ],
  pickerOptionsDay: {
    disabledDate(time) {
      return time.getTime() > new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
    }
  },
  form: {
    timeDate: new Date(),
    resource: 'month'
  },
  page: {
    index: 1,
    size: 20,
    total: 0
  },
  tableData: [
    {
      faultNbs: '',
      faultDesc: '',
      faultReason: '',
      faultFix: '',
      needMan: '',
      fixTime: ''
    },
    {
      faultNbs: '',
      faultDesc: '',
      faultReason: '',
      faultFix: '',
      needMan: '',
      fixTime: ''
    },
    {
      faultNbs: '',
      faultDesc: '',
      faultReason: '',
      faultFix: '',
      needMan: '',
      fixTime: ''
    },
  ],
  searchForm: {
    alarmName: '',
    alarmType: '',
    status: ''
  },
  tableHeader: [
    { name: '序号', type: 'index', width: 80 },
    { key: 'faultNbs', name: '故障代码' },
    { key: 'faultDesc', name: '故障现象描述' },
    { key: 'faultReason', name: '故障原因分析' },
    { key: 'faultFix', name: '建议解决方案' },
    { key: 'needMan', name: '人员需求预计' },
    { key: 'fixTime', name: '故障预计工时' }
  ],
  dialogType: '',
  dialogTitle: '',
  dialogVisible: false,
  selectionStart: 0,
  ruleForm: {
    taskName: '',
    monitorObj: [],
    describe: '',
    type: '',
    address: '',
    remark: '',
    alarmDatas: '',
    status: 1,
    alarmWay: '',
    symbols: '',
    testPoint: '',
    andOr: '1',
    alarmLevel: ''
  },
  rules: {
    taskName: [{ required: true, message: '请输入任务名称', trigger: ['blur', 'change'] }],
    monitorObj: [{ required: true, message: '请选择监测对象', trigger: ['blur', 'change'] }],
    alarmLevel: [{ required: true, message: '请选择告警等级', trigger: ['blur', 'change'] }],
    alarmType: [{ required: true, message: '请输入', trigger: ['blur', 'change'] }],
    testPoint: [{ required: true, message: '请输入', trigger: ['blur', 'change'] }],
    // symbols: [{ required: true, message: '请输入', trigger: ['blur', 'change'] }],
    // describe: [{ required: true, message: '请输入', trigger: ['blur', 'change'] }],
    alarmWay: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    address: [{ required: true, message: '请输入', trigger: ['blur', 'change'] }],
    alarmDatas: [{ required: true, message: '请输入', trigger: ['blur', 'change'] }],
    status: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }]
  },
  recordFormulaName: '',
  allDataList: [],
  treeData: [
    {
      label: '某风场1',
      children: [
        {
          label: 'DEW-D2.0-87',
          children: [
            {
              label: 'DEW001'
            },
            {
              label: 'DEW002'
            },
            {
              label: 'DEW003'
            }
          ]
        },
        {
          label: 'MySE3.6-135',
          children: [
            {
              label: 'MySE001'
            },
            {
              label: 'MySE002'
            },
            {
              label: 'MySE003'
            }
          ]
        }
      ]
    }
  ],
  defaultProps: {
    children: 'children',
    label: 'label'
  },
  structureList: [
    {
      title: '集电线路1',
      list: [
        {title: 'MY101', model: '32049', status: 'online'},
        {title: 'MY102', model: '32049', status: 'limit'},
        {title: 'MY103', model: '32049', status: 'standby'},
      ]
    },
    {
      title: '集电线路2',
      list: [
        {title: 'MY101', model: '32049', status: 'maintenance'},
        {title: 'MY102', model: '32049', status: 'stop'},
        {title: 'MY103', model: '32049', status: 'unconnect'},
      ]
    },
    {
      title: '集电线路3',
      list: [
        {title: 'MY101', model: '32049', status: 'online'},
        {title: 'MY102', model: '32049', status: 'limit'},
        {title: 'MY103', model: '32049', status: 'standby'},
      ]
    },
    {
      title: '集电线路4',
      list: [
        {title: 'MY101', model: '32049', status: 'online'},
        {title: 'MY102', model: '32049', status: 'limit'},
        {title: 'MY103', model: '32049', status: 'standby'},
      ]
    },
    {
      title: '集电线路5',
      list: [
        {title: 'MY101', model: '32049', status: 'online'},
        {title: 'MY102', model: '32049', status: 'limit'},
        {title: 'MY103', model: '32049', status: 'standby'},
      ]
    },
    {
      title: '集电线路6',
      list: [
        {title: 'MY101', model: '32049', status: 'maintenance'},
        {title: 'MY102', model: '32049', status: 'stop'},
        {title: 'MY103', model: '32049', status: 'unconnect'},
      ]
    },
    // {
    //   title: '集电线路7',
    //   list: [
    //     {title: 'MY101', model: '32049', status: 'online'},
    //     {title: 'MY102', model: '32049', status: 'limit'},
    //     {title: 'MY103', model: '32049', status: 'standby'},
    //   ]
    // },
    // {
    //   title: '集电线路8',
    //   list: [
    //     {title: 'MY101', model: '32049', status: 'maintenance'},
    //     {title: 'MY102', model: '32049', status: 'stop'},
    //     {title: 'MY103', model: '32049', status: 'unconnect'},
    //   ]
    // },
    // {
    //   title: '集电线路9',
    //   list: [
    //     {title: 'MY101', model: '32049', status: 'online'},
    //     {title: 'MY102', model: '32049', status: 'limit'},
    //     {title: 'MY103', model: '32049', status: 'standby'},
    //   ]
    // },
    // {
    //   title: '集电线路10',
    //   list: [
    //     {title: 'MY101', model: '32049', status: 'maintenance'},
    //     {title: 'MY102', model: '32049', status: 'stop'},
    //     {title: 'MY103', model: '32049', status: 'unconnect'},
    //   ]
    // },
  ],
  alarmTreeDatas: {
    "faultReasonPr": 0,
    "id": "02_04_002",
    "increase": "#2CBFF5",
    "judgeMethods": "齿轮箱增速比不为0时，主轴转速1秒值＞（1950rpm/齿轮箱变比）且风速10分钟平均值＞3.5m/s且发电机实时转速＞350rpm且不在低穿模式，延时1s报警停机，（1小时允许出现3次）（部分老项目为1945rpm/齿轮箱变比）",
    "nodeDesc": "主轴超速等级2",
    "nodeId": "02_04_002",
    "nodeName": "主轴超速等级2",
    "nodeParentid": "",
    "nodeType": "1",
    "processingMethods": "",
    "children": [
        {
            "id": "02_04_002-3",
            "model": "MY1.5",
            "nodeId": "02_04_002-3",
            "rootNodeId": "02_04_002",
            "nodeParentid": "02_04_002",
            "nodeType": "2",
            "nodeName": "编码器安装异常",
            "nodeDesc": "编码器安装异常",
            "faultReasonPr": 38,
            "color": "#CB2E03",
            "judgeMethods": "编码器安装松动、联轴节安装松动",
            "processingMethods": "1、检查编码器安装；2、检查联轴节安装；",
            "techControl": "",
            "remark": "",
            "createTime": "2021-10-20 09:24:43",
            "children": [
                {
                    "id": "02_04_002-3-1",
                    "model": "MY1.5",
                    "nodeId": "02_04_002-3-1",
                    "rootNodeId": "02_04_002",
                    "nodeParentid": "02_04_002-3",
                    "nodeType": "3",
                    "nodeName": "滑环编码器联轴器连接螺栓松动",
                    "nodeDesc": "由于编码器联轴器连接螺栓松动，导致速度传递到编码器轴端出现橡皮筋效应。致使编码器输出转速突然增大。",
                    "faultReasonPr": 32,
                    "color": "#CB2E03",
                    "judgeMethods": "使用紧固螺栓工具测试是否松动。",
                    "processingMethods": "使用紧固螺栓工具紧固",
                    "techControl": "",
                    "remark": "",
                    "createTime": "2021-10-20 09:24:43",
                    "children": [],
                    "increase": "l(90) 0:rgba(255,33,33,0.1) 1:rgba(255,125,125,0.56)",
                    "borderColor": "rgba(255, 33, 33, 1)"
                },
                {
                    "id": "02_04_002-3-3",
                    "model": "MY1.5",
                    "nodeId": "02_04_002-3-3",
                    "rootNodeId": "02_04_002",
                    "nodeParentid": "02_04_002-3",
                    "nodeType": "3",
                    "nodeName": "滑环编码器内部损坏",
                    "nodeDesc": "编码器内部光栅损坏，或编码器防护等级破坏内部进入灰尘等。",
                    "faultReasonPr": 27,
                    "color": "#DB8202",
                    "judgeMethods": "检查滑环轴承及编码器联轴器没有异常前提下，更换滑环编码器，若机组运行后故障消除，说明滑环编码器异常。",
                    "processingMethods": "更换编码器。",
                    "techControl": "",
                    "remark": "",
                    "createTime": "2021-10-20 09:24:43",
                    "children": [],
                    "increase": "l(90) 0:rgba(255,136,0,0.1) 1:rgba(255,193,122,0.56)",
                    "borderColor": "rgba(255, 136, 0, 1)"
                },
                {
                    "id": "02_04_002-3-4",
                    "model": "MY1.5",
                    "nodeId": "02_04_002-3-4",
                    "rootNodeId": "02_04_002",
                    "nodeParentid": "02_04_002-3",
                    "nodeType": "3",
                    "nodeName": "滑环编码器电磁干扰，屏蔽线未良好接地",
                    "nodeDesc": "滑环编码器屏蔽线未与编码器外壳连接，控制柜内屏蔽线未良好可靠接地。",
                    "faultReasonPr": 23,
                    "color": "#DB8202",
                    "judgeMethods": "用万用表测量屏蔽线与编码器外壳及控制柜内地线导通情况。",
                    "processingMethods": "屏蔽线控制柜内环切接地，编码器屏蔽线在电缆出线航插上环切压接好。",
                    "techControl": "",
                    "remark": "",
                    "createTime": "2021-10-20 09:24:43",
                    "children": [],
                    "increase": "l(90) 0:rgba(255,136,0,0.1) 1:rgba(255,193,122,0.56)",
                    "borderColor": "rgba(255, 136, 0, 1)"
                },
                {
                    "id": "02_04_002-3-2",
                    "model": "MY1.5",
                    "nodeId": "02_04_002-3-2",
                    "rootNodeId": "02_04_002",
                    "nodeParentid": "02_04_002-3",
                    "nodeType": "3",
                    "nodeName": "编码器联轴器损坏",
                    "nodeDesc": "编码器联轴器损坏，导致转速与实际转速出现不可控差异。",
                    "faultReasonPr": 19,
                    "color": "#4963FE",
                    "judgeMethods": "拆卸编码器联轴器，观察联轴器本体上是否有裂纹、或是断裂等。",
                    "processingMethods": "更换联轴器。",
                    "techControl": "",
                    "remark": "",
                    "createTime": "2021-10-20 09:24:43",
                    "children": [],
                    "increase": "l(90) 0:rgba(0,122,255,0.1) 1:rgba(119,184,255,0.56)",
                    "borderColor": "rgba(0, 122, 255, 1)"
                }
            ],
            "increase": "l(90) 0:rgba(255,33,33,0.1) 1:rgba(255,125,125,0.56)",
            "borderColor": "rgba(255, 33, 33, 1)"
        },
        {
            "id": "02_04_002-4",
            "model": "MY1.5",
            "nodeId": "02_04_002-4",
            "rootNodeId": "02_04_002",
            "nodeParentid": "02_04_002",
            "nodeType": "2",
            "nodeName": "滑环异常",
            "nodeDesc": "滑环异常",
            "faultReasonPr": 31,
            "color": "#CB2E03",
            "judgeMethods": "滑环尾部晃动幅度较大",
            "processingMethods": "检查滑环；",
            "techControl": "",
            "remark": "",
            "createTime": "2021-10-20 09:24:43",
            "children": [
                {
                    "id": "02_04_002-4-1",
                    "model": "MY1.5",
                    "nodeId": "02_04_002-4-1",
                    "rootNodeId": "02_04_002",
                    "nodeParentid": "02_04_002-4",
                    "nodeType": "3",
                    "nodeName": "滑环安装异常",
                    "nodeDesc": "滑环未安装好，导致滑环尾部尾摆严重。",
                    "faultReasonPr": 50,
                    "color": "#CB2E03",
                    "judgeMethods": "查看滑环安装是否满足车间工艺指导书要求。",
                    "processingMethods": "按工艺指导书文件要求的工艺调整滑环的安装",
                    "techControl": "",
                    "remark": "",
                    "createTime": "2021-10-20 09:24:43",
                    "children": [],
                    "increase": "l(90) 0:rgba(255,136,0,0.1) 1:rgba(255,193,122,0.56)",
                    "borderColor": "rgba(255, 136, 0, 1)"
                },
                {
                    "id": "02_04_002-4-2",
                    "model": "MY1.5",
                    "nodeId": "02_04_002-4-2",
                    "rootNodeId": "02_04_002",
                    "nodeParentid": "02_04_002-4",
                    "nodeType": "3",
                    "nodeName": "滑环内部轴承损坏",
                    "nodeDesc": "滑环内部轴承损坏，导致滑环尾部尾摆严重。",
                    "faultReasonPr": 50,
                    "color": "#CB2E03",
                    "judgeMethods": "观察滑环转动是是否存在尾摆及轴承异响等情况。",
                    "processingMethods": "更换滑环。",
                    "techControl": "",
                    "remark": "",
                    "createTime": "2021-10-20 09:24:43",
                    "children": [],
                    "increase": "l(90) 0:rgba(0,122,255,0.1) 1:rgba(119,184,255,0.56)",
                    "borderColor": "rgba(0, 122, 255, 1)"
                }
            ],
            "increase": "l(90) 0:rgba(255,33,33,0.1) 1:rgba(255,125,125,0.56)",
            "borderColor": "rgba(255, 33, 33, 1)"
        },
        {
            "id": "02_04_002-2",
            "model": "MY1.5",
            "nodeId": "02_04_002-2",
            "rootNodeId": "02_04_002",
            "nodeParentid": "02_04_002",
            "nodeType": "2",
            "nodeName": "联轴器打滑",
            "nodeDesc": "联轴器打滑",
            "faultReasonPr": 18,
            "color": "#4963FE",
            "judgeMethods": "查看联轴器是否打滑",
            "processingMethods": "检查联轴器是否打滑；",
            "techControl": "",
            "remark": "",
            "createTime": "2021-10-20 09:24:43",
            "children": [
                {
                    "id": "02_04_002-2-3",
                    "model": "MY1.5",
                    "nodeId": "02_04_002-2-3",
                    "rootNodeId": "02_04_002",
                    "nodeParentid": "02_04_002-2",
                    "nodeType": "3",
                    "nodeName": "联轴器连杆弹性体损坏",
                    "nodeDesc": "联轴器连杆弹性体损坏",
                    "faultReasonPr": 41,
                    "color": "#CB2E03",
                    "judgeMethods": "弹性体大量掉粉碎裂，或严重老化开裂鼓包",
                    "processingMethods": "更换连杆",
                    "techControl": "",
                    "remark": "",
                    "createTime": "2021-10-20 09:24:43",
                    "children": [],
                    "increase": "l(90) 0:rgba(255,136,0,0.1) 1:rgba(255,193,122,0.56)",
                    "borderColor": "rgba(255, 136, 0, 1)"
                },
                {
                    "id": "02_04_002-2-1",
                    "model": "MY1.5",
                    "nodeId": "02_04_002-2-1",
                    "rootNodeId": "02_04_002",
                    "nodeParentid": "02_04_002-2",
                    "nodeType": "3",
                    "nodeName": "联轴器打滑",
                    "nodeDesc": "由于联轴器打滑导致机组发电机转速与叶轮转速无法正常同步。",
                    "faultReasonPr": 30,
                    "color": "#CB2E03",
                    "judgeMethods": "联轴器摩擦片融化从力矩限制器缝隙处甩出，可见文件M0000007065",
                    "processingMethods": "更换联轴器",
                    "techControl": "",
                    "remark": "",
                    "createTime": "2021-10-20 09:24:43",
                    "children": [],
                    "increase": "l(90) 0:rgba(255,136,0,0.1) 1:rgba(255,193,122,0.56)",
                    "borderColor": "rgba(255, 136, 0, 1)"
                },
                {
                    "id": "02_04_002-2-2",
                    "model": "MY1.5",
                    "nodeId": "02_04_002-2-2",
                    "rootNodeId": "02_04_002",
                    "nodeParentid": "02_04_002-2",
                    "nodeType": "3",
                    "nodeName": "联轴器结构件开焊或断裂",
                    "nodeDesc": "由于联轴器开焊断裂导致机组发电机转速与叶轮转速无法正常同步。",
                    "faultReasonPr": 29,
                    "color": "#DB8202",
                    "judgeMethods": "联轴器力矩限制器结构件开焊损坏，脱开",
                    "processingMethods": "更换联轴器",
                    "techControl": "",
                    "remark": "",
                    "createTime": "2021-10-20 09:24:43",
                    "children": [],
                    "increase": "l(90) 0:rgba(0,122,255,0.1) 1:rgba(119,184,255,0.56)",
                    "borderColor": "rgba(0, 122, 255, 1)"
                }
            ],
            "increase": "l(90) 0:rgba(0,122,255,0.1) 1:rgba(119,184,255,0.56)",
            "borderColor": "rgba(0, 122, 255, 1)"
        },
        {
            "id": "02_04_002-1",
            "model": "MY1.5",
            "nodeId": "02_04_002-1",
            "rootNodeId": "02_04_002",
            "nodeParentid": "02_04_002",
            "nodeType": "2",
            "nodeName": "主轴真实超速",
            "nodeDesc": "主轴真实超速",
            "faultReasonPr": 10,
            "color": "#4963FE",
            "judgeMethods": "查看机组tracelog数据，若发电机转速超过1900rpm，且机组报出主轴超速故障，说明主轴真实超速。",
            "processingMethods": "反馈至公司相关部门",
            "techControl": "",
            "remark": "",
            "createTime": "2021-10-20 09:24:43",
            "children": [
                {
                    "id": "02_04_002-1-1",
                    "model": "MY1.5",
                    "nodeId": "02_04_002-1-1",
                    "rootNodeId": "02_04_002",
                    "nodeParentid": "02_04_002-1",
                    "nodeType": "3",
                    "nodeName": "主轴真实超速",
                    "nodeDesc": "主轴真实超速",
                    "faultReasonPr": 100,
                    "color": "#CB2E03",
                    "judgeMethods": "查看机组tracelog数据，若发电机转速超过1900rpm，且机组报出主轴超速故障，说明主轴真实超速。",
                    "processingMethods": "反馈至公司相关部门",
                    "techControl": "",
                    "remark": "",
                    "createTime": "2021-10-20 09:24:43",
                    "children": [],
                    "increase": "l(90) 0:rgba(0,122,255,0.1) 1:rgba(119,184,255,0.56)",
                    "borderColor": "rgba(0, 122, 255, 1)"
                }
            ],
            "increase": "l(90) 0:rgba(0,122,255,0.1) 1:rgba(119,184,255,0.56)",
            "borderColor": "rgba(0, 122, 255, 1)"
        },
        {
            "id": "02_04_002-5",
            "model": "MY1.5",
            "nodeId": "02_04_002-5",
            "rootNodeId": "02_04_002",
            "nodeParentid": "02_04_002",
            "nodeType": "3",
            "nodeName": "其他",
            "nodeDesc": null,
            "faultReasonPr": 2,
            "color": "#2CBFF5",
            "judgeMethods": null,
            "processingMethods": null,
            "techControl": null,
            "remark": null,
            "createTime": "2021-10-20 09:24:43",
            "children": [],
            "increase": "l(90) 0:rgba(56,242,161,0.1) 1:rgba(154,255,211,0.26)",
            "borderColor": "rgba(56, 242, 161, 1)"
        }
    ]
  }
})
