import Mock from './mockjs'

// export default [
//     {
//         url: '/cms/user/queryPageList',
//         type: 'post',
//         response: config => {
//             const res = Mock.mock({
//                 total:100,
//                 'list|3-5': [{
//                     'id|+1': 0,
//                     'login_name': '@cword(2,5)',
//                     'user_name': '@cword(4,8)',
//                     'login_password': '@cword(4,8)',
//                     'create_time_format': '@cword(4,8)',
//                 }]
//             })
//             return res.data
//         }
//     }
// ]
export default [
    {
        url: '/cms/user/queryPageList',
        type: 'post',
        response: config => {
            const res = {
                data: {
                    code: 2000,
                    'list|3-20': [{
                        'id|+1': 0,
                        'login_name': '@cword(2,5)',
                        'user_name': '@cword(2,5)',
                        'login_password': '@string(10,20)',
                        'create_time_format': '@now',
                    }],
                    total: 20,
                    // pageNum: 1,
                    // pageSize: 10,
                    // pages: 2,
                    // prePage: 0,
                    // size: 10
                }
            }
            return res
        }
    }
]