import { reactive } from 'vue'
export let resource = reactive({
  runTrendTabList: [
    { label: '严重', value: '1' },
    { label: '一般', value: '2' },
    { label: '提示', value: '3' }
  ],
  mouseObj: {
    show: false,
    x: 0,
    y: 0,
    title: '',
    list: [
      { label: '风机型号', value: '' },
      { label: '状态', value: '' },
      { label: '风速', value: '' },
      { label: '有功功率', value: '' },
      { label: '理论功率', value: '' },
      { label: '出力率', value: '' },
      { label: '日发电量', value: '' }
    ]
  },
  cardList: [
    { label: '风速', value: 20, unit: 'm/s' },
    { label: '装机台数', value: 900, unit: '台' },
    { label: '装机容量', value: 150, unit: '万kW' },
    { label: '总有功', value: 55, unit: '万kW' },
    { label: '出力率', value: 15, unit: '%' },
    { label: '日发电量', value: 150, unit: '万kWh' }
  ],
  statusMapColor: {
    serious: '#FF1D1D',
    commonly: '#FF8800',
    prompt: '#FFED4D',
    normal: '#26CC26',
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
  totalStatusList: [
    {
      label: '严重',
      status: 'serious',
      value: 6,
      color: '#FF1D1D'
    },
    {
      label: '一般',
      status: 'commonly',
      value: 8,
      color: '#FF8800'
    },
    {
      label: '提示',
      status: 'prompt',
      value: 4,
      color: '#FFED4D'
    },
    {
      label: '正常',
      status: 'normal',
      value: 4,
      color: '#26CC26'
    },
  ],
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
  matrixList: [
    {
      id: 1,
      title: 'MY001',
      alarmCount: '3',
      promptNbs: '1',
      seriousMbs: '1',
      commonlyNbs: '1',
      status: 'serious'
    },
    {
      id: 2,
      title: 'MY002',
      alarmCount: '3',
      promptNbs: '1',
      seriousMbs: '1',
      commonlyNbs: '1',
      status: 'serious'
    },
    {
      id: 3,
      title: 'MY003',
      alarmCount: '3',
      promptNbs: '1',
      seriousMbs: '1',
      commonlyNbs: '1',
      status: 'serious'
    },
    {
      id: 4,
      title: 'MY004',
      alarmCount: '3',
      promptNbs: '1',
      seriousMbs: '1',
      commonlyNbs: '1',
      status: 'serious'
    },
    {
      id: 5,
      title: 'MY005',
      alarmCount: '3',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '1',
      status: 'serious'
    },
    {
      id: 6,
      title: 'MY006',
      alarmCount: '3',
      promptNbs: '1',
      seriousMbs: '1',
      commonlyNbs: '1',
      status: 'serious'
    },
    {
      id: 7,
      title: 'MY007',
      alarmCount: '6',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '1',
      status: 'commonly'
    },
    {
      id: 8,
      title: 'MY008',
      alarmCount: '6',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '1',
      status: 'commonly'
    },
    {
      id: 9,
      title: 'MY008',
      alarmCount: '6',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '1',
      status: 'commonly'
    },
    {
      id: 10,
      title: 'MY008',
      alarmCount: '6',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '1',
      status: 'commonly'
    },
    {
      id: 11,
      title: 'MY008',
      alarmCount: '6',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '1',
      status: 'commonly'
    },
    {
      id: 12,
      title: 'MY008',
      alarmCount: '6',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '1',
      status: 'commonly'
    },
    {
      id: 13,
      title: 'MY008',
      alarmCount: '6',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '1',
      status: 'commonly'
    },
    {
      id: 14,
      title: 'MY008',
      alarmCount: '6',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '1',
      status: 'commonly'
    },
    {
      id: 15,
      title: 'MY008',
      alarmCount: '4',
      promptNbs: '1',
      seriousMbs: '0',
      commonlyNbs: '0',
      status: 'prompt'
    },
    {
      id: 16,
      title: 'MY008',
      alarmCount: '4',
      promptNbs: '1',
      seriousMbs: '0',
      commonlyNbs: '0',
      status: 'prompt'
    },
    {
      id: 17,
      title: 'MY008',
      alarmCount: '4',
      promptNbs: '1',
      seriousMbs: '0',
      commonlyNbs: '0',
      status: 'prompt'
    },
    {
      id: 18,
      title: 'MY008',
      alarmCount: '4',
      promptNbs: '1',
      seriousMbs: '0',
      commonlyNbs: '0',
      status: 'prompt'
    },
    {
      id: 19,
      title: 'MY008',
      alarmCount: '0',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '0',
      status: 'normal'
    },
    {
      id: 20,
      title: 'MY008',
      alarmCount: '0',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '0',
      status: 'normal'
    },
    {
      id: 21,
      title: 'MY008',
      alarmCount: '0',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '0',
      status: 'normal'
    },
    {
      id: 22,
      title: 'MY008',
      alarmCount: '0',
      promptNbs: '0',
      seriousMbs: '0',
      commonlyNbs: '0',
      status: 'normal'
    },
  ],
  structureList: [
    {
      title: '集电线路1',
      list: [
        { title: 'MY101', model: '32049', status: 'online' },
        { title: 'MY102', model: '32049', status: 'limit' },
        { title: 'MY103', model: '32049', status: 'standby' }
      ]
    },
    {
      title: '集电线路2',
      list: [
        { title: 'MY101', model: '32049', status: 'maintenance' },
        { title: 'MY102', model: '32049', status: 'stop' },
        { title: 'MY103', model: '32049', status: 'unconnect' }
      ]
    },
    {
      title: '集电线路3',
      list: [
        { title: 'MY101', model: '32049', status: 'online' },
        { title: 'MY102', model: '32049', status: 'limit' },
        { title: 'MY103', model: '32049', status: 'standby' }
      ]
    },
    {
      title: '集电线路4',
      list: [
        { title: 'MY101', model: '32049', status: 'online' },
        { title: 'MY102', model: '32049', status: 'limit' },
        { title: 'MY103', model: '32049', status: 'standby' }
      ]
    },
    {
      title: '集电线路5',
      list: [
        { title: 'MY101', model: '32049', status: 'online' },
        { title: 'MY102', model: '32049', status: 'limit' },
        { title: 'MY103', model: '32049', status: 'standby' }
      ]
    },
    {
      title: '集电线路6',
      list: [
        { title: 'MY101', model: '32049', status: 'maintenance' },
        { title: 'MY102', model: '32049', status: 'stop' },
        { title: 'MY103', model: '32049', status: 'unconnect' }
      ]
    }
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

  echartsData: [
    {
      id: 1,
      tilted: 8,
      standard: 2,
      straight: 5,
      scattered: 17,
      direction: 4,
      sortDirection: 15,
      time: '16:26:19'
    },
    {
      id: 2,
      tilted: 4,
      standard: 11,
      straight: 5,
      scattered: 4,
      direction: 18,
      sortDirection: 19,
      time: '23:36:52'
    },
    {
      id: 3,
      tilted: 14,
      standard: 17,
      straight: 10,
      scattered: 16,
      direction: 12,
      sortDirection: 8,
      time: '07:44:23'
    },
    {
      id: 4,
      tilted: 16,
      standard: 12,
      straight: 11,
      scattered: 17,
      direction: 4,
      sortDirection: 2,
      time: '16:59:26'
    },
    {
      id: 5,
      tilted: 1,
      standard: 8,
      straight: 6,
      scattered: 4,
      direction: 14,
      sortDirection: 16,
      time: '06:03:38'
    },
    {
      id: 6,
      tilted: 20,
      standard: 9,
      straight: 10,
      scattered: 15,
      direction: 9,
      sortDirection: 3,
      time: '17:47:29'
    },
    {
      id: 7,
      tilted: 4,
      standard: 4,
      straight: 4,
      scattered: 11,
      direction: 6,
      sortDirection: 7,
      time: '05:01:33'
    },
    {
      id: 8,
      tilted: 7,
      standard: 1,
      straight: 14,
      scattered: 16,
      direction: 18,
      sortDirection: 14,
      time: '17:39:33'
    },
    {
      id: 9,
      tilted: 20,
      standard: 17,
      straight: 4,
      scattered: 19,
      direction: 18,
      sortDirection: 18,
      time: '21:20:10'
    },
    {
      id: 10,
      tilted: 6,
      standard: 8,
      straight: 4,
      scattered: 18,
      direction: 13,
      sortDirection: 4,
      time: '17:47:23'
    },
    {
      id: 11,
      tilted: 5,
      standard: 9,
      straight: 4,
      scattered: 7,
      direction: 18,
      sortDirection: 20,
      time: '23:17:54'
    },
    {
      id: 12,
      tilted: 2,
      standard: 14,
      straight: 8,
      scattered: 13,
      direction: 13,
      sortDirection: 13,
      time: '10:47:34'
    },
    {
      id: 13,
      tilted: 2,
      standard: 3,
      straight: 18,
      scattered: 17,
      direction: 2,
      sortDirection: 1,
      time: '13:49:39'
    },
    {
      id: 14,
      tilted: 16,
      standard: 2,
      straight: 10,
      scattered: 3,
      direction: 3,
      sortDirection: 8,
      time: '05:08:49'
    },
    {
      id: 15,
      tilted: 10,
      standard: 8,
      straight: 14,
      scattered: 2,
      direction: 7,
      sortDirection: 14,
      time: '00:57:51'
    },
    {
      id: 16,
      tilted: 3,
      standard: 12,
      straight: 14,
      scattered: 11,
      direction: 10,
      sortDirection: 11,
      time: '22:55:11'
    },
    {
      id: 17,
      tilted: 2,
      standard: 10,
      straight: 7,
      scattered: 15,
      direction: 12,
      sortDirection: 5,
      time: '22:09:34'
    },
    {
      id: 18,
      tilted: 3,
      standard: 7,
      straight: 17,
      scattered: 12,
      direction: 13,
      sortDirection: 8,
      time: '13:23:58'
    },
    {
      id: 19,
      tilted: 9,
      standard: 6,
      straight: 6,
      scattered: 14,
      direction: 19,
      sortDirection: 11,
      time: '07:47:23'
    },
    {
      id: 20,
      tilted: 19,
      standard: 20,
      straight: 14,
      scattered: 9,
      direction: 3,
      sortDirection: 16,
      time: '20:29:55'
    },
    {
      id: 21,
      tilted: 3,
      standard: 10,
      straight: 13,
      scattered: 18,
      direction: 18,
      sortDirection: 9,
      time: '15:32:51'
    },
    {
      id: 22,
      tilted: 8,
      standard: 19,
      straight: 16,
      scattered: 16,
      direction: 10,
      sortDirection: 15,
      time: '10:31:28'
    },
    {
      id: 23,
      tilted: 13,
      standard: 7,
      straight: 12,
      scattered: 12,
      direction: 3,
      sortDirection: 11,
      time: '15:54:59'
    },
    {
      id: 24,
      tilted: 12,
      standard: 9,
      straight: 8,
      scattered: 17,
      direction: 7,
      sortDirection: 6,
      time: '03:38:39'
    }
  ],
  chartData: [
    { name: '#001', color: 'rgba(195, 84, 75, 1)', bgc: 'linear-gradient( 90deg, rgba(195,84,75,0.5) 0%, rgba(195,84,75,0.3) 50%, rgba(195,84,75,0) 100%);', ratio: '55', value: '200', percentage: '56', lableWidth: '135px' },
    { name: '#002', color: 'rgba(229, 153, 34, 1)', bgc: 'linear-gradient( 90deg, rgba(229,153,34,0.5) 0%, rgba(229,153,34,0.3) 50%, rgba(229,153,34,0) 100%);', ratio: '20', value: '180', percentage: '46', lableWidth: '135px' },
    { name: '#003', color: 'rgba(140, 128, 255, 1)', bgc: 'linear-gradient( 90deg, rgba(140,128,255,0.5) 0%, rgba(140,128,255,0.3) 50%, rgba(140,128,255,0) 100%);', ratio: '15', value: '160', percentage: '36', lableWidth: '135px' },
    { name: '#004', color: 'rgba(72, 170, 255, 1)', bgc: 'linear-gradient( 90deg, rgba(72,170,255,0.5) 0%, rgba(72,170,255,0.3) 50%, rgba(72,170,255,0) 100%);', ratio: '6', value: '120', percentage: '26', lableWidth: '135px' },
    { name: '#005', color: 'rgba(72, 170, 255, 1)', bgc: 'linear-gradient( 90deg, rgba(72,170,255,0.5) 0%, rgba(72,170,255,0.3) 50%, rgba(72,170,255,0) 100%);', ratio: '6', value: '100', percentage: '26', lableWidth: '135px' },
  ],
  chartData2: [
    { name: '齿轮箱', color: 'rgba(195, 84, 75, 1)', bgc: 'linear-gradient( 90deg, rgba(195,84,75,0.5) 0%, rgba(195,84,75,0.3) 50%, rgba(195,84,75,0) 100%);', ratio: '55', value: '200', percentage: '56', lableWidth: '150px' },
    { name: '变桨系统', color: 'rgba(229, 153, 34, 1)', bgc: 'linear-gradient( 90deg, rgba(229,153,34,0.5) 0%, rgba(229,153,34,0.3) 50%, rgba(229,153,34,0) 100%);', ratio: '20', value: '180', percentage: '46', lableWidth: '150px' },
    { name: '发电机', color: 'rgba(140, 128, 255, 1)', bgc: 'linear-gradient( 90deg, rgba(140,128,255,0.5) 0%, rgba(140,128,255,0.3) 50%, rgba(140,128,255,0) 100%);', ratio: '15', value: '160', percentage: '36', lableWidth: '150px' },
    { name: '偏航系统', color: 'rgba(72, 170, 255, 1)', bgc: 'linear-gradient( 90deg, rgba(72,170,255,0.5) 0%, rgba(72,170,255,0.3) 50%, rgba(72,170,255,0) 100%);', ratio: '6', value: '120', percentage: '26', lableWidth: '150px' },
    { name: '叶片', color: 'rgba(72, 170, 255, 1)', bgc: 'linear-gradient( 90deg, rgba(72,170,255,0.5) 0%, rgba(72,170,255,0.3) 50%, rgba(72,170,255,0) 100%);', ratio: '6', value: '100', percentage: '26', lableWidth: '150px' },
  ],
  dialogType: '',
  dialogVisible: false,
  dialogTitle: '',
  alarmLevelOptions: [
    { label: '严重', value: '严重' },
    { label: '提示', value: '提示' },
    { label: '一般', value: '一般' }
  ],
  multipleSelection: [],
  page: {
    index: 1,
    size: 20,
    total: 3
  },
  tableData: [
    {
      partName: '发电机',
      modelName: '发电机绕组U温度异常',
      labelPoints: '发电机定子绕组U温度1秒平均值',
      numericalValue: '23',
      alarmLevel: '严重',
    },
    {
      partName: '齿轮箱',
      modelName: '',
      labelPoints: '',
      numericalValue: '',
      alarmLevel: '一般',
    },
    {
      partName: '变桨系统',
      modelName: '',
      labelPoints: '',
      numericalValue: '',
      alarmLevel: '提示',
    },
  ],
  searchForm: {
    eqmType: '',
    faultCode: '',
    alarmLevel: '',
    dateRange: ''
  },
  tableHeader: [
    { name: '序号', type: 'index', width: 80 },
    { key: 'partName', name: '部件名称' },
    { key: 'modelName', name: '模型名称' },
    { key: 'labelPoints', name: '标签点' },
    { key: 'numericalValue', name: '数值' },
    { key: 'alarmLevel', name: '告警等级' },
  ],
})
