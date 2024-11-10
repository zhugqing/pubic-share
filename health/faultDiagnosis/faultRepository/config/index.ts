import { reactive } from 'vue'
export let datas = reactive({
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
  }
})
