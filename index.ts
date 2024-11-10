/*
 * @Author: weiquanzhu weiquanzhu@quant-cloud.com.cn
 * @Date: 2024-05-14 11:40:34
 * @LastEditors: weiquanzhu
 * @LastEditTime: 2024-05-31 17:12:01
 * @FilePath: \front-centralized-control-threeDistrict\mock\auth\index.ts
 * @Description: 认证接口
 */
import { MockMethod } from 'vite-plugin-mock'

const timeout = 1000

export default [
  {
    url: '/mock/auth/login',
    method: 'post',
    timeout,
    response: () => {
      return {
        msg: '登录成功',
        code: 20000,
        data: {
          Token:
            'Bearer eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJhdXRob3JpdHkiOiJST0xFX2FkbWluLGFkbWluOm1hbmFnZSxhZG1pbjptYW5hZ2U6dXNlcixhZG1pbjptYW5hZ2U6cm9sZSxhZG1pbjptYW5hZ2U6cGVybSxhZG1pbjptYW5hZ2U6bG9nLGFkbWluOm1hbmFnZTpsb2c6dmlzaXQsYWRtaW46bWFuYWdlOmxvZzpvcGVyYXRlLGluZGl2aWR1YWw6c3VwcG9ydCxzdWJIZWFsdGg6d2FybmluZyxoZWFsdGg6bWFuYWdlLGZhdWx0OnRyZWUscmVwb3J0OnN0YXRpc3RpY3MsbWFpbnRhaW46c2NoZWR1bGUsc21hcnQ6d2F0Y2gsaW5kaXZpZHVhbDpzdXBwb3J0OnZpZGVvLGluZGl2aWR1YWw6c3VwcG9ydDpoaXN0b3J5IiwianRpIjoiMSIsImlzcyI6InF1YW50LWNsb3VkIiwiaWF0IjoxNzAyNjEyMDMzLCJzdWIiOiJhZG1pbiIsImlzUmVtZW1iZXJNZSI6dHJ1ZSwiZGV0YWlscyI6eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJlYWxOYW1lIjoi566h55CG5ZGYIiwicGhvbmUiOiIiLCJlbWFpbCI6bnVsbCwiY3JlYXRlVGltZSI6eyJkYXlPZlllYXIiOjIzMywiZGF5T2ZXZWVrIjoiTU9OREFZIiwieWVhciI6MjAyMywibW9udGgiOiJBVUdVU1QiLCJuYW5vIjowLCJtb250aFZhbHVlIjo4LCJkYXlPZk1vbnRoIjoyMSwiaG91ciI6MTQsIm1pbnV0ZSI6NDMsInNlY29uZCI6NCwiY2hyb25vbG9neSI6eyJjYWxlbmRhclR5cGUiOiJpc284NjAxIiwiaWQiOiJJU08ifX0sInVwZGF0ZVRpbWUiOnsiZGF5T2ZZZWFyIjoyMzMsImRheU9mV2VlayI6Ik1PTkRBWSIsInllYXIiOjIwMjMsIm1vbnRoIjoiQVVHVVNUIiwibmFubyI6MCwibW9udGhWYWx1ZSI6OCwiZGF5T2ZNb250aCI6MjEsImhvdXIiOjE0LCJtaW51dGUiOjQzLCJzZWNvbmQiOjQsImNocm9ub2xvZ3kiOnsiY2FsZW5kYXJUeXBlIjoiaXNvODYwMSIsImlkIjoiSVNPIn19LCJyb2xlSWQiOjEsInJvbGVOYW1lIjoiYWRtaW4iLCJsb2NrZWQiOjAsImxvY2tlZFRpbWUiOm51bGx9LCJleHAiOjE3MDMyMTY4MzN9.5Udj2_iXhY7muGRMBO8VGdpUuOrqulXpAolchIA8ecM',
          info: {
            userId: 1,
            realName: '管理员',
            username: 'admin'
          }
        }
      }
    }
  },
  {
    url: '/mock/auth/logout',
    method: 'get',
    timeout,
    response: () => {
      return {
        msg: '登出成功',
        code: 20000
      }
    }
  },
  // // 1.3 查询个人信息
  {
    url: '/mock/auth/userInfo',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: 20000,
        message: '操作成功',
        data: {
          id: 1,
          username: 'admin',
          realName: '管理员',
          phone: '',
          email: '',
          createTime: '2023-08-21 14:43:04',
          updateTime: '2023-08-21 14:43:04',
          roleId: 1,
          roleName: 'admin',
          locked: 0,
          lockedTime: null
        }
      }
    }
  },
  // 1.4 修改个人信息
  {
    url: '/mock/auth/updateInfo',
    method: 'post',
    timeout,
    response: () => {
      return {
        code: 20000,
        message: '操作成功',
        data: null
      }
    }
  },
  // 1.5 修改密码
  {
    url: '/mock/auth/updatePassword',
    method: 'post',
    timeout,
    response: () => {
      return {
        code: 20000,
        message: '操作成功',
        data: null
      }
    }
  },
  // 1.6 查询用户权限列表
  {
    url: '/mock/auth/listPerm',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: 20000,
        message: '操作成功',
        data: [
          {
            path: '/monitoring',
            component: '#',
            redirect: '/monitoring/regionalMonitoring',
            name: 'Monitoring',
            meta: {
              title: '实时监视',
              icon: 'svg-icon:monitoring'
            },
            children: [
              {
                path: 'regionalMonitoring',
                component: 'views/monitoring/regional/index',
                name: 'RegionalMonitoring',
                meta: {
                  title: '区域监视中心'
                }
              },
              {
                path: 'stationMonitoring',
                component: 'views/monitoring/station/index',
                name: 'StationMonitoring',
                meta: {
                  title: '场站监视'
                }
              },
              // 设备监视
              {
                path: 'deviceMonitoring',
                component: 'views/monitoring/device/index',
                name: 'DeviceMonitoring',
                meta: {
                  title: '设备监视'
                }
              }
            ]
          },
          // 运营监视
          {
            path: '/operationMonitoring',
            component: '#',
            redirect: '/operationMonitoring/comprehensiveIndex',
            name: 'OperationMonitoring',
            meta: {
              title: '运营监视',
              icon: 'svg-icon:operationMonitoring'
            },
            children: [
              {
                path: 'comprehensiveIndex',
                component: 'views/operationMonitoring/comprehensiveIndex/index',
                name: 'ComprehensiveIndex',
                meta: {
                  title: '综合指标'
                }
              },
              // 自定义数据看板
              {
                path: 'customDataBoard',
                component: 'views/operationMonitoring/customDataBoard/index',
                name: 'CustomDataBoard',
                meta: {
                  title: '自定义数据看板'
                }
              },
              // 看板编辑
              {
                path: 'dashboardEdit/:id(.*)*',
                component: 'views/operationMonitoring/customDataBoard/views/edit/index',
                name: 'DashboardEdit',
                meta: {
                  title: '看板编辑',
                  hidden: true,
                  activeMenu: '/operationMonitoring/customDataBoard'
                }
              },
              // 看板预览
              {
                path: 'dashboardPreview/:id(.*)*',
                component: 'views/operationMonitoring/customDataBoard/views/preview/index',
                name: 'DashboardPreview',
                meta: {
                  title: '看板预览',
                  hidden: true,
                  activeMenu: '/operationMonitoring/customDataBoard'
                }
              },
              // 基础报表
              {
                path: 'basicReport',
                component: 'views/operationMonitoring/basicReport/index',
                name: 'BasicReport',
                meta: {
                  title: '基础报表'
                }
              },
              // 自定义报表
              {
                path: 'customReport',
                component: 'views/operationMonitoring/customReport/index',
                name: 'CustomReport',
                meta: {
                  title: '自定义报表'
                }
              },
              // 曲线对比分析
              {
                path: 'curveCompareAnalysis',
                component: 'views/operationMonitoring/curveCompareAnalysis/index',
                name: 'CurveCompareAnalysis',
                meta: {
                  title: '曲线对比分析'
                }
              },
              // 计划电量填报
              {
                path: 'planningElectricityFilling',
                component: 'views/operationMonitoring/planningElectricityFilling/index',
                name: 'PlanningElectricityFilling',
                meta: {
                  title: '计划电量填报'
                }
              },
              // 指标配置
              {
                path: 'indexConfiguration',
                component: 'views/operationMonitoring/indexConfiguration/index',
                name: 'IndexConfiguration',
                meta: {
                  title: '指标配置'
                }
              }
            ]
          },
          {
            path: '/dataAnalysis',
            component: '#',
            redirect: '/dataAnalysis/fanEnergyEfficiency',
            name: 'DataAnalysis',
            meta: {
              title: '数据分析',
              icon: 'svg-icon:dataAnalysis'
            },
            children: [
              {
                path: 'fanEnergyEfficiency',
                component: 'views/dataAnalysis/fanEnergyEfficiency/index',
                name: 'FanEnergyEfficiency',
                meta: {
                  title: '风机能效分析'
                }
              },
              {
                path: 'pvEnergyEfficiency',
                component: 'views/dataAnalysis/pvEnergyEfficiency/index',
                name: 'PvEnergyEfficiency',
                meta: {
                  title: '光伏能效分析'
                }
              },
              // 损失电量分析
              {
                path: 'lossElectricity',
                component: 'views/dataAnalysis/lossElectricity/index',
                name: 'LossElectricity',
                meta: {
                  title: '损失电量分析'
                }
              },
              // 技改方案库
              {
                path: 'technicalScheme',
                component: 'views/dataAnalysis/technicalScheme/index',
                name: 'TechnicalScheme',
                meta: {
                  title: '技改方案库'
                }
              }
            ]
          },
          {
            path: '/health',
            component: '#',
            redirect: '/health/FaultTree',
            name: 'Health',
            meta: {
              title: '健康管理',
              icon: 'svg-icon:alarm'
            },
            children: [
              {
                path: 'FaultTree',
                component: 'views/health/faultDiagnosis/faultTree/index',
                name: 'FaultTree',
                meta: {
                  title: '故障树'
                }
              },
              {
                path: 'FaultRepository',
                component: 'views/health/faultDiagnosis/faultRepository/index',
                name: 'FaultRepository',
                meta: {
                  title: '故障知识库'
                }
              },
              {
                path: 'FaultWangning',
                component: 'views/health/faultWarning/index',
                name: 'FaultWarning',
                meta: {
                  title: '故障预警'
                }
              }
            ]
          },
          {
            path: '/alarm',
            component: '#',
            redirect: '/alarm/alarmRulesManage',
            name: 'Alarm',
            meta: {
              title: '告警中心',
              icon: 'svg-icon:alarm'
            },
            children: [
              {
                path: 'realTimeAralrm',
                component: 'views/alarm/realTimeAlarm/index',
                name: 'RealTimeAlarm',
                meta: {
                  title: '实时告警'
                }
              },
              {
                path: 'historyAralrm',
                component: 'views/alarm/historyAlarm/index',
                name: 'HistoryAralrm',
                meta: {
                  title: '历史告警'
                }
              },
              {
                path: 'alarmRule',
                component: 'views/alarm/rulesManage/index',
                name: 'AlarmRulesManage',
                meta: {
                  title: '告警规则管理'
                }
              }
            ]
          },

          {
            path: '/systemManage',
            component: '#',
            redirect: '/systemManage/dictionaryManage',
            name: 'SystemManage',
            meta: {
              title: '系统管理',
              icon: 'svg-icon:systemManage'
            },
            children: [
              {
                path: 'dictionaryManage',
                component: 'views/systemManage/dictionaryManage/index',
                name: 'DictionaryManage',
                meta: {
                  title: '字典管理'
                }
              },
              {
                path: 'mapInfor',
                component: 'views/systemManage/mapInfor/index',
                name: 'MapInfor',
                meta: {
                  title: '映射信息'
                }
              },
              {
                path: 'stationManage',
                component: 'views/systemManage/stationManage/index',
                name: 'StationManage',
                meta: {
                  title: '场站管理'
                }
              },
              {
                path: 'deviceManage',
                component: 'views/systemManage/deviceManage/index',
                name: 'DeviceManage',
                meta: {
                  title: '设备管理'
                }
              },
              {
                path: 'userManage',
                component: 'views/systemManage/userManage/index',
                name: 'UserManage',
                meta: {
                  title: '用户管理'
                }
              },
              {
                path: 'roleManage',
                component: 'views/systemManage/roleManage/index',
                name: 'RoleManage',
                meta: {
                  title: '角色管理'
                }
              },
              {
                path: 'menuManage',
                component: 'views/systemManage/menuManage/index',
                name: 'MenuManage',
                meta: {
                  title: '菜单管理'
                }
              }
            ]
          }
          // {
          //   path: '/customReport',
          //   component: '#',
          //   redirect: '/customReport/templateConfig',
          //   name: 'CustomReport',
          //   meta: {
          //     title: '自定义报表配置',
          //     icon: 'svg-icon:customReportConfig'
          //   },
          //   children: [
          //     {
          //       path: 'templateConfig',
          //       component: 'views/customReport/templateConfig/index',
          //       name: 'TemplateConfig',
          //       meta: {
          //         title: '模板管理'
          //       }
          //     },
          //     {
          //       path: 'indicatorConfig',
          //       component: 'views/customReport/indicatorConfig/index',
          //       name: 'IndicatorConfig',
          //       meta: {
          //         title: '指标管理'
          //       }
          //     }
          //   ]
          // },
          // {
          //   path: '/reportRender',
          //   component: '#',
          //   redirect: '/reportRender/index',
          //   name: 'ReportRender',
          //   meta: {
          //     title: '自定义报表列表',
          //     icon: 'svg-icon:customReport'
          //   },
          //   children: [
          //     {
          //       path: 'baseReports',
          //       component: 'views/customReport/baseReports/index',
          //       name: 'baseReports',
          //       meta: {
          //         title: '自定义报表列表'
          //       }
          //     }
          //   ]
          // }
        ]
      }
    }
  },
  // 1.7 查询普通用户列表
  {
    url: '/mock/user/listCommonUser',
    type: 'get',
    timeout,
    response: () => {
      return {
        code: 20000,
        message: '操作成功',
        data: [
          {
            name: '周建辉',
            id: 2
          },
          {
            name: '包宇鹏',
            id: 3
          },
          {
            name: '柳庆山',
            id: 4
          },
          {
            name: '长顺',
            id: 5
          },
          {
            name: '王忠金',
            id: 6
          },
          {
            name: '康仲良',
            id: 7
          },
          {
            name: '马渤',
            id: 8
          },
          {
            name: '张力生',
            id: 9
          },
          {
            name: '王海飞',
            id: 10
          },
          {
            name: '徐志航',
            id: 11
          },
          {
            name: '张文革',
            id: 12
          },
          {
            name: '宋柏达',
            id: 13
          },
          {
            name: '田俊成',
            id: 14
          },
          {
            name: '李国荣',
            id: 15
          },
          {
            name: '刘奥博',
            id: 16
          },
          {
            name: '测试',
            id: 21
          },
          {
            name: '测试',
            id: 22
          },
          {
            name: '测试',
            id: 23
          }
        ]
      }
    }
  }
] as MockMethod[]
