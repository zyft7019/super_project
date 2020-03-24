import Mock from './mockjs'

export default [{
  url: '/devicePoint/queryDevicePointList',
  type: 'post',
  response: config => {
    return {
      code: 2000,
      data: [{
        'id': 2787,
        'nodeId': '巡逻一',
        'nodeName': '巡逻一',
        'pointX': 6,
        'pointY': 16.33,
        'yaw': 0
      },
      {
        'id': 2788,
        'nodeId': '巡逻二',
        'nodeName': '巡逻二',
        'pointX': -4,
        'pointY': 12.37,
        'yaw': 0
      },
      {
        'id': 2789,
        'nodeName': '充电桩',
        'pointX': 4,
        'pointY': 18.04
      },
      {
        'id': 2790,
        'nodeId': '着火点',
        'nodeName': '着火点',
        'pointX': 2,
        'pointY': -0.48
      }
      ]
    }
  }
},
{
  url: '/camera/queryByArea',
  type: 'post',
  response: config => {
    return {
      code: 2000,
      data: [{
        camera: {
          'id': 49,
          'videoPlayUrl': 'rtmp://192.168.20.129:1935/monitor/1'
        },
        'pos': {
          'x': 5.0,
          'y': 18.5206,
          'yaw': 0.0
        }
      },
      {
        camera: {
          'id': 50,
          'videoPlayUrl': 'rtmp://192.168.20.129:1935/monitor/6'
        },
        'pos': {
          'x': 6.0,
          'y': -11.2694,
          'yaw': 0.0
        }
      },
      {
        camera: {
          'id': 51,
          'videoPlayUrl': 'rtmp://192.168.20.129:1935/monitor/13'
        },
        'pos': {
          'x': -1.0,
          'y': 1.8106,
          'yaw': 0.0
        }
      },
      {
        camera: {
          'id': 52,
          'videoPlayUrl': 'rtmp://192.168.20.129:1935/monitor/11'
        },
        'pos': {
          'x': 6.0,
          'y': 18.5206,
          'yaw': 0.0
        }
      }
      ]
    }
  }
}
]
