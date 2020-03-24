import Mock from './mockjs'


export default [{
  url: '/sysDept/queryList',
  type: 'post',
  response: config => {
    const res = Mock.mock({
      'data|3-5': [{
        'id|+1': 0,
        'name': '@cword(2,5)',
        'area': '@cword(4,8)'
      }]
    })
    return res.data
  }
},
{
  url: '/sysArea/queryList',
  type: 'post',
  response: config => {
    const res = Mock.mock({
      'data|3-5': [{
        'id|+1': 0,
        'name': '@cword(2,5)',
        'floor|1-12': 1
      }]
    })
    return res.data
  }
},
{
  url: '/robot/queryList',
  type: 'post',
  response: config => {
    return [{
      'id': 1,
      'stationId': 1,
      'robotBiz': 'FWR1-H1M1-00001',
      'robotTypeNum': '0108',
      'robotIp': '192.168.20.147',
      'heartbeat': 1,
      'robotName': '伊娃',
      'x': '10',
      'y': '8.92',
      'z': '1'
    },
    {
      'id': 2,
      'robotBiz': 'SB-0000001',
      'robotTypeNum': '0109',
      'robotIp': '192.168.20.130',
      'heartbeat': 1,
      'robotName': '哨兵',
      'x': '4.35005',
      'y': '18.1899',
      'z': '-1.18708'
    }
    ]
  }
}
]
